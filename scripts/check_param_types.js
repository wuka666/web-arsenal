// 参数「类型 vs 用法」冲突扫描：标 color 却被当数字参与 calc 计算（曾抓到 f016 mo 的真 bug）
// 用法（项目根目录）：node scripts/check_param_types.js
// 扫「参数类型 vs demo 实际用法」冲突：类型是 color，却被当数字参与计算（calc/除法/乘）
const fs = require("fs"), path = require("path");
const root = process.cwd();
const w = {};
new Function("window", fs.readFileSync(path.join(root, "data/方案.js"), "utf8"))(w);
const m = {};
new Function("window", fs.readFileSync(path.join(root, "data/素材.js"), "utf8"))(m);

function scan(list, libName) {
  const out = [];
  list.forEach(e => {
    const demo = e.演示页 || e.效果演示;
    if (!demo) return;
    const fp = path.join(root, demo);
    if (!fs.existsSync(fp)) return;
    const html = fs.readFileSync(fp, "utf8");
    (e.参数 || []).forEach(p => {
      if (p.类型 !== "color") return;
      const k = p.键;
      // 数字用法：被包在 calc() 里参与算术，或直接做除法/乘法
      const numeric = new RegExp("calc\\([^)]*var\\(--" + k + "[^)]*[/+\\-*]", "i").test(html)
        || new RegExp("var\\(--" + k + "\\)\\s*[/+*]", "i").test(html)
        || new RegExp("[/+*]\\s*var\\(--" + k + "\\)", "i").test(html);
      if (numeric) out.push(`${libName} ${e.id} ${e.名称 || e.标题 || ""} → 参数「${k}」标为 color(默认 ${p.默认})，但 demo 当数字用`);
    });
  });
  return out;
}
const r = [].concat(scan(w.WEB_SCHEMES, "方案"), scan(m.WEB_ARSENAL, "素材"));
console.log("=== 参数类型 vs 用法 冲突：" + r.length + " 处 ===");
r.forEach(x => console.log("  - " + x));
