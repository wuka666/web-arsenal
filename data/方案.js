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
    Agent提示词: "【大色块分区 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n大色块四宫格。焦点块用最大面积+最跳色做唯一视觉重心；其余块同明度不同色相，节奏统一不抢戏。 适用：维度少、要一眼分区的运营/监控大屏。参考：Raycast、Height、Arc、Muzli 50 Best Dashboard 2026。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（机身黑(底) 41% / 珊瑚(焦点块) 22% / 冰蓝 12% / 长春花 13% / 鼠尾草 12%）\n  底 --di #1a1a1a（页面唯一画布色）\n  主文字 --zi #ffffff\n  次级文字 --cizi #b8b8b8（副文、导航、页脚）\n  强调 --zhucai #FF6F61（珊瑚焦点块独大且最跳，其余三块同明度不同色相做节奏；黑底托底不抢戏）\n  重点 --zhongdian #7EC8E3（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 14px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 10px 为基准刻度（10 / 20 / 30 / 40）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：左窄导航 + 顶部告警栏 + 中部 2×2 大色块网格（容量助手占最大珊瑚焦点块）\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 14px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 14px，阴影强度 30（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：左窄导航 + 顶部告警栏 + 中部 2×2 大色块网格（容量助手占最大珊瑚焦点块）\n  删减（明确不做什么）：去细线条分隔 / 弱图标描边 / 不堆图表网格\n  内容落点（第一屏看到什么）：告警栏（顶）+ 容量助手焦点块（最大色块=核心指标）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 30 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：珊瑚焦点块独大且最跳，其余三块同明度不同色相做节奏；黑底托底不抢戏；维度少、要一眼分区的运营/监控大屏\n  不该做：信息密度高、需精确行列对照的报表；去细线条分隔 / 弱图标描边 / 不堆图表网格\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「大色块分区」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「告警栏（顶）+ 容量助手焦点块（最大色块=核心指标）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #1a1a1a / 主文 #ffffff / 次文 #b8b8b8 / 强调 #FF6F61 / 重点 #7EC8E3\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 14 / 基准间距 10\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（大色块四宫格），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    Agent提示词: "【图片卡片流 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n图片卡片流。暖白大面积安静，橘色小点跳出来标状态；卡片等距网格节奏一致不抢戏。重色压「状态」而非「分区」。 适用：媒体·作品·商品·行程展示流。参考：Polarsteps、Wanderlog、walls.io Tourism 主题。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（暖白底 82% / 卡片底 12% / 橘色(状态标签) 6%）\n  底 --di #FBF7F0（页面唯一画布色）\n  主文字 --zi #2a2620\n  次级文字 --cizi #8a8170（副文、导航、页脚）\n  强调 --zhucai #E8843C（橘色只点在「状态标签」上，不铺大面——重色压状态而非分区）\n  重点 --zhongdian #F2C14E（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 16px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 14px 为基准刻度（14 / 28 / 42 / 56）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：左导航 + 顶部弱告警 + 中部图片卡片网格（每卡=图+图下小信息+橘色状态标签）+ 右行程侧栏\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 16px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 16px，阴影强度 18（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：左导航 + 顶部弱告警 + 中部图片卡片网格（每卡=图+图下小信息+橘色状态标签）+ 右行程侧栏\n  删减（明确不做什么）：去大色块分区 / 去大数字堆 / 信息压到图下方小字\n  内容落点（第一屏看到什么）：图片卡片流（视觉主体，先被图吸引，而非被数字/色块吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 18 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：橘色只点在「状态标签」上，不铺大面——重色压状态而非分区；媒体·作品·商品·行程展示流\n  不该做：纯数值报表、状态密集的后台；去大色块分区 / 去大数字堆 / 信息压到图下方小字\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「图片卡片流」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「图片卡片流（视觉主体，先被图吸引，而非被数字/色块吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #FBF7F0 / 主文 #2a2620 / 次文 #8a8170 / 强调 #E8843C / 重点 #F2C14E\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 16 / 基准间距 14\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（图片卡片流），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    Agent提示词: "【玻璃拟态风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n毛玻璃浮层。渐变柔、玻璃卡靠透明浮起，层级靠模糊不靠色块；所有卡同款玻璃处理语言统一。重色在背景氛围。 适用：偏展示或需通透感的工具/Landing/控制台。参考：Frost Finance Dashboard、Vaulter、Sales Dashboard。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（淡蓝紫渐变背景 30% / 毛玻璃卡片(半透明白+blur) 60% / 深字 10%）\n  底 --di #F4F3FB（页面唯一画布色）\n  主文字 --zi #26243a\n  次级文字 --cizi #7a769a（副文、导航、页脚）\n  强调 --zhucai #8A8FE5（渐变只铺背景，卡片靠模糊+1px 高光描边浮起——重色在「背景氛围」而非内容块）\n  重点 --zhongdian #C9B6FF（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 18px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 14px 为基准刻度（14 / 28 / 42 / 56）\n2.5 动效 motion：允许柔光/发光（faguang 20），单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：渐变背景铺满 + 毛玻璃卡片浮于其上（告警/容量助手/行程都做玻璃卡）+ 左导航半透明\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 18px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 18px，阴影强度 24（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：渐变背景铺满 + 毛玻璃卡片浮于其上（告警/容量助手/行程都做玻璃卡）+ 左导航半透明\n  删减（明确不做什么）：去实色块分隔 / 去硬边框 / 靠模糊与高光描边做层级\n  内容落点（第一屏看到什么）：渐变背景 + 主玻璃卡（容量助手）直接浮在视觉中心\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 24 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：渐变只铺背景，卡片靠模糊+1px 高光描边浮起——重色在「背景氛围」而非内容块；偏展示或需通透感的工具/Landing/控制台\n  不该做：信息极密、低性能设备（backdrop-blur 吃 GPU）；去实色块分隔 / 去硬边框 / 靠模糊与高光描边做层级\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「玻璃拟态风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「渐变背景 + 主玻璃卡（容量助手）直接浮在视觉中心」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #F4F3FB / 主文 #26243a / 次文 #7a769a / 强调 #8A8FE5 / 重点 #C9B6FF\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 18 / 基准间距 14\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（毛玻璃浮层），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    Agent提示词: "【高密度卡片墙 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n浅色数据墙。淡紫底安静，紫卡跳当前态，彩点标状态；卡片同规格密排栅格节奏统一。重色压「当前态+状态点」。 适用：多指标概览大屏、运维/监控墙（浅色版）。参考：Figma No.160 紫卡仪表盘、Bento Style UI、bento.me。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（淡紫底 70% / 紫(当前态/选中) 15% / 绿/黄/红 状态点 15%）\n  底 --di #121821（页面唯一画布色）\n  主文字 --zi #eaf0f5\n  次级文字 --cizi #9fb0c0（副文、导航、页脚）\n  强调 --zhucai #4CC9B0（紫只标「当前态/选中卡」，状态用绿黄红小圆点——重色压「当前态」+「状态点」）\n  重点 --zhongdian #FFD166（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：15–16px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 12px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 10px 为基准刻度（10 / 20 / 30 / 40）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：bento 多卡密排网格（告警/容量/行程/导航/跳转全压进小卡，间距紧凑）\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 12px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 12px，阴影强度 22（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：bento 多卡密排网格（告警/容量/行程/导航/跳转全压进小卡，间距紧凑）\n  删减（明确不做什么）：去大留白 / 去大色块 / 去长文案，全压成小卡+点\n  内容落点（第一屏看到什么）：整屏卡片墙概览（多指标一屏尽览，先被密度吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 22 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：紫只标「当前态/选中卡」，状态用绿黄红小圆点——重色压「当前态」+「状态点」；多指标概览大屏、运维/监控墙（浅色版）\n  不该做：极简风、低密度展示；去大留白 / 去大色块 / 去长文案，全压成小卡+点\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「高密度卡片墙」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「整屏卡片墙概览（多指标一屏尽览，先被密度吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #121821 / 主文 #eaf0f5 / 次文 #9fb0c0 / 强调 #4CC9B0 / 重点 #FFD166\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 15 / 小标 13；圆角 12 / 基准间距 10\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（浅色数据墙），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    Agent提示词: "【杂志排版风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n杂志栅格。淡蓝灰/近白双底安静，kicker 一点高饱和；字体层级规律统一（标题/副标/正文）。重色压「字体层级+栏目」。 适用：内容/文章/品牌向展示、重阅读体验的页面。参考：Ribbit、Floating Pill Navbar、Cereal。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（淡蓝灰 44% / 近白纸 50% / 高饱和点缀(kicker) 6%）\n  底 --di #FBF6EE（页面唯一画布色）\n  主文字 --zi #1f1b16\n  次级文字 --cizi #7d7464（副文、导航、页脚）\n  强调 --zhucai #C0392B（高饱和色只点 kicker 一处，重色压「字体层级与栏目」而非色块）\n  重点 --zhongdian #1a1a1a（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 6px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：双底色分栏（淡蓝灰/近白）+ 强字体层级（大衬线标题+小无衬线正文）+ 栏宽克制 + 大留白\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 6px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 6px，阴影强度 10（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：双底色分栏（淡蓝灰/近白）+ 强字体层级（大衬线标题+小无衬线正文）+ 栏宽克制 + 大留白\n  删减（明确不做什么）：去色块 / 去卡片描边 / 去状态点，靠字体大小·字重·栏宽做层级\n  内容落点（第一屏看到什么）：大标题 + 导语（杂志式跨页），先被排版节奏吸引而非颜色\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 10 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：高饱和色只点 kicker 一处，重色压「字体层级与栏目」而非色块；内容/文章/品牌向展示、重阅读体验的页面\n  不该做：数据密集后台、需快速扫数的监控；去色块 / 去卡片描边 / 去状态点，靠字体大小·字重·栏宽做层级\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「杂志排版风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「大标题 + 导语（杂志式跨页），先被排版节奏吸引而非颜色」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #FBF6EE / 主文 #1f1b16 / 次文 #7d7464 / 强调 #C0392B / 重点 #1a1a1a\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 6 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（杂志栅格），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    布局骨架: "深色顶带（白字巨标+双蓝链）+ 浅色身体（产品图 + 规格三连）",
    重色落点: "顶带近黑 #1D1D1F 白字；身体白 #FFFFFF；暗底蓝链 #2997FF",
    第一屏内容: "黑顶产品名巨标 + 浅身产品展示 + 规格",
    删减元素: "去导航栏（仅顶带）；去冗杂",
    适用: "Apple 产品页深色头 + 浅身",
    禁忌: "浅底全站",
    参考站: ["Apple"],
    我的说明: "顶部深色压住，奶油主体轻，暖橘 1% 点一处；顶部压条统一贯顶节奏稳定。重色压「顶部重量」。",
    Agent提示词: "【深色压顶风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n顶重压条。顶部深色压住，奶油主体轻，暖橘 1% 点一处；顶部压条统一贯顶节奏稳定。重色压「顶部重量」。 适用：品牌/杂志/高端展示、上重下轻的叙事页。参考：Apple（按产品切深/浅）、Tracking Football（顶深底浅明确分切）。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（深色(顶部压条/导航) 37% / 奶油底(主体) 62% / 暖橘(点缀) 1%）\n  底 --di #0E0E14（页面唯一画布色）\n  主文字 --zi #ffffff\n  次级文字 --cizi #a7a7b5（副文、导航、页脚）\n  强调 --zhucai #FF5C8A（重色在「顶部压条」（上重下轻），暖橘只点 1 处——重色压「顶部重量」）\n  重点 --zhongdian #FFD166（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 14px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：允许柔光/发光（faguang 30），单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：顶部深色压条横跨（导航/品牌）+ 下方奶油色主体内容 + 暖橘只点 1 处\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 14px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 14px，阴影强度 28（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：顶部深色压条横跨（导航/品牌）+ 下方奶油色主体内容 + 暖橘只点 1 处\n  删减（明确不做什么）：去整页深底 / 去多色 / 去色块墙，只顶部一块深\n  内容落点（第一屏看到什么）：深色顶部（品牌/导航先入眼）+ 奶油主体主内容\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 28 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：重色在「顶部压条」（上重下轻），暖橘只点 1 处——重色压「顶部重量」；品牌/杂志/高端展示、上重下轻的叙事页\n  不该做：全屏深色控制台、需暗色护眼的后台；去整页深底 / 去多色 / 去色块墙，只顶部一块深\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「深色压顶风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「深色顶部（品牌/导航先入眼）+ 奶油主体主内容」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #0E0E14 / 主文 #ffffff / 次文 #a7a7b5 / 强调 #FF5C8A / 重点 #FFD166\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 14 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（顶重压条），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-深色压顶风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·Apple 深色压顶风</title>
<style>
:root{
  --di:#FFFFFF;
  --top:#1D1D1F;
  --zi:#1D1D1F;
  --cizi:#6E6E73;
  --zibai:#F5F5F7;
  --lian:#2997FF;
  --yuanjiao:18px;
  --jianju:16px;
  --zihao:17px;
  --liubai:30px;
  --yinying:12;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
.topband{background:var(--top);color:#fff;padding:48px 20px var(--liubai);text-align:center;}
.topband .eyebrow{font-size:calc(var(--zihao)*1.2);font-weight:600;color:#fff;opacity:.85;}
.topband .h1{font-size:calc(var(--zihao)*3.4);font-weight:700;letter-spacing:-1.5px;margin-top:4px;}
.topband .sub{margin-top:12px;font-size:calc(var(--zihao)*1.25);color:#d6d6da;font-weight:400;}
.topband .links{margin-top:18px;display:flex;gap:26px;justify-content:center;font-size:calc(var(--zihao)*1);}
.topband .links a{color:var(--lian);text-decoration:none;}
.topband .links a:hover{text-decoration:underline;}
.body{background:var(--di);padding:48px 20px 60px;text-align:center;}
.showcase{width:min(760px,92vw);aspect-ratio:16/9;margin:0 auto;border-radius:var(--yuanjiao);background:linear-gradient(135deg,#e9e9ee,#cfcfd6);box-shadow:0 calc(var(--yinying)*1px) calc(var(--yinying)*3px) rgba(0,0,0,.1);}
.specs{display:flex;gap:40px;justify-content:center;margin-top:40px;flex-wrap:wrap;}
.specs .s{text-align:center;}
.specs .s b{display:block;font-size:calc(var(--zihao)*1.8);font-weight:700;}
.specs .s span{font-size:13px;color:var(--cizi);}
</style>
</head>
<body>
<section class="topband">
  <div class="eyebrow">MacBook Air</div>
  <div class="h1">轻，到极致。</div>
  <div class="sub">M5 芯片，全天候续航，重新定义便携。</div>
  <div class="links"><a href="#">了解更多 ›</a><a href="#">购买 ›</a></div>
</section>
<section class="body">
  <div class="showcase"></div>
  <div class="specs">
    <div class="s"><b>1.24 kg</b><span>轻巧机身</span></div>
    <div class="s"><b>18 hr</b><span>视频续航</span></div>
    <div class="s"><b>M5</b><span>强劲芯片</span></div>
  </div>
</section>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
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
      {键:"lian",名:"暗底蓝链",类型:"color",默认:"#2997FF"},
      {键:"liubai",名:"顶带留白",类型:"slider",默认:30,最小:16,最大:60,步长:2},
      {键:"zihao",名:"基准字号",类型:"slider",默认:17,最小:12,最大:22,步长:1},
      {键:"yuanjiao",名:"产品图圆角",类型:"slider",默认:18,最小:0,最大:40,步长:1}
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
    布局骨架: "暖白全屏居中 + eyebrow + 巨标 + 副文 + 双蓝链 + 胶囊 CTA + 产品图占位",
    重色落点: "暖白 #F5F5F7；近黑 #1D1D1F；蓝链 #0066CC",
    第一屏内容: "产品名巨标 + 双蓝链（了解更多/购买）+ 选购按钮",
    删减元素: "去边框；去多余模块；极致留白",
    适用: "Apple 式产品发布/品牌页",
    禁忌: "信息密集页",
    参考站: ["Apple"],
    我的说明: "暖米大面积留白，唯一橙 CTA 跳出来；单栏 Z 型动线，一个焦点。重色压「一处行动」而非分区。",
    Agent提示词: "【暖调留白型 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n单栏落地页(Z型)。暖米大面积留白，唯一橙 CTA 跳出来；单栏 Z 型动线，一个焦点。重色压「一处行动」而非分区。 适用：品牌首页/作品集/个人站落地页，重呼吸感与转化。参考：Apple 产品页(暖白)、Aesop、Kinfolk。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（暖米底 80% / 暖橙(唯一CTA) 8% / 墨字 12%）\n  底 --di #FBF4EC（页面唯一画布色）\n  主文字 --zi #3a2e25\n  次级文字 --cizi #9b8a78（副文、导航、页脚）\n  强调 --zhucai #C2683F（暖橙只压在唯一主 CTA 上，全站其余皆墨字/留白——重色压「一处行动」）\n  重点 --zhongdian #E0A96D（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 20px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 16px 为基准刻度（16 / 32 / 48 / 64）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：居中单栏落地页：大标题 + 一句价值主张 + 唯一实心 CTA + 一个文字次链（Z 型视觉动线）\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 20px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 20px，阴影强度 16（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：居中单栏落地页：大标题 + 一句价值主张 + 唯一实心 CTA + 一个文字次链（Z 型视觉动线）\n  删减（明确不做什么）：去色块墙 / 去多卡 / 去状态点，只留一处行动\n  内容落点（第一屏看到什么）：大标题 + 价值主张 + 主 CTA，先被留白和那一个橙按钮吸引\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 16 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：暖橙只压在唯一主 CTA 上，全站其余皆墨字/留白——重色压「一处行动」；品牌首页/作品集/个人站落地页，重呼吸感与转化\n  不该做：信息极密后台、需快速扫数的监控；去色块墙 / 去多卡 / 去状态点，只留一处行动\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「暖调留白型」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「大标题 + 价值主张 + 主 CTA，先被留白和那一个橙按钮吸引」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #FBF4EC / 主文 #3a2e25 / 次文 #9b8a78 / 强调 #C2683F / 重点 #E0A96D\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 20 / 基准间距 16\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（单栏落地页(Z型)），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-暖调留白型.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·Apple 暖调留白型</title>
<style>
:root{
  --di:#F5F5F7;
  --zi:#1D1D1F;
  --cizi:#6E6E73;
  --lian:#0066CC;
  --zhucai:#1D1D1F;
  --yuanjiao:980px;
  --jianju:16px;
  --zihao:17px;
  --liubai:90px;
  --yinying:10;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:var(--liubai) 20px;}
.eyebrow{font-size:calc(var(--zihao)*1.4);font-weight:600;color:var(--zi);margin-bottom:6px;}
.h1{font-size:calc(var(--zihao)*4);font-weight:700;letter-spacing:-2px;line-height:1.05;}
.sub{margin-top:14px;font-size:calc(var(--zihao)*1.5);color:var(--cizi);font-weight:500;}
.links{margin-top:22px;display:flex;gap:28px;justify-content:center;font-size:calc(var(--zihao)*1.05);}
.links a{color:var(--lian);text-decoration:none;}
.links a:hover{text-decoration:underline;}
.cta{margin-top:30px;background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:12px 26px;font-size:calc(var(--zihao)*.95);font-weight:500;cursor:pointer;}
.visual{margin-top:42px;width:min(560px,86vw);aspect-ratio:16/10;border-radius:18px;background:linear-gradient(135deg,#E8E8ED,#C9C9D0);box-shadow:0 calc(var(--yinying)*1px) calc(var(--yinying)*3px) rgba(0,0,0,.12);}
</style>
</head>
<body>
<div class="eyebrow">栖屋家居</div>
<div class="h1">静，成为一种设计</div>
<div class="sub">更少，更久，更耐看。</div>
<div class="links">
  <a href="#">了解更多 ›</a>
  <a href="#">购买 ›</a>
</div>
<button class="cta">选购系列</button>
<div class="visual"></div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
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
      {键:"lian",名:"蓝链",类型:"color",默认:"#0066CC"},
      {键:"liubai",名:"留白",类型:"slider",默认:90,最小:40,最大:160,步长:4},
      {键:"zihao",名:"基准字号",类型:"slider",默认:17,最小:12,最大:22,步长:1},
      {键:"yuanjiao",名:"胶囊圆角",类型:"slider",默认:980,最小:8,最大:999,步长:1}
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
    Agent提示词: "【强对比视觉型 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n瑞士分屏海报。黑白直接硬碰最强烈；红一点在核心处跳；3px 硬边统一全站。重色压「硬对比+一点红」。 适用：极简/宣言式/强调单一信息的页面。参考：Swiss Style、Herbert Bayer 版式、Stripe 旧版黑底白字。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（纯黑(左板) 45% / 纯白(右板) 50% / 警示红(点睛) 5%）\n  底 --di #0a0a0a（页面唯一画布色）\n  主文字 --zi #ffffff\n  次级文字 --cizi #cfcfcf（副文、导航、页脚）\n  强调 --zhucai #FFE600（黑白硬碰，红只点「核心」一处——重色压「硬对比+一点红」）\n  重点 --zhongdian #111111（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 4px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：左右分屏：左黑面板白大字宣言，右白面板内容；红只点「核心」一处，3px 硬边无圆角无阴影\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 4px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 4px，阴影强度 14（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：左右分屏：左黑面板白大字宣言，右白面板内容；红只点「核心」一处，3px 硬边无圆角无阴影\n  删减（明确不做什么）：去灰阶过渡 / 去圆角 / 去阴影，纯平硬边\n  内容落点（第一屏看到什么）：左黑宣言板 + 右白内容板（先被硬边分切和一点红吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 14 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：黑白硬碰，红只点「核心」一处——重色压「硬对比+一点红」；极简/宣言式/强调单一信息的页面\n  不该做：柔和品牌、多信息层级；去灰阶过渡 / 去圆角 / 去阴影，纯平硬边\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「强对比视觉型」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「左黑宣言板 + 右白内容板（先被硬边分切和一点红吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #0a0a0a / 主文 #ffffff / 次文 #cfcfcf / 强调 #FFE600 / 重点 #111111\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 4 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（瑞士分屏海报），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    Agent提示词: "【冷调科技型 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n深色数据墙。深蓝底冷静，青色高亮跳数据；面板线统一分隔。重色压「冷色高亮」。霓虹=开发光参数。 适用：数据/运维/科技产品后台（暗色）。参考：Vercel、Linear(暗色)、Supabase、Cyberpunk 2077 UI(发光变体)。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（深蓝底 80% / 冰蓝/青(主色) 15% / 面板线 5%）\n  底 --di #0A0E1A（页面唯一画布色）\n  主文字 --zi #e8f4f8\n  次级文字 --cizi #8fa6b8（副文、导航、页脚）\n  强调 --zhucai #39D0D8（青色只点「当前态/告警」与数据，深蓝托底——重色压「冷色高亮」；发光参数>0 即霓虹态）\n  重点 --zhongdian #5B8CFF（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 12px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：允许柔光/发光（faguang 40），单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：深蓝底 + 左导航 + 多面板数据墙（青色只点当前态/告警/数据）；f015 霓虹赛博已并入本方案作「发光」变体\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 12px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 12px，阴影强度 20（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：深蓝底 + 左导航 + 多面板数据墙（青色只点当前态/告警/数据）；f015 霓虹赛博已并入本方案作「发光」变体\n  删减（明确不做什么）：去暖色 / 去渐变花哨 / 去留白\n  内容落点（第一屏看到什么）：深蓝控制台 + 青色高亮数据墙（先被冷色科技感吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 20 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：青色只点「当前态/告警」与数据，深蓝托底——重色压「冷色高亮」；发光参数>0 即霓虹态；数据/运维/科技产品后台（暗色）\n  不该做：暖色品牌、柔和展示；去暖色 / 去渐变花哨 / 去留白\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「冷调科技型」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「深蓝控制台 + 青色高亮数据墙（先被冷色科技感吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #0A0E1A / 主文 #e8f4f8 / 次文 #8fa6b8 / 强调 #39D0D8 / 重点 #5B8CFF\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 12 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（深色数据墙），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    Agent提示词: "【自然有机型 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n有机侧栏+主卡。米白安静，叶绿温润跳主指标；大圆角统一全站有机感。重色压「自然主色」。 适用：环保/生活/健康类品牌站。参考：Patagonia、Notion 自然风、Garden 类站点。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（米白底 75% / 叶绿(主) 15% / 陶土(点缀) 10%）\n  底 --di #F3F1E7（页面唯一画布色）\n  主文字 --zi #2c3326\n  次级文字 --cizi #7e886f（副文、导航、页脚）\n  强调 --zhucai #5B8C5A（叶绿压主指标，圆角有机感——重色压「自然主色」）\n  重点 --zhongdian #A7C957（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 22px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 16px 为基准刻度（16 / 32 / 48 / 64）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：左窄有机圆角导航 + 右主卡（大叶绿数字+有机斑驳底）+ 下方支撑列表；大圆角统一\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 22px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 22px，阴影强度 14（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：左窄有机圆角导航 + 右主卡（大叶绿数字+有机斑驳底）+ 下方支撑列表；大圆角统一\n  删减（明确不做什么）：去直角硬边 / 去高饱和 / 去密集网格\n  内容落点（第一屏看到什么）：米白 + 叶绿大数字（自然呼吸，先被圆润叶绿吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 14 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：叶绿压主指标，圆角有机感——重色压「自然主色」；环保/生活/健康类品牌站\n  不该做：科技冷感、极简工业；去直角硬边 / 去高饱和 / 去密集网格\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「自然有机型」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「米白 + 叶绿大数字（自然呼吸，先被圆润叶绿吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #F3F1E7 / 主文 #2c3326 / 次文 #7e886f / 强调 #5B8C5A / 重点 #A7C957\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 22 / 基准间距 16\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（有机侧栏+主卡），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    Agent提示词: "【复古胶片型 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n胶片横滚长廊。胶片米安静，砖红小标签跳；齿孔+颗粒统一全站怀旧语感。重色压「胶片质感」。 适用：摄影/文创/怀旧品牌。参考：FilmSupply、VSCO、复古海报排版。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（胶片米 78% / 棕调(主) 18% / 砖红(点睛) 4%）\n  底 --di #2A211A（页面唯一画布色）\n  主文字 --zi #F2E9DD\n  次级文字 --cizi #b89c82（副文、导航、页脚）\n  强调 --zhucai #C77B3B（砖红只点标签/告警，整体蒙一层胶片颗粒——重色压「胶片质感」）\n  重点 --zhongdian #E8A85C（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 8px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：横向滚动胶片长廊：一排「胶片帧」（带齿孔）展示内容，砖红只点标签；整体蒙颗粒\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 8px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 8px，阴影强度 18（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：横向滚动胶片长廊：一排「胶片帧」（带齿孔）展示内容，砖红只点标签；整体蒙颗粒\n  删减（明确不做什么）：去纯白 / 去高亮 / 去现代圆角，靠颗粒+虚线\n  内容落点（第一屏看到什么）：胶片质感 + 横向帧长廊（先被怀旧颗粒与横滚吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 18 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：砖红只点标签/告警，整体蒙一层胶片颗粒——重色压「胶片质感」；摄影/文创/怀旧品牌\n  不该做：现代科技感、明亮清爽；去纯白 / 去高亮 / 去现代圆角，靠颗粒+虚线\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「复古胶片型」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「胶片质感 + 横向帧长廊（先被怀旧颗粒与横滚吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #2A211A / 主文 #F2E9DD / 次文 #b89c82 / 强调 #C77B3B / 重点 #E8A85C\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 8 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（胶片横滚长廊），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    Agent提示词: "【中式水墨型 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n水墨非对称。宣纸大面积留白，墨字沉稳，朱印一点跳；细线+衬线统一传统语感。重色压「一点朱印」。 适用：文化/国学/茶/传统品牌。参考：故宫/茶颜悦色、汉字文化站、宣纸风排版。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（宣纸白 85% / 墨黑(字/线) 13% / 朱印红(点睛) 2%）\n  底 --di #F5F1E8（页面唯一画布色）\n  主文字 --zi #23201a\n  次级文字 --cizi #8c8576（副文、导航、页脚）\n  强调 --zhucai #9E2B25（朱印红只点「重点」印章，大面积宣纸+墨字——重色压「一点朱印」）\n  重点 --zhongdian #1c1c1c（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 4px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 14px 为基准刻度（14 / 28 / 42 / 56）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：非对称栅格：左侧竖排大标题（writing-mode vertical-rl）+ 右侧内容；朱印只点重点，右上印章\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 4px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 4px，阴影强度 8（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：非对称栅格：左侧竖排大标题（writing-mode vertical-rl）+ 右侧内容；朱印只点重点，右上印章\n  删减（明确不做什么）：去色块 / 去圆角 / 去阴影，靠留白+细线+衬线\n  内容落点（第一屏看到什么）：宣纸留白 + 墨色大标题 + 右上朱印（先被留白与印章吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 8 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：朱印红只点「重点」印章，大面积宣纸+墨字——重色压「一点朱印」；文化/国学/茶/传统品牌\n  不该做：现代科技、活泼卡通；去色块 / 去圆角 / 去阴影，靠留白+细线+衬线\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「中式水墨型」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「宣纸留白 + 墨色大标题 + 右上朱印（先被留白与印章吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #F5F1E8 / 主文 #23201a / 次文 #8c8576 / 强调 #9E2B25 / 重点 #1c1c1c\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 4 / 基准间距 14\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（水墨非对称），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
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
    布局骨架: "暖白居中 + eyebrow + 巨标 + 双蓝链 + 双按钮（购买蓝填充 / 了解灰填充）",
    重色落点: "白底近黑字；购买按钮蓝 #0071E3；了解按钮灰 #E8E8ED；蓝链 #0066CC",
    第一屏内容: "产品名 + 购买/进一步了解双按钮",
    删减元素: "去第三按钮；保持 Apple 双 CTA 范式",
    适用: "Apple 式双 CTA 转化",
    禁忌: "单按钮页",
    参考站: ["Apple"],
    我的说明: "实按钮=行动，虚按钮=了解；二者对比越大转化越清晰。重色压「唯一主行动」。从素材库 a101 迁入并补参数。",
    Agent提示词: "【双按钮 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n转化页开头。实按钮=行动，虚按钮=了解；二者对比越大转化越清晰。重色压「唯一主行动」。从素材库 a101 迁入并补参数。 适用：落地页 / 转化页开头。参考：Apple 官网、Stripe 落地页。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（页面底 70% / 实心按钮(主强调) 12% / 描边按钮(弱化) 10% / 步骤卡底 8%）\n  底 --di #ffffff（页面唯一画布色）\n  主文字 --zi #1a1a1a\n  次级文字 --cizi #6f6a5e（副文、导航、页脚）\n  强调 --zhucai #1a1a1a（实心按钮永远比描边按钮显眼（更深/更大/带阴影）——重色压「唯一主行动」）\n  重点 --zhongdian #ddd8ce（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：15–16px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 12px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：转化页开头：大标题 + 一句目的 + 双按钮（虚按钮「进一步了解」+ 实按钮「立即使用」）+ 三步说明卡\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 12px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 12px，阴影强度 18（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：转化页开头：大标题 + 一句目的 + 双按钮（虚按钮「进一步了解」+ 实按钮「立即使用」）+ 三步说明卡\n  删减（明确不做什么）：去多余装饰 / 去多 CTA 竞争 / 只留一实一虚\n  内容落点（第一屏看到什么）：大标题 + 双按钮（实按钮先被看见），先被那个实心按钮吸引\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 18 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：实心按钮永远比描边按钮显眼（更深/更大/带阴影）——重色压「唯一主行动」；落地页 / 转化页开头\n  不该做：一页塞多个同级主按钮；去多余装饰 / 去多 CTA 竞争 / 只留一实一虚\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「双按钮」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「大标题 + 双按钮（实按钮先被看见），先被那个实心按钮吸引」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #ffffff / 主文 #1a1a1a / 次文 #6f6a5e / 强调 #1a1a1a / 重点 #ddd8ce\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 15 / 小标 13；圆角 12 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（转化页开头），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-双按钮.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·Apple 双按钮</title>
<style>
:root{
  --di:#FFFFFF;
  --zi:#1D1D1F;
  --cizi:#6E6E73;
  --lian:#0066CC;
  --zhucai:#0071E3;
  --yuanjiao:980px;
  --jianju:16px;
  --zihao:17px;
  --liubai:80px;
  --yinying:12;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:var(--liubai) 20px;}
.eyebrow{font-size:calc(var(--zihao)*1.3);font-weight:600;margin-bottom:4px;}
.h1{font-size:calc(var(--zihao)*3.6);font-weight:700;letter-spacing:-1.5px;}
.sub{margin-top:12px;font-size:calc(var(--zihao)*1.3);color:var(--cizi);font-weight:400;}
.links{margin-top:18px;font-size:calc(var(--zihao)*1.05);}
.links a{color:var(--lian);text-decoration:none;}
.links a:hover{text-decoration:underline;}
.actions{margin-top:26px;display:flex;gap:16px;justify-content:center;}
.buy{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:13px 28px;font-size:calc(var(--zihao)*1);font-weight:500;cursor:pointer;}
.learn{background:#e8e8ed;color:var(--zi);border:none;border-radius:var(--yuanjiao);padding:13px 28px;font-size:calc(var(--zihao)*1);font-weight:500;cursor:pointer;}
.visual{margin-top:42px;width:min(520px,84vw);aspect-ratio:16/10;border-radius:18px;background:linear-gradient(135deg,#e9e9ee,#cfcfd6);box-shadow:0 calc(var(--yinying)*1px) calc(var(--yinying)*3px) rgba(0,0,0,.1);}
</style>
</head>
<body>
<div class="eyebrow">AirPods 5</div>
<div class="h1">聆听，无界。</div>
<div class="sub">主动降噪，全新登场。</div>
<div class="links"><a href="#">了解更多 ›</a></div>
<div class="actions">
  <button class="buy">购买</button>
  <button class="learn">进一步了解</button>
</div>
<div class="visual"></div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
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
      {键:"zhucai",名:"购买蓝",类型:"color",默认:"#0071E3"},
      {键:"lian",名:"蓝链",类型:"color",默认:"#0066CC"},
      {键:"liubai",名:"留白",类型:"slider",默认:80,最小:40,最大:160,步长:4},
      {键:"zihao",名:"基准字号",类型:"slider",默认:17,最小:12,最大:22,步长:1}
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
    布局骨架: "浅底 + 标题 + 双卡对比（配角浅块 / 主角深块放大投影）",
    重色落点: "白底；主角深块 #1D1D1F 白字；配角浅块 #F5F5F7；蓝链 #0066CC/#2997ff",
    第一屏内容: "视觉重量对比：左轻右重，靠色彩与缩放拉层级",
    删减元素: "去等分；去多余装饰",
    适用: "同屏主次对比、产品矩阵",
    禁忌: "强对称均分需求",
    参考站: ["Apple"],
    我的说明: "先定主角，再给它加重量；闭眼再睁第一眼须落主角。重色压「主角」。从素材库 a102 迁入并补参数。",
    Agent提示词: "【视觉重量 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n主角对照。先定主角，再给它加重量；闭眼再睁第一眼须落主角。重色压「主角」。从素材库 a102 迁入并补参数。 适用：全站通用 · 让最重要的事第一眼被看见。参考：Apple 官网、网页设计方法论。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（页面底 70% / 主角强调(墨黑) 12% / 普通版弱化 10% / 步骤卡底 8%）\n  底 --di #F7F8FA（页面唯一画布色）\n  主文字 --zi #1d2330\n  次级文字 --cizi #7c8696（副文、导航、页脚）\n  强调 --zhucai #2D6CDF（主角版加 2-3 个重量（更大/对比/阴影），普通版刻意弱化——重色压「主角」）\n  重点 --zhongdian #E8C547（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 14px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 14px 为基准刻度（14 / 28 / 42 / 56）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：左右对照：左「普通版」小且灰，右「主角版」大且强调——一眼看出重量差；下方三步说明\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 14px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 14px，阴影强度 20（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：左右对照：左「普通版」小且灰，右「主角版」大且强调——一眼看出重量差；下方三步说明\n  删减（明确不做什么）：去平铺 / 去同权重罗列，强制分出主次\n  内容落点（第一屏看到什么）：左普通右主角的对照（先被右边那个更重的块吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 20 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：主角版加 2-3 个重量（更大/对比/阴影），普通版刻意弱化——重色压「主角」；全站通用 · 让最重要的事第一眼被看见\n  不该做：一页多个等重主角；去平铺 / 去同权重罗列，强制分出主次\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「视觉重量」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「左普通右主角的对照（先被右边那个更重的块吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #F7F8FA / 主文 #1d2330 / 次文 #7c8696 / 强调 #2D6CDF / 重点 #E8C547\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 14 / 基准间距 14\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（主角对照），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-视觉重量.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·Apple 视觉重量</title>
<style>
:root{
  --di:#FFFFFF;
  --zi:#1D1D1F;
  --cizi:#6E6E73;
  --lian:#0066CC;
  --zhong:#1D1D1F;
  --qing:#F5F5F7;
  --yuanjiao:18px;
  --jianju:18px;
  --zihao:17px;
  --fangsuo:1;
  --yinying:12;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;padding:var(--jianju) 40px 60px;}
.head{padding:30px 0 8px;text-align:center;}
.head .eyebrow{font-size:calc(var(--zihao)*1.2);font-weight:600;}
.head .h1{font-size:calc(var(--zihao)*3);font-weight:700;letter-spacing:-1.5px;margin-top:2px;}
.head .sub{font-size:calc(var(--zihao)*1.15);color:var(--cizi);margin-top:8px;}
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:var(--jianju);margin-top:30px;align-items:stretch;}
.card{border-radius:var(--yuanjiao);padding:30px;display:flex;flex-direction:column;}
.card .tag{font-size:12.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--cizi);}
.card .h{font-weight:700;letter-spacing:-1px;margin-top:10px;}
.card .p{font-size:14px;color:var(--cizi);margin-top:10px;line-height:1.55;flex:1;}
.card .lk{margin-top:16px;font-size:14px;}
.card .lk a{color:var(--lian);text-decoration:none;}
.card.normal{background:var(--qing);}
.card.normal .h{font-size:calc(var(--zihao)*2);}
.card.hero{background:var(--zhong);color:#fff;transform:scale(var(--fangsuo));box-shadow:0 calc(var(--yinying)*1.4px) calc(var(--yinying)*4px) rgba(0,0,0,.22);}
.card.hero .tag{color:#a9a9b0;}
.card.hero .p{color:#d6d6da;}
.card.hero .lk a{color:#2997ff;}
.card.hero .h{font-size:calc(var(--zihao)*3.2);}
.note{text-align:center;margin-top:24px;font-size:13px;color:var(--cizi);}
</style>
</head>
<body>
<div class="head">
  <div class="eyebrow">视觉重量</div>
  <div class="h1">同一行里的主次</div>
  <div class="sub">物理上五五分，视觉上让主角更重——重量来自对比，不来自尺寸均等。</div>
</div>
<section class="cmp">
  <div class="card normal">
    <div class="tag">配角</div>
    <div class="h">iPad</div>
    <div class="p">轻量娱乐与随手记录，放在次要位置，不抢视线。</div>
    <div class="lk"><a href="#">了解更多 ›</a></div>
  </div>
  <div class="card hero">
    <div class="tag">主角</div>
    <div class="h">MacBook Pro</div>
    <div class="p">深色块面 + 放大字号 + 投影，自然成为视线落点。专业创作的主力机。</div>
    <div class="lk"><a href="#">购买 ›</a></div>
  </div>
</section>
<div class="note">左轻右重，靠色彩与缩放拉出层级，而非平分空间。</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',fangsuo:''};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
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
      {键:"fangsuo",名:"主角缩放",类型:"slider",默认:1,最小:0.8,最大:1.3,步长:0.05},
      {键:"jianju",名:"卡间距",类型:"slider",默认:18,最小:8,最大:32,步长:1},
      {键:"zihao",名:"基准字号",类型:"slider",默认:17,最小:12,最大:22,步长:1},
      {键:"yuanjiao",名:"圆角",类型:"slider",默认:18,最小:8,最大:40,步长:1}
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
    布局骨架: "吸顶导航（Research 置首）+ 居中对话 Hero + 四张产品入口卡（ChatGPT/Sora/API/Research）",
    重色落点: "白底近黑字；绿 #10A37F 作入口链接强调；卡片描边 #E3E3E3",
    第一屏内容: "对话 Hero + 产品动线卡片网格，引导从对话到研发",
    删减元素: "无定价墙；卡片不堆功能列表",
    适用: "平台型官网首页，多产品动线展示",
    禁忌: "单产品落地页",
    参考站: ["OpenAI"],
    我的说明: "导航 + 首屏 = 完整门面；导航首项写品牌关键词，首屏讲清你是干嘛的。",
    Agent提示词: "【首页动线 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n导航 + 首屏门面。导航 + 首屏 = 完整门面；导航首项写品牌关键词，首屏讲清你是干嘛的。 适用：所有需要「门面感」的官网首页。参考：OpenAI、Apple、Linear。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（品牌色 58% / 内容底 30% / 强调色 12%）\n  底 --di #FFFFFF（页面唯一画布色）\n  主文字 --zi #1d1a2b\n  次级文字 --cizi #7b7596（副文、导航、页脚）\n  强调 --zhucai #6D5BD0（导航 CTA 与首屏实按钮同用品牌色，视觉重量压在右视觉块）\n  重点 --zhongdian #A78BFA（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 14px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 14px 为基准刻度（14 / 28 / 42 / 56）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：顶部导航（Logo + 菜单 + CTA）+ 首屏左文右视觉，导航首项即品牌词\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 14px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 14px，阴影强度 18（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：顶部导航（Logo + 菜单 + CTA）+ 首屏左文右视觉，导航首项即品牌词\n  删减（明确不做什么）：去多余栏目、去装饰线\n  内容落点（第一屏看到什么）：导航 + 大标题 + 双按钮 + 右侧视觉块\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 18 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：导航 CTA 与首屏实按钮同用品牌色，视觉重量压在右视觉块；所有需要「门面感」的官网首页\n  不该做：信息流 / 后台；去多余栏目、去装饰线\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「首页动线」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「导航 + 大标题 + 双按钮 + 右侧视觉块」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #FFFFFF / 主文 #1d1a2b / 次文 #7b7596 / 强调 #6D5BD0 / 重点 #A78BFA\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 14 / 基准间距 14\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（导航 + 首屏门面），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-首页动线.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·OpenAI 首页动线</title>
<style>
:root{
  --di:#FFFFFF;
  --zi:#0D0D0D;
  --cizi:#5D5D5D;
  --bian:#E3E3E3;
  --zhongdian:#10A37F;
  --yuanjiao:18px;
  --jianju:16px;
  --zihao:16px;
  --liubai:64px;
  --yinying:10;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Söhne","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;display:flex;flex-direction:column;}
.nav{display:flex;align-items:center;gap:var(--jianju);padding:16px 40px;border-bottom:1px solid #F0F0F0;position:sticky;top:0;background:rgba(255,255,255,.9);backdrop-filter:blur(8px);}
.logo{font-weight:700;font-size:20px;}
.nav-links{display:flex;gap:24px;margin-left:18px;font-size:14px;color:var(--cizi);}
.nav-links a{color:inherit;text-decoration:none;}
.nav-links a:first-child{color:var(--zi);font-weight:600;}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:18px;font-size:14px;}
.nav-right a{color:var(--cizi);text-decoration:none;}
.btn-dark{background:var(--zi);color:#fff;border:none;border-radius:999px;padding:9px 18px;font-weight:600;cursor:pointer;}
.hero{padding:calc(var(--liubai)*.7) 40px;text-align:center;}
.kicker{font-size:13px;color:var(--cizi);margin-bottom:14px;}
.h1{font-size:calc(var(--zihao)*2.4);font-weight:700;letter-spacing:-1px;line-height:1.18;max-width:16em;margin:0 auto 30px;}
.box{width:min(640px,92vw);margin:0 auto;background:#fff;border:1px solid var(--bian);border-radius:var(--yuanjiao);padding:15px 18px;display:flex;align-items:center;gap:12px;box-shadow:0 calc(var(--yinying)*.4px) calc(var(--yinying)*1.3px) rgba(0,0,0,.06);}
.box input{flex:1;border:none;outline:none;font-size:calc(var(--zihao)*1.05);background:transparent;font-family:inherit;}
.box .send{width:32px;height:32px;border-radius:50%;background:var(--zi);color:#fff;border:none;cursor:pointer;}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--jianju);padding:calc(var(--liubai)*.6) 40px var(--liubai);max-width:1100px;margin:0 auto;width:100%;}
.card{border:1px solid var(--bian);border-radius:var(--yuanjiao);padding:22px 20px;background:#fff;}
.card .ic{width:34px;height:34px;border-radius:9px;background:#F2F2F2;display:grid;place-items:center;font-size:17px;margin-bottom:14px;}
.card h3{font-size:15px;margin-bottom:6px;}
.card p{font-size:13px;color:var(--cizi);line-height:1.5;}
.card a{display:inline-block;margin-top:12px;font-size:13px;color:var(--zhongdian);text-decoration:none;font-weight:600;}
</style>
</head>
<body>
<nav class="nav">
  <div class="logo">OpenAI</div>
  <div class="nav-links">
    <a href="#">Research</a><a href="#">Products</a><a href="#">Business</a><a href="#">Developers</a><a href="#">Company</a>
  </div>
  <div class="nav-right">
    <a href="#">Log in</a>
    <button class="btn-dark">Try ChatGPT</button>
  </div>
</nav>
<main class="hero">
  <div class="kicker">一个平台，覆盖从对话到研发的完整动线</div>
  <div class="h1">把想法，变成可以交付的成果</div>
  <div class="box">
    <input placeholder="给 ChatGPT 发消息">
    <button class="send">↑</button>
  </div>
</main>
<section class="cards">
  <div class="card"><div class="ic">💬</div><h3>ChatGPT</h3><p>问答、写作、分析、编程一站式对话助手。</p><a href="#">开始对话 →</a></div>
  <div class="card"><div class="ic">🎬</div><h3>Sora</h3><p>用文字生成视频，把脚本直接变成画面。</p><a href="#">了解 Sora →</a></div>
  <div class="card"><div class="ic">🔌</div><h3>API Platform</h3><p>把模型能力接进你自己的产品与流程。</p><a href="#">查看文档 →</a></div>
  <div class="card"><div class="ic">🧪</div><h3>Research</h3><p>前沿对齐与安全研究，公开可查。</p><a href="#">阅读论文 →</a></div>
</section>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
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
      {键:"zhongdian",名:"强调绿",类型:"color",默认:"#10A37F"},
      {键:"liubai",名:"留白",类型:"slider",默认:64,最小:30,最大:140,步长:4},
      {键:"yuanjiao",名:"卡片圆角",类型:"slider",默认:18,最小:8,最大:36,步长:1},
      {键:"zihao",名:"基准字号",类型:"slider",默认:16,最小:12,最大:22,步长:1}
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
    布局骨架: "浅底 + 三段动效节奏帧（不同缓动曲线演示）+ 图例",
    重色落点: "浅底 #F8F8F8；橙 #FF9667 / 紫 #6C5CE7 / 绿 #2DCB73 三条曲线色",
    第一屏内容: "动效节奏三段对比 + 图例",
    删减元素: "深底；复杂布局",
    适用: "动效/交互规范展示、微交互说明",
    禁忌: "静态内容页",
    参考站: ["Awwwards"],
    我的说明: "动效不是装饰，是节奏——入场抓眼、悬停回应、滚动推进。",
    Agent提示词: "【动效节奏 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n动效节奏演示。动效不是装饰，是节奏——入场抓眼、悬停回应、滚动推进。 适用：需要「动起来才有感觉」的页面。参考：Awwwards、ReactBits。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（暗底 70% / 渐变主 18% / 渐变辅 12%）\n  底 --di #0D0B14（页面唯一画布色）\n  主文字 --zi #F3EEFF\n  次级文字 --cizi #a99fce（副文、导航、页脚）\n  强调 --zhucai #FF7A59（渐变主色压在胶片条当前帧，说明卡用次级底）\n  重点 --zhongdian #7C5CFF（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 14px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：允许柔光/发光（faguang 35），单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：横向胶片条展示「入场 / 悬停 / 滚动」三段节奏，配说明卡\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 14px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 14px，阴影强度 18（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：横向胶片条展示「入场 / 悬停 / 滚动」三段节奏，配说明卡\n  删减（明确不做什么）：去静态大图、去多余文案\n  内容落点（第一屏看到什么）：节奏总览 + 三段横向演示条\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 18 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：渐变主色压在胶片条当前帧，说明卡用次级底；需要「动起来才有感觉」的页面\n  不该做：极简文字站；去静态大图、去多余文案\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「动效节奏」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「节奏总览 + 三段横向演示条」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #0D0B14 / 主文 #F3EEFF / 次文 #a99fce / 强调 #FF7A59 / 重点 #7C5CFF\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 14 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（动效节奏演示），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-动效节奏.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·Awwwards 动效节奏</title>
<style>
:root{
  --di:#F8F8F8;
  --zi:#222222;
  --cizi:#8A8A8A;
  --bian:#EDEDED;
  --zhongdian:#FF9667;
  --speed:1;
  --jiange:18px;
  --zihao:16px;
  --liubai:40px;
  --yinying:14;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Inter","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;padding:var(--liubai) 40px 60px;}
.head{display:flex;align-items:baseline;gap:12px;margin-bottom:8px;}
.head h1{font-size:calc(var(--zihao)*1.8);font-weight:800;letter-spacing:-.5px;}
.head .tag{font-size:12.5px;color:var(--cizi);text-transform:uppercase;letter-spacing:1.5px;}
.sub{font-size:13.5px;color:var(--cizi);margin-bottom:28px;}
.frames{display:flex;flex-direction:column;gap:var(--jiange);}
.frame{background:#fff;border:1px solid var(--bian);border-radius:14px;padding:22px 24px;display:flex;align-items:center;gap:20px;overflow:hidden;}
.frame .lab{width:120px;flex:none;font-size:13px;color:var(--cizi);}
.frame .lab b{display:block;color:var(--zi);font-size:14px;font-weight:600;margin-bottom:2px;}
.track{flex:1;height:14px;background:#F0F0F0;border-radius:999px;position:relative;overflow:hidden;}
.dot{position:absolute;top:50%;left:0;width:14px;height:14px;border-radius:50%;background:var(--zhongdian);transform:translateY(-50%);animation:run calc(2.4s / var(--speed)) ease-in-out infinite alternate;}
@keyframes run{from{left:0;transform:translate(0,-50%)}to{left:calc(100% - 14px);transform:translate(0,-50%)}}
.f2 .dot{animation-timing-function:cubic-bezier(.34,1.56,.64,1);background:#6C5CE7;}
.f3 .dot{animation-timing-function:linear;background:#2DCB73;}
.legend{margin-top:26px;display:flex;gap:18px;font-size:12.5px;color:var(--cizi);flex-wrap:wrap;}
.legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:middle;}
</style>
</head>
<body>
<div class="head"><h1>动效节奏</h1><span class="tag">Motion · Awwwards</span></div>
<div class="sub">同一段位移，用不同缓动曲线，节奏感完全不同——这是陈列型站点的微交互灵魂。</div>
<section class="frames">
  <div class="frame f1"><div class="lab"><b>ease-in-out</b>平滑往返</div><div class="track"><span class="dot"></span></div></div>
  <div class="frame f2"><div class="lab"><b>back 回弹</b>果冻过冲</div><div class="track"><span class="dot"></span></div></div>
  <div class="frame f3"><div class="lab"><b>linear</b>匀速线性</div><div class="track"><span class="dot"></span></div></div>
</section>
<div class="legend">
  <span><i style="background:#FF9667"></i>ease-in-out</span>
  <span><i style="background:#6C5CE7"></i>back / 回弹</span>
  <span><i style="background:#2DCB73"></i>linear</span>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={jiange:'px',zihao:'px',liubai:'px',speed:''};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
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
      {键:"speed",名:"速度",类型:"slider",默认:1,最小:0.3,最大:3,步长:0.1},
      {键:"jiange",名:"帧间距",类型:"slider",默认:18,最小:8,最大:40,步长:1},
      {键:"zihao",名:"基准字号",类型:"slider",默认:16,最小:12,最大:22,步长:1},
      {键:"liubai",名:"留白",类型:"slider",默认:40,最小:20,最大:80,步长:2}
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
    布局骨架: "浅底导航 + 非对称揭示 Hero（巨标 + 悬停揭示层）+ 项目网格",
    重色落点: "浅底 #F8F8F8；橙 #FF9667 揭示层；分隔 #EDEDED",
    第一屏内容: "巨标「探索未知的边界」+ 右上悬停揭示层 + 项目网格",
    删减元素: "深底；规整对称",
    适用: "创意机构/作品站首屏探索式布局",
    禁忌: "传统企业官网",
    参考站: ["Awwwards"],
    我的说明: "首屏不是陈列，是邀请——用留白和揭示图勾起「点进去看看」的冲动。",
    Agent提示词: "【整站首屏探索 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n整站首屏 · 探索发现。首屏不是陈列，是邀请——用留白和揭示图勾起「点进去看看」的冲动。 适用：作品集 / 产品探索页。参考：Interactive Discovery、Awwwards。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（深底 68% / 品牌叠 20% / 揭示叠 12%）\n  底 --di #12100c（页面唯一画布色）\n  主文字 --zi #FBF4E9\n  次级文字 --cizi #b9a489（副文、导航、页脚）\n  强调 --zhucai #E8702A（右侧揭示图用品牌叠色，与左侧大字形成轻重对照）\n  重点 --zhongdian #1b1206（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 10px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 14px 为基准刻度（14 / 28 / 42 / 56）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：非对称首屏：大字标题居左，右侧揭示图叠品牌色，留出探索感\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 10px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 10px，阴影强度 16（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：非对称首屏：大字标题居左，右侧揭示图叠品牌色，留出探索感\n  删减（明确不做什么）：去传统菜单堆、去多栏\n  内容落点（第一屏看到什么）：探索式大标题 + 揭示视觉 + 单 CTA\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 16 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：右侧揭示图用品牌叠色，与左侧大字形成轻重对照；作品集 / 产品探索页\n  不该做：信息密集后台；去传统菜单堆、去多栏\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「整站首屏探索」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「探索式大标题 + 揭示视觉 + 单 CTA」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #12100c / 主文 #FBF4E9 / 次文 #b9a489 / 强调 #E8702A / 重点 #1b1206\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 10 / 基准间距 14\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（整站首屏 · 探索发现），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-整站首屏探索.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·Awwwards 整站首屏探索</title>
<style>
:root{
  --di:#F8F8F8;
  --zi:#222222;
  --cizi:#8A8A8A;
  --bian:#EDEDED;
  --zhongdian:#FF9667;
  --tuodian:120px;
  --mo:40px;
  --zihao:16px;
  --liubai:40px;
  --yinying:14;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Inter","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;padding-bottom:var(--liubai);}
.nav{display:flex;align-items:center;gap:16px;padding:18px 40px;border-bottom:1px solid var(--bian);}
.logo{font-weight:800;font-size:19px;}
.nav-links{display:flex;gap:24px;margin-left:18px;font-size:14px;color:var(--cizi);}
.nav-links a{color:inherit;text-decoration:none;}
.nav-right{margin-left:auto;font-size:14px;color:var(--cizi);}
.hero{position:relative;height:calc(60vh + var(--tuodian)*0);min-height:380px;margin:var(--liubai) 40px 0;border-radius:16px;overflow:hidden;background:linear-gradient(120deg,#fff,#f0f0f0);border:1px solid var(--bian);}
.hero .big{position:absolute;left:calc(var(--mo));bottom:calc(var(--mo));font-size:calc(var(--zihao)*4);font-weight:800;letter-spacing:-2px;line-height:.95;max-width:60%;}
.hero .big em{color:var(--zhongdian);font-style:normal;}
.reveal{position:absolute;right:calc(var(--mo));top:calc(var(--mo));width:240px;height:160px;border-radius:12px;background:linear-gradient(135deg,var(--zhongdian),#6C5CE7);opacity:.92;display:grid;place-items:center;color:#fff;font-weight:700;font-size:15px;box-shadow:0 calc(var(--yinying)*.6px) calc(var(--yinying)*1.6px) rgba(0,0,0,.12);}
.map{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:28px 40px 0;}
.cell{background:#fff;border:1px solid var(--bian);border-radius:12px;aspect-ratio:1/.7;display:grid;place-items:center;color:#bdbdbd;font-size:12.5px;transition:transform .25s ease,border-color .25s ease;}
.cell:hover{transform:translateY(-4px);border-color:var(--zhongdian);color:var(--zhongdian);}
</style>
</head>
<body>
<nav class="nav">
  <div class="logo">Atlas°</div>
  <div class="nav-links"><a href="#">Work</a><a href="#">Studio</a><a href="#">Journal</a><a href="#">Contact</a></div>
  <div class="nav-right">Menu</div>
</nav>
<section class="hero">
  <div class="reveal">悬停揭示层</div>
  <div class="big">探索<em>未知</em>的边界</div>
</section>
<section class="map">
  <div class="cell">项目 01</div><div class="cell">项目 02</div><div class="cell">项目 03</div><div class="cell">项目 04</div>
  <div class="cell">项目 05</div><div class="cell">项目 06</div><div class="cell">项目 07</div><div class="cell">项目 08</div>
</section>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={tuodian:'px',mo:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
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
      {键:"zhongdian",名:"强调橙",类型:"color",默认:"#FF9667"},
      {键:"tuodian",名:"揭示层偏移",类型:"slider",默认:120,最小:0,最大:200,步长:4},
      {键:"mo",名:"边距",类型:"slider",默认:40,最小:10,最大:80,步长:2},
      {键:"zihao",名:"基准字号",类型:"slider",默认:16,最小:12,最大:22,步长:1}
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
    布局骨架: "顶部细导航（Research 置首）+ 居中首屏对话入口 + 圆角输入框 + 快捷标签 + 横向入口行",
    重色落点: "纯白底 #FFFFFF；近黑文字 #0D0D0D；ChatGPT 绿 #10A37F 仅作链接点缀；主 CTA 黑底白字",
    第一屏内容: "「有什么可以帮忙的？」居中巨标 + 圆角输入框（给 ChatGPT 发消息）+ 快捷建议",
    删减元素: "去购买/定价按钮；去营销文案；导航极简",
    适用: "AI 对话/工具类产品首页、对话框式入口",
    禁忌: "电商/强转化售卖页",
    参考站: ["OpenAI"],
    我的说明: "一屏只做一件事：让用户记住这一句话。",
    Agent提示词: "【焦点型 Hero · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n焦点型首屏。一屏只做一件事：让用户记住这一句话。 适用：单点主张 / 活动 / 产品发布。参考：Apple Event、Linear。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（焦点底 62% / 聚光 26% / 文字 12%）\n  底 --di #16121A（页面唯一画布色）\n  主文字 --zi #ffffff\n  次级文字 --cizi #c8b8c4（副文、导航、页脚）\n  强调 --zhucai #FF4D6D（超大标题 + 聚光底色块独大，其余元素减重让位）\n  重点 --zhongdian #FFD6A5（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：17–18px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 16px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 14px 为基准刻度（14 / 28 / 42 / 56）\n2.5 动效 motion：允许柔光/发光（faguang 25），单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：整屏居中焦点：超大标题独占视觉重心，四周大量留白\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 16px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 16px，阴影强度 26（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：整屏居中焦点：超大标题独占视觉重心，四周大量留白\n  删减（明确不做什么）：去导航堆、去侧栏、去一切抢戏\n  内容落点（第一屏看到什么）：焦点大标题 + 一句副文 + 双按钮\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 26 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：超大标题 + 聚光底色块独大，其余元素减重让位；单点主张 / 活动 / 产品发布\n  不该做：多任务页；去导航堆、去侧栏、去一切抢戏\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「焦点型 Hero」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「焦点大标题 + 一句副文 + 双按钮」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #16121A / 主文 #ffffff / 次文 #c8b8c4 / 强调 #FF4D6D / 重点 #FFD6A5\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 17 / 小标 13；圆角 16 / 基准间距 14\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（焦点型首屏），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-焦点型Hero.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·OpenAI 焦点型 Hero</title>
<style>
:root{
  --di:#FFFFFF;
  --zi:#0D0D0D;
  --cizi:#5D5D5D;
  --bian:#E3E3E3;
  --zhongdian:#10A37F;
  --yuanjiao:26px;
  --jianju:16px;
  --zihao:16px;
  --liubai:80px;
  --yinying:8;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Söhne","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;display:flex;flex-direction:column;}
.nav{display:flex;align-items:center;gap:var(--jianju);padding:16px 40px;border-bottom:1px solid #F0F0F0;}
.logo{font-weight:700;font-size:20px;letter-spacing:-.5px;}
.nav-links{display:flex;gap:26px;margin-left:18px;font-size:14px;color:var(--cizi);}
.nav-links a{color:inherit;text-decoration:none;}
.nav-links a:first-child{color:var(--zi);font-weight:600;}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:18px;font-size:14px;}
.nav-right a{color:var(--cizi);text-decoration:none;}
.btn-dark{background:var(--zi);color:#fff;border:none;border-radius:999px;padding:9px 18px;font-weight:600;font-size:14px;cursor:pointer;}
.hero{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:var(--liubai) 20px;}
.kicker{font-size:13px;color:var(--cizi);margin-bottom:16px;letter-spacing:.2px;}
.h1{font-size:calc(var(--zihao)*2.5);font-weight:700;letter-spacing:-1px;margin-bottom:36px;max-width:14em;line-height:1.15;}
.box{width:min(680px,92vw);background:#fff;border:1px solid var(--bian);border-radius:var(--yuanjiao);padding:16px 18px;display:flex;align-items:center;gap:12px;box-shadow:0 calc(var(--yinying)*.4px) calc(var(--yinying)*1.4px) rgba(0,0,0,.06);}
.box input{flex:1;border:none;outline:none;font-size:calc(var(--zihao)*1.05);font-family:inherit;color:var(--zi);background:transparent;}
.box .send{width:34px;height:34px;border-radius:50%;background:var(--zi);color:#fff;border:none;cursor:pointer;display:grid;place-items:center;font-size:15px;}
.quick{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;justify-content:center;}
.chip{border:1px solid var(--bian);border-radius:999px;padding:8px 16px;font-size:13.5px;color:var(--cizi);cursor:pointer;}
.entries{display:flex;gap:30px;margin-top:42px;font-size:14px;flex-wrap:wrap;justify-content:center;}
.entries a{color:var(--zi);text-decoration:none;font-weight:500;}
.entries a:hover{color:var(--zhongdian);}
</style>
</head>
<body>
<nav class="nav">
  <div class="logo">OpenAI</div>
  <div class="nav-links">
    <a href="#">Research</a><a href="#">Products</a><a href="#">Business</a><a href="#">Developers</a><a href="#">Company</a><a href="#">Foundation</a>
  </div>
  <div class="nav-right">
    <a href="#">Log in</a>
    <button class="btn-dark">Try ChatGPT</button>
  </div>
</nav>
<main class="hero">
  <div class="kicker">ChatGPT 可以帮你写作、分析、编程与创作</div>
  <div class="h1">有什么可以帮忙的？</div>
  <div class="box">
    <input placeholder="给 ChatGPT 发消息">
    <button class="send">↑</button>
  </div>
  <div class="quick">
    <div class="chip">总结这段会议录音</div>
    <div class="chip">写一封跟进邮件</div>
    <div class="chip">用 Python 画一张图</div>
  </div>
  <div class="entries">
    <a href="#">Talk with ChatGPT</a>
    <a href="#">Research</a>
    <a href="#">API Platform</a>
    <a href="#">Stories</a>
    <a href="#">More</a>
  </div>
</main>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
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
      {键:"zhongdian",名:"强调绿",类型:"color",默认:"#10A37F"},
      {键:"liubai",名:"留白",类型:"slider",默认:80,最小:40,最大:160,步长:4},
      {键:"yuanjiao",名:"输入框圆角",类型:"slider",默认:26,最小:8,最大:40,步长:1},
      {键:"zihao",名:"基准字号",类型:"slider",默认:16,最小:12,最大:22,步长:1}
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
  正文 17px（由 --zihao 驱动，可调）/ 行高 1.65 / 字距 0
  大标题 display 字重、clamp(32px, 5vw, 64px)
  小标签 14px / 字距 .08em（如「星流 / Starflow」）
  拉丁词（Starflow）可收 -0.04em 负字距
2.3 圆角 rounded
  胶囊 --yuanjiao（默认 999px，可 0–1000 调成直角/胶囊）：一切按钮、标签、控件
  cue 形状外框 10px
2.4 间距 spacing
  段间距 24px（= --jianju × 2.4，--jianju 可调）；内容窄栏最大宽 669px；首屏内边距 26vh；cue 形状区 576px × 80vh 居中
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
  
  :root {
    --bg: var(--di); --fg: var(--zi); --fg-2: #fafafa; --muted: var(--cizi); --meta: #ffffff70;
    --accent: #fff; --accent-on: #000;
    
    --font-display: "HarmonyOS Sans SC", "MiSans", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-body: var(--font-display);
    --text-xs: 13px; --text-sm: 14px; --text-base: var(--zihao); --text-lg: 18px; --text-2xl: 30px; --text-3xl: 48px;
    --leading-body: 1.65;
    
    --tracking-display: 0;
    --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-6: 24px; --space-8: 32px;
    --radius-pill: 9999px;
    --astra-ambient: #23435f; --astra-ambient-opacity: 0.55;
    --astra-glass: #ffffff1f; --astra-copy-max: 669px; --astra-shape-max: 576px;
    --zhucai: #ffffff; --zihao: 17px; --jianju: 10px; --yuanjiao: 999px; --yinying: 0; --faguang: 0;
    --di: #000000; --zi: #ffffff; --cizi: #ffffff99; --zhongdian: #7EC8E3;
    color-scheme: dark;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: var(--bg); color: var(--fg); font: 400 var(--text-base) / var(--leading-body) var(--font-body); letter-spacing: 0; -webkit-font-smoothing: antialiased; }

  
  .stage { position: fixed; inset: 0; z-index: 0; background: var(--bg); }
  #starCanvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
  
  canvas { position: fixed; inset: 0; width: 100%; height: 100%; display: block; touch-action: none; z-index: 0; }
  .chrome { position: fixed; inset: 0; z-index: 2; height: 100svh; pointer-events: none; }
  .chrome .label { position: absolute; top: 50%; transform: translateY(-50%); font: 500 clamp(32px, 5vw, 64px) / 1 var(--font-display); letter-spacing: var(--tracking-display); color: var(--fg-2); user-select: none; white-space: nowrap; }
  .chrome .label-left { left: clamp(20px, 4vw, 56px); }
  .chrome .label-right { right: clamp(20px, 4vw, 56px); letter-spacing: -0.04em; } 
  .chrome .letter { display: inline-block; opacity: 0; transform: translateX(44px); animation: label-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 1s) forwards; }
  @keyframes label-reveal { to { opacity: 1; transform: translate(0); } }
  .chrome .scroll-hint { position: absolute; left: 50%; bottom: 32px; transform: translateX(-50%); color: #fafafa99; font-size: var(--text-sm); letter-spacing: 0; }

  .page { position: relative; z-index: 1; pointer-events: none; }
  .page a, .page button { pointer-events: auto; }
  .hero { height: 100svh; }
  .copy { max-width: var(--astra-copy-max); margin: 0 auto; padding: 26vh var(--space-6); }
  .copy h2 { margin: 0 0 calc(var(--jianju) * 1.6); font: 500 var(--text-2xl) / 1.32 var(--font-display); letter-spacing: 0; }
  .copy p { margin: 0 0 calc(var(--jianju) * 2.4); color: var(--muted); }
  .cue { display: flex; flex-direction: column; align-items: center; gap: calc(var(--jianju) * 1.6); padding: 18vh var(--space-6); }
  .cue-target { width: min(var(--astra-shape-max), 100%); height: 80svh; display: flex; align-items: center; justify-content: center; }
  .cue-target svg { width: 60%; height: 60%; opacity: 0.4; }
  .caption { margin: 0; font: 500 var(--text-sm) / 1.5 var(--font-body); letter-spacing: 0.08em; color: var(--zhongdian); }
  .cue-note { max-width: 440px; margin: 0; text-align: center; font-size: var(--text-sm); line-height: 1.7; color: var(--meta); }
  .copy.tail { padding-bottom: 50vh; text-align: center; }
  .copy.tail p { color: var(--meta); }
  .actions { display: flex; flex-wrap: wrap; gap: calc(var(--jianju) * 1.2); margin-top: calc(var(--jianju) * 2.4); justify-content: center; }
  .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 12px 16px; border: 0; border-radius: var(--yuanjiao); font: 500 var(--text-sm) / 1 var(--font-body); text-decoration: none; cursor: pointer; transition: background-color .3s; }
  .btn-primary { background: var(--accent); color: var(--accent-on); box-shadow: 0 6px calc(var(--yinying) * 1px) rgba(0,0,0,.35); text-shadow: 0 0 calc(var(--faguang) * 2px) var(--zhongdian); }
  .btn-glass { background: var(--astra-glass); color: var(--fg); }
  .btn-glass:hover { background: #ffffff33; }
  .topbar { position: fixed; top: 0; left: 0; right: 0; z-index: 3; display: flex; justify-content: flex-end; gap: 8px; padding: 16px 20px; pointer-events: none; }
  .topbar button { pointer-events: auto; background: var(--astra-glass); color: var(--fg); border: 0; border-radius: var(--yuanjiao); padding: 8px 14px; font: 500 13px / 1 var(--font-body); cursor: pointer; }

  
  .tuner-toggle { position: fixed; right: 16px; bottom: 16px; z-index: 10; width: 36px; height: 36px; border-radius: var(--yuanjiao); background: #ffffff1f; border: 0; color: #ffffffcc; font-size: 16px; cursor: pointer; display: grid; place-items: center; }
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


<div class="chrome" id="chrome">
  <p class="label label-left"><span class="letter" style="--delay:1.0s">星</span><span class="letter" style="--delay:1.1s">流</span></p>
  <p class="label label-right"><span class="letter" style="--delay:1.5s">Starflow</span></p>
  <p class="scroll-hint">向下滚动</p>
</div>


<div class="topbar">
  <button id="langToggle">EN</button>
</div>


<button class="tuner-toggle" id="tunerToggle">⚙</button>
<div class="tuner-panel" id="tunerPanel">
  <h3>方案参数</h3>
  <label>主色 <input id="zhucai" type="color" value="#ffffff"></label>
  <label>重点色 <input id="zhongdian" type="color" value="#7EC8E3"></label>
  <label>页面底色 <input id="di" type="color" value="#000000"></label>
  <label>正文色 <input id="zi" type="color" value="#ffffff"></label>
  <label>次要文字色 <input id="cizi" type="color" value="#ffffff99"></label>
  <label>字号 <b id="v-zihao">17</b><input id="zihao" type="range" min="13" max="22" step="1" value="17"></label>
  <label>圆角(px) <b id="v-yuanjiao">999</b><input id="yuanjiao" type="range" min="0" max="1000" step="1" value="999"></label>
  <label>间距(px) <b id="v-jianju">10</b><input id="jianju" type="range" min="4" max="40" step="1" value="10"></label>
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

  const canvas = document.getElementById('starCanvas')
  const modeText = document.getElementById('modeText')

  const state = {
    zhucai: '#ffffff', zhongdian: '#7EC8E3', di: '#000000', zi: '#ffffff', cizi: '#ffffff99',
    zihao: 17, yuanjiao: 999, jianju: 10, yinying: 0, faguang: 0,
    starSize: 1.2, starSpeed: 0.4, ambient: '#23435f'
  }

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

  addEventListener('message', e => {
    const d = e.data
    if (!d || d.type !== 'param') return
    state[d.key] = d.value
    applyStyle()
    pushTo3D(d.key, d.value)
  })

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
    参数: [{"键":"zhucai","名":"主色（按钮/重点）","类型":"color","默认":"#ffffff"},{"键":"zhongdian","名":"重点色（数据高亮）","类型":"color","默认":"#7EC8E3"},{"键":"di","名":"页面底色","类型":"color","默认":"#000000"},{"键":"zi","名":"正文色","类型":"color","默认":"#ffffff"},{"键":"cizi","名":"次要文字色","类型":"color","默认":"#ffffff99"},{"键":"yuanjiao","名":"圆角(px)","类型":"slider","最小":0,"最大":1000,"步长":1,"默认":999},{"键":"jianju","名":"间距(px)","类型":"slider","最小":4,"最大":40,"步长":1,"默认":10},{"键":"zihao","名":"基础字号(px)","类型":"slider","最小":13,"最大":22,"步长":1,"默认":17},{"键":"yinying","名":"阴影强度","类型":"slider","最小":0,"最大":50,"步长":2,"默认":0},{"键":"faguang","名":"发光强度(%)","类型":"slider","最小":0,"最大":30,"步长":1,"默认":0},{"键":"starSize","名":"星星大小","类型":"slider","最小":0.5,"最大":3,"步长":0.1,"默认":1.2},{"键":"starSpeed","名":"星星速度","类型":"slider","最小":0,"最大":1.5,"步长":0.05,"默认":0.4},{"键":"ambient","名":"氛围色","类型":"color","默认":"#23435f"}],
    来源: "GitHub Win-Hao/starflow（MIT）+ OpenAI GPT-6 Astra 发布页设计系统（2026-09-07 入库）"
  }
,
  {
    id: "s207",
    风格名: "定义型首屏",
    骨架: "定义型首屏（左文右留白）",
    配色: {"深底(画布)":"60%","文字与留白":"30%","强调色(CTA/图标)":"10%"},
    布局骨架: "暗底左对齐定义式 Hero：eyebrow + 巨标 H1 + 副文 + 双 CTA + 能力标签",
    重色落点: "近黑底 #08090A；靛蓝 #5E6AD2 作 eyebrow/链接强调；白字 #F7F8F8",
    第一屏内容: "「面向团队与智能体的产品开发系统」左对齐定义 + Sign up",
    删减元素: "去居中；去大图；用文字下定义",
    适用: "开发者工具/SaaS 定义式首屏",
    禁忌: "电商/内容站",
    参考站: ["Linear"],
    我的说明: "先下定义，再给动作。与 s205 焦点型 Hero 的分工：焦点型是居中一句话 + 双按钮（转化优先），定义型是左对齐下定义 + 功能三组（认知优先）。",
    Agent提示词: "【定义型首屏 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n先下定义，再给动作。第一屏不卖功能清单，只卖一个品类位置——让人在 3 秒内知道「你是谁」。深色底（沉浸、舞台感）+ 单一强调色（那 10%）+ 大量留白（呼吸区），所有注意力留给那句定义。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors\n  底 --di #08090A（页面唯一画布色，近黑）\n  主文字 --zi #F7F8F8\n  次级文字 --cizi #8A8F98（副文、导航、页脚）\n  强调 --zhucai #5E6AD2（仅用于主 CTA 与「New」标签）\n  重点 --zhongdian #8B93F8（仅用于 H1 中的一个词、功能组小标、柔光晕）\n  强调色总面积守住 10%：CTA 一块 + 图标若干，禁止铺色块、禁止渐变按钮\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(32px, 5vw, 56px)，字重 800，行高 1.1，字距 -0.6px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  导航 / 小标 caption：13–14px，字重 600\n2.3 圆角 rounded：控件 10px，胶囊（公告条）9999px，卡片 12px\n2.4 间距 spacing：8 / 16 / 24 / 32 / 48 / 64 刻度；首屏左文右留白，右侧留白占 32%\n2.5 动效 motion：入场错峰 120ms（H1 → 副文 → 按钮 → 功能组），单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站只此一处动效，其余静止\n2.6 层级 layout：导航 → 公告胶囊 → H1 → 副文 → CTA → 功能三组；右侧留白区保持为空\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：极窄单行，logo + 5–6 个文字项，右侧 Log in / Sign up（Sign up 是唯一实心按钮）\n  公告胶囊 pill：描边胶囊，New 标签用强调底，右侧箭头悬停右移 4px\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 10px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 20% 白描边，仅作陪衬\n  功能组 group：组间距 40px、组内 12px，组标用 --zhongdian，图标淡底 16% 强调色\n\n第四章 布局法 layout\n  栅格：内容最宽 1040px 居中；首屏左右分栏，左文宽 68%、右留白 32%\n  留白哲学：右侧留白是「呼吸区」不是待填区，禁止塞配图、插画、轮播\n  内容落点：视线第一落点是 H1 的强调词，第二落点是主 CTA\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层 #121316\n  阴影仅用于主按钮与卡片，强度 20 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：H1 用一句完整定义句（我们是什么品类）；同一句价值主张在页内重复出现；抽象定义（system）配具体动作（三条功能）互撑；首屏末尾留一个下探钩子\n  不该做：不堆功能清单到首屏；不放大段产品截图抢戏；不用第二个实心按钮；不给 H1 加渐变或描边特效；不在首屏放轮播\n  反例警示：Linear 原站把定义讲完就收，没有下探钩子——这叫动线断裂，第一考核不是好不好看，是「你愿不愿意滚下去」\n\n第七章 文案规则（本方案独有的占位式写法）\n  占位式文案：不跟竞品比功能，直接定义自己是什么品类（「面向团队与智能体的产品开发系统」）\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下右侧留白收掉改上下堆叠；768 以下导航折成汉堡；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #08090A / 主文 #F7F8F8 / 次文 #8A8F98 / 强调 #5E6AD2 / 重点 #8B93F8（60-30-10）\n  字号卡：H1 clamp(32,5vw,56) / 副文 17 / 导航 14 / 小标 13\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML 定义型首屏——导航 + 公告胶囊 + 左文右留白首屏 + 功能三组 + 下探钩子，零依赖可离线打开。",
    演示页: "assets/demos/方案-定义型首屏.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·Linear 定义型首屏</title>
<style>
:root{
  --di:#08090A;
  --zi:#F7F8F8;
  --cizi:#8A8F98;
  --zhongdian:#5E6AD2;
  --bian:#1C1D21;
  --yuanjiao:999px;
  --jianju:16px;
  --zihao:16px;
  --liubai:70px;
  --yinying:18;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Inter","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;display:flex;flex-direction:column;}
.nav{display:flex;align-items:center;gap:var(--jianju);padding:18px 40px;}
.logo{font-weight:700;font-size:19px;letter-spacing:-.3px;display:flex;align-items:center;gap:8px;}
.logo .dot{width:18px;height:18px;border-radius:5px;background:linear-gradient(135deg,#5E6AD2,#8A7BF2);}
.nav-links{display:flex;gap:24px;margin-left:20px;font-size:14px;color:var(--cizi);}
.nav-links a{color:inherit;text-decoration:none;}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:18px;font-size:14px;}
.nav-right a{color:var(--cizi);text-decoration:none;}
.btn{background:var(--zi);color:var(--di);border:none;border-radius:var(--yuanjiao);padding:9px 18px;font-weight:600;cursor:pointer;}
.hero{flex:1;display:flex;flex-direction:column;justify-content:center;padding:var(--liubai) 40px;max-width:1180px;margin:0 auto;width:100%;}
.eyebrow{font-size:13px;color:var(--zhongdian);font-weight:600;margin-bottom:22px;letter-spacing:.3px;}
.h1{font-size:calc(var(--zihao)*3.4);font-weight:700;letter-spacing:-1.5px;line-height:1.08;max-width:16em;}
.sub{margin-top:26px;font-size:calc(var(--zihao)*1.25);color:var(--cizi);max-width:28em;line-height:1.6;}
.cta{margin-top:38px;display:flex;gap:14px;}
.btn-a{background:var(--zi);color:var(--di);border:none;border-radius:var(--yuanjiao);padding:14px 26px;font-weight:600;cursor:pointer;}
.btn-b{background:transparent;color:var(--zi);border:1px solid var(--bian);border-radius:var(--yuanjiao);padding:14px 26px;font-weight:500;cursor:pointer;}
.pills{margin-top:46px;display:flex;gap:10px;flex-wrap:wrap;}
.pill{border:1px solid var(--bian);border-radius:999px;padding:8px 16px;font-size:12.5px;color:var(--cizi);}
</style>
</head>
<body>
<nav class="nav">
  <div class="logo"><span class="dot"></span>Linear</div>
  <div class="nav-links">
    <a href="#">Product</a><a href="#">Resources</a><a href="#">Pricing</a><a href="#">Customers</a><a href="#">Now</a>
  </div>
  <div class="nav-right">
    <a href="#">Log in</a>
    <button class="btn">Sign up</button>
  </div>
</nav>
<main class="hero">
  <div class="eyebrow">为团队与智能体打造</div>
  <h1 class="h1">面向团队与智能体的产品开发系统</h1>
  <p class="sub">专为规划与构建产品而生，为 AI 时代设计。让人类与智能体在同一套工作流里协作。</p>
  <div class="cta">
    <button class="btn-a">免费开始</button>
    <button class="btn-b">预约演示</button>
  </div>
  <div class="pills">
    <span class="pill">Issue tracking</span><span class="pill">Cycles</span><span class="pill">Linear Agent</span><span class="pill">Roadmaps</span><span class="pill">Insights</span>
  </div>
</main>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
    片段: "\n<header class=\"hero\">\n  <div class=\"hero-l\">\n    <h1>面向团队与<em>智能体</em>的产品开发系统</h1>\n    <p class=\"sub\">为规划与构建产品而生，为 AI 时代而设计。</p>\n    <div class=\"btns\"><button class=\"btn solid\">免费开始</button><button class=\"btn ghost\">看它怎么跑</button></div>\n  </div>\n  <div class=\"void\"></div>\n</header>",
    参数: [
      {键:"zhongdian",名:"强调靛",类型:"color",默认:"#5E6AD2"},
      {键:"liubai",名:"留白",类型:"slider",默认:70,最小:40,最大:140,步长:4},
      {键:"zihao",名:"基准字号",类型:"slider",默认:16,最小:12,最大:22,步长:1},
      {键:"jianju",名:"间距",类型:"slider",默认:16,最小:8,最大:28,步长:1}
    ],
    来源: "网站拆解：Linear（linear.app）首屏，2026-09-10 入库；文案与结构仅作手法参考，代码自写"
  },
  {
    id: "s210",
    风格名: "卡片错位",
    骨架: "错位卡组",
    配色: {"页面底":"70%","卡片底":"22%","强调(错位首卡)":"8%"},
    布局骨架: "顶部窄导航 + 主张 H1 + 错位能力区（4 张 tile 按规律错开、标题各自对齐、首张强调）+ 页脚；错位只发生在能力区，其余保持克制",
    重色落点: "强调色只落在首张 tile 的边框与标题，其余 tile 用极淡底；重色压「第一张」形成视线落点",
    第一屏内容: "H1 一句主张 + 副文，下方紧接着错位能力区（先被错开的节奏吸引）",
    删减元素: "去平铺等宽卡片、去同权重罗列、去装饰色块，强制用位置差分出主次",
    适用: "工具 / SaaS 官网能力区、作品集、博客列表——任何「一组相似卡片」需要层次感的地方",
    禁忌: "一页多个无规律乱错位（那是乱不是层次）；错位幅度大到破坏阅读基线",
    参考站: ["抖音·五种高级审美布局","phuocng/csslayout"],
    我的说明: "卡片错位来自抖音·五种高级审美布局（视频概念：初始所有卡片左侧对齐、仅一条对齐轴→页面只有整齐无层次；调整后卡片按规律错开、各卡标题设独立对齐轴→层次立刻显现）。本方案把它落成可运行整页：错位发生在能力区，规律可选交错/阶梯/递进，首卡强调吸第一眼。与 v174 亲密性功能分组是兄弟手法——一个用间距分组、一个用位置错位，都治「模板感」。\n抖音来源（收藏夹，需登录）：https://www.douyin.com/user/self?modal_id=7680870950040426867&showTab=favorite_collection",
    Agent提示词: "【卡片错位 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n用位置差讲层次。一组相似卡片默认会「整齐但扁平」，给每张卡一条独立对齐轴并按规律错开，页面立刻有了主次与节奏——不靠配色、不靠分隔线，只动位置。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors\n  底 --di #F7F8FA（页面画布）\n  主文字 --zi #1d2330\n  次级文字 --cizi #7c8696\n  强调 --zhucai #5E6AD2（仅用于首张 tile 边框/标题与 CTA）\n  重点 --zhongdian #8B93F8（仅用于小标签/柔光晕）\n  强调色总面积守住 8%：首卡一块 + 图标若干，禁止铺色块\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px,4.5vw,52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：15–16px，行高 1.6，最大宽度 46ch\n  卡片标题 h3：16–17px，字重 700\n2.3 圆角 rounded：控件 14px，tile 卡片 17px（=yuanjiao*1.2）\n2.4 间距 spacing：8 / 16 / 24 / 32 刻度；tile 间距 16–24\n2.5 动效 motion：仅错位过渡 250ms ease，其余静止；错位用 transform: translateX，不用 margin（避免重排）\n2.6 层级 layout：导航 → H1 → 副文 → 错位能力区 → 页脚；错位只发生在能力区\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行 logo + 4 项 + 主 CTA（唯一实心按钮）\n  主张 H1：一句「用错位讲出层次」类定义句\n  错位 tile：4 张，translateX 按规律偏移；首张 .lead 用强调色边框+阴影\n  tile 内：小标签(k)+标题(h3)+描述(p)，文本对齐随对齐轴变化\n\n第四章 布局法 layout\n  栅格：内容最宽 1040px 居中；能力区是单列纵向，错位靠 translateX 而非改网格\n  错位哲学：错位必须「有规律」——交错(正负交替)/阶梯(逐张右移)/递进(幅度随序号放大)，随机偏移是乱不是层次\n  内容落点：视线第一落点是首张 .lead tile 的强调标题\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = tile color-mix(zi 4%)；surface-3 = 首卡强调层\n  阴影仅用于首卡与 CTA，强度 18 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：错位幅度随内容量调（卡片多则幅度小）；首卡强调吸第一眼；标题对齐轴轮换制造节奏\n  不该做：不让一页出现多个无规律乱错位；不把错位幅度调到破坏阅读基线；不用第二个实心按钮；不在能力区之外也错位\n  反例警示：所有卡片左对齐、等宽等大——这是「四块一样大」的模板感，整齐但无层次，是卡片错位要治的病\n\n第七章 文案规则\n  占位式文案：卡片小标签用动作动词（主张/能力/场景/证言），标题讲清这张卡是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 工具站共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：768 以下错位幅度减半、卡片改上下堆叠；480 以下错位归零（小屏优先可读性）\n\n第九章 Agent 提示词指南\n  配色卡：底 #F7F8FA / 主文 #1d2330 / 次文 #7c8696 / 强调 #5E6AD2 / 重点 #8B93F8（70-22-8）\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 卡片标题 17 / 小标 13\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML——导航 + 主张 H1 + 错位能力区(4 tile) + 页脚，零依赖可离线打开；错位规律与幅度由参数控制。",
    演示页: "assets/demos/方案-卡片错位.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·卡片错位</title>
<style>
:root{
  --zhucai:#5E6AD2;--zhongdian:#8B93F8;--di:#F7F8FA;--zi:#1d2330;--cizi:#7c8696;
  --yuanjiao:14px;--jianju:16px;--zihao:15px;--yinying:18;--cuowei:42px;--guilv:0;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;}
.wrap{max-width:1040px;margin:0 auto;padding:calc(var(--jianju)*2) var(--jianju);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--zi) 12%,transparent);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:calc(var(--jianju)*1.4);font-size:14px;color:var(--cizi);}
.cta{background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
.hero{padding:calc(var(--jianju)*3) 0 calc(var(--jianju)*2);}
.hero h1{font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:-.5px;line-height:1.12;}
.hero .sub{margin-top:14px;font-size:calc(var(--zihao)*1.05);color:var(--cizi);max-width:46ch;}

.section{margin-top:calc(var(--jianju)*2);display:flex;flex-direction:column;gap:calc(var(--jianju)*1.2);}
.tile{
  background:color-mix(in srgb,var(--zi) 4%,transparent);
  border:1px solid color-mix(in srgb,var(--zi) 10%,transparent);
  border-radius:calc(var(--yuanjiao)*1.2);
  padding:calc(var(--jianju)*1.4);
  transform:translateX(var(--sh,0px));
  transition:transform .25s ease;
  box-shadow:0 calc(var(--yinying)*0.2px) calc(var(--yinying)*0.6px) rgba(0,0,0,.06);
}
.tile .k{font-size:13px;color:var(--zhucai);font-weight:700;letter-spacing:.04em;}
.tile h3{margin:8px 0 6px;font-size:17px;}
.tile p{font-size:13.5px;color:var(--cizi);}
.tile.lead{border-color:var(--zhucai);box-shadow:0 calc(var(--yinying)*0.3px) calc(var(--yinying)*1px) color-mix(in srgb,var(--zhucai) 30%,transparent);}
.tile.lead h3{color:var(--zhucai);}
.foot{padding:calc(var(--jianju)*2) 0;color:var(--cizi);font-size:13px;display:flex;justify-content:space-between;border-top:1px solid color-mix(in srgb,var(--zi) 12%,transparent);margin-top:calc(var(--jianju)*2);}
</style>
</head>
<body>
  <div class="wrap">
    <nav class="nav"><span class="logo">卡片错位</span><span class="menu"><a>首页</a><a>功能</a><a>案例</a><a>定价</a></span><button class="cta">开始使用</button></nav>
    <header class="hero">
      <h1>用错位讲出层次</h1>
      <p class="sub">所有卡片都左对齐时只有整齐；让每张卡各走各的对齐轴，页面立刻有了主次与节奏。</p>
    </header>
    <section class="section" id="sec"></section>
    <footer class="foot"><span>© 2026 卡片错位</span><span>抖音·五种高级审美布局拆解</span></footer>
  </div>
<script>

  const state = {
    zhucai:"#5E6AD2", zhongdian:"#8B93F8", di:"#F7F8FA", zi:"#1d2330", cizi:"#7c8696",
    yuanjiao:14, jianju:16, zihao:15, yinying:18, cuowei:42, guilv:0
  };
  const TILES = [
    { k:"主张", h:"一句话定义", p:"错位让这条先被看见", lead:true },
    { k:"能力", h:"核心能力", p:"各自缩进不同形成节奏" },
    { k:"场景", h:"使用场景", p:"场景卡错开，避免模板感" },
    { k:"证言", h:"客户证言", p:"再错一级，纵深由偏移堆出" }
  ];
  function shiftOf(i){
    const c = state.cuowei;
    if (state.guilv === 0) return (i % 2 === 0 ? 1 : -1) * c;
    if (state.guilv === 1) return i * (c * 0.5);
    return i * c;
  }
  function build(){
    const sec = document.getElementById("sec");
    sec.innerHTML = "";
    TILES.forEach((t, i) => {
      const el = document.createElement("div");
      el.className = "tile" + (t.lead ? " lead" : "");
      el.style.setProperty("--sh", shiftOf(i) + "px");
      el.innerHTML = '<div class="k">' + t.k + '</div><h3>' + t.h + '</h3><p>' + t.p + '</p>';
      sec.appendChild(el);
    });
  }
  function apply(){
    const r = document.documentElement.style;
    r.setProperty("--zhucai", state.zhucai);
    r.setProperty("--zhongdian", state.zhongdian);
    r.setProperty("--di", state.di);
    r.setProperty("--zi", state.zi);
    r.setProperty("--cizi", state.cizi);
    r.setProperty("--yuanjiao", state.yuanjiao + "px");
    r.setProperty("--jianju", state.jianju + "px");
    r.setProperty("--zihao", state.zihao + "px");
    r.setProperty("--yinying", state.yinying);
    r.setProperty("--cuowei", state.cuowei + "px");
    build();
  }
  window.addEventListener("message", e => {
    const d = e.data; if (!d || d.type !== "param") return;
    state[d.key] = d.value; apply();
  });
  apply();
<\/script>
</body>
</html>
`,
    片段: `
<section class="section">
  <div class="tile lead"><div class="k">主张</div><h3>用错位讲出层次</h3><p>错位让这条先被看见</p></div>
  <div class="tile"><div class="k">能力</div><h3>核心能力</h3><p>各自缩进不同形成节奏</p></div>
  <div class="tile"><div class="k">场景</div><h3>使用场景</h3><p>场景卡错开避免模板感</p></div>
  <div class="tile"><div class="k">证言</div><h3>客户证言</h3><p>再错一级纵深堆出</p></div>
</section>`,
    参数: [{"键":"zhucai","名":"主色","类型":"color","默认":"#5E6AD2"},{"键":"zhongdian","名":"重点色","类型":"color","默认":"#8B93F8"},{"键":"di","名":"页面底色","类型":"color","默认":"#F7F8FA"},{"键":"zi","名":"正文色","类型":"color","默认":"#1d2330"},{"键":"cizi","名":"次要文字色","类型":"color","默认":"#7c8696"},{"键":"yuanjiao","名":"圆角(px)","类型":"slider","最小":0,"最大":24,"步长":1,"默认":14},{"键":"jianju","名":"间距(px)","类型":"slider","最小":8,"最大":32,"步长":1,"默认":16},{"键":"zihao","名":"基础字号(px)","类型":"slider","最小":13,"最大":20,"步长":1,"默认":15},{"键":"yinying","名":"阴影强度","类型":"slider","最小":0,"最大":60,"步长":2,"默认":18},{"键":"cuowei","名":"错位幅度(px)","类型":"slider","最小":0,"最大":90,"步长":2,"默认":42},{"键":"guilv","名":"错位规律(0交错/1阶梯/2递进)","类型":"slider","最小":0,"最大":2,"步长":1,"默认":0}],
    来源: "抖音·五种高级审美布局（收藏夹，需登录）https://www.douyin.com/user/self?modal_id=7680870950040426867&showTab=favorite_collection ，概念拆解 2026-09-13；GitHub 参考 phuocng/csslayout（错位/层叠 pattern）；代码自写"
  },
  {
    id: "s211",
    风格名: "陈列型官网",
    骨架: "陈列型首屏 + 作品网格",
    配色: {"浅底(页面)":"60%","灰阶文本与分隔线":"30%","强调橙(徽章/CTA)":"10%"},
    布局骨架: "浅底导航 + Site of the Day 大图横幅（评分徽章）+ Latest 三列作品网格",
    重色落点: "浅底 #F8F8F8；分隔 #EDEDED/#DEDEDE；正文 #222；橙 #FF9667 评分徽章/强调",
    第一屏内容: "今日最佳大图 + 7.69/10 评分徽章 + Latest 网格",
    删减元素: "深底；重彩；让作品图当主角",
    适用: "作品集/设计奖项/画廊陈列站",
    禁忌: "信息密集后台",
    参考站: ["Awwwards"],
    我的说明: "三把尺子：色相＝中性浅底 + 一个橙；明度＝近白底对 #222 正文，差全开；饱和度＝页面 UI 全部低饱和，把高饱和让给作品图与那 10% 橙。\n这是四种首屏范式里的最后一块：Apple 信息型（卖参数）、OpenAI 焦点型（给入口）、Linear 定义型（先下定义）、Awwwards 陈列型（直接挂出最好的一件）。前三者的主角是「自己的话」，陈列型的主角是「别人的作品」，所以版式的第一原则是底色退让。\n最值钱的一条也在这里：浅底不是审美偏好，是功能刚需——把「页面底色」往暖灰拖一档、再拖「作品图饱和度」到 40%，整墙作品立刻发脏、掉档次。反过来就懂了为什么 Subtraction（减法）要分两层：结构层可以加（它塞了上百件作品），色彩层必须减（灰白底 + 单一橙）。\n想把这一条变成直觉，就把「页面底色」往暖灰拖一档、再把「作品图饱和度」拉到 40%——整墙作品立刻发脏、像掉了一档分辨率，比读十行文字更快。",
    Agent提示词: "【陈列型官网 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n底退让，作品登场。这类站点的内容是几百张别人做的彩色图，页面唯一的职责是排好、对齐、标分；任何有主张的底色都会把作品压脏。一句话气质：像美术馆的白墙——你记住的是画，不是墙。密度中等偏疏散，情绪克制、专业、可被翻阅。\n\n第二章 色彩板与角色（60-30-10）\n- surface-page #f8f8f8（页面底色，60%）：唯一大面积色，近白，不抢任何一张作品图\n- text-primary #222222（正文与作品标题，30%）：灰阶主力，靠它与底色拉开明度差\n- line #ededed（分隔线与卡片边界，同属 30%）：划分而不强调，宁细勿粗\n- text-muted #8a8a8a（日期、分类、次要信息，同属 30%）\n- accent #FF9667（10%）：仅用于「评分徽章」与「提交作品」按钮两处；禁止近似色、禁止第三个彩色\n- 内容色：作品缩略图自带的颜色不计入 60-30-10，但页面任何一处 UI 都不得与它争饱和度\n\n第三章 字体规则\n字体族：system-ui, \"Microsoft YaHei\", sans-serif（零依赖、离线可用）。层级表：\n- display（作品标题/H1）34px / 800 / 行高 1.1 / 字距 -0.8px\n- heading（区块标题 Latest）15px / 800 / 行高 1.4\n- body（正文与说明）15px / 400 / 行高 1.6\n- caption（日期、分类、页脚）12–13px / 400 / 字距 0.02em / 颜色 text-muted\n规则：不用第二种字族，不用渐变字；层级只靠字号与灰阶，不靠颜色。\n\n第四章 组件规范\n- 评分徽章：accent 实心、白字、圆角 999px、内边距 9×15px、字重 800，是整个页面唯一的暖色块\n- 提交按钮（CTA）：accent 实心胶囊；hover 透明度 0.9；无第二个实心按钮\n- 导航：Logo 左、菜单居中、CTA 右，下边一条 1px line；菜单默认 text-muted，当前项提到 text-primary 加粗\n- 作品卡：缩略图（aspect-ratio 4/3、圆角 6px）+ 标题 + 一行 caption；无边框无底色；hover 时缩略图上抬 6px 并加深阴影，标题不变色（首条除外）\n- 文字链接：默认 text-primary，hover 加下划线，不换色\n\n第五章 布局法\n间距刻度：4 / 8 / 12 / 18 / 24 / 40px。内容区最大宽度 960px，左右边距 ≥18px。栅格：作品网格 4 列（响应式：≥960px 4 列 / 640–959px 3 列 / <640px 2 列 ）。留白哲学：卡片之间不用分隔线，靠间距分组（亲密性）；区块之间用 1px line 隔开。内容落点：首屏只放当日最佳，其余全部下移到 Latest 网格。\n\n第六章 深度与层级\nsurface-1 页面 #f8f8f8；surface-2 作品缩略图（自带内容色）；surface-3 徽章与 CTA（accent 实心浮起）。阴影系统：缩略图默认 0 2px 8px rgba(0,0,0,.10)，hover 提到 0 5px 18px rgba(0,0,0,.18)；禁止用彩色阴影、禁止描边代替阴影。层级判断：从左到右、从上到下只有一条视觉主线——大图第一、徽章第二、网格第三。\n\n第七章 该做 / 不该做\n该做：① 一句话说清「今天最好的是这个」；② 每件作品给同样的尺寸与权重（尊重作者）；③ 只在评分与提交两处用 accent；④ 缩略图比例统一，宁可裁也不能参差。\n不该做：① 深色底或带色底（会把作品图压脏）；② 每张卡一个强调色；③ 首屏放两条以上主张；④ 给<｜hy_place▁holder▁no▁813｜>品加边框描边；⑤ 在陈列页用全屏粒子/3D 开场动画（那属于作品本身，不属于画框）。\n\n第八章 响应式行为\n断点：960px / 640px。≥960px 4 列、首屏大图 44vh；640–959px 3 列、大图 38vh；<640px 2 列、大图 30vh 且导航折叠为 Logo + CTA。触控目标 ≥44×44px（CTA 与菜单项）。折叠策略：导航菜单优先隐藏，CTA 与提交入口永不隐藏。\n\n第九章 Agent 提示词指南\n配色卡：页面 #f8f8f8 / 正文 #222222 / 分隔线 #ededed / 次要字 #8a8a8a / 强调 #FF9667(仅 10%)。字号卡：34 / 15 / 15 / 12.5。\n即拿即用：「用下面这套规则生成一页：结构＝顶部细导航（Logo｜菜单｜橙色提交按钮）＋当日最佳大图首屏（大图在上，橙色评分徽章与标题同排在下）＋ Latest 四列作品网格＋极简页脚；CSS 变量：--zhucai #FF9667、--di #f8f8f8、--zi #222222、--cizi #8a8a8a、--xian #ededed、--yuanjiao 6px、--jianju 18px、--zihao 15px、--lie 4、--yinying 20、--baohedu 100；要求：强调色只出现在评分徽章与提交按钮，其余一律灰阶；卡片用 aspect-ratio 锁比例、hover 上抬 6px；纯 HTML/CSS/JS，零依赖、离线可跑。」",
    演示页: "assets/demos/方案-陈列型官网.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·Awwwards 陈列型官网</title>
<style>
:root{
  --di:#F8F8F8;
  --zi:#222222;
  --cizi:#8A8A8A;
  --bian:#EDEDED;
  --bian2:#DEDEDE;
  --zhongdian:#FF9667;
  --yuanjiao:10px;
  --jianju:16px;
  --zihao:16px;
  --liubai:40px;
  --yinying:14;
}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Inter","Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;padding-bottom:var(--liubai);}
.nav{display:flex;align-items:center;gap:var(--jianju);padding:18px 40px;border-bottom:1px solid var(--bian);}
.logo{font-weight:800;font-size:19px;letter-spacing:-.4px;}
.nav-links{display:flex;gap:24px;margin-left:18px;font-size:14px;color:var(--cizi);}
.nav-links a{color:inherit;text-decoration:none;}
.nav-right{margin-left:auto;font-size:14px;color:var(--cizi);}
.feature{border-bottom:1px solid var(--bian2);padding:var(--liubai) 40px 30px;}
.feat-top{display:flex;align-items:center;gap:12px;margin-bottom:18px;font-size:12.5px;color:var(--cizi);text-transform:uppercase;letter-spacing:1px;}
.badge{background:var(--zhongdian);color:#fff;border-radius:999px;padding:5px 12px;font-weight:700;font-size:12px;letter-spacing:.5px;}
.score{font-weight:700;color:var(--zi);}
.feat-img{position:relative;width:100%;aspect-ratio:16/7;border-radius:var(--yuanjiao);overflow:hidden;background:linear-gradient(120deg,#FFB98A,#FF9667 40%,#6C5CE7 100%);display:grid;place-items:center;}
.feat-img .cap{color:#fff;font-size:calc(var(--zihao)*1.6);font-weight:800;text-shadow:0 2px 12px rgba(0,0,0,.25);}
.feat-meta{display:flex;justify-content:space-between;align-items:flex-end;margin-top:16px;}
.feat-meta h2{font-size:calc(var(--zihao)*1.5);font-weight:700;letter-spacing:-.5px;}
.feat-meta .by{font-size:13px;color:var(--cizi);}
.grid-head{padding:34px 40px 14px;font-size:13px;color:var(--cizi);text-transform:uppercase;letter-spacing:1.5px;}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--jianju);padding:0 40px;}
.cell{background:#fff;border:1px solid var(--bian);border-radius:var(--yuanjiao);overflow:hidden;}
.cell .ph{aspect-ratio:4/3;background:linear-gradient(135deg,#EDEDED,#D6D6D6);display:grid;place-items:center;color:#b9b9b9;font-size:13px;}
.cell .ph.a{background:linear-gradient(135deg,#FCE3D2,#FFC9A3);color:#c97b4a;}
.cell .ph.b{background:linear-gradient(135deg,#D7E3FF,#B9C9FF);color:#5a6db0;}
.cell .ph.c{background:linear-gradient(135deg,#E2F7E9,#BCE9CC);color:#4f8f6a;}
.cell .info{padding:14px 16px;}
.cell .info h3{font-size:14.5px;font-weight:600;}
.cell .info p{font-size:12.5px;color:var(--cizi);margin-top:4px;}
</style>
</head>
<body>
<nav class="nav">
  <div class="logo">Awwwards.</div>
  <div class="nav-links"><a href="#">Websites</a><a href="#">Collections</a><a href="#">Jobs</a><a href="#">Academy</a></div>
  <div class="nav-right">Log in</div>
</nav>
<section class="feature">
  <div class="feat-top"><span class="badge">Site of the Day</span><span class="score">7.69 / 10</span><span>· 今日最佳</span></div>
  <div class="feat-img"><span class="cap">Léo Parpeix — Portfolio 2026</span></div>
  <div class="feat-meta">
    <h2>Léo Parpeix · Portfolio 2026</h2>
    <div class="by">By Léo Parpeix · France</div>
  </div>
</section>
<div class="grid-head">Latest</div>
<section class="grid">
  <div class="cell"><div class="ph a">作品预览</div><div class="info"><h3>Monolith Studio</h3><p>Brand & Interaction</p></div></div>
  <div class="cell"><div class="ph b">作品预览</div><div class="info"><h3>Tidal — Fintech</h3><p>Web Design</p></div></div>
  <div class="cell"><div class="ph c">作品预览</div><div class="info"><h3>Verde Atelier</h3><p>E-commerce</p></div></div>
  <div class="cell"><div class="ph b">作品预览</div><div class="info"><h3>Orbit OS</h3><p>Product Site</p></div></div>
  <div class="cell"><div class="ph c">作品预览</div><div class="info"><h3>Studio Kanso</h3><p>Agency</p></div></div>
  <div class="cell"><div class="ph a">作品预览</div><div class="info"><h3>Northwind</h3><p>Editorial</p></div></div>
</section>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});<\/script>
</body>
</html>
`,
    片段: "\n<div class=\"info\">\n  <div>\n    <h1>Léo Parpeix - Portfolio 2026</h1>\n    <div class=\"sub\">第二焦点 · 评分 7.69 / 10，其余信息全部灰阶退让</div>\n  </div>\n  <div class=\"badge\">7.69 / 10</div>\n</div>",
    参数: [
      {键:"zhongdian",名:"强调橙",类型:"color",默认:"#FF9667"},
      {键:"liubai",名:"留白",类型:"slider",默认:40,最小:20,最大:80,步长:2},
      {键:"yuanjiao",名:"圆角",类型:"slider",默认:10,最小:0,最大:24,步长:1},
      {键:"zihao",名:"基准字号",类型:"slider",默认:16,最小:12,最大:22,步长:1}
    ],
    来源: "网站拆解：Awwwards（awwwards.com）首页与 Site of the Day 区块，2026-09-14 抓取分析（底 #fff/#f8f8f8、分隔线 #ededed、正文 #222、品牌强调色 --color-primary #FF9667）；结构与配色仅作手法参考，代码自写"
  },
  {
    id: "m001",
    风格名: "暗色叙事揭示",
    骨架: "全屏沉浸揭示",
    配色: {
      "暗底(画布)": "60%",
      "亮色文字与锥光": "30%",
      "暖色强调(CTA/揭示层)": "10%"
    },
    布局骨架: "顶栏轻透叠 + 全屏揭示舞台（底图 → 遮罩揭示层 → 锥光）+ 居中双行巨标 + 左下叙述与唯一 CTA；下接设计 Token 预览段（色板/字号/按钮/卡片）+ 细页脚",
    重色落点: "画布整体压暗，唯一跳色是光标处的暖色揭示光斑与橙色 CTA；标题纯白高对比压在暗底上",
    第一屏内容: "整屏是一幅被掩埋的暗调画面——移动光标才用锥光揭开底下那层暖色画面；居中衬线斜体 + 无衬线双行巨标，左下句叙述 + 唯一实心 CTA",
    删减元素: "不用卡片网格 / 不做分隔线 / 不堆导航项 / 首屏无第二按钮；仅靠一层揭示交互承担全部叙事",
    适用: "叙事型品牌站、作品集、地理/科普/文化展览首屏——要「探索发现」的沉浸感",
    禁忌: "信息密度高的后台、需要一屏讲清多个卖点的落地页（揭示交互会分散注意力）",
    参考站: [
      "motionsites.ai"
    ],
    我的说明: "把「点击」换成「用光探索」：不用点也能看，光扫到哪里，故事就在哪里浮现，首页本身成为一次发现。",
    Agent提示词: `【暗色叙事揭示 · 设计语言宪法】
效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。

第一章 总纲 · 设计哲学
全屏沉浸揭示。把「点击」换成「用光探索」——首页整屏是一幅被压暗的画面，移动光标时用锥形光揭开藏在底下的一层暖色画面，探索本身成为浏览。气质：暗、静、电影感、仪式性；密度极低，一屏只讲一件事。适用：叙事型品牌站 / 作品集 / 地理·科普·文化展览首屏。参考：motionsites.ai Interactive Discovery Hero。

第二章 设计 Token 法典（取值唯一，禁止近似值）
2.1 颜色 colors（暗底 60% / 亮色文字与锥光 30% / 暖色强调 10%）
  画布底 --di #1b1206（页面唯一暗底，两层画面在其上生成明暗）
  主文字 · 锥光中心 --zi / --zhongdian #ffffff（标题与锥光同色，高对比压在暗底）
  强调 --zhucai #e8702a（唯一暖色：CTA + 揭示层主色，禁止大面积铺色）
  揭示层辅色 --revealTint #6b3a12（揭示图层的暖调过渡，仅出现在被锥光揭开的区域）
2.2 字体 typography
  字体栈：'Inter' / system-ui / 'Microsoft YaHei'
  Display 衬线斜体：'Playfair Display' / Georgia / serif，italic 400，字号 calc(--zihao × 5.4)
  Display 无衬线：400，字号 calc(--zihao × 5.4)，行高 .96
  副文 body：14px，行高 1.65，最大宽度 320px
  小标 caption：12–13px
2.3 圆角 rounded：CTA 胶囊 --yuanjiao 999px；卡片固定 14px（两套分用，不混）
2.4 间距 spacing：以 --jianju（24px）为刻度（×1.1 / ×1.4 / ×1.6 / ×2.4）
2.5 动效 motion：锥光用 RAF + 线性插值平滑跟随（--ease .10）；按钮 hover 1.03 / active .96
2.6 层级 layout：顶栏轻透叠 + 全屏揭示舞台（底图 → 遮罩揭示层 → 锥光）+ 居中双行巨标 + 左下叙述与 CTA

第三章 组件规范 components（全部引用第二章 token）
  顶栏 nav：单行透叠，logo（字距 .14em）+ 3 项菜单 + 1 个描边胶囊 CTA，无底色
  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 --yuanjiao、阴影 0 (--yinying×.3) (--yinying×.9) rgba(0,0,0,.4)；同屏仅一个
  次按钮 btn-ghost：透明底 + 1px 描边 rgba(255,255,255,.3)
  叙事卡片 card：底 rgba(255,255,255,.05) + 1px 描边 rgba(255,255,255,.1) + 圆角 14px
  锥光 glow：radial-gradient(--zhongdian → transparent)，外发光强度由 --faguang 控制

第四章 布局法 layout
  栅格：内容满宽，首屏无左右分栏；文字两处落点——首屏居中、叙述左下
  留白哲学：一屏只放一个交互主角，四周留大片暗部做「未被探索」的暗示
  删减（明确不做什么）：不用卡片网格 / 不做分隔线 / 不堆导航项 / 首屏无第二按钮
  内容落点（第一屏看到什么）：整屏被掩埋的暗调画面 + 居中双行巨标 + 左下句叙述与唯一 CTA

第五章 深度与层级 depth
  surface-1 = 舞台底 --di；surface-2 = 卡片 rgba(zi 5%)；surface-3 = 顶栏（透明）
  阴影仅用于主按钮与卡片，禁止彩色阴影；暗底靠明度差分层，不靠阴影

第六章 该做 / 不该做
  该做：画布整体压暗，唯一跳色是光标处暖色揭示光斑与橙色 CTA；标题纯白高对比压在暗底；叙事型首屏
  不该做：信息密度高的后台、一屏讲多个卖点的落地页；不用卡片网格/分隔线；不让揭示交互与正文抢注意力
  反例警示：给暗底加大面积暖色、首屏塞两个实心按钮、把揭示改成「点击才出现」——都会让「探索式首屏」失去沉浸

第七章 文案规则
  占位式文案：一句叙述 + 一个动词型 CTA（如 Start Digging），把「用光探索」写进语气
  human + agent 话术：让「移动 = 探索」成为首页的交互隐喻

第八章 响应式行为
  断点 1024 / 768 / 480：768 以下导航折成汉堡、巨标字号压缩、叙述块改居中；480 以下进一步压缩间距；触控目标 ≥ 44px；触屏无光标 → 用点击/滑动位置驱动揭示

第九章 Agent 提示词指南
  配色卡：底 #1b1206 / 主文·锥光 #ffffff / 强调 #e8702a / 揭示辅 #6b3a12
  字号卡：Display calc(zihao×5.4) / 副文 14 / 小标 12
  即拿即用：把以上 9 章套进你的内容，输出完整单页 HTML；首屏必须实现「光标锥光揭开底层画面」——canvas 径向渐变作 mask、RAF 平滑跟随，两层画面由 canvas 离线生成（离线可跑，不依赖任何外链）`,
    演示页: "assets/demos/方案-暗色叙事揭示.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>暗色叙事揭示 · 方案</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root{
    --zhucai:#e8702a;        /* 强调色：CTA + 光晕外圈 */
    --zhongdian:#ffffff;     /* 锥光中心色 */
    --di:#1b1206;            /* 底图品牌色（冷暗） */
    --revealTint:#6b3a12;    /* 揭示图层色（暖） */
    --zi:#ffffff;            /* 标题/正文亮色 */
    --yuanjiao:999px;        /* 按钮圆角 */
    --jianju:24px;           /* 留白刻度 */
    --zihao:17px;            /* 基准字号，驱动标题缩放 */
    --yinying:30;            /* CTA 阴影强度 */
    --faguang:0;             /* 光晕外发光强度 */
    --radius:260px;         /* 探照半径（JS 读取） */
    --ease:.10;             /* 缓动系数（JS 读取） */
  }
  html,body{height:100%;font-family:'Inter',system-ui,'Microsoft YaHei',sans-serif;background:#0a0703;color:var(--zi);}
  a{color:inherit;text-decoration:none;}

  /* 顶栏：轻量、透叠在舞台上 */
  .nav{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;align-items:center;justify-content:space-between;
       padding:18px calc(var(--jianju)*1.4);font-size:14px;color:rgba(255,255,255,.82);}
  .nav .logo{font-weight:800;letter-spacing:.14em;color:#fff;}
  .nav .menu{display:flex;gap:calc(var(--jianju)*1.1);}
  .nav .menu a{opacity:.78;}
  .nav .navcta{border:1px solid rgba(255,255,255,.32);padding:8px 18px;border-radius:var(--yuanjiao);}

  /* 舞台：整屏沉浸式揭示 */
  .stage{position:relative;width:100%;height:100vh;min-height:560px;overflow:hidden;background:#000;}
  .layer{position:absolute;inset:0;background-size:cover;background-position:center;}
  .base{z-index:10;}
  .baseTint{position:absolute;inset:0;z-index:20;pointer-events:none;mix-blend-mode:multiply;background:var(--di);opacity:.5;}
  .reveal{z-index:30;pointer-events:none;}
  .revealTint{position:absolute;inset:0;z-index:35;pointer-events:none;mix-blend-mode:soft-light;background:var(--revealTint);}
  .glow{position:absolute;z-index:40;width:360px;height:360px;margin:-180px 0 0 -180px;border-radius:50%;pointer-events:none;
        background:radial-gradient(circle, color-mix(in srgb,var(--zhongdian) calc(var(--faguang)*1%), transparent) 0%, transparent 60%);
        transition:opacity .2s;}
  .head{position:absolute;top:50%;left:0;right:0;z-index:50;transform:translateY(-54%);text-align:center;padding:0 20px;pointer-events:none;}
  .head h1{color:var(--zi);line-height:.96;text-shadow:0 8px 40px rgba(0,0,0,.5);}
  .head .l1{display:block;font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:400;font-size:calc(var(--zihao)*5.4);}
  .head .l2{display:block;font-weight:400;font-size:calc(var(--zihao)*5.4);margin-top:calc(var(--zihao)*-.2);letter-spacing:.01em;}
  .blurb{position:absolute;left:calc(var(--jianju)*1.6);bottom:calc(var(--jianju)*1.8);z-index:50;max-width:320px;
         display:flex;flex-direction:column;gap:18px;align-items:flex-start;}
  .blurb p{color:rgba(255,255,255,.8);line-height:1.65;font-size:14px;}
  .blurb button{border:0;color:#fff;font-size:14px;font-weight:700;padding:13px 30px;border-radius:var(--yuanjiao);cursor:pointer;
        background:var(--zhucai);box-shadow:0 calc(var(--yinying)*.3px) calc(var(--yinying)*.9px) rgba(0,0,0,.4);transition:transform .2s;}
  .blurb button:hover{transform:scale(1.03);}
  .blurb button:active{transform:scale(.96);}

  /* 设计 Token 预览段：让方案同时承担色板/字号/按钮/卡片一眼可见（规矩12） */
  .tokens{background:#0d0a06;padding:calc(var(--jianju)*2.4) calc(var(--jianju)*1.6);}
  .tokens h2{font-size:15px;font-weight:800;letter-spacing:.04em;color:rgba(255,255,255,.9);margin-bottom:calc(var(--jianju)*1.1);}
  .tok-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:calc(var(--jianju)*1.4);align-items:start;}
  .swatches{display:flex;gap:10px;flex-wrap:wrap;}
  .sw{width:64px;height:64px;border-radius:12px;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08);}
  .sw span{position:absolute;left:6px;bottom:5px;font-size:9px;color:rgba(255,255,255,.85);text-shadow:0 1px 2px rgba(0,0,0,.6);}
  .type .t{line-height:1.5;color:#fff;margin-bottom:6px;}
  .type .t.d{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:34px;}
  .type .t.h{font-size:20px;font-weight:700;}
  .type .t.b{font-size:14px;color:rgba(255,255,255,.78);}
  .type .t.c{font-size:12px;color:rgba(255,255,255,.5);}
  .comp{display:flex;flex-direction:column;gap:14px;margin-top:calc(var(--jianju)*1.2);}
  .comp .btn-primary{background:var(--zhucai);color:#fff;border:0;border-radius:var(--yuanjiao);padding:12px 26px;font-weight:700;align-self:flex-start;cursor:pointer;}
  .comp .btn-ghost{border:1px solid rgba(255,255,255,.3);color:#fff;background:transparent;border-radius:var(--yuanjiao);padding:12px 26px;font-weight:600;align-self:flex-start;cursor:pointer;}
  .comp .card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px;}
  .comp .card b{color:#fff;font-size:14px;}
  .comp .card p{color:rgba(255,255,255,.6);font-size:12px;margin-top:4px;}
  .foot{background:#0a0703;padding:calc(var(--jianju)*1.2) calc(var(--jianju)*1.6);font-size:12px;color:rgba(255,255,255,.45);
        display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.07);}
</style>
</head>
<body>

  <nav class="nav">
    <span class="logo">DISCOVERY</span>
    <span class="menu"><a>作品</a><a>叙事</a><a>关于</a></span>
    <span class="navcta">开始探索</span>
  </nav>

  <section class="stage" id="stage">
    <div class="layer base" id="base"></div>
    <div class="baseTint"></div>
    <canvas id="cmask" style="display:none"></canvas>
    <div class="layer reveal" id="reveal"></div>
    <div class="revealTint"></div>
    <div class="glow" id="glow"></div>
    <div class="head">
      <h1>
        <span class="l1" id="t1">Layers hold</span>
        <span class="l2" id="t2">tales of time</span>
      </h1>
    </div>
    <div class="blurb">
      <p id="desc">每一次移动，都在揭开一层被时间掩埋的叙事。用光代替点击，让探索本身成为首页。</p>
      <button id="cta">Start Digging</button>
    </div>
  </section>

  <section class="tokens">
    <h2>设计 Token 预览</h2>
    <div class="tok-grid">
      <div>
        <div class="swatches">
          <div class="sw" style="background:var(--zhucai)"><span>zhucai</span></div>
          <div class="sw" style="background:var(--zhongdian)"><span>zhongdian</span></div>
          <div class="sw" style="background:var(--di)"><span>di</span></div>
          <div class="sw" style="background:var(--revealTint)"><span>reveal</span></div>
          <div class="sw" style="background:var(--zi)"><span>zi</span></div>
        </div>
        <div class="comp">
          <button class="btn-primary">主按钮</button>
          <button class="btn-ghost">次按钮</button>
          <div class="card"><b>叙事卡片</b><p>揭示之下的内容落点，承接首屏的沉浸语气。</p></div>
        </div>
      </div>
      <div class="type">
        <div class="t d">Display</div>
        <div class="t h">Heading</div>
        <div class="t b">Body text — 正文用于承载叙事说明，保持克制。</div>
        <div class="t c">Caption — 元信息、版权与辅助说明。</div>
      </div>
    </div>
  </section>

  <footer class="foot"><span>© 2026 DISCOVERY</span><span>隐私 · 条款 · 联系</span></footer>

<script>
const state = {
  zhucai:'#e8702a', zhongdian:'#ffffff', di:'#1b1206', revealTint:'#6b3a12', zi:'#ffffff',
  radius:260, ease:0.10, yuanjiao:999, jianju:24, zihao:17, yinying:30, faguang:0,
  titleText:'Layers hold', subText:'tales of time', btnText:'Start Digging'
};

const base = document.getElementById('base');
const reveal = document.getElementById('reveal');
const glow = document.getElementById('glow');
const canvas = document.getElementById('cmask');
const ctx = canvas.getContext('2d');
const t1 = document.getElementById('t1');
const t2 = document.getElementById('t2');
const cta = document.getElementById('cta');

// 离线生成两层图：不依赖任何远程链接（规矩11）。底图冷暗、揭示图暖亮，制造「探索发现」对比。
function genImage(c1, c2, dots){
  const w=1600,h=900, cv=document.createElement('canvas'); cv.width=w; cv.height=h;
  const g=cv.getContext('2d');
  const grd=g.createLinearGradient(0,0,0,h);
  grd.addColorStop(0,c1); grd.addColorStop(1,c2);
  g.fillStyle=grd; g.fillRect(0,0,w,h);
  g.strokeStyle='rgba(255,255,255,.10)'; g.lineWidth=1;
  if(dots){
    for(let i=0;i<140;i++){ const x=Math.random()*w, y=Math.random()*h, r=Math.random()*1.6+.3;
      g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fillStyle='rgba(255,255,255,.16)'; g.fill(); }
  } else {
    for(let i=0;i<26;i++){ const y=Math.random()*h; g.beginPath(); g.moveTo(0,y);
      g.bezierCurveTo(w*.3,y+Math.random()*60-30,w*.6,y+Math.random()*60-30,w,y+Math.random()*40-20); g.stroke(); }
  }
  return cv.toDataURL();
}

function apply(){
  const root=document.documentElement.style;
  root.setProperty('--zhucai',state.zhucai);
  root.setProperty('--zhongdian',state.zhongdian);
  root.setProperty('--di',state.di);
  root.setProperty('--revealTint',state.revealTint);
  root.setProperty('--zi',state.zi);
  root.setProperty('--yuanjiao',state.yuanjiao+'px');
  root.setProperty('--jianju',state.jianju+'px');
  root.setProperty('--zihao',state.zihao+'px');
  root.setProperty('--yinying',state.yinying);
  root.setProperty('--faguang',state.faguang);
  root.setProperty('--radius',state.radius+'px');
  root.setProperty('--ease',state.ease);
  const baseImg=genImage(shade(state.di,58),shade(state.di,-40),true);
  const revImg=genImage(state.zhucai,state.revealTint,false);
  base.style.backgroundImage='url('+baseImg+')';
  reveal.style.backgroundImage='url('+revImg+')';
  t1.textContent=state.titleText; t2.textContent=state.subText; cta.textContent=state.btnText;
  t1.style.color=state.zi; t2.style.color=state.zi;
  cta.style.background=state.zhucai;
  glow.style.background='radial-gradient(circle, color-mix(in srgb,var(--zhongdian) calc(var(--faguang)*1%), transparent) 0%, transparent 60%)';
  drawMask();
}

// 把品牌色朝黑/朝亮偏移，生成图层明暗，避免引入额外色值
function shade(hex,amt){
  const m=hex.replace('#',''); const n=m.length===3?m.split('').map(c=>c+c).join(''):m;
  let r=parseInt(n.slice(0,2),16),g=parseInt(n.slice(2,4),16),b=parseInt(n.slice(4,6),16);
  r=Math.max(0,Math.min(255,r+amt)); g=Math.max(0,Math.min(255,g+amt)); b=Math.max(0,Math.min(255,b+amt));
  return 'rgb('+r+','+g+','+b+')';
}

function drawMask(){
  const w=window.innerWidth,h=window.innerHeight;
  canvas.width=w; canvas.height=h; ctx.clearRect(0,0,w,h);
  const r=Math.max(1,state.radius);
  const cc=state.zhongdian;
  const g=ctx.createRadialGradient(cur.x,cur.y,0,cur.x,cur.y,r);
  g.addColorStop(0,cc); g.addColorStop(.4,cc);
  g.addColorStop(.62,hexA(cc,.72)); g.addColorStop(.78,hexA(cc,.38));
  g.addColorStop(.9,hexA(cc,.12)); g.addColorStop(1,hexA(cc,0));
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cur.x,cur.y,r,0,Math.PI*2); ctx.fill();
  const url=canvas.toDataURL();
  reveal.style.maskImage='url('+url+')';
  reveal.style.webkitMaskImage='url('+url+')';
  reveal.style.maskSize='100% 100%'; reveal.style.webkitMaskSize='100% 100%';
}

function hexA(hex,a){
  const m=hex.replace('#',''); const n=m.length===3?m.split('').map(c=>c+c).join(''):m;
  return 'rgba('+parseInt(n.slice(0,2),16)+','+parseInt(n.slice(2,4),16)+','+parseInt(n.slice(4,6),16)+','+a+')';
}

const mouse={x:-999,y:-999}, smooth={x:-999,y:-999}, cur={x:-999,y:-999};
window.addEventListener('mousemove',e=>{
  mouse.x=e.clientX; mouse.y=e.clientY;
  glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
  if(smooth.x===-999){smooth.x=e.clientX;smooth.y=e.clientY;}
});
window.addEventListener('resize',drawMask);

function loop(){
  smooth.x+=(mouse.x-smooth.x)*state.ease;
  smooth.y+=(mouse.y-smooth.y)*state.ease;
  cur.x=smooth.x; cur.y=smooth.y;
  drawMask(); requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// 调参契约：postMessage({type:'param',key,value}) 同步 CSS 变量与 state，调了实时可见
window.addEventListener('message',ev=>{
  const d=ev.data; if(!d||d.type!=='param')return;
  if(!(d.key in state))return;
  state[d.key]=d.value; apply();
});

apply();
<\/script>
</body>
</html>
`,
    片段: `:root{--zhucai:#e8702a;--zhongdian:#ffffff;--di:#1b1206;--revealTint:#6b3a12;--zi:#ffffff;--yuanjiao:999px;--jianju:24px;--zihao:17px;}
.stage{position:relative;height:100vh;overflow:hidden;background:#000;}
.layer{position:absolute;inset:0;background-size:cover;background-position:center;}
.base{z-index:10;}
.reveal{z-index:30;pointer-events:none;}
.head h1{color:var(--zi);line-height:.96;}
.head .l1{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:calc(var(--zihao)*5.4);}
.blurb button{background:var(--zhucai);border-radius:var(--yuanjiao);}`,
    参数: [
      {键:"zhucai",名:"强调色",类型:"color",默认:"#e8702a"},
      {键:"zhongdian",名:"锥光中心色",类型:"color",默认:"#ffffff"},
      {键:"di",名:"底图品牌色",类型:"color",默认:"#1b1206"},
      {键:"revealTint",名:"揭示图层色",类型:"color",默认:"#6b3a12"},
      {键:"zi",名:"标题色",类型:"color",默认:"#ffffff"},
      {键:"radius",名:"探照半径",类型:"slider",默认:260,最小:80,最大:480,步长:10},
      {键:"ease",名:"缓动系数",类型:"slider",默认:0.10,最小:0.02,最大:0.30,步长:0.01},
      {键:"yuanjiao",名:"按钮圆角",类型:"slider",默认:999,最小:0,最大:1000,步长:1},
      {键:"jianju",名:"留白刻度",类型:"slider",默认:24,最小:12,最大:48,步长:1},
      {键:"zihao",名:"基准字号",类型:"slider",默认:17,最小:13,最大:24,步长:1},
      {键:"yinying",名:"阴影强度",类型:"slider",默认:30,最小:0,最大:60,步长:1},
      {键:"faguang",名:"锥光外发光",类型:"slider",默认:0,最小:0,最大:40,步长:1}
    ],
    来源: "网站拆解：motionsites.ai 的 Interactive Discovery Hero（2026-08-30 提取参考机制；2026-09-16 按用户要求升维为整页方案，原素材 v140 已并入本方案、不在素材库另存副本；图层改由 canvas 离线生成；结构与交互仅作手法参考，代码自写）"
  },
  {
    id: "m002",
    风格名: "暗色波光基建首屏",
    骨架: "单屏锁定三段：液态金属导航 + 底部居中巨标 Hero + 统计页脚（离线波光背景）",
    配色: {
      "纯黑(画布)": "70%",
      "白/银灰(文字与波光)": "22%",
      "玻璃白(按钮/徽标)": "8%"
    },
    布局骨架: "单屏三段 grid（顶栏 auto / Hero 1fr / 统计 auto，901px+ 锁定无滚动）；顶栏三列 1fr auto 1fr = logo | 液态金属药丸导航 | 白色实心 CTA；Hero 底部居中（flex-end 而非垂直居中）= 徽标 + 双行巨标 + lede + 双按钮；页脚三条统计横排。背景三层：canvas 波光（blur 26px）→ 星野 → 底部压暗 scrim，颗粒罩盖全屏",
    重色落点: "画布纯黑到底，唯一亮面是白色实心按钮与银灰波光；「AI agents」衬线斜体用灰 #9a9a9a——比标题低一档，制造『人话说出机器词』的反差；全页无卡片无分隔线，深度全靠背景光",
    第一屏内容: "顶栏 + 徽标（Operational AI Infrastructure）+ 双行巨标（Train AI agents on your / workflows in minutes.）+ 一句 lede + 双按钮（白色实心 / 玻璃幽灵）+ 底部三条硬数字统计；波光在文案身后缓慢流动",
    删减元素: "不加第二屏、不加卡片阵、不加表单/定价表/页脚菜单；导航只留 4 项、统计只留 3 条；动画失效时静止态直接可见（不空白）",
    适用: "AI/基础设施/SaaS 发布首屏、模型或产品发布页、任何想用「一条活的光」撑起氛围的单屏叙事页",
    禁忌: "需要滚动脉络的内容站、信息密集后台；波光调成彩色会失掉基建感；导航超 4 项会淹没单屏",
    参考站: [
      "motionsites.ai（Agent Wave / Vesper.ai）"
    ],
    我的说明: "单屏锁定 + 一条活的光：页面不滚动，所有注意力交给一条缓慢流动的银灰波光与一句能力承诺。与 m001 的区别：m001 把交互交给用户（光标揭示），本方案把交互交给页面自己（波光自流）——用户只负责看。参考站 hero 是 CloudFront 视频，demo 改由 canvas 离线生成同气质波光+星野，零外链。",
    Agent提示词: `【暗色波光基建首屏 · 设计语言宪法】
效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。

第一章 总纲 · 设计哲学
单屏锁定叙事：纯黑画布上一条银灰波光缓缓流动，页面不滚动——导航、巨标、统计三层全部落进一屏，产品尚未解释、氛围先行。气质：冷、静、精密、基建感；密度极低，靠留白与「一条活的光」说话。适用：AI/基础设施/SaaS 发布首屏。参考：motionsites.ai Agent Wave（Vesper.ai）。

第二章 设计 Token 法典（取值唯一，禁止近似值）
2.1 颜色 colors（纯黑 70% / 白·银灰 22% / 玻璃白 8%）
  画布底 --di #000000（页面唯一底色，防白屏三连写法：CSS 首条 + body 属性 + var 回退）
  主文字 --zi #ffffff；次级文字 --cizi #9a9a9a（lede 与 H1 衬线 em 同色）
  统计文字 #d8d8d8（= 白 85% 透明度叠加在黑上）
  强调 --zhucai #ffffff（实心按钮唯一亮面，按钮字色按亮度自动取 #111/#fff）
  波光 --bolan #dfe6ef（页面唯一「活物」，禁止调成彩色）
  描边 rgba(255,255,255,.16) / 弱描边 .12
2.2 字体 typography
  字体栈："Inter" / system-ui / "Segoe UI"；H1 500 / -0.045em / 行高 1.12 / 字号 --h1（默认 48px，断点按倍率 34–88 缩放）
  仅 H1 中「AI agents」用 Instrument Serif Italic（回退 Times New Roman），1.08em、颜色 --cizi——比标题低一档制造反差
  lede 15.5px / 行高 1.55 / -0.015em；badge 12.5px；nav 14px；stat 13.5px
2.3 圆角 rounded：--yuanjiao 7px 为刻度——导航 7 / 按钮 6（-1px）/ 徽标 5（-2px）/ 手机菜单项 10（+3px），同一刻度加减不另设值
2.4 间距 spacing：--jianju 22px 为刻度——顶栏纵向 = jianju；badge 下距 = jianju；lede 上距 = jianju×.82；按钮组上距 = jianju×1.2；Hero 底距 = jianju×3.9（≈85px）；统计底距 = jianju×1.6
2.5 动效 motion
  入场序列 1.05s cubic-bezier(.16,1,.3,1) 依次：logo .08 → 导航 .16/.28/.40/.52 → 徽标 .22（弹出旋转）→ H1 两行遮罩 .42/.62 → lede .82（1.25s）→ 按钮 .96/1.10 → 统计 1.12/1.28/1.44
  关键纪律：静止态 opacity=1（动画失效页面也不空白）；波光 RAF 缓流、与滚动无关；prefers-reduced-motion 全关
2.6 层级 layout：颗粒罩(z100) → 页面内容(z1) → hero-photo 背景(z0 固定)；桌面 901px+ 单屏锁定 overflow:hidden，一屏讲完

第三章 组件规范 components（全部引用第二章 token）
  顶栏：grid 1fr auto 1fr；logo = SVG 标志（旋转 -30° 双柱）+ 字标（600/.-0.03em，后缀 .ai 400）
  液态金属药丸 navlink：高 40px、深灰渐变 105deg（#050505→#2a2a2a 48%→#4a4a4a）+ 灰描边 + ::before 高光 115deg 扫过（hover 0.6s）+ hover 提亮渐变与 18px 冷辉光
  主按钮 btn-solid：白渐变 180deg（#fff→91% 黑混→81% 黑混）+ inset 顶部高光 + hover 蓝白辉光 22px + 扫光
  次按钮 btn-ghost：玻璃渐变 135deg + 灰描边；hero 版加 blur(16px) 毛玻璃与更强 hover 辉光
  徽标 badge：90deg 深灰渐变（#7d7d7d→#2a2a2a 52%→#0a0a0a）+ 四角星 SVG（drop-shadow 微光 + 弹入旋转动画）
  统计 stat：20px 内联 SVG 图标（双色药丸 / 下载方块 / 三头像）+ 一句话，横排 space-between，禁止 emoji

第四章 布局法
  单屏三段 grid auto/1fr/auto；Hero 用 flex-end 底部居中（不是垂直居中——巨标压在统计上方才有「地基」感）
  文案限宽：copy-max 860 / lede-max 470 居中；背景满幅
  删减（明确不做什么）：无第二屏、无卡片阵、无表单/定价表/页脚菜单；导航只 4 项；统计只 3 条

第五章 深度与层级 depth
  背景三层：波光（canvas 细线群靠 blur(26px) 融成丝绢）→ 星野（锐利小点微闪）→ 底部压暗 scrim 托住文案
  前景不叠卡片、不用阴影分层；暗底靠明度差与背景光分前后

第六章 该做 / 不该做
  该做：黑底到底，唯一亮面 = 实心按钮 + 波光；衬线灰调 em 制造「人话说机器词」的反差；统计只放最硬的三条数字
  不该做：加第二屏/卡片阵/表单；波光调彩色；用 emoji 当图标；H1 整句都用衬线
  反例警示：波光加蓝紫渐变会让基建感秒变夜店风；导航超 4 项单屏被文字淹没；波光完全静止则页面失去「系统在运转」的暗示

第七章 文案规则
  badge = 品类定义句（如 Operational AI Infrastructure）；H1 = 动词开头的能力承诺（Train AI agents … in minutes.）；lede = 一句展开（learn, execute, and scale）；统计 = 数字 + 成果（4.2M+ workflows automated）
  语气克制、无感叹号；英文优先，中文场景可用「把 XX 交给 AI」句式

第八章 响应式行为
  1280/1600/1920/2560 四档 token 放大（H1 48→54→64→76→88）；901–1279 收缩；≥901 且矮窗（<850/<720）压间距保单屏
  ≤900 解锁滚动：汉堡按钮 + 全屏毛玻璃菜单（blur 24px、链接全宽 56px）、统计纵排居中、safe-area 适配；≤560 按钮纵排全宽

第九章 Agent 提示词指南
  配色卡：底 #000000 / 主文 #ffffff / 次文 #9a9a9a / 按钮 #ffffff / 波光 #dfe6ef
  字号卡：H1 48（断点 34–88）/ lede 15.5 / badge 12.5 / nav 14 / stat 13.5
  即拿即用：把以上 9 章套进你的内容，输出完整单页 HTML；hero 背景必须用 canvas 2D 离线生成波光+星野（禁止外链视频/图片），入场用纯 CSS keyframes + animationend 落定 + rAF 兜底。`,
    演示页: "assets/demos/方案-Vesper暗色波光首屏.html",
    代码: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>暗色波光基建首屏 · 方案</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cg transform='rotate(-30 12 12)'%3E%3Ccircle cx='7.3' cy='3.2' r='1.45'/%3E%3Crect x='5.5' y='4.7' width='3.6' height='14.6' rx='1.8'/%3E%3Crect x='14.9' y='4.7' width='3.6' height='14.6' rx='1.8'/%3E%3Ccircle cx='16.7' cy='20.8' r='1.45'/%3E%3C/g%3E%3C/svg%3E" />
<style>
  /* 防白屏三连：CSS 首条 + body 属性 + var 回退（任一先生效都不闪白） */
  html, body { background: #000000 !important; color: #ffffff; }
  html { scroll-behavior: smooth; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }

  :root{
    /* 防白屏第三连 + 画布 token */
    --bg: #000000; --bg2: var(--di, #000000);
    --text: #ffffff; --text2: var(--zi, #ffffff);
    --di:#000000; --zi:#ffffff; --cizi:#9a9a9a; --stat:#d8d8d8;
    --zhucai:#ffffff; --zhucai-on:#111111; --bolan:#dfe6ef;
    --border: rgba(255,255,255,.16); --border-soft: rgba(255,255,255,.12);
    /* 字号 token（参考站 1440px 基准） */
    --logo: 15.5px; --logo-mark: 22px; --nav: 14px; --nav-h: 40px;
    --btn: 13.5px; --btn-h: 40px; --hero-btn-h: 42px;
    /* h1 由 --h1size（可调参数）驱动，断点里按倍率缩放：默认倍率=1 即 48px */
    --h1size: 48px; --h1: var(--h1size);
    --lede: 15.5px; --badge: 12.5px; --stat-size: 13.5px;
    /* 间距 token 由 --jianju（可调参数，默认 22px）推导，默认值=参考站取值 */
    --jianju: 22px;
    --header-y: var(--jianju);
    --header-x: 40px; --stats-x: 72px;
    --hero-gap: calc(var(--jianju) * 3.9);
    --stats-y: calc(var(--jianju) * 1.6);
    --copy-max: 860px; --ledekuan: 470px;
    /* 效果参数（JS / postMessage 驱动） */
    --yuanjiao: 7px; --keli: 16; --bolansu: 1; --xingxing: 220;
    color-scheme: dark;
  }

  body{
    background:#000; background:var(--bg,#000); background:var(--di,#000);
    color:#fff; color:var(--zi,#fff);
    font-family:"Inter",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;
    overflow-x:hidden;position:relative;
  }

  /* ===== 背景：hero-photo（离线 canvas 波光 + 星野，替代原站视频） ===== */
  .hero-photo{position:fixed;inset:0;z-index:0;overflow:hidden;background:var(--di);
    animation:photo-in 1.8s cubic-bezier(.16,1,.3,1) both;}
  .hero-photo.is-in{animation:none;}
  #cloud{position:absolute;inset:0;display:block;
    /* 波带画成锐利细线，靠 CSS 模糊融成丝绢；scale 防止模糊边缘露黑框 */
    filter:blur(26px);transform:scale(1.14);}
  #starcv{position:absolute;inset:0;display:block;}
  .hero-photo::after{content:"";position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(180deg,rgba(0,0,0,.30),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 55%,rgba(0,0,0,.58));}
  @keyframes photo-in{from{opacity:0;transform:scale(1.04);}to{opacity:1;transform:none;}}

  /* 颗粒：SVG feTurbulence 内联 data URI，离线可用 */
  .grain{position:fixed;inset:0;z-index:100;pointer-events:none;opacity:calc(var(--keli) / 100);
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
    background-size:300px 300px;}

  .page{position:relative;z-index:1;display:grid;grid-template-rows:auto 1fr auto;min-height:100vh;min-height:100dvh;}

  /* ===== Header：三列网格 logo | 导航 | CTA ===== */
  .header{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;
    padding:var(--header-y) var(--header-x) 10px;position:relative;z-index:50;}
  .logo{display:inline-flex;align-items:center;gap:9px;justify-self:start;
    font-size:var(--logo);font-weight:600;letter-spacing:-0.03em;color:#fff;color:var(--zi);}
  .logo-mark{width:var(--logo-mark);height:var(--logo-mark);flex:none;}
  .logo-suffix{font-weight:400;}

  .navlink{display:inline-flex;align-items:center;position:relative;overflow:hidden;
    height:var(--nav-h);padding:0 18px;border-radius:var(--yuanjiao);
    border:1px solid rgba(198,198,198,.55);
    background:linear-gradient(105deg,#050505 0%,#2a2a2a 48%,#4a4a4a 100%);
    color:#f3f3f3;font-size:var(--nav);font-weight:400;letter-spacing:-0.01em;white-space:nowrap;
    transition:background .35s ease,border-color .35s ease,box-shadow .35s ease;}
  .navlink::before{content:"";position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.16) 50%,transparent 70%);
    transform:translateX(-120%);}
  .navlink:hover::before{transform:translateX(120%);transition:transform .6s ease;}
  .navlink:hover{border-color:rgba(235,235,235,.9);
    background:linear-gradient(105deg,#111 0%,#3a3a3a 45%,#6a6a6a 100%);
    box-shadow:0 0 18px rgba(200,210,230,.18);}
  #site-nav{display:flex;align-items:center;gap:8px;justify-self:center;}

  .header-right{display:inline-flex;align-items:center;gap:8px;justify-self:end;}

  /* ===== 按钮：液态玻璃语言 ===== */
  .btn{position:relative;isolation:isolate;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;
    height:var(--btn-h);padding:0 16px;border-radius:calc(var(--yuanjiao) - 1px);
    font-size:var(--btn);font-weight:500;letter-spacing:-0.02em;line-height:1;white-space:nowrap;cursor:pointer;
    transition:background .35s,border-color .35s,box-shadow .35s,color .35s,filter .35s;}
  .btn::after{content:"";position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(115deg,transparent 20%,rgba(255,255,255,.45) 48%,transparent 76%);
    transform:translateX(-130%);}
  .btn:hover::after{transform:translateX(130%);transition:transform .65s ease;}
  .btn-solid{background:linear-gradient(180deg,var(--zhucai) 0%,color-mix(in srgb,var(--zhucai) 91%,#000) 48%,color-mix(in srgb,var(--zhucai) 81%,#000) 100%);
    color:var(--zhucai-on);border:1px solid var(--zhucai);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.95);}
  .btn-solid:hover{filter:brightness(1.04);
    box-shadow:inset 0 1px 0 #fff,0 0 22px rgba(186,208,255,.35),0 8px 18px rgba(255,255,255,.12);}
  .btn-ghost{background:linear-gradient(135deg,rgba(255,255,255,.1),rgba(0,0,0,.45) 50%,rgba(160,175,200,.08));
    color:#fff;color:var(--zi);border:1px solid rgba(198,198,198,.45);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.12);}
  .btn-ghost:hover{background:linear-gradient(135deg,rgba(210,225,255,.18),rgba(0,0,0,.35) 48%,rgba(180,195,220,.16));
    border-color:rgba(220,230,255,.75);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 0 20px rgba(170,200,255,.22);}
  .header-cta{justify-self:end;}

  /* 汉堡：桌面隐藏，≤900 显示 */
  .burger{display:none;width:42px;height:42px;border-radius:calc(var(--yuanjiao) - 1px);
    border:1px solid var(--border);background:rgba(8,8,8,.55);cursor:pointer;
    z-index:60;place-items:center;align-content:center;justify-items:center;gap:5px;
    transition:border-color .25s,background .25s;}
  .burger span{display:block;width:16px;height:1.5px;border-radius:1px;background:#fff;
    transition:transform .25s,opacity .2s;}
  .burger:hover{border-color:rgba(255,255,255,.32);background:rgba(255,255,255,.05);}
  body.menu-open .burger span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}
  body.menu-open .burger span:nth-child(2){opacity:0;}
  body.menu-open .burger span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}

  /* ===== Hero：底部居中（不是垂直居中） ===== */
  .hero{display:flex;align-items:flex-end;justify-content:center;padding:8px 24px var(--hero-gap);min-height:0;}
  .hero-copy{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;
    max-width:var(--copy-max);width:100%;}

  .badge{display:inline-flex;align-items:center;gap:8px;margin-bottom:var(--jianju);padding:9px 15px;border:0;
    border-radius:calc(var(--yuanjiao) - 2px);
    background:linear-gradient(90deg,#7d7d7d 0%,#2a2a2a 52%,#0a0a0a 100%);
    color:#f2f2f2;font-size:var(--badge);font-weight:400;letter-spacing:-0.01em;}
  .badge-star{flex:none;filter:drop-shadow(0 0 3px rgba(255,255,255,.45));animation:in-star .9s cubic-bezier(.16,1,.3,1) .28s both;}
  @keyframes in-star{from{transform:scale(.2) rotate(-50deg);}65%{transform:scale(1.2) rotate(8deg);}to{transform:none;}}

  h1{display:flex;flex-direction:column;align-items:center;color:#fff;color:var(--zi);
    font-size:var(--h1);font-weight:500;letter-spacing:-0.045em;line-height:1.12;}
  .headline-line{display:block;overflow:hidden;padding:0.06em 0.15em 0.14em;}
  .hl{display:block;}
  h1 em{font-family:"Instrument Serif","Times New Roman",Times,serif;font-style:italic;font-weight:400;
    font-size:1.08em;letter-spacing:-0.03em;color:#9a9a9a;color:var(--cizi);
    animation:in-em 1.2s cubic-bezier(.16,1,.3,1) .72s both;}
  @keyframes in-em{from{opacity:.35;filter:blur(4px);}to{opacity:1;filter:none;}}

  .lede{max-width:var(--ledekuan);margin-top:calc(var(--jianju) * .82);color:#9a9a9a;color:var(--cizi);
    font-size:var(--lede);font-weight:400;line-height:1.55;letter-spacing:-0.015em;}
  .hero-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-top:calc(var(--jianju) * 1.2);}
  .hero-actions .btn{height:var(--hero-btn-h);padding:0 18px;}
  .hero-actions .btn-solid:hover{box-shadow:inset 0 1px 0 #fff,0 0 26px rgba(186,208,255,.4),0 8px 18px rgba(255,255,255,.14);}
  .hero-actions .btn-ghost{background:linear-gradient(135deg,rgba(255,255,255,.12),rgba(0,0,0,.5) 46%,rgba(150,170,200,.1));
    border-color:rgba(198,198,198,.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);}
  .hero-actions .btn-ghost:hover{border-color:rgba(220,230,255,.8);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 0 24px rgba(170,200,255,.28);}

  /* ===== Stats 页脚 ===== */
  .stats{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:nowrap;
    padding:0 var(--stats-x);padding-bottom:max(var(--stats-y),env(safe-area-inset-bottom));
    color:#d8d8d8;color:color-mix(in srgb,var(--zi) 85%,transparent);}
  .stat{display:inline-flex;align-items:center;gap:14px;font-size:var(--stat-size);letter-spacing:-0.015em;white-space:nowrap;}
  .stat-icon{width:20px;height:20px;flex:none;}
  .stat-icon-wide{width:38px;height:21px;}

  /* ===== 入场动效：静止态 opacity=1（动画失效也不空白），靠 fill-mode:both 在延迟期隐藏 ===== */
  .appear{opacity:1;animation-duration:1.05s;animation-fill-mode:both;
    animation-timing-function:cubic-bezier(.16,1,.3,1);animation-delay:var(--d,.08s);}
  .appear.is-in,.hero-photo.is-in{animation:none;opacity:1;transform:none;clip-path:none;filter:none;}
  .appear--scale{animation-name:in-scale;}
  .appear--soft{animation-name:in-soft;}
  .appear--mask{animation-name:in-mask;}
  .appear--pop{animation-name:in-pop;}
  .appear--btn{animation-name:in-btn;}
  .appear--side{animation-name:in-side;}
  .appear--stat{animation-name:in-stat;}
  @keyframes in-scale{from{opacity:0;transform:scale(.84);}to{opacity:1;transform:none;}}
  @keyframes in-soft{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
  @keyframes in-mask{from{opacity:0;transform:translateY(40%);}to{opacity:1;transform:none;}}
  @keyframes in-pop{from{transform:scale(.9);}70%{transform:scale(1.03);}to{transform:scale(1);}}
  @keyframes in-btn{from{opacity:0;transform:translateY(18px) scale(.94);}to{opacity:1;transform:none;}}
  @keyframes in-side{from{opacity:0;transform:translateX(22px);}to{opacity:1;transform:none;}}
  @keyframes in-stat{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:none;}}

  /* ===== 断点 token（参考站规格；h1 用 --h1size 倍率保持参数可调） ===== */
  @media (min-width:1280px) and (max-width:1599px){:root{--h1:calc(var(--h1size)*1.125);--lede:16px;--header-x:48px;--stats-x:80px;--copy-max:900px;}}
  @media (min-width:1600px){:root{--logo:17px;--logo-mark:24px;--nav:15px;--nav-h:44px;--btn:15px;--btn-h:44px;--hero-btn-h:48px;
    --h1:calc(var(--h1size)*1.33);--lede:18px;--badge:13.5px;--stat-size:15px;--header-y:28px;--header-x:64px;--stats-x:96px;--stats-y:44px;
    --copy-max:980px;--ledekuan:540px;}
    #site-nav{gap:10px;}.navlink{padding:0 20px;}.badge{margin-bottom:26px;}.lede{margin-top:22px;}
    .hero-actions{margin-top:30px;gap:12px;}.stat-icon{width:22px;height:22px;}.stat-icon-wide{width:45px;height:24px;}}
  @media (min-width:1920px){:root{--logo:18px;--logo-mark:26px;--nav:16px;--nav-h:48px;--btn:16px;--btn-h:48px;--hero-btn-h:52px;
    --h1:calc(var(--h1size)*1.58);--lede:20px;--badge:14.5px;--stat-size:16px;--header-y:32px;--header-x:80px;--stats-x:120px;--stats-y:52px;
    --copy-max:1120px;--ledekuan:620px;}
    #site-nav{gap:10px;}.navlink{padding:0 22px;}.btn{padding:0 22px;}.badge{padding:10px 15px;}.stat-icon-wide{width:48px;height:26px;}}
  @media (min-width:2560px){:root{--h1:calc(var(--h1size)*1.83);--lede:22px;--header-x:120px;--stats-x:160px;--copy-max:1280px;--ledekuan:680px;}}
  @media (min-width:901px) and (max-width:1279px){:root{--logo:15px;--nav:13px;--nav-h:36px;--btn:13px;--btn-h:38px;--hero-btn-h:40px;
    --h1:calc(var(--h1size)*.875);--lede:15px;--badge:12px;--stat-size:12.5px;--header-y:16px;--header-x:28px;--stats-x:36px;--stats-y:28px;
    --copy-max:760px;--ledekuan:440px;}
    .hero{padding-bottom:calc(var(--jianju) * 2.9);}.navlink{padding:0 14px;}
    .badge{margin-bottom:16px;}.lede{margin-top:14px;}.hero-actions{margin-top:20px;}}
  /* 桌面矮窗压缩 + 单屏锁定（无滚动） */
  @media (min-width:901px) and (max-height:850px){:root{--header-y:14px;--stats-y:24px;--h1:calc(var(--h1size)*.833);}
    .hero{padding-bottom:48px;}.badge{margin-bottom:12px;}.lede{margin-top:12px;}.hero-actions{margin-top:16px;}}
  @media (min-width:901px) and (max-height:720px){:root{--h1:calc(var(--h1size)*.708);--lede:14px;--nav-h:30px;--btn-h:34px;--hero-btn-h:36px;--stats-y:18px;}
    .hero{padding-bottom:32px;}.badge{margin-bottom:8px;}}
  @media (min-width:901px){.page{min-height:100vh;min-height:100dvh;}}

  /* ===== ≤900 手机：解锁滚动 + 全屏菜单 + 纵排统计 ===== */
  @media (max-width:900px){
    :root{--logo:16px;--btn:15px;--btn-h:46px;--hero-btn-h:48px;--h1:calc(var(--h1size)*.75);--lede:16.5px;--badge:13.5px;
      --stat-size:15px;--header-y:16px;--header-x:18px;--stats-x:20px;--stats-y:28px;}
    html,body{height:auto;overflow-x:hidden;overflow-y:auto;}
    .page{height:auto;min-height:100vh;min-height:100dvh;}
    .header{grid-template-columns:1fr auto auto;gap:8px;padding-top:max(var(--header-y),env(safe-area-inset-top));}
    .header-right{gap:8px;}
    .logo,.header-cta,.burger{position:relative;z-index:80;}
    .burger{display:grid;}
    .menu-backdrop{display:block;position:fixed;inset:0;z-index:40;background:rgba(8,8,8,.42);
      opacity:0;visibility:hidden;transition:opacity .28s,visibility .28s;}
    body.menu-open .menu-backdrop{opacity:1;visibility:visible;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);}
    #site-nav{position:fixed;inset:0;z-index:45;flex-direction:column;justify-content:center;align-items:stretch;gap:12px;
      padding:96px 22px 32px;padding-top:max(96px,calc(env(safe-area-inset-top) + 88px));
      background:transparent;visibility:hidden;opacity:0;transition:opacity .28s,visibility .28s;}
    body.menu-open #site-nav{visibility:visible;opacity:1;}
    body.menu-open{overflow:hidden;}
    #site-nav .navlink{width:100%;height:56px;font-size:19px;border-radius:calc(var(--yuanjiao) + 3px);justify-content:center;}
    .hero{padding:20px 20px 64px;align-items:flex-end;}
    .hero-copy{max-width:100%;}
    .lede{max-width:100%;}
    .stats{flex-direction:column;align-items:center;gap:16px;}
    .stat{white-space:normal;}
  }
  @media (max-width:560px){:root{--h1:calc(var(--h1size)*.708);--lede:16px;--header-x:16px;}
    .hero-actions{flex-direction:column;align-items:stretch;}
    .hero-actions .btn{width:100%;}}

  @media (prefers-reduced-motion:reduce){
    *,*::before,*::after{transition:none !important;animation:none !important;}
    .appear,.hero-photo,.hl,h1 em,.badge-star{opacity:1 !important;transform:none !important;clip-path:none !important;filter:none !important;}
  }

  /* ===== 设计 Token 预览段（方案版追加）：色板 / 字号 / 按钮层级一眼可验收 ===== */
  .tokens{position:relative;z-index:1;background:#050505;border-top:1px solid var(--border-soft);
    padding:calc(var(--jianju)*2.4) var(--header-x);}
  .tokens h2{font-size:15px;font-weight:800;letter-spacing:.04em;color:rgba(255,255,255,.9);margin-bottom:calc(var(--jianju)*1.1);}
  .tok-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:calc(var(--jianju)*1.4);align-items:start;max-width:var(--copy-max);margin:0 auto;}
  .swatches{display:flex;gap:10px;flex-wrap:wrap;}
  .sw{width:64px;height:64px;border-radius:calc(var(--yuanjiao) + 5px);position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08);}
  .sw span{position:absolute;left:6px;bottom:5px;font-size:9px;color:rgba(255,255,255,.85);text-shadow:0 1px 2px rgba(0,0,0,.6);}
  .comp{display:flex;flex-direction:column;gap:14px;margin-top:calc(var(--jianju)*1.2);align-items:flex-start;}
  .card{background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(0,0,0,.4) 50%,rgba(160,175,200,.06));
    border:1px solid var(--border);border-radius:calc(var(--yuanjiao) + 7px);padding:16px;max-width:320px;}
  .card b{color:#fff;font-size:14px;}
  .card p{color:var(--cizi);font-size:12px;margin-top:4px;line-height:1.6;}
  .type .t{line-height:1.5;color:var(--zi);margin-bottom:6px;}
  .type .t.d{font-size:34px;font-weight:500;letter-spacing:-.045em;}
  .type .t.d em{font-family:"Instrument Serif","Times New Roman",Times,serif;font-style:italic;font-weight:400;color:var(--cizi);font-size:1.08em;}
  .type .t.h{font-size:20px;font-weight:600;letter-spacing:-.02em;}
  .type .t.b{font-size:14px;color:var(--cizi);}
  .type .t.c{font-size:12px;color:var(--cizi);opacity:.7;}
  @media (max-width:760px){.tok-grid{grid-template-columns:1fr;}}
</style>
</head>
<body style="background:#000;color:#fff">

  <div class="grain" aria-hidden="true"></div>

  <div class="hero-photo" aria-hidden="true">
    <canvas id="cloud"></canvas>
    <canvas id="starcv"></canvas>
  </div>

  <div class="page">
    <div class="menu-backdrop" id="menuBackdrop"></div>

    <header class="header">
      <a class="logo appear appear--scale" href="#top" aria-label="Vesper.ai" style="--d:.08s">
        <svg class="logo-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <g transform="rotate(-30 12 12)">
            <circle cx="7.3" cy="3.2" r="1.45"/>
            <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8"/>
            <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8"/>
            <circle cx="16.7" cy="20.8" r="1.45"/>
          </g>
        </svg>
        <span>Vesper<span class="logo-suffix">.ai</span></span>
      </a>

      <nav id="site-nav" aria-label="Primary">
        <a class="navlink appear appear--scale" href="#benefits" style="--d:.16s">Benefits</a>
        <a class="navlink appear appear--soft" href="#how-it-works" style="--d:.28s">How It Works</a>
        <a class="navlink appear appear--scale" href="#faqs" style="--d:.40s">FAQs</a>
        <a class="navlink appear appear--soft" href="#pricing" style="--d:.52s">Pricing</a>
      </nav>

      <div class="header-right">
        <a class="btn btn-solid header-cta appear appear--scale" href="#start" style="--d:.34s">Start for Free</a>
        <button class="burger appear appear--scale" id="burger" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu" style="--d:.34s">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <main class="hero" id="top">
      <div class="hero-copy">
        <div class="badge appear appear--pop" style="--d:.22s">
          <svg class="badge-star" width="18" height="20" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
            <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
          </svg>
          Operational AI Infrastructure
        </div>

        <h1>
          <span class="headline-line"><span class="hl appear appear--mask" style="--d:.42s">Train <em>AI agents</em> on your</span></span>
          <span class="headline-line"><span class="hl appear appear--mask" style="--d:.62s">workflows in minutes.</span></span>
        </h1>

        <p class="lede appear appear--soft" style="--d:.82s;animation-duration:1.25s">Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.</p>

        <div class="hero-actions">
          <a class="btn btn-solid appear appear--btn" href="#start" style="--d:.96s">Start for Free</a>
          <a class="btn btn-ghost appear appear--side" href="#demo" style="--d:1.10s">See it in action</a>
        </div>
      </div>
    </main>

    <footer class="stats">
      <div class="stat appear appear--stat" style="--d:1.12s">
        <svg class="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="vga" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#ffffff" stop-opacity=".38"/><stop offset="1" stop-color="#3a3a3a" stop-opacity=".62"/>
            </linearGradient>
            <linearGradient id="vgb" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#3a3a3a" stop-opacity=".38"/><stop offset="1" stop-color="#ffffff" stop-opacity=".62"/>
            </linearGradient>
          </defs>
          <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#vga)"/>
          <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#vgb)"/>
          <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a"/>
        </svg>
        <span>4.2M+ workflows automated</span>
      </div>

      <div class="stat appear appear--stat" style="--d:1.28s">
        <svg class="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff"/>
          <path d="M12 7.1v7.4" stroke="#111111" stroke-width="1.85" stroke-linecap="round"/>
          <path d="M8.15 12.35L12 16.2l3.85-3.85" stroke="#111111" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <span>92% reduction in manual operations</span>
      </div>

      <div class="stat appear appear--stat" style="--d:1.44s">
        <svg class="stat-icon stat-icon-wide" viewBox="0 0 40 22" aria-hidden="true">
          <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b"/>
          <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4"/>
          <path d="M4.9 8.6l2.4 1.7-2.5 1.2z" fill="#2b2b2b"/>
          <path d="M15.5 8.6l-2.4 1.7 2.5 1.2z" fill="#2b2b2b"/>
          <circle cx="8.9" cy="11.6" r="0.7" fill="#1a1a1a"/><circle cx="11.5" cy="11.6" r="0.7" fill="#1a1a1a"/>
          <circle cx="20.2" cy="11" r="9.2" fill="#ffffff"/>
          <circle cx="17.6" cy="9.8" r="1.7" fill="#111111"/><circle cx="22.8" cy="9.8" r="1.7" fill="#111111"/>
          <ellipse cx="20.2" cy="13.4" rx="1.2" ry="0.9" fill="#111111"/>
          <path d="M17.8 15.6q2.4 2 4.8 0" stroke="#111111" stroke-width="1.2" fill="none" stroke-linecap="round"/>
          <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d"/>
          <text x="30.2" y="15.1" font-family="Inter,system-ui,sans-serif" font-weight="700" font-size="12.5" fill="#ffffff" text-anchor="middle">e</text>
        </svg>
        <span>180+ operational teams onboarded</span>
      </div>
    </footer>
  </div>


  <section class="tokens">
    <h2>设计 Token 预览</h2>
    <div class="tok-grid">
      <div>
        <div class="swatches">
          <div class="sw" style="background:var(--di)"><span>di</span></div>
          <div class="sw" style="background:var(--zi)"><span>zi</span></div>
          <div class="sw" style="background:var(--cizi)"><span>cizi</span></div>
          <div class="sw" style="background:var(--zhucai)"><span>zhucai</span></div>
          <div class="sw" style="background:linear-gradient(135deg,var(--bolan),#0a0a0a)"><span>bolan</span></div>
        </div>
        <div class="comp">
          <button class="btn btn-solid" type="button">主按钮 · Start for Free</button>
          <button class="btn btn-ghost" type="button">次按钮 · See it in action</button>
          <div class="card"><b>液态玻璃卡片</b><p>玻璃渐变 + 细描边 + 小圆角，承载次级信息；暗底上只靠明度差分层，不加彩色阴影。</p></div>
        </div>
      </div>
      <div class="type">
        <div class="t d">Train <em>AI agents</em> — Display</div>
        <div class="t h">Heading — Operational AI Infrastructure</div>
        <div class="t b">Body — Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.</div>
        <div class="t c">Caption — 4.2M+ workflows automated · 元信息与统计标注</div>
      </div>
    </div>
  </section>

<script>
(function(){
  'use strict';
  var state = {
    di:'#000000', zi:'#ffffff', cizi:'#9a9a9a', zhucai:'#ffffff', bolan:'#dfe6ef',
    h1:48, yuanjiao:7, jianju:22, ledekuan:470, bolansu:1, keli:16, xingxing:220
  };

  /* ===== 波光 + 星野（离线 canvas，替代原站 CloudFront 视频） ===== */
  var cloud = document.getElementById('cloud');
  var starcv = document.getElementById('starcv');
  var cctx = cloud.getContext('2d');
  var sctx = starcv.getContext('2d');
  var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  var starList = [], seeded = 0;

  function hexToRgb(h){
    var v = parseInt(String(h).replace('#',''), 16);
    return [(v>>16)&255, (v>>8)&255, v&255];
  }
  function lum(h){
    var c = hexToRgb(h);
    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2];
  }
  function resize(){
    W = window.innerWidth; H = window.innerHeight;
    [cloud, starcv].forEach(function(c){
      c.width = Math.round(W*DPR); c.height = Math.round(H*DPR);
      c.style.width = W+'px'; c.style.height = H+'px';
      c.getContext('2d').setTransform(DPR,0,0,DPR,0,0);
    });
    seedStars();
  }
  function seedStars(){
    starList = [];
    for (var i=0;i<state.xingxing;i++){
      starList.push({
        x: Math.random()*W, y: Math.random()*H,
        r: Math.random()*0.9 + 0.3,
        a: Math.random()*0.6 + 0.15,
        p: Math.random()*Math.PI*2,
        s: Math.random()*1.4 + 0.4
      });
    }
    seeded = state.xingxing;
  }
  /* 波带轮廓：三个不同频率的正弦叠加，随时间漂移 */
  function yAt(x, off){
    return H*0.60
      + Math.sin(x*0.0021 + off*0.02 + t*0.55) * H*0.13
      + Math.sin(x*0.0047 - off*0.012 - t*0.8) * H*0.05
      + Math.sin(x*0.0009 + t*0.3) * H*0.07
      + off;
  }
  var t = 0, last = 0;
  function drawWave(now){
    var dt = Math.min(0.05, (now - last)/1000 || 0.016); last = now;
    t += dt * state.bolansu;
    var c = cctx, rgb = hexToRgb(state.bolan);
    c.clearRect(0,0,W,H);
    c.globalCompositeOperation = 'lighter';
    /* 46 条同轮廓细线横向展开：中心最亮，靠 CSS blur 融成丝绢亮带 */
    for (var i=0;i<46;i++){
      var k = i/45;
      var off = (k - 0.5) * H*0.30;
      var a = Math.pow(Math.cos((k - 0.5)*Math.PI), 2.2);
      c.beginPath();
      for (var x=-40; x<=W+40; x+=14){
        var y = yAt(x, off);
        if (x===-40) c.moveTo(x,y); else c.lineTo(x,y);
      }
      c.strokeStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+(0.045 + 0.42*a).toFixed(3)+')';
      c.lineWidth = 8 + 20*a;
      c.stroke();
    }
    /* 波带下方的大面积暗光，给「海面」体积感 */
    c.beginPath(); c.moveTo(-40, H+40);
    for (var x2=-40; x2<=W+40; x2+=16) c.lineTo(x2, yAt(x2, H*0.02));
    c.lineTo(W+40, H+40); c.closePath();
    var g = c.createLinearGradient(0, H*0.25, 0, H);
    g.addColorStop(0, 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.16)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.fill();
    c.globalCompositeOperation = 'source-over';
  }
  function drawStars(now){
    sctx.clearRect(0,0,W,H);
    sctx.fillStyle = '#fff';
    for (var i=0;i<starList.length;i++){
      var st = starList[i];
      var tw = 0.55 + 0.45*Math.sin(now*0.001*st.s + st.p);
      sctx.globalAlpha = st.a * tw;
      sctx.beginPath(); sctx.arc(st.x, st.y, st.r, 0, 6.2832); sctx.fill();
    }
    sctx.globalAlpha = 1;
  }
  function loop(now){ drawWave(now); drawStars(now); requestAnimationFrame(loop); }

  window.addEventListener('resize', resize);

  /* ===== 调参契约：postMessage({type:'param',key,value})，键↔CSS 变量一致 ===== */
  function apply(){
    var R = document.documentElement.style;
    R.setProperty('--di', state.di);
    R.setProperty('--zi', state.zi);
    R.setProperty('--cizi', state.cizi);
    R.setProperty('--zhucai', state.zhucai);
    R.setProperty('--zhucai-on', lum(state.zhucai) > 150 ? '#111111' : '#ffffff');
    R.setProperty('--bolan', state.bolan);
    R.setProperty('--h1size', state.h1 + 'px');
    R.setProperty('--yuanjiao', state.yuanjiao + 'px');
    R.setProperty('--jianju', state.jianju + 'px');
    R.setProperty('--ledekuan', state.ledekuan + 'px');
    R.setProperty('--bolansu', state.bolansu);
    R.setProperty('--keli', state.keli);
    if (seeded !== state.xingxing) seedStars();
  }
  window.addEventListener('message', function(e){
    var d = e.data;
    if (!d || d.type !== 'param') return;
    if (!(d.key in state)) return;
    state[d.key] = d.value;
    apply();
  });

  /* ===== 入场动效：各自 animationend 落定 is-in；动画没跑就整体兜底 ===== */
  var appearEls = document.querySelectorAll('.appear');
  appearEls.forEach(function(el){
    el.addEventListener('animationend', function(){ el.classList.add('is-in'); }, { once:true });
  });
  requestAnimationFrame(function(){ requestAnimationFrame(function(){
    var any = false;
    appearEls.forEach(function(el){
      var list = el.getAnimations ? el.getAnimations() : [];
      for (var i=0;i<list.length;i++){
        var ps = list[i].playState;
        if (ps === 'running' || ps === 'finished'){ any = true; break; }
      }
    });
    if (!any){
      document.querySelectorAll('.appear, .hero-photo').forEach(function(el){ el.classList.add('is-in'); });
    }
  });});

  /* ===== 手机全屏菜单 ===== */
  var burger = document.getElementById('burger');
  function closeMenu(){
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded','false');
    burger.setAttribute('aria-label','Open menu');
  }
  burger.addEventListener('click', function(){
    var open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('#site-nav a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  window.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function(){
    if (window.matchMedia('(min-width: 901px)').matches) closeMenu();
  });

  resize();
  apply();
  requestAnimationFrame(loop);
})();
<\/script>
</body>
</html>
`,
    片段: `:root{--di:#000000;--zi:#ffffff;--cizi:#9a9a9a;--zhucai:#ffffff;--bolan:#dfe6ef;--yuanjiao:7px;--jianju:22px;}
.navlink{height:40px;padding:0 18px;border:1px solid rgba(198,198,198,.55);border-radius:var(--yuanjiao);background:linear-gradient(105deg,#050505,#2a2a2a 48%,#4a4a4a);}
.btn-solid{background:linear-gradient(180deg,var(--zhucai),color-mix(in srgb,var(--zhucai) 81%,#000));color:#111;border-radius:calc(var(--yuanjiao) - 1px);}
.hero{display:flex;align-items:flex-end;justify-content:center;padding:8px 24px calc(var(--jianju)*3.9);min-height:100vh;}
h1 em{font-family:"Instrument Serif","Times New Roman",Times,serif;font-style:italic;color:var(--cizi);font-size:1.08em;}
.stat{display:inline-flex;align-items:center;gap:14px;font-size:13.5px;color:#d8d8d8;}`, 
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#000000"},
      {键:"zi",名:"主文字色",类型:"color",默认:"#ffffff"},
      {键:"cizi",名:"次要文字色",类型:"color",默认:"#9a9a9a"},
      {键:"zhucai",名:"实心按钮色",类型:"color",默认:"#ffffff"},
      {键:"bolan",名:"波光色",类型:"color",默认:"#dfe6ef"},
      {键:"h1",名:"标题字号（px）",类型:"slider",最小:28,最大:96,步长:1,默认:48},
      {键:"yuanjiao",名:"圆角（px）",类型:"slider",最小:0,最大:1000,步长:1,默认:7},
      {键:"jianju",名:"间距刻度（px）",类型:"slider",最小:12,最大:36,步长:1,默认:22},
      {键:"ledekuan",名:"正文宽度（px）",类型:"slider",最小:320,最大:760,步长:10,默认:470},
      {键:"bolansu",名:"波光流速",类型:"slider",最小:0,最大:3,步长:0.1,默认:1},
      {键:"keli",名:"颗粒强度（%）",类型:"slider",最小:0,最大:40,步长:1,默认:16},
      {键:"xingxing",名:"星点数量",类型:"slider",最小:0,最大:500,步长:10,默认:220}
    ],
    来源: "网站拆解：motionsites.ai Agent Wave（Vesper.ai 演示页，2026-09-16 提取；原站 hero 为 CloudFront 视频，demo 改由 canvas 2D 离线生成波光+星野；结构与交互按手法参考、代码自写；原素材 v219 已并入本方案、不在素材库另存副本）"
  },
  {
    id: "m003",
    风格名: "玻璃装置首屏",
    骨架: "设计单位系统（--u）+ 玻璃装置影棚 + 绝对定位锚点",
    配色: {
      "浅蓝白影棚(画布)": "62%",
      "深墨(文字与唯一深色CTA)": "26%",
      "玻璃白与强调蓝": "12%"
    },
    布局骨架: "单屏七件：左上品牌 / 顶部居中玻璃导航胶囊 / 右上深色 CTA / 左侧 eyebrow + 双行巨标 + 播放钮与 slogan / 右侧玻璃面板（能力 + 量程 + 刻度）/ 底部统计（112+ ｜ 55K+）与 Meet 胶囊。宽屏包裹层 display:contents，子元素靠 .t/.c/.b/.r 锚点 + 行内 --x/--y 绝对落位；紧凑档包裹层接管为一列 space-between，紧凑横屏回两栏",
    重色落点: "浅蓝白影棚占满画面，深墨只出现在文字与唯一一枚深色 CTA；强调蓝仅两处（面板圆点与刻度填充）；装置球体是画面唯一的大体量物体，玻璃刃从中穿过",
    第一屏内容: "左上条纹球品牌 + 透明玻璃导航胶囊（Explore / Product）+ 右上深色 CTA；左侧 eyebrow 一句 + 双行大标题（Smarter Security / Starts Here）+ 播放钮与 slogan；右侧毛玻璃面板 + 底部两组统计与 Meet Sentinel 胶囊",
    删减元素: "不加第二屏、不加卡片阵、不加页脚菜单、同屏只有一个实心按钮；玻璃面不加投影；装置不做彩色；--sx 光学字宽不归一化",
    适用: "安全/基础设施/云服务的官网首屏、产品发布页、企业级 SaaS 落地页——想要「精密、清透、有秩序」的冷感而不牺牲信息量",
    禁忌: "内容密集的后台；需要一屏讲清多个卖点的促销页；做不出装置底板时硬套（会退化成普通浅色 Hero）",
    参考站: [
      "motionsites.ai（nival-cyberspace / ConSentinel）"
    ],
    我的说明: "本案的骨架不是「好看」而是「度量」：--u 设计单位 + 绝对定位锚点让 1280×960 原稿的每个落点都能被复刻，背景铺满而组件不走形——这是从原素材 v228 升维成方案后新增的价值。与 m001（光标揭示）、m002（波光单屏）的区别：那两套靠「一条活的光」，本案靠「一颗静止的玻璃装置 + 精密的度量秩序」。原素材已并入本方案，不在素材库另存副本。",
    Agent提示词: `【玻璃装置首屏 · 设计语言宪法】
效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。

第一章 总纲 · 设计哲学
单屏玻璃装置 Hero：浅蓝白影棚里一颗贯穿玻璃刃的水晶球，品牌、导航、CTA、主标题、能力面板、统计、次 CTA 七件全部落进一屏——密度低但信息完备。气质：精密、清透、有秩序、克制的冷感。度量哲学是本案的骨架：一切尺寸来自 1280×960 原稿的 --u 设计单位，背景铺满视口、组件保持实测尺寸，任何窗口比例都不走样。

第二章 设计 Token 法典（取值唯一，禁止近似值）
2.1 颜色 colors（浅蓝白 62% / 深墨 26% / 玻璃白与强调蓝 12%）
  画布底 --yan #E6EDF6（影棚底，全页唯一大面积色）
  主文字 --mo #020C21；--ink-soft #0F182F（slogan）；--muted #59627E（eyebrow）；--muted2 #4D5B77（面板副文）
  实心 CTA --cta #0F1B31（页面唯一深色块）；旋钮 --cta-knob #384B64 / --meet-knob #1A2B45
  强调 --qiang #4A78B0（只出现在面板圆点与刻度填充）；轨道 --track #DDE4EE
  装置球体 --qiut #dfe9f4（canvas 底板用色，禁止彩色化）
2.2 字体 typography
  字体栈："Inter" / "Helvetica Neue" / Arial；font-synthesis:none；字重取中间值 360 / 425 / 470 / 500 / 520 / 570 / 200 / 400（不许四舍五入成 400/700）
  H1：font-size calc(98×--u)、weight 360、letter-spacing -.035em、行高 calc(90×--u)，两行
  eyebrow 16u/470；slogan tag 24u/470/-.03em；统计数字 100u/200；统计标签 19u/400/行高 23.5u；导航 15u/570/-.0561em
  光学字宽：逐元素 --sx 横向微缩放（本案实测值 0.8707 / 0.8899 / 0.894 / 0.8973 / 0.9209 / 0.9293 / 0.9431 / 0.9634 / 0.9792 / 0.9858），复刻原稿字形度量，不做归一化
2.3 圆角 rounded：胶囊 999px（导航 / CTA / Meet / 播放钮）；面板 28u；旋钮为整圆
2.4 间距 spacing：基准 --u = min(100vw/1280, 100vh/960)；元素位置一律用行内 --x/--y 实测值 + 锚点类；紧凑档内边距 --pad 52u / 横屏 46u / 手机 40u
2.5 动效 motion
  WAAPI 四行为：A 遮罩升 rise（clip-path 从 inset(100%…) 抬到 -18%）／B 轻抬 lift（透明度 + 0.55–0.8em 位移）／C 玻璃落定 settle（0.982–0.99 缩放 + 1.1–1.4em 位移）／D 点缀 accent（盾徽缩放、圆点、刻度条、斜杠）
  缓动：EXPO cubic-bezier(.16,1,.3,1) / SOFT cubic-bezier(.22,.7,.25,1) / GLASS cubic-bezier(.2,.75,.28,1)；延迟 60→1140ms 序贯；手机全局系数 ×0.86
  底板：canvas 微推近 10s 周期 ±0.4% + 流动焦散；pre 态 4s 自愈；prefers-reduced-motion 直接呈现完成帧
2.6 层级 layout：canvas 底板(z0) → 淡色 tint(z1) → 内容层(z2) → 玻璃菜单(z9)；深度靠 backdrop-blur + 亮描边，不靠投影

第三章 组件规范 components（全部引用第二章 token）
  品牌 brand：条纹球 SVG（39u，rotate 无、纯线条）+ 字标 22u/520/-.03em，字标带 --sx .894
  导航胶囊 nav：293×67u，底 rgba(255,255,255,.78) + 1u 白描边 + blur 40u + 0 0 0 1.3u 冷色环；内含 home 图标 / Explore / 竖分隔线 / grid 图标 / Product
  主 CTA：217×70u 深色胶囊 + 49u 旋钮（chevron 17u）；阴影 0 10u 24u rgba(11,26,50,.18)；hover 上浮 2u
  玻璃面板 panel：275×271u，135° 白玻璃渐变（.44→.16）+ 1u 亮描边 + blur 40u saturate 112% + 双向内高光；内含 AI-Driven 标题、强调圆点、盾徽白圆、三行副文、1K–100K 量程、刻度条（59u 填充）
  播放钮 play：50.5u 白圆 + 13×14u 三角；Meet 胶囊：269×86u 淡玻璃 + 64u 头像球 + 旋钮
  统计 stats：数字 200 字重 + 标签 + 斜杠分隔条（linear-gradient 斜线，宽 23u 高 75u）

第四章 布局法
  宽屏「绝对定位锚点」：包裹层 .stack/.row/.hero-blk/.tagrow/.stats/.stat 全部 display:contents，子元素按 .t（顶锚）/.c（中线锚）/.b（底锚）/.r（翻右）加行内 --x/--y 直接对 .card 落位；锚点公式固定：.t 左=(x+13)u 上=(y+15)u；.c 上=50%+(y-2)u；.b 下=(y+19)u；.r 右=(x+19)u
  紧凑档包裹层接管布局：一列 flex space-between 铺满画框；紧凑横屏回两栏（左文案右面板）
  删减（明确不做什么）：不加第二屏内容、不加卡片阵、不加页脚菜单；一屏只有七件，导航只两组入口
  内容落点（第一屏看到什么）：左上品牌 → 顶部居中玻璃导航 → 右上深色 CTA → 左侧 eyebrow + 双行巨标 + 播放钮与 slogan → 右侧玻璃面板 → 底部统计与 Meet 胶囊

第五章 深度与层级 depth
  玻璃三档：淡玻璃 0.325（Meet）/ 渐变玻璃 .44→.16（面板）/ 白胶囊 0.78（导航、汉堡）
  所有玻璃面必须同时给 -webkit-backdrop-filter 与 backdrop-filter；描边一律 rgba(255,255,255,.6–.85)
  阴影只用于 CTA 与面板，色相恒为 rgba(28,52,92,*) 与 rgba(11,26,50,*)

第六章 该做 / 不该做
  该做：浅底上用深色 CTA 做唯一重音；度量全部写 calc(N*var(--u))；玻璃面必带 blur + 亮描边；标题用中间字重与大负字距
  不该做：硬编码 px；给玻璃面加投影代替 blur；把装置调成彩色或加大动效；同屏出现第二个实心按钮；把 --sx 归一化
  反例警示：球体加彩色 → 装置感秒变糖果风；导航与 CTA 同色 → 主次消失；紧凑档仍强行绝对定位 → 元素重叠

第七章 文案规则
  eyebrow = 领域定位句（Your digital infrastructure）；H1 = 品牌主张（Smarter Security Starts Here）；slogan = 一句承诺（Secure the Sphere. Protect What Matters.）；面板 = 能力词（AI-Driven / Cloud Infrastructure Protection）+ 四档量程；统计 = 数字 + 名词（112+ Countries Protected Globally / 55K+ Clients Secured）
  英文优先、句末带句点、无感叹号；CTA 用动词短语（Get free plan / Meet Sentinel）

第八章 响应式行为
  分档看「画框形状」而非设备宽度：粗竖（max-aspect-ratio 87/80 或宽 ≤899 或高 ≤639）折成一列；紧凑横屏（min-aspect-ratio 1/1）回两栏并把 --u 换到 1240×820 基准；旋转极矮屏（高 ≤520）再降一档
  手机（≤640 且竖屏）：再降一档 --u = min(100vw/600, 100vh/940)，并引入阅读刻度 --t（下限 max(--u, min(.85px, 100vh/780))）保触控与可读；关闭光学字宽
  导航折叠是独立规则只看形状：竖屏出现汉堡 + 玻璃菜单（304u 宽、blur 40u、右上角缩放进入），横屏永不折叠；Escape / 点外部 / 转横屏收菜单

第九章 Agent 提示词指南
  配色卡：画布 #E6EDF6 / 主文 #020C21 / CTA #0F1B31 / 强调 #4A78B0 / 球体 #dfe9f4
  字号卡：H1 98u 字重 360 / slogan 24u 470 / 统计数字 100u 200 / 标签 19u 400 / 导航 15u 570
  即拿即用：把以上 9 章套进你的内容，输出完整单页 HTML；装置底板必须用 canvas 2D 离线生成（禁止外链视频与图片），入场必须 WAAPI + html.pre 自愈 + reduced-motion 直达完成帧；所有尺寸写 calc(N*var(--u))，禁止硬编码 px。`,
    演示页: "assets/demos/方案-玻璃装置首屏.html",
    代码: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<meta name="theme-color" content="#E6EDF6" />
<title>玻璃装置首屏 · 方案</title>
<style>
/* 设计单位系统：--u = 1280×960 原稿的一个基准像素；背景铺满视口、前景保持实测尺寸 */
:root{
  --u: min(100vw / 1280, 100vh / 960);
  --ink:#020C21; --ink-soft:#0F182F; --muted:#59627E; --muted2:#4D5B77;
  --frame:#E6EDF6; --cta:#0F1B31; --cta-knob:#384B64; --meet-knob:#1A2B45;
  --accent:#4A78B0; --track:#DDE4EE;
  /* 参数（postMessage 驱动） */
  --yan:#E6EDF6; --mo:#020C21; --qiang:#4A78B0; --qiut:#dfe9f4;
  --biaoti:98; --liang:100;
}
@supports (height:100dvh){:root{--u: min(100vw / 1280, 100dvh / 960)}}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--frame);overflow-x:hidden;overflow-y:auto;color:var(--mo);
  font-family:"Inter","Helvetica Neue",Helvetica,Arial,"Microsoft YaHei",sans-serif;font-synthesis:none;
  -webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
a{color:inherit;text-decoration:none}
button{font-family:inherit}
a:focus-visible{outline:calc(2*var(--u)) solid #2f5f9e;outline-offset:calc(3*var(--u))}

.page{position:relative;width:100%;height:100vh;height:100dvh;background:var(--yan)}
.card{position:absolute;inset:0;isolation:isolate}
/* 玻璃装置底板：原站为 CloudFront 视频，这里用 canvas 2D 离线绘制同气质装置（球+刃+流动光斑） */
.bg{position:absolute;left:-2px;top:-2px;width:calc(100vw + 4px);height:calc(100vh + 4px);
  z-index:0;filter:brightness(calc(var(--liang)*1%)) saturate(.965);transform:scale(1.002)}
@supports (height:100dvh){.bg{height:calc(100dvh + 4px)}}
.tint{position:absolute;inset:0;background:rgba(255,249,240,.05);z-index:1;pointer-events:none}

/* 绝对定位助手：宽屏时包裹层 display:contents，子元素直接对 .card 定位 */
.stack,.row,.hero-blk,.tagrow,.stats,.stat{display:contents}
.l{position:absolute;z-index:2}
.t{left:calc((var(--x) + 13)*var(--u));top:calc((var(--y) + 15)*var(--u))}
.c{left:calc((var(--x) + 13)*var(--u));top:calc(50% + (var(--y) - 2)*var(--u))}
.b{left:calc((var(--x) + 13)*var(--u));bottom:calc((var(--y) + 19)*var(--u))}
.r{left:auto;right:calc((var(--x) + 19)*var(--u))}
/* 光学字宽：逐元素横向微缩放，复刻原稿字形度量，不做归一化 */
.sx{display:inline-block;transform-origin:left top;transform:scaleX(var(--sx,1))}

/* ── 品牌 ── */
.brand{display:flex;align-items:center;height:calc(39*var(--u))}
.mark{width:calc(39*var(--u));height:calc(39*var(--u));display:block;flex:none}
.brand b{font-size:calc(22*var(--u));font-weight:520;letter-spacing:-0.03em;line-height:1;margin-left:calc(7.7*var(--u))}

/* ── 玻璃导航胶囊 ── */
.nav{position:absolute;left:50%;transform:translateX(calc(-50% - 3*var(--u)));
  top:calc((31 + 15)*var(--u));width:calc(293*var(--u));height:calc(67*var(--u));
  border-radius:999px;background:rgba(255,255,255,0.78);
  border:calc(1*var(--u)) solid rgba(255,255,255,.85);
  -webkit-backdrop-filter:blur(calc(40*var(--u)));backdrop-filter:blur(calc(40*var(--u)));
  box-shadow:0 0 0 calc(1.3*var(--u)) rgba(120,145,180,0.2),0 calc(2*var(--u)) calc(10*var(--u)) rgba(28,52,92,.05);z-index:2}
.nav>*{position:absolute}
.nav span{font-size:calc(15*var(--u));font-weight:570;letter-spacing:-0.0561em;line-height:1;color:#202940;white-space:nowrap}
.nav i{display:block}
.n-home{left:calc(36*var(--u));top:calc(22*var(--u));width:calc(21.3*var(--u));height:calc(22.4*var(--u))}
.n-home svg{width:100%;height:100%;display:block}
.n-explore{left:calc(72*var(--u));top:calc(26*var(--u))}
.n-div{left:calc(144*var(--u));top:calc(18*var(--u));width:calc(1.5*var(--u));height:calc(31*var(--u));background:#CED5E0;border:0}
.n-grid{left:calc(168*var(--u));top:calc(24*var(--u));width:calc(20.2*var(--u));height:calc(20.2*var(--u))}
.n-grid svg{width:100%;height:100%;display:block}
.n-product{left:calc(203.8*var(--u));top:calc(26*var(--u))}

/* ── 主 CTA ── */
.cta{width:calc(217*var(--u));height:calc(70*var(--u));border-radius:999px;background:var(--cta);display:block;
  box-shadow:0 calc(10*var(--u)) calc(24*var(--u)) rgba(11,26,50,.18)}
.cta span{position:absolute;left:calc(34.8*var(--u));top:calc(27.55*var(--u));
  font-size:calc(17.5*var(--u));font-weight:400;letter-spacing:-0.0442em;line-height:1;color:#fff;white-space:nowrap}
.knob{position:absolute;border-radius:50%;background:var(--cta-knob);display:flex;align-items:center;justify-content:center}
.cta .knob{left:calc(156*var(--u));top:calc(10.5*var(--u));width:calc(49*var(--u));height:calc(49*var(--u))}
.knob svg{width:calc(17*var(--u));height:calc(17*var(--u))}

/* ── 主标题组 ── */
.eyebrow{font-size:calc(16*var(--u));font-weight:470;letter-spacing:-0.015em;line-height:1;color:var(--muted);white-space:nowrap}
h1{font-size:calc(var(--biaoti)*var(--u));font-weight:360;letter-spacing:-0.035em;
  line-height:calc(var(--biaoti)*0.918*var(--u));color:var(--ink);white-space:nowrap}
.play{width:calc(50.5*var(--u));height:calc(50.5*var(--u));border-radius:50%;background:#fff;
  display:flex;align-items:center;justify-content:center;box-shadow:0 calc(6*var(--u)) calc(18*var(--u)) rgba(28,52,92,.10)}
.play svg{width:calc(13*var(--u));height:calc(14*var(--u))}
.tag{font-size:calc(24*var(--u));font-weight:470;letter-spacing:-0.03em;line-height:1;color:var(--ink-soft);white-space:nowrap}

/* ── 玻璃面板 ── */
.panel{width:calc(275*var(--u));height:calc(271*var(--u));border-radius:calc(28*var(--u));
  background:linear-gradient(135deg,rgba(255,255,255,0.44),rgba(255,255,255,0.16));
  border:calc(1*var(--u)) solid rgba(255,255,255,.60);
  -webkit-backdrop-filter:blur(calc(40*var(--u))) saturate(112%);backdrop-filter:blur(calc(40*var(--u))) saturate(112%);
  box-shadow:inset calc(1*var(--u)) calc(1*var(--u)) 0 rgba(255,255,255,.55),
    inset calc(-1*var(--u)) calc(-1*var(--u)) 0 rgba(255,255,255,.18),
    0 calc(18*var(--u)) calc(40*var(--u)) rgba(28,52,92,.07)}
.panel>*{position:absolute}
.p-title{left:calc(29*var(--u));top:calc(44.7*var(--u));font-size:calc(24*var(--u));font-weight:500;
  letter-spacing:-0.02em;line-height:1;color:var(--ink);white-space:nowrap}
.dot{left:calc(137*var(--u));top:calc(53*var(--u));width:calc(10*var(--u));height:calc(10*var(--u));
  border-radius:50%;background:var(--qiang)}
.shield{left:calc(177*var(--u));top:calc(46*var(--u));width:calc(73*var(--u));height:calc(73*var(--u));
  border-radius:50%;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 calc(26*var(--u)) calc(10*var(--u)) rgba(255,255,255,.5),0 calc(6*var(--u)) calc(16*var(--u)) rgba(28,52,92,.06)}
.shield svg{width:calc(30*var(--u));height:calc(39*var(--u))}
.p-sub{left:calc(29*var(--u));top:calc(94.35*var(--u));font-size:calc(18*var(--u));font-weight:400;
  letter-spacing:-0.02em;line-height:calc(20.4*var(--u));color:var(--muted2)}
.scale{left:calc(47*var(--u));top:calc(189*var(--u));width:calc(190*var(--u));display:flex;justify-content:space-between;
  font-size:calc(15*var(--u));font-weight:400;letter-spacing:-0.03em;line-height:1;color:#586580}
.track{left:calc(46*var(--u));top:calc(221*var(--u));width:calc(190*var(--u));height:calc(8*var(--u));
  border-radius:999px;background:#DDE4EE;overflow:hidden}
.track i{display:block;width:calc(59*var(--u));height:100%;border-radius:999px;background:#5F88B4;transform-origin:left center}

/* ── 统计 ── */
.num{font-size:calc(100*var(--u));font-weight:200;letter-spacing:0em;line-height:1;color:var(--ink);white-space:nowrap}
.lbl{font-size:calc(19*var(--u));font-weight:400;letter-spacing:-0.02em;line-height:calc(23.5*var(--u));color:#39455F}
.slash{width:calc(23*var(--u));height:calc(75*var(--u));
  background:linear-gradient(to top left,transparent calc(50% - .85*var(--u)),
    #A7B4C6 calc(50% - .85*var(--u)),#A7B4C6 calc(50% + .85*var(--u)),transparent calc(50% + .85*var(--u)))}

/* ── Meet Sentinel 胶囊 ── */
.meet{width:calc(269*var(--u));height:calc(86*var(--u));border-radius:999px;display:block;background:rgba(255,255,255,0.325);
  border:calc(1*var(--u)) solid rgba(255,255,255,.62);
  -webkit-backdrop-filter:blur(calc(40*var(--u)));backdrop-filter:blur(calc(40*var(--u)));
  box-shadow:0 0 0 calc(1.2*var(--u)) rgba(120,145,180,0.1),
    inset calc(1*var(--u)) calc(1*var(--u)) 0 rgba(255,255,255,.5),
    0 calc(8*var(--u)) calc(22*var(--u)) rgba(28,52,92,.035)}
.meet>*{position:absolute}
.thumb{left:calc(12*var(--u));top:calc(11*var(--u));width:calc(64*var(--u));height:calc(64*var(--u));
  border-radius:50%;overflow:hidden;box-shadow:inset 0 0 0 calc(1*var(--u)) rgba(255,255,255,.45)}
/* 缩略球用 CSS 渐变模拟玻璃球，替代原站视频截帧（离线） */
.thumb i{position:absolute;inset:0;border-radius:50%;
  background:radial-gradient(circle at 34% 30%, #ffffff 0%, var(--qiut) 42%, #b9c9dd 78%, #9db2cb 100%)}
.thumb i::after{content:"";position:absolute;left:18%;top:12%;width:34%;height:22%;border-radius:50%;
  background:rgba(255,255,255,.85);filter:blur(1px)}
.meet b{left:calc(89.8*var(--u));top:calc(34.55*var(--u));font-size:calc(17.5*var(--u));
  font-weight:425;letter-spacing:-0.0681em;line-height:1;color:#1B2A44;white-space:nowrap}
.meet .knob{left:calc(206*var(--u));top:calc(17*var(--u));width:calc(50*var(--u));height:calc(50*var(--u));background:var(--meet-knob)}

/* ── 汉堡（默认隐藏；竖屏才出现，见下方独立查询） ── */
.burger{display:none;position:absolute;align-items:center;justify-content:center;flex-direction:column;gap:calc(6*var(--u));
  width:calc(56*var(--u));height:calc(56*var(--u));border-radius:999px;cursor:pointer;z-index:10;
  background:rgba(255,255,255,0.78);border:calc(1*var(--u)) solid rgba(255,255,255,.85);
  -webkit-backdrop-filter:blur(calc(40*var(--u)));backdrop-filter:blur(calc(40*var(--u)));
  box-shadow:0 0 0 calc(1.3*var(--u)) rgba(120,145,180,0.2),0 calc(2*var(--u)) calc(10*var(--u)) rgba(28,52,92,.05)}
.burger i{display:block;width:calc(20*var(--u));height:calc(1.8*var(--u));border-radius:999px;background:#202940;
  transition:transform .3s cubic-bezier(.2,.7,.3,1),opacity .3s}
.burger[aria-expanded="true"] i:first-child{transform:translateY(calc(3.9*var(--u))) rotate(45deg)}
.burger[aria-expanded="true"] i:last-child{transform:translateY(calc(-3.9*var(--u))) rotate(-45deg)}

/* ── TIER 2 · 紧凑（按画框形状而非设备宽度分档） ── */
@media (max-aspect-ratio: 87/80), (max-width: 899px), (max-height: 639px){
  :root{--u: min(100vw / 880, 100vh / 1220); --pad: 52}
  @supports (height:100dvh){:root{--u: min(100vw / 880, 100dvh / 1220)}}
  .stack{display:flex;flex-direction:column;justify-content:space-between;position:absolute;inset:0;z-index:2;
    padding:calc(var(--pad)*var(--u))}
  .row,.hero-blk,.stats,.stat,.tagrow{display:flex}
  .row{align-items:center;justify-content:space-between;width:100%}
  .hero-blk{flex-direction:column;align-items:flex-start;width:100%;margin:calc(30*var(--u)) 0}
  .tagrow{align-items:center;gap:calc(16*var(--u));margin-top:calc(28*var(--u))}
  .stats{align-items:flex-end;gap:calc(26*var(--u));flex-wrap:wrap}
  .stat{align-items:flex-end;gap:calc(16*var(--u))}
  .l,.t,.c,.b,.r{position:relative;left:auto;right:auto;top:auto;bottom:auto}
  h1{margin-top:calc(16*var(--u));white-space:normal}
  .panel{align-self:flex-end;margin-top:calc(36*var(--u))}
  .row:last-child{flex-wrap:wrap;row-gap:calc(24*var(--u))}
  .meet{margin-left:auto}
  .nav{position:relative;left:auto;top:auto;transform:none;flex:none}
  @media (min-aspect-ratio: 1/1){
    :root{--u: min(100vw / 1240, 100vh / 820); --pad: 46}
    @supports (height:100dvh){:root{--u: min(100vw / 1240, 100dvh / 820)}}
    .hero-blk{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:calc(46*var(--u));align-items:end;margin:calc(24*var(--u)) 0}
    .eyebrow{grid-column:1;grid-row:1}
    h1{grid-column:1;grid-row:2}
    .tagrow{grid-column:1;grid-row:3}
    .panel{grid-column:2;grid-row:1 / span 3;align-self:center;margin-top:0}
    .row:last-child{flex-wrap:nowrap}
  }
  /* TIER 3 · 手机：--u 管构图、--t 管阅读（下限保触控与可读性） */
  @media (max-width: 640px) and (max-aspect-ratio: 1/1){
    :root{--u: min(100vw / 600, 100vh / 940); --t: max(var(--u), min(0.85px, 100vh / 780)); --pad: 40}
    @supports (height:100dvh){:root{--u: min(100vw / 600, 100dvh / 940); --t: max(var(--u), min(0.85px, 100dvh / 780))}}
    .sx{transform:none}
    .brand{height:auto}
    .mark{width:calc(36*var(--t));height:calc(36*var(--t))}
    .brand b{font-size:calc(21*var(--t));margin-left:calc(8*var(--t))}
    h1{font-size:calc(var(--biaoti)*0.67*var(--u));line-height:calc(var(--biaoti)*0.65*var(--u));margin-top:calc(12*var(--u))}
    .eyebrow{font-size:calc(16*var(--t))}
    .tag{font-size:calc(19*var(--t));line-height:calc(25*var(--t));white-space:normal}
    .panel{width:100%;align-self:stretch;height:calc(212*var(--t));margin-top:calc(24*var(--u))}
    .p-title{left:calc(30*var(--t));top:calc(30*var(--t));font-size:calc(24*var(--t))}
    .dot{left:calc(137*var(--t));top:calc(40*var(--t));width:calc(10*var(--t));height:calc(10*var(--t))}
    .shield{left:auto;right:calc(26*var(--t));top:calc(22*var(--t));width:calc(64*var(--t));height:calc(64*var(--t))}
    .shield svg{width:calc(26*var(--t));height:calc(34*var(--t))}
    .p-sub{left:calc(31*var(--t));top:calc(80*var(--t));font-size:calc(17*var(--t));line-height:calc(21*var(--t))}
    .scale{left:calc(31*var(--t));top:calc(150*var(--t));width:calc(100% - 62*var(--t));font-size:calc(14*var(--t))}
    .track{left:calc(31*var(--t));top:calc(178*var(--t));width:calc(100% - 62*var(--t));height:calc(8*var(--t))}
    .track i{width:31%}
    .stats{gap:calc(18*var(--u));align-items:center;flex-wrap:nowrap}
    .stat{flex-direction:column;align-items:flex-start;gap:calc(6*var(--t))}
    .num{font-size:calc(76*var(--u))}
    .lbl{font-size:calc(15*var(--t));line-height:calc(19*var(--t))}
    .slash{height:calc(92*var(--t));width:calc(29*var(--t));align-self:center}
    .meet{width:100%;height:calc(72*var(--t))}
    .thumb{left:calc(9*var(--t));top:calc(5*var(--t));width:calc(62*var(--t));height:calc(62*var(--t))}
    .meet b{left:calc(84*var(--t));top:calc(28*var(--t));font-size:calc(17*var(--t))}
    .meet .knob{left:auto;right:calc(11*var(--t));top:calc(11*var(--t));width:calc(50*var(--t));height:calc(50*var(--t))}
  }
}
/* 导航折叠是独立规则，只看画框形状：竖屏折、横屏永不折 */
@media (max-aspect-ratio: 1/1){
  .burger{display:flex}
  .menu{display:block;position:absolute;z-index:9;top:calc((var(--pad,52) + 68)*var(--u));right:calc(var(--pad,52)*var(--u));
    width:calc(304*var(--u));padding:calc(16*var(--u));border-radius:calc(30*var(--u));
    background:rgba(255,255,255,.82);border:calc(1*var(--u)) solid rgba(255,255,255,.85);
    -webkit-backdrop-filter:blur(calc(40*var(--u)));backdrop-filter:blur(calc(40*var(--u)));
    box-shadow:0 0 0 calc(1.3*var(--u)) rgba(120,145,180,.2),0 calc(16*var(--u)) calc(34*var(--u)) rgba(28,52,92,.10);
    opacity:0;visibility:hidden;transform:translateY(calc(-10*var(--u))) scale(.97);transform-origin:top right;
    transition:opacity .26s cubic-bezier(.2,.7,.3,1),transform .26s cubic-bezier(.2,.7,.3,1),visibility .26s}
  .menu[data-open]{opacity:1;visibility:visible;transform:none}
  .menu .nav{position:relative;left:auto;top:auto;transform:none;width:100%;height:auto;display:grid;
    grid-template-columns:auto 1fr;align-items:center;column-gap:calc(16*var(--u));row-gap:calc(16*var(--u));
    padding:calc(8*var(--u)) calc(10*var(--u));border:0;background:none;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none}
  .menu .nav>*{position:relative;left:auto;top:auto}
  .menu .nav span{font-size:calc(19*var(--u))}
  .menu .n-div{grid-column:1 / -1;width:100%;height:calc(1.2*var(--u));margin:calc(2*var(--u)) 0}
  .menu .cta{position:relative;left:auto;top:auto;width:100%;height:calc(64*var(--u));margin-top:calc(14*var(--u))}
  .menu .cta span{left:calc(28*var(--u));top:calc(23*var(--u));font-size:calc(19*var(--u))}
  .menu .cta .knob{left:auto;right:calc(9*var(--u));top:calc(7*var(--u));width:calc(50*var(--u));height:calc(50*var(--u))}
}
/* 静止帧 = 原样 CSS；入场 pre 态只在 html.pre 下生效，动画放完即摘 */
@media (prefers-reduced-motion:no-preference){
  .cta,.meet{transition:transform .35s cubic-bezier(.2,.7,.3,1)}
  .cta:hover,.meet:hover{transform:translateY(calc(-2*var(--u)))}
}
html.pre .brand,html.pre .nav,html.pre .cta,html.pre .burger,
html.pre .eyebrow,html.pre .play,html.pre .tag,
html.pre .panel,html.pre .lbl,html.pre .meet{opacity:0}
html.pre h1 .sx,html.pre .num{clip-path:inset(100% 0 -14% 0)}
html.pre .slash{scale:1 0}
html.pre .track i{scale:0 1}
html.pre .dot{scale:0}

/* Token 预览段（方案版追加）：色板 / 字号比例 / 组件层级一眼可验收 */
.tokens{position:relative;z-index:3;background:#f7fafd;border-top:1px solid rgba(120,145,180,.22);
  padding:calc(64*var(--u)) calc(56*var(--u)) calc(72*var(--u))}
.tokens h2{font-size:calc(15*var(--u));font-weight:570;letter-spacing:.04em;color:#39455F;margin-bottom:calc(30*var(--u))}
.tok-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:calc(48*var(--u));align-items:start;max-width:calc(1100*var(--u));margin:0 auto}
.swatches{display:flex;gap:calc(12*var(--u));flex-wrap:wrap}
.sw{width:calc(78*var(--u));height:calc(78*var(--u));border-radius:calc(14*var(--u));position:relative;overflow:hidden;
  border:calc(1*var(--u)) solid rgba(120,145,180,.25);box-shadow:0 calc(2*var(--u)) calc(8*var(--u)) rgba(28,52,92,.06)}
.sw span{position:absolute;left:calc(7*var(--u));bottom:calc(6*var(--u));font-size:calc(9*var(--u));color:#3a4a66}
.comp{display:flex;flex-wrap:wrap;gap:calc(14*var(--u));margin-top:calc(30*var(--u));align-items:center}
.comp .pill{position:relative;display:inline-flex;align-items:center;height:calc(56*var(--u));padding:0 calc(24*var(--u));
  border-radius:999px;background:var(--cta);color:#fff;font-size:calc(15*var(--u));font-weight:400}
.comp .glass{position:relative;display:inline-flex;align-items:center;gap:calc(10*var(--u));height:calc(56*var(--u));
  padding:0 calc(22*var(--u));border-radius:999px;background:rgba(255,255,255,.325);color:#1B2A44;
  border:calc(1*var(--u)) solid rgba(255,255,255,.62);font-size:calc(15*var(--u));
  -webkit-backdrop-filter:blur(calc(20*var(--u)));backdrop-filter:blur(calc(20*var(--u)))}
.comp .glass i{width:calc(22*var(--u));height:calc(22*var(--u));border-radius:50%;
  background:radial-gradient(circle at 34% 30%,#fff,var(--qiut) 55%,#b9c9dd 100%);display:block}
.comp .card{width:calc(240*var(--u));padding:calc(20*var(--u));border-radius:calc(20*var(--u));
  background:linear-gradient(135deg,rgba(255,255,255,.7),rgba(255,255,255,.35));
  border:calc(1*var(--u)) solid rgba(255,255,255,.8);box-shadow:0 calc(10*var(--u)) calc(26*var(--u)) rgba(28,52,92,.07)}
.comp .card b{display:block;color:var(--mo);font-size:calc(16*var(--u));font-weight:500}
.comp .card p{margin-top:calc(6*var(--u));color:var(--muted2);font-size:calc(13*var(--u));line-height:1.6}
.type .t{color:var(--mo);margin-bottom:calc(12*var(--u));white-space:nowrap}
.type .t.d{font-size:calc(52*var(--u));font-weight:360;letter-spacing:-.035em}
.type .t.h{font-size:calc(28*var(--u));font-weight:470;letter-spacing:-.03em}
.type .t.b{font-size:calc(18*var(--u));font-weight:400;color:var(--muted2);white-space:normal}
.type .t.c{font-size:calc(15*var(--u));font-weight:570;letter-spacing:-.05em;color:#202940}
.type .t small{display:block;font-size:calc(11*var(--u));color:#7c8aa4;letter-spacing:.06em;margin-bottom:calc(2*var(--u))}
@media (max-width:760px){.tok-grid{grid-template-columns:1fr}}
</style>
<script>(function(){var d=document.documentElement;
  if(!('animate' in Element.prototype))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  d.classList.add('pre');
  setTimeout(function(){d.classList.remove('pre')},4000);
})();<\/script>
</head>
<body>
<div class="page"><div class="card">
  <canvas class="bg" id="plate" aria-hidden="true"></canvas>
  <div class="tint"></div>
  <div class="stack">
    <div class="row">
      <a class="brand l t" style="--x:68;--y:47" href="#">
        <svg class="mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <defs><clipPath id="gclip"><circle cx="20" cy="20" r="18.2"/></clipPath></defs>
          <circle cx="20" cy="20" r="18.4" stroke="#0d1b30" stroke-width="1.1"/>
          <g clip-path="url(#gclip)" stroke="#0d1b30" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13.2 4.6c3-.9 6.2-1 9.2-.1" stroke-width="1.7"/>
            <path d="M5.6 9.2c3.8-1.9 8-2.4 11.7-1.2 2.5.8 4.3 2.1 6.6 2.3 2 .2 4.2-.4 6.4-1.5" stroke-width="2.3"/>
            <path d="M2.6 13.9c4.4-2.4 9.4-3 13.6-1.5 2.4.9 4.1 2.3 6.4 2.4 2.3.1 4.7-1 7.1-2.4 1.6-.9 3.4-1.4 5.3-1.4" stroke-width="2.7"/>
            <path d="M1.6 18.7c4.8-2.7 10.1-3.2 14.4-1.6 1.8.7 3.2 1.6 4.7 2.1-1.7 1.3-3.4 2.2-5.1 2.6 2.9.5 5.9-.1 8.8-1.5 1.5-.7 2.9-1.6 4.4-2.3 1.9-.9 3.9-1.3 5.9-1.1" stroke-width="2.9"/>
            <path d="M1.9 24.1c4.5-2.4 9.6-3 13.9-1.6 2.3.7 4 1.9 6.2 2 2.4.1 5-.9 7.5-2.3 1.6-.9 3.3-1.4 5-1.4" stroke-width="2.8"/>
            <path d="M3.7 28.8c4.1-2 8.7-2.5 12.6-1.3 2.2.7 3.8 1.8 5.9 1.8 2.3.1 4.8-.8 7.1-2.1 1.2-.7 2.5-1.1 3.8-1.2" stroke-width="2.4"/>
            <path d="M7.6 32.9c3.5-1.5 7.4-1.9 10.6-.9 1.9.6 3.3 1.4 5 1.5 1.6.1 3.3-.3 5-1.1" stroke-width="1.9"/>
            <path d="M13.6 35.8c2.8-.9 5.8-1 8.6-.2" stroke-width="1.5"/>
          </g>
        </svg>
        <b class="sx" style="--sx:0.894">ConSentinel</b>
      </a>
      <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu"><i></i><i></i></button>
      <div class="menu" id="site-menu">
        <nav class="nav" aria-label="Primary">
          <span class="n-home"><svg viewBox="0 0 20 21" fill="none" aria-hidden="true"><path d="M2 8.4 10 2l8 6.4V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" stroke="#202940" stroke-width="1.7" stroke-linejoin="round"/></svg></span>
          <span class="n-explore">Explore</span>
          <hr class="n-div" />
          <span class="n-grid"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="1" y="1" width="7.4" height="7.4" rx="1.7" stroke="#202940" stroke-width="1.7"/><rect x="11.6" y="1" width="7.4" height="7.4" rx="1.7" stroke="#202940" stroke-width="1.7"/><rect x="1" y="11.6" width="7.4" height="7.4" rx="1.7" stroke="#202940" stroke-width="1.7"/><rect x="11.6" y="11.6" width="7.4" height="7.4" rx="1.7" stroke="#202940" stroke-width="1.7"/></svg></span>
          <span class="n-product">Product</span>
        </nav>
        <a class="cta l t r" style="--x:58;--y:30" href="#">
          <span>Get free plan</span>
          <span class="knob"><svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="m6.6 3.6 6 5.4-6 5.4" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </a>
      </div>
    </div>
    <div class="hero-blk">
      <p class="eyebrow l c sx" style="--x:65.7;--y:-209.2;--sx:0.9293">Your digital infrastructure</p>
      <h1 class="l c" style="--x:62.6;--y:-167.3">
        <span class="sx" style="--sx:0.9431">Smarter Security</span><br>
        <span class="sx" style="--sx:0.9792">Starts Here</span>
      </h1>
      <div class="tagrow">
        <span class="play l c" style="--x:66;--y:34">
          <svg viewBox="0 0 13 14" aria-hidden="true"><path d="M1.4 1.3 11.6 7 1.4 12.7z" fill="#0b1526"/></svg>
        </span>
        <span class="tag l c sx" style="--x:131;--y:48.7;--sx:0.8973">Secure the Sphere. Protect What Matters.</span>
      </div>
      <aside class="panel l c r" style="--x:58;--y:-165">
        <span class="p-title sx" style="--sx:0.8707">AI-Driven</span>
        <span class="dot"></span>
        <span class="shield">
          <svg viewBox="0 0 30 39" fill="none" aria-hidden="true">
            <path d="M15 1.2 1.6 6.6v13.1c0 6.6 5.1 12.6 13.4 17.9 8.3-5.3 13.4-11.3 13.4-17.9V6.6z" stroke="#101c33" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2.1 18.9c4.6-1.1 8.9-1.6 12.9-1.6s8.3.5 12.9 1.6" stroke="#101c33" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
        <p class="p-sub sx" style="--sx:0.8899">Cloud<br>Infrastructure<br>Protection</p>
        <div class="scale"><span>1K</span><span>10K</span><span>50K</span><span>100K</span></div>
        <div class="track"><i></i></div>
      </aside>
    </div>
    <div class="row">
      <div class="stats">
        <div class="stat">
          <span class="num l b sx" style="--x:64;--y:60.4;--sx:1">112+</span>
          <span class="lbl l b sx" style="--x:295;--y:73.2;--sx:0.9634">Countries<br>Protected<br>Globally</span>
        </div>
        <span class="slash l b" style="--x:418;--y:76"></span>
        <div class="stat">
          <span class="num l b sx" style="--x:480;--y:60.4;--sx:0.9858">55K+</span>
          <span class="lbl l b sx" style="--x:716;--y:96.7;--sx:0.9209">Clients<br>Secured</span>
        </div>
      </div>
      <a class="meet l b r" style="--x:59;--y:66" href="#">
        <span class="thumb"><i></i></span>
        <b>Meet Sentinel</b>
        <span class="knob"><svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="m6.6 3.6 6 5.4-6 5.4" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </a>
    </div>
  </div>
</div></div>

<section class="tokens">
  <h2>设计 Token 预览</h2>
  <div class="tok-grid">
    <div>
      <div class="swatches">
        <div class="sw" style="background:var(--yan)"><span>yan</span></div>
        <div class="sw" style="background:var(--mo);color:#fff"><span style="color:#c9d6e8">mo</span></div>
        <div class="sw" style="background:var(--qiang)"><span style="color:#fff">qiang</span></div>
        <div class="sw" style="background:var(--qiut)"><span>qiut</span></div>
        <div class="sw" style="background:rgba(255,255,255,.55)"><span>glass</span></div>
      </div>
      <div class="comp">
        <span class="pill">Get free plan</span>
        <span class="glass"><i></i>Meet Sentinel</span>
        <div class="card"><b>玻璃面板</b><p>backdrop-blur 40u + 双向内高光 + 1u 亮描边，浮在装置之上。</p></div>
      </div>
    </div>
    <div class="type">
      <div class="t d">Smarter Security</div>
      <div class="t h">Secure the Sphere.</div>
      <div class="t b">Body — 一段说明文字，颜色走 --muted2，行高 1.55，永远压在大留白上。</div>
      <div class="t c">Caption — NAV / EYEBROW 层级，字距收紧到 -0.05em</div>
    </div>
  </div>
</section>

<script>/* 时间线：WAAPI 四种行为（遮罩升 / 轻抬 / 玻璃落定 / 点缀），放完自摘 pre 态还原成纯 CSS */
(function(){
  var pre = document.documentElement.classList.contains('pre');
  if (!pre) return;
  var EXPO = 'cubic-bezier(.16,1,.3,1)', SOFT = 'cubic-bezier(.22,.7,.25,1)', GLASS = 'cubic-bezier(.2,.75,.28,1)';
  var s = matchMedia('(max-width: 640px)').matches ? .86 : 1;
  var running = [];
  function anim(el, frames, dur, delay, ease){
    var a = el.animate(frames, { duration: dur*s, delay: delay*s, easing: ease, fill: 'both' });
    running.push(a); return a;
  }
  function q(sel){ return document.querySelector(sel); }
  function qa(sel){ return document.querySelectorAll(sel); }
  function rise(el, delay, dur){ anim(el, [
    { clipPath: 'inset(100% 0 -14% 0)', translate: '0 .16em' },
    { clipPath: 'inset(-18% 0 -14% 0)', translate: '0 0' }], dur, delay, EXPO); }
  function lift(el, delay, dist, dur){ anim(el, [
    { opacity: 0, translate: '0 ' + dist }, { opacity: 1, translate: '0 0' }], dur || 560, delay, SOFT); }
  function settle(el, delay, dur, from, dist){ anim(el, [
    { opacity: 0, scale: from, translate: '0 ' + dist },
    { opacity: 1, scale: 1, translate: '0 0' }], dur || 760, delay, GLASS); }
  lift(q('.brand'), 60, '.55em', 600);
  settle(q('.nav'), 150, 700, .99, '.5em');
  settle(q('.cta'), 200, 700, .985, '.5em');
  settle(q('.burger'), 150, 700, .9, '.4em');
  lift(q('.eyebrow'), 300, '.8em', 520);
  rise(qa('h1 .sx')[0], 380, 980); rise(qa('h1 .sx')[1], 470, 980);
  settle(q('.play'), 720, 640, .88, '.3em');
  lift(q('.tag'), 770, '.7em', 560);
  settle(q('.panel'), 800, 880, .982, '1.4em');
  anim(q('.shield'), [{ scale: .86 }, { scale: 1 }], 700, 1020, EXPO);
  anim(q('.dot'), [{ scale: 0 }, { scale: 1 }], 520, 1080, EXPO);
  anim(q('.track i'), [{ scale: '0 1' }, { scale: '1 1' }], 820, 1120, EXPO);
  rise(qa('.num')[0], 920, 860); rise(qa('.num')[1], 990, 860);
  lift(qa('.lbl')[0], 1030, '.6em', 520); lift(qa('.lbl')[1], 1075, '.6em', 520);
  anim(q('.slash'), [{ scale: '1 0' }, { scale: '1 1' }], 700, 1010, EXPO);
  settle(q('.meet'), 1140, 820, .985, '1.2em');
  Promise.all(running.map(function(a){ return a.finished.catch(function(){}); })).then(function(){
    document.documentElement.classList.remove('pre');
    running.forEach(function(a){ a.cancel(); });
    running.length = 0;
  });
})();
<\/script>
<script>
/* 汉堡：与菜单 data-open 同步开合；点外部 / Escape / 转横屏都收起 */
(function(){
  var b = document.querySelector('.burger'), m = document.getElementById('site-menu');
  function close(){ b.setAttribute('aria-expanded','false'); delete m.dataset.open; }
  b.addEventListener('click', function(e){
    e.stopPropagation();
    var open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    if (open) m.dataset.open = ''; else delete m.dataset.open;
  });
  m.addEventListener('click', function(e){
    if (e.target.closest('a')) { close(); b.setAttribute('aria-expanded','false'); }
    e.stopPropagation();
  });
  document.addEventListener('click', close);
  addEventListener('keydown', function(e){ if (e.key === 'Escape'){ close(); b.focus(); } });
  matchMedia('(min-aspect-ratio: 1/1)').addEventListener('change', function(e){ if (e.matches) close(); });
})();
<\/script>
<script>
/* 玻璃装置底板：canvas 2D 离线绘制（球 + 玻璃刃 + 流动光斑 + 微推近），替代原站 CloudFront 视频 */
(function(){
  const cv = document.getElementById('plate'), ctx = cv.getContext('2d');
  const state = { yan:'#E6EDF6', mo:'#020C21', qiang:'#4A78B0', qiut:'#dfe9f4',
                  biaoti:98, qiuda:62, qiujiao:-18, daokuand:26, guangsu:1, liang:100 };
  let W = 0, H = 0, DPR = Math.min(devicePixelRatio || 1, 2), t = 0, raf = 0;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  function hexToRgb(h){ const v = parseInt(String(h).replace('#',''), 16); return [(v>>16)&255,(v>>8)&255,v&255]; }
  function rgba(h, a){ const c = hexToRgb(h); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  function resize(){
    W = innerWidth; H = innerHeight;
    cv.width = W*DPR; cv.height = H*DPR;
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function draw(){
    const cx = W*0.52, cy = H*0.58, R = Math.min(W, H) * 0.5 * state.qiuda / 100;
    /* 影棚底：上冷下暖的浅蓝白渐变 + 地面反光带 */
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#f4f8fc'); bg.addColorStop(0.62, state.yan); bg.addColorStop(1, '#dde6f0');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(0, H*0.78, W, H*0.22);
    /* 微推近：10s 周期 ±0.4%，复刻原片几乎不可见的呼吸感 */
    const push = 1 + 0.004 * Math.sin(t * 0.628);
    ctx.save(); ctx.translate(cx, cy); ctx.scale(push, push); ctx.translate(-cx, -cy);
    /* 球体：底色 + 左上高光 + 底部内阴影 */
    const g = ctx.createRadialGradient(cx - R*0.38, cy - R*0.42, R*0.1, cx, cy, R);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.45, state.qiut); g.addColorStop(0.85, '#c3d2e4'); g.addColorStop(1, '#aebfd6');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = 'rgba(120,145,180,.35)'; ctx.lineWidth = 1; ctx.stroke();
    const hi = ctx.createRadialGradient(cx - R*0.42, cy - R*0.48, 0, cx - R*0.42, cy - R*0.48, R*0.5);
    hi.addColorStop(0, 'rgba(255,255,255,.95)'); hi.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hi; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();
    /* 底部环境光反射（地面焦散），随时间横移 */
    const ca = ctx.createLinearGradient(cx - R, cy + R*0.55, cx + R, cy + R*0.95);
    ca.addColorStop(0, 'rgba(255,255,255,0)');
    ca.addColorStop(0.5 + 0.18*Math.sin(t*1.3), 'rgba(255,255,255,.55)');
    ca.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = ca;
    ctx.beginPath(); ctx.ellipse(cx, cy + R*0.78, R*0.9, R*0.16, 0, 0, 6.2832); ctx.fill();
    /* 玻璃刃：穿过球体的薄片（旋转椭圆 + 两道棱线），角度可调 */
    const ang = state.qiujiao * Math.PI / 180, bw = state.daokuand;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
    const bl = ctx.createLinearGradient(0, -bw, 0, bw);
    bl.addColorStop(0, 'rgba(255,255,255,.65)'); bl.addColorStop(0.5, rgba(state.qiut, .35)); bl.addColorStop(1, 'rgba(160,180,205,.45)');
    ctx.fillStyle = bl;
    ctx.beginPath(); ctx.ellipse(0, 0, R*1.35, bw, 0, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.ellipse(0, 0, R*1.35, bw, 0, 0, 6.2832); ctx.stroke();
    ctx.strokeStyle = 'rgba(90,115,150,.4)';
    ctx.beginPath(); ctx.moveTo(-R*1.3, 0); ctx.lineTo(R*1.3, 0); ctx.stroke();
    ctx.restore();
    /* 球面流动焦散弧：两道弧随时间游走 */
    for (let i = 0; i < 2; i++){
      const a0 = -0.9 + Math.sin(t*0.5 + i*2.1) * 0.6, a1 = a0 + 0.9 + 0.2*Math.cos(t*0.4 + i);
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.5 - i*0.18) + ')';
      ctx.lineWidth = 2.2 - i*0.8;
      ctx.beginPath(); ctx.arc(cx, cy, R*(0.72 + i*0.12), a0, a1); ctx.stroke();
    }
    ctx.restore();
  }
  function loop(){
    t += 0.016 * Math.max(0.01, state.guangsu);
    draw();
    raf = requestAnimationFrame(loop);
  }
  function start(){ cancelAnimationFrame(raf); if (still.matches){ draw(); } else { raf = requestAnimationFrame(loop); } }
  still.addEventListener('change', start);
  addEventListener('resize', function(){ resize(); if (still.matches) draw(); });
  addEventListener('message', function(e){
    const d = e.data; if (!d || d.type !== 'param') return;
    if (!(d.key in state)) return;
    state[d.key] = d.value;
    const R = document.documentElement.style;
    R.setProperty('--yan', state.yan); R.setProperty('--mo', state.mo);
    R.setProperty('--qiang', state.qiang); R.setProperty('--qiut', state.qiut);
    R.setProperty('--biaoti', state.biaoti); R.setProperty('--liang', state.liang);
    if (still.matches) draw();
  });
  const R = document.documentElement.style;
  R.setProperty('--yan', state.yan); R.setProperty('--mo', state.mo);
  R.setProperty('--qiang', state.qiang); R.setProperty('--qiut', state.qiut);
  R.setProperty('--biaoti', state.biaoti); R.setProperty('--liang', state.liang);
  resize(); start();
})();
<\/script>
</body>
</html>
`,
    片段: `:root{--yan:#E6EDF6;--mo:#020C21;--cta:#0F1B31;--qiang:#4A78B0;--qiut:#dfe9f4;--u:min(100vw/1280,100vh/960);}
.stack,.row,.hero-blk,.tagrow,.stats,.stat{display:contents}
.l{position:absolute;z-index:2}
.t{left:calc((var(--x) + 13)*var(--u));top:calc((var(--y) + 15)*var(--u))}
.c{left:calc((var(--x) + 13)*var(--u));top:calc(50% + (var(--y) - 2)*var(--u))}
.b{left:calc((var(--x) + 13)*var(--u));bottom:calc((var(--y) + 19)*var(--u))}
.r{left:auto;right:calc((var(--x) + 19)*var(--u))}
.sx{display:inline-block;transform-origin:left top;transform:scaleX(var(--sx,1))}
h1{font-size:calc(98*var(--u));font-weight:360;letter-spacing:-.035em;line-height:calc(90*var(--u))}
.nav,.panel,.meet{backdrop-filter:blur(calc(40*var(--u)));-webkit-backdrop-filter:blur(calc(40*var(--u)))}`, 
    参数: [
      {键:"yan",名:"画布底色",类型:"color",默认:"#E6EDF6"},
      {键:"mo",名:"主文字色",类型:"color",默认:"#020C21"},
      {键:"qiang",名:"强调色",类型:"color",默认:"#4A78B0"},
      {键:"qiut",名:"球体色",类型:"color",默认:"#dfe9f4"},
      {键:"biaoti",名:"标题字号（基准u）",类型:"slider",最小:60,最大:140,步长:1,默认:98},
      {键:"qiuda",名:"球体大小（%）",类型:"slider",最小:40,最大:85,步长:1,默认:62},
      {键:"qiujiao",名:"玻璃刃角度（°）",类型:"slider",最小:-60,最大:60,步长:1,默认:-18},
      {键:"daokuand",名:"玻璃刃宽（基准u）",类型:"slider",最小:12,最大:60,步长:1,默认:26},
      {键:"guangsu",名:"光斑流速",类型:"slider",最小:0,最大:3,步长:0.1,默认:1},
      {键:"liang",名:"画面亮度（%）",类型:"slider",最小:80,最大:120,步长:1,默认:100}
    ],
    来源: "网站拆解：motionsites.ai nival-cyberspace（ConSentinel 演示页，2026-09-16 用户提供完整规格；2026-09-17 由原素材 v228 升维为整页方案，原素材已并入本方案、不在素材库另存副本；hero 底板改由 canvas 2D 离线绘制、字体回退系统栈）"
  }
];