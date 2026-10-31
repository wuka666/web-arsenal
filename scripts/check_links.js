// 全库零外链检查：扫 assets/demos 全部 HTML（排除 SVG xmlns 标识符）
//   排除 `_*_tmp.html`：check_adapt / check_touch_targets / check_vars 的运行时探针页
//   （本沙箱下它们的 finally{unlinkSync} 会静默失败，探针会残留在 demos 里 → 会计进总数虚高）
// 用法（项目根目录）：node scripts/check_links.js
//
// 判据（2026-10-31 统一）：走 lib/links —— 与 verify_entry.js 用的是同一份**更严**的实现。
//   原先这里只查 `https?://`，会让 `<link>` / `@import` / `cdn.xxx` 裸域名溜过去。
//   统一后判据变严，可能因此报出以前漏掉的问题；真报了也不改数据，只进报告等用户定夺。
const fs = require("fs"), path = require("path");
const { findExternal } = require("./lib/links");
const root = process.cwd();
const dir = path.join(root, "assets/demos");
const isProbe = f => /^_.*_tmp\.html$/.test(f);
let hits = 0, total = 0, probes = 0;
fs.readdirSync(dir).forEach(f => {
  if (!f.endsWith(".html")) return;
  if (isProbe(f)) { probes++; return; }
  total++;
  const t = fs.readFileSync(path.join(dir, f), "utf8");
  const ext = findExternal(t);
  if (ext.length) {
    hits++;
    console.log("  ⚠ " + f + " → " + ext.map(e => e.why + "（" + e.text + "）").slice(0, 3).join("  "));
  }
});
console.log((hits === 0 ? "✅ " : "⚠ ") + total + " 个 demo，含外链 " + hits + " 个" + (probes ? "（另跳过 " + probes + " 个探针临时页）" : ""));
process.exit(hits === 0 ? 0 : 1);
