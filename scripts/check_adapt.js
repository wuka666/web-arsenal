// 适配端实测仪：把 demo 放进 375×812 的 iframe（真实手机视口）里渲染，
// 量「横向溢出」与「窄屏下是否仍保留并排多栏 / 不换行横排」，辅助判定 适配端。
// 判据来自 2026 响应式标准：手机端必须单栏堆叠，不应保留并排多栏，也不应横向滚动。
//
// ⚠️ 两个必踩的坑：
//   ① Chrome 无头窗口有 **500px 最小宽度**，`--window-size=375,812` 会被夹到 512 → 必须用 iframe 造视口；
//   ② file:// 下 iframe 的 contentDocument 需要 `--allow-file-access-from-files` 才可读。
//   ③ 临时容器必须与 demo 同目录（assets/demos/），否则 demo 内相对路径失效。
// 用法（项目根目录）：node scripts/check_adapt.js [--materials] [demo路径...]
//   不给参数 = 扫方案库全部 35 套；--materials = 扫素材库全部 182 条
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
const root = process.cwd();
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const VIEW = [375, 812];              // 真实手机视口（iPhone X 逻辑分辨率）
const TMP_NAME = "_adapt_probe_tmp.html";

const PROBE = `(function(){
  function run(){
    var f=document.getElementById('fr'), w=f.contentWindow, d=f.contentDocument;
    if(!w||!d) return done({err:'iframe 不可读'});
    var vw=w.innerWidth, de=d.documentElement, over=[], multi=[], nowrap=[];
    var all=d.querySelectorAll('body *');
    for(var i=0;i<all.length;i++){
      var el=all[i], cs=w.getComputedStyle(el), r=el.getBoundingClientRect();
      if(r.width>vw+1 && r.height>4 && cs.position!=='fixed') over.push(el.tagName+'.'+String(el.className||'').split(' ')[0]);
      if(r.height<8) continue;
      if(cs.display.indexOf('grid')===0){
        var t=(cs.gridTemplateColumns||'').trim();
        if(t&&t!=='none'){ var n=t.split(/\\s+/).length; if(n>=2) multi.push(n+'栏:'+String(el.className||el.tagName)); }
      }
      if(cs.display.indexOf('flex')===0 && cs.flexWrap==='nowrap' && cs.flexDirection.indexOf('row')===0){
        var k=0; for(var j=0;j<el.children.length;j++) if(el.children[j].getBoundingClientRect().height>8) k++;
        if(k>=2) nowrap.push(k+'子:'+String(el.className||el.tagName));
      }
    }
    var sw=Math.max(de.scrollWidth,d.body.scrollWidth);
    done({vw:vw,overflow:sw-vw,overCount:over.length,overSample:over.slice(0,4),
      multiCols:multi.slice(0,5),multiCount:multi.length,
      nowrapFlex:nowrap.slice(0,5),nowrapCount:nowrap.length});
  }
  function done(o){ document.title='ADAPTRESULT '+JSON.stringify(o); }
  if(document.readyState==='complete') setTimeout(run,600); else window.addEventListener('load',function(){setTimeout(run,600);});
})();`;

function probe(absDemo) {
  const rel = path.relative(path.join(root, "assets/demos"), absDemo).split(path.sep).join("/");
  const wrap = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    html,body{margin:0;padding:0;background:#888}
    iframe{width:${VIEW[0]}px;height:${VIEW[1]}px;border:0;display:block;background:#fff}
  </style></head><body>
  <iframe id="fr" src="${rel}"></iframe>
  <script>${PROBE}</script>
  </body></html>`;
  const tmpPath = path.join(root, "assets/demos", TMP_NAME);
  fs.writeFileSync(tmpPath, wrap, "utf8");
  try {
    const url = "file:///" + tmpPath.split(path.sep).join("/");
    const out = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox",
      "--disable-background-networking", "--disable-component-update", "--no-first-run",
      "--hide-scrollbars", "--allow-file-access-from-files",
      "--window-size=900,900", "--virtual-time-budget=5000",
      "--user-data-dir=" + path.join(os.tmpdir(), "adf-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7)),
      "--dump-dom", url], { encoding: "utf8", maxBuffer: 1024 * 1024 * 40 });
    const m = out.match(/ADAPTRESULT (\{[\s\S]*?\})</);
    return m ? JSON.parse(m[1]) : null;
  } finally {
    try { fs.unlinkSync(tmpPath); } catch (e) { }
  }
}

let files = process.argv.slice(2).filter(a => !a.startsWith("--"));
const MATERIALS = process.argv.includes("--materials");
if (!files.length) {
  if (MATERIALS) {
    const m = {}; new Function("window", fs.readFileSync(path.join(root, "data/素材.js"), "utf8"))(m);
    files = m.WEB_ARSENAL.map(e => e.效果演示);
  } else {
    const s = {}; new Function("window", fs.readFileSync(path.join(root, "data/方案.js"), "utf8"))(s);
    files = s.WEB_SCHEMES.map(e => e.演示页);
  }
}
console.log("375×812 手机视口实测（iframe 内渲染）：" + (MATERIALS ? "【素材库】" : "【方案库】") + "\n");
const rows = [];
files.forEach(f => {
  const abs = path.join(root, f);
  if (!fs.existsSync(abs)) { console.log("  ✗ 缺文件 " + f); return; }
  const r = probe(abs);
  const name = path.basename(f).replace("方案-", "").replace(".html", "");
  if (!r) { console.log("  ✗ 探针未执行 " + name); return; }
  rows.push({ name, ...r });
  const clean = r.overflow <= 2 && r.multiCount === 0 && r.nowrapCount === 0;
  console.log("  " + (clean ? "✅" : "⚠️ ") + " " + name.padEnd(14)
    + " vw=" + r.vw + " 溢出=" + String(r.overflow).padStart(4) + "px"
    + " 并排多栏=" + String(r.multiCount).padStart(2) + " 不换行横排=" + String(r.nowrapCount).padStart(2)
    + "  " + r.multiCols.join(",") + (r.nowrapCount ? " ⟨" + r.nowrapFlex.join(",") + "⟩" : ""));
});
const ok = rows.filter(r => r.overflow <= 2 && r.multiCount === 0 && r.nowrapCount === 0).length;
console.log("\n非方案库：合计 " + rows.length + " 套，窄屏完全堆叠且不溢出 = " + ok + " 套");
const jsonPath = path.join(os.tmpdir(), MATERIALS ? "wa_adapt_materials.json" : "wa_adapt_schemes.json");
fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 1), "utf8");
console.log("明细已写入 " + jsonPath);
const leftover = fs.readdirSync(path.join(root, "assets/demos")).filter(f => f === TMP_NAME);
console.log(leftover.length ? "⚠️ 临时文件未清干净：" + TMP_NAME : "（临时文件已清干净）");
