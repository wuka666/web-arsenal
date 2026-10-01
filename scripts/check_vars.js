// 悬空 CSS 变量体检：抓「参数键定义了、但运行时 --key 为空」的 demo。
// 典型成因：脚本里定义了 `state` / `apply()`，但**加载时忘了调用 apply()**（或 apply 里漏了某个键），
//   于是 CSS 里所有 var(--x) 全部落空 → 元素没有底色/没有尺寸/整页全透明。
//   ⚠️ check_all / verify_entry 都查不出这层（它们只看数据与 demo 的静态字节），只有真实渲染能看出来。
//
// 用法（项目根目录）：node scripts/check_vars.js [--materials] [--schemes] [demo路径...]
//   不给参数 = 两库全量；--materials 仅素材库；--schemes 仅方案库
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
const root = process.cwd();
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const TMP_NAME = "_vars_probe_tmp.html";

// 在 iframe 里把每个 --key 的**计算值**读回来；空字符串 = 该变量没被赋上
const PROBE = `(function(){
  function keys(){
    var out=[];
    for(var i=0;i<window.__KEYS.length;i++){
      var k=window.__KEYS[i], v='';
      try{ v=getComputedStyle(document.documentElement).getPropertyValue('--'+k).trim(); }catch(e){}
      if(!v && document.body && document.body.firstElementChild){
        try{ v=getComputedStyle(document.body.firstElementChild).getPropertyValue('--'+k).trim(); }catch(e){}
      }
      if(!v) out.push(k);
    }
    return out;
  }
  function run(){
    var f=document.getElementById('fr'), w=f.contentWindow, d=f.contentDocument;
    if(!w||!d){ document.title='VARRESULT {"err":"iframe 不可读"}'; return; }
    var src=d.documentElement.outerHTML;
    if(!window.__KEYS.length){ document.title='VARRESULT {"err":"no-state"}'; return; }
    var keys=[];
    for(var i=0;i<window.__KEYS.length;i++){
      var k=window.__KEYS[i], v='';
      try{ v=w.getComputedStyle(d.documentElement).getPropertyValue('--'+k).trim(); }catch(e){}
      if(!v && d.body && d.body.firstElementChild){
        try{ v=w.getComputedStyle(d.body.firstElementChild).getPropertyValue('--'+k).trim(); }catch(e){}
      }
      if(!v) keys.push(k);
    }
    document.title='VARRESULT '+JSON.stringify({total:window.__KEYS.length,empty:keys});
  }
  if(document.readyState==='complete') setTimeout(run,700); else window.addEventListener('load',function(){setTimeout(run,700);});
})();`;

function stateKeys(file) {
  const s = fs.readFileSync(file, "utf8");
  // 三种声明都要认：M183+ 那批老条目写 const state={...}，新条目写 var state={...}
  const m = s.match(/(?:var|let|const)\s+state\s*=\s*\{([\s\S]*?)\}\s*;/);
  if (!m) return [];
  // 键可能带引号（老条目是 JSON 风格 {"bg":...}），两种都要取
  const all = (m[1].match(/(?:^|[,{\s])["']?([A-Za-z_$][\w$]*)["']?\s*:/g) || [])
    .map(x => x.replace(/[^A-Za-z0-9_$]/g, ""));
  // ⚠️ 只查「真正当 CSS 变量用」的键：老条目（M035/M109 那批）的 state 里混着
  //    纯 JS 逻辑参数（dur / easing / overshoot / showPct），它们从不出现在 var() 里，
  //    不排除就会整片误报成「空变量」。判据＝该键在 CSS 里被 var(--k) 消费过。
  return all.filter(k => new RegExp("var\\(\\s*--" + k + "\\b").test(s));
}

function probe(absDemo, keys) {
  const rel = path.relative(path.join(root, "assets/demos"), absDemo).split(path.sep).join("/");
  const wrap = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    html,body{margin:0;padding:0}
    iframe{width:390px;height:844px;border:0;display:block}
  </style></head><body>
  <iframe id="fr" src="${rel}"></iframe>
  <script>window.__KEYS=${JSON.stringify(keys)};</script>
  <script>${PROBE}</script>
  </body></html>`;
  const tmpPath = path.join(root, "assets/demos", TMP_NAME);
  fs.writeFileSync(tmpPath, wrap, "utf8");
  // profile 用后即删：一个 demo 一个，不删的话全量跑一轮就在 TEMP 里堆几百个
  const prof = path.join(os.tmpdir(), "varf-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7));
  try {
    const url = "file:///" + tmpPath.split(path.sep).join("/");
    const out = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox",
      "--disable-background-networking", "--disable-component-update", "--no-first-run",
      "--hide-scrollbars", "--allow-file-access-from-files",
      "--window-size=900,900", "--virtual-time-budget=4000",
      "--user-data-dir=" + prof,
      "--dump-dom", url], { encoding: "utf8", maxBuffer: 1024 * 1024 * 40 });
    const mm = out.match(/VARRESULT (\{[\s\S]*?\})</);
    return mm ? JSON.parse(mm[1]) : null;
  } finally {
    try { fs.unlinkSync(tmpPath); } catch (e) { }
    try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) { }
  }
}

let files = process.argv.slice(2).filter(a => !a.startsWith("--"));
const ONLY_M = process.argv.includes("--materials");
const ONLY_S = process.argv.includes("--schemes");
if (!files.length) {
  const m = {}; new Function("window", fs.readFileSync(path.join(root, "data/素材.js"), "utf8"))(m);
  const s = {}; new Function("window", fs.readFileSync(path.join(root, "data/方案.js"), "utf8"))(s);
  files = [];
  if (!ONLY_S) files = files.concat(m.WEB_ARSENAL.map(e => e.效果演示));
  if (!ONLY_M) files = files.concat(s.WEB_SCHEMES.map(e => e.演示页));
}
files = files.filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);

console.log("悬空 CSS 变量体检（390×844 真实渲染，逐键读计算值）：\n");
let bad = 0, skipped = 0;
files.forEach(f => {
  const abs = path.join(root, f);
  if (!fs.existsSync(abs)) { console.log("  ✗ 缺文件 " + f); return; }
  const keys = stateKeys(abs);
  if (!keys.length) { skipped++; return; }
  const r = probe(abs, keys);
  const name = path.basename(f, ".html");
  if (!r || r.err) { console.log("  ⚠️  探针未取到结果 " + name + " (" + ((r && r.err) || "?") + ")"); return; }
  if (r.empty.length) {
    bad++;
    console.log("  ✗ " + name.padEnd(22) + " 空变量 " + r.empty.length + "/" + r.total + "：" + r.empty.join(","));
  }
});
console.log("\n合计 " + files.length + " 个 demo；空变量 " + bad + " 个；无 state 跳过 " + skipped + " 个");
console.log(bad ? "❌ 有 demo 的 CSS 变量没被赋上（多为加载时漏调 apply()）" : "✅ 全部 demo 的 state 键运行时都有值");
const leftover = fs.readdirSync(path.join(root, "assets/demos")).filter(x => x === TMP_NAME);
if (leftover.length) console.log("⚠️ 临时文件未清干净：" + TMP_NAME);
