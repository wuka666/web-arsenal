#!/usr/bin/env node
/**
 * lib/state.js —— demo 里 `state` 键解析（唯一实现，2026-10-31 统一）
 *
 * 为什么要有它：同一件事原本有 2 份正则，而且**宽窄不同**：
 *   · check_vars.js:46-58   —— 认 `var/let/const state = {...}`，也认带引号的键（`{"bg": ...}` 这种 JSON 风格）；
 *                              并且会过滤掉「纯 JS 逻辑参数」（dur / easing 那类从不出现在 var() 里的键）
 *   · verify_entry.js:44    —— 只认 `state = {`，既漏 `const state`，也漏带引号的键
 *                              → 老条目（M183+ 那批 `const state={...}`）抽出来是空集，靠「键名在全文里出现过」兜底，
 *                                于是「死参数」判定常年放空炮。
 * 统一时取 check_vars 那一版（更全）。verify_entry 因此**少报**死参数误报，属修复，不是放宽。
 *
 * 实现细节（2026-10-31 加固）：
 *   check_vars 原正则用 `\{([\s\S]*?)\}\s*;` —— 非贪婪，遇到第一个 `}` 就收，
 *   于是「state 块里含嵌套对象 / 不以分号结尾」的 demo 会整个抓不到（实测 2 个：
 *   `assets/demos/方案-暗色发布页.html`、`assets/demos/粒子星系.html`）。
 *   这里改成**大括号配平扫描**：语义是原版的超集，只会多抓到、不会少抓到。
 *
 * 用法：
 *   const { stateKeys, stateBlock } = require('./lib/state');
 *   stateKeys(html)                        // → ['bg','panel',...]（全部 state 键）
 *   stateKeys(html, { cssVarOnly: true })  // → 只保留在 demo 里被 var(--k) 消费过的键（check_vars 口径）
 */

/** 找到 `var|let|const state = {` 之后配平的那个 `{...}`，返回 { body, start, end } 或 null */
function stateBlock(html) {
  const s = String(html == null ? '' : html);
  const m = /(?:var|let|const)\s+state\s*=\s*\{/.exec(s);
  if (!m) return null;
  const open = s.indexOf('{', m.index);
  if (open < 0) return null;
  let depth = 0, i = open;
  for (; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') { depth--; if (depth === 0) break; }
  }
  if (depth !== 0) return null; // 括号不配平 = 文件本身有问题，别硬猜
  return { body: s.slice(open + 1, i), start: open, end: i };
}

/**
 * 提取 state 的键名。
 * @param {string} html  demo 源码
 * @param {{cssVarOnly?:boolean}} [opt]
 *        cssVarOnly=true → 只保留「在 demo 里被 var(--k) 消费过」的键。
 *        check_vars 必须开这个（老条目 state 里混着 dur/easing/showPct 这类纯 JS 参数，
 *        它们从不出现在 var() 里，不排除会整片误报成「空变量」）。
 * @returns {string[]} 去重后的键名（保持出现顺序）
 */
function stateKeys(html, opt = {}) {
  const s = String(html == null ? '' : html);
  const blk = stateBlock(s);
  if (!blk) return [];
  // 键可能带引号（老条目是 JSON 风格 {"bg": ...}），两种都要取
  const raw = (blk.body.match(/(?:^|[,{\s])["']?([A-Za-z_$][\w$]*)["']?\s*:/g) || [])
    .map(x => x.replace(/[^A-Za-z0-9_$]/g, ''))
    .filter(Boolean);
  const uniq = [...new Set(raw)];
  if (!opt.cssVarOnly) return uniq;
  return uniq.filter(k => new RegExp('var\\(\\s*--' + k + '\\b').test(s));
}

module.exports = { stateKeys, stateBlock };
