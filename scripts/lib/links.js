#!/usr/bin/env node
/**
 * lib/links.js —— 「零外链」判据（唯一实现，2026-10-31 统一）
 *
 * 为什么要有它：同一件事原本有 2 份实现，而且**判据不同**：
 *   · check_links.js:15-19 —— 只查 `https?://`
 *   · verify_entry.js:70   —— 还查 `cdn.` / `@import` / `<link>` / `src="https?:`
 * 两份都不算错，但宽的那份会漏：`<link rel=stylesheet href=//cdn.x/y.css>` 或者
 * 裸域名的 `cdn.jsdelivr.net` 都能溜过去。统一时**取严的那份**（verify_entry）作为唯一实现，
 * 结果是判据变严 —— 允许 check_links 因此报出新问题；真报了也**不许改数据**，只进报告等用户定夺。
 *
 * 统一口径（顺序很重要）：
 *   ① 先剥掉 SVG 命名空间 URL（`http://www.w3.org/2000/svg` 这类是规范标识符，
 *      浏览器从不发起请求，不是外链）；
 *   ② 再匹配外链形状。
 *
 * 用法：
 *   const { stripNamespaces, findExternal, hasExternal } = require('./lib/links');
 *   findExternal(html)      // → [{ index, text, why }] 命中的外链片段（去重后）
 *   hasExternal(html)       // → true/false
 */

/**
 * 剥掉 SVG / XHTML 命名空间标识符。
 * 这些 URL 只在 `xmlns` 里作规范标识出现，浏览器不会去请求。
 */
function stripNamespaces(html) {
  return String(html == null ? '' : html)
    .replace(/http:\/\/www\.w3\.org\/\d{4}\/[a-z]+/g, '');
}

// 每条规则自带说明，报出问题时能直接告诉用户「为什么算外链」
const RULES = [
  { re: /https?:\/\//i, why: 'http(s):// 外链' },
  { re: /cdn\./i, why: 'cdn. 域名引用' },
  { re: /@import/i, why: '@import 外部样式' },
  { re: /src\s*=\s*['"]https?:/i, why: 'src 指向远程资源' },
  { re: /<link/i, why: '<link> 标签（多为外部样式/字体）' },
];

/**
 * 找出文本里的全部外链痕迹。
 * @param {string} html demo 源码
 * @param {{withContext?:boolean}} [opt] withContext=true 时附命中的上下文片段
 * @returns {{why:string, text:string}[]} 命中的规则（同一规则只报一次）
 */
function findExternal(html, opt = {}) {
  const t = stripNamespaces(html);
  const hits = [];
  for (const r of RULES) {
    const m = t.match(r.re);
    if (!m) continue;
    let text = m[0];
    if (opt.withContext) {
      const i = m.index || 0;
      text = t.slice(Math.max(0, i - 20), i + 60).replace(/\s+/g, ' ');
    }
    hits.push({ why: r.why, text });
  }
  return hits;
}

/** 是否含外链 */
function hasExternal(html) {
  return findExternal(html).length > 0;
}

/** 命中规则的可读说明串（报错行直接用） */
function describe(html) {
  return findExternal(html).map(h => h.why).join(' / ');
}

module.exports = { stripNamespaces, findExternal, hasExternal, describe, RULES };
