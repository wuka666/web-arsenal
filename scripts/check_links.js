// 全库零外链检查：扫 assets/demos 全部 HTML（排除 SVG xmlns 标识符）
//   排除 `_*_tmp.html`：check_adapt / check_touch_targets / check_vars 的运行时探针页
//   （本沙箱下它们的 finally{unlinkSync} 会静默失败，探针会残留在 demos 里 → 会计进总数虚高）
// 用法（项目根目录）：node scripts/check_links.js
const fs = require("fs"), path = require("path");
const root = process.cwd();
const dir = path.join(root, "assets/demos");
const isProbe = f => /^_.*_tmp\.html$/.test(f);
let hits = 0, total = 0, probes = 0;
fs.readdirSync(dir).forEach(f => {
  if (!f.endsWith(".html")) return;
  if (isProbe(f)) { probes++; return; }
  total++;
  // w3.org 命名空间是 SVG 规范标识符，从不发起请求，不算外链
  const t = fs.readFileSync(path.join(dir, f), "utf8").replace(/http:\/\/www\.w3\.org\/\d{4}\/[a-z]+/g, "");
  const m = t.match(/https?:\/\/[^\s"'<>)]+/g);
  if (m) { hits++; console.log("  ⚠ " + f + " → " + [...new Set(m)].slice(0, 3).join("  ")); }
});
console.log((hits === 0 ? "✅ " : "⚠ ") + total + " 个 demo，含外链 " + hits + " 个" + (probes ? "（另跳过 " + probes + " 个探针临时页）" : ""));
process.exit(hits === 0 ? 0 : 1);
