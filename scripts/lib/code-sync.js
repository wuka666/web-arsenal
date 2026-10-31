#!/usr/bin/env node
/**
 * lib/code-sync.js —— 「代码 = demo」判据（唯一实现）
 *
 * 为什么要有它（2026-10-31 重构）：
 *   同一件事（素材/方案的 `代码` 字段是否逐字节等于磁盘 demo）原本有 **3 份实现**，
 *   其中只有 check_sync.js 那份是对的：
 *     · check_all.js:39-47   —— 用 eval 试两次，不做反转义 → 287 条双重转义的条目永远判不出来（静默假阴性）
 *     · verify_entry.js:34-42 —— 同样是 eval 两次，同一毛病
 *     · check_sync.js:44-54  —— 先 unescapeMaybe（JSON.parse 拆一层），再逐字节比 → 正确
 *   本模块就是把 check_sync.js 那份行为**原样搬出来**，一个字都不改语义，
 *   然后让三处都调它。判据只会更严（原来漏判的会开始判出来），不会更松。
 *
 * 历史包袱（必须保留，否则 287 条立刻全红）：
 *   288 条素材的 `代码` 字段是「双重 JSON 转义」存的 —— 值本身以 `"` 开头、内部是 `\"` 与 `\n`，
 *   语义与 demo 一致但字面不等。normalize() 负责识别并反解一层。
 *
 * 用法：
 *   const { normalize, compare, firstDiff } = require('./lib/code-sync');
 *   const { value, doubleEncoded } = normalize(e.代码);
 *   const r = compare(e.代码, diskHtml);   // → { ok, value, disk, doubleEncoded, diffAt, codeLen, diskLen }
 */

/**
 * 双重 JSON 转义的值 → 原文。
 * @param {*} raw  条目里的 `代码` 字段值（可能是普通字符串，也可能是 `"..."` 形态的双重转义串）
 * @returns {{value:string, doubleEncoded:boolean}}
 *   doubleEncoded=true 表示这个值确实是双重转义存储（值以引号开头结尾且能 JSON.parse 出非空字符串）
 */
function normalize(raw) {
  const s = String(raw == null ? '' : raw);
  const t = s.trim();
  if (t.length > 1 && t.startsWith('"') && t.endsWith('"')) {
    try {
      const v = JSON.parse(t);
      if (typeof v === 'string' && v.length) return { value: v, doubleEncoded: true };
    } catch (_) { /* 不是合法的双重转义，按原样比较 */ }
  }
  return { value: s, doubleEncoded: false };
}

/** 两个字符串首个不同的字节偏移；完全相等时返回较短串的长度 */
function firstDiff(a, b) {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a[i] === b[i]) i++;
  return i;
}

/**
 * 比对条目 `代码` 与 demo 文件内容。
 * @param {*} entryCode       条目的 `代码` 字段
 * @param {string} demoHtml   磁盘上 demo 文件的原文
 * @param {{strictEncoding?:boolean}} [opt]
 *        strictEncoding=true 时「双重转义存储」本身也记为失败（对应 check_sync.js --strict-encoding）
 * @returns {{ok:boolean, value:string, disk:string, doubleEncoded:boolean, diffAt:number, codeLen:number, diskLen:number}}
 */
function compare(entryCode, demoHtml, opt = {}) {
  const disk = String(demoHtml == null ? '' : demoHtml);
  const { value, doubleEncoded } = normalize(entryCode);
  const strict = !!opt.strictEncoding;
  const ok = strict ? (!doubleEncoded && value === disk) : value === disk;
  return {
    ok,
    value,
    disk,
    doubleEncoded,
    diffAt: ok ? -1 : firstDiff(value, disk),
    codeLen: value.length,
    diskLen: disk.length,
  };
}

/**
 * 给「不一致」时用的人话原因（保持 check_sync.js 原来的三种措辞，便于 diff 输出不变）。
 * @param {{ok:boolean, doubleEncoded:boolean}} r
 * @param {boolean} [strictEncoding]
 */
function reasonOf(r, strictEncoding) {
  if (r.ok) return '';
  if (strictEncoding) return r.doubleEncoded ? '双重转义存储' : '内容不一致';
  return '内容不一致';
}

module.exports = { normalize, compare, firstDiff, reasonOf };
