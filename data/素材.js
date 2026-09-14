// Web 灵感弹药库 · 素材数据（v4，2026-08-26）
// 数据存储决策：放项目内部，用 JS 文件而不是数据库——
//   ① file:// 直接双击 index.html 就能读（fetch JSON 会被浏览器 CORS 拦）
//   ② 零依赖，符合"10 月前不引依赖"的规矩
//   ③ 阶段 0 不需要后端；等接单流水线 / 多人协作 / 要历史版本时，再迁 SQLite 或后端
// 分类（v5，2026-09-07 全量重打标；2026-09-10 新增 AI反馈）：文字动画 / 动效 / 组件 / 背景 / 布局骨架 / AI反馈（AI Agent 执行反馈示意，非网页动效，配示意 demo）
// 风格 9 类：极简 / 科技 / 暗色 / 国风 / 轻盈 / 品牌 / 叙事仪式 / 信息型 / 通用
// 场景 10 类：全站通用 / 落地页·发布页 / 官网·品牌站 / 工具·SaaS / 内容·阅读 / 电商·预订 / 后台·数据看板 / 作品集·叙事 / 移动端 / 通用模块区
// 元素 6 组：视觉 / 动效 / 构成 / 反馈 / 3D·粒子 / 布局
// 标题命名参考个人学习工作台：两个字、直接说人话（粒子文字、细雨、翻页动画…）。
// 调参：详情页按「参数」数组生成滑杆/开关，通过 postMessage 控制演示文件。
// 每条格式：标题 / 分类 / 标签 / 来源 / 效果演示 / 参数 / 效果说明 / 用法 / 提示词 / 代码 / 复用记录。

window.WEB_ARSENAL = [
  {
    id: "w001",
    标题: "粒子文字",
    分类: "文字动画",
    子类: "逐字入场",
    风格: ["国风"],
    场景: ["落地页·发布页", "作品集·叙事"],
    元素: ["视觉", "动效"],
    搭配: [
      "文字遮罩"
    ],
    标签: [
      "粒子",
      "标题"
    ],
    来源: "自建：个人学习工作台（从 ReactBits 移植思路，未引 React；2026-08 入库）",
    效果演示: "assets/demos/粒子文字.html",
    参数: [
      {
        键: "text",
        名: "文字内容",
        类型: "string",
        默认: "墨点聚字"
      },
      {
        键: "density",
        名: "粒子密度（采样间隔，越小越密）",
        类型: "slider",
        最小: 3,
        最大: 14,
        步长: 1,
        默认: 7
      },
      {
        键: "size",
        名: "粒子大小（px）",
        类型: "slider",
        最小: 1,
        最大: 5,
        步长: 0.1,
        默认: 2.2
      },
      {
        键: "repel",
        名: "排斥半径（px）",
        类型: "slider",
        最小: 30,
        最大: 200,
        步长: 5,
        默认: 90
      },
      {
        键: "speed",
        名: "回归速度",
        类型: "slider",
        最小: 1,
        最大: 10,
        步长: 0.5,
        默认: 5.5
      },
      {
        键: "color",
        名: "粒子颜色",
        类型: "color",
        默认: "#181612"
      },
      {
        键: "accent",
        名: "点缀色（少量高亮粒子）",
        类型: "color",
        默认: "#3d5fd6"
      },
      {
        键: "bg",
        名: "背景颜色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "highlight",
        名: "是否有点缀色粒子",
        类型: "switch",
        默认: true
      }
    ],
    效果说明: "构图笔记：用逐字 / 逐行的揭示节奏引导阅读视线，文字本身就是视觉主角，留白与位移决定情绪的轻重。\n字是由很多小墨点聚成的，鼠标划过去墨点会散开，不动时轻轻飘动。很适合当网站标题。\n能怎么改：拖滑杆调「文字内容、粒子密度（采样间隔，越小越密）、粒子大小（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "在详情页拖滑杆：粒子多少、粒子大小、推开距离、高亮蓝点。想换字就改演示里的「墨点聚字」。",
    提示词: "帮我做一个\"粒子聚字\"文字效果（纯 HTML/CSS/JS）：\n\n效果：文字由全屏散落的墨点聚集而成，鼠标划过粒子散开，静止后缓慢漂移。\n\n用法示例：\n<canvas id=\"c\"></canvas>\n<script>\n  const state = { density: 7, size: 2.2, repel: 90, highlight: true };\n</script>\n\n关键参数：\n- text 文字内容 / density 粒子密度 / size 粒子大小 / repel 排斥半径 / speed 回归速度 / color 粒子颜色 / accent 点缀色 / bg 背景颜色 / highlight 是否有点缀色粒子\n\n集成步骤：\n1. 复制 assets/demos/粒子文字.html 的 JS 和容器结构\n2. 换文字（代码里的\"墨点聚字\"）\n3. 换颜色适配主题",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>粒子文字演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: #ffffff; overflow: hidden; }\n  canvas { display: block; width: 100%; height: 100%; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<script>\n  // 默认参数（父页面详情页可通过消息实时调）\n  const state = {\n    text: \"墨点聚字\", density: 7, size: 2.2, repel: 90, speed: 5.5,\n    color: \"#181612\", accent: \"#3d5fd6\", bg: \"#ffffff\", highlight: true\n  };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, particles = [];\n  const pointer = { x: -9999, y: -9999 };\n  // 把 #rrggbb 转成 rgba() 字符串\n  const rgba = (hex, a) => {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16) + \",\" + ((n >> 8) & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  };\n\n  // 把文字画到离屏画布，按间隔采样出粒子目标点\n  function sample(text) {\n    const off = document.createElement(\"canvas\");\n    const octx = off.getContext(\"2d\");\n    const fs = Math.min(W, H) * 0.17;\n    octx.font = \"900 \" + fs + \"px 'Microsoft YaHei', sans-serif\";\n    const tw = octx.measureText(text).width;\n    off.width = Math.ceil(tw) + 40;\n    off.height = Math.ceil(fs * 1.8);\n    octx.font = \"900 \" + fs + \"px 'Microsoft YaHei', sans-serif\";\n    octx.textBaseline = \"middle\";\n    octx.fillStyle = \"#000\";\n    octx.fillText(text, 20, off.height / 2);\n    const data = octx.getImageData(0, 0, off.width, off.height).data;\n    const pts = [];\n    for (let y = 0; y < off.height; y += state.density) {\n      for (let x = 0; x < off.width; x += state.density) {\n        if (data[(y * off.width + x) * 4 + 3] > 128) {\n          pts.push({ x: x - off.width / 2, y: y - off.height / 2 });\n        }\n      }\n    }\n    return pts;\n  }\n\n  function init() {\n    W = canvas.width = innerWidth;\n    H = canvas.height = innerHeight;\n    document.body.style.background = state.bg;\n    const pts = sample(state.text);\n    particles = pts.map(p => ({\n      x: Math.random() * W,\n      y: Math.random() * H,\n      tx: W / 2 + p.x,\n      ty: H / 2 + p.y,\n      blue: state.highlight && Math.random() < 0.06,\n      drift: Math.random() * Math.PI * 2\n    }));\n  }\n\n  function frame() {\n    ctx.clearRect(0, 0, W, H);\n    const k = state.speed / 100; // 回归速度（0-10 映射到 0-0.1）\n    for (const p of particles) {\n      const dx = p.x - pointer.x;\n      const dy = p.y - pointer.y;\n      const d2 = dx * dx + dy * dy;\n      if (d2 < state.repel * state.repel) {\n        const d = Math.sqrt(d2) || 1;\n        p.x += (dx / d) * 3.2;\n        p.y += (dy / d) * 3.2;\n      }\n      p.x += (p.tx - p.x) * k;\n      p.y += (p.ty - p.y) * k;\n      p.drift += 0.008;\n      const gx = p.tx + Math.sin(p.drift) * 1.4;\n      const gy = p.ty + Math.cos(p.drift * 0.7) * 1.4;\n      p.x += (gx - p.x) * 0.03;\n      p.y += (gy - p.y) * 0.03;\n      ctx.beginPath();\n      ctx.arc(p.x, p.y, state.size, 0, Math.PI * 2);\n      ctx.fillStyle = p.blue ? rgba(state.accent, .85) : rgba(state.color, .8);\n      ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n\n  // 参数变了就重新采样粒子，让效果立即更新\n  function apply() {\n    init();\n  }\n\n  canvas.addEventListener(\"mousemove\", e => { pointer.x = e.clientX; pointer.y = e.clientY; });\n  canvas.addEventListener(\"mouseleave\", () => { pointer.x = -9999; pointer.y = -9999; });\n  canvas.addEventListener(\"touchmove\", e => {\n    pointer.x = e.touches[0].clientX;\n    pointer.y = e.touches[0].clientY;\n  }, { passive: true });\n  window.addEventListener(\"resize\", () => init());\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n\n  init();\n  requestAnimationFrame(frame);\n<\\/script>\n</body>\n</html>\n",
    复用记录: "学习工作台全站页面标题（已用）"
  },
  {
    id: "w002",
    标题: "细雨",
    分类: "背景",
    子类: "粒子",
    风格: ["国风"],
    场景: ["落地页·发布页"],
    元素: ["动效"],
    搭配: [
      "粒子文字"
    ],
    标签: [
      "氛围"
    ],
    来源: "自建：个人学习工作台（2026-08 入库）",
    效果演示: "assets/demos/细雨意境.html",
    参数: [
      {
        键: "rain",
        名: "雨量（密度倍数）",
        类型: "slider",
        最小: 0.2,
        最大: 3,
        步长: 0.1,
        默认: 1
      },
      {
        键: "speed",
        名: "下落速度",
        类型: "slider",
        最小: 1,
        最大: 20,
        步长: 0.5,
        默认: 7
      },
      {
        键: "wind",
        名: "风偏移（左右横漂）",
        类型: "slider",
        最小: -10,
        最大: 10,
        步长: 0.5,
        默认: 0
      },
      {
        键: "len",
        名: "雨丝长度（倍数）",
        类型: "slider",
        最小: 0.3,
        最大: 3,
        步长: 0.1,
        默认: 1
      },
      {
        键: "width",
        名: "雨丝粗细（px）",
        类型: "slider",
        最小: 0.5,
        最大: 4,
        步长: 0.1,
        默认: 1.5
      },
      {
        键: "opacity",
        名: "雨丝透明度",
        类型: "slider",
        最小: 0.05,
        最大: 1,
        步长: 0.05,
        默认: 0.5
      },
      {
        键: "color",
        名: "雨的颜色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "bg",
        名: "背景颜色",
        类型: "color",
        默认: "#17171c"
      }
    ],
    效果说明: "构图笔记：用色块、粒子或光影铺底制造氛围层次，关键是让主体内容始终清晰可读，背景只做衬托不做主角。\n细密的雨丝在背景里落，自动避开中间的内容，鼠标划过去能把雨拨开。给页面加氛围用。\n能怎么改：拖滑杆调「雨量（密度倍数）、下落速度、风偏移（左右横漂）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调雨量和下落速度；避让区域在代码里改 CARD 那 4 个数；窗口变窄会自动不画雨，省性能。",
    提示词: "帮我做一个\"细雨\"全屏背景（纯 HTML/CSS/JS）：\n\n效果：细密雨丝斜落，自动避开内容区域；鼠标划过把雨拨开；窄屏自动不渲染省性能。\n\n用法示例：\n<canvas id=\"rain\"></canvas>\n<script>\n  const state = { rain: 1, speed: 7 };\n  const CARD = { x, y, w, h }; // 内容避让矩形\n</script>\n\n关键参数：\n- rain 雨量 / speed 下落速度 / wind 风偏移 / len 雨丝长度 / width 雨丝粗细 / opacity 雨丝透明度 / color 雨的颜色 / bg 背景颜色\n\n集成步骤：\n1. 复制 assets/demos/细雨意境.html 的 JS\n2. 把避让矩形改成你内容区的实际位置\n3. 想换雪/花瓣/星尘，改粒子的画法即可",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>细雨演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: #17171c; overflow: hidden; }\n  #rain { position: fixed; inset: 0; display: block; }\n  .card {\n    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);\n    width: min(380px, 80vw); padding: 60px 24px; text-align: center;\n    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);\n    border-radius: 16px; backdrop-filter: blur(6px);\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: rgba(255,255,255,.85);\n    font-size: 20px; font-weight: 700; letter-spacing: 2px;\n  }\n</style>\n</head>\n<body>\n<canvas id=\"rain\"></canvas>\n<div class=\"card\">内容区<br><span style=\"font-size:13px;font-weight:400;color:rgba(255,255,255,.6)\">雨会避开这里</span></div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    rain: 1, speed: 7, wind: 0, len: 1, width: 1.5,\n    opacity: 0.5, color: \"#ffffff\", bg: \"#17171c\"\n  };\n  const canvas = document.getElementById(\"rain\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, DROPS = [];\n  const pointer = { x: -9999, y: -9999 };\n  const CARD = { x: 0, y: 0, w: 0, h: 0 };\n  // 降级条件：只在触摸设备上不画雨（省电），桌面端不管窗口多窄都画——\n  // 因为演示常被嵌在 iframe 里（宽度小于屏幕），按宽度判断会把雨全禁掉\n  const isTouch = window.matchMedia && window.matchMedia(\"(hover: none)\").matches;\n  // hex → rgba 字符串\n  const rgba = (hex, a) => {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16) + \",\" + ((n >> 8) & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  };\n\n  function makeDrop(randomY) {\n    return {\n      x: Math.random() * W,\n      y: randomY ? Math.random() * H : -20,\n      len: (12 + Math.random() * 18) * state.len, // 雨丝长度按参数缩放\n      v: 5 + Math.random() * 6,\n      bend: 0\n    };\n  }\n\n  function rebuild() {\n    // 保底 24 根：iframe 缩略图很小，按面积算会只剩几根，看不清\n    const n = Math.round(Math.max(24, W * H / 6000 * state.rain));\n    DROPS = Array.from({ length: n }, () => makeDrop(true));\n  }\n\n  function resize() {\n    W = canvas.width = innerWidth;\n    H = canvas.height = innerHeight;\n    // 避让区按视口比例缩放（iframe 缩略图很小，固定 400x280 会盖住整个视口）\n    CARD.w = Math.min(420, W * 0.76);\n    CARD.h = Math.min(280, H * 0.6);\n    CARD.x = W / 2 - CARD.w / 2;\n    CARD.y = H / 2 - CARD.h / 2;\n    rebuild();\n  }\n\n  function frame() {\n    if (!isTouch) {\n      ctx.clearRect(0, 0, W, H);\n      ctx.strokeStyle = rgba(state.color, state.opacity); // 雨色 + 透明度实时读 state\n      ctx.lineWidth = state.width;\n      for (const d of DROPS) {\n        d.y += d.v * state.speed / 7;\n        d.x += state.wind * 0.3; // 风偏移：每帧横向漂移\n        d.bend *= 0.92;\n        const dx = d.x - pointer.x, dy = d.y - pointer.y;\n        const d2 = dx * dx + dy * dy;\n        if (d2 < 10000) {\n          const dist = Math.sqrt(d2) || 1;\n          d.bend += (dx / dist) * 1.5;\n        }\n        if (d.y > H + 20) Object.assign(d, makeDrop(false));\n        if (d.x > W + 30) d.x = -20;\n        if (d.x < -30) d.x = W + 20;\n        if (d.x > CARD.x && d.x < CARD.x + CARD.w && d.y > CARD.y && d.y < CARD.y + CARD.h) continue;\n        ctx.beginPath();\n        ctx.moveTo(d.x + d.bend, d.y - d.len);\n        ctx.lineTo(d.x, d.y);\n        ctx.stroke();\n      }\n    }\n    requestAnimationFrame(frame);\n  }\n\n  // 参数变了：雨量/雨长重新生成，其余每帧直接读 state\n  function apply() {\n    document.body.style.background = state.bg;\n    rebuild();\n  }\n\n  canvas.addEventListener(\"mousemove\", e => { pointer.x = e.clientX; pointer.y = e.clientY; });\n  canvas.addEventListener(\"mouseleave\", () => { pointer.x = -9999; pointer.y = -9999; });\n  canvas.addEventListener(\"touchmove\", e => {\n    pointer.x = e.touches[0].clientX;\n    pointer.y = e.touches[0].clientY;\n  }, { passive: true });\n  window.addEventListener(\"resize\", () => resize());\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n\n  resize();\n  requestAnimationFrame(frame);\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "w003",
    标题: "翻页动画",
    分类: "动效",
    子类: "转场",
    风格: ["极简"],
    场景: ["全站通用"],
    元素: ["动效"],
    搭配: [
      "数字滚动"
    ],
    标签: [
      "过渡"
    ],
    来源: "自建：个人学习工作台（2026-08 入库）",
    效果演示: "assets/demos/页面切换过渡.html",
    参数: [
      {
        键: "leave",
        名: "离场时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 1.2,
        步长: 0.02,
        默认: 0.32
      },
      {
        键: "enter",
        名: "进场时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 1.5,
        步长: 0.05,
        默认: 0.5
      },
      {
        键: "dist",
        名: "滑动距离（px）",
        类型: "slider",
        最小: 0,
        最大: 160,
        步长: 4,
        默认: 36
      },
      {
        键: "ease",
        名: "缓动曲线",
        类型: "select",
        选项: [
          "ease-out",
          "ease-in",
          "ease-in-out",
          "linear",
          "cubic-bezier(.16,1,.3,1)"
        ],
        默认: "ease-out"
      },
      {
        键: "dir",
        名: "翻页方向",
        类型: "select",
        选项: [
          "left",
          "right"
        ],
        默认: "left"
      },
      {
        键: "colorA",
        名: "页面 A 底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "colorB",
        名: "页面 B 底色",
        类型: "color",
        默认: "#f6f4ee"
      },
      {
        键: "textColor",
        名: "文字颜色",
        类型: "color",
        默认: "#1b1b1b"
      },
      {
        键: "accent",
        名: "按钮悬停底色",
        类型: "color",
        默认: "#1b1b1b"
      },
      {
        键: "radius",
        名: "按钮圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 30,
        步长: 1,
        默认: 10
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n从一个页面切到另一个时，旧页面先滑走、新页面再滑进来，不会突然「啪」地换页。\n能怎么改：拖滑杆调「离场时长（秒）、进场时长（秒）、滑动距离（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调离开和进来的时长；想改滑动方向，把动画里的 -36px / 36px 换掉。",
    提示词: "帮我做一个页面切换过渡动画（纯 HTML/CSS/JS）：\n\n效果：切换页面时，当前页先滑走（离场），新页再滑进来（入场）。\n\n用法示例：\n.page.leave { animation: pageLeave var(--leave-dur, .32s) ease-in forwards; }\n.page.enter { animation: pageEnter var(--enter-dur, .5s) ease-out forwards; }\n\n关键参数：\n- leave 离场时长 / enter 进场时长 / dist 滑动距离 / ease 缓动曲线 / dir 翻页方向 / colorA 页面 A 底色 / colorB 页面 B 底色 / textColor 文字颜色 / accent 按钮悬停底色 / radius 按钮圆角\n- 位移方向：离场 -36px，入场 +36px（在 keyframes 里改）\n\n集成步骤：\n1. 复制 assets/demos/页面切换过渡.html 的 keyframes 和切换 JS\n2. 套到你的路由切换逻辑上\n3. 想更有质感可叠加模糊或缩放",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>翻页动画演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: #fff; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; }\n  .page {\n    position: absolute; inset: 0; display: flex; flex-direction: column;\n    align-items: center; justify-content: center; gap: 20px;\n    background: var(--page-a, #fff);\n  }\n  .page.b { background: var(--page-b, #f6f4ee); }\n  .page h1 { font-size: 32px; font-weight: 800; color: var(--text-c, #1b1b1b); }\n  .page button {\n    border: 1.5px solid var(--text-c, #1b1b1b); background: transparent; color: var(--text-c, #1b1b1b);\n    padding: 10px 24px; border-radius: var(--btn-r, 10px); cursor: pointer; font-size: 14px;\n    transition: background .15s ease, color .15s ease;\n  }\n  .page button:hover { background: var(--accent, #1b1b1b); color: #fff; }\n  /* 位移量与方向用 CSS 变量，参数变化即时生效 */\n  .page.leave { animation: pageLeave var(--leave-dur, .32s) var(--ease, ease-in) forwards; }\n  .page.enter { animation: pageEnter var(--enter-dur, .5s) var(--ease, ease-out) forwards; }\n  @keyframes pageLeave {\n    from { opacity: 1; transform: translateX(0); }\n    to   { opacity: 0; transform: translateX(var(--out-x, -36px)); }\n  }\n  @keyframes pageEnter {\n    from { opacity: 0; transform: translateX(var(--in-x, 36px)); }\n    to   { opacity: 1; transform: translateX(0); }\n  }\n</style>\n</head>\n<body>\n<section class=\"page a\" id=\"pa\">\n  <h1>页面 A</h1>\n  <button id=\"goB\">切到页面 B →</button>\n</section>\n<section class=\"page b\" id=\"pb\" style=\"display:none\">\n  <h1>页面 B</h1>\n  <button id=\"goA\">← 切回页面 A</button>\n</section>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    leave: 0.32, enter: 0.5, dist: 36, ease: \"ease-out\", dir: \"left\",\n    colorA: \"#ffffff\", colorB: \"#f6f4ee\", textColor: \"#1b1b1b\", accent: \"#1b1b1b\", radius: 10\n  };\n\n  // 参数变了：改 CSS 变量，时长/距离/方向/颜色实时变\n  function apply() {\n    const s = document.documentElement.style;\n    s.setProperty(\"--leave-dur\", state.leave + \"s\");\n    s.setProperty(\"--enter-dur\", state.enter + \"s\");\n    s.setProperty(\"--ease\", state.ease);\n    // 方向：left = 旧页往左出、新页从右进；right 反过来\n    const d = state.dir === \"right\" ? 1 : -1;\n    s.setProperty(\"--out-x\", state.dist * d + \"px\");\n    s.setProperty(\"--in-x\", -state.dist * d + \"px\");\n    s.setProperty(\"--page-a\", state.colorA);\n    s.setProperty(\"--page-b\", state.colorB);\n    s.setProperty(\"--text-c\", state.textColor);\n    s.setProperty(\"--accent\", state.accent);\n    s.setProperty(\"--btn-r\", state.radius + \"px\");\n  }\n\n  function switchTo(from, to) {\n    if (from.dataset.busy) return;\n    from.dataset.busy = \"1\";\n    from.classList.add(\"leave\");\n    const dur = state.leave * 1000;\n    setTimeout(() => {\n      from.style.display = \"none\";\n      from.classList.remove(\"leave\");\n      delete from.dataset.busy;\n      to.style.display = \"\";\n      to.classList.add(\"enter\");\n      setTimeout(() => to.classList.remove(\"enter\"), state.enter * 1000 + 100);\n    }, dur);\n  }\n\n  document.getElementById(\"goB\").addEventListener(\"click\", () => switchTo(pa, pb));\n  document.getElementById(\"goA\").addEventListener(\"click\", () => switchTo(pb, pa));\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "w004",
    标题: "墨渍按钮",
    分类: "组件",
    子类: "按钮",
    风格: ["国风"],
    场景: ["落地页·发布页", "作品集·叙事"],
    元素: ["视觉", "动效"],
    搭配: [
      "水波按钮"
    ],
    标签: [
      "按钮",
      "点击反馈",
      "水墨"
    ],
    来源: "自建：个人学习工作台（2026-08 入库）",
    效果演示: "assets/demos/墨渍揭示按钮.html",
    参数: [
      {
        键: "ink",
        名: "墨渍颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "textColor",
        名: "变色后文字色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "btnBg",
        名: "按钮初始底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "ripple",
        名: "涟漪时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 1.5,
        步长: 0.05,
        默认: 0.6
      },
      {
        键: "stain",
        名: "墨渍扩散时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 1.5,
        步长: 0.05,
        默认: 0.55
      },
      {
        键: "spread",
        名: "扩散倍数",
        类型: "slider",
        最小: 20,
        最大: 120,
        步长: 5,
        默认: 55
      },
      {
        键: "delay",
        名: "墨渍延迟（毫秒）",
        类型: "slider",
        最小: 0,
        最大: 500,
        步长: 20,
        默认: 120
      },
      {
        键: "reset",
        名: "自动复原（秒）",
        类型: "slider",
        最小: 0.5,
        最大: 5,
        步长: 0.1,
        默认: 1.6
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 14
      },
      {
        键: "text",
        名: "按钮文字",
        类型: "string",
        默认: "点击展开墨渍"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n点按钮先出一圈波纹，然后墨渍从中间扩散把按钮染黑、字变白，过一会儿自己恢复。\n能怎么改：拖滑杆调「墨渍颜色、变色后文字色、按钮初始底色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调波纹时长、墨渍时长、复原等待；换颜色就把 CSS 里的 #1b1b1b 换成你的主色。",
    提示词: "帮我做一个\"墨渍揭示\"按钮（纯 HTML/CSS/JS，水墨风）：\n\n效果：点击时先出现涟漪扩散，再从中心墨渍放大覆盖按钮，按钮变为墨底白字，随后自动复原。\n\n用法示例：\n<button class=\"btn\" id=\"btn\">点击展开墨渍</button>\n// 点击时：.ripple 波纹 + .stain 墨渍，过一会自动复原\n\n关键参数：\n- ink 墨渍颜色 / textColor 变色后文字色 / btnBg 按钮初始底色 / bg 页面背景色 / ripple 涟漪时长 / stain 墨渍扩散时长 / spread 扩散倍数 / delay 墨渍延迟 / reset 自动复原 / radius 圆角 / text 按钮文字\n\n集成步骤：\n1. 复制 assets/demos/墨渍揭示按钮.html 的 CSS 和 JS\n2. 套到你的主按钮上\n3. 换颜色适配主题",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>墨渍按钮演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .btn {\n    position: relative; overflow: hidden; cursor: pointer; min-width: 250px;\n    background: var(--btn-bg, #fff); color: var(--ink, #1a1a1a); border: 2px solid var(--ink, #1a1a1a);\n    font-size: 17px; font-weight: 700; letter-spacing: 3px;\n    padding: 18px 48px; border-radius: var(--btn-r, 14px); user-select: none;\n    transition: color .25s ease, background .25s ease;\n  }\n  .btn.inked { background: var(--ink, #1a1a1a); color: var(--after-c, #fff); }\n  /* 点击涟漪：从点下去的位置扩散 */\n  .ripple {\n    position: absolute; border-radius: 50%;\n    background: color-mix(in srgb, var(--ink, #1a1a1a) 25%, transparent);\n    transform: scale(0); pointer-events: none;\n  }\n  .ripple.go { animation: inkRipple var(--ripple-dur, .6s) ease-out forwards; }\n  @keyframes inkRipple { to { transform: scale(1); opacity: 0; } }\n  /* 墨渍：两个错位的墨团同时放大，边缘更自然 */\n  .stain, .stain2 {\n    position: absolute; border-radius: 50%; background: var(--ink, #1a1a1a);\n    transform: scale(0); pointer-events: none;\n  }\n  .stain { left: 50%; top: 50%; width: 16px; height: 16px; margin: -8px 0 0 -8px; }\n  .stain2 { left: 63%; top: 36%; width: 10px; height: 10px; margin: -5px 0 0 -5px; }\n  .stain.go { animation: inkStainReveal var(--stain-dur, .55s) ease-out forwards; }\n  .stain2.go { animation: inkStainReveal2 var(--stain-dur, .55s) ease-out .04s forwards; }\n  /* 扩散倍数用 CSS 变量，改了立刻生效 */\n  @keyframes inkStainReveal { to { transform: scale(var(--spread, 55)); } }\n  @keyframes inkStainReveal2 { to { transform: scale(calc(var(--spread, 55) * .73)); } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">点击展开墨渍</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    ripple: 0.6, stain: 0.55, reset: 1.6, ink: \"#1a1a1a\", spread: 55,\n    textColor: \"#ffffff\", btnBg: \"#ffffff\", bg: \"#ffffff\", radius: 14,\n    delay: 120, text: \"点击展开墨渍\"\n  };\n  const btn = document.getElementById(\"btn\");\n  let locked = false;\n\n  function apply() {\n    const s = document.documentElement.style;\n    s.setProperty(\"--ripple-dur\", state.ripple + \"s\");\n    s.setProperty(\"--stain-dur\", state.stain + \"s\");\n    s.setProperty(\"--spread\", state.spread);\n    s.setProperty(\"--ink\", state.ink);\n    s.setProperty(\"--after-c\", state.textColor);\n    s.setProperty(\"--btn-bg\", state.btnBg);\n    s.setProperty(\"--btn-r\", state.radius + \"px\");\n    s.setProperty(\"--page-bg\", state.bg);\n    // 静止状态下换文案\n    if (!locked) btn.textContent = state.text;\n  }\n\n  btn.addEventListener(\"click\", (e) => {\n    if (locked) return;\n    locked = true;\n    const rect = btn.getBoundingClientRect();\n    const r = Math.max(rect.width, rect.height) * 1.2;\n    const rip = document.createElement(\"span\");\n    rip.className = \"ripple\";\n    rip.style.width = rip.style.height = r + \"px\";\n    rip.style.left = (e.clientX - rect.left - r / 2) + \"px\";\n    rip.style.top = (e.clientY - rect.top - r / 2) + \"px\";\n    btn.appendChild(rip);\n    rip.classList.add(\"go\");\n    setTimeout(() => {\n      const s1 = document.createElement(\"span\");\n      s1.className = \"stain\";\n      const s2 = document.createElement(\"span\");\n      s2.className = \"stain2\";\n      btn.append(s1, s2);\n      s1.classList.add(\"go\");\n      s2.classList.add(\"go\");\n      btn.classList.add(\"inked\");\n      btn.textContent = \"已揭示 ✓\";\n    }, state.delay);\n    setTimeout(() => {\n      btn.classList.remove(\"inked\");\n      btn.textContent = state.text;\n      btn.querySelectorAll(\".ripple, .stain, .stain2\").forEach(n => n.remove());\n      locked = false;\n    }, state.reset * 1000);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "w005",
    标题: "悬停反馈",
    分类: "动效",
    子类: "悬停",
    风格: ["极简"],
    场景: ["全站通用"],
    元素: ["动效"],
    搭配: [
      "产品卡悬停"
    ],
    标签: [
      "鼠标悬停",
      "微交互"
    ],
    来源: "自建：个人学习工作台（2026-08 入库）",
    效果演示: "assets/demos/hover微交互.html",
    参数: [
      {
        键: "dur",
        名: "反应时长（秒）",
        类型: "slider",
        最小: 0.05,
        最大: 0.8,
        步长: 0.01,
        默认: 0.15
      },
      {
        键: "lift",
        名: "抬升距离（px）",
        类型: "slider",
        最小: 0,
        最大: 12,
        步长: 0.5,
        默认: 2
      },
      {
        键: "scale",
        名: "放大倍数",
        类型: "slider",
        最小: 1,
        最大: 1.2,
        步长: 0.01,
        默认: 1
      },
      {
        键: "shadow",
        名: "阴影强度（%）",
        类型: "slider",
        最小: 0,
        最大: 60,
        步长: 2,
        默认: 18
      },
      {
        键: "accent",
        名: "强调色（主按钮）",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "pillBg",
        名: "导航条底色",
        类型: "color",
        默认: "#f2f0eb"
      },
      {
        键: "pillHover",
        名: "导航悬停底色",
        类型: "color",
        默认: "#d9d5cc"
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n导航按钮鼠标移上去变深色、主按钮浮起来，而且反应快慢完全一样——全站统一手感，点哪儿都一个感觉。\n能怎么改：拖滑杆调「反应时长（秒）、抬升距离（px）、放大倍数」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖「反应速度」一个滑杆，所有按钮一起变快变慢；演示页就两组按钮，鼠标移上去就能看到。",
    提示词: "帮我搭一套统一的鼠标悬停反馈（纯 HTML/CSS/JS）：\n\n效果：所有按钮鼠标移上去都有反馈，而且过渡时长完全一样（一个变量控制全部）。\n\n用法示例：\n// 所有控件共用同一个过渡时长变量 = 一套手感\n.pills a { transition: background var(--dur, .15s) ease, color var(--dur, .15s) ease; }\n.cta { transition: transform var(--dur, .15s) ease, box-shadow var(--dur, .15s) ease; }\n\n关键参数：\n- dur 反应时长 / lift 抬升距离 / scale 放大倍数 / shadow 阴影强度 / accent 强调色 / pillBg 导航条底色 / pillHover 导航悬停底色 / bg 页面背景色\n\n集成步骤：\n1. 复制 assets/demos/hover微交互.html 的 CSS\n2. 给全站可点击元素套同一套过渡\n3. 换主题只改变量",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>悬停反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column;\n    align-items: center; justify-content: center; gap: 28px;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n    padding: 0 20px;\n  }\n  .note { font-size: 15px; color: #555; text-align: center; line-height: 1.8; }\n  .note b { color: var(--accent, #1a1a1a); }\n  /* 导航按钮：鼠标移上去背景变深 */\n  .pills { display: flex; gap: 6px; background: var(--pill-bg, #f2f0eb); padding: 6px; border-radius: 999px; }\n  .pills a {\n    text-decoration: none; color: #555; font-size: 14px; padding: 9px 20px;\n    border-radius: 999px; cursor: pointer;\n    transition: background var(--dur, .15s) ease, color var(--dur, .15s) ease;\n  }\n  .pills a:hover { background: var(--pill-hover, #d9d5cc); color: var(--accent, #1a1a1a); }\n  /* 主按钮：鼠标移上去浮起来 + 阴影变深 */\n  .cta {\n    font-size: 15px; font-weight: 700; padding: 14px 38px; border-radius: 12px;\n    border: none; cursor: pointer; background: var(--accent, #1a1a1a); color: #fff;\n    transition: transform var(--dur, .15s) ease, box-shadow var(--dur, .15s) ease;\n  }\n  .cta:hover {\n    transform: translateY(calc(-1 * var(--lift, 2px))) scale(var(--scale, 1));\n    box-shadow: 0 8px 20px color-mix(in srgb, var(--accent, #1a1a1a) var(--shadow, 18%), transparent);\n  }\n  .tip { font-size: 12.5px; color: #8a8a85; text-align: center; }\n</style>\n</head>\n<body>\n  <p class=\"note\">鼠标移到下面的按钮上看看——<br><b>所有按钮的反应快慢完全一样</b></p>\n  <nav class=\"pills\"><a>首页</a><a>题库</a><a>统计</a><a>设置</a></nav>\n  <button class=\"cta\">开始刷题</button>\n  <p class=\"tip\">导航按钮：变深色。主按钮：浮起来。同一个速度，全站统一（详情页可调）</p>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      dur: 0.15, lift: 2, scale: 1, shadow: 18,\n      accent: \"#1a1a1a\", pillBg: \"#f2f0eb\", pillHover: \"#d9d5cc\", bg: \"#ffffff\"\n    };\n\n    // 一个滑杆控制所有按钮 = 统一手感；其余参数走 CSS 变量实时生效\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--dur\", state.dur + \"s\");\n      s.setProperty(\"--lift\", state.lift + \"px\");\n      s.setProperty(\"--scale\", state.scale);\n      s.setProperty(\"--shadow\", state.shadow + \"%\");\n      s.setProperty(\"--accent\", state.accent);\n      s.setProperty(\"--pill-bg\", state.pillBg);\n      s.setProperty(\"--pill-hover\", state.pillHover);\n      s.setProperty(\"--page-bg\", state.bg);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "w006",
    标题: "3D 背景",
    分类: "背景",
    子类: "3D",
    风格: ["科技"],
    场景: ["官网·品牌站"],
    元素: ["动效"],
    搭配: [
      "粒子文字"
    ],
    标签: [
      "3D",
      "氛围"
    ],
    来源: "自建：个人学习工作台（演示版为自写降级版，完整版 three.js + GLB 未入库；2026-08 入库）",
    效果演示: "assets/demos/3D背景.html",
    参数: [
      {
        键: "count",
        名: "粒子数量",
        类型: "slider",
        最小: 60,
        最大: 800,
        步长: 20,
        默认: 260
      },
      {
        键: "speed",
        名: "旋转速度",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 0.5,
        默认: 4
      },
      {
        键: "fov",
        名: "透视强度（视场角度）",
        类型: "slider",
        最小: 30,
        最大: 110,
        步长: 5,
        默认: 60
      },
      {
        键: "size",
        名: "粒子大小（px）",
        类型: "slider",
        最小: 1,
        最大: 10,
        步长: 0.5,
        默认: 3.5
      },
      {
        键: "alpha",
        名: "粒子透明度",
        类型: "slider",
        最小: 0.1,
        最大: 1,
        步长: 0.05,
        默认: 0.9
      },
      {
        键: "color",
        名: "主色",
        类型: "color",
        默认: "#735cd9"
      },
      {
        键: "color2",
        名: "副色（混入白色端）",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "bg",
        名: "背景颜色",
        类型: "color",
        默认: "#101014"
      },
      {
        键: "glow",
        名: "是否发光（叠加混合）",
        类型: "switch",
        默认: false
      }
    ],
    效果说明: "构图笔记：用色块、粒子或光影铺底制造氛围层次，关键是让主体内容始终清晰可读，背景只做衬托不做主角。\n一个由亮点组成的 3D 球在背景里慢慢转，鼠标动视角也跟着动。给页面加「高级感」氛围用。\n能怎么改：拖滑杆调「粒子数量、旋转速度、透视强度（视场角度）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调粒子多少、转多快；演示是零依赖简化版，正式做可以用 three.js 加载 3D 模型（注意别太大）。",
    提示词: "帮我做一个 3D 粒子球背景（原生 WebGL，零依赖；正式版可用 three.js）：\n\n效果：亮点组成 3D 球体缓慢自转，鼠标移动控制视角，作为页面氛围背景。\n\n用法示例：\n<canvas id=\"c\"></canvas>\n<script>\n  const state = { count: 260, speed: 4 };\n</script>\n\n关键参数：\n- count 粒子数量 / speed 旋转速度 / fov 透视强度 / size 粒子大小 / alpha 粒子透明度 / color 主色 / color2 副色 / bg 背景颜色 / glow 是否发光\n\n集成步骤：\n1. 复制 assets/demos/3D背景.html 的 WebGL 代码\n2. 想加载 3D 模型就换 three.js（注意体积和手机端降级）\n3. 手机端降级为静态图",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>3D 背景演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: #101014; overflow: hidden; }\n  canvas { display: block; width: 100%; height: 100%; }\n  .fallback {\n    position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;\n    color: #8b8992; font-size: 14px; text-align: center; padding: 0 20px;\n  }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<div class=\"fallback\" id=\"fb\" hidden>当前浏览器不支持 WebGL，换 Chrome / Edge 打开看 3D 效果</div>\n<script>\n  const canvas = document.getElementById(\"c\");\n  const gl = canvas.getContext(\"webgl\", { antialias: true, alpha: false });\n  if (!gl) {\n    document.getElementById(\"fb\").hidden = false;\n    throw new Error(\"WebGL 不可用\");\n  }\n\n  // 默认参数（父页面详情页可调）\n  const state = {\n    count: 260, speed: 4, fov: 60, size: 3.5, alpha: 0.9,\n    color: \"#735cd9\", color2: \"#ffffff\", bg: \"#101014\", glow: false\n  };\n  // hex → [r,g,b]（0-1）\n  const rgb = hex => {\n    const n = parseInt(hex.slice(1), 16);\n    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];\n  };\n\n  const vs = `\n    attribute vec3 aPos;\n    attribute float aMix;\n    varying float vMix;\n    uniform mat4 uMVP;\n    uniform float uDpr;\n    uniform float uSize;\n    void main() {\n      vMix = aMix;\n      gl_PointSize = uSize * uDpr;\n      gl_Position = uMVP * vec4(aPos, 1.0);\n    }`;\n  const fs = `\n    precision mediump float;\n    varying float vMix;\n    uniform vec3 uColor;\n    uniform vec3 uColor2;\n    uniform float uAlpha;\n    void main() {\n      vec2 d = gl_PointCoord - vec2(0.5);\n      if (dot(d, d) > 0.25) discard;\n      gl_FragColor = vec4(mix(uColor, uColor2, vMix), uAlpha);\n    }`;\n\n  function compile(type, src) {\n    const sh = gl.createShader(type);\n    gl.shaderSource(sh, src);\n    gl.compileShader(sh);\n    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));\n    return sh;\n  }\n  const prog = gl.createProgram();\n  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));\n  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));\n  gl.linkProgram(prog);\n  gl.useProgram(prog);\n\n  const uMVP = gl.getUniformLocation(prog, \"uMVP\");\n  const uDpr = gl.getUniformLocation(prog, \"uDpr\");\n  const uSize = gl.getUniformLocation(prog, \"uSize\");\n  const uColor = gl.getUniformLocation(prog, \"uColor\");\n  const uColor2 = gl.getUniformLocation(prog, \"uColor2\");\n  const uAlpha = gl.getUniformLocation(prog, \"uAlpha\");\n  const posLoc = gl.getAttribLocation(prog, \"aPos\");\n  const mixLoc = gl.getAttribLocation(prog, \"aMix\");\n  let N = 260;\n  let posBuf = null, mixBuf = null;\n\n  // Fibonacci 球面：把 N 个点均匀撒在球上\n  function buildPoints(count) {\n    const pts = new Float32Array(count * 3);\n    const mixes = new Float32Array(count);\n    const golden = Math.PI * (3 - Math.sqrt(5));\n    for (let i = 0; i < count; i++) {\n      const y = 1 - (i / (count - 1)) * 2;\n      const r = Math.sqrt(Math.max(0, 1 - y * y));\n      const th = golden * i;\n      pts[i * 3]     = Math.cos(th) * r;\n      pts[i * 3 + 1] = y;\n      pts[i * 3 + 2] = Math.sin(th) * r;\n      mixes[i] = Math.random();\n    }\n    return { pts, mixes };\n  }\n\n  function rebuild(count) {\n    const { pts, mixes } = buildPoints(count);\n    if (!posBuf) {\n      posBuf = gl.createBuffer();\n      mixBuf = gl.createBuffer();\n    }\n    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);\n    gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);\n    gl.enableVertexAttribArray(posLoc);\n    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);\n    gl.bindBuffer(gl.ARRAY_BUFFER, mixBuf);\n    gl.bufferData(gl.ARRAY_BUFFER, mixes, gl.STATIC_DRAW);\n    gl.enableVertexAttribArray(mixLoc);\n    gl.vertexAttribPointer(mixLoc, 1, gl.FLOAT, false, 0, 0);\n    N = count;\n  }\n\n  // 参数变了：数量重新生成，颜色/大小/透明度/背景/混合模式立即更新\n  function apply() {\n    if (state.count !== N) rebuild(state.count);\n    gl.uniform3fv(uColor, rgb(state.color));\n    gl.uniform3fv(uColor2, rgb(state.color2));\n    gl.uniform1f(uSize, state.size);\n    gl.uniform1f(uAlpha, state.alpha);\n    gl.clearColor(...rgb(state.bg), 1);\n    // 发光：叠加混合，亮点互相加亮\n    gl.enable(gl.BLEND);\n    gl.blendFunc(gl.SRC_ALPHA, state.glow ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);\n    document.body.style.background = state.bg;\n    resize(); // 透视角度可能变了，重建投影矩阵\n  }\n\n  function perspective(fovy, aspect, near, far) {\n    const f = 1 / Math.tan(fovy / 2);\n    const o = new Float32Array(16);\n    o[0] = f / aspect; o[5] = f; o[10] = (far + near) / (near - far);\n    o[11] = -1; o[14] = (2 * far * near) / (near - far);\n    return o;\n  }\n  function mult(a, b) {\n    const o = new Float32Array(16);\n    for (let c = 0; c < 4; c++) {\n      for (let r = 0; r < 4; r++) {\n        o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] +\n                       a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];\n      }\n    }\n    return o;\n  }\n  function rotY(a) {\n    const c = Math.cos(a), s = Math.sin(a);\n    return new Float32Array([c, 0, s, 0,  0, 1, 0, 0,  -s, 0, c, 0,  0, 0, 0, 1]);\n  }\n  function rotX(a) {\n    const c = Math.cos(a), s = Math.sin(a);\n    return new Float32Array([1, 0, 0, 0,  0, c, -s, 0,  0, s, c, 0,  0, 0, 0, 1]);\n  }\n\n  let proj = null;\n  let rot = 0, tilt = 0.35;\n  const pointer = { x: 0, y: 0 };\n\n  function resize() {\n    const w = innerWidth, h = innerHeight;\n    const dpr = window.devicePixelRatio || 1;\n    canvas.width = w * dpr;\n    canvas.height = h * dpr;\n    gl.viewport(0, 0, canvas.width, canvas.height);\n    gl.uniform1f(uDpr, dpr);\n    proj = perspective(state.fov * Math.PI / 180, w / h, 0.1, 10);\n  }\n\n  function frame() {\n    rot += 0.004 + state.speed * 0.00035 + pointer.x * 0.00025;\n    tilt = 0.35 + pointer.y * 0.00035;\n    gl.uniformMatrix4fv(uMVP, false, mult(proj, mult(rotY(rot), rotX(tilt))));\n    gl.clear(gl.COLOR_BUFFER_BIT);\n    gl.drawArrays(gl.POINTS, 0, N);\n    requestAnimationFrame(frame);\n  }\n\n  canvas.addEventListener(\"mousemove\", e => {\n    pointer.x = (e.clientX / innerWidth - 0.5) * 2;\n    pointer.y = (e.clientY / innerHeight - 0.5) * 2;\n  });\n  canvas.addEventListener(\"touchmove\", e => {\n    pointer.x = (e.touches[0].clientX / innerWidth - 0.5) * 2;\n    pointer.y = (e.touches[0].clientY / innerHeight - 0.5) * 2;\n  }, { passive: true });\n  window.addEventListener(\"resize\", () => resize());\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n\n  resize();\n  apply();\n  requestAnimationFrame(frame);\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "a103",
    标题: "产品卡悬停",
    分类: "动效",
    子类: "悬停",
    风格: ["轻盈"],
    场景: ["电商·预订", "作品集·叙事"],
    元素: ["动效"],
    搭配: [
      "悬停反馈"
    ],
    标签: [
      "鼠标悬停",
      "产品展示",
      "微交互"
    ],
    来源: "Apple 官网分析（2026-08-20）",
    效果演示: "assets/demos/设备hover交互.html",
    参数: [
      {
        键: "amp",
        名: "悬停抬升（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 6
      },
      {
        键: "dur",
        名: "反应时长（秒）",
        类型: "slider",
        最小: 0.05,
        最大: 0.8,
        步长: 0.01,
        默认: 0.3
      },
      {
        键: "tilt",
        名: "悬停倾斜（度）",
        类型: "slider",
        最小: 0,
        最大: 6,
        步长: 0.5,
        默认: 1.5
      },
      {
        键: "shadow",
        名: "阴影强度（%）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 14
      },
      {
        键: "radius",
        名: "卡片圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 36,
        步长: 1,
        默认: 18
      },
      {
        键: "cardBg",
        名: "卡片底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "devA",
        名: "设备一主色",
        类型: "color",
        默认: "#7b5cff"
      },
      {
        键: "devB",
        名: "设备二主色",
        类型: "color",
        默认: "#1b1b1b"
      },
      {
        键: "devC",
        名: "设备三主色",
        类型: "color",
        默认: "#ff7a9c"
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n产品卡片鼠标移上去会轻轻抬起、倾斜、变亮，像在邀请你上手。产品展示页用。\n能怎么改：拖滑杆调「悬停抬升（px）、反应时长（秒）、悬停倾斜（度）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调抬起多高、反应快慢；幅度调小就更克制。",
    提示词: "帮我做一个产品卡悬停微动效果（纯 HTML/CSS/JS）：\n\n效果：产品卡片默认静态，鼠标移上去轻轻上浮 + 倾斜 + 阴影加深 + 变亮。\n\n用法示例：\n.pcard { transition: transform var(--hover-dur, .3s) ease, box-shadow var(--hover-dur, .3s) ease, filter var(--hover-dur, .3s) ease; }\n.pcard:hover {\n  transform: translateY(calc(-1 * var(--hover-amp, 6px))) rotate(-1.5deg);\n  box-shadow: 0 16px 30px rgba(27,27,27,.14);\n  filter: brightness(1.05);\n}\n\n关键参数：\n- amp 悬停抬升 / dur 反应时长 / tilt 悬停倾斜 / shadow 阴影强度 / radius 卡片圆角 / cardBg 卡片底色 / devA 设备一主色 / devB 设备二主色 / devC 设备三主色 / bg 页面背景色\n\n集成步骤：\n1. 复制 assets/demos/设备hover交互.html 的 CSS\n2. 套到产品卡 / 作品集卡片上\n3. 幅度调小更克制",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>产品卡悬停演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .cards { display: flex; gap: 26px; flex-wrap: wrap; justify-content: center; padding: 0 20px; }\n  .pcard {\n    width: 180px; background: var(--card-bg, #fff); border: 1px solid #e5e2db;\n    border-radius: var(--card-r, 18px);\n    padding: 26px 18px 20px; text-align: center; cursor: pointer;\n    transition: transform var(--hover-dur, .3s) ease, box-shadow var(--hover-dur, .3s) ease, filter var(--hover-dur, .3s) ease;\n  }\n  .pcard:hover {\n    transform: translateY(calc(-1 * var(--hover-amp, 6px))) rotate(calc(var(--tilt, 1.5deg) * -1));\n    box-shadow: 0 16px 30px color-mix(in srgb, #1b1b1b var(--shadow, 14%), transparent);\n    filter: brightness(1.05);\n  }\n  .device {\n    width: 100%; height: 110px; border-radius: 12px; margin-bottom: 14px;\n    display: flex; align-items: center; justify-content: center;\n    color: rgba(255,255,255,.85); font-size: 12px; font-weight: 600;\n  }\n  /* 每张设备图的主色可调，第二档自动混白提亮 */\n  .device.a { background: linear-gradient(145deg, var(--dev-a, #7b5cff), color-mix(in srgb, var(--dev-a, #7b5cff) 55%, white)); }\n  .device.b { background: linear-gradient(145deg, var(--dev-b, #1b1b1b), color-mix(in srgb, var(--dev-b, #1b1b1b) 55%, white)); }\n  .device.c { background: linear-gradient(145deg, var(--dev-c, #ff7a9c), color-mix(in srgb, var(--dev-c, #ff7a9c) 55%, white)); }\n  .pcard h4 { font-size: 14px; color: #1b1b1b; }\n  .pcard p { font-size: 12px; color: #8d8a82; margin-top: 4px; }\n</style>\n</head>\n<body>\n  <div class=\"cards\">\n    <div class=\"pcard\"><div class=\"device a\">便携设备</div><h4>随身款</h4><p>鼠标移上来看看</p></div>\n    <div class=\"pcard\"><div class=\"device b\">智能手表</div><h4>腕上款</h4><p>鼠标移上来看看</p></div>\n    <div class=\"pcard\"><div class=\"device c\">桌面设备</div><h4>桌面款</h4><p>鼠标移上来看看</p></div>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      amp: 6, dur: 0.3, tilt: 1.5, shadow: 14, radius: 18,\n      cardBg: \"#ffffff\", devA: \"#7b5cff\", devB: \"#1b1b1b\", devC: \"#ff7a9c\", bg: \"#ffffff\"\n    };\n\n    // 参数变了：改 CSS 变量，抬起高度/倾斜/阴影/颜色实时变\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--hover-amp\", state.amp + \"px\");\n      s.setProperty(\"--hover-dur\", state.dur + \"s\");\n      s.setProperty(\"--tilt\", state.tilt + \"deg\");\n      s.setProperty(\"--shadow\", state.shadow + \"%\");\n      s.setProperty(\"--card-r\", state.radius + \"px\");\n      s.setProperty(\"--card-bg\", state.cardBg);\n      s.setProperty(\"--dev-a\", state.devA);\n      s.setProperty(\"--dev-b\", state.devB);\n      s.setProperty(\"--dev-c\", state.devC);\n      s.setProperty(\"--page-bg\", state.bg);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s201",
    标题: "绸缎渐变",
    分类: "背景",
    子类: "渐变",
    风格: ["科技"],
    场景: ["落地页·发布页"],
    元素: ["视觉", "动效"],
    搭配: [],
    标签: [
      "渐变",
      "背景"
    ],
    来源: "Stripe 官网分析（2026-08-26）",
    效果演示: "assets/demos/绸缎渐变.html",
    参数: [
      {
        键: "c1",
        名: "渐变色 1",
        类型: "color",
        默认: "#7b5cff"
      },
      {
        键: "c2",
        名: "渐变色 2",
        类型: "color",
        默认: "#ff5c8a"
      },
      {
        键: "c3",
        名: "渐变色 3",
        类型: "color",
        默认: "#3ec6ff"
      },
      {
        键: "angle",
        名: "渐变起始角度（度）",
        类型: "slider",
        最小: 0,
        最大: 360,
        步长: 5,
        默认: 0
      },
      {
        键: "speed",
        名: "流动速度（秒/圈）",
        类型: "slider",
        最小: 3,
        最大: 60,
        步长: 1,
        默认: 18
      },
      {
        键: "blur",
        名: "柔化程度（px）",
        类型: "slider",
        最小: 10,
        最大: 120,
        步长: 2,
        默认: 48
      },
      {
        键: "sat",
        名: "饱和度",
        类型: "slider",
        最小: 0,
        最大: 3,
        步长: 0.1,
        默认: 1.4
      },
      {
        键: "text",
        名: "标题文字",
        类型: "string",
        默认: "冷暖色不断旋转的背景"
      },
      {
        键: "bg",
        名: "页面底色",
        类型: "color",
        默认: "#0b0b12"
      }
    ],
    效果说明: "构图笔记：用色块、粒子或光影铺底制造氛围层次，关键是让主体内容始终清晰可读，背景只做衬托不做主角。\n冷暖色绸缎一样的光在背景里不停旋转，是全页最吸睛的地方，但前面放文字依然看得清。\n能怎么改：拖滑杆调「渐变色 1、渐变色 2、渐变色 3」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调转多快、糊不糊；颜色在 conic-gradient 里换；前面文字要加深色底或毛玻璃保证能看清。",
    提示词: "做一个绸缎动态渐变背景 Hero（纯 HTML/CSS）：\n\n效果：两层 conic-gradient 冷暖色（紫/粉/橙/蓝），旋转混合成绸缎质感，前景文字清晰可读。\n\n用法示例：\n.silk { inset: -50%; background: conic-gradient(...); filter: blur(var(--silk-blur, 48px)) saturate(1.4); animation: spin var(--silk-speed, 18s) linear infinite; }\n.silk2 { inset: -30%; background: conic-gradient(...); filter: blur(calc(var(--silk-blur, 48px) * 1.45)) saturate(1.3); opacity: .7; animation: spin calc(var(--silk-speed, 18s) * 1.44) linear infinite reverse; }\n\n关键参数：\n- c1 渐变色 1 / c2 渐变色 2 / c3 渐变色 3 / angle 渐变起始角度 / speed 流动速度 / blur 柔化程度 / sat 饱和度 / text 标题文字 / bg 页面底色\n- 两层时长错开（18s / 26s 比例）\n\n集成步骤：\n1. 复制 assets/demos/绸缎渐变.html（完整可跑）\n2. 换色相 / 时长适配品牌\n3. 文字区加深色底或毛玻璃保证可读",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>绸缎渐变演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: var(--page-bg, #0b0b12); overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; }\n  .silk, .silk2 { position: absolute; border-radius: 50%; }\n  .silk {\n    inset: -50%;\n    /* 三个渐变色都可调，from 角度即起始角度 */\n    background: conic-gradient(from var(--angle, 0deg), var(--c1, #7b5cff), var(--c2, #ff5c8a), var(--c3, #3ec6ff), var(--c1, #7b5cff));\n    filter: blur(var(--silk-blur, 48px)) saturate(var(--silk-sat, 1.4));\n    animation: spin var(--silk-speed, 18s) linear infinite;\n  }\n  .silk2 {\n    inset: -30%;\n    background: conic-gradient(from calc(var(--angle, 0deg) + 180deg), var(--c3, #3ec6ff), var(--c1, #7b5cff), var(--c2, #ff5c8a), var(--c3, #3ec6ff));\n    filter: blur(calc(var(--silk-blur, 48px) * 1.45)) saturate(var(--silk-sat, 1.4));\n    opacity: .7;\n    animation: spin calc(var(--silk-speed, 18s) * 1.44) linear infinite reverse;\n  }\n  @keyframes spin { to { transform: rotate(360deg); } }\n  .content {\n    position: relative; z-index: 1; height: 100%;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    color: #fff; text-align: center; padding: 0 20px;\n  }\n  .content h1 { font-size: clamp(26px, 4.5vw, 40px); font-weight: 800; text-shadow: 0 2px 18px rgba(0,0,0,.35); }\n  .content .btn { background: #fff; color: #111; font-weight: 700; padding: 11px 26px; border-radius: 999px; font-size: 14px; }\n</style>\n</head>\n<body>\n  <div class=\"silk\"></div>\n  <div class=\"silk2\"></div>\n  <div class=\"content\">\n    <h1 id=\"title\">冷暖色不断旋转的背景</h1>\n    <span class=\"btn\">立即开始</span>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      speed: 18, blur: 48, c1: \"#7b5cff\", c2: \"#ff5c8a\", c3: \"#3ec6ff\",\n      angle: 0, sat: 1.4, text: \"冷暖色不断旋转的背景\", bg: \"#0b0b12\"\n    };\n\n    // 参数变了：改 CSS 变量，转速/柔化/三色/角度实时变\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--silk-speed\", state.speed + \"s\");\n      s.setProperty(\"--silk-blur\", state.blur + \"px\");\n      s.setProperty(\"--silk-sat\", state.sat);\n      s.setProperty(\"--c1\", state.c1);\n      s.setProperty(\"--c2\", state.c2);\n      s.setProperty(\"--c3\", state.c3);\n      s.setProperty(\"--angle\", state.angle + \"deg\");\n      s.setProperty(\"--page-bg\", state.bg);\n      document.getElementById(\"title\").textContent = state.text;\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s202",
    标题: "悬浮边框",
    分类: "动效",
    子类: "悬停",
    风格: ["科技"],
    场景: ["落地页·发布页"],
    元素: ["视觉", "动效"],
    搭配: [
      "产品卡悬停"
    ],
    标签: [
      "鼠标悬停",
      "卡片"
    ],
    来源: "Stripe 官网分析（2026-08-26）",
    效果演示: "assets/demos/悬浮边框.html",
    参数: [
      {
        键: "color",
        名: "描边渐变起始色",
        类型: "color",
        默认: "#635bff"
      },
      {
        键: "color2",
        名: "描边渐变结束色",
        类型: "color",
        默认: "#3ec6ff"
      },
      {
        键: "dur",
        名: "浮现时长（秒）",
        类型: "slider",
        最小: 0.05,
        最大: 0.8,
        步长: 0.01,
        默认: 0.2
      },
      {
        键: "width",
        名: "边框粗细（px）",
        类型: "slider",
        最小: 1,
        最大: 8,
        步长: 0.5,
        默认: 1
      },
      {
        键: "radius",
        名: "卡片圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 16
      },
      {
        键: "glow",
        名: "发光强度（%）",
        类型: "slider",
        最小: 0,
        最大: 60,
        步长: 2,
        默认: 14
      },
      {
        键: "lift",
        名: "悬停上浮（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 4
      },
      {
        键: "cardBg",
        名: "卡片底色",
        类型: "color",
        默认: "#faf9f6"
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n就一张卡片：鼠标移上去冒出彩色描边并轻轻上浮，告诉你「这个可以点」。\n能怎么改：拖滑杆调「描边渐变起始色、描边渐变结束色、浮现时长（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页点色块换描边颜色、拖滑杆调反应快慢；整套就 3 行 CSS。",
    提示词: "帮我做一个卡片悬停描边效果（纯 HTML/CSS/JS）：\n\n效果：卡片鼠标移上去冒出品牌色描边 + 轻轻上浮，提示可点性。\n\n用法示例：\n.item { transition: box-shadow var(--edge-dur, .2s) ease, transform var(--edge-dur, .2s) ease; }\n.item:hover {\n  box-shadow: 0 0 0 1px var(--edge-color, #635bff), 0 12px 24px rgba(99,91,255,.14);\n  transform: translateY(-3px);\n}\n\n关键参数：\n- color 描边渐变起始色 / color2 描边渐变结束色 / dur 浮现时长 / width 边框粗细 / radius 卡片圆角 / glow 发光强度 / lift 悬停上浮 / cardBg 卡片底色 / bg 页面背景色\n\n集成步骤：\n1. 复制 assets/demos/悬浮边框.html 的 CSS\n2. 描边色换成你的品牌色\n3. 配合 0.15-0.3s 过渡",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>悬浮边框演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif; padding: 20px;\n  }\n  /* 就一张大卡片：鼠标移上去冒出渐变描边并上浮 */\n  .item {\n    position: relative; z-index: 0;\n    width: min(420px, 80vw); height: 200px;\n    background: var(--card-bg, #faf9f6); border-radius: var(--r, 16px);\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;\n    cursor: pointer;\n    transition: box-shadow var(--edge-dur, .2s) ease, transform var(--edge-dur, .2s) ease;\n  }\n  /* 渐变描边：伪元素垫在卡片底下，比卡片大一圈，悬停时淡入 */\n  .item::before {\n    content: \"\"; position: absolute; z-index: -1;\n    inset: calc(-1 * var(--bw, 1px));\n    border-radius: calc(var(--r, 16px) + var(--bw, 1px));\n    background: linear-gradient(135deg, var(--c1, #635bff), var(--c2, #3ec6ff));\n    opacity: 0;\n    transition: opacity var(--edge-dur, .2s) ease;\n  }\n  .item:hover::before { opacity: 1; }\n  .item:hover {\n    transform: translateY(calc(-1 * var(--lift, 4px)));\n    box-shadow: 0 12px 24px color-mix(in srgb, var(--c1, #635bff) var(--glow, 14%), transparent);\n  }\n  .item h4 { font-size: 18px; }\n  .item p { font-size: 13px; color: #8a8a85; }\n</style>\n</head>\n<body>\n  <div class=\"item\">\n    <h4>收款</h4>\n    <p>鼠标移上来，看边框颜色</p>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      color: \"#635bff\", color2: \"#3ec6ff\", dur: 0.2, width: 1,\n      radius: 16, glow: 14, lift: 4, cardBg: \"#faf9f6\", bg: \"#ffffff\"\n    };\n\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--c1\", state.color);\n      s.setProperty(\"--c2\", state.color2);\n      s.setProperty(\"--edge-dur\", state.dur + \"s\");\n      s.setProperty(\"--bw\", state.width + \"px\");\n      s.setProperty(\"--r\", state.radius + \"px\");\n      s.setProperty(\"--glow\", state.glow + \"%\");\n      s.setProperty(\"--lift\", state.lift + \"px\");\n      s.setProperty(\"--card-bg\", state.cardBg);\n      s.setProperty(\"--page-bg\", state.bg);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s204",
    标题: "logo 墙",
    分类: "布局骨架",
    子类: "卡片墙",
    风格: ["极简"],
    场景: ["官网·品牌站"],
    元素: ["视觉"],
    搭配: [
      "悬浮边框"
    ],
    标签: [
      "logo",
      "信任背书",
      "滚动"
    ],
    来源: "Stripe 官网观察（2026-08-26，细节待验证）",
    效果演示: "assets/demos/合作商logo.html",
    参数: [
      {
        键: "speed",
        名: "滚动速度（秒/圈）",
        类型: "slider",
        最小: 3,
        最大: 40,
        步长: 1,
        默认: 10
      },
      {
        键: "colorful",
        名: "全部变彩色",
        类型: "switch",
        默认: false
      },
      {
        键: "baseColor",
        名: "常态文字色（灰色调）",
        类型: "color",
        默认: "#b9b4a9"
      },
      {
        键: "hoverColor",
        名: "悬停高亮色",
        类型: "color",
        默认: "#635bff"
      },
      {
        键: "hoverScale",
        名: "悬停放大倍数",
        类型: "slider",
        最小: 1,
        最大: 1.6,
        步长: 0.05,
        默认: 1.15
      },
      {
        键: "gap",
        名: "名字间距（px）",
        类型: "slider",
        最小: 20,
        最大: 140,
        步长: 4,
        默认: 64
      },
      {
        键: "font",
        名: "名字字号（px）",
        类型: "slider",
        最小: 14,
        最大: 44,
        步长: 1,
        默认: 24
      },
      {
        键: "maskEdge",
        名: "边缘渐隐",
        类型: "switch",
        默认: true
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：用留白、网格与层级秩序组织信息密度，建立清晰的阅读锚点与空间分区。\n一排品牌名字自动慢慢滚动，默认灰色不抢戏，鼠标移到哪个名字上哪个变彩色。放合作商、客户、平台等任何品牌都行。\n能怎么改：拖滑杆调「滚动速度（秒/圈）、全部变彩色、常态文字色（灰色调）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调滚动速度、开关切灰度/彩色；换成真实品牌名时注意授权；演示页默认 10 秒滚一圈，一眼能看到在动。",
    提示词: "帮我做一个品牌 logo 墙（纯 HTML/CSS/JS）：\n\n效果：一行品牌名统一灰度，鼠标移上去变彩色，横向自动无缝滚动。放合作商、客户、平台都可以。\n\n用法示例：\n<div class=\"track\">\n  <span class=\"brand\">ACME</span><span class=\"brand\">NOVA</span>...\n</div>\n// track 复制两份 + translateX(-50%) 实现无缝循环\n\n关键参数：\n- speed 滚动速度 / colorful 全部变彩色 / baseColor 常态文字色 / hoverColor 悬停高亮色 / hoverScale 悬停放大倍数 / gap 名字间距 / font 名字字号 / maskEdge 边缘渐隐 / bg 页面背景色\n\n集成步骤：\n1. 复制 assets/demos/合作商logo.html\n2. 换成真实品牌名（注意授权）\n3. 两端加渐变遮罩更高级",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>logo 墙演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column;\n    align-items: center; justify-content: center; gap: 24px;\n    background: var(--page, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .tip { font-size: 13px; color: #8a8a85; }\n  .brands {\n    width: min(860px, 92vw); overflow: hidden;\n    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);\n  }\n  /* 边缘渐隐开关：关掉后两端不虚化 */\n  .brands.flat { mask-image: none; }\n  .track { display: flex; gap: var(--gap, 64px); width: max-content; animation: scroll var(--scroll-s, 10s) linear infinite; }\n  .brand {\n    font-size: var(--fs, 24px); font-weight: 800; letter-spacing: 1px;\n    color: var(--base-c, #b9b4a9); cursor: default; white-space: nowrap;\n    transition: color .2s ease, transform .2s ease;\n  }\n  .brand:hover { color: var(--hover-c, #635bff); transform: scale(var(--hs, 1.15)); }\n  .track.colorful .brand { color: var(--hover-c, #635bff); }\n  @keyframes scroll { to { transform: translateX(-50%); } }\n</style>\n</head>\n<body>\n  <p class=\"tip\">这一排名字会一直慢慢滚动——鼠标移到哪个名字上，哪个就变彩色</p>\n  <div class=\"brands\" id=\"brands\">\n    <div class=\"track\" id=\"track\">\n      <span class=\"brand\">ACME</span><span class=\"brand\">NOVA</span><span class=\"brand\">云启</span>\n      <span class=\"brand\">墨白</span><span class=\"brand\">FABLE</span><span class=\"brand\">ORBITA</span>\n      <span class=\"brand\">清梧</span><span class=\"brand\">STELLAR</span>\n    </div>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      speed: 10, colorful: false, baseColor: \"#b9b4a9\", hoverColor: \"#635bff\",\n      gap: 64, font: 24, hoverScale: 1.15, maskEdge: true, bg: \"#ffffff\"\n    };\n    const brands = document.getElementById(\"brands\");\n    const track = document.getElementById(\"track\");\n    track.innerHTML += track.innerHTML;\n\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--scroll-s\", state.speed + \"s\");\n      s.setProperty(\"--base-c\", state.baseColor);\n      s.setProperty(\"--hover-c\", state.hoverColor);\n      s.setProperty(\"--gap\", state.gap + \"px\");\n      s.setProperty(\"--fs\", state.font + \"px\");\n      s.setProperty(\"--hs\", state.hoverScale);\n      s.setProperty(\"--page\", state.bg);\n      track.classList.toggle(\"colorful\", !!state.colorful);\n      brands.classList.toggle(\"flat\", !state.maskEdge);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "r001",
    标题: "文字遮罩",
    分类: "文字动画",
    子类: "遮罩揭示",
    风格: ["国风"],
    场景: ["落地页·发布页", "作品集·叙事"],
    元素: ["视觉", "动效"],
    搭配: [
      "粒子文字"
    ],
    标签: [
      "文字",
      "图片",
      "视差"
    ],
    来源: "ReactBits 官网 MaskedHeading 组件（MIT 许可；演示为原生 JS 重写版，未引 React/gsap；2026-08 入库）",
    效果演示: "assets/demos/文字遮罩.html",
    参数: [
      {
        键: "parallax",
        名: "鼠标视差幅度（px）",
        类型: "slider",
        最小: 0,
        最大: 60,
        步长: 1,
        默认: 26
      },
      {
        键: "drift",
        名: "自动漂移幅度（px）",
        类型: "slider",
        最小: 0,
        最大: 50,
        步长: 1,
        默认: 18
      },
      {
        键: "duration",
        名: "入场时长（秒）",
        类型: "slider",
        最小: 0.3,
        最大: 3,
        步长: 0.1,
        默认: 1.1
      },
      {
        键: "brightness",
        名: "图片亮度",
        类型: "slider",
        最小: 0.3,
        最大: 1.8,
        步长: 0.05,
        默认: 1
      },
      {
        键: "reveal",
        名: "入场方式",
        类型: "select",
        选项: [
          "rise",
          "wipe",
          "fade",
          "none"
        ],
        默认: "rise"
      },
      {
        键: "text",
        名: "文字内容",
        类型: "string",
        默认: "灵感藏在细节里"
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "scale",
        名: "图片放大倍数",
        类型: "slider",
        最小: 1,
        最大: 2,
        步长: 0.05,
        默认: 1.25
      },
      {
        键: "saturate",
        名: "图片饱和度",
        类型: "slider",
        最小: 0,
        最大: 3,
        步长: 0.1,
        默认: 1.4
      },
      {
        键: "sizeScale",
        名: "字号缩放",
        类型: "slider",
        最小: 0.5,
        最大: 2,
        步长: 0.05,
        默认: 1
      },
      {
        键: "shadowColor",
        名: "文字投影颜色",
        类型: "color",
        默认: "#4a7dff"
      },
      {
        键: "shadowBlur",
        名: "文字投影模糊（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 14
      }
    ],
    效果说明: "构图笔记：用逐字 / 逐行的揭示节奏引导阅读视线，文字本身就是视觉主角，留白与位移决定情绪的轻重。\n文字内部显示一张图片，鼠标移动时图片跟着轻轻滑动（视差），不动时缓慢漂移；入场时文字从下方升起、或从左往右擦除显现、或淡入。\n能怎么改：拖滑杆调「鼠标视差幅度（px）、自动漂移幅度（px）、入场时长（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调视差、漂移、时长、亮度；下拉选入场方式；换文字在代码里改两处，换图片就替换同目录的遮罩图.jpg。",
    提示词: "帮我做一个\"文字遮罩\"标题效果（纯 HTML/CSS/JS，参考 ReactBits 的 MaskedHeading）：\n\n效果：文字内部显示一张图片，鼠标移动图片跟着滑动（视差），静止时缓慢漂移；入场时有升起/擦除/淡入三种方式。\n\n用法示例：\n<h2 class=\"masked-heading\">\n  <span class=\"measure\">灵感藏在细节里</span>  // 透明文字，用来测量位置\n  <svg><defs><clipPath id=\"clip\"><text>灵感藏在细节里</text></clipPath></defs></svg>\n  <span class=\"reveal\"><span class=\"clip\"><img src=\"图.jpg\"></span></span>\n</h2>\n// 图片层应用 clip-path: url(#clip)，就被裁剪成文字形状\n\n关键参数：\n- parallax 鼠标视差幅度 / drift 自动漂移幅度 / duration 入场时长 / brightness 图片亮度 / reveal 入场方式 / text 文字内容 / bg 页面背景色 / scale 图片放大倍数 / saturate 图片饱和度 / sizeScale 字号缩放 / shadowColor 文字投影颜色 / shadowBlur 文字投影模糊\n\n集成步骤：\n1. 复制 assets/demos/文字遮罩.html（完整可跑，自带一张图：同目录 遮罩图.jpg，离线可用）\n2. 换文字（两处：测量文字和 SVG 文字）、替换 遮罩图.jpg 成你自己的图\n3. 想要 ReactBits 官方 React 版：npx shadcn@latest add @react-bits/MaskedHeading-JS-CSS",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>文字遮罩演示（ReactBits MaskedHeading）</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body {\n    background: #fff; display: flex; align-items: center; justify-content: center;\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif; padding: 24px;\n  }\n  /* 文字遮罩：文字内部显示图片，鼠标移动图片跟着滑动（视差） */\n  .masked-heading {\n    position: relative; width: min(720px, 92vw); margin: 0; padding: 50px 0;\n    text-align: center; font-weight: 800; letter-spacing: -.03em; line-height: 1.1;\n  }\n  .masked-heading__measure { color: transparent; display: inline-block; }\n  .masked-heading__defs { position: absolute; width: 0; height: 0; overflow: hidden; }\n  .masked-heading__reveal { position: absolute; inset: 0; pointer-events: none; opacity: 0; }\n  .masked-heading__clip { position: absolute; inset: 0; clip-path: url(#mh-clip); }\n  .masked-heading__media { position: absolute; inset: 0; will-change: transform, filter; }\n  .masked-heading__source { display: block; width: 100%; height: 100%; object-fit: cover; user-select: none; }\n</style>\n</head>\n<body>\n<h2 class=\"masked-heading\" id=\"mh\">\n  <!-- 透明文字占位：用来测量文字真实位置 -->\n  <span class=\"masked-heading__measure\" id=\"measure\">灵感藏在细节里</span>\n  <!-- SVG 里放同样的文字，作为裁剪形状 -->\n  <svg class=\"masked-heading__defs\">\n    <defs>\n      <clipPath id=\"mh-clip\" clipPathUnits=\"userSpaceOnUse\">\n        <text id=\"mh-glyph\">灵感藏在细节里</text>\n      </clipPath>\n    </defs>\n  </svg>\n  <!-- 图片层：被裁剪成文字形状，随鼠标滑动 -->\n  <span class=\"masked-heading__reveal\" id=\"reveal\">\n    <span class=\"masked-heading__clip\">\n      <span class=\"masked-heading__media\" id=\"media\">\n        <img class=\"masked-heading__source\" id=\"img\" alt=\"\">\n      </span>\n    </span>\n  </span>\n</h2>\n<script>\n  const root = document.getElementById(\"mh\");\n  const measure = document.getElementById(\"measure\");\n  const glyph = document.getElementById(\"mh-glyph\");\n  const reveal = document.getElementById(\"reveal\");\n  const media = document.getElementById(\"media\");\n  const img = document.getElementById(\"img\");\n\n  // 默认参数（父页面详情页可调）\n  const state = {\n    parallax: 26, drift: 18, duration: 1.1, brightness: 1, reveal: \"rise\",\n    text: \"灵感藏在细节里\", bg: \"#ffffff\", scale: 1.25, saturate: 1.4, sizeScale: 1,\n    shadowColor: \"#4a7dff\", shadowBlur: 14\n  };\n  const off = { x: 0, y: 0, tx: 0, ty: 0 };\n  let clock = 0, last = performance.now(), fs = 40, played = false;\n\n  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);\n\n  // 背景图：同目录下的 遮罩图.jpg（Windows 默认壁纸压出来的抽象蓝，可换成你自己的图）\n  img.src = \"遮罩图.jpg\";\n\n  // 测量 HTML 文字位置，同步给 SVG 裁剪文字\n  function sync() {\n    // 换文字 / 换字号后重新测量\n    measure.textContent = state.text;\n    glyph.textContent = state.text;\n    fs = clamp(root.clientWidth * 0.13 * state.sizeScale, 20, 160);\n    root.style.fontSize = fs + \"px\";\n    const cs = getComputedStyle(measure);\n    glyph.setAttribute(\"x\", measure.offsetLeft);\n    glyph.setAttribute(\"y\", Math.round(measure.offsetTop + fs * 0.78));\n    glyph.setAttribute(\"font-size\", fs);\n    glyph.setAttribute(\"font-family\", cs.fontFamily);\n    glyph.setAttribute(\"font-weight\", cs.fontWeight);\n    glyph.setAttribute(\"letter-spacing\", cs.letterSpacing);\n  }\n\n  // 每帧：图片跟随鼠标视差 + 缓慢漂移\n  function frame(now) {\n    const dt = Math.min(0.05, (now - last) / 1000);\n    last = now;\n    clock += dt;\n    const dx = Math.sin(clock * 0.21) * state.drift;\n    const dy = Math.cos(clock * 0.17) * state.drift * 0.6;\n    const ease = 1 - Math.exp(-dt / 0.18);\n    off.x += (off.tx + dx - off.x) * ease;\n    off.y += (off.ty + dy - off.y) * ease;\n    const maxX = root.clientWidth * 0.12;\n    const maxY = root.clientHeight * 0.15;\n    media.style.transform = \"translate3d(\" + clamp(off.x, -maxX, maxX).toFixed(1) + \"px, \" +\n      clamp(off.y, -maxY, maxY).toFixed(1) + \"px, 0) scale(\" + state.scale + \")\";\n    media.style.filter = \"brightness(\" + state.brightness + \") saturate(\" + state.saturate + \")\";\n    // 文字投影：颜色 + 模糊半径实时可调\n    reveal.style.filter = \"drop-shadow(0 4px \" + state.shadowBlur + \"px \" + state.shadowColor + \")\";\n    requestAnimationFrame(frame);\n  }\n\n  // 入场动画：先摆好\"还没进场\"的状态\n  function rest() {\n    reveal.style.transition = \"none\";\n    glyph.style.transition = \"none\";\n    glyph.style.transform = \"\";\n    reveal.style.transform = \"\";\n    if (state.reveal === \"rise\") {\n      reveal.style.opacity = \"1\";\n      glyph.style.transform = \"translateY(\" + (fs * 1.15) + \"px)\";\n    } else if (state.reveal === \"wipe\") {\n      reveal.style.opacity = \"1\";\n      reveal.style.clipPath = \"inset(0% 100% 0% 0%)\";\n    } else if (state.reveal === \"fade\") {\n      reveal.style.opacity = \"0\";\n      reveal.style.transform = \"scale(1.08)\";\n    } else {\n      reveal.style.opacity = \"1\";\n    }\n  }\n\n  function play() {\n    const dur = state.duration;\n    if (state.reveal === \"rise\") {\n      requestAnimationFrame(() => {\n        glyph.style.transition = \"transform \" + dur + \"s cubic-bezier(.16,1,.3,1)\";\n        glyph.style.transform = \"translateY(0)\";\n      });\n    } else if (state.reveal === \"wipe\") {\n      requestAnimationFrame(() => {\n        reveal.style.transition = \"clip-path \" + dur + \"s cubic-bezier(.77,0,.18,1)\";\n        reveal.style.clipPath = \"inset(0% 0% 0% 0%)\";\n      });\n    } else if (state.reveal === \"fade\") {\n      requestAnimationFrame(() => {\n        reveal.style.transition = \"opacity \" + dur + \"s ease-out, transform \" + dur + \"s ease-out\";\n        reveal.style.opacity = \"1\";\n        reveal.style.transform = \"scale(1)\";\n      });\n    } else {\n      reveal.style.opacity = \"1\";\n    }\n  }\n\n  // 参数变了：重播一次入场动画，让效果立即可见\n  function apply() {\n    document.body.style.background = state.bg;\n    played = true;\n    sync();\n    rest();\n    setTimeout(play, 40);\n  }\n\n  root.addEventListener(\"pointermove\", (e) => {\n    const r = root.getBoundingClientRect();\n    off.tx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1) * -state.parallax;\n    off.ty = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1) * -state.parallax;\n  });\n  root.addEventListener(\"pointerleave\", () => { off.tx = 0; off.ty = 0; });\n  window.addEventListener(\"resize\", () => sync());\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n\n  img.onload = () => sync();\n  sync();\n  rest();\n  // 进入视口才播放入场动画\n  const io = new IntersectionObserver((entries) => {\n    if (entries.some(en => en.isIntersecting) && !played) {\n      played = true;\n      play();\n      io.disconnect();\n    }\n  }, { threshold: 0.2 });\n  io.observe(root);\n  requestAnimationFrame(frame);\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v101",
    标题: "按压回弹",
    分类: "组件",
    子类: "按钮",
    风格: ["叙事仪式"],
    场景: ["全站通用"],
    元素: ["动效"],
    搭配: [
      "弹性开关"
    ],
    标签: [
      "按钮",
      "点击反馈",
      "重量感"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/按压回弹.html",
    参数: [
      {
        键: "press",
        名: "压多狠（0.7~1）",
        类型: "slider",
        最小: 0.6,
        最大: 1,
        步长: 0.01,
        默认: 0.88
      },
      {
        键: "over",
        名: "回弹冲过头（倍）",
        类型: "slider",
        最小: 1,
        最大: 1.4,
        步长: 0.01,
        默认: 1.05
      },
      {
        键: "dur",
        名: "回弹时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 1.2,
        步长: 0.01,
        默认: 0.3
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 14
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 30,
        步长: 1,
        默认: 17
      },
      {
        键: "bg",
        名: "按钮底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "color",
        名: "文字颜色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "glow",
        名: "是否带阴影",
        类型: "switch",
        默认: false
      },
      {
        键: "glowColor",
        名: "阴影颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "text",
        名: "按钮文字",
        类型: "string",
        默认: "按住我试试"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n按钮按下去先缩到比正常还小（压过头），松手弹回来时先冲过原尺寸再落定。按一下就知道这东西「有分量」，不是纸片。\n能怎么改：拖滑杆调「压多狠（0.7~1）、回弹冲过头（倍）、回弹时长（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调压多狠、回弹冲过头、回弹时长；压狠一点手感更重，冲过头多一点更弹。",
    提示词: "帮我做一个\"按压回弹\"按钮（纯 HTML/CSS/JS）：\n效果：点击时按钮先缩小压过头，松开后弹回并冲过原尺寸再落定，赋予操作重量感。\n用法示例：\n<button class=\"btn\">按住我试试</button>\n// pointerdown 加 .down（scale 变小），pointerup 加 .pop（弹回动画）\n关键参数：\n- press 压多狠 / over 回弹冲过头 / dur 回弹时长 / radius 圆角 / fontSize 字号 / bg 按钮底色 / color 文字颜色 / glow 是否带阴影 / glowColor 阴影颜色 / text 按钮文字\n集成步骤：\n1. 复制 assets/demos/按压回弹.html 的 CSS 和 JS\n2. 套到主按钮上\n3. 调 press/over 找到适合你产品的手感",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>按压回弹演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; outline: none; border: none;\n    background: var(--bg, #1a1a1a); color: var(--tc, #fff);\n    font-size: var(--fs, 17px); font-weight: 700; letter-spacing: 3px;\n    padding: 18px 56px; border-radius: var(--r, 14px);\n    box-shadow: var(--sh, none);\n    transition: box-shadow .25s ease;\n  }\n  /* 按下：压过头（缩过头） */\n  .btn.down { transform: scale(var(--press, .88)); transition: transform .06s ease; }\n  /* 松开：先冲过头再落定，重量感来自这一下 */\n  .btn.pop { animation: pressPop var(--dur, .3s) ease-out forwards; }\n  @keyframes pressPop {\n    0%   { transform: scale(var(--press, .88)); }\n    55%  { transform: scale(var(--over, 1.05)); }\n    100% { transform: scale(1); }\n  }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">按住我试试</button>\n<p class=\"hint\">点按：先压下去，松手弹回来时冲过头再落定</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    press: 0.88, over: 1.05, dur: 0.3,\n    radius: 14, fontSize: 17, bg: \"#1a1a1a\", color: \"#ffffff\",\n    glow: false, glowColor: \"#1a1a1a\", text: \"按住我试试\"\n  };\n  const btn = document.getElementById(\"btn\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--press\", state.press);\n    s.setProperty(\"--over\", state.over);\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n    s.setProperty(\"--bg\", state.bg);\n    s.setProperty(\"--tc\", state.color);\n    // 阴影：用 8 位十六进制把颜色和透明度拼起来\n    s.setProperty(\"--sh\", state.glow ? \"0 12px 32px \" + state.glowColor + \"55\" : \"none\");\n    btn.textContent = state.text;\n  }\n\n  btn.addEventListener(\"pointerdown\", () => {\n    btn.classList.remove(\"pop\");\n    btn.classList.add(\"down\");\n  });\n  btn.addEventListener(\"pointerup\", () => {\n    btn.classList.remove(\"down\");\n    btn.classList.add(\"pop\");\n    setTimeout(() => btn.classList.remove(\"pop\"), state.dur * 1000 + 30);\n  });\n  btn.addEventListener(\"pointerleave\", () => btn.classList.remove(\"down\"));\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v102",
    标题: "弹性开关",
    分类: "组件",
    子类: "开关",
    风格: ["轻盈"],
    场景: ["通用模块区"],
    元素: ["动效"],
    搭配: [
      "液态滑块"
    ],
    标签: [
      "开关",
      "滑块",
      "弹性"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/弹性开关.html",
    参数: [
      {
        键: "stretch",
        名: "拉长冲过头（倍）",
        类型: "slider",
        最小: 1,
        最大: 1.8,
        步长: 0.01,
        默认: 1.28
      },
      {
        键: "dur",
        名: "切换时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 1,
        步长: 0.01,
        默认: 0.3
      },
      {
        键: "width",
        名: "轨道宽度（px）",
        类型: "slider",
        最小: 40,
        最大: 140,
        步长: 1,
        默认: 66
      },
      {
        键: "height",
        名: "轨道高度（px）",
        类型: "slider",
        最小: 20,
        最大: 64,
        步长: 1,
        默认: 34
      },
      {
        键: "trackOff",
        名: "关闭时轨道色",
        类型: "color",
        默认: "#e3e3e3"
      },
      {
        键: "trackOn",
        名: "打开时轨道色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "knob",
        名: "手柄颜色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "shadow",
        名: "手柄带阴影",
        类型: "switch",
        默认: true
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n开关切换时，圆形滑钮起步先横向拉长成椭圆，落位时再压回原宽。滑钮像有质量的果冻，不是贴上去的贴纸。\n能怎么改：拖滑杆调「拉长冲过头（倍）、切换时长（秒）、轨道宽度（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调拉长幅度、切换时长；拉长幅度越大越弹，时长越短越利落。",
    提示词: "帮我做一个\"弹性开关\"（纯 HTML/CSS/JS）：\n效果：开关切换时滑钮先横向拉长，落位再压回原宽，体现质量感。\n用法示例：\n<div class=\"switch on\"><span class=\"knob\"></span></div>\n// 切换时 .knob 走 keyframes：起步 scaleX 拉长，落位 scaleX 压回\n关键参数：\n- stretch 拉长冲过头 / dur 切换时长 / width 轨道宽度 / height 轨道高度 / trackOff 关闭时轨道色 / trackOn 打开时轨道色 / knob 手柄颜色 / shadow 手柄带阴影\n集成步骤：\n1. 复制 assets/demos/弹性开关.html 的 CSS 和 JS\n2. 套到表单开关上\n3. 换轨道/滑钮颜色适配主题",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>弹性开关演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .switch {\n    border-radius: 999px;\n    background: var(--off, #e3e3e3); cursor: pointer; position: relative; user-select: none;\n    transition: background var(--dur, .25s) ease;\n  }\n  .knob {\n    position: absolute; top: 3px; left: 3px; border-radius: 50%;\n    width: var(--knob, 28px); height: var(--knob, 28px);\n    background: var(--knobc, #fff);\n    box-shadow: var(--sh, 0 2px 6px rgba(0,0,0,.22));\n  }\n  /* 开：滑钮起步横向拉长，落位压回原宽，体现质量感（行程 = 轨道宽 - 轨道高） */\n  .switch.on { background: var(--on, #1a1a1a); }\n  .switch.on .knob { animation: knobOn var(--dur, .3s) ease-out forwards; }\n  .switch.off .knob { animation: knobOff var(--dur, .3s) ease-out forwards; }\n  @keyframes knobOn {\n    0%   { transform: translateX(0) scaleX(1); }\n    40%  { transform: translateX(calc(var(--travel, 32px) / 2)) scaleX(var(--stretch, 1.28)); }\n    75%  { transform: translateX(var(--travel, 32px)) scaleX(.82); }\n    100% { transform: translateX(var(--travel, 32px)) scaleX(1); }\n  }\n  @keyframes knobOff {\n    0%   { transform: translateX(var(--travel, 32px)) scaleX(1); }\n    40%  { transform: translateX(calc(var(--travel, 32px) / 2)) scaleX(var(--stretch, 1.28)); }\n    75%  { transform: translateX(0) scaleX(.82); }\n    100% { transform: translateX(0) scaleX(1); }\n  }\n</style>\n</head>\n<body>\n<div class=\"switch\" id=\"sw\" role=\"switch\" aria-checked=\"false\"><span class=\"knob\"></span></div>\n<p class=\"hint\">点一下开关：滑钮先横向拉长，落位再压回原宽</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    stretch: 1.28, dur: 0.3, width: 66, height: 34,\n    trackOff: \"#e3e3e3\", trackOn: \"#1a1a1a\", knob: \"#ffffff\", shadow: true\n  };\n  const sw = document.getElementById(\"sw\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--stretch\", state.stretch);\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    sw.style.width = state.width + \"px\";\n    sw.style.height = state.height + \"px\";\n    // 手柄直径 = 轨道高 - 6px 边距；行程 = 轨道宽 - 轨道高\n    s.setProperty(\"--knob\", (state.height - 6) + \"px\");\n    s.setProperty(\"--travel\", Math.max(state.width - state.height, 0) + \"px\");\n    s.setProperty(\"--off\", state.trackOff);\n    s.setProperty(\"--on\", state.trackOn);\n    s.setProperty(\"--knobc\", state.knob);\n    s.setProperty(\"--sh\", state.shadow ? \"0 2px 6px rgba(0,0,0,.22)\" : \"none\");\n  }\n\n  let on = false;\n  sw.addEventListener(\"click\", () => {\n    on = !on;\n    sw.classList.toggle(\"on\", on);\n    sw.classList.toggle(\"off\", !on);\n    sw.setAttribute(\"aria-checked\", on);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v103",
    标题: "水波按钮",
    分类: "组件",
    子类: "按钮",
    风格: [],
    场景: ["移动端"],
    元素: ["动效"],
    搭配: [
      "点击爆散"
    ],
    标签: [
      "按钮",
      "涟漪",
      "跟随手指"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/水波按钮.html",
    参数: [
      {
        键: "dur",
        名: "水波时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 2,
        步长: 0.01,
        默认: 0.55
      },
      {
        键: "opacity",
        名: "水波浓度（0~1）",
        类型: "slider",
        最小: 0.02,
        最大: 0.8,
        步长: 0.01,
        默认: 0.18
      },
      {
        键: "rippleColor",
        名: "水波颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "spread",
        名: "水波扩散倍数",
        类型: "slider",
        最小: 0.5,
        最大: 3,
        步长: 0.05,
        默认: 1
      },
      {
        键: "bg",
        名: "按钮底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "color",
        名: "文字颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "border",
        名: "边框颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 14
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 30,
        步长: 1,
        默认: 17
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n点按钮时，水波从你手指按下的位置散开，而不是从按钮中心。反馈跟着手指走，点哪儿哪儿有反应，操作感直接。\n能怎么改：拖滑杆调「水波时长（秒）、水波浓度（0~1）、水波颜色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调波纹时长、波纹深浅；换颜色改 JS 里的 rgba 值。",
    提示词: "帮我做一个\"水波\"按钮反馈（纯 HTML/CSS/JS）：\n效果：点击按钮时水波从手指落点散开，反馈跟随手指而非控件中心。\n用法示例：\n<button class=\"btn\">点我</button>\n// click 时取 e.clientX/Y 相对按钮的位置，在那里生成 .ripple 圆\n关键参数：\n- dur 水波时长 / opacity 水波浓度 / rippleColor 水波颜色 / spread 水波扩散倍数 / bg 按钮底色 / color 文字颜色 / border 边框颜色 / radius 圆角 / fontSize 字号\n集成步骤：\n1. 复制 assets/demos/水波按钮.html 的 JS（ripple 生成逻辑）\n2. 按钮要设 overflow:hidden，ripple 是绝对定位的圆\n3. 深色按钮波纹用浅色、浅色按钮用深色",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>水波按钮演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    position: relative; overflow: hidden; cursor: pointer; user-select: none; outline: none;\n    background: var(--bg, #fff); color: var(--tc, #1a1a1a); border: 2px solid var(--bd, #1a1a1a);\n    font-size: var(--fs, 17px); font-weight: 700; letter-spacing: 3px;\n    padding: 18px 56px; border-radius: var(--r, 14px);\n    transition: background .25s ease, color .25s ease;\n  }\n  .btn:active { filter: brightness(.96); }\n  /* 水波：从点下去的位置散开，反馈跟随手指而不是控件中心 */\n  .ripple {\n    position: absolute; border-radius: 50%;\n    background: var(--ripple, #1a1a1a);\n    transform: scale(0); pointer-events: none;\n  }\n  .ripple.go { animation: rippleGo var(--dur, .55s) ease-out forwards; }\n  @keyframes rippleGo { to { transform: scale(1); opacity: 0; } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">点我任意位置</button>\n<p class=\"hint\">水波从你点下去的位置散开，不是从按钮中心</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.55, opacity: 0.18, rippleColor: \"#1a1a1a\", spread: 1,\n    bg: \"#ffffff\", color: \"#1a1a1a\", border: \"#1a1a1a\", radius: 14, fontSize: 17\n  };\n  const btn = document.getElementById(\"btn\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--ripple\", state.rippleColor);\n    s.setProperty(\"--bg\", state.bg);\n    s.setProperty(\"--tc\", state.color);\n    s.setProperty(\"--bd\", state.border);\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n  }\n\n  btn.addEventListener(\"click\", (e) => {\n    const rect = btn.getBoundingClientRect();\n    // 水波直径 = 按钮较长边 × 扩散倍数\n    const r = Math.max(rect.width, rect.height) * state.spread;\n    const rip = document.createElement(\"span\");\n    rip.className = \"ripple\";\n    rip.style.width = rip.style.height = r + \"px\";\n    rip.style.opacity = state.opacity; // 浓度直接落在水波自身上\n    // 水波中心 = 手指落点\n    rip.style.left = (e.clientX - rect.left - r / 2) + \"px\";\n    rip.style.top = (e.clientY - rect.top - r / 2) + \"px\";\n    btn.appendChild(rip);\n    rip.classList.add(\"go\");\n    rip.addEventListener(\"animationend\", () => rip.remove());\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v104",
    标题: "点击爆散",
    分类: "动效",
    子类: "按压",
    风格: ["通用"],
    场景: ["工具·SaaS", "通用模块区"],
    元素: ["动效"],
    搭配: [
      "水波按钮"
    ],
    标签: [
      "反馈",
      "粒子"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/点击爆散.html",
    参数: [
      {
        键: "count",
        名: "粒子数量（个）",
        类型: "slider",
        最小: 3,
        最大: 40,
        步长: 1,
        默认: 10
      },
      {
        键: "dist",
        名: "扩散距离（px）",
        类型: "slider",
        最小: 30,
        最大: 300,
        步长: 5,
        默认: 90
      },
      {
        键: "dur",
        名: "飞散时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 1.5,
        步长: 0.01,
        默认: 0.5
      },
      {
        键: "size",
        名: "粒子大小（px）",
        类型: "slider",
        最小: 2,
        最大: 16,
        步长: 0.5,
        默认: 6
      },
      {
        键: "gravity",
        名: "重力下坠（px）",
        类型: "slider",
        最小: 0,
        最大: 300,
        步长: 5,
        默认: 60
      },
      {
        键: "color",
        名: "粒子颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "shape",
        名: "粒子形状",
        类型: "select",
        选项: [
          "圆点",
          "方块",
          "线段"
        ],
        默认: "圆点"
      },
      {
        键: "fade",
        名: "结尾渐隐",
        类型: "switch",
        默认: true
      },
      {
        键: "btnBg",
        名: "按钮底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "btnColor",
        名: "按钮文字色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n关键操作（提交、收藏、完成）点击时，从按钮炸出一小撮粒子向四周飞散再消失。动作越大反馈越强，操作分量和结果匹配。\n能怎么改：拖滑杆调「粒子数量（个）、扩散距离（px）、飞散时长（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调粒子数量、飞散距离、爆散时长；粒子颜色在 CSS 的 .spark 里改；普通按钮别用，只在关键操作上炸。",
    提示词: "帮我做一个\"点击爆散\"反馈（纯 HTML/CSS/JS）：\n效果：点击按钮时从点击位置炸出若干小粒子向四周飞散，匹配关键操作的分量。\n用法示例：\n<button class=\"btn\">触发</button>\n// click 时按 count 生成 .spark 小圆，随机方向飞散（--dx/--dy）后移除\n关键参数：\n- count 粒子数量 / dist 扩散距离 / dur 飞散时长 / size 粒子大小 / gravity 重力下坠 / color 粒子颜色 / shape 粒子形状 / fade 结尾渐隐 / btnBg 按钮底色 / btnColor 按钮文字色\n集成步骤：\n1. 复制 assets/demos/点击爆散.html 的 JS\n2. 只用在关键操作（提交/收藏/完成），别全站用\n3. 粒子颜色换成品牌色",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>点击爆散演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    position: relative; cursor: pointer; user-select: none; outline: none; border: none;\n    background: var(--bg, #1a1a1a); color: var(--tc, #fff);\n    font-size: 17px; font-weight: 700; letter-spacing: 3px;\n    padding: 18px 56px; border-radius: var(--r, 14px);\n    transition: transform .12s ease;\n  }\n  .btn:active { transform: scale(.94); }\n  .burst-wrap { position: fixed; inset: 0; pointer-events: none; overflow: hidden; }\n  .spark { position: absolute; background: var(--sc, #1a1a1a); pointer-events: none; }\n  /* 末段叠加 --g 的下坠量，模拟重力；渐隐开关控制结尾透明度 */\n  .spark.go { animation: sparkFly var(--dur, .5s) cubic-bezier(.16,1,.3,1) forwards; }\n  @keyframes sparkFly {\n    0%   { transform: translate(0,0) scale(1); opacity: 1; }\n    60%  { transform: translate(var(--dx), var(--dy)) scale(.7); opacity: 1; }\n    100% { transform: translate(var(--dx), calc(var(--dy) + var(--g, 0px))) scale(.3); opacity: var(--fo, 0); }\n  }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">触发爆散</button>\n<p class=\"hint\">关键操作点击：从按钮炸出小粒飞散，动作有分量</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    count: 10, dist: 90, dur: 0.5, size: 6, gravity: 60,\n    color: \"#1a1a1a\", shape: \"圆点\", fade: true,\n    btnBg: \"#1a1a1a\", btnColor: \"#ffffff\"\n  };\n  const btn = document.getElementById(\"btn\");\n  const root = document.documentElement;\n  const wrap = document.createElement(\"div\");\n  wrap.className = \"burst-wrap\";\n  document.body.appendChild(wrap);\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--g\", state.gravity + \"px\");\n    s.setProperty(\"--fo\", state.fade ? 0 : 1); // 渐隐关：结尾保持不透明\n    s.setProperty(\"--sc\", state.color);\n    s.setProperty(\"--bg\", state.btnBg);\n    s.setProperty(\"--tc\", state.btnColor);\n    s.setProperty(\"--r\", \"14px\");\n  }\n\n  btn.addEventListener(\"click\", (e) => {\n    const cx = e.clientX, cy = e.clientY;\n    for (let i = 0; i < state.count; i++) {\n      const s = document.createElement(\"span\");\n      s.className = \"spark\";\n      // 形状决定长宽；大小带随机抖动更像真的\n      const sz = state.size * (0.7 + Math.random() * 0.6);\n      if (state.shape === \"线段\") { s.style.width = sz * 3 + \"px\"; s.style.height = \"2px\"; s.style.borderRadius = \"2px\"; }\n      else { s.style.width = s.style.height = sz + \"px\"; s.style.borderRadius = state.shape === \"方块\" ? \"1px\" : \"50%\"; }\n      s.style.left = (cx - 2) + \"px\";\n      s.style.top = (cy - 2) + \"px\";\n      // 粒子向四周随机飞散\n      const angle = Math.random() * Math.PI * 2;\n      const d = state.dist * (0.5 + Math.random());\n      s.style.setProperty(\"--dx\", Math.cos(angle) * d + \"px\");\n      s.style.setProperty(\"--dy\", Math.sin(angle) * d + \"px\");\n      wrap.appendChild(s);\n      s.classList.add(\"go\");\n      s.addEventListener(\"animationend\", () => s.remove());\n    }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v105",
    标题: "勾选动效",
    分类: "组件",
    子类: "开关",
    风格: ["轻盈"],
    场景: ["通用模块区", "工具·SaaS"],
    元素: ["动效"],
    搭配: [
      "状态收尾"
    ],
    标签: [
      "勾选",
      "成功",
      "过程感"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/勾选动效.html",
    参数: [
      {
        键: "dur",
        名: "勾出时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 1.2,
        步长: 0.01,
        默认: 0.35
      },
      {
        键: "width",
        名: "勾线粗细（px）",
        类型: "slider",
        最小: 1,
        最大: 6,
        步长: 0.5,
        默认: 3
      },
      {
        键: "size",
        名: "勾选框大小（px）",
        类型: "slider",
        最小: 32,
        最大: 96,
        步长: 1,
        默认: 56
      },
      {
        键: "iconSize",
        名: "勾图标大小（px）",
        类型: "slider",
        最小: 16,
        最大: 60,
        步长: 1,
        默认: 30
      },
      {
        键: "bgColor",
        名: "选中底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "offBg",
        名: "未选中底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "borderColor",
        名: "未选中边框色",
        类型: "color",
        默认: "#d0d0d0"
      },
      {
        键: "checkColor",
        名: "对勾颜色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "radius",
        名: "圆角（%，50 为正圆）",
        类型: "slider",
        最小: 0,
        最大: 50,
        步长: 1,
        默认: 50
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n勾选成功时，对勾不是「啪」一下出现，而是从勾尖开始一笔一笔画出来。把成功的过程演给你看，确认感更强。\n能怎么改：拖滑杆调「勾出时长（秒）、勾线粗细（px）、勾选框大小（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调画勾时长、线条粗细；对勾的路径在 SVG 的 d 属性里改；背景色和勾色在 CSS 里换。",
    提示词: "帮我做一个\"逐笔画勾\"的勾选动效（纯 HTML/CSS/JS + SVG）：\n效果：勾选状态用 stroke-dashoffset 动画把对勾一笔笔画出来，呈现成功的过程感。\n用法示例：\n<svg viewBox=\"0 0 24 24\"><path d=\"M5 12.5 L10 17.5 L19 7\"></path></svg>\n// path 设 stroke-dasharray/offset = 26，.on 时动画到 offset 0\n关键参数：\n- dur 勾出时长 / width 勾线粗细 / size 勾选框大小 / iconSize 勾图标大小 / bgColor 选中底色 / offBg 未选中底色 / borderColor 未选中边框色 / checkColor 对勾颜色 / radius 圆角\n集成步骤：\n1. 复制 assets/demos/勾选动效.html 的 SVG 和动画\n2. 换对勾路径（d 属性）和颜色\n3. 可用于 checkbox、任务完成、设置项",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>勾选动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .check {\n    width: var(--size, 56px); height: var(--size, 56px); border-radius: var(--r, 50%);\n    cursor: pointer; user-select: none;\n    background: var(--offbg, #fff); border: 2px solid var(--bd, #d0d0d0);\n    display: flex; align-items: center; justify-content: center;\n    transition: background var(--dur, .25s) ease, border-color var(--dur, .25s) ease;\n  }\n  .check.on { background: var(--onbg, #1a1a1a); border-color: var(--onbg, #1a1a1a); }\n  /* 勾：用 stroke-dashoffset 逐笔画出 */\n  .check svg { width: var(--icon, 30px); height: var(--icon, 30px); }\n  .check path {\n    fill: none; stroke: var(--ck, #fff); stroke-width: var(--width, 3);\n    stroke-linecap: round; stroke-linejoin: round;\n    stroke-dasharray: 26; stroke-dashoffset: 26;\n  }\n  .check.on path { animation: drawCheck var(--dur, .35s) ease-out forwards; }\n  @keyframes drawCheck { to { stroke-dashoffset: 0; } }\n</style>\n</head>\n<body>\n<div class=\"check\" id=\"ck\" role=\"checkbox\" aria-checked=\"false\" tabindex=\"0\">\n  <svg viewBox=\"0 0 24 24\"><path d=\"M5 12.5 L10 17.5 L19 7\"></path></svg>\n</div>\n<p class=\"hint\">点一下：勾从对勾头一笔一笔画出来，呈现成功的过程感</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.35, width: 3, size: 56, iconSize: 30,\n    bgColor: \"#1a1a1a\", offBg: \"#ffffff\", borderColor: \"#d0d0d0\", checkColor: \"#ffffff\", radius: 50\n  };\n  const ck = document.getElementById(\"ck\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--width\", state.width);\n    s.setProperty(\"--size\", state.size + \"px\");\n    s.setProperty(\"--icon\", state.iconSize + \"px\");\n    s.setProperty(\"--onbg\", state.bgColor);\n    s.setProperty(\"--offbg\", state.offBg);\n    s.setProperty(\"--bd\", state.borderColor);\n    s.setProperty(\"--ck\", state.checkColor);\n    s.setProperty(\"--r\", state.radius + \"%\");\n  }\n\n  let on = false;\n  function toggle() {\n    on = !on;\n    ck.classList.toggle(\"on\", on);\n    ck.setAttribute(\"aria-checked\", on);\n  }\n  ck.addEventListener(\"click\", toggle);\n  ck.addEventListener(\"keydown\", (e) => {\n    if (e.key === \" \" || e.key === \"Enter\") { e.preventDefault(); toggle(); }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v106",
    标题: "液态滑块",
    分类: "组件",
    子类: "开关",
    风格: [],
    场景: ["通用模块区", "后台·数据看板"],
    元素: ["动效", "视觉"],
    搭配: [
      "数字滚动"
    ],
    标签: [
      "滑块",
      "数值",
      "同频",
      "表单"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/液态滑块.html",
    参数: [
      {
        键: "dur",
        名: "数值动画时长（秒）",
        类型: "slider",
        最小: 0.05,
        最大: 0.8,
        步长: 0.01,
        默认: 0.2
      },
      {
        键: "color",
        名: "填充颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "track",
        名: "轨道底色",
        类型: "color",
        默认: "#e3e3e3"
      },
      {
        键: "knob",
        名: "滑钮颜色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "width",
        名: "轨道宽度（px）",
        类型: "slider",
        最小: 120,
        最大: 480,
        步长: 10,
        默认: 260
      },
      {
        键: "height",
        名: "轨道粗细（px）",
        类型: "slider",
        最小: 4,
        最大: 20,
        步长: 1,
        默认: 8
      },
      {
        键: "thumb",
        名: "滑钮大小（px）",
        类型: "slider",
        最小: 14,
        最大: 44,
        步长: 1,
        默认: 26
      },
      {
        键: "fontSize",
        名: "数值字号（px）",
        类型: "slider",
        最小: 18,
        最大: 64,
        步长: 1,
        默认: 34
      },
      {
        键: "valColor",
        名: "数值颜色",
        类型: "color",
        默认: "#1a1a1a"
      }
    ],
    效果说明: "拖动滑块时，轨道填充、滑钮、数值三样东西用同一个节奏变化：轨道跟着滑钮走，数值滚动后缓停。整体是「一块液体」而不是三个零件。\n能怎么改：拖滑杆调「数值动画时长（秒）、填充颜色、轨道底色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调同频时长、点色块换主色；数值弹出的动画在 .val.pop 里改。",
    提示词: "帮我做一个\"液态滑块\"（纯 HTML/CSS/JS）：\n效果：拖动时轨道填充、滑钮、数值动画同频变化，数值滚动后缓慢停下，保持视觉统一。\n用法示例：\n<input type=\"range\" id=\"rng\" min=\"0\" max=\"100\">\n// 轨道用 linear-gradient 按 --pct 填充，数值切换时加一个轻弹出动画\n关键参数：\n- dur 数值动画时长 / color 填充颜色 / track 轨道底色 / knob 滑钮颜色 / width 轨道宽度 / height 轨道粗细 / thumb 滑钮大小 / fontSize 数值字号 / valColor 数值颜色\n集成步骤：\n1. 复制 assets/demos/液态滑块.html 的样式和 JS\n2. 改 min/max 和主色\n3. 数值要等宽字体（tabular-nums）才不抖",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>液态滑块演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .row { display: flex; align-items: center; gap: 18px; }\n  .val {\n    min-width: 64px; text-align: right; font-weight: 800; font-variant-numeric: tabular-nums;\n    font-size: var(--vfs, 34px); color: var(--vc, #1a1a1a);\n  }\n  input[type=range] {\n    width: var(--w, 260px); height: var(--h, 8px); border-radius: 999px; appearance: none; outline: none; cursor: pointer;\n    background: linear-gradient(to right, var(--fill, #1a1a1a) var(--pct, 50%), var(--track, #e3e3e3) var(--pct, 50%));\n  }\n  input[type=range]::-webkit-slider-thumb {\n    appearance: none; width: var(--thumb, 26px); height: var(--thumb, 26px); border-radius: 50%;\n    background: var(--knob, #fff); border: 3px solid var(--fill, #1a1a1a);\n    box-shadow: 0 2px 6px rgba(0,0,0,.18); transition: transform var(--dur, .2s) ease;\n  }\n  input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.15); }\n  /* 数值切换：从旧值滚动到新值，不突然跳变 */\n  .val.pop { animation: valPop var(--dur, .2s) ease; }\n  @keyframes valPop {\n    0% { transform: translateY(0); opacity: 1; }\n    40% { transform: translateY(8px); opacity: 0; }\n    60% { transform: translateY(-8px); opacity: 0; }\n    100% { transform: translateY(0); opacity: 1; }\n  }\n</style>\n</head>\n<body>\n<div class=\"row\">\n  <input type=\"range\" id=\"rng\" min=\"0\" max=\"100\" value=\"50\">\n  <div class=\"val\" id=\"val\">50</div>\n</div>\n<p class=\"hint\">拖动：轨道填充、滑钮、数值动画同频，数值滚动后缓停不突兀</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.2, color: \"#1a1a1a\", track: \"#e3e3e3\", knob: \"#ffffff\",\n    width: 260, height: 8, thumb: 26, fontSize: 34, valColor: \"#1a1a1a\"\n  };\n  const rng = document.getElementById(\"rng\");\n  const val = document.getElementById(\"val\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--fill\", state.color);\n    s.setProperty(\"--track\", state.track);\n    s.setProperty(\"--knob\", state.knob);\n    s.setProperty(\"--w\", state.width + \"px\");\n    s.setProperty(\"--h\", state.height + \"px\");\n    s.setProperty(\"--thumb\", state.thumb + \"px\");\n    s.setProperty(\"--vfs\", state.fontSize + \"px\");\n    s.setProperty(\"--vc\", state.valColor);\n  }\n\n  rng.addEventListener(\"input\", () => {\n    rng.style.setProperty(\"--pct\", rng.value + \"%\");\n    val.textContent = rng.value;\n    val.classList.remove(\"pop\");\n    void val.offsetWidth; // 重启动画\n    val.classList.add(\"pop\");\n  });\n  rng.style.setProperty(\"--pct\", \"50%\");\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v107",
    标题: "数字滚动",
    分类: "文字动画",
    子类: "数字滚动",
    风格: ["科技"],
    场景: ["后台·数据看板"],
    元素: ["动效"],
    搭配: [
      "骨架落位"
    ],
    标签: [
      "数字"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/数字滚动.html",
    参数: [
      {
        键: "target",
        名: "目标数字",
        类型: "number",
        默认: 8848
      },
      {
        键: "dur",
        名: "滚动时长（秒）",
        类型: "slider",
        最小: 0.3,
        最大: 5,
        步长: 0.1,
        默认: 1.6
      },
      {
        键: "easing",
        名: "停法",
        类型: "select",
        选项: [
          "先快后慢",
          "匀速",
          "回弹过头"
        ],
        默认: "先快后慢"
      },
      {
        键: "prefix",
        名: "数字前缀（如 ¥）",
        类型: "string",
        默认: ""
      },
      {
        键: "fontSize",
        名: "数字字号（px）",
        类型: "slider",
        最小: 24,
        最大: 120,
        步长: 1,
        默认: 56
      },
      {
        键: "numColor",
        名: "数字颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "btnBg",
        名: "按钮底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "btnColor",
        名: "按钮文字色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：用逐字 / 逐行的揭示节奏引导阅读视线，文字本身就是视觉主角，留白与位移决定情绪的轻重。\n数字从 0 滚到目标值时，开头冲得快、结尾像表针一样慢慢停稳。避免突然刹停的生硬感，数据跳出来也有仪式感。\n能怎么改：拖滑杆调「目标数字、滚动时长（秒）、停法」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调目标数字、滚动时长；缓动曲线在 JS 的 easeOutQuint 里换（easeOutCubic 更线性、easeOutExpo 更激进）。",
    提示词: "帮我做一个\"数字滚动\"（纯 HTML/CSS/JS）：\n效果：数字从 0 滚动到目标值，用 easeOutQuint 缓动——开头快、结尾慢慢停稳，不突然刹停。\n用法示例：\n<div class=\"num\">0</div>\n// requestAnimationFrame + easeOutQuint(t) 算中间值，写入 textContent\n关键参数：\n- target 目标数字 / dur 滚动时长 / easing 停法 / prefix 数字前缀 / fontSize 数字字号 / numColor 数字颜色 / btnBg 按钮底色 / btnColor 按钮文字色\n集成步骤：\n1. 复制 assets/demos/数字滚动.html 的 JS\n2. 用在统计数字、数据面板、评分\n3. 数字要等宽字体，避免滚动时宽度抖动",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>数字滚动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .num { font-size: var(--fs, 56px); font-weight: 800; font-variant-numeric: tabular-nums; min-width: 200px; text-align: center; color: var(--nc, #1a1a1a); }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--bb, #1a1a1a); color: var(--bc, #fff);\n    font-size: 15px; font-weight: 700; letter-spacing: 2px;\n    padding: 12px 32px; border-radius: 10px;\n  }\n</style>\n</head>\n<body>\n<div class=\"num\" id=\"num\">0</div>\n<button class=\"btn\" id=\"btn\">重新滚动</button>\n<p class=\"hint\">数字从 0 滚到目标，最后缓慢停下——不是突然刹停</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    target: 8848, dur: 1.6, easing: \"先快后慢\", prefix: \"\",\n    fontSize: 56, numColor: \"#1a1a1a\", btnBg: \"#1a1a1a\", btnColor: \"#ffffff\"\n  };\n  const num = document.getElementById(\"num\");\n  const root = document.documentElement;\n  let raf = 0;\n\n  // 三种停法：先快后慢 / 匀速 / 回弹过头\n  const EASE = {\n    \"先快后慢\": t => 1 - Math.pow(1 - t, 5),\n    \"匀速\": t => t,\n    \"回弹过头\": t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }\n  };\n\n  function roll() {\n    cancelAnimationFrame(raf);\n    const start = performance.now();\n    const from = 0, to = state.target, dur = state.dur * 1000;\n    const ease = EASE[state.easing] || EASE[\"先快后慢\"];\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      num.textContent = state.prefix + Math.round(from + (to - from) * ease(t));\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n    s.setProperty(\"--nc\", state.numColor);\n    s.setProperty(\"--bb\", state.btnBg);\n    s.setProperty(\"--bc\", state.btnColor);\n    roll(); // 数字相关参数变了就重滚一遍，立刻看到效果\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", roll);\n  roll();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v108",
    标题: "骨架落位",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简"],
    场景: ["内容·阅读", "工具·SaaS"],
    元素: ["视觉"],
    搭配: [
      "数字滚动"
    ],
    标签: [
      "加载",
      "骨架屏",
      "防跳动"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/骨架落位.html",
    参数: [
      {
        键: "dur",
        名: "流光扫过周期（秒）",
        类型: "slider",
        最小: 0.3,
        最大: 3,
        步长: 0.05,
        默认: 1.1
      },
      {
        键: "wait",
        名: "加载等待时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 5,
        步长: 0.1,
        默认: 1.4
      },
      {
        键: "base",
        名: "骨架底色",
        类型: "color",
        默认: "#f0f0f0"
      },
      {
        键: "highlight",
        名: "流光高亮色",
        类型: "color",
        默认: "#e4e4e4"
      },
      {
        键: "cardBg",
        名: "卡片底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "cardWidth",
        名: "卡片宽度（px）",
        类型: "slider",
        最小: 200,
        最大: 460,
        步长: 10,
        默认: 300
      },
      {
        键: "radius",
        名: "卡片圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 28,
        步长: 1,
        默认: 14
      },
      {
        键: "btnBg",
        名: "按钮底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "btnColor",
        名: "按钮文字色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n内容加载前显示骨架条，骨架条的高度和真实内容一样高，所以加载完内容原位出现、页面不跳动。防止用户眼睛追着内容跑。\n能怎么改：拖滑杆调「流光扫过周期（秒）、加载等待时长（秒）、骨架底色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调流光速度、加载等待；骨架条数量在 .skeleton 里增删，真实内容高度要和骨架一致。",
    提示词: "帮我做一个\"骨架屏\"加载（纯 HTML/CSS/JS）：\n效果：加载时显示骨架条，骨架高度与真实内容一致，加载完成后内容原位落位不跳动。\n用法示例：\n<div class=\"card\">\n  <div class=\"skeleton\">…骨架条…</div>\n  <div class=\"content\">…真实内容…</div>\n</div>\n// .loaded 时隐藏骨架、显示内容；骨架条高度对齐真实内容\n关键参数：\n- dur 流光扫过周期 / wait 加载等待时长 / base 骨架底色 / highlight 流光高亮色 / cardBg 卡片底色 / cardWidth 卡片宽度 / radius 卡片圆角 / btnBg 按钮底色 / btnColor 按钮文字色\n集成步骤：\n1. 复制 assets/demos/骨架落位.html 的结构和流光动画\n2. 骨架条高度和真实内容行高对齐（防 CLS）\n3. 深色主题把流光颜色调暗",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>骨架落位演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .card {\n    width: var(--cw, 300px); border: 1px solid #eee; border-radius: var(--r, 14px); padding: 18px;\n    background: var(--cb, #fff); box-shadow: 0 6px 16px rgba(0,0,0,.05);\n    transition: width .2s ease;\n  }\n  /* 骨架条：高度与真实内容一致，所以加载完不会跳动 */\n  .skeleton .bar {\n    height: 16px; border-radius: 8px; margin-bottom: 10px;\n    background: linear-gradient(90deg, var(--base, #f0f0f0) 25%, var(--hi, #e4e4e4) 50%, var(--base, #f0f0f0) 75%);\n    background-size: 200% 100%; animation: shimmer var(--dur, 1.1s) infinite linear;\n  }\n  @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }\n  .skeleton .title-bar { width: 55%; height: 20px; margin-bottom: 14px; }\n  .skeleton .line-s { width: 40%; }\n  /* 真实内容：骨架占位时不可见，加载完成后原位出现（不跳动） */\n  .content { display: none; }\n  .card.loaded .content { display: block; animation: fadeIn .25s ease; }\n  .card.loaded .skeleton { display: none; }\n  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n  .btn {\n    margin-top: 8px; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--bb, #1a1a1a); color: var(--bc, #fff); font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\">\n  <div class=\"skeleton\">\n    <div class=\"bar title-bar\"></div>\n    <div class=\"bar\"></div>\n    <div class=\"bar\"></div>\n    <div class=\"bar line-s\"></div>\n  </div>\n  <div class=\"content\">\n    <h3 style=\"font-size:17px;margin-bottom:8px\">加载完成 ✓</h3>\n    <p style=\"font-size:13px;color:#666\">骨架条高度和这一行内容一样高，所以内容出现时页面纹丝不动。</p>\n  </div>\n</div>\n<button class=\"btn\" id=\"btn\">重新加载</button>\n<p class=\"hint\">加载中显示骨架 → 内容原位落位，不跳动</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 1.1, wait: 1.4, base: \"#f0f0f0\", highlight: \"#e4e4e4\",\n    cardBg: \"#ffffff\", cardWidth: 300, radius: 14, btnBg: \"#1a1a1a\", btnColor: \"#ffffff\"\n  };\n  const card = document.getElementById(\"card\");\n  const root = document.documentElement;\n  let timer = 0;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--base\", state.base);\n    s.setProperty(\"--hi\", state.highlight);\n    s.setProperty(\"--cb\", state.cardBg);\n    s.setProperty(\"--cw\", state.cardWidth + \"px\");\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--bb\", state.btnBg);\n    s.setProperty(\"--bc\", state.btnColor);\n    // 尺寸变了就重新演一遍，保证骨架/内容落位关系可见\n    load();\n  }\n\n  function load() {\n    clearTimeout(timer);\n    card.classList.remove(\"loaded\");\n    timer = setTimeout(() => card.classList.add(\"loaded\"), state.wait * 1000);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", load);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v109",
    标题: "卡片翻面",
    分类: "动效",
    子类: "悬停",
    风格: ["轻盈"],
    场景: ["落地页·发布页", "通用模块区"],
    元素: ["动效"],
    搭配: [
      "产品卡悬停"
    ],
    标签: [
      "3D",
      "翻转",
      "卡片"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/卡片翻面.html",
    参数: [
      {
        键: "dur",
        名: "翻面时长（秒）",
        类型: "slider",
        最小: 0.15,
        最大: 2,
        步长: 0.01,
        默认: 0.6
      },
      {
        键: "size",
        名: "卡片宽度（px）",
        类型: "slider",
        最小: 140,
        最大: 360,
        步长: 5,
        默认: 220
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 16
      },
      {
        键: "dir",
        名: "翻转方向",
        类型: "select",
        选项: [
          "左右翻",
          "上下翻"
        ],
        默认: "左右翻"
      },
      {
        键: "frontBg",
        名: "正面底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "frontColor",
        名: "正面文字色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "backBg",
        名: "背面底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "backColor",
        名: "背面文字/边框色",
        类型: "color",
        默认: "#1a1a1a"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n卡片沿中线 3D 翻转，正面翻走、背面翻来。正反两面都隐藏自己的背面（backface-visibility），翻到一半时不会看到对面那张穿帮。\n能怎么改：拖滑杆调「翻面时长（秒）、卡片宽度（px）、圆角（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调翻转时长；正反面内容分别写在 .front / .back 里；想翻转角度不是 180° 就改 rotateY。",
    提示词: "帮我做一个\"卡片翻面\"（纯 HTML/CSS/JS）：\n效果：卡片沿中线 3D 翻转，正反两面都设 backface-visibility:hidden，翻面互不穿帮。\n用法示例：\n<div class=\"card3d\"><div class=\"face front\">正面</div><div class=\"face back\">背面</div></div>\n// .card3d 设 transform-style:preserve-3d，.flip 时 rotateY(180deg)\n关键参数：\n- dur 翻面时长 / size 卡片宽度 / radius 圆角 / dir 翻转方向 / frontBg 正面底色 / frontColor 正面文字色 / backBg 背面底色 / backColor 背面文字/边框色\n集成步骤：\n1. 复制 assets/demos/卡片翻面.html 的 CSS（3D 三件套：perspective / preserve-3d / backface-visibility）\n2. 正反面内容分别放两个 .face\n3. 翻转角度要别的就改 rotateY",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片翻面演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    perspective: 1200px;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .card3d {\n    width: var(--w, 220px); height: var(--h, 300px); cursor: pointer; position: relative;\n    transform-style: preserve-3d;\n    transition: transform var(--dur, .6s) cubic-bezier(.34,1.3,.5,1);\n  }\n  /* 翻转轴由参数决定：rotateY（左右）或 rotateX（上下） */\n  .card3d.flip { transform: var(--rot, rotateY(180deg)); }\n  /* 关键：正反两面都隐藏自己的背面，翻面时不会把另一面照穿 */\n  .face {\n    position: absolute; inset: 0; border-radius: var(--r, 16px);\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;\n    backface-visibility: hidden; -webkit-backface-visibility: hidden;\n    font-weight: 700;\n  }\n  .front { background: var(--fb, #1a1a1a); color: var(--fc, #fff); }\n  .back { background: var(--bb, #fff); border: 2px solid var(--bc, #1a1a1a); color: var(--bc, #1a1a1a); transform: var(--rot, rotateY(180deg)); }\n  .sub { font-size: 12px; font-weight: 400; opacity: .7; }\n</style>\n</head>\n<body>\n<div class=\"card3d\" id=\"card\" tabindex=\"0\">\n  <div class=\"face front\">正面<span class=\"sub\">点我翻面</span></div>\n  <div class=\"face back\">背面<span class=\"sub\">再点翻回去</span></div>\n</div>\n<p class=\"hint\">点卡片：整张沿中线翻转，正反两面互不穿帮</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.6, size: 220, radius: 16, dir: \"左右翻\",\n    frontBg: \"#1a1a1a\", frontColor: \"#ffffff\", backBg: \"#ffffff\", backColor: \"#1a1a1a\"\n  };\n  const card = document.getElementById(\"card\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--w\", state.size + \"px\");\n    s.setProperty(\"--h\", Math.round(state.size * 300 / 220) + \"px\"); // 保持 220:300 比例\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--rot\", state.dir === \"上下翻\" ? \"rotateX(180deg)\" : \"rotateY(180deg)\");\n    s.setProperty(\"--fb\", state.frontBg);\n    s.setProperty(\"--fc\", state.frontColor);\n    s.setProperty(\"--bb\", state.backBg);\n    s.setProperty(\"--bc\", state.backColor);\n  }\n  function flip() { card.classList.toggle(\"flip\"); }\n  card.addEventListener(\"click\", flip);\n  card.addEventListener(\"keydown\", (e) => {\n    if (e.key === \" \" || e.key === \"Enter\") { e.preventDefault(); flip(); }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v110",
    标题: "汉堡变叉",
    分类: "动效",
    子类: "按压",
    风格: ["极简"],
    场景: ["移动端", "通用模块区"],
    元素: ["动效"],
    搭配: [
      "底部抽屉"
    ],
    标签: [
      "菜单",
      "图标",
      "变形",
      "导航"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/汉堡变叉.html",
    参数: [
      {
        键: "dur",
        名: "变形时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 1,
        步长: 0.01,
        默认: 0.32
      },
      {
        键: "size",
        名: "按钮大小（px）",
        类型: "slider",
        最小: 36,
        最大: 96,
        步长: 1,
        默认: 56
      },
      {
        键: "thick",
        名: "线条粗细（px）",
        类型: "slider",
        最小: 2,
        最大: 6,
        步长: 0.5,
        默认: 3
      },
      {
        键: "gap",
        名: "线条间距（px）",
        类型: "slider",
        最小: 3,
        最大: 14,
        步长: 1,
        默认: 7
      },
      {
        键: "radius",
        名: "按钮圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 30,
        步长: 1,
        默认: 12
      },
      {
        键: "bgColor",
        名: "按钮底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "lineColor",
        名: "线条颜色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "pressColor",
        名: "按下时底色",
        类型: "color",
        默认: "#333333"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n菜单按钮在汉堡（三横线）和关闭（叉）之间切换时，用同一个元件原地变形：上下两条线旋转合拢、中间线缩没。用户不会丢掉操作位置。\n能怎么改：拖滑杆调「变形时长（秒）、按钮大小（px）、线条粗细（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调变形时长；线的粗细、长度、颜色在 CSS 的 .burger span 里改；三条线的位移量要按线条间距算好。",
    提示词: "帮我做一个\"汉堡变叉\"菜单图标（纯 HTML/CSS/JS）：\n效果：用单个元件（三条线）完成汉堡↔叉的切换，上下线旋转合拢、中线缩没，避免用户丢失操作位置。\n用法示例：\n<div class=\"burger\"><span></span><span></span><span></span></div>\n// .open 时：第1条 translateY+rotate(45deg)，第2条 scaleX(0)，第3条 translateY-rotate(-45deg)\n关键参数：\n- dur 变形时长 / size 按钮大小 / thick 线条粗细 / gap 线条间距 / radius 按钮圆角 / bgColor 按钮底色 / lineColor 线条颜色 / pressColor 按下时底色\n集成步骤：\n1. 复制 assets/demos/汉堡变叉.html 的 CSS\n2. 三条线的位移量 = 线间距，按你的尺寸重算\n3. 配 aria-label 和键盘事件保证可访问性",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>汉堡变叉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .burger {\n    width: var(--size, 56px); height: var(--size, 56px); border-radius: var(--r, 12px);\n    cursor: pointer; user-select: none;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--gap, 7px);\n    background: var(--bg, #1a1a1a); transition: background .2s ease;\n  }\n  .burger:active { background: var(--pr, #333); }\n  /* 单个元件（三条线）完成汉堡↔叉的切换，操作位置不丢；--off = 间距+线粗 */\n  .burger span {\n    width: var(--line, 28px); height: var(--th, 3px); border-radius: 3px; background: var(--lc, #fff);\n    transition: transform var(--dur, .32s) ease, opacity var(--dur, .32s) ease;\n  }\n  .burger.open span:nth-child(1) { transform: translateY(var(--off, 10px)) rotate(45deg); }\n  .burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }\n  .burger.open span:nth-child(3) { transform: translateY(calc(-1 * var(--off, 10px))) rotate(-45deg); }\n</style>\n</head>\n<body>\n<div class=\"burger\" id=\"bg\" role=\"button\" aria-label=\"菜单\" tabindex=\"0\">\n  <span></span><span></span><span></span>\n</div>\n<p class=\"hint\">点一下：汉堡三条线原地变成叉，没有新元素顶替</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.32, size: 56, thick: 3, gap: 7, radius: 12,\n    bgColor: \"#1a1a1a\", lineColor: \"#ffffff\", pressColor: \"#333333\"\n  };\n  const bg = document.getElementById(\"bg\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--size\", state.size + \"px\");\n    s.setProperty(\"--th\", state.thick + \"px\");\n    s.setProperty(\"--gap\", state.gap + \"px\");\n    // 汇合距离 = 间距 + 线粗，变叉时上下两条线正好在中线相交\n    s.setProperty(\"--off\", (state.gap + state.thick) + \"px\");\n    s.setProperty(\"--line\", Math.round(state.size / 2) + \"px\"); // 线长随按钮尺寸缩放\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--bg\", state.bgColor);\n    s.setProperty(\"--lc\", state.lineColor);\n    s.setProperty(\"--pr\", state.pressColor);\n  }\n  function toggle() { bg.classList.toggle(\"open\"); }\n  bg.addEventListener(\"click\", toggle);\n  bg.addEventListener(\"keydown\", (e) => {\n    if (e.key === \" \" || e.key === \"Enter\") { e.preventDefault(); toggle(); }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v111",
    标题: "卡片抽走",
    分类: "动效",
    子类: "入场出场",
    风格: ["通用"],
    场景: ["通用模块区"],
    元素: ["动效", "视觉"],
    搭配: [
      "卡片翻面"
    ],
    标签: [
      "卡片",
      "堆叠",
      "抽卡",
      "层级"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/卡片抽走.html",
    参数: [
      {
        键: "dur",
        名: "抽走时长（秒）",
        类型: "slider",
        最小: 0.15,
        最大: 1.2,
        步长: 0.01,
        默认: 0.4
      },
      {
        键: "offset",
        名: "堆叠偏移（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 8
      },
      {
        键: "flyX",
        名: "抽走横移（px）",
        类型: "slider",
        最小: -400,
        最大: 400,
        步长: 10,
        默认: 220
      },
      {
        键: "flyY",
        名: "抽走纵移（px）",
        类型: "slider",
        最小: -300,
        最大: 300,
        步长: 5,
        默认: -60
      },
      {
        键: "rotate",
        名: "抽走旋转（度）",
        类型: "slider",
        最小: -60,
        最大: 60,
        步长: 1,
        默认: 18
      },
      {
        键: "shrink",
        名: "抽走缩小到（倍）",
        类型: "slider",
        最小: 0.5,
        最大: 1,
        步长: 0.01,
        默认: 0.85
      },
      {
        键: "radius",
        名: "卡片圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 1,
        默认: 16
      },
      {
        键: "cardWidth",
        名: "卡片宽度（px）",
        类型: "slider",
        最小: 160,
        最大: 340,
        步长: 5,
        默认: 240
      },
      {
        键: "topBg",
        名: "顶卡底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "topColor",
        名: "顶卡文字色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n卡片堆叠时，点最上面的卡它向旁边抽走让位，露出下面压着的卡。堆叠关系看得懂，抽走的过程本身就是操作反馈。\n能怎么改：拖滑杆调「抽走时长（秒）、堆叠偏移（px）、抽走横移（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调抽走时长；卡片张数和底色在 HTML 里改；抽走的位移/旋转角度在 .gone 里调。",
    提示词: "帮我做一个\"卡片抽走\"堆叠效果（纯 HTML/CSS/JS）：\n效果：点最上面的卡片，它向旁边抽走（位移+旋转+淡出），露出下面压着的卡片，强化堆叠逻辑。\n用法示例：\n<div class=\"deck\"><div class=\"pcard\">…</div>×N</div>\n// 点顶层 .pcard 加 .gone（translate+rotate+opacity 0），其余卡自动浮正\n关键参数：\n- dur 抽走时长 / offset 堆叠偏移 / flyX 抽走横移 / flyY 抽走纵移 / rotate 抽走旋转 / shrink 抽走缩小到 / radius 卡片圆角 / cardWidth 卡片宽度 / topBg 顶卡底色 / topColor 顶卡文字色\n集成步骤：\n1. 复制 assets/demos/卡片抽走.html 的结构和动画\n2. 换卡片数量、内容、底色\n3. 想做\"抽卡\"玩法就换成随机角度飞走",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片抽走演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .deck { position: relative; }\n  .pcard {\n    position: absolute; inset: 0; border-radius: var(--r, 16px); cursor: pointer; user-select: none;\n    display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px;\n    transition: transform var(--dur, .4s) cubic-bezier(.4,0,.2,1), opacity var(--dur, .4s) ease;\n  }\n  .pcard.top { background: var(--tbg, #1a1a1a); color: var(--tc, #fff); }\n  .pcard.under1 { background: #e8e8e8; color: #1a1a1a; }\n  .pcard.under2 { background: #f5f5f5; color: #1a1a1a; }\n  /* 抽走：上面的卡片移开 + 旋转 + 淡出，露出下面压着的卡 */\n  .pcard.gone {\n    transform: translate(var(--fx, 220px), var(--fy, -60px)) rotate(var(--rot, 18deg)) scale(var(--sh, .85));\n    opacity: 0; pointer-events: none;\n  }\n</style>\n</head>\n<body>\n<div class=\"deck\" id=\"deck\">\n  <div class=\"pcard top\">第 1 张</div>\n  <div class=\"pcard under1\">第 2 张</div>\n  <div class=\"pcard under2\">第 3 张</div>\n</div>\n<p class=\"hint\">点最上面的卡：它抽走让位，露出下面压着的卡，堆叠逻辑看得懂</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.4, offset: 8, flyX: 220, flyY: -60, rotate: 18, shrink: 0.85,\n    radius: 16, cardWidth: 240, topBg: \"#1a1a1a\", topColor: \"#ffffff\"\n  };\n  const deck = document.getElementById(\"deck\");\n  const root = document.documentElement;\n  const cards = [...deck.querySelectorAll(\".pcard\")];\n\n  // 把剩下的卡按堆叠偏移重新压好\n  function restack() {\n    cards.forEach((c, i) => {\n      if (c.classList.contains(\"gone\")) return;\n      c.style.transform = i === 0 ? \"\" :\n        \"translate(\" + i * state.offset + \"px,\" + i * state.offset + \"px) scale(\" + (1 - i * 0.04) + \")\";\n    });\n  }\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--fx\", state.flyX + \"px\");\n    s.setProperty(\"--fy\", state.flyY + \"px\");\n    s.setProperty(\"--rot\", state.rotate + \"deg\");\n    s.setProperty(\"--sh\", state.shrink);\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--tbg\", state.topBg);\n    s.setProperty(\"--tc\", state.topColor);\n    deck.style.width = state.cardWidth + \"px\";\n    deck.style.height = Math.round(state.cardWidth * 320 / 240) + \"px\";\n    restack();\n  }\n\n  deck.addEventListener(\"click\", () => {\n    const top = deck.querySelector(\".pcard:not(.gone)\");\n    if (!top) return;\n    top.classList.add(\"gone\");\n    // 抽出后剩下的卡自动浮正，重新压好\n    restack();\n    setTimeout(() => {\n      if (!deck.querySelector(\".pcard:not(.gone)\")) {\n        // 抽完了：把牌堆还原\n        cards.forEach(c => c.classList.remove(\"gone\"));\n        restack();\n      }\n    }, 1600);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v112",
    标题: "底部抽屉",
    分类: "组件",
    子类: "弹窗抽屉",
    风格: [],
    场景: ["移动端", "通用模块区"],
    元素: ["视觉", "动效"],
    搭配: [
      "半屏停留"
    ],
    标签: [
      "抽屉",
      "停顿"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/底部抽屉.html",
    参数: [
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.15,
        最大: 1.2,
        步长: 0.01,
        默认: 0.38
      },
      {
        键: "outDur",
        名: "收起时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 1,
        步长: 0.01,
        默认: 0.26
      },
      {
        键: "height",
        名: "抽屉高度（px）",
        类型: "slider",
        最小: 120,
        最大: 520,
        步长: 10,
        默认: 240
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 20
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "maskOpacity",
        名: "遮罩浓度（0~1）",
        类型: "slider",
        最小: 0,
        最大: 0.9,
        步长: 0.05,
        默认: 0.35
      },
      {
        键: "drawerBg",
        名: "抽屉底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "titleColor",
        名: "标题颜色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "handle",
        名: "显示顶部手柄",
        类型: "switch",
        默认: true
      }
    ],
    效果说明: "底部面板滑出时，在快到位的位置顿一下再完全展开（关键帧停顿）。状态变化有节奏，用户更容易看清「它停在哪了」。\n能怎么改：拖滑杆调「展开时长（秒）、收起时长（秒）、抽屉高度（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调展开时长；停顿的位置和幅度在 drawerIn 的 55% / 70% 两个关键帧里改；遮罩深浅在 .mask.show 里调。",
    提示词: "帮我做一个\"底部抽屉\"（纯 HTML/CSS/JS）：\n效果：底部面板滑出时在快到位处设置关键帧停顿（55% 停一下、70% 再落定），让状态更易被识别。\n用法示例：\n<div class=\"drawer in\">…内容…</div>\n// drawerIn keyframes：55% 停、70% 微回、100% 落定；遮罩同步淡入\n关键参数：\n- dur 展开时长 / outDur 收起时长 / height 抽屉高度 / radius 顶部圆角 / maskColor 遮罩颜色 / maskOpacity 遮罩浓度 / drawerBg 抽屉底色 / titleColor 标题颜色 / handle 显示顶部手柄\n集成步骤：\n1. 复制 assets/demos/底部抽屉.html 的 keyframes 和遮罩逻辑\n2. 换抽屉高度和内容\n3. 想更强调停顿就把 55% 那帧拉长",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>底部抽屉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 遮罩：颜色 + 浓度分两个变量，透明度直接参与过渡 */\n  .mask {\n    position: fixed; inset: 0; background: var(--mc, #000000); opacity: 0; pointer-events: none;\n    transition: opacity var(--dur, .3s) ease;\n  }\n  .mask.show { opacity: var(--mo, .35); pointer-events: auto; }\n  .drawer {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 240px);\n    border-radius: var(--r, 20px) var(--r, 20px) 0 0;\n    background: var(--db, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,.12);\n    transform: translateY(105%);\n  }\n  /* 关键帧停顿：滑到露出大半时顿一下，再完全展开——状态更容易被识别 */\n  .drawer.in { animation: drawerIn var(--dur, .38s) ease-out forwards; }\n  .drawer.out { animation: drawerOut var(--od, .26s) ease-in forwards; }\n  @keyframes drawerIn {\n    0%   { transform: translateY(105%); }\n    55%  { transform: translateY(12%); }\n    70%  { transform: translateY(6%); }\n    100% { transform: translateY(0); }\n  }\n  @keyframes drawerOut { to { transform: translateY(105%); } }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: #ddd; margin: 10px auto 0; }\n  .title { text-align: center; font-weight: 800; font-size: 17px; margin-top: 12px; color: var(--tc, #1a1a1a); }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开抽屉</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"drawer\" id=\"drawer\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"title\">底部抽屉</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">展开到一半顿一下，再完全落位</p>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38, outDur: 0.26, height: 240, radius: 20,\n    maskColor: \"#000000\", maskOpacity: 0.35, drawerBg: \"#ffffff\", titleColor: \"#1a1a1a\", handle: true\n  };\n  const mask = document.getElementById(\"mask\");\n  const drawer = document.getElementById(\"drawer\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--od\", state.outDur + \"s\");\n    s.setProperty(\"--h\", state.height + \"px\");\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--mc\", state.maskColor);\n    s.setProperty(\"--mo\", state.maskOpacity);\n    s.setProperty(\"--db\", state.drawerBg);\n    s.setProperty(\"--tc\", state.titleColor);\n    document.getElementById(\"handle\").style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() {\n    drawer.classList.remove(\"out\");\n    drawer.classList.add(\"in\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    drawer.classList.remove(\"in\");\n    drawer.classList.add(\"out\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v113",
    标题: "半屏停留",
    分类: "组件",
    子类: "弹窗抽屉",
    风格: [],
    场景: ["移动端", "通用模块区"],
    元素: ["视觉"],
    搭配: [
      "底部抽屉"
    ],
    标签: [
      "底部弹层",
      "半屏",
      "层级"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/半屏停留.html",
    参数: [
      {
        键: "height",
        名: "弹层高度（vh）",
        类型: "slider",
        最小: 20,
        最大: 90,
        步长: 5,
        默认: 50
      },
      {
        键: "mask",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.25
      },
      {
        键: "dur",
        名: "弹出时长（秒）",
        类型: "slider",
        最小: 0.15,
        最大: 0.8,
        步长: 0.05,
        默认: 0.35
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 2,
        默认: 20
      },
      {
        键: "shadow",
        名: "投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.4,
        步长: 0.02,
        默认: 0.12
      },
      {
        键: "handle",
        名: "显示顶部手柄",
        类型: "switch",
        默认: true
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "sheetBg",
        名: "弹层底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "handleColor",
        名: "手柄颜色",
        类型: "color",
        默认: "#dddddd"
      },
      {
        键: "titleColor",
        名: "标题文字颜色",
        类型: "color",
        默认: "#1a1a1a"
      }
    ],
    效果说明: "弹层展开后停在半屏位置，底部页面始终露出可见区域。用户知道弹层下面还有内容、自己没离开当前页面，层级感强。\n能怎么改：拖滑杆调「弹层高度（vh）、遮罩浓度、弹出时长（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调停留高度、遮罩深浅；停留高度按内容量定——内容少就 40%、表单多就 60%。",
    提示词: "帮我做一个\"半屏停留\"弹层（纯 HTML/CSS/JS）：\n效果：弹层展开后停留在半屏高度，重点保留底层页面可见区域，强化层级感知。\n用法示例：\n<div class=\"sheet\"><div class=\"handle\"></div>…内容…</div>\n// .sheet 固定 bottom:0、height:50vh，加淡遮罩但不盖满\n关键参数：\n- height 弹层高度 / mask 遮罩浓度 / dur 弹出时长 / radius 顶部圆角 / shadow 投影浓度 / handle 显示顶部手柄 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色 / titleColor 标题文字颜色\n集成步骤：\n1. 复制 assets/demos/半屏停留.html 的结构\n2. 按内容量调停留高度\n3. 配拖拽关闭（v117）就是完整的手势弹层",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>半屏停留演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 底层页面：始终保留可见区域，半屏弹层不遮完 */\n  .bg { position: fixed; inset: 0; padding: 60px 40px; }\n  .bg-card {\n    background: #f5f5f5; border-radius: 16px; padding: 24px;\n    max-width: 320px; margin: 0 auto;\n  }\n  .bg-card h3 { font-size: 16px; margin-bottom: 10px; }\n  .bg-card p { font-size: 13px; color: #666; line-height: 1.7; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.25)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--h, 50vh); border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%); transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; color: var(--titlec, #1a1a1a); }\n</style>\n</head>\n<body>\n<div class=\"bg\">\n  <div class=\"bg-card\">\n    <h3>底层页面</h3>\n    <p>弹层只盖住一半，底下的内容始终露着——用户知道自己在哪层，层级感不丢。</p>\n  </div>\n</div>\n<button class=\"btn\" id=\"open\">打开半屏弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">半屏停留</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">重点保留底层可见区域</p>\n</div>\n<p class=\"hint\">弹层停在半屏，底层页面仍然可见</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    height: 50,        // 弹层高度（vh）\n    mask: 0.25,        // 遮罩浓度\n    dur: 0.35,         // 弹出时长（秒）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    handle: true,      // 是否显示顶部手柄\n    maskColor: \"#000000\", // 遮罩颜色\n    sheetBg: \"#ffffff\",   // 弹层底色\n    handleColor: \"#dddddd\", // 手柄颜色\n    titleColor: \"#1a1a1a\"  // 标题文字颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba，用于遮罩色 + 浓度合成\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--h\", state.height + \"vh\");\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask)); // 颜色+浓度都生效\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--titlec\", state.titleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v114",
    标题: "全屏展开",
    分类: "组件",
    子类: "弹窗抽屉",
    风格: [],
    场景: ["移动端", "落地页·发布页"],
    元素: ["视觉"],
    搭配: [
      "半屏停留"
    ],
    标签: [
      "全屏",
      "圆角",
      "过渡"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/全屏展开.html",
    参数: [
      {
        键: "dur",
        名: "过渡时长（秒）",
        类型: "slider",
        最小: 0.15,
        最大: 0.8,
        步长: 0.01,
        默认: 0.38
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 2,
        默认: 16
      },
      {
        键: "half",
        名: "半屏高度（vh）",
        类型: "slider",
        最小: 25,
        最大: 85,
        步长: 5,
        默认: 50
      },
      {
        键: "shadow",
        名: "投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.4,
        步长: 0.02,
        默认: 0.12
      },
      {
        键: "handle",
        名: "显示顶部手柄",
        类型: "switch",
        默认: true
      },
      {
        键: "mask",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.4
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "sheetBg",
        名: "弹层底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "handleColor",
        名: "手柄颜色",
        类型: "color",
        默认: "#dddddd"
      },
      {
        键: "titleColor",
        名: "标题文字颜色",
        类型: "color",
        默认: "#1a1a1a"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n弹层从半屏展开到全屏时，圆角同步归零、抓手位置同步调整。看起来是同一个面板长高了，而不是换了两个控件，视觉统一。\n能怎么改：拖滑杆调「过渡时长（秒）、顶部圆角（px）、半屏高度（vh）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调过渡时长、半屏圆角；全屏时想保留一点圆角就改 .sheet.full 的 border-radius。",
    提示词: "帮我做一个\"全屏展开\"弹层（纯 HTML/CSS/JS）：\n效果：弹层从半屏展开到全屏时，圆角与抓手位置同步调整，维持面板视觉统一性。\n用法示例：\n<div class=\"sheet full\">…</div>\n// .sheet 默认半屏圆角，.full 时 height:100% + border-radius:0 + 抓手位置调整\n关键参数：\n- dur 过渡时长 / radius 顶部圆角 / half 半屏高度 / shadow 投影浓度 / handle 显示顶部手柄 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色 / titleColor 标题文字颜色\n集成步骤：\n1. 复制 assets/demos/全屏展开.html 的样式\n2. 圆角/抓手要和半屏状态一起过渡，别跳变\n3. 配转场衔接（v120）可以延伸成新页面",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>全屏展开演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .35s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.4)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--half, 50vh); border-radius: var(--radius, 16px) var(--radius, 16px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: height var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                border-radius var(--dur, .38s) ease,\n                transform var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1));\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 全屏时：圆角归零、抓手移到顶部缩成一条，视觉统一不穿帮 */\n  .sheet.full { height: 100%; border-radius: 0; }\n  .handle {\n    width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd);\n    margin: 10px auto 0; transition: transform var(--dur, .38s) ease, margin var(--dur, .38s) ease;\n  }\n  .sheet.full .handle { transform: translateY(6px) scaleX(6); margin-top: 6px; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; color: var(--titlec, #1a1a1a); }\n  .full-btn {\n    display: block; margin: 18px auto 0; cursor: pointer; user-select: none; border: none;\n    background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 700;\n    padding: 8px 20px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">半屏 → 全屏</div>\n  <button class=\"full-btn\" id=\"full\">展开全屏</button>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">圆角与抓手同步调整，视觉保持统一</p>\n</div>\n<p class=\"hint\">先半屏弹出，点「展开全屏」看过渡</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38,           // 过渡时长（秒）\n    radius: 16,          // 半屏时顶部圆角（px）\n    half: 50,            // 半屏高度（vh）\n    shadow: 0.12,        // 投影浓度\n    handle: true,        // 是否显示顶部手柄\n    mask: 0.4,           // 遮罩浓度\n    maskColor: \"#000000\",   // 遮罩颜色\n    sheetBg: \"#ffffff\",     // 弹层底色\n    handleColor: \"#dddddd\", // 手柄颜色\n    titleColor: \"#1a1a1a\"   // 标题文字颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--half\", state.half + \"vh\");\n    R.setProperty(\"--dur\", state.dur + \"s\"); // 时长走 CSS 变量，改动即时生效\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--titlec\", state.titleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\", \"full\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  document.getElementById(\"full\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    sheet.classList.toggle(\"full\");\n  });\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v115",
    标题: "背景处理",
    分类: "组件",
    子类: "弹窗抽屉",
    风格: ["叙事仪式"],
    场景: ["移动端"],
    元素: ["视觉"],
    搭配: [
      "半屏停留"
    ],
    标签: [
      "遮罩",
      "模糊",
      "后退"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/背景处理.html",
    参数: [
      {
        键: "blur",
        名: "底层模糊（px）",
        类型: "slider",
        最小: 0,
        最大: 16,
        步长: 1,
        默认: 6
      },
      {
        键: "scale",
        名: "底层缩小比例",
        类型: "slider",
        最小: 0.8,
        最大: 1,
        步长: 0.01,
        默认: 0.96
      },
      {
        键: "dur",
        名: "过渡时长（秒）",
        类型: "slider",
        最小: 0.15,
        最大: 0.8,
        步长: 0.05,
        默认: 0.35
      },
      {
        键: "dim",
        名: "底层压暗程度（1=不变暗）",
        类型: "slider",
        最小: 0.3,
        最大: 1,
        步长: 0.01,
        默认: 0.72
      },
      {
        键: "sheetH",
        名: "弹层高度（vh）",
        类型: "slider",
        最小: 25,
        最大: 85,
        步长: 5,
        默认: 45
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 2,
        默认: 20
      },
      {
        键: "mask",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.25
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "sheetBg",
        名: "弹层底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "cardBg",
        名: "底层卡片颜色",
        类型: "color",
        默认: "#f0f0f0"
      },
      {
        键: "handleColor",
        名: "手柄颜色",
        类型: "color",
        默认: "#dddddd"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n弹层打开时，底层页面叠加模糊 + 轻微缩小，像真的往后退了一层。比单纯变暗的遮罩更有「前后」的感觉。\n能怎么改：拖滑杆调「底层模糊（px）、底层缩小比例、过渡时长（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调模糊强度、缩小比例、过渡时长；模糊太大会看不清底层，建议 4-8px。",
    提示词: "帮我做\"弹层背景处理\"（纯 HTML/CSS/JS）：\n效果：弹层打开时底层页面叠加模糊 + 轻微缩小，强化「后退一层」的状态。\n用法示例：\n<div class=\"bg away\">…底层内容…</div>\n// .away 时 filter:blur(6px) + transform:scale(.96)，与弹层同过渡时长\n关键参数：\n- blur 底层模糊 / scale 底层缩小比例 / dur 过渡时长 / dim 底层压暗程度 / sheetH 弹层高度 / radius 顶部圆角 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / cardBg 底层卡片颜色 / handleColor 手柄颜色\n集成步骤：\n1. 复制 assets/demos/背景处理.html 的样式\n2. 底层内容套 .bg，打开时加 .away\n3. 手机端模糊别太大，省性能",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>背景处理演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 底层内容：弹层打开时模糊 + 轻微缩小，强化\"退到后面\"的状态 */\n  .bg {\n    position: fixed; inset: 0; padding: 40px;\n    display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;\n    transition: filter var(--dur, .35s) ease, transform var(--dur, .35s) ease;\n  }\n  .bg.away { filter: blur(var(--blur, 6px)) brightness(var(--dim, .72)); transform: scale(var(--scale, .96)); }\n  .mini {\n    background: var(--card, #f0f0f0); border-radius: 14px; padding: 20px;\n    font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center;\n    color: #666; min-height: 120px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background var(--dur, .35s) ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.25)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 45vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%); transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<div class=\"bg\" id=\"bg\">\n  <div class=\"mini\">内容卡片 1</div>\n  <div class=\"mini\">内容卡片 2</div>\n  <div class=\"mini\">内容卡片 3</div>\n  <div class=\"mini\">内容卡片 4</div>\n</div>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">底层已退后</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">模糊 + 缩小，一眼看出它在后面</p>\n</div>\n<p class=\"hint\">弹层打开时，底层页面模糊 + 轻微缩小</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    blur: 6,          // 底层模糊（px）\n    scale: 0.96,      // 底层缩小比例\n    dur: 0.35,        // 过渡时长（秒）\n    dim: 0.72,        // 底层压暗程度（1=不变暗）\n    sheetH: 45,       // 弹层高度（vh）\n    radius: 20,       // 顶部圆角（px）\n    mask: 0.25,       // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    cardBg: \"#f0f0f0\",     // 底层卡片颜色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const bg = document.getElementById(\"bg\");\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--blur\", state.blur + \"px\");\n    R.setProperty(\"--scale\", state.scale);\n    R.setProperty(\"--dim\", state.dim);\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--card\", state.cardBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n  }\n\n  function open() {\n    bg.classList.add(\"away\");\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    bg.classList.remove(\"away\");\n    sheet.classList.remove(\"show\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v116",
    标题: "弹性动效",
    分类: "动效",
    子类: "入场出场",
    风格: ["轻盈"],
    场景: ["移动端"],
    元素: ["动效"],
    搭配: [
      "按压回弹"
    ],
    标签: [
      "弹性",
      "弹出",
      "物理"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/弹性动效.html",
    参数: [
      {
        键: "stretch",
        名: "起始压扁程度（越小越扁）",
        类型: "slider",
        最小: 0.75,
        最大: 1,
        步长: 0.01,
        默认: 0.92
      },
      {
        键: "over",
        名: "回落过冲拉伸",
        类型: "slider",
        最小: 1,
        最大: 1.15,
        步长: 0.01,
        默认: 1.02
      },
      {
        键: "dur",
        名: "弹出时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 0.9,
        步长: 0.05,
        默认: 0.45
      },
      {
        键: "oy",
        名: "冲过头位移（%，负=向上）",
        类型: "slider",
        最小: -12,
        最大: 0,
        步长: 1,
        默认: -4
      },
      {
        键: "sheetH",
        名: "弹层高度（vh）",
        类型: "slider",
        最小: 25,
        最大: 85,
        步长: 5,
        默认: 45
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 2,
        默认: 20
      },
      {
        键: "shadow",
        名: "投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.4,
        步长: 0.02,
        默认: 0.12
      },
      {
        键: "handle",
        名: "显示顶部手柄",
        类型: "switch",
        默认: true
      },
      {
        键: "mask",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.3
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "sheetBg",
        名: "弹层底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "handleColor",
        名: "手柄颜色",
        类型: "color",
        默认: "#dddddd"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n弹层弹出时先压缩过头再拉回，像被手指拽出来又弹回去，有物理拉扯质感。比直接滑入更有生命力。\n能怎么改：拖滑杆调「起始压扁程度（越小越扁）、回落过冲拉伸、弹出时长（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调起始压缩、冲过头、弹出时长；冲过头越大越「皮」，小一点更稳重。",
    提示词: "帮我做\"弹性弹出\"动效（纯 HTML/CSS/JS）：\n效果：弹层弹出时先拉伸过头再复位，模拟物理拉扯质感。\n用法示例：\n.sheet.in { animation: sheetIn .45s cubic-bezier(.32,.72,0,1) forwards; }\n// keyframes：105% 出发 → 冲过 -4% → 微回 2% → 落定 0\n关键参数：\n- stretch 起始压扁程度 / over 回落过冲拉伸 / dur 弹出时长 / oy 冲过头位移 / sheetH 弹层高度 / radius 顶部圆角 / shadow 投影浓度 / handle 显示顶部手柄 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色\n集成步骤：\n1. 复制 assets/demos/弹性动效.html 的 keyframes\n2. 套到你的弹层/抽屉上\n3. 想要更「皮」就加大 over",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>弹性动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 45vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n  }\n  /* 弹出：先拉伸过头再复位，模拟物理拉扯质感 */\n  .sheet.in { animation: sheetIn var(--dur, .45s) cubic-bezier(.32,.72,0,1) forwards; }\n  .sheet.out { animation: sheetOut var(--dur, .25s) ease-in forwards; }\n  @keyframes sheetIn {\n    0%   { transform: translateY(105%) scaleY(var(--stretch, .92)); }\n    55%  { transform: translateY(var(--oy, -4%)) scaleY(1); }\n    78%  { transform: translateY(2%) scaleY(var(--over, 1.02)); }\n    100% { transform: translateY(0) scaleY(1); }\n  }\n  @keyframes sheetOut { to { transform: translateY(105%); } }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">弹性弹出</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">先拉伸过头，再复位落定</p>\n</div>\n<p class=\"hint\">弹出时先冲过头再落回，像被拽出来的</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    stretch: 0.92,    // 起始压扁程度（越小越扁）\n    over: 1.02,       // 回落时的过冲拉伸\n    dur: 0.45,        // 弹出时长（秒）\n    oy: -4,           // 冲过头位移（%，负=向上冲）\n    sheetH: 45,       // 弹层高度（vh）\n    radius: 20,       // 顶部圆角（px）\n    shadow: 0.12,     // 投影浓度\n    handle: true,     // 是否显示顶部手柄\n    mask: 0.3,        // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--stretch\", state.stretch); // 关键帧里读 CSS 变量，改完再弹立即生效\n    R.setProperty(\"--over\", state.over);\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--oy\", state.oy + \"%\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() {\n    sheet.classList.remove(\"out\");\n    sheet.classList.add(\"in\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    sheet.classList.remove(\"in\");\n    sheet.classList.add(\"out\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v117",
    标题: "拖拽关闭",
    分类: "组件",
    子类: "弹窗抽屉",
    风格: [],
    场景: ["移动端"],
    元素: ["动效"],
    搭配: [
      "底部抽屉"
    ],
    标签: [
      "手势",
      "拖拽",
      "回弹"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/拖拽关闭.html",
    参数: [
      {
        键: "threshold",
        名: "关闭阈值（拖过弹层高度百分比）",
        类型: "slider",
        最小: 10,
        最大: 90,
        步长: 5,
        默认: 30
      },
      {
        键: "dur",
        名: "回弹/收起时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.6,
        步长: 0.05,
        默认: 0.3
      },
      {
        键: "vel",
        名: "甩动关闭速度（px/ms）",
        类型: "slider",
        最小: 0.3,
        最大: 2.5,
        步长: 0.1,
        默认: 1
      },
      {
        键: "followRatio",
        名: "跟手比例（1=完全跟手）",
        类型: "slider",
        最小: 0.4,
        最大: 1,
        步长: 0.05,
        默认: 1
      },
      {
        键: "maskFollow",
        名: "拖动时遮罩跟随渐隐",
        类型: "switch",
        默认: true
      },
      {
        键: "sheetH",
        名: "弹层高度（vh）",
        类型: "slider",
        最小: 30,
        最大: 85,
        步长: 5,
        默认: 55
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 2,
        默认: 20
      },
      {
        键: "shadow",
        名: "投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.4,
        步长: 0.02,
        默认: 0.12
      },
      {
        键: "mask",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.3
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "sheetBg",
        名: "弹层底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "handleColor",
        名: "手柄颜色",
        类型: "color",
        默认: "#dddddd"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n按住弹层头部往下拖：拖的距离不够就自动弹回，拖过阈值或甩得快就直接关闭。慢拖回弹、快拖关闭，手势符合直觉。\n能怎么改：拖滑杆调「关闭阈值（拖过弹层高度百分比）、回弹/收起时长（秒）、甩动关闭速度（px/ms）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调关闭阈值、回弹时长；速度阈值在 JS 的 vel > 1.0 里改；只保留拖拽关闭不想要速度判断就删掉 vel 条件。",
    提示词: "帮我做\"拖拽关闭\"弹层（纯 HTML/CSS/JS）：\n效果：按住弹层头部拖拽，结合拖拽距离与速度判断——慢拖回弹、快拖或拖过阈值关闭。\n用法示例：\ngrab.onpointermove = (e) => { sheet.style.transform = translateY(拖拽距离); }\n// pointerup 时：距离/高度 > threshold 或速度 > 1.0 → 关闭，否则回弹\n关键参数：\n- threshold 关闭阈值 / dur 回弹/收起时长 / vel 甩动关闭速度 / followRatio 跟手比例 / maskFollow 拖动时遮罩跟随渐隐 / sheetH 弹层高度 / radius 顶部圆角 / shadow 投影浓度 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色\n集成步骤：\n1. 复制 assets/demos/拖拽关闭.html 的手势逻辑\n2. 拖拽中要 transition:none，松手再恢复过渡\n3. 配档位吸附（v118）就是完整的可拖拽弹层",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>拖拽关闭演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .3s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .sheet.dragging { transition: none; }\n  .sheet.gone { transform: translateY(105%); }\n  .grab { padding: 14px 0 6px; cursor: grab; touch-action: none; user-select: none; }\n  .grab:active { cursor: grabbing; }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 0 auto; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 10px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"grab\" id=\"grab\"><div class=\"handle\"></div></div>\n  <div class=\"sheet-title\">往下拖我</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">慢拖回弹、快拖或拖过阈值就关闭</p>\n</div>\n<p class=\"hint\">按住抓手往下拖：拖够远 / 甩得快 → 关闭，否则弹回</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    threshold: 30,     // 关闭阈值（拖过弹层高度的百分比）\n    dur: 0.3,          // 回弹/收起时长（秒）\n    vel: 1.0,          // 甩动关闭速度（px/ms）\n    followRatio: 1,    // 跟手比例（0.5=弹层只走一半）\n    maskFollow: true,  // 拖动时遮罩跟随渐隐\n    sheetH: 55,        // 弹层高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const grab = document.getElementById(\"grab\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    // 拖拽逻辑参数（阈值/甩速/跟手比例）在松手判断时读 state；这里统一转数字，父页面传字符串也不会失灵\n    state.threshold = +state.threshold;\n    state.vel = +state.vel;\n    state.followRatio = +state.followRatio;\n  }\n\n  let startY = 0, curY = 0, lastY = 0, lastT = 0, dragging = false, vel = 0;\n\n  grab.addEventListener(\"pointerdown\", (e) => {\n    dragging = true;\n    startY = curY = lastY = e.clientY;\n    lastT = performance.now();\n    vel = 0;\n    grab.setPointerCapture(e.pointerId);\n    sheet.classList.add(\"dragging\");\n    mask.style.transition = \"none\"; // 拖动时遮罩要跟手，关掉渐变\n  });\n  grab.addEventListener(\"pointermove\", (e) => {\n    if (!dragging) return;\n    curY = e.clientY;\n    const now = performance.now();\n    const dt = now - lastT;\n    if (dt > 0) vel = (curY - lastY) / dt; // px/ms，正=往下甩\n    lastY = curY; lastT = now;\n    const dy = Math.max(0, curY - startY);\n    // 跟手比例：弹层实际位移 = 手指位移 × followRatio\n    const move = dy * state.followRatio;\n    sheet.style.transform = \"translateY(\" + move + \"px)\";\n    // 遮罩跟随渐隐：拖得越远越透明\n    if (state.maskFollow) mask.style.background = rgba(state.maskColor, state.mask * (1 - Math.min(1, dy / (sheet.offsetHeight * 1.2))));\n  });\n  function endDrag() {\n    if (!dragging) return;\n    dragging = false;\n    sheet.classList.remove(\"dragging\");\n    mask.style.transition = \"\";\n    mask.style.background = \"\";\n    const dist = (curY - startY) * state.followRatio; // 实际位移参与阈值判断\n    const ratio = dist / sheet.offsetHeight * 100;\n    // 判断：拖过阈值（距离）或甩得快（速度）\n    if (ratio > state.threshold || vel > state.vel) close(); else rebound();\n  }\n  grab.addEventListener(\"pointerup\", endDrag);\n  grab.addEventListener(\"pointercancel\", endDrag);\n\n  function rebound() {\n    sheet.classList.add(\"show\");\n    sheet.style.transform = \"\";\n    setTimeout(() => sheet.classList.remove(\"show\", \"gone\"), state.dur * 1000 + 60);\n  }\n  function close() {\n    sheet.style.transform = \"\";\n    sheet.classList.remove(\"show\");\n    sheet.classList.add(\"gone\");\n    mask.classList.remove(\"show\");\n    setTimeout(() => sheet.classList.remove(\"gone\"), state.dur * 1000 + 60);\n  }\n  function open() {\n    sheet.classList.remove(\"gone\");\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v118",
    标题: "档位吸附",
    分类: "组件",
    子类: "弹窗抽屉",
    风格: [],
    场景: ["移动端"],
    元素: ["动效"],
    搭配: [
      "拖拽关闭"
    ],
    标签: [
      "手势",
      "档位",
      "吸附"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/档位吸附.html",
    参数: [
      {
        键: "dur",
        名: "吸附动画时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.6,
        步长: 0.02,
        默认: 0.28
      },
      {
        键: "snap",
        名: "档位数量（个）",
        类型: "slider",
        最小: 2,
        最大: 5,
        步长: 1,
        默认: 3
      },
      {
        键: "magnet",
        名: "磁吸范围（1=多远都吸）",
        类型: "slider",
        最小: 0.1,
        最大: 1,
        步长: 0.05,
        默认: 1
      },
      {
        键: "marks",
        名: "显示档位标签",
        类型: "switch",
        默认: true
      },
      {
        键: "sheetH",
        名: "初始高度（vh，自动吸附最近档位）",
        类型: "slider",
        最小: 20,
        最大: 90,
        步长: 5,
        默认: 35
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 2,
        默认: 20
      },
      {
        键: "minH",
        名: "最小可拖高度（px）",
        类型: "slider",
        最小: 60,
        最大: 300,
        步长: 10,
        默认: 120
      },
      {
        键: "mask",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.3
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "sheetBg",
        名: "弹层底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "handleColor",
        名: "手柄颜色",
        类型: "color",
        默认: "#dddddd"
      },
      {
        键: "markColor",
        名: "档位标签颜色",
        类型: "color",
        默认: "#999999"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n弹层高度可以拖拽调整，松手后自动吸附到最近的档位（如 35% / 65% / 100%）。既自由又整齐，不会停在奇怪的中间高度。\n能怎么改：拖滑杆调「吸附动画时长（秒）、档位数量（个）、磁吸范围（1=多远都吸）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调吸附时长、档位数；档位数参数会自动等分生成，想自定义档位就改 JS 里的 SNAPS 数组。",
    提示词: "帮我做\"档位吸附\"弹层（纯 HTML/CSS/JS）：\n效果：拖拽调整弹层高度，设置档位吸附机制，松手自动对齐最近档位。\n用法示例：\nconst SNAPS = [0.35, 0.65, 1]; // 档位比例\n// pointerup 时找 |当前 - 档位| 最小的那个，过渡到它\n关键参数：\n- dur 吸附动画时长 / snap 档位数量 / magnet 磁吸范围 / marks 显示档位标签 / sheetH 初始高度 / radius 顶部圆角 / minH 最小可拖高度 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色 / markColor 档位标签颜色\n集成步骤：\n1. 复制 assets/demos/档位吸附.html 的手势逻辑\n2. 档位数用 snap 参数自动生成，或自己写 SNAPS\n3. 配拖拽关闭（v117）两段手势齐活",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>档位吸附演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--h, 35vh); border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: height var(--dur, .28s) cubic-bezier(.32,.72,0,1), transform var(--dur, .28s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .sheet.dragging { transition: none; }\n  .grab { padding: 14px 0 6px; cursor: grab; touch-action: none; user-select: none; }\n  .grab:active { cursor: grabbing; }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 0 auto; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 10px; }\n  .mark { text-align: center; font-size: 12px; color: var(--markc, #999); margin-top: 6px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"grab\" id=\"grab\"><div class=\"handle\"></div></div>\n  <div class=\"sheet-title\">拖我上下走</div>\n  <p class=\"mark\" id=\"mark\">当前档位：35%</p>\n</div>\n<p class=\"hint\">按住抓手上下拖：松手自动吸附最近档位</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.28,         // 吸附动画时长（秒）\n    snap: 3,           // 档位数量（2~5）\n    magnet: 1,         // 磁吸范围（0-1，越接近 1 越远也能吸）\n    marks: true,       // 显示档位标签\n    sheetH: 35,        // 初始档位高度（vh，取最近档位）\n    radius: 20,        // 顶部圆角（px）\n    minH: 120,         // 最小可拖高度（px）\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\",// 手柄颜色\n    markColor: \"#999999\"   // 档位标签颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const grab = document.getElementById(\"grab\");\n  const mark = document.getElementById(\"mark\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n  // 根据档位数量生成档位表（均分 0~100%）\n  const snaps = () => {\n    const n = Math.max(2, Math.round(state.snap));\n    return Array.from({ length: n }, (_, i) => (i + 1) / n);\n  };\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", nearest(state.sheetH / 100) * 100 + \"vh\"); // 初始高度吸附到最近档位\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--markc\", state.markColor);\n    mark.style.display = state.marks ? \"block\" : \"none\";\n    // 拖拽逻辑参数：档位数量先归一（经 nearest() 生效），磁吸范围/最小高度在松手与拖动时读 state\n    state.snap = Math.max(2, Math.round(+state.snap));\n    state.magnet = +state.magnet;\n    state.minH = +state.minH;\n    if (state.marks) mark.textContent = \"当前档位：\" + Math.round(nearest(parseFloat(sheet.style.height || state.sheetH + \"vh\") / innerHeight) * 100) + \"%\";\n  }\n  // 找最近档位\n  function nearest(cur) {\n    let best = snaps()[0];\n    snaps().forEach(s => { if (Math.abs(s - cur) < Math.abs(best - cur)) best = s; });\n    return best;\n  }\n\n  let startY = 0, dragging = false;\n  const vh = () => window.innerHeight;\n\n  grab.addEventListener(\"pointerdown\", (e) => {\n    dragging = true;\n    startY = e.clientY;\n    grab.setPointerCapture(e.pointerId);\n    sheet.classList.add(\"dragging\");\n  });\n  grab.addEventListener(\"pointermove\", (e) => {\n    if (!dragging) return;\n    const dy = e.clientY - startY;\n    const h = Math.max(state.minH, vh() - dy);\n    sheet.style.height = h + \"px\";\n  });\n  function endDrag(e) {\n    if (!dragging) return;\n    dragging = false;\n    sheet.classList.remove(\"dragging\");\n    // 松手：距离最近档位在磁吸范围内 → 吸附；否则停在原地\n    const cur = parseFloat(sheet.style.height || sheet.offsetHeight) / vh();\n    const best = nearest(cur);\n    if (Math.abs(best - cur) <= state.magnet) {\n      sheet.style.height = (best * 100) + \"vh\";\n      if (state.marks) mark.textContent = \"当前档位：\" + Math.round(best * 100) + \"%\";\n    }\n  }\n  grab.addEventListener(\"pointerup\", endDrag);\n  grab.addEventListener(\"pointercancel\", endDrag);\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v119",
    标题: "嵌套抽屉",
    分类: "组件",
    子类: "弹窗抽屉",
    风格: [],
    场景: ["移动端"],
    元素: ["视觉"],
    搭配: [
      "半屏停留"
    ],
    标签: [
      "嵌套",
      "层级",
      "联动"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/嵌套抽屉.html",
    参数: [
      {
        键: "dur",
        名: "弹出时长（秒）",
        类型: "slider",
        最小: 0.15,
        最大: 0.8,
        步长: 0.05,
        默认: 0.35
      },
      {
        键: "back",
        名: "第一层后退缩小比例",
        类型: "slider",
        最小: 0.8,
        最大: 1,
        步长: 0.01,
        默认: 0.94
      },
      {
        键: "dim",
        名: "第一层压暗程度（1=不变暗）",
        类型: "slider",
        最小: 0.3,
        最大: 1,
        步长: 0.01,
        默认: 0.72
      },
      {
        键: "h1",
        名: "第一层高度（vh）",
        类型: "slider",
        最小: 30,
        最大: 85,
        步长: 5,
        默认: 55
      },
      {
        键: "h2",
        名: "第二层高度（vh）",
        类型: "slider",
        最小: 40,
        最大: 90,
        步长: 5,
        默认: 70
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 2,
        默认: 20
      },
      {
        键: "shadow",
        名: "第一层投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.4,
        步长: 0.02,
        默认: 0.12
      },
      {
        键: "mask",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.35
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "bg1",
        名: "第一层底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "bg2",
        名: "第二层底色",
        类型: "color",
        默认: "#f7f7f7"
      }
    ],
    效果说明: "第二层弹层打开时，第一层同步后退、缩小、变暗，两层的前后关系一眼可见。多层级操作不会让用户迷路。\n能怎么改：拖滑杆调「弹出时长（秒）、第一层后退缩小比例、第一层压暗程度（1=不变暗）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调过渡时长、第一层后退比例；后退比例越小层次越明显，但内容太多会看不清第一层。",
    提示词: "帮我做\"嵌套抽屉\"（纯 HTML/CSS/JS）：\n效果：第二层弹出时，第一层同步后退、缩小、变暗，强化层级感知。\n用法示例：\n.sheet.back { transform: scale(.94); filter: brightness(.72); }\n// 开第二层时给第一层加 .back，两层同过渡时长\n关键参数：\n- dur 弹出时长 / back 第一层后退缩小比例 / dim 第一层压暗程度 / h1 第一层高度 / h2 第二层高度 / radius 顶部圆角 / shadow 第一层投影浓度 / mask 遮罩浓度 / maskColor 遮罩颜色 / bg1 第一层底色 / bg2 第二层底色\n集成步骤：\n1. 复制 assets/demos/嵌套抽屉.html 的两层结构\n2. 第二层开 → 第一层 .back；关第二层 → 移除 .back\n3. 配背景处理（v115）层次感更强",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>嵌套抽屉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .btn.sec { background: #fff; color: #1a1a1a; border: 2px solid #1a1a1a; margin-top: 14px; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.35)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h1, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--bg1, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1), scale var(--dur, .35s) ease, filter var(--dur, .35s) ease;\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 第二层弹出：第一层后退 + 缩小 + 变暗 */\n  .sheet.back { transform: translateY(0) scale(var(--back, .94)); filter: brightness(var(--dim, .72)); }\n  .sheet2 {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h2, 70vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--bg2, #f7f7f7); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow2, .14));\n    transform: translateY(105%);\n    transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet2.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开第一层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"s1\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">第一层</div>\n  <div style=\"text-align:center\"><button class=\"btn sec\" id=\"open2\">打开第二层</button></div>\n</div>\n<div class=\"sheet2\" id=\"s2\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">第二层</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">第一层同步后退、缩小、变暗</p>\n</div>\n<p class=\"hint\">两层联动：开第二层时第一层退后</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.35,         // 两层弹出时长（秒）\n    back: 0.94,        // 第一层后退缩小比例\n    dim: 0.72,         // 第一层压暗程度（1=不变暗）\n    h1: 55,            // 第一层高度（vh）\n    h2: 70,            // 第二层高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 第一层投影浓度\n    mask: 0.35,        // 遮罩浓度\n    maskColor: \"#000000\", // 遮罩颜色\n    bg1: \"#ffffff\",       // 第一层底色\n    bg2: \"#f7f7f7\"        // 第二层底色\n  };\n  const mask = document.getElementById(\"mask\");\n  const s1 = document.getElementById(\"s1\");\n  const s2 = document.getElementById(\"s2\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--back\", state.back);\n    R.setProperty(\"--dim\", state.dim);\n    R.setProperty(\"--h1\", state.h1 + \"vh\");\n    R.setProperty(\"--h2\", state.h2 + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--shadow2\", Math.min(0.4, state.shadow + 0.02)); // 第二层影子稍重一点\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--bg1\", state.bg1);\n    R.setProperty(\"--bg2\", state.bg2);\n  }\n\n  document.getElementById(\"open\").addEventListener(\"click\", () => {\n    s1.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  });\n  document.getElementById(\"open2\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    s2.classList.add(\"show\");\n    s1.classList.add(\"back\");\n    mask.classList.add(\"show\");\n  });\n  mask.addEventListener(\"click\", () => {\n    s1.classList.remove(\"show\", \"back\");\n    s2.classList.remove(\"show\");\n    mask.classList.remove(\"show\");\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v120",
    标题: "转场衔接",
    分类: "动效",
    子类: "转场",
    风格: ["叙事仪式"],
    场景: ["移动端", "落地页·发布页"],
    元素: ["动效"],
    搭配: [],
    标签: [
      "转场",
      "衔接"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/转场衔接.html",
    参数: [
      {
        键: "dur",
        名: "转场时长（秒）",
        类型: "slider",
        最小: 0.15,
        最大: 0.8,
        步长: 0.01,
        默认: 0.38
      },
      {
        键: "ease",
        名: "缓动方式",
        类型: "select",
        选项: [
          "先快后慢",
          "匀速",
          "回弹"
        ],
        默认: "先快后慢"
      },
      {
        键: "sheetH",
        名: "抽屉高度（vh）",
        类型: "slider",
        最小: 30,
        最大: 85,
        步长: 5,
        默认: 55
      },
      {
        键: "radius",
        名: "顶部圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 32,
        步长: 2,
        默认: 20
      },
      {
        键: "shadow",
        名: "投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.4,
        步长: 0.02,
        默认: 0.12
      },
      {
        键: "mask",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.3
      },
      {
        键: "maskColor",
        名: "遮罩颜色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "sheetBg",
        名: "抽屉底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "pageBg",
        名: "详情页底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "handleColor",
        名: "手柄颜色",
        类型: "color",
        默认: "#dddddd"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n抽屉里的内容点开时，抽屉就地延伸成全屏新页面，而不是先关抽屉再开页面。路径连续，用户不会感到「被打断」。\n能怎么改：拖滑杆调「转场时长（秒）、缓动方式、抽屉高度（vh）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调转场时长；新页面的内容在 .page-body 里改，想加淡入就在 .page 上加 opacity 过渡。",
    提示词: "帮我做\"转场衔接\"（纯 HTML/CSS/JS）：\n效果：抽屉直接延伸为新页面，避免「关闭再开启」的割裂感。\n用法示例：\n.sheet.page { height:100%; border-radius:0; }\n// 点进入时给抽屉加 .page：高度 100% + 圆角 0 + 内容切换到 page-body\n关键参数：\n- dur 转场时长 / ease 缓动方式 / sheetH 抽屉高度 / radius 顶部圆角 / shadow 投影浓度 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 抽屉底色 / pageBg 详情页底色 / handleColor 手柄颜色\n集成步骤：\n1. 复制 assets/demos/转场衔接.html 的结构\n2. 新页面内容放 .page-body，平时隐藏\n3. 配全屏展开（v114）过渡更顺",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>转场衔接演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .btn.sec { background: #fff; color: #1a1a1a; border: 2px solid #1a1a1a; margin-top: 14px; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                height var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                border-radius var(--dur, .38s) ease,\n                background var(--dur, .38s) ease;\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 转场衔接：抽屉直接延伸为全屏新页面，不关掉重开 */\n  .sheet.page { height: 100%; border-radius: 0; transform: translateY(0); background: var(--page, #fff); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n  .page-body { display: none; text-align: center; padding: 30px 20px; }\n  .sheet.page .sheet-title, .sheet.page .handle { display: none; }\n  .sheet.page .page-body { display: block; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开抽屉</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">抽屉内容</div>\n  <div style=\"text-align:center\"><button class=\"btn sec\" id=\"go\">进入详情页</button></div>\n  <div class=\"page-body\">\n    <h3 style=\"margin-bottom:10px\">详情页 ✓</h3>\n    <p style=\"font-size:13px;color:#666\">抽屉直接延伸成了新页面，中间没有「关掉再打开」的割裂感。</p>\n  </div>\n</div>\n<p class=\"hint\">点「进入详情页」：抽屉就地长成全屏新页面</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38,         // 转场时长（秒）\n    ease: \"先快后慢\",   // 缓动方式\n    sheetH: 55,        // 抽屉高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 抽屉底色\n    pageBg: \"#ffffff\",     // 详情页底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n  // 缓动方式 → 贝塞尔曲线（走 CSS 变量，改完立即生效）\n  const EASES = {\n    \"先快后慢\": \"cubic-bezier(.32,.72,0,1)\",\n    \"匀速\": \"linear\",\n    \"回弹\": \"cubic-bezier(.34,1.56,.64,1)\"\n  };\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--ease\", EASES[state.ease] || EASES[\"先快后慢\"]);\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--page\", state.pageBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n  }\n\n  document.getElementById(\"open\").addEventListener(\"click\", () => {\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  });\n  document.getElementById(\"go\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    sheet.classList.add(\"page\");\n    mask.classList.remove(\"show\");\n  });\n  mask.addEventListener(\"click\", () => {\n    sheet.classList.remove(\"show\", \"page\");\n    mask.classList.remove(\"show\");\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v121",
    标题: "状态收尾",
    分类: "动效",
    子类: "入场出场",
    风格: ["叙事仪式"],
    场景: ["通用模块区", "工具·SaaS"],
    元素: ["动效", "视觉"],
    搭配: [
      "勾选动效"
    ],
    标签: [
      "按钮",
      "成功反馈",
      "变形"
    ],
    来源: "视频拆解：App/小程序高级交互细节（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/状态收尾.html",
    参数: [
      {
        键: "dur",
        名: "收尾变形时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 0.9,
        步长: 0.05,
        默认: 0.45
      },
      {
        键: "text",
        名: "按钮文字",
        类型: "string",
        默认: "保存设置"
      },
      {
        键: "w",
        名: "按钮宽度（px）",
        类型: "slider",
        最小: 120,
        最大: 320,
        步长: 10,
        默认: 200
      },
      {
        键: "h",
        名: "按钮高度（px）",
        类型: "slider",
        最小: 40,
        最大: 72,
        步长: 2,
        默认: 52
      },
      {
        键: "radius",
        名: "按钮圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 36,
        步长: 2,
        默认: 14
      },
      {
        键: "finalSize",
        名: "收尾圆形直径（px）",
        类型: "slider",
        最小: 36,
        最大: 80,
        步长: 2,
        默认: 52
      },
      {
        键: "success",
        名: "成功色",
        类型: "color",
        默认: "#16a34a"
      },
      {
        键: "btnBg",
        名: "按钮底色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "btnColor",
        名: "按钮文字颜色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "tickColor",
        名: "对勾颜色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n弹窗里的任务完成后，按钮通过变形动画（宽度收拢、变圆、画对勾）过渡为提示状态。状态变化发生在原位置，不用弹新窗口打断。\n能怎么改：拖滑杆调「收尾变形时长（秒）、按钮文字、按钮宽度（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "详情页拖滑杆调变形时长；对勾是 SVG 描边动画，颜色在 .action.done 里改；复原时间在 JS 的 2400ms 里调。",
    提示词: "帮我做\"状态收尾\"按钮（纯 HTML/CSS/JS + SVG）：\n效果：弹窗完成任务后，按钮通过变形动画过渡为提示状态（收窄 → 变圆 → 画对勾）。\n用法示例：\n<button class=\"action done\">…</button>\n// .done 时 width:52px + border-radius:50% + 背景变绿，对勾 SVG 描边画入\n关键参数：\n- dur 收尾变形时长 / text 按钮文字 / w 按钮宽度 / h 按钮高度 / radius 按钮圆角 / finalSize 收尾圆形直径 / success 成功色 / btnBg 按钮底色 / btnColor 按钮文字颜色 / tickColor 对勾颜色\n集成步骤：\n1. 复制 assets/demos/状态收尾.html 的结构\n2. 文案和提示颜色按场景换（保存/提交/完成）\n3. 配勾选动效（v105）风格统一",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>状态收尾演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .action {\n    position: relative; overflow: hidden; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--btnbg, #1a1a1a); color: var(--btnc, #fff);\n    font-size: 16px; font-weight: 700; letter-spacing: 2px;\n    width: var(--w, 200px); height: var(--h, 52px); border-radius: var(--radius, 14px);\n    transition: width var(--dur, .45s) cubic-bezier(.32,.72,0,1),\n                height var(--dur, .45s) cubic-bezier(.32,.72,0,1),\n                border-radius var(--dur, .45s) ease,\n                background var(--dur, .45s) ease;\n  }\n  /* 收尾：任务完成后，按钮变形为对勾提示状态（不是弹个新框） */\n  .action.done {\n    width: var(--final, 52px); height: var(--final, 52px);\n    border-radius: 50%; background: var(--ok, #16a34a); cursor: default;\n  }\n  .action .txt { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: opacity .2s ease; }\n  .action .tick {\n    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0;\n  }\n  .action.done .txt { opacity: 0; }\n  .action.done .tick { opacity: 1; }\n  .tick svg { width: 26px; height: 26px; }\n  .tick path {\n    fill: none; stroke: var(--tickc, #fff); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;\n    stroke-dasharray: 26; stroke-dashoffset: 26;\n    animation: drawTick var(--dur, .45s) ease .15s forwards;\n  }\n  @keyframes drawTick { to { stroke-dashoffset: 0; } }\n</style>\n</head>\n<body>\n<button class=\"action\" id=\"act\">\n  <span class=\"txt\" id=\"txt\">保存设置</span>\n  <span class=\"tick\"><svg viewBox=\"0 0 24 24\"><path d=\"M5 12.5 L10 17.5 L19 7\"></path></svg></span>\n</button>\n<p class=\"hint\">点一下：按钮自己变形为「已保存 ✓」，不用弹新窗口</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.45,           // 收尾变形时长（秒）\n    text: \"保存设置\",     // 按钮文字\n    w: 200,              // 按钮宽度（px）\n    h: 52,               // 按钮高度（px）\n    radius: 14,          // 按钮圆角（px）\n    finalSize: 52,       // 收尾圆形直径（px）\n    success: \"#16a34a\",  // 成功色\n    btnBg: \"#1a1a1a\",    // 按钮底色\n    btnColor: \"#ffffff\", // 按钮文字颜色\n    tickColor: \"#ffffff\" // 对勾颜色\n  };\n  const act = document.getElementById(\"act\");\n  const txt = document.getElementById(\"txt\");\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--w\", state.w + \"px\");\n    R.setProperty(\"--h\", state.h + \"px\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--final\", state.finalSize + \"px\");\n    R.setProperty(\"--ok\", state.success);\n    R.setProperty(\"--btnbg\", state.btnBg);\n    R.setProperty(\"--btnc\", state.btnColor);\n    R.setProperty(\"--tickc\", state.tickColor);\n    txt.textContent = state.text; // 按钮文字实时可改\n  }\n\n  act.addEventListener(\"click\", () => {\n    if (act.classList.contains(\"done\")) return;\n    act.classList.add(\"done\");\n    act.setAttribute(\"aria-label\", \"已完成\");\n    setTimeout(() => act.classList.remove(\"done\"), 2400);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v122",
    标题: "模糊进度",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简"],
    场景: ["工具·SaaS"],
    元素: ["动效"],
    搭配: [
      "骨架落位"
    ],
    标签: [
      "进度条",
      "加载",
      "不确定时长"
    ],
    来源: "视频拆解：加载动画（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/模糊进度.html",
    参数: [
      {
        键: "speed",
        名: "流动速度（秒/圈）",
        类型: "slider",
        最小: 0.6,
        最大: 4,
        步长: 0.1,
        默认: 1.6
      },
      {
        键: "count",
        名: "光条数量",
        类型: "slider",
        最小: 1,
        最大: 5,
        步长: 1,
        默认: 2
      },
      {
        键: "gap",
        名: "光条间隔（px）",
        类型: "slider",
        最小: 0,
        最大: 30,
        步长: 1,
        默认: 4
      },
      {
        键: "thick",
        名: "轨道粗细（px）",
        类型: "slider",
        最小: 3,
        最大: 16,
        步长: 1,
        默认: 6
      },
      {
        键: "round",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 16,
        步长: 1,
        默认: 6
      },
      {
        键: "width",
        名: "轨道宽度（px）",
        类型: "slider",
        最小: 120,
        最大: 600,
        步长: 10,
        默认: 300
      },
      {
        键: "opa",
        名: "光条透明度",
        类型: "slider",
        最小: 0.2,
        最大: 1,
        步长: 0.05,
        默认: 1
      },
      {
        键: "glow",
        名: "是否发光",
        类型: "switch",
        默认: false
      },
      {
        键: "color",
        名: "光条颜色",
        类型: "color",
        选项: [
          "#1a1a1a",
          "#2563eb",
          "#16a34a",
          "#dc2626"
        ],
        默认: "#1a1a1a"
      },
      {
        键: "track",
        名: "轨道底色",
        类型: "color",
        选项: [
          "#eee",
          "#e5e7eb",
          "#f5f5f4"
        ],
        默认: "#eee"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n无法估算时长的任务（上传、同步、AI 生成）不假装有百分比，只用光条来回流动告诉用户「系统在跑」。诚实且安心。\n能怎么改：拖滑杆调「流动速度（秒/圈）、光条数量、光条间隔（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调流动速度、光条数量、粗细、圆角，点色块换主色；条数多了像波浪、少了更安静。",
    提示词: "帮我做一个\"模糊进度条\"（纯 HTML/CSS/JS）：\n效果：用于无法估算等待时长的任务，光条来回流动，仅告知用户系统在运行，不显示百分比。\n用法示例：\n<div class=\"rail\"><div class=\"indet\"></div></div>\n// .indet 在 .rail 里从 -40% 滑到 100%，无限循环\n关键参数：\n- speed 流动速度 / count 光条数量 / thick 轨道粗细 / round 圆角 / color 光条颜色 / gap 光条间隔(px) / width 轨道宽度(px) / opa 光条透明度 / glow 是否发光 / track 轨道底色\n集成步骤：\n1. 复制 assets/demos/模糊进度.html 的样式和 JS\n2. 套到上传/同步/AI 生成等不确定时长的任务\n3. 光条颜色换品牌色",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>模糊进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .rail {\n    position: relative;\n    width: var(--width, 300px);\n    height: var(--thick, 6px);\n    border-radius: var(--round, 6px);\n    background: var(--track, #eee);\n    overflow: hidden;\n  }\n  .indet {\n    position: absolute; top: 0; height: 100%;\n    width: calc(100% / var(--count, 2) - var(--gap, 4px));\n    border-radius: var(--round, 6px);\n    background: var(--color, #1a1a1a);\n    opacity: var(--opa, 1);\n    box-shadow: var(--glow, 0 0 0 transparent);\n    animation: indetSlide var(--speed, 1.6s) ease-in-out infinite;\n  }\n  @keyframes indetSlide {\n    0%   { left: calc(-1 * (100% / var(--count, 2))); }\n    100% { left: calc(100%); }\n  }\n</style>\n</head>\n<body>\n<div class=\"rail\" id=\"rail\"></div>\n<p class=\"hint\">无法估算时长的任务：光条来回流动，只说「在运行」，不假装有进度</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    speed: 1.6,        // 流动速度（秒）\n    count: 2,          // 光条数量（条）\n    thick: 6,          // 粗细（px）\n    round: 6,          // 圆角（px）\n    width: 300,        // 轨道宽度（px）\n    gap: 4,            // 光条间隔（px）\n    opa: 1,            // 透明度（0-1）\n    glow: false,       // 是否发光\n    color: \"#1a1a1a\",  // 光条主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const rail = document.getElementById(\"rail\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--speed\", state.speed + \"s\");\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--round\", state.round + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--opa\", state.opa);\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--count\", state.count);\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 \" + Math.max(8, state.thick * 2) + \"px \" + state.color + \"66\")\n      : \"0 0 0 transparent\");\n    // 按条数重建光条（错开延迟，像波浪）\n    rail.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const b = document.createElement(\"div\");\n      b.className = \"indet\";\n      if (i > 0) b.style.animationDelay = (-state.speed * i / state.count) + \"s\";\n      rail.appendChild(b);\n    }\n  }\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v123",
    标题: "明确进度",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简"],
    场景: ["工具·SaaS"],
    元素: ["动效", "视觉"],
    搭配: [
      "数字滚动"
    ],
    标签: [
      "进度条",
      "百分比",
      "加载"
    ],
    来源: "视频拆解：加载动画（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/明确进度.html",
    参数: [
      {
        键: "dur",
        名: "加载时长（秒）",
        类型: "slider",
        最小: 0.5,
        最大: 6,
        步长: 0.1,
        默认: 2
      },
      {
        键: "easing",
        名: "缓动（先快后慢/匀速/两端缓）",
        类型: "select",
        选项: [
          "easeOut",
          "linear",
          "easeInOut"
        ],
        默认: "easeOut"
      },
      {
        键: "thick",
        名: "轨道粗细（px）",
        类型: "slider",
        最小: 4,
        最大: 16,
        步长: 1,
        默认: 8
      },
      {
        键: "round",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 16,
        步长: 1,
        默认: 8
      },
      {
        键: "width",
        名: "轨道宽度（px）",
        类型: "slider",
        最小: 120,
        最大: 600,
        步长: 10,
        默认: 300
      },
      {
        键: "showPct",
        名: "显示百分比",
        类型: "switch",
        默认: true
      },
      {
        键: "pctSize",
        名: "百分比字号（px）",
        类型: "slider",
        最小: 12,
        最大: 28,
        步长: 1,
        默认: 18
      },
      {
        键: "glow",
        名: "填充是否发光",
        类型: "switch",
        默认: false
      },
      {
        键: "color",
        名: "填充主色",
        类型: "color",
        选项: [
          "#1a1a1a",
          "#2563eb",
          "#16a34a",
          "#dc2626"
        ],
        默认: "#1a1a1a"
      },
      {
        键: "track",
        名: "轨道底色",
        类型: "color",
        选项: [
          "#eee",
          "#e5e7eb",
          "#f5f5f4"
        ],
        默认: "#eee"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n进度可算的任务（下载、安装、批量处理）用填充宽度 + 百分比，用户清楚完成比例、能估剩余时间。\n能怎么改：拖滑杆调「加载时长（秒）、缓动（先快后慢/匀速/两端缓）、轨道粗细（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调加载时长、粗细、圆角，点色块换主色；真实任务里用后端返回的进度值驱动宽度，别自己瞎估。",
    提示词: "帮我做一个\"明确进度条\"（纯 HTML/CSS/JS）：\n效果：适配可计算进度的任务，填充宽度 + 百分比同步走，让用户知晓完成比例。\n用法示例：\n<div class=\"rail\"><div class=\"fill\"></div></div>\n// .fill 的 width 跟着进度值走，百分比同步显示\n关键参数：\n- dur 加载时长 / easing 缓动 / thick 轨道粗细 / round 圆角 / width 轨道宽度 / showPct 显示百分比 / pctSize 百分比字号 / glow 填充是否发光 / color 填充主色 / track 轨道底色\n集成步骤：\n1. 复制 assets/demos/明确进度.html 的样式和 JS\n2. 真实任务用接口返回的进度驱动，别用假计时\n3. 配数字滚动（v107）做百分比弹出效果",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>明确进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .row { display: flex; align-items: center; gap: 14px; }\n  .rail {\n    position: relative;\n    width: var(--width, 300px);\n    height: var(--thick, 8px);\n    border-radius: var(--round, 8px);\n    background: var(--track, #eee);\n    overflow: hidden;\n  }\n  .fill {\n    height: 100%; width: 0%;\n    border-radius: var(--round, 8px);\n    background: var(--color, #1a1a1a);\n    box-shadow: var(--glow, 0 0 0 transparent);\n    transition: width .12s linear;\n  }\n  .pct {\n    font-size: var(--pctSize, 18px);\n    font-weight: 800;\n    font-variant-numeric: tabular-nums;\n    min-width: 48px;\n    text-align: right;\n    color: var(--color, #1a1a1a);\n    display: var(--showPct, inline);\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"row\">\n  <div class=\"rail\"><div class=\"fill\" id=\"fill\"></div></div>\n  <div class=\"pct\" id=\"pct\">0%</div>\n</div>\n<button class=\"btn\" id=\"btn\">重新加载</button>\n<p class=\"hint\">进度可算的任务：填充宽度 + 百分比同步走，用户知道完成比例</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 2,            // 加载时长（秒），越大越慢\n    thick: 8,          // 轨道粗细（px）\n    round: 8,          // 圆角（px）\n    width: 300,        // 轨道宽度（px）\n    easing: \"easeOut\", // 缓动：easeOut（开头快结尾缓）/ linear（匀速）/ easeInOut（两端缓）\n    showPct: true,     // 是否显示百分比数字\n    pctSize: 18,       // 百分比字号\n    glow: false,       // 填充是否发光\n    color: \"#1a1a1a\",  // 填充主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const fill = document.getElementById(\"fill\");\n  const pct = document.getElementById(\"pct\");\n\n  // 缓动函数：把进度 t（0-1）映射到不同曲线\n  function ease(t) {\n    if (state.easing === \"linear\") return t;\n    if (state.easing === \"easeInOut\") return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;\n    return 1 - Math.pow(1 - t, 3); // easeOut：开头快结尾缓\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--round\", state.round + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    root.style.setProperty(\"--showPct\", state.showPct ? \"inline\" : \"none\");\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 \" + Math.max(6, state.thick) + \"px \" + state.color + \"66\")\n      : \"0 0 0 transparent\");\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    fill.style.width = \"0%\";\n    pct.textContent = \"0%\";\n    const start = performance.now();\n    const dur = state.dur * 1000;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const p = Math.round(100 * ease(t));\n      fill.style.width = p + \"%\";\n      pct.textContent = p + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    applyStyle();\n    if (d.key === \"dur\" || d.key === \"easing\") run();\n  });\n  applyStyle();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v124",
    标题: "环形进度",
    分类: "组件",
    子类: "进度加载",
    风格: ["科技"],
    场景: ["后台·数据看板"],
    元素: ["动效", "视觉"],
    搭配: [
      "数字滚动"
    ],
    标签: [
      "进度环",
      "百分比",
      "加载"
    ],
    来源: "视频拆解：加载动画（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/环形进度.html",
    参数: [
      {
        键: "dur",
        名: "转满时长（秒）",
        类型: "slider",
        最小: 0.5,
        最大: 6,
        步长: 0.1,
        默认: 2
      },
      {
        键: "easing",
        名: "缓动（先快后慢/匀速/两端缓）",
        类型: "select",
        选项: [
          "easeOut",
          "linear",
          "easeInOut"
        ],
        默认: "easeOut"
      },
      {
        键: "size",
        名: "环直径（px）",
        类型: "slider",
        最小: 60,
        最大: 200,
        步长: 4,
        默认: 120
      },
      {
        键: "thick",
        名: "环线粗细（px）",
        类型: "slider",
        最小: 3,
        最大: 24,
        步长: 1,
        默认: 10
      },
      {
        键: "cap",
        名: "端点形状（圆头/平头）",
        类型: "select",
        选项: [
          "round",
          "butt"
        ],
        默认: "round"
      },
      {
        键: "rot",
        名: "起点旋转（°）",
        类型: "slider",
        最小: -180,
        最大: 180,
        步长: 5,
        默认: -90
      },
      {
        键: "reverse",
        名: "逆时针方向",
        类型: "switch",
        默认: false
      },
      {
        键: "showPct",
        名: "显示百分比",
        类型: "switch",
        默认: true
      },
      {
        键: "pctSize",
        名: "百分比字号（px）",
        类型: "slider",
        最小: 14,
        最大: 36,
        步长: 1,
        默认: 24
      },
      {
        键: "glow",
        名: "环是否发光",
        类型: "switch",
        默认: false
      },
      {
        键: "color",
        名: "环主色",
        类型: "color",
        选项: [
          "#1a1a1a",
          "#2563eb",
          "#16a34a",
          "#dc2626"
        ],
        默认: "#1a1a1a"
      },
      {
        键: "track",
        名: "轨道底色",
        类型: "color",
        选项: [
          "#eee",
          "#e5e7eb",
          "#f5f5f4"
        ],
        默认: "#eee"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n小空间（卡片、指标）展示明确进度：一圈环 + 中间百分比。比横向进度条紧凑，适合仪表盘和指标卡片。\n能怎么改：拖滑杆调「转满时长（秒）、缓动（先快后慢/匀速/两端缓）、环直径（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调转满时长、环大小、环粗细，点色块换主色；环粗细超过 16 会自动缩半径防溢出。",
    提示词: "帮我做一个\"环形进度\"（纯 HTML/CSS/JS + SVG）：\n效果：同样展示明确进度，环 + 中间百分比，适合卡片、指标等小空间场景。\n用法示例：\n<svg><circle class=\"ring\" r=\"52\"></circle></svg>\n// .ring 用 stroke-dasharray/dashoffset 控制填充比例，中心放百分比\n关键参数：\n- dur 转满时长 / easing 缓动 / size 环直径 / thick 环线粗细 / cap 端点形状 / rot 起点旋转 / reverse 逆时针方向 / showPct 显示百分比 / pctSize 百分比字号 / glow 环是否发光 / color 环主色 / track 轨道底色\n集成步骤：\n1. 复制 assets/demos/环形进度.html 的 SVG 和 JS\n2. 环粗细太大时要同步缩半径\n3. 配数字滚动（v107）让中心数字也滚动",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>环形进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .ring-wrap {\n    position: relative;\n    width: var(--size, 120px); height: var(--size, 120px);\n  }\n  .ring-track { fill: none; stroke: var(--track, #eee); stroke-width: var(--thick, 10); }\n  .ring {\n    fill: none; stroke: var(--color, #1a1a1a); stroke-width: var(--thick, 10);\n    stroke-linecap: var(--cap, round);\n    stroke-dasharray: 326.7; stroke-dashoffset: 326.7;\n    transform: rotate(var(--rot, -90deg)); transform-origin: center;\n    filter: drop-shadow(var(--glow, 0 0 0 transparent));\n  }\n  .ring-pct {\n    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;\n    font-size: var(--pctSize, 24px); font-weight: 800; font-variant-numeric: tabular-nums;\n    color: var(--color, #1a1a1a);\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"ring-wrap\" id=\"wrap\">\n  <svg viewBox=\"0 0 120 120\" id=\"svg\">\n    <circle class=\"ring-track\" id=\"ringTrack\" cx=\"60\" cy=\"60\" r=\"52\"></circle>\n    <circle class=\"ring\" id=\"ring\" cx=\"60\" cy=\"60\" r=\"52\"></circle>\n  </svg>\n  <div class=\"ring-pct\" id=\"pct\">0%</div>\n</div>\n<button class=\"btn\" id=\"btn\">重新转</button>\n<p class=\"hint\">小空间（卡片/指标）展示明确进度：环 + 百分比</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 2,            // 转满时长（秒）\n    easing: \"easeOut\", // 缓动\n    size: 120,         // 环直径（px）\n    thick: 10,         // 环线粗细（px）\n    cap: \"round\",      // 端点形状\n    rot: -90,          // 起点旋转角度\n    showPct: true,     // 是否显示百分比文字\n    pctSize: 24,       // 百分比字号\n    glow: false,       // 环是否发光\n    reverse: false,    // 进度方向（顺时针/逆时针）\n    color: \"#1a1a1a\",  // 环主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const ring = document.getElementById(\"ring\");\n  const ringTrack = document.getElementById(\"ringTrack\");\n  const pct = document.getElementById(\"pct\");\n  const wrap = document.getElementById(\"wrap\");\n  const svg = document.getElementById(\"svg\");\n\n  function ease(t) {\n    if (state.easing === \"linear\") return t;\n    if (state.easing === \"easeInOut\") return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;\n    return 1 - Math.pow(1 - t, 3);\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--size\", state.size + \"px\");\n    root.style.setProperty(\"--cap\", state.cap === \"butt\" ? \"butt\" : \"round\");\n    root.style.setProperty(\"--rot\", state.rot + \"deg\");\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    root.style.setProperty(\"--showPct\", state.showPct ? \"flex\" : \"none\");\n    pct.style.display = state.showPct ? \"flex\" : \"none\";\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 6px \" + state.color + \"88\")\n      : \"0 0 0 transparent\");\n    svg.setAttribute(\"width\", state.size);\n    svg.setAttribute(\"height\", state.size);\n    const r = 52 - Math.min(state.thick / 2, 8);\n    ring.setAttribute(\"r\", r);\n    ringTrack.setAttribute(\"r\", r);\n    const circ = 2 * Math.PI * r;\n    ring.style.strokeDasharray = circ;\n    ring.style.strokeDashoffset = circ;\n    pct.textContent = \"0%\";\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    const r = 52 - Math.min(state.thick / 2, 8);\n    const circ = 2 * Math.PI * r;\n    ring.style.strokeDashoffset = circ;\n    pct.textContent = \"0%\";\n    const start = performance.now();\n    const dur = state.dur * 1000;\n    const dir = state.reverse ? -1 : 1;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const p = Math.round(100 * ease(t));\n      ring.style.strokeDashoffset = circ * (1 - p / 100);\n      pct.textContent = p + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    applyStyle();\n    if (d.key === \"dur\" || d.key === \"easing\" || d.key === \"reverse\") run();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v125",
    标题: "微光动效",
    分类: "动效",
    子类: "入场出场",
    风格: ["极简"],
    场景: ["内容·阅读", "全站通用"],
    元素: ["动效"],
    搭配: [
      "骨架落位"
    ],
    标签: [
      "加载",
      "流光",
      "灰色占位"
    ],
    来源: "视频拆解：加载动画（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/微光动效.html",
    参数: [
      {
        键: "dur",
        名: "流光周期（秒）",
        类型: "slider",
        最小: 0.4,
        最大: 3,
        步长: 0.05,
        默认: 1.2
      },
      {
        键: "angle",
        名: "光带倾斜角度（°）",
        类型: "slider",
        最小: 0,
        最大: 180,
        步长: 5,
        默认: 100
      },
      {
        键: "light",
        名: "高光峰值亮度",
        类型: "slider",
        最小: 0.1,
        最大: 1,
        步长: 0.05,
        默认: 0.6
      },
      {
        键: "width",
        名: "卡片宽度（px）",
        类型: "slider",
        最小: 200,
        最大: 500,
        步长: 10,
        默认: 300
      },
      {
        键: "round",
        名: "占位圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 8
      },
      {
        键: "lineH",
        名: "文字行高（px）",
        类型: "slider",
        最小: 8,
        最大: 28,
        步长: 1,
        默认: 14
      },
      {
        键: "count",
        名: "占位行数",
        类型: "slider",
        最小: 2,
        最大: 8,
        步长: 1,
        默认: 4
      },
      {
        键: "lastW",
        名: "末行宽度（%）",
        类型: "slider",
        最小: 15,
        最大: 95,
        步长: 5,
        默认: 40
      },
      {
        键: "reverse",
        名: "反向流动",
        类型: "switch",
        默认: false
      },
      {
        键: "pulse",
        名: "随时间脉动亮度",
        类型: "switch",
        默认: false
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        选项: [
          "#ececec",
          "#e5e7eb",
          "#f5f5f4"
        ],
        默认: "#ececec"
      },
      {
        键: "lightColor",
        名: "高光颜色",
        类型: "color",
        选项: [
          "#ffffff",
          "#fef3c7",
          "#dbeafe"
        ],
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：在时间维度上制造节奏，动效的快慢、位移与缓动曲线决定信息的主次与轻重，统一手感比花哨更重要。\n灰色占位块上叠加一道移动的亮光，告诉用户「内容正在来」。可配任何占位（头像/图片/列表），是骨架屏的「动起来」层。\n能怎么改：拖滑杆调「流光周期（秒）、光带倾斜角度（°）、高光峰值亮度」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调流光速度、光的方向、亮光强度；占位块形状随便换（圆头像、线条、方块），光跟着走。",
    提示词: "帮我做\"微光动效\"（纯 HTML/CSS/JS）：\n效果：叠加在骨架占位上的移动亮光，提示内容加载中。\n用法示例：\n.ph { background: linear-gradient(100deg, #ececec 40%, rgb(255 255 255 / .6) 50%, #ececec 60%); background-size: 200%; animation: shimmer 1.2s infinite; }\n// background-position 左右循环移动 = 亮光扫过\n关键参数：\n- dur 流光周期 / angle 光带倾斜角度 / light 高光峰值亮度 / width 卡片宽度 / round 占位圆角 / lineH 文字行高 / count 占位行数 / lastW 末行宽度 / reverse 反向流动 / pulse 随时间脉动亮度 / bg 底色 / lightColor 高光颜色\n集成步骤：\n1. 复制 assets/demos/微光动效.html 的样式\n2. 套到任意占位块上（头像/图片/列表）\n3. 配骨架落位（v108）防页面跳动",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>微光动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .demo-card { width: var(--width, 300px); background: #fff; border-radius: 14px; padding: 18px; box-shadow: 0 4px 14px rgba(0,0,0,.06); }\n  /* 微光：叠加在占位块上的移动亮光，提示「内容加载中」 */\n  .ph {\n    border-radius: var(--round, 8px); margin-bottom: 12px;\n    background: linear-gradient(var(--angle, 100deg),\n      var(--bg, #ececec) 40%, rgb(255 255 255 / var(--light, .6)) 50%, var(--bg, #ececec) 60%);\n    background-size: 200% 100%;\n    animation: shimmer var(--dur, 1.2s) infinite linear;\n  }\n  .ph-avatar { width: 44px; height: 44px; border-radius: 50%; margin-bottom: 12px; }\n  .ph-line { height: var(--lineH, 14px); }\n  .ph-line.w60 { width: 60%; }\n  .ph-line.w40 { width: 40%; }\n  @keyframes shimmer {\n    from { background-position: 130% 0; }\n    to   { background-position: -70% 0; }\n  }\n</style>\n</head>\n<body>\n<div class=\"demo-card\">\n  <div class=\"ph ph-avatar\"></div>\n  <div class=\"ph ph-line\"></div>\n  <div class=\"ph ph-line w60\"></div>\n  <div class=\"ph ph-line w40\"></div>\n</div>\n<p class=\"hint\">灰色占位 + 一道移动亮光：内容还没来，但系统在动</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 1.2,          // 光带流动周期（秒）\n    angle: 100,        // 光带倾斜角度（度）\n    light: 0.6,        // 高光峰值亮度（0-1）\n    width: 300,        // 卡片宽度（px）\n    round: 8,          // 占位圆角（px）\n    lineH: 14,         // 文字行高（px）\n    count: 4,          // 占位行数\n    lastW: 40,         // 末行宽度百分比（%）\n    reverse: false,    // 反向流动\n    pulse: false,      // 是否随时间轻微脉动亮度\n    bg: \"#ececec\",     // 底色\n    lightColor: \"#ffffff\" // 高光颜色\n  };\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--dur\", (state.reverse ? -1 : 1) * state.dur + \"s\");\n    root.style.setProperty(\"--angle\", state.angle + \"deg\");\n    root.style.setProperty(\"--light\", state.light);\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--round\", state.round + \"px\");\n    root.style.setProperty(\"--lineH\", state.lineH + \"px\");\n    root.style.setProperty(\"--bg\", state.bg);\n    // 重新生成占位行\n    const card = document.querySelector(\".demo-card\");\n    // 保留第一个 avatar\n    const avatar = card.querySelector(\".ph-avatar\").outerHTML;\n    card.innerHTML = avatar;\n    for (let i = 0; i < state.count - 1; i++) {\n      const d = document.createElement(\"div\");\n      d.className = \"ph ph-line\";\n      if (i === state.count - 2) d.classList.add(\"w\" + Math.min(95, Math.max(15, state.lastW)));\n      else if (i % 2 === 0) d.classList.add(\"w60\");\n      else d.style.width = (50 + (i * 7) % 35) + \"%\";\n      card.appendChild(d);\n    }\n    // 脉动：CSS 变量 + JS 同步\n    if (state.pulse) {\n      document.querySelectorAll(\".ph\").forEach(el => {\n        el.style.animation += \", pulse 1.8s ease-in-out infinite\";\n      });\n    }\n  }\n  // 加 keyframes\n  const styleEl = document.createElement(\"style\");\n  styleEl.textContent = \"@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }\";\n  document.head.appendChild(styleEl);\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v126",
    标题: "按钮加载",
    分类: "组件",
    子类: "按钮",
    风格: ["极简"],
    场景: ["通用模块区", "工具·SaaS"],
    元素: ["动效"],
    搭配: [
      "状态收尾"
    ],
    标签: [
      "按钮",
      "加载",
      "防重复"
    ],
    来源: "视频拆解：加载动画（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/按钮加载.html",
    参数: [
      {
        键: "dur",
        名: "转一圈秒数",
        类型: "slider",
        最小: 0.4,
        最大: 2,
        步长: 0.05,
        默认: 0.9
      },
      {
        键: "wait",
        名: "模拟处理时长（秒）",
        类型: "slider",
        最小: 0.5,
        最大: 4,
        步长: 0.1,
        默认: 1.8
      },
      {
        键: "radius",
        名: "按钮圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 30,
        步长: 1,
        默认: 12
      },
      {
        键: "height",
        名: "按钮高度（px）",
        类型: "slider",
        最小: 36,
        最大: 64,
        步长: 2,
        默认: 48
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 22,
        步长: 1,
        默认: 16
      },
      {
        键: "label",
        名: "默认文案",
        类型: "string",
        默认: "提交"
      },
      {
        键: "loadingLabel",
        名: "加载中文案",
        类型: "string",
        默认: "处理中"
      },
      {
        键: "doneLabel",
        名: "完成文案",
        类型: "string",
        默认: "已提交 ✓"
      },
      {
        键: "color",
        名: "按钮背景色",
        类型: "color",
        选项: [
          "#1a1a1a",
          "#2563eb",
          "#16a34a",
          "#dc2626"
        ],
        默认: "#1a1a1a"
      },
      {
        键: "txtColor",
        名: "按钮文字色",
        类型: "color",
        选项: [
          "#ffffff",
          "#f8fafc",
          "#fef3c7"
        ],
        默认: "#ffffff"
      },
      {
        键: "sTrack",
        名: "旋转图标轨色",
        类型: "string",
        默认: "rgba(255,255,255,.35)"
      },
      {
        键: "sHead",
        名: "旋转图标头色",
        类型: "string",
        默认: "#ffffff"
      },
      {
        键: "minW",
        名: "最小宽度（px）",
        类型: "slider",
        最小: 120,
        最大: 320,
        步长: 4,
        默认: 180
      },
      {
        键: "letter",
        名: "字间距（px）",
        类型: "slider",
        最小: 0,
        最大: 8,
        步长: 0.5,
        默认: 2
      },
      {
        键: "sSize",
        名: "旋转图标大小（px）",
        类型: "slider",
        最小: 10,
        最大: 28,
        步长: 1,
        默认: 16
      },
      {
        键: "sThick",
        名: "旋转图标粗细（px）",
        类型: "slider",
        最小: 1,
        最大: 5,
        步长: 0.5,
        默认: 2
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n提交、生成类按钮点击后进入加载态：转圈 + 禁点，防止用户疯狂点重复提交。完成后恢复或进入成功态。\n能怎么改：拖滑杆调「转一圈秒数、模拟处理时长（秒）、按钮圆角（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调转圈速度、加载时长、圆角，点色块换主色；加载期间 pointer-events:none 是防重复的关键；想接成功态就配 v121 状态收尾。",
    提示词: "帮我做\"按钮加载\"状态（纯 HTML/CSS/JS）：\n效果：用户点击提交、生成等操作后，按钮进入加载状态（转圈 + 禁点），防止重复点击。\n用法示例：\n<button class=\"btn loading\"><span class=\"spinner\"></span>处理中</button>\n// .loading 时显示转圈 + pointer-events:none，完成后再恢复\n关键参数：\n- dur 转一圈秒数 / wait 模拟处理时长 / radius 按钮圆角 / height 按钮高度 / fontSize 字号 / label 默认文案 / loadingLabel 加载中文案 / doneLabel 完成文案 / color 按钮背景色 / txtColor 按钮文字色 / sTrack 旋转图标轨色 / sHead 旋转图标头色 / minW 最小宽度 / letter 字间距 / sSize 旋转图标大小 / sThick 旋转图标粗细\n集成步骤：\n1. 复制 assets/demos/按钮加载.html 的结构\n2. 加载逻辑接真实请求，成功/失败都要恢复按钮\n3. 配状态收尾（v121）把成功反馈也做了",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>按钮加载演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    position: relative; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--color, #1a1a1a); color: var(--txtColor, #fff);\n    font-size: var(--fontSize, 16px); font-weight: 700; letter-spacing: var(--letter, 2px);\n    min-width: var(--minW, 180px); height: var(--height, 48px);\n    border-radius: var(--radius, 12px);\n    display: flex; align-items: center; justify-content: center; gap: 10px;\n    transition: background .2s ease, opacity .2s ease;\n  }\n  .btn:active:not(.loading) { transform: scale(.97); }\n  .btn.loading { opacity: .75; cursor: default; pointer-events: none; }\n  .spinner {\n    display: none; width: var(--sSize, 16px); height: var(--sSize, 16px); border-radius: 50%;\n    border: var(--sThick, 2px) solid var(--sTrack, rgba(255,255,255,.35));\n    border-top-color: var(--sHead, #fff);\n    animation: spin var(--dur, .9s) linear infinite;\n  }\n  .btn.loading .spinner { display: inline-block; }\n  @keyframes spin { to { transform: rotate(360deg); } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">\n  <span class=\"spinner\"></span>\n  <span class=\"txt\" id=\"txt\">提交</span>\n</button>\n<p class=\"hint\">点一下：进入加载态（转圈 + 禁点），完成后恢复</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.9,          // 旋转一圈秒数\n    wait: 1.8,          // 模拟后端处理时长（秒）\n    label: \"提交\",      // 按钮文案\n    loadingLabel: \"处理中\", // 加载中文案\n    doneLabel: \"已提交 ✓\",  // 完成文案\n    radius: 12,         // 圆角（px）\n    height: 48,         // 按钮高度（px）\n    minW: 180,          // 最小宽度（px）\n    fontSize: 16,       // 字号（px）\n    letter: 2,          // 字间距（px）\n    sSize: 16,          // 旋转图标大小（px）\n    sThick: 2,          // 旋转图标粗细（px）\n    color: \"#1a1a1a\",   // 按钮背景\n    txtColor: \"#ffffff\",// 按钮文字\n    sTrack: \"rgba(255,255,255,.35)\", // 旋转图标轨色\n    sHead: \"#ffffff\"    // 旋转图标头色\n  };\n  const btn = document.getElementById(\"btn\");\n  const txt = document.getElementById(\"txt\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--txtColor\", state.txtColor);\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--height\", state.height + \"px\");\n    root.style.setProperty(\"--minW\", state.minW + \"px\");\n    root.style.setProperty(\"--fontSize\", state.fontSize + \"px\");\n    root.style.setProperty(\"--letter\", state.letter + \"px\");\n    root.style.setProperty(\"--sSize\", state.sSize + \"px\");\n    root.style.setProperty(\"--sThick\", state.sThick + \"px\");\n    root.style.setProperty(\"--sTrack\", state.sTrack);\n    root.style.setProperty(\"--sHead\", state.sHead);\n    if (!btn.classList.contains(\"loading\")) txt.textContent = state.label;\n  }\n\n  btn.addEventListener(\"click\", () => {\n    if (btn.classList.contains(\"loading\")) return;\n    btn.classList.add(\"loading\");\n    txt.textContent = state.loadingLabel;\n    setTimeout(() => {\n      txt.textContent = state.doneLabel;\n      setTimeout(() => {\n        btn.classList.remove(\"loading\");\n        txt.textContent = state.label;\n      }, 900);\n    }, state.wait * 1000);\n  });\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v127",
    标题: "页面加载",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简"],
    场景: ["移动端", "全站通用"],
    元素: ["动效"],
    搭配: [
      "骨架落位"
    ],
    标签: [
      "加载",
      "首屏",
      "全屏"
    ],
    来源: "视频拆解：加载动画（2026-08-30 用户提供；交互模式为通用设计手法，实现代码自写）",
    效果演示: "assets/demos/页面加载.html",
    参数: [
      {
        键: "wait",
        名: "加载层显示时长（秒）",
        类型: "slider",
        最小: 0.5,
        最大: 5,
        步长: 0.1,
        默认: 2
      },
      {
        键: "dur",
        名: "淡出时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 1.5,
        步长: 0.05,
        默认: 0.5
      },
      {
        键: "speed",
        名: "内部光条速度（秒）",
        类型: "slider",
        最小: 0.6,
        最大: 3,
        步长: 0.1,
        默认: 1.2
      },
      {
        键: "logoSize",
        名: "Logo 字号（px）",
        类型: "slider",
        最小: 18,
        最大: 60,
        步长: 1,
        默认: 30
      },
      {
        键: "barH",
        名: "光条粗细（px）",
        类型: "slider",
        最小: 2,
        最大: 12,
        步长: 1,
        默认: 4
      },
      {
        键: "showTip",
        名: "显示底部提示",
        类型: "switch",
        默认: true
      },
      {
        键: "spinnerOnly",
        名: "只用光条不用Logo",
        类型: "switch",
        默认: false
      },
      {
        键: "brand",
        名: "Logo/品牌文字",
        类型: "string",
        默认: "加载完成"
      },
      {
        键: "tip",
        名: "提示文案",
        类型: "string",
        默认: "页面内容准备中…"
      },
      {
        键: "bg",
        名: "加载层背景色",
        类型: "color",
        选项: [
          "#ffffff",
          "#0b0b0f",
          "#fafaf8"
        ],
        默认: "#ffffff"
      },
      {
        键: "color",
        名: "主色（Logo+光条）",
        类型: "color",
        选项: [
          "#1a1a1a",
          "#2563eb",
          "#16a34a",
          "#dc2626"
        ],
        默认: "#1a1a1a"
      },
      {
        键: "track",
        名: "光条轨道色",
        类型: "color",
        选项: [
          "#eeeeee",
          "#1f1f24",
          "#e5e7eb"
        ],
        默认: "#eeeeee"
      },
      {
        键: "letter",
        名: "标字母距（px）",
        类型: "slider",
        最小: 0,
        最大: 12,
        步长: 0.5,
        默认: 4
      },
      {
        键: "gap",
        名: "内部元素间距（px）",
        类型: "slider",
        最小: 8,
        最大: 48,
        步长: 2,
        默认: 22
      },
      {
        键: "barW",
        名: "进度条宽度（px）",
        类型: "slider",
        最小: 80,
        最大: 320,
        步长: 10,
        默认: 160
      },
      {
        键: "tipSize",
        名: "提示字号（px）",
        类型: "slider",
        最小: 11,
        最大: 20,
        步长: 1,
        默认: 13
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n首次打开页面或核心内容没就绪时，全屏加载层（logo + 光条）先顶上，就绪后整体淡出露出页面。适合重交互应用。\n能怎么改：拖滑杆调「加载层显示时长（秒）、淡出时长（秒）、内部光条速度（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调加载时长、淡出时长、光条速度，点色块换主色；加载逻辑接真实的资源就绪回调，别死等。",
    提示词: "帮我做\"页面加载\"（纯 HTML/CSS/JS）：\n效果：适配首次打开页面或核心内容未加载完成的场景，全屏加载层就绪后整体淡出。\n用法示例：\n<div class=\"loader\"><div class=\"logo\">…</div><div class=\"loader-bar\">…</div></div>\n// 资源就绪后给 .loader 加 .hide（opacity 0 + visibility hidden）\n关键参数：\n- wait 加载层显示时长 / dur 淡出时长 / speed 内部光条速度 / logoSize Logo 字号 / barH 光条粗细 / showTip 显示底部提示 / spinnerOnly 只用光条不用Logo / brand Logo/品牌文字 / tip 提示文案 / bg 加载层背景色 / color 主色 / track 光条轨道色 / letter 标字母距 / gap 内部元素间距 / barW 进度条宽度 / tipSize 提示字号\n集成步骤：\n1. 复制 assets/demos/页面加载.html 的结构\n2. 加载逻辑接真实的资源就绪回调，别死等\n3. 配骨架落位（v108）做内容区的渐进式加载",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>页面加载演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .loader {\n    position: fixed; inset: 0; background: var(--bg, #fff); z-index: 10;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--gap, 22px);\n    transition: opacity var(--dur, .5s) ease, visibility var(--dur, .5s) ease;\n  }\n  .loader.hide { opacity: 0; visibility: hidden; pointer-events: none; }\n  .logo { font-size: var(--logoSize, 30px); font-weight: 900; letter-spacing: var(--letter, 4px); color: var(--color, #1a1a1a); }\n  .logo span { opacity: 0; animation: popIn .5s ease forwards; display: inline-block; }\n  .logo span:nth-child(1) { animation-delay: .1s; }\n  .logo span:nth-child(2) { animation-delay: .2s; }\n  .logo span:nth-child(3) { animation-delay: .3s; }\n  .logo span:nth-child(4) { animation-delay: .4s; }\n  @keyframes popIn { to { opacity: 1; } }\n  .loader-bar {\n    width: var(--barW, 160px); height: var(--barH, 4px); border-radius: var(--barH, 4px); background: var(--track, #eee); overflow: hidden;\n  }\n  .loader-fill {\n    height: 100%; width: 40%; border-radius: var(--barH, 4px);\n    background: var(--color, #1a1a1a);\n    animation: fillSlide var(--speed, 1.2s) ease-in-out infinite;\n  }\n  @keyframes fillSlide {\n    0%   { transform: translateX(-100%); }\n    100% { transform: translateX(400%); }\n  }\n  .loader-tip { font-size: var(--tipSize, 13px); color: #999; }\n  .page {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;\n    padding: 40px; text-align: center;\n  }\n  .page h2 { font-size: 28px; }\n  .page p { font-size: 14px; color: #666; max-width: 420px; line-height: 1.8; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"loader\" id=\"loader\">\n  <div class=\"logo\" id=\"logo\"><span id=\"logoText\"></span></div>\n  <div class=\"loader-bar\"><div class=\"loader-fill\"></div></div>\n  <div class=\"loader-tip\" id=\"tip\">页面内容准备中…</div>\n</div>\n<div class=\"page\">\n  <h2>页面主体</h2>\n  <p>首次打开或核心内容未加载完成时，先展示全屏加载层；就绪后整体淡出，露出页面主体。</p>\n  <button class=\"btn\" id=\"btn\">重播加载</button>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    wait: 2,            // 加载层显示时长（秒）\n    dur: 0.5,           // 淡出时长（秒）\n    speed: 1.2,         // 内部进度条跑动速度（秒）\n    letter: 4,          // 标字母距（px）\n    gap: 22,            // 内部元素间距（px）\n    logoSize: 30,       // Logo 字号（px）\n    barW: 160,          // 进度条宽度（px）\n    barH: 4,            // 进度条粗细（px）\n    tipSize: 13,        // 提示字号（px）\n    showTip: true,      // 是否显示底部提示\n    spinnerOnly: false, // 是否只用旋转图标（不用进度条）\n    brand: \"加载完成\",  // 品牌名/Logo 文字\n    tip: \"页面内容准备中…\", // 提示文案\n    bg: \"#ffffff\",      // 加载层底色\n    color: \"#1a1a1a\",   // 主色\n    track: \"#eeeeee\"    // 进度条轨道色\n  };\n  const loader = document.getElementById(\"loader\");\n  const logoText = document.getElementById(\"logoText\");\n  const tipEl = document.getElementById(\"tip\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--speed\", state.speed + \"s\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--logoSize\", state.logoSize + \"px\");\n    root.style.setProperty(\"--letter\", state.letter + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--barW\", state.barW + \"px\");\n    root.style.setProperty(\"--barH\", state.barH + \"px\");\n    root.style.setProperty(\"--tipSize\", state.tipSize + \"px\");\n    logoText.innerHTML = \"\";\n    for (const ch of state.brand) {\n      const s = document.createElement(\"span\");\n      s.textContent = ch;\n      logoText.appendChild(s);\n    }\n    tipEl.textContent = state.tip;\n    tipEl.style.display = state.showTip ? \"block\" : \"none\";\n    document.querySelector(\".loader-bar\").style.display = state.spinnerOnly ? \"none\" : \"block\";\n  }\n\n  function play() {\n    loader.classList.remove(\"hide\");\n    setTimeout(() => loader.classList.add(\"hide\"), state.wait * 1000);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", play);\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n  play();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v128",
    标题: "流体融合",
    分类: "背景",
    子类: "渐变",
    风格: ["科技", "轻盈"],
    场景: ["落地页·发布页", "全站通用"],
    元素: ["视觉", "动效"],
    搭配: [
      "绸缎渐变"
    ],
    标签: [
      "流体",
      "氛围",
      "渐变",
      "启动页"
    ],
    来源: "视频拆解：6 种 UI 设计动效之流体融合（2026-08-30 用户提供，Martin Strba 风格启发；实现代码自写）",
    效果演示: "assets/demos/流体融合.html",
    参数: [
      {
        键: "count",
        名: "色块数量",
        类型: "slider",
        最小: 2,
        最大: 6,
        步长: 1,
        默认: 4
      },
      {
        键: "size",
        名: "色块大小（px）",
        类型: "slider",
        最小: 80,
        最大: 280,
        步长: 10,
        默认: 160
      },
      {
        键: "moveSpeed",
        名: "漂移速度（倍）",
        类型: "slider",
        最小: 0.3,
        最大: 3,
        步长: 0.1,
        默认: 1
      },
      {
        键: "morphSpeed",
        名: "形变速度（倍）",
        类型: "slider",
        最小: 0.3,
        最大: 3,
        步长: 0.1,
        默认: 1
      },
      {
        键: "blur",
        名: "柔化程度（px）",
        类型: "slider",
        最小: 8,
        最大: 40,
        步长: 1,
        默认: 18
      },
      {
        键: "goo",
        名: "融合度",
        类型: "slider",
        最小: 8,
        最大: 30,
        步长: 1,
        默认: 16
      },
      {
        键: "color1",
        名: "颜色一",
        类型: "color",
        默认: "#7fa8d9"
      },
      {
        键: "color2",
        名: "颜色二",
        类型: "color",
        默认: "#b8a7d9"
      },
      {
        键: "color3",
        名: "颜色三",
        类型: "color",
        默认: "#8fd0c3"
      },
      {
        键: "bg",
        名: "背景色",
        类型: "color",
        默认: "#f4f6fb"
      },
      {
        键: "alpha",
        名: "整体透明度",
        类型: "slider",
        最小: 0.3,
        最大: 1,
        步长: 0.05,
        默认: 0.85
      },
      {
        键: "showCard",
        名: "显示中间示例内容",
        类型: "switch",
        默认: true
      }
    ],
    效果说明: "构图笔记：用色块、粒子或光影铺底制造氛围层次，关键是让主体内容始终清晰可读，背景只做衬托不做主角。\n几个低饱和色块慢慢漂移、边界呼吸形变，相遇时融合成一体（SVG 模糊+融合滤镜）。像水滴晕开、又像光在流动；前景内容保持清晰，轻量不抢主体。\n能怎么改：拖滑杆调「色块数量、色块大小（px）、漂移速度（倍）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "调「融合度」看交界消失的临界点；换三个颜色配品牌色系；适合 AI、金融类产品的启动页、登录页背景。",
    提示词: "帮我做\"流体融合\"背景（纯 HTML/CSS/JS）：\n效果：几个低饱和色块慢慢漂移、边界形变，相遇时融合成液体（SVG 高斯模糊 + alpha 对比滤镜实现），前景内容保持清晰不抢主体。适合 AI / 金融类产品的启动页、登录页或转场背景。\n用法示例：\n<svg width=\"0\" height=\"0\"><filter id=\"goo\"><feGaussianBlur stdDeviation=\"18\"/><feColorMatrix values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9\"/></filter></svg>\n<div class=\"goo\"><div class=\"blob\"></div>...</div>\n关键参数：\n- count 色块数量 / size 色块大小（px） / moveSpeed 漂移速度（倍） / morphSpeed 形变速度（倍） / blur 柔化程度（px） / goo 融合度 / color1 颜色一 / color2 颜色二 / color3 颜色三 / bg 背景色 / alpha 整体透明度 / showCard 显示中间示例内容\n集成步骤：\n1. 复制 assets/demos/流体融合.html 的滤镜与色块结构\n2. 色块层放内容层之下（z-index），保证文字可读\n3. 配绸缎渐变（s201）做同色系的静态版背景",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>流体融合演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #f4f6fb; }\n  /* 色块层：整体过 goo 滤镜，色块相遇时融合成液体 */\n  .goo { position: absolute; inset: 0; filter: url(#goo); opacity: .85; }\n  .blob { position: absolute; }\n  /* 前景示例内容：证明「轻量化不抢主体」 */\n  .card { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center; color: #333c4e; }\n  .card h1 { font-size: 30px; letter-spacing: 6px; margin-bottom: 10px; font-weight: 900; }\n  .card p { font-size: 13px; opacity: .7; letter-spacing: 2px; }\n  .hint { position: absolute; left: 12px; bottom: 10px; font-size: 12px; color: rgba(30,40,60,.5); }\n</style>\n</head>\n<body>\n<!-- goo 滤镜：先高斯模糊，再把 alpha 通道拉开对比 → 模糊的交界被「焊」成液体 -->\n<svg width=\"0\" height=\"0\"><filter id=\"goo\">\n  <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"18\" result=\"b\"/>\n  <feColorMatrix in=\"b\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9\"/>\n</filter></svg>\n<div class=\"goo\" id=\"goo\"></div>\n<div class=\"card\" id=\"card\">\n  <h1>灵 感 弹 药 库</h1>\n  <p>低饱和流体 · 启动页 / 转场背景</p>\n</div>\n<div class=\"hint\">色块慢慢漂移，相遇时融合成液体——调「融合度」看交界消失的临界点</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    count: 4,          // 色块数量\n    size: 160,         // 色块大小（px）\n    moveSpeed: 1,      // 漂移速度（倍）\n    morphSpeed: 1,     // 形变速度（倍）\n    blur: 18,          // 柔化程度（px）\n    goo: 16,           // 融合度（越高越容易融在一起）\n    color1: \"#7fa8d9\", // 颜色一（低饱和蓝）\n    color2: \"#b8a7d9\", // 颜色二（低饱和紫）\n    color3: \"#8fd0c3\", // 颜色三（低饱和青）\n    bg: \"#f4f6fb\",     // 背景色\n    alpha: 0.85,       // 整体透明度\n    showCard: true     // 显示中间示例内容\n  };\n  const gooEl = document.getElementById(\"goo\");\n  const card = document.getElementById(\"card\");\n  const blurNode = document.querySelector(\"#goo feGaussianBlur\");\n  const matrixNode = document.querySelector(\"#goo feColorMatrix\");\n  let blobs = [];\n\n  // 重建色块（数量变化时调用）\n  function build() {\n    gooEl.innerHTML = \"\";\n    blobs = [];\n    for (let i = 0; i < state.count; i++) {\n      const el = document.createElement(\"div\");\n      el.className = \"blob\";\n      gooEl.appendChild(el);\n      blobs.push({ el, seed: i * 1.7 + 0.3 }); // seed 让每个色块轨迹错开\n    }\n    paint();\n  }\n\n  // 把参数落到 DOM / 滤镜上\n  function paint() {\n    const cs = [state.color1, state.color2, state.color3];\n    blobs.forEach((b, i) => {\n      b.el.style.width = b.el.style.height = state.size + \"px\";\n      b.el.style.background = cs[i % cs.length];\n    });\n    document.body.style.background = state.bg;\n    gooEl.style.opacity = state.alpha;\n    card.style.display = state.showCard ? \"\" : \"none\";\n    blurNode.setAttribute(\"stdDeviation\", state.blur);\n    // 融合度 → alpha 通道斜率：斜率越大，模糊交界被切得越「干脆」\n    const slope = 9 + state.goo;\n    matrixNode.setAttribute(\"values\", \"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 \" + slope + \" \" + (-(slope * 0.55)));\n  }\n  function apply() { build(); }\n\n  // 动画循环：色块各走椭圆轨迹 + 边界呼吸形变\n  let t = 0;\n  function frame() {\n    t += 0.016 * state.moveSpeed;\n    blobs.forEach(b => {\n      const s = b.seed;\n      const cx = 50 + 26 * Math.sin(t * 0.5 + s);        // 中心 x（百分比）\n      const cy = 50 + 24 * Math.cos(t * 0.38 + s * 2);   // 中心 y（百分比）\n      const m = Math.sin(t * state.morphSpeed + s * 3);  // 形变量（-1~1）\n      b.el.style.left = cx + \"%\";\n      b.el.style.top = cy + \"%\";\n      b.el.style.transform = \"translate(-50%,-50%) rotate(\" + (t * 8 + s * 40) + \"deg) scale(\" + (1 + m * 0.12) + \")\";\n      b.el.style.borderRadius = (46 + m * 6) + \"% \" + (54 - m * 6) + \"% \" + (58 + m * 4) + \"% \" + (42 - m * 4) + \"% / \" +\n        (52 - m * 5) + \"% \" + (44 + m * 5) + \"% \" + (56 - m * 4) + \"% \" + (48 + m * 4) + \"%\";\n    });\n    requestAnimationFrame(frame);\n  }\n  build();\n  requestAnimationFrame(frame);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v129",
    标题: "网格吸附",
    分类: "动效",
    子类: "转场",
    风格: ["极简", "科技"],
    场景: ["作品集·叙事", "全站通用"],
    元素: ["视觉", "动效"],
    搭配: [
      "文字遮罩"
    ],
    标签: [
      "网格",
      "视差",
      "布局切换",
      "秩序感"
    ],
    来源: "视频拆解：6 种 UI 设计动效之网格吸附（2026-08-30 用户提供，Awwwards 获奖作品模式；实现代码自写）",
    效果演示: "assets/demos/网格吸附.html",
    参数: [
      {
        键: "cols",
        名: "列数",
        类型: "slider",
        最小: 2,
        最大: 4,
        步长: 1,
        默认: 3
      },
      {
        键: "gap",
        名: "网格间距（px）",
        类型: "slider",
        最小: 10,
        最大: 40,
        步长: 2,
        默认: 20
      },
      {
        键: "radius",
        名: "卡片圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 12
      },
      {
        键: "dur",
        名: "吸附时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 1.5,
        步长: 0.05,
        默认: 0.6
      },
      {
        键: "stagger",
        名: "逐个错峰（秒）",
        类型: "slider",
        最小: 0,
        最大: 0.3,
        步长: 0.01,
        默认: 0.08
      },
      {
        键: "ease",
        名: "缓动方式",
        类型: "select",
        选项: [
          "先快后慢",
          "匀速",
          "回弹"
        ],
        默认: "先快后慢"
      },
      {
        键: "parallax",
        名: "视差强度（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 14
      },
      {
        键: "bgShift",
        名: "背景反向漂移（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 10
      },
      {
        键: "gridShow",
        名: "显示网格线",
        类型: "switch",
        默认: true
      },
      {
        键: "gridColor",
        名: "网格线颜色",
        类型: "color",
        默认: "#c5cddd"
      },
      {
        键: "cardBg",
        名: "卡片底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "scatter",
        名: "散布幅度（px）",
        类型: "slider",
        最小: 30,
        最大: 120,
        步长: 5,
        默认: 70
      }
    ],
    效果说明: "自由态：卡片散布 + 鼠标视差、背景反向漂移；点切换后卡片带错峰动画吸附进精准网格，网格线浮现、背景缩小退后——从「自由浏览」切到「秩序浏览」，一秒提升空间感与层级感。\n能怎么改：拖滑杆调「列数、网格间距（px）、卡片圆角（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点按钮看吸附/释放两个方向；调「逐个错峰」看卡片像被磁铁逐个吸走；网格态视差自动收小，保持秩序感。",
    提示词: "帮我做\"网格吸附\"布局切换（纯 HTML/CSS/JS）：\n效果：默认卡片自由散布 + 鼠标视差（背景反向漂移）；切换时卡片带错峰动画吸附进精准网格，网格线浮现、背景缩小退后——从「自由浏览」切到「秩序浏览」。\n用法示例：\n<div class=\"stage\"><div class=\"bg\"></div><div class=\"gridlines\"></div><div class=\"cell\"><div class=\"inner\">01</div></div>...</div>\n// 切换：cells 依次 transition-delay 错峰，transform 落到网格坐标\n关键参数：\n- cols 列数 / gap 网格间距（px） / radius 卡片圆角（px） / dur 吸附时长（秒） / stagger 逐个错峰（秒） / ease 缓动方式 / parallax 视差强度（px） / bgShift 背景反向漂移（px） / gridShow 显示网格线 / gridColor 网格线颜色 / cardBg 卡片底色 / scatter 散布幅度（px）\n集成步骤：\n1. 复制 assets/demos/网格吸附.html 的双层结构（外层管吸附定位、内层管视差）\n2. 把 inner 换成真实内容（图片/卡片）\n3. 配文字遮罩（r001）丰富滚动层",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>网格吸附演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #eef0f4; }\n  .stage { position: absolute; inset: 0; overflow: hidden; }\n  /* 背景层：吸附时反向漂移 + 缩小退后 */\n  .bg { position: absolute; inset: -60px; background: linear-gradient(135deg, #dfe7f5, #e9e2f2 55%, #dbeaf0);\n    transition: transform var(--dur) var(--ease), filter var(--dur) var(--ease); }\n  /* 网格线：吸附时浮现，标出「精准坐标」 */\n  .gridlines { position: absolute; inset: 0; opacity: 0; transition: opacity var(--dur) ease;\n    background-image: linear-gradient(var(--gridc) 1px, transparent 1px), linear-gradient(90deg, var(--gridc) 1px, transparent 1px);\n    background-size: var(--cell) var(--cell); background-position: center; }\n  /* 卡片：外层管吸附定位（带过渡），内层管鼠标视差（即时跟手） */\n  .cell { position: absolute; transition: transform var(--dur) var(--ease), width var(--dur) var(--ease), height var(--dur) var(--ease); }\n  .inner { position: absolute; inset: 0; border-radius: var(--radius); background: var(--cardbg);\n    box-shadow: 0 6px 18px rgba(20, 30, 60, .1); display: flex; align-items: center; justify-content: center;\n    font-weight: 800; color: #9aa4b8; font-size: 18px; }\n  .btn { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); cursor: pointer; border: none;\n    background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 700; padding: 10px 26px; border-radius: 8px; }\n  .btn:active { transform: translateX(-50%) scale(.96); }\n  .hint { position: absolute; left: 12px; bottom: 10px; font-size: 12px; color: rgba(30,40,60,.5); }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"bg\" id=\"bg\"></div>\n  <div class=\"gridlines\" id=\"gridlines\"></div>\n  <div id=\"cells\"></div>\n</div>\n<button class=\"btn\" id=\"btn\">吸附到网格</button>\n<div class=\"hint\">先移动鼠标看自由视差，再点按钮看「自由 → 网格 → 释放」的切换</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    cols: 3,              // 列数\n    gap: 20,              // 网格间距（px）\n    radius: 12,           // 卡片圆角（px）\n    dur: 0.6,             // 吸附时长（秒）\n    stagger: 0.08,        // 逐个错峰（秒）\n    ease: \"先快后慢\",      // 缓动方式\n    parallax: 14,         // 视差强度（px）\n    bgShift: 10,          // 背景反向漂移（px）\n    gridShow: true,       // 显示网格线\n    gridColor: \"#c5cddd\", // 网格线颜色\n    cardBg: \"#ffffff\",    // 卡片底色\n    scatter: 70           // 散布幅度（px）\n  };\n  // 缓动名 → 贝塞尔曲线\n  const EASE = { \"先快后慢\": \"cubic-bezier(.22,1,.36,1)\", \"匀速\": \"linear\", \"回弹\": \"cubic-bezier(.34,1.56,.64,1)\" };\n  const gridlines = document.getElementById(\"gridlines\");\n  const cellsBox = document.getElementById(\"cells\");\n  const bg = document.getElementById(\"bg\");\n  const btn = document.getElementById(\"btn\");\n  let grid = false, cells = [];\n\n  // 伪随机（固定种子，保证每次刷新散布一致）\n  const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5; return x - Math.floor(x); };\n\n  // 生成卡片：先算网格基准位，再叠散布偏移\n  function build() {\n    cellsBox.innerHTML = \"\";\n    cells = [];\n    const rows = 3, pad = 60;\n    const cardW = Math.min(180, (innerWidth - pad * 2 - state.gap * (state.cols - 1)) / state.cols);\n    const cardH = Math.min(120, (innerHeight - pad * 2 - state.gap * (rows - 1)) / rows);\n    const totalW = state.cols * cardW + state.gap * (state.cols - 1);\n    const totalH = rows * cardH + state.gap * (rows - 1);\n    const x0 = (innerWidth - totalW) / 2, y0 = (innerHeight - totalH) / 2;\n    for (let r = 0; r < rows; r++) {\n      for (let c = 0; c < state.cols; c++) {\n        const i = r * state.cols + c;\n        const cell = document.createElement(\"div\");\n        cell.className = \"cell\";\n        const inner = document.createElement(\"div\");\n        inner.className = \"inner\";\n        inner.textContent = String(i + 1).padStart(2, \"0\");\n        cell.appendChild(inner);\n        cellsBox.appendChild(cell);\n        cells.push({\n          el: cell, inner, i, w: cardW, h: cardH,\n          gx: x0 + c * (cardW + state.gap), gy: y0 + r * (cardH + state.gap), // 网格基准位\n          ox: (rnd(i) - 0.5) * 2 * state.scatter,                             // 自由态偏移\n          oy: (rnd(i + 50) - 0.5) * 2 * state.scatter,\n          rot: (rnd(i + 99) - 0.5) * 14,\n          depth: 0.4 + rnd(i + 7) * 0.6                                       // 视差深度（各不相同）\n        });\n      }\n    }\n    // 网格线间距 = 卡片宽 + 间距\n    document.documentElement.style.setProperty(\"--cell\", (cardW + state.gap) + \"px\");\n    layout();\n  }\n\n  // 布局：自由态（散布+旋转） ⇄ 网格态（精准对齐）\n  function layout() {\n    cells.forEach(c => {\n      const x = grid ? c.gx : c.gx + c.ox;\n      const y = grid ? c.gy : c.gy + c.oy;\n      c.el.style.width = c.w + \"px\";\n      c.el.style.height = c.h + \"px\";\n      c.el.style.transform = \"translate(\" + x + \"px,\" + y + \"px) rotate(\" + (grid ? 0 : c.rot) + \"deg)\";\n      c.el.style.transitionDelay = (c.i * state.stagger) + \"s\"; // 逐个错峰\n    });\n    gridlines.style.opacity = (grid && state.gridShow) ? 0.8 : 0;\n  }\n\n  // 参数落地\n  function apply() {\n    const root = document.documentElement.style;\n    root.setProperty(\"--dur\", state.dur + \"s\");\n    root.setProperty(\"--ease\", EASE[state.ease] || EASE[\"先快后慢\"]);\n    root.setProperty(\"--radius\", state.radius + \"px\");\n    root.setProperty(\"--gridc\", state.gridColor);\n    root.setProperty(\"--cardbg\", state.cardBg);\n    build();\n  }\n\n  // 切换：自由 ⇄ 网格\n  btn.addEventListener(\"click\", () => {\n    grid = !grid;\n    btn.textContent = grid ? \"释放\" : \"吸附到网格\";\n    layout();\n  });\n\n  // 鼠标视差：卡片轻微跟手（各自深度不同），背景反向漂移\n  addEventListener(\"mousemove\", e => {\n    const mx = e.clientX / innerWidth * 2 - 1;\n    const my = e.clientY / innerHeight * 2 - 1;\n    cells.forEach(c => {\n      const k = grid ? 0.25 : 1; // 网格态视差收着点，保持秩序感\n      c.inner.style.transform = \"translate(\" + mx * state.parallax * c.depth * k + \"px,\" + my * state.parallax * c.depth * k + \"px)\";\n    });\n    bg.style.transform = \"translate(\" + -mx * state.bgShift + \"px,\" + -my * state.bgShift + \"px)\" + (grid ? \" scale(.94)\" : \"\");\n    bg.style.filter = grid ? \"saturate(.75) brightness(.97)\" : \"none\";\n  });\n\n  apply();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v130",
    标题: "3D 沉浸滚动",
    分类: "背景",
    子类: "3D",
    风格: ["科技", "叙事仪式"],
    场景: ["落地页·发布页", "官网·品牌站"],
    元素: ["动效"],
    搭配: [
      "3D 背景"
    ],
    标签: [
      "3D",
      "滚动",
      "沉浸",
      "视差"
    ],
    来源: "视频拆解：6 种 UI 设计动效之 3D 沉浸（2026-08-30 用户提供；纯 CSS 3D 实现代码自写，未用 Three.js，守「10 月前不引依赖」红线）",
    效果演示: "assets/demos/3D沉浸滚动.html",
    参数: [
      {
        键: "layers",
        名: "层数",
        类型: "slider",
        最小: 4,
        最大: 12,
        步长: 1,
        默认: 8
      },
      {
        键: "depth",
        名: "纵深距离（px）",
        类型: "slider",
        最小: 600,
        最大: 3000,
        步长: 100,
        默认: 1600
      },
      {
        键: "persp",
        名: "透视强度（px，越小越夸张）",
        类型: "slider",
        最小: 600,
        最大: 2000,
        步长: 50,
        默认: 1000
      },
      {
        键: "tilt",
        名: "视角跟随（度）",
        类型: "slider",
        最小: 0,
        最大: 15,
        步长: 1,
        默认: 6
      },
      {
        键: "spin",
        名: "自转速度",
        类型: "slider",
        最小: 0,
        最大: 2,
        步长: 0.1,
        默认: 0.3
      },
      {
        键: "size",
        名: "元素大小（px）",
        类型: "slider",
        最小: 60,
        最大: 200,
        步长: 10,
        默认: 110
      },
      {
        键: "shape",
        名: "形状",
        类型: "select",
        选项: [
          "圆环",
          "方块",
          "圆点"
        ],
        默认: "圆环"
      },
      {
        键: "color1",
        名: "主色",
        类型: "color",
        默认: "#6f9bff"
      },
      {
        键: "color2",
        名: "辅色",
        类型: "color",
        默认: "#a8c8ff"
      },
      {
        键: "bg",
        名: "背景色",
        类型: "color",
        默认: "#0a0e1a"
      },
      {
        键: "glow",
        名: "发光",
        类型: "switch",
        默认: true
      },
      {
        键: "fade",
        名: "远处渐隐",
        类型: "switch",
        默认: true
      }
    ],
    效果说明: "构图笔记：用色块、粒子或光影铺底制造氛围层次，关键是让主体内容始终清晰可读，背景只做衬托不做主角。\n多层元素分布在纵深轴上，滚动推进「镜头」穿过层层内容，鼠标轻移带视角倾斜——像走进一条 3D 长廊。与 3D 背景（w006）分工：那条是氛围装饰，这条是主体场景，专治「用户凭什么记住你」。\n能怎么改：拖滑杆调「层数、纵深距离（px）、透视强度（px，越小越夸张）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "滚轮推进镜头；调「层数/纵深距离」改变长廊长度，「视角跟随」控制鼠标灵敏度；换形状看圆环/方块/圆点三种气质。",
    提示词: "帮我做\"3D 沉浸滚动\"场景（纯 CSS 3D + JS，不用 Three.js）：\n效果：多层元素分布在纵深轴上，滚动推进「镜头」穿过层层内容，鼠标轻移带视角倾斜——像走进一条 3D 长廊。适合品牌官网首屏、作品集的沉浸式段落。\n用法示例：\n<div class=\"viewport\" style=\"perspective:1000px;overflow-y:scroll\"><div class=\"world\" style=\"transform-style:preserve-3d;position:sticky;top:0\">...</div></div>\n// 滚动：world.style.transform = translateZ(进度×纵深) rotateX/Y(鼠标视角)\n关键参数：\n- layers 层数 / depth 纵深距离（px） / persp 透视强度（px，越小越夸张） / tilt 视角跟随（度） / spin 自转速度 / size 元素大小（px） / shape 形状 / color1 主色 / color2 辅色 / bg 背景色 / glow 发光 / fade 远处渐隐\n集成步骤：\n1. 复制 assets/demos/3D沉浸滚动.html 的 sticky + 400vh 滚动结构\n2. 层元素换成品牌图形/产品图（每层一个 z 位置）\n3. 配 3D 背景（w006）做氛围层：w006 是背景装饰，这条是主体场景",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>3D 沉浸滚动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #0a0e1a; }\n  /* 可滚动舞台：perspective 提供透视，滚动条藏掉 */\n  .viewport { position: absolute; inset: 0; overflow-y: scroll; perspective: 1000px; }\n  .viewport::-webkit-scrollbar { display: none; }\n  .spacer { height: 400vh; } /* 撑出滚动距离 = 镜头推进的路程 */\n  /* 3D 世界：sticky 钉在视口里，translateZ 由滚动进度驱动 */\n  .world { position: sticky; top: 0; height: 100vh; transform-style: preserve-3d; }\n  .layer { position: absolute; left: 50%; top: 50%; }\n  .hint { position: absolute; left: 12px; bottom: 10px; font-size: 12px; color: rgba(255,255,255,.45); z-index: 5; }\n  /* 底部进度条 */\n  .progress { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: rgba(255,255,255,.08); z-index: 5; }\n  .progress i { display: block; height: 100%; width: 0; background: var(--c1); transition: width .1s linear; }\n</style>\n</head>\n<body>\n<div class=\"viewport\" id=\"viewport\">\n  <div class=\"world\" id=\"world\"></div>\n  <div class=\"spacer\"></div>\n</div>\n<div class=\"hint\" id=\"hint\">滚动滚轮推进镜头穿过层层元素 · 鼠标轻移带视角倾斜</div>\n<div class=\"progress\"><i id=\"pfill\"></i></div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    layers: 8,          // 层数\n    depth: 1600,        // 纵深距离（px）\n    persp: 1000,        // 透视强度（px，越小透视越夸张）\n    tilt: 6,            // 视角跟随（度）\n    spin: 0.3,          // 自转速度（度/帧）\n    size: 110,          // 元素大小（px）\n    shape: \"圆环\",       // 形状\n    color1: \"#6f9bff\",  // 主色\n    color2: \"#a8c8ff\",  // 辅色\n    bg: \"#0a0e1a\",      // 背景色\n    glow: true,         // 发光\n    fade: true          // 远处渐隐\n  };\n  const viewport = document.getElementById(\"viewport\");\n  const world = document.getElementById(\"world\");\n  const pfill = document.getElementById(\"pfill\");\n  let layerEls = [];\n\n  // 伪随机（固定种子，元素位置刷新后一致）\n  const rnd = i => { const x = Math.sin(i * 91.7 + 47.3) * 43758.5; return x - Math.floor(x); };\n\n  // 生成纵深层：每层一个 z 位置 + 平面偏移\n  function build() {\n    world.innerHTML = \"\";\n    layerEls = [];\n    for (let i = 0; i < state.layers; i++) {\n      const el = document.createElement(\"div\");\n      el.className = \"layer\";\n      const s = state.size * (0.7 + rnd(i) * 0.6); // 大小错落\n      // 形状：圆环 / 方块 / 圆点\n      if (state.shape === \"圆环\") {\n        el.style.border = \"2px solid \" + (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"50%\";\n      } else if (state.shape === \"方块\") {\n        el.style.background = (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"10px\";\n      } else {\n        el.style.background = (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"50%\";\n        el.style.filter = \"blur(1px)\";\n      }\n      if (state.glow) el.style.boxShadow = \"0 0 30px \" + (i % 2 ? state.color2 : state.color1) + \"55\";\n      el.style.width = el.style.height = s + \"px\";\n      const z = -(i + 1) * state.depth / state.layers;   // 纵深位置\n      const px = (rnd(i + 31) - 0.5) * 340;              // 平面偏移（错落分布）\n      const py = (rnd(i + 67) - 0.5) * 220;\n      el.style.marginLeft = -s / 2 + \"px\";\n      el.style.marginTop = -s / 2 + \"px\";\n      el.dataset.z = z;\n      el.dataset.px = px;\n      el.dataset.py = py;\n      world.appendChild(el);\n      layerEls.push(el);\n    }\n    document.body.style.background = state.bg;\n    render();\n  }\n\n  let progress = 0, mx = 0, my = 0, spinAngle = 0;\n  function render() {\n    // 世界：镜头推进（translateZ = 进度 × 纵深） + 鼠标视角 + 慢速自转\n    spinAngle += state.spin * 0.1;\n    world.style.transform =\n      \"translateZ(\" + (progress * state.depth * 0.92) + \"px)\" +\n      \" rotateY(\" + (mx * state.tilt + spinAngle) + \"deg)\" +\n      \" rotateX(\" + (-my * state.tilt) + \"deg)\";\n    // 每层：根据「离镜头的距离」决定透明度（远处渐隐、越过的淡出）\n    layerEls.forEach(el => {\n      const z = +el.dataset.z + progress * state.depth * 0.92; // 相对镜头的深度\n      let a = 1;\n      if (state.fade) a = Math.max(0, Math.min(1, (z + 80) / (state.depth * 0.7)));\n      el.style.opacity = a;\n      el.style.transform = \"translate3d(\" + el.dataset.px + \"px,\" + el.dataset.py + \"px,\" + el.dataset.z + \"px)\";\n    });\n    pfill.style.width = (progress * 100) + \"%\";\n  }\n\n  // 滚动 → 进度 0~1\n  viewport.addEventListener(\"scroll\", () => {\n    progress = viewport.scrollTop / (viewport.scrollHeight - innerHeight || 1);\n    render();\n  });\n  // 鼠标 → 视角倾斜\n  addEventListener(\"mousemove\", e => {\n    mx = e.clientX / innerWidth * 2 - 1;\n    my = e.clientY / innerHeight * 2 - 1;\n    render();\n  });\n  // 自转持续运转\n  (function loop() { if (state.spin > 0) render(); requestAnimationFrame(loop); })();\n\n  function apply() {\n    viewport.style.perspective = state.persp + \"px\";\n    document.documentElement.style.setProperty(\"--c1\", state.color1);\n    build();\n  }\n  apply();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "soa01",
    标题: "滚动揭示入场",
    分类: "动效",
    子类: "滚动联动",
    风格: ["极简"],
    场景: ["全站通用", "落地页·发布页"],
    元素: ["动效"],
    搭配: [
      "编辑型大序号分章",
      "文字逐行揭示"
    ],
    标签: [
      "滚动揭示",
      "入场动画",
      "适用:多页网站",
      "风格:克制简约",
      "搭配:大序号分章"
    ],
    来源: "stateofaidesign.com（AI in Design Report 2026，Designer Fund × Foundation Capital）· 分析于 2026-08-30",
    效果演示: "assets/demos/滚动揭示.html",
    参数: [
      {
        键: "dist",
        名: "位移距离（px）",
        类型: "slider",
        最小: 10,
        最大: 120,
        步长: 2,
        默认: 40
      },
      {
        键: "dur",
        名: "时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 2,
        步长: 0.1,
        默认: 0.8
      },
      {
        键: "opStart",
        名: "透明度起点",
        类型: "slider",
        最小: 0,
        最大: 1,
        步长: 0.05,
        默认: 0
      },
      {
        键: "blur",
        名: "入场模糊",
        类型: "switch",
        默认: false
      },
      {
        键: "thresh",
        名: "触发阈值",
        类型: "slider",
        最小: 0,
        最大: 1,
        步长: 0.05,
        默认: 0.2
      },
      {
        键: "stagger",
        名: "错峰延迟（秒）",
        类型: "slider",
        最小: 0,
        最大: 1,
        步长: 0.01,
        默认: 0.12
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#0e0e0e"
      },
      {
        键: "fg",
        名: "文字色",
        类型: "color",
        默认: "#f5f5f5"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 16
      },
      {
        键: "width",
        名: "内容宽度（px）",
        类型: "slider",
        最小: 280,
        最大: 900,
        步长: 10,
        默认: 560
      },
      {
        键: "align",
        名: "对齐",
        类型: "select",
        选项: ["左","中","右"],
        默认: "左"
      }
    ],
    效果说明: "多个内容区块进入视口时，从下方淡入并上移复位，缓动用 state 站招牌的 cubic-bezier(.44,0,.56,1)（平滑进出），比生硬的「啪一下出现」高级得多。\n三把尺子：克制（只动位移到 0、透明度 0→1，不加花哨形变）、节奏（错峰延迟让区块依次进场，不糊成一团）、焦点（滚动到才动，用户的视线被自然引导）。适合落地页分节、产品功能逐条揭示。\n能怎么改：拖滑杆调「位移距离（px）、时长（秒）、透明度起点」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "右侧调参面板可调：位移距离、时长、透明度起点、模糊开关、触发阈值、错峰延迟、底色、文字色、圆角、内容宽度、对齐。改完滚动或点「重播」立刻看效果。",
    提示词: "①效果：做一组滚动揭示入场区块——进入视口时从下方（translateY 从 dist 到 0）淡入，透明度 0→1，缓动用 cubic-bezier(.44,0,.56,1)，支持错峰延迟逐个进场，可选入场模糊。\n②用法示例：落地页三段功能介绍，每块进入视口时上移 40px 淡入，间隔 0.12s 依次出现，深色卡片配浅色文字。\n③关键参数（与调参面板一致）：位移距离 dist 默认 40（px）；时长 dur 默认 0.8（秒）；透明度起点 opStart 默认 0；入场模糊 blur 默认 false（开关）；触发阈值 thresh 默认 0.2；错峰延迟 stagger 默认 0.12（秒）；底色 bg 默认 #0e0e0e；文字色 fg 默认 #f5f5f5；圆角 radius 默认 16（px）；内容宽度 width 默认 560（px）；对齐 align 默认 左（选项 左/中/右）。\n④集成步骤：复制 assets/demos/滚动揭示.html 单文件；用 IntersectionObserver 监听每个 .block 进入视口（threshold 用 state.thresh）后加 .in 类触发 CSS 过渡；详情页通过 postMessage({type:'param',key,value}) 实时改 state，apply() 重设 CSS 变量，点「重播」会 disconnect 旧 observer 并重新观察。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:#fafafa;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .wrap{width:var(--width);max-width:92vw;margin:0 auto;padding:14vh 16px;display:flex;flex-direction:column;gap:16vh;}\n  /* 区块初始：下移 dist + 透明度 opStart；进入视口加 .in 复位，缓动平滑进出 */\n  .block{background:var(--bg);color:var(--fg);border-radius:var(--radius);padding:46px 40px;\n    text-align:var(--align);line-height:1.6;font-size:17px;\n    opacity:var(--opStart);transform:translateY(var(--dist));\n    transition:opacity var(--dur) var(--ease),transform var(--dur) var(--ease),filter var(--dur) var(--ease);}\n  .block.in{opacity:1;transform:translateY(0);}\n  .block.bf{filter:blur(12px);} .block.in.bf{filter:blur(0);}\n  .block b{font-size:22px;display:block;margin-bottom:8px}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <div class=\"wrap\" id=\"wrap\">\n    <div class=\"block\"><b>滚动揭示</b>区块进入视口时，从下方淡入并上移到位，缓动平滑进出。</div>\n    <div class=\"block\"><b>错峰延迟</b>每个区块按索引延迟 stagger 秒依次入场，形成节奏感。</div>\n    <div class=\"block\"><b>可调参数</b>位移、时长、透明度、模糊、阈值都能实时改，方便搭效果。</div>\n    <div class=\"block\"><b>适配多页</b>适合落地页、产品介绍等分节内容逐个揭示。</div>\n  </div>\n  <div class=\"hint\">向下滚动 / 调右侧参数看变化</div>\n  <script>\n  const state = {\n    dist: 40, dur: 0.8, opStart: 0, blur: false, thresh: 0.2, stagger: 0.12,\n    bg: \"#0e0e0e\", fg: \"#f5f5f5\", radius: 16, width: 560, align: \"左\"\n  };\n  const root = document.documentElement;\n  const wrap = document.getElementById(\"wrap\");\n  const blocks = [...wrap.children];\n  function apply(){\n    // 把 state 落到 CSS 变量，所有参数实时生效\n    root.style.setProperty(\"--dist\", state.dist + \"px\");\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--opStart\", state.opStart);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--fg\", state.fg);\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    // 模糊开关 + 错峰延迟逐块写入\n    blocks.forEach((b,i)=>{\n      b.classList.toggle(\"bf\", state.blur);\n      b.style.transitionDelay = (i * state.stagger) + \"s\";\n    });\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 观察\n    blocks.forEach(b=>b.classList.remove(\"in\"));\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: state.thresh });\n    blocks.forEach(b=>io.observe(b));\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa02",
    标题: "数字滚动统计(滚动触发)",
    分类: "文字动画",
    子类: "数字滚动",
    风格: ["极简"],
    场景: ["落地页·发布页", "后台·数据看板", "全站通用"],
    元素: ["动效", "视觉"],
    标签: [
      "数字滚动",
      "滚动计数",
      "适用:落地页",
      "风格:克制简约",
      "搭配:v107"
    ],
    来源: "stateofaidesign.com（AI in Design Report 2026，Designer Fund × Foundation Capital）· 分析于 2026-08-30",
    效果演示: "assets/demos/数字滚动统计.html",
    参数: [
      {
        键: "target",
        名: "目标值",
        类型: "number",
        默认: 900
      },
      {
        键: "dur",
        名: "时长（秒）",
        类型: "slider",
        最小: 0.4,
        最大: 4,
        步长: 0.1,
        默认: 1.6
      },
      {
        键: "suffix",
        名: "后缀",
        类型: "string",
        默认: "+"
      },
      {
        键: "sep",
        名: "千位分隔",
        类型: "switch",
        默认: true
      },
      {
        键: "ease",
        名: "缓动",
        类型: "select",
        选项: ["平滑","回弹","匀速"],
        默认: "平滑"
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 24,
        最大: 120,
        步长: 1,
        默认: 56
      },
      {
        键: "numColor",
        名: "数字色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "label",
        名: "标签文字",
        类型: "string",
        默认: "累计用户"
      },
      {
        键: "labelColor",
        名: "标签色",
        类型: "color",
        默认: "#666666"
      },
      {
        键: "delay",
        名: "计数延迟（秒）",
        类型: "slider",
        最小: 0,
        最大: 2,
        步长: 0.1,
        默认: 0.3
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "weight",
        名: "字重",
        类型: "select",
        选项: ["常规","中粗","特粗"],
        默认: "特粗"
      }
    ],
    效果说明: "数字从 0 滚动累加到目标值，进入视口才触发计数——这是与 v107 普通数字滚动的关键差异：v107 一加载就数，soa02 要等用户滚到它面前才开始数，避免「滚过去时已经数完了」的浪费。\n带千位分隔符与后缀（如「+」「%」），缓动可调平滑/回弹/匀速，适合落地页 KPI、数据看板的指标卡。三把尺子：克制（单色数字+细标签，不抢戏）、节奏（先快后慢收尾自然）、焦点（进入视口才动，引导视线）。\n能怎么改：拖滑杆调「目标值、时长（秒）、后缀」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "右侧调参面板可调：目标值、时长、后缀、千位分隔开关、缓动、字号、数字色、标签文字、标签色、计数延迟、底色、字重。改完立刻重滚预览；页面下方有「重新计数」按钮可手动重播。",
    提示词: "①效果：做一个数字滚动统计，数字从 0 滚动到目标值，进入视口才触发计数（区别于普通一加载就数的数字滚动），支持千位分隔与后缀。\n②用法示例：落地页放「累计用户 9,000+」指标卡，滚到该区块时数字从 0 数到 9000，加「+」后缀，平滑缓动收尾。\n③关键参数（与调参面板一致）：目标值 target 默认 900；时长（秒）dur 默认 1.6；后缀 suffix 默认 \"+\"；千位分隔 sep 默认 true；缓动 ease 默认 平滑（选项 平滑/回弹/匀速）；字号（px）fontSize 默认 56；数字色 numColor 默认 #111111；标签文字 label 默认 累计用户；标签色 labelColor 默认 #666666；计数延迟（秒）delay 默认 0.3；底色 bg 默认 #ffffff；字重 weight 默认 特粗（选项 常规/中粗/特粗）。\n④集成步骤：复制 assets/demos/数字滚动统计.html 单文件；用 IntersectionObserver 监听容器进入视口（threshold 0.5）后 setTimeout(延迟) 触发 roll()；详情页通过 postMessage({type:'param',key,value}) 实时改 state，apply() 会重设样式并重新计数。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  /* 制造滚动区：顶部留白 + 底部统计块，进入视口才计数（区别于 v107 普通数字滚动） */\n  body{min-height:220vh;background:var(--bg,#fff);}\n  .spacer{height:120vh;display:flex;align-items:flex-end;justify-content:center;color:#bbb;font-size:14px}\n  .wrap{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}\n  .num{font-size:var(--fs,56px);font-weight:var(--wt,800);color:var(--nc,#111);font-variant-numeric:tabular-nums;line-height:1}\n  .lab{font-size:16px;color:var(--lc,#666);letter-spacing:1px}\n  .replay{cursor:pointer;border:none;background:var(--nc,#111);color:#fff;padding:9px 22px;border-radius:8px;font-size:14px}\n</style></head>\n<body>\n  <div class=\"spacer\">向下滚动 ↓ 数字进入视口才计数</div>\n  <div class=\"wrap\">\n    <div class=\"num\" id=\"num\">0</div>\n    <div class=\"lab\" id=\"lab\">累计用户</div>\n    <button class=\"replay\" id=\"replay\">重新计数</button>\n  </div>\n  <div class=\"hint\">滚动 / 调右侧参数看变化 · 滚动触发版（搭配 v107）</div>\n  <script>\n  // 8–12 键：含 3 个颜色参数，每个键 apply() 都真生效\n  const state = {\n    target:900, dur:1.6, suffix:\"+\", sep:true, ease:\"平滑\",\n    fontSize:56, numColor:\"#111111\", label:\"累计用户\", labelColor:\"#666666\",\n    delay:0.3, bg:\"#ffffff\", weight:\"特粗\"\n  };\n  const num = document.getElementById(\"num\"), lab = document.getElementById(\"lab\"), root = document.documentElement;\n  let raf = 0, entered = false;\n  // 三种缓动：平滑=先快后慢，回弹=过头回弹，匀速=线性\n  const EASE = {\n    \"平滑\": t => 1 - Math.pow(1 - t, 3),\n    \"回弹\": t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },\n    \"匀速\": t => t\n  };\n  const WEIGHT = { \"常规\": 400, \"中粗\": 600, \"特粗\": 800 };\n  // 数字格式化：千位分隔 + 后缀\n  function fmt(n) {\n    const r = Math.round(n);\n    return (state.sep ? r.toLocaleString(\"en-US\") : String(r)) + state.suffix;\n  }\n  // 真正滚动计数（从 0 到目标值）\n  function roll() {\n    cancelAnimationFrame(raf);\n    const from = 0, to = state.target, dur = state.dur * 1000;\n    const ease = EASE[state.ease] || EASE[\"平滑\"];\n    const t0 = performance.now();\n    (function tick(now) {\n      const t = Math.min((now - t0) / dur, 1);\n      num.textContent = fmt(from + (to - from) * ease(t));\n      if (t < 1) raf = requestAnimationFrame(tick);\n    })(t0);\n  }\n  // apply：把每个 state 键落到样式/文案上\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--bg\", state.bg);\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n    s.setProperty(\"--nc\", state.numColor);\n    s.setProperty(\"--lc\", state.labelColor);\n    s.setProperty(\"--wt\", WEIGHT[state.weight] || 800);\n    lab.textContent = state.label;       // 标签文字\n    if (entered) roll();                  // 已进入视口后调参立即重滚\n  }\n  // 进入视口才触发：延迟 delay 秒后开始计数\n  const io = new IntersectionObserver((es) => {\n    es.forEach(e => {\n      if (e.isIntersecting) {\n        entered = true;\n        setTimeout(roll, state.delay * 1000);\n        io.disconnect();\n      }\n    });\n  }, { threshold: 0.5 });\n  io.observe(document.querySelector(\".wrap\"));\n  // 重播按钮：归零并重新计数\n  document.getElementById(\"replay\").addEventListener(\"click\", () => {\n    num.textContent = \"0\" + state.suffix;\n    roll();\n  });\n  // 接收详情页传参\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa03",
    标题: "编辑型大序号分章",
    分类: "布局骨架",
    子类: "分章叙事",
    风格: ["极简"],
    场景: ["全站通用", "内容·阅读"],
    元素: ["视觉", "动效"],
    搭配: [
      "滚动揭示入场",
      "英雄区大字号排版"
    ],
    标签: [
      "大序号",
      "章节分隔",
      "适用:长文报告",
      "风格:克制简约",
      "搭配:英雄区排版"
    ],
    来源: "stateofaidesign.com（AI in Design Report 2026，Designer Fund × Foundation Capital）· 分析于 2026-08-30",
    效果演示: "assets/demos/大序号分章.html",
    参数: [
      {
        键: "num",
        名: "序号",
        类型: "string",
        默认: "01"
      },
      {
        键: "numSize",
        名: "序号字号（px）",
        类型: "slider",
        最小: 40,
        最大: 400,
        步长: 4,
        默认: 180
      },
      {
        键: "numColor",
        名: "序号色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "outline",
        名: "描边开关",
        类型: "switch",
        默认: true
      },
      {
        键: "title",
        名: "标题文字",
        类型: "string",
        默认: "生成式设计"
      },
      {
        键: "titleColor",
        名: "标题色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "sub",
        名: "副标题文字",
        类型: "string",
        默认: "AI 如何重写设计流程"
      },
      {
        键: "subColor",
        名: "副标题色",
        类型: "color",
        默认: "#888888"
      },
      {
        键: "align",
        名: "对齐",
        类型: "select",
        选项: ["左","中","右"],
        默认: "左"
      },
      {
        键: "gap",
        名: "间距（px）",
        类型: "slider",
        最小: 8,
        最大: 80,
        步长: 2,
        默认: 28
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "用巨大的「01 / 02 / 03」作为章节分隔标记，序号可切换描边（空心字）或实心填充，右侧配章节标题与副标题。极简但很有编辑排版味，和 state 报告站的章节节奏一致。\n三把尺子：秩序（超大序号建立清晰的章节层级与阅读节奏）、留白（序号与标题之间的间距 gap 控制呼吸感）、焦点（描边模式更轻、实心更重，按章节分量切换）。\n能怎么改：拖滑杆调「序号、序号字号（px）、序号色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "右侧调参面板可调：序号文字、序号字号、序号色、描边开关、标题、标题色、副标题、副标题色、对齐、间距、底色。改完即时预览，适合做报告/产品文档的分章页眉。",
    提示词: "①效果：做一个编辑型大序号分章组件——左侧超大「01」序号（可描边/实心切换），右侧配章节标题与副标题，序号与文字之间留间距，整体克制简约。\n②用法示例：年度报告每一章开头放一个 180px 的描边「02」序号，右边写「人机协作」标题和一句副标题。\n③关键参数（与调参面板一致）：序号 num 默认 \"01\"（字符串）；序号字号 numSize 默认 180（px）；序号色 numColor 默认 #111111；描边开关 outline 默认 true（开关，true=描边空心）；标题文字 title 默认 生成式设计（字符串）；标题色 titleColor 默认 #111111；副标题文字 sub 默认 AI 如何重写设计流程（字符串）；副标题色 subColor 默认 #888888；对齐 align 默认 左（选项 左/中/右）；间距 gap 默认 28（px）；底色 bg 默认 #ffffff。\n④集成步骤：复制 assets/demos/大序号分章.html 单文件；序号用 -webkit-text-stroke 实现描边（outline 为 true 时文字透明+描边，否则直接填充 numColor）；apply() 把 state 落到 CSS 变量并通过 textContent 更新标题/副标题文字。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;background:var(--bg);padding:8vh 6vw;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .ch{display:flex;align-items:center;gap:var(--gap);margin:0 0 6vh;flex-wrap:wrap;}\n  /* 超大序号：描边模式文字透明+描边；实心模式直接填充 */\n  .num{font-size:var(--numSize);font-weight:900;line-height:.9;letter-spacing:-.04em;\n    color:var(--numColor);min-width:1.6em;}\n  .num.outline{color:transparent;-webkit-text-stroke:3px var(--numColor);}\n  .txt{text-align:var(--align);}\n  .txt h2{margin:0;font-size:clamp(22px,4vw,40px);color:var(--titleColor);font-weight:800;}\n  .txt p{margin:8px 0 0;font-size:16px;color:var(--subColor);}\n</style></head>\n<body>\n  <div class=\"ch\">\n    <div class=\"num\" id=\"num1\">01</div>\n    <div class=\"txt\"><h2 id=\"t1\">生成式设计</h2><p id=\"s1\">AI 如何重写设计流程</p></div>\n  </div>\n  <div class=\"ch\"><div class=\"num\">02</div><div class=\"txt\"><h2>人机协作</h2><p>设计师与模型共同迭代</p></div></div>\n  <div class=\"ch\"><div class=\"num\">03</div><div class=\"txt\"><h2>落地评估</h2><p>从概念到生产的度量</p></div></div>\n  <div class=\"hint\">调右侧参数看变化</div>\n  <script>\n  const state = {\n    num: \"01\", numSize: 180, numColor: \"#111111\", outline: true,\n    title: \"生成式设计\", titleColor: \"#111111\", sub: \"AI 如何重写设计流程\",\n    subColor: \"#888888\", align: \"左\", gap: 28, bg: \"#ffffff\"\n  };\n  const root = document.documentElement;\n  const allNum = [...document.querySelectorAll(\".num\")];\n  function apply(){\n    root.style.setProperty(\"--numSize\", state.numSize + \"px\");\n    root.style.setProperty(\"--numColor\", state.numColor);\n    root.style.setProperty(\"--titleColor\", state.titleColor);\n    root.style.setProperty(\"--subColor\", state.subColor);\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--bg\", state.bg);\n    // 描边开关：切换 .outline 类（实心时移除）\n    allNum.forEach(n=>n.classList.toggle(\"outline\", state.outline));\n    // 仅第一块由参数驱动，便于实时预览\n    document.getElementById(\"num1\").textContent = state.num;\n    document.getElementById(\"t1\").textContent = state.title;\n    document.getElementById(\"s1\").textContent = state.sub;\n  }\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa04",
    标题: "滚动进度指示",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简"],
    场景: ["全站通用", "内容·阅读"],
    元素: ["动效", "视觉"],
    标签: [
      "滚动进度",
      "阅读进度条",
      "适用:多页网站",
      "风格:克制简约"
    ],
    来源: "stateofaidesign.com（AI in Design Report 2026，Designer Fund × Foundation Capital）· 分析于 2026-08-30",
    效果演示: "assets/demos/滚动进度.html",
    参数: [
      {
        键: "h",
        名: "进度条高度（px）",
        类型: "slider",
        最小: 2,
        最大: 12,
        步长: 1,
        默认: 4
      },
      {
        键: "done",
        名: "已完成色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "todo",
        名: "未完成色",
        类型: "color",
        默认: "#e5e5e5"
      },
      {
        键: "pos",
        名: "位置",
        类型: "select",
        选项: ["顶部","底部"],
        默认: "顶部"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 0
      },
      {
        键: "dur",
        名: "过渡时长（秒）",
        类型: "slider",
        最小: 0,
        最大: 2,
        步长: 0.1,
        默认: 0.3
      },
      {
        键: "showPct",
        名: "末端显示百分比",
        类型: "switch",
        默认: false
      },
      {
        键: "pctColor",
        名: "百分比文字色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "shadow",
        名: "进度条阴影",
        类型: "switch",
        默认: false
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "z",
        名: "进度条叠放层级",
        类型: "select",
        选项: ["低层","顶层"],
        默认: "顶层"
      }
    ],
    效果说明: "页面顶部（或底部）一条细进度条，随滚动从左到右填充，宽度=已读百分比。\n构图笔记：轻量常驻、不抢内容重心，是「阅读温度计」式的位置/进度双提示；已完成上色、未完成留浅底，比例一眼可读。\n能怎么改：拖滑杆调「进度条高度（px）、已完成色、未完成色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "适合长文、文档站、多页网站放全站顶部，让用户随时知道读到哪。右侧面板可调高度、两色、位置、圆角、过渡、末端百分比、阴影、底色与叠放层级。",
    提示词: "①效果：页面顶部一条细进度条，随滚动从左到右填充，宽度=滚动百分比，末端可显示百分比数字。\n②用法示例：长文阅读页顶部常驻阅读进度条，已完成用深色、未完成用浅灰，滚动时平滑增长。\n③关键参数（与演示调参面板一致）：进度条高度（px）默认 4；已完成色默认 #111111；未完成色默认 #e5e5e5；位置默认 顶部（选项：顶部/底部）；圆角（px）默认 0；过渡时长（秒）默认 0.3；末端显示百分比默认 false；百分比文字色默认 #111111；进度条阴影默认 false；底色默认 #ffffff；进度条叠放层级默认 顶层（选项：低层/顶层）。\n④集成步骤：复制 assets/demos/滚动进度.html 结构；用 window scroll 监听算 scrollY/(scrollHeight-innerHeight) 得百分比，写进 #fill 的 width；用 postMessage({type:'param',key,value}) 实时改 state 调参，所有样式走 apply() 里的 CSS 变量。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>滚动进度指示</title>\n<style>\n  /* 原站签名缓动：滚动揭示用 cubic-bezier(.44,0,.56,1) */\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;min-height:220vh;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;background:var(--bg,#fff);color:#333;}\n  /* 进度条容器：固定在顶部或底部，宽度铺满 */\n  #bar{position:fixed;left:0;width:100%;height:var(--h,4px);background:var(--todo,#e5e5e5);z-index:var(--z,9999);box-shadow:var(--shadow,0 0 0 transparent);}\n  /* 已完成填充：宽度随滚动从左到右增长 */\n  #fill{height:100%;width:0;background:var(--done,#111);border-radius:var(--radius,0);transition:width var(--dur,.3s) var(--ease);}\n  /* 末端百分比文字：可开关 */\n  #pct{position:fixed;right:8px;font-size:12px;font-weight:700;color:var(--pct,#111);display:var(--showpct,none);font-variant-numeric:tabular-nums;z-index:var(--z,9999);}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .content{padding:60px 24px;max-width:680px;margin:0 auto;line-height:1.9;font-size:15px;}\n  .content h2{margin-top:40px;font-size:22px}\n</style></head>\n<body>\n  <div id=\"bar\"><div id=\"fill\"></div></div>\n  <div id=\"pct\">0%</div>\n  <div class=\"hint\">滚动看变化</div>\n  <div class=\"content\">\n    <h2>滚动进度指示</h2>\n    <p>这是一段占位长文。向下滚动页面，顶部细条会随阅读进度从左到右填充，让你随时知道“读到了哪里”。</p>\n    <p>进度条常驻在页面边缘，不抢内容视觉重心，只做轻量提示，是典型的克制简约导航元素。</p>\n    <h2>用法场景</h2>\n    <p>长文阅读、多页网站、文档站都适合：用户滚动时无需回头看地址栏，一眼就能判断剩余篇幅。</p>\n    <p>可把它当成“阅读温度计”——已完成部分上色，未完成部分留浅底，比例一目了然。</p>\n    <h2>可调什么</h2>\n    <p>进度条高度、已完成色、未完成色、位置（顶/底）、圆角、过渡时长、末端百分比、阴影、底色、叠放层级都能在右侧面板微调。</p>\n    <p>继续向下滚动，看细条走到 100% 时的收尾状态。</p>\n  </div>\n  <script>\n  // 默认参数：父页面（详情页）可实时调\n  const state = {\n    h: 4,            // 进度条高度（px）\n    done: \"#111111\", // 已完成色\n    todo: \"#e5e5e5\", // 未完成色\n    pos: \"顶部\",     // 位置：顶部 / 底部\n    radius: 0,       // 圆角（px）\n    dur: 0.3,        // 过渡时长（秒）\n    showPct: false,  // 末端显示百分比\n    pctColor: \"#111111\", // 百分比文字色\n    shadow: false,   // 进度条阴影\n    bg: \"#ffffff\",   // 底色（页面背景）\n    z: \"顶层\"        // 进度条叠放层级：低层 / 顶层\n  };\n  const bar=document.getElementById(\"bar\"), fill=document.getElementById(\"fill\"), pct=document.getElementById(\"pct\");\n\n  // apply：把每个 state 键映射到真实样式\n  function apply(){\n    const root=document.documentElement;\n    root.style.setProperty(\"--h\", state.h+\"px\");\n    root.style.setProperty(\"--done\", state.done);\n    root.style.setProperty(\"--todo\", state.todo);\n    root.style.setProperty(\"--radius\", state.radius+\"px\");\n    root.style.setProperty(\"--dur\", state.dur+\"s\");\n    root.style.setProperty(\"--pct\", state.pctColor);\n    root.style.setProperty(\"--shadow\", state.shadow ? \"0 1px 6px rgba(0,0,0,.25)\" : \"0 0 0 transparent\");\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--z\", state.z===\"顶层\" ? \"9999\" : \"1\");\n    root.style.setProperty(\"--showpct\", state.showPct ? \"block\" : \"none\");\n    // 位置：顶部或底部\n    if(state.pos===\"底部\"){ bar.style.top=\"auto\"; bar.style.bottom=\"0\"; }\n    else { bar.style.top=\"0\"; bar.style.bottom=\"auto\"; }\n    update();\n  }\n\n  // 滚动进度：已滚动 / 可滚动总高 = 百分比\n  function update(){\n    const max = document.documentElement.scrollHeight - window.innerHeight;\n    const p = max>0 ? Math.min(window.scrollY/max, 1) : 0;\n    const v = Math.round(p*100);\n    fill.style.width = v+\"%\";\n    pct.textContent = v+\"%\";\n    // 百分比文字贴在进度条内侧\n    if(state.pos===\"底部\"){ pct.style.top=\"auto\"; pct.style.bottom=(state.h+4)+\"px\"; }\n    else { pct.style.bottom=\"auto\"; pct.style.top=(state.h+4)+\"px\"; }\n  }\n  window.addEventListener(\"scroll\", update, {passive:true});\n  window.addEventListener(\"resize\", update);\n\n  // 父页面消息：调参实时生效\n  window.addEventListener(\"message\",(e)=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa05",
    标题: "订阅表单微交互",
    分类: "组件",
    子类: "表单",
    风格: ["极简"],
    场景: ["落地页·发布页", "官网·品牌站", "全站通用"],
    元素: ["动效", "构成", "反馈"],
    标签: [
      "订阅表单",
      "浮动标签",
      "状态反馈",
      "适用:落地页",
      "风格:克制简约"
    ],
    来源: "stateofaidesign.com（AI in Design Report 2026，Designer Fund × Foundation Capital）· 分析于 2026-08-30",
    效果演示: "assets/demos/订阅表单.html",
    参数: [
      {
        键: "radius",
        名: "输入框圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 10
      },
      {
        键: "border",
        名: "边框色",
        类型: "color",
        默认: "#cccccc"
      },
      {
        键: "focusBorder",
        名: "聚焦边框色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "btnRadius",
        名: "按钮圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 10
      },
      {
        键: "btnColor",
        名: "按钮色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "btnText",
        名: "按钮文字色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "labelColor",
        名: "标签色",
        类型: "color",
        默认: "#888888"
      },
      {
        键: "focusShift",
        名: "聚焦位移（px）",
        类型: "slider",
        最小: 2,
        最大: 20,
        步长: 1,
        默认: 8
      },
      {
        键: "dur",
        名: "时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 1,
        步长: 0.05,
        默认: 0.3
      },
      {
        键: "success",
        名: "成功色",
        类型: "color",
        默认: "#1a9e4b"
      },
      {
        键: "btnTextStr",
        名: "按钮文字",
        类型: "string",
        默认: "订阅"
      }
    ],
    效果说明: "邮箱输入框：聚焦时边框与底色变化、占位文字上移成浮动标签；提交按钮带「订阅中→已订阅」状态微反馈（setTimeout 模拟，不真发请求）。\n克制简约风格，所有圆角/边框/底色/文字色/位移/时长都参数化。三把尺子：克制（聚焦才变化，平时安静）、节奏（位移与变色用同一条缓动，统一呼吸感）、焦点（按钮状态反馈让用户确认操作成功）。\n能怎么改：拖滑杆调「输入框圆角（px）、边框色、聚焦边框色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "右侧调参面板可调：输入框圆角、边框色、聚焦边框色、底色、按钮圆角、按钮色、按钮文字色、标签色、聚焦位移、时长、成功色、按钮文字。改完即时预览；点击按钮看「订阅中→已订阅」反馈。",
    提示词: "①效果：做一个邮箱订阅表单，输入框聚焦时边框/底色变化、占位文字上移成浮动标签；提交按钮点击后显示「订阅中…」再变成「已订阅 ✓」（用 setTimeout 模拟，不真发请求）。\n②用法示例：官网底部订阅区，输入框聚焦时边框由灰变黑、标签上浮，点订阅后按钮变绿显示已订阅。\n③关键参数（与调参面板一致）：输入框圆角 radius 默认 10；边框色 border 默认 #cccccc；聚焦边框色 focusBorder 默认 #111111；底色 bg 默认 #ffffff；按钮圆角 btnRadius 默认 10；按钮色 btnColor 默认 #111111；按钮文字色 btnText 默认 #ffffff；标签色 labelColor 默认 #888888；聚焦位移（px）focusShift 默认 8；时长（秒）dur 默认 0.3；成功色 success 默认 #1a9e4b；按钮文字 btnTextStr 默认 订阅。\n④集成步骤：复制 assets/demos/订阅表单.html 单文件；输入框用 :focus 与 :not(:placeholder-shown) 触发浮动标签（placeholder 设为空格）；按钮点击后 setTimeout 约 1200ms 切换 .done 类显示成功色；详情页通过 postMessage({type:'param',key,value}) 实时改 state，apply() 重设所有 CSS 变量与按钮文字。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:var(--bg,#fff)}\n  .box{position:relative;width:300px}\n  /* 输入框：圆角/边框/底色均来自参数；聚焦时边框变 focusBorder */\n  .inp{\n    width:100%;box-sizing:border-box;padding:18px 14px 8px;font-size:15px;\n    border:1.5px solid var(--ib,#ccc);border-radius:var(--ir,10px);\n    background:var(--bg,#fff);color:#222;outline:none;\n    transition:border-color var(--dur,.3s) var(--ease),background var(--dur,.3s) var(--ease);\n  }\n  .inp:focus{border-color:var(--ifb,#111)}\n  /* 浮动标签：占位文字上移成标签，位移/颜色/时长来自参数 */\n  .flab{\n    position:absolute;left:15px;top:16px;font-size:15px;color:var(--lc,#888);\n    pointer-events:none;transition:all var(--dur,.3s) var(--ease);\n  }\n  .inp:focus ~ .flab,.inp:not(:placeholder-shown) ~ .flab{\n    top:6px;font-size:11px;transform:translateY(calc(var(--fs,8px) * -1px));color:var(--ifb,#111)\n  }\n  /* 按钮：圆角/底色/文字色来自参数；done 状态用成功色 */\n  .btn{\n    margin-top:14px;width:100%;box-sizing:border-box;border:none;cursor:pointer;\n    padding:13px;font-size:15px;font-weight:600;border-radius:var(--br,10px);\n    background:var(--bc,#111);color:var(--btc,#fff);\n    transition:background var(--dur,.3s) var(--ease);\n  }\n  .btn:disabled{opacity:.7;cursor:default}\n  .btn.done{background:var(--sc,#1a9e4b)}\n</style></head>\n<body>\n  <div class=\"box\">\n    <input class=\"inp\" id=\"inp\" type=\"email\" placeholder=\" \" autocomplete=\"off\">\n    <label class=\"flab\" for=\"inp\" id=\"flab\">输入邮箱订阅更新</label>\n    <button class=\"btn\" id=\"btn\">订阅</button>\n  </div>\n  <div class=\"hint\">滚动 / 调右侧参数看变化</div>\n  <script>\n  // 8–12 键：含 7 个颜色参数，每个键 apply() 都真生效\n  const state = {\n    radius:10, border:\"#cccccc\", focusBorder:\"#111111\", bg:\"#ffffff\",\n    btnRadius:10, btnColor:\"#111111\", btnText:\"#ffffff\", labelColor:\"#888888\",\n    focusShift:8, dur:0.3, success:\"#1a9e4b\", btnTextStr:\"订阅\"\n  };\n  const inp = document.getElementById(\"inp\"), btn = document.getElementById(\"btn\"), root = document.documentElement;\n  // apply：把每个 state 键落到 CSS 变量与文案上\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--ir\", state.radius + \"px\");     // 输入框圆角\n    s.setProperty(\"--ib\", state.border);             // 边框色\n    s.setProperty(\"--ifb\", state.focusBorder);       // 聚焦边框色\n    s.setProperty(\"--bg\", state.bg);                 // 底色\n    s.setProperty(\"--br\", state.btnRadius + \"px\");   // 按钮圆角\n    s.setProperty(\"--bc\", state.btnColor);           // 按钮色\n    s.setProperty(\"--btc\", state.btnText);          // 按钮文字色\n    s.setProperty(\"--lc\", state.labelColor);        // 标签色\n    s.setProperty(\"--fs\", state.focusShift);         // 聚焦位移\n    s.setProperty(\"--dur\", state.dur + \"s\");         // 时长\n    s.setProperty(\"--sc\", state.success);            // 成功色\n    btn.textContent = state.btnTextStr;              // 按钮文字\n  }\n  // 提交：订阅中→已订阅（setTimeout 模拟，不真发请求）\n  btn.addEventListener(\"click\", () => {\n    if (btn.classList.contains(\"done\")) return;\n    btn.disabled = true; btn.textContent = \"订阅中…\";\n    setTimeout(() => {\n      btn.classList.add(\"done\"); btn.textContent = \"已订阅 ✓\"; btn.disabled = false;\n    }, 1200);\n  });\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa06",
    标题: "粘性章节导航",
    分类: "组件",
    子类: "导航",
    风格: ["极简"],
    场景: ["内容·阅读", "落地页·发布页"],
    元素: ["动效", "视觉"],
    标签: [
      "章节导航",
      "粘性圆点",
      "适用:长文阅读",
      "风格:克制简约"
    ],
    来源: "stateofaidesign.com（AI in Design Report 2026，Designer Fund × Foundation Capital）· 分析于 2026-08-30",
    效果演示: "assets/demos/粘性章节导航.html",
    参数: [
      {
        键: "size",
        名: "圆点大小（px）",
        类型: "slider",
        最小: 6,
        最大: 20,
        步长: 1,
        默认: 12
      },
      {
        键: "gap",
        名: "圆点间距（px）",
        类型: "slider",
        最小: 12,
        最大: 40,
        步长: 1,
        默认: 20
      },
      {
        键: "idle",
        名: "默认色",
        类型: "color",
        默认: "#cccccc"
      },
      {
        键: "active",
        名: "激活色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "side",
        名: "位置",
        类型: "select",
        选项: ["左","右"],
        默认: "右"
      },
      {
        键: "labels",
        名: "标签显隐",
        类型: "switch",
        默认: false
      },
      {
        键: "labelColor",
        名: "标签色",
        类型: "color",
        默认: "#666666"
      },
      {
        键: "line",
        名: "进度连线",
        类型: "switch",
        默认: false
      },
      {
        键: "lineColor",
        名: "连线色",
        类型: "color",
        默认: "#dddddd"
      },
      {
        键: "stroke",
        名: "圆点描边",
        类型: "switch",
        默认: false
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "页面一侧（左/右）固定一排章节圆点，随滚动用 IntersectionObserver 判定哪个章节在视口中央并高亮，点击圆点平滑滚动到对应章节。\n构图笔记：用「位置固定 + 状态高亮」做轻量目录，不占正文空间；当前章放大换色、其余留浅灰，视线锚点清晰，是克制简约的进程/导航双提示。\n能怎么改：拖滑杆调「圆点大小（px）、圆点间距（px）、默认色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "适合长文、文档站、产品介绍页做侧边章节索引。右侧面板可调圆点大小、间距、两色、左右位置、标签显隐与色、进度连线与色、圆点描边、底色。",
    提示词: "①效果：页面一侧固定一排章节圆点，当前章节圆点放大并高亮，其余浅灰；点击圆点平滑滚动到对应章节。\n②用法示例：长文档右侧粘性章节导航，滚动时自动高亮「正在读」的章节，圆点间可用细线连成进度轴。\n③关键参数（与演示调参面板一致）：圆点大小（px）默认 12；圆点间距（px）默认 20；默认色默认 #cccccc；激活色默认 #111111；位置默认 右（选项：左/右）；标签显隐默认 false；标签色默认 #666666；进度连线默认 false；连线色默认 #dddddd；圆点描边默认 false；底色默认 #ffffff。\n④集成步骤：复制 assets/demos/粘性章节导航.html 结构；给每个章节 section 加 data-i，用 IntersectionObserver（rootMargin:'-50% 0px -50% 0px'）判定视口中线章节并加 .on 高亮；点击圆点调 scrollIntoView({behavior:'smooth'})；用 postMessage({type:'param',key,value}) 实时改 state，所有样式走 apply() 里的 CSS 变量。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>粘性章节导航</title>\n<style>\n  /* 原站签名缓动：出场用 cubic-bezier(0.4,0,1,1)，这里高亮态复用滚动揭示缓动 */\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;min-height:220vh;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;background:var(--bg,#fff);}\n  /* 每个章节：占满一屏高，制造滚动区 */\n  .sec{min-height:90vh;display:flex;align-items:center;justify-content:center;color:#333;font-size:22px;font-weight:700;border-bottom:1px solid #f0f0f0;}\n  /* 导航容器：垂直居中固定在左/右 */\n  .nav{position:fixed;top:50%;transform:translateY(-50%);z-index:9;display:flex;flex-direction:column;align-items:center;gap:var(--gap,20px);}\n  /* 进度连线：贯穿圆点的竖线 */\n  #line{position:absolute;top:0;bottom:0;left:50%;width:2px;background:var(--linec,#ddd);transform:translateX(-50%);z-index:0;}\n  /* 圆点：默认色，激活时放大并换色 */\n  .dot{position:relative;z-index:1;width:var(--size,12px);height:var(--size,12px);border-radius:50%;background:var(--idle,#ccc);cursor:pointer;border:var(--stroke,0) solid #fff;transition:transform .25s var(--ease),background .25s var(--ease);}\n  .dot.on{background:var(--active,#111);transform:scale(1.6);}\n  /* 章节标签：可开关，贴在圆点外侧 */\n  .lab{position:absolute;top:50%;transform:translateY(-50%);font-size:13px;color:var(--labc,#666);white-space:nowrap;display:var(--showlab,none);}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n</style></head>\n<body>\n  <nav class=\"nav\" id=\"nav\"><div id=\"line\"></div></nav>\n  <div class=\"hint\">滚动看变化</div>\n  <section class=\"sec\" data-i=\"0\">第一章 · 开篇</section>\n  <section class=\"sec\" data-i=\"1\">第二章 · 背景</section>\n  <section class=\"sec\" data-i=\"2\">第三章 · 方法</section>\n  <section class=\"sec\" data-i=\"3\">第四章 · 案例</section>\n  <section class=\"sec\" data-i=\"4\">第五章 · 收尾</section>\n  <script>\n  // 章节名（用于标签）\n  const names=[\"第一章\",\"第二章\",\"第三章\",\"第四章\",\"第五章\"];\n  // 默认参数：父页面（详情页）可实时调\n  const state = {\n    size: 12,        // 圆点大小（px）\n    gap: 20,         // 圆点间距（px）\n    idle: \"#cccccc\", // 默认色\n    active: \"#111111\", // 激活色\n    side: \"右\",      // 位置：左 / 右\n    labels: false,   // 标签显隐\n    labelColor: \"#666666\", // 标签色\n    line: false,     // 进度连线\n    lineColor: \"#dddddd\", // 连线色\n    stroke: false,   // 圆点描边\n    bg: \"#ffffff\"    // 底色（页面背景）\n  };\n  const nav=document.getElementById(\"nav\"), line=document.getElementById(\"line\");\n  const dots=[];\n  // 生成圆点\n  names.forEach((n,i)=>{\n    const d=document.createElement(\"div\"); d.className=\"dot\"; d.dataset.i=i;\n    const lab=document.createElement(\"span\"); lab.className=\"lab\"; lab.textContent=n;\n    d.appendChild(lab);\n    d.addEventListener(\"click\",()=>{ document.querySelectorAll(\".sec\")[i].scrollIntoView({behavior:\"smooth\"}); });\n    nav.appendChild(d); dots.push(d);\n  });\n  const secs=[...document.querySelectorAll(\".sec\")];\n  let cur=0;\n  function setActive(i){ cur=i; dots.forEach((d,k)=>d.classList.toggle(\"on\",k===i)); }\n\n  // apply：把每个 state 键映射到真实样式\n  function apply(){\n    const root=document.documentElement;\n    root.style.setProperty(\"--size\", state.size+\"px\");\n    root.style.setProperty(\"--gap\", state.gap+\"px\");\n    root.style.setProperty(\"--idle\", state.idle);\n    root.style.setProperty(\"--active\", state.active);\n    root.style.setProperty(\"--labc\", state.labelColor);\n    root.style.setProperty(\"--linec\", state.lineColor);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--showlab\", state.labels ? \"block\" : \"none\");\n    root.style.setProperty(\"--stroke\", state.stroke ? (Math.max(2,state.size/4)+\"px\") : \"0\");\n    line.style.display = state.line ? \"block\" : \"none\";\n    // 位置：左侧或右侧\n    if(state.side===\"左\"){ nav.style.right=\"auto\"; nav.style.left=\"20px\"; }\n    else { nav.style.left=\"auto\"; nav.style.right=\"20px\"; }\n    // 标签贴在圆点外侧（左导航在右、右导航在左）\n    dots.forEach(d=>{ const lab=d.querySelector(\".lab\");\n      if(state.side===\"左\"){ lab.style.right=(state.size+8)+\"px\"; lab.style.left=\"auto\"; }\n      else { lab.style.left=(state.size+8)+\"px\"; lab.style.right=\"auto\"; } });\n    setActive(cur);\n  }\n\n  // 以视口中线判定当前章节（IntersectionObserver）\n  const io=new IntersectionObserver((es)=>{\n    es.forEach(e=>{ if(e.isIntersecting) setActive(+e.target.dataset.i); });\n  },{rootMargin:\"-50% 0px -50% 0px\",threshold:0});\n  secs.forEach(s=>io.observe(s));\n\n  // 父页面消息：调参实时生效\n  window.addEventListener(\"message\",(e)=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa07",
    标题: "文字逐行揭示",
    分类: "文字动画",
    子类: "遮罩揭示",
    风格: ["极简"],
    场景: ["落地页·发布页", "通用模块区", "全站通用"],
    元素: ["视觉", "动效"],
    搭配: [
      "英雄区大字号排版",
      "滚动揭示入场"
    ],
    标签: [
      "逐行揭示",
      "遮罩上滑",
      "适用:英雄区",
      "风格:克制简约",
      "搭配:英雄区排版"
    ],
    来源: "stateofaidesign.com（AI in Design Report 2026，Designer Fund × Foundation Capital）· 分析于 2026-08-30",
    效果演示: "assets/demos/文字逐行.html",
    参数: [
      {
        键: "shift",
        名: "逐行位移（px）",
        类型: "slider",
        最小: 10,
        最大: 120,
        步长: 2,
        默认: 40
      },
      {
        键: "lineDelay",
        名: "每行延迟（秒）",
        类型: "slider",
        最小: 0,
        最大: 0.4,
        步长: 0.02,
        默认: 0.08
      },
      {
        键: "dur",
        名: "时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 2,
        步长: 0.1,
        默认: 0.7
      },
      {
        键: "size",
        名: "字号（px）",
        类型: "slider",
        最小: 16,
        最大: 96,
        步长: 2,
        默认: 44
      },
      {
        键: "fg",
        名: "文字色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "lh",
        名: "行高",
        类型: "slider",
        最小: 1,
        最大: 2,
        步长: 0.05,
        默认: 1.3
      },
      {
        键: "align",
        名: "对齐",
        类型: "select",
        选项: ["左","中","右"],
        默认: "左"
      },
      {
        键: "blur",
        名: "模糊开关",
        类型: "switch",
        默认: false
      },
      {
        键: "ease",
        名: "入场缓动",
        类型: "select",
        选项: ["平滑","回弹","匀速"],
        默认: "平滑"
      }
    ],
    效果说明: "一段标题按行拆开，每行用 overflow:hidden 做遮罩，进入视口时逐行从下方上滑揭示，行与行之间按 lineDelay 递增延迟，像被一行行「拉」出来。是 state 站标题最常用的招牌技法。\n三把尺子：克制（只有位移+淡入，不晃不弹）、节奏（逐行延迟制造书写般的顺序感）、焦点（遮罩让文字「从无到有」，视线被钉在正在出现的那行）。\n能怎么改：拖滑杆调「逐行位移（px）、每行延迟（秒）、时长（秒）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "右侧调参面板可调：逐行位移、每行延迟、时长、字号、文字色、底色、行高、对齐、模糊开关、入场缓动（平滑/回弹/匀速）。改完滚动或点「重播」看逐行效果。",
    提示词: "①效果：做文字逐行揭示——标题拆成多行，每行外层 overflow:hidden 做遮罩，内层 translateY 从 shift 上滑到 0 并淡入，逐行延迟 lineDelay 递增，缓动可选平滑/回弹/匀速。\n②用法示例：落地页主标题三行，滚到时第一行先出、隔 0.08s 第二行、再第三行，平滑缓动上滑揭示。\n③关键参数（与调参面板一致）：逐行位移 shift 默认 40（px）；每行延迟 lineDelay 默认 0.08（秒）；时长 dur 默认 0.7（秒）；字号 size 默认 44（px）；文字色 fg 默认 #111111；底色 bg 默认 #ffffff；行高 lh 默认 1.3；对齐 align 默认 左（选项 左/中/右）；模糊开关 blur 默认 false；入场缓动 ease 默认 平滑（选项 平滑/回弹/匀速）。\n④集成步骤：复制 assets/demos/文字逐行.html 单文件；每行包一层 .line（overflow:hidden）内层 span 做位移；IntersectionObserver 观察每行进入视口（threshold 0.4）加 .in 触发 CSS 过渡，transition-delay 设为 行索引×lineDelay；详情页 postMessage 改 state 后 apply() 重设变量、点「重播」重新 observe。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:var(--bg);display:flex;align-items:center;justify-content:center;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .head{width:min(820px,90vw);text-align:var(--align);}\n  /* 每行用 overflow:hidden 做遮罩，内层上移 shift 后归零揭示 */\n  .line{overflow:hidden;}\n  .line span{display:block;font-weight:800;font-size:var(--size);line-height:var(--lh);color:var(--fg);\n    transform:translateY(var(--shift));opacity:0;\n    transition:transform var(--dur) var(--ease2),opacity var(--dur) var(--ease2);}\n  .line.in span{transform:translateY(0);opacity:1;}\n  .line.bf span{filter:blur(10px);} .line.in.bf span{filter:blur(0);}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <div class=\"head\" id=\"head\">\n    <div class=\"line\"><span>设计正在被重写</span></div>\n    <div class=\"line\"><span>AI 成为真正的协作者</span></div>\n    <div class=\"line\"><span>工具消融于流程之中</span></div>\n  </div>\n  <div class=\"hint\">向下滚动 / 调右侧参数看变化</div>\n  <script>\n  const state = {\n    shift: 40, lineDelay: 0.08, dur: 0.7, size: 44, fg: \"#111111\",\n    bg: \"#ffffff\", lh: 1.3, align: \"左\", blur: false, ease: \"平滑\"\n  };\n  const root = document.documentElement;\n  const head = document.getElementById(\"head\");\n  const lines = [...head.querySelectorAll(\".line\")];\n  const EASE = { \"平滑\":\"var(--ease)\", \"回弹\":\"cubic-bezier(.34,1.56,.64,1)\", \"匀速\":\"linear\" };\n  function apply(){\n    root.style.setProperty(\"--shift\", state.shift + \"px\");\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--size\", state.size + \"px\");\n    root.style.setProperty(\"--fg\", state.fg);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--lh\", state.lh);\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    root.style.setProperty(\"--ease2\", EASE[state.ease] || \"var(--ease)\");\n    lines.forEach(l=>l.classList.toggle(\"bf\", state.blur));\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 逐行观察\n    lines.forEach(l=>l.classList.remove(\"in\"));\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: 0.4 });\n    lines.forEach((l,i)=>{ l.style.transitionDelay = (i * state.lineDelay) + \"s\"; io.observe(l); });\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa08",
    标题: "英雄区大字号排版",
    分类: "布局骨架",
    子类: "首屏Hero",
    风格: ["极简"],
    场景: ["落地页·发布页", "内容·阅读", "全站通用"],
    元素: ["视觉", "动效"],
    搭配: [
      "文字逐行揭示",
      "编辑型大序号分章"
    ],
    标签: [
      "英雄区",
      "大字号排版",
      "适用:报告首页",
      "风格:克制简约",
      "搭配:文字逐行揭示"
    ],
    来源: "stateofaidesign.com（AI in Design Report 2026，Designer Fund × Foundation Capital）· 分析于 2026-08-30",
    效果演示: "assets/demos/英雄区排版.html",
    参数: [
      {
        键: "title",
        名: "主标题",
        类型: "string",
        默认: "AI in Design"
      },
      {
        键: "titleSize",
        名: "主标题字号（px）",
        类型: "slider",
        最小: 32,
        最大: 200,
        步长: 4,
        默认: 96
      },
      {
        键: "titleColor",
        名: "主标题色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "tag",
        名: "小标签文字",
        类型: "string",
        默认: "Report 2026"
      },
      {
        键: "tagColor",
        名: "小标签色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "tagBg",
        名: "小标签底色",
        类型: "color",
        默认: "#111111"
      },
      {
        键: "align",
        名: "对齐",
        类型: "select",
        选项: ["左","中","右"],
        默认: "左"
      },
      {
        键: "pad",
        名: "上下留白（px）",
        类型: "slider",
        最小: 20,
        最大: 200,
        步长: 5,
        默认: 80
      },
      {
        键: "weight",
        名: "主标题字重",
        类型: "select",
        选项: ["常规","中黑","特黑"],
        默认: "中黑"
      },
      {
        键: "shift",
        名: "入场位移（px）",
        类型: "slider",
        最小: 10,
        最大: 160,
        步长: 2,
        默认: 60
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "sub",
        名: "副文案",
        类型: "string",
        默认: "Designer Fund × Foundation Capital 年度设计报告"
      }
    ],
    效果说明: "顶部 hero 区——超大主标题混排一个小标签（如「AI in Design / Report 2026」），载入时主标题从下方淡入揭示，小标签与副文案依次跟进。state 报告站首屏就是这个套路，靠字号对比和留白撑起高级感。\n三把尺子：秩序（主标题>小标签>副文案的清晰字号层级）、留白（上下留白 pad 控制首屏呼吸感）、焦点（大字号+克制配色，一眼抓住报告主题）。\n能怎么改：拖滑杆调「主标题、主标题字号（px）、主标题色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "右侧调参面板可调：主标题、主标题字号、主标题色、小标签文字、小标签色、小标签底色、对齐、上下留白、主标题字重、入场位移、底色、副文案。改完滚动或点「重播」看首屏揭示。",
    提示词: "①效果：做英雄区大字号排版——顶部 hero 放超大主标题，左上/中/右混排一个小标签胶囊（自带底色），载入时主标题从下方 translateY 上滑淡入，小标签与副文案依次跟进。\n②用法示例：报告首页主标题「AI in Design」96px 中黑，配「Report 2026」深色胶囊小标签，下方一句副文案，载入时整体上滑揭示。\n③关键参数（与调参面板一致）：主标题 title 默认 AI in Design（字符串）；主标题字号 titleSize 默认 96（px）；主标题色 titleColor 默认 #111111；小标签文字 tag 默认 Report 2026（字符串）；小标签色 tagColor 默认 #ffffff；小标签底色 tagBg 默认 #111111；对齐 align 默认 左（选项 左/中/右）；上下留白 pad 默认 80（px）；主标题字重 weight 默认 中黑（选项 常规/中黑/特黑）；入场位移 shift 默认 60（px）；底色 bg 默认 #ffffff；副文案 sub 默认 Designer Fund × Foundation Capital 年度设计报告（字符串）。\n④集成步骤：复制 assets/demos/英雄区排版.html 单文件；hero 内 .tag/.title/.sub 初始 opacity:0+translateY(shift)，进入视口（IntersectionObserver threshold 0.3）加 .in 复位；字重用 CSS 变量 --w 映射 400/600/900；详情页 postMessage 改 state 后 apply() 重设变量与文字，点「重播」重新 observe。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:var(--bg);}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .hero{min-height:60vh;display:flex;flex-direction:column;justify-content:center;padding:var(--pad) 8vw;text-align:var(--align);}\n  .tag{align-self:var(--as);background:var(--tagBg);color:var(--tagColor);font-size:14px;font-weight:600;padding:6px 14px;border-radius:999px;margin-bottom:20px;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .6s var(--ease),transform .6s var(--ease);}\n  .title{margin:0;font-size:var(--titleSize);line-height:1.05;color:var(--titleColor);font-weight:var(--w);letter-spacing:-.03em;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .7s var(--ease),transform .7s var(--ease);}\n  .sub{margin:22px 0 0;font-size:17px;color:#666;max-width:46ch;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .6s var(--ease) .15s,transform .6s var(--ease) .15s;}\n  .hero.in .tag,.hero.in .title,.hero.in .sub{opacity:1;transform:translateY(0);}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <header class=\"hero\" id=\"hero\">\n    <span class=\"tag\" id=\"tag\">Report 2026</span>\n    <h1 class=\"title\" id=\"title\">AI in Design</h1>\n    <p class=\"sub\" id=\"sub\">Designer Fund × Foundation Capital 年度设计报告</p>\n  </header>\n  <div class=\"hint\">向下滚动 / 调右侧参数看变化</div>\n  <script>\n  const state = {\n    title: \"AI in Design\", titleSize: 96, titleColor: \"#111111\",\n    tag: \"Report 2026\", tagColor: \"#ffffff\", tagBg: \"#111111\",\n    align: \"左\", pad: 80, weight: \"中黑\", shift: 60, bg: \"#ffffff\",\n    sub: \"Designer Fund × Foundation Capital 年度设计报告\"\n  };\n  const root = document.documentElement;\n  const W = { \"常规\":\"400\", \"中黑\":\"600\", \"特黑\":\"900\" };\n  const AM = { \"左\":[\"left\",\"flex-start\"], \"中\":[\"center\",\"center\"], \"右\":[\"right\",\"flex-end\"] };\n  function apply(){\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--titleSize\", state.titleSize + \"px\");\n    root.style.setProperty(\"--titleColor\", state.titleColor);\n    root.style.setProperty(\"--tagColor\", state.tagColor);\n    root.style.setProperty(\"--tagBg\", state.tagBg);\n    root.style.setProperty(\"--pad\", state.pad + \"px\");\n    root.style.setProperty(\"--w\", W[state.weight] || \"600\");\n    root.style.setProperty(\"--shift\", state.shift + \"px\");\n    root.style.setProperty(\"--align\", AM[state.align][0]);\n    root.style.setProperty(\"--as\", AM[state.align][1]);\n    document.getElementById(\"title\").textContent = state.title;\n    document.getElementById(\"tag\").textContent = state.tag;\n    document.getElementById(\"sub\").textContent = state.sub;\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 观察 hero\n    const h = document.getElementById(\"hero\");\n    h.classList.remove(\"in\");\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: 0.3 });\n    io.observe(h);\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "v132",
    标题: "普通单选下拉",
    分类: "组件",
    子类: "下拉选择",
    风格: ["极简", "通用"],
    场景: ["通用模块区", "全站通用"],
    元素: ["构成", "反馈"],
    搭配: [
      "分组下拉",
      "可搜索组合框"
    ],
    标签: [
      "下拉",
      "单选",
      "表单",
      "回填",
      "状态"
    ],
    来源: "视频拆解：8 种下拉选单组件（2026-08-30 用户提供，组件交互拆解；实现代码自写）",
    效果演示: "assets/demos/单选下拉.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "text",
        名: "文本色",
        类型: "color",
        默认: "#1f2937"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 10
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.6,
        步长: 0.02,
        默认: 0.22
      },
      {
        键: "border",
        名: "边框色",
        类型: "color",
        默认: "#d1d5db"
      },
      {
        键: "hoverBg",
        名: "选项悬浮背景",
        类型: "color",
        默认: "#eff6ff"
      },
      {
        键: "menuMaxH",
        名: "菜单最大高（px）",
        类型: "slider",
        最小: 120,
        最大: 360,
        步长: 20,
        默认: 240
      },
      {
        键: "arrowColor",
        名: "箭头色",
        类型: "color",
        默认: "#6b7280"
      },
      {
        键: "align",
        名: "对齐",
        类型: "select",
        选项: ["左","中","右"],
        默认: "左"
      },
      {
        键: "placeholder",
        名: "占位文案",
        类型: "string",
        默认: "请选择"
      },
      {
        键: "shadow",
        名: "投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.3,
        步长: 0.02,
        默认: 0.12
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n最常见的下拉选单：触发区显示当前选中项或占位文案，点击展开浮层选项列表，选中后自动收起并把值回填到触发区。选中项高亮主题色。适用于固定选项中单选的场景。\n能怎么改：拖滑杆调「主题色、文本色、圆角（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点触发区展开/收起；点选项回填并关闭；点外部关闭。调「主题色/圆角/展开时长」看整体气质；调「菜单最大高」应对长列表。",
    提示词: "帮我做\"普通单选下拉\"（纯 HTML/CSS/JS）：\n效果：触发区显示选中项或占位文案，点击展开浮层选项列表，选中后自动收起并把值回填触发区，选中项高亮主题色。适用固定选项中单选。\n用法示例：\n<div class=\"field\"><div class=\"trigger\"><span class=\"val\">请选择</span></div><div class=\"menu\"><div class=\"opt\">苹果</div>...</div></div>\n// 点选项：val.textContent=选中值; field.classList.remove(\"open\")\n关键参数：\n- theme 主题色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / border 边框色 / hoverBg 选项悬浮背景 / menuMaxH 菜单最大高（px） / arrowColor 箭头色 / align 对齐 / placeholder 占位文案 / shadow 投影浓度\n集成步骤：\n1. 复制 assets/demos/单选下拉.html 单文件（state + apply + postMessage 调参骨架）\n2. 选项数组换成你的数据，apply() 里把主题色/圆角/展开时长映射到 CSS 变量\n3. 详情页 postMessage({type:\"param\",key,value}) 改 state 后 apply() 实时预览",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>单选下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:260px; }\n  .trigger {\n    width:100%; display:flex; align-items:center; gap:8px;\n    padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,var(--shadow,.12)); transition:border-color .15s;\n    justify-content:var(--align,flex-start);\n  }\n  .trigger .val { flex:1; text-align:inherit; }\n  .trigger .val.ph { color:#9ca3af; }\n  .caret { transition:transform var(--dur,.22s) ease; color:var(--arrow,#6b7280); flex:none; }\n  .field.open .caret { transform:rotate(180deg); }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12));\n    max-height:var(--maxh,240px); overflow:auto; opacity:0; transform:translateY(-6px); pointer-events:none;\n    transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:5;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .opt { padding:10px 14px; font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; }\n  .opt:hover { background:var(--hover,#eff6ff); }\n  .opt.sel { color:var(--theme,#2563eb); font-weight:700; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <p class=\"hint\">点击展开 · 选中自动回填并更新状态</p>\n<script>\n  const OPTIONS = [\"苹果\",\"香蕉\",\"橙子\",\"西瓜\",\"葡萄\",\"芒果\",\"荔枝\",\"菠萝\",\"草莓\",\"蓝莓\"];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.22,\n    border:\"#d1d5db\", hoverBg:\"#eff6ff\", menuMaxH:240, arrowColor:\"#6b7280\",\n    align:\"左\", placeholder:\"请选择\", shadow:0.12\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"),\n        val=document.getElementById(\"val\"), menu=document.getElementById(\"menu\");\n  let selected=null, open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    OPTIONS.forEach(o=>{\n      const d=document.createElement(\"div\");\n      d.className=\"opt\"+(o===selected?\" sel\":\"\");\n      d.textContent=o;\n      d.onclick=()=>{ selected=o; val.textContent=o; val.classList.remove(\"ph\"); close(); markSel(); };\n      menu.appendChild(d);\n    });\n  }\n  function markSel(){ [...menu.children].forEach((c,i)=> c.classList.toggle(\"sel\", OPTIONS[i]===selected)); }\n  function openMenu(){ open=true; field.classList.add(\"open\"); }\n  function close(){ open=false; field.classList.remove(\"open\"); }\n  trigger.onclick=()=> open?close():openMenu();\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)) close(); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme);\n    R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border);\n    R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--maxh\",state.menuMaxH+\"px\");\n    R.setProperty(\"--arrow\",state.arrowColor);\n    R.setProperty(\"--shadow\",state.shadow);\n    R.setProperty(\"--align\", state.align===\"左\"?\"flex-start\":state.align===\"右\"?\"flex-end\":\"center\");\n    if(!selected){ val.textContent=state.placeholder; val.classList.add(\"ph\"); }\n    buildMenu(); markSel();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v133",
    标题: "分组下拉",
    分类: "组件",
    子类: "下拉选择",
    风格: ["极简", "信息型"],
    场景: ["通用模块区", "全站通用"],
    元素: ["构成"],
    搭配: [
      "普通单选下拉",
      "级联选择器"
    ],
    标签: [
      "下拉",
      "分组",
      "组标题",
      "回填"
    ],
    来源: "视频拆解：8 种下拉选单组件（2026-08-30 用户提供，组件交互拆解；实现代码自写）",
    效果演示: "assets/demos/分组下拉.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "text",
        名: "文本色",
        类型: "color",
        默认: "#1f2937"
      },
      {
        键: "groupTitle",
        名: "组标题色",
        类型: "color",
        默认: "#9ca3af"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 10
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.6,
        步长: 0.02,
        默认: 0.22
      },
      {
        键: "border",
        名: "边框色",
        类型: "color",
        默认: "#d1d5db"
      },
      {
        键: "hoverBg",
        名: "选项悬浮背景",
        类型: "color",
        默认: "#f3f4f6"
      },
      {
        键: "groupTitleSize",
        名: "组标题字号（px）",
        类型: "slider",
        最小: 10,
        最大: 16,
        步长: 1,
        默认: 12
      },
      {
        键: "groupGap",
        名: "组间距（px）",
        类型: "slider",
        最小: 0,
        最大: 16,
        步长: 1,
        默认: 6
      },
      {
        键: "placeholder",
        名: "占位文案",
        类型: "string",
        默认: "请选择城市"
      },
      {
        键: "arrowColor",
        名: "箭头色",
        类型: "color",
        默认: "#6b7280"
      }
    ],
    效果说明: "针对大量同层级选项，按类别分组展示（如华北/华东/华南）。组名是小标题、不可选，仅作视觉分组；选项可点选并回填对应内容。比扁平长列表更易扫读。\n能怎么改：拖滑杆调「主题色、文本色、组标题色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点选项回填；组标题只分组不响应点击。调「组标题色/组标题字号」区分层级；调「组间距」控制分组呼吸感。",
    提示词: "帮我做\"分组下拉\"（纯 HTML/CSS/JS）：\n效果：大量同层级选项按类别分组（组名仅作分组、不可选），点选项回填对应内容。比扁平长列表更易扫读。\n用法示例：\n<div class=\"grp\"><div class=\"ghead\">华北</div><div class=\"opt\">北京</div>...</div>\n// 组标题 ghead 不绑 onclick；opt 点击回填\n关键参数：\n- theme 主题色 / text 文本色 / groupTitle 组标题色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / border 边框色 / hoverBg 选项悬浮背景 / groupTitleSize 组标题字号（px） / groupGap 组间距（px） / placeholder 占位文案 / arrowColor 箭头色\n集成步骤：\n1. 复制 assets/demos/分组下拉.html 单文件\n2. GROUPS 换成你的分组数据（name + items 数组）\n3. apply() 把组标题色/组标题字号/组间距映射到 CSS 变量，选项交互照旧",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>分组下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:280px; }\n  .trigger {\n    width:100%; display:flex; align-items:center; gap:8px;\n    padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,var(--shadow,.12)); transition:border-color .15s;\n  }\n  .trigger .val { flex:1; }\n  .trigger .val.ph { color:#9ca3af; }\n  .caret { transition:transform var(--dur,.22s) ease; color:var(--arrow,#6b7280); flex:none; }\n  .field.open .caret { transform:rotate(180deg); }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12));\n    max-height:300px; overflow:auto; opacity:0; transform:translateY(-6px); pointer-events:none;\n    transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:5; padding:6px;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .ghead { padding:8px 12px 4px; font-size:var(--gts,12px); color:var(--gt,#9ca3af); font-weight:700; letter-spacing:.04em; }\n  .opt { padding:9px 12px; font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; border-radius:7px; }\n  .opt:hover { background:var(--hover,#f3f4f6); }\n  .opt.sel { color:var(--theme,#2563eb); font-weight:700; }\n  .grp + .grp { margin-top:var(--ggap,6px); }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择城市</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <p class=\"hint\">组名不可选 · 选中回填对应内容</p>\n<script>\n  const GROUPS = [\n    { name:\"华北\", items:[\"北京\",\"天津\",\"石家庄\"] },\n    { name:\"华东\", items:[\"上海\",\"杭州\",\"南京\",\"苏州\"] },\n    { name:\"华南\", items:[\"广州\",\"深圳\",\"厦门\"] }\n  ];\n  const FLAT = GROUPS.flatMap(g=>g.items);\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", groupTitle:\"#9ca3af\", radius:10, fontSize:15, dur:0.22,\n    border:\"#d1d5db\", hoverBg:\"#f3f4f6\", groupTitleSize:12, groupGap:6, placeholder:\"请选择城市\", arrowColor:\"#6b7280\"\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"),\n        val=document.getElementById(\"val\"), menu=document.getElementById(\"menu\");\n  let selected=null, open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    GROUPS.forEach(g=>{\n      const wrap=document.createElement(\"div\"); wrap.className=\"grp\";\n      const h=document.createElement(\"div\"); h.className=\"ghead\"; h.textContent=g.name; wrap.appendChild(h);\n      g.items.forEach(o=>{\n        const d=document.createElement(\"div\");\n        d.className=\"opt\"+(o===selected?\" sel\":\"\"); d.textContent=o;\n        d.onclick=()=>{ selected=o; val.textContent=o; val.classList.remove(\"ph\"); close(); };\n        wrap.appendChild(d);\n      });\n      menu.appendChild(wrap);\n    });\n  }\n  function openMenu(){ open=true; field.classList.add(\"open\"); }\n  function close(){ open=false; field.classList.remove(\"open\"); }\n  trigger.onclick=()=> open?close():openMenu();\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)) close(); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--gt\",state.groupTitle); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--gts\",state.groupTitleSize+\"px\"); R.setProperty(\"--ggap\",state.groupGap+\"px\");\n    R.setProperty(\"--arrow\",state.arrowColor);\n    if(!selected){ val.textContent=state.placeholder; val.classList.add(\"ph\"); }\n    buildMenu();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v134",
    标题: "可搜索组合框",
    分类: "组件",
    子类: "菜单搜索",
    风格: ["信息型", "通用"],
    场景: ["通用模块区", "后台·数据看板", "全站通用"],
    元素: ["构成"],
    搭配: [
      "普通单选下拉",
      "多选下拉"
    ],
    标签: [
      "组合框",
      "搜索",
      "筛选",
      "回填",
      "高亮"
    ],
    来源: "视频拆解：8 种下拉选单组件（2026-08-30 用户提供，组件交互拆解；实现代码自写）",
    效果演示: "assets/demos/搜索组合框.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "text",
        名: "文本色",
        类型: "color",
        默认: "#1f2937"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 10
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.5,
        步长: 0.02,
        默认: 0.2
      },
      {
        键: "border",
        名: "边框色",
        类型: "color",
        默认: "#d1d5db"
      },
      {
        键: "hoverBg",
        名: "选项悬浮背景",
        类型: "color",
        默认: "#eff6ff"
      },
      {
        键: "inputBg",
        名: "输入框底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "matchColor",
        名: "匹配高亮色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "noResult",
        名: "无结果文案",
        类型: "string",
        默认: "无匹配项"
      },
      {
        键: "placeholder",
        名: "搜索占位",
        类型: "string",
        默认: "输入关键词筛选…"
      },
      {
        键: "minChars",
        名: "触发字符数",
        类型: "slider",
        最小: 0,
        最大: 3,
        步长: 1,
        默认: 1
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n输入框 + 下拉的混合体：选项过多时支持关键词实时筛选，匹配到的子串高亮；选中后回填到输入框并切换关联预览（这里回填文案）。是下拉在大列表下的高效形态。\n能怎么改：拖滑杆调「主题色、文本色、圆角（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "输入即筛选、命中高亮；点选项回填并关闭。调「匹配高亮色」强化命中；调「触发字符数」控制空输入时是否展示全部。",
    提示词: "帮我做\"可搜索组合框\"（纯 HTML/CSS/JS）：\n效果：输入框 + 下拉混合体，选项过多时关键词实时筛选、命中子串高亮，选中回填输入框。大列表下的高效形态。\n用法示例：\n<input id=\"inp\"><div class=\"menu\"><div class=\"opt\">北京</div></div>\n// 输入：list = OPTIONS.filter(o=>o.toLowerCase().includes(q)); 命中用 <mark> 高亮\n关键参数：\n- theme 主题色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / border 边框色 / hoverBg 选项悬浮背景 / inputBg 输入框底色 / matchColor 匹配高亮色 / noResult 无结果文案 / placeholder 搜索占位 / minChars 触发字符数\n集成步骤：\n1. 复制 assets/demos/搜索组合框.html 单文件\n2. OPTIONS 换成你的数据；render() 里用 includes 过滤、用 <mark> 包命中片段\n3. 调「触发字符数」控制空输入时是否展示全部",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>可搜索组合框演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:280px; }\n  .box {\n    display:flex; align-items:center; gap:8px; padding:4px 12px; background:var(--ibg,#fff);\n    border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    box-shadow:0 4px 14px rgba(0,0,0,var(--shadow,.12)); transition:border-color .15s;\n  }\n  .field.open .box { border-color:var(--theme,#2563eb); }\n  .box svg { color:var(--arrow,#6b7280); flex:none; }\n  #inp {\n    flex:1; border:0; outline:0; background:transparent; padding:9px 0; font-size:var(--fs,15px);\n    color:var(--text,#1f2937); font-family:inherit;\n  }\n  #inp::placeholder { color:#9ca3af; }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12));\n    max-height:260px; overflow:auto; opacity:0; transform:translateY(-6px); pointer-events:none;\n    transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .opt { padding:10px 14px; font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; }\n  .opt:hover { background:var(--hover,#eff6ff); }\n  .opt mark { background:transparent; color:var(--mc,#2563eb); font-weight:700; }\n  .opt.none { color:#9ca3af; cursor:default; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"box\">\n      <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-4-4\"/></svg>\n      <input id=\"inp\" type=\"text\" placeholder=\"输入关键词筛选…\" autocomplete=\"off\">\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <p class=\"hint\">输入实时筛选 · 选中回填输入框</p>\n<script>\n  const OPTIONS = [\"北京\",\"上海\",\"广州\",\"深圳\",\"杭州\",\"成都\",\"西安\",\"武汉\",\"南京\",\"重庆\",\"苏州\",\"天津\",\"长沙\",\"青岛\",\"厦门\",\"昆明\"];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.2,\n    border:\"#d1d5db\", hoverBg:\"#eff6ff\", inputBg:\"#ffffff\", matchColor:\"#2563eb\",\n    noResult:\"无匹配项\", placeholder:\"输入关键词筛选…\", minChars:1\n  };\n  const field=document.getElementById(\"field\"), inp=document.getElementById(\"inp\"), menu=document.getElementById(\"menu\");\n  let open=false;\n  function esc(s){ return s.replace(/[&<>]/g,c=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\"}[c])); }\n  function render(){\n    const q=inp.value.trim().toLowerCase();\n    const list = q.length < state.minChars ? OPTIONS : OPTIONS.filter(o=>o.toLowerCase().includes(q));\n    if(!list.length){ menu.innerHTML='<div class=\"opt none\">'+esc(state.noResult)+'</div>'; return; }\n    menu.innerHTML = list.map(o=>{\n      let html=esc(o);\n      if(q){ const i=o.toLowerCase().indexOf(q); if(i>=0) html=esc(o.slice(0,i))+\"<mark>\"+esc(o.slice(i,i+q.length))+\"</mark>\"+esc(o.slice(i+q.length)); }\n      return '<div class=\"opt\">'+html+'</div>';\n    }).join(\"\");\n    [...menu.children].forEach((c,i)=>{ if(list[i]) c.onclick=()=>{ inp.value=list[i]; close(); }; });\n  }\n  function openMenu(){ open=true; field.classList.add(\"open\"); render(); }\n  function close(){ open=false; field.classList.remove(\"open\"); }\n  inp.addEventListener(\"focus\",openMenu);\n  inp.addEventListener(\"input\",()=>{ open=true; field.classList.add(\"open\"); render(); });\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)) close(); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--border\",state.border);\n    R.setProperty(\"--hover\",state.hoverBg); R.setProperty(\"--ibg\",state.inputBg);\n    R.setProperty(\"--mc\",state.matchColor); R.setProperty(\"--arrow\",state.theme);\n    R.setProperty(\"--shadow\",0.12);\n    inp.placeholder=state.placeholder;\n    render();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v135",
    标题: "拆分按钮",
    分类: "组件",
    子类: "按钮",
    风格: ["信息型", "通用"],
    场景: ["后台·数据看板", "工具·SaaS"],
    元素: ["构成"],
    搭配: [
      "普通单选下拉",
      "大型菜单"
    ],
    标签: [
      "拆分按钮",
      "默认操作",
      "次级菜单",
      " toolbar"
    ],
    来源: "视频拆解：8 种下拉选单组件（2026-08-30 用户提供，组件交互拆解；实现代码自写）",
    效果演示: "assets/demos/拆分按钮.html",
    参数: [
      {
        键: "mainColor",
        名: "主按钮色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "arrowColor",
        名: "箭头区底色",
        类型: "color",
        默认: "#1d4ed8"
      },
      {
        键: "text",
        名: "文本色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 10
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.5,
        步长: 0.02,
        默认: 0.18
      },
      {
        键: "menuBg",
        名: "菜单底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "hoverMenu",
        名: "菜单项悬浮",
        类型: "color",
        默认: "#f3f4f6"
      },
      {
        键: "divLine",
        名: "分隔线色",
        类型: "color",
        默认: "#e5e7eb"
      },
      {
        键: "shadow",
        名: "投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.3,
        步长: 0.02,
        默认: 0.12
      },
      {
        键: "arrowSize",
        名: "箭头大小（px）",
        类型: "slider",
        最小: 10,
        最大: 20,
        步长: 1,
        默认: 14
      },
      {
        键: "defaultLabel",
        名: "默认动作文案",
        类型: "string",
        默认: "保存"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n把常用动作和备选动作整合到一个控件：左侧按钮主体执行默认操作（如保存），右侧箭头展开次级操作菜单（保存并关闭/另存为/导出/删除）。节省工具栏空间、突出主操作。\n能怎么改：拖滑杆调「主按钮色、箭头区底色、文本色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点主体执行默认；点箭头展开菜单选其他动作。调「主按钮色/箭头区底色」区分主从；调「默认动作文案」换主操作。",
    提示词: "帮我做\"拆分按钮\"（纯 HTML/CSS/JS）：\n效果：左侧主体按钮执行默认操作，右侧箭头展开次级操作菜单。节省工具栏空间、突出主操作。\n用法示例：\n<div class=\"split\"><button class=\"main\">保存</button><button class=\"arrow\">▾</button><div class=\"menu\">...</div></div>\n// 主体 click → 执行默认；箭头 click → 切换菜单\n关键参数：\n- mainColor 主按钮色 / arrowColor 箭头区底色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / menuBg 菜单底色 / hoverMenu 菜单项悬浮 / divLine 分隔线色 / shadow 投影浓度 / arrowSize 箭头大小（px） / defaultLabel 默认动作文案\n集成步骤：\n1. 复制 assets/demos/拆分按钮.html 单文件\n2. 菜单项换成你的次级动作，main click 绑默认逻辑\n3. 调「主按钮色/箭头区底色」区分主从，文本色通常白",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>拆分按钮演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .split { display:inline-flex; box-shadow:0 6px 18px rgba(0,0,0,var(--shadow,.12)); border-radius:var(--radius,10px); }\n  .main {\n    border:0; outline:0; cursor:pointer; padding:12px 22px; font-size:var(--fs,15px); font-weight:700;\n    background:var(--main,#2563eb); color:var(--text,#fff); border-radius:var(--radius,10px) 0 0 var(--radius,10px);\n    font-family:inherit;\n  }\n  .arrow {\n    border:0; outline:0; cursor:pointer; padding:0 14px; display:flex; align-items:center; justify-content:center;\n    background:var(--acol,#1d4ed8); border-left:1px solid var(--div,#e5e7eb); border-radius:0 var(--radius,10px) var(--radius,10px) 0;\n    color:var(--text,#fff); font-size:var(--asize,14px);\n  }\n  .arrow svg { transition:transform var(--dur,.18s) ease; }\n  .split.open .arrow svg { transform:rotate(180deg); }\n  .menu {\n    position:absolute; min-width:180px; background:var(--mbg,#fff); border:1px solid var(--div,#e5e7eb);\n    border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12)); overflow:hidden;\n    opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.18s) ease, transform var(--dur,.18s) ease; z-index:5;\n  }\n  .split.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .mi { padding:11px 16px; font-size:var(--fs,15px); color:#1f2937; cursor:pointer; }\n  .mi:hover { background:var(--hm,#f3f4f6); }\n  .mi.danger { color:#dc2626; }\n  .wrap { position:relative; display:inline-flex; }\n  .toast {\n    position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(10px); opacity:0;\n    background:#111827; color:#fff; padding:10px 18px; border-radius:10px; font-size:14px; transition:.2s; pointer-events:none;\n  }\n  .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }\n  .hint { font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"wrap\">\n    <div class=\"split\" id=\"split\">\n      <button class=\"main\" id=\"main\">保存</button>\n      <button class=\"arrow\" id=\"arrow\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\"><path d=\"M6 9l6 6 6-6\"/></svg></button>\n      <div class=\"menu\" id=\"menu\">\n        <div class=\"mi\" data-a=\"保存并关闭\">保存并关闭</div>\n        <div class=\"mi\" data-a=\"另存为…\">另存为…</div>\n        <div class=\"mi\" data-a=\"导出 PDF\">导出 PDF</div>\n        <div class=\"mi danger\" data-a=\"删除\">删除</div>\n      </div>\n    </div>\n  </div>\n  <p class=\"hint\">点按钮主体执行默认 · 点箭头展开其他操作</p>\n  <div class=\"toast\" id=\"toast\"></div>\n<script>\n  const state = {\n    mainColor:\"#2563eb\", arrowColor:\"#1d4ed8\", text:\"#ffffff\", radius:10, fontSize:15, dur:0.18,\n    menuBg:\"#ffffff\", hoverMenu:\"#f3f4f6\", divLine:\"#e5e7eb\", shadow:0.12, arrowSize:14, defaultLabel:\"保存\"\n  };\n  const split=document.getElementById(\"split\"), main=document.getElementById(\"main\"), arrow=document.getElementById(\"arrow\"),\n        menu=document.getElementById(\"menu\"), toast=document.getElementById(\"toast\");\n  let open=false, t=null;\n  function showToast(msg){ toast.textContent=msg; toast.classList.add(\"show\"); clearTimeout(t); t=setTimeout(()=>toast.classList.remove(\"show\"),1400); }\n  function toggle(){ open=!open; split.classList.toggle(\"open\",open); }\n  arrow.onclick=(e)=>{ e.stopPropagation(); toggle(); };\n  main.onclick=()=> showToast(\"已执行：\" + state.defaultLabel);\n  [...menu.children].forEach(mi=> mi.onclick=()=>{ showToast(\"已执行：\" + mi.dataset.a); open=false; split.classList.remove(\"open\"); });\n  document.addEventListener(\"click\",e=>{ if(!split.contains(e.target)){ open=false; split.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--main\",state.mainColor); R.setProperty(\"--acol\",state.arrowColor);\n    R.setProperty(\"--text\",state.text); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--mbg\",state.menuBg); R.setProperty(\"--hm\",state.hoverMenu);\n    R.setProperty(\"--div\",state.divLine); R.setProperty(\"--shadow\",state.shadow);\n    R.setProperty(\"--asize\",state.arrowSize+\"px\");\n    main.textContent=state.defaultLabel;\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v136",
    标题: "日期选择器",
    分类: "组件",
    子类: "表单",
    风格: ["极简", "通用"],
    场景: ["通用模块区", "电商·预订", "后台·数据看板"],
    元素: ["构成"],
    搭配: [
      "普通单选下拉"
    ],
    标签: [
      "日期",
      "日历",
      "单日",
      "范围",
      "回填"
    ],
    来源: "视频拆解：8 种下拉选单组件（2026-08-30 用户提供，组件交互拆解；实现代码自写）",
    效果演示: "assets/demos/日期选择器.html",
    参数: [
      {
        键: "theme",
        名: "选中日色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "text",
        名: "文本色",
        类型: "color",
        默认: "#1f2937"
      },
      {
        键: "todayColor",
        名: "今天标记色",
        类型: "color",
        默认: "#ef4444"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 8
      },
      {
        键: "cellSize",
        名: "单元格大小（px）",
        类型: "slider",
        最小: 28,
        最大: 48,
        步长: 1,
        默认: 36
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.5,
        步长: 0.02,
        默认: 0.2
      },
      {
        键: "weekStart",
        名: "周起始",
        类型: "select",
        选项: ["日","一"],
        默认: "日"
      },
      {
        键: "showRange",
        名: "范围选择",
        类型: "switch",
        默认: false
      },
      {
        键: "border",
        名: "边框色",
        类型: "color",
        默认: "#e5e7eb"
      },
      {
        键: "hoverBg",
        名: "悬浮背景",
        类型: "color",
        默认: "#eff6ff"
      },
      {
        键: "headerColor",
        名: "头部色",
        类型: "color",
        默认: "#111827"
      },
      {
        键: "weekendColor",
        名: "周末色",
        类型: "color",
        默认: "#6b7280"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n弹出月历选择单日或日期范围：今天用环标记，周末用弱化色，选中日填充主题色；范围模式下两次点击高亮连续区间。选完回填到触发字段。\n能怎么改：拖滑杆调「选中日色、文本色、今天标记色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点触发区展开月历；‹ › 翻月；点日单选或点两日成范围。调「周起始」切周日/周一开头；调「范围选择」切单日/区间模式。",
    提示词: "帮我做\"日期选择器\"（纯 HTML/CSS/JS）：\n效果：弹月历选单日或范围，今天环标记、周末弱化色、选中日填主题色；范围模式两击高亮连续区间，选完回填字段。\n用法示例：\n<div class=\"grid\">7列：周几头 + 日期格</div>\n// 生成当月：lead=(首日为周几 - 周起始+7)%7; 天数=new Date(y,m+1,0).getDate()\n关键参数：\n- theme 选中日色 / text 文本色 / todayColor 今天标记色 / radius 圆角（px） / cellSize 单元格大小（px） / dur 展开时长（秒） / weekStart 周起始 / showRange 范围选择 / border 边框色 / hoverBg 悬浮背景 / headerColor 头部色 / weekendColor 周末色\n集成步骤：\n1. 复制 assets/demos/日期选择器.html 单文件\n2. weekStart 决定首列；showRange 切换单日/区间；今天用 new Date() 比较\n3. 调「单元格大小/选中日色/今天标记色」定视觉",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>日期选择器演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; }\n  .trigger {\n    width:200px; padding:11px 14px; background:#fff; border:1px solid var(--border,#e5e7eb); border-radius:var(--radius,8px);\n    font-size:15px; color:var(--text,#1f2937); cursor:pointer; text-align:center; user-select:none;\n  }\n  .pop {\n    position:absolute; top:calc(100% + 6px); left:0; width:280px; background:#fff; border:1px solid var(--border,#e5e7eb);\n    border-radius:var(--radius,8px); box-shadow:0 12px 34px rgba(0,0,0,.12); padding:12px; opacity:0; transform:translateY(-6px);\n    pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5;\n  }\n  .field.open .pop { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .head { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; color:var(--hc,#111827); font-weight:700; }\n  .head button { border:0; background:var(--hb,#f3f4f6); width:28px; height:28px; border-radius:7px; cursor:pointer; font-size:15px; color:var(--hc,#111827); }\n  .grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }\n  .wd { text-align:center; font-size:12px; color:#9ca3af; padding:4px 0; }\n  .cell {\n    height:var(--cs,36px); display:flex; align-items:center; justify-content:center; font-size:14px;\n    border-radius:8px; cursor:pointer; color:var(--text,#1f2937);\n  }\n  .cell.we { color:var(--we,#6b7280); }\n  .cell:hover { background:var(--hover,#eff6ff); }\n  .cell.muted { color:#cbd5e1; }\n  .cell.today { box-shadow:inset 0 0 0 2px var(--today,#ef4444); }\n  .cell.sel { background:var(--theme,#2563eb); color:#fff; }\n  .cell.in { background:var(--theme,#2563eb); color:#fff; opacity:.35; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">选择日期</div>\n    <div class=\"pop\" id=\"pop\">\n      <div class=\"head\">\n        <button id=\"prev\">‹</button>\n        <span id=\"title\"></span>\n        <button id=\"next\">›</button>\n      </div>\n      <div class=\"grid\" id=\"grid\"></div>\n    </div>\n  </div>\n  <p class=\"hint\">选单日或范围 · 选完回填字段</p>\n<script>\n  const WD_SUN = [\"日\",\"一\",\"二\",\"三\",\"四\",\"五\",\"六\"];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", todayColor:\"#ef4444\", radius:8, cellSize:36, dur:0.2,\n    weekStart:\"日\", showRange:false, border:\"#e5e7eb\", hoverBg:\"#eff6ff\", headerColor:\"#111827\", weekendColor:\"#6b7280\"\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), pop=document.getElementById(\"pop\"),\n        grid=document.getElementById(\"grid\"), title=document.getElementById(\"title\");\n  const today=new Date(); today.setHours(0,0,0,0);\n  let vy=today.getFullYear(), vm=today.getMonth(), sel=null, rs=null, re=null, open=false;\n  function same(a,b){ return a&&b&&a.getTime()===b.getTime(); }\n  function diffDays(a,b){ return Math.round((a-b)/864e5); }\n  function build(){\n    const startIdx = state.weekStart===\"日\" ? 0 : 1;\n    const wd=[...WD_SUN.slice(startIdx), ...WD_SUN.slice(0,startIdx)];\n    title.textContent = vy+\" 年 \"+(vm+1)+\" 月\";\n    let html=wd.map(w=>'<div class=\"wd\">'+w+'</div>').join(\"\");\n    const first=new Date(vy,vm,1), lead=(first.getDay()-startIdx+7)%7;\n    const days=new Date(vy,vm+1,0).getDate();\n    for(let i=0;i<lead;i++) html+='<div class=\"cell muted\"></div>';\n    for(let d=1;d<=days;d++){\n      const dt=new Date(vy,vm,d); const wdIdx=dt.getDay();\n      const we=(wdIdx===0||wdIdx===6)?\" we\":\"\";\n      const t=same(dt,today)?\" today\":\"\";\n      let cls=\"cell\"+we+t;\n      if(sel&&same(dt,sel)) cls+=\" sel\";\n      else if(state.showRange&&rs&&re){ if(diffDays(dt,rs)>=0&&diffDays(dt,re)<=0) cls+=\" in\"; }\n      html+='<div class=\"'+cls+'\" data-d=\"'+d+'\">'+d+'</div>';\n    }\n    grid.innerHTML=html;\n    [...grid.querySelectorAll(\".cell[data-d]\")].forEach(c=> c.onclick=()=> pick(new Date(vy,vm,+c.dataset.d)) );\n  }\n  function pick(dt){\n    if(state.showRange){\n      if(!rs||(rs&&re)){ rs=dt; re=null; sel=null; }\n      else if(dt<rs){ re=rs; rs=dt; } else { re=dt; }\n    } else { sel=dt; rs=re=null; trigger.textContent=(dt.getMonth()+1)+\" 月 \"+dt.getDate()+\" 日\"; }\n    build();\n  }\n  document.getElementById(\"prev\").onclick=()=>{ vm--; if(vm<0){vm=11;vy--;} build(); };\n  document.getElementById(\"next\").onclick=()=>{ vm++; if(vm>11){vm=0;vy++;} build(); };\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--today\",state.todayColor);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--cs\",state.cellSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--hc\",state.headerColor); R.setProperty(\"--we\",state.weekendColor);\n    build();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v137",
    标题: "级联选择器",
    分类: "组件",
    子类: "下拉选择",
    风格: ["信息型", "通用"],
    场景: ["通用模块区"],
    元素: ["构成"],
    搭配: [
      "分组下拉",
      "普通单选下拉"
    ],
    标签: [
      "级联",
      "层级",
      "路径",
      "回填"
    ],
    来源: "视频拆解：8 种下拉选单组件（2026-08-30 用户提供，组件交互拆解；实现代码自写）",
    效果演示: "assets/demos/级联选择器.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "text",
        名: "文本色",
        类型: "color",
        默认: "#1f2937"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 10
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.5,
        步长: 0.02,
        默认: 0.2
      },
      {
        键: "panelW",
        名: "面板列宽（px）",
        类型: "slider",
        最小: 120,
        最大: 240,
        步长: 10,
        默认: 180
      },
      {
        键: "pathColor",
        名: "路径文字色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "border",
        名: "边框色",
        类型: "color",
        默认: "#d1d5db"
      },
      {
        键: "hoverBg",
        名: "选项悬浮背景",
        类型: "color",
        默认: "#eff6ff"
      },
      {
        键: "arrowColor",
        名: "箭头色",
        类型: "color",
        默认: "#9ca3af"
      },
      {
        键: "sep",
        名: "路径分隔符",
        类型: "string",
        默认: " / "
      },
      {
        键: "lastFill",
        名: "末级回填",
        类型: "switch",
        默认: true
      }
    ],
    效果说明: "针对有上下级关系的数据（省→市→区），逐级展开多列面板，每列点选后在其右侧展开下一级；点到末级自动把完整路径（如 中国 / 浙江 / 杭州）回填触发区。比平铺下拉更贴合层级数据。\n能怎么改：拖滑杆调「主题色、文本色、圆角（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点某列项展开下一列；点末级回填路径。调「路径分隔符」换连接符；关「末级回填」可只展开不选。",
    提示词: "帮我做\"级联选择器\"（纯 HTML/CSS/JS）：\n效果：上下级数据逐级展开多列面板，每列点选在其右侧展开下一级，末级自动把完整路径（如 中国 / 浙江 / 杭州）回填触发区。\n用法示例：\n<div class=\"panel\"><div class=\"col\">中国/美国</div><div class=\"col\">浙江/江苏…</div></div>\n// choose(ci,node)：path=path.slice(0,ci); 有 children 就展开下一列，否则回填\n关键参数：\n- theme 主题色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / panelW 面板列宽（px） / pathColor 路径文字色 / border 边框色 / hoverBg 选项悬浮背景 / arrowColor 箭头色 / sep 路径分隔符 / lastFill 末级回填\n集成步骤：\n1. 复制 assets/demos/级联选择器.html 单文件\n2. TREE 换成你的层级数据（name + children 递归）\n3. 调「路径分隔符/面板列宽/末级回填」；apply() 映射到 CSS 变量",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>级联选择器演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:260px; }\n  .trigger {\n    width:100%; padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:15px; color:var(--text,#1f2937); cursor:pointer; user-select:none; box-shadow:0 4px 14px rgba(0,0,0,.12);\n    display:flex; align-items:center; gap:8px; justify-content:space-between;\n  }\n  .trigger .val.ph { color:#9ca3af; }\n  .trigger .val.path { color:var(--pc,#2563eb); font-weight:600; }\n  .panel {\n    position:absolute; top:calc(100% + 6px); left:0; display:flex; gap:var(--cgap,4px); background:#fff;\n    border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px); box-shadow:0 12px 30px rgba(0,0,0,.12);\n    padding:6px; opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5;\n  }\n  .field.open .panel { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .col { width:var(--pw,180px); max-height:240px; overflow:auto; }\n  .col + .col { border-left:1px solid var(--border,#d1d5db); }\n  .ci { display:flex; align-items:center; justify-content:space-between; padding:9px 12px; border-radius:7px; font-size:15px; color:var(--text,#1f2937); cursor:pointer; }\n  .ci:hover { background:var(--hover,#eff6ff); }\n  .ci.on { color:var(--theme,#2563eb); font-weight:700; }\n  .ci .a { color:var(--arrow,#9ca3af); }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择地区</span>\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"panel\" id=\"panel\"></div>\n  </div>\n  <p class=\"hint\">逐级选择 · 末级回填完整路径</p>\n<script>\n  const TREE = [\n    { name:\"中国\", children:[\n      { name:\"浙江\", children:[{name:\"杭州\"},{name:\"宁波\"},{name:\"温州\"}] },\n      { name:\"江苏\", children:[{name:\"南京\"},{name:\"苏州\"},{name:\"无锡\"}] },\n      { name:\"广东\", children:[{name:\"广州\"},{name:\"深圳\"},{name:\"东莞\"}] }\n    ]},\n    { name:\"美国\", children:[\n      { name:\"加州\", children:[{name:\"旧金山\"},{name:\"洛杉矶\"}] },\n      { name:\"纽约州\", children:[{name:\"纽约市\"},{name:\"布法罗\"}] }\n    ]}\n  ];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.2, panelW:180,\n    pathColor:\"#2563eb\", border:\"#d1d5db\", hoverBg:\"#eff6ff\", arrowColor:\"#9ca3af\", sep:\" / \", colGap:4, lastFill:true\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), val=document.getElementById(\"val\"),\n        panel=document.getElementById(\"panel\");\n  let path=[], cols=[TREE], open=false;\n  function render(){\n    panel.innerHTML=\"\";\n    cols.forEach((list, ci)=>{\n      const col=document.createElement(\"div\"); col.className=\"col\";\n      list.forEach(node=>{\n        const d=document.createElement(\"div\");\n        const on = path[ci] && path[ci].name===node.name;\n        d.className=\"ci\"+(on?\" on\":\"\");\n        d.innerHTML='<span>'+node.name+'</span>'+(node.children?'<span class=\"a\">›</span>':'');\n        d.onclick=()=> choose(ci, node);\n        col.appendChild(d);\n      });\n      panel.appendChild(col);\n    });\n  }\n  function choose(ci, node){\n    path=path.slice(0,ci); path[ci]=node;\n    if(node.children){ cols=cols.slice(0,ci+1); cols[ci+1]=node.children; render(); }\n    else {\n      if(state.lastFill){ val.textContent=path.map(p=>p.name).join(state.sep); val.classList.remove(\"ph\"); val.classList.add(\"path\"); }\n      open=false; field.classList.remove(\"open\");\n    }\n  }\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); if(open) render(); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--pw\",state.panelW+\"px\");\n    R.setProperty(\"--pc\",state.pathColor); R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--arrow\",state.arrowColor);\n    render();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v138",
    标题: "多选下拉",
    分类: "组件",
    子类: "下拉选择",
    风格: ["信息型", "通用"],
    场景: ["通用模块区", "全站通用"],
    元素: ["构成"],
    搭配: [
      "可搜索组合框",
      "普通单选下拉"
    ],
    标签: [
      "多选",
      "标签",
      "复选",
      "回填"
    ],
    来源: "视频拆解：8 种下拉选单组件（2026-08-30 用户提供，组件交互拆解；实现代码自写）",
    效果演示: "assets/demos/多选下拉.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "tagBg",
        名: "标签底色",
        类型: "color",
        默认: "#dbeafe"
      },
      {
        键: "text",
        名: "文本色",
        类型: "color",
        默认: "#1f2937"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 10
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.5,
        步长: 0.02,
        默认: 0.2
      },
      {
        键: "border",
        名: "边框色",
        类型: "color",
        默认: "#d1d5db"
      },
      {
        键: "hoverBg",
        名: "选项悬浮背景",
        类型: "color",
        默认: "#eff6ff"
      },
      {
        键: "tagText",
        名: "标签文字色",
        类型: "color",
        默认: "#1e40af"
      },
      {
        键: "tagRadius",
        名: "标签圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 16,
        步长: 1,
        默认: 6
      },
      {
        键: "placeholder",
        名: "占位文案",
        类型: "string",
        默认: "请选择（可多选）"
      },
      {
        键: "maxTags",
        名: "最大标签数（0=不限）",
        类型: "slider",
        最小: 0,
        最大: 6,
        步长: 1,
        默认: 0
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n支持多选的下拉：选中项以标签（chip）形式呈现在触发区，标签带 × 可删除；超过「最大标签数」时折叠为 +N。选中数量与关联结果同步更新，适合给一条数据挂多个标签/分类。\n能怎么改：拖滑杆调「主题色、标签底色、文本色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "勾选添加、点 × 删除；数量实时同步。调「标签底色/标签圆角」定气质；调「最大标签数」控制触发区长度。",
    提示词: "帮我做\"多选下拉\"（纯 HTML/CSS/JS）：\n效果：支持多选，选中项以标签 chip 呈现在触发区、带 × 删除；超「最大标签数」折叠为 +N，数量与结果同步。\n用法示例：\n<div class=\"trigger\"><span class=\"tag\">设计 <b>×</b></span>...</div>\n// 勾选：sel.push(o); 删除：sel=sel.filter(x=>x!==o); 渲染标签\n关键参数：\n- theme 主题色 / tagBg 标签底色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / border 边框色 / hoverBg 选项悬浮背景 / tagText 标签文字色 / tagRadius 标签圆角（px） / placeholder 占位文案 / maxTags 最大标签数（0=不限）\n集成步骤：\n1. 复制 assets/demos/多选下拉.html 单文件\n2. OPTIONS 换成你的数据；renderTags() 渲染 chip、maxTags 控制折叠\n3. 调「标签底色/标签圆角/最大标签数」定气质",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>多选下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:300px; }\n  .trigger {\n    min-height:46px; display:flex; align-items:center; flex-wrap:wrap; gap:6px; padding:8px 12px; background:#fff;\n    border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,.12); transition:border-color .15s;\n  }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .trigger .ph { color:#9ca3af; font-size:var(--fs,15px); }\n  .tag {\n    display:inline-flex; align-items:center; gap:6px; padding:4px 8px; background:var(--tagbg,#dbeafe);\n    color:var(--tagtext,#1e40af); border-radius:var(--tr,6px); font-size:13px; font-weight:600;\n  }\n  .tag b { cursor:pointer; font-weight:700; opacity:.7; }\n  .tag b:hover { opacity:1; }\n  .caret { margin-left:auto; color:#6b7280; transition:transform var(--dur,.2s) ease; }\n  .field.open .caret { transform:rotate(180deg); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,.12); max-height:260px; overflow:auto;\n    opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5; padding:6px;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .opt { display:flex; align-items:center; gap:10px; padding:9px 12px; font-size:var(--fs,15px); color:var(--text,#1f2937); border-radius:7px; cursor:pointer; }\n  .opt:hover { background:var(--hover,#eff6ff); }\n  .box { width:16px; height:16px; border:2px solid var(--border,#d1d5db); border-radius:5px; display:flex; align-items:center; justify-content:center; flex:none; }\n  .opt.on .box { background:var(--theme,#2563eb); border-color:var(--theme,#2563eb); }\n  .opt.on .box::after { content:\"✓\"; color:#fff; font-size:12px; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"ph\" id=\"ph\">请选择（可多选）</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <p class=\"hint\">选中以标签呈现 · 可删除 · 数量与结果同步</p>\n<script>\n  const OPTIONS = [\"设计\",\"前端\",\"后端\",\"产品\",\"运营\",\"测试\",\"数据\",\"算法\"];\n  const state = {\n    theme:\"#2563eb\", tagBg:\"#dbeafe\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.2,\n    border:\"#d1d5db\", hoverBg:\"#eff6ff\", tagText:\"#1e40af\", tagRadius:6, placeholder:\"请选择（可多选）\", maxTags:0\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), ph=document.getElementById(\"ph\"), menu=document.getElementById(\"menu\");\n  let sel=[], open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    OPTIONS.forEach(o=>{\n      const d=document.createElement(\"div\"); d.className=\"opt\"+(sel.includes(o)?\" on\":\"\");\n      d.innerHTML='<span class=\"box\"></span><span>'+o+'</span>';\n      d.onclick=()=>{ sel.includes(o)?sel=sel.filter(x=>x!==o):sel.push(o); renderTags(); buildMenu(); };\n      menu.appendChild(d);\n    });\n  }\n  function renderTags(){\n    trigger.querySelectorAll(\".tag\").forEach(t=>t.remove());\n    const show = state.maxTags>0 ? sel.slice(0,state.maxTags) : sel;\n    const extra = state.maxTags>0 ? sel.length-state.maxTags : 0;\n    show.forEach(o=>{\n      const t=document.createElement(\"span\"); t.className=\"tag\"; t.innerHTML='<span>'+o+'</span><b>×</b>';\n      t.querySelector(\"b\").onclick=(e)=>{ e.stopPropagation(); sel=sel.filter(x=>x!==o); renderTags(); buildMenu(); };\n      trigger.insertBefore(t, trigger.querySelector(\".caret\"));\n    });\n    if(extra>0){ const t=document.createElement(\"span\"); t.className=\"tag\"; t.innerHTML='<span>+'+extra+'</span>'; trigger.insertBefore(t, trigger.querySelector(\".caret\")); }\n    ph.style.display = sel.length ? \"none\" : \"\";\n  }\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--tagbg\",state.tagBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg); R.setProperty(\"--tagtext\",state.tagText);\n    R.setProperty(\"--tr\",state.tagRadius+\"px\");\n    ph.textContent=state.placeholder;\n    buildMenu(); renderTags();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v139",
    标题: "大型菜单",
    分类: "组件",
    子类: "导航",
    风格: ["信息型", "通用"],
    场景: ["通用模块区", "全站通用"],
    元素: ["构成"],
    搭配: [
      "拆分按钮",
      "分组下拉"
    ],
    标签: [
      "大型菜单",
      "mega menu",
      "多分类",
      "导航"
    ],
    来源: "视频拆解：8 种下拉选单组件（2026-08-30 用户提供，组件交互拆解；实现代码自写）",
    效果演示: "assets/demos/大型菜单.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "panelBg",
        名: "面板底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "text",
        名: "文本色",
        类型: "color",
        默认: "#1f2937"
      },
      {
        键: "titleColor",
        名: "栏目标题色",
        类型: "color",
        默认: "#111827"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 12
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.5,
        步长: 0.02,
        默认: 0.22
      },
      {
        键: "iconColor",
        名: "图标色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "hoverBg",
        名: "栏目悬浮背景",
        类型: "color",
        默认: "#f3f4f6"
      },
      {
        键: "border",
        名: "边框色",
        类型: "color",
        默认: "#e5e7eb"
      },
      {
        键: "cols",
        名: "列数",
        类型: "select",
        选项: ["2","3","4"],
        默认: "3"
      },
      {
        键: "descColor",
        名: "说明文字色",
        类型: "color",
        默认: "#6b7280"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n导航栏的多分类展开面板：悬停某栏目（如「产品」）弹出含多个分类列的宽面板，每列有图标 + 标题 + 一行说明，点击栏目切换预览并跳转页面。是信息密度高的门户/产品站标配导航。\n能怎么改：拖滑杆调「主题色、面板底色、文本色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "悬停「产品」展开面板；点栏目触发动作。调「列数」控制面板宽度（2/3/4）；调「图标色/说明文字色」定信息层级。",
    提示词: "帮我做\"大型菜单 / Mega Menu\"（纯 HTML/CSS/JS）：\n效果：导航栏悬停展开多分类宽面板，每列有图标 + 标题 + 一行说明，点栏目触发动作。信息密度高的门户/产品站标配。\n用法示例：\n<nav><div class=\"mega-wrap\"><a>产品 ▾</a><div class=\"panel\">列…</div></div></nav>\n// 悬停 mega-wrap 加 .open；列数 = MENU.slice(0, cols)\n关键参数：\n- theme 主题色 / panelBg 面板底色 / text 文本色 / titleColor 栏目标题色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / iconColor 图标色 / hoverBg 栏目悬浮背景 / border 边框色 / cols 列数 / descColor 说明文字色\n集成步骤：\n1. 复制 assets/demos/大型菜单.html 单文件\n2. MENU 换成你的分类数据（title + items[{ic,nm,ds}]）\n3. 调「列数/图标色/说明文字色」；hover 触发展开、点击外部关闭",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>大型菜单演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f5f6f8; }\n  .nav { display:flex; gap:6px; padding:14px 22px; background:#fff; border-bottom:1px solid var(--border,#e5e7eb); }\n  .nav a { padding:8px 14px; font-size:15px; color:var(--text,#1f2937); cursor:pointer; border-radius:8px; user-select:none; }\n  .nav a:hover { background:var(--hover,#f3f4f6); }\n  .nav a.mega { font-weight:700; }\n  .mega-wrap { position:relative; }\n  .panel {\n    position:absolute; top:calc(100% + 10px); left:0; display:flex; gap:22px; background:var(--pb,#fff);\n    border:1px solid var(--border,#e5e7eb); border-radius:var(--radius,12px); box-shadow:0 16px 40px rgba(0,0,0,.12);\n    padding:18px 22px; opacity:0; transform:translateY(-8px); pointer-events:none; transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:20;\n  }\n  .mega-wrap.open .panel { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .col { min-width:170px; }\n  .col .ct { font-size:13px; font-weight:800; color:var(--tc,#111827); letter-spacing:.03em; margin-bottom:8px; }\n  .item { display:flex; gap:11px; padding:9px 10px; border-radius:9px; cursor:pointer; }\n  .item:hover { background:var(--hover,#f3f4f6); }\n  .ic { width:34px; height:34px; flex:none; display:flex; align-items:center; justify-content:center; border-radius:9px;\n        background:color-mix(in srgb, var(--ic,#2563eb) 14%, #fff); color:var(--ic,#2563eb); font-size:17px; }\n  .item .nm { font-size:15px; font-weight:600; color:var(--text,#1f2937); }\n  .item .ds { font-size:12px; color:var(--dc,#6b7280); margin-top:2px; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n  .toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(10px); opacity:0; background:#111827; color:#fff; padding:10px 18px; border-radius:10px; font-size:14px; transition:.2s; }\n  .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }\n</style>\n</head>\n<body>\n  <nav class=\"nav\">\n    <a>首页</a>\n    <div class=\"mega-wrap\" id=\"mw\">\n      <a class=\"mega\" id=\"mega\">产品 ▾</a>\n      <div class=\"panel\" id=\"panel\"></div>\n    </div>\n    <a>定价</a>\n    <a>文档</a>\n  </nav>\n  <p class=\"hint\">悬停「产品」展开含图标与说明的多分类面板</p>\n  <div class=\"toast\" id=\"toast\"></div>\n<script>\n  const MENU = [\n    { title:\"设计工具\", items:[\n      { ic:\"✎\", nm:\"Figma\", ds:\"协作式界面设计\" },\n      { ic:\"◑\", nm:\"Sketch\", ds:\"矢量界面设计\" }\n    ]},\n    { title:\"开发\", items:[\n      { ic:\"</>\", nm:\"VS Code\", ds:\"轻量代码编辑器\" },\n      { ic:\"⚡\", nm:\"WebStorm\", ds:\"智能 IDE\" }\n    ]},\n    { title:\"协作\", items:[\n      { ic:\"◎\", nm:\"Slack\", ds:\"团队沟通\" },\n      { ic:\"▤\", nm:\"Notion\", ds:\"文档与知识库\" }\n    ]},\n    { title:\"分析\", items:[\n      { ic:\"▦\", nm:\"Amplitude\", ds:\"产品行为分析\" },\n      { ic:\"◔\", nm:\"Mixpanel\", ds:\"漏斗与留存\" }\n    ]}\n  ];\n  const state = {\n    theme:\"#2563eb\", panelBg:\"#ffffff\", text:\"#1f2937\", titleColor:\"#111827\", radius:12, fontSize:15, dur:0.22,\n    iconColor:\"#2563eb\", hoverBg:\"#f3f4f6\", border:\"#e5e7eb\", cols:3, descColor:\"#6b7280\"\n  };\n  const mw=document.getElementById(\"mw\"), mega=document.getElementById(\"mega\"), panel=document.getElementById(\"panel\"), toast=document.getElementById(\"toast\");\n  let t=null;\n  function showToast(m){ toast.textContent=\"打开：\"+m; toast.classList.add(\"show\"); clearTimeout(t); t=setTimeout(()=>toast.classList.remove(\"show\"),1400); }\n  function render(){\n    const n=Math.max(2,Math.min(4,state.cols));\n    panel.innerHTML = MENU.slice(0,n).map(c=>'<div class=\"col\"><div class=\"ct\">'+c.title+'</div>'+\n      c.items.map(i=>'<div class=\"item\" data-nm=\"'+i.nm+'\"><div class=\"ic\">'+i.ic+'</div><div><div class=\"nm\">'+i.nm+'</div><div class=\"ds\">'+i.ds+'</div></div></div>').join(\"\")+'</div>').join(\"\");\n    [...panel.querySelectorAll(\".item\")].forEach(it=> it.onclick=()=> showToast(it.dataset.nm));\n  }\n  mega.onmouseenter=()=>{ mw.classList.add(\"open\"); };\n  mw.onmouseleave=()=>{ mw.classList.remove(\"open\"); };\n  document.addEventListener(\"click\",e=>{ if(!mw.contains(e.target)) mw.classList.remove(\"open\"); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--pb\",state.panelBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--tc\",state.titleColor); R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--ic\",state.iconColor); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--dc\",state.descColor);\n    render();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v140",
    标题: "光标探照揭示 Hero",
    分类: "布局骨架",
    子类: "首屏Hero",
    风格: ["暗色", "叙事仪式", "品牌"],
    场景: ["官网·品牌站", "作品集·叙事", "落地页·发布页"],
    元素: ["动效", "反馈", "视觉", "布局"],
    搭配: [
      "滚动揭示入场",
      "文字逐行揭示"
    ],
    标签: [
      "光标",
      "探照",
      "蒙版",
      "揭示",
      "hero",
      "canvas",
      "鼠标"
    ],
    来源: "网站拆解：motionsites.ai Interactive Discovery Hero（2026-08-30 提取，光标探照揭示机制，零依赖实现）",
    效果演示: "assets/demos/光标探照揭示.html",
    参数: [
      {
        键: "radius",
        名: "探照半径（px）",
        类型: "slider",
        最小: 80,
        最大: 480,
        步长: 10,
        默认: 260
      },
      {
        键: "ease",
        名: "缓动系数",
        类型: "slider",
        最小: 0.02,
        最大: 0.3,
        步长: 0.01,
        默认: 0.1
      },
      {
        键: "baseImg",
        名: "底图 URL",
        类型: "string",
        默认: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85"
      },
      {
        键: "revealImg",
        名: "揭示图 URL",
        类型: "string",
        默认: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85"
      },
      {
        键: "centerColor",
        名: "锥光中心色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "headingColor",
        名: "标题色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "accentColor",
        名: "按钮色",
        类型: "color",
        默认: "#e8702a"
      },
      {
        键: "baseTint",
        名: "底图品牌叠加色",
        类型: "color",
        默认: "#1b1206"
      },
      {
        键: "revealTint",
        名: "揭示图叠加色",
        类型: "color",
        默认: "#3a2a12"
      },
      {
        键: "titleText",
        名: "标题第一行",
        类型: "string",
        默认: "Layers hold"
      },
      {
        键: "subText",
        名: "标题第二行",
        类型: "string",
        默认: "tales of time"
      },
      {
        键: "btnText",
        名: "按钮文字",
        类型: "string",
        默认: "Start Digging"
      }
    ],
    效果说明: "构图笔记：用留白、网格与层级秩序组织信息密度，建立清晰的阅读锚点与空间分区。\n鼠标光标处跟随一个柔和圆形光晕，光晕内通过 canvas 径向渐变生成的蒙版揭示藏在主图之下的第二张画面；光晕边缘平滑渐隐，离开后第二张图被重新遮住。适合地理/科普/作品集类叙事型首屏，制造「探索发现」的沉浸感。\n能怎么改：拖滑杆调「探照半径（px）、缓动系数、底图 URL」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "移动鼠标即可看到揭示；调「探照半径」控制光圈大小，「缓动系数」控制跟随快慢（越小越黏），「锥光中心色」控制光圈亮度；换「底图/揭示图 URL」即可套用自有素材；「两层品牌叠加色」给画面统一色调。可直接把 state+apply()+postMessage 思路搬进 React/Vue。",
    提示词: "【效果】鼠标光标处跟随一个柔和圆形光晕，光晕内通过 canvas 径向渐变生成的蒙版揭示藏在主图之下的第二张画面；光晕边缘平滑渐隐，离开后第二张图被重新遮住。适合地理/科普/作品集类叙事型首屏，制造「探索发现」的沉浸感。\n【用法示例】\n- 把第二张图换成你的产品截图：调「揭示图 URL」即可，光晕会自然揭示它。\n- 想要更明显的探索感：把「探照半径」调到 360+，「缓动系数」降到 0.06。\n- 套品牌色：改「按钮色」「锥光中心色」「两层品牌叠加色」。\n【关键参数】\n• 探照半径（px）（slider）：默认 260\n• 缓动系数（slider）：默认 0.1\n• 底图 URL（string）：默认 https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85\n• 揭示图 URL（string）：默认 https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85\n• 锥光中心色（color）：默认 #ffffff\n• 标题色（color）：默认 #ffffff\n• 按钮色（color）：默认 #e8702a\n• 底图品牌叠加色（color）：默认 #1b1206\n• 揭示图叠加色（color）：默认 #3a2a12\n• 标题第一行（string）：默认 Layers hold\n• 标题第二行（string）：默认 tales of time\n• 按钮文字（string）：默认 Start Digging\n【集成步骤】复制下方「代码」字段（零依赖完整 HTML，含 canvas 蒙版 + RAF 平滑跟随 + postMessage 调参），或把 RevealLayer 思路搬进 React（见 Lithos 成品）。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>光标探照揭示 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  html, body { height: 100%; font-family: 'Inter', system-ui, sans-serif; }\n  .stage { position: relative; width: 100%; height: 100vh; overflow: hidden; background: #000; }\n  .layer { position: absolute; inset: 0; background-size: cover; background-position: center; background-repeat: no-repeat; }\n  .base  { z-index: 10; }\n  .tint  { position: absolute; inset: 0; z-index: 20; pointer-events: none; mix-blend-mode: multiply; }\n  .reveal{ z-index: 30; pointer-events: none; }\n  .revealTint { position: absolute; inset: 0; z-index: 35; pointer-events: none; mix-blend-mode: soft-light; }\n  .head  { position: absolute; top: 14%; left: 0; right: 0; z-index: 50; text-align: center; padding: 0 20px; pointer-events: none; }\n  .head h1 { color: #fff; line-height: 0.95; }\n  .head .l1 { display: block; font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 400; font-size: clamp(40px, 8vw, 96px); }\n  .head .l2 { display: block; font-weight: 400; font-size: clamp(40px, 8vw, 96px); margin-top: -4px; }\n  .blurb { position: absolute; left: 5%; right: 5%; bottom: 8%; z-index: 50; max-width: 300px; display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }\n  .blurb p { color: rgba(255,255,255,0.82); line-height: 1.6; font-size: 14px; }\n  .blurb button { border: 0; color: #fff; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 9999px; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease; }\n  .blurb button:hover { transform: scale(1.03); }\n  .blurb button:active { transform: scale(0.95); }\n</style>\n</head>\n<body>\n  <div class=\"stage\" id=\"stage\">\n    <div class=\"layer base\" id=\"base\"></div>\n    <div class=\"tint\" id=\"baseTint\"></div>\n    <canvas id=\"cmask\" style=\"display:none\"></canvas>\n    <div class=\"layer reveal\" id=\"reveal\"></div>\n    <div class=\"revealTint\" id=\"revealTint\"></div>\n    <div class=\"head\">\n      <h1>\n        <span class=\"l1\" id=\"t1\">Layers hold</span>\n        <span class=\"l2\" id=\"t2\">tales of time</span>\n      </h1>\n    </div>\n    <div class=\"blurb\">\n      <p id=\"desc\">移动光标，柔和光晕会揭示藏在底图之下的第二张画面 —— 这是地理叙事站最常用的「探索式首屏」。</p>\n      <button id=\"cta\">Start Digging</button>\n    </div>\n  </div>\n\n<script>\n/* ---------- 可调参数 ---------- */\nconst state = {\n  radius: 260,        // 探照半径(px) slider\n  ease: 0.1,          // 缓动系数(0.02~0.3) slider\n  baseImg: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85',\n  revealImg: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85',\n  centerColor: '#ffffff',   // 锥光中心色 color\n  headingColor: '#ffffff',  // 标题色 color\n  accentColor: '#e8702a',   // 按钮色 color\n  baseTint: '#1b1206',      // 底图品牌色叠加 color\n  revealTint: '#3a2a12',    // 揭示图叠加 color\n  titleText: 'Layers hold', // 标题第一行 string\n  subText: 'tales of time',  // 标题第二行 string\n  btnText: 'Start Digging'   // 按钮文字 string\n};\n\nconst base = document.getElementById('base');\nconst baseTint = document.getElementById('baseTint');\nconst reveal = document.getElementById('reveal');\nconst revealTint = document.getElementById('revealTint');\nconst canvas = document.getElementById('cmask');\nconst ctx = canvas.getContext('2d');\nconst t1 = document.getElementById('t1');\nconst t2 = document.getElementById('t2');\nconst desc = document.getElementById('desc');\nconst cta = document.getElementById('cta');\n\n/* 鼠标平滑跟随 */\nconst mouse = { x: -999, y: -999 };\nconst smooth = { x: -999, y: -999 };\nconst cur = { x: -999, y: -999 };\nlet raf = null;\n\nfunction hexA(hex, a) {\n  const m = hex.replace('#', '');\n  const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m;\n  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);\n  return `rgba(${r},${g},${b},${a})`;\n}\n\nfunction apply() {\n  // 降级保护：图片URL在前、CSS渐变在后——断网时图片加载失败自动回退到品牌渐变，不黑屏\n  const baseFallback = `linear-gradient(135deg, ${state.baseTint} 0%, #2a1a08 55%, #0d0904 100%)`;\n  const revealFallback = `linear-gradient(135deg, ${state.revealTint} 0%, #5a4a2a 55%, #2a2010 100%)`;\n  base.style.backgroundImage = `url(${state.baseImg}), ${baseFallback}`;\n  reveal.style.backgroundImage = `url(${state.revealImg}), ${revealFallback}`;\n  baseTint.style.background = state.baseTint;\n  revealTint.style.background = state.revealTint;\n  t1.textContent = state.titleText;\n  t2.textContent = state.subText;\n  cta.textContent = state.btnText;\n  t1.style.color = state.headingColor;\n  t2.style.color = state.headingColor;\n  cta.style.background = state.accentColor;\n  cta.style.boxShadow = `0 10px 30px ${hexA(state.accentColor, 0.33)}`;\n  drawMask();\n}\n\nfunction drawMask() {\n  const w = window.innerWidth, h = window.innerHeight;\n  canvas.width = w; canvas.height = h;\n  ctx.clearRect(0, 0, w, h);\n  const r = Math.max(1, state.radius);\n  const g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, r);\n  const cc = hexA(state.centerColor, 1);\n  g.addColorStop(0, cc);\n  g.addColorStop(0.4, cc);\n  g.addColorStop(0.6, hexA(state.centerColor, 0.75));\n  g.addColorStop(0.75, hexA(state.centerColor, 0.4));\n  g.addColorStop(0.88, hexA(state.centerColor, 0.12));\n  g.addColorStop(1, hexA(state.centerColor, 0));\n  ctx.fillStyle = g;\n  ctx.beginPath();\n  ctx.arc(cur.x, cur.y, r, 0, Math.PI * 2);\n  ctx.fill();\n  const url = canvas.toDataURL();\n  reveal.style.maskImage = `url(${url})`;\n  reveal.style.webkitMaskImage = `url(${url})`;\n  reveal.style.maskSize = '100% 100%';\n  reveal.style.webkitMaskSize = '100% 100%';\n}\n\nwindow.addEventListener('mousemove', e => {\n  mouse.x = e.clientX; mouse.y = e.clientY;\n  if (smooth.x === -999) { smooth.x = e.clientX; smooth.y = e.clientY; }\n});\nwindow.addEventListener('resize', drawMask);\n\nfunction loop() {\n  smooth.x += (mouse.x - smooth.x) * state.ease;\n  smooth.y += (mouse.y - smooth.y) * state.ease;\n  cur.x = smooth.x; cur.y = smooth.y;\n  drawMask();\n  raf = requestAnimationFrame(loop);\n}\nraf = requestAnimationFrame(loop);\n\n/* 外部调参 */\nwindow.addEventListener('message', ev => {\n  const d = ev.data;\n  if (d && d.type === 'param' && d.key in state) {\n    state[d.key] = d.value;\n    apply();\n  }\n});\n\napply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: 0
  },
  {
    id: "v143",
    标题: "侧边栏导航",
    分类: "组件",
    子类: "导航",
    风格: ["信息型"],
    场景: ["后台·数据看板", "工具·SaaS", "内容·阅读"],
    元素: ["构成"],
    搭配: [
      "面包屑导航"
    ],
    标签: [
      "侧边栏",
      "sidebar",
      "折叠",
      "导航"
    ],
    来源: "视频拆解：9 种导航类型（2026-09-02 用户提供，导航栏交互拆解；实现代码自写；巨型菜单导航与 v139 重复已跳过）",
    效果演示: "assets/demos/侧边栏导航.html",
    参数: [
      {
键: "theme",
名: "主题色",
类型: "color",
默认: "#2563eb"
      },
      {
键: "bg",
名: "侧栏底色",
类型: "color",
默认: "#1f2937"
      },
      {
键: "text",
名: "文字色",
类型: "color",
默认: "#e5e7eb"
      },
      {
键: "hover",
名: "项悬浮底色",
类型: "color",
默认: "#374151"
      },
      {
键: "active",
名: "当前项底色",
类型: "color",
默认: "#2563eb"
      },
      {
键: "widthExpand",
名: "展开宽（px）",
类型: "slider",
最小: 160,
最大: 320,
步长: 10,
默认: 220
      },
      {
键: "widthCollapse",
名: "收起宽（px）",
类型: "slider",
最小: 56,
最大: 96,
步长: 4,
默认: 64
      },
      {
键: "dur",
名: "折叠动画时长（秒）",
类型: "slider",
最小: 0.1,
最大: 0.6,
步长: 0.02,
默认: 0.3
      },
      {
键: "iconSize",
名: "图标大小（px）",
类型: "slider",
最小: 14,
最大: 28,
步长: 1,
默认: 20
      },
      {
键: "fontSize",
名: "字号（px）",
类型: "slider",
最小: 12,
最大: 18,
步长: 1,
默认: 14
      },
      {
键: "brand",
名: "品牌文字",
类型: "string",
默认: "Studio"
      },
      {
键: "items",
名: "导航项（逗号分隔）",
类型: "string",
默认: "概览,项目,素材,设置"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n左侧竖排布局，支持折叠展开：收起后仅显示图标，为后台、编辑器类页面释放内容空间。核心逻辑是常驻导航又不挤占正文宽度，匹配工具类产品的信息密度需求。\n能怎么改：拖滑杆调「主题色、侧栏底色、文字色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点左上「≡」折叠/展开；当前项高亮主题色。调「展开宽/收起宽」控两种状态宽度；调「图标大小/折叠动画时长」定节奏。",
    提示词: "帮我做\"侧边栏导航\"（纯 HTML/CSS/JS）：\n效果：左侧竖排，点按钮可折叠/展开；收起后仅留图标，为后台/编辑器释放内容空间。当前项高亮主题色。\n用法示例：\n<aside id=\"side\"><div class=\"toggle\">≡</div><div id=\"items\"></div></aside>\n// toggle: side.classList.toggle(\"collapsed\")\n关键参数：\n- theme 主题色 / bg 侧栏底色 / text 文字色 / hover 项悬浮底色 / active 当前项底色 / widthExpand 展开宽（px） / widthCollapse 收起宽（px） / dur 折叠动画时长（秒） / iconSize 图标大小（px） / fontSize 字号（px） / brand 品牌文字 / items 导航项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/侧边栏导航.html 单文件\n2. items csv 换成你的菜单；widthExpand/widthCollapse 控两种宽度\n3. 调「图标大小/折叠动画时长」定节奏",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>侧边栏导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#1f2937; --text:#e5e7eb; --hover:#374151; --active:#2563eb; --we:220px; --wc:64px; --dur:.3s; --ic:20px; --fs:14px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; display:flex; min-height:100vh; background:#f3f4f6; }\n  #side {\n    width:var(--we); background:var(--bg); color:var(--text);\n    display:flex; flex-direction:column; padding:18px 12px; gap:6px;\n    transition:width var(--dur) cubic-bezier(.16,1,.3,1); overflow:hidden; flex:none;\n  }\n  #side.collapsed { width:var(--wc); }\n  .top { display:flex; align-items:center; gap:10px; margin-bottom:14px; }\n  .toggle { cursor:pointer; width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:10px; background:var(--hover); color:#fff; font-size:20px; flex:none; }\n  .brand { font-weight:800; font-size:16px; white-space:nowrap; color:#fff; }\n  #side.collapsed .brand { display:none; }\n  .item { display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:10px; cursor:pointer; font-size:var(--fs); white-space:nowrap; transition:background .15s,color .15s; }\n  .item:hover { background:var(--hover); }\n  .item.active { background:var(--active); color:#fff; }\n  .item svg { width:var(--ic); height:var(--ic); flex:none; }\n  #side.collapsed .label { display:none; }\n  .content { flex:1; padding:40px; }\n  .content h1 { margin-bottom:10px; color:#111827; }\n  .content p { color:#6b7280; line-height:1.9; }\n  .hint { position:fixed; bottom:14px; left:50%; transform:translateX(-50%); font-size:13px; color:#9ca3af; }\n</style>\n</head>\n<body>\n  <aside id=\"side\">\n    <div class=\"top\">\n      <div class=\"toggle\" id=\"toggle\">≡</div>\n      <div class=\"brand\" id=\"brand\">Studio</div>\n    </div>\n    <div id=\"items\"></div>\n  </aside>\n  <main class=\"content\">\n    <h1>侧边栏导航</h1>\n    <p>左侧竖排布局，支持折叠展开：收起后仅显示图标，为后台、编辑器类页面释放内容空间。点左上角「≡」试试折叠。</p>\n  </main>\n  <p class=\"hint\">点左上「≡」折叠 / 展开侧边栏</p>\n<script>\n  const ICON='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v4M12 18v4M2 12h4M18 12h4\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", bg:\"#1f2937\", text:\"#e5e7eb\", hover:\"#374151\", active:\"#2563eb\",\n    widthExpand:220, widthCollapse:64, dur:0.3, iconSize:20, fontSize:14,\n    brand:\"Studio\", items:\"概览,项目,素材,设置\"\n  };\n  const side=document.getElementById(\"side\"), itemsEl=document.getElementById(\"items\"), brandEl=document.getElementById(\"brand\");\n  let activeIdx=0;\n  function render(){\n    itemsEl.innerHTML=\"\";\n    state.items.split(\",\").forEach((t,i)=>{\n      const d=document.createElement(\"div\"); d.className=\"item\"+(i===activeIdx?\" active\":\"\");\n      d.innerHTML=ICON+'<span class=\"label\">'+t+'</span>';\n      d.onclick=()=>{ activeIdx=i; render(); };\n      itemsEl.appendChild(d);\n    });\n  }\n  document.getElementById(\"toggle\").onclick=()=> side.classList.toggle(\"collapsed\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--active\",state.active);\n    R.setProperty(\"--we\",state.widthExpand+\"px\"); R.setProperty(\"--wc\",state.widthCollapse+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--ic\",state.iconSize+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    brandEl.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v144",
    标题: "面包屑导航",
    分类: "组件",
    子类: "导航",
    风格: ["极简", "通用"],
    场景: ["电商·预订", "内容·阅读", "全站通用"],
    元素: ["构成"],
    搭配: [
      "侧边栏导航",
      "锚点导航"
    ],
    标签: [
      "面包屑",
      "breadcrumb",
      "路径",
      "层级"
    ],
    来源: "视频拆解：9 种导航类型（2026-09-02 用户提供，导航栏交互拆解；实现代码自写；巨型菜单导航与 v139 重复已跳过）",
    效果演示: "assets/demos/面包屑导航.html",
    参数: [
      {
        键: "theme",
        名: "当前项/分隔色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "text",
        名: "文字色",
        类型: "color",
        默认: "#6b7280"
      },
      {
        键: "link",
        名: "链接色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "hover",
        名: "悬浮色",
        类型: "color",
        默认: "#1d4ed8"
      },
      {
        键: "pageBg",
        名: "条底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "sep",
        名: "分隔符",
        类型: "string",
        默认: " / "
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 18,
        步长: 1,
        默认: 14
      },
      {
        键: "gap",
        名: "间距（px）",
        类型: "slider",
        最小: 4,
        最大: 16,
        步长: 1,
        默认: 8
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 16,
        步长: 1,
        默认: 8
      },
      {
        键: "bold",
        名: "当前项加粗",
        类型: "switch",
        默认: true
      },
      {
        键: "items",
        名: "层级（逗号分隔）",
        类型: "string",
        默认: "首页,课程,前端,下拉组件"
      },
      {
        键: "homeIcon",
        名: "首页图标",
        类型: "switch",
        默认: true
      }
    ],
    效果说明: "以「首页 - 分类 - 子分类」路径展示当前页面层级，让用户随时知道自己在哪、能往哪跳。核心逻辑是匹配电商、文档站等深层级网站的定位需求。\n能怎么改：拖滑杆调「当前项/分隔色、文字色、链接色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "首项是首页（可带图标），末项是当前页（加粗不可点）。调「分隔符」换连接符；改「层级」csv 增减路径深度；关「首页图标」走纯文字。",
    提示词: "帮我做\"面包屑导航\"（纯 HTML/CSS/JS）：\n效果：以「首页 / 分类 / 子分类」路径展示当前层级，首项可带首页图标、末项加粗不可点。适配电商/文档站等深层级网站。\n用法示例：\n<nav id=\"bar\"></nav>\n// 按 items csv 渲染：首项 home 图标，末项 current\n关键参数：\n- theme 当前项/分隔色 / text 文字色 / link 链接色 / hover 悬浮色 / pageBg 条底色 / sep 分隔符 / fontSize 字号（px） / gap 间距（px） / radius 圆角（px） / bold 当前项加粗 / items 层级（逗号分隔） / homeIcon 首页图标\n集成步骤：\n1. 复制 assets/demos/面包屑导航.html 单文件\n2. 改 items csv 增减路径深度；sep 换分隔符\n3. 关 homeIcon/bold 走纯文字版",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>面包屑导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --text:#6b7280; --link:#2563eb; --hover:#1d4ed8; --pageBg:#ffffff; --fs:14px; --gap:8px; --radius:8px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#eef0f3; color:var(--text); }\n  #bar { background:var(--pageBg); padding:16px 26px; border-radius:var(--radius); box-shadow:0 2px 10px rgba(0,0,0,.05); display:flex; align-items:center; gap:var(--gap); font-size:var(--fs); flex-wrap:wrap; }\n  .crumb { display:inline-flex; align-items:center; gap:var(--gap); color:var(--link); cursor:pointer; transition:color .15s; }\n  .crumb:hover { color:var(--hover); }\n  .crumb.home svg { width:15px; height:15px; }\n  .crumb.current { color:var(--text); cursor:default; }\n  .sep { color:#cbd5e1; user-select:none; }\n  .content { padding:40px 26px; max-width:880px; margin:20px auto; background:#fff; border-radius:12px; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <div style=\"padding:20px 26px 0;\"><nav id=\"bar\"></nav></div>\n  <div class=\"content\"><h1>当前页面</h1><p>面包屑以「首页 / 分类 / 子分类」路径展示当前页面层级，让用户随时知道自己在哪、能往哪跳。适配电商、文档站等深层级网站。改「层级」参数可增减路径深度。</p></div>\n<script>\n  const HOME='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 11l9-8 9 8M5 10v10h14V10\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", text:\"#6b7280\", link:\"#2563eb\", hover:\"#1d4ed8\", pageBg:\"#ffffff\",\n    sep:\" / \", fontSize:14, gap:8, radius:8, bold:true,\n    items:\"首页,课程,前端,下拉组件\", homeIcon:true\n  };\n  const bar=document.getElementById(\"bar\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--link\",state.link);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--pageBg\",state.pageBg);\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--gap\",state.gap+\"px\"); R.setProperty(\"--radius\",state.radius+\"px\");\n    const parts=state.items.split(\",\");\n    bar.innerHTML=\"\";\n    parts.forEach((t,i)=>{\n      if(i>0){ const s=document.createElement(\"span\"); s.className=\"sep\"; s.textContent=state.sep; bar.appendChild(s); }\n      const c=document.createElement(\"span\");\n      const isLast=i===parts.length-1;\n      c.className=\"crumb\"+(i===0&&state.homeIcon?\" home\":\"\")+(isLast?\" current\":\"\");\n      if(state.bold && isLast) c.style.fontWeight=\"700\";\n      c.innerHTML=(i===0&&state.homeIcon?HOME:\"\")+(\"<span>\"+t+\"</span>\");\n      bar.appendChild(c);\n    });\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v145",
    标题: "二级下拉导航",
    分类: "组件",
    子类: "导航",
    风格: ["信息型", "通用"],
    场景: ["全站通用", "电商·预订"],
    元素: ["动效", "构成"],
    搭配: [
      "大型菜单",
      "分组下拉"
    ],
    标签: [
      "二级下拉",
      "hover",
      "子菜单",
      "导航"
    ],
    来源: "视频拆解：9 种导航类型（2026-09-02 用户提供，导航栏交互拆解；实现代码自写；巨型菜单导航与 v139 重复已跳过）",
    效果演示: "assets/demos/二级下拉导航.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "bg",
        名: "导航底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "text",
        名: "文字色",
        类型: "color",
        默认: "#1f2937"
      },
      {
        键: "hover",
        名: "项悬浮底色",
        类型: "color",
        默认: "#eff6ff"
      },
      {
        键: "subBg",
        名: "子菜单底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "dur",
        名: "展开时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.5,
        步长: 0.02,
        默认: 0.2
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 24,
        步长: 1,
        默认: 10
      },
      {
        键: "shadow",
        名: "子菜单投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.3,
        步长: 0.02,
        默认: 0.14
      },
      {
        键: "arrow",
        名: "箭头开关",
        类型: "switch",
        默认: true
      },
      {
        键: "topItems",
        名: "主导航（逗号分隔）",
        类型: "string",
        默认: "产品,解决方案,资源,关于"
      },
      {
        键: "subItems",
        名: "子菜单（逗号分隔，对应各项）",
        类型: "string",
        默认: "设计工具,开发套件,素材市场,模板"
      }
    ],
    效果说明: "鼠标悬停主导航项即弹出子菜单，适合在主导航下挂大量子分类，兼顾空间利用率与层级收纳。核心逻辑是匹配「主导航项 + 多子分类」的收纳需求。\n能怎么改：拖滑杆调「主题色、导航底色、文字色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "悬停主导航项展开对应子菜单；无子项的项不弹。调「展开时长/子菜单投影浓度/圆角」定气质；关「箭头开关」走纯文字。",
    提示词: "帮我做\"二级下拉导航\"（纯 HTML/CSS/JS）：\n效果：悬停主导航项弹出对应子菜单，适合主导航下挂大量子分类。\n用法示例：\n<nav><div class=\"top\"><span class=\"label\">产品 ▾</span><div class=\"sub\">…</div></div></nav>\n// CSS :hover 控制 .sub 显隐；子项 = subItems[i]\n关键参数：\n- theme 主题色 / bg 导航底色 / text 文字色 / hover 项悬浮底色 / subBg 子菜单底色 / dur 展开时长（秒） / fontSize 字号（px） / radius 圆角（px） / shadow 子菜单投影浓度 / arrow 箭头开关 / topItems 主导航（逗号分隔） / subItems 子菜单（逗号分隔，对应各项）\n集成步骤：\n1. 复制 assets/demos/二级下拉导航.html 单文件\n2. topItems 主导航、subItems 对应子项（逗号分隔）\n3. 调「展开时长/圆角/投影」定气质",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>二级下拉导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#ffffff; --text:#1f2937; --hover:#eff6ff; --subBg:#ffffff; --dur:.2s; --fs:15px; --radius:10px; --shadow:.14; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f5f6f8; color:var(--text); }\n  #nav { display:flex; align-items:center; gap:4px; padding:14px 26px; background:var(--bg); box-shadow:0 2px 10px rgba(0,0,0,.05); position:relative; z-index:20; }\n  .brand { font-weight:800; color:var(--theme); margin-right:18px; }\n  .top { position:relative; }\n  .top>.label { padding:9px 14px; border-radius:10px; font-size:var(--fs); cursor:pointer; display:inline-flex; align-items:center; gap:6px; transition:background .15s,color .15s; }\n  .top:hover>.label { background:var(--hover); color:var(--theme); }\n  .top .caret { transition:transform var(--dur) ease; }\n  .top:hover .caret { transform:rotate(180deg); }\n  .sub { position:absolute; top:calc(100% + 8px); left:0; min-width:200px; background:var(--subBg); border:1px solid #e5e7eb; border-radius:var(--radius); box-shadow:0 12px 30px rgba(0,0,0,var(--shadow)); padding:6px; opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur) ease,transform var(--dur) ease; }\n  .top:hover .sub { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .sub .sitem { padding:9px 12px; border-radius:8px; font-size:var(--fs); cursor:pointer; }\n  .sub .sitem:hover { background:var(--hover); color:var(--theme); }\n  .content { padding:50px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\"><div class=\"brand\">站点</div><div id=\"tops\"></div></nav>\n  <div class=\"content\"><h1>二级下拉导航</h1><p>主导航项悬停弹出子菜单，适合在主导航下挂大量子分类，兼顾空间利用率与层级收纳。把鼠标移到主导航项上看子菜单展开。</p></div>\n<script>\n  const CARET='<svg class=\"caret\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", bg:\"#ffffff\", text:\"#1f2937\", hover:\"#eff6ff\", subBg:\"#ffffff\",\n    dur:0.2, fontSize:15, radius:10, shadow:0.14, arrow:true,\n    topItems:\"产品,解决方案,资源,关于\", subItems:\"设计工具,开发套件,素材市场,模板\"\n  };\n  const topsEl=document.getElementById(\"tops\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--subBg\",state.subBg);\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--shadow\",state.shadow);\n    const tops=state.topItems.split(\",\"), subs=state.subItems.split(\",\");\n    topsEl.innerHTML=\"\";\n    tops.forEach((t,i)=>{\n      const d=document.createElement(\"div\"); d.className=\"top\";\n      const sub=subs[i]||\"\";\n      d.innerHTML='<span class=\"label\">'+t+(state.arrow?' '+CARET:'')+'</span>'+\n        (sub?'<div class=\"sub\">'+sub.split(\",\").map(s=>'<div class=\"sitem\">'+s+'</div>').join('')+'</div>':'');\n      topsEl.appendChild(d);\n    });\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v146",
    标题: "汉堡菜单导航",
    分类: "组件",
    子类: "导航",
    风格: ["通用"],
    场景: ["移动端", "全站通用"],
    元素: ["构成"],
    搭配: [
      "全屏遮罩导航",
      "侧边栏导航"
    ],
    标签: [
      "汉堡菜单",
      "hamburger",
      "抽屉",
      "移动端"
    ],
    来源: "视频拆解：9 种导航类型（2026-09-02 用户提供，导航栏交互拆解；实现代码自写；巨型菜单导航与 v139 重复已跳过）",
    效果演示: "assets/demos/汉堡菜单导航.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "menuBg",
        名: "菜单底色",
        类型: "color",
        默认: "#111827"
      },
      {
        键: "text",
        名: "文字色",
        类型: "color",
        默认: "#f9fafb"
      },
      {
        键: "hover",
        名: "项悬浮底色",
        类型: "color",
        默认: "#374151"
      },
      {
        键: "barColor",
        名: "汉堡线色",
        类型: "color",
        默认: "#111827"
      },
      {
        键: "overlayOpacity",
        名: "遮罩浓度",
        类型: "slider",
        最小: 0,
        最大: 0.8,
        步长: 0.05,
        默认: 0.5
      },
      {
        键: "dur",
        名: "动画时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.6,
        步长: 0.02,
        默认: 0.3
      },
      {
        键: "sideW",
        名: "侧栏宽（px）",
        类型: "slider",
        最小: 200,
        最大: 360,
        步长: 10,
        默认: 280
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 22,
        步长: 1,
        默认: 16
      },
      {
        键: "from",
        名: "滑出方向",
        类型: "select",
        选项: ["左","右"],
        默认: "右"
      },
      {
        键: "brand",
        名: "品牌文字",
        类型: "string",
        默认: "Menu"
      },
      {
        键: "items",
        名: "菜单项（逗号分隔）",
        类型: "string",
        默认: "首页,作品,关于,联系"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n移动端经典的三条杠样式，点击后侧边滑出菜单并带遮罩，适配屏幕较窄的移动端场景。核心逻辑是匹配小屏「空间有限、需按需展开」的跳转需求。\n能怎么改：拖滑杆调「主题色、菜单底色、文字色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点汉堡按钮滑出抽屉、点遮罩关闭。调「滑出方向」换左/右；调「侧栏宽/遮罩浓度/动画时长」定气质；图标色随「汉堡线色」。",
    提示词: "帮我做\"汉堡菜单导航\"（纯 HTML/CSS/JS）：\n效果：移动端三条杠，点击侧边滑出抽屉并带遮罩。适配窄屏。\n用法示例：\n<div class=\"ham\">≡</div><div class=\"overlay\"></div><aside class=\"drawer\">…</aside>\n// ham.click → 抽屉/遮罩加 .open；drawer 用 transform 滑入\n关键参数：\n- theme 主题色 / menuBg 菜单底色 / text 文字色 / hover 项悬浮底色 / barColor 汉堡线色 / overlayOpacity 遮罩浓度 / dur 动画时长（秒） / sideW 侧栏宽（px） / fontSize 字号（px） / from 滑出方向 / brand 品牌文字 / items 菜单项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/汉堡菜单导航.html 单文件\n2. items csv 换菜单；from 切换左/右滑出\n3. 调「侧栏宽/遮罩浓度/动画时长」",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>汉堡菜单导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --menuBg:#111827; --text:#f9fafb; --hover:#374151; --bar:#111827; --ov:.5; --dur:.3s; --sideW:280px; --fs:16px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f3f4f6; }\n  .bar { height:60px; display:flex; align-items:center; padding:0 20px; }\n  .ham { width:42px; height:42px; display:flex; flex-direction:column; justify-content:center; gap:5px; cursor:pointer; }\n  .ham span { height:3px; background:var(--bar); border-radius:2px; transition:.3s; }\n  .overlay { position:fixed; inset:0; background:rgba(0,0,0,var(--ov)); opacity:0; pointer-events:none; transition:opacity var(--dur) ease; z-index:40; }\n  .overlay.open { opacity:1; pointer-events:auto; }\n  .drawer { position:fixed; top:0; bottom:0; width:var(--sideW); background:var(--menuBg); color:var(--text); padding:80px 24px; z-index:50; transition:transform var(--dur) cubic-bezier(.16,1,.3,1); display:flex; flex-direction:column; gap:6px; }\n  .drawer.right { right:0; transform:translateX(100%); }\n  .drawer.left { left:0; transform:translateX(-100%); }\n  .drawer.open.right, .drawer.open.left { transform:translateX(0); }\n  .ditem { padding:14px 16px; border-radius:12px; font-size:var(--fs); cursor:pointer; transition:background .15s; }\n  .ditem:hover { background:var(--hover); }\n  .brand { position:fixed; top:22px; left:20px; font-weight:800; color:var(--theme); z-index:60; }\n  .content { padding:80px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <div class=\"bar\"><div class=\"ham\" id=\"ham\"><span></span><span></span><span></span></div></div>\n  <div class=\"brand\" id=\"brand\">Menu</div>\n  <div class=\"overlay\" id=\"overlay\"></div>\n  <aside class=\"drawer right\" id=\"drawer\"><div id=\"ditems\"></div></aside>\n  <div class=\"content\"><h1>汉堡菜单导航</h1><p>移动端经典的三条杠样式，点击后侧边滑出菜单，适配屏幕较窄的移动端场景。点左上角汉堡按钮试试。</p></div>\n<script>\n  const state = {\n    theme:\"#2563eb\", menuBg:\"#111827\", text:\"#f9fafb\", hover:\"#374151\", barColor:\"#111827\",\n    overlayOpacity:0.5, dur:0.3, sideW:280, fontSize:16, from:\"右\",\n    brand:\"Menu\", items:\"首页,作品,关于,联系\"\n  };\n  const ham=document.getElementById(\"ham\"), overlay=document.getElementById(\"overlay\"), drawer=document.getElementById(\"drawer\"), ditems=document.getElementById(\"ditems\"), brandEl=document.getElementById(\"brand\");\n  function render(){ ditems.innerHTML=\"\"; state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"ditem\"; d.textContent=t; ditems.appendChild(d); }); }\n  function setOpen(o){ overlay.classList.toggle(\"open\",o); drawer.classList.toggle(\"open\",o); }\n  ham.onclick=()=> setOpen(!drawer.classList.contains(\"open\"));\n  overlay.onclick=()=> setOpen(false);\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--menuBg\",state.menuBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--bar\",state.barColor);\n    R.setProperty(\"--ov\",state.overlayOpacity); R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--sideW\",state.sideW+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    drawer.classList.remove(\"left\",\"right\"); drawer.classList.add(state.from===\"左\"?\"left\":\"right\");\n    brandEl.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  // 自动演示一次开合（让缩略图能看到效果）\n  setTimeout(() => { setOpen(true); setTimeout(() => setOpen(false), 1200); }, 600);\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v147",
    标题: "全屏遮罩导航",
    分类: "组件",
    子类: "导航",
    风格: ["品牌"],
    场景: ["作品集·叙事", "官网·品牌站", "通用模块区"],
    元素: ["布局", "构成"],
    搭配: [
      "汉堡菜单导航"
    ],
    标签: [
      "全屏遮罩",
      "overlay",
      "聚焦",
      "导航"
    ],
    来源: "视频拆解：9 种导航类型（2026-09-02 用户提供，导航栏交互拆解；实现代码自写；巨型菜单导航与 v139 重复已跳过）",
    效果演示: "assets/demos/全屏遮罩导航.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "bg",
        名: "背景色",
        类型: "color",
        默认: "#0f172a"
      },
      {
        键: "text",
        名: "文字色",
        类型: "color",
        默认: "#f8fafc"
      },
      {
        键: "hover",
        名: "项悬浮色",
        类型: "color",
        默认: "#38bdf8"
      },
      {
        键: "closeColor",
        名: "关闭按钮色",
        类型: "color",
        默认: "#f8fafc"
      },
      {
        键: "dur",
        名: "动画时长（秒）",
        类型: "slider",
        最小: 0.2,
        最大: 0.7,
        步长: 0.02,
        默认: 0.4
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 18,
        最大: 44,
        步长: 1,
        默认: 28
      },
      {
        键: "gap",
        名: "项间距（px）",
        类型: "slider",
        最小: 8,
        最大: 40,
        步长: 2,
        默认: 22
      },
      {
        键: "blur",
        名: "背景模糊（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 0
      },
      {
        键: "itemAlign",
        名: "排列",
        类型: "select",
        选项: ["居中","分散"],
        默认: "居中"
      },
      {
        键: "brand",
        名: "品牌文字",
        类型: "string",
        默认: "Portfolio"
      },
      {
        键: "items",
        名: "菜单项（逗号分隔）",
        类型: "string",
        默认: "Work,About,Services,Contact"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n点开后全屏覆盖、菜单居中大字排列，把全部注意力收拢到导航本身。核心逻辑是匹配作品集、品牌官网等需要强调「我现在在哪、能去哪」的聚焦需求。\n能怎么改：拖滑杆调「主题色、背景色、文字色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "点「菜单」全屏展开、点 × 关闭。调「字号/项间距」定视觉重量；调「背景模糊」做毛玻璃；「排列」切居中/分散。",
    提示词: "帮我做\"全屏遮罩导航\"（纯 HTML/CSS/JS）：\n效果：点开全屏覆盖、菜单居中大字排列，聚焦导航。适配作品集/品牌官网。\n用法示例：\n<button class=\"open-btn\">菜单</button><div class=\"full\">…大字菜单…</div>\n// open.click → full.classList.add(\"open\")；close 移除\n关键参数：\n- theme 主题色 / bg 背景色 / text 文字色 / hover 项悬浮色 / closeColor 关闭按钮色 / dur 动画时长（秒） / fontSize 字号（px） / gap 项间距（px） / blur 背景模糊（px） / itemAlign 排列 / brand 品牌文字 / items 菜单项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/全屏遮罩导航.html 单文件\n2. items csv 换菜单；blur 做毛玻璃\n3. 调「字号/项间距/排列」定视觉重量",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>全屏遮罩导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#0f172a; --text:#f8fafc; --hover:#38bdf8; --close:#f8fafc; --dur:.4s; --fs:28px; --gap:22px; --blur:0px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#eef2f7; }\n  .open-btn { position:fixed; top:20px; right:24px; z-index:30; background:var(--theme); color:#fff; border:none; padding:12px 22px; border-radius:30px; font-size:15px; cursor:pointer; }\n  .full { position:fixed; inset:0; background:var(--bg); color:var(--text); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--gap); z-index:50; opacity:0; pointer-events:none; transition:opacity var(--dur) ease; backdrop-filter:blur(var(--blur)); }\n  .full.open { opacity:1; pointer-events:auto; }\n  .ftitle { font-size:14px; letter-spacing:3px; text-transform:uppercase; opacity:.6; margin-bottom:6px; }\n  .fitems { display:flex; flex-direction:column; align-items:center; gap:var(--gap); }\n  .fitem { font-size:var(--fs); font-weight:700; cursor:pointer; transition:color .2s; letter-spacing:1px; }\n  .fitem:hover { color:var(--hover); }\n  .close { position:fixed; top:22px; right:26px; z-index:60; background:none; border:none; color:var(--close); font-size:34px; cursor:pointer; line-height:1; }\n  .content { padding:80px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <button class=\"open-btn\" id=\"open\">菜单</button>\n  <div class=\"full\" id=\"full\"><button class=\"close\" id=\"close\">×</button><div class=\"ftitle\" id=\"ftitle\"></div><div class=\"fitems\" id=\"fitems\"></div></div>\n  <div class=\"content\"><h1>全屏遮罩导航</h1><p>点开全屏覆盖、菜单居中大字排列，聚焦导航本身。适配作品集、品牌官网等需要强调导航的场景。点右上「菜单」试试。</p></div>\n<script>\n  const state = {\n    theme:\"#2563eb\", bg:\"#0f172a\", text:\"#f8fafc\", hover:\"#38bdf8\", closeColor:\"#f8fafc\",\n    dur:0.4, fontSize:28, gap:22, blur:0, itemAlign:\"居中\",\n    brand:\"Portfolio\", items:\"Work,About,Services,Contact\"\n  };\n  const openBtn=document.getElementById(\"open\"), full=document.getElementById(\"full\"), closeBtn=document.getElementById(\"close\"), fitems=document.getElementById(\"fitems\"), ftitle=document.getElementById(\"ftitle\");\n  function render(){\n    fitems.innerHTML=\"\";\n    fitems.style.justifyContent = state.itemAlign===\"分散\"?\"space-between\":\"center\";\n    state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"fitem\"; d.textContent=t; fitems.appendChild(d); });\n  }\n  openBtn.onclick=()=> full.classList.add(\"open\");\n  closeBtn.onclick=()=> full.classList.remove(\"open\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--close\",state.closeColor);\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--gap\",state.gap+\"px\"); R.setProperty(\"--blur\",state.blur+\"px\");\n    ftitle.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  // 自动演示一次开合（让缩略图能看到效果）\n  setTimeout(() => { full.classList.add('open'); setTimeout(() => full.classList.remove('open'), 1400); }, 600);\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v148",
    标题: "锚点导航",
    分类: "组件",
    子类: "导航",
    风格: ["极简", "信息型"],
    场景: ["内容·阅读", "落地页·发布页"],
    元素: ["构成", "反馈"],
    搭配: [
      "粘性章节导航",
      "面包屑导航"
    ],
    标签: [
      "锚点",
      "scroll spy",
      "高亮",
      "导航"
    ],
    来源: "视频拆解：9 种导航类型（2026-09-02 用户提供，导航栏交互拆解；实现代码自写；巨型菜单导航与 v139 重复已跳过）",
    效果演示: "assets/demos/锚点导航.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "bg",
        名: "导航底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "text",
        名: "文字色",
        类型: "color",
        默认: "#6b7280"
      },
      {
        键: "active",
        名: "当前项色",
        类型: "color",
        默认: "#111827"
      },
      {
        键: "barColor",
        名: "指示条色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "threshold",
        名: "滚动阈值（px）",
        类型: "slider",
        最小: 0,
        最大: 200,
        步长: 10,
        默认: 0
      },
      {
        键: "dur",
        名: "指示条动画（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.6,
        步长: 0.02,
        默认: 0.3
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 15
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 10
      },
      {
        键: "barH",
        名: "指示条高（px）",
        类型: "slider",
        最小: 2,
        最大: 6,
        步长: 1,
        默认: 3
      },
      {
        键: "pos",
        名: "位置",
        类型: "select",
        选项: ["顶","底"],
        默认: "顶"
      },
      {
        键: "items",
        名: "导航项（逗号分隔）",
        类型: "string",
        默认: "首页,特性,价格,联系"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n页面滚动时对应导航项自动高亮（配底部指示条），让用户明确当前阅读位置。核心逻辑是匹配单页长文、文档、落地页等需要清晰阅读锚点的需求。与 soa07 粘性章节导航互补：一个用顶部导航条、一个用侧边圆点。\n能怎么改：拖滑杆调「主题色、导航底色、文字色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "滚动自动高亮当前章；点导航项平滑滚动到对应区块。调「指示条色/指示条高/动画」定动效；「位置」切顶/底固定。",
    提示词: "帮我做\"锚点导航\"（纯 HTML/CSS/JS）：\n效果：滚动时对应导航项自动高亮（配底部指示条），点项平滑滚动到区块。适配单页长文/文档/落地页。\n用法示例：\n<nav id=\"nav\"><div class=\"aitem\">首页</div>…</nav>\n// onscroll: 按 offsetTop 判定当前章 → 高亮；aitem.click → scrollIntoView\n关键参数：\n- theme 主题色 / bg 导航底色 / text 文字色 / active 当前项色 / barColor 指示条色 / threshold 滚动阈值（px） / dur 指示条动画（秒） / fontSize 字号（px） / radius 圆角（px） / barH 指示条高（px） / pos 位置 / items 导航项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/锚点导航.html 单文件\n2. items csv 即章节名，build() 同时生成导航与对应区块\n3. 调「指示条色/高/动画」「位置」顶/底",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>锚点导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#ffffff; --text:#6b7280; --active:#111827; --bar:#2563eb; --dur:.3s; --fs:15px; --radius:10px; --barH:3px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; color:var(--text); }\n  #nav { position:sticky; top:0; z-index:40; display:flex; gap:4px; padding:14px 26px; background:var(--bg); box-shadow:0 2px 10px rgba(0,0,0,.05); }\n  .aitem { position:relative; padding:10px 16px; border-radius:var(--radius); font-size:var(--fs); cursor:pointer; color:var(--text); transition:color .2s; }\n  .aitem.active { color:var(--active); font-weight:700; }\n  .aitem::after { content:\"\"; position:absolute; left:16px; right:16px; bottom:-14px; height:var(--barH); background:var(--bar); border-radius:2px; transform:scaleX(0); transform-origin:left; transition:transform var(--dur) ease; }\n  .aitem.active::after { transform:scaleX(1); }\n  .sec { height:90vh; display:flex; align-items:center; padding:0 26px; max-width:880px; margin:0 auto; }\n  .sec h2 { color:#111827; font-size:30px; }\n  .sec p { color:#6b7280; margin-top:10px; line-height:1.9; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\"><div id=\"aitems\"></div></nav>\n  <div id=\"sections\"></div>\n<script>\n  const state = {\n    theme:\"#2563eb\", bg:\"#ffffff\", text:\"#6b7280\", active:\"#111827\", barColor:\"#2563eb\",\n    threshold:0, dur:0.3, fontSize:15, radius:10, barH:3, pos:\"顶\",\n    items:\"首页,特性,价格,联系\"\n  };\n  const nav=document.getElementById(\"nav\"), aitems=document.getElementById(\"aitems\"), sectionsEl=document.getElementById(\"sections\");\n  let secs=[];\n  function build(){\n    const parts=state.items.split(\",\");\n    aitems.innerHTML=\"\"; sectionsEl.innerHTML=\"\"; secs=[];\n    parts.forEach((t,i)=>{\n      const a=document.createElement(\"div\"); a.className=\"aitem\"; a.textContent=t; a.dataset.i=i;\n      a.onclick=()=> secs[i].scrollIntoView({behavior:\"smooth\"});\n      aitems.appendChild(a);\n      const s=document.createElement(\"div\"); s.className=\"sec\"; s.innerHTML='<div><h2>'+t+'</h2><p>这是「'+t+'」区块。滚动页面，对应导航项会自动高亮，让你随时知道自己读到哪。</p></div>';\n      sectionsEl.appendChild(s); secs.push(s);\n    });\n  }\n  function spy(){\n    let idx=0;\n    secs.forEach((s,i)=>{ if(s.offsetTop-120 <= window.scrollY) idx=i; });\n    [...aitems.children].forEach((c,i)=> c.classList.toggle(\"active\", i===idx));\n  }\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--active\",state.active); R.setProperty(\"--bar\",state.barColor);\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--barH\",state.barH+\"px\");\n    nav.style.top = state.pos===\"底\" ? \"auto\" : \"0\";\n    nav.style.bottom = state.pos===\"底\" ? \"0\" : \"auto\";\n    build(); spy();\n  }\n  window.addEventListener(\"scroll\", spy);\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v149",
    标题: "滚动收缩导航",
    分类: "组件",
    子类: "导航",
    风格: ["暗色", "品牌"],
    场景: ["官网·品牌站", "通用模块区"],
    元素: ["动效", "布局"],
    搭配: [
      "全屏遮罩导航"
    ],
    标签: [
      "滚动收缩",
      "透明导航",
      "hero",
      "导航"
    ],
    来源: "视频拆解：9 种导航类型（2026-09-02 用户提供，导航栏交互拆解；实现代码自写；巨型菜单导航与 v139 重复已跳过）",
    效果演示: "assets/demos/滚动收缩导航.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#e8702a"
      },
      {
        键: "initBg",
        名: "初始底色",
        类型: "color",
        默认: "#111827"
      },
      {
        键: "scrollBg",
        名: "滚动后底色",
        类型: "color",
        默认: "#111827"
      },
      {
        键: "text",
        名: "文字色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "shadowColor",
        名: "阴影色",
        类型: "color",
        默认: "#000000"
      },
      {
        键: "initOpacity",
        名: "初始不透明度",
        类型: "slider",
        最小: 0,
        最大: 1,
        步长: 0.05,
        默认: 0
      },
      {
        键: "shrinkH",
        名: "收缩后高度（px）",
        类型: "slider",
        最小: 44,
        最大: 80,
        步长: 2,
        默认: 56
      },
      {
        键: "initH",
        名: "初始高度（px）",
        类型: "slider",
        最小: 64,
        最大: 110,
        步长: 2,
        默认: 80
      },
      {
        键: "dur",
        名: "动画时长（秒）",
        类型: "slider",
        最小: 0.1,
        最大: 0.6,
        步长: 0.02,
        默认: 0.3
      },
      {
        键: "fontSize",
        名: "字号（px）",
        类型: "slider",
        最小: 12,
        最大: 22,
        步长: 1,
        默认: 16
      },
      {
        键: "brand",
        名: "品牌文字",
        类型: "string",
        默认: "Lithos"
      },
      {
        键: "items",
        名: "导航项（逗号分隔）",
        类型: "string",
        默认: "首页,课程,作品,关于"
      }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\n初始透明贴合大图营造沉浸感，下滑后自动变矮并切换实色背景、加投影。核心逻辑是匹配带 hero 大图的官网首页：首屏要沉浸、下滑要清晰可用。\n能怎么改：拖滑杆调「主题色、初始底色、滚动后底色」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "滚动越过 40px 即收缩为实色矮条。调「初始不透明度」控首屏通透感；「初始高度/收缩后高度」控伸缩幅度；「滚动后底色」切沉浸→实色。",
    提示词: "帮我做\"滚动收缩导航\"（纯 HTML/CSS/JS）：\n效果：初始透明贴合 hero 大图；下滑后变矮并切实色背景加投影。适配带大图的官网首页。\n用法示例：\n<nav id=\"nav\">…</nav>\n// onscroll: scrolled = scrollY>40; nav.classList.toggle(\"shrunk\",scrolled); 背景按状态切 rgba\n关键参数：\n- theme 主题色 / initBg 初始底色 / scrollBg 滚动后底色 / text 文字色 / shadowColor 阴影色 / initOpacity 初始不透明度 / shrinkH 收缩后高度（px） / initH 初始高度（px） / dur 动画时长（秒） / fontSize 字号（px） / brand 品牌文字 / items 导航项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/滚动收缩导航.html 单文件\n2. initOpacity 控首屏通透感；initH/shrinkH 控伸缩\n3. 调「滚动后底色」切沉浸→实色",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>滚动收缩导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#e8702a; --initBg:#111827; --scrollBg:#111827; --text:#ffffff; --shadowC:#000000; --sh:56px; --ih:80px; --dur:.3s; --fs:16px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  #nav { position:fixed; top:0; left:0; right:0; z-index:50; height:var(--ih); display:flex; align-items:center; gap:22px; padding:0 30px; color:var(--text); transition:height var(--dur) ease, background var(--dur) ease, box-shadow var(--dur) ease; }\n  #nav.shrunk { height:var(--sh); }\n  .brand { font-weight:800; font-size:calc(var(--fs)+3px); color:var(--theme); }\n  .items { display:flex; gap:6px; flex:1; }\n  .item { padding:8px 14px; border-radius:10px; font-size:var(--fs); cursor:pointer; transition:background .15s; }\n  .item:hover { background:rgba(255,255,255,.12); }\n  .cta { background:var(--theme); color:#fff; padding:9px 18px; border-radius:10px; font-size:var(--fs); cursor:pointer; }\n  .hero { height:100vh; background:linear-gradient(135deg,#1f2937,#111827); display:flex; align-items:center; justify-content:center; color:#fff; font-size:30px; font-weight:800; text-align:center; padding:0 20px; }\n  .sec { height:90vh; padding:0 30px; max-width:880px; margin:0 auto; display:flex; align-items:center; }\n  .sec h2 { color:#111827; }\n  .sec p { color:#6b7280; margin-top:10px; line-height:1.9; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\"><div class=\"brand\" id=\"brand\">Lithos</div><div class=\"items\" id=\"items\"></div><div class=\"cta\">开始</div></nav>\n  <div class=\"hero\">向下滚动，看导航从透明大图收缩为实色矮条</div>\n  <div class=\"sec\"><div><h2>关于我们</h2><p>初始透明贴合大图营造沉浸感，下滑后自动变矮并切换实色背景，适配带 hero 大图的官网首页。</p></div></div>\n  <div class=\"sec\" style=\"height:90vh;\"></div>\n<script>\n  const state = {\n    theme:\"#e8702a\", initBg:\"#111827\", scrollBg:\"#111827\", text:\"#ffffff\", shadowColor:\"#000000\",\n    initOpacity:0, shrinkH:56, initH:80, dur:0.3, fontSize:16,\n    brand:\"Lithos\", items:\"首页,课程,作品,关于\"\n  };\n  const nav=document.getElementById(\"nav\"), itemsEl=document.getElementById(\"items\"), brandEl=document.getElementById(\"brand\");\n  function render(){ itemsEl.innerHTML=\"\"; state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"item\"; d.textContent=t; itemsEl.appendChild(d); }); }\n  function hexA(hex,a){ const h=hex.replace('#',''); const r=parseInt(h.substr(0,2),16),g=parseInt(h.substr(2,2),16),b=parseInt(h.substr(4,2),16); return `rgba(${r},${g},${b},${a})`; }\n  function onScroll(){\n    const scrolled = window.scrollY > 40;\n    nav.classList.toggle(\"shrunk\", scrolled);\n    nav.style.background = scrolled ? hexA(state.scrollBg, 1) : hexA(state.initBg, state.initOpacity);\n    nav.style.boxShadow = '0 6px 20px ' + hexA(state.shadowColor, scrolled?0.18:0);\n  }\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--initBg\",state.initBg); R.setProperty(\"--scrollBg\",state.scrollBg);\n    R.setProperty(\"--text\",state.text); R.setProperty(\"--shadowC\",state.shadowColor);\n    R.setProperty(\"--sh\",state.shrinkH+\"px\"); R.setProperty(\"--ih\",state.initH+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    brandEl.textContent=state.brand; render(); onScroll();\n  }\n  window.addEventListener(\"scroll\", onScroll);\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s208",
    标题: "OpenAI 极简导航栏",
    分类: "组件",
    子类: "导航",
    风格: ["极简", "品牌"],
    场景: ["官网·品牌站", "工具·SaaS"],
    元素: ["视觉"],
    标签: ["导航", "Research-first", "OpenAI", "极简"],
    来源: "参考 openai.com 官网导航（2026-09-04 抓取分析）",
    效果演示: "assets/demos/OpenAI极简导航.html",
    参数: [
      { 键: "firstItem", 名: "导航首项文案（身份宣言）", 类型: "string", 默认: "Research" },
      { 键: "menuItems", 名: "导航菜单项（逗号分隔）", 类型: "string", 默认: "Research,Products,Business,Safety,API" },
      { 键: "brandName", 名: "品牌名称", 类型: "string", 默认: "OpenAI" },
      { 键: "ink", 名: "文字主色", 类型: "color", 默认: "#1a1a1a" },
      { 键: "accent", 名: "强调色（链接 hover）", 类型: "color", 默认: "#10a37f" },
      { 键: "bg", 名: "导航栏背景色", 类型: "color", 默认: "#ffffff" },
      { 键: "height", 名: "导航栏高度（px）", 类型: "slider", 最小: 44, 最大: 80, 步长: 2, 默认: 56 },
      { 键: "fontSize", 名: "菜单字号（px）", 类型: "slider", 最小: 12, 最大: 18, 步长: 0.5, 默认: 14 },
      { 键: "gap", 名: "菜单项间距（px）", 类型: "slider", 最小: 16, 最大: 40, 步长: 2, 默认: 24 },
      { 键: "showRight", 名: "显示右侧操作区", 类型: "switch", 默认: true },
      { 键: "rightText", 名: "右侧按钮文案", 类型: "string", 默认: "Try ChatGPT" }
    ],
    效果说明: "构图笔记：靠反馈的强弱、方向与一致性建立操作可信度，每一次点击都该让用户「感觉得到」结果。\nOpenAI 官网风格的极简顶部导航：品牌名在左、菜单居中偏左（首项 = 身份宣言如 Research）、右侧操作区（登录/试用）。无下划线、无图标、纯文字链接 + hover 变色。核心特征：把「我是谁」（Research）放在最前面，而不是把「卖什么」（Products）放最前——这是身份排序而非功能排序。\n能怎么改：拖滑杆调「导航首项文案（身份宣言）、导航菜单项（逗号分隔）、品牌名称」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "改「导航首项文案」为你的品牌关键词；调「菜单项」匹配你的站点结构；「强调色」用品牌色。配合焦点型Hero（s205）使用——导航栏 + 首屏 = OpenAI 式完整门面。",
    提示词: "帮我做「OpenAI 极简导航栏」（纯 HTML/CSS/JS）：\n效果：极简顶部固定导航栏，品牌名在左、文字菜单在右（首项 = 品牌身份关键词）、最右侧是操作按钮（登录/试用）。无下划线无图标，hover 时文字变色。核心：首项不是「产品」而是「研究/关于」——身份先于功能。\n用法示例：\n<nav class=\"oai-nav\">\n  <span class=\"brand\">Brand</span>\n  <div class=\"menu\">\n    <a href=\"#\">About</a><a href=\"#\">Product</a><a href=\"#\">Pricing</a>\n  </div>\n  <div class=\"right\"><a href=\"#\">Log in</a><a href=\"#\">Try it</a></div>\n</nav>\n关键参数：\n- firstItem 导航首项 / menuItems 菜单列表 / brandName 品牌名 / ink 文字主色 / accent 强调色 / bg 背景色 / height 高度 / fontSize 字号 / gap 间距 / showRight 显示右侧 / rightText 右侧按钮文案\n集成步骤：\n1. 复制 assets/demos/OpenAI极简导航.html 的 nav 结构\n2. 改 firstItem 为你的品牌定位词（如「设计」「研究」「工作室」）\n3. 配合焦点型Hero（s205）组成完整门面",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>OpenAI 极简导航栏演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  :root {\n    --ink: #1a1a1a; --accent: #10a37f; --bg: #ffffff;\n    --h: 56px; --fs: 14px; --gap: 24px;\n  }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #f7f7f5; }\n\n  /* 导航栏 */\n  .oai-nav {\n    position: fixed; top: 0; left: 0; right: 0; z-index: 100;\n    height: var(--h); display: flex; align-items: center; justify-content: space-between;\n    padding: 0 28px; background: var(--bg);\n    border-bottom: 1px solid rgba(0,0,0,.06);\n  }\n  .brand { font-weight: 800; font-size: 16px; color: var(--ink); letter-spacing: .3px; }\n  .menu { display: flex; align-items: center; gap: var(--gap); }\n  .menu a {\n    color: var(--ink); text-decoration: none; font-size: var(--fs); font-weight: 500;\n    transition: color .15s; position: relative;\n  }\n  .menu a:first-child { color: var(--accent); font-weight: 600; } /* 首项 = 身份宣言，用强调色 */\n  .menu a:hover { color: var(--accent); }\n  .right { display: flex; align-items: center; gap: 16px; }\n  .right a {\n    color: var(--ink); text-decoration: none; font-size: var(--fs); font-weight: 500;\n    transition: color .15s;\n  }\n  .right a:hover { color: var(--accent); }\n  .try-btn {\n    background: var(--ink); color: #fff; padding: 7px 16px; border-radius: 999px;\n    font-size: 13.5px; font-weight: 600; text-decoration: none; transition: background .15s;\n  }\n  .try-btn:hover { background: #333; }\n\n  /* 演示内容区 */\n  .demo-content { padding: calc(var(--h) + 40px) 28px 40px; max-width: 880px; margin: 0 auto; }\n  .demo-content h1 { font-size: 24px; font-weight: 800; margin-bottom: 8px; color: var(--ink); }\n  .demo-content p { color: #6b6b66; line-height: 1.8; font-size: 14.5px; }\n  .feature-list { margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }\n  .feature-item {\n    background: #fff; border: 1px solid #e8e8e4; border-radius: 10px;\n    padding: 14px 16px; font-size: 13.5px; color: #3d3b36; line-height: 1.6;\n  }\n  .feature-item b { color: var(--accent); }\n</style>\n</head>\n<body>\n<nav class=\"oai-nav\" id=\"nav\">\n  <span class=\"brand\" id=\"brand\">OpenAI</span>\n  <div class=\"menu\" id=\"menu\"></div>\n  <div class=\"right\" id=\"right\"></div>\n</nav>\n\n<div class=\"demo-content\">\n  <h1>OpenAI 极简导航栏</h1>\n  <p>品牌名在左、菜单居中（首项 = 身份宣言）、右侧操作区。无下划线无图标，纯文字 + hover 变色。<br>核心特征：把「我是谁」放在最前，而不是把「卖什么」放最前——身份排序优先于功能排序。</p>\n  <div class=\"feature-list\">\n    <div class=\"feature-item\"><b>首项强调色</b> — Research/About 用品牌色高亮，一眼看到定位</div>\n    <div class=\"feature-item\"><b>零装饰</b> — 无图标无下划线无阴影，靠字重和间距分层</div>\n    <div class=\"feature-item\"><b>右侧引流</b> — Log in（虚）+ Try（实）双按钮，和 Apple 同源</div>\n    <div class=\"feature-item\"><b>固定顶栏</b> — 滚动不消失，始终可触达</div>\n  </div>\n</div>\n\n<script>\n  const state = {\n    firstItem: \"Research\",\n    menuItems: \"Research,Products,Business,Safety,API\",\n    brandName: \"OpenAI\",\n    ink: \"#1a1a1a\",\n    accent: \"#10a37f\",\n    bg: \"#ffffff\",\n    height: 56,\n    fontSize: 14,\n    gap: 24,\n    showRight: true,\n    rightText: \"Try ChatGPT\"\n  };\n\n  const nav = document.getElementById('nav');\n  const brandEl = document.getElementById('brand');\n  const menuEl = document.getElementById('menu');\n  const rightEl = document.getElementById('right');\n\n  function render() {\n    brandEl.textContent = state.brandName;\n\n    // 菜单项\n    menuEl.innerHTML = '';\n    const items = state.menuItems.split(',').map(s => s.trim()).filter(Boolean);\n    items.forEach((item, i) => {\n      const a = document.createElement('a');\n      a.href = '#';\n      a.textContent = item;\n      if (i === 0) a.style.color = 'var(--accent)'; // 首项强调\n      a.addEventListener('mouseenter', () => { a.style.color = 'var(--accent)'; });\n      a.addEventListener('mouseleave', () => { if (i === 0) return; a.style.color = 'var(--ink)'; });\n      menuEl.appendChild(a);\n    });\n\n    // 右侧操作区\n    rightEl.innerHTML = '';\n    if (state.showRight) {\n      const login = document.createElement('a');\n      login.href = '#';\n      login.textContent = 'Log in';\n      rightEl.appendChild(login);\n\n      const tryBtn = document.createElement('a');\n      tryBtn.href = '#';\n      tryBtn.className = 'try-btn';\n      tryBtn.textContent = state.rightText;\n      rightEl.appendChild(tryBtn);\n    }\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty('--ink', state.ink);\n    R.setProperty('--accent', state.accent);\n    R.setProperty('--bg', state.bg);\n    R.setProperty('--h', state.height + 'px');\n    R.setProperty('--fs', state.fontSize + 'px');\n    R.setProperty('--gap', state.gap + 'px');\n    render();\n  }\n\n  window.addEventListener('message', e => {\n    const d = e.data;\n    if (!d || d.type !== 'param') return;\n    state[d.key] = d.value;\n    apply();\n  });\n\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s209",
    标题: "粒子星系",
    分类: "背景",
    子类: "粒子",
    风格: ["暗色", "科技", "轻盈"],
    场景: ["落地页·发布页", "官网·品牌站", "通用模块区"],
    元素: ["3D·粒子"],
    搭配: [
      "文字遮罩",
      "滚动揭示入场"
    ],
    标签: ["粒子", "星系", "星空", "Three.js", "OpenAI", "Astra", "GPT-6", "发布页", "背景"],
    来源: "GitHub Win-Hao/starflow（MIT），参考 OpenAI GPT-6 Astra 发布页粒子效果，代码独立实现（2026-09-07 入库）",
    效果演示: "assets/demos/粒子星系.html",
    ThreeJS演示: "assets/demos/粒子星系-ThreeJS.html",
    下载: "assets/库/starflow.js",
    参数: [
      { 键: "starCount", 名: "星数", 类型: "slider", 最小: 800, 最大: 12000, 步长: 200, 默认: 4000 },
      { 键: "size", 名: "星星大小", 类型: "slider", 最小: 0.5, 最大: 3, 步长: 0.05, 默认: 2.05 },
      { 键: "scatter", 名: "星带宽度", 类型: "slider", 最小: 0, 最大: 0.14, 步长: 0.001, 默认: 0.041 },
      { 键: "backgroundRatio", 名: "背景星比例", 类型: "slider", 最小: 0, 最大: 1.2, 步长: 0.02, 默认: 0.14 },
      { 键: "rotationDepth", 名: "厚度（Z 向起伏）", 类型: "slider", 最小: 0, 最大: 2, 步长: 0.05, 默认: 1.4 },
      { 键: "palette", 名: "调色板", 类型: "select", 选项: ["astra", "aurora", "ember", "ice", "gold"], 默认: "astra" },
      { 键: "bloomIntensity", 名: "Bloom 强度", 类型: "slider", 最小: 0, 最大: 2, 步长: 0.05, 默认: 0.7 },
      { 键: "bloomThreshold", 名: "Bloom 阈值", 类型: "slider", 最小: 0, 最大: 0.6, 步长: 0.01, 默认: 0.08 },
      { 键: "intensity", 名: "整体亮度", 类型: "slider", 最小: 0.2, 最大: 3, 步长: 0.05, 默认: 1.35 },
      { 键: "flare", 名: "镜头光晕强度", 类型: "slider", 最小: 0, 最大: 1, 步长: 0.02, 默认: 0.28 },
      { 键: "ambientColor", 名: "氛围色", 类型: "color", 默认: "#23435f" },
      { 键: "vignette", 名: "暗角", 类型: "slider", 最小: 0, 最大: 1, 步长: 0.05, 默认: 1 },
      { 键: "flowSpeed", 名: "流动速度", 类型: "slider", 最小: 0, 最大: 3, 步长: 0.05, 默认: 0.8 },
      { 键: "twinkleSpeed", 名: "闪烁速度", 类型: "slider", 最小: 0, 最大: 2, 步长: 0.02, 默认: 0.62 }
    ],
    效果说明: "构图笔记：用色块、粒子或光影铺底制造氛围层次，关键是让主体内容始终清晰可读，背景只做衬托不做主角。\n基于 Three.js 的螺旋星系粒子系统（4000 颗星星沿 5 条手绘螺旋曲线分布，带 Bloom 辉光、镜头光晕、氛围色和暗角），效果来自 OpenAI GPT-6 Astra 发布页。演示文件分两层：Canvas 2D 预览（双击直接看）和 Three.js 完整版。\n能怎么改：拖滑杆调「星数、星星大小、星带宽度」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "复制下方代码里的 starflow.js 引擎 + 集成代码，用 HTTP 服务打开看完整 3D 效果。也支持滚动编排（星轨散开→聚成形状），见方案 s206「星流/Astra 暗色发布页」。",
    提示词: "帮我做「粒子星系动态背景」（基于 Three.js）：\n效果：4000 颗星星组成的螺旋星系，带 Bloom 辉光、镜头光晕、氛围色和暗角。可拖拽旋转，划过推开星尘。5 套调色板可选。\n用法示例：\n<canvas id=\"sky\"></canvas>\n<script type=\"module\">\n  import { createAstraScene } from './starflow.js'\n  const astra = createAstraScene(document.querySelector('#sky'))\n  astra.setSource({ type: 'galaxy' }, { starCount: 4000, palette: 'astra' })\n</script>\n关键参数：\n- starCount 星数(800-12000) / size 星星大小 / scatter 星带宽度 / palette 调色板(astra/aurora/ember/ice/gold)\n- bloomIntensity Bloom强度 / bloomThreshold Bloom阈值 / intensity 亮度 / flare 光晕 / flowSpeed 流动速度\n- backgroundRatio 背景星比例 / rotationDepth 厚度(Z向起伏) / ambientColor 氛围色 / vignette 暗角 / twinkleSpeed 闪烁速度\n集成步骤：\n1. 复制 assets/库/starflow.js 到项目目录\n2. 建一个 <canvas>，import { createAstraScene } from './starflow.js'\n3. 调参数匹配你的品牌色（氛围色用品牌色，暗角调深）\n4. 上面叠文字内容，canvas 做背景\n5. 想加滚动编排：在 scroll 事件里调 astra.setScroll({ progress, tiltProgress, scatterProgress, shape })\n\n",
    代码: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>粒子星系 · Three.js 完整版</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; background: #000; overflow: hidden; }
  canvas { position: fixed; inset: 0; width: 100%; height: 100%; display: block; touch-action: none; }

  .panel-toggle {
    position: fixed; right: 16px; bottom: 16px; z-index: 10;
    width: 40px; height: 40px; border-radius: 999px;
    background: #ffffff1f; border: 0; color: #ffffffcc; font-size: 18px; cursor: pointer; transition: background .15s;
    display: grid; place-items: center;
  }
  .panel-toggle:hover { background: #ffffff33; }
  .panel {
    position: fixed; right: 16px; bottom: 64px; z-index: 10;
    width: 280px; max-height: 70vh; overflow-y: auto;
    background: #111; border: 1px solid #ffffff1a; border-radius: 12px;
    padding: 16px; display: none; flex-direction: column; gap: 10px;
  }
  .panel.open { display: flex; }
  .panel h3 { color: #ffffff99; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; margin: 4px 0 2px; }
  .panel label { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #ffffffcc; font-size: 13px; }
  .panel input[type="range"] { width: 120px; accent-color: #ffffff; }
  .panel input[type="color"] { width: 60px; height: 24px; border: 0; background: transparent; cursor: pointer; }
  .panel select { background: #222; color: #fff; border: 1px solid #ffffff33; border-radius: 6px; padding: 2px 6px; font-size: 12px; }
  .panel .note { color: #ffffff66; font-size: 11px; margin-top: 4px; }
  .hint { position: fixed; left: 50%; bottom: 40px; transform: translateX(-50%); color: #ffffff40; font: 400 13px / 1.4 system-ui, sans-serif; letter-spacing: .02em; pointer-events: none; }
</style>
</head>
<body>
<canvas id="astra"></canvas>
<p class="hint">拖动旋转 · 划过推开星尘 · 右下角调参</p>
<button class="panel-toggle" id="toggle" aria-label="调参面板">⚙</button>
<div class="panel" id="panel">
  <h3>星场</h3>
  <label>星数 <b id="v-starCount">4000</b><input id="starCount" type="range" min="800" max="12000" step="200" value="4000"></label>
  <label>星星大小 <b id="v-size">2.05</b><input id="size" type="range" min="0.5" max="3" step="0.05" value="2.05"></label>
  <label>星带宽度 <b id="v-scatter">0.041</b><input id="scatter" type="range" min="0" max="0.14" step="0.001" value="0.041"></label>
  <label>背景星 <b id="v-backgroundRatio">0.14</b><input id="backgroundRatio" type="range" min="0" max="1" step="0.02" value="0.14"></label>
  <label>厚度 <b id="v-rotationDepth">1.4</b><input id="rotationDepth" type="range" min="0" max="2" step="0.05" value="1.4"></label>
  <label>调色板 <select id="palette"><option value="astra">Astra</option><option value="aurora">Aurora</option><option value="ember">Ember</option><option value="ice">Ice</option><option value="gold">Gold</option></select></label>
  <h3>光学</h3>
  <label>Bloom 强度 <b id="v-bloomIntensity">0.7</b><input id="bloomIntensity" type="range" min="0" max="2" step="0.05" value="0.7"></label>
  <label>Bloom 阈值 <b id="v-bloomThreshold">0.08</b><input id="bloomThreshold" type="range" min="0" max="0.6" step="0.01" value="0.08"></label>
  <label>整体亮度 <b id="v-intensity">1.35</b><input id="intensity" type="range" min="0.2" max="3" step="0.05" value="1.35"></label>
  <label>镜头光晕 <b id="v-flare">0.28</b><input id="flare" type="range" min="0" max="1" step="0.02" value="0.28"></label>
  <label>氛围色 <input id="ambientColor" type="color" value="#23435f"></label>
  <label>暗角 <b id="v-vignette">1</b><input id="vignette" type="range" min="0" max="1" step="0.05" value="1"></label>
  <h3>动态</h3>
  <label>流动速度 <b id="v-flowSpeed">0.8</b><input id="flowSpeed" type="range" min="0" max="3" step="0.05" value="0.8"></label>
  <label>闪烁速度 <b id="v-twinkleSpeed">0.62</b><input id="twinkleSpeed" type="range" min="0" max="2" step="0.02" value="0.62"></label>
  <p class="note">调参后通过 postMessage({type:'param',key,value}) 实时更新<br>注意：本文件需 HTTP 服务才能运行（npx serve .）</p>
</div>

<script type="module">
  import { createAstraScene, detectWebGL, renderStaticFallback } from '../库/starflow.js'

  const canvas = document.getElementById('astra')
  const state = {
    starCount: 4000, size: 2.05, scatter: 0.041, backgroundRatio: 0.14,
    rotationDepth: 1.4, palette: 'astra',
    bloomIntensity: 0.7, bloomThreshold: 0.08, intensity: 1.35,
    flare: 0.28, ambientColor: '#23435f', vignette: 1,
    flowSpeed: 0.8, twinkleSpeed: 0.62
  }

  let astra = null

  function init() {
    if (astra) { astra.dispose(); astra = null }
    if (!detectWebGL()) {
      renderStaticFallback(canvas, { type: 'galaxy' }, { starCount: state.starCount, palette: state.palette, scatter: state.scatter })
      return
    }
    astra = createAstraScene(canvas, {
      flowSpeed: state.flowSpeed, bloomIntensity: state.bloomIntensity, bloomThreshold: state.bloomThreshold,
      intensity: state.intensity, lensFlare: { intensity: state.flare },
      ambientColor: state.ambientColor, ambientOpacity: 0.55, vignette: state.vignette,
      twinkleSpeed: state.twinkleSpeed, size: state.size, introDuration: 3,
    })
    astra.setSource({ type: 'galaxy' }, {
      starCount: state.starCount, scatter: state.scatter, size: state.size,
      palette: state.palette, backgroundRatio: state.backgroundRatio, rotationDepth: state.rotationDepth,
    })
  }

  init()

  const panel = document.getElementById('panel')
  document.getElementById('toggle').addEventListener('click', () => panel.classList.toggle('open'))

  function bindSlider(id, key) {
    const el = document.getElementById(id)
    const val = document.getElementById('v-' + id)
    el.addEventListener('input', () => {
      const v = parseFloat(el.value)
      val.textContent = v
      state[key] = v
      if (astra) {
        if (['starCount','scatter','backgroundRatio','rotationDepth','palette'].includes(key)) {
          astra.dispose(); init()
        } else {
          astra.setConfig?.({ [key]: v })
        }
      }
    })
  }

  ;['starCount','size','scatter','backgroundRatio','rotationDepth','bloomIntensity','bloomThreshold','intensity','flare','vignette','flowSpeed','twinkleSpeed'].forEach(k => bindSlider(k, k))

  document.getElementById('palette').addEventListener('change', e => {
    state.palette = e.target.value; if (astra) { astra.dispose(); init() }
  })
  document.getElementById('ambientColor').addEventListener('input', e => {
    state.ambientColor = e.target.value; if (astra) astra.setConfig?.({ ambientColor: state.ambientColor })
  })

  window.addEventListener('message', e => {
    const d = e.data; if (!d || d.type !== 'param') return
    state[d.key] = d.value
    if (['starCount','scatter','backgroundRatio','rotationDepth','palette'].includes(d.key)) {
      if (astra) { astra.dispose(); init() }
    } else if (astra) { astra.setConfig?.({ [d.key]: d.value }) }
  })
<\/script>
</body>
</html>`,
    复用记录: ""
  }
,
  {
  id: "v150",
  标题: "主题切换",
  分类: "组件",
  子类: "主题切换",
  风格: [
    "通用"
  ],
  场景: [
    "通用模块区"
  ],
  元素: [
    "动效",
    "视觉"
  ],
  搭配: [

  ],
  标签: [
    "深色模式",
    "扩散",
    "触点"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/主题切换.html",
  参数: [
    {
      键: "dur",
      名: "切换时长（秒）",
      类型: "slider",
      最小: 0.2,
      最大: 1.5,
      步长: 0.05,
      默认: 0.6
    },
    {
      键: "maxr",
      名: "扩散半径（%）",
      类型: "slider",
      最小: 110,
      最大: 220,
      步长: 5,
      默认: 160
    },
    {
      键: "lightBg",
      名: "浅色背景",
      类型: "color",
      默认: "#ffffff"
    },
    {
      键: "darkBg",
      名: "深色背景",
      类型: "color",
      默认: "#15171c"
    },
    {
      键: "lightText",
      名: "浅色文字",
      类型: "color",
      默认: "#1a1a1a"
    },
    {
      键: "darkText",
      名: "深色文字",
      类型: "color",
      默认: "#f2f3f5"
    },
    {
      键: "accent",
      名: "强调色",
      类型: "color",
      默认: "#3d5fd6"
    }
  ],
  效果说明: "以触点为中心用圆形 clip-path 扩散切换深色模式，底层页面布局不动、不变形。\n好处：切换有明确的空间来历（从你点的地方漫开），比整屏硬切更有「控制感」，也避免了布局抖动带来的眩晕。\n能怎么改：拖滑杆调「切换时长、扩散半径」，换颜色改浅/深双套配色与强调色。",
  用法: "点演示任意位置即可触发；详情页调「切换时长、扩散半径」看节奏，换「浅色背景/深色背景/强调色」改双主题配色。",
  提示词: "做一个「以触点扩散的深色模式切换」（纯 HTML/CSS/JS）：\n效果：点击页面任意处，从一个圆形 clip-path 从该点向外扩大，把浅色主题切换为深色主题，底层布局不位移。\n用法示例：\n<div class=\"surface dark\" style=\"clip-path:circle(0 at var(--x) var(--y))\"></div>\n关键参数：dur 切换时长 / maxr 扩散半径 / lightBg 浅色背景 / darkBg 深色背景 / lightText 浅色文字 / darkText 深色文字 / accent 强调色\n集成步骤：1. 复制 assets/demos/主题切换.html 的双层 surface 结构 2. 点击时记录触点坐标写入 --x/--y 并加 .on 类 3. 改两套 CSS 变量配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>主题切换演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .stage { position: relative; width: min(520px, 92vw); height: 340px; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,.12); cursor: pointer; --dur: .6s; --maxr: 160%; }\n  .surface { position: absolute; inset: 0; padding: 28px; display: flex; flex-direction: column; gap: 14px; justify-content: center; }\n  .surface.dark { clip-path: circle(0px at var(--x, 50%) var(--y, 50%)); transition: clip-path var(--dur) cubic-bezier(.4,0,.2,1); }\n  .stage.on .surface.dark { clip-path: circle(var(--maxr) at var(--x, 50%) var(--y, 50%)); }\n  .bar { height: 14px; border-radius: 8px; width: 55%; }\n  .bar.s { width: 80%; height: 10px; opacity: .7; }\n  .card { margin-top: auto; display: flex; gap: 10px; }\n  .chip { width: 64px; height: 64px; border-radius: 14px; }\n  .btn { margin-top: 14px; align-self: flex-start; padding: 10px 18px; border-radius: 10px; border: none; font-size: 14px; cursor: pointer; }\n  .hint { position: absolute; left: 0; right: 0; bottom: 10px; text-align: center; font-size: 12px; opacity: .6; }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"surface light\" id=\"light\"></div>\n  <div class=\"surface dark\" id=\"dark\"></div>\n  <div class=\"hint\">点任意位置：以触点为中心扩散切换深色模式，底层布局不变形</div>\n</div>\n<script>\n  const state = { dur: .6, maxr: 160, lightBg: \"#ffffff\", darkBg: \"#15171c\", lightText: \"#1a1a1a\", darkText: \"#f2f3f5\", accent: \"#3d5fd6\" };\n  const stage = document.getElementById(\"stage\");\n  function build(surface, isDark) {\n    const bg = isDark ? state.darkBg : state.lightBg;\n    const fg = isDark ? state.darkText : state.lightText;\n    surface.style.background = bg;\n    surface.style.color = fg;\n    surface.innerHTML =\n      '<div class=\"bar\" style=\"background:' + state.accent + '\"></div>' +\n      '<div class=\"bar s\" style=\"background:' + fg + '\"></div>' +\n      '<div style=\"font-size:20px;font-weight:700\">灵感弹药库</div>' +\n      '<div class=\"bar s\" style=\"background:' + fg + '\"></div>' +\n      '<div class=\"card\">' +\n        '<div class=\"chip\" style=\"background:' + state.accent + '\"></div>' +\n        '<div class=\"chip\" style=\"background:' + (isDark ? \"#2a2d35\" : \"#ececf0\") + '\"></div>' +\n        '<div class=\"chip\" style=\"background:' + (isDark ? \"#2a2d35\" : \"#ececf0\") + '\"></div>' +\n      '</div>' +\n      '<button class=\"btn\" style=\"background:' + state.accent + ';color:#fff\">切换主题</button>';\n  }\n  function apply() {\n    stage.style.setProperty(\"--dur\", state.dur + \"s\");\n    stage.style.setProperty(\"--maxr\", state.maxr + \"%\");\n    build(document.getElementById(\"light\"), false);\n    build(document.getElementById(\"dark\"), true);\n  }\n  stage.addEventListener(\"pointerdown\", e => {\n    const r = stage.getBoundingClientRect();\n    stage.style.setProperty(\"--x\", (e.clientX - r.left) + \"px\");\n    stage.style.setProperty(\"--y\", (e.clientY - r.top) + \"px\");\n    stage.classList.toggle(\"on\");\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v151",
  标题: "拖拽排序",
  分类: "组件",
  子类: "拖拽排序",
  风格: [
    "通用"
  ],
  场景: [
    "通用模块区",
    "后台·数据看板"
  ],
  元素: [
    "动效",
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "拖拽",
    "排序",
    "弹簧"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/拖拽排序.html",
  参数: [
    {
      键: "gap",
      名: "行间距（px）",
      类型: "slider",
      最小: 4,
      最大: 28,
      步长: 1,
      默认: 12
    },
    {
      键: "dragScale",
      名: "拖起放大",
      类型: "slider",
      最小: 1,
      最大: 1.3,
      步长: 0.01,
      默认: 1.06
    },
    {
      键: "radius",
      名: "圆角（px）",
      类型: "slider",
      最小: 0,
      最大: 28,
      步长: 2,
      默认: 12
    },
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "accent2",
      名: "次色",
      类型: "color",
      默认: "#7c4dff"
    },
    {
      键: "count",
      名: "条目数",
      类型: "slider",
      最小: 3,
      最大: 8,
      步长: 1,
      默认: 6
    }
  ],
  效果说明: "拖动某一条目时，其余条目按实时落点索引主动让位，用带回弹的弹簧曲线重新排布。\n好处：拖到哪、东西就让到哪，位置反馈即时且「有弹性」，比生硬瞬移更能显出操作被接收。\n能怎么改：拖滑杆调「行间距、拖起放大、圆角」，换颜色改奇偶条目配色。",
  用法: "按住条目上下拖；详情页调「行间距、拖起放大」看让位幅度，换「主色/次色」改条目配色。",
  提示词: "做一个「拖拽排序 + 其余条目弹簧让位」（纯 HTML/CSS/JS）：\n效果：拖动条目时，其他条目根据实时落点索引用 FLIP + 回弹缓动（cubic-bezier(.34,1.56,.64,1)）重新排布，被拖条目跟随指针并轻微放大。\n用法示例：用 insertBefore 移动 DOM 节点，移动前后用 getBoundingClientRect 记录位置差做 transform 过渡。\n关键参数：gap 行间距 / dragScale 拖起放大 / radius 圆角 / accent 主色 / accent2 次色 / count 条目数\n集成步骤：1. 复制 assets/demos/拖拽排序.html 的 flip() 逻辑 2. pointermove 计算落点并 insertBefore 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>拖拽排序演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .list { width: min(420px, 92vw); display: flex; flex-direction: column; }\n  .item { color: #fff; padding: 16px 18px; border-radius: 12px; margin: 6px 0; cursor: grab; user-select: none; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 14px rgba(0,0,0,.12); touch-action: none; font-size: 15px; transition: box-shadow .2s; }\n  .item .h { opacity: .7; font-size: 12px; }\n  .item.dragging { box-shadow: 0 14px 34px rgba(0,0,0,.28); cursor: grabbing; z-index: 10; position: relative; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"list\" id=\"list\"></div>\n<div class=\"hint\">拖动任意条目：其余条目按实时落点以弹簧动效主动让位</div>\n<script>\n  const state = { gap: 12, dragScale: 1.06, radius: 12, accent: \"#3d5fd6\", accent2: \"#7c4dff\", count: 6 };\n  const list = document.getElementById(\"list\");\n  const names = [\"首页 Banner\", \"产品列表\", \"用户评价\", \"价格方案\", \"常见问题\", \"页脚导航\", \"订阅区块\", \"关于我们\"];\n  let dragEl = null, startY = 0, dy = 0;\n\n  function render() {\n    list.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const d = document.createElement(\"div\");\n      d.className = \"item\";\n      d.style.background = i % 2 ? state.accent2 : state.accent;\n      d.style.borderRadius = state.radius + \"px\";\n      d.style.margin = (state.gap / 2) + \"px 0\";\n      d.textContent = names[i % names.length];\n      const s = document.createElement(\"span\"); s.className = \"h\"; s.textContent = \"拖 #\" + (i + 1);\n      d.appendChild(s);\n      d.addEventListener(\"pointerdown\", start);\n      list.appendChild(d);\n    }\n  }\n\n  function flip(mutate) {\n    const kids = [...list.children];\n    const olds = kids.map(c => c.getBoundingClientRect());\n    mutate();\n    const news = [...list.children].map(c => c.getBoundingClientRect());\n    [...list.children].forEach((c, idx) => {\n      if (c === dragEl) return;\n      const dx = olds[idx].left - news[idx].left;\n      const dyc = olds[idx].top - news[idx].top;\n      if (dx || dyc) {\n        c.style.transition = \"none\";\n        c.style.transform = \"translate(\" + dx + \"px,\" + dyc + \"px)\";\n        requestAnimationFrame(() => {\n          c.style.transition = \"transform .42s cubic-bezier(.34,1.56,.64,1)\";\n          c.style.transform = \"\";\n        });\n      }\n    });\n  }\n\n  function start(e) {\n    dragEl = e.currentTarget;\n    dragEl.setPointerCapture(e.pointerId);\n    startY = e.clientY; dy = 0;\n    dragEl.classList.add(\"dragging\");\n  }\n\n  window.addEventListener(\"pointermove\", e => {\n    if (!dragEl) return;\n    dy = e.clientY - startY;\n    dragEl.style.transform = \"translateY(\" + dy + \"px) scale(\" + state.dragScale + \")\";\n    const rects = [...list.children].map(c => c.getBoundingClientRect());\n    let target = null;\n    for (let i = 0; i < rects.length; i++) {\n      if (list.children[i] === dragEl) continue;\n      const mid = rects[i].top + rects[i].height / 2;\n      if (e.clientY < mid) { target = list.children[i]; break; }\n      target = list.children[i].nextSibling;\n    }\n    if (target !== dragEl && target !== dragEl.nextSibling) {\n      flip(() => list.insertBefore(dragEl, target));\n      startY = e.clientY - dy + 0; // keep grab offset stable\n    }\n  });\n\n  window.addEventListener(\"pointerup\", () => {\n    if (!dragEl) return;\n    dragEl.classList.remove(\"dragging\");\n    dragEl.style.transform = \"\";\n    dragEl = null;\n  });\n\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; render(); });\n  render();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v152",
  标题: "文本展开",
  分类: "组件",
  子类: "文本展开",
  风格: [
    "轻盈"
  ],
  场景: [
    "内容·阅读",
    "通用模块区"
  ],
  元素: [
    "动效"
  ],
  搭配: [

  ],
  标签: [
    "折叠",
    "展开",
    "高度"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/文本展开.html",
  参数: [
    {
      键: "dur",
      名: "展开时长（秒）",
      类型: "slider",
      最小: 0.15,
      最大: 1,
      步长: 0.05,
      默认: 0.45
    },
    {
      键: "ease",
      名: "缓动",
      类型: "select",
      选项: [
        "ease",
        "ease-in-out",
        "linear"
      ],
      默认: "ease"
    },
    {
      键: "radius",
      名: "卡片圆角（px）",
      类型: "slider",
      最小: 0,
      最大: 28,
      步长: 2,
      默认: 16
    },
    {
      键: "text",
      名: "文字色",
      类型: "color",
      默认: "#1a1a1a"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#ffffff"
    },
    {
      键: "open",
      名: "默认展开",
      类型: "switch",
      默认: false
    }
  ],
  效果说明: "容器高度随内容同步伸缩，箭头旋转提示开合状态，没有瞬间跳变。\n好处：折叠态只露标题、展开态平滑过渡，长文/FAQ/商品详情的局部展开不会打断阅读节奏。\n能怎么改：拖滑杆调「展开时长、卡片圆角」，换缓动改手感，换颜色改主题。",
  用法: "点标题切换；详情页调「展开时长、缓动」看节奏，换「文字色/背景色」改配色，开「默认展开」看初始态。",
  提示词: "做一个「文本展开 + 箭头旋转」（纯 HTML/CSS/JS）：\n效果：点标题时容器 height 从 0 过渡到 scrollHeight，箭头 rotate(180deg)，提示开合。\n用法示例：body.style.height = open ? body.firstElementChild.offsetHeight+'px' : '0px';\n关键参数：dur 展开时长 / ease 缓动 / radius 卡片圆角 / text 文字色 / bg 背景色 / open 默认展开\n集成步骤：1. 复制 assets/demos/文本展开.html 的 height 过渡 2. 点标题切 open 并旋转箭头 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>文本展开演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .card { width: min(440px, 92vw); background: #fff; border-radius: 16px; box-shadow: 0 10px 36px rgba(0,0,0,.1); overflow: hidden; }\n  .head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; cursor: pointer; user-select: none; }\n  .title { font-size: 16px; font-weight: 700; }\n  .arrow { width: 22px; height: 22px; transition: transform var(--dur) var(--ease); }\n  .body { height: 0; overflow: hidden; transition: height var(--dur) var(--ease); }\n  .body > div { padding: 0 20px 20px; font-size: 14px; line-height: 1.7; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\">\n  <div class=\"head\" id=\"head\">\n    <div class=\"title\">展开看完整说明</div>\n    <svg class=\"arrow\" id=\"arrow\" viewBox=\"0 0 24 24\"><path d=\"M6 9l6 6 6-6\" fill=\"none\" stroke=\"#1a1a1a\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n  </div>\n  <div class=\"body\" id=\"body\"><div>容器随内容同步调整高度，箭头旋转提示开关状态。当正文很长时，折叠态只露出标题，点击后高度平滑过渡到真实内容高度，不会出现瞬间跳变；再次点击则收回。适合 FAQ、商品详情、评论楼层的局部展开。</div></div>\n</div>\n<div class=\"hint\">点标题：容器高度随内容平滑伸缩，箭头旋转提示开合</div>\n<script>\n  const state = { dur: .45, ease: \"ease\", radius: 16, text: \"#1a1a1a\", bg: \"#ffffff\", open: false };\n  const card = document.getElementById(\"card\");\n  const arrow = document.getElementById(\"arrow\");\n  const body = document.getElementById(\"body\");\n  document.getElementById(\"head\").addEventListener(\"click\", () => { state.open = !state.open; apply(); });\n  function apply() {\n    card.style.borderRadius = state.radius + \"px\";\n    card.style.background = state.bg;\n    card.querySelector(\".title\").style.color = state.text;\n    arrow.querySelector(\"path\").setAttribute(\"stroke\", state.text);\n    body.style.setProperty(\"--dur\", state.dur + \"s\");\n    body.style.setProperty(\"--ease\", state.ease);\n    body.style.height = state.open ? body.firstElementChild.offsetHeight + \"px\" : \"0px\";\n    arrow.style.transform = state.open ? \"rotate(180deg)\" : \"rotate(0deg)\";\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v153",
  标题: "步骤条",
  分类: "组件",
  子类: "步骤条",
  风格: [
    "信息型"
  ],
  场景: [
    "工具·SaaS",
    "通用模块区"
  ],
  元素: [
    "动效",
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "进度",
    "步骤",
    "超调"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/步骤条.html",
  参数: [
    {
      键: "steps",
      名: "步骤数",
      类型: "slider",
      最小: 2,
      最大: 6,
      步长: 1,
      默认: 4
    },
    {
      键: "dur",
      名: "单步时长（秒）",
      类型: "slider",
      最小: 0.2,
      最大: 1,
      步长: 0.05,
      默认: 0.5
    },
    {
      键: "accent",
      名: "进行色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "done",
      名: "完成色",
      类型: "color",
      默认: "#2bb673"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    },
    {
      键: "ease",
      名: "缓动",
      类型: "select",
      选项: [
        "ease",
        "ease-in-out",
        "linear"
      ],
      默认: "ease"
    }
  ],
  效果说明: "进度走到最后一步完成时，节点先超调放大再回弹，强化「完成」的真实感。\n好处：普通进度条只填空，超调回弹给了一个明确的「成了」的物理反馈，比平铺直叙更让人安心。\n能怎么改：拖滑杆调「步骤数、单步时长」，换颜色改进行/完成两态。",
  用法: "点「下一步」推进；详情页调「步骤数、单步时长」看节奏，换「进行色/完成色」改语义色。",
  提示词: "做一个「步骤条 + 完成超调回弹」（纯 HTML/CSS/JS）：\n效果：N 个节点连成进度条，最后一步完成时节点用 scale(1→1.35→1) 的关键帧超调回弹。\n用法示例：完成时 node.classList.add('finish')，CSS @keyframes pop 做 scale 超调。\n关键参数：steps 步骤数 / dur 单步时长 / accent 进行色 / done 完成色 / bg 背景色 / ease 缓动\n集成步骤：1. 复制 assets/demos/步骤条.html 的 track+fill 2. 完成时加 finish 类触发超调 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>步骤条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 24px; }\n  .wrap { width: min(520px, 92vw); }\n  .track { display: flex; align-items: center; justify-content: space-between; position: relative; }\n  .line { position: absolute; left: 0; right: 0; top: 18px; height: 4px; background: #e3e3e6; border-radius: 2px; z-index: 0; }\n  .fill { position: absolute; left: 0; top: 18px; height: 4px; background: var(--accent); border-radius: 2px; z-index: 1; transition: width var(--dur) var(--ease); }\n  .node { width: 36px; height: 36px; border-radius: 50%; background: #fff; border: 3px solid #e3e3e6; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #aaa; z-index: 2; transition: transform .4s cubic-bezier(.34,1.7,.5,1), background var(--dur), border-color var(--dur), color var(--dur); }\n  .node.on { background: var(--accent); border-color: var(--accent); color: #fff; }\n  .node.done { background: var(--done); border-color: var(--done); color: #fff; }\n  .node.finish { animation: pop .5s cubic-bezier(.34,1.7,.5,1); }\n  @keyframes pop { 0% { transform: scale(1); } 45% { transform: scale(1.35); } 100% { transform: scale(1); } }\n  .btn { padding: 10px 22px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 14px; cursor: pointer; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n  <div class=\"track\" id=\"track\">\n    <div class=\"line\"></div><div class=\"fill\" id=\"fill\"></div>\n  </div>\n</div>\n<button class=\"btn\" id=\"btn\">下一步</button>\n<div class=\"hint\">点「下一步」：进度完成时先超调再回弹，强化真实感</div>\n<script>\n  const state = { steps: 4, dur: .5, overshoot: 1, accent: \"#3d5fd6\", done: \"#2bb673\", bg: \"#fafafa\", ease: \"ease\" };\n  const track = document.getElementById(\"track\");\n  const fill = document.getElementById(\"fill\");\n  const btn = document.getElementById(\"btn\");\n  let cur = 0;\n  function build() {\n    track.querySelectorAll(\".node\").forEach(n => n.remove());\n    for (let i = 0; i < state.steps; i++) {\n      const n = document.createElement(\"div\");\n      n.className = \"node\";\n      n.textContent = i + 1;\n      track.appendChild(n);\n    }\n  }\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--done\", state.done);\n    document.body.style.background = state.bg;\n    track.style.setProperty(\"--dur\", state.dur + \"s\");\n    track.style.setProperty(\"--ease\", state.ease);\n    const nodes = track.querySelectorAll(\".node\");\n    nodes.forEach((n, i) => {\n      n.className = \"node\" + (i < cur ? \" done\" : i === cur ? \" on\" : \"\");\n    });\n    const pct = state.steps > 1 ? (cur / (state.steps - 1)) * 100 : 0;\n    fill.style.width = pct + \"%\";\n  }\n  btn.addEventListener(\"click\", () => {\n    if (cur < state.steps) {\n      cur++;\n      const last = track.querySelectorAll(\".node\")[cur - 1];\n      if (cur === state.steps && last) last.classList.add(\"finish\");\n      apply();\n      if (cur >= state.steps) { btn.textContent = \"重置\"; }\n    } else { cur = 0; btn.textContent = \"下一步\"; apply(); }\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; build(); apply(); });\n  build(); apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v154",
  标题: "卡片堆叠",
  分类: "动效",
  子类: "入场出场",
  风格: [
    "通用"
  ],
  场景: [
    "通用模块区"
  ],
  元素: [
    "动效",
    "视觉"
  ],
  搭配: [

  ],
  标签: [
    "卡片",
    "堆叠",
    "浏览量"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/卡片堆叠.html",
  参数: [
    {
      键: "gap",
      名: "层间距（px）",
      类型: "slider",
      最小: 4,
      最大: 30,
      步长: 1,
      默认: 14
    },
    {
      键: "compress",
      名: "压缩率",
      类型: "slider",
      最小: 0,
      最大: 0.25,
      步长: 0.01,
      默认: 0.12
    },
    {
      键: "radius",
      名: "圆角（px）",
      类型: "slider",
      最小: 0,
      最大: 28,
      步长: 2,
      默认: 16
    },
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "card2",
      名: "次色",
      类型: "color",
      默认: "#7c4dff"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "顶部卡片被后续卡片逐层堆叠压缩，越往后层越扁越小，直观展示浏览量在累积。\n好处：用「物理堆叠」把抽象数字变成看得见的厚度，比单纯数字 +1 更有体量感。\n能怎么改：拖滑杆调「层间距、压缩率、圆角」，换颜色改卡片双色。",
  用法: "点「浏览+1」加一层；详情页调「层间距、压缩率」看堆叠挤压幅度，换「主色/次色」改卡片配色。",
  提示词: "做一个「卡片堆叠展示浏览量」（纯 HTML/CSS/JS）：\n效果：每新增一张卡片叠到顶部，旧卡向下偏移并按 compress 比例缩小，形成越压越扁的堆叠。\n用法示例：每张卡 translateY(back*gap*(1-back*compress)) scale(1-back*compress)，back 为距顶层的层数。\n关键参数：gap 层间距 / compress 压缩率 / radius 圆角 / accent 主色 / card2 次色 / bg 背景色\n集成步骤：1. 复制 assets/demos/卡片堆叠.html 的 layout() 2. 点按钮 n++ 重排 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片堆叠演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 20px; }\n  .stage { position: relative; width: 220px; height: 260px; }\n  .card { position: absolute; left: 0; top: 0; width: 220px; height: 200px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.16); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; font-weight: 700; transition: transform .4s cubic-bezier(.34,1.4,.5,1); transform-origin: center bottom; }\n  .btn { padding: 10px 22px; border: none; border-radius: 10px; background: #3d5fd6; color: #fff; font-size: 14px; cursor: pointer; }\n  .cnt { font-size: 13px; color: #777; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\"></div>\n<div class=\"cnt\" id=\"cnt\">浏览量：0</div>\n<button class=\"btn\" id=\"btn\">浏览 +1</button>\n<div class=\"hint\">后续卡片逐层堆叠压缩顶部卡片，直观展示浏览量累积</div>\n<script>\n  const state = { gap: 14, compress: 0.12, radius: 16, accent: \"#3d5fd6\", card2: \"#7c4dff\", bg: \"#ffffff\" };\n  const stage = document.getElementById(\"stage\");\n  const cnt = document.getElementById(\"cnt\");\n  let n = 0;\n  function apply() {\n    stage.style.background = \"transparent\";\n    cnt.textContent = \"浏览量：\" + n;\n    while (stage.children.length < n) {\n      const c = document.createElement(\"div\");\n      c.className = \"card\";\n      c.textContent = \"内容 #\" + (stage.children.length + 1);\n      stage.appendChild(c);\n      requestAnimationFrame(() => layout());\n    }\n    while (stage.children.length > n) stage.lastChild.remove();\n    layout();\n  }\n  function layout() {\n    const total = stage.children.length;\n    [...stage.children].forEach((c, i) => {\n      const back = total - 1 - i;            // 越靠后(旧)越被压\n      const y = back * state.gap * (1 - back * state.compress);\n      const sc = 1 - back * state.compress;\n      c.style.background = i % 2 ? state.card2 : state.accent;\n      c.style.borderRadius = state.radius + \"px\";\n      c.style.transform = \"translateY(\" + y + \"px) scale(\" + Math.max(sc, .5) + \")\";\n      c.style.zIndex = i;\n    });\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", () => { n = Math.min(n + 1, 8); apply(); });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v155",
  标题: "标签选择",
  分类: "组件",
  子类: "标签选择",
  风格: [
    "轻盈"
  ],
  场景: [
    "通用模块区",
    "后台·数据看板"
  ],
  元素: [
    "动效",
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "标签",
    "选中",
    "挤开"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/标签选择.html",
  参数: [
    {
      键: "count",
      名: "标签数",
      类型: "slider",
      最小: 3,
      最大: 9,
      步长: 1,
      默认: 7
    },
    {
      键: "scale",
      名: "选中放大",
      类型: "slider",
      最小: 1,
      最大: 1.5,
      步长: 0.01,
      默认: 1.25
    },
    {
      键: "gap",
      名: "间距（px）",
      类型: "slider",
      最小: 4,
      最大: 24,
      步长: 1,
      默认: 10
    },
    {
      键: "radius",
      名: "圆角（px）",
      类型: "slider",
      最小: 8,
      最大: 999,
      步长: 1,
      默认: 999
    },
    {
      键: "accent",
      名: "选中色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "sub",
      名: "未选底色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "选中标签放大，其余标签主动挤开腾出空间，形成清晰的「谁被选中」焦点。\n好处：选中态不是孤立变色，而是带动周围一起让位，选择意图一眼可见，减少误读。\n能怎么改：拖滑杆调「标签数、选中放大、间距、圆角」，换颜色改选中/未选配色。",
  用法: "点标签切换选中；详情页调「选中放大、间距」看让位幅度，换「选中色/未选底色」改配色。",
  提示词: "做一个「标签选择：选中放大、其余挤开」（纯 HTML/CSS/JS）：\n效果：点中的标签 scale 放大并加边距，其它标签自动缩小、间距回弹，腾出焦点空间。\n用法示例：选中态 transform:scale(var(--scale)); margin 加大；未选态 scale(1)。\n关键参数：count 标签数 / scale 选中放大 / gap 间距 / radius 圆角 / accent 选中色 / sub 未选底色\n集成步骤：1. 复制 assets/demos/标签选择.html 的 apply() 2. 点选切 .on 并调 transform/margin 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>标签选择演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .row { width: min(560px, 94vw); display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center; }\n  .tag { padding: 10px 18px; border-radius: 999px; background: var(--sub); color: #555; font-size: 14px; cursor: pointer; user-select: none; border: 1px solid #e0e0e4; transition: transform .35s cubic-bezier(.34,1.5,.5,1), margin .35s cubic-bezier(.34,1.5,.5,1), background .25s, color .25s, box-shadow .25s; }\n  .tag.on { background: var(--accent); color: #fff; border-color: var(--accent); box-shadow: 0 6px 18px rgba(61,95,214,.35); }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"row\" id=\"row\"></div>\n<div class=\"hint\">点标签：选中放大，其余标签主动挤开腾出空间</div>\n<script>\n  const state = { count: 7, scale: 1.25, gap: 10, radius: 999, accent: \"#3d5fd6\", sub: \"#ffffff\" };\n  const row = document.getElementById(\"row\");\n  const labels = [\"全部\", \"前端\", \"动效\", \"AI\", \"设计\", \"后端\", \"数据\", \"产品\", \"运营\"];\n  let sel = 0;\n  function build() {\n    row.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const t = document.createElement(\"div\");\n      t.className = \"tag\" + (i === sel ? \" on\" : \"\");\n      t.textContent = labels[i % labels.length];\n      t.addEventListener(\"click\", () => { sel = i; apply(); });\n      row.appendChild(t);\n    }\n  }\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--sub\", state.sub);\n    [...row.children].forEach((t, i) => {\n      t.style.borderRadius = state.radius + \"px\";\n      if (i === sel) {\n        t.classList.add(\"on\");\n        t.style.transform = \"scale(\" + state.scale + \")\";\n        t.style.margin = \"0 \" + (state.gap + 6) + \"px\";\n      } else {\n        t.classList.remove(\"on\");\n        t.style.transform = \"scale(1)\";\n        t.style.margin = \"0 \" + (state.gap / 2) + \"px\";\n      }\n    });\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; build(); apply(); });\n  build(); apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v156",
  标题: "跟随式按钮",
  分类: "组件",
  子类: "按钮",
  风格: [
    "通用"
  ],
  场景: [
    "移动端",
    "通用模块区"
  ],
  元素: [
    "动效",
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "按钮",
    "跟随",
    "按压"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/跟随式按钮.html",
  参数: [
    {
      键: "follow",
      名: "跟随强度",
      类型: "slider",
      最小: 0.1,
      最大: 1,
      步长: 0.05,
      默认: 0.5
    },
    {
      键: "depth",
      名: "按压深度",
      类型: "slider",
      最小: 0,
      最大: 30,
      步长: 1,
      默认: 14
    },
    {
      键: "radius",
      名: "圆角（px）",
      类型: "slider",
      最小: 0,
      最大: 28,
      步长: 2,
      默认: 14
    },
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "text",
      名: "文字色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "按住按钮后它随手指移动并渐变深浅，移开自动复位，无需弹窗取消，避免误触。\n好处：按钮像被「捏住」跟着走，松手即回，操作可逆且无需额外确认层，移动端尤其顺手。\n能怎么改：拖滑杆调「跟随强度、按压深度、圆角」，换颜色改按钮与文字色。",
  用法: "按住拖动看跟随；详情页调「跟随强度、按压深度」看手感，换「主色/文字色」改配色。",
  提示词: "做一个「跟随式按钮」（纯 HTML/CSS/JS）：\n效果：pointerdown 后按钮按 follow 比例跟随指针位移并加深，pointerup 用回弹缓动复位，不弹取消层。\n用法示例：pointermove 设 transform:translate(dx*follow,dy*follow) 与 brightness；pointerup 归零。\n关键参数：follow 跟随强度 / depth 按压深度 / radius 圆角 / accent 主色 / text 文字色\n集成步骤：1. 复制 assets/demos/跟随式按钮.html 的 pointer 逻辑 2. 调 follow/depth 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>跟随式按钮演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .zone { position: relative; width: min(420px, 92vw); height: 240px; border: 2px dashed #ddd; border-radius: 18px; display: flex; align-items: center; justify-content: center; }\n  .btn { padding: 16px 30px; border: none; border-radius: 14px; background: var(--accent); color: #fff; font-size: 15px; cursor: pointer; user-select: none; touch-action: none; transition: transform .12s ease, box-shadow .12s ease; will-change: transform; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"zone\" id=\"zone\">\n  <button class=\"btn\" id=\"btn\">按住拖动我</button>\n</div>\n<div class=\"hint\">按住拖动：按钮随手指移动并渐变深浅，移开自动复位（无需弹窗取消）</div>\n<script>\n  const state = { follow: 0.5, depth: 14, radius: 14, accent: \"#3d5fd6\", text: \"#ffffff\" };\n  const btn = document.getElementById(\"btn\");\n  let down = false, cx = 0, cy = 0, ox = 0, oy = 0;\n  function apply() {\n    btn.style.background = state.accent;\n    btn.style.color = state.text;\n    btn.style.borderRadius = state.radius + \"px\";\n  }\n  btn.addEventListener(\"pointerdown\", e => {\n    down = true; btn.setPointerCapture(e.pointerId);\n    const r = btn.getBoundingClientRect();\n    ox = e.clientX - (r.left + r.width / 2);\n    oy = e.clientY - (r.top + r.height / 2);\n  });\n  window.addEventListener(\"pointermove\", e => {\n    if (!down) return;\n    cx = (e.clientX - ox - btn.parentElement.getBoundingClientRect().left - btn.parentElement.clientWidth / 2 + btn.offsetWidth / 2);\n    cy = (e.clientY - oy - btn.parentElement.getBoundingClientRect().top - btn.parentElement.clientHeight / 2 + btn.offsetHeight / 2);\n    btn.style.transform = \"translate(\" + (cx * state.follow) + \"px,\" + (cy * state.follow) + \"px)\";\n    btn.style.boxShadow = \"0 \" + (state.depth * (1 - state.follow * .3)) + \"px \" + (state.depth * 2) + \"px rgba(0,0,0,.18)\";\n    btn.style.filter = \"brightness(\" + (1.15 - state.follow * .15) + \")\";\n  });\n  window.addEventListener(\"pointerup\", () => {\n    if (!down) return; down = false;\n    btn.style.transition = \"transform .35s cubic-bezier(.34,1.5,.5,1), box-shadow .35s, filter .35s\";\n    btn.style.transform = \"translate(0,0)\";\n    btn.style.boxShadow = \"none\";\n    btn.style.filter = \"none\";\n    setTimeout(() => btn.style.transition = \"transform .12s ease, box-shadow .12s ease\", 360);\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v157",
  标题: "动作优先级判定",
  分类: "动效",
  子类: "手势",
  风格: [
    "通用"
  ],
  场景: [
    "移动端"
  ],
  元素: [
    "动效",
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "手势",
    "冲突",
    "方向"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/动作优先级判定.html",
  参数: [
    {
      键: "threshold",
      名: "触发阈值（px）",
      类型: "slider",
      最小: 8,
      最大: 60,
      步长: 2,
      默认: 24
    },
    {
      键: "hColor",
      名: "横滑色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "vColor",
      名: "竖拉色",
      类型: "color",
      默认: "#e0533d"
    },
    {
      键: "card",
      名: "卡片色",
      类型: "color",
      默认: "#ffffff"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    }
  ],
  效果说明: "横滑翻页与竖拉关闭冲突时，以「初始滑动方向」判定执行哪一个动作，并实时高亮将被执行的动作。\n好处：手势意图在滑动一开始就锁定，不会滑到一半变了卦，冲突场景不再误触发。\n能怎么改：拖滑杆调「触发阈值」，换颜色改横滑/竖拉/卡片三色。",
  用法: "在卡片上斜着滑；详情页调「触发阈值」看判定灵敏度，换「横滑色/竖拉色/卡片色」改配色。",
  提示词: "做一个「手势冲突按初始方向判定」（纯 HTML/CSS/JS）：\n效果：pointerdown 记录起点，pointermove 一旦位移超过 6px 就按 |dx|>|dy| 锁定为横滑或竖拉，并高亮对应动作，超过阈值才真正执行。\n关键参数：threshold 触发阈值 / hColor 横滑色 / vColor 竖拉色 / card 卡片色 / bg 背景色\n集成步骤：1. 复制 assets/demos/动作优先级判定.html 的 axis 判定 2. 调阈值与配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>动作优先级判定演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 16px; }\n  .card { width: min(360px, 90vw); height: 220px; border-radius: 18px; background: var(--card); box-shadow: 0 10px 34px rgba(0,0,0,.12); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; touch-action: none; cursor: grab; transition: transform .2s; user-select: none; }\n  .card .big { font-size: 18px; font-weight: 700; color: #1a1a1a; }\n  .badge { padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; transition: background .2s; }\n  .legend { display: flex; gap: 20px; font-size: 13px; color: #666; }\n  .legend b { color: #1a1a1a; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\">\n  <div class=\"big\">在卡片上滑动</div>\n  <div class=\"badge\" id=\"badge\">初始方向判定执行动作</div>\n</div>\n<div class=\"legend\">横滑=翻页（<b id=\"h\">—</b>）　竖拉=关闭（<b id=\"v\">—</b>）</div>\n<div class=\"hint\">横滑与竖拉冲突时，以「初始滑动方向」判定执行哪一个动作</div>\n<script>\n  const state = { threshold: 24, hColor: \"#3d5fd6\", vColor: \"#e0533d\", card: \"#ffffff\", bg: \"#fafafa\" };\n  const card = document.getElementById(\"card\");\n  const badge = document.getElementById(\"badge\");\n  const h = document.getElementById(\"h\"), v = document.getElementById(\"v\");\n  let sx = 0, sy = 0, axis = null, moved = 0;\n  function apply() {\n    card.style.background = state.card;\n    document.body.style.background = state.bg;\n    h.style.color = state.hColor; v.style.color = state.vColor;\n    badge.style.background = \"#eee\"; badge.style.color = \"#444\";\n    badge.textContent = \"初始方向判定执行动作\";\n  }\n  card.addEventListener(\"pointerdown\", e => { sx = e.clientX; sy = e.clientY; axis = null; moved = 0; card.setPointerCapture(e.pointerId); });\n  card.addEventListener(\"pointermove\", e => {\n    const dx = e.clientX - sx, dy = e.clientY - sy;\n    moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));\n    if (!axis && Math.abs(dx) + Math.abs(dy) > 6) axis = Math.abs(dx) > Math.abs(dy) ? \"h\" : \"v\";\n    if (axis === \"h\") { card.style.transform = \"translateX(\" + dx + \"px)\"; badge.style.background = state.hColor; badge.style.color = \"#fff\"; badge.textContent = \"已判定：横滑翻页\"; }\n    else if (axis === \"v\") { card.style.transform = \"translateY(\" + dy + \"px)\"; badge.style.background = state.vColor; badge.style.color = \"#fff\"; badge.textContent = \"已判定：竖拉关闭\"; }\n  });\n  card.addEventListener(\"pointerup\", e => {\n    const dx = e.clientX - sx, dy = e.clientY - sy;\n    if (axis === \"h\" && Math.abs(dx) > state.threshold) flash(\"执行：翻到下一页\");\n    else if (axis === \"v\" && Math.abs(dy) > state.threshold) flash(\"执行：关闭卡片\");\n    else flash(\"位移不足，未触发动作\");\n    card.style.transform = \"translate(0,0)\";\n  });\n  function flash(t) { badge.textContent = t; badge.style.background = \"#1a1a1a\"; badge.style.color = \"#fff\"; }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v158",
  标题: "可拦截卡片",
  分类: "动效",
  子类: "入场出场",
  风格: [
    "通用"
  ],
  场景: [
    "移动端",
    "通用模块区"
  ],
  元素: [
    "动效"
  ],
  搭配: [

  ],
  标签: [
    "卡片",
    "拦截",
    "动画中"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/可拦截卡片.html",
  参数: [
    {
      键: "dur",
      名: "飞出时长（ms）",
      类型: "slider",
      最小: 300,
      最大: 1600,
      步长: 50,
      默认: 900
    },
    {
      键: "dist",
      名: "飞出距离（px）",
      类型: "slider",
      最小: 200,
      最大: 480,
      步长: 10,
      默认: 360
    },
    {
      键: "rot",
      名: "旋转（deg）",
      类型: "slider",
      最小: 0,
      最大: 45,
      步长: 1,
      默认: 22
    },
    {
      键: "card",
      名: "卡片色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    },
    {
      键: "threshold",
      名: "拦截阈值（px）",
      类型: "slider",
      最小: 100,
      最大: 360,
      步长: 10,
      默认: 200
    }
  ],
  效果说明: "卡片飞出去的动画播放中，可用手指按住它「拦截」停住，而非等动画播完才响应操作。\n好处：用户随时能夺回控制权（暂停/拖回），动画不再「霸占」交互，误飞可救。\n能怎么改：拖滑杆调「飞出时长、飞出距离、旋转、拦截阈值」，换颜色改卡片/背景。",
  用法: "点「让卡片飞出」后用手指按住飞行中的卡片拦截；详情页调「飞出时长/距离/旋转」看飞行，换「卡片色/背景色」改配色。",
  提示词: "做一个「可拦截的飞出卡片」（纯 HTML/CSS/JS）：\n效果：卡片用 rAF 飞出（位移到屏外+旋转+淡出），飞行中 pointerdown 即 cancelAnimationFrame 暂停，可拖动，松手若已过阈值继续飞、否则弹回。\n关键参数：dur 飞出时长 / dist 飞出距离 / rot 旋转 / card 卡片色 / bg 背景色 / threshold 拦截阈值\n集成步骤：1. 复制 assets/demos/可拦截卡片.html 的 flyOut+pointer 拦截 2. 调参数与配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>可拦截卡片演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 18px; }\n  .stage { position: relative; width: 300px; height: 200px; }\n  .card { position: absolute; inset: 0; border-radius: 18px; background: var(--card); box-shadow: 0 10px 30px rgba(0,0,0,.16); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; font-weight: 700; cursor: grab; touch-action: none; user-select: none; will-change: transform, opacity; }\n  .btn { padding: 10px 22px; border: none; border-radius: 10px; background: #3d5fd6; color: #fff; font-size: 14px; cursor: pointer; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"card\" id=\"card\">飞出去的卡片</div>\n</div>\n<button class=\"btn\" id=\"fly\">让卡片飞出</button>\n<div class=\"hint\">卡片飞出过程中，可用手指按住它「拦截」停住，而非等动画播完才响应</div>\n<script>\n  const state = { dur: 900, dist: 360, rot: 22, card: \"#3d5fd6\", bg: \"#fafafa\", threshold: 200 };\n  const stage = document.getElementById(\"stage\");\n  const card = document.getElementById(\"card\");\n  let raf = null, flying = false, dragging = false, px = 0, py = 0, sx = 0, sy = 0, t0 = 0;\n\n  function apply() {\n    card.style.background = state.card;\n    document.body.style.background = state.bg;\n  }\n  function flyOut() {\n    flying = true; t0 = performance.now();\n    const fromX = 0, fromR = 0;\n    (function step(now) {\n      if (!flying) return;\n      const p = Math.min((now - t0) / state.dur, 1);\n      const e = 1 - Math.pow(1 - p, 3);\n      const x = fromX + state.dist * e;\n      const r = fromR + state.rot * e;\n      card.style.transform = \"translate(\" + x + \"px,\" + (40 * e) + \"px) rotate(\" + r + \"deg)\";\n      card.style.opacity = 1 - p;\n      if (p < 1) raf = requestAnimationFrame(step);\n      else { flying = false; card.style.opacity = 0; }\n    })(t0);\n  }\n  card.addEventListener(\"pointerdown\", e => {\n    if (raf) cancelAnimationFrame(raf);\n    flying = false; dragging = true;\n    card.setPointerCapture(e.pointerId);\n    sx = e.clientX; sy = e.clientY;\n    const m = new DOMMatrixReadOnly(getComputedStyle(card).transform);\n    px = m.m41; py = m.m42;\n    card.style.cursor = \"grabbing\";\n    card.style.opacity = 1;\n  });\n  card.addEventListener(\"pointermove\", e => {\n    if (!dragging) return;\n    card.style.transform = \"translate(\" + (px + e.clientX - sx) + \"px,\" + (py + e.clientY - sy) + \"px)\";\n  });\n  card.addEventListener(\"pointerup\", e => {\n    if (!dragging) return; dragging = false; card.style.cursor = \"grab\";\n    const m = new DOMMatrixReadOnly(getComputedStyle(card).transform);\n    if (m.m41 > state.threshold) flyOut();\n    else { // 弹回原位\n      card.style.transition = \"transform .4s cubic-bezier(.34,1.5,.5,1)\";\n      card.style.transform = \"translate(0,0) rotate(0deg)\";\n      setTimeout(() => card.style.transition = \"\", 420);\n    }\n  });\n  document.getElementById(\"fly\").addEventListener(\"click\", () => { card.style.opacity = 1; card.style.transition = \"\"; card.style.transform = \"translate(0,0)\"; flyOut(); });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v159",
  标题: "预判轮播落点",
  分类: "组件",
  子类: "轮播",
  风格: [
    "通用"
  ],
  场景: [
    "移动端",
    "电商·预订"
  ],
  元素: [
    "动效",
    "视觉"
  ],
  搭配: [

  ],
  标签: [
    "轮播",
    "预判",
    "落点"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/预判轮播落点.html",
  参数: [
    {
      键: "count",
      名: "屏数",
      类型: "slider",
      最小: 3,
      最大: 7,
      步长: 1,
      默认: 5
    },
    {
      键: "gap",
      名: "间距（px）",
      类型: "slider",
      最小: 0,
      最大: 40,
      步长: 2,
      默认: 0
    },
    {
      键: "accent",
      名: "当前色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "predict",
      名: "预判色",
      类型: "color",
      默认: "#e0533d"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    }
  ],
  效果说明: "横滑卡片时提前标注「将停留的位置」（高亮预测圆点），无需松手后再调整。\n好处：落点在拖动过程中就可见，用户对最终停靠心中有数，减少松手后的二次微调。\n能怎么改：拖滑杆调「屏数、间距」，换颜色改当前/预判两态指示色。",
  用法: "横滑看圆点实时预判；详情页调「屏数、间距」看轮播密度，换「当前色/预判色」改指示色。",
  提示词: "做一个「预判轮播落点」（纯 HTML/CSS/JS）：\n效果：拖动 track 时按位移 round(dx/step) 实时算出目标索引，高亮对应圆点（predict 态），松手 snap 到该索引。\n关键参数：count 屏数 / gap 间距 / accent 当前色 / predict 预判色 / bg 背景色\n集成步骤：1. 复制 assets/demos/预判轮播落点.html 的 pointermove 预判 2. 调参数与配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>预判轮播落点演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 18px; }\n  .viewport { width: min(320px, 90vw); overflow: hidden; border-radius: 16px; }\n  .track { display: flex; touch-action: pan-y; cursor: grab; }\n  .slide { flex: 0 0 100%; height: 180px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; font-weight: 700; }\n  .dots { display: flex; gap: 8px; }\n  .dot { width: 10px; height: 10px; border-radius: 50%; background: #ccc; transition: transform .2s, background .2s; }\n  .dot.on { background: var(--accent); transform: scale(1.5); }\n  .dot.predict { background: var(--predict); box-shadow: 0 0 0 3px rgba(224,83,61,.25); }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"viewport\" id=\"vp\">\n  <div class=\"track\" id=\"track\"></div>\n</div>\n<div class=\"dots\" id=\"dots\"></div>\n<div class=\"hint\">横滑时提前标注「将停留的位置」，松手前就能看到落点，无需松手后再调整</div>\n<script>\n  const state = { count: 5, gap: 0, accent: \"#3d5fd6\", predict: \"#e0533d\", bg: \"#fafafa\" };\n  const vp = document.getElementById(\"vp\");\n  const track = document.getElementById(\"track\");\n  const dots = document.getElementById(\"dots\");\n  const palette = [\"#3d5fd6\", \"#7c4dff\", \"#2bb673\", \"#e0993d\", \"#e0533d\", \"#1aa0a0\"];\n  let idx = 0, dragX = 0, startX = 0, dragging = false;\n  function build() {\n    track.innerHTML = \"\";\n    dots.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const s = document.createElement(\"div\");\n      s.className = \"slide\"; s.style.background = palette[i % palette.length];\n      s.textContent = \"第 \" + (i + 1) + \" 屏\";\n      track.appendChild(s);\n      const d = document.createElement(\"div\"); d.className = \"dot\"; dots.appendChild(d);\n    }\n    setX(0, false);\n  }\n  function setX(delta, anim) {\n    track.style.transition = anim ? \"transform .4s cubic-bezier(.34,1.4,.5,1)\" : \"none\";\n    const step = vp.clientWidth + state.gap;\n    track.style.transform = \"translateX(\" + (-idx * step + delta) + \"px)\";\n  }\n  function paint() {\n    const dotsEls = [...dots.children];\n    dotsEls.forEach((d, i) => d.className = \"dot\" + (i === idx ? \" on\" : \"\"));\n  }\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--predict\", state.predict);\n    document.body.style.background = state.bg;\n    build();\n  }\n  vp.addEventListener(\"pointerdown\", e => { dragging = true; startX = e.clientX; vp.setPointerCapture(e.pointerId); });\n  vp.addEventListener(\"pointermove\", e => {\n    if (!dragging) return;\n    const dx = e.clientX - startX;\n    setX(dx, false);\n    const step = vp.clientWidth + state.gap;\n    const predicted = Math.max(0, Math.min(state.count - 1, idx - Math.round(dx / step)));\n    [...dots.children].forEach((d, i) => d.className = \"dot\" + (i === predicted ? \" predict\" : (i === idx ? \" on\" : \"\")));\n  });\n  vp.addEventListener(\"pointerup\", e => {\n    if (!dragging) return; dragging = false;\n    const dx = e.clientX - startX;\n    const step = vp.clientWidth + state.gap;\n    idx = Math.max(0, Math.min(state.count - 1, idx - Math.round(dx / step)));\n    setX(0, true); paint();\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v160",
  标题: "边界弹性反馈",
  分类: "动效",
  子类: "手势",
  风格: [
    "通用"
  ],
  场景: [
    "移动端"
  ],
  元素: [
    "动效",
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "越界",
    "弹性",
    "回弹"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/边界弹性反馈.html",
  参数: [
    {
      键: "resistance",
      名: "阻力强度",
      类型: "slider",
      最小: 0.1,
      最大: 0.6,
      步长: 0.01,
      默认: 0.25
    },
    {
      键: "over",
      名: "可越界量（px）",
      类型: "slider",
      最小: 30,
      最大: 160,
      步长: 5,
      默认: 80
    },
    {
      键: "bounce",
      名: "回弹时长（秒）",
      类型: "slider",
      最小: 0.2,
      最大: 1,
      步长: 0.05,
      默认: 0.5
    },
    {
      键: "accent",
      名: "弹性色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    }
  ],
  效果说明: "列表拉到顶端后可小幅继续拖动，但阻力递增，松手自动回弹，给出「到头了」的弹性反馈。\n好处：越界拖动的阻尼+回弹是物理直觉，比硬性卡死更顺、更知道边界在哪。\n能怎么改：拖滑杆调「阻力强度、可越界量、回弹时长」，换颜色改弹性提示色。",
  用法: "在框内向下拉到顶继续拖；详情页调「阻力强度、可越界量、回弹时长」看手感，换「弹性色」改提示色。",
  提示词: "做一个「边界弹性反馈」（纯 HTML/CSS/JS）：\n效果：向下越界拖动时位移按 resistance 递减（阻力递增），松手用回弹缓动归零，顶部露出 accent 色橡皮筋。\n关键参数：resistance 阻力强度 / over 可越界量 / bounce 回弹时长 / accent 弹性色 / bg 背景色\n集成步骤：1. 复制 assets/demos/边界弹性反馈.html 的 pointermove 阻尼 2. 调参数与配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>边界弹性反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 14px; }\n  .box { position: relative; width: min(340px, 92vw); height: 240px; border-radius: 16px; background: #fff; box-shadow: 0 10px 34px rgba(0,0,0,.1); overflow: hidden; touch-action: none; }\n  .rubber { position: absolute; top: 0; left: 0; right: 0; height: 0; background: var(--accent); opacity: .5; transition: height .15s; }\n  .inner { position: absolute; left: 0; right: 0; top: 0; padding: 18px; display: flex; flex-direction: column; gap: 10px; will-change: transform; }\n  .ln { height: 12px; border-radius: 6px; background: #e6e6ea; }\n  .ln.s { width: 70%; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"box\" id=\"box\">\n  <div class=\"rubber\" id=\"rubber\"></div>\n  <div class=\"inner\" id=\"inner\">\n    <div class=\"ln\"></div><div class=\"ln s\"></div><div class=\"ln\"></div><div class=\"ln s\"></div>\n    <div class=\"ln\"></div><div class=\"ln s\"></div><div class=\"ln\"></div><div class=\"ln s\"></div>\n  </div>\n</div>\n<div class=\"hint\">列表拉到顶端后可小幅继续拖动，但阻力递增，松手自动回弹</div>\n<script>\n  const state = { resistance: 0.25, over: 80, bounce: .5, accent: \"#3d5fd6\", bg: \"#fafafa\" };\n  const box = document.getElementById(\"box\");\n  const inner = document.getElementById(\"inner\");\n  const rubber = document.getElementById(\"rubber\");\n  let sy = 0, ty = 0, dragging = false;\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.body.style.background = state.bg;\n  }\n  box.addEventListener(\"pointerdown\", e => { dragging = true; sy = e.clientY; ty = 0; box.setPointerCapture(e.pointerId); inner.style.transition = \"none\"; rubber.style.transition = \"none\"; });\n  box.addEventListener(\"pointermove\", e => {\n    if (!dragging) return;\n    let d = e.clientY - sy;\n    if (d < 0) d = 0;                         // 只允许向下越界\n    if (d > 0) d = Math.min(d, state.over) * (state.resistance + (1 - state.resistance) * (1 - Math.min(d, state.over) / state.over));\n    ty = d;\n    inner.style.transform = \"translateY(\" + d + \"px)\";\n    rubber.style.height = d + \"px\";\n  });\n  box.addEventListener(\"pointerup\", () => {\n    if (!dragging) return; dragging = false;\n    inner.style.transition = \"transform \" + state.bounce + \"s cubic-bezier(.34,1.56,.64,1)\";\n    rubber.style.transition = \"height \" + state.bounce + \"s ease\";\n    inner.style.transform = \"translateY(0)\";\n    rubber.style.height = \"0px\";\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v161",
  标题: "流场运动",
  分类: "背景",
  子类: "粒子",
  风格: [
    "科技"
  ],
  场景: [
    "落地页·发布页",
    "官网·品牌站"
  ],
  元素: [
    "3D·粒子",
    "视觉"
  ],
  搭配: [

  ],
  标签: [
    "粒子",
    "流场",
    "曲线"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/流场运动.html",
  参数: [
    {
      键: "count",
      名: "粒子数",
      类型: "slider",
      最小: 60,
      最大: 500,
      步长: 10,
      默认: 240
    },
    {
      键: "speed",
      名: "速度",
      类型: "slider",
      最小: 0.3,
      最大: 4,
      步长: 0.1,
      默认: 1.4
    },
    {
      键: "field",
      名: "场强",
      类型: "slider",
      最小: 0.001,
      最大: 0.01,
      步长: 0.001,
      默认: 0.004
    },
    {
      键: "trail",
      名: "拖尾",
      类型: "slider",
      最小: 0.02,
      最大: 0.2,
      步长: 0.01,
      默认: 0.06
    },
    {
      键: "size",
      名: "粒子大小",
      类型: "slider",
      最小: 0.8,
      最大: 4,
      步长: 0.1,
      默认: 1.6
    },
    {
      键: "color",
      名: "粒子色",
      类型: "color",
      默认: "#5ad1ff"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#0e1116"
    }
  ],
  效果说明: "粒子沿连续弯曲的流场路线前进，相邻轨迹自然衔接，避免各自乱飞。\n好处：用统一场（角度=位置的正弦组合+时间）让所有粒子朝同一「风向」流动，整体是流动的纹理而非噪点。\n能怎么改：拖滑杆调「粒子数、速度、场强、拖尾、粒子大小」，换颜色改粒子/背景。",
  用法: "直接看流动；详情页调「场强、速度、拖尾」改流线形态，换「粒子色/背景色」改配色。",
  提示词: "用 canvas 做一个「流场运动」粒子背景（纯 JS）：\n效果：每个粒子按 angle(x,y,t)=cos(x*field+t)+sin(y*field*1.3-t) 的方向移动，出界重置，半透明叠底形成拖尾流线。\n关键参数：count 粒子数 / speed 速度 / field 场强 / trail 拖尾 / size 粒子大小 / color 粒子色 / bg 背景色\n集成步骤：1. 复制 assets/demos/流场运动.html 的 frame() 2. 调场强与拖尾 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>流场运动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0e1116; }\n  canvas { display: block; width: min(560px, 94vw); height: min(420px, 80vh); border-radius: 16px; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #aaa; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<div class=\"hint\">粒子沿连续弯曲的流场路线前进，相邻轨迹自然衔接，避免各自乱飞</div>\n<script>\n  const state = { count: 240, speed: 1.4, field: 0.004, trail: 0.06, size: 1.6, color: \"#5ad1ff\", bg: \"#0e1116\" };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, ps = [];\n  function resize() { W = canvas.width = canvas.clientWidth * devicePixelRatio; H = canvas.height = canvas.clientHeight * devicePixelRatio; }\n  function angle(x, y, t) { return (Math.cos(x * state.field + t) + Math.sin(y * state.field * 1.3 - t)) * Math.PI; }\n  function build() {\n    ps = [];\n    for (let i = 0; i < state.count; i++) ps.push({ x: Math.random() * W, y: Math.random() * H });\n  }\n  function apply() { resize(); build(); document.body.style.background = state.bg; }\n  let t = 0;\n  function frame() {\n    t += 0.005;\n    ctx.fillStyle = state.bg; ctx.globalAlpha = state.trail; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;\n    ctx.fillStyle = state.color;\n    for (const p of ps) {\n      const a = angle(p.x, p.y, t);\n      p.x += Math.cos(a) * state.speed * devicePixelRatio;\n      p.y += Math.sin(a) * state.speed * devicePixelRatio;\n      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) { p.x = Math.random() * W; p.y = Math.random() * H; }\n      ctx.beginPath(); ctx.arc(p.x, p.y, state.size * devicePixelRatio, 0, 7); ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); frame();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v162",
  标题: "涡旋卷入",
  分类: "背景",
  子类: "粒子",
  风格: [
    "科技"
  ],
  场景: [
    "落地页·发布页"
  ],
  元素: [
    "3D·粒子",
    "视觉"
  ],
  搭配: [

  ],
  标签: [
    "粒子",
    "涡旋",
    "螺旋"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/涡旋卷入.html",
  参数: [
    {
      键: "count",
      名: "粒子数",
      类型: "slider",
      最小: 80,
      最大: 500,
      步长: 10,
      默认: 320
    },
    {
      键: "spin",
      名: "旋速",
      类型: "slider",
      最小: 0.01,
      最大: 0.15,
      步长: 0.01,
      默认: 0.05
    },
    {
      键: "pull",
      名: "吸入速度",
      类型: "slider",
      最小: 0.2,
      最大: 1.5,
      步长: 0.05,
      默认: 0.6
    },
    {
      键: "core",
      名: "中心大小",
      类型: "slider",
      最小: 4,
      最大: 20,
      步长: 1,
      默认: 8
    },
    {
      键: "size",
      名: "粒子大小",
      类型: "slider",
      最小: 1,
      最大: 5,
      步长: 0.1,
      默认: 2.4
    },
    {
      键: "color",
      名: "粒子色",
      类型: "color",
      默认: "#ffb24d"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#0e1116"
    }
  ],
  效果说明: "粒子沿螺旋路径卷向中心，而非直飞中心；越靠近中心活动范围越小、越慢。\n好处：螺旋+近心减速制造「被吸入」的纵深感，比直接聚拢更有漩涡张力。\n能怎么改：拖滑杆调「粒子数、旋速、吸入速度、中心大小、粒子大小」，换颜色改粒子/背景。",
  用法: "直接看卷入；详情页调「旋速、吸入速度」看漩涡快慢，换「粒子色/背景色」改配色。",
  提示词: "用 canvas 做一个「涡旋卷入」粒子背景（纯 JS）：\n效果：每颗粒子持角度 a 与半径 r，a+=spin 旋转、r-=pull*(1-r/R) 螺旋内收（近心更慢），到中心则重生到外圈。\n关键参数：count 粒子数 / spin 旋速 / pull 吸入速度 / core 中心大小 / size 粒子大小 / color 粒子色 / bg 背景色\n集成步骤：1. 复制 assets/demos/涡旋卷入.html 的 frame() 2. 调旋速与吸入 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>涡旋卷入演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0e1116; }\n  canvas { display: block; width: min(520px, 94vw); height: min(520px, 88vh); border-radius: 16px; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #aaa; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<div class=\"hint\">粒子沿螺旋路径卷向中心，而非直飞中心；越靠近中心活动范围越小</div>\n<script>\n  const state = { count: 320, spin: 0.05, pull: 0.6, core: 8, size: 2.4, color: \"#ffb24d\", bg: \"#0e1116\" };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, ps = [];\n  function resize() { W = canvas.width = canvas.clientWidth * devicePixelRatio; H = canvas.height = canvas.clientHeight * devicePixelRatio; }\n  function build() {\n    ps = [];\n    for (let i = 0; i < state.count; i++) {\n      const ang = Math.random() * 7, r = (40 + Math.random() * Math.min(W, H) * 0.45) * devicePixelRatio;\n      ps.push({ a: ang, r: r });\n    }\n  }\n  function apply() { resize(); build(); document.body.style.background = state.bg; }\n  function frame() {\n    ctx.fillStyle = state.bg; ctx.fillRect(0, 0, W, H);\n    const cx = W / 2, cy = H / 2;\n    ctx.fillStyle = state.color;\n    for (const p of ps) {\n      p.a += state.spin;                       // 沿螺旋旋转\n      p.r -= state.pull * devicePixelRatio * (1 - p.r / (Math.min(W, H) * 0.45 * devicePixelRatio)); // 越近越慢\n      if (p.r < state.core * devicePixelRatio) { p.r = (40 + Math.random() * Math.min(W, H) * 0.45) * devicePixelRatio; p.a = Math.random() * 7; }\n      const x = cx + Math.cos(p.a) * p.r;\n      const y = cy + Math.sin(p.a) * p.r;\n      const size = Math.max(0.6, (p.r / (Math.min(W, H) * 0.45)) * state.size) * devicePixelRatio;\n      ctx.beginPath(); ctx.arc(x, y, size, 0, 7); ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); frame();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v163",
  标题: "表面粒子化消散",
  分类: "背景",
  子类: "粒子",
  风格: [
    "科技"
  ],
  场景: [
    "落地页·发布页",
    "作品集·叙事"
  ],
  元素: [
    "3D·粒子",
    "视觉"
  ],
  搭配: [

  ],
  标签: [
    "粒子",
    "消散",
    "球体"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/表面粒子化消散.html",
  参数: [
    {
      键: "density",
      名: "采样间隔",
      类型: "slider",
      最小: 3,
      最大: 10,
      步长: 1,
      默认: 5
    },
    {
      键: "speed",
      名: "消散速度",
      类型: "slider",
      最小: 0.2,
      最大: 1.5,
      步长: 0.1,
      默认: 0.6
    },
    {
      键: "drift",
      名: "漂移强度",
      类型: "slider",
      最小: 0.4,
      最大: 2.5,
      步长: 0.1,
      默认: 1.2
    },
    {
      键: "size",
      名: "粒子大小",
      类型: "slider",
      最小: 0.8,
      最大: 3,
      步长: 0.1,
      默认: 1.4
    },
    {
      键: "color",
      名: "粒子色",
      类型: "color",
      默认: "#9b8cff"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#0e1116"
    }
  ],
  效果说明: "球体自左向右逐步化成粒子飘走，保留未消散部分，禁止整球弹出。\n好处：用一条「消散前线」从左到右推进，已化部分飘散、未化部分仍是实心球，过渡可解读。\n能怎么改：拖滑杆调「采样间隔、消散速度、漂移强度、粒子大小」，换颜色改球体/背景。",
  用法: "点「重新消散」重播；详情页调「消散速度、漂移强度」看飘散，换「粒子色/背景色」改配色。",
  提示词: "用 canvas 做一个「表面粒子化消散」效果（纯 JS）：\n效果：在圆内按 density 采样出粒子，一条 front 线从左到右推进，bx<=front 的粒子变 free 并按随机角+重力飘走，其余保持原位。\n关键参数：density 采样间隔 / speed 消散速度 / drift 漂移强度 / size 粒子大小 / color 粒子色 / bg 背景色\n集成步骤：1. 复制 assets/demos/表面粒子化消散.html 的 build+frame 2. 调消散速度与漂移 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>表面粒子化消散演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #0e1116; gap: 12px; }\n  canvas { display: block; width: min(460px, 92vw); height: min(360px, 70vh); border-radius: 16px; }\n  .btn { padding: 9px 20px; border: none; border-radius: 10px; background: #5ad1ff; color: #062; font-size: 14px; cursor: pointer; font-weight: 700; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #aaa; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<button class=\"btn\" id=\"btn\">重新消散</button>\n<div class=\"hint\">球体自左向右逐步化成粒子飘走，保留未消散部分，禁止整球弹出</div>\n<script>\n  const state = { density: 5, speed: 0.6, drift: 1.2, size: 1.4, color: \"#9b8cff\", bg: \"#0e1116\" };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, ps = [], front = 0, t = 0;\n  function resize() { W = canvas.width = canvas.clientWidth * devicePixelRatio; H = canvas.height = canvas.clientHeight * devicePixelRatio; }\n  function build() {\n    ps = [];\n    const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.32;\n    for (let y = -R; y <= R; y += state.density * devicePixelRatio) {\n      const w = Math.sqrt(R * R - y * y);\n      for (let x = -w; x <= w; x += state.density * devicePixelRatio) {\n        ps.push({ bx: cx + x, by: cy + y, x: cx + x, y: cy + y, free: false, vx: 0, vy: 0 });\n      }\n    }\n    front = 0; t = 0;\n  }\n  function apply() { resize(); build(); document.body.style.background = state.bg; }\n  function frame() {\n    t += 0.016;\n    front += state.speed * devicePixelRatio * 0.6;\n    ctx.fillStyle = state.bg; ctx.fillRect(0, 0, W, H);\n    ctx.fillStyle = state.color;\n    for (const p of ps) {\n      if (!p.free && p.bx <= front) { p.free = true; const a = Math.random() * Math.PI - Math.PI; const s = (0.5 + Math.random()) * state.drift * devicePixelRatio; p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s - state.drift * 0.4 * devicePixelRatio; }\n      if (p.free) { p.x += p.vx; p.y += p.vy; p.vy += 0.02 * devicePixelRatio; p.vx *= 0.99; }\n      ctx.beginPath(); ctx.arc(p.x, p.y, state.size * devicePixelRatio, 0, 7); ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", build);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); frame();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v164",
  标题: "碰撞散射",
  分类: "背景",
  子类: "粒子",
  风格: [
    "科技"
  ],
  场景: [
    "落地页·发布页"
  ],
  元素: [
    "3D·粒子",
    "视觉"
  ],
  搭配: [

  ],
  标签: [
    "粒子",
    "碰撞",
    "散射"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/碰撞散射.html",
  参数: [
    {
      键: "count",
      名: "粒子数",
      类型: "slider",
      最小: 80,
      最大: 500,
      步长: 10,
      默认: 220
    },
    {
      键: "speed",
      名: "速度",
      类型: "slider",
      最小: 0.6,
      最大: 4,
      步长: 0.1,
      默认: 2.2
    },
    {
      键: "obstacle",
      名: "障碍半径（px）",
      类型: "slider",
      最小: 20,
      最大: 90,
      步长: 2,
      默认: 46
    },
    {
      键: "size",
      名: "粒子大小",
      类型: "slider",
      最小: 0.8,
      最大: 4,
      步长: 0.1,
      默认: 1.6
    },
    {
      键: "color",
      名: "粒子色",
      类型: "color",
      默认: "#7CFFB2"
    },
    {
      键: "obColor",
      名: "障碍色",
      类型: "color",
      默认: "#ff7a59"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#0e1116"
    }
  ],
  效果说明: "粒子流先向前移动，碰到障碍物后按接触位置反射/分流，禁止直接穿过障碍。\n好处：用圆法线做速度反射，粒子绕开障碍而非穿模，碰撞「可信」且能分流成两股。\n能怎么改：拖滑杆调「粒子数、速度、障碍半径、粒子大小」，换颜色改粒子/障碍/背景。",
  用法: "点「重新发射」重播；详情页调「速度、障碍半径」看散射，换「粒子色/障碍色」改配色。",
  提示词: "用 canvas 做一个「碰撞散射」粒子流（纯 JS）：\n效果：粒子向右飞，距障碍圆心 < r 时按法线反射速度（v-=2(v·n)n）并贴到表面外，禁止穿过；出界则重生。\n关键参数：count 粒子数 / speed 速度 / obstacle 障碍半径 / size 粒子大小 / color 粒子色 / obColor 障碍色 / bg 背景色\n集成步骤：1. 复制 assets/demos/碰撞散射.html 的 frame() 2. 调速度与障碍 3. 换配色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>碰撞散射演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #0e1116; gap: 12px; }\n  canvas { display: block; width: min(520px, 94vw); height: min(360px, 70vh); border-radius: 16px; }\n  .btn { padding: 9px 20px; border: none; border-radius: 10px; background: #ff7a59; color: #fff; font-size: 14px; cursor: pointer; font-weight: 700; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #aaa; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<button class=\"btn\" id=\"btn\">重新发射</button>\n<div class=\"hint\">粒子流先向前移动，碰到障碍物后按接触位置反弹/分流，禁止直接穿过障碍</div>\n<script>\n  const state = { count: 220, speed: 2.2, obstacle: 46, size: 1.6, color: \"#7CFFB2\", obColor: \"#ff7a59\", bg: \"#0e1116\" };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, ps = [], obs = { x: 0, y: 0, r: 0 };\n  function resize() { W = canvas.width = canvas.clientWidth * devicePixelRatio; H = canvas.height = canvas.clientHeight * devicePixelRatio; obs = { x: W * 0.62, y: H / 2, r: state.obstacle * devicePixelRatio }; }\n  function build() {\n    ps = [];\n    for (let i = 0; i < state.count; i++) ps.push(spawn());\n  }\n  function spawn() { return { x: -5, y: Math.random() * H, vx: state.speed * devicePixelRatio, vy: (Math.random() - 0.5) * 0.6 * devicePixelRatio }; }\n  function apply() { resize(); build(); document.body.style.background = state.bg; }\n  function frame() {\n    ctx.fillStyle = state.bg; ctx.fillRect(0, 0, W, H);\n    ctx.fillStyle = state.obColor;\n    ctx.beginPath(); ctx.arc(obs.x, obs.y, obs.r, 0, 7); ctx.fill();\n    ctx.fillStyle = state.color;\n    for (const p of ps) {\n      const dx = p.x - obs.x, dy = p.y - obs.y, d = Math.hypot(dx, dy);\n      if (d < obs.r + 2 * devicePixelRatio) {\n        const nx = dx / d, ny = dy / d;\n        const dot = p.vx * nx + p.vy * ny;\n        p.vx -= 2 * dot * nx; p.vy -= 2 * dot * ny;     // 法线反射，不穿透\n        p.x = obs.x + nx * (obs.r + 3 * devicePixelRatio);\n        p.y = obs.y + ny * (obs.r + 3 * devicePixelRatio);\n      }\n      p.x += p.vx; p.y += p.vy;\n      if (p.x > W + 5 || p.y < -5 || p.y > H + 5) Object.assign(p, spawn());\n      ctx.beginPath(); ctx.arc(p.x, p.y, state.size * devicePixelRatio, 0, 7); ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", build);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); frame();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v165",
  标题: "执行计划预览",
  分类: "AI反馈",
  子类: "计划预览",
  风格: [
    "信息型"
  ],
  场景: [
    "工具·SaaS"
  ],
  元素: [
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "AI反馈",
    "计划",
    "确认"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/执行计划预览.html",
  参数: [
    {
      键: "steps",
      名: "步骤数",
      类型: "slider",
      最小: 2,
      最大: 6,
      步长: 1,
      默认: 4
    },
    {
      键: "dur",
      名: "单步时长（ms）",
      类型: "slider",
      最小: 400,
      最大: 1600,
      步长: 100,
      默认: 900
    },
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    },
    {
      键: "card",
      名: "卡片色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "适合多步骤长耗时任务：AI 先展示分步计划，待你确认后再启动执行。\n好处：把「要干嘛、分几步」先摊开给你看并要授权，避免 AI 自作主张跑一长串操作；可控、可喊停。\n能怎么改：拖滑杆调「步骤数、单步时长」，换颜色改面板配色。",
  用法: "点「确认计划并启动」逐步执行；详情页调「步骤数」看计划长度，换「主色/背景色/卡片色」改配色。",
  提示词: "给 AI 的反馈指令模板（大白话）：\n效果：多步骤长耗时任务前，先列出分步计划（每步做什么、预计多久），等你确认再执行；任一步可暂停。\n用法示例：你发「帮我生成周报」→ AI 先回「计划：1 检索提交 2 归纳 3 起草 4 校验，确认后开始？」\n关键参数：steps 步骤数 / dur 单步时长 / accent 主色 / bg 背景色 / card 卡片色\n集成步骤：复制 assets/demos/执行计划预览.html 作为 UI 参考，把计划数组换成你的任务步骤",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>执行计划预览演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .tt { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }\n  .sub { font-size: 12px; color: #888; margin-bottom: 12px; }\n  .step { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid #eee; font-size: 13px; color: #444; }\n  .dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #ccc; flex: none; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #aaa; }\n  .step.run .dot { border-color: var(--accent); color: var(--accent); }\n  .step.done .dot { background: var(--accent); border-color: var(--accent); color: #fff; }\n  .step.done .name { color: #1a1a1a; }\n  .btn { margin-top: 14px; width: 100%; padding: 11px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 14px; cursor: pointer; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"tt\">任务：生成本周复盘周报</div>\n  <div class=\"sub\">先展示分步计划，确认后再启动（多步骤长耗时任务适用）</div>\n  <div id=\"steps\"></div>\n  <button class=\"btn\" id=\"btn\">确认计划并启动</button>\n</div>\n<div class=\"hint\">适合多步骤长耗时任务：AI 先展示分步计划，待你确认后再启动执行</div>\n<script>\n  const state = { steps: 4, dur: 900, accent: \"#3d5fd6\", bg: \"#fafafa\", card: \"#ffffff\" };\n  const stepsEl = document.getElementById(\"steps\");\n  const btn = document.getElementById(\"btn\");\n  const plan = [\"检索本周 git 提交与笔记\", \"归纳关键进展与卡点\", \"生成周报草稿\", \"本地校验格式并落盘\"];\n  let running = false;\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    stepsEl.innerHTML = \"\";\n    for (let i = 0; i < state.steps; i++) {\n      const s = document.createElement(\"div\"); s.className = \"step\"; s.dataset.i = i;\n      s.innerHTML = '<div class=\"dot\">' + (i + 1) + '</div><div class=\"name\">' + (plan[i % plan.length]) + '</div>';\n      stepsEl.appendChild(s);\n    }\n  }\n  btn.addEventListener(\"click\", () => {\n    if (running) return; running = true; btn.disabled = true; btn.textContent = \"执行中…\";\n    let i = 0;\n    (function next() {\n      if (i >= state.steps) { btn.textContent = \"已完成 ✓\"; return; }\n      const el = stepsEl.children[i];\n      el.classList.add(\"run\"); el.querySelector(\".dot\").textContent = \"…\";\n      setTimeout(() => { el.classList.remove(\"run\"); el.classList.add(\"done\"); el.querySelector(\".dot\").textContent = \"✓\"; i++; next(); }, state.dur);\n    })();\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v166",
  标题: "工具调用反馈",
  分类: "AI反馈",
  子类: "调用记录",
  风格: [
    "信息型"
  ],
  场景: [
    "工具·SaaS"
  ],
  元素: [
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "AI反馈",
    "工具",
    "记录"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/工具调用反馈.html",
  参数: [
    {
      键: "calls",
      名: "调用次数",
      类型: "slider",
      最小: 2,
      最大: 8,
      步长: 1,
      默认: 4
    },
    {
      键: "dur",
      名: "间隔（ms）",
      类型: "slider",
      最小: 300,
      最大: 1200,
      步长: 50,
      默认: 700
    },
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#5ad1ff"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    }
  ],
  效果说明: "适配查资料、计算等场景：展示调用了什么工具、传了什么参数、返回了什么，并保留记录。\n好处：AI 的「思考过程」透明可查，出错能定位是哪一步工具/参数不对，也方便你复核。\n能怎么改：拖滑杆调「调用次数、间隔」，换颜色改主色。",
  用法: "点「运行任务」看调用流；详情页调「调用次数、间隔」看节奏，换「主色」改配色。",
  提示词: "给 AI 的反馈指令模板（大白话）：\n效果：每调用一次工具，就显示「→ 调用 X，参数 {...} ← 返回 {...}」并保留在历史里，不隐藏中间过程。\n用法示例：查资料/算数时实时滚出调用记录，你随时能回看传了什么、回了什么。\n关键参数：calls 调用次数 / dur 间隔 / accent 主色 / bg 背景色\n集成步骤：复制 assets/demos/工具调用反馈.html 作为 UI 参考，把 calls 数组换成你的工具名",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>工具调用反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: ui-monospace, \"SFMono-Regular\", Consolas, monospace; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 12px; }\n  .panel { width: min(460px, 94vw); height: 300px; background: #0f1115; border-radius: 14px; padding: 14px; overflow: auto; color: #d6d6da; font-size: 12.5px; line-height: 1.7; box-shadow: 0 10px 34px rgba(0,0,0,.2); }\n  .row { white-space: pre-wrap; }\n  .k { color: var(--accent); }\n  .p { color: #ffd27a; }\n  .r { color: #7CFFB2; }\n  .btn { padding: 9px 20px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 13px; cursor: pointer; font-family: system-ui; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"log\"></div>\n<button class=\"btn\" id=\"btn\">运行任务（展示工具调用）</button>\n<div class=\"hint\">适配查资料/计算场景：展示调用了什么工具、传了什么、返回了什么，并保留记录</div>\n<script>\n  const state = { calls: 4, dur: 700, accent: \"#5ad1ff\", bg: \"#fafafa\" };\n  const log = document.getElementById(\"log\");\n  const calls = [\n    ['搜索', '{query:\"Web 灵感弹药库\"}', \"命中 12 条素材\"],\n    ['读取页面', '{url:\"index.html\"}', \"解析 67 条条目\"],\n    ['计算', '{a:8848,b:1.06}', \"结果 9379.88\"],\n    ['写文件', '{path:\"data/素材.js\"}', \"已写入 22 条\"]\n  ];\n  let timer = null;\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    log.innerHTML = \"\";\n  }\n  btn.addEventListener(\"click\", () => {\n    log.innerHTML = \"\"; let i = 0;\n    clearInterval(timer);\n    timer = setInterval(() => {\n      if (i >= state.calls) { clearInterval(timer); return; }\n      const c = calls[i % calls.length];\n      const div = document.createElement(\"div\"); div.className = \"row\";\n      div.innerHTML = '<span class=\"k\">→ 调用 ' + c[0] + '</span> <span class=\"p\">' + c[1] + '</span>\\n  <span class=\"r\">← 返回 ' + c[2] + '</span>';\n      log.appendChild(div); log.scrollTop = log.scrollHeight; i++;\n    }, state.dur);\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v167",
  标题: "人工授权确认",
  分类: "AI反馈",
  子类: "授权确认",
  风格: [
    "信息型"
  ],
  场景: [
    "工具·SaaS"
  ],
  元素: [
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "AI反馈",
    "授权",
    "高危"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/人工授权确认.html",
  参数: [
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "warn",
      名: "警示色",
      类型: "color",
      默认: "#e0533d"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    },
    {
      键: "card",
      名: "卡片色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "用于发布、覆盖等高影响操作：AI 在关键步骤暂停，说明影响，待你确认后再执行。\n好处：高危动作不被自动执行，先讲清「会动到什么、能否撤销」，把最终决定权留给你。\n能怎么改：换颜色改主色/警示色/面板配色。",
  用法: "点「确认执行 / 取消」看两种走向；详情页换「主色/警示色/卡片色」改配色。",
  提示词: "给 AI 的反馈指令模板（大白话）：\n效果：遇到发布、覆盖、删除等高影响操作，先暂停并说明「操作是什么、影响范围、能否撤销、建议」，等你点确认再执行。\n用法示例：AI 回「即将覆盖 production 配置，影响 3 个服务，不可自动撤销——确认执行 / 取消？」\n关键参数：accent 主色 / warn 警示色 / bg 背景色 / card 卡片色\n集成步骤：复制 assets/demos/人工授权确认.html 作为 UI 参考，把影响文案换成你的操作",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>人工授权确认演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 22px; box-shadow: 0 10px 34px rgba(0,0,0,.1); border-top: 4px solid var(--warn); }\n  .tt { font-size: 15px; font-weight: 700; color: #1a1a1a; display: flex; align-items: center; gap: 8px; }\n  .impact { margin: 12px 0; font-size: 12.5px; color: #555; line-height: 1.7; background: #fff6f3; border: 1px solid #ffd9cf; border-radius: 10px; padding: 10px 12px; }\n  .impact b { color: var(--warn); }\n  .row { display: flex; gap: 10px; margin-top: 8px; }\n  .btn { flex: 1; padding: 11px; border: none; border-radius: 10px; font-size: 14px; cursor: pointer; }\n  .ok { background: var(--warn); color: #fff; }\n  .no { background: #eee; color: #555; }\n  .status { margin-top: 12px; font-size: 13px; font-weight: 700; min-height: 18px; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"tt\">⚠ 即将执行高危操作</div>\n  <div class=\"impact\">操作：<b>覆盖 production 配置文件</b><br>影响：线上 3 个服务将重载；不可自动撤销，需人工回滚。<br>建议：先备份再执行。</div>\n  <div class=\"row\">\n    <button class=\"btn ok\" id=\"ok\">确认执行</button>\n    <button class=\"btn no\" id=\"no\">取消</button>\n  </div>\n  <div class=\"status\" id=\"st\"></div>\n</div>\n<div class=\"hint\">用于发布/覆盖等高影响操作：AI 在关键步骤暂停说明影响，待你确认后再执行</div>\n<script>\n  const state = { accent: \"#3d5fd6\", warn: \"#e0533d\", bg: \"#fafafa\", card: \"#ffffff\" };\n  const st = document.getElementById(\"st\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--warn\", state.warn);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n  }\n  document.getElementById(\"ok\").addEventListener(\"click\", () => { st.style.color = state.warn; st.textContent = \"已授权，正在执行…（完成后回报结果）\"; });\n  document.getElementById(\"no\").addEventListener(\"click\", () => { st.style.color = \"#888\"; st.textContent = \"已取消，操作未执行\"; });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v168",
  标题: "分步进度反馈",
  分类: "AI反馈",
  子类: "步骤进度",
  风格: [
    "信息型"
  ],
  场景: [
    "工具·SaaS"
  ],
  元素: [
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "AI反馈",
    "进度",
    "状态"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/分步进度反馈.html",
  参数: [
    {
      键: "steps",
      名: "步骤数",
      类型: "slider",
      最小: 2,
      最大: 6,
      步长: 1,
      默认: 4
    },
    {
      键: "dur",
      名: "单步时长（ms）",
      类型: "slider",
      最小: 400,
      最大: 1600,
      步长: 100,
      默认: 1000
    },
    {
      键: "accent",
      名: "进行色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "done",
      名: "完成色",
      类型: "color",
      默认: "#2bb673"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    },
    {
      键: "card",
      名: "卡片色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "适配连续多步骤任务：制作状态清晰的步骤条，每步显示等待 / 进行中 / 完成。\n好处：长任务不再黑盒，你能随时看见卡在第几步、卡了多久，焦虑感低、也方便接手。\n能怎么改：拖滑杆调「步骤数、单步时长」，换颜色改进行/完成两态。",
  用法: "点「开始执行」看逐步推进；详情页调「步骤数」看长度，换「进行色/完成色」改语义色。",
  提示词: "给 AI 的反馈指令模板（大白话）：\n效果：连续多步骤任务时，给一个步骤条，每步明确标「等待 / 进行中 / 完成」三态，不只用一句「处理中」。\n用法示例：检索→抽取→生成→校验，逐个点亮，进行中的那步显示进度条。\n关键参数：steps 步骤数 / dur 单步时长 / accent 进行色 / done 完成色 / bg 背景色 / card 卡片色\n集成步骤：复制 assets/demos/分步进度反馈.html 作为 UI 参考，把步骤名换成你的流程",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>分步进度反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 14px; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .item { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-top: 1px solid #eee; }\n  .badge { font-size: 11px; padding: 3px 9px; border-radius: 999px; font-weight: 700; flex: none; }\n  .b-wait { background: #eee; color: #999; }\n  .b-run { background: #eaf0ff; color: var(--accent); }\n  .b-done { background: #e6f7ee; color: var(--done); }\n  .name { font-size: 13px; color: #444; }\n  .item.run .name { color: var(--accent); font-weight: 700; }\n  .item.done .name { color: #1a1a1a; }\n  .bar { height: 4px; background: #eee; border-radius: 2px; overflow: hidden; margin-top: 4px; }\n  .bar > i { display: block; height: 100%; width: 0; background: var(--accent); transition: width .3s; }\n  .item.run .bar > i { width: 60%; }\n  .item.done .bar > i { width: 100%; background: var(--done); }\n  .btn { width: min(420px, 92vw); padding: 11px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 14px; cursor: pointer; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\"></div>\n<button class=\"btn\" id=\"btn\">开始执行</button>\n<div class=\"hint\">适配连续多步骤任务：制作状态清晰的步骤条，每步显示等待/进行中/完成</div>\n<script>\n  const state = { steps: 4, dur: 1000, accent: \"#3d5fd6\", done: \"#2bb673\", bg: \"#fafafa\", card: \"#ffffff\" };\n  const p = document.getElementById(\"p\");\n  const plan = [\"检索素材\", \"抽取关键参数\", \"生成可运行代码\", \"写入弹药库并校验\"];\n  let running = false;\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--done\", state.done);\n    p.innerHTML = \"\";\n    for (let i = 0; i < state.steps; i++) {\n      const it = document.createElement(\"div\"); it.className = \"item\";\n      it.innerHTML = '<span class=\"badge b-wait\">等待</span><div style=\"flex:1\"><div class=\"name\">' + plan[i % plan.length] + '</div><div class=\"bar\"><i></i></div></div>';\n      p.appendChild(it);\n    }\n  }\n  btn.addEventListener(\"click\", () => {\n    if (running) return; running = true; btn.disabled = true; btn.textContent = \"执行中…\";\n    const items = [...p.children]; let i = 0;\n    (function next() {\n      if (i >= items.length) { btn.textContent = \"全部完成 ✓\"; return; }\n      const it = items[i]; const b = it.querySelector(\".badge\");\n      b.className = \"badge b-run\"; b.textContent = \"进行中\"; it.classList.add(\"run\");\n      setTimeout(() => { b.className = \"badge b-done\"; b.textContent = \"完成\"; it.classList.remove(\"run\"); it.classList.add(\"done\"); i++; next(); }, state.dur);\n    })();\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v169",
  标题: "产物预览反馈",
  分类: "AI反馈",
  子类: "产物预览",
  风格: [
    "信息型"
  ],
  场景: [
    "工具·SaaS",
    "内容·阅读"
  ],
  元素: [
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "AI反馈",
    "预览",
    "产物"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/产物预览反馈.html",
  参数: [
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "accent2",
      名: "次色",
      类型: "color",
      默认: "#7c4dff"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    },
    {
      键: "card",
      名: "卡片色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "适配生成文档、图片等场景：先展示产物预览，再给摘要与操作入口（打开/复制/下载）。\n好处：交付前让你「先看一眼」，再决定下一步动作，避免直接甩一个大文件过来不知所谓。\n能怎么改：换颜色改渐变/面板配色。",
  用法: "点「打开预览/复制代码/下载」看操作入口；详情页换「主色/次色/卡片色」改配色。",
  提示词: "给 AI 的反馈指令模板（大白话）：\n效果：生成完文档/图片后，先给一张产物预览缩略图 + 一句话摘要，再给「打开 / 复制 / 下载」等操作入口。\n用法示例：AI 回「已生成 report.html（约 28KB）[预览] 打开·复制·下载」。\n关键参数：accent 主色 / accent2 次色 / bg 背景色 / card 卡片色\n集成步骤：复制 assets/demos/产物预览反馈.html 作为 UI 参考，把预览与摘要换成你的产物",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>产物预览反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 18px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .thumb { height: 120px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 700; }\n  .sum { font-size: 12.5px; color: #555; line-height: 1.7; margin: 12px 0; }\n  .row { display: flex; gap: 10px; }\n  .btn { flex: 1; padding: 10px; border: none; border-radius: 10px; font-size: 13px; cursor: pointer; }\n  .a { background: var(--accent); color: #fff; }\n  .b { background: #eee; color: #555; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"thumb\">report.html 预览</div>\n  <div class=\"sum\">已生成《本周复盘周报》单文件 HTML：含 4 段小结 + 1 张指标图，约 28KB，可直接双击打开。</div>\n  <div class=\"row\">\n    <button class=\"btn a\" id=\"open\">打开预览</button>\n    <button class=\"btn b\" id=\"copy\">复制代码</button>\n    <button class=\"btn b\" id=\"dl\">下载</button>\n  </div>\n</div>\n<div class=\"hint\">适配生成文档/图片场景：先展示产物预览，再给摘要与操作入口</div>\n<script>\n  const state = { accent: \"#3d5fd6\", accent2: \"#7c4dff\", bg: \"#fafafa\", card: \"#ffffff\" };\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--accent2\", state.accent2);\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", () => alert(\"（演示）打开 report.html 预览\"));\n  document.getElementById(\"copy\").addEventListener(\"click\", () => alert(\"（演示）已复制 HTML 到剪贴板\"));\n  document.getElementById(\"dl\").addEventListener(\"click\", () => alert(\"（演示）开始下载 report.html\"));\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v170",
  标题: "重试恢复反馈",
  分类: "AI反馈",
  子类: "失败重试",
  风格: [
    "信息型"
  ],
  场景: [
    "工具·SaaS"
  ],
  元素: [
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "AI反馈",
    "重试",
    "失败"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/重试恢复反馈.html",
  参数: [
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "done",
      名: "成功色",
      类型: "color",
      默认: "#2bb673"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    },
    {
      键: "card",
      名: "卡片色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "适配任务失败场景：展示失败原因、自动重试过程与备用方案，不静默失败。\n好处：出错时把「为什么失败、在重试几次、兜底是什么」讲清楚，你不用猜，也更信任系统会自救。\n能怎么改：换颜色改主色/成功色/面板配色。",
  用法: "点「模拟一次完整重试」看 失败→重试→备用 流程；详情页换「主色/成功色/卡片色」改配色。",
  提示词: "给 AI 的反馈指令模板（大白话）：\n效果：任务失败时，先说清失败原因，再展示自动重试（含退避策略），若仍失败给出备用方案，不悄悄放弃。\n用法示例：AI 回「✗ 文件被占用(EBUSY) → ↻ 重试中(退避0.5s) → ✓ 备用：原子替换成功」。\n关键参数：accent 主色 / done 成功色 / bg 背景色 / card 卡片色\n集成步骤：复制 assets/demos/重试恢复反馈.html 作为 UI 参考，把原因与兜底换成你的场景",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>重试恢复反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 12px; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .phase { font-size: 13px; line-height: 1.7; }\n  .err { background: #fff6f3; border: 1px solid #ffd9cf; color: #b3402a; border-radius: 10px; padding: 10px 12px; margin: 10px 0; font-size: 12.5px; }\n  .retry { background: #eaf0ff; border: 1px solid #cdddff; color: var(--accent); border-radius: 10px; padding: 10px 12px; margin: 10px 0; font-size: 12.5px; }\n  .fallback { background: #e9f9ef; border: 1px solid #c7ecd4; color: var(--done); border-radius: 10px; padding: 10px 12px; margin: 10px 0; font-size: 12.5px; }\n  .btn { width: min(420px, 92vw); padding: 11px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 14px; cursor: pointer; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"phase\">尝试：写入 <code>data/素材.js</code></div>\n  <div class=\"err\" id=\"err\">✗ 失败：文件被占用（EBUSY），第 1 次</div>\n  <div class=\"retry\" id=\"retry\">↻ 自动重试中…（退避 0.5s）</div>\n</div>\n<button class=\"btn\" id=\"btn\">模拟一次完整重试</button>\n<div class=\"hint\">适配任务失败场景：展示失败原因、重试过程与备用方案</div>\n<script>\n  const state = { accent: \"#3d5fd6\", done: \"#2bb673\", bg: \"#fafafa\", card: \"#ffffff\" };\n  const p = document.getElementById(\"p\");\n  const err = document.getElementById(\"err\");\n  const retry = document.getElementById(\"retry\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--done\", state.done);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", () => {\n    err.textContent = \"✗ 失败：文件被占用（EBUSY），第 1 次\";\n    retry.textContent = \"↻ 自动重试中…（退避 0.5s）\";\n    retry.className = \"retry\";\n    setTimeout(() => { retry.textContent = \"↻ 第 2 次重试…（退避 1s）\"; }, 500);\n    setTimeout(() => {\n      retry.className = \"fallback\";\n      retry.innerHTML = \"✓ 备用方案：写入 <b>data/素材.tmp.js</b> 后原子替换，成功\";\n    }, 1600);\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
  id: "v171",
  标题: "最终结果反馈",
  分类: "AI反馈",
  子类: "结果汇总",
  风格: [
    "信息型"
  ],
  场景: [
    "工具·SaaS"
  ],
  元素: [
    "反馈"
  ],
  搭配: [

  ],
  标签: [
    "AI反馈",
    "汇总",
    "待办"
  ],
  来源: "视频拆解：抖音高级交互设计合集（2026-09-10 用户提供；交互模式为通用设计手法，实现代码自写）",
  效果演示: "assets/demos/最终结果反馈.html",
  参数: [
    {
      键: "accent",
      名: "主色",
      类型: "color",
      默认: "#3d5fd6"
    },
    {
      键: "done",
      名: "成功色",
      类型: "color",
      默认: "#2bb673"
    },
    {
      键: "warn",
      名: "待办色",
      类型: "color",
      默认: "#e0993d"
    },
    {
      键: "bg",
      名: "背景色",
      类型: "color",
      默认: "#fafafa"
    },
    {
      键: "card",
      名: "卡片色",
      类型: "color",
      默认: "#ffffff"
    }
  ],
  效果说明: "适配任务结束节点：汇总完成状态、结论与产物，并标注待办事项。\n好处：一轮结束有一份「收口报告」——做成了什么、产出了什么、还有什么没做，后续接手不迷路。\n能怎么改：换颜色改语义三色/面板配色。",
  用法: "直接看汇总卡；详情页换「主色/成功色/待办色/卡片色」改配色。",
  提示词: "给 AI 的反馈指令模板（大白话）：\n效果：任务结束时给一份汇总：完成状态、一句话结论、产物清单、待办事项（标黄），不只有「搞定」。\n用法示例：AI 回「✓ 完成：新增 22 条素材；产物：22 演示+数据；待办：README 计数待更新」。\n关键参数：accent 主色 / done 成功色 / warn 待办色 / bg 背景色 / card 卡片色\n集成步骤：复制 assets/demos/最终结果反馈.html 作为 UI 参考，把汇总内容换成你的结果",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>最终结果反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }\n  .check { width: 28px; height: 28px; border-radius: 50%; background: var(--done); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 15px; }\n  .tt { font-size: 15px; font-weight: 700; color: #1a1a1a; }\n  .sum { font-size: 12.5px; color: #555; line-height: 1.7; margin-bottom: 10px; }\n  .arts { font-size: 12.5px; color: #333; line-height: 1.8; }\n  .arts li { margin-left: 18px; }\n  .todo { margin-top: 10px; font-size: 12.5px; color: var(--warn); background: #fff8ec; border: 1px solid #ffe6b8; border-radius: 10px; padding: 9px 12px; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"top\"><div class=\"check\">✓</div><div class=\"tt\">任务完成</div></div>\n  <div class=\"sum\">已为「Web 灵感弹药库」新增 22 条素材（15 网页动效 + 7 AI 反馈），全部通过语法校验，演示可离线运行。</div>\n  <div class=\"arts\">产物：\n    <ul class=\"arts\">\n      <li>assets/demos/ 下 22 个演示文件</li>\n      <li>data/素材.js 新增 22 条数据</li>\n      <li>index.html 新增「AI反馈」分类</li>\n    </ul>\n  </div>\n  <div class=\"todo\">待办：README 全库索引计数待更新为 89 条；GitHub Pages 待重新部署。</div>\n</div>\n<div class=\"hint\">适配任务结束节点：汇总完成状态、结论与产物，并标注待办事项</div>\n<script>\n  const state = { accent: \"#3d5fd6\", done: \"#2bb673\", warn: \"#e0993d\", bg: \"#fafafa\", card: \"#ffffff\" };\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--done\", state.done);\n    document.documentElement.style.setProperty(\"--warn\", state.warn);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
  复用记录: ""
  },
  {
    id: "v172",
    标题: "入场时间层级",
    分类: "动效",
    子类: "入场序列",
    风格: ["极简"],
    场景: ["官网·品牌站","工具·SaaS"],
    元素: ["动效"],
    搭配: [],
    标签: ["首屏","错峰","入场","层级"],
    来源: "网站拆解：Linear（linear.app）首屏，2026-09-10；入场排队属通用设计手法，实现代码自写",
    效果演示: "assets/demos/入场时间层级.html",
    参数: [{"键":"jiange","名":"错峰间隔(ms)","类型":"slider","最小":0,"最大":500,"步长":20,"默认":120},{"键":"shichang","名":"单个时长(ms)","类型":"slider","最小":200,"最大":1600,"步长":50,"默认":700},{"键":"weiyi","名":"上移距离(px)","类型":"slider","最小":0,"最大":60,"步长":2,"默认":18},{"键":"huandong","名":"缓动","类型":"select","选项":["平滑","回弹","匀速"],"默认":"平滑"},{"键":"chongbo","名":"自动重播","类型":"switch","默认":true},{"键":"zhucai","名":"强调色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"zi","名":"标题色","类型":"color","默认":"#1a1a1a"},{"键":"cizi","名":"副文色","类型":"color","默认":"#6b6b6b"},{"键":"kase","名":"卡片色","类型":"color","默认":"#ffffff"}],
    效果说明: "首屏元素不一起出现，而是按重要性排队入场：标签 → 大标题 → 副文 → 按钮 → 功能卡，晚一拍进场的天然就是次要信息。\n好处：用时间代替层级线——不加框、不加粗、不换色，观众也知道先看什么后看什么；在整站几乎不动的克制页面里，这一段入场就是唯一的高音，所以特别提神（反例是全站到处都在动，动画就变成噪音）。\n能怎么改：错峰间隔调松紧（0 = 整块一起冒出来，越大越像主持人报幕）；位移与缓动调气质（回弹活泼、平滑克制）。",
    用法: "详情页调「错峰间隔」看排队松紧，「时长 / 上移距离 / 缓动」调气质；「自动重播」关掉就只播一次，适合正式上线。换强调色 / 底色 / 卡片色改成你自己的配色。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：做一个首屏入场序列——页面加载后元素按重要性依次浮现（小标签 → 大标题 → 副文 → 按钮组 → 功能卡），每个元素从下方上移并淡入，不要一起出现。\n用法示例：工具站首屏，进页面 1.5 秒内全部到位，主标题先到，功能卡最后到。\n关键参数：jiange 错峰间隔 120ms（0–500）／ shichang 单个时长 700ms（200–1600）／ weiyi 上移距离 18px（0–60）／ huandong 缓动 平滑｜回弹｜匀速 ／ chongbo 自动重播 开 ／ zhucai 强调色 #5E6AD2 ／ di 页面底色 #fafafa ／ zi 标题色 #1a1a1a ／ cizi 副文色 #6b6b6b ／ kase 卡片色 #ffffff\n集成步骤：复制 assets/demos/入场时间层级.html，把里面的文案换成你的；给需要排队的元素加 class=\"seq\"，脚本会自动按序号 × 错峰间隔排延迟；上线时把 chongbo 关掉，只播一次。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>入场时间层级演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); color: var(--zi); display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n  .stage { width: min(560px, 92vw); }\n  .seq { opacity: 0; transform: translateY(var(--weiyi)); }\n  .seq.run { animation: rise var(--shichang) var(--ease) forwards; }\n  @keyframes rise { to { opacity: 1; transform: none; } }\n  .tag { display: inline-block; font-size: 12px; letter-spacing: .08em; color: var(--zhucai); border: 1px solid var(--zhucai); border-radius: 999px; padding: 3px 10px; }\n  h1 { margin-top: 14px; font-size: 34px; line-height: 1.2; letter-spacing: -.5px; }\n  .sub { margin-top: 10px; font-size: 15px; color: var(--cizi); }\n  .row { margin-top: 20px; display: flex; gap: 12px; }\n  .btn { border: none; border-radius: 8px; padding: 11px 22px; font-size: 14px; font-weight: 700; cursor: pointer; background: var(--zhucai); color: #fff; }\n  .btn.ghost { background: transparent; color: var(--zi); border: 1px solid color-mix(in srgb, var(--zi) 20%, transparent); }\n  .cards { margin-top: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n  .card { background: var(--kase); border: 1px solid color-mix(in srgb, var(--zi) 8%, transparent); border-radius: 12px; padding: 14px; }\n  .card b { display: block; font-size: 13.5px; }\n  .card span { display: block; margin-top: 5px; font-size: 12px; color: var(--cizi); }\n  .order { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: var(--cizi); }\n</style>\n</head>\n<body>\n<div class=\"stage\">\n  <div class=\"tag seq\">第 1 层 · 先看身份</div>\n  <h1 class=\"seq\">一句话说清你是什么</h1>\n  <p class=\"sub seq\">副文解释给谁用、解决什么，比标题低一级。</p>\n  <div class=\"row seq\"><button class=\"btn\">主要动作</button><button class=\"btn ghost\">次要动作</button></div>\n  <div class=\"cards\">\n    <div class=\"card seq\"><b>功能一</b><span>最后才轮到细节</span></div>\n    <div class=\"card seq\"><b>功能二</b><span>晚 1 拍进场</span></div>\n    <div class=\"card seq\"><b>功能三</b><span>晚 2 拍进场</span></div>\n  </div>\n</div>\n<div class=\"order\">入场时间层级：错峰间隔决定「谁先被看到」，克制页面里这是唯一的高音</div>\n<script>\n  // 参数状态：键名与 data/素材.js 的「参数」一一对应\n  const state = { jiange: 120, shichang: 700, weiyi: 18, huandong: \"平滑\", chongbo: true,\n    zhucai: \"#5E6AD2\", di: \"#fafafa\", zi: \"#1a1a1a\", cizi: \"#6b6b6b\", kase: \"#ffffff\" };\n  const EASE = { \"平滑\": \"cubic-bezier(.16,1,.3,1)\", \"回弹\": \"cubic-bezier(.34,1.56,.64,1)\", \"匀速\": \"linear\" };\n  let timer = null;\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--zhucai\", state.zhucai);\n    r.setProperty(\"--di\", state.di);\n    r.setProperty(\"--zi\", state.zi);\n    r.setProperty(\"--cizi\", state.cizi);\n    r.setProperty(\"--kase\", state.kase);\n    r.setProperty(\"--weiyi\", state.weiyi + \"px\");\n    r.setProperty(\"--shichang\", state.shichang + \"ms\");\n    r.setProperty(\"--ease\", EASE[state.huandong] || EASE[\"平滑\"]);\n  }\n  // 逐个排队入场：延迟 = 序号 × 错峰间隔，改间隔就能看出层级松紧\n  function play() {\n    document.querySelectorAll(\".seq\").forEach((el, i) => {\n      el.classList.remove(\"run\");\n      void el.offsetWidth;\n      el.style.animationDelay = (i * state.jiange) + \"ms\";\n      el.classList.add(\"run\");\n    });\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); play();\n  // 自动重播：卡片缩略图里也能看到动效，关掉就只播一次\n  timer = setInterval(() => { if (state.chongbo) play(); }, 4200);\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v173",
    标题: "更新公告胶囊",
    分类: "组件",
    子类: "提示条",
    风格: ["极简"],
    场景: ["官网·品牌站","工具·SaaS"],
    元素: ["视觉","构成"],
    搭配: [],
    标签: ["公告","胶囊","更新","首屏"],
    来源: "网站拆解：Linear（linear.app）首屏公告条「New Loops →」，2026-09-10；公告条属通用设计模式，实现代码自写",
    效果演示: "assets/demos/更新公告胶囊.html",
    参数: [{"键":"yuanjiao","名":"圆角(px)","类型":"slider","最小":0,"最大":999,"步长":1,"默认":999},{"键":"neibian","名":"内边距(px)","类型":"slider","最小":4,"最大":20,"步长":1,"默认":8},{"键":"zihao","名":"字号(px)","类型":"slider","最小":11,"最大":20,"步长":1,"默认":13},{"键":"jianto","名":"箭头悬停位移(px)","类型":"slider","最小":0,"最大":14,"步长":1,"默认":5},{"键":"tiliang","名":"悬停提亮(%)","类型":"slider","最小":0,"最大":40,"步长":2,"默认":12},{"键":"dian","名":"强调色(标签/箭头)","类型":"color","默认":"#5E6AD2"},{"键":"kadi","名":"胶囊底色","类型":"color","默认":"#ffffff"},{"键":"bianse","名":"边框色","类型":"color","默认":"#e6e6e6"},{"键":"zi","名":"文字色","类型":"color","默认":"#1a1a1a"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"}],
    效果说明: "一条胶囊状的公告条：左边是「New」小标签或强调色圆点，中间一句话说清更新了什么，右边一个箭头。用最小的面积承载一条新消息，不抢首屏主角（大标题）的戏。\n好处：它比横幅 banner 轻、比弹窗客气，却能把「我们还在更新」这件事一直挂在首屏；箭头在悬停时右移，是最小成本的「点得动」暗示。\n能怎么改：圆角拉到最大就是胶囊、拉到 0 变成方正条；实心版（底色用强调色）适合重要的大版本，描边版适合日常更新。",
    用法: "详情页调「圆角」在胶囊与方条之间切换，「内边距 / 字号」调体量，「箭头位移 / 悬停提亮」调交互反馈强度；换「强调色 / 胶囊底色 / 边框色」配成你的品牌色。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：做一条圆角公告胶囊——左边「New」小标签（或强调色圆点）+ 中间一句更新文案 + 右边箭头；悬停时整条轻微提亮、箭头向右移动。要描边版、圆点版、实心版三种样子。\n用法示例：首屏大标题上方放一条「New：某某功能上线 →」，点进去跳更新日志。\n关键参数：yuanjiao 圆角 999px（0–999）／ neibian 内边距 8px（4–20）／ zihao 字号 13px（11–20）／ jianto 箭头悬停位移 5px（0–14）／ tiliang 悬停提亮 12%（0–40）／ dian 强调色 #5E6AD2 ／ kadi 胶囊底色 #ffffff ／ bianse 边框色 #e6e6e6 ／ zi 文字色 #1a1a1a ／ di 页面底色 #fafafa\n集成步骤：复制 assets/demos/更新公告胶囊.html，把文案换成你的更新内容，外层包一个 <a> 指向更新日志页；重要版本用 .pill.solid（实心），日常更新用描边版。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>更新公告胶囊演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); color: var(--zi); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; gap: 18px; }\n  /* 公告胶囊：用最小面积塞一条新消息，不抢首屏主角 */\n  .pill { display: inline-flex; align-items: center; gap: 8px; padding: var(--neibian) calc(var(--neibian) * 1.6);\n    background: var(--kadi); border: 1px solid var(--bianse); border-radius: var(--yuanjiao);\n    font-size: var(--zihao); color: var(--zi); cursor: pointer; transition: filter .18s ease; }\n  .pill .new { background: var(--dian); color: #fff; border-radius: 6px; padding: 1px 7px; font-size: calc(var(--zihao) - 1.5px); font-weight: 700; }\n  .pill .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--dian); }\n  .pill .arw { color: var(--dian); transition: transform .2s ease; }\n  .pill:hover { filter: brightness(calc(100% + var(--tiliang) * 1%)); }\n  .pill:hover .arw { transform: translateX(var(--jianto)); }\n  .pill.solid { background: var(--dian); color: #fff; border-color: var(--dian); }\n  .pill.solid .new { background: #fff; color: var(--dian); }\n  .pill.solid .arw, .pill.solid .dot { color: #fff; background: #fff; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: var(--cizi, #999); }\n</style>\n</head>\n<body>\n  <div class=\"pill\" id=\"a\"><span class=\"new\">New</span>Loops 上线：反馈直接变成任务<span class=\"arw\">→</span></div>\n  <div class=\"pill\" id=\"b\"><span class=\"dot\"></span>小圆点版：更低调的日常公告<span class=\"arw\">→</span></div>\n  <div class=\"pill solid\" id=\"c\"><span class=\"new\">New</span>实心版：想让这条消息更跳一点</div>\n  <div class=\"hint\">更新公告胶囊：最小面积承载一条新消息，箭头右移暗示「点得动」</div>\n<script>\n  // 参数状态：键名与 data/素材.js 的「参数」一一对应\n  const state = { yuanjiao: 999, neibian: 8, zihao: 13, jianto: 5, tiliang: 12,\n    dian: \"#5E6AD2\", kadi: \"#ffffff\", bianse: \"#e6e6e6\", zi: \"#1a1a1a\", di: \"#fafafa\" };\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    r.setProperty(\"--neibian\", state.neibian + \"px\");\n    r.setProperty(\"--zihao\", state.zihao + \"px\");\n    r.setProperty(\"--jianto\", state.jianto + \"px\");\n    r.setProperty(\"--tiliang\", state.tiliang);\n    r.setProperty(\"--dian\", state.dian);\n    r.setProperty(\"--kadi\", state.kadi);\n    r.setProperty(\"--bianse\", state.bianse);\n    r.setProperty(\"--zi\", state.zi);\n    r.setProperty(\"--di\", state.di);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v174",
    标题: "亲密性功能分组",
    分类: "布局骨架",
    子类: "分组卡组",
    风格: ["极简","信息型"],
    场景: ["官网·品牌站","工具·SaaS"],
    元素: ["布局","构成"],
    搭配: [],
    标签: ["亲密性","分组","间距","功能卡"],
    来源: "网站拆解：Linear（linear.app）首屏功能三组抱团，2026-09-10；「内紧外松」属通用排版原则，实现代码自写",
    效果演示: "assets/demos/亲密性功能分组.html",
    参数: [{"键":"zunei","名":"组内间距(px)","类型":"slider","最小":4,"最大":32,"步长":2,"默认":12},{"键":"zujian","名":"组间距(px)","类型":"slider","最小":12,"最大":80,"步长":2,"默认":40},{"键":"yuanjiao","名":"卡片圆角(px)","类型":"slider","最小":0,"最大":28,"步长":1,"默认":12},{"键":"yinying","名":"阴影强度","类型":"slider","最小":0,"最大":40,"步长":2,"默认":10},{"键":"tiliang","名":"悬停提亮(%)","类型":"slider","最小":0,"最大":30,"步长":2,"默认":8},{"键":"tubiao","名":"图标大小(px)","类型":"slider","最小":16,"最大":44,"步长":2,"默认":24},{"键":"zhucai","名":"强调色(图标/组标)","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"zi","名":"标题色","类型":"color","默认":"#1a1a1a"},{"键":"cizi","名":"正文色","类型":"color","默认":"#6b6b6b"},{"键":"kase","名":"卡片色","类型":"color","默认":"#ffffff"}],
    效果说明: "把功能按「谁跟谁是一伙」分组：同一组的卡片贴紧（组内间距小），组与组之间拉开（组间距大），组上再给一个小标题。\n好处：不用读文字、不用加分隔线，看一眼间距就知道这是三块事而不是六块事——亲密性原则省掉的是读者的理解成本；强调色只落在组标和图标上，信息层级靠间距而不是靠颜色堆。\n能怎么改：把组间距调到接近组内间距，立刻变回「六张一样的卡」的散装感（这是反面示范）；图标放大、阴影加深会从「工具」变「营销页」。",
    用法: "详情页把「组间距」从 40 拖到 12，看分组感怎么消失——这一下最能体会亲密性；「组内间距」调卡片呼吸，「图标大小 / 强调色」调气质。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：把功能介绍按亲密性分组展示——每 2–3 张相关卡片抱成一团并配一个小标题，组内卡片贴紧、组与组之间拉开明显距离；卡片左上角用淡底强调色图标，悬停时整卡轻微提亮。\n用法示例：工具站首屏下面放三组功能「对话/反馈 → issue」「规划」「智能体」，让人一眼看出这是三块能力而不是六条卖点。\n关键参数：zunei 组内间距 12px（4–32）／ zujian 组间距 40px（12–80）／ yuanjiao 圆角 12px（0–28）／ yinying 阴影 10（0–40）／ tiliang 悬停提亮 8%（0–30）／ tubiao 图标 24px（16–44）／ zhucai 强调色 #5E6AD2 ／ di 页面底色 #fafafa ／ zi 标题色 #1a1a1a ／ cizi 正文色 #6b6b6b ／ kase 卡片色 #ffffff\n集成步骤：复制 assets/demos/亲密性功能分组.html，改组标题与卡片文案；铁律是组间距 ≥ 组内间距的 2–3 倍，否则分组感就没了。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>亲密性功能分组演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); color: var(--zi); display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n  .wrap { width: min(620px, 94vw); }\n  h2 { font-size: 15px; margin-bottom: 18px; }\n  /* 组间距：组与组之间拉大，形成「内紧外松」——亲密性原则的核心 */\n  .groups { display: flex; flex-direction: column; gap: var(--zujian); }\n  .grp { display: flex; flex-direction: column; gap: var(--zunei); }\n  .grp > .gt { font-size: 12px; letter-spacing: .06em; color: var(--zhucai); }\n  .grp > .cards { display: grid; grid-template-columns: 1fr 1fr; gap: var(--zunei); }\n  .card { background: var(--kase); border: 1px solid color-mix(in srgb, var(--zi) 8%, transparent);\n    border-radius: var(--yuanjiao); padding: 14px; display: flex; gap: 11px; align-items: flex-start;\n    box-shadow: 0 calc(var(--yinying) * 0.2px) calc(var(--yinying) * 0.6px) rgba(0, 0, 0, .08);\n    transition: filter .18s ease; cursor: default; }\n  .card:hover { filter: brightness(calc(100% + var(--tiliang) * 1%)); }\n  .ico { width: var(--tubiao); height: var(--tubiao); flex: 0 0 auto; border-radius: calc(var(--yuanjiao) * 0.6);\n    background: color-mix(in srgb, var(--zhucai) 16%, transparent); color: var(--zhucai);\n    display: flex; align-items: center; justify-content: center; font-size: calc(var(--tubiao) * 0.5); }\n  .card b { display: block; font-size: 13.5px; }\n  .card span { display: block; margin-top: 4px; font-size: 12px; color: var(--cizi); line-height: 1.5; }\n  .hint { position: fixed; bottom: 14px; left: 0; right: 0; text-align: center; font-size: 12px; color: var(--cizi); }\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n  <h2>功能按亲密性抱团（组内间距 &lt; 组间距）</h2>\n  <div class=\"groups\">\n    <div class=\"grp\">\n      <div class=\"gt\">对话 / 反馈</div>\n      <div class=\"cards\">\n        <div class=\"card\"><div class=\"ico\">↩</div><div><b>收进 issue</b><span>一句话把反馈变成待办</span></div></div>\n        <div class=\"card\"><div class=\"ico\">◎</div><div><b>自动去重</b><span>同类反馈自动合并</span></div></div>\n      </div>\n    </div>\n    <div class=\"grp\">\n      <div class=\"gt\">规划</div>\n      <div class=\"cards\">\n        <div class=\"card\"><div class=\"ico\">▤</div><div><b>周期排期</b><span>目标拆到可执行</span></div></div>\n        <div class=\"card\"><div class=\"ico\">↗</div><div><b>进度可视</b><span>一眼看到卡在哪</span></div></div>\n      </div>\n    </div>\n    <div class=\"grp\">\n      <div class=\"gt\">智能体</div>\n      <div class=\"cards\">\n        <div class=\"card\"><div class=\"ico\">✦</div><div><b>agent 当队友</b><span>重复劳动交给它</span></div></div>\n        <div class=\"card\"><div class=\"ico\">⇄</div><div><b>人机共用流程</b><span>同一套工作流</span></div></div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"hint\">亲密性：相关的贴紧、不相关的拉开，看的人不用读文字就知道谁跟谁是一伙</div>\n<script>\n  // 参数状态：键名与 data/素材.js 的「参数」一一对应\n  const state = { zunei: 12, zujian: 40, yuanjiao: 12, yinying: 10, tiliang: 8, tubiao: 24,\n    zhucai: \"#5E6AD2\", di: \"#fafafa\", zi: \"#1a1a1a\", cizi: \"#6b6b6b\", kase: \"#ffffff\" };\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--zunei\", state.zunei + \"px\");\n    r.setProperty(\"--zujian\", state.zujian + \"px\");\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    r.setProperty(\"--yinying\", state.yinying);\n    r.setProperty(\"--tiliang\", state.tiliang);\n    r.setProperty(\"--tubiao\", state.tubiao + \"px\");\n    r.setProperty(\"--zhucai\", state.zhucai);\n    r.setProperty(\"--di\", state.di);\n    r.setProperty(\"--zi\", state.zi);\n    r.setProperty(\"--cizi\", state.cizi);\n    r.setProperty(\"--kase\", state.kase);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v176",
    标题: "磁吸",
    分类: "组件",
    子类: "操作",
    风格: ["通用"],
    场景: ["全站通用","移动端","通用模块区"],
    元素: ["动效","反馈"],
    搭配: ["跟随式按钮"],
    标签: ["磁吸","吸附","光标","反馈"],
    来源: "抖音·高级交互动效拆解（概念：元素近目标先遇阻力、接近后快速贴合，距离越近吸力越明显）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v176-磁吸.html",
    参数: [{"键":"radius","名":"激活半径(px)","类型":"slider","最小":60,"最大":260,"步长":5,"默认":150},{"键":"strength","名":"吸力强度","类型":"slider","最小":0.1,"最大":1,"步长":0.05,"默认":0.55},{"键":"spring","名":"回弹时长(秒)","类型":"slider","最小":0.15,"最大":0.9,"步长":0.05,"默认":0.45},{"键":"accent","名":"主色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"text","名":"文字色","类型":"color","默认":"#ffffff"}],
    效果说明: "构图笔记：反馈的强弱和方向建立操作可信度，磁吸让「可点」这件事提前被感知。\n元素靠近光标（目标）时先有阻力、几乎不动，越近吸力越强、快速贴合——用「先抗后吸」的曲线模拟真实吸附，比一靠近就贴上去更有重量感。\n能怎么改：拖「激活半径」看吸附范围、「吸力强度」看贴得多狠、「回弹时长」看松手归位的弹性。",
    用法: "把鼠标移到卡片附近：远时它不动（阻力），近了被吸过去；移开自动弹回。调「激活半径」改感应范围、「吸力强度」改贴合幅度。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：一组元素，光标进入「激活半径」内时被吸向光标；距离远时吸力弱（像有阻力），距离越近吸力越强、快速贴合，移开自动弹回原位。\n用法示例：导航按钮或卡片，鼠标靠近就轻轻「迎」上来，离开归位，制造可点击的预感。\n关键参数：radius 激活半径 150px（60–260）／ strength 吸力强度 0.55（0.1–1）／ spring 回弹时长 0.45s（0.15–0.9）／ accent 主色 #5E6AD2 ／ di 页面底色 #fafafa ／ text 文字色 #ffffff\n集成步骤：复制 assets/demos/v176-磁吸.html，吸力用 pow(1-距离/半径,1.7)*强度 制造「先抗后吸」；范围/强度/回弹都参数化。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>磁吸动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .zone { position: relative; width: min(440px, 92vw); height: 280px; border: 2px dashed color-mix(in srgb, var(--accent) 30%, transparent); border-radius: 20px; display: flex; align-items: center; justify-content: center; gap: 16px; }\n  .chip { width: 84px; height: 84px; border-radius: 18px; background: var(--accent); color: var(--text); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; will-change: transform; user-select: none; }\n</style>\n</head>\n<body>\n<div class=\"zone\" id=\"zone\">\n  <div class=\"chip\">磁吸 A</div>\n  <div class=\"chip\">磁吸 B</div>\n  <div class=\"chip\">磁吸 C</div>\n  \n</div>\n\n<script>\n  const state = { radius: 150, strength: 0.55, spring: 0.45, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#ffffff\" };\n  const chips = Array.from(document.querySelectorAll(\".chip\"));\n  const zone = document.getElementById(\"zone\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n  }\n  // 阻力再贴合：距离远时吸力弱（像有阻力），越近吸力越强（pow>1 制造「先抗后吸」手感）\n  zone.addEventListener(\"pointermove\", e => {\n    const zr = zone.getBoundingClientRect();\n    chips.forEach(c => {\n      const r = c.getBoundingClientRect();\n      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;\n      const dx = e.clientX - cx, dy = e.clientY - cy;\n      const dist = Math.hypot(dx, dy);\n      if (dist < state.radius) {\n        const pull = Math.pow(1 - dist / state.radius, 1.7) * state.strength;\n        c.style.transition = \"none\";\n        c.style.transform = \"translate(\" + (dx * pull) + \"px,\" + (dy * pull) + \"px) scale(\" + (1 + pull * 0.12) + \")\";\n      } else if (c.style.transform !== \"translate(0px,0px)\") {\n        c.style.transition = \"transform \" + state.spring + \"s cubic-bezier(.34,1.4,.5,1)\";\n        c.style.transform = \"translate(0px,0px) scale(1)\";\n      }\n    });\n  });\n  zone.addEventListener(\"pointerleave\", () => {\n    chips.forEach(c => {\n      c.style.transition = \"transform \" + state.spring + \"s cubic-bezier(.34,1.4,.5,1)\";\n      c.style.transform = \"translate(0px,0px) scale(1)\";\n    });\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v177",
    标题: "液态形变",
    分类: "动效",
    子类: "手势",
    风格: ["通用"],
    场景: ["全站通用","移动端","通用模块区"],
    元素: ["动效","反馈"],
    搭配: ["拖拽关闭"],
    标签: ["液态","形变","拖拽","速度"],
    来源: "抖音·高级交互动效拆解（概念：拖动时形变随速度变化，松手恢复，元素像有物理属性）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v177-液态形变.html",
    参数: [{"键":"deform","名":"形变强度","类型":"slider","最小":0.1,"最大":1,"步长":0.05,"默认":0.5},{"键":"recover","名":"回弹时长(秒)","类型":"slider","最小":0.15,"最大":0.9,"步长":0.05,"默认":0.5},{"键":"radius","名":"卡片圆角(px)","类型":"slider","最小":0,"最大":40,"步长":1,"默认":18},{"键":"accent","名":"卡片色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"text","名":"文字色","类型":"color","默认":"#ffffff"}],
    效果说明: "构图笔记：动效快慢、位移、缓动决定信息主次，统一手感比花哨重要；这里让「速度」本身可见。\n拖动卡片时，它沿拖动方向被拉伸、垂直方向压扁，形变幅度正比于拖动速度——像一团有黏性的液体；松手用回弹曲线归位。\n能怎么改：拖「形变强度」看拉得多狠、「回弹时长」看恢复快慢、「卡片圆角」调外形。",
    用法: "按住卡片快速甩动：甩得越快越扁，停下回弹。调「形变强度」改形变量、「回弹时长」改恢复节奏。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：可拖动的卡片，拖动时沿运动方向拉伸、垂直方向压扁，形变量正比于拖动速度；松手用弹性曲线恢复原形。\n用法示例：列表里的卡片、可拖拽模块，拖动越快越「拉丝」，停下回弹，让元素像有物理属性。\n关键参数：deform 形变强度 0.5（0.1–1）／ recover 回弹时长 0.5s（0.15–0.9）／ radius 卡片圆角 18px（0–40）／ accent 卡片色 #5E6AD2 ／ di 页面底色 #fafafa ／ text 文字色 #ffffff\n集成步骤：复制 assets/demos/v177-液态形变.html，位移用「指针中心差」算，形变用速度归一化后乘强度；恢复用 cubic-bezier(.34,1.5,.5,1)。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>液态形变演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }\n  .card { width: 200px; height: 130px; border-radius: var(--radius); background: var(--accent); color: var(--text); padding: 16px; cursor: grab; touch-action: none; will-change: transform; user-select: none; display: flex; flex-direction: column; justify-content: center; gap: 6px; }\n  .card:active { cursor: grabbing; }\n  .card b { font-size: 16px; }\n  .card span { font-size: 12.5px; opacity: .85; }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\"><b>拖我甩一下</b><span>拖动越快，卡片被拉得越扁，松手回弹</span></div>\n\n<script>\n  const state = { deform: 0.5, recover: 0.5, radius: 18, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#ffffff\" };\n  const card = document.getElementById(\"card\");\n  let dragging = false, vx = 0, vy = 0, offX = 0, offY = 0, cx0 = 0, cy0 = 0;\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n  }\n  card.addEventListener(\"pointerdown\", e => {\n    dragging = true; card.setPointerCapture(e.pointerId);\n    const r = card.getBoundingClientRect();\n    cx0 = r.left + r.width / 2; cy0 = r.top + r.height / 2;\n    offX = e.clientX - cx0; offY = e.clientY - cy0;\n    vx = vy = 0; lastX = e.clientX; lastY = e.clientY;\n    card.style.transition = \"none\";\n  });\n  let lastX = 0, lastY = 0;\n  card.addEventListener(\"pointermove\", e => {\n    if (!dragging) return;\n    const dx = e.clientX - lastX, dy = e.clientY - lastY;\n    vx = vx * 0.6 + dx * 0.4; vy = vy * 0.6 + dy * 0.4;\n    lastX = e.clientX; lastY = e.clientY;\n    const tx = (e.clientX - offX) - cx0, ty = (e.clientY - offY) - cy0;\n    // 速度转形变：沿拖动方向拉伸、垂直方向压扁，幅度随 deform 调；速度归零时自动回正\n    const sp = Math.min(Math.hypot(vx, vy) / 40, 1);\n    const sx = 1 + sp * state.deform * 0.5 * (vx >= 0 ? 1 : -1);\n    const sy = 1 - sp * state.deform * 0.35;\n    const sk = (vy / 40) * state.deform * 6;\n    card.style.transform = \"translate(\" + tx + \"px,\" + ty + \"px) scale(\" + sx.toFixed(3) + \",\" + sy.toFixed(3) + \") skewX(\" + sk.toFixed(2) + \"deg)\";\n  });\n  function release() {\n    if (!dragging) return; dragging = false;\n    card.style.transition = \"transform \" + state.recover + \"s cubic-bezier(.34,1.5,.5,1)\";\n    card.style.transform = \"translate(0,0) scale(1,1) skewX(0deg)\";\n  }\n  card.addEventListener(\"pointerup\", release);\n  card.addEventListener(\"pointercancel\", release);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v178",
    标题: "3D 视差",
    分类: "背景",
    子类: "3D",
    风格: ["轻盈","通用"],
    场景: ["官网·品牌站","落地页·发布页","全站通用"],
    元素: ["构成","动效"],
    搭配: ["光标探照揭示 Hero"],
    标签: ["视差","纵深","空间感","鼠标"],
    来源: "抖音·高级交互动效拆解（概念：不同层级按不同速度位移，平面内容出空间感，帮用户聚焦当前内容）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v178-3D视差.html",
    参数: [{"键":"depth","名":"纵深差","类型":"slider","最小":0.1,"最大":1,"步长":0.05,"默认":0.6},{"键":"sens","名":"灵敏度","类型":"slider","最小":0.2,"最大":2,"步长":0.1,"默认":1},{"键":"radius","名":"焦点圆角(px)","类型":"slider","最小":0,"最大":40,"步长":1,"默认":16},{"键":"accent","名":"主色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"c2","名":"中层色","类型":"color","默认":"#cdd2ee"}],
    效果说明: "构图笔记：用留白、网格与层级秩序组织信息密度，视差靠「速度差」制造纵深而不堆阴影。\n鼠标移动时，背景层、中层、焦点层按不同系数位移（越靠前动得越多），平面内容立刻有空间层次；焦点层最突出，天然把视线吸过去。\n能怎么改：拖「纵深差」看三层拉开多少、「灵敏度」看跟手幅度、「焦点圆角」调焦点外形。",
    用法: "移动鼠标：三层按不同速度错位，平面变出纵深。调「纵深差」拉层次、「灵敏度」调跟手快慢。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：多层内容（背景/中层/焦点），鼠标移动时每层按不同位移系数平移，越靠前的层动得越多，制造 3D 纵深与焦点。\n用法示例：官网首屏、产品 hero，鼠标轻移背景缓缓退、焦点稳稳在前，空间感出来了。\n关键参数：depth 纵深差 0.6（0.1–1）／ sens 灵敏度 1（0.2–2）／ radius 焦点圆角 16px（0–40）／ accent 主色 #5E6AD2 ／ di 页面底色 #fafafa ／ c2 中层色 #cdd2ee\n集成步骤：复制 assets/demos/v178-3D视差.html，每层 transform = 偏移*系数*纵深*灵敏度；系数 back<mid<front。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>3D 视差演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; perspective: 800px; }\n  .scene { position: relative; width: min(420px, 92vw); height: 280px; transform-style: preserve-3d; }\n  .layer { position: absolute; left: 50%; top: 50%; border-radius: 16px; will-change: transform; }\n  .back { width: 240px; height: 160px; margin: -80px 0 0 -120px; background: color-mix(in srgb, var(--accent) 18%, transparent); filter: blur(2px); }\n  .mid { width: 180px; height: 120px; margin: -60px 0 0 -90px; background: var(--c2); box-shadow: 0 10px 30px rgba(0,0,0,.12); }\n  .front { width: 110px; height: 64px; margin: -32px 0 0 -55px; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; border-radius: var(--radius); }\n</style>\n</head>\n<body>\n<div class=\"scene\" id=\"scene\">\n  <div class=\"layer back\"></div>\n  <div class=\"layer mid\"></div>\n  <div class=\"layer front\">焦点内容</div>\n  \n</div>\n\n<script>\n  const state = { depth: 0.6, sens: 1, radius: 16, accent: \"#5E6AD2\", di: \"#fafafa\", c2: \"#cdd2ee\" };\n  const scene = document.getElementById(\"scene\");\n  const L = { back: scene.querySelector(\".back\"), mid: scene.querySelector(\".mid\"), front: scene.querySelector(\".front\") };\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--c2\", state.c2);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n  }\n  // 三层按「深度」分配位移系数：越靠前动得越多，越靠后动得越少，制造纵深\n  const F = { back: 0.15, mid: 0.45, front: 0.9 };\n  scene.addEventListener(\"pointermove\", e => {\n    const r = scene.getBoundingClientRect();\n    const ox = (e.clientX - (r.left + r.width / 2)) / r.width;\n    const oy = (e.clientY - (r.top + r.height / 2)) / r.height;\n    for (const k in L) {\n      const f = F[k] * state.depth * state.sens * 60;\n      L[k].style.transform = \"translate3d(\" + (ox * f) + \"px,\" + (oy * f) + \"px,0)\";\n    }\n  });\n  scene.addEventListener(\"pointerleave\", () => { for (const k in L) L[k].style.transform = \"translate3d(0,0,0)\"; });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v179",
    标题: "底部Tab",
    分类: "组件",
    子类: "导航",
    风格: ["通用"],
    场景: ["移动端","通用模块区","全站通用"],
    元素: ["布局","反馈"],
    搭配: ["侧边栏导航"],
    标签: ["底部导航","Tab","回弹","指示器"],
    来源: "抖音·高级交互动效拆解（概念：切换时背景先拉长再收缩回弹，导航状态变化更具生命力）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v179-底部Tab.html",
    参数: [{"键":"stretch","名":"拉伸幅度","类型":"slider","最小":1.05,"最大":2,"步长":0.05,"默认":1.4},{"键":"bounce","名":"回弹时长(秒)","类型":"slider","最小":0.15,"最大":0.9,"步长":0.05,"默认":0.45},{"键":"radius","名":"标签圆角(px)","类型":"slider","最小":0,"最大":40,"步长":1,"默认":20},{"键":"accent","名":"主色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"text","名":"文字色","类型":"color","默认":"#ffffff"}],
    效果说明: "构图笔记：靠反馈强弱方向一致性建立操作可信度，状态变化要让人「感觉得到」。\n底部 Tab 切换时，高亮背景先沿运动方向拉长、再回弹收住，状态切换有了生命感，而不是生硬瞬移。\n能怎么改：拖「拉伸幅度」看拉多长、「回弹时长」看弹多快、「标签圆角」调外形。",
    用法: "点不同 Tab：高亮块先拉长再弹回。调「拉伸幅度」改夸张程度、「回弹时长」改节奏。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：移动端底部 Tab 栏，切换标签时高亮指示块先沿方向拉伸、再回弹收住（stretch→bounce）。\n用法示例：App 底栏四个入口，点哪个哪个的指示块「窜一下」再定住，状态变化有生命力。\n关键参数：stretch 拉伸幅度 1.4（1.05–2）／ bounce 回弹时长 0.45s（0.15–0.9）／ radius 标签圆角 20px（0–40）／ accent 主色 #5E6AD2 ／ di 页面底色 #fafafa ／ text 文字色 #ffffff\n集成步骤：复制 assets/demos/v179-底部Tab.html，指示块用 keyframes 做 scaleX 拉伸再回落；位移与拉伸共用 bounce 缓动。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>底部 Tab 动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .stage { position: relative; width: min(420px, 92vw); height: 240px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 30px; }\n  .bar { position: relative; display: flex; gap: 6px; background: color-mix(in srgb, var(--accent) 8%, #fff); border: 1px solid color-mix(in srgb, var(--accent) 14%, transparent); padding: 6px; border-radius: 22px; }\n  .tab { position: relative; z-index: 1; border: none; background: transparent; color: color-mix(in srgb, var(--accent) 70%, #555); padding: 10px 16px; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: var(--radius); transition: color .3s ease; }\n  .tab.on { color: var(--text); }\n  .pill { position: absolute; z-index: 0; top: 6px; bottom: 6px; left: 6px; width: 60px; background: var(--accent); border-radius: var(--radius); transition: transform var(--bounce) cubic-bezier(.34,1.56,.5,1); }\n  .pill.stretch { animation: stretch var(--bounce) cubic-bezier(.34,1.56,.5,1); }\n  @keyframes stretch { 0% { transform: var(--pos) scaleX(1); } 35% { transform: var(--pos) scaleX(var(--stretch)); } 70% { transform: var(--pos) scaleX(.94); } 100% { transform: var(--pos) scaleX(1); } }\n</style>\n</head>\n<body>\n<div class=\"stage\">\n  \n  <div class=\"bar\" id=\"bar\">\n    <span class=\"pill\" id=\"pill\"></span>\n    <button class=\"tab on\">首页</button>\n    <button class=\"tab\">发现</button>\n    <button class=\"tab\">消息</button>\n    <button class=\"tab\">我的</button>\n  </div>\n</div>\n\n<script>\n  const state = { stretch: 1.4, bounce: 0.45, radius: 20, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#ffffff\" };\n  const bar = document.getElementById(\"bar\");\n  const pill = document.getElementById(\"pill\");\n  const tabs = Array.from(bar.querySelectorAll(\".tab\"));\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n    document.documentElement.style.setProperty(\"--bounce\", state.bounce + \"s\");\n    document.documentElement.style.setProperty(\"--stretch\", state.stretch);\n  }\n  function moveTo(i, anim) {\n    const t = tabs[i], r = t.getBoundingClientRect(), br = bar.getBoundingClientRect();\n    const x = r.left - br.left, w = r.width;\n    pill.style.width = w + \"px\";\n    const pos = \"translateX(\" + x + \"px)\";\n    pill.style.setProperty(\"--pos\", pos);\n    if (anim) {\n      pill.style.transition = \"none\";\n      pill.classList.remove(\"stretch\"); void pill.offsetWidth; pill.classList.add(\"stretch\");\n    } else {\n      pill.style.transition = \"transform \" + state.bounce + \"s cubic-bezier(.34,1.56,.5,1)\";\n      pill.style.transform = pos;\n    }\n    tabs.forEach((t2, j) => t2.classList.toggle(\"on\", j === i));\n  }\n  tabs.forEach((t, i) => t.addEventListener(\"click\", () => moveTo(i, true)));\n  function apply2() { apply(); requestAnimationFrame(() => moveTo(tabs.findIndex(t => t.classList.contains(\"on\")), false)); }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply2(); });\n  apply(); moveTo(0, false);\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v180",
    标题: "图片展开",
    分类: "组件",
    子类: "浮层",
    风格: ["通用","轻盈"],
    场景: ["作品集·叙事","电商·预订","全站通用"],
    元素: ["动效","构成"],
    搭配: ["全屏展开"],
    标签: ["共享元素","转场","FLIP","图片"],
    来源: "抖音·高级交互动效拆解（概念：小图到全屏保持视觉连续，转场更自然）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v180-图片展开.html",
    参数: [{"键":"dur","名":"过渡时长(秒)","类型":"slider","最小":0.2,"最大":1.2,"步长":0.05,"默认":0.5},{"键":"radius","名":"图片圆角(px)","类型":"slider","最小":0,"最大":40,"步长":1,"默认":16},{"键":"mask","名":"遮罩浓度","类型":"slider","最小":0.2,"最大":0.9,"步长":0.05,"默认":0.6},{"键":"accent","名":"关闭按钮色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"c1","名":"图片色1","类型":"color","默认":"#5E6AD2"},{"键":"c2","名":"图片色2","类型":"color","默认":"#b8c0ff"}],
    效果说明: "构图笔记：靠反馈强弱方向一致性建立操作可信度，转场要「连续」而非「替换」。\n点缩略图，它用 FLIP 从原位置无缝放大到全屏（记录首末矩形、下一帧再过渡），视觉不中断；关闭时原路收回。\n能怎么改：拖「过渡时长」看快慢、「遮罩浓度」看背景压暗、「图片圆角」调外形。",
    用法: "点任意缩略图：它无缝放大到全屏，关闭原路收回。调「过渡时长」改节奏、「遮罩浓度」改背景。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：图片网格，点缩略图用共享元素转场（FLIP）从原位无缝放大到全屏，关闭原路收回，视觉连续不跳变。\n用法示例：作品集、电商商品图，点小图直接长大成全屏，比「关旧开新」自然得多。\n关键参数：dur 过渡时长 0.5s（0.2–1.2）／ radius 图片圆角 16px（0–40）／ mask 遮罩浓度 0.6（0.2–0.9）／ accent 关闭按钮色 #5E6AD2 ／ di 页面底色 #fafafa ／ c1 图片色1 #5E6AD2 ／ c2 图片色2 #b8c0ff\n集成步骤：复制 assets/demos/v180-图片展开.html，展开前记 getBoundingClientRect，下一帧设全屏目标位；回收用同矩形反向过渡。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>图片展开演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: min(420px, 92vw); }\n  .thumb { aspect-ratio: 1; border-radius: var(--radius); cursor: pointer; background: linear-gradient(135deg, var(--c1), var(--c2)); transition: transform .2s ease; }\n  .thumb:hover { transform: translateY(-3px); }\n  .backdrop { position: fixed; inset: 0; background: #000; opacity: 0; transition: opacity var(--dur) ease; z-index: 5; }\n  .hero { position: fixed; z-index: 6; background: linear-gradient(135deg, var(--c1), var(--c2)); border-radius: var(--radius); transition: all var(--dur) cubic-bezier(.4,0,.2,1); will-change: transform, width, height, top, left, border-radius; }\n  .close { position: fixed; z-index: 7; top: 16px; right: 16px; width: 38px; height: 38px; border-radius: 50%; border: none; background: var(--accent); color: #fff; font-size: 18px; cursor: pointer; opacity: 0; transition: opacity var(--dur) ease; }\n</style>\n</head>\n<body>\n<div class=\"grid\" id=\"grid\">\n  <div class=\"thumb\"></div><div class=\"thumb\"></div><div class=\"thumb\"></div>\n  <div class=\"thumb\"></div><div class=\"thumb\"></div><div class=\"thumb\"></div>\n</div>\n<div class=\"backdrop\" id=\"backdrop\"></div>\n<div class=\"close\" id=\"close\">×</div>\n\n<script>\n  const state = { dur: 0.5, radius: 16, mask: 0.6, accent: \"#5E6AD2\", di: \"#fafafa\", c1: \"#5E6AD2\", c2: \"#b8c0ff\" };\n  const grid = document.getElementById(\"grid\");\n  const backdrop = document.getElementById(\"backdrop\");\n  const closeBtn = document.getElementById(\"close\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--c1\", state.c1);\n    document.documentElement.style.setProperty(\"--c2\", state.c2);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n    document.documentElement.style.setProperty(\"--dur\", state.dur + \"s\");\n    backdrop.style.background = \"rgba(0,0,0,\" + state.mask + \")\";\n  }\n  let hero = null, srcEl = null;\n  function open(t) {\n    if (hero) return;\n    srcEl = t;\n    const r = t.getBoundingClientRect();\n    hero = document.createElement(\"div\");\n    hero.className = \"hero\";\n    hero.style.left = r.left + \"px\"; hero.style.top = r.top + \"px\";\n    hero.style.width = r.width + \"px\"; hero.style.height = r.height + \"px\";\n    document.body.appendChild(hero);\n    // FLIP：下一帧再放到全屏目标位，过渡自然连续\n    requestAnimationFrame(() => {\n      const W = innerWidth, H = innerHeight, pad = Math.min(W, H) * 0.08;\n      const w = W - pad * 2, h = w * 0.66;\n      hero.style.left = pad + \"px\"; hero.style.top = (H - h) / 2 + \"px\";\n      hero.style.width = w + \"px\"; hero.style.height = h + \"px\"; hero.style.borderRadius = \"0px\";\n    });\n    backdrop.style.opacity = \"1\"; closeBtn.style.opacity = \"1\";\n  }\n  function shut() {\n    if (!hero) return;\n    const r = srcEl.getBoundingClientRect();\n    hero.style.left = r.left + \"px\"; hero.style.top = r.top + \"px\";\n    hero.style.width = r.width + \"px\"; hero.style.height = r.height + \"px\"; hero.style.borderRadius = state.radius + \"px\";\n    backdrop.style.opacity = \"0\"; closeBtn.style.opacity = \"0\";\n    const h = hero; hero = null;\n    setTimeout(() => h.remove(), state.dur * 1000 + 30);\n  }\n  grid.querySelectorAll(\".thumb\").forEach(t => t.addEventListener(\"click\", () => open(t)));\n  backdrop.addEventListener(\"click\", shut); closeBtn.addEventListener(\"click\", shut);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v181",
    标题: "多元素联动",
    分类: "动效",
    子类: "手势",
    风格: ["通用"],
    场景: ["全站通用","工具·SaaS","通用模块区"],
    元素: ["动效","构成"],
    搭配: ["碰撞散射"],
    标签: ["物理","碰撞","推挤","重量"],
    来源: "抖音·高级交互动效拆解（概念：元素间碰撞推挤，不同大小设不同运动重量，统一物理规则）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v181-多元素联动.html",
    参数: [{"键":"push","名":"推力","类型":"slider","最小":0.2,"最大":2,"步长":0.1,"默认":1},{"键":"friction","名":"摩擦(越小越快停)","类型":"slider","最小":0.8,"最大":0.98,"步长":0.01,"默认":0.92},{"键":"weight","名":"大小重量差","类型":"slider","最小":0.6,"最大":2.2,"步长":0.1,"默认":1.4},{"键":"accent","名":"拖拽球色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"c2","名":"其他球色","类型":"color","默认":"#cdd2ee"}],
    效果说明: "构图笔记：动效快慢、位移、缓动决定主次；这里用一个「物理规则」统管所有元素。\n拖动一个元素，其余元素被碰撞推开；大的质量大、动得少，小的被推得更远——所有元素遵循同一套推挤与摩擦，整体像真有重量。\n能怎么改：拖「推力」看推多远、「摩擦」看停多快、「大小重量差」看大球多「沉」。",
    用法: "拖动任意球：别的球被推开，大的动得少。调「推力」改排斥力、「摩擦」改衰减、「大小重量差」改质量差。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：多个可拖拽元素，拖动一个时其余被碰撞/排斥推开；每个元素质量=大小，重叠位移按质量反比分摊，大的动得少。\n用法示例：看板卡片、悬浮控件群，拖动一个其余让位，且大小不同「重量」不同，物理感统一。\n关键参数：push 推力 1（0.2–2）／ friction 摩擦 0.92（0.8–0.98）／ weight 大小重量差 1.4（0.6–2.2）／ accent 拖拽球色 #5E6AD2 ／ di 页面底色 #fafafa ／ c2 其他球色 #cdd2ee\n集成步骤：复制 assets/demos/v181-多元素联动.html，两两距离<半径和时按重叠*推力分摊位移，除以各自质量；加速度衰减。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>多元素联动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .field { position: relative; width: min(440px, 92vw); height: 300px; border-radius: 18px; border: 2px dashed color-mix(in srgb, var(--accent) 25%, transparent); touch-action: none; }\n  .ball { position: absolute; border-radius: 50%; will-change: transform; cursor: grab; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; }\n  .ball:active { cursor: grabbing; }\n</style>\n</head>\n<body>\n<div class=\"field\" id=\"field\">\n  \n</div>\n\n<script>\n  const state = { push: 1, friction: 0.92, weight: 1.4, accent: \"#5E6AD2\", di: \"#fafafa\", c2: \"#cdd2ee\" };\n  const field = document.getElementById(\"field\");\n  let balls = [];\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--c2\", state.c2);\n  }\n  function build() {\n    field.querySelectorAll(\".ball\").forEach(b => b.remove());\n    balls = [];\n    const W = field.clientWidth, H = field.clientHeight;\n    const n = 5, base = 30;\n    for (let i = 0; i < n; i++) {\n      const big = i % 2 === 0;\n      const r = base * (big ? state.weight : 1 / Math.max(state.weight, 1));\n      const el = document.createElement(\"div\");\n      el.className = \"ball\";\n      el.style.width = el.style.height = (r * 2) + \"px\";\n      el.style.background = i === 0 ? state.accent : state.c2;\n      el.textContent = i === 0 ? \"拖我\" : \"\";\n      field.appendChild(el);\n      balls.push({ x: 40 + i * (W - 80) / (n - 1), y: H / 2 + (i % 2 ? 40 : -40), r, mass: r, el, vx: 0, vy: 0 });\n    }\n  }\n  let drag = null, px = 0, py = 0;\n  field.addEventListener(\"pointerdown\", e => {\n    const b = e.target.closest(\".ball\"); if (!b) return;\n    drag = balls.find(x => x.el === b); drag.el.setPointerCapture(e.pointerId);\n    px = e.clientX; py = e.clientY;\n  });\n  field.addEventListener(\"pointermove\", e => {\n    if (!drag) return;\n    const r = field.getBoundingClientRect();\n    drag.x = Math.max(drag.r, Math.min(r.width - drag.r, e.clientX - r.left));\n    drag.y = Math.max(drag.r, Math.min(r.height - drag.r, e.clientY - r.top));\n    drag.vx = e.clientX - px; drag.vy = e.clientY - py; px = e.clientX; py = e.clientY;\n  });\n  field.addEventListener(\"pointerup\", () => drag = null);\n  function step() {\n    const W = field.clientWidth, H = field.clientHeight;\n    for (let i = 0; i < balls.length; i++) {\n      const a = balls[i];\n      if (a !== drag) { a.x += a.vx; a.y += a.vy; a.vx *= state.friction; a.vy *= state.friction; }\n      // 边界\n      if (a.x < a.r) { a.x = a.r; a.vx *= -0.5; }\n      if (a.x > W - a.r) { a.x = W - a.r; a.vx *= -0.5; }\n      if (a.y < a.r) { a.y = a.r; a.vy *= -0.5; }\n      if (a.y > H - a.r) { a.y = H - a.r; a.vy *= -0.5; }\n    }\n    // 两两排斥：重叠部分按质量分摊位移，重的动得少\n    for (let i = 0; i < balls.length; i++) for (let j = i + 1; j < balls.length; j++) {\n      const a = balls[i], b = balls[j];\n      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.01;\n      const min = a.r + b.r;\n      if (d < min) {\n        const ov = (min - d) * state.push * 0.5, nx = dx / d, ny = dy / d;\n        const ta = b.mass / (a.mass + b.mass), tb = a.mass / (a.mass + b.mass);\n        if (a !== drag) { a.x -= nx * ov * ta; a.y -= ny * ov * ta; }\n        if (b !== drag) { b.x += nx * ov * tb; b.y += ny * ov * tb; }\n      }\n    }\n    for (const a of balls) a.el.style.transform = \"translate(\" + (a.x - a.r) + \"px,\" + (a.y - a.r) + \"px)\";\n    requestAnimationFrame(step);\n  }\n  function rebuild() { apply(); build(); }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; if (d.key === \"weight\") build(); else apply(); });\n  build(); step();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v182",
    标题: "按钮滑出取消",
    分类: "组件",
    子类: "操作",
    风格: ["通用"],
    场景: ["移动端","全站通用","通用模块区"],
    元素: ["反馈","视觉"],
    搭配: ["按压回弹"],
    标签: ["滑出取消","按压","误触","手势"],
    来源: "抖音·高级交互动效拆解（概念：按住下沉变暗，手指移出范围取消，外部松手不触发）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v182-按钮滑出取消.html",
    参数: [{"键":"depth","名":"按压深度(px)","类型":"slider","最小":1,"最大":12,"步长":1,"默认":6},{"键":"spring","名":"回弹时长(秒)","类型":"slider","最小":0.1,"最大":0.6,"步长":0.05,"默认":0.3},{"键":"radius","名":"按钮圆角(px)","类型":"slider","最小":0,"最大":40,"步长":1,"默认":14},{"键":"accent","名":"按钮色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"text","名":"文字色","类型":"color","默认":"#ffffff"}],
    效果说明: "构图笔记：每次点击都该让用户「感觉得到」结果；更要能反悔——这正是高频痛点。\n按住按钮下沉、变暗（按压反馈）；手指移出按钮范围就取消按压，在按钮外松手不触发点击——给「误触」一个零成本的退出通道。\n能怎么改：拖「按压深度」看沉多深、「回弹时长」看恢复快慢、「按钮圆角」调外形。",
    用法: "按住按钮：下沉变暗；手指滑出范围取消，外部松手不发送。调「按压深度」改反馈、「回弹时长」改节奏。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：按住按钮下沉+变暗；拖动手指移出按钮范围即取消按压态，按钮外松手不触发点击——给误触一个零成本退出。\n用法示例：发送、删除、录音等「按了就生效」的按钮，按住先给按压反馈，滑出即取消。\n关键参数：depth 按压深度 6px（1–12）／ spring 回弹时长 0.3s（0.1–0.6）／ radius 按钮圆角 14px（0–40）／ accent 按钮色 #5E6AD2 ／ di 页面底色 #fafafa ／ text 文字色 #ffffff\n集成步骤：复制 assets/demos/v182-按钮滑出取消.html，pointermove 时判断指针是否在按钮矩形内决定按压态；松手按是否在范围内决定触发。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>按钮滑出取消演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; overflow: hidden; }\n  .btn { position: relative; padding: 16px 34px; border: none; border-radius: var(--radius); background: var(--accent); color: var(--text); font-size: 15px; font-weight: 700; cursor: pointer; user-select: none; touch-action: none; transition: transform var(--spring) ease, filter var(--spring) ease; will-change: transform; }\n  .btn.down { transform: translateY(var(--depth)) scale(.98); filter: brightness(.82); }\n  .btn.done { background: #2e9e5b; }\n  .status { font-size: 12.5px; color: color-mix(in srgb, var(--accent) 55%, #888); }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">按住发送</button>\n<div class=\"status\" id=\"status\">按住按钮：下沉变暗；手指移出范围就取消，外部松手不触发</div>\n\n<script>\n  const state = { depth: 6, spring: 0.3, radius: 14, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#ffffff\" };\n  const btn = document.getElementById(\"btn\");\n  const status = document.getElementById(\"status\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n    document.documentElement.style.setProperty(\"--depth\", state.depth + \"px\");\n    document.documentElement.style.setProperty(\"--spring\", state.spring + \"s\");\n  }\n  let pressing = false;\n  function inside(e) { const r = btn.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; }\n  btn.addEventListener(\"pointerdown\", e => { pressing = true; btn.classList.add(\"down\"); btn.setPointerCapture(e.pointerId); });\n  btn.addEventListener(\"pointermove\", e => {\n    // 移出按钮范围即取消按压（视觉复位），移回再按下——松手时按当前是否在范围内决定\n    if (pressing && !inside(e)) { btn.classList.remove(\"down\"); }\n    else if (pressing && inside(e)) { btn.classList.add(\"down\"); }\n  });\n  btn.addEventListener(\"pointerup\", e => {\n    if (!pressing) return; pressing = false;\n    if (inside(e) && btn.classList.contains(\"down\")) {\n      btn.classList.remove(\"down\"); btn.classList.add(\"done\"); btn.textContent = \"已发送 ✓\";\n      status.textContent = \"在按钮内松手 → 触发发送\";\n      setTimeout(() => { btn.classList.remove(\"done\"); btn.textContent = \"按住发送\"; status.textContent = \"按住按钮：下沉变暗；手指移出范围就取消，外部松手不触发\"; }, 1100);\n    } else {\n      btn.classList.remove(\"down\"); status.textContent = \"手指移出后松手 → 已取消，不触发\";\n      setTimeout(() => status.textContent = \"按住按钮：下沉变暗；手指移出范围就取消，外部松手不触发\", 1100);\n    }\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v183",
    标题: "文字局部过渡",
    分类: "组件",
    子类: "状态反馈",
    风格: ["通用"],
    场景: ["全站通用","工具·SaaS","通用模块区"],
    元素: ["反馈","视觉"],
    搭配: ["数字滚动"],
    标签: ["局部过渡","筛选","数字滚动","确认"],
    来源: "抖音·高级交互动效拆解（概念：切换筛选条件时仅更新变化文字，保留说明、数字滚动更新）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v183-文字局部过渡.html",
    参数: [{"键":"dur","名":"滚动时长(秒)","类型":"slider","最小":0.2,"最大":1.2,"步长":0.05,"默认":0.6},{"键":"radius","名":"卡片圆角(px)","类型":"slider","最小":0,"最大":40,"步长":1,"默认":16},{"键":"accent","名":"主色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"num","名":"数字色","类型":"color","默认":"#5E6AD2"}],
    效果说明: "构图笔记：反馈要帮用户「确认操作结果」；只动该动的部分，减少视觉噪音。\n切换筛选条件（如月份）时，说明文字原样保留，只有数字滚动到新值、月份标签切换——用户一眼确认「变了什么、没变什么」，不丢失上下文。\n能怎么改：拖「滚动时长」看数字滚多快、「卡片圆角」调外形、换色改主色与数字色。",
    用法: "切月份：说明文字不动，只有数字滚动到新值。调「滚动时长」改数字动画快慢。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：筛选条件切换时，说明文字保持不变，仅变化的部分（如数字、当前项标签）做局部过渡，数字滚动更新。\n用法示例：数据卡切月份/地区，说明不动、数字滚到新值，用户快速确认操作结果不丢上下文。\n关键参数：dur 滚动时长 0.6s（0.2–1.2）／ radius 卡片圆角 16px（0–40）／ accent 主色 #5E6AD2 ／ di 页面底色 #fafafa ／ num 数字色 #5E6AD2\n集成步骤：复制 assets/demos/v183-文字局部过渡.html，切项时只重渲染变化节点，数字加 roll 动画；说明节点不重绘。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>文字局部过渡演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .card { width: min(380px, 92vw); background: #fff; border: 1px solid color-mix(in srgb, var(--accent) 14%, transparent); border-radius: var(--radius); padding: 22px; box-shadow: 0 8px 24px rgba(0,0,0,.06); }\n  .desc { font-size: 12.5px; color: #888; margin-bottom: 14px; }\n  .row { display: flex; align-items: baseline; gap: 12px; }\n  .num { font-size: 40px; font-weight: 800; color: var(--num); font-variant-numeric: tabular-nums; line-height: 1; }\n  .num.roll { animation: roll var(--dur) cubic-bezier(.22,1,.36,1); }\n  @keyframes roll { 0% { transform: translateY(40%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }\n  .unit { font-size: 14px; color: #666; }\n  .tabs { display: flex; gap: 8px; margin-top: 18px; }\n  .mtab { flex: 1; padding: 9px 0; border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent); background: transparent; color: #555; border-radius: 10px; font-size: 13px; cursor: pointer; transition: all .2s; }\n  .mtab.on { background: var(--accent); color: #fff; border-color: var(--accent); }\n</style>\n</head>\n<body>\n<div class=\"card\">\n  <div class=\"desc\" id=\"desc\">说明文字保持不变，只更新数字与月份。</div>\n  <div class=\"row\">\n    <div class=\"num\" id=\"num\">1280</div>\n    <div class=\"unit\">次访问</div>\n  </div>\n  <div class=\"tabs\" id=\"tabs\">\n    <button class=\"mtab\">1月</button><button class=\"mtab on\">2月</button><button class=\"mtab\">3月</button><button class=\"mtab\">4月</button>\n  </div>\n  \n</div>\n\n<script>\n  const state = { dur: 0.6, radius: 16, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#1a1a1a\", num: \"#5E6AD2\" };\n  const numEl = document.getElementById(\"num\");\n  const tabs = Array.from(document.querySelectorAll(\".mtab\"));\n  const DATA = [980, 1280, 1540, 1110];\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--num\", state.num);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n    document.documentElement.style.setProperty(\"--dur\", state.dur + \"s\");\n  }\n  function setMonth(i) {\n    tabs.forEach((t, j) => t.classList.toggle(\"on\", j === i));\n    numEl.textContent = DATA[i];\n    numEl.classList.remove(\"roll\"); void numEl.offsetWidth; numEl.classList.add(\"roll\");\n  }\n  tabs.forEach((t, i) => t.addEventListener(\"click\", () => setMonth(i)));\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v184",
    标题: "跟手返回",
    分类: "动效",
    子类: "手势",
    风格: ["通用"],
    场景: ["移动端","全站通用","通用模块区"],
    元素: ["动效","反馈"],
    搭配: ["拖拽关闭"],
    标签: ["边缘返回","跟手","阈值","手势"],
    来源: "抖音·高级交互动效拆解（概念：屏幕边缘拖动触发返回，页面跟手移动，按距离/速度/方向决定返回或恢复）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v184-跟手返回.html",
    参数: [{"键":"edge","名":"触发边距(px)","类型":"slider","最小":8,"最大":60,"步长":2,"默认":24},{"键":"thresh","名":"完成阈值(%)","类型":"slider","最小":20,"最大":70,"步长":5,"默认":40},{"键":"spring","名":"回弹时长(秒)","类型":"slider","最小":0.15,"最大":0.8,"步长":0.05,"默认":0.4},{"键":"accent","名":"页面色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"底色","类型":"color","默认":"#fafafa"},{"键":"text","名":"文字色","类型":"color","默认":"#ffffff"}],
    效果说明: "构图笔记：动效进度完全跟随手势，用户随时夺回控制权——直接治「反悔/误触」。\n从屏幕左边缘右滑：当前页跟手平移、返回箭头随进度淡入；松手按「拖动距离 + 甩动速度 + 方向」决定完成返回还是弹回，中途往回带即可收回。\n能怎么改：拖「触发边距」改从多近开始、「完成阈值」改多远算返回、「回弹时长」改弹回节奏。",
    用法: "左边缘按住右拖：页面跟手走；拖够远或甩得快就返回，否则弹回。调「完成阈值」改触发难度。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：屏幕左边缘右滑触发返回，页面 translateX 跟手移动、返回箭头随进度淡入；松手按 距离+速度+方向 决定返回或弹回，中途回带可取消。\n用法示例：App 内页返回上一级，手势进度=动画进度，不跟手就收回，避免误触跳出。\n关键参数：edge 触发边距 24px（8–60）／ thresh 完成阈值 40%（20–70）／ spring 回弹时长 0.4s（0.15–0.8）／ accent 页面色 #5E6AD2 ／ di 底色 #fafafa ／ text 文字色 #ffffff\n集成步骤：复制 assets/demos/v184-跟手返回.html，pointerdown 限左边缘内触发；松手 距离>阈值% 或 速度>阈值 且向右 即返回，否则弹回。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>跟手返回演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .stage { position: relative; width: min(420px, 92vw); height: 280px; border-radius: 18px; overflow: hidden; background: #fff; border: 1px solid color-mix(in srgb, var(--accent) 16%, transparent); touch-action: none; }\n  .page { position: absolute; inset: 0; background: var(--accent); color: var(--text); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; will-change: transform; }\n  .page h3 { font-size: 18px; }\n  .page p { font-size: 12.5px; opacity: .85; }\n  .arrow { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.9); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 20px; opacity: 0; transition: opacity .1s; }\n  .edge { position: absolute; left: 0; top: 0; bottom: 0; width: var(--edge); }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"page\" id=\"page\"><h3>当前页面</h3><p>从左侧边缘右滑返回上一页</p></div>\n  <div class=\"arrow\" id=\"arrow\">‹</div>\n  <div class=\"edge\" id=\"edge\"></div>\n  \n</div>\n\n<script>\n  const state = { edge: 24, thresh: 40, spring: 0.4, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#ffffff\" };\n  const stage = document.getElementById(\"stage\");\n  const page = document.getElementById(\"page\");\n  const arrow = document.getElementById(\"arrow\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--edge\", state.edge + \"px\");\n  }\n  let drag = false, startX = 0, lastX = 0, lastT = 0, vel = 0;\n  stage.addEventListener(\"pointerdown\", e => {\n    const r = stage.getBoundingClientRect();\n    if (e.clientX - r.left > state.edge) return;\n    drag = true; startX = e.clientX; lastX = e.clientX; lastT = performance.now(); vel = 0;\n    page.style.transition = \"none\"; stage.setPointerCapture(e.pointerId);\n  });\n  stage.addEventListener(\"pointermove\", e => {\n    if (!drag) return;\n    let dx = e.clientX - startX; if (dx < 0) dx *= 0.3; // 向左有边界阻尼，不能拖出屏幕\n    const w = stage.clientWidth;\n    page.style.transform = \"translateX(\" + dx + \"px)\";\n    arrow.style.opacity = Math.min(dx / (w * 0.4), 1);\n    const now = performance.now(), dt = now - lastT || 16; vel = (e.clientX - lastX) / dt; lastX = e.clientX; lastT = now;\n  });\n  stage.addEventListener(\"pointerup\", e => {\n    if (!drag) return; drag = false;\n    const w = stage.clientWidth, dx = e.clientX - startX;\n    const go = dx > w * state.thresh / 100 || (vel > 0.6 && dx > 20);\n    page.style.transition = \"transform \" + state.spring + \"s cubic-bezier(.4,0,.2,1)\";\n    if (go) {\n      page.style.transform = \"translateX(\" + w + \"px)\";\n      setTimeout(() => {\n        page.querySelector(\"h3\").textContent = \"已返回上一页\"; page.querySelector(\"p\").textContent = \"（演示：回到上一级）\";\n        page.style.transition = \"none\"; page.style.transform = \"translateX(0)\";\n        setTimeout(() => { page.querySelector(\"h3\").textContent = \"当前页面\"; page.querySelector(\"p\").textContent = \"从左侧边缘右滑返回上一页\"; }, 700);\n      }, state.spring * 1000);\n    } else {\n      page.style.transform = \"translateX(0)\";\n    }\n    arrow.style.opacity = 0;\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v185",
    标题: "叠卡扇动",
    分类: "动效",
    子类: "入场出场",
    风格: ["通用"],
    场景: ["全站通用","作品集·叙事","通用模块区"],
    元素: ["动效","构成"],
    搭配: ["卡片堆叠"],
    标签: ["扇形","支点外置","展开","卡片"],
    来源: "抖音·高级交互动效拆解（概念：变换原点移到卡片外，折叠展开共用同一布局）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v185-叠卡扇动.html",
    参数: [{"键":"spread","名":"展开总角度(°)","类型":"slider","最小":10,"最大":60,"步长":2,"默认":38},{"键":"origin","名":"支点距离(px)","类型":"slider","最小":60,"最大":400,"步长":10,"默认":220},{"键":"radius","名":"卡片圆角(px)","类型":"slider","最小":0,"最大":30,"步长":1,"默认":14},{"键":"accent","名":"顶卡色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"c2","名":"其余卡色","类型":"color","默认":"#cdd2ee"}],
    效果说明: "构图笔记：入场出场用统一布局减少跳变；把支点外置是让「展开」不换元件的诀窍。\n卡片叠放时，把变换原点（transform-origin）移到卡片之外的某点，展开时每张绕该外置支点旋转成扇形——折叠与展开共用同一套 DOM，不重建不跳变。\n能怎么改：拖「展开总角度」看扇多大、「支点距离」看绕哪转、「卡片圆角」调外形。",
    用法: "点「展开/收起」：卡片绕外部支点扇形张开或叠回。调「展开总角度」改扇幅、「支点距离」改旋转中心。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：叠放的卡片，把 transform-origin 设到卡片外某点，展开时各卡绕该外置支点旋转成扇形；折叠/展开共用同一布局。\n用法示例：手风琴菜单、卡片组，点一下扇形展开，再点收回，不重建 DOM。\n关键参数：spread 展开总角度 38°（10–60）／ origin 支点距离 220px（60–400）／ radius 卡片圆角 14px（0–30）／ accent 顶卡色 #5E6AD2 ／ di 页面底色 #fafafa ／ c2 其余卡色 #cdd2ee\n集成步骤：复制 assets/demos/v185-叠卡扇动.html，transform-origin:50% 支点距离；rotate = (i-中) * 总角度/(n-1)。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>叠卡扇动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; overflow: hidden; }\n  .fan { position: relative; width: 240px; height: 180px; }\n  .card { position: absolute; left: 50%; bottom: 0; width: 150px; height: 110px; margin-left: -75px; background: var(--c2); border-radius: var(--radius); box-shadow: 0 8px 20px rgba(0,0,0,.15); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #333; transform-origin: 50% var(--origin); transition: transform .45s cubic-bezier(.34,1.4,.5,1); will-change: transform; }\n  .card.top { background: var(--accent); color: #fff; }\n  .toggle { padding: 11px 26px; border: none; border-radius: 12px; background: var(--accent); color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; }\n</style>\n</head>\n<body>\n<div class=\"fan\" id=\"fan\">\n  <div class=\"card\">卡片 3</div>\n  <div class=\"card\">卡片 2</div>\n  <div class=\"card top\">卡片 1</div>\n</div>\n<button class=\"toggle\" id=\"toggle\">展开 / 收起</button>\n\n<script>\n  const state = { spread: 38, origin: 220, radius: 14, accent: \"#5E6AD2\", di: \"#fafafa\", c2: \"#cdd2ee\" };\n  const fan = document.getElementById(\"fan\");\n  const cards = Array.from(fan.querySelectorAll(\".card\"));\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--c2\", state.c2);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n    document.documentElement.style.setProperty(\"--origin\", state.origin + \"px\");\n  }\n  let open = false;\n  function layout() {\n    const n = cards.length;\n    cards.forEach((c, i) => {\n      if (open) {\n        // 以卡片外的点为支点，逐张旋转张开成扇形\n        const mid = (n - 1) / 2, rot = (i - mid) * (state.spread / (n - 1));\n        c.style.transform = \"rotate(\" + rot + \"deg) translateY(\" + (-Math.abs(i - mid) * 10) + \"px)\";\n      } else {\n        c.style.transform = \"rotate(0deg) translateY(0)\";\n      }\n    });\n  }\n  document.getElementById(\"toggle\").addEventListener(\"click\", () => { open = !open; layout(); });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); layout(); });\n  apply(); layout();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v186",
    标题: "滚轮吸附",
    分类: "动效",
    子类: "转场滚动",
    风格: ["通用"],
    场景: ["全站通用","后台·数据看板","通用模块区"],
    元素: ["动效","构成"],
    搭配: ["转场衔接"],
    标签: ["滚轮","惯性","吸附","分页"],
    来源: "抖音·高级交互动效拆解（概念：松手后速度逐帧衰减，临近停止再吸附定位）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v186-滚轮吸附.html",
    参数: [{"键":"friction","名":"摩擦(越小越快停)","类型":"slider","最小":0.85,"最大":0.98,"步长":0.01,"默认":0.92},{"键":"snap","名":"吸附强度","类型":"slider","最小":0.05,"最大":0.4,"步长":0.01,"默认":0.18},{"键":"radius","名":"面板圆角(px)","类型":"slider","最小":0,"最大":40,"步长":1,"默认":16},{"键":"accent","名":"页面色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"底色","类型":"color","默认":"#fafafa"},{"键":"c2","名":"次页色","类型":"color","默认":"#cdd2ee"}],
    效果说明: "构图笔记：在时间维度制造节奏，滚动类动效要「有惯性也有落点」。\n滚轮滚动累加速度，松手后速度逐帧衰减（摩擦），临近停止时再被吸到最近的整页/整项——既有惯性手感，又不会停在奇怪的半页。\n能怎么改：拖「摩擦」看滑多久、「吸附强度」看吸多快、「面板圆角」调外形。",
    用法: "滚轮滚动：速度逐帧衰减，快停时吸到最近一页。调「摩擦」改滑动惯性、「吸附强度」改归位力度。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：可滚轮翻页的区域，滚动累加速度、松手后速度逐帧×摩擦衰减，速度够小再被吸到最近整页。\n用法示例：全屏分页、轮播、长列表分段，滚轮有惯性但最终整齐落页，不卡半页。\n关键参数：friction 摩擦 0.92（0.85–0.98）／ snap 吸附强度 0.18（0.05–0.4）／ radius 面板圆角 16px（0–40）／ accent 页面色 #5E6AD2 ／ di 底色 #fafafa ／ c2 次页色 #cdd2ee\n集成步骤：复制 assets/demos/v186-滚轮吸附.html，wheel 累加速度；rAF 里 位置+=速度、速度*=摩擦；慢时 位置+=(目标页-位置)*吸附。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>滚轮吸附演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; overflow: hidden; }\n  .pager { position: relative; width: min(360px, 92vw); height: 240px; overflow: hidden; border-radius: var(--radius); border: 1px solid color-mix(in srgb, var(--accent) 16%, transparent); }\n  .track { position: absolute; top: 0; left: 0; width: 100%; will-change: transform; }\n  .panel { height: 240px; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 800; color: #fff; }\n  .panel:nth-child(odd) { background: var(--accent); }\n  .panel:nth-child(even) { background: var(--c2); color: #333; }\n  .dots { display: flex; gap: 8px; }\n  .dot { width: 8px; height: 8px; border-radius: 50%; background: color-mix(in srgb, var(--accent) 30%, #ccc); transition: all .2s; }\n  .dot.on { background: var(--accent); transform: scale(1.4); }\n</style>\n</head>\n<body>\n<div class=\"pager\" id=\"pager\"><div class=\"track\" id=\"track\">\n  <div class=\"panel\">页 1</div><div class=\"panel\">页 2</div><div class=\"panel\">页 3</div><div class=\"panel\">页 4</div>\n</div></div>\n<div class=\"dots\" id=\"dots\"></div>\n\n<script>\n  const state = { friction: 0.92, snap: 0.18, radius: 16, accent: \"#5E6AD2\", di: \"#fafafa\", c2: \"#cdd2ee\" };\n  const pager = document.getElementById(\"pager\");\n  const track = document.getElementById(\"track\");\n  const dots = document.getElementById(\"dots\");\n  const H = 240, N = 4;\n  let pos = 0, vel = 0;\n  for (let i = 0; i < N; i++) { const d = document.createElement(\"div\"); d.className = \"dot\"; dots.appendChild(d); }\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--c2\", state.c2);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n  }\n  pager.addEventListener(\"wheel\", e => {\n    e.preventDefault();\n    vel += e.deltaY * 0.6;\n    vel = Math.max(-60, Math.min(60, vel));\n  }, { passive: false });\n  function step() {\n    pos += vel; vel *= state.friction;\n    const max = (N - 1) * H;\n    if (Math.abs(vel) < 1.2) {\n      const target = Math.max(0, Math.min(max, Math.round(pos / H) * H));\n      pos += (target - pos) * state.snap; // 临近停止吸附到最近页\n      if (Math.abs(target - pos) < 0.5) pos = target;\n    } else {\n      pos = Math.max(-40, Math.min(max + 40, pos)); // 越界留一点阻尼\n    }\n    track.style.transform = \"translateY(\" + (-pos) + \"px)\";\n    const cur = Math.round(pos / H);\n    Array.from(dots.children).forEach((d, i) => d.classList.toggle(\"on\", i === cur));\n    requestAnimationFrame(step);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); step();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v187",
    标题: "标题折叠",
    分类: "动效",
    子类: "转场滚动",
    风格: ["通用"],
    场景: ["官网·品牌站","内容·阅读","全站通用"],
    元素: ["动效","构成"],
    搭配: ["滚动揭示入场"],
    标签: ["滚动绑定","折叠","吸顶","标题"],
    来源: "抖音·高级交互动效拆解（概念：缩放/横移/上移/底色变化绑定在同一滚动进度上）2026-09-14；通用交互设计语言，代码自写复刻",
    效果演示: "assets/demos/v187-标题折叠.html",
    参数: [{"键":"scale","名":"最小缩放","类型":"slider","最小":0.3,"最大":1,"步长":0.05,"默认":0.6},{"键":"rise","名":"上移距离(px)","类型":"slider","最小":0,"最大":160,"步长":5,"默认":80},{"键":"accent","名":"吸顶色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"text","名":"标题色","类型":"color","默认":"#1a1a1a"}],
    效果说明: "构图笔记：用留白、层级组织信息；一个进度驱动多属性，绝不各动各的。\n标题随滚动进度同时缩放、横移、上移、底色变浅——四个变化绑在同一条 scroll 进度上，用户感知到「同一个东西在连续变形」，而非几段拼接动效。\n能怎么改：拖「最小缩放」看缩多小、「上移距离」看让出多少空间；换色改吸顶与标题色。",
    用法: "上下滚动：标题随进度缩放+横移+上移+变色。调「最小缩放」改折叠程度、「上移距离」改让位多少。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：页面标题随滚动进度同时做 缩放/横移/上移/底色变化，四个属性绑定同一 scroll 进度（单一进度驱动多属性）。\n用法示例：文章页、产品详情首屏标题，下滚折叠吸顶让出空间，上滚还原，过渡连续。\n关键参数：scale 最小缩放 0.6（0.3–1）／ rise 上移距离 80px（0–160）／ accent 吸顶色 #5E6AD2 ／ di 页面底色 #fafafa ／ text 标题色 #1a1a1a\n集成步骤：复制 assets/demos/v187-标题折叠.html，scroll 时 p=min(scrollTop/220,1)；字号/位移/底色都按 p 插值。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>标题折叠演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); height: 100vh; overflow: hidden; }\n  .scroll { height: 100vh; overflow-y: auto; }\n  .head { position: sticky; top: 0; background: var(--headbg); padding: 22px 20px; will-change: transform, background-color; }\n  .head h1 { font-size: var(--fs); color: var(--headc); transform: translateX(var(--tx)); line-height: 1.1; }\n  .head .sub { margin-top: 6px; font-size: 13px; color: color-mix(in srgb, var(--headc) 70%, #999); transform: translateX(var(--tx)); }\n  .body { padding: 20px; color: #444; font-size: 14px; line-height: 1.9; }\n  .body p { margin-bottom: 16px; }\n</style>\n</head>\n<body>\n<div class=\"scroll\" id=\"scroll\">\n  <div class=\"head\" id=\"head\"><h1>滚动时我折叠</h1><div class=\"sub\">缩放 · 横移 · 上移 · 底色，全绑在同一滚动进度上</div></div>\n  <div class=\"body\">\n    <p>往下滚，标题会一边缩小、一边上移、一边变浅，所有变化都跟着同一条滚动进度走——不是四个独立动画，而是一个进度驱动四个属性。</p>\n    <p>这种「单一进度驱动多属性」的做法，好处是绝不会各动各的、互相打架；用户感知到的是「同一个东西在连续变形」，而不是几段拼接的动效。</p>\n    <p>继续滚动到底，标题缩到最小并贴顶，让出空间给正文；往上滚又平滑还原。多滚几次体会进度与形变的绑定关系。</p>\n    <p>这套思路适合文章页、产品详情、长表单的首屏标题，把「抵达感」交给滚动而非按钮。</p>\n    <p>（占位段落，撑出滚动高度）</p><p>（占位段落）</p><p>（占位段落）</p><p>（占位段落）</p><p>（占位段落）</p>\n  </div>\n</div>\n\n<script>\n  const state = { scale: 0.6, rise: 80, radius: 14, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#1a1a1a\" };\n  const scroll = document.getElementById(\"scroll\");\n  const head = document.getElementById(\"head\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--headc\", state.text);\n  }\n  function onScroll() {\n    const max = Math.max(scroll.scrollHeight - scroll.clientHeight, 1);\n    const p = Math.min(scroll.scrollTop / 220, 1); // 0→1 的折叠进度\n    const fs = 24 - (24 - 24 * state.scale) * p;\n    const tx = -p * 40;\n    const ry = -p * state.rise;\n    head.style.setProperty(\"--fs\", fs.toFixed(1) + \"px\");\n    head.style.setProperty(\"--tx\", tx.toFixed(1) + \"px\");\n    head.style.transform = \"translateY(\" + ry.toFixed(1) + \"px)\";\n    // 底色随进度从透明变为主色（折叠后像吸顶条）\n    head.style.setProperty(\"--headbg\", \"color-mix(in srgb, var(--accent) \" + Math.round(p * 14) + \"%, var(--di))\");\n  }\n  scroll.addEventListener(\"scroll\", onScroll);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); onScroll(); });\n  apply(); onScroll();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v175",
    标题: "卡片错位",
    分类: "布局骨架",
    子类: "卡片编排",
    风格: ["通用"],
    场景: ["官网·品牌站", "落地页·发布页", "通用模块区"],
    元素: ["构成", "布局"],
    搭配: ["亲密性功能分组"],
    标签: ["错位", "卡片", "层次", "布局"],
    来源: "自建：个人学习工作台（卡片错位布局示意——每张卡各走各的对齐轴，错位制造层次；2026-09 入库）；通用排版手法，代码自写",
    效果演示: "assets/demos/v175-卡片错位.html",
    参数: [{"键":"cuowei","名":"错位量(px)","类型":"slider","最小":8,"最大":80,"步长":2,"默认":42},{"键":"jiange","名":"卡片间距(px)","类型":"slider","最小":8,"最大":48,"步长":2,"默认":22},{"键":"yuanjiao","名":"卡片圆角(px)","类型":"slider","最小":0,"最大":40,"步长":1,"默认":14},{"键":"yinying","名":"阴影强度","类型":"slider","最小":0,"最大":30,"步长":1,"默认":14},{"键":"guilv","名":"错位规律(0交替/1递增/2阶梯)","类型":"slider","最小":0,"最大":2,"步长":1,"默认":0},{"键":"duiqie","名":"对齐方式(0三轴/1居中/2左)","类型":"slider","最小":0,"最大":2,"步长":1,"默认":0},{"键":"qiangdiao","名":"强调首卡(0关/1开)","类型":"slider","最小":0,"最大":1,"步长":1,"默认":1},{"键":"zhucai","名":"主色","类型":"color","默认":"#5E6AD2"},{"键":"di","名":"页面底色","类型":"color","默认":"#fafafa"},{"键":"zi","名":"文字色","类型":"color","默认":"#1a1a1a"}],
    效果说明: "构图笔记：靠错位与对齐轴制造层次，比「四块一样大」的模板更有节奏感。\n每张卡片沿不同对齐轴（左/中/右）错位排布，首卡用主色强调做视觉锚点；错位量、间距、对齐方式、规律都能调，层次立刻出来。\n能怎么改：拖「错位量」看卡偏多远、「卡片间距」看疏密、「错位规律」切交替/递增/阶梯、「对齐方式」切三轴/居中/左。",
    用法: "五张卡默认沿左/中/右三轴错位；调「错位量」改偏移幅度、「错位规律」换排版节奏、「强调首卡」开关首卡高亮。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：一列卡片，每张沿不同对齐轴（左/中/右）错位排布，首卡用主色强调；错位量、间距、对齐方式、错位规律（交替/递增/阶梯）可调。\n用法示例：官网首屏要点、能力清单、客户证言，错位排布立刻出层次，避免「四块一样大」的模板感。\n关键参数：cuowei 错位量 42px（8–80）／ jiange 间距 22px（8–48）／ yuanjiao 圆角 14px（0–40）／ yinying 阴影 14（0–30）／ guilv 错位规律 0（0交替/1递增/2阶梯）／ duiqie 对齐 0（0三轴/1居中/2左）／ zhucai 主色 #5E6AD2 ／ di 底色 #fafafa ／ zi 文字色 #1a1a1a\n集成步骤：复制 assets/demos/v175-卡片错位.html，每张卡 transform:translateX(偏移)；偏移由 错位量×规律 算出，对齐轴决定 textAlign。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片错位布局演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n    background: var(--di);\n    color: var(--zi);\n    display: flex; align-items: center; justify-content: center;\n    min-height: 100vh; padding: 28px 16px;\n  }\n  .wrap { width: min(640px, 94vw); }\n  h2 { font-size: 15px; margin-bottom: 6px; }\n  .sub { font-size: 12.5px; color: var(--cizi); margin-bottom: 20px; }\n\n  .list { display: flex; flex-direction: column; gap: var(--jiange); }\n  .card {\n    background: var(--kase);\n    border: 1px solid color-mix(in srgb, var(--zi) 10%, transparent);\n    border-radius: var(--yuanjiao);\n    padding: 16px 18px;\n    box-shadow: 0 calc(var(--yinying) * 0.2px) calc(var(--yinying) * 0.7px) rgba(0,0,0,.08);\n    transform: translateX(var(--shift, 0px));\n    transition: transform .25s ease, box-shadow .2s ease;\n  }\n  .card .t { font-size: 14.5px; font-weight: 700; }\n  .card .d { margin-top: 5px; font-size: 12.5px; color: var(--cizi); line-height: 1.55; }\n\n  .card.first {\n    border-color: var(--zhucai);\n    box-shadow: 0 calc(var(--yinying) * 0.3px) calc(var(--yinying) * 1px) color-mix(in srgb, var(--zhucai) 35%, transparent);\n  }\n  .card.first .t { color: var(--zhucai); }\n\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n  <h2>卡片错位：每张卡各走各的对齐轴</h2>\n  <div class=\"sub\">初始版所有卡片左侧对齐、只有一条轴 → 整齐但扁平；错位后层次立刻出来</div>\n  <div class=\"list\" id=\"list\"></div>\n</div>\n\n<script>\n\n  const state = {\n    cuowei: 42, jiange: 22, yuanjiao: 14, yinying: 14,\n    guilv: 0, duiqie: 0, qiangdiao: 1,\n    zhucai: \"#5E6AD2\", di: \"#fafafa\", zi: \"#1a1a1a\", cizi: \"#6b6b6b\", kase: \"#ffffff\"\n  };\n  const DATA = [\n    { t: \"首屏主张\", d: \"一句话讲清你是谁，错位让这条先被看见\" },\n    { t: \"核心能力\", d: \"三到四项能力，各自缩进不同形成节奏\" },\n    { t: \"使用场景\", d: \"场景卡错开，避免「四块一样大」的模板感\" },\n    { t: \"客户证言\", d: \"证言卡再错一级，纵深由偏移量堆出来\" },\n    { t: \"行动引导\", d: \"最后一块回正或继续错位，收住动线\" }\n  ];\n  function alignOf(i) {\n\n    if (state.duiqie === 1) return \"center\";\n    if (state.duiqie === 2) return \"left\";\n    return [\"left\", \"center\", \"right\"][i % 3];\n  }\n  function shiftOf(i) {\n\n    const c = state.cuowei;\n    if (state.guilv === 0) return (i % 2 === 0 ? 1 : -1) * c;\n    if (state.guilv === 1) return i * (c * 0.5);\n    return i * c;\n  }\n  function build() {\n    const list = document.getElementById(\"list\");\n    list.innerHTML = \"\";\n    DATA.forEach((it, i) => {\n      const el = document.createElement(\"div\");\n      el.className = \"card\" + (i === 0 && state.qiangdiao ? \" first\" : \"\");\n      el.style.textAlign = alignOf(i);\n      el.style.setProperty(\"--shift\", shiftOf(i) + \"px\");\n      el.innerHTML = '<div class=\"t\">' + it.t + '</div><div class=\"d\">' + it.d + '</div>';\n      list.appendChild(el);\n    });\n  }\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--jiange\", state.jiange + \"px\");\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    r.setProperty(\"--yinying\", state.yinying);\n    r.setProperty(\"--zhucai\", state.zhucai);\n    r.setProperty(\"--di\", state.di);\n    r.setProperty(\"--zi\", state.zi);\n    r.setProperty(\"--cizi\", state.cizi);\n    r.setProperty(\"--kase\", state.kase);\n    build();\n  }\n  window.addEventListener(\"message\", e => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  }
];