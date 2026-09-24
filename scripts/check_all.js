// 一条命令跑全库基线体检（宪法附录 / ROADMAP 3.4 的 P0 落地）
// 用法（项目根目录）：node scripts/check_all.js
// 覆盖：语法 / id 唯一 / 参数≥6 / 死参数 / 来源空 / 演示文件存在 / 代码=demo / 搭配悬空 / 标签闭集 / 配色对齐 / 零外链
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const root = process.cwd();
let fail = 0;
const bad = (msg) => { fail++; console.log("  ✗ " + msg); };

function load(rel) { const w = {}; new Function("window", fs.readFileSync(path.join(root, rel), "utf8"))(w); return w; }
const M = load("data/素材.js").WEB_ARSENAL;
const S = load("data/方案.js").WEB_SCHEMES;
const sIds = new Set(S.map(s => s.id));

// 1) 语法
["data/素材.js", "data/方案.js"].forEach(f => {
  try { execFileSync(process.execPath, ["--check", path.join(root, f)], { stdio: "pipe" }); }
  catch (e) { bad(f + " 语法错误"); }
});

// 2) 两库公共检查
function audit(list, label, demoKey) {
  const ids = new Set();
  list.forEach(e => {
    const t = e.标题 || e.名称 || "";
    if (ids.has(e.id)) bad(label + " id 重复: " + e.id); ids.add(e.id);
    const params = e.参数 || [];
    if (!e.来源 || !String(e.来源).trim()) bad(`${label} ${e.id} ${t} 来源为空`);
    if ((e.代码 === undefined) === false) { /* 有代码字段才比对 */ }
    const demo = e[demoKey];
    if (!demo) {
      // skeleton-01 是文档条目，无 demo 属设计如此
      if (e.id !== "skeleton-01") bad(`${label} ${e.id} ${t} 无演示路径`);
      return;
    }
    const fp = path.join(root, demo);
    if (!fs.existsSync(fp)) { bad(`${label} ${e.id} ${t} 演示文件缺失: ${demo}`); return; }
    const html = fs.readFileSync(fp, "utf8");
    // 代码 = demo：素材库两种存储形态并存（单层序列化=值直接是 HTML；双层=值再求值一次），都要试
    if (Object.prototype.hasOwnProperty.call(e, "代码")) {
      let ok = (e.代码 === html);
      if (!ok) {
        let v = null;
        try { v = new Function("return " + e.代码)(); } catch (err) { }
        if (v !== html && typeof v === "string") { try { v = new Function("return " + v)(); } catch (err) { } }
        ok = (v === html);
      }
      if (!ok) bad(`${label} ${e.id} ${t} 代码字段 ≠ demo`);
    }
    // 参数 < 6（skeleton 类文档条目除外）
    if (params.length && params.length < 6) bad(`${label} ${e.id} ${t} 参数仅 ${params.length} 个（<6）`);
    // 死参数：键不在 demo 里
    params.forEach(p => {
      const k = p.键 || "";
      if (k && !html.includes(k)) bad(`${label} ${e.id} ${t} 疑似死参数「${k}」`);
    });
    return html;
  });
}
audit(M, "素材", "效果演示");
audit(S, "方案", "演示页");

// 3) 搭配 id 型悬空
const mIds = new Set(M.map(m => m.id));
M.forEach(m => (m.搭配 || []).forEach(d => {
  if (/^(v|m|s|f|a|w|r|soa)\d/i.test(d) && !mIds.has(d) && !sIds.has(d)) bad(`素材 ${m.id} 搭配「${d}」不存在`);
}));

// 3.5) 渲染层按数组消费的字段，类型必须是数组
//   （index.html 用 (it.标签||[]).forEach 与 s.参考站.forEach；字段被写成字符串会直接抛错，
//    中断卡片生成 → 整个画廊白屏。2026-09-23 M219–M228「标签」被写成字符串正是因此崩掉。）
const mustBeArr = (obj, key, label) => {
  if (obj[key] === undefined) return;
  if (!Array.isArray(obj[key])) { bad(`${label} ${obj.id} ${obj.标题 || obj.风格名 || ""} ${key} 应为数组（现为 ${typeof obj[key]}）`); return; }
  obj[key].forEach((v, i) => { if (typeof v !== "string" && typeof v !== "number") bad(`${label} ${obj.id} ${key}[${i}] 应为字符串`); });
};
M.forEach(m => mustBeArr(m, "标签", "素材"));
S.forEach(s => { mustBeArr(s, "参考站", "方案"); mustBeArr(s, "标签", "方案"); });

// 4) 标签闭集：四维取值必须落在词表内（防止以后又长出新碎片），且必须是单值字符串
const TAXONOMY = {
  "适配端": ["通用", "PC 端", "移动端"],
  "风格": ["极简瑞士", "科技未来", "暗色", "iOS 原生", "品牌海报", "国风水墨", "玻璃拟态", "新拟态软 UI", "粗野·新粗野", "有机自然", "复古怀旧", "童趣黏土", "编辑杂志"],
  "场景": ["落地页·发布页", "官网·品牌站", "工具·SaaS", "后台·数据看板", "作品集·叙事", "内容·阅读", "电商·预订"],
  "元素": ["动作", "输入", "导航", "反馈", "数据", "容器布局", "媒体", "文字", "动效", "背景氛围"]
};
const asArr = v => Array.isArray(v) ? v : (v ? [v] : []);
function checkTags(list, label, dims) {
  dims.forEach(dim => {
    list.forEach(e => {
      const t = e.标题 || e.风格名 || "";
      if (Array.isArray(e[dim])) bad(`${label} ${e.id} ${t} ${dim} 应为单值字符串（现为数组）`);
      asArr(e[dim]).forEach(v => {
        if (!TAXONOMY[dim].includes(v)) bad(`${label} ${e.id} ${t} ${dim} 取值「${v}」不在词表闭集内`);
      });
    });
  });
}
checkTags(M, "素材", ["适配端", "风格", "场景", "元素"]);
checkTags(S, "方案", ["适配端", "风格", "场景"]);
S.forEach(e => { if (e.元素 !== undefined) bad(`方案 ${e.id} 不应有「元素」字段（整站方案不按元素分）`); });
console.log("  ✅ 标签闭集：四维取值全部在词表内");

// 5) 配色对齐 + 零外链（复用现成脚本）
try { execFileSync(process.execPath, [path.join(root, "scripts/check_links.js")], { stdio: "inherit" }); }
catch (e) { fail++; }
try {
  const out = execFileSync(process.execPath, [path.join(root, "scripts/check_palette.js")], { encoding: "utf8" });
  const badRows = out.split("\n").filter(l => /❌|⚠/.test(l));
  if (badRows.length) { fail++; console.log("  ✗ 配色未对齐："); badRows.forEach(l => console.log("    " + l.trim())); }
  else console.log("  ✅ 配色对齐：全部通过");
} catch (e) { fail++; }

console.log(fail === 0 ? "\n✅✅ 基线体检全部通过（素材 " + M.length + " + 方案 " + S.length + "）" : "\n❌ 共 " + fail + " 处不合格");
process.exit(fail === 0 ? 0 : 1);
