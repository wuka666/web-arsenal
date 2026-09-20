// 全库零外链检查：扫 assets/demos 全部 HTML（排除 SVG xmlns 标识符）
// 用法（项目根目录）：node scripts/check_links.js
const fs = require("fs"), path = require("path");
const root = process.cwd();
const dir = path.join(root, "assets/demos");
let hits = 0, total = 0;
fs.readdirSync(dir).forEach(f => {
  if (!f.endsWith(".html")) return;
  total++;
  // w3.org 命名空间是 SVG 规范标识符，从不发起请求，不算外链
  const t = fs.readFileSync(path.join(dir, f), "utf8").replace(/http:\/\/www\.w3\.org\/\d{4}\/[a-z]+/g, "");
  const m = t.match(/https?:\/\/[^\s"'<>)]+/g);
  if (m) { hits++; console.log("  ⚠ " + f + " → " + [...new Set(m)].slice(0, 3).join("  ")); }
});
console.log((hits === 0 ? "✅ " : "⚠ ") + total + " 个 demo，含外链 " + hits + " 个");
process.exit(hits === 0 ? 0 : 1);
