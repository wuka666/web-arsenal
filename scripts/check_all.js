// 一条命令跑全库基线体检（宪法附录 / ROADMAP 3.4 的 P0 落地）
// 用法（项目根目录）：node scripts/check_all.js
// 覆盖：语法 / id 唯一 / 参数≥6 / 死参数 / 来源空 / 演示文件存在 / 代码=demo / 搭配悬空 / 标签闭集 / 配色对齐 / 零外链
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const root = process.cwd();
let fail = 0;
const bad = (msg) => { fail++; console.log("  ✗ " + msg); };

// 数据加载统一走 lib/data（2026-10-31：原先 12 处各写一份 new Function 样板，行为还不一致）
const { loadMaterials, loadSchemes } = require("./lib/data");
const { compare } = require("./lib/code-sync");
const M = loadMaterials();
const S = loadSchemes();
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
    // 代码 = demo：判据统一走 lib/code-sync（2026-10-31）。
    //   原先这里用 eval 试两次、不做双重转义反解 → 287 条双重转义存储的条目永远判不出来（假阴性）。
    //   lib/code-sync 的 normalize/compare 就是 check_sync.js 那份唯一正确的实现，判据只会更严。
    if (Object.prototype.hasOwnProperty.call(e, "代码")) {
      if (!compare(e.代码, html).ok) bad(`${label} ${e.id} ${t} 代码字段 ≠ demo`);
    }
    // 参数 < 6（skeleton 类文档条目除外）
    if (params.length && params.length < 6) bad(`${label} ${e.id} ${t} 参数仅 ${params.length} 个（<6）`);
    // 附加演示 / 随包库文件存在性（2026-10-02 全库审计补）：
    //   此前只校验 效果演示/演示页，M066 与 S19 的 ThreeJS演示 指向已不存在的文件却长期全绿。
    //   规矩 11⑤：带 ThreeJS演示 的 3D 素材，降级版与完整版缺一不可。
    ['ThreeJS演示', '下载'].forEach(k => {
      if (e[k] && !fs.existsSync(path.join(root, e[k]))) bad(`${label} ${e.id} ${t} ${k} 文件缺失: ${e[k]}（规矩 11⑤：完整版 / 随包库文件必须存在）`);
    });
    // 参数契约（2026-10-02 全库审计补）：index.html 唯一的调参通道是 iframe.contentWindow.postMessage({type:'param'})，
    //   demo 没有 message 监听 = 参数面板拖了没反应。此前 S37–S42 六套方案的 :root 参数全是死的，校验却全绿。
    if (params.length && !/addEventListener\(\s*['"]message['"]|onmessage/.test(html)) {
      bad(`${label} ${e.id} ${t} demo 无 message 监听：参数面板调了不生效（规矩 10①：须支持 postMessage type='param' 调参）`);
    }
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
  // 2026-09-26 收敛：尾部小桶已合并进「其他·特色风格」，碎片值移出词表防止再长回来
  "风格": ["极简瑞士", "科技未来", "暗色", "iOS 原生", "品牌海报", "有机自然", "编辑杂志", "其他·特色风格"],
  "场景": ["落地页·发布页", "官网·品牌站", "工具·SaaS", "后台·数据看板", "作品集·叙事", "内容·阅读", "电商·预订", "其他·场景"],
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

// 4.5) 最小桶容量（2026-09-26 立）
//   桶太碎 = 筛一下只出一两条 = 等于没有筛选。规则：素材 风格/场景 ≥10、适配端/元素 ≥5；方案 适配端 ≥3（移动端方案天然少，2026-09-27 起下调）、风格/场景 ≥5。
//   不足的桶必须合并进相邻桶，或降级为「仅搜索命中」不做成筛选 chip。
//   依据：GitHub React Bits 200+ 组件只用 5 个顶层分类（≈40 条/桶），不设自由标签墙。
//
// ⚠️ 2026-10-31 修（用户点名的「问题7」）：
//   原实现只遍历 `cnt` 里出现过的值（`Object.keys(cnt)`），于是「0 条的档」根本不进循环、
//   永远不会被统计 —— 6 个 0 条档长期隐形（素材：风格「有机自然」「编辑杂志」、
//   场景「作品集·叙事」「其他·场景」；方案：风格「iOS 原生」「品牌海报」）。
//   现改为**遍历完整词表**：词表里有、数据里 0 条的档也要现身。
//   但 0 条档不能直接报 ✗（那会让基线立刻变红），而是汇总成一条 `⚠️ 0 条档` 告警行，
//   **不计入 fail、不 exit 1**。将来有人往里落 1 条（>0 但 <阈值）时，走下面的 MIN_BUCKET
//   逻辑照常报错；0 条则始终只是「提醒」。
const MIN_BUCKET = {
  素材: { 适配端: 5, 元素: 5, 风格: 10, 场景: 10 },
  方案: { 适配端: 3, 风格: 5, 场景: 5 }
};
// 0 条档的审计结果（只告警、不判不合格）
const zeroBuckets = [];
[["素材", M, ["适配端", "元素", "风格", "场景"]], ["方案", S, ["适配端", "风格", "场景"]]].forEach(([label, list, dims]) => {
  dims.forEach(dim => {
    const cnt = {};
    list.forEach(e => { const v = (e[dim] || "").trim(); if (v) cnt[v] = (cnt[v] || 0) + 1; });
    const min = MIN_BUCKET[label][dim];
    // ① 完整词表：词表里有、但数据里 0 条的档 —— 只记入 zeroBuckets，不判不合格
    (TAXONOMY[dim] || []).forEach(v => {
      if ((cnt[v] || 0) === 0) zeroBuckets.push({ label, dim, value: v, min, gap: min });
    });
    // ② 数据里出现过的档：低于阈值照常报错（0 条的已在 ① 里拦下，不会重复判红）
    Object.keys(cnt).sort((a, b) => cnt[a] - cnt[b]).forEach(v => {
      if (cnt[v] < min) bad(`${label} ${dim}「${v}」仅 ${cnt[v]} 条 < 最小桶容量 ${min}（须合并相邻桶，或降级为仅搜索命中）`);
    });
  });
});
// 0 条档告警行：⚠️ 前缀 + 汇总，明确「不判不合格」，免得以后有人误以为该删档
if (zeroBuckets.length) {
  const detail = zeroBuckets
    .map(z => `${z.label}·${z.dim}「${z.value}」0 条（阈值 ${z.min}，差 ${z.gap} 条）`)
    .join("；");
  console.log(`  ⚠️ 0 条档 ${zeroBuckets.length} 个（只告警、不计不合格；词表里有但暂无条目）：`);
  console.log("     " + detail);
} else {
  console.log("  ✅ 0 条档：词表内每一档都已有条目");
}

// 4.6) 入库标准硬门槛（2026-09-27 立，对应宪法规矩 5）
//   本段为「裸规矩接脚本」：规矩5 要求「效果说明满两行以上 + 用法 + 来源」，此前无任何脚本校验，
//   实测全库 85 条「效果说明仅 1 行」违规却长期报全绿（2026-09-27 全库审计发现并已修复）。
//   方案库无「效果说明」字段，其说明落在「我的说明」，故只校验非空、不校验行数。
const lineCount = (t) => String(t || "").split("\n").filter(s => s.trim()).length;
M.forEach(e => {
  const lc = lineCount(e.效果说明);
  if (lc < 2) bad(`素材 ${e.id}「${e.标题}」效果说明仅 ${lc} 行 < 2 行（宪法规矩5：好在哪 + 能怎么改，须满两行以上）`);
  if (!String(e.用法 || "").trim()) bad(`素材 ${e.id}「${e.标题}」用法为空（规矩5）`);
  const src = String(e.来源 || "").trim();
  if (!src) bad(`素材 ${e.id}「${e.标题}」来源为空（规矩19：须按五分类标注）`);
  else {
    // 五分类可归类性：①具体网站(含域名/GitHub) ②来自于抖音 ③自研 ④机制参考 ⑤方案库拆解
    const ok = /来自于抖音/.test(src) || /自研/.test(src) || /机制参考|已换题重推/.test(src)
      || /方案库 S\d|拆解/.test(src) || /\.(com|cn|io|dev|ai|app|design|net|org|co)\b/i.test(src)
      || /GitHub\s+[\w.-]+\/[\w.-]+\s*（[^）]*）/i.test(src);
    if (!ok) bad(`素材 ${e.id}「${e.标题}」来源无法归入五分类：「${src.slice(0, 30)}」（规矩19）`);
  }
});
S.forEach(e => {
  if (!String(e.我的说明 || "").trim()) bad(`方案 ${e.id}「${e.风格名}」我的说明为空`);
  const src = String(e.来源 || "").trim();
  if (!src) bad(`方案 ${e.id}「${e.风格名}」来源为空（规矩19）`);
});
console.log("  ✅ 入库标准：效果说明/用法/来源 全部达标");

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
