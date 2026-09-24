// Web 灵感弹药库 · 方案库（v4，2026-09-07 丰富化 + 并入 4 套）
// 编目轴：重色落点 / 第一屏内容 / 删减元素（与作者「西瓜同学🍉」Skill 三问一致）。
// 每套 代码 为完整多区块页（导航+首屏+功能卡×3+数据墙×3+页脚），打开即感受氛围。
// 配色守 60-30-10；参数键↔CSS 变量一致；demo 支持 postMessage({type:'param',key,value}) 调参。
// 校验：node --check data/方案.js

window.WEB_SCHEMES = [
  {
    id: "S01",
    风格名: "大色块分区",
    适配端: "通用",
    风格: "暗色",
    场景: "后台·数据看板",
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
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·大色块分区</title>
<style>
:root{--zhucai:#FF6F61;--zhongdian:#7EC8E3;--di:#1a1a1a;--zi:#FFFFFF;--cizi:#b8b8b8;--yuanjiao:16px;--jianju:12px;--zihao:15px;--yinying:24;--faguang:0;--lie:2}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.55;padding:calc(var(--jianju)*1.5);}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:var(--yuanjiao);background:color-mix(in srgb,var(--zi) 6%,transparent);margin-bottom:var(--jianju);}
.logo{font-weight:800;font-size:17px;letter-spacing:.5px;}
.menu{display:flex;gap:16px;font-size:13px;color:var(--cizi);}
.alert{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--zi);background:color-mix(in srgb,var(--zhucai) 18%,transparent);padding:8px 14px;border-radius:var(--yuanjiao);margin-bottom:var(--jianju);}
.alert b{color:var(--zhucai);}
.grid{display:grid;grid-template-columns:repeat(var(--lie),1fr);gap:var(--jianju);}
.block{border-radius:var(--yuanjiao);padding:calc(var(--jianju)*1.6);position:relative;overflow:hidden;min-height:128px;display:flex;flex-direction:column;}
.block h3{font-size:14px;opacity:.92;font-weight:600;}
.block .big{font-size:calc(var(--zihao)*2.6);font-weight:800;margin-top:auto;line-height:1;}
.block .lbl{font-size:12.5px;opacity:.82;margin-top:6px;}
.block .bar{height:8px;border-radius:99px;background:rgba(255,255,255,.2);margin-top:10px;overflow:hidden;}
.block .bar i{display:block;height:100%;background:#fff;border-radius:99px;}
.coral{background:var(--zhucai);color:#fff;}
.ice{background:var(--zhongdian);color:#0c2a36;}
.violet{background:#A78BFA;color:#1c1233;}
.sage{background:#9CAF88;color:#1f2a17;}
.cta{margin-top:14px;align-self:flex-start;background:var(--zi);color:var(--di);border:none;border-radius:calc(var(--yuanjiao)*.8);padding:9px 18px;font-weight:700;font-size:13px;cursor:pointer;}
body[data-glow="1"] .coral{box-shadow:0 0 calc(var(--faguang)*1px) var(--zhucai);}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.block{box-shadow:0 calc(var(--yinying)*.22px) calc(var(--yinying)*.55px) rgba(0,0,0,.34)}
</style>
</head>
<body>
<div class="topbar"><span class="logo">云枢</span><span class="menu"><a>总览</a><a>主机</a><a>告警</a><a>报表</a></span></div>
<div class="alert">⚠ 实时告警：<b>3</b> 条待处理 · 2 台节点负载超阈</div>
<div class="grid">
  <div class="block coral"><h3>容量助手</h3><div class="big">85%</div><div class="lbl">存储池占用 · 距上限 1.2TB</div><div class="bar"><i style="width:85%"></i></div><button class="cta">查看详情</button></div>
  <div class="block ice"><h3>今日行程</h3><div class="big">7</div><div class="lbl">巡检 / 备份 / 复盘 已排程</div></div>
  <div class="block violet"><h3>实时告警</h3><div class="big">3</div><div class="lbl">2 高优 · 1 中优</div></div>
  <div class="block sage"><h3>跳转入口</h3><div class="lbl">报表 · 任务 · 设置 一触即达</div><button class="cta" style="background:var(--di);color:var(--zi)">前往控制台</button></div>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',lie:''};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "来自于抖音"
  },
  {
    id: "S02",
    风格名: "图片卡片流",
    适配端: "PC 端",
    风格: "编辑杂志",
    场景: "作品集·叙事",
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
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·图片卡片流</title>
<style>
:root{--zhucai:#E8843C;--zhongdian:#F2C14E;--di:#FBF7F0;--zi:#2a2620;--cizi:#8a8170;--yuanjiao:14px;--jianju:12px;--zihao:15px;--yinying:18;--faguang:0;--lie:3}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.55;padding:calc(var(--jianju)*1.5);}
.nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:calc(var(--jianju)*1.5);}
.logo{font-weight:800;font-size:18px;}
.menu{display:flex;gap:16px;font-size:13px;color:var(--cizi);}
.lead{font-size:calc(var(--zihao)*1.7);font-weight:800;margin-bottom:var(--jianju);}
.wrap{display:flex;gap:var(--jianju);align-items:flex-start;}
.main{flex:1;display:grid;grid-template-columns:repeat(var(--lie),1fr);gap:var(--jianju);}
.card{border-radius:var(--yuanjiao);overflow:hidden;background:#fff;box-shadow:0 calc(var(--yinying)*.25px) calc(var(--yinying)*.6px) rgba(0,0,0,.08);}
.card .ph{height:96px;}
.card .ph.a{background:linear-gradient(135deg,#3C7A5E,#7FB069);}
.card .ph.b{background:linear-gradient(135deg,#E8743B,#F2B441);}
.card .ph.c{background:linear-gradient(135deg,#5B8DEF,#9B8BFA);}
.card .ph.d{background:linear-gradient(135deg,#C26B4A,#E0A96D);}
.card .ph.e{background:linear-gradient(135deg,#2C7DA0,#61A5C2);}
.card .ph.f{background:linear-gradient(135deg,#8A5A44,#C98A6B);}
.card .body{padding:12px;}
.card h4{font-size:14px;margin-bottom:6px;}
.card p{font-size:12px;color:var(--cizi);}
.tag{display:inline-block;margin-top:8px;font-size:11px;font-weight:700;color:#fff;background:var(--zhucai);padding:3px 9px;border-radius:99px;}
.tag.go{background:var(--zhongdian);color:var(--zi);}
.aside{width:230px;flex:none;background:#fff;border-radius:var(--yuanjiao);padding:14px;box-shadow:0 calc(var(--yinying)*.25px) calc(var(--yinying)*.6px) rgba(0,0,0,.08);}
.aside h3{font-size:13px;color:var(--cizi);margin-bottom:10px;font-weight:700;}
.trip{display:flex;gap:8px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #eee;font-size:12.5px;}
.trip .dot{width:8px;height:8px;border-radius:50%;background:var(--zhongdian);margin-top:5px;flex:none;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.tag{box-shadow:0 0 calc(var(--faguang)*.45px) var(--zhucai)}
</style>
</head>
<body>
<div class="nav"><span class="logo">漫行</span><span class="menu"><a>发现</a><a>行程</a><a>收藏</a><a>我的</a></span></div>
<div class="lead">把每段旅程，排成一张地图</div>
<div class="wrap">
<div class="main">
<div class="card"><div class="ph a"></div><div class="body"><h4>洱海环线·骑行</h4><p>大理 · 2 天 1 夜</p><span class="tag">已规划</span></div></div>
<div class="card"><div class="ph b"></div><div class="body"><h4>沙溪古镇慢游</h4><p>剑川 · 周末</p><span class="tag go">进行中</span></div></div>
<div class="card"><div class="ph c"></div><div class="body"><h4>泸沽湖星空</h4><p>丽江 · 3 天</p><span class="tag">已规划</span></div></div>
<div class="card"><div class="ph d"></div><div class="body"><h4>雨崩徒步</h4><p>迪庆 · 4 天</p><span class="tag">心愿单</span></div></div>
<div class="card"><div class="ph e"></div><div class="body"><h4>腾冲温泉</h4><p>保山 · 2 天</p><span class="tag go">进行中</span></div></div>
<div class="card"><div class="ph f"></div><div class="body"><h4>建水古城</h4><p>红河 · 1 天</p><span class="tag">已规划</span></div></div>
</div>
<div class="aside"><h3>本周行程</h3>
<div class="trip"><span class="dot"></span><div>周三 沙溪集市<br><span style="color:var(--cizi)">09:30 出发</span></div></div>
<div class="trip"><span class="dot"></span><div>周五 泸沽湖航班<br><span style="color:var(--cizi)">14:05 登机</span></div></div>
<div class="trip"><span class="dot"></span><div>周日 返程高铁<br><span style="color:var(--cizi)">18:40 发车</span></div></div>
</div>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',lie:''};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "来自于抖音"
  },
  {
    id: "S03",
    风格名: "玻璃拟态风",
    适配端: "PC 端",
    风格: "玻璃拟态",
    场景: "官网·品牌站",
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
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·玻璃拟态风</title>
<style>
:root{--zhucai:#8A8FE5;--zhongdian:#C9B6FF;--di:#F4F3FB;--zi:#26243a;--cizi:#7a769a;--yuanjiao:18px;--jianju:14px;--zihao:15px;--yinying:20;--faguang:0;--mo:14}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{min-height:100vh;line-height:1.55;padding:calc(var(--jianju)*1.5);color:var(--zi);background:linear-gradient(135deg,var(--di) 0%,var(--zhongdian) 55%,var(--zhucai) 100%);}
.glass{background:rgba(255,255,255,.32);backdrop-filter:blur(var(--mo));-webkit-backdrop-filter:blur(var(--mo));border:1px solid rgba(255,255,255,.6);box-shadow:0 calc(var(--yinying)*.3px) calc(var(--yinying)*.8px) rgba(138,143,229,.18);border-radius:var(--yuanjiao);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;margin-bottom:var(--jianju);}
.logo{font-weight:800;font-size:17px;}
.menu{display:flex;gap:16px;font-size:13px;color:var(--zi);opacity:.8;}
.grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:var(--jianju);}
.panel{padding:calc(var(--jianju)*1.5);}
.panel .k{font-size:12.5px;opacity:.7;}
.panel .v{font-size:calc(var(--zihao)*2.4);font-weight:800;margin-top:6px;}
.panel .sub{font-size:12.5px;opacity:.7;margin-top:4px;}
.accent{color:var(--zhucai);}
.accent2{color:var(--zhongdian);}
.wide{grid-column:1/4;display:flex;justify-content:space-between;align-items:center;}
.btn{background:var(--zhucai);color:#fff;border:none;border-radius:calc(var(--yuanjiao)*.7);padding:10px 20px;font-weight:700;font-size:13px;cursor:pointer;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.panel .sub{color:var(--cizi);opacity:.9}
.btn{box-shadow:0 0 calc(var(--faguang)*.5px) var(--zhucai)}
</style>
</head>
<body>
<div class="glass nav"><span class="logo">霜融</span><span class="menu"><a>总览</a><a>资产</a><a>风控</a><a>设置</a></span></div>
<div class="grid">
<div class="glass panel"><div class="k">资产总览</div><div class="v accent">¥ 1,284,500</div><div class="sub">本月 +6.2%</div></div>
<div class="glass panel"><div class="k">本月收支</div><div class="v accent2">+¥ 38,200</div><div class="sub">收入 52 · 支出 14</div></div>
<div class="glass panel"><div class="k">风险预警</div><div class="v">2</div><div class="sub">汇率波动 · 集中度</div></div>
<div class="glass panel wide"><div><div class="k">智能投顾建议</div><div class="sub">建议将 12% 仓位由货基转向中短债，平滑波动</div></div><button class="btn">采纳建议</button></div>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',mo:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "来自于抖音"
  },
  {
    id: "S04",
    风格名: "高密度卡片墙",
    适配端: "PC 端",
    风格: "极简瑞士",
    场景: "后台·数据看板",
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
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·高密度卡片墙</title>
<style>
:root{--zhucai:#4CC9B0;--zhongdian:#FFD166;--di:#121821;--zi:#eaf0f5;--cizi:#9fb0c0;--yuanjiao:12px;--jianju:10px;--zihao:14px;--yinying:14;--faguang:0;--midu:1}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.5;padding:calc(var(--jianju)*1.5);}
.nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:calc(var(--jianju)*1.2);font-size:14px;}
.logo{font-weight:800;font-size:16px;}
.menu{display:flex;gap:14px;color:var(--cizi);}
.bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:72px;gap:calc(var(--jianju)*var(--midu));grid-auto-flow:dense;}
.cell{border-radius:calc(var(--yuanjiao)*.8);padding:9px 11px;background:#fff;color:var(--di);box-shadow:0 1px 3px rgba(40,30,80,.08);display:flex;flex-direction:column;justify-content:center;overflow:hidden;}
.cell.cur{background:var(--zhucai);color:var(--di);box-shadow:0 4px 14px color-mix(in srgb,var(--zhucai) 45%,transparent);}
.cell.big{grid-column:span 2;grid-row:span 2;}
.cell.wide{grid-column:span 2;}
.cell .t{font-size:11.5px;opacity:.7;}
.cell .v{font-size:calc(var(--zihao)*1.5);font-weight:800;margin-top:2px;}
.cell .sub{font-size:10.5px;opacity:.65;}
.dot{width:7px;height:7px;border-radius:50%;display:inline-block;margin-right:5px;vertical-align:middle;}
.g{background:var(--zhongdian);}.y{background:#E8B53B;}.r{background:#E0533B;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.cell{box-shadow:0 calc(var(--yinying)*.14px) calc(var(--yinying)*.42px) rgba(40,30,80,.2)}
.cell.cur{box-shadow:0 4px 14px color-mix(in srgb,var(--zhucai) 45%,transparent),0 0 calc(var(--faguang)*.5px) var(--zhucai)}
</style>
</head>
<body>
<div class="nav"><span class="logo">拼图</span><span class="menu"><a>工作区</a><a>团队</a><a>日程</a><a>文档</a></span></div>
<div class="bento">
<div class="cell big cur"><div class="t">我的任务</div><div class="v">12</div><div class="sub">4 进行中 · 8 待办</div><div class="sub" style="margin-top:6px"><span class="dot g"></span>设计稿评审 <span class="dot y"></span>接口联调</div></div>
<div class="cell wide"><div class="t">团队动态</div><div class="v" style="font-size:calc(var(--zihao)*1.1)">林夕 提交了 v2 原型 · 阿哲 关闭 3 个 issue</div></div>
<div class="cell"><div class="t">日程</div><div class="v">5</div><div class="sub">今日会议</div></div>
<div class="cell"><div class="t">文档</div><div class="v">28</div><div class="sub"><span class="dot g"></span>已同步</div></div>
<div class="cell"><div class="t">待审</div><div class="v">3</div><div class="sub"><span class="dot r"></span>超 24h</div></div>
<div class="cell wide"><div class="t">快捷入口</div><div class="v" style="font-size:calc(var(--zihao)*1.1)">新建任务 · 发起评审 · 导出周报</div></div>
<div class="cell"><div class="t">通知</div><div class="v">7</div><div class="sub"><span class="dot y"></span>新评论</div></div>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',midu:''};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "来自于抖音"
  },
  {
    id: "S05",
    风格名: "杂志排版风",
    适配端: "PC 端",
    风格: "编辑杂志",
    场景: "内容·阅读",
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
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·杂志排版风</title>
<style>
:root{--zhucai:#C0392B;--zhongdian:#1a1a1a;--di:#FBF6EE;--zi:#1f1b16;--cizi:#7d7464;--yuanjiao:4px;--jianju:16px;--zihao:15px;--yinying:0;--faguang:0;--lan:2;--shouzi:1}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;padding:calc(var(--jianju)*1.4) calc(var(--jianju)*1.6);}
.masthead{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid var(--zi);padding-bottom:10px;margin-bottom:18px;}
.brand{font-family:Georgia,"Songti SC",serif;font-weight:800;font-size:24px;letter-spacing:1px;}
.issue{font-size:12px;color:var(--cizi);}
.kicker{color:var(--zhucai);font-weight:800;font-size:12px;letter-spacing:3px;text-transform:uppercase;}
.head{font-family:Georgia,"Songti SC",serif;font-size:calc(var(--zihao)*2.9);font-weight:800;line-height:1.12;margin:10px 0 16px;}
.byline{font-size:12.5px;color:var(--cizi);border-top:1px solid #ccc;border-bottom:1px solid #ccc;padding:6px 0;margin-bottom:14px;}
.multi{column-count:var(--lan);column-gap:calc(var(--jianju)*1.6);font-size:14px;color:#333;line-height:1.75;text-align:justify;}
.multi p{margin-bottom:11px;}
body[data-shouzi="1"] .multi p:first-child::first-letter{font-family:Georgia,serif;font-size:calc(var(--zihao)*3.4);font-weight:800;float:left;line-height:.78;padding:6px 9px 0 0;color:var(--zhucai);}
.pull{font-family:Georgia,serif;font-style:italic;color:var(--zhongdian);border-left:3px solid var(--zhucai);padding-left:12px;margin:6px 0 11px;break-inside:avoid;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.pull{border-radius:var(--yuanjiao);box-shadow:0 calc(var(--yinying)*.2px) calc(var(--yinying)*.5px) rgba(0,0,0,.22)}
.kicker{text-shadow:0 0 calc(var(--faguang)*.6px) var(--zhucai)}
</style>
</head>
<body data-shouzi="1">
<div class="masthead"><span class="brand">谷雨周刊</span><span class="issue">第 214 期 · 城市与慢生活</span></div>
<div class="kicker">封面故事</div>
<div class="head">当一座城市决定，把节奏放慢下来</div>
<div class="byline">文 / 沈知白 · 摄影 / 林川 · 阅读约 8 分钟</div>
<div class="multi">
<p>在西南的这座山城，晨雾还没散尽，江边的早市已经支起了第一笼热气。摊主不急着叫卖，买菜的人也不急着还价——时间在这里，好像被刻意拉长了几拍。</p>
<p class="pull">"我们不缺效率，缺的是把一件事做完的耐心。"</p>
<p>过去十年，城市更新像一场没有终点的赛跑。玻璃幕墙越盖越高，地铁线越铺越远，连早餐摊都开始用扫码点单。可当速度成为唯一的美德，人们反而记不清上一顿饭的味道。</p>
<p>于是有人提出一种逆向的实验：把主干道的车道让出一条给自行车，把写字楼的电梯等候区改成可以发呆的角落。起初争议不断，半年后，街角的咖啡馆多了，遛狗的人也多了。</p>
<p>慢，不是落后，而是一种被重新发现的奢侈。当一座城市愿意为停顿留出空间，生活才真正开始呼吸。</p>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;if(d.key==='shouzi'){document.body.setAttribute('data-shouzi',d.value?'1':'0');return;}const U={yuanjiao:'px',jianju:'px',zihao:'px',lan:''};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "来自于抖音"
  },
  {
    id: "S06",
    风格名: "深色压顶风",
    适配端: "通用",
    风格: "暗色",
    场景: "官网·品牌站",
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
<title>方案·深色压顶风</title>
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
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
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
      {键:"yuanjiao",名:"产品图圆角",类型:"slider",默认:18,最小:0,最大:40,步长:1},
    { 键: "di", 名: "页面底色", 类型: "color", 默认: "#FFFFFF" },
    { 键: "yinying", 名: "阴影强度", 类型: "slider", 默认: 12, 最小: 0, 最大: 40, 步长: 1 }
  ],
    来源: "来自于抖音"
  },
  {
    id: "S07",
    风格名: "暖调留白风",
    适配端: "通用",
    风格: "有机自然",
    场景: "落地页·发布页",
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
    Agent提示词: "【暖调留白风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n单栏落地页(Z型)。暖米大面积留白，唯一橙 CTA 跳出来；单栏 Z 型动线，一个焦点。重色压「一处行动」而非分区。 适用：品牌首页/作品集/个人站落地页，重呼吸感与转化。参考：Apple 产品页(暖白)、Aesop、Kinfolk。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（暖米底 80% / 暖橙(唯一CTA) 8% / 墨字 12%）\n  底 --di #FBF4EC（页面唯一画布色）\n  主文字 --zi #3a2e25\n  次级文字 --cizi #9b8a78（副文、导航、页脚）\n  强调 --zhucai #C2683F（暖橙只压在唯一主 CTA 上，全站其余皆墨字/留白——重色压「一处行动」）\n  重点 --zhongdian #E0A96D（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 20px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 16px 为基准刻度（16 / 32 / 48 / 64）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：居中单栏落地页：大标题 + 一句价值主张 + 唯一实心 CTA + 一个文字次链（Z 型视觉动线）\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 20px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 20px，阴影强度 16（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：居中单栏落地页：大标题 + 一句价值主张 + 唯一实心 CTA + 一个文字次链（Z 型视觉动线）\n  删减（明确不做什么）：去色块墙 / 去多卡 / 去状态点，只留一处行动\n  内容落点（第一屏看到什么）：大标题 + 价值主张 + 主 CTA，先被留白和那一个橙按钮吸引\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 16 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：暖橙只压在唯一主 CTA 上，全站其余皆墨字/留白——重色压「一处行动」；品牌首页/作品集/个人站落地页，重呼吸感与转化\n  不该做：信息极密后台、需快速扫数的监控；去色块墙 / 去多卡 / 去状态点，只留一处行动\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「暖调留白风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「大标题 + 价值主张 + 主 CTA，先被留白和那一个橙按钮吸引」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #FBF4EC / 主文 #3a2e25 / 次文 #9b8a78 / 强调 #C2683F / 重点 #E0A96D\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 20 / 基准间距 16\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（单栏落地页(Z型)），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-暖调留白风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·暖调留白风</title>
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
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
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
      {键:"yuanjiao",名:"胶囊圆角",类型:"slider",默认:980,最小:8,最大:999,步长:1},
    { 键: "di", 名: "页面底色", 类型: "color", 默认: "#F5F5F7" },
    { 键: "cizi", 名: "次要文字色", 类型: "color", 默认: "#6E6E73" }
  ],
    来源: "自研"
  },
  {
    id: "S08",
    风格名: "强对比视觉风",
    适配端: "PC 端",
    风格: "粗野·新粗野",
    场景: "落地页·发布页",
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
    Agent提示词: "【强对比视觉风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n瑞士分屏海报。黑白直接硬碰最强烈；红一点在核心处跳；3px 硬边统一全站。重色压「硬对比+一点红」。 适用：极简/宣言式/强调单一信息的页面。参考：Swiss Style、Herbert Bayer 版式、Stripe 旧版黑底白字。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（纯黑(左板) 45% / 纯白(右板) 50% / 警示红(点睛) 5%）\n  底 --di #0a0a0a（页面唯一画布色）\n  主文字 --zi #ffffff\n  次级文字 --cizi #cfcfcf（副文、导航、页脚）\n  强调 --zhucai #FFE600（黑白硬碰，红只点「核心」一处——重色压「硬对比+一点红」）\n  重点 --zhongdian #111111（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 4px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：左右分屏：左黑面板白大字宣言，右白面板内容；红只点「核心」一处，3px 硬边无圆角无阴影\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 4px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 4px，阴影强度 14（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：左右分屏：左黑面板白大字宣言，右白面板内容；红只点「核心」一处，3px 硬边无圆角无阴影\n  删减（明确不做什么）：去灰阶过渡 / 去圆角 / 去阴影，纯平硬边\n  内容落点（第一屏看到什么）：左黑宣言板 + 右白内容板（先被硬边分切和一点红吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 14 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：黑白硬碰，红只点「核心」一处——重色压「硬对比+一点红」；极简/宣言式/强调单一信息的页面\n  不该做：柔和品牌、多信息层级；去灰阶过渡 / 去圆角 / 去阴影，纯平硬边\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「强对比视觉风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「左黑宣言板 + 右白内容板（先被硬边分切和一点红吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #0a0a0a / 主文 #ffffff / 次文 #cfcfcf / 强调 #FFE600 / 重点 #111111\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 4 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（瑞士分屏海报），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-强对比视觉风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·强对比视觉风</title>
<style>
:root{--zhucai:#FFE600;--zhongdian:#111111;--di:#0a0a0a;--zi:#ffffff;--cizi:#cfcfcf;--yuanjiao:0px;--jianju:14px;--zihao:15px;--yinying:0;--faguang:0;--bian:4}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Helvetica Neue",system-ui,sans-serif;}
body{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;line-height:1.5;}
.left{background:var(--zhucai);color:var(--zhongdian);padding:calc(var(--jianju)*3);display:flex;flex-direction:column;justify-content:center;}
.right{background:var(--di);color:var(--zi);padding:calc(var(--jianju)*3);display:flex;flex-direction:column;justify-content:center;border-left:var(--bian) solid var(--zhongdian);}
.kicker{font-size:12px;letter-spacing:4px;text-transform:uppercase;opacity:.7;margin-bottom:18px;}
.big{font-size:calc(var(--zihao)*3.4);font-weight:800;line-height:.98;letter-spacing:-1px;}
.big .red{background:var(--di);color:var(--zhucai);padding:0 .12em;}
.lead{font-size:calc(var(--zihao)*1.05);margin-top:20px;max-width:24em;opacity:.85;}
.list{margin-top:24px;font-size:14px;line-height:2;}
.btn{margin-top:28px;align-self:flex-start;background:var(--zi);color:var(--di);border:none;padding:13px 30px;font-weight:700;font-size:14px;cursor:pointer;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.list{color:var(--cizi)}
.btn{border-radius:var(--yuanjiao)}
.right{box-shadow:0 calc(var(--yinying)*.18px) calc(var(--yinying)*.45px) rgba(0,0,0,.2)}
.red{box-shadow:0 0 calc(var(--faguang)*.5px) var(--zhucai)}
</style>
</head>
<body>
<div class="left">
<div class="kicker">Manifesto</div>
<div class="big">少，<br>但是<span class="red">更好</span>。</div>
</div>
<div class="right">
<div class="kicker">白盒工作室</div>
<div class="lead">我们相信克制是一种能力。把不必要的东西拿掉，剩下的每一处，都该有它存在的理由。</div>
<div class="list">· 只做一件事，并把它做到极致<br>· 用结构代替装饰<br>· 让留白替你说话</div>
<button class="btn">查看作品</button>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',bian:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "自研"
  },
  {
    id: "S09",
    风格名: "冷调科技风",
    适配端: "PC 端",
    风格: "科技未来",
    场景: "后台·数据看板",
    骨架: "深色数据墙",
    配色: {
      "深蓝底": "80%",
      "冰蓝/青(主色)": "15%",
      "面板线": "5%"
    },
    布局骨架: "深蓝底 + 左导航 + 多面板数据墙（青色只点当前态/告警/数据）；霓虹赛博变体已并入本方案作「发光」变体",
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
    Agent提示词: "【冷调科技风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n深色数据墙。深蓝底冷静，青色高亮跳数据；面板线统一分隔。重色压「冷色高亮」。霓虹=开发光参数。 适用：数据/运维/科技产品后台（暗色）。参考：Vercel、Linear(暗色)、Supabase、Cyberpunk 2077 UI(发光变体)。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（深蓝底 80% / 冰蓝/青(主色) 15% / 面板线 5%）\n  底 --di #0A0E1A（页面唯一画布色）\n  主文字 --zi #e8f4f8\n  次级文字 --cizi #8fa6b8（副文、导航、页脚）\n  强调 --zhucai #39D0D8（青色只点「当前态/告警」与数据，深蓝托底——重色压「冷色高亮」；发光参数>0 即霓虹态）\n  重点 --zhongdian #5B8CFF（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 12px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：允许柔光/发光（faguang 40），单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：深蓝底 + 左导航 + 多面板数据墙（青色只点当前态/告警/数据）；霓虹赛博变体已并入本方案作「发光」变体\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 12px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 12px，阴影强度 20（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：深蓝底 + 左导航 + 多面板数据墙（青色只点当前态/告警/数据）；霓虹赛博变体已并入本方案作「发光」变体\n  删减（明确不做什么）：去暖色 / 去渐变花哨 / 去留白\n  内容落点（第一屏看到什么）：深蓝控制台 + 青色高亮数据墙（先被冷色科技感吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 20 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：青色只点「当前态/告警」与数据，深蓝托底——重色压「冷色高亮」；发光参数>0 即霓虹态；数据/运维/科技产品后台（暗色）\n  不该做：暖色品牌、柔和展示；去暖色 / 去渐变花哨 / 去留白\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「冷调科技风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「深蓝控制台 + 青色高亮数据墙（先被冷色科技感吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #0A0E1A / 主文 #e8f4f8 / 次文 #8fa6b8 / 强调 #39D0D8 / 重点 #5B8CFF\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 12 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（深色数据墙），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-冷调科技风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·冷调科技风</title>
<style>
:root{--zhucai:#39D0D8;--zhongdian:#5B8CFF;--di:#0A0E1A;--zi:#e8f4f8;--cizi:#8fa6b8;--yuanjiao:10px;--jianju:12px;--zihao:14px;--yinying:18;--faguang:0;--lie:3;--glow:1}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.5;padding:calc(var(--jianju)*1.4);}
.nav{display:flex;align-items:center;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid rgba(120,150,200,.18);margin-bottom:var(--jianju);}
.logo{font-weight:800;font-size:16px;color:var(--zhucai);}
.menu{display:flex;gap:14px;font-size:12.5px;color:var(--cizi);}
.status{display:flex;gap:8px;align-items:center;font-size:12px;color:var(--cizi);}
.status .live{width:8px;height:8px;border-radius:50%;background:var(--zhongdian);}
.wall{display:grid;grid-template-columns:190px 1fr;gap:var(--jianju);}
.side{display:flex;flex-direction:column;gap:calc(var(--jianju)*.8);}
.navitem{padding:9px 12px;border-radius:var(--yuanjiao);font-size:13px;color:var(--cizi);background:rgba(120,150,200,.06);}
.navitem.on{background:color-mix(in srgb,var(--zhucai) 16%,transparent);color:var(--zhucai);font-weight:700;}
.panels{display:grid;grid-template-columns:repeat(var(--lie),1fr);gap:var(--jianju);align-content:start;}
.panel{border:1px solid rgba(120,150,200,.18);border-radius:var(--yuanjiao);padding:14px;background:rgba(120,150,200,.04);}
.panel .k{font-size:11.5px;color:var(--cizi);}
.panel .v{font-size:calc(var(--zihao)*1.8);font-weight:800;margin-top:4px;color:var(--zhucai);}
.panel .spark{height:26px;margin-top:8px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--zhongdian) 60%,transparent));border-radius:4px;opacity:.7;}
body[data-glow="1"] .panel.on{border-color:var(--zhucai);box-shadow:0 0 calc(var(--faguang)*.6px) color-mix(in srgb,var(--zhucai) 60%,transparent);}
.panel.on .v{color:#fff;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.panel{box-shadow:0 calc(var(--yinying)*.15px) calc(var(--yinying)*.4px) rgba(0,0,0,.35)}
</style>
</head>
<body data-glow="1">
<div class="nav"><span class="logo">棱镜云</span><span class="menu"><a>概览</a><a>API</a><a>日志</a><a>计费</a></span><span class="status"><span class="live"></span>所有系统正常</span></div>
<div class="wall">
<div class="side">
<div class="navitem on">请求监控</div>
<div class="navitem">函数计算</div>
<div class="navitem">边缘节点</div>
<div class="navitem">告警规则</div>
<div class="navitem">访问密钥</div>
</div>
<div class="panels">
<div class="panel on"><div class="k">QPS</div><div class="v">24.8k</div><div class="spark"></div></div>
<div class="panel"><div class="k">P99 延迟</div><div class="v">42ms</div><div class="spark"></div></div>
<div class="panel"><div class="k">错误率</div><div class="v">0.03%</div><div class="spark"></div></div>
<div class="panel"><div class="k">在线节点</div><div class="v">128</div><div class="spark"></div></div>
<div class="panel"><div class="k">带宽</div><div class="v">3.1Gb</div><div class="spark"></div></div>
<div class="panel"><div class="k">今日调用</div><div class="v">9.2M</div><div class="spark"></div></div>
</div>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;if(d.key==='glow'){document.body.setAttribute('data-glow',d.value?'1':'0');return;}const U={yuanjiao:'px',jianju:'px',zihao:'px',lie:''};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "自研"
  },
  {
    id: "S10",
    风格名: "自然有机风",
    适配端: "通用",
    风格: "有机自然",
    场景: "工具·SaaS",
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
    Agent提示词: "【自然有机风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n有机侧栏+主卡。米白安静，叶绿温润跳主指标；大圆角统一全站有机感。重色压「自然主色」。 适用：环保/生活/健康类品牌站。参考：Patagonia、Notion 自然风、Garden 类站点。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（米白底 75% / 叶绿(主) 15% / 陶土(点缀) 10%）\n  底 --di #F3F1E7（页面唯一画布色）\n  主文字 --zi #2c3326\n  次级文字 --cizi #7e886f（副文、导航、页脚）\n  强调 --zhucai #5B8C5A（叶绿压主指标，圆角有机感——重色压「自然主色」）\n  重点 --zhongdian #A7C957（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 22px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 16px 为基准刻度（16 / 32 / 48 / 64）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：左窄有机圆角导航 + 右主卡（大叶绿数字+有机斑驳底）+ 下方支撑列表；大圆角统一\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 22px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 22px，阴影强度 14（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：左窄有机圆角导航 + 右主卡（大叶绿数字+有机斑驳底）+ 下方支撑列表；大圆角统一\n  删减（明确不做什么）：去直角硬边 / 去高饱和 / 去密集网格\n  内容落点（第一屏看到什么）：米白 + 叶绿大数字（自然呼吸，先被圆润叶绿吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 14 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：叶绿压主指标，圆角有机感——重色压「自然主色」；环保/生活/健康类品牌站\n  不该做：科技冷感、极简工业；去直角硬边 / 去高饱和 / 去密集网格\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「自然有机风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「米白 + 叶绿大数字（自然呼吸，先被圆润叶绿吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #F3F1E7 / 主文 #2c3326 / 次文 #7e886f / 强调 #5B8C5A / 重点 #A7C957\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 22 / 基准间距 16\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（有机侧栏+主卡），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-自然有机风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·自然有机风</title>
<style>
:root{--zhucai:#5B8C5A;--zhongdian:#A7C957;--di:#F3F1E7;--zi:#2c3326;--cizi:#7e886f;--yuanjiao:28px;--jianju:16px;--zihao:15px;--yinying:16;--faguang:0;--banbo:1}
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,"Microsoft YaHei",sans-serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.6;display:flex;gap:calc(var(--jianju)*1.5);padding:calc(var(--jianju)*2);align-items:center;}
.side{width:120px;flex:none;display:flex;flex-direction:column;gap:12px;}
.blob{background:color-mix(in srgb,var(--zhucai) 22%,transparent);border-radius:62% 38% 55% 45% / 55% 48% 52% 45%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;text-align:center;font-size:11px;color:var(--zhucai);font-weight:700;padding:10px;}
body[data-banbo="0"] .blob{border-radius:var(--yuanjiao);}
.main{flex:1;}
.eyebrow{color:var(--zhongdian);font-weight:800;font-size:12px;letter-spacing:2px;text-transform:uppercase;}
.bignum{font-size:calc(var(--zihao)*3.4);font-weight:800;color:var(--zhucai);line-height:1;margin:8px 0;}
.bignum small{font-size:calc(var(--zihao)*1.1);color:var(--cizi);font-weight:600;}
.desc{font-size:14.5px;color:#3c4434;max-width:30em;margin-top:6px;}
.list{margin-top:20px;display:flex;flex-direction:column;gap:10px;}
.item{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;}
.item .dot{width:10px;height:10px;border-radius:50%;background:var(--zhongdian);margin-top:5px;flex:none;}
.btn{margin-top:22px;background:var(--zhucai);color:#fff;border:none;border-radius:var(--yuanjiao);padding:12px 28px;font-weight:700;font-size:14px;cursor:pointer;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.btn{box-shadow:0 calc(var(--yinying)*.2px) calc(var(--yinying)*.5px) rgba(0,0,0,.18),0 0 calc(var(--faguang)*.6px) var(--zhucai)}
</style>
</head>
<body data-banbo="1">
<div class="side"><div class="blob">负氧离子<br>浓度高</div></div>
<div class="main">
<div class="eyebrow">屿野户外</div>
<div class="bignum">216<span> <small>条徒步路线</small></span></div>
<div class="desc">从城市边缘的浅丘，到雪线之上的垭口。我们按难度、景观与季节，把每一段山路都标记成你可以信任的脚印。</div>
<div class="list">
<div class="item"><span class="dot"></span><div>新手友好：12 条 5km 内环线，周末即可往返</div></div>
<div class="item"><span class="dot"></span><div>进阶挑战：海拔爬升 1500m+ 的雪山预备线</div></div>
<div class="item"><span class="dot"></span><div>装备清单：按路线自动生成，带不带心里有数</div></div>
</div>
<button class="btn">开始规划路线</button>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;if(d.key==='banbo'){document.body.setAttribute('data-banbo',d.value?'1':'0');return;}const U={yuanjiao:'px',jianju:'px',zihao:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "自研"
  },
  {
    id: "S11",
    风格名: "复古胶片风",
    适配端: "PC 端",
    风格: "复古怀旧",
    场景: "作品集·叙事",
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
    Agent提示词: "【复古胶片风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n胶片横滚长廊。胶片米安静，砖红小标签跳；齿孔+颗粒统一全站怀旧语感。重色压「胶片质感」。 适用：摄影/文创/怀旧品牌。参考：FilmSupply、VSCO、复古海报排版。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（胶片米 78% / 棕调(主) 18% / 砖红(点睛) 4%）\n  底 --di #2A211A（页面唯一画布色）\n  主文字 --zi #F2E9DD\n  次级文字 --cizi #b89c82（副文、导航、页脚）\n  强调 --zhucai #C77B3B（砖红只点标签/告警，整体蒙一层胶片颗粒——重色压「胶片质感」）\n  重点 --zhongdian #E8A85C（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 8px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 12px 为基准刻度（12 / 24 / 36 / 48）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：横向滚动胶片长廊：一排「胶片帧」（带齿孔）展示内容，砖红只点标签；整体蒙颗粒\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 8px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 8px，阴影强度 18（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：横向滚动胶片长廊：一排「胶片帧」（带齿孔）展示内容，砖红只点标签；整体蒙颗粒\n  删减（明确不做什么）：去纯白 / 去高亮 / 去现代圆角，靠颗粒+虚线\n  内容落点（第一屏看到什么）：胶片质感 + 横向帧长廊（先被怀旧颗粒与横滚吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 18 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：砖红只点标签/告警，整体蒙一层胶片颗粒——重色压「胶片质感」；摄影/文创/怀旧品牌\n  不该做：现代科技感、明亮清爽；去纯白 / 去高亮 / 去现代圆角，靠颗粒+虚线\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「复古胶片风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「胶片质感 + 横向帧长廊（先被怀旧颗粒与横滚吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #2A211A / 主文 #F2E9DD / 次文 #b89c82 / 强调 #C77B3B / 重点 #E8A85C\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 8 / 基准间距 12\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（胶片横滚长廊），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-复古胶片风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·复古胶片风</title>
<style>
:root{--zhucai:#C77B3B;--zhongdian:#E8A85C;--di:#2A211A;--zi:#F2E9DD;--cizi:#b89c82;--yuanjiao:6px;--jianju:14px;--zihao:15px;--yinying:12;--faguang:0;--grain:55;--zhenkuan:230}
*{box-sizing:border-box;margin:0;padding:0;font-family:Georgia,"Songti SC",serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.5;padding:calc(var(--jianju)*1.5);position:relative;overflow:hidden;}
body::after{content:"";position:fixed;inset:0;pointer-events:none;opacity:calc(var(--grain)/100);background-image:radial-gradient(rgba(0,0,0,.5) .5px,transparent .6px);background-size:3px 3px;mix-blend-mode:multiply;}
.head{display:flex;align-items:baseline;gap:14px;border-bottom:2px solid var(--zi);padding-bottom:10px;margin-bottom:16px;}
.head .brand{font-weight:800;font-size:20px;letter-spacing:1px;}
.head .meta{font-size:12px;color:var(--cizi);}
.strip{display:flex;gap:var(--jianju);overflow-x:auto;padding-bottom:10px;scrollbar-width:thin;}
.frame{flex:0 0 var(--zhenkuan);background:#1c1712;border-radius:4px;padding:10px 10px 14px;position:relative;box-shadow:0 4px 12px rgba(0,0,0,.18);}
.frame::before,.frame::after{content:"";position:absolute;left:50%;transform:translateX(-50%);width:60%;height:10px;background:repeating-linear-gradient(90deg,#3a322a 0 6px,transparent 6px 12px);}
.frame::before{top:-6px;}.frame::after{bottom:-6px;}
.frame .img{height:calc(var(--zhenkuan)*.7);border-radius:2px;background:linear-gradient(140deg,#7a5c3e,#b8845a);display:flex;align-items:flex-end;padding:8px;color:#F2E9DD;font-size:11px;}
.frame .cap{display:flex;justify-content:space-between;align-items:center;margin-top:8px;color:#b89c82;font-size:11px;}
.frame .cap .tag{background:var(--zhongdian);color:#fff;padding:2px 7px;border-radius:99px;font-size:10px;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.frame{border-radius:var(--yuanjiao);box-shadow:0 calc(var(--yinying)*.18px) calc(var(--yinying)*.45px) rgba(0,0,0,.5)}
.head .meta{font-size:calc(var(--zihao)*.8)}
.frame .cap .tag{background:color-mix(in srgb,var(--zhongdian) 68%,var(--zhucai));box-shadow:0 0 calc(var(--faguang)*.4px) var(--zhucai)}
</style>
</head>
<body>
<div class="head"><span class="brand">拾光胶片</span><span class="meta">Vol.07 · 夏季影像志</span></div>
<div class="strip">
<div class="frame"><div class="img">晨雾 · 洱海</div><div class="cap"><span>No.01</span><span class="tag">已冲印</span></div></div>
<div class="frame"><div class="img" style="background:linear-gradient(140deg,#8a6a3a,#c89a5c)">山脊 · 哈巴</div><div class="cap"><span>No.02</span><span class="tag">精选</span></div></div>
<div class="frame"><div class="img" style="background:linear-gradient(140deg,#8a5a44,#c98a6b)">老街 · 建水</div><div class="cap"><span>No.03</span><span class="tag">已冲印</span></div></div>
<div class="frame"><div class="img" style="background:linear-gradient(140deg,#6b4a36,#a07a55)">海岸 · 东冲</div><div class="cap"><span>No.04</span><span class="tag">待修</span></div></div>
<div class="frame"><div class="img" style="background:linear-gradient(140deg,#6b4a36,#a07a55)">麦田 · 元阳</div><div class="cap"><span>No.05</span><span class="tag">精选</span></div></div>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',grain:'',zhenkuan:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
    来源: "自研"
  },
  {
    id: "S12",
    风格名: "中式水墨风",
    适配端: "PC 端",
    风格: "国风水墨",
    场景: "作品集·叙事",
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
    Agent提示词: "【中式水墨风 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威，采用 Google Stitch DESIGN.md 范式。优先级：本宪法 > 具体需求描述 > 通用审美经验。任何冲突一律以本宪法为准，不得自行更改取值或添加风格。\n\n第一章 总纲 · 设计哲学\n水墨非对称。宣纸大面积留白，墨字沉稳，朱印一点跳；细线+衬线统一传统语感。重色压「一点朱印」。 适用：文化/国学/茶/传统品牌。参考：故宫/茶颜悦色、汉字文化站、宣纸风排版。\n\n第二章 设计 Token 法典（取值唯一，禁止近似值）\n2.1 颜色 colors（宣纸白 85% / 墨黑(字/线) 13% / 朱印红(点睛) 2%）\n  底 --di #F5F1E8（页面唯一画布色）\n  主文字 --zi #23201a\n  次级文字 --cizi #8c8576（副文、导航、页脚）\n  强调 --zhucai #9E2B25（朱印红只点「重点」印章，大面积宣纸+墨字——重色压「一点朱印」）\n  重点 --zhongdian #1c1c1c（仅用于次要强调，禁止大面积铺色）\n2.2 字体 typography\n  字体栈：system-ui / PingFang SC / Microsoft YaHei\n  H1 display：clamp(28px, 4.5vw, 52px)，字重 800，行高 1.12，字距 -0.5px\n  副文 body：16–17px，行高 1.6，最大宽度 46ch\n  小标 caption：13–14px，字重 600\n2.3 圆角 rounded：统一 4px（控件与卡片同值，禁止混用多套圆角）\n2.4 间距 spacing：以 14px 为基准刻度（14 / 28 / 42 / 56）\n2.5 动效 motion：不使用发光，单元素 700ms，缓动 cubic-bezier(.16,1,.3,1)；全站动效克制，不叠加多种动画\n2.6 层级 layout：非对称栅格：左侧竖排大标题（writing-mode vertical-rl）+ 右侧内容；朱印只点重点，右上印章\n\n第三章 组件规范 components（全部引用第二章 token）\n  导航 nav：单行，logo + 4–5 项 + 右侧主行动（同屏唯一实心按钮）\n  主按钮 btn-primary：底 --zhucai、字 #fff、圆角 4px；同屏只允许出现一个实心主按钮\n  次按钮 btn-ghost：透明底 + 描边，仅作陪衬\n  卡片 card：圆角 4px，阴影强度 8（不超过此值）\n\n第四章 布局法 layout\n  栅格：内容最宽 1040–1200px 居中\n  骨架：非对称栅格：左侧竖排大标题（writing-mode vertical-rl）+ 右侧内容；朱印只点重点，右上印章\n  删减（明确不做什么）：去色块 / 去圆角 / 去阴影，靠留白+细线+衬线\n  内容落点（第一屏看到什么）：宣纸留白 + 墨色大标题 + 右上朱印（先被留白与印章吸引）\n\n第五章 深度与层级 depth\n  surface-1 = 页面底 --di；surface-2 = 卡片 color-mix(zi 4%)；surface-3 = 弹层\n  阴影仅用于主按钮与卡片，强度 8 以内，禁止彩色阴影\n\n第六章 该做 / 不该做\n  该做：朱印红只点「重点」印章，大面积宣纸+墨字——重色压「一点朱印」；文化/国学/茶/传统品牌\n  不该做：现代科技、活泼卡通；去色块 / 去圆角 / 去阴影，靠留白+细线+衬线\n  反例警示：强调色滥用、一页多个等重主角、加与本风格相悖的圆角/渐变/发光——都会让「中式水墨风」失去焦点\n\n第七章 文案规则\n  占位式文案：围绕「宣纸留白 + 墨色大标题 + 右上朱印（先被留白与印章吸引）」写，一句讲清这是什么\n  human + agent 话术：把「人机一起干活」写进产品定义，是 2026 年工具站的共同签名\n\n第八章 响应式行为\n  断点 1024 / 768 / 480：1024 以下收掉侧栏改上下堆叠；768 以下导航折成汉堡、卡片单列；480 以下进一步压缩间距与字号；触控目标 ≥ 44px\n\n第九章 Agent 提示词指南\n  配色卡：底 #F5F1E8 / 主文 #23201a / 次文 #8c8576 / 强调 #9E2B25 / 重点 #1c1c1c\n  字号卡：H1 clamp(28,4.5vw,52) / 副文 16 / 小标 13；圆角 4 / 基准间距 14\n  即拿即用：把内容套进以上设计语言，输出一个完整 HTML（水墨非对称），零依赖可离线打开；参数键 zhucai/zhongdian/di/zi/cizi/yuanjiao/jianju/zihao/yinying/faguang 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-中式水墨风.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>方案·中式水墨风</title>
<style>
:root{--zhucai:#9E2B25;--zhongdian:#1c1c1c;--di:#F5F1E8;--zi:#23201a;--cizi:#8c8576;--yuanjiao:2px;--jianju:18px;--zihao:16px;--yinying:0;--faguang:0;--mo:80;--liubai:60}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Songti SC","STSong",serif;}
body{background:var(--di);color:var(--zi);min-height:100vh;line-height:1.8;padding:calc(var(--jianju)*1.2);display:grid;grid-template-columns:auto 1fr;gap:calc(var(--jianju)*1.5);}
.title{writing-mode:vertical-rl;text-orientation:upright;font-size:calc(var(--zihao)*2.6);font-weight:800;letter-spacing:.3em;color:rgba(35,32,26,calc(var(--mo)/100));border-left:2px solid var(--zhucai);padding-left:14px;align-self:start;}
.content{padding-top:var(--liubai);max-width:34em;}
.eyebrow{color:var(--zhongdian);font-weight:700;letter-spacing:3px;font-size:13px;}
.lead{font-size:calc(var(--zihao)*1.15);margin:14px 0;color:var(--zi);}
.lead .hl{color:var(--zhongdian);font-weight:700;}
.body{font-size:14.5px;color:#4a443c;line-height:2;text-align:justify;}
.seal{position:fixed;top:calc(var(--jianju)*1.2);right:calc(var(--jianju)*1.5);width:46px;height:46px;border:2px solid var(--zhongdian);color:var(--zhongdian);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;writing-mode:vertical-rl;line-height:1.1;text-align:center;}

/* 参数落地：以下参数此前只定义未消费（旋钮无效），在此接上 */
.content .body{color:color-mix(in srgb,var(--cizi) 55%,var(--zi))}
.hl{border-radius:calc(var(--yuanjiao)*.6)}
.seal{box-shadow:0 calc(var(--yinying)*.15px) calc(var(--yinying)*.42px) rgba(0,0,0,.22)}
.title{text-shadow:0 0 calc(var(--faguang)*.7px) var(--zhucai)}
</style>
</head>
<body>
<div class="seal">墨白</div>
<div class="title">一盏茶的时间</div>
<div class="content">
<div class="eyebrow">墨白茶事</div>
<div class="lead">茶不求浓，<span class="hl">器不争巧</span>。一席之间，留三分空，便是待客的礼。</div>
<div class="body">我们寻访南糯山的古茶树，只取头春一芽二叶，以柴火铁锅手工杀青。茶汤入盏，先闻其香，再观其色，后品其回甘。器物不求名贵，只求手感温润、出水流利——茶与器，本就该这样彼此成全。</div>
</div>
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={yuanjiao:'px',jianju:'px',zihao:'px',mo:'',liubai:'px'};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
</body>
</html>
`,
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
        "名": "墨色浓度(%)",
        "类型": "slider",
        "最小": 0,
        "最大": 100,
        "步长": 5,
        "默认": 80
      }
    ],
    来源: "自研"
  },
  {
    id: "S13",
    风格名: "高山营地",
    适配端: "通用",
    风格: "有机自然",
    场景: "落地页·发布页",
    骨架: "单栏居中：标签 + 双行大标题 + 说明 + 实心/描边双按钮 + 三组事实",
    配色: {
      "页面底": "70%",
      "实心按钮(主强调)": "12%",
      "描边按钮(弱化)": "10%",
      "步骤卡底": "8%"
    },
    布局骨架: "整屏居中一列：小标签、双行标题、两行说明、左右并排的两个按钮、底部一条带分隔线的事实行",
    重色落点: "帐篷橙只给唯一一枚实心按钮；描边按钮只用 62% 灰绿描边，两者对比就是「主行动 vs 了解」的全部信息",
    第一屏内容: "标签「CAMP · 海拔 3,120 m」；标题「夜宿三千米，帐篷外只有风。」；说明两行；按钮「预订营位」（实心）与「查看装备清单」（描边）；底部三组事实",
    删减元素: "不做价格表、不做装备长列表、不做图片；同屏只有两个按钮与三组数字",
    适用: "体验型产品的转化页开头；需要明确「一个主行动 + 一个次要了解」的落地页首屏",
    禁忌: "需要并列多个同等行动的服务页；功能型后台；把两个按钮做成同样重量（会失去指向）",
    参考站: ["Apple"],
    我的说明: "双按钮机制保留自原作（实心负责行动、描边负责了解），主题从消费电子换成高山营地：文案、色系、事实数据全部重新推导。按钮点击改为「加入候补 / 展开清单」，让两个按钮都有真实反馈。",
    Agent提示词: "【高山营地 · 设计语言宪法】\n效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。\n\n1. 视觉主题与氛围\n林线以上，风比人多。氛围冷、开阔、带一点克制的兴奋；密度低、气质硬朗、情绪是「就这一件事，做不做」。\n\n2. 色彩板与角色\n- ridge 林线暗绿 #16211A —— 主底（径向渐变自左上），占 62%\n- tent 帐篷橙 #E2703A —— 仅主行动按钮，占 12%\n- line 描边灰绿 #B9C4B4 —— 次要按钮描边与标签，占 18%\n- text 正文 #EDEFE8 —— 占 8%\n\n3. 字体规则\n- display：无衬线 600 字重，3×基准字号，行高 1.2\n- body：0.92×基准字号，行高 1.9\n- meta：Consolas 等宽，11px，字距 .24em\n\n4. 组件规范\n- 主按钮：帐篷橙实心 + 深色字，描边同色，hover 上移 2px\n- 次按钮：透明底 + 62% 描边，hover 加 14% 背景\n- 事实行：1px 分隔线 + 三组「数值 + 标签」\n\n5. 布局法\n整屏居中单列，最大宽度 760px；按钮间距 22px 级；事实行与说明之间留 1.5 倍间距。\n\n6. 深度与层级\n单层结构：底 → 文字 → 按钮。层次靠字重与色块对比，不用阴影。\n\n7. 该做 / 不该做\n该做：两个按钮一比一虚、权重差异必须一眼可辨；点击有真实反馈文案；事实数据自洽。\n不该做：加价格表、加图片、把两个按钮做成同样重量、加第三个行动。\n\n8. 响应式行为\n断点 640px：按钮改为整宽上下堆叠、事实行换行；触控目标 ≥44px。\n\n9. Agent 提示词指南\n配色卡：底 #16211A / 主行动 #E2703A / 描边 #B9C4B4 / 正文 #EDEFE8；字号卡：16 / 48 / 11。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，图形一律 CSS 生成）。",
    演示页: "assets/demos/方案-高山营地.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>高山营地</title>
<style>
:root{
  --di:#16211A;      /* 林线以上 */
  --zhu:#E2703A;     /* 帐篷橙 */
  --xian:#B9C4B4;    /* 描边与次字 */
  --zi:#EDEFE8;
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:6px;
  --kuandu:2px;      /* 虚按钮描边宽度 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:radial-gradient(120% 100% at 24% 8%,#20301F 0%,var(--di) 62%);
  color:var(--zi);min-height:100vh;display:grid;place-items:center;
  font-family:-apple-system,"Segoe UI","PingFang SC",sans-serif;padding:calc(var(--jianju)*2)}
main{max-width:760px;width:100%}
.tag{font-family:Consolas,monospace;font-size:11px;letter-spacing:.24em;color:var(--xian)}
h1{font-size:calc(var(--zihao)*3);line-height:1.2;letter-spacing:.01em;margin:calc(var(--jianju)*.8) 0 calc(var(--jianju)*.9)}
p.lede{color:color-mix(in srgb,var(--zi) 76%,transparent);font-size:calc(var(--zihao)*.92);line-height:1.9;max-width:34em}
.acts{display:flex;gap:calc(var(--jianju)*.8);margin-top:calc(var(--jianju)*1.5);flex-wrap:wrap}
/* 双按钮机制：实心负责行动，描边负责了解；对比越大指向越清晰 */
.btn{border-radius:var(--yuanjiao);padding:14px 26px;font-size:calc(var(--zihao)*.88);font-family:inherit;
  cursor:pointer;transition:transform .18s,background .18s,color .18s;letter-spacing:.02em}
.btn.solid{background:var(--zhu);color:#1A1208;border:var(--kuandu) solid var(--zhu);font-weight:600}
.btn.ghost{background:transparent;color:var(--zi);border:var(--kuandu) solid color-mix(in srgb,var(--xian) 62%,transparent)}
.btn.solid:hover{transform:translateY(-2px)}
.btn.ghost:hover{background:color-mix(in srgb,var(--xian) 14%,transparent);transform:translateY(-2px)}
.facts{display:flex;gap:calc(var(--jianju)*1.8);margin-top:calc(var(--jianju)*2.2);
  padding-top:calc(var(--jianju)*.9);border-top:1px solid rgba(237,239,232,.14)}
.facts div{display:flex;flex-direction:column;gap:5px}
.facts b{font-family:Consolas,monospace;font-size:calc(var(--zihao)*1.1);font-weight:500}
.facts span{font-size:10.5px;color:var(--xian);letter-spacing:.16em}
</style>
</head>
<body>
<main>
  <span class="tag">CAMP · 海拔 3,120 m</span>
  <h1>夜宿三千米，<br>帐篷外只有风。</h1>
  <p class="lede">每个营位配一顶高山帐与零下十五度睡袋，向导随行。林线以上的星空不需要滤镜，也不需要你去开灯。</p>
  <div class="acts">
    <button class="btn solid" id="b1">预订营位</button>
    <button class="btn ghost" id="b2">查看装备清单</button>
  </div>
  <div class="facts">
    <div><b>12</b><span>每期营位</span></div>
    <div><b>-15°C</b><span>睡袋温标</span></div>
    <div><b>2:1</b><span>队员与向导</span></div>
  </div>
</main>
<script>
var state = {
  di:'#16211A', zhu:'#E2703A', xian:'#B9C4B4', zi:'#EDEFE8',
  zihao:16, jianju:22, yuanjiao:6, kuandu:2
};
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--zhu',state.zhu);
  r.setProperty('--xian',state.xian);r.setProperty('--zi',state.zi);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  r.setProperty('--kuandu',state.kuandu+'px');
}
var b1=document.getElementById('b1'), b2=document.getElementById('b2');
b1.addEventListener('click',function(){b1.textContent=b1.textContent==='预订营位'?'已加入候补':'预订营位';});
b2.addEventListener('click',function(){b2.textContent=b2.textContent==='查看装备清单'?'收起清单':'查看装备清单';});
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
apply();
</script>
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
    { 键: "di", 名: "底色", 类型: "color", 默认: "#16211A" },
    { 键: "zhu", 名: "主行动色", 类型: "color", 默认: "#E2703A" },
    { 键: "xian", 名: "描边色", 类型: "color", 默认: "#B9C4B4" },
    { 键: "zi", 名: "正文色", 类型: "color", 默认: "#EDEFE8" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "按钮圆角", 类型: "slider", 默认: 6, 最小: 0, 最大: 24, 步长: 1 },
    { 键: "kuandu", 名: "描边宽度", 类型: "slider", 默认: 2, 最小: 1, 最大: 4, 步长: 1 }
  ],
    来源: "机制参考自 Apple 官网（apple.com，2026-08-20 分析）：实心 + 描边双按钮的主次对比与 hover 反馈；已换题重推为「高山营地」，视觉表达全部重做，非复刻"
  },
  {
    id: "S14",
    风格名: "镜框对比",
    适配端: "PC 端",
    风格: "极简瑞士",
    场景: "落地页·发布页",
    骨架: "居中标题 + 左右两栏对照卡片（主角深底放大 / 配角白底常规）",
    配色: {
      "页面底": "70%",
      "主角强调(墨黑)": "12%",
      "普通版弱化": "10%",
      "步骤卡底": "8%"
    },
    布局骨架: "上下两段：标题区（标签 + 大标题 + 一行副题）居中；主体两栏等宽卡片并列，卡片内含镜框轮廓、角色小标、名称与说明、底部链接",
    重色落点: "重色全压在右栏主角卡片上（深底 + 放大字号 + 按参数变化的投影），左栏保持白底常规，形成唯一落点",
    第一屏内容: "标题「同一排里，谁更该被先看见」；左栏「配角 · 基础款 TR90」白底；右栏「主角 · 钛金属全框」深底放大并带投影",
    删减元素: "不做价格、不做参数表、不做第三张卡；同屏只有两栏与两条链接",
    适用: "需要讲清「主次关系」的方法论页、对比型详情页、设计原则说明页",
    禁忌: "三件以上并列的产品列表；需要平均用力的目录页；把两栏做成同样重量（本页要讲的正是对比）",
    参考站: ["Apple"],
    我的说明: "主角 / 配角的对照结构保留自原作，主题换成眼镜店的两种镜框：主角用深底 + 大字号 + 可调投影表达重量，配角保持白底常规。投影强度与字号都走参数，方便直接演示「重量来自对比」。",
    Agent提示词: "【镜框对比 · 设计语言宪法】\n效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。\n\n1. 视觉主题与氛围\n验光室的光是均匀的，所以对比必须自己造。氛围干净、理性、带一点教学感；密度低、气质利落、情绪是「先看这一个」。\n\n2. 色彩板与角色\n- clinic 验光室白 #F2F4F6 —— 主底，占 56%\n- ink 主角块面 #1B2430 —— 仅右栏卡片，占 22%\n- teal 青蓝 #2F6F8F —— 左栏链接，占 12%\n- mute 标注灰 #7C8794 —— 角色小标与说明，占 10%\n深色只允许出现在主角卡片上。\n\n3. 字体规则\n- display：无衬线，2.2×基准字号，行高 1.3\n- body：0.84×基准字号，行高 1.8\n- meta：Consolas 等宽，11px，字距 .2em\n\n4. 组件规范\n- 对照卡：圆角由参数控制，内边距 22px 级；主角卡额外带按参数缩放的投影\n- 镜框轮廓：用 1px 描边 + 椭圆圆角画出正面镜框，不用图片\n- 链接：左栏青蓝、右栏浅青蓝，hover 加下划线\n\n5. 布局法\n标题区居中、最大宽度 1080px；主体两栏等宽、间距 22px 级；卡片内部纵向流式，链接贴底。\n\n6. 深度与层级\n底 → 卡片边界 → 主角块面 → 文字。主角的「重量」由深色 + 放大字号 + 投影三者共同承担。\n\n7. 该做 / 不该做\n该做：两栏权重差异一眼可辨；投影强度可调；镜框轮廓用 CSS 画。\n不该做：加价格、加参数表、加第三栏、把两栏做成同样重量。\n\n8. 响应式行为\n断点 820px：两栏改为上下堆叠，主角保持在上；触控目标 ≥44px。\n\n9. Agent 提示词指南\n配色卡：底 #F2F4F6 / 主角 #1B2430 / 青蓝 #2F6F8F / 标注 #7C8794；字号卡：16 / 35 / 11。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链）。",
    演示页: "assets/demos/方案-镜框对比.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>镜框对比</title>
<style>
:root{
  --di:#F2F4F6;      /* 验光室白 */
  --qing:#2F6F8F;    /* 青蓝（主角） */
  --mo:#1B2430;      /* 墨字 */
  --hui:#7C8794;     /* 标注 */
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:14px;
  --suofang:.3;      /* 主角缩放：视觉重量的一大来源 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--di);color:var(--mo);min-height:100vh;display:flex;flex-direction:column;justify-content:center;
  font-family:-apple-system,"Segoe UI","PingFang SC",sans-serif;padding:calc(var(--jianju)*1.6)}
header{text-align:center;margin-bottom:calc(var(--jianju)*1.8)}
.tag{font-family:Consolas,monospace;font-size:11px;letter-spacing:.22em;color:var(--hui)}
h1{font-size:calc(var(--zihao)*2.2);margin-top:12px;letter-spacing:.01em}
header p{margin-top:10px;color:var(--hui);font-size:calc(var(--zihao)*.84)}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--jianju)*1.2);max-width:1080px;width:100%;margin:0 auto}
.card{border-radius:var(--yuanjiao);padding:calc(var(--jianju)*1.3);display:flex;flex-direction:column;gap:10px;
  transition:transform .2s}
.card.sub{background:#FFFFFF;border:1px solid rgba(27,36,48,.1)}
/* 主角：深底 + 放大字号 + 投影，重量来自对比而不是尺寸均等 */
.card.main{background:var(--mo);color:#F2F4F6;box-shadow:0 calc(var(--suofang)*40px) calc(var(--suofang)*70px) rgba(27,36,48,.28)}
.card h2{font-size:calc(var(--zihao)*1.9);letter-spacing:.02em}
.card h2 small{display:block;margin-bottom:8px;font-size:11px;font-family:Consolas,monospace;
  letter-spacing:.2em;color:var(--hui);font-weight:400}
.card.main h2 small{color:color-mix(in srgb,#F2F4F6 62%,transparent)}
.card p{font-size:calc(var(--zihao)*.84);line-height:1.8;color:var(--hui);max-width:26em}
.card.main p{color:color-mix(in srgb,#F2F4F6 72%,transparent)}
.card .go{margin-top:auto;padding-top:calc(var(--jianju)*.6);font-size:calc(var(--zihao)*.82);
  color:var(--qing);text-decoration:none;font-weight:600}
.card.main .go{color:#7FC4E0}
/* 镜框：用 CSS 画出正面镜框轮廓，完全离线 */
.frame{height:86px;position:relative;margin-bottom:6px}
.frame::before,.frame::after{content:"";position:absolute;top:12px;width:38%;height:62px;
  border-radius:46% 46% 40% 40%/52% 52% 34% 34%;border:3px solid currentColor;opacity:.62}
.frame::before{left:2%}.frame::after{right:2%}
.card.main .frame::before,.card.main .frame::after{opacity:.9;border-width:4px}
@media (max-width:820px){.pair{grid-template-columns:1fr}}
</style>
</head>
<body>
<header>
  <span class="tag">FRAME COMPARISON</span>
  <h1>同一排里，谁更该被先看见</h1>
  <p>重量不来自尺寸均等，来自对比——深色、放大、投影，只要用在同一件东西上。</p>
</header>
<div class="pair">
  <div class="card sub">
    <div class="frame" style="color:var(--hui)"></div>
    <h2><small>配角</small>基础款 TR90</h2>
    <p>轻、耐折、日常通勤够用。放在次要位置，不抢视线。</p>
    <a class="go" href="#">进一步了解 ›</a>
  </div>
  <div class="card main" id="main">
    <div class="frame" style="color:#7FC4E0"></div>
    <h2><small>主角</small>钛金属全框</h2>
    <p>整块钛材切削，镜腿 0.9 mm。深色块面 + 放大字号 + 投影，自然成为第一落点。</p>
    <a class="go" href="#">预约验光 ›</a>
  </div>
</div>
<script>
var state = {
  di:'#F2F4F6', qing:'#2F6F8F', mo:'#1B2430', hui:'#7C8794',
  zihao:16, jianju:22, yuanjiao:14, suofang:.3
};
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--qing',state.qing);
  r.setProperty('--mo',state.mo);r.setProperty('--hui',state.hui);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  r.setProperty('--suofang',state.suofang);
}
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
apply();
</script>
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
    { 键: "di", 名: "底色", 类型: "color", 默认: "#F2F4F6" },
    { 键: "qing", 名: "链接青蓝", 类型: "color", 默认: "#2F6F8F" },
    { 键: "mo", 名: "主角块面色", 类型: "color", 默认: "#1B2430" },
    { 键: "hui", 名: "标注灰", 类型: "color", 默认: "#7C8794" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "卡片圆角", 类型: "slider", 默认: 14, 最小: 0, 最大: 28, 步长: 1 },
    { 键: "suofang", 名: "主角投影强度", 类型: "slider", 默认: 0.3, 最小: 0, 最大: 1, 步长: 0.05 }
  ],
    来源: "机制参考自 Apple 官网（apple.com，2026-08-20 分析）：主角 / 配角对照结构 + 深色块面制造视觉重量；已换题重推为「镜框对比」，视觉表达全部重做，非复刻"
  },
  {
    id: "S15",
    风格名: "建筑事务所",
    适配端: "通用",
    风格: "极简瑞士",
    场景: "官网·品牌站",
    骨架: "顶部导航（品牌 + 四项 + 委托入口）+ 左栏主张与数据 + 右栏立面图",
    配色: {
      "品牌色": "58%",
      "内容底": "30%",
      "强调色": "12%"
    },
    布局骨架: "导航一条分三段（品牌 / 栏目 / 委托胶囊按钮）；主体两栏——左栏标签、大标题、说明与三组数据；右栏立面图（横线网格 + 四个体块 + 一条砖红标高线）",
    重色落点: "砖红只给标题里的两个字、导航的委托入口与立面上那一条标高线；体块一律压成近墨色",
    第一屏内容: "导航「素问建筑 / 项目 / 团队 / 出版 / 联系 / 委托咨询」；标题「把混凝土做成能发光的」；三组数据（建成 / 在建 / 城市）；右栏北立面示意图",
    删减元素: "不做项目缩略图墙、不做轮播、不做介绍长文；同屏只有一条导航、一个主张、三组数字与一张立面图",
    适用: "设计事务所、工作室等以「主张先于作品」的门面型首页；需要一眼说清「我们做什么」的落地页",
    禁忌: "以作品集为主的展示页；需要即时转化的电商；把立面图换成真实照片（会失去图纸气质）",
    参考站: ["OpenAI"],
    我的说明: "首页动线机制保留自原作：导航承担品牌关键词、首屏一句话讲清「你是干嘛的」。主题换成建筑设计事务所：把抽象产品叙事换成「结构即表达」的主张，右侧用 CSS 网格与体块拼出北立面，替代原作的图形卡。",
    Agent提示词: "【建筑事务所 · 设计语言宪法】\n效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。\n\n1. 视觉主题与氛围\n清水混凝土的模板缝还在，光从北面进来。氛围冷静、结构感强、有材料味；密度中低、气质笃定、情绪是「我们不解释第二遍」。\n\n2. 色彩板与角色\n- concrete 混凝土 #E6E4DF —— 主底，占 58%\n- brick 砖红 #A8482F —— 标题强调、委托入口、标高线，占 10%\n- ink 墨 #26241F —— 体块、标题、数据，占 24%\n- mute 标注灰 #7A766D —— 说明与标签，占 8%\n\n3. 字体规则\n- display：Georgia / Songti SC，2.7×基准字号，行高 1.2\n- body：0.86×基准字号，行高 1.9\n- meta：Consolas 等宽，11px，字距 .22em\n\n4. 组件规范\n- 导航：品牌在左、栏目居中、委托为胶囊描边按钮（砖红）\n- 数据组：等宽数值 + 灰色标签，上方压 1px 分隔线\n- 立面图：46px 横线网格 + 4 个体块 + 1 条砖红标高线 + 左下角比例尺文字\n\n5. 布局法\n导航 1 行；主体两栏（左 1.15fr / 右 0.85fr）；栏间 1px 分隔线；内边距 22px 级。\n\n6. 深度与层级\n底 → 网格线 → 体块 → 砖红标高线 → 文字。全部为平面层级，不使用阴影与圆角堆叠。\n\n7. 该做 / 不该做\n该做：立面图与主张呼应（结构即表达）；数字真实可查；导航只保留四项。\n不该做：做作品轮播、做长文介绍、贴实景照片、用圆角卡片包裹一切。\n\n8. 响应式行为\n断点 880px：两栏改单列（主张 → 立面），立面最小高度 240px；触控目标 ≥44px。\n\n9. Agent 提示词指南\n配色卡：底 #E6E4DF / 砖红 #A8482F / 墨 #26241F / 标注 #7A766D；字号卡：16 / 43 / 11。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，立面图用 CSS 渐变与绝对定位生成）。",
    演示页: "assets/demos/方案-建筑事务所.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>建筑设计事务所</title>
<style>
:root{
  --di:#E6E4DF;      /* 混凝土 */
  --zhuan:#A8482F;   /* 砖红 */
  --mo:#26241F;      /* 墨 */
  --hui:#7A766D;     /* 标注 */
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:2px;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--di);color:var(--mo);min-height:100vh;display:flex;flex-direction:column;
  font-family:-apple-system,"Segoe UI","PingFang SC",sans-serif}
nav{display:flex;align-items:center;gap:calc(var(--jianju)*1.2);padding:calc(var(--jianju)*1) calc(var(--jianju)*1.6);
  border-bottom:1px solid rgba(38,36,31,.16);font-size:calc(var(--zihao)*.8)}
nav b{margin-right:auto;font-family:Georgia,serif;font-size:calc(var(--zihao)*1.15);letter-spacing:.14em;font-weight:400}
nav a{color:var(--hui);text-decoration:none}nav a:hover{color:var(--zhuan)}
nav .cta{color:var(--zhuan);border:1px solid color-mix(in srgb,var(--zhuan) 55%,transparent);
  border-radius:99px;padding:7px 15px}
main{flex:1;display:grid;grid-template-columns:1.15fr .85fr;min-height:0}
.lede{padding:calc(var(--jianju)*2) calc(var(--jianju)*1.6);display:flex;flex-direction:column;justify-content:center;gap:calc(var(--jianju)*1.1)}
.tag{font-family:Consolas,monospace;font-size:11px;letter-spacing:.22em;color:var(--hui)}
h1{font-size:calc(var(--zihao)*2.7);line-height:1.2;letter-spacing:.01em}
h1 em{font-style:normal;color:var(--zhuan)}
.lede p{color:var(--hui);font-size:calc(var(--zihao)*.86);line-height:1.9;max-width:32em}
.facts{display:flex;gap:calc(var(--jianju)*1.6);padding-top:calc(var(--jianju)*.9);border-top:1px solid rgba(38,36,31,.16)}
.facts div{display:flex;flex-direction:column;gap:5px}
.facts b{font-family:Consolas,monospace;font-size:calc(var(--zihao)*1.15);font-weight:500}
.facts span{font-size:10.5px;color:var(--hui);letter-spacing:.16em}
/* 立面：用 CSS 渐变与方块堆出建筑剖面感，零外链 */
.elev{border-left:1px solid rgba(38,36,31,.16);position:relative;overflow:hidden;
  background:
    repeating-linear-gradient(0deg,rgba(38,36,31,.07) 0 1px,transparent 1px 46px),
    linear-gradient(180deg,transparent 62%,color-mix(in srgb,var(--mo) 8%,transparent))}
.elev i{position:absolute;background:color-mix(in srgb,var(--mo) 78%,transparent);border-radius:var(--yuanjiao)}
.elev i:nth-child(1){left:12%;bottom:22%;width:26%;height:34%}
.elev i:nth-child(2){left:42%;bottom:22%;width:18%;height:52%}
.elev i:nth-child(3){left:64%;bottom:22%;width:24%;height:26%}
.elev i:nth-child(4){left:12%;bottom:58%;width:50%;height:3%;background:var(--zhuan)}
.elev span{position:absolute;left:12%;bottom:12%;font-family:Consolas,monospace;font-size:10.5px;color:var(--hui);letter-spacing:.14em}
@media (max-width:880px){main{grid-template-columns:1fr}.elev{min-height:240px;border-left:none;border-top:1px solid rgba(38,36,31,.16)}}
</style>
</head>
<body>
<nav>
  <b>素问建筑</b>
  <a href="#">项目</a><a href="#">团队</a><a href="#">出版</a><a href="#">联系</a>
  <a class="cta" href="#">委托咨询</a>
</nav>
<main>
  <div class="lede">
    <span class="tag">TECTONIC · SINCE 2009</span>
    <h1>把混凝土<br>做成<em>能发光</em>的</h1>
    <p>我们只做一件事：让结构自己说话。清水混凝土的模板缝、钢节点的焊接痕，都是图纸之外的第二种表达。</p>
    <div class="facts">
      <div><b>68</b><span>建成项目</span></div>
      <div><b>11</b><span>在建</span></div>
      <div><b>4</b><span>城市</span></div>
    </div>
  </div>
  <div class="elev">
    <i></i><i></i><i></i><i></i>
    <span>北立面 · 1:200</span>
  </div>
</main>
<script>
var state = {
  di:'#E6E4DF', zhuan:'#A8482F', mo:'#26241F', hui:'#7A766D',
  zihao:16, jianju:22, yuanjiao:2
};
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--zhuan',state.zhuan);
  r.setProperty('--mo',state.mo);r.setProperty('--hui',state.hui);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
}
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
apply();
</script>
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
    { 键: "di", 名: "混凝土底色", 类型: "color", 默认: "#E6E4DF" },
    { 键: "zhuan", 名: "砖红强调", 类型: "color", 默认: "#A8482F" },
    { 键: "mo", 名: "墨色", 类型: "color", 默认: "#26241F" },
    { 键: "hui", 名: "标注灰", 类型: "color", 默认: "#7A766D" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "圆角", 类型: "slider", 默认: 2, 最小: 0, 最大: 12, 步长: 1 }
  ],
    来源: "机制参考自 stripe.com 官网（2026-08-26 分析）+ openai.com 首页动线（对照）：导航定位品牌 + 首屏一句话门面 + 数字背书；已换题重推为「建筑事务所」，视觉表达全部重做，非复刻"
  },
  {
    id: "S16",
    风格名: "动效节奏",
    适配端: "通用",
    风格: "科技未来",
    场景: "落地页·发布页",
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
<title>方案·动效节奏</title>
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
<div class="head"><h1>动效节奏</h1><span class="tag">Motion · 动效集</span></div>
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
<script>addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;const U={jiange:'px',zihao:'px',liubai:'px',speed:''};document.documentElement.style.setProperty('--'+d.key,d.value+(U[d.key]||''))});</script>
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
      {键:"liubai",名:"留白",类型:"slider",默认:40,最小:20,最大:80,步长:2},
    { 键: "di", 名: "页面底色", 类型: "color", 默认: "#F8F8F8" },
    { 键: "zhongdian", 名: "重点色", 类型: "color", 默认: "#FF9667" }
  ],
    来源: "来自于抖音"
  },
  {
    id: "S17",
    风格名: "自然博物馆",
    适配端: "PC 端",
    风格: "有机自然",
    场景: "官网·品牌站",
    骨架: "页头一行 + 左栏主张与馆藏数据 + 右栏展柜（悬停揭示标本档案）",
    配色: {
      "深底": "68%",
      "品牌叠": "20%",
      "揭示叠": "12%"
    },
    布局骨架: "页头一行（馆名 + 展厅）；主体两栏——左栏大标题、说明与三组馆藏数据；右栏展柜：骨架剪影居中，悬停时底部档案层升起",
    重色落点: "铜绿只给标题强调字、悬停后的档案数值与展柜描边；骨架剪影保持骨白两级灰度",
    第一屏内容: "页头「南岭自然博物馆 · 常设展 第三展厅」；标题「每件标本都藏着自己的年代」；三组数据（馆藏 / 展出 / 建馆）；右栏展柜内一副骨架剪影与编号",
    删减元素: "不做展品缩略图墙、不做购票流程、不做导览地图；同屏只有一件展品与一组数据",
    适用: "博物馆、美术馆、研究机构的常设展首页；需要「让观众自己发现信息」的导览页",
    禁忌: "需要快速检索的藏品库；电商周边页；把展柜做成图片轮播（会失去揭示的主动感）",
    参考站: ["Awwwards"],
    我的说明: "悬停揭示机制保留自原作：信息不直给，靠悬停把档案层升起来。主题换成自然博物馆：把抽象探索换成一副具体标本（编号 0317），揭示层里放地层、年代、采集与完整度四项档案。揭示强度可调。",
    Agent提示词: "【自然博物馆 · 设计语言宪法】\n效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。\n\n1. 视觉主题与氛围\n展厅的灯只打在展柜上，其余地方收暗。氛围安静、有年代感、带一点探索的邀请；密度低、气质沉稳、情绪是「自己去找答案」。\n\n2. 色彩板与角色\n- hall 展厅暗绿 #10201F —— 主底（径向渐变偏右上），占 56%\n- bone 骨白 #E9E4D8 —— 骨架剪影与文字，占 22%\n- patina 铜绿 #7A9A7E —— 标题强调、档案数值、展柜 hover 描边，占 14%\n- mute 标注灰 #7E8B84 —— 说明与标签，占 8%\n\n3. 字体规则\n- display：无衬线，2.5×基准字号，行高 1.26\n- body：0.86×基准字号，行高 1.9\n- meta：Consolas 等宽，10.5–11px，字距 .16em\n\n4. 组件规范\n- 展柜：1:0.86 比例、1px 描边、圆角由参数控制；编号置于左上\n- 骨架剪影：1 根竖轴 + 5 根横肋，用圆角矩形拼出，不用图片\n- 揭示层：贴底、深色渐变蒙版，悬停时位移到 0，透明度由「揭示强度」控制\n\n5. 布局法\n页头 1 行；主体两栏（左 1fr / 右 1.05fr）；栏间 1px 分隔线；展柜居中，宽 78%。\n\n6. 深度与层级\n底 → 展柜描边 → 骨架剪影 → 揭示层 → 文字。揭示层用 transform + opacity，不使用弹窗。\n\n7. 该做 / 不该做\n该做：揭示层内容与展品编号自洽；揭示强度可调；展柜支持键盘 focus。\n不该做：做缩略图墙、做购票流程、做导览地图、把展柜改成图片轮播。\n\n8. 响应式行为\n断点 880px：两栏改单列（主张 → 展柜），展柜换行并保留揭示层；触控目标 ≥44px；无悬停设备上揭示层改为按下切换。\n\n9. Agent 提示词指南\n配色卡：底 #10201F / 骨白 #E9E4D8 / 铜绿 #7A9A7E / 标注 #7E8B84；字号卡：16 / 40 / 10.5。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，骨架剪影用 CSS 拼出）。",
    演示页: "assets/demos/方案-自然博物馆.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>自然博物馆导览</title>
<style>
:root{
  --di:#10201F;      /* 展厅暗绿 */
  --gu:#E9E4D8;      /* 骨白 */
  --tong:#7A9A7E;    /* 铜绿 */
  --hui:#7E8B84;
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:4px;
  --qiangdu:.9;      /* 揭示层强度 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:radial-gradient(120% 100% at 70% 20%,#162A29 0%,var(--di) 64%);color:var(--gu);
  min-height:100vh;display:flex;flex-direction:column;font-family:-apple-system,"Segoe UI","PingFang SC",sans-serif}
header{display:flex;align-items:center;gap:calc(var(--jianju)*1.1);padding:calc(var(--jianju)*1.1) calc(var(--jianju)*1.6);
  font-family:Consolas,monospace;font-size:11px;letter-spacing:.2em}
header b{margin-right:auto;font-size:calc(var(--zihao)*1.05);letter-spacing:.14em;font-weight:400;font-family:Georgia,serif}
header span{color:var(--hui)}
main{flex:1;display:grid;grid-template-columns:1fr 1.05fr;min-height:0}
.copy{padding:calc(var(--jianju)*1.8) calc(var(--jianju)*1.6);display:flex;flex-direction:column;justify-content:center;gap:calc(var(--jianju)*1.1)}
h1{font-size:calc(var(--zihao)*2.5);line-height:1.26}
h1 em{font-style:normal;color:var(--tong)}
.copy p{color:var(--hui);font-size:calc(var(--zihao)*.86);line-height:1.9;max-width:30em}
.lg{display:flex;gap:calc(var(--jianju)*1.5);padding-top:calc(var(--jianju)*.9);border-top:1px solid rgba(233,228,216,.14)}
.lg div{display:flex;flex-direction:column;gap:5px}
.lg b{font-family:Consolas,monospace;font-size:calc(var(--zihao)*1.05);font-weight:500}
.lg span{font-size:10.5px;color:var(--hui);letter-spacing:.15em}
/* 展柜：悬停时揭示层升起（原作的「悬停揭示」机制本体） */
.vitrine{position:relative;border-left:1px solid rgba(233,228,216,.14);display:flex;align-items:center;justify-content:center;overflow:hidden}
.spec{position:relative;width:78%;max-width:520px;aspect-ratio:1/.86;border:1px solid rgba(233,228,216,.16);
  border-radius:var(--yuanjiao);cursor:crosshair;transition:border-color .3s;
  background:linear-gradient(170deg,color-mix(in srgb,var(--tong) 10%,transparent),transparent 62%)}
.vitrine:hover .spec{border-color:color-mix(in srgb,var(--tong) 62%,transparent)}
/* 骨架剪影：CSS 拼出脊柱与肋骨（肋骨用 top 定位，translate 百分比只按自身尺寸算，不能跨父级） */
.spec i{position:absolute;left:50%;top:16%;height:68%;width:4px;transform:translateX(-50%);
  background:color-mix(in srgb,var(--gu) 72%,transparent);border-radius:99px}
.spec b{position:absolute;left:50%;width:80%;height:4px;transform:translateX(-50%);
  background:color-mix(in srgb,var(--gu) 52%,transparent);border-radius:99px;transform-origin:50% 50%}
.spec b:nth-of-type(1){top:28%;transform:translateX(-50%) scaleX(.72)}
.spec b:nth-of-type(2){top:39%;transform:translateX(-50%) scaleX(.9)}
.spec b:nth-of-type(3){top:50%;transform:translateX(-50%) scaleX(1)}
.spec b:nth-of-type(4){top:61%;transform:translateX(-50%) scaleX(.86)}
.spec b:nth-of-type(5){top:72%;transform:translateX(-50%) scaleX(.66)}
.reveal{position:absolute;inset:auto 0 0 0;padding:18px 20px;
  background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--di) 94%,transparent));
  transform:translateY(calc((1 - var(--qiangdu)) * 100% + 28%));opacity:0;
  transition:transform .42s cubic-bezier(.2,.7,.2,1),opacity .32s}
.vitrine:hover .reveal{transform:translateY(0);opacity:var(--qiangdu)}
.reveal h4{font-size:calc(var(--zihao)*1.05);letter-spacing:.04em}
.reveal dl{margin-top:10px;display:grid;grid-template-columns:auto 1fr;gap:6px 14px;font-size:calc(var(--zihao)*.78)}
.reveal dt{color:var(--hui)}
.reveal dd{font-family:Consolas,monospace;color:var(--tong)}
.no{position:absolute;left:18px;top:16px;font-family:Consolas,monospace;font-size:10.5px;color:var(--hui);letter-spacing:.16em}
@media (max-width:880px){main{grid-template-columns:1fr}.vitrine{border-left:none;border-top:1px solid rgba(233,228,216,.14);padding:calc(var(--jianju)*1.4) 0}}
</style>
</head>
<body>
<header>
  <b>南岭自然博物馆</b>
  <span>常设展 · 第三展厅</span>
</header>
<main>
  <div class="copy">
    <h1>每件标本<br>都藏着自己的<em>年代</em></h1>
    <p>展签只写物种与产地，剩下的靠你自己找——它活在哪一层岩层、被谁发现、为什么留在这里。</p>
    <div class="lg">
      <div><b>12,480</b><span>馆藏标本</span></div>
      <div><b>380</b><span>常设展出</span></div>
      <div><b>1998</b><span>建馆</span></div>
    </div>
  </div>
  <div class="vitrine">
    <div class="spec">
      <span class="no">SPECIMEN 0317</span>
      <i></i><b></b><b></b><b></b><b></b><b></b>
      <div class="reveal">
        <h4>南岭始颌龙 · 复原骨架</h4>
        <dl>
          <dt>地层</dt><dd>下侏罗统 · 灰岩</dd>
          <dt>年代</dt><dd>距今约 1.86 亿年</dd>
          <dt>采集</dt><dd>1998 · 北坡采石场</dd>
          <dt>完整度</dt><dd>约 62% 骨架</dd>
        </dl>
      </div>
    </div>
  </div>
</main>
<script>
var state = {
  di:'#10201F', gu:'#E9E4D8', tong:'#7A9A7E', hui:'#7E8B84',
  zihao:16, jianju:22, yuanjiao:4, qiangdu:.9
};
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--gu',state.gu);
  r.setProperty('--tong',state.tong);r.setProperty('--hui',state.hui);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  r.setProperty('--qiangdu',state.qiangdu);
}
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
apply();
</script>
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
    { 键: "di", 名: "展厅底色", 类型: "color", 默认: "#10201F" },
    { 键: "gu", 名: "骨白色", 类型: "color", 默认: "#E9E4D8" },
    { 键: "tong", 名: "铜绿强调", 类型: "color", 默认: "#7A9A7E" },
    { 键: "hui", 名: "标注灰", 类型: "color", 默认: "#7E8B84" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "展柜圆角", 类型: "slider", 默认: 4, 最小: 0, 最大: 16, 步长: 1 },
    { 键: "qiangdu", 名: "揭示强度", 类型: "slider", 默认: 0.9, 最小: 0.3, 最大: 1, 步长: 0.05 }
  ],
    来源: "机制参考自 motionsites.ai Interactive Discovery Hero（2026-08-30 提取）：悬停揭示层 + 探索式首屏叙事；已换题重推为「自然博物馆导览」，视觉表达全部重做，非复刻"
  },
  {
    id: "S18",
    风格名: "独立放映",
    适配端: "通用",
    风格: "暗色",
    场景: "落地页·发布页",
    骨架: "极简导航 + 单句大标题 + 说明 + 唯一入口 + 页脚两行",
    配色: {
      "焦点底": "62%",
      "聚光": "26%",
      "文字": "12%"
    },
    布局骨架: "纵向三段：极简导航（品牌 + 四栏目）/ 主区垂直居中（单句标题、两行说明、入口按钮与座位信息同行）/ 页脚两行等宽说明",
    重色落点: "米金只给标题里被强调的四个字与唯一按钮；画面没有第二处亮色",
    第一屏内容: "标题「一屏只放一句话：今晚十点，冬眠」；说明两行；按钮「预约座位」与「余 6 座 · 10-04 22:00 · 环幕厅 B」",
    删减元素: "不做海报图、不做片单列表、不做轮播；同屏只有一句话、一个按钮与一行座位信息",
    适用: "放映、演出、展览等「一期一事」的公告型首屏；需要让一句话被记住的活动页",
    禁忌: "多场次排期页；需要罗列大量信息的活动页；把按钮做成两个以上（会破坏唯一焦点）",
    参考站: ["OpenAI"],
    我的说明: "焦点型机制保留自原作：一屏只做一件事，让用户记住这一句话。主题换成独立放映：把工具型文案换成「今晚十点，冬眠」的具体场次，用字距参数控制这一句话的呼吸，按钮与座位信息同行放。",
    Agent提示词: "【独立放映 · 设计语言宪法】\n效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。\n\n1. 视觉主题与氛围\n灯灭之前，幕布是黑的，只有一句话留在上面。氛围安静、暗、专注；密度极低、气质克制、情绪是「今晚只做这一件事」。\n\n2. 色彩板与角色\n- house 放映厅黑 #0E0E0F —— 主底，占 70%\n- gold 米金 #C9A227 —— 标题强调与唯一按钮，占 10%\n- cloth 幕布白 #F3F1EA —— 标题与正文，占 14%\n- mute 标注灰 #8A8A88 —— 页脚与座位信息，占 6%\n\n3. 字体规则\n- display：Georgia / Songti SC，3.4×基准字号，行高 1.22，字距由参数控制\n- body：0.92×基准字号，行高 1.9\n- meta：Consolas 等宽，11px，字距 .14em\n\n4. 组件规范\n- 入口：米金实心按钮，圆角由参数控制，hover 上移 2px\n- 座位信息：等宽小字，与按钮同行右置\n- 导航与页脚：等宽小字，链接 hover 染米金\n\n5. 布局法\n导航 1 行与页脚 1 行夹住主区；主区垂直居中、内边距 22px 级；标题最大宽度 22em。\n\n6. 深度与层级\n单层：底 → 文字 → 按钮。不加卡片、不加投影、不加分隔装饰。\n\n7. 该做 / 不该做\n该做：一屏只给一句话；按钮唯一；座位信息与场次必须自洽。\n不该做：加海报图、加片单、加轮播、加第二个按钮、把标题拆成多段。\n\n8. 响应式行为\n断点 720px：按钮与座位信息改为上下堆叠；触控目标 ≥44px；标题字号降一档。\n\n9. Agent 提示词指南\n配色卡：底 #0E0E0F / 米金 #C9A227 / 幕布白 #F3F1EA / 标注 #8A8A88；字号卡：16 / 54.4 / 11。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链）。",
    演示页: "assets/demos/方案-独立放映.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>独立放映</title>
<style>
:root{
  --di:#0E0E0F;      /* 放映厅黑 */
  --jin:#C9A227;     /* 米金 */
  --zi:#F3F1EA;      /* 幕布白 */
  --hui:#8A8A88;     /* 标注 */
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:2px;
  --ziju:.01em;      /* 字距：一屏一句话的呼吸 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--di);color:var(--zi);min-height:100vh;display:flex;flex-direction:column;
  font-family:Georgia,"Songti SC",serif}
nav{display:flex;align-items:center;gap:calc(var(--jianju)*1.1);padding:calc(var(--jianju)*1.1) calc(var(--jianju)*1.6);
  font-family:Consolas,monospace;font-size:11px;letter-spacing:.2em}
nav b{margin-right:auto;font-family:Georgia,serif;font-size:calc(var(--zihao)*1.05);letter-spacing:.16em;font-weight:400}
nav a{color:var(--hui);text-decoration:none}nav a:hover{color:var(--jin)}
main{flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 calc(var(--jianju)*1.8) calc(var(--jianju)*2)}
h1{font-size:calc(var(--zihao)*3.4);line-height:1.22;letter-spacing:var(--ziju);max-width:22em}
h1 em{font-style:normal;color:var(--jin)}
.sub{margin-top:calc(var(--jianju)*1.2);color:var(--hui);font-size:calc(var(--zihao)*.92);line-height:1.9;max-width:34em}
.row{display:flex;align-items:center;gap:calc(var(--jianju)*1.2);margin-top:calc(var(--jianju)*2.2);flex-wrap:wrap}
a.go{color:var(--di);background:var(--jin);border-radius:var(--yuanjiao);padding:13px 24px;
  font-size:calc(var(--zihao)*.86);text-decoration:none;font-family:-apple-system,"PingFang SC",sans-serif;
  transition:transform .18s}
a.go:hover{transform:translateY(-2px)}
.row span{font-family:Consolas,monospace;font-size:11px;color:var(--hui);letter-spacing:.14em}
footer{padding:calc(var(--jianju)*1.1) calc(var(--jianju)*1.8);border-top:1px solid rgba(243,241,234,.12);
  display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;
  font-family:Consolas,monospace;font-size:11px;color:var(--hui);letter-spacing:.1em}
</style>
</head>
<body>
<nav>
  <b>环幕放映</b>
  <a href="#">本期片单</a><a href="#">排期</a><a href="#">会员</a><a href="#">关于</a>
</nav>
<main>
  <h1>一屏只放一句话：<br><em>今晚十点，冬眠</em></h1>
  <p class="sub">十六毫米胶片，四十分钟无对白。放映厅只有二十四把椅子，散场后可以和导演聊到灯灭。</p>
  <div class="row">
    <a class="go" href="#">预约座位</a>
    <span id="seat">余 6 座 · 10-04 22:00 · 环幕厅 B</span>
  </div>
</main>
<footer>
  <span>独立放映 · 每周一期</span>
  <span>不接受包场 · 不支持退票</span>
</footer>
<script>
var state = {
  di:'#0E0E0F', jin:'#C9A227', zi:'#F3F1EA', hui:'#8A8A88',
  zihao:16, jianju:22, yuanjiao:2, ziju:.01
};
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--jin',state.jin);
  r.setProperty('--zi',state.zi);r.setProperty('--hui',state.hui);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  r.setProperty('--ziju',state.ziju+'em');
}
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
apply();
</script>
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
    { 键: "di", 名: "放映厅底色", 类型: "color", 默认: "#0E0E0F" },
    { 键: "jin", 名: "米金强调", 类型: "color", 默认: "#C9A227" },
    { 键: "zi", 名: "幕布白", 类型: "color", 默认: "#F3F1EA" },
    { 键: "hui", 名: "标注灰", 类型: "color", 默认: "#8A8A88" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "按钮圆角", 类型: "slider", 默认: 2, 最小: 0, 最大: 20, 步长: 1 },
    { 键: "ziju", 名: "标题字距(em)", 类型: "slider", 默认: 0.01, 最小: 0, 最大: 0.08, 步长: 0.002 }
  ],
    来源: "机制参考自 openai.com 官网首屏（2026-09-19 分析）：焦点型首屏——一屏一句话 + 极简导航 + 唯一入口；已换题重推为「独立放映」，视觉表达全部重做，非复刻"
  },
  {
    id: "S19",
    风格名: "暗色发布页",
    适配端: "通用",
    风格: "暗色",
    场景: "落地页·发布页",
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
    我的说明: "暗色发布页 = 粒子星系做背景 + 窄栏内容 + 滚动编排。核心不是技术（Three.js 粒子系统），而是「把活的星系当作视觉语言」：星系翻转代表「让位」、散开代表「让出空间」、聚成形状代表「能力显现」——视觉叙事，不是装饰。黑白配色 + 氛围蓝 + 胶囊控件 = 极克制设计语言，所有注意力留给星星。在线版：https://win-hao.github.io/starflow/。\n\n如果需要更传统的发布页布局（大标题+图表+对比），应该用 Codex 发布页那种结构化布局而非此方案。",
    Agent提示词: `【暗色发布页 · 设计语言宪法】
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


【响应式行为 responsive】
- 断点：≥1280 桌面满屏单屏，星图与文案同时可见；768–1279 平板纵向堆叠，标题字号降一档、调参面板收进右侧抽屉；<768 手机端改为单列流式，星图保持全屏底，文字块上移不遮挡画面中心。
- 触控：所有可点目标 ≥44px；调参滑杆手柄加大到 20px，色板输入在移动端改为点击弹出系统取色器。
- 折叠策略：小节依次下移，不裁切主体；语言切换按钮固定在右上，不随滚动消失。
- 尊重 prefers-reduced-motion：关闭星尘漂移与入场位移，保留静态星空与全部可读文字。`,
    演示页: "assets/demos/方案-暗色发布页.html",
    ThreeJS演示: "assets/demos/粒子星系-ThreeJS.html",
    下载: "assets/库/starflow.js",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>方案·暗色发布页</title>
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
  <p class="note">背景为真实 Three.js 3D 版（需 HTTP 服务）；双击打开时自动降级 Canvas 2D · starflow 引擎 作者 Win-Hao（MIT，仓库 github.com/Win-Hao/starflow）</p>
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
      </section>
  <section class="copy tail">
    <p>到底了。向上滚动，星流逆序合拢，回到首屏的完整星系。</p>
    <div class="actions">
      <a class="btn btn-primary" href="#">开始使用</a>
      <a class="btn btn-glass" href="#">了解更多</a>
    </div>
  </section>
</div>

<div class="notice"><span id="modeText">背景加载中…</span> · 背景引擎 starflow（作者 Win-Hao，MIT）</div>

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
</script>
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
    id: "S20",
    风格名: "植物标本图鉴",
    适配端: "PC 端",
    风格: "有机自然",
    场景: "内容·阅读",
    骨架: "顶部导航条 + 左栏主张与数据 + 右侧标本网格（悬停升起说明）",
    配色: {"深底(画布)":"60%","文字与留白":"30%","强调色(CTA/图标)":"10%"},
    布局骨架: "导航一条；主体两栏——左栏放主张（大标题 + 说明 + 三组数据），右栏 3 列标本网格，每格悬停时说明条自下升起",
    重色落点: "苔绿只给标题里被强调的三个字、标本剪影与悬停时的拉丁名；其余保持纸张与墨的两级关系",
    第一屏内容: "导航「北岭植物图鉴 / 标本 / 采集地 / 索引 / 关于」；左栏大标题「把一座山的植物压进四十六张标本纸」与三组数据；右栏六格标本（编号 + 悬停显示学名与海拔）",
    删减元素: "不做搜索框、不做筛选器、不做分页；同屏只有六格标本与一组数据，没有按钮",
    适用: "图鉴、档案、研究方法展示类页面；需要「用悬停讲信息」的陈列型首页",
    禁忌: "需要快速检索的海量数据页；电商类目；把标本做成写实照片（会失去「压出来」的纸感）",
    参考站: ["Linear"],
    我的说明: "原作的「大标题 + 特性条目网格」结构被保留，但把条目从产品功能换成标本档案：每格是一个物种，悬停时升起一行学名与海拔。网格密度、间距、圆角、字号全部走参数，说明条用 transform 升降，不靠弹窗。",
    Agent提示词: "【植物标本图鉴 · 设计语言宪法】\n效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。\n\n1. 视觉主题与氛围\n一张张压平的叶子按编号排开，纸是主角。氛围朴素、克制、有研究气；密度中、气质清瘦、情绪是「记录胜过美化」。\n\n2. 色彩板与角色\n- paper 标本纸 #F4F1E8 —— 主底，占 58%\n- moss 苔绿 #5C7A48 —— 标题强调、标本剪影、拉丁名，占 20%\n- ink 墨 #23281F —— 文字，占 14%\n- mute 标注灰 #8C8B7E —— 编号、采集地、数据标签，占 8%\n\n3. 字体规则\n- display：Georgia / Songti SC 衬线，2.6×基准字号，行高 1.24\n- body：0.86×基准字号，行高 1.85\n- meta：Consolas 等宽，11.5px，字距 .16em\n\n4. 组件规范\n- 标本格：3:4 比例、1px 描边、圆角由参数控制；左上角编号、底部悬停升起说明条（物种名 + 学名与海拔）\n- 导航：等宽小字，链接 hover 染苔绿\n- 无按钮：本页不设行动号召\n\n5. 布局法\n导航 1 行；主体两栏（左 1fr / 右 1.1fr）；网格 3 列、间距由「网格密度」参数换算；左栏数据用 1px 分隔线与说明分开。\n\n6. 深度与层级\n底 → 标本剪影（clip-path 叶形）→ 编号 → 悬停说明条。剪影只有形，不用图片；说明条靠 transform 升起，不使用阴影浮层。\n\n7. 该做 / 不该做\n该做：编号与学名自洽；悬停能被键盘 focus 触发；网格密度可调且不破版。\n不该做：加搜索框、加筛选器、贴实拍照片、把说明做成弹窗。\n\n8. 响应式行为\n断点 900px：改成单列（主张 → 网格），网格降为 2 列；触控目标 ≥44px；说明条在无悬停设备上改为常显。\n\n9. Agent 提示词指南\n配色卡：纸 #F4F1E8 / 苔绿 #5C7A48 / 墨 #23281F / 标注 #8C8B7E；字号卡：16 / 41.6 / 11.5。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，标本剪影用 clip-path 生成）。",
    演示页: "assets/demos/方案-植物标本图鉴.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>植物标本图鉴</title>
<style>
:root{
  --se:#F4F1E8;      /* 标本纸 */
  --lv:#5C7A48;      /* 苔绿 */
  --mo:#23281F;      /* 墨字 */
  --hui:#8C8B7E;     /* 标注 */
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:4px;
  --gebi:1;          /* 网格密度倍率 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--se);color:var(--mo);min-height:100vh;
  font-family:Georgia,"Songti SC",serif;display:flex;flex-direction:column}
nav{display:flex;gap:calc(var(--jianju)*1.2);align-items:center;
  padding:calc(var(--jianju)*1.1) calc(var(--jianju)*1.6);border-bottom:1px solid rgba(35,40,31,.14);
  font-family:Consolas,monospace;font-size:11.5px;letter-spacing:.16em}
nav b{margin-right:auto;font-family:Georgia,serif;font-size:calc(var(--zihao)*1.05);letter-spacing:.1em;font-weight:400}
nav a{color:var(--hui);text-decoration:none}
nav a:hover{color:var(--lv)}
main{flex:1;display:grid;grid-template-columns:minmax(300px,.9fr) 1.1fr;min-height:0}
.lede{padding:calc(var(--jianju)*2.2) calc(var(--jianju)*1.6);display:flex;flex-direction:column;gap:calc(var(--jianju)*1.1);justify-content:center}
h1{font-size:calc(var(--zihao)*2.6);line-height:1.24;letter-spacing:.01em}
h1 em{font-style:normal;color:var(--lv)}
.lede p{color:var(--hui);font-size:calc(var(--zihao)*.86);line-height:1.85;max-width:30em}
.meta{display:flex;gap:calc(var(--jianju)*1.4);padding-top:calc(var(--jianju)*.8);border-top:1px solid rgba(35,40,31,.14)}
.meta div{display:flex;flex-direction:column;gap:5px}
.meta b{font-family:Consolas,monospace;font-size:calc(var(--zihao)*1.05);font-weight:500}
.meta span{font-size:10.5px;color:var(--hui);letter-spacing:.16em}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--jianju)*.55/var(--gebi));
  padding:calc(var(--jianju)*1.4);border-left:1px solid rgba(35,40,31,.14);align-content:start}
.spec{position:relative;padding-bottom:132%;border:1px solid rgba(35,40,31,.2);border-radius:var(--yuanjiao);
  overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--lv) 12%,transparent),transparent 62%)}
.spec i{position:absolute;inset:auto 0 0 0;background:rgba(244,241,232,.94);border-top:1px solid rgba(35,40,31,.16);
  padding:8px 10px;transform:translateY(100%);transition:transform .28s;
  font-style:normal;font-size:11.5px;line-height:1.5}
.spec i span{display:block;font-family:Consolas,monospace;color:var(--lv);letter-spacing:.06em}
.spec b{position:absolute;top:10px;left:10px;font-family:Consolas,monospace;font-size:10.5px;color:var(--hui)}
.spec:hover i,.spec:focus-within i{transform:translateY(0)}
/* 标本轮廓：用 clip-path 做出叶形剪影，完全离线 */
.spec::after{content:"";position:absolute;left:50%;top:44%;width:46%;height:62%;transform:translate(-50%,-50%);
  background:color-mix(in srgb,var(--lv) 62%,transparent);
  clip-path:polygon(50% 0,68% 26%,66% 52%,86% 74%,58% 70%,50% 100%,42% 70%,14% 74%,34% 52%,32% 26%);
  opacity:.5}
.spec:nth-child(3n+2)::after{clip-path:polygon(50% 4%,72% 30%,58% 58%,74% 88%,50% 78%,26% 88%,42% 58%,28% 30%);background:color-mix(in srgb,var(--lv) 48%,transparent)}
.spec:nth-child(3n+3)::after{clip-path:ellipse(30% 48% at 50% 50%);background:color-mix(in srgb,var(--lv) 34%,transparent)}
@media (max-width:900px){main{grid-template-columns:1fr}.grid{grid-template-columns:repeat(2,1fr);border-left:none;border-top:1px solid rgba(35,40,31,.14)}}
</style>
</head>
<body>
<nav>
  <b>北岭植物图鉴</b>
  <a href="#">标本</a><a href="#">采集地</a><a href="#">索引</a><a href="#">关于</a>
</nav>
<main>
  <div class="lede">
    <h1>把一座山的植物<br>压进<em>四十六张</em>标本纸</h1>
    <p>每一份标本都记着采集地、海拔与日期。叶脉是被压出来的形状，不是画出来的——所以我们只标注，不美化。</p>
    <div class="meta">
      <div><b>46</b><span>标本份数</span></div>
      <div><b>1,240–2,860</b><span>海拔区间 M</span></div>
      <div><b>2019–2026</b><span>采集年份</span></div>
    </div>
  </div>
  <div class="grid" id="grid"></div>
</main>
<script>
var state = {
  se:'#F4F1E8', lv:'#5C7A48', mo:'#23281F', hui:'#8C8B7E',
  zihao:16, jianju:22, yuanjiao:4, gebi:1
};
var SPEC = [
  ['No.014','岩生铁线莲','Clematis rupestris · 海拔 2,140 m'],
  ['No.021','北岭报春','Primula beilingensis · 海拔 2,680 m'],
  ['No.029','绢毛忍冬','Lonicera sericea · 海拔 1,860 m'],
  ['No.033','狭叶龙胆','Gentiana angusta · 海拔 2,860 m'],
  ['No.038','苔状虎耳草','Saxifraga muscosa · 海拔 2,420 m'],
  ['No.046','北岭风毛菊','Saussurea beilingii · 海拔 2,260 m']
];
var grid=document.getElementById('grid');
grid.innerHTML=SPEC.map(function(s){
  return '<div class="spec" tabindex="0"><b>'+s[0]+'</b><i>'+s[1]+'<span>'+s[2]+'</span></i></div>';
}).join('');
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--se',state.se);r.setProperty('--lv',state.lv);
  r.setProperty('--mo',state.mo);r.setProperty('--hui',state.hui);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  r.setProperty('--gebi',state.gebi);
}
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
apply();
</script>
</body>
</html>
`,
    片段: "\n<header class=\"hero\">\n  <div class=\"hero-l\">\n    <h1>面向团队与<em>智能体</em>的产品开发系统</h1>\n    <p class=\"sub\">为规划与构建产品而生，为 AI 时代而设计。</p>\n    <div class=\"btns\"><button class=\"btn solid\">免费开始</button><button class=\"btn ghost\">看它怎么跑</button></div>\n  </div>\n  <div class=\"void\"></div>\n</header>",
    参数: [
    { 键: "se", 名: "标本纸色", 类型: "color", 默认: "#F4F1E8" },
    { 键: "lv", 名: "苔绿强调", 类型: "color", 默认: "#5C7A48" },
    { 键: "mo", 名: "墨字色", 类型: "color", 默认: "#23281F" },
    { 键: "hui", 名: "标注灰", 类型: "color", 默认: "#8C8B7E" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "栏内间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "卡片圆角", 类型: "slider", 默认: 4, 最小: 0, 最大: 16, 步长: 1 },
    { 键: "gebi", 名: "网格密度", 类型: "slider", 默认: 1, 最小: 0.6, 最大: 1.6, 步长: 0.05 }
  ],
    来源: "机制参考自 linear.app 官网（2026-09-19 分析）：定义型首屏的大标题 + 条目网格 + 逐条说明；已换题重推为「植物标本图鉴」，视觉表达全部重做，非复刻"
  },
  {
    id: "S21",
    风格名: "卡片错位",
    适配端: "PC 端",
    风格: "极简瑞士",
    场景: "作品集·叙事",
    骨架: "错位卡组",
    配色: {"页面底":"70%","卡片底":"22%","强调(错位首卡)":"8%"},
    布局骨架: "顶部窄导航 + 主张 H1 + 错位能力区（4 张 tile 按规律错开、标题各自对齐、首张强调）+ 页脚；错位只发生在能力区，其余保持克制",
    重色落点: "强调色只落在首张 tile 的边框与标题，其余 tile 用极淡底；重色压「第一张」形成视线落点",
    第一屏内容: "H1 一句主张 + 副文，下方紧接着错位能力区（先被错开的节奏吸引）",
    删减元素: "去平铺等宽卡片、去同权重罗列、去装饰色块，强制用位置差分出主次",
    适用: "工具 / SaaS 官网能力区、作品集、博客列表——任何「一组相似卡片」需要层次感的地方",
    禁忌: "一页多个无规律乱错位（那是乱不是层次）；错位幅度大到破坏阅读基线",
    参考站: ["抖音·五种高级审美布局","phuocng/csslayout"],
    我的说明: "卡片错位来自抖音·五种高级审美布局（视频概念：初始所有卡片左侧对齐、仅一条对齐轴→页面只有整齐无层次；调整后卡片按规律错开、各卡标题设独立对齐轴→层次立刻显现）。本方案把它落成可运行整页：错位发生在能力区，规律可选交错/阶梯/递进，首卡强调吸第一眼。与 M091 亲密性功能分组是兄弟手法——一个用间距分组、一个用位置错位，都治「模板感」。\n抖音来源（收藏夹，需登录）：https://www.douyin.com/user/self?modal_id=7680870950040426867&showTab=favorite_collection",
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
    来源: "来自于抖音"
  },
  {
    id: "S22",
    风格名: "黑胶唱片店",
    适配端: "PC 端",
    风格: "复古怀旧",
    场景: "电商·预订",
    骨架: "顶部导航 + 标题与本周精选徽章 + 唱片陈列网格（封面用径向渐变绘制）",
    配色: {"浅底(页面)":"60%","灰阶文本与分隔线":"30%","强调橙(徽章/CTA)":"10%"},
    布局骨架: "导航一条；标题区左右分置（左大标题 / 右徽章与说明）；主体为陈列网格，列数由参数控制，每张含封面、品名、厂牌年份与评分",
    重色落点: "芥末黄只给徽章、评分与 hover 描边；封面靠重复径向渐变做出唱片的同心圆纹理",
    第一屏内容: "导航「回针唱片 / 在售 / 厂牌 / 到店试听 / 关于」；大标题「每周挑六张，放上试听台」；「本周精选 · 09-19」徽章；六张唱片卡片（编号 + 品名 + 厂牌年份 + 评分）",
    删减元素: "不做价格、不做购物车、不做筛选排序；同屏只有六张唱片，没有按钮",
    适用: "二手唱片、独立书店、买手店等「编辑精选」型陈列页；需要每周更新的选品清单",
    禁忌: "需要按价格/销量排序的电商列表；内容量大的目录；贴真实封面图（版权与体积双输）",
    参考站: ["Awwwards"],
    我的说明: "原作「陈列网格 + 编辑精选徽章 + 评分」的信息结构保留，但把作品集换成唱片的选品清单：封面用同心径向渐变画出唱片外形，评分与徽章改由参数控制颜色，列数可调。整套零图片、零外链。",
    Agent提示词: "【黑胶唱片店 · 设计语言宪法】\n效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。\n\n1. 视觉主题与氛围\n店里只开一盏灯，唱片一列列排开。氛围暗、旧、有挑选的耐心；密度中、气质冷静、情绪是「今天翻哪一张」。\n\n2. 色彩板与角色\n- ink 店内暗色 #16161A —— 主底，占 58%\n- brass 芥末黄 #E2B33C —— 徽章、评分、hover 描边，占 16%\n- paper 纸白 #EDE9E0 —— 正文与封面纹理，占 18%\n- mute 标注灰 #7E7C74 —— 厂牌、年份、导航，占 8%\n\n3. 字体规则\n- display：Georgia / Songti SC，2.1×基准字号，行高 1.28\n- body：0.84×基准字号，行高 1.35\n- meta：Consolas 等宽，10.5–11px，字距 .2em\n\n4. 组件规范\n- 唱片卡：封面（径向渐变同心圆）+ 品名 + 厂牌年份 + 右下评分；hover 抬升 3px 并把描边染芥末黄\n- 精选徽章：胶囊形，芥末黄 1px 描边 + 同色文字\n- 无按钮：本页不设行动号召\n\n5. 布局法\n导航 1 行；标题区左右分置；陈列网格列数由参数控制、间距 20px 级；底部留白不小于一格高度。\n\n6. 深度与层级\n底 → 卡片描边 → 封面纹理 → 文字。深度靠 hover 位移与描边变色，不用投影堆叠。\n\n7. 该做 / 不该做\n该做：封面用纯 CSS 画唱片纹理；评分与徽章颜色同源；列数可调且不破版。\n不该做：贴真实封面图、加价格与购物车、加筛选排序、用暖色大面积填充。\n\n8. 响应式行为\n断点 900px：列数强制降为 2；触控目标 ≥44px；hover 位移在触屏改为按下态描边。\n\n9. Agent 提示词指南\n配色卡：底 #16161A / 芥末黄 #E2B33C / 纸白 #EDE9E0 / 标注 #7E7C74；字号卡：15 / 31.5 / 10.5。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，封面一律 CSS 渐变生成）。",
    演示页: "assets/demos/方案-黑胶唱片店.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>黑胶唱片店</title>
<style>
:root{
  --di:#16161A;      /* 店里只开一盏灯 */
  --huang:#E2B33C;   /* 芥末黄标签 */
  --zhi:#EDE9E0;     /* 纸面字色 */
  --hui:#7E7C74;     /* 标注 */
  --zihao:15px;
  --jianju:20px;
  --yuanjiao:3px;
  --lie:4;           /* 陈列列数 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--di);color:var(--zhi);min-height:100vh;font-family:-apple-system,"Segoe UI","PingFang SC",sans-serif;display:flex;flex-direction:column}
nav{display:flex;gap:calc(var(--jianju)*1.1);align-items:center;
  padding:calc(var(--jianju)*1.1) calc(var(--jianju)*1.5);border-bottom:1px solid rgba(237,233,224,.12);
  font-family:Consolas,monospace;font-size:11px;letter-spacing:.2em}
nav b{margin-right:auto;font-family:Georgia,serif;font-size:calc(var(--zihao)*1.15);letter-spacing:.14em;font-weight:400}
nav a{color:var(--hui);text-decoration:none}nav a:hover{color:var(--huang)}
.top{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;
  padding:calc(var(--jianju)*1.6) calc(var(--jianju)*1.5) calc(var(--jianju)*.9);flex-wrap:wrap}
h1{font-size:calc(var(--zihao)*2.1);line-height:1.28;letter-spacing:.02em;max-width:16em}
h1 em{font-style:normal;color:var(--huang)}
.top p{color:var(--hui);font-size:calc(var(--zihao)*.82);line-height:1.8;max-width:28em}
.badge{display:inline-flex;align-items:center;gap:8px;border:1px solid color-mix(in srgb,var(--huang) 62%,transparent);
  color:var(--huang);border-radius:99px;padding:6px 13px;font-family:Consolas,monospace;font-size:10.5px;letter-spacing:.18em}
.shelf{flex:1;display:grid;grid-template-columns:repeat(var(--lie),1fr);
  gap:calc(var(--jianju)*.9);padding:0 calc(var(--jianju)*1.5) calc(var(--jianju)*1.5);align-content:start}
.rec{border:1px solid rgba(237,233,224,.14);border-radius:var(--yuanjiao);overflow:hidden;
  background:rgba(255,255,255,.02);transition:border-color .2s,transform .2s;position:relative}
.rec:hover{border-color:color-mix(in srgb,var(--huang) 55%,transparent);transform:translateY(-3px)}
/* 封面：用 CSS 圆环叠出唱片外形，零外链 */
.cov{position:relative;padding-bottom:100%;
  background:radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--zhi) 12%,transparent) 0 8%,
    color-mix(in srgb,var(--hui) 26%,transparent) 8.5% 12%,transparent 12.5%),
    repeating-radial-gradient(circle at 50% 50%,rgba(237,233,224,.07) 0 1px,transparent 1px 4px),
    linear-gradient(150deg,color-mix(in srgb,var(--huang) 16%,transparent),transparent 70%)}
.cov b{position:absolute;left:10px;top:9px;font-family:Consolas,monospace;font-size:10px;color:var(--hui);letter-spacing:.1em}
.rec dl{padding:11px 12px 13px;display:grid;gap:5px}
.rec dt{font-size:calc(var(--zihao)*.84);line-height:1.35}
.rec dd{font-family:Consolas,monospace;font-size:10.5px;color:var(--hui);letter-spacing:.05em}
.rec .sc{position:absolute;right:10px;bottom:10px;font-family:Consolas,monospace;font-size:11px;color:var(--huang)}
@media (max-width:900px){:root{--lie:2}}
</style>
</head>
<body>
<nav>
  <b>回针唱片</b>
  <a href="#">在售</a><a href="#">厂牌</a><a href="#">到店试听</a><a href="#">关于</a>
</nav>
<div class="top">
  <h1>每周挑六张，<br>放上<em>试听台</em></h1>
  <div>
    <span class="badge">本周精选 · 09-19</span>
    <p style="margin-top:12px">只卖二手原版，品相按唱片协会标准分级。清单每周五更新，售出即下架。</p>
  </div>
</div>
<div class="shelf" id="shelf"></div>
<script>
var state = {
  di:'#16161A', huang:'#E2B33C', zhi:'#EDE9E0', hui:'#7E7C74',
  zihao:15, jianju:20, yuanjiao:3, lie:4
};
var RECS = [
  ['SR-0142','《冬眠》原声','厂牌 A24 · 2019 · 双张',92],
  ['SR-0155','城市夜行','厂牌 Ninja · 2016 · 单张',88],
  ['SR-0161','海岸线','厂牌 4AD · 2013 · 单张',90],
  ['SR-0178','木与电','厂牌 Erased · 2021 · 双张',86],
  ['SR-0184','第七个夏天','厂牌 Sub Pop · 2008 · 单张',84],
  ['SR-0190','静默频率','厂牌 Kranky · 2018 · 单张',89]
];
document.getElementById('shelf').innerHTML = RECS.map(function(r){
  return '<div class="rec"><div class="cov"><b>'+r[0]+'</b></div><dl><dt>'+r[1]+'</dt><dd>'+r[2]+'</dd></dl><span class="sc">'+r[3]+'</span></div>';
}).join('');
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--huang',state.huang);
  r.setProperty('--zhi',state.zhi);r.setProperty('--hui',state.hui);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  r.setProperty('--lie',Math.max(1,Math.round(state.lie)));
}
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
apply();
</script>
</body>
</html>
`,
    片段: "\n<div class=\"info\">\n  <div>\n    <h1>Studio Nine - Portfolio 2026</h1>\n    <div class=\"sub\">第二焦点 · 评分 7.69 / 10，其余信息全部灰阶退让</div>\n  </div>\n  <div class=\"badge\">7.69 / 10</div>\n</div>",
    参数: [
    { 键: "di", 名: "店内底色", 类型: "color", 默认: "#16161A" },
    { 键: "huang", 名: "芥末黄", 类型: "color", 默认: "#E2B33C" },
    { 键: "zhi", 名: "纸白色", 类型: "color", 默认: "#EDE9E0" },
    { 键: "hui", 名: "标注灰", 类型: "color", 默认: "#7E7C74" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 15, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "网格间距", 类型: "slider", 默认: 20, 最小: 10, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "卡片圆角", 类型: "slider", 默认: 3, 最小: 0, 最大: 16, 步长: 1 },
    { 键: "lie", 名: "陈列列数", 类型: "slider", 默认: 4, 最小: 1, 最大: 6, 步长: 1 }
  ],
    来源: "机制参考自 awwwards.com 陈列型官网（2026-09-19 分析）：作品陈列网格 + 编辑精选徽章 + 评分角标；已换题重推为「黑胶唱片店」，视觉表达全部重做，非复刻"
  },
  {
    id: "S23",
    风格名: "考古档案库",
    适配端: "通用",
    风格: "极简瑞士",
    场景: "内容·阅读",
    骨架: "竖排层位索引（左）+ 圆形揭示视窗（中）+ 探方网格与比例尺叠加",
    配色: {
      "暗底(画布)": "60%",
      "亮色文字与锥光": "30%",
      "暖色强调(CTA/揭示层)": "10%"
    },
    布局骨架: "双栏：左 132px 竖排层位索引 / 右视窗占满；视窗内叠加探方方格网 + 左上档案铭牌 + 左下比例尺；底部横条承载标题、说明与唯一 CTA",
    重色落点: "沙金只出现在「被揭示的出土层」与唯一一枚 CTA 上；揭示光圈外的区域一律压回土色，形成「发掘灯」的唯一光源",
    第一屏内容: "左上 EXC 编号与探方坐标；中心一圈暖色光孔，孔内可见陶器轮廓与探方隔梁；底部「探方 T4 · 第三层」与「查看发掘记录」",
    删减元素: "不做地图、不做时间轴、不加第二屏、同屏只有一个实心按钮；不上彩色照片、不加投影堆叠",
    适用: "文博、考古、档案、研究机构的成果展示页；需要「一束光揭开某物」叙事的发布页",
    禁忌: "内容密集的后台；需要同时展示多件藏品的电商列表；没有可揭示的主体时硬套（会退化成普通暗色首屏）",
    参考站: [
      "motionsites.ai"
    ],
    我的说明: "这套的骨架是「一束光 + 一份档案」。揭示光圈由光标位置驱动、空闲时自动巡游；层位索引切的是文案而非画面，让同一束光可以讲三层故事。底层图像全部由 canvas 离线合成，不引用任何远程素材。",
    Agent提示词: `【考古档案库 · 设计语言宪法】
效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。

1. 视觉主题与氛围
一束发掘灯照在土面上，其余地方保持暗。氛围是克制的、有尘土的、带档案感的；密度低、气质冷静、情绪是「正在被揭开的等待」。

2. 色彩板与角色
- base 未发掘土色 #3D3830 —— 画面主底，占 48%
- sand 出土沙金 #C08A3E —— 仅用于被揭示层与 CTA，占 22%
- ink 铭牌字色 #EFE7D8 —— 正文与标题，占 24%
- mute 次要标注 #9C927F —— 编号、比例尺、说明，占 6%
禁止使用冷色系强调；沙金不得铺满画面。

3. 字体规则
- display：Georgia / Songti SC，衬线，主标题 2.1×基准字号，字距 .02em
- body：同族，基准字号 17px，行高 1.7
- meta：Consolas 等宽，11px，字距 .16em，全部大写

4. 组件规范
- CTA：实心沙金底 + 深褐字，圆角 = 参数圆角，仅一枚
- 层位按钮：竖排书写（writing-mode: vertical-rl），选中态为沙金色文字 + 沙金描边
- 铭牌 / 比例尺：等宽小字，无双线框

5. 布局法
间距刻度 20/24/32；双栏（左侧 132px 索引栏 + 右侧视窗）；视窗内绝对定位叠加：铭牌（左上）、比例尺（左下）、揭示光圈（跟随光标）。

6. 深度与层级
z0 未发掘层 → z1 揭示层（遮罩） → z5 探方网格 → z6 光圈描边 → z7 铭牌与比例尺。层级靠亮度与遮罩表达，不靠投影。

7. 该做 / 不该做
该做：把唯一的光源交给光标；让索引切换只改文案不改画面；比例尺与编号必须真实可读。
不该做：加第二屏、加卡片阵、给土面加投影、用彩色照片替代 canvas 合成。

8. 响应式行为
断点 760px：索引栏折叠隐藏，视窗与底部横条改为单列；触控目标 ≥44px；揭示光圈在触屏上改为自动巡游（无指针）。

9. Agent 提示词指南
配色参考卡：底 #3D3830 / 强调 #C08A3E / 正文 #EFE7D8 / 标注 #9C927F；字号卡：17 / 35.7 / 11。请把内容套进上述设计语言，输出完整、可直接打开的单文件 HTML（零外链，图形一律 canvas 生成）。`,
    演示页: "assets/demos/方案-考古档案库.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>考古档案库</title>
<style>
:root{
  --dimian:#2A2620;      /* 探方底土 */
  --ceng:#3D3830;        /* 未发掘层 */
  --zhucai:#C08A3E;      /* 出土沙金 */
  --zi:#EFE7D8;          /* 铭牌字色 */
  --ci:#9C927F;          /* 次要标注色 */
  --banjing:240px;       /* 揭示光圈半径 */
  --wang:44px;           /* 探方网格 */
  --zihao:17px;          /* 基准字号 */
  --yuanjiao:10px;       /* 卡片圆角 */
  --mx:50%; --my:52%;    /* 光圈位置（光标/自动漂移驱动） */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  background:var(--dimian);color:var(--zi);
  font-family:Georgia,"Times New Roman","Songti SC",serif;
  display:grid;grid-template-columns:132px 1fr;grid-template-rows:1fr auto;
  grid-template-areas:"ledger viewer" "ledger readout";
  min-height:100vh;overflow:hidden;
}
/* 探方网格：考古现场的方形探方与比例尺（离线 CSS 生成，无外链） */
.viewer::before{
  content:"";position:absolute;inset:0;pointer-events:none;z-index:5;
  background:
    repeating-linear-gradient(0deg,rgba(239,231,216,.07) 0 1px,transparent 1px var(--wang)),
    repeating-linear-gradient(90deg,rgba(239,231,216,.07) 0 1px,transparent 1px var(--wang));
}
/* 层位索引：竖排按钮，切换「第几层」的说明文本 */
.ledger{
  grid-area:ledger;border-right:1px solid rgba(239,231,216,.12);
  padding:26px 0;display:flex;flex-direction:column;gap:18px;align-items:center;
}
.ledger .cap{font-family:Consolas,monospace;font-size:10.5px;letter-spacing:.22em;color:var(--ci);writing-mode:vertical-rl}
.lv{
  writing-mode:vertical-rl;background:none;border:1px solid transparent;color:var(--ci);
  font-family:Consolas,monospace;font-size:11.5px;letter-spacing:.18em;padding:12px 6px;cursor:pointer;
  border-radius:calc(var(--yuanjiao)*.4);transition:color .2s,border-color .2s;
}
.lv.on{color:var(--zhucai);border-color:color-mix(in srgb,var(--zhucai) 45%,transparent)}
.viewer{grid-area:viewer;position:relative;overflow:hidden}
.layer{position:absolute;inset:0;background-size:cover;background-position:center}
.reveal{
  /* 揭示层：光圈由 --mx/--my/--banjing 驱动，这就是「探索发现」的机制本身 */
  -webkit-mask-image:radial-gradient(circle var(--banjing) at var(--mx) var(--my),#000 52%,transparent 100%);
  mask-image:radial-gradient(circle var(--banjing) at var(--mx) var(--my),#000 52%,transparent 100%);
}
.aperture{
  position:absolute;width:calc(var(--banjing)*2);height:calc(var(--banjing)*2);
  left:var(--mx);top:var(--my);transform:translate(-50%,-50%);
  border:1px solid color-mix(in srgb,var(--zhucai) 55%,transparent);border-radius:50%;
  box-shadow:0 0 0 1px rgba(0,0,0,.35) inset;pointer-events:none;z-index:6;
}
.scale{position:absolute;left:22px;bottom:20px;z-index:7;font-family:Consolas,monospace;font-size:11px;color:var(--ci);letter-spacing:.1em}
.scale i{display:inline-block;width:88px;height:7px;border-left:1px solid var(--ci);border-right:1px solid var(--ci);border-bottom:1px solid var(--ci);vertical-align:-1px;margin:0 8px}
.plate{position:absolute;top:22px;left:22px;z-index:7;font-family:Consolas,monospace;font-size:11px;letter-spacing:.16em;color:var(--ci)}
.plate b{display:block;color:var(--zhucai);font-weight:400;margin-top:4px}
.readout{
  grid-area:readout;border-top:1px solid rgba(239,231,216,.12);padding:26px 34px 30px;
  display:grid;grid-template-columns:1fr auto;align-items:end;gap:20px;
}
h1{font-size:calc(var(--zihao)*2.1);font-weight:400;letter-spacing:.02em}
.readout p{margin-top:8px;color:var(--ci);font-size:calc(var(--zihao)*.82);letter-spacing:.04em}
#cta{
  background:var(--zhucai);color:#241C12;border:none;border-radius:var(--yuanjiao);
  padding:12px 22px;font-size:calc(var(--zihao)*.82);font-family:inherit;cursor:pointer;
}
@media (max-width:760px){
  body{grid-template-columns:1fr;grid-template-areas:"viewer" "readout"}
  .ledger{display:none}
  .readout{grid-template-columns:1fr}
}
</style>
</head>
<body>
<div class="ledger">
  <span class="cap">STRATUM</span>
  <button class="lv on" data-lv="0">第三层</button>
  <button class="lv" data-lv="1">第二层</button>
  <button class="lv" data-lv="2">第一层</button>
</div>

<div class="viewer">
  <div class="layer base" id="base"></div>
  <div class="layer reveal" id="reveal"></div>
  <div class="aperture"></div>
  <div class="plate">EXC-2026-0412<b>T4 · 东壁</b></div>
  <div class="scale">比例尺<i></i>10 cm</div>
</div>

<div class="readout">
  <div>
    <h1 id="t1">探方 T4 · 第三层</h1>
    <p id="t2">编号 12-B · 灰陶残片，出土于东壁灰坑，胎质夹砂</p>
  </div>
  <button id="cta">查看发掘记录</button>
</div>

<script>
var state = {
  dimian:'#2A2620', ceng:'#3D3830', zhucai:'#C08A3E', zi:'#EFE7D8',
  banjing:240, wang:44, zihao:17, yuanjiao:10,
  t1:'探方 T4 · 第三层', t2:'编号 12-B · 灰陶残片，出土于东壁灰坑，胎质夹砂'
};
var LAYERS = [
  ['探方 T4 · 第三层','编号 12-B · 灰陶残片，出土于东壁灰坑，胎质夹砂'],
  ['探方 T4 · 第二层','编号 08-A · 绳纹灰陶罐口沿，伴出炭屑与烧土块'],
  ['探方 T4 · 第一层','编号 03-C · 近现代扰动层，含青花瓷片与砖瓦碎块']
];

var baseEl = document.getElementById('base');
var revealEl = document.getElementById('reveal');
var t1 = document.getElementById('t1'), t2 = document.getElementById('t2'), cta = document.getElementById('cta');

/* 离线合成两层底图：土色渐变 + 探方轮廓，不依赖任何远程链接（规矩11） */
function genImage(from, to, relic){
  var w=1280,h=720,cv=document.createElement('canvas');cv.width=w;cv.height=h;
  var g=cv.getContext('2d');
  var grd=g.createLinearGradient(0,0,w,h);grd.addColorStop(0,from);grd.addColorStop(1,to);
  g.fillStyle=grd;g.fillRect(0,0,w,h);
  if(relic){
    /* 出土层：画出器物轮廓与探方隔梁，作为「被揭示的东西」 */
    g.strokeStyle='rgba(36,28,18,.55)';g.lineWidth=3;
    for(var i=0;i<7;i++){
      var cx=140+i*160, cy=430+Math.sin(i)*46;
      g.beginPath();g.ellipse(cx,cy,52,66,0,Math.PI,0);g.stroke();
      g.beginPath();g.ellipse(cx,cy-66,30,12,0,0,Math.PI*2);g.stroke();
    }
    g.strokeStyle='rgba(36,28,18,.28)';g.lineWidth=2;
    for(var k=0;k<5;k++){g.beginPath();g.moveTo(0,150+k*130);g.lineTo(w,150+k*130);g.stroke();}
  }else{
    /* 未发掘层：夯土颗粒 */
    for(var d=0;d<2400;d++){
      var x=Math.random()*w,y=Math.random()*h,r=Math.random()*2.2+.4;
      g.beginPath();g.arc(x,y,r,0,Math.PI*2);
      g.fillStyle='rgba(255,240,214,'+(Math.random()*.07+.02).toFixed(3)+')';g.fill();
    }
  }
  return cv.toDataURL();
}

function apply(){
  var r=document.documentElement.style;
  /* 长度型变量一律自带 px，避免 CSS 侧静默塌 0 */
  r.setProperty('--dimian',state.dimian);
  r.setProperty('--ceng',state.ceng);
  r.setProperty('--zhucai',state.zhucai);
  r.setProperty('--zi',state.zi);
  r.setProperty('--banjing',state.banjing+'px');
  r.setProperty('--wang',state.wang+'px');
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  baseEl.style.backgroundImage='url('+genImage(state.ceng,shade(state.ceng,-26),false)+')';
  revealEl.style.backgroundImage='url('+genImage(state.zhucai,shade(state.zhucai,-40),true)+')';
  t1.textContent=state.t1;t2.textContent=state.t2;
}

function shade(hex,d){
  var v=parseInt(hex.replace('#',''),16);
  var c=[(v>>16)&255,(v>>8)&255,v&255].map(function(x){return Math.max(0,Math.min(255,x+d));});
  return '#'+c.map(function(x){return ('0'+x.toString(16)).slice(-2);}).join('');
}

/* 光圈状态机：光标驱动 + 空闲时自动巡游（headless 截图不依赖鼠标） */
var target={x:.5,y:.52}, now={x:.5,y:.52}, idleAt=0;
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelector('.viewer').addEventListener('pointermove',function(e){
  var b=this.getBoundingClientRect();
  target.x=(e.clientX-b.left)/b.width; target.y=(e.clientY-b.top)/b.height; idleAt=performance.now();
});
function loop(ts){
  if(!idleAt||ts-idleAt>1400){
    target.x=.5+Math.cos(ts/5200)*.24; target.y=.52+Math.sin(ts/4100)*.15;
  }
  var k=reduce?1:.055;
  now.x+=(target.x-now.x)*k; now.y+=(target.y-now.y)*k;
  var r=document.documentElement.style;
  r.setProperty('--mx',(now.x*100).toFixed(2)+'%');
  r.setProperty('--my',(now.y*100).toFixed(2)+'%');
  requestAnimationFrame(loop);
}
document.querySelectorAll('.lv').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.lv').forEach(function(x){x.classList.remove('on');});
    b.classList.add('on');
    var L=LAYERS[+b.dataset.lv]; state.t1=L[0]; state.t2=L[1]; apply();
  });
});
addEventListener('message',function(e){
  var d=e.data; if(!d||d.type!=='param'||!(d.key in state))return;
  state[d.key]=d.value;
  if(d.key==='t1'||d.key==='t2')return;
  apply();
});
apply();
if(!reduce) requestAnimationFrame(loop);
</script>
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
    { 键: "dimian", 名: "探方底土", 类型: "color", 默认: "#2A2620" },
    { 键: "ceng", 名: "未发掘层色", 类型: "color", 默认: "#3D3830" },
    { 键: "zhucai", 名: "出土沙金", 类型: "color", 默认: "#C08A3E" },
    { 键: "zi", 名: "铭牌字色", 类型: "color", 默认: "#EFE7D8" },
    { 键: "banjing", 名: "揭示半径(px)", 类型: "slider", 默认: 240, 最小: 80, 最大: 420, 步长: 4 },
    { 键: "wang", 名: "探方网格(px)", 类型: "slider", 默认: 44, 最小: 20, 最大: 96, 步长: 2 },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 17, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "yuanjiao", 名: "卡片圆角", 类型: "slider", 默认: 10, 最小: 0, 最大: 28, 步长: 1 },
    { 键: "t1", 名: "主标题文本", 类型: "text", 默认: '探方 T4 · 第三层' },
    { 键: "t2", 名: "副标题文本", 类型: "text", 默认: '编号 12-B · 灰陶残片，出土于东壁灰坑，胎质夹砂' }
  ],
    来源: "机制参考自 motionsites.ai nival-cyberspace（ConSentinel 演示页，2026-09-19 分析）：光标驱动的圆形揭示遮罩 + 双图层切换；已换题重推为「考古档案库」，视觉表达全部重做，非复刻"
  },
  {
    id: "S24",
    风格名: "深海观测站",
    适配端: "通用",
    风格: "科技未来",
    场景: "后台·数据看板",
    骨架: "竖排深度刻度（左）+ 水层波带与颗粒场（中）+ 数据面板（右）+ 回传页脚",
    配色: {
      "纯黑(画布)": "70%",
      "白/银灰(文字与波光)": "22%",
      "玻璃白(按钮/徽标)": "8%"
    },
    布局骨架: "三栏：88px 深度刻度 / 自适应舞台 / 250px 数据面板；舞台内 canvas 画出多条同轮廓曲线叠加的亮带，页脚横跨右两栏",
    重色落点: "声呐青只用于亮带与该面板里的数字；面板其余部分压到低饱和，让亮带成为画面唯一光源",
    第一屏内容: "左上标题「温跃层以下的安静世界」与站号；中央一条自左向右流动的亮带；右侧五项读数（盐度 / 水温 / 深度 / 阵列 / 链路）",
    删减元素: "不做地图、不做仪表盘网格、不加第二屏、同屏只有一个实心按钮；不加粒子以外的装饰",
    适用: "海洋、气象、能源等需要「沉稳数据感」的机构首页；强调持续在线与实时回传的产品页",
    禁忌: "促销型落地页；需要强行动号召的转化页；把亮带当成普通渐变条（会失去水体体积感）",
    参考站: [
      "motionsites.ai（Agent Wave / Vesper.ai）"
    ],
    我的说明: "机制保留原作「多条同轮廓曲线叠加成亮带」的做法，但把水体亮度交给正弦叠加本身，不用图片；颗粒场代表悬浮物，参数可调颗粒数量与流速。数据面板的数字与深度刻度联动，方便演示「调参即改读数」。",
    Agent提示词: `【深海观测站 · 设计语言宪法】
效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。

1. 视觉主题与氛围
水面以下两千四百米：没有波浪，只有缓慢流动的水层与悬浮物。氛围安静、精密、有体积感；密度低、气质冷静、情绪是「持续在线」。

2. 色彩板与角色
- sea 深海底色 #04222B —— 主底，占 52%
- layer 水层色 #0A3A45 —— 水体过渡，占 20%
- sonar 声呐青 #5FE3D0 —— 亮带与数字，占 16%
- text 正文 #DCEFEA / mute 标注 #6E8E92 —— 占 12%
亮带之外不得出现大面积高明度色。

3. 字体规则
- display：无衬线 600 字重，2.4×基准字号，行高 1.25
- body：基准字号 16px，行高 1.7
- data：Consolas 等宽，0.76×基准字号，字距 .04em

4. 组件规范
- CTA：声呐青实心 + 深色字，圆角 = 参数圆角
- 数据行：两列（等宽数值 + 灰色标签），无边框、无卡片
- 刻度栏：竖排 writing-mode，1px 刻度线与 34px 节距

5. 布局法
三栏（88 / auto / 250）；栏间用 1px 低透明描边分隔，不用背景块；页脚与数据面板共用右边框。

6. 深度与层级
z0 底色 → z1 canvas 亮带 → z2 颗粒 → z3 标题与面板文字。水体体积感靠「亮带下方的压暗渐变」表达，不用阴影。

7. 该做 / 不该做
该做：让亮带成为唯一光源；数值随参数真实变化；刻度与单位必须可读。
不该做：加插画、加卡片阵、把亮带做成静态渐变图片、使用暖色强调。

8. 响应式行为
断点 860px：隐藏刻度栏与数据面板，只保留舞台与页脚；触控目标 ≥44px；颗粒数在窄屏降到参数值的 60% 以免卡顿。

9. Agent 提示词指南
配色卡：底 #04222B / 水层 #0A3A45 / 强调 #5FE3D0 / 文字 #DCEFEA；字号卡：16 / 38.4 / 12.2。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，波带与颗粒一律 canvas 生成）。`,
    演示页: "assets/demos/方案-深海观测站.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>深海观测站</title>
<style>
:root{
  --hais:#04222B;        /* 深海底色 */
  --cengs:#0A3A45;       /* 水层色 */
  --boxian:#5FE3D0;      /* 声呐青 */
  --zi:#DCEFEA;          /* 正文 */
  --ci:#6E8E92;          /* 标注 */
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:6px;
  --bosu:1;
  --cengshu:46;
  --keli:220;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  background:var(--hais);color:var(--zi);overflow:hidden;
  font-family:-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  display:grid;grid-template-columns:88px 1fr 250px;grid-template-rows:1fr auto;
  grid-template-areas:"depth stage panel" "depth stage foot";
  min-height:100vh;
}
/* 深度刻度：竖排标尺，读数随参数联动 */
.depth{grid-area:depth;border-right:1px solid rgba(95,227,208,.16);padding:22px 0;display:flex;flex-direction:column;align-items:center;gap:16px}
.depth .cap{writing-mode:vertical-rl;font-family:Consolas,monospace;font-size:10px;letter-spacing:.24em;color:var(--ci)}
.depth .tick{flex:1;width:9px;background:repeating-linear-gradient(180deg,rgba(95,227,208,.5) 0 1px,transparent 1px 34px);position:relative}
.depth .val{writing-mode:vertical-rl;font-family:Consolas,monospace;font-size:12.5px;color:var(--boxian);letter-spacing:.06em}
.stage{grid-area:stage;position:relative;overflow:hidden}
#wave,#mote{position:absolute;inset:0;width:100%;height:100%}
/* 波带下方压暗，做出水体体积感 */
.stage::after{content:"";position:absolute;left:0;right:0;bottom:0;height:46%;pointer-events:none;
  background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--hais) 88%,transparent))}
h1{position:absolute;left:calc(var(--jianju)*1.6);top:calc(var(--jianju)*1.4);z-index:3;
  font-size:calc(var(--zihao)*2.4);font-weight:600;letter-spacing:.02em;line-height:1.25}
h1 small{display:block;margin-top:10px;font-size:calc(var(--zihao)*.8);font-weight:400;color:var(--ci);letter-spacing:.08em}
.panel{grid-area:panel;border-left:1px solid rgba(95,227,208,.16);padding:calc(var(--jianju)*1.2) calc(var(--jianju)*1.1);display:flex;flex-direction:column;gap:14px}
.row{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:baseline;font-size:calc(var(--zihao)*.76)}
.row b{font-family:Consolas,monospace;color:var(--boxian);font-weight:400;letter-spacing:.04em}
.row span{color:var(--ci)}
.foot{grid-area:foot;border-left:1px solid rgba(95,227,208,.16);border-top:1px solid rgba(95,227,208,.16);
  padding:calc(var(--jianju)*.9) calc(var(--jianju)*1.1);display:flex;align-items:center;justify-content:space-between;gap:12px}
.foot em{font-style:normal;font-family:Consolas,monospace;font-size:11px;color:var(--ci);letter-spacing:.06em;white-space:nowrap}
#cta{background:var(--boxian);color:#032028;border:none;border-radius:var(--yuanjiao);
  padding:11px 18px;font-size:calc(var(--zihao)*.78);font-weight:600;cursor:pointer;font-family:inherit}
@media (max-width:860px){
  body{grid-template-columns:1fr;grid-template-rows:1fr auto;grid-template-areas:"stage" "foot"}
  .depth,.panel{display:none}
}
</style>
</head>
<body>
<div class="depth">
  <span class="cap">DEPTH m</span>
  <span class="val" id="depthVal">-2,480</span>
  <span class="tick"></span>
</div>

<div class="stage">
  <canvas id="wave"></canvas>
  <canvas id="mote"></canvas>
  <h1 id="h1">温跃层以下的<br>安静世界<small id="sub">观测站 D-07 · 声呐阵列在线</small></h1>
</div>

<div class="panel">
  <div class="row"><b id="v1">34.72</b><span>盐度 PSU</span></div>
  <div class="row"><b id="v2">2.4°C</b><span>水温</span></div>
  <div class="row"><b id="v3">-2,480 m</b><span>当前深度</span></div>
  <div class="row"><b id="v4">04</b><span>声呐阵列</span></div>
  <div class="row"><b id="v5">在线</b><span>数据链路</span></div>
</div>

<div class="foot">
  <em id="est">回传间隔 90 s</em>
  <button id="cta">查看剖面数据</button>
</div>

<script>
var state = {
  hais:'#04222B', cengs:'#0A3A45', boxian:'#5FE3D0', zi:'#DCEFEA',
  bosu:1, cengshu:46, keli:220, zihao:16, jianju:22, yuanjiao:6,
  shendu:-2480, h1:'温跃层以下的<br>安静世界', sub:'观测站 D-07 · 声呐阵列在线'
};

var wave = document.getElementById('wave'), mote = document.getElementById('mote');
var wctx = wave.getContext('2d'), mctx = mote.getContext('2d');
var W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);
var motes=[], seededKeli=0;

function rgb(h){var v=parseInt(String(h).replace('#',''),16);return [(v>>16)&255,(v>>8)&255,v&255];}
function shade(h,d){var c=rgb(h).map(function(x){return Math.max(0,Math.min(255,x+d));});return '#'+c.map(function(x){return ('0'+x.toString(16)).slice(-2);}).join('');}

function resize(){
  W=window.innerWidth;H=window.innerHeight;
  [wave,mote].forEach(function(c){
    c.width=Math.round(W*DPR);c.height=Math.round(H*DPR);
    c.style.width=W+'px';c.style.height=H+'px';
    c.getContext('2d').setTransform(DPR,0,0,DPR,0,0);
  });
  seedMotes();
}
function seedMotes(){
  motes=[];
  for(var i=0;i<state.keli;i++){
    motes.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+.25,
      a:Math.random()*.5+.1,p:Math.random()*Math.PI*2,s:Math.random()*.9+.25});
  }
  seededKeli=state.keli;
}
function resizeMotes(){
  /* 颗粒数可调：不够就补，多了就截断，避免整体重建导致的闪烁 */
  var n=state.keli;
  while(motes.length<n) motes.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+.25,
    a:Math.random()*.5+.1,p:Math.random()*Math.PI*2,s:Math.random()*.9+.25});
  if(motes.length>n) motes.length=n;
}

/* 水层轮廓：三个不同频率的正弦叠加 → 同轮廓多条细线 → 叠加成「声呐亮带」 */
function yAt(x,off){
  return H*.62
    + Math.sin(x*.0022 + off*.02 + t*.5)*H*.12
    + Math.sin(x*.0048 - off*.012 - t*.72)*H*.045
    + Math.sin(x*.0009 + t*.28)*H*.065
    + off;
}
var t=0,last=0;
function draw(now){
  var dt=Math.min(.05,(now-last)/1000||.016);last=now;
  t+=dt*state.bosu;
  var c=wctx,C=rgb(state.boxian);
  c.clearRect(0,0,W,H);
  c.globalCompositeOperation='lighter';
  var n=Math.max(8,Math.round(state.cengshu));
  for(var i=0;i<n;i++){
    var k=i/(n-1), off=(k-.5)*H*.28;
    var a=Math.pow(Math.cos((k-.5)*Math.PI),2.2);
    c.beginPath();
    for(var x=-40;x<=W+40;x+=14){
      var y=yAt(x,off);
      if(x===-40)c.moveTo(x,y);else c.lineTo(x,y);
    }
    c.strokeStyle='rgba('+C[0]+','+C[1]+','+C[2]+','+(.035+.4*a).toFixed(3)+')';
    c.lineWidth=7+18*a;
    c.stroke();
  }
  /* 颗粒场：深海中缓慢下沉的悬浮物 */
  mctx.clearRect(0,0,W,H);
  for(var j=0;j<motes.length;j++){
    var m=motes[j];
    m.y-=m.s*.18*state.bosu; m.p+=.014;
    if(m.y<-6){m.y=H+6;m.x=Math.random()*W;}
    var al=(m.a*(.6+.4*Math.sin(m.p)));
    mctx.beginPath();mctx.arc(m.x,m.y,m.r,0,Math.PI*2);
    mctx.fillStyle='rgba('+C[0]+','+C[1]+','+C[2]+','+al.toFixed(3)+')';mctx.fill();
  }
  requestAnimationFrame(draw);
}

function apply(){
  var r=document.documentElement.style;
  /* 长度型变量自带 px；纯数值（bosu）不加单位 */
  r.setProperty('--hais',state.hais);
  r.setProperty('--cengs',state.cengs);
  r.setProperty('--boxian',state.boxian);
  r.setProperty('--zi',state.zi);
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  document.getElementById('h1').innerHTML=state.h1+'<small>'+state.sub+'</small>';
  var d=Math.round(state.shendu);
  document.getElementById('depthVal').textContent='-'+Math.abs(d).toLocaleString('en-US');
  document.getElementById('v3').textContent='-'+Math.abs(d).toLocaleString('en-US')+' m';
  document.getElementById('v1').textContent=(34.72+Math.abs(d)/100000*3).toFixed(2);
  if(Math.round(state.keli)!==seededKeli) resizeMotes();
}
var rt; addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(resize,120);});
addEventListener('message',function(e){
  var d=e.data; if(!d||d.type!=='param'||!(d.key in state))return;
  state[d.key]=d.value; apply();
});
resize();
apply();
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce){ draw(0); } else { requestAnimationFrame(draw); }
</script>
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
    { 键: "hais", 名: "深海底色", 类型: "color", 默认: "#04222B" },
    { 键: "cengs", 名: "水层色", 类型: "color", 默认: "#0A3A45" },
    { 键: "boxian", 名: "声呐青", 类型: "color", 默认: "#5FE3D0" },
    { 键: "zi", 名: "正文字色", 类型: "color", 默认: "#DCEFEA" },
    { 键: "bosu", 名: "流动速度", 类型: "slider", 默认: 1, 最小: 0, 最大: 3, 步长: 0.05 },
    { 键: "cengshu", 名: "水层条数", 类型: "slider", 默认: 46, 最小: 10, 最大: 80, 步长: 1 },
    { 键: "keli", 名: "悬浮颗粒数", 类型: "slider", 默认: 220, 最小: 40, 最大: 500, 步长: 10 },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "面板间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 36, 步长: 1 },
    { 键: "yuanjiao", 名: "按钮圆角", 类型: "slider", 默认: 6, 最小: 0, 最大: 20, 步长: 1 },
    { 键: "shendu", 名: "观测深度(m)", 类型: "slider", 默认: -2480, 最小: -8000, 最大: -200, 步长: 20 }
  ],
    来源: "机制参考自 motionsites.ai（2026-09-19 分析）：多条同轮廓正弦曲线叠加成丝绢亮带 + 粒子场；已换题重推为「深海观测站」，视觉表达全部重做，非复刻"
  },
  {
    id: "S25",
    风格名: "玻璃工艺工作室",
    适配端: "PC 端",
    风格: "极简瑞士",
    场景: "作品集·叙事",
    骨架: "竖排作品索引（左 01–05）+ 器皿陈列（右）+ 作品铭牌",
    配色: {
      "浅蓝白影棚(画布)": "62%",
      "深墨(文字与唯一深色CTA)": "26%",
      "玻璃白与强调蓝": "12%"
    },
    布局骨架: "左侧竖排 01–05 作品索引，右侧陈列区以 flex-end 对齐五件玻璃器皿；陈列区上方是作品名与规格铭牌，索引与陈列联动",
    重色落点: "熔金只出现在器皿底部折射影与当前选中索引；器皿本身保持半透明，靠边缘高光交代玻璃材质",
    第一屏内容: "左上「砚台玻璃工作室」字样；左列 01–05 竖排索引；右侧五件器皿错落陈列；顶部铭牌「熔金瓶 · H 28 × Ø 14 · 手工吹制 · 1180°C」",
    删减元素: "不做产品参数表、不做购物车、只有一枚「预约看窑」按钮；器皿不加彩色、不加投影堆叠",
    适用: "手作品牌、工艺工作室、器物类目的小而美官网；需要突出「材质本身」的展示页",
    禁忌: "SKU 很多的电商列表；需要在首屏讲清多个卖点的促销页；做不出玻璃材质时硬套（会退化成普通浅色页）",
    参考站: [
      "motionsites.ai（nival-cyberspace / ConSentinel）"
    ],
    我的说明: "玻璃材质的语言（内高光 + 底部折射影 + 半透明叠色）完整保留自原作，但主体形态、构图、色系与信息全部按「手作玻璃」重新推导：从单球装置改为多件器皿陈列，从居中改为目录式，从国家数改为工艺参数。",
    Agent提示词: `【玻璃工艺工作室 · 设计语言宪法】
效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。

1. 视觉主题与氛围
窑火刚熄的上午，光从侧窗进来，五件玻璃器皿在台面上各自安静。氛围温润、有手工痕迹、不喧哗；密度低、气质克制、情绪是「被认真做出来的东西」。

2. 色彩板与角色
- kiln 窑火米白 #F2E6D8 —— 主底，占 50%
- glass 玻璃灰青 #8FC7C7 —— 器皿半透明主体，占 24%
- melt 熔金 #C8763C —— 光与选中索引，占 18%
- ink 墨色 #2A2320 —— 文字与描边，占 8%

3. 字体规则
- display：Georgia / Songti SC 衬线，主标题 2.4×基准字号
- body：同族 0.78×基准字号，行高 1.8
- meta：Consolas 等宽，11px，字距 .18em

4. 组件规范
- 索引按钮：竖排 01–05，选中态染熔金
- 铭牌：一行作品名 + 一行规格（H / Ø / 工艺 / 窑温）
- CTA：描边式（非实心），唯一一枚

5. 布局法
左侧栏宽 96–140px；陈列区 flex-end 对齐、间距由参数控制；铭牌置于陈列区上方，与主体保持 1 个字高的呼吸。

6. 深度与层级
z0 窑底 → z1 光斑 canvas → z2 台面折射影 → z3 器皿 → z4 铭牌与索引。器皿的立体感靠内高光与折射影，不用投影。

7. 该做 / 不该做
该做：保留玻璃的三件套（半透明叠色、边缘内高光、底部折射影）；器皿形态各成一类；铭牌参数真实。
不该做：给器皿上彩色、加投影卡片、做购物车、把玻璃做成不透明的色块。

8. 响应式行为
断点 820px：索引改为横向滚动条，器皿改为两列换行；触控目标 ≥44px；光斑在窄屏减半以免耗电。

9. Agent 提示词指南
配色卡：底 #F2E6D8 / 玻璃 #8FC7C7 / 熔金 #C8763C / 墨 #2A2320；字号卡：16 / 38 / 12.5。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，光斑与器皿一律 CSS/canvas 生成）。`,
    演示页: "assets/demos/方案-玻璃工艺工作室.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>玻璃工艺工作室</title>
<style>
/* 参数（postMessage 驱动；长度型变量自带 px） */
:root{
  --yaodi:#F2E6D8; --mo:#2B2118; --rongjin:#C8763C; --boli:#E8DCC8;
  --hui:#8B7355; --gaoguang:#FFFDF8;
  --biaoti:68px; --qiwu:1; --liang:100%;
  --ziti-biaoti:Georgia,'Songti SC','SimSun',serif;
  --ziti-zhengwen:system-ui,-apple-system,'Microsoft YaHei',sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{
  font-family:var(--ziti-zhengwen); color:var(--mo);
  background:var(--yaodi); overflow:hidden;
  filter:brightness(var(--liang));
}
.stage{position:relative;height:100%;display:flex;flex-direction:column}

/* 窑火光斑：canvas 铺底，营造窑内暖光 */
#yaoguang{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}

/* 顶栏：细线分隔，克制 */
.top{
  position:relative;z-index:2;display:flex;align-items:baseline;justify-content:space-between;
  padding:22px 40px 16px;border-bottom:1px solid color-mix(in srgb,var(--mo) 14%,transparent);
}
.brand{font-family:var(--ziti-biaoti);font-size:19px;letter-spacing:.14em}
.brand em{font-style:normal;color:var(--rongjin)}
.top nav{display:flex;gap:26px;font-size:12.5px;letter-spacing:.08em;color:var(--hui)}
.top nav span{cursor:default;transition:color .3s}
.top nav span:hover{color:var(--rongjin)}

/* 主体：左索引 + 右陈列 */
.main{position:relative;z-index:2;flex:1;display:grid;grid-template-columns:210px 1fr;min-height:0}

.idx{
  border-right:1px solid color-mix(in srgb,var(--mo) 14%,transparent);
  padding:34px 26px;display:flex;flex-direction:column;gap:19px;
}
.idx a{
  display:flex;gap:12px;align-items:baseline;text-decoration:none;color:var(--hui);
  font-size:13px;letter-spacing:.04em;cursor:default;transition:color .35s,transform .35s;
}
.idx a b{font-family:var(--ziti-biaoti);font-size:11px;color:var(--rongjin);opacity:.8}
.idx a:hover,.idx a.on{color:var(--mo);transform:translateX(5px)}
.idx a.on b{opacity:1}

/* 陈列区：标题在上、器皿在下，互不遮挡 */
.show{position:relative;display:flex;flex-direction:column;min-height:0;padding:28px 40px 18px}
.vessels{position:relative;display:flex;align-items:flex-end;justify-content:center;gap:calc(30px*var(--qiwu));flex:1;min-height:0;padding-bottom:18px}

/* 玻璃器皿：靠渐变 + 内外高光模拟窑玻璃的通透感 */
.v{
  position:relative;flex-shrink:0;
  background:
    radial-gradient(58% 6% at 50% 1.5%,color-mix(in srgb,var(--mo) 30%,transparent),transparent 74%),
    linear-gradient(168deg,color-mix(in srgb,var(--boli) 86%,transparent),color-mix(in srgb,var(--rongjin) 38%,var(--boli)));
  border:1px solid color-mix(in srgb,var(--mo) 24%,transparent);
  box-shadow:
    inset 3px 4px 16px color-mix(in srgb,var(--gaoguang) 88%,transparent),
    inset -5px -8px 22px color-mix(in srgb,var(--mo) 17%,transparent),
    0 18px 36px color-mix(in srgb,var(--mo) 12%,transparent);
  backdrop-filter:blur(calc(6px*var(--qiwu)));
  -webkit-backdrop-filter:blur(calc(6px*var(--qiwu)));
  opacity:0;transform:translateY(26px);
  animation:rise .95s cubic-bezier(.22,.68,.25,1) forwards;
}
@keyframes rise{to{opacity:1;transform:translateY(0)}}

/* 边缘高光 + 台面折射影，玻璃的通透靠这两层撑起来 */
.v::before{
  content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:
    linear-gradient(102deg,color-mix(in srgb,var(--gaoguang) 96%,transparent) 0%,transparent 17%),
    linear-gradient(276deg,color-mix(in srgb,var(--gaoguang) 62%,transparent) 0%,transparent 22%),
    radial-gradient(120% 42% at 50% 104%,color-mix(in srgb,var(--gaoguang) 58%,transparent),transparent 70%);
}
.v::after{
  content:'';position:absolute;left:6%;right:6%;bottom:-8px;height:16px;border-radius:50%;pointer-events:none;
  background:radial-gradient(ellipse at center,color-mix(in srgb,var(--mo) 30%,transparent),transparent 72%);
  filter:blur(4px);
}

/* 五件器皿：抓各自最像器皿的那一段轮廓 */
.v1{width:calc(88px*var(--qiwu));height:100%;border-radius:42% 42% 12% 12%/16% 16% 6% 6%}
.v1::before{border-radius:inherit}
.v2{width:calc(138px*var(--qiwu));height:52%;border-radius:44% 44% 40% 40%/58% 58% 26% 26%;animation-delay:.1s}
.v3{width:calc(72px*var(--qiwu));height:66%;border-radius:8px 8px 34% 34%/6px 6px 22% 22%;animation-delay:.2s}
.v4{width:calc(104px*var(--qiwu));height:44%;border-radius:32% 32% 46% 46%/30% 30% 44% 44%;animation-delay:.3s}
.v5{width:calc(58px*var(--qiwu));height:30%;border-radius:48% 48% 50% 50%/66% 66% 34% 34%;animation-delay:.4s}

/* 作品名与规格：衬线标题 + 斜体标注（手写感） */
.label{position:relative;z-index:3;margin-bottom:18px}
.label h1{
  font-family:var(--ziti-biaoti);font-size:var(--biaoti);font-weight:400;
  letter-spacing:.02em;line-height:.95;
  opacity:0;animation:rise .9s .5s cubic-bezier(.22,.68,.25,1) forwards;
}
.label p{
  margin-top:12px;font-family:var(--ziti-biaoti);font-style:italic;font-size:14.5px;
  color:var(--hui);letter-spacing:.05em;
  opacity:0;animation:rise .9s .66s cubic-bezier(.22,.68,.25,1) forwards;
}
.label p em{font-style:italic;color:var(--rongjin)}

/* 底栏数据：工艺信息，替代原站的国家数/客户数 */
.strip{
  position:relative;z-index:2;display:flex;gap:52px;
  padding:16px 40px 20px;border-top:1px solid color-mix(in srgb,var(--mo) 14%,transparent);
}
.strip div{display:flex;gap:11px;align-items:baseline}
.strip b{font-family:var(--ziti-biaoti);font-size:10.5px;letter-spacing:.16em;color:var(--rongjin);text-transform:uppercase}
.strip span{font-size:13px;color:var(--mo)}

@media (max-width:820px){
  .main{grid-template-columns:1fr}
  .idx{flex-direction:row;overflow-x:auto;border-right:0;border-bottom:1px solid color-mix(in srgb,var(--mo) 14%,transparent);padding:16px 22px;gap:20px}
  .top{padding:16px 22px 12px}
  .label h1{font-size:calc(var(--biaoti)*.62)}
  .strip{gap:22px;padding:12px 22px 14px;flex-wrap:wrap}
}
@media (prefers-reduced-motion:reduce){
  .v,.label h1,.label p{animation-duration:.01ms;animation-delay:0s}
}
</style>
</head>
<body>
<div class="stage">
  <canvas id="yaoguang" aria-hidden="true"></canvas>

  <header class="top">
    <span class="brand">窑火 <em>·</em> Glass Studio</span>
    <nav><span>作品</span><span>工艺</span><span>工作室</span><span>联系</span></nav>
  </header>

  <div class="main">
    <aside class="idx">
      <a class="on"><b>01</b>熔金瓶</a>
      <a><b>02</b>雾面碗</a>
      <a><b>03</b>窑变杯</a>
      <a><b>04</b>素纹罐</a>
      <a><b>05</b>凝霜盏</a>
    </aside>

    <section class="show">
      <div class="label">
        <h1>熔金瓶</h1>
        <p>H 28 × Ø 14 · 手工吹制 · <em>1180°C</em></p>
      </div>
      <div class="vessels">
        <div class="v v1"></div>
        <div class="v v2"></div>
        <div class="v v3"></div>
        <div class="v v4"></div>
        <div class="v v5"></div>
      </div>
    </section>
  </div>

  <footer class="strip">
    <div><b>工艺</b><span>手工吹制</span></div>
    <div><b>窑温</b><span>1180°C</span></div>
    <div><b>编号</b><span>GS-2026-014</span></div>
    <div><b>出品</b><span>本窑工作室</span></div>
  </footer>
</div>

<script>
const state = {
  yaodi:'#F2E6D8', mo:'#2B2118', rongjin:'#C8763C', boli:'#E8DCC8',
  biaoti:68, qiwu:100, guangsu:1, liang:100
};

function apply(){
  const r = document.documentElement.style;
  r.setProperty('--yaodi', state.yaodi);
  r.setProperty('--mo', state.mo);
  r.setProperty('--rongjin', state.rongjin);
  r.setProperty('--boli', state.boli);
  r.setProperty('--biaoti', state.biaoti + 'px');
  r.setProperty('--qiwu', state.qiwu / 100);
  r.setProperty('--liang', state.liang + '%');
  guang.rate = state.guangsu;
}
apply();

// 窑火光斑：缓慢漂移的暖色光团，负责「窑内感」
const cv = document.getElementById('yaoguang');
const cx = cv.getContext('2d');
const guang = { rate:1 };
let W = 0, H = 0, raf = 0, t = 0;
const still = matchMedia('(prefers-reduced-motion: reduce)');

const spots = [
  { x:.2,  y:.32, r:.5,  c:'206,120,58',  a:.42 },
  { x:.72, y:.2,  r:.44, c:'255,216,170', a:.5  },
  { x:.56, y:.8,  r:.54, c:'188,98,50',   a:.34 },
  { x:.92, y:.6,  r:.38, c:'255,238,212', a:.4  },
  { x:.07, y:.88, r:.34, c:'214,140,80',  a:.3  }
];

function resize(){
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw(){
  cx.clearRect(0, 0, W, H);
  const m = Math.min(W, H);
  for (const s of spots){
    const dx = Math.sin(t * .00035 * guang.rate + s.x * 9) * m * .05;
    const dy = Math.cos(t * .00028 * guang.rate + s.y * 7) * m * .04;
    const px = s.x * W + dx, py = s.y * H + dy, pr = s.r * m;
    const g = cx.createRadialGradient(px, py, 0, px, py, pr);
    g.addColorStop(0, 'rgba(' + s.c + ',' + s.a + ')');
    g.addColorStop(1, 'rgba(' + s.c + ',0)');
    cx.fillStyle = g;
    cx.beginPath(); cx.arc(px, py, pr, 0, Math.PI * 2); cx.fill();
  }
}

function loop(){ t += 16; draw(); raf = requestAnimationFrame(loop); }
function start(){ cancelAnimationFrame(raf); if (still.matches) draw(); else raf = requestAnimationFrame(loop); }

still.addEventListener('change', start);
addEventListener('resize', function(){ resize(); if (still.matches) draw(); });
addEventListener('message', function(e){
  const d = e.data;
  if (!d || d.type !== 'param' || !(d.key in state)) return;
  state[d.key] = d.value;
  apply();
});

resize(); start();

// 索引与陈列联动：点索引切作品名，验证布局能承载不同长度
const names = ['熔金瓶','雾面碗','窑变杯','素纹罐','凝霜盏'];
const sizes = ['H 28 × Ø 14','H 12 × Ø 26','H 16 × Ø 9','H 20 × Ø 22','H 8 × Ø 13'];
const items = document.querySelectorAll('.idx a');
const h1 = document.querySelector('.label h1');
const spec = document.querySelector('.label p');
items.forEach(function(a, i){
  a.addEventListener('click', function(){
    items.forEach(function(x){ x.classList.remove('on'); });
    a.classList.add('on');
    h1.textContent = names[i];
    spec.innerHTML = sizes[i] + ' · 手工吹制 · <em>1180°C</em>';
  });
});
</script>
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
    { 键: "yaodi", 名: "窑底色", 类型: "color", 默认: "#F2E6D8" },
    { 键: "mo", 名: "墨色", 类型: "color", 默认: "#2B2118" },
    { 键: "rongjin", 名: "熔金色", 类型: "color", 默认: "#C8763C" },
    { 键: "boli", 名: "玻璃色", 类型: "color", 默认: "#E8DCC8" },
    { 键: "biaoti", 名: "标题字号", 类型: "slider", 默认: 68, 最小: 20, 最大: 64, 步长: 1 },
    { 键: "qiwu", 名: "器皿大小", 类型: "slider", 默认: 100, 最小: 0.6, 最大: 1.5, 步长: 0.02 },
    { 键: "guangsu", 名: "光流速度", 类型: "slider", 默认: 1, 最小: 0, 最大: 3, 步长: 0.05 },
    { 键: "liang", 名: "亮度", 类型: "slider", 默认: 100, 最小: 60, 最大: 140, 步长: 2 }
  ],
    来源: "机制参考自 motionsites.ai nival-cyberspace（ConSentinel 演示页，2026-09-19 分析）：玻璃材质语言（backdrop-blur + 边缘高光 + 台面折射影）与光斑漂移；已换题重推为「玻璃工艺工作室」，视觉表达全部重做，非复刻"
  },
  {
    id: "S26",
    风格名: "机械腕表定制",
    适配端: "通用",
    风格: "科技未来",
    场景: "电商·预订",
    骨架: "顶部品牌与编号 + 中央影棚渲染（canvas）+ 系统切换坞 + 详情浮层",
    配色: {
      "影棚灰蓝(画布)": "60%",
      "银白车漆与文字": "30%",
      "电光黄绿(热点)": "10%"
    },
    布局骨架: "纵向三段：页头（品牌 + 定制编号）/ 舞台（canvas 渲染腕表 + 四个悬浮热点 + 右下详情浮层）/ 底部系统坞（表壳 / 机芯 / 表带 / 表盘）",
    重色落点: "朱红只给秒针一处；精钢银负责壳体与全部可点元素；工作台用径向渐变把视线收到表盘上",
    第一屏内容: "左上「衡山制表 CAL. 1892」、右上定制编号；中央一只精钢腕表带暖色皮革表带；四个编号热点可点开对应部位的参数浮层",
    删减元素: "不做价格、不加购物流程、不做参数大表；同屏只有一个浮层、四个热点",
    适用: "高端定制、机械器具、单件制品的品牌页；需要「可拆解看细节」的产品发布页",
    禁忌: "多 SKU 电商列表；需要在首屏讲清多个卖点的促销页；渲染不出材质时硬套（会退化成普通圆形色块）",
    参考站: [
      "motionsites.ai（VEYRA — Electric vehicle design）"
    ],
    我的说明: "保留了原作「影棚渲染 + 热点系统切换 + 详情浮层 + 走时状态机」四件事；主体从整车换成腕表，热点改为表壳/机芯/表带/表盘四个部位，参数换成材质、直径、振频这类定制口径。指针由参数驱动的状态机连续走时。",
    Agent提示词: `【机械腕表定制 · 设计语言宪法】
效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。

1. 视觉主题与氛围
工作台上只有一只表，灯从侧上方打下来，其余空间全暗。氛围精密、有手作温度、带一点仪式感；密度低、气质沉稳、情绪是「可以拆开看的讲究」。

2. 色彩板与角色
- bench 工作台 #15110D —— 主底（径向渐变收拢视线），占 56%
- steel 精钢 #C7CCD1 —— 壳体、全部可点元素，占 20%
- enamel 珐琅表盘 #EFE9DC —— 表盘面，占 14%
- second 秒针朱红 #B03A2E —— 仅秒针一处，占 4%
- leather 小牛皮 #2E2118 —— 表带，占 6%

3. 字体规则
- display：Georgia / Songti SC，1.35×基准字号，字距 .16em
- body：无衬线，0.78×基准字号
- data：Consolas 等宽，用于材质 / 直径 / 振频等参数

4. 组件规范
- 热点：28px 圆形，深色半透明底 + 精钢描边，hover 反色
- 系统坞按钮：描边式，选中态提亮描边与文字
- 详情浮层：右下角，深色玻璃（backdrop-filter blur 8px），左上角关闭

5. 布局法
纵向三段式；舞台 flex:1；浮层绝对定位在右下；系统坞横排、间距由参数控制。

6. 深度与层级
z0 工作台 → z1 台面投影（blur）→ z2 表带 → z3 表壳与表盘 → z4 热点 → z5 浮层。立体感靠渐变与投影，不用描边堆叠。

7. 该做 / 不该做
该做：指针真实走时；热点与系统坞状态同步；浮层可 Esc 关闭；aria-expanded 随状态更新。
不该做：加价格、加购物车、做参数大表、把表做成写实照片。

8. 响应式行为
断点 820px：浮层改为左侧全宽；系统坞横向换行；腕表按舞台短边等比缩放；触控目标 ≥44px。

9. Agent 提示词指南
配色卡：台面 #15110D / 精钢 #C7CCD1 / 表盘 #EFE9DC / 秒针 #B03A2E / 表带 #2E2118；字号卡：16 / 21.6 / 12.5。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，腕表一律 canvas 绘制）。`,
    演示页: "assets/demos/方案-机械腕表定制.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>机械腕表定制</title>
<style>
:root{
  --di:#15110D;        /* 深色工作台 */
  --ke:#C7CCD1;        /* 精钢 */
  --dai:#2E2118;       /* 小牛皮 */
  --pan:#EFE9DC;       /* 珐琅表盘 */
  --zi:#EDE6DA;
  --ci:#8C8175;
  --zhen:#B03A2E;      /* 秒针朱红 */
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:8px;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  background:radial-gradient(120% 90% at 50% 34%,#221A14 0%,var(--di) 62%);
  color:var(--zi);overflow:hidden;display:flex;flex-direction:column;
  font-family:-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  min-height:100vh;
}
header{display:flex;align-items:baseline;justify-content:space-between;
  padding:calc(var(--jianju)*1.1) calc(var(--jianju)*1.4) 0}
.brand{font-family:Georgia,"Songti SC",serif;font-size:calc(var(--zihao)*1.35);letter-spacing:.16em}
.brand em{font-style:normal;color:var(--ci);font-family:Consolas,monospace;font-size:11px;letter-spacing:.2em;margin-left:12px}
header .no{font-family:Consolas,monospace;font-size:11.5px;color:var(--ci);letter-spacing:.14em}
.stage{position:relative;flex:1;min-height:0}
#watch{position:absolute;inset:0;width:100%;height:100%}
/* 热点：悬浮/点击切换「系统」，机制与原作一致 */
.hot{position:absolute;transform:translate(-50%,-50%);z-index:3;
  background:rgba(21,17,13,.78);border:1px solid color-mix(in srgb,var(--ke) 78%,transparent);
  color:var(--ke);width:28px;height:28px;border-radius:50%;cursor:pointer;
  font-family:Consolas,monospace;font-size:11px;line-height:1;backdrop-filter:blur(3px);
  box-shadow:0 2px 10px rgba(0,0,0,.55);
  transition:background .18s,color .18s,border-color .18s}
.hot:hover,.hot.on{background:var(--ke);color:#1A1410;border-color:var(--ke)}
.dock{display:flex;gap:calc(var(--jianju)*.6);padding:0 calc(var(--jianju)*1.4) calc(var(--jianju)*.9);
  flex-wrap:wrap;align-items:center}
.sys{
  background:rgba(255,255,255,.03);color:var(--ci);border:1px solid rgba(199,204,209,.18);
  border-radius:var(--yuanjiao);padding:9px 14px;font-size:calc(var(--zihao)*.78);
  cursor:pointer;font-family:inherit;transition:color .18s,border-color .18s,background .18s}
.sys.on{color:var(--zi);border-color:color-mix(in srgb,var(--ke) 55%,transparent);background:rgba(199,204,209,.08)}
.detail{position:absolute;right:calc(var(--jianju)*1.4);bottom:calc(var(--jianju)*1.2);z-index:4;
  width:290px;background:rgba(21,17,13,.92);border:1px solid rgba(199,204,209,.22);
  border-radius:var(--yuanjiao);padding:18px 20px;backdrop-filter:blur(8px);
  opacity:0;translate:0 10px;pointer-events:none;transition:opacity .22s,translate .22s}
.detail.on{opacity:1;translate:0 0;pointer-events:auto}
.detail h3{font-size:calc(var(--zihao)*.95);font-weight:600;letter-spacing:.06em}
.detail dl{margin-top:12px;display:grid;grid-template-columns:auto 1fr;gap:7px 14px;font-size:calc(var(--zihao)*.76)}
.detail dt{color:var(--ci)}
.detail dd{font-family:Consolas,monospace;color:var(--ke)}
.detail button{position:absolute;top:12px;right:12px;background:none;border:none;color:var(--ci);cursor:pointer;font-size:15px}
@media (max-width:820px){.detail{left:calc(var(--jianju)*1.4);width:auto}.dock{padding-bottom:calc(var(--jianju)*1.4)}}
</style>
</head>
<body>
<header>
  <span class="brand">衡山制表<em>CAL. 1892</em></span>
  <span class="no">手动机芯 · 定制编号 A-0147</span>
</header>

<div class="stage">
  <canvas id="watch"></canvas>
  <button class="hot" style="left:50%;top:26%" data-sys="0" aria-expanded="false">01</button>
  <button class="hot" style="left:50%;top:52%" data-sys="1" aria-expanded="false">02</button>
  <button class="hot" style="left:23%;top:66%" data-sys="2" aria-expanded="false">03</button>
  <button class="hot" style="left:50%;top:44%" data-sys="3" aria-expanded="false">04</button>

  <div class="detail" id="detail">
    <button id="dclose" aria-label="关闭">×</button>
    <h3 id="dtitle">表壳</h3>
    <dl id="dlist"></dl>
  </div>
</div>

<div class="dock" id="dock"></div>

<script>
var state = {
  di:'#15110D', ke:'#C7CCD1', dai:'#2E2118', pan:'#EFE9DC', zhen:'#B03A2E',
  zihao:16, jianju:22, yuanjiao:8, bijing:1, zousu:1
};

var SYSTEMS = [
  {名:'表壳', 色键:'ke', 参数:[['材质','316L 精钢'],['直径','38.5 mm'],['厚度','10.2 mm'],['防水','100 m']]},
  {名:'机芯', 色键:'zhen', 参数:[['型号','手动机芯'],['钻数','21 钻'],['振频','21600 vph'],['动储','56 小时']]},
  {名:'表带', 色键:'dai', 参数:[['材质','小牛皮'],['工艺','手工缝线'],['表扣','针扣'],['宽度','19 mm']]},
  {名:'表盘', 色键:'pan', 参数:[['工艺','珐琅'],['刻度','立体罗马'],['指针','蓝钢'],['夜光','无（复古）']]}
];

var cv=document.getElementById('watch'), ctx=cv.getContext('2d');
var W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2),S=1;
var t=0,last=0,active=1;

function resize(){
  var r=cv.parentElement.getBoundingClientRect();
  W=r.width;H=r.height;
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  cv.style.width=W+'px';cv.style.height=H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
  S=Math.min(W,H)/560*state.bijing;
}
function hex(h){var v=parseInt(String(h).replace('#',''),16);return [(v>>16)&255,(v>>8)&255,v&255];}
function rgba(h,a){var c=hex(h);return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';}
function shade(h,d){var c=hex(h).map(function(x){return Math.max(0,Math.min(255,x+d));});return '#'+c.map(function(x){return ('0'+x.toString(16)).slice(-2);}).join('');}

/* 工作台渲染：机芯主形体 + 指针走时（状态机 play() 由 zousu 驱动） */
function render(now){
  var dt=Math.min(.05,(now-last)/1000||.016);last=now;
  t+=dt*state.zousu;
  ctx.clearRect(0,0,W,H);
  var cx=W*.5, cy=H*.52, R=140*S;

  /* 台面投影，做出影棚感 */
  ctx.save();
  ctx.beginPath();ctx.ellipse(cx,cy+R*1.34,R*1.05,R*.2,0,0,Math.PI*2);
  ctx.fillStyle='rgba(0,0,0,.42)';ctx.filter='blur(14px)';ctx.fill();ctx.restore();

  /* 表带 */
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx-R*.52,cy-R*.62); ctx.lineTo(cx-R*.72,cy-R*1.5); ctx.lineTo(cx+R*.72,cy-R*1.5); ctx.lineTo(cx+R*.52,cy-R*.62);
  ctx.moveTo(cx-R*.52,cy+R*.62); ctx.lineTo(cx-R*.72,cy+R*1.5); ctx.lineTo(cx+R*.72,cy+R*1.5); ctx.lineTo(cx+R*.52,cy+R*.62);
  ctx.fillStyle=state.dai;ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=1;
  for(var s=-4;s<=4;s++){var xx=cx+s*R*.16;
    ctx.beginPath();ctx.moveTo(xx,cy-R*1.48);ctx.lineTo(xx,cy-R*.64);ctx.moveTo(xx,cy+R*.64);ctx.lineTo(xx,cy+R*1.48);ctx.stroke();}
  ctx.restore();

  /* 表壳 */
  var g=ctx.createLinearGradient(cx-R,cy-R,cx+R,cy+R);
  g.addColorStop(0,shade(state.ke,34));g.addColorStop(.5,state.ke);g.addColorStop(1,shade(state.ke,-46));
  ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
  ctx.lineWidth=Math.max(1,R*.02);ctx.strokeStyle=shade(state.ke,-70);ctx.stroke();
  /* 表冠 */
  ctx.beginPath();ctx.roundRect(cx+R*1.02,cy-16*S,26*S,32*S,5*S);ctx.fillStyle=shade(state.ke,-22);ctx.fill();

  /* 表盘 */
  ctx.beginPath();ctx.arc(cx,cy,R*.86,0,Math.PI*2);ctx.fillStyle=state.pan;ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.14)';ctx.lineWidth=1;ctx.stroke();

  /* 刻度与指针：指针由 t 驱动，秒针用朱红 */
  for(var i=0;i<60;i++){
    var a=i/60*Math.PI*2-Math.PI/2, big=i%5===0;
    var r1=R*(big?.70:.76), r2=R*.80;
    ctx.beginPath();
    ctx.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);
    ctx.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);
    ctx.strokeStyle='rgba(24,20,16,'+(big?.75:.32)+')';ctx.lineWidth=big?2.2:1;ctx.stroke();
  }
  function hand(ang,len,w,color){
    ctx.save();ctx.translate(cx,cy);ctx.rotate(ang);
    ctx.beginPath();ctx.roundRect(-w/2,-len,w,len+w, w/2);ctx.fillStyle=color;ctx.fill();ctx.restore();
  }
  var sec=t%60, min=(t/60)%60, hr=(t/3600)%12;
  hand(hr/12*Math.PI*2-Math.PI/2, R*.40, 6*S, '#2A2622');
  hand(min/60*Math.PI*2-Math.PI/2, R*.56, 4.4*S, '#2A2622');
  hand(sec/60*Math.PI*2-Math.PI/2, R*.64, 2.2*S, state.zhen);
  ctx.beginPath();ctx.arc(cx,cy,4.4*S,0,Math.PI*2);ctx.fillStyle=shade(state.ke,-30);ctx.fill();

  /* 高亮当前系统：在被选部位加一圈描边 */
  if(active>=0){
    var hi=[[cx,cy-R, R*1.0],[cx,cy,R*.5],[cx,cy+R*1.1,R*.5],[cx,cy,R*.86]][active];
    ctx.beginPath();ctx.arc(hi[0],hi[1],hi[2],0,Math.PI*2);
    ctx.strokeStyle=rgba(state.ke,.5);ctx.lineWidth=1;ctx.setLineDash([4,5]);ctx.stroke();ctx.setLineDash([]);
  }
  requestAnimationFrame(render);
}

function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--ke',state.ke);
  r.setProperty('--dai',state.dai);r.setProperty('--pan',state.pan);r.setProperty('--zhen',state.zhen);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  resize();
}
/* 详情浮层：内容随系统重建（原作的 detail 状态机） */
function openDetail(i){
  var s=SYSTEMS[i];
  document.getElementById('dtitle').textContent='表壳'.replace('表壳',s.名);
  document.getElementById('dlist').innerHTML=s.参数.map(function(p){return '<dt>'+p[0]+'</dt><dd>'+p[1]+'</dd>';}).join('');
  document.getElementById('detail').classList.add('on');
}
function closeDetail(){
  document.getElementById('detail').classList.remove('on');
  document.querySelectorAll('.hot').forEach(function(b){b.setAttribute('aria-expanded','false');});
}
var dock=document.getElementById('dock');
SYSTEMS.forEach(function(s,i){
  var b=document.createElement('button');
  b.className='sys'+(i===1?' on':'');b.textContent=s.名;b.dataset.sys=i;
  b.setAttribute('aria-expanded','false');
  b.addEventListener('click',function(){
    document.querySelectorAll('.sys').forEach(function(x){x.classList.remove('on');});
    b.classList.add('on');active=i;
  });
  b.addEventListener('pointerenter',function(){active=i;});
  dock.appendChild(b);
});
document.querySelectorAll('.hot').forEach(function(b){
  var i=+b.dataset.sys;
  b.addEventListener('pointerenter',function(){active=i;});
  b.addEventListener('click',function(){active=i;openDetail(i);b.setAttribute('aria-expanded','true');});
});
document.getElementById('dclose').addEventListener('click',closeDetail);
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDetail();});
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(resize,120);});
active=1;apply();
requestAnimationFrame(render);
</script>
</body>
</html>
`,
    片段: `:root{--cheqi:#E8EBEE;--yingpeng:#6B879D;--tianse:#708FA2;--diang:#EDFF39;--mianban:#35586E;--wenzi:#E1EAF0;--kuang:3px;--yuanjiao:16px;--redian:48px;}
.stage{position:relative;margin:0 auto;aspect-ratio:1672/941;border:var(--kuang) solid var(--zi);border-radius:var(--yuanjiao);}
.hs{position:absolute;width:var(--redian);height:var(--redian);margin:calc(var(--redian)/-2) 0 0 calc(var(--redian)/-2);border:0;border-radius:50%;background:transparent;}
.hs::before{content:"";width:calc(var(--redian)*.28);height:calc(var(--redian)*.28);border-radius:50%;background:var(--diang);}
.dock{position:absolute;left:50%;bottom:-34px;opacity:0;transform:translate(-50%,calc(100% + var(--tuise) + 34px));transition:opacity .34s ease,transform .34s ease;}
.dock.open{opacity:1;transform:translate(-50%,0);}`,
    参数: [
    { 键: "di", 名: "工作台底色", 类型: "color", 默认: "#15110D" },
    { 键: "ke", 名: "精钢色", 类型: "color", 默认: "#C7CCD1" },
    { 键: "dai", 名: "表带色", 类型: "color", 默认: "#2E2118" },
    { 键: "pan", 名: "表盘色", 类型: "color", 默认: "#EFE9DC" },
    { 键: "zhen", 名: "秒针色", 类型: "color", 默认: "#B03A2E" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 36, 步长: 1 },
    { 键: "yuanjiao", 名: "浮层圆角", 类型: "slider", 默认: 8, 最小: 0, 最大: 20, 步长: 1 },
    { 键: "bijing", 名: "表径倍率", 类型: "slider", 默认: 1, 最小: 0.6, 最大: 1.6, 步长: 0.02 },
    { 键: "zousu", 名: "走时速度", 类型: "slider", 默认: 1, 最小: 0, 最大: 6, 步长: 0.1 }
  ],
    来源: "机制参考自 motionsites.ai（2026-09-19 分析）：canvas 影棚渲染 + 热点系统切换 + 详情浮层状态机；已换题重推为「机械腕表定制」，视觉表达全部重做，非复刻"
  },
  {
    id: "S27",
    风格名: "独立书店",
    适配端: "PC 端",
    风格: "编辑杂志",
    场景: "电商·预订",
    骨架: "页头说明 + 整排书脊（跟随光标）+ 订阅页脚",
    配色: {
      "深紫黑(页脚底)": "60%",
      "暖白与漂浮色块(眼白/文字/背景)": "30%",
      "琥珀黄(CTA)": "10%"
    },
    布局骨架: "纵向三段：页头（店名 + NIGHT 徽章 + 一句说明）/ 中段整排书脊底部对齐、随光标依次转头 / 页脚横条（订阅表单 + 说明）",
    重色落点: "朱砂只出现在 NIGHT 徽章、被「看中」的那本书脊和唯一按钮上；画面其余部分保持夜蓝与纸白两级",
    第一屏内容: "左上「纸月书店 NIGHT」与一段夜读说明；中段八本书脊高低错落、纵向书写书名；底部「新书到店提醒」订阅表单",
    删减元素: "不做书籍封面图、不做分类导航、不做价格；同屏只有一个表单与一个按钮",
    适用: "书店、唱片店、画廊等「陈列 + 氛围」型小店官网；需要长期订阅入口的独立品牌页",
    禁忌: "电商列表页；需要筛选与排序的目录页；把书脊做成图片（会失去跟随手感）",
    参考站: [
      "motionsites.ai（Playful Idea — Independent design studio）"
    ],
    我的说明: "跟随机制保留自原作的光标视线追踪，但把「眼球」换成「一排书脊」——每根按与光标的水平距离取不同延迟，形成依次转头看你的层次。背景墨迹用 canvas 多层径向渐变漂移，页面完全离线。",
    Agent提示词: `【独立书店 · 夜读 · 设计语言宪法】
效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。

1. 视觉主题与氛围
打烊前两小时的书店，只留一排暖灯。氛围安静、纸味重、有人味；密度低、气质温和、情绪是「慢慢挑一本」。

2. 色彩板与角色
- night 夜蓝 #141B2B —— 主底，占 54%
- paper 纸白 #E8E0CE —— 文字与高光，占 22%
- spine 书脊深蓝 #2B3448 —— 书脊主体，占 16%
- seal 朱砂 #B4462F —— 店章、被看中的书脊、唯一按钮，占 8%

3. 字体规则
- display：Georgia / Songti SC，1.5×基准字号，字距 .12em
- body：同族 0.8×基准字号，行高 1.7
- spine：竖排 writing-mode: vertical-rl，text-orientation: upright，0.72×基准字号，字距 .22em
- meta：Consolas 等宽，11px

4. 组件规范
- 书脊：宽 34px、高度各不相同、底部对齐，圆角由参数控制；被看中时染朱砂
- 订阅表单：下划线式输入 + 朱砂实心按钮
- 徽章：1px 朱砂描边 + 朱砂字，全部大写

5. 布局法
纵向三段；书脊区 flex + gap 由参数控制、align-items: flex-end；页头与页脚用 1px 低透明分隔线。

6. 深度与层级
z0 夜蓝底 → z1 canvas 墨迹 → z2 书脊 → z3 页头与页脚。层次靠前后亮度差，不用阴影堆叠。

7. 该做 / 不该做
该做：让跟随有「依次」的层次（延迟随距离递增）；表单可真实提交并回显；竖排文字必须逐字正立。
不该做：贴书封图、做分类导航、给书脊加彩色、让全部书脊同时抖动。

8. 响应式行为
断点 820px：只保留前五本书脊；触控目标 ≥44px；窄屏降低墨迹团数量与跟随幅度。

9. Agent 提示词指南
配色卡：夜蓝 #141B2B / 纸白 #E8E0CE / 书脊 #2B3448 / 朱砂 #B4462F；字号卡：16 / 24 / 11.5。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，背景墨迹 canvas 生成）。`,
    演示页: "assets/demos/方案-独立书店.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>独立书店 · 夜读</title>
<style>
:root{
  --ye:#141B2B;        /* 夜里闭店的书架 */
  --zhi:#E8E0CE;       /* 纸白 */
  --ji:#2B3448;        /* 书脊 */
  --ying:#B4462F;      /* 朱砂（书签 / 印章）*/
  --ci:#8E9BC4;        /* 次要标注 */
  --zihao:16px;
  --jianju:20px;
  --yuanjiao:4px;
  --yanchi:0.14;       /* 跟随延迟：越大越“懒” */
  --fudu:1;            /* 跟随幅度 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--ye);color:var(--zhi);overflow:hidden;min-height:100vh;
  font-family:Georgia,"Songti SC",serif;display:grid;grid-template-rows:auto 1fr auto}
#ink{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
header{position:relative;padding:calc(var(--jianju)*1.5) calc(var(--jianju)*2) 0;z-index:2}
.brand{font-size:calc(var(--zihao)*1.5);letter-spacing:.12em}
.brand i{font-style:normal;display:inline-block;margin-left:10px;padding:2px 7px;border:1px solid var(--ying);
  color:var(--ying);font-size:11px;font-family:Consolas,monospace;letter-spacing:.14em;vertical-align:3px;border-radius:2px}
header p{margin-top:10px;color:var(--ci);font-size:calc(var(--zihao)*.8);letter-spacing:.04em;max-width:520px;line-height:1.7}
/* 书脊：整排跟着光标轻微转向，这就是「视线追踪」的机制本体 */
.shelf{position:relative;z-index:2;display:flex;align-items:flex-end;justify-content:center;
  gap:calc(var(--jianju)*.8);padding:0 calc(var(--jianju)*2);min-height:0;overflow:hidden}
.spine{
  width:34px;border-radius:var(--yuanjiao);background:var(--ji);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 18px 30px rgba(0,0,0,.42);transform-origin:50% 100%;
  writing-mode:vertical-rl;text-orientation:upright;
  font-size:calc(var(--zihao)*.72);letter-spacing:.22em;color:color-mix(in srgb,var(--zhi) 78%,transparent);
  transition:background .4s;will-change:transform;
}
.spine.hot{background:color-mix(in srgb,var(--ji) 55%,var(--ying))}
.spine.s1{height:62%}.spine.s2{height:74%}.spine.s3{height:54%}.spine.s4{height:80%}
.spine.s5{height:66%}.spine.s6{height:58%}.spine.s7{height:70%}.spine.s8{height:50%}
footer{z-index:2;display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:calc(var(--jianju)*1.2) calc(var(--jianju)*2) calc(var(--jianju)*1.5);
  border-top:1px solid rgba(232,224,206,.12);flex-wrap:wrap}
form{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
label{font-size:calc(var(--zihao)*.76);color:var(--ci)}
input[type=email]{background:transparent;border:none;border-bottom:1px solid rgba(232,224,206,.3);
  color:var(--zhi);font-family:Consolas,monospace;font-size:calc(var(--zihao)*.82);padding:6px 2px;width:210px;outline:none}
input[type=email]:focus{border-color:var(--ying)}
button[type=submit]{background:var(--ying);color:#F7F3EA;border:none;border-radius:3px;
  padding:9px 16px;font-family:inherit;font-size:calc(var(--zihao)*.78);cursor:pointer}
footer em{font-style:normal;color:var(--ci);font-size:11.5px;font-family:Consolas,monospace;letter-spacing:.08em}
@media (max-width:820px){.spine:nth-child(n+6){display:none}}
</style>
</head>
<body>
<canvas id="ink"></canvas>
<header>
  <div class="brand">纸月书店<i>NIGHT</i></div>
  <p>每周三夜读到十一点。书脊会跟着你的手转——像有人从架子上探头看你拿了哪一本。</p>
</header>

<div class="shelf" id="shelf"></div>

<footer>
  <form id="sub">
    <label for="em">新书到店提醒</label>
    <input id="em" type="email" placeholder="you@example.com" required>
    <button type="submit">订阅</button>
  </form>
  <em id="msg">每两周一次 · 不推销</em>
</footer>

<script>
var state = {
  ye:'#141B2B', zhi:'#E8E0CE', ji:'#2B3448', ying:'#B4462F',
  zihao:16, jianju:20, yuanjiao:4, yanchi:.14, fudu:1
};
var BOOKS = ['夜航西飞','万物有灵','寂静的春天','看不见的城市','我们仨','金阁寺','雪国','边城'];

var cv=document.getElementById('ink'), ctx=cv.getContext('2d');
var W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);
var blobs=[],mx=-999,my=-999,px=-999,py=-999;

function hex(h){var v=parseInt(String(h).replace('#',''),16);return [(v>>16)&255,(v>>8)&255,v&255];}
function rgba(h,a){var c=hex(h);return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';}
function shade(h,d){var c=hex(h).map(function(x){return Math.max(0,Math.min(255,x+d));});return '#'+c.map(function(x){return ('0'+x.toString(16)).slice(-2);}).join('');}

function resize(){
  W=window.innerWidth;H=window.innerHeight;
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  cv.style.width=W+'px';cv.style.height=H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
  initInk();
}
/* 纸纹墨迹：多层径向渐变缓慢漂移（离线 canvas，零外链） */
function initInk(){
  blobs=[];
  for(var i=0;i<7;i++){
    blobs.push({x:Math.random()*W,y:Math.random()*H,r:180+Math.random()*260,
      a:.03+Math.random()*.045, s:.05+Math.random()*.12, p:Math.random()*Math.PI*2});
  }
}
function drawInk(ts){
  ctx.clearRect(0,0,W,H);
  for(var i=0;i<blobs.length;i++){
    var b=blobs[i];
    b.p+=.004;
    var x=b.x+Math.cos(ts/9000+b.p)*40, y=b.y+Math.sin(ts/11000+b.p)*26;
    var g=ctx.createRadialGradient(x,y,0,x,y,b.r);
    g.addColorStop(0,rgba(state.zhi,b.a));
    g.addColorStop(1,rgba(state.zhi,0));
    ctx.fillStyle=g;ctx.fillRect(x-b.r,y-b.r,b.r*2,b.r*2);
  }
}

/* 书脊跟随：每根按与光标的水平距离取延迟，形成“依次转头”的层次 */
var spines=[];
function buildShelf(){
  var el=document.getElementById('shelf');
  el.innerHTML='';
  spines=[];
  BOOKS.forEach(function(name,i){
    var d=document.createElement('div');
    d.className='spine s'+((i%8)+1);
    d.style.height=(50+((i*13)%32))+'%';
    d.textContent=name;
    el.appendChild(d);
    spines.push({el:d,x:0,y:0,tx:0,ty:0,delay:i});
  });
}
function track(ts){
  if(px>-900){
    spines.forEach(function(s,i){
      var b=s.el.getBoundingClientRect();
      var cx=b.left+b.width/2, cy=b.top+b.height/2;
      var dx=(mx-cx)*(1/Math.max(240,Math.abs(mx-cx)+140));
      var dy=(my-cy)*(1/Math.max(240,Math.abs(my-cy)+140));
      s.tx=dx*26*state.fudu; s.ty=dy*10*state.fudu;
    });
  }else{ spines.forEach(function(s){s.tx=0;s.ty=0;}); }
  spines.forEach(function(s,i){
    var k=Math.max(.02,state.yanchi/(1+i*.12));
    s.x+=(s.tx-s.x)*k; s.y+=(s.ty-s.y)*k;
    s.el.style.transform='translate('+s.x.toFixed(2)+'px,'+s.y.toFixed(2)+'px) rotate('+(s.x*.16).toFixed(2)+'deg)';
    s.el.classList.toggle('hot', Math.abs(s.x)>4.2);
  });
  drawInk(ts);
  requestAnimationFrame(track);
}
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--ye',state.ye);r.setProperty('--zhi',state.zhi);
  r.setProperty('--ji',state.ji);r.setProperty('--ying',state.ying);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
}
window.addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(px<-900){px=mx;py=my;}px=mx;py=my;});
window.addEventListener('pointerleave',function(){mx=-999;my=-999;});
document.getElementById('sub').addEventListener('submit',function(e){
  e.preventDefault();
  document.getElementById('msg').textContent='已登记 ' + document.getElementById('em').value;
});
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){resize();buildShelf();},140);});
resize();buildShelf();apply();
requestAnimationFrame(track);
</script>
</body>
</html>
`,
    片段: `:root{--beijing:#15131F;--qiu1:#FF7A9C;--qiu2:#7AD7FF;--yanbai:#FBF7F0;--hongmo:#3A2C5A;--zi:#F4F1EA;--zhucai:#FFC24B;--yanjing:62px;--jianju:24px;}
.foot{position:relative;overflow:hidden;min-height:100vh;display:flex;flex-direction:column;justify-content:center;background:var(--beijing);}
.eye{width:var(--yanjing);height:var(--yanjing);border-radius:50%;background:var(--yanbai);position:relative;box-shadow:inset 0 -6px 12px rgba(0,0,0,.12);}
.eye .iris{position:absolute;left:50%;top:50%;width:52%;height:52%;border-radius:50%;background:var(--hongmo);transform:translate(-50%,-50%);transition:transform .05s linear;}
.cta{background:var(--zhucai);color:#1a1320;border-radius:999px;padding:13px 26px;font-weight:700;}`,
    参数: [
    { 键: "ye", 名: "夜底色", 类型: "color", 默认: "#141B2B" },
    { 键: "zhi", 名: "纸白色", 类型: "color", 默认: "#E8E0CE" },
    { 键: "ji", 名: "书脊色", 类型: "color", 默认: "#2B3448" },
    { 键: "ying", 名: "朱砂强调", 类型: "color", 默认: "#B4462F" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "书脊间距", 类型: "slider", 默认: 20, 最小: 8, 最大: 48, 步长: 1 },
    { 键: "yuanjiao", 名: "书脊圆角", 类型: "slider", 默认: 4, 最小: 0, 最大: 14, 步长: 1 },
    { 键: "yanchi", 名: "跟随延迟", 类型: "slider", 默认: 0.14, 最小: 0.02, 最大: 0.4, 步长: 0.01 },
    { 键: "fudu", 名: "跟随幅度", 类型: "slider", 默认: 1, 最小: 0, 最大: 2, 步长: 0.05 }
  ],
    来源: "机制参考自 motionsites.ai（2026-09-19 分析）：指针驱动的视线追踪 + 延迟缓动 + 多层漂移背景；已换题重推为「独立书店 · 夜读」，视觉表达全部重做，非复刻"
  },
  {
    id: "S28",
    风格名: "香氛实验室",
    适配端: "通用",
    风格: "品牌海报",
    场景: "电商·预订",
    骨架: "左栏配方卡（前中后调）+ 右侧香雾舞台与标题 + 底部预约表单",
    配色: {
      "深墨绿(纸底)": "62%",
      "浅墨绿晕染与文字": "28%",
      "淡绿(订阅按钮)": "10%"
    },
    布局骨架: "左 320px 配方卡（品牌 + 三条香调）/ 右上舞台（主标题压在雾团之上）/ 右下预约横条",
    重色落点: "香雾紫只出现在雾团与按钮上；左栏配方卡保持低饱和，雾团是画面唯一的亮源",
    第一屏内容: "左上「砚台香研室 PERFUME LAB」；左栏前调 / 中调 / 后调三段说明；右侧主标题「把一段气味调成可以带走的形状」；底部试香预约表单",
    删减元素: "不做商品卡、不做价格、不做成分表长列表；同屏只有一个表单与一枚按钮",
    适用: "香氛、护肤、饮品等「需要氛围与配方说明」的品牌页；强调工艺与嗅觉记忆的产品页",
    禁忌: "多 SKU 电商列表；需要快速转化的促销页；把雾团做成静态渐变图（会失去扩散感）",
    参考站: [
      "motionsites.ai（Heritage Grove）"
    ],
    我的说明: "雾团扩散机制保留自原作的墨色晕染：多个径向雾团从各自核心向外缓慢扩散、衰减、重置，色相由暗夜紫换成香雾紫。版式从「页脚订阅」扩展为「配方卡 + 舞台 + 预约」，把订阅动作升级为更贴合香氛的到店试香预约。",
    Agent提示词: `【香氛实验室 · 设计语言宪法】
效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。

1. 视觉主题与氛围
调香台上没有标签，只有正在散开的雾气。氛围私密、缓慢、带一点实验感；密度低、气质优雅、情绪是「停下来闻一下」。

2. 色彩板与角色
- night 暗夜底 #1A1620 —— 主底，占 50%
- mist 香雾紫 #C9A6E8 —— 雾团与按钮，占 22%
- wood 深香材 #3B3046 —— 雾团的暗部与分隔线，占 18%
- text 正文 #EFE8F2 / mute #9A8FA8 —— 占 10%
雾团以外不得出现大面积高明度色。

3. 字体规则
- display：Georgia / Songti SC 衬线，2.5×基准字号，行高 1.28
- body：同族 0.9×基准字号，行高 1.7
- meta：Consolas 等宽，10.5px，字距 .28em

4. 组件规范
- 香调卡：小标题（前调 / 中调 / 后调）+ 一句人话说明，用 1px 分隔线分节
- 输入框：下划线式，聚焦时底线染香雾紫
- 按钮：香雾紫实心 + 暗色字，唯一一枚

5. 布局法
左栏固定 320px，间距刻度 22/36；舞台内标题居于视觉中心偏左，不与雾团抢中心。

6. 深度与层级
z0 暗夜底 → z1 canvas 雾团（lighter 混合）→ z2 配方卡与标题。雾团必须有扩散感，不用静态渐变。

7. 该做 / 不该做
该做：让雾团持续缓慢扩散与重置；香调说明写成能读懂的人话；表单提交后回显。
不该做：贴产品照片、做价格表、把雾团做成彩色烟雾照片、让文字压在雾团最亮处。

8. 响应式行为
断点 860px：改为单列（舞台 → 配方卡 → 预约条）；触控目标 ≥44px；窄屏雾团数量降到参数值的 60%。

9. Agent 提示词指南
配色卡：底 #1A1620 / 香雾 #C9A6E8 / 深香材 #3B3046 / 正文 #EFE8F2；字号卡：16 / 40 / 11。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，雾团 canvas 生成）。`,
    演示页: "assets/demos/方案-香氛实验室.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>香氛实验室</title>
<style>
:root{
  --ye:#1A1620;        /* 暗夜调香台 */
  --wu:#C9A6E8;        /* 香雾淡紫 */
  --shen:#3B3046;      /* 深香材色 */
  --zi:#EFE8F2;
  --ci:#9A8FA8;
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:12px;
  --miwu:9;            /* 雾团数 */
  --kuosan:1;          /* 扩散速度 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--ye);color:var(--zi);overflow:hidden;min-height:100vh;
  font-family:Georgia,"Songti SC",serif;display:grid;grid-template-columns:minmax(240px,320px) 1fr;
  grid-template-rows:1fr auto;grid-template-areas:"card mist" "card book"}
#mist{position:absolute;inset:0;width:100%;height:100%;z-index:0}
.card{grid-area:card;position:relative;z-index:2;padding:calc(var(--jianju)*1.6) calc(var(--jianju)*1.4);
  border-right:1px solid rgba(201,166,232,.14);display:flex;flex-direction:column;gap:calc(var(--jianju)*1.1)}
.brand{font-size:calc(var(--zihao)*1.3);letter-spacing:.14em}
.brand i{font-style:normal;display:block;margin-top:8px;font-family:Consolas,monospace;font-size:10.5px;
  letter-spacing:.28em;color:var(--ci)}
.note{display:flex;flex-direction:column;gap:8px}
.note h4{font-size:calc(var(--zihao)*.76);font-weight:400;color:var(--ci);letter-spacing:.16em;font-family:Consolas,monospace}
.note p{font-size:calc(var(--zihao)*.9);line-height:1.7;color:color-mix(in srgb,var(--zi) 88%,transparent)}
.bar{height:1px;background:rgba(201,166,232,.18)}
.mist{grid-area:mist;position:relative;z-index:2;display:flex;align-items:center;padding:calc(var(--jianju)*1.6)}
h1{font-size:calc(var(--zihao)*2.5);line-height:1.28;letter-spacing:.03em;max-width:12em}
h1 span{color:var(--wu)}
.book{grid-area:book;position:relative;z-index:2;border-top:1px solid rgba(201,166,232,.14);
  padding:calc(var(--jianju)*1.1) calc(var(--jianju)*1.6);display:flex;gap:16px;align-items:center;flex-wrap:wrap;
  background:linear-gradient(180deg,transparent,rgba(26,22,32,.72))}
form{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
label{font-size:calc(var(--zihao)*.76);color:var(--ci)}
input{background:transparent;border:none;border-bottom:1px solid rgba(239,232,242,.26);color:var(--zi);
  font-family:Consolas,monospace;font-size:calc(var(--zihao)*.82);padding:7px 2px;width:170px;outline:none}
input:focus{border-color:var(--wu)}
button{background:var(--wu);color:#1A1620;border:none;border-radius:var(--yuanjiao);
  padding:10px 18px;font-family:inherit;font-size:calc(var(--zihao)*.78);cursor:pointer}
.book em{font-style:normal;margin-left:auto;font-family:Consolas,monospace;font-size:11px;color:var(--ci);letter-spacing:.1em}
@media (max-width:860px){
  body{grid-template-columns:1fr;grid-template-areas:"mist" "card" "book"}
  .card{border-right:none;border-top:1px solid rgba(201,166,232,.14)}
}
</style>
</head>
<body>
<canvas id="mist"></canvas>

<div class="card">
  <div class="brand">砚台香研室<i>PERFUME LAB</i></div>
  <div class="bar"></div>
  <div class="note">
    <h4>前调</h4><p>佛手柑、苦橙叶——开场三分钟，先把空气洗一遍。</p>
  </div>
  <div class="note">
    <h4>中调</h4><p>鸢尾、紫罗兰叶、白茶。这一层停留最久，也是它被记住的原因。</p>
  </div>
  <div class="note">
    <h4>后调</h4><p>雪松、琥珀、一点点泥土。留香八小时以上。</p>
  </div>
</div>

<div class="mist">
  <h1>把一段<span>气味</span><br>调成可以带走的形状</h1>
</div>

<div class="book">
  <form id="sub">
    <label for="em">到店试香预约</label>
    <input id="em" type="email" placeholder="you@example.com" required>
    <button type="submit">预约</button>
  </form>
  <em id="msg">每批次仅 40 瓶 · 需提前三日</em>
</div>

<script>
var state = {
  ye:'#1A1620', wu:'#C9A6E8', shen:'#3B3046', zi:'#EFE8F2',
  zihao:16, jianju:22, yuanjiao:12, miwu:9, kuosan:1
};
var cv=document.getElementById('mist'), ctx=cv.getContext('2d');
var W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);
var mists=[];

function hex(h){var v=parseInt(String(h).replace('#',''),16);return [(v>>16)&255,(v>>8)&255,v&255];}
function rgba(h,a){var c=hex(h);return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';}

function resize(){
  W=window.innerWidth;H=window.innerHeight;
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  cv.style.width=W+'px';cv.style.height=H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
  initMist();
}
/* 香雾：多个径向雾团各自从核心向外缓慢扩散、衰减、重置（离线 canvas，零外链） */
function initMist(){
  mists=[];
  var n=Math.max(3,Math.round(state.miwu));
  for(var i=0;i<n;i++){
    mists.push({x:.25+Math.random()*.7,y:.15+Math.random()*.7,
      r:.10+Math.random()*.16, v:.05+Math.random()*.09, a:.16+Math.random()*.14,
      tone:Math.random()>.55?'wu':'shen'});
  }
}
function draw(ts){
  ctx.clearRect(0,0,W,H);
  ctx.globalCompositeOperation='lighter';
  var minWH=Math.min(W,H);
  for(var i=0;i<mists.length;i++){
    var m=mists[i];
    m.r+=m.v*.0016*state.kuosan;
    if(m.r>.75){m.r=.10;m.x=.25+Math.random()*.7;m.y=.15+Math.random()*.7;}
    var x=m.x*W+Math.cos(ts/9000+i)*22, y=m.y*H+Math.sin(ts/11000+i)*16;
    var R=m.r*minWH;
    var g=ctx.createRadialGradient(x,y,0,x,y,R);
    var c=state[m.tone];
    g.addColorStop(0,rgba(c,m.a*(1-m.r/.8)));
    g.addColorStop(.55,rgba(c,m.a*.35*(1-m.r/.8)));
    g.addColorStop(1,rgba(c,0));
    ctx.fillStyle=g;ctx.fillRect(x-R,y-R,R*2,R*2);
  }
}
var prev=0;
function loop(ts){
  /* prefers-reduced-motion 下只画一帧，避免持续动画 */
  if(!reduce) draw(ts);
  requestAnimationFrame(loop);
}
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function apply(){
  var r=document.documentElement.style;
  r.setProperty('--ye',state.ye);r.setProperty('--wu',state.wu);
  r.setProperty('--shen',state.shen);r.setProperty('--zi',state.zi);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  initMist();
}
document.getElementById('sub').addEventListener('submit',function(e){
  e.preventDefault();
  document.getElementById('msg').textContent='已登记 '+document.getElementById('em').value+' · 到店前一日短信提醒';
});
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(resize,140);});
resize();apply();
draw(0);
if(!reduce) requestAnimationFrame(loop);
</script>
</body>
</html>
`,
    片段: `:root{--zhi:#0C1A12;--mo1:#1F4A33;--mo2:#3C7A54;--zi:#EAF3EC;--zhucai:#9FD8AE;--kuang:1px;--biaoti:34px;--jianju:26px;}
.foot{position:relative;overflow:hidden;min-height:100vh;display:flex;flex-direction:column;justify-content:center;background:var(--zhi);}
.sub{display:grid;grid-template-columns:1.4fr 1fr;gap:calc(var(--jianju)*1.6);align-items:center;}
.sub h2{font-size:var(--biaoti);font-weight:400;line-height:1.12;max-width:18ch;}
.sub h2 em{font-style:normal;color:var(--zhucai);}
.form{display:flex;gap:10px;background:rgba(255,255,255,.04);border:var(--kuang) solid rgba(159,216,174,.35);border-radius:14px;padding:8px 8px 8px 16px;}
.form button{background:var(--zhucai);color:#0C1A12;border-radius:10px;padding:11px 20px;font-weight:700;}`,
    参数: [
    { 键: "ye", 名: "暗夜底色", 类型: "color", 默认: "#1A1620" },
    { 键: "wu", 名: "香雾紫", 类型: "color", 默认: "#C9A6E8" },
    { 键: "shen", 名: "深香材色", 类型: "color", 默认: "#3B3046" },
    { 键: "zi", 名: "正文字色", 类型: "color", 默认: "#EFE8F2" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "栏内间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "圆角", 类型: "slider", 默认: 12, 最小: 0, 最大: 24, 步长: 1 },
    { 键: "miwu", 名: "雾团数量", 类型: "slider", 默认: 9, 最小: 3, 最大: 16, 步长: 1 },
    { 键: "kuosan", 名: "扩散速度", 类型: "slider", 默认: 1, 最小: 0, 最大: 4, 步长: 0.05 }
  ],
    来源: "机制参考自 motionsites.ai（2026-09-19 分析）：多径向墨色团缓慢漂移扩散 + 订阅表单；已换题重推为「香氛实验室」，视觉表达全部重做，非复刻"
  },
  {
    id: "S29",
    风格名: "夜跑城市地图",
    适配端: "通用",
    风格: "科技未来",
    场景: "落地页·发布页",
    骨架: "全屏路网 canvas + 左下路线卡 + 右上配速数据 + 底部大标题",
    配色: {
      "暗紫黑(底图与舞台)": "62%",
      "霓虹粉·青(揭示层)": "28%",
      "冷白(文字与聚光芯)": "10%"
    },
    布局骨架: "HUD 三段：左上只读标签（夜间跑 · 江畔环线）/ 右上三组数据（配速 / 里程 / 心率）/ 底部左标题 + 右路线卡；canvas 铺满作为底",
    重色落点: "荧光青柠只给跑线与关键数字；头灯照亮的范围之外，路网一律压到 55% 明度",
    第一屏内容: "左上「NIGHT RUN · 09-19 21:40 江畔环线 · 东段」；右上三组实时读数；底部「头灯照到哪儿，路就亮到哪儿」与今晚四段路线卡",
    删减元素: "不做地图厂商底图、不做社交、不做排行榜；同屏只有一个卡片与三组数字",
    适用: "运动、户外、汽车等需要「夜间氛围 + 数据感」的产品页；活动报名与路线预告页",
    禁忌: "需要精确定位的导航界面；内容密集的后台；照搬真实地图瓦片（外链且不可控）",
    参考站: [
      "motionsites.ai（Cyber Ronin）"
    ],
    我的说明: "聚光机制保留自原作的光标照亮：canvas 先画一遍压暗的路网，再在光标位置裁剪出圆形区域重画高亮版，形成「头灯」效果；空闲时自动巡游，headless 截图不依赖鼠标。路网与跑线全部就地生成。",
    Agent提示词: `【夜跑城市地图 · 设计语言宪法】
效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。

1. 视觉主题与氛围
晚上九点四十的江边，只有头灯亮着。氛围动、冷、专注；密度低、气质硬朗、情绪是「跑起来」。

2. 色彩板与角色
- night 夜城底 #0B0D0A —— 主底，占 62%
- lime 荧光青柠 #B6FF3C —— 跑线与关键数字，占 14%
- street 街廓线 #4A5546 —— 未被照亮的路网（压到 55% 明度），占 16%
- text 正文 #E9F2E2 / mute #7C8A74 —— 占 8%
青柠色不得用于大块填充。

3. 字体规则
- display：无衬线，2.2×基准字号，行高 1.3
- body：0.78×基准字号
- data：Consolas 等宽，1.5×基准字号；标签 11px、字距 .14em

4. 组件规范
- 路线卡：半透明深底 + 青柠 28% 描边 + 模糊背景；四行「节点 + 里程」
- 数据组：数值在上、标签在下，等宽字体
- 无按钮：本页动作只有一个查看入口，保持 HUD 感

5. 布局法
HUD 用 grid 三段定位在 canvas 之上；边距由参数控制；底部标题与路线卡两端对齐。

6. 深度与层级
z0 压暗路网 → z1 头灯裁剪区（高亮路网）→ z2 渐隐环 → z3 HUD。头灯必须有明确的圆形边界与柔和外沿。

7. 该做 / 不该做
该做：头灯跟手且有空闲巡游；配速与里程随参数真实变化；路线节点与里程数自洽。
不该做：引第三方地图瓦片、加社交/排行榜、把跑线做成直线、使用暖色。

8. 响应式行为
断点 760px：数据组字号降一档、间距收窄；路线卡改为整宽；触控目标 ≥44px；头灯半径按屏宽等比缩小。

9. Agent 提示词指南
配色卡：底 #0B0D0A / 跑线 #B6FF3C / 街廓 #4A5546 / 文字 #E9F2E2；字号卡：16 / 35 / 24。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，路网与头灯一律 canvas 绘制）。`,
    演示页: "assets/demos/方案-夜跑城市地图.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>夜跑城市地图</title>
<style>
:root{
  --di:#0B0D0A;        /* 夜里没灯的城市 */
  --lin:#B6FF3C;       /* 荧光跑线 */
  --xian:#4A5546;      /* 街廓线 */
  --zi:#E9F2E2;
  --ci:#7C8A74;
  --zihao:16px;
  --jianju:20px;
  --yuanjiao:10px;
  --banjing:230px;     /* 头灯照到的范围 */
  --peisu:5.4;         /* 配速 min/km */
  --luxian:8.2;        /* 里程 km */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--di);color:var(--zi);overflow:hidden;min-height:100vh;
  font-family:-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
#map{position:absolute;inset:0;width:100%;height:100%}
.hud{position:relative;z-index:3;height:100vh;display:grid;
  grid-template-columns:1fr auto;grid-template-rows:auto 1fr auto;padding:calc(var(--jianju)*1.4)}
.hud>*{pointer-events:none}
.tag{grid-column:1;font-family:Consolas,monospace;font-size:11px;letter-spacing:.22em;color:var(--ci)}
.tag b{display:block;margin-top:6px;color:var(--lin);font-weight:400}
.stats{grid-column:2;grid-row:1;text-align:right;display:flex;gap:calc(var(--jianju)*1.4);align-items:flex-start}
.stats div{display:flex;flex-direction:column;gap:4px}
.stats b{font-family:Consolas,monospace;font-size:calc(var(--zihao)*1.5);color:var(--zi);font-weight:500}
.stats span{font-size:11px;color:var(--ci);letter-spacing:.14em}
.hero{grid-column:1 / -1;grid-row:3;display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap}
h1{font-size:calc(var(--zihao)*2.2);line-height:1.3;letter-spacing:.01em;max-width:14em}
h1 em{font-style:normal;color:var(--lin)}
.route{pointer-events:auto;background:rgba(11,13,10,.72);border:1px solid rgba(182,255,60,.28);
  border-radius:var(--yuanjiao);padding:14px 18px;backdrop-filter:blur(6px);
  display:flex;flex-direction:column;gap:8px;min-width:230px}
.route i{font-style:normal;font-family:Consolas,monospace;font-size:11px;color:var(--ci);letter-spacing:.16em}
.route ol{list-style:none;display:flex;flex-direction:column;gap:6px;font-size:calc(var(--zihao)*.78)}
.route li{display:flex;justify-content:space-between;gap:14px;color:color-mix(in srgb,var(--zi) 82%,transparent)}
.route li span{font-family:Consolas,monospace;color:var(--lin)}
@media (max-width:760px){.stats{gap:16px}.stats b{font-size:calc(var(--zihao)*1.1)}}
</style>
</head>
<body>
<canvas id="map"></canvas>

<div class="hud">
  <div class="tag">NIGHT RUN · 09-19 21:40<b>江畔环线 · 东段</b></div>
  <div class="stats">
    <div><b id="v1">5'24"</b><span>配速 /KM</span></div>
    <div><b id="v2">8.2</b><span>里程 KM</span></div>
    <div><b id="v3">142</b><span>心率 BPM</span></div>
  </div>
  <div class="hero">
    <h1>头灯照到哪儿，<br>路就<em>亮</em>到哪儿</h1>
    <div class="route">
      <i>今晚路线</i>
      <ol>
        <li>江畔北入口<span>0.0 km</span></li>
        <li>旧铁桥折返<span>3.4 km</span></li>
        <li>堤顶直道<span>6.1 km</span></li>
        <li>回到起点<span>8.2 km</span></li>
      </ol>
    </div>
  </div>
</div>

<script>
var state = {
  di:'#0B0D0A', lin:'#B6FF3C', xian:'#4A5546', zi:'#E9F2E2',
  zihao:16, jianju:20, yuanjiao:10, banjing:230, peisu:5.4, luxian:8.2
};
var cv=document.getElementById('map'), ctx=cv.getContext('2d');
var W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);
var streets=[], route=[];
var mx=-999,my=-999,tx=.5,ty=.52,cx=.5,cy=.52,idleAt=0;

function hex(h){var v=parseInt(String(h).replace('#',''),16);return [(v>>16)&255,(v>>8)&255,v&255];}
function rgba(h,a){var c=hex(h);return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';}

function buildStreets(){
  streets=[];
  var n=14;
  for(var i=0;i<=n;i++){
    var y=(i/n)*H + (Math.random()-.5)*10;
    streets.push({a:'h',p:y,from:Math.random()*W*.3,to:W*(.6+Math.random()*.4)});
  }
  for(var j=0;j<=n;j++){
    var x=(j/n)*W + (Math.random()-.5)*10;
    streets.push({a:'v',p:x,from:Math.random()*H*.3,to:H*(.6+Math.random()*.4)});
  }
  /* 跑线：一条沿街折行的路径，用荧光色高亮 */
  route=[];
  var px=W*.18, py=H*.78;
  route.push([px,py]);
  for(var k=0;k<9;k++){
    px+=(k%2===0?1:-1)*(W*.075);
    route.push([px,py]);
    py-=(H*.062);
    route.push([px,py]);
  }
}
function resize(){
  W=window.innerWidth;H=window.innerHeight;
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  cv.style.width=W+'px';cv.style.height=H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
  buildStreets();
}
function drawMap(dim){
  ctx.lineCap='round';
  for(var i=0;i<streets.length;i++){
    var s=streets[i];
    ctx.beginPath();
    if(s.a==='h'){ctx.moveTo(s.from,s.p);ctx.lineTo(s.to,s.p);}
    else{ctx.moveTo(s.p,s.from);ctx.lineTo(s.p,s.to);}
    ctx.strokeStyle=rgba(state.xian,dim?.55:.95);
    ctx.lineWidth=dim?1:1.4;
    ctx.stroke();
  }
  ctx.beginPath();
  route.forEach(function(p,i){i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);});
  ctx.strokeStyle=rgba(state.lin,dim?.18:1);
  ctx.lineWidth=dim?2:3.4;
  ctx.stroke();
  /* 起点/终点 */
  if(route.length){
    var s0=route[0], s1=route[route.length-1];
    [s0,s1].forEach(function(p,k){
      ctx.beginPath();ctx.arc(p[0],p[1],4.5,0,Math.PI*2);
      ctx.fillStyle=rgba(state.lin,dim?.2:.95);ctx.fill();
    });
  }
}
/* 头灯机制：光标决定照亮位置，灯圈内画亮版地图；空闲时自动巡游（headless 不依赖鼠标） */
function draw(ts){
  if(!idleAt||ts-idleAt>1600){ tx=.5+Math.cos(ts/4200)*.22; ty=.52+Math.sin(ts/3300)*.14; }
  cx+=(tx-cx)*.06; cy+=(ty-cy)*.06;
  ctx.clearRect(0,0,W,H);
  drawMap(true);
  var R=state.banjing, X=cx*W, Y=cy*H;
  ctx.save();
  ctx.beginPath();ctx.arc(X,Y,R,0,Math.PI*2);ctx.clip();
  ctx.fillStyle=rgba(state.di,.86);ctx.fillRect(X-R,Y-R,R*2,R*2);
  drawMap(false);
  ctx.restore();
  var g=ctx.createRadialGradient(X,Y,R*.72,X,Y,R);
  g.addColorStop(0,rgba(state.di,0));g.addColorStop(1,rgba(state.di,.92));
  ctx.fillStyle=g;ctx.fillRect(X-R,Y-R,R*2,R*2);
  requestAnimationFrame(draw);
}
function paceText(p){
  var m=Math.floor(p), s=Math.round((p-m)*60);
  return m+"'"+(s<10?'0':'')+s+'"';
}
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--lin',state.lin);
  r.setProperty('--xian',state.xian);r.setProperty('--zi',state.zi);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  r.setProperty('--banjing',state.banjing+'px');
  document.getElementById('v1').textContent=paceText(state.peisu);
  document.getElementById('v2').textContent=state.luxian.toFixed(1);
}
window.addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;
  tx=mx/window.innerWidth;ty=my/window.innerHeight;idleAt=performance.now();});
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(resize,140);});
resize();apply();
requestAnimationFrame(draw);
</script>
</body>
</html>
`,
    片段: `:root{--di:#0A0712;--neon1:#FF2E88;--neon2:#27E8FF;--zi:#F4F0FF;--zhucai:#FF2E88;--radius:300px;--faguang:18;--biaoti:96px;--jianju:24px;}
.stage{position:relative;width:100%;height:100vh;min-height:560px;overflow:hidden;background:var(--di);}
.layer{position:absolute;inset:0;background-size:cover;background-position:center;}
.base{z-index:10;}
.reveal{z-index:30;pointer-events:none;}
.glow{position:absolute;z-index:40;width:380px;height:380px;margin:-190px 0 0 -190px;border-radius:50%;pointer-events:none;background:radial-gradient(circle, color-mix(in srgb,var(--zi) calc(var(--faguang)*1%), transparent) 0%, transparent 60%);}
.head h1{font-size:calc(var(--biaoti)*1px);line-height:1.0;letter-spacing:.02em;color:var(--zi);text-shadow:0 8px 40px rgba(0,0,0,.55);}`,
    参数: [
    { 键: "di", 名: "夜城底色", 类型: "color", 默认: "#0B0D0A" },
    { 键: "lin", 名: "荧光跑线", 类型: "color", 默认: "#B6FF3C" },
    { 键: "xian", 名: "街廓线色", 类型: "color", 默认: "#4A5546" },
    { 键: "zi", 名: "正文字色", 类型: "color", 默认: "#E9F2E2" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "HUD 边距", 类型: "slider", 默认: 20, 最小: 12, 最大: 36, 步长: 1 },
    { 键: "yuanjiao", 名: "卡片圆角", 类型: "slider", 默认: 10, 最小: 0, 最大: 22, 步长: 1 },
    { 键: "banjing", 名: "头灯半径", 类型: "slider", 默认: 230, 最小: 90, 最大: 420, 步长: 5 },
    { 键: "peisu", 名: "配速(min/km)", 类型: "slider", 默认: 5.4, 最小: 3, 最大: 9, 步长: 0.1 },
    { 键: "luxian", 名: "里程(km)", 类型: "slider", 默认: 8.2, 最小: 1, 最大: 42, 步长: 0.1 }
  ],
    来源: "机制参考自 motionsites.ai（2026-09-19 分析）：光标驱动的圆形聚光遮罩 + 实时绘制；已换题重推为「夜跑城市地图」，视觉表达全部重做，非复刻"
  },
  {
    id: "S30",
    风格名: "天文台观测数据",
    适配端: "通用",
    风格: "科技未来",
    场景: "后台·数据看板",
    骨架: "左侧观测日志栏 + 星野与光谱柱舞台 + 底部数据读数带",
    配色: {
      "深蓝(背景渐变)": "62%",
      "玻璃白与文字": "26%",
      "青绿(图表与 CTA)": "12%"
    },
    布局骨架: "左 300px 日志栏（站名 + 三条观测记录）/ 主舞台（星野点阵 + 地平线上的光谱柱）/ 底部读数带（光谱型 / 温度 / 星等 / 距离）",
    重色落点: "橙红只给光谱里被标出的吸收线（每 7 根一根）与读数里的单位；玻璃蓝承担柱体，星白承担文字",
    第一屏内容: "左上「OBSERVATORY 05 北岭观测站」与三条观测记录；舞台上是星野与一排高低起伏的光谱柱；底部四项读数与采样状态",
    删减元素: "不做折线图、不做表格、不做图例框；同屏只有一排柱体与一行读数",
    适用: "天文、科研、数据服务的成果页；需要「把一夜观测讲清楚」的技术发布页",
    禁忌: "商业仪表盘；需要对比多组数据的分析页；把柱体做成静态图片（会失去采样感）",
    参考站: [
      "motionsites.ai（Apogee）"
    ],
    我的说明: "数据柱机制保留自原作的玻璃数据条，但把玻璃换成光谱：柱体是连续采样出的谱线强度，每 7 根标出一根吸收线作为热点，颜色从玻璃蓝换成光谱橙红。星野与柱体全部 canvas 绘制，读数与参数联动。",
    Agent提示词: `【天文台观测数据 · 设计语言宪法】
效力声明：本方案为本页唯一设计权威，任何冲突以本文件为准。

1. 视觉主题与氛围
海拔两千米的凌晨，星野安静地铺开，数据在下面一条条长出来。氛围克制、精密、有夜的温度；密度中低、气质冷静、情绪是「记录下来了」。

2. 色彩板与角色
- night 夜空 #0A1024 —— 主底（径向渐变自右上），占 54%
- glass 谱柱蓝 #8FA8E8 —— 柱体主体，占 20%
- star 星白 #E8EDF7 —— 文字与星点，占 18%
- line 光谱橙红 #FF6B4A —— 吸收线热点与单位，占 8%

3. 字体规则
- display：无衬线 600 字重，2.3×基准字号，行高 1.3
- body：0.8×基准字号，行高 1.75
- data：Consolas 等宽，1.25×基准字号；标签 10.5px、字距 .16em

4. 组件规范
- 日志条目：1px 分隔线 + 等宽时间戳 + 一句人话记录
- 谱柱：圆角矩形、顶部亮底部透明的线性渐变、每 7 根一根橙红
- 读数带：四组「数值 + 单位 + 标签」，右端一句采样状态

5. 布局法
左栏 300px；主舞台 flex:1；读数带横跨右侧；间距刻度 22/36。

6. 深度与层级
z0 夜空 → z1 星野点阵 → z2 地平线遮挡渐变 → z3 谱柱 → z4 文字。地平线用渐变把星野压下去，形成「地面」。

7. 该做 / 不该做
该做：谱柱持续起伏（有采样感）；读数随参数联动；地平线与柱底严格对齐。
不该做：加图例框、加折线、把柱体做成图片、使用暖色大面积填充。

8. 响应式行为
断点 860px：改为单列（舞台 → 读数 → 日志）；触控目标 ≥44px；窄屏柱体数量降到参数值的 60%。

9. Agent 提示词指南
配色卡：夜空 #0A1024 / 谱柱 #8FA8E8 / 星白 #E8EDF7 / 热点 #FF6B4A；字号卡：16 / 36.8 / 20。请把内容套进上述设计语言，输出完整可直接打开的单文件 HTML（零外链，星野与谱柱 canvas 生成）。`,
    演示页: "assets/demos/方案-天文台观测数据.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>天文台观测数据</title>
<style>
:root{
  --di:#0A1024;        /* 高海拔夜空 */
  --guang:#FF6B4A;     /* 光谱橙红 */
  --xing:#E8EDF7;      /* 星白 */
  --bo:#8FA8E8;        /* 玻璃蓝 */
  --ci:#7C8AAE;
  --zihao:16px;
  --jianju:22px;
  --yuanjiao:14px;
  --zhu:42;            /* 光谱柱数 */
  --sudu:1;            /* 采样速度 */
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:radial-gradient(120% 100% at 72% 8%,#132348 0%,var(--di) 58%);
  color:var(--xing);overflow:hidden;min-height:100vh;
  font-family:-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  display:grid;grid-template-columns:minmax(230px,300px) 1fr;grid-template-rows:1fr auto;
  grid-template-areas:"log stage" "log read"}
#sky{position:absolute;inset:0;width:100%;height:100%;z-index:0}
.log{grid-area:log;position:relative;z-index:2;padding:calc(var(--jianju)*1.5) calc(var(--jianju)*1.2);
  border-right:1px solid rgba(143,168,232,.16);display:flex;flex-direction:column;gap:16px}
.brand{font-family:Consolas,monospace;font-size:11px;letter-spacing:.24em;color:var(--ci)}
.brand b{display:block;margin-top:8px;font-family:inherit;font-size:calc(var(--zihao)*1.35);
  letter-spacing:.1em;color:var(--xing);font-weight:500}
.entry{display:flex;flex-direction:column;gap:6px;padding-top:12px;border-top:1px solid rgba(143,168,232,.12)}
.entry i{font-style:normal;font-family:Consolas,monospace;font-size:10.5px;color:var(--ci);letter-spacing:.14em}
.entry p{font-size:calc(var(--zihao)*.8);line-height:1.75;color:color-mix(in srgb,var(--xing) 84%,transparent)}
.stage{grid-area:stage;position:relative;z-index:2;min-height:0}
h1{position:absolute;left:calc(var(--jianju)*1.5);top:calc(var(--jianju)*1.3);
  font-size:calc(var(--zihao)*2.3);font-weight:600;line-height:1.3;letter-spacing:.01em}
h1 small{display:block;margin-top:10px;font-size:calc(var(--zihao)*.78);font-weight:400;color:var(--ci);letter-spacing:.06em}
.read{grid-area:read;position:relative;z-index:2;display:flex;gap:calc(var(--jianju)*1.6);flex-wrap:wrap;
  align-items:baseline;padding:calc(var(--jianju)*1.1) calc(var(--jianju)*1.5);
  border-top:1px solid rgba(143,168,232,.16);background:linear-gradient(180deg,transparent,rgba(10,16,36,.7))}
.read div{display:flex;flex-direction:column;gap:4px}
.read b{font-family:Consolas,monospace;font-size:calc(var(--zihao)*1.25);font-weight:500;color:var(--xing)}
.read b em{font-style:normal;color:var(--guang)}
.read span{font-size:10.5px;color:var(--ci);letter-spacing:.16em}
.read p{margin-left:auto;font-family:Consolas,monospace;font-size:11px;color:var(--ci);letter-spacing:.08em}
@media (max-width:860px){
  body{grid-template-columns:1fr;grid-template-areas:"stage" "read" "log"}
  .log{border-right:none;border-top:1px solid rgba(143,168,232,.16)}
}
</style>
</head>
<body>
<canvas id="sky"></canvas>

<div class="log">
  <span class="brand">OBSERVATORY 05<b>北岭观测站</b></span>
  <div class="entry">
    <i>2026-09-19 02:14 UT</i>
    <p>大气视宁度 0.72″，风速 2.1 m/s。海雾未上移，导星稳定。</p>
  </div>
  <div class="entry">
    <i>目标</i>
    <p>赤经 05h 34m，赤纬 +22°00′。光谱型 K3 III，表面温度约 4300 K。</p>
  </div>
  <div class="entry">
    <i>备注</i>
    <p>吸收线在 656 nm 处明显加深，疑似星际介质贡献。</p>
  </div>
</div>

<div class="stage">
  <h1>把一夜的星光<small>拆成一条一条可读的谱线</small></h1>
</div>

<div class="read">
  <div><b><em>K3</em> III</b><span>光谱型</span></div>
  <div><b>4300 <em>K</em></b><span>有效温度</span></div>
  <div><b>6.42</b><span>视星等</span></div>
  <div><b>18.7 <em>ly</em></b><span>距离</span></div>
  <p id="stamp">采样 512 帧 · 积分 90 s</p>
</div>

<script>
var state = {
  di:'#0A1024', guang:'#FF6B4A', xing:'#E8EDF7', bo:'#8FA8E8',
  zihao:16, jianju:22, yuanjiao:14, zhu:42, sudu:1
};
var cv=document.getElementById('sky'), ctx=cv.getContext('2d');
var W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);
var stars=[], bars=[], t=0;

function hex(h){var v=parseInt(String(h).replace('#',''),16);return [(v>>16)&255,(v>>8)&255,v&255];}
function rgba(h,a){var c=hex(h);return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';}

function resize(){
  W=window.innerWidth;H=window.innerHeight;
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  cv.style.width=W+'px';cv.style.height=H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
  seed();
}
function seed(){
  stars=[];
  for(var i=0;i<260;i++) stars.push({x:Math.random()*W,y:Math.random()*H*0.8,
    r:Math.random()*1.5+.25,a:Math.random()*.7+.15,p:Math.random()*Math.PI*2});
  bars=[];
  var n=Math.max(12,Math.round(state.zhu));
  for(var b=0;b<n;b++) bars.push({h:.08+Math.abs(Math.sin(b*1.7))*.42, ph:Math.random()*Math.PI*2,
    sp:.6+Math.random()*1.6, hot:(b%7===0)});
}
/* 星野 + 光谱柱：柱高随时间起伏，代表连续采样出的谱线强度 */
function draw(now){
  var dt=Math.min(.05,(now-(draw.last||now))/1000);draw.last=now;
  t+=dt*state.sudu;
  ctx.clearRect(0,0,W,H);
  for(var i=0;i<stars.length;i++){
    var s=stars[i];
    var a=s.a*(.62+.38*Math.sin(t*1.6+s.p));
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=rgba(state.xing,a);ctx.fill();
  }
  /* 地平线遮挡，让星野落下去 */
  var hz=H*.80;
  var g=ctx.createLinearGradient(0,hz-H*.12,0,hz);
  g.addColorStop(0,rgba(state.di,0));g.addColorStop(1,rgba(state.di,.96));
  ctx.fillStyle=g;ctx.fillRect(0,hz-H*.12,W,H*.12);

  var n=bars.length, pad=W*.06, span=W-pad*2, bw=span/n;
  for(var b=0;b<n;b++){
    var bar=bars[b];
    var hh=bar.h*(1+.42*Math.sin(t*bar.sp+bar.ph));
    var top=hz-hh*H*.5, bottom=hz;
    var col=bar.hot?state.guang:state.bo;
    var bg=ctx.createLinearGradient(0,top,0,bottom);
    bg.addColorStop(0,rgba(col,bar.hot?.92:.5));
    bg.addColorStop(1,rgba(col,.06));
    ctx.fillStyle=bg;
    var x=pad+b*bw+bw*.16, w=bw*.68;
    ctx.beginPath();
    if(ctx.roundRect) ctx.roundRect(x,top,w,bottom-top,Math.min(3,w/2));
    else ctx.rect(x,top,w,bottom-top);
    ctx.fill();
  }
  /* 基线 */
  ctx.beginPath();ctx.moveTo(pad*0.6,hz);ctx.lineTo(W-pad*0.6,hz);
  ctx.strokeStyle=rgba(state.bo,.34);ctx.lineWidth=1;ctx.stroke();
  requestAnimationFrame(draw);
}
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--di',state.di);r.setProperty('--guang',state.guang);
  r.setProperty('--xing',state.xing);r.setProperty('--bo',state.bo);
  r.setProperty('--zihao',state.zihao+'px');
  r.setProperty('--jianju',state.jianju+'px');
  r.setProperty('--yuanjiao',state.yuanjiao+'px');
  if(Math.round(state.zhu)!==bars.length) seed();
}
addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();
});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(resize,140);});
resize();apply();
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ draw(0); } else { requestAnimationFrame(draw); }
</script>
</body>
</html>
`,
    片段: `:root{--bg1:#0B1437;--bg2:#1B2A6B;--glass:#AECBFF;--bian:#5B73C9;--zhucai:#5BE0C4;--zi:#EEF3FF;--mo:18;--tu:150;--bars:9;--biaoti:60;}
.hero{min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;}
.card{position:relative;border-radius:22px;background:rgba(255,255,255,.07);border:1px solid var(--bian);backdrop-filter:blur(calc(var(--mo)*1px));}
.chart{display:flex;align-items:flex-end;gap:6px;height:calc(var(--tu)*1px);}
.chart i{flex:1 1 0;min-width:4px;border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,rgba(255,255,255,.30),rgba(255,255,255,0) 42%),var(--zhucai);transform-origin:50% 100%;animation:growUp .85s cubic-bezier(.22,1,.36,1) both;}
@keyframes growUp{from{transform:scaleY(.02);opacity:.25}to{transform:scaleY(1);opacity:1}}`,
    参数: [
    { 键: "di", 名: "夜空底色", 类型: "color", 默认: "#0A1024" },
    { 键: "guang", 名: "光谱热点色", 类型: "color", 默认: "#FF6B4A" },
    { 键: "xing", 名: "星白色", 类型: "color", 默认: "#E8EDF7" },
    { 键: "bo", 名: "谱柱色", 类型: "color", 默认: "#8FA8E8" },
    { 键: "zihao", 名: "基准字号", 类型: "slider", 默认: 16, 最小: 13, 最大: 22, 步长: 1 },
    { 键: "jianju", 名: "栏内间距", 类型: "slider", 默认: 22, 最小: 14, 最大: 40, 步长: 1 },
    { 键: "yuanjiao", 名: "圆角", 类型: "slider", 默认: 14, 最小: 0, 最大: 24, 步长: 1 },
    { 键: "zhu", 名: "谱柱数量", 类型: "slider", 默认: 42, 最小: 12, 最大: 90, 步长: 1 },
    { 键: "sudu", 名: "采样速度", 类型: "slider", 默认: 1, 最小: 0, 最大: 3, 步长: 0.05 }
  ],
    来源: "机制参考自 motionsites.ai（2026-09-19 分析）：玻璃质感的数据条 + 玻璃卡片层级 + 连续动画；已换题重推为「天文台观测数据」，视觉表达全部重做，非复刻"
  },
  {
    id: "S31",
    风格名: "图片主导",
    适配端: "通用",
    风格: "编辑杂志",
    场景: "官网·品牌站",
    骨架: "单侧巨图 + 编辑型文字列（图占 --imgArea%）",
    配色: {"暖纸底":"38%","墨字":"8%","照片调(图内)":"54%"},
    布局骨架: "grid 两栏：左 100%-imgArea% 文字列、右 imgArea% 巨图列；760px 以下塌单列，图在下",
    重色落点: "图是主角，整块占据过半屏；文字列只出 kicker + 一句话巨标 + 细强调线，其余留白",
    第一屏内容: "左：小标签 + 两行巨标 + 一句说明 + 强调线；右：一张占半屏以上的 duotone 巨图（颗粒替代实拍，零外链）",
    删减元素: "不给图加边框阴影、不把图缩成缩略图、不在文字上抢第二种色相",
    适用: "品牌首页、作品集、杂志型落地页——任何想让视觉先说话的内容站",
    禁忌: "信息密度高、需精确对照的报表；图缩成缩略图等于白给这条法则",
    参考站: ["抖音 @Sue《AI 生成 UI 显土的核心原因是提示词设计不到位》","Refactoring UI Skill(github s0xDk)","Redesign Skill(github dev-moe-kyawaung)"],
    我的说明: "把「图片主导」做成一条可执行法则：图不是配图，是首屏主角，面积硬指标过半；文字退到另一侧只点题。图用 duotone + 胶片颗粒离线生成（零外链）。与现有 S02 图片卡片流的区别：S02 是图片卡片网格，本案是单一巨图 hero，DOM 落点完全不同。",
    Agent提示词: "【图片主导 · 设计语言宪法】\n效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。\n\n第一章 总纲 · 设计哲学\nAI 生成的页面显土，常因为把图当缩小配图塞角落。本法则反过来：图是首屏主角，面积硬指标过半（默认 60%），文字退到另一侧只负责点题。气质：编辑感、安静、视觉先说话。适用：品牌首页、作品集、杂志型落地页。\n\n第二章 色彩板与角色\n页面纸底 #F4F1EA（暖，38%）；墨字 #1A1A1A（8%）；照片调 #C8743C（图内暖光，约 54%）。颜色只三种，禁止第二种色相抢戏。\n\n第三章 字体规则\n正文 system-ui / PingFang SC；巨标 clamp(30px,5vw,96px)，字重 800，字距 -.02em；kicker 12px 字距 .24em 大写 opacity.5。\n\n第四章 组件规范\n巨图 stage：duotone 三层同色系渐变 + feTurbulence 颗粒（零外链）；文字列只出 kicker + 巨标 + 一句说明 + 细强调线，其余留白。\n\n第五章 布局法\nhero 两栏：calc(100% - imgArea%) : imgArea%；垂直居中。删减：不给图加边框阴影、不把图缩成缩略图。\n\n第六章 深度与层级\nsurface-1 = 纸底；巨图是氛围层不上卡片阴影；文字列浮于纸底。禁止彩色阴影。\n\n第七章 该做 / 不该做\n该做：大图占过半屏、文字退一侧点题、用 duotone+颗粒代替实拍。不该做：图缩成缩略图、图加边框阴影、出现第二种色相。\n\n第八章 响应式行为\n断点 760：hero 塌单列，图在文字下方，高度 min(50vh)。\n\n第九章 Agent 提示词指南\n配色卡：纸底 #F4F1EA / 墨字 #1A1A1A / 照片调 #C8743C。字号卡：巨标 clamp(30,5vw,96) / 正文 16 / kicker 12。即拿即用：把内容套进以上设计语言输出完整单页 HTML，零依赖离线打开；参数键 imgArea/hs/grain/se/zi/duo 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-图片主导.html",
    代码: `<!DOCTYPE html>
<!-- 防土法则① 图片主导：单侧巨图是首屏主角，文字退到一侧点题；图用 duotone + 胶片颗粒离线生成，零外链 -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·图片主导</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html{overflow-y:scroll;scrollbar-gutter:stable}
  body{font-family:system-ui,"PingFang SC","Microsoft YaHei",sans-serif;background:var(--se);color:var(--zi);min-height:100vh}
  .hero{display:grid;grid-template-columns:calc(100% - var(--imgArea) * 1%) calc(var(--imgArea) * 1%);min-height:100vh}
  .copy{display:flex;flex-direction:column;justify-content:center;padding:0 6vw}
  .copy .k{font-size:12px;letter-spacing:.24em;text-transform:uppercase;opacity:.5}
  .copy h1{font-size:clamp(30px, calc(var(--hs) * 1vw), 96px);line-height:1.04;letter-spacing:-.02em;font-weight:800;margin:18px 0}
  .copy p{font-size:16px;line-height:1.7;opacity:.66;max-width:30ch}
  .rule{width:46px;height:3px;background:var(--duo);margin-top:26px}
  .pic{position:relative;overflow:hidden;background:#1a1410}
  .pic .img{position:absolute;inset:0;background:
    radial-gradient(120% 90% at 28% 18%, color-mix(in srgb,var(--duo) 72%, #fff) 0%, transparent 56%),
    radial-gradient(100% 120% at 82% 92%, color-mix(in srgb,var(--duo) 82%, #000) 0%, transparent 60%),
    linear-gradient(135deg, color-mix(in srgb,var(--duo) 38%, #2a2018), color-mix(in srgb,var(--duo) 16%, #0c0907))}
  .pic::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--grain);mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
</style>
</head>
<body>
  <section class="hero">
    <div class="copy">
      <div class="k">Field Notes</div>
      <h1>让一张图<br>先开口。</h1>
      <p>图片不是缩在角落的配图，而是首屏的主角。文字退到另一侧，只负责点题。</p>
      <div class="rule"></div>
    </div>
    <div class="pic"><div class="img"></div></div>
  </section>
<script>
  const state={imgArea:60,hs:5.0,se:'#F4F1EA',zi:'#1A1A1A',duo:'#C8743C',grain:0.32};
  function apply(){
    const s=document.documentElement.style;
    s.setProperty('--imgArea',state.imgArea);
    s.setProperty('--hs',state.hs);
    s.setProperty('--se',state.se);
    s.setProperty('--zi',state.zi);
    s.setProperty('--duo',state.duo);
    s.setProperty('--grain',state.grain);
  }
  addEventListener('message',e=>{const d=e.data||{};if(d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();});
  apply();
<\/script>
</body>
</html>
`,
    片段: `.hero{grid-template-columns:calc(100% - var(--imgArea)*1%) calc(var(--imgArea)*1%);min-height:100vh}
.pic .img{position:absolute;inset:0;background:radial-gradient(120% 90% at 28% 18%,color-mix(in srgb,var(--duo) 72%,#fff) 0%,transparent 56%),radial-gradient(100% 120% at 82% 92%,color-mix(in srgb,var(--duo) 82%,#000) 0%,transparent 60%),linear-gradient(135deg,color-mix(in srgb,var(--duo) 38%,#2a2018),color-mix(in srgb,var(--duo) 16%,#0c0907))}
.pic::after{content:'';position:absolute;inset:0;opacity:var(--grain);mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}`,
    参数: [
      {
        "键": "imgArea",
        "名": "巨图占比%",
        "类型": "slider",
        "默认": 60,
        "最小": 45,
        "最大": 72,
        "步长": 1,
        "单位": "%"
      },
      {
        "键": "hs",
        "名": "巨标字号(vw)",
        "类型": "slider",
        "默认": 5,
        "最小": 3.5,
        "最大": 7,
        "步长": 0.1
      },
      {
        "键": "grain",
        "名": "颗粒强度",
        "类型": "slider",
        "默认": 0.32,
        "最小": 0,
        "最大": 0.6,
        "步长": 0.01
      },
      {
        "键": "se",
        "名": "纸底",
        "类型": "color",
        "默认": "#F4F1EA"
      },
      {
        "键": "zi",
        "名": "墨字",
        "类型": "color",
        "默认": "#1A1A1A"
      },
      {
        "键": "duo",
        "名": "照片调",
        "类型": "color",
        "默认": "#C8743C"
      }
    ],
    来源: "来自于抖音"
  },
  {
    id: "S32",
    风格名: "卡片节奏",
    适配端: "PC 端",
    风格: "极简瑞士",
    场景: "作品集·叙事",
    骨架: "非对称 bento（卡片大小有意错落）",
    配色: {"冷中性底":"78%","墨字":"18%","单一强调":"4%"},
    布局骨架: "grid 4 列、行高 120px；首卡跨 2×2、一张宽卡跨 2 列、一张高卡跨 2 行，形成大小节奏；760px 以下转 2 列",
    重色落点: "全页只首卡一块强调色，其余卡皆同明度冷灰表面、仅以字号/字重分主次，节奏靠尺寸而非颜色",
    第一屏内容: "一组卡片，相邻大小错落；首卡（序号 01）以唯一强调色块跳出来，其余卡安静",
    删减元素: "不做等宽 3 列方阵、不给每张卡独立强调色、不加边框（仅 1px 极淡发丝线或无）",
    适用: "功能罗列、特性展示、数据看板——任何要并排多个区块的页面",
    禁忌: "需要精确行列对照的报表；卡片数过多导致节奏崩坏",
    参考站: ["Refactoring UI Skill(github s0xDk)","Redesign Skill(github dev-moe-kyawaung)"],
    我的说明: "把「卡片节奏」做成一条法则：等宽栅格是土味源头，相邻卡片大小错落立刻有编辑节奏。首卡序号用全页唯一强调色，其余卡保持冷灰表面、近零边框。与现有 S04 高密度卡片墙/S21 卡片错位/S01 大色块分区的区别：本案是非对称 bento + 单一强调，DOM 落点不同。",
    Agent提示词: "【卡片节奏 · 设计语言宪法】\n效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。\n\n第一章 总纲 · 设计哲学\nAI 生成的卡片常是一排等宽方块，呆板显土。本法则反过来：相邻卡片大小有意错落（首卡跨 2×2、一张宽卡跨 2 列、一张高卡跨 2 行），眼睛在等宽栅格里睡着，在节奏里醒着。气质：编辑感、安静、有呼吸。适用：功能罗列、特性展示、数据看板。\n\n第二章 色彩板与角色\n冷中性底 #EDEFF2（78%）；墨字 #222831（18%）；单一强调 #2F6FED（仅首卡一块，4%）。全页只一个强调色。\n\n第三章 字体规则\n正文 system-ui / PingFang SC；卡片标题 18px 字重 700；序号 13px opacity.4 字距 .04em 等宽数字。\n\n第四章 组件规范\n卡片：圆角 r、内边距 18px、背景 color-mix(zi 4%)，近零边框；首卡实心强调底白字，其余卡纯文字安静。\n\n第五章 布局法\ndeck：grid 4 列、行高 120px、gap 刻度化；首卡跨 2×2 并上移 lift 制造错落。删减：不做等宽 3 列方阵、不给每张卡独立强调色。\n\n第六章 深度与层级\nsurface-1 = 冷底；卡片 surface-2 = zi 4% 淡表面；首卡 surface-3 = 强调实心。禁止彩色阴影。\n\n第七章 该做 / 不该做\n该做：大小错落、仅首卡一处强调、间距成刻度。不该做：等宽方阵、每张卡都给亮色、加边框。\n\n第八章 响应式行为\n断点 760：grid 转 2 列，首卡跨 2 列。\n\n第九章 Agent 提示词指南\n配色卡：冷底 #EDEFF2 / 墨字 #222831 / 强调 #2F6FED。字号卡：标题 18 / 序号 13。即拿即用：把内容套进以上设计语言输出完整单页 HTML，零依赖离线打开；参数键 jianju/r/lift/se/zi/ac 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-卡片节奏.html",
    代码: `<!DOCTYPE html>
<!-- 防土法则② 卡片节奏：等宽栅格显土，改非对称 bento，卡片大小有意错落，仅首卡一处强调色，近零边框 -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·卡片节奏</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html{overflow-y:scroll;scrollbar-gutter:stable}
  body{font-family:system-ui,"PingFang SC","Microsoft YaHei",sans-serif;background:var(--se);color:var(--zi);min-height:100vh;display:flex;align-items:center}
  .deck{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:120px;gap:var(--jianju);padding:var(--jianju);width:100%}
  .card{background:color-mix(in srgb,var(--zi) 4%, var(--se));border-radius:var(--r);padding:18px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
  .card .n{font-size:13px;opacity:.4;font-variant-numeric:tabular-nums}
  .card .t{font-size:18px;font-weight:700;letter-spacing:-.01em;line-height:1.2}
  .card .c{font-size:12px;opacity:.55;margin-top:4px}
  .lead{grid-column:span 2;grid-row:span 2;background:var(--ac);color:#fff;transform:translateY(calc(var(--lift) * -1px))}
  .lead .n{opacity:.7}
  .lead .t{font-size:30px}
  .lead .c{opacity:.85}
  .wide{grid-column:span 2}
  .tall{grid-row:span 2}
</style>
</head>
<body>
  <section class="deck">
    <div class="card lead"><span class="n">01</span><div><div class="t">节奏先行</div><div class="c">大小错落，而非等宽方阵</div></div></div>
    <div class="card"><span class="n">02</span><div class="t">留白即分组</div></div>
    <div class="card tall"><span class="n">03</span><div><div class="t">一处强调</div><div class="c">全页只此一块色</div></div></div>
    <div class="card"><span class="n">04</span><div class="t">去边框</div></div>
    <div class="card wide"><span class="n">05</span><div class="t">网格只做骨架，不抢戏</div></div>
    <div class="card"><span class="n">06</span><div class="t">间距成刻度</div></div>
  </section>
<script>
  const state={jianju:16,se:'#EDEFF2',zi:'#222831',ac:'#2F6FED',r:16,lift:10};
  function apply(){
    const s=document.documentElement.style;
    s.setProperty('--jianju',state.jianju+'px');
    s.setProperty('--se',state.se);
    s.setProperty('--zi',state.zi);
    s.setProperty('--ac',state.ac);
    s.setProperty('--r',state.r+'px');
    s.setProperty('--lift',state.lift);
  }
  addEventListener('message',e=>{const d=e.data||{};if(d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();});
  apply();
<\/script>
</body>
</html>
`,
    片段: `.deck{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:120px;gap:var(--jianju);padding:var(--jianju);width:100%}
.lead{grid-column:span 2;grid-row:span 2;background:var(--ac);color:#fff;transform:translateY(calc(var(--lift)*-1px))}
.wide{grid-column:span 2}.tall{grid-row:span 2}
.card{background:color-mix(in srgb,var(--zi) 4%,var(--se));border-radius:var(--r);padding:18px}`,
    参数: [
      {
        "键": "jianju",
        "名": "间距(px)",
        "类型": "slider",
        "默认": 16,
        "最小": 8,
        "最大": 28,
        "步长": 1,
        "单位": "px"
      },
      {
        "键": "r",
        "名": "圆角(px)",
        "类型": "slider",
        "默认": 16,
        "最小": 0,
        "最大": 28,
        "步长": 1,
        "单位": "px"
      },
      {
        "键": "lift",
        "名": "首卡上移(px)",
        "类型": "slider",
        "默认": 10,
        "最小": 0,
        "最大": 40,
        "步长": 1,
        "单位": "px"
      },
      {
        "键": "se",
        "名": "冷中性底",
        "类型": "color",
        "默认": "#EDEFF2"
      },
      {
        "键": "zi",
        "名": "墨字",
        "类型": "color",
        "默认": "#222831"
      },
      {
        "键": "ac",
        "名": "单一强调",
        "类型": "color",
        "默认": "#2F6FED"
      }
    ],
    来源: "来自于抖音"
  },
  {
    id: "S33",
    风格名: "大字留白",
    适配端: "通用",
    风格: "极简瑞士",
    场景: "落地页·发布页",
    骨架: "单屏一个巨型标题时刻（衬线主导）",
    配色: {"米白底":"82%","墨字":"15%","一处强调":"3%"},
    布局骨架: "flex 纵向：顶部小 kicker、中部巨标占满视口、底部细落款；巨标衬线、紧字距、平衡断行；无图无 CTA",
    重色落点: "全页只一个词吃强调色，其余皆墨字；删到只剩一个标题时刻，留白即内容",
    第一屏内容: "一句巨型宣言（衬线、两到三行），其中唯一一个词用强调色；上下极简 chrome",
    删减元素: "不放产品图、不放 CTA 按钮、不堆次级信息、不混第二种字族",
    适用: "品牌主张页、作品集封面、宣言式落地页——任何想用一句话立住气场的页面",
    禁忌: "信息密度高、需多入口导航的页面；与 S05 杂志排版风（多栏网格）区分：本案是单一标题时刻",
    参考站: ["Redesign Skill(github dev-moe-kyawaung)","Refactoring UI Skill(github s0xDk)"],
    我的说明: "把「大字留白」做成一条法则：标题不够大不是靠字号硬撑，而是让周围安静下来。巨型衬线 + 紧字距 + 平衡断行，全页只一个词吃强调色。与现有 S05 杂志排版风/S07 暖调留白风的区别：S05 是多栏杂志网格、S07 是 Apple 式产品落地页带 CTA，本案是单一标题时刻、无图无 CTA，DOM 落点不同。",
    Agent提示词: "【大字留白 · 设计语言宪法】\n效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。\n\n第一章 总纲 · 设计哲学\nAI 生成的首屏常堆满元素又靠巨大字号硬撑层级，显土。本法则反过来：删到只剩一个巨型标题时刻——衬线巨标、紧字距、平衡断行，全页只一个词吃强调色，无图无 CTA。气质：安静、克制、有气场。适用：品牌主张页、作品集封面、宣言式落地页。\n\n第二章 色彩板与角色\n米白底 #F6F4EF（82%）；墨字 #16140F（15%）；一处强调 #C0432B（仅标题中一个词，3%）。\n\n第三章 字体规则\n巨标 Georgia / Times New Roman 衬线，clamp(44px,9vw,220px)，字重 800，字距 -.02em；正文 system-ui。仅此两字族。\n\n第四章 组件规范\n舞台：kicker（12px 字距 .24em 大写 opacity.45）+ 巨标（max-width 13ch，text-wrap:balance）+ 落款（13px opacity.4）。无按钮无图。\n\n第五章 布局法\nflex 纵向居中：kicker 顶、巨标中、落款底，大留白即内容。删减：不放产品图、不放 CTA、不堆次级信息。\n\n第六章 深度与层级\n单色阶；层级靠字号与留白，不靠颜色与阴影；唯一强调词是视觉落点。\n\n第七章 该做 / 不该做\n该做：巨标占满视口、平衡断行、只一个词强调。不该做：混第二种字族、放大段产品文案、加 CTA。\n\n第八章 响应式行为\n断点 760：巨标 clamp 随视口自适应，padding 收到 6vw。\n\n第九章 Agent 提示词指南\n配色卡：米白 #F6F4EF / 墨字 #16140F / 强调 #C0432B。字号卡：巨标 clamp(44,9vw,220)。即拿即用：把一句宣言套进以上设计语言输出完整单页 HTML，零依赖离线打开；参数键 bs/ls/lh/bal/se/zi/ac 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-大字留白.html",
    代码: `<!DOCTYPE html>
<!-- 防土法则③ 大字留白：删到只剩一个巨型标题时刻，紧字距 + 平衡断行，无图无 CTA，唯一个词吃强调色 -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·大字留白</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html{overflow-y:scroll;scrollbar-gutter:stable}
  body{font-family:system-ui,"PingFang SC","Microsoft YaHei",sans-serif;background:var(--se);color:var(--zi);min-height:100vh}
  .stage{display:flex;flex-direction:column;justify-content:center;min-height:100vh;padding:8vh 8vw}
  .kicker{font-size:13px;letter-spacing:.24em;text-transform:uppercase;opacity:.45;margin-bottom:4vh}
  .h{font-family:Georgia,"Times New Roman",serif;font-size:clamp(44px, calc(var(--bs) * 1vw), 220px);line-height:var(--lh);letter-spacing:calc(var(--ls) * 1em);font-weight:800;max-width:13ch}
  .h.bal{text-wrap:balance}
  .h .em{color:var(--ac)}
  .foot{margin-top:6vh;font-size:13px;opacity:.4;letter-spacing:.04em}
</style>
</head>
<body>
  <main class="stage">
    <div class="kicker">Manifesto</div>
    <h1 class="h bal">我们<br>用<span class="em">安静</span><br>说话。</h1>
    <div class="foot">— studio, 2026</div>
  </main>
<script>
  const state={bs:9.0,ls:-0.02,lh:0.98,bal:true,se:'#F6F4EF',zi:'#16140F',ac:'#C0432B'};
  function apply(){
    const s=document.documentElement.style;
    s.setProperty('--bs',state.bs);
    s.setProperty('--ls',state.ls);
    s.setProperty('--lh',state.lh);
    s.setProperty('--se',state.se);
    s.setProperty('--zi',state.zi);
    s.setProperty('--ac',state.ac);
    document.querySelector('.h').classList.toggle('bal',state.bal);
  }
  addEventListener('message',e=>{const d=e.data||{};if(d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();});
  apply();
<\/script>
</body>
</html>
`,
    片段: `.stage{display:flex;flex-direction:column;justify-content:center;min-height:100vh;padding:8vh 8vw}
.h{font-family:Georgia,'Times New Roman',serif;font-size:clamp(44px,calc(var(--bs)*1vw),220px);line-height:var(--lh);letter-spacing:calc(var(--ls)*1em);font-weight:800;max-width:13ch}
.h.bal{text-wrap:balance}.h .em{color:var(--ac)}`,
    参数: [
      {
        "键": "bs",
        "名": "巨标字号(vw)",
        "类型": "slider",
        "默认": 9,
        "最小": 6,
        "最大": 12,
        "步长": 0.1
      },
      {
        "键": "ls",
        "名": "字距(em)",
        "类型": "slider",
        "默认": -0.02,
        "最小": -0.05,
        "最大": 0.05,
        "步长": 0.005
      },
      {
        "键": "lh",
        "名": "行高",
        "类型": "slider",
        "默认": 0.98,
        "最小": 0.85,
        "最大": 1.2,
        "步长": 0.01
      },
      {
        "键": "bal",
        "名": "平衡断行",
        "类型": "switch",
        "默认": true
      },
      {
        "键": "se",
        "名": "米白底",
        "类型": "color",
        "默认": "#F6F4EF"
      },
      {
        "键": "zi",
        "名": "墨字",
        "类型": "color",
        "默认": "#16140F"
      },
      {
        "键": "ac",
        "名": "一处强调",
        "类型": "color",
        "默认": "#C0432B"
      }
    ],
    来源: "来自于抖音"
  },
  {
    id: "S34",
    风格名: "沉浸氛围",
    适配端: "通用",
    风格: "玻璃拟态",
    场景: "落地页·发布页",
    骨架: "整屏氛围层 + 浮起小玻璃卡",
    配色: {"深色调渐变底":"86%","玻璃卡":"8%","单一光源/强调":"6%"},
    布局骨架: "全屏深色渐变网（多 radial 叠加）+ 颗粒 + 单一光源高光 + 暗角；一张小玻璃卡浮在某角承载文字；760px 以下卡转底部通栏",
    重色落点: "氛围是主角，整屏由渐变网 + 颗粒 + 单光源 + 暗角构成；玻璃只做浮起的小卡，不铺全页",
    第一屏内容: "沉浸暗场里一束光，浮起一张小玻璃卡（kicker + 两行标题 + 一句说明）",
    删减元素: "不把全页做成玻璃（避免 S03 玻璃拟态同质）、不堆彩色光、不放大段文字抢氛围",
    适用: "叙事型品牌站、音乐/展览/夜场主题——任何要「沉浸感」的暗调首屏",
    禁忌: "明亮办公/工具后台；浅底页面",
    参考站: ["Redesign Skill(github dev-moe-kyawaung)","Refactoring UI Skill(github s0xDk)"],
    我的说明: "把「沉浸氛围」做成一条法则：氛围先开口，信息再跟进，玻璃只是浮起的一层而非全页语言。整屏由深色渐变网 + 颗粒 + 单一光源 + 暗角构成。与现有 S03 玻璃拟态风/S25 玻璃装置首屏/S30 玻璃数据英雄区的区别：那三套玻璃是全局语言，本案玻璃只是角落浮起小卡，氛围层才是主角，DOM 落点不同。",
    Agent提示词: "【沉浸氛围 · 设计语言宪法】\n效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。\n\n第一章 总纲 · 设计哲学\nAI 生成的暗场常把整页做成玻璃拟态，千篇一律显土。本法则反过来：氛围先开口——整屏由深色渐变网 + feTurbulence 颗粒 + 单一光源高光 + 暗角构成，玻璃只做浮起的小卡承载文字，不铺全页。气质：暗、静、电影感、仪式性。适用：叙事型品牌站、音乐/展览/夜场主题暗调首屏。\n\n第二章 色彩板与角色\n深色调渐变底 #2E3A4F（86%）；玻璃卡 rgba(255,255,255,.07)（8%）；单一光源/强调 #79B8FF（6%，只用于光与卡内点睛）。\n\n第三章 字体规则\n正文 system-ui / PingFang SC；卡内标题 34px 字重 800；kicker 12px 字距 .22em 大写 opacity.6。\n\n第四章 组件规范\n氛围层：多 radial 渐变叠加 + 颗粒 + 暗角；glow 单一光源（ac 径向高光，opacity 可控）；玻璃卡 backdrop-filter blur + saturate，1px 白描边，内容极简。\n\n第五章 布局法\n全屏氛围层 + 角落浮起小卡（left 8vw / bottom 14vh）；删减：不把全页做成玻璃、不堆彩色光。\n\n第六章 深度与层级\nsurface-1 = 渐变底；玻璃卡 surface-2 浮起；暗角统一单一光源方向，禁止多光源阴影。\n\n第七章 该做 / 不该做\n该做：氛围层做主角、玻璃只浮小卡、单一光源。不该做：全页玻璃、彩色光乱飞、大段文字抢氛围。\n\n第八章 响应式行为\n断点 760：玻璃卡转底部通栏（left/right 6vw，bottom 6vh）。\n\n第九章 Agent 提示词指南\n配色卡：基调 #2E3A4F / 卡内文字 #F2F4F6 / 光源 #79B8FF。字号卡：卡标题 34 / kicker 12。即拿即用：把内容套进以上设计语言输出完整单页 HTML，零依赖离线打开；参数键 bohua/glow/grain/hue/zi/ac 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-沉浸氛围.html",
    代码: `<!DOCTYPE html>
<!-- 防土法则④ 沉浸氛围：整屏氛围层（渐变网 + 颗粒 + 单一光源 + 暗角），玻璃只做浮起小卡，而非全页玻璃 -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·沉浸氛围</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html{overflow-y:scroll;scrollbar-gutter:stable}
  body{font-family:system-ui,"PingFang SC","Microsoft YaHei",sans-serif;min-height:100vh}
  .atmo{position:relative;overflow:hidden;min-height:100vh;background:
    radial-gradient(80% 70% at 20% 14%, color-mix(in srgb,var(--hue) 80%, #fff) 0%, transparent 55%),
    radial-gradient(90% 80% at 86% 28%, color-mix(in srgb,var(--hue) 55%, var(--ac)) 0%, transparent 52%),
    radial-gradient(120% 100% at 58% 102%, color-mix(in srgb,var(--hue) 92%, #000) 0%, transparent 60%),
    var(--hue)}
  .atmo::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--grain);mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
  .atmo::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 120% at 50% 40%, transparent 38%, rgba(0,0,0,.55) 100%)}
  .glow{position:absolute;width:62vw;height:62vw;left:8vw;top:-12vw;border-radius:50%;background:radial-gradient(circle, color-mix(in srgb,var(--ac) 55%, transparent) 0%, transparent 62%);opacity:var(--glow);filter:blur(24px)}
  .card{position:absolute;left:8vw;bottom:14vh;max-width:360px;padding:30px 32px;border-radius:18px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(calc(var(--bohua) * 1px)) saturate(1.15);color:var(--zi)}
  .card .k{font-size:12px;letter-spacing:.22em;text-transform:uppercase;opacity:.6}
  .card h2{font-size:34px;line-height:1.08;font-weight:800;letter-spacing:-.01em;margin:14px 0}
  .card p{font-size:14px;line-height:1.6;opacity:.7;max-width:30ch}
</style>
</head>
<body>
  <section class="atmo">
    <div class="glow"></div>
    <div class="card">
      <div class="k">Now Playing</div>
      <h2>夜的<br>厚度。</h2>
      <p>氛围先开口，信息再跟进。玻璃只是浮起的一层，不抢底色。</p>
    </div>
  </section>
<script>
  const state={hue:'#2E3A4F',zi:'#F2F4F6',ac:'#79B8FF',bohua:14,glow:0.55,grain:0.30};
  function apply(){
    const s=document.documentElement.style;
    s.setProperty('--hue',state.hue);
    s.setProperty('--zi',state.zi);
    s.setProperty('--ac',state.ac);
    s.setProperty('--bohua',state.bohua);
    s.setProperty('--glow',state.glow);
    s.setProperty('--grain',state.grain);
  }
  addEventListener('message',e=>{const d=e.data||{};if(d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();});
  apply();
<\/script>
</body>
</html>
`,
    片段: `.atmo{position:relative;overflow:hidden;min-height:100vh;background:radial-gradient(80% 70% at 20% 14%,color-mix(in srgb,var(--hue) 80%,#fff) 0%,transparent 55%),radial-gradient(90% 80% at 86% 28%,color-mix(in srgb,var(--hue) 55%,var(--ac)) 0%,transparent 52%),radial-gradient(120% 100% at 58% 102%,color-mix(in srgb,var(--hue) 92%,#000) 0%,transparent 60%),var(--hue)}
.atmo::after{content:'';position:absolute;inset:0;background:radial-gradient(120% 120% at 50% 40%,transparent 38%,rgba(0,0,0,.55) 100%)}
.card{position:absolute;left:8vw;bottom:14vh;max-width:360px;padding:30px 32px;border-radius:18px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(calc(var(--bohua)*1px)) saturate(1.15);color:var(--zi)}`,
    参数: [
      {
        "键": "bohua",
        "名": "玻璃模糊(px)",
        "类型": "slider",
        "默认": 14,
        "最小": 0,
        "最大": 30,
        "步长": 1,
        "单位": "px"
      },
      {
        "键": "glow",
        "名": "单光源强度",
        "类型": "slider",
        "默认": 0.55,
        "最小": 0,
        "最大": 1,
        "步长": 0.01
      },
      {
        "键": "grain",
        "名": "颗粒强度",
        "类型": "slider",
        "默认": 0.3,
        "最小": 0,
        "最大": 0.6,
        "步长": 0.01
      },
      {
        "键": "hue",
        "名": "渐变基调",
        "类型": "color",
        "默认": "#2E3A4F"
      },
      {
        "键": "zi",
        "名": "卡内文字",
        "类型": "color",
        "默认": "#F2F4F6"
      },
      {
        "键": "ac",
        "名": "光源/强调",
        "类型": "color",
        "默认": "#79B8FF"
      }
    ],
    来源: "来自于抖音"
  },
  {
    id: "S35",
    风格名: "极简编辑",
    适配端: "PC 端",
    风格: "编辑杂志",
    场景: "内容·阅读",
    骨架: "安静双栏阅读页（左索引 + 右正文）",
    配色: {"灰底":"85%","灰字":"12%","一处强调":"3%"},
    布局骨架: "grid：左窄索引栏（章节标签）+ 右正文栏（≤60ch）；全页一个灰，唯当前章节标签吃强调色；760px 以下索引转顶部横排",
    重色落点: "全页统一一个灰；强调色只给「当前读到的标签」，其余一律安静",
    第一屏内容: "左：章节索引（引言/方法/案例/结语，当前项唯一强调）；右：当前章节标题 + 两段正文",
    删减元素: "不引第二种色相、不放大段彩色、不让强调色承担全部含义",
    适用: "文档站、博客、产品文档、长文阅读——任何以文字为主、要「安静」的页面",
    禁忌: "需强视觉冲击的营销页；与 S14 视觉重量（对比卡）区分：本案无对比、单栏安静",
    参考站: ["Refactoring UI Skill(github s0xDk)","Redesign Skill(github dev-moe-kyawaung)"],
    我的说明: "把「极简编辑」做成一条法则：先把一切都调成同一个灰，等层级靠字重/间距/留白站住，再放一处强调色——且只放一处。与现有 S14 视觉重量/S07 暖调留白风的区别：S14 是主次对比卡、S07 是带 CTA 的暖白落地页，本案是无对比的双栏阅读、强调色只用于当前章节标签，DOM 落点不同。",
    Agent提示词: "【极简编辑 · 设计语言宪法】\n效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。\n\n第一章 总纲 · 设计哲学\nAI 生成的文档页常引入第二种色相、让强调色承担全部含义，显土。本法则反过来：先把一切调成同一个灰，等层级靠字重、间距、留白站住，再放一处强调色——且只放一处（当前章节标签）。气质：安静、克制、长文可读。适用：文档站、博客、产品文档、长文阅读。\n\n第二章 色彩板与角色\n灰底 #F2F2F0（85%）；灰字 #3A3A38（12%）；一处强调 #C0432B（仅当前章节标签，3%）。\n\n第三章 字体规则\n正文 system-ui / PingFang SC；标题 30px 字重 800；正文 16px 行高 1.7；章节标签 14px。\n\n第四章 组件规范\n双栏：左窄索引（章节标签灰 opacity.45，当前项 ac 色加粗）、右正文（max-width 60ch）；强调色只给当前标签，其余一律安静。\n\n第五章 布局法\ngrid：左 rail(px) + 右 1fr，gap=pad；删减：不引第二种色相、不放大段彩色。\n\n第六章 深度与层级\n单灰阶；层级靠字重与留白，不靠色块与阴影；强调色仅标当前位置。\n\n第七章 该做 / 不该做\n该做：统一灰底、唯一强调、层级靠字重。不该做：第二种色相、强调色承担全部含义、对比式卡片。\n\n第八章 响应式行为\n断点 760：rail 转顶部横排（flex 横，当前项仍 ac 色）。\n\n第九章 Agent 提示词指南\n配色卡：灰底 #F2F2F0 / 灰字 #3A3A38 / 强调 #C0432B。字号卡：标题 30 / 正文 16。即拿即用：把长文套进以上设计语言输出完整单页 HTML，零依赖离线打开；参数键 rail/pad/lh/se/zi/ac 须与代码内 CSS 变量一致，支持 postMessage 调参。",
    演示页: "assets/demos/方案-极简编辑.html",
    代码: `<!DOCTYPE html>
<!-- 防土法则⑤ 极简编辑：安静双栏阅读页（左索引 + 右正文），全页一个灰，唯一个元素吃强调色 -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>方案·极简编辑</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html{overflow-y:scroll;scrollbar-gutter:stable}
  body{font-family:system-ui,"PingFang SC","Microsoft YaHei",sans-serif;background:var(--se);color:var(--zi);min-height:100vh}
  .doc{display:grid;grid-template-columns:var(--rail) 1fr;gap:var(--pad);min-height:100vh;padding:var(--pad)}
  .rail{display:flex;flex-direction:column;gap:14px;padding-top:6vh;font-size:14px}
  .rail .r{color:var(--zi);opacity:.45;transition:opacity .2s}
  .rail .r.on{color:var(--ac);font-weight:700;opacity:1}
  .body{padding-top:6vh;max-width:60ch}
  .body h2{font-size:30px;font-weight:800;letter-spacing:-.01em;margin-bottom:18px}
  .body p{font-size:16px;line-height:var(--lh);opacity:.78;margin-bottom:14px}
</style>
</head>
<body>
  <main class="doc">
    <nav class="rail">
      <div class="r">引言</div>
      <div class="r on">方法</div>
      <div class="r">案例</div>
      <div class="r">结语</div>
    </nav>
    <article class="body">
      <h2>方法</h2>
      <p>先把一切都调成同一个灰。等层级靠字重、间距、留白站住之后，再放一处强调色——且只放一处。</p>
      <p>强调色表达的是优先级，不是装饰。把它留给当前读到的那一行，其余一律安静。</p>
    </article>
  </main>
<script>
  const state={rail:200,pad:48,lh:1.7,se:'#F2F2F0',zi:'#3A3A38',ac:'#C0432B'};
  function apply(){
    const s=document.documentElement.style;
    s.setProperty('--rail',state.rail+'px');
    s.setProperty('--pad',state.pad+'px');
    s.setProperty('--lh',state.lh);
    s.setProperty('--se',state.se);
    s.setProperty('--zi',state.zi);
    s.setProperty('--ac',state.ac);
  }
  addEventListener('message',e=>{const d=e.data||{};if(d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();});
  apply();
<\/script>
</body>
</html>
`,
    片段: `.doc{display:grid;grid-template-columns:var(--rail) 1fr;gap:var(--pad);min-height:100vh;padding:var(--pad)}
.rail .r{color:var(--zi);opacity:.45;transition:opacity .2s}.rail .r.on{color:var(--ac);font-weight:700;opacity:1}
.body{max-width:60ch}.body p{font-size:16px;line-height:var(--lh);opacity:.78;margin-bottom:14px}`,
    参数: [
      {
        "键": "rail",
        "名": "索引栏宽(px)",
        "类型": "slider",
        "默认": 200,
        "最小": 120,
        "最大": 320,
        "步长": 8,
        "单位": "px"
      },
      {
        "键": "pad",
        "名": "边距(px)",
        "类型": "slider",
        "默认": 48,
        "最小": 24,
        "最大": 80,
        "步长": 4,
        "单位": "px"
      },
      {
        "键": "lh",
        "名": "正行高",
        "类型": "slider",
        "默认": 1.7,
        "最小": 1.4,
        "最大": 2.1,
        "步长": 0.05
      },
      {
        "键": "se",
        "名": "灰底",
        "类型": "color",
        "默认": "#F2F2F0"
      },
      {
        "键": "zi",
        "名": "灰字",
        "类型": "color",
        "默认": "#3A3A38"
      },
      {
        "键": "ac",
        "名": "一处强调",
        "类型": "color",
        "默认": "#C0432B"
      }
    ],
    来源: "来自于抖音"
  },
  {
    id: "S36",
    风格名: "暗色视频首屏",
    适配端: "通用",
    风格: "科技未来",
    场景: "落地页·发布页",
    骨架: "全屏动态背景 + 顶部导航 + 居中标题 CTA + 底部信任状",
    配色: {
      "深空黑(底)": "78%",
      "白字": "15%",
      "玻璃蓝金(CTA)": "7%"
    },
    布局骨架: "全屏 canvas 动态背景层 + 半透明 veil 遮罩层；顶部固定导航（Logo + 菜单 + CTA）；主视觉区居中两行标题 + 副标题 + 玻璃 CTA；底部四特征 + 细线 + 页脚信任状",
    重色落点: "动态背景是舞台，白色文字浮于其上，玻璃 CTA 用金蓝渐变高光做唯一动作入口",
    第一屏内容: "居中两行巨标 + 副标题 + 玻璃 CTA；顶部导航；底部四特征与信任状",
    删减元素: "不放卡片网格、不放第二屏滚动、不引外部视频/图片/字体",
    适用: "科技公司、数字工作室、AI 产品发布页——需要「电影感首屏」的落地页",
    禁忌: "信息密度高、需多屏滚动的内容站；移动小屏仅作兼容降级",
    参考站: ["motionsites.ai"],
    我的说明: "把 motionsites.ai 的 Neural Pathway 首屏机制（全屏动态背景 + 玻璃 CTA + 统一单位缩放 + CSS 入场动画）拿过来，换题重推为 NOVA 数字工作室。背景用 canvas 离线生成光纤粒子，替代外部视频；字体降级为系统字体栈，保留可变字重的参数化思路。",
    Agent提示词: "【暗色视频首屏 · 设计语言宪法】\n效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。\n\n第一章 总纲 · 设计哲学\n暗色电影感首屏。动态背景是舞台，白色文字浮于其上，玻璃 CTA 是唯一动作入口。气质：深邃、专注、科技感、仪式感。适用：科技公司、数字工作室、AI 产品发布页。\n\n第二章 色彩板与角色\n深空黑 #02060f（底，78%，页面唯一画布色）；白字 #ffffff（主文字，15%）；副文字 #a2a9b8（辅助，占比低）；玻璃蓝金 CTA（7%，仅用于按钮高光、边框与光晕）。\n\n第三章 字体规则\n字体栈：system-ui / -apple-system / 'Segoe UI' / 'PingFang SC' / 'Microsoft YaHei' / sans-serif；桌面巨标 ~47u、副标 ~20u、导航 ~13.5u，均通过 --u 统一缩放；移动流式自适应。\n\n第四章 组件规范\n玻璃 CTA：胶囊形、三层渐变背景、backdrop-filter blur + saturate、渐变伪元素边框、金色左缘/蓝色右缘高光。导航：桌面展开，移动端纯 CSS 汉堡菜单。特征行：chevron SVG + 文字。入场动画：统一 2.1s 时间线，使用独立 translate/scale/clip-path，不动 transform。\n\n第五章 布局法\n桌面（≥1200px × ≥560px × 横屏）：1536×1024 锁定网格，bar/hero/foot 均绝对定位并按 --u 缩放，无 reflow。移动端：flex 纵向流式，标题换行、特征网格、汉堡菜单。\n\n第六章 深度与层级\n背景层 canvas 动态光线 → veil 遮罩 → 内容层（bar/hero/foot，z-index:1）。CTA 用多层渐变、阴影与伪元素边框制造玻璃厚度。\n\n第七章 该做 / 不该做\n该做：全屏动态背景、玻璃 CTA、统一单位缩放、CSS 入场动画、canvas 离线生成背景、字体降级系统栈。不该做：引入外部视频/图片/字体、加第二屏滚动、卡片网格、依赖 JS 控制布局。\n\n第八章 响应式行为\n断点：1200px（桌面锁定）、1199px 以下流式、599px 手机、430px 小屏、横屏手机/平板。dvh 回退。prefers-reduced-motion:reduce 关闭所有动画与 transition。\n\n第九章 Agent 提示词指南\n配色卡：底 #02060f / 主文字 #ffffff / 副文字 #a2a9b8 / 导航 #fbfdff / 次要导航 #e8ecf0 / 特征色 rgba(214,232,250,.90) / 玻璃线 rgba(196,214,232,.72) / CTA 光晕 rgba(168,204,252,.16)。参数键 ink/sub/nav/navdim/blur/glow/hairline/veilAlpha 须与代码内 CSS 变量名一致，支持 postMessage({type:'param',key,value}) 实时调参。",
    演示页: "assets/demos/方案-暗色视频首屏.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>NOVA — 世界级数字产品</title>
<style>
:root{
  --ink:#ffffff; --sub:#a2a9b8; --nav:#fbfdff; --foot:#f4f8fd;
  --hair:rgba(196,214,232,.72); --chev:rgba(214,232,250,.90);
  --navdim:#e8ecf0; --veil:6,10,18;
  --cover:max(calc(100vw / 1536), calc(100vh / 1024));
  --fit:calc(100vh / 910);
  --u:min(var(--cover), var(--fit));
  --blur:calc(var(--u)*26);
  --glow:calc(var(--u)*34);
  --hairline:max(1px, calc(var(--u)*1.6));
}
@supports (height:100dvh){
  :root{
    --cover:max(calc(100vw / 1536), calc(100dvh / 1024));
    --fit:calc(100dvh / 910);
  }
}
*,*::before,*::after{box-sizing:border-box}
html,body{height:100%; background:#02060f; overflow:hidden}
body{
  font-family:system-ui,-apple-system,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;
  color:var(--ink); -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
  text-rendering:geometricPrecision;
}
a{color:inherit;text-decoration:none}
li{list-style:none}
a:focus-visible{outline:2px solid #9fe0ff; outline-offset:3px; border-radius:4px}

.art{position:fixed; inset:0; width:100%; height:100%; z-index:0; user-select:none; pointer-events:none; background:#03060c}
.art canvas{display:block; width:100%; height:100%}

.veil{position:fixed; inset:0; z-index:0; pointer-events:none;
  background:
    radial-gradient(140% 60% at 50% 40%, rgba(var(--veil),.16) 0%, rgba(var(--veil),.057) 50%, rgba(var(--veil),0) 100%),
    linear-gradient(180deg, rgba(var(--veil),0) 45%, rgba(var(--veil),.10) 100%);
}

.bar,.hero,.foot{position:fixed; z-index:1}

.brand svg{fill:var(--ink); display:block}
.caret,.navarrow{fill:none; stroke:var(--nav); stroke-linecap:round; stroke-linejoin:round}
.navarrow{stroke-linecap:square; stroke-linejoin:miter}
.pill{border:var(--hairline) solid var(--hair); border-radius:999px}
.chev{fill:none; stroke:var(--chev); stroke-width:1.75; stroke-linecap:round; stroke-linejoin:round}
.cta .arrow{fill:none; stroke:var(--ink); stroke-width:1.6; stroke-linecap:square; stroke-linejoin:miter}
.rule{background:linear-gradient(180deg, rgba(186,200,214,.70) 0%, rgba(206,220,232,.92) 52%, rgba(182,198,212,.68) 100%)}

.cta{
  position:absolute; left:calc(var(--u)*625.8); top:calc(var(--u)*555.2);
  width:calc(var(--u)*279.6); height:calc(var(--u)*46.6);
  display:flex; align-items:center; justify-content:center;
  border-radius:999px;
  background:
    linear-gradient(180deg, rgba(6,12,22,0) 45%, rgba(6,12,22,.12) 78%, rgba(6,12,22,.28) 100%),
    linear-gradient(90deg, rgba(255,226,178,.17) 0%, rgba(255,236,208,.07) 22%, rgba(176,206,238,.03) 55%, rgba(150,196,244,.09) 100%),
    linear-gradient(90deg, rgba(255,255,255,.24) 0%, rgba(255,255,255,.17) 12%, rgba(255,255,255,.11) 26%, rgba(255,255,255,.07) 42%, rgba(255,255,255,.05) 60%, rgba(255,255,255,.04) 80%, rgba(255,255,255,.04) 100%);
  -webkit-backdrop-filter:blur(var(--blur)) saturate(.45);
  backdrop-filter:blur(var(--blur)) saturate(.45);
  box-shadow:0 calc(var(--u)*-2) calc(var(--u)*20) rgba(255,224,176,.20), 0 0 var(--glow) rgba(168,204,252,.16), inset 0 var(--hairline) 0 0 rgba(255,251,242,.45);
}
.cta::before{
  content:''; position:absolute; inset:0; border-radius:inherit; padding:var(--hairline); pointer-events:none;
  background:
    linear-gradient(180deg, rgba(255,252,246,.95) 0%, rgba(255,252,246,.20) 45%, rgba(255,252,246,0) 78%),
    linear-gradient(90deg, rgba(255,228,182,.95) 0%, rgba(250,236,210,.70) 12%, rgba(226,230,234,.03) 32%, rgba(214,226,240,.02) 62%, rgba(200,228,250,.70) 90%, rgba(186,224,247,.95) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite:exclude;
}

#word{font-variation-settings:'wght' 531; color:var(--ink)}
#about,#product,#solutions,#login{font-variation-settings:'wght' 506; color:var(--nav)}
#contact{font-variation-settings:'wght' 581; color:var(--navdim)}
#h1a,#h1b{font-variation-settings:'wght' 424; color:var(--ink)}
#sub1,#sub2{font-variation-settings:'wght' 446; color:var(--sub)}
#cta{font-variation-settings:'wght' 497; color:var(--ink)}
#f1,#f2,#f3,#f4{font-variation-settings:'wght' 534; color:var(--feat)}
#foot1,#foot2{font-variation-settings:'wght' 521; color:var(--foot)}

@media (prefers-reduced-motion:no-preference){
  :root{
    --ent-line:cubic-bezier(.16,1,.3,1);
    --ent-soft:cubic-bezier(.25,.8,.35,1);
    --rise:9px;
  }
  @keyframes en-wipe{
    from{clip-path:inset(-.78em 0 calc(100% + .78em) 0); translate:0 var(--rise)}
    to{clip-path:inset(-.78em 0 -.78em 0); translate:0 0}
  }
  @keyframes en-lift{from{opacity:0; translate:0 var(--rise)}}
  @keyframes en-settle{from{opacity:0; translate:0 calc(var(--rise)*.7); scale:.99}}
  @keyframes en-draw{from{scale:1 0}}

  html:not(.is-entered) .brand{animation:en-lift .60s var(--ent-soft) .12s backwards}
  html:not(.is-entered) #about{animation:en-lift .55s var(--ent-soft) .20s backwards}
  html:not(.is-entered) #product{animation:en-lift .55s var(--ent-soft) .25s backwards}
  html:not(.is-entered) #solutions,
  html:not(.is-entered) .caret{animation:en-lift .55s var(--ent-soft) .30s backwards}
  html:not(.is-entered) #login,
  html:not(.is-entered) .navarrow{animation:en-lift .55s var(--ent-soft) .35s backwards}
  html:not(.is-entered) .pill{animation:en-settle .60s var(--ent-soft) .40s backwards}
  html:not(.is-entered) .burger{animation:en-lift .60s var(--ent-soft) .40s backwards}
  html:not(.is-entered) #h1a{animation:en-wipe .95s var(--ent-line) .34s backwards}
  html:not(.is-entered) #h1b{animation:en-wipe .95s var(--ent-line) .44s backwards}
  html:not(.is-entered) #sub1{animation:en-lift .70s var(--ent-soft) .74s backwards}
  html:not(.is-entered) #sub2{animation:en-lift .70s var(--ent-soft) .80s backwards}
  html:not(.is-entered) .cta{animation:en-lift .80s var(--ent-line) .94s backwards}
  html:not(.is-entered) .feats li:nth-child(1){animation:en-lift .60s var(--ent-soft) 1.08s backwards}
  html:not(.is-entered) .feats li:nth-child(2){animation:en-lift .60s var(--ent-soft) 1.15s backwards}
  html:not(.is-entered) .feats li:nth-child(3){animation:en-lift .60s var(--ent-soft) 1.22s backwards}
  html:not(.is-entered) .feats li:nth-child(4){animation:en-lift .60s var(--ent-soft) 1.29s backwards}
  html:not(.is-entered) .rule{animation:en-draw .55s var(--ent-line) 1.34s backwards; transform-origin:top}
  html:not(.is-entered) #foot1{animation:en-lift .60s var(--ent-soft) 1.42s backwards}
  html:not(.is-entered) #foot2{animation:en-lift .60s var(--ent-soft) 1.48s backwards}
}

@media (min-width:1200px) and (min-height:560px) and (min-aspect-ratio:100/95){
  .bar,.hero,.foot{left:50%; width:calc(var(--u)*1536); transform:translateX(-50%)}
  .bar{top:0; height:calc(var(--u)*120)}
  .foot{bottom:0; height:calc(var(--u)*140)}
  .hero{top:50%; height:calc(var(--u)*1024); transform:translate(-50%,-50%)}
  .navtoggle,.burger,.scrim{display:none}
  .navpanel{display:contents}
  .bar > *, .foot > *, .hero > *, .pill, .caret, .navarrow{position:absolute}
  .menu, .menu a, .login{position:static}
  .title,.sub,.feats{inset:0; font-weight:inherit}
  .bar span,.foot span,.title span,.sub span,.feats span,.cta span{position:absolute; line-height:0; white-space:nowrap}

  .brand{position:absolute; left:calc(var(--u)*221); top:calc(var(--u)*55); display:flex; align-items:center; gap:calc(var(--u)*7)}
  .brand svg{width:calc(var(--u)*23); height:calc(var(--u)*17)}
  #word{position:relative; font-size:calc(var(--u)*23.4); letter-spacing:calc(var(--u)*4.8)}

  .caret{left:calc(var(--u)*744); top:calc(var(--u)*62.4); width:calc(var(--u)*9); height:calc(var(--u)*6); stroke-width:calc(var(--u)*1.25)}
  .navarrow{left:calc(var(--u)*1163); top:calc(var(--u)*61.6); width:calc(var(--u)*10); height:calc(var(--u)*9); stroke-width:calc(var(--u)*1.2)}
  .pill{left:calc(var(--u)*1191.5); top:calc(var(--u)*43.5); width:calc(var(--u)*144); height:calc(var(--u)*44); display:flex; align-items:center; justify-content:center}

  .menu{display:flex; gap:calc(var(--u)*28)}
  #about{font-size:calc(var(--u)*13.5); letter-spacing:calc(var(--u)*-0.5); left:calc(var(--u)*477); top:calc(var(--u)*65.66)}
  #product{font-size:calc(var(--u)*13.5); letter-spacing:calc(var(--u)*-0.167); left:calc(var(--u)*568.5); top:calc(var(--u)*65.66)}
  #solutions{font-size:calc(var(--u)*13.5); letter-spacing:calc(var(--u)*-0.5); left:calc(var(--u)*675); top:calc(var(--u)*65.66)}
  #login{font-size:calc(var(--u)*13.5); letter-spacing:calc(var(--u)*-0.227); left:calc(var(--u)*1002.5); top:calc(var(--u)*66.16)}
  #contact{font-size:calc(var(--u)*13.5); letter-spacing:calc(var(--u)*0.25); left:0; right:0; text-align:center; top:calc(var(--u)*21.66); transform:translateX(calc(var(--u)*-0.5))}

  #h1a{font-size:calc(var(--u)*46.8); letter-spacing:calc(var(--u)*0.532); left:0; right:0; text-align:center; top:calc(var(--u)*285.222); transform:translateX(calc(var(--u)*-1))}
  #h1b{font-size:calc(var(--u)*46.8); letter-spacing:calc(var(--u)*-0.398); left:0; right:0; text-align:center; top:calc(var(--u)*335.222); transform:translateX(calc(var(--u)*-3))}
  #sub1{font-size:calc(var(--u)*20.6); letter-spacing:calc(var(--u)*0.367); left:0; right:0; text-align:center; top:calc(var(--u)*408.115); transform:translateX(calc(var(--u)*-0.5))}
  #sub2{font-size:calc(var(--u)*19.1); letter-spacing:calc(var(--u)*-0.632); left:0; right:0; text-align:center; top:calc(var(--u)*432.153); transform:translateX(calc(var(--u)*-2))}

  #cta{font-size:calc(var(--u)*22); letter-spacing:calc(var(--u)*-0.312); left:0; right:0; text-align:center; top:calc(var(--u)*23.113); transform:translateX(calc(var(--u)*-14.5))}
  .cta .arrow{position:absolute; left:calc(var(--u)*230.8); top:calc(var(--u)*17.8); width:calc(var(--u)*16); height:calc(var(--u)*11)}

  .feats li{position:absolute; width:calc(var(--u)*220); height:calc(var(--u)*20)}
  .feats .chev{position:absolute; left:0; top:0; width:calc(var(--u)*11); height:calc(var(--u)*20)}
  .feats li:nth-child(1){left:calc(var(--u)*360); top:calc(var(--u)*718)}
  .feats li:nth-child(2){left:calc(var(--u)*590); top:calc(var(--u)*719)}
  .feats li:nth-child(3){left:calc(var(--u)*803); top:calc(var(--u)*721)}
  .feats li:nth-child(4){left:calc(var(--u)*1013); top:calc(var(--u)*722)}
  #f1,#f2,#f3{font-size:calc(var(--u)*14.6); letter-spacing:calc(var(--u)*-0.75); left:calc(var(--u)*26); top:calc(var(--u)*11.266)}
  #f4{font-size:calc(var(--u)*14.6); letter-spacing:calc(var(--u)*-1.067); left:calc(var(--u)*29); top:calc(var(--u)*11.266)}

  .rule{left:calc(var(--u)*767); top:calc(var(--u)*792); width:1px; height:calc(var(--u)*57)}

  #foot1{font-size:calc(var(--u)*16.3); letter-spacing:calc(var(--u)*-0.256); left:0; right:0; text-align:center; bottom:calc(var(--u)*101.344); transform:translateX(calc(var(--u)*-0.5))}
  #foot2{font-size:calc(var(--u)*16.3); letter-spacing:calc(var(--u)*-0.667); left:0; right:0; text-align:center; bottom:calc(var(--u)*76.344); transform:translateX(calc(var(--u)*-2))}
}

@media (max-width:1199px),(max-height:559px),(max-aspect-ratio:100/95){
  :root{--c:min(calc(100vw / 430), calc(100vh / 860))}
  body{display:flex; flex-direction:column; height:100vh;
    padding:calc(env(safe-area-inset-top) + calc(var(--c)*24)) calc(var(--c)*22) calc(env(safe-area-inset-bottom) + calc(var(--c)*22))}
  .bar,.hero,.foot{position:static; width:100%}
  .bar{order:1; position:relative; z-index:5; display:flex; align-items:center; justify-content:space-between; gap:calc(var(--c)*16)}
  .brand{display:flex; align-items:center; gap:calc(var(--c)*8)}
  .brand svg{width:calc(var(--c)*22); height:auto}
  #word{font-size:calc(var(--c)*19); letter-spacing:.06em}

  .navtoggle{position:absolute; top:0; right:0; width:1px; height:1px; opacity:0; margin:0; pointer-events:none}
  .burger{display:inline-flex; align-items:center; justify-content:center; width:calc(var(--c)*42); height:calc(var(--c)*30); border-radius:999px; cursor:pointer; border:var(--hairline) solid var(--hair); background:rgba(255,255,255,.03);
    -webkit-backdrop-filter:blur(var(--blur)) saturate(.45); backdrop-filter:blur(var(--blur)) saturate(.45)}
  .burger svg{width:calc(var(--c)*19); height:auto; fill:none; stroke:var(--nav); stroke-width:1.4; stroke-linecap:round}
  .burger svg path{transform-box:fill-box; transform-origin:center; transition:transform .24s ease, opacity .18s ease}
  .navtoggle:focus-visible ~ .burger{outline:2px solid #9fe0ff; outline-offset:3px}
  .navtoggle:checked ~ .burger .b1{transform:translateY(6px) rotate(45deg)}
  .navtoggle:checked ~ .burger .b2{opacity:0}
  .navtoggle:checked ~ .burger .b3{transform:translateY(-6px) rotate(-45deg)}
  .scrim{display:none; position:fixed; inset:0; z-index:-1}
  .navtoggle:checked ~ .scrim{display:block}

  .navpanel{position:absolute; top:calc(100% + calc(var(--c)*12)); right:0;
    display:flex; flex-direction:column; gap:calc(var(--c)*2);
    width:min(calc(var(--c)*268), 78vw); padding:calc(var(--c)*12);
    border-radius:calc(var(--c)*20);
    background:
      linear-gradient(180deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,.045) 100%),
      linear-gradient(90deg, rgba(255,226,178,.06) 0%, rgba(150,196,244,.06) 100%),
      linear-gradient(180deg, rgba(6,12,22,.60) 0%, rgba(6,12,22,.70) 100%);
    -webkit-backdrop-filter:blur(var(--blur)) saturate(.45); backdrop-filter:blur(var(--blur)) saturate(.45);
    box-shadow:0 calc(var(--c)*14) calc(var(--c)*38) rgba(2,6,14,.45);
    opacity:0; transform:translateY(calc(var(--c)*-8)) scale(.985); transform-origin:100% 0; pointer-events:none;
    transition:opacity .2s ease, transform .2s ease}
  .navtoggle:checked ~ .navpanel{opacity:1; transform:none; pointer-events:auto}
  .navpanel .menu{display:flex; flex-direction:column}
  .navpanel .menu a, .navpanel .login{display:flex; align-items:center; gap:calc(var(--c)*8); padding:calc(var(--c)*10) calc(var(--c)*12);
    border-radius:calc(var(--c)*12); font-size:calc(var(--c)*16); color:var(--nav); transition:background .15s ease}
  .navpanel .menu a:hover, .navpanel .login:hover{background:rgba(255,255,255,.07)}
  .navpanel .caret, .navpanel .navarrow{margin-left:auto; height:auto}
  .navpanel .caret{width:calc(var(--c)*10)}
  .navpanel .navarrow{width:calc(var(--c)*11)}
  .navpanel .pill{margin-top:calc(var(--c)*8); text-align:center; white-space:nowrap; padding:calc(var(--c)*11) calc(var(--c)*16); font-size:calc(var(--c)*15)}

  .hero{order:2; flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:calc(var(--c)*20)}
  .title{font-size:calc(var(--c)*33); line-height:1.12; max-width:15ch}
  .sub{color:var(--sub); font-size:calc(var(--c)*17); line-height:1.32; max-width:26ch}
  .cta{position:relative; display:inline-flex; align-items:center; gap:calc(var(--c)*12); padding:calc(var(--c)*16) calc(var(--c)*26); font-size:calc(var(--c)*18); left:auto; top:auto; width:auto; height:auto}
  .cta .arrow{width:calc(var(--c)*16); height:calc(var(--c)*11)}
  .feats{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:calc(var(--c)*15) calc(var(--c)*13); width:100%; max-width:calc(var(--c)*400); margin-top:calc(var(--c)*6)}
  .feats li{display:flex; align-items:center; gap:calc(var(--c)*9); font-size:calc(var(--c)*14); position:static; width:auto; height:auto}
  .feats .chev{width:calc(var(--c)*9); height:calc(var(--c)*16); flex:none; position:static}
  .rule{width:1px; height:calc(var(--c)*33); margin:calc(var(--c)*19) auto 0}
  .foot{order:3; text-align:center; color:var(--foot); font-size:calc(var(--c)*13); line-height:1.55}
  .foot span{display:block}
}

@media (max-width:599px),(max-height:429px){
  :root{--c:min(calc(100vw / 360), calc(100vh / 770), 1px); --rise:6px}
  body{padding:calc(env(safe-area-inset-top) + calc(var(--c)*28)) calc(var(--c)*26) calc(env(safe-area-inset-bottom) + calc(var(--c)*26))}
  .brand svg{width:calc(var(--c)*24)} #word{font-size:calc(var(--c)*19)}
  .burger{width:calc(var(--c)*46); height:calc(var(--c)*33); position:relative}
  .burger::after{content:''; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:max(44px,100%); height:max(44px,100%)}
  .burger svg{width:calc(var(--c)*21)}
  .navpanel{width:min(calc(var(--c)*300), 82vw); padding:calc(var(--c)*15); border-radius:calc(var(--c)*22)}
  .navpanel .menu a,.navpanel .login{font-size:calc(var(--c)*16); padding:calc(var(--c)*13) calc(var(--c)*14); border-radius:calc(var(--c)*13); min-height:max(44px,calc(var(--c)*44))}
  .navpanel .pill{font-size:calc(var(--c)*16); padding:calc(var(--c)*13) calc(var(--c)*18); margin-top:calc(var(--c)*9)}

  .veil{background:
    radial-gradient(130% 44% at 50% 45%, rgba(var(--veil),.50) 0%, rgba(var(--veil),.26) 55%, rgba(var(--veil),0) 100%),
    linear-gradient(180deg, rgba(var(--veil),.34) 0%, rgba(var(--veil),0) 20%, rgba(var(--veil),0) 60%, rgba(var(--veil),.36) 100%)}

  .hero{gap:calc(var(--c)*22)}
  .title{font-size:calc(var(--c)*32); line-height:1.2; letter-spacing:-.002em; max-width:none; text-wrap:balance}
  .title span{display:block}
  .sub{font-size:calc(var(--c)*16); line-height:1.45; max-width:none; text-wrap:balance}
  .sub span{display:block}
  .cta{font-size:calc(var(--c)*16.5); padding:calc(var(--c)*15) calc(var(--c)*28); gap:calc(var(--c)*12)}
  .cta .arrow{width:calc(var(--c)*17); height:calc(var(--c)*12)}
  .feats{grid-template-columns:repeat(2,max-content); justify-content:center; width:auto; max-width:none; gap:calc(var(--c)*16) calc(var(--c)*16); margin-top:calc(var(--c)*22)}
  .feats li{font-size:calc(var(--c)*13); gap:calc(var(--c)*10)}
  .feats .chev{width:calc(var(--c)*10); height:calc(var(--c)*18)}
  .rule{height:calc(var(--c)*30); margin:calc(var(--c)*28) auto 0}
  .foot{font-size:calc(var(--c)*13.5); line-height:1.65; text-wrap:balance}
}

@media (max-height:429px) and (min-aspect-ratio:1/1){
  :root{--c:min(calc(100vw / 760), calc(100vh / 430))}
  .hero{gap:calc(var(--c)*12)}
  .title{font-size:calc(var(--c)*31); line-height:1.2; max-width:26ch}
  .sub{font-size:calc(var(--c)*16); max-width:44ch} .sub span{display:inline}
  .cta{font-size:calc(var(--c)*15.5); padding:calc(var(--c)*12) calc(var(--c)*24)}
  .feats{grid-template-columns:repeat(4,max-content); justify-content:center; max-width:none; gap:calc(var(--c)*24); margin-top:calc(var(--c)*2)}
  .feats li{font-size:calc(var(--c)*13.5)}
  .rule{height:calc(var(--c)*20); margin:calc(var(--c)*10) auto 0}
  .foot{font-size:calc(var(--c)*13)}
}

@media (min-width:600px) and (min-height:430px){
  :root{--c:min(calc(100vw / 860), calc(100vh / 1120))}
  body{padding:calc(env(safe-area-inset-top) + calc(var(--c)*40)) calc(var(--c)*44) calc(env(safe-area-inset-bottom) + calc(var(--c)*36))}
  .brand svg{width:calc(var(--c)*34)} #word{font-size:calc(var(--c)*30)}
  .burger{width:calc(var(--c)*60); height:calc(var(--c)*44)}
  .burger svg{width:calc(var(--c)*27); stroke-width:1.2}
  .navpanel{width:min(calc(var(--c)*330), 56vw); padding:calc(var(--c)*16); border-radius:calc(var(--c)*26); gap:calc(var(--c)*4)}
  .navpanel .menu a,.navpanel .login{font-size:calc(var(--c)*20); padding:calc(var(--c)*13) calc(var(--c)*15); border-radius:calc(var(--c)*15); gap:calc(var(--c)*10)}
  .navpanel .caret{width:calc(var(--c)*13)}
  .navpanel .navarrow{width:calc(var(--c)*14)}
  .navpanel .pill{margin-top:calc(var(--c)*10); padding:calc(var(--c)*14) calc(var(--c)*20); font-size:calc(var(--c)*19)}
  .hero{gap:calc(var(--c)*26)}
  .title{font-size:calc(var(--c)*46); line-height:1.15; max-width:none}
  .title span{display:block}
  .sub{font-size:calc(var(--c)*21); line-height:1.34; max-width:none}
  .sub span{display:block}
  .cta{gap:calc(var(--c)*14); padding:calc(var(--c)*18) calc(var(--c)*34); font-size:calc(var(--c)*21)}
  .cta .arrow{width:calc(var(--c)*20); height:calc(var(--c)*14)}
  .feats{grid-template-columns:repeat(2,max-content); justify-content:center; gap:calc(var(--c)*22) calc(var(--c)*54); max-width:none; margin-top:calc(var(--c)*12)}
  .feats li{gap:calc(var(--c)*12); font-size:calc(var(--c)*16)}
  .feats .chev{width:calc(var(--c)*12); height:calc(var(--c)*21)}
  .rule{height:calc(var(--c)*46); margin:calc(var(--c)*30) auto 0}
  .foot{font-size:calc(var(--c)*16)}
}

@media (min-width:600px) and (min-height:430px) and (min-aspect-ratio:1/1){
  :root{--c:min(calc(100vw / 1040), calc(100vh / 780))}
  .feats{grid-template-columns:repeat(4,max-content); gap:calc(var(--c)*40)}
}

@supports (height:100dvh){
  @media (max-width:1199px),(max-height:559px),(max-aspect-ratio:100/95){
    :root{--c:min(calc(100vw / 430), calc(100dvh / 860))}
    body{height:100dvh}
    @media (max-width:599px),(max-height:429px){:root{--c:min(calc(100vw / 360), calc(100dvh / 770), 1px)}}
    @media (max-height:429px) and (min-aspect-ratio:1/1){:root{--c:min(calc(100vw / 760), calc(100dvh / 430))}}
    @media (min-width:600px) and (min-height:430px){
      :root{--c:min(calc(100vw / 860), calc(100dvh / 1120))}
      @media (min-aspect-ratio:1/1){:root{--c:min(calc(100vw / 1040), calc(100dvh / 780))}}
    }
  }
}

@media (prefers-reduced-motion:reduce){
  *{animation:none!important; transition:none!important}
}
</style>
</head>
<body>
<div class="art"><canvas id="fiber"></canvas></div>
<div class="veil"></div>

<header class="bar">
  <a class="brand" href="#">
    <svg viewBox="0 0 23 17" aria-hidden="true" width="23" height="17">
      <path d="M8.15 0.9 L4.55 0.9 L0.5 9.3 L4.1 9.3 Z"/>
      <path d="M17.0 0 L13.4 0 L6.15 16.4 L9.75 16.4 Z"/>
      <path d="M22.9 0 L19.3 0 L15.0 7.6 L18.6 7.6 Z"/>
      <path d="M22.6 6.9 L19.0 6.9 L14.05 16.4 L17.65 16.4 Z"/>
    </svg>
    <span id="word">NOVA</span>
  </a>
  <input class="navtoggle" type="checkbox" id="nav-open">
  <label class="scrim" for="nav-open" aria-hidden="true"></label>
  <label class="burger" for="nav-open" aria-label="Menu">
    <svg viewBox="0 0 22 14" aria-hidden="true">
      <path class="b1" d="M1 1 H21"/>
      <path class="b2" d="M1 7 H21"/>
      <path class="b3" d="M1 13 H21"/>
    </svg>
  </label>
  <div class="navpanel">
    <nav class="menu">
      <a href="#"><span id="about">关于</span></a>
      <a href="#"><span id="product">产品</span></a>
      <a href="#"><span id="solutions">方案</span>
        <svg class="caret" viewBox="0 0 9 6" aria-hidden="true"><path d="M0.7 1.1 L4.5 4.6 L8.3 1.1"/></svg></a>
    </nav>
    <a class="login" href="#"><span id="login">登录 / 申请体验</span>
      <svg class="navarrow" viewBox="0 0 10 9" aria-hidden="true"><path d="M0 4.5 H9.1 M5.4 0.9 L9.2 4.5 L5.4 8.1"/></svg></a>
    <a class="pill" href="#"><span id="contact">联系销售</span></a>
  </div>
</header>

<main class="hero">
  <h1 class="title"><span id="h1a">世界级数字产品</span><span id="h1b">准时交付，精准命中。</span></h1>
  <p class="sub"><span id="sub1">我们为雄心勃勃的团队</span><span id="sub2">打造非凡产品。</span></p>
  <a class="cta" href="#"><span id="cta">立即开始</span>
    <svg class="arrow" viewBox="0 0 16 11" aria-hidden="true"><path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8"/></svg></a>
  <ul class="feats">
    <li><svg class="chev" viewBox="0 0 11 20" aria-hidden="true"><path d="M1.15 1.15 L9.6 10 L1.15 18.85"/></svg><span id="f1">战略伙伴</span></li>
    <li><svg class="chev" viewBox="0 0 11 20" aria-hidden="true"><path d="M1.15 1.15 L9.6 10 L1.15 18.85"/></svg><span id="f2">端到端交付</span></li>
    <li><svg class="chev" viewBox="0 0 11 20" aria-hidden="true"><path d="M1.15 1.15 L9.6 10 L1.15 18.85"/></svg><span id="f3">长期影响</span></li>
    <li><svg class="chev" viewBox="0 0 11 20" aria-hidden="true"><path d="M1.15 1.15 L9.6 10 L1.15 18.85"/></svg><span id="f4">持续迭代</span></li>
  </ul>
  <span class="rule" aria-hidden="true"></span>
</main>

<footer class="foot">
  <span id="foot1">深受全球创新团队信赖。</span>
  <span id="foot2">2024</span>
</footer>

<script>
/* 背景：canvas 模拟金色/蓝色光纤向中心汇聚，无外部视频与图片 */
(function(){
  var cv=document.getElementById('fiber'), ctx=cv.getContext('2d');
  var W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);
  var strands=[], clouds=[], t0=performance.now();
  var GOLD='#ffcb6b', BLUE='#5fb8ff', WHITE='rgba(255,255,255,0.95)';
  function resize(){
    W=window.innerWidth; H=window.innerHeight;
    cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR);
    cv.style.width=W+'px'; cv.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    build();
  }
  function build(){
    strands=[]; clouds=[];
    var cx=W/2, cy=H/2;
    var corners=[[0,0],[W,0],[0,H],[W,H]];
    var colors=[GOLD,GOLD,BLUE,BLUE];
    for(var c=0;c<4;c++){
      for(var i=0;i<8;i++){
        var sx=corners[c][0], sy=corners[c][1];
        strands.push({
          x:sx, y:sy, color:colors[c], life:Math.random()*1,
          speed:0.0008+Math.random()*0.0008, phase:Math.random()*Math.PI*2,
          amp:40+Math.random()*80, offset:(c*8+i)*0.12
        });
      }
    }
    for(var k=0;k<5;k++){
      clouds.push({x:Math.random()*W, y:H*(0.55+Math.random()*0.45), r:120+Math.random()*220, s:0.00005+Math.random()*0.00008});
    }
  }
  function draw(){
    var now=(performance.now()-t0)/1000;
    var cx=W/2, cy=H/2;
    ctx.fillStyle='#02060f'; ctx.fillRect(0,0,W,H);

    /* 缓慢推进的暗角 */
    var zoom=1+now*0.01;
    ctx.save();
    ctx.translate(cx,cy); ctx.scale(zoom,zoom); ctx.translate(-cx,-cy);

    /* 底部云层 */
    for(var i=0;i<clouds.length;i++){
      var c=clouds[i]; c.x+=c.s*W; if(c.x-c.r>W) c.x=-c.r;
      var g=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.r);
      g.addColorStop(0,'rgba(6,10,18,0.55)'); g.addColorStop(1,'rgba(6,10,18,0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(c.x,c.y,c.r,0,Math.PI*2); ctx.fill();
    }

    /* 中心光晕 */
    var pulse=1+Math.sin(now*0.4)*0.08;
    var glow=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(W,H)*0.45*pulse);
    glow.addColorStop(0,'rgba(255,255,255,0.28)');
    glow.addColorStop(0.25,'rgba(255,226,178,0.12)');
    glow.addColorStop(0.55,'rgba(95,184,255,0.06)');
    glow.addColorStop(1,'rgba(2,6,15,0)');
    ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);

    /* 光纤粒子 */
    ctx.lineCap='round';
    for(var s=0;s<strands.length;s++){
      var st=strands[s];
      st.life+=st.speed; if(st.life>1){st.life=0; st.phase=Math.random()*Math.PI*2;}
      var p=st.life;
      /* 从角到中心，带轻微正弦摆动 */
      var tx=cx, ty=cy;
      var x=st.x+(tx-st.x)*p+Math.sin(p*Math.PI*2+st.phase)*st.amp;
      var y=st.y+(ty-st.y)*p+Math.cos(p*Math.PI*1.5+st.phase)*st.amp*0.5;
      var r=(1-p)*2.4+0.6;
      var a=(1-Math.abs(p-0.5)*2)*0.85;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle=st.color.replace(')',','+a+')').replace('rgb','rgba');
      ctx.shadowBlur=12; ctx.shadowColor=st.color;
      ctx.fill();
      ctx.shadowBlur=0;
    }
    ctx.restore();
    requestAnimationFrame(draw);
  }
  var rt;
  addEventListener('resize',function(){clearTimeout(rt); rt=setTimeout(resize,140);});
  resize(); requestAnimationFrame(draw);
})();

/* 入场动画退休：2.1s 后给 html 加 is-entered，避免断点切换时重播 */
(function(){
  var done=function(){ document.documentElement.classList.add('is-entered'); };
  var f2=document.getElementById('foot2');
  var t=setTimeout(done,2600);
  if(f2) f2.addEventListener('animationend',function(){ clearTimeout(t); done(); },{once:true});
})();

/* 参数联动：postMessage({type:'param',key,value}) */
(function(){
  var state={
    ink:'#ffffff', sub:'#a2a9b8', nav:'#fbfdff', navdim:'#e8ecf0',
    blur:26, glow:34, hairline:1.6, veilAlpha:0.16
  };
  function apply(){
    var r=document.documentElement.style;
    r.setProperty('--ink',state.ink); r.setProperty('--sub',state.sub); r.setProperty('--nav',state.nav); r.setProperty('--navdim',state.navdim);
    r.setProperty('--blur',state.blur+'px'); r.setProperty('--glow',state.glow+'px'); r.setProperty('--hairline',Math.max(1,state.hairline)+'px');
    /* veil 重新拼 gradient，alpha 跟随 veilAlpha */
    var a=state.veilAlpha;
    var style=document.querySelector('.veil').style;
    style.background='radial-gradient(140% 60% at 50% 40%, rgba(var(--veil),'+a+') 0%, rgba(var(--veil),'+(a*0.36)+') 50%, rgba(var(--veil),0) 100%), linear-gradient(180deg, rgba(var(--veil),0) 45%, rgba(var(--veil),'+(a*0.625)+') 100%)';
  }
  addEventListener('message',function(e){
    var d=e.data; if(!d||d.type!=='param'||!(d.key in state))return;
    state[d.key]=d.value; apply();
  });
})();
</script>
</body>
</html>
`,
    片段: ":root{--ink:#ffffff;--sub:#a2a9b8;--nav:#fbfdff;--foot:#f4f8fd;--chev:rgba(214,232,250,.90);--hair:rgba(196,214,232,.72);--navdim:#e8ecf0;--veil:6,10,18;--blur:26px;--glow:34px;--hairline:1.6px}\n.art canvas{display:block;width:100%;height:100%}\n.veil{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(140% 60% at 50% 40%,rgba(var(--veil),.16) 0%,rgba(var(--veil),.057) 50%,rgba(var(--veil),0) 100%),linear-gradient(180deg,rgba(var(--veil),0) 45%,rgba(var(--veil),.10) 100%)}\n.cta{position:absolute;border-radius:999px;-webkit-backdrop-filter:blur(var(--blur)) saturate(.45);backdrop-filter:blur(var(--blur)) saturate(.45);box-shadow:0 calc(var(--u)*-2) calc(var(--u)*20) rgba(255,224,176,.20),0 0 var(--glow) rgba(168,204,252,.16),inset 0 var(--hairline) 0 0 rgba(255,251,242,.45)}\n#word{font-variation-settings:'wght' 531;color:var(--ink)}#h1a,#h1b{font-variation-settings:'wght' 424;color:var(--ink)}",
    参数: [
      { 键: "ink", 名: "主文字色", 类型: "color", 默认: "#ffffff" },
      { 键: "sub", 名: "副文字色", 类型: "color", 默认: "#a2a9b8" },
      { 键: "nav", 名: "导航文字色", 类型: "color", 默认: "#fbfdff" },
      { 键: "navdim", 名: "次要导航色", 类型: "color", 默认: "#e8ecf0" },
      { 键: "blur", 名: "玻璃模糊(px)", 类型: "slider", 默认: 26, 最小: 0, 最大: 60, 步长: 1, 单位: "px" },
      { 键: "glow", 名: "CTA 光晕(px)", 类型: "slider", 默认: 34, 最小: 0, 最大: 80, 步长: 1, 单位: "px" },
      { 键: "hairline", 名: "边框细线(px)", 类型: "slider", 默认: 1.6, 最小: 0.5, 最大: 4, 步长: 0.1, 单位: "px" },
      { 键: "veilAlpha", 名: "遮罩浓度", 类型: "slider", 默认: 0.16, 最小: 0, 最大: 0.6, 步长: 0.01 }
    ],
    来源: "机制参考自 motionsites.ai（2026-09-20 分析）：全屏视频/动态背景首屏 + 玻璃拟态 CTA + CSS 入场动画；已换题重推为「NOVA 数字工作室」，品牌与文案全部替换，视觉表达保留机制并改用 canvas 离线生成背景，非复刻"
  },
  {
    id: "S37",
    风格名: "茶道风味测评",
    适配端: "通用",
    风格: "有机自然",
    场景: "官网·品牌站",
    骨架: "手机框内单屏测评：顶栏玻璃徽章 + 标题区 + 四选一卡片网格 + 语音按钮 + 滑动确认",
    配色: {
      "陶土米底(底)": "78%",
      "白字": "15%",
      "金茶强调(CTA)": "7%"
    },
    布局骨架: "375×780 手机框（圆角52、bezel 阴影模拟真机）+ 屏内 flex 纵向：玻璃徽章（茶盏图标+茗涧风味志）→ 副标+主标 → 四选一玻璃卡网格（2列，可 toggle）→ 语音波形按钮（金茶光晕）→ 滑动确认（白 thumb，85% 阈值）",
    重色落点: "暖绿陶土茶系为底，白色文字浮于玻璃之上，金茶仅用于语音光晕与选中描边，是全屏唯一动作色",
    第一屏内容: "玻璃徽章 + 标题区 + 四选一网格 + 语音按钮 + 滑动确认",
    删减元素: "不引外部图片/视频/字体；背景用 CSS 渐变模拟茶山雾气替代外部图",
    适用: "茶酒香氛等生活方式品牌的移动端风味测评/会员引导/首屏问卷",
    禁忌: "信息密度高需多屏滚动的工具站；高饱和撞色；引入外部图片视频字体",
    参考站: ["motionsites.ai"],
    我的说明: "把 motionsites.ai 的 wellness-companion 机制（液态玻璃卡 + 四选一 toggle + 语音波形按钮 + 滑动确认 85% 阈值）拿过来，换题重推为「茗涧风味志」茶道风味测评。品牌名、四选项、文案全部替换；配色由白灰玻璃改为暖绿陶土茶系；背景用 CSS 渐变模拟茶山雾气替代外部图，字体降级为系统字体栈，非复刻。",
    Agent提示词: `【茶道风味测评 · 设计语言宪法】
效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。

第一章 总纲 · 设计哲学
禅意自然的中式茶测评首屏。液态玻璃承载内容，暖绿陶土茶系作底，金茶一笔作唯一动作色。气质：静、雅、温润、慢。适用：茶酒香氛等生活方式品牌的移动端测评/引导屏。

第二章 色彩板与角色
陶土米底 #cfc8b4（屏幕底，78%，页面唯一画布）；白字 #ffffff（主文字，15%）；金茶强调 #c79a3e（7%，仅用于语音光晕与选中态描边）；玻璃白 rgba(255,255,255,.16)（卡片/徽章底色）。

第三章 字体规则
字体栈：system-ui / -apple-system / "PingFang SC" / "Microsoft YaHei" / sans-serif；标题 ~27、副标 ~14、卡片字 ~16、徽章 ~12，靠 --u 统一缩放；窄屏流式自适应。

第四章 组件规范
液态玻璃卡：圆角 32、内发光 1px、渐变描边（mask-composite 排除法）；四选一卡片可 toggle，选中态提亮玻璃 + 强描边。语音按钮：圆形玻璃 + 金茶径向光晕 + 5 竖条波形 SVG。滑动确认：56px 玻璃轨道 + 白色圆形 thumb，拖过 85% 吸附到位，否则回弹。

第五章 布局法
手机框 375×780、圆角 52、bezel box-shadow 模拟真机；屏内 flex 纵向：玻璃徽章 → 标题区 → 四选一网格（2 列） → 语音按钮 → 滑动确认。背景用 CSS 渐变模拟茶山雾气 + blur(12px)，替代外部图。

第六章 深度与层级
模糊背景层（z0）→ veil 半透叠加（z1）→ 内容层（z2）。玻璃卡靠 backdrop-filter 透出背景，形成景深。

第七章 动效
统一入场时间线 0.85s，cubic-bezier(.22,1,.36,1)，fill forwards；延迟：徽章 .10 / 标题 .25 / 卡片 .40-.64 / 语音 .70 / 滑块 .85。卡片点击瞬时 toggle，滑块拖拽带阻尼回弹。

第八章 适用
茶/酒/香氛/养生品牌的移动端风味测评、会员引导、首屏问卷；需「安静高级感」的轻交互页。

第九章 禁忌
信息密度高、需多屏滚动的工具站；高饱和撞色；引入外部图片/视频/字体（本项目离线零外链）。`,
    演示页: "assets/demos/方案-茶道风味测评.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>茗涧风味志 — 茶道风味测评</title>
<style>
:root{
  --frame:#7c8a6f; --screen:#cfc8b4; --ink:#ffffff; --gold:#c79a3e;
  --glassA:0.16; --blur:4px; --radius:52px; --u:1;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
  background:radial-gradient(120% 90% at 50% 0%,#f2eee2 0%,#d9d2bf 70%,#c7bfa8 100%);
  display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px;
}
/* 手机框 */
.phone{
  position:relative;width:min(375px, calc(100vw - 32px));height:auto;aspect-ratio:375 / 780;border-radius:var(--radius);
  background:var(--frame);
  box-shadow:inset 0 0 0 2px rgba(255,255,255,.08),0 0 0 1px rgba(0,0,0,.45),0 0 0 10px #2a2823,0 0 0 11px rgba(255,255,255,.06),0 0 60px rgba(0,0,0,.35);
  overflow:hidden;
}
.island{position:absolute;top:14px;left:50%;transform:translateX(-50%);width:120px;height:32px;background:#16140f;border-radius:999px;z-index:50}
.screen{position:absolute;inset:11px;border-radius:42px;overflow:hidden;background:var(--screen)}
/* 模糊背景(用渐变模拟茶山雾气,替代外部图) */
.bg{position:absolute;inset:-20px;background:
  radial-gradient(60% 40% at 30% 20%,rgba(124,138,111,.55),transparent 60%),
  radial-gradient(50% 45% at 75% 35%,rgba(199,154,62,.30),transparent 60%),
  linear-gradient(160deg,#d7d0bd 0%,#bcb59c 60%,#a89e80 100%);
  filter:blur(12px) saturate(1.1);transform:scale(1.1)}
.bg::after{content:"";position:absolute;inset:0;background:var(--frame);opacity:.28}
.veil{position:absolute;inset:0;background:linear-gradient(180deg,rgba(124,138,111,.10),rgba(124,138,111,.34));z-index:1}
.col{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;padding:56px 24px 24px}
/* 入场动画 */
@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.fade{opacity:0;animation:up .5s cubic-bezier(.22,1,.36,1) forwards}
.d1{animation-delay:.10s}.d2{animation-delay:.25s}.d3{animation-delay:.40s}.d4{animation-delay:.48s}
.d5{animation-delay:.56s}.d6{animation-delay:.64s}.d7{animation-delay:.70s}.d8{animation-delay:.85s}
/* 液态玻璃 */
.lg{background:rgba(255,255,255,var(--glassA));-webkit-backdrop-filter:blur(var(--blur));backdrop-filter:blur(var(--blur));
  box-shadow:inset 0 1px 1px rgba(255,255,255,.1);position:relative;border-radius:999px}
.lg::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.4px;
  background:linear-gradient(180deg,rgba(255,255,255,.45) 0%,rgba(255,255,255,.15) 20%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 60%,rgba(255,255,255,.15) 80%,rgba(255,255,255,.45) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
/* header badge */
.badge{display:inline-flex;align-items:center;gap:6px;padding:10px 12px;align-self:flex-start;margin-bottom:40px}
.badge svg{width:14px;height:14px;color:rgba(255,255,255,.85)}
.badge span{font-size:12px;color:rgba(255,255,255,.92);font-weight:500}
/* 标题 */
.sub{color:rgba(255,255,255,.72);font-size:14px;margin-bottom:10px}
.h1{color:var(--ink);font-size:27px;font-weight:500;line-height:1.15;letter-spacing:-.01em;margin-bottom:32px}
/* 选择网格 */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;flex:1}
.card{position:relative;height:100px;border-radius:32px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;
  background:rgba(255,255,255,var(--glassA));-webkit-backdrop-filter:blur(var(--blur));backdrop-filter:blur(var(--blur));
  box-shadow:inset 0 1px 1px rgba(255,255,255,.1);cursor:pointer;transition:transform .15s ease}
.card::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.4px;
  background:linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0) 40%,rgba(255,255,255,.15) 80%,rgba(255,255,255,.45));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.card .num{font-size:11px;font-weight:500;color:rgba(255,255,255,.5)}
.card .txt{font-size:16px;font-weight:500;color:var(--ink)}
.card.on{background:rgba(255,255,255,.30);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);
  box-shadow:inset 0 1px 2px rgba(255,255,255,.2)}
.card.on::before{background:linear-gradient(180deg,rgba(255,255,255,.6) 0%,rgba(255,255,255,.25) 20%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 60%,rgba(255,255,255,.25) 80%,rgba(255,255,255,.6) 100%)}
/* 语音按钮 */
.voice{display:flex;flex-direction:column;align-items:center;gap:8px;margin:24px 0}
.voice .halo{position:relative;width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.voice .halo::before{content:"";position:absolute;inset:-10px;border-radius:50%;
  background:radial-gradient(ellipse at center,rgba(199,154,62,.5) 0%,rgba(199,154,62,.2) 40%,transparent 70%)}
.voice .btn{position:relative;width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,var(--glassA));
  -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:inset 0 1px 2px rgba(255,255,255,.25);
  display:flex;align-items:center;justify-content:center}
.voice svg{width:30px;height:24px}
.voice .lab{font-size:12px;color:rgba(255,255,255,.78)}
/* 滑动确认 */
.slide{position:relative;height:56px;border-radius:999px;background:rgba(255,255,255,var(--glassA));
  -webkit-backdrop-filter:blur(var(--blur));backdrop-filter:blur(var(--blur));box-shadow:inset 0 1px 1px rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;margin:0 0 4px;touch-action:none}
.slide .txt{font-size:14px;font-weight:500;color:rgba(255,255,255,.6)}
.slide .chev{position:absolute;right:18px;display:flex;gap:4px}
.slide .chev i{width:14px;height:14px;color:rgba(255,255,255,.4)}
.slide .thumb{position:absolute;left:6px;top:6px;width:44px;height:44px;border-radius:50%;background:#fff;
  display:flex;align-items:center;justify-content:center;cursor:grab;transition:transform .12s ease}
.slide .thumb svg{width:20px;height:20px;color:#5a5440}
.slide.done .thumb{transform:translateX(265px)}
.slide.done .txt{opacity:0}
</style>
</head>
<body>
<div class="phone">
  <div class="island"></div>
  <div class="screen">
    <div class="bg"></div>
    <div class="veil"></div>
    <div class="col">
      <div class="badge lg fade d1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c3 3 3 6 0 9-3-3-3-6 0-9z"/><path d="M12 12v9"/></svg>
        <span>茗涧风味志</span>
      </div>
      <div class="fade d2">
        <div class="sub">请选择你偏好的风味</div>
        <div class="h1">你想要一杯怎样的茶？</div>
      </div>
      <div class="grid">
        <div class="card on fade d3" data-id="1"><div class="num">01</div><div class="txt">清香</div></div>
        <div class="card fade d4" data-id="2"><div class="num">02</div><div class="txt">醇厚</div></div>
        <div class="card on fade d5" data-id="3"><div class="num">03</div><div class="txt">甘甜</div></div>
        <div class="card fade d6" data-id="4"><div class="num">04</div><div class="txt">陈韵</div></div>
      </div>
      <div class="voice fade d7">
        <div class="halo"><div class="btn">
          <svg viewBox="0 0 30 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"><line x1="4" y1="12" x2="4" y2="12"/><line x1="10" y1="6" x2="10" y2="18"/><line x1="16" y1="9" x2="16" y2="15"/><line x1="22" y1="4" x2="22" y2="20"/><line x1="28" y1="11" x2="28" y2="13"/></svg>
        </div></div>
        <div class="lab">说出你的偏好</div>
      </div>
      <div class="slide fade d8" id="slide">
        <div class="txt">开始测评</div>
        <div class="chev"><i>›</i><i>›</i><i>›</i></div>
        <div class="thumb" id="thumb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
// 卡片 toggle
document.querySelectorAll('.card').forEach(function(c){
  c.addEventListener('click',function(){c.classList.toggle('on')});
});
// 滑动确认(85% 阈值)
(function(){
  var slide=document.getElementById('slide'),thumb=document.getElementById('thumb');
  var max=265,drag=false,startX=0,cur=0;
  function down(e){drag=true;startX=(e.touches?e.touches[0].clientX:e.clientX)-cur;thumb.style.transition='none';}
  function move(e){if(!drag)return;var x=(e.touches?e.touches[0].clientX:e.clientX)-startX;x=Math.max(0,Math.min(max,x));cur=x;thumb.style.transform='translateX('+x+'px)';}
  function up(){drag=false;thumb.style.transition='transform .12s ease';if(cur>max*0.85){cur=max;thumb.style.transform='translateX('+max+'px)';slide.classList.add('done');}else{cur=0;thumb.style.transform='translateX(0)';}}
  thumb.addEventListener('mousedown',down);window.addEventListener('mousemove',move);window.addEventListener('mouseup',up);
  thumb.addEventListener('touchstart',down,{passive:true});window.addEventListener('touchmove',move,{passive:true});window.addEventListener('touchend',up);
})();
<\/script>
</body>
</html>
`,
    片段: `:root{--frame:#7c8a6f;--screen:#cfc8b4;--ink:#fff;--gold:#c79a3e;--glassA:.16;--blur:4px;--radius:52px}
.phone{border-radius:var(--radius);background:var(--frame);box-shadow:inset 0 0 0 2px rgba(255,255,255,.08),0 0 0 1px rgba(0,0,0,.45),0 0 0 10px #2a2823,0 0 0 11px rgba(255,255,255,.06),0 0 60px rgba(0,0,0,.35)}
.lg{background:rgba(255,255,255,var(--glassA));backdrop-filter:blur(var(--blur));box-shadow:inset 0 1px 1px rgba(255,255,255,.1);position:relative}
.lg::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.4px;background:linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0) 40%,rgba(255,255,255,.15) 80%,rgba(255,255,255,.45));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}`,
    参数: [{"键":"frame","名":"手机框底色","类型":"color","默认":"#7c8a6f"},{"键":"screen","名":"屏幕底色","类型":"color","默认":"#cfc8b4"},{"键":"ink","名":"主文字色","类型":"color","默认":"#ffffff"},{"键":"gold","名":"金茶强调","类型":"color","默认":"#c79a3e"},{"键":"glassA","名":"玻璃透明度","类型":"number","默认":"0.16"},{"键":"blur","名":"玻璃模糊(px)","类型":"number","默认":"4"},{"键":"radius","名":"手机框圆角","类型":"number","默认":"52"}],
    来源: "机制参考自 motionsites.ai（wellness-companion，2026-09-22 分析）：液态玻璃卡 + 四选一 toggle + 语音波形按钮 + 滑动确认（85% 阈值）；已换题重推为「茗涧风味志」茶道测评，品牌与文案全部替换，配色由白灰玻璃改为暖绿陶土茶系，视觉表达保留机制并改用 CSS 渐变模拟背景，非复刻"
  }
,
  {
    id: "S38",
    风格名: "登山者英雄页",
    适配端: "通用",
    风格: "暗色",
    场景: "落地页·发布页",
    骨架: "三手机视差阵列并陈，每屏独立叙事（英雄 / 数据 / 队伍）+ 橙黑菜单覆盖",
    配色: {
      "暗夜底(底)": "78%",
      "白字": "15%",
      "橙金强调(CTA)": "7%"
    },
    布局骨架: "三台手机 flex 行、底部对齐、gap 视差、延迟入场；屏1 英雄（位置块 + clip-path 山体人形 + 底部 mask 模糊 + 名字大字）、屏2 数据（SVG 路线 + 三 count-up 数字）、屏3 队伍（队名 + 两玻璃队员卡）；顶导航 logo+汉堡；橙黑菜单覆盖 stagger 链接。窄屏转 column 纵向堆叠",
    重色落点: "暗夜底承载一切，橙金是唯一燃烧色（数据高亮/路线/hover），红黑菜单是沉潜的底",
    第一屏内容: "三手机阵列 + 顶导航 + 各屏首屏叙事",
    删减元素: "不引外部图/视频/字体；山体人形用 CSS clip-path 模拟，照片模糊用 mask 替代",
    适用: "登山/户外/旅行品牌的英雄展示页、多屏作品叙事落地页",
    禁忌: "信息密度高的工具站；高饱和撞色；引入外部图片视频字体",
    参考站: ["motionsites.ai"],
    我的说明: "把 motionsites.ai 的 f1-racing-hub 机制（三手机视差阵列 + 照片底部模糊叠加 + 数字滚动 count-up + 红黑菜单覆盖）拿过来，换题重推为「云巅行者」登山英雄页。配色由 F1 红黄改为暗夜橙金，品牌与文案全部替换，山体人形用 CSS clip-path 模拟替代外部照片，非复刻。",
    Agent提示词: `【登山者英雄页 · 设计语言宪法】
效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。

第一章 总纲 · 设计哲学
暗色户外英雄展示。三台手机错落并陈，各自讲述一段山系叙事；橙金是唯一的燃烧色，红黑菜单是沉潜的底。气质：辽阔、冷峻、有重量。适用：登山/户外/旅行品牌的英雄展示页。

第二章 色彩板与角色
暗夜底 #0a0e1c（78%，页面唯一画布）；白字 #ffffff（15%）；橙金强调 #ed7a1a（7%，仅用于数据高亮、路线、hover）；菜单红 #7a2e00 / 近黑 #1a0e00（覆盖渐变两端）。

第三章 字体规则
字体栈：system-ui / -apple-system / "PingFang SC" / "Microsoft YaHei" / sans-serif；大展示字 ~38-46、标签 ~13、导航 ~15，靠 --u 思路流式；窄屏自适应堆叠。

第四章 组件规范
手机框：圆角 50、黑边 bezel、内屏圆角 42、动态岛。顶导航：左 logo 右汉堡。屏1 英雄：位置块 + clip-path 山体 + 人形剪影 + 底部 mask 模糊叠加 + 名字大字。屏2 数据：SVG 路线 + 三个 count-up 数字。屏3 队伍：队名 + 两队员卡（玻璃底）。菜单覆盖：橙黑渐变 + 链接 stagger 滑入。

第五章 布局法
桌面：三手机 flex 行、底部对齐、gap 视差、延迟入场（.3/.5/.7s）；窄屏（≤768）转 column 纵向堆叠，单栏不溢出。山体/人形用 CSS clip-path 模拟，替代外部照片。

第六章 深度与层级
屏内：背景渐变（z0）→ clip-path 山体/人形（z1）→ 底部 mask 模糊层（z2）→ 文字/导航（z10）→ 菜单覆盖（z60）。

第七章 动效
入场统一 fade-up .9s cubic-bezier(.16,1,.3,1)，三机延迟错落；数字滚动用 requestAnimationFrame + cubic ease-out，延迟 900ms 启动，时长 2200ms；菜单链接 translateX 滑入 stagger。

第八章 适用
户外运动、登山、旅行、越野品牌的英雄/作品展示页；需「电影感多屏叙事」的落地页。

第九章 禁忌
信息密度高的工具站；高饱和撞色；引入外部图片/视频/字体（本项目离线零外链）。`,
    演示页: "assets/demos/方案-登山者英雄页.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>云巅行者 — 登山者英雄页</title>
<style>
:root{
  --bg:#0a0e1c; --screen:#0a0e1c; --ink:#ffffff; --accent:#ed7a1a;
  --menuRed:#7a2e00; --menuDark:#1a0e00; --blur:6px; --radius:50px;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
  background:var(--bg);color:var(--ink);min-height:100vh;padding:24px;
  display:flex;align-items:center;justify-content:center}
.row{display:flex;align-items:flex-end;justify-content:center;gap:var(--gap);flex-wrap:wrap}
@media(max-width:768px){.row{flex-direction:column;align-items:center;gap:40px}}
/* 手机框 */
.phone{position:relative;width:min(300px,86vw);aspect-ratio:390/844;border-radius:var(--radius);
  background:#000;padding:10px;box-shadow:0 20px 50px rgba(0,0,0,.6)}
.phone .scr{position:relative;width:100%;height:100%;border-radius:42px;overflow:hidden;background:var(--screen)}
.island{position:absolute;top:14px;left:50%;transform:translateX(-50%);width:34%;height:4%;background:#000;border-radius:999px;z-index:50}
/* 顶导航 */
.nav{position:absolute;top:0;left:0;right:0;z-index:30;display:flex;align-items:center;justify-content:space-between;padding:18px 18px 0}
.logo{font-weight:800;letter-spacing:.04em;font-size:15px}
.nav .menu{width:30px;height:30px;display:flex;flex-direction:column;justify-content:center;gap:5px;cursor:pointer}
.nav .menu i{display:block;height:2px;width:100%;background:var(--ink);border-radius:2px}
/* 入场 */
@keyframes fu{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.fu{opacity:0;animation:fu .9s cubic-bezier(.16,1,.3,1) forwards}
/* 屏1 英雄 */
.hero-bg{position:absolute;inset:0;background:
  linear-gradient(180deg,#1b2a4a 0%,#2c3e5e 40%,#0a0e1c 100%);}
.peak{position:absolute;bottom:0;left:0;right:0;height:55%;
  background:linear-gradient(160deg,#3a4a66 0%,#222d42 60%,#11161f 100%);
  clip-path:polygon(0 60%,18% 38%,34% 52%,52% 22%,70% 46%,86% 30%,100% 50%,100% 100%,0 100%)}
.fig{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:54px;height:120px;
  background:linear-gradient(180deg,#0c1018,#1c2434);clip-path:polygon(42% 0,58% 0,62% 30%,70% 55%,66% 100%,34% 100%,30% 55%,38% 30%)}
.blur{position:absolute;bottom:0;left:0;right:0;height:50%;pointer-events:none;
  backdrop-filter:blur(var(--blur));-webkit-backdrop-filter:blur(var(--blur));
  -webkit-mask:linear-gradient(to bottom,transparent 0%,#000 50%);mask:linear-gradient(to bottom,transparent 0%,#000 50%)}
.loc{position:absolute;top:64px;left:18px;z-index:10}
.loc .c{font-size:13px;color:rgba(255,255,255,.6)}
.loc .t{font-size:34px;font-weight:400;line-height:.95;letter-spacing:-.03em;margin-top:2px}
.name{position:absolute;bottom:22px;left:18px;right:18px;z-index:10}
.name .n{font-size:44px;font-weight:600;line-height:.82;letter-spacing:-.03em}
/* 屏2 数据 */
.data-bg{position:absolute;inset:0;background:linear-gradient(180deg,#10203a,#0a0e1c)}
.circuit{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:60px 20px}
.circuit svg{width:100%;height:auto;opacity:.8;stroke:var(--accent)}
.stats{position:absolute;bottom:22px;left:18px;right:18px;z-index:10}
.stats .lab{font-size:13px;color:rgba(255,255,255,.6);margin-bottom:4px}
.num{font-size:46px;font-weight:600;letter-spacing:-.04em;line-height:.9}
.num.b{color:var(--accent)}
/* 屏3 队伍 */
.team-bg{position:absolute;inset:0;background:linear-gradient(180deg,#16110a,#0a0e1c)}
.ttl{position:absolute;top:70px;left:18px;z-index:10}
.ttl .c{font-size:13px;color:rgba(255,255,255,.6)}
.ttl .t{font-size:38px;font-weight:400;letter-spacing:-.04em;line-height:.85;margin-top:2px}
.car{position:absolute;bottom:0;left:0;right:0;display:flex}
.car .m{flex:1;height:150px;background:rgba(20,20,30,.8);border:1px solid rgba(255,255,255,.1);border-bottom:none;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:12px}
.car .m .pn{font-size:12px;color:rgba(255,255,255,.6)}
.car .m .bn{font-size:40px;font-weight:600;letter-spacing:-.04em;line-height:.8;margin-top:6px}
/* 菜单覆盖 */
.overlay{position:absolute;inset:0;z-index:60;display:none;flex-direction:column;justify-content:center;padding:40px;
  background:linear-gradient(160deg,var(--menuDark) 0%,#5a2200 40%,var(--menuRed) 100%)}
.overlay.show{display:flex;animation:of .4s ease forwards}
@keyframes of{from{opacity:0}to{opacity:1}}
.overlay a{color:var(--ink);font-size:26px;font-weight:700;letter-spacing:-.02em;text-decoration:none;margin:10px 0;
  opacity:0;transform:translateX(-20px);animation:si .5s cubic-bezier(.16,1,.3,1) forwards}
.overlay a:nth-child(1){animation-delay:.1s}.overlay a:nth-child(2){animation-delay:.18s}.overlay a:nth-child(3){animation-delay:.26s}
.overlay a:hover{color:var(--accent)}
@keyframes si{to{opacity:1;transform:translateX(0)}}
</style>
</head>
<body>
<div class="row">
  <!-- 屏1 -->
  <div class="phone fu" style="animation-delay:.3s">
    <div class="scr">
      <div class="island"></div>
      <div class="hero-bg"></div><div class="peak"></div><div class="fig"></div><div class="blur"></div>
      <div class="nav"><div class="logo">云巅</div><div class="menu" onclick="document.querySelector('.overlay').classList.add('show')"><i></i><i></i><i></i></div></div>
      <div class="loc fu" style="animation-delay:.4s"><div class="c">中国 · 四川</div><div class="t">四姑娘山</div></div>
      <div class="name fu" style="animation-delay:.8s"><div class="n">高山<br>行者</div></div>
      <div class="overlay"><a href="#">简介</a><a href="#">数据</a><a href="#">历程</a></div>
    </div>
  </div>
  <!-- 屏2 -->
  <div class="phone fu" style="animation-delay:.5s">
    <div class="scr">
      <div class="island"></div>
      <div class="data-bg"></div>
      <div class="nav"><div class="logo">云巅</div><div class="menu" onclick="document.querySelector('.overlay').classList.add('show')"><i></i><i></i><i></i></div></div>
      <div class="loc fu" style="animation-delay:.4s"><div class="c">经典环线</div><div class="t">大峰路线</div></div>
      <div class="circuit fu" style="animation-delay:.6s">
        <svg viewBox="0 0 200 120" fill="none" stroke="#ed7a1a" stroke-width="2"><path d="M10 100 C60 40 90 90 120 50 S180 20 190 60"/><circle cx="120" cy="50" r="4" fill="#ed7a1a" stroke="none"/></svg>
      </div>
      <div class="stats fu" style="animation-delay:.8s">
        <div class="lab">累计海拔</div>
        <div class="num" data-to="4200">0</div>
        <div class="lab" style="margin-top:8px">环线里程</div>
        <div class="num b" data-to="58">0</div>
      </div>
      <div class="overlay"><a href="#">简介</a><a href="#">数据</a><a href="#">历程</a></div>
    </div>
  </div>
  <!-- 屏3 -->
  <div class="phone fu" style="animation-delay:.7s">
    <div class="scr">
      <div class="island"></div>
      <div class="team-bg"></div>
      <div class="nav"><div class="logo">云巅</div><div class="menu" onclick="document.querySelector('.overlay').classList.add('show')"><i></i><i></i><i></i></div></div>
      <div class="ttl fu" style="animation-delay:.3s"><div class="c">登山队</div><div class="t">云巅<br>纵队</div></div>
      <div class="car fu" style="animation-delay:.9s">
        <div class="m"><div class="pn">阿木</div><div class="bn">07</div></div>
        <div class="m"><div class="pn">林溪</div><div class="bn">12</div></div>
      </div>
      <div class="overlay"><a href="#">简介</a><a href="#">数据</a><a href="#">历程</a></div>
    </div>
  </div>
</div>
<script>
// 数字滚动
document.querySelectorAll('.num[data-to]').forEach(function(el){
  var to=+el.dataset.to,dur=2200,st=null;
  function step(t){if(!st)st=t;var p=Math.min(1,(t-st)/dur);var e=1-Math.pow(1-p,3);
    el.textContent=Math.round(to*e).toLocaleString();if(p<1)requestAnimationFrame(step);}
  setTimeout(function(){requestAnimationFrame(step);},900);
});
<\/script>
</body>
</html>
`,
    片段: `:root{--bg:#0a0e1c;--screen:#0a0e1c;--ink:#ffffff;--accent:#ed7a1a;--menuRed:#7a2e00;--menuDark:#1a0e00;--blur:6px;--radius:50px;--gap:24px}
.phone{aspect-ratio:390/844;border-radius:var(--radius);background:#000;padding:10px;box-shadow:0 20px 50px rgba(0,0,0,.6)}
.blur{position:absolute;bottom:0;height:50%;backdrop-filter:blur(var(--blur));-webkit-mask:linear-gradient(to bottom,transparent,#000 50%)}
.overlay{background:linear-gradient(160deg,var(--menuDark),#5a2200 40%,var(--menuRed));z-index:60}
.num.b{color:var(--accent)}`,
    参数: [{"键":"bg","名":"暗夜底色","类型":"color","默认":"#0a0e1c"},{"键":"accent","名":"橙金强调","类型":"color","默认":"#ed7a1a"},{"键":"ink","名":"主文字色","类型":"color","默认":"#ffffff"},{"键":"menuRed","名":"菜单红","类型":"color","默认":"#7a2e00"},{"键":"menuDark","名":"菜单近黑","类型":"color","默认":"#1a0e00"},{"键":"blur","名":"模糊(px)","类型":"number","默认":"6"},{"键":"radius","名":"手机框圆角","类型":"number","默认":"50"},{"键":"gap","名":"手机间距","类型":"number","默认":"24"}],
    来源: "机制参考自 motionsites.ai（f1-racing-hub，2026-09-22 分析）：三手机视差阵列 + 照片底部模糊叠加（mask）+ 数字滚动 count-up + 红黑菜单覆盖；已换题重推为「云巅行者」登山英雄页，配色由 F1 红黄改为暗夜橙金，品牌与文案全部替换，山体人形用 CSS clip-path 模拟替代外部照片，非复刻"
  }
,
  {
    id: "S39",
    风格名: "墨痕写作社区注册页",
    适配端: "通用",
    风格: "暗色",
    场景: "工具·SaaS",
    骨架: "两栏注册：左栏氛围叙事（渐变替代视频）+ 右栏表单操作",
    配色: {
      "黑底(底)": "80%",
      "白字(实体CTA)": "12%",
      "面板灰": "8%"
    },
    布局骨架: "flex 行：左栏 flex 0 0 52%（圆角卡片、CSS 渐变动画背景替代视频、品牌行 + 标题 + 副标 + 三步骤条）；右栏 flex 1 居中（标题区 + 两列社交登录 + Or 分隔 + 名/姓两列 + 邮箱 + 密码 Eye 切换 + 白底 CTA + 登录链接）。窄屏 ≤900 转 column：左栏变 200px 顶部 banner、隐藏步骤条、右栏表单全宽",
    重色落点: "黑底画布，白是唯一的实体色（CTA 与品牌名），灰面板承载输入，分隔线极淡",
    第一屏内容: "左栏氛围叙事 + 右栏注册表单",
    删减元素: "不引外部视频/图片/字体；左栏氛围用 CSS 渐变动画替代视频",
    适用: "写作/笔记/创作/内容社区的注册引导页",
    禁忌: "信息密度高的后台；彩色撞色 CTA；引入外部视频图片字体",
    参考站: ["motionsites.ai"],
    我的说明: "把 motionsites.ai 的 aurora-onboard 机制（两栏注册：左视频氛围右表单 + 步骤条 + 社交登录 + 输入组 + 密码 Eye 切换）拿过来，换题重推为「墨痕」写作社区注册页。品牌名与文案全部替换；左栏原视频背景改用 CSS 渐变动画替代（零外链），非复刻。",
    Agent提示词: `【墨痕写作社区注册页 · 设计语言宪法】
效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。

第一章 总纲 · 设计哲学
黑底写作社区注册。左栏氛围叙事（渐变动画替代视频）、右栏表单操作。白是唯一的实体色（CTA 与品牌），灰面板承载输入。气质：安静、专注、文人气。适用：写作/创作/内容社区的注册引导页。

第二章 色彩板与角色
黑底 #000000（页面画布）；白 #ffffff（CTA 与品牌名，实体色）；品牌灰面板 #1A1A1A（输入框/步骤底）；分隔线 rgba(255,255,255,.1)（1px 描边）。

第三章 字体规则
字体栈：system-ui / -apple-system / "PingFang SC" / "Microsoft YaHei" / sans-serif；左栏大标 ~34、右栏标题 ~26、正文 ~14，流式自适应。

第四章 组件规范
左栏：圆角卡片 + 渐变动画背景层 + 品牌行（圆点图标+名）+ 标题 + 副标 + 三步骤条（active 高亮为白底黑字）。右栏：标题区 + 两列社交登录（内联 SVG 图标）+ Or 分隔 + 名/姓两列 + 邮箱 + 密码（Eye 切换）+ 创建按钮（白底黑字）+ 登录链接。

第五章 布局法
桌面：flex 行，左栏 flex 0 0 52%、右栏 flex 1 居中；左栏圆角带阴影，内 padding 48。窄屏（≤900）转 column：左栏变 200px 顶部 banner、隐藏步骤条、右栏表单全宽。

第六章 深度与层级
左栏：渐变模糊层（z0，::before 动画）→ 内容层（z2，半透白文字）。右栏：面板灰承载输入框，白 CTA 浮于最上。

第七章 动效
左栏内容 stagger 入场（品牌 .1 / 标题 .3 / 副标 .4）；右栏整体 fade-up .2s；密码 Eye 切换、按钮 active 缩放；左栏背景 14s 缓动漂移。

第八章 适用
写作/笔记/创作/内容社区的注册与引导页；需「左氛围右操作」双栏结构的落地页。

第九章 禁忌
信息密度高的后台；彩色撞色 CTA；引入外部视频/图片/字体（本项目离线零外链，左栏用 CSS 渐变动画替代视频）。`,
    演示页: "assets/demos/方案-墨痕写作社区注册页.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>墨痕 — 写作社区注册</title>
<style>
:root{
  --bg:#000000; --panel:#1A1A1A; --ink:#ffffff; --line:rgba(255,255,255,0.1);
  --accent:#ffffff; --radius:12px; --blur:8px;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
  background:var(--bg);color:var(--ink);min-height:100vh}
.wrap{display:flex;min-height:100vh}
/* 左栏氛围(用CSS渐变动画替代视频) */
.left{position:relative;flex:0 0 52%;border-radius:var(--radius);overflow:hidden;margin:8px;
  display:flex;flex-direction:column;justify-content:flex-end;padding:48px;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.left::before{content:"";position:absolute;inset:-20%;background:
  radial-gradient(40% 40% at 30% 30%,#3a2f5e 0%,transparent 60%),
  radial-gradient(50% 50% at 70% 60%,#1f4a4a 0%,transparent 60%),
  linear-gradient(160deg,#15131f,#0a1418);
  filter:blur(var(--blur)) saturate(1.2);animation:drift 14s ease-in-out infinite alternate}
@keyframes drift{from{transform:translate(-3%,-2%) scale(1.05)}to{transform:translate(3%,2%) scale(1.12)}}
.left .layer{position:relative;z-index:2;display:flex;flex-direction:column;gap:32px}
.brand{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:600;letter-spacing:-.02em}
.brand .dot{width:22px;height:22px;border-radius:50%;background:var(--ink)}
.heading{font-size:34px;font-weight:500;letter-spacing:-.02em}
.sub{font-size:14px;color:rgba(255,255,255,.6);line-height:1.6;padding:0 16px}
/* 步骤条 */
.steps{display:flex;flex-direction:column;gap:14px}
.step{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:var(--radius);background:var(--panel);border:1px solid transparent}
.step.on{background:var(--ink);border-color:var(--ink)}
.step .n{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.4)}
.step.on .n{background:#000;color:#fff}
.step.on .t{color:#000}.step .t{font-size:14px}
/* 右栏 */
.right{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 16px;overflow-y:auto}
.inner{width:100%;max-width:420px;display:flex;flex-direction:column;gap:28px}
.rt{font-size:26px;font-weight:500;letter-spacing:-.02em}
.rs{font-size:14px;color:rgba(255,255,255,.4)}
.social{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.sbtn{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:1px solid var(--line);border-radius:var(--radius);background:#000;color:var(--ink);font-size:14px;cursor:pointer}
.sbtn:hover{background:rgba(255,255,255,.05)}
.sbtn svg{width:18px;height:18px}
.divider{display:flex;align-items:center;gap:12px;color:rgba(255,255,255,.4);font-size:12px;text-transform:uppercase;letter-spacing:.1em}
.divider::before,.divider::after{content:"";flex:1;height:1px;background:var(--line)}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.field{display:flex;flex-direction:column;gap:6px}
.field label{font-size:13px;font-weight:500}
.field input{height:44px;padding:0 14px;background:var(--panel);border:none;border-radius:var(--radius);color:var(--ink);font-size:14px}
.field input::placeholder{color:rgba(255,255,255,.2)}
.pw{position:relative}
.pw .eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);cursor:pointer;color:rgba(255,255,255,.5)}
.help{font-size:12px;color:rgba(255,255,255,.4)}
.cta{width:100%;height:52px;background:var(--accent);color:#000;font-weight:600;border:none;border-radius:var(--radius);cursor:pointer;margin-top:4px}
.cta:active{transform:scale(.98)}
.foot{font-size:13px;color:rgba(255,255,255,.4);text-align:center}
.foot a{color:var(--ink)}
/* 入场 */
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.anim{opacity:0;animation:up .5s ease forwards}
@media(max-width:900px){
  .wrap{flex-direction:column}
  .left{width:calc(100% - 16px);height:200px;margin:8px auto;padding:24px}
  .left .layer{gap:16px}
  .heading{font-size:24px}.steps{display:none}
}
</style>
</head>
<body>
<div class="wrap">
  <div class="left">
    <div class="layer">
      <div class="brand anim" style="animation-delay:.1s"><span class="dot"></span>墨痕</div>
      <div class="heading anim" style="animation-delay:.3s">加入墨痕</div>
      <div class="sub anim" style="animation-delay:.4s">跟随这三步，开启你的写作空间。</div>
      <div class="steps">
        <div class="step on"><span class="n">1</span><span class="t">注册你的身份</span></div>
        <div class="step"><span class="n">2</span><span class="t">配置你的工作室</span></div>
        <div class="step"><span class="n">3</span><span class="t">完善个人资料</span></div>
      </div>
    </div>
  </div>
  <div class="right">
    <div class="inner anim" style="animation-delay:.2s">
      <div>
        <div class="rt">创建新档案</div>
        <div class="rs">填写基本信息，开始这段旅程。</div>
      </div>
      <div class="social">
        <div class="sbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>Google</div>
        <div class="sbtn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.300000-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.4 4.6-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z"/></svg>Github</div>
      </div>
      <div class="divider">或</div>
      <div class="grid2">
        <div class="field"><label>名</label><input placeholder="云"></div>
        <div class="field"><label>姓</label><input placeholder="砚"></div>
      </div>
      <div class="field"><label>邮箱</label><input placeholder="you@mohen.app"></div>
      <div class="field pw"><label>密码</label><input id="pwd" type="password" placeholder="至少 8 位"><span class="eye" onclick="var p=document.getElementById('pwd');p.type=p.type==='password'?'text':'password'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg></span></div>
      <div class="help">需至少 8 个字符。</div>
      <button class="cta">创建账户</button>
      <div class="foot">已是成员？<a href="#">登录</a></div>
    </div>
  </div>
</div>
</body>
</html>
`,
    片段: `:root{--bg:#000;--panel:#1A1A1A;--ink:#fff;--line:rgba(255,255,255,.1);--accent:#fff;--radius:12px;--blur:8px}
.left{border-radius:var(--radius);overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.left::before{content:"";position:absolute;inset:-20%;filter:blur(var(--blur)) saturate(1.2);animation:drift 14s ease-in-out infinite alternate}
.step{background:var(--panel);border-radius:var(--radius)}
.step.on{background:var(--ink);border-color:var(--ink)}
.cta{background:var(--accent);color:#000;border-radius:var(--radius)}`,
    参数: [{"键":"bg","名":"页面底色","类型":"color","默认":"#000000"},{"键":"panel","名":"面板灰","类型":"color","默认":"#1A1A1A"},{"键":"ink","名":"主文字色","类型":"color","默认":"#ffffff"},{"键":"accent","名":"CTA实体色","类型":"color","默认":"#ffffff"},{"键":"radius","名":"圆角","类型":"number","默认":"12"},{"键":"blur","名":"左栏模糊(px)","类型":"number","默认":"8"}],
    来源: "机制参考自 motionsites.ai（aurora-onboard，2026-09-22 分析）：两栏注册（左视频氛围右表单）+ 步骤条 + 社交登录 + 输入组 + 密码 Eye 切换；已换题重推为「墨痕」写作社区注册页，品牌与文案全部替换，左栏原视频背景改用 CSS 渐变动画替代（零外链），非复刻"
  }
,
  {
    id: "S40",
    风格名: "书香共读会APP三屏",
    适配端: "通用",
    风格: "编辑杂志",
    场景: "内容·阅读",
    骨架: "三手机屏展示（证言 / 英雄书单 / 活动），各屏独立叙事 + 菜单覆盖",
    配色: {
      "深陶土底(底)": "78%",
      "白字": "15%",
      "米白强调(CTA)": "7%"
    },
    布局骨架: "三台手机 flex 行、顶部对齐、gap 32；屏1 证言（旋转侧栏 + 肖像块 + 打字机引言 + 奶白活动卡）、屏2 英雄（全屏渐变 hero + 头像行 + 米白大标 + CTA）、屏3 活动（顶部 hero + 奶白体 + 日期卡活动列表）；顶导航 logo+汉堡；菜单覆盖 stagger 链接。窄屏 ≤768 转 column 堆叠",
    重色落点: "深陶土底沉静，米白是唯一暖光（CTA/logo/日期卡），奶白卡承载可读内容",
    第一屏内容: "三手机阵列 + 顶导航 + 各屏首屏叙事",
    删减元素: "不引外部图/视频/字体；肖像与 hero 用 CSS 渐变形状模拟",
    适用: "读书会/会员社群/内容平台的移动端三屏展示",
    禁忌: "高饱和撞色；信息密度过高；引入外部图片视频字体",
    参考站: ["motionsites.ai"],
    我的说明: "把 motionsites.ai 的 church-community 机制（三手机屏展示 + 米金配色 + 证言/英雄/活动叙事 + 菜单覆盖 + 打字机）拿过来，换题重推为「书香共读会」。配色由教堂金 #F1E5C6 改为暖陶土米白 #E8D5B5，品牌与文案全部替换，肖像与 hero 用 CSS 渐变形状模拟替代外部照片，非复刻。",
    Agent提示词: `【书香共读会 APP 三屏 · 设计语言宪法】
效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。

第一章 总纲 · 设计哲学
暖陶土米白的阅读社群三屏展示。证言屏讲人、书单屏讲书、活动屏讲约。米白是唯一的暖光色，深陶土是沉静的底。气质：温润、书卷、有人情味。适用：读书会/会员/内容社群的移动端展示页。

第二章 色彩板与角色
深陶土底 #2a2320（页面与屏底，78%）；米白强调 #E8D5B5（CTA、logo 标、日期卡，7%）；白 #ffffff（主文字，15%）；奶白卡 #F3ECDD（证言卡/活动体，承载可读内容）。

第三章 字体规则
字体栈：system-ui / -apple-system / "PingFang SC" / "Microsoft YaHei" / serif；大标题 ~40、活动标题 ~30、正文 ~15-18，窄屏自适应。

第四章 组件规范
手机框：圆角 50、黑边 bezel、动态岛。顶导航：logo（米白方块+符号）+ 汉堡。屏1 证言：旋转侧栏文字 + 肖像块（CSS 渐变模拟）+ 打字机逐字引言 + 底部奶白卡（活动）。屏2 英雄：全屏渐变 hero + 头像行 + 米白大标 + CTA。屏3 活动：顶部 hero + 奶白体 + 近期活动列表（日期卡 + 标题 + 时间）。菜单覆盖：深陶土底 + 链接 stagger 滑入 + 关闭叉。

第五章 布局法
桌面：三手机 flex 行、顶部对齐、gap 32；窄屏（≤768）转 column 纵向堆叠。肖像/hero 用 CSS 渐变与形状模拟，替代外部照片。

第六章 深度与层级
屏内：渐变 hero（z0）→ 内容（z10）→ 导航毛玻璃（z30，backdrop-filter）→ 菜单覆盖（z60）。

第七章 动效
入场统一 fade-up .6s；证言引言打字机逐字（55ms/字）；菜单链接 translateX 滑入 stagger（.1→.42s）。

第八章 适用
读书会、会员社群、内容平台、文化机构的移动端三屏展示与引导页。

第九章 禁忌
高饱和撞色；信息密度过高；引入外部图片/视频/字体（本项目离线零外链，肖像与 hero 用 CSS 模拟）。`,
    演示页: "assets/demos/方案-书香共读会APP三屏.html",
    代码: `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>书香共读会 — APP 三屏</title>
<style>
:root{
  --bg:#2a2320; --cream:#E8D5B5; --ink:#ffffff; --card:#F3ECDD;
  --radius:50px; --blur:6px;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
  background:var(--bg);color:var(--ink);min-height:100vh;padding:24px;
  display:flex;align-items:center;justify-content:center}
.row{display:flex;align-items:flex-start;justify-content:center;gap:32px;flex-wrap:wrap}
@media(max-width:768px){.row{flex-direction:column;align-items:center;gap:48px}}
.phone{position:relative;width:min(300px,86vw);aspect-ratio:375/812;border-radius:var(--radius);
  background:#000;padding:8px;box-shadow:0 20px 50px rgba(0,0,0,.6)}
.scr{position:relative;width:100%;height:100%;border-radius:42px;overflow:hidden;background:var(--bg)}
.island{position:absolute;top:12px;left:50%;transform:translateX(-50%);width:33%;height:4%;background:#000;border-radius:999px;z-index:50}
.nav{position:absolute;top:0;left:0;right:0;z-index:30;display:flex;align-items:center;justify-content:space-between;padding:48px 19px 0;backdrop-filter:blur(var(--blur));-webkit-backdrop-filter:blur(var(--blur))}
.logo{display:flex;align-items:center;gap:8px;font-size:16px}
.logo .ic{width:26px;height:26px;border-radius:6px;background:var(--cream);position:relative}
.logo .ic::after{content:"✝";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--bg);font-size:16px}
.burger{width:22px;height:16px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer}
.burger i{height:2px;background:var(--ink);border-radius:2px}
.burger i:nth-child(2){width:70%}
@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.fu{opacity:0;animation:fu .6s ease forwards}
/* 屏1 证言 */
.rot{position:absolute;left:0;top:115px;transform:rotate(-90deg);transform-origin:left top;font-size:13px;letter-spacing:1px;color:rgba(255,255,255,.5)}
.port{position:absolute;top:120px;left:90px;width:150px;height:190px;border-radius:16px;
  background:linear-gradient(160deg,#5a4a3a,#3a2e26);box-shadow:0 10px 30px rgba(0,0,0,.4)}
.quote{position:absolute;top:330px;left:19px;right:19px;font-size:18px;line-height:1.5;color:rgba(255,255,255,.85)}
.wcard{position:absolute;left:19px;right:19px;bottom:24px;height:120px;border-radius:20px;background:var(--card);color:var(--bg);padding:18px;display:flex;flex-direction:column;justify-content:center}
.wcard .t{font-size:18px;font-weight:600}.wcard .d{font-size:13px;opacity:.7;margin-top:4px}
.wcard .m{font-size:13px;margin-top:8px;display:flex;align-items:center;gap:6px;color:#8a6d3a}
/* 屏2 英雄 */
.hero{position:absolute;inset:0;background:linear-gradient(180deg,#6b5640,#2a2320)}
.hero::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.15)}
.avatars{position:absolute;top:442px;left:19px;display:flex;gap:6px}
.avatars span{width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.4)}
.h2{position:absolute;top:500px;left:19px;right:19px;font-size:40px;line-height:1.1;letter-spacing:-1px;color:var(--cream)}
.sub2{position:absolute;top:600px;left:19px;right:19px;font-size:15px;color:rgba(255,255,255,.6)}
.cta2{position:absolute;left:19px;right:19px;bottom:32px;height:48px;border-radius:24px;background:var(--cream);color:var(--bg);
  display:flex;align-items:center;justify-content:center;gap:6px;font-size:15px;font-weight:500}
/* 屏3 活动 */
.body3{position:absolute;top:343px;left:0;right:0;bottom:0;background:var(--card);color:var(--bg);padding:18px}
.body3 .ttl{font-size:30px;letter-spacing:-.5px;margin-bottom:14px}
.ev{display:flex;gap:12px;margin-bottom:14px;align-items:flex-start}
.ev .dc{width:54px;height:70px;border-radius:12px;background:var(--cream);color:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0}
.ev .dc .d{font-size:22px;font-weight:600}.ev .dc .m{font-size:13px}
.ev .et{font-size:15px}.ev .ed{font-size:13px;opacity:.6;margin-top:2px}
/* 菜单覆盖 */
.overlay{position:absolute;inset:0;z-index:60;display:none;flex-direction:column;justify-content:center;padding:40px;background:var(--bg)}
.overlay.show{display:flex}
.overlay a{color:var(--ink);font-size:32px;font-weight:300;letter-spacing:-.5px;margin:11px 0;text-decoration:none;opacity:0;animation:sl .5s ease forwards}
.overlay a:nth-child(1){animation-delay:.1s}.overlay a:nth-child(2){animation-delay:.18s}.overlay a:nth-child(3){animation-delay:.26s}.overlay a:nth-child(4){animation-delay:.34s}.overlay a:nth-child(5){animation-delay:.42s}
@keyframes sl{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
.overlay .x{position:absolute;top:40px;right:40px;font-size:28px;cursor:pointer}
</style>
</head>
<body>
<div class="row">
  <!-- 屏1 证言 -->
  <div class="phone">
    <div class="scr">
      <div class="island"></div>
      <div class="nav"><div class="logo"><span class="ic"></span>书香共读会</div><div class="burger" onclick="this.closest('.scr').querySelector('.overlay').classList.add('show')"><i></i><i></i><i></i></div></div>
      <div class="rot">读者 · 书友</div>
      <div class="port fu" style="animation-delay:.2s"></div>
      <div class="quote fu" style="animation-delay:.4s" id="q1"></div>
      <div class="wcard fu" style="animation-delay:.6s"><div class="t">周日共读会</div><div class="d">12月7日 10:00-11:30</div><div class="m">了解更多 ›</div></div>
      <div class="overlay"><span class="x" onclick="this.parentElement.classList.remove('show')">✕</span><a href="#">首页</a><a href="#">关于</a><a href="#">活动</a><a href="#">共读</a><a href="#">联系</a></div>
    </div>
  </div>
  <!-- 屏2 英雄 -->
  <div class="phone">
    <div class="scr">
      <div class="island"></div>
      <div class="hero"></div>
      <div class="nav"><div class="logo"><span class="ic"></span>书香共读会</div><div class="burger" onclick="this.closest('.scr').querySelector('.overlay').classList.add('show')"><i></i><i></i><i></i></div></div>
      <div class="avatars fu" style="animation-delay:.3s"><span></span><span></span><span></span></div>
      <div class="h2 fu" style="animation-delay:.4s">向光而行</div>
      <div class="sub2 fu" style="animation-delay:.5s">发现信仰、盼望，与灵魂的归处</div>
      <div class="cta2 fu" style="animation-delay:.6s">加入我们 ›</div>
      <div class="overlay"><span class="x" onclick="this.parentElement.classList.remove('show')">✕</span><a href="#">首页</a><a href="#">关于</a><a href="#">活动</a><a href="#">共读</a><a href="#">联系</a></div>
    </div>
  </div>
  <!-- 屏3 活动 -->
  <div class="phone">
    <div class="scr">
      <div class="island"></div>
      <div class="hero" style="height:343px"></div>
      <div class="nav"><div class="logo"><span class="ic"></span>书香共读会</div><div class="burger" onclick="this.closest('.scr').querySelector('.overlay').classList.add('show')"><i></i><i></i><i></i></div></div>
      <div class="body3 fu" style="animation-delay:.3s">
        <div class="ttl">近期活动</div>
        <div class="ev"><div class="dc"><div class="d">14</div><div class="m">12月</div></div><div><div class="et">路加福音 · 撒迦利亚的故事</div><div class="ed">18:30 - 20:00</div></div></div>
        <div class="ev"><div class="dc"><div class="d">21</div><div class="m">12月</div></div><div><div class="et">罗马书 · 唯独基督</div><div class="ed">8:30 - 10:00</div></div></div>
        <div class="ev"><div class="dc"><div class="d">28</div><div class="m">12月</div></div><div><div class="et">约翰福音 · 重生</div><div class="ed">17:30 - 19:00</div></div></div>
      </div>
      <div class="overlay"><span class="x" onclick="this.parentElement.classList.remove('show')">✕</span><a href="#">首页</a><a href="#">关于</a><a href="#">活动</a><a href="#">共读</a><a href="#">联系</a></div>
    </div>
  </div>
</div>
<script>
// 打字机：证言逐字出现
(function(){
  var el=document.getElementById('q1');
  var txt='我们想成为一个家，让人能彼此连接，在文字里得着滋养。';
  var i=0;el.textContent='';
  var t=setInterval(function(){el.textContent=txt.slice(0,++i);if(i>=txt.length)clearInterval(t);},55);
})();
<\/script>
</body>
</html>
`,
    片段: `:root{--bg:#2a2320;--cream:#E8D5B5;--ink:#fff;--card:#F3ECDD;--radius:50px;--blur:6px}
.phone{aspect-ratio:375/812;border-radius:var(--radius);background:#000;padding:8px;box-shadow:0 20px 50px rgba(0,0,0,.6)}
.nav{backdrop-filter:blur(var(--blur))}
.cta2{background:var(--cream);color:var(--bg);border-radius:24px}
.wcard{background:var(--card);color:var(--bg)}`,
    参数: [{"键":"bg","名":"深陶土底","类型":"color","默认":"#2a2320"},{"键":"cream","名":"米白强调","类型":"color","默认":"#E8D5B5"},{"键":"ink","名":"主文字色","类型":"color","默认":"#ffffff"},{"键":"card","名":"奶白卡","类型":"color","默认":"#F3ECDD"},{"键":"radius","名":"手机框圆角","类型":"number","默认":"50"},{"键":"blur","名":"导航模糊(px)","类型":"number","默认":"6"}],
    来源: "机制参考自 motionsites.ai（church-community，2026-09-22 分析）：三手机屏展示 + 米金配色 + 证言/英雄/活动叙事 + 菜单覆盖 + 打字机逐字；已换题重推为「书香共读会」，配色由教堂金改为暖陶土米白，品牌与文案全部替换，肖像与 hero 用 CSS 渐变形状模拟替代外部照片，非复刻"
  }
,
  {
    id: "S41",
    风格名: "山货直送物流落地页",
    适配端: "通用",
    风格: "有机自然",
    场景: "落地页·发布页",
    骨架: "居中 iPhone 落地页：英雄 + 地图路线卡 + 统计 + 步骤 + 联系表单，内部单列滚动",
    配色: {
      "深林土底(底)": "72%",
      "暖橙强调(路线/CTA)": "18%",
      "米白次级": "8%",
      "白字": "2%"
    },
    布局骨架: "桌面居中 iPhone 393×852；顶部导航 logo+汉堡(毛玻璃)；英雄大标+副文案；地图卡内嵌 SVG 路线绘制动画 + 两端节点 + 浮动运输图标；统计三连(48h/200+/0)；3 步步骤条；联系表单(姓名/电话/留言+橙 CTA)；窄屏框随视口收缩不溢出，内部单列滚动",
    重色落点: "深林土底沉静，暖橙是唯一活力色(路线描边/CTA/节点/统计数字)，米白做次级文字",
    第一屏内容: "iPhone 落地页 + 顶导航 + 英雄大标 + 地图路线卡首屏",
    删减元素: "不引外部地图图/照片/字体/视频；地图用 SVG 手绘路线，运输图标用内联 SVG",
    适用: "农产品上行/山区好物/冷链直达品牌的移动端落地页",
    禁忌: "高饱和冷色撞橙；信息过载；引入外部地图图照片字体视频",
    参考站: ["motionsites.ai"],
    我的说明: "把 motionsites.ai 的 cargox-mobile（iPhone 框 + 地图路径动画 + 滚动揭示 + 浮动运输图标 + 联系表单）拿过来，换题重推为「山货直送」。配色由物流蓝改为暖土橙 #d98a3d，品牌与文案全部替换，地图用 SVG 手绘路线替代外部地图图，运输图标用内联 SVG，非复刻。",
    Agent提示词: `【山货直送物流落地页 · 设计语言宪法】
效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。

第一章 总纲 · 设计哲学
暖土色山区物流落地页，叙事走「从山间到餐桌」。深林土底 #1c2417 沉静，暖橙 #d98a3d 是唯一的活力色（路线/CTA/节点），米白 #efe6d2 做次级文字。气质：踏实、可信、有人情味。适用：农产品上行 / 冷链直达 / 山区好物品牌的移动端落地页。

第二章 色彩板与角色
深林土底 #1c2417（页面与屏底，72%）；暖橙强调 #d98a3d（路线描边、CTA、节点、统计数字，18%）；米白 #efe6d2（次级文字、节点，8%）；白 #ffffff（主文字，2%）；面板 #2a3324（卡片）；描边 #3a4631（卡片边）。

第三章 字体规则
字体栈：system-ui / -apple-system / "PingFang SC" / "Microsoft YaHei" / sans-serif；大标题 ~30、区块标题 ~18、正文 ~13-14，窄屏自适应。

第四章 组件规范
iPhone 框：圆角 50、黑 bezel、动态岛留白；内部滚动容器。顶导航：logo（橙方块+字）+ 汉堡，毛玻璃。英雄：大标「从山间到餐桌 48 小时直达」+ 副文案。地图卡：内嵌 SVG 路线（stroke-dashoffset 绘制动画）+ 两端节点（进山村/城市仓）+ 浮动运输图标（CSS drift）。统计三连：48h/200+/0。步骤条：3 步（下单→揽收→直达）。联系表单：姓名/电话/留言 + 橙 CTA。

第五章 布局法
桌面：居中 iPhone 393×852，外留白；窄屏（≤393）框随视口收缩（min(393px,100vw-32px)），不溢出。内部单列滚动。

第六章 深度与层级
屏内：地图卡/面板（z0）→ 内容（z10）→ 导航毛玻璃（z30）→ 浮动图标（z20）。

第七章 动效
路线入场 stroke-dashoffset 绘制 3s；区块 IntersectionObserver fade-up；浮动图标 drift 6s 循环；兜底 900ms 全显（无滚动也可见）。

第八章 适用
农产品上行、山区好物、冷链直达、乡村振兴品牌的移动端落地页与引导页。

第九章 禁忌
高饱和冷色撞橙；信息过载；引入外部地图图/照片/字体/视频（本项目离线零外链，地图用 SVG 手绘路线，图标用内联 SVG）。`,
    演示页: "assets/demos/方案-山货直送物流落地页.html",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>山货直送 · 物流落地页</title>
<style>
:root{
  --bg:#1c2417; --accent:#d98a3d; --cream:#efe6d2; --ink:#ffffff; --panel:#2a3324; --line:#3a4631; --radius:50px; --blur:6px;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;display:flex;justify-content:center;align-items:flex-start;padding:24px 16px;min-height:100vh}
.phone{width:min(393px,calc(100vw - 32px));aspect-ratio:393/852;background:#000;padding:10px;border-radius:calc(var(--radius) + 6px);box-shadow:0 24px 60px #00000055}
.screen{width:100%;height:100%;border-radius:var(--radius);overflow:hidden;position:relative;background:var(--bg)}
.scroll{height:100%;overflow-y:auto;scroll-behavior:smooth}
.nav{position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;padding:14px 18px;backdrop-filter:blur(var(--blur));-webkit-backdrop-filter:blur(var(--blur));background:rgba(28,36,23,.55);z-index:30}
.logo{display:flex;align-items:center;gap:8px;font-weight:700;color:var(--cream)}
.logo .dot{width:18px;height:18px;border-radius:6px;background:var(--accent)}
.burger{width:22px;height:14px;display:flex;flex-direction:column;justify-content:space-between}
.burger i{height:2px;background:var(--cream);border-radius:2px;display:block}
.hero{padding:18px 18px 8px}
.hero h1{font-size:30px;line-height:1.15;letter-spacing:.5px}
.hero h1 b{color:var(--accent)}
.hero p{margin-top:8px;color:var(--cream);opacity:.85;font-size:14px}
.map{margin:16px 18px;background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:12px;position:relative;overflow:hidden}
.map svg{width:100%;height:150px;display:block}
.route{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-dasharray:1000;stroke-dashoffset:1000;animation:draw 3s ease forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.node{fill:var(--accent)}
.node.m{fill:var(--cream)}
.map .lab{position:absolute;font-size:11px;color:var(--cream)}
.lab.a{left:14px;bottom:14px}.lab.b{right:14px;top:12px}
.truck{position:absolute;width:34px;height:34px;color:var(--accent);animation:drift 6s ease-in-out infinite}
.truck.t1{left:30%;top:30%}.truck.t2{right:24%;top:54%;animation-delay:2s}
@keyframes drift{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.reveal{opacity:0;transform:translateY(22px);transition:opacity .6s,transform .6s}
.reveal.in{opacity:1;transform:none}
.stats{display:flex;gap:10px;padding:6px 18px 16px}
.stat{flex:1;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:12px;text-align:center}
.stat b{display:block;font-size:22px;color:var(--accent)}
.stat span{font-size:11px;color:var(--cream);opacity:.8}
.sec{padding:14px 18px}
.sec h2{font-size:18px;margin-bottom:10px}
.steps{display:flex;flex-direction:column;gap:10px}
.step{display:flex;gap:12px;align-items:flex-start}
.step .n{flex:none;width:26px;height:26px;border-radius:50%;background:var(--accent);color:var(--bg);font-weight:700;display:flex;align-items:center;justify-content:center;font-size:13px}
.step .t b{display:block;font-size:14px}.step .t span{font-size:12px;color:var(--cream);opacity:.8}
.form{padding:8px 18px 24px}
.field{margin-bottom:10px}
.field input,.field textarea{width:100%;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:11px 12px;color:var(--ink);font-size:14px;font-family:inherit}
.field textarea{resize:none;height:64px}
.cta{width:100%;background:var(--accent);color:var(--bg);border:0;border-radius:14px;padding:13px;font-size:15px;font-weight:700;cursor:pointer}
.foot{padding:10px 18px 22px;color:var(--cream);opacity:.6;font-size:11px;text-align:center}
</style>
</head>
<body>
<div class="phone"><div class="screen"><div class="scroll">
  <div class="nav"><div class="logo"><span class="dot"></span>山货直送</div><div class="burger"><i></i><i></i><i></i></div></div>
  <div class="hero">
    <h1>从山间到餐桌<br><b>48 小时直达</b></h1>
    <p>山区好物 · 冷链揽收 · 城市到家</p>
  </div>
  <div class="map">
    <svg viewBox="0 0 300 150" preserveAspectRatio="none">
      <path class="route" d="M24 122 C 70 122, 64 40, 120 52 S 206 118, 276 28"/>
      <circle class="node m" cx="24" cy="122" r="7"/>
      <circle class="node" cx="276" cy="28" r="7"/>
    </svg>
    <span class="lab a">进山村</span><span class="lab b">城市仓</span>
    <svg class="truck t1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
    <svg class="truck t2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
  </div>
  <div class="stats reveal">
    <div class="stat"><b>48h</b><span>直达时效</span></div>
    <div class="stat"><b>200+</b><span>合作村落</span></div>
    <div class="stat"><b>0</b><span>中间转运</span></div>
  </div>
  <div class="sec reveal">
    <h2>怎么送</h2>
    <div class="steps">
      <div class="step"><span class="n">1</span><div class="t"><b>线上下单</b><span>选山货、填地址</span></div></div>
      <div class="step"><span class="n">2</span><div class="t"><b>进山揽收</b><span>驻村点冷链装箱</span></div></div>
      <div class="step"><span class="n">3</span><div class="t"><b>直达城市</b><span>专线冷链到家</span></div></div>
    </div>
  </div>
  <div class="form reveal">
    <div class="field"><input placeholder="姓名"></div>
    <div class="field"><input placeholder="电话"></div>
    <div class="field"><textarea placeholder="想买的土特产 / 留言"></textarea></div>
    <button class="cta">预约直送</button>
  </div>
  <div class="foot">山货直送 · 山区好物直达计划</div>
</div></div></div>
<script>
(function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.2});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
  setTimeout(function(){document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')})},900);
})();
<\/script>
</body>
</html>
`,
    片段: `:root{--bg:#1c2417;--accent:#d98a3d;--cream:#efe6d2;--ink:#fff;--panel:#2a3324;--line:#3a4631;--radius:50px;--blur:6px}
.phone{aspect-ratio:393/852;border-radius:calc(var(--radius) + 6px);background:#000;padding:10px}
.nav{backdrop-filter:blur(var(--blur))}
.route{stroke:var(--accent)}
.map{background:var(--panel);border:1px solid var(--line)}
.cta{background:var(--accent);color:var(--bg)}`,
    参数: [{"键":"bg","名":"深林土底","类型":"color","默认":"#1c2417"},{"键":"accent","名":"暖橙强调","类型":"color","默认":"#d98a3d"},{"键":"cream","名":"米白次级","类型":"color","默认":"#efe6d2"},{"键":"ink","名":"主文字色","类型":"color","默认":"#ffffff"},{"键":"panel","名":"面板卡","类型":"color","默认":"#2a3324"},{"键":"line","名":"描边色","类型":"color","默认":"#3a4631"},{"键":"radius","名":"手机框圆角","类型":"number","默认":"50"},{"键":"blur","名":"导航模糊(px)","类型":"number","默认":"6"}],
    来源: "机制参考自 motionsites.ai（cargox-mobile + cross-border，2026-09-22 分析）：iPhone 框 + 地图 SVG 路径动画 + 滚动揭示 + 浮动运输图标 + 联系表单；已换题重推为「山货直送」，配色由物流蓝改为暖土橙，品牌与文案全部替换，地图用 SVG 手绘路线替代外部地图图、运输图标用内联 SVG，非复刻"
  }
,
  {
    id: "S42",
    风格名: "标准件检索库",
    适配端: "通用",
    风格: "极简瑞士",
    场景: "工具·SaaS",
    骨架: "顶部大搜索条(焦点层) + 分类层层递进 + 筛选条 + 密集方形规格卡网格 + 分页（结构层加法）",
    配色: {
      "暖灰白底(页面)": "60%",
      "灰阶文本与分隔线": "30%",
      "赭红强调(搜索条/价格/当前类目)": "10%"
    },
    布局骨架: "顶部通栏大搜索条（2px 强调色描边 + 实心按钮，首屏唯一焦点）；下方热门词与在库总数；分类面包屑层层递进（类目 › 子类 › 规格 › 材质，当前项反白强调）；筛选条（规格/材质/强度/表面/起订 chips，右侧结果计数）；主体密集方形卡网格（每卡＝方图 + 名称 + 三行规格 + 大号价格 + 徽章组 + 产地/月销，hover 描边上浮）；底部页码条。窄屏网格列数递减 4→3→2→1，搜索条换行，不横向溢出",
    重色落点: "暖灰白底全面积退让，赭红只落在搜索条描边与按钮、价格数字、当前分类 chip、分页当前页——是唯一的 10%；卡片内部保持中性，靠密集信息而非颜色制造丰富度",
    第一屏内容: "大搜索条 + 热门词/在库数 + 分类递进 + 筛选条 + 首屏两行卡网格",
    删减元素: "不引外部商品图/字体/图标库；零件缩略图用内联 SVG 几何绘制（螺栓/螺母/垫圈/轴承/弹簧/齿轮/O圈/铆钉）；不堆动效，只保留 hover 微上浮",
    适用: "工业标准件 / 五金零件 / 元器件 B2B 目录检索；SKU 数量大、靠搜索与筛选定位的专业目录站",
    禁忌: "多色强调并存（破坏色彩层减法）；卡片留白过大（丢失密集陈列的效率感）；引入外部商品图/照片/字体/图标库",
    参考站: ["1688.com", "taobao.com"],
    我的说明: "把 1688 / 淘宝 搜索结果页（陈列型：结构层加法 + 色彩层减法，焦点层＝搜索框）换题重推为「标准件检索库」。剥离阿里/淘宝品牌与电商语义，改为工业标准件 B2B 目录；配色由阿里橙改为赭红 #A8452B（色值全改，保留暖强调压中性底的冷暖关系）；商品图换为内联 SVG 几何零件，文案全部重写，非复刻。",
    Agent提示词: `【标准件检索库 · 设计语言宪法】
效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。

第一章 总纲 · 设计哲学
陈列型目录站，走「结构层加法 + 色彩层减法」。结构可以密（类目层叠、筛选叠加、卡片塞满规格与数值），颜色必须减（中性暖灰底全面积退让 + 单一赭红强调）。气质：专业、高效、可检索、不喧哗。适用：工业标准件 / 五金零件 / 元器件等 SKU 量大的 B2B 目录检索。

第二章 色彩板与角色
暖灰白底 #F5F3EF（页面，60%）；灰阶文本与分隔线 #1E1B18 / #DDD7CE（30%）；赭红强调 #A8452B（搜索条描边与按钮、价格数字、当前类目 chip、分页当前页，10%）；卡片底 #FFFFFF 做信息承载面。严禁第二个强调色并存。

第三章 字体规则
字体栈：-apple-system / BlinkMacSystemFont / "PingFang SC" / "Microsoft YaHei" / sans-serif；搜索框 15、卡片名 13、规格与元信息 11-12、价格数字 17 加粗。层级靠字号与灰度，不靠颜色数量。

第四章 组件规范
搜索条：2px 赭红描边通栏 + 右侧实心赭红按钮，是首屏唯一焦点层。分类导航：面包屑式层层递进（类目 › 子类 › 规格 › 材质），当前项反白赭红。筛选条：规格/材质/强度/表面/起订 一组 chips，激活项赭红描边，右侧结果计数。卡片：正方形缩略图（内联 SVG 几何零件）+ 名称（规格部分赭红）+ 三行规格 + 大号赭红价格 + 徽章组（现货/起订/可定制）+ 底部产地与月销。分页：页码条，当前页赭红反白。

第五章 布局与节奏
纵向五段：搜索条 → 热门词/在库数 → 分类递进 → 筛选条 → 密集网格 → 分页。网格列数随视口递减 4→3→2→1，间距恒定。卡片内部信息堆叠紧凑，不追求留白。

第六章 动效与反馈
只允许 hover 时卡片描边转赭红 + 上浮 2px（180ms ease）。不做入场动效、不做滚动揭示、不做悬浮放大——密集目录里动效是噪音。

第七章 参数与可变项
bg / ink / accent / line / card / gap / radius / cols 八个变量全部走 CSS 变量，改一个即换肤。列数与间距是密度调节杆，圆角是严谨度调节杆。

第八章 适配与降级
窄屏（≤620px）网格降为 2 列、≤400px 降为 1 列且搜索条换行；卡片图用 aspect-ratio 1/1 保证不塌。不引任何外部商品图/字体/图标库，零件缩略图一律内联 SVG 几何绘制。

第九章 验收清单
① 首屏焦点是否落在搜索条；② 是否只有一个强调色；③ 卡片是否方形且信息密集；④ 分类是否层层递进可回溯；⑤ 375px 是否零横向溢出；⑥ 是否零外链。`,
    演示页: "assets/demos/方案-标准件检索库.html",
    代码: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>标准件检索库</title>
<style>
:root{
  --bg:#F5F3EF;
  --ink:#1E1B18;
  --accent:#A8452B;
  --line:#DDD7CE;
  --card:#FFFFFF;
  --gap:12px;
  --radius:6px;
  --cols:4;
}
*{box-sizing:border-box;margin:0;padding:0}
body{
  background:var(--bg);
  color:var(--ink);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  padding:16px;
  line-height:1.5;
}
.wrap{max-width:1180px;margin:0 auto}

/* 焦点层：顶部大搜索条。陈列型站点的唯一焦点＝功能入口（用户本能先看到它） */
.searchbar{
  display:flex;gap:var(--gap);align-items:stretch;
  background:var(--card);border:2px solid var(--accent);border-radius:var(--radius);
  padding:6px;margin-bottom:var(--gap);
}
.searchbar input{
  flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--ink);
  font-size:16px;padding:10px 12px;font-family:inherit;
}
.searchbar button{
  border:0;background:var(--accent);color:var(--card);font-size:15px;font-weight:600;
  padding:0 22px;border-radius:var(--radius);cursor:pointer;white-space:nowrap;font-family:inherit;
}

/* 层层递进：面包屑 + 大类 → 中类 */
.crumbs{font-size:13px;opacity:.6;margin-bottom:10px}
.crumbs b{color:var(--accent);opacity:1;font-weight:600}
.tier{margin-bottom:8px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.tier .lb{font-size:12px;opacity:.55;flex:0 0 auto}
.chip{
  border:1px solid var(--line);background:var(--card);border-radius:var(--radius);
  padding:5px 12px;font-size:13px;cursor:pointer;white-space:nowrap;font-family:inherit;color:var(--ink);
}
.chip.on{background:var(--accent);border-color:var(--accent);color:var(--card)}

/* 筛选条 */
.filters{
  display:flex;gap:var(--gap);flex-wrap:wrap;align-items:center;
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  padding:10px 0;margin:var(--gap) 0;
}
.filters .f{
  font-size:13px;border:1px solid var(--line);background:var(--card);
  border-radius:var(--radius);padding:5px 10px;white-space:nowrap;
}
.filters .f.on{border-color:var(--accent);color:var(--accent)}
.filters .sort{margin-left:auto;font-size:13px;opacity:.7}
.count{font-size:13px;opacity:.6;margin:0 0 10px}

/* 结构层加法：密集方形卡网格，严谨拼接、不倾斜不错位 */
.grid{
  display:grid;
  grid-template-columns:repeat(var(--cols),1fr);
  gap:var(--gap);
}
.card{
  background:var(--card);border:1px solid var(--line);border-radius:var(--radius);
  overflow:hidden;display:flex;flex-direction:column;
}
.card .pic{
  aspect-ratio:1/1;background:var(--bg);display:grid;place-items:center;
  border-bottom:1px solid var(--line);
}
.card .pic svg{width:58%;height:58%;stroke:currentColor;fill:none}
.card .body{padding:10px;display:flex;flex-direction:column;gap:5px;flex:1}
.card .nm{font-size:14px;font-weight:600}
.card .mdl{font-size:12px;opacity:.55}
.card .spec{font-size:12px;color:var(--accent);font-weight:600}
.card .tags{display:flex;gap:5px;flex-wrap:wrap}
.card .tag{font-size:11px;border:1px solid var(--line);border-radius:var(--radius);padding:2px 6px;opacity:.75}
.card .stk{
  font-size:11px;background:var(--accent);color:var(--card);
  border-radius:var(--radius);padding:2px 7px;align-self:flex-start;
}
.card .cta{
  margin-top:auto;padding-top:7px;border-top:1px solid var(--line);
  font-size:12px;color:var(--accent);font-weight:600;
}

/* 分页 */
.pager{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:var(--gap);padding-top:var(--gap);border-top:1px solid var(--line)}
.pager span{
  font-size:13px;border:1px solid var(--line);background:var(--card);
  border-radius:var(--radius);padding:5px 11px;white-space:nowrap;
}
.pager span.on{background:var(--accent);border-color:var(--accent);color:var(--card)}

@media (max-width:900px){ :root{--cols:2} .filters .sort{margin-left:0} }
@media (max-width:560px){ :root{--cols:1} }
</style>
</head>
<body>
<div class="wrap">
  <div class="searchbar">
    <input id="q" placeholder="检索标准件：型号 / 规格 / 材质">
    <button>检索</button>
  </div>
  <div class="crumbs" id="crumbs"></div>
  <div class="tier" id="t1"><span class="lb">大类</span></div>
  <div class="tier" id="t2"><span class="lb">中类</span></div>
  <div class="filters">
    <span class="f on">规格 全部</span>
    <span class="f">材质 碳钢</span>
    <span class="f">表面 镀锌</span>
    <span class="f">标准 GB</span>
    <span class="sort">共 <b id="n">0</b> 项 · 按库存排序</span>
  </div>
  <div class="count" id="cnt"></div>
  <div class="grid" id="grid"></div>
  <div class="pager">
    <span>上一页</span><span class="on">1</span><span>2</span><span>3</span><span>4</span><span>…</span><span>27</span><span>下一页</span>
  </div>
</div>
<script>
// 零件图形全部内联 SVG，零外链
var ICON = {
  bolt:'<svg viewBox="0 0 100 100" stroke-width="5"><polygon points="50,10 78,26 78,42 22,42 22,26"/><rect x="41" y="42" width="18" height="48"/><path d="M41 58h18M41 70h18M41 82h18" stroke-width="3"/></svg>',
  nut:'<svg viewBox="0 0 100 100" stroke-width="5"><polygon points="50,12 83,31 83,69 50,88 17,69 17,31"/><circle cx="50" cy="50" r="17"/></svg>',
  washer:'<svg viewBox="0 0 100 100" stroke-width="6"><circle cx="50" cy="50" r="33"/><circle cx="50" cy="50" r="15"/></svg>',
  screw:'<svg viewBox="0 0 100 100" stroke-width="5"><circle cx="50" cy="24" r="16"/><path d="M38 24h24M50 12v24" stroke-width="3"/><rect x="42" y="40" width="16" height="50"/><path d="M42 56h16M42 70h16M42 84h16" stroke-width="3"/></svg>',
  gear:'<svg viewBox="0 0 100 100" stroke-width="4"><circle cx="50" cy="50" r="24"/><circle cx="50" cy="50" r="9"/><path d="M50 18v-10M50 92v-10M18 50H8M92 50h-10M27 27l-7-7M73 73l7 7M73 27l7-7M27 73l-7 7"/></svg>',
  bearing:'<svg viewBox="0 0 100 100" stroke-width="4"><circle cx="50" cy="50" r="34"/><circle cx="50" cy="50" r="18"/><circle cx="50" cy="24" r="5"/><circle cx="73" cy="63" r="5"/><circle cx="27" cy="63" r="5"/></svg>',
  spring:'<svg viewBox="0 0 100 100" stroke-width="5"><path d="M28 18q44 0 44 16t-44 16 44 16 -44 16"/></svg>',
  oring:'<svg viewBox="0 0 100 100" stroke-width="7"><circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="14"/></svg>',
  shaft:'<svg viewBox="0 0 100 100" stroke-width="5"><rect x="20" y="40" width="60" height="20"/><path d="M20 40v20M80 40v20" stroke-width="6"/><path d="M34 40v20M50 40v20M66 40v20" stroke-width="3"/></svg>',
  seal:'<svg viewBox="0 0 100 100" stroke-width="5"><circle cx="50" cy="50" r="32"/><circle cx="50" cy="50" r="20"/><path d="M30 50h-8M70 50h8" stroke-width="4"/></svg>'
};

var CAT = {
  "紧固件":{
    "外六角螺栓":[["外六角螺栓","GB/T 5782","M8×40 · 8.8级",["碳钢","镀锌"],"bolt",1280],
                  ["外六角螺栓","GB/T 5783","M10×50 · 8.8级",["碳钢","发黑"],"bolt",642],
                  ["外六角螺栓","GB/T 5782","M12×60 · 10.9级",["合金钢","达克罗"],"bolt",317],
                  ["外六角螺栓","GB/T 5783","M6×30 · 8.8级",["不锈钢","本色"],"bolt",2044]],
    "六角螺母":[["六角螺母","GB/T 6170","M8 · 8级",["碳钢","镀锌"],"nut",3860],
                ["六角螺母","GB/T 6170","M10 · 8级",["碳钢","镀锌"],"nut",2150],
                ["六角螺母","GB/T 6172","M6 · 薄型",["不锈钢","本色"],"nut",1490],
                ["六角螺母","GB/T 6170","M12 · 8级",["碳钢","发黑"],"nut",1040]],
    "平垫圈":[["平垫圈","GB/T 97.1","φ8 · 2mm",["碳钢","镀锌"],"washer",9200],
              ["平垫圈","GB/T 97.1","φ10 · 2.5mm",["不锈钢","本色"],"washer",5400],
              ["平垫圈","GB/T 97.1","φ6 · 1.6mm",["碳钢","镀锌"],"washer",7600],
              ["平垫圈","GB/T 97.1","φ12 · 3mm",["不锈钢","本色"],"washer",3100]],
    "内六角螺钉":[["内六角螺钉","GB/T 70.1","M6×25 · 12.9级",["合金钢","发黑"],"screw",1780],
                  ["内六角螺钉","GB/T 70.1","M8×35 · 12.9级",["合金钢","发黑"],"screw",960],
                  ["内六角螺钉","GB/T 70.1","M5×20 · 12.9级",["不锈钢","本色"],"screw",2210],
                  ["内六角螺钉","GB/T 70.1","M10×45 · 12.9级",["合金钢","发黑"],"screw",705]]
  },
  "传动件":{
    "直齿齿轮":[["直齿齿轮","GB/T 1356","m=2 · z=32",["45钢","调质"],"gear",240],
                ["直齿齿轮","GB/T 1356","m=3 · z=24",["45钢","调质"],"gear",186],
                ["直齿齿轮","GB/T 1356","m=4 · z=18",["45钢","调质"],"gear",132],
                ["直齿齿轮","GB/T 1356","m=1.5 · z=40",["45钢","调质"],"gear",318]],
    "同步带轮":[["同步带轮","JB/T 7512","XL · 20齿",["铝合金","阳极"],"gear",412],
                ["同步带轮","JB/T 7512","L · 30齿",["铝合金","阳极"],"gear",298],
                ["同步带轮","JB/T 7512","XL · 24齿",["铝合金","阳极"],"gear",365],
                ["同步带轮","JB/T 7512","L · 36齿",["钢","发黑"],"gear",204]],
    "传动轴":[["传动轴","—","φ20×300",["45钢","镀铬"],"shaft",150],
              ["传动轴","—","φ25×400",["45钢","镀铬"],"shaft",96],
              ["传动轴","—","φ16×250",["不锈钢","本色"],"shaft",212],
              ["传动轴","—","φ30×500",["45钢","镀铬"],"shaft",64]]
  },
  "支承件":{
    "深沟球轴承":[["深沟球轴承","GB/T 276","6204-2RS",["轴承钢","—"],"bearing",860],
                  ["深沟球轴承","GB/T 276","6205-2Z",["轴承钢","—"],"bearing",640],
                  ["深沟球轴承","GB/T 276","6008",["轴承钢","—"],"bearing",275],
                  ["深沟球轴承","GB/T 276","6206",["轴承钢","—"],"bearing",508]],
    "直线轴承":[["直线轴承","—","LM20UU",["轴承钢","—"],"bearing",330],
                ["直线轴承","—","LM16UU",["轴承钢","—"],"bearing",415],
                ["直线轴承","—","LM25UU",["轴承钢","—"],"bearing",188],
                ["直线轴承","—","LM12UU",["轴承钢","—"],"bearing",520]]
  },
  "弹性件":{
    "压缩弹簧":[["压缩弹簧","GB/T 2089","φ1.2×20×60",["琴钢丝","—"],"spring",1520],
                ["压缩弹簧","GB/T 2089","φ2×25×80",["琴钢丝","—"],"spring",880],
                ["压缩弹簧","GB/T 2089","φ0.8×12×40",["不锈钢","—"],"spring",2340],
                ["压缩弹簧","GB/T 2089","φ3×30×100",["琴钢丝","—"],"spring",460]],
    "碟形弹簧":[["碟形弹簧","GB/T 1972","φ40×2",["60Si2Mn","—"],"spring",410],
                ["碟形弹簧","GB/T 1972","φ50×2.5",["60Si2Mn","—"],"spring",286],
                ["碟形弹簧","GB/T 1972","φ31.5×1.75",["60Si2Mn","—"],"spring",602],
                ["碟形弹簧","GB/T 1972","φ63×3",["60Si2Mn","—"],"spring",174]]
  },
  "密封件":{
    "O形密封圈":[["O形密封圈","GB/T 3452","φ20×2.65",["丁腈","NBR"],"oring",6400],
                 ["O形密封圈","GB/T 3452","φ32×3.55",["氟胶","FKM"],"oring",2100],
                 ["O形密封圈","GB/T 3452","φ25×2.65",["丁腈","NBR"],"oring",4850],
                 ["O形密封圈","GB/T 3452","φ40×3.55",["硅胶","VMQ"],"oring",1320]],
    "骨架油封":[["骨架油封","GB/T 9877","TC 35×55×10",["丁腈","NBR"],"seal",760],
                ["骨架油封","GB/T 9877","TC 45×65×12",["丁腈","NBR"],"seal",520],
                ["骨架油封","GB/T 9877","TC 25×40×8",["氟胶","FKM"],"seal",940],
                ["骨架油封","GB/T 9877","TC 55×80×12",["丁腈","NBR"],"seal",380]]
  }
};

var big = "紧固件", mid = "外六角螺栓";

function renderTier(el, keys, cur, tier){
  el.innerHTML = '<span class="lb">' + (tier === 1 ? '大类' : '中类') + '</span>';
  keys.forEach(function(k){
    var s = document.createElement('span');
    s.className = 'chip' + (k === cur ? ' on' : '');
    s.textContent = k;
    s.onclick = function(){
      if (tier === 1){ big = k; mid = Object.keys(CAT[k])[0]; }
      else { mid = k; }
      render();
    };
    el.appendChild(s);
  });
}

function render(){
  renderTier(document.getElementById('t1'), Object.keys(CAT), big, 1);
  renderTier(document.getElementById('t2'), Object.keys(CAT[big]), mid, 2);
  document.getElementById('crumbs').innerHTML =
    '全部 <b>&gt;</b> ' + big + ' <b>&gt;</b> ' + mid;

  var rows = CAT[big][mid];
  var g = document.getElementById('grid');
  g.innerHTML = '';
  rows.forEach(function(r){
    var d = document.createElement('div');
    d.className = 'card';
    d.innerHTML =
      '<div class="pic">' + ICON[r[4]] + '</div>' +
      '<div class="body">' +
        '<div class="nm">' + r[0] + '</div>' +
        '<div class="mdl">' + r[1] + '</div>' +
        '<div class="spec">' + r[2] + '</div>' +
        '<div class="tags">' + r[3].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' +
        '<div class="stk">库存 ' + r[5] + '</div>' +
        '<div class="cta">加入询价单 &gt;</div>' +
      '</div>';
    g.appendChild(d);
  });
  document.getElementById('n').textContent = rows.length;
  document.getElementById('cnt').textContent = '共 ' + rows.length + ' 个型号 · 库存实时同步';
}
render();
<\/script>
</body>
</html>
`,
    片段: `:root{--bg:#F5F3EF;--ink:#1E1B18;--accent:#A8452B;--line:#DDD7CE;--card:#FFFFFF;--gap:12px;--radius:6px;--cols:4}
.searchbar{border:2px solid var(--accent);border-radius:var(--radius);background:var(--card)}
.searchbar button{background:var(--accent);color:#fff}
.cats a.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));gap:var(--gap)}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius)}
.card:hover{border-color:var(--accent);transform:translateY(-2px)}
.price .n{color:var(--accent)}`,
    参数: [{"键":"bg","名":"暖灰白底","类型":"color","默认":"#F5F3EF"},{"键":"ink","名":"主文字色","类型":"color","默认":"#1E1B18"},{"键":"accent","名":"赭红强调","类型":"color","默认":"#A8452B"},{"键":"line","名":"分隔线色","类型":"color","默认":"#DDD7CE"},{"键":"card","名":"卡片底色","类型":"color","默认":"#FFFFFF"},{"键":"gap","名":"网格间距(px)","类型":"number","默认":"12"},{"键":"radius","名":"卡片圆角(px)","类型":"number","默认":"6"},{"键":"cols","名":"网格列数","类型":"number","默认":"4"}],
    来源: "机制参考自 1688.com / taobao.com 搜索结果页（2026-09-22 分析，陈列型：结构层加法 + 色彩层减法，焦点层＝搜索框，层层递进分类 + 密集方形卡拼接）；已换题重推为「标准件检索库」，剥离阿里/淘宝品牌与电商语义，配色由阿里橙改为赭红、商品图改内联 SVG 几何绘制，非复刻"
  }

  ,
  {
    id: "S43",
    风格名: "深空门户",
    适配端: "PC 端",
    风格: "科技未来",
    场景: "官网·品牌站",
    骨架: "全屏沉浸舞台 + 预加载计数 + 自定义光标 + 左侧行星清单 + 中央 portal 圆窗 + 右下行星大标题与数据面板 + 点击 travel 转场",
    配色: {
      "近黑宇宙底(页面)": "78%",
      "白字/行星名": "15%",
      "赭橙强调(portal/光标环/转场)": "7%"
    },
    布局骨架: "全屏沉浸舞台（overflow hidden，min-height 540px）：顶部玻璃徽章导航（左 logo + 右 menu，1px 白描边 + 半透白底 blur(12px) 圆角胶囊）；左侧垂直 8 项行星清单（当前项放大加粗并前置白圆点）；中央 portal 圆角窗口（canvas 假 3D 行星遮罩，点击 travel 转场）；右下巨幅行星名（Impact 体）+ 数据面板（dl 网格 标签138px+值，逐行揭示）；底部预加载计数 0→100 + 浮动 logo 收拢至顶角；最上层自定义光标（fixed z100，12px 实心点 + 36px 环 + Enter 标签）。窄屏 ≤900 隐藏导航、≤640 隐藏行星清单且 portal 上移居中，不横向溢出",
    重色落点: "近黑宇宙底全面积退让，白色文字与行星名为唯一前景，赭橙只落在 portal 描边、光标环、转场微光与当前行星圆点——是全屏唯一动作色；底色层次靠 canvas 程序化星空 + 行星径向渐变 + 光环制造，不靠色彩数量",
    第一屏内容: "预加载计数 → 玻璃徽章导航 + 行星清单 + 中央 portal + 行星大标题与数据面板 + 自定义光标",
    删减元素: "不引外部视频/图片/字体；原 space-voyage 的远程行星视频与 Unsplash 图全部改用 canvas 程序化绘制（drawSpace 画星空 + 行星径向渐变 + 光环），字体降级 system-ui + Impact 兜底，零外链",
    适用: "天文馆 / 航天科普 / 沉浸式品牌门户；以「逐层探索某对象」为核心叙事、靠点击进入下一层体验的沉浸站",
    禁忌: "信息密度高的工具站；多色强调并存；移动端无光标环境强依赖 hover；引入外部视频/图片/字体（本项目离线零外链）",
    参考站: ["motionsites.ai"],
    我的说明: "把 motionsites.ai 的 space-voyage（Planet Jumping 沉浸空间门户：canvas 3D portal + 视频预加载 count-up + 8 行星数据模型 + 自定义光标 + travel 转场）换题重推为「深空门户·行星档案馆」。品牌名、行星名、文案全部重写（8 行星改中文名）；配色由原蓝紫改为近黑宇宙底 + 赭橙强调；原远程行星视频与 Unsplash 图全部改用 canvas 程序化绘制，字体降级系统栈，零外链，非复刻。",
    Agent提示词: `【深空门户 · 设计语言宪法】
效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。

第一章 总纲 · 设计哲学
全屏沉浸的「行星档案馆」探索门户。近黑宇宙底 + 白色行星名 + 单一赭橙强调；交互以自定义光标与点击 portal 进入下一层为核心。气质：空旷、深邃、冷静、有仪式感。适用：天文/航天科普、以「逐层探索某对象」为叙事的沉浸品牌站。

第二章 色彩板与角色
近黑宇宙底 #090807（页面，78%）；白字 #ffffff（行星名与数据，15%）；赭橙强调 #d77a3a（portal 描边、光标环、转场微光、当前行星点，7%）；灰阶静音 #9e9a94（清单非激活项）。严禁第二个强调色。

第三章 字体规则
字体栈：system-ui / -apple-system / "PingFang SC" / "Microsoft YaHei" / sans-serif；行星大标题用 Impact / "Arial Narrow" 兜底（clamp 128–314px），其余 16px。层级靠字号与留白，不靠颜色数量。

第四章 组件规范
玻璃徽章导航：左 logo 右 menu，1px 白描边 + 半透白底 + blur(12px) 圆角胶囊。行星清单：左侧垂直 8 项，当前项放大加粗并前置白圆点。portal 圆窗：中央圆角矩形（--portalRadius），点击触发 travel 转场；其 canvas 假 3D 行星遮罩以 40 点投影模拟透视。数据面板：右下 dl 网格（标签 138px + 值），逐行揭示。预加载：底部 0→100 count-up + 浮动 logo 收拢至顶角。

第五章 布局与节奏
全屏沉浸舞台（overflow hidden，min-height 540px）：顶部导航 → 左侧行星清单 → 中央 portal → 右下巨标题 + 数据面板 → 底部预加载计数 + 自定义光标层（fixed，z100）。入场时间线：导航下揭 → 清单侧揭 → 标题上升 → 数据逐行 → portal 标题。

第六章 动效与反馈
自定义光标（cursor:none 全屏）：12px 实心点 + 36px 环（--cursorSize），悬停 portal 时环放大 1.16 并显示 Enter 标签。travel 转场：portal 缩放 + 背景交叉淡 + shade 加深。所有揭示用 cubic-bezier(.22,1,.36,1)，fill forwards。

第七章 参数与可变项
bg / ink / accent / portalRadius / portalTilt / shade / cursorSize / preloaderSpeed 八个变量全部走 CSS 变量；圆角与倾角调 portal 形态，遮罩强度调底部压暗，光标尺寸调光标体量，预加载速度调 boot 时长。改一个即换肤。

第八章 适配与降级
≤900px 隐藏顶部导航、portal 放大；≤640px 隐藏行星清单、portal 上移居中，min-height 600px；均不横向溢出。不引任何外部视频/图片/字体，行星与星空一律 canvas 程序化绘制（drawSpace：径向渐变星球 + 光环 + 星点）。prefers-reduced-motion 下关闭光标动画与转场缩放。

第九章 验收清单
① 首屏焦点是否落在中央 portal；② 是否只有一个强调色；③ 自定义光标是否跟随且悬停 portal 有反馈；④ 点击 portal 是否触发 travel 转场；⑤ 375px 是否零横向溢出；⑥ 是否零外链（行星/星空全 canvas 生成）。`,
    演示页: "assets/demos/方案-深空门户.html",
    代码: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>深空门户 · 行星档案馆</title>
<style>
:root{
  --bg:#090807;
  --ink:#ffffff;
  --accent:#d77a3a;
  --muted:#9e9a94;
  --portalRadius:90;
  --portalTilt:37;
  --shade:.88;
  --cursorSize:36;
  --preloaderSpeed:1;
}
*{box-sizing:border-box}
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--ink);font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;font-synthesis:none}
.experience{position:relative;width:100%;height:100%;min-height:540px;overflow:hidden;background:var(--bg)}
.backgrounds,.background,.shade,.transition-layer{position:absolute;inset:0;width:100%;height:100%}
.background{object-fit:cover;opacity:0;transition:opacity .8s ease}
.background.is-visible{opacity:1}
.shade{z-index:1;background:linear-gradient(to bottom,transparent 52%,rgba(0,0,0,var(--shade)) 100%);pointer-events:none}
.chrome{position:absolute;z-index:4;transition:opacity .45s ease,filter .45s ease}
.experience.is-transitioning .chrome{opacity:0;filter:blur(8px);pointer-events:none}

.header{left:clamp(18px,1.95vw,28px);right:clamp(18px,1.95vw,28px);top:clamp(18px,3.1vh,28px);display:flex;justify-content:space-between;align-items:center}
.header-actions{margin-left:auto;display:flex;align-items:center}
.nav{display:flex;align-items:center;height:42px;padding:4px 5px;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.1);backdrop-filter:blur(12px);border-radius:999px}
.nav a{color:var(--ink);text-decoration:none;padding:8px 19px;border-radius:999px;line-height:1}
.nav a.active{background:var(--ink);color:var(--bg)}
.menu{height:42px;padding:0 20px;border:0;border-radius:999px;background:var(--ink);color:var(--bg);cursor:pointer}

.planet-list{left:clamp(18px,1.95vw,28px);top:50%;transform:translateY(-43%);display:flex;flex-direction:column;gap:6px;font-size:16px}
.planet-item{display:flex;align-items:center;min-height:20px}
.planet-item.active{font-size:18px;font-weight:700;gap:8px}
.planet-item.active:before{content:'';width:16px;height:16px;border-radius:50%;background:var(--ink)}

.portal-wrap{left:50%;top:50%;width:min(320px,31vw);transform:translate(-50%,-54%);perspective:none}
.portal-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:16px;opacity:0}
.portal-heading strong{font-size:18px;margin-left:8px}
.portal{position:relative;display:block;width:100%;aspect-ratio:320/350;padding:0;overflow:visible;border:0;border-radius:calc(var(--portalRadius)*1px);background:transparent;cursor:pointer;box-shadow:none;transform:none!important}
.portal video,.portal img,.portal canvas{visibility:hidden;position:absolute;width:1px;height:1px;pointer-events:none}
.portal-canvas{position:fixed;inset:0;z-index:3;width:100%;height:100%;pointer-events:none}

.planet-content{left:clamp(28px,4vw,58px);right:clamp(28px,3vw,44px);bottom:clamp(24px,3vh,30px);display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
.planet-content h1{font-family:Impact,'Arial Narrow',sans-serif;font-size:clamp(128px,21.8vw,314px);font-weight:400;line-height:.72;margin:0 0 -.04em;letter-spacing:0;transform:translateX(-32px);opacity:0}
.planet-content dl{width:min(447px,34vw);margin:0;font-size:16px}
.fact{display:grid;grid-template-columns:138px 1fr;gap:18px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.48);opacity:0}
.fact:last-child{border-bottom:0}
.fact dt{font-weight:700}
.fact dd{margin:0}

.transition-layer{display:none}
.loading{position:absolute;z-index:12;left:50%;bottom:30px;transform:translateX(-50%);opacity:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;transition:opacity .2s}
.experience.is-loading .loading{opacity:.8}
.experience.is-transitioning .header,.experience.is-transitioning .planet-list{opacity:1;filter:none;pointer-events:auto}
.experience.is-transitioning .shade{opacity:1}
.experience.is-committing .background{transition:none!important}

.preloader{position:absolute;inset:0;z-index:20;background:#000;overflow:hidden}
#preloader-canvas{position:absolute;inset:0;width:100%;height:100%}
.preloader-shade{position:absolute;inset:auto 0 0;height:35%;background:linear-gradient(to bottom,transparent,#000)}
.preloader.is-background{z-index:0}
.preloader.is-background .preloader-shade{opacity:0}
.floating-logo{position:fixed;z-index:22;left:50%;top:50%;width:59px;height:58px;transform:translate(-50%,-50%);will-change:left,top,width,height,transform;transition:left 2s cubic-bezier(.16,1,.3,1),top 2s cubic-bezier(.16,1,.3,1),width 2s cubic-bezier(.16,1,.3,1),height 2s cubic-bezier(.16,1,.3,1),transform 2s cubic-bezier(.16,1,.3,1)}
.floating-logo svg{width:100%;height:100%;display:block}
.floating-logo.is-docked{left:clamp(18px,1.95vw,28px);top:clamp(18px,3.1vh,28px);width:37px;height:36px;transform:none}
.floating-logo.is-settled{z-index:5}
.preloader-count{position:fixed;z-index:22;left:50%;bottom:clamp(22px,3.1vh,28px);display:flex;align-items:flex-end;gap:4px;transform:translateX(-50%);line-height:1}
.preloader-count>span:first-child{font-weight:100;font-size:64px}
.preloader-count .percent{font-size:24px;padding-bottom:4px}
.preloader-count.is-leaving{animation:preload-count-out .75s cubic-bezier(.22,1,.36,1) both}
@keyframes preload-count-out{to{opacity:0;filter:blur(7px);transform:translate(-50%,-34px)}}
body:not(.preload-complete) .custom-cursor{opacity:0!important}

html,body,button,a,.portal{cursor:none!important}
.custom-cursor{display:block;position:fixed;left:0;top:0;z-index:100;width:1px;height:1px;pointer-events:none;opacity:0;transition:opacity .2s ease}
.custom-cursor.is-visible{opacity:1}
.cursor-dot,.cursor-orbit{position:absolute;left:0;top:0;border-radius:50%;transform:translate(-50%,-50%)}
.cursor-dot{width:12px;height:12px;background:var(--ink)}
.cursor-orbit{width:var(--cursorSize);height:var(--cursorSize);border:1px solid var(--ink);background:rgba(255,255,255,.4);transition:transform .3s cubic-bezier(.22,1,.36,1)}
.custom-cursor.is-enter .cursor-orbit{transform:translate(-50%,-50%) scale(1.16)}
.cursor-label{position:absolute;top:26px;left:0;transform:translateX(-50%) translateY(-4px);font:16px/1.2 system-ui,Arial,sans-serif;white-space:nowrap;opacity:0;transition:opacity .2s ease,transform .3s cubic-bezier(.22,1,.36,1)}
.custom-cursor.is-enter .cursor-label{opacity:1;transform:translateX(-50%) translateY(0)}

body:not(.intro-ready) .header,.intro-ready .planet-list,.intro-ready .planet-content h1,.intro-ready .planet-content .fact{opacity:0}
.intro-ready .header{animation:reveal-down .9s cubic-bezier(.22,1,.36,1) .1s both}
.intro-ready .planet-list{animation:reveal-side .9s cubic-bezier(.22,1,.36,1) .65s both}
.content-revealing h1{animation:title-rise 1.05s cubic-bezier(.16,1,.3,1) both}
.content-revealing .fact{animation:fact-rise .72s cubic-bezier(.22,1,.36,1) both}
.fact:nth-child(1){animation-delay:.52s}
.fact:nth-child(2){animation-delay:.68s}
.fact:nth-child(3){animation-delay:.84s}
.fact:nth-child(4){animation-delay:1s}
.mask-revealing .portal-heading{animation:portal-caption .85s cubic-bezier(.22,1,.36,1) both}
.planet-list.is-switching .planet-item{animation:menu-row .58s cubic-bezier(.22,1,.36,1) both}
.planet-item:nth-child(1){animation-delay:.02s}
.planet-item:nth-child(2){animation-delay:.05s}
.planet-item:nth-child(3){animation-delay:.08s}
.planet-item:nth-child(4){animation-delay:.11s}
.planet-item:nth-child(5){animation-delay:.14s}
.planet-item:nth-child(6){animation-delay:.17s}
.planet-item:nth-child(7){animation-delay:.2s}
.planet-item:nth-child(8){animation-delay:.23s}
.planet-list.is-switching .planet-item.active:before{animation:active-dot .55s cubic-bezier(.22,1,.36,1) .18s both}

@keyframes reveal-down{from{opacity:0;filter:blur(8px);transform:translateY(-18px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes reveal-side{from{opacity:0;filter:blur(8px);transform:translate(-20px,-43%)}to{opacity:1;filter:blur(0);transform:translate(0,-43%)}}
@keyframes title-rise{from{opacity:0;filter:blur(12px);transform:translate(-32px,42px)}to{opacity:1;filter:blur(0);transform:translate(-32px,0)}}
@keyframes fact-rise{from{opacity:0;filter:blur(7px);transform:translateY(18px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes portal-caption{from{opacity:0;filter:blur(7px);transform:translateY(22px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes menu-row{from{opacity:.35;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
@keyframes active-dot{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}

@media(max-width:900px){
  .nav{display:none}
  .portal-wrap{width:min(300px,48vw)}
  .planet-content h1{font-size:clamp(105px,24vw,190px)}
  .planet-content dl{width:43vw}
  .fact{grid-template-columns:110px 1fr}
  .planet-list{font-size:14px}
  .planet-item.active{font-size:16px}
}
@media(max-width:640px){
  .experience{min-height:600px}
  .planet-list{display:none}
  .portal-wrap{top:44%;width:min(260px,66vw)}
  .planet-content{left:18px;right:18px;bottom:18px;display:block}
  .planet-content h1{font-size:clamp(98px,30vw,160px);margin-bottom:20px}
  .planet-content dl{width:100%;font-size:13px}
  .fact{grid-template-columns:92px 1fr;padding:5px 0}
  .portal-heading{font-size:14px}
  .portal-heading strong{font-size:16px}
  .menu{height:38px}
  .portal{border-radius:70px}
}
@media(prefers-reduced-motion:reduce){*{transition-duration:.01ms!important}.portal{transform:none!important}}
</style>
</head>
<body>
<main class="experience" data-planet="yanhe">
  <div class="backgrounds" aria-hidden="true" id="bg-wrap"></div>
  <div class="preloader" id="preloader" aria-label="Loading">
    <canvas id="preloader-canvas"></canvas>
    <div class="preloader-shade"></div>
  </div>
  <div class="floating-logo" id="floating-logo" aria-hidden="true">
    <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="var(--ink)" stroke-width="3"/><path d="M14 24l7 7 13-13" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
  <div class="preloader-count" id="preloader-count" aria-live="polite"><span id="preloader-value">0</span><span class="percent">%</span></div>
  <canvas id="scene-canvas" class="scene-canvas" aria-hidden="true"></canvas>
  <div class="shade" aria-hidden="true"></div>

  <header class="header chrome">
    <div class="header-actions">
      <nav class="nav" aria-label="Primary navigation"><a class="active" href="#about">关于</a><a href="#explore">探索</a><a href="#archive">档案</a></nav>
      <button class="menu" type="button">菜单</button>
    </div>
  </header>

  <aside class="planet-list chrome" aria-label="Planets"></aside>

  <canvas id="portal-canvas" class="portal-canvas" aria-hidden="true"></canvas>
  <section class="portal-wrap chrome" aria-label="Next destination">
    <div class="portal-heading"><span>下一站：</span><span><span id="next-number">[02]</span> <strong id="next-name">沧澜</strong></span></div>
    <button class="portal" id="portal" type="button" aria-label="Travel">
      <canvas id="portal-media" aria-hidden="true"></canvas>
    </button>
  </section>

  <section class="planet-content chrome" aria-live="polite">
    <h1 id="planet-title">岩核</h1>
    <dl id="facts"></dl>
  </section>

  <div class="transition-layer" aria-hidden="true"><canvas id="transition-canvas"></canvas></div>
  <div class="loading" aria-hidden="true">准备轨道…</div>
  <div class="custom-cursor" aria-hidden="true"><span class="cursor-orbit"></span><span class="cursor-dot"></span><span class="cursor-label">进入</span></div>
</main>

<script>
(function(){
  const state={bg:'#090807',ink:'#ffffff',accent:'#d77a3a',portalRadius:90,portalTilt:37,shade:.88,cursorSize:36,preloaderSpeed:1};
  function apply(){Object.keys(state).forEach(k=>{let v=state[k];if(k==='portalRadius'||k==='cursorSize')v+='px';document.documentElement.style.setProperty('--'+k, k==='shade'?state[k]:String(v))});}
  apply();
  addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param'||!(d.key in state))return;state[d.key]=d.value;apply();});

  const planets=['岩核','沧澜','星火','荧惑','青丘','玄冰','银环','橙雾'];
  const states={
    yanhe:{name:'岩核',next:'沧澜',number:'[02]',background:'yanhe',facts:[['距档案中心：','约 4.2 光分。'],['公转周期：','687 个标准日。'],['表面均温：','-60 °C，两极可达 -125 °C。'],['大气成分：','以二氧化碳为主，尘暴季节性强。']]},
    canglan:{name:'沧澜',next:'星火',number:'[03]',background:'canglan',facts:[['距档案中心：','约 2.5 光分。'],['公转周期：','365.25 标准日。'],['表面均温：','+15 °C。'],['大气成分：','氮氧混合，液态水覆盖近七成表面。']]},
    xinghuo:{name:'星火',next:'星火',number:'[08]',background:'xinghuo',facts:[['距档案中心：','约 0.4 光分。'],['公转周期：','225 标准日。'],['表面均温：','+465 °C。'],['大气成分：','极厚二氧化碳，硫酸云层。']]}
  };
  let current='yanhe';
  let busy=false, transitionActive=false, expansion=0, maskScale=0, rotX=0, rotY=0, targetX=0, targetY=0, canvasOpacity=1;

  function makePlanetCanvas(id, hue, rings){
    const c=document.createElement('canvas');c.id=id;c.className='background';c.width=window.innerWidth||1280;c.height=window.innerHeight||720;
    const ctx=c.getContext('2d');drawSpace(ctx,c.width,c.height,hue,rings);return c;
  }
  function drawSpace(ctx,W,H,hue,rings){
    ctx.fillStyle='#'+state.bg.slice(1);ctx.fillRect(0,0,W,H);
    const g=ctx.createRadialGradient(W*.7,H*.3,0,W*.7,H*.3,W*1.2);
    g.addColorStop(0,'hsl('+(hue+20)+',55%,18%)');g.addColorStop(.55,'hsl('+(hue-10)+',45%,8%)');g.addColorStop(1,'#000');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    for(let i=0;i<240;i++){
      const x=Math.random()*W,y=Math.random()*H,r=Math.random()*1.5,a=.2+Math.random()*.8;
      ctx.fillStyle='rgba(255,255,255,'+a+')';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
    }
    const cx=W*.65,cy=H*.55,R=Math.min(W,H)*.28;
    const pg=ctx.createRadialGradient(cx-R*.4,cy-R*.4,R*.1,cx,cy,R);
    pg.addColorStop(0,'hsl('+hue+',70%,60%)');pg.addColorStop(.4,'hsl('+hue+',55%,35%)');pg.addColorStop(1,'hsl('+hue+',50%,12%)');
    ctx.fillStyle=pg;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fill();
    ctx.save();ctx.globalCompositeOperation='source-atop';
    for(let i=0;i<8;i++){ctx.fillStyle='rgba(0,0,0,'+.05+Math.random()*.1+')';ctx.beginPath();const a=Math.random()*Math.PI*2,rr=R*(.5+Math.random()*.45);ctx.arc(cx+Math.cos(a)*rr*.6,cy+Math.sin(a)*rr*.6,rr*.25,0,Math.PI*2);ctx.fill();}
    ctx.restore();
    if(rings){
      ctx.save();ctx.translate(cx,cy);ctx.rotate(-.15);ctx.beginPath();ctx.ellipse(0,0,R*1.6,R*.35,0,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=R*.08;ctx.stroke();ctx.restore();
    }
  }

  const bgWrap=document.getElementById('bg-wrap');
  bgWrap.appendChild(makePlanetCanvas('bg-yanhe',25,false));
  bgWrap.appendChild(makePlanetCanvas('bg-canglan',200,true));
  bgWrap.appendChild(makePlanetCanvas('bg-xinghuo',15,false));
  document.getElementById('bg-yanhe').classList.add('is-visible');

  const sceneCanvas=document.getElementById('scene-canvas'), sceneCtx=sceneCanvas.getContext('2d');
  const portalCanvas=document.getElementById('portal-canvas'), portalCtx=portalCanvas.getContext('2d');
  const portalMedia=document.getElementById('portal-media'), portalMediaCtx=portalMedia.getContext('2d');
  const transitionCanvas=document.getElementById('transition-canvas'), transitionCtx=transitionCanvas.getContext('2d');

  function resize(){
    const d=Math.min(window.devicePixelRatio||1,2);
    [sceneCanvas,portalCanvas,transitionCanvas].forEach(c=>{
      c.width=innerWidth*d;c.height=innerHeight*d;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';
      const ctx=c.getContext('2d');ctx.setTransform(d,0,0,d,0,0);
    });
    portalMedia.width=320;portalMedia.height=350;
    drawPortalMedia();
  }

  function drawPortalMedia(){
    const ctx=portalMediaCtx,w=portalMedia.width,h=portalMedia.height;
    const st=states[current]; const next=st.next===st.name?st.name:states[st.next].name;
    const hue=next==='沧澜'?200:(next==='星火'?15:25);
    drawSpace(ctx,w,h,hue,next==='沧澜');
  }

  function drawRoundedPath(ctx,cx,cy,w,h,r){
    r=Math.min(r,w/2,h/2);
    const pts=[];
    for(let i=0;i<=10;i++){const a=-Math.PI/2+i*(Math.PI/2)/10;pts.push([w/2-r+Math.cos(a)*r, -h/2+r+Math.sin(a)*r]);}
    for(let i=0;i<=10;i++){const a=i*(Math.PI/2)/10;pts.push([w/2-r+Math.cos(a)*r, h/2-r+Math.sin(a)*r]);}
    for(let i=0;i<=10;i++){const a=Math.PI/2+i*(Math.PI/2)/10;pts.push([-w/2+r+Math.cos(a)*r, h/2-r+Math.sin(a)*r]);}
    for(let i=0;i<=10;i++){const a=Math.PI+i*(Math.PI/2)/10;pts.push([-w/2+r+Math.cos(a)*r, -h/2+r+Math.sin(a)*r]);}
    const ax=rotX*Math.PI/180, ay=rotY*Math.PI/180;
    ctx.beginPath();
    pts.forEach((p,idx)=>{
      const x=p[0],y=p[1];const xx=x*Math.cos(ay);const yy=y*Math.cos(ax);const z=x*Math.sin(ay)-y*Math.sin(ax);const pp=850/(850+z);
      const sx=cx+xx*pp, sy=cy+yy*pp;
      if(idx===0)ctx.moveTo(sx,sy);else ctx.lineTo(sx,sy);
    });
    ctx.closePath();
  }

  function drawCover(ctx,media){
    const mw=media.width||media.videoWidth||media.naturalWidth||media.clientWidth,mh=media.height||media.videoHeight||media.naturalHeight||media.clientHeight;
    if(!mw||!mh)return;
    const s=Math.max(innerWidth/mw,innerHeight/mh),w=mw*s,h=mh*s;
    ctx.drawImage(media,(innerWidth-w)/2,(innerHeight-h)/2,w,h);
  }

  function drawShade(ctx){
    const g=ctx.createLinearGradient(0,innerHeight*.52,0,innerHeight);
    g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.88)');
    ctx.fillStyle=g;ctx.fillRect(0,innerHeight*.52,innerWidth,innerHeight*.48);
  }

  function portalLoop(){
    const ctx=portalCtx;ctx.clearRect(0,0,innerWidth,innerHeight);
    if(transitionActive){drawCover(ctx,transitionCanvas);drawShade(ctx);}
    else if(expansion>0.001){drawCover(ctx,document.getElementById('bg-'+states[current].background)||document.querySelector('.background.is-visible'));drawShade(ctx);}
    const rect=document.getElementById('portal').getBoundingClientRect();
    const e=expansion;
    const cx=rect.left+rect.width/2+(innerWidth/2-(rect.left+rect.width/2))*e;
    const cy=rect.top+rect.height/2+(innerHeight/2-(rect.top+rect.height/2))*e;
    const bw=rect.width+(innerWidth-rect.width)*e, bh=rect.height+(innerHeight-rect.height)*e;
    const sc=e?1:maskScale;const w=bw*sc,h=bh*sc;
    if(w<=1||h<=1){requestAnimationFrame(portalLoop);return;}
    const r=(state.portalRadius*(1-e))*sc;
    const rx=rotX*(1-e), ry=rotY*(1-e);
    ctx.save();ctx.globalAlpha=canvasOpacity;
    drawRoundedPath(ctx,cx,cy,w,h,r,rx,ry);
    ctx.clip();
    ctx.fillStyle='#'+state.bg.slice(1);ctx.fillRect(0,0,innerWidth,innerHeight);
    drawCover(ctx,transitionActive?transitionCanvas:portalMedia);
    if(transitionActive)drawShade(ctx);
    ctx.restore();
    requestAnimationFrame(portalLoop);
  }

  function cursorLoop(){
    const c=document.querySelector('.custom-cursor');rotX+=(targetX-rotX)*.08;rotY+=(targetY-rotY)*.08;
    const orbit=c.querySelector('.cursor-orbit');
    if(orbit)orbit.style.transform='translate(-50%,-50%)';
    requestAnimationFrame(cursorLoop);
  }

  function render(){
    const st=states[current];
    document.querySelector('.experience').setAttribute('data-planet',current);
    document.getElementById('planet-title').textContent=st.name.toUpperCase();
    document.getElementById('next-name').textContent=st.next===st.name?st.name:states[st.next].name;
    document.getElementById('next-number').textContent=st.number;
    document.getElementById('portal').setAttribute('aria-label','前往 '+document.getElementById('next-name').textContent);
    const dl=document.getElementById('facts');dl.innerHTML='';
    st.facts.forEach(f=>{dl.innerHTML+='<div class="fact"><dt>'+f[0]+'</dt><dd>'+f[1]+'</dd></div>';});
    const list=document.querySelector('.planet-list');list.innerHTML='';
    planets.forEach(p=>{const sp=document.createElement('span');sp.className='planet-item'+(p===st.name?' active':'');sp.textContent=p;list.appendChild(sp);});
    document.querySelectorAll('.background').forEach(b=>b.classList.remove('is-visible'));
    const bg=document.getElementById('bg-'+st.background);if(bg)bg.classList.add('is-visible');
    drawPortalMedia();
    if(current!=='yanhe'){list.classList.remove('is-switching');void list.offsetWidth;list.classList.add('is-switching');}
  }

  function revealMask(){
    document.querySelector('.experience').classList.remove('mask-revealing');void document.querySelector('.experience').offsetWidth;
    document.querySelector('.experience').classList.add('mask-revealing');maskScale=0;
    let start=null;const dur=1050;
    function step(t){if(!start)start=t;const p=Math.min(1,(t-start)/dur);maskScale=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function revealContent(){
    document.querySelector('.experience').classList.remove('content-revealing');void document.querySelector('.experience').offsetWidth;
    document.querySelector('.experience').classList.add('content-revealing');
  }

  function easeInOutCubic(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
  function animateValue(setter,dur){return new Promise(res=>{let start=null;function step(t){if(!start)start=t;const p=Math.min(1,(t-start)/dur);setter(easeInOutCubic(p));if(p<1)requestAnimationFrame(step);else res();}requestAnimationFrame(step);});}

  async function travel(){
    if(busy||current==='xinghuo')return;busy=true;
    targetX=0;targetY=0;
    const next=current==='yanhe'?'canglan':'xinghuo';
    drawSpace(transitionCtx,innerWidth,innerHeight,next==='canglan'?200:15,next==='canglan');
    document.querySelector('.experience').classList.add('is-loading');
    await new Promise(r=>setTimeout(r,400));
    document.querySelector('.experience').classList.remove('is-loading','content-revealing','mask-revealing');
    document.querySelector('.experience').classList.add('is-transitioning');
    canvasOpacity=1;transitionActive=true;
    await animateValue(v=>expansion=v,1100);
    current=next;document.querySelector('.experience').classList.add('is-committing');render();
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    transitionActive=false;expansion=0;maskScale=0;canvasOpacity=1;
    document.querySelector('.experience').classList.remove('is-transitioning','is-committing');
    revealMask();setTimeout(revealContent,100);
    busy=false;
  }

  function startExperience(){
    document.querySelector('.experience').classList.add('intro-ready');
    setTimeout(revealMask,300);setTimeout(revealContent,850);
  }

  function runPreloader(){
    const c=document.getElementById('preloader-canvas'),ctx=c.getContext('2d');
    c.width=innerWidth;c.height=innerHeight;
    const dur=3000/state.preloaderSpeed;let start=null;
    function step(t){
      if(!start)start=t;const p=Math.min(1,(t-start)/dur);
      ctx.fillStyle='#000';ctx.fillRect(0,0,c.width,c.height);
      const cx=c.width/2,cy=c.height/2;
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,c.width*.6);
      g.addColorStop(0,'rgba(215,122,58,'+(p*.35)+')');g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,c.width*.6,0,Math.PI*2);ctx.fill();
      const R=Math.min(c.width,c.height)*.18*(.2+p*.8);
      ctx.fillStyle='hsl(25,60%,'+(35+p*25)+'%)';ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fill();
      for(let i=0;i<80;i++){
        const a=i*7+p*4,rr=R*1.3+i*4;
        ctx.fillStyle='rgba(255,255,255,'+(p*.6)+')';ctx.beginPath();ctx.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,1.2,0,Math.PI*2);ctx.fill();
      }
      document.getElementById('preloader-value').textContent=Math.round(p*100);
      if(p<1){requestAnimationFrame(step);}else finishPreloader();
    }
    requestAnimationFrame(step);
  }
  function finishPreloader(){
    document.getElementById('preloader-value').textContent='100';
    document.getElementById('preloader-count').classList.add('is-leaving');
    document.getElementById('floating-logo').classList.add('is-docked');
    document.getElementById('preloader').classList.add('is-background');
    document.body.classList.add('preload-complete');
    setTimeout(()=>{document.getElementById('preloader-count').style.display='none';},750);
    setTimeout(()=>{document.getElementById('floating-logo').classList.add('is-settled');},2000);
    startExperience();
  }

  window.addEventListener('resize',resize);
  resize();
  render();
  requestAnimationFrame(portalLoop);
  requestAnimationFrame(cursorLoop);
  setTimeout(runPreloader,200);

  const cursor=document.querySelector('.custom-cursor');
  document.addEventListener('pointermove',e=>{
    cursor.classList.add('is-visible');
    cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
    targetY=(e.clientX/innerWidth-.5)*state.portalTilt;
    targetX=(e.clientY/innerHeight-.5)*-state.portalTilt;
  });
  document.addEventListener('pointerleave',()=>{targetX=0;targetY=0;cursor.classList.remove('is-visible');});
  const portalBtn=document.getElementById('portal');
  portalBtn.addEventListener('pointerenter',()=>cursor.classList.add('is-enter'));
  portalBtn.addEventListener('pointerleave',()=>cursor.classList.remove('is-enter'));
  portalBtn.addEventListener('click',travel);

  if(location.search.includes('autoshot')){
    setTimeout(()=>{if(current==='yanhe')travel();},5500);
  }
})();
</script>
</body>
</html>
`,
    片段: `:root{--bg:#090807;--ink:#fff;--accent:#d77a3a;--portalRadius:90;--portalTilt:37;--shade:.88;--cursorSize:36}
.portal{border-radius:calc(var(--portalRadius)*1px);cursor:pointer}
.cursor-orbit{width:var(--cursorSize);height:var(--cursorSize);border:1px solid var(--ink)}
.custom-cursor{position:fixed;z-index:100;pointer-events:none}
.planet-item.active:before{content:'';width:16px;height:16px;border-radius:50%;background:var(--ink)}`,
    参数: [{"键":"bg","名":"宇宙底","类型":"color","默认":"#090807"},{"键":"ink","名":"主文字色","类型":"color","默认":"#ffffff"},{"键":"accent","名":"赭橙强调","类型":"color","默认":"#d77a3a"},{"键":"portalRadius","名":"portal 圆角(px)","类型":"number","默认":"90"},{"键":"portalTilt","名":"portal 倾角(deg)","类型":"number","默认":"37"},{"键":"shade","名":"底部遮罩强度","类型":"number","默认":"0.88"},{"键":"cursorSize","名":"光标环尺寸(px)","类型":"number","默认":"36"},{"键":"preloaderSpeed","名":"预加载速度","类型":"number","默认":"1"}],
    来源: "机制参考自 motionsites.ai（space-voyage / Planet Jumping，2026-09-23 分析）：canvas 圆角 portal 假 3D 行星遮罩 + 视频预加载 count-up + 8 数据模型 + 自定义光标 + travel 转场；已换题重推为「深空门户·行星档案馆」，主题/版式/配色/文案全部重做，远程视频与图片改 canvas 程序化生成，非复刻"
  }

  ,
  {
    id: "S44",
    风格名: "山涧廊桥志",
    适配端: "通用",
    风格: "有机自然",
    场景: "官网·品牌站",
    骨架: "sticky 电影舞台(3700px 滚动行程) + 顶部网格导航 + 主视觉巨标题 + 分层场景(天空/远山/廊桥/分屏/桥二/古村) + 古村引文 + 分屏 choreography + 无限滑块(5 张 sight-card 克隆循环) + 滚动驱动数据面板",
    配色: {
      "雾蓝天底(页面)": "60%",
      "米纸色文字/卡片(前景)": "30%",
      "赭橙强调(CTA/地图针)": "10%"
    },
    布局骨架: "sticky 电影舞台 height:100vh，外层 .cinema-scroll 高 100vh+3700px 制造滚动行程。顶部网格导航（logo 居左 / 导航居中 / 语言切换居右，半透文字）；居中主视觉巨标题（--titleSize 控 vw）+ 引文 + 标签胶囊；场景层 z 从低到高：天空 → 远山(back-four, mix-blend screen) → 廊桥(bridge) → 分屏左/右(splitframe) → 桥二(frame-two) → 古村(back-bazaar)，全部内联 SVG 程序化绘制；看点无限滑块（5 张 sight-card，圆角 --cardRadius，米纸底黑字 + 右上地图针 SVG，3 套克隆循环跳接）；分屏数据面板（两列事实 dt 大号衬线）。窄屏 ≤1500 主标降 11rem、≤1100 廊桥放宽、≤640 导航换行横滑且卡片占 82vw，不横向溢出",
    重色落点: "雾蓝天底全面积退让，米纸色承载标题与卡片为唯一前景，赭橙只落在 CTA 按钮、地图针与细节线——是全屏唯一动作色；层次靠 SVG 场景层的景深与 blur 制造，不靠色彩数量",
    第一屏内容: "顶部网格导航 + 居中主视觉巨标题 + 古村引文 + 标签胶囊 + 远山/廊桥场景层",
    删减元素: "不引外部字体/场景 PNG/图标；原 mostar-guide 的远程天空/远山/桥/分屏 PNG 与 Google 字体全部改用内联 SVG 程序化绘制（sky/back-four/bridge/splitframe-left/right/frame-two/back-bazaar 均为 SVG path），字体降级系统栈 + Georgia 衬线兜底，零外链",
    适用: "古村/古镇/文旅目的地官网；以电影感滚动叙事串联多个场景与看点的沉浸式品牌站",
    禁忌: "信息密度高的工具站；高饱和撞色；引入外部图片/视频/字体（本项目离线零外链）",
    参考站: ["motionsites.ai"],
    我的说明: "把 motionsites.ai 的 mostar-guide（Mostar city 电影感滚动页：sticky 舞台 + 滚动动画引擎 smoothstep/lerp/segmentInOut + 无限滑块 + 分屏 choreography）换题重推为「山涧廊桥志」古村落廊桥电影感滚动。主题/版式/配色/文案全部重做（Mostar→古廊桥村）；原远程场景 PNG 与 Google 字体全部改用内联 SVG 程序化绘制，字体降级系统栈，零外链，非复刻。",
    Agent提示词: `【山涧廊桥志 · 设计语言宪法】
效力声明：本文件为本方案唯一设计权威，优先级：本宪法 > 需求描述 > 通用审美。冲突以本宪法为准。

第一章 总纲 · 设计哲学
电影感的古村落廊桥叙事滚动页。雾蓝天底 + 米纸前景 + 单一赭橙强调；以 sticky 舞台 + 长滚动行程驱动多层场景逐段揭示。气质：静谧、诗意、有呼吸感、像在看一部慢纪录片。适用：古村/古镇/文旅目的地的沉浸式品牌官网。

第二章 色彩板与角色
雾蓝天底 #7fb4d4（页面，60%）；米纸前景 #fdf1e1（标题/卡片/标签，30%）；深墨文字 #111411（卡片内文，承载信息）；赭橙强调 #c45a2b（CTA 按钮、地图针、细节，10%）。严禁第二个强调色。

第三章 字体规则
字体栈：system-ui / -apple-system / "PingFang SC" / "Microsoft YaHei" / sans-serif；主视觉巨标题与分屏标题用 Georgia / serif 兜底（clamp 98–180px / 2.4–4.75rem）。层级靠字号与衬线气质，不靠颜色数量。

第四章 组件规范
顶部网格导航：logo 居左、导航居中、语言切换居右（三栏 grid，玻璃态半透文字）。主视觉：居中巨标题（--titleSize 控 vw）+ 下方引文 + 标签胶囊。场景层（z 从低到高）：天空 → 远山(back-four, mix-blend screen) → 廊桥(bridge) → 分屏左/右(splitframe) → 桥二(frame-two) → 古村(back-bazaar)，全部内联 SVG 程序化绘制。看点无限滑块：5 张 sight-card（圆角 --cardRadius，米纸底黑字，右上地图针 SVG），3 套克隆循环跳接。滚动数据面板：分屏标题 + 两列事实(dt 大号衬线)。

第五章 布局与节奏
sticky 电影舞台 height:100vh，外层 .cinema-scroll 高 100vh+3700px 制造滚动行程。滚动行程分段驱动：① 引文淡出 + 标题视差；② 廊桥升起 + 分屏左/右 choreography；③ 桥二淡入 + 古村数据面板；④ 看点滑块入场并可无限轮播。各段用 segmentInOut 平滑进出。

第六章 动效与反馈
滚动动画引擎：update() 内统一 smoothstep / lerp / segmentInOut，逐 CSS 变量按精度写入（不可偷减）。无限滑块：3 套克隆 + normalizeSightSlider 跳接（无缝循环）。hover 卡片微浮起。所有位移走 translate3d + will-change，GPU 友好。

第七章 参数与可变项
bg / paper / ink / accent / titleSize / parallax / blurMax / cardRadius / heroSize 九个变量全部走 CSS 变量；标题字号、视差强度、最大模糊、卡片圆角、分屏标题字号均为可调杆。改一个即换叙事密度与气质。

第八章 适配与降级
≤1500px 主标降 11rem；≤1100px 廊桥/桥二放宽、分屏标题 3.2rem、卡片变窄；≤640px 导航换行可横滑、主标 4.5rem、卡片占 82vw。均不横向溢出。不引任何外部图片/视频/字体，所有场景层一律内联 SVG 程序化生成。prefers-reduced-motion 下关闭视差与揭示动画。

第九章 验收清单
① 首屏焦点是否落在居中巨标题；② 是否只有一个强调色；③ 滚动是否逐段揭示且无跳变；④ 无限滑块是否无缝循环；⑤ 375px 是否零横向溢出；⑥ 是否零外链（场景层全 SVG 生成）。`,
    演示页: "assets/demos/方案-山涧廊桥志.html",
    代码: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>山涧廊桥志</title>
<style>
:root{
  --mx:0; --my:0;
  --back-opacity:1; --back-x:0px; --back-y:0px; --back-scale:0.76;
  --four-y:10vh; --four-scale:0.78;
  --bazaar-y:20vh;
  --blur-px:0px; --back-brightness:1;
  --bazaar-blur-px:0px; --bazaar-brightness:1; --bazaar-saturation:1;
  --shade-opacity:1; --shade-z:2;
  --shade-top-alpha:0; --shade-mid-alpha:0; --shade-bottom-alpha:0;
  --blur-tint:74,181,224;
  --title-y:0px; --title-scale:1; --title-opacity:1;
  --bridge-x:-50%; --bridge-y:0px; --bridge-bottom:5vh;
  --bridge-width:67.2vw; --bridge-scale:1.02;
  --split-left-x:-50%; --split-left-y:0px; --split-left-scale:1;
  --split-right-x:-50%; --split-right-y:0px; --split-right-scale:1;
  --frame2-opacity:0; --frame2-x:-50%; --frame2-y:-50%; --frame2-scale:1.06;
  --intro-copy-y:0px; --intro-copy-opacity:1;
  --panel2-opacity:0; --panel2-y:calc(-50% + 58px);
  --panel3-opacity:0; --panel3-y:calc(-50% + 58px);
  --sights-opacity:0; --sights-controls-opacity:0; --sights-y:0px;
  --sights-enter-x:420vw; --sights-visibility:hidden;
  --sights-shift:0px; --sights-scale:1;
  --sights-top:clamp(112px, 19vh, 220px);
  --sights-screen-top:clamp(112px, 19vh, 220px);
  --bg:#7fb4d4; --paper:#fdf1e1; --ink:#111411; --shadow:rgba(0,0,0,0.32); --accent:#c45a2b;
  --titleSize:14; --parallax:1; --blurMax:14; --cardRadius:24; --heroSize:4.75;
  font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
  color:var(--paper); background:#0b1110; letter-spacing:0;
}
*{box-sizing:border-box} html{min-height:100%;scroll-behavior:smooth;background:#0b1110} body{min-height:100%;margin:0;overflow-x:clip;background:#0b1110} button{border:0;font:inherit} .site-shell{min-height:100vh}

.cinema-scroll{position:relative;height:calc(100vh + 3700px)}
.stage{position:sticky;top:0;height:100vh;min-height:620px;overflow:hidden;isolation:isolate;background:var(--bg)}
.world,.back-stack,.shade,.scene-img,.site-header,.sights-slider,.sights-controls,.hero-title,.intro-copy,.story-panel{position:absolute}
.world{inset:0;overflow:hidden;background:var(--bg)}

.site-header{z-index:10;top:0;left:0;right:0;display:grid;grid-template-columns:minmax(260px,1fr) auto minmax(260px,1fr);align-items:center;gap:32px;padding:32px;color:rgba(253,241,225,0.86);pointer-events:auto}
.site-logo{justify-self:start;font-family:Georgia,serif;font-size:24px;font-weight:500;color:rgba(253,241,225,0.92);text-decoration:none;white-space:nowrap}
.site-nav{flex:1;display:flex;justify-content:center;gap:clamp(24px,2.2vw,44px)}
.site-nav a,.language-switcher{color:rgba(253,241,225,0.86);font-weight:700;line-height:1;text-shadow:0 2px 16px rgba(0,0,0,0.2);text-decoration:none}
.site-nav a{font-size:20px;font-weight:400}
.language-switcher{justify-self:end;display:inline-flex;align-items:center;gap:5px;padding:0;background:transparent;font-size:16px;cursor:pointer}

.scene-img{display:block;user-select:none;-webkit-user-drag:none;will-change:transform,opacity,filter;pointer-events:none}
.sky-img{z-index:0;inset:0;width:100%;height:100%;object-fit:cover;transform:none;filter:blur(var(--blur-px)) brightness(var(--back-brightness))}
.back-stack{z-index:1;top:0;bottom:0;left:-3vw;right:-3vw;opacity:var(--back-opacity);transform:translate3d(var(--back-x),var(--back-y),0) scale(var(--back-scale));transform-origin:50% 100%;will-change:transform,filter,opacity}
.back-img{inset:0;width:100%;height:100%;object-fit:cover;filter:blur(var(--blur-px)) brightness(var(--back-brightness))}
.back-bazaar{z-index:3;opacity:1;bottom:0;left:48%;right:auto;width:112%;height:auto;object-fit:contain;filter:blur(var(--bazaar-blur-px)) brightness(var(--bazaar-brightness)) saturate(var(--bazaar-saturation));transform:translate3d(-50%,var(--bazaar-y),0) scale(0.86)}
.back-four{z-index:1;opacity:0.72;bottom:0;left:48%;right:auto;width:112%;height:auto;object-fit:contain;mix-blend-mode:screen;transform:translate3d(-50%,calc(var(--four-y) - 110px),0) scale(var(--four-scale))}

.sights-slider{z-index:2;left:0;right:0;top:var(--sights-top);padding:0;opacity:1;visibility:var(--sights-visibility);transform:translate3d(var(--sights-enter-x),var(--sights-y),0) scale(var(--sights-scale));transform-origin:0 0;pointer-events:auto;will-change:transform}
.sights-track{display:flex;gap:clamp(16px,1.15vw,24px);align-items:stretch;transform:translate3d(calc(var(--sights-shift) - 18vw),0,0);transition:transform 640ms cubic-bezier(0.22,1,0.36,1);will-change:transform}
.sights-track.is-jumping{transition:none}
.sight-card{position:relative;flex:0 0 clamp(360px,19.4vw,430px);height:220px;padding:24px;overflow:hidden;border:1px solid rgba(253,241,225,0.42);border-radius:var(--cardRadius);color:#000;background:#fdf1e1;box-shadow:0 18px 52px rgba(2,47,64,0.12);cursor:pointer;pointer-events:auto;user-select:none}
.sight-kicker{display:block;margin-bottom:56px;color:#000;font-size:12px;font-weight:500;line-height:1.05;text-transform:uppercase}
.sight-pin{position:absolute;top:24px;right:24px;width:67.2px;height:67.2px;pointer-events:none}
.sight-card h3{position:absolute;left:24px;right:24px;bottom:calc(24px + (16px * 1.16 * 2) + 12px);max-width:calc(100% - 76px);margin:0;color:#000;font-size:24px;font-weight:800;line-height:0.95;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sight-card p{position:absolute;left:24px;right:24px;bottom:24px;max-width:100%;margin:12px 0 0;color:#000;font-size:16px;font-weight:400;line-height:1.16;display:-webkit-box;max-height:calc(2em * 1.16);overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2}

.sights-controls{z-index:5;left:48px;right:auto;top:calc(var(--sights-screen-top) + 220px + 16px);display:flex;justify-content:flex-start;gap:14px;opacity:var(--sights-controls-opacity);transform:translate3d(0,var(--sights-y),0);pointer-events:none;will-change:transform,opacity}
.sights-controls.is-ready{pointer-events:auto}
.sight-nav{width:54px;height:54px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;color:var(--ink);background:rgba(253,241,225,0.94);box-shadow:0 18px 36px rgba(0,0,0,0.2);cursor:pointer}

.hero-title{z-index:3;left:50%;top:clamp(122px,19vh,205px);width:min(94vw,1780px);margin:0;color:var(--paper);font-family:Georgia,serif;font-size:clamp(98px,calc(var(--titleSize)*1vw),180px);font-weight:500;line-height:0.78;text-align:center;text-shadow:none;transform:translate3d(-50%,var(--title-y),0) scale(var(--title-scale));opacity:var(--title-opacity);will-change:transform,opacity}
.bridge-img{z-index:4;left:50%;bottom:var(--bridge-bottom);width:min(var(--bridge-width),2140px);height:auto;transform:translate3d(var(--bridge-x),var(--bridge-y),0) scale(var(--bridge-scale));transform-origin:50% 48%}
.splitframe-img{z-index:6;left:50%;bottom:-2vh;width:min(118vw,2240px);height:auto;pointer-events:none}
.splitframe-left{transform:translate3d(var(--split-left-x),var(--split-left-y),0) scale(var(--split-left-scale));transform-origin:21% 52%}
.splitframe-right{transform:translate3d(var(--split-right-x),var(--split-right-y),0) scale(var(--split-right-scale));transform-origin:79% 52%}
.frame-two-img{z-index:5;left:50%;top:50%;width:min(122vw,2160px);height:auto;filter:none!important;opacity:var(--frame2-opacity);transform:translate3d(var(--frame2-x),var(--frame2-y),0) scale(var(--frame2-scale));transform-origin:50% 48%}

.shade{z-index:var(--shade-z);inset:0;pointer-events:none;opacity:var(--shade-opacity);background:linear-gradient(180deg,rgba(var(--blur-tint),var(--shade-top-alpha)) 0%,rgba(var(--blur-tint),var(--shade-mid-alpha)) 48%,rgba(var(--blur-tint),var(--shade-bottom-alpha)) 100%)}

.intro-copy{z-index:9;left:50%;bottom:clamp(56px,28vh,400px);width:min(560px,calc(100vw - 40px));text-align:center;transform:translate3d(-50%,var(--intro-copy-y),0);opacity:var(--intro-copy-opacity);will-change:transform,opacity}
.intro-copy p{margin:0 auto;max-width:560px;color:var(--paper);font-size:1.18rem;font-weight:500;line-height:1.18;text-shadow:0 2px 18px rgba(0,0,0,0.42)}
.hero-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:26px}
.hero-tags span{min-height:42px;display:inline-flex;align-items:center;padding:0 25px;color:var(--ink);border-radius:999px;background:var(--paper);font-size:0.98rem;font-weight:500;box-shadow:0 12px 30px rgba(0,0,0,0.18)}

.story-panel{z-index:10;left:50%;top:45%;width:min(760px,calc(100vw - 42px));text-align:center;pointer-events:none;transform:translate3d(-50%,-50%,0);will-change:transform,opacity}
.story-panel h2{margin:0;color:var(--paper);font-family:Georgia,serif;font-size:clamp(2.4rem,calc(var(--heroSize)*1vw),4.75rem);font-weight:500;line-height:0.95;text-shadow:0 16px 38px var(--shadow)}
.story-panel p{width:min(520px,100%);margin:26px auto 0;color:var(--paper);font-size:1.14rem;font-weight:500;line-height:1.18;text-shadow:0 2px 18px rgba(0,0,0,0.42)}
.story-panel-bridge{top:60%;opacity:var(--panel2-opacity);transform:translate3d(-50%,var(--panel2-y),0)}
.story-panel-bazaar{top:29%;opacity:var(--panel3-opacity);transform:translate3d(-50%,var(--panel3-y),0)}
.facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:86px;width:min(470px,100%);margin:72px auto 0}
.facts dt{color:var(--paper);font-family:Georgia,serif;font-size:clamp(2.2rem,calc(var(--heroSize)*0.9vw),4.2rem);font-weight:500;line-height:0.9;text-shadow:0 14px 34px var(--shadow)}
.facts dd{margin:18px 0 0;color:var(--paper);font-size:1rem;font-weight:500;line-height:1.14;text-shadow:0 2px 18px rgba(0,0,0,0.42)}
.note-button{min-height:50px;margin-top:28px;display:inline-flex;align-items:center;gap:12px;padding:0 28px;border-radius:999px;color:var(--ink);background:var(--paper);box-shadow:0 16px 34px rgba(0,0,0,0.18);pointer-events:auto;cursor:pointer}
.note-button span:first-child{font-size:1.25rem;line-height:1}

@media(max-width:1500px){.hero-title{font-size:11rem}.story-panel h2{font-size:4.1rem}}
@media(max-width:1100px){
  .hero-title{top:15vh;font-size:7.5rem}
  .bridge-img{width:138vw}
  .frame-two-img{width:132vw}
  .story-panel h2{font-size:3.2rem}
  .facts{gap:34px;margin-top:44px}
  .facts dt{font-size:3.2rem}
  .sight-card{flex-basis:clamp(320px,40vw,390px);min-height:178px}
}
@media(max-width:640px){
  .stage{min-height:640px}
  .site-header{grid-template-columns:1fr auto;gap:18px;padding:24px}
  .site-nav{grid-column:1/-1;grid-row:2;justify-content:flex-start;gap:18px;overflow-x:auto;scrollbar-width:none}
  .site-nav::-webkit-scrollbar{display:none}
  .hero-title{top:16vh;font-size:4.5rem}
  .bridge-img{bottom:2vh;width:190vw}
  .frame-two-img{width:176vw}
  .intro-copy{bottom:42px}
  .intro-copy p,.story-panel p{font-size:1rem}
  .hero-tags{gap:8px}
  .hero-tags span{min-height:38px;padding:0 16px;font-size:0.88rem}
  .story-panel{top:42%}
  .story-panel-bazaar{top:26%}
  .story-panel h2{font-size:2.45rem}
  .facts{gap:18px;margin-top:34px}
  .facts dt{font-size:2.5rem}
  .sights-slider{padding:0}
  .sights-track{gap:12px;transform:translate3d(calc(var(--sights-shift) - 18vw),0,0)}
  .sight-card{flex-basis:min(82vw,330px);height:220px;padding:24px;border-radius:var(--cardRadius)}
  .sights-controls{top:calc(var(--sights-screen-top) + 236px)}
  .sight-card h3{max-width:78%}
  .sight-card p{max-width:100%;margin-top:10px}
  .sight-kicker{margin-bottom:56px}
  .sight-pin{top:24px;right:24px;width:57.6px;height:57.6px}
}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.scene-img,.back-stack,.hero-title,.intro-copy,.story-panel,.sights-track,.sights-slider{transition:none}}
</style>
</head>
<body>
<div class="site-shell">
<main class="cinema-scroll" id="cinema" aria-label="山涧廊桥志 滚动叙事">
<section class="stage">
<div class="world">
  <svg class="scene-img sky-img" preserveAspectRatio="none" viewBox="0 0 1440 810"><rect width="1440" height="810" fill="url(#sky)"/><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8ecae6"/><stop offset="55%" stop-color="#7fb4d4"/><stop offset="100%" stop-color="#5d8f92"/></linearGradient></defs></svg>
  <header class="site-header"><a class="site-logo" href="#cinema">山涧廊桥志</a><nav class="site-nav"><a href="#cinema">序</a><a href="#bridge">廊桥</a><a href="#bazaar">古村</a><a href="#routes">路线</a></nav><button class="language-switcher" aria-label="切换语言"><span>中</span><span aria-hidden="true">⌄</span></button></header>
  <div class="back-stack">
    <svg class="scene-img back-img back-four" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6da3b5" stop-opacity=".7"/><stop offset="100%" stop-color="#3d6b6b" stop-opacity="0"/></linearGradient></defs><path d="M0,350 Q200,250 400,320 T800,280 T1200,350 V600 H0 Z" fill="url(#mg)"/></svg>
    <section class="sights-slider" aria-label="古村看点滑块"><div class="sights-track" id="track"></div></section>
    <svg class="scene-img back-img back-bazaar" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a8a7a" stop-opacity=".85"/><stop offset="100%" stop-color="#1f3d3a" stop-opacity=".9"/></linearGradient></defs><path d="M0,300 Q300,220 600,260 T1200,240 V500 H0 Z" fill="url(#vg)"/><rect x="220" y="230" width="60" height="50" fill="#c9b896" opacity=".7"/><rect x="340" y="245" width="50" height="45" fill="#d4c2a0" opacity=".65"/><rect x="760" y="250" width="70" height="55" fill="#c9b896" opacity=".6"/></svg>
  </div>
  <div class="sights-controls" id="scontrols"><button class="sight-nav sight-prev" aria-label="Previous">←</button><button class="sight-nav sight-next" aria-label="Next">→</button></div>
  <h1 class="hero-title">廊桥</h1>
  <svg class="scene-img bridge-img" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMax meet"><defs><linearGradient id="bstone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b5a58b"/><stop offset="100%" stop-color="#7d6e59"/></linearGradient></defs><path d="M120,420 Q500,180 880,420" fill="none" stroke="url(#bstone)" stroke-width="42"/><rect x="130" y="330" width="45" height="90" fill="#8c7b66"/><rect x="245" y="300" width="40" height="120" fill="#8c7b66"/><rect x="460" y="255" width="38" height="165" fill="#8c7b66"/><rect x="670" y="300" width="42" height="120" fill="#8c7b66"/><rect x="825" y="330" width="45" height="90" fill="#8c7b66"/><path d="M170,320 Q500,120 830,320" fill="none" stroke="#5d4d3f" stroke-width="8"/><path d="M170,285 Q500,90 830,285" fill="none" stroke="#5d4d3f" stroke-width="6" opacity=".7"/></svg>
  <svg class="scene-img splitframe-img splitframe-left" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="sl" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1c3b34"/><stop offset="100%" stop-color="#0b1a17"/></linearGradient></defs><path d="M0,0 H700 L550,600 H0 Z" fill="url(#sl)"/></svg>
  <svg class="scene-img splitframe-img splitframe-right" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="sr" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c3b34"/><stop offset="100%" stop-color="#0b1a17"/></linearGradient></defs><path d="M1200,0 H500 L650,600 H1200 Z" fill="url(#sr)"/></svg>
  <svg class="scene-img frame-two-img" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="river" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4ca3a3" stop-opacity=".9"/><stop offset="100%" stop-color="#1f4a4a" stop-opacity=".95"/></linearGradient></defs><rect width="1200" height="700" fill="#2c5c55"/><path d="M0,400 Q300,320 600,420 T1200,380 V700 H0 Z" fill="url(#river)"/></svg>
  <div class="shade"></div>
  <section class="intro-copy"><p>一道石拱、一湾碧水，和一个被晨雾与灯火养大的古村落。</p><div class="hero-tags"><span>古廊桥</span><span>山涧水</span><span>百年村落</span></div></section>
  <section class="story-panel story-panel-bridge" id="bridge" aria-label="廊桥细节"><h2>这座桥是村子的坐标。</h2><p>廊桥连起山涧两岸，也串起了祠堂、老街与码头，三百年来人、货、消息都从这里过。</p><dl class="facts"><div><dt>1692</dt><dd>最早的廊桥建成</dd></div><div><dt>2011</dt><dd>古村廊桥群列入保护名录</dd></div></dl></section>
  <section class="story-panel story-panel-bazaar" id="bazaar" aria-label="古村细节"><h2>老街把村子抱得很紧。</h2><p>青石巷、木铺板、天井院，还有桥头那盏到深夜才熄的灯笼。</p><button class="note-button"><span aria-hidden="true">↗</span><span>打开古村手记</span></button></section>
</div>
</section>
</main>
</div>

<script>
(function(){
const S={bg:'#7fb4d4',paper:'#fdf1e1',ink:'#111411',accent:'#c45a2b',titleSize:14,parallax:1,blurMax:14,cardRadius:24,heroSize:4.75};
function apply(){Object.keys(S).forEach(k=>{let v=S[k];if(k==='cardRadius'||k==='blurMax')v+='px';document.documentElement.style.setProperty('--'+k, String(v));});}
apply();
addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param'||!(d.key in S))return;S[d.key]=d.value;apply();});

const cards=[
{label:'古桥',title:'通济廊桥',body:'单孔石拱横跨山涧，是进出古村的第一道门面。',icon:'bridge'},
{label:'水岸',title:'溪埠头',body:'旧时洗衣、停船、等渡的石阶，水面倒影最出片。',icon:'water'},
{label:'街巷',title:'老街面馆',body:'一碗手擀面配桥头风景，是村里人最早的早餐记忆。',icon:'street'},
{label:'院落',title:'祠堂天井',body:'四水归堂的格局，把雨水和光线一起收进家族记忆里。',icon:'courtyard'},
{label:'观景点',title:'半山亭',body:'爬十分钟山路，看廊桥像新月一样卧在山坳里。',icon:'view'}
];
const track=document.getElementById('track');
cards.forEach((c,i)=>{
  const art=document.createElement('article');art.className='sight-card';art.tabIndex=0;art.setAttribute('role','button');art.dataset.index=i;
  art.innerHTML='<span class="sight-kicker">'+c.label+'</span><svg class="sight-pin" viewBox="0 0 48 48"><circle cx="24" cy="20" r="10" fill="none" stroke="#000" stroke-width="3"/><path d="M24 30 L24 44" stroke="#000" stroke-width="3"/><circle cx="24" cy="20" r="4" fill="#000"/></svg><h3>'+c.title+'</h3><p>'+c.body+'</p>';
  track.appendChild(art);
});

let original=cards.length, active=original, cloned=[];
function build(){
  track.innerHTML='';cloned=[];
  for(let set=0;set<3;set++){
    cards.forEach((c,i)=>{
      const node=document.querySelectorAll('.sight-card')[i] || cards[i]; // first set already built
    });
  }
}
// simpler: just use existing cards and clone via innerHTML
function setupSlider(){
  const html=track.innerHTML;
  track.innerHTML='';
  for(let s=0;s<3;s++){
    const wrap=document.createElement('div');wrap.innerHTML=html;
    Array.from(wrap.children).forEach((node,idx)=>{node.dataset.sightIndex=s*original+idx;track.appendChild(node);});
  }
  cloned=Array.from(track.children);
  updateSlider();
}

function updateSlider(){
  const w=cloned[0].offsetWidth, gap=parseFloat(getComputedStyle(track).columnGap)||0;
  document.documentElement.style.setProperty('--sights-shift','-'+((w+gap)*active)+'px');
  cloned.forEach((c,idx)=>c.classList.toggle('is-active',idx===active));
}
function move(dir){active+=dir;updateSlider();}
function jump(i){track.classList.add('is-jumping');active=i;updateSlider();requestAnimationFrame(()=>requestAnimationFrame(()=>track.classList.remove('is-jumping')));}
function normalize(){if(active>=original*2)jump(active-original);else if(active<original)jump(active+original);}
function selectCard(card){active=parseInt(card.dataset.sightIndex);updateSlider();}
track.addEventListener('transitionend',normalize);
document.querySelector('.sight-prev').addEventListener('click',()=>move(-1));
document.querySelector('.sight-next').addEventListener('click',()=>move(1));
setupSlider();
cloned.forEach(c=>{c.addEventListener('click',()=>selectCard(c));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')selectCard(c);});});

const section=document.querySelector('.cinema-scroll');
const reduce=matchMedia('(prefers-reduced-motion:reduce)');
let targetX=0,targetY=0,mouseX=0,mouseY=0,targetScroll=0,smoothScroll=0,raf=false,initialized=false;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const smoothstep=(e0,e1,v)=>{const x=clamp((v-e0)/(e1-e0));return x*x*(3-2*x);};
const lerp=(a,b,t)=>a+(b-a)*t;
const seg=(s,a,b,c,d)=>{const enter=smoothstep(a,b,s),exit=smoothstep(c,d,s);return{enter,exit,active:enter*(1-exit)};};
function getScroll(){return clamp(-section.getBoundingClientRect().top,0,section.offsetHeight-innerHeight)}

function update(){
  targetScroll=getScroll();
  if(!initialized||reduce.matches){smoothScroll=targetScroll;initialized=true;}
  else smoothScroll=lerp(smoothScroll,targetScroll,0.14);
  if(Math.abs(smoothScroll-targetScroll)<0.08)smoothScroll=targetScroll;
  mouseX=lerp(mouseX,targetX,0.12);mouseY=lerp(mouseY,targetY,0.12);

  const s=smoothScroll;
  const f2=seg(s,560,900,1300,1620), f3=seg(s,1760,2140,2540,2700);
  const progress=clamp(s/2700);
  const introExit=smoothstep(90,650,s);
  const sightsEnterRaw=smoothstep(2760,3560,s);
  const sightsEnter=Math.pow(sightsEnterRaw,1.55);
  const sightsControlsEnter=smoothstep(3360,3660,s);
  const blurActive=clamp(f2.active+f3.active);
  const frame2Opacity=f2.active*(1-f3.enter);
  const splitDrift=Math.pow(f2.enter,1.5);
  const panel2Opacity=f2.active*(1-f2.exit);
  const panel3Opacity=f3.active*(1-f3.exit);
  const backScale=0.76+progress*0.2+f2.enter*0.18+f3.enter*0.16;
  const sharedHeroY=progress*-74;
  const sharedHeroScale=progress*0.23;
  const sightsScreenTop=Math.min(220,Math.max(112,innerHeight*0.19))-50;
  const sightsParentTop=innerHeight-(innerHeight-sightsScreenTop)/backScale;

  const P=S.parallax;
  const root=document.documentElement;
  root.style.setProperty('--mx',reduce.matches?0:mouseX.toFixed(4));
  root.style.setProperty('--my',reduce.matches?0:mouseY.toFixed(4));
  root.style.setProperty('--back-opacity',1-f2.active*0.06);
  root.style.setProperty('--back-x',(mouseX*-12*P)+'px');
  root.style.setProperty('--back-y',(mouseY*-4*P)+'px');
  root.style.setProperty('--back-scale',backScale);
  root.style.setProperty('--four-y',(10+progress*10)+'vh');
  root.style.setProperty('--four-scale',0.78+progress*0.16);
  root.style.setProperty('--bazaar-y',(20-progress*8)+'vh');
  root.style.setProperty('--blur-px',(blurActive*S.blurMax)+'px');
  root.style.setProperty('--back-brightness',1-blurActive*0.255);
  root.style.setProperty('--bazaar-blur-px',(f2.active*S.blurMax)+'px');
  root.style.setProperty('--bazaar-brightness',1-f2.active*0.255-f3.active*0.06);
  root.style.setProperty('--bazaar-saturation',1+f3.active*0.18);
  root.style.setProperty('--shade-opacity','1');
  root.style.setProperty('--shade-z',f2.active>0.02?'2':'0');
  root.style.setProperty('--shade-top-alpha',blurActive*0.465);
  root.style.setProperty('--shade-mid-alpha',blurActive*0.42);
  root.style.setProperty('--shade-bottom-alpha',blurActive*0.51);
  root.style.setProperty('--title-y',(introExit*-210)+'px');
  root.style.setProperty('--title-scale',1-introExit*0.08);
  root.style.setProperty('--title-opacity',1-introExit);
  root.style.setProperty('--bridge-x','calc(-50% + '+(mouseX*18*P)+'px)');
  root.style.setProperty('--bridge-y',(mouseY*8*P+sharedHeroY-f2.exit*760)+'px');
  root.style.setProperty('--bridge-bottom',(5-f2.enter*13)+'vh');
  root.style.setProperty('--bridge-width',(67.2+f2.enter*37.8)+'vw');
  root.style.setProperty('--bridge-scale',1.02+sharedHeroScale+f2.exit*0.46);
  root.style.setProperty('--split-left-x','calc(-50% + '+(-splitDrift*46)+'vw + '+(mouseX*22*P)+'px)');
  root.style.setProperty('--split-left-y',(mouseY*10*P+sharedHeroY-splitDrift*180)+'px');
  root.style.setProperty('--split-left-scale',1+sharedHeroScale+f2.enter*0.74);
  root.style.setProperty('--split-right-x','calc(-50% + '+(splitDrift*46)+'vw + '+(mouseX*22*P)+'px)');
  root.style.setProperty('--split-right-y',(mouseY*10*P+sharedHeroY-splitDrift*180)+'px');
  root.style.setProperty('--split-right-scale',1+sharedHeroScale+f2.enter*0.74);
  root.style.setProperty('--frame2-opacity',frame2Opacity);
  root.style.setProperty('--frame2-x','calc(-50% + '+(mouseX*10*P)+'px)');
  root.style.setProperty('--frame2-y','calc(-50% + '+(mouseY*8*P-f2.exit*150)+'px)');
  root.style.setProperty('--frame2-scale',1.06+f2.enter*0.08+f2.exit*0.08);
  root.style.setProperty('--intro-copy-y',(introExit*90)+'px');
  root.style.setProperty('--intro-copy-opacity',1-introExit);
  root.style.setProperty('--panel2-opacity',panel2Opacity);
  root.style.setProperty('--panel2-y','calc(-50% + '+(-f2.exit*86+(1-f2.enter)*58)+'px)');
  root.style.setProperty('--panel3-opacity',panel3Opacity);
  root.style.setProperty('--panel3-y','calc(-50% + '+(-f3.exit*86+(1-f3.enter)*58)+'px)');
  root.style.setProperty('--sights-opacity',sightsEnter);
  root.style.setProperty('--sights-controls-opacity',sightsControlsEnter);
  document.getElementById('scontrols').classList.toggle('is-ready',sightsControlsEnter>0.98);
  root.style.setProperty('--sights-visibility',sightsEnter>0.01?'visible':'hidden');
  root.style.setProperty('--sights-y','0px');
  root.style.setProperty('--sights-enter-x',((1-sightsEnter)*420)+'vw');
  root.style.setProperty('--sights-scale',1/backScale);
  root.style.setProperty('--sights-top',sightsParentTop+'px');
  root.style.setProperty('--sights-screen-top',sightsScreenTop+'px');

  if(Math.abs(smoothScroll-targetScroll)>0.08||Math.abs(mouseX-targetX)>0.001||Math.abs(mouseY-targetY)>0.001)requestTick();
}
function requestTick(){if(raf)return;raf=true;requestAnimationFrame(()=>{raf=false;update();});}
window.addEventListener('scroll',requestTick,{passive:true});
window.addEventListener('resize',()=>{requestTick();updateSlider();});
window.addEventListener('pointermove',e=>{targetX=e.clientX/innerWidth-0.5;targetY=e.clientY/innerHeight-0.5;requestTick();},{passive:true});
requestTick();

if(location.search.includes('autoshot')){
  setTimeout(()=>{window.scrollTo({top:1500,behavior:'auto'});requestTick();},800);
}
})();
</script>
</body>
</html>
`,
    片段: `:root{--bg:#7fb4d4;--paper:#fdf1e1;--ink:#111411;--accent:#c45a2b;--titleSize:14;--blurMax:14;--cardRadius:24;--heroSize:4.75}
.cinema-scroll{position:relative;height:calc(100vh + 3700px)}
.stage{position:sticky;top:0;height:100vh;overflow:hidden}
.sight-card{border-radius:var(--cardRadius);background:var(--paper);color:#000}
.hero-title{font-size:clamp(98px,calc(var(--titleSize)*1vw),180px)}`,
    参数: [{"键":"bg","名":"雾蓝天底","类型":"color","默认":"#7fb4d4"},{"键":"paper","名":"米纸前景色","类型":"color","默认":"#fdf1e1"},{"键":"ink","名":"深墨文字","类型":"color","默认":"#111411"},{"键":"accent","名":"赭橙强调","类型":"color","默认":"#c45a2b"},{"键":"titleSize","名":"主标字号(vw)","类型":"number","默认":"14"},{"键":"parallax","名":"视差强度","类型":"number","默认":"1"},{"键":"blurMax","名":"最大模糊(px)","类型":"number","默认":"14"},{"键":"cardRadius","名":"看点卡圆角(px)","类型":"number","默认":"24"},{"键":"heroSize","名":"分屏标题字号(vw)","类型":"number","默认":"4.75"}],
    来源: "机制参考自 motionsites.ai（mostar-guide，2026-09-23 分析）：sticky 电影舞台 + 精确 CSS 变量 + 滚动动画引擎（smoothstep/lerp/segmentInOut）+ 无限滑块（3 套克隆 + 跳接）+ 分屏 choreography；已换题重推为「山涧廊桥志」古村廊桥电影滚动，场景层全改内联 SVG 程序化生成，配色/文案/主题重做，非复刻"
  },


{
  id: "S45",
  风格名: "星野笔记",
  适配端: "通用",
  风格: "暗色",
  场景: "落地页·发布页",
  骨架: "双 iPhone 并列陈列 + 自动缩放舞台 + 动态岛 + 视频就绪入场动画",
  配色: {
    舞台灰: "70%",
    深空黑: "15%",
    暗夜黑: "10%",
    星芒青: "5%"
  },
  布局骨架: "中性舞台水平居中，双机对称陈列，JS 自动缩放 fit viewport；单屏内容纵向居中偏下",
  重色落点: "深空黑屏幕为绝对视觉重心，星芒青仅用于 logo、标题辉光与按钮焦点",
  第一屏内容: "左机品牌标识 + 大标题 + 继续按钮 + 条款；右机 Pro 功能列表 + 定价卡 + 订阅按钮",
  删减元素: "去真实视频 / 去外部字体 / 去 Apple 商标 / 去真实价格货币外的品牌信息",
  适用: "App 发布页 / 双机特性展示 / 移动产品橱窗",
  禁忌: "信息层超过一屏 / 使用真实品牌素材 / 引入外部资源",
  参考站: ["motionsites.ai（place-saver）"],
  我的说明: "把 place-saver 的登录/付费双屏机制保留下来，主题换成天文观测 App；所有视频与字体都用 canvas 动画和系统字体替代，零外链。",
  Agent提示词: "【星野笔记 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威。优先级：本宪法 > 具体需求描述 > 通用审美经验。\n\n1. 视觉主题与氛围\n双机陈列的 App 发布页。中性浅灰舞台托起两台深色 iPhone，屏幕内是沉浸式星空/极光氛围，整体像天文台橱窗——安静、专注、有科技感。密度中等，留足呼吸空间。\n\n2. 色彩板与角色\nstage-bg #F4F4F4 舞台底色 70% / screen1-bg #02040c 左屏深空底 15% / screen2-bg #14151d 右屏暗夜底 10% / ink #ffffff 文字与图标 4% / accent #7ee7ff 星芒强调与发光 1%（仅用于 logo、标题辉光、按钮焦点）。\n\n3. 字体规则\n系统无衬线栈：-apple-system / BlinkMacSystemFont / Segoe UI / PingFang SC / Microsoft YaHei。大标题 66px / 副标题 16.5px / 功能列表 13.5px / 价格 19px / 条款 12px。\n\n4. 组件规范\n主按钮为纯白圆角大按钮，带占位图标；功能列表左侧 22px SVG 线框图标；定价卡片分主/次两格，次卡带弹簧弹出徽章；所有组件引用上方 token。\n\n5. 布局法\n舞台水平居中，双机 gap 70px，JS 自动缩放 fit viewport。每屏内容纵向居中偏下，层级：背景动画 → 品牌标识 → 标题 → 副标题 → 主按钮 → 条款 / 功能列表 → 定价 → 订阅按钮。\n\n6. 深度与层级\n设备框用双层阴影（柔和投影 + 1px 边框）；屏幕内容层 z-index 高于背景 canvas；文字用 text-shadow 做发光层级；定价卡用半透明表面。\n\n7. 该做 / 不该做\n该做：用 canvas 模拟星空/极光动画；用 .ze-ready 类统一 gate 入场动画。不该做：引用任何远程视频/字体/图片；保留原站品牌文案；在单屏堆叠超过 4 个信息层。\n\n8. 响应式行为\n舞台 JS 自动缩放，保证双机完整入框；小屏改为上下堆叠或等比缩放；触控目标 ≥ 44px；prefers-reduced-motion 关闭所有动画。\n\n9. Agent 提示词指南\n配色卡：#F4F4F4 / #02040c / #14151d / #ffffff / #7ee7ff。\n提示词模板：「用纯 HTML/CSS/JS 做一个双 iPhone App 发布页，主题换成 {天文观测/旅行日志/健康管理}，保留自动缩放舞台、Dynamic Island、ready-gated 入场动画、错位揭示、弹簧徽章机制，零外链，用 canvas 生成背景动画。」",
  演示页: "assets/demos/方案-星野笔记.html",
  代码: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>星野笔记 · 双机登场</title>
<style>
:root{
  --stage-bg:#F4F4F4;
  --screen1-bg:#02040c;
  --screen2-bg:#14151d;
  --ink:#ffffff;
  --accent:#7ee7ff;
  --glow:34px;
  --scale:0.95;
  --star-count:120;
  --aurora-speed:1;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden}
body{
  background:var(--stage-bg);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  display:flex;align-items:center;justify-content:center;
}
#stage{
  display:flex;gap:70px;padding:40px;
  transform-origin:center center;
  will-change:transform;
}
.phone{
  width:370px;height:790px;border-radius:48px;
  position:relative;overflow:hidden;
  background:#000;
  box-shadow:0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12);
  flex-shrink:0;
}
.phone.light{background:#F2F2F7}
.notch{
  position:absolute;left:50%;top:11px;transform:translateX(-50%);
  width:126px;height:37px;border-radius:24px;background:#000;z-index:50;
}
.status{
  position:absolute;top:0;left:0;right:0;height:52px;z-index:45;
  display:flex;align-items:center;justify-content:space-between;padding:0 28px;
  pointer-events:none;
}
.status .time{font-size:17px;font-weight:590;color:#fff;letter-spacing:0.2px}
.status .icons{display:flex;align-items:center;gap:5px}
.status svg{vertical-align:middle}
.home{
  position:absolute;left:50%;bottom:8px;transform:translateX(-50%);
  width:139px;height:5px;border-radius:100px;z-index:50;
}
.light .home{background:rgba(0,0,0,0.25)}
.screen{
  position:absolute;inset:0;border-radius:48px;overflow:hidden;
  color:var(--ink);
}
.screen > canvas{
  position:absolute;inset:0;width:100%;height:100%;z-index:0;
}
.overlay{
  position:absolute;inset:0;z-index:1;pointer-events:none;
}
.screen1 .overlay{
  background:linear-gradient(to bottom,
    rgba(2,4,12,0) 0%, rgba(2,4,12,0) 54%,
    rgba(2,4,12,.35) 70%, rgba(2,4,12,.72) 100%);
}
.screen2 .overlay{
  background:linear-gradient(to bottom,
    rgba(20,21,29,0) 0%, rgba(20,21,29,0) 40%,
    rgba(20,21,29,0.55) 55%, rgba(20,21,29,0.92) 66%,
    var(--screen2-bg) 74%, var(--screen2-bg) 100%);
}
.content{position:relative;z-index:4;height:100%;display:flex;flex-direction:column;align-items:center}
.logo{
  margin-top:74px;width:118px;height:118px;
  filter:drop-shadow(0 0 7px rgba(126,231,255,.28));
  opacity:0;transform:translateY(-16px) scale(0.90);
}
.title{
  margin-top:46px;text-align:center;
  font-size:66px;line-height:68px;letter-spacing:0.2px;
  font-weight:300;color:var(--ink);
  text-shadow:0 0 var(--glow) rgba(255,255,255,.22), 0 1px 2px rgba(0,0,0,.35);
  opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px);
}
.title .italic{
  font-style:italic;font-weight:400;
  text-shadow:0 0 10px rgba(255,255,255,.6), 0 0 20px rgba(255,235,190,.5), 0 0 40px rgba(255,210,140,.32);
}
.subtitle{
  margin-top:20px;text-align:center;
  font-size:16.5px;font-weight:400;line-height:26px;
  color:rgba(255,255,255,.52);
  opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px);
}
.btn-apple{
  margin-top:42px;width:306px;height:55px;border-radius:28px;
  background:#fff;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 6px 26px rgba(0,0,0,.28);
  font-size:18px;font-weight:500;color:#1a1a1a;
  -webkit-text-stroke:0.6px #1a1a1a;
  opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px);
}
.terms{
  margin-top:20px;text-align:center;font-size:12px;font-weight:400;
  color:rgba(255,255,255,.42);
  opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px);
}
.terms strong{color:rgba(255,255,255,.82);font-weight:400}
.screen2 .content{align-items:flex-start;padding:0 28px}
.s2-heading{
  margin-top:386px;font-size:26px;line-height:1;font-weight:500;
  letter-spacing:0.2px;color:#fff;
  text-shadow:0 0 18px rgba(120,180,220,0.35);
  opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px);
}
.s2-divider{
  margin-top:12px;width:265px;height:1px;
  background:linear-gradient(to right, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.30) 70%, rgba(255,255,255,0) 100%);
  transform-origin:left;transform:scaleX(0);
}
.feature-list{
  margin-top:10px;width:314px;display:flex;flex-direction:column;gap:8px;
}
.feature-row{
  display:flex;align-items:center;height:24px;gap:4px;
  opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px);
}
.feature-row svg{flex:0 0 22px;width:22px;height:22px}
.feature-row span{font-size:13.5px;font-weight:400;color:#fff;margin-left:4px}
.pricing{
  margin-top:30px;display:flex;gap:10px;width:314px;
}
.card{
  height:123px;border-radius:14px;border:1px solid rgba(255,255,255,0.11);
  padding:14px 14px 15px 15px;display:flex;flex-direction:column;justify-content:space-between;
  position:relative;overflow:hidden;
  opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px);
}
.card.monthly{width:144px;background:linear-gradient(135deg,#2a1f3d 0%,#1a253a 100%)}
.card.yearly{width:160px;background:#1e212a}
.card-label{font-size:13px;font-weight:400;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,0.35)}
.card-price{font-size:19px;font-weight:500;letter-spacing:0.3px;color:#fff;margin-top:6px;text-shadow:0 1px 6px rgba(0,0,0,0.35)}
.card-note{font-size:12px;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,0.35)}
.yearly .card-label,.yearly .card-note{color:rgba(255,255,255,0.50)}
.yearly .card-price{color:rgba(255,255,255,0.62)}
.save-badge{
  position:absolute;left:15px;top:66px;
  display:inline-flex;padding:5px 8px;border-radius:11px;background:#4d5057;
  font-size:10.5px;font-weight:600;color:rgba(255,255,255,0.65);letter-spacing:0.2px;
  opacity:0;transform:translateY(8px) scale(0.78);
}
.btn-sub{
  margin-top:22px;width:314px;height:50px;border-radius:26px;
  background:#fff;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;
  font-size:16px;font-weight:500;color:#0c0c0e;
  -webkit-text-stroke:0.4px #0c0c0e;
  opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px);
}
.btn-sub svg{stroke:#0c0c0e;stroke-width:2}

.ze-ready .logo{animation:zeDrop 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.45s}
.ze-ready .title{animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.62s}
.ze-ready .subtitle{animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.78s}
.ze-ready .btn-apple{animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.94s}
.ze-ready .terms{animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:1.06s}
.ze-ready .s2-heading{animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.58s}
.ze-ready .s2-divider{animation:zeLine 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.72s}
.ze-ready .feature-row:nth-child(1){animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.80s}
.ze-ready .feature-row:nth-child(2){animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.88s}
.ze-ready .feature-row:nth-child(3){animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:0.96s}
.ze-ready .feature-row:nth-child(4){animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:1.04s}
.ze-ready .feature-row:nth-child(5){animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:1.12s}
.ze-ready .card.monthly{animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:1.22s}
.ze-ready .card.yearly{animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:1.30s}
.ze-ready .btn-sub{animation:zeReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;animation-delay:1.42s}
.ze-ready .save-badge{animation:zePop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;animation-delay:1.55s}

@keyframes zeReveal{
  from{opacity:0;transform:translateY(26px) scale(0.985);filter:blur(7px)}
  to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}
}
@keyframes zeDrop{
  from{opacity:0;transform:translateY(-16px) scale(0.90)}
  to{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes zeLine{
  from{transform:scaleX(0)}
  to{transform:scaleX(1)}
}
@keyframes zePop{
  0%{opacity:0;transform:translateY(8px) scale(0.78)}
  70%{transform:translateY(0) scale(1.07)}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@media (prefers-reduced-motion:reduce){
  .logo,.title,.subtitle,.btn-apple,.terms,.s2-heading,.s2-divider,.feature-row,.card,.btn-sub,.save-badge{animation:none!important;opacity:1;transform:none;filter:none}
}
</style>
</head>
<body>
<div id="stage">
  <div class="phone light">
    <div class="notch"></div>
    <div class="status">
      <div class="time">11:11</div>
      <div class="icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><rect x="0" y="8" width="3" height="4" rx="1" fill="#fff"/><rect x="5" y="5" width="3" height="7" rx="1" fill="#fff"/><rect x="10" y="2" width="3" height="10" rx="1" fill="#fff"/><rect x="15" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2c2.5 0 4.5 1.8 5 4.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M8 0c3.5 0 6.5 2.5 7 6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="10" r="1.5" fill="#fff"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="2" y="2" width="18" height="8" rx="2" stroke="#fff" stroke-width="1.2"/><rect x="4" y="4" width="14" height="4" rx="1" fill="#fff"/><path d="M22 4v4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
    </div>
    <div class="screen screen1" id="s1">
      <canvas id="c1"></canvas>
      <div class="overlay"></div>
      <div class="content">
        <svg class="logo" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="54" stroke="var(--accent)" stroke-width="2" opacity="0.35"/>
          <path d="M60 18 L60 102 M18 60 L102 60" stroke="var(--accent)" stroke-width="1.5" opacity="0.25"/>
          <circle cx="60" cy="60" r="8" fill="var(--accent)"/>
          <path d="M60 38c12 0 22 10 22 22s-10 22-22 22" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M60 30c17 0 30 13 30 30s-13 30-30 30" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.6"/>
        </svg>
        <div class="title">记录你头顶的<br><span class="italic">每一片星空</span></div>
        <div class="subtitle">保存、整理与分享<br>你最爱的观星地点</div>
        <button class="btn-apple">
          <svg width="18" height="21" viewBox="0 0 18 21" fill="#1a1a1a"><path d="M14.7 11.2c0-2.6 2.1-3.9 2.2-4-1.2-1.7-3.1-2-3.8-2-1.6 0-3.2 1-4 1-2.1 0-3.6 1.4-4.5 3.2-2 3.4-.5 8.4 1.4 11.2 1 1.4 2.1 3 3.6 3 1.5 0 2-.9 3.8-.9 1.8 0 2.2.9 3.7.9 1.5 0 2.5-1.4 3.5-2.9.9-1.4 1.4-2.7 1.4-2.8-.1-.1-2.7-1-2.7-4.1zm-2.5-7.5c.8-1 1.3-2.3 1.2-3.6-1.1.1-2.5.7-3.3 1.7-.7.9-1.3 2.2-1.1 3.5 1.2.1 2.4-.6 3.2-1.6z"/></svg>
          通过 Apple 继续
        </button>
        <div class="terms">继续即表示你同意 <strong>使用条款</strong></div>
      </div>
    </div>
    <div class="home"></div>
  </div>

  <div class="phone">
    <div class="notch"></div>
    <div class="status">
      <div class="time">11:11</div>
      <div class="icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><rect x="0" y="8" width="3" height="4" rx="1" fill="#fff"/><rect x="5" y="5" width="3" height="7" rx="1" fill="#fff"/><rect x="10" y="2" width="3" height="10" rx="1" fill="#fff"/><rect x="15" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2c2.5 0 4.5 1.8 5 4.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M8 0c3.5 0 6.5 2.5 7 6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="10" r="1.5" fill="#fff"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="2" y="2" width="18" height="8" rx="2" stroke="#fff" stroke-width="1.2"/><rect x="4" y="4" width="14" height="4" rx="1" fill="#fff"/><path d="M22 4v4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
    </div>
    <div class="screen screen2" id="s2">
      <canvas id="c2"></canvas>
      <div class="overlay"></div>
      <div class="content">
        <div class="s2-heading">解锁 Pro：</div>
        <div class="s2-divider"></div>
        <div class="feature-list">
          <div class="feature-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/></svg>
            <span>创建私人星图集</span>
          </div>
          <div class="feature-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></svg>
            <span>从相册导入观测照片</span>
          </div>
          <div class="feature-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.988-8-13.083-8-5.096 0-5.096 8 0 8 5.095 0 7.988-8 13.083-8z"/></svg>
            <span>无限观测清单</span>
          </div>
          <div class="feature-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M12 3c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5Z"/></svg>
            <span>AI 星体识别</span>
          </div>
          <div class="feature-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><circle cx="8.5" cy="8" r="3"/><path d="M4 17c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5"/><circle cx="16.5" cy="8" r="2.5"/><path d="M13.5 17c0-2 1.6-3.8 3.5-3.8s3.5 1.8 3.5 3.8"/></svg>
            <span>与好友共建观星地图</span>
          </div>
        </div>
        <div class="pricing">
          <div class="card monthly">
            <div class="card-label">按月</div>
            <div class="card-price">¥20</div>
            <div class="card-note">每月结算</div>
          </div>
          <div class="card yearly">
            <div class="card-label">按年</div>
            <div class="card-price">¥200</div>
            <div class="card-note">每年结算</div>
            <div class="save-badge">省 ¥40</div>
          </div>
        </div>
        <button class="btn-sub">订阅 <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M1.5 1.5 7 7.5 1.5 13.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </div>
    <div class="home"></div>
  </div>
</div>
<script>
const state={
  stageBg:'#F4F4F4',
  screen1Bg:'#02040c',
  screen2Bg:'#14151d',
  ink:'#ffffff',
  accent:'#7ee7ff',
  glow:34,
  scale:0.95,
  starCount:120,
  auroraSpeed:1
};
function apply(){
  const r=document.documentElement;
  r.style.setProperty('--stage-bg',state.stageBg);
  r.style.setProperty('--screen1-bg',state.screen1Bg);
  r.style.setProperty('--screen2-bg',state.screen2Bg);
  r.style.setProperty('--ink',state.ink);
  r.style.setProperty('--accent',state.accent);
  r.style.setProperty('--glow',state.glow+'px');
  r.style.setProperty('--scale',state.scale);
  r.style.setProperty('--star-count',state.starCount);
  r.style.setProperty('--aurora-speed',state.auroraSpeed);
  initStars();
}
function fit(){
  const stage=document.getElementById('stage');
  const vw=window.innerWidth-80,vh=window.innerHeight-80;
  const sw=370*2+70,sh=790;
  const ratio=Math.min(vw/sw,vh/sh,1)*state.scale;
  stage.style.transform='scale('+ratio+')';
}

// Screen 1: starfield canvas (replaces video)
const c1=document.getElementById('c1');
const x1=c1.getContext('2d');
let stars=[],W,H;
function resize1(){W=c1.width=c1.offsetWidth;H=c1.height=c1.offsetHeight;initStars();}
function initStars(){
  stars=[];
  const n=Math.max(30,Math.min(400,state.starCount));
  for(let i=0;i<n;i++){
    stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+0.3,a:Math.random(),s:Math.random()*0.02+0.005});
  }
}
let t=0;
function draw1(){
  x1.fillStyle=state.screen1Bg;x1.fillRect(0,0,W,H);
  // nebula glow center-bottom
  const g=x1.createRadialGradient(W/2,H*0.85,0,W/2,H*0.85,W*0.8);
  g.addColorStop(0,'rgba(126,231,255,0.18)');
  g.addColorStop(0.5,'rgba(80,100,180,0.08)');
  g.addColorStop(1,'rgba(2,4,12,0)');
  x1.fillStyle=g;x1.fillRect(0,0,W,H);
  for(const s of stars){
    s.a+=s.s;if(s.a>1)s.a=0;
    const alpha=s.a<0.5?s.a*2:(1-s.a)*2;
    x1.beginPath();
    x1.arc(s.x,s.y,s.r,0,Math.PI*2);
    x1.fillStyle='rgba(255,255,255,'+(alpha*0.8)+')';
    x1.fill();
  }
  // occasional shooting star
  if((t|0)%200===0 && Math.random()>0.3){
    const sx=Math.random()*W*0.5+W*0.25,sy=Math.random()*H*0.3;
    x1.beginPath();x1.moveTo(sx,sy);x1.lineTo(sx+40,sy+10);
    x1.strokeStyle='rgba(255,255,255,0.35)';x1.lineWidth=1;x1.stroke();
  }
  t+=0.5;requestAnimationFrame(draw1);
}

// Screen 2: aurora canvas (replaces video)
const c2=document.getElementById('c2');
const x2=c2.getContext('2d');
let W2,H2;
function resize2(){W2=c2.width=c2.offsetWidth;H2=c2.height=c2.offsetHeight;}
let at=0;
function draw2(){
  x2.fillStyle=state.screen2Bg;x2.fillRect(0,0,W2,H2);
  const bands=3;
  const speed=state.auroraSpeed;
  for(let i=0;i<bands;i++){
    x2.beginPath();
    const baseY=H2*(0.15+i*0.08);
    for(let x=0;x<=W2;x+=10){
      const y=baseY+Math.sin(x*0.01+at*0.02*speed+i*1.5)*30+Math.sin(x*0.03-at*0.03*speed)*15;
      if(x===0)x2.moveTo(x,y);else x2.lineTo(x,y);
    }
    x2.lineTo(W2,H2);x2.lineTo(0,H2);x2.closePath();
    const grad=x2.createLinearGradient(0,baseY-40,0,H2);
    grad.addColorStop(0,'rgba(126,231,255,'+(0.12-i*0.03)+')');
    grad.addColorStop(1,'rgba(20,21,29,0)');
    x2.fillStyle=grad;x2.fill();
  }
  at++;requestAnimationFrame(draw2);
}

window.addEventListener('resize',()=>{resize1();resize2();fit();});
resize1();resize2();fit();draw1();draw2();

// ready gate: simulated video loadeddata + font timeout
let ready=false;
function setReady(){if(ready)return;ready=true;document.body.classList.add('ze-ready');}
setTimeout(setReady,1500);

window.addEventListener('message',e=>{
  const d=e.data;
  if(!d||d.type!=='param'||!(d.key in state))return;
  state[d.key]=d.value;apply();fit();
});
</script>
</body>
</html>
`,
  片段: ":root{--stage-bg:#F4F4F4;--screen1-bg:#02040c;--screen2-bg:#14151d;--ink:#ffffff;--accent:#7ee7ff;--glow:34px;--scale:0.95;--star-count:120;--aurora-speed:1}\n.phone{width:370px;height:790px;border-radius:48px;overflow:hidden;background:#000}\n.notch{position:absolute;left:50%;top:11px;transform:translateX(-50%);width:126px;height:37px;border-radius:24px;background:#000;z-index:50}\n.ze-ready .title{animation:zeReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards}",
  参数: [{
      键: "stageBg",
      名: "舞台底色",
      类型: "color",
      默认: "#F4F4F4"
    }, {
      键: "screen1Bg",
      名: "左屏深空底",
      类型: "color",
      默认: "#02040c"
    }, {
      键: "screen2Bg",
      名: "右屏暗夜底",
      类型: "color",
      默认: "#14151d"
    }, {
      键: "ink",
      名: "文字色",
      类型: "color",
      默认: "#ffffff"
    }, {
      键: "accent",
      名: "星芒强调",
      类型: "color",
      默认: "#7ee7ff"
    }, {
      键: "glow",
      名: "标题发光(px)",
      类型: "number",
      默认: "34"
    }, {
      键: "scale",
      名: "舞台缩放系数",
      类型: "number",
      默认: "0.95"
    }, {
      键: "starCount",
      名: "星空粒子数",
      类型: "number",
      默认: "120"
    }, {
      键: "auroraSpeed",
      名: "极光速度",
      类型: "number",
      默认: "1"
    }],
  来源: "机制参考自 motionsites.ai（place-saver，2026-09-23 分析）：双 iOS 设备框架 / 自动缩放舞台 / Dynamic Island / 视频就绪入场动画 / 错位揭示 / 弹簧弹出徽章；已换题重推为「星野笔记」天文观测 app 发布页，视频/字体/图片全部 canvas/SVG 离线化，配色/文案/主题重做，非复刻"
},
{
  id: "S46",
  风格名: "极光监测站",
  适配端: "PC 端",
  风格: "暗色",
  场景: "官网·品牌站",
  骨架: "双栏数据墙 + 打字机标题 + 滚动触发数字计数 + SVG Logo 遮罩动画",
  配色: {
    夜黑: "75%",
    纯白: "15%",
    极光绿: "9%",
    灰辅助: "1%"
  },
  布局骨架: "左栏文字 + 数据网格，右栏大比例 Logo 形状遮罩动画；大屏双栏，小屏堆叠",
  重色落点: "夜黑底托住所有内容，极光绿仅用于遮罩动画与数字微强调",
  第一屏内容: "打字机主标题 + 说明段落 + 5 项大数字统计",
  删减元素: "去 React / Tailwind / Vite / Google Fonts / 远程视频 / 真实业务数据",
  适用: "数据型品牌落地页 / SaaS 统计区 / 科技项目展示",
  禁忌: "移动端首屏硬塞双栏 / 使用真实品牌素材 / 引入外部资源",
  参考站: ["motionsites.ai（arceage-stats）"],
  我的说明: "把 arceage-stats 的统计区机制保留下来，主题换成极光监测数据站；React/Tailwind/Vite/Google Fonts/远程视频全部替换为纯静态 HTML/CSS/JS 与系统字体。",
  Agent提示词: "【极光监测站 · 设计语言宪法】\n效力声明：本文件为本方案的唯一设计权威。优先级：本宪法 > 具体需求描述 > 通用审美经验。\n\n1. 视觉主题与氛围\n深色数据品牌落地页。像极地监测站的控制台——冷静、数据驱动、有科技杂志感。左右分栏：左栏是打字机标题与 5 项大数字，右栏是 Logo 形状遮罩的极光动画。\n\n2. 色彩板与角色\nbg #000000 夜黑底 75% / ink #ffffff 纯白文字 15% / accent #a3e635 极光绿 9% / muted rgba(255,255,255,0.40) 辅助文字 1%。\n\n3. 字体规则\n系统无衬线用于 UI 文字；衬线斜体（Georgia / Songti SC / SimSun）用于标题中的强调短语。H2 clamp(1.5rem,4vw,3.5rem) / 数字 56px / 小标签 10px 大写 tracking-wider。\n\n4. 组件规范\n数字统计区为 2 列网格；标签 uppercase tracking-wider；Logo 遮罩容器用 CSS mask-image + canvas 动画；无按钮（纯展示）。\n\n5. 布局法\n双栏 flex，大屏 gap 160px，小屏堆叠。左栏 max-width 约束，右栏占据剩余空间并右对齐。内容垂直居中对齐。\n\n6. 深度与层级\n黑色底为最底层；数字与文字在表面层；遮罩动画带轻微 scale 放大；辅助文字用 40% 透明度后退。\n\n7. 该做 / 不该做\n该做：用 IntersectionObserver 触发计数与打字机；纯静态 HTML/CSS/JS，零构建链。不该做：引入 React/Tailwind/Vite/Google Fonts/远程视频；保留原站农业数据文案。\n\n8. 响应式行为\n1024px 以下双栏堆叠，字号用 clamp 流体缩放，统计网格保持 2 列，遮罩容器 max-width 500px。触控目标 ≥ 44px。\n\n9. Agent 提示词指南\n配色卡：#000000 / #ffffff / #a3e635 / rgba(255,255,255,0.40)。\n提示词模板：「用纯 HTML/CSS/JS 实现一个深色双栏数据区，主题 {极光监测/城市噪声/古籍数字化}，左栏打字机标题 + 5 个滚动数字，右栏 SVG Logo 遮罩 + canvas 极光动画，零外链，系统字体。」",
  演示页: "assets/demos/方案-极光监测站.html",
  代码: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>极光监测站 · 数据幕布</title>
<style>
:root{
  --bg:#000000;
  --ink:#ffffff;
  --accent:#a3e635;
  --muted:rgba(255,255,255,0.40);
  --counter-duration:1.5;
  --mask-scale:1.2;
  --gap:160px;
  --radius:12px;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center}
section{width:100%;padding:64px 24px}
@media(min-width:768px){section{padding:96px 48px}}
@media(min-width:1024px){section{padding:96px 120px}}
.wrap{width:100%;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;gap:64px}
@media(min-width:1024px){.wrap{flex-direction:row;gap:var(--gap);align-items:stretch}}
.left{flex:1;display:flex;flex-direction:column;justify-content:flex-start}
.right{flex:1;display:flex;justify-content:center;align-items:center;min-height:360px}
@media(min-width:1024px){.right{justify-content:flex-end}}
h2{font-size:clamp(1.5rem,4vw,3.5rem);font-weight:500;letter-spacing:-0.02em;line-height:1.1;margin-bottom:24px;width:590px;max-width:100%}
h2 .serif{font-family:Georgia,"Songti SC","SimSun",serif;font-style:italic;font-weight:400}
.subtitle{font-size:clamp(1rem,1.2vw,1.125rem);line-height:1.7;font-weight:300;color:var(--muted);max-width:520px;margin-bottom:64px}
.grid{display:grid;grid-template-columns:repeat(2,max-content);gap:32px 64px}
@media(min-width:768px){.grid{gap:32px 96px}}
.stat{display:flex;flex-direction:column}
.stat .num{font-family:Georgia,"Songti SC","SimSun",serif;font-size:clamp(2.25rem,4vw,3.5rem);letter-spacing:-0.02em;margin-bottom:12px}
.stat .label{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em}
.mask-box{position:relative;width:100%;max-width:500px;aspect-ratio:1/1;transform:scale(var(--mask-scale));-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;mask-size:contain;mask-repeat:no-repeat;mask-position:center;overflow:hidden;border-radius:var(--radius)}
.mask-box canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.char{display:inline-block;opacity:0;transform:translateY(4px);transition:opacity 0.04s,transform 0.04s}
.char.revealed{opacity:1;transform:translateY(0)}
</style>
</head>
<body>
<section id="stats">
  <div class="wrap">
    <div class="left">
      <h2 id="h2"></h2>
      <p class="subtitle" id="sub"></p>
      <div class="grid">
        <div class="stat"><span class="num" data-target="500" data-suffix="K+">0</span><span class="label">年度观测点</span></div>
        <div class="stat"><span class="num" data-target="99.8" data-suffix="%" data-decimals="1">0</span><span class="label">预报准确率</span></div>
        <div class="stat"><span class="num" data-target="50" data-suffix="+">0</span><span class="label">部署监测站</span></div>
        <div class="stat"><span class="num" data-target="15" data-suffix="+">0</span><span class="label">覆盖波段</span></div>
        <div class="stat"><span class="num" data-target="24" data-suffix="/7">0</span><span class="label">季节在线率</span></div>
      </div>
    </div>
    <div class="right">
      <div class="mask-box" id="maskBox">
        <canvas id="c1"></canvas>
      </div>
    </div>
  </div>
</section>
<script>
const state={
  bg:'#000000',
  ink:'#ffffff',
  accent:'#a3e635',
  muted:'rgba(255,255,255,0.40)',
  counterDuration:1.5,
  maskScale:1.2,
  gap:'160px',
  radius:12
};
function apply(){
  const r=document.documentElement;
  r.style.setProperty('--bg',state.bg);
  r.style.setProperty('--ink',state.ink);
  r.style.setProperty('--accent',state.accent);
  r.style.setProperty('--muted',state.muted);
  r.style.setProperty('--counter-duration',state.counterDuration);
  r.style.setProperty('--mask-scale',state.maskScale);
  r.style.setProperty('--gap',state.gap);
  r.style.setProperty('--radius',state.radius+'px');
}
apply();

// Typewriter: reveal chars one by one
function typewrite(el,html,delay=0,speed=18){
  el.innerHTML='';
  const tokens=[];
  let i=0;
  while(i<html.length){
    if(html[i]==='<'){
      const end=html.indexOf('>',i);
      tokens.push({type:'tag',val:html.slice(i,end+1)});
      i=end+1;
    }else{
      let j=i;
      while(j<html.length && html[j]!=='<')j++;
      tokens.push({type:'text',val:html.slice(i,j)});
      i=j;
    }
  }
  const chars=[];
  tokens.forEach(tok=>{
    if(tok.type==='tag'){el.insertAdjacentHTML('beforeend',tok.val);}
    else{
      const span=document.createElement('span');
      for(let k=0;k<tok.val.length;k++){
        const c=document.createElement('span');
        c.className='char';c.textContent=tok.val[k];
        span.appendChild(c);chars.push(c);
      }
      el.appendChild(span);
    }
  });
  setTimeout(()=>{
    chars.forEach((c,n)=>setTimeout(()=>c.classList.add('revealed'),n*speed));
  },delay*1000);
}

typewrite(document.getElementById('h2'),'守望极光<br><span class="serif">预见每一次爆发</span>',0,14);
typewrite(document.getElementById('sub'),'十余年来，极地观测网络依赖现代传感器阵列与专业团队，为全球研究者提供高完整度的极光数据，降低预报盲区。',0.1,10);

// Animated counters
const nums=document.querySelectorAll('.num');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(!en.isIntersecting)return;
    const el=en.target;
    observer.unobserve(el);
    const target=parseFloat(el.dataset.target);
    const suffix=el.dataset.suffix||'';
    const decimals=parseInt(el.dataset.decimals||'0');
    const dur=(state.counterDuration||1.5)*1000;
    const start=performance.now();
    function step(now){
      const p=Math.min(1,(now-start)/dur);
      const ease=1-Math.pow(1-p,3);
      const val=(target*ease).toFixed(decimals);
      el.textContent=val+suffix;
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
},{threshold:0.2});
nums.forEach(n=>observer.observe(n));

// Masked canvas aurora (replaces video)
const maskSvg="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='m53.54,45.42c2.19-3.79,7.67-3.79,9.86,0l4.54,7.87c1.17,2.02,1.17,4.51,0,6.54l-8.15,13.81c-1.68,2.91.42,6.55,3.78,6.55h17.81c3.45,0,5.61-3.74,3.89-6.73l-28.76-49.81c-2.95-5.12-10.34-5.12-13.29,0l-28.46,49.3c-1.86,3.22.46,7.24,4.18,7.24h10.23c2.55,0,4.91-1.36,6.19-3.57l18.18-31.19Z'/%3E%3C/svg%3E";
const box=document.getElementById('maskBox');
box.style.webkitMaskImage='url("'+maskSvg+'")';
box.style.maskImage='url("'+maskSvg+'")';
const c=document.getElementById('c1');
const x=c.getContext('2d');
let W,H;
function resize(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;}
window.addEventListener('resize',resize);resize();
let t=0;
function draw(){
  x.fillStyle=state.bg;x.fillRect(0,0,W,H);
  // aurora bands inside the mask
  for(let i=0;i<4;i++){
    const grad=x.createLinearGradient(0,H*0.2,0,H*0.9);
    grad.addColorStop(0,'rgba(163,230,53,0)');
    grad.addColorStop(0.5,'rgba(163,230,53,'+(0.18-i*0.03)+')');
    grad.addColorStop(1,'rgba(163,230,53,0)');
    x.fillStyle=grad;
    x.beginPath();
    const baseY=H*(0.3+i*0.12);
    for(let px=0;px<=W;px+=8){
      const y=baseY+Math.sin(px*0.015+t*0.02+i*1.2)*H*0.08+Math.sin(px*0.04-t*0.015)*H*0.04;
      if(px===0)x.moveTo(px,y);else x.lineTo(px,y);
    }
    x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fill();
  }
  // subtle stars
  x.fillStyle='#fff';
  for(let i=0;i<30;i++){
    const sx=(Math.sin(i*12.3+t*0.005)*0.5+0.5)*W;
    const sy=(Math.cos(i*7.1+t*0.003)*0.5+0.5)*H;
    const alpha=(Math.sin(i+t*0.02)+1)/2*0.6;
    x.globalAlpha=alpha;
    x.beginPath();x.arc(sx,sy,1.2,0,Math.PI*2);x.fill();
  }
  x.globalAlpha=1;
  t++;requestAnimationFrame(draw);
}
draw();

window.addEventListener('message',e=>{
  const d=e.data;
  if(!d||d.type!=='param'||!(d.key in state))return;
  state[d.key]=d.value;apply();
});
</script>
</body>
</html>
`,
  片段: ":root{--bg:#000000;--ink:#ffffff;--accent:#a3e635;--muted:rgba(255,255,255,0.40);--counter-duration:1.5;--mask-scale:1.2;--gap:160px;--radius:12px}\nsection{padding:96px 120px;background:var(--bg);color:var(--ink)}\n.wrap{display:flex;gap:var(--gap);max-width:1440px;margin:0 auto}\n.grid{display:grid;grid-template-columns:repeat(2,max-content);gap:32px 96px}\n.mask-box{aspect-ratio:1/1;-webkit-mask-size:contain;mask-size:contain}",
  参数: [{
      键: "bg",
      名: "夜黑底",
      类型: "color",
      默认: "#000000"
    }, {
      键: "ink",
      名: "纯白文字",
      类型: "color",
      默认: "#ffffff"
    }, {
      键: "accent",
      名: "极光绿",
      类型: "color",
      默认: "#a3e635"
    }, {
      键: "muted",
      名: "辅助文字",
      类型: "color",
      默认: "rgba(255,255,255,0.40)"
    }, {
      键: "counterDuration",
      名: "计数动画时长(s)",
      类型: "number",
      默认: "1.5"
    }, {
      键: "maskScale",
      名: "遮罩放大系数",
      类型: "number",
      默认: "1.2"
    }, {
      键: "gap",
      名: "双栏间距(px)",
      类型: "string",
      默认: "160px"
    }, {
      键: "radius",
      名: "遮罩容器圆角(px)",
      类型: "number",
      默认: "12"
    }],
  来源: "机制参考自 motionsites.ai（arceage-stats，2026-09-23 分析）：双栏统计区 + 打字机逐字揭示 + 滚动触发数字计数 + SVG logo 遮罩视频；已换题重推为「极光监测站」数据品牌站，字体/视频全部系统栈/canvas 离线化，配色/文案/主题重做，非复刻"
}
];
