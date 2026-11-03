/* ============================================================
   状态（尺寸按屏幕存 w/h，缩放独立）
   ============================================================ */
const STORE_KEY = "web-arsenal-canvas-v1";
const SIZE = { phone:{w:390,h:844}, desktop:{w:1024,h:680} };
let viewScale = 1;
// 空画布起步：不预设屏幕，由开场选择页决定第一屏的类型与命名
let CVS = migrate(load() || {
  screens: [],
  title: "未命名画布",
  theme: { seed:"#6750A4", radius:16, font:'"Roboto","Microsoft YaHei",sans-serif', motion:"340ms" },
  active:null
});
let selId = null;
const $ = s => document.querySelector(s);
const canvas = $("#canvas"), canvasWrap = $("#canvasWrap"), stage = $("#stage");

/* 旧版数据兼容：补 w/h/kind/bg/parts，防止 NaN */
function migrate(cvs){
  if(!cvs || !Array.isArray(cvs.screens)) return cvs;
  if(!cvs.title) cvs.title = "未命名画布";      // v1.5：画布名（旧数据补默认值）
  cvs.screens.forEach(s=>{
    if(!s.kind || !SIZE[s.kind]) s.kind = "phone";
    if(!s.w || !isFinite(s.w)) s.w = SIZE[s.kind].w;
    if(!s.h || !isFinite(s.h)) s.h = SIZE[s.kind].h;
    if(!s.bg) s.bg = "#ffffff";
    if(!Array.isArray(s.parts)) s.parts = [];
    s.parts.forEach(p=>{
      if(!p.id) p.id = uid();
      if(!p.props) p.props = {};
      if(!p.behavior) p.behavior = {target:null,transition:"slide"};
      if(!isFinite(p.x)) p.x=24; if(!isFinite(p.y)) p.y=24;
      if(!isFinite(p.w)) p.w=160; if(!isFinite(p.h)) p.h=56;
      // 旧效果组件存的是 assets/demos/xxx.html，需转成相对于 canvas.html 的 demos/xxx.html
      if(p.type==="__effect"){
        if(p.demo && p.demo.startsWith("assets/")) p.demo=p.demo.replace(/^assets\//,"");
        // S2：反查素材 id 交给数据层（repo.js 负责「数据从哪来」，这里只管怎么画）
        if(!p.eid && window.Repo && Repo.findMaterialByDemo){ const m=Repo.findMaterialByDemo(p.demo); if(m) p.eid=m.id; }
        // C4：素材参数。老数据没有 p.params → 用库里的默认值补齐（不覆盖用户改过的）
        if(!p.params || typeof p.params!=="object") p.params = paramDefaults(p);
        else{
          const d=paramDefaults(p);
          Object.keys(d).forEach(k=>{ if(!(k in p.params)) p.params[k]=d[k]; });
        }
      }
    });
  });
  if(!cvs.screens.length){ cvs.active = null; return cvs; }   // 空画布不要取 screens[0]
  if(!cvs.screens.find(s=>s.id===cvs.active)) cvs.active = cvs.screens[0].id;
  return cvs;
}

/* ============================================================
   组件注册表（加组件只改这里）
   ============================================================ */
const PARTS = {
  button:{ label:"按钮", def:{text:"按钮",variant:"filled"}, fields:["text","variant"], render:p=>`<button class="c-btn ${p.variant||'filled'}">${esc(p.text)}</button>`, prompt:p=>`按钮「${p.text}」` },
  iconButton:{ label:"图标按钮", def:{icon:"★"}, fields:["icon"], render:p=>`<button class="c-iconbtn">${esc(p.icon)}</button>`, prompt:p=>`图标按钮「${p.icon}」` },
  fab:{ label:"悬浮按钮", def:{icon:"＋"}, fields:["icon"], render:p=>`<button class="c-fab">${esc(p.icon)}</button>`, prompt:p=>`悬浮操作按钮「${p.icon}」` },
  chip:{ label:"标签片", def:{text:"标签"}, fields:["text"], render:p=>`<div class="c-chip">${esc(p.text)}</div>`, prompt:p=>`标签片「${p.text}」` },
  appBar:{ label:"应用栏", def:{text:"标题"}, fields:["text"], render:p=>`<div class="c-appbar">${esc(p.text)}</div>`, prompt:p=>`顶部应用栏，标题「${p.text}」` },
  navBar:{ label:"导航栏", def:{items:"首页,发现,我的"}, fields:["items"], render:p=>`<div class="c-navbar">${p.items.split(",").map((t,i)=>`<div class="ni ${i===0?'on':''}"><span class="ic">●</span>${esc(t)}</div>`).join("")}</div>`, prompt:p=>`底部导航栏，项：${p.items}` },
  tabBar:{ label:"标签页", def:{items:"标签一,标签二"}, fields:["items"], render:p=>`<div class="c-tabbar">${p.items.split(",").map((t,i)=>`<div class="ti ${i===0?'on':''}">${esc(t)}</div>`).join("")}</div>`, prompt:p=>`顶部标签页，项：${p.items}` },
  card:{ label:"卡片", def:{text:"标题",body:"内容描述…"}, fields:["text","body"], render:p=>`<div class="c-card"><div class="t">${esc(p.text)}</div><div class="b">${esc(p.body)}</div></div>`, prompt:p=>`卡片，标题「${p.text}」` },
  listItem:{ label:"列表项", def:{text:"项目",sub:"副标题"}, fields:["text","sub"], render:p=>`<div class="c-listitem"><div><div class="lt">${esc(p.text)}</div><div class="ls">${esc(p.sub)}</div></div></div>`, prompt:p=>`列表项「${p.text}」` },
  text:{ label:"文本", def:{text:"一段说明文字…"}, fields:["text"], render:p=>`<div class="c-text">${esc(p.text)}</div>`, prompt:p=>`文本「${p.text}」` },
  heading:{ label:"大标题", def:{text:"大标题"}, fields:["text"], render:p=>`<div class="c-heading">${esc(p.text)}</div>`, prompt:p=>`标题「${p.text}」` },
  image:{ label:"图片", def:{}, fields:[], render:()=>`<div class="c-image">图片占位</div>`, prompt:()=>`图片占位` },
  input:{ label:"输入框", def:{text:"请输入…"}, fields:["text"], render:p=>`<div class="c-input">${esc(p.text)}</div>`, prompt:p=>`输入框，提示「${p.text}」` },
  switch:{ label:"开关", def:{text:"开关",on:false}, fields:["text","on"], render:p=>`<div class="c-switch ${p.on?'on':''}">${esc(p.text)}<span class="tk"></span></div>`, prompt:p=>`开关「${p.text}」${p.on?'（默认开）':''}` },
  slider:{ label:"滑块", def:{text:"滑块"}, fields:["text"], render:p=>`<div class="c-slider">${esc(p.text)}<span class="bar"></span></div>`, prompt:p=>`滑块「${p.text}」` },
  dialog:{ label:"对话框", def:{text:"提示",body:"对话框内容…"}, fields:["text","body"], render:p=>`<div class="c-dialog"><div class="box"><div class="t">${esc(p.text)}</div><div class="b">${esc(p.body)}</div></div></div>`, prompt:p=>`对话框「${p.text}」` },
  snackbar:{ label:"消息条", def:{text:"已保存"}, fields:["text"], render:p=>`<div class="c-snackbar">${esc(p.text)}</div>`, prompt:p=>`消息条「${p.text}」` },
  divider:{ label:"分割线", def:{}, fields:[], render:()=>`<div class="c-divider"></div>`, prompt:()=>`分割线` },
  hero:{ label:"首屏", def:{text:"主标题",sub:"副标题说明…"}, fields:["text","sub"], render:p=>`<div class="c-hero"><div class="t">${esc(p.text)}</div><div class="s">${esc(p.sub)}</div></div>`, prompt:p=>`首屏 Hero，标题「${p.text}」` },
  box:{ label:"容器", def:{}, fields:[], render:()=>`<div class="c-box"></div>`, prompt:()=>`容器块` },
  fabMenu:{ label:"悬浮按钮菜单", def:{icon:"＋",items:"编辑,分享,删除"}, fields:["icon","items"], render:p=>`<div class="c-fabmenu"><span class="mini">${esc(p.items.split(",")[0]||"")}</span><span class="mini">${esc(p.items.split(",")[1]||"")}</span><button class="c-fab sm">${esc(p.icon)}</button></div>`, prompt:p=>`带展开菜单的悬浮按钮，菜单项：${p.items}` },
  splitButton:{ label:"拆分按钮", def:{text:"保存",more:"更多"}, fields:["text","more"], render:p=>`<div class="c-split"><span class="main">${esc(p.text)}</span><span class="caret">▾ ${esc(p.more)}</span></div>`, prompt:p=>`拆分按钮「${p.text}」+ 下拉「${p.more}」` },
  rail:{ label:"侧边导航栏", def:{items:"首页,搜索,收藏,我的"}, fields:["items"], render:p=>`<div class="c-rail">${p.items.split(",").map((t,i)=>`<div class="ri ${i===0?'on':''}"><span class="ic">●</span><span class="lb">${esc(t)}</span></div>`).join("")}</div>`, prompt:p=>`侧边导航栏，项：${p.items}` },
  toolbar:{ label:"悬浮工具栏", def:{items:"B,I,U,↺,↻"}, fields:["items"], render:p=>`<div class="c-toolbar">${p.items.split(",").map(t=>`<span class="tb">${esc(t)}</span>`).join("")}</div>`, prompt:p=>`悬浮工具栏，按钮：${p.items}` },
  search:{ label:"搜索栏", def:{text:"搜索…"}, fields:["text"], render:p=>`<div class="c-search"><span class="ic">⌕</span><span class="ph">${esc(p.text)}</span></div>`, prompt:p=>`搜索栏，占位「${p.text}」` },
  bottomSheet:{ label:"底部面板", def:{text:"分享到",body:"微信,微博,复制链接"}, fields:["text","body"], render:p=>`<div class="c-sheet"><span class="grab"></span><div class="t">${esc(p.text)}</div><div class="acts">${p.body.split(",").map(t=>`<span>${esc(t)}</span>`).join("")}</div></div>`, prompt:p=>`底部面板「${p.text}」，动作：${p.body}` },
  select:{ label:"下拉菜单", def:{text:"请选择",open:false}, fields:["text","open"], render:p=>`<div class="c-select ${p.open?'open':''}"><span>${esc(p.text)}</span><i class="cv">▾</i></div>`, prompt:p=>`下拉菜单「${p.text}」${p.open?'（展开）':''}` },
  checkbox:{ label:"复选框", def:{text:"同意条款",on:true}, fields:["text","on"], render:p=>`<div class="c-check ${p.on?'on':''}"><i class="bx">${p.on?'✓':''}</i><span>${esc(p.text)}</span></div>`, prompt:p=>`复选框「${p.text}」${p.on?'（选中）':''}` },
  radio:{ label:"单选按钮", def:{text:"选项 A",on:true}, fields:["text","on"], render:p=>`<div class="c-radio ${p.on?'on':''}"><i class="rd"></i><span>${esc(p.text)}</span></div>`, prompt:p=>`单选按钮「${p.text}」${p.on?'（选中）':''}` },
  datePicker:{ label:"日期选择器", def:{text:"2026-11-03"}, fields:["text"], render:p=>`<div class="c-date"><span class="ic">▦</span><span>${esc(p.text)}</span><i class="cv">▾</i></div>`, prompt:p=>`日期选择器，当前「${p.text}」` },
  carousel:{ label:"轮播", def:{dots:"3",at:"1"}, fields:["dots","at"], render:p=>`<div class="c-carousel"><span class="ar l">‹</span><span class="ph">页面 ${esc(p.at)}</span><div class="dots">${Array.from({length:Math.max(1,+p.dots||1)}).map((_,i)=>`<i class="${i===(+p.at||1)-1?'on':''}"></i>`).join("")}</div><span class="ar r">›</span></div>`, prompt:p=>`轮播图，共 ${p.dots} 页，当前第 ${p.at} 页` },
  loading:{ label:"加载指示器", def:{text:"加载中…"}, fields:["text"], render:p=>`<div class="c-loading"><span class="spin"></span><span>${esc(p.text)}</span></div>`, prompt:p=>`加载指示器「${p.text}」` },
  progressWavy:{ label:"波浪进度条", def:{val:"60"}, fields:["val"], render:p=>`<div class="c-wavy"><div class="fill" style="width:${Math.max(0,Math.min(100,+p.val||0))}%"></div><span class="lb">${esc(p.val)}%</span></div>`, prompt:p=>`波浪进度条 ${p.val}%` },
  camera:{ label:"相机占位", def:{}, fields:[], render:()=>`<div class="c-camera"><span class="lens"></span><span class="cap">相机</span></div>`, prompt:()=>`相机取景占位` },
  map:{ label:"地图占位", def:{}, fields:[], render:()=>`<div class="c-map"><span class="pin">◉</span><span class="cap">地图</span></div>`, prompt:()=>`地图占位` },
  extendedFab:{ label:"扩展悬浮按钮", def:{icon:"＋",text:"新建"}, fields:["icon","text"], render:p=>`<button class="c-extfab"><span class="ic">${esc(p.icon)}</span>${esc(p.text)}</button>`, prompt:p=>`扩展悬浮按钮「${p.text}」` },
  badge:{ label:"徽标", def:{icon:"✉",num:"3"}, fields:["icon","num"], render:p=>`<div class="c-badge"><span class="ic">${esc(p.icon)}</span><i class="dot">${esc(p.num)}</i></div>`, prompt:p=>`带徽标的图标，未读 ${p.num}` },
  avatar:{ label:"头像", def:{text:"W"}, fields:["text"], render:p=>`<div class="c-avatar">${esc((p.text||"?").slice(0,2))}</div>`, prompt:p=>`头像「${p.text}」` },
  breadcrumb:{ label:"面包屑", def:{items:"首页,分类,详情"}, fields:["items"], render:p=>`<div class="c-crumb">${p.items.split(",").map((t,i,a)=>`<span class="${i===a.length-1?'cur':''}">${esc(t)}</span>${i<a.length-1?'<i>›</i>':''}`).join("")}</div>`, prompt:p=>`面包屑：${p.items}` },
  pagination:{ label:"分页器", def:{pages:"5",at:"1"}, fields:["pages","at"], render:p=>`<div class="c-page"><span class="ar">‹</span>${Array.from({length:Math.max(1,+p.pages||1)},(_,i)=>`<b class="${i===(+p.at||1)-1?'on':''}">${i+1}</b>`).join("")}<span class="ar">›</span></div>`, prompt:p=>`分页器，共 ${p.pages} 页，当前第 ${p.at} 页` },
  stepper:{ label:"步骤条", def:{items:"填写,确认,完成",at:"2"}, fields:["items","at"], render:p=>`<div class="c-stepper">${p.items.split(",").map((t,i)=>`<div class="st ${i<(+p.at||1)?'done':''} ${i===(+p.at||1)-1?'cur':''}"><i>${i+1}</i><span>${esc(t)}</span></div>`).join("")}</div>`, prompt:p=>`步骤条，${p.items}，当前第 ${p.at} 步` },
};
/* 效果类（从素材库动态读，iframe 嵌入；永远和库同步）
   S2：数据一律经 repo.js 取，canvas.js 不再直读素材全局变量。
   仓库没加载时返回空数组 —— 画布仍可用，只是左栏「素材库动效」为空。 */
function effectParts(){
  if(!window.Repo || !Repo.listMaterials) return [];
  return Repo.listMaterials().map(m=>{
    const raw=m.效果演示||"";
    // canvas.html 在 assets/ 下，素材 demo 在 assets/demos/ 下；
    // 素材库存的是 assets/demos/xxx.html，这里要转成相对于 canvas.html 的 demos/xxx.html
    const demo=raw.replace(/^assets\//,"");
    return {
      id:m.id, label:m.标题||m.id, demo:demo, srcRaw:raw,
      def:{}, fields:[],
      render:()=>`<iframe src="${demo}" sandbox="allow-scripts"></iframe>`,
      prompt:()=>`动效组件「${m.标题||m.id}」（${m.适配端||''}${m.元素?' · '+m.元素:''}）`
    };
  });
}

/* ============================================================
   工具
   ============================================================ */
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function uid(){return "p"+Math.random().toString(36).slice(2,8);}
function curScreen(){return CVS.screens.find(s=>s.id===CVS.active)||null;}
function activeParts(){const s=curScreen();return s?s.parts:[];}
function partById(id){return activeParts().find(p=>p.id===id);}
/* ============================================================
   保存 + 撤销/重做
   —— 撤销栈用「整份 CVS 的 JSON 快照」，不做逆操作补丁：
      这个数据量级（几十个组件、几 KB JSON）快照足够便宜，
      而且补丁一旦算错就是「撤销把画布弄坏」，快照永远不会算错。
   —— 唯一写入口仍是 save()：落盘 localStorage + 快照入栈。
      不进历史的场合（初始化、连续拖动的中间帧、连续调节）用 saveNoHistory()。
   ============================================================ */
const HIST_MAX = 50;                 // 栈深：超过就丢最老的一格
let hist = [];                       // 每个元素是一份 CVS 的 JSON 快照
let hi = -1;                         // 当前处在 hist 的哪一格
let lastMergeKey = null, lastMergeAt = 0;

function snapshot(){ return JSON.stringify(CVS); }

/* 保存状态指示：界面上唯一能回答「我刚改的东西存下来了吗」的地方。
   —— 只有隐式自动保存时，用户永远不确定；这里把三态显式化：
        saving（正在保存…）→ saved（已保存 · 12:03）→ error（保存失败，红色）
   —— 写盘是同步的 localStorage，所以 saving 态用 requestAnimationFrame 让浏览器
      先画一帧再落盘，避免「状态从没显示出来就跳过了」。 */
let saveStateT = null;
function setSaveState(kind, label){
  const el = $("#saveState");
  if(!el) return;
  el.className = "save-state " + kind;
  el.textContent = label;
}
function flashSaveState(){
  const el = $("#saveState");
  if(!el) return;
  clearTimeout(saveStateT);
  el.className = "save-state saving";
  el.textContent = "正在保存…";
  saveStateT = setTimeout(()=>{
    const t = new Date();
    const hh = String(t.getHours()).padStart(2,"0"), mm = String(t.getMinutes()).padStart(2,"0");
    el.className = "save-state saved";
    el.textContent = "已保存 · " + hh + ":" + mm;
  }, 180);
}

function persist(){
  try{
    localStorage.setItem(STORE_KEY, JSON.stringify(CVS));
    flashSaveState();
  }catch(e){
    // 配额满 / 隐私模式：必须让用户看见，否则「改了半天刷新全没了」
    setSaveState("error", "保存失败");
    console.warn("画布保存失败：", e);
  }
  syncHash();
}

/* 启动时打一个基线：第一次 Ctrl+Z 回到的就是这个「刚打开」的状态 */
function resetHistory(){ hist=[snapshot()]; hi=0; refreshHistButtons(); }

/* save(opt)：落盘 + 入栈。
   opt.merge 给「按住方向键连移」这类连续同类操作用：同一个 key 在 800ms 内
   的多次保存只占一格，否则一次连按就能把半个撤销栈吃光。 */
function save(opt){
  persist();
  const s = snapshot();
  if(hi >= 0 && hist[hi] === s){ refreshHistButtons(); return; }   // 内容没变就不占格子
  const mergeKey = opt && opt.merge;
  const now = Date.now();
  /* 合并只在「正处在栈顶」时允许：撤销之后 hi 落在中间，
     这时再合并就是改写 hist[hi]，会把用户刚撤销到的那个状态覆盖掉。 */
  if(mergeKey && mergeKey === lastMergeKey && (now - lastMergeAt) < 800 && hi >= 0 && hi === hist.length - 1){
    hist[hi] = s; lastMergeAt = now; refreshHistButtons(); return;
  }
  hist = hist.slice(0, hi + 1);      // 撤销后又改东西 = 丢掉原来的重做分支
  hist.push(s);
  if(hist.length > HIST_MAX) hist.shift();
  hi = hist.length - 1;
  lastMergeKey = mergeKey || null; lastMergeAt = now;
  refreshHistButtons();
}
/* 只落盘、不进撤销栈 */
function saveNoHistory(){ persist(); }

/* 应用一份快照：恢复 screens/theme，但不做「跨屏传送」——
   若撤销前停留的屏幕在恢复后仍然存在，就留在那一屏。 */
function applySnapshot(str){
  let next; try{ next = JSON.parse(str); }catch(e){ return; }
  const keep = CVS.active;
  CVS = next;
  if(!CVS.screens.some(s=>s.id===CVS.active)){
    CVS.active = CVS.screens.some(s=>s.id===keep) ? keep : (CVS.screens[0] ? CVS.screens[0].id : null);
  }
  if(selId && !partById(selId)) selId = null;   // 被撤掉的组件不能继续「选中」
  persist();
  renderAll();
  refreshHistButtons();
}
function undo(){
  if(hi <= 0) return false;
  hi--; applySnapshot(hist[hi]); toast("已撤销"); return true;
}
function redo(){
  if(hi >= hist.length - 1) return false;
  hi++; applySnapshot(hist[hi]); toast("已重做"); return true;
}
function refreshHistButtons(){
  const u = $("#undoBtn"), r = $("#redoBtn");
  if(u) u.disabled = hi <= 0;
  if(r) r.disabled = hi >= hist.length - 1;
}
function load(){try{return JSON.parse(localStorage.getItem(STORE_KEY)||"null");}catch(e){return null;}}
/* 规矩 32 ②：把「正在编辑哪一屏」写进地址栏，刷新/收藏能回到同一屏 */
function syncHash(){
  try{
    const p=new URLSearchParams((location.hash||"").replace(/^#/,""));
    if(CVS.active)p.set("s",CVS.active);
    const s=p.toString();
    history.replaceState(null,"",location.pathname+location.search+(s?"#"+s:""));
  }catch(e){}
}
function readHash(){
  try{
    const p=new URLSearchParams((location.hash||"").replace(/^#/,""));
    const id=p.get("s");
    if(id&&CVS.screens.some(s=>s.id===id)){CVS.active=id;return true;}
  }catch(e){}
  return false;
}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function finite(v,def){return isFinite(v)?v:def;}

/* 种子色 → 简化 Material 3 scheme */
function applyTheme(){
  const t=CVS.theme;
  document.documentElement.style.setProperty("--radius",t.radius+"px");
  document.documentElement.style.setProperty("--font",t.font);
  document.documentElement.style.setProperty("--motion",t.motion);
  // --accent 是编辑器自己的强调色（激活的屏标签 / 选中框 / hover 边框），不跟主题种子色走：
  // 种子色若接近白色（如 #fcfcfc），激活标签会变白底白字、选中框在浅画布上直接消失。
  // 主题色只经由 --c-primary 作用于画布内的组件，两者互不干涉。
  const hsl=hexToHsl(t.seed);
  document.documentElement.style.setProperty("--c-primary",t.seed);
  document.documentElement.style.setProperty("--c-surface","#ffffff");
  document.documentElement.style.setProperty("--c-surface-variant",hslToHex(hsl.h,hsl.s*0.4,hsl.l*1.04+6));
  document.documentElement.style.setProperty("--c-outline",hslToHex(hsl.h,hsl.s*0.3,hsl.l*0.6+18));
  document.documentElement.style.setProperty("--c-on-surface",hslToHex(hsl.h,hsl.s*0.2,18));
  $("#thScheme").textContent="primary "+t.seed;
}
function hexToHsl(hex){const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn)s=0;else{const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4}h/=6}return{h:h*360,s:s*100,l:l*100}}
function hslToHex(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12;const a=s*Math.min(l,1-l);const f=n=>{const c=l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return Math.round(255*c).toString(16).padStart(2,"0")};return "#"+f(0)+f(8)+f(4);}

/* ============================================================
   画布名：点标题就地改，值存 CVS.title
   —— 用「h1 里塞一个 input」而不是 prompt()：prompt 会打断操作、
      file:// 下弹窗样式也不可控；就地改名更接近桌面设计器。
   ============================================================ */
function renderTitle(){
  const h = $("#cvTitle");
  if(!h) return;
  if(h.querySelector("input")) return;          // 正在改名：不要用 textContent 把输入框冲掉
  h.textContent = CVS.title || "未命名画布";
  h.title = "点击改名";
}
function startTitleEdit(){
  const h = $("#cvTitle");
  if(!h || h.querySelector("input")) return;
  const cur = CVS.title || "";
  h.classList.add("editing");
  const inp = document.createElement("input");
  inp.type = "text";
  inp.value = cur;
  inp.maxLength = 60;
  h.textContent = "";
  h.appendChild(inp);
  inp.focus();
  inp.select();
  let done = false;
  const commit = (keep)=>{
    if(done) return;
    done = true;
    const next = keep ? (inp.value.trim() || "未命名画布") : cur;
    h.classList.remove("editing");
    if(next !== CVS.title){ CVS.title = next; save(); }
    renderTitle();
  };
  inp.addEventListener("keydown", e=>{
    // 只拦「纯文字键」，Ctrl/⌘ 组合放行给全局（否则改名时按 Ctrl+S 保存不了）
    if(!e.ctrlKey && !e.metaKey) e.stopPropagation();
    if(e.key === "Enter"){ e.preventDefault(); commit(true); }
    else if(e.key === "Escape"){ e.preventDefault(); commit(false); }
  });
  inp.addEventListener("blur", ()=>commit(true));
}

/* ============================================================
   渲染：屏幕标签
   ============================================================ */
function renderScreens(){
  const box=$("#screens");box.innerHTML="";
  CVS.screens.forEach(s=>{
    const t=document.createElement("div");
    t.className="screen-tab"+(s.id===CVS.active?" on":"");
    const inp=document.createElement("input");inp.value=s.name;
    inp.addEventListener("change",()=>{s.name=inp.value;save();});
    inp.addEventListener("click",e=>e.stopPropagation());
    t.appendChild(inp);
    if(CVS.screens.length>1){const x=document.createElement("span");x.className="x";x.textContent="✕";x.onclick=e=>{e.stopPropagation();delScreen(s.id);};t.appendChild(x);}
    t.onclick=()=>{CVS.active=s.id;selId=null;renderAll();};
    box.appendChild(t);
  });
}
function delScreen(id){
  if(CVS.screens.length<=1)return;
  CVS.screens=CVS.screens.filter(s=>s.id!==id);
  if(CVS.active===id)CVS.active=CVS.screens[0].id;
  save();renderAll();
}

/* ============================================================
   渲染：组件面板（组件 + 素材库动效；动效组可折叠）
   ============================================================ */
function renderPalette(){
  const pal=$("#palette");pal.innerHTML="";
  // 组件组
  const g1=document.createElement("div");g1.className="grp";g1.innerHTML=`<span>组件（原生可编辑）</span>`;pal.appendChild(g1);
  const b1=document.createElement("div");b1.className="grp-body";pal.appendChild(b1);
  Object.keys(PARTS).forEach(k=>{
    const def=PARTS[k];
    const btn=document.createElement("button");btn.textContent=def.label;btn.draggable=true;
    btn.addEventListener("dragstart",e=>e.dataTransfer.setData("text/plain",JSON.stringify({type:k,def:def.def,fromEffect:false})));
    btn.onclick=()=>addPart(k,def.def,false);
    b1.appendChild(btn);
  });
  // 效果组（可折叠，避免 105 个按钮糊一脸）
  const eff=effectParts();
  const g2=document.createElement("div");g2.className="grp";
  g2.innerHTML=`<span>素材库动效（${eff.length}）</span><span class="fold" id="effFold">收起</span>`;pal.appendChild(g2);
  const b2=document.createElement("div");b2.className="grp-body";b2.id="effBody";pal.appendChild(b2);
  eff.forEach(m=>{
    const btn=document.createElement("button");btn.textContent="◈ "+m.label;btn.draggable=true;btn.title=m.demo;
    btn.addEventListener("dragstart",e=>e.dataTransfer.setData("text/plain",JSON.stringify({type:"__effect",demo:m.demo,label:m.label,id:m.id,fromEffect:true})));
    btn.onclick=()=>addEffect(m);
    b2.appendChild(btn);
  });
  g2.onclick=e=>{ if(e.target.id==="effFold"||e.target===g2.firstChild){ const hidden=b2.classList.toggle("hidden"); $("#effFold").textContent=hidden?"展开":"收起"; } };
}

/* ============================================================
   增删组件
   ============================================================ */
function basePart(type,def,fromEffect){
  const isEffect=fromEffect||type==="__effect";
  const w=isEffect?220:160,h=isEffect?150:56;
  const s=curScreen();
  const n=s.parts.length;
  return {id:uid(),type,props:JSON.parse(JSON.stringify(def||{})),x:24+(n%6)*20,y:24+(n%10)*20,w,h,behavior:{target:null,transition:"slide"}};
}
function addPart(type,def,fromEffect){
  const p=basePart(type,def,fromEffect);
  curScreen().parts.push(p);selId=p.id;save();renderAll();
}
function addEffect(m){
  const p=basePart("__effect",{},true);p.demo=m.demo;p.label=m.label;p.eid=m.id;
  p.params=paramDefaults(p);                 // C4：参数初值来自素材库的「默认」
  curScreen().parts.push(p);selId=p.id;save();renderAll();
}

/* ============================================================
   渲染：画布（仅重建 DOM，不在此处处理选中/拖动）
   ============================================================ */
function renderCanvas(){
  const s=curScreen();
  if(!s){canvas.style.width="0px";canvas.style.height="0px";canvas.innerHTML="";return;}  canvas.style.width=s.w+"px";canvas.style.height=s.h+"px";
  canvas.innerHTML="";
  s.parts.forEach(p=>{
    const el=document.createElement("div");
    el.className="part"+(p.id===selId?" sel":"");
    el.style.left=p.x+"px";el.style.top=p.y+"px";el.style.width=p.w+"px";el.style.height=p.h+"px";
    el.dataset.id=p.id;
    const def=partDef(p);
    el.innerHTML=(def?def.render(p.props||{},CVS.theme):"")+
      `<span class="handle nw"></span><span class="handle ne"></span><span class="handle sw"></span><span class="handle se"></span>`;
    bindPart(el,p);
    canvas.appendChild(el);
  });
  applyZoom();
  guardFrames();
}
/* iframe 的 error 事件对 404 不可靠，所以再加一道「超时没 load 就算失败」的兜底 */
function guardFrames(){
  canvas.querySelectorAll(".part iframe").forEach(f=>{
    const part=f.closest(".part");
    if(!part)return;
    part.classList.remove("failed");
    let ok=false;
    /* C4 ①-5：iframe 每次重建都是新文档，load 后必须把 p.params 全量重推一遍，
       否则「重绘 / 撤销 / 切屏回来」参数全回默认值。 */
    f.addEventListener("load",()=>{
      ok=true;part.classList.remove("failed");
      const p=partById(part.dataset.id);
      if(p) applyParams(f,p);
    });
    // load 之前就已经 load 完（缓存命中）的情况：readyState 已经是 complete
    try{ if(f.contentDocument && f.contentDocument.readyState==="complete"){ const p=partById(part.dataset.id); if(p) applyParams(f,p); } }catch(e){}
    f.addEventListener("error",()=>part.classList.add("failed"));
    setTimeout(()=>{if(!ok)part.classList.add("failed");},9000);
  });
}
function partDef(p){
  if(p.type==="__effect")return {render:()=>`<iframe src="${p.demo}" sandbox="allow-scripts"></iframe>`};
  return PARTS[p.type];
}
/* 缩放：canvas 用 transform，wrap 尺寸跟随，保证滚动区与视觉一致 */
function applyZoom(){
  const s=curScreen();if(!s)return;
  const z=finite(viewScale,1);
  canvas.style.transform=`scale(${z})`;
  canvasWrap.style.width=(finite(s.w,390)*z)+"px";
  canvasWrap.style.height=(finite(s.h,844)*z)+"px";
  $("#zoomVal").textContent=Math.round(z*100)+"%";
}

/* 选中：只切 class + 检查器，不重建画布（关键：保留元素与指针捕获） */
function selectPart(id){
  selId=id;
  canvas.querySelectorAll(".part").forEach(el=>el.classList.toggle("sel",el.dataset.id===id));
  renderInspector(true);             // 换了选中对象必须重建：焦点可能还留在旧面板里，守卫会误拦
  setInspectorOpen(true);            // 选中 = 要看属性，右栏滑出
}
function deselect(){ selId=null; canvas.querySelectorAll(".part.sel").forEach(el=>el.classList.remove("sel")); renderInspector(true); setInspectorOpen(false); }

/* ============================================================
   双击 = 两条编辑通道并存，写的是同一条数据（p.props[f]）
   ① 命中「单行文本字段」→ 画布上原地编辑（contenteditable 直接长在文字身上）。
      所见即所得：不用先去右栏找回「哪个框对应画布上哪行字」。
   ② 其余 → 兜底到右侧检查器（选中 + 展开右栏 + 展开「内容」并聚焦第一个框）：
      多行长文本（body / 值 ≥20 字）、items 列表、variant / 布尔 / 数字这些
      控件型字段，以及素材部件（__effect）的参数面板 —— 在画布里改会丢结构信息。
   —— 交互态（▶ 交互 / 快捷键 R）下两条都不走：那时鼠标是用来试运行动效的。
   —— 任何一条通道改完都立刻写回 p.props 并 save()，另一条重绘后自然同步。
   ============================================================ */
function focusContentField(field){
  const box = $("#inspector");
  if(!box) return;
  const sec = box.querySelector('details[data-sec="content"]');
  if(sec && !sec.open) sec.open = true;
  /* 已知「点的是哪个字段」就精确聚焦那个控件（点对话框正文 → 聚焦正文 textarea），
     否则退回「内容区第一个输入框」这条老路径。 */
  const inp = (field && box.querySelector(`details[data-sec="content"] [data-f="${field}"]`))
    || box.querySelector('details[data-sec="content"] [data-f]');
  if(!inp) return;
  try{
    inp.focus();
    if(typeof inp.select === "function") inp.select();   // 文本选中，直接覆盖输入
  }catch(e){}
}

/* ============================================================
   C5 ① 画布原地编辑（contenteditable）
   —— 哪些字段能原地改：只有「单行文本类」——
      即 fieldKind() 判定为 "text" 的字段（text/sub/label/icon/...），
      且不是 items 数组、不是 variant/布尔/数字这类控件型字段。
      「long」一律留给右栏：正文类内容多行、需要换行与完整回显，
      塞进一个 contenteditable 里改，视觉与右栏 textarea 会打架。
   —— 怎么找到承载文字的节点：按「字段值 == 文本节点内容」精确匹配。
      不用给 41 个组件的 render 加 data-f 标记 —— 那要改 41 处渲染模板，
      而且 esc() 之后文本节点内容本来就和 p.props 同值，匹配是可靠的。
      匹配不到（比如值被 render 截断/改写，如 avatar 的 slice）就直接
      放弃原地编辑、退回右栏，绝不去猜「大概是这个节点」然后写错字段。
   —— 为什么要 insEditing 同款守卫：右栏重绘会把焦点扔掉，
      而原地编辑期间焦点在画布上，所以重绘前必须确认没人在打字。
   ============================================================ */
let editing = null;      // {host, p, field, orig, composing, finished, partEl}
/* 装饰性叶子（图标/箭头/旋钮）：空值兜底时不能把它们当成文字容器 */
const DECOR_CLS = new Set(["ic","cv","tk","bar","dot","mini","lens","pin","spin","grab","ar","bx","rd","fill","caret"]);

/* ── 判定「这次双击点的是哪个字段」────────────────────────────
   不按「组件的第一个文本字段」猜，而是按**点中的那个元素自己的文字**反查：
   沿 target → partEl 往上走，哪一层元素的 textContent 恰好等于某个字段值，
   那一层就是该字段的容器。
   为什么必须这样：对话框 / 卡片同时有 text 和 body 两个字段，
   点标题要原地改、点正文要走右栏 —— 只看「组件有哪些字段」永远分不清。
   返回 {f, kind, host}；判定不了返回 null（调用方退回右栏，不猜）。 */
function fieldForTarget(partEl, p, target){
  if(!p || p.type==="__effect") return null;
  const def = PARTS[p.type];
  if(!def || !def.fields || !def.fields.length) return null;
  const fields = def.fields.filter(f=>f!=="items");
  const norm = s => String(s==null ? "" : s).replace(/\u00a0/g," ").replace(/\s+/g," ").trim();
  let node = target;
  while(node && node !== partEl && node.nodeType === 1){
    if(node.classList.contains("handle")) return null;
    const txt = norm(node.textContent);
    if(txt){
      /* 只认「纯文字叶子」：带子元素的容器是复合控件（开关的旋钮、下拉的箭头、
         扩展按钮里的图标），把 contenteditable 挂在它身上，用户一退格就把
         旋钮/箭头删了 —— 那不是改文字，是改结构。这类一律留给右栏。 */
      if(node.children.length) return null;
      for(const f of fields){
        const v = p.props ? p.props[f] : null;
        if(v == null || typeof v !== "string") continue;
        if(norm(v) && norm(v) === txt) return { f, kind: fieldKind(f, v), host: node };
      }
      /* 点中的这层有字但不是任何字段的完整值（比如被截断/拼接过的文字）：
         再往上只会更不像，直接放弃原地编辑 */
      return null;
    }
    node = node.parentElement;
  }
  /* 整块都没有文字（空值字段）：按字段顺序在空叶子里挑一个，且只挑单行文本字段 */
  const first = fields.find(f=>fieldKind(f, p.props ? p.props[f] : "") === "text");
  if(!first) return null;
  const leaf = [];
  (function walk(n){
    for(const c of n.children){
      if(c.classList.contains("handle") || Array.from(c.classList).some(k=>DECOR_CLS.has(k))) continue;
      if(!c.children.length && !c.textContent.trim()) leaf.push(c);
      else walk(c);
    }
  })(partEl);
  return { f: first, kind: "text", host: leaf[0] || null };
}

function startInlineEdit(partEl, p, f, host){
  if(editing) commitInlineEdit();                    // 上一处没收尾先提交，不吞用户输入
  if(!host) return false;                            // 找不到落点 → 让调用方退回右栏
  const text = String(p.props[f]==null ? "" : p.props[f]);

  host.setAttribute("contenteditable","true");
  host.classList.add("inline-edit");
  host.spellcheck = false;
  partEl.classList.add("editing");
  editing = { host, p, field:f, orig:text, composing:false, finished:false, partEl };

  /* IME 三重守卫里的一、二：组合开始/结束只翻一个布尔，不提交、不改字。 */
  host.addEventListener("compositionstart", ()=>{ if(editing && editing.host===host) editing.composing = true; });
  host.addEventListener("compositionend", ()=>{ if(editing && editing.host===host) editing.composing = false; });
  /* 兜底：少数输入法（尤其 Windows 自带 IME + 某些浏览器版本）结束组合时不派发
     compositionend，组合态会卡在 true —— 那时用户再怎么按 Enter 都提交不了。
     非组合来源的 beforeinput 一定意味着组合已经结束，就地解卡。 */
  host.addEventListener("beforeinput", e=>{
    if(!editing || editing.host!==host) return;
    const it = String(e.inputType || "");
    if(it && it.indexOf("Composition") < 0) editing.composing = false;
  });
  host.addEventListener("blur", ()=>{ if(editing && editing.host===host) commitInlineEdit(); });
  host.addEventListener("keydown", e=>{
    if(!editing || editing.host!==host) return;
    /* 第三重：keyCode 229 是「正在组合」的浏览器约定值（老 Safari/部分 IME 只给这个）。
       三者任一成立就一律放行 —— 中文拼字时按回车是「确认候选词」，不是提交。 */
    if(e.isComposing || editing.composing || e.keyCode===229) return;
    if(e.key==="Escape"){ e.preventDefault(); e.stopPropagation(); endInlineEdit(true); return; }
    if(e.key==="Enter"){
      e.preventDefault(); e.stopPropagation();         // 单行字段：连 Shift+Enter 也不许换行
      if(!e.shiftKey) commitInlineEdit();
      return;
    }
  });
  /* 粘贴只取纯文本：从网页/文档里粘过来的富文本会带着 span/style 一整套，
     塞进 contenteditable 后提交时 textContent 会拼成一团，还可能带进 <script>。 */
  host.addEventListener("paste", e=>{
    if(!editing || editing.host!==host) return;
    e.preventDefault();
    const t = (e.clipboardData || window.clipboardData);
    const s = t ? String(t.getData("text/plain")||"").replace(/\s+/g," ") : "";
    if(s) document.execCommand("insertText", false, s);
  });

  host.focus();
  try{
    const r = document.createRange(); r.selectNodeContents(host);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
  }catch(e){}
  return true;
}
/* 提交：写回 p.props → 进撤销栈（merge：同一字段连续改只占一格）→ 两栏一起重绘 */
function commitInlineEdit(){
  if(!editing || editing.finished) return;
  const {host, p, field, orig, partEl} = editing;
  editing.finished = true;
  const next = (host.textContent || "").replace(/\u00a0/g," ").replace(/\s+/g," ").trim();
  editing = null;
  /* 内容没变也要收尾：把 contenteditable / 虚线框摘掉，否则「点了没改」会留一个卡住的编辑框 */
  host.removeAttribute("contenteditable");
  host.classList.remove("inline-edit");
  if(partEl) partEl.classList.remove("editing");
  if(next !== orig){
    p.props[field] = next;
    save({merge:"inline:"+p.id+":"+field});            // 打字过程不进栈，只在提交时占一格
    renderCanvas();                                  // 重建 DOM，确保画布上的字跟着数据
    renderInspector();                               // 右栏输入框同步新值（非 force：尊重焦点守卫）
  }
}
function endInlineEdit(cancel){
  if(!editing) return;
  const {host, orig, partEl} = editing;
  editing.finished = true;
  editing = null;
  if(!cancel) return;
  /* 取消：把文字还原成改之前。带子元素的容器（如开关的旋钮）只能整体重绘。 */
  if(host.children.length){ renderCanvas(); }
  else{
    host.textContent = orig;
    host.removeAttribute("contenteditable");
    host.classList.remove("inline-edit");
    if(partEl) partEl.classList.remove("editing");
  }
}
/* 正在原地编辑的节点内部不吃指针：否则一动就变成拖拽，光标也没了 */
function inInlineEdit(t){
  return !!(editing && editing.host && (t===editing.host || editing.host.contains(t)));
}

/* ============================================================
   右侧检查器：未选中时整栏收起（画布吃回 248px），选中时滑出
   把手贴在画布右边缘；手动点开 = 固定展开，不随选中状态收回
   ============================================================ */
const colsEl = $(".cols"), rightPanel = $("#rightPanel"), insToggle = $("#insToggle");
let insPinned = false;
function setInspectorOpen(open){
  if(!colsEl) return;
  const on = !!open || insPinned;
  colsEl.classList.toggle("ins-hidden", !on);
  if(rightPanel) rightPanel.setAttribute("aria-expanded", on ? "true" : "false");
  if(insToggle){
    insToggle.textContent = on ? "›" : "‹";
    insToggle.setAttribute("aria-expanded", on ? "true" : "false");
    insToggle.title = on ? "收起检查器" : "展开检查器";
  }
}
if(insToggle) insToggle.addEventListener("click", ()=>{
  const nowHidden = colsEl.classList.contains("ins-hidden");
  insPinned = nowHidden;
  setInspectorOpen(!nowHidden);
});
/* C4 ②：顶栏「▶ 交互」按钮。开关是幂等的 —— 再点一次就退出。 */
const interactBtnEl = $("#interactBtn");
if(interactBtnEl) interactBtnEl.addEventListener("click", ()=>toggleInteractive());
/* 提示条上的退出按钮：交互态下用户点进 iframe 后键盘事件归子文档所有，
   父页收不到 Esc —— 所以必须有一个「用鼠标就能退出」的出口。 */
const exitInteractEl = $("#exitInteract");
if(exitInteractEl) exitInteractEl.addEventListener("click", e=>{
  e.stopPropagation();
  setInteractive(false);
  toast("已退出交互态");
});

/* 交互：选中 / 拖动 / 四角缩放 / 双击聚焦检查器（都作用在「当前」el 上，不重建）
   双击防误触：pointerdown→pointerup 位移 <4px 才算「一次点击」。
   拖拽组件（挪位置）结束时位移必然 >4px，此时浏览器可能仍补发 dblclick，
   用 suppressed 标记把这次双击吃掉，避免「拖两下就把检查器抢过去」。 */
const CLICK_SLOP = 4;
function bindPart(el,p){
  let pd = null;          // 本次按下的起点与是否已越过阈值
  let suppressDbl = false;
  el.addEventListener("pointerdown",e=>{
    if(interactive) return;                            // C4 ②：交互态下不选中、不拖动
    if(inInlineEdit(e.target)) return;                 // C5 ①：正在原地改字 → 不抢指针去拖拽
    if(e.target.classList.contains("handle"))return;   // 手柄另算
    e.stopPropagation();
    selectPart(p.id);
    pd = {x:e.clientX, y:e.clientY, moved:false};
    const sx=e.clientX,sy=e.clientY,ox=p.x,oy=p.y;const s=curScreen();
    try{ el.setPointerCapture(e.pointerId); }catch(err){/* 合成事件/无活动指针时会抛，忽略即可 */}
    const mv=ev=>{
      if(pd && !pd.moved && Math.hypot(ev.clientX-pd.x, ev.clientY-pd.y) > CLICK_SLOP){
        pd.moved = true; suppressDbl = true;           // 一旦越过阈值 = 拖拽，不是点击
      }
      let nx=clamp(ox+(ev.clientX-sx)/viewScale,0,s.w-p.w);
      let ny=clamp(oy+(ev.clientY-sy)/viewScale,0,s.h-p.h);
      /* C4 ④1 + ③6：先 4dp 网格取整，再对齐邻居（按住 Ctrl/⌘ 跳过网格但保留参考线） */
      const g = snapPoint(p, nx, ny, ev.ctrlKey||ev.metaKey);
      nx = g.x; ny = g.y;
      const sn = snapGuides(p, nx, ny);
      // 吸附之后可能越界（贴边的那条线在画布外），最后再夹一次
      p.x=clamp(sn.x,0,s.w-p.w); p.y=clamp(sn.y,0,s.h-p.h);
      el.style.left=p.x+"px";el.style.top=p.y+"px";
    };
    const up=()=>{
      el.removeEventListener("pointermove",mv);el.removeEventListener("pointerup",up);
      const wasDrag = !!(pd && pd.moved);
      clearGuides();
      if(wasDrag) save();                              // 只有真的挪动过才占一格历史
      pd = null;
      // 拖拽结束后浏览器仍可能补发 dblclick；350ms 窗口内吃掉它
      setTimeout(()=>{ suppressDbl = false; }, 350);
    };
    el.addEventListener("pointermove",mv);el.addEventListener("pointerup",up);
  });
  el.addEventListener("dblclick",e=>{
    if(suppressDbl) return;                            // 拖拽结束的余波，不当作双击
    if(interactive) return;                            // 交互态是在试运行动效，不进入编辑
    /* 为什么不用 e.target：pointerdown 里调了 setPointerCapture，
       click/dblclick 的 target 会被算成「按下与抬起的共同祖先」= .part 本体，
       于是永远拿不到用户真正点到的那行字。按坐标重新问一次 DOM 才准。 */
    let t = e.target;
    if(!t || t === el || !el.contains(t)){
      const under = document.elementFromPoint(e.clientX, e.clientY);
      if(under && el.contains(under)) t = under;
    }
    if(inInlineEdit(t)) return;                        // 已经在改了
    e.preventDefault(); e.stopPropagation();
    selectPart(p.id);                                  // 先选中：两条通道都要「选中」这个前提
    /* ① 点中的是「单行文本字段」的纯文字叶子 → 画布上原地改。
       多行长字段（body）、items 列表、控件型字段、复合控件、素材部件
       都会在 fieldForTarget 里被判出局，自然落到 ②。 */
    const hit = fieldForTarget(el, p, t);
    if(hit && hit.kind === "text" && startInlineEdit(el, p, hit.f, hit.host)) return;
    /* ② 兜底：保留改动前的行为 —— 右栏展开 + 展开「内容」并聚焦对应文本框 */
    setInspectorOpen(true);
    focusContentField(hit ? hit.f : null);
  });
  el.querySelectorAll(".handle").forEach(h=>{
    h.addEventListener("pointerdown",e=>{
      e.stopPropagation();selectPart(p.id);
      const sx=e.clientX,sy=e.clientY,ow=p.w,oh=p.h;
      try{ h.setPointerCapture(e.pointerId); }catch(err){}
      const mv=ev=>{p.w=Math.max(40,ow+(ev.clientX-sx)/viewScale);p.h=Math.max(30,oh+(ev.clientY-sy)/viewScale);el.style.width=p.w+"px";el.style.height=p.h+"px";};
      const up=()=>{h.removeEventListener("pointermove",mv);h.removeEventListener("pointerup",up);save();};
      h.addEventListener("pointermove",mv);h.addEventListener("pointerup",up);
    });
  });
}
/* 点空白画布 = 取消选中（不添加任何东西） */
canvas.addEventListener("pointerdown",e=>{ if(e.target===canvas) deselect(); });
/* 从组件面板拖入画布：落点坐标按缩放还原 */
canvas.addEventListener("dragover",e=>e.preventDefault());
canvas.addEventListener("drop",e=>{
  e.preventDefault();const d=JSON.parse(e.dataTransfer.getData("text/plain")||"{}");if(!d.type)return;
  const r=canvas.getBoundingClientRect();
  const p=basePart(d.type,d.def,d.fromEffect);
  p.x=clamp((e.clientX-r.left)/viewScale-20,0,curScreen().w-p.w);
  p.y=clamp((e.clientY-r.top)/viewScale-20,0,curScreen().h-p.h);
  if(d.type==="__effect"){p.demo=d.demo;p.label=d.label;}
  curScreen().parts.push(p);selId=p.id;save();renderAll();
});

/* ============================================================
   C4 ① 统一参数接口（素材部件可调参数）
   —— 数据来源只有一个：Repo.getMaterialParams(id)（repo.js 里归一化）。
      这里只管「取字段 / 画控件 / 推给 iframe」，不重复解析中文键。
   —— 为什么 applyParams 放在 canvas.js 而不是 repo.js：
      repo.js 是纯数据层（不许碰 DOM / 不许碰 window 的其它对象），
      而 postMessage 的对象是 iframe、时机是「load 之后」、
      取值是 p.params —— 全是视图概念。数据层只回答「参数长什么样」。
   ============================================================ */
function matParams(p){
  if(!p || p.type!=="__effect" || !p.eid) return [];
  if(!window.Repo || !Repo.getMaterialParams) return [];
  return Repo.getMaterialParams(p.eid) || [];
}
/* 新建部件时的初值：库里的默认值（用户改过后不再调用它覆盖） */
function paramDefaults(p){
  if(!p || p.type!=="__effect" || !p.eid) return {};
  if(window.Repo && Repo.materialParamDefaults) return Repo.materialParamDefaults(p.eid);
  const o={}; matParams(p).forEach(q=>{o[q.key]=q.default;}); return o;
}
/* 把当前 p.params 全量推给 iframe。
   —— 全量而不是增量：iframe 每次重建（重绘 / 撤销 / 切屏回来）都是全新文档，
      只推「刚改的那一个」会让其余参数回到 demo 自己的默认值。
   —— 时序：onload 之后再推。iframe 的 contentWindow 在 load 前也存在，
      但 demo 里的监听是在 <script> 里注册的，早于 load 发会丢消息。 */
function applyParams(iframe, p){
  if(!iframe || !p) return;
  const w = iframe.contentWindow;
  if(!w) return;
  const vals = (p.params && typeof p.params==="object") ? p.params : paramDefaults(p);
  Object.keys(vals).forEach(k=>{
    try{ w.postMessage({type:"param", key:k, value:vals[k]}, "*"); }catch(e){}
  });
}
/* 只推某一个（改参数时的实时预览，省掉整轮 postMessage） */
function applyOneParam(iframe, key, value){
  if(!iframe) return;
  try{ iframe.contentWindow.postMessage({type:"param", key:key, value:value}, "*"); }catch(e){}
}
/* 参数控件之间的镜像同步：滑块 ↔ 数值框、色块 ↔ 十六进制文本；不同步用户正在聚焦的那一侧。 */
/* 只同步「非焦点」的那一方 —— 用户正在打字的框被改写 = 光标跳走。 */
function syncParamPeers(box, key, src){
  const rng=box.querySelector(`[data-p="${key}"]`);
  const num=box.querySelector(`[data-pnum="${key}"]`);
  const col=box.querySelector(`[data-p="${key}"]`);
  const hex=box.querySelector(`[data-phex="${key}"]`);
  if(rng && rng.type==="range" && num && src!==num && document.activeElement!==num) num.value=rng.value;
  if(num && rng && rng.type==="range" && src===num) rng.value=num.value;
  if(col && col.type==="color" && hex && src!==hex && document.activeElement!==hex) hex.value=col.value;
}

/* 双击名称行改名（C4 ③3）：原地换成 input，Enter 提交 / Esc 取消。
   空名字视为「恢复类型名」——存空串等于没名字，显示层会回落到类型名。 */
function startPartRename(p){
  const nm=$("#partName"); if(!nm) return;
  const old=p.name||"";
  const inp=document.createElement("input");
  inp.type="text"; inp.value=nm.textContent; inp.maxLength=40;
  nm.replaceWith(inp); inp.focus(); inp.select();
  let done=false;
  const commit=(ok)=>{
    if(done) return; done=true;
    const v=(inp.value||"").trim();
    if(ok){ p.name = v; save({merge:"name:"+p.id}); }
    renderInspector(true);
  };
  inp.addEventListener("keydown",e=>{
    if(e.isComposing) return;
    if(e.key==="Enter"){ e.preventDefault(); commit(true); }
    else if(e.key==="Escape"){ e.preventDefault(); commit(false); }
  });
  inp.addEventListener("blur",()=>commit(true));
}

/* 参数值的类型化读取：input 给的都是字符串，回填时必须是原类型，
   否则 demo 里 `state.speed + 1` 会变成字符串拼接。 */
function coerceParam(def, v){
  if(!def) return v;
  if(def.type==="slider"||def.type==="number"){
    const n=(v===""||v==null)?def.default:+v;
    return isFinite(n)?clamp(n,def.min,def.max):def.default;
  }
  if(def.type==="switch") return (v===true||v==="1"||v==="true"||v==="on");
  return v;
}

/* ============================================================
   C4 ② 交互态：让 iframe 吃回鼠标
   —— 它是**视图状态**：不写 CVS、不进撤销栈、不落盘。
      理由：撤销栈记录的是「文档长什么样」，而「现在能不能点」是
      就像 PPT 的放映模式，你不会希望 Ctrl+Z 把放映退出来。
   ============================================================ */
let interactive = false;
function setInteractive(on, opt){
  interactive = !!on;
  canvasWrap.classList.toggle("interactive", interactive);
  const btn = $("#interactBtn");
  if(btn){ btn.classList.toggle("on", interactive); btn.textContent = interactive ? "■ 交互中" : "▶ 交互"; }
  if(interactive){
    // 进交互态先取消选中：选中框 + 手柄留在画布上会挡住「这一块能不能点」的判断
    if(selId){ selId=null; canvas.querySelectorAll(".part.sel").forEach(el=>el.classList.remove("sel")); renderInspector(true); }
    /* 焦点留在宿主文档上，Esc 才收得到。
       —— 一旦用户点进 iframe，键盘事件就交给子文档了（跨源，父页收不到），
          所以提示条上必须有**可点的退出按钮**，不能只写「按 Esc」。
          这是本次唯一无法用纯键盘覆盖的角落，直接做成可见出口。 */
    try{ if(!(opt && opt.keepFocus)) document.body.focus(); }catch(e){}
    if(!(opt && opt.quiet)) toast("交互态：动效可以直接点 · 点提示条的「退出」或按 Esc");
  }
}
function toggleInteractive(){ setInteractive(!interactive); }

/* 拖动时的对齐参考线（C4 ③6）：
   —— 阈值是**屏幕恒定 7px**，除以当前缩放比换算回画布坐标，
      否则缩到 50% 时手感会变成「贴得死死的」、放到 200% 又「怎么都不吸」。
   —— 只吸附「邻居的左/中/右、上/中/下」，共 6 条候选线。 */
const GUIDE_PX = 7;
let guideEls = [];
function clearGuides(){
  guideEls.forEach(el=>el.remove());
  guideEls = [];
}
function drawGuide(axis, at){
  const el = document.createElement("div");
  el.className = "guide " + (axis==="v" ? "v" : "h");
  if(axis==="v") el.style.left = Math.round(at)+"px";
  else el.style.top = Math.round(at)+"px";
  canvas.appendChild(el);
  guideEls.push(el);
}
/* 返回吸附后的坐标与命中的线；me 是被拖动的部件（不跟自己比） */
function snapGuides(p, x, y){
  const s = curScreen(); if(!s) return {x, y};
  const tol = GUIDE_PX / (viewScale || 1);
  clearGuides();
  const others = s.parts.filter(q=>q.id!==p.id);
  const mineX = [x, x + p.w/2, x + p.w];       // 左 / 中 / 右
  const mineY = [y, y + p.h/2, y + p.h];       // 上 / 中 / 下
  let bestX = null, bestY = null;
  others.forEach(q=>{
    [q.x, q.x + q.w/2, q.x + q.w].forEach(line=>{
      mineX.forEach((mv,i)=>{
        const d = Math.abs(mv - line);
        if(d <= tol && (!bestX || d < bestX.d)) bestX = {d, line, i};
      });
    });
    [q.y, q.y + q.h/2, q.y + q.h].forEach(line=>{
      mineY.forEach((mv,i)=>{
        const d = Math.abs(mv - line);
        if(d <= tol && (!bestY || d < bestY.d)) bestY = {d, line, i};
      });
    });
  });
  let nx = x, ny = y;
  if(bestX){ nx = bestX.line - [0, p.w/2, p.w][bestX.i]; drawGuide("v", bestX.line); }
  if(bestY){ ny = bestY.line - [0, p.h/2, p.h][bestY.i]; drawGuide("h", bestY.line); }
  return {x: nx, y: ny};
}
/* 4dp 网格（C4 ④1）：以**屏幕原点**取整 —— origin + round((v-origin)/4)*4。
   —— 为什么不直接 Math.round(v/4)*4：屏幕原点若不在 0（比如画布有内边距、
      或者将来允许画布内偏移），直接取整会让整块内容整体错 2px 且永远贴不齐。
      以 origin 为基准取整，原点本身永远是网格点。
   —— 按住 Ctrl/⌘ 临时跳过（与大多数设计工具一致：想精确摆放时不用改设置）。 */
const GRID_DP = 4;
function snapGrid(v, origin){
  const o = origin || 0;
  return o + Math.round((v - o)/GRID_DP)*GRID_DP;
}
function snapPoint(p, x, y, noSnap){
  if(noSnap) return {x, y};
  return {x: snapGrid(x, 0), y: snapGrid(y, 0)};
}

/* ============================================================
   C4 辅助：参数镜像 / 改名
   ============================================================ */

/* 参数控件之间的镜像同步 / 改名 / 参数类型化：本段无副作用，只定义辅助函数。 */
const TEXTY = new Set(["text","body","sub","label","icon","title","desc","placeholder"]);
const NUMERIC = new Set(["w","h","x","y","size","radius","width","height","gap","opacity","duration"]);
const FIELD_CN = {text:"文字",body:"正文",sub:"副标题",label:"标签",icon:"图标",items:"项目",on:"默认开启",
  variant:"样式",size:"尺寸",radius:"圆角",x:"x",y:"y",w:"宽",h:"高",width:"宽",height:"高",gap:"间距"};

function fieldKind(f,v){
  if(f==="variant") return "variant";
  if(f==="items") return "items";
  if(typeof v==="boolean"||f==="on") return "bool";
  if(typeof v==="number") return "number";
  if(!TEXTY.has(f) && (NUMERIC.has(f)||/^-?\d+(\.\d+)?$/.test(String(v==null?"":v).trim()))) return "number";
  if(f==="body"||String(v==null?"":v).length>=20) return "long";
  return "text";
}

/* 面板正在被用户操作时不要重建 —— 重建 = 丢焦点 / 丢输入法组合态 */
let insEditing = false;
$("#inspector") && $("#inspector").addEventListener("focusin", ()=>{ insEditing = true; });
$("#inspector") && $("#inspector").addEventListener("focusout", ()=>{ setTimeout(()=>{
  const box=$("#inspector");
  insEditing = !!(box && box.contains(document.activeElement));
},0); });

/* 折叠分区状态记忆（C4 ③2）：参考主流设计器 / PPT 窗格的做法 ——
   用户手工折叠一次，下次打开还是折叠的。
   key 用 "arsenal-canvas:sec:<id>"，缺省值按该区的重要程度给。 */
function secOpen(id, dft){
  try{
    const v = localStorage.getItem("arsenal-canvas:sec:"+id);
    if(v === null) return !!dft;
    return v === "1";
  }catch(e){ return !!dft; }
}
function rememberSec(id, open){
  try{ localStorage.setItem("arsenal-canvas:sec:"+id, open?"1":"0"); }catch(e){}
}

function renderInspector(force){
  const box=$("#inspector");const p=partById(selId);
  // 焦点还在面板里就跳过重建：属性值本来就靠 input 事件即时同步，不需要重建来「刷新」
  if(!force && insEditing && box && box.contains(document.activeElement) && box.dataset.sel===String(p&&p.id)) return;
  box.dataset.sel = p ? p.id : "";
  if(!p){box.innerHTML='<div class="empty">点选画布上的组件<br>查看 / 编辑属性</div>';return;}
  const def=PARTS[p.type];
  /* —— 名称行（C4 ③3）：双击改名，存 p.name；没改名时显示类型名 —— */
  const typeName = def ? def.label : (p.label||"动效组件");
  let h=`<div class="name-row"><span class="nm" id="partName" title="双击改名">${esc(p.name||typeName)}</span><span class="ty">${esc(def?"组件":"动效")}</span></div>`;

  /* —— 内容 —— */
  h+=`<details class="sec" data-sec="content" ${secOpen("content",true)?"open":""}><summary>内容</summary><div class="sec-body">`;
  if(p.type==="__effect"){
    /* C4 ②：交互态的第二个入口 —— 选中素材后就在「内容」区顶部「试运行」 */
    h+=`<div class="runbar"><button id="runPart" title="临时开启交互态，让这个动效响应点击（Esc 退出）">▶ 试运行（进入交互）</button></div>`;
    /* C4 ①：统一参数控件。类型来自 Repo.getMaterialParams，这里只负责画 */
    const defs = matParams(p);
    h+=`<div class="row"><label>动效</label><div class="typed mono">${esc(p.label||"")}<br>${esc(p.demo||"")}</div></div>`;
    if(!defs.length){      h+=`<div class="hint">这条素材没有声明可调参数。</div>`;
    }else{
      const vals = p.params || (p.params = paramDefaults(p));
      h+=`<div class="params"><div class="params-hd"><span>可调参数</span><span class="n">${defs.length}</span></div>`;
      defs.forEach(d=>{
        const v = (d.key in vals) ? vals[d.key] : d.default;
        const lab = esc(d.label);
        if(d.type==="color"){
          const hex = /^#[0-9a-fA-F]{6}$/.test(String(v)) ? String(v).toLowerCase() : "#000000";
          h+=`<div class="param" data-pk="${esc(d.key)}"><label title="${lab}">${lab}</label>
            <div class="ctl"><input type="color" data-p="${esc(d.key)}" value="${hex}"><input type="text" class="hex" data-phex="${esc(d.key)}" value="${hex}" spellcheck="false"></div></div>`;
        }else if(d.type==="slider"||d.type==="number"){
          const step = d.type==="slider" ? d.step : 1;
          h+=`<div class="param" data-pk="${esc(d.key)}"><label title="${lab}">${lab}</label>
            <div class="ctl"><input type="range" data-p="${esc(d.key)}" min="${d.min}" max="${d.max}" step="${step}" value="${v}">
            <input type="number" class="num" data-pnum="${esc(d.key)}" min="${d.min}" max="${d.max}" step="${step}" value="${v}"></div></div>`;
        }else if(d.type==="switch"){
          h+=`<div class="param chk" data-pk="${esc(d.key)}"><input type="checkbox" data-p="${esc(d.key)}" id="pp_${esc(d.key)}" ${v?"checked":""}><label for="pp_${esc(d.key)}" title="${lab}">${lab}</label></div>`;
        }else if(d.type==="select"){
          h+=`<div class="param" data-pk="${esc(d.key)}"><label title="${lab}">${lab}</label>
            <select data-p="${esc(d.key)}">${(d.options||[]).map(o=>`<option value="${esc(o)}"${String(o)===String(v)?" selected":""}>${esc(o)}</option>`).join("")}</select></div>`;
        }else{
          h+=`<div class="param" data-pk="${esc(d.key)}"><label title="${lab}">${lab}</label>
            <input type="text" data-p="${esc(d.key)}" value="${esc(v)}" spellcheck="false"></div>`;
        }
      });
      h+=`</div>`;
    }
  }else if(def){
    if(!def.fields.length) h+=`<div class="hint">这个组件没有可编辑的文字内容。</div>`;
    def.fields.forEach(f=>{
      const v=p.props[f], kind=fieldKind(f,v), lab=FIELD_CN[f]||f;
      if(kind==="variant") h+=`<div class="row"><label>${lab}</label><select data-f="${f}"><option value="filled"${v==="filled"?" selected":""}>填充</option><option value="tonal"${v==="tonal"?" selected":""}>中性</option><option value="outlined"${v==="outlined"?" selected":""}>描边</option></select></div>`;
      else if(kind==="bool") h+=`<div class="row chk"><input type="checkbox" data-f="${f}" id="f_${f}" ${v?"checked":""}><label for="f_${f}">${lab}</label></div>`;
      else if(kind==="number") h+=`<div class="row"><label>${lab}</label><input type="number" data-f="${f}" value="${esc(v)}"></div>`;
      else if(kind==="items") h+=`<div class="row"><label>${lab}</label><input type="text" data-f="${f}" value="${esc(v)}"><div class="hint">逗号分隔多项</div></div>`;
      else if(kind==="long") h+=`<div class="row"><label>${lab}</label><textarea rows="2" data-f="${f}">${esc(v)}</textarea></div>`;
      else h+=`<div class="row"><label>${lab}</label><input type="text" data-f="${f}" value="${esc(v)}"></div>`;
    });
  }
  h+=`</div></details>`;

  /* —— 布局：对齐 / 尺寸 / 层级 —— */
  const s=curScreen();
  /* 折叠状态记忆（C4 ③2）：每个 <details> 的开合存 localStorage。
     默认「内容」+「布局」开、「行为」关（与改动前一致，只是改成可记忆）。 */
  const openOf = (id, dft) => secOpen(id, dft);
  h+=`<details class="sec" data-sec="layout" ${openOf("layout",true)?"open":""}><summary>布局</summary><div class="sec-body">`;
  h+=`<div class="row"><label>对齐</label><div class="align-bar">
    <button data-al="left" title="左对齐">⇤</button><button data-al="hcenter" title="水平居中">↔</button><button data-al="right" title="右对齐">⇥</button>
    <button data-al="top" title="顶对齐">⇡</button><button data-al="vcenter" title="垂直居中">↕</button><button data-al="bottom" title="底对齐">⇣</button>
  </div></div>`;
  h+=`<div class="row"><label>位置 / 尺寸</label><div class="num-grid">
    <span class="num-cell"><i>x</i><input type="number" data-g="x" value="${Math.round(p.x)}"></span>
    <span class="num-cell"><i>y</i><input type="number" data-g="y" value="${Math.round(p.y)}"></span>
    <span class="num-cell"><i>w</i><input type="number" data-g="w" value="${Math.round(p.w)}"></span>
    <span class="num-cell"><i>h</i><input type="number" data-g="h" value="${Math.round(p.h)}"></span>
  </div></div>`;
  h+=`<div class="row"><label>层级</label><div class="layer-bar">
    <button data-lay="up" title="上移一层">上移</button><button data-lay="down" title="下移一层">下移</button>
    <button data-lay="top" title="置顶">置顶</button><button data-lay="bottom" title="置底">置底</button>
  </div></div>`;
  h+=`</div></details>`;

  /* —— 行为 —— */
  h+=`<details class="sec" data-sec="behavior" ${secOpen("behavior",false)?"open":""}><summary>行为</summary><div class="sec-body">`;
  h+=`<div class="row"><label>点击跳转</label><select data-b="target"><option value="">无</option><option value="back">返回上一屏</option>`;
  CVS.screens.forEach(sc=>{if(sc.id!==CVS.active)h+=`<option value="${sc.id}"${p.behavior.target===sc.id?" selected":""}>${esc(sc.name)}</option>`;});
  h+=`</select></div>`;
  h+=`<div class="row"><label>过渡</label><select data-b="transition"><option value="slide"${p.behavior.transition==="slide"?" selected":""}>滑动</option><option value="fade"${p.behavior.transition==="fade"?" selected":""}>淡入</option><option value="zoom"${p.behavior.transition==="zoom"?" selected":""}>放大</option><option value="none"${p.behavior.transition==="none"?" selected":""}>无</option></select></div>`;
  h+=`</div></details>`;

  h+=`<div class="row" style="margin-top:var(--sp-2)"><button class="btn ghost" id="delPart" style="width:100%">删除此组件</button></div>`;
  box.innerHTML=h;

  /* 文本/数字/下拉：input 只即时预览（不重建面板、不写撤销栈） */
  box.querySelectorAll("[data-f]").forEach(inp=>{
    const f=inp.dataset.f;
    inp.addEventListener("input",()=>{
      if(inp.type==="checkbox") return;                 // 复选框走 change
      p.props[f] = inp.type==="number" ? (inp.value===""?0:+inp.value) : inp.value;
      renderCanvas();
    });
    inp.addEventListener("change",()=>{
      p.props[f] = inp.type==="checkbox" ? inp.checked : (inp.type==="number" ? (inp.value===""?0:+inp.value) : inp.value);
      save(); renderCanvas();
    });
  });
  box.querySelectorAll("[data-b]").forEach(sel=>sel.addEventListener("change",()=>{p.behavior[sel.dataset.b]=sel.value;save();}));

  /* 对齐：以屏幕真实 w/h 为准 */
  box.querySelectorAll("[data-al]").forEach(btn=>btn.onclick=()=>{
    const sc=curScreen(); if(!sc) return;
    const k=btn.dataset.al;
    if(k==="left") p.x=0;
    else if(k==="hcenter") p.x=(sc.w-p.w)/2;
    else if(k==="right") p.x=sc.w-p.w;
    else if(k==="top") p.y=0;
    else if(k==="vcenter") p.y=(sc.h-p.h)/2;
    else if(k==="bottom") p.y=sc.h-p.h;
    p.x=Math.round(clamp(p.x,-p.w,sc.w)); p.y=Math.round(clamp(p.y,-p.h,sc.h));
    save(); renderCanvas(); syncGeomInputs(p);
  });

  /* x/y/w/h 数值框 */
  box.querySelectorAll("[data-g]").forEach(inp=>{
    const g=inp.dataset.g;
    /* C4 ③5：方向键微调。焦点在数值框里时 ↑↓ 步进 1px，Shift 步进 10px。
       —— 必须 preventDefault：type=number 原生也会响应 ↑↓，但步长固定为 step=1
          且不认 Shift，会和我们打架（一次按键跳两次）。
       —— 左/右也一起给：PPT 的位置框里四个方向都能走，只给 ↑↓ 会让用户以为坏了。 */
    inp.addEventListener("keydown",e=>{
      if(e.isComposing) return;
      const big = e.shiftKey ? 10 : 1;
      let d=0;
      if(e.key==="ArrowUp") d=big;
      else if(e.key==="ArrowDown") d=-big;
      else if(e.key==="ArrowRight") d=big;
      else if(e.key==="ArrowLeft") d=-big;
      else return;
      e.preventDefault();
      const cur=isFinite(+inp.value)?+inp.value:0;
      let nv=cur+d;
      if(g==="w") nv=Math.max(20,nv);
      else if(g==="h") nv=Math.max(16,nv);
      inp.value=nv;
      p[g]=nv;
      save({merge:"geom:"+p.id+":"+g}); renderCanvas();
    });
    inp.addEventListener("input",()=>{
      const v=+inp.value; if(!isFinite(v)) return;
      if(g==="w") p.w=Math.max(20,v); else if(g==="h") p.h=Math.max(16,v); else p[g]=v;
      renderCanvas();
    });
    inp.addEventListener("change",()=>{
      const v=+inp.value; if(!isFinite(v)) return;
      if(g==="w") p.w=Math.max(20,v); else if(g==="h") p.h=Math.max(16,v); else p[g]=v;
      save(); renderCanvas(); syncGeomInputs(p);
    });
  });

  /* 层级：直接改 s.parts 数组顺序（渲染顺序 = 数组顺序） */
  box.querySelectorAll("[data-lay]").forEach(btn=>btn.onclick=()=>{
    const sc=curScreen(); if(!sc) return;
    const i=sc.parts.findIndex(x=>x.id===p.id); if(i<0) return;
    const arr=sc.parts, k=btn.dataset.lay;
    if(k==="up" && i<arr.length-1){ arr.splice(i,1); arr.splice(i+1,0,p); }
    else if(k==="down" && i>0){ arr.splice(i,1); arr.splice(i-1,0,p); }
    else if(k==="top"){ arr.splice(i,1); arr.push(p); }
    else if(k==="bottom"){ arr.splice(i,1); arr.unshift(p); }
    else return;
    save(); renderCanvas();
  });

  $("#delPart").onclick=()=>{curScreen().parts=curScreen().parts.filter(x=>x.id!==p.id);selId=null;save();renderAll();};

  /* —— C4 ①：参数控件的三条绑定通道 ——
     ① input 事件：实时改 + 实时推给 iframe（不写撤销栈，避免拖滑块把历史吃光）
     ② change 事件：落盘 + 入栈，用 merge key 把「一次连续拖动」压成一格
     ③ 颜色框与十六进制文本框互相同步（任一侧改都推） */
  const ifr = canvas.querySelector(`.part[data-id="${p.id}"] iframe`);
  const defOf = k => matParams(p).find(d=>d.key===k);
  const setParam = (k, raw, commit)=>{
    const d = defOf(k); const v = coerceParam(d, raw);
    if(!p.params) p.params = {};
    p.params[k] = v;
    applyOneParam(ifr, k, v);
    if(commit) save({merge:"param:"+p.id+":"+k});
  };
  box.querySelectorAll("[data-p]").forEach(inp=>{
    const k=inp.dataset.p, d=defOf(k);
    if(inp.type==="checkbox"){
      inp.addEventListener("change",()=>{ setParam(k, inp.checked, true); });
      return;
    }
    if(inp.type==="color"){
      inp.addEventListener("input",()=>{
        setParam(k, inp.value, false);
        const hex=box.querySelector(`[data-phex="${k}"]`);
        if(hex && document.activeElement!==hex) hex.value=inp.value;
      });
      inp.addEventListener("change",()=>setParam(k, inp.value, true));
      return;
    }
    inp.addEventListener("input",()=>{ setParam(k, inp.value, false); syncParamPeers(box,k,inp); });
    inp.addEventListener("change",()=>{ setParam(k, inp.value, true); syncParamPeers(box,k,inp); });
  });
  /* 十六进制文本：边打边试（只在合法时生效），坏值标红但不回滚 —— 回滚会让用户打不完 */
  box.querySelectorAll("[data-phex]").forEach(tx=>{
    const k=tx.dataset.phex;
    tx.addEventListener("input",()=>{
      const v=tx.value.trim();
      const ok=/^#[0-9a-fA-F]{6}$/.test(v);
      tx.classList.toggle("bad", !ok);
      const col=box.querySelector(`[data-p="${k}"]`);
      if(ok){ if(col) col.value=v; setParam(k, v, false); }
    });
    tx.addEventListener("change",()=>{
      const v=tx.value.trim();
      if(/^#[0-9a-fA-F]{6}$/.test(v)){ tx.classList.remove("bad"); setParam(k, v, true); }
      else{ const d=defOf(k); tx.value=coerceParam(d,p.params[k]); tx.classList.remove("bad"); }
    });
  });
  /* 「▶ 试运行」：开启交互态并把焦点送回画布（Esc 才好用） */
  const runBtn=$("#runPart");
  if(runBtn) runBtn.onclick=()=>{ setInteractive(true); canvas.focus(); };
  /* 名称行：双击改名 */
  const nm=$("#partName");
  if(nm) nm.addEventListener("dblclick",e=>{ e.stopPropagation(); startPartRename(p); });

  /* 折叠区开合记忆：不重建面板，只存值 */
  box.querySelectorAll("details.sec").forEach(dt=>{
    const id = dt.dataset.sec || (dt.querySelector("summary")||{}).textContent;
    dt.addEventListener("toggle", ()=>rememberSec(id, dt.open));
  });
}
/* 对齐后把数值框同步成实际值 —— 不重建面板，只改 value */
function syncGeomInputs(p){
  const box=$("#inspector"); if(!box) return;
  ["x","y","w","h"].forEach(g=>{
    const inp=box.querySelector(`[data-g="${g}"]`);
    if(inp && document.activeElement!==inp) inp.value=Math.round(p[g]);
  });
}

/* ============================================================
   C4 ③1 右栏宽度可拖拽
   —— 直接改 .cols 的第三列（grid-template-columns），不用 ResizeObserver：
      这里的尺寸是「用户设定值」，没有外部因素会改它，观察自己写的值只会绕圈
      （MDN ResizeObserver 页明确说：回调里改尺寸可能触发
       "ResizeObserver loop completed with undelivered notifications"，
       解法是 rAF 或「期望尺寸」比对 —— 而我们连观察都不需要）。
   —— 宽度存 localStorage，下次进入保持；双击拖拽条恢复默认 248。
   ============================================================ */
const RIGHT_W_KEY = "arsenal-canvas:right-w";
const RIGHT_W_DEFAULT = 248, RIGHT_W_MIN = 200, RIGHT_W_MAX = 620;
let rightW = RIGHT_W_DEFAULT;
function applyRightW(w, save2){
  rightW = Math.round(clamp(w, RIGHT_W_MIN, RIGHT_W_MAX));
  if(colsEl && !colsEl.classList.contains("ins-hidden")){
    colsEl.style.gridTemplateColumns = `228px minmax(0,1fr) ${rightW}px`;
  }
  // 折叠态下也要记住用户宽度，展开时再用；所以存的是 rightW 而不是当前列宽
  if(save2){ try{ localStorage.setItem(RIGHT_W_KEY, String(rightW)); }catch(e){} }
}
function loadRightW(){
  try{ const v=parseInt(localStorage.getItem(RIGHT_W_KEY)||"",10); if(isFinite(v)) applyRightW(v,false); }catch(e){}
}
/* 折叠/展开时要把用户宽度重新套上去（.ins-hidden 会覆盖成 20px） */
const _setInspectorOpen = setInspectorOpen;
setInspectorOpen = function(open){
  _setInspectorOpen(open);
  const on = !!open || insPinned;
  if(colsEl){
    if(on) colsEl.style.gridTemplateColumns = `228px minmax(0,1fr) ${rightW}px`;
    else colsEl.style.removeProperty("grid-template-columns");
  }
};

const insResizer = $("#insResizer");
if(insResizer){
  insResizer.addEventListener("pointerdown", e=>{
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX, startW = rightW;
    colsEl.classList.add("resizing");
    insResizer.classList.add("dragging");
    try{ insResizer.setPointerCapture(e.pointerId); }catch(err){}
    const mv = ev=>{ applyRightW(startW - (ev.clientX - startX), false); };
    const up = ()=>{
      insResizer.removeEventListener("pointermove", mv);
      insResizer.removeEventListener("pointerup", up);
      colsEl.classList.remove("resizing");
      insResizer.classList.remove("dragging");
      applyRightW(rightW, true);            // 松手才落盘，拖的过程中不写 localStorage
    };
    insResizer.addEventListener("pointermove", mv);
    insResizer.addEventListener("pointerup", up);
  });
  insResizer.addEventListener("dblclick", ()=>{ applyRightW(RIGHT_W_DEFAULT, true); toast("检查器宽度已恢复默认"); });
}
loadRightW();

/* ============================================================
   C4 ③4 右键菜单
   —— 组件上右键：复制 / 粘贴 / 删除 / 置顶 / 置底 / 上移 / 下移 / 编组
   —— 空白处右键：粘贴 / 全选 / 适应画布 / 缩放 100%
   —— 位置做「贴边翻转」：菜单比视口底部还低就往上弹，避免被裁掉。
   ============================================================ */
const ctxMenu = $("#ctxMenu");
let ctxTarget = null;
function closeCtx(){ if(ctxMenu){ ctxMenu.hidden = true; ctxMenu.innerHTML=""; } ctxTarget=null; }
function ctxItem(label, hint, fn, opt){
  const b=document.createElement("button");
  b.type="button"; b.setAttribute("role","menuitem");
  b.innerHTML = `<span>${esc(label)}</span>` + (hint?`<span class="k">${esc(hint)}</span>`:"");
  if(opt&&opt.disabled) b.disabled=true;
  if(opt&&opt.danger) b.classList.add("danger");
  b.onclick = ()=>{ closeCtx(); try{ fn(); }catch(e){ console.warn(e); } };
  return b;
}
function ctxSep(){ const d=document.createElement("div"); d.className="sep"; return d; }
function openCtx(x, y, part){
  if(!ctxMenu) return;
  ctxTarget = part || null;
  ctxMenu.innerHTML="";
  const sc = curScreen();
  if(part){
    selectPart(part.id);
    ctxMenu.appendChild(ctxItem("复制", "Ctrl+C", ()=>copySel()));
    ctxMenu.appendChild(ctxItem("粘贴", "Ctrl+V", ()=>pastePart(), {disabled:!clipPart && !hasClip()}));
    ctxMenu.appendChild(ctxItem("原地复制", "Ctrl+D", ()=>duplicateSel()));
    ctxMenu.appendChild(ctxItem("删除", "Del", ()=>deleteSel(), {danger:true}));
    ctxMenu.appendChild(ctxSep());
    ctxMenu.appendChild(ctxItem("置顶", "", ()=>layerCtx(part,"top")));
    ctxMenu.appendChild(ctxItem("置底", "", ()=>layerCtx(part,"bottom")));
    ctxMenu.appendChild(ctxItem("上移一层", "", ()=>layerCtx(part,"up")));
    ctxMenu.appendChild(ctxItem("下移一层", "", ()=>layerCtx(part,"down")));
    ctxMenu.appendChild(ctxSep());
    ctxMenu.appendChild(ctxItem("编组", "", ()=>groupSel(part)));
    ctxMenu.appendChild(ctxItem("重命名", "", ()=>startPartRename(part)));
  }else{
    ctxMenu.appendChild(ctxItem("粘贴", "Ctrl+V", ()=>pastePart(), {disabled:!clipPart && !hasClip()}));
    ctxMenu.appendChild(ctxItem("全选", "Ctrl+A", ()=>selectAllParts()));
    ctxMenu.appendChild(ctxSep());
    ctxMenu.appendChild(ctxItem("适应画布", "F", ()=>fitScale()));
    ctxMenu.appendChild(ctxItem("缩放 100%", "0", ()=>setScale(1)));
  }
  ctxMenu.hidden = false;
  // 先显示再量尺寸：hidden 状态下 getBoundingClientRect 全是 0
  const r = ctxMenu.getBoundingClientRect();
  const left = Math.min(x, window.innerWidth - r.width - 8);
  const top  = (y + r.height > window.innerHeight - 8) ? Math.max(8, y - r.height) : y;
  ctxMenu.style.left = Math.max(8, left) + "px";
  ctxMenu.style.top  = top + "px";
}
function hasClip(){ return !!clipPart; }
function layerCtx(p, k){
  const sc=curScreen(); if(!sc) return;
  const i=sc.parts.findIndex(x=>x.id===p.id); if(i<0) return;
  const arr=sc.parts;
  if(k==="up" && i<arr.length-1){ arr.splice(i,1); arr.splice(i+1,0,p); }
  else if(k==="down" && i>0){ arr.splice(i,1); arr.splice(i-1,0,p); }
  else if(k==="top"){ arr.splice(i,1); arr.push(p); }
  else if(k==="bottom"){ arr.splice(i,1); arr.unshift(p); }
  else return;
  save(); renderCanvas();
}
/* 编组：把「同屏内与它重叠面积 > 0 的其它组件」打包成一个组，
   组信息写进 p.group（同组成员共享同一个 group id）。
   —— 不做真正的「组对象」：那需要改选中的整套语义（点一个选中整组、组内再点选中单体），
      改动面太大，而 80% 的诉求是「记住这几个是一伙的，拖动时一起动」。
      当前实现是「打标签 + 拖动联动」。 */
function groupSel(p){
  const sc=curScreen(); if(!sc) return;
  const gid = "g"+Math.random().toString(36).slice(2,7);
  const members = sc.parts.filter(q=>q.id!==p.id && overlap(q,p));
  if(!members.length){ toast("附近没有可以编组的组件"); return; }
  p.group=gid; members.forEach(q=>q.group=gid);
  save(); toast(`已编组 ${members.length+1} 个组件`);
}
function overlap(a,b){
  return a.x < b.x+b.w && b.x < a.x+a.w && a.y < b.y+b.h && b.y < a.y+a.h;
}
function selectAllParts(){
  const sc=curScreen(); if(!sc) return;
  // 单选模型下「全选」退化为「选中第一个 + 提示」：多选需要改整套 selId 语义，
  // 这里不做半成品，明确告知用户当前只支持单选。
  if(sc.parts.length) selectPart(sc.parts[sc.parts.length-1].id);
  toast("当前为单选模型：已选中最上层组件");
}
/* 全局：右键 / 关菜单 */
document.addEventListener("contextmenu", e=>{
  const part = e.target.closest && e.target.closest(".part");
  if(part){
    e.preventDefault();
    const p = partById(part.dataset.id);
    if(interactive) setInteractive(false);       // 交互态下右键 = 先退回编辑态
    openCtx(e.clientX, e.clientY, p);
    return;
  }
  if(e.target === canvas || (e.target.closest && e.target.closest("#canvasWrap"))){
    e.preventDefault();
    openCtx(e.clientX, e.clientY, null);
    return;
  }
  closeCtx();
});
document.addEventListener("pointerdown", e=>{
  if(ctxMenu && !ctxMenu.hidden && !e.target.closest("#ctxMenu")) closeCtx();
}, true);
window.addEventListener("blur", closeCtx);

/* ============================================================
   Tidy：按类型归位（用屏幕真实 w/h）
   ============================================================ */
function tidy(){
  const s=curScreen();let y=12;
  s.parts.forEach(p=>{
    if(p.type==="appBar"||p.type==="tabBar"){p.x=0;p.y=0;p.w=s.w;p.h=56;return;}
    if(p.type==="navBar"){p.x=0;p.y=s.h-64;p.w=s.w;p.h=64;return;}
    if(p.type==="fab"){p.x=s.w-72;p.y=s.h-84;p.w=56;p.h=56;return;}
    if(p.type==="dialog"){p.x=s.w/2-150;p.y=s.h/2-90;p.w=300;p.h=180;return;}
    p.x=12;p.y=y;p.w=p.w||(s.w-24);y+=Math.max(p.h,40)+12;
  });
  save();renderAll();
}

/* ============================================================
   购物车互通：与首页共用 arsenal-cart（素材 id 数组）
   用购物车生成 = 把购物车里的素材铺到当前屏幕
   全部存入购物车 = 把画布上所有动效素材收回到购物车
   ============================================================ */
function loadCart(){ try{ const a=JSON.parse(localStorage.getItem("arsenal-cart")||"[]"); return Array.isArray(a)?a:[]; }catch(e){ return []; } }
function saveCart(arr){ try{ localStorage.setItem("arsenal-cart", JSON.stringify(arr)); }catch(e){} }
/* 购物车计数：菜单里一处 + 工具栏按钮上带出来（否则收进菜单就看不见了，
   用户会以为「存入书架」和购物车无关） */
function renderCartInfo(){
  const n = loadCart().length;
  const el = $("#cartN"); if(el) el.textContent = n;
  const btn = $("#shelfBtn"); if(btn) btn.textContent = "存入书架" + (n ? " ("+n+")" : "") + " ▾";
}
function cartToCanvas(){
  const cart=loadCart();
  if(!cart.length){ alert("购物车是空的 —— 先在素材库点 ☆ 选几个素材，或在首页「已选素材」里挑。"); return; }
  const effById={}; effectParts().forEach(m=>effById[m.id]=m);
  const cur=curScreen();
  const exist=new Set(cur.parts.filter(p=>p.eid).map(p=>p.eid));
  let n=0;
  cart.forEach(id=>{
    if(exist.has(id)) return;
    const m=effById[id]; if(!m) return;            // 购物车里有已下架素材则跳过
    const p=basePart("__effect",{},true); p.demo=m.demo; p.label=m.label; p.eid=m.id;
    cur.parts.push(p); n++; exist.add(id);
  });
  if(n===0){ alert("购物车里的素材都已经在当前画布上了。"); return; }
  save(); renderAll();
  flashMenuLabel($("#cartTo"), "已生成 "+n+" 个", "用购物车生成当前屏");
}
function allToCart(){
  const cart=new Set(loadCart());
  let n=0;
  CVS.screens.forEach(s=>{
    s.parts.forEach(p=>{
      // 老数据可能只有 demo 路径、没有 eid：按路径反查（数据层负责规则，此处不再每次重建整张动效表）
      const id=p.eid || ((window.Repo && Repo.findMaterialByDemo) ? (Repo.findMaterialByDemo(p.demo)||{}).id : (effectParts().find(m=>m.demo===p.demo)||{}).id);
      if(id && !cart.has(id)){ cart.add(id); n++; }
    });
  });
  saveCart([...cart]); renderCartInfo();
  flashMenuLabel($("#allToCart"), "已存入 "+n+" 个", "画布素材全部存入购物车");
}
/* 菜单项的「反馈闪一下」：原按钮在工具栏上，改成菜单后需要自己回滚文案 */
function flashMenuLabel(btn, msg, back){
  if(!btn) return;
  const origin = back || btn.textContent;
  btn.textContent = msg;
  clearTimeout(btn._flashT);
  btn._flashT = setTimeout(()=>{ btn.textContent = origin; }, 1600);
}

/* ============================================================
   提示词导出（多屏 + 行为 + 主题，坐标用屏幕真实 w/h）
   ============================================================ */
function buildPrompt(){
  const t=CVS.theme;
  let out="请用前端代码（HTML/CSS/JS 或对应框架）实现以下界面设计，要求高保真还原布局、主题与交互。\n\n";
  out+=`【主题】主色 ${t.seed}；圆角 ${t.radius}px；字体 ${t.font}；动效 ${t.motion==="340ms"?"标准":"表现力弹簧"}。\n`;
  out+=`【配色变量】primary=${t.seed}；surface=#fff；surface-variant=${getComputedStyle(document.documentElement).getPropertyValue("--c-surface-variant").trim()}；outline=${getComputedStyle(document.documentElement).getPropertyValue("--c-outline").trim()}。\n\n`;
  CVS.screens.forEach(s=>{
    out+=`■ 屏幕「${s.name}」（${s.kind==="phone"?"手机 "+s.w+"×"+s.h:"桌面 "+s.w+"×"+s.h}）\n`;
    s.parts.forEach(p=>{
      const def=partDef(p);
      const px=Math.round(p.x/s.w*100),py=Math.round(p.y/s.h*100),pw=Math.round(p.w/s.w*100),ph=Math.round(p.h/s.h*100);
      const txt=def?(def.prompt?def.prompt(p.props||{}):p.type):(p.label||"动效组件");
      let line=`  - ${txt}（位置 左${px}% 上${py}%，尺寸 ${pw}%×${ph}%）`;
      if(p.behavior&&p.behavior.target){const ts=p.behavior.target==="back"?"返回":(CVS.screens.find(x=>x.id===p.behavior.target)||{}).name;line+=`；点击跳转到「${ts}」，过渡=${p.behavior.transition}`;}
      out+=line+"\n";
    });
    out+="\n";
  });
  return out;
}

/* ============================================================
   预览：真点跳转
   ============================================================ */
function openPreview(){
  const frame=$("#previewFrame");const s=curScreen();
  frame.style.width=s.w+"px";frame.style.height=s.h+"px";
  renderPreviewScreen(frame,s.id);
  $("#previewBox").classList.add("on");
}
function renderPreviewScreen(frame,sid){
  const s=CVS.screens.find(x=>x.id===sid);if(!s)return;
  frame.dataset.sid=sid;
  frame.innerHTML=`<div style="position:relative;width:100%;height:100%;background:var(--c-surface);overflow:hidden">`+
    s.parts.map(p=>{
      const def=partDef(p);
      return `<div style="position:absolute;left:${p.x}px;top:${p.y}px;width:${p.w}px;height:${p.h}px;${p.behavior&&p.behavior.target?'cursor:pointer':''}" data-pid="${p.id}">${def?def.render(p.props||{},CVS.theme):""}</div>`;
    }).join("")+`</div>`;
  frame.querySelectorAll("[data-pid]").forEach(d=>{
    const p=s.parts.find(x=>x.id===d.dataset.pid);
    if(p&&p.behavior&&p.behavior.target){
      d.onclick=()=>{const tid=p.behavior.target;if(tid==="back"){history.back();return;}renderPreviewScreen(frame,tid);};
    }
  });
}

/* ============================================================
   缩放控制（防御 NaN/Infinity/非正数）
   ============================================================ */
function setScale(z){
  const nz=isFinite(z)&&z>0?clamp(z,0.2,3):1;
  viewScale=nz; applyZoom();
}
function fitScale(){
  const s=curScreen();if(!s){setScale(1);return;}
  const sw=finite(s.w,0), sh=finite(s.h,0);
  const cw=finite(stage.clientWidth,0), ch=finite(stage.clientHeight,0);
  if(!sw||!sh||!cw||!ch){setScale(1);return;}
  const pad=56;
  const z=Math.min((cw-pad)/sw,(ch-pad)/sh,1);
  setScale(Math.max(0.2,z));
}

/* ============================================================
   事件绑定
   ============================================================ */
/* 新屏命名按类型独立计数：桌面→屏幕1/2/3；手机→手机1/2
   取同类现有最大编号 +1，删掉「屏幕2」后再建不会重名，两个序列互不影响 */
function nextName(kind){
  const prefix=kind==="phone"?"手机":"屏幕";
  const re=new RegExp("^"+prefix+"(\\d+)$");
  let max=0;
  CVS.screens.forEach(s=>{const m=re.exec(s.name||"");if(m)max=Math.max(max,+m[1]);});
  return prefix+(max+1);
}
function newScreen(kind){
  const id="s"+Date.now().toString(36)+Math.random().toString(36).slice(2,4);
  CVS.screens.push({id,name:nextName(kind),kind,w:SIZE[kind].w,h:SIZE[kind].h,bg:"#fff",parts:[]});
  CVS.active=id;selId=null;save();renderAll();
}
function enterCanvas(){$("#welcome").hidden=true;renderAll();tryFit();}
$("#addScreen").onclick=()=>newScreen("desktop");
$("#addPhone").onclick=()=>newScreen("phone");
$("#pickDesktop").onclick=()=>{newScreen("desktop");enterCanvas();};
$("#pickPhone").onclick=()=>{newScreen("phone");enterCanvas();};
$("#pickResume").onclick=enterCanvas;
$("#tidy").onclick=tidy;
$("#preview").onclick=openPreview;
/* 显式保存：工具栏按钮 + Ctrl+S 共用同一个入口，行为一致 */
function saveNow(){
  save();                                   // 走正常写入口，顺带进撤销栈（内容没变时自动不占格）
  toast("已保存到本地");
}
$("#cvTitle").addEventListener("click", startTitleEdit);
$("#saveBtn").onclick=saveNow;
$("#closePreview").onclick=()=>$("#previewBox").classList.remove("on");
$("#copyPrompt").onclick=()=>{$("#promptText").value=buildPrompt();$("#promptModal").classList.add("on");};
$("#closePrompt").onclick=()=>$("#promptModal").classList.remove("on");
$("#doCopy").onclick=()=>{
  const ta=$("#promptText");ta.focus();ta.select();
  const done=()=>{$("#doCopy").textContent="已复制";setTimeout(()=>$("#doCopy").textContent="复制",1400);};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(ta.value).then(done,()=>{try{document.execCommand("copy");done();}catch(e){}});}
  else{try{document.execCommand("copy");done();}catch(e){}}
};
$("#clearAll").onclick=()=>{ if(!curScreen()||!curScreen().parts.length){ alert("当前屏幕已经是空的。"); return; } if(confirm("清空当前屏幕所有组件？")){curScreen().parts=[];selId=null;insPinned=false;save();renderAll();} };
$("#cartTo").onclick=()=>{ closeMenus(); cartToCanvas(); };
$("#allToCart").onclick=()=>{ closeMenus(); allToCart(); };
$("#kbdOpen").onclick=()=>{ closeMenus(); toggleHelp(true); };
$("#undoBtn").onclick=()=>{ closeMenus(); if(!undo()) toast("已经是最早一步"); };
$("#redoBtn").onclick=()=>{ closeMenus(); if(!redo()) toast("没有可重做的步骤"); };

/* 顶栏两个下拉菜单：点按钮开合、点菜单外关闭、Esc 关闭。
   用 hidden 属性控制显隐（而不是只切 class），无 CSS 时也不会漏出菜单内容。 */
function menuToggle(btn, menu){
  if(!btn || !menu) return;
  btn.addEventListener("click", e=>{
    e.stopPropagation();
    const willOpen = menu.hidden;
    closeMenus();
    menu.hidden = !willOpen;
    btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });
  menu.addEventListener("click", e=>e.stopPropagation());
}
function closeMenus(){
  [$("#shelfMenu"), $("#moreMenu")].forEach(m=>{ if(m) m.hidden = true; });
  [$("#shelfBtn"), $("#moreBtn")].forEach(b=>{ if(b) b.setAttribute("aria-expanded","false"); });
}
menuToggle($("#shelfBtn"), $("#shelfMenu"));
menuToggle($("#moreBtn"), $("#moreMenu"));
document.addEventListener("click", closeMenus);
$("#thSeed").oninput=e=>{CVS.theme.seed=e.target.value;applyTheme();save({merge:"theme"});};
$("#thRadius").oninput=e=>{CVS.theme.radius=+e.target.value;$("#thRadiusV").textContent=e.target.value;applyTheme();save({merge:"theme"});};
$("#thFont").onchange=e=>{CVS.theme.font=e.target.value;applyTheme();save();};
$("#thMotion").onchange=e=>{CVS.theme.motion=e.target.value;applyTheme();save();};
$("#zoomIn").onclick=()=>setScale(viewScale+0.1);
$("#zoomOut").onclick=()=>setScale(viewScale-0.1);
$("#zoomReset").onclick=()=>setScale(1);
$("#zoomFit").onclick=fitScale;
/* ============================================================
   视图操作：滚轮缩放（锚定光标）+ 拖拽平移 + 快捷键
   ============================================================ */
let panSpace = false;      // 按住空格 = 临时平移
let panState = null;

function overlayOpen(){
  return $("#previewBox").classList.contains("on")
      || $("#promptModal").classList.contains("on")
      || $("#kbdHelp").classList.contains("on")
      || !$("#welcome").hidden;
}
function typingInField(t){
  return !!t && (t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable);
}

/* 以 (px,py) 为不动点缩放：缩放前记下鼠标下的内容坐标，缩放后用滚动条把它挪回鼠标下 */
function zoomAtPoint(px,py,factor){
  if(!curScreen()) return;
  const nz=clamp(viewScale*factor,0.2,3);
  if(Math.abs(nz-viewScale)<1e-4) return;
  const b=canvas.getBoundingClientRect();
  const cx=(px-b.left)/viewScale, cy=(py-b.top)/viewScale;
  setScale(nz);
  const a=canvas.getBoundingClientRect();
  stage.scrollLeft += (a.left + cx*viewScale) - px;
  stage.scrollTop  += (a.top  + cy*viewScale) - py;
}

/* 滚轮缩放：不用 Ctrl，直接滚（画布页滚轮本来也没什么可滚的） */
stage.addEventListener("wheel", e=>{
  if(overlayOpen() || !curScreen()) return;
  e.preventDefault();
  zoomAtPoint(e.clientX, e.clientY, Math.pow(1.0015, -e.deltaY));
}, {passive:false});

/* 平移：拖画布空白处 / 按住空格拖任意处 / 中键拖 */
stage.addEventListener("pointerdown", e=>{
  if(overlayOpen() || !curScreen()) return;
  const onEmpty = e.target===stage || e.target===canvasWrap || e.target===canvas;
  if(!onEmpty && !panSpace) return;
  if(e.button!==0 && e.button!==1) return;
  panState={x:e.clientX, y:e.clientY, sl:stage.scrollLeft, st:stage.scrollTop};
  stage.classList.add("panning");
  try{ stage.setPointerCapture(e.pointerId); }catch(_){}
  e.preventDefault();
});
stage.addEventListener("pointermove", e=>{
  if(!panState) return;
  stage.scrollLeft = panState.sl - (e.clientX - panState.x);
  stage.scrollTop  = panState.st - (e.clientY - panState.y);
});
["pointerup","pointercancel"].forEach(t=>stage.addEventListener(t, ()=>{
  if(!panState) return;
  panState=null; stage.classList.remove("panning");
}));

/* 组件快捷键的实现 */
function deleteSel(){
  const s=curScreen(), p=partById(selId);
  if(!s||!p) return;
  s.parts=s.parts.filter(x=>x.id!==p.id); selId=null; save(); renderAll();
}
function duplicateSel(){
  const s=curScreen(), p=partById(selId);
  if(!s||!p) return;
  const c=JSON.parse(JSON.stringify(p)); c.id=uid();
  c.x=clamp(p.x+16,0,s.w-c.w); c.y=clamp(p.y+16,0,s.h-c.h);
  s.parts.push(c); selId=c.id; save(); renderAll();
}
function nudge(dx,dy){
  const s=curScreen(), p=partById(selId);
  if(!s||!p) return;
  p.x=clamp(p.x+dx,0,s.w-p.w); p.y=clamp(p.y+dy,0,s.h-p.h);
  save({merge:"nudge"}); renderCanvas();   // 连按方向键合并成一格历史
}

/* 剪贴板：应用内一份（跨屏幕可粘），同时尽力写系统剪贴板做外部互通。
   不依赖异步 readText —— file:// 下权限常常不给，应用内副本才是可靠路径。 */
let clipPart = null;
function copySel(){
  const p=partById(selId); if(!p) return false;
  clipPart=JSON.parse(JSON.stringify(p));
  try{ if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(JSON.stringify(clipPart)).catch(()=>{}); }catch(e){}
  toast("已复制组件");
  return true;
}
function pastePart(){
  const s=curScreen(); if(!s) return false;
  if(!clipPart) { toast("剪贴板里还没有组件 —— 先选中一个按 Ctrl+C"); return false; }
  const c=JSON.parse(JSON.stringify(clipPart)); c.id=uid();
  c.x=clamp(c.x+16,0,Math.max(0,s.w-c.w)); c.y=clamp(c.y+16,0,Math.max(0,s.h-c.h));
  s.parts.push(c); selId=c.id; save(); renderAll();
  toast("已粘贴组件");
  return true;
}
/* 轻提示：不打断操作（比 alert 合适，粘贴/复制是高频动作） */
let toastEl=null, toastT=null;
function toast(msg){
  if(!toastEl){
    toastEl=document.createElement("div");
    toastEl.className="toast";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent=msg;
  toastEl.classList.add("on");
  clearTimeout(toastT);
  toastT=setTimeout(()=>toastEl.classList.remove("on"),1300);
}
/* 购物车在别的标签页/首页变更时同步按钮上的计数（首页用同一把 localStorage 钥匙） */
window.addEventListener("storage", e=>{ if(e.key==="arsenal-cart") renderCartInfo(); });
function toggleHelp(force){
  const box=$("#kbdHelp");
  const on = force===undefined ? !box.classList.contains("on") : !!force;
  box.classList.toggle("on", on);
}
$("#kbdClose").onclick=()=>toggleHelp(false);
$("#kbdHelp").addEventListener("click", e=>{ if(e.target===$("#kbdHelp")) toggleHelp(false); });

document.addEventListener("keydown", e=>{
  if(e.isComposing) return;                         // 输入法组合态不抢键（规矩 32 ④）
  if(e.key==="Escape"){
    // C4 ②：交互态优先于「取消选中」——它在视觉上是一层更外层的模式
    if(interactive){ setInteractive(false); toast("已退出交互态"); return; }
    const hadOverlay = $("#previewBox").classList.contains("on")
      || $("#promptModal").classList.contains("on")
      || $("#kbdHelp").classList.contains("on")
      || !$("#shelfMenu").hidden || !$("#moreMenu").hidden;
    $("#previewBox").classList.remove("on");
    $("#promptModal").classList.remove("on");
    toggleHelp(false);
    closeMenus();
    // 没有弹层要关时，Esc = 取消选中（顺带把检查器收回）——与「点空白处」同义
    if(!hadOverlay && !typingInField(e.target)) deselect();
    return;
  }
  // Ctrl/⌘+S 必须抢在 typingInField 之前：在输入框里按也应该保存，
  // 而且不 preventDefault 会弹浏览器「另存为网页」——那是 file:// 下最烦人的误触。
  if((e.ctrlKey||e.metaKey) && (e.key==="s"||e.key==="S")){
    e.preventDefault(); saveNow(); return;
  }
  if(typingInField(e.target)) return;               // 输入框/textarea/contenteditable 里打字不触发快捷键
  if(e.key===" "){ if(!e.repeat){ panSpace=true; e.preventDefault(); } return; }
  if(overlayOpen()) return;
  const mod=e.ctrlKey||e.metaKey, k=e.key;
  /* 撤销 / 重做：必须排在 typingInField 之后、其它 mod 快捷键之前，
     这样在输入框里的 Ctrl+Z 走浏览器原生（不误伤画布历史）。 */
  if(mod && (k==="z"||k==="Z")){ if(e.shiftKey) redo(); else undo(); e.preventDefault(); return; }
  if(mod && (k==="y"||k==="Y")){ redo(); e.preventDefault(); return; }
  if(mod && (k==="d"||k==="D")){ duplicateSel(); e.preventDefault(); return; }
  if(mod && (k==="c"||k==="C")){ if(copySel()) e.preventDefault(); return; }
  if(mod && (k==="v"||k==="V")){ if(pastePart()) e.preventDefault(); return; }
  if(mod) return;
  if(k==="?"||k==="h"||k==="H"){ toggleHelp(); e.preventDefault(); return; }
  if(k==="Delete"||k==="Backspace"){ deleteSel(); e.preventDefault(); return; }
  if(k==="+"||k==="="){ setScale(viewScale*1.12); e.preventDefault(); return; }
  if(k==="-"||k==="_"){ setScale(viewScale/1.12); e.preventDefault(); return; }
  if(k==="0"){ setScale(1); e.preventDefault(); return; }
  if(k==="f"||k==="F"){ fitScale(); e.preventDefault(); return; }
  if(k==="p"||k==="P"){ openPreview(); e.preventDefault(); return; }
  if(k==="r"||k==="R"){ toggleInteractive(); e.preventDefault(); return; }   // C4 ②
  const step=e.shiftKey?8:1;                        // Shift 大步 = 8px（原 10px，与 4px 网格对齐）
  if(k==="ArrowLeft"){ nudge(-step,0); e.preventDefault(); }
  else if(k==="ArrowRight"){ nudge(step,0); e.preventDefault(); }
  else if(k==="ArrowUp"){ nudge(0,-step); e.preventDefault(); }
  else if(k==="ArrowDown"){ nudge(0,step); e.preventDefault(); }
});
document.addEventListener("keyup", e=>{ if(e.key===" ") panSpace=false; });
window.addEventListener("blur", ()=>{ panSpace=false; panState=null; stage.classList.remove("panning"); });

/* ============================================================
   启动
   ============================================================ */
function renderAll(){
  /* C5 ①：整屏重绘（切屏 / 撤销 / 恢复快照）前先把半截的原地编辑收尾，
     否则编辑中的 DOM 会被整块换掉，用户刚打的字凭空消失。 */
  if(editing) commitInlineEdit();
  applyTheme();renderTitle();renderScreens();renderCanvas();renderInspector();renderCartInfo();syncHash();
  // 切屏 / 删除后 selId 会被清空，这里统一把右栏的状态跟选中同步一次
  setInspectorOpen(!!partById(selId));
}
renderPalette();
readHash();          // 地址栏里带着屏就打开那一屏（规矩 32 ②）
resetHistory();      // 打基线：第一次 Ctrl+Z 回到「刚打开」的状态
renderAll();
/* 浏览器前进后退 / 手工改 hash → 跟着切屏 */
window.addEventListener("hashchange", ()=>{
  if(readHash()) renderAll();
});
/* 每次打开都先问类型；已有画布时额外给一个「继续上次」入口 */
function showWelcome(){
  const cur=curScreen();
  $("#pickResume").hidden=!cur;
  if(cur) $("#pickResume").textContent="继续上次的画布（"+cur.name+"）";
  $("#welcome").hidden=false;
}
showWelcome();
/* 首次进入自动适应，若 stage 尚未 layout 则多试几次 */
function tryFit(retries=5){
  if(retries<=0){setScale(1);return;}
  if(stage.clientWidth>0&&stage.clientHeight>0){fitScale();return;}
  setTimeout(()=>tryFit(retries-1),60);
}
tryFit();
