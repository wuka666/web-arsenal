#!/usr/bin/env node
/**
 * lib/chrome.js —— 无头 Chrome 统一启动器（唯一实现）
 *
 * 为什么要有它（2026-10-31 重构）：
 *   `C:\Program Files\Google\Chrome\Application\chrome.exe` 这个绝对路径原本硬编码在 5 个脚本里
 *   （check_adapt / check_touch_targets / check_vars / shot_demo / test_filters），
 *   每份都各自拼一遍参数、各自建一个 %TEMP% profile 目录、各自删一遍。
 *   问题不在重复本身，而在**漏删**：2026-10-01 实测 profile 累积到 566 个才被发现。
 *   统一到一处后，「建 profile」与「删 profile」在同一个 try/finally 里，漏不掉。
 *
 * 本模块只做三件事：
 *   ① 找到 Chrome（环境变量 ARSENAL_CHROME 优先，便于换机 / CI）；
 *   ② 给一组统一的无头参数（各脚本要的差异项用 extraArgs 追加）；
 *   ③ 调用方拿到 stdout 后自己解析（探针结果从 document.title 里取，各脚本口径不同）。
 *
 * 用法：
 *   const { runHeadless, findChrome, chromeArgs } = require('./lib/chrome');
 *   const out = runHeadless({ url, dumpDom: true, extraArgs: ['--window-size=900,900'] });
 *   const png = runHeadless({ url, screenshot: '/tmp/x.png' });
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

/** Chrome 常见安装位置（顺序即优先级） */
const CHROME_CANDIDATES = [
  process.env.ARSENAL_CHROME,                                        // 显式覆盖（换机 / CI 用）
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe') : null,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',     // macOS
  '/usr/bin/google-chrome',                                           // Linux
  '/usr/bin/chromium',
].filter(Boolean);

let _cached = null;
/**
 * 定位 Chrome 可执行文件。
 * @param {{throwIfMissing?:boolean}} [opt] throwIfMissing=false 时返回 null
 * @returns {string|null}
 */
function findChrome(opt = {}) {
  if (_cached) return _cached;
  for (const p of CHROME_CANDIDATES) {
    try { if (fs.existsSync(p)) { _cached = p; return p; } } catch (_) { /* 忽略权限错误 */ }
  }
  if (opt.throwIfMissing) throw new Error('找不到 Chrome，可用环境变量 ARSENAL_CHROME 指定路径');
  return null;
}

/** 所有无头调用共用的一组参数 */
function chromeArgs() {
  return [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-background-networking',
    '--disable-component-update',
    '--no-first-run',
    '--hide-scrollbars',
    // file:// 下读 iframe.contentDocument / 与本地 demo 同目录探针页都要它
    '--allow-file-access-from-files',
  ];
}

/** 建一个独立 profile 目录（每个 Chrome 进程一个，避免争用） */
function makeProfile(prefix = 'wa') {
  return path.join(os.tmpdir(), `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
}

/**
 * 起一次无头 Chrome，跑完保证删 profile。
 *
 * @param {object} opt
 * @param {string}  opt.url               要打开的 file:// 或 http(s) URL
 * @param {string[]} [opt.extraArgs]      追加参数（--window-size / --virtual-time-budget …）
 * @param {boolean} [opt.dumpDom]         true → 追加 --dump-dom，返回 stdout 字符串
 * @param {string}  [opt.screenshot]      给定路径 → 追加 --screenshot=path（返回 ''）
 * @param {number}  [opt.timeoutMs]       子进程超时，默认 180000（3 分钟）。
 *        为什么要有超时：粒子星系.html 这类 2000 粒子的 canvas demo，Chrome 无头下可能几十秒都出不来，
 *        原实现没有超时 → 整套脚本静默挂死，没有任何输出提示「卡在哪一条」。
 *        超时值给得足够宽（远大于最慢 demo 的正常耗时），只用来兜「真的死住」。
 * @param {number}  [opt.maxBuffer]       stdout 缓冲上限，默认 40MB（dump-dom 动辄几 MB）
 * @param {string}  [opt.profilePrefix]   profile 目录前缀（便于排查「哪个脚本漏删」）
 * @param {boolean} [opt.throwOnError]    默认 true；false 时捕获异常返回 null（check_adapt 要降级）
 * @returns {string|null} dumpDom 模式的 stdout；截图模式返回 ''；失败且 throwOnError=false 返回 null
 */
function runHeadless(opt = {}) {
  const {
    url, extraArgs = [], dumpDom = false, screenshot = null,
    timeoutMs = 180000, maxBuffer = 1024 * 1024 * 40,
    profilePrefix = 'wa', throwOnError = true,
  } = opt;

  const chrome = findChrome({ throwIfMissing: true });
  const prof = makeProfile(profilePrefix);
  const args = chromeArgs().concat(extraArgs, ['--user-data-dir=' + prof]);
  if (screenshot) args.push('--screenshot=' + screenshot);
  else if (dumpDom) args.push('--dump-dom');
  args.push(url);

  try {
    // ⚠️ stdio 必须用 'pipe'（字符串），不能写成 ['ignore','pipe','pipe']：
    //    2026-10-31 实测同一条 demo，stdin=ignore 时 Chrome 会提前结束渲染，
    //    截图 9,898B（大面积空白）vs stdio:'pipe' 的 169,871B（完整画面）。
    //    本模块的目标是「统一实现、行为不变」，所以照抄原各脚本的 stdio:'pipe'。
    const out = execFileSync(chrome, args, {
      encoding: 'utf8', maxBuffer, timeout: timeoutMs, stdio: 'pipe',
    });
    return screenshot ? '' : out;
  } catch (e) {
    if (throwOnError) throw e;
    return null;
  } finally {
    // 宪法规矩 4 / 附录 A5：无头脚本必须自己收拾 profile（每个几十 MB）
    try { fs.rmSync(prof, { recursive: true, force: true }); } catch (_) { /* 删不掉就算了，别掩盖真正的错误 */ }
  }
}

/** file:// URL 的跨平台拼法（Windows 盘符路径 → file:///C:/…） */
function toFileUrl(absPath) {
  return 'file:///' + absPath.split(path.sep).join('/');
}

/**
 * 删临时探针页，带重试。
 * 为什么需要重试：Chrome 刚退出时进程可能还没完全放开文件句柄，unlinkSync 会 EBUSY/EPERM 静默失败，
 * 探针页 `_*_tmp.html` 就残留在 assets/demos/ 里（check_links.js 顶部注释记的就是这个坑，
 * 2026-10-31 复现了一次）。同步重试 5 次、间隔靠一次极短的忙等，成本可忽略。
 * @returns {boolean} 最终是否删掉了
 */
function cleanupFile(p) {
  for (let i = 0; i < 5; i++) {
    try { fs.unlinkSync(p); return true; } catch (e) {
      if (e && e.code === 'ENOENT') return true;
      const until = Date.now() + 20 * (i + 1);
      while (Date.now() < until) { /* 忙等 20~100ms：同步上下文里没有 sleep */ }
    }
  }
  try { fs.unlinkSync(p); return true; } catch (_) { return false; }
}

module.exports = { runHeadless, findChrome, chromeArgs, makeProfile, toFileUrl, cleanupFile, CHROME_CANDIDATES };
