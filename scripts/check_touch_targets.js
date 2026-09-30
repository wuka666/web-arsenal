// 存量触控目标尺寸核查：按 Agent宪法 附录B B1 量每个 demo 里「可交互元素的命中区」。
//   移动端·合规底线 24 / 人体工学 44（本项目取 44 为达标线）
//   PC 端·地板 24（取 24 为达标线）
// 判定：命中区 = min(宽, 高)；< 阈值即不达标（WCAG 2.5.8 要求宽高各 ≥ 阈值）。
//   间距豁免（目标间留 ≥24px 也可达标）本脚本不自动判，清单里单独标注供人工目检。
//
// 机制（复用 check_adapt.js）：Chrome 无头窗口有 500px 最小宽，必须用 iframe 造视口；
//   file:// 下读 iframe.contentDocument 须 --allow-file-access-from-files；临时页与 demo 同目录。
//   每个 demo 一个页面放两个 iframe（375 手机 + 1440 桌面），一次渲染测两端，省一半启动。
//
// 用法（项目根目录）：node scripts/check_touch_targets.js [--materials] [--schemes] [demo路径...]
//   不给参数 = 两库全量；--materials 仅素材库；--schemes 仅方案库
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
const root = process.cwd();
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const TMP_NAME = "_touch_probe_tmp.html";
const MOBILE_W = 375, DESK_W = 1440;
const MOBILE_MIN = 44, DESK_MIN = 24;   // 达标线（附录B B1）

// 候选「可交互元素」选择器（覆盖标签 + ARIA 角色 + 内联 onclick）
const SEL = "a,button,input,select,textarea,label,summary,details," +
  "[role='button'],[role='link'],[role='tab'],[role='menuitem']," +
  "[role='switch'],[role='option'],[role='checkbox'],[tabindex],[onclick]";

const PROBE = `(function(){
  function collect(f){
    var w=f.contentWindow, d=f.contentDocument;
    if(!w||!d) return {err:'iframe 不可读'};
    var matched=new Set(), out=[];
    // WCAG 例外豁免（2026-09-29）：元素或其祖先带 data-touch-exempt 者跳过，供「本质紧凑 / 44 物理不可行」的
    // 组件登记例外（如 iOS/Android 字母索引条——连续滑动命中区，21 字母×44px 会溢出屏幕，属 essential 例外）。
    function exempt(el){ try{ return !!(el.closest&&el.closest('[data-touch-exempt]')); }catch(e){ return false; } }
    // WCAG 2.5.8 **inline 例外**（2026-09-29 方案库实测补）：行内文本目标——**无 class** 的 a / label，
    // 高度受「非目标文本的行高」约束（≤28px，单行文本量级）→ 豁免。
    // 典型：页脚 / 正文 / 导航里的纯文字链接；强行撑 44 会把整段正文的行距撑开、破坏版式。
    function inlineExempt(el,r){
      if(!/^(a|label)$/i.test(el.tagName)) return false;
      if(el.className) return false;
      return Math.round(r.height) <= 28;
    }
    // 视觉隐藏控件（如 CSS 汉堡菜单的 1×1 checkbox）：命中区由关联的 <label> 承担，本身不算目标。
    function hiddenCtrl(r){ return Math.max(r.width,r.height) < 6; }
    var base=d.querySelectorAll(${JSON.stringify(SEL)});
    for(var i=0;i<base.length;i++){
      var el=base[i];
      if(exempt(el)) continue;
      var p=el.parentElement, skip=false;
      while(p){ if(p.matches&&p.matches(${JSON.stringify(SEL)})){skip=true;break;} p=p.parentElement; }
      if(skip) continue;
      var r=el.getBoundingClientRect();
      if(r.width<1||r.height<1) continue;
      if(hiddenCtrl(r)||inlineExempt(el,r)) continue;
      matched.add(el);
      out.push({tag:el.tagName.toLowerCase(),cls:String(el.className||'').split(' ')[0],
        role:el.getAttribute('role')||'',w:Math.round(r.width),h:Math.round(r.height)});
    }
    // 补 cursor:pointer（JS 绑定的点击，标签选择器抓不到）
    // 2026-09-29 修假阳性：cursor 是可继承属性——祖先设了 pointer，全部子孙的 computed cursor
    // 也会是 pointer，于是被误当「独立点击目标」（实测 M270 无限滑块因此虚报 75 个 h3/p/span 文本）。
    // 判定：自身无任何独立交互证据（语义标签 / onclick / tabindex / role）且「父元素已是 pointer」者，
    // 视为纯继承显示、不计入——真点击目标在 pointer 链的顶端。
    var all=d.querySelectorAll('body *');
    for(var j=0;j<all.length;j++){
      var e2=all[j];
      if(matched.has(e2)) continue;
      if(exempt(e2)) continue;
      var cs=w.getComputedStyle(e2);
      if(cs.cursor!=='pointer') continue;
      var own=/^(a|button|input|select|textarea|label|summary)$/i.test(e2.tagName)
        ||e2.hasAttribute('onclick')||e2.hasAttribute('tabindex')||e2.getAttribute('role');
      if(!own){var pe=e2.parentElement;if(pe&&w.getComputedStyle(pe).cursor==='pointer')continue;}
      var p2=e2.parentElement, skip2=false;
      while(p2){ if(p2.matches&&p2.matches(${JSON.stringify(SEL)})){skip2=true;break;} p2=p2.parentElement; }
      if(skip2) continue;
      var r2=e2.getBoundingClientRect();
      if(r2.width<1||r2.height<1) continue;
      if(hiddenCtrl(r2)||inlineExempt(e2,r2)) continue;
      matched.add(e2);
      out.push({tag:e2.tagName.toLowerCase(),cls:String(e2.className||'').split(' ')[0],
        role:e2.getAttribute('role')||'',w:Math.round(r2.width),h:Math.round(r2.height)});
    }
    return {vw:w.innerWidth,count:out.length,targets:out};
  }
  function run(){
    var m=collect(document.getElementById('m')), dk=collect(document.getElementById('d'));
    document.title='TTOUT '+JSON.stringify({mobile:m,desktop:dk});
  }
  if(document.readyState==='complete') setTimeout(run,800); else window.addEventListener('load',function(){setTimeout(run,800);});
})();`;

function probe(absDemo) {
  const rel = path.relative(path.join(root, "assets/demos"), absDemo).split(path.sep).join("/");
  const wrap = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    html,body{margin:0;padding:0;background:#888}
    .cell{float:left}
    iframe{border:0;display:block;background:#fff}
  </style></head><body>
  <div class="cell"><iframe id="m" src="${rel}" style="width:${MOBILE_W}px;height:812px"></iframe></div>
  <div class="cell"><iframe id="d" src="${rel}" style="width:${DESK_W}px;height:900px"></iframe></div>
  <script>${PROBE}</script>
  </body></html>`;
  const tmpPath = path.join(root, "assets/demos", TMP_NAME);
  fs.writeFileSync(tmpPath, wrap, "utf8");
  try {
    const url = "file:///" + tmpPath.split(path.sep).join("/");
    const out = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox",
      "--disable-background-networking", "--disable-component-update", "--no-first-run",
      "--hide-scrollbars", "--allow-file-access-from-files",
      "--window-size=1900,950", "--virtual-time-budget=6000",
      "--user-data-dir=" + path.join(os.tmpdir(), "ttf-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7)),
      "--dump-dom", url], { encoding: "utf8", maxBuffer: 1024 * 1024 * 40 });
    const m = out.match(/TTOUT (\{[\s\S]*?\})</);
    return m ? JSON.parse(m[1]) : null;
  } finally {
    try { fs.unlinkSync(tmpPath); } catch (e) { }
  }
}

// 文件预筛：没有任何交互标记的 demo 直接跳过（纯视觉/动效/背景，无点击目标）
function hasInteractiveMarkup(absDemo) {
  let s;
  try { s = fs.readFileSync(absDemo, "utf8"); } catch (e) { return false; }
  return /<button|<a\s|<input|<select|<textarea|onclick|addEventListener|role\s*=|tabindex|cursor\s*:\s*pointer|type\s*=\s*["']range/i.test(s);
}

// 加载两库，建立 路径 -> 条目元信息
const files = process.argv.slice(2).filter(a => !a.startsWith("--"));
const ONLY_M = process.argv.includes("--materials");
const ONLY_S = process.argv.includes("--schemes");
let entries = [];
if (!ONLY_S) {
  const m = {}; new Function("window", fs.readFileSync(path.join(root, "data/素材.js"), "utf8"))(m);
  m.WEB_ARSENAL.forEach(e => entries.push({ src: e.效果演示, id: e.id, 标题: e.标题, 适配端: e.适配端 || "通用", lib: "素材" }));
}
if (!ONLY_M) {
  const s = {}; new Function("window", fs.readFileSync(path.join(root, "data/方案.js"), "utf8"))(s);
  s.WEB_SCHEMES.forEach(e => entries.push({ src: e.演示页, id: e.id, 标题: e.风格名, 适配端: e.适配端 || "通用", lib: "方案" }));
}
if (files.length) entries = files.map(f => ({ src: f, id: path.basename(f), 标题: path.basename(f), 适配端: "通用", lib: "?" }));

console.log("存量触控目标核查（附录B B1：移动≥44 / PC≥24，命中区=min(宽,高)）\n");
const viol = [], skippedNoMarkup = [], missing = [], errs = [];
let totalTargets = 0, checked = 0;
for (const en of entries) {
  const abs = path.join(root, en.src);
  const name = path.basename(en.src);
  if (!fs.existsSync(abs)) { missing.push(en); console.log("  ✗ 缺文件 " + en.src); continue; }
  if (!hasInteractiveMarkup(abs)) { skippedNoMarkup.push(en); continue; }
  const r = probe(abs);
  if (!r) { errs.push(en); console.log("  ✗ 探针未执行 " + name); continue; }
  checked++;
  // 按适配端决定哪些视口的失败算「违规」
  const mFind = (r.mobile && r.mobile.targets) ? r.mobile.targets.filter(t => Math.min(t.w, t.h) < MOBILE_MIN) : [];
  const dFind = (r.desktop && r.desktop.targets) ? r.desktop.targets.filter(t => Math.min(t.w, t.h) < DESK_MIN) : [];
  totalTargets += (r.mobile ? r.mobile.count : 0) + (r.desktop ? r.desktop.count : 0);
  let bad = [];
  // ⚠️ 2026-09-29 修 bug：适配端取值是 "PC 端"（中间有空格，见闭集），原写 "PC端" 永远匹配不到，
  //    导致 PC 端条目被误按「通用」口径判（连带把移动端 <44 也算违规，误报 M057 等）。
  if (en.适配端 === "移动端") bad = mFind;
  else if (en.适配端 === "PC 端") bad = dFind;
  else bad = mFind.concat(dFind.map(t => ({ ...t, _desk: true })));
  if (bad.length) {
    viol.push({ id: en.id, 标题: en.标题, 适配端: en.适配端, lib: en.lib, src: en.src,
      mobile: mFind, desktop: dFind, bad });
    console.log("  ⚠️ " + (en.id + " " + en.标题).padEnd(22) + " [" + en.适配端 + "] " +
      "移动<44:" + mFind.length + " 桌面<24:" + dFind.length);
  }
}
console.log("\n==== 汇总 ====");
console.log("已渲染核查 = " + checked + " / 有交互标记的 demo");
console.log("跳过(无交互标记,纯视觉) = " + skippedNoMarkup.length);
console.log("缺文件 = " + missing.length + "  探针失败 = " + errs.length);
console.log("命中区测量总数 ≈ " + totalTargets);
console.log("存在不达标目标的 demo = " + viol.length + " 条");
if (viol.length) {
  console.log("\n---- 不达标明细（按适配端口径计为违规的目标）----");
  viol.forEach(v => {
    console.log("\n[" + v.id + " " + v.标题 + "] " + v.lib + " · 适配端=" + v.适配端 + "  → " + v.src);
    if (v.mobile.length) console.log("  移动(375) <44: " + v.mobile.map(t => `${t.tag}.${t.cls} ${t.w}x${t.h}`).join("  |  "));
    if (v.desktop.length) console.log("  桌面(1440) <24: " + v.desktop.map(t => `${t.tag}.${t.cls} ${t.w}x${t.h}`).join("  |  "));
  });
}
const jsonPath = path.join(os.tmpdir(), "wa_touch_targets.json");
fs.writeFileSync(jsonPath, JSON.stringify({ viol, skippedNoMarkup: skippedNoMarkup.map(e => e.src), missing: missing.map(e => e.src), errs: errs.map(e => e.src), checked, totalTargets }, null, 1), "utf8");
console.log("\n明细 JSON → " + jsonPath);
const leftover = fs.readdirSync(path.join(root, "assets/demos")).filter(f => f === TMP_NAME);
console.log(leftover.length ? "⚠️ 临时文件未清干净：" + TMP_NAME : "（临时文件已清干净）");
