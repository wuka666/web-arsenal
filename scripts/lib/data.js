#!/usr/bin/env node
/**
 * lib/data.js —— data/*.js 数据源统一加载器（唯一实现）
 *
 * 为什么要有它（2026-10-31 重构）：
 *   同一段「读文件 → 求值 → 取 window.WEB_ARSENAL 」的样板原本散落在 12 个脚本里，
 *   而且**实现还不一致**：check_sync.js / audit_overlap.js 用 vm 沙箱，
 *   其余 10 处用 `new Function("window", src)(w)`。两种写法对同一份数据的行为本来就该一样，
 *   但两套实现意味着「哪天数据文件里多写一行 require/process」，两套会跑出两种结果。
 *
 * 统一口径：一律用 vm.createContext({ window: {} })。
 *   ① 更安全：数据文件只拿到一个 window 壳，碰不到宿主全局（require/process/fs）；
 *   ② 已被 check_sync.js 长期验证：287 条双重转义 + 417 个 demo 全绿，行为等价；
 *   ③ 沙箱里没有 console —— 所以**数据文件里不许出现 console.log**（真出现了应该报错，
 *      而不是静默打印到宿主终端；报错正好暴露它）。
 *
 * 用法：
 *   const { loadMaterials, loadSchemes } = require('./lib/data');
 *   const M = loadMaterials();          // → 数组，读不到就抛
 *   const S = loadSchemes({ exitCode: 2 });  // → 读不到时打印原因并 process.exit(2)（兼容旧脚本）
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILES = {
  素材: { file: 'data/素材.js', global: 'WEB_ARSENAL' },
  方案: { file: 'data/方案.js', global: 'WEB_SCHEMES' },
};

class DataLoadError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'DataLoadError';
    this.code = code; // ENOENT = 文件不存在；NOT_MOUNTED = 未挂载 window.X
  }
}

/**
 * 加载一个数据文件并取回它挂在 window 上的数组。
 * @param {string} file    相对项目根目录的路径，如 'data/素材.js'
 * @param {string} globalName  window 上的变量名，如 'WEB_ARSENAL'
 * @param {{root?:string, exitCode?:number|null}} [opt]
 *        root      项目根目录，默认 process.cwd()（所有脚本都按「在项目根目录运行」使用）
 *        exitCode  给数字则加载失败时 console.error + process.exit(该码)，否则抛 DataLoadError
 * @returns {Array}
 */
function loadLib(file, globalName, opt = {}) {
  const root = opt.root || process.cwd();
  const exitCode = opt.exitCode === undefined ? null : opt.exitCode;
  const fail = (msg, code) => {
    if (exitCode !== null) { console.error(msg); process.exit(exitCode); }
    throw new DataLoadError(msg, code);
  };

  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) fail('找不到 ' + file + ' —— 请在项目根目录运行', 'ENOENT');

  // 沙箱只给一个 window 壳：数据文件的唯一出口就是 window.XXX
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(fs.readFileSync(abs, 'utf8'), sandbox, { filename: file });
  } catch (e) {
    fail(file + ' 求值失败：' + String(e && e.message || e), 'EVAL');
  }

  const lib = sandbox.window[globalName];
  if (!Array.isArray(lib)) fail(file + ' 未挂载 window.' + globalName, 'NOT_MOUNTED');
  return lib;
}

/** 素材库 data/素材.js → window.WEB_ARSENAL */
function loadMaterials(opt) { return loadLib(FILES.素材.file, FILES.素材.global, opt); }

/** 方案库 data/方案.js → window.WEB_SCHEMES */
function loadSchemes(opt) { return loadLib(FILES.方案.file, FILES.方案.global, opt); }

module.exports = { loadLib, loadMaterials, loadSchemes, FILES, DataLoadError };
