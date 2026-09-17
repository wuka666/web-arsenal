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
    提示词: "帮我做一个\"粒子聚字\"文字效果（纯 HTML/CSS/JS）：\n\n效果：文字由全屏散落的墨点聚集而成，鼠标划过粒子散开，静止后缓慢漂移。\n\n用法示例：\n<canvas id=\"c\"></canvas>\n<script>\n  const state = { density: 7, size: 2.2, repel: 90, highlight: true };\n<\/script>\n\n关键参数：\n- text 文字内容 / density 粒子密度 / size 粒子大小 / repel 排斥半径 / speed 回归速度 / color 粒子颜色 / accent 点缀色 / bg 背景颜色 / highlight 是否有点缀色粒子\n\n集成步骤：\n1. 复制 assets/demos/粒子文字.html 的 JS 和容器结构\n2. 换文字（代码里的\"墨点聚字\"）\n3. 换颜色适配主题",
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
    提示词: "帮我做一个\"细雨\"全屏背景（纯 HTML/CSS/JS）：\n\n效果：细密雨丝斜落，自动避开内容区域；鼠标划过把雨拨开；窄屏自动不渲染省性能。\n\n用法示例：\n<canvas id=\"rain\"></canvas>\n<script>\n  const state = { rain: 1, speed: 7 };\n  const CARD = { x, y, w, h }; // 内容避让矩形\n<\/script>\n\n关键参数：\n- rain 雨量 / speed 下落速度 / wind 风偏移 / len 雨丝长度 / width 雨丝粗细 / opacity 雨丝透明度 / color 雨的颜色 / bg 背景颜色\n\n集成步骤：\n1. 复制 assets/demos/细雨意境.html 的 JS\n2. 把避让矩形改成你内容区的实际位置\n3. 想换雪/花瓣/星尘，改粒子的画法即可",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>墨渍按钮演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .btn {\n    position: relative; overflow: hidden; cursor: pointer; min-width: 250px;\n    background: var(--btn-bg, #fff); color: var(--ink, #1a1a1a); border: 2px solid var(--ink, #1a1a1a);\n    font-size: 17px; font-weight: 700; letter-spacing: 3px;\n    padding: 18px 48px; border-radius: var(--btn-r, 14px); user-select: none;\n    transition: color .25s ease, background .25s ease;\n  }\n  .btn.inked { background: var(--ink, #1a1a1a); color: var(--after-c, #fff); }\n  /* 点击涟漪：从点下去的位置扩散 */\n  .ripple {\n    position: absolute; border-radius: 50%;\n    background: color-mix(in srgb, var(--ink, #1a1a1a) 25%, transparent);\n    transform: scale(0); pointer-events: none;\n  }\n  .ripple.go { animation: inkRipple var(--ripple-dur, .6s) ease-out forwards; }\n  @keyframes inkRipple { to { transform: scale(1); opacity: 0; } }\n  /* 墨渍：两个错位的墨团同时放大，边缘更自然 */\n  .stain, .stain2 {\n    position: absolute; border-radius: 50%; background: var(--ink, #1a1a1a);\n    transform: scale(0); pointer-events: none;\n  }\n  .stain { left: 50%; top: 50%; width: 16px; height: 16px; margin: -8px 0 0 -8px; }\n  .stain2 { left: 63%; top: 36%; width: 10px; height: 10px; margin: -5px 0 0 -5px; }\n  .stain.go { animation: inkStainReveal var(--stain-dur, .55s) ease-out forwards; }\n  .stain2.go { animation: inkStainReveal2 var(--stain-dur, .55s) ease-out .04s forwards; }\n  /* 扩散倍数用 CSS 变量，改了立刻生效 */\n  @keyframes inkStainReveal { to { transform: scale(var(--spread, 55)); } }\n  @keyframes inkStainReveal2 { to { transform: scale(calc(var(--spread, 55) * .73)); } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">提交</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    ripple: 0.6, stain: 0.55, reset: 1.6, ink: \"#1a1a1a\", spread: 55,\n    textColor: \"#ffffff\", btnBg: \"#ffffff\", bg: \"#ffffff\", radius: 14,\n    delay: 120, text: \"提交\"\n  };\n  const btn = document.getElementById(\"btn\");\n  let locked = false;\n\n  function apply() {\n    const s = document.documentElement.style;\n    s.setProperty(\"--ripple-dur\", state.ripple + \"s\");\n    s.setProperty(\"--stain-dur\", state.stain + \"s\");\n    s.setProperty(\"--spread\", state.spread);\n    s.setProperty(\"--ink\", state.ink);\n    s.setProperty(\"--after-c\", state.textColor);\n    s.setProperty(\"--btn-bg\", state.btnBg);\n    s.setProperty(\"--btn-r\", state.radius + \"px\");\n    s.setProperty(\"--page-bg\", state.bg);\n    // 静止状态下换文案\n    if (!locked) btn.textContent = state.text;\n  }\n\n  btn.addEventListener(\"click\", (e) => {\n    if (locked) return;\n    locked = true;\n    const rect = btn.getBoundingClientRect();\n    const r = Math.max(rect.width, rect.height) * 1.2;\n    const rip = document.createElement(\"span\");\n    rip.className = \"ripple\";\n    rip.style.width = rip.style.height = r + \"px\";\n    rip.style.left = (e.clientX - rect.left - r / 2) + \"px\";\n    rip.style.top = (e.clientY - rect.top - r / 2) + \"px\";\n    btn.appendChild(rip);\n    rip.classList.add(\"go\");\n    setTimeout(() => {\n      const s1 = document.createElement(\"span\");\n      s1.className = \"stain\";\n      const s2 = document.createElement(\"span\");\n      s2.className = \"stain2\";\n      btn.append(s1, s2);\n      s1.classList.add(\"go\");\n      s2.classList.add(\"go\");\n      btn.classList.add(\"inked\");\n      btn.textContent = \"已揭示 ✓\";\n    }, state.delay);\n    setTimeout(() => {\n      btn.classList.remove(\"inked\");\n      btn.textContent = state.text;\n      btn.querySelectorAll(\".ripple, .stain, .stain2\").forEach(n => n.remove());\n      locked = false;\n    }, state.reset * 1000);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    提示词: "帮我做一个 3D 粒子球背景（原生 WebGL，零依赖；正式版可用 three.js）：\n\n效果：亮点组成 3D 球体缓慢自转，鼠标移动控制视角，作为页面氛围背景。\n\n用法示例：\n<canvas id=\"c\"></canvas>\n<script>\n  const state = { count: 260, speed: 4 };\n<\/script>\n\n关键参数：\n- count 粒子数量 / speed 旋转速度 / fov 透视强度 / size 粒子大小 / alpha 粒子透明度 / color 主色 / color2 副色 / bg 背景颜色 / glow 是否发光\n\n集成步骤：\n1. 复制 assets/demos/3D背景.html 的 WebGL 代码\n2. 想加载 3D 模型就换 three.js（注意体积和手机端降级）\n3. 手机端降级为静态图",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>产品卡悬停演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .cards { display: flex; gap: 26px; flex-wrap: wrap; justify-content: center; padding: 0 20px; }\n  .pcard {\n    width: 180px; background: var(--card-bg, #fff); border: 1px solid #e5e2db;\n    border-radius: var(--card-r, 18px);\n    padding: 26px 18px 20px; text-align: center; cursor: pointer;\n    transition: transform var(--hover-dur, .3s) ease, box-shadow var(--hover-dur, .3s) ease, filter var(--hover-dur, .3s) ease;\n  }\n  .pcard:hover {\n    transform: translateY(calc(-1 * var(--hover-amp, 6px))) rotate(calc(var(--tilt, 1.5deg) * -1));\n    box-shadow: 0 16px 30px color-mix(in srgb, #1b1b1b var(--shadow, 14%), transparent);\n    filter: brightness(1.05);\n  }\n  .device {\n    width: 100%; height: 110px; border-radius: 12px; margin-bottom: 14px;\n    display: flex; align-items: center; justify-content: center;\n    color: rgba(255,255,255,.85); font-size: 12px; font-weight: 600;\n  }\n  /* 每张设备图的主色可调，第二档自动混白提亮 */\n  .device.a { background: linear-gradient(145deg, var(--dev-a, #7b5cff), color-mix(in srgb, var(--dev-a, #7b5cff) 55%, white)); }\n  .device.b { background: linear-gradient(145deg, var(--dev-b, #1b1b1b), color-mix(in srgb, var(--dev-b, #1b1b1b) 55%, white)); }\n  .device.c { background: linear-gradient(145deg, var(--dev-c, #ff7a9c), color-mix(in srgb, var(--dev-c, #ff7a9c) 55%, white)); }\n  .pcard h4 { font-size: 14px; color: #1b1b1b; }\n  .pcard p { font-size: 12px; color: #8d8a82; margin-top: 4px; }\n</style>\n</head>\n<body>\n  <div class=\"cards\">\n    <div class=\"pcard\"><div class=\"device a\">便携设备</div><h4>随身款</h4><p>随身携带，随时使用</p></div>\n    <div class=\"pcard\"><div class=\"device b\">智能手表</div><h4>腕上款</h4><p>随身携带，随时使用</p></div>\n    <div class=\"pcard\"><div class=\"device c\">桌面设备</div><h4>桌面款</h4><p>随身携带，随时使用</p></div>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      amp: 6, dur: 0.3, tilt: 1.5, shadow: 14, radius: 18,\n      cardBg: \"#ffffff\", devA: \"#7b5cff\", devB: \"#1b1b1b\", devC: \"#ff7a9c\", bg: \"#ffffff\"\n    };\n\n    // 参数变了：改 CSS 变量，抬起高度/倾斜/阴影/颜色实时变\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--hover-amp\", state.amp + \"px\");\n      s.setProperty(\"--hover-dur\", state.dur + \"s\");\n      s.setProperty(\"--tilt\", state.tilt + \"deg\");\n      s.setProperty(\"--shadow\", state.shadow + \"%\");\n      s.setProperty(\"--card-r\", state.radius + \"px\");\n      s.setProperty(\"--card-bg\", state.cardBg);\n      s.setProperty(\"--dev-a\", state.devA);\n      s.setProperty(\"--dev-b\", state.devB);\n      s.setProperty(\"--dev-c\", state.devC);\n      s.setProperty(\"--page-bg\", state.bg);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>悬浮边框演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif; padding: 20px;\n  }\n  /* 就一张大卡片：鼠标移上去冒出渐变描边并上浮 */\n  .item {\n    position: relative; z-index: 0;\n    width: min(420px, 80vw); height: 200px;\n    background: var(--card-bg, #faf9f6); border-radius: var(--r, 16px);\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;\n    cursor: pointer;\n    transition: box-shadow var(--edge-dur, .2s) ease, transform var(--edge-dur, .2s) ease;\n  }\n  /* 渐变描边：伪元素垫在卡片底下，比卡片大一圈，悬停时淡入 */\n  .item::before {\n    content: \"\"; position: absolute; z-index: -1;\n    inset: calc(-1 * var(--bw, 1px));\n    border-radius: calc(var(--r, 16px) + var(--bw, 1px));\n    background: linear-gradient(135deg, var(--c1, #635bff), var(--c2, #3ec6ff));\n    opacity: 0;\n    transition: opacity var(--edge-dur, .2s) ease;\n  }\n  .item:hover::before { opacity: 1; }\n  .item:hover {\n    transform: translateY(calc(-1 * var(--lift, 4px)));\n    box-shadow: 0 12px 24px color-mix(in srgb, var(--c1, #635bff) var(--glow, 14%), transparent);\n  }\n  .item h4 { font-size: 18px; }\n  .item p { font-size: 13px; color: #8a8a85; }\n</style>\n</head>\n<body>\n  <div class=\"item\">\n    <h4>收款</h4>\n    \n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      color: \"#635bff\", color2: \"#3ec6ff\", dur: 0.2, width: 1,\n      radius: 16, glow: 14, lift: 4, cardBg: \"#faf9f6\", bg: \"#ffffff\"\n    };\n\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--c1\", state.color);\n      s.setProperty(\"--c2\", state.color2);\n      s.setProperty(\"--edge-dur\", state.dur + \"s\");\n      s.setProperty(\"--bw\", state.width + \"px\");\n      s.setProperty(\"--r\", state.radius + \"px\");\n      s.setProperty(\"--glow\", state.glow + \"%\");\n      s.setProperty(\"--lift\", state.lift + \"px\");\n      s.setProperty(\"--card-bg\", state.cardBg);\n      s.setProperty(\"--page-bg\", state.bg);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>按压回弹演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .btn {\n    cursor: pointer; user-select: none; outline: none; border: none;\n    background: var(--bg, #1a1a1a); color: var(--tc, #fff);\n    font-size: var(--fs, 17px); font-weight: 700; letter-spacing: 3px;\n    padding: 18px 56px; border-radius: var(--r, 14px);\n    box-shadow: var(--sh, none);\n    transition: box-shadow .25s ease;\n  }\n  /* 按下：压过头（缩过头） */\n  .btn.down { transform: scale(var(--press, .88)); transition: transform .06s ease; }\n  /* 松开：先冲过头再落定，重量感来自这一下 */\n  .btn.pop { animation: pressPop var(--dur, .3s) ease-out forwards; }\n  @keyframes pressPop {\n    0%   { transform: scale(var(--press, .88)); }\n    55%  { transform: scale(var(--over, 1.05)); }\n    100% { transform: scale(1); }\n  }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">提交</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    press: 0.88, over: 1.05, dur: 0.3,\n    radius: 14, fontSize: 17, bg: \"#1a1a1a\", color: \"#ffffff\",\n    glow: false, glowColor: \"#1a1a1a\", text: \"提交\"\n  };\n  const btn = document.getElementById(\"btn\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--press\", state.press);\n    s.setProperty(\"--over\", state.over);\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n    s.setProperty(\"--bg\", state.bg);\n    s.setProperty(\"--tc\", state.color);\n    // 阴影：用 8 位十六进制把颜色和透明度拼起来\n    s.setProperty(\"--sh\", state.glow ? \"0 12px 32px \" + state.glowColor + \"55\" : \"none\");\n    btn.textContent = state.text;\n  }\n\n  btn.addEventListener(\"pointerdown\", () => {\n    btn.classList.remove(\"pop\");\n    btn.classList.add(\"down\");\n  });\n  btn.addEventListener(\"pointerup\", () => {\n    btn.classList.remove(\"down\");\n    btn.classList.add(\"pop\");\n    setTimeout(() => btn.classList.remove(\"pop\"), state.dur * 1000 + 30);\n  });\n  btn.addEventListener(\"pointerleave\", () => btn.classList.remove(\"down\"));\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>弹性开关演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .switch {\n    border-radius: 999px;\n    background: var(--off, #e3e3e3); cursor: pointer; position: relative; user-select: none;\n    transition: background var(--dur, .25s) ease;\n  }\n  .knob {\n    position: absolute; top: 3px; left: 3px; border-radius: 50%;\n    width: var(--knob, 28px); height: var(--knob, 28px);\n    background: var(--knobc, #fff);\n    box-shadow: var(--sh, 0 2px 6px rgba(0,0,0,.22));\n  }\n  /* 开：滑钮起步横向拉长，落位压回原宽，体现质量感（行程 = 轨道宽 - 轨道高） */\n  .switch.on { background: var(--on, #1a1a1a); }\n  .switch.on .knob { animation: knobOn var(--dur, .3s) ease-out forwards; }\n  .switch.off .knob { animation: knobOff var(--dur, .3s) ease-out forwards; }\n  @keyframes knobOn {\n    0%   { transform: translateX(0) scaleX(1); }\n    40%  { transform: translateX(calc(var(--travel, 32px) / 2)) scaleX(var(--stretch, 1.28)); }\n    75%  { transform: translateX(var(--travel, 32px)) scaleX(.82); }\n    100% { transform: translateX(var(--travel, 32px)) scaleX(1); }\n  }\n  @keyframes knobOff {\n    0%   { transform: translateX(var(--travel, 32px)) scaleX(1); }\n    40%  { transform: translateX(calc(var(--travel, 32px) / 2)) scaleX(var(--stretch, 1.28)); }\n    75%  { transform: translateX(0) scaleX(.82); }\n    100% { transform: translateX(0) scaleX(1); }\n  }\n</style>\n</head>\n<body>\n<div class=\"switch\" id=\"sw\" role=\"switch\" aria-checked=\"false\"><span class=\"knob\"></span></div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    stretch: 1.28, dur: 0.3, width: 66, height: 34,\n    trackOff: \"#e3e3e3\", trackOn: \"#1a1a1a\", knob: \"#ffffff\", shadow: true\n  };\n  const sw = document.getElementById(\"sw\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--stretch\", state.stretch);\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    sw.style.width = state.width + \"px\";\n    sw.style.height = state.height + \"px\";\n    // 手柄直径 = 轨道高 - 6px 边距；行程 = 轨道宽 - 轨道高\n    s.setProperty(\"--knob\", (state.height - 6) + \"px\");\n    s.setProperty(\"--travel\", Math.max(state.width - state.height, 0) + \"px\");\n    s.setProperty(\"--off\", state.trackOff);\n    s.setProperty(\"--on\", state.trackOn);\n    s.setProperty(\"--knobc\", state.knob);\n    s.setProperty(\"--sh\", state.shadow ? \"0 2px 6px rgba(0,0,0,.22)\" : \"none\");\n  }\n\n  let on = false;\n  sw.addEventListener(\"click\", () => {\n    on = !on;\n    sw.classList.toggle(\"on\", on);\n    sw.classList.toggle(\"off\", !on);\n    sw.setAttribute(\"aria-checked\", on);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>水波按钮演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .btn {\n    position: relative; overflow: hidden; cursor: pointer; user-select: none; outline: none;\n    background: var(--bg, #fff); color: var(--tc, #1a1a1a); border: 2px solid var(--bd, #1a1a1a);\n    font-size: var(--fs, 17px); font-weight: 700; letter-spacing: 3px;\n    padding: 18px 56px; border-radius: var(--r, 14px);\n    transition: background .25s ease, color .25s ease;\n  }\n  .btn:active { filter: brightness(.96); }\n  /* 水波：从点下去的位置散开，反馈跟随手指而不是控件中心 */\n  .ripple {\n    position: absolute; border-radius: 50%;\n    background: var(--ripple, #1a1a1a);\n    transform: scale(0); pointer-events: none;\n  }\n  .ripple.go { animation: rippleGo var(--dur, .55s) ease-out forwards; }\n  @keyframes rippleGo { to { transform: scale(1); opacity: 0; } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">提交</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.55, opacity: 0.18, rippleColor: \"#1a1a1a\", spread: 1,\n    bg: \"#ffffff\", color: \"#1a1a1a\", border: \"#1a1a1a\", radius: 14, fontSize: 17\n  };\n  const btn = document.getElementById(\"btn\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--ripple\", state.rippleColor);\n    s.setProperty(\"--bg\", state.bg);\n    s.setProperty(\"--tc\", state.color);\n    s.setProperty(\"--bd\", state.border);\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n  }\n\n  btn.addEventListener(\"click\", (e) => {\n    const rect = btn.getBoundingClientRect();\n    // 水波直径 = 按钮较长边 × 扩散倍数\n    const r = Math.max(rect.width, rect.height) * state.spread;\n    const rip = document.createElement(\"span\");\n    rip.className = \"ripple\";\n    rip.style.width = rip.style.height = r + \"px\";\n    rip.style.opacity = state.opacity; // 浓度直接落在水波自身上\n    // 水波中心 = 手指落点\n    rip.style.left = (e.clientX - rect.left - r / 2) + \"px\";\n    rip.style.top = (e.clientY - rect.top - r / 2) + \"px\";\n    btn.appendChild(rip);\n    rip.classList.add(\"go\");\n    rip.addEventListener(\"animationend\", () => rip.remove());\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>点击爆散演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .btn {\n    position: relative; cursor: pointer; user-select: none; outline: none; border: none;\n    background: var(--bg, #1a1a1a); color: var(--tc, #fff);\n    font-size: 17px; font-weight: 700; letter-spacing: 3px;\n    padding: 18px 56px; border-radius: var(--r, 14px);\n    transition: transform .12s ease;\n  }\n  .btn:active { transform: scale(.94); }\n  .burst-wrap { position: fixed; inset: 0; pointer-events: none; overflow: hidden; }\n  .spark { position: absolute; background: var(--sc, #1a1a1a); pointer-events: none; }\n  /* 末段叠加 --g 的下坠量，模拟重力；渐隐开关控制结尾透明度 */\n  .spark.go { animation: sparkFly var(--dur, .5s) cubic-bezier(.16,1,.3,1) forwards; }\n  @keyframes sparkFly {\n    0%   { transform: translate(0,0) scale(1); opacity: 1; }\n    60%  { transform: translate(var(--dx), var(--dy)) scale(.7); opacity: 1; }\n    100% { transform: translate(var(--dx), calc(var(--dy) + var(--g, 0px))) scale(.3); opacity: var(--fo, 0); }\n  }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">触发爆散</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    count: 10, dist: 90, dur: 0.5, size: 6, gravity: 60,\n    color: \"#1a1a1a\", shape: \"圆点\", fade: true,\n    btnBg: \"#1a1a1a\", btnColor: \"#ffffff\"\n  };\n  const btn = document.getElementById(\"btn\");\n  const root = document.documentElement;\n  const wrap = document.createElement(\"div\");\n  wrap.className = \"burst-wrap\";\n  document.body.appendChild(wrap);\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--g\", state.gravity + \"px\");\n    s.setProperty(\"--fo\", state.fade ? 0 : 1); // 渐隐关：结尾保持不透明\n    s.setProperty(\"--sc\", state.color);\n    s.setProperty(\"--bg\", state.btnBg);\n    s.setProperty(\"--tc\", state.btnColor);\n    s.setProperty(\"--r\", \"14px\");\n  }\n\n  btn.addEventListener(\"click\", (e) => {\n    const cx = e.clientX, cy = e.clientY;\n    for (let i = 0; i < state.count; i++) {\n      const s = document.createElement(\"span\");\n      s.className = \"spark\";\n      // 形状决定长宽；大小带随机抖动更像真的\n      const sz = state.size * (0.7 + Math.random() * 0.6);\n      if (state.shape === \"线段\") { s.style.width = sz * 3 + \"px\"; s.style.height = \"2px\"; s.style.borderRadius = \"2px\"; }\n      else { s.style.width = s.style.height = sz + \"px\"; s.style.borderRadius = state.shape === \"方块\" ? \"1px\" : \"50%\"; }\n      s.style.left = (cx - 2) + \"px\";\n      s.style.top = (cy - 2) + \"px\";\n      // 粒子向四周随机飞散\n      const angle = Math.random() * Math.PI * 2;\n      const d = state.dist * (0.5 + Math.random());\n      s.style.setProperty(\"--dx\", Math.cos(angle) * d + \"px\");\n      s.style.setProperty(\"--dy\", Math.sin(angle) * d + \"px\");\n      wrap.appendChild(s);\n      s.classList.add(\"go\");\n      s.addEventListener(\"animationend\", () => s.remove());\n    }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>勾选动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .check {\n    width: var(--size, 56px); height: var(--size, 56px); border-radius: var(--r, 50%);\n    cursor: pointer; user-select: none;\n    background: var(--offbg, #fff); border: 2px solid var(--bd, #d0d0d0);\n    display: flex; align-items: center; justify-content: center;\n    transition: background var(--dur, .25s) ease, border-color var(--dur, .25s) ease;\n  }\n  .check.on { background: var(--onbg, #1a1a1a); border-color: var(--onbg, #1a1a1a); }\n  /* 勾：用 stroke-dashoffset 逐笔画出 */\n  .check svg { width: var(--icon, 30px); height: var(--icon, 30px); }\n  .check path {\n    fill: none; stroke: var(--ck, #fff); stroke-width: var(--width, 3);\n    stroke-linecap: round; stroke-linejoin: round;\n    stroke-dasharray: 26; stroke-dashoffset: 26;\n  }\n  .check.on path { animation: drawCheck var(--dur, .35s) ease-out forwards; }\n  @keyframes drawCheck { to { stroke-dashoffset: 0; } }\n</style>\n</head>\n<body>\n<div class=\"check\" id=\"ck\" role=\"checkbox\" aria-checked=\"false\" tabindex=\"0\">\n  <svg viewBox=\"0 0 24 24\"><path d=\"M5 12.5 L10 17.5 L19 7\"></path></svg>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.35, width: 3, size: 56, iconSize: 30,\n    bgColor: \"#1a1a1a\", offBg: \"#ffffff\", borderColor: \"#d0d0d0\", checkColor: \"#ffffff\", radius: 50\n  };\n  const ck = document.getElementById(\"ck\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--width\", state.width);\n    s.setProperty(\"--size\", state.size + \"px\");\n    s.setProperty(\"--icon\", state.iconSize + \"px\");\n    s.setProperty(\"--onbg\", state.bgColor);\n    s.setProperty(\"--offbg\", state.offBg);\n    s.setProperty(\"--bd\", state.borderColor);\n    s.setProperty(\"--ck\", state.checkColor);\n    s.setProperty(\"--r\", state.radius + \"%\");\n  }\n\n  let on = false;\n  function toggle() {\n    on = !on;\n    ck.classList.toggle(\"on\", on);\n    ck.setAttribute(\"aria-checked\", on);\n  }\n  ck.addEventListener(\"click\", toggle);\n  ck.addEventListener(\"keydown\", (e) => {\n    if (e.key === \" \" || e.key === \"Enter\") { e.preventDefault(); toggle(); }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>液态滑块演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .row { display: flex; align-items: center; gap: 18px; }\n  .val {\n    min-width: 64px; text-align: right; font-weight: 800; font-variant-numeric: tabular-nums;\n    font-size: var(--vfs, 34px); color: var(--vc, #1a1a1a);\n  }\n  input[type=range] {\n    width: var(--w, 260px); height: var(--h, 8px); border-radius: 999px; appearance: none; outline: none; cursor: pointer;\n    background: linear-gradient(to right, var(--fill, #1a1a1a) var(--pct, 50%), var(--track, #e3e3e3) var(--pct, 50%));\n  }\n  input[type=range]::-webkit-slider-thumb {\n    appearance: none; width: var(--thumb, 26px); height: var(--thumb, 26px); border-radius: 50%;\n    background: var(--knob, #fff); border: 3px solid var(--fill, #1a1a1a);\n    box-shadow: 0 2px 6px rgba(0,0,0,.18); transition: transform var(--dur, .2s) ease;\n  }\n  input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.15); }\n  /* 数值切换：从旧值滚动到新值，不突然跳变 */\n  .val.pop { animation: valPop var(--dur, .2s) ease; }\n  @keyframes valPop {\n    0% { transform: translateY(0); opacity: 1; }\n    40% { transform: translateY(8px); opacity: 0; }\n    60% { transform: translateY(-8px); opacity: 0; }\n    100% { transform: translateY(0); opacity: 1; }\n  }\n</style>\n</head>\n<body>\n<div class=\"row\">\n  <input type=\"range\" id=\"rng\" min=\"0\" max=\"100\" value=\"50\">\n  <div class=\"val\" id=\"val\">50</div>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.2, color: \"#1a1a1a\", track: \"#e3e3e3\", knob: \"#ffffff\",\n    width: 260, height: 8, thumb: 26, fontSize: 34, valColor: \"#1a1a1a\"\n  };\n  const rng = document.getElementById(\"rng\");\n  const val = document.getElementById(\"val\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--fill\", state.color);\n    s.setProperty(\"--track\", state.track);\n    s.setProperty(\"--knob\", state.knob);\n    s.setProperty(\"--w\", state.width + \"px\");\n    s.setProperty(\"--h\", state.height + \"px\");\n    s.setProperty(\"--thumb\", state.thumb + \"px\");\n    s.setProperty(\"--vfs\", state.fontSize + \"px\");\n    s.setProperty(\"--vc\", state.valColor);\n  }\n\n  rng.addEventListener(\"input\", () => {\n    rng.style.setProperty(\"--pct\", rng.value + \"%\");\n    val.textContent = rng.value;\n    val.classList.remove(\"pop\");\n    void val.offsetWidth; // 重启动画\n    val.classList.add(\"pop\");\n  });\n  rng.style.setProperty(\"--pct\", \"50%\");\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>数字滚动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .num { font-size: var(--fs, 56px); font-weight: 800; font-variant-numeric: tabular-nums; min-width: 200px; text-align: center; color: var(--nc, #1a1a1a); }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--bb, #1a1a1a); color: var(--bc, #fff);\n    font-size: 15px; font-weight: 700; letter-spacing: 2px;\n    padding: 12px 32px; border-radius: 10px;\n  }\n</style>\n</head>\n<body>\n<div class=\"num\" id=\"num\">0</div>\n<button class=\"btn\" id=\"btn\">重新滚动</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    target: 8848, dur: 1.6, easing: \"先快后慢\", prefix: \"\",\n    fontSize: 56, numColor: \"#1a1a1a\", btnBg: \"#1a1a1a\", btnColor: \"#ffffff\"\n  };\n  const num = document.getElementById(\"num\");\n  const root = document.documentElement;\n  let raf = 0;\n\n  // 三种停法：先快后慢 / 匀速 / 回弹过头\n  const EASE = {\n    \"先快后慢\": t => 1 - Math.pow(1 - t, 5),\n    \"匀速\": t => t,\n    \"回弹过头\": t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }\n  };\n\n  function roll() {\n    cancelAnimationFrame(raf);\n    const start = performance.now();\n    const from = 0, to = state.target, dur = state.dur * 1000;\n    const ease = EASE[state.easing] || EASE[\"先快后慢\"];\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      num.textContent = state.prefix + Math.round(from + (to - from) * ease(t));\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n    s.setProperty(\"--nc\", state.numColor);\n    s.setProperty(\"--bb\", state.btnBg);\n    s.setProperty(\"--bc\", state.btnColor);\n    roll(); // 数字相关参数变了就重滚一遍，立刻看到效果\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", roll);\n  roll();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>骨架落位演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .card {\n    width: var(--cw, 300px); border: 1px solid #eee; border-radius: var(--r, 14px); padding: 18px;\n    background: var(--cb, #fff); box-shadow: 0 6px 16px rgba(0,0,0,.05);\n    transition: width .2s ease;\n  }\n  /* 骨架条：高度与真实内容一致，所以加载完不会跳动 */\n  .skeleton .bar {\n    height: 16px; border-radius: 8px; margin-bottom: 10px;\n    background: linear-gradient(90deg, var(--base, #f0f0f0) 25%, var(--hi, #e4e4e4) 50%, var(--base, #f0f0f0) 75%);\n    background-size: 200% 100%; animation: shimmer var(--dur, 1.1s) infinite linear;\n  }\n  @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }\n  .skeleton .title-bar { width: 55%; height: 20px; margin-bottom: 14px; }\n  .skeleton .line-s { width: 40%; }\n  /* 真实内容：骨架占位时不可见，加载完成后原位出现（不跳动） */\n  .content { display: none; }\n  .card.loaded .content { display: block; animation: fadeIn .25s ease; }\n  .card.loaded .skeleton { display: none; }\n  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n  .btn {\n    margin-top: 8px; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--bb, #1a1a1a); color: var(--bc, #fff); font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\">\n  <div class=\"skeleton\">\n    <div class=\"bar title-bar\"></div>\n    <div class=\"bar\"></div>\n    <div class=\"bar\"></div>\n    <div class=\"bar line-s\"></div>\n  </div>\n  <div class=\"content\">\n    <h3 style=\"font-size:17px;margin-bottom:8px\">加载完成 ✓</h3>\n    \n  </div>\n</div>\n<button class=\"btn\" id=\"btn\">重新加载</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 1.1, wait: 1.4, base: \"#f0f0f0\", highlight: \"#e4e4e4\",\n    cardBg: \"#ffffff\", cardWidth: 300, radius: 14, btnBg: \"#1a1a1a\", btnColor: \"#ffffff\"\n  };\n  const card = document.getElementById(\"card\");\n  const root = document.documentElement;\n  let timer = 0;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--base\", state.base);\n    s.setProperty(\"--hi\", state.highlight);\n    s.setProperty(\"--cb\", state.cardBg);\n    s.setProperty(\"--cw\", state.cardWidth + \"px\");\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--bb\", state.btnBg);\n    s.setProperty(\"--bc\", state.btnColor);\n    // 尺寸变了就重新演一遍，保证骨架/内容落位关系可见\n    load();\n  }\n\n  function load() {\n    clearTimeout(timer);\n    card.classList.remove(\"loaded\");\n    timer = setTimeout(() => card.classList.add(\"loaded\"), state.wait * 1000);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", load);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片翻面演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    perspective: 1200px;\n  }\n  .card3d {\n    width: var(--w, 220px); height: var(--h, 300px); cursor: pointer; position: relative;\n    transform-style: preserve-3d;\n    transition: transform var(--dur, .6s) cubic-bezier(.34,1.3,.5,1);\n  }\n  /* 翻转轴由参数决定：rotateY（左右）或 rotateX（上下） */\n  .card3d.flip { transform: var(--rot, rotateY(180deg)); }\n  /* 关键：正反两面都隐藏自己的背面，翻面时不会把另一面照穿 */\n  .face {\n    position: absolute; inset: 0; border-radius: var(--r, 16px);\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;\n    backface-visibility: hidden; -webkit-backface-visibility: hidden;\n    font-weight: 700;\n  }\n  .front { background: var(--fb, #1a1a1a); color: var(--fc, #fff); }\n  .back { background: var(--bb, #fff); border: 2px solid var(--bc, #1a1a1a); color: var(--bc, #1a1a1a); transform: var(--rot, rotateY(180deg)); }\n  .sub { font-size: 12px; font-weight: 400; opacity: .7; }\n</style>\n</head>\n<body>\n<div class=\"card3d\" id=\"card\" tabindex=\"0\">\n  <div class=\"face front\">正面</div>\n  <div class=\"face back\">背面<span class=\"sub\">再点翻回去</span></div>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.6, size: 220, radius: 16, dir: \"左右翻\",\n    frontBg: \"#1a1a1a\", frontColor: \"#ffffff\", backBg: \"#ffffff\", backColor: \"#1a1a1a\"\n  };\n  const card = document.getElementById(\"card\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--w\", state.size + \"px\");\n    s.setProperty(\"--h\", Math.round(state.size * 300 / 220) + \"px\"); // 保持 220:300 比例\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--rot\", state.dir === \"上下翻\" ? \"rotateX(180deg)\" : \"rotateY(180deg)\");\n    s.setProperty(\"--fb\", state.frontBg);\n    s.setProperty(\"--fc\", state.frontColor);\n    s.setProperty(\"--bb\", state.backBg);\n    s.setProperty(\"--bc\", state.backColor);\n  }\n  function flip() { card.classList.toggle(\"flip\"); }\n  card.addEventListener(\"click\", flip);\n  card.addEventListener(\"keydown\", (e) => {\n    if (e.key === \" \" || e.key === \"Enter\") { e.preventDefault(); flip(); }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>汉堡变叉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .burger {\n    width: var(--size, 56px); height: var(--size, 56px); border-radius: var(--r, 12px);\n    cursor: pointer; user-select: none;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--gap, 7px);\n    background: var(--bg, #1a1a1a); transition: background .2s ease;\n  }\n  .burger:active { background: var(--pr, #333); }\n  /* 单个元件（三条线）完成汉堡↔叉的切换，操作位置不丢；--off = 间距+线粗 */\n  .burger span {\n    width: var(--line, 28px); height: var(--th, 3px); border-radius: 3px; background: var(--lc, #fff);\n    transition: transform var(--dur, .32s) ease, opacity var(--dur, .32s) ease;\n  }\n  .burger.open span:nth-child(1) { transform: translateY(var(--off, 10px)) rotate(45deg); }\n  .burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }\n  .burger.open span:nth-child(3) { transform: translateY(calc(-1 * var(--off, 10px))) rotate(-45deg); }\n</style>\n</head>\n<body>\n<div class=\"burger\" id=\"bg\" role=\"button\" aria-label=\"菜单\" tabindex=\"0\">\n  <span></span><span></span><span></span>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.32, size: 56, thick: 3, gap: 7, radius: 12,\n    bgColor: \"#1a1a1a\", lineColor: \"#ffffff\", pressColor: \"#333333\"\n  };\n  const bg = document.getElementById(\"bg\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--size\", state.size + \"px\");\n    s.setProperty(\"--th\", state.thick + \"px\");\n    s.setProperty(\"--gap\", state.gap + \"px\");\n    // 汇合距离 = 间距 + 线粗，变叉时上下两条线正好在中线相交\n    s.setProperty(\"--off\", (state.gap + state.thick) + \"px\");\n    s.setProperty(\"--line\", Math.round(state.size / 2) + \"px\"); // 线长随按钮尺寸缩放\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--bg\", state.bgColor);\n    s.setProperty(\"--lc\", state.lineColor);\n    s.setProperty(\"--pr\", state.pressColor);\n  }\n  function toggle() { bg.classList.toggle(\"open\"); }\n  bg.addEventListener(\"click\", toggle);\n  bg.addEventListener(\"keydown\", (e) => {\n    if (e.key === \" \" || e.key === \"Enter\") { e.preventDefault(); toggle(); }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片抽走演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .deck { position: relative; }\n  .pcard {\n    position: absolute; inset: 0; border-radius: var(--r, 16px); cursor: pointer; user-select: none;\n    display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px;\n    transition: transform var(--dur, .4s) cubic-bezier(.4,0,.2,1), opacity var(--dur, .4s) ease;\n  }\n  .pcard.top { background: var(--tbg, #1a1a1a); color: var(--tc, #fff); }\n  .pcard.under1 { background: #e8e8e8; color: #1a1a1a; }\n  .pcard.under2 { background: #f5f5f5; color: #1a1a1a; }\n  /* 抽走：上面的卡片移开 + 旋转 + 淡出，露出下面压着的卡 */\n  .pcard.gone {\n    transform: translate(var(--fx, 220px), var(--fy, -60px)) rotate(var(--rot, 18deg)) scale(var(--sh, .85));\n    opacity: 0; pointer-events: none;\n  }\n</style>\n</head>\n<body>\n<div class=\"deck\" id=\"deck\">\n  <div class=\"pcard top\">第 1 张</div>\n  <div class=\"pcard under1\">第 2 张</div>\n  <div class=\"pcard under2\">第 3 张</div>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.4, offset: 8, flyX: 220, flyY: -60, rotate: 18, shrink: 0.85,\n    radius: 16, cardWidth: 240, topBg: \"#1a1a1a\", topColor: \"#ffffff\"\n  };\n  const deck = document.getElementById(\"deck\");\n  const root = document.documentElement;\n  const cards = [...deck.querySelectorAll(\".pcard\")];\n\n  // 把剩下的卡按堆叠偏移重新压好\n  function restack() {\n    cards.forEach((c, i) => {\n      if (c.classList.contains(\"gone\")) return;\n      c.style.transform = i === 0 ? \"\" :\n        \"translate(\" + i * state.offset + \"px,\" + i * state.offset + \"px) scale(\" + (1 - i * 0.04) + \")\";\n    });\n  }\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--fx\", state.flyX + \"px\");\n    s.setProperty(\"--fy\", state.flyY + \"px\");\n    s.setProperty(\"--rot\", state.rotate + \"deg\");\n    s.setProperty(\"--sh\", state.shrink);\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--tbg\", state.topBg);\n    s.setProperty(\"--tc\", state.topColor);\n    deck.style.width = state.cardWidth + \"px\";\n    deck.style.height = Math.round(state.cardWidth * 320 / 240) + \"px\";\n    restack();\n  }\n\n  deck.addEventListener(\"click\", () => {\n    const top = deck.querySelector(\".pcard:not(.gone)\");\n    if (!top) return;\n    top.classList.add(\"gone\");\n    // 抽出后剩下的卡自动浮正，重新压好\n    restack();\n    setTimeout(() => {\n      if (!deck.querySelector(\".pcard:not(.gone)\")) {\n        // 抽完了：把牌堆还原\n        cards.forEach(c => c.classList.remove(\"gone\"));\n        restack();\n      }\n    }, 1600);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>底部抽屉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 遮罩：颜色 + 浓度分两个变量，透明度直接参与过渡 */\n  .mask {\n    position: fixed; inset: 0; background: var(--mc, #000000); opacity: 0; pointer-events: none;\n    transition: opacity var(--dur, .3s) ease;\n  }\n  .mask.show { opacity: var(--mo, .35); pointer-events: auto; }\n  .drawer {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 240px);\n    border-radius: var(--r, 20px) var(--r, 20px) 0 0;\n    background: var(--db, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,.12);\n    transform: translateY(105%);\n  }\n  /* 关键帧停顿：滑到露出大半时顿一下，再完全展开——状态更容易被识别 */\n  .drawer.in { animation: drawerIn var(--dur, .38s) ease-out forwards; }\n  .drawer.out { animation: drawerOut var(--od, .26s) ease-in forwards; }\n  @keyframes drawerIn {\n    0%   { transform: translateY(105%); }\n    55%  { transform: translateY(12%); }\n    70%  { transform: translateY(6%); }\n    100% { transform: translateY(0); }\n  }\n  @keyframes drawerOut { to { transform: translateY(105%); } }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: #ddd; margin: 10px auto 0; }\n  .title { text-align: center; font-weight: 800; font-size: 17px; margin-top: 12px; color: var(--tc, #1a1a1a); }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开抽屉</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"drawer\" id=\"drawer\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"title\">底部抽屉</div>\n  \n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38, outDur: 0.26, height: 240, radius: 20,\n    maskColor: \"#000000\", maskOpacity: 0.35, drawerBg: \"#ffffff\", titleColor: \"#1a1a1a\", handle: true\n  };\n  const mask = document.getElementById(\"mask\");\n  const drawer = document.getElementById(\"drawer\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--od\", state.outDur + \"s\");\n    s.setProperty(\"--h\", state.height + \"px\");\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--mc\", state.maskColor);\n    s.setProperty(\"--mo\", state.maskOpacity);\n    s.setProperty(\"--db\", state.drawerBg);\n    s.setProperty(\"--tc\", state.titleColor);\n    document.getElementById(\"handle\").style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() {\n    drawer.classList.remove(\"out\");\n    drawer.classList.add(\"in\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    drawer.classList.remove(\"in\");\n    drawer.classList.add(\"out\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>半屏停留演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 底层页面：始终保留可见区域，半屏弹层不遮完 */\n  .bg { position: fixed; inset: 0; padding: 60px 40px; }\n  .bg-card {\n    background: #f5f5f5; border-radius: 16px; padding: 24px;\n    max-width: 320px; margin: 0 auto;\n  }\n  .bg-card h3 { font-size: 16px; margin-bottom: 10px; }\n  .bg-card p { font-size: 13px; color: #666; line-height: 1.7; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.25)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--h, 50vh); border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%); transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; color: var(--titlec, #1a1a1a); }\n</style>\n</head>\n<body>\n<div class=\"bg\">\n  <div class=\"bg-card\">\n    <h3>页面内容</h3>\n    \n  </div>\n</div>\n<button class=\"btn\" id=\"open\">打开半屏弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">半屏停留</div>\n  \n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    height: 50,        // 弹层高度（vh）\n    mask: 0.25,        // 遮罩浓度\n    dur: 0.35,         // 弹出时长（秒）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    handle: true,      // 是否显示顶部手柄\n    maskColor: \"#000000\", // 遮罩颜色\n    sheetBg: \"#ffffff\",   // 弹层底色\n    handleColor: \"#dddddd\", // 手柄颜色\n    titleColor: \"#1a1a1a\"  // 标题文字颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba，用于遮罩色 + 浓度合成\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--h\", state.height + \"vh\");\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask)); // 颜色+浓度都生效\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--titlec\", state.titleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>全屏展开演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .35s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.4)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--half, 50vh); border-radius: var(--radius, 16px) var(--radius, 16px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: height var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                border-radius var(--dur, .38s) ease,\n                transform var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1));\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 全屏时：圆角归零、抓手移到顶部缩成一条，视觉统一不穿帮 */\n  .sheet.full { height: 100%; border-radius: 0; }\n  .handle {\n    width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd);\n    margin: 10px auto 0; transition: transform var(--dur, .38s) ease, margin var(--dur, .38s) ease;\n  }\n  .sheet.full .handle { transform: translateY(6px) scaleX(6); margin-top: 6px; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; color: var(--titlec, #1a1a1a); }\n  .full-btn {\n    display: block; margin: 18px auto 0; cursor: pointer; user-select: none; border: none;\n    background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 700;\n    padding: 8px 20px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">半屏 → 全屏</div>\n  <button class=\"full-btn\" id=\"full\">展开全屏</button>\n  </div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38,           // 过渡时长（秒）\n    radius: 16,          // 半屏时顶部圆角（px）\n    half: 50,            // 半屏高度（vh）\n    shadow: 0.12,        // 投影浓度\n    handle: true,        // 是否显示顶部手柄\n    mask: 0.4,           // 遮罩浓度\n    maskColor: \"#000000\",   // 遮罩颜色\n    sheetBg: \"#ffffff\",     // 弹层底色\n    handleColor: \"#dddddd\", // 手柄颜色\n    titleColor: \"#1a1a1a\"   // 标题文字颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--half\", state.half + \"vh\");\n    R.setProperty(\"--dur\", state.dur + \"s\"); // 时长走 CSS 变量，改动即时生效\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--titlec\", state.titleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\", \"full\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  document.getElementById(\"full\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    sheet.classList.toggle(\"full\");\n  });\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>背景处理演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 底层内容：弹层打开时模糊 + 轻微缩小，强化\"退到后面\"的状态 */\n  .bg {\n    position: fixed; inset: 0; padding: 40px;\n    display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;\n    transition: filter var(--dur, .35s) ease, transform var(--dur, .35s) ease;\n  }\n  .bg.away { filter: blur(var(--blur, 6px)) brightness(var(--dim, .72)); transform: scale(var(--scale, .96)); }\n  .mini {\n    background: var(--card, #f0f0f0); border-radius: 14px; padding: 20px;\n    font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center;\n    color: #666; min-height: 120px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background var(--dur, .35s) ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.25)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 45vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%); transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<div class=\"bg\" id=\"bg\">\n  <div class=\"mini\">内容卡片 1</div>\n  <div class=\"mini\">内容卡片 2</div>\n  <div class=\"mini\">内容卡片 3</div>\n  <div class=\"mini\">内容卡片 4</div>\n</div>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">示例弹层</div>\n  \n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    blur: 6,          // 底层模糊（px）\n    scale: 0.96,      // 底层缩小比例\n    dur: 0.35,        // 过渡时长（秒）\n    dim: 0.72,        // 底层压暗程度（1=不变暗）\n    sheetH: 45,       // 弹层高度（vh）\n    radius: 20,       // 顶部圆角（px）\n    mask: 0.25,       // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    cardBg: \"#f0f0f0\",     // 底层卡片颜色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const bg = document.getElementById(\"bg\");\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--blur\", state.blur + \"px\");\n    R.setProperty(\"--scale\", state.scale);\n    R.setProperty(\"--dim\", state.dim);\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--card\", state.cardBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n  }\n\n  function open() {\n    bg.classList.add(\"away\");\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    bg.classList.remove(\"away\");\n    sheet.classList.remove(\"show\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>弹性动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 45vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n  }\n  /* 弹出：先拉伸过头再复位，模拟物理拉扯质感 */\n  .sheet.in { animation: sheetIn var(--dur, .45s) cubic-bezier(.32,.72,0,1) forwards; }\n  .sheet.out { animation: sheetOut var(--dur, .25s) ease-in forwards; }\n  @keyframes sheetIn {\n    0%   { transform: translateY(105%) scaleY(var(--stretch, .92)); }\n    55%  { transform: translateY(var(--oy, -4%)) scaleY(1); }\n    78%  { transform: translateY(2%) scaleY(var(--over, 1.02)); }\n    100% { transform: translateY(0) scaleY(1); }\n  }\n  @keyframes sheetOut { to { transform: translateY(105%); } }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">示例弹层</div>\n  \n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    stretch: 0.92,    // 起始压扁程度（越小越扁）\n    over: 1.02,       // 回落时的过冲拉伸\n    dur: 0.45,        // 弹出时长（秒）\n    oy: -4,           // 冲过头位移（%，负=向上冲）\n    sheetH: 45,       // 弹层高度（vh）\n    radius: 20,       // 顶部圆角（px）\n    shadow: 0.12,     // 投影浓度\n    handle: true,     // 是否显示顶部手柄\n    mask: 0.3,        // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--stretch\", state.stretch); // 关键帧里读 CSS 变量，改完再弹立即生效\n    R.setProperty(\"--over\", state.over);\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--oy\", state.oy + \"%\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() {\n    sheet.classList.remove(\"out\");\n    sheet.classList.add(\"in\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    sheet.classList.remove(\"in\");\n    sheet.classList.add(\"out\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>拖拽关闭演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .3s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .sheet.dragging { transition: none; }\n  .sheet.gone { transform: translateY(105%); }\n  .grab { padding: 14px 0 6px; cursor: grab; touch-action: none; user-select: none; }\n  .grab:active { cursor: grabbing; }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 0 auto; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 10px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"grab\" id=\"grab\"><div class=\"handle\"></div></div>\n  <div class=\"sheet-title\">示例弹层</div>\n  </div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    threshold: 30,     // 关闭阈值（拖过弹层高度的百分比）\n    dur: 0.3,          // 回弹/收起时长（秒）\n    vel: 1.0,          // 甩动关闭速度（px/ms）\n    followRatio: 1,    // 跟手比例（0.5=弹层只走一半）\n    maskFollow: true,  // 拖动时遮罩跟随渐隐\n    sheetH: 55,        // 弹层高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const grab = document.getElementById(\"grab\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    // 拖拽逻辑参数（阈值/甩速/跟手比例）在松手判断时读 state；这里统一转数字，父页面传字符串也不会失灵\n    state.threshold = +state.threshold;\n    state.vel = +state.vel;\n    state.followRatio = +state.followRatio;\n  }\n\n  let startY = 0, curY = 0, lastY = 0, lastT = 0, dragging = false, vel = 0;\n\n  grab.addEventListener(\"pointerdown\", (e) => {\n    dragging = true;\n    startY = curY = lastY = e.clientY;\n    lastT = performance.now();\n    vel = 0;\n    grab.setPointerCapture(e.pointerId);\n    sheet.classList.add(\"dragging\");\n    mask.style.transition = \"none\"; // 拖动时遮罩要跟手，关掉渐变\n  });\n  grab.addEventListener(\"pointermove\", (e) => {\n    if (!dragging) return;\n    curY = e.clientY;\n    const now = performance.now();\n    const dt = now - lastT;\n    if (dt > 0) vel = (curY - lastY) / dt; // px/ms，正=往下甩\n    lastY = curY; lastT = now;\n    const dy = Math.max(0, curY - startY);\n    // 跟手比例：弹层实际位移 = 手指位移 × followRatio\n    const move = dy * state.followRatio;\n    sheet.style.transform = \"translateY(\" + move + \"px)\";\n    // 遮罩跟随渐隐：拖得越远越透明\n    if (state.maskFollow) mask.style.background = rgba(state.maskColor, state.mask * (1 - Math.min(1, dy / (sheet.offsetHeight * 1.2))));\n  });\n  function endDrag() {\n    if (!dragging) return;\n    dragging = false;\n    sheet.classList.remove(\"dragging\");\n    mask.style.transition = \"\";\n    mask.style.background = \"\";\n    const dist = (curY - startY) * state.followRatio; // 实际位移参与阈值判断\n    const ratio = dist / sheet.offsetHeight * 100;\n    // 判断：拖过阈值（距离）或甩得快（速度）\n    if (ratio > state.threshold || vel > state.vel) close(); else rebound();\n  }\n  grab.addEventListener(\"pointerup\", endDrag);\n  grab.addEventListener(\"pointercancel\", endDrag);\n\n  function rebound() {\n    sheet.classList.add(\"show\");\n    sheet.style.transform = \"\";\n    setTimeout(() => sheet.classList.remove(\"show\", \"gone\"), state.dur * 1000 + 60);\n  }\n  function close() {\n    sheet.style.transform = \"\";\n    sheet.classList.remove(\"show\");\n    sheet.classList.add(\"gone\");\n    mask.classList.remove(\"show\");\n    setTimeout(() => sheet.classList.remove(\"gone\"), state.dur * 1000 + 60);\n  }\n  function open() {\n    sheet.classList.remove(\"gone\");\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>档位吸附演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--h, 35vh); border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: height var(--dur, .28s) cubic-bezier(.32,.72,0,1), transform var(--dur, .28s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .sheet.dragging { transition: none; }\n  .grab { padding: 14px 0 6px; cursor: grab; touch-action: none; user-select: none; }\n  .grab:active { cursor: grabbing; }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 0 auto; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 10px; }\n  .mark { text-align: center; font-size: 12px; color: var(--markc, #999); margin-top: 6px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"grab\" id=\"grab\"><div class=\"handle\"></div></div>\n  <div class=\"sheet-title\">示例弹层</div>\n  <p class=\"mark\" id=\"mark\">当前档位：35%</p>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.28,         // 吸附动画时长（秒）\n    snap: 3,           // 档位数量（2~5）\n    magnet: 1,         // 磁吸范围（0-1，越接近 1 越远也能吸）\n    marks: true,       // 显示档位标签\n    sheetH: 35,        // 初始档位高度（vh，取最近档位）\n    radius: 20,        // 顶部圆角（px）\n    minH: 120,         // 最小可拖高度（px）\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\",// 手柄颜色\n    markColor: \"#999999\"   // 档位标签颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const grab = document.getElementById(\"grab\");\n  const mark = document.getElementById(\"mark\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n  // 根据档位数量生成档位表（均分 0~100%）\n  const snaps = () => {\n    const n = Math.max(2, Math.round(state.snap));\n    return Array.from({ length: n }, (_, i) => (i + 1) / n);\n  };\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", nearest(state.sheetH / 100) * 100 + \"vh\"); // 初始高度吸附到最近档位\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--markc\", state.markColor);\n    mark.style.display = state.marks ? \"block\" : \"none\";\n    // 拖拽逻辑参数：档位数量先归一（经 nearest() 生效），磁吸范围/最小高度在松手与拖动时读 state\n    state.snap = Math.max(2, Math.round(+state.snap));\n    state.magnet = +state.magnet;\n    state.minH = +state.minH;\n    if (state.marks) mark.textContent = \"当前档位：\" + Math.round(nearest(parseFloat(sheet.style.height || state.sheetH + \"vh\") / innerHeight) * 100) + \"%\";\n  }\n  // 找最近档位\n  function nearest(cur) {\n    let best = snaps()[0];\n    snaps().forEach(s => { if (Math.abs(s - cur) < Math.abs(best - cur)) best = s; });\n    return best;\n  }\n\n  let startY = 0, dragging = false;\n  const vh = () => window.innerHeight;\n\n  grab.addEventListener(\"pointerdown\", (e) => {\n    dragging = true;\n    startY = e.clientY;\n    grab.setPointerCapture(e.pointerId);\n    sheet.classList.add(\"dragging\");\n  });\n  grab.addEventListener(\"pointermove\", (e) => {\n    if (!dragging) return;\n    const dy = e.clientY - startY;\n    const h = Math.max(state.minH, vh() - dy);\n    sheet.style.height = h + \"px\";\n  });\n  function endDrag(e) {\n    if (!dragging) return;\n    dragging = false;\n    sheet.classList.remove(\"dragging\");\n    // 松手：距离最近档位在磁吸范围内 → 吸附；否则停在原地\n    const cur = parseFloat(sheet.style.height || sheet.offsetHeight) / vh();\n    const best = nearest(cur);\n    if (Math.abs(best - cur) <= state.magnet) {\n      sheet.style.height = (best * 100) + \"vh\";\n      if (state.marks) mark.textContent = \"当前档位：\" + Math.round(best * 100) + \"%\";\n    }\n  }\n  grab.addEventListener(\"pointerup\", endDrag);\n  grab.addEventListener(\"pointercancel\", endDrag);\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>嵌套抽屉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .btn.sec { background: #fff; color: #1a1a1a; border: 2px solid #1a1a1a; margin-top: 14px; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.35)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h1, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--bg1, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1), scale var(--dur, .35s) ease, filter var(--dur, .35s) ease;\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 第二层弹出：第一层后退 + 缩小 + 变暗 */\n  .sheet.back { transform: translateY(0) scale(var(--back, .94)); filter: brightness(var(--dim, .72)); }\n  .sheet2 {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h2, 70vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--bg2, #f7f7f7); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow2, .14));\n    transform: translateY(105%);\n    transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet2.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开第一层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"s1\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">第一层</div>\n  <div style=\"text-align:center\"><button class=\"btn sec\" id=\"open2\">打开第二层</button></div>\n</div>\n<div class=\"sheet2\" id=\"s2\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">第二层</div>\n  </div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.35,         // 两层弹出时长（秒）\n    back: 0.94,        // 第一层后退缩小比例\n    dim: 0.72,         // 第一层压暗程度（1=不变暗）\n    h1: 55,            // 第一层高度（vh）\n    h2: 70,            // 第二层高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 第一层投影浓度\n    mask: 0.35,        // 遮罩浓度\n    maskColor: \"#000000\", // 遮罩颜色\n    bg1: \"#ffffff\",       // 第一层底色\n    bg2: \"#f7f7f7\"        // 第二层底色\n  };\n  const mask = document.getElementById(\"mask\");\n  const s1 = document.getElementById(\"s1\");\n  const s2 = document.getElementById(\"s2\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--back\", state.back);\n    R.setProperty(\"--dim\", state.dim);\n    R.setProperty(\"--h1\", state.h1 + \"vh\");\n    R.setProperty(\"--h2\", state.h2 + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--shadow2\", Math.min(0.4, state.shadow + 0.02)); // 第二层影子稍重一点\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--bg1\", state.bg1);\n    R.setProperty(\"--bg2\", state.bg2);\n  }\n\n  document.getElementById(\"open\").addEventListener(\"click\", () => {\n    s1.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  });\n  document.getElementById(\"open2\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    s2.classList.add(\"show\");\n    s1.classList.add(\"back\");\n    mask.classList.add(\"show\");\n  });\n  mask.addEventListener(\"click\", () => {\n    s1.classList.remove(\"show\", \"back\");\n    s2.classList.remove(\"show\");\n    mask.classList.remove(\"show\");\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>转场衔接演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .btn.sec { background: #fff; color: #1a1a1a; border: 2px solid #1a1a1a; margin-top: 14px; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                height var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                border-radius var(--dur, .38s) ease,\n                background var(--dur, .38s) ease;\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 转场衔接：抽屉直接延伸为全屏新页面，不关掉重开 */\n  .sheet.page { height: 100%; border-radius: 0; transform: translateY(0); background: var(--page, #fff); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n  .page-body { display: none; text-align: center; padding: 30px 20px; }\n  .sheet.page .sheet-title, .sheet.page .handle { display: none; }\n  .sheet.page .page-body { display: block; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开抽屉</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">示例内容</div>\n  <div style=\"text-align:center\"><button class=\"btn sec\" id=\"go\">进入详情页</button></div>\n  <div class=\"page-body\">\n    <h3 style=\"margin-bottom:10px\">详情页 ✓</h3>\n    <p style=\"font-size:13px;color:#666\">抽屉直接延伸成了新页面，中间没有「关掉再打开」的割裂感。</p>\n  </div>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38,         // 转场时长（秒）\n    ease: \"先快后慢\",   // 缓动方式\n    sheetH: 55,        // 抽屉高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 抽屉底色\n    pageBg: \"#ffffff\",     // 详情页底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n  // 缓动方式 → 贝塞尔曲线（走 CSS 变量，改完立即生效）\n  const EASES = {\n    \"先快后慢\": \"cubic-bezier(.32,.72,0,1)\",\n    \"匀速\": \"linear\",\n    \"回弹\": \"cubic-bezier(.34,1.56,.64,1)\"\n  };\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--ease\", EASES[state.ease] || EASES[\"先快后慢\"]);\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--page\", state.pageBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n  }\n\n  document.getElementById(\"open\").addEventListener(\"click\", () => {\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  });\n  document.getElementById(\"go\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    sheet.classList.add(\"page\");\n    mask.classList.remove(\"show\");\n  });\n  mask.addEventListener(\"click\", () => {\n    sheet.classList.remove(\"show\", \"page\");\n    mask.classList.remove(\"show\");\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>状态收尾演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .action {\n    position: relative; overflow: hidden; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--btnbg, #1a1a1a); color: var(--btnc, #fff);\n    font-size: 16px; font-weight: 700; letter-spacing: 2px;\n    width: var(--w, 200px); height: var(--h, 52px); border-radius: var(--radius, 14px);\n    transition: width var(--dur, .45s) cubic-bezier(.32,.72,0,1),\n                height var(--dur, .45s) cubic-bezier(.32,.72,0,1),\n                border-radius var(--dur, .45s) ease,\n                background var(--dur, .45s) ease;\n  }\n  /* 收尾：任务完成后，按钮变形为对勾提示状态（不是弹个新框） */\n  .action.done {\n    width: var(--final, 52px); height: var(--final, 52px);\n    border-radius: 50%; background: var(--ok, #16a34a); cursor: default;\n  }\n  .action .txt { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: opacity .2s ease; }\n  .action .tick {\n    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0;\n  }\n  .action.done .txt { opacity: 0; }\n  .action.done .tick { opacity: 1; }\n  .tick svg { width: 26px; height: 26px; }\n  .tick path {\n    fill: none; stroke: var(--tickc, #fff); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;\n    stroke-dasharray: 26; stroke-dashoffset: 26;\n    animation: drawTick var(--dur, .45s) ease .15s forwards;\n  }\n  @keyframes drawTick { to { stroke-dashoffset: 0; } }\n</style>\n</head>\n<body>\n<button class=\"action\" id=\"act\">\n  <span class=\"txt\" id=\"txt\">保存设置</span>\n  <span class=\"tick\"><svg viewBox=\"0 0 24 24\"><path d=\"M5 12.5 L10 17.5 L19 7\"></path></svg></span>\n</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.45,           // 收尾变形时长（秒）\n    text: \"保存设置\",     // 按钮文字\n    w: 200,              // 按钮宽度（px）\n    h: 52,               // 按钮高度（px）\n    radius: 14,          // 按钮圆角（px）\n    finalSize: 52,       // 收尾圆形直径（px）\n    success: \"#16a34a\",  // 成功色\n    btnBg: \"#1a1a1a\",    // 按钮底色\n    btnColor: \"#ffffff\", // 按钮文字颜色\n    tickColor: \"#ffffff\" // 对勾颜色\n  };\n  const act = document.getElementById(\"act\");\n  const txt = document.getElementById(\"txt\");\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--w\", state.w + \"px\");\n    R.setProperty(\"--h\", state.h + \"px\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--final\", state.finalSize + \"px\");\n    R.setProperty(\"--ok\", state.success);\n    R.setProperty(\"--btnbg\", state.btnBg);\n    R.setProperty(\"--btnc\", state.btnColor);\n    R.setProperty(\"--tickc\", state.tickColor);\n    txt.textContent = state.text; // 按钮文字实时可改\n  }\n\n  act.addEventListener(\"click\", () => {\n    if (act.classList.contains(\"done\")) return;\n    act.classList.add(\"done\");\n    act.setAttribute(\"aria-label\", \"已完成\");\n    setTimeout(() => act.classList.remove(\"done\"), 2400);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>模糊进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .rail {\n    position: relative;\n    width: var(--width, 300px);\n    height: var(--thick, 6px);\n    border-radius: var(--round, 6px);\n    background: var(--track, #eee);\n    overflow: hidden;\n  }\n  .indet {\n    position: absolute; top: 0; height: 100%;\n    width: calc(100% / var(--count, 2) - var(--gap, 4px));\n    border-radius: var(--round, 6px);\n    background: var(--color, #1a1a1a);\n    opacity: var(--opa, 1);\n    box-shadow: var(--glow, 0 0 0 transparent);\n    animation: indetSlide var(--speed, 1.6s) ease-in-out infinite;\n  }\n  @keyframes indetSlide {\n    0%   { left: calc(-1 * (100% / var(--count, 2))); }\n    100% { left: calc(100%); }\n  }\n</style>\n</head>\n<body>\n<div class=\"rail\" id=\"rail\"></div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    speed: 1.6,        // 流动速度（秒）\n    count: 2,          // 光条数量（条）\n    thick: 6,          // 粗细（px）\n    round: 6,          // 圆角（px）\n    width: 300,        // 轨道宽度（px）\n    gap: 4,            // 光条间隔（px）\n    opa: 1,            // 透明度（0-1）\n    glow: false,       // 是否发光\n    color: \"#1a1a1a\",  // 光条主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const rail = document.getElementById(\"rail\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--speed\", state.speed + \"s\");\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--round\", state.round + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--opa\", state.opa);\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--count\", state.count);\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 \" + Math.max(8, state.thick * 2) + \"px \" + state.color + \"66\")\n      : \"0 0 0 transparent\");\n    // 按条数重建光条（错开延迟，像波浪）\n    rail.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const b = document.createElement(\"div\");\n      b.className = \"indet\";\n      if (i > 0) b.style.animationDelay = (-state.speed * i / state.count) + \"s\";\n      rail.appendChild(b);\n    }\n  }\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>明确进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .row { display: flex; align-items: center; gap: 14px; }\n  .rail {\n    position: relative;\n    width: var(--width, 300px);\n    height: var(--thick, 8px);\n    border-radius: var(--round, 8px);\n    background: var(--track, #eee);\n    overflow: hidden;\n  }\n  .fill {\n    height: 100%; width: 0%;\n    border-radius: var(--round, 8px);\n    background: var(--color, #1a1a1a);\n    box-shadow: var(--glow, 0 0 0 transparent);\n    transition: width .12s linear;\n  }\n  .pct {\n    font-size: var(--pctSize, 18px);\n    font-weight: 800;\n    font-variant-numeric: tabular-nums;\n    min-width: 48px;\n    text-align: right;\n    color: var(--color, #1a1a1a);\n    display: var(--showPct, inline);\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"row\">\n  <div class=\"rail\"><div class=\"fill\" id=\"fill\"></div></div>\n  <div class=\"pct\" id=\"pct\">0%</div>\n</div>\n<button class=\"btn\" id=\"btn\">重新加载</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 2,            // 加载时长（秒），越大越慢\n    thick: 8,          // 轨道粗细（px）\n    round: 8,          // 圆角（px）\n    width: 300,        // 轨道宽度（px）\n    easing: \"easeOut\", // 缓动：easeOut（开头快结尾缓）/ linear（匀速）/ easeInOut（两端缓）\n    showPct: true,     // 是否显示百分比数字\n    pctSize: 18,       // 百分比字号\n    glow: false,       // 填充是否发光\n    color: \"#1a1a1a\",  // 填充主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const fill = document.getElementById(\"fill\");\n  const pct = document.getElementById(\"pct\");\n\n  // 缓动函数：把进度 t（0-1）映射到不同曲线\n  function ease(t) {\n    if (state.easing === \"linear\") return t;\n    if (state.easing === \"easeInOut\") return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;\n    return 1 - Math.pow(1 - t, 3); // easeOut：开头快结尾缓\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--round\", state.round + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    root.style.setProperty(\"--showPct\", state.showPct ? \"inline\" : \"none\");\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 \" + Math.max(6, state.thick) + \"px \" + state.color + \"66\")\n      : \"0 0 0 transparent\");\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    fill.style.width = \"0%\";\n    pct.textContent = \"0%\";\n    const start = performance.now();\n    const dur = state.dur * 1000;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const p = Math.round(100 * ease(t));\n      fill.style.width = p + \"%\";\n      pct.textContent = p + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    applyStyle();\n    if (d.key === \"dur\" || d.key === \"easing\") run();\n  });\n  applyStyle();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>环形进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .ring-wrap {\n    position: relative;\n    width: var(--size, 120px); height: var(--size, 120px);\n  }\n  .ring-track { fill: none; stroke: var(--track, #eee); stroke-width: var(--thick, 10); }\n  .ring {\n    fill: none; stroke: var(--color, #1a1a1a); stroke-width: var(--thick, 10);\n    stroke-linecap: var(--cap, round);\n    stroke-dasharray: 326.7; stroke-dashoffset: 326.7;\n    transform: rotate(var(--rot, -90deg)); transform-origin: center;\n    filter: drop-shadow(var(--glow, 0 0 0 transparent));\n  }\n  .ring-pct {\n    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;\n    font-size: var(--pctSize, 24px); font-weight: 800; font-variant-numeric: tabular-nums;\n    color: var(--color, #1a1a1a);\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"ring-wrap\" id=\"wrap\">\n  <svg viewBox=\"0 0 120 120\" id=\"svg\">\n    <circle class=\"ring-track\" id=\"ringTrack\" cx=\"60\" cy=\"60\" r=\"52\"></circle>\n    <circle class=\"ring\" id=\"ring\" cx=\"60\" cy=\"60\" r=\"52\"></circle>\n  </svg>\n  <div class=\"ring-pct\" id=\"pct\">0%</div>\n</div>\n<button class=\"btn\" id=\"btn\">重新转</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 2,            // 转满时长（秒）\n    easing: \"easeOut\", // 缓动\n    size: 120,         // 环直径（px）\n    thick: 10,         // 环线粗细（px）\n    cap: \"round\",      // 端点形状\n    rot: -90,          // 起点旋转角度\n    showPct: true,     // 是否显示百分比文字\n    pctSize: 24,       // 百分比字号\n    glow: false,       // 环是否发光\n    reverse: false,    // 进度方向（顺时针/逆时针）\n    color: \"#1a1a1a\",  // 环主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const ring = document.getElementById(\"ring\");\n  const ringTrack = document.getElementById(\"ringTrack\");\n  const pct = document.getElementById(\"pct\");\n  const wrap = document.getElementById(\"wrap\");\n  const svg = document.getElementById(\"svg\");\n\n  function ease(t) {\n    if (state.easing === \"linear\") return t;\n    if (state.easing === \"easeInOut\") return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;\n    return 1 - Math.pow(1 - t, 3);\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--size\", state.size + \"px\");\n    root.style.setProperty(\"--cap\", state.cap === \"butt\" ? \"butt\" : \"round\");\n    root.style.setProperty(\"--rot\", state.rot + \"deg\");\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    root.style.setProperty(\"--showPct\", state.showPct ? \"flex\" : \"none\");\n    pct.style.display = state.showPct ? \"flex\" : \"none\";\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 6px \" + state.color + \"88\")\n      : \"0 0 0 transparent\");\n    svg.setAttribute(\"width\", state.size);\n    svg.setAttribute(\"height\", state.size);\n    const r = 52 - Math.min(state.thick / 2, 8);\n    ring.setAttribute(\"r\", r);\n    ringTrack.setAttribute(\"r\", r);\n    const circ = 2 * Math.PI * r;\n    ring.style.strokeDasharray = circ;\n    ring.style.strokeDashoffset = circ;\n    pct.textContent = \"0%\";\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    const r = 52 - Math.min(state.thick / 2, 8);\n    const circ = 2 * Math.PI * r;\n    ring.style.strokeDashoffset = circ;\n    pct.textContent = \"0%\";\n    const start = performance.now();\n    const dur = state.dur * 1000;\n    const dir = state.reverse ? -1 : 1;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const p = Math.round(100 * ease(t));\n      ring.style.strokeDashoffset = circ * (1 - p / 100);\n      pct.textContent = p + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    applyStyle();\n    if (d.key === \"dur\" || d.key === \"easing\" || d.key === \"reverse\") run();\n  });\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>微光动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .demo-card { width: var(--width, 300px); background: #fff; border-radius: 14px; padding: 18px; box-shadow: 0 4px 14px rgba(0,0,0,.06); }\n  /* 微光：叠加在占位块上的移动亮光，提示「内容加载中」 */\n  .ph {\n    border-radius: var(--round, 8px); margin-bottom: 12px;\n    background: linear-gradient(var(--angle, 100deg),\n      var(--bg, #ececec) 40%, rgb(255 255 255 / var(--light, .6)) 50%, var(--bg, #ececec) 60%);\n    background-size: 200% 100%;\n    animation: shimmer var(--dur, 1.2s) infinite linear;\n  }\n  .ph-avatar { width: 44px; height: 44px; border-radius: 50%; margin-bottom: 12px; }\n  .ph-line { height: var(--lineH, 14px); }\n  .ph-line.w60 { width: 60%; }\n  .ph-line.w40 { width: 40%; }\n  @keyframes shimmer {\n    from { background-position: 130% 0; }\n    to   { background-position: -70% 0; }\n  }\n</style>\n</head>\n<body>\n<div class=\"demo-card\">\n  <div class=\"ph ph-avatar\"></div>\n  <div class=\"ph ph-line\"></div>\n  <div class=\"ph ph-line w60\"></div>\n  <div class=\"ph ph-line w40\"></div>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 1.2,          // 光带流动周期（秒）\n    angle: 100,        // 光带倾斜角度（度）\n    light: 0.6,        // 高光峰值亮度（0-1）\n    width: 300,        // 卡片宽度（px）\n    round: 8,          // 占位圆角（px）\n    lineH: 14,         // 文字行高（px）\n    count: 4,          // 占位行数\n    lastW: 40,         // 末行宽度百分比（%）\n    reverse: false,    // 反向流动\n    pulse: false,      // 是否随时间轻微脉动亮度\n    bg: \"#ececec\",     // 底色\n    lightColor: \"#ffffff\" // 高光颜色\n  };\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--dur\", (state.reverse ? -1 : 1) * state.dur + \"s\");\n    root.style.setProperty(\"--angle\", state.angle + \"deg\");\n    root.style.setProperty(\"--light\", state.light);\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--round\", state.round + \"px\");\n    root.style.setProperty(\"--lineH\", state.lineH + \"px\");\n    root.style.setProperty(\"--bg\", state.bg);\n    // 重新生成占位行\n    const card = document.querySelector(\".demo-card\");\n    // 保留第一个 avatar\n    const avatar = card.querySelector(\".ph-avatar\").outerHTML;\n    card.innerHTML = avatar;\n    for (let i = 0; i < state.count - 1; i++) {\n      const d = document.createElement(\"div\");\n      d.className = \"ph ph-line\";\n      if (i === state.count - 2) d.classList.add(\"w\" + Math.min(95, Math.max(15, state.lastW)));\n      else if (i % 2 === 0) d.classList.add(\"w60\");\n      else d.style.width = (50 + (i * 7) % 35) + \"%\";\n      card.appendChild(d);\n    }\n    // 脉动：CSS 变量 + JS 同步\n    if (state.pulse) {\n      document.querySelectorAll(\".ph\").forEach(el => {\n        el.style.animation += \", pulse 1.8s ease-in-out infinite\";\n      });\n    }\n  }\n  // 加 keyframes\n  const styleEl = document.createElement(\"style\");\n  styleEl.textContent = \"@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }\";\n  document.head.appendChild(styleEl);\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>按钮加载演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .btn {\n    position: relative; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--color, #1a1a1a); color: var(--txtColor, #fff);\n    font-size: var(--fontSize, 16px); font-weight: 700; letter-spacing: var(--letter, 2px);\n    min-width: var(--minW, 180px); height: var(--height, 48px);\n    border-radius: var(--radius, 12px);\n    display: flex; align-items: center; justify-content: center; gap: 10px;\n    transition: background .2s ease, opacity .2s ease;\n  }\n  .btn:active:not(.loading) { transform: scale(.97); }\n  .btn.loading { opacity: .75; cursor: default; pointer-events: none; }\n  .spinner {\n    display: none; width: var(--sSize, 16px); height: var(--sSize, 16px); border-radius: 50%;\n    border: var(--sThick, 2px) solid var(--sTrack, rgba(255,255,255,.35));\n    border-top-color: var(--sHead, #fff);\n    animation: spin var(--dur, .9s) linear infinite;\n  }\n  .btn.loading .spinner { display: inline-block; }\n  @keyframes spin { to { transform: rotate(360deg); } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">\n  <span class=\"spinner\"></span>\n  <span class=\"txt\" id=\"txt\">提交</span>\n</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.9,          // 旋转一圈秒数\n    wait: 1.8,          // 模拟后端处理时长（秒）\n    label: \"提交\",      // 按钮文案\n    loadingLabel: \"处理中\", // 加载中文案\n    doneLabel: \"已提交 ✓\",  // 完成文案\n    radius: 12,         // 圆角（px）\n    height: 48,         // 按钮高度（px）\n    minW: 180,          // 最小宽度（px）\n    fontSize: 16,       // 字号（px）\n    letter: 2,          // 字间距（px）\n    sSize: 16,          // 旋转图标大小（px）\n    sThick: 2,          // 旋转图标粗细（px）\n    color: \"#1a1a1a\",   // 按钮背景\n    txtColor: \"#ffffff\",// 按钮文字\n    sTrack: \"rgba(255,255,255,.35)\", // 旋转图标轨色\n    sHead: \"#ffffff\"    // 旋转图标头色\n  };\n  const btn = document.getElementById(\"btn\");\n  const txt = document.getElementById(\"txt\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--txtColor\", state.txtColor);\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--height\", state.height + \"px\");\n    root.style.setProperty(\"--minW\", state.minW + \"px\");\n    root.style.setProperty(\"--fontSize\", state.fontSize + \"px\");\n    root.style.setProperty(\"--letter\", state.letter + \"px\");\n    root.style.setProperty(\"--sSize\", state.sSize + \"px\");\n    root.style.setProperty(\"--sThick\", state.sThick + \"px\");\n    root.style.setProperty(\"--sTrack\", state.sTrack);\n    root.style.setProperty(\"--sHead\", state.sHead);\n    if (!btn.classList.contains(\"loading\")) txt.textContent = state.label;\n  }\n\n  btn.addEventListener(\"click\", () => {\n    if (btn.classList.contains(\"loading\")) return;\n    btn.classList.add(\"loading\");\n    txt.textContent = state.loadingLabel;\n    setTimeout(() => {\n      txt.textContent = state.doneLabel;\n      setTimeout(() => {\n        btn.classList.remove(\"loading\");\n        txt.textContent = state.label;\n      }, 900);\n    }, state.wait * 1000);\n  });\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>页面加载演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .loader {\n    position: fixed; inset: 0; background: var(--bg, #fff); z-index: 10;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--gap, 22px);\n    transition: opacity var(--dur, .5s) ease, visibility var(--dur, .5s) ease;\n  }\n  .loader.hide { opacity: 0; visibility: hidden; pointer-events: none; }\n  .logo { font-size: var(--logoSize, 30px); font-weight: 900; letter-spacing: var(--letter, 4px); color: var(--color, #1a1a1a); }\n  .logo span { opacity: 0; animation: popIn .5s ease forwards; display: inline-block; }\n  .logo span:nth-child(1) { animation-delay: .1s; }\n  .logo span:nth-child(2) { animation-delay: .2s; }\n  .logo span:nth-child(3) { animation-delay: .3s; }\n  .logo span:nth-child(4) { animation-delay: .4s; }\n  @keyframes popIn { to { opacity: 1; } }\n  .loader-bar {\n    width: var(--barW, 160px); height: var(--barH, 4px); border-radius: var(--barH, 4px); background: var(--track, #eee); overflow: hidden;\n  }\n  .loader-fill {\n    height: 100%; width: 40%; border-radius: var(--barH, 4px);\n    background: var(--color, #1a1a1a);\n    animation: fillSlide var(--speed, 1.2s) ease-in-out infinite;\n  }\n  @keyframes fillSlide {\n    0%   { transform: translateX(-100%); }\n    100% { transform: translateX(400%); }\n  }\n  .loader-tip { font-size: var(--tipSize, 13px); color: #999; }\n  .page {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;\n    padding: 40px; text-align: center;\n  }\n  .page h2 { font-size: 28px; }\n  .page p { font-size: 14px; color: #666; max-width: 420px; line-height: 1.8; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"loader\" id=\"loader\">\n  <div class=\"logo\" id=\"logo\"><span id=\"logoText\"></span></div>\n  <div class=\"loader-bar\"><div class=\"loader-fill\"></div></div>\n  <div class=\"loader-tip\" id=\"tip\">页面内容准备中…</div>\n</div>\n<div class=\"page\">\n  <h2>页面主体</h2>\n  <button class=\"btn\" id=\"btn\">重播加载</button>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    wait: 2,            // 加载层显示时长（秒）\n    dur: 0.5,           // 淡出时长（秒）\n    speed: 1.2,         // 内部进度条跑动速度（秒）\n    letter: 4,          // 标字母距（px）\n    gap: 22,            // 内部元素间距（px）\n    logoSize: 30,       // Logo 字号（px）\n    barW: 160,          // 进度条宽度（px）\n    barH: 4,            // 进度条粗细（px）\n    tipSize: 13,        // 提示字号（px）\n    showTip: true,      // 是否显示底部提示\n    spinnerOnly: false, // 是否只用旋转图标（不用进度条）\n    brand: \"加载完成\",  // 品牌名/Logo 文字\n    tip: \"页面内容准备中…\", // 提示文案\n    bg: \"#ffffff\",      // 加载层底色\n    color: \"#1a1a1a\",   // 主色\n    track: \"#eeeeee\"    // 进度条轨道色\n  };\n  const loader = document.getElementById(\"loader\");\n  const logoText = document.getElementById(\"logoText\");\n  const tipEl = document.getElementById(\"tip\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--speed\", state.speed + \"s\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--logoSize\", state.logoSize + \"px\");\n    root.style.setProperty(\"--letter\", state.letter + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--barW\", state.barW + \"px\");\n    root.style.setProperty(\"--barH\", state.barH + \"px\");\n    root.style.setProperty(\"--tipSize\", state.tipSize + \"px\");\n    logoText.innerHTML = \"\";\n    for (const ch of state.brand) {\n      const s = document.createElement(\"span\");\n      s.textContent = ch;\n      logoText.appendChild(s);\n    }\n    if (tipEl) tipEl.textContent = state.tip;\n    if (tipEl) tipEl.style.display = state.showTip ? \"block\" : \"none\";\n    document.querySelector(\".loader-bar\").style.display = state.spinnerOnly ? \"none\" : \"block\";\n  }\n\n  function play() {\n    loader.classList.remove(\"hide\");\n    setTimeout(() => loader.classList.add(\"hide\"), state.wait * 1000);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", play);\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n  play();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>流体融合演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #f4f6fb; }\n  /* 色块层：整体过 goo 滤镜，色块相遇时融合成液体 */\n  .goo { position: absolute; inset: 0; filter: url(#goo); opacity: .85; }\n  .blob { position: absolute; }\n  /* 前景示例内容：证明「轻量化不抢主体」 */\n  .card { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center; color: #333c4e; }\n  .card h1 { font-size: 30px; letter-spacing: 6px; margin-bottom: 10px; font-weight: 900; }\n  .card p { font-size: 13px; opacity: .7; letter-spacing: 2px; }\n</style>\n</head>\n<body>\n<!-- goo 滤镜：先高斯模糊，再把 alpha 通道拉开对比 → 模糊的交界被「焊」成液体 -->\n<svg width=\"0\" height=\"0\"><filter id=\"goo\">\n  <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"18\" result=\"b\"/>\n  <feColorMatrix in=\"b\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9\"/>\n</filter></svg>\n<div class=\"goo\" id=\"goo\"></div>\n<div class=\"card\" id=\"card\">\n  <h1>灵 感 弹 药 库</h1>\n  \n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    count: 4,          // 色块数量\n    size: 160,         // 色块大小（px）\n    moveSpeed: 1,      // 漂移速度（倍）\n    morphSpeed: 1,     // 形变速度（倍）\n    blur: 18,          // 柔化程度（px）\n    goo: 16,           // 融合度（越高越容易融在一起）\n    color1: \"#7fa8d9\", // 颜色一（低饱和蓝）\n    color2: \"#b8a7d9\", // 颜色二（低饱和紫）\n    color3: \"#8fd0c3\", // 颜色三（低饱和青）\n    bg: \"#f4f6fb\",     // 背景色\n    alpha: 0.85,       // 整体透明度\n    showCard: true     // 显示中间示例内容\n  };\n  const gooEl = document.getElementById(\"goo\");\n  const card = document.getElementById(\"card\");\n  const blurNode = document.querySelector(\"#goo feGaussianBlur\");\n  const matrixNode = document.querySelector(\"#goo feColorMatrix\");\n  let blobs = [];\n\n  // 重建色块（数量变化时调用）\n  function build() {\n    gooEl.innerHTML = \"\";\n    blobs = [];\n    for (let i = 0; i < state.count; i++) {\n      const el = document.createElement(\"div\");\n      el.className = \"blob\";\n      gooEl.appendChild(el);\n      blobs.push({ el, seed: i * 1.7 + 0.3 }); // seed 让每个色块轨迹错开\n    }\n    paint();\n  }\n\n  // 把参数落到 DOM / 滤镜上\n  function paint() {\n    const cs = [state.color1, state.color2, state.color3];\n    blobs.forEach((b, i) => {\n      b.el.style.width = b.el.style.height = state.size + \"px\";\n      b.el.style.background = cs[i % cs.length];\n    });\n    document.body.style.background = state.bg;\n    gooEl.style.opacity = state.alpha;\n    card.style.display = state.showCard ? \"\" : \"none\";\n    blurNode.setAttribute(\"stdDeviation\", state.blur);\n    // 融合度 → alpha 通道斜率：斜率越大，模糊交界被切得越「干脆」\n    const slope = 9 + state.goo;\n    matrixNode.setAttribute(\"values\", \"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 \" + slope + \" \" + (-(slope * 0.55)));\n  }\n  function apply() { build(); }\n\n  // 动画循环：色块各走椭圆轨迹 + 边界呼吸形变\n  let t = 0;\n  function frame() {\n    t += 0.016 * state.moveSpeed;\n    blobs.forEach(b => {\n      const s = b.seed;\n      const cx = 50 + 26 * Math.sin(t * 0.5 + s);        // 中心 x（百分比）\n      const cy = 50 + 24 * Math.cos(t * 0.38 + s * 2);   // 中心 y（百分比）\n      const m = Math.sin(t * state.morphSpeed + s * 3);  // 形变量（-1~1）\n      b.el.style.left = cx + \"%\";\n      b.el.style.top = cy + \"%\";\n      b.el.style.transform = \"translate(-50%,-50%) rotate(\" + (t * 8 + s * 40) + \"deg) scale(\" + (1 + m * 0.12) + \")\";\n      b.el.style.borderRadius = (46 + m * 6) + \"% \" + (54 - m * 6) + \"% \" + (58 + m * 4) + \"% \" + (42 - m * 4) + \"% / \" +\n        (52 - m * 5) + \"% \" + (44 + m * 5) + \"% \" + (56 - m * 4) + \"% \" + (48 + m * 4) + \"%\";\n    });\n    requestAnimationFrame(frame);\n  }\n  build();\n  requestAnimationFrame(frame);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>网格吸附演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #eef0f4; }\n  .stage { position: absolute; inset: 0; overflow: hidden; }\n  /* 背景层：吸附时反向漂移 + 缩小退后 */\n  .bg { position: absolute; inset: -60px; background: linear-gradient(135deg, #dfe7f5, #e9e2f2 55%, #dbeaf0);\n    transition: transform var(--dur) var(--ease), filter var(--dur) var(--ease); }\n  /* 网格线：吸附时浮现，标出「精准坐标」 */\n  .gridlines { position: absolute; inset: 0; opacity: 0; transition: opacity var(--dur) ease;\n    background-image: linear-gradient(var(--gridc) 1px, transparent 1px), linear-gradient(90deg, var(--gridc) 1px, transparent 1px);\n    background-size: var(--cell) var(--cell); background-position: center; }\n  /* 卡片：外层管吸附定位（带过渡），内层管鼠标视差（即时跟手） */\n  .cell { position: absolute; transition: transform var(--dur) var(--ease), width var(--dur) var(--ease), height var(--dur) var(--ease); }\n  .inner { position: absolute; inset: 0; border-radius: var(--radius); background: var(--cardbg);\n    box-shadow: 0 6px 18px rgba(20, 30, 60, .1); display: flex; align-items: center; justify-content: center;\n    font-weight: 800; color: #9aa4b8; font-size: 18px; }\n  .btn { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); cursor: pointer; border: none;\n    background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 700; padding: 10px 26px; border-radius: 8px; }\n  .btn:active { transform: translateX(-50%) scale(.96); }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"bg\" id=\"bg\"></div>\n  <div class=\"gridlines\" id=\"gridlines\"></div>\n  <div id=\"cells\"></div>\n</div>\n<button class=\"btn\" id=\"btn\">吸附到网格</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    cols: 3,              // 列数\n    gap: 20,              // 网格间距（px）\n    radius: 12,           // 卡片圆角（px）\n    dur: 0.6,             // 吸附时长（秒）\n    stagger: 0.08,        // 逐个错峰（秒）\n    ease: \"先快后慢\",      // 缓动方式\n    parallax: 14,         // 视差强度（px）\n    bgShift: 10,          // 背景反向漂移（px）\n    gridShow: true,       // 显示网格线\n    gridColor: \"#c5cddd\", // 网格线颜色\n    cardBg: \"#ffffff\",    // 卡片底色\n    scatter: 70           // 散布幅度（px）\n  };\n  // 缓动名 → 贝塞尔曲线\n  const EASE = { \"先快后慢\": \"cubic-bezier(.22,1,.36,1)\", \"匀速\": \"linear\", \"回弹\": \"cubic-bezier(.34,1.56,.64,1)\" };\n  const gridlines = document.getElementById(\"gridlines\");\n  const cellsBox = document.getElementById(\"cells\");\n  const bg = document.getElementById(\"bg\");\n  const btn = document.getElementById(\"btn\");\n  let grid = false, cells = [];\n\n  // 伪随机（固定种子，保证每次刷新散布一致）\n  const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5; return x - Math.floor(x); };\n\n  // 生成卡片：先算网格基准位，再叠散布偏移\n  function build() {\n    cellsBox.innerHTML = \"\";\n    cells = [];\n    const rows = 3, pad = 60;\n    const cardW = Math.min(180, (innerWidth - pad * 2 - state.gap * (state.cols - 1)) / state.cols);\n    const cardH = Math.min(120, (innerHeight - pad * 2 - state.gap * (rows - 1)) / rows);\n    const totalW = state.cols * cardW + state.gap * (state.cols - 1);\n    const totalH = rows * cardH + state.gap * (rows - 1);\n    const x0 = (innerWidth - totalW) / 2, y0 = (innerHeight - totalH) / 2;\n    for (let r = 0; r < rows; r++) {\n      for (let c = 0; c < state.cols; c++) {\n        const i = r * state.cols + c;\n        const cell = document.createElement(\"div\");\n        cell.className = \"cell\";\n        const inner = document.createElement(\"div\");\n        inner.className = \"inner\";\n        inner.textContent = String(i + 1).padStart(2, \"0\");\n        cell.appendChild(inner);\n        cellsBox.appendChild(cell);\n        cells.push({\n          el: cell, inner, i, w: cardW, h: cardH,\n          gx: x0 + c * (cardW + state.gap), gy: y0 + r * (cardH + state.gap), // 网格基准位\n          ox: (rnd(i) - 0.5) * 2 * state.scatter,                             // 自由态偏移\n          oy: (rnd(i + 50) - 0.5) * 2 * state.scatter,\n          rot: (rnd(i + 99) - 0.5) * 14,\n          depth: 0.4 + rnd(i + 7) * 0.6                                       // 视差深度（各不相同）\n        });\n      }\n    }\n    // 网格线间距 = 卡片宽 + 间距\n    document.documentElement.style.setProperty(\"--cell\", (cardW + state.gap) + \"px\");\n    layout();\n  }\n\n  // 布局：自由态（散布+旋转） ⇄ 网格态（精准对齐）\n  function layout() {\n    cells.forEach(c => {\n      const x = grid ? c.gx : c.gx + c.ox;\n      const y = grid ? c.gy : c.gy + c.oy;\n      c.el.style.width = c.w + \"px\";\n      c.el.style.height = c.h + \"px\";\n      c.el.style.transform = \"translate(\" + x + \"px,\" + y + \"px) rotate(\" + (grid ? 0 : c.rot) + \"deg)\";\n      c.el.style.transitionDelay = (c.i * state.stagger) + \"s\"; // 逐个错峰\n    });\n    gridlines.style.opacity = (grid && state.gridShow) ? 0.8 : 0;\n  }\n\n  // 参数落地\n  function apply() {\n    const root = document.documentElement.style;\n    root.setProperty(\"--dur\", state.dur + \"s\");\n    root.setProperty(\"--ease\", EASE[state.ease] || EASE[\"先快后慢\"]);\n    root.setProperty(\"--radius\", state.radius + \"px\");\n    root.setProperty(\"--gridc\", state.gridColor);\n    root.setProperty(\"--cardbg\", state.cardBg);\n    build();\n  }\n\n  // 切换：自由 ⇄ 网格\n  btn.addEventListener(\"click\", () => {\n    grid = !grid;\n    btn.textContent = grid ? \"释放\" : \"吸附到网格\";\n    layout();\n  });\n\n  // 鼠标视差：卡片轻微跟手（各自深度不同），背景反向漂移\n  addEventListener(\"mousemove\", e => {\n    const mx = e.clientX / innerWidth * 2 - 1;\n    const my = e.clientY / innerHeight * 2 - 1;\n    cells.forEach(c => {\n      const k = grid ? 0.25 : 1; // 网格态视差收着点，保持秩序感\n      c.inner.style.transform = \"translate(\" + mx * state.parallax * c.depth * k + \"px,\" + my * state.parallax * c.depth * k + \"px)\";\n    });\n    bg.style.transform = \"translate(\" + -mx * state.bgShift + \"px,\" + -my * state.bgShift + \"px)\" + (grid ? \" scale(.94)\" : \"\");\n    bg.style.filter = grid ? \"saturate(.75) brightness(.97)\" : \"none\";\n  });\n\n  apply();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>3D 沉浸滚动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #0a0e1a; }\n  /* 可滚动舞台：perspective 提供透视，滚动条藏掉 */\n  .viewport { position: absolute; inset: 0; overflow-y: scroll; perspective: 1000px; }\n  .viewport::-webkit-scrollbar { display: none; }\n  .spacer { height: 400vh; } /* 撑出滚动距离 = 镜头推进的路程 */\n  /* 3D 世界：sticky 钉在视口里，translateZ 由滚动进度驱动 */\n  .world { position: sticky; top: 0; height: 100vh; transform-style: preserve-3d; }\n  .layer { position: absolute; left: 50%; top: 50%; }\n  /* 底部进度条 */\n  .progress { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: rgba(255,255,255,.08); z-index: 5; }\n  .progress i { display: block; height: 100%; width: 0; background: var(--c1); transition: width .1s linear; }\n</style>\n</head>\n<body>\n<div class=\"viewport\" id=\"viewport\">\n  <div class=\"world\" id=\"world\"></div>\n  <div class=\"spacer\"></div>\n</div>\n<div class=\"progress\"><i id=\"pfill\"></i></div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    layers: 8,          // 层数\n    depth: 1600,        // 纵深距离（px）\n    persp: 1000,        // 透视强度（px，越小透视越夸张）\n    tilt: 6,            // 视角跟随（度）\n    spin: 0.3,          // 自转速度（度/帧）\n    size: 110,          // 元素大小（px）\n    shape: \"圆环\",       // 形状\n    color1: \"#6f9bff\",  // 主色\n    color2: \"#a8c8ff\",  // 辅色\n    bg: \"#0a0e1a\",      // 背景色\n    glow: true,         // 发光\n    fade: true          // 远处渐隐\n  };\n  const viewport = document.getElementById(\"viewport\");\n  const world = document.getElementById(\"world\");\n  const pfill = document.getElementById(\"pfill\");\n  let layerEls = [];\n\n  // 伪随机（固定种子，元素位置刷新后一致）\n  const rnd = i => { const x = Math.sin(i * 91.7 + 47.3) * 43758.5; return x - Math.floor(x); };\n\n  // 生成纵深层：每层一个 z 位置 + 平面偏移\n  function build() {\n    world.innerHTML = \"\";\n    layerEls = [];\n    for (let i = 0; i < state.layers; i++) {\n      const el = document.createElement(\"div\");\n      el.className = \"layer\";\n      const s = state.size * (0.7 + rnd(i) * 0.6); // 大小错落\n      // 形状：圆环 / 方块 / 圆点\n      if (state.shape === \"圆环\") {\n        el.style.border = \"2px solid \" + (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"50%\";\n      } else if (state.shape === \"方块\") {\n        el.style.background = (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"10px\";\n      } else {\n        el.style.background = (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"50%\";\n        el.style.filter = \"blur(1px)\";\n      }\n      if (state.glow) el.style.boxShadow = \"0 0 30px \" + (i % 2 ? state.color2 : state.color1) + \"55\";\n      el.style.width = el.style.height = s + \"px\";\n      const z = -(i + 1) * state.depth / state.layers;   // 纵深位置\n      const px = (rnd(i + 31) - 0.5) * 340;              // 平面偏移（错落分布）\n      const py = (rnd(i + 67) - 0.5) * 220;\n      el.style.marginLeft = -s / 2 + \"px\";\n      el.style.marginTop = -s / 2 + \"px\";\n      el.dataset.z = z;\n      el.dataset.px = px;\n      el.dataset.py = py;\n      world.appendChild(el);\n      layerEls.push(el);\n    }\n    document.body.style.background = state.bg;\n    render();\n  }\n\n  let progress = 0, mx = 0, my = 0, spinAngle = 0;\n  function render() {\n    // 世界：镜头推进（translateZ = 进度 × 纵深） + 鼠标视角 + 慢速自转\n    spinAngle += state.spin * 0.1;\n    world.style.transform =\n      \"translateZ(\" + (progress * state.depth * 0.92) + \"px)\" +\n      \" rotateY(\" + (mx * state.tilt + spinAngle) + \"deg)\" +\n      \" rotateX(\" + (-my * state.tilt) + \"deg)\";\n    // 每层：根据「离镜头的距离」决定透明度（远处渐隐、越过的淡出）\n    layerEls.forEach(el => {\n      const z = +el.dataset.z + progress * state.depth * 0.92; // 相对镜头的深度\n      let a = 1;\n      if (state.fade) a = Math.max(0, Math.min(1, (z + 80) / (state.depth * 0.7)));\n      el.style.opacity = a;\n      el.style.transform = \"translate3d(\" + el.dataset.px + \"px,\" + el.dataset.py + \"px,\" + el.dataset.z + \"px)\";\n    });\n    pfill.style.width = (progress * 100) + \"%\";\n  }\n\n  // 滚动 → 进度 0~1\n  viewport.addEventListener(\"scroll\", () => {\n    progress = viewport.scrollTop / (viewport.scrollHeight - innerHeight || 1);\n    render();\n  });\n  // 鼠标 → 视角倾斜\n  addEventListener(\"mousemove\", e => {\n    mx = e.clientX / innerWidth * 2 - 1;\n    my = e.clientY / innerHeight * 2 - 1;\n    render();\n  });\n  // 自转持续运转\n  (function loop() { if (state.spin > 0) render(); requestAnimationFrame(loop); })();\n\n  function apply() {\n    viewport.style.perspective = state.persp + \"px\";\n    document.documentElement.style.setProperty(\"--c1\", state.color1);\n    build();\n  }\n  apply();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:#fafafa;}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .wrap{width:var(--width);max-width:92vw;margin:0 auto;padding:14vh 16px;display:flex;flex-direction:column;gap:16vh;}\n  /* 区块初始：下移 dist + 透明度 opStart；进入视口加 .in 复位，缓动平滑进出 */\n  .block{background:var(--bg);color:var(--fg);border-radius:var(--radius);padding:46px 40px;\n    text-align:var(--align);line-height:1.6;font-size:17px;\n    opacity:var(--opStart);transform:translateY(var(--dist));\n    transition:opacity var(--dur) var(--ease),transform var(--dur) var(--ease),filter var(--dur) var(--ease);}\n  .block.in{opacity:1;transform:translateY(0);}\n  .block.bf{filter:blur(12px);} .block.in.bf{filter:blur(0);}\n  .block b{font-size:22px;display:block;margin-bottom:8px}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <div class=\"wrap\" id=\"wrap\">\n    <div class=\"block\"><b>产品介绍</b>一句话说清产品能为用户解决什么问题，越具体越好。</div>\n    <div class=\"block\"><b>核心能力</b>把最关键的几项能力按重要性排列，次要信息往后放。</div>\n    <div class=\"block\"><b>客户案例</b>用真实场景说明价值，比罗列功能更有说服力。</div>\n    <div class=\"block\"><b>开始使用</b>给一个明确的下一步动作，让用户知道从哪里开始。</div>\n  </div>\n  <script>\n  const state = {\n    dist: 40, dur: 0.8, opStart: 0, blur: false, thresh: 0.2, stagger: 0.12,\n    bg: \"#0e0e0e\", fg: \"#f5f5f5\", radius: 16, width: 560, align: \"左\"\n  };\n  const root = document.documentElement;\n  const wrap = document.getElementById(\"wrap\");\n  const blocks = [...wrap.children];\n  function apply(){\n    // 把 state 落到 CSS 变量，所有参数实时生效\n    root.style.setProperty(\"--dist\", state.dist + \"px\");\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--opStart\", state.opStart);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--fg\", state.fg);\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    // 模糊开关 + 错峰延迟逐块写入\n    blocks.forEach((b,i)=>{\n      b.classList.toggle(\"bf\", state.blur);\n      b.style.transitionDelay = (i * state.stagger) + \"s\";\n    });\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 观察\n    blocks.forEach(b=>b.classList.remove(\"in\"));\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: state.thresh });\n    blocks.forEach(b=>io.observe(b));\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
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
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;}\n  /* 制造滚动区：顶部留白 + 底部统计块，进入视口才计数（区别于 v107 普通数字滚动） */\n  body{min-height:220vh;background:var(--bg,#fff);}\n  .spacer{height:120vh;display:flex;align-items:flex-end;justify-content:center;color:#bbb;font-size:14px}\n  .wrap{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}\n  .num{font-size:var(--fs,56px);font-weight:var(--wt,800);color:var(--nc,#111);font-variant-numeric:tabular-nums;line-height:1}\n  .lab{font-size:16px;color:var(--lc,#666);letter-spacing:1px}\n  .replay{cursor:pointer;border:none;background:var(--nc,#111);color:#fff;padding:9px 22px;border-radius:8px;font-size:14px}\n</style></head>\n<body>\n  <div class=\"spacer\"></div>\n  <div class=\"wrap\">\n    <div class=\"num\" id=\"num\">0</div>\n    <div class=\"lab\" id=\"lab\">累计用户</div>\n    <button class=\"replay\" id=\"replay\">重新计数</button>\n  </div>\n  <script>\n  // 8–12 键：含 3 个颜色参数，每个键 apply() 都真生效\n  const state = {\n    target:900, dur:1.6, suffix:\"+\", sep:true, ease:\"平滑\",\n    fontSize:56, numColor:\"#111111\", label:\"累计用户\", labelColor:\"#666666\",\n    delay:0.3, bg:\"#ffffff\", weight:\"特粗\"\n  };\n  const num = document.getElementById(\"num\"), lab = document.getElementById(\"lab\"), root = document.documentElement;\n  let raf = 0, entered = false;\n  // 三种缓动：平滑=先快后慢，回弹=过头回弹，匀速=线性\n  const EASE = {\n    \"平滑\": t => 1 - Math.pow(1 - t, 3),\n    \"回弹\": t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },\n    \"匀速\": t => t\n  };\n  const WEIGHT = { \"常规\": 400, \"中粗\": 600, \"特粗\": 800 };\n  // 数字格式化：千位分隔 + 后缀\n  function fmt(n) {\n    const r = Math.round(n);\n    return (state.sep ? r.toLocaleString(\"en-US\") : String(r)) + state.suffix;\n  }\n  // 真正滚动计数（从 0 到目标值）\n  function roll() {\n    cancelAnimationFrame(raf);\n    const from = 0, to = state.target, dur = state.dur * 1000;\n    const ease = EASE[state.ease] || EASE[\"平滑\"];\n    const t0 = performance.now();\n    (function tick(now) {\n      const t = Math.min((now - t0) / dur, 1);\n      num.textContent = fmt(from + (to - from) * ease(t));\n      if (t < 1) raf = requestAnimationFrame(tick);\n    })(t0);\n  }\n  // apply：把每个 state 键落到样式/文案上\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--bg\", state.bg);\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n    s.setProperty(\"--nc\", state.numColor);\n    s.setProperty(\"--lc\", state.labelColor);\n    s.setProperty(\"--wt\", WEIGHT[state.weight] || 800);\n    lab.textContent = state.label;       // 标签文字\n    if (entered) roll();                  // 已进入视口后调参立即重滚\n  }\n  // 进入视口才触发：延迟 delay 秒后开始计数\n  const io = new IntersectionObserver((es) => {\n    es.forEach(e => {\n      if (e.isIntersecting) {\n        entered = true;\n        setTimeout(roll, state.delay * 1000);\n        io.disconnect();\n      }\n    });\n  }, { threshold: 0.5 });\n  io.observe(document.querySelector(\".wrap\"));\n  // 重播按钮：归零并重新计数\n  document.getElementById(\"replay\").addEventListener(\"click\", () => {\n    num.textContent = \"0\" + state.suffix;\n    roll();\n  });\n  // 接收详情页传参\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n  <\\/script>\n</body></html>\n",
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
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;background:var(--bg);padding:8vh 6vw;}\n  .ch{display:flex;align-items:center;gap:var(--gap);margin:0 0 6vh;flex-wrap:wrap;}\n  /* 超大序号：描边模式文字透明+描边；实心模式直接填充 */\n  .num{font-size:var(--numSize);font-weight:900;line-height:.9;letter-spacing:-.04em;\n    color:var(--numColor);min-width:1.6em;}\n  .num.outline{color:transparent;-webkit-text-stroke:3px var(--numColor);}\n  .txt{text-align:var(--align);}\n  .txt h2{margin:0;font-size:clamp(22px,4vw,40px);color:var(--titleColor);font-weight:800;}\n  .txt p{margin:8px 0 0;font-size:16px;color:var(--subColor);}\n</style></head>\n<body>\n  <div class=\"ch\">\n    <div class=\"num\" id=\"num1\">01</div>\n    <div class=\"txt\"><h2 id=\"t1\">生成式设计</h2><p id=\"s1\">AI 如何重写设计流程</p></div>\n  </div>\n  <div class=\"ch\"><div class=\"num\">02</div><div class=\"txt\"><h2>人机协作</h2><p>设计师与模型共同迭代</p></div></div>\n  <div class=\"ch\"><div class=\"num\">03</div><div class=\"txt\"><h2>落地评估</h2><p>从概念到生产的度量</p></div></div>\n  <script>\n  const state = {\n    num: \"01\", numSize: 180, numColor: \"#111111\", outline: true,\n    title: \"生成式设计\", titleColor: \"#111111\", sub: \"AI 如何重写设计流程\",\n    subColor: \"#888888\", align: \"左\", gap: 28, bg: \"#ffffff\"\n  };\n  const root = document.documentElement;\n  const allNum = [...document.querySelectorAll(\".num\")];\n  function apply(){\n    root.style.setProperty(\"--numSize\", state.numSize + \"px\");\n    root.style.setProperty(\"--numColor\", state.numColor);\n    root.style.setProperty(\"--titleColor\", state.titleColor);\n    root.style.setProperty(\"--subColor\", state.subColor);\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--bg\", state.bg);\n    // 描边开关：切换 .outline 类（实心时移除）\n    allNum.forEach(n=>n.classList.toggle(\"outline\", state.outline));\n    // 仅第一块由参数驱动，便于实时预览\n    document.getElementById(\"num1\").textContent = state.num;\n    document.getElementById(\"t1\").textContent = state.title;\n    document.getElementById(\"s1\").textContent = state.sub;\n  }\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n  <\\/script>\n</body></html>\n",
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
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>滚动进度指示</title>\n<style>\n  /* 原站签名缓动：滚动揭示用 cubic-bezier(.44,0,.56,1) */\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;min-height:220vh;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;background:var(--bg,#fff);color:#333;}\n  /* 进度条容器：固定在顶部或底部，宽度铺满 */\n  #bar{position:fixed;left:0;width:100%;height:var(--h,4px);background:var(--todo,#e5e5e5);z-index:var(--z,9999);box-shadow:var(--shadow,0 0 0 transparent);}\n  /* 已完成填充：宽度随滚动从左到右增长 */\n  #fill{height:100%;width:0;background:var(--done,#111);border-radius:var(--radius,0);transition:width var(--dur,.3s) var(--ease);}\n  /* 末端百分比文字：可开关 */\n  #pct{position:fixed;right:8px;font-size:12px;font-weight:700;color:var(--pct,#111);display:var(--showpct,none);font-variant-numeric:tabular-nums;z-index:var(--z,9999);}\n  .content{padding:60px 24px;max-width:680px;margin:0 auto;line-height:1.9;font-size:15px;}\n  .content h2{margin-top:40px;font-size:22px}\n</style></head>\n<body>\n  <div id=\"bar\"><div id=\"fill\"></div></div>\n  <div id=\"pct\">0%</div>\n  <div class=\"content\">\n    <h2>长文阅读的节奏</h2>\n    <p>内容呈现需要克制，把注意力留给正文本身，界面元素只做必要的引导。</p>\n    <p>版式以留白与节奏组织信息，读者在长文里也能保持稳定的阅读速度。</p>\n    <h2>信息层级</h2>\n    <p>标题、正文与注释拉开层级，重要的内容自然浮出，次要信息安静退后。</p>\n    <p>好的设计让人感觉不到设计本身，只留下顺畅的体验。</p>\n    <h2>留白</h2>\n    <p>适当的空白让视线有落脚的地方，长段落之间也因此有了呼吸。</p>\n    <p>把复杂的结构收敛成简单的秩序，是页面耐看的关键。</p>\n  </div>\n  <script>\n  // 默认参数：父页面（详情页）可实时调\n  const state = {\n    h: 4,            // 进度条高度（px）\n    done: \"#111111\", // 已完成色\n    todo: \"#e5e5e5\", // 未完成色\n    pos: \"顶部\",     // 位置：顶部 / 底部\n    radius: 0,       // 圆角（px）\n    dur: 0.3,        // 过渡时长（秒）\n    showPct: false,  // 末端显示百分比\n    pctColor: \"#111111\", // 百分比文字色\n    shadow: false,   // 进度条阴影\n    bg: \"#ffffff\",   // 底色（页面背景）\n    z: \"顶层\"        // 进度条叠放层级：低层 / 顶层\n  };\n  const bar=document.getElementById(\"bar\"), fill=document.getElementById(\"fill\"), pct=document.getElementById(\"pct\");\n\n  // apply：把每个 state 键映射到真实样式\n  function apply(){\n    const root=document.documentElement;\n    root.style.setProperty(\"--h\", state.h+\"px\");\n    root.style.setProperty(\"--done\", state.done);\n    root.style.setProperty(\"--todo\", state.todo);\n    root.style.setProperty(\"--radius\", state.radius+\"px\");\n    root.style.setProperty(\"--dur\", state.dur+\"s\");\n    root.style.setProperty(\"--pct\", state.pctColor);\n    root.style.setProperty(\"--shadow\", state.shadow ? \"0 1px 6px rgba(0,0,0,.25)\" : \"0 0 0 transparent\");\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--z\", state.z===\"顶层\" ? \"9999\" : \"1\");\n    root.style.setProperty(\"--showpct\", state.showPct ? \"block\" : \"none\");\n    // 位置：顶部或底部\n    if(state.pos===\"底部\"){ bar.style.top=\"auto\"; bar.style.bottom=\"0\"; }\n    else { bar.style.top=\"0\"; bar.style.bottom=\"auto\"; }\n    update();\n  }\n\n  // 滚动进度：已滚动 / 可滚动总高 = 百分比\n  function update(){\n    const max = document.documentElement.scrollHeight - window.innerHeight;\n    const p = max>0 ? Math.min(window.scrollY/max, 1) : 0;\n    const v = Math.round(p*100);\n    fill.style.width = v+\"%\";\n    pct.textContent = v+\"%\";\n    // 百分比文字贴在进度条内侧\n    if(state.pos===\"底部\"){ pct.style.top=\"auto\"; pct.style.bottom=(state.h+4)+\"px\"; }\n    else { pct.style.bottom=\"auto\"; pct.style.top=(state.h+4)+\"px\"; }\n  }\n  window.addEventListener(\"scroll\", update, {passive:true});\n  window.addEventListener(\"resize\", update);\n\n  // 父页面消息：调参实时生效\n  window.addEventListener(\"message\",(e)=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  <\\/script>\n</body></html>\n",
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
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;}\n  body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:var(--bg,#fff)}\n  .box{position:relative;width:300px}\n  /* 输入框：圆角/边框/底色均来自参数；聚焦时边框变 focusBorder */\n  .inp{\n    width:100%;box-sizing:border-box;padding:18px 14px 8px;font-size:15px;\n    border:1.5px solid var(--ib,#ccc);border-radius:var(--ir,10px);\n    background:var(--bg,#fff);color:#222;outline:none;\n    transition:border-color var(--dur,.3s) var(--ease),background var(--dur,.3s) var(--ease);\n  }\n  .inp:focus{border-color:var(--ifb,#111)}\n  /* 浮动标签：占位文字上移成标签，位移/颜色/时长来自参数 */\n  .flab{\n    position:absolute;left:15px;top:16px;font-size:15px;color:var(--lc,#888);\n    pointer-events:none;transition:all var(--dur,.3s) var(--ease);\n  }\n  .inp:focus ~ .flab,.inp:not(:placeholder-shown) ~ .flab{\n    top:6px;font-size:11px;transform:translateY(calc(var(--fs,8px) * -1px));color:var(--ifb,#111)\n  }\n  /* 按钮：圆角/底色/文字色来自参数；done 状态用成功色 */\n  .btn{\n    margin-top:14px;width:100%;box-sizing:border-box;border:none;cursor:pointer;\n    padding:13px;font-size:15px;font-weight:600;border-radius:var(--br,10px);\n    background:var(--bc,#111);color:var(--btc,#fff);\n    transition:background var(--dur,.3s) var(--ease);\n  }\n  .btn:disabled{opacity:.7;cursor:default}\n  .btn.done{background:var(--sc,#1a9e4b)}\n</style></head>\n<body>\n  <div class=\"box\">\n    <input class=\"inp\" id=\"inp\" type=\"email\" placeholder=\" \" autocomplete=\"off\">\n    <label class=\"flab\" for=\"inp\" id=\"flab\">输入邮箱订阅更新</label>\n    <button class=\"btn\" id=\"btn\">订阅</button>\n  </div>\n  <script>\n  // 8–12 键：含 7 个颜色参数，每个键 apply() 都真生效\n  const state = {\n    radius:10, border:\"#cccccc\", focusBorder:\"#111111\", bg:\"#ffffff\",\n    btnRadius:10, btnColor:\"#111111\", btnText:\"#ffffff\", labelColor:\"#888888\",\n    focusShift:8, dur:0.3, success:\"#1a9e4b\", btnTextStr:\"订阅\"\n  };\n  const inp = document.getElementById(\"inp\"), btn = document.getElementById(\"btn\"), root = document.documentElement;\n  // apply：把每个 state 键落到 CSS 变量与文案上\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--ir\", state.radius + \"px\");     // 输入框圆角\n    s.setProperty(\"--ib\", state.border);             // 边框色\n    s.setProperty(\"--ifb\", state.focusBorder);       // 聚焦边框色\n    s.setProperty(\"--bg\", state.bg);                 // 底色\n    s.setProperty(\"--br\", state.btnRadius + \"px\");   // 按钮圆角\n    s.setProperty(\"--bc\", state.btnColor);           // 按钮色\n    s.setProperty(\"--btc\", state.btnText);          // 按钮文字色\n    s.setProperty(\"--lc\", state.labelColor);        // 标签色\n    s.setProperty(\"--fs\", state.focusShift);         // 聚焦位移\n    s.setProperty(\"--dur\", state.dur + \"s\");         // 时长\n    s.setProperty(\"--sc\", state.success);            // 成功色\n    btn.textContent = state.btnTextStr;              // 按钮文字\n  }\n  // 提交：订阅中→已订阅（setTimeout 模拟，不真发请求）\n  btn.addEventListener(\"click\", () => {\n    if (btn.classList.contains(\"done\")) return;\n    btn.disabled = true; btn.textContent = \"订阅中…\";\n    setTimeout(() => {\n      btn.classList.add(\"done\"); btn.textContent = \"已订阅 ✓\"; btn.disabled = false;\n    }, 1200);\n  });\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n  <\\/script>\n</body></html>\n",
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
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>粘性章节导航</title>\n<style>\n  /* 原站签名缓动：出场用 cubic-bezier(0.4,0,1,1)，这里高亮态复用滚动揭示缓动 */\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;min-height:220vh;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;background:var(--bg,#fff);}\n  /* 每个章节：占满一屏高，制造滚动区 */\n  .sec{min-height:90vh;display:flex;align-items:center;justify-content:center;color:#333;font-size:22px;font-weight:700;border-bottom:1px solid #f0f0f0;}\n  /* 导航容器：垂直居中固定在左/右 */\n  .nav{position:fixed;top:50%;transform:translateY(-50%);z-index:9;display:flex;flex-direction:column;align-items:center;gap:var(--gap,20px);}\n  /* 进度连线：贯穿圆点的竖线 */\n  #line{position:absolute;top:0;bottom:0;left:50%;width:2px;background:var(--linec,#ddd);transform:translateX(-50%);z-index:0;}\n  /* 圆点：默认色，激活时放大并换色 */\n  .dot{position:relative;z-index:1;width:var(--size,12px);height:var(--size,12px);border-radius:50%;background:var(--idle,#ccc);cursor:pointer;border:var(--stroke,0) solid #fff;transition:transform .25s var(--ease),background .25s var(--ease);}\n  .dot.on{background:var(--active,#111);transform:scale(1.6);}\n  /* 章节标签：可开关，贴在圆点外侧 */\n  .lab{position:absolute;top:50%;transform:translateY(-50%);font-size:13px;color:var(--labc,#666);white-space:nowrap;display:var(--showlab,none);}\n</style></head>\n<body>\n  <nav class=\"nav\" id=\"nav\"><div id=\"line\"></div></nav>\n  <section class=\"sec\" data-i=\"0\">第一章 · 开篇</section>\n  <section class=\"sec\" data-i=\"1\">第二章 · 背景</section>\n  <section class=\"sec\" data-i=\"2\">第三章 · 方法</section>\n  <section class=\"sec\" data-i=\"3\">第四章 · 案例</section>\n  <section class=\"sec\" data-i=\"4\">第五章 · 收尾</section>\n  <script>\n  // 章节名（用于标签）\n  const names=[\"第一章\",\"第二章\",\"第三章\",\"第四章\",\"第五章\"];\n  // 默认参数：父页面（详情页）可实时调\n  const state = {\n    size: 12,        // 圆点大小（px）\n    gap: 20,         // 圆点间距（px）\n    idle: \"#cccccc\", // 默认色\n    active: \"#111111\", // 激活色\n    side: \"右\",      // 位置：左 / 右\n    labels: false,   // 标签显隐\n    labelColor: \"#666666\", // 标签色\n    line: false,     // 进度连线\n    lineColor: \"#dddddd\", // 连线色\n    stroke: false,   // 圆点描边\n    bg: \"#ffffff\"    // 底色（页面背景）\n  };\n  const nav=document.getElementById(\"nav\"), line=document.getElementById(\"line\");\n  const dots=[];\n  // 生成圆点\n  names.forEach((n,i)=>{\n    const d=document.createElement(\"div\"); d.className=\"dot\"; d.dataset.i=i;\n    const lab=document.createElement(\"span\"); lab.className=\"lab\"; lab.textContent=n;\n    d.appendChild(lab);\n    d.addEventListener(\"click\",()=>{ document.querySelectorAll(\".sec\")[i].scrollIntoView({behavior:\"smooth\"}); });\n    nav.appendChild(d); dots.push(d);\n  });\n  const secs=[...document.querySelectorAll(\".sec\")];\n  let cur=0;\n  function setActive(i){ cur=i; dots.forEach((d,k)=>d.classList.toggle(\"on\",k===i)); }\n\n  // apply：把每个 state 键映射到真实样式\n  function apply(){\n    const root=document.documentElement;\n    root.style.setProperty(\"--size\", state.size+\"px\");\n    root.style.setProperty(\"--gap\", state.gap+\"px\");\n    root.style.setProperty(\"--idle\", state.idle);\n    root.style.setProperty(\"--active\", state.active);\n    root.style.setProperty(\"--labc\", state.labelColor);\n    root.style.setProperty(\"--linec\", state.lineColor);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--showlab\", state.labels ? \"block\" : \"none\");\n    root.style.setProperty(\"--stroke\", state.stroke ? (Math.max(2,state.size/4)+\"px\") : \"0\");\n    line.style.display = state.line ? \"block\" : \"none\";\n    // 位置：左侧或右侧\n    if(state.side===\"左\"){ nav.style.right=\"auto\"; nav.style.left=\"20px\"; }\n    else { nav.style.left=\"auto\"; nav.style.right=\"20px\"; }\n    // 标签贴在圆点外侧（左导航在右、右导航在左）\n    dots.forEach(d=>{ const lab=d.querySelector(\".lab\");\n      if(state.side===\"左\"){ lab.style.right=(state.size+8)+\"px\"; lab.style.left=\"auto\"; }\n      else { lab.style.left=(state.size+8)+\"px\"; lab.style.right=\"auto\"; } });\n    setActive(cur);\n  }\n\n  // 以视口中线判定当前章节（IntersectionObserver）\n  const io=new IntersectionObserver((es)=>{\n    es.forEach(e=>{ if(e.isIntersecting) setActive(+e.target.dataset.i); });\n  },{rootMargin:\"-50% 0px -50% 0px\",threshold:0});\n  secs.forEach(s=>io.observe(s));\n\n  // 父页面消息：调参实时生效\n  window.addEventListener(\"message\",(e)=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  <\\/script>\n</body></html>\n",
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
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:var(--bg);display:flex;align-items:center;justify-content:center;}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .head{width:min(820px,90vw);text-align:var(--align);}\n  /* 每行用 overflow:hidden 做遮罩，内层上移 shift 后归零揭示 */\n  .line{overflow:hidden;}\n  .line span{display:block;font-weight:800;font-size:var(--size);line-height:var(--lh);color:var(--fg);\n    transform:translateY(var(--shift));opacity:0;\n    transition:transform var(--dur) var(--ease2),opacity var(--dur) var(--ease2);}\n  .line.in span{transform:translateY(0);opacity:1;}\n  .line.bf span{filter:blur(10px);} .line.in.bf span{filter:blur(0);}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <div class=\"head\" id=\"head\">\n    <div class=\"line\"><span>设计正在被重写</span></div>\n    <div class=\"line\"><span>AI 成为真正的协作者</span></div>\n    <div class=\"line\"><span>工具消融于流程之中</span></div>\n  </div>\n  <script>\n  const state = {\n    shift: 40, lineDelay: 0.08, dur: 0.7, size: 44, fg: \"#111111\",\n    bg: \"#ffffff\", lh: 1.3, align: \"左\", blur: false, ease: \"平滑\"\n  };\n  const root = document.documentElement;\n  const head = document.getElementById(\"head\");\n  const lines = [...head.querySelectorAll(\".line\")];\n  const EASE = { \"平滑\":\"var(--ease)\", \"回弹\":\"cubic-bezier(.34,1.56,.64,1)\", \"匀速\":\"linear\" };\n  function apply(){\n    root.style.setProperty(\"--shift\", state.shift + \"px\");\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--size\", state.size + \"px\");\n    root.style.setProperty(\"--fg\", state.fg);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--lh\", state.lh);\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    root.style.setProperty(\"--ease2\", EASE[state.ease] || \"var(--ease)\");\n    lines.forEach(l=>l.classList.toggle(\"bf\", state.blur));\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 逐行观察\n    lines.forEach(l=>l.classList.remove(\"in\"));\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: 0.4 });\n    lines.forEach((l,i)=>{ l.style.transitionDelay = (i * state.lineDelay) + \"s\"; io.observe(l); });\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
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
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:var(--bg);}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .hero{min-height:60vh;display:flex;flex-direction:column;justify-content:center;padding:var(--pad) 8vw;text-align:var(--align);}\n  .tag{align-self:var(--as);background:var(--tagBg);color:var(--tagColor);font-size:14px;font-weight:600;padding:6px 14px;border-radius:999px;margin-bottom:20px;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .6s var(--ease),transform .6s var(--ease);}\n  .title{margin:0;font-size:var(--titleSize);line-height:1.05;color:var(--titleColor);font-weight:var(--w);letter-spacing:-.03em;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .7s var(--ease),transform .7s var(--ease);}\n  .sub{margin:22px 0 0;font-size:17px;color:#666;max-width:46ch;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .6s var(--ease) .15s,transform .6s var(--ease) .15s;}\n  .hero.in .tag,.hero.in .title,.hero.in .sub{opacity:1;transform:translateY(0);}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <header class=\"hero\" id=\"hero\">\n    <span class=\"tag\" id=\"tag\">Report 2026</span>\n    <h1 class=\"title\" id=\"title\">AI in Design</h1>\n    <p class=\"sub\" id=\"sub\">Designer Fund × Foundation Capital 年度设计报告</p>\n  </header>\n  <script>\n  const state = {\n    title: \"AI in Design\", titleSize: 96, titleColor: \"#111111\",\n    tag: \"Report 2026\", tagColor: \"#ffffff\", tagBg: \"#111111\",\n    align: \"左\", pad: 80, weight: \"中黑\", shift: 60, bg: \"#ffffff\",\n    sub: \"Designer Fund × Foundation Capital 年度设计报告\"\n  };\n  const root = document.documentElement;\n  const W = { \"常规\":\"400\", \"中黑\":\"600\", \"特黑\":\"900\" };\n  const AM = { \"左\":[\"left\",\"flex-start\"], \"中\":[\"center\",\"center\"], \"右\":[\"right\",\"flex-end\"] };\n  function apply(){\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--titleSize\", state.titleSize + \"px\");\n    root.style.setProperty(\"--titleColor\", state.titleColor);\n    root.style.setProperty(\"--tagColor\", state.tagColor);\n    root.style.setProperty(\"--tagBg\", state.tagBg);\n    root.style.setProperty(\"--pad\", state.pad + \"px\");\n    root.style.setProperty(\"--w\", W[state.weight] || \"600\");\n    root.style.setProperty(\"--shift\", state.shift + \"px\");\n    root.style.setProperty(\"--align\", AM[state.align][0]);\n    root.style.setProperty(\"--as\", AM[state.align][1]);\n    document.getElementById(\"title\").textContent = state.title;\n    document.getElementById(\"tag\").textContent = state.tag;\n    document.getElementById(\"sub\").textContent = state.sub;\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 观察 hero\n    const h = document.getElementById(\"hero\");\n    h.classList.remove(\"in\");\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: 0.3 });\n    io.observe(h);\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>单选下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:260px; }\n  .trigger {\n    width:100%; display:flex; align-items:center; gap:8px;\n    padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,var(--shadow,.12)); transition:border-color .15s;\n    justify-content:var(--align,flex-start);\n  }\n  .trigger .val { flex:1; text-align:inherit; }\n  .trigger .val.ph { color:#9ca3af; }\n  .caret { transition:transform var(--dur,.22s) ease; color:var(--arrow,#6b7280); flex:none; }\n  .field.open .caret { transform:rotate(180deg); }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12));\n    max-height:var(--maxh,240px); overflow:auto; opacity:0; transform:translateY(-6px); pointer-events:none;\n    transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:5;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .opt { padding:10px 14px; font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; }\n  .opt:hover { background:var(--hover,#eff6ff); }\n  .opt.sel { color:var(--theme,#2563eb); font-weight:700; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <script>\n  const OPTIONS = [\"苹果\",\"香蕉\",\"橙子\",\"西瓜\",\"葡萄\",\"芒果\",\"荔枝\",\"菠萝\",\"草莓\",\"蓝莓\"];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.22,\n    border:\"#d1d5db\", hoverBg:\"#eff6ff\", menuMaxH:240, arrowColor:\"#6b7280\",\n    align:\"左\", placeholder:\"请选择\", shadow:0.12\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"),\n        val=document.getElementById(\"val\"), menu=document.getElementById(\"menu\");\n  let selected=null, open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    OPTIONS.forEach(o=>{\n      const d=document.createElement(\"div\");\n      d.className=\"opt\"+(o===selected?\" sel\":\"\");\n      d.textContent=o;\n      d.onclick=()=>{ selected=o; val.textContent=o; val.classList.remove(\"ph\"); close(); markSel(); };\n      menu.appendChild(d);\n    });\n  }\n  function markSel(){ [...menu.children].forEach((c,i)=> c.classList.toggle(\"sel\", OPTIONS[i]===selected)); }\n  function openMenu(){ open=true; field.classList.add(\"open\"); }\n  function close(){ open=false; field.classList.remove(\"open\"); }\n  trigger.onclick=()=> open?close():openMenu();\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)) close(); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme);\n    R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border);\n    R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--maxh\",state.menuMaxH+\"px\");\n    R.setProperty(\"--arrow\",state.arrowColor);\n    R.setProperty(\"--shadow\",state.shadow);\n    R.setProperty(\"--align\", state.align===\"左\"?\"flex-start\":state.align===\"右\"?\"flex-end\":\"center\");\n    if(!selected){ val.textContent=state.placeholder; val.classList.add(\"ph\"); }\n    buildMenu(); markSel();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>分组下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:280px; }\n  .trigger {\n    width:100%; display:flex; align-items:center; gap:8px;\n    padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,var(--shadow,.12)); transition:border-color .15s;\n  }\n  .trigger .val { flex:1; }\n  .trigger .val.ph { color:#9ca3af; }\n  .caret { transition:transform var(--dur,.22s) ease; color:var(--arrow,#6b7280); flex:none; }\n  .field.open .caret { transform:rotate(180deg); }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12));\n    max-height:300px; overflow:auto; opacity:0; transform:translateY(-6px); pointer-events:none;\n    transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:5; padding:6px;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .ghead { padding:8px 12px 4px; font-size:var(--gts,12px); color:var(--gt,#9ca3af); font-weight:700; letter-spacing:.04em; }\n  .opt { padding:9px 12px; font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; border-radius:7px; }\n  .opt:hover { background:var(--hover,#f3f4f6); }\n  .opt.sel { color:var(--theme,#2563eb); font-weight:700; }\n  .grp + .grp { margin-top:var(--ggap,6px); }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择城市</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <script>\n  const GROUPS = [\n    { name:\"华北\", items:[\"北京\",\"天津\",\"石家庄\"] },\n    { name:\"华东\", items:[\"上海\",\"杭州\",\"南京\",\"苏州\"] },\n    { name:\"华南\", items:[\"广州\",\"深圳\",\"厦门\"] }\n  ];\n  const FLAT = GROUPS.flatMap(g=>g.items);\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", groupTitle:\"#9ca3af\", radius:10, fontSize:15, dur:0.22,\n    border:\"#d1d5db\", hoverBg:\"#f3f4f6\", groupTitleSize:12, groupGap:6, placeholder:\"请选择城市\", arrowColor:\"#6b7280\"\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"),\n        val=document.getElementById(\"val\"), menu=document.getElementById(\"menu\");\n  let selected=null, open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    GROUPS.forEach(g=>{\n      const wrap=document.createElement(\"div\"); wrap.className=\"grp\";\n      const h=document.createElement(\"div\"); h.className=\"ghead\"; h.textContent=g.name; wrap.appendChild(h);\n      g.items.forEach(o=>{\n        const d=document.createElement(\"div\");\n        d.className=\"opt\"+(o===selected?\" sel\":\"\"); d.textContent=o;\n        d.onclick=()=>{ selected=o; val.textContent=o; val.classList.remove(\"ph\"); close(); };\n        wrap.appendChild(d);\n      });\n      menu.appendChild(wrap);\n    });\n  }\n  function openMenu(){ open=true; field.classList.add(\"open\"); }\n  function close(){ open=false; field.classList.remove(\"open\"); }\n  trigger.onclick=()=> open?close():openMenu();\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)) close(); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--gt\",state.groupTitle); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--gts\",state.groupTitleSize+\"px\"); R.setProperty(\"--ggap\",state.groupGap+\"px\");\n    R.setProperty(\"--arrow\",state.arrowColor);\n    if(!selected){ val.textContent=state.placeholder; val.classList.add(\"ph\"); }\n    buildMenu();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>可搜索组合框演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:280px; }\n  .box {\n    display:flex; align-items:center; gap:8px; padding:4px 12px; background:var(--ibg,#fff);\n    border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    box-shadow:0 4px 14px rgba(0,0,0,var(--shadow,.12)); transition:border-color .15s;\n  }\n  .field.open .box { border-color:var(--theme,#2563eb); }\n  .box svg { color:var(--arrow,#6b7280); flex:none; }\n  #inp {\n    flex:1; border:0; outline:0; background:transparent; padding:9px 0; font-size:var(--fs,15px);\n    color:var(--text,#1f2937); font-family:inherit;\n  }\n  #inp::placeholder { color:#9ca3af; }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12));\n    max-height:260px; overflow:auto; opacity:0; transform:translateY(-6px); pointer-events:none;\n    transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .opt { padding:10px 14px; font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; }\n  .opt:hover { background:var(--hover,#eff6ff); }\n  .opt mark { background:transparent; color:var(--mc,#2563eb); font-weight:700; }\n  .opt.none { color:#9ca3af; cursor:default; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"box\">\n      <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-4-4\"/></svg>\n      <input id=\"inp\" type=\"text\" placeholder=\"输入关键词筛选…\" autocomplete=\"off\">\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <script>\n  const OPTIONS = [\"北京\",\"上海\",\"广州\",\"深圳\",\"杭州\",\"成都\",\"西安\",\"武汉\",\"南京\",\"重庆\",\"苏州\",\"天津\",\"长沙\",\"青岛\",\"厦门\",\"昆明\"];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.2,\n    border:\"#d1d5db\", hoverBg:\"#eff6ff\", inputBg:\"#ffffff\", matchColor:\"#2563eb\",\n    noResult:\"无匹配项\", placeholder:\"输入关键词筛选…\", minChars:1\n  };\n  const field=document.getElementById(\"field\"), inp=document.getElementById(\"inp\"), menu=document.getElementById(\"menu\");\n  let open=false;\n  function esc(s){ return s.replace(/[&<>]/g,c=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\"}[c])); }\n  function render(){\n    const q=inp.value.trim().toLowerCase();\n    const list = q.length < state.minChars ? OPTIONS : OPTIONS.filter(o=>o.toLowerCase().includes(q));\n    if(!list.length){ menu.innerHTML='<div class=\"opt none\">'+esc(state.noResult)+'</div>'; return; }\n    menu.innerHTML = list.map(o=>{\n      let html=esc(o);\n      if(q){ const i=o.toLowerCase().indexOf(q); if(i>=0) html=esc(o.slice(0,i))+\"<mark>\"+esc(o.slice(i,i+q.length))+\"</mark>\"+esc(o.slice(i+q.length)); }\n      return '<div class=\"opt\">'+html+'</div>';\n    }).join(\"\");\n    [...menu.children].forEach((c,i)=>{ if(list[i]) c.onclick=()=>{ inp.value=list[i]; close(); }; });\n  }\n  function openMenu(){ open=true; field.classList.add(\"open\"); render(); }\n  function close(){ open=false; field.classList.remove(\"open\"); }\n  inp.addEventListener(\"focus\",openMenu);\n  inp.addEventListener(\"input\",()=>{ open=true; field.classList.add(\"open\"); render(); });\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)) close(); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--border\",state.border);\n    R.setProperty(\"--hover\",state.hoverBg); R.setProperty(\"--ibg\",state.inputBg);\n    R.setProperty(\"--mc\",state.matchColor); R.setProperty(\"--arrow\",state.theme);\n    R.setProperty(\"--shadow\",0.12);\n    inp.placeholder=state.placeholder;\n    render();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>拆分按钮演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .split { display:inline-flex; box-shadow:0 6px 18px rgba(0,0,0,var(--shadow,.12)); border-radius:var(--radius,10px); }\n  .main {\n    border:0; outline:0; cursor:pointer; padding:12px 22px; font-size:var(--fs,15px); font-weight:700;\n    background:var(--main,#2563eb); color:var(--text,#fff); border-radius:var(--radius,10px) 0 0 var(--radius,10px);\n    font-family:inherit;\n  }\n  .arrow {\n    border:0; outline:0; cursor:pointer; padding:0 14px; display:flex; align-items:center; justify-content:center;\n    background:var(--acol,#1d4ed8); border-left:1px solid var(--div,#e5e7eb); border-radius:0 var(--radius,10px) var(--radius,10px) 0;\n    color:var(--text,#fff); font-size:var(--asize,14px);\n  }\n  .arrow svg { transition:transform var(--dur,.18s) ease; }\n  .split.open .arrow svg { transform:rotate(180deg); }\n  .menu {\n    position:absolute; min-width:180px; background:var(--mbg,#fff); border:1px solid var(--div,#e5e7eb);\n    border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12)); overflow:hidden;\n    opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.18s) ease, transform var(--dur,.18s) ease; z-index:5;\n  }\n  .split.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .mi { padding:11px 16px; font-size:var(--fs,15px); color:#1f2937; cursor:pointer; }\n  .mi:hover { background:var(--hm,#f3f4f6); }\n  .mi.danger { color:#dc2626; }\n  .wrap { position:relative; display:inline-flex; }\n  .toast {\n    position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(10px); opacity:0;\n    background:#111827; color:#fff; padding:10px 18px; border-radius:10px; font-size:14px; transition:.2s; pointer-events:none;\n  }\n  .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }\n</style>\n</head>\n<body>\n  <div class=\"wrap\">\n    <div class=\"split\" id=\"split\">\n      <button class=\"main\" id=\"main\">保存</button>\n      <button class=\"arrow\" id=\"arrow\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\"><path d=\"M6 9l6 6 6-6\"/></svg></button>\n      <div class=\"menu\" id=\"menu\">\n        <div class=\"mi\" data-a=\"保存并关闭\">保存并关闭</div>\n        <div class=\"mi\" data-a=\"另存为…\">另存为…</div>\n        <div class=\"mi\" data-a=\"导出 PDF\">导出 PDF</div>\n        <div class=\"mi danger\" data-a=\"删除\">删除</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"toast\" id=\"toast\"></div>\n<script>\n  const state = {\n    mainColor:\"#2563eb\", arrowColor:\"#1d4ed8\", text:\"#ffffff\", radius:10, fontSize:15, dur:0.18,\n    menuBg:\"#ffffff\", hoverMenu:\"#f3f4f6\", divLine:\"#e5e7eb\", shadow:0.12, arrowSize:14, defaultLabel:\"保存\"\n  };\n  const split=document.getElementById(\"split\"), main=document.getElementById(\"main\"), arrow=document.getElementById(\"arrow\"),\n        menu=document.getElementById(\"menu\"), toast=document.getElementById(\"toast\");\n  let open=false, t=null;\n  function showToast(msg){ toast.textContent=msg; toast.classList.add(\"show\"); clearTimeout(t); t=setTimeout(()=>toast.classList.remove(\"show\"),1400); }\n  function toggle(){ open=!open; split.classList.toggle(\"open\",open); }\n  arrow.onclick=(e)=>{ e.stopPropagation(); toggle(); };\n  main.onclick=()=> showToast(\"已执行：\" + state.defaultLabel);\n  [...menu.children].forEach(mi=> mi.onclick=()=>{ showToast(\"已执行：\" + mi.dataset.a); open=false; split.classList.remove(\"open\"); });\n  document.addEventListener(\"click\",e=>{ if(!split.contains(e.target)){ open=false; split.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--main\",state.mainColor); R.setProperty(\"--acol\",state.arrowColor);\n    R.setProperty(\"--text\",state.text); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--mbg\",state.menuBg); R.setProperty(\"--hm\",state.hoverMenu);\n    R.setProperty(\"--div\",state.divLine); R.setProperty(\"--shadow\",state.shadow);\n    R.setProperty(\"--asize\",state.arrowSize+\"px\");\n    main.textContent=state.defaultLabel;\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>日期选择器演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; }\n  .trigger {\n    width:200px; padding:11px 14px; background:#fff; border:1px solid var(--border,#e5e7eb); border-radius:var(--radius,8px);\n    font-size:15px; color:var(--text,#1f2937); cursor:pointer; text-align:center; user-select:none;\n  }\n  .pop {\n    position:absolute; top:calc(100% + 6px); left:0; width:280px; background:#fff; border:1px solid var(--border,#e5e7eb);\n    border-radius:var(--radius,8px); box-shadow:0 12px 34px rgba(0,0,0,.12); padding:12px; opacity:0; transform:translateY(-6px);\n    pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5;\n  }\n  .field.open .pop { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .head { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; color:var(--hc,#111827); font-weight:700; }\n  .head button { border:0; background:var(--hb,#f3f4f6); width:28px; height:28px; border-radius:7px; cursor:pointer; font-size:15px; color:var(--hc,#111827); }\n  .grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }\n  .wd { text-align:center; font-size:12px; color:#9ca3af; padding:4px 0; }\n  .cell {\n    height:var(--cs,36px); display:flex; align-items:center; justify-content:center; font-size:14px;\n    border-radius:8px; cursor:pointer; color:var(--text,#1f2937);\n  }\n  .cell.we { color:var(--we,#6b7280); }\n  .cell:hover { background:var(--hover,#eff6ff); }\n  .cell.muted { color:#cbd5e1; }\n  .cell.today { box-shadow:inset 0 0 0 2px var(--today,#ef4444); }\n  .cell.sel { background:var(--theme,#2563eb); color:#fff; }\n  .cell.in { background:var(--theme,#2563eb); color:#fff; opacity:.35; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">选择日期</div>\n    <div class=\"pop\" id=\"pop\">\n      <div class=\"head\">\n        <button id=\"prev\">‹</button>\n        <span id=\"title\"></span>\n        <button id=\"next\">›</button>\n      </div>\n      <div class=\"grid\" id=\"grid\"></div>\n    </div>\n  </div>\n  <script>\n  const WD_SUN = [\"日\",\"一\",\"二\",\"三\",\"四\",\"五\",\"六\"];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", todayColor:\"#ef4444\", radius:8, cellSize:36, dur:0.2,\n    weekStart:\"日\", showRange:false, border:\"#e5e7eb\", hoverBg:\"#eff6ff\", headerColor:\"#111827\", weekendColor:\"#6b7280\"\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), pop=document.getElementById(\"pop\"),\n        grid=document.getElementById(\"grid\"), title=document.getElementById(\"title\");\n  const today=new Date(); today.setHours(0,0,0,0);\n  let vy=today.getFullYear(), vm=today.getMonth(), sel=null, rs=null, re=null, open=false;\n  function same(a,b){ return a&&b&&a.getTime()===b.getTime(); }\n  function diffDays(a,b){ return Math.round((a-b)/864e5); }\n  function build(){\n    const startIdx = state.weekStart===\"日\" ? 0 : 1;\n    const wd=[...WD_SUN.slice(startIdx), ...WD_SUN.slice(0,startIdx)];\n    title.textContent = vy+\" 年 \"+(vm+1)+\" 月\";\n    let html=wd.map(w=>'<div class=\"wd\">'+w+'</div>').join(\"\");\n    const first=new Date(vy,vm,1), lead=(first.getDay()-startIdx+7)%7;\n    const days=new Date(vy,vm+1,0).getDate();\n    for(let i=0;i<lead;i++) html+='<div class=\"cell muted\"></div>';\n    for(let d=1;d<=days;d++){\n      const dt=new Date(vy,vm,d); const wdIdx=dt.getDay();\n      const we=(wdIdx===0||wdIdx===6)?\" we\":\"\";\n      const t=same(dt,today)?\" today\":\"\";\n      let cls=\"cell\"+we+t;\n      if(sel&&same(dt,sel)) cls+=\" sel\";\n      else if(state.showRange&&rs&&re){ if(diffDays(dt,rs)>=0&&diffDays(dt,re)<=0) cls+=\" in\"; }\n      html+='<div class=\"'+cls+'\" data-d=\"'+d+'\">'+d+'</div>';\n    }\n    grid.innerHTML=html;\n    [...grid.querySelectorAll(\".cell[data-d]\")].forEach(c=> c.onclick=()=> pick(new Date(vy,vm,+c.dataset.d)) );\n  }\n  function pick(dt){\n    if(state.showRange){\n      if(!rs||(rs&&re)){ rs=dt; re=null; sel=null; }\n      else if(dt<rs){ re=rs; rs=dt; } else { re=dt; }\n    } else { sel=dt; rs=re=null; trigger.textContent=(dt.getMonth()+1)+\" 月 \"+dt.getDate()+\" 日\"; }\n    build();\n  }\n  document.getElementById(\"prev\").onclick=()=>{ vm--; if(vm<0){vm=11;vy--;} build(); };\n  document.getElementById(\"next\").onclick=()=>{ vm++; if(vm>11){vm=0;vy++;} build(); };\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--today\",state.todayColor);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--cs\",state.cellSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--hc\",state.headerColor); R.setProperty(\"--we\",state.weekendColor);\n    build();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>级联选择器演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:260px; }\n  .trigger {\n    width:100%; padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:15px; color:var(--text,#1f2937); cursor:pointer; user-select:none; box-shadow:0 4px 14px rgba(0,0,0,.12);\n    display:flex; align-items:center; gap:8px; justify-content:space-between;\n  }\n  .trigger .val.ph { color:#9ca3af; }\n  .trigger .val.path { color:var(--pc,#2563eb); font-weight:600; }\n  .panel {\n    position:absolute; top:calc(100% + 6px); left:0; display:flex; gap:var(--cgap,4px); background:#fff;\n    border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px); box-shadow:0 12px 30px rgba(0,0,0,.12);\n    padding:6px; opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5;\n  }\n  .field.open .panel { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .col { width:var(--pw,180px); max-height:240px; overflow:auto; }\n  .col + .col { border-left:1px solid var(--border,#d1d5db); }\n  .ci { display:flex; align-items:center; justify-content:space-between; padding:9px 12px; border-radius:7px; font-size:15px; color:var(--text,#1f2937); cursor:pointer; }\n  .ci:hover { background:var(--hover,#eff6ff); }\n  .ci.on { color:var(--theme,#2563eb); font-weight:700; }\n  .ci .a { color:var(--arrow,#9ca3af); }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择地区</span>\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"panel\" id=\"panel\"></div>\n  </div>\n  <script>\n  const TREE = [\n    { name:\"中国\", children:[\n      { name:\"浙江\", children:[{name:\"杭州\"},{name:\"宁波\"},{name:\"温州\"}] },\n      { name:\"江苏\", children:[{name:\"南京\"},{name:\"苏州\"},{name:\"无锡\"}] },\n      { name:\"广东\", children:[{name:\"广州\"},{name:\"深圳\"},{name:\"东莞\"}] }\n    ]},\n    { name:\"美国\", children:[\n      { name:\"加州\", children:[{name:\"旧金山\"},{name:\"洛杉矶\"}] },\n      { name:\"纽约州\", children:[{name:\"纽约市\"},{name:\"布法罗\"}] }\n    ]}\n  ];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.2, panelW:180,\n    pathColor:\"#2563eb\", border:\"#d1d5db\", hoverBg:\"#eff6ff\", arrowColor:\"#9ca3af\", sep:\" / \", colGap:4, lastFill:true\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), val=document.getElementById(\"val\"),\n        panel=document.getElementById(\"panel\");\n  let path=[], cols=[TREE], open=false;\n  function render(){\n    panel.innerHTML=\"\";\n    cols.forEach((list, ci)=>{\n      const col=document.createElement(\"div\"); col.className=\"col\";\n      list.forEach(node=>{\n        const d=document.createElement(\"div\");\n        const on = path[ci] && path[ci].name===node.name;\n        d.className=\"ci\"+(on?\" on\":\"\");\n        d.innerHTML='<span>'+node.name+'</span>'+(node.children?'<span class=\"a\">›</span>':'');\n        d.onclick=()=> choose(ci, node);\n        col.appendChild(d);\n      });\n      panel.appendChild(col);\n    });\n  }\n  function choose(ci, node){\n    path=path.slice(0,ci); path[ci]=node;\n    if(node.children){ cols=cols.slice(0,ci+1); cols[ci+1]=node.children; render(); }\n    else {\n      if(state.lastFill){ val.textContent=path.map(p=>p.name).join(state.sep); val.classList.remove(\"ph\"); val.classList.add(\"path\"); }\n      open=false; field.classList.remove(\"open\");\n    }\n  }\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); if(open) render(); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--pw\",state.panelW+\"px\");\n    R.setProperty(\"--pc\",state.pathColor); R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--arrow\",state.arrowColor);\n    render();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>多选下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:300px; }\n  .trigger {\n    min-height:46px; display:flex; align-items:center; flex-wrap:wrap; gap:6px; padding:8px 12px; background:#fff;\n    border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,.12); transition:border-color .15s;\n  }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .trigger .ph { color:#9ca3af; font-size:var(--fs,15px); }\n  .tag {\n    display:inline-flex; align-items:center; gap:6px; padding:4px 8px; background:var(--tagbg,#dbeafe);\n    color:var(--tagtext,#1e40af); border-radius:var(--tr,6px); font-size:13px; font-weight:600;\n  }\n  .tag b { cursor:pointer; font-weight:700; opacity:.7; }\n  .tag b:hover { opacity:1; }\n  .caret { margin-left:auto; color:#6b7280; transition:transform var(--dur,.2s) ease; }\n  .field.open .caret { transform:rotate(180deg); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,.12); max-height:260px; overflow:auto;\n    opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5; padding:6px;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .opt { display:flex; align-items:center; gap:10px; padding:9px 12px; font-size:var(--fs,15px); color:var(--text,#1f2937); border-radius:7px; cursor:pointer; }\n  .opt:hover { background:var(--hover,#eff6ff); }\n  .box { width:16px; height:16px; border:2px solid var(--border,#d1d5db); border-radius:5px; display:flex; align-items:center; justify-content:center; flex:none; }\n  .opt.on .box { background:var(--theme,#2563eb); border-color:var(--theme,#2563eb); }\n  .opt.on .box::after { content:\"✓\"; color:#fff; font-size:12px; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"ph\" id=\"ph\">请选择（可多选）</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <script>\n  const OPTIONS = [\"设计\",\"前端\",\"后端\",\"产品\",\"运营\",\"测试\",\"数据\",\"算法\"];\n  const state = {\n    theme:\"#2563eb\", tagBg:\"#dbeafe\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.2,\n    border:\"#d1d5db\", hoverBg:\"#eff6ff\", tagText:\"#1e40af\", tagRadius:6, placeholder:\"请选择（可多选）\", maxTags:0\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), ph=document.getElementById(\"ph\"), menu=document.getElementById(\"menu\");\n  let sel=[], open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    OPTIONS.forEach(o=>{\n      const d=document.createElement(\"div\"); d.className=\"opt\"+(sel.includes(o)?\" on\":\"\");\n      d.innerHTML='<span class=\"box\"></span><span>'+o+'</span>';\n      d.onclick=()=>{ sel.includes(o)?sel=sel.filter(x=>x!==o):sel.push(o); renderTags(); buildMenu(); };\n      menu.appendChild(d);\n    });\n  }\n  function renderTags(){\n    trigger.querySelectorAll(\".tag\").forEach(t=>t.remove());\n    const show = state.maxTags>0 ? sel.slice(0,state.maxTags) : sel;\n    const extra = state.maxTags>0 ? sel.length-state.maxTags : 0;\n    show.forEach(o=>{\n      const t=document.createElement(\"span\"); t.className=\"tag\"; t.innerHTML='<span>'+o+'</span><b>×</b>';\n      t.querySelector(\"b\").onclick=(e)=>{ e.stopPropagation(); sel=sel.filter(x=>x!==o); renderTags(); buildMenu(); };\n      trigger.insertBefore(t, trigger.querySelector(\".caret\"));\n    });\n    if(extra>0){ const t=document.createElement(\"span\"); t.className=\"tag\"; t.innerHTML='<span>+'+extra+'</span>'; trigger.insertBefore(t, trigger.querySelector(\".caret\")); }\n    ph.style.display = sel.length ? \"none\" : \"\";\n  }\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--tagbg\",state.tagBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg); R.setProperty(\"--tagtext\",state.tagText);\n    R.setProperty(\"--tr\",state.tagRadius+\"px\");\n    ph.textContent=state.placeholder;\n    buildMenu(); renderTags();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>大型菜单演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f5f6f8; }\n  .nav { display:flex; gap:6px; padding:14px 22px; background:#fff; border-bottom:1px solid var(--border,#e5e7eb); }\n  .nav a { padding:8px 14px; font-size:15px; color:var(--text,#1f2937); cursor:pointer; border-radius:8px; user-select:none; }\n  .nav a:hover { background:var(--hover,#f3f4f6); }\n  .nav a.mega { font-weight:700; }\n  .mega-wrap { position:relative; }\n  .panel {\n    position:absolute; top:calc(100% + 10px); left:0; display:flex; gap:22px; background:var(--pb,#fff);\n    border:1px solid var(--border,#e5e7eb); border-radius:var(--radius,12px); box-shadow:0 16px 40px rgba(0,0,0,.12);\n    padding:18px 22px; opacity:0; transform:translateY(-8px); pointer-events:none; transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:20;\n  }\n  .mega-wrap.open .panel { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .col { min-width:170px; }\n  .col .ct { font-size:13px; font-weight:800; color:var(--tc,#111827); letter-spacing:.03em; margin-bottom:8px; }\n  .item { display:flex; gap:11px; padding:9px 10px; border-radius:9px; cursor:pointer; }\n  .item:hover { background:var(--hover,#f3f4f6); }\n  .ic { width:34px; height:34px; flex:none; display:flex; align-items:center; justify-content:center; border-radius:9px;\n        background:color-mix(in srgb, var(--ic,#2563eb) 14%, #fff); color:var(--ic,#2563eb); font-size:17px; }\n  .item .nm { font-size:15px; font-weight:600; color:var(--text,#1f2937); }\n  .item .ds { font-size:12px; color:var(--dc,#6b7280); margin-top:2px; }\n  .toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(10px); opacity:0; background:#111827; color:#fff; padding:10px 18px; border-radius:10px; font-size:14px; transition:.2s; }\n  .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }\n</style>\n</head>\n<body>\n  <nav class=\"nav\">\n    <a>首页</a>\n    <div class=\"mega-wrap\" id=\"mw\">\n      <a class=\"mega\" id=\"mega\">产品 ▾</a>\n      <div class=\"panel\" id=\"panel\"></div>\n    </div>\n    <a>定价</a>\n    <a>文档</a>\n  </nav>\n  <div class=\"toast\" id=\"toast\"></div>\n<script>\n  const MENU = [\n    { title:\"设计工具\", items:[\n      { ic:\"✎\", nm:\"Figma\", ds:\"协作式界面设计\" },\n      { ic:\"◑\", nm:\"Sketch\", ds:\"矢量界面设计\" }\n    ]},\n    { title:\"开发\", items:[\n      { ic:\"</>\", nm:\"VS Code\", ds:\"轻量代码编辑器\" },\n      { ic:\"⚡\", nm:\"WebStorm\", ds:\"智能 IDE\" }\n    ]},\n    { title:\"协作\", items:[\n      { ic:\"◎\", nm:\"Slack\", ds:\"团队沟通\" },\n      { ic:\"▤\", nm:\"Notion\", ds:\"文档与知识库\" }\n    ]},\n    { title:\"分析\", items:[\n      { ic:\"▦\", nm:\"Amplitude\", ds:\"产品行为分析\" },\n      { ic:\"◔\", nm:\"Mixpanel\", ds:\"漏斗与留存\" }\n    ]}\n  ];\n  const state = {\n    theme:\"#2563eb\", panelBg:\"#ffffff\", text:\"#1f2937\", titleColor:\"#111827\", radius:12, fontSize:15, dur:0.22,\n    iconColor:\"#2563eb\", hoverBg:\"#f3f4f6\", border:\"#e5e7eb\", cols:3, descColor:\"#6b7280\"\n  };\n  const mw=document.getElementById(\"mw\"), mega=document.getElementById(\"mega\"), panel=document.getElementById(\"panel\"), toast=document.getElementById(\"toast\");\n  let t=null;\n  function showToast(m){ toast.textContent=\"打开：\"+m; toast.classList.add(\"show\"); clearTimeout(t); t=setTimeout(()=>toast.classList.remove(\"show\"),1400); }\n  function render(){\n    const n=Math.max(2,Math.min(4,state.cols));\n    panel.innerHTML = MENU.slice(0,n).map(c=>'<div class=\"col\"><div class=\"ct\">'+c.title+'</div>'+\n      c.items.map(i=>'<div class=\"item\" data-nm=\"'+i.nm+'\"><div class=\"ic\">'+i.ic+'</div><div><div class=\"nm\">'+i.nm+'</div><div class=\"ds\">'+i.ds+'</div></div></div>').join(\"\")+'</div>').join(\"\");\n    [...panel.querySelectorAll(\".item\")].forEach(it=> it.onclick=()=> showToast(it.dataset.nm));\n  }\n  mega.onmouseenter=()=>{ mw.classList.add(\"open\"); };\n  mw.onmouseleave=()=>{ mw.classList.remove(\"open\"); };\n  document.addEventListener(\"click\",e=>{ if(!mw.contains(e.target)) mw.classList.remove(\"open\"); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--pb\",state.panelBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--tc\",state.titleColor); R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--ic\",state.iconColor); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--dc\",state.descColor);\n    render();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>侧边栏导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#1f2937; --text:#e5e7eb; --hover:#374151; --active:#2563eb; --we:220px; --wc:64px; --dur:.3s; --ic:20px; --fs:14px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; display:flex; min-height:100vh; background:#f3f4f6; }\n  #side {\n    width:var(--we); background:var(--bg); color:var(--text);\n    display:flex; flex-direction:column; padding:18px 12px; gap:6px;\n    transition:width var(--dur) cubic-bezier(.16,1,.3,1); overflow:hidden; flex:none;\n  }\n  #side.collapsed { width:var(--wc); }\n  .top { display:flex; align-items:center; gap:10px; margin-bottom:14px; }\n  .toggle { cursor:pointer; width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:10px; background:var(--hover); color:#fff; font-size:20px; flex:none; }\n  .brand { font-weight:800; font-size:16px; white-space:nowrap; color:#fff; }\n  #side.collapsed .brand { display:none; }\n  .item { display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:10px; cursor:pointer; font-size:var(--fs); white-space:nowrap; transition:background .15s,color .15s; }\n  .item:hover { background:var(--hover); }\n  .item.active { background:var(--active); color:#fff; }\n  .item svg { width:var(--ic); height:var(--ic); flex:none; }\n  #side.collapsed .label { display:none; }\n  .content { flex:1; padding:40px; }\n  .content h1 { margin-bottom:10px; color:#111827; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <aside id=\"side\">\n    <div class=\"top\">\n      <div class=\"toggle\" id=\"toggle\">≡</div>\n      <div class=\"brand\" id=\"brand\">Studio</div>\n    </div>\n    <div id=\"items\"></div>\n  </aside>\n  <script>\n  const ICON='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v4M12 18v4M2 12h4M18 12h4\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", bg:\"#1f2937\", text:\"#e5e7eb\", hover:\"#374151\", active:\"#2563eb\",\n    widthExpand:220, widthCollapse:64, dur:0.3, iconSize:20, fontSize:14,\n    brand:\"Studio\", items:\"概览,项目,素材,设置\"\n  };\n  const side=document.getElementById(\"side\"), itemsEl=document.getElementById(\"items\"), brandEl=document.getElementById(\"brand\");\n  let activeIdx=0;\n  function render(){\n    itemsEl.innerHTML=\"\";\n    state.items.split(\",\").forEach((t,i)=>{\n      const d=document.createElement(\"div\"); d.className=\"item\"+(i===activeIdx?\" active\":\"\");\n      d.innerHTML=ICON+'<span class=\"label\">'+t+'</span>';\n      d.onclick=()=>{ activeIdx=i; render(); };\n      itemsEl.appendChild(d);\n    });\n  }\n  document.getElementById(\"toggle\").onclick=()=> side.classList.toggle(\"collapsed\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--active\",state.active);\n    R.setProperty(\"--we\",state.widthExpand+\"px\"); R.setProperty(\"--wc\",state.widthCollapse+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--ic\",state.iconSize+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    brandEl.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>面包屑导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --text:#6b7280; --link:#2563eb; --hover:#1d4ed8; --pageBg:#ffffff; --fs:14px; --gap:8px; --radius:8px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#eef0f3; color:var(--text); }\n  #bar { background:var(--pageBg); padding:16px 26px; border-radius:var(--radius); box-shadow:0 2px 10px rgba(0,0,0,.05); display:flex; align-items:center; gap:var(--gap); font-size:var(--fs); flex-wrap:wrap; }\n  .crumb { display:inline-flex; align-items:center; gap:var(--gap); color:var(--link); cursor:pointer; transition:color .15s; }\n  .crumb:hover { color:var(--hover); }\n  .crumb.home svg { width:15px; height:15px; }\n  .crumb.current { color:var(--text); cursor:default; }\n  .sep { color:#cbd5e1; user-select:none; }\n  .content { padding:40px 26px; max-width:880px; margin:20px auto; background:#fff; border-radius:12px; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <div style=\"padding:20px 26px 0;\"><nav id=\"bar\"></nav></div>\n  <script>\n  const HOME='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 11l9-8 9 8M5 10v10h14V10\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", text:\"#6b7280\", link:\"#2563eb\", hover:\"#1d4ed8\", pageBg:\"#ffffff\",\n    sep:\" / \", fontSize:14, gap:8, radius:8, bold:true,\n    items:\"首页,课程,前端,下拉组件\", homeIcon:true\n  };\n  const bar=document.getElementById(\"bar\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--link\",state.link);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--pageBg\",state.pageBg);\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--gap\",state.gap+\"px\"); R.setProperty(\"--radius\",state.radius+\"px\");\n    const parts=state.items.split(\",\");\n    bar.innerHTML=\"\";\n    parts.forEach((t,i)=>{\n      if(i>0){ const s=document.createElement(\"span\"); s.className=\"sep\"; s.textContent=state.sep; bar.appendChild(s); }\n      const c=document.createElement(\"span\");\n      const isLast=i===parts.length-1;\n      c.className=\"crumb\"+(i===0&&state.homeIcon?\" home\":\"\")+(isLast?\" current\":\"\");\n      if(state.bold && isLast) c.style.fontWeight=\"700\";\n      c.innerHTML=(i===0&&state.homeIcon?HOME:\"\")+(\"<span>\"+t+\"</span>\");\n      bar.appendChild(c);\n    });\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>二级下拉导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#ffffff; --text:#1f2937; --hover:#eff6ff; --subBg:#ffffff; --dur:.2s; --fs:15px; --radius:10px; --shadow:.14; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f5f6f8; color:var(--text); }\n  #nav { display:flex; align-items:center; gap:4px; padding:14px 26px; background:var(--bg); box-shadow:0 2px 10px rgba(0,0,0,.05); position:relative; z-index:20; }\n  .brand { font-weight:800; color:var(--theme); margin-right:18px; }\n  .top { position:relative; }\n  .top>.label { padding:9px 14px; border-radius:10px; font-size:var(--fs); cursor:pointer; display:inline-flex; align-items:center; gap:6px; transition:background .15s,color .15s; }\n  .top:hover>.label { background:var(--hover); color:var(--theme); }\n  .top .caret { transition:transform var(--dur) ease; }\n  .top:hover .caret { transform:rotate(180deg); }\n  .sub { position:absolute; top:calc(100% + 8px); left:0; min-width:200px; background:var(--subBg); border:1px solid #e5e7eb; border-radius:var(--radius); box-shadow:0 12px 30px rgba(0,0,0,var(--shadow)); padding:6px; opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur) ease,transform var(--dur) ease; }\n  .top:hover .sub { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .sub .sitem { padding:9px 12px; border-radius:8px; font-size:var(--fs); cursor:pointer; }\n  .sub .sitem:hover { background:var(--hover); color:var(--theme); }\n  .content { padding:50px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\"><div class=\"brand\">站点</div><div id=\"tops\"></div></nav>\n  <script>\n  const CARET='<svg class=\"caret\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", bg:\"#ffffff\", text:\"#1f2937\", hover:\"#eff6ff\", subBg:\"#ffffff\",\n    dur:0.2, fontSize:15, radius:10, shadow:0.14, arrow:true,\n    topItems:\"产品,解决方案,资源,关于\", subItems:\"设计工具,开发套件,素材市场,模板\"\n  };\n  const topsEl=document.getElementById(\"tops\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--subBg\",state.subBg);\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--shadow\",state.shadow);\n    const tops=state.topItems.split(\",\"), subs=state.subItems.split(\",\");\n    topsEl.innerHTML=\"\";\n    tops.forEach((t,i)=>{\n      const d=document.createElement(\"div\"); d.className=\"top\";\n      const sub=subs[i]||\"\";\n      d.innerHTML='<span class=\"label\">'+t+(state.arrow?' '+CARET:'')+'</span>'+\n        (sub?'<div class=\"sub\">'+sub.split(\",\").map(s=>'<div class=\"sitem\">'+s+'</div>').join('')+'</div>':'');\n      topsEl.appendChild(d);\n    });\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>汉堡菜单导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --menuBg:#111827; --text:#f9fafb; --hover:#374151; --bar:#111827; --ov:.5; --dur:.3s; --sideW:280px; --fs:16px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f3f4f6; }\n  .bar { height:60px; display:flex; align-items:center; padding:0 20px; }\n  .ham { width:42px; height:42px; display:flex; flex-direction:column; justify-content:center; gap:5px; cursor:pointer; }\n  .ham span { height:3px; background:var(--bar); border-radius:2px; transition:.3s; }\n  .overlay { position:fixed; inset:0; background:rgba(0,0,0,var(--ov)); opacity:0; pointer-events:none; transition:opacity var(--dur) ease; z-index:40; }\n  .overlay.open { opacity:1; pointer-events:auto; }\n  .drawer { position:fixed; top:0; bottom:0; width:var(--sideW); background:var(--menuBg); color:var(--text); padding:80px 24px; z-index:50; transition:transform var(--dur) cubic-bezier(.16,1,.3,1); display:flex; flex-direction:column; gap:6px; }\n  .drawer.right { right:0; transform:translateX(100%); }\n  .drawer.left { left:0; transform:translateX(-100%); }\n  .drawer.open.right, .drawer.open.left { transform:translateX(0); }\n  .ditem { padding:14px 16px; border-radius:12px; font-size:var(--fs); cursor:pointer; transition:background .15s; }\n  .ditem:hover { background:var(--hover); }\n  .brand { position:fixed; top:22px; left:20px; font-weight:800; color:var(--theme); z-index:60; }\n  .content { padding:80px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <div class=\"bar\"><div class=\"ham\" id=\"ham\"><span></span><span></span><span></span></div></div>\n  <div class=\"brand\" id=\"brand\">Menu</div>\n  <div class=\"overlay\" id=\"overlay\"></div>\n  <aside class=\"drawer right\" id=\"drawer\"><div id=\"ditems\"></div></aside>\n  <script>\n  const state = {\n    theme:\"#2563eb\", menuBg:\"#111827\", text:\"#f9fafb\", hover:\"#374151\", barColor:\"#111827\",\n    overlayOpacity:0.5, dur:0.3, sideW:280, fontSize:16, from:\"右\",\n    brand:\"Menu\", items:\"首页,作品,关于,联系\"\n  };\n  const ham=document.getElementById(\"ham\"), overlay=document.getElementById(\"overlay\"), drawer=document.getElementById(\"drawer\"), ditems=document.getElementById(\"ditems\"), brandEl=document.getElementById(\"brand\");\n  function render(){ ditems.innerHTML=\"\"; state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"ditem\"; d.textContent=t; ditems.appendChild(d); }); }\n  function setOpen(o){ overlay.classList.toggle(\"open\",o); drawer.classList.toggle(\"open\",o); }\n  ham.onclick=()=> setOpen(!drawer.classList.contains(\"open\"));\n  overlay.onclick=()=> setOpen(false);\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--menuBg\",state.menuBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--bar\",state.barColor);\n    R.setProperty(\"--ov\",state.overlayOpacity); R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--sideW\",state.sideW+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    drawer.classList.remove(\"left\",\"right\"); drawer.classList.add(state.from===\"左\"?\"left\":\"right\");\n    brandEl.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  // 自动演示一次开合（让缩略图能看到效果）\n  setTimeout(() => { setOpen(true); setTimeout(() => setOpen(false), 1200); }, 600);\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>全屏遮罩导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#0f172a; --text:#f8fafc; --hover:#38bdf8; --close:#f8fafc; --dur:.4s; --fs:28px; --gap:22px; --blur:0px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#eef2f7; }\n  .open-btn { position:fixed; top:20px; right:24px; z-index:30; background:var(--theme); color:#fff; border:none; padding:12px 22px; border-radius:30px; font-size:15px; cursor:pointer; }\n  .full { position:fixed; inset:0; background:var(--bg); color:var(--text); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--gap); z-index:50; opacity:0; pointer-events:none; transition:opacity var(--dur) ease; backdrop-filter:blur(var(--blur)); }\n  .full.open { opacity:1; pointer-events:auto; }\n  .ftitle { font-size:14px; letter-spacing:3px; text-transform:uppercase; opacity:.6; margin-bottom:6px; }\n  .fitems { display:flex; flex-direction:column; align-items:center; gap:var(--gap); }\n  .fitem { font-size:var(--fs); font-weight:700; cursor:pointer; transition:color .2s; letter-spacing:1px; }\n  .fitem:hover { color:var(--hover); }\n  .close { position:fixed; top:22px; right:26px; z-index:60; background:none; border:none; color:var(--close); font-size:34px; cursor:pointer; line-height:1; }\n  .content { padding:80px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <button class=\"open-btn\" id=\"open\">菜单</button>\n  <div class=\"full\" id=\"full\"><button class=\"close\" id=\"close\">×</button><div class=\"ftitle\" id=\"ftitle\"></div><div class=\"fitems\" id=\"fitems\"></div></div>\n  <script>\n  const state = {\n    theme:\"#2563eb\", bg:\"#0f172a\", text:\"#f8fafc\", hover:\"#38bdf8\", closeColor:\"#f8fafc\",\n    dur:0.4, fontSize:28, gap:22, blur:0, itemAlign:\"居中\",\n    brand:\"Portfolio\", items:\"Work,About,Services,Contact\"\n  };\n  const openBtn=document.getElementById(\"open\"), full=document.getElementById(\"full\"), closeBtn=document.getElementById(\"close\"), fitems=document.getElementById(\"fitems\"), ftitle=document.getElementById(\"ftitle\");\n  function render(){\n    fitems.innerHTML=\"\";\n    fitems.style.justifyContent = state.itemAlign===\"分散\"?\"space-between\":\"center\";\n    state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"fitem\"; d.textContent=t; fitems.appendChild(d); });\n  }\n  openBtn.onclick=()=> full.classList.add(\"open\");\n  closeBtn.onclick=()=> full.classList.remove(\"open\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--close\",state.closeColor);\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--gap\",state.gap+\"px\"); R.setProperty(\"--blur\",state.blur+\"px\");\n    ftitle.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  // 自动演示一次开合（让缩略图能看到效果）\n  setTimeout(() => { full.classList.add('open'); setTimeout(() => full.classList.remove('open'), 1400); }, 600);\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>滚动收缩导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#e8702a; --initBg:#111827; --scrollBg:#111827; --text:#ffffff; --shadowC:#000000; --sh:56px; --ih:80px; --dur:.3s; --fs:16px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  #nav { position:fixed; top:0; left:0; right:0; z-index:50; height:var(--ih); display:flex; align-items:center; gap:22px; padding:0 30px; color:var(--text); transition:height var(--dur) ease, background var(--dur) ease, box-shadow var(--dur) ease; }\n  #nav.shrunk { height:var(--sh); }\n  .brand { font-weight:800; font-size:calc(var(--fs)+3px); color:var(--theme); }\n  .items { display:flex; gap:6px; flex:1; }\n  .item { padding:8px 14px; border-radius:10px; font-size:var(--fs); cursor:pointer; transition:background .15s; }\n  .item:hover { background:rgba(255,255,255,.12); }\n  .cta { background:var(--theme); color:#fff; padding:9px 18px; border-radius:10px; font-size:var(--fs); cursor:pointer; }\n  .hero { height:100vh; background:linear-gradient(135deg,#1f2937,#111827); display:flex; align-items:center; justify-content:center; color:#fff; font-size:30px; font-weight:800; text-align:center; padding:0 20px; }\n  .sec { height:90vh; padding:0 30px; max-width:880px; margin:0 auto; display:flex; align-items:center; }\n  .sec h2 { color:#111827; }\n  .sec p { color:#6b7280; margin-top:10px; line-height:1.9; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\"><div class=\"brand\" id=\"brand\">Lithos</div><div class=\"items\" id=\"items\"></div><div class=\"cta\">开始</div></nav>\n  <div class=\"hero\">Lithos</div>\n  <div class=\"sec\"><div><h2>关于我们</h2><p>我们专注于为团队提供清晰、高效的工作方式，把复杂的事情变简单。</p></div></div>\n  <div class=\"sec\" style=\"height:90vh;\"></div>\n<script>\n  const state = {\n    theme:\"#e8702a\", initBg:\"#111827\", scrollBg:\"#111827\", text:\"#ffffff\", shadowColor:\"#000000\",\n    initOpacity:0, shrinkH:56, initH:80, dur:0.3, fontSize:16,\n    brand:\"Lithos\", items:\"首页,课程,作品,关于\"\n  };\n  const nav=document.getElementById(\"nav\"), itemsEl=document.getElementById(\"items\"), brandEl=document.getElementById(\"brand\");\n  function render(){ itemsEl.innerHTML=\"\"; state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"item\"; d.textContent=t; itemsEl.appendChild(d); }); }\n  function hexA(hex,a){ const h=hex.replace('#',''); const r=parseInt(h.substr(0,2),16),g=parseInt(h.substr(2,2),16),b=parseInt(h.substr(4,2),16); return `rgba(${r},${g},${b},${a})`; }\n  function onScroll(){\n    const scrolled = window.scrollY > 40;\n    nav.classList.toggle(\"shrunk\", scrolled);\n    nav.style.background = scrolled ? hexA(state.scrollBg, 1) : hexA(state.initBg, state.initOpacity);\n    nav.style.boxShadow = '0 6px 20px ' + hexA(state.shadowColor, scrolled?0.18:0);\n  }\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--initBg\",state.initBg); R.setProperty(\"--scrollBg\",state.scrollBg);\n    R.setProperty(\"--text\",state.text); R.setProperty(\"--shadowC\",state.shadowColor);\n    R.setProperty(\"--sh\",state.shrinkH+\"px\"); R.setProperty(\"--ih\",state.initH+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    brandEl.textContent=state.brand; render(); onScroll();\n  }\n  window.addEventListener(\"scroll\", onScroll);\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    提示词: "帮我做「粒子星系动态背景」（基于 Three.js）：\n效果：4000 颗星星组成的螺旋星系，带 Bloom 辉光、镜头光晕、氛围色和暗角。可拖拽旋转，划过推开星尘。5 套调色板可选。\n用法示例：\n<canvas id=\"sky\"></canvas>\n<script type=\"module\">\n  import { createAstraScene } from './starflow.js'\n  const astra = createAstraScene(document.querySelector('#sky'))\n  astra.setSource({ type: 'galaxy' }, { starCount: 4000, palette: 'astra' })\n<\/script>\n关键参数：\n- starCount 星数(800-12000) / size 星星大小 / scatter 星带宽度 / palette 调色板(astra/aurora/ember/ice/gold)\n- bloomIntensity Bloom强度 / bloomThreshold Bloom阈值 / intensity 亮度 / flare 光晕 / flowSpeed 流动速度\n- backgroundRatio 背景星比例 / rotationDepth 厚度(Z向起伏) / ambientColor 氛围色 / vignette 暗角 / twinkleSpeed 闪烁速度\n集成步骤：\n1. 复制 assets/库/starflow.js 到项目目录\n2. 建一个 <canvas>，import { createAstraScene } from './starflow.js'\n3. 调参数匹配你的品牌色（氛围色用品牌色，暗角调深）\n4. 上面叠文字内容，canvas 做背景\n5. 想加滚动编排：在 scroll 事件里调 astra.setScroll({ progress, tiltProgress, scatterProgress, shape })\n\n",
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
</style>
</head>
<body>
<canvas id="astra"></canvas>

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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>主题切换演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .stage { position: relative; width: min(520px, 92vw); height: 340px; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,.12); cursor: pointer; --dur: .6s; --maxr: 160%; }\n  .surface { position: absolute; inset: 0; padding: 28px; display: flex; flex-direction: column; gap: 14px; justify-content: center; }\n  .surface.dark { clip-path: circle(0px at var(--x, 50%) var(--y, 50%)); transition: clip-path var(--dur) cubic-bezier(.4,0,.2,1); }\n  .stage.on .surface.dark { clip-path: circle(var(--maxr) at var(--x, 50%) var(--y, 50%)); }\n  .bar { height: 14px; border-radius: 8px; width: 55%; }\n  .bar.s { width: 80%; height: 10px; opacity: .7; }\n  .card { margin-top: auto; display: flex; gap: 10px; }\n  .chip { width: 64px; height: 64px; border-radius: 14px; }\n  .btn { margin-top: 14px; align-self: flex-start; padding: 10px 18px; border-radius: 10px; border: none; font-size: 14px; cursor: pointer; }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"surface light\" id=\"light\"></div>\n  <div class=\"surface dark\" id=\"dark\"></div>\n  </div>\n<script>\n  const state = { dur: .6, maxr: 160, lightBg: \"#ffffff\", darkBg: \"#15171c\", lightText: \"#1a1a1a\", darkText: \"#f2f3f5\", accent: \"#3d5fd6\" };\n  const stage = document.getElementById(\"stage\");\n  function build(surface, isDark) {\n    const bg = isDark ? state.darkBg : state.lightBg;\n    const fg = isDark ? state.darkText : state.lightText;\n    surface.style.background = bg;\n    surface.style.color = fg;\n    surface.innerHTML =\n      '<div class=\"bar\" style=\"background:' + state.accent + '\"></div>' +\n      '<div class=\"bar s\" style=\"background:' + fg + '\"></div>' +\n      '<div style=\"font-size:20px;font-weight:700\">灵感弹药库</div>' +\n      '<div class=\"bar s\" style=\"background:' + fg + '\"></div>' +\n      '<div class=\"card\">' +\n        '<div class=\"chip\" style=\"background:' + state.accent + '\"></div>' +\n        '<div class=\"chip\" style=\"background:' + (isDark ? \"#2a2d35\" : \"#ececf0\") + '\"></div>' +\n        '<div class=\"chip\" style=\"background:' + (isDark ? \"#2a2d35\" : \"#ececf0\") + '\"></div>' +\n      '</div>' +\n      '<button class=\"btn\" style=\"background:' + state.accent + ';color:#fff\">切换主题</button>';\n  }\n  function apply() {\n    stage.style.setProperty(\"--dur\", state.dur + \"s\");\n    stage.style.setProperty(\"--maxr\", state.maxr + \"%\");\n    build(document.getElementById(\"light\"), false);\n    build(document.getElementById(\"dark\"), true);\n  }\n  stage.addEventListener(\"pointerdown\", e => {\n    const r = stage.getBoundingClientRect();\n    stage.style.setProperty(\"--x\", (e.clientX - r.left) + \"px\");\n    stage.style.setProperty(\"--y\", (e.clientY - r.top) + \"px\");\n    stage.classList.toggle(\"on\");\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>拖拽排序演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .list { width: min(420px, 92vw); display: flex; flex-direction: column; }\n  .item { color: #fff; padding: 16px 18px; border-radius: 12px; margin: 6px 0; cursor: grab; user-select: none; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 14px rgba(0,0,0,.12); touch-action: none; font-size: 15px; transition: box-shadow .2s; }\n  .item .h { opacity: .7; font-size: 12px; }\n  .item.dragging { box-shadow: 0 14px 34px rgba(0,0,0,.28); cursor: grabbing; z-index: 10; position: relative; }\n</style>\n</head>\n<body>\n<div class=\"list\" id=\"list\"></div>\n<script>\n  const state = { gap: 12, dragScale: 1.06, radius: 12, accent: \"#3d5fd6\", accent2: \"#7c4dff\", count: 6 };\n  const list = document.getElementById(\"list\");\n  const names = [\"首页 Banner\", \"产品列表\", \"用户评价\", \"价格方案\", \"常见问题\", \"页脚导航\", \"订阅区块\", \"关于我们\"];\n  let dragEl = null, startY = 0, dy = 0;\n\n  function render() {\n    list.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const d = document.createElement(\"div\");\n      d.className = \"item\";\n      d.style.background = i % 2 ? state.accent2 : state.accent;\n      d.style.borderRadius = state.radius + \"px\";\n      d.style.margin = (state.gap / 2) + \"px 0\";\n      d.textContent = names[i % names.length];\n      const s = document.createElement(\"span\"); s.className = \"h\"; s.textContent = \"拖 #\" + (i + 1);\n      d.appendChild(s);\n      d.addEventListener(\"pointerdown\", start);\n      list.appendChild(d);\n    }\n  }\n\n  function flip(mutate) {\n    const kids = [...list.children];\n    const olds = kids.map(c => c.getBoundingClientRect());\n    mutate();\n    const news = [...list.children].map(c => c.getBoundingClientRect());\n    [...list.children].forEach((c, idx) => {\n      if (c === dragEl) return;\n      const dx = olds[idx].left - news[idx].left;\n      const dyc = olds[idx].top - news[idx].top;\n      if (dx || dyc) {\n        c.style.transition = \"none\";\n        c.style.transform = \"translate(\" + dx + \"px,\" + dyc + \"px)\";\n        requestAnimationFrame(() => {\n          c.style.transition = \"transform .42s cubic-bezier(.34,1.56,.64,1)\";\n          c.style.transform = \"\";\n        });\n      }\n    });\n  }\n\n  function start(e) {\n    dragEl = e.currentTarget;\n    dragEl.setPointerCapture(e.pointerId);\n    startY = e.clientY; dy = 0;\n    dragEl.classList.add(\"dragging\");\n  }\n\n  window.addEventListener(\"pointermove\", e => {\n    if (!dragEl) return;\n    dy = e.clientY - startY;\n    dragEl.style.transform = \"translateY(\" + dy + \"px) scale(\" + state.dragScale + \")\";\n    const rects = [...list.children].map(c => c.getBoundingClientRect());\n    let target = null;\n    for (let i = 0; i < rects.length; i++) {\n      if (list.children[i] === dragEl) continue;\n      const mid = rects[i].top + rects[i].height / 2;\n      if (e.clientY < mid) { target = list.children[i]; break; }\n      target = list.children[i].nextSibling;\n    }\n    if (target !== dragEl && target !== dragEl.nextSibling) {\n      flip(() => list.insertBefore(dragEl, target));\n      startY = e.clientY - dy + 0; // keep grab offset stable\n    }\n  });\n\n  window.addEventListener(\"pointerup\", () => {\n    if (!dragEl) return;\n    dragEl.classList.remove(\"dragging\");\n    dragEl.style.transform = \"\";\n    dragEl = null;\n  });\n\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; render(); });\n  render();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>文本展开演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .card { width: min(440px, 92vw); background: #fff; border-radius: 16px; box-shadow: 0 10px 36px rgba(0,0,0,.1); overflow: hidden; }\n  .head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; cursor: pointer; user-select: none; }\n  .title { font-size: 16px; font-weight: 700; }\n  .arrow { width: 22px; height: 22px; transition: transform var(--dur) var(--ease); }\n  .body { height: 0; overflow: hidden; transition: height var(--dur) var(--ease); }\n  .body > div { padding: 0 20px 20px; font-size: 14px; line-height: 1.7; }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\">\n  <div class=\"head\" id=\"head\">\n    <div class=\"title\">常见问题</div>\n    <svg class=\"arrow\" id=\"arrow\" viewBox=\"0 0 24 24\"><path d=\"M6 9l6 6 6-6\" fill=\"none\" stroke=\"#1a1a1a\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n  </div>\n  <div class=\"body\" id=\"body\"><div>提交后我们会在两个工作日内处理，结果通过站内消息通知你。如果长时间未收到，可以在个人中心查看处理进度。</div></div>\n</div>\n<script>\n  const state = { dur: .45, ease: \"ease\", radius: 16, text: \"#1a1a1a\", bg: \"#ffffff\", open: false };\n  const card = document.getElementById(\"card\");\n  const arrow = document.getElementById(\"arrow\");\n  const body = document.getElementById(\"body\");\n  document.getElementById(\"head\").addEventListener(\"click\", () => { state.open = !state.open; apply(); });\n  function apply() {\n    card.style.borderRadius = state.radius + \"px\";\n    card.style.background = state.bg;\n    card.querySelector(\".title\").style.color = state.text;\n    arrow.querySelector(\"path\").setAttribute(\"stroke\", state.text);\n    body.style.setProperty(\"--dur\", state.dur + \"s\");\n    body.style.setProperty(\"--ease\", state.ease);\n    body.style.height = state.open ? body.firstElementChild.offsetHeight + \"px\" : \"0px\";\n    arrow.style.transform = state.open ? \"rotate(180deg)\" : \"rotate(0deg)\";\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>步骤条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 24px; }\n  .wrap { width: min(520px, 92vw); }\n  .track { display: flex; align-items: center; justify-content: space-between; position: relative; }\n  .line { position: absolute; left: 0; right: 0; top: 18px; height: 4px; background: #e3e3e6; border-radius: 2px; z-index: 0; }\n  .fill { position: absolute; left: 0; top: 18px; height: 4px; background: var(--accent); border-radius: 2px; z-index: 1; transition: width var(--dur) var(--ease); }\n  .node { width: 36px; height: 36px; border-radius: 50%; background: #fff; border: 3px solid #e3e3e6; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #aaa; z-index: 2; transition: transform .4s cubic-bezier(.34,1.7,.5,1), background var(--dur), border-color var(--dur), color var(--dur); }\n  .node.on { background: var(--accent); border-color: var(--accent); color: #fff; }\n  .node.done { background: var(--done); border-color: var(--done); color: #fff; }\n  .node.finish { animation: pop .5s cubic-bezier(.34,1.7,.5,1); }\n  @keyframes pop { 0% { transform: scale(1); } 45% { transform: scale(1.35); } 100% { transform: scale(1); } }\n  .btn { padding: 10px 22px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 14px; cursor: pointer; }\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n  <div class=\"track\" id=\"track\">\n    <div class=\"line\"></div><div class=\"fill\" id=\"fill\"></div>\n  </div>\n</div>\n<button class=\"btn\" id=\"btn\">下一步</button>\n<script>\n  const state = { steps: 4, dur: .5, overshoot: 1, accent: \"#3d5fd6\", done: \"#2bb673\", bg: \"#fafafa\", ease: \"ease\" };\n  const track = document.getElementById(\"track\");\n  const fill = document.getElementById(\"fill\");\n  const btn = document.getElementById(\"btn\");\n  let cur = 0;\n  function build() {\n    track.querySelectorAll(\".node\").forEach(n => n.remove());\n    for (let i = 0; i < state.steps; i++) {\n      const n = document.createElement(\"div\");\n      n.className = \"node\";\n      n.textContent = i + 1;\n      track.appendChild(n);\n    }\n  }\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--done\", state.done);\n    document.body.style.background = state.bg;\n    track.style.setProperty(\"--dur\", state.dur + \"s\");\n    track.style.setProperty(\"--ease\", state.ease);\n    const nodes = track.querySelectorAll(\".node\");\n    nodes.forEach((n, i) => {\n      n.className = \"node\" + (i < cur ? \" done\" : i === cur ? \" on\" : \"\");\n    });\n    const pct = state.steps > 1 ? (cur / (state.steps - 1)) * 100 : 0;\n    fill.style.width = pct + \"%\";\n  }\n  btn.addEventListener(\"click\", () => {\n    if (cur < state.steps) {\n      cur++;\n      const last = track.querySelectorAll(\".node\")[cur - 1];\n      if (cur === state.steps && last) last.classList.add(\"finish\");\n      apply();\n      if (cur >= state.steps) { btn.textContent = \"重置\"; }\n    } else { cur = 0; btn.textContent = \"下一步\"; apply(); }\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; build(); apply(); });\n  build(); apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片堆叠演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 20px; }\n  .stage { position: relative; width: 220px; height: 260px; }\n  .card { position: absolute; left: 0; top: 0; width: 220px; height: 200px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.16); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; font-weight: 700; transition: transform .4s cubic-bezier(.34,1.4,.5,1); transform-origin: center bottom; }\n  .btn { padding: 10px 22px; border: none; border-radius: 10px; background: #3d5fd6; color: #fff; font-size: 14px; cursor: pointer; }\n  .cnt { font-size: 13px; color: #777; }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\"></div>\n<div class=\"cnt\" id=\"cnt\">浏览量：0</div>\n<button class=\"btn\" id=\"btn\">浏览 +1</button>\n<script>\n  const state = { gap: 14, compress: 0.12, radius: 16, accent: \"#3d5fd6\", card2: \"#7c4dff\", bg: \"#ffffff\" };\n  const stage = document.getElementById(\"stage\");\n  const cnt = document.getElementById(\"cnt\");\n  let n = 0;\n  function apply() {\n    stage.style.background = \"transparent\";\n    cnt.textContent = \"浏览量：\" + n;\n    while (stage.children.length < n) {\n      const c = document.createElement(\"div\");\n      c.className = \"card\";\n      c.textContent = \"内容 #\" + (stage.children.length + 1);\n      stage.appendChild(c);\n      requestAnimationFrame(() => layout());\n    }\n    while (stage.children.length > n) stage.lastChild.remove();\n    layout();\n  }\n  function layout() {\n    const total = stage.children.length;\n    [...stage.children].forEach((c, i) => {\n      const back = total - 1 - i;            // 越靠后(旧)越被压\n      const y = back * state.gap * (1 - back * state.compress);\n      const sc = 1 - back * state.compress;\n      c.style.background = i % 2 ? state.card2 : state.accent;\n      c.style.borderRadius = state.radius + \"px\";\n      c.style.transform = \"translateY(\" + y + \"px) scale(\" + Math.max(sc, .5) + \")\";\n      c.style.zIndex = i;\n    });\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", () => { n = Math.min(n + 1, 8); apply(); });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>标签选择演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .row { width: min(560px, 94vw); display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center; }\n  .tag { padding: 10px 18px; border-radius: 999px; background: var(--sub); color: #555; font-size: 14px; cursor: pointer; user-select: none; border: 1px solid #e0e0e4; transition: transform .35s cubic-bezier(.34,1.5,.5,1), margin .35s cubic-bezier(.34,1.5,.5,1), background .25s, color .25s, box-shadow .25s; }\n  .tag.on { background: var(--accent); color: #fff; border-color: var(--accent); box-shadow: 0 6px 18px rgba(61,95,214,.35); }\n</style>\n</head>\n<body>\n<div class=\"row\" id=\"row\"></div>\n<script>\n  const state = { count: 7, scale: 1.25, gap: 10, radius: 999, accent: \"#3d5fd6\", sub: \"#ffffff\" };\n  const row = document.getElementById(\"row\");\n  const labels = [\"全部\", \"前端\", \"动效\", \"AI\", \"设计\", \"后端\", \"数据\", \"产品\", \"运营\"];\n  let sel = 0;\n  function build() {\n    row.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const t = document.createElement(\"div\");\n      t.className = \"tag\" + (i === sel ? \" on\" : \"\");\n      t.textContent = labels[i % labels.length];\n      t.addEventListener(\"click\", () => { sel = i; apply(); });\n      row.appendChild(t);\n    }\n  }\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--sub\", state.sub);\n    [...row.children].forEach((t, i) => {\n      t.style.borderRadius = state.radius + \"px\";\n      if (i === sel) {\n        t.classList.add(\"on\");\n        t.style.transform = \"scale(\" + state.scale + \")\";\n        t.style.margin = \"0 \" + (state.gap + 6) + \"px\";\n      } else {\n        t.classList.remove(\"on\");\n        t.style.transform = \"scale(1)\";\n        t.style.margin = \"0 \" + (state.gap / 2) + \"px\";\n      }\n    });\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; build(); apply(); });\n  build(); apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>跟随式按钮演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .zone { position: relative; width: min(420px, 92vw); height: 240px; border: 2px dashed #ddd; border-radius: 18px; display: flex; align-items: center; justify-content: center; }\n  .btn { padding: 16px 30px; border: none; border-radius: 14px; background: var(--accent); color: #fff; font-size: 15px; cursor: pointer; user-select: none; touch-action: none; transition: transform .12s ease, box-shadow .12s ease; will-change: transform; }\n</style>\n</head>\n<body>\n<div class=\"zone\" id=\"zone\">\n  <button class=\"btn\" id=\"btn\">提交</button>\n</div>\n<script>\n  const state = { follow: 0.5, depth: 14, radius: 14, accent: \"#3d5fd6\", text: \"#ffffff\" };\n  const btn = document.getElementById(\"btn\");\n  let down = false, cx = 0, cy = 0, ox = 0, oy = 0;\n  function apply() {\n    btn.style.background = state.accent;\n    btn.style.color = state.text;\n    btn.style.borderRadius = state.radius + \"px\";\n  }\n  btn.addEventListener(\"pointerdown\", e => {\n    down = true; btn.setPointerCapture(e.pointerId);\n    const r = btn.getBoundingClientRect();\n    ox = e.clientX - (r.left + r.width / 2);\n    oy = e.clientY - (r.top + r.height / 2);\n  });\n  window.addEventListener(\"pointermove\", e => {\n    if (!down) return;\n    cx = (e.clientX - ox - btn.parentElement.getBoundingClientRect().left - btn.parentElement.clientWidth / 2 + btn.offsetWidth / 2);\n    cy = (e.clientY - oy - btn.parentElement.getBoundingClientRect().top - btn.parentElement.clientHeight / 2 + btn.offsetHeight / 2);\n    btn.style.transform = \"translate(\" + (cx * state.follow) + \"px,\" + (cy * state.follow) + \"px)\";\n    btn.style.boxShadow = \"0 \" + (state.depth * (1 - state.follow * .3)) + \"px \" + (state.depth * 2) + \"px rgba(0,0,0,.18)\";\n    btn.style.filter = \"brightness(\" + (1.15 - state.follow * .15) + \")\";\n  });\n  window.addEventListener(\"pointerup\", () => {\n    if (!down) return; down = false;\n    btn.style.transition = \"transform .35s cubic-bezier(.34,1.5,.5,1), box-shadow .35s, filter .35s\";\n    btn.style.transform = \"translate(0,0)\";\n    btn.style.boxShadow = \"none\";\n    btn.style.filter = \"none\";\n    setTimeout(() => btn.style.transition = \"transform .12s ease, box-shadow .12s ease\", 360);\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>动作优先级判定演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 16px; }\n  .card { width: min(360px, 90vw); height: 220px; border-radius: 18px; background: var(--card); box-shadow: 0 10px 34px rgba(0,0,0,.12); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; touch-action: none; cursor: grab; transition: transform .2s; user-select: none; }\n  .card .big { font-size: 18px; font-weight: 700; color: #1a1a1a; }\n  .badge { padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; transition: background .2s; }\n  .legend { display: flex; gap: 20px; font-size: 13px; color: #666; }\n  .legend b { color: #1a1a1a; }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\">\n  <div class=\"big\">日程卡片</div>\n  <div class=\"badge\" id=\"badge\"></div>\n</div>\n<div class=\"legend\"><b id=\"h\">—</b>　<b id=\"v\">—</b></div>\n<script>\n  const state = { threshold: 24, hColor: \"#3d5fd6\", vColor: \"#e0533d\", card: \"#ffffff\", bg: \"#fafafa\" };\n  const card = document.getElementById(\"card\");\n  const badge = document.getElementById(\"badge\");\n  const h = document.getElementById(\"h\"), v = document.getElementById(\"v\");\n  let sx = 0, sy = 0, axis = null, moved = 0;\n  function apply() {\n    card.style.background = state.card;\n    document.body.style.background = state.bg;\n    h.style.color = state.hColor; v.style.color = state.vColor;\n    badge.style.background = \"#eee\"; badge.style.color = \"#444\";\n    badge.textContent = \"\";\n  }\n  card.addEventListener(\"pointerdown\", e => { sx = e.clientX; sy = e.clientY; axis = null; moved = 0; card.setPointerCapture(e.pointerId); });\n  card.addEventListener(\"pointermove\", e => {\n    const dx = e.clientX - sx, dy = e.clientY - sy;\n    moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));\n    if (!axis && Math.abs(dx) + Math.abs(dy) > 6) axis = Math.abs(dx) > Math.abs(dy) ? \"h\" : \"v\";\n    if (axis === \"h\") { card.style.transform = \"translateX(\" + dx + \"px)\"; badge.style.background = state.hColor; badge.style.color = \"#fff\"; badge.textContent = \"已判定\"; }\n    else if (axis === \"v\") { card.style.transform = \"translateY(\" + dy + \"px)\"; badge.style.background = state.vColor; badge.style.color = \"#fff\"; badge.textContent = \"已判定\"; }\n  });\n  card.addEventListener(\"pointerup\", e => {\n    const dx = e.clientX - sx, dy = e.clientY - sy;\n    if (axis === \"h\" && Math.abs(dx) > state.threshold) flash(\"已执行\");\n    else if (axis === \"v\" && Math.abs(dy) > state.threshold) flash(\"已执行\");\n    else flash(\"位移不足，未触发动作\");\n    card.style.transform = \"translate(0,0)\";\n  });\n  function flash(t) { badge.textContent = t; badge.style.background = \"#1a1a1a\"; badge.style.color = \"#fff\"; }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>可拦截卡片演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 18px; }\n  .stage { position: relative; width: 300px; height: 200px; }\n  .card { position: absolute; inset: 0; border-radius: 18px; background: var(--card); box-shadow: 0 10px 30px rgba(0,0,0,.16); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; font-weight: 700; cursor: grab; touch-action: none; user-select: none; will-change: transform, opacity; }\n  .btn { padding: 10px 22px; border: none; border-radius: 10px; background: #3d5fd6; color: #fff; font-size: 14px; cursor: pointer; }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"card\" id=\"card\">示例卡片</div>\n</div>\n<button class=\"btn\" id=\"fly\">开始</button>\n<script>\n  const state = { dur: 900, dist: 360, rot: 22, card: \"#3d5fd6\", bg: \"#fafafa\", threshold: 200 };\n  const stage = document.getElementById(\"stage\");\n  const card = document.getElementById(\"card\");\n  let raf = null, flying = false, dragging = false, px = 0, py = 0, sx = 0, sy = 0, t0 = 0;\n\n  function apply() {\n    card.style.background = state.card;\n    document.body.style.background = state.bg;\n  }\n  function flyOut() {\n    flying = true; t0 = performance.now();\n    const fromX = 0, fromR = 0;\n    (function step(now) {\n      if (!flying) return;\n      const p = Math.min((now - t0) / state.dur, 1);\n      const e = 1 - Math.pow(1 - p, 3);\n      const x = fromX + state.dist * e;\n      const r = fromR + state.rot * e;\n      card.style.transform = \"translate(\" + x + \"px,\" + (40 * e) + \"px) rotate(\" + r + \"deg)\";\n      card.style.opacity = 1 - p;\n      if (p < 1) raf = requestAnimationFrame(step);\n      else { flying = false; card.style.opacity = 0; }\n    })(t0);\n  }\n  card.addEventListener(\"pointerdown\", e => {\n    if (raf) cancelAnimationFrame(raf);\n    flying = false; dragging = true;\n    card.setPointerCapture(e.pointerId);\n    sx = e.clientX; sy = e.clientY;\n    const m = new DOMMatrixReadOnly(getComputedStyle(card).transform);\n    px = m.m41; py = m.m42;\n    card.style.cursor = \"grabbing\";\n    card.style.opacity = 1;\n  });\n  card.addEventListener(\"pointermove\", e => {\n    if (!dragging) return;\n    card.style.transform = \"translate(\" + (px + e.clientX - sx) + \"px,\" + (py + e.clientY - sy) + \"px)\";\n  });\n  card.addEventListener(\"pointerup\", e => {\n    if (!dragging) return; dragging = false; card.style.cursor = \"grab\";\n    const m = new DOMMatrixReadOnly(getComputedStyle(card).transform);\n    if (m.m41 > state.threshold) flyOut();\n    else { // 弹回原位\n      card.style.transition = \"transform .4s cubic-bezier(.34,1.5,.5,1)\";\n      card.style.transform = \"translate(0,0) rotate(0deg)\";\n      setTimeout(() => card.style.transition = \"\", 420);\n    }\n  });\n  document.getElementById(\"fly\").addEventListener(\"click\", () => { card.style.opacity = 1; card.style.transition = \"\"; card.style.transform = \"translate(0,0)\"; flyOut(); });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>预判轮播落点演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 18px; }\n  .viewport { width: min(320px, 90vw); overflow: hidden; border-radius: 16px; }\n  .track { display: flex; touch-action: pan-y; cursor: grab; }\n  .slide { flex: 0 0 100%; height: 180px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; font-weight: 700; }\n  .dots { display: flex; gap: 8px; }\n  .dot { width: 10px; height: 10px; border-radius: 50%; background: #ccc; transition: transform .2s, background .2s; }\n  .dot.on { background: var(--accent); transform: scale(1.5); }\n  .dot.predict { background: var(--predict); box-shadow: 0 0 0 3px rgba(224,83,61,.25); }\n</style>\n</head>\n<body>\n<div class=\"viewport\" id=\"vp\">\n  <div class=\"track\" id=\"track\"></div>\n</div>\n<div class=\"dots\" id=\"dots\"></div>\n<script>\n  const state = { count: 5, gap: 0, accent: \"#3d5fd6\", predict: \"#e0533d\", bg: \"#fafafa\" };\n  const vp = document.getElementById(\"vp\");\n  const track = document.getElementById(\"track\");\n  const dots = document.getElementById(\"dots\");\n  const palette = [\"#3d5fd6\", \"#7c4dff\", \"#2bb673\", \"#e0993d\", \"#e0533d\", \"#1aa0a0\"];\n  let idx = 0, dragX = 0, startX = 0, dragging = false;\n  function build() {\n    track.innerHTML = \"\";\n    dots.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const s = document.createElement(\"div\");\n      s.className = \"slide\"; s.style.background = palette[i % palette.length];\n      s.textContent = \"第 \" + (i + 1) + \" 屏\";\n      track.appendChild(s);\n      const d = document.createElement(\"div\"); d.className = \"dot\"; dots.appendChild(d);\n    }\n    setX(0, false);\n  }\n  function setX(delta, anim) {\n    track.style.transition = anim ? \"transform .4s cubic-bezier(.34,1.4,.5,1)\" : \"none\";\n    const step = vp.clientWidth + state.gap;\n    track.style.transform = \"translateX(\" + (-idx * step + delta) + \"px)\";\n  }\n  function paint() {\n    const dotsEls = [...dots.children];\n    dotsEls.forEach((d, i) => d.className = \"dot\" + (i === idx ? \" on\" : \"\"));\n  }\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--predict\", state.predict);\n    document.body.style.background = state.bg;\n    build();\n  }\n  vp.addEventListener(\"pointerdown\", e => { dragging = true; startX = e.clientX; vp.setPointerCapture(e.pointerId); });\n  vp.addEventListener(\"pointermove\", e => {\n    if (!dragging) return;\n    const dx = e.clientX - startX;\n    setX(dx, false);\n    const step = vp.clientWidth + state.gap;\n    const predicted = Math.max(0, Math.min(state.count - 1, idx - Math.round(dx / step)));\n    [...dots.children].forEach((d, i) => d.className = \"dot\" + (i === predicted ? \" predict\" : (i === idx ? \" on\" : \"\")));\n  });\n  vp.addEventListener(\"pointerup\", e => {\n    if (!dragging) return; dragging = false;\n    const dx = e.clientX - startX;\n    const step = vp.clientWidth + state.gap;\n    idx = Math.max(0, Math.min(state.count - 1, idx - Math.round(dx / step)));\n    setX(0, true); paint();\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>边界弹性反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 14px; }\n  .box { position: relative; width: min(340px, 92vw); height: 240px; border-radius: 16px; background: #fff; box-shadow: 0 10px 34px rgba(0,0,0,.1); overflow: hidden; touch-action: none; }\n  .rubber { position: absolute; top: 0; left: 0; right: 0; height: 0; background: var(--accent); opacity: .5; transition: height .15s; }\n  .inner { position: absolute; left: 0; right: 0; top: 0; padding: 18px; display: flex; flex-direction: column; gap: 10px; will-change: transform; }\n  .ln { height: 12px; border-radius: 6px; background: #e6e6ea; }\n  .ln.s { width: 70%; }\n</style>\n</head>\n<body>\n<div class=\"box\" id=\"box\">\n  <div class=\"rubber\" id=\"rubber\"></div>\n  <div class=\"inner\" id=\"inner\">\n    <div class=\"ln\"></div><div class=\"ln s\"></div><div class=\"ln\"></div><div class=\"ln s\"></div>\n    <div class=\"ln\"></div><div class=\"ln s\"></div><div class=\"ln\"></div><div class=\"ln s\"></div>\n  </div>\n</div>\n<script>\n  const state = { resistance: 0.25, over: 80, bounce: .5, accent: \"#3d5fd6\", bg: \"#fafafa\" };\n  const box = document.getElementById(\"box\");\n  const inner = document.getElementById(\"inner\");\n  const rubber = document.getElementById(\"rubber\");\n  let sy = 0, ty = 0, dragging = false;\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.body.style.background = state.bg;\n  }\n  box.addEventListener(\"pointerdown\", e => { dragging = true; sy = e.clientY; ty = 0; box.setPointerCapture(e.pointerId); inner.style.transition = \"none\"; rubber.style.transition = \"none\"; });\n  box.addEventListener(\"pointermove\", e => {\n    if (!dragging) return;\n    let d = e.clientY - sy;\n    if (d < 0) d = 0;                         // 只允许向下越界\n    if (d > 0) d = Math.min(d, state.over) * (state.resistance + (1 - state.resistance) * (1 - Math.min(d, state.over) / state.over));\n    ty = d;\n    inner.style.transform = \"translateY(\" + d + \"px)\";\n    rubber.style.height = d + \"px\";\n  });\n  box.addEventListener(\"pointerup\", () => {\n    if (!dragging) return; dragging = false;\n    inner.style.transition = \"transform \" + state.bounce + \"s cubic-bezier(.34,1.56,.64,1)\";\n    rubber.style.transition = \"height \" + state.bounce + \"s ease\";\n    inner.style.transform = \"translateY(0)\";\n    rubber.style.height = \"0px\";\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>流场运动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0e1116; }\n  canvas { display: block; width: min(560px, 94vw); height: min(420px, 80vh); border-radius: 16px; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<script>\n  const state = { count: 240, speed: 1.4, field: 0.004, trail: 0.06, size: 1.6, color: \"#5ad1ff\", bg: \"#0e1116\" };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, ps = [];\n  function resize() { W = canvas.width = canvas.clientWidth * devicePixelRatio; H = canvas.height = canvas.clientHeight * devicePixelRatio; }\n  function angle(x, y, t) { return (Math.cos(x * state.field + t) + Math.sin(y * state.field * 1.3 - t)) * Math.PI; }\n  function build() {\n    ps = [];\n    for (let i = 0; i < state.count; i++) ps.push({ x: Math.random() * W, y: Math.random() * H });\n  }\n  function apply() { resize(); build(); document.body.style.background = state.bg; }\n  let t = 0;\n  function frame() {\n    t += 0.005;\n    ctx.fillStyle = state.bg; ctx.globalAlpha = state.trail; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;\n    ctx.fillStyle = state.color;\n    for (const p of ps) {\n      const a = angle(p.x, p.y, t);\n      p.x += Math.cos(a) * state.speed * devicePixelRatio;\n      p.y += Math.sin(a) * state.speed * devicePixelRatio;\n      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) { p.x = Math.random() * W; p.y = Math.random() * H; }\n      ctx.beginPath(); ctx.arc(p.x, p.y, state.size * devicePixelRatio, 0, 7); ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); frame();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>涡旋卷入演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0e1116; }\n  canvas { display: block; width: min(520px, 94vw); height: min(520px, 88vh); border-radius: 16px; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<script>\n  const state = { count: 320, spin: 0.05, pull: 0.6, core: 8, size: 2.4, color: \"#ffb24d\", bg: \"#0e1116\" };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, ps = [];\n  function resize() { W = canvas.width = canvas.clientWidth * devicePixelRatio; H = canvas.height = canvas.clientHeight * devicePixelRatio; }\n  function build() {\n    ps = [];\n    for (let i = 0; i < state.count; i++) {\n      const ang = Math.random() * 7, r = (40 + Math.random() * Math.min(W, H) * 0.45) * devicePixelRatio;\n      ps.push({ a: ang, r: r });\n    }\n  }\n  function apply() { resize(); build(); document.body.style.background = state.bg; }\n  function frame() {\n    ctx.fillStyle = state.bg; ctx.fillRect(0, 0, W, H);\n    const cx = W / 2, cy = H / 2;\n    ctx.fillStyle = state.color;\n    for (const p of ps) {\n      p.a += state.spin;                       // 沿螺旋旋转\n      p.r -= state.pull * devicePixelRatio * (1 - p.r / (Math.min(W, H) * 0.45 * devicePixelRatio)); // 越近越慢\n      if (p.r < state.core * devicePixelRatio) { p.r = (40 + Math.random() * Math.min(W, H) * 0.45) * devicePixelRatio; p.a = Math.random() * 7; }\n      const x = cx + Math.cos(p.a) * p.r;\n      const y = cy + Math.sin(p.a) * p.r;\n      const size = Math.max(0.6, (p.r / (Math.min(W, H) * 0.45)) * state.size) * devicePixelRatio;\n      ctx.beginPath(); ctx.arc(x, y, size, 0, 7); ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); frame();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>表面粒子化消散演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #0e1116; gap: 12px; }\n  canvas { display: block; width: min(460px, 92vw); height: min(360px, 70vh); border-radius: 16px; }\n  .btn { padding: 9px 20px; border: none; border-radius: 10px; background: #5ad1ff; color: #062; font-size: 14px; cursor: pointer; font-weight: 700; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<button class=\"btn\" id=\"btn\">重新消散</button>\n<script>\n  const state = { density: 5, speed: 0.6, drift: 1.2, size: 1.4, color: \"#9b8cff\", bg: \"#0e1116\" };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, ps = [], front = 0, t = 0;\n  function resize() { W = canvas.width = canvas.clientWidth * devicePixelRatio; H = canvas.height = canvas.clientHeight * devicePixelRatio; }\n  function build() {\n    ps = [];\n    const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.32;\n    for (let y = -R; y <= R; y += state.density * devicePixelRatio) {\n      const w = Math.sqrt(R * R - y * y);\n      for (let x = -w; x <= w; x += state.density * devicePixelRatio) {\n        ps.push({ bx: cx + x, by: cy + y, x: cx + x, y: cy + y, free: false, vx: 0, vy: 0 });\n      }\n    }\n    front = 0; t = 0;\n  }\n  function apply() { resize(); build(); document.body.style.background = state.bg; }\n  function frame() {\n    t += 0.016;\n    front += state.speed * devicePixelRatio * 0.6;\n    ctx.fillStyle = state.bg; ctx.fillRect(0, 0, W, H);\n    ctx.fillStyle = state.color;\n    for (const p of ps) {\n      if (!p.free && p.bx <= front) { p.free = true; const a = Math.random() * Math.PI - Math.PI; const s = (0.5 + Math.random()) * state.drift * devicePixelRatio; p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s - state.drift * 0.4 * devicePixelRatio; }\n      if (p.free) { p.x += p.vx; p.y += p.vy; p.vy += 0.02 * devicePixelRatio; p.vx *= 0.99; }\n      ctx.beginPath(); ctx.arc(p.x, p.y, state.size * devicePixelRatio, 0, 7); ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", build);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); frame();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>碰撞散射演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #0e1116; gap: 12px; }\n  canvas { display: block; width: min(520px, 94vw); height: min(360px, 70vh); border-radius: 16px; }\n  .btn { padding: 9px 20px; border: none; border-radius: 10px; background: #ff7a59; color: #fff; font-size: 14px; cursor: pointer; font-weight: 700; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<button class=\"btn\" id=\"btn\">重新发射</button>\n<script>\n  const state = { count: 220, speed: 2.2, obstacle: 46, size: 1.6, color: \"#7CFFB2\", obColor: \"#ff7a59\", bg: \"#0e1116\" };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, ps = [], obs = { x: 0, y: 0, r: 0 };\n  function resize() { W = canvas.width = canvas.clientWidth * devicePixelRatio; H = canvas.height = canvas.clientHeight * devicePixelRatio; obs = { x: W * 0.62, y: H / 2, r: state.obstacle * devicePixelRatio }; }\n  function build() {\n    ps = [];\n    for (let i = 0; i < state.count; i++) ps.push(spawn());\n  }\n  function spawn() { return { x: -5, y: Math.random() * H, vx: state.speed * devicePixelRatio, vy: (Math.random() - 0.5) * 0.6 * devicePixelRatio }; }\n  function apply() { resize(); build(); document.body.style.background = state.bg; }\n  function frame() {\n    ctx.fillStyle = state.bg; ctx.fillRect(0, 0, W, H);\n    ctx.fillStyle = state.obColor;\n    ctx.beginPath(); ctx.arc(obs.x, obs.y, obs.r, 0, 7); ctx.fill();\n    ctx.fillStyle = state.color;\n    for (const p of ps) {\n      const dx = p.x - obs.x, dy = p.y - obs.y, d = Math.hypot(dx, dy);\n      if (d < obs.r + 2 * devicePixelRatio) {\n        const nx = dx / d, ny = dy / d;\n        const dot = p.vx * nx + p.vy * ny;\n        p.vx -= 2 * dot * nx; p.vy -= 2 * dot * ny;     // 法线反射，不穿透\n        p.x = obs.x + nx * (obs.r + 3 * devicePixelRatio);\n        p.y = obs.y + ny * (obs.r + 3 * devicePixelRatio);\n      }\n      p.x += p.vx; p.y += p.vy;\n      if (p.x > W + 5 || p.y < -5 || p.y > H + 5) Object.assign(p, spawn());\n      ctx.beginPath(); ctx.arc(p.x, p.y, state.size * devicePixelRatio, 0, 7); ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", build);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply(); frame();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>执行计划预览演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .tt { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }\n  .sub { font-size: 12px; color: #888; margin-bottom: 12px; }\n  .step { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid #eee; font-size: 13px; color: #444; }\n  .dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #ccc; flex: none; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #aaa; }\n  .step.run .dot { border-color: var(--accent); color: var(--accent); }\n  .step.done .dot { background: var(--accent); border-color: var(--accent); color: #fff; }\n  .step.done .name { color: #1a1a1a; }\n  .btn { margin-top: 14px; width: 100%; padding: 11px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 14px; cursor: pointer; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"tt\">任务：生成本周复盘周报</div>\n  <div class=\"sub\">先展示分步计划，确认后再启动（多步骤长耗时任务适用）</div>\n  <div id=\"steps\"></div>\n  <button class=\"btn\" id=\"btn\">确认计划并启动</button>\n</div>\n<script>\n  const state = { steps: 4, dur: 900, accent: \"#3d5fd6\", bg: \"#fafafa\", card: \"#ffffff\" };\n  const stepsEl = document.getElementById(\"steps\");\n  const btn = document.getElementById(\"btn\");\n  const plan = [\"检索本周 git 提交与笔记\", \"归纳关键进展与卡点\", \"生成周报草稿\", \"本地校验格式并落盘\"];\n  let running = false;\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    stepsEl.innerHTML = \"\";\n    for (let i = 0; i < state.steps; i++) {\n      const s = document.createElement(\"div\"); s.className = \"step\"; s.dataset.i = i;\n      s.innerHTML = '<div class=\"dot\">' + (i + 1) + '</div><div class=\"name\">' + (plan[i % plan.length]) + '</div>';\n      stepsEl.appendChild(s);\n    }\n  }\n  btn.addEventListener(\"click\", () => {\n    if (running) return; running = true; btn.disabled = true; btn.textContent = \"执行中…\";\n    let i = 0;\n    (function next() {\n      if (i >= state.steps) { btn.textContent = \"已完成 ✓\"; return; }\n      const el = stepsEl.children[i];\n      el.classList.add(\"run\"); el.querySelector(\".dot\").textContent = \"…\";\n      setTimeout(() => { el.classList.remove(\"run\"); el.classList.add(\"done\"); el.querySelector(\".dot\").textContent = \"✓\"; i++; next(); }, state.dur);\n    })();\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>工具调用反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: ui-monospace, \"SFMono-Regular\", Consolas, monospace; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 12px; }\n  .panel { width: min(460px, 94vw); height: 300px; background: #0f1115; border-radius: 14px; padding: 14px; overflow: auto; color: #d6d6da; font-size: 12.5px; line-height: 1.7; box-shadow: 0 10px 34px rgba(0,0,0,.2); }\n  .row { white-space: pre-wrap; }\n  .k { color: var(--accent); }\n  .p { color: #ffd27a; }\n  .r { color: #7CFFB2; }\n  .btn { padding: 9px 20px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 13px; cursor: pointer; font-family: system-ui; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"log\"></div>\n<button class=\"btn\" id=\"btn\">运行任务（展示工具调用）</button>\n<script>\n  const state = { calls: 4, dur: 700, accent: \"#5ad1ff\", bg: \"#fafafa\" };\n  const log = document.getElementById(\"log\");\n  const calls = [\n    ['搜索', '{query:\"Web 灵感弹药库\"}', \"命中 12 条素材\"],\n    ['读取页面', '{url:\"index.html\"}', \"解析 67 条条目\"],\n    ['计算', '{a:8848,b:1.06}', \"结果 9379.88\"],\n    ['写文件', '{path:\"data/素材.js\"}', \"已写入 22 条\"]\n  ];\n  let timer = null;\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    log.innerHTML = \"\";\n  }\n  btn.addEventListener(\"click\", () => {\n    log.innerHTML = \"\"; let i = 0;\n    clearInterval(timer);\n    timer = setInterval(() => {\n      if (i >= state.calls) { clearInterval(timer); return; }\n      const c = calls[i % calls.length];\n      const div = document.createElement(\"div\"); div.className = \"row\";\n      div.innerHTML = '<span class=\"k\">→ 调用 ' + c[0] + '</span> <span class=\"p\">' + c[1] + '</span>\\n  <span class=\"r\">← 返回 ' + c[2] + '</span>';\n      log.appendChild(div); log.scrollTop = log.scrollHeight; i++;\n    }, state.dur);\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>人工授权确认演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 22px; box-shadow: 0 10px 34px rgba(0,0,0,.1); border-top: 4px solid var(--warn); }\n  .tt { font-size: 15px; font-weight: 700; color: #1a1a1a; display: flex; align-items: center; gap: 8px; }\n  .impact { margin: 12px 0; font-size: 12.5px; color: #555; line-height: 1.7; background: #fff6f3; border: 1px solid #ffd9cf; border-radius: 10px; padding: 10px 12px; }\n  .impact b { color: var(--warn); }\n  .row { display: flex; gap: 10px; margin-top: 8px; }\n  .btn { flex: 1; padding: 11px; border: none; border-radius: 10px; font-size: 14px; cursor: pointer; }\n  .ok { background: var(--warn); color: #fff; }\n  .no { background: #eee; color: #555; }\n  .status { margin-top: 12px; font-size: 13px; font-weight: 700; min-height: 18px; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"tt\">⚠ 即将执行高危操作</div>\n  <div class=\"impact\">操作：<b>覆盖 production 配置文件</b><br>影响：线上 3 个服务将重载；不可自动撤销，需人工回滚。<br>建议：先备份再执行。</div>\n  <div class=\"row\">\n    <button class=\"btn ok\" id=\"ok\">确认执行</button>\n    <button class=\"btn no\" id=\"no\">取消</button>\n  </div>\n  <div class=\"status\" id=\"st\"></div>\n</div>\n<script>\n  const state = { accent: \"#3d5fd6\", warn: \"#e0533d\", bg: \"#fafafa\", card: \"#ffffff\" };\n  const st = document.getElementById(\"st\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--warn\", state.warn);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n  }\n  document.getElementById(\"ok\").addEventListener(\"click\", () => { st.style.color = state.warn; st.textContent = \"已授权，正在执行…（完成后回报结果）\"; });\n  document.getElementById(\"no\").addEventListener(\"click\", () => { st.style.color = \"#888\"; st.textContent = \"已取消，操作未执行\"; });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>分步进度反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 14px; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .item { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-top: 1px solid #eee; }\n  .badge { font-size: 11px; padding: 3px 9px; border-radius: 999px; font-weight: 700; flex: none; }\n  .b-wait { background: #eee; color: #999; }\n  .b-run { background: #eaf0ff; color: var(--accent); }\n  .b-done { background: #e6f7ee; color: var(--done); }\n  .name { font-size: 13px; color: #444; }\n  .item.run .name { color: var(--accent); font-weight: 700; }\n  .item.done .name { color: #1a1a1a; }\n  .bar { height: 4px; background: #eee; border-radius: 2px; overflow: hidden; margin-top: 4px; }\n  .bar > i { display: block; height: 100%; width: 0; background: var(--accent); transition: width .3s; }\n  .item.run .bar > i { width: 60%; }\n  .item.done .bar > i { width: 100%; background: var(--done); }\n  .btn { width: min(420px, 92vw); padding: 11px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 14px; cursor: pointer; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\"></div>\n<button class=\"btn\" id=\"btn\">开始执行</button>\n<script>\n  const state = { steps: 4, dur: 1000, accent: \"#3d5fd6\", done: \"#2bb673\", bg: \"#fafafa\", card: \"#ffffff\" };\n  const p = document.getElementById(\"p\");\n  const plan = [\"检索素材\", \"抽取关键参数\", \"生成可运行代码\", \"写入弹药库并校验\"];\n  let running = false;\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--done\", state.done);\n    p.innerHTML = \"\";\n    for (let i = 0; i < state.steps; i++) {\n      const it = document.createElement(\"div\"); it.className = \"item\";\n      it.innerHTML = '<span class=\"badge b-wait\">等待</span><div style=\"flex:1\"><div class=\"name\">' + plan[i % plan.length] + '</div><div class=\"bar\"><i></i></div></div>';\n      p.appendChild(it);\n    }\n  }\n  btn.addEventListener(\"click\", () => {\n    if (running) return; running = true; btn.disabled = true; btn.textContent = \"执行中…\";\n    const items = [...p.children]; let i = 0;\n    (function next() {\n      if (i >= items.length) { btn.textContent = \"全部完成 ✓\"; return; }\n      const it = items[i]; const b = it.querySelector(\".badge\");\n      b.className = \"badge b-run\"; b.textContent = \"进行中\"; it.classList.add(\"run\");\n      setTimeout(() => { b.className = \"badge b-done\"; b.textContent = \"完成\"; it.classList.remove(\"run\"); it.classList.add(\"done\"); i++; next(); }, state.dur);\n    })();\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>产物预览反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 18px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .thumb { height: 120px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 700; }\n  .sum { font-size: 12.5px; color: #555; line-height: 1.7; margin: 12px 0; }\n  .row { display: flex; gap: 10px; }\n  .btn { flex: 1; padding: 10px; border: none; border-radius: 10px; font-size: 13px; cursor: pointer; }\n  .a { background: var(--accent); color: #fff; }\n  .b { background: #eee; color: #555; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"thumb\">report.html 预览</div>\n  <div class=\"sum\">已生成《本周复盘周报》单文件 HTML：含 4 段小结 + 1 张指标图，约 28KB，可直接双击打开。</div>\n  <div class=\"row\">\n    <button class=\"btn a\" id=\"open\">打开预览</button>\n    <button class=\"btn b\" id=\"copy\">复制代码</button>\n    <button class=\"btn b\" id=\"dl\">下载</button>\n  </div>\n</div>\n<script>\n  const state = { accent: \"#3d5fd6\", accent2: \"#7c4dff\", bg: \"#fafafa\", card: \"#ffffff\" };\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--accent2\", state.accent2);\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", () => alert(\"（演示）打开 report.html 预览\"));\n  document.getElementById(\"copy\").addEventListener(\"click\", () => alert(\"（演示）已复制 HTML 到剪贴板\"));\n  document.getElementById(\"dl\").addEventListener(\"click\", () => alert(\"（演示）开始下载 report.html\"));\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>重试恢复反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; gap: 12px; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .phase { font-size: 13px; line-height: 1.7; }\n  .err { background: #fff6f3; border: 1px solid #ffd9cf; color: #b3402a; border-radius: 10px; padding: 10px 12px; margin: 10px 0; font-size: 12.5px; }\n  .retry { background: #eaf0ff; border: 1px solid #cdddff; color: var(--accent); border-radius: 10px; padding: 10px 12px; margin: 10px 0; font-size: 12.5px; }\n  .fallback { background: #e9f9ef; border: 1px solid #c7ecd4; color: var(--done); border-radius: 10px; padding: 10px 12px; margin: 10px 0; font-size: 12.5px; }\n  .btn { width: min(420px, 92vw); padding: 11px; border: none; border-radius: 10px; background: var(--accent); color: #fff; font-size: 14px; cursor: pointer; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"phase\">尝试：写入 <code>data/素材.js</code></div>\n  <div class=\"err\" id=\"err\">✗ 失败：文件被占用（EBUSY），第 1 次</div>\n  <div class=\"retry\" id=\"retry\">↻ 自动重试中…（退避 0.5s）</div>\n</div>\n<button class=\"btn\" id=\"btn\">模拟一次完整重试</button>\n<script>\n  const state = { accent: \"#3d5fd6\", done: \"#2bb673\", bg: \"#fafafa\", card: \"#ffffff\" };\n  const p = document.getElementById(\"p\");\n  const err = document.getElementById(\"err\");\n  const retry = document.getElementById(\"retry\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--done\", state.done);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", () => {\n    err.textContent = \"✗ 失败：文件被占用（EBUSY），第 1 次\";\n    retry.textContent = \"↻ 自动重试中…（退避 0.5s）\";\n    retry.className = \"retry\";\n    setTimeout(() => { retry.textContent = \"↻ 第 2 次重试…（退避 1s）\"; }, 500);\n    setTimeout(() => {\n      retry.className = \"fallback\";\n      retry.innerHTML = \"✓ 备用方案：写入 <b>data/素材.tmp.js</b> 后原子替换，成功\";\n    }, 1600);\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>最终结果反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--bg); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }\n  .panel { width: min(420px, 92vw); background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 10px 34px rgba(0,0,0,.1); }\n  .top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }\n  .check { width: 28px; height: 28px; border-radius: 50%; background: var(--done); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 15px; }\n  .tt { font-size: 15px; font-weight: 700; color: #1a1a1a; }\n  .sum { font-size: 12.5px; color: #555; line-height: 1.7; margin-bottom: 10px; }\n  .arts { font-size: 12.5px; color: #333; line-height: 1.8; }\n  .arts li { margin-left: 18px; }\n  .todo { margin-top: 10px; font-size: 12.5px; color: var(--warn); background: #fff8ec; border: 1px solid #ffe6b8; border-radius: 10px; padding: 9px 12px; }\n</style>\n</head>\n<body>\n<div class=\"panel\" id=\"p\">\n  <div class=\"top\"><div class=\"check\">✓</div><div class=\"tt\">任务完成</div></div>\n  <div class=\"sum\">已为「Web 灵感弹药库」新增 22 条素材（15 网页动效 + 7 AI 反馈），全部通过语法校验，演示可离线运行。</div>\n  <div class=\"arts\">产物：\n    <ul class=\"arts\">\n      <li>assets/demos/ 下 22 个演示文件</li>\n      <li>data/素材.js 新增 22 条数据</li>\n      <li>index.html 新增「AI反馈」分类</li>\n    </ul>\n  </div>\n  <div class=\"todo\">待办：README 全库索引计数待更新为 89 条；GitHub Pages 待重新部署。</div>\n</div>\n<script>\n  const state = { accent: \"#3d5fd6\", done: \"#2bb673\", warn: \"#e0993d\", bg: \"#fafafa\", card: \"#ffffff\" };\n  function apply() {\n    document.documentElement.style.setProperty(\"--bg\", state.bg);\n    document.documentElement.style.setProperty(\"--card\", state.card);\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--done\", state.done);\n    document.documentElement.style.setProperty(\"--warn\", state.warn);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>更新公告胶囊演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); color: var(--zi); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; gap: 18px; }\n  /* 公告胶囊：用最小面积塞一条新消息，不抢首屏主角 */\n  .pill { display: inline-flex; align-items: center; gap: 8px; padding: var(--neibian) calc(var(--neibian) * 1.6);\n    background: var(--kadi); border: 1px solid var(--bianse); border-radius: var(--yuanjiao);\n    font-size: var(--zihao); color: var(--zi); cursor: pointer; transition: filter .18s ease; }\n  .pill .new { background: var(--dian); color: #fff; border-radius: 6px; padding: 1px 7px; font-size: calc(var(--zihao) - 1.5px); font-weight: 700; }\n  .pill .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--dian); }\n  .pill .arw { color: var(--dian); transition: transform .2s ease; }\n  .pill:hover { filter: brightness(calc(100% + var(--tiliang) * 1%)); }\n  .pill:hover .arw { transform: translateX(var(--jianto)); }\n  .pill.solid { background: var(--dian); color: #fff; border-color: var(--dian); }\n  .pill.solid .new { background: #fff; color: var(--dian); }\n  .pill.solid .arw, .pill.solid .dot { color: #fff; background: #fff; }\n</style>\n</head>\n<body>\n  <div class=\"pill\" id=\"a\"><span class=\"new\">New</span>Loops 上线：反馈直接变成任务<span class=\"arw\">→</span></div>\n  <div class=\"pill\" id=\"b\"><span class=\"dot\"></span>小圆点版：更低调的日常公告<span class=\"arw\">→</span></div>\n  <div class=\"pill solid\" id=\"c\"><span class=\"new\">New</span>实心版：想让这条消息更跳一点</div>\n  <script>\n  // 参数状态：键名与 data/素材.js 的「参数」一一对应\n  const state = { yuanjiao: 999, neibian: 8, zihao: 13, jianto: 5, tiliang: 12,\n    dian: \"#5E6AD2\", kadi: \"#ffffff\", bianse: \"#e6e6e6\", zi: \"#1a1a1a\", di: \"#fafafa\" };\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    r.setProperty(\"--neibian\", state.neibian + \"px\");\n    r.setProperty(\"--zihao\", state.zihao + \"px\");\n    r.setProperty(\"--jianto\", state.jianto + \"px\");\n    r.setProperty(\"--tiliang\", state.tiliang);\n    r.setProperty(\"--dian\", state.dian);\n    r.setProperty(\"--kadi\", state.kadi);\n    r.setProperty(\"--bianse\", state.bianse);\n    r.setProperty(\"--zi\", state.zi);\n    r.setProperty(\"--di\", state.di);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>亲密性功能分组演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); color: var(--zi); display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n  .wrap { width: min(620px, 94vw); }\n  h2 { font-size: 15px; margin-bottom: 18px; }\n  /* 组间距：组与组之间拉大，形成「内紧外松」——亲密性原则的核心 */\n  .groups { display: flex; flex-direction: column; gap: var(--zujian); }\n  .grp { display: flex; flex-direction: column; gap: var(--zunei); }\n  .grp > .gt { font-size: 12px; letter-spacing: .06em; color: var(--zhucai); }\n  .grp > .cards { display: grid; grid-template-columns: 1fr 1fr; gap: var(--zunei); }\n  .card { background: var(--kase); border: 1px solid color-mix(in srgb, var(--zi) 8%, transparent);\n    border-radius: var(--yuanjiao); padding: 14px; display: flex; gap: 11px; align-items: flex-start;\n    box-shadow: 0 calc(var(--yinying) * 0.2px) calc(var(--yinying) * 0.6px) rgba(0, 0, 0, .08);\n    transition: filter .18s ease; cursor: default; }\n  .card:hover { filter: brightness(calc(100% + var(--tiliang) * 1%)); }\n  .ico { width: var(--tubiao); height: var(--tubiao); flex: 0 0 auto; border-radius: calc(var(--yuanjiao) * 0.6);\n    background: color-mix(in srgb, var(--zhucai) 16%, transparent); color: var(--zhucai);\n    display: flex; align-items: center; justify-content: center; font-size: calc(var(--tubiao) * 0.5); }\n  .card b { display: block; font-size: 13.5px; }\n  .card span { display: block; margin-top: 4px; font-size: 12px; color: var(--cizi); line-height: 1.5; }\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n  <h2>功能按亲密性抱团（组内间距 &lt; 组间距）</h2>\n  <div class=\"groups\">\n    <div class=\"grp\">\n      <div class=\"gt\">对话 / 反馈</div>\n      <div class=\"cards\">\n        <div class=\"card\"><div class=\"ico\">↩</div><div><b>收进 issue</b><span>一句话把反馈变成待办</span></div></div>\n        <div class=\"card\"><div class=\"ico\">◎</div><div><b>自动去重</b><span>同类反馈自动合并</span></div></div>\n      </div>\n    </div>\n    <div class=\"grp\">\n      <div class=\"gt\">规划</div>\n      <div class=\"cards\">\n        <div class=\"card\"><div class=\"ico\">▤</div><div><b>周期排期</b><span>目标拆到可执行</span></div></div>\n        <div class=\"card\"><div class=\"ico\">↗</div><div><b>进度可视</b><span>一眼看到卡在哪</span></div></div>\n      </div>\n    </div>\n    <div class=\"grp\">\n      <div class=\"gt\">智能体</div>\n      <div class=\"cards\">\n        <div class=\"card\"><div class=\"ico\">✦</div><div><b>agent 当队友</b><span>重复劳动交给它</span></div></div>\n        <div class=\"card\"><div class=\"ico\">⇄</div><div><b>人机共用流程</b><span>同一套工作流</span></div></div>\n      </div>\n    </div>\n  </div>\n</div>\n<script>\n  // 参数状态：键名与 data/素材.js 的「参数」一一对应\n  const state = { zunei: 12, zujian: 40, yuanjiao: 12, yinying: 10, tiliang: 8, tubiao: 24,\n    zhucai: \"#5E6AD2\", di: \"#fafafa\", zi: \"#1a1a1a\", cizi: \"#6b6b6b\", kase: \"#ffffff\" };\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--zunei\", state.zunei + \"px\");\n    r.setProperty(\"--zujian\", state.zujian + \"px\");\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    r.setProperty(\"--yinying\", state.yinying);\n    r.setProperty(\"--tiliang\", state.tiliang);\n    r.setProperty(\"--tubiao\", state.tubiao + \"px\");\n    r.setProperty(\"--zhucai\", state.zhucai);\n    r.setProperty(\"--di\", state.di);\n    r.setProperty(\"--zi\", state.zi);\n    r.setProperty(\"--cizi\", state.cizi);\n    r.setProperty(\"--kase\", state.kase);\n  }\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>液态形变演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }\n  .card { width: 200px; height: 130px; border-radius: var(--radius); background: var(--accent); color: var(--text); padding: 16px; cursor: grab; touch-action: none; will-change: transform; user-select: none; display: flex; flex-direction: column; justify-content: center; gap: 6px; }\n  .card:active { cursor: grabbing; }\n  .card b { font-size: 16px; }\n  .card span { font-size: 12.5px; opacity: .85; }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\"></div>\n\n<script>\n  const state = { deform: 0.5, recover: 0.5, radius: 18, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#ffffff\" };\n  const card = document.getElementById(\"card\");\n  let dragging = false, vx = 0, vy = 0, offX = 0, offY = 0, cx0 = 0, cy0 = 0;\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n  }\n  card.addEventListener(\"pointerdown\", e => {\n    dragging = true; card.setPointerCapture(e.pointerId);\n    const r = card.getBoundingClientRect();\n    cx0 = r.left + r.width / 2; cy0 = r.top + r.height / 2;\n    offX = e.clientX - cx0; offY = e.clientY - cy0;\n    vx = vy = 0; lastX = e.clientX; lastY = e.clientY;\n    card.style.transition = \"none\";\n  });\n  let lastX = 0, lastY = 0;\n  card.addEventListener(\"pointermove\", e => {\n    if (!dragging) return;\n    const dx = e.clientX - lastX, dy = e.clientY - lastY;\n    vx = vx * 0.6 + dx * 0.4; vy = vy * 0.6 + dy * 0.4;\n    lastX = e.clientX; lastY = e.clientY;\n    const tx = (e.clientX - offX) - cx0, ty = (e.clientY - offY) - cy0;\n    // 速度转形变：沿拖动方向拉伸、垂直方向压扁，幅度随 deform 调；速度归零时自动回正\n    const sp = Math.min(Math.hypot(vx, vy) / 40, 1);\n    const sx = 1 + sp * state.deform * 0.5 * (vx >= 0 ? 1 : -1);\n    const sy = 1 - sp * state.deform * 0.35;\n    const sk = (vy / 40) * state.deform * 6;\n    card.style.transform = \"translate(\" + tx + \"px,\" + ty + \"px) scale(\" + sx.toFixed(3) + \",\" + sy.toFixed(3) + \") skewX(\" + sk.toFixed(2) + \"deg)\";\n  });\n  function release() {\n    if (!dragging) return; dragging = false;\n    card.style.transition = \"transform \" + state.recover + \"s cubic-bezier(.34,1.5,.5,1)\";\n    card.style.transform = \"translate(0,0) scale(1,1) skewX(0deg)\";\n  }\n  card.addEventListener(\"pointerup\", release);\n  card.addEventListener(\"pointercancel\", release);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>按钮滑出取消演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; overflow: hidden; }\n  .btn { position: relative; padding: 16px 34px; border: none; border-radius: var(--radius); background: var(--accent); color: var(--text); font-size: 15px; font-weight: 700; cursor: pointer; user-select: none; touch-action: none; transition: transform var(--spring) ease, filter var(--spring) ease; will-change: transform; }\n  .btn.down { transform: translateY(var(--depth)) scale(.98); filter: brightness(.82); }\n  .btn.done { background: #2e9e5b; }\n  .status { font-size: 12.5px; color: color-mix(in srgb, var(--accent) 55%, #888); }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">按住发送</button>\n<div class=\"status\" id=\"status\"></div>\n\n<script>\n  const state = { depth: 6, spring: 0.3, radius: 14, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#ffffff\" };\n  const btn = document.getElementById(\"btn\");\n  const status = document.getElementById(\"status\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n    document.documentElement.style.setProperty(\"--depth\", state.depth + \"px\");\n    document.documentElement.style.setProperty(\"--spring\", state.spring + \"s\");\n  }\n  let pressing = false;\n  function inside(e) { const r = btn.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; }\n  btn.addEventListener(\"pointerdown\", e => { pressing = true; btn.classList.add(\"down\"); btn.setPointerCapture(e.pointerId); });\n  btn.addEventListener(\"pointermove\", e => {\n    // 移出按钮范围即取消按压（视觉复位），移回再按下——松手时按当前是否在范围内决定\n    if (pressing && !inside(e)) { btn.classList.remove(\"down\"); }\n    else if (pressing && inside(e)) { btn.classList.add(\"down\"); }\n  });\n  btn.addEventListener(\"pointerup\", e => {\n    if (!pressing) return; pressing = false;\n    if (inside(e) && btn.classList.contains(\"down\")) {\n      btn.classList.remove(\"down\"); btn.classList.add(\"done\"); btn.textContent = \"已发送 ✓\";\n      status.textContent = \"已发送\";\n      setTimeout(() => { btn.classList.remove(\"done\"); btn.textContent = \"按住发送\"; status.textContent = \"\"; }, 1100);\n    } else {\n      btn.classList.remove(\"down\"); status.textContent = \"已取消\";\n      setTimeout(() => status.textContent = \"\", 1100);\n    }\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>文字局部过渡演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .card { width: min(380px, 92vw); background: #fff; border: 1px solid color-mix(in srgb, var(--accent) 14%, transparent); border-radius: var(--radius); padding: 22px; box-shadow: 0 8px 24px rgba(0,0,0,.06); }\n  .desc { font-size: 12.5px; color: #888; margin-bottom: 14px; }\n  .row { display: flex; align-items: baseline; gap: 12px; }\n  .num { font-size: 40px; font-weight: 800; color: var(--num); font-variant-numeric: tabular-nums; line-height: 1; }\n  .num.roll { animation: roll var(--dur) cubic-bezier(.22,1,.36,1); }\n  @keyframes roll { 0% { transform: translateY(40%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }\n  .unit { font-size: 14px; color: #666; }\n  .tabs { display: flex; gap: 8px; margin-top: 18px; }\n  .mtab { flex: 1; padding: 9px 0; border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent); background: transparent; color: #555; border-radius: 10px; font-size: 13px; cursor: pointer; transition: all .2s; }\n  .mtab.on { background: var(--accent); color: #fff; border-color: var(--accent); }\n</style>\n</head>\n<body>\n<div class=\"card\">\n  <div class=\"desc\" id=\"desc\">本月访问概览</div>\n  <div class=\"row\">\n    <div class=\"num\" id=\"num\">1280</div>\n    <div class=\"unit\">次访问</div>\n  </div>\n  <div class=\"tabs\" id=\"tabs\">\n    <button class=\"mtab\">1月</button><button class=\"mtab on\">2月</button><button class=\"mtab\">3月</button><button class=\"mtab\">4月</button>\n  </div>\n  \n</div>\n\n<script>\n  const state = { dur: 0.6, radius: 16, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#1a1a1a\", num: \"#5E6AD2\" };\n  const numEl = document.getElementById(\"num\");\n  const tabs = Array.from(document.querySelectorAll(\".mtab\"));\n  const DATA = [980, 1280, 1540, 1110];\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--num\", state.num);\n    document.documentElement.style.setProperty(\"--radius\", state.radius + \"px\");\n    document.documentElement.style.setProperty(\"--dur\", state.dur + \"s\");\n  }\n  function setMonth(i) {\n    tabs.forEach((t, j) => t.classList.toggle(\"on\", j === i));\n    numEl.textContent = DATA[i];\n    numEl.classList.remove(\"roll\"); void numEl.offsetWidth; numEl.classList.add(\"roll\");\n  }\n  tabs.forEach((t, i) => t.addEventListener(\"click\", () => setMonth(i)));\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>跟手返回演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n  .stage { position: relative; width: min(420px, 92vw); height: 280px; border-radius: 18px; overflow: hidden; background: #fff; border: 1px solid color-mix(in srgb, var(--accent) 16%, transparent); touch-action: none; }\n  .page { position: absolute; inset: 0; background: var(--accent); color: var(--text); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; will-change: transform; }\n  .page h3 { font-size: 18px; }\n  .page p { font-size: 12.5px; opacity: .85; }\n  .arrow { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.9); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 20px; opacity: 0; transition: opacity .1s; }\n  .edge { position: absolute; left: 0; top: 0; bottom: 0; width: var(--edge); }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"page\" id=\"page\"><h3>当前页面</h3><p></p></div>\n  <div class=\"arrow\" id=\"arrow\">‹</div>\n  <div class=\"edge\" id=\"edge\"></div>\n  \n</div>\n\n<script>\n  const state = { edge: 24, thresh: 40, spring: 0.4, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#ffffff\" };\n  const stage = document.getElementById(\"stage\");\n  const page = document.getElementById(\"page\");\n  const arrow = document.getElementById(\"arrow\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--text\", state.text);\n    document.documentElement.style.setProperty(\"--edge\", state.edge + \"px\");\n  }\n  let drag = false, startX = 0, lastX = 0, lastT = 0, vel = 0;\n  stage.addEventListener(\"pointerdown\", e => {\n    const r = stage.getBoundingClientRect();\n    if (e.clientX - r.left > state.edge) return;\n    drag = true; startX = e.clientX; lastX = e.clientX; lastT = performance.now(); vel = 0;\n    page.style.transition = \"none\"; stage.setPointerCapture(e.pointerId);\n  });\n  stage.addEventListener(\"pointermove\", e => {\n    if (!drag) return;\n    let dx = e.clientX - startX; if (dx < 0) dx *= 0.3; // 向左有边界阻尼，不能拖出屏幕\n    const w = stage.clientWidth;\n    page.style.transform = \"translateX(\" + dx + \"px)\";\n    arrow.style.opacity = Math.min(dx / (w * 0.4), 1);\n    const now = performance.now(), dt = now - lastT || 16; vel = (e.clientX - lastX) / dt; lastX = e.clientX; lastT = now;\n  });\n  stage.addEventListener(\"pointerup\", e => {\n    if (!drag) return; drag = false;\n    const w = stage.clientWidth, dx = e.clientX - startX;\n    const go = dx > w * state.thresh / 100 || (vel > 0.6 && dx > 20);\n    page.style.transition = \"transform \" + state.spring + \"s cubic-bezier(.4,0,.2,1)\";\n    if (go) {\n      page.style.transform = \"translateX(\" + w + \"px)\";\n      setTimeout(() => {\n        page.querySelector(\"h3\").textContent = \"已返回\"; page.querySelector(\"p\").textContent = \"\";\n        page.style.transition = \"none\"; page.style.transform = \"translateX(0)\";\n        setTimeout(() => { page.querySelector(\"h3\").textContent = \"当前页面\"; page.querySelector(\"p\").textContent = \"\"; }, 700);\n      }, state.spring * 1000);\n    } else {\n      page.style.transform = \"translateX(0)\";\n    }\n    arrow.style.opacity = 0;\n  });\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); });\n  apply();\n<\/script>\n</body>\n</html>\n",
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
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>标题折叠演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: var(--di); height: 100vh; overflow: hidden; }\n  .scroll { height: 100vh; overflow-y: auto; }\n  .head { position: sticky; top: 0; background: var(--headbg); padding: 22px 20px; will-change: transform, background-color; }\n  .head h1 { font-size: var(--fs); color: var(--headc); transform: translateX(var(--tx)); line-height: 1.1; }\n  .head .sub { margin-top: 6px; font-size: 13px; color: color-mix(in srgb, var(--headc) 70%, #999); transform: translateX(var(--tx)); }\n  .body { padding: 20px; color: #444; font-size: 14px; line-height: 1.9; }\n  .body p { margin-bottom: 16px; }\n</style>\n</head>\n<body>\n<div class=\"scroll\" id=\"scroll\">\n  <div class=\"head\" id=\"head\"><h1>产品设计中的留白</h1></div>\n  <div class=\"body\">\n    <p>留白不是空缺，而是给内容留出呼吸的位置。信息一旦堆得太满，读者反而不知道从哪里看起。</p>\n    <p>先把最重要的内容放到视觉重心上，其余元素主动退让，页面自然就有了层级。</p>\n    <p>标题、副文、按钮构成第一屏的三段节奏，越往下越次要，视线不会被无谓的元素打断。</p>\n    <p>当页面足够长时，让标题随滚动收起，可以把更多空间让给正文，阅读也更连贯。</p>\n    <div style=\"height:60vh\"></div>\n  </div>\n</div>\n\n<script>\n  const state = { scale: 0.6, rise: 80, radius: 14, accent: \"#5E6AD2\", di: \"#fafafa\", text: \"#1a1a1a\" };\n  const scroll = document.getElementById(\"scroll\");\n  const head = document.getElementById(\"head\");\n  function apply() {\n    document.documentElement.style.setProperty(\"--accent\", state.accent);\n    document.documentElement.style.setProperty(\"--di\", state.di);\n    document.documentElement.style.setProperty(\"--headc\", state.text);\n  }\n  function onScroll() {\n    const max = Math.max(scroll.scrollHeight - scroll.clientHeight, 1);\n    const p = Math.min(scroll.scrollTop / 220, 1); // 0→1 的折叠进度\n    const fs = 24 - (24 - 24 * state.scale) * p;\n    const tx = -p * 40;\n    const ry = -p * state.rise;\n    head.style.setProperty(\"--fs\", fs.toFixed(1) + \"px\");\n    head.style.setProperty(\"--tx\", tx.toFixed(1) + \"px\");\n    head.style.transform = \"translateY(\" + ry.toFixed(1) + \"px)\";\n    // 底色随进度从透明变为主色（折叠后像吸顶条）\n    head.style.setProperty(\"--headbg\", \"color-mix(in srgb, var(--accent) \" + Math.round(p * 14) + \"%, var(--di))\");\n  }\n  scroll.addEventListener(\"scroll\", onScroll);\n  window.addEventListener(\"message\", e => { const d = e.data; if (!d || d.type !== \"param\") return; state[d.key] = d.value; apply(); onScroll(); });\n  apply(); onScroll();\n<\/script>\n</body>\n</html>\n",
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
    提示词: "给 AI 的提示词（直接复制）：\n效果：一列卡片，每张沿不同对齐轴（左/中/右）错位排布，首卡用主色强调；错位量、间距、对齐方式、错位规律（交替/递增/阶梯）可调。\n用法示例：官网首屏要点、能力清单、客户证言，错位排布立刻出层次，避免「四块一样大」的模板感。\n关键参数：cuowei 错位量 42px（8–80）／ jiange 间距 22px（8–48）／ yuanjiao 圆角 14px（0–40）／ yinying 阴影 14（0–30）／ guilv 错位规律 0（0交替/1递增/2阶梯）／ duiqie 对齐 0（0三轴/1居中/2左）／ zhucai 主色 #5E6AD2 ／ di 底色 #fafafa ／ zi 文字色 #1a1a1a ／ qiangdiao 强调首卡 0（0关/1开）\n集成步骤：复制 assets/demos/v175-卡片错位.html，每张卡 transform:translateX(偏移)；偏移由 错位量×规律 算出，对齐轴决定 textAlign。",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片错位布局演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n    background: var(--di);\n    color: var(--zi);\n    display: flex; align-items: center; justify-content: center;\n    min-height: 100vh; padding: 28px 16px;\n  }\n  .wrap { width: min(640px, 94vw); }\n  h2 { font-size: 15px; margin-bottom: 6px; }\n  .sub { font-size: 12.5px; color: var(--cizi); margin-bottom: 20px; }\n\n  .list { display: flex; flex-direction: column; gap: var(--jiange); }\n  .card {\n    background: var(--kase);\n    border: 1px solid color-mix(in srgb, var(--zi) 10%, transparent);\n    border-radius: var(--yuanjiao);\n    padding: 16px 18px;\n    box-shadow: 0 calc(var(--yinying) * 0.2px) calc(var(--yinying) * 0.7px) rgba(0,0,0,.08);\n    transform: translateX(var(--shift, 0px));\n    transition: transform .25s ease, box-shadow .2s ease;\n  }\n  .card .t { font-size: 14.5px; font-weight: 700; }\n  .card .d { margin-top: 5px; font-size: 12.5px; color: var(--cizi); line-height: 1.55; }\n\n  .card.first {\n    border-color: var(--zhucai);\n    box-shadow: 0 calc(var(--yinying) * 0.3px) calc(var(--yinying) * 1px) color-mix(in srgb, var(--zhucai) 35%, transparent);\n  }\n  .card.first .t { color: var(--zhucai); }\n\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n  <div class=\"list\" id=\"list\"></div>\n</div>\n\n<script>\n\n  const state = {\n    cuowei: 42, jiange: 22, yuanjiao: 14, yinying: 14,\n    guilv: 0, duiqie: 0, qiangdiao: 1,\n    zhucai: \"#5E6AD2\", di: \"#fafafa\", zi: \"#1a1a1a\", cizi: \"#6b6b6b\", kase: \"#ffffff\"\n  };\n  const DATA = [\n    { t: \"首屏主张\", d: \"一句话讲清你是谁，错位让这条先被看见\" },\n    { t: \"核心能力\", d: \"三到四项能力，各自缩进不同形成节奏\" },\n    { t: \"使用场景\", d: \"场景卡错开，避免「四块一样大」的模板感\" },\n    { t: \"客户证言\", d: \"证言卡再错一级，纵深由偏移量堆出来\" },\n    { t: \"行动引导\", d: \"最后一块回正或继续错位，收住动线\" }\n  ];\n  function alignOf(i) {\n\n    if (state.duiqie === 1) return \"center\";\n    if (state.duiqie === 2) return \"left\";\n    return [\"left\", \"center\", \"right\"][i % 3];\n  }\n  function shiftOf(i) {\n\n    const c = state.cuowei;\n    if (state.guilv === 0) return (i % 2 === 0 ? 1 : -1) * c;\n    if (state.guilv === 1) return i * (c * 0.5);\n    return i * c;\n  }\n  function build() {\n    const list = document.getElementById(\"list\");\n    list.innerHTML = \"\";\n    DATA.forEach((it, i) => {\n      const el = document.createElement(\"div\");\n      el.className = \"card\" + (i === 0 && state.qiangdiao ? \" first\" : \"\");\n      el.style.textAlign = alignOf(i);\n      el.style.setProperty(\"--shift\", shiftOf(i) + \"px\");\n      el.innerHTML = '<div class=\"t\">' + it.t + '</div><div class=\"d\">' + it.d + '</div>';\n      list.appendChild(el);\n    });\n  }\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--jiange\", state.jiange + \"px\");\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    r.setProperty(\"--yinying\", state.yinying);\n    r.setProperty(\"--zhucai\", state.zhucai);\n    r.setProperty(\"--di\", state.di);\n    r.setProperty(\"--zi\", state.zi);\n    r.setProperty(\"--cizi\", state.cizi);\n    r.setProperty(\"--kase\", state.kase);\n    build();\n  }\n  window.addEventListener(\"message\", e => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "aw01",
    标题: "评分徽章",
    分类: "组件",
    子类: "状态反馈",
    风格: ["信息型","极简"],
    场景: ["官网·品牌站","作品集·叙事","通用模块区"],
    元素: ["视觉","构成","反馈"],
    搭配: ["数字滚动"],
    标签: ["徽章","评分","第二焦点","橙色"],
    来源: "网站拆解：Awwwards（awwwards.com）首页 Site of the Day 区块，2026-09-14 抓取分析（评分 7.69/10、品牌强调色 --color-primary #FF9667）；仅取交互与配色手法，代码自写",
    效果演示: "assets/demos/aw01-评分徽章.html",
    参数: [{"键":"score","名":"分值","类型":"slider","最小":0,"最大":10,"步长":0.01,"默认":7.69},{"键":"manfen","名":"满分","类型":"slider","最小":5,"最大":100,"步长":1,"默认":10},{"键":"size","名":"徽章直径(px)","类型":"slider","最小":40,"最大":120,"步长":2,"默认":84},{"键":"zihao","名":"数字字号(px)","类型":"slider","最小":12,"最大":40,"步长":1,"默认":20},{"键":"yuanjiao","名":"圆角(px)","类型":"slider","最小":0,"最大":60,"步长":1,"默认":42},{"键":"huan","名":"进度环(0关/1开)","类型":"slider","最小":0,"最大":1,"步长":1,"默认":1},{"键":"huanKuan","名":"环宽(px)","类型":"slider","最小":1,"最大":10,"步长":1,"默认":4},{"键":"maichong","名":"呼吸脉冲(0关/1开)","类型":"slider","最小":0,"最大":1,"步长":1,"默认":1},{"键":"zhucai","名":"强调色(那 10%)","类型":"color","默认":"#FF9667"},{"键":"di","名":"页面底色","类型":"color","默认":"#ffffff"},{"键":"zi","名":"正文色","类型":"color","默认":"#222222"},{"键":"cizi","名":"次要字色","类型":"color","默认":"#8a8a8a"},{"键":"xian","名":"分隔线色","类型":"color","默认":"#ededed"}],
    效果说明: "三把尺子：色相＝中性浅底 + 一个橙；明度＝橙底徽章对灰阶文字，明度差全开；饱和度＝全场只有它高饱和——所以它自动成了第二焦点。\nAwwwards 的分工是：封面大图当第一焦点（面积最大），橙色 7.69/10 徽章当第二焦点（唯一暖色、圆形自成一团），作者名与日期降到灰阶第三层。给它一个自己的形状 + 唯一的颜色，眼睛就会按大图 → 徽章 → 网格的顺序跳三下。\n能怎么改：拖「分值」看数字与进度环联动、「圆角」从圆章切到胶囊、「呼吸脉冲」控制它在静止页面里要不要抢戏；想验证那 10% 是不是被稀释了，就把「页面底色」拖成暖灰——橙不再是全场唯一的暖色，焦点立刻散。",
    用法: "默认 84px 橙色圆形徽章 + 进度环 + 呼吸脉冲，复制 demo 里的 .badge 一段即可；分值变化时环的长度按比例换算（周长 2πr，用 stroke-dasharray 截断）。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：一个圆形评分徽章，橙底白字显示「7.69/10」，外围带按分值截段的进度环，可选呼吸脉冲；全场只有它高饱和，其余信息灰阶退让，充当页面第二焦点。\n用法示例：作品/榜单/评测类站点的封面图旁标注评分；也可改成「完成度」「健康分」「进度」等任何需要一个圆形象征的地方。\n关键参数：score 分值 7.69（0–10）／ manfen 满分 10（5–100）／ size 直径 84px（40–120）／ zihao 字号 20px（12–40）／ yuanjiao 圆角 42px（0–60）／ huan 进度环 1（0关/1开）／ huanKuan 环宽 4px（1–10）／ maichong 呼吸脉冲 1（0关/1开）／ zhucai 强调色 #FF9667 ／ di 页面底色 #ffffff ／ zi 正文色 #222222 ／ cizi 次要字色 #8a8a8a ／ xian 分隔线色 #ededed\n集成步骤：复制 assets/demos/aw01-评分徽章.html；进度环用 SVG 两个 circle 叠放，前景 circle 的 stroke-dasharray = 周长×占比 + 空格 + 周长；呼吸脉冲用一层绝对定位的 border 做 scale + 淡出动画；强调色只给它，其余文字一律灰阶。",
    复用记录: "",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>评分徽章演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n    background: var(--di); color: var(--zi);\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    padding: 28px 18px;\n  }\n  .stage { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; }\n  .kicker { font-size: 11.5px; letter-spacing: .16em; text-transform: uppercase; color: var(--cizi); }\n  .title { font-size: 22px; font-weight: 800; letter-spacing: -.3px; }\n  .row { display: flex; align-items: center; gap: 12px; margin-top: 2px; }\n\n  .badge {\n    position: relative;\n    width: var(--size); height: var(--size);\n    border-radius: var(--yuanjiao);\n    display: flex; align-items: center; justify-content: center;\n    background: var(--zhucai); color: #fff;\n    font-size: var(--zihao); font-weight: 800; letter-spacing: -.5px;\n    box-shadow: 0 6px 18px color-mix(in srgb, var(--zhucai) 30%, transparent);\n  }\n  .badge .num { line-height: 1; }\n  .badge .num small { font-size: .5em; opacity: .8; font-weight: 700; }\n\n  /* 第二焦点：徽章以外的信息全部降成灰阶，橙色只留给它 */\n  .meta { display: flex; flex-direction: column; gap: 3px; }\n  .meta .m1 { font-size: 13px; color: var(--cizi); }\n  .meta .m2 { font-size: 12px; color: color-mix(in srgb, var(--cizi) 70%, transparent); }\n\n  .ring { position: absolute; inset: calc(var(--size) * -0.17); }\n  .ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }\n  .ring circle { fill: none; stroke-width: var(--huanKuan); }\n  .ring .bg { stroke: var(--xian); }\n  .ring .fg { stroke: var(--zhucai); stroke-linecap: round; }\n\n  .pulse {\n    position: absolute; inset: 0; border-radius: inherit;\n    border: 2px solid var(--zhucai);\n    animation: pl 2s ease-out infinite;\n  }\n  @keyframes pl {\n    0% { transform: scale(1); opacity: .5; }\n    100% { transform: scale(1.45); opacity: 0; }\n  }\n  .hidden { display: none; }\n</style>\n</head>\n<body>\n<div class=\"stage\">\n  <div class=\"kicker\">Site of the Day</div>\n  <div class=\"title\">Léo Parpeix - Portfolio 2026</div>\n  <div class=\"row\">\n    <div class=\"badge\" id=\"badge\">\n      <span class=\"ring hidden\" id=\"ring\">\n        <svg viewBox=\"0 0 100 100\"><circle class=\"bg\" cx=\"50\" cy=\"50\" r=\"46\"></circle><circle class=\"fg\" cx=\"50\" cy=\"50\" r=\"46\" id=\"fg\"></circle></svg>\n      </span>\n      <span class=\"pulse hidden\" id=\"pulse\"></span>\n      <span class=\"num\" id=\"num\"></span>\n    </div>\n    <div class=\"meta\">\n      <div class=\"m1\">Sep 14, 2026</div>\n      <div class=\"m2\" id=\"fenmu\"></div>\n    </div>\n  </div>\n</div>\n\n<script>\n  const state = {\n    score: 7.69, manfen: 10, size: 84, zihao: 20, yuanjiao: 42,\n    huan: 1, huanKuan: 4, maichong: 1,\n    zhucai: \"#FF9667\", di: \"#ffffff\", zi: \"#222222\", cizi: \"#8a8a8a\", xian: \"#ededed\"\n  };\n  const C = 2 * Math.PI * 46;\n\n  function apply() {\n    [\"size\", \"zihao\", \"yuanjiao\", \"huanKuan\"].forEach(k => {\n      document.documentElement.style.setProperty(\"--\" + k, state[k] + \"px\");\n    });\n    [\"zhucai\", \"di\", \"zi\", \"cizi\", \"xian\"].forEach(k => {\n      document.documentElement.style.setProperty(\"--\" + k, state[k]);\n    });\n    document.getElementById(\"num\").innerHTML = state.score + '<small>/' + state.manfen + '</small>';\n    document.getElementById(\"fenmu\").textContent = \"Score \" + state.score + \" of \" + state.manfen;\n    document.getElementById(\"pulse\").classList.toggle(\"hidden\", !state.maichong);\n    const ring = document.getElementById(\"ring\");\n    ring.classList.toggle(\"hidden\", !state.huan);\n    const pct = Math.max(0, Math.min(1, state.score / state.manfen));\n    document.getElementById(\"fg\").setAttribute(\"stroke-dasharray\", (C * pct) + \" \" + C);\n  }\n  window.addEventListener(\"message\", e => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n<\/script>\n</body>\n</html>\n"
  },
  {
    id: "aw02",
    标题: "陈列网格",
    分类: "布局骨架",
    子类: "卡片墙",
    风格: ["极简","信息型"],
    场景: ["官网·品牌站","作品集·叙事","内容·阅读"],
    元素: ["构成","布局","视觉"],
    搭配: ["亲密性功能分组"],
    标签: ["网格","画廊","退让底色","作品墙"],
    来源: "网站拆解：Awwwards（awwwards.com）首页 Latest 作品网格，2026-09-14 抓取分析（浅底 #fff/#f8f8f8 + 灰阶分隔线 #ededed + 正文 #222）；结构、配色取自其 CSS 变量，代码自写",
    效果演示: "assets/demos/aw02-陈列网格.html",
    参数: [{"键":"lie","名":"列数","类型":"slider","最小":2,"最大":6,"步长":1,"默认":4},{"键":"bili","名":"缩略图比例(0四比三/1十六比九/2正方/3竖版)","类型":"slider","最小":0,"最大":3,"步长":1,"默认":0},{"键":"jianju","名":"间距(px)","类型":"slider","最小":8,"最大":48,"步长":2,"默认":18},{"键":"yuanjiao","名":"圆角(px)","类型":"slider","最小":0,"最大":24,"步长":1,"默认":6},{"键":"baohedu","名":"作品图饱和度(%)","类型":"slider","最小":20,"最大":160,"步长":5,"默认":100},{"键":"taisheng","名":"悬停抬升(px)","类型":"slider","最小":0,"最大":24,"步长":1,"默认":6},{"键":"yinying","名":"阴影强度","类型":"slider","最小":0,"最大":60,"步长":2,"默认":18},{"键":"zhucai","名":"强调色(首条标题)","类型":"color","默认":"#FF9667"},{"键":"di","名":"页面底色","类型":"color","默认":"#f8f8f8"},{"键":"xian","名":"分隔线色","类型":"color","默认":"#ededed"},{"键":"zi","名":"正文色","类型":"color","默认":"#222222"},{"键":"cizi","名":"次要字色","类型":"color","默认":"#8a8a8a"}],
    效果说明: "构图笔记：这一屏的内容是几百张别人做的彩色图，所以版式的全部工作只剩一件事——**让底退让**。\nAwwwards 的做法：浅灰底（#f8f8f8）+ 灰阶分隔线 + 等高对齐的缩略图，卡片不加边框不描边，只有首条标题带强调色，其余全灰阶；鼠标经过时整体上抬一点点，其余不变。\n能怎么改：拖「页面底色」往暖灰或深色走，再看整墙作品——颜色立刻发脏、分辨率像掉了一档，这就是「底色抢了内容的位置」；把「作品图饱和度」拉到 40% 效果更明显。反过来也就懂了：陈列型站点的浅底不是审美偏好，是功能刚需。另外拖「列数」看密度、「缩略图比例」切横版竖版、「悬停抬升」决定有没有手感。",
    用法: "网格用 grid repeat(N,1fr) + aspect-ratio 锁比例，缩略图用 filter:saturate() 单拎出来调；列数、比例变化时重建 DOM。卡片之间不用分隔线，靠间距分组（亲密性）。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：一屏作品网格，等高缩略图 + 标题 + 一行小字，浅灰底、灰阶分隔线、首条标题带强调色，悬停时卡片整体上抬；底色必须退让，不与内容抢。\n用法示例：作品集、画廊、榜单、目录型首页——凡是「内容是别人做的一堆图」的页面。\n关键参数：lie 列数 4（2–6）／ bili 缩略图比例 0（0四比三/1十六比九/2正方/3竖版）／ jianju 间距 18px（8–48）／ yuanjiao 圆角 6px（0–24）／ baohedu 作品图饱和度 100%（20–160）／ taisheng 悬停抬升 6px（0–24）／ yinying 阴影 18（0–60）／ zhucai 强调色 #FF9667 ／ di 页面底色 #f8f8f8 ／ xian 分隔线色 #ededed ／ zi 正文色 #222222 ／ cizi 次要字色 #8a8a8a\n集成步骤：复制 assets/demos/aw02-陈列网格.html；grid-template-columns:repeat(var(--lie),1fr)，缩略图 aspect-ratio 走变量，filter:saturate 单独挂在缩略图上；强调色只给首条，别给每张卡。",
    复用记录: "",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>陈列网格演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n    background: var(--di); color: var(--zi);\n    min-height: 100vh; padding: 28px 22px;\n  }\n  .head {\n    display: flex; align-items: baseline; justify-content: space-between;\n    padding-bottom: 10px; margin-bottom: var(--jianju);\n    border-bottom: 1px solid var(--xian);\n  }\n  .head h3 { font-size: 15px; font-weight: 800; letter-spacing: -.2px; }\n  .head span { font-size: 12px; color: var(--cizi); }\n\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(var(--lie), 1fr);\n    gap: var(--jianju);\n  }\n  .cell { cursor: pointer; }\n  .thumb {\n    width: 100%;\n    aspect-ratio: var(--bili);\n    border-radius: var(--yuanjiao);\n    background: var(--pic);\n    /* 饱和度单独拎出来：底色一乱或饱和度一降，整墙作品立刻发脏 */\n    filter: saturate(calc(var(--baohedu) / 100));\n    box-shadow: 0 calc(var(--yinying) * 0.1px) calc(var(--yinying) * 0.4px) rgba(0,0,0,.10);\n    transition: transform .22s ease, box-shadow .22s ease;\n  }\n  .cell:hover .thumb {\n    transform: translateY(calc(var(--taisheng) * -1));\n    box-shadow: 0 calc(var(--yinying) * 0.25px) calc(var(--yinying) * 0.9px) rgba(0,0,0,.18);\n  }\n  .cell .t { margin-top: 8px; font-size: 13px; font-weight: 700; letter-spacing: -.2px; }\n  .cell .m { margin-top: 3px; font-size: 11.5px; color: var(--cizi); }\n  .cell.king .t { color: var(--zhucai); }\n</style>\n</head>\n<body>\n<div class=\"head\"><h3>Latest</h3><span id=\"count\"></span></div>\n<div class=\"grid\" id=\"grid\"></div>\n\n<script>\n  const state = {\n    lie: 4, bili: 0, jianju: 18, yuanjiao: 6,\n    baohedu: 100, taisheng: 6, yinying: 18,\n    zhucai: \"#FF9667\", di: \"#f8f8f8\", xian: \"#ededed\", zi: \"#222222\", cizi: \"#8a8a8a\"\n  };\n  const RATIO = [\"4 / 3\", \"16 / 9\", \"1 / 1\", \"3 / 4\"];\n  const PIC = [\n    \"linear-gradient(135deg,#FF9667,#FFD2A8)\",\n    \"linear-gradient(140deg,#5E6AD2,#9AA0F0)\",\n    \"linear-gradient(125deg,#12B981,#8FE3C4)\",\n    \"linear-gradient(150deg,#111827,#4B5563)\",\n    \"linear-gradient(135deg,#E1306C,#FCA5C8)\",\n    \"linear-gradient(120deg,#0EA5E9,#A5E8FF)\",\n    \"linear-gradient(145deg,#F59E0B,#FCD34D)\",\n    \"linear-gradient(135deg,#7C3AED,#C4B5FD)\"\n  ];\n  const DATA = [\n    { t: \"Thoma Lecornu\", m: \"Portfolio\" },\n    { t: \"EMO® — Altar II\", m: \"Electronic Materials Office®\" },\n    { t: \"Readymag WOTY 2026\", m: \"Website of the Year\" },\n    { t: \"STANZZA design\", m: \"ADELT Agency\" },\n    { t: \"Site of the Day\", m: \"Awards\" },\n    { t: \"Nominees\", m: \"Gallery\" },\n    { t: \"Collections\", m: \"Directory\" },\n    { t: \"Submit your site\", m: \"Get judged\" }\n  ];\n\n  function build() {\n    const grid = document.getElementById(\"grid\");\n    grid.innerHTML = \"\";\n    DATA.forEach((d, i) => {\n      const cell = document.createElement(\"a\");\n      cell.className = \"cell\" + (i === 0 ? \" king\" : \"\");\n      const th = document.createElement(\"div\");\n      th.className = \"thumb\";\n      th.style.setProperty(\"--pic\", PIC[i % PIC.length]);\n      const t = document.createElement(\"div\"); t.className = \"t\"; t.textContent = d.t;\n      const m = document.createElement(\"div\"); m.className = \"m\"; m.textContent = d.m;\n      cell.append(th, t, m);\n      grid.appendChild(cell);\n    });\n    document.getElementById(\"count\").textContent = DATA.length + \" sites · \" + state.lie + \" 列\";\n  }\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--lie\", state.lie);\n    r.setProperty(\"--bili\", RATIO[state.bili] || RATIO[0]);\n    r.setProperty(\"--baohedu\", state.baohedu);\n    r.setProperty(\"--jianju\", state.jianju + \"px\");\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    r.setProperty(\"--taisheng\", state.taisheng + \"px\");\n    r.setProperty(\"--yinying\", state.yinying);\n    [\"zhucai\", \"di\", \"xian\", \"zi\", \"cizi\"].forEach(k => r.setProperty(\"--\" + k, state[k]));\n    build();\n  }\n  window.addEventListener(\"message\", e => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n<\/script>\n</body>\n</html>\n"
  },
  {
    id: "aw03",
    标题: "陈列首屏",
    分类: "布局骨架",
    子类: "首屏Hero",
    风格: ["信息型","极简"],
    场景: ["官网·品牌站","作品集·叙事"],
    元素: ["构成","布局","视觉"],
    搭配: ["英雄区大字号排版"],
    标签: ["首屏","陈列型","视觉层级","三跳"],
    来源: "网站拆解：Awwwards（awwwards.com）首屏 Site of the Day 区块，2026-09-14 抓取分析（当日作品「Léo Parpeix - Portfolio 2026」评分 7.69/10）；布局与配色取自其 CSS 变量，代码自写",
    效果演示: "assets/demos/aw03-陈列首屏.html",
    参数: [{"键":"datu","名":"大图占屏高(%)","类型":"slider","最小":30,"最大":80,"步长":1,"默认":44},{"键":"liubai","名":"页边距(px)","类型":"slider","最小":0,"最大":120,"步长":2,"默认":40},{"键":"zihao","名":"标题字号(px)","类型":"slider","最小":18,"最大":64,"步长":1,"默认":34},{"键":"jianju","名":"段间距(px)","类型":"slider","最小":4,"最大":48,"步长":1,"默认":16},{"键":"yuanjiao","名":"圆角(px)","类型":"slider","最小":0,"最大":24,"步长":1,"默认":8},{"键":"shunxu","名":"焦点顺序(0图先/1标题先)","类型":"slider","最小":0,"最大":1,"步长":1,"默认":0},{"键":"fangxiang","名":"排版(0上下/1左右)","类型":"slider","最小":0,"最大":1,"步长":1,"默认":0},{"键":"xianshi","名":"评分徽章(0关/1开)","类型":"slider","最小":0,"最大":1,"步长":1,"默认":1},{"键":"zhucai","名":"强调色(那 10%)","类型":"color","默认":"#FF9667"},{"键":"di","名":"页面底色","类型":"color","默认":"#ffffff"},{"键":"zi","名":"正文色","类型":"color","默认":"#222222"},{"键":"hui","名":"次级灰","类型":"color","默认":"#8a8a8a"}],
    效果说明: "第四种首屏范式：Apple 是信息型（卖参数）、OpenAI 是焦点型（给入口）、Linear 是定义型（先下定义），Awwwards 这种叫**陈列型**——首屏不说自己是干什么的，直接把最好的一件作品挂出来，标题和评分只负责给它做注脚。\n层级只有三跳：大图（面积最大，第一焦点）→ 橙色评分徽章（唯一暖色，第二焦点）→ 下方的 Latest 网格（行动层）。\n能怎么改：拖「焦点顺序」把标题挪到大图上面，立刻从「作品当门面」变成「目录先看名录」——同一套元素换次秩序，站点的性格就变了；「大图占屏高」决定它有多强势（44% 上下是甜点区，超过 70% 标题就没地方站了），「排版」切上下分栏 vs 左右分栏。",
    用法: "首屏 = 一个大图容器 + 一个信息行（标题 + 徽章）。谁在前由 flex/grid order 控制，不用改结构；次级信息一律灰阶，橙色只给徽章。",
    提示词: "给 AI 的提示词（直接复制）：\n效果：陈列型首屏——上方大作品图占整屏 55–60%，下方同一行放标题与橙色评分徽章，再下方是作品网格；视觉层级三跳：图 → 徽章 → 网格。\n用法示例：作品集、画廊、榜单站的首屏；也适合「今天推荐」「本周最佳」这类每天换内容的栏目页。\n关键参数：datu 大图占屏高 44%（30–80）／ liubai 页边距 40px（0–120）／ zihao 标题字号 34px（18–64）／ jianju 段间距 16px（4–48）／ yuanjiao 圆角 8px（0–24）／ shunxu 焦点顺序 0（0图先/1标题先）／ fangxiang 排版 0（0上下/1左右）／ xianshi 评分徽章 1（0关/1开）／ zhucai 强调色 #FF9667 ／ di 页面底色 #ffffff ／ zi 正文色 #222222 ／ hui 次级灰 #8a8a8a\n集成步骤：复制 assets/demos/aw03-陈列首屏.html；大图容器给 min-height:44vh，标题行与徽章同排用 flex align-items:center；顺序切换用 order:-1，别改 DOM 结构；强调色只给徽章。",
    复用记录: "",
    代码: "<!DOCTYPE html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>陈列首屏演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n    background: var(--di); color: var(--zi);\n    min-height: 100vh; padding: var(--liubai);\n    display: flex; flex-direction: column; gap: var(--jianju);\n  }\n  .kicker { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--hui); }\n  .hero {\n    display: grid; gap: var(--jianju);\n    grid-template-columns: 1fr;\n  }\n  .shot {\n    min-height: calc(var(--datu) * 1vh);\n    border-radius: var(--yuanjiao);\n    background:\n      radial-gradient(circle at 22% 28%, rgba(255,255,255,.55), transparent 42%),\n      linear-gradient(135deg, #5E6AD2 0%, #FF9667 55%, #FFD2A8 100%);\n    box-shadow: 0 10px 34px rgba(0,0,0,.12);\n    display: flex; align-items: flex-end; padding: 14px;\n  }\n  .shot .tagline { font-size: 12px; font-weight: 800; color: #fff; letter-spacing: .04em; }\n  .info { display: flex; align-items: center; gap: 14px; }\n  .info h1 { font-size: var(--zihao); font-weight: 800; letter-spacing: -.8px; line-height: 1.1; }\n  .info .sub { margin-top: 6px; font-size: 12.5px; color: var(--hui); }\n  .badge {\n    flex: none; padding: 10px 14px; border-radius: 999px;\n    background: var(--zhucai); color: #fff;\n    font-size: 15px; font-weight: 800; white-space: nowrap;\n  }\n  .grid-hint { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }\n  .grid-hint i { display: block; height: 34px; border-radius: calc(var(--yuanjiao) * 0.6); background: color-mix(in srgb, var(--zi) 8%, transparent); }\n  .hidden { display: none !important; }\n\n  body[data-fangxiang=\"1\"] .hero { grid-template-columns: 1.25fr .75fr; align-items: center; }\n  /* 陈列型的层级可切换：作品当门面时图在前，作品当目录时标题先立住 */\n  body[data-shunxu=\"1\"] .hero > .info { order: -1; }\n</style>\n</head>\n<body data-fangxiang=\"0\" data-shunxu=\"0\">\n  <div class=\"kicker\">Site of the Day · Sep 14, 2026</div>\n  <div class=\"hero\">\n    <div class=\"shot\"><span class=\"tagline\">第一焦点 · 当日最佳作品</span></div>\n    <div class=\"info\">\n      <div>\n        <h1>Léo Parpeix - Portfolio 2026</h1>\n        <div class=\"sub\">第二焦点 · 评分徽章 + 日期，其余信息做灰阶退让</div>\n      </div>\n      <div class=\"badge\" id=\"badge\">7.69 / 10</div>\n    </div>\n  </div>\n  <div class=\"grid-hint\"><i></i><i></i><i></i><i></i></div>\n</body>\n<script>\n  const state = {\n    datu: 44, liubai: 40, zihao: 34, jianju: 16, yuanjiao: 8,\n    shunxu: 0, fangxiang: 0, xianshi: 1,\n    zhucai: \"#FF9667\", di: \"#ffffff\", zi: \"#222222\", hui: \"#8a8a8a\"\n  };\n  function apply() {\n    const r = document.documentElement.style;\n    r.setProperty(\"--datu\", state.datu);\n    r.setProperty(\"--liubai\", state.liubai + \"px\");\n    r.setProperty(\"--zihao\", state.zihao + \"px\");\n    r.setProperty(\"--jianju\", state.jianju + \"px\");\n    r.setProperty(\"--yuanjiao\", state.yuanjiao + \"px\");\n    [\"zhucai\", \"di\", \"zi\", \"hui\"].forEach(k => r.setProperty(\"--\" + k, state[k]));\n    document.body.dataset.fangxiang = state.fangxiang;\n    document.body.dataset.shunxu = state.shunxu;\n    document.getElementById(\"badge\").classList.toggle(\"hidden\", !state.xianshi);\n  }\n  window.addEventListener(\"message\", e => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n<\/script>\n</html>\n"
  },
  {
    id: "v188",
    标题: "过冲锁定进度",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简", "通用"],
    场景: ["全站通用", "工具·SaaS"],
    元素: ["动效", "反馈"],
    搭配: ["明确进度", "数字滚动"],
    标签: ["进度条", "过冲", "锁定", "加载", "反馈"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/过冲锁定进度.html",
    参数: [
      {
        键: "dur",
        名: "转满时长（秒）",
        类型: "slider",
        最小: 0.5,
        最大: 4,
        步长: 0.1,
        默认: 1.8
      },
      {
        键: "overshoot",
        名: "过冲幅度（%）",
        类型: "slider",
        最小: 0,
        最大: 25,
        步长: 1,
        默认: 12
      },
      {
        键: "thick",
        名: "条高（px）",
        类型: "slider",
        最小: 4,
        最大: 28,
        步长: 1,
        默认: 12
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 999
      },
      {
        键: "color",
        名: "主色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "track",
        名: "轨道色",
        类型: "color",
        默认: "#eee"
      },
      {
        键: "lock",
        名: "锁定弹动",
        类型: "switch",
        默认: true
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
        最大: 40,
        步长: 1,
        默认: 22
      },
      {
        键: "ease",
        名: "缓动（过冲/平滑/匀速）",
        类型: "select",
        选项: ["easeOutBack", "easeOutCubic", "linear"],
        默认: "easeOutBack"
      }
    ],
    效果说明: "构图笔记：真实感来自\"到位\"的那一下——进度到 100% 不要戛然而止，过冲一点再弹回来锁住，用户才确信真的完成了。\n直线进度条填充到满，会先冲过 100% 一点点、再回弹锁定，配合整条轻微一颤，像被\"卡到位\"。\n能怎么改：拖滑杆调「转满时长（秒）、过冲幅度（%）、条高（px）」即可实时改观，换风格改 CSS 主色与字号；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调转满时长、过冲幅度、条高、圆角，点色块换主色；缓动选 easeOutBack 才有过冲，切 linear 就变匀速直条。",
    提示词: "帮我做一个\"过冲锁定进度\"（纯 HTML/CSS/JS）：\n效果：直线进度条填充到 100% 时先小幅过冲、再回弹锁定，整条轻微弹动一下确认到位。\n用法示例：\n.fill { width: 0%; }\n// 用 easeOutBack 让进度先冲过 1.0 再回落到 1.0，到位后整条 scaleX(1.04) 弹一下\n关键参数：\n- dur 转满时长 / overshoot 过冲幅度 / thick 条高 / radius 圆角 / color 主色 / track 轨道色 / lock 锁定弹动 / showPct 显示百分比 / pctSize 百分比字号 / ease 缓动\n集成步骤：\n1. 复制 assets/demos/过冲锁定进度.html 的 CSS 与 JS\n2. 用 easeOutBack 算宽度，别用 linear（会没有过冲）\n3. 到位后给轨道加一段 scaleX 回弹，强化\"锁定\"感",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>过冲锁定进度演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .pct {\n    font-size: var(--pctSize, 22px); font-weight: 800; font-variant-numeric: tabular-nums;\n    color: var(--color, #1a1a1a);\n  }\n  .track {\n    position: relative; width: min(70vw, 420px); height: var(--thick, 12px);\n    background: var(--track, #eee); border-radius: var(--radius, 999px);\n    overflow: visible;\n  }\n  .fill {\n    position: absolute; left: 0; top: 0; height: 100%;\n    width: 0%; background: var(--color, #1a1a1a);\n    border-radius: inherit; transform-origin: center;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"pct\" id=\"pct\">0%</div>\n<div class=\"track\"><div class=\"fill\" id=\"fill\"></div></div>\n<button class=\"btn\" id=\"btn\">重新播放</button>\n\n<script>\n  const state = {\n    dur: 1.8,\n    overshoot: 12,\n    thick: 12,\n    radius: 999,\n    color: \"#1a1a1a\",\n    track: \"#eee\",\n    lock: true,\n    showPct: true,\n    pctSize: 22,\n    ease: \"easeOutBack\"\n  };\n  const fill = document.getElementById(\"fill\");\n  const pct = document.getElementById(\"pct\");\n  const track = document.querySelector(\".track\");\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    pct.style.display = state.showPct ? \"block\" : \"none\";\n  }\n\n  function ease(t) {\n    if (state.ease === \"linear\") return t;\n    if (state.ease === \"easeOutCubic\") return 1 - Math.pow(1 - t, 3);\n    // easeOutBack：先冲过 100% 再回落，过冲幅度由 overshoot 控制\n    const s = Math.max(state.overshoot, 0) / 100 * 2.2 + 1.2;\n    const c = s - 1;\n    return 1 + c * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    fill.style.width = \"0%\";\n    pct.textContent = \"0%\";\n    const start = performance.now();\n    const dur = Math.max(state.dur, 0.1) * 1000;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const p = ease(t);\n      const shown = Math.max(0, Math.min(p, 1.12)); // 允许短暂过冲可见\n      fill.style.width = (shown * 100) + \"%\";\n      pct.textContent = Math.round(Math.min(Math.max(p, 0), 1) * 100) + \"%\";\n      if (t < 1) { raf = requestAnimationFrame(tick); }\n      else { settle(); }\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  function settle() {\n    fill.style.width = \"100%\";\n    pct.textContent = \"100%\";\n    if (state.lock) {\n      // 锁定弹动：整条轻微回弹一下，确认\"到位\"\n      track.style.transition = \"transform .18s cubic-bezier(.34,1.56,.64,1)\";\n      track.style.transform = \"scaleX(1.04)\";\n      setTimeout(() => { track.style.transform = \"scaleX(1)\"; }, 180);\n    }\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"dur\",\"overshoot\",\"ease\",\"lock\",\"showPct\",\"pctSize\",\"color\",\"track\",\"thick\",\"radius\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v189",
    标题: "过冲闭合环",
    分类: "组件",
    子类: "进度加载",
    风格: ["科技"],
    场景: ["后台·数据看板"],
    元素: ["动效", "视觉"],
    搭配: ["数字滚动", "环形进度"],
    标签: ["进度环", "过冲", "闭合", "百分比", "加载"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/过冲闭合环.html",
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
        名: "缓动（过冲/平滑/匀速）",
        类型: "select",
        选项: ["easeOutBack", "easeOut", "linear"],
        默认: "easeOutBack"
      },
      {
        键: "size",
        名: "环直径（px）",
        类型: "slider",
        最小: 80,
        最大: 220,
        步长: 4,
        默认: 140
      },
      {
        键: "thick",
        名: "环线粗细（px）",
        类型: "slider",
        最小: 3,
        最大: 24,
        步长: 1,
        默认: 12
      },
      {
        键: "cap",
        名: "端点形状（圆头/平头）",
        类型: "select",
        选项: ["round", "butt"],
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
        键: "overshoot",
        名: "过冲幅度（%）",
        类型: "slider",
        最小: 0,
        最大: 25,
        步长: 1,
        默认: 10
      },
      {
        键: "lockBounce",
        名: "锁定弹动",
        类型: "switch",
        默认: true
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
        默认: 26
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
        默认: "#1a1a1a"
      },
      {
        键: "track",
        名: "轨道底色",
        类型: "color",
        默认: "#eee"
      }
    ],
    效果说明: "构图笔记：环比直条更需要\"闭合\"的仪式感——描边转满的那一刻如果平顺停住太冷淡，过冲再回弹一下才像真的合拢。\n圆环描边转到 100% 会先冲过一点点、回弹锁定，整环轻微放大一颤，中心百分比同步到位。\n能怎么改：拖滑杆调「转满时长（秒）、环直径（px）、环线粗细（px）」即可实时改观，换风格改 CSS 主色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调转满时长、环大小、环粗细，点色块换主色；缓动选 easeOutBack 才有过冲闭合，切 easeOut 就是平滑直转。",
    提示词: "帮我做一个\"过冲闭合环\"（纯 HTML/CSS/JS + SVG）：\n效果：圆环描边转满 100% 时先过冲、再回弹锁定，整环轻微放大，中心显示百分比。\n用法示例：\n<circle class=\"ring\" r=\"58\"></circle>\n// stroke-dashoffset 用 easeOutBack 先冲过再回落，到位后整环 transform scale(1.06) 弹一下\n关键参数：\n- dur 转满时长 / easing 缓动 / size 环直径 / thick 环线粗细 / cap 端点形状 / rot 起点旋转 / overshoot 过冲幅度 / lockBounce 锁定弹动 / showPct 显示百分比 / pctSize 百分比字号 / glow 环是否发光 / color 环主色 / track 轨道底色\n集成步骤：\n1. 复制 assets/demos/过冲闭合环.html 的 SVG 与 JS\n2. 用 easeOutBack 算 dashoffset，环粗细大时要同步缩半径\n3. 到位后给外环容器加 scale 回弹",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>过冲闭合环演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .ring-wrap { position: relative; width: var(--size, 140px); height: var(--size, 140px); transform-origin: center; }\n  .ring-track { fill: none; stroke: var(--track, #eee); stroke-width: var(--thick, 12); }\n  .ring {\n    fill: none; stroke: var(--color, #1a1a1a); stroke-width: var(--thick, 12);\n    stroke-linecap: var(--cap, round);\n    transform: rotate(var(--rot, -90deg)); transform-origin: center;\n    filter: drop-shadow(var(--glow, 0 0 0 transparent));\n  }\n  .ring-pct {\n    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;\n    font-size: var(--pctSize, 26px); font-weight: 800; font-variant-numeric: tabular-nums;\n    color: var(--color, #1a1a1a);\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"ring-wrap\" id=\"wrap\">\n  <svg viewBox=\"0 0 140 140\" id=\"svg\">\n    <circle class=\"ring-track\" id=\"ringTrack\" cx=\"70\" cy=\"70\" r=\"58\"></circle>\n    <circle class=\"ring\" id=\"ring\" cx=\"70\" cy=\"70\" r=\"58\"></circle>\n  </svg>\n  <div class=\"ring-pct\" id=\"pct\">0%</div>\n</div>\n<button class=\"btn\" id=\"btn\">重新转</button>\n\n<script>\n  const state = {\n    dur: 2,\n    easing: \"easeOutBack\",\n    size: 140,\n    thick: 12,\n    cap: \"round\",\n    rot: -90,\n    overshoot: 10,\n    lockBounce: true,\n    showPct: true,\n    pctSize: 26,\n    glow: false,\n    color: \"#1a1a1a\",\n    track: \"#eee\"\n  };\n  const ring = document.getElementById(\"ring\");\n  const ringTrack = document.getElementById(\"ringTrack\");\n  const pct = document.getElementById(\"pct\");\n  const wrap = document.getElementById(\"wrap\");\n  const svg = document.getElementById(\"svg\");\n\n  function ease(t) {\n    if (state.easing === \"linear\") return t;\n    if (state.easing === \"easeOut\") return 1 - Math.pow(1 - t, 3);\n    const s = Math.max(state.overshoot, 0) / 100 * 2.2 + 1.2;\n    const c = s - 1;\n    return 1 + c * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--size\", state.size + \"px\");\n    root.style.setProperty(\"--cap\", state.cap === \"butt\" ? \"butt\" : \"round\");\n    root.style.setProperty(\"--rot\", state.rot + \"deg\");\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    root.style.setProperty(\"--glow\", state.glow ? (\"0 0 6px \" + state.color + \"88\") : \"0 0 0 transparent\");\n    pct.style.display = state.showPct ? \"flex\" : \"none\";\n    svg.setAttribute(\"width\", state.size);\n    svg.setAttribute(\"height\", state.size);\n    const r = 58 - Math.min(state.thick / 2, 10);\n    ring.setAttribute(\"r\", r);\n    ringTrack.setAttribute(\"r\", r);\n    circ = 2 * Math.PI * r;\n    ring.style.strokeDasharray = circ;\n    ring.style.strokeDashoffset = circ;\n    pct.textContent = \"0%\";\n  }\n  let circ = 2 * Math.PI * 58;\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    applyStyle();\n    const start = performance.now();\n    const dur = Math.max(state.dur, 0.1) * 1000;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const p = Math.max(0, Math.min(ease(t), 1.1));\n      ring.style.strokeDashoffset = circ * (1 - Math.min(p, 1));\n      pct.textContent = Math.round(Math.min(Math.max(ease(t), 0), 1) * 100) + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n      else settle();\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  function settle() {\n    ring.style.strokeDashoffset = 0;\n    pct.textContent = \"100%\";\n    if (state.lockBounce) {\n      wrap.style.transition = \"transform .22s cubic-bezier(.34,1.56,.64,1)\";\n      wrap.style.transform = \"scale(1.06)\";\n      setTimeout(() => { wrap.style.transform = \"scale(1)\"; }, 220);\n    }\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"dur\",\"easing\",\"size\",\"thick\",\"cap\",\"rot\",\"overshoot\",\"lockBounce\",\"showPct\",\"pctSize\",\"glow\",\"color\",\"track\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v190",
    标题: "节点点亮进度",
    分类: "组件",
    子类: "进度加载",
    风格: ["通用"],
    场景: ["工具·SaaS", "后台·数据看板"],
    元素: ["动效", "视觉"],
    搭配: ["分步进度反馈", "数字滚动"],
    标签: ["节点", "步骤", "点亮", "卡顿", "加载"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/节点点亮进度.html",
    参数: [
      {
        键: "nodes",
        名: "节点数",
        类型: "slider",
        最小: 3,
        最大: 12,
        步长: 1,
        默认: 6
      },
      {
        键: "dur",
        名: "总时长（秒）",
        类型: "slider",
        最小: 1,
        最大: 8,
        步长: 0.1,
        默认: 4
      },
      {
        键: "stutter",
        名: "卡顿节点（第几个，0=无）",
        类型: "slider",
        最小: 0,
        最大: 12,
        步长: 1,
        默认: 4
      },
      {
        键: "stutterPause",
        名: "卡顿停留（秒）",
        类型: "slider",
        最小: 0,
        最大: 3,
        步长: 0.1,
        默认: 1.2
      },
      {
        键: "nodeSize",
        名: "节点直径（px）",
        类型: "slider",
        最小: 8,
        最大: 28,
        步长: 1,
        默认: 16
      },
      {
        键: "gap",
        名: "间距（px）",
        类型: "slider",
        最小: 10,
        最大: 60,
        步长: 1,
        默认: 28
      },
      {
        键: "activeColor",
        名: "已亮色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "pendingColor",
        名: "未亮色",
        类型: "color",
        默认: "#eee"
      },
      {
        键: "trackLine",
        名: "连线色",
        类型: "color",
        默认: "#e5e7eb"
      },
      {
        键: "showLabel",
        名: "显示节点序号",
        类型: "switch",
        默认: false
      }
    ],
    效果说明: "构图笔记：过程不是一条匀速线，卡在哪一步用户最关心——把进度拆成节点，谁亮了、谁卡住一眼可见。\n一排节点依次点亮表示推进，到指定节点故意多停一会儿，把\"卡顿位置\"直接暴露出来，而不是藏进一条平滑条。\n能怎么改：拖滑杆调「节点数、总时长（秒）、卡顿节点、卡顿停留（秒）」即可实时改观，点色块换已亮/未亮色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调节点数、总时长、卡顿节点和停留时长，点色块换已亮/未亮色；卡顿节点设 0 就匀速无卡顿。",
    提示词: "帮我做一个\"节点点亮进度\"（纯 HTML/CSS/JS）：\n效果：一排圆点依次点亮表示推进，到指定节点多停一会儿暴露卡顿位置。\n用法示例：\n.node.on { background: var(--active); transform: scale(1.12); }\n// 按 dur/nodes 排程 setTimeout 点亮，卡顿节点额外加 stutterPause 延迟\n关键参数：\n- nodes 节点数 / dur 总时长 / stutter 卡顿节点 / stutterPause 卡顿停留 / nodeSize 节点直径 / gap 间距 / activeColor 已亮色 / pendingColor 未亮色 / trackLine 连线色 / showLabel 显示节点序号\n集成步骤：\n1. 复制 assets/demos/节点点亮进度.html 的节点生成与排程\n2. 节点数变了要重建 DOM 再点亮\n3. 卡顿节点用额外 setTimeout 延迟，别并进修正常节奏",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>节点点亮进度演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .nodes { display: flex; align-items: center; }\n  .seg { display: flex; align-items: center; }\n  .node {\n    width: var(--nodeSize, 16px); height: var(--nodeSize, 16px); border-radius: 50%;\n    background: var(--pending, #eee); flex: none; transition: background .25s ease, transform .25s ease;\n  }\n  .node.on { background: var(--active, #2563eb); transform: scale(1.12); }\n  .link {\n    width: var(--gap, 28px); height: 3px; background: var(--trackLine, #e5e7eb); flex: none;\n    transition: background .25s ease;\n  }\n  .link.on { background: var(--active, #2563eb); }\n  .node .lbl {\n    position: absolute; transform: translate(-50%, 22px); font-size: 11px; color: #999; display: none;\n  }\n  .wrap { position: relative; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"nodes\" id=\"nodes\"></div>\n<button class=\"btn\" id=\"btn\">重新点亮</button>\n\n<script>\n  const state = {\n    nodes: 6,\n    dur: 4,\n    stutter: 4,\n    stutterPause: 1.2,\n    nodeSize: 16,\n    gap: 28,\n    activeColor: \"#2563eb\",\n    pendingColor: \"#eee\",\n    trackLine: \"#e5e7eb\",\n    showLabel: false\n  };\n  const nodesEl = document.getElementById(\"nodes\");\n  let timers = [];\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--nodeSize\", state.nodeSize + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--active\", state.activeColor);\n    root.style.setProperty(\"--pending\", state.pendingColor);\n    root.style.setProperty(\"--trackLine\", state.trackLine);\n    build();\n  }\n\n  function build() {\n    timers.forEach(clearTimeout); timers = [];\n    nodesEl.innerHTML = \"\";\n    const n = Math.max(2, Math.round(state.nodes));\n    for (let i = 0; i < n; i++) {\n      const seg = document.createElement(\"div\");\n      seg.className = \"seg\";\n      const node = document.createElement(\"div\");\n      node.className = \"node\"; node.dataset.i = i;\n      if (state.showLabel) {\n        const lbl = document.createElement(\"span\");\n        lbl.className = \"lbl\"; lbl.textContent = i + 1; lbl.style.display = \"block\";\n        node.appendChild(lbl);\n      }\n      seg.appendChild(node);\n      if (i < n - 1) {\n        const link = document.createElement(\"div\");\n        link.className = \"link\"; link.dataset.i = i;\n        seg.appendChild(link);\n      }\n      nodesEl.appendChild(seg);\n    }\n  }\n\n  function run() {\n    timers.forEach(clearTimeout); timers = [];\n    build();\n    const n = Math.max(2, Math.round(state.nodes));\n    const step = (Math.max(state.dur, 0.3) * 1000) / n;\n    const stutterIdx = Math.round(state.stutter);\n    for (let i = 0; i < n; i++) {\n      let delay = (i + 1) * step;\n      if (stutterIdx > 0 && i === stutterIdx) delay += state.stutterPause * 1000; // 在此节点停留，暴露卡顿位置\n      const t = setTimeout(() => {\n        const node = nodesEl.querySelector('.node[data-i=\"' + i + '\"]');\n        if (node) node.classList.add(\"on\");\n        const link = nodesEl.querySelector('.link[data-i=\"' + i + '\"]');\n        if (link) link.classList.add(\"on\");\n      }, delay);\n      timers.push(t);\n    }\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"nodes\",\"dur\",\"stutter\",\"stutterPause\",\"nodeSize\",\"gap\",\"activeColor\",\"pendingColor\",\"trackLine\",\"showLabel\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v191",
    标题: "连接光带",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简"],
    场景: ["全站通用"],
    元素: ["动效"],
    搭配: ["模糊进度", "页面加载"],
    标签: ["不确定进度", "连接", "等待", "光带", "加载"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/连接光带.html",
    参数: [
      {
        键: "speed",
        名: "游走速度（秒/圈）",
        类型: "slider",
        最小: 0.6,
        最大: 4,
        步长: 0.1,
        默认: 1.6
      },
      {
        键: "bandW",
        名: "光带宽度（%）",
        类型: "slider",
        最小: 10,
        最大: 60,
        步长: 1,
        默认: 35
      },
      {
        键: "thick",
        名: "条高（px）",
        类型: "slider",
        最小: 2,
        最大: 16,
        步长: 1,
        默认: 6
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 20,
        步长: 1,
        默认: 999
      },
      {
        键: "color",
        名: "光带色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "track",
        名: "轨道色",
        类型: "color",
        默认: "#eef2ff"
      },
      {
        键: "glow",
        名: "发光",
        类型: "switch",
        默认: true
      },
      {
        键: "dir",
        名: "方向（往返/单向循环）",
        类型: "select",
        选项: ["往返", "单向循环"],
        默认: "往返"
      },
      {
        键: "count",
        名: "光带数量",
        类型: "slider",
        最小: 1,
        最大: 3,
        步长: 1,
        默认: 1
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：连不上的等待最磨人，给一条会游走的亮带，比转圈圈更轻、更像\"在试着连\"。\n一条（或几条）渐变光带在细轨道里来回游走，没有确定进度却消解了\"卡死\"的焦虑，适合连接/握手等待。\n能怎么改：拖滑杆调「游走速度（秒/圈）、光带宽度（%）、条高（px）」即可实时改观，点色块换光带色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调游走速度、光带宽度、条高，点色块换光带色；方向切单向循环就是顺向无缝流。",
    提示词: "帮我做一个\"连接光带\"（纯 HTML/CSS/JS）：\n效果：细轨道里一条渐变光带来回游走，表示连接/握手等待，无确定进度。\n用法示例：\n.band { background: linear-gradient(90deg, transparent, var(--color), transparent); animation: travel var(--speed) linear infinite; }\n// 往返用 animation-direction: alternate，单向循环用 normal\n关键参数：\n- speed 游走速度 / bandW 光带宽度 / thick 条高 / radius 圆角 / color 光带色 / track 轨道色 / glow 发光 / dir 方向 / count 光带数量 / bg 底色\n集成步骤：\n1. 复制 assets/demos/连接光带.html 的轨道与光带动画\n2. 多条光带用 animation-delay 错开\n3. 与 v122 模糊进度区别：这里是单线彗星流，不是多条并行流光",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>连接光带演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: var(--bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .track {\n    position: relative; width: min(70vw, 440px); height: var(--thick, 6px);\n    background: var(--track, #eef2ff); border-radius: var(--radius, 999px); overflow: hidden;\n  }\n  .band {\n    position: absolute; top: 0; left: 0; height: 100%;\n    width: var(--bandW, 35%);\n    background: linear-gradient(90deg, transparent, var(--color, #2563eb), transparent);\n    border-radius: inherit;\n    filter: var(--glow, none);\n    animation: travel var(--speed, 1.6s) linear infinite;\n  }\n  @keyframes travel {\n    from { transform: translateX(-110%); }\n    to { transform: translateX(320%); }\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"track\" id=\"track\"></div>\n<button class=\"btn\" id=\"btn\">重新游走</button>\n\n<script>\n  const state = {\n    speed: 1.6,\n    bandW: 35,\n    thick: 6,\n    radius: 999,\n    color: \"#2563eb\",\n    track: \"#eef2ff\",\n    glow: true,\n    dir: \"往返\",\n    count: 1,\n    bg: \"#ffffff\"\n  };\n  const track = document.getElementById(\"track\");\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--glow\", state.glow ? (\"drop-shadow(0 0 4px \" + state.color + \")\") : \"none\");\n    root.style.setProperty(\"--bandW\", state.bandW + \"%\");\n    root.style.setProperty(\"--speed\", state.speed + \"s\");\n    build();\n  }\n\n  function build() {\n    track.innerHTML = \"\";\n    const c = Math.max(1, Math.round(state.count));\n    for (let i = 0; i < c; i++) {\n      const b = document.createElement(\"div\");\n      b.className = \"band\";\n      // 往返=乒乓；单向循环=顺向无缝\n      b.style.animationDirection = state.dir === \"往返\" ? \"alternate\" : \"normal\";\n      b.style.animationDelay = (i * (state.speed / c)) + \"s\";\n      track.appendChild(b);\n    }\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", build);\n  applyStyle();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v192",
    标题: "双轨下载缓冲",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简", "科技"],
    场景: ["工具·SaaS"],
    元素: ["动效", "反馈"],
    搭配: ["明确进度", "模糊进度"],
    标签: ["下载", "缓冲", "双轨", "进度条", "加载"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/双轨下载缓冲.html",
    参数: [
      {
        键: "dur",
        名: "下载时长（秒）",
        类型: "slider",
        最小: 2,
        最大: 10,
        步长: 0.1,
        默认: 6
      },
      {
        键: "bufferLead",
        名: "缓冲领先（%）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 20
      },
      {
        键: "thick",
        名: "每条高度（px）",
        类型: "slider",
        最小: 4,
        最大: 16,
        步长: 1,
        默认: 8
      },
      {
        键: "gap",
        名: "两轨间距（px）",
        类型: "slider",
        最小: 2,
        最大: 16,
        步长: 1,
        默认: 6
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 12,
        步长: 1,
        默认: 6
      },
      {
        键: "dlColor",
        名: "下载色",
        类型: "color",
        默认: "#16a34a"
      },
      {
        键: "bufColor",
        名: "缓冲色",
        类型: "color",
        默认: "#bbf7d0"
      },
      {
        键: "track",
        名: "轨道色",
        类型: "color",
        默认: "#eee"
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
        最大: 30,
        步长: 1,
        默认: 18
      },
      {
        键: "jitter",
        名: "卡顿抖动",
        类型: "switch",
        默认: false
      }
    ],
    效果说明: "构图笔记：下载和缓冲是两件事，叠在一起用户才懂\"为什么还不动\"——缓冲领先下载，说明网在预取。\n上轨是真实下载进度，下轨是缓冲（始终领先一段），缓冲兜底吸收抖动，下载卡住也不至于白等。\n能怎么改：拖滑杆调「下载时长（秒）、缓冲领先（%）、每条高度（px）」即可实时改观，点色块换下载/缓冲色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调下载时长、缓冲领先幅度、条高，点色块换下载/缓冲色；开卡顿抖动看缓冲怎么兜底。",
    提示词: "帮我做一个\"双轨下载缓冲\"（纯 HTML/CSS/JS）：\n效果：上轨真实下载进度，下轨缓冲始终领先一段，缓冲吸收网络抖动。\n用法示例：\n.dl { width: p%; } .buf { width: min(100, p+lead)% }\n// 下载按 dur 推进，缓冲 = 下载 + bufferLead 并封顶 100%\n关键参数：\n- dur 下载时长 / bufferLead 缓冲领先 / thick 每条高度 / gap 两轨间距 / radius 圆角 / dlColor 下载色 / bufColor 缓冲色 / track 轨道色 / showPct 显示百分比 / pctSize 百分比字号 / jitter 卡顿抖动\n集成步骤：\n1. 复制 assets/demos/双轨下载缓冲.html 的双轨结构\n2. 缓冲 = 下载 + lead，封顶 100%\n3. 开 jitter 时下载步长随机，缓冲仍平滑兜底",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>双轨下载缓冲演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .box { width: min(72vw, 440px); display: flex; flex-direction: column; gap: var(--gap, 6px); }\n  .row { display: flex; align-items: center; gap: 12px; }\n  .bar {\n    position: relative; flex: 1; height: var(--thick, 8px);\n    background: var(--track, #eee); border-radius: var(--radius, 6px); overflow: hidden;\n  }\n  .fill { position: absolute; left: 0; top: 0; height: 100%; width: 0%; border-radius: inherit; }\n  .dl { background: var(--dl, #16a34a); }\n  .buf { background: var(--buf, #bbf7d0); }\n  .tag { font-size: 12px; color: #888; width: 42px; flex: none; }\n  .pct { font-size: var(--pctSize, 18px); font-weight: 800; font-variant-numeric: tabular-nums; color: var(--dl, #16a34a); width: 46px; text-align: right; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"box\">\n  <div class=\"row\"><span class=\"tag\">下载</span><div class=\"bar\"><div class=\"fill dl\" id=\"dl\"></div></div><span class=\"pct\" id=\"pct\">0%</span></div>\n  <div class=\"row\"><span class=\"tag\">缓冲</span><div class=\"bar\"><div class=\"fill buf\" id=\"buf\"></div></div><span class=\"pct\" id=\"bufpct\" style=\"color:#86c98f\">0%</span></div>\n</div>\n<button class=\"btn\" id=\"btn\">重新下载</button>\n\n<script>\n  const state = {\n    dur: 6,\n    bufferLead: 20,\n    thick: 8,\n    gap: 6,\n    radius: 6,\n    dlColor: \"#16a34a\",\n    bufColor: \"#bbf7d0\",\n    track: \"#eee\",\n    showPct: true,\n    pctSize: 18,\n    jitter: false\n  };\n  const dl = document.getElementById(\"dl\");\n  const buf = document.getElementById(\"buf\");\n  const pct = document.getElementById(\"pct\");\n  const bufpct = document.getElementById(\"bufpct\");\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--dl\", state.dlColor);\n    root.style.setProperty(\"--buf\", state.bufColor);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    pct.style.display = state.showPct ? \"block\" : \"none\";\n    bufpct.style.display = state.showPct ? \"block\" : \"none\";\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    applyStyle();\n    const start = performance.now();\n    const dur = Math.max(state.dur, 0.5) * 1000;\n    const lead = Math.min(state.bufferLead, 60) / 100;\n    let last = start, p = 0;\n    function tick(now) {\n      const dt = (now - last) / dur; last = now;\n      let step = dt;\n      if (state.jitter) step *= (0.4 + Math.random() * 1.4); // 下载受网络抖动，缓冲兜底\n      p = Math.min(1, p + step);\n      const bp = Math.min(1, p + lead);\n      dl.style.width = (p * 100) + \"%\";\n      buf.style.width = (bp * 100) + \"%\";\n      pct.textContent = Math.round(p * 100) + \"%\";\n      bufpct.textContent = Math.round(bp * 100) + \"%\";\n      if (p < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"dur\",\"bufferLead\",\"thick\",\"gap\",\"radius\",\"dlColor\",\"bufColor\",\"track\",\"showPct\",\"pctSize\",\"jitter\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v193",
    标题: "液体上涨进度",
    分类: "组件",
    子类: "进度加载",
    风格: ["轻盈", "叙事仪式"],
    场景: ["全站通用", "移动端·H5"],
    元素: ["动效", "视觉"],
    搭配: ["数字滚动", "环形进度"],
    标签: ["液体", "波浪", "上涨", "温度", "进度"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/液体上涨进度.html",
    参数: [
      {
        键: "dur",
        名: "上涨时长（秒）",
        类型: "slider",
        最小: 1,
        最大: 6,
        步长: 0.1,
        默认: 3
      },
      {
        键: "level",
        名: "目标液位（%）",
        类型: "slider",
        最小: 0,
        最大: 100,
        步长: 1,
        默认: 70
      },
      {
        键: "waveAmp",
        名: "波浪幅度（px）",
        类型: "slider",
        最小: 0,
        最大: 12,
        步长: 1,
        默认: 5
      },
      {
        键: "waveSpeed",
        名: "波动速度（秒/圈）",
        类型: "slider",
        最小: 0.5,
        最大: 4,
        步长: 0.1,
        默认: 2
      },
      {
        键: "radius",
        名: "容器圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 18
      },
      {
        键: "w",
        名: "容器宽（px）",
        类型: "slider",
        最小: 120,
        最大: 260,
        步长: 4,
        默认: 180
      },
      {
        键: "h",
        名: "容器高（px）",
        类型: "slider",
        最小: 120,
        最大: 260,
        步长: 4,
        默认: 180
      },
      {
        键: "liquid",
        名: "液体色",
        类型: "color",
        默认: "#3b82f6"
      },
      {
        键: "bg",
        名: "容器底色",
        类型: "color",
        默认: "#f1f5f9"
      },
      {
        键: "showPct",
        名: "显示百分比",
        类型: "switch",
        默认: true
      },
      {
        键: "pctColor",
        名: "百分比色",
        类型: "color",
        默认: "#1e3a8a"
      }
    ],
    效果说明: "构图笔记：冷冰冰的数字不如\"水在涨\"有温度——液面随进度上升、表面还带波动，进度变成了一种状态。\n容器里的液体按目标液位上涨，顶层是流动的波浪，比干巴巴的百分比更安抚人，适合上传/生成/充电。\n能怎么改：拖滑杆调「上涨时长（秒）、目标液位（%）、波浪幅度（px）」即可实时改观，点色块换液体/容器色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调上涨时长、目标液位、波浪幅度与速度，点色块换液体/容器色；液位设 0 就是空容器。",
    提示词: "帮我做一个\"液体上涨进度\"（纯 HTML/CSS/JS）：\n效果：容器里液体按目标液位上涨，顶层流动波浪，比数字更有温度。\n用法示例：\n.liquid { height: level%; } .wave { animation: flow var(--waveSpeed) linear infinite; }\n// 波浪用 SVG 正弦 path 横向滚动，height = 液位%\n关键参数：\n- dur 上涨时长 / level 目标液位 / waveAmp 波浪幅度 / waveSpeed 波动速度 / radius 容器圆角 / w 容器宽 / h 容器高 / liquid 液体色 / bg 容器底色 / showPct 显示百分比 / pctColor 百分比色\n集成步骤：\n1. 复制 assets/demos/液体上涨进度.html 的液体与波浪\n2. 波浪 path 用正弦点生成，translateX 无缝循环\n3. 液位用 height%，波浪随液体一起上移",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>液体上涨进度演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .container {\n    position: relative; width: var(--w, 180px); height: var(--h, 180px);\n    background: var(--bg, #f1f5f9); border-radius: var(--radius, 18px); overflow: hidden;\n  }\n  .liquid {\n    position: absolute; left: 0; right: 0; bottom: 0; height: 0%;\n    background: var(--liquid, #3b82f6);\n  }\n  .wave {\n    position: absolute; left: 0; top: 0; width: 200%; height: 100%;\n    transform: translateY(-50%); animation: flow var(--waveSpeed, 2s) linear infinite;\n  }\n  .wave svg { width: 100%; height: 100%; display: block; }\n  @keyframes flow { from { transform: translate(-50%, -50%); } to { transform: translate(-100%, -50%); } }\n  .pct {\n    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;\n    font-size: 30px; font-weight: 800; font-variant-numeric: tabular-nums;\n    color: var(--pctColor, #1e3a8a); mix-blend-mode: normal; z-index: 2;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"container\" id=\"box\">\n  <div class=\"liquid\" id=\"liquid\"><div class=\"wave\" id=\"wave\"></div></div>\n  <div class=\"pct\" id=\"pct\">0%</div>\n</div>\n<button class=\"btn\" id=\"btn\">重新上涨</button>\n\n<script>\n  const state = {\n    dur: 3,\n    level: 70,\n    waveAmp: 5,\n    waveSpeed: 2,\n    radius: 18,\n    w: 180,\n    h: 180,\n    liquid: \"#3b82f6\",\n    bg: \"#f1f5f9\",\n    showPct: true,\n    pctColor: \"#1e3a8a\"\n  };\n  const box = document.getElementById(\"box\");\n  const liquid = document.getElementById(\"liquid\");\n  const wave = document.getElementById(\"wave\");\n  const pct = document.getElementById(\"pct\");\n\n  function buildWave() {\n    const amp = Math.max(0, state.waveAmp);\n    const hh = Math.max(amp * 2 + 8, 12);\n    wave.style.height = hh + \"px\";\n    let d = \"M0,\" + (hh / 2 - amp * Math.sin(0));\n    for (let x = 0; x <= 200; x += 4) {\n      const y = hh / 2 - amp * Math.sin((x / 200) * Math.PI * 2);\n      d += \" L\" + x + \",\" + y;\n    }\n    d += \" L200,\" + hh + \" L0,\" + hh + \" Z\";\n    wave.innerHTML = '<svg viewBox=\"0 0 200 ' + hh + '\" preserveAspectRatio=\"none\"><path d=\"' + d + '\" fill=\"' + state.liquid + '\"/></svg>';\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--w\", state.w + \"px\");\n    root.style.setProperty(\"--h\", state.h + \"px\");\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--liquid\", state.liquid);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--waveSpeed\", state.waveSpeed + \"s\");\n    root.style.setProperty(\"--pctColor\", state.pctColor);\n    liquid.style.background = state.liquid;\n    pct.style.display = state.showPct ? \"flex\" : \"none\";\n    buildWave();\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    applyStyle();\n    const start = performance.now();\n    const dur = Math.max(state.dur, 0.3) * 1000;\n    const target = Math.min(100, Math.max(0, state.level)) / 100;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const e = 1 - Math.pow(1 - t, 3);\n      liquid.style.height = (e * target * 100) + \"%\";\n      pct.textContent = Math.round(e * target * 100) + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"dur\",\"level\",\"waveAmp\",\"waveSpeed\",\"radius\",\"w\",\"h\",\"liquid\",\"bg\",\"showPct\",\"pctColor\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v194",
    标题: "仪表扫针",
    分类: "组件",
    子类: "进度加载",
    风格: ["科技", "信息型"],
    场景: ["后台·数据看板"],
    元素: ["动效", "视觉"],
    搭配: ["数字滚动", "明确进度"],
    标签: ["仪表", "指针", "扫针", "百分比", "看板"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/仪表扫针.html",
    参数: [
      {
        键: "value",
        名: "目标值（%）",
        类型: "slider",
        最小: 0,
        最大: 100,
        步长: 1,
        默认: 72
      },
      {
        键: "dur",
        名: "扫针时长（秒）",
        类型: "slider",
        最小: 0.5,
        最大: 4,
        步长: 0.1,
        默认: 1.6
      },
      {
        键: "startAng",
        名: "起始角（°）",
        类型: "slider",
        最小: 90,
        最大: 270,
        步长: 5,
        默认: 180
      },
      {
        键: "sweep",
        名: "扫过角度（°）",
        类型: "slider",
        最小: 60,
        最大: 300,
        步长: 5,
        默认: 180
      },
      {
        键: "needle",
        名: "指针色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "arc",
        名: "弧线色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "track",
        名: "底弧色",
        类型: "color",
        默认: "#eee"
      },
      {
        键: "ticks",
        名: "刻度数量",
        类型: "slider",
        最小: 4,
        最大: 20,
        步长: 1,
        默认: 10
      },
      {
        键: "size",
        名: "直径（px）",
        类型: "slider",
        最小: 160,
        最大: 320,
        步长: 4,
        默认: 220
      },
      {
        键: "showVal",
        名: "显示数值",
        类型: "switch",
        默认: true
      },
      {
        键: "valSize",
        名: "数值字号（px）",
        类型: "slider",
        最小: 14,
        最大: 36,
        步长: 1,
        默认: 26
      }
    ],
    效果说明: "构图笔记：专业感来自指针的\"缓动扫过\"——它不是跳到读数，而是慢慢扫过去停稳，像仪表在测。\n半圆表盘上指针按缓动从起点扫到目标值，底弧随之上色，刻度增强读数可信度，适合后台指标。\n能怎么改：拖滑杆调「目标值（%）、扫针时长（秒）、刻度数量」即可实时改观，点色块换指针/弧线色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调目标值、扫针时长、刻度数量，点色块换指针/弧线色；起止角可调成不同张开度的表盘。",
    提示词: "帮我做一个\"仪表扫针\"（纯 HTML/CSS/JS + SVG）：\n效果：半圆表盘指针按缓动从起点扫到目标值，底弧同步上色，带刻度。\n用法示例：\n<line class=\"needle\" x1=cx y1=cy x2=nx y2=ny></line>\n// 指针角度 = startAng - (value/100)*sweep，用 easeOut 缓动\n关键参数：\n- value 目标值 / dur 扫针时长 / startAng 起始角 / sweep 扫过角度 / needle 指针色 / arc 弧线色 / track 底弧色 / ticks 刻度数量 / size 直径 / showVal 显示数值 / valSize 数值字号\n集成步骤：\n1. 复制 assets/demos/仪表扫针.html 的弧线与指针绘制\n2. 弧线用采样点连成 path，避免 arc 标志位出错\n3. 指针角度用 startAng - u*sweep，easeOut 收尾",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>仪表扫针演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .gauge { width: var(--size, 220px); height: var(--size, 220px); }\n  .val {\n    font-size: var(--valSize, 26px); font-weight: 800; font-variant-numeric: tabular-nums;\n    fill: var(--needle, #1a1a1a);\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<svg class=\"gauge\" id=\"svg\" viewBox=\"0 0 220 220\"></svg>\n<button class=\"btn\" id=\"btn\">重新扫针</button>\n\n<script>\n  const svg = document.getElementById(\"svg\");\n  const state = {\n    value: 72,\n    dur: 1.6,\n    startAng: 180,\n    sweep: 180,\n    needle: \"#1a1a1a\",\n    arc: \"#2563eb\",\n    track: \"#eee\",\n    ticks: 10,\n    size: 220,\n    showVal: true,\n    valSize: 26\n  };\n  const NS = \"http://www.w3.org/2000/svg\";\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--size\", state.size + \"px\");\n    root.style.setProperty(\"--needle\", state.needle);\n    root.style.setProperty(\"--valSize\", state.valSize + \"px\");\n    draw(0);\n  }\n\n  function pt(cx, cy, R, u) {\n    const ang = (state.startAng - u * state.sweep) * Math.PI / 180;\n    return [cx + R * Math.cos(ang), cy - R * Math.sin(ang)];\n  }\n  function arcPath(cx, cy, R, u0, u1) {\n    let d = \"\";\n    const steps = 60;\n    for (let i = 0; i <= steps; i++) {\n      const u = u0 + (u1 - u0) * i / steps;\n      const [x, y] = pt(cx, cy, R, u);\n      d += (i === 0 ? \"M\" : \"L\") + x.toFixed(2) + \",\" + y.toFixed(2);\n    }\n    return d;\n  }\n\n  function draw(p) {\n    const S = 220, cx = S / 2, cy = S / 2, R = S * 0.4;\n    svg.innerHTML = \"\";\n    const track = document.createElementNS(NS, \"path\");\n    track.setAttribute(\"d\", arcPath(cx, cy, R, 0, 1));\n    track.setAttribute(\"fill\", \"none\");\n    track.setAttribute(\"stroke\", state.track);\n    track.setAttribute(\"stroke-width\", \"12\");\n    track.setAttribute(\"stroke-linecap\", \"round\");\n    svg.appendChild(track);\n\n    const prog = document.createElementNS(NS, \"path\");\n    prog.setAttribute(\"d\", arcPath(cx, cy, R, 0, p / 100));\n    prog.setAttribute(\"fill\", \"none\");\n    prog.setAttribute(\"stroke\", state.arc);\n    prog.setAttribute(\"stroke-width\", \"12\");\n    prog.setAttribute(\"stroke-linecap\", \"round\");\n    svg.appendChild(prog);\n\n    // 刻度\n    const tn = Math.max(2, Math.round(state.ticks));\n    for (let i = 0; i < tn; i++) {\n      const u = i / (tn - 1);\n      const [x1, y1] = pt(cx, cy, R - 14, u);\n      const [x2, y2] = pt(cx, cy, R - 6, u);\n      const t = document.createElementNS(NS, \"line\");\n      t.setAttribute(\"x1\", x1); t.setAttribute(\"y1\", y1);\n      t.setAttribute(\"x2\", x2); t.setAttribute(\"y2\", y2);\n      t.setAttribute(\"stroke\", \"#cbd5e1\"); t.setAttribute(\"stroke-width\", \"2\");\n      svg.appendChild(t);\n    }\n\n    // 指针\n    const [nx, ny] = pt(cx, cy, R - 18, p / 100);\n    const needle = document.createElementNS(NS, \"line\");\n    needle.setAttribute(\"x1\", cx); needle.setAttribute(\"y1\", cy);\n    needle.setAttribute(\"x2\", nx); needle.setAttribute(\"y2\", ny);\n    needle.setAttribute(\"stroke\", state.needle);\n    needle.setAttribute(\"stroke-width\", \"3\"); needle.setAttribute(\"stroke-linecap\", \"round\");\n    svg.appendChild(needle);\n    const hub = document.createElementNS(NS, \"circle\");\n    hub.setAttribute(\"cx\", cx); hub.setAttribute(\"cy\", cy); hub.setAttribute(\"r\", \"6\");\n    hub.setAttribute(\"fill\", state.needle); svg.appendChild(hub);\n\n    if (state.showVal) {\n      const txt = document.createElementNS(NS, \"text\");\n      txt.setAttribute(\"x\", cx); txt.setAttribute(\"y\", cy + R * 0.55);\n      txt.setAttribute(\"text-anchor\", \"middle\");\n      txt.setAttribute(\"class\", \"val\");\n      txt.textContent = Math.round(p) + \"%\";\n      svg.appendChild(txt);\n    }\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    const start = performance.now();\n    const dur = Math.max(state.dur, 0.2) * 1000;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const e = 1 - Math.pow(1 - t, 3);\n      draw(e * state.value);\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"value\",\"dur\",\"startAng\",\"sweep\",\"needle\",\"arc\",\"track\",\"ticks\",\"size\",\"showVal\",\"valSize\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v195",
    标题: "路径生成进度",
    分类: "AI反馈",
    子类: "过程透明",
    风格: ["科技"],
    场景: ["工具·SaaS"],
    元素: ["动效", "视觉"],
    搭配: ["模糊进度", "数字滚动"],
    标签: ["生成", "描边", "路径", "AI", "过程"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/路径生成进度.html",
    参数: [
      {
        键: "dur",
        名: "生成时长（秒）",
        类型: "slider",
        最小: 1,
        最大: 6,
        步长: 0.1,
        默认: 3
      },
      {
        键: "pathType",
        名: "路径（曲线/直线/折线）",
        类型: "select",
        选项: ["曲线", "直线", "折线"],
        默认: "曲线"
      },
      {
        键: "strokeW",
        名: "线宽（px）",
        类型: "slider",
        最小: 2,
        最大: 12,
        步长: 1,
        默认: 4
      },
      {
        键: "color",
        名: "路径色",
        类型: "color",
        默认: "#7b5cff"
      },
      {
        键: "glow",
        名: "发光",
        类型: "switch",
        默认: true
      },
      {
        键: "midGlow",
        名: "中点点亮",
        类型: "switch",
        默认: true
      },
      {
        键: "midSize",
        名: "中点直径（px）",
        类型: "slider",
        最小: 6,
        最大: 24,
        步长: 1,
        默认: 14
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#0b0b12"
      },
      {
        键: "pad",
        名: "内边距（px）",
        类型: "slider",
        最小: 10,
        最大: 60,
        步长: 1,
        默认: 30
      },
      {
        键: "ease",
        名: "缓动（两端缓/匀速/平滑）",
        类型: "select",
        选项: ["easeInOut", "linear", "easeOut"],
        默认: "easeInOut"
      },
      {
        键: "showPct",
        名: "显示百分比",
        类型: "switch",
        默认: true
      }
    ],
    效果说明: "构图笔记：AI 生成要有\"正在想\"的可见感——一条线被慢慢描出来、中点亮起，比转圈更像在创作。\n曲线/直线/折线沿路径描边生长，中点随描边过半而点亮，强化\"生成中\"的仪式感，适合 AI 生成/处理。\n能怎么改：拖滑杆调「生成时长（秒）、线宽（px）、中点直径（px）」即可实时改观，点色块换路径色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调生成时长、线宽、中点大小，点色块换路径色；路径类型切直线/折线换一种生成气质。",
    提示词: "帮我做一个\"路径生成进度\"（纯 HTML/CSS/JS + SVG，暗色氛围）：\n效果：路径沿曲线描边生长，中点过半点亮，强化 AI 生成感。\n用法示例：\npath { stroke-dasharray: len; stroke-dashoffset: len*(1-e); }\n// e 过半时中点 opacity 置 1，用 getPointAtLength(len/2) 定位中点\n关键参数：\n- dur 生成时长 / pathType 路径 / strokeW 线宽 / color 路径色 / glow 发光 / midGlow 中点点亮 / midSize 中点直径 / bg 底色 / pad 内边距 / ease 缓动 / showPct 显示百分比\n集成步骤：\n1. 复制 assets/demos/路径生成进度.html 的描边与中点\n2. 用 getTotalLength + getPointAtLength 定位中点\n3. 暗色底 + 发光滤镜更出\"生成\"氛围",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>路径生成进度演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: var(--bg, #0b0b12); font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #fff;\n  }\n  .stage { width: min(80vw, 420px); }\n  svg { width: 100%; height: auto; display: block; }\n  .path { fill: none; stroke: var(--color, #7b5cff); stroke-width: var(--strokeW, 4); stroke-linecap: round; filter: var(--glow, none); }\n  .mid { fill: var(--color, #7b5cff); opacity: 0; filter: var(--midGlow, none); transition: opacity .3s ease; }\n  .pct { font-size: 22px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--color, #7b5cff); }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #7b5cff; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"stage\"><svg id=\"svg\" viewBox=\"0 0 300 160\"></svg></div>\n<div class=\"pct\" id=\"pct\">0%</div>\n<button class=\"btn\" id=\"btn\">重新生成</button>\n\n<script>\n  const svg = document.getElementById(\"svg\");\n  const pct = document.getElementById(\"pct\");\n  const NS = \"http://www.w3.org/2000/svg\";\n  const state = {\n    dur: 3,\n    pathType: \"曲线\",\n    strokeW: 4,\n    color: \"#7b5cff\",\n    glow: true,\n    midGlow: true,\n    midSize: 14,\n    bg: \"#0b0b12\",\n    pad: 30,\n    ease: \"easeInOut\",\n    showPct: true\n  };\n  let pathEl, midEl, len = 0;\n\n  function pathD() {\n    const p = state.pad, W = 300 - p, H = 160 - p, y = 160 / 2;\n    if (state.pathType === \"直线\") return `M${p},${y} L${W},${y}`;\n    if (state.pathType === \"折线\") return `M${p},${H} L${(p+W)/2},${p} L${W},${H}`;\n    return `M${p},${H} C${p+W*0.33},${p} ${p+W*0.66},${H} ${W},${p}`;\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--strokeW\", state.strokeW + \"px\");\n    root.style.setProperty(\"--glow\", state.glow ? (\"drop-shadow(0 0 5px \" + state.color + \")\") : \"none\");\n    root.style.setProperty(\"--midGlow\", state.midGlow ? (\"drop-shadow(0 0 6px \" + state.color + \")\") : \"none\");\n    pct.style.display = state.showPct ? \"block\" : \"none\";\n    draw();\n  }\n\n  function draw() {\n    svg.innerHTML = \"\";\n    pathEl = document.createElementNS(NS, \"path\");\n    pathEl.setAttribute(\"class\", \"path\");\n    pathEl.setAttribute(\"d\", pathD());\n    svg.appendChild(pathEl);\n    midEl = document.createElementNS(NS, \"circle\");\n    midEl.setAttribute(\"class\", \"mid\");\n    midEl.setAttribute(\"r\", state.midSize / 2);\n    svg.appendChild(midEl);\n    len = pathEl.getTotalLength();\n    pathEl.style.strokeDasharray = len;\n    pathEl.style.strokeDashoffset = len;\n    try {\n      const m = pathEl.getPointAtLength(len / 2);\n      midEl.setAttribute(\"cx\", m.x); midEl.setAttribute(\"cy\", m.y);\n    } catch (e) {}\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    draw();\n    const start = performance.now();\n    const dur = Math.max(state.dur, 0.3) * 1000;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      let e = t;\n      if (state.ease === \"linear\") e = t;\n      else if (state.ease === \"easeOut\") e = 1 - Math.pow(1 - t, 3);\n      else e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;\n      pathEl.style.strokeDashoffset = len * (1 - e);\n      if (state.midGlow) midEl.style.opacity = e >= 0.5 ? \"1\" : \"0\";\n      pct.textContent = Math.round(e * 100) + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"dur\",\"pathType\",\"strokeW\",\"color\",\"glow\",\"midGlow\",\"midSize\",\"bg\",\"pad\",\"ease\",\"showPct\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v196",
    标题: "顶栏多线进度",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简"],
    场景: ["全站通用"],
    元素: ["动效", "构成"],
    搭配: ["滚动进度指示", "明确进度"],
    标签: ["顶栏", "细线", "多线", "厚实", "进度"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/顶栏多线进度.html",
    参数: [
      {
        键: "lines",
        名: "线数（1-3）",
        类型: "slider",
        最小: 1,
        最大: 3,
        步长: 1,
        默认: 2
      },
      {
        键: "dur",
        名: "推进时长（秒）",
        类型: "slider",
        最小: 0.5,
        最大: 4,
        步长: 0.1,
        默认: 1.8
      },
      {
        键: "thick",
        名: "单线高（px）",
        类型: "slider",
        最小: 1,
        最大: 6,
        步长: 1,
        默认: 3
      },
      {
        键: "gap",
        名: "线间距（px）",
        类型: "slider",
        最小: 1,
        最大: 8,
        步长: 1,
        默认: 2
      },
      {
        键: "color",
        名: "线色",
        类型: "color",
        默认: "#7b5cff"
      },
      {
        键: "glow",
        名: "发光",
        类型: "switch",
        默认: true
      },
      {
        键: "pos",
        名: "位置（顶部/底部）",
        类型: "select",
        选项: ["顶部", "底部"],
        默认: "顶部"
      },
      {
        键: "ease",
        名: "缓动（平滑/匀速）",
        类型: "select",
        选项: ["easeOut", "linear"],
        默认: "easeOut"
      },
      {
        键: "loop",
        名: "循环",
        类型: "switch",
        默认: true
      },
      {
        键: "bg",
        名: "底色",
        类型: "color",
        默认: "#ffffff"
      }
    ],
    效果说明: "构图笔记：一条细线太单薄，叠几条一起推进就\"厚实\"了——顶部细线进度也能做出体量感。\n视口顶部（或底部）一条细线可切换成多条并行推进，单线轻、多线厚，常驻不抢内容。\n能怎么改：拖滑杆调「线数、推进时长（秒）、单线高（px）」即可实时改观，点色块换线色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调线数、推进时长、单线高，点色块换线色；位置切底部就沉到视口下沿。",
    提示词: "帮我做一个\"顶栏多线进度\"（纯 HTML/CSS/JS）：\n效果：视口顶部细线进度，可切换 1~3 条并行推进，越多越厚实。\n用法示例：\n.barbox { position: fixed; top: 0; } .bar { height: var(--thick); width: e%; }\n// 多条 bar 用同一进度，直接 width 推进\n关键参数：\n- lines 线数 / dur 推进时长 / thick 单线高 / gap 线间距 / color 线色 / glow 发光 / pos 位置 / ease 缓动 / loop 循环 / bg 底色\n集成步骤：\n1. 复制 assets/demos/顶栏多线进度.html 的固定定位与多线\n2. 每条 bar 同步 width 推进，错开只用动画延迟\n3. 与滚动进度指示区别：这是主动推进，不是跟随滚动",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>顶栏多线进度演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; background: var(--bg, #fff);\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #888;\n    display: flex; align-items: center; justify-content: center;\n  }\n  .barbox {\n    position: fixed; left: 0; right: 0; display: flex; flex-direction: column;\n    gap: var(--gap, 2px); z-index: 5;\n  }\n  .barbox.top { top: 0; }\n  .barbox.bottom { bottom: 0; }\n  .bar { height: var(--thick, 3px); width: 0%; background: var(--color, #7b5cff); box-shadow: var(--glow, none); }\n  .btn {\n    position: fixed; bottom: 18px; cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 9px 22px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"barbox top\" id=\"barbox\"></div>\n<button class=\"btn\" id=\"btn\">重新推进</button>\n\n<script>\n  const barbox = document.getElementById(\"barbox\");\n  const state = {\n    lines: 2,\n    dur: 1.8,\n    thick: 3,\n    gap: 2,\n    color: \"#7b5cff\",\n    glow: true,\n    pos: \"顶部\",\n    ease: \"easeOut\",\n    loop: true,\n    bg: \"#ffffff\"\n  };\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--glow\", state.glow ? (\"0 0 6px \" + state.color) : \"none\");\n    barbox.className = \"barbox \" + (state.pos === \"底部\" ? \"bottom\" : \"top\");\n    build();\n  }\n\n  function build() {\n    barbox.innerHTML = \"\";\n    const n = Math.max(1, Math.round(state.lines));\n    for (let i = 0; i < n; i++) {\n      const b = document.createElement(\"div\");\n      b.className = \"bar\"; b.dataset.i = i;\n      barbox.appendChild(b);\n    }\n  }\n\n  let raf = 0, timer = 0;\n  function run() {\n    cancelAnimationFrame(raf); clearTimeout(timer);\n    const bars = barbox.querySelectorAll(\".bar\");\n    const start = performance.now();\n    const dur = Math.max(state.dur, 0.2) * 1000;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const e = state.ease === \"linear\" ? t : 1 - Math.pow(1 - t, 3);\n      bars.forEach(b => b.style.width = (e * 100) + \"%\");\n      if (t < 1) raf = requestAnimationFrame(tick);\n      else if (state.loop) timer = setTimeout(() => { bars.forEach(b => b.style.width = \"0%\"); run(); }, 700);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"lines\",\"dur\",\"thick\",\"gap\",\"color\",\"glow\",\"pos\",\"ease\",\"loop\",\"bg\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v197",
    标题: "按钮充能触发",
    分类: "组件",
    子类: "进度加载",
    风格: ["极简", "品牌"],
    场景: ["全站通用", "落地页·发布页"],
    元素: ["动效", "反馈"],
    搭配: ["按钮加载", "明确进度"],
    标签: ["按钮", "充能", "触发", "阈值", "确认"],
    来源: "抖音视频拆解：进度条设计十式（2026-09-15 用户提供 AI 总结；交互模式为通用设计手法，实现代码自写）+ https://www.douyin.com/user/self?modal_id=7685534150836631680",
    效果演示: "assets/demos/按钮充能触发.html",
    参数: [
      {
        键: "fillMode",
        名: "填充方式（从左到右/从中心扩散）",
        类型: "select",
        选项: ["从左到右", "从中心扩散"],
        默认: "从左到右"
      },
      {
        键: "threshold",
        名: "触发阈值（%）",
        类型: "slider",
        最小: 50,
        最大: 100,
        步长: 1,
        默认: 100
      },
      {
        键: "dur",
        名: "充能时长（秒）",
        类型: "slider",
        最小: 1,
        最大: 6,
        步长: 0.1,
        默认: 2.5
      },
      {
        键: "auto",
        名: "自动充能",
        类型: "switch",
        默认: true
      },
      {
        键: "fillColor",
        名: "填充色",
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
        名: "文字色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "radius",
        名: "圆角（px）",
        类型: "slider",
        最小: 6,
        最大: 28,
        步长: 1,
        默认: 12
      },
      {
        键: "padX",
        名: "水平内边距（px）",
        类型: "slider",
        最小: 16,
        最大: 48,
        步长: 1,
        默认: 28
      },
      {
        键: "padY",
        名: "垂直内边距（px）",
        类型: "slider",
        最小: 8,
        最大: 28,
        步长: 1,
        默认: 14
      },
      {
        键: "armedText",
        名: "触发后文字",
        类型: "string",
        默认: "已触发 ✓"
      }
    ],
    效果说明: "构图笔记：重要操作别让人误点——让按钮先\"充能\"到阈值才变成可点，等于把确认藏进进度里。\n按钮内部进度从左到右（或从中心扩散）填充，到阈值才点亮成可点状态，点一下即触发，常用于关键确认。\n能怎么改：拖滑杆调「触发阈值（%）、充能时长（秒）、圆角（px）」即可实时改观，点色块换填充/按钮色；更多调法见右侧「用法」面板。",
    用法: "拖滑杆调触发阈值、充能时长、圆角与内边距，点色块换填充/按钮色；自动关掉就改成\"按住充能\"。",
    提示词: "帮我做一个\"按钮充能触发\"（纯 HTML/CSS/JS）：\n效果：按钮内部进度填充到阈值才变可点，点一下即触发，关键操作防误触。\n用法示例：\n.fill { width: p%; } .btn.armed { cursor: pointer; box-shadow: 0 0 0 3px ...; }\n// p 到 threshold 给按钮加 armed 类，点击才执行动作\n关键参数：\n- fillMode 填充方式 / threshold 触发阈值 / dur 充能时长 / auto 自动充能 / fillColor 填充色 / btnBg 按钮底色 / btnColor 文字色 / radius 圆角 / padX 水平内边距 / padY 垂直内边距 / armedText 触发后文字\n集成步骤：\n1. 复制 assets/demos/按钮充能触发.html 的充能与 armed 逻辑\n2. p < threshold 时按钮 disabled 态，到了才 armed\n3. 自动关掉改 mousedown 才开始充能，松手未达阈值回退",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>按钮充能触发演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .btn {\n    position: relative; overflow: hidden; cursor: default; user-select: none;\n    background: var(--btnBg, #1a1a1a); color: var(--btnColor, #fff);\n    border: none; outline: none; border-radius: var(--radius, 12px);\n    padding: var(--padY, 14px) var(--padX, 28px);\n    font-size: 15px; font-weight: 700; transition: box-shadow .25s ease;\n  }\n  .btn.armed { cursor: pointer; box-shadow: 0 0 0 3px color-mix(in srgb, var(--fill, #16a34a) 40%, transparent); }\n  .fill {\n    position: absolute; top: 0; bottom: 0; left: 0; width: 0%;\n    background: var(--fill, #16a34a); opacity: .85; z-index: 0;\n  }\n  .fill.center { left: 50%; transform: translateX(-50%); width: 0%; }\n  .label { position: relative; z-index: 1; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\"><span class=\"fill\" id=\"fill\"></span><span class=\"label\" id=\"label\">充能 0%</span></button>\n\n<script>\n  const btn = document.getElementById(\"btn\");\n  const fill = document.getElementById(\"fill\");\n  const label = document.getElementById(\"label\");\n  const state = {\n    fillMode: \"从左到右\",\n    threshold: 100,\n    dur: 2.5,\n    auto: true,\n    fillColor: \"#16a34a\",\n    btnBg: \"#1a1a1a\",\n    btnColor: \"#ffffff\",\n    radius: 12,\n    padX: 28,\n    padY: 14,\n    armedText: \"已触发 ✓\"\n  };\n  let raf = 0, holding = false, p = 0, firing = false;\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--btnBg\", state.btnBg);\n    root.style.setProperty(\"--btnColor\", state.btnColor);\n    root.style.setProperty(\"--fill\", state.fillColor);\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--padX\", state.padX + \"px\");\n    root.style.setProperty(\"--padY\", state.padY + \"px\");\n    fill.className = \"fill\" + (state.fillMode === \"从中心扩散\" ? \" center\" : \"\");\n  }\n\n  function setArmed() {\n    const armed = p >= state.threshold;\n    btn.classList.toggle(\"armed\", armed && !firing);\n  }\n  function render() {\n    fill.style.width = p + \"%\";\n    label.textContent = firing ? state.armedText : (p >= state.threshold ? \"点击触发\" : \"充能 \" + Math.round(p) + \"%\");\n    setArmed();\n  }\n\n  function run() {\n    cancelAnimationFrame(raf);\n    firing = false; p = 0; render();\n    const dur = Math.max(state.dur, 0.2) * 1000;\n    const start = performance.now();\n    function tick(now) {\n      if (!state.auto && !holding) return; // 非自动：按住才充\n      const t = Math.min((now - start) / dur, 1);\n      p = t * state.threshold;\n      render();\n      if (p < state.threshold) raf = requestAnimationFrame(tick);\n      else setArmed();\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  btn.addEventListener(\"mousedown\", () => { if (!state.auto) { holding = true; run(); } });\n  window.addEventListener(\"mouseup\", () => { if (!state.auto) holding = false; });\n\n  btn.addEventListener(\"click\", () => {\n    if (p >= state.threshold && !firing) {\n      firing = true; render();\n      setTimeout(() => { firing = false; run(); }, 1200); // 触发后复位重来\n    }\n  });\n\n  document.getElementById(\"btn\");\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; applyStyle();\n    if ([\"fillMode\",\"threshold\",\"dur\",\"auto\",\"fillColor\",\"btnBg\",\"btnColor\",\"radius\",\"padX\",\"padY\",\"armedText\"].includes(d.key)) run();\n  });\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  }
,
{
  id: "v198",
  标题: "产品导览",
  分类: "组件",
  子类: "新手引导",
  风格: ["通用","轻盈"],
  场景: ["全站通用","工具·SaaS"],
  元素: ["构成","动效","反馈"],
  搭配: ["聚光高亮","操作指引标注"],
  标签: ["新手引导","产品导览","分步高亮","步骤进度"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/产品导览.html",
  参数: [{"键":"steps","名":"引导步数","类型":"slider","默认":4,"最小":2,"最大":6,"单位":"步"},{"键":"hl","名":"高亮色","类型":"color","默认":"#2f6bff"},{"键":"mask","名":"遮罩浓度","类型":"slider","默认":0.45,"最小":0.2,"最大":0.8},{"键":"radius","名":"高亮圆角","类型":"slider","默认":14,"最小":4,"最大":28,"单位":"px"},{"键":"fs","名":"说明字号","类型":"slider","默认":13,"最小":11,"最大":16,"单位":"px"},{"键":"dur","名":"自动间隔","类型":"slider","默认":2.5,"最小":1,"最大":5,"单位":"秒"},{"键":"auto","名":"自动播放","类型":"switch","默认":true},{"键":"finText","名":"完成文案","类型":"string","默认":"开始使用"}],
  效果说明: "构图笔记：首屏元素不要一起出现，按「 Importance → 顺序」排队，每切一步只让一个区域变亮，其余压暗，用户视线被强制引导。\n能怎么改：高亮环换成产品主色；步数按真实功能数定；最后一步给「完成入口」而不是「关闭」，把引导收口成行动。",
  用法: "在首次进入产品时调用：依次记录要介绍的若干功能节点坐标，用遮罩+高亮环逐一定位，配合步骤进度与「下一步」按钮驱动。完成后展示开始使用的入口。",
  提示词: "请生成一个「产品导览」新手引导组件。必须明确四件事：\n1) 出现时机：用户首次进入产品、且目标功能已渲染完成后触发，不要在一片空白时弹出。\n2) 指向目标：每一步用遮罩压暗整页，仅高亮当前要介绍的功能区域（给我该功能节点的定位方式），说明文字紧贴高亮区。\n3) 操作后切换：用户点「下一步」后，高亮区、说明内容与步骤进度（如 2/4）同步切换到下一个目标；支持自动播放与手动跳过。\n4) 完成状态：走到最后一步展示「开始使用」入口，点击后关闭引导并标记该用户已看过，不再重复弹出。\n\n关键参数：\n- steps 引导步数 / hl 高亮色 / mask 遮罩浓度 / radius 高亮圆角 / fs 说明字号 / dur 自动间隔 / auto 自动播放 / finText 完成文案\n集成步骤：\n1. 复制 assets/demos/产品导览.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把引导步骤与你产品的真实功能节点一一对应",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>产品导览演示</title>\n<style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px}\n.hd{color:#333;font-size:15px}\n.app{position:relative;width:340px;display:grid;grid-template-columns:1fr 1fr;gap:12px}\n.feat{background:#f4f5f7;border-radius:12px;padding:18px;text-align:center;color:#444;font-size:14px;transition:.2s}\n.ring{position:absolute;border:3px solid var(--hl,#2f6bff);border-radius:14px;box-shadow:0 0 0 9999px rgba(0,0,0,.45);pointer-events:none;transition:.35s cubic-bezier(.4,1.3,.5,1);opacity:0;z-index:4}\n.ring.on{opacity:1}\n.tip{position:absolute;background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:10px 12px;width:200px;font-size:13px;color:#222;box-shadow:0 8px 24px rgba(0,0,0,.18);opacity:0;transform:translateY(6px);transition:.3s;z-index:6}\n.tip.on{opacity:1;transform:none}\n.bar{display:flex;justify-content:space-between;align-items:center;margin-top:8px}\n.step{font-size:11px;color:#888}\n.nx{background:var(--hl,#2f6bff);color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer}\n.fin{background:#16a34a;color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer}\n</style></head><body>\n<div class=\"hd\">示例应用</div>\n<div class=\"app\" id=\"app\">\n  <div class=\"feat\" data-i=\"0\">数据看板</div>\n  <div class=\"feat\" data-i=\"1\">设置中心</div>\n  <div class=\"feat\" data-i=\"2\">消息通知</div>\n  <div class=\"feat\" data-i=\"3\">个人资料</div>\n  <div class=\"ring\" id=\"ring\"></div>\n  <div class=\"tip\" id=\"tip\"><div id=\"tipText\"></div><div class=\"bar\"><span class=\"step\" id=\"step\"></span><span id=\"tipBtn\"></span></div></div>\n</div>\n<script>\nconst feats=[...document.querySelectorAll('.feat')];\nconst ring=document.getElementById('ring'),tip=document.getElementById('tip'),tipText=document.getElementById('tipText'),stepEl=document.getElementById('step'),tipBtn=document.getElementById('tipBtn');\nconst state={steps:4,hl:'#2f6bff',mask:.45,radius:14,fs:13,dur:2.5,auto:true,finText:'开始使用'};\nconst caps=['数据看板：一眼看全核心指标','设置中心：调整偏好与权限','消息通知：重要动态不漏接','个人资料：完善后协作更高效'];\nlet i=0,timer=0;\nfunction applyStyle(){document.documentElement.style.setProperty('--hl',state.hl);ring.style.borderRadius=state.radius+'px';tip.style.fontSize=state.fs+'px';ring.style.boxShadow='0 0 0 9999px rgba(0,0,0,'+state.mask+')';}\nfunction place(){const r=feats[i].getBoundingClientRect(),a=document.getElementById('app').getBoundingClientRect();ring.style.left=(r.left-a.left-6)+'px';ring.style.top=(r.top-a.top-6)+'px';ring.style.width=(r.width+12)+'px';ring.style.height=(r.height+12)+'px';tip.style.left=(r.left-a.left+r.width+14)+'px';tip.style.top=(r.top-a.top)+'px';}\nfunction show(){applyStyle();place();ring.classList.add('on');tip.classList.add('on');tipText.textContent=caps[i];stepEl.textContent=(i+1)+' / '+state.steps;tipBtn.innerHTML=i<state.steps-1?'<button class=\"nx\" id=\"nx\">下一步</button>':'<button class=\"fin\" id=\"nx\">'+state.finText+'</button>';document.getElementById('nx').onclick=()=>{if(i<state.steps-1){i++;show();}else{ring.classList.remove('on');tip.classList.remove('on');}};}\nfunction start(){i=0;show();if(state.auto){clearInterval(timer);timer=setInterval(()=>{if(i<state.steps-1){i++;show();}else{clearInterval(timer);ring.classList.remove('on');tip.classList.remove('on');}},state.dur*1000);}}\nwindow.addEventListener('resize',()=>{if(ring.classList.contains('on'))place();});\napplyStyle();start();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['steps','hl','mask','radius','fs','dur','auto','finText'].includes(d.key))start();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v199",
  标题: "聚光高亮",
  分类: "组件",
  子类: "新手引导",
  风格: ["通用","暗色"],
  场景: ["全站通用","移动端·H5"],
  元素: ["构成","反馈"],
  搭配: ["产品导览","情境提示"],
  标签: ["新手引导","聚光高亮","遮罩","防误触"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/聚光高亮.html",
  参数: [{"键":"mask","名":"遮罩浓度","类型":"slider","默认":0.55,"最小":0.3,"最大":0.8},{"键":"hl","名":"聚光边框色","类型":"color","默认":"#2f6bff"},{"键":"radius","名":"聚光圆角","类型":"slider","默认":12,"最小":4,"最大":24,"单位":"px"},{"键":"dur","名":"过渡时长","类型":"slider","默认":0.35,"最小":0.2,"最大":0.8,"单位":"秒"},{"键":"auto","名":"自动演示","类型":"switch","默认":false}],
  效果说明: "构图笔记：只让一个区域「亮着」，其余整页压暗，用户不会分心去点别处——聚光本身就是一种「防误触」的约束。\n能怎么改：聚光移动用缓动别用瞬切；多个目标时按顺序流动，别一次全亮；边框色用品牌色强化「当前在这里」。",
  用法: "引导用户完成单点任务（如上传、创建）时用：整页遮罩，仅当前目标透出并可点击，点击后聚光缓动移动到下一个目标；非目标区被遮罩挡住，暂时无法误触。",
  提示词: "请生成一个「聚光高亮」引导组件。必须明确四件事：\n1) 出现时机：需要用户逐个完成一组操作（如上传→邀请→创建）时，每完成一件才前进。\n2) 指向目标：整页压暗遮罩，仅当前目标区域透出高亮边框并可点击，其余区域被遮罩挡住无法误触。\n3) 操作后切换：用户点中当前高亮目标后，聚光用缓动移动到下一个目标；走到最后一步关闭遮罩。\n4) 完成状态：全部目标点完后移除遮罩并恢复整页可交互，标记引导完成。\n\n关键参数：\n- mask 遮罩浓度 / hl 聚光边框色 / radius 聚光圆角 / dur 过渡时长 / auto 自动演示\n集成步骤：\n1. 复制 assets/demos/聚光高亮.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 按你要引导的单点任务替换目标区域",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>聚光高亮演示</title>\n<style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px}\n.hd{color:#333;font-size:15px}\n.row{display:flex;gap:14px}\n.btn{background:#f4f5f7;border:1px solid #e5e7eb;border-radius:10px;padding:14px 22px;color:#444;font-size:14px;cursor:pointer;position:relative;z-index:1}\n.overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);opacity:0;pointer-events:none;transition:.3s;z-index:10}\n.overlay.on{opacity:1;pointer-events:auto}\n.btn.live{z-index:11}\n.ring{position:fixed;border:3px solid var(--hl,#2f6bff);border-radius:12px;pointer-events:none;opacity:0;transition:.35s cubic-bezier(.4,1.3,.5,1);z-index:12}\n.ring.on{opacity:1}\n</style></head><body>\n\n<div class=\"row\" id=\"row\">\n  <div class=\"btn\">上传文件</div>\n  <div class=\"btn\">邀请成员</div>\n  <div class=\"btn\">创建工作区</div>\n  <div class=\"btn\">完成引导</div>\n</div>\n<div class=\"overlay\" id=\"ov\"></div>\n<div class=\"ring\" id=\"ring\"></div>\n<script>\nconst btns=[...document.querySelectorAll('.btn')];\nconst ov=document.getElementById('ov'),ring=document.getElementById('ring');\nconst state={mask:.55,hl:'#2f6bff',radius:12,dur:.35,auto:false};\nlet i=0;\nfunction applyStyle(){ov.style.background='rgba(0,0,0,'+state.mask+')';ring.style.borderColor=state.hl;ring.style.borderRadius=state.radius+'px';ring.style.transition=state.dur+'s cubic-bezier(.4,1.3,.5,1)';}\nfunction focus(n){i=(n+btns.length)%btns.length;btns.forEach(b=>b.classList.remove('live'));btns[i].classList.add('live');const r=btns[i].getBoundingClientRect();ring.style.left=(r.left-6)+'px';ring.style.top=(r.top-6)+'px';ring.style.width=(r.width+12)+'px';ring.style.height=(r.height+12)+'px';}\nfunction start(){applyStyle();ov.classList.add('on');ring.classList.add('on');focus(0);}\nbtns.forEach((b,idx)=>{b.onclick=()=>{if(b.classList.contains('live')){if(idx<btns.length-1)focus(idx+1);else{ov.classList.remove('on');ring.classList.remove('on');btns.forEach(x=>x.classList.remove('live'));}}};});\napplyStyle();start();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['mask','hl','radius','dur','auto'].includes(d.key))start();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v200",
  标题: "新手任务清单",
  分类: "组件",
  子类: "新手引导",
  风格: ["通用","轻盈"],
  场景: ["全站通用","工具·SaaS"],
  元素: ["反馈","构成"],
  搭配: ["产品导览","分步进度反馈"],
  标签: ["新手引导","任务清单","进度条","勾选"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/新手任务清单.html",
  参数: [{"键":"pc","名":"进度色","类型":"color","默认":"#2f6bff"},{"键":"ok","名":"已完成色","类型":"color","默认":"#16a34a"},{"键":"auto","名":"点击即勾选","类型":"switch","默认":true}],
  效果说明: "构图笔记：把「入门」拆成可勾选的小任务，进度条给确定感，完成的勾选+下一项提示构成正反馈闭环，比一次性弹窗更易坚持。\n能怎么改：任务数控制 3–5 条；每条完成同步刷新进度条并高亮「下一项」；全部完成给一个明确收口（如徽章/欢迎语）。",
  用法: "注册后/新功能上线时放一个常驻清单：勾选驱动进度条与下一项提示，全部完成后展示完成反馈。",
  提示词: "请生成一个「新手任务清单」组件。必须明确四件事：\n1) 出现时机：新用户完成注册或进入新版本后，以可随时收起/展开的常驻清单呈现，不打断主流程。\n2) 指向目标：把入门流程拆成 3–5 条具体任务（如完善资料、关注话题），每条可勾选。\n3) 操作后切换：勾选任一条后，进度条与「下一项」提示同步更新；已完成项置灰划线。\n4) 完成状态：全部勾选后展示完成反馈（徽章/欢迎语），并把清单收起为已完成态，不再占用视线。\n\n关键参数：\n- pc 进度色 / ok 已完成色 / auto 点击即勾选\n集成步骤：\n1. 复制 assets/demos/新手任务清单.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把 3–5 条任务换成你产品的入门动作",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>新手任务清单演示</title>\n<style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}\n.box{width:320px;border:1px solid #e5e7eb;border-radius:14px;padding:18px;box-shadow:0 6px 20px rgba(0,0,0,.06)}\n.ttl{font-size:14px;color:#222;font-weight:700;margin-bottom:10px}\n.pbar{height:8px;background:#eef0f3;border-radius:6px;overflow:hidden;margin-bottom:14px}\n.pfill{height:100%;width:0;background:var(--pc,#2f6bff);border-radius:6px;transition:width .4s ease}\n.item{display:flex;align-items:center;gap:10px;padding:9px 0;border-top:1px solid #f1f2f4;font-size:13px;color:#333;cursor:pointer}\n.box.done .next{display:none}\n.box.done .done{display:block}\n.cb{width:18px;height:18px;border:2px solid #cbd2dc;border-radius:5px;flex:none;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;transition:.2s}\n.item.ok .cb{background:var(--ok,#16a34a);border-color:var(--ok,#16a34a)}\n.item.ok{color:#9aa3af;text-decoration:line-through}\n.next{font-size:12px;color:var(--pc,#2f6bff);margin-top:6px}\n.done{display:none;color:#16a34a;font-size:13px;font-weight:700;margin-top:8px}\n</style></head><body>\n<div class=\"box\" id=\"box\">\n  <div class=\"ttl\">新手入门</div>\n  <div class=\"pbar\"><div class=\"pfill\" id=\"pf\"></div></div>\n  <div class=\"item\" data-t=\"0\"><span class=\"cb\">✓</span><span>完善个人资料</span></div>\n  <div class=\"item\" data-t=\"1\"><span class=\"cb\">✓</span><span>关注 3 个话题</span></div>\n  <div class=\"item\" data-t=\"2\"><span class=\"cb\">✓</span><span>发布第一条动态</span></div>\n  <div class=\"item\" data-t=\"3\"><span class=\"cb\">✓</span><span>邀请一位好友</span></div>\n  <div class=\"next\" id=\"next\">下一项：完善个人资料</div>\n  <div class=\"done\">全部完成，欢迎上车 🎉</div>\n</div>\n<script>\nconst items=[...document.querySelectorAll('.item')];\nconst pf=document.getElementById('pf'),next=document.getElementById('next'),box=document.getElementById('box');\nconst state={pc:'#2f6bff',ok:'#16a34a',auto:true};\nfunction applyStyle(){document.documentElement.style.setProperty('--pc',state.pc);document.documentElement.style.setProperty('--ok',state.ok);}\nfunction refresh(){const done=items.filter(it=>it.classList.contains('ok')).length;pf.style.width=(done/items.length*100)+'%';const nx=items.find(it=>!it.classList.contains('ok'));next.textContent=nx?('下一项：'+nx.lastChild.textContent.trim()):'';if(done===items.length)box.classList.add('done');else box.classList.remove('done');}\nitems.forEach(it=>{it.onclick=()=>{if(state.auto){it.classList.toggle('ok');refresh();}};});\napplyStyle();refresh();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['pc','ok','auto'].includes(d.key)){if(d.key==='auto'&&!state.auto)items.forEach(it=>it.classList.remove('ok'));applyStyle();refresh();}});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v201",
  标题: "情境提示",
  分类: "组件",
  子类: "新手引导",
  风格: ["通用","信息型"],
  场景: ["全站通用"],
  元素: ["反馈","动效"],
  搭配: ["操作指引标注","热点提示"],
  标签: ["新手引导","情境提示","状态触发","自动收起"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/情境提示.html",
  参数: [{"键":"hl","名":"提示主色","类型":"color","默认":"#2f6bff"},{"键":"text","名":"提示文案","类型":"string","默认":"昵称不能为空"},{"键":"dur","名":"退场时长","类型":"slider","默认":0.3,"最小":0.15,"最大":0.6,"单位":"秒"}],
  效果说明: "构图笔记：提示跟着「当前出错/未满足的状态」出现，紧贴相关操作，问题解决后自动消失——不在无关时刻打扰，也不残留。\n能怎么改：触发条件写成可判定状态（如字段为空）；位置跟随目标元素；解决即收起，别等用户手动关。",
  用法: "表单校验、权限不足、条件未满足等场景：进入特定状态时在相关元素旁弹出提示，状态恢复后自动收起。",
  提示词: "请生成一个「情境提示」组件。必须明确四件事：\n1) 出现时机：仅当用户进入某个特定状态（如必填项留空、点击提交）才触发，不在页面加载时无故弹出。\n2) 指向目标：提示紧跟当前操作的元素旁，说明「为什么不行 / 该怎么做」。\n3) 操作后切换：用户按提示修正（如填入内容）后，提示平滑退场；若再次进入该状态可重新出现。\n4) 完成状态：相关状态解除即自动收起，不留常驻红点，不要求用户手动关闭。\n\n关键参数：\n- hl 提示主色 / text 提示文案 / dur 退场时长\n集成步骤：\n1. 复制 assets/demos/情境提示.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把触发条件换成你表单/状态的真实校验规则",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>情境提示演示</title>\n<style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px}\n.field{position:relative;width:260px}\n.inp{width:100%;padding:12px 14px;border:1.5px solid #d7dce3;border-radius:10px;font-size:14px;outline:none;transition:.2s}\n.inp.bad{border-color:#ef4444}\n.tip{position:absolute;left:0;top:46px;background:#fff;border:1px solid #fecaca;color:#b91c1c;font-size:12px;padding:7px 10px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.12);opacity:0;transform:translateY(-4px);transition:.25s;pointer-events:none;z-index:3}\n.tip.on{opacity:1;transform:none}\n.sub{background:var(--hl,#2f6bff);color:#fff;border:none;border-radius:10px;padding:11px 22px;font-size:14px;cursor:pointer}\n</style></head><body>\n<div class=\"field\"><input class=\"inp\" id=\"inp\" placeholder=\"请输入昵称\"><div class=\"tip\" id=\"tip\">昵称不能为空</div></div>\n<button class=\"sub\" id=\"sub\">保存</button>\n<script>\nconst inp=document.getElementById('inp'),tip=document.getElementById('tip'),sub=document.getElementById('sub');\nconst state={hl:'#2f6bff',text:'昵称不能为空',dur:.3};\nfunction applyStyle(){document.documentElement.style.setProperty('--hl',state.hl);tip.textContent=state.text;sub.style.background=state.hl;tip.style.transition='opacity '+state.dur+'s ease,transform '+state.dur+'s ease';}\nfunction check(){if(inp.value.trim()===''){inp.classList.add('bad');tip.classList.add('on');}else{inp.classList.remove('bad');tip.classList.remove('on');}}\nsub.onclick=check;inp.addEventListener('input',()=>{if(inp.value.trim()!==''){inp.classList.remove('bad');tip.classList.remove('on');}});\napplyStyle();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['hl','text','dur'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v202",
  标题: "热点提示",
  分类: "组件",
  子类: "新手引导",
  风格: ["通用","轻盈"],
  场景: ["全站通用","后台·控制台"],
  元素: ["反馈","动效"],
  搭配: ["情境提示","操作指引标注"],
  标签: ["新手引导","热点提示","呼吸点","未读"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/热点提示.html",
  参数: [{"键":"dc","名":"提示点色","类型":"color","默认":"#f59e0b"},{"键":"freq","名":"呼吸频率","类型":"slider","默认":1.6,"最小":0.8,"最大":3,"单位":"秒"},{"键":"dir","名":"展开方向","类型":"select","默认":"right","选项":["right","left"]},{"键":"pw","名":"面板宽度","类型":"slider","默认":200,"最小":160,"最大":280,"单位":"px"},{"键":"read","名":"已读色","类型":"color","默认":"#9ca3af"},{"键":"text","名":"说明文案","类型":"string","默认":"新功能：一键生成周报，省时 80%"}],
  效果说明: "构图笔记：刚上线的功能不必逼用户立刻学，用入口旁的呼吸点「轻轻招手」，点了才展开，读了就变灰——既提醒又不打断。\n能怎么改：呼吸点用强调色+缓动；展开面板放说明或快捷操作；阅读后清除未读态，避免长期红点疲劳。",
  用法: "新功能/非紧急更新提醒：功能入口旁放呼吸提示点，点击展开说明或快捷操作，用户查看后转为已读态。",
  提示词: "请生成一个「热点提示」组件。必须明确四件事：\n1) 出现时机：有新功能上线但无需立刻学习时，在功能入口旁显示带呼吸效果的提示点，不弹窗不打断。\n2) 指向目标：提示点紧贴对应功能入口，呼吸动画吸引余光注意。\n3) 操作后切换：用户点击提示点后展开说明面板（或快捷操作）；再点「知道了」收起。\n4) 完成状态：用户查看后提示点转为已读态（变色/停止呼吸），清除未读标记，不再重复提醒。\n\n关键参数：\n- dc 提示点色 / freq 呼吸频率 / dir 展开方向 / pw 面板宽度 / read 已读色 / text 说明文案\n集成步骤：\n1. 复制 assets/demos/热点提示.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把呼吸提示点挂到新功能入口旁",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>热点提示演示</title>\n<style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}\n.wrap{position:relative;display:inline-flex;align-items:center;gap:8px;padding:16px 20px;border:1px solid #e5e7eb;border-radius:12px;font-size:14px;color:#333}\n.dot{position:relative;width:10px;height:10px;border-radius:50%;background:var(--dc,#f59e0b);cursor:pointer;flex:none}\n.dot.unread::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--dc,#f59e0b);animation:breathe var(--freq,1.6s) ease-out infinite}\n@keyframes breathe{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.6);opacity:0}}\n.panel{position:absolute;left:30px;top:-6px;width:200px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:12px;font-size:12px;color:#444;box-shadow:0 8px 24px rgba(0,0,0,.16);opacity:0;transform:translateX(-6px);transition:.3s;pointer-events:none;z-index:4}\n.panel.on{opacity:1;transform:none;pointer-events:auto}\n.panel button{margin-top:8px;background:var(--dc,#f59e0b);color:#fff;border:none;border-radius:7px;padding:5px 10px;font-size:12px;cursor:pointer}\n</style></head><body>\n<div class=\"wrap\"><span>AI 智能总结</span><span class=\"dot unread\" id=\"dot\"></span>\n<div class=\"panel\" id=\"panel\"><div id=\"pt\">新功能：一键生成周报，省时 80%</div><button id=\"got\">知道了</button></div></div>\n<script>\nconst dot=document.getElementById('dot'),panel=document.getElementById('panel'),got=document.getElementById('got'),pt=document.getElementById('pt');\nconst state={dc:'#f59e0b',freq:1.6,dir:'right',pw:200,read:'#9ca3af',text:'新功能：一键生成周报，省时 80%'};\nfunction applyStyle(){document.documentElement.style.setProperty('--dc',state.dc);panel.style.width=state.pw+'px';pt.textContent=state.text;panel.style.left=(state.dir==='right'?'30px':'-'+ (state.pw+14) +'px');dot.style.setProperty('--freq',state.freq+'s');}\ndot.onclick=()=>{panel.classList.toggle('on');};\ngot.onclick=()=>{panel.classList.remove('on');dot.classList.remove('unread');dot.style.background=state.read;};\napplyStyle();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['dc','freq','dir','pw','read','text'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v203",
  标题: "操作指引标注",
  分类: "组件",
  子类: "新手引导",
  风格: ["通用","轻盈"],
  场景: ["全站通用","工具·SaaS"],
  元素: ["反馈","构成"],
  搭配: ["情境提示","热点提示"],
  标签: ["新手引导","操作指引","箭头","tooltip"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/操作指引标注.html",
  参数: [{"键":"bc","名":"按钮底色","类型":"color","默认":"#1a1a1a"},{"键":"ac","名":"指引主色","类型":"color","默认":"#2f6bff"},{"键":"pos","名":"箭头位置","类型":"select","默认":"top","选项":["top","bottom","left","right"]},{"键":"text","名":"指引文案","类型":"string","默认":"点这里可导出本页数据"},{"键":"radius","名":"气泡圆角","类型":"slider","默认":10,"最小":4,"最大":20,"单位":"px"}],
  效果说明: "构图笔记：用箭头把视线「钉」在目标上，比纯文字更直给；提示是非模态的，用户点「明白了」就收起，背后操作始终可点。\n能怎么改：箭头方向按目标位置自动选上下左右；文案一句话说清动作；收起后不残留遮罩，不打断其他操作。",
  用法: "单一操作的教学：在目标元素旁用带箭头的气泡指明「点这里」，点「明白了」后收起，气泡不遮挡页面其他可点区域。",
  提示词: "请生成一个「操作指引标注」组件。必须明确四件事：\n1) 出现时机：需要教用户某个具体按钮/入口怎么用时出现，通常只在首次或特定引导流程中。\n2) 指向目标：用箭头明确指向目标元素，气泡写一句话说明动作（如「点这里导出」）。\n3) 操作后切换：用户点「明白了」后气泡收起；气泡是非模态的，收起前背后的目标与其他操作仍可点击。\n4) 完成状态：收起后不残留半透明遮罩，不挡住页面其他功能；同一用户不重复弹出同一条。\n\n关键参数：\n- bc 按钮底色 / ac 指引主色 / pos 箭头位置 / text 指引文案 / radius 气泡圆角\n集成步骤：\n1. 复制 assets/demos/操作指引标注.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把箭头指向你的目标按钮并改文案",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>操作指引标注演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px}\n.btn{background:var(--bc,#1a1a1a);color:#fff;border:none;border-radius:10px;padding:14px 26px;font-size:14px;cursor:pointer;position:relative}\n.coach{position:absolute;background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:10px 12px;width:200px;font-size:13px;color:#222;box-shadow:0 8px 24px rgba(0,0,0,.16);opacity:0;transition:.3s;z-index:5;pointer-events:auto}\n.coach.on{opacity:1}\n.arrow{position:absolute;width:10px;height:10px;background:#fff;border-left:1px solid #e5e7eb;border-top:1px solid #e5e7eb;transform:rotate(45deg);z-index:6}\n.coach button{margin-top:8px;background:var(--ac,#2f6bff);color:#fff;border:none;border-radius:7px;padding:5px 12px;font-size:12px;cursor:pointer}\n</style></head><body>\n<button class=\"btn\" id=\"btn\">导出报表</button>\n<div class=\"coach\" id=\"coach\"><span id=\"ct\">点这里可导出本页数据</span><div class=\"arrow\" id=\"ar\"></div><button id=\"ok\">明白了</button></div>\n<script>\nconst btn=document.getElementById('btn'),coach=document.getElementById('coach'),ar=document.getElementById('ar'),ok=document.getElementById('ok'),ct=document.getElementById('ct');\nconst state={bc:'#1a1a1a',ac:'#2f6bff',pos:'top',text:'点这里可导出本页数据',radius:10};\nfunction applyStyle(){document.documentElement.style.setProperty('--bc',state.bc);document.documentElement.style.setProperty('--ac',state.ac);coach.style.borderRadius=state.radius+'px';ct.textContent=state.text;place();}\nfunction place(){const b=btn.getBoundingClientRect();let cl,ctop,al,at;\n if(state.pos==='top'){cl=b.left+(b.width-200)/2;ctop=b.top-90;al=98;at=6;}\n else if(state.pos==='bottom'){cl=b.left+(b.width-200)/2;ctop=b.top+b.height+14;al=98;at=-6;}\n else if(state.pos==='left'){cl=b.left-214;ctop=b.top-10;al=200;at=16;}\n else{cl=b.left+b.width+14;ctop=b.top-10;al=0;at=16;}\n coach.style.left=cl+'px';coach.style.top=ctop+'px';ar.style.left=al+'px';ar.style.top=at+'px';ar.style.borderLeft=state.pos==='right'?'none':'1px solid #e5e7eb';ar.style.borderTop=state.pos==='bottom'?'none':'1px solid #e5e7eb';ar.style.borderRight=state.pos==='right'?'1px solid #e5e7eb':'none';ar.style.borderBottom=state.pos==='bottom'?'1px solid #e5e7eb':'none';}\nok.onclick=()=>coach.classList.remove('on');\napplyStyle();coach.classList.add('on');\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['bc','ac','pos','text','radius'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v204",
  标题: "连贯展开",
  分类: "动效",
  子类: "提示动效",
  风格: ["通用","轻盈"],
  场景: ["全站通用","移动端·H5"],
  元素: ["动效","构成"],
  搭配: ["热点提示","动态消失"],
  标签: ["提示动效","连贯展开","红点","FLIP"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/连贯展开.html",
  参数: [{"键":"rc","名":"红点色","类型":"color","默认":"#ef4444"},{"键":"dir","名":"展开方向","类型":"select","默认":"bottom-right","选项":["bottom-right","bottom-left","top"]},{"键":"dur","名":"展开时长","类型":"slider","默认":0.35,"最小":0.2,"最大":0.8,"单位":"秒"},{"键":"pc","名":"面板底色","类型":"color","默认":"#ffffff"},{"键":"radius","名":"面板圆角","类型":"slider","默认":12,"最小":4,"最大":24,"单位":"px"}],
  效果说明: "构图笔记：提示内容从红点「长出来」，transform-origin 钉在锚点，用户能看出它从哪来，而不是凭空浮出——连续感来自「同源」。\n能怎么改：展开原点对齐红点位置；用轻微回弹缓动增强「弹出」手感；面板底色与正文对比，保证可读。",
  用法: "通知/红点类提示：点击红点后，提示内容以该点为原点缩放展开，避免突兀出现。",
  提示词: "生成一个「连贯展开」动效：点击红点后，提示面板以红点位置为 transform-origin 缩放展开（不要从屏幕中央凭空出现），用轻微回弹缓动增强弹出手感；收起时原路缩回。\n\n关键参数：\n- rc 红点色 / dir 展开方向 / dur 展开时长 / pc 面板底色 / radius 面板圆角\n集成步骤：\n1. 复制 assets/demos/连贯展开.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把红点锚点换成你的通知/消息入口",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>连贯展开演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;gap:20px;padding:24px}\n.bell{position:relative;width:46px;height:46px;border-radius:50%;background:#f4f5f7;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer}\n.red{position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;background:var(--rc,#ef4444);border:2px solid #fff}\n.pop{position:absolute;top:54px;left:0;width:220px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:12px;font-size:13px;color:#333;box-shadow:0 10px 30px rgba(0,0,0,.18);transform-origin:top left;transform:scale(.2);opacity:0;transition:transform .35s cubic-bezier(.34,1.4,.5,1),opacity .25s;z-index:4}\n.pop.on{transform:scale(1);opacity:1}\n</style></head><body>\n<div class=\"bell\" id=\"bell\">🔔<span class=\"red\" id=\"red\"></span><div class=\"pop\" id=\"pop\">你有 3 条新消息，点击查看详情</div></div>\n<script>\nconst bell=document.getElementById('bell'),pop=document.getElementById('pop'),red=document.getElementById('red');\nconst state={rc:'#ef4444',dir:'bottom-right',dur:.35,pc:'#ffffff',radius:12};\nfunction applyStyle(){red.style.background=state.rc;pop.style.borderRadius=state.radius+'px';pop.style.background=state.pc;pop.style.transition='transform '+state.dur+'s cubic-bezier(.34,1.4,.5,1),opacity '+state.dur+'s ease';pop.style.transformOrigin=state.dir==='bottom-right'?'top left':(state.dir==='bottom-left'?'top right':'top center');}\nbell.onclick=()=>pop.classList.toggle('on');\napplyStyle();pop.classList.add('on');\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['rc','dir','dur','pc','radius'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v205",
  标题: "平滑进退场",
  分类: "动效",
  子类: "提示动效",
  风格: ["通用","信息型"],
  场景: ["全站通用"],
  元素: ["动效","反馈"],
  搭配: ["连贯展开","有序堆叠"],
  标签: ["提示动效","进退场","位移","透明度"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/平滑进退场.html",
  参数: [{"键":"bc","名":"提示底色","类型":"color","默认":"#323232"},{"键":"inY","名":"进场位移","类型":"slider","默认":16,"最小":4,"最大":40,"单位":"px"},{"键":"enter","名":"进场时长","类型":"slider","默认":0.4,"最小":0.2,"最大":0.8,"单位":"秒"},{"键":"stay","名":"停留时长","类型":"slider","默认":1.8,"最小":0.6,"最大":3,"单位":"秒"},{"键":"exit","名":"退场时长","类型":"slider","默认":0.4,"最小":0.2,"最大":0.8,"单位":"秒"},{"键":"ease","名":"缓动","类型":"select","默认":"ease","选项":["ease","ease-out","cubic-bezier(.34,1.56,.64,1)"]}],
  效果说明: "构图笔记：进场用「位移+透明度」双通道，退场同手法反向，停留足够时间再走——进退对称才显得「有序」而非闪现。\n能怎么改：进场位移别太大（12–20px 最稳）；停留时长按文案阅读量定；退场比进场略快，收尾利落。",
  用法: "轻量提示/toast：从下方位移+淡入，停留后平滑淡出，循环演示。",
  提示词: "生成一个「平滑进退场」动效：提示从下方以位移+透明度淡入，停留足够阅读时间后平滑淡出；进退用同一缓动方向对称，退场可略快于进场。\n\n关键参数：\n- bc 提示底色 / inY 进场位移 / enter 进场时长 / stay 停留时长 / exit 退场时长 / ease 缓动\n集成步骤：\n1. 复制 assets/demos/平滑进退场.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. toast 文案与停留时长按内容调整",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>平滑进退场演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}\n.toast{background:var(--bc,#323232);color:#fff;padding:12px 18px;border-radius:10px;font-size:13px;box-shadow:0 8px 24px rgba(0,0,0,.2);opacity:0;transform:translateY(var(--in,16px));transition:opacity .4s ease,transform .4s ease}\n.toast.on{opacity:1;transform:translateY(0)}\n</style></head><body>\n<div class=\"toast\" id=\"t\">已保存草稿</div>\n<script>\nconst t=document.getElementById('t');\nconst state={bc:'#323232',inY:16,enter:.4,stay:1.8,exit:.4,ease:'ease'};\nfunction applyStyle(){t.style.background=state.bc;t.style.transition='opacity '+state.enter+'s '+state.ease+',transform '+state.enter+'s '+state.ease;document.documentElement.style.setProperty('--in',state.inY+'px');}\nfunction loop(){t.classList.add('on');setTimeout(()=>{t.classList.remove('on');setTimeout(loop,(state.exit+state.stay)*1000);},(state.enter+state.stay)*1000);}\napplyStyle();loop();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['bc','inY','enter','stay','exit','ease'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v206",
  标题: "有序堆叠",
  分类: "动效",
  子类: "提示动效",
  风格: ["通用","轻盈"],
  场景: ["全站通用","移动端·H5"],
  元素: ["动效","构成"],
  搭配: ["平滑进退场","动态消失"],
  标签: ["提示动效","堆叠","通知队列","交替"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/有序堆叠.html",
  参数: [{"键":"bc","名":"卡片底色","类型":"color","默认":"#ffffff"},{"键":"ac","名":"强调色","类型":"color","默认":"#2f6bff"},{"键":"max","名":"同屏上限","类型":"slider","默认":3,"最小":2,"最大":5,"单位":"条"},{"键":"gap","名":"堆叠间距","类型":"slider","默认":14,"最小":6,"最大":28,"单位":"px"},{"键":"stay","名":"停留时长","类型":"slider","默认":1.4,"最小":0.6,"最大":3,"单位":"秒"}],
  效果说明: "构图笔记：多条提示排队，新来的进场前旧的下移让位——「先让位再出场」避免重叠打架，顺序感来自明确的先后。\n能怎么改：同屏上限 2–4 条；堆叠用位移+轻微缩放表现纵深；旧提示退场先于新提示进场。",
  用法: "通知队列：新提示从顶部进场，已有提示依次下移堆叠，超上限的最旧一条先退场。",
  提示词: "生成一个「有序堆叠」动效：多条通知排队出现，新提示进场前已有提示先下移让位（先让位再出场，避免重叠），同屏保留 2–4 条，超出则最旧一条先退场。\n\n关键参数：\n- bc 卡片底色 / ac 强调色 / max 同屏上限 / gap 堆叠间距 / stay 停留时长\n集成步骤：\n1. 复制 assets/demos/有序堆叠.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把通知数据换成你的消息源",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>有序堆叠演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px}\n.stack{position:relative;width:240px;height:160px}\n.n{position:absolute;left:0;width:240px;background:var(--bc,#fff);border:1px solid #e5e7eb;border-left:4px solid var(--ac,#2f6bff);border-radius:10px;padding:12px;font-size:13px;color:#333;box-shadow:0 6px 18px rgba(0,0,0,.1);transition:transform .4s ease,opacity .4s ease;opacity:0}\n.n.show{opacity:1}\n</style></head><body>\n<div class=\"stack\" id=\"stack\"></div>\n<script>\nconst stack=document.getElementById('stack');\nconst state={bc:'#ffffff',ac:'#2f6bff',max:3,gap:14,stay:1.4};\nconst msgs=['有人点赞了你的动态','新评论：讲得真好','关注了你','你的帖子上了热门','收到一条私信'];\nlet q=[],n=0;\nfunction applyStyle(){document.documentElement.style.setProperty('--bc',state.bc);document.documentElement.style.setProperty('--ac',state.ac);}\nfunction render(){const vis=stack.children;for(let k=0;k<vis.length;k++){const el=vis[k];const idx=vis.length-1-k;el.style.transform='translateY('+(idx*state.gap)+'px) scale('+(1-idx*0.03)+')';el.style.opacity=idx<state.max?1:0;el.classList.add('show');}}\nfunction push(){const el=document.createElement('div');el.className='n';el.textContent=msgs[n%msgs.length];n++;stack.appendChild(el);while(stack.children.length>state.max+1)stack.removeChild(stack.firstChild);render();setTimeout(()=>{if(stack.children.length>state.max){stack.removeChild(stack.firstChild);render();}},state.stay*1000);}\napplyStyle();let timer=setInterval(push,state.stay*1000);push();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['bc','ac','max','gap','stay'].includes(d.key)){applyStyle();clearInterval(timer);timer=setInterval(push,state.stay*1000);}});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v207",
  标题: "可视化倒计时",
  分类: "动效",
  子类: "提示动效",
  风格: ["通用","科技"],
  场景: ["全站通用","后台·控制台"],
  元素: ["动效","构成","反馈"],
  搭配: ["明确进度","平滑进退场"],
  标签: ["提示动效","倒计时","环形进度","剩余时间"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/可视化倒计时.html",
  参数: [{"键":"sec","名":"倒计时秒数","类型":"slider","默认":10,"最小":3,"最大":30,"单位":"秒"},{"键":"cc","名":"环色","类型":"color","默认":"#2f6bff"},{"键":"tc","名":"文字色","类型":"color","默认":"#222"},{"键":"bg","名":"轨道色","类型":"color","默认":"#eef0f3"},{"键":"r","名":"半径","类型":"slider","默认":52,"最小":40,"最大":60,"单位":"px"}],
  效果说明: "构图笔记：把「还剩多久」做成环上消逝的弧，数字+弧双通道，剩余时间肉眼可读，比纯文字「10秒后关闭」更紧迫也更友好。\n能怎么改：弧用主色、轨道用浅灰保证对比；最后一两秒可加速或变红预警；数字与环同心对齐。",
  用法: "限时操作/自动关闭提示：环形进度随剩余时间递减，中心显示秒数。",
  提示词: "生成一个「可视化倒计时」动效：用环形进度弧随剩余时间递减，中心显示秒数，剩余时间直观可见；最后阶段可变色预警。\n\n关键参数：\n- sec 倒计时秒数 / cc 环色 / tc 文字色 / bg 轨道色 / r 半径\n集成步骤：\n1. 复制 assets/demos/可视化倒计时.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 倒计时秒数按你的限时场景设定",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>可视化倒计时演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}\n.wrap{position:relative;width:120px;height:120px}\nsvg{transform:rotate(-90deg)}\n.bg{fill:none;stroke:#eef0f3;stroke-width:10}\n.fg{fill:none;stroke:var(--cc,#2f6bff);stroke-width:10;stroke-linecap:round;transition:stroke-dashoffset 1s linear}\n.num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:26px;color:var(--tc,#222);font-weight:700}\n</style></head><body>\n<div class=\"wrap\"><svg width=\"120\" height=\"120\"><circle class=\"bg\" cx=\"60\" cy=\"60\" r=\"52\"/><circle class=\"fg\" id=\"fg\" cx=\"60\" cy=\"60\" r=\"52\"/></svg><div class=\"num\" id=\"num\">10</div></div>\n<script>\nconst fg=document.getElementById('fg'),num=document.getElementById('num'),bgc=document.querySelector('.bg');\nconst state={sec:10,cc:'#2f6bff',tc:'#222',bg:'#eef0f3',r:52};\nlet left=state.sec,timer=0;const C=2*Math.PI*state.r;\nfunction applyStyle(){document.documentElement.style.setProperty('--cc',state.cc);document.documentElement.style.setProperty('--tc',state.tc);fg.style.strokeDasharray=C;bgc.style.stroke=state.bg;}\nfunction tick(){fg.style.strokeDasharray=C;fg.style.strokeDashoffset=C*(1-left/state.sec);num.textContent=left;if(left<=0){clearInterval(timer);return;}left--;}\nfunction start(){left=state.sec;clearInterval(timer);applyStyle();tick();timer=setInterval(tick,1000);}\napplyStyle();start();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['sec','cc','tc','bg','r'].includes(d.key))start();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v208",
  标题: "动态消失",
  分类: "动效",
  子类: "提示动效",
  风格: ["通用","轻盈"],
  场景: ["全站通用","移动端·H5"],
  元素: ["动效","反馈"],
  搭配: ["连贯展开","连锁更新"],
  标签: ["提示动效","动态消失","红点","散开"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/动态消失.html",
  参数: [{"键":"rc","名":"红点色","类型":"color","默认":"#ef4444"},{"键":"hc","名":"按钮色","类型":"color","默认":"#2f6bff"},{"键":"dur","名":"消失时长","类型":"slider","默认":0.4,"最小":0.2,"最大":0.8,"单位":"秒"},{"键":"shrink","名":"收缩比例","类型":"slider","默认":0,"最小":0,"最大":1,"单位":"比例"}],
  效果说明: "构图笔记：处理完通知后，红点沿原位置缩回再散掉，用户能确认「就是这条被消了」，而不是整片突然空掉——对应感来自「回原位」。\n能怎么改：缩回与透明度同步；散开可加微粒子；处理按钮给明确反馈后再消失。",
  用法: "通知已处理：点「处理」后红点缩回原位置并淡出，明确对应刚处理的条目。",
  提示词: "生成一个「动态消失」动效：用户处理某条通知后，其红点沿原位置缩放缩回再淡出（明确对应刚处理的条目），不要整组突然消失。\n\n关键参数：\n- rc 红点色 / hc 按钮色 / dur 消失时长 / shrink 收缩比例\n集成步骤：\n1. 复制 assets/demos/动态消失.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把红点绑到你要清除的条目上",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>动态消失演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px}\n.row{position:relative;display:flex;align-items:center;gap:10px;padding:12px 16px;border:1px solid #e5e7eb;border-radius:12px;font-size:13px;color:#333}\n.bell{position:relative;width:34px;height:34px;border-radius:50%;background:#f4f5f7;display:flex;align-items:center;justify-content:center;font-size:18px}\n.red{position:absolute;top:-2px;right:-2px;width:12px;height:12px;border-radius:50%;background:var(--rc,#ef4444);border:2px solid #fff;transition:transform .4s ease,opacity .4s ease}\n.red.gone{transform:scale(0);opacity:0}\n.handle{background:var(--hc,#2f6bff);color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:12px;cursor:pointer}\n</style></head><body>\n<div class=\"row\"><span class=\"bell\">🔔<span class=\"red\" id=\"red\"></span></span><span>系统通知</span><button class=\"handle\" id=\"hd\">处理</button></div>\n<script>\nconst red=document.getElementById('red'),hd=document.getElementById('hd');\nconst state={rc:'#ef4444',hc:'#2f6bff',dur:.4,shrink:0};\nfunction applyStyle(){red.style.background=state.rc;hd.style.background=state.hc;red.style.transition='transform '+state.dur+'s ease,opacity '+state.dur+'s ease';}\nhd.onclick=()=>{red.style.transform='scale('+state.shrink+')';red.classList.add('gone');setTimeout(()=>{red.classList.remove('gone');red.style.transform='scale(1)';},1400);};\napplyStyle();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['rc','hc','dur','shrink'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v209",
  标题: "角标过渡",
  分类: "动效",
  子类: "提示动效",
  风格: ["通用","轻盈"],
  场景: ["全站通用","后台·控制台"],
  元素: ["动效","构成"],
  搭配: ["连锁更新","可视化倒计时"],
  标签: ["提示动效","角标","数字翻转","badge"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/角标过渡.html",
  参数: [{"键":"bc","名":"底色","类型":"color","默认":"#f4f5f7"},{"键":"cc","名":"角标色","类型":"color","默认":"#ef4444"},{"键":"start","名":"起始数","类型":"slider","默认":5,"最小":0,"最大":20,"单位":"个"},{"键":"dir","名":"翻转方向","类型":"select","默认":"down","选项":["down","up"]},{"键":"dur","名":"翻转时长","类型":"slider","默认":0.35,"最小":0.2,"最大":0.8,"单位":"秒"}],
  效果说明: "构图笔记：角标数字变化用位移翻转，旧数字滑出、新数字滑入，周边元素不被挤歪——稳定感来自「原地换，不抖动布局」。\n能怎么改：翻转方向随增减（加往上、减往下）；用 overflow:hidden 裁切；时长 0.3s 左右最跟手。",
  用法: "角标数字变化：数字更新时以翻转过渡，避免直接替换导致布局跳动。",
  提示词: "生成一个「角标过渡」动效：角标数字变化时用位移翻转（旧数滑出、新数滑入），容器 overflow 隐藏，周边元素不被挤歪；增减可决定翻转方向。\n\n关键参数：\n- bc 底色 / cc 角标色 / start 起始数 / dir 翻转方向 / dur 翻转时长\n集成步骤：\n1. 复制 assets/demos/角标过渡.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把角标数字接到你的未读计数",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>角标过渡演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px}\n.badge{position:relative;background:var(--bc,#f4f5f7);border-radius:10px;padding:14px 20px;font-size:14px;color:#333}\n.b{position:absolute;top:-8px;right:-8px;min-width:22px;height:22px;padding:0 5px;background:var(--cc,#ef4444);color:#fff;border-radius:11px;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff;overflow:hidden}\n.flip{display:inline-block;transition:transform var(--fdur,.35s) ease}\n.flip.go{transform:translateY(var(--fd,-100%));opacity:0}\n.controls{display:flex;gap:10px}\nbutton{background:var(--cc,#ef4444);color:#fff;border:none;border-radius:8px;padding:8px 14px;font-size:12px;cursor:pointer}\n</style></head><body>\n<div class=\"badge\">消息<span class=\"b\"><span class=\"flip\" id=\"flip\">5</span></span></div>\n<div class=\"controls\"><button id=\"dec\">-1</button><button id=\"inc\">+1</button></div>\n<script>\nconst flip=document.getElementById('flip');\nconst state={bc:'#f4f5f7',cc:'#ef4444',start:5,dir:'down',dur:.35};\nlet v=state.start;\nfunction applyStyle(){document.documentElement.style.setProperty('--bc',state.bc);document.documentElement.style.setProperty('--cc',state.cc);document.documentElement.style.setProperty('--fdur',state.dur+'s');document.documentElement.style.setProperty('--fd',state.dir==='up'?'100%':'-100%');}\nfunction set(n){flip.classList.add('go');setTimeout(()=>{flip.textContent=n;flip.classList.remove('go');},180);}\ndocument.getElementById('dec').onclick=()=>{v=Math.max(0,v-1);set(v);};\ndocument.getElementById('inc').onclick=()=>{v=Math.min(99,v+1);set(v);};\napplyStyle();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['bc','cc','start','dir','dur'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v210",
  标题: "横幅联动",
  分类: "动效",
  子类: "提示动效",
  风格: ["通用","信息型"],
  场景: ["全站通用","移动端·H5"],
  元素: ["动效","构成"],
  搭配: ["平滑进退场","状态栏"],
  标签: ["提示动效","横幅","联动","下移"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/横幅联动.html",
  参数: [{"键":"cc","名":"横幅色","类型":"color","默认":"#2f6bff"},{"键":"bh","名":"横幅高","类型":"slider","默认":40,"最小":24,"最大":80,"单位":"px"},{"键":"h","名":"联动时长","类型":"slider","默认":0.4,"最小":0.2,"最大":0.8,"单位":"秒"},{"键":"text","名":"横幅文案","类型":"string","默认":"新版本已发布，点击查看更新内容"}],
  效果说明: "构图笔记：顶部横幅从状态栏下方挤下来时，页面内容同步下移让位，二者同缓动、同节奏——联动感来自「一起动，不遮挡」。\n能怎么改：横幅高度固定、内容平移量等于其高度；收起时页面回弹复位；联动时长与横幅展开一致。",
  用法: "全局公告/版本提示：横幅出现时下方页面整体下移让出空间，收起后回弹。",
  提示词: "生成一个「横幅联动」动效：顶部横幅从状态栏下方挤下时，下方页面内容同步下移让出空间（平移量=横幅高），收起时回弹复位，二者同缓动。\n\n关键参数：\n- cc 横幅色 / bh 横幅高 / h 联动时长 / text 横幅文案\n集成步骤：\n1. 复制 assets/demos/横幅联动.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把横幅文案与高度按你的公告定",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>横幅联动演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;overflow:hidden}\n.status{height:28px;background:#f4f5f7;color:#888;font-size:12px;display:flex;align-items:center;justify-content:center}\n.banner{position:fixed;top:28px;left:0;right:0;height:0;background:var(--cc,#2f6bff);color:#fff;font-size:13px;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:height .4s ease;z-index:10}\n.banner.on{height:40px}\n.page{transition:transform .4s ease;padding:30px;color:#444;font-size:14px;line-height:1.8}\n.controls{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:10px}\nbutton{background:var(--cc,#2f6bff);color:#fff;border:none;border-radius:8px;padding:9px 16px;font-size:13px;cursor:pointer}\n</style></head><body>\n<div class=\"status\">状态栏</div>\n<div class=\"banner\" id=\"bn\">新版本已发布，点击查看更新内容</div>\n<div class=\"page\" id=\"pg\">新版本已经发布，带来了更快的加载速度、更稳定的同步能力，以及全新的主题外观。<br>我们会持续打磨细节，让每一次使用都更顺手。感谢你的支持。</div>\n<div class=\"controls\"><button id=\"tg\">切换横幅</button></div>\n<script>\nconst bn=document.getElementById('bn'),pg=document.getElementById('pg');\nconst state={cc:'#2f6bff',bh:40,h:.4,text:'新版本已发布，点击查看更新内容'};\nfunction applyStyle(){document.documentElement.style.setProperty('--cc',state.cc);bn.textContent=state.text;bn.style.transition='height '+state.h+'s ease';pg.style.transition='transform '+state.h+'s ease';}\nfunction toggle(on){bn.classList.toggle('on',on);pg.style.transform='translateY('+(on?state.bh:0)+'px)';}\ndocument.getElementById('tg').onclick=()=>toggle(!bn.classList.contains('on'));\napplyStyle();toggle(true);\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['cc','bh','h','text'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v211",
  标题: "连锁更新",
  分类: "动效",
  子类: "提示动效",
  风格: ["通用","科技"],
  场景: ["全站通用","后台·控制台"],
  元素: ["动效","反馈","构成"],
  搭配: ["角标过渡","动态消失"],
  标签: ["提示动效","连锁更新","数字同步","分组"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（六种新手引导组件 / 提示动效设计，2026-09-15 入库，v 前缀=视频拆解）；观察通用交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/连锁更新.html",
  参数: [{"键":"pc","名":"主色","类型":"color","默认":"#2f6bff"},{"键":"g0","名":"评论组数","类型":"slider","默认":3,"最小":0,"最大":8,"单位":"条"},{"键":"g1","名":"私信组数","类型":"slider","默认":2,"最小":0,"最大":8,"单位":"条"}],
  效果说明: "构图笔记：处理单条通知，分组计数与顶部总数同步 -1 并轻微脉冲，用户看到「全局在变」而非只改一处——一致感来自「联动更新」。\n能怎么改：更新时数字带脉冲动画；分组与顶部用同色强调；处理动画与数字变化同帧触发。",
  用法: "分组通知：处理一条时，所属分组计数与顶部总数同步递减并脉冲提示。",
  提示词: "生成一个「连锁更新」动效：处理单条通知时，其所属分组的计数与顶部总计数同步 -1，并带轻微脉冲动画，让用户感知全局在更新。\n\n关键参数：\n- pc 主色 / g0 评论组数 / g1 私信组数\n集成步骤：\n1. 复制 assets/demos/连锁更新.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把分组与总数接到你的通知数据结构",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>连锁更新演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px}\n.top{font-size:13px;color:#333}#total{font-weight:700;color:var(--pc,#2f6bff)}\n.grp{width:240px;border:1px solid #e5e7eb;border-radius:12px;padding:12px}\n.ghead{display:flex;justify-content:space-between;font-size:13px;color:#444;margin-bottom:8px}\n.gc{font-weight:700;color:var(--pc,#2f6bff)}\n.item{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-top:1px solid #f1f2f4;font-size:12px;color:#555}\n.go{background:var(--pc,#2f6bff);color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer}\n.pulse{animation:p .4s ease}\n@keyframes p{0%{transform:scale(1)}40%{transform:scale(1.35)}100%{transform:scale(1)}}\n</style></head><body>\n<div class=\"top\">总未读：<span id=\"total\">0</span></div>\n<div class=\"grp\" id=\"g0\"><div class=\"ghead\"><span>评论</span><span class=\"gc\" id=\"c0\">0</span></div><div id=\"l0\"></div></div>\n<div class=\"grp\" id=\"g1\"><div class=\"ghead\"><span>私信</span><span class=\"gc\" id=\"c1\">0</span></div><div id=\"l1\"></div></div>\n<script>\nconst state={pc:'#2f6bff',g0:3,g1:2};\nconst groups=[{c:document.getElementById('c0'),l:document.getElementById('l0'),n:state.g0},{c:document.getElementById('c1'),l:document.getElementById('l1'),n:state.g1}];\nfunction applyStyle(){document.documentElement.style.setProperty('--pc',state.pc);}\nfunction build(){groups[0].n=state.g0;groups[1].n=state.g1;const total=groups[0].n+groups[1].n;document.getElementById('total').textContent=total;groups.forEach((g,gi)=>{g.c.textContent=g.n;g.l.innerHTML='';for(let k=0;k<g.n;k++){const row=document.createElement('div');row.className='item';row.innerHTML='<span>条目 '+(k+1)+'</span><button class=\"go\">处理</button>';row.querySelector('.go').onclick=()=>handle(gi);g.l.appendChild(row);}});}\nfunction pulse(el){el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse');}\nfunction handle(gi){if(groups[gi].n>0){groups[gi].n--;build();pulse(groups[gi].c);pulse(document.getElementById('total'));}}\napplyStyle();build();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['pc','g0','g1'].includes(d.key)){applyStyle();build();}});\n<\/script></body></html>",
  复用记录: "",
}
,
{
  id: "v212",
  标题: "底部导航栏",
  分类: "组件",
  子类: "移动端控件",
  风格: ["通用","iOS原生"],
  场景: ["移动端·H5"],
  元素: ["构成","反馈","动效"],
  搭配: ["分段控件","底部抽屉面板"],
  标签: ["底部导航","Tab栏","入口切换","高亮"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（七种常见手机控件的定义与描述方法，2026-09-15 入库，v 前缀=视频拆解）；观察通用移动端交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/底部导航栏.html",
  参数: [{"键":"ac","名":"选中色","类型":"color","默认":"#2f6bff"},{"键":"off","名":"未选色","类型":"color","默认":"#9aa0a6"},{"键":"ih","名":"指示条高","类型":"slider","默认":3,"最小":1,"最大":8,"单位":"px"},{"键":"radius","名":"栏圆角","类型":"slider","默认":14,"最小":0,"最大":28,"单位":"px"},{"键":"dur","名":"切换时长","类型":"slider","默认":0.3,"最小":0.15,"最大":0.6,"单位":"秒"},{"键":"fs","名":"标签字号","类型":"slider","默认":12,"最小":10,"最大":16,"单位":"px"},{"键":"isz","名":"图标尺寸","类型":"slider","默认":22,"最小":16,"最大":30,"单位":"px"},{"键":"bh","名":"栏高","类型":"slider","默认":60,"最小":48,"最大":80,"单位":"px"}],
  效果说明: "构图笔记：底部固定一条栏，放 3 个主要入口（首页/消息/我的），当前页用主色高亮 + 顶部小指示条，用户一眼知道「我在哪、能去哪」。\n能怎么改：入口数按真实功能定（3–5 个最稳）；指示条用主色强化当前态；切换带轻微位移缓动，别生硬瞬移。",
  用法: "APP 主框架：底部常驻导航栏，点击切换页面并高亮当前选项；与顶部分段控件、底部抽屉等搭配不走位。",
  提示词: "请生成一个「底部导航栏」手机控件。按三要素描述：\n① 控件名称：底部导航栏（Bottom Tab Bar），固定在屏幕底部。\n② 触发手势：用户点击底部某个入口图标/文字，即切换到对应页面。\n③ 展开结果：被点入口变主色高亮并显示顶部指示条，页面内容区切换到该入口视图，其余入口保持未选灰态；底部栏始终常驻不随页面消失。\n\n关键参数：\n- ac 选中色 / off 未选色 / ih 指示条高 / radius 栏圆角 / dur 切换时长 / fs 标签字号 / isz 图标尺寸 / bh 栏高\n集成步骤：\n1. 复制 assets/demos/底部导航栏.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把三个入口换成你的真实页面",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>底部导航栏演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}\n.phone{position:relative;width:280px;height:520px;background:#fff;border:9px solid #1c1c22;border-radius:34px;overflow:hidden}\n.screen{position:absolute;inset:0;background:#fff;display:flex;flex-direction:column}\n.content{flex:1;display:flex;align-items:center;justify-content:center;color:#555;font-size:15px}\n.bar{position:relative;display:flex;border-top:1px solid #eceef1;background:#fff;transition:height .3s}\n.t{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;color:var(--off,#9aa0a6);transition:color .3s}\n.t.on{color:var(--ac,#2f6bff)}\n.ic{width:var(--isz,22px);height:var(--isz,22px);border-radius:6px;background:currentColor;opacity:.85}\n.lb{font-size:var(--fs,12px)}\n.ind{position:absolute;top:0;height:var(--ih,3px);background:var(--ac,#2f6bff);border-radius:0 0 3px 3px;transition:left .3s cubic-bezier(.4,1.2,.5,1),width .3s;left:0}\n</style></head><body>\n<div class=\"phone\"><div class=\"screen\" id=\"sc\">\n<div class=\"content\" id=\"ct\">首页</div>\n<div class=\"bar\" id=\"bar\">\n<div class=\"t on\" data-i=\"0\"><span class=\"ic\"></span><span class=\"lb\">首页</span></div>\n<div class=\"t\" data-i=\"1\"><span class=\"ic\"></span><span class=\"lb\">消息</span></div>\n<div class=\"t\" data-i=\"2\"><span class=\"ic\"></span><span class=\"lb\">我的</span></div>\n<div class=\"ind\" id=\"ind\"></div>\n</div>\n</div></div>\n<script>\nconst tabs=[...document.querySelectorAll('.t')],ind=document.getElementById('ind'),bar=document.getElementById('bar'),ct=document.getElementById('ct');\nconst names=['首页','消息','我的'];\nconst state={ac:'#2f6bff',off:'#9aa0a6',ih:3,radius:14,dur:.3,fs:12,isz:22,bh:60};\nfunction applyStyle(){document.documentElement.style.setProperty('--ac',state.ac);document.documentElement.style.setProperty('--off',state.off);document.documentElement.style.setProperty('--ih',state.ih+'px');document.documentElement.style.setProperty('--fs',state.fs+'px');document.documentElement.style.setProperty('--isz',state.isz+'px');bar.style.height=state.bh+'px';bar.style.borderRadius=state.radius+'px';ind.style.transition='left '+state.dur+'s cubic-bezier(.4,1.2,.5,1),width '+state.dur+'s';}\nfunction place(){const t=tabs.find(x=>x.classList.contains('on'));ind.style.left=t.offsetLeft+'px';ind.style.width=t.offsetWidth+'px';}\nfunction select(i){tabs.forEach((t,k)=>t.classList.toggle('on',k===i));ct.textContent=names[i];place();}\ntabs.forEach((t,i)=>t.onclick=()=>select(i));\napplyStyle();select(0);setTimeout(place,60);\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['ac','off','ih','radius','dur','fs','isz','bh'].includes(d.key)){applyStyle();place();}});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v213",
  标题: "分段控件",
  分类: "组件",
  子类: "移动端控件",
  风格: ["通用","iOS原生"],
  场景: ["移动端·H5"],
  元素: ["构成","动效"],
  搭配: ["底部导航栏","列表侧滑操作"],
  标签: ["分段控件","segmented","切换","顶栏"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（七种常见手机控件的定义与描述方法，2026-09-15 入库，v 前缀=视频拆解）；观察通用移动端交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/分段控件.html",
  参数: [{"键":"ac","名":"滑块色","类型":"color","默认":"#2f6bff"},{"键":"tk","名":"轨道底色","类型":"color","默认":"#eef0f3"},{"键":"sc","名":"选中文字色","类型":"color","默认":"#ffffff"},{"键":"n","名":"段数","类型":"slider","默认":2,"最小":2,"最大":4,"单位":"段"},{"键":"sr","名":"滑块圆角","类型":"slider","默认":10,"最小":4,"最大":20,"单位":"px"},{"键":"dur","名":"滑动时长","类型":"slider","默认":0.3,"最小":0.15,"最大":0.6,"单位":"秒"},{"键":"fs","名":"文字字号","类型":"slider","默认":13,"最小":11,"最大":16,"单位":"px"},{"键":"bh","名":"控件高","类型":"slider","默认":42,"最小":32,"最大":56,"单位":"px"}],
  效果说明: "构图笔记：把「全部 / 未读」这一类互斥筛选做成一个轨道 + 一个滑动滑块，选中段被滑块垫底、文字反白，切换时滑块平移——比两个独立按钮更省空间也更明确。\n能怎么改：段数按筛选维度定；滑块用主色；底部导航栏在切换分段时保持不动，只有内容区变。",
  用法: "列表页顶部筛选：在消息页等顶部放 2 段（全部/未读）切换栏，切换只换内容区，底部导航不变。",
  提示词: "请生成一个「分段控件」手机控件。按三要素描述：\n① 控件名称：分段控件（Segmented Control），常置于页面顶部。\n② 触发手势：用户点击某一段（如「未读」），滑块平移到该段下方。\n③ 展开结果：被点段被滑块垫底且文字反白，下方内容区切换为对应筛选结果；底部导航栏保持不动、不随分段切换而变化。\n\n关键参数：\n- ac 滑块色 / tk 轨道底色 / sc 选中文字色 / n 段数 / sr 滑块圆角 / dur 滑动时长 / fs 文字字号 / bh 控件高\n集成步骤：\n1. 复制 assets/demos/分段控件.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把分段项换成你的筛选维度",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>分段控件演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}\n.phone{position:relative;width:280px;height:520px;background:#fff;border:9px solid #1c1c22;border-radius:34px;overflow:hidden}\n.screen{position:absolute;inset:0;background:#fff;display:flex;flex-direction:column}\n.seg{position:relative;margin:14px;display:flex;background:var(--tk,#eef0f3);border-radius:var(--sr,10px);padding:3px;transition:height .3s}\n.s{position:relative;flex:1;text-align:center;padding:9px 0;font-size:var(--fs,13px);color:#666;cursor:pointer;z-index:2;transition:color .3s}\n.s.on{color:var(--sc,#fff)}\n.thumb{position:absolute;top:3px;bottom:3px;background:var(--ac,#2f6bff);border-radius:calc(var(--sr,10px) - 3px);transition:left .3s cubic-bezier(.4,1.2,.5,1),width .3s;left:3px;z-index:1}\n.body{flex:1;display:flex;align-items:center;justify-content:center;color:#888;font-size:14px}\n</style></head><body>\n<div class=\"phone\"><div class=\"screen\" id=\"sc\">\n<div class=\"seg\" id=\"seg\"><div class=\"thumb\" id=\"th\"></div></div>\n<div class=\"body\" id=\"bd\">全部消息</div>\n</div></div>\n<script>\nconst seg=document.getElementById('seg'),th=document.getElementById('th'),bd=document.getElementById('bd');\nconst labels=['全部','未读'];\nconst state={ac:'#2f6bff',tk:'#eef0f3',sc:'#ffffff',n:2,sr:10,dur:.3,fs:13,bh:42};\nlet segs=[];\nfunction build(){seg.querySelectorAll('.s').forEach(e=>e.remove());segs=[];for(let i=0;i<state.n;i++){const el=document.createElement('div');el.className='s'+(i===0?' on':'');el.textContent=labels[i]||('段'+(i+1));el.onclick=()=>select(i);seg.appendChild(el);segs.push(el);}place();}\nfunction applyStyle(){document.documentElement.style.setProperty('--ac',state.ac);document.documentElement.style.setProperty('--tk',state.tk);document.documentElement.style.setProperty('--sc',state.sc);document.documentElement.style.setProperty('--sr',state.sr+'px');document.documentElement.style.setProperty('--fs',state.fs+'px');seg.style.height=state.bh+'px';th.style.transition='left '+state.dur+'s cubic-bezier(.4,1.2,.5,1),width '+state.dur+'s';}\nfunction place(){const el=segs.find(x=>x.classList.contains('on'));if(!el)return;th.style.left=el.offsetLeft+'px';th.style.width=el.offsetWidth+'px';}\nfunction select(i){segs.forEach((s,k)=>s.classList.toggle('on',k===i));bd.textContent=(labels[i]||('段'+(i+1)))+'消息';place();}\napplyStyle();build();setTimeout(place,60);\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['ac','tk','sc','n','sr','dur','fs','bh'].includes(d.key)){applyStyle();build();}});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v214",
  标题: "滚轮选择器",
  分类: "组件",
  子类: "移动端控件",
  风格: ["通用","iOS原生"],
  场景: ["移动端·H5"],
  元素: ["构成","动效"],
  搭配: ["底部操作菜单"],
  标签: ["滚轮选择器","picker","时间选择","吸附"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（七种常见手机控件的定义与描述方法，2026-09-15 入库，v 前缀=视频拆解）；观察通用移动端交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/滚轮选择器.html",
  参数: [{"键":"ac","名":"选中色","类型":"color","默认":"#2f6bff"},{"键":"bc","名":"选中带色","类型":"color","默认":"#eef3ff"},{"键":"n","名":"列数","类型":"slider","默认":2,"最小":1,"最大":3,"单位":"列"},{"键":"rh","名":"行高","类型":"slider","默认":32,"最小":24,"最大":48,"单位":"px"},{"键":"dur","名":"吸附时长","类型":"slider","默认":0.3,"最小":0.15,"最大":0.6,"单位":"秒"},{"键":"fs","名":"字号","类型":"slider","默认":18,"最小":14,"最大":24,"单位":"px"},{"键":"bh","名":"选择器高","类型":"slider","默认":160,"最小":120,"最大":220,"单位":"px"},{"键":"cw","名":"列宽","类型":"slider","默认":64,"最小":48,"最大":90,"单位":"px"}],
  效果说明: "构图笔记：时间/选项用多列滚轮，中间一条高亮带标出「当前选中行」，手指上下滑、松手自动吸附到最近一行——机械感来自「都对齐到中线」。\n能怎么改：列数按维度（时/分/秒）定；选中带用浅主色；滑动带惯性、松手吸附，别停在半行。",
  用法: "设置闹钟/选时间：用双列滚轮选小时与分钟，松手后选中数字自动对齐到中间高亮带。",
  提示词: "请生成一个「滚轮选择器」手机控件。按三要素描述：\n① 控件名称：滚轮选择器（Wheel Picker），用于选时间或有序选项。\n② 触发手势：用户在某一列上、下滑动，列表跟随手指滚动，松手即停。\n③ 展开结果：中间一条高亮带标出当前选中行，松手后最近的行自动吸附对齐到高亮带中心，非选中行文字变灰；多列（如时/分）各自独立。\n\n关键参数：\n- ac 选中色 / bc 选中带色 / n 列数 / rh 行高 / dur 吸附时长 / fs 字号 / bh 选择器高 / cw 列宽\n集成步骤：\n1. 复制 assets/demos/滚轮选择器.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把列数与取值范围换成你要选的时间/选项",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>滚轮选择器演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}\n.phone{position:relative;width:280px;height:520px;background:#fff;border:9px solid #1c1c22;border-radius:34px;overflow:hidden}\n.screen{position:absolute;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}\n.pk{position:relative;display:flex;justify-content:center;gap:8px;height:var(--bh,160px)}\n.col{position:relative;width:var(--cw,64px);height:100%;overflow:hidden;touch-action:none}\n.band{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);height:var(--rh,32px);background:var(--bc,#eef3ff);border-radius:8px;pointer-events:none}\n.list{position:absolute;left:0;right:0;top:50%;will-change:transform}\n.it{height:var(--rh,32px);display:flex;align-items:center;justify-content:center;font-size:var(--fs,18px);color:#9aa0a6;transition:color .2s}\n.val{margin-top:14px;font-size:14px;color:#444}\n</style></head><body>\n<div class=\"phone\"><div class=\"screen\" id=\"sc\">\n<div class=\"pk\" id=\"pk\">\n<div class=\"band\"></div>\n</div>\n<div class=\"val\" id=\"val\">08 : 30</div>\n</div></div>\n<script>\nconst pk=document.getElementById('pk'),val=document.getElementById('val');\nconst cols=[{min:0,max:23,cur:8},{min:0,max:59,cur:30}];\nconst state={ac:'#2f6bff',bc:'#eef3ff',n:2,rh:32,dur:.3,fs:18,bh:160,cw:64};\nlet lists=[],cur=[8,30];\nfunction makeCol(ci){const c=document.createElement('div');c.className='col';const L=document.createElement('div');L.className='list';for(let v=cols[ci].min;v<=cols[ci].max;v++){const it=document.createElement('div');it.className='it';it.textContent=String(v).padStart(2,'0');L.appendChild(it);}c.appendChild(L);pk.appendChild(c);lists[ci]=L;\n let y=0,sy=0,drag=false,pid=null;\n const setY=(yy)=>{L.style.transition='none';L.style.transform='translateY('+yy+'px)';};\n const snap=()=>{const idx=Math.round(-y/state.rh);const clamp=Math.max(cols[ci].min,Math.min(cols[ci].max,idx));cur[ci]=clamp;y=-clamp*state.rh;L.style.transition='transform '+state.dur+'s cubic-bezier(.4,1.2,.5,1)';L.style.transform='translateY('+y+'px)';paint();};\n c.addEventListener('pointerdown',e=>{drag=true;pid=e.pointerId;sy=e.clientY-y;c.setPointerCapture(pid);});\n c.addEventListener('pointermove',e=>{if(!drag)return;y=e.clientY-sy;setY(y);});\n c.addEventListener('pointerup',e=>{if(!drag)return;drag=false;snap();});\n setY(-cols[ci].cur*state.rh);\n}\nfunction paint(){lists.forEach((L,ci)=>{const items=L.children;for(let k=0;k<items.length;k++){const idx=Math.round(-cur[ci]);items[k].style.color=(k===idx)?state.ac:'#9aa0a6';}});val.textContent=String(cur[0]).padStart(2,'0')+' : '+String(cur[1]).padStart(2,'0');}\nfunction applyStyle(){document.documentElement.style.setProperty('--ac',state.ac);document.documentElement.style.setProperty('--bc',state.bc);document.documentElement.style.setProperty('--rh',state.rh+'px');document.documentElement.style.setProperty('--fs',state.fs+'px');document.documentElement.style.setProperty('--bh',state.bh+'px');document.documentElement.style.setProperty('--cw',state.cw+'px');}\nfunction build(){pk.querySelectorAll('.col').forEach(e=>e.remove());lists=[];for(let i=0;i<state.n;i++)makeCol(i);applyStyle();paint();}\napplyStyle();build();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['ac','bc','n','rh','dur','fs','bh','cw'].includes(d.key)){cols.length=state.n;for(let i=state.n-1;i>=0;i--){if(cols[i]===undefined)cols[i]={min:0,max:i===0?23:59,cur:cur[i]||0};}build();}});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v215",
  标题: "底部操作菜单",
  分类: "组件",
  子类: "移动端控件",
  风格: ["通用","iOS原生"],
  场景: ["移动端·H5"],
  元素: ["构成","动效"],
  搭配: ["滚轮选择器","长按上下文菜单"],
  标签: ["底部操作菜单","action sheet","上滑菜单","取消"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（七种常见手机控件的定义与描述方法，2026-09-15 入库，v 前缀=视频拆解）；观察通用移动端交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/底部操作菜单.html",
  参数: [{"键":"ac","名":"强调色","类型":"color","默认":"#2f6bff"},{"键":"sc","名":"面板底色","类型":"color","默认":"#ffffff"},{"键":"n","名":"选项数","类型":"slider","默认":3,"最小":2,"最大":5,"单位":"项"},{"键":"sr","名":"面板圆角","类型":"slider","默认":16,"最小":8,"最大":28,"单位":"px"},{"键":"dur","名":"弹出时长","类型":"slider","默认":0.3,"最小":0.15,"最大":0.6,"单位":"秒"},{"键":"cc","名":"取消色","类型":"color","默认":"#ef4444"},{"键":"oh","名":"选项高","类型":"slider","默认":46,"最小":38,"最大":60,"单位":"px"},{"键":"mk","名":"遮罩浓度","类型":"slider","默认":0.4,"最小":0.2,"最大":0.7}],
  效果说明: "构图笔记：点击头像等触发点，从屏幕底部滑出一张操作卡（拍照/从相册/删除），底部永远留一个「取消」独立成段——把「放弃」做成最省力的出口。\n能怎么改：选项数按动作定；危险项用红色；背景半透明遮罩，点遮罩或取消即收起。",
  用法: "点击头像等触发：弹出底部操作菜单供用户选择后续动作，点遮罩/取消收起。",
  提示词: "请生成一个「底部操作菜单」手机控件（Action Sheet）。按三要素描述：\n① 控件名称：底部操作菜单，从屏幕底部弹出的动作选择卡。\n② 触发手势：用户点击某个触发元素（如头像），菜单从底部上滑出现。\n③ 展开结果：菜单列出若干操作选项（如拍照/从相册选择），最底部独立一个「取消」；点击任一选项或点背景遮罩即执行并收起菜单。\n\n关键参数：\n- ac 强调色 / sc 面板底色 / n 选项数 / sr 面板圆角 / dur 弹出时长 / cc 取消色 / oh 选项高 / mk 遮罩浓度\n集成步骤：\n1. 复制 assets/demos/底部操作菜单.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把选项换成你的后续动作，危险项用红色",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>底部操作菜单演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}\n.phone{position:relative;width:280px;height:520px;background:#fff;border:9px solid #1c1c22;border-radius:34px;overflow:hidden}\n.screen{position:absolute;inset:0;background:#fff}\n.av{position:absolute;top:90px;left:50%;transform:translateX(-50%);width:64px;height:64px;border-radius:50%;background:#e9edf3;color:#9aa0a6;display:flex;align-items:center;justify-content:center;font-size:30px;cursor:pointer}\n.mask{position:absolute;inset:0;background:rgba(0,0,0,var(--mk,.4));opacity:0;pointer-events:none;transition:opacity var(--dur,.3s);z-index:5}\n.mask.on{opacity:1;pointer-events:auto}\n.sheet{position:absolute;left:0;right:0;bottom:0;background:var(--sc,#fff);border-radius:var(--sr,16px) var(--sr,16px) 0 0;padding:10px;transform:translateY(110%);transition:transform var(--dur,.3s) cubic-bezier(.4,1,.5,1);z-index:6}\n.sheet.on{transform:translateY(0)}\n.op{height:var(--oh,46px);display:flex;align-items:center;justify-content:center;font-size:15px;color:#222;border-radius:10px;cursor:pointer}\n.op:active{background:#f4f5f7}\n.cancel{margin-top:6px;color:var(--cc,#ef4444);font-weight:600;border-top:1px solid #eee}\n</style></head><body>\n<div class=\"phone\"><div class=\"screen\" id=\"sc\">\n<div class=\"av\" id=\"av\">☻</div>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\"></div>\n</div></div>\n<script>\nconst av=document.getElementById('av'),mask=document.getElementById('mask'),sheet=document.getElementById('sheet');\nconst opts=['拍照','从相册选择','删除头像'];\nconst state={ac:'#2f6bff',sc:'#ffffff',n:3,sr:16,dur:.3,cc:'#ef4444',oh:46,mk:.4};\nfunction build(){sheet.innerHTML='';for(let i=0;i<state.n;i++){const o=document.createElement('div');o.className='op'+(i===state.n-1?' cancel':'');o.textContent=opts[i]||('选项'+(i+1));o.onclick=close;sheet.appendChild(o);}const c=document.createElement('div');c.className='op cancel';c.textContent='取消';c.onclick=close;sheet.appendChild(c);}\nfunction applyStyle(){document.documentElement.style.setProperty('--ac',state.ac);document.documentElement.style.setProperty('--sc',state.sc);document.documentElement.style.setProperty('--cc',state.cc);document.documentElement.style.setProperty('--sr',state.sr+'px');document.documentElement.style.setProperty('--oh',state.oh+'px');document.documentElement.style.setProperty('--mk',state.mk);sheet.style.transition='transform '+state.dur+'s cubic-bezier(.4,1,.5,1)';mask.style.transition='opacity '+state.dur+'s';}\nfunction open(){build();sheet.classList.add('on');mask.classList.add('on');}\nfunction close(){sheet.classList.remove('on');mask.classList.remove('on');}\nav.onclick=open;mask.onclick=close;\napplyStyle();open();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['ac','sc','n','sr','dur','cc','oh','mk'].includes(d.key)){applyStyle();if(sheet.classList.contains('on'))build();}});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v216",
  标题: "底部抽屉面板",
  分类: "组件",
  子类: "移动端控件",
  风格: ["通用","iOS原生"],
  场景: ["移动端·H5"],
  元素: ["构成","动效"],
  搭配: ["底部导航栏","底部操作菜单"],
  标签: ["底部抽屉","bottom sheet","拖拽","摘要详情"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（七种常见手机控件的定义与描述方法，2026-09-15 入库，v 前缀=视频拆解）；观察通用移动端交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/底部抽屉面板.html",
  参数: [{"键":"ac","名":"把手色","类型":"color","默认":"#2f6bff"},{"键":"sc","名":"卡片底色","类型":"color","默认":"#ffffff"},{"键":"eh","名":"展开高","类型":"slider","默认":300,"最小":200,"最大":420,"单位":"px"},{"键":"sh","名":"摘要高","类型":"slider","默认":110,"最小":80,"最大":160,"单位":"px"},{"键":"sr","名":"卡片圆角","类型":"slider","默认":16,"最小":8,"最大":28,"单位":"px"},{"键":"dur","名":"过渡时长","类型":"slider","默认":0.35,"最小":0.2,"最大":0.7,"单位":"秒"},{"键":"hw","名":"把手宽","类型":"slider","默认":40,"最小":28,"最大":60,"单位":"px"},{"键":"sumc","名":"摘要文字色","类型":"color","默认":"#222222"}],
  效果说明: "构图笔记：地图等界面下方先只露「地点名+一句话摘要」，顶上一根抓手条；上托展开看详情、下托收回摘要——高度由手势连续控制，不是只有开/关两态。\n能怎么改：默认露摘要、不挡主视图；拖拽过半程再吸顶/落底；与底部导航栏共处时抽屉盖在导航之上。",
  用法: "地图/详情页：默认露出地点摘要卡，上托展开详情、下托收回摘要，松手按过半程吸附。",
  提示词: "请生成一个「底部抽屉面板」手机控件（Bottom Sheet）。按三要素描述：\n① 控件名称：底部抽屉面板，贴在界面下方的可拖拽卡片。\n② 触发手势：用户在卡片顶部的抓手条上、下拖动。\n③ 展开结果：默认只露出地点摘要（标题+一行说明），向上拖拽展开详情区（松手过半程吸顶），向下拖拽收回只留摘要（过半程落底）；拖拽过程高度连续变化而非只开/关两态。\n\n关键参数：\n- ac 把手色 / sc 卡片底色 / eh 展开高 / sh 摘要高 / sr 卡片圆角 / dur 过渡时长 / hw 把手宽 / sumc 摘要文字色\n集成步骤：\n1. 复制 assets/demos/底部抽屉面板.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把摘要与详情内容换成你的业务数据",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>底部抽屉面板演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}\n.phone{position:relative;width:280px;height:520px;background:#fff;border:9px solid #1c1c22;border-radius:34px;overflow:hidden}\n.screen{position:absolute;inset:0;background:#eef1f5}\n.map{position:absolute;inset:0;background:repeating-linear-gradient(45deg,#e7ebf0,#e7ebf0 14px,#eef1f5 14px,#eef1f5 28px)}\n.card{position:absolute;left:0;right:0;bottom:0;height:var(--sh,110px);background:var(--sc,#fff);border-radius:var(--sr,16px) var(--sr,16px) 0 0;box-shadow:0 -6px 20px rgba(0,0,0,.12);overflow:hidden;transition:height var(--dur,.35s) cubic-bezier(.4,1,.5,1);touch-action:none}\n.card.exp{height:var(--eh,300px)}\n.handle{height:22px;display:flex;align-items:center;justify-content:center;cursor:grab}\n.grip{width:var(--hw,40px);height:5px;border-radius:3px;background:#d4d8de}\n.sum{padding:4px 16px;font-size:14px;color:var(--sumc,#222)}\n.det{position:absolute;left:16px;right:16px;top:60px;color:#888;font-size:13px;line-height:1.7;opacity:0;transition:opacity var(--dur,.35s)}\n.card.exp .det{opacity:1}\n</style></head><body>\n<div class=\"phone\"><div class=\"screen\" id=\"sc\">\n<div class=\"map\"></div>\n<div class=\"card\" id=\"card\"><div class=\"handle\" id=\"hd\"><span class=\"grip\"></span></div>\n<div class=\"sum\">洪崖洞 · 重庆地标建筑</div>\n<div class=\"det\">洪崖洞原名洪崖门，是古重庆城门之一。以吊脚楼形态依山就势，入夜灯火璀璨，是重庆最具辨识度的夜景打卡地。可乘轻轨到达，建议傍晚前往。</div>\n</div>\n</div></div>\n<script>\nconst card=document.getElementById('card'),hd=document.getElementById('hd');\nconst state={ac:'#2f6bff',sc:'#ffffff',eh:300,sh:110,sr:16,dur:.35,hw:40,sumc:'#222'};\nlet drag=false,sy=0,sh0=0;\nfunction applyStyle(){document.documentElement.style.setProperty('--ac',state.ac);document.documentElement.style.setProperty('--sc',state.sc);document.documentElement.style.setProperty('--eh',state.eh+'px');document.documentElement.style.setProperty('--sh',state.sh+'px');document.documentElement.style.setProperty('--sr',state.sr+'px');document.documentElement.style.setProperty('--hw',state.hw+'px');document.documentElement.style.setProperty('--sumc',state.sumc);card.style.transition='height '+state.dur+'s cubic-bezier(.4,1,.5,1)';}\nhd.addEventListener('pointerdown',e=>{drag=true;sy=e.clientY;sh0=card.offsetHeight;card.style.transition='none';hd.setPointerCapture(e.pointerId);});\nhd.addEventListener('pointermove',e=>{if(!drag)return;const h=Math.max(state.sh,Math.min(state.eh,sh0-(e.clientY-sy)));card.style.height=h+'px';});\nhd.addEventListener('pointerup',e=>{if(!drag)return;drag=false;const h=card.offsetHeight;card.style.transition='height '+state.dur+'s cubic-bezier(.4,1,.5,1)';card.classList.toggle('exp',h>(state.sh+state.eh)/2);});\napplyStyle();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['ac','sc','eh','sh','sr','dur','hw','sumc'].includes(d.key))applyStyle();});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v217",
  标题: "列表侧滑操作",
  分类: "组件",
  子类: "移动端控件",
  风格: ["通用","iOS原生"],
  场景: ["移动端·H5"],
  元素: ["构成","动效","反馈"],
  搭配: ["分段控件","长按上下文菜单"],
  标签: ["列表侧滑","swipe","左滑","快捷操作"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（七种常见手机控件的定义与描述方法，2026-09-15 入库，v 前缀=视频拆解）；观察通用移动端交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/列表侧滑操作.html",
  参数: [{"键":"ac","名":"操作钮色","类型":"color","默认":"#2f6bff"},{"键":"dc","名":"删除色","类型":"color","默认":"#ef4444"},{"键":"sc","名":"行底色","类型":"color","默认":"#ffffff"},{"键":"n","名":"按钮数","类型":"slider","默认":2,"最小":1,"最大":3,"单位":"个"},{"键":"dur","名":"滑出时长","类型":"slider","默认":0.3,"最小":0.15,"最大":0.6,"单位":"秒"},{"键":"rh","名":"行高","类型":"slider","默认":64,"最小":52,"最大":80,"单位":"px"},{"键":"rw","名":"露出宽","类型":"slider","默认":144,"最小":80,"最大":220,"单位":"px"},{"键":"sr","名":"按钮圆角","类型":"slider","默认":10,"最小":4,"最大":20,"单位":"px"}],
  效果说明: "构图笔记：消息行左滑，背后露出「已读 / 删除」等操作钮，滑过一半自动展开；其他行纹丝不动，只在当前行局部让位——不打断列表整体。\n能怎么改：按钮数按动作定（危险项红色置右）；露出宽度按按钮数算；松手过半才固定展开，否则回弹收起。",
  用法: "消息/列表页：左滑当前行露出快捷操作按钮，其他行保持原位。",
  提示词: "请生成一个「列表侧滑操作」手机控件。按三要素描述：\n① 控件名称：列表侧滑操作（Swipe Action），用于列表项快捷操作。\n② 触发手势：用户在某一行上向左滑动。\n③ 展开结果：该行向右让位、背后露出若干操作按钮（如已读/删除，危险项红色），滑过一半自动完全展开；其余列表行保持原位不随动；松手未过半则回弹收起。\n\n关键参数：\n- ac 操作钮色 / dc 删除色 / sc 行底色 / n 按钮数 / dur 滑出时长 / rh 行高 / rw 露出宽 / sr 按钮圆角\n集成步骤：\n1. 复制 assets/demos/列表侧滑操作.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把操作按钮换成你的快捷动作（危险项置右）",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>列表侧滑操作演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}\n.phone{position:relative;width:280px;height:520px;background:#fff;border:9px solid #1c1c22;border-radius:34px;overflow:hidden}\n.screen{position:absolute;inset:0;background:#fff}\n.list{position:absolute;inset:0;overflow:hidden}\n.row{position:relative;height:var(--rh,64px);border-bottom:1px solid #f1f2f4;touch-action:none}\n.actions{position:absolute;top:0;right:0;height:100%;display:flex}\n.act{width:var(--aw,72px);display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;background:var(--ac,#2f6bff);border-radius:var(--sr,10px)}\n.act.del{background:var(--dc,#ef4444)}\n.front{position:absolute;inset:0;background:var(--sc,#fff);display:flex;align-items:center;padding:0 16px;font-size:14px;color:#333;transition:transform var(--dur,.3s) cubic-bezier(.4,1,.5,1);will-change:transform}\n.front.open{transform:translateX(calc(-1 * var(--rw,144px)))}\n</style></head><body>\n<div class=\"phone\"><div class=\"screen\" id=\"sc\">\n<div class=\"list\" id=\"list\"></div>\n</div></div>\n<script>\nconst list=document.getElementById('list');\nconst names=['张伟：今晚一起吃饭吗','李娜：文件已发你','群通知：周五团建','王芳：周末爬山走起'];\nconst state={ac:'#2f6bff',dc:'#ef4444',sc:'#ffffff',n:2,dur:.3,rh:64,rw:144,sr:10};\nlet rows=[];\nfunction build(){list.innerHTML='';rows=[];names.forEach((nm,i)=>{const row=document.createElement('div');row.className='row';\n const acts=document.createElement('div');acts.className='actions';for(let k=0;k<state.n;k++){const a=document.createElement('div');a.className='act'+(k===state.n-1?' del':'');a.textContent=k===state.n-1?'删除':'已读';acts.appendChild(a);}\n const front=document.createElement('div');front.className='front';front.textContent=nm;\n row.appendChild(acts);row.appendChild(front);list.appendChild(row);\n let x=0,drag=false,sy=0,pid=null;\n const setX=(xx)=>{front.style.transition='none';front.style.transform='translateX('+xx+'px)';};\n front.addEventListener('pointerdown',e=>{drag=true;pid=e.pointerId;sy=e.clientX-x;front.setPointerCapture(pid);});\n front.addEventListener('pointermove',e=>{if(!drag)return;x=Math.max(-state.rw,Math.min(0,e.clientX-sy));setX(x);});\n front.addEventListener('pointerup',e=>{if(!drag)return;drag=false;const open=x< -state.rw/2;front.style.transition='transform '+state.dur+'s cubic-bezier(.4,1,.5,1)';front.classList.toggle('open',open);x=open?-state.rw:0;});\n rows.push({front});\n});}\nfunction applyStyle(){document.documentElement.style.setProperty('--ac',state.ac);document.documentElement.style.setProperty('--dc',state.dc);document.documentElement.style.setProperty('--rh',state.rh+'px');document.documentElement.style.setProperty('--rw',state.rw+'px');document.documentElement.style.setProperty('--sr',state.sr+'px');}\nfunction rebuild(){build();}\napplyStyle();build();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['ac','dc','sc','n','dur','rh','rw','sr'].includes(d.key)){applyStyle();rebuild();}});\n<\/script></body></html>",
  复用记录: "",
},
{
  id: "v218",
  标题: "长按上下文菜单",
  分类: "组件",
  子类: "移动端控件",
  风格: ["通用","iOS原生"],
  场景: ["移动端·H5"],
  元素: ["构成","动效"],
  搭配: ["列表侧滑操作","底部操作菜单"],
  标签: ["长按","上下文菜单","context menu","气泡"],
  来源: "抖音视频拆解：@学康见 AI 实用技巧 系列（七种常见手机控件的定义与描述方法，2026-09-15 入库，v 前缀=视频拆解）；观察通用移动端交互模式后的原创复刻，未复制任何网站或视频源码、图片或商业素材。",
  效果演示: "assets/demos/长按上下文菜单.html",
  参数: [{"键":"ac","名":"强调色","类型":"color","默认":"#2f6bff"},{"键":"sc","名":"菜单底色","类型":"color","默认":"#ffffff"},{"键":"bc","名":"气泡底色","类型":"color","默认":"#eef1f5"},{"键":"n","名":"选项数","类型":"slider","默认":3,"最小":2,"最大":5,"单位":"项"},{"键":"sr","名":"菜单圆角","类型":"slider","默认":12,"最小":6,"最大":22,"单位":"px"},{"键":"dur","名":"弹出时长","类型":"slider","默认":0.25,"最小":0.15,"最大":0.5,"单位":"秒"},{"键":"hold","名":"触发时长","类型":"slider","默认":0.5,"最小":0.3,"最大":1,"单位":"秒"},{"键":"ih","名":"选项高","类型":"slider","默认":40,"最小":32,"最大":56,"单位":"px"}],
  效果说明: "构图笔记：长按消息气泡约半秒，在气泡附近弹出一个只针对这条消息的操作菜单（复制/转发/删除），位置贴着触发元素——强调「这是给这条的」。\n能怎么改：触发时长 0.4–0.6 秒最不易误触；菜单锚定气泡右下；点菜单项或空白处即收起。",
  用法: "聊天/列表：长按某条内容，在附近弹出仅针对该条的上下文菜单。",
  提示词: "请生成一个「长按上下文菜单」手机控件（Context Menu）。按三要素描述：\n① 控件名称：长按上下文菜单，仅针对单个元素的操作浮层。\n② 触发手势：用户长按某个内容元素（如消息气泡）约半秒不松开。\n③ 展开结果：在该元素附近弹出操作菜单（复制/转发/删除等），菜单只作用于被长按的这一条；点击某选项或点空白处即执行并收起菜单。\n\n关键参数：\n- ac 强调色 / sc 菜单底色 / bc 气泡底色 / n 选项数 / sr 菜单圆角 / dur 弹出时长 / hold 触发时长 / ih 选项高\n集成步骤：\n1. 复制 assets/demos/长按上下文菜单.html 的 HTML/CSS/JS（纯原生，无依赖）\n2. 把上面的参数键接到你的页面状态，改主色/圆角/时长即可对齐品牌\n3. 把菜单项换成该条内容支持的操作",
  代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>长按上下文菜单演示</title><style>*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:system-ui,\"Microsoft YaHei\",sans-serif;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}\n.phone{position:relative;width:280px;height:520px;background:#fff;border:9px solid #1c1c22;border-radius:34px;overflow:hidden}\n.screen{position:absolute;inset:0;background:#fff;display:flex;align-items:center;padding:20px}\n.bub{position:relative;background:var(--bc,#eef1f5);color:#222;padding:12px 14px;border-radius:14px;font-size:14px;max-width:180px;line-height:1.6;user-select:none;touch-action:none}\n.menu{position:absolute;background:var(--sc,#fff);border:1px solid #e5e7eb;border-radius:var(--sr,12px);box-shadow:0 10px 30px rgba(0,0,0,.18);overflow:hidden;opacity:0;transform:scale(.85);transform-origin:top left;transition:opacity var(--dur,.25s),transform var(--dur,.25s);pointer-events:none;z-index:9}\n.menu.on{opacity:1;transform:scale(1);pointer-events:auto}\n.mi{height:var(--ih,40px);display:flex;align-items:center;padding:0 16px;font-size:13px;color:#222;white-space:nowrap}\n.mi:hover{background:var(--ac,#2f6bff);color:#fff}\n</style></head><body>\n<div class=\"phone\"><div class=\"screen\" id=\"sc\">\n<div class=\"bub\" id=\"bub\">长按这条消息，会弹出只针对它的操作菜单</div>\n<div class=\"menu\" id=\"menu\"></div>\n</div></div>\n<script>\nconst bub=document.getElementById('bub'),menu=document.getElementById('menu');\nconst items=['复制','转发','收藏','删除'];\nconst state={ac:'#2f6bff',sc:'#ffffff',bc:'#eef1f5',n:3,sr:12,dur:.25,hold:.5,ih:40};\nlet timer=0;\nfunction build(){menu.innerHTML='';for(let i=0;i<state.n;i++){const m=document.createElement('div');m.className='mi';m.textContent=items[i]||('操作'+(i+1));m.onclick=close;menu.appendChild(m);}}\nfunction applyStyle(){document.documentElement.style.setProperty('--ac',state.ac);document.documentElement.style.setProperty('--sc',state.sc);document.documentElement.style.setProperty('--bc',state.bc);document.documentElement.style.setProperty('--sr',state.sr+'px');document.documentElement.style.setProperty('--ih',state.ih+'px');bub.style.background=state.bc;menu.style.transition='opacity '+state.dur+'s,transform '+state.dur+'s';}\nfunction open(){build();const r=bub.getBoundingClientRect(),s=document.getElementById('sc').getBoundingClientRect();menu.style.left=(r.left-s.left+6)+'px';menu.style.top=(r.bottom-s.top+6)+'px';menu.classList.add('on');}\nfunction close(){menu.classList.remove('on');}\nbub.addEventListener('pointerdown',e=>{timer=setTimeout(open,state.hold*1000);});\nbub.addEventListener('pointerup',()=>clearTimeout(timer));\nbub.addEventListener('pointerleave',()=>clearTimeout(timer));\napplyStyle();\nwindow.addEventListener('message',e=>{const d=e.data;if(!d||d.type!=='param')return;state[d.key]=d.value;if(['ac','sc','bc','n','sr','dur','hold','ih'].includes(d.key)){applyStyle();if(menu.classList.contains('on'))build();}});\n<\/script></body></html>",
  复用记录: "",
},
  
  {
    id: "v220",
    标题: "液态金属药丸导航",
    分类: "组件",
    子类: "导航",
    风格: ["暗色", "科技"],
    场景: ["官网·品牌站", "落地页·发布页", "工具·SaaS"],
    元素: ["视觉", "反馈"],
    搭配: [
      "悬停反馈"
    ],
    标签: [
      "导航",
      "液态金属",
      "扫光",
      "药丸",
      "hover",
      "暗色"
    ],
    来源: "方案库 m002 暗色波光基建首屏拆解（2026-09-16，抠出的导航组件；零依赖实现，与 v221/v222/v223 同源）",
    效果演示: "assets/demos/液态金属药丸导航.html",
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#0b0b0b"},
      {键:"liang",名:"金属亮端",类型:"color",默认:"#4a4a4a"},
      {键:"an",名:"金属暗端",类型:"color",默认:"#050505"},
      {键:"zi",名:"文字色",类型:"color",默认:"#f3f3f3"},
      {键:"yuanjiao",名:"圆角（px）",类型:"slider",最小:0,最大:1000,步长:1,默认:7},
      {键:"gao",名:"药丸高（px）",类型:"slider",最小:32,最大:56,步长:1,默认:40},
      {键:"zihao",名:"字号（px）",类型:"slider",最小:12,最大:18,步长:1,默认:14},
      {键:"jiange",名:"间距（px）",类型:"slider",最小:4,最大:20,步长:1,默认:8},
      {键:"guang",名:"辉光强度",类型:"slider",最小:0,最大:40,步长:1,默认:18},
      {键:"saoliang",名:"扫光亮度",类型:"slider",最小:0,最大:40,步长:1,默认:16}
    ],
    效果说明: "深灰斜向渐变 + 灰描边 + hover 高光横扫 + 冷辉光，四件叠出「液态金属」质感；第二排每 2.8s 自动扫一枚，不用鼠标也能看到动效。\n能怎么改：调「金属亮端/暗端」控制金属明暗对比，「扫光亮度」控制高光可见度，「辉光强度」控制 hover 光晕；「圆角」从 0（直角）拉到 1000（胶囊）都成立。\n来源：方案库 m002 暗色波光基建首屏拆解（2026-09-16，抠出的导航组件；零依赖实现，与 v221/v222/v223 同源）",
    用法: "调「金属亮端/暗端」控制金属明暗对比，「扫光亮度」控制高光可见度，「辉光强度」控制 hover 光晕；「圆角」从 0（直角）拉到 1000（胶囊）都成立。",
    提示词: "【效果】深灰斜向渐变 + 灰描边 + hover 高光横扫 + 冷辉光，四件叠出「液态金属」质感；第二排每 2.8s 自动扫一枚，不用鼠标也能看到动效。\n【用法示例】\n- 想让金属更亮：亮端拉到 #6a6a6a、扫光亮度 24。\n- 想要极简直角风：圆角 2、辉光 0。\n【关键参数】\n• 页面底色（color）：默认 #0b0b0b\n• 金属亮端（color）：默认 #4a4a4a\n• 金属暗端（color）：默认 #050505\n• 文字色（color）：默认 #f3f3f3\n• 圆角（px）（slider）：默认 7，范围 0–1000\n• 药丸高（px）（slider）：默认 40，范围 32–56\n• 字号（px）（slider）：默认 14，范围 12–18\n• 间距（px）（slider）：默认 8，范围 4–20\n• 辉光强度（slider）：默认 18，范围 0–40\n• 扫光亮度（slider）：默认 16，范围 0–40\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>液态金属药丸导航 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; gap: 48px;\n         background: var(--di); font-family: \"Inter\", system-ui, \"Microsoft YaHei\", sans-serif; }\n  .bar { display: flex; align-items: center; justify-content: center; gap: calc(var(--jiange)*1px); padding: 0 20px; }\n  .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--zi); opacity: .85; }\n  /* 液态金属质感 = 深灰斜向渐变 + 灰描边 + 扫光高光 + hover 辉光，四件套缺一不可 */\n  .pill { position: relative; overflow: hidden; display: inline-flex; align-items: center;\n          height: calc(var(--gao)*1px); padding: 0 20px; border-radius: var(--yuanjiao);\n          border: 1px solid rgba(198,198,198,.55);\n          background: linear-gradient(105deg, var(--an) 0%, color-mix(in srgb, var(--liang) 55%, var(--an)) 48%, var(--liang) 100%);\n          color: var(--zi); font-size: calc(var(--zihao)*1px); letter-spacing: -.01em; white-space: nowrap;\n          transition: background .35s ease, border-color .35s ease, box-shadow .35s ease; cursor: pointer; }\n  .pill::before { content: \"\"; position: absolute; inset: 0; pointer-events: none;\n          background: linear-gradient(115deg, transparent 30%, color-mix(in srgb, #fff calc(var(--saoliang)*1%), transparent) 50%, transparent 70%);\n          transform: translateX(-120%); }\n  .pill:hover::before, .pill.demo::before { transform: translateX(120%); transition: transform .6s ease; }\n  .pill:hover, .pill.demo { border-color: rgba(235,235,235,.9);\n          background: linear-gradient(105deg, var(--an) 0%, color-mix(in srgb, var(--liang) 72%, var(--an)) 45%, color-mix(in srgb, var(--liang) 130%, #6a6a6a) 100%);\n          box-shadow: 0 0 calc(var(--guang)*1px) rgba(200,210,230,.18); }\n  .pill.on { border-color: rgba(235,235,235,.9); box-shadow: 0 0 calc(var(--guang)*1px) rgba(200,210,230,.18); }\n  .ghost { border: 1px solid rgba(198,198,198,.4); background: transparent; color: var(--zi); }\n</style>\n</head>\n<body>\n  <nav class=\"bar\">\n    <span class=\"dot\"></span>\n    <span class=\"pill\">产品</span>\n    <span class=\"pill on\">能力</span>\n    <span class=\"pill\">价格</span>\n    <span class=\"pill\">文档</span>\n    <span class=\"pill ghost\">登录</span>\n  </nav>\n  <nav class=\"bar\" id=\"auto\">\n    <span class=\"pill\">Benefits</span>\n    <span class=\"pill\">How It Works</span>\n    <span class=\"pill\">FAQs</span>\n    <span class=\"pill\">Pricing</span>\n  </nav>\n<script>\nconst state = { di:'#0b0b0b', liang:'#4a4a4a', an:'#050505', zi:'#f3f3f3',\n                yuanjiao:7, gao:40, zihao:14, jiange:8, guang:18, saoliang:16 };\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--di', state.di); R.setProperty('--liang', state.liang);\n  R.setProperty('--an', state.an); R.setProperty('--zi', state.zi);\n  R.setProperty('--yuanjiao', state.yuanjiao + 'px'); R.setProperty('--gao', state.gao);\n  R.setProperty('--zihao', state.zihao); R.setProperty('--jiange', state.jiange);\n  R.setProperty('--guang', state.guang); R.setProperty('--saoliang', state.saoliang);\n}\nwindow.addEventListener('message', e => {\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\n// 第二排每 2.8s 自动扫一枚，方便截图/预览不用手动 hover 也能看到动效\nconst autoPills = document.querySelectorAll('#auto .pill');\nlet ai = 0;\nsetInterval(() => {\n  autoPills.forEach(p => p.classList.remove('demo'));\n  autoPills[ai % autoPills.length].classList.add('demo');\n  ai++;\n}, 2800);\napply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v221",
    标题: "扫光按钮",
    分类: "动效",
    子类: "按钮",
    风格: ["暗色", "科技"],
    场景: ["落地页·发布页", "官网·品牌站"],
    元素: ["动效", "反馈"],
    搭配: [
      "按压回弹"
    ],
    标签: [
      "按钮",
      "扫光",
      "shine",
      "hover",
      "辉光",
      "渐变"
    ],
    来源: "方案库 m002 暗色波光基建首屏拆解（2026-09-16）；同源还有 v220/v222/v223",
    效果演示: "assets/demos/扫光按钮.html",
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#101014"},
      {键:"zhucai",名:"主按钮色",类型:"color",默认:"#ffffff"},
      {键:"zi",名:"按钮字色",类型:"color",默认:"#111111"},
      {键:"saoliang",名:"扫光亮度",类型:"slider",最小:10,最大:80,步长:1,默认:45},
      {键:"sudu",名:"扫光时长（秒）",类型:"slider",最小:0.3,最大:1.2,步长:0.05,默认:0.65},
      {键:"guang",名:"辉光强度",类型:"slider",最小:0,最大:50,步长:1,默认:22},
      {键:"yuanjiao",名:"圆角（px）",类型:"slider",最小:0,最大:1000,步长:1,默认:6},
      {键:"gao",名:"按钮高（px）",类型:"slider",最小:36,最大:56,步长:1,默认:42},
      {键:"zihao",名:"字号（px）",类型:"slider",最小:12,最大:18,步长:1,默认:14}
    ],
    效果说明: "按钮内一道 115° 高光从左扫到右（::after 平移），hover 触发；配白渐变底 + inset 顶高光 + 冷蓝辉光。演示页每 3s 自动扫一次。\n能怎么改：「扫光亮度」决定高光存在感，「扫光时长」决定快慢（0.3s 干脆 / 1.2s 优雅）；主按钮色改动后需同步调「按钮字色」保证对比。\n来源：方案库 m002 暗色波光基建首屏拆解（2026-09-16）；同源还有 v220/v222/v223",
    用法: "「扫光亮度」决定高光存在感，「扫光时长」决定快慢（0.3s 干脆 / 1.2s 优雅）；主按钮色改动后需同步调「按钮字色」保证对比。",
    提示词: "【效果】按钮内一道 115° 高光从左扫到右（::after 平移），hover 触发；配白渐变底 + inset 顶高光 + 冷蓝辉光。演示页每 3s 自动扫一次。\n【用法示例】\n- 银白按钮配蓝白辉光=基建感；换成品牌色时辉光建议同步改。\n- 扫光亮度 70+ 会很「促销」，发布页建议 40 左右。\n【关键参数】\n• 页面底色（color）：默认 #101014\n• 主按钮色（color）：默认 #ffffff\n• 按钮字色（color）：默认 #111111\n• 扫光亮度（slider）：默认 45，范围 10–80\n• 扫光时长（秒）（slider）：默认 0.65，范围 0.3–1.2\n• 辉光强度（slider）：默认 22，范围 0–50\n• 圆角（px）（slider）：默认 6，范围 0–1000\n• 按钮高（px）（slider）：默认 42，范围 36–56\n• 字号（px）（slider）：默认 14，范围 12–18\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>扫光按钮 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;\n         background: var(--di); font-family: \"Inter\", system-ui, \"Microsoft YaHei\", sans-serif; }\n  .row { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; padding: 0 20px; }\n  /* 扫光三件套：overflow 裁切 + ::after 斜向高光静止在左侧 + hover 时平移扫过 */\n  .btn { position: relative; isolation: isolate; overflow: hidden; display: inline-flex; align-items: center; justify-content: center;\n         height: calc(var(--gao)*1px); padding: 0 22px; border-radius: var(--yuanjiao);\n         font-size: calc(var(--zihao)*1px); font-weight: 500; letter-spacing: -.02em; line-height: 1; white-space: nowrap;\n         cursor: pointer; transition: background .35s, border-color .35s, box-shadow .35s, filter .35s; }\n  .btn::after { content: \"\"; position: absolute; inset: 0; pointer-events: none;\n         background: linear-gradient(115deg, transparent 20%, color-mix(in srgb, #fff calc(var(--saoliang)*1%), transparent) 48%, transparent 76%);\n         transform: translateX(-130%); }\n  .btn:hover::after, .btn.demo::after { transform: translateX(130%); transition: transform var(--sudu) ease; }\n  .solid { background: linear-gradient(180deg, var(--zhucai) 0%, color-mix(in srgb, var(--zhucai) 91%, #000) 48%, color-mix(in srgb, var(--zhucai) 81%, #000) 100%);\n         color: var(--zi); border: 1px solid var(--zhucai);\n         box-shadow: inset 0 1px 0 rgba(255,255,255,.95), 0 0 calc(var(--guang)*1px) rgba(186,208,255,.18); }\n  .solid:hover { filter: brightness(1.05);\n         box-shadow: inset 0 1px 0 #fff, 0 0 calc(var(--guang)*1.6px) rgba(186,208,255,.4), 0 8px 18px rgba(255,255,255,.1); }\n  .ghost { background: linear-gradient(135deg, rgba(255,255,255,.1), rgba(0,0,0,.45) 50%, rgba(160,175,200,.08));\n         color: #fff; border: 1px solid rgba(198,198,198,.45); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }\n  .ghost:hover { border-color: rgba(220,230,255,.75);\n         box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 0 calc(var(--guang)*1px) rgba(170,200,255,.22); }\n  .accent { background: linear-gradient(180deg, #f26b1d, #c9500f); color: #fff; border: 1px solid #f26b1d; }\n  .accent:hover { filter: brightness(1.08); box-shadow: 0 0 calc(var(--guang)*1.4px) rgba(242,107,29,.4); }\n</style>\n</head>\n<body>\n  <div class=\"row\">\n    <button class=\"btn solid\">Start for Free</button>\n    <button class=\"btn ghost\">See it in action</button>\n    <button class=\"btn accent\">立即升级</button>\n  </div>\n  <div class=\"row\" id=\"auto\">\n    <button class=\"btn solid\">自动演示</button>\n  </div>\n<script>\nconst state = { di:'#101014', zhucai:'#ffffff', zi:'#111111',\n                saoliang:45, sudu:0.65, guang:22, yuanjiao:6, gao:42, zihao:14 };\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--di', state.di); R.setProperty('--zhucai', state.zhucai);\n  R.setProperty('--zi', state.zi); R.setProperty('--saoliang', state.saoliang);\n  R.setProperty('--sudu', state.sudu + 's'); R.setProperty('--guang', state.guang);\n  R.setProperty('--yuanjiao', state.yuanjiao + 'px'); R.setProperty('--gao', state.gao);\n  R.setProperty('--zihao', state.zihao);\n}\nwindow.addEventListener('message', e => {\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\n// 每 3s 自动扫一次，预览/截图不依赖鼠标\nconst auto = document.querySelector('#auto .btn');\nsetInterval(() => { auto.classList.add('demo'); setTimeout(() => auto.classList.remove('demo'), 900); }, 3000);\napply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v222",
    标题: "丝绢波光背景",
    分类: "背景",
    子类: "渐变",
    风格: ["暗色", "极简"],
    场景: ["官网·品牌站", "落地页·发布页", "作品集·叙事"],
    元素: ["视觉", "动效"],
    搭配: [
      "入场序列"
    ],
    标签: [
      "波光",
      "背景",
      "canvas",
      "星野",
      "颗粒",
      "暗色",
      "离线"
    ],
    来源: "方案库 m002 暗色波光基建首屏拆解（2026-09-16；原站 hero 为 CloudFront 视频，改由 canvas 2D 离线生成波光+星野，零外链）",
    效果演示: "assets/demos/丝绢波光背景.html",
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#000000"},
      {键:"bolan",名:"波光色",类型:"color",默认:"#dfe6ef"},
      {键:"xingse",名:"星点色",类型:"color",默认:"#ffffff"},
      {键:"bolansu",名:"流速",类型:"slider",最小:0,最大:3,步长:0.1,默认:1},
      {键:"xingxing",名:"星点数量",类型:"slider",最小:0,最大:500,步长:10,默认:220},
      {键:"keli",名:"颗粒强度（%）",类型:"slider",最小:0,最大:40,步长:1,默认:16},
      {键:"mohu",名:"模糊度（px）",类型:"slider",最小:10,最大:50,步长:1,默认:26},
      {键:"daikuan",名:"波带宽度（%）",类型:"slider",最小:15,最大:50,步长:1,默认:30},
      {键:"weiyi",名:"波带位置（%）",类型:"slider",最小:30,最大:90,步长:1,默认:60}
    ],
    效果说明: "46 条同轮廓正弦亮线靠 CSS blur 融成一条缓缓流动的丝绢波带，独立星点层微闪，SVG 噪点罩压质感；文案浮在其上始终可读。\n能怎么改：「流速」0 是静帧、2+ 变急流；「模糊度」越大越像绸、越小越像线条画；「波带位置/宽度」决定波在画面哪一层；改「波光色」即可换氛围（银灰=基建、暖金=复古）。\n来源：方案库 m002 暗色波光基建首屏拆解（2026-09-16；原站 hero 为 CloudFront 视频，改由 canvas 2D 离线生成波光+星野，零外链）",
    用法: "「流速」0 是静帧、2+ 变急流；「模糊度」越大越像绸、越小越像线条画；「波带位置/宽度」决定波在画面哪一层；改「波光色」即可换氛围（银灰=基建、暖金=复古）。",
    提示词: "【效果】46 条同轮廓正弦亮线靠 CSS blur 融成一条缓缓流动的丝绢波带，独立星点层微闪，SVG 噪点罩压质感；文案浮在其上始终可读。\n【用法示例】\n- 想更「基建感」：流速 0.6、颗粒 8、星点 120。\n- 想更梦幻：波光色调成 #c9b8ff、流速 1.6。\n【关键参数】\n• 页面底色（color）：默认 #000000\n• 波光色（color）：默认 #dfe6ef\n• 星点色（color）：默认 #ffffff\n• 流速（slider）：默认 1，范围 0–3\n• 星点数量（slider）：默认 220，范围 0–500\n• 颗粒强度（%）（slider）：默认 16，范围 0–40\n• 模糊度（px）（slider）：默认 26，范围 10–50\n• 波带宽度（%）（slider）：默认 30，范围 15–50\n• 波带位置（%）（slider）：默认 60，范围 30–90\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>丝绢波光背景 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { height: 100vh; overflow: hidden; background: var(--di);\n         font-family: \"Inter\", system-ui, \"Microsoft YaHei\", sans-serif; color: var(--xingse); }\n  /* 波带画成锐利细线，靠 CSS blur 融成丝绢；scale 放大防止模糊边缘露黑框 */\n  #cloud { position: fixed; inset: 0; display: block;\n           filter: blur(calc(var(--mohu)*1px)); transform: scale(1.14); }\n  #starcv { position: fixed; inset: 0; display: block; }\n  .grain { position: fixed; inset: 0; z-index: 100; pointer-events: none; opacity: calc(var(--keli) / 100);\n           background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\");\n           background-size: 300px 300px; }\n  .read { position: relative; z-index: 10; height: 100%; display: flex; flex-direction: column;\n          align-items: center; justify-content: center; text-align: center; padding: 0 24px; }\n  .read h1 { font-size: clamp(30px, 5vw, 54px); font-weight: 500; letter-spacing: -.045em; line-height: 1.12; }\n  .read p { margin-top: 16px; max-width: 460px; color: color-mix(in srgb, var(--xingse) 60%, transparent);\n            font-size: 15.5px; line-height: 1.55; }\n</style>\n</head>\n<body>\n  <canvas id=\"cloud\"></canvas>\n  <canvas id=\"starcv\"></canvas>\n  <div class=\"grain\" aria-hidden=\"true\"></div>\n  <div class=\"read\">\n    <h1>Layers hold<br>tales of time</h1>\n    <p>背景只做衬托不做主角：波光在文案身后缓慢流动，文字始终清晰可读。</p>\n  </div>\n<script>\nconst state = { di:'#000000', bolan:'#dfe6ef', xingse:'#ffffff',\n                bolansu:1, xingxing:220, keli:16, mohu:26, daikuan:30, weiyi:60 };\nconst cloud = document.getElementById('cloud'), starcv = document.getElementById('starcv');\nconst cctx = cloud.getContext('2d'), sctx = starcv.getContext('2d');\nlet W = 0, H = 0, DPR = Math.min(devicePixelRatio || 1, 2), starList = [];\nfunction hexToRgb(h){ const v = parseInt(String(h).replace('#',''), 16); return [(v>>16)&255,(v>>8)&255,v&255]; }\nfunction resize(){\n  W = innerWidth; H = innerHeight;\n  [cloud, starcv].forEach(c => { c.width = W*DPR; c.height = H*DPR; c.style.width = W+'px'; c.style.height = H+'px';\n    c.getContext('2d').setTransform(DPR,0,0,DPR,0,0); });\n  seed();\n}\nfunction seed(){\n  starList = [];\n  for (let i=0;i<state.xingxing;i++) starList.push({ x:Math.random()*W, y:Math.random()*H,\n    r:Math.random()*0.9+0.3, a:Math.random()*0.6+0.15, p:Math.random()*6.28, s:Math.random()*1.4+0.4 });\n}\n/* 波带轮廓：三个频率的正弦叠加；weiyi 定波带高度、daikuan 定展开宽度 */\nfunction yAt(x, off){\n  const base = H * state.weiyi / 100;\n  return base\n    + Math.sin(x*0.0021 + off*0.02 + t*0.55) * H*0.13\n    + Math.sin(x*0.0047 - off*0.012 - t*0.8) * H*0.05\n    + Math.sin(x*0.0009 + t*0.3) * H*0.07\n    + off;\n}\nlet t = 0, last = 0;\nfunction drawWave(now){\n  t += Math.min(0.05, (now-last)/1000 || 0.016) * state.bolansu; last = now;\n  const c = cctx, rgb = hexToRgb(state.bolan), span = H * state.daikuan / 100;\n  c.clearRect(0,0,W,H);\n  c.globalCompositeOperation = 'lighter';\n  for (let i=0;i<46;i++){\n    const k = i/45, off = (k-0.5)*span, a = Math.pow(Math.cos((k-0.5)*Math.PI), 2.2);\n    c.beginPath();\n    for (let x=-40; x<=W+40; x+=14){ const y = yAt(x, off); x===-40 ? c.moveTo(x,y) : c.lineTo(x,y); }\n    c.strokeStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+(0.045+0.42*a).toFixed(3)+')';\n    c.lineWidth = 8 + 20*a;\n    c.stroke();\n  }\n  c.globalCompositeOperation = 'source-over';\n}\nfunction drawStars(now){\n  sctx.clearRect(0,0,W,H); sctx.fillStyle = state.xingse;\n  for (const st of starList){\n    sctx.globalAlpha = st.a * (0.55 + 0.45*Math.sin(now*0.001*st.s + st.p));\n    sctx.beginPath(); sctx.arc(st.x, st.y, st.r, 0, 6.2832); sctx.fill();\n  }\n  sctx.globalAlpha = 1;\n}\nfunction loop(now){ drawWave(now); drawStars(now); requestAnimationFrame(loop); }\naddEventListener('resize', resize);\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--di', state.di); R.setProperty('--bolan', state.bolan);\n  R.setProperty('--xingse', state.xingse); R.setProperty('--keli', state.keli);\n  R.setProperty('--mohu', state.mohu);\n  if (starList.length !== state.xingxing) seed();\n}\naddEventListener('message', e => {\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\nresize(); apply(); requestAnimationFrame(loop);\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v223",
    标题: "统计页脚条",
    分类: "组件",
    子类: "状态反馈",
    风格: ["暗色", "极简"],
    场景: ["落地页·发布页", "官网·品牌站"],
    元素: ["布局", "动效"],
    搭配: [
      "入场序列"
    ],
    标签: [
      "统计",
      "页脚",
      "信任数字",
      "入场",
      "图标",
      "单屏"
    ],
    来源: "方案库 m002 暗色波光基建首屏拆解（2026-09-16）；同源还有 v220/v221/v222",
    效果演示: "assets/demos/统计页脚条.html",
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#050505"},
      {键:"zi",名:"文字色",类型:"color",默认:"#d8d8d8"},
      {键:"tubiao",名:"图标色",类型:"color",默认:"#e8e8e8"},
      {键:"qiang",名:"图标点缀色",类型:"color",默认:"#f26b1d"},
      {键:"zihao",名:"字号（px）",类型:"slider",最小:11,最大:18,步长:0.5,默认:13.5},
      {键:"jiange",名:"条间距（px）",类型:"slider",最小:12,最大:48,步长:2,默认:24},
      {键:"hbian",名:"左右边距（px）",类型:"slider",最小:24,最大:120,步长:4,默认:72},
      {键:"donghua",名:"入场时长（秒）",类型:"slider",最小:0.6,最大:2,步长:0.05,默认:1.05},
      {键:"xuhao",名:"序列间隔（秒）",类型:"slider",最小:0.05,最大:0.3,步长:0.01,默认:0.16}
    ],
    效果说明: "页脚横排三条「图标 + 一句话硬数字」，全内联 SVG（双色药丸 / 下载方块 / 三头像）；按 0.16s 序列从下方依次浮入，动画失效也不空白。\n能怎么改：三条只放最硬的数字（量级 / 降幅 / 规模）；「序列间隔」拉大更有仪式感；手机端自动纵排居中。\n来源：方案库 m002 暗色波光基建首屏拆解（2026-09-16）；同源还有 v220/v221/v222",
    用法: "三条只放最硬的数字（量级 / 降幅 / 规模）；「序列间隔」拉大更有仪式感；手机端自动纵排居中。",
    提示词: "【效果】页脚横排三条「图标 + 一句话硬数字」，全内联 SVG（双色药丸 / 下载方块 / 三头像）；按 0.16s 序列从下方依次浮入，动画失效也不空白。\n【用法示例】\n- 克制风：入场时长 1.4、序列间隔 0.22。\n- 亮色页面：底 #f7f5f0、文字 #3a3a3a、图标点缀色换品牌色。\n【关键参数】\n• 页面底色（color）：默认 #050505\n• 文字色（color）：默认 #d8d8d8\n• 图标色（color）：默认 #e8e8e8\n• 图标点缀色（color）：默认 #f26b1d\n• 字号（px）（slider）：默认 13.5，范围 11–18\n• 条间距（px）（slider）：默认 24，范围 12–48\n• 左右边距（px）（slider）：默认 72，范围 24–120\n• 入场时长（秒）（slider）：默认 1.05，范围 0.6–2\n• 序列间隔（秒）（slider）：默认 0.16，范围 0.05–0.3\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>统计页脚条 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;\n         background: var(--di); font-family: \"Inter\", system-ui, \"Microsoft YaHei\", sans-serif; }\n  .demo-copy { flex: 1; display: flex; align-items: center; justify-content: center; text-align: center;\n               color: var(--zi); font-size: clamp(26px, 4vw, 44px); font-weight: 500; letter-spacing: -.03em;\n               opacity: .35; padding: 0 24px; }\n  .stats { display: flex; align-items: center; justify-content: space-between; gap: calc(var(--jiange)*1px);\n           padding: 22px var(--hbian) 26px; color: var(--zi); }\n  .stat { display: inline-flex; align-items: center; gap: 14px;\n          font-size: calc(var(--zihao)*1px); letter-spacing: -.015em; white-space: nowrap;\n          opacity: 0; transform: translateY(20px);\n          animation: in-stat var(--donghua) cubic-bezier(.16,1,.3,1) both;\n          animation-delay: calc(var(--i) * var(--xuhao) * 1s + .2s); }\n  @keyframes in-stat { to { opacity: 1; transform: none; } }\n  .stat svg { width: 20px; height: 20px; flex: none; }\n  .stat .wide { width: 38px; height: 21px; }\n  @media (max-width: 760px){\n    .stats { flex-direction: column; align-items: center; gap: 16px; }\n    .stat { white-space: normal; }\n  }\n</style>\n</head>\n<body>\n  <div class=\"demo-copy\">页面主张占位<br>统计压在页脚</div>\n  <footer class=\"stats\">\n    <div class=\"stat\" style=\"--i:0\">\n      <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\">\n        <defs>\n          <linearGradient id=\"sa\" x1=\"3\" y1=\"2\" x2=\"14\" y2=\"22\" gradientUnits=\"userSpaceOnUse\">\n            <stop offset=\"0\" stop-color=\"#ffffff\" stop-opacity=\".38\"/><stop offset=\"1\" stop-color=\"#3a3a3a\" stop-opacity=\".62\"/>\n          </linearGradient>\n          <linearGradient id=\"sb\" x1=\"3\" y1=\"2\" x2=\"14\" y2=\"22\" gradientUnits=\"userSpaceOnUse\">\n            <stop offset=\"0\" stop-color=\"#3a3a3a\" stop-opacity=\".38\"/><stop offset=\"1\" stop-color=\"#ffffff\" stop-opacity=\".62\"/>\n          </linearGradient>\n        </defs>\n        <rect x=\"3.4\" y=\"2.6\" width=\"7.2\" height=\"18.8\" rx=\"3.6\" fill=\"url(#sa)\"/>\n        <rect x=\"13.4\" y=\"2.6\" width=\"7.2\" height=\"18.8\" rx=\"3.6\" fill=\"url(#sb)\"/>\n        <rect x=\"9.2\" y=\"10.9\" width=\"5.6\" height=\"2.2\" rx=\"1.1\" fill=\"#4a4a4a\"/>\n      </svg>\n      <span>4.2M+ workflows automated</span>\n    </div>\n    <div class=\"stat\" style=\"--i:1\">\n      <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\">\n        <rect x=\"2.4\" y=\"2.4\" width=\"19.2\" height=\"19.2\" rx=\"6.2\" fill=\"var(--tubiao)\"/>\n        <path d=\"M12 7.1v7.4\" stroke=\"#111\" stroke-width=\"1.85\" stroke-linecap=\"round\"/>\n        <path d=\"M8.15 12.35L12 16.2l3.85-3.85\" stroke=\"#111\" stroke-width=\"1.85\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>\n      </svg>\n      <span>92% reduction in manual operations</span>\n    </div>\n    <div class=\"stat\" style=\"--i:2\">\n      <svg class=\"wide\" viewBox=\"0 0 40 22\" aria-hidden=\"true\">\n        <circle cx=\"10.2\" cy=\"11\" r=\"9.2\" fill=\"#2b2b2b\"/>\n        <ellipse cx=\"10.2\" cy=\"12.1\" rx=\"4.15\" ry=\"3.7\" fill=\"#f4f4f4\"/>\n        <path d=\"M4.9 8.6l2.4 1.7-2.5 1.2z\" fill=\"#2b2b2b\"/><path d=\"M15.5 8.6l-2.4 1.7 2.5 1.2z\" fill=\"#2b2b2b\"/>\n        <circle cx=\"8.9\" cy=\"11.6\" r=\"0.7\" fill=\"#1a1a1a\"/><circle cx=\"11.5\" cy=\"11.6\" r=\"0.7\" fill=\"#1a1a1a\"/>\n        <circle cx=\"20.2\" cy=\"11\" r=\"9.2\" fill=\"#ffffff\"/>\n        <circle cx=\"17.6\" cy=\"9.8\" r=\"1.7\" fill=\"#111\"/><circle cx=\"22.8\" cy=\"9.8\" r=\"1.7\" fill=\"#111\"/>\n        <ellipse cx=\"20.2\" cy=\"13.4\" rx=\"1.2\" ry=\"0.9\" fill=\"#111\"/>\n        <path d=\"M17.8 15.6q2.4 2 4.8 0\" stroke=\"#111\" stroke-width=\"1.2\" fill=\"none\" stroke-linecap=\"round\"/>\n        <circle cx=\"30.2\" cy=\"11\" r=\"9.2\" fill=\"var(--qiang)\"/>\n        <text x=\"30.2\" y=\"15.1\" font-family=\"Inter,system-ui,sans-serif\" font-weight=\"700\" font-size=\"12.5\" fill=\"#fff\" text-anchor=\"middle\">e</text>\n      </svg>\n      <span>180+ operational teams onboarded</span>\n    </div>\n  </footer>\n<script>\nconst state = { di:'#050505', zi:'#d8d8d8', tubiao:'#e8e8e8', qiang:'#f26b1d',\n                zihao:13.5, jiange:24, hbian:72, donghua:1.05, xuhao:0.16 };\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--di', state.di); R.setProperty('--zi', state.zi);\n  R.setProperty('--tubiao', state.tubiao); R.setProperty('--qiang', state.qiang);\n  R.setProperty('--zihao', state.zihao); R.setProperty('--jiange', state.jiange);\n  R.setProperty('--hbian', state.hbian + 'px'); R.setProperty('--donghua', state.donghua + 's');\n  R.setProperty('--xuhao', state.xuhao);\n}\naddEventListener('message', e => {\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\napply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v224",
    标题: "毛玻璃卡片",
    分类: "组件",
    子类: "浮层",
    风格: ["玻璃拟态", "轻盈"],
    场景: ["全站通用", "后台·控制台", "工具·SaaS"],
    元素: ["视觉", "构成"],
    搭配: [
      "主题切换"
    ],
    标签: [
      "毛玻璃",
      "glassmorphism",
      "卡片",
      "backdrop",
      "浮层",
      "渐变"
    ],
    来源: "方案库 f003 玻璃拟态风拆解（2026-09-16，抠出的卡片组件）",
    效果演示: "assets/demos/毛玻璃卡片.html",
    参数: [
      {键:"beijing1",名:"背景渐变色1",类型:"color",默认:"#ff9a9e"},
      {键:"beijing2",名:"背景渐变色2",类型:"color",默认:"#a18cd1"},
      {键:"boli",名:"玻璃色",类型:"color",默认:"#ffffff"},
      {键:"touming",名:"玻璃不透明度（%）",类型:"slider",最小:5,最大:30,步长:1,默认:12},
      {键:"mohu",名:"模糊（px）",类型:"slider",最小:4,最大:30,步长:1,默认:16},
      {键:"yuanjiao",名:"圆角（px）",类型:"slider",最小:0,最大:32,步长:1,默认:16},
      {键:"miaobian",名:"描边亮度（%）",类型:"slider",最小:4,最大:40,步长:1,默认:18},
      {键:"zihao",名:"正文字号（px）",类型:"slider",最小:13,最大:18,步长:1,默认:15}
    ],
    效果说明: "半透白底 + backdrop blur + 亮描边 + 内顶高光，浮在彩色渐变上；底色透出来、前景仍清晰——层次靠「透」不靠「透明」。\n能怎么改：「玻璃不透明度」是灵魂：低于 8% 会糊成一片、高于 25% 变普通白卡；「模糊」14–20 最自然；背景渐变越鲜艳玻璃越出效果。\n来源：方案库 f003 玻璃拟态风拆解（2026-09-16，抠出的卡片组件）",
    用法: "「玻璃不透明度」是灵魂：低于 8% 会糊成一片、高于 25% 变普通白卡；「模糊」14–20 最自然；背景渐变越鲜艳玻璃越出效果。",
    提示词: "【效果】半透白底 + backdrop blur + 亮描边 + 内顶高光，浮在彩色渐变上；底色透出来、前景仍清晰——层次靠「透」不靠「透明」。\n【用法示例】\n- 商务风：背景换 #667eea→#764ba2、圆角 12。\n- 毛玻璃发虚时先加描边亮度再加不透明度。\n【关键参数】\n• 背景渐变色1（color）：默认 #ff9a9e\n• 背景渐变色2（color）：默认 #a18cd1\n• 玻璃色（color）：默认 #ffffff\n• 玻璃不透明度（%）（slider）：默认 12，范围 5–30\n• 模糊（px）（slider）：默认 16，范围 4–30\n• 圆角（px）（slider）：默认 16，范围 0–32\n• 描边亮度（%）（slider）：默认 18，范围 4–40\n• 正文字号（px）（slider）：默认 15，范围 13–18\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>毛玻璃卡片 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { min-height: 100vh; display: flex; align-items: center; justify-content: center; gap: 26px; flex-wrap: wrap;\n         padding: 48px 24px; background: linear-gradient(135deg, var(--beijing1), var(--beijing2));\n         font-family: \"Inter\", system-ui, \"Microsoft YaHei\", sans-serif; }\n  /* 毛玻璃 = 半透白底 + backdrop blur + 亮描边 + 内顶高光，缺一样就「塑料」 */\n  .card { width: 300px; padding: 26px 24px; border-radius: calc(var(--yuanjiao)*1px);\n          background: color-mix(in srgb, var(--boli) calc(var(--touming)*1%), transparent);\n          -webkit-backdrop-filter: blur(calc(var(--mohu)*1px)); backdrop-filter: blur(calc(var(--mohu)*1px));\n          border: 1px solid color-mix(in srgb, #fff calc(var(--miaobian)*1%), transparent);\n          box-shadow: inset 0 1px 0 color-mix(in srgb, #fff calc(var(--miaobian)*0.9*1%), transparent),\n                      0 18px 44px rgba(0,0,0,.18); }\n  .card h3 { color: #1c1c1e; font-size: calc(var(--zihao) + 3px); font-weight: 700; letter-spacing: -.02em; }\n  .card p { margin-top: 10px; color: rgba(28,28,30,.72); font-size: calc(var(--zihao)*1px); line-height: 1.6; }\n  .card button { margin-top: 18px; border: 0; border-radius: 999px; padding: 9px 20px;\n          background: #1c1c1e; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer;\n          transition: transform .2s; }\n  .card button:hover { transform: scale(1.04); }\n</style>\n</head>\n<body>\n  <div class=\"card\">\n    <h3>玻璃拟态卡片</h3>\n    <p>毛玻璃浮在彩色渐变之上：底色透出来、前景仍清晰，是「层次」而不是「透明」。</p>\n    <button>了解详情</button>\n  </div>\n  <div class=\"card\">\n    <h3>浮层信息组</h3>\n    <p>同一语言可以叠多张：告警、摘要、行程卡都能用这一套玻璃语言承载。</p>\n    <button>查看更多</button>\n  </div>\n</body>\n<script>\nconst state = { beijing1:'#ff9a9e', beijing2:'#a18cd1', boli:'#ffffff',\n                touming:12, mohu:16, yuanjiao:16, miaobian:18, zihao:15 };\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--beijing1', state.beijing1); R.setProperty('--beijing2', state.beijing2);\n  R.setProperty('--boli', state.boli); R.setProperty('--touming', state.touming);\n  R.setProperty('--mohu', state.mohu); R.setProperty('--yuanjiao', state.yuanjiao);\n  R.setProperty('--miaobian', state.miaobian); R.setProperty('--zihao', state.zihao);\n}\naddEventListener('message', e => {\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\napply();\n<\/script>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v225",
    标题: "胶片横滚长廊",
    分类: "组件",
    子类: "轮播",
    风格: ["复古", "暖调"],
    场景: ["作品集·叙事", "内容·阅读", "电商·预订"],
    元素: ["构成", "手势"],
    搭配: [
      "滚动联动"
    ],
    标签: [
      "胶片",
      "横滚",
      "长廊",
      "齿孔",
      "复古",
      "拖拽",
      "颗粒"
    ],
    来源: "方案库 f013 复古胶片型拆解（2026-09-16，抠出的长廊组件）",
    效果演示: "assets/demos/胶片横滚长廊.html",
    参数: [
      {键:"jiaojuan",名:"胶片底色",类型:"color",默认:"#15120f"},
      {键:"ziti",名:"文字色",类型:"color",默认:"#e8ddcc"},
      {键:"qiangdiao",名:"强调色",类型:"color",默认:"#b3472f"},
      {键:"zhakuan",名:"帧宽（px）",类型:"slider",最小:220,最大:420,步长:10,默认:300},
      {键:"chikong",名:"齿孔大小（px）",类型:"slider",最小:6,最大:16,步长:1,默认:10},
      {键:"sasa",名:"颗粒强度（%）",类型:"slider",最小:0,最大:35,步长:1,默认:14},
      {键:"yuanjiao",名:"圆角（px）",类型:"slider",最小:0,最大:24,步长:1,默认:6},
      {键:"sudu",名:"滚轮速度",类型:"slider",最小:0.5,最大:2,步长:0.1,默认:1}
    ],
    效果说明: "一排带上下齿孔的「胶片帧」横向延展：滚轮纵向量转横滚、按住可拖拽，帧面用强调色与暖棕交替渐变，全页蒙一层胶片颗粒。\n能怎么改：「齿孔大小」决定胶片感强弱（8 以下就不像了）；帧内容换成真实图文即可直接用；「滚轮速度」1.4 左右最顺手。\n来源：方案库 f013 复古胶片型拆解（2026-09-16，抠出的长廊组件）",
    用法: "「齿孔大小」决定胶片感强弱（8 以下就不像了）；帧内容换成真实图文即可直接用；「滚轮速度」1.4 左右最顺手。",
    提示词: "【效果】一排带上下齿孔的「胶片帧」横向延展：滚轮纵向量转横滚、按住可拖拽，帧面用强调色与暖棕交替渐变，全页蒙一层胶片颗粒。\n【用法示例】\n- 更旧更脏：胶片底 #0f0d0a、颗粒 28。\n- 作品集用：帧宽 360、圆角 10、强调色换作品主色。\n【关键参数】\n• 胶片底色（color）：默认 #15120f\n• 文字色（color）：默认 #e8ddcc\n• 强调色（color）：默认 #b3472f\n• 帧宽（px）（slider）：默认 300，范围 220–420\n• 齿孔大小（px）（slider）：默认 10，范围 6–16\n• 颗粒强度（%）（slider）：默认 14，范围 0–35\n• 圆角（px）（slider）：默认 6，范围 0–24\n• 滚轮速度（slider）：默认 1，范围 0.5–2\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>胶片横滚长廊 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { min-height: 100vh; display: flex; align-items: center; background: var(--jiaojuan);\n         font-family: \"Inter\", system-ui, \"Microsoft YaHei\", sans-serif; overflow: hidden; }\n  /* 胶片 = 齿孔条（repeating 渐变）+ 帧格横滚；齿孔上下各一条，帧间距即「剪开」感 */\n  .strip { display: flex; gap: calc(var(--zhakuan)*0.06px); overflow-x: auto; padding: 34px 8vw;\n           scrollbar-width: none; cursor: grab; width: 100%; }\n  .strip::-webkit-scrollbar { display: none; }\n  .strip.drag { cursor: grabbing; }\n  .film { position: relative; flex: none; width: calc(var(--zhakuan)*1px);\n          background: color-mix(in srgb, var(--jiaojuan) 86%, #fff);\n          border-radius: calc(var(--yuanjiao)*1px); padding: 26px 10px; }\n  .film::before, .film::after { content: \"\"; position: absolute; left: 10px; right: 10px; height: calc(var(--chikong)*1px);\n          background-image: radial-gradient(circle, var(--jiaojuan) 42%, transparent 46%);\n          background-size: calc(var(--chikong)*2.4px) calc(var(--chikong)*1px);\n          background-position: center; background-repeat: repeat-x; }\n  .film::before { top: 9px; } .film::after { bottom: 9px; }\n  .frame { height: 300px; border-radius: 4px; display: flex; align-items: flex-end; padding: 14px;\n           background: linear-gradient(160deg, color-mix(in srgb, var(--qiangdiao) 72%, #1a1108), color-mix(in srgb, var(--ziti) 24%, #14100b)); }\n  .film:nth-child(even) .frame { background: linear-gradient(200deg, color-mix(in srgb, var(--ziti) 34%, #14100b), color-mix(in srgb, var(--qiangdiao) 40%, #1a1108)); }\n  .frame span { color: var(--ziti); font-size: 13px; letter-spacing: .02em; opacity: .9; }\n  .grain { position: fixed; inset: 0; pointer-events: none; opacity: calc(var(--sasa) / 100);\n           background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\");\n           background-size: 300px 300px; }\n</style>\n</head>\n<body>\n  <div class=\"strip\" id=\"strip\"></div>\n  <div class=\"grain\" aria-hidden=\"true\"></div>\n<script>\nconst state = { jiaojuan:'#15120f', ziti:'#e8ddcc', qiangdiao:'#b3472f',\n                zhakuan:300, chikong:10, sasa:14, yuanjiao:6, sudu:1 };\nconst strip = document.getElementById('strip');\nconst captions = ['S01 · 出发','S02 · 站台','S03 · 慢车','S04 · 午后','S05 · 车窗','S06 · 终点'];\nfunction build(){\n  strip.innerHTML = captions.map(c =>\n    '<div class=\"film\"><div class=\"frame\"><span>' + c + '</span></div></div>').join('');\n}\nbuild();\n/* 滚轮纵向量转横向滚动；按住拖拽 = 胶片手感 */\nstrip.addEventListener('wheel', e => {\n  e.preventDefault();\n  strip.scrollLeft += (e.deltaY + e.deltaX) * state.sudu;\n}, { passive: false });\nlet down = false, sx = 0, sl = 0;\nstrip.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sl = strip.scrollLeft; strip.classList.add('drag'); });\naddEventListener('pointermove', e => { if (down) strip.scrollLeft = sl - (e.clientX - sx) * 1.4; });\naddEventListener('pointerup', () => { down = false; strip.classList.remove('drag'); });\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--jiaojuan', state.jiaojuan); R.setProperty('--ziti', state.ziti);\n  R.setProperty('--qiangdiao', state.qiangdiao); R.setProperty('--zhakuan', state.zhakuan);\n  R.setProperty('--chikong', state.chikong); R.setProperty('--sasa', state.sasa);\n  R.setProperty('--yuanjiao', state.yuanjiao);\n}\naddEventListener('message', e => {\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value;\n  if (d.key === 'zhakuan') build();\n  apply();\n});\napply();\n// 开场停在第二帧，截图能看到「长廊在延伸」而不是一条空带\nsetTimeout(() => { strip.scrollLeft = state.zhakuan * 0.75; }, 60);\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v226",
    标题: "对话入口 Hero",
    分类: "布局骨架",
    子类: "首屏Hero",
    风格: ["暗色", "AI产品"],
    场景: ["工具·SaaS", "落地页·发布页"],
    元素: ["布局", "构成"],
    搭配: [
      "菜单搜索"
    ],
    标签: [
      "对话",
      "输入框",
      "AI",
      "首屏",
      "快捷标签",
      "入口卡"
    ],
    来源: "方案库 s203 首页动线 / s205 焦点型Hero 拆解（2026-09-16，居中对话入口模式；两方案同源只拆一条）",
    效果演示: "assets/demos/对话入口Hero.html",
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#141414"},
      {键:"kuang",名:"输入框底色",类型:"color",默认:"#1e1e1e"},
      {键:"zi",名:"文字色",类型:"color",默认:"#ececec"},
      {键:"qiangdiao",名:"强调色",类型:"color",默认:"#ff4d6d"},
      {键:"zihao",名:"标题字号（px）",类型:"slider",最小:26,最大:48,步长:1,默认:34},
      {键:"kuan",名:"输入框宽（px）",类型:"slider",最小:480,最大:900,步长:10,默认:680},
      {键:"yuanjiao",名:"输入框圆角（px）",类型:"slider",最小:8,最大:36,步长:1,默认:24},
      {键:"bing",名:"快捷标签数",类型:"slider",最小:3,最大:6,步长:1,默认:4}
    ],
    效果说明: "居中一句「有什么可以帮忙的？」+ 大圆角输入框（内嵌发送钮、focus 描边点亮强调色）+ 快捷标签 chips + 四张入口卡；整屏只有一个动作：开口问。\n能怎么改：标题直接写用户能做的事（「帮我写周报」比「智能助手」好用）；快捷标签由「标签数」控制自动重建；强调色只出现在发送钮与 focus 描边两处。\n来源：方案库 s203 首页动线 / s205 焦点型Hero 拆解（2026-09-16，居中对话入口模式；两方案同源只拆一条）",
    用法: "标题直接写用户能做的事（「帮我写周报」比「智能助手」好用）；快捷标签由「标签数」控制自动重建；强调色只出现在发送钮与 focus 描边两处。",
    提示词: "【效果】居中一句「有什么可以帮忙的？」+ 大圆角输入框（内嵌发送钮、focus 描边点亮强调色）+ 快捷标签 chips + 四张入口卡；整屏只有一个动作：开口问。\n【用法示例】\n- OpenAI 风：底 #212121、强调 #10a37f、圆角 28。\n- 输入框宽度永远别超过 900——对话入口要「近」。\n【关键参数】\n• 页面底色（color）：默认 #141414\n• 输入框底色（color）：默认 #1e1e1e\n• 文字色（color）：默认 #ececec\n• 强调色（color）：默认 #ff4d6d\n• 标题字号（px）（slider）：默认 34，范围 26–48\n• 输入框宽（px）（slider）：默认 680，范围 480–900\n• 输入框圆角（px）（slider）：默认 24，范围 8–36\n• 快捷标签数（slider）：默认 4，范围 3–6\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>对话入口 Hero · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { min-height: 100vh; display: flex; align-items: center; justify-content: center;\n         background: var(--di); font-family: \"Inter\", system-ui, \"Microsoft YaHei\", sans-serif;\n         color: var(--zi); padding: 40px 20px; }\n  .hero { width: 100%; max-width: calc(var(--kuan)*1px); display: flex; flex-direction: column; align-items: center; }\n  h1 { font-size: calc(var(--zihao)*1px); font-weight: 600; letter-spacing: -.03em; text-align: center; }\n  /* 输入框 = 圆角大盒 + 内嵌发送钮；焦点时描边点亮强调色，是整个首屏唯一「跳色」 */\n  .ask { width: 100%; margin-top: 28px; display: flex; align-items: flex-end; gap: 10px;\n         background: var(--kuang); border: 1px solid rgba(255,255,255,.1); border-radius: calc(var(--yuanjiao)*1px);\n         padding: 14px 14px 14px 20px; transition: border-color .25s, box-shadow .25s; }\n  .ask:focus-within { border-color: color-mix(in srgb, var(--qiangdiao) 70%, transparent);\n         box-shadow: 0 0 0 3px color-mix(in srgb, var(--qiangdiao) 18%, transparent); }\n  .ask textarea { flex: 1; border: 0; background: transparent; resize: none; outline: none;\n         color: var(--zi); font: inherit; font-size: 15px; line-height: 1.5; height: 24px; }\n  .send { flex: none; width: 34px; height: 34px; border: 0; border-radius: 10px; cursor: pointer;\n         background: var(--qiangdiao); color: #fff; display: grid; place-items: center;\n         transition: transform .2s, filter .2s; }\n  .send:hover { transform: scale(1.06); filter: brightness(1.1); }\n  .chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 20px; }\n  .chip { border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 8px 16px;\n         font-size: 13px; color: color-mix(in srgb, var(--zi) 75%, transparent); cursor: pointer;\n         transition: background .2s, border-color .2s; }\n  .chip:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.3); }\n  .entries { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 44px; width: 100%; }\n  .entry { border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 14px 16px;\n         font-size: 13.5px; color: color-mix(in srgb, var(--zi) 85%, transparent); cursor: pointer;\n         transition: background .2s, transform .2s; }\n  .entry:hover { background: rgba(255,255,255,.05); transform: translateY(-2px); }\n  .entry b { display: block; color: var(--zi); font-size: 13.5px; margin-bottom: 3px; }\n  @media (max-width: 760px){ .entries { grid-template-columns: repeat(2, 1fr); } }\n</style>\n</head>\n<body>\n  <main class=\"hero\">\n    <h1>有什么可以帮忙的？</h1>\n    <div class=\"ask\">\n      <textarea id=\"box\" placeholder=\"给 AI 助手发消息\"></textarea>\n      <button class=\"send\" aria-label=\"发送\">\n        <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 19V5\"/><path d=\"M5 12l7-7 7 7\"/></svg>\n      </button>\n    </div>\n    <div class=\"chips\" id=\"chips\"></div>\n    <div class=\"entries\">\n      <div class=\"entry\"><b>写点什么</b>草稿、邮件、文案</div>\n      <div class=\"entry\"><b>总结一下</b>长文提炼要点</div>\n      <div class=\"entry\"><b>分析数据</b>表格与图表</div>\n      <div class=\"entry\"><b>写段代码</b>示例与调试</div>\n    </div>\n  </main>\n<script>\nconst state = { di:'#141414', kuang:'#1e1e1e', zi:'#ececec', qiangdiao:'#ff4d6d',\n                zihao:34, kuan:680, yuanjiao:24, bing:4 };\nconst CHIPS = ['帮我写周报','解释这段代码','做个旅行计划','润色这段文案','列个学习清单','翻译成英文','头脑风暴','检查语法'];\nconst chipsEl = document.getElementById('chips');\nfunction buildChips(){ chipsEl.innerHTML = CHIPS.slice(0, state.bing).map(c => '<span class=\"chip\">' + c + '</span>').join(''); }\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--di', state.di); R.setProperty('--kuang', state.kuang);\n  R.setProperty('--zi', state.zi); R.setProperty('--qiangdiao', state.qiangdiao);\n  R.setProperty('--zihao', state.zihao); R.setProperty('--kuan', state.kuan);\n  R.setProperty('--yuanjiao', state.yuanjiao);\n  buildChips();\n}\naddEventListener('message', e => {\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\napply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v227",
    标题: "星系滚动编排",
    分类: "动效",
    子类: "滚动联动",
    风格: ["暗色", "叙事仪式"],
    场景: ["官网·品牌站", "落地页·发布页", "作品集·叙事"],
    元素: ["动效", "视觉"],
    搭配: [
      "分章叙事"
    ],
    标签: [
      "星系",
      "粒子",
      "滚动",
      "编排",
      "canvas",
      "离线",
      "叙事"
    ],
    来源: "方案库 s206 星流/Astra 暗色发布页拆解（2026-09-16，滚动编排部分的 Canvas 2D 离线重写；静态星系背景已另有 s209）",
    效果演示: "assets/demos/星系滚动编排.html",
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#000000"},
      {键:"xing1",名:"星色1",类型:"color",默认:"#6eb5ff"},
      {键:"xing2",名:"星色2",类型:"color",默认:"#ff8c5a"},
      {键:"weixing",名:"氛围色",类型:"color",默认:"#23435f"},
      {键:"xingshu",名:"星数",类型:"slider",最小:600,最大:3000,步长:50,默认:1500},
      {键:"xingda",名:"星带扁率",类型:"slider",最小:0.3,最大:0.9,步长:0.05,默认:0.55},
      {键:"sudu",名:"旋转速度",类型:"slider",最小:0.5,最大:2,步长:0.1,默认:1},
      {键:"xishu",名:"散开幅度",类型:"slider",最小:0.5,最大:2,步长:0.1,默认:1}
    ],
    效果说明: "固定画布星系 + 三章滚动编排：完整星系 → 滚动时散开让位 → 再滚聚成一个圆环；形变全由滚动进度驱动（正弦鼓包散开 + 圆环插值聚形），Canvas 2D 离线可跑。\n能怎么改：三个 section 各写一句章节文案，「星星让位给内容」就是滚动隐喻本身；「散开幅度」1.6 以上会盖过文字，发布页建议 1 左右。\n来源：方案库 s206 星流/Astra 暗色发布页拆解（2026-09-16，滚动编排部分的 Canvas 2D 离线重写；静态星系背景已另有 s209）",
    用法: "三个 section 各写一句章节文案，「星星让位给内容」就是滚动隐喻本身；「散开幅度」1.6 以上会盖过文字，发布页建议 1 左右。",
    提示词: "【效果】固定画布星系 + 三章滚动编排：完整星系 → 滚动时散开让位 → 再滚聚成一个圆环；形变全由滚动进度驱动（正弦鼓包散开 + 圆环插值聚形），Canvas 2D 离线可跑。\n【用法示例】\n- 叙事作品集：星色换暖金+白、聚形改章节序号间距。\n- 性能弱设备把星数降到 800。\n【关键参数】\n• 页面底色（color）：默认 #000000\n• 星色1（color）：默认 #6eb5ff\n• 星色2（color）：默认 #ff8c5a\n• 氛围色（color）：默认 #23435f\n• 星数（slider）：默认 1500，范围 600–3000\n• 星带扁率（slider）：默认 0.55，范围 0.3–0.9\n• 旋转速度（slider）：默认 1，范围 0.5–2\n• 散开幅度（slider）：默认 1，范围 0.5–2\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>星系滚动编排 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { background: var(--di); color: #fff; font-family: \"Inter\", system-ui, \"Microsoft YaHei\", sans-serif; }\n  canvas { position: fixed; inset: 0; z-index: 0; display: block; }\n  section { position: relative; z-index: 1; height: 100vh; display: flex; flex-direction: column;\n            justify-content: center; padding: 0 max(6vw, 32px); pointer-events: none; }\n  section .tag { font-size: 13px; letter-spacing: .1em; color: color-mix(in srgb, var(--xing1) 80%, #fff); }\n  section h2 { margin-top: 10px; font-size: clamp(26px, 4vw, 42px); font-weight: 500; letter-spacing: -.02em; max-width: 560px; }\n  section p { margin-top: 12px; max-width: 460px; color: rgba(255,255,255,.6); font-size: 14.5px; line-height: 1.7; }\n  section.right { align-items: flex-end; text-align: right; }\n  .center { align-items: center; text-align: center; }\n</style>\n</head>\n<body>\n  <canvas id=\"cv\"></canvas>\n  <section>\n    <p class=\"tag\">PHASE 01 · 完整</p>\n    <h2>首屏是一整片星系</h2>\n    <p>数千颗星沿旋臂缓慢流动。此时页面只给氛围，不给信息。</p>\n  </section>\n  <section class=\"right\">\n    <p class=\"tag\">PHASE 02 · 让位</p>\n    <h2>滚动时星系散开，让出阅读空间</h2>\n    <p>星星不消失，只是退到两侧——背景与内容交换主次。</p>\n  </section>\n  <section class=\"center\">\n    <p class=\"tag\">PHASE 03 · 聚形</p>\n    <h2>再往下，星尘聚成一个形状</h2>\n    <p>同一片星，在不同章节站成不同的队形——滚动本身就是叙事。</p>\n  </section>\n<script>\nconst state = { di:'#000000', xing1:'#6eb5ff', xing2:'#ff8c5a', weixing:'#23435f',\n                xingshu:1500, xingda:0.55, sudu:1, xishu:1 };\nconst cv = document.getElementById('cv'), ctx = cv.getContext('2d');\nlet W = 0, H = 0, DPR = Math.min(devicePixelRatio || 1, 2), stars = [], t = 0;\nfunction hexToRgb(h){ const v = parseInt(String(h).replace('#',''), 16); return [(v>>16)&255,(v>>8)&255,v&255]; }\nfunction resize(){ W = innerWidth; H = innerHeight; cv.width = W*DPR; cv.height = H*DPR;\n  cv.style.width = W+'px'; cv.style.height = H+'px'; ctx.setTransform(DPR,0,0,DPR,0,0); }\nfunction seed(){\n  stars = [];\n  for (let i=0;i<state.xingshu;i++){\n    const r = 0.05 + Math.pow(Math.random(), 0.5) * 0.95;\n    const angle = r * 7 * Math.PI + (Math.random()-0.5) * (1 - r*0.6) * 0.4;\n    stars.push({ a: angle, r, size: 0.3+Math.random()*0.7, bright: 0.3+Math.random()*0.7,\n                 phase: Math.random()*6.28, mix: Math.random(), ringA: Math.random()*6.28 });\n  }\n}\n/* 滚动进度 p：0=完整星系 → 0.5=散开让位 → 1=聚形成环 */\nfunction progress(){\n  const total = document.body.scrollHeight - innerHeight;\n  return Math.min(1, Math.max(0, scrollY / Math.max(1, total)));\n}\nfunction draw(){\n  t += 0.016 * state.sudu;\n  const p = progress();\n  const cx = W/2, cy = H/2, base = Math.min(W,H) * 0.32;\n  /* 三段形变：散开幅度、扁率压缩、成环插值全由 p 驱动 */\n  const scatter = Math.sin(Math.min(1, p*2) * Math.PI) * 1.6 * state.xishu;   // 中段鼓包\n  const ring = p > 0.55 ? (p - 0.55) / 0.45 : 0;                              // 后段成环\n  const flat = 1 - ring * 0.7;\n  ctx.fillStyle = state.di; ctx.fillRect(0, 0, W, H);\n  const amb = hexToRgb(state.weixing);\n  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W,H)*0.6);\n  g.addColorStop(0, 'rgba('+amb[0]+','+amb[1]+','+amb[2]+',0.22)'); g.addColorStop(1, 'rgba(0,0,0,0)');\n  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);\n  const c1 = hexToRgb(state.xing1), c2 = hexToRgb(state.xing2);\n  const ringR = Math.min(W,H) * 0.3;\n  for (const s of stars){\n    const rot = s.a + t * 0.2;\n    let rr = s.r * base * (1 + scatter * s.r);\n    let x = cx + Math.cos(rot) * rr;\n    let y = cy + Math.sin(rot) * rr * state.xingda * flat;\n    if (ring > 0){ /* 星星按各自相位插值到圆环上，形成「聚形」 */\n      const tx = cx + Math.cos(s.ringA + t*0.2) * ringR, ty = cy + Math.sin(s.ringA + t*0.2) * ringR * 0.92;\n      x += (tx - x) * ring; y += (ty - y) * ring;\n    }\n    const tw = 0.5 + 0.5*Math.sin(t*3 + s.phase);\n    const alpha = s.bright * tw * 0.7;\n    const col = [c1[0]+(c2[0]-c1[0])*s.mix*0.35, c1[1]+(c2[1]-c1[1])*s.mix*0.35, c1[2]+(c2[2]-c1[2])*s.mix*0.35];\n    ctx.fillStyle = 'rgba('+(col[0]|0)+','+(col[1]|0)+','+(col[2]|0)+','+(alpha*0.85).toFixed(3)+')';\n    ctx.beginPath(); ctx.arc(x, y, s.size * 0.7, 0, 6.2832); ctx.fill();\n  }\n  requestAnimationFrame(draw);\n}\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--di', state.di); R.setProperty('--xing1', state.xing1);\n  if (stars.length !== state.xingshu) seed();\n}\naddEventListener('message', e => {\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\naddEventListener('resize', resize);\nresize(); seed(); apply(); requestAnimationFrame(draw);\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  
  {
    id: "v229",
    标题: "玻璃球装置背景",
    分类: "背景",
    子类: "渐变",
    风格: ["轻盈", "科技", "极简"],
    场景: ["官网·品牌站", "落地页·发布页", "作品集·叙事"],
    元素: ["视觉", "动效"],
    搭配: [
      "入场序列"
    ],
    标签: [
      "玻璃装置",
      "球体",
      "影棚光",
      "canvas",
      "背景",
      "焦散",
      "离线"
    ],
    来源: "方案库 m003 玻璃装置首屏拆解（2026-09-17，抠出的 canvas 装置底板；同源还有 v230/v231）",
    效果演示: "assets/demos/玻璃球装置背景.html",
    参数: [
      {键:"yan",名:"影棚底色",类型:"color",默认:"#E6EDF6"},
      {键:"qiut",名:"球体色",类型:"color",默认:"#dfe9f4"},
      {键:"guang",名:"高光色",类型:"color",默认:"#ffffff"},
      {键:"an",名:"暗部色",类型:"color",默认:"#9db2cb"},
      {键:"qiuda",名:"球体大小（%）",类型:"slider",最小:40,最大:85,步长:1,默认:62},
      {键:"qiujiao",名:"玻璃刃角度（°）",类型:"slider",最小:-60,最大:60,步长:1,默认:-18},
      {键:"daokuand",名:"玻璃刃宽",类型:"slider",最小:12,最大:60,步长:1,默认:26},
      {键:"weiyi",名:"球心高度（%）",类型:"slider",最小:40,最大:75,步长:1,默认:58},
      {键:"guangsu",名:"焦散流速",类型:"slider",最小:0,最大:3,步长:0.1,默认:1},
      {键:"tui",名:"推近幅度（%）",类型:"slider",最小:0,最大:2,步长:0.1,默认:0.4},
      {键:"liang",名:"画面亮度（%）",类型:"slider",最小:80,最大:120,步长:1,默认:100}
    ],
    效果说明: "实体玻璃装置的离线底板：影棚底色渐变 + 球体径向高光 + 可调角度的玻璃刃穿过球心 + 地面反射焦散 + 10s 周期微推近；前景文字压在上方始终清晰。\n能怎么改：「球体大小 / 球心高度 / 玻璃刃角度 / 刃宽」四件套决定构图；「焦散流速」0 是静帧；「推近幅度」0 完全静止（适合低性能页）。\n来源：方案库 m003 玻璃装置首屏拆解（2026-09-17，抠出的 canvas 装置底板；同源还有 v230/v231）",
    用法: "「球体大小 / 球心高度 / 玻璃刃角度 / 刃宽」四件套决定构图；「焦散流速」0 是静帧；「推近幅度」0 完全静止（适合低性能页）。",
    提示词: "【效果】实体玻璃装置的离线底板：影棚底色渐变 + 球体径向高光 + 可调角度的玻璃刃穿过球心 + 地面反射焦散 + 10s 周期微推近；前景文字压在上方始终清晰。\n【用法示例】\n- 想更「产品图感」：球体 70%、刃角 -8°、推近 0。\n- 想更「实验感」：刃角 42°、刃宽 48、焦散流速 2。\n【关键参数】\n• 影棚底色（color）：默认 #E6EDF6\n• 球体色（color）：默认 #dfe9f4\n• 高光色（color）：默认 #ffffff\n• 暗部色（color）：默认 #9db2cb\n• 球体大小（%）（slider）：默认 62，范围 40–85\n• 玻璃刃角度（°）（slider）：默认 -18，范围 -60–60\n• 玻璃刃宽（slider）：默认 26，范围 12–60\n• 球心高度（%）（slider）：默认 58，范围 40–75\n• 焦散流速（slider）：默认 1，范围 0–3\n• 推近幅度（%）（slider）：默认 0.4，范围 0–2\n• 画面亮度（%）（slider）：默认 100，范围 80–120\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>玻璃球装置背景 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { height: 100vh; overflow: hidden; background: var(--yan);\n         font-family: \"Inter\", \"Helvetica Neue\", Arial, \"Microsoft YaHei\", sans-serif; color: var(--mo); }\n  canvas { position: fixed; inset: 0; display: block; filter: brightness(calc(var(--liang)*1%)); }\n  .copy { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: center;\n          padding: 0 8vw; pointer-events: none; }\n  .copy h1 { font-size: clamp(30px, 4.6vw, 62px); font-weight: 360; letter-spacing: -.035em; line-height: 1.05; max-width: 620px; }\n  .copy p { margin-top: 18px; max-width: 420px; color: #4D5B77; font-size: 15.5px; line-height: 1.6; }\n</style>\n</head>\n<body>\n  <canvas id=\"plate\"></canvas>\n  <div class=\"copy\">\n    <h1>Studio light<br>on a glass object</h1>\n    <p>影棚底 + 实体玻璃装置的离线底板：球体高光、可调角度玻璃刃、缓慢流动的焦散，前景文字始终清晰。</p>\n  </div>\n<script>\nconst state = { yan:'#E6EDF6', qiut:'#dfe9f4', guang:'#ffffff', an:'#9db2cb',\n                qiuda:62, qiujiao:-18, daokuand:26, weiyi:58, guangsu:1, tui:0.4, liang:100 };\nconst cv = document.getElementById('plate'), ctx = cv.getContext('2d');\nlet W = 0, H = 0, DPR = Math.min(devicePixelRatio || 1, 2), t = 0, raf = 0;\nconst still = matchMedia('(prefers-reduced-motion: reduce)');\nfunction hexToRgb(h){ const v = parseInt(String(h).replace('#',''), 16); return [(v>>16)&255,(v>>8)&255,v&255]; }\nfunction rgba(h, a){ const c = hexToRgb(h); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }\nfunction resize(){\n  W = innerWidth; H = innerHeight;\n  cv.width = W*DPR; cv.height = H*DPR; cv.style.width = W + 'px'; cv.style.height = H + 'px';\n  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);\n}\nfunction draw(){\n  const cx = W*0.62, cy = H * state.weiyi / 100, R = Math.min(W, H) * 0.5 * state.qiuda / 100;\n  const bg = ctx.createLinearGradient(0, 0, 0, H);\n  bg.addColorStop(0, '#f7fafd'); bg.addColorStop(0.6, state.yan); bg.addColorStop(1, rgba(state.an, .35));\n  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);\n  ctx.fillStyle = rgba(state.guang, .28); ctx.fillRect(0, H*0.78, W, H*0.22);\n  /* 微推近：周期呼吸，幅度由 tui 控制 */\n  const push = 1 + (state.tui / 100) * Math.sin(t * 0.628);\n  ctx.save(); ctx.translate(cx, cy); ctx.scale(push, push); ctx.translate(-cx, -cy);\n  const g = ctx.createRadialGradient(cx - R*0.38, cy - R*0.42, R*0.1, cx, cy, R);\n  g.addColorStop(0, state.guang); g.addColorStop(0.45, state.qiut); g.addColorStop(0.85, rgba(state.an, .55)); g.addColorStop(1, rgba(state.an, .8));\n  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();\n  ctx.strokeStyle = rgba(state.an, .5); ctx.lineWidth = 1; ctx.stroke();\n  const hi = ctx.createRadialGradient(cx - R*0.42, cy - R*0.48, 0, cx - R*0.42, cy - R*0.48, R*0.5);\n  hi.addColorStop(0, rgba(state.guang, .95)); hi.addColorStop(1, rgba(state.guang, 0));\n  ctx.fillStyle = hi; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();\n  /* 地面投影 + 反射焦散 */\n  const ca = ctx.createLinearGradient(cx - R, cy + R*0.5, cx + R, cy + R);\n  ca.addColorStop(0, rgba(state.guang, 0));\n  ca.addColorStop(0.5 + 0.18*Math.sin(t*1.3), rgba(state.guang, .55));\n  ca.addColorStop(1, rgba(state.guang, 0));\n  ctx.fillStyle = ca; ctx.beginPath(); ctx.ellipse(cx, cy + R*0.8, R*0.9, R*0.16, 0, 0, 6.2832); ctx.fill();\n  /* 玻璃刃：穿过球体的薄片，角度/宽度可调 */\n  ctx.save(); ctx.translate(cx, cy); ctx.rotate(state.qiujiao * Math.PI / 180);\n  const bl = ctx.createLinearGradient(0, -state.daokuand, 0, state.daokuand);\n  bl.addColorStop(0, rgba(state.guang, .65)); bl.addColorStop(0.5, rgba(state.qiut, .35)); bl.addColorStop(1, rgba(state.an, .6));\n  ctx.fillStyle = bl;\n  ctx.beginPath(); ctx.ellipse(0, 0, R*1.35, state.daokuand, 0, 0, 6.2832); ctx.fill();\n  ctx.strokeStyle = rgba(state.guang, .85); ctx.lineWidth = 1.1;\n  ctx.beginPath(); ctx.ellipse(0, 0, R*1.35, state.daokuand, 0, 0, 6.2832); ctx.stroke();\n  ctx.strokeStyle = rgba(state.an, .55);\n  ctx.beginPath(); ctx.moveTo(-R*1.3, 0); ctx.lineTo(R*1.3, 0); ctx.stroke();\n  ctx.restore();\n  /* 球面流动焦散弧 */\n  for (let i = 0; i < 2; i++){\n    const a0 = -0.9 + Math.sin(t*0.5 + i*2.1) * 0.6, a1 = a0 + 0.9 + 0.2*Math.cos(t*0.4 + i);\n    ctx.strokeStyle = rgba(state.guang, 0.5 - i*0.18); ctx.lineWidth = 2.2 - i*0.8;\n    ctx.beginPath(); ctx.arc(cx, cy, R*(0.72 + i*0.12), a0, a1); ctx.stroke();\n  }\n  ctx.restore();\n}\nfunction loop(){ t += 0.016 * Math.max(0.01, state.guangsu); draw(); raf = requestAnimationFrame(loop); }\nfunction start(){ cancelAnimationFrame(raf); if (still.matches) draw(); else raf = requestAnimationFrame(loop); }\nstill.addEventListener('change', start);\naddEventListener('resize', function(){ resize(); if (still.matches) draw(); });\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--yan', state.yan); R.setProperty('--mo', '#020C21');\n  R.setProperty('--qiut', state.qiut); R.setProperty('--an', state.an);\n  R.setProperty('--guang', state.guang); R.setProperty('--liang', state.liang);\n}\naddEventListener('message', function(e){\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply(); if (still.matches) draw();\n});\napply(); resize(); start();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v230",
    标题: "旋钮胶囊 CTA",
    分类: "组件",
    子类: "按钮",
    风格: ["轻盈", "科技", "企业级"],
    场景: ["官网·品牌站", "落地页·发布页", "工具·SaaS"],
    元素: ["视觉", "反馈"],
    搭配: [
      "扫光按钮"
    ],
    标签: [
      "CTA",
      "旋钮",
      "胶囊",
      "chevron",
      "hover",
      "企业级"
    ],
    来源: "方案库 m003 玻璃装置首屏拆解（2026-09-17，抠出的主 CTA 组件；同源还有 v229/v231）",
    效果演示: "assets/demos/旋钮胶囊CTA.html",
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#E6EDF6"},
      {键:"zhu",名:"胶囊底色",类型:"color",默认:"#0F1B31"},
      {键:"zi",名:"文字色",类型:"color",默认:"#ffffff"},
      {键:"niu",名:"旋钮底色",类型:"color",默认:"#384B64"},
      {键:"kuan",名:"胶囊宽（px）",类型:"slider",最小:160,最大:300,步长:1,默认:217},
      {键:"gao",名:"胶囊高（px）",类型:"slider",最小:48,最大:96,步长:1,默认:70},
      {键:"yuanjiao",名:"圆角（px）",类型:"slider",最小:0,最大:1000,步长:1,默认:999},
      {键:"niuDa",名:"旋钮直径（px）",类型:"slider",最小:28,最大:80,步长:1,默认:49},
      {键:"zihao",名:"字号（px）",类型:"slider",最小:13,最大:22,步长:0.5,默认:17.5},
      {键:"fudong",名:"hover 上浮（px）",类型:"slider",最小:0,最大:8,步长:0.5,默认:2}
    ],
    效果说明: "胶囊右端嵌一枚独立圆旋钮（内含 chevron），两者各有底色所以有「机械件」手感；hover 时整体上浮、旋钮向右微移。深浅/幽灵/描边三种变体同一套参数。\n能怎么改：「胶囊宽 / 高 / 旋钮直径」决定比例（旋钮直径 ≈ 胶囊高的 0.7 最稳）；「圆角」拉满 999 是胶囊、降到 8 变方角企业风；「fudong」0 就完全静止。\n来源：方案库 m003 玻璃装置首屏拆解（2026-09-17，抠出的主 CTA 组件；同源还有 v229/v231）",
    用法: "「胶囊宽 / 高 / 旋钮直径」决定比例（旋钮直径 ≈ 胶囊高的 0.7 最稳）；「圆角」拉满 999 是胶囊、降到 8 变方角企业风；「fudong」0 就完全静止。",
    提示词: "【效果】胶囊右端嵌一枚独立圆旋钮（内含 chevron），两者各有底色所以有「机械件」手感；hover 时整体上浮、旋钮向右微移。深浅/幽灵/描边三种变体同一套参数。\n【用法示例】\n- 企业风：圆角 10、上浮 1、旋钮直径 44。\n- 圆角拉到 999 + 旋钮 0.7 高 = 原稿比例。\n【关键参数】\n• 页面底色（color）：默认 #E6EDF6\n• 胶囊底色（color）：默认 #0F1B31\n• 文字色（color）：默认 #ffffff\n• 旋钮底色（color）：默认 #384B64\n• 胶囊宽（px）（slider）：默认 217，范围 160–300\n• 胶囊高（px）（slider）：默认 70，范围 48–96\n• 圆角（px）（slider）：默认 999，范围 0–1000\n• 旋钮直径（px）（slider）：默认 49，范围 28–80\n• 字号（px）（slider）：默认 17.5，范围 13–22\n• hover 上浮（px）（slider）：默认 2，范围 0–8\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>旋钮胶囊 CTA · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 26px;\n         background: var(--di); font-family: \"Inter\", \"Helvetica Neue\", Arial, \"Microsoft YaHei\", sans-serif; }\n  /* 旋钮胶囊 = 长条 + 右端独立圆旋钮 + 内嵌 chevron；旋钮与胶囊各自有底，才有「机械件」感 */\n  .knobctl { position: relative; display: inline-flex; align-items: center;\n             width: calc(var(--kuan)*1px); height: calc(var(--gao)*1px); border-radius: var(--yuanjiao);\n             background: var(--zhu); color: var(--zi); border: 0; cursor: pointer;\n             box-shadow: 0 calc(var(--gao)*0.14px) calc(var(--gao)*0.34px) rgba(11,26,50,.18);\n             transition: transform .35s cubic-bezier(.2,.7,.3,1); }\n  .knobctl span { padding-left: calc(var(--gao)*0.5px); font-size: calc(var(--zihao)*1px);\n                  font-weight: 400; letter-spacing: -.044em; white-space: nowrap; }\n  .knobctl i { position: absolute; right: calc(var(--gao)*0.15px); width: calc(var(--niuDa)*1px); height: calc(var(--niuDa)*1px);\n               border-radius: 50%; background: var(--niu); display: flex; align-items: center; justify-content: center;\n               transition: transform .35s cubic-bezier(.2,.7,.3,1); }\n  .knobctl i svg { width: calc(var(--niuDa)*0.35px); height: calc(var(--niuDa)*0.35px); }\n  .knobctl:hover, .knobctl.demo { transform: translateY(calc(var(--fudong)*-1px)); }\n  .knobctl:hover i, .knobctl.demo i { transform: translateX(calc(var(--fudong)*0.6px)); }\n  .knobctl.ghost { background: rgba(255,255,255,.5); color: #1B2A44; border: 1px solid rgba(255,255,255,.85);\n                   box-shadow: 0 calc(var(--gao)*0.14px) calc(var(--gao)*0.34px) rgba(11,26,50,.10); }\n  .knobctl.ghost i { background: #1A2B45; }\n  .knobctl.line { background: transparent; color: #0F1B31; border: 1px solid rgba(15,27,49,.35); box-shadow: none; }\n  .knobctl.line i { background: #0F1B31; }\n</style>\n</head>\n<body>\n  <button class=\"knobctl demo\"><span>Get free plan</span><i><svg viewBox=\"0 0 18 18\" fill=\"none\"><path d=\"m6.6 3.6 6 5.4-6 5.4\" stroke=\"#fff\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></i></button>\n  <button class=\"knobctl ghost\"><span>Meet Sentinel</span><i><svg viewBox=\"0 0 18 18\" fill=\"none\"><path d=\"m6.6 3.6 6 5.4-6 5.4\" stroke=\"#fff\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></i></button>\n  <button class=\"knobctl line\"><span>See it in action</span><i><svg viewBox=\"0 0 18 18\" fill=\"none\"><path d=\"m6.6 3.6 6 5.4-6 5.4\" stroke=\"#fff\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></i></button>\n<script>\nconst state = { di:'#E6EDF6', zhu:'#0F1B31', zi:'#ffffff', niu:'#384B64',\n                kuan:217, gao:70, yuanjiao:999, niuDa:49, zihao:17.5, fudong:2 };\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--di', state.di); R.setProperty('--zhu', state.zhu);\n  R.setProperty('--zi', state.zi); R.setProperty('--niu', state.niu);\n  R.setProperty('--kuan', state.kuan); R.setProperty('--gao', state.gao);\n  R.setProperty('--yuanjiao', state.yuanjiao + 'px'); R.setProperty('--niuDa', state.niuDa);\n  R.setProperty('--zihao', state.zihao); R.setProperty('--fudong', state.fudong);\n}\naddEventListener('message', function(e){\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\n// 第一枚每 3.2s 自动演示一次上浮 + 旋钮右移，截图/预览不依赖鼠标\nconst demoBtn = document.querySelector('.knobctl');\nsetInterval(function(){\n  demoBtn.classList.remove('demo');\n  void demoBtn.offsetWidth;\n  demoBtn.classList.add('demo');\n  setTimeout(function(){ demoBtn.classList.remove('demo'); }, 900);\n}, 3200);\napply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v231",
    标题: "玻璃胶囊导航",
    分类: "组件",
    子类: "导航",
    风格: ["轻盈", "玻璃拟态", "极简"],
    场景: ["官网·品牌站", "工具·SaaS", "落地页·发布页"],
    元素: ["视觉", "构成"],
    搭配: [
      "汉堡菜单导航"
    ],
    标签: [
      "导航",
      "玻璃胶囊",
      "图标",
      "竖分隔",
      "汉堡",
      "折叠"
    ],
    来源: "方案库 m003 玻璃装置首屏拆解（2026-09-17，抠出的导航组件；同源还有 v229/v230）",
    效果演示: "assets/demos/玻璃胶囊导航.html",
    参数: [
      {键:"di",名:"页面底色",类型:"color",默认:"#E6EDF6"},
      {键:"boli",名:"玻璃色",类型:"color",默认:"#ffffff"},
      {键:"mo",名:"文字色",类型:"color",默认:"#202940"},
      {键:"lan",名:"强调色",类型:"color",默认:"#4A78B0"},
      {键:"kuan",名:"胶囊宽（px）",类型:"slider",最小:200,最大:420,步长:1,默认:293},
      {键:"gao",名:"胶囊高（px）",类型:"slider",最小:44,最大:92,步长:1,默认:67},
      {键:"yuanjiao",名:"圆角（px）",类型:"slider",最小:8,最大:1000,步长:1,默认:999},
      {键:"mohu",名:"模糊（px）",类型:"slider",最小:0,最大:60,步长:1,默认:40},
      {键:"zihao",名:"字号（px）",类型:"slider",最小:12,最大:20,步长:0.5,默认:15},
      {键:"zihang",名:"字距（em）",类型:"slider",最小:-0.08,最大:0.02,步长:0.005,默认:-0.0561}
    ],
    效果说明: "一个玻璃胶囊容器装下「图标 + 文字 + 竖分隔」：home 图标 → Explore → 竖分隔线 → grid 图标 → Product；右侧汉堡展开毛玻璃菜单（缩放淡入），点外部/Escape 收起。演示页每 4.5s 自动开合一次。\n能怎么改：「胶囊宽 / 高 / 模糊 / 圆角」四件套定容器质感；字距默认 -0.0561em 是原稿的收紧值，想更舒展就往 0 调；「强调色」用在菜单项 hover。\n来源：方案库 m003 玻璃装置首屏拆解（2026-09-17，抠出的导航组件；同源还有 v229/v230）",
    用法: "「胶囊宽 / 高 / 模糊 / 圆角」四件套定容器质感；字距默认 -0.0561em 是原稿的收紧值，想更舒展就往 0 调；「强调色」用在菜单项 hover。",
    提示词: "【效果】一个玻璃胶囊容器装下「图标 + 文字 + 竖分隔」：home 图标 → Explore → 竖分隔线 → grid 图标 → Product；右侧汉堡展开毛玻璃菜单（缩放淡入），点外部/Escape 收起。演示页每 4.5s 自动开合一次。\n【用法示例】\n- 深色场景：玻璃色 #ffffff→#2a3140、文字色 #f2f5f9。\n- 想更「重」：模糊 24、描边透明度提高。\n【关键参数】\n• 页面底色（color）：默认 #E6EDF6\n• 玻璃色（color）：默认 #ffffff\n• 文字色（color）：默认 #202940\n• 强调色（color）：默认 #4A78B0\n• 胶囊宽（px）（slider）：默认 293，范围 200–420\n• 胶囊高（px）（slider）：默认 67，范围 44–92\n• 圆角（px）（slider）：默认 999，范围 8–1000\n• 模糊（px）（slider）：默认 40，范围 0–60\n• 字号（px）（slider）：默认 15，范围 12–20\n• 字距（em）（slider）：默认 -0.0561，范围 -0.08–0.02\n【集成步骤】复制下方「代码」字段（零依赖完整单文件，含 postMessage 调参契约：window.postMessage({type:\"param\",key,value})），或把 state+apply() 契约搬进 React/Vue。",
    代码: "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>玻璃胶囊导航 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { min-height: 100vh; display: flex; align-items: center; justify-content: center;\n         background: linear-gradient(160deg, #f4f8fc, var(--di) 55%, #dbe4ef);\n         font-family: \"Inter\", \"Helvetica Neue\", Arial, \"Microsoft YaHei\", sans-serif; }\n  .wrap { position: relative; }\n  /* 玻璃胶囊导航 = 一个整体玻璃容器装下「图标 + 文字 + 竖分隔」，与纯文字导航的区别就在这层容器 */\n  .cap { display: inline-flex; align-items: center; height: calc(var(--gao)*1px); padding: 0 calc(var(--gao)*0.54px);\n         border-radius: var(--yuanjiao); background: color-mix(in srgb, var(--boli) 78%, transparent);\n         border: 1px solid rgba(255,255,255,.85);\n         -webkit-backdrop-filter: blur(calc(var(--mohu)*1px)); backdrop-filter: blur(calc(var(--mohu)*1px));\n         box-shadow: 0 0 0 1.3px rgba(120,145,180,.2), 0 2px 10px rgba(28,52,92,.05); }\n  .cap .txt { font-size: calc(var(--zihao)*1px); font-weight: 570; letter-spacing: calc(var(--zihang)*1em);\n              color: var(--mo); white-space: nowrap; }\n  .cap .ic { display: block; flex: none; color: var(--mo); }\n  .cap .ic svg { display: block; width: 100%; height: 100%; }\n  .cap .home { width: calc(var(--gao)*0.34px); height: calc(var(--gao)*0.36px); margin-right: calc(var(--gao)*0.18px); }\n  .cap .grid { width: calc(var(--gao)*0.31px); height: calc(var(--gao)*0.31px); margin-right: calc(var(--gao)*0.18px); }\n  .cap hr { width: 1.5px; height: calc(var(--gao)*0.46px); background: #CED5E0; border: 0;\n            margin: 0 calc(var(--gao)*0.36px); }\n  .burger { position: absolute; right: calc(var(--gao)*-1.2px); top: 50%; transform: translateY(-50%);\n            width: calc(var(--gao)*0.84px); height: calc(var(--gao)*0.84px); border-radius: 50%; cursor: pointer;\n            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;\n            background: color-mix(in srgb, var(--boli) 78%, transparent); border: 1px solid rgba(255,255,255,.85);\n            -webkit-backdrop-filter: blur(calc(var(--mohu)*1px)); backdrop-filter: blur(calc(var(--mohu)*1px));\n            box-shadow: 0 0 0 1.3px rgba(120,145,180,.2); }\n  .burger i { display: block; width: 20px; height: 1.8px; border-radius: 999px; background: var(--mo);\n              transition: transform .3s cubic-bezier(.2,.7,.3,1); }\n  .burger[aria-expanded=\"true\"] i:first-child { transform: translateY(3.9px) rotate(45deg); }\n  .burger[aria-expanded=\"true\"] i:last-child { transform: translateY(-3.9px) rotate(-45deg); }\n  .menu { position: absolute; top: calc(var(--gao)*1.35px); left: 0; width: calc(var(--kuan)*1.04px);\n          padding: 16px; border-radius: 30px; background: color-mix(in srgb, var(--boli) 82%, transparent);\n          border: 1px solid rgba(255,255,255,.85);\n          -webkit-backdrop-filter: blur(calc(var(--mohu)*1px)); backdrop-filter: blur(calc(var(--mohu)*1px));\n          box-shadow: 0 0 0 1.3px rgba(120,145,180,.2), 0 16px 34px rgba(28,52,92,.10);\n          opacity: 0; visibility: hidden; transform: translateY(-10px) scale(.97); transform-origin: top right;\n          transition: opacity .26s cubic-bezier(.2,.7,.3,1), transform .26s cubic-bezier(.2,.7,.3,1), visibility .26s; }\n  .menu[data-open] { opacity: 1; visibility: visible; transform: none; }\n  .menu a { display: flex; align-items: center; height: 46px; padding: 0 10px; border-radius: 12px;\n            color: var(--mo); text-decoration: none; font-size: calc(var(--zihao)*1.25px); }\n  .menu a:hover { background: color-mix(in srgb, var(--lan) 14%, transparent); }\n  .menu .cta { margin-top: 12px; height: 58px; justify-content: center; background: #0F1B31; color: #fff;\n               border-radius: 999px; font-size: calc(var(--zihao)*1.25px); }\n</style>\n</head>\n<body>\n  <div class=\"wrap\">\n    <nav class=\"cap\" aria-label=\"Primary\">\n      <span class=\"ic home\"><svg viewBox=\"0 0 20 21\" fill=\"none\"><path d=\"M2 8.4 10 2l8 6.4V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/></svg></span>\n      <span class=\"txt\">Explore</span>\n      <hr />\n      <span class=\"ic grid\"><svg viewBox=\"0 0 20 20\" fill=\"none\"><rect x=\"1\" y=\"1\" width=\"7.4\" height=\"7.4\" rx=\"1.7\" stroke=\"currentColor\" stroke-width=\"1.7\"/><rect x=\"11.6\" y=\"1\" width=\"7.4\" height=\"7.4\" rx=\"1.7\" stroke=\"currentColor\" stroke-width=\"1.7\"/><rect x=\"1\" y=\"11.6\" width=\"7.4\" height=\"7.4\" rx=\"1.7\" stroke=\"currentColor\" stroke-width=\"1.7\"/><rect x=\"11.6\" y=\"11.6\" width=\"7.4\" height=\"7.4\" rx=\"1.7\" stroke=\"currentColor\" stroke-width=\"1.7\"/></svg></span>\n      <span class=\"txt\">Product</span>\n    </nav>\n    <button class=\"burger\" id=\"burger\" type=\"button\" aria-label=\"Open menu\" aria-expanded=\"false\" aria-controls=\"menu\"><i></i><i></i></button>\n    <div class=\"menu\" id=\"menu\">\n      <a href=\"#\">Explore</a>\n      <a href=\"#\">Product</a>\n      <a href=\"#\">Pricing</a>\n      <a class=\"cta\" href=\"#\">Get free plan</a>\n    </div>\n  </div>\n<script>\nconst state = { di:'#E6EDF6', boli:'#ffffff', mo:'#202940', lan:'#4A78B0',\n                kuan:293, gao:67, yuanjiao:999, mohu:40, zihao:15, zihang:-0.0561 };\nconst burger = document.getElementById('burger'), menu = document.getElementById('menu');\nfunction setOpen(open){\n  burger.setAttribute('aria-expanded', String(open));\n  if (open) menu.dataset.open = ''; else delete menu.dataset.open;\n}\nburger.addEventListener('click', function(e){ e.stopPropagation(); setOpen(burger.getAttribute('aria-expanded') !== 'true'); });\ndocument.addEventListener('click', function(){ setOpen(false); });\naddEventListener('keydown', function(e){ if (e.key === 'Escape') setOpen(false); });\n// 每 4.5s 自动开一次玻璃菜单，截图/预览能看到两种状态\nsetInterval(function(){\n  setOpen(true);\n  setTimeout(function(){ setOpen(false); }, 1700);\n}, 4500);\nfunction apply(){\n  const R = document.documentElement.style;\n  R.setProperty('--di', state.di); R.setProperty('--boli', state.boli);\n  R.setProperty('--mo', state.mo); R.setProperty('--lan', state.lan);\n  R.setProperty('--kuan', state.kuan); R.setProperty('--gao', state.gao);\n  R.setProperty('--yuanjiao', state.yuanjiao + 'px'); R.setProperty('--mohu', state.mohu);\n  R.setProperty('--zihao', state.zihao); R.setProperty('--zihang', state.zihang);\n}\naddEventListener('message', function(e){\n  const d = e.data; if (!d || d.type !== 'param') return;\n  if (!(d.key in state)) return; state[d.key] = d.value; apply();\n});\napply();\n<\/script>\n</body>\n</html>\n",
    复用记录: ""
  }
];