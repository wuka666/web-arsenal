// 方案演示页配色对齐检查：demo 里实际用的 hex 是否命中该方案 参数 的 color 默认值
// 用法（项目根目录）：node scripts/check_palette.js
const fs = require("fs"), path = require("path");
const root = process.cwd();
const w = {};
new Function("window", fs.readFileSync(path.join(root, "data/方案.js"), "utf8"))(w);
const schemes = w.WEB_SCHEMES;

const norm = s => String(s || "").trim().toLowerCase().replace(/\s+/g, '');
const rows = [];
schemes.forEach(s => {
  const demo = s.演示页;
  const colors = (s.参数 || []).filter(p => p.类型 === "color").map(p => norm(p.默认));
  if (!demo || !colors.length) { rows.push({ id: s.id, name: s.名称 || "", n: 0, tot: colors.length, miss: [], demo: demo || "(无)" }); return; }
  const fp = path.join(root, demo);
  if (!fs.existsSync(fp)) { rows.push({ id: s.id, name: s.名称 || "", n: 0, tot: colors.length, miss: colors, demo: demo + " [缺失]" }); return; }
  const html = fs.readFileSync(fp, "utf8").toLowerCase();
  const used = new Set();
  for (const m of html.matchAll(/#[0-9a-f]{3,8}\b/g)) used.add(m[0]);
  for (const m of html.matchAll(/rgba?\([^)]*\)/g)) used.add(m[0].replace(/\s+/g, ''));
  const hit = colors.filter(c => {
    if (used.has(c)) return true;
    // 容忍 8 位（带 alpha）与 6 位、3 位缩写互转
    if (c.length === 9 && used.has(c.slice(0, 7))) return true;
    if (c.length === 7 && [...used].some(u => u.length === 9 && u.slice(0, 7) === c)) return true;
    return false;
  });
  const miss = colors.filter(c => !hit.includes(c));
  rows.push({ id: s.id, name: s.名称 || "", n: hit.length, tot: colors.length, miss, demo });
});

rows.sort((a, b) => a.n / (a.tot || 1) - b.n / (b.tot || 1));
let out = ["===== 方案演示页配色对齐（" + rows.length + " 条）====="];
rows.forEach(r => {
  if (!r.tot) { out.push(`  -- ${r.id} ${r.name} 无 color 参数（${r.demo}）`); return; }
  const mark = r.n === r.tot ? "✅" : (r.n === 0 ? "❌" : "⚠");
  out.push(`  ${mark} ${r.id} ${r.name}  ${r.n}/${r.tot}` + (r.miss.length ? "  缺: " + r.miss.join(" ") : ""));
});
console.log(out.join("\n"));
