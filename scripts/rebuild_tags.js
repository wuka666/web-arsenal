// 标签全量重组：按新四维词表重写两库标签（删旧 分类/子类，写 适配端/元素/风格/场景）
// 用法（项目根目录）：node scripts/rebuild_tags.js [--dry]
// 安全边界：只在每条 id → 「代码」字段之间的**字段区**做改写，`代码` 与 demo 的逐字节一致性不受影响
const fs = require("fs"), path = require("path");
const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

// ================= 闭集 =================
const ADAPT = ["通用", "PC 端", "移动端"];
const STYLES = ["极简瑞士", "科技未来", "暗色", "iOS 原生", "品牌海报", "国风水墨", "玻璃拟态", "新拟态软 UI", "粗野·新粗野", "有机自然", "复古怀旧", "童趣黏土", "编辑杂志"];
const SCENES = ["落地页·发布页", "官网·品牌站", "工具·SaaS", "后台·数据看板", "作品集·叙事", "内容·阅读", "电商·预订"];
const ELEMS = ["动作", "输入", "导航", "反馈", "数据", "容器布局", "媒体", "文字", "动效", "背景氛围"];

// ================= 映射表 A：分类▸子类 → 元素（52 格全覆盖）=================
const ELEM_MAP = {
  "AI反馈▸产物预览": "反馈", "AI反馈▸失败重试": "反馈", "AI反馈▸授权确认": "反馈", "AI反馈▸步骤进度": "反馈",
  "AI反馈▸结果汇总": "反馈", "AI反馈▸计划预览": "反馈", "AI反馈▸调用记录": "反馈", "AI反馈▸过程透明": "反馈",

  "动效▸入场出场": "动效", "动效▸入场序列": "动效", "动效▸滚动联动": "动效", "动效▸转场": "动效",
  "动效▸转场滚动": "动效", "动效▸遮罩揭示": "动效",
  "动效▸悬停": "动作", "动效▸手势": "动作", "动效▸按压": "动作", "动效▸按钮": "动作",
  "动效▸提示动效": "反馈",

  "布局骨架▸分章叙事": "容器布局", "布局骨架▸分组卡组": "容器布局", "布局骨架▸卡片墙": "容器布局",
  "布局骨架▸卡片编排": "容器布局", "布局骨架▸首屏Hero": "容器布局",

  "文字▸文字变形": "文字",
  "文字动画▸数字滚动": "数据", "文字动画▸逐字入场": "文字", "文字动画▸遮罩揭示": "文字",

  "组件▸下拉选择": "输入", "组件▸开关": "输入", "组件▸标签选择": "输入", "组件▸移动端控件": "输入", "组件▸表单": "输入",
  "组件▸导航": "导航", "组件▸步骤条": "导航", "组件▸菜单搜索": "导航",
  "组件▸弹窗抽屉": "容器布局", "组件▸浮层": "容器布局",
  "组件▸主题切换": "动作", "组件▸拖拽排序": "动作", "组件▸按钮": "动作", "组件▸操作": "动作",
  "组件▸提示条": "反馈", "组件▸新手引导": "反馈", "组件▸状态反馈": "反馈", "组件▸进度加载": "反馈", "组件▸步骤进度": "反馈",
  "组件▸轮播": "媒体",
  "组件▸文本展开": "文字",

  "背景▸3D": "背景氛围", "背景▸渐变": "背景氛围", "背景▸粒子": "背景氛围"
};

// ================= 映射表 B：旧风格 → 新风格（视觉语言可直映的部分）=================
const STYLE_MAP = {
  "极简": "极简瑞士",
  "科技": "科技未来", "AI产品": "科技未来", "企业级": "科技未来",
  "暗色": "暗色",
  "iOS原生": "iOS 原生",
  "叙事仪式": "品牌海报", "品牌": "品牌海报", "海报风": "品牌海报", "运动": "品牌海报",
  "国风": "国风水墨",
  "玻璃拟态": "玻璃拟态",
  "拟物": "新拟态软 UI",
  "工业风": "粗野·新粗野",
  "暖调": "有机自然", "柔美": "有机自然",
  "复古": "复古怀旧"
  // 通用 / 信息型 / 轻盈 / 卡片风 / 电商 = 密度或用途描述词，不是视觉语言 → 交给 demo 特征推断，推不出就留空
};

// ================= 映射表 C：旧场景 → 新场景 =================
const SCENE_MAP = {
  "落地页·发布页": "落地页·发布页", "工具·SaaS": "工具·SaaS", "官网·品牌站": "官网·品牌站",
  "作品集·叙事": "作品集·叙事", "后台·数据看板": "后台·数据看板", "内容·阅读": "内容·阅读", "电商·预订": "电商·预订",
  "首屏主视觉": "落地页·发布页", "活动宣传": "落地页·发布页",
  "后台·控制台": "后台·数据看板",
  "顶部导航栏": "官网·品牌站",
  "内容分组": "内容·阅读",
  "表单流程": "工具·SaaS",
  "结账流程": "电商·预订",
  "文档库": "内容·阅读",
  "商品详情": "电商·预订",
  "相册": "作品集·叙事"
  // 全站通用 / 通用模块区 / 移动端 / 移动端·H5 → 推断（「全站通用」与「全部」语义重复，已废弃）
};
// 场景兜底（先按标题命中，再按元素）
const SCENE_BY_TITLE = [
  [/相册|画廊|陈列|标本|唱片|作品|海报墙/, "作品集·叙事"],
  [/商品|结账|购物车|价目|定价|下单/, "电商·预订"],
  [/文档|博客|文章|阅读|杂志|报刊|书/, "内容·阅读"],
  [/后台|看板|控制台|仪表|大屏|数据/, "后台·数据看板"],
  [/定价|套餐|订阅|表单|登录|注册|搜索/, "工具·SaaS"],
  [/首屏|Hero|标题|横幅|封面|发布/, "落地页·发布页"]
];
const SCENE_BY_ELEM = {
  "动作": "工具·SaaS", "输入": "工具·SaaS", "反馈": "工具·SaaS",
  "导航": "官网·品牌站",
  "数据": "后台·数据看板",
  "容器布局": "落地页·发布页",
  "媒体": "电商·预订",
  "文字": "内容·阅读",
  "动效": "落地页·发布页",
  "背景氛围": "落地页·发布页"
};

// ================= 适配端规则 =================
// 「移动端」只认显式的移动端控件（底部栏 / 抽屉 / 侧滑 / 长按菜单）——这些是 mobile 专属形态。
// 不拿 touch 事件当依据：本库只有 3 个 canvas 背景效果监听 touch，且都同时支持鼠标，用它会误伤。
// 「PC 端」= 依赖 hover 或需要大屏多栏；滚动类动效两端通用，归「通用」。
const PC_SUBS = ["导航", "悬停", "菜单搜索", "拖拽排序", "卡片墙", "首屏Hero", "浮层", "弹窗抽屉", "大型菜单"];
function inferAdapt(e) {
  if (e.子类 === "移动端控件") return "移动端";
  if (PC_SUBS.includes(e.子类)) return "PC 端";
  return "通用";
}

// ================= 风格推断（只在旧值不是视觉语言时启用，取 demo 客观特征）=================
function bgColor(html) {
  const pats = [
    /body\s*\{[^}]*?background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,8})/,
    /--di\s*:\s*(#[0-9a-fA-F]{3,8})/,
    /--bg\s*:\s*(#[0-9a-fA-F]{3,8})/,
    /--ye\s*:\s*(#[0-9a-fA-F]{3,8})/,
    /html\s*\{[^}]*?background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,8})/
  ];
  for (const p of pats) { const m = html.match(p); if (m) return m[1]; }
  return null;
}
function lum(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  if (h.length < 6) return null;
  const r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function inferStyle(html) {
  if (/backdrop-filter\s*:\s*blur/i.test(html)) return "玻璃拟态";
  const bg = bgColor(html);
  if (bg) { const l = lum(bg); if (l !== null && l < 0.32) return "暗色"; }
  if (/font-family\s*:[^;}]*serif/i.test(html) && /clamp\(\s*[2-9]\dpx/.test(html) && /letter-spacing/.test(html)) return "编辑杂志";
  return "";
}

// ================= 改写引擎 =================
const asArr = v => Array.isArray(v) ? v : (v ? [v] : []);
function readLib(rel) {
  const c = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const w = {}; new Function("window", c)(w);
  return w;
}
const CODE_AT = /\n\s*代码:\s*["`]/;

function rewrite(file, transform, idsFromText) {
  let text = fs.readFileSync(path.join(ROOT, file), "utf8");
  // 收集所有条目的 id 与其起始偏移（按出现顺序）
  const marks = [];
  const re = /id:\s*"([A-Za-z]+\d+)"/g;
  let m;
  while ((m = re.exec(text))) marks.push({ id: m[1], at: m.index });
  // 从后往前改，保证前面的偏移不被破坏
  const failed = [];
  for (let i = marks.length - 1; i >= 0; i--) {
    const { id, at } = marks[i];
    const tail = text.slice(at);
    const cm = tail.match(CODE_AT);
    if (!cm) { failed.push(id + " 找不到「代码」字段边界"); continue; }
    const codeAt = at + cm.index;
    const head = text.slice(at, codeAt);
    const next = transform(id, head);
    if (next === null) { failed.push(id + " 转换函数返回 null"); continue; }
    text = text.slice(0, at) + next + text.slice(codeAt);
  }
  return { text, failed, count: marks.length };
}

// 字段级改写器：定位「行首的 名: 」并吃掉整个值（多行数组按括号配对扫描，单值吃到行尾）
function findField(head, name) {
  const m = head.match(new RegExp("\n(\\s*)" + name + "\\s*:\\s*"));
  if (!m) return null;
  const start = m.index + 1;                 // 该行首个字符
  const ind = m[1];
  let i = m.index + m[0].length;             // 值的第一个字符
  const valStart = i;
  let valEnd;
  if (head[i] === "[") {
    let depth = 0, q = null;
    for (; i < head.length; i++) {
      const c = head[i];
      if (q) { if (c === "\\") { i++; continue; } if (c === q) q = null; continue; }
      if (c === '"' || c === "'" || c === "`") { q = c; continue; }
      if (c === "[" || c === "{") depth++;
      else if (c === "]" || c === "}") { depth--; if (depth === 0) { i++; break; } }
    }
    valEnd = i;
  } else {
    const nl = head.indexOf("\n", i);
    valEnd = nl < 0 ? head.length : nl;
  }
  let end = valEnd;                          // 吃掉尾随逗号与空格，停在换行前
  while (end < head.length && head[end] !== "\n" && /[ \t,]/.test(head[end])) end++;
  return { start, end, ind, raw: head.slice(valStart, valEnd) };
}
function replaceField(head, name, value) {
  const f = findField(head, name);
  if (!f) return head;
  return head.slice(0, f.start) + f.ind + name + ": " + JSON.stringify(value) + "," + head.slice(f.end);
}
function removeField(head, name) {
  const f = findField(head, name);
  if (!f) return head;
  let end = f.end;
  if (head[end] === "\n") end++;
  return head.slice(0, f.start) + head.slice(end);
}
function insertAfterField(head, name, lines) {
  const f = findField(head, name);
  if (!f) return head;
  return head.slice(0, f.end) + lines.map(l => "\n" + f.ind + l).join("") + head.slice(f.end);
}

// ---------------- 素材库 ----------------
const MAT = readLib("data/素材.js").WEB_ARSENAL;
const matById = {}; MAT.forEach(e => matById[e.id] = e);
const stat = { adapt: {}, style: {}, scene: {}, elem: {}, styleInfer: 0, sceneInfer: 0, noStyle: 0 };

function transformMat(id, head) {
  const e = matById[id];
  if (!e) return null;
  const html = fs.readFileSync(path.join(ROOT, e.效果演示), "utf8");

  const elem = ELEM_MAP[e.分类 + "▸" + e.子类];
  if (!elem) throw new Error("✗ 元素映射缺格：" + id + " " + e.分类 + "▸" + e.子类);

  let adapt = inferAdapt(e);

  let style = asArr(e.风格).map(v => STYLE_MAP[v]).find(Boolean) || "";
  if (!style) { style = inferStyle(html); if (style) stat.styleInfer++; else stat.noStyle++; }

  let scene = asArr(e.场景).map(v => SCENE_MAP[v]).find(Boolean) || "";
  if (!scene) {
    const byTitle = SCENE_BY_TITLE.find(([re]) => re.test(e.标题 || ""));
    scene = byTitle ? byTitle[1] : (SCENE_BY_ELEM[elem] || "");
    if (scene) stat.sceneInfer++;
  }

  stat.adapt[adapt] = (stat.adapt[adapt] || 0) + 1;
  stat.style[style || "(留空)"] = (stat.style[style || "(留空)"] || 0) + 1;
  stat.scene[scene || "(留空)"] = (stat.scene[scene || "(留空)"] || 0) + 1;
  stat.elem[elem] = (stat.elem[elem] || 0) + 1;

  let h = head;
  h = removeField(h, "分类");
  h = removeField(h, "子类");
  h = removeField(h, "适配端");
  h = insertAfterField(h, "标题", ["适配端: " + JSON.stringify(adapt) + ","]);
  h = replaceField(h, "风格", style);
  h = replaceField(h, "场景", scene);
  h = replaceField(h, "元素", elem);
  return h;
}

// ---------------- 方案库 ----------------
const SCH = readLib("data/方案.js").WEB_SCHEMES;
const schById = {}; SCH.forEach(e => schById[e.id] = e);
// 方案 = 整站设计语言，35 套逐个人工定档 [适配端, 风格, 场景]
// 适配端判定依据（2026-09-20 加测）：375×812 实测（scripts/check_adapt.js）+ 2026 响应式标准
//   「响应式≠缩小版：多栏必须在窄屏堆叠；hover/光标揭示的信息触摸端不可达」
//   PC 端 = 窄屏破版 / 仍是并排多栏被压碎 / 语义依赖并排对照 / 核心交互依赖 hover·光标
//   通用   = 窄屏自然堆叠成单栏且每段完整可读（无溢出、无压碎）
const SCHEME_TAGS = {
  S01: ["通用", "暗色", "后台·数据看板"], S02: ["PC 端", "编辑杂志", "作品集·叙事"], S03: ["PC 端", "玻璃拟态", "官网·品牌站"],
  S04: ["PC 端", "极简瑞士", "后台·数据看板"], S05: ["PC 端", "编辑杂志", "内容·阅读"], S06: ["通用", "暗色", "官网·品牌站"],
  S07: ["通用", "有机自然", "落地页·发布页"], S08: ["PC 端", "粗野·新粗野", "落地页·发布页"], S09: ["PC 端", "科技未来", "后台·数据看板"],
  S10: ["通用", "有机自然", "工具·SaaS"], S11: ["PC 端", "复古怀旧", "作品集·叙事"], S12: ["PC 端", "国风水墨", "作品集·叙事"],
  S13: ["通用", "有机自然", "落地页·发布页"], S14: ["PC 端", "极简瑞士", "落地页·发布页"], S15: ["通用", "极简瑞士", "官网·品牌站"],
  S16: ["通用", "科技未来", "落地页·发布页"], S17: ["PC 端", "有机自然", "官网·品牌站"], S18: ["通用", "暗色", "落地页·发布页"],
  S19: ["通用", "暗色", "落地页·发布页"], S20: ["PC 端", "有机自然", "内容·阅读"], S21: ["PC 端", "极简瑞士", "作品集·叙事"],
  S22: ["PC 端", "复古怀旧", "电商·预订"], S23: ["通用", "极简瑞士", "内容·阅读"], S24: ["通用", "科技未来", "后台·数据看板"],
  S25: ["PC 端", "极简瑞士", "作品集·叙事"], S26: ["通用", "科技未来", "电商·预订"], S27: ["PC 端", "编辑杂志", "电商·预订"],
  S28: ["通用", "品牌海报", "电商·预订"], S29: ["通用", "科技未来", "落地页·发布页"], S30: ["通用", "科技未来", "后台·数据看板"],
  S31: ["通用", "编辑杂志", "官网·品牌站"], S32: ["PC 端", "极简瑞士", "作品集·叙事"], S33: ["通用", "极简瑞士", "落地页·发布页"],
  S34: ["通用", "玻璃拟态", "落地页·发布页"], S35: ["PC 端", "编辑杂志", "内容·阅读"]
};
function transformSch(id, head) {
  const tag = SCHEME_TAGS[id];
  if (!tag) throw new Error("✗ 方案缺定档：" + id);
  let h = removeField(head, "适配端");
  h = removeField(h, "风格");
  h = removeField(h, "场景");
  h = insertAfterField(h, "风格名", [
    "适配端: " + JSON.stringify(tag[0]) + ",",
    "风格: " + JSON.stringify(tag[1]) + ",",
    "场景: " + JSON.stringify(tag[2]) + ","
  ]);
  return h;
}

// ================= 执行 =================
const r1 = rewrite("data/素材.js", transformMat);
const r2 = rewrite("data/方案.js", transformSch);
if (r1.failed.length || r2.failed.length) {
  console.error("✗ 失败：" + [...r1.failed, ...r2.failed].join(" / "));
  process.exit(1);
}
console.log("素材改写 " + r1.count + " 条 / 方案改写 " + r2.count + " 条");
if (DRY) { console.log("（--dry 干跑，不写盘）"); } else {
  fs.writeFileSync(path.join(ROOT, "data/素材.js"), r1.text, "utf8");
  fs.writeFileSync(path.join(ROOT, "data/方案.js"), r2.text, "utf8");
  console.log("✓ 已写盘");
}
console.log("\n适配端分布:", JSON.stringify(stat.adapt));
console.log("元素分布:  ", JSON.stringify(stat.elem));
console.log("风格分布:  ", JSON.stringify(stat.style));
console.log("           （其中由 demo 特征推断 " + stat.styleInfer + " 条，留空 " + stat.noStyle + " 条）");
console.log("场景分布:  ", JSON.stringify(stat.scene));
console.log("           （其中推断 " + stat.sceneInfer + " 条）");
