#!/usr/bin/env node
/**
 * check_ui_state.js — 交互页面「状态与降级」自查（宪法规矩 32 的可执行部分）
 *
 * 用法：
 *   node scripts/check_ui_state.js            # 只看报告，永远 exit 0（建议态）
 *   node scripts/check_ui_state.js --strict   # 有 WARN 即 exit 1（门禁态，暂不接入六步链）
 *
 * 查的是「宿主页面」的工程特征，不查数据、不查 demo。
 * 判据来源：2026-10-26 按「Vibe Coding 为什么脆弱」12 项审计（宪法附录 C）。
 *
 * 它能查的（静态特征）：
 *   ① 焦点：有 dialog/aria-modal，却 0 处 Tab 循环 + 0 处 inert
 *   ② 状态：0 处 location.hash / history.replaceState / sessionStorage
 *   ③ 降级：0 处 iframe onerror / 加载超时兜底
 *   ④ 组合输入：0 处 compositionstart/end 守卫
 *   ⑤ 资源：只有 IntersectionObserver.unobserve，没有卸载（about:blank / src 清空）
 *
 * 它查不了的（必须手测，规矩 32 已写明）：
 *   焦点循环顺序、卸载后的真实 CPU/内存、关闭后焦点是否归还、软键盘遮挡。
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TARGETS = ['index.html', 'assets/canvas.html'];
const STRICT = process.argv.includes('--strict');

let warnCount = 0;
let checkCount = 0;

function warn(title, detail) {
  warnCount++;
  console.log(`  ⚠️  WARN  ${title}\n        ${detail}`);
}
function ok(title, detail) {
  console.log(`  ✅  PASS  ${title}${detail ? '\n        ' + detail : ''}`);
}

function readTarget(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, 'utf8');
}

/** 数「含某关键词的行数」，用行号定位，方便回查 */
function hits(src, re) {
  const out = [];
  src.split('\n').forEach((line, i) => {
    if (re.test(line)) out.push(i + 1);
  });
  return out;
}
function count(src, re) {
  return hits(src, re).length;
}

for (const rel of TARGETS) {
  const src = readTarget(rel);
  if (src === null) {
    console.log(`\n[${rel}] 不存在，跳过`);
    continue;
  }
  console.log(`\n[${rel}]  ${src.split('\n').length} 行`);

  // ① 焦点
  checkCount++;
  const dialogs = count(src, /role="dialog"|aria-modal=/);
  const tabs = count(src, /["']Tab["']/);
  const inert = count(src, /\binert\b/);
  if (dialogs > 0 && tabs === 0 && inert === 0) {
    warn(`焦点没有圈定：${dialogs} 处 dialog/aria-modal，但 0 处 Tab 循环、0 处 inert`,
      '打开弹层后 Tab 会走到背景内容；关闭后焦点不归还（规矩 32 ①）');
  } else if (dialogs === 0) {
    ok('无 dialog 类弹层，① 不适用');
  } else {
    ok(`有焦点处理线索（Tab ${tabs} 处 / inert ${inert} 处）`);
  }

  // ② 状态持久化
  checkCount++;
  const hash = count(src, /location\.hash|history\.replaceState|history\.pushState/);
  const sess = count(src, /sessionStorage/);
  const ls = count(src, /localStorage/);
  if (hash === 0 && sess === 0) {
    warn('刷新会丢状态：0 处 location.hash / replaceState / sessionStorage',
      `localStorage 有 ${ls} 处，通常只存偏好（收藏/主题），存不下「视图+筛选+搜索词」（规矩 32 ②）`);
  } else {
    ok(`有状态持久化线索（hash ${hash} / sessionStorage ${sess} / localStorage ${ls}）`);
  }

  // ③ 降级
  checkCount++;
  const iframes = count(src, /<iframe|createElement\(["']iframe["']\)/);
  const onerror = count(src, /onerror|addEventListener\(["']error["']/);
  if (iframes > 0 && onerror === 0) {
    warn(`iframe 失败无提示：${iframes} 处 iframe，0 处 onerror`,
      '加载失败只会留一块空白，用户以为「没有内容」（规矩 32 ③）');
  } else if (iframes === 0) {
    ok('无 iframe，③ 不适用');
  } else {
    ok(`有失败兜底线索（onerror ${onerror} 处）`);
  }

  // ④ 组合输入
  checkCount++;
  const comp = count(src, /compositionstart|compositionend|isComposing/);
  const inputEvt = count(src, /addEventListener\(["']input["']/);
  if (inputEvt > 0 && comp === 0) {
    warn(`输入法组合态没守卫：${inputEvt} 处 input 监听，0 处 compositionstart/end`,
      '中文拼音每敲一个字母都会触发过滤 / 重算（规矩 32 ④）');
  } else if (inputEvt === 0) {
    ok('无输入框监听，④ 不适用');
  } else {
    ok(`有组合态守卫（composition* ${comp} 处）`);
  }

  // ⑤ 资源卸载
  checkCount++;
  const io = count(src, /new IntersectionObserver/);
  const teardown = count(src, /about:blank|\.src\s*=\s*["']{2}|removeAttribute\(["']src["']\)|pause\(\)/);
  if (io > 0 && teardown === 0) {
    warn('懒加载只加载不销毁：有 IntersectionObserver，但 0 处 about:blank / 清空 src / pause()',
      '滚过的 iframe 会一直跑自己的 rAF（规矩 32 ⑤）');
  } else if (io === 0) {
    ok('无懒加载，⑤ 不适用');
  } else {
    ok(`有卸载线索（${teardown} 处）`);
  }
}

console.log(`\n—— 小结：${checkCount} 项检查，${warnCount} 项 WARN`);
if (warnCount > 0) {
  console.log('   规则见 05-项目/Web灵感书房/Agent宪法.md 规矩 32 + 附录 C');
  console.log('   本脚本只看静态特征；焦点循环 / 卸载时机 / 软键盘遮挡必须手测');
}
if (STRICT && warnCount > 0) process.exit(1);
