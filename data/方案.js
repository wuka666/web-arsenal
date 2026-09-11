// Web 灵感弹药库 · 方案库（v4，2026-09-07 丰富化 + 并入 4 套）
// 20 套：14 原方案 + skeleton-01（文档）+ 新并入 s203/v131/v141/s205（原素材库 分类:"方案"）。
// 编目轴：重色落点 / 第一屏内容 / 删减元素（与作者「西瓜同学🍉」Skill 三问一致）。
// 每套 代码 为完整多区块页（导航+首屏+功能卡×3+数据墙×3+页脚），打开即感受氛围。
// 配色守 60-30-10；参数键↔CSS 变量一致；demo 支持 postMessage({type:'param',key,value}) 调参。
// 校验：node --check data/方案.js

window.WEB_SCHEMES = [
  {
    id: "skeleton-01",
    类型: "共享骨架",
    名称: "Dashboard 通用数据组件骨架",
    数据组件: [
      "告警栏",
      "容量助手",
      "行程卡",
      "导航",
      "跳转入口"
    ],
    通用布局: "左窄导航 + 顶部告警栏横跨 + 中部主内容区（容量助手为主卡）+ 右/底跳转入口",
    说明: "v3 起各方案不再共用同一骨架，改为各自独立布局原型；此条仅作文档参考。"
  },
  {
    id: "f001",
    风格名: "大色块分区",
    骨架: "大色块四宫格",
    配色: {
      "机身黑(底)": "41%",
      "珊瑚(焦点块)": "22%",
      "冰蓝": "12%",
      "长春花": "13%",
      "鼠尾草": "12%"
    },
    布局骨架: "左窄导航 + 顶部告警栏 + 中部 2×2 大色块网格（容量助手占最大珊瑚焦点块）",
    重色落点: "珊瑚焦点块独大且最跳，其余三块同明度不同色相做节奏；黑底托底不抢戏",
    第一屏内容: "告警栏（顶）+ 容量助手焦点块（最大色块=核心指标）",
    删减元素: "去细线条分隔 / 弱图标描边 / 不堆图表网格",
    适用: "维度少、要一眼分区的运营/监控大屏",
    禁忌: "信息密度高、需精确行列对照的报表",
    参考站: [
      "Raycast",
      "Height",
      "Arc",
      "Muzli 50 Best Dashboard 2026"
    ],
    我的说明: "焦点块用最大面积+最跳色做唯一视觉重心；其余块同明度不同色相，节奏统一不抢戏。",
    演示页: "assets/demos/方案-大色块分区.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·大色块分区</title>
<style>
:root{--zhucai:#FF6F61;--zhongdian:#7EC8E3;--di:#1a1a1a;--zi:#ffffff;--cizi:#b8b8b8;--yuanjiao:14px;--jianju:10px;--zihao:15px;--yinying:30;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="grid" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">大色块分区</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">进入控制台</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>智能运维中枢</h1><p class="sub">一眼掌握全局容量、行程与告警，运维不再救火</p><div class="btns"><button class="btn solid">进入控制台</button><button class="btn ghost">查看文档</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">⚡</div><h3>容量助手</h3><p>实时监测存储池用量，超标即告警</p></article>
      <article class="feat"><div class="ico">🗓</div><h3>今日行程</h3><p>巡检 / 备份 / 复盘自动排程</p></article>
      <article class="feat"><div class="ico">🔗</div><h3>跳转入口</h3><p>报表 / 任务 / 设置一触即达</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>85%</b><span>容量占用</span></div>
      <div class="stat"><b>12</b><span>在线节点</span></div>
      <div class="stat"><b>3</b><span>待处理告警</span></div>
    </section>
    <footer class="foot"><span>© 2026 大色块分区</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#FF6F61;--zhongdian:#7EC8E3;--di:#1a1a1a;--zi:#ffffff;--yuanjiao:14px;--jianju:10px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#FF6F61"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#7EC8E3"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#1a1a1a"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#ffffff"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#b8b8b8"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 10
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 30
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "西瓜同学🍉 抖音（用户授权参考）+ 逐字稿 + 截图#1（v3 配色守 60-30-10）"
  },
  {
    id: "f002",
    风格名: "图片卡片流",
    骨架: "图片卡片流",
    配色: {
      "暖白底": "82%",
      "卡片底": "12%",
      "橘色(状态标签)": "6%"
    },
    布局骨架: "左导航 + 顶部弱告警 + 中部图片卡片网格（每卡=图+图下小信息+橘色状态标签）+ 右行程侧栏",
    重色落点: "橘色只点在「状态标签」上，不铺大面——重色压状态而非分区",
    第一屏内容: "图片卡片流（视觉主体，先被图吸引，而非被数字/色块吸引）",
    删减元素: "去大色块分区 / 去大数字堆 / 信息压到图下方小字",
    适用: "媒体·作品·商品·行程展示流",
    禁忌: "纯数值报表、状态密集的后台",
    参考站: [
      "Polarsteps",
      "Wanderlog",
      "walls.io Tourism 主题"
    ],
    我的说明: "暖白大面积安静，橘色小点跳出来标状态；卡片等距网格节奏一致不抢戏。重色压「状态」而非「分区」。",
    演示页: "assets/demos/方案-图片卡片流.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·图片卡片流</title>
<style>
:root{--zhucai:#E8843C;--zhongdian:#F2C14E;--di:#FBF7F0;--zi:#2a2620;--cizi:#8a8170;--yuanjiao:16px;--jianju:14px;--zihao:15px;--yinying:18;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="left" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">图片卡片流</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">看作品</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>作品集画廊</h1><p class="sub">用图片卡片流讲清你的案例，少说话多展示</p><div class="btns"><button class="btn solid">看作品</button><button class="btn ghost">联系我</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">🖼</div><h3>精选案例</h3><p>每个项目一张大图，点开看细节</p></article>
      <article class="feat"><div class="ico">📁</div><h3>图集归档</h3><p>按系列归类，找起来不费劲</p></article>
      <article class="feat"><div class="ico">⭐</div><h3>客户评价</h3><p>真实反馈放在显眼处建立信任</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>120</b><span>已交付项目</span></div>
      <div class="stat"><b>48</b><span>合作客户</span></div>
      <div class="stat"><b>99%</b><span>客户满意</span></div>
    </section>
    <footer class="foot"><span>© 2026 图片卡片流</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#E8843C;--zhongdian:#F2C14E;--di:#FBF7F0;--zi:#2a2620;--yuanjiao:16px;--jianju:14px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#E8843C"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#F2C14E"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#FBF7F0"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#2a2620"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#8a8170"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 16
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 18
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "西瓜同学🍉 抖音（用户授权参考）+ 逐字稿 + 截图#2"
  },
  {
    id: "f003",
    风格名: "玻璃拟态风",
    骨架: "毛玻璃浮层",
    配色: {
      "淡蓝紫渐变背景": "30%",
      "毛玻璃卡片(半透明白+blur)": "60%",
      "深字": "10%"
    },
    布局骨架: "渐变背景铺满 + 毛玻璃卡片浮于其上（告警/容量助手/行程都做玻璃卡）+ 左导航半透明",
    重色落点: "渐变只铺背景，卡片靠模糊+1px 高光描边浮起——重色在「背景氛围」而非内容块",
    第一屏内容: "渐变背景 + 主玻璃卡（容量助手）直接浮在视觉中心",
    删减元素: "去实色块分隔 / 去硬边框 / 靠模糊与高光描边做层级",
    适用: "偏展示或需通透感的工具/Landing/控制台",
    禁忌: "信息极密、低性能设备（backdrop-blur 吃 GPU）",
    参考站: [
      "Frost Finance Dashboard",
      "Vaulter",
      "Sales Dashboard"
    ],
    我的说明: "渐变柔、玻璃卡靠透明浮起，层级靠模糊不靠色块；所有卡同款玻璃处理语言统一。重色在背景氛围。",
    演示页: "assets/demos/方案-玻璃拟态风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·玻璃拟态风</title>
<style>
:root{--zhucai:#8A8FE5;--zhongdian:#C9B6FF;--di:#F4F3FB;--zi:#26243a;--cizi:#7a769a;--yuanjiao:18px;--jianju:14px;--zihao:15px;--yinying:24;--faguang:20}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="center" data-glow="1">
  <div class="wrap">
    <nav class="nav"><span class="logo">玻璃拟态风</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">免费试用</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>现代 SaaS 落地</h1><p class="sub">玻璃质感 + 留白，给用户一种「高级又轻盈」的第一感</p><div class="btns"><button class="btn solid">免费试用</button><button class="btn ghost">预约演示</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">✨</div><h3>一键集成</h3><p>十分钟接好主流平台，无需写胶水代码</p></article>
      <article class="feat"><div class="ico">🔒</div><h3>安全可靠</h3><p>端到端加密，合规认证齐全</p></article>
      <article class="feat"><div class="ico">📊</div><h3>可视化</h3><p>数据看板开箱即用，决策有依据</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>10k+</b><span>活跃团队</span></div>
      <div class="stat"><b>99.9%</b><span>服务可用</span></div>
      <div class="stat"><b><50ms</b><span>平均响应</span></div>
    </section>
    <footer class="foot"><span>© 2026 玻璃拟态风</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#8A8FE5;--zhongdian:#C9B6FF;--di:#F4F3FB;--zi:#26243a;--yuanjiao:18px;--jianju:14px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#8A8FE5"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#C9B6FF"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#F4F3FB"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#26243a"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#7a769a"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 18
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 24
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 20
      }
    ],
    来源: "西瓜同学🍉 抖音（用户授权参考）+ 逐字稿 + 截图#3"
  },
  {
    id: "f004",
    风格名: "高密度卡片墙",
    骨架: "浅色数据墙",
    配色: {
      "淡紫底": "70%",
      "紫(当前态/选中)": "15%",
      "绿/黄/红 状态点": "15%"
    },
    布局骨架: "bento 多卡密排网格（告警/容量/行程/导航/跳转全压进小卡，间距紧凑）",
    重色落点: "紫只标「当前态/选中卡」，状态用绿黄红小圆点——重色压「当前态」+「状态点」",
    第一屏内容: "整屏卡片墙概览（多指标一屏尽览，先被密度吸引）",
    删减元素: "去大留白 / 去大色块 / 去长文案，全压成小卡+点",
    适用: "多指标概览大屏、运维/监控墙（浅色版）",
    禁忌: "极简风、低密度展示",
    参考站: [
      "Figma No.160 紫卡仪表盘",
      "Bento Style UI",
      "bento.me"
    ],
    我的说明: "淡紫底安静，紫卡跳当前态，彩点标状态；卡片同规格密排栅格节奏统一。重色压「当前态+状态点」。",
    演示页: "assets/demos/方案-高密度卡片墙.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·高密度卡片墙</title>
<style>
:root{--zhucai:#4CC9B0;--zhongdian:#FFD166;--di:#121821;--zi:#eaf0f5;--cizi:#9fb0c0;--yuanjiao:12px;--jianju:10px;--zihao:14px;--yinying:22;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="grid" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">高密度卡片墙</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">打开看板</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>数据仪表盘</h1><p class="sub">高密度不等于乱——用卡片墙把信息分层摆清楚</p><div class="btns"><button class="btn solid">打开看板</button><button class="btn ghost">导出报表</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">📈</div><h3>趋势卡</h3><p>关键指标走势一屏看全</p></article>
      <article class="feat"><div class="ico">🧩</div><h3>模块卡</h3><p>按业务域拆分，各管各的</p></article>
      <article class="feat"><div class="ico">🔔</div><h3>状态卡</h3><p>异常自动浮顶，优先处理</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>256</b><span>监控指标</span></div>
      <div class="stat"><b>18</b><span>业务域</span></div>
      <div class="stat"><b>5</b><span>实时告警</span></div>
    </section>
    <footer class="foot"><span>© 2026 高密度卡片墙</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#4CC9B0;--zhongdian:#FFD166;--di:#121821;--zi:#eaf0f5;--yuanjiao:12px;--jianju:10px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#4CC9B0"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#FFD166"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#121821"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#eaf0f5"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#9fb0c0"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 10
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 22
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "西瓜同学🍉 抖音（用户授权参考）+ 逐字稿 + 截图#4"
  },
  {
    id: "f006",
    风格名: "杂志排版风",
    骨架: "杂志栅格",
    配色: {
      "淡蓝灰": "44%",
      "近白纸": "50%",
      "高饱和点缀(kicker)": "6%"
    },
    布局骨架: "双底色分栏（淡蓝灰/近白）+ 强字体层级（大衬线标题+小无衬线正文）+ 栏宽克制 + 大留白",
    重色落点: "高饱和色只点 kicker 一处，重色压「字体层级与栏目」而非色块",
    第一屏内容: "大标题 + 导语（杂志式跨页），先被排版节奏吸引而非颜色",
    删减元素: "去色块 / 去卡片描边 / 去状态点，靠字体大小·字重·栏宽做层级",
    适用: "内容/文章/品牌向展示、重阅读体验的页面",
    禁忌: "数据密集后台、需快速扫数的监控",
    参考站: [
      "Ribbit",
      "Floating Pill Navbar",
      "Cereal"
    ],
    我的说明: "淡蓝灰/近白双底安静，kicker 一点高饱和；字体层级规律统一（标题/副标/正文）。重色压「字体层级+栏目」。",
    演示页: "assets/demos/方案-杂志排版风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·杂志排版风</title>
<style>
:root{--zhucai:#C0392B;--zhongdian:#1a1a1a;--di:#FBF6EE;--zi:#1f1b16;--cizi:#7d7464;--yuanjiao:6px;--jianju:12px;--zihao:15px;--yinying:10;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="left" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">杂志排版风</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">订阅周刊</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>编辑部</h1><p class="sub">杂志式排版，用网格与留白让长文也读得下去</p><div class="btns"><button class="btn solid">订阅周刊</button><button class="btn ghost">投稿</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">📰</div><h3>头条栏目</h3><p>大标题 + 导语，定调本期重点</p></article>
      <article class="feat"><div class="ico">📝</div><h3>深度长读</h3><p>多栏正文，配图与引文穿插</p></article>
      <article class="feat"><div class="ico">🏷</div><h3>专题标签</h3><p>按话题聚合，方便追更</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>36</b><span>在更栏目</span></div>
      <div class="stat"><b>210</b><span>深度稿</span></div>
      <div class="stat"><b>4.2万</b><span>月读读者</span></div>
    </section>
    <footer class="foot"><span>© 2026 杂志排版风</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#C0392B;--zhongdian:#1a1a1a;--di:#FBF6EE;--zi:#1f1b16;--yuanjiao:6px;--jianju:12px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#C0392B"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#1a1a1a"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#FBF6EE"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#1f1b16"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#7d7464"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 6
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 10
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "西瓜同学🍉 抖音（用户授权参考）+ 逐字稿 + 截图#6（注：去重后保留，与留白族区分在「栏目标题驱动」）"
  },
  {
    id: "f007",
    风格名: "深色压顶风",
    骨架: "顶重压条",
    配色: {
      "深色(顶部压条/导航)": "37%",
      "奶油底(主体)": "62%",
      "暖橘(点缀)": "1%"
    },
    布局骨架: "顶部深色压条横跨（导航/品牌）+ 下方奶油色主体内容 + 暖橘只点 1 处",
    重色落点: "重色在「顶部压条」（上重下轻），暖橘只点 1 处——重色压「顶部重量」",
    第一屏内容: "深色顶部（品牌/导航先入眼）+ 奶油主体主内容",
    删减元素: "去整页深底 / 去多色 / 去色块墙，只顶部一块深",
    适用: "品牌/杂志/高端展示、上重下轻的叙事页",
    禁忌: "全屏深色控制台、需暗色护眼的后台",
    参考站: [
      "Apple（按产品切深/浅）",
      "Tracking Football（顶深底浅明确分切）"
    ],
    我的说明: "顶部深色压住，奶油主体轻，暖橘 1% 点一处；顶部压条统一贯顶节奏稳定。重色压「顶部重量」。",
    演示页: "assets/demos/方案-深色压顶风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·深色压顶风</title>
<style>
:root{--zhucai:#FF5C8A;--zhongdian:#FFD166;--di:#0E0E14;--zi:#ffffff;--cizi:#a7a7b5;--yuanjiao:14px;--jianju:12px;--zihao:15px;--yinying:28;--faguang:30}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="center" data-glow="1">
  <div class="wrap">
    <nav class="nav"><span class="logo">深色压顶风</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">立即升级</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>重磅发布</h1><p class="sub">深色压顶营造仪式感，让这一刻值得被记住</p><div class="btns"><button class="btn solid">立即升级</button><button class="btn ghost">看改动</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">🚀</div><h3>核心升级</h3><p>一句话说清新版本最狠的那一刀</p></article>
      <article class="feat"><div class="ico">🎬</div><h3>发布视频</h3><p>顶部沉浸区直接放预告片</p></article>
      <article class="feat"><div class="ico">💡</div><h3>迁移指南</h3><p>老用户平滑过渡不踩坑</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>v3.0</b><span>本次版本</span></div>
      <div class="stat"><b>28</b><span>新能力</span></div>
      <div class="stat"><b>0</b><span>破坏性变更</span></div>
    </section>
    <footer class="foot"><span>© 2026 深色压顶风</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#FF5C8A;--zhongdian:#FFD166;--di:#0E0E14;--zi:#ffffff;--yuanjiao:14px;--jianju:12px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#FF5C8A"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#FFD166"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#0E0E14"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#ffffff"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#a7a7b5"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 28
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 30
      }
    ],
    来源: "西瓜同学🍉 抖音（用户授权参考）+ 逐字稿 + 截图#7"
  },
  {
    id: "f009",
    风格名: "暖调留白型",
    骨架: "单栏落地页(Z型)",
    配色: {
      "暖米底": "80%",
      "暖橙(唯一CTA)": "8%",
      "墨字": "12%"
    },
    布局骨架: "居中单栏落地页：大标题 + 一句价值主张 + 唯一实心 CTA + 一个文字次链（Z 型视觉动线）",
    重色落点: "暖橙只压在唯一主 CTA 上，全站其余皆墨字/留白——重色压「一处行动」",
    第一屏内容: "大标题 + 价值主张 + 主 CTA，先被留白和那一个橙按钮吸引",
    删减元素: "去色块墙 / 去多卡 / 去状态点，只留一处行动",
    适用: "品牌首页/作品集/个人站落地页，重呼吸感与转化",
    禁忌: "信息极密后台、需快速扫数的监控",
    参考站: [
      "Apple 产品页(暖白)",
      "Aesop",
      "Kinfolk"
    ],
    我的说明: "暖米大面积留白，唯一橙 CTA 跳出来；单栏 Z 型动线，一个焦点。重色压「一处行动」而非分区。",
    演示页: "assets/demos/方案-暖调留白型.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·暖调留白型</title>
<style>
:root{--zhucai:#C2683F;--zhongdian:#E0A96D;--di:#FBF4EC;--zi:#3a2e25;--cizi:#9b8a78;--yuanjiao:20px;--jianju:16px;--zihao:15px;--yinying:16;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="center" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">暖调留白型</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">了解我们</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>温度品牌</h1><p class="sub">暖调留白，像一杯热茶——让用户愿意多待一会儿</p><div class="btns"><button class="btn solid">了解我们</button><button class="btn ghost">成为会员</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">🌿</div><h3>我们的理念</h3><p>把价值观写进首屏，先交朋友</p></article>
      <article class="feat"><div class="ico">🤝</div><h3>客户故事</h3><p>真实的人，真实的使用场景</p></article>
      <article class="feat"><div class="ico">🎁</div><h3>加入我们</h3><p>低门槛行动点，顺手就转化</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>92%</b><span>复访率</span></div>
      <div class="stat"><b>6.5万</b><span>社群</span></div>
      <div class="stat"><b>4.8</b><span>满意度</span></div>
    </section>
    <footer class="foot"><span>© 2026 暖调留白型</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#C2683F;--zhongdian:#E0A96D;--di:#FBF4EC;--zi:#3a2e25;--yuanjiao:20px;--jianju:16px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#C2683F"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#E0A96D"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#FBF4EC"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#3a2e25"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#9b8a78"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 20
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 16
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 16
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "自建（Web Coding · 色调系；v3 由「2栏留白」改为「单栏落地页 Z 型」，与荧光点睛去重）"
  },
  {
    id: "f010",
    风格名: "强对比视觉型",
    骨架: "瑞士分屏海报",
    配色: {
      "纯黑(左板)": "45%",
      "纯白(右板)": "50%",
      "警示红(点睛)": "5%"
    },
    布局骨架: "左右分屏：左黑面板白大字宣言，右白面板内容；红只点「核心」一处，3px 硬边无圆角无阴影",
    重色落点: "黑白硬碰，红只点「核心」一处——重色压「硬对比+一点红」",
    第一屏内容: "左黑宣言板 + 右白内容板（先被硬边分切和一点红吸引）",
    删减元素: "去灰阶过渡 / 去圆角 / 去阴影，纯平硬边",
    适用: "极简/宣言式/强调单一信息的页面",
    禁忌: "柔和品牌、多信息层级",
    参考站: [
      "Swiss Style",
      "Herbert Bayer 版式",
      "Stripe 旧版黑底白字"
    ],
    我的说明: "黑白直接硬碰最强烈；红一点在核心处跳；3px 硬边统一全站。重色压「硬对比+一点红」。",
    演示页: "assets/demos/方案-强对比视觉型.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·强对比视觉型</title>
<style>
:root{--zhucai:#FFE600;--zhongdian:#111111;--di:#0a0a0a;--zi:#ffffff;--cizi:#cfcfcf;--yuanjiao:4px;--jianju:12px;--zihao:15px;--yinying:14;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="left" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">强对比视觉型</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">开始</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>强对比主张</h1><p class="sub">黑白撞色 + 一处亮黄，观点直接砸到脸上</p><div class="btns"><button class="btn solid">开始</button><button class="btn ghost">看案例</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">⚡</div><h3>主张</h3><p>一个大句子，不解释</p></article>
      <article class="feat"><div class="ico">✔</div><h3>证据</h3><p>三点支撑，短平快</p></article>
      <article class="feat"><div class="ico">➡</div><h3>行动</h3><p>亮色按钮，闭眼也能找到</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>3x</b><span>效率提升</span></div>
      <div class="stat"><b>0</b><span>学习成本</span></div>
      <div class="stat"><b>24h</b><span>上线速度</span></div>
    </section>
    <footer class="foot"><span>© 2026 强对比视觉型</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#FFE600;--zhongdian:#111111;--di:#0a0a0a;--zi:#ffffff;--yuanjiao:4px;--jianju:12px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#FFE600"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#111111"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#0a0a0a"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#ffffff"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#cfcfcf"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 4
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 14
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "自建（Web Coding · 色调系；v3 由「2栏硬边」改为「左右分屏海报」，与留白族区分在「分屏硬碰」）"
  },
  {
    id: "f011",
    风格名: "冷调科技型",
    骨架: "深色数据墙",
    配色: {
      "深蓝底": "80%",
      "冰蓝/青(主色)": "15%",
      "面板线": "5%"
    },
    布局骨架: "深蓝底 + 左导航 + 多面板数据墙（青色只点当前态/告警/数据）；f015 霓虹赛博已并入本方案作「发光」变体",
    重色落点: "青色只点「当前态/告警」与数据，深蓝托底——重色压「冷色高亮」；发光参数>0 即霓虹态",
    第一屏内容: "深蓝控制台 + 青色高亮数据墙（先被冷色科技感吸引）",
    删减元素: "去暖色 / 去渐变花哨 / 去留白",
    适用: "数据/运维/科技产品后台（暗色）",
    禁忌: "暖色品牌、柔和展示",
    参考站: [
      "Vercel",
      "Linear(暗色)",
      "Supabase",
      "Cyberpunk 2077 UI(发光变体)"
    ],
    我的说明: "深蓝底冷静，青色高亮跳数据；面板线统一分隔。重色压「冷色高亮」。霓虹=开发光参数。",
    演示页: "assets/demos/方案-冷调科技型.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·冷调科技型</title>
<style>
:root{--zhucai:#39D0D8;--zhongdian:#5B8CFF;--di:#0A0E1A;--zi:#e8f4f8;--cizi:#8fa6b8;--yuanjiao:12px;--jianju:12px;--zihao:15px;--yinying:20;--faguang:40}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="center" data-glow="1">
  <div class="wrap">
    <nav class="nav"><span class="logo">冷调科技型</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">申请内测</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>科技产品</h1><p class="sub">冷调 + 发光，给技术控一点「未来已来」的暗爽</p><div class="btns"><button class="btn solid">申请内测</button><button class="btn ghost">读文档</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">⚙</div><h3>引擎</h3><p>底层自研，性能拉满</p></article>
      <article class="feat"><div class="ico">🔌</div><h3>开放接口</h3><p>SDK / API 随心接</p></article>
      <article class="feat"><div class="ico">🛰</div><h3>云端同步</h3><p>多端一致，无缝切换</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>12ms</b><span>推理延迟</span></div>
      <div class="stat"><b>99.99%</b><span>稳定</span></div>
      <div class="stat"><b>30+</b><span>开放接口</span></div>
    </section>
    <footer class="foot"><span>© 2026 冷调科技型</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#39D0D8;--zhongdian:#5B8CFF;--di:#0A0E1A;--zi:#e8f4f8;--yuanjiao:12px;--jianju:12px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#39D0D8"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#5B8CFF"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#0A0E1A"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#e8f4f8"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#8fa6b8"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 20
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 40
      }
    ],
    来源: "自建（Web Coding · 色调系；v3 并入 f015 霓虹赛博作「发光」参数变体）"
  },
  {
    id: "f012",
    风格名: "自然有机型",
    骨架: "有机侧栏+主卡",
    配色: {
      "米白底": "75%",
      "叶绿(主)": "15%",
      "陶土(点缀)": "10%"
    },
    布局骨架: "左窄有机圆角导航 + 右主卡（大叶绿数字+有机斑驳底）+ 下方支撑列表；大圆角统一",
    重色落点: "叶绿压主指标，圆角有机感——重色压「自然主色」",
    第一屏内容: "米白 + 叶绿大数字（自然呼吸，先被圆润叶绿吸引）",
    删减元素: "去直角硬边 / 去高饱和 / 去密集网格",
    适用: "环保/生活/健康类品牌站",
    禁忌: "科技冷感、极简工业",
    参考站: [
      "Patagonia",
      "Notion 自然风",
      "Garden 类站点"
    ],
    我的说明: "米白安静，叶绿温润跳主指标；大圆角统一全站有机感。重色压「自然主色」。",
    演示页: "assets/demos/方案-自然有机型.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·自然有机型</title>
<style>
:root{--zhucai:#5B8C5A;--zhongdian:#A7C957;--di:#F3F1E7;--zi:#2c3326;--cizi:#7e886f;--yuanjiao:22px;--jianju:16px;--zihao:15px;--yinying:14;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="asym" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">自然有机型</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">逛一逛</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>自然有机</h1><p class="sub">柔和曲线与草木绿，让产品像长在自然里</p><div class="btns"><button class="btn solid">逛一逛</button><button class="btn ghost">我们的故事</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">🌱</div><h3>可持续</h3><p>材料与流程都讲得清</p></article>
      <article class="feat"><div class="ico">💧</div><h3>纯净配方</h3><p>少即是多，成分表敢公开</p></article>
      <article class="feat"><div class="ico">🌍</div><h3>循环</h3><p>包装可回收，闭环交付</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>100%</b><span>可回收</span></div>
      <div class="stat"><b>0</b><span>添加</span></div>
      <div class="stat"><b>18</b><span>合作农场</span></div>
    </section>
    <footer class="foot"><span>© 2026 自然有机型</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#5B8C5A;--zhongdian:#A7C957;--di:#F3F1E7;--zi:#2c3326;--yuanjiao:22px;--jianju:16px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#5B8C5A"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#A7C957"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#F3F1E7"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#2c3326"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#7e886f"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 22
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 16
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 14
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "自建（Web Coding · 色调系；v3 由「2栏留白」改为「有机侧栏+主卡」，与留白族区分在「有机圆角+叶绿」）"
  },
  {
    id: "f013",
    风格名: "复古胶片型",
    骨架: "胶片横滚长廊",
    配色: {
      "胶片米": "78%",
      "棕调(主)": "18%",
      "砖红(点睛)": "4%"
    },
    布局骨架: "横向滚动胶片长廊：一排「胶片帧」（带齿孔）展示内容，砖红只点标签；整体蒙颗粒",
    重色落点: "砖红只点标签/告警，整体蒙一层胶片颗粒——重色压「胶片质感」",
    第一屏内容: "胶片质感 + 横向帧长廊（先被怀旧颗粒与横滚吸引）",
    删减元素: "去纯白 / 去高亮 / 去现代圆角，靠颗粒+虚线",
    适用: "摄影/文创/怀旧品牌",
    禁忌: "现代科技感、明亮清爽",
    参考站: [
      "FilmSupply",
      "VSCO",
      "复古海报排版"
    ],
    我的说明: "胶片米安静，砖红小标签跳；齿孔+颗粒统一全站怀旧语感。重色压「胶片质感」。",
    演示页: "assets/demos/方案-复古胶片型.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·复古胶片型</title>
<style>
:root{--zhucai:#C77B3B;--zhongdian:#E8A85C;--di:#2A211A;--zi:#F2E9DD;--cizi:#b89c82;--yuanjiao:8px;--jianju:12px;--zihao:15px;--yinying:18;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="film" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">复古胶片型</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">看影集</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>胶片影像</h1><p class="sub">棕褐颗粒 + 横向胶片条，把回忆卷成一条长廊</p><div class="btns"><button class="btn solid">看影集</button><button class="btn ghost">约拍</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">🎞</div><h3>胶片条</h3><p>横向滚动的影像流，像翻看底片</p></article>
      <article class="feat"><div class="ico">📷</div><h3>色调</h3><p>统一暖橙，怀旧不脏</p></article>
      <article class="feat"><div class="ico">🖼</div><h3>策展</h3><p>精选九张，讲一个故事</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>36</b><span>胶片卷</span></div>
      <div class="stat"><b>9</b><span>精选帧</span></div>
      <div class="stat"><b>1978</b><span>起点年</span></div>
    </section>
    <footer class="foot"><span>© 2026 复古胶片型</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#C77B3B;--zhongdian:#E8A85C;--di:#2A211A;--zi:#F2E9DD;--yuanjiao:8px;--jianju:12px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#C77B3B"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#E8A85C"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#2A211A"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#F2E9DD"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#b89c82"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 8
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 18
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "自建（Web Coding · 色调系；v3 由「2栏留白」改为「胶片横滚长廊」，与留白族区分在「横滚帧+颗粒」）"
  },
  {
    id: "f016",
    风格名: "中式水墨型",
    骨架: "水墨非对称",
    配色: {
      "宣纸白": "85%",
      "墨黑(字/线)": "13%",
      "朱印红(点睛)": "2%"
    },
    布局骨架: "非对称栅格：左侧竖排大标题（writing-mode vertical-rl）+ 右侧内容；朱印只点重点，右上印章",
    重色落点: "朱印红只点「重点」印章，大面积宣纸+墨字——重色压「一点朱印」",
    第一屏内容: "宣纸留白 + 墨色大标题 + 右上朱印（先被留白与印章吸引）",
    删减元素: "去色块 / 去圆角 / 去阴影，靠留白+细线+衬线",
    适用: "文化/国学/茶/传统品牌",
    禁忌: "现代科技、活泼卡通",
    参考站: [
      "故宫/茶颜悦色",
      "汉字文化站",
      "宣纸风排版"
    ],
    我的说明: "宣纸大面积留白，墨字沉稳，朱印一点跳；细线+衬线统一传统语感。重色压「一点朱印」。",
    演示页: "assets/demos/方案-中式水墨型.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·中式水墨型</title>
<style>
:root{--zhucai:#9E2B25;--zhongdian:#1c1c1c;--di:#F5F1E8;--zi:#23201a;--cizi:#8c8576;--yuanjiao:4px;--jianju:14px;--zihao:15px;--yinying:8;--faguang:0;--mo:#3a342b}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="asym" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">中式水墨型</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">入展</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>东方水墨</h1><p class="sub">宣纸留白 + 一抹朱印，把克制做成高级</p><div class="btns"><button class="btn solid">入展</button><button class="btn ghost">读跋</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">山</div><h3>留白</h3><p>不画满，气韵自己走出来</p></article>
      <article class="feat"><div class="ico">水</div><h3>笔意</h3><p>线条要有提按，不是描边</p></article>
      <article class="feat"><div class="ico">印</div><h3>点睛</h3><p>一处朱红，镇住全局</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>8</b><span>留白比</span></div>
      <div class="stat"><b>1</b><span>朱印</span></div>
      <div class="stat"><b>∞</b><span>余韵</span></div>
    </section>
    <footer class="foot"><span>© 2026 中式水墨型</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#9E2B25;--zhongdian:#1c1c1c;--di:#F5F1E8;--zi:#23201a;--yuanjiao:4px;--jianju:14px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#9E2B25"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#1c1c1c"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#F5F1E8"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#23201a"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#8c8576"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 4
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 8
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      },
      {
        "键": "mo",
        "名": "墨色",
        "类型": "color",
        "默认": "#3a342b"
      }
    ],
    来源: "自建（Web Coding · 色调系；v3 由「2栏留白」改为「水墨非对称」，与留白族区分在「竖排+印章」）"
  },
  {
    id: "f017",
    风格名: "双按钮",
    骨架: "转化页开头",
    配色: {
      "页面底": "70%",
      "实心按钮(主强调)": "12%",
      "描边按钮(弱化)": "10%",
      "步骤卡底": "8%"
    },
    布局骨架: "转化页开头：大标题 + 一句目的 + 双按钮（虚按钮「进一步了解」+ 实按钮「立即使用」）+ 三步说明卡",
    重色落点: "实心按钮永远比描边按钮显眼（更深/更大/带阴影）——重色压「唯一主行动」",
    第一屏内容: "大标题 + 双按钮（实按钮先被看见），先被那个实心按钮吸引",
    删减元素: "去多余装饰 / 去多 CTA 竞争 / 只留一实一虚",
    适用: "落地页 / 转化页开头",
    禁忌: "一页塞多个同级主按钮",
    参考站: [
      "Apple 官网",
      "Stripe 落地页"
    ],
    我的说明: "实按钮=行动，虚按钮=了解；二者对比越大转化越清晰。重色压「唯一主行动」。从素材库 a101 迁入并补参数。",
    演示页: "assets/demos/方案-双按钮.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·双按钮</title>
<style>
:root{--zhucai:#1a1a1a;--zhongdian:#ddd8ce;--di:#ffffff;--zi:#1a1a1a;--cizi:#6f6a5e;--yuanjiao:12px;--jianju:12px;--zihao:14px;--yinying:18;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="z" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">双按钮</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">立即使用</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>双按钮开头</h1><p class="sub">访客先了解、再行动——转化页的标准起手式</p><div class="btns"><button class="btn solid">立即使用</button><button class="btn ghost">进一步了解</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">①</div><h3>先了解</h3><p>虚按钮承接犹豫的访客</p></article>
      <article class="feat"><div class="ico">②</div><h3>再行动</h3><p>实按钮永远更显眼</p></article>
      <article class="feat"><div class="ico">③</div><h3>不贪</h3><p>一屏只放一件事，别抢</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>2</b><span>按钮</span></div>
      <div class="stat"><b>1</b><span>焦点</span></div>
      <div class="stat"><b>+34%</b><span>转化提升</span></div>
    </section>
    <footer class="foot"><span>© 2026 双按钮</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#1a1a1a;--zhongdian:#ddd8ce;--di:#ffffff;--zi:#1a1a1a;--yuanjiao:12px;--jianju:12px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#1a1a1a"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#ddd8ce"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#ffffff"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#1a1a1a"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#6f6a5e"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 18
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "素材库 a101 双按钮（2026-08-20 Apple 官网分析）迁入方案库并补参数"
  },
  {
    id: "f018",
    风格名: "视觉重量",
    骨架: "主角对照",
    配色: {
      "页面底": "70%",
      "主角强调(墨黑)": "12%",
      "普通版弱化": "10%",
      "步骤卡底": "8%"
    },
    布局骨架: "左右对照：左「普通版」小且灰，右「主角版」大且强调——一眼看出重量差；下方三步说明",
    重色落点: "主角版加 2-3 个重量（更大/对比/阴影），普通版刻意弱化——重色压「主角」",
    第一屏内容: "左普通右主角的对照（先被右边那个更重的块吸引）",
    删减元素: "去平铺 / 去同权重罗列，强制分出主次",
    适用: "全站通用 · 让最重要的事第一眼被看见",
    禁忌: "一页多个等重主角",
    参考站: [
      "Apple 官网",
      "网页设计方法论"
    ],
    我的说明: "先定主角，再给它加重量；闭眼再睁第一眼须落主角。重色压「主角」。从素材库 a102 迁入并补参数。",
    演示页: "assets/demos/方案-视觉重量.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·视觉重量</title>
<style>
:root{--zhucai:#2D6CDF;--zhongdian:#E8C547;--di:#F7F8FA;--zi:#1d2330;--cizi:#7c8696;--yuanjiao:14px;--jianju:14px;--zihao:15px;--yinying:20;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="split" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">视觉重量</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">主行动</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>视觉重量对照</h1><p class="sub">左边轻、右边重——用分量差告诉用户该看哪边</p><div class="btns"><button class="btn solid">主行动</button><button class="btn ghost">次行动</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">⚖</div><h3>配重</h3><p>主信息压重，次要信息减重</p></article>
      <article class="feat"><div class="ico">👁</div><h3>视线</h3><p>重的一边自然先被看见</p></article>
      <article class="feat"><div class="ico">🎯</div><h3>聚焦</h3><p>减少选择，落点唯一</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>70%</b><span>视觉重量</span></div>
      <div class="stat"><b>1</b><span>落点</span></div>
      <div class="stat"><b>-2</b><span>干扰项</span></div>
    </section>
    <footer class="foot"><span>© 2026 视觉重量</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#2D6CDF;--zhongdian:#E8C547;--di:#F7F8FA;--zi:#1d2330;--yuanjiao:14px;--jianju:14px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#2D6CDF"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#E8C547"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#F7F8FA"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#1d2330"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#7c8696"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 20
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "素材库 a102 视觉重量（Apple 官网分析 + 方法论）迁入方案库并补参数"
  },
  {
    id: "s203",
    风格名: "首页动线",
    骨架: "导航 + 首屏门面",
    配色: {
      "品牌色": "58%",
      "内容底": "30%",
      "强调色": "12%"
    },
    布局骨架: "顶部导航（Logo + 菜单 + CTA）+ 首屏左文右视觉，导航首项即品牌词",
    重色落点: "导航 CTA 与首屏实按钮同用品牌色，视觉重量压在右视觉块",
    第一屏内容: "导航 + 大标题 + 双按钮 + 右侧视觉块",
    删减元素: "去多余栏目、去装饰线",
    适用: "所有需要「门面感」的官网首页",
    禁忌: "信息流 / 后台",
    参考站: [
      "OpenAI",
      "Apple",
      "Linear"
    ],
    我的说明: "导航 + 首屏 = 完整门面；导航首项写品牌关键词，首屏讲清你是干嘛的。",
    演示页: "assets/demos/方案-首页动线.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·首页动线</title>
<style>
:root{--zhucai:#6D5BD0;--zhongdian:#A78BFA;--di:#FFFFFF;--zi:#1d1a2b;--cizi:#7b7596;--yuanjiao:14px;--jianju:14px;--zihao:15px;--yinying:18;--faguang:0}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="split" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">首页动线</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">开始使用</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>站点的门面</h1><p class="sub">导航讲结构，首屏讲价值——访客三秒懂你在做什么</p><div class="btns"><button class="btn solid">开始使用</button><button class="btn ghost">了解更多</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">🧭</div><h3>导航结构</h3><p>首项放品牌词，菜单匹配站点结构</p></article>
      <article class="feat"><div class="ico">🎯</div><h3>首屏焦点</h3><p>一个大主张 + 双按钮，落点唯一</p></article>
      <article class="feat"><div class="ico">🚪</div><h3>行动点</h3><p>CTA 用品牌色，重过其余</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>3s</b><span>理解成本</span></div>
      <div class="stat"><b>1</b><span>焦点</span></div>
      <div class="stat"><b>+28%</b><span>留资</span></div>
    </section>
    <footer class="foot"><span>© 2026 首页动线</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#6D5BD0;--zhongdian:#A78BFA;--di:#FFFFFF;--zi:#1d1a2b;--yuanjiao:14px;--jianju:14px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#6D5BD0"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#A78BFA"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#FFFFFF"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#1d1a2b"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#7b7596"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 18
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      }
    ],
    来源: "素材库 s203 首页动线（2026-09-07 并入方案库）"
  },
  {
    id: "v131",
    风格名: "动效节奏",
    骨架: "动效节奏演示",
    配色: {
      "暗底": "70%",
      "渐变主": "18%",
      "渐变辅": "12%"
    },
    布局骨架: "横向胶片条展示「入场 / 悬停 / 滚动」三段节奏，配说明卡",
    重色落点: "渐变主色压在胶片条当前帧，说明卡用次级底",
    第一屏内容: "节奏总览 + 三段横向演示条",
    删减元素: "去静态大图、去多余文案",
    适用: "需要「动起来才有感觉」的页面",
    禁忌: "极简文字站",
    参考站: [
      "Awwwards",
      "ReactBits"
    ],
    我的说明: "动效不是装饰，是节奏——入场抓眼、悬停回应、滚动推进。",
    演示页: "assets/demos/方案-动效节奏.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·动效节奏</title>
<style>
:root{--zhucai:#FF7A59;--zhongdian:#7C5CFF;--di:#0D0B14;--zi:#F3EEFF;--cizi:#a99fce;--yuanjiao:14px;--jianju:12px;--zihao:15px;--yinying:18;--faguang:35}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="film" data-glow="1">
  <div class="wrap">
    <nav class="nav"><span class="logo">动效节奏</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">看动效</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>动效的节奏</h1><p class="sub">入场、悬停、滚动——三段节奏让页面会呼吸</p><div class="btns"><button class="btn solid">看动效</button><button class="btn ghost">取代码</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">↗</div><h3>入场</h3><p>元素错落淡入，先抓眼</p></article>
      <article class="feat"><div class="ico">🖱</div><h3>悬停</h3><p>轻微位移 + 上浮，给回应</p></article>
      <article class="feat"><div class="ico">📜</div><h3>滚动</h3><p>随滚动推进，叙事不中断</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>3</b><span>节奏段</span></div>
      <div class="stat"><b>200ms</b><span>入场</span></div>
      <div class="stat"><b>1x</b><span>循环</span></div>
    </section>
    <footer class="foot"><span>© 2026 动效节奏</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#FF7A59;--zhongdian:#7C5CFF;--di:#0D0B14;--zi:#F3EEFF;--yuanjiao:14px;--jianju:12px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#FF7A59"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#7C5CFF"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#0D0B14"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#F3EEFF"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#a99fce"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 12
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 18
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 1,
        "默认": 35
      }
    ],
    来源: "素材库 v131 动效节奏（2026-09-07 并入方案库）"
  },
  {
    id: "v141",
    风格名: "整站首屏探索",
    骨架: "整站首屏 · 探索发现",
    配色: {
      "深底": "68%",
      "品牌叠": "20%",
      "揭示叠": "12%"
    },
    布局骨架: "非对称首屏：大字标题居左，右侧揭示图叠品牌色，留出探索感",
    重色落点: "右侧揭示图用品牌叠色，与左侧大字形成轻重对照",
    第一屏内容: "探索式大标题 + 揭示视觉 + 单 CTA",
    删减元素: "去传统菜单堆、去多栏",
    适用: "作品集 / 产品探索页",
    禁忌: "信息密集后台",
    参考站: [
      "Interactive Discovery",
      "Awwwards"
    ],
    我的说明: "首屏不是陈列，是邀请——用留白和揭示图勾起「点进去看看」的冲动。",
    演示页: "assets/demos/方案-整站首屏探索.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·整站首屏探索</title>
<style>
:root{--zhucai:#E8702A;--zhongdian:#1b1206;--di:#12100c;--zi:#FBF4E9;--cizi:#b9a489;--yuanjiao:10px;--jianju:14px;--zihao:15px;--yinying:16;--faguang:0;--mo:#3a2a12}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="asym" data-glow="0">
  <div class="wrap">
    <nav class="nav"><span class="logo">整站首屏探索</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">开始探索</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>Layers hold tales</h1><p class="sub">把探索交给用户——首屏只抛一个钩子，其余留白</p><div class="btns"><button class="btn solid">开始探索</button><button class="btn ghost">看案例</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">🔍</div><h3>探索</h3><p>留白即是路径，引导不强迫</p></article>
      <article class="feat"><div class="ico">💡</div><h3>发现</h3><p>揭示图随交互显形，给惊喜</p></article>
      <article class="feat"><div class="ico">🤝</div><h3>互动</h3><p>单 CTA 收口，低门槛进入</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>1</b><span>钩子</span></div>
      <div class="stat"><b>∞</b><span>路径</span></div>
      <div class="stat"><b>0</b><span>干扰</span></div>
    </section>
    <footer class="foot"><span>© 2026 整站首屏探索</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#E8702A;--zhongdian:#1b1206;--di:#12100c;--zi:#FBF4E9;--yuanjiao:10px;--jianju:14px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#E8702A"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#1b1206"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#12100c"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#FBF4E9"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#b9a489"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 10
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 15
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 16
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 2,
        "默认": 0
      },
      {
        "键": "mo",
        "名": "墨色",
        "类型": "color",
        "默认": "#3a2a12"
      }
    ],
    来源: "素材库 v141 Interactive Discovery 整站首屏（2026-09-07 并入方案库）"
  },
  {
    id: "s205",
    风格名: "焦点型 Hero",
    骨架: "焦点型首屏",
    配色: {
      "焦点底": "62%",
      "聚光": "26%",
      "文字": "12%"
    },
    布局骨架: "整屏居中焦点：超大标题独占视觉重心，四周大量留白",
    重色落点: "超大标题 + 聚光底色块独大，其余元素减重让位",
    第一屏内容: "焦点大标题 + 一句副文 + 双按钮",
    删减元素: "去导航堆、去侧栏、去一切抢戏",
    适用: "单点主张 / 活动 / 产品发布",
    禁忌: "多任务页",
    参考站: [
      "Apple Event",
      "Linear"
    ],
    我的说明: "一屏只做一件事：让用户记住这一句话。",
    演示页: "assets/demos/方案-焦点型Hero.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·焦点型 Hero</title>
<style>
:root{--zhucai:#FF4D6D;--zhongdian:#FFD6A5;--di:#16121A;--zi:#ffffff;--cizi:#c8b8c4;--yuanjiao:16px;--jianju:14px;--zihao:16px;--yinying:26;--faguang:25}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.2);font-size:14px;color:var(--cizi);}
.menu a{color:inherit;text-decoration:none;}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*4) 0 calc(var(--jianju)*3);}
.hero-text{max-width:640px;}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);}
.btns{margin-top:26px;display:flex;gap:calc(var(--jianju)*1.2);}
.btn{border-radius:var(--yuanjiao);padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid transparent;}
.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
.btn.ghost{border-color:color-mix(in srgb,var(--zi) 25%,transparent);color:var(--zi);background:transparent;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.4);margin-top:calc(var(--jianju)*3);}
.feat{background:color-mix(in srgb,var(--zi) 5%,transparent);border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);border-radius:calc(var(--yuanjiao)*1.2);padding:calc(var(--jianju)*1.4);}
.feat .ico{font-size:26px;}
.feat h3{margin:10px 0 6px;font-size:16px;}
.feat p{font-size:13.5px;color:var(--cizi);}
.stats{display:flex;gap:calc(var(--jianju)*2.4);margin-top:calc(var(--jianju)*3);padding:calc(var(--jianju)*2) 0;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.stat b{font-size:calc(var(--zihao)*2);font-weight:800;color:var(--zhongdian);}
.stat span{display:block;font-size:13px;color:var(--cizi);margin-top:4px;}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
.visual{display:none;}
body[data-lay="center"] .hero{text-align:center;display:flex;flex-direction:column;align-items:center;}
body[data-lay="center"] .hero-text{margin:0 auto;}
body[data-lay="split"] .hero,body[data-lay="asym"] .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:calc(var(--jianju)*2);align-items:center;}
body[data-lay="split"] .visual,body[data-lay="asym"] .visual{display:block;min-height:220px;border-radius:calc(var(--yuanjiao)*1.5);background:linear-gradient(135deg,var(--zhongdian),var(--zhucai));}
body[data-lay="asym"] .visual{background:radial-gradient(circle at 35% 30%,var(--mo,var(--zhongdian)),transparent 62%);border-radius:50% 42% 56% 44%;}
body[data-lay="film"] .features{grid-auto-flow:column;grid-auto-columns:280px;overflow-x:auto;grid-template-columns:none;}
body[data-glow="1"] .btn.solid{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhongdian),0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.8px) rgba(0,0,0,.25);}
</style>
</head>
<body data-lay="center" data-glow="1">
  <div class="wrap">
    <nav class="nav"><span class="logo">焦点型 Hero</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">立即参与</button></nav>
    <header class="hero">
      <div class="hero-text"><h1>记住这一句</h1><p class="sub">整屏只放一个主张，其余全让位</p><div class="btns"><button class="btn solid">立即参与</button><button class="btn ghost">了解详情</button></div></div>
      <div class="visual"></div>
    </header>
    <section class="features">
      <article class="feat"><div class="ico">🎯</div><h3>单焦点</h3><p>标题独占视觉重心，不解释</p></article>
      <article class="feat"><div class="ico">🌟</div><h3>聚光</h3><p>底色块把视线收拢到中心</p></article>
      <article class="feat"><div class="ico">↘</div><h3>收口</h3><p>双按钮在焦点下方，顺手转化</p></article>
    </section>
    <section class="stats">
      <div class="stat"><b>1</b><span>焦点</span></div>
      <div class="stat"><b>100%</b><span>屏占比</span></div>
      <div class="stat"><b>0</b><span>干扰</span></div>
    </section>
    <footer class="foot"><span>© 2026 焦点型 Hero</span><span>隐私 · 条款 · 联系</span></footer>
  </div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>`,
    片段: `:root{--zhucai:#FF4D6D;--zhongdian:#FFD6A5;--di:#16121A;--zi:#ffffff;--yuanjiao:16px;--jianju:14px;}
body{background:var(--di);color:var(--zi);font-family:system-ui,"Microsoft YaHei",sans-serif;line-height:1.6;}
.wrap{max-width:1080px;margin:0 auto;padding:24px 16px;}
.nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.1);padding:14px 0;}
.hero h1{font-size:calc(15px*2.6);font-weight:800;}
.btn.solid{background:var(--zhucai);color:#fff;border-radius:var(--yuanjiao);padding:13px 30px;font-weight:700;border:none;}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);margin-top:32px;}
.feat{border:1px solid rgba(0,0,0,.1);border-radius:calc(var(--yuanjiao)*1.2);padding:20px;}
.stat b{color:var(--zhongdian);font-size:32px;font-weight:800;}`,
    参数: [
      {
        "键": "zhucai",
        "名": "主色",
        "类型": "color",
        "默认": "#FF4D6D"
      },
      {
        "键": "zhongdian",
        "名": "重点色",
        "类型": "color",
        "默认": "#FFD6A5"
      },
      {
        "键": "di",
        "名": "页面底色",
        "类型": "color",
        "默认": "#16121A"
      },
      {
        "键": "zi",
        "名": "正文色",
        "类型": "color",
        "默认": "#ffffff"
      },
      {
        "键": "cizi",
        "名": "次要文字色",
        "类型": "color",
        "默认": "#c8b8c4"
      },
      {
        "键": "yuanjiao",
        "名": "圆角(px)",
        "类型": "slider",
        "最小": 0,
        "最大": 32,
        "步长": 1,
        "默认": 16
      },
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "最小": 4,
        "最大": 32,
        "步长": 1,
        "默认": 14
      },
      {
        "键": "zihao",
        "名": "基础字号(px)",
        "类型": "slider",
        "最小": 12,
        "最大": 20,
        "步长": 1,
        "默认": 16
      },
      {
        "键": "yinying",
        "名": "阴影强度",
        "类型": "slider",
        "最小": 0,
        "最大": 60,
        "步长": 2,
        "默认": 26
      },
      {
        "键": "faguang",
        "名": "发光强度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 1,
        "默认": 25
      }
    ],
    来源: "素材库 s205 焦点型Hero（2026-09-07 并入方案库）"
  },
  {
    id: "s206",
    风格名: "星流/Astra 暗色发布页",
    骨架: "粒子星系 + 滚动编排 + 暗色内容",
    配色: {
      "黑(底)": "55%",
      "白(文字)": "18%",
      "氛围蓝(环境)": "15%",
      "半透白(装饰)": "12%"
    },
    布局骨架: "固定 Canvas 粒子星系（全屏，z-index 0）+ 内容层叠（z-index 1）+ 顶栏/底部控制（z-index 2）。首屏全屏无遮挡，内容区居左 669px 窄栏，两侧留空让星轨通过。形状 cue 区 576px × 80vh 居中展示。",
    重色落点: "黑底托底不抢戏，白字/胶囊控件做交互焦点，氛围蓝（#23435f）渐变为环境色——整个页面的视觉重心在运动的星系本身，文字只是标注。",
    第一屏内容: "全屏星系（无文案）+ 顶栏语言切换/调参按钮。首屏下方两个标签（如「星流 / Starflow」）逐字入场，之后向下滚动触发翻转→散开→形状。",
    删减元素: "去渐变、去阴影、去毛玻璃以外的任何装饰、去滚动动效（只有星星响应滚动，文字无 parallax）、去导航菜单（只有语言切换和调参）。",
    适用: "AI 产品发布 / 模型发布 / 品牌升级 /「新一代」揭幕 / 任何想要沉浸式首屏的场景",
    禁忌: "信息密集页 / 多任务页 / 需要快速传达功能的产品页",
    参考站: [
      "OpenAI GPT-6 Astra 发布页",
      "Win-Hao/starflow (GitHub)",
      "OpenAI 官网"
    ],
    我的说明: "星流/Astra 暗色发布页 = 粒子星系做背景 + 窄栏内容 + 滚动编排。核心不是技术（Three.js 粒子系统），而是「把活的星系当作视觉语言」：星系翻转代表「让位」、散开代表「让出空间」、聚成形状代表「能力显现」——视觉叙事，不是装饰。黑白配色 + 氛围蓝 + 胶囊控件 = 极克制设计语言，所有注意力留给星星。在线版：https://win-hao.github.io/starflow/。\n\n如果需要更传统的发布页布局（大标题+图表+对比），应该用 Codex 发布页那种结构化布局而非此方案。",
    Agent提示词: `【星流/Astra 暗色发布页 · 设计语言宪法】
效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。若对条文写法有疑问，可先查阅 https://github.com/VoltAgent/awesome-design-md 仓库内的 DESIGN.md 范本再输出。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。

第一章 总纲 · 设计哲学
把「活的星系」当视觉语言，不是装饰：星系翻转=让位、散开=让出空间、聚成形状=能力显现。黑白 + 氛围蓝 + 胶囊控件 = 极克制设计语言，所有注意力留给星星。页面为暗色沉浸式发布页。

第二章 设计 Token 法典（取值唯一，禁止近似值）
2.1 颜色 colors
  底 --di #000000（页面唯一画布色）
  主文字 --zi #ffffff
  次级文字 --cizi #ffffff99
  氛围蓝 --ambient #23435f（环境光，仅允许以向外渐变形式存在）
  玻璃底 --glass #ffffff1f（玻璃控件底色）
  cue 说明 --caption #fafafad9
  主按钮：底 #ffffff、字 #000000
2.2 字体 typography
  字体栈：HarmonyOS Sans SC / MiSans / PingFang SC / 微软雅黑
  正文 17px / 行高 1.65 / 字距 0
  大标题 display 字重、clamp(32px, 5vw, 64px)
  小标签 14px / 字距 .08em（如「星流 / Starflow」）
  拉丁词（Starflow）可收 -0.04em 负字距
2.3 圆角 rounded
  胶囊 9999px：一切按钮、标签、控件
  cue 形状外框 10px
2.4 间距 spacing
  段间距 24px；内容窄栏最大宽 669px；首屏内边距 26vh；cue 形状区 576px × 80vh 居中
2.5 动效 motion
  星系约 4000 星、沿 5 旋臂流动 + 闪烁 + Bloom 辉光 + 镜头光晕 + 暗角；可拖拽旋转视角、划过推开星尘；向下滚动触发星系翻转→散开→聚成形状；文字不响应滚动
2.6 层级 layout
  星系 Canvas fixed inset-0（z0）→ 内容层（z1）→ 顶栏/底部控制（z2）

第三章 组件规范 components（全部引用第二章 token）
  顶栏 topbar：fixed 顶部、右对齐；玻璃胶囊按钮（语言切换 / 调参），底 --glass、字 --zi
  主按钮 btn-primary：底 #ffffff、字 #000000、圆角 9999px、高 40px
  玻璃按钮 btn-glass：底 #ffffff1f、字 #fff、hover 提亮
  首屏标签 brand-tag：「星流 / Starflow」逐字入场，小标签规格
  cue 区 cue-target：576px × 80vh 居中，展示星系聚成形状 + 下方 caption 说明文字

第四章 布局法
  首屏全屏星系、无文案；内容窄栏居左 669px、两侧留空让星轨通过；cue 形状区 80vh 居中；段间距 24px

第五章 降级条款
  无 WebGL 时星系降级为 Canvas 2D 版，布局、配色一律不变，禁止因降级改动排版

第六章 禁忌条款（绝对禁止）
  不加渐变（除氛围光）、不加阴影、不加毛玻璃以外的装饰、文字不做 parallax、不加导航菜单；信息密集页 / 多任务页禁用本设计语言

第七章 执行令
  现在把下面这段【页面内容】套进上面的设计语言里，输出完整 HTML：
`,
    演示页: "assets/demos/方案-Astra暗色发布页.html",
    ThreeJS演示: "assets/demos/粒子星系-ThreeJS.html",
    下载: "assets/库/starflow.js",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>星流/Astra 暗色发布页 · 方案演示</title>
<style>
  /* ── openai-astra 设计令牌 ── */
  :root {
    --bg: var(--di); --fg: var(--zi); --fg-2: #fafafa; --muted: var(--cizi); --meta: #ffffff70;
    --accent: #fff; --accent-on: #000;
    /* 中文字体优先的中文字体栈；拉丁部分保留系统无衬线 */
    --font-display: "HarmonyOS Sans SC", "MiSans", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-body: var(--font-display);
    --text-xs: 13px; --text-sm: 14px; --text-base: 17px; --text-lg: 18px; --text-2xl: 30px; --text-3xl: 48px;
    --leading-body: 1.65;
    /* 中文不需要负字距；拉丁标签单独给（见 .label-right） */
    --tracking-display: 0;
    --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-6: 24px; --space-8: 32px;
    --radius-pill: 9999px;
    --astra-ambient: #23435f; --astra-ambient-opacity: 0.55;
    --astra-glass: #ffffff1f; --astra-copy-max: 669px; --astra-shape-max: 576px;
    --zhucai: #ffffff; --zihao: 17px; --jianju: 10px; --yuanjiao: 10px; --yinying: 0; --faguang: 0;
    --di: #000000; --zi: #ffffff; --cizi: #ffffff99; --zhongdian: #7EC8E3;
    color-scheme: dark;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: var(--bg); color: var(--fg); font: 400 var(--text-base) / var(--leading-body) var(--font-body); letter-spacing: 0; -webkit-font-smoothing: antialiased; }

  /* ── 布局骨架（固定）：canvas z-0 / 内容 z-1 / 顶栏与提示 z-2 ── */
  .stage { position: fixed; inset: 0; z-index: 0; background: var(--bg); }
  #starCanvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
  /* starflow 库可能自建 canvas 并挂到 body：同样固定全屏、垫在内容之下 */
  canvas { position: fixed; inset: 0; width: 100%; height: 100%; display: block; touch-action: none; z-index: 0; }
  .chrome { position: fixed; inset: 0; z-index: 2; height: 100svh; pointer-events: none; }
  .chrome .label { position: absolute; top: 50%; transform: translateY(-50%); font: 500 clamp(32px, 5vw, 64px) / 1 var(--font-display); letter-spacing: var(--tracking-display); color: var(--fg-2); user-select: none; white-space: nowrap; }
  .chrome .label-left { left: clamp(20px, 4vw, 56px); }
  .chrome .label-right { right: clamp(20px, 4vw, 56px); letter-spacing: -0.04em; } /* 拉丁单词保留轻微负字距 */
  .chrome .letter { display: inline-block; opacity: 0; transform: translateX(44px); animation: label-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 1s) forwards; }
  @keyframes label-reveal { to { opacity: 1; transform: translate(0); } }
  .chrome .scroll-hint { position: absolute; left: 50%; bottom: 32px; transform: translateX(-50%); color: #fafafa99; font-size: var(--text-sm); letter-spacing: 0; }

  .page { position: relative; z-index: 1; pointer-events: none; }
  .page a, .page button { pointer-events: auto; }
  .hero { height: 100svh; }
  .copy { max-width: var(--astra-copy-max); margin: 0 auto; padding: 26vh var(--space-6); }
  .copy h2 { margin: 0 0 var(--space-4); font: 500 var(--text-2xl) / 1.32 var(--font-display); letter-spacing: 0; }
  .copy p { margin: 0 0 var(--space-6); color: var(--muted); }
  .cue { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); padding: 18vh var(--space-6); }
  .cue-target { width: min(var(--astra-shape-max), 100%); height: 80svh; display: flex; align-items: center; justify-content: center; }
  .cue-target svg { width: 60%; height: 60%; opacity: 0.4; }
  .caption { margin: 0; font: 500 var(--text-sm) / 1.5 var(--font-body); letter-spacing: 0.08em; color: var(--zhongdian); }
  .cue-note { max-width: 440px; margin: 0; text-align: center; font-size: var(--text-sm); line-height: 1.7; color: var(--meta); }
  .copy.tail { padding-bottom: 50vh; text-align: center; }
  .copy.tail p { color: var(--meta); }
  .actions { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-top: var(--space-6); justify-content: center; }
  .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 12px 16px; border: 0; border-radius: var(--radius-pill); font: 500 var(--text-sm) / 1 var(--font-body); text-decoration: none; cursor: pointer; transition: background-color .3s; }
  .btn-primary { background: var(--accent); color: var(--accent-on); box-shadow: 0 6px calc(var(--yinying) * 1px) rgba(0,0,0,.35); text-shadow: 0 0 calc(var(--faguang) * 2px) var(--zhongdian); }
  .btn-glass { background: var(--astra-glass); color: var(--fg); }
  .btn-glass:hover { background: #ffffff33; }
  .topbar { position: fixed; top: 0; left: 0; right: 0; z-index: 3; display: flex; justify-content: flex-end; gap: 8px; padding: 16px 20px; pointer-events: none; }
  .topbar button { pointer-events: auto; background: var(--astra-glass); color: var(--fg); border: 0; border-radius: 999px; padding: 8px 14px; font: 500 13px / 1 var(--font-body); cursor: pointer; }

  /* 调参面板 */
  .tuner-toggle { position: fixed; right: 16px; bottom: 16px; z-index: 10; width: 36px; height: 36px; border-radius: 999px; background: #ffffff1f; border: 0; color: #ffffffcc; font-size: 16px; cursor: pointer; display: grid; place-items: center; }
  .tuner-panel { position: fixed; right: 16px; bottom: 64px; z-index: 10; width: 260px; background: #111; border: 1px solid #ffffff1a; border-radius: 12px; padding: 16px; display: none; flex-direction: column; gap: 8px; }
  .tuner-panel.open { display: flex; }
  .tuner-panel h3 { color: #ffffff99; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; margin: 4px 0 2px; }
  .tuner-panel label { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #ffffffcc; font-size: 12px; }
  .tuner-panel input[type="range"] { width: 100px; accent-color: #fff; }
  .tuner-panel input[type="color"] { width: 50px; height: 22px; border: 0; background: transparent; cursor: pointer; }
  .tuner-panel select { background: #222; color: #fff; border: 1px solid #ffffff33; border-radius: 6px; padding: 2px 6px; font-size: 12px; }
  .tuner-panel .note { color: #ffffff66; font-size: 11px; margin-top: 4px; }

  .notice {
    position: fixed; left: 50%; bottom: 60px; transform: translateX(-50%);
    z-index: 3; color: #ffffff60; font-size: 12px; text-align: center; pointer-events: none;
    line-height: 1.5;
  }
  .notice a { color: #ffffff90; pointer-events: auto; }
  #modeText { color: #ffffff80; }
</style>
</head>
<body>
<div class="stage"><canvas id="starCanvas"></canvas></div>

<!-- 首屏标签（介绍模块骨架：全屏星系 + 两侧标签逐字入场） -->
<div class="chrome" id="chrome">
  <p class="label label-left"><span class="letter" style="--delay:1.0s">星</span><span class="letter" style="--delay:1.1s">流</span></p>
  <p class="label label-right"><span class="letter" style="--delay:1.5s">Starflow</span></p>
  <p class="scroll-hint">向下滚动</p>
</div>

<!-- 顶栏 -->
<div class="topbar">
  <button id="langToggle">EN</button>
</div>

<!-- 调参 -->
<button class="tuner-toggle" id="tunerToggle">⚙</button>
<div class="tuner-panel" id="tunerPanel">
  <h3>方案参数</h3>
  <label>主色 <input id="zhucai" type="color" value="#ffffff"></label>
  <label>重点色 <input id="zhongdian" type="color" value="#7EC8E3"></label>
  <label>页面底色 <input id="di" type="color" value="#000000"></label>
  <label>正文色 <input id="zi" type="color" value="#ffffff"></label>
  <label>次要文字色 <input id="cizi" type="color" value="#ffffff99"></label>
  <label>字号 <b id="v-zihao">17</b><input id="zihao" type="range" min="13" max="22" step="1" value="17"></label>
  <label>圆角 <b id="v-yuanjiao">10</b><input id="yuanjiao" type="range" min="4" max="20" step="1" value="10"></label>
  <label>间距 <b id="v-jianju">10</b><input id="jianju" type="range" min="4" max="20" step="1" value="10"></label>
  <label>阴影强度 <b id="v-yinying">0</b><input id="yinying" type="range" min="0" max="50" step="2" value="0"></label>
  <label>发光强度 <b id="v-faguang">0</b><input id="faguang" type="range" min="0" max="30" step="1" value="0"></label>
  <label>星星大小 <b id="v-starSize">1.2</b><input id="starSize" type="range" min="0.5" max="3" step="0.1" value="1.2"></label>
  <label>星星速度 <b id="v-starSpeed">0.4</b><input id="starSpeed" type="range" min="0" max="1.5" step="0.05" value="0.4"></label>
  <label>氛围色 <input id="ambient" type="color" value="#23435f"></label>
  <p class="note">背景为真实 Three.js 3D 版（需 HTTP 服务）；双击打开时自动降级 Canvas 2D<br>在线版 → <a href="https://win-hao.github.io/starflow/" target="_blank" style="color:#ffffff90">win-hao.github.io/starflow</a></p>
</div>

<div class="page" id="page">
  <section class="hero"></section>
  <section class="copy" data-astra-intro>
    <h2>星流让位，内容登场</h2>
    <p>首屏是一整片星系——数千颗星沿旋臂缓慢流动。向下滚动时，星系整体翻转、退向两侧，把中央让给内容。</p>
    <p>星星并没有消失：它们留在各自的旋臂上继续旋转。你需要的时候，它一直在。</p>
  </section>
  <section class="copy">
    <h2>同一片星，不同的形状</h2>
    <p>继续滚动，星尘从旋臂上散开，在下一个区域重新聚拢成你看到的样子——同一个星场，在不同位置站成不同的形状。</p>
  </section>
  <section class="cue" data-astra-shape="cursor">
    <div class="cue-target">
      <svg viewBox="0 0 19 19" fill="none" stroke="#ffffff80" stroke-width="0.5">
        <path d="M1 1l6 17 3-7 7-3z"/>
      </svg>
    </div>
    <p class="caption">拖动旋转 · 划过推开星尘</p>
    <p class="cue-note">星系不是静止的背景：按住拖动可以旋转视角，划过时会把星尘推开。右下角 ⚙ 可调星数、颜色与流动速度，改动实时生效。</p>
  </section>
  <section class="copy tail">
    <p>到底了。向上滚动，星流逆序合拢，回到首屏的完整星系。</p>
    <div class="actions">
      <a class="btn btn-primary" href="#">开始使用</a>
      <a class="btn btn-glass" href="#">了解更多</a>
    </div>
  </section>
</div>

<div class="notice"><span id="modeText">背景加载中…</span> · <a href="https://win-hao.github.io/starflow/" target="_blank">在线版</a></div>

<script>
  // ════════════════════════════════════════════════════════════
  // 双轨背景：优先加载真实 Three.js 3D（../库/starflow.js）
  //  - HTTP 服务下：import 成功 + 有 WebGL → 真实 3D
  //  - file:// 双击 / 无 WebGL / 加载失败 → 自动降级 Canvas 2D
  // 布局骨架固定不变：canvas(z-0) + 内容(z-1) + 顶栏/提示(z-2)
  // ════════════════════════════════════════════════════════════
  const canvas = document.getElementById('starCanvas')
  const modeText = document.getElementById('modeText')

  const state = {
    zhucai: '#ffffff', zhongdian: '#7EC8E3', di: '#000000', zi: '#ffffff', cizi: '#ffffff99',
    zihao: 17, yuanjiao: 10, jianju: 10, yinying: 0, faguang: 0,
    starSize: 1.2, starSpeed: 0.4, ambient: '#23435f'
  }

  // ── Canvas 2D 星系（降级模式）──
  let ctx = null, W = 0, H = 0, stars = [], time = 0, rafId = 0

  function initStars() {
    stars = []
    const n = 1500
    for (let i = 0; i < n; i++) {
      const r = 0.05 + Math.pow(Math.random(), 0.5) * 0.95
      const armAngle = r * 7 * Math.PI
      const spread = (1 - r * 0.6) * 0.4
      const angle = armAngle + (Math.random() - 0.5) * spread
      stars.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r * 0.55,
        size: 0.3 + Math.random() * 0.7,
        bright: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        mix: Math.random()
      })
    }
  }

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight }

  function hexToRgb(h) { const v = parseInt(h.slice(1), 16); return [(v>>16)&255, (v>>8)&255, v&255] }

  function draw2D() {
    time += 0.016 * state.starSpeed
    const cx = W / 2, cy = H / 2, scale = Math.min(W, H) * 0.32
    const rot = time * 0.2
    const c1 = hexToRgb('#6eb5ff')
    const c2 = hexToRgb('#ff8c5a')

    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, W, H)

    const amb = hexToRgb(state.ambient)
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.6)
    grad.addColorStop(0, \`rgba(\${amb[0]},\${amb[1]},\${amb[2]},0.25)\`)
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    for (let i = 0; i < 150; i++) {
      const bx = Math.random() * W, by = Math.random() * H
      ctx.globalAlpha = 0.1 + Math.random() * 0.2
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(bx, by, 0.3 + Math.random() * 0.8, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    for (const s of stars) {
      const angle = s.x === 0 ? 0 : Math.atan2(s.y, s.x) + rot
      const r = Math.sqrt(s.x * s.x + s.y * s.y) * scale
      const x = cx + Math.cos(angle) * r
      const y = cy + Math.sin(angle) * r * 0.55
      const twinkle = 0.5 + 0.5 * Math.sin(time * 3 + s.phase)
      const alpha = s.bright * twinkle * 0.7
      const sz = s.size * state.starSize * 0.6

      const gr = ctx.createRadialGradient(x, y, 0, x, y, sz * 3)
      const col = [c1[0] + (c2[0]-c1[0])*s.mix*0.3, c1[1] + (c2[1]-c1[1])*s.mix*0.3, c1[2] + (c2[2]-c1[2])*s.mix*0.3]
      gr.addColorStop(0, \`rgba(\${col[0]},\${col[1]},\${col[2]},\${alpha*0.5})\`)
      gr.addColorStop(0.3, \`rgba(\${col[0]},\${col[1]},\${col[2]},\${alpha*0.2})\`)
      gr.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gr
      ctx.beginPath()
      ctx.arc(x, y, sz * 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = \`rgba(255,255,255,\${alpha*0.8})\`
      ctx.beginPath()
      ctx.arc(x, y, sz * 0.3, 0, Math.PI * 2)
      ctx.fill()
    }

    rafId = requestAnimationFrame(draw2D)
  }

  function start2D() {
    ctx = canvas.getContext('2d')
    if (!ctx) return
    resize()
    addEventListener('resize', resize)
    initStars()
    draw2D()
    modeText.textContent = '背景：Canvas 2D 降级（file:// 或环境无 WebGL）'
  }

  // ── 真实 Three.js 3D（双轨主轨道）──
  let astra = null

  async function try3D() {
    try {
      const mod = await import('../库/starflow.js')
      if (mod.detectWebGL && mod.createAstraScene && mod.detectWebGL()) {
        const scene = mod.createAstraScene(canvas, {
          flowSpeed: state.starSpeed * 2,
          bloomIntensity: 0.7, bloomThreshold: 0.08, intensity: 1.35,
          lensFlare: { intensity: 0.28 },
          ambientColor: state.ambient, ambientOpacity: 0.55, vignette: 1,
          twinkleSpeed: 0.62, size: state.starSize * 1.6, introDuration: 3,
        })
        try {
          scene.setSource({ type: 'galaxy' }, {
            starCount: 4000, scatter: 0.041, size: state.starSize * 1.6,
            palette: 'astra', backgroundRatio: 0.14, rotationDepth: 1.4,
          })
        } catch (e) {
          scene.dispose?.(); throw e
        }
        astra = scene
        modeText.textContent = '背景：真实 Three.js 3D 版'
      }
    } catch (e) {
      /* import 被拦（file:// 双击）→ 保持 null，走 2D 降级 */
    }
    if (!astra) start2D()
  }

  // ── 调参 ──
  const panel = document.getElementById('tunerPanel')
  document.getElementById('tunerToggle').addEventListener('click', () => panel.classList.toggle('open'))

  function applyStyle() {
    const R = document.documentElement.style
    R.setProperty('--zhucai', state.zhucai)
    R.setProperty('--zihao', state.zihao + 'px')
    R.setProperty('--yuanjiao', state.yuanjiao + 'px')
    R.setProperty('--jianju', state.jianju + 'px')
    R.setProperty('--accent', state.zhucai)
    R.setProperty('--accent-on', state.zhucai === '#ffffff' ? '#000' : '#fff')
    R.setProperty('--zhongdian', state.zhongdian)
    R.setProperty('--di', state.di)
    R.setProperty('--zi', state.zi)
    R.setProperty('--cizi', state.cizi)
    R.setProperty('--yinying', state.yinying)
    R.setProperty('--faguang', state.faguang)
  }

  function pushTo3D(key, v) {
    if (!astra) return
    if (key === 'starSize') astra.setConfig?.({ size: Number(v) * 1.6 })
    else if (key === 'starSpeed') astra.setConfig?.({ flowSpeed: Number(v) * 2 })
    else if (key === 'ambient') astra.setConfig?.({ ambientColor: v })
  }

  const bindings = [
    { id: 'zhucai', key: 'zhucai', type: 'color' },
    { id: 'zhongdian', key: 'zhongdian', type: 'color' },
    { id: 'di', key: 'di', type: 'color' },
    { id: 'zi', key: 'zi', type: 'color' },
    { id: 'cizi', key: 'cizi', type: 'color' },
    { id: 'zihao', key: 'zihao', type: 'range' },
    { id: 'yuanjiao', key: 'yuanjiao', type: 'range' },
    { id: 'jianju', key: 'jianju', type: 'range' },
    { id: 'yinying', key: 'yinying', type: 'range' },
    { id: 'faguang', key: 'faguang', type: 'range' },
    { id: 'starSize', key: 'starSize', type: 'range' },
    { id: 'starSpeed', key: 'starSpeed', type: 'range' },
    { id: 'ambient', key: 'ambient', type: 'color' },
  ]

  bindings.forEach(({ id, key, type }) => {
    const el = document.getElementById(id)
    const val = document.getElementById('v-' + id)
    if (!el) return
    el.addEventListener('input', () => {
      const v = type === 'color' ? el.value : Number(el.value)
      state[key] = v
      if (val) val.textContent = typeof v === 'number' ? v : ''
      applyStyle()
      pushTo3D(key, v)
    })
  })

  applyStyle()

  // postMessage
  addEventListener('message', e => {
    const d = e.data
    if (!d || d.type !== 'param') return
    state[d.key] = d.value
    applyStyle()
    pushTo3D(d.key, d.value)
  })

  // ── 启动：先试真实 3D（HTTP 下），失败自动走 2D（file:// 双击也能看）──
  try3D()
<\/script>
</body>
</html>
`,
    片段: `:root{--zhucai:#ffffff;--zhongdian:#7EC8E3;--di:#000000;--zi:#ffffff;--cizi:#ffffff99}
.stage{position:fixed;inset:0;z-index:0;background:var(--di)}
#astra{position:absolute;inset:0;display:block;width:100%;height:100%}
.page{position:relative;z-index:1;pointer-events:none}
.copy{max-width:669px;margin:0 auto;padding:26vh 24px}
.copy h2{font:500 30px/1.32 system-ui}
.copy p{color:var(--cizi)}
.cue{display:flex;flex-direction:column;align-items:center;gap:16px;padding:18vh 24px}
.cue-target{width:min(576px,100%);height:80svh}
.btn-primary{background:var(--zhucai);color:#000;border-radius:9999px;padding:12px 16px;font:500 14px/1 system-ui}`,
    参数: [
      { "键": "zhucai", "名": "主色（按钮/重点）", "类型": "color", "默认": "#ffffff" },
      { "键": "zhongdian", "名": "重点色（数据高亮）", "类型": "color", "默认": "#7EC8E3" },
      { "键": "di", "名": "页面底色", "类型": "color", "默认": "#000000" },
      { "键": "zi", "名": "正文色", "类型": "color", "默认": "#ffffff" },
      { "键": "cizi", "名": "次要文字色", "类型": "color", "默认": "#ffffff99" },
      { "键": "yuanjiao", "名": "圆角(px)", "类型": "slider", "最小": 4, "最大": 24, "步长": 1, "默认": 10 },
      { "键": "jianju", "名": "间距(px)", "类型": "slider", "最小": 4, "最大": 32, "步长": 1, "默认": 10 },
      { "键": "zihao", "名": "基础字号(px)", "类型": "slider", "最小": 13, "最大": 22, "步长": 1, "默认": 17 },
      { "键": "yinying", "名": "阴影强度", "类型": "slider", "最小": 0, "最大": 50, "步长": 2, "默认": 0 },
      { "键": "faguang", "名": "发光强度(%)", "类型": "slider", "最小": 0, "最大": 30, "步长": 1, "默认": 0 }
    ],
    来源: "GitHub Win-Hao/starflow（MIT）+ OpenAI GPT-6 Astra 发布页设计系统（2026-09-07 入库）"
  },
  {
    id: "s207",
    风格名: "定义型首屏",
    骨架: "定义型首屏（左文右留白）",
    配色: {"深底(画布)":"60%","文字与留白":"30%","强调色(CTA/图标)":"10%"},
    布局骨架: "顶部极窄导航 + 公告胶囊 + 首屏左文右留白：左侧 H1 定义句 + 副文 + 单一 CTA，右侧大片留白做呼吸区；下方功能按亲密性分三组",
    重色落点: "强调色只落在主 CTA、公告标签、功能组小标与图标（合计约 10%），其余层级全靠字号与留白",
    第一屏内容: "H1 一句定义（我们是什么）+ 一句副文（为谁、解决什么）+ 一个主 CTA",
    删减元素: "去首屏配图、去轮播、去第二个实心按钮、去装饰色块",
    适用: "工具 / SaaS 官网、需要先让人「听懂你是谁」的新品类产品",
    禁忌: "已有知名度的品牌（不用再自我介绍）、强促销页（要的是转化不是认知）",
    参考站: ["Linear","Height","Arc"],
    我的说明: "先下定义，再给动作。与 s205 焦点型 Hero 的分工：焦点型是居中一句话 + 双按钮（转化优先），定义型是左对齐下定义 + 功能三组（认知优先）。",
    Agent提示词: "【定义型首屏 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n先下定义，再给动作。第一屏不卖功能清单，只卖一个品类位置——让人在 3 秒内知道「你是谁」。深色底（沉浸、舞台感）+ 单一强调色（那 10%）+ 大量留白（呼吸区），所有注意力留给那句定义。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors\n  底 --di #08090A（页面唯一画布色，近黑）\n  主文字 --zi #F7F8F8\n  次级文字 --cizi #8A8F98（副文、导航、页脚）\n  强调 --zhucai #5E6AD2（仅用于主 CTA 与「New」标签）\n  重点 --zhongdian #8B93F8（仅用于 H1 中的一个词、功能组小标、柔光晕）\n  强调色总面积守住 10%：CTA 一块 + 图标若干，禁止铺色块、禁止渐变按钮\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(32px, 5vw, 56px)，字重 800，行高 1.1，字距 -0.6px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  导航 / 小标 caption：13–14px，字重 600\n2.3 圆角 rounded：控件 10px，胶囊（公告条）9999px，卡片 12px\n2.4 间距 spacing：8 / 16 / 24 / 32 / 48 / 64 刻度；首屏左文右留白，右侧留白占 32%\n2.5 动效 motion：入场错峰 120ms（H1 → 副文 → 按钮 → 功能组），单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站只此一处动效，其余静止\n2.6 层级 layout：导航 → 公告胶囊 → H1 → 副文 → CTA → 功能三组；右侧留白区保持为空\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：极窄单行，logo + 5–6 个文字项，右侧 Log in / Sign up（Sign up 是唯一实心按钮）\n  公告胶囊 pill：描边胶囊，New 标签用强调底，右侧箭头悬停右移 4px\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 10px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 20% 白描边，仅作陪衬\n  功能组 group：组间距 40px、组内 12px，组标用 --zhongdian，图标淡底 16% 强调色\n\n第四章 布局法 layout\n  栅格：内容最宽 1040px 居中；首屏左右分栏，左文宽 68%、右留白 32%\n  留白哲学：右侧留白是「呼吸区」不是待填区，禁止塞配图、插画、轮播\n  内容落点：视线第一落点是 H1 的强调词，第二落点是主 CTA\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层 #121316\n  阴影仅用于主按钮与卡片，强度 20 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：H1 用一句完整定义句（我们是什么品类）；同一句价值主张在页内重复出现；抽象定义（system）配具体动作（三条功能）互撑；首屏末尾留一个下探钩子\n  不该做：不堆功能清单到首屏；不放大段产品截图抢戏；不用第二个实心按钮；不给 H1 加渐变或描边特效；不在首屏放轮播\n  反例警示：Linear 原站把定义讲完就收，没有下探钩子——这叫动线断裂，第一考核不是好不好看，是「你愿不愿意滚下去」\n\n第七章 文案规则（本方案独有的占位式写法）\n  占位式文案：不跟竞品比功能，直接定义自己是什么品类（「面向团队与智能体的产品开发系统」）\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下右侧留白收掉改上下堆叠；768 以下导航折成汉堡；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #08090A / 主文 #F7F8F8 / 次文 #8A8F98 / 强调 #5E6AD2 / 重点 #8B93F8（60-30-10）\n  字号卡：H1 clamp(32,5vw,56) / 副文 17 / 导航 14 / 小标 13\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML 定义型首屏——导航 + 公告胶囊 + 左文右留白首屏 + 功能三组 + 下探钩子，零依赖可离线打开。",
    演示页: "assets/demos/方案-定义型首屏.html",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>方案·定义型首屏（Linear）</title>\n<style>\n:root{--zhucai:#5E6AD2;--zhongdian:#8B93F8;--di:#08090A;--zi:#F7F8F8;--cizi:#8A8F98;--yuanjiao:10px;--jianju:16px;--zihao:16px;--yinying:20;--faguang:18}\n*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,\"Microsoft YaHei\",sans-serif;}\nbody{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}\n.wrap{max-width:1040px;margin:0 auto;padding:var(--jianju) calc(var(--jianju)*1.5) calc(var(--jianju)*3);}\n.nav{display:flex;align-items:center;gap:calc(var(--jianju)*1.2);padding:calc(var(--jianju)*0.8) 0;font-size:14px;color:var(--cizi);}\n.logo{font-weight:800;font-size:17px;color:var(--zi);}\n.nav a{color:inherit;text-decoration:none;}\n.nav .right{margin-left:auto;display:flex;align-items:center;gap:var(--jianju);}\n.signup{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:7px 16px;font-size:13.5px;font-weight:700;cursor:pointer;}\n/* 公告胶囊：线性官网首屏那一条「New Loops →」，把新消息塞进最小面积 */\n.pill{display:inline-flex;align-items:center;gap:8px;margin-top:calc(var(--jianju)*2);padding:5px 12px 5px 8px;border:1px solid color-mix(in srgb,var(--zi) 14%,transparent);border-radius:999px;font-size:13px;color:var(--cizi);background:color-mix(in srgb,var(--zi) 4%,transparent);cursor:pointer;}\n.pill b{background:var(--zhucai);color:#fff;border-radius:6px;padding:1px 7px;font-size:11.5px;font-weight:700;}\n.pill .arw{transition:transform .2s ease;}\n.pill:hover .arw{transform:translateX(4px);}\n.hero{display:flex;gap:calc(var(--jianju)*2);margin-top:calc(var(--jianju)*1.6);align-items:flex-start;}\n.hero-l{min-width:0;}\nh1{font-size:calc(var(--zihao)*2.6);line-height:1.1;letter-spacing:-.6px;font-weight:800;}\nh1 em{font-style:normal;color:var(--zhongdian);}\n.sub{margin-top:calc(var(--jianju)*0.9);font-size:calc(var(--zihao)*1.05);color:var(--cizi);max-width:46ch;}\n.btns{margin-top:calc(var(--jianju)*1.8);display:flex;gap:var(--jianju);align-items:center;}\n.btn{border-radius:var(--yuanjiao);padding:11px 24px;font-size:14.5px;font-weight:700;cursor:pointer;border:1px solid transparent;}\n.btn.solid{background:var(--zhucai);color:#fff;box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*0.9px) rgba(0,0,0,.4);}\n.btn.ghost{border-color:color-mix(in srgb,var(--zi) 20%,transparent);color:var(--zi);background:transparent;}\n/* 右侧留白区：定义型首屏的「呼吸区」，留白占比由参数控制 */\n.void{min-height:200px;border-radius:calc(var(--yuanjiao)*1.5);}\nbody[data-glow=\"1\"] .void{background:radial-gradient(circle at 40% 30%,color-mix(in srgb,var(--zhongdian) calc(var(--faguang)*1%),transparent),transparent 65%);}\n.groups{margin-top:calc(var(--jianju)*3);display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*1.6);}\n.grp h4{font-size:13px;color:var(--zhongdian);margin-bottom:calc(var(--jianju)*0.6);}\n.grp p{font-size:13.5px;color:var(--cizi);}\n/* 下探钩子：关掉就是 Linear 原版「讲完定义就收」的动线断裂 */\n.hook{margin-top:calc(var(--jianju)*3);padding-top:calc(var(--jianju)*1.4);border-top:1px solid color-mix(in srgb,var(--zi) 10%,transparent);display:flex;align-items:center;justify-content:space-between;color:var(--cizi);font-size:13.5px;}\n.hook .down{color:var(--zhucai);font-size:18px;}\nbody[data-hook=\"0\"] .hook{display:none;}\n.tip{margin-top:calc(var(--jianju)*2);font-size:12px;color:var(--cizi);opacity:.8;}\n/* 入场：H1→副文→按钮→功能组，错峰 120ms，是全站唯一的高音 */\n.in{opacity:0;transform:translateY(18px);}\n.in.run{animation:up .7s cubic-bezier(.16,1,.3,1) forwards;}\n@keyframes up{to{opacity:1;transform:none;}}\n</style>\n</head>\n<body data-glow=\"1\" data-hook=\"1\">\n  <div class=\"wrap\">\n    <nav class=\"nav\"><span class=\"logo\">Linear</span><a>Product</a><a>Resources</a><a>Customers</a><a>Pricing</a><a>Now</a><span class=\"right\"><a>Log in</a><button class=\"signup\">Sign up</button></span></nav>\n    <div class=\"pill in\"><b>New</b>Loops 上线：把反馈直接变成任务<span class=\"arw\">→</span></div>\n    <header class=\"hero\">\n      <div class=\"hero-l\" id=\"hl\">\n        <h1 class=\"in\">面向团队与<em>智能体</em>的产品开发系统</h1>\n        <p class=\"sub in\">为规划与构建产品而生，为 AI 时代而设计。</p>\n        <div class=\"btns in\"><button class=\"btn solid\">免费开始</button><button class=\"btn ghost\">看它怎么跑</button></div>\n      </div>\n      <div class=\"void\"></div>\n    </header>\n    <section class=\"groups in\">\n      <div class=\"grp\"><h4>对话 / 反馈 → issue</h4><p>一句话把散落的反馈收进待办</p></div>\n      <div class=\"grp\"><h4>idea → launch</h4><p>从一个想法走到上线，路径不断</p></div>\n      <div class=\"grp\"><h4>部署 agent 当队友</h4><p>把重复劳动交给智能体执行</p></div>\n    </section>\n    <div class=\"hook\"><span>往下看：三分钟搞懂它替你做了什么</span><span class=\"down\">↓</span></div>\n    <p class=\"tip\">来源：linear.app 首屏拆解（2026-09-10）· 定义型首屏＝先下定义再给动作；关掉「下探钩子」即可复现原站的动线断裂</p>\n  </div>\n<script>\n  // 参数状态：键名与 data/方案.js 的「参数」一致，改哪个都能实时看到\n  const state = { zhucai:\"#5E6AD2\", zhongdian:\"#8B93F8\", di:\"#08090A\", zi:\"#F7F8F8\", cizi:\"#8A8F98\",\n    yuanjiao:10, jianju:16, zihao:16, yinying:20, faguang:18, liubai:32, gouzi:1 };\n  function apply(){\n    const r = document.documentElement.style;\n    r.setProperty(\"--zhucai\", state.zhucai);\n    r.setProperty(\"--zhongdian\", state.zhongdian);\n    r.setProperty(\"--di\", state.di);\n    r.setProperty(\"--zi\", state.zi);\n    r.setProperty(\"--cizi\", state.cizi);\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    r.setProperty(\"--jianju\", state.jianju + \"px\");\n    r.setProperty(\"--zihao\", state.zihao + \"px\");\n    r.setProperty(\"--yinying\", state.yinying);\n    r.setProperty(\"--faguang\", state.faguang);\n    document.body.dataset.glow = state.faguang > 0 ? \"1\" : \"0\";\n    document.body.dataset.hook = String(state.gouzi);\n    // 留白占比：左侧文字区宽度 = 100% - 留白%，右侧是纯呼吸区（不放东西）\n    document.getElementById(\"hl\").style.width = (100 - state.liubai) + \"%\";\n  }\n  // 入场错峰：把「先看什么后看什么」排成时间序列，克制设计里这是唯一的高音\n  function play(){\n    document.querySelectorAll(\".in\").forEach((el,i)=>{\n      el.classList.remove(\"run\");\n      void el.offsetWidth;\n      el.style.animationDelay = (i * 0.12) + \"s\";\n      el.classList.add(\"run\");\n    });\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); play();\n  setInterval(play, 6000);\n<\\/script>\n</body>\n</html>\n",
    片段: "<!-- 定义型首屏最小骨架：先下定义，再给动作 -->\n<header class=\"hero\">\n  <div class=\"hero-l\">\n    <h1>面向团队与<em>智能体</em>的产品开发系统</h1>\n    <p class=\"sub\">为规划与构建产品而生，为 AI 时代而设计。</p>\n    <div class=\"btns\"><button class=\"btn solid\">免费开始</button><button class=\"btn ghost\">看它怎么跑</button></div>\n  </div>\n  <div class=\"void\"></div><!-- 右侧 32% 是呼吸区，别塞东西 -->\n</header>",
    参数: [{"键":"zhucai","名":"主色","类型":"color","默认":"#5E6AD2"},{"键":"zhongdian","名":"重点色","类型":"color","默认":"#8B93F8"},{"键":"di","名":"页面底色","类型":"color","默认":"#08090A"},{"键":"zi","名":"正文色","类型":"color","默认":"#F7F8F8"},{"键":"cizi","名":"次要文字色","类型":"color","默认":"#8A8F98"},{"键":"yuanjiao","名":"圆角(px)","类型":"slider","最小":0,"最大":24,"步长":1,"默认":10},{"键":"jianju","名":"间距(px)","类型":"slider","最小":8,"最大":32,"步长":1,"默认":16},{"键":"zihao","名":"基础字号(px)","类型":"slider","最小":13,"最大":20,"步长":1,"默认":16},{"键":"yinying","名":"阴影强度","类型":"slider","最小":0,"最大":60,"步长":2,"默认":20},{"键":"faguang","名":"柔光强度(%)","类型":"slider","最小":0,"最大":60,"步长":2,"默认":18},{"键":"liubai","名":"右侧留白占比(%)","类型":"slider","最小":0,"最大":60,"步长":2,"默认":32},{"键":"gouzi","名":"下探钩子(0关/1开)","类型":"slider","最小":0,"最大":1,"步长":1,"默认":1}],
    来源: "网站拆解：Linear（linear.app）首屏，2026-09-10 入库；文案与结构仅作手法参考，代码自写"
  }
];