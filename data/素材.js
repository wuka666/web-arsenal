// Web 灵感弹药库 · 素材数据（v4，2026-08-26）
// 数据存储决策：放项目内部，用 JS 文件而不是数据库——
//   ① file:// 直接双击 index.html 就能读（fetch JSON 会被浏览器 CORS 拦）
//   ② 零依赖，符合"10 月前不引依赖"的规矩
//   ③ 阶段 0 不需要后端；等接单流水线 / 多人协作 / 要历史版本时，再迁 SQLite 或后端
// 分类参考 ReactBits 大类：文字动画 / 动画 / 组件 / 背景 / 套路与术语。
// 标题命名参考个人学习工作台：两个字、直接说人话（粒子文字、细雨、翻页动画…）。
// 调参：详情页按「参数」数组生成滑杆/开关，通过 postMessage 控制演示文件。
// 每条格式：标题 / 分类 / 标签 / 来源 / 效果演示 / 参数 / 效果说明 / 用法 / 提示词 / 代码 / 复用记录。

window.WEB_ARSENAL = [
  {
    id: "w001",
    标题: "粒子文字",
    分类: "文字动画",
    子类: "标题",
    风格: [
      "水墨国风"
    ],
    场景: [
      "落地页",
      "作品集"
    ],
    元素: [
      "字体",
      "动效"
    ],
    搭配: [
      "文字遮罩"
    ],
    标签: [
      "粒子",
      "标题"
    ],
    来源: "自建：个人学习工作台（从 ReactBits 移植思路，未引 React）",
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
    效果说明: "字是由很多小墨点聚成的，鼠标划过去墨点会散开，不动时轻轻飘动。很适合当网站标题。",
    用法: "在详情页拖滑杆：粒子多少、粒子大小、推开距离、高亮蓝点。想换字就改演示里的「墨点聚字」。",
    提示词: "帮我做一个\"粒子聚字\"文字效果（纯 HTML/CSS/JS）：\n\n效果：文字由全屏散落的墨点聚集而成，鼠标划过粒子散开，静止后缓慢漂移。\n\n用法示例：\n<canvas id=\"c\"></canvas>\n<script>\n  const state = { density: 7, size: 2.2, repel: 90, highlight: true };\n</script>\n\n关键参数：\n- text 文字内容 / density 粒子密度 / size 粒子大小 / repel 排斥半径 / speed 回归速度 / color 粒子颜色 / accent 点缀色 / bg 背景颜色 / highlight 是否有点缀色粒子\n\n集成步骤：\n1. 复制 assets/demos/粒子文字.html 的 JS 和容器结构\n2. 换文字（代码里的\"墨点聚字\"）\n3. 换颜色适配主题",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>粒子文字演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: #ffffff; overflow: hidden; }\n  canvas { display: block; width: 100%; height: 100%; }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<script>\n  // 默认参数（父页面详情页可通过消息实时调）\n  const state = {\n    text: \"墨点聚字\", density: 7, size: 2.2, repel: 90, speed: 5.5,\n    color: \"#181612\", accent: \"#3d5fd6\", bg: \"#ffffff\", highlight: true\n  };\n  const canvas = document.getElementById(\"c\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, particles = [];\n  const pointer = { x: -9999, y: -9999 };\n  // 把 #rrggbb 转成 rgba() 字符串\n  const rgba = (hex, a) => {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16) + \",\" + ((n >> 8) & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  };\n\n  // 把文字画到离屏画布，按间隔采样出粒子目标点\n  function sample(text) {\n    const off = document.createElement(\"canvas\");\n    const octx = off.getContext(\"2d\");\n    const fs = Math.min(W, H) * 0.17;\n    octx.font = \"900 \" + fs + \"px 'Microsoft YaHei', sans-serif\";\n    const tw = octx.measureText(text).width;\n    off.width = Math.ceil(tw) + 40;\n    off.height = Math.ceil(fs * 1.8);\n    octx.font = \"900 \" + fs + \"px 'Microsoft YaHei', sans-serif\";\n    octx.textBaseline = \"middle\";\n    octx.fillStyle = \"#000\";\n    octx.fillText(text, 20, off.height / 2);\n    const data = octx.getImageData(0, 0, off.width, off.height).data;\n    const pts = [];\n    for (let y = 0; y < off.height; y += state.density) {\n      for (let x = 0; x < off.width; x += state.density) {\n        if (data[(y * off.width + x) * 4 + 3] > 128) {\n          pts.push({ x: x - off.width / 2, y: y - off.height / 2 });\n        }\n      }\n    }\n    return pts;\n  }\n\n  function init() {\n    W = canvas.width = innerWidth;\n    H = canvas.height = innerHeight;\n    document.body.style.background = state.bg;\n    const pts = sample(state.text);\n    particles = pts.map(p => ({\n      x: Math.random() * W,\n      y: Math.random() * H,\n      tx: W / 2 + p.x,\n      ty: H / 2 + p.y,\n      blue: state.highlight && Math.random() < 0.06,\n      drift: Math.random() * Math.PI * 2\n    }));\n  }\n\n  function frame() {\n    ctx.clearRect(0, 0, W, H);\n    const k = state.speed / 100; // 回归速度（0-10 映射到 0-0.1）\n    for (const p of particles) {\n      const dx = p.x - pointer.x;\n      const dy = p.y - pointer.y;\n      const d2 = dx * dx + dy * dy;\n      if (d2 < state.repel * state.repel) {\n        const d = Math.sqrt(d2) || 1;\n        p.x += (dx / d) * 3.2;\n        p.y += (dy / d) * 3.2;\n      }\n      p.x += (p.tx - p.x) * k;\n      p.y += (p.ty - p.y) * k;\n      p.drift += 0.008;\n      const gx = p.tx + Math.sin(p.drift) * 1.4;\n      const gy = p.ty + Math.cos(p.drift * 0.7) * 1.4;\n      p.x += (gx - p.x) * 0.03;\n      p.y += (gy - p.y) * 0.03;\n      ctx.beginPath();\n      ctx.arc(p.x, p.y, state.size, 0, Math.PI * 2);\n      ctx.fillStyle = p.blue ? rgba(state.accent, .85) : rgba(state.color, .8);\n      ctx.fill();\n    }\n    requestAnimationFrame(frame);\n  }\n\n  // 参数变了就重新采样粒子，让效果立即更新\n  function apply() {\n    init();\n  }\n\n  canvas.addEventListener(\"mousemove\", e => { pointer.x = e.clientX; pointer.y = e.clientY; });\n  canvas.addEventListener(\"mouseleave\", () => { pointer.x = -9999; pointer.y = -9999; });\n  canvas.addEventListener(\"touchmove\", e => {\n    pointer.x = e.touches[0].clientX;\n    pointer.y = e.touches[0].clientY;\n  }, { passive: true });\n  window.addEventListener(\"resize\", () => init());\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n\n  init();\n  requestAnimationFrame(frame);\n<\\/script>\n</body>\n</html>\n",
    复用记录: "学习工作台全站页面标题（已用）"
  },
  {
    id: "w002",
    标题: "细雨",
    分类: "背景",
    子类: "背景",
    风格: [
      "水墨国风"
    ],
    场景: [
      "落地页"
    ],
    元素: [
      "动效"
    ],
    搭配: [
      "粒子文字"
    ],
    标签: [
      "氛围"
    ],
    来源: "自建：个人学习工作台",
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
    效果说明: "细密的雨丝在背景里落，自动避开中间的内容，鼠标划过去能把雨拨开。给页面加氛围用。",
    用法: "详情页拖滑杆调雨量和下落速度；避让区域在代码里改 CARD 那 4 个数；窗口变窄会自动不画雨，省性能。",
    提示词: "帮我做一个\"细雨\"全屏背景（纯 HTML/CSS/JS）：\n\n效果：细密雨丝斜落，自动避开内容区域；鼠标划过把雨拨开；窄屏自动不渲染省性能。\n\n用法示例：\n<canvas id=\"rain\"></canvas>\n<script>\n  const state = { rain: 1, speed: 7 };\n  const CARD = { x, y, w, h }; // 内容避让矩形\n</script>\n\n关键参数：\n- rain 雨量 / speed 下落速度 / wind 风偏移 / len 雨丝长度 / width 雨丝粗细 / opacity 雨丝透明度 / color 雨的颜色 / bg 背景颜色\n\n集成步骤：\n1. 复制 assets/demos/细雨意境.html 的 JS\n2. 把避让矩形改成你内容区的实际位置\n3. 想换雪/花瓣/星尘，改粒子的画法即可",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>细雨演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: #17171c; overflow: hidden; }\n  #rain { position: fixed; inset: 0; display: block; }\n  .card {\n    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);\n    width: min(380px, 80vw); padding: 60px 24px; text-align: center;\n    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);\n    border-radius: 16px; backdrop-filter: blur(6px);\n    font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: rgba(255,255,255,.85);\n    font-size: 20px; font-weight: 700; letter-spacing: 2px;\n  }\n</style>\n</head>\n<body>\n<canvas id=\"rain\"></canvas>\n<div class=\"card\">内容区<br><span style=\"font-size:13px;font-weight:400;color:rgba(255,255,255,.6)\">雨会避开这里</span></div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    rain: 1, speed: 7, wind: 0, len: 1, width: 1.5,\n    opacity: 0.5, color: \"#ffffff\", bg: \"#17171c\"\n  };\n  const canvas = document.getElementById(\"rain\");\n  const ctx = canvas.getContext(\"2d\");\n  let W = 0, H = 0, DROPS = [];\n  const pointer = { x: -9999, y: -9999 };\n  const CARD = { x: 0, y: 0, w: 0, h: 0 };\n  // 降级条件：只在触摸设备上不画雨（省电），桌面端不管窗口多窄都画——\n  // 因为演示常被嵌在 iframe 里（宽度小于屏幕），按宽度判断会把雨全禁掉\n  const isTouch = window.matchMedia && window.matchMedia(\"(hover: none)\").matches;\n  // hex → rgba 字符串\n  const rgba = (hex, a) => {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16) + \",\" + ((n >> 8) & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  };\n\n  function makeDrop(randomY) {\n    return {\n      x: Math.random() * W,\n      y: randomY ? Math.random() * H : -20,\n      len: (12 + Math.random() * 18) * state.len, // 雨丝长度按参数缩放\n      v: 5 + Math.random() * 6,\n      bend: 0\n    };\n  }\n\n  function rebuild() {\n    // 保底 24 根：iframe 缩略图很小，按面积算会只剩几根，看不清\n    const n = Math.round(Math.max(24, W * H / 6000 * state.rain));\n    DROPS = Array.from({ length: n }, () => makeDrop(true));\n  }\n\n  function resize() {\n    W = canvas.width = innerWidth;\n    H = canvas.height = innerHeight;\n    // 避让区按视口比例缩放（iframe 缩略图很小，固定 400x280 会盖住整个视口）\n    CARD.w = Math.min(420, W * 0.76);\n    CARD.h = Math.min(280, H * 0.6);\n    CARD.x = W / 2 - CARD.w / 2;\n    CARD.y = H / 2 - CARD.h / 2;\n    rebuild();\n  }\n\n  function frame() {\n    if (!isTouch) {\n      ctx.clearRect(0, 0, W, H);\n      ctx.strokeStyle = rgba(state.color, state.opacity); // 雨色 + 透明度实时读 state\n      ctx.lineWidth = state.width;\n      for (const d of DROPS) {\n        d.y += d.v * state.speed / 7;\n        d.x += state.wind * 0.3; // 风偏移：每帧横向漂移\n        d.bend *= 0.92;\n        const dx = d.x - pointer.x, dy = d.y - pointer.y;\n        const d2 = dx * dx + dy * dy;\n        if (d2 < 10000) {\n          const dist = Math.sqrt(d2) || 1;\n          d.bend += (dx / dist) * 1.5;\n        }\n        if (d.y > H + 20) Object.assign(d, makeDrop(false));\n        if (d.x > W + 30) d.x = -20;\n        if (d.x < -30) d.x = W + 20;\n        if (d.x > CARD.x && d.x < CARD.x + CARD.w && d.y > CARD.y && d.y < CARD.y + CARD.h) continue;\n        ctx.beginPath();\n        ctx.moveTo(d.x + d.bend, d.y - d.len);\n        ctx.lineTo(d.x, d.y);\n        ctx.stroke();\n      }\n    }\n    requestAnimationFrame(frame);\n  }\n\n  // 参数变了：雨量/雨长重新生成，其余每帧直接读 state\n  function apply() {\n    document.body.style.background = state.bg;\n    rebuild();\n  }\n\n  canvas.addEventListener(\"mousemove\", e => { pointer.x = e.clientX; pointer.y = e.clientY; });\n  canvas.addEventListener(\"mouseleave\", () => { pointer.x = -9999; pointer.y = -9999; });\n  canvas.addEventListener(\"touchmove\", e => {\n    pointer.x = e.touches[0].clientX;\n    pointer.y = e.touches[0].clientY;\n  }, { passive: true });\n  window.addEventListener(\"resize\", () => resize());\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n\n  resize();\n  requestAnimationFrame(frame);\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "w003",
    标题: "翻页动画",
    分类: "动画",
    子类: "转场",
    风格: [
      "克制简约"
    ],
    场景: [
      "多页网站"
    ],
    元素: [
      "动效"
    ],
    搭配: [
      "数字滚动"
    ],
    标签: [
      "过渡"
    ],
    来源: "自建：个人学习工作台",
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
    效果说明: "从一个页面切到另一个时，旧页面先滑走、新页面再滑进来，不会突然「啪」地换页。",
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
    风格: [
      "水墨国风"
    ],
    场景: [
      "落地页",
      "作品集"
    ],
    元素: [
      "颜色",
      "动效"
    ],
    搭配: [
      "水波按钮"
    ],
    标签: [
      "按钮",
      "点击反馈",
      "水墨"
    ],
    来源: "自建：个人学习工作台",
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
    效果说明: "点按钮先出一圈波纹，然后墨渍从中间扩散把按钮染黑、字变白，过一会儿自己恢复。",
    用法: "详情页拖滑杆调波纹时长、墨渍时长、复原等待；换颜色就把 CSS 里的 #1b1b1b 换成你的主色。",
    提示词: "帮我做一个\"墨渍揭示\"按钮（纯 HTML/CSS/JS，水墨风）：\n\n效果：点击时先出现涟漪扩散，再从中心墨渍放大覆盖按钮，按钮变为墨底白字，随后自动复原。\n\n用法示例：\n<button class=\"btn\" id=\"btn\">点击展开墨渍</button>\n// 点击时：.ripple 波纹 + .stain 墨渍，过一会自动复原\n\n关键参数：\n- ink 墨渍颜色 / textColor 变色后文字色 / btnBg 按钮初始底色 / bg 页面背景色 / ripple 涟漪时长 / stain 墨渍扩散时长 / spread 扩散倍数 / delay 墨渍延迟 / reset 自动复原 / radius 圆角 / text 按钮文字\n\n集成步骤：\n1. 复制 assets/demos/墨渍揭示按钮.html 的 CSS 和 JS\n2. 套到你的主按钮上\n3. 换颜色适配主题",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>墨渍按钮演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .btn {\n    position: relative; overflow: hidden; cursor: pointer; min-width: 250px;\n    background: var(--btn-bg, #fff); color: var(--ink, #1a1a1a); border: 2px solid var(--ink, #1a1a1a);\n    font-size: 17px; font-weight: 700; letter-spacing: 3px;\n    padding: 18px 48px; border-radius: var(--btn-r, 14px); user-select: none;\n    transition: color .25s ease, background .25s ease;\n  }\n  .btn.inked { background: var(--ink, #1a1a1a); color: var(--after-c, #fff); }\n  /* 点击涟漪：从点下去的位置扩散 */\n  .ripple {\n    position: absolute; border-radius: 50%;\n    background: color-mix(in srgb, var(--ink, #1a1a1a) 25%, transparent);\n    transform: scale(0); pointer-events: none;\n  }\n  .ripple.go { animation: inkRipple var(--ripple-dur, .6s) ease-out forwards; }\n  @keyframes inkRipple { to { transform: scale(1); opacity: 0; } }\n  /* 墨渍：两个错位的墨团同时放大，边缘更自然 */\n  .stain, .stain2 {\n    position: absolute; border-radius: 50%; background: var(--ink, #1a1a1a);\n    transform: scale(0); pointer-events: none;\n  }\n  .stain { left: 50%; top: 50%; width: 16px; height: 16px; margin: -8px 0 0 -8px; }\n  .stain2 { left: 63%; top: 36%; width: 10px; height: 10px; margin: -5px 0 0 -5px; }\n  .stain.go { animation: inkStainReveal var(--stain-dur, .55s) ease-out forwards; }\n  .stain2.go { animation: inkStainReveal2 var(--stain-dur, .55s) ease-out .04s forwards; }\n  /* 扩散倍数用 CSS 变量，改了立刻生效 */\n  @keyframes inkStainReveal { to { transform: scale(var(--spread, 55)); } }\n  @keyframes inkStainReveal2 { to { transform: scale(calc(var(--spread, 55) * .73)); } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">点击展开墨渍</button>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    ripple: 0.6, stain: 0.55, reset: 1.6, ink: \"#1a1a1a\", spread: 55,\n    textColor: \"#ffffff\", btnBg: \"#ffffff\", bg: \"#ffffff\", radius: 14,\n    delay: 120, text: \"点击展开墨渍\"\n  };\n  const btn = document.getElementById(\"btn\");\n  let locked = false;\n\n  function apply() {\n    const s = document.documentElement.style;\n    s.setProperty(\"--ripple-dur\", state.ripple + \"s\");\n    s.setProperty(\"--stain-dur\", state.stain + \"s\");\n    s.setProperty(\"--spread\", state.spread);\n    s.setProperty(\"--ink\", state.ink);\n    s.setProperty(\"--after-c\", state.textColor);\n    s.setProperty(\"--btn-bg\", state.btnBg);\n    s.setProperty(\"--btn-r\", state.radius + \"px\");\n    s.setProperty(\"--page-bg\", state.bg);\n    // 静止状态下换文案\n    if (!locked) btn.textContent = state.text;\n  }\n\n  btn.addEventListener(\"click\", (e) => {\n    if (locked) return;\n    locked = true;\n    const rect = btn.getBoundingClientRect();\n    const r = Math.max(rect.width, rect.height) * 1.2;\n    const rip = document.createElement(\"span\");\n    rip.className = \"ripple\";\n    rip.style.width = rip.style.height = r + \"px\";\n    rip.style.left = (e.clientX - rect.left - r / 2) + \"px\";\n    rip.style.top = (e.clientY - rect.top - r / 2) + \"px\";\n    btn.appendChild(rip);\n    rip.classList.add(\"go\");\n    setTimeout(() => {\n      const s1 = document.createElement(\"span\");\n      s1.className = \"stain\";\n      const s2 = document.createElement(\"span\");\n      s2.className = \"stain2\";\n      btn.append(s1, s2);\n      s1.classList.add(\"go\");\n      s2.classList.add(\"go\");\n      btn.classList.add(\"inked\");\n      btn.textContent = \"已揭示 ✓\";\n    }, state.delay);\n    setTimeout(() => {\n      btn.classList.remove(\"inked\");\n      btn.textContent = state.text;\n      btn.querySelectorAll(\".ripple, .stain, .stain2\").forEach(n => n.remove());\n      locked = false;\n    }, state.reset * 1000);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "w005",
    标题: "悬停反馈",
    分类: "动画",
    子类: "导航",
    风格: [
      "克制简约"
    ],
    场景: [
      "全站通用"
    ],
    元素: [
      "动效"
    ],
    搭配: [
      "产品卡悬停"
    ],
    标签: [
      "鼠标悬停",
      "微交互"
    ],
    来源: "自建：个人学习工作台",
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
    效果说明: "导航按钮鼠标移上去变深色、主按钮浮起来，而且反应快慢完全一样——全站统一手感，点哪儿都一个感觉。",
    用法: "详情页拖「反应速度」一个滑杆，所有按钮一起变快变慢；演示页就两组按钮，鼠标移上去就能看到。",
    提示词: "帮我搭一套统一的鼠标悬停反馈（纯 HTML/CSS/JS）：\n\n效果：所有按钮鼠标移上去都有反馈，而且过渡时长完全一样（一个变量控制全部）。\n\n用法示例：\n// 所有控件共用同一个过渡时长变量 = 一套手感\n.pills a { transition: background var(--dur, .15s) ease, color var(--dur, .15s) ease; }\n.cta { transition: transform var(--dur, .15s) ease, box-shadow var(--dur, .15s) ease; }\n\n关键参数：\n- dur 反应时长 / lift 抬升距离 / scale 放大倍数 / shadow 阴影强度 / accent 强调色 / pillBg 导航条底色 / pillHover 导航悬停底色 / bg 页面背景色\n\n集成步骤：\n1. 复制 assets/demos/hover微交互.html 的 CSS\n2. 给全站可点击元素套同一套过渡\n3. 换主题只改变量",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>悬停反馈演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column;\n    align-items: center; justify-content: center; gap: 28px;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n    padding: 0 20px;\n  }\n  .note { font-size: 15px; color: #555; text-align: center; line-height: 1.8; }\n  .note b { color: var(--accent, #1a1a1a); }\n  /* 导航按钮：鼠标移上去背景变深 */\n  .pills { display: flex; gap: 6px; background: var(--pill-bg, #f2f0eb); padding: 6px; border-radius: 999px; }\n  .pills a {\n    text-decoration: none; color: #555; font-size: 14px; padding: 9px 20px;\n    border-radius: 999px; cursor: pointer;\n    transition: background var(--dur, .15s) ease, color var(--dur, .15s) ease;\n  }\n  .pills a:hover { background: var(--pill-hover, #d9d5cc); color: var(--accent, #1a1a1a); }\n  /* 主按钮：鼠标移上去浮起来 + 阴影变深 */\n  .cta {\n    font-size: 15px; font-weight: 700; padding: 14px 38px; border-radius: 12px;\n    border: none; cursor: pointer; background: var(--accent, #1a1a1a); color: #fff;\n    transition: transform var(--dur, .15s) ease, box-shadow var(--dur, .15s) ease;\n  }\n  .cta:hover {\n    transform: translateY(calc(-1 * var(--lift, 2px))) scale(var(--scale, 1));\n    box-shadow: 0 8px 20px color-mix(in srgb, var(--accent, #1a1a1a) var(--shadow, 18%), transparent);\n  }\n  .tip { font-size: 12.5px; color: #8a8a85; text-align: center; }\n</style>\n</head>\n<body>\n  <p class=\"note\">鼠标移到下面的按钮上看看——<br><b>所有按钮的反应快慢完全一样</b></p>\n  <nav class=\"pills\"><a>首页</a><a>题库</a><a>统计</a><a>设置</a></nav>\n  <button class=\"cta\">开始刷题</button>\n  <p class=\"tip\">导航按钮：变深色。主按钮：浮起来。同一个速度，全站统一（详情页可调）</p>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      dur: 0.15, lift: 2, scale: 1, shadow: 18,\n      accent: \"#1a1a1a\", pillBg: \"#f2f0eb\", pillHover: \"#d9d5cc\", bg: \"#ffffff\"\n    };\n\n    // 一个滑杆控制所有按钮 = 统一手感；其余参数走 CSS 变量实时生效\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--dur\", state.dur + \"s\");\n      s.setProperty(\"--lift\", state.lift + \"px\");\n      s.setProperty(\"--scale\", state.scale);\n      s.setProperty(\"--shadow\", state.shadow + \"%\");\n      s.setProperty(\"--accent\", state.accent);\n      s.setProperty(\"--pill-bg\", state.pillBg);\n      s.setProperty(\"--pill-hover\", state.pillHover);\n      s.setProperty(\"--page-bg\", state.bg);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "w006",
    标题: "3D 背景",
    分类: "背景",
    子类: "背景",
    风格: [
      "科技感"
    ],
    场景: [
      "科技公司"
    ],
    元素: [
      "动效"
    ],
    搭配: [
      "粒子文字"
    ],
    标签: [
      "3D",
      "氛围"
    ],
    来源: "自建：个人学习工作台（正式版用 three.js + GLB 模型）",
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
    效果说明: "一个由亮点组成的 3D 球在背景里慢慢转，鼠标动视角也跟着动。给页面加「高级感」氛围用。",
    用法: "详情页拖滑杆调粒子多少、转多快；演示是零依赖简化版，正式做可以用 three.js 加载 3D 模型（注意别太大）。",
    提示词: "帮我做一个 3D 粒子球背景（原生 WebGL，零依赖；正式版可用 three.js）：\n\n效果：亮点组成 3D 球体缓慢自转，鼠标移动控制视角，作为页面氛围背景。\n\n用法示例：\n<canvas id=\"c\"></canvas>\n<script>\n  const state = { count: 260, speed: 4 };\n</script>\n\n关键参数：\n- count 粒子数量 / speed 旋转速度 / fov 透视强度 / size 粒子大小 / alpha 粒子透明度 / color 主色 / color2 副色 / bg 背景颜色 / glow 是否发光\n\n集成步骤：\n1. 复制 assets/demos/3D背景.html 的 WebGL 代码\n2. 想加载 3D 模型就换 three.js（注意体积和手机端降级）\n3. 手机端降级为静态图",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>3D 背景演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: #101014; overflow: hidden; }\n  canvas { display: block; width: 100%; height: 100%; }\n  .fallback {\n    position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;\n    color: #8b8992; font-size: 14px; text-align: center; padding: 0 20px;\n  }\n</style>\n</head>\n<body>\n<canvas id=\"c\"></canvas>\n<div class=\"fallback\" id=\"fb\" hidden>当前浏览器不支持 WebGL，换 Chrome / Edge 打开看 3D 效果</div>\n<script>\n  const canvas = document.getElementById(\"c\");\n  const gl = canvas.getContext(\"webgl\", { antialias: true, alpha: false });\n  if (!gl) {\n    document.getElementById(\"fb\").hidden = false;\n    throw new Error(\"WebGL 不可用\");\n  }\n\n  // 默认参数（父页面详情页可调）\n  const state = {\n    count: 260, speed: 4, fov: 60, size: 3.5, alpha: 0.9,\n    color: \"#735cd9\", color2: \"#ffffff\", bg: \"#101014\", glow: false\n  };\n  // hex → [r,g,b]（0-1）\n  const rgb = hex => {\n    const n = parseInt(hex.slice(1), 16);\n    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];\n  };\n\n  const vs = `\n    attribute vec3 aPos;\n    attribute float aMix;\n    varying float vMix;\n    uniform mat4 uMVP;\n    uniform float uDpr;\n    uniform float uSize;\n    void main() {\n      vMix = aMix;\n      gl_PointSize = uSize * uDpr;\n      gl_Position = uMVP * vec4(aPos, 1.0);\n    }`;\n  const fs = `\n    precision mediump float;\n    varying float vMix;\n    uniform vec3 uColor;\n    uniform vec3 uColor2;\n    uniform float uAlpha;\n    void main() {\n      vec2 d = gl_PointCoord - vec2(0.5);\n      if (dot(d, d) > 0.25) discard;\n      gl_FragColor = vec4(mix(uColor, uColor2, vMix), uAlpha);\n    }`;\n\n  function compile(type, src) {\n    const sh = gl.createShader(type);\n    gl.shaderSource(sh, src);\n    gl.compileShader(sh);\n    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));\n    return sh;\n  }\n  const prog = gl.createProgram();\n  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));\n  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));\n  gl.linkProgram(prog);\n  gl.useProgram(prog);\n\n  const uMVP = gl.getUniformLocation(prog, \"uMVP\");\n  const uDpr = gl.getUniformLocation(prog, \"uDpr\");\n  const uSize = gl.getUniformLocation(prog, \"uSize\");\n  const uColor = gl.getUniformLocation(prog, \"uColor\");\n  const uColor2 = gl.getUniformLocation(prog, \"uColor2\");\n  const uAlpha = gl.getUniformLocation(prog, \"uAlpha\");\n  const posLoc = gl.getAttribLocation(prog, \"aPos\");\n  const mixLoc = gl.getAttribLocation(prog, \"aMix\");\n  let N = 260;\n  let posBuf = null, mixBuf = null;\n\n  // Fibonacci 球面：把 N 个点均匀撒在球上\n  function buildPoints(count) {\n    const pts = new Float32Array(count * 3);\n    const mixes = new Float32Array(count);\n    const golden = Math.PI * (3 - Math.sqrt(5));\n    for (let i = 0; i < count; i++) {\n      const y = 1 - (i / (count - 1)) * 2;\n      const r = Math.sqrt(Math.max(0, 1 - y * y));\n      const th = golden * i;\n      pts[i * 3]     = Math.cos(th) * r;\n      pts[i * 3 + 1] = y;\n      pts[i * 3 + 2] = Math.sin(th) * r;\n      mixes[i] = Math.random();\n    }\n    return { pts, mixes };\n  }\n\n  function rebuild(count) {\n    const { pts, mixes } = buildPoints(count);\n    if (!posBuf) {\n      posBuf = gl.createBuffer();\n      mixBuf = gl.createBuffer();\n    }\n    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);\n    gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);\n    gl.enableVertexAttribArray(posLoc);\n    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);\n    gl.bindBuffer(gl.ARRAY_BUFFER, mixBuf);\n    gl.bufferData(gl.ARRAY_BUFFER, mixes, gl.STATIC_DRAW);\n    gl.enableVertexAttribArray(mixLoc);\n    gl.vertexAttribPointer(mixLoc, 1, gl.FLOAT, false, 0, 0);\n    N = count;\n  }\n\n  // 参数变了：数量重新生成，颜色/大小/透明度/背景/混合模式立即更新\n  function apply() {\n    if (state.count !== N) rebuild(state.count);\n    gl.uniform3fv(uColor, rgb(state.color));\n    gl.uniform3fv(uColor2, rgb(state.color2));\n    gl.uniform1f(uSize, state.size);\n    gl.uniform1f(uAlpha, state.alpha);\n    gl.clearColor(...rgb(state.bg), 1);\n    // 发光：叠加混合，亮点互相加亮\n    gl.enable(gl.BLEND);\n    gl.blendFunc(gl.SRC_ALPHA, state.glow ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);\n    document.body.style.background = state.bg;\n    resize(); // 透视角度可能变了，重建投影矩阵\n  }\n\n  function perspective(fovy, aspect, near, far) {\n    const f = 1 / Math.tan(fovy / 2);\n    const o = new Float32Array(16);\n    o[0] = f / aspect; o[5] = f; o[10] = (far + near) / (near - far);\n    o[11] = -1; o[14] = (2 * far * near) / (near - far);\n    return o;\n  }\n  function mult(a, b) {\n    const o = new Float32Array(16);\n    for (let c = 0; c < 4; c++) {\n      for (let r = 0; r < 4; r++) {\n        o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] +\n                       a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];\n      }\n    }\n    return o;\n  }\n  function rotY(a) {\n    const c = Math.cos(a), s = Math.sin(a);\n    return new Float32Array([c, 0, s, 0,  0, 1, 0, 0,  -s, 0, c, 0,  0, 0, 0, 1]);\n  }\n  function rotX(a) {\n    const c = Math.cos(a), s = Math.sin(a);\n    return new Float32Array([1, 0, 0, 0,  0, c, -s, 0,  0, s, c, 0,  0, 0, 0, 1]);\n  }\n\n  let proj = null;\n  let rot = 0, tilt = 0.35;\n  const pointer = { x: 0, y: 0 };\n\n  function resize() {\n    const w = innerWidth, h = innerHeight;\n    const dpr = window.devicePixelRatio || 1;\n    canvas.width = w * dpr;\n    canvas.height = h * dpr;\n    gl.viewport(0, 0, canvas.width, canvas.height);\n    gl.uniform1f(uDpr, dpr);\n    proj = perspective(state.fov * Math.PI / 180, w / h, 0.1, 10);\n  }\n\n  function frame() {\n    rot += 0.004 + state.speed * 0.00035 + pointer.x * 0.00025;\n    tilt = 0.35 + pointer.y * 0.00035;\n    gl.uniformMatrix4fv(uMVP, false, mult(proj, mult(rotY(rot), rotX(tilt))));\n    gl.clear(gl.COLOR_BUFFER_BIT);\n    gl.drawArrays(gl.POINTS, 0, N);\n    requestAnimationFrame(frame);\n  }\n\n  canvas.addEventListener(\"mousemove\", e => {\n    pointer.x = (e.clientX / innerWidth - 0.5) * 2;\n    pointer.y = (e.clientY / innerHeight - 0.5) * 2;\n  });\n  canvas.addEventListener(\"touchmove\", e => {\n    pointer.x = (e.touches[0].clientX / innerWidth - 0.5) * 2;\n    pointer.y = (e.touches[0].clientY / innerHeight - 0.5) * 2;\n  }, { passive: true });\n  window.addEventListener(\"resize\", () => resize());\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n\n  resize();\n  apply();\n  requestAnimationFrame(frame);\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "a101",
    标题: "双按钮",
    分类: "方案",
    风格: [
      "克制简约"
    ],
    场景: [
      "落地页"
    ],
    元素: [
      "版面",
      "颜色"
    ],
    搭配: [
      "水波按钮"
    ],
    标签: [
      "转化",
      "落地页"
    ],
    来源: "Apple 官网分析（2026-08-20）",
    效果演示: "assets/demos/双按钮套路.html",
    参数: [
      {
        键: "solidColor",
        名: "实心按钮底色（主强调色）",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "solidText",
        名: "实心按钮文字色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "ghostBorder",
        名: "描边按钮边框色",
        类型: "color",
        默认: "#ddd8ce"
      },
      {
        键: "ghostText",
        名: "描边按钮文字色",
        类型: "color",
        默认: "#6f6a5e"
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "cardBg",
        名: "步骤卡片底色",
        类型: "color",
        默认: "#faf9f6"
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
        键: "btnRadius",
        名: "按钮圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 30,
        步长: 1,
        默认: 12
      },
      {
        键: "fontSize",
        名: "按钮字号（px）",
        类型: "slider",
        最小: 12,
        最大: 20,
        步长: 1,
        默认: 14
      },
      {
        键: "gap",
        名: "按钮间距（px）",
        类型: "slider",
        最小: 0,
        最大: 40,
        步长: 1,
        默认: 12
      },
      {
        键: "shadow",
        名: "实心按钮阴影强度（%）",
        类型: "slider",
        最小: 0,
        最大: 50,
        步长: 2,
        默认: 18
      }
    ],
    效果说明: "落地页开头：大标题下放两个按钮——虚按钮（描边）让访客先了解，实按钮（实心）让访客行动。转化页的标准开头。",
    用法: "方案页里三步写得清清楚楚，照做就行；不用调参。",
    提示词: "帮我做一个落地页开头，用\"双按钮\"方案：\n\n目的：让访客先了解，再行动。\n\n步骤：\n1. 放一个大标题，说清你是干嘛的\n2. 标题下放两个按钮：虚按钮（描边）\"进一步了解\" + 实按钮（实心）\"立即使用\"\n3. 实按钮永远比虚按钮显眼（大 / 颜色深 / 带阴影）\n\n示意代码：\n<a class=\"btn ghost\">进一步了解</a>  // 虚：描边 + 低对比\n<a class=\"btn solid\">立即使用</a>    // 实：实心 + 高对比 + 阴影\n\n关键参数：\n- solidColor 实心按钮底色 / solidText 实心按钮文字色 / ghostBorder 描边按钮边框色 / ghostText 描边按钮文字色 / bg 页面背景色 / cardBg 步骤卡片底色 / radius 卡片圆角 / btnRadius 按钮圆角 / fontSize 按钮字号 / gap 按钮间距 / shadow 实心按钮阴影强度\n\n集成步骤：\n1. 复制 assets/demos/双按钮套路.html 的结构\n2. 换成你的产品文案\n3. 主按钮文案写成交动作（立即 / 购买 / 开始）",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>双按钮方案</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif; padding: 20px;\n  }\n  .plan { width: min(560px, 94vw); }\n  .plan h1 { font-size: 26px; font-weight: 800; color: var(--ink, #1a1a1a); }\n  .aim { margin-top: 6px; font-size: 14px; color: #8a8a85; }\n  .steps { margin-top: 18px; display: flex; flex-direction: column; gap: 10px; }\n  .step {\n    display: flex; gap: 12px; align-items: flex-start;\n    background: var(--card, #faf9f6); border: 1px solid #ecebe7;\n    border-radius: var(--r, 12px); padding: 12px 14px;\n    font-size: 14px; line-height: 1.7; color: #555;\n  }\n  .step b { color: var(--ink, #1a1a1a); white-space: nowrap; }\n  .demo {\n    margin-top: 20px; border: 1px dashed #dcdad2; border-radius: var(--r, 12px);\n    padding: 22px; text-align: center;\n  }\n  .demo h2 { font-size: 18px; font-weight: 700; color: var(--ink, #1a1a1a); }\n  .demo p { margin-top: 6px; font-size: 12.5px; color: #8a8a85; }\n  .btns { margin-top: 14px; display: flex; justify-content: center; gap: var(--gap, 12px); }\n  .btn { font-size: var(--fs, 14px); padding: 11px 26px; border-radius: var(--btn-r, 12px); }\n  .btn.ghost { border: 1.5px solid var(--ghost-bd, #ddd8ce); color: var(--ghost-t, #6f6a5e); }\n  .btn.solid {\n    background: var(--solid, #1a1a1a); color: var(--solid-t, #fff); font-weight: 700;\n    box-shadow: 0 8px 18px color-mix(in srgb, var(--solid, #1a1a1a) var(--shadow, 18%), transparent);\n  }\n</style>\n</head>\n<body>\n  <div class=\"plan\">\n    <h1>双按钮</h1>\n    <p class=\"aim\">目的：让访客先了解，再行动——转化页的标准开头</p>\n    <div class=\"steps\">\n      <div class=\"step\"><b>1.</b> 放一个大标题，说清你是干嘛的</div>\n      <div class=\"step\"><b>2.</b> 标题下放两个按钮：<br>「虚」描边按钮 = 先给信息（进一步了解）<br>「实」实心按钮 = 要行动（立即使用）</div>\n      <div class=\"step\"><b>3.</b> 实按钮永远比虚按钮显眼（大/颜色深/带阴影）</div>\n    </div>\n    <div class=\"demo\">\n      <h2>把灵感变成可复用的弹药</h2>\n      <p>示意：左边虚、右边实</p>\n      <div class=\"btns\">\n        <span class=\"btn ghost\">进一步了解</span>\n        <span class=\"btn solid\">立即使用</span>\n      </div>\n    </div>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      solidColor: \"#1a1a1a\", solidText: \"#ffffff\", ghostBorder: \"#ddd8ce\", ghostText: \"#6f6a5e\",\n      bg: \"#ffffff\", cardBg: \"#faf9f6\", radius: 12, btnRadius: 12, fontSize: 14,\n      gap: 12, shadow: 18\n    };\n\n    // 参数变了：全部走 CSS 变量，颜色/圆角/字号/间距实时变\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--solid\", state.solidColor);\n      s.setProperty(\"--solid-t\", state.solidText);\n      s.setProperty(\"--ghost-bd\", state.ghostBorder);\n      s.setProperty(\"--ghost-t\", state.ghostText);\n      s.setProperty(\"--page\", state.bg);\n      s.setProperty(\"--card\", state.cardBg);\n      s.setProperty(\"--ink\", state.solidColor);\n      s.setProperty(\"--r\", state.radius + \"px\");\n      s.setProperty(\"--btn-r\", state.btnRadius + \"px\");\n      s.setProperty(\"--fs\", state.fontSize + \"px\");\n      s.setProperty(\"--gap\", state.gap + \"px\");\n      s.setProperty(\"--shadow\", state.shadow + \"%\");\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "a102",
    标题: "视觉重量",
    分类: "方案",
    风格: [
      "克制简约"
    ],
    场景: [
      "全站通用"
    ],
    元素: [
      "版面",
      "留白"
    ],
    搭配: [
      "双按钮"
    ],
    标签: [
      "设计原理"
    ],
    来源: "Apple 官网分析 + 网页设计方法论（个人工作台已沉淀）",
    效果演示: "assets/demos/视觉重量八杠杆.html",
    参数: [
      {
        键: "accent",
        名: "主角强调色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "accentText",
        名: "主角按钮文字色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "muteColor",
        名: "普通版弱化色",
        类型: "color",
        默认: "#6f6a5e"
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "cardBg",
        名: "步骤卡片底色",
        类型: "color",
        默认: "#faf9f6"
      },
      {
        键: "heroSize",
        名: "主角字号（px）",
        类型: "slider",
        最小: 14,
        最大: 36,
        步长: 1,
        默认: 22
      },
      {
        键: "normalSize",
        名: "普通版字号（px）",
        类型: "slider",
        最小: 12,
        最大: 24,
        步长: 1,
        默认: 15
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
        键: "gap",
        名: "对比卡片间距（px）",
        类型: "slider",
        最小: 4,
        最大: 40,
        步长: 1,
        默认: 12
      },
      {
        键: "shadow",
        名: "主角阴影强度（%）",
        类型: "slider",
        最小: 0,
        最大: 50,
        步长: 2,
        默认: 18
      }
    ],
    效果说明: "让页面上最重要的东西第一眼被看见：先定主角，给它加 2-3 个重量（变大 / 对比 / 留白 / 会动），闭眼再睁验证。",
    用法: "方案页三步照做；演示页右边就是加过重量的对照，一眼看出差别；不用调参。",
    提示词: "帮我做一个\"视觉重量\"方案页（纯 HTML/CSS/JS）：\n\n目的：让页面上最重要的东西，第一眼就被看见。\n\n步骤：\n1. 先定主角：这一页你最想让用户看什么\n2. 给主角加 2-3 个重量：变大加粗 / 颜色对比 / 周围留白 / 悬停会动\n3. 验证：闭眼再睁开，第一眼必须落在主角上\n\n示意代码（主角版）：\n.box.strong h3 { font-size: 22px; font-weight: 900; color: #1a1a1a; }\n.box.strong .b { background: #1a1a1a; color: #fff; box-shadow: 0 8px 18px rgba(26,26,26,.18); }\n\n关键参数：\n- accent 主角强调色 / accentText 主角按钮文字色 / muteColor 普通版弱化色 / bg 页面背景色 / cardBg 步骤卡片底色 / heroSize 主角字号 / normalSize 普通版字号 / radius 卡片圆角 / gap 对比卡片间距 / shadow 主角阴影强度\n\n集成步骤：\n1. 复制 assets/demos/视觉重量八杠杆.html 的结构\n2. 做自己的页面时先定主角，再加 2-3 个重量\n3. 验证：闭眼再睁，第一眼落在主角上",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>视觉重量方案</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif; padding: 20px;\n  }\n  .plan { width: min(620px, 94vw); }\n  .plan h1 { font-size: 26px; font-weight: 800; color: var(--ink, #1a1a1a); }\n  .aim { margin-top: 6px; font-size: 14px; color: #8a8a85; }\n  .steps { margin-top: 18px; display: flex; flex-direction: column; gap: 10px; }\n  .step {\n    display: flex; gap: 12px; align-items: flex-start;\n    background: var(--card, #faf9f6); border: 1px solid #ecebe7;\n    border-radius: var(--r, 12px); padding: 12px 14px;\n    font-size: 14px; line-height: 1.7; color: #555;\n  }\n  .step b { color: var(--ink, #1a1a1a); white-space: nowrap; }\n  .compare {\n    margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: var(--gap, 12px);\n  }\n  .box { border: 1px solid #ecebe7; border-radius: var(--r, 12px); padding: 18px; text-align: center; }\n  .box small { font-size: 12px; color: #8a8a85; }\n  .box h3 { margin-top: 10px; font-size: var(--normal-fs, 15px); font-weight: 600; color: var(--mute, #6f6a5e); }\n  .box .b {\n    margin-top: 10px; display: inline-block; font-size: 12.5px;\n    border: 1px solid #ddd8ce; color: var(--mute, #6f6a5e);\n    padding: 8px 18px; border-radius: 10px;\n  }\n  /* 主角版：字号更大更粗 + 强调色 + 阴影，三个「重量」杠杆一起上 */\n  .box.strong h3 { font-size: var(--hero-fs, 22px); font-weight: 900; color: var(--ink, #1a1a1a); }\n  .box.strong .b {\n    background: var(--ink, #1a1a1a); color: var(--solid-t, #fff);\n    border-color: var(--ink, #1a1a1a); font-weight: 700;\n    box-shadow: 0 8px 18px color-mix(in srgb, var(--ink, #1a1a1a) var(--shadow, 18%), transparent);\n  }\n</style>\n</head>\n<body>\n  <div class=\"plan\">\n    <h1>视觉重量</h1>\n    <p class=\"aim\">目的：让页面上最重要的东西，第一眼就被看见</p>\n    <div class=\"steps\">\n      <div class=\"step\"><b>1.</b> 先定主角：这一页你最想让用户看什么</div>\n      <div class=\"step\"><b>2.</b> 给主角加 2-3 个「重量」：变大加粗 / 颜色对比 / 周围留白 / 悬停会动</div>\n      <div class=\"step\"><b>3.</b> 验证：闭眼再睁开，第一眼必须落在主角上，不是就不够重</div>\n    </div>\n    <div class=\"compare\">\n      <div class=\"box\">\n        <small>普通版（重量不够）</small>\n        <h3>试试我们的产品</h3>\n        <span class=\"b\">了解更多</span>\n      </div>\n      <div class=\"box strong\">\n        <small>主角版（加了重量）</small>\n        <h3>把灵感变成弹药</h3>\n        <span class=\"b\">立即开始</span>\n      </div>\n    </div>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      accent: \"#1a1a1a\", accentText: \"#ffffff\", muteColor: \"#6f6a5e\",\n      bg: \"#ffffff\", cardBg: \"#faf9f6\", heroSize: 22, normalSize: 15,\n      radius: 12, gap: 12, shadow: 18\n    };\n\n    // 参数变了：全部走 CSS 变量，字号对比/颜色/阴影实时变\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--ink\", state.accent);\n      s.setProperty(\"--solid-t\", state.accentText);\n      s.setProperty(\"--mute\", state.muteColor);\n      s.setProperty(\"--page\", state.bg);\n      s.setProperty(\"--card\", state.cardBg);\n      s.setProperty(\"--hero-fs\", state.heroSize + \"px\");\n      s.setProperty(\"--normal-fs\", state.normalSize + \"px\");\n      s.setProperty(\"--r\", state.radius + \"px\");\n      s.setProperty(\"--gap\", state.gap + \"px\");\n      s.setProperty(\"--shadow\", state.shadow + \"%\");\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "a103",
    标题: "产品卡悬停",
    分类: "动画",
    子类: "卡片",
    风格: [
      "轻盈灵动"
    ],
    场景: [
      "电商",
      "作品集"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "产品卡片鼠标移上去会轻轻抬起、倾斜、变亮，像在邀请你上手。产品展示页用。",
    用法: "详情页拖滑杆调抬起多高、反应快慢；幅度调小就更克制。",
    提示词: "帮我做一个产品卡悬停微动效果（纯 HTML/CSS/JS）：\n\n效果：产品卡片默认静态，鼠标移上去轻轻上浮 + 倾斜 + 阴影加深 + 变亮。\n\n用法示例：\n.pcard { transition: transform var(--hover-dur, .3s) ease, box-shadow var(--hover-dur, .3s) ease, filter var(--hover-dur, .3s) ease; }\n.pcard:hover {\n  transform: translateY(calc(-1 * var(--hover-amp, 6px))) rotate(-1.5deg);\n  box-shadow: 0 16px 30px rgba(27,27,27,.14);\n  filter: brightness(1.05);\n}\n\n关键参数：\n- amp 悬停抬升 / dur 反应时长 / tilt 悬停倾斜 / shadow 阴影强度 / radius 卡片圆角 / cardBg 卡片底色 / devA 设备一主色 / devB 设备二主色 / devC 设备三主色 / bg 页面背景色\n\n集成步骤：\n1. 复制 assets/demos/设备hover交互.html 的 CSS\n2. 套到产品卡 / 作品集卡片上\n3. 幅度调小更克制",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>产品卡悬停演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .cards { display: flex; gap: 26px; flex-wrap: wrap; justify-content: center; padding: 0 20px; }\n  .pcard {\n    width: 180px; background: var(--card-bg, #fff); border: 1px solid #e5e2db;\n    border-radius: var(--card-r, 18px);\n    padding: 26px 18px 20px; text-align: center; cursor: pointer;\n    transition: transform var(--hover-dur, .3s) ease, box-shadow var(--hover-dur, .3s) ease, filter var(--hover-dur, .3s) ease;\n  }\n  .pcard:hover {\n    transform: translateY(calc(-1 * var(--hover-amp, 6px))) rotate(calc(var(--tilt, 1.5deg) * -1));\n    box-shadow: 0 16px 30px color-mix(in srgb, #1b1b1b var(--shadow, 14%), transparent);\n    filter: brightness(1.05);\n  }\n  .device {\n    width: 100%; height: 110px; border-radius: 12px; margin-bottom: 14px;\n    display: flex; align-items: center; justify-content: center;\n    color: rgba(255,255,255,.85); font-size: 12px; font-weight: 600;\n  }\n  /* 每张设备图的主色可调，第二档自动混白提亮 */\n  .device.a { background: linear-gradient(145deg, var(--dev-a, #7b5cff), color-mix(in srgb, var(--dev-a, #7b5cff) 55%, white)); }\n  .device.b { background: linear-gradient(145deg, var(--dev-b, #1b1b1b), color-mix(in srgb, var(--dev-b, #1b1b1b) 55%, white)); }\n  .device.c { background: linear-gradient(145deg, var(--dev-c, #ff7a9c), color-mix(in srgb, var(--dev-c, #ff7a9c) 55%, white)); }\n  .pcard h4 { font-size: 14px; color: #1b1b1b; }\n  .pcard p { font-size: 12px; color: #8d8a82; margin-top: 4px; }\n</style>\n</head>\n<body>\n  <div class=\"cards\">\n    <div class=\"pcard\"><div class=\"device a\">便携设备</div><h4>随身款</h4><p>鼠标移上来看看</p></div>\n    <div class=\"pcard\"><div class=\"device b\">智能手表</div><h4>腕上款</h4><p>鼠标移上来看看</p></div>\n    <div class=\"pcard\"><div class=\"device c\">桌面设备</div><h4>桌面款</h4><p>鼠标移上来看看</p></div>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      amp: 6, dur: 0.3, tilt: 1.5, shadow: 14, radius: 18,\n      cardBg: \"#ffffff\", devA: \"#7b5cff\", devB: \"#1b1b1b\", devC: \"#ff7a9c\", bg: \"#ffffff\"\n    };\n\n    // 参数变了：改 CSS 变量，抬起高度/倾斜/阴影/颜色实时变\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--hover-amp\", state.amp + \"px\");\n      s.setProperty(\"--hover-dur\", state.dur + \"s\");\n      s.setProperty(\"--tilt\", state.tilt + \"deg\");\n      s.setProperty(\"--shadow\", state.shadow + \"%\");\n      s.setProperty(\"--card-r\", state.radius + \"px\");\n      s.setProperty(\"--card-bg\", state.cardBg);\n      s.setProperty(\"--dev-a\", state.devA);\n      s.setProperty(\"--dev-b\", state.devB);\n      s.setProperty(\"--dev-c\", state.devC);\n      s.setProperty(\"--page-bg\", state.bg);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s201",
    标题: "绸缎渐变",
    分类: "背景",
    子类: "背景",
    风格: [
      "科技感"
    ],
    场景: [
      "落地页"
    ],
    元素: [
      "颜色",
      "动效"
    ],
    搭配: [
      "视觉重量"
    ],
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
    效果说明: "冷暖色绸缎一样的光在背景里不停旋转，是全页最吸睛的地方，但前面放文字依然看得清。",
    用法: "详情页拖滑杆调转多快、糊不糊；颜色在 conic-gradient 里换；前面文字要加深色底或毛玻璃保证能看清。",
    提示词: "做一个绸缎动态渐变背景 Hero（纯 HTML/CSS）：\n\n效果：两层 conic-gradient 冷暖色（紫/粉/橙/蓝），旋转混合成绸缎质感，前景文字清晰可读。\n\n用法示例：\n.silk { inset: -50%; background: conic-gradient(...); filter: blur(var(--silk-blur, 48px)) saturate(1.4); animation: spin var(--silk-speed, 18s) linear infinite; }\n.silk2 { inset: -30%; background: conic-gradient(...); filter: blur(calc(var(--silk-blur, 48px) * 1.45)) saturate(1.3); opacity: .7; animation: spin calc(var(--silk-speed, 18s) * 1.44) linear infinite reverse; }\n\n关键参数：\n- c1 渐变色 1 / c2 渐变色 2 / c3 渐变色 3 / angle 渐变起始角度 / speed 流动速度 / blur 柔化程度 / sat 饱和度 / text 标题文字 / bg 页面底色\n- 两层时长错开（18s / 26s 比例）\n\n集成步骤：\n1. 复制 assets/demos/绸缎渐变.html（完整可跑）\n2. 换色相 / 时长适配品牌\n3. 文字区加深色底或毛玻璃保证可读",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>绸缎渐变演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { height: 100%; }\n  body { background: var(--page-bg, #0b0b12); overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; }\n  .silk, .silk2 { position: absolute; border-radius: 50%; }\n  .silk {\n    inset: -50%;\n    /* 三个渐变色都可调，from 角度即起始角度 */\n    background: conic-gradient(from var(--angle, 0deg), var(--c1, #7b5cff), var(--c2, #ff5c8a), var(--c3, #3ec6ff), var(--c1, #7b5cff));\n    filter: blur(var(--silk-blur, 48px)) saturate(var(--silk-sat, 1.4));\n    animation: spin var(--silk-speed, 18s) linear infinite;\n  }\n  .silk2 {\n    inset: -30%;\n    background: conic-gradient(from calc(var(--angle, 0deg) + 180deg), var(--c3, #3ec6ff), var(--c1, #7b5cff), var(--c2, #ff5c8a), var(--c3, #3ec6ff));\n    filter: blur(calc(var(--silk-blur, 48px) * 1.45)) saturate(var(--silk-sat, 1.4));\n    opacity: .7;\n    animation: spin calc(var(--silk-speed, 18s) * 1.44) linear infinite reverse;\n  }\n  @keyframes spin { to { transform: rotate(360deg); } }\n  .content {\n    position: relative; z-index: 1; height: 100%;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    color: #fff; text-align: center; padding: 0 20px;\n  }\n  .content h1 { font-size: clamp(26px, 4.5vw, 40px); font-weight: 800; text-shadow: 0 2px 18px rgba(0,0,0,.35); }\n  .content .btn { background: #fff; color: #111; font-weight: 700; padding: 11px 26px; border-radius: 999px; font-size: 14px; }\n</style>\n</head>\n<body>\n  <div class=\"silk\"></div>\n  <div class=\"silk2\"></div>\n  <div class=\"content\">\n    <h1 id=\"title\">冷暖色不断旋转的背景</h1>\n    <span class=\"btn\">立即开始</span>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      speed: 18, blur: 48, c1: \"#7b5cff\", c2: \"#ff5c8a\", c3: \"#3ec6ff\",\n      angle: 0, sat: 1.4, text: \"冷暖色不断旋转的背景\", bg: \"#0b0b12\"\n    };\n\n    // 参数变了：改 CSS 变量，转速/柔化/三色/角度实时变\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--silk-speed\", state.speed + \"s\");\n      s.setProperty(\"--silk-blur\", state.blur + \"px\");\n      s.setProperty(\"--silk-sat\", state.sat);\n      s.setProperty(\"--c1\", state.c1);\n      s.setProperty(\"--c2\", state.c2);\n      s.setProperty(\"--c3\", state.c3);\n      s.setProperty(\"--angle\", state.angle + \"deg\");\n      s.setProperty(\"--page-bg\", state.bg);\n      document.getElementById(\"title\").textContent = state.text;\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s202",
    标题: "悬浮边框",
    分类: "动画",
    子类: "卡片",
    风格: [
      "科技感"
    ],
    场景: [
      "产品展示"
    ],
    元素: [
      "颜色",
      "动效"
    ],
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
    效果说明: "就一张卡片：鼠标移上去冒出彩色描边并轻轻上浮，告诉你「这个可以点」。",
    用法: "详情页点色块换描边颜色、拖滑杆调反应快慢；整套就 3 行 CSS。",
    提示词: "帮我做一个卡片悬停描边效果（纯 HTML/CSS/JS）：\n\n效果：卡片鼠标移上去冒出品牌色描边 + 轻轻上浮，提示可点性。\n\n用法示例：\n.item { transition: box-shadow var(--edge-dur, .2s) ease, transform var(--edge-dur, .2s) ease; }\n.item:hover {\n  box-shadow: 0 0 0 1px var(--edge-color, #635bff), 0 12px 24px rgba(99,91,255,.14);\n  transform: translateY(-3px);\n}\n\n关键参数：\n- color 描边渐变起始色 / color2 描边渐变结束色 / dur 浮现时长 / width 边框粗细 / radius 卡片圆角 / glow 发光强度 / lift 悬停上浮 / cardBg 卡片底色 / bg 页面背景色\n\n集成步骤：\n1. 复制 assets/demos/悬浮边框.html 的 CSS\n2. 描边色换成你的品牌色\n3. 配合 0.15-0.3s 过渡",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>悬浮边框演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page-bg, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif; padding: 20px;\n  }\n  /* 就一张大卡片：鼠标移上去冒出渐变描边并上浮 */\n  .item {\n    position: relative; z-index: 0;\n    width: min(420px, 80vw); height: 200px;\n    background: var(--card-bg, #faf9f6); border-radius: var(--r, 16px);\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;\n    cursor: pointer;\n    transition: box-shadow var(--edge-dur, .2s) ease, transform var(--edge-dur, .2s) ease;\n  }\n  /* 渐变描边：伪元素垫在卡片底下，比卡片大一圈，悬停时淡入 */\n  .item::before {\n    content: \"\"; position: absolute; z-index: -1;\n    inset: calc(-1 * var(--bw, 1px));\n    border-radius: calc(var(--r, 16px) + var(--bw, 1px));\n    background: linear-gradient(135deg, var(--c1, #635bff), var(--c2, #3ec6ff));\n    opacity: 0;\n    transition: opacity var(--edge-dur, .2s) ease;\n  }\n  .item:hover::before { opacity: 1; }\n  .item:hover {\n    transform: translateY(calc(-1 * var(--lift, 4px)));\n    box-shadow: 0 12px 24px color-mix(in srgb, var(--c1, #635bff) var(--glow, 14%), transparent);\n  }\n  .item h4 { font-size: 18px; }\n  .item p { font-size: 13px; color: #8a8a85; }\n</style>\n</head>\n<body>\n  <div class=\"item\">\n    <h4>收款</h4>\n    <p>鼠标移上来，看边框颜色</p>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      color: \"#635bff\", color2: \"#3ec6ff\", dur: 0.2, width: 1,\n      radius: 16, glow: 14, lift: 4, cardBg: \"#faf9f6\", bg: \"#ffffff\"\n    };\n\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--c1\", state.color);\n      s.setProperty(\"--c2\", state.color2);\n      s.setProperty(\"--edge-dur\", state.dur + \"s\");\n      s.setProperty(\"--bw\", state.width + \"px\");\n      s.setProperty(\"--r\", state.radius + \"px\");\n      s.setProperty(\"--glow\", state.glow + \"%\");\n      s.setProperty(\"--lift\", state.lift + \"px\");\n      s.setProperty(\"--card-bg\", state.cardBg);\n      s.setProperty(\"--page-bg\", state.bg);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s203",
    标题: "首页动线",
    分类: "方案",
    风格: [
      "克制简约"
    ],
    场景: [
      "落地页"
    ],
    元素: [
      "版面"
    ],
    搭配: [
      "视觉重量"
    ],
    标签: [
      "设计原理",
      "转化",
      "落地页"
    ],
    来源: "Stripe 官网分析（2026-08-26）",
    效果演示: "assets/demos/首页动线.html",
    参数: [
      {
        键: "accent1",
        名: "焦点区渐变色 1",
        类型: "color",
        默认: "#7b5cff"
      },
      {
        键: "accent2",
        名: "焦点区渐变色 2",
        类型: "color",
        默认: "#ff5c8a"
      },
      {
        键: "accent3",
        名: "焦点区渐变色 3",
        类型: "color",
        默认: "#3ec6ff"
      },
      {
        键: "dark",
        名: "行动区主色",
        类型: "color",
        默认: "#1a1a1a"
      },
      {
        键: "bg",
        名: "页面背景色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "cardBg",
        名: "步骤卡片底色",
        类型: "color",
        默认: "#faf9f6"
      },
      {
        键: "flowBg",
        名: "动线灰块底色",
        类型: "color",
        默认: "#f2f0eb"
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
        键: "gap",
        名: "动线块间距（px）",
        类型: "slider",
        最小: 2,
        最大: 24,
        步长: 1,
        默认: 8
      }
    ],
    效果说明: "落地页从上到下四步：焦点（吸睛画面）→ 信息（一句话说清）→ 行动（一个按钮）→ 证明（数据让访客放心）。",
    用法: "方案页四步照做；演示页是四层示意图，直接换内容；不用调参。",
    提示词: "帮我做一个按\"首页动线\"组织的落地页（纯 HTML/CSS/JS）：\n\n目的：让访客从上到下，一步一步被带着走。\n\n四步：\n① 焦点：一上来先给最吸睛的画面\n② 信息：一句话说清你是干嘛的\n③ 行动：只给一个主按钮\n④ 证明：数据 / 特性让访客放心\n\n结构示例：\n<section>① 焦点（大图/彩光）</section>\n<section>② 价值主张</section>\n<section>③ 主按钮</section>\n<section>④ 特性卡</section>\n\n关键参数：\n- accent1 焦点区渐变色 1 / accent2 焦点区渐变色 2 / accent3 焦点区渐变色 3 / dark 行动区主色 / bg 页面背景色 / cardBg 步骤卡片底色 / flowBg 动线灰块底色 / radius 卡片圆角 / gap 动线块间距\n\n集成步骤：\n1. 复制 assets/demos/首页动线.html 的结构\n2. 换成你的落地页内容\n3. 自查：第一眼焦点 → 价值主张 → 主行动 → 证明",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>首页动线方案</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center;\n    background: var(--page, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif; padding: 20px;\n  }\n  .plan { width: min(560px, 94vw); }\n  .plan h1 { font-size: 26px; font-weight: 800; color: var(--ink, #1a1a1a); }\n  .aim { margin-top: 6px; font-size: 14px; color: #8a8a85; }\n  .steps { margin-top: 18px; display: flex; flex-direction: column; gap: 10px; }\n  .step {\n    display: flex; gap: 12px; align-items: flex-start;\n    background: var(--card, #faf9f6); border: 1px solid #ecebe7;\n    border-radius: var(--r, 12px); padding: 12px 14px;\n    font-size: 14px; line-height: 1.7; color: #555;\n  }\n  .step b { color: var(--ink, #1a1a1a); white-space: nowrap; }\n  .flow { margin-top: 20px; display: flex; flex-direction: column; gap: var(--gap, 8px); }\n  .flow div {\n    border-radius: var(--flow-r, 10px); padding: 14px; text-align: center;\n    font-size: 13.5px; font-weight: 600;\n  }\n  /* 焦点区：三色渐变，三个颜色独立可调 */\n  .f1 { background: linear-gradient(135deg, var(--a1, #7b5cff), var(--a2, #ff5c8a) 50%, var(--a3, #3ec6ff)); color: #fff; }\n  .f2, .f4 { background: var(--flow-bg, #f2f0eb); }\n  .f3 { background: var(--ink, #1a1a1a); color: #fff; }\n</style>\n</head>\n<body>\n  <div class=\"plan\">\n    <h1>首页动线</h1>\n    <p class=\"aim\">目的：让访客从上到下，一步一步被带着走</p>\n    <div class=\"steps\">\n      <div class=\"step\"><b>① 焦点</b> 一上来先给最吸睛的画面（大图/彩光/动画）</div>\n      <div class=\"step\"><b>② 信息</b> 一句话说清你是干嘛的，3 秒看懂</div>\n      <div class=\"step\"><b>③ 行动</b> 只给一个主按钮，让访客点</div>\n      <div class=\"step\"><b>④ 证明</b> 数据 / 特性 / 合作方，让访客放心</div>\n    </div>\n    <div class=\"flow\">\n      <div class=\"f1\">① 焦点（最吸睛）</div>\n      <div class=\"f2\">② 信息（价值主张）</div>\n      <div class=\"f3\">③ 行动（主按钮）</div>\n      <div class=\"f4\">④ 证明（数据 / 特性）</div>\n    </div>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      accent1: \"#7b5cff\", accent2: \"#ff5c8a\", accent3: \"#3ec6ff\", dark: \"#1a1a1a\",\n      bg: \"#ffffff\", cardBg: \"#faf9f6\", flowBg: \"#f2f0eb\", radius: 12, gap: 8\n    };\n\n    // 参数变了：全部走 CSS 变量，颜色/圆角/间距实时变\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--a1\", state.accent1);\n      s.setProperty(\"--a2\", state.accent2);\n      s.setProperty(\"--a3\", state.accent3);\n      s.setProperty(\"--ink\", state.dark);\n      s.setProperty(\"--page\", state.bg);\n      s.setProperty(\"--card\", state.cardBg);\n      s.setProperty(\"--flow-bg\", state.flowBg);\n      s.setProperty(\"--r\", state.radius + \"px\");\n      s.setProperty(\"--gap\", state.gap + \"px\");\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "s204",
    标题: "logo 墙",
    分类: "组件",
    子类: "卡片",
    风格: [
      "克制简约"
    ],
    场景: [
      "企业官网"
    ],
    元素: [
      "版面"
    ],
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
    效果说明: "一排品牌名字自动慢慢滚动，默认灰色不抢戏，鼠标移到哪个名字上哪个变彩色。放合作商、客户、平台等任何品牌都行。",
    用法: "详情页拖滑杆调滚动速度、开关切灰度/彩色；换成真实品牌名时注意授权；演示页默认 10 秒滚一圈，一眼能看到在动。",
    提示词: "帮我做一个品牌 logo 墙（纯 HTML/CSS/JS）：\n\n效果：一行品牌名统一灰度，鼠标移上去变彩色，横向自动无缝滚动。放合作商、客户、平台都可以。\n\n用法示例：\n<div class=\"track\">\n  <span class=\"brand\">ACME</span><span class=\"brand\">NOVA</span>...\n</div>\n// track 复制两份 + translateX(-50%) 实现无缝循环\n\n关键参数：\n- speed 滚动速度 / colorful 全部变彩色 / baseColor 常态文字色 / hoverColor 悬停高亮色 / hoverScale 悬停放大倍数 / gap 名字间距 / font 名字字号 / maskEdge 边缘渐隐 / bg 页面背景色\n\n集成步骤：\n1. 复制 assets/demos/合作商logo.html\n2. 换成真实品牌名（注意授权）\n3. 两端加渐变遮罩更高级",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>logo 墙演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column;\n    align-items: center; justify-content: center; gap: 24px;\n    background: var(--page, #fff); font-family: system-ui, \"Microsoft YaHei\", sans-serif;\n  }\n  .tip { font-size: 13px; color: #8a8a85; }\n  .brands {\n    width: min(860px, 92vw); overflow: hidden;\n    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);\n  }\n  /* 边缘渐隐开关：关掉后两端不虚化 */\n  .brands.flat { mask-image: none; }\n  .track { display: flex; gap: var(--gap, 64px); width: max-content; animation: scroll var(--scroll-s, 10s) linear infinite; }\n  .brand {\n    font-size: var(--fs, 24px); font-weight: 800; letter-spacing: 1px;\n    color: var(--base-c, #b9b4a9); cursor: default; white-space: nowrap;\n    transition: color .2s ease, transform .2s ease;\n  }\n  .brand:hover { color: var(--hover-c, #635bff); transform: scale(var(--hs, 1.15)); }\n  .track.colorful .brand { color: var(--hover-c, #635bff); }\n  @keyframes scroll { to { transform: translateX(-50%); } }\n</style>\n</head>\n<body>\n  <p class=\"tip\">这一排名字会一直慢慢滚动——鼠标移到哪个名字上，哪个就变彩色</p>\n  <div class=\"brands\" id=\"brands\">\n    <div class=\"track\" id=\"track\">\n      <span class=\"brand\">ACME</span><span class=\"brand\">NOVA</span><span class=\"brand\">云启</span>\n      <span class=\"brand\">墨白</span><span class=\"brand\">FABLE</span><span class=\"brand\">ORBITA</span>\n      <span class=\"brand\">清梧</span><span class=\"brand\">STELLAR</span>\n    </div>\n  </div>\n  <script>\n    // 默认参数（父页面详情页可调）\n    const state = {\n      speed: 10, colorful: false, baseColor: \"#b9b4a9\", hoverColor: \"#635bff\",\n      gap: 64, font: 24, hoverScale: 1.15, maskEdge: true, bg: \"#ffffff\"\n    };\n    const brands = document.getElementById(\"brands\");\n    const track = document.getElementById(\"track\");\n    track.innerHTML += track.innerHTML;\n\n    function apply() {\n      const s = document.documentElement.style;\n      s.setProperty(\"--scroll-s\", state.speed + \"s\");\n      s.setProperty(\"--base-c\", state.baseColor);\n      s.setProperty(\"--hover-c\", state.hoverColor);\n      s.setProperty(\"--gap\", state.gap + \"px\");\n      s.setProperty(\"--fs\", state.font + \"px\");\n      s.setProperty(\"--hs\", state.hoverScale);\n      s.setProperty(\"--page\", state.bg);\n      track.classList.toggle(\"colorful\", !!state.colorful);\n      brands.classList.toggle(\"flat\", !state.maskEdge);\n    }\n\n    // 接收父页面（index.html 详情页）传来的参数\n    window.addEventListener(\"message\", (e) => {\n      const d = e.data;\n      if (!d || d.type !== \"param\") return;\n      state[d.key] = d.value;\n      apply();\n    });\n    apply();\n  <\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "r001",
    标题: "文字遮罩",
    分类: "文字动画",
    子类: "标题",
    风格: [
      "水墨国风"
    ],
    场景: [
      "落地页",
      "作品集"
    ],
    元素: [
      "字体",
      "动效"
    ],
    搭配: [
      "粒子文字"
    ],
    标签: [
      "文字",
      "图片",
      "视差"
    ],
    来源: "ReactBits 官网 MaskedHeading 组件（MIT 许可；演示为原生 JS 重写版，未引 React/gsap）",
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
    效果说明: "文字内部显示一张图片，鼠标移动时图片跟着轻轻滑动（视差），不动时缓慢漂移；入场时文字从下方升起、或从左往右擦除显现、或淡入。",
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
    风格: [
      "力量感"
    ],
    场景: [
      "全站通用"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "按钮按下去先缩到比正常还小（压过头），松手弹回来时先冲过原尺寸再落定。按一下就知道这东西「有分量」，不是纸片。",
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
    风格: [
      "轻盈灵动"
    ],
    场景: [
      "表单"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "开关切换时，圆形滑钮起步先横向拉长成椭圆，落位时再压回原宽。滑钮像有质量的果冻，不是贴上去的贴纸。",
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
    风格: [
      "手机App感"
    ],
    场景: [
      "手机端网页"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "点按钮时，水波从你手指按下的位置散开，而不是从按钮中心。反馈跟着手指走，点哪儿哪儿有反应，操作感直接。",
    用法: "详情页拖滑杆调波纹时长、波纹深浅；换颜色改 JS 里的 rgba 值。",
    提示词: "帮我做一个\"水波\"按钮反馈（纯 HTML/CSS/JS）：\n效果：点击按钮时水波从手指落点散开，反馈跟随手指而非控件中心。\n用法示例：\n<button class=\"btn\">点我</button>\n// click 时取 e.clientX/Y 相对按钮的位置，在那里生成 .ripple 圆\n关键参数：\n- dur 水波时长 / opacity 水波浓度 / rippleColor 水波颜色 / spread 水波扩散倍数 / bg 按钮底色 / color 文字颜色 / border 边框颜色 / radius 圆角 / fontSize 字号\n集成步骤：\n1. 复制 assets/demos/水波按钮.html 的 JS（ripple 生成逻辑）\n2. 按钮要设 overflow:hidden，ripple 是绝对定位的圆\n3. 深色按钮波纹用浅色、浅色按钮用深色",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>水波按钮演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    position: relative; overflow: hidden; cursor: pointer; user-select: none; outline: none;\n    background: var(--bg, #fff); color: var(--tc, #1a1a1a); border: 2px solid var(--bd, #1a1a1a);\n    font-size: var(--fs, 17px); font-weight: 700; letter-spacing: 3px;\n    padding: 18px 56px; border-radius: var(--r, 14px);\n    transition: background .25s ease, color .25s ease;\n  }\n  .btn:active { filter: brightness(.96); }\n  /* 水波：从点下去的位置散开，反馈跟随手指而不是控件中心 */\n  .ripple {\n    position: absolute; border-radius: 50%;\n    background: var(--ripple, #1a1a1a);\n    transform: scale(0); pointer-events: none;\n  }\n  .ripple.go { animation: rippleGo var(--dur, .55s) ease-out forwards; }\n  @keyframes rippleGo { to { transform: scale(1); opacity: 0; } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">点我任意位置</button>\n<p class=\"hint\">水波从你点下去的位置散开，不是从按钮中心</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.55, opacity: 0.18, rippleColor: \"#1a1a1a\", spread: 1,\n    bg: \"#ffffff\", color: \"#1a1a1a\", border: \"#1a1a1a\", radius: 14, fontSize: 17\n  };\n  const btn = document.getElementById(\"btn\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--ripple\", state.rippleColor);\n    s.setProperty(\"--bg\", state.bg);\n    s.setProperty(\"--tc\", state.color);\n    s.setProperty(\"--bd\", state.border);\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n  }\n\n  btn.addEventListener(\"click\", (e) => {\n    const rect = btn.getBoundingClientRect();\n    // 水波直径 = 按钮较长边 × 扩散倍数\n    const r = Math.max(rect.width, rect.height) * state.spread;\n    const rip = document.createElement(\"span\");\n    rip.className = \"ripple\";\n    rip.style.width = rip.style.height = r + \"px\";\n    rip.style.opacity = state.opacity; // 浓度直接落在水波自身上\n    // 水波中心 = 手指落点\n    rip.style.left = (e.clientX - rect.left - r / 2) + \"px\";\n    rip.style.top = (e.clientY - rect.top - r / 2) + \"px\";\n    btn.appendChild(rip);\n    rip.classList.add(\"go\");\n    rip.addEventListener(\"animationend\", () => rip.remove());\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v104",
    标题: "点击爆散",
    分类: "动画",
    子类: "按钮",
    风格: [
      "游戏风"
    ],
    场景: [
      "工具类网站",
      "游戏风页面"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "关键操作（提交、收藏、完成）点击时，从按钮炸出一小撮粒子向四周飞散再消失。动作越大反馈越强，操作分量和结果匹配。",
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
    风格: [
      "轻盈灵动"
    ],
    场景: [
      "表单",
      "任务清单"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "勾选成功时，对勾不是「啪」一下出现，而是从勾尖开始一笔一笔画出来。把成功的过程演给你看，确认感更强。",
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
    风格: [
      "手机App感"
    ],
    场景: [
      "表单",
      "数据看板"
    ],
    元素: [
      "动效",
      "颜色"
    ],
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
    效果说明: "拖动滑块时，轨道填充、滑钮、数值三样东西用同一个节奏变化：轨道跟着滑钮走，数值滚动后缓停。整体是「一块液体」而不是三个零件。",
    用法: "详情页拖滑杆调同频时长、点色块换主色；数值弹出的动画在 .val.pop 里改。",
    提示词: "帮我做一个\"液态滑块\"（纯 HTML/CSS/JS）：\n效果：拖动时轨道填充、滑钮、数值动画同频变化，数值滚动后缓慢停下，保持视觉统一。\n用法示例：\n<input type=\"range\" id=\"rng\" min=\"0\" max=\"100\">\n// 轨道用 linear-gradient 按 --pct 填充，数值切换时加一个轻弹出动画\n关键参数：\n- dur 数值动画时长 / color 填充颜色 / track 轨道底色 / knob 滑钮颜色 / width 轨道宽度 / height 轨道粗细 / thumb 滑钮大小 / fontSize 数值字号 / valColor 数值颜色\n集成步骤：\n1. 复制 assets/demos/液态滑块.html 的样式和 JS\n2. 改 min/max 和主色\n3. 数值要等宽字体（tabular-nums）才不抖",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>液态滑块演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .row { display: flex; align-items: center; gap: 18px; }\n  .val {\n    min-width: 64px; text-align: right; font-weight: 800; font-variant-numeric: tabular-nums;\n    font-size: var(--vfs, 34px); color: var(--vc, #1a1a1a);\n  }\n  input[type=range] {\n    width: var(--w, 260px); height: var(--h, 8px); border-radius: 999px; appearance: none; outline: none; cursor: pointer;\n    background: linear-gradient(to right, var(--fill, #1a1a1a) var(--pct, 50%), var(--track, #e3e3e3) var(--pct, 50%));\n  }\n  input[type=range]::-webkit-slider-thumb {\n    appearance: none; width: var(--thumb, 26px); height: var(--thumb, 26px); border-radius: 50%;\n    background: var(--knob, #fff); border: 3px solid var(--fill, #1a1a1a);\n    box-shadow: 0 2px 6px rgba(0,0,0,.18); transition: transform var(--dur, .2s) ease;\n  }\n  input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.15); }\n  /* 数值切换：从旧值滚动到新值，不突然跳变 */\n  .val.pop { animation: valPop var(--dur, .2s) ease; }\n  @keyframes valPop {\n    0% { transform: translateY(0); opacity: 1; }\n    40% { transform: translateY(8px); opacity: 0; }\n    60% { transform: translateY(-8px); opacity: 0; }\n    100% { transform: translateY(0); opacity: 1; }\n  }\n</style>\n</head>\n<body>\n<div class=\"row\">\n  <input type=\"range\" id=\"rng\" min=\"0\" max=\"100\" value=\"50\">\n  <div class=\"val\" id=\"val\">50</div>\n</div>\n<p class=\"hint\">拖动：轨道填充、滑钮、数值动画同频，数值滚动后缓停不突兀</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.2, color: \"#1a1a1a\", track: \"#e3e3e3\", knob: \"#ffffff\",\n    width: 260, height: 8, thumb: 26, fontSize: 34, valColor: \"#1a1a1a\"\n  };\n  const rng = document.getElementById(\"rng\");\n  const val = document.getElementById(\"val\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--fill\", state.color);\n    s.setProperty(\"--track\", state.track);\n    s.setProperty(\"--knob\", state.knob);\n    s.setProperty(\"--w\", state.width + \"px\");\n    s.setProperty(\"--h\", state.height + \"px\");\n    s.setProperty(\"--thumb\", state.thumb + \"px\");\n    s.setProperty(\"--vfs\", state.fontSize + \"px\");\n    s.setProperty(\"--vc\", state.valColor);\n  }\n\n  rng.addEventListener(\"input\", () => {\n    rng.style.setProperty(\"--pct\", rng.value + \"%\");\n    val.textContent = rng.value;\n    val.classList.remove(\"pop\");\n    void val.offsetWidth; // 重启动画\n    val.classList.add(\"pop\");\n  });\n  rng.style.setProperty(\"--pct\", \"50%\");\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v107",
    标题: "数字滚动",
    分类: "动画",
    子类: "数据展示",
    风格: [
      "科技感"
    ],
    场景: [
      "数据看板"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "数字从 0 滚到目标值时，开头冲得快、结尾像表针一样慢慢停稳。避免突然刹停的生硬感，数据跳出来也有仪式感。",
    用法: "详情页拖滑杆调目标数字、滚动时长；缓动曲线在 JS 的 easeOutQuint 里换（easeOutCubic 更线性、easeOutExpo 更激进）。",
    提示词: "帮我做一个\"数字滚动\"（纯 HTML/CSS/JS）：\n效果：数字从 0 滚动到目标值，用 easeOutQuint 缓动——开头快、结尾慢慢停稳，不突然刹停。\n用法示例：\n<div class=\"num\">0</div>\n// requestAnimationFrame + easeOutQuint(t) 算中间值，写入 textContent\n关键参数：\n- target 目标数字 / dur 滚动时长 / easing 停法 / prefix 数字前缀 / fontSize 数字字号 / numColor 数字颜色 / btnBg 按钮底色 / btnColor 按钮文字色\n集成步骤：\n1. 复制 assets/demos/数字滚动.html 的 JS\n2. 用在统计数字、数据面板、评分\n3. 数字要等宽字体，避免滚动时宽度抖动",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>数字滚动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .num { font-size: var(--fs, 56px); font-weight: 800; font-variant-numeric: tabular-nums; min-width: 200px; text-align: center; color: var(--nc, #1a1a1a); }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--bb, #1a1a1a); color: var(--bc, #fff);\n    font-size: 15px; font-weight: 700; letter-spacing: 2px;\n    padding: 12px 32px; border-radius: 10px;\n  }\n</style>\n</head>\n<body>\n<div class=\"num\" id=\"num\">0</div>\n<button class=\"btn\" id=\"btn\">重新滚动</button>\n<p class=\"hint\">数字从 0 滚到目标，最后缓慢停下——不是突然刹停</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    target: 8848, dur: 1.6, easing: \"先快后慢\", prefix: \"\",\n    fontSize: 56, numColor: \"#1a1a1a\", btnBg: \"#1a1a1a\", btnColor: \"#ffffff\"\n  };\n  const num = document.getElementById(\"num\");\n  const root = document.documentElement;\n  let raf = 0;\n\n  // 三种停法：先快后慢 / 匀速 / 回弹过头\n  const EASE = {\n    \"先快后慢\": t => 1 - Math.pow(1 - t, 5),\n    \"匀速\": t => t,\n    \"回弹过头\": t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }\n  };\n\n  function roll() {\n    cancelAnimationFrame(raf);\n    const start = performance.now();\n    const from = 0, to = state.target, dur = state.dur * 1000;\n    const ease = EASE[state.easing] || EASE[\"先快后慢\"];\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      num.textContent = state.prefix + Math.round(from + (to - from) * ease(t));\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n    s.setProperty(\"--nc\", state.numColor);\n    s.setProperty(\"--bb\", state.btnBg);\n    s.setProperty(\"--bc\", state.btnColor);\n    roll(); // 数字相关参数变了就重滚一遍，立刻看到效果\n  }\n\n  document.getElementById(\"btn\").addEventListener(\"click\", roll);\n  roll();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v108",
    标题: "骨架落位",
    分类: "组件",
    子类: "加载",
    风格: [
      "克制简约"
    ],
    场景: [
      "内容社区",
      "工具类网站"
    ],
    元素: [
      "版面"
    ],
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
    效果说明: "内容加载前显示骨架条，骨架条的高度和真实内容一样高，所以加载完内容原位出现、页面不跳动。防止用户眼睛追着内容跑。",
    用法: "详情页拖滑杆调流光速度、加载等待；骨架条数量在 .skeleton 里增删，真实内容高度要和骨架一致。",
    提示词: "帮我做一个\"骨架屏\"加载（纯 HTML/CSS/JS）：\n效果：加载时显示骨架条，骨架高度与真实内容一致，加载完成后内容原位落位不跳动。\n用法示例：\n<div class=\"card\">\n  <div class=\"skeleton\">…骨架条…</div>\n  <div class=\"content\">…真实内容…</div>\n</div>\n// .loaded 时隐藏骨架、显示内容；骨架条高度对齐真实内容\n关键参数：\n- dur 流光扫过周期 / wait 加载等待时长 / base 骨架底色 / highlight 流光高亮色 / cardBg 卡片底色 / cardWidth 卡片宽度 / radius 卡片圆角 / btnBg 按钮底色 / btnColor 按钮文字色\n集成步骤：\n1. 复制 assets/demos/骨架落位.html 的结构和流光动画\n2. 骨架条高度和真实内容行高对齐（防 CLS）\n3. 深色主题把流光颜色调暗",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>骨架落位演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .card {\n    width: var(--cw, 300px); border: 1px solid #eee; border-radius: var(--r, 14px); padding: 18px;\n    background: var(--cb, #fff); box-shadow: 0 6px 16px rgba(0,0,0,.05);\n    transition: width .2s ease;\n  }\n  /* 骨架条：高度与真实内容一致，所以加载完不会跳动 */\n  .skeleton .bar {\n    height: 16px; border-radius: 8px; margin-bottom: 10px;\n    background: linear-gradient(90deg, var(--base, #f0f0f0) 25%, var(--hi, #e4e4e4) 50%, var(--base, #f0f0f0) 75%);\n    background-size: 200% 100%; animation: shimmer var(--dur, 1.1s) infinite linear;\n  }\n  @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }\n  .skeleton .title-bar { width: 55%; height: 20px; margin-bottom: 14px; }\n  .skeleton .line-s { width: 40%; }\n  /* 真实内容：骨架占位时不可见，加载完成后原位出现（不跳动） */\n  .content { display: none; }\n  .card.loaded .content { display: block; animation: fadeIn .25s ease; }\n  .card.loaded .skeleton { display: none; }\n  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n  .btn {\n    margin-top: 8px; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--bb, #1a1a1a); color: var(--bc, #fff); font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"card\" id=\"card\">\n  <div class=\"skeleton\">\n    <div class=\"bar title-bar\"></div>\n    <div class=\"bar\"></div>\n    <div class=\"bar\"></div>\n    <div class=\"bar line-s\"></div>\n  </div>\n  <div class=\"content\">\n    <h3 style=\"font-size:17px;margin-bottom:8px\">加载完成 ✓</h3>\n    <p style=\"font-size:13px;color:#666\">骨架条高度和这一行内容一样高，所以内容出现时页面纹丝不动。</p>\n  </div>\n</div>\n<button class=\"btn\" id=\"btn\">重新加载</button>\n<p class=\"hint\">加载中显示骨架 → 内容原位落位，不跳动</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 1.1, wait: 1.4, base: \"#f0f0f0\", highlight: \"#e4e4e4\",\n    cardBg: \"#ffffff\", cardWidth: 300, radius: 14, btnBg: \"#1a1a1a\", btnColor: \"#ffffff\"\n  };\n  const card = document.getElementById(\"card\");\n  const root = document.documentElement;\n  let timer = 0;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--base\", state.base);\n    s.setProperty(\"--hi\", state.highlight);\n    s.setProperty(\"--cb\", state.cardBg);\n    s.setProperty(\"--cw\", state.cardWidth + \"px\");\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--bb\", state.btnBg);\n    s.setProperty(\"--bc\", state.btnColor);\n    // 尺寸变了就重新演一遍，保证骨架/内容落位关系可见\n    load();\n  }\n\n  function load() {\n    clearTimeout(timer);\n    card.classList.remove(\"loaded\");\n    timer = setTimeout(() => card.classList.add(\"loaded\"), state.wait * 1000);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", load);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v109",
    标题: "卡片翻面",
    分类: "动画",
    子类: "卡片",
    风格: [
      "轻盈灵动"
    ],
    场景: [
      "产品展示",
      "游戏风页面"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "卡片沿中线 3D 翻转，正面翻走、背面翻来。正反两面都隐藏自己的背面（backface-visibility），翻到一半时不会看到对面那张穿帮。",
    用法: "详情页拖滑杆调翻转时长；正反面内容分别写在 .front / .back 里；想翻转角度不是 180° 就改 rotateY。",
    提示词: "帮我做一个\"卡片翻面\"（纯 HTML/CSS/JS）：\n效果：卡片沿中线 3D 翻转，正反两面都设 backface-visibility:hidden，翻面互不穿帮。\n用法示例：\n<div class=\"card3d\"><div class=\"face front\">正面</div><div class=\"face back\">背面</div></div>\n// .card3d 设 transform-style:preserve-3d，.flip 时 rotateY(180deg)\n关键参数：\n- dur 翻面时长 / size 卡片宽度 / radius 圆角 / dir 翻转方向 / frontBg 正面底色 / frontColor 正面文字色 / backBg 背面底色 / backColor 背面文字/边框色\n集成步骤：\n1. 复制 assets/demos/卡片翻面.html 的 CSS（3D 三件套：perspective / preserve-3d / backface-visibility）\n2. 正反面内容分别放两个 .face\n3. 翻转角度要别的就改 rotateY",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片翻面演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    perspective: 1200px;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .card3d {\n    width: var(--w, 220px); height: var(--h, 300px); cursor: pointer; position: relative;\n    transform-style: preserve-3d;\n    transition: transform var(--dur, .6s) cubic-bezier(.34,1.3,.5,1);\n  }\n  /* 翻转轴由参数决定：rotateY（左右）或 rotateX（上下） */\n  .card3d.flip { transform: var(--rot, rotateY(180deg)); }\n  /* 关键：正反两面都隐藏自己的背面，翻面时不会把另一面照穿 */\n  .face {\n    position: absolute; inset: 0; border-radius: var(--r, 16px);\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;\n    backface-visibility: hidden; -webkit-backface-visibility: hidden;\n    font-weight: 700;\n  }\n  .front { background: var(--fb, #1a1a1a); color: var(--fc, #fff); }\n  .back { background: var(--bb, #fff); border: 2px solid var(--bc, #1a1a1a); color: var(--bc, #1a1a1a); transform: var(--rot, rotateY(180deg)); }\n  .sub { font-size: 12px; font-weight: 400; opacity: .7; }\n</style>\n</head>\n<body>\n<div class=\"card3d\" id=\"card\" tabindex=\"0\">\n  <div class=\"face front\">正面<span class=\"sub\">点我翻面</span></div>\n  <div class=\"face back\">背面<span class=\"sub\">再点翻回去</span></div>\n</div>\n<p class=\"hint\">点卡片：整张沿中线翻转，正反两面互不穿帮</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.6, size: 220, radius: 16, dir: \"左右翻\",\n    frontBg: \"#1a1a1a\", frontColor: \"#ffffff\", backBg: \"#ffffff\", backColor: \"#1a1a1a\"\n  };\n  const card = document.getElementById(\"card\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--w\", state.size + \"px\");\n    s.setProperty(\"--h\", Math.round(state.size * 300 / 220) + \"px\"); // 保持 220:300 比例\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--rot\", state.dir === \"上下翻\" ? \"rotateX(180deg)\" : \"rotateY(180deg)\");\n    s.setProperty(\"--fb\", state.frontBg);\n    s.setProperty(\"--fc\", state.frontColor);\n    s.setProperty(\"--bb\", state.backBg);\n    s.setProperty(\"--bc\", state.backColor);\n  }\n  function flip() { card.classList.toggle(\"flip\"); }\n  card.addEventListener(\"click\", flip);\n  card.addEventListener(\"keydown\", (e) => {\n    if (e.key === \" \" || e.key === \"Enter\") { e.preventDefault(); flip(); }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v110",
    标题: "汉堡变叉",
    分类: "动画",
    子类: "导航",
    风格: [
      "克制简约"
    ],
    场景: [
      "手机端网页",
      "导航菜单"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "菜单按钮在汉堡（三横线）和关闭（叉）之间切换时，用同一个元件原地变形：上下两条线旋转合拢、中间线缩没。用户不会丢掉操作位置。",
    用法: "详情页拖滑杆调变形时长；线的粗细、长度、颜色在 CSS 的 .burger span 里改；三条线的位移量要按线条间距算好。",
    提示词: "帮我做一个\"汉堡变叉\"菜单图标（纯 HTML/CSS/JS）：\n效果：用单个元件（三条线）完成汉堡↔叉的切换，上下线旋转合拢、中线缩没，避免用户丢失操作位置。\n用法示例：\n<div class=\"burger\"><span></span><span></span><span></span></div>\n// .open 时：第1条 translateY+rotate(45deg)，第2条 scaleX(0)，第3条 translateY-rotate(-45deg)\n关键参数：\n- dur 变形时长 / size 按钮大小 / thick 线条粗细 / gap 线条间距 / radius 按钮圆角 / bgColor 按钮底色 / lineColor 线条颜色 / pressColor 按下时底色\n集成步骤：\n1. 复制 assets/demos/汉堡变叉.html 的 CSS\n2. 三条线的位移量 = 线间距，按你的尺寸重算\n3. 配 aria-label 和键盘事件保证可访问性",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>汉堡变叉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .burger {\n    width: var(--size, 56px); height: var(--size, 56px); border-radius: var(--r, 12px);\n    cursor: pointer; user-select: none;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--gap, 7px);\n    background: var(--bg, #1a1a1a); transition: background .2s ease;\n  }\n  .burger:active { background: var(--pr, #333); }\n  /* 单个元件（三条线）完成汉堡↔叉的切换，操作位置不丢；--off = 间距+线粗 */\n  .burger span {\n    width: var(--line, 28px); height: var(--th, 3px); border-radius: 3px; background: var(--lc, #fff);\n    transition: transform var(--dur, .32s) ease, opacity var(--dur, .32s) ease;\n  }\n  .burger.open span:nth-child(1) { transform: translateY(var(--off, 10px)) rotate(45deg); }\n  .burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }\n  .burger.open span:nth-child(3) { transform: translateY(calc(-1 * var(--off, 10px))) rotate(-45deg); }\n</style>\n</head>\n<body>\n<div class=\"burger\" id=\"bg\" role=\"button\" aria-label=\"菜单\" tabindex=\"0\">\n  <span></span><span></span><span></span>\n</div>\n<p class=\"hint\">点一下：汉堡三条线原地变成叉，没有新元素顶替</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.32, size: 56, thick: 3, gap: 7, radius: 12,\n    bgColor: \"#1a1a1a\", lineColor: \"#ffffff\", pressColor: \"#333333\"\n  };\n  const bg = document.getElementById(\"bg\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--size\", state.size + \"px\");\n    s.setProperty(\"--th\", state.thick + \"px\");\n    s.setProperty(\"--gap\", state.gap + \"px\");\n    // 汇合距离 = 间距 + 线粗，变叉时上下两条线正好在中线相交\n    s.setProperty(\"--off\", (state.gap + state.thick) + \"px\");\n    s.setProperty(\"--line\", Math.round(state.size / 2) + \"px\"); // 线长随按钮尺寸缩放\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--bg\", state.bgColor);\n    s.setProperty(\"--lc\", state.lineColor);\n    s.setProperty(\"--pr\", state.pressColor);\n  }\n  function toggle() { bg.classList.toggle(\"open\"); }\n  bg.addEventListener(\"click\", toggle);\n  bg.addEventListener(\"keydown\", (e) => {\n    if (e.key === \" \" || e.key === \"Enter\") { e.preventDefault(); toggle(); }\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v111",
    标题: "卡片抽走",
    分类: "动画",
    子类: "卡片",
    风格: [
      "游戏风"
    ],
    场景: [
      "游戏风页面"
    ],
    元素: [
      "动效",
      "版面"
    ],
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
    效果说明: "卡片堆叠时，点最上面的卡它向旁边抽走让位，露出下面压着的卡。堆叠关系看得懂，抽走的过程本身就是操作反馈。",
    用法: "详情页拖滑杆调抽走时长；卡片张数和底色在 HTML 里改；抽走的位移/旋转角度在 .gone 里调。",
    提示词: "帮我做一个\"卡片抽走\"堆叠效果（纯 HTML/CSS/JS）：\n效果：点最上面的卡片，它向旁边抽走（位移+旋转+淡出），露出下面压着的卡片，强化堆叠逻辑。\n用法示例：\n<div class=\"deck\"><div class=\"pcard\">…</div>×N</div>\n// 点顶层 .pcard 加 .gone（translate+rotate+opacity 0），其余卡自动浮正\n关键参数：\n- dur 抽走时长 / offset 堆叠偏移 / flyX 抽走横移 / flyY 抽走纵移 / rotate 抽走旋转 / shrink 抽走缩小到 / radius 卡片圆角 / cardWidth 卡片宽度 / topBg 顶卡底色 / topColor 顶卡文字色\n集成步骤：\n1. 复制 assets/demos/卡片抽走.html 的结构和动画\n2. 换卡片数量、内容、底色\n3. 想做\"抽卡\"玩法就换成随机角度飞走",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>卡片抽走演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .deck { position: relative; }\n  .pcard {\n    position: absolute; inset: 0; border-radius: var(--r, 16px); cursor: pointer; user-select: none;\n    display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px;\n    transition: transform var(--dur, .4s) cubic-bezier(.4,0,.2,1), opacity var(--dur, .4s) ease;\n  }\n  .pcard.top { background: var(--tbg, #1a1a1a); color: var(--tc, #fff); }\n  .pcard.under1 { background: #e8e8e8; color: #1a1a1a; }\n  .pcard.under2 { background: #f5f5f5; color: #1a1a1a; }\n  /* 抽走：上面的卡片移开 + 旋转 + 淡出，露出下面压着的卡 */\n  .pcard.gone {\n    transform: translate(var(--fx, 220px), var(--fy, -60px)) rotate(var(--rot, 18deg)) scale(var(--sh, .85));\n    opacity: 0; pointer-events: none;\n  }\n</style>\n</head>\n<body>\n<div class=\"deck\" id=\"deck\">\n  <div class=\"pcard top\">第 1 张</div>\n  <div class=\"pcard under1\">第 2 张</div>\n  <div class=\"pcard under2\">第 3 张</div>\n</div>\n<p class=\"hint\">点最上面的卡：它抽走让位，露出下面压着的卡，堆叠逻辑看得懂</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.4, offset: 8, flyX: 220, flyY: -60, rotate: 18, shrink: 0.85,\n    radius: 16, cardWidth: 240, topBg: \"#1a1a1a\", topColor: \"#ffffff\"\n  };\n  const deck = document.getElementById(\"deck\");\n  const root = document.documentElement;\n  const cards = [...deck.querySelectorAll(\".pcard\")];\n\n  // 把剩下的卡按堆叠偏移重新压好\n  function restack() {\n    cards.forEach((c, i) => {\n      if (c.classList.contains(\"gone\")) return;\n      c.style.transform = i === 0 ? \"\" :\n        \"translate(\" + i * state.offset + \"px,\" + i * state.offset + \"px) scale(\" + (1 - i * 0.04) + \")\";\n    });\n  }\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--fx\", state.flyX + \"px\");\n    s.setProperty(\"--fy\", state.flyY + \"px\");\n    s.setProperty(\"--rot\", state.rotate + \"deg\");\n    s.setProperty(\"--sh\", state.shrink);\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--tbg\", state.topBg);\n    s.setProperty(\"--tc\", state.topColor);\n    deck.style.width = state.cardWidth + \"px\";\n    deck.style.height = Math.round(state.cardWidth * 320 / 240) + \"px\";\n    restack();\n  }\n\n  deck.addEventListener(\"click\", () => {\n    const top = deck.querySelector(\".pcard:not(.gone)\");\n    if (!top) return;\n    top.classList.add(\"gone\");\n    // 抽出后剩下的卡自动浮正，重新压好\n    restack();\n    setTimeout(() => {\n      if (!deck.querySelector(\".pcard:not(.gone)\")) {\n        // 抽完了：把牌堆还原\n        cards.forEach(c => c.classList.remove(\"gone\"));\n        restack();\n      }\n    }, 1600);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v112",
    标题: "底部抽屉",
    分类: "组件",
    子类: "弹窗",
    风格: [
      "手机App感"
    ],
    场景: [
      "手机端网页",
      "弹窗"
    ],
    元素: [
      "版面",
      "动效"
    ],
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
    效果说明: "底部面板滑出时，在快到位的位置顿一下再完全展开（关键帧停顿）。状态变化有节奏，用户更容易看清「它停在哪了」。",
    用法: "详情页拖滑杆调展开时长；停顿的位置和幅度在 drawerIn 的 55% / 70% 两个关键帧里改；遮罩深浅在 .mask.show 里调。",
    提示词: "帮我做一个\"底部抽屉\"（纯 HTML/CSS/JS）：\n效果：底部面板滑出时在快到位处设置关键帧停顿（55% 停一下、70% 再落定），让状态更易被识别。\n用法示例：\n<div class=\"drawer in\">…内容…</div>\n// drawerIn keyframes：55% 停、70% 微回、100% 落定；遮罩同步淡入\n关键参数：\n- dur 展开时长 / outDur 收起时长 / height 抽屉高度 / radius 顶部圆角 / maskColor 遮罩颜色 / maskOpacity 遮罩浓度 / drawerBg 抽屉底色 / titleColor 标题颜色 / handle 显示顶部手柄\n集成步骤：\n1. 复制 assets/demos/底部抽屉.html 的 keyframes 和遮罩逻辑\n2. 换抽屉高度和内容\n3. 想更强调停顿就把 55% 那帧拉长",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>底部抽屉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 遮罩：颜色 + 浓度分两个变量，透明度直接参与过渡 */\n  .mask {\n    position: fixed; inset: 0; background: var(--mc, #000000); opacity: 0; pointer-events: none;\n    transition: opacity var(--dur, .3s) ease;\n  }\n  .mask.show { opacity: var(--mo, .35); pointer-events: auto; }\n  .drawer {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 240px);\n    border-radius: var(--r, 20px) var(--r, 20px) 0 0;\n    background: var(--db, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,.12);\n    transform: translateY(105%);\n  }\n  /* 关键帧停顿：滑到露出大半时顿一下，再完全展开——状态更容易被识别 */\n  .drawer.in { animation: drawerIn var(--dur, .38s) ease-out forwards; }\n  .drawer.out { animation: drawerOut var(--od, .26s) ease-in forwards; }\n  @keyframes drawerIn {\n    0%   { transform: translateY(105%); }\n    55%  { transform: translateY(12%); }\n    70%  { transform: translateY(6%); }\n    100% { transform: translateY(0); }\n  }\n  @keyframes drawerOut { to { transform: translateY(105%); } }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: #ddd; margin: 10px auto 0; }\n  .title { text-align: center; font-weight: 800; font-size: 17px; margin-top: 12px; color: var(--tc, #1a1a1a); }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开抽屉</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"drawer\" id=\"drawer\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"title\">底部抽屉</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">展开到一半顿一下，再完全落位</p>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38, outDur: 0.26, height: 240, radius: 20,\n    maskColor: \"#000000\", maskOpacity: 0.35, drawerBg: \"#ffffff\", titleColor: \"#1a1a1a\", handle: true\n  };\n  const mask = document.getElementById(\"mask\");\n  const drawer = document.getElementById(\"drawer\");\n  const root = document.documentElement;\n\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--dur\", state.dur + \"s\");\n    s.setProperty(\"--od\", state.outDur + \"s\");\n    s.setProperty(\"--h\", state.height + \"px\");\n    s.setProperty(\"--r\", state.radius + \"px\");\n    s.setProperty(\"--mc\", state.maskColor);\n    s.setProperty(\"--mo\", state.maskOpacity);\n    s.setProperty(\"--db\", state.drawerBg);\n    s.setProperty(\"--tc\", state.titleColor);\n    document.getElementById(\"handle\").style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() {\n    drawer.classList.remove(\"out\");\n    drawer.classList.add(\"in\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    drawer.classList.remove(\"in\");\n    drawer.classList.add(\"out\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v113",
    标题: "半屏停留",
    分类: "组件",
    子类: "弹窗",
    风格: [
      "手机App感"
    ],
    场景: [
      "手机端网页",
      "表单"
    ],
    元素: [
      "版面"
    ],
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
    效果说明: "弹层展开后停在半屏位置，底部页面始终露出可见区域。用户知道弹层下面还有内容、自己没离开当前页面，层级感强。",
    用法: "详情页拖滑杆调停留高度、遮罩深浅；停留高度按内容量定——内容少就 40%、表单多就 60%。",
    提示词: "帮我做一个\"半屏停留\"弹层（纯 HTML/CSS/JS）：\n效果：弹层展开后停留在半屏高度，重点保留底层页面可见区域，强化层级感知。\n用法示例：\n<div class=\"sheet\"><div class=\"handle\"></div>…内容…</div>\n// .sheet 固定 bottom:0、height:50vh，加淡遮罩但不盖满\n关键参数：\n- height 弹层高度 / mask 遮罩浓度 / dur 弹出时长 / radius 顶部圆角 / shadow 投影浓度 / handle 显示顶部手柄 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色 / titleColor 标题文字颜色\n集成步骤：\n1. 复制 assets/demos/半屏停留.html 的结构\n2. 按内容量调停留高度\n3. 配拖拽关闭（v117）就是完整的手势弹层",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>半屏停留演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 底层页面：始终保留可见区域，半屏弹层不遮完 */\n  .bg { position: fixed; inset: 0; padding: 60px 40px; }\n  .bg-card {\n    background: #f5f5f5; border-radius: 16px; padding: 24px;\n    max-width: 320px; margin: 0 auto;\n  }\n  .bg-card h3 { font-size: 16px; margin-bottom: 10px; }\n  .bg-card p { font-size: 13px; color: #666; line-height: 1.7; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.25)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--h, 50vh); border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%); transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; color: var(--titlec, #1a1a1a); }\n</style>\n</head>\n<body>\n<div class=\"bg\">\n  <div class=\"bg-card\">\n    <h3>底层页面</h3>\n    <p>弹层只盖住一半，底下的内容始终露着——用户知道自己在哪层，层级感不丢。</p>\n  </div>\n</div>\n<button class=\"btn\" id=\"open\">打开半屏弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">半屏停留</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">重点保留底层可见区域</p>\n</div>\n<p class=\"hint\">弹层停在半屏，底层页面仍然可见</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    height: 50,        // 弹层高度（vh）\n    mask: 0.25,        // 遮罩浓度\n    dur: 0.35,         // 弹出时长（秒）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    handle: true,      // 是否显示顶部手柄\n    maskColor: \"#000000\", // 遮罩颜色\n    sheetBg: \"#ffffff\",   // 弹层底色\n    handleColor: \"#dddddd\", // 手柄颜色\n    titleColor: \"#1a1a1a\"  // 标题文字颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba，用于遮罩色 + 浓度合成\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--h\", state.height + \"vh\");\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask)); // 颜色+浓度都生效\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--titlec\", state.titleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v114",
    标题: "全屏展开",
    分类: "组件",
    子类: "弹窗",
    风格: [
      "手机App感"
    ],
    场景: [
      "手机端网页",
      "详情页"
    ],
    元素: [
      "版面"
    ],
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
        步长: 0.05,
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
    效果说明: "弹层从半屏展开到全屏时，圆角同步归零、抓手位置同步调整。看起来是同一个面板长高了，而不是换了两个控件，视觉统一。",
    用法: "详情页拖滑杆调过渡时长、半屏圆角；全屏时想保留一点圆角就改 .sheet.full 的 border-radius。",
    提示词: "帮我做一个\"全屏展开\"弹层（纯 HTML/CSS/JS）：\n效果：弹层从半屏展开到全屏时，圆角与抓手位置同步调整，维持面板视觉统一性。\n用法示例：\n<div class=\"sheet full\">…</div>\n// .sheet 默认半屏圆角，.full 时 height:100% + border-radius:0 + 抓手位置调整\n关键参数：\n- dur 过渡时长 / radius 顶部圆角 / half 半屏高度 / shadow 投影浓度 / handle 显示顶部手柄 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色 / titleColor 标题文字颜色\n集成步骤：\n1. 复制 assets/demos/全屏展开.html 的样式\n2. 圆角/抓手要和半屏状态一起过渡，别跳变\n3. 配转场衔接（v120）可以延伸成新页面",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>全屏展开演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .35s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.4)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--half, 50vh); border-radius: var(--radius, 16px) var(--radius, 16px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: height var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                border-radius var(--dur, .38s) ease,\n                transform var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1));\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 全屏时：圆角归零、抓手移到顶部缩成一条，视觉统一不穿帮 */\n  .sheet.full { height: 100%; border-radius: 0; }\n  .handle {\n    width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd);\n    margin: 10px auto 0; transition: transform var(--dur, .38s) ease, margin var(--dur, .38s) ease;\n  }\n  .sheet.full .handle { transform: translateY(6px) scaleX(6); margin-top: 6px; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; color: var(--titlec, #1a1a1a); }\n  .full-btn {\n    display: block; margin: 18px auto 0; cursor: pointer; user-select: none; border: none;\n    background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 700;\n    padding: 8px 20px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">半屏 → 全屏</div>\n  <button class=\"full-btn\" id=\"full\">展开全屏</button>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">圆角与抓手同步调整，视觉保持统一</p>\n</div>\n<p class=\"hint\">先半屏弹出，点「展开全屏」看过渡</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38,           // 过渡时长（秒）\n    radius: 16,          // 半屏时顶部圆角（px）\n    half: 50,            // 半屏高度（vh）\n    shadow: 0.12,        // 投影浓度\n    handle: true,        // 是否显示顶部手柄\n    mask: 0.4,           // 遮罩浓度\n    maskColor: \"#000000\",   // 遮罩颜色\n    sheetBg: \"#ffffff\",     // 弹层底色\n    handleColor: \"#dddddd\", // 手柄颜色\n    titleColor: \"#1a1a1a\"   // 标题文字颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--half\", state.half + \"vh\");\n    R.setProperty(\"--dur\", state.dur + \"s\"); // 时长走 CSS 变量，改动即时生效\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--titlec\", state.titleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\", \"full\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  document.getElementById(\"full\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    sheet.classList.toggle(\"full\");\n  });\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v115",
    标题: "背景处理",
    分类: "组件",
    子类: "弹窗",
    风格: [
      "仪式感"
    ],
    场景: [
      "手机端网页"
    ],
    元素: [
      "颜色"
    ],
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
        步长: 0.05,
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
    效果说明: "弹层打开时，底层页面叠加模糊 + 轻微缩小，像真的往后退了一层。比单纯变暗的遮罩更有「前后」的感觉。",
    用法: "详情页拖滑杆调模糊强度、缩小比例、过渡时长；模糊太大会看不清底层，建议 4-8px。",
    提示词: "帮我做\"弹层背景处理\"（纯 HTML/CSS/JS）：\n效果：弹层打开时底层页面叠加模糊 + 轻微缩小，强化「后退一层」的状态。\n用法示例：\n<div class=\"bg away\">…底层内容…</div>\n// .away 时 filter:blur(6px) + transform:scale(.96)，与弹层同过渡时长\n关键参数：\n- blur 底层模糊 / scale 底层缩小比例 / dur 过渡时长 / dim 底层压暗程度 / sheetH 弹层高度 / radius 顶部圆角 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / cardBg 底层卡片颜色 / handleColor 手柄颜色\n集成步骤：\n1. 复制 assets/demos/背景处理.html 的样式\n2. 底层内容套 .bg，打开时加 .away\n3. 手机端模糊别太大，省性能",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>背景处理演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  /* 底层内容：弹层打开时模糊 + 轻微缩小，强化\"退到后面\"的状态 */\n  .bg {\n    position: fixed; inset: 0; padding: 40px;\n    display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;\n    transition: filter var(--dur, .35s) ease, transform var(--dur, .35s) ease;\n  }\n  .bg.away { filter: blur(var(--blur, 6px)) brightness(var(--dim, .72)); transform: scale(var(--scale, .96)); }\n  .mini {\n    background: var(--card, #f0f0f0); border-radius: 14px; padding: 20px;\n    font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center;\n    color: #666; min-height: 120px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background var(--dur, .35s) ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.25)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 45vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%); transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<div class=\"bg\" id=\"bg\">\n  <div class=\"mini\">内容卡片 1</div>\n  <div class=\"mini\">内容卡片 2</div>\n  <div class=\"mini\">内容卡片 3</div>\n  <div class=\"mini\">内容卡片 4</div>\n</div>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">底层已退后</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">模糊 + 缩小，一眼看出它在后面</p>\n</div>\n<p class=\"hint\">弹层打开时，底层页面模糊 + 轻微缩小</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    blur: 6,          // 底层模糊（px）\n    scale: 0.96,      // 底层缩小比例\n    dur: 0.35,        // 过渡时长（秒）\n    dim: 0.72,        // 底层压暗程度（1=不变暗）\n    sheetH: 45,       // 弹层高度（vh）\n    radius: 20,       // 顶部圆角（px）\n    mask: 0.25,       // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    cardBg: \"#f0f0f0\",     // 底层卡片颜色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const bg = document.getElementById(\"bg\");\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--blur\", state.blur + \"px\");\n    R.setProperty(\"--scale\", state.scale);\n    R.setProperty(\"--dim\", state.dim);\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--card\", state.cardBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n  }\n\n  function open() {\n    bg.classList.add(\"away\");\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    bg.classList.remove(\"away\");\n    sheet.classList.remove(\"show\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v116",
    标题: "弹性动效",
    分类: "动画",
    子类: "弹窗",
    风格: [
      "轻盈灵动"
    ],
    场景: [
      "手机端网页"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "弹层弹出时先压缩过头再拉回，像被手指拽出来又弹回去，有物理拉扯质感。比直接滑入更有生命力。",
    用法: "详情页拖滑杆调起始压缩、冲过头、弹出时长；冲过头越大越「皮」，小一点更稳重。",
    提示词: "帮我做\"弹性弹出\"动效（纯 HTML/CSS/JS）：\n效果：弹层弹出时先拉伸过头再复位，模拟物理拉扯质感。\n用法示例：\n.sheet.in { animation: sheetIn .45s cubic-bezier(.32,.72,0,1) forwards; }\n// keyframes：105% 出发 → 冲过 -4% → 微回 2% → 落定 0\n关键参数：\n- stretch 起始压扁程度 / over 回落过冲拉伸 / dur 弹出时长 / oy 冲过头位移 / sheetH 弹层高度 / radius 顶部圆角 / shadow 投影浓度 / handle 显示顶部手柄 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色\n集成步骤：\n1. 复制 assets/demos/弹性动效.html 的 keyframes\n2. 套到你的弹层/抽屉上\n3. 想要更「皮」就加大 over",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>弹性动效演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 45vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n  }\n  /* 弹出：先拉伸过头再复位，模拟物理拉扯质感 */\n  .sheet.in { animation: sheetIn var(--dur, .45s) cubic-bezier(.32,.72,0,1) forwards; }\n  .sheet.out { animation: sheetOut var(--dur, .25s) ease-in forwards; }\n  @keyframes sheetIn {\n    0%   { transform: translateY(105%) scaleY(var(--stretch, .92)); }\n    55%  { transform: translateY(var(--oy, -4%)) scaleY(1); }\n    78%  { transform: translateY(2%) scaleY(var(--over, 1.02)); }\n    100% { transform: translateY(0) scaleY(1); }\n  }\n  @keyframes sheetOut { to { transform: translateY(105%); } }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\" id=\"handle\"></div>\n  <div class=\"sheet-title\">弹性弹出</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">先拉伸过头，再复位落定</p>\n</div>\n<p class=\"hint\">弹出时先冲过头再落回，像被拽出来的</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    stretch: 0.92,    // 起始压扁程度（越小越扁）\n    over: 1.02,       // 回落时的过冲拉伸\n    dur: 0.45,        // 弹出时长（秒）\n    oy: -4,           // 冲过头位移（%，负=向上冲）\n    sheetH: 45,       // 弹层高度（vh）\n    radius: 20,       // 顶部圆角（px）\n    shadow: 0.12,     // 投影浓度\n    handle: true,     // 是否显示顶部手柄\n    mask: 0.3,        // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const handle = document.getElementById(\"handle\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--stretch\", state.stretch); // 关键帧里读 CSS 变量，改完再弹立即生效\n    R.setProperty(\"--over\", state.over);\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--oy\", state.oy + \"%\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    handle.style.display = state.handle ? \"block\" : \"none\";\n  }\n\n  function open() {\n    sheet.classList.remove(\"out\");\n    sheet.classList.add(\"in\");\n    mask.classList.add(\"show\");\n  }\n  function close() {\n    sheet.classList.remove(\"in\");\n    sheet.classList.add(\"out\");\n    mask.classList.remove(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v117",
    标题: "拖拽关闭",
    分类: "组件",
    子类: "弹窗",
    风格: [
      "手机App感"
    ],
    场景: [
      "手机端网页"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "按住弹层头部往下拖：拖的距离不够就自动弹回，拖过阈值或甩得快就直接关闭。慢拖回弹、快拖关闭，手势符合直觉。",
    用法: "详情页拖滑杆调关闭阈值、回弹时长；速度阈值在 JS 的 vel > 1.0 里改；只保留拖拽关闭不想要速度判断就删掉 vel 条件。",
    提示词: "帮我做\"拖拽关闭\"弹层（纯 HTML/CSS/JS）：\n效果：按住弹层头部拖拽，结合拖拽距离与速度判断——慢拖回弹、快拖或拖过阈值关闭。\n用法示例：\ngrab.onpointermove = (e) => { sheet.style.transform = translateY(拖拽距离); }\n// pointerup 时：距离/高度 > threshold 或速度 > 1.0 → 关闭，否则回弹\n关键参数：\n- threshold 关闭阈值 / dur 回弹/收起时长 / vel 甩动关闭速度 / followRatio 跟手比例 / maskFollow 拖动时遮罩跟随渐隐 / sheetH 弹层高度 / radius 顶部圆角 / shadow 投影浓度 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色\n集成步骤：\n1. 复制 assets/demos/拖拽关闭.html 的手势逻辑\n2. 拖拽中要 transition:none，松手再恢复过渡\n3. 配档位吸附（v118）就是完整的可拖拽弹层",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>拖拽关闭演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .3s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .sheet.dragging { transition: none; }\n  .sheet.gone { transform: translateY(105%); }\n  .grab { padding: 14px 0 6px; cursor: grab; touch-action: none; user-select: none; }\n  .grab:active { cursor: grabbing; }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 0 auto; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 10px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"grab\" id=\"grab\"><div class=\"handle\"></div></div>\n  <div class=\"sheet-title\">往下拖我</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">慢拖回弹、快拖或拖过阈值就关闭</p>\n</div>\n<p class=\"hint\">按住抓手往下拖：拖够远 / 甩得快 → 关闭，否则弹回</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    threshold: 30,     // 关闭阈值（拖过弹层高度的百分比）\n    dur: 0.3,          // 回弹/收起时长（秒）\n    vel: 1.0,          // 甩动关闭速度（px/ms）\n    followRatio: 1,    // 跟手比例（0.5=弹层只走一半）\n    maskFollow: true,  // 拖动时遮罩跟随渐隐\n    sheetH: 55,        // 弹层高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const grab = document.getElementById(\"grab\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    // 拖拽逻辑参数（阈值/甩速/跟手比例）在松手判断时读 state；这里统一转数字，父页面传字符串也不会失灵\n    state.threshold = +state.threshold;\n    state.vel = +state.vel;\n    state.followRatio = +state.followRatio;\n  }\n\n  let startY = 0, curY = 0, lastY = 0, lastT = 0, dragging = false, vel = 0;\n\n  grab.addEventListener(\"pointerdown\", (e) => {\n    dragging = true;\n    startY = curY = lastY = e.clientY;\n    lastT = performance.now();\n    vel = 0;\n    grab.setPointerCapture(e.pointerId);\n    sheet.classList.add(\"dragging\");\n    mask.style.transition = \"none\"; // 拖动时遮罩要跟手，关掉渐变\n  });\n  grab.addEventListener(\"pointermove\", (e) => {\n    if (!dragging) return;\n    curY = e.clientY;\n    const now = performance.now();\n    const dt = now - lastT;\n    if (dt > 0) vel = (curY - lastY) / dt; // px/ms，正=往下甩\n    lastY = curY; lastT = now;\n    const dy = Math.max(0, curY - startY);\n    // 跟手比例：弹层实际位移 = 手指位移 × followRatio\n    const move = dy * state.followRatio;\n    sheet.style.transform = \"translateY(\" + move + \"px)\";\n    // 遮罩跟随渐隐：拖得越远越透明\n    if (state.maskFollow) mask.style.background = rgba(state.maskColor, state.mask * (1 - Math.min(1, dy / (sheet.offsetHeight * 1.2))));\n  });\n  function endDrag() {\n    if (!dragging) return;\n    dragging = false;\n    sheet.classList.remove(\"dragging\");\n    mask.style.transition = \"\";\n    mask.style.background = \"\";\n    const dist = (curY - startY) * state.followRatio; // 实际位移参与阈值判断\n    const ratio = dist / sheet.offsetHeight * 100;\n    // 判断：拖过阈值（距离）或甩得快（速度）\n    if (ratio > state.threshold || vel > state.vel) close(); else rebound();\n  }\n  grab.addEventListener(\"pointerup\", endDrag);\n  grab.addEventListener(\"pointercancel\", endDrag);\n\n  function rebound() {\n    sheet.classList.add(\"show\");\n    sheet.style.transform = \"\";\n    setTimeout(() => sheet.classList.remove(\"show\", \"gone\"), state.dur * 1000 + 60);\n  }\n  function close() {\n    sheet.style.transform = \"\";\n    sheet.classList.remove(\"show\");\n    sheet.classList.add(\"gone\");\n    mask.classList.remove(\"show\");\n    setTimeout(() => sheet.classList.remove(\"gone\"), state.dur * 1000 + 60);\n  }\n  function open() {\n    sheet.classList.remove(\"gone\");\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v118",
    标题: "档位吸附",
    分类: "组件",
    子类: "弹窗",
    风格: [
      "手机App感"
    ],
    场景: [
      "手机端网页"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "弹层高度可以拖拽调整，松手后自动吸附到最近的档位（如 35% / 65% / 100%）。既自由又整齐，不会停在奇怪的中间高度。",
    用法: "详情页拖滑杆调吸附时长、档位数；档位数参数会自动等分生成，想自定义档位就改 JS 里的 SNAPS 数组。",
    提示词: "帮我做\"档位吸附\"弹层（纯 HTML/CSS/JS）：\n效果：拖拽调整弹层高度，设置档位吸附机制，松手自动对齐最近档位。\n用法示例：\nconst SNAPS = [0.35, 0.65, 1]; // 档位比例\n// pointerup 时找 |当前 - 档位| 最小的那个，过渡到它\n关键参数：\n- dur 吸附动画时长 / snap 档位数量 / magnet 磁吸范围 / marks 显示档位标签 / sheetH 初始高度 / radius 顶部圆角 / minH 最小可拖高度 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 弹层底色 / handleColor 手柄颜色 / markColor 档位标签颜色\n集成步骤：\n1. 复制 assets/demos/档位吸附.html 的手势逻辑\n2. 档位数用 snap 参数自动生成，或自己写 SNAPS\n3. 配拖拽关闭（v117）两段手势齐活",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>档位吸附演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0;\n    height: var(--h, 35vh); border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: height var(--dur, .28s) cubic-bezier(.32,.72,0,1), transform var(--dur, .28s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet.show { transform: translateY(0); }\n  .sheet.dragging { transition: none; }\n  .grab { padding: 14px 0 6px; cursor: grab; touch-action: none; user-select: none; }\n  .grab:active { cursor: grabbing; }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 0 auto; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 10px; }\n  .mark { text-align: center; font-size: 12px; color: var(--markc, #999); margin-top: 6px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开弹层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"grab\" id=\"grab\"><div class=\"handle\"></div></div>\n  <div class=\"sheet-title\">拖我上下走</div>\n  <p class=\"mark\" id=\"mark\">当前档位：35%</p>\n</div>\n<p class=\"hint\">按住抓手上下拖：松手自动吸附最近档位</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.28,         // 吸附动画时长（秒）\n    snap: 3,           // 档位数量（2~5）\n    magnet: 1,         // 磁吸范围（0-1，越接近 1 越远也能吸）\n    marks: true,       // 显示档位标签\n    sheetH: 35,        // 初始档位高度（vh，取最近档位）\n    radius: 20,        // 顶部圆角（px）\n    minH: 120,         // 最小可拖高度（px）\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 弹层底色\n    handleColor: \"#dddddd\",// 手柄颜色\n    markColor: \"#999999\"   // 档位标签颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n  const grab = document.getElementById(\"grab\");\n  const mark = document.getElementById(\"mark\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n  // 根据档位数量生成档位表（均分 0~100%）\n  const snaps = () => {\n    const n = Math.max(2, Math.round(state.snap));\n    return Array.from({ length: n }, (_, i) => (i + 1) / n);\n  };\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--h\", nearest(state.sheetH / 100) * 100 + \"vh\"); // 初始高度吸附到最近档位\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n    R.setProperty(\"--markc\", state.markColor);\n    mark.style.display = state.marks ? \"block\" : \"none\";\n    // 拖拽逻辑参数：档位数量先归一（经 nearest() 生效），磁吸范围/最小高度在松手与拖动时读 state\n    state.snap = Math.max(2, Math.round(+state.snap));\n    state.magnet = +state.magnet;\n    state.minH = +state.minH;\n    if (state.marks) mark.textContent = \"当前档位：\" + Math.round(nearest(parseFloat(sheet.style.height || state.sheetH + \"vh\") / innerHeight) * 100) + \"%\";\n  }\n  // 找最近档位\n  function nearest(cur) {\n    let best = snaps()[0];\n    snaps().forEach(s => { if (Math.abs(s - cur) < Math.abs(best - cur)) best = s; });\n    return best;\n  }\n\n  let startY = 0, dragging = false;\n  const vh = () => window.innerHeight;\n\n  grab.addEventListener(\"pointerdown\", (e) => {\n    dragging = true;\n    startY = e.clientY;\n    grab.setPointerCapture(e.pointerId);\n    sheet.classList.add(\"dragging\");\n  });\n  grab.addEventListener(\"pointermove\", (e) => {\n    if (!dragging) return;\n    const dy = e.clientY - startY;\n    const h = Math.max(state.minH, vh() - dy);\n    sheet.style.height = h + \"px\";\n  });\n  function endDrag(e) {\n    if (!dragging) return;\n    dragging = false;\n    sheet.classList.remove(\"dragging\");\n    // 松手：距离最近档位在磁吸范围内 → 吸附；否则停在原地\n    const cur = parseFloat(sheet.style.height || sheet.offsetHeight) / vh();\n    const best = nearest(cur);\n    if (Math.abs(best - cur) <= state.magnet) {\n      sheet.style.height = (best * 100) + \"vh\";\n      if (state.marks) mark.textContent = \"当前档位：\" + Math.round(best * 100) + \"%\";\n    }\n  }\n  grab.addEventListener(\"pointerup\", endDrag);\n  grab.addEventListener(\"pointercancel\", endDrag);\n\n  function open() { sheet.classList.add(\"show\"); mask.classList.add(\"show\"); }\n  function close() { sheet.classList.remove(\"show\"); mask.classList.remove(\"show\"); }\n  document.getElementById(\"open\").addEventListener(\"click\", open);\n  mask.addEventListener(\"click\", close);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v119",
    标题: "嵌套抽屉",
    分类: "组件",
    子类: "弹窗",
    风格: [
      "手机App感"
    ],
    场景: [
      "手机端网页"
    ],
    元素: [
      "版面"
    ],
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
        步长: 0.05,
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
    效果说明: "第二层弹层打开时，第一层同步后退、缩小、变暗，两层的前后关系一眼可见。多层级操作不会让用户迷路。",
    用法: "详情页拖滑杆调过渡时长、第一层后退比例；后退比例越小层次越明显，但内容太多会看不清第一层。",
    提示词: "帮我做\"嵌套抽屉\"（纯 HTML/CSS/JS）：\n效果：第二层弹出时，第一层同步后退、缩小、变暗，强化层级感知。\n用法示例：\n.sheet.back { transform: scale(.94); filter: brightness(.72); }\n// 开第二层时给第一层加 .back，两层同过渡时长\n关键参数：\n- dur 弹出时长 / back 第一层后退缩小比例 / dim 第一层压暗程度 / h1 第一层高度 / h2 第二层高度 / radius 顶部圆角 / shadow 第一层投影浓度 / mask 遮罩浓度 / maskColor 遮罩颜色 / bg1 第一层底色 / bg2 第二层底色\n集成步骤：\n1. 复制 assets/demos/嵌套抽屉.html 的两层结构\n2. 第二层开 → 第一层 .back；关第二层 → 移除 .back\n3. 配背景处理（v115）层次感更强",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>嵌套抽屉演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .btn.sec { background: #fff; color: #1a1a1a; border: 2px solid #1a1a1a; margin-top: 14px; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.35)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h1, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--bg1, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1), scale var(--dur, .35s) ease, filter var(--dur, .35s) ease;\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 第二层弹出：第一层后退 + 缩小 + 变暗 */\n  .sheet.back { transform: translateY(0) scale(var(--back, .94)); filter: brightness(var(--dim, .72)); }\n  .sheet2 {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h2, 70vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--bg2, #f7f7f7); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow2, .14));\n    transform: translateY(105%);\n    transition: transform var(--dur, .35s) cubic-bezier(.32,.72,0,1);\n  }\n  .sheet2.show { transform: translateY(0); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开第一层</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"s1\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">第一层</div>\n  <div style=\"text-align:center\"><button class=\"btn sec\" id=\"open2\">打开第二层</button></div>\n</div>\n<div class=\"sheet2\" id=\"s2\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">第二层</div>\n  <p style=\"text-align:center;font-size:13px;color:#666;margin-top:8px\">第一层同步后退、缩小、变暗</p>\n</div>\n<p class=\"hint\">两层联动：开第二层时第一层退后</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.35,         // 两层弹出时长（秒）\n    back: 0.94,        // 第一层后退缩小比例\n    dim: 0.72,         // 第一层压暗程度（1=不变暗）\n    h1: 55,            // 第一层高度（vh）\n    h2: 70,            // 第二层高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 第一层投影浓度\n    mask: 0.35,        // 遮罩浓度\n    maskColor: \"#000000\", // 遮罩颜色\n    bg1: \"#ffffff\",       // 第一层底色\n    bg2: \"#f7f7f7\"        // 第二层底色\n  };\n  const mask = document.getElementById(\"mask\");\n  const s1 = document.getElementById(\"s1\");\n  const s2 = document.getElementById(\"s2\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--back\", state.back);\n    R.setProperty(\"--dim\", state.dim);\n    R.setProperty(\"--h1\", state.h1 + \"vh\");\n    R.setProperty(\"--h2\", state.h2 + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--shadow2\", Math.min(0.4, state.shadow + 0.02)); // 第二层影子稍重一点\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--bg1\", state.bg1);\n    R.setProperty(\"--bg2\", state.bg2);\n  }\n\n  document.getElementById(\"open\").addEventListener(\"click\", () => {\n    s1.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  });\n  document.getElementById(\"open2\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    s2.classList.add(\"show\");\n    s1.classList.add(\"back\");\n    mask.classList.add(\"show\");\n  });\n  mask.addEventListener(\"click\", () => {\n    s1.classList.remove(\"show\", \"back\");\n    s2.classList.remove(\"show\");\n    mask.classList.remove(\"show\");\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v120",
    标题: "转场衔接",
    分类: "动画",
    子类: "转场",
    风格: [
      "仪式感"
    ],
    场景: [
      "手机端网页",
      "详情页"
    ],
    元素: [
      "动效"
    ],
    搭配: [
      "页面切换过渡"
    ],
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
        步长: 0.05,
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
    效果说明: "抽屉里的内容点开时，抽屉就地延伸成全屏新页面，而不是先关抽屉再开页面。路径连续，用户不会感到「被打断」。",
    用法: "详情页拖滑杆调转场时长；新页面的内容在 .page-body 里改，想加淡入就在 .page 上加 opacity 过渡。",
    提示词: "帮我做\"转场衔接\"（纯 HTML/CSS/JS）：\n效果：抽屉直接延伸为新页面，避免「关闭再开启」的割裂感。\n用法示例：\n.sheet.page { height:100%; border-radius:0; }\n// 点进入时给抽屉加 .page：高度 100% + 圆角 0 + 内容切换到 page-body\n关键参数：\n- dur 转场时长 / ease 缓动方式 / sheetH 抽屉高度 / radius 顶部圆角 / shadow 投影浓度 / mask 遮罩浓度 / maskColor 遮罩颜色 / sheetBg 抽屉底色 / pageBg 详情页底色 / handleColor 手柄颜色\n集成步骤：\n1. 复制 assets/demos/转场衔接.html 的结构\n2. 新页面内容放 .page-body，平时隐藏\n3. 配全屏展开（v114）过渡更顺",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>转场衔接演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 700;\n    padding: 12px 28px; border-radius: 10px;\n  }\n  .btn.sec { background: #fff; color: #1a1a1a; border: 2px solid #1a1a1a; margin-top: 14px; }\n  .mask {\n    position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none;\n    transition: background .3s ease;\n  }\n  .mask.show { background: var(--maskbg, rgba(0,0,0,.3)); pointer-events: auto; }\n  .sheet {\n    position: fixed; left: 0; right: 0; bottom: 0; height: var(--h, 55vh);\n    border-radius: var(--radius, 20px) var(--radius, 20px) 0 0;\n    background: var(--sheet, #fff); box-shadow: 0 -8px 30px rgba(0,0,0,var(--shadow, .12));\n    transform: translateY(105%);\n    transition: transform var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                height var(--dur, .38s) var(--ease, cubic-bezier(.32,.72,0,1)),\n                border-radius var(--dur, .38s) ease,\n                background var(--dur, .38s) ease;\n  }\n  .sheet.show { transform: translateY(0); }\n  /* 转场衔接：抽屉直接延伸为全屏新页面，不关掉重开 */\n  .sheet.page { height: 100%; border-radius: 0; transform: translateY(0); background: var(--page, #fff); }\n  .handle { width: 40px; height: 4px; border-radius: 4px; background: var(--handlec, #ddd); margin: 10px auto 0; }\n  .sheet-title { text-align: center; font-weight: 800; margin-top: 12px; }\n  .page-body { display: none; text-align: center; padding: 30px 20px; }\n  .sheet.page .sheet-title, .sheet.page .handle { display: none; }\n  .sheet.page .page-body { display: block; }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"open\">打开抽屉</button>\n<div class=\"mask\" id=\"mask\"></div>\n<div class=\"sheet\" id=\"sheet\">\n  <div class=\"handle\"></div>\n  <div class=\"sheet-title\">抽屉内容</div>\n  <div style=\"text-align:center\"><button class=\"btn sec\" id=\"go\">进入详情页</button></div>\n  <div class=\"page-body\">\n    <h3 style=\"margin-bottom:10px\">详情页 ✓</h3>\n    <p style=\"font-size:13px;color:#666\">抽屉直接延伸成了新页面，中间没有「关掉再打开」的割裂感。</p>\n  </div>\n</div>\n<p class=\"hint\">点「进入详情页」：抽屉就地长成全屏新页面</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.38,         // 转场时长（秒）\n    ease: \"先快后慢\",   // 缓动方式\n    sheetH: 55,        // 抽屉高度（vh）\n    radius: 20,        // 顶部圆角（px）\n    shadow: 0.12,      // 投影浓度\n    mask: 0.3,         // 遮罩浓度\n    maskColor: \"#000000\",  // 遮罩颜色\n    sheetBg: \"#ffffff\",    // 抽屉底色\n    pageBg: \"#ffffff\",     // 详情页底色\n    handleColor: \"#dddddd\" // 手柄颜色\n  };\n  const mask = document.getElementById(\"mask\");\n  const sheet = document.getElementById(\"sheet\");\n\n  // 十六进制转 rgba\n  function rgba(hex, a) {\n    const n = parseInt(hex.slice(1), 16);\n    return \"rgba(\" + (n >> 16 & 255) + \",\" + (n >> 8 & 255) + \",\" + (n & 255) + \",\" + a + \")\";\n  }\n  // 缓动方式 → 贝塞尔曲线（走 CSS 变量，改完立即生效）\n  const EASES = {\n    \"先快后慢\": \"cubic-bezier(.32,.72,0,1)\",\n    \"匀速\": \"linear\",\n    \"回弹\": \"cubic-bezier(.34,1.56,.64,1)\"\n  };\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--ease\", EASES[state.ease] || EASES[\"先快后慢\"]);\n    R.setProperty(\"--h\", state.sheetH + \"vh\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--shadow\", state.shadow);\n    R.setProperty(\"--maskbg\", rgba(state.maskColor, state.mask));\n    R.setProperty(\"--sheet\", state.sheetBg);\n    R.setProperty(\"--page\", state.pageBg);\n    R.setProperty(\"--handlec\", state.handleColor);\n  }\n\n  document.getElementById(\"open\").addEventListener(\"click\", () => {\n    sheet.classList.add(\"show\");\n    mask.classList.add(\"show\");\n  });\n  document.getElementById(\"go\").addEventListener(\"click\", (e) => {\n    e.stopPropagation();\n    sheet.classList.add(\"page\");\n    mask.classList.remove(\"show\");\n  });\n  mask.addEventListener(\"click\", () => {\n    sheet.classList.remove(\"show\", \"page\");\n    mask.classList.remove(\"show\");\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v121",
    标题: "状态收尾",
    分类: "动画",
    子类: "按钮",
    风格: [
      "仪式感"
    ],
    场景: [
      "表单",
      "工具类网站"
    ],
    元素: [
      "动效",
      "颜色"
    ],
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
    效果说明: "弹窗里的任务完成后，按钮通过变形动画（宽度收拢、变圆、画对勾）过渡为提示状态。状态变化发生在原位置，不用弹新窗口打断。",
    用法: "详情页拖滑杆调变形时长；对勾是 SVG 描边动画，颜色在 .action.done 里改；复原时间在 JS 的 2400ms 里调。",
    提示词: "帮我做\"状态收尾\"按钮（纯 HTML/CSS/JS + SVG）：\n效果：弹窗完成任务后，按钮通过变形动画过渡为提示状态（收窄 → 变圆 → 画对勾）。\n用法示例：\n<button class=\"action done\">…</button>\n// .done 时 width:52px + border-radius:50% + 背景变绿，对勾 SVG 描边画入\n关键参数：\n- dur 收尾变形时长 / text 按钮文字 / w 按钮宽度 / h 按钮高度 / radius 按钮圆角 / finalSize 收尾圆形直径 / success 成功色 / btnBg 按钮底色 / btnColor 按钮文字颜色 / tickColor 对勾颜色\n集成步骤：\n1. 复制 assets/demos/状态收尾.html 的结构\n2. 文案和提示颜色按场景换（保存/提交/完成）\n3. 配勾选动效（v105）风格统一",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>状态收尾演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .action {\n    position: relative; overflow: hidden; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--btnbg, #1a1a1a); color: var(--btnc, #fff);\n    font-size: 16px; font-weight: 700; letter-spacing: 2px;\n    width: var(--w, 200px); height: var(--h, 52px); border-radius: var(--radius, 14px);\n    transition: width var(--dur, .45s) cubic-bezier(.32,.72,0,1),\n                height var(--dur, .45s) cubic-bezier(.32,.72,0,1),\n                border-radius var(--dur, .45s) ease,\n                background var(--dur, .45s) ease;\n  }\n  /* 收尾：任务完成后，按钮变形为对勾提示状态（不是弹个新框） */\n  .action.done {\n    width: var(--final, 52px); height: var(--final, 52px);\n    border-radius: 50%; background: var(--ok, #16a34a); cursor: default;\n  }\n  .action .txt { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: opacity .2s ease; }\n  .action .tick {\n    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0;\n  }\n  .action.done .txt { opacity: 0; }\n  .action.done .tick { opacity: 1; }\n  .tick svg { width: 26px; height: 26px; }\n  .tick path {\n    fill: none; stroke: var(--tickc, #fff); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;\n    stroke-dasharray: 26; stroke-dashoffset: 26;\n    animation: drawTick var(--dur, .45s) ease .15s forwards;\n  }\n  @keyframes drawTick { to { stroke-dashoffset: 0; } }\n</style>\n</head>\n<body>\n<button class=\"action\" id=\"act\">\n  <span class=\"txt\" id=\"txt\">保存设置</span>\n  <span class=\"tick\"><svg viewBox=\"0 0 24 24\"><path d=\"M5 12.5 L10 17.5 L19 7\"></path></svg></span>\n</button>\n<p class=\"hint\">点一下：按钮自己变形为「已保存 ✓」，不用弹新窗口</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.45,           // 收尾变形时长（秒）\n    text: \"保存设置\",     // 按钮文字\n    w: 200,              // 按钮宽度（px）\n    h: 52,               // 按钮高度（px）\n    radius: 14,          // 按钮圆角（px）\n    finalSize: 52,       // 收尾圆形直径（px）\n    success: \"#16a34a\",  // 成功色\n    btnBg: \"#1a1a1a\",    // 按钮底色\n    btnColor: \"#ffffff\", // 按钮文字颜色\n    tickColor: \"#ffffff\" // 对勾颜色\n  };\n  const act = document.getElementById(\"act\");\n  const txt = document.getElementById(\"txt\");\n\n  function apply() {\n    const R = document.documentElement.style;\n    R.setProperty(\"--dur\", state.dur + \"s\");\n    R.setProperty(\"--w\", state.w + \"px\");\n    R.setProperty(\"--h\", state.h + \"px\");\n    R.setProperty(\"--radius\", state.radius + \"px\");\n    R.setProperty(\"--final\", state.finalSize + \"px\");\n    R.setProperty(\"--ok\", state.success);\n    R.setProperty(\"--btnbg\", state.btnBg);\n    R.setProperty(\"--btnc\", state.btnColor);\n    R.setProperty(\"--tickc\", state.tickColor);\n    txt.textContent = state.text; // 按钮文字实时可改\n  }\n\n  act.addEventListener(\"click\", () => {\n    if (act.classList.contains(\"done\")) return;\n    act.classList.add(\"done\");\n    act.setAttribute(\"aria-label\", \"已完成\");\n    setTimeout(() => act.classList.remove(\"done\"), 2400);\n  });\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v122",
    标题: "模糊进度",
    分类: "组件",
    子类: "进度条",
    风格: [
      "克制简约"
    ],
    场景: [
      "文件传输",
      "工具类网站"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "无法估算时长的任务（上传、同步、AI 生成）不假装有百分比，只用光条来回流动告诉用户「系统在跑」。诚实且安心。",
    用法: "拖滑杆调流动速度、光条数量、粗细、圆角，点色块换主色；条数多了像波浪、少了更安静。",
    提示词: "帮我做一个\"模糊进度条\"（纯 HTML/CSS/JS）：\n效果：用于无法估算等待时长的任务，光条来回流动，仅告知用户系统在运行，不显示百分比。\n用法示例：\n<div class=\"rail\"><div class=\"indet\"></div></div>\n// .indet 在 .rail 里从 -40% 滑到 100%，无限循环\n关键参数：\n- speed 流动速度 / count 光条数量 / thick 粗细 / round 圆角 / color 主色\n集成步骤：\n1. 复制 assets/demos/模糊进度.html 的样式和 JS\n2. 套到上传/同步/AI 生成等不确定时长的任务\n3. 光条颜色换品牌色",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>模糊进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .rail {\n    position: relative;\n    width: var(--width, 300px);\n    height: var(--thick, 6px);\n    border-radius: var(--round, 6px);\n    background: var(--track, #eee);\n    overflow: hidden;\n  }\n  .indet {\n    position: absolute; top: 0; height: 100%;\n    width: calc(100% / var(--count, 2) - var(--gap, 4px));\n    border-radius: var(--round, 6px);\n    background: var(--color, #1a1a1a);\n    opacity: var(--opa, 1);\n    box-shadow: var(--glow, 0 0 0 transparent);\n    animation: indetSlide var(--speed, 1.6s) ease-in-out infinite;\n  }\n  @keyframes indetSlide {\n    0%   { left: calc(-1 * (100% / var(--count, 2))); }\n    100% { left: calc(100%); }\n  }\n</style>\n</head>\n<body>\n<div class=\"rail\" id=\"rail\"></div>\n<p class=\"hint\">无法估算时长的任务：光条来回流动，只说「在运行」，不假装有进度</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    speed: 1.6,        // 流动速度（秒）\n    count: 2,          // 光条数量（条）\n    thick: 6,          // 粗细（px）\n    round: 6,          // 圆角（px）\n    width: 300,        // 轨道宽度（px）\n    gap: 4,            // 光条间隔（px）\n    opa: 1,            // 透明度（0-1）\n    glow: false,       // 是否发光\n    color: \"#1a1a1a\",  // 光条主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const rail = document.getElementById(\"rail\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--speed\", state.speed + \"s\");\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--round\", state.round + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--opa\", state.opa);\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--count\", state.count);\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 \" + Math.max(8, state.thick * 2) + \"px \" + state.color + \"66\")\n      : \"0 0 0 transparent\");\n    // 按条数重建光条（错开延迟，像波浪）\n    rail.innerHTML = \"\";\n    for (let i = 0; i < state.count; i++) {\n      const b = document.createElement(\"div\");\n      b.className = \"indet\";\n      if (i > 0) b.style.animationDelay = (-state.speed * i / state.count) + \"s\";\n      rail.appendChild(b);\n    }\n  }\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v123",
    标题: "明确进度",
    分类: "组件",
    子类: "进度条",
    风格: [
      "克制简约"
    ],
    场景: [
      "文件传输",
      "工具类网站"
    ],
    元素: [
      "动效",
      "颜色"
    ],
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
    效果说明: "进度可算的任务（下载、安装、批量处理）用填充宽度 + 百分比，用户清楚完成比例、能估剩余时间。",
    用法: "拖滑杆调加载时长、粗细、圆角，点色块换主色；真实任务里用后端返回的进度值驱动宽度，别自己瞎估。",
    提示词: "帮我做一个\"明确进度条\"（纯 HTML/CSS/JS）：\n效果：适配可计算进度的任务，填充宽度 + 百分比同步走，让用户知晓完成比例。\n用法示例：\n<div class=\"rail\"><div class=\"fill\"></div></div>\n// .fill 的 width 跟着进度值走，百分比同步显示\n关键参数：\n- dur 加载时长 / easing 缓动 / thick 轨道粗细 / round 圆角 / width 轨道宽度 / showPct 显示百分比 / pctSize 百分比字号 / glow 填充是否发光 / color 填充主色 / track 轨道底色\n集成步骤：\n1. 复制 assets/demos/明确进度.html 的样式和 JS\n2. 真实任务用接口返回的进度驱动，别用假计时\n3. 配数字滚动（v107）做百分比弹出效果",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>明确进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .row { display: flex; align-items: center; gap: 14px; }\n  .rail {\n    position: relative;\n    width: var(--width, 300px);\n    height: var(--thick, 8px);\n    border-radius: var(--round, 8px);\n    background: var(--track, #eee);\n    overflow: hidden;\n  }\n  .fill {\n    height: 100%; width: 0%;\n    border-radius: var(--round, 8px);\n    background: var(--color, #1a1a1a);\n    box-shadow: var(--glow, 0 0 0 transparent);\n    transition: width .12s linear;\n  }\n  .pct {\n    font-size: var(--pctSize, 18px);\n    font-weight: 800;\n    font-variant-numeric: tabular-nums;\n    min-width: 48px;\n    text-align: right;\n    color: var(--color, #1a1a1a);\n    display: var(--showPct, inline);\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"row\">\n  <div class=\"rail\"><div class=\"fill\" id=\"fill\"></div></div>\n  <div class=\"pct\" id=\"pct\">0%</div>\n</div>\n<button class=\"btn\" id=\"btn\">重新加载</button>\n<p class=\"hint\">进度可算的任务：填充宽度 + 百分比同步走，用户知道完成比例</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 2,            // 加载时长（秒），越大越慢\n    thick: 8,          // 轨道粗细（px）\n    round: 8,          // 圆角（px）\n    width: 300,        // 轨道宽度（px）\n    easing: \"easeOut\", // 缓动：easeOut（开头快结尾缓）/ linear（匀速）/ easeInOut（两端缓）\n    showPct: true,     // 是否显示百分比数字\n    pctSize: 18,       // 百分比字号\n    glow: false,       // 填充是否发光\n    color: \"#1a1a1a\",  // 填充主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const fill = document.getElementById(\"fill\");\n  const pct = document.getElementById(\"pct\");\n\n  // 缓动函数：把进度 t（0-1）映射到不同曲线\n  function ease(t) {\n    if (state.easing === \"linear\") return t;\n    if (state.easing === \"easeInOut\") return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;\n    return 1 - Math.pow(1 - t, 3); // easeOut：开头快结尾缓\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--round\", state.round + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    root.style.setProperty(\"--showPct\", state.showPct ? \"inline\" : \"none\");\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 \" + Math.max(6, state.thick) + \"px \" + state.color + \"66\")\n      : \"0 0 0 transparent\");\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    fill.style.width = \"0%\";\n    pct.textContent = \"0%\";\n    const start = performance.now();\n    const dur = state.dur * 1000;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const p = Math.round(100 * ease(t));\n      fill.style.width = p + \"%\";\n      pct.textContent = p + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    applyStyle();\n    if (d.key === \"dur\" || d.key === \"easing\") run();\n  });\n  applyStyle();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v124",
    标题: "环形进度",
    分类: "组件",
    子类: "进度条",
    风格: [
      "科技感"
    ],
    场景: [
      "数据看板"
    ],
    元素: [
      "动效",
      "颜色"
    ],
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
    效果说明: "小空间（卡片、指标）展示明确进度：一圈环 + 中间百分比。比横向进度条紧凑，适合仪表盘和指标卡片。",
    用法: "拖滑杆调转满时长、环大小、环粗细，点色块换主色；环粗细超过 16 会自动缩半径防溢出。",
    提示词: "帮我做一个\"环形进度\"（纯 HTML/CSS/JS + SVG）：\n效果：同样展示明确进度，环 + 中间百分比，适合卡片、指标等小空间场景。\n用法示例：\n<svg><circle class=\"ring\" r=\"52\"></circle></svg>\n// .ring 用 stroke-dasharray/dashoffset 控制填充比例，中心放百分比\n关键参数：\n- dur 转满时长 / easing 缓动 / size 环直径 / thick 环线粗细 / cap 端点形状 / rot 起点旋转 / reverse 逆时针方向 / showPct 显示百分比 / pctSize 百分比字号 / glow 环是否发光 / color 环主色 / track 轨道底色\n集成步骤：\n1. 复制 assets/demos/环形进度.html 的 SVG 和 JS\n2. 环粗细太大时要同步缩半径\n3. 配数字滚动（v107）让中心数字也滚动",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>环形进度条演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .ring-wrap {\n    position: relative;\n    width: var(--size, 120px); height: var(--size, 120px);\n  }\n  .ring-track { fill: none; stroke: var(--track, #eee); stroke-width: var(--thick, 10); }\n  .ring {\n    fill: none; stroke: var(--color, #1a1a1a); stroke-width: var(--thick, 10);\n    stroke-linecap: var(--cap, round);\n    stroke-dasharray: 326.7; stroke-dashoffset: 326.7;\n    transform: rotate(var(--rot, -90deg)); transform-origin: center;\n    filter: drop-shadow(var(--glow, 0 0 0 transparent));\n  }\n  .ring-pct {\n    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;\n    font-size: var(--pctSize, 24px); font-weight: 800; font-variant-numeric: tabular-nums;\n    color: var(--color, #1a1a1a);\n  }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"ring-wrap\" id=\"wrap\">\n  <svg viewBox=\"0 0 120 120\" id=\"svg\">\n    <circle class=\"ring-track\" id=\"ringTrack\" cx=\"60\" cy=\"60\" r=\"52\"></circle>\n    <circle class=\"ring\" id=\"ring\" cx=\"60\" cy=\"60\" r=\"52\"></circle>\n  </svg>\n  <div class=\"ring-pct\" id=\"pct\">0%</div>\n</div>\n<button class=\"btn\" id=\"btn\">重新转</button>\n<p class=\"hint\">小空间（卡片/指标）展示明确进度：环 + 百分比</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 2,            // 转满时长（秒）\n    easing: \"easeOut\", // 缓动\n    size: 120,         // 环直径（px）\n    thick: 10,         // 环线粗细（px）\n    cap: \"round\",      // 端点形状\n    rot: -90,          // 起点旋转角度\n    showPct: true,     // 是否显示百分比文字\n    pctSize: 24,       // 百分比字号\n    glow: false,       // 环是否发光\n    reverse: false,    // 进度方向（顺时针/逆时针）\n    color: \"#1a1a1a\",  // 环主色\n    track: \"#eee\"      // 轨道底色\n  };\n  const ring = document.getElementById(\"ring\");\n  const ringTrack = document.getElementById(\"ringTrack\");\n  const pct = document.getElementById(\"pct\");\n  const wrap = document.getElementById(\"wrap\");\n  const svg = document.getElementById(\"svg\");\n\n  function ease(t) {\n    if (state.easing === \"linear\") return t;\n    if (state.easing === \"easeInOut\") return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;\n    return 1 - Math.pow(1 - t, 3);\n  }\n\n  function applyStyle() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--thick\", state.thick + \"px\");\n    root.style.setProperty(\"--size\", state.size + \"px\");\n    root.style.setProperty(\"--cap\", state.cap === \"butt\" ? \"butt\" : \"round\");\n    root.style.setProperty(\"--rot\", state.rot + \"deg\");\n    root.style.setProperty(\"--pctSize\", state.pctSize + \"px\");\n    root.style.setProperty(\"--showPct\", state.showPct ? \"flex\" : \"none\");\n    pct.style.display = state.showPct ? \"flex\" : \"none\";\n    root.style.setProperty(\"--glow\", state.glow\n      ? (\"0 0 6px \" + state.color + \"88\")\n      : \"0 0 0 transparent\");\n    svg.setAttribute(\"width\", state.size);\n    svg.setAttribute(\"height\", state.size);\n    const r = 52 - Math.min(state.thick / 2, 8);\n    ring.setAttribute(\"r\", r);\n    ringTrack.setAttribute(\"r\", r);\n    const circ = 2 * Math.PI * r;\n    ring.style.strokeDasharray = circ;\n    ring.style.strokeDashoffset = circ;\n    pct.textContent = \"0%\";\n  }\n\n  let raf = 0;\n  function run() {\n    cancelAnimationFrame(raf);\n    const r = 52 - Math.min(state.thick / 2, 8);\n    const circ = 2 * Math.PI * r;\n    ring.style.strokeDashoffset = circ;\n    pct.textContent = \"0%\";\n    const start = performance.now();\n    const dur = state.dur * 1000;\n    const dir = state.reverse ? -1 : 1;\n    function tick(now) {\n      const t = Math.min((now - start) / dur, 1);\n      const p = Math.round(100 * ease(t));\n      ring.style.strokeDashoffset = circ * (1 - p / 100);\n      pct.textContent = p + \"%\";\n      if (t < 1) raf = requestAnimationFrame(tick);\n    }\n    raf = requestAnimationFrame(tick);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", run);\n  applyStyle();\n  run();\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    applyStyle();\n    if (d.key === \"dur\" || d.key === \"easing\" || d.key === \"reverse\") run();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v125",
    标题: "微光动效",
    分类: "动画",
    子类: "加载",
    风格: [
      "克制简约"
    ],
    场景: [
      "内容社区",
      "全站通用"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "灰色占位块上叠加一道移动的亮光，告诉用户「内容正在来」。可配任何占位（头像/图片/列表），是骨架屏的「动起来」层。",
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
    风格: [
      "克制简约"
    ],
    场景: [
      "表单",
      "工具类网站"
    ],
    元素: [
      "动效"
    ],
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
      }
    ],
    效果说明: "提交、生成类按钮点击后进入加载态：转圈 + 禁点，防止用户疯狂点重复提交。完成后恢复或进入成功态。",
    用法: "拖滑杆调转圈速度、加载时长、圆角，点色块换主色；加载期间 pointer-events:none 是防重复的关键；想接成功态就配 v121 状态收尾。",
    提示词: "帮我做\"按钮加载\"状态（纯 HTML/CSS/JS）：\n效果：用户点击提交、生成等操作后，按钮进入加载状态（转圈 + 禁点），防止重复点击。\n用法示例：\n<button class=\"btn loading\"><span class=\"spinner\"></span>处理中</button>\n// .loading 时显示转圈 + pointer-events:none，完成后再恢复\n关键参数：\n- dur 转一圈秒数 / wait 模拟处理时长 / radius 按钮圆角 / height 按钮高度 / fontSize 字号 / label 默认文案 / loadingLabel 加载中文案 / doneLabel 完成文案 / color 按钮背景色 / txtColor 按钮文字色 / sTrack 旋转图标轨色 / sHead 旋转图标头色\n集成步骤：\n1. 复制 assets/demos/按钮加载.html 的结构\n2. 加载逻辑接真实请求，成功/失败都要恢复按钮\n3. 配状态收尾（v121）把成功反馈也做了",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>按钮加载演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;\n    background: #fff; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n  }\n  .hint { font-size: 13px; color: #999; }\n  .btn {\n    position: relative; cursor: pointer; user-select: none; border: none; outline: none;\n    background: var(--color, #1a1a1a); color: var(--txtColor, #fff);\n    font-size: var(--fontSize, 16px); font-weight: 700; letter-spacing: var(--letter, 2px);\n    min-width: var(--minW, 180px); height: var(--height, 48px);\n    border-radius: var(--radius, 12px);\n    display: flex; align-items: center; justify-content: center; gap: 10px;\n    transition: background .2s ease, opacity .2s ease;\n  }\n  .btn:active:not(.loading) { transform: scale(.97); }\n  .btn.loading { opacity: .75; cursor: default; pointer-events: none; }\n  .spinner {\n    display: none; width: var(--sSize, 16px); height: var(--sSize, 16px); border-radius: 50%;\n    border: var(--sThick, 2px) solid var(--sTrack, rgba(255,255,255,.35));\n    border-top-color: var(--sHead, #fff);\n    animation: spin var(--dur, .9s) linear infinite;\n  }\n  .btn.loading .spinner { display: inline-block; }\n  @keyframes spin { to { transform: rotate(360deg); } }\n</style>\n</head>\n<body>\n<button class=\"btn\" id=\"btn\">\n  <span class=\"spinner\"></span>\n  <span class=\"txt\" id=\"txt\">提交</span>\n</button>\n<p class=\"hint\">点一下：进入加载态（转圈 + 禁点），完成后恢复</p>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.9,          // 旋转一圈秒数\n    wait: 1.8,          // 模拟后端处理时长（秒）\n    label: \"提交\",      // 按钮文案\n    loadingLabel: \"处理中\", // 加载中文案\n    doneLabel: \"已提交 ✓\",  // 完成文案\n    radius: 12,         // 圆角（px）\n    height: 48,         // 按钮高度（px）\n    minW: 180,          // 最小宽度（px）\n    fontSize: 16,       // 字号（px）\n    letter: 2,          // 字间距（px）\n    sSize: 16,          // 旋转图标大小（px）\n    sThick: 2,          // 旋转图标粗细（px）\n    color: \"#1a1a1a\",   // 按钮背景\n    txtColor: \"#ffffff\",// 按钮文字\n    sTrack: \"rgba(255,255,255,.35)\", // 旋转图标轨色\n    sHead: \"#ffffff\"    // 旋转图标头色\n  };\n  const btn = document.getElementById(\"btn\");\n  const txt = document.getElementById(\"txt\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--txtColor\", state.txtColor);\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--height\", state.height + \"px\");\n    root.style.setProperty(\"--minW\", state.minW + \"px\");\n    root.style.setProperty(\"--fontSize\", state.fontSize + \"px\");\n    root.style.setProperty(\"--letter\", state.letter + \"px\");\n    root.style.setProperty(\"--sSize\", state.sSize + \"px\");\n    root.style.setProperty(\"--sThick\", state.sThick + \"px\");\n    root.style.setProperty(\"--sTrack\", state.sTrack);\n    root.style.setProperty(\"--sHead\", state.sHead);\n    if (!btn.classList.contains(\"loading\")) txt.textContent = state.label;\n  }\n\n  btn.addEventListener(\"click\", () => {\n    if (btn.classList.contains(\"loading\")) return;\n    btn.classList.add(\"loading\");\n    txt.textContent = state.loadingLabel;\n    setTimeout(() => {\n      txt.textContent = state.doneLabel;\n      setTimeout(() => {\n        btn.classList.remove(\"loading\");\n        txt.textContent = state.label;\n      }, 900);\n    }, state.wait * 1000);\n  });\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v127",
    标题: "页面加载",
    分类: "组件",
    子类: "加载",
    风格: [
      "克制简约"
    ],
    场景: [
      "手机端网页",
      "全站通用"
    ],
    元素: [
      "动效"
    ],
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
      }
    ],
    效果说明: "首次打开页面或核心内容没就绪时，全屏加载层（logo + 光条）先顶上，就绪后整体淡出露出页面。适合重交互应用。",
    用法: "拖滑杆调加载时长、淡出时长、光条速度，点色块换主色；加载逻辑接真实的资源就绪回调，别死等。",
    提示词: "帮我做\"页面加载\"（纯 HTML/CSS/JS）：\n效果：适配首次打开页面或核心内容未加载完成的场景，全屏加载层就绪后整体淡出。\n用法示例：\n<div class=\"loader\"><div class=\"logo\">…</div><div class=\"loader-bar\">…</div></div>\n// 资源就绪后给 .loader 加 .hide（opacity 0 + visibility hidden）\n关键参数：\n- wait 加载层显示时长 / dur 淡出时长 / speed 内部光条速度 / logoSize Logo 字号 / barH 光条粗细 / showTip 显示底部提示 / spinnerOnly 只用光条不用Logo / brand Logo/品牌文字 / tip 提示文案 / bg 加载层背景色 / color 主色 / track 光条轨道色\n集成步骤：\n1. 复制 assets/demos/页面加载.html 的结构\n2. 加载逻辑接真实的资源就绪回调，别死等\n3. 配骨架落位（v108）做内容区的渐进式加载",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>页面加载演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body {\n    min-height: 100vh; font-family: system-ui, \"Microsoft YaHei\", sans-serif; color: #1a1a1a;\n    overflow: hidden;\n  }\n  .loader {\n    position: fixed; inset: 0; background: var(--bg, #fff); z-index: 10;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--gap, 22px);\n    transition: opacity var(--dur, .5s) ease, visibility var(--dur, .5s) ease;\n  }\n  .loader.hide { opacity: 0; visibility: hidden; pointer-events: none; }\n  .logo { font-size: var(--logoSize, 30px); font-weight: 900; letter-spacing: var(--letter, 4px); color: var(--color, #1a1a1a); }\n  .logo span { opacity: 0; animation: popIn .5s ease forwards; display: inline-block; }\n  .logo span:nth-child(1) { animation-delay: .1s; }\n  .logo span:nth-child(2) { animation-delay: .2s; }\n  .logo span:nth-child(3) { animation-delay: .3s; }\n  .logo span:nth-child(4) { animation-delay: .4s; }\n  @keyframes popIn { to { opacity: 1; } }\n  .loader-bar {\n    width: var(--barW, 160px); height: var(--barH, 4px); border-radius: var(--barH, 4px); background: var(--track, #eee); overflow: hidden;\n  }\n  .loader-fill {\n    height: 100%; width: 40%; border-radius: var(--barH, 4px);\n    background: var(--color, #1a1a1a);\n    animation: fillSlide var(--speed, 1.2s) ease-in-out infinite;\n  }\n  @keyframes fillSlide {\n    0%   { transform: translateX(-100%); }\n    100% { transform: translateX(400%); }\n  }\n  .loader-tip { font-size: var(--tipSize, 13px); color: #999; }\n  .page {\n    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;\n    padding: 40px; text-align: center;\n  }\n  .page h2 { font-size: 28px; }\n  .page p { font-size: 14px; color: #666; max-width: 420px; line-height: 1.8; }\n  .btn {\n    cursor: pointer; user-select: none; border: none; outline: none;\n    background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 700;\n    padding: 10px 24px; border-radius: 8px;\n  }\n</style>\n</head>\n<body>\n<div class=\"loader\" id=\"loader\">\n  <div class=\"logo\" id=\"logo\"><span id=\"logoText\"></span></div>\n  <div class=\"loader-bar\"><div class=\"loader-fill\"></div></div>\n  <div class=\"loader-tip\" id=\"tip\">页面内容准备中…</div>\n</div>\n<div class=\"page\">\n  <h2>页面主体</h2>\n  <p>首次打开或核心内容未加载完成时，先展示全屏加载层；就绪后整体淡出，露出页面主体。</p>\n  <button class=\"btn\" id=\"btn\">重播加载</button>\n</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    wait: 2,            // 加载层显示时长（秒）\n    dur: 0.5,           // 淡出时长（秒）\n    speed: 1.2,         // 内部进度条跑动速度（秒）\n    letter: 4,          // 标字母距（px）\n    gap: 22,            // 内部元素间距（px）\n    logoSize: 30,       // Logo 字号（px）\n    barW: 160,          // 进度条宽度（px）\n    barH: 4,            // 进度条粗细（px）\n    tipSize: 13,        // 提示字号（px）\n    showTip: true,      // 是否显示底部提示\n    spinnerOnly: false, // 是否只用旋转图标（不用进度条）\n    brand: \"加载完成\",  // 品牌名/Logo 文字\n    tip: \"页面内容准备中…\", // 提示文案\n    bg: \"#ffffff\",      // 加载层底色\n    color: \"#1a1a1a\",   // 主色\n    track: \"#eeeeee\"    // 进度条轨道色\n  };\n  const loader = document.getElementById(\"loader\");\n  const logoText = document.getElementById(\"logoText\");\n  const tipEl = document.getElementById(\"tip\");\n\n  function apply() {\n    const root = document.documentElement;\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--speed\", state.speed + \"s\");\n    root.style.setProperty(\"--color\", state.color);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--track\", state.track);\n    root.style.setProperty(\"--logoSize\", state.logoSize + \"px\");\n    root.style.setProperty(\"--letter\", state.letter + \"px\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--barW\", state.barW + \"px\");\n    root.style.setProperty(\"--barH\", state.barH + \"px\");\n    root.style.setProperty(\"--tipSize\", state.tipSize + \"px\");\n    logoText.innerHTML = \"\";\n    for (const ch of state.brand) {\n      const s = document.createElement(\"span\");\n      s.textContent = ch;\n      logoText.appendChild(s);\n    }\n    tipEl.textContent = state.tip;\n    tipEl.style.display = state.showTip ? \"block\" : \"none\";\n    document.querySelector(\".loader-bar\").style.display = state.spinnerOnly ? \"none\" : \"block\";\n  }\n\n  function play() {\n    loader.classList.remove(\"hide\");\n    setTimeout(() => loader.classList.add(\"hide\"), state.wait * 1000);\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", play);\n\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n  play();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v128",
    标题: "流体融合",
    分类: "背景",
    子类: "背景",
    风格: [
      "科技感",
      "轻盈灵动"
    ],
    场景: [
      "落地页",
      "全站通用"
    ],
    元素: [
      "颜色",
      "动效"
    ],
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
    效果说明: "几个低饱和色块慢慢漂移、边界呼吸形变，相遇时融合成一体（SVG 模糊+融合滤镜）。像水滴晕开、又像光在流动；前景内容保持清晰，轻量不抢主体。",
    用法: "调「融合度」看交界消失的临界点；换三个颜色配品牌色系；适合 AI、金融类产品的启动页、登录页背景。",
    提示词: "帮我做\"流体融合\"背景（纯 HTML/CSS/JS）：\n效果：几个低饱和色块慢慢漂移、边界形变，相遇时融合成液体（SVG 高斯模糊 + alpha 对比滤镜实现），前景内容保持清晰不抢主体。适合 AI / 金融类产品的启动页、登录页或转场背景。\n用法示例：\n<svg width=\"0\" height=\"0\"><filter id=\"goo\"><feGaussianBlur stdDeviation=\"18\"/><feColorMatrix values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9\"/></filter></svg>\n<div class=\"goo\"><div class=\"blob\"></div>...</div>\n关键参数：\n- count 色块数量 / size 色块大小（px） / moveSpeed 漂移速度（倍） / morphSpeed 形变速度（倍） / blur 柔化程度（px） / goo 融合度 / color1 颜色一 / color2 颜色二 / color3 颜色三 / bg 背景色 / alpha 整体透明度 / showCard 显示中间示例内容\n集成步骤：\n1. 复制 assets/demos/流体融合.html 的滤镜与色块结构\n2. 色块层放内容层之下（z-index），保证文字可读\n3. 配绸缎渐变（s201）做同色系的静态版背景",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>流体融合演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #f4f6fb; }\n  /* 色块层：整体过 goo 滤镜，色块相遇时融合成液体 */\n  .goo { position: absolute; inset: 0; filter: url(#goo); opacity: .85; }\n  .blob { position: absolute; }\n  /* 前景示例内容：证明「轻量化不抢主体」 */\n  .card { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center; color: #333c4e; }\n  .card h1 { font-size: 30px; letter-spacing: 6px; margin-bottom: 10px; font-weight: 900; }\n  .card p { font-size: 13px; opacity: .7; letter-spacing: 2px; }\n  .hint { position: absolute; left: 12px; bottom: 10px; font-size: 12px; color: rgba(30,40,60,.5); }\n</style>\n</head>\n<body>\n<!-- goo 滤镜：先高斯模糊，再把 alpha 通道拉开对比 → 模糊的交界被「焊」成液体 -->\n<svg width=\"0\" height=\"0\"><filter id=\"goo\">\n  <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"18\" result=\"b\"/>\n  <feColorMatrix in=\"b\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9\"/>\n</filter></svg>\n<div class=\"goo\" id=\"goo\"></div>\n<div class=\"card\" id=\"card\">\n  <h1>灵 感 弹 药 库</h1>\n  <p>低饱和流体 · 启动页 / 转场背景</p>\n</div>\n<div class=\"hint\">色块慢慢漂移，相遇时融合成液体——调「融合度」看交界消失的临界点</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    count: 4,          // 色块数量\n    size: 160,         // 色块大小（px）\n    moveSpeed: 1,      // 漂移速度（倍）\n    morphSpeed: 1,     // 形变速度（倍）\n    blur: 18,          // 柔化程度（px）\n    goo: 16,           // 融合度（越高越容易融在一起）\n    color1: \"#7fa8d9\", // 颜色一（低饱和蓝）\n    color2: \"#b8a7d9\", // 颜色二（低饱和紫）\n    color3: \"#8fd0c3\", // 颜色三（低饱和青）\n    bg: \"#f4f6fb\",     // 背景色\n    alpha: 0.85,       // 整体透明度\n    showCard: true     // 显示中间示例内容\n  };\n  const gooEl = document.getElementById(\"goo\");\n  const card = document.getElementById(\"card\");\n  const blurNode = document.querySelector(\"#goo feGaussianBlur\");\n  const matrixNode = document.querySelector(\"#goo feColorMatrix\");\n  let blobs = [];\n\n  // 重建色块（数量变化时调用）\n  function build() {\n    gooEl.innerHTML = \"\";\n    blobs = [];\n    for (let i = 0; i < state.count; i++) {\n      const el = document.createElement(\"div\");\n      el.className = \"blob\";\n      gooEl.appendChild(el);\n      blobs.push({ el, seed: i * 1.7 + 0.3 }); // seed 让每个色块轨迹错开\n    }\n    paint();\n  }\n\n  // 把参数落到 DOM / 滤镜上\n  function paint() {\n    const cs = [state.color1, state.color2, state.color3];\n    blobs.forEach((b, i) => {\n      b.el.style.width = b.el.style.height = state.size + \"px\";\n      b.el.style.background = cs[i % cs.length];\n    });\n    document.body.style.background = state.bg;\n    gooEl.style.opacity = state.alpha;\n    card.style.display = state.showCard ? \"\" : \"none\";\n    blurNode.setAttribute(\"stdDeviation\", state.blur);\n    // 融合度 → alpha 通道斜率：斜率越大，模糊交界被切得越「干脆」\n    const slope = 9 + state.goo;\n    matrixNode.setAttribute(\"values\", \"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 \" + slope + \" \" + (-(slope * 0.55)));\n  }\n  function apply() { build(); }\n\n  // 动画循环：色块各走椭圆轨迹 + 边界呼吸形变\n  let t = 0;\n  function frame() {\n    t += 0.016 * state.moveSpeed;\n    blobs.forEach(b => {\n      const s = b.seed;\n      const cx = 50 + 26 * Math.sin(t * 0.5 + s);        // 中心 x（百分比）\n      const cy = 50 + 24 * Math.cos(t * 0.38 + s * 2);   // 中心 y（百分比）\n      const m = Math.sin(t * state.morphSpeed + s * 3);  // 形变量（-1~1）\n      b.el.style.left = cx + \"%\";\n      b.el.style.top = cy + \"%\";\n      b.el.style.transform = \"translate(-50%,-50%) rotate(\" + (t * 8 + s * 40) + \"deg) scale(\" + (1 + m * 0.12) + \")\";\n      b.el.style.borderRadius = (46 + m * 6) + \"% \" + (54 - m * 6) + \"% \" + (58 + m * 4) + \"% \" + (42 - m * 4) + \"% / \" +\n        (52 - m * 5) + \"% \" + (44 + m * 5) + \"% \" + (56 - m * 4) + \"% \" + (48 + m * 4) + \"%\";\n    });\n    requestAnimationFrame(frame);\n  }\n  build();\n  requestAnimationFrame(frame);\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v129",
    标题: "网格吸附",
    分类: "动画",
    子类: "转场",
    风格: [
      "克制简约",
      "科技感"
    ],
    场景: [
      "作品集",
      "多页网站"
    ],
    元素: [
      "版面",
      "动效"
    ],
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
    效果说明: "自由态：卡片散布 + 鼠标视差、背景反向漂移；点切换后卡片带错峰动画吸附进精准网格，网格线浮现、背景缩小退后——从「自由浏览」切到「秩序浏览」，一秒提升空间感与层级感。",
    用法: "点按钮看吸附/释放两个方向；调「逐个错峰」看卡片像被磁铁逐个吸走；网格态视差自动收小，保持秩序感。",
    提示词: "帮我做\"网格吸附\"布局切换（纯 HTML/CSS/JS）：\n效果：默认卡片自由散布 + 鼠标视差（背景反向漂移）；切换时卡片带错峰动画吸附进精准网格，网格线浮现、背景缩小退后——从「自由浏览」切到「秩序浏览」。\n用法示例：\n<div class=\"stage\"><div class=\"bg\"></div><div class=\"gridlines\"></div><div class=\"cell\"><div class=\"inner\">01</div></div>...</div>\n// 切换：cells 依次 transition-delay 错峰，transform 落到网格坐标\n关键参数：\n- cols 列数 / gap 网格间距（px） / radius 卡片圆角（px） / dur 吸附时长（秒） / stagger 逐个错峰（秒） / ease 缓动方式 / parallax 视差强度（px） / bgShift 背景反向漂移（px） / gridShow 显示网格线 / gridColor 网格线颜色 / cardBg 卡片底色 / scatter 散布幅度（px）\n集成步骤：\n1. 复制 assets/demos/网格吸附.html 的双层结构（外层管吸附定位、内层管视差）\n2. 把 inner 换成真实内容（图片/卡片）\n3. 配文字遮罩（r001）丰富滚动层",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>网格吸附演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #eef0f4; }\n  .stage { position: absolute; inset: 0; overflow: hidden; }\n  /* 背景层：吸附时反向漂移 + 缩小退后 */\n  .bg { position: absolute; inset: -60px; background: linear-gradient(135deg, #dfe7f5, #e9e2f2 55%, #dbeaf0);\n    transition: transform var(--dur) var(--ease), filter var(--dur) var(--ease); }\n  /* 网格线：吸附时浮现，标出「精准坐标」 */\n  .gridlines { position: absolute; inset: 0; opacity: 0; transition: opacity var(--dur) ease;\n    background-image: linear-gradient(var(--gridc) 1px, transparent 1px), linear-gradient(90deg, var(--gridc) 1px, transparent 1px);\n    background-size: var(--cell) var(--cell); background-position: center; }\n  /* 卡片：外层管吸附定位（带过渡），内层管鼠标视差（即时跟手） */\n  .cell { position: absolute; transition: transform var(--dur) var(--ease), width var(--dur) var(--ease), height var(--dur) var(--ease); }\n  .inner { position: absolute; inset: 0; border-radius: var(--radius); background: var(--cardbg);\n    box-shadow: 0 6px 18px rgba(20, 30, 60, .1); display: flex; align-items: center; justify-content: center;\n    font-weight: 800; color: #9aa4b8; font-size: 18px; }\n  .btn { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); cursor: pointer; border: none;\n    background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 700; padding: 10px 26px; border-radius: 8px; }\n  .btn:active { transform: translateX(-50%) scale(.96); }\n  .hint { position: absolute; left: 12px; bottom: 10px; font-size: 12px; color: rgba(30,40,60,.5); }\n</style>\n</head>\n<body>\n<div class=\"stage\" id=\"stage\">\n  <div class=\"bg\" id=\"bg\"></div>\n  <div class=\"gridlines\" id=\"gridlines\"></div>\n  <div id=\"cells\"></div>\n</div>\n<button class=\"btn\" id=\"btn\">吸附到网格</button>\n<div class=\"hint\">先移动鼠标看自由视差，再点按钮看「自由 → 网格 → 释放」的切换</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    cols: 3,              // 列数\n    gap: 20,              // 网格间距（px）\n    radius: 12,           // 卡片圆角（px）\n    dur: 0.6,             // 吸附时长（秒）\n    stagger: 0.08,        // 逐个错峰（秒）\n    ease: \"先快后慢\",      // 缓动方式\n    parallax: 14,         // 视差强度（px）\n    bgShift: 10,          // 背景反向漂移（px）\n    gridShow: true,       // 显示网格线\n    gridColor: \"#c5cddd\", // 网格线颜色\n    cardBg: \"#ffffff\",    // 卡片底色\n    scatter: 70           // 散布幅度（px）\n  };\n  // 缓动名 → 贝塞尔曲线\n  const EASE = { \"先快后慢\": \"cubic-bezier(.22,1,.36,1)\", \"匀速\": \"linear\", \"回弹\": \"cubic-bezier(.34,1.56,.64,1)\" };\n  const gridlines = document.getElementById(\"gridlines\");\n  const cellsBox = document.getElementById(\"cells\");\n  const bg = document.getElementById(\"bg\");\n  const btn = document.getElementById(\"btn\");\n  let grid = false, cells = [];\n\n  // 伪随机（固定种子，保证每次刷新散布一致）\n  const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5; return x - Math.floor(x); };\n\n  // 生成卡片：先算网格基准位，再叠散布偏移\n  function build() {\n    cellsBox.innerHTML = \"\";\n    cells = [];\n    const rows = 3, pad = 60;\n    const cardW = Math.min(180, (innerWidth - pad * 2 - state.gap * (state.cols - 1)) / state.cols);\n    const cardH = Math.min(120, (innerHeight - pad * 2 - state.gap * (rows - 1)) / rows);\n    const totalW = state.cols * cardW + state.gap * (state.cols - 1);\n    const totalH = rows * cardH + state.gap * (rows - 1);\n    const x0 = (innerWidth - totalW) / 2, y0 = (innerHeight - totalH) / 2;\n    for (let r = 0; r < rows; r++) {\n      for (let c = 0; c < state.cols; c++) {\n        const i = r * state.cols + c;\n        const cell = document.createElement(\"div\");\n        cell.className = \"cell\";\n        const inner = document.createElement(\"div\");\n        inner.className = \"inner\";\n        inner.textContent = String(i + 1).padStart(2, \"0\");\n        cell.appendChild(inner);\n        cellsBox.appendChild(cell);\n        cells.push({\n          el: cell, inner, i, w: cardW, h: cardH,\n          gx: x0 + c * (cardW + state.gap), gy: y0 + r * (cardH + state.gap), // 网格基准位\n          ox: (rnd(i) - 0.5) * 2 * state.scatter,                             // 自由态偏移\n          oy: (rnd(i + 50) - 0.5) * 2 * state.scatter,\n          rot: (rnd(i + 99) - 0.5) * 14,\n          depth: 0.4 + rnd(i + 7) * 0.6                                       // 视差深度（各不相同）\n        });\n      }\n    }\n    // 网格线间距 = 卡片宽 + 间距\n    document.documentElement.style.setProperty(\"--cell\", (cardW + state.gap) + \"px\");\n    layout();\n  }\n\n  // 布局：自由态（散布+旋转） ⇄ 网格态（精准对齐）\n  function layout() {\n    cells.forEach(c => {\n      const x = grid ? c.gx : c.gx + c.ox;\n      const y = grid ? c.gy : c.gy + c.oy;\n      c.el.style.width = c.w + \"px\";\n      c.el.style.height = c.h + \"px\";\n      c.el.style.transform = \"translate(\" + x + \"px,\" + y + \"px) rotate(\" + (grid ? 0 : c.rot) + \"deg)\";\n      c.el.style.transitionDelay = (c.i * state.stagger) + \"s\"; // 逐个错峰\n    });\n    gridlines.style.opacity = (grid && state.gridShow) ? 0.8 : 0;\n  }\n\n  // 参数落地\n  function apply() {\n    const root = document.documentElement.style;\n    root.setProperty(\"--dur\", state.dur + \"s\");\n    root.setProperty(\"--ease\", EASE[state.ease] || EASE[\"先快后慢\"]);\n    root.setProperty(\"--radius\", state.radius + \"px\");\n    root.setProperty(\"--gridc\", state.gridColor);\n    root.setProperty(\"--cardbg\", state.cardBg);\n    build();\n  }\n\n  // 切换：自由 ⇄ 网格\n  btn.addEventListener(\"click\", () => {\n    grid = !grid;\n    btn.textContent = grid ? \"释放\" : \"吸附到网格\";\n    layout();\n  });\n\n  // 鼠标视差：卡片轻微跟手（各自深度不同），背景反向漂移\n  addEventListener(\"mousemove\", e => {\n    const mx = e.clientX / innerWidth * 2 - 1;\n    const my = e.clientY / innerHeight * 2 - 1;\n    cells.forEach(c => {\n      const k = grid ? 0.25 : 1; // 网格态视差收着点，保持秩序感\n      c.inner.style.transform = \"translate(\" + mx * state.parallax * c.depth * k + \"px,\" + my * state.parallax * c.depth * k + \"px)\";\n    });\n    bg.style.transform = \"translate(\" + -mx * state.bgShift + \"px,\" + -my * state.bgShift + \"px)\" + (grid ? \" scale(.94)\" : \"\");\n    bg.style.filter = grid ? \"saturate(.75) brightness(.97)\" : \"none\";\n  });\n\n  apply();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v130",
    标题: "3D 沉浸滚动",
    分类: "背景",
    子类: "背景",
    风格: [
      "科技感",
      "仪式感"
    ],
    场景: [
      "落地页",
      "科技公司"
    ],
    元素: [
      "动效"
    ],
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
    效果说明: "多层元素分布在纵深轴上，滚动推进「镜头」穿过层层内容，鼠标轻移带视角倾斜——像走进一条 3D 长廊。与 3D 背景（w006）分工：那条是氛围装饰，这条是主体场景，专治「用户凭什么记住你」。",
    用法: "滚轮推进镜头；调「层数/纵深距离」改变长廊长度，「视角跟随」控制鼠标灵敏度；换形状看圆环/方块/圆点三种气质。",
    提示词: "帮我做\"3D 沉浸滚动\"场景（纯 CSS 3D + JS，不用 Three.js）：\n效果：多层元素分布在纵深轴上，滚动推进「镜头」穿过层层内容，鼠标轻移带视角倾斜——像走进一条 3D 长廊。适合品牌官网首屏、作品集的沉浸式段落。\n用法示例：\n<div class=\"viewport\" style=\"perspective:1000px;overflow-y:scroll\"><div class=\"world\" style=\"transform-style:preserve-3d;position:sticky;top:0\">...</div></div>\n// 滚动：world.style.transform = translateZ(进度×纵深) rotateX/Y(鼠标视角)\n关键参数：\n- layers 层数 / depth 纵深距离（px） / persp 透视强度（px，越小越夸张） / tilt 视角跟随（度） / spin 自转速度 / size 元素大小（px） / shape 形状 / color1 主色 / color2 辅色 / bg 背景色 / glow 发光 / fade 远处渐隐\n集成步骤：\n1. 复制 assets/demos/3D沉浸滚动.html 的 sticky + 400vh 滚动结构\n2. 层元素换成品牌图形/产品图（每层一个 z 位置）\n3. 配 3D 背景（w006）做氛围层：w006 是背景装饰，这条是主体场景",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>3D 沉浸滚动演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { height: 100vh; overflow: hidden; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #0a0e1a; }\n  /* 可滚动舞台：perspective 提供透视，滚动条藏掉 */\n  .viewport { position: absolute; inset: 0; overflow-y: scroll; perspective: 1000px; }\n  .viewport::-webkit-scrollbar { display: none; }\n  .spacer { height: 400vh; } /* 撑出滚动距离 = 镜头推进的路程 */\n  /* 3D 世界：sticky 钉在视口里，translateZ 由滚动进度驱动 */\n  .world { position: sticky; top: 0; height: 100vh; transform-style: preserve-3d; }\n  .layer { position: absolute; left: 50%; top: 50%; }\n  .hint { position: absolute; left: 12px; bottom: 10px; font-size: 12px; color: rgba(255,255,255,.45); z-index: 5; }\n  /* 底部进度条 */\n  .progress { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: rgba(255,255,255,.08); z-index: 5; }\n  .progress i { display: block; height: 100%; width: 0; background: var(--c1); transition: width .1s linear; }\n</style>\n</head>\n<body>\n<div class=\"viewport\" id=\"viewport\">\n  <div class=\"world\" id=\"world\"></div>\n  <div class=\"spacer\"></div>\n</div>\n<div class=\"hint\" id=\"hint\">滚动滚轮推进镜头穿过层层元素 · 鼠标轻移带视角倾斜</div>\n<div class=\"progress\"><i id=\"pfill\"></i></div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    layers: 8,          // 层数\n    depth: 1600,        // 纵深距离（px）\n    persp: 1000,        // 透视强度（px，越小透视越夸张）\n    tilt: 6,            // 视角跟随（度）\n    spin: 0.3,          // 自转速度（度/帧）\n    size: 110,          // 元素大小（px）\n    shape: \"圆环\",       // 形状\n    color1: \"#6f9bff\",  // 主色\n    color2: \"#a8c8ff\",  // 辅色\n    bg: \"#0a0e1a\",      // 背景色\n    glow: true,         // 发光\n    fade: true          // 远处渐隐\n  };\n  const viewport = document.getElementById(\"viewport\");\n  const world = document.getElementById(\"world\");\n  const pfill = document.getElementById(\"pfill\");\n  let layerEls = [];\n\n  // 伪随机（固定种子，元素位置刷新后一致）\n  const rnd = i => { const x = Math.sin(i * 91.7 + 47.3) * 43758.5; return x - Math.floor(x); };\n\n  // 生成纵深层：每层一个 z 位置 + 平面偏移\n  function build() {\n    world.innerHTML = \"\";\n    layerEls = [];\n    for (let i = 0; i < state.layers; i++) {\n      const el = document.createElement(\"div\");\n      el.className = \"layer\";\n      const s = state.size * (0.7 + rnd(i) * 0.6); // 大小错落\n      // 形状：圆环 / 方块 / 圆点\n      if (state.shape === \"圆环\") {\n        el.style.border = \"2px solid \" + (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"50%\";\n      } else if (state.shape === \"方块\") {\n        el.style.background = (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"10px\";\n      } else {\n        el.style.background = (i % 2 ? state.color2 : state.color1);\n        el.style.borderRadius = \"50%\";\n        el.style.filter = \"blur(1px)\";\n      }\n      if (state.glow) el.style.boxShadow = \"0 0 30px \" + (i % 2 ? state.color2 : state.color1) + \"55\";\n      el.style.width = el.style.height = s + \"px\";\n      const z = -(i + 1) * state.depth / state.layers;   // 纵深位置\n      const px = (rnd(i + 31) - 0.5) * 340;              // 平面偏移（错落分布）\n      const py = (rnd(i + 67) - 0.5) * 220;\n      el.style.marginLeft = -s / 2 + \"px\";\n      el.style.marginTop = -s / 2 + \"px\";\n      el.dataset.z = z;\n      el.dataset.px = px;\n      el.dataset.py = py;\n      world.appendChild(el);\n      layerEls.push(el);\n    }\n    document.body.style.background = state.bg;\n    render();\n  }\n\n  let progress = 0, mx = 0, my = 0, spinAngle = 0;\n  function render() {\n    // 世界：镜头推进（translateZ = 进度 × 纵深） + 鼠标视角 + 慢速自转\n    spinAngle += state.spin * 0.1;\n    world.style.transform =\n      \"translateZ(\" + (progress * state.depth * 0.92) + \"px)\" +\n      \" rotateY(\" + (mx * state.tilt + spinAngle) + \"deg)\" +\n      \" rotateX(\" + (-my * state.tilt) + \"deg)\";\n    // 每层：根据「离镜头的距离」决定透明度（远处渐隐、越过的淡出）\n    layerEls.forEach(el => {\n      const z = +el.dataset.z + progress * state.depth * 0.92; // 相对镜头的深度\n      let a = 1;\n      if (state.fade) a = Math.max(0, Math.min(1, (z + 80) / (state.depth * 0.7)));\n      el.style.opacity = a;\n      el.style.transform = \"translate3d(\" + el.dataset.px + \"px,\" + el.dataset.py + \"px,\" + el.dataset.z + \"px)\";\n    });\n    pfill.style.width = (progress * 100) + \"%\";\n  }\n\n  // 滚动 → 进度 0~1\n  viewport.addEventListener(\"scroll\", () => {\n    progress = viewport.scrollTop / (viewport.scrollHeight - innerHeight || 1);\n    render();\n  });\n  // 鼠标 → 视角倾斜\n  addEventListener(\"mousemove\", e => {\n    mx = e.clientX / innerWidth * 2 - 1;\n    my = e.clientY / innerHeight * 2 - 1;\n    render();\n  });\n  // 自转持续运转\n  (function loop() { if (state.spin > 0) render(); requestAnimationFrame(loop); })();\n\n  function apply() {\n    viewport.style.perspective = state.persp + \"px\";\n    document.documentElement.style.setProperty(\"--c1\", state.color1);\n    build();\n  }\n  apply();\n\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v131",
    标题: "动效节奏",
    分类: "方案",
    风格: [
      "克制简约"
    ],
    场景: [
      "全站通用"
    ],
    元素: [
      "动效"
    ],
    搭配: [
      "转场衔接"
    ],
    标签: [
      "缓动",
      "时长",
      "规范",
      "对比"
    ],
    来源: "视频拆解：6 种 UI 设计动效之动效系统规范（2026-08-30 用户提供，QQ 空间相册转场曲线；实现代码自写）",
    效果演示: "assets/demos/动效节奏.html",
    参数: [
      {
        键: "dur",
        名: "时长（秒）",
        类型: "slider",
        最小: 0.3,
        最大: 2,
        步长: 0.05,
        默认: 0.8
      },
      {
        键: "dist",
        名: "位移距离（px）",
        类型: "slider",
        最小: 40,
        最大: 200,
        步长: 5,
        默认: 120
      },
      {
        键: "scale",
        名: "缩放幅度",
        类型: "slider",
        最小: 0,
        最大: 0.3,
        步长: 0.01,
        默认: 0.12
      },
      {
        键: "ease",
        名: "转场缓动",
        类型: "select",
        选项: [
          "减速度曲线",
          "先快后慢",
          "匀速",
          "回弹"
        ],
        默认: "减速度曲线"
      },
      {
        键: "color",
        名: "强调色",
        类型: "color",
        默认: "#2b6cff"
      },
      {
        键: "track",
        名: "轨道色",
        类型: "color",
        默认: "#eef1f5"
      },
      {
        键: "bg",
        名: "背景色",
        类型: "color",
        默认: "#fafafa"
      },
      {
        键: "panel",
        名: "面板底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "ballSize",
        名: "小球大小（px）",
        类型: "slider",
        最小: 8,
        最大: 24,
        步长: 1,
        默认: 14
      },
      {
        键: "labelShow",
        名: "显示曲线名称",
        类型: "switch",
        默认: true
      },
      {
        键: "showCurve",
        名: "显示曲线图",
        类型: "switch",
        默认: true
      },
      {
        键: "loop",
        名: "自动循环",
        类型: "switch",
        默认: false
      }
    ],
    效果说明: "三种转场模式（容器转场/位移/淡入淡出）并排对比 + 四种缓动曲线同场赛跑。讲的是「动效系统」：全站统一时长与 1-2 条缓动曲线，动效才有一致的呼吸感，团队协作也省沟通成本。减速度曲线出自 QQ 空间相册转场，符合物理直觉。",
    用法: "点「重播全部」看四种曲线的差异；调「时长」感受节奏变化；定规范推荐 0.3-0.8 秒 + 减速度曲线起步。",
    提示词: "帮我做\"动效节奏\"规范页（纯 HTML/CSS/JS）：\n效果：三种转场模式（容器转场/位移/淡入淡出）并排对比 + 四种缓动曲线（匀速/先快后慢/减速度曲线/回弹）同场赛跑，统一时长与缓动让全站动效有一致的节奏感。减速度曲线 cubic-bezier(0,0,.15,1) 出自 QQ 空间相册转场，符合物理直觉。\n用法示例：\n.ball { transition: transform var(--dur) cubic-bezier(0,0,.15,1); }\n关键参数：\n- dur 时长（秒） / dist 位移距离（px） / scale 缩放幅度 / ease 转场缓动 / color 强调色 / track 轨道色 / bg 背景色 / panel 面板底色 / ballSize 小球大小（px） / labelShow 显示曲线名称 / showCurve 显示曲线图 / loop 自动循环\n集成步骤：\n1. 复制 assets/demos/动效节奏.html 的对比结构\n2. 定下全站统一的时长（推荐 0.3-0.8 秒）和 1-2 条缓动曲线，写进全局 CSS 变量\n3. 配转场衔接（v120）把规范落到页面切换上",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>动效节奏演示</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { min-height: 100vh; font-family: system-ui, \"Microsoft YaHei\", sans-serif; background: #fafafa; color: #1a1a1a; padding: 20px; }\n  h1 { font-size: 17px; margin-bottom: 4px; }\n  .sub { font-size: 12px; color: #888; margin-bottom: 16px; }\n  h2 { font-size: 13px; color: #555; margin: 18px 0 10px; }\n  /* 三种转场模式并排 */\n  .modes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n  .panel { background: var(--panel); border: 1px solid #ececec; border-radius: 10px; padding: 10px; }\n  .panel h3 { font-size: 12px; margin-bottom: 8px; }\n  .demo { position: relative; height: 84px; border-radius: 8px; background: var(--track); overflow: hidden; }\n  /* 容器转场：小胶囊变形成大卡片 */\n  .chip { position: absolute; left: 10px; top: 28px; width: 40%; height: 28px; border-radius: 14px; background: var(--color);\n    transform: scale(calc(1 - var(--scale)));\n    transition: width var(--dur) var(--ease), height var(--dur) var(--ease), top var(--dur) var(--ease), border-radius var(--dur) var(--ease), transform var(--dur) var(--ease); }\n  .demo.play .chip { width: calc(100% - 20px); height: 62px; top: 11px; border-radius: 10px; transform: scale(1); }\n  /* 位移：从左滑入 */\n  .slider { position: absolute; left: 10px; top: 11px; width: calc(100% - 20px); height: 62px; border-radius: 10px; background: var(--color);\n    transform: translateX(var(--dist-neg)); transition: transform var(--dur) var(--ease); }\n  .demo.play .slider { transform: translateX(0); }\n  /* 淡入淡出：纯透明度 */\n  .fader { position: absolute; inset: 10px; border-radius: 10px; background: var(--color); opacity: 0;\n    transition: opacity var(--dur) var(--ease); }\n  .demo.play .fader { opacity: 1; }\n  /* 缓动曲线赛跑 */\n  .lane { display: grid; grid-template-columns: 96px 1fr; gap: 8px; align-items: center; margin-bottom: 8px; }\n  .lane .name { font-size: 12px; color: #555; }\n  .lane .name code { display: block; font-size: 10px; color: #999; font-family: Consolas, monospace; }\n  .track { position: relative; height: 26px; border-radius: 13px; background: var(--track); }\n  .ball { position: absolute; left: 4px; top: 50%; border-radius: 50%; background: var(--color);\n    transform: translateY(-50%); }\n  .curve { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); opacity: .9; }\n  .btn { cursor: pointer; border: none; background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 700;\n    padding: 8px 22px; border-radius: 8px; margin-bottom: 6px; }\n  .hint { font-size: 12px; color: #999; margin-top: 14px; }\n</style>\n</head>\n<body>\n<h1>动效节奏规范</h1>\n<div class=\"sub\">三种转场模式 × 四种缓动曲线——全站统一时长与缓动，动效才有一致的「呼吸」</div>\n<button class=\"btn\" id=\"btn\">重播全部</button>\n\n<h2>三种转场模式</h2>\n<div class=\"modes\">\n  <div class=\"panel\"><h3>① 容器转场（就地变形）</h3><div class=\"demo\" id=\"m1\"><div class=\"chip\"></div></div></div>\n  <div class=\"panel\"><h3>② 位移（滑入）</h3><div class=\"demo\" id=\"m2\"><div class=\"slider\"></div></div></div>\n  <div class=\"panel\"><h3>③ 淡入淡出</h3><div class=\"demo\" id=\"m3\"><div class=\"fader\"></div></div></div>\n</div>\n\n<h2>四种缓动曲线赛跑（同一时长）</h2>\n<div id=\"lanes\"></div>\n\n<div class=\"hint\">减速度曲线出自 QQ 空间相册转场：起步快、收尾慢，符合物体运动直觉</div>\n<script>\n  // 默认参数（父页面详情页可调）\n  const state = {\n    dur: 0.8,          // 时长（秒）\n    dist: 120,         // 位移距离（px）\n    scale: 0.12,       // 缩放幅度\n    ease: \"减速度曲线\",  // 转场模式用的缓动\n    color: \"#2b6cff\",  // 强调色\n    track: \"#eef1f5\",  // 轨道色\n    bg: \"#fafafa\",     // 背景色\n    panel: \"#ffffff\",  // 面板底色\n    ballSize: 14,      // 小球大小（px）\n    labelShow: true,   // 显示曲线名称\n    showCurve: true,   // 显示曲线图\n    loop: false        // 自动循环\n  };\n  // 缓动库：名字 → cubic-bezier\n  const EASES = {\n    \"匀速\": \"linear\",\n    \"先快后慢\": \"cubic-bezier(.25,.8,.35,1)\",\n    \"减速度曲线\": \"cubic-bezier(0,0,.15,1)\",   // QQ 空间相册同款\n    \"回弹\": \"cubic-bezier(.34,1.56,.64,1)\"\n  };\n  const lanesBox = document.getElementById(\"lanes\");\n  const demos = [document.getElementById(\"m1\"), document.getElementById(\"m2\"), document.getElementById(\"m3\")];\n\n  // 画一条迷你曲线图（SVG path 近似贝塞尔）\n  function curveSvg(bezier) {\n    const m = bezier.match(/cubic-bezier\\(([\\d.]+),\\s*([\\d.-]+),\\s*([\\d.]+),\\s*([\\d.-]+)\\)/);\n    let d;\n    if (!m) { d = \"M2,18 L58,2\"; } // linear 直线\n    else {\n      const [, x1, y1, x2, y2] = m.map(Number);\n      const X = v => 2 + v * 56, Y = v => 20 - v * 18;\n      d = \"M2,20 C\" + X(x1) + \",\" + Y(y1) + \" \" + X(x2) + \",\" + Y(y2) + \" 58,2\";\n    }\n    return '<svg class=\"curve\" width=\"60\" height=\"24\" viewBox=\"0 0 60 24\">' +\n      '<path d=\"' + d + '\" fill=\"none\" stroke=\"var(--color)\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>';\n  }\n\n  // 生成四条赛跑道\n  function build() {\n    lanesBox.innerHTML = \"\";\n    Object.entries(EASES).forEach(([name, bz]) => {\n      const lane = document.createElement(\"div\");\n      lane.className = \"lane\";\n      const nameEl = document.createElement(\"div\");\n      nameEl.className = \"name\";\n      nameEl.innerHTML = name + (name === \"减速度曲线\" ? \"<code>cubic-bezier(0,0,.15,1)</code>\" : \"\");\n      const track = document.createElement(\"div\");\n      track.className = \"track\";\n      track.innerHTML = '<div class=\"ball\" data-bz=\"' + bz + '\"></div>' + (state.showCurve ? curveSvg(bz) : \"\");\n      lane.append(nameEl, track);\n      lanesBox.appendChild(lane);\n    });\n    apply();\n  }\n\n  // 参数落地\n  function apply() {\n    const root = document.documentElement.style;\n    root.setProperty(\"--dur\", state.dur + \"s\");\n    root.setProperty(\"--ease\", EASES[state.ease] || EASES[\"减速度曲线\"]);\n    root.setProperty(\"--dist-neg\", -state.dist + \"px\");\n    root.setProperty(\"--scale\", state.scale);\n    root.setProperty(\"--color\", state.color);\n    root.setProperty(\"--track\", state.track);\n    root.setProperty(\"--panel\", state.panel);\n    document.body.style.background = state.bg;\n    document.querySelectorAll(\".name\").forEach(n => n.style.display = state.labelShow ? \"\" : \"none\");\n    document.querySelectorAll(\".ball\").forEach(b => {\n      b.style.width = b.style.height = state.ballSize + \"px\";\n    });\n    document.querySelectorAll(\".curve\").forEach(c => c.style.display = state.showCurve ? \"\" : \"none\");\n    // 回弹球允许飞出轨道一点，视觉上看到「过头」\n    document.querySelectorAll(\".track\").forEach(t => t.style.overflow = \"visible\");\n  }\n\n  // 重播：先归零，强制回流，再播放\n  function play() {\n    demos.forEach(d => { d.classList.remove(\"play\"); });\n    document.querySelectorAll(\".ball\").forEach(b => { b.style.transition = \"none\"; b.style.transform = \"translateY(-50%) translateX(0)\"; });\n    void document.body.offsetWidth; // 强制回流，重置过渡\n    demos.forEach(d => d.classList.add(\"play\"));\n    document.querySelectorAll(\".ball\").forEach(b => {\n      b.style.transition = \"transform var(--dur) \" + b.dataset.bz;\n      // 滚动距离 = 轨道宽 - 球宽 - 边距\n      const track = b.parentElement;\n      const dist = track.clientWidth - state.ballSize - 8;\n      b.style.transform = \"translateY(-50%) translateX(\" + dist + \"px)\";\n    });\n  }\n  document.getElementById(\"btn\").addEventListener(\"click\", play);\n\n  // 自动循环\n  let timer = null;\n  function setLoop() {\n    clearInterval(timer);\n    if (state.loop) timer = setInterval(play, (state.dur + 0.6) * 1000);\n  }\n\n  build();\n  play();\n  // 接收父页面（index.html 详情页）传来的参数\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    if (d.key === \"loop\") { setLoop(); return; }\n    build();\n    play();\n  });\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "soa01",
    标题: "滚动揭示入场",
    分类: "动画",
    子类: "转场",
    风格: [
      "克制简约"
    ],
    场景: [
      "全站通用",
      "落地页",
      "多页网站"
    ],
    元素: [
      "动效"
    ],
    搭配: [
      "大序号分章",
      "文字逐行"
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
        步长: 0.05,
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
    效果说明: "多个内容区块进入视口时，从下方淡入并上移复位，缓动用 state 站招牌的 cubic-bezier(.44,0,.56,1)（平滑进出），比生硬的「啪一下出现」高级得多。\n三把尺子：克制（只动位移到 0、透明度 0→1，不加花哨形变）、节奏（错峰延迟让区块依次进场，不糊成一团）、焦点（滚动到才动，用户的视线被自然引导）。适合落地页分节、产品功能逐条揭示。",
    用法: "右侧调参面板可调：位移距离、时长、透明度起点、模糊开关、触发阈值、错峰延迟、底色、文字色、圆角、内容宽度、对齐。改完滚动或点「重播」立刻看效果。",
    提示词: "①效果：做一组滚动揭示入场区块——进入视口时从下方（translateY 从 dist 到 0）淡入，透明度 0→1，缓动用 cubic-bezier(.44,0,.56,1)，支持错峰延迟逐个进场，可选入场模糊。\n②用法示例：落地页三段功能介绍，每块进入视口时上移 40px 淡入，间隔 0.12s 依次出现，深色卡片配浅色文字。\n③关键参数（与调参面板一致）：位移距离 dist 默认 40（px）；时长 dur 默认 0.8（秒）；透明度起点 opStart 默认 0；入场模糊 blur 默认 false（开关）；触发阈值 thresh 默认 0.2；错峰延迟 stagger 默认 0.12（秒）；底色 bg 默认 #0e0e0e；文字色 fg 默认 #f5f5f5；圆角 radius 默认 16（px）；内容宽度 width 默认 560（px）；对齐 align 默认 左（选项 左/中/右）。\n④集成步骤：复制 assets/demos/滚动揭示.html 单文件；用 IntersectionObserver 监听每个 .block 进入视口（threshold 用 state.thresh）后加 .in 类触发 CSS 过渡；详情页通过 postMessage({type:'param',key,value}) 实时改 state，apply() 重设 CSS 变量，点「重播」会 disconnect 旧 observer 并重新观察。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:#fafafa;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .wrap{width:var(--width);max-width:92vw;margin:0 auto;padding:14vh 16px;display:flex;flex-direction:column;gap:16vh;}\n  /* 区块初始：下移 dist + 透明度 opStart；进入视口加 .in 复位，缓动平滑进出 */\n  .block{background:var(--bg);color:var(--fg);border-radius:var(--radius);padding:46px 40px;\n    text-align:var(--align);line-height:1.6;font-size:17px;\n    opacity:var(--opStart);transform:translateY(var(--dist));\n    transition:opacity var(--dur) var(--ease),transform var(--dur) var(--ease),filter var(--dur) var(--ease);}\n  .block.in{opacity:1;transform:translateY(0);}\n  .block.bf{filter:blur(12px);} .block.in.bf{filter:blur(0);}\n  .block b{font-size:22px;display:block;margin-bottom:8px}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <div class=\"wrap\" id=\"wrap\">\n    <div class=\"block\"><b>滚动揭示</b>区块进入视口时，从下方淡入并上移到位，缓动平滑进出。</div>\n    <div class=\"block\"><b>错峰延迟</b>每个区块按索引延迟 stagger 秒依次入场，形成节奏感。</div>\n    <div class=\"block\"><b>可调参数</b>位移、时长、透明度、模糊、阈值都能实时改，方便搭效果。</div>\n    <div class=\"block\"><b>适配多页</b>适合落地页、产品介绍等分节内容逐个揭示。</div>\n  </div>\n  <div class=\"hint\">向下滚动 / 调右侧参数看变化</div>\n  <script>\n  const state = {\n    dist: 40, dur: 0.8, opStart: 0, blur: false, thresh: 0.2, stagger: 0.12,\n    bg: \"#0e0e0e\", fg: \"#f5f5f5\", radius: 16, width: 560, align: \"左\"\n  };\n  const root = document.documentElement;\n  const wrap = document.getElementById(\"wrap\");\n  const blocks = [...wrap.children];\n  function apply(){\n    // 把 state 落到 CSS 变量，所有参数实时生效\n    root.style.setProperty(\"--dist\", state.dist + \"px\");\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--opStart\", state.opStart);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--fg\", state.fg);\n    root.style.setProperty(\"--radius\", state.radius + \"px\");\n    root.style.setProperty(\"--width\", state.width + \"px\");\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    // 模糊开关 + 错峰延迟逐块写入\n    blocks.forEach((b,i)=>{\n      b.classList.toggle(\"bf\", state.blur);\n      b.style.transitionDelay = (i * state.stagger) + \"s\";\n    });\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 观察\n    blocks.forEach(b=>b.classList.remove(\"in\"));\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: state.thresh });\n    blocks.forEach(b=>io.observe(b));\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa02",
    标题: "数字滚动统计(滚动触发)",
    分类: "组件",
    子类: "数据展示",
    风格: [
      "克制简约"
    ],
    场景: [
      "落地页",
      "数据看板",
      "全站通用"
    ],
    元素: [
      "动效",
      "字体"
    ],
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
    效果说明: "数字从 0 滚动累加到目标值，进入视口才触发计数——这是与 v107 普通数字滚动的关键差异：v107 一加载就数，soa02 要等用户滚到它面前才开始数，避免「滚过去时已经数完了」的浪费。\n带千位分隔符与后缀（如「+」「%」），缓动可调平滑/回弹/匀速，适合落地页 KPI、数据看板的指标卡。三把尺子：克制（单色数字+细标签，不抢戏）、节奏（先快后慢收尾自然）、焦点（进入视口才动，引导视线）。",
    用法: "右侧调参面板可调：目标值、时长、后缀、千位分隔开关、缓动、字号、数字色、标签文字、标签色、计数延迟、底色、字重。改完立刻重滚预览；页面下方有「重新计数」按钮可手动重播。",
    提示词: "①效果：做一个数字滚动统计，数字从 0 滚动到目标值，进入视口才触发计数（区别于普通一加载就数的数字滚动），支持千位分隔与后缀。\n②用法示例：落地页放「累计用户 9,000+」指标卡，滚到该区块时数字从 0 数到 9000，加「+」后缀，平滑缓动收尾。\n③关键参数（与调参面板一致）：目标值 target 默认 900；时长（秒）dur 默认 1.6；后缀 suffix 默认 \"+\"；千位分隔 sep 默认 true；缓动 ease 默认 平滑（选项 平滑/回弹/匀速）；字号（px）fontSize 默认 56；数字色 numColor 默认 #111111；标签文字 label 默认 累计用户；标签色 labelColor 默认 #666666；计数延迟（秒）delay 默认 0.3；底色 bg 默认 #ffffff；字重 weight 默认 特粗（选项 常规/中粗/特粗）。\n④集成步骤：复制 assets/demos/数字滚动统计.html 单文件；用 IntersectionObserver 监听容器进入视口（threshold 0.5）后 setTimeout(延迟) 触发 roll()；详情页通过 postMessage({type:'param',key,value}) 实时改 state，apply() 会重设样式并重新计数。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  /* 制造滚动区：顶部留白 + 底部统计块，进入视口才计数（区别于 v107 普通数字滚动） */\n  body{min-height:220vh;background:var(--bg,#fff);}\n  .spacer{height:120vh;display:flex;align-items:flex-end;justify-content:center;color:#bbb;font-size:14px}\n  .wrap{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}\n  .num{font-size:var(--fs,56px);font-weight:var(--wt,800);color:var(--nc,#111);font-variant-numeric:tabular-nums;line-height:1}\n  .lab{font-size:16px;color:var(--lc,#666);letter-spacing:1px}\n  .replay{cursor:pointer;border:none;background:var(--nc,#111);color:#fff;padding:9px 22px;border-radius:8px;font-size:14px}\n</style></head>\n<body>\n  <div class=\"spacer\">向下滚动 ↓ 数字进入视口才计数</div>\n  <div class=\"wrap\">\n    <div class=\"num\" id=\"num\">0</div>\n    <div class=\"lab\" id=\"lab\">累计用户</div>\n    <button class=\"replay\" id=\"replay\">重新计数</button>\n  </div>\n  <div class=\"hint\">滚动 / 调右侧参数看变化 · 滚动触发版（搭配 v107）</div>\n  <script>\n  // 8–12 键：含 3 个颜色参数，每个键 apply() 都真生效\n  const state = {\n    target:900, dur:1.6, suffix:\"+\", sep:true, ease:\"平滑\",\n    fontSize:56, numColor:\"#111111\", label:\"累计用户\", labelColor:\"#666666\",\n    delay:0.3, bg:\"#ffffff\", weight:\"特粗\"\n  };\n  const num = document.getElementById(\"num\"), lab = document.getElementById(\"lab\"), root = document.documentElement;\n  let raf = 0, entered = false;\n  // 三种缓动：平滑=先快后慢，回弹=过头回弹，匀速=线性\n  const EASE = {\n    \"平滑\": t => 1 - Math.pow(1 - t, 3),\n    \"回弹\": t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },\n    \"匀速\": t => t\n  };\n  const WEIGHT = { \"常规\": 400, \"中粗\": 600, \"特粗\": 800 };\n  // 数字格式化：千位分隔 + 后缀\n  function fmt(n) {\n    const r = Math.round(n);\n    return (state.sep ? r.toLocaleString(\"en-US\") : String(r)) + state.suffix;\n  }\n  // 真正滚动计数（从 0 到目标值）\n  function roll() {\n    cancelAnimationFrame(raf);\n    const from = 0, to = state.target, dur = state.dur * 1000;\n    const ease = EASE[state.ease] || EASE[\"平滑\"];\n    const t0 = performance.now();\n    (function tick(now) {\n      const t = Math.min((now - t0) / dur, 1);\n      num.textContent = fmt(from + (to - from) * ease(t));\n      if (t < 1) raf = requestAnimationFrame(tick);\n    })(t0);\n  }\n  // apply：把每个 state 键落到样式/文案上\n  function apply() {\n    const s = root.style;\n    s.setProperty(\"--bg\", state.bg);\n    s.setProperty(\"--fs\", state.fontSize + \"px\");\n    s.setProperty(\"--nc\", state.numColor);\n    s.setProperty(\"--lc\", state.labelColor);\n    s.setProperty(\"--wt\", WEIGHT[state.weight] || 800);\n    lab.textContent = state.label;       // 标签文字\n    if (entered) roll();                  // 已进入视口后调参立即重滚\n  }\n  // 进入视口才触发：延迟 delay 秒后开始计数\n  const io = new IntersectionObserver((es) => {\n    es.forEach(e => {\n      if (e.isIntersecting) {\n        entered = true;\n        setTimeout(roll, state.delay * 1000);\n        io.disconnect();\n      }\n    });\n  }, { threshold: 0.5 });\n  io.observe(document.querySelector(\".wrap\"));\n  // 重播按钮：归零并重新计数\n  document.getElementById(\"replay\").addEventListener(\"click\", () => {\n    num.textContent = \"0\" + state.suffix;\n    roll();\n  });\n  // 接收详情页传参\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data; if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value; apply();\n  });\n  apply();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa03",
    标题: "编辑型大序号分章",
    分类: "文字动画",
    子类: "标题",
    风格: [
      "克制简约"
    ],
    场景: [
      "全站通用",
      "长文报告",
      "多页网站"
    ],
    元素: [
      "字体",
      "动效"
    ],
    搭配: [
      "滚动揭示入场",
      "英雄区排版"
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
    效果说明: "用巨大的「01 / 02 / 03」作为章节分隔标记，序号可切换描边（空心字）或实心填充，右侧配章节标题与副标题。极简但很有编辑排版味，和 state 报告站的章节节奏一致。\n三把尺子：秩序（超大序号建立清晰的章节层级与阅读节奏）、留白（序号与标题之间的间距 gap 控制呼吸感）、焦点（描边模式更轻、实心更重，按章节分量切换）。",
    用法: "右侧调参面板可调：序号文字、序号字号、序号色、描边开关、标题、标题色、副标题、副标题色、对齐、间距、底色。改完即时预览，适合做报告/产品文档的分章页眉。",
    提示词: "①效果：做一个编辑型大序号分章组件——左侧超大「01」序号（可描边/实心切换），右侧配章节标题与副标题，序号与文字之间留间距，整体克制简约。\n②用法示例：年度报告每一章开头放一个 180px 的描边「02」序号，右边写「人机协作」标题和一句副标题。\n③关键参数（与调参面板一致）：序号 num 默认 \"01\"（字符串）；序号字号 numSize 默认 180（px）；序号色 numColor 默认 #111111；描边开关 outline 默认 true（开关，true=描边空心）；标题文字 title 默认 生成式设计（字符串）；标题色 titleColor 默认 #111111；副标题文字 sub 默认 AI 如何重写设计流程（字符串）；副标题色 subColor 默认 #888888；对齐 align 默认 左（选项 左/中/右）；间距 gap 默认 28（px）；底色 bg 默认 #ffffff。\n④集成步骤：复制 assets/demos/大序号分章.html 单文件；序号用 -webkit-text-stroke 实现描边（outline 为 true 时文字透明+描边，否则直接填充 numColor）；apply() 把 state 落到 CSS 变量并通过 textContent 更新标题/副标题文字。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;background:var(--bg);padding:8vh 6vw;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .ch{display:flex;align-items:center;gap:var(--gap);margin:0 0 6vh;flex-wrap:wrap;}\n  /* 超大序号：描边模式文字透明+描边；实心模式直接填充 */\n  .num{font-size:var(--numSize);font-weight:900;line-height:.9;letter-spacing:-.04em;\n    color:var(--numColor);min-width:1.6em;}\n  .num.outline{color:transparent;-webkit-text-stroke:3px var(--numColor);}\n  .txt{text-align:var(--align);}\n  .txt h2{margin:0;font-size:clamp(22px,4vw,40px);color:var(--titleColor);font-weight:800;}\n  .txt p{margin:8px 0 0;font-size:16px;color:var(--subColor);}\n</style></head>\n<body>\n  <div class=\"ch\">\n    <div class=\"num\" id=\"num1\">01</div>\n    <div class=\"txt\"><h2 id=\"t1\">生成式设计</h2><p id=\"s1\">AI 如何重写设计流程</p></div>\n  </div>\n  <div class=\"ch\"><div class=\"num\">02</div><div class=\"txt\"><h2>人机协作</h2><p>设计师与模型共同迭代</p></div></div>\n  <div class=\"ch\"><div class=\"num\">03</div><div class=\"txt\"><h2>落地评估</h2><p>从概念到生产的度量</p></div></div>\n  <div class=\"hint\">调右侧参数看变化</div>\n  <script>\n  const state = {\n    num: \"01\", numSize: 180, numColor: \"#111111\", outline: true,\n    title: \"生成式设计\", titleColor: \"#111111\", sub: \"AI 如何重写设计流程\",\n    subColor: \"#888888\", align: \"左\", gap: 28, bg: \"#ffffff\"\n  };\n  const root = document.documentElement;\n  const allNum = [...document.querySelectorAll(\".num\")];\n  function apply(){\n    root.style.setProperty(\"--numSize\", state.numSize + \"px\");\n    root.style.setProperty(\"--numColor\", state.numColor);\n    root.style.setProperty(\"--titleColor\", state.titleColor);\n    root.style.setProperty(\"--subColor\", state.subColor);\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    root.style.setProperty(\"--gap\", state.gap + \"px\");\n    root.style.setProperty(\"--bg\", state.bg);\n    // 描边开关：切换 .outline 类（实心时移除）\n    allNum.forEach(n=>n.classList.toggle(\"outline\", state.outline));\n    // 仅第一块由参数驱动，便于实时预览\n    document.getElementById(\"num1\").textContent = state.num;\n    document.getElementById(\"t1\").textContent = state.title;\n    document.getElementById(\"s1\").textContent = state.sub;\n  }\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply();\n  });\n  apply();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa04",
    标题: "滚动进度指示",
    分类: "组件",
    子类: "导航",
    风格: [
      "克制简约"
    ],
    场景: [
      "多页网站",
      "全站通用",
      "长文阅读"
    ],
    元素: [
      "动效",
      "颜色"
    ],
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
    效果说明: "页面顶部（或底部）一条细进度条，随滚动从左到右填充，宽度=已读百分比。\n构图笔记：轻量常驻、不抢内容重心，是「阅读温度计」式的位置/进度双提示；已完成上色、未完成留浅底，比例一眼可读。",
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
    风格: [
      "克制简约"
    ],
    场景: [
      "落地页",
      "官网",
      "全站通用"
    ],
    元素: [
      "动效",
      "表单",
      "反馈"
    ],
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
    效果说明: "邮箱输入框：聚焦时边框与底色变化、占位文字上移成浮动标签；提交按钮带「订阅中→已订阅」状态微反馈（setTimeout 模拟，不真发请求）。\n克制简约风格，所有圆角/边框/底色/文字色/位移/时长都参数化。三把尺子：克制（聚焦才变化，平时安静）、节奏（位移与变色用同一条缓动，统一呼吸感）、焦点（按钮状态反馈让用户确认操作成功）。",
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
    风格: [
      "克制简约"
    ],
    场景: [
      "长文阅读",
      "文档站",
      "产品介绍页"
    ],
    元素: [
      "动效",
      "颜色"
    ],
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
    效果说明: "页面一侧（左/右）固定一排章节圆点，随滚动用 IntersectionObserver 判定哪个章节在视口中央并高亮，点击圆点平滑滚动到对应章节。\n构图笔记：用「位置固定 + 状态高亮」做轻量目录，不占正文空间；当前章放大换色、其余留浅灰，视线锚点清晰，是克制简约的进程/导航双提示。",
    用法: "适合长文、文档站、产品介绍页做侧边章节索引。右侧面板可调圆点大小、间距、两色、左右位置、标签显隐与色、进度连线与色、圆点描边、底色。",
    提示词: "①效果：页面一侧固定一排章节圆点，当前章节圆点放大并高亮，其余浅灰；点击圆点平滑滚动到对应章节。\n②用法示例：长文档右侧粘性章节导航，滚动时自动高亮「正在读」的章节，圆点间可用细线连成进度轴。\n③关键参数（与演示调参面板一致）：圆点大小（px）默认 12；圆点间距（px）默认 20；默认色默认 #cccccc；激活色默认 #111111；位置默认 右（选项：左/右）；标签显隐默认 false；标签色默认 #666666；进度连线默认 false；连线色默认 #dddddd；圆点描边默认 false；底色默认 #ffffff。\n④集成步骤：复制 assets/demos/粘性章节导航.html 结构；给每个章节 section 加 data-i，用 IntersectionObserver（rootMargin:'-50% 0px -50% 0px'）判定视口中线章节并加 .on 高亮；点击圆点调 scrollIntoView({behavior:'smooth'})；用 postMessage({type:'param',key,value}) 实时改 state，所有样式走 apply() 里的 CSS 变量。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>粘性章节导航</title>\n<style>\n  /* 原站签名缓动：出场用 cubic-bezier(0.4,0,1,1)，这里高亮态复用滚动揭示缓动 */\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;min-height:220vh;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;background:var(--bg,#fff);}\n  /* 每个章节：占满一屏高，制造滚动区 */\n  .sec{min-height:90vh;display:flex;align-items:center;justify-content:center;color:#333;font-size:22px;font-weight:700;border-bottom:1px solid #f0f0f0;}\n  /* 导航容器：垂直居中固定在左/右 */\n  .nav{position:fixed;top:50%;transform:translateY(-50%);z-index:9;display:flex;flex-direction:column;align-items:center;gap:var(--gap,20px);}\n  /* 进度连线：贯穿圆点的竖线 */\n  #line{position:absolute;top:0;bottom:0;left:50%;width:2px;background:var(--linec,#ddd);transform:translateX(-50%);z-index:0;}\n  /* 圆点：默认色，激活时放大并换色 */\n  .dot{position:relative;z-index:1;width:var(--size,12px);height:var(--size,12px);border-radius:50%;background:var(--idle,#ccc);cursor:pointer;border:var(--stroke,0) solid #fff;transition:transform .25s var(--ease),background .25s var(--ease);}\n  .dot.on{background:var(--active,#111);transform:scale(1.6);}\n  /* 章节标签：可开关，贴在圆点外侧 */\n  .lab{position:absolute;top:50%;transform:translateY(-50%);font-size:13px;color:var(--labc,#666);white-space:nowrap;display:var(--showlab,none);}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n</style></head>\n<body>\n  <nav class=\"nav\" id=\"nav\"><div id=\"line\"></div></nav>\n  <div class=\"hint\">滚动看变化</div>\n  <section class=\"sec\" data-i=\"0\">第一章 · 开篇</section>\n  <section class=\"sec\" data-i=\"1\">第二章 · 背景</section>\n  <section class=\"sec\" data-i=\"2\">第三章 · 方法</section>\n  <section class=\"sec\" data-i=\"3\">第四章 · 案例</section>\n  <section class=\"sec\" data-i=\"4\">第五章 · 收尾</section>\n  <script>\n  // 章节名（用于标签）\n  const names=[\"第一章\",\"第二章\",\"第三章\",\"第四章\",\"第五章\"];\n  // 默认参数：父页面（详情页）可实时调\n  const state = {\n    size: 12,        // 圆点大小（px）\n    gap: 20,         // 圆点间距（px）\n    idle: \"#cccccc\", // 默认色\n    active: \"#111111\", // 激活色\n    side: \"右\",      // 位置：左 / 右\n    labels: false,   // 标签显隐\n    labelColor: \"#666666\", // 标签色\n    line: false,     // 进度连线\n    lineColor: \"#dddddd\", // 连线色\n    stroke: false,   // 圆点描边\n    bg: \"#ffffff\"    // 底色（页面背景）\n  };\n  const nav=document.getElementById(\"nav\"), line=document.getElementById(\"line\");\n  const dots=[];\n  // 生成圆点\n  names.forEach((n,i)=>{\n    const d=document.createElement(\"div\"); d.className=\"dot\"; d.dataset.i=i;\n    const lab=document.createElement(\"span\"); lab.className=\"lab\"; lab.textContent=n;\n    d.appendChild(lab);\n    d.addEventListener(\"click\",()=>{ document.querySelectorAll(\".sec\")[i].scrollIntoView({behavior:\"smooth\"}); });\n    nav.appendChild(d); dots.push(d);\n  });\n  const secs=[...document.querySelectorAll(\".sec\")];\n  let cur=0;\n  function setActive(i){ cur=i; dots.forEach((d,k)=>d.classList.toggle(\"on\",k===i)); }\n\n  // apply：把每个 state 键映射到真实样式\n  function apply(){\n    const root=document.documentElement;\n    root.style.setProperty(\"--size\", state.size+\"px\");\n    root.style.setProperty(\"--gap\", state.gap+\"px\");\n    root.style.setProperty(\"--idle\", state.idle);\n    root.style.setProperty(\"--active\", state.active);\n    root.style.setProperty(\"--labc\", state.labelColor);\n    root.style.setProperty(\"--linec\", state.lineColor);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--showlab\", state.labels ? \"block\" : \"none\");\n    root.style.setProperty(\"--stroke\", state.stroke ? (Math.max(2,state.size/4)+\"px\") : \"0\");\n    line.style.display = state.line ? \"block\" : \"none\";\n    // 位置：左侧或右侧\n    if(state.side===\"左\"){ nav.style.right=\"auto\"; nav.style.left=\"20px\"; }\n    else { nav.style.left=\"auto\"; nav.style.right=\"20px\"; }\n    // 标签贴在圆点外侧（左导航在右、右导航在左）\n    dots.forEach(d=>{ const lab=d.querySelector(\".lab\");\n      if(state.side===\"左\"){ lab.style.right=(state.size+8)+\"px\"; lab.style.left=\"auto\"; }\n      else { lab.style.left=(state.size+8)+\"px\"; lab.style.right=\"auto\"; } });\n    setActive(cur);\n  }\n\n  // 以视口中线判定当前章节（IntersectionObserver）\n  const io=new IntersectionObserver((es)=>{\n    es.forEach(e=>{ if(e.isIntersecting) setActive(+e.target.dataset.i); });\n  },{rootMargin:\"-50% 0px -50% 0px\",threshold:0});\n  secs.forEach(s=>io.observe(s));\n\n  // 父页面消息：调参实时生效\n  window.addEventListener(\"message\",(e)=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa07",
    标题: "文字逐行揭示",
    分类: "文字动画",
    子类: "标题",
    风格: [
      "克制简约"
    ],
    场景: [
      "落地页",
      "英雄区",
      "多页网站"
    ],
    元素: [
      "字体",
      "动效"
    ],
    搭配: [
      "英雄区排版",
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
    效果说明: "一段标题按行拆开，每行用 overflow:hidden 做遮罩，进入视口时逐行从下方上滑揭示，行与行之间按 lineDelay 递增延迟，像被一行行「拉」出来。是 state 站标题最常用的招牌技法。\n三把尺子：克制（只有位移+淡入，不晃不弹）、节奏（逐行延迟制造书写般的顺序感）、焦点（遮罩让文字「从无到有」，视线被钉在正在出现的那行）。",
    用法: "右侧调参面板可调：逐行位移、每行延迟、时长、字号、文字色、底色、行高、对齐、模糊开关、入场缓动（平滑/回弹/匀速）。改完滚动或点「重播」看逐行效果。",
    提示词: "①效果：做文字逐行揭示——标题拆成多行，每行外层 overflow:hidden 做遮罩，内层 translateY 从 shift 上滑到 0 并淡入，逐行延迟 lineDelay 递增，缓动可选平滑/回弹/匀速。\n②用法示例：落地页主标题三行，滚到时第一行先出、隔 0.08s 第二行、再第三行，平滑缓动上滑揭示。\n③关键参数（与调参面板一致）：逐行位移 shift 默认 40（px）；每行延迟 lineDelay 默认 0.08（秒）；时长 dur 默认 0.7（秒）；字号 size 默认 44（px）；文字色 fg 默认 #111111；底色 bg 默认 #ffffff；行高 lh 默认 1.3；对齐 align 默认 左（选项 左/中/右）；模糊开关 blur 默认 false；入场缓动 ease 默认 平滑（选项 平滑/回弹/匀速）。\n④集成步骤：复制 assets/demos/文字逐行.html 单文件；每行包一层 .line（overflow:hidden）内层 span 做位移；IntersectionObserver 观察每行进入视口（threshold 0.4）加 .in 触发 CSS 过渡，transition-delay 设为 行索引×lineDelay；详情页 postMessage 改 state 后 apply() 重设变量、点「重播」重新 observe。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:var(--bg);display:flex;align-items:center;justify-content:center;}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .head{width:min(820px,90vw);text-align:var(--align);}\n  /* 每行用 overflow:hidden 做遮罩，内层上移 shift 后归零揭示 */\n  .line{overflow:hidden;}\n  .line span{display:block;font-weight:800;font-size:var(--size);line-height:var(--lh);color:var(--fg);\n    transform:translateY(var(--shift));opacity:0;\n    transition:transform var(--dur) var(--ease2),opacity var(--dur) var(--ease2);}\n  .line.in span{transform:translateY(0);opacity:1;}\n  .line.bf span{filter:blur(10px);} .line.in.bf span{filter:blur(0);}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <div class=\"head\" id=\"head\">\n    <div class=\"line\"><span>设计正在被重写</span></div>\n    <div class=\"line\"><span>AI 成为真正的协作者</span></div>\n    <div class=\"line\"><span>工具消融于流程之中</span></div>\n  </div>\n  <div class=\"hint\">向下滚动 / 调右侧参数看变化</div>\n  <script>\n  const state = {\n    shift: 40, lineDelay: 0.08, dur: 0.7, size: 44, fg: \"#111111\",\n    bg: \"#ffffff\", lh: 1.3, align: \"左\", blur: false, ease: \"平滑\"\n  };\n  const root = document.documentElement;\n  const head = document.getElementById(\"head\");\n  const lines = [...head.querySelectorAll(\".line\")];\n  const EASE = { \"平滑\":\"var(--ease)\", \"回弹\":\"cubic-bezier(.34,1.56,.64,1)\", \"匀速\":\"linear\" };\n  function apply(){\n    root.style.setProperty(\"--shift\", state.shift + \"px\");\n    root.style.setProperty(\"--dur\", state.dur + \"s\");\n    root.style.setProperty(\"--size\", state.size + \"px\");\n    root.style.setProperty(\"--fg\", state.fg);\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--lh\", state.lh);\n    root.style.setProperty(\"--align\", state.align === \"左\" ? \"left\" : state.align === \"右\" ? \"right\" : \"center\");\n    root.style.setProperty(\"--ease2\", EASE[state.ease] || \"var(--ease)\");\n    lines.forEach(l=>l.classList.toggle(\"bf\", state.blur));\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 逐行观察\n    lines.forEach(l=>l.classList.remove(\"in\"));\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: 0.4 });\n    lines.forEach((l,i)=>{ l.style.transitionDelay = (i * state.lineDelay) + \"s\"; io.observe(l); });\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "soa08",
    标题: "英雄区大字号排版",
    分类: "文字动画",
    子类: "标题",
    风格: [
      "克制简约"
    ],
    场景: [
      "落地页",
      "报告首页",
      "全站通用"
    ],
    元素: [
      "字体",
      "动效"
    ],
    搭配: [
      "文字逐行揭示",
      "大序号分章"
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
    效果说明: "顶部 hero 区——超大主标题混排一个小标签（如「AI in Design / Report 2026」），载入时主标题从下方淡入揭示，小标签与副文案依次跟进。state 报告站首屏就是这个套路，靠字号对比和留白撑起高级感。\n三把尺子：秩序（主标题>小标签>副文案的清晰字号层级）、留白（上下留白 pad 控制首屏呼吸感）、焦点（大字号+克制配色，一眼抓住报告主题）。",
    用法: "右侧调参面板可调：主标题、主标题字号、主标题色、小标签文字、小标签色、小标签底色、对齐、上下留白、主标题字重、入场位移、底色、副文案。改完滚动或点「重播」看首屏揭示。",
    提示词: "①效果：做英雄区大字号排版——顶部 hero 放超大主标题，左上/中/右混排一个小标签胶囊（自带底色），载入时主标题从下方 translateY 上滑淡入，小标签与副文案依次跟进。\n②用法示例：报告首页主标题「AI in Design」96px 中黑，配「Report 2026」深色胶囊小标签，下方一句副文案，载入时整体上滑揭示。\n③关键参数（与调参面板一致）：主标题 title 默认 AI in Design（字符串）；主标题字号 titleSize 默认 96（px）；主标题色 titleColor 默认 #111111；小标签文字 tag 默认 Report 2026（字符串）；小标签色 tagColor 默认 #ffffff；小标签底色 tagBg 默认 #111111；对齐 align 默认 左（选项 左/中/右）；上下留白 pad 默认 80（px）；主标题字重 weight 默认 中黑（选项 常规/中黑/特黑）；入场位移 shift 默认 60（px）；底色 bg 默认 #ffffff；副文案 sub 默认 Designer Fund × Foundation Capital 年度设计报告（字符串）。\n④集成步骤：复制 assets/demos/英雄区排版.html 单文件；hero 内 .tag/.title/.sub 初始 opacity:0+translateY(shift)，进入视口（IntersectionObserver threshold 0.3）加 .in 复位；字重用 CSS 变量 --w 映射 400/600/900；详情页 postMessage 改 state 后 apply() 重设变量与文字，点「重播」重新 observe。",
    代码: "<!doctype html><html lang=\"zh\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<style>\n  :root{ --ease: cubic-bezier(.44,0,.56,1); }\n  body{margin:0;font-family:-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;min-height:220vh;background:var(--bg);}\n  .hint{position:fixed;left:12px;bottom:10px;font-size:12px;color:#888;z-index:9}\n  .replay{position:fixed;right:12px;top:12px;z-index:9;padding:6px 12px;border:0;border-radius:8px;background:#111;color:#fff;font-size:13px;cursor:pointer}\n  .hero{min-height:60vh;display:flex;flex-direction:column;justify-content:center;padding:var(--pad) 8vw;text-align:var(--align);}\n  .tag{align-self:var(--as);background:var(--tagBg);color:var(--tagColor);font-size:14px;font-weight:600;padding:6px 14px;border-radius:999px;margin-bottom:20px;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .6s var(--ease),transform .6s var(--ease);}\n  .title{margin:0;font-size:var(--titleSize);line-height:1.05;color:var(--titleColor);font-weight:var(--w);letter-spacing:-.03em;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .7s var(--ease),transform .7s var(--ease);}\n  .sub{margin:22px 0 0;font-size:17px;color:#666;max-width:46ch;\n    opacity:0;transform:translateY(var(--shift));transition:opacity .6s var(--ease) .15s,transform .6s var(--ease) .15s;}\n  .hero.in .tag,.hero.in .title,.hero.in .sub{opacity:1;transform:translateY(0);}\n</style></head>\n<body>\n  <button class=\"replay\" id=\"rp\">重播</button>\n  <header class=\"hero\" id=\"hero\">\n    <span class=\"tag\" id=\"tag\">Report 2026</span>\n    <h1 class=\"title\" id=\"title\">AI in Design</h1>\n    <p class=\"sub\" id=\"sub\">Designer Fund × Foundation Capital 年度设计报告</p>\n  </header>\n  <div class=\"hint\">向下滚动 / 调右侧参数看变化</div>\n  <script>\n  const state = {\n    title: \"AI in Design\", titleSize: 96, titleColor: \"#111111\",\n    tag: \"Report 2026\", tagColor: \"#ffffff\", tagBg: \"#111111\",\n    align: \"左\", pad: 80, weight: \"中黑\", shift: 60, bg: \"#ffffff\",\n    sub: \"Designer Fund × Foundation Capital 年度设计报告\"\n  };\n  const root = document.documentElement;\n  const W = { \"常规\":\"400\", \"中黑\":\"600\", \"特黑\":\"900\" };\n  const AM = { \"左\":[\"left\",\"flex-start\"], \"中\":[\"center\",\"center\"], \"右\":[\"right\",\"flex-end\"] };\n  function apply(){\n    root.style.setProperty(\"--bg\", state.bg);\n    root.style.setProperty(\"--titleSize\", state.titleSize + \"px\");\n    root.style.setProperty(\"--titleColor\", state.titleColor);\n    root.style.setProperty(\"--tagColor\", state.tagColor);\n    root.style.setProperty(\"--tagBg\", state.tagBg);\n    root.style.setProperty(\"--pad\", state.pad + \"px\");\n    root.style.setProperty(\"--w\", W[state.weight] || \"600\");\n    root.style.setProperty(\"--shift\", state.shift + \"px\");\n    root.style.setProperty(\"--align\", AM[state.align][0]);\n    root.style.setProperty(\"--as\", AM[state.align][1]);\n    document.getElementById(\"title\").textContent = state.title;\n    document.getElementById(\"tag\").textContent = state.tag;\n    document.getElementById(\"sub\").textContent = state.sub;\n  }\n  let io;\n  function reset(){ // 重播：清状态并重新用 IntersectionObserver 观察 hero\n    const h = document.getElementById(\"hero\");\n    h.classList.remove(\"in\");\n    if(io) io.disconnect();\n    io = new IntersectionObserver((es)=>{\n      es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(\"in\"); });\n    }, { threshold: 0.3 });\n    io.observe(h);\n  }\n  document.getElementById(\"rp\").onclick = reset;\n  window.addEventListener(\"message\", (e) => {\n    const d = e.data;\n    if (!d || d.type !== \"param\") return;\n    state[d.key] = d.value;\n    apply(); reset();\n  });\n  apply(); reset();\n  <\\/script>\n</body></html>\n",
    复用记录: ""
  },
  {
    id: "v132",
    标题: "普通单选下拉",
    分类: "组件",
    子类: "下拉",
    风格: [
      "克制简约",
      "通用"
    ],
    场景: [
      "表单",
      "筛选器",
      "全站通用"
    ],
    元素: [
      "下拉",
      "状态"
    ],
    搭配: [
      "分组下拉",
      "搜索组合框"
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
    效果说明: "最常见的下拉选单：触发区显示当前选中项或占位文案，点击展开浮层选项列表，选中后自动收起并把值回填到触发区。选中项高亮主题色。适用于固定选项中单选的场景。",
    用法: "点触发区展开/收起；点选项回填并关闭；点外部关闭。调「主题色/圆角/展开时长」看整体气质；调「菜单最大高」应对长列表。",
    提示词: "帮我做\"普通单选下拉\"（纯 HTML/CSS/JS）：\n效果：触发区显示选中项或占位文案，点击展开浮层选项列表，选中后自动收起并把值回填触发区，选中项高亮主题色。适用固定选项中单选。\n用法示例：\n<div class=\"field\"><div class=\"trigger\"><span class=\"val\">请选择</span></div><div class=\"menu\"><div class=\"opt\">苹果</div>...</div></div>\n// 点选项：val.textContent=选中值; field.classList.remove(\"open\")\n关键参数：\n- theme 主题色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / border 边框色 / hoverBg 选项悬浮背景 / menuMaxH 菜单最大高（px） / arrowColor 箭头色 / align 对齐 / placeholder 占位文案 / shadow 投影浓度\n集成步骤：\n1. 复制 assets/demos/单选下拉.html 单文件（state + apply + postMessage 调参骨架）\n2. 选项数组换成你的数据，apply() 里把主题色/圆角/展开时长映射到 CSS 变量\n3. 详情页 postMessage({type:\"param\",key,value}) 改 state 后 apply() 实时预览",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>单选下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:260px; }\n  .trigger {\n    width:100%; display:flex; align-items:center; gap:8px;\n    padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,var(--shadow,.12)); transition:border-color .15s;\n    justify-content:var(--align,flex-start);\n  }\n  .trigger .val { flex:1; text-align:inherit; }\n  .trigger .val.ph { color:#9ca3af; }\n  .caret { transition:transform var(--dur,.22s) ease; color:var(--arrow,#6b7280); flex:none; }\n  .field.open .caret { transform:rotate(180deg); }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12));\n    max-height:var(--maxh,240px); overflow:auto; opacity:0; transform:translateY(-6px); pointer-events:none;\n    transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:5;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .opt { padding:10px 14px; font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; }\n  .opt:hover { background:var(--hover,#eff6ff); }\n  .opt.sel { color:var(--theme,#2563eb); font-weight:700; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <p class=\"hint\">点击展开 · 选中自动回填并更新状态</p>\n<script>\n  const OPTIONS = [\"苹果\",\"香蕉\",\"橙子\",\"西瓜\",\"葡萄\",\"芒果\",\"荔枝\",\"菠萝\",\"草莓\",\"蓝莓\"];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.22,\n    border:\"#d1d5db\", hoverBg:\"#eff6ff\", menuMaxH:240, arrowColor:\"#6b7280\",\n    align:\"左\", placeholder:\"请选择\", shadow:0.12\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"),\n        val=document.getElementById(\"val\"), menu=document.getElementById(\"menu\");\n  let selected=null, open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    OPTIONS.forEach(o=>{\n      const d=document.createElement(\"div\");\n      d.className=\"opt\"+(o===selected?\" sel\":\"\");\n      d.textContent=o;\n      d.onclick=()=>{ selected=o; val.textContent=o; val.classList.remove(\"ph\"); close(); markSel(); };\n      menu.appendChild(d);\n    });\n  }\n  function markSel(){ [...menu.children].forEach((c,i)=> c.classList.toggle(\"sel\", OPTIONS[i]===selected)); }\n  function openMenu(){ open=true; field.classList.add(\"open\"); }\n  function close(){ open=false; field.classList.remove(\"open\"); }\n  trigger.onclick=()=> open?close():openMenu();\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)) close(); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme);\n    R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border);\n    R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--maxh\",state.menuMaxH+\"px\");\n    R.setProperty(\"--arrow\",state.arrowColor);\n    R.setProperty(\"--shadow\",state.shadow);\n    R.setProperty(\"--align\", state.align===\"左\"?\"flex-start\":state.align===\"右\"?\"flex-end\":\"center\");\n    if(!selected){ val.textContent=state.placeholder; val.classList.add(\"ph\"); }\n    buildMenu(); markSel();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v133",
    标题: "分组下拉",
    分类: "组件",
    子类: "下拉",
    风格: [
      "克制简约",
      "信息密度"
    ],
    场景: [
      "表单",
      "地区选择",
      "全站通用"
    ],
    元素: [
      "下拉",
      "分组"
    ],
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
    效果说明: "针对大量同层级选项，按类别分组展示（如华北/华东/华南）。组名是小标题、不可选，仅作视觉分组；选项可点选并回填对应内容。比扁平长列表更易扫读。",
    用法: "点选项回填；组标题只分组不响应点击。调「组标题色/组标题字号」区分层级；调「组间距」控制分组呼吸感。",
    提示词: "帮我做\"分组下拉\"（纯 HTML/CSS/JS）：\n效果：大量同层级选项按类别分组（组名仅作分组、不可选），点选项回填对应内容。比扁平长列表更易扫读。\n用法示例：\n<div class=\"grp\"><div class=\"ghead\">华北</div><div class=\"opt\">北京</div>...</div>\n// 组标题 ghead 不绑 onclick；opt 点击回填\n关键参数：\n- theme 主题色 / text 文本色 / groupTitle 组标题色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / border 边框色 / hoverBg 选项悬浮背景 / groupTitleSize 组标题字号（px） / groupGap 组间距（px） / placeholder 占位文案 / arrowColor 箭头色\n集成步骤：\n1. 复制 assets/demos/分组下拉.html 单文件\n2. GROUPS 换成你的分组数据（name + items 数组）\n3. apply() 把组标题色/组标题字号/组间距映射到 CSS 变量，选项交互照旧",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>分组下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:280px; }\n  .trigger {\n    width:100%; display:flex; align-items:center; gap:8px;\n    padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,var(--shadow,.12)); transition:border-color .15s;\n  }\n  .trigger .val { flex:1; }\n  .trigger .val.ph { color:#9ca3af; }\n  .caret { transition:transform var(--dur,.22s) ease; color:var(--arrow,#6b7280); flex:none; }\n  .field.open .caret { transform:rotate(180deg); }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12));\n    max-height:300px; overflow:auto; opacity:0; transform:translateY(-6px); pointer-events:none;\n    transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:5; padding:6px;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .ghead { padding:8px 12px 4px; font-size:var(--gts,12px); color:var(--gt,#9ca3af); font-weight:700; letter-spacing:.04em; }\n  .opt { padding:9px 12px; font-size:var(--fs,15px); color:var(--text,#1f2937); cursor:pointer; border-radius:7px; }\n  .opt:hover { background:var(--hover,#f3f4f6); }\n  .opt.sel { color:var(--theme,#2563eb); font-weight:700; }\n  .grp + .grp { margin-top:var(--ggap,6px); }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择城市</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <p class=\"hint\">组名不可选 · 选中回填对应内容</p>\n<script>\n  const GROUPS = [\n    { name:\"华北\", items:[\"北京\",\"天津\",\"石家庄\"] },\n    { name:\"华东\", items:[\"上海\",\"杭州\",\"南京\",\"苏州\"] },\n    { name:\"华南\", items:[\"广州\",\"深圳\",\"厦门\"] }\n  ];\n  const FLAT = GROUPS.flatMap(g=>g.items);\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", groupTitle:\"#9ca3af\", radius:10, fontSize:15, dur:0.22,\n    border:\"#d1d5db\", hoverBg:\"#f3f4f6\", groupTitleSize:12, groupGap:6, placeholder:\"请选择城市\", arrowColor:\"#6b7280\"\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"),\n        val=document.getElementById(\"val\"), menu=document.getElementById(\"menu\");\n  let selected=null, open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    GROUPS.forEach(g=>{\n      const wrap=document.createElement(\"div\"); wrap.className=\"grp\";\n      const h=document.createElement(\"div\"); h.className=\"ghead\"; h.textContent=g.name; wrap.appendChild(h);\n      g.items.forEach(o=>{\n        const d=document.createElement(\"div\");\n        d.className=\"opt\"+(o===selected?\" sel\":\"\"); d.textContent=o;\n        d.onclick=()=>{ selected=o; val.textContent=o; val.classList.remove(\"ph\"); close(); };\n        wrap.appendChild(d);\n      });\n      menu.appendChild(wrap);\n    });\n  }\n  function openMenu(){ open=true; field.classList.add(\"open\"); }\n  function close(){ open=false; field.classList.remove(\"open\"); }\n  trigger.onclick=()=> open?close():openMenu();\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)) close(); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--gt\",state.groupTitle); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--gts\",state.groupTitleSize+\"px\"); R.setProperty(\"--ggap\",state.groupGap+\"px\");\n    R.setProperty(\"--arrow\",state.arrowColor);\n    if(!selected){ val.textContent=state.placeholder; val.classList.add(\"ph\"); }\n    buildMenu();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v134",
    标题: "可搜索组合框",
    分类: "组件",
    子类: "搜索",
    风格: [
      "高效",
      "通用"
    ],
    场景: [
      "表单",
      "大数据集筛选",
      "全站通用"
    ],
    元素: [
      "输入框",
      "筛选"
    ],
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
    效果说明: "输入框 + 下拉的混合体：选项过多时支持关键词实时筛选，匹配到的子串高亮；选中后回填到输入框并切换关联预览（这里回填文案）。是下拉在大列表下的高效形态。",
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
    风格: [
      "高效",
      "通用"
    ],
    场景: [
      "工具栏",
      "编辑器",
      "操作区"
    ],
    元素: [
      "按钮",
      "菜单"
    ],
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
    效果说明: "把常用动作和备选动作整合到一个控件：左侧按钮主体执行默认操作（如保存），右侧箭头展开次级操作菜单（保存并关闭/另存为/导出/删除）。节省工具栏空间、突出主操作。",
    用法: "点主体执行默认；点箭头展开菜单选其他动作。调「主按钮色/箭头区底色」区分主从；调「默认动作文案」换主操作。",
    提示词: "帮我做\"拆分按钮\"（纯 HTML/CSS/JS）：\n效果：左侧主体按钮执行默认操作，右侧箭头展开次级操作菜单。节省工具栏空间、突出主操作。\n用法示例：\n<div class=\"split\"><button class=\"main\">保存</button><button class=\"arrow\">▾</button><div class=\"menu\">...</div></div>\n// 主体 click → 执行默认；箭头 click → 切换菜单\n关键参数：\n- mainColor 主按钮色 / arrowColor 箭头区底色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / menuBg 菜单底色 / hoverMenu 菜单项悬浮 / divLine 分隔线色 / shadow 投影浓度 / arrowSize 箭头大小（px） / defaultLabel 默认动作文案\n集成步骤：\n1. 复制 assets/demos/拆分按钮.html 单文件\n2. 菜单项换成你的次级动作，main click 绑默认逻辑\n3. 调「主按钮色/箭头区底色」区分主从，文本色通常白",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>拆分按钮演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .split { display:inline-flex; box-shadow:0 6px 18px rgba(0,0,0,var(--shadow,.12)); border-radius:var(--radius,10px); }\n  .main {\n    border:0; outline:0; cursor:pointer; padding:12px 22px; font-size:var(--fs,15px); font-weight:700;\n    background:var(--main,#2563eb); color:var(--text,#fff); border-radius:var(--radius,10px) 0 0 var(--radius,10px);\n    font-family:inherit;\n  }\n  .arrow {\n    border:0; outline:0; cursor:pointer; padding:0 14px; display:flex; align-items:center; justify-content:center;\n    background:var(--acol,#1d4ed8); border-left:1px solid var(--div,#e5e7eb); border-radius:0 var(--radius,10px) var(--radius,10px) 0;\n    color:var(--text,#fff); font-size:var(--asize,14px);\n  }\n  .arrow svg { transition:transform var(--dur,.18s) ease; }\n  .split.open .arrow svg { transform:rotate(180deg); }\n  .menu {\n    position:absolute; min-width:180px; background:var(--mbg,#fff); border:1px solid var(--div,#e5e7eb);\n    border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,var(--shadow,.12)); overflow:hidden;\n    opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.18s) ease, transform var(--dur,.18s) ease; z-index:5;\n  }\n  .split.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .mi { padding:11px 16px; font-size:var(--fs,15px); color:#1f2937; cursor:pointer; }\n  .mi:hover { background:var(--hm,#f3f4f6); }\n  .mi.danger { color:#dc2626; }\n  .wrap { position:relative; display:inline-flex; }\n  .toast {\n    position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(10px); opacity:0;\n    background:#111827; color:#fff; padding:10px 18px; border-radius:10px; font-size:14px; transition:.2s; pointer-events:none;\n  }\n  .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }\n  .hint { font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"wrap\">\n    <div class=\"split\" id=\"split\">\n      <button class=\"main\" id=\"main\">保存</button>\n      <button class=\"arrow\" id=\"arrow\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\"><path d=\"M6 9l6 6 6-6\"/></svg></button>\n      <div class=\"menu\" id=\"menu\">\n        <div class=\"mi\" data-a=\"保存并关闭\">保存并关闭</div>\n        <div class=\"mi\" data-a=\"另存为…\">另存为…</div>\n        <div class=\"mi\" data-a=\"导出 PDF\">导出 PDF</div>\n        <div class=\"mi danger\" data-a=\"删除\">删除</div>\n      </div>\n    </div>\n  </div>\n  <p class=\"hint\">点按钮主体执行默认 · 点箭头展开其他操作</p>\n  <div class=\"toast\" id=\"toast\"></div>\n<script>\n  const state = {\n    mainColor:\"#2563eb\", arrowColor:\"#1d4ed8\", text:\"#ffffff\", radius:10, fontSize:15, dur:0.18,\n    menuBg:\"#ffffff\", hoverMenu:\"#f3f4f6\", divLine:\"#e5e7eb\", shadow:0.12, arrowSize:14, defaultLabel:\"保存\"\n  };\n  const split=document.getElementById(\"split\"), main=document.getElementById(\"main\"), arrow=document.getElementById(\"arrow\"),\n        menu=document.getElementById(\"menu\"), toast=document.getElementById(\"toast\");\n  let open=false, t=null;\n  function showToast(msg){ toast.textContent=msg; toast.classList.add(\"show\"); clearTimeout(t); t=setTimeout(()=>toast.classList.remove(\"show\"),1400); }\n  function toggle(){ open=!open; split.classList.toggle(\"open\",open); }\n  arrow.onclick=(e)=>{ e.stopPropagation(); toggle(); };\n  main.onclick=()=> showToast(\"已执行：\" + state.defaultLabel);\n  [...menu.children].forEach(mi=> mi.onclick=()=>{ showToast(\"已执行：\" + mi.dataset.a); open=false; split.classList.remove(\"open\"); });\n  document.addEventListener(\"click\",e=>{ if(!split.contains(e.target)){ open=false; split.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--main\",state.mainColor); R.setProperty(\"--acol\",state.arrowColor);\n    R.setProperty(\"--text\",state.text); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--mbg\",state.menuBg); R.setProperty(\"--hm\",state.hoverMenu);\n    R.setProperty(\"--div\",state.divLine); R.setProperty(\"--shadow\",state.shadow);\n    R.setProperty(\"--asize\",state.arrowSize+\"px\");\n    main.textContent=state.defaultLabel;\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v136",
    标题: "日期选择器",
    分类: "组件",
    子类: "日期",
    风格: [
      "克制简约",
      "通用"
    ],
    场景: [
      "表单",
      "预订",
      "报表"
    ],
    元素: [
      "日历",
      "弹层"
    ],
    搭配: [
      "普通单选下拉",
      "范围选择"
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
    效果说明: "弹出月历选择单日或日期范围：今天用环标记，周末用弱化色，选中日填充主题色；范围模式下两次点击高亮连续区间。选完回填到触发字段。",
    用法: "点触发区展开月历；‹ › 翻月；点日单选或点两日成范围。调「周起始」切周日/周一开头；调「范围选择」切单日/区间模式。",
    提示词: "帮我做\"日期选择器\"（纯 HTML/CSS/JS）：\n效果：弹月历选单日或范围，今天环标记、周末弱化色、选中日填主题色；范围模式两击高亮连续区间，选完回填字段。\n用法示例：\n<div class=\"grid\">7列：周几头 + 日期格</div>\n// 生成当月：lead=(首日为周几 - 周起始+7)%7; 天数=new Date(y,m+1,0).getDate()\n关键参数：\n- theme 选中日色 / text 文本色 / todayColor 今天标记色 / radius 圆角（px） / cellSize 单元格大小（px） / dur 展开时长（秒） / weekStart 周起始 / showRange 范围选择 / border 边框色 / hoverBg 悬浮背景 / headerColor 头部色 / weekendColor 周末色\n集成步骤：\n1. 复制 assets/demos/日期选择器.html 单文件\n2. weekStart 决定首列；showRange 切换单日/区间；今天用 new Date() 比较\n3. 调「单元格大小/选中日色/今天标记色」定视觉",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>日期选择器演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; }\n  .trigger {\n    width:200px; padding:11px 14px; background:#fff; border:1px solid var(--border,#e5e7eb); border-radius:var(--radius,8px);\n    font-size:15px; color:var(--text,#1f2937); cursor:pointer; text-align:center; user-select:none;\n  }\n  .pop {\n    position:absolute; top:calc(100% + 6px); left:0; width:280px; background:#fff; border:1px solid var(--border,#e5e7eb);\n    border-radius:var(--radius,8px); box-shadow:0 12px 34px rgba(0,0,0,.12); padding:12px; opacity:0; transform:translateY(-6px);\n    pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5;\n  }\n  .field.open .pop { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .head { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; color:var(--hc,#111827); font-weight:700; }\n  .head button { border:0; background:var(--hb,#f3f4f6); width:28px; height:28px; border-radius:7px; cursor:pointer; font-size:15px; color:var(--hc,#111827); }\n  .grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }\n  .wd { text-align:center; font-size:12px; color:#9ca3af; padding:4px 0; }\n  .cell {\n    height:var(--cs,36px); display:flex; align-items:center; justify-content:center; font-size:14px;\n    border-radius:8px; cursor:pointer; color:var(--text,#1f2937);\n  }\n  .cell.we { color:var(--we,#6b7280); }\n  .cell:hover { background:var(--hover,#eff6ff); }\n  .cell.muted { color:#cbd5e1; }\n  .cell.today { box-shadow:inset 0 0 0 2px var(--today,#ef4444); }\n  .cell.sel { background:var(--theme,#2563eb); color:#fff; }\n  .cell.in { background:var(--theme,#2563eb); color:#fff; opacity:.35; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">选择日期</div>\n    <div class=\"pop\" id=\"pop\">\n      <div class=\"head\">\n        <button id=\"prev\">‹</button>\n        <span id=\"title\"></span>\n        <button id=\"next\">›</button>\n      </div>\n      <div class=\"grid\" id=\"grid\"></div>\n    </div>\n  </div>\n  <p class=\"hint\">选单日或范围 · 选完回填字段</p>\n<script>\n  const WD_SUN = [\"日\",\"一\",\"二\",\"三\",\"四\",\"五\",\"六\"];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", todayColor:\"#ef4444\", radius:8, cellSize:36, dur:0.2,\n    weekStart:\"日\", showRange:false, border:\"#e5e7eb\", hoverBg:\"#eff6ff\", headerColor:\"#111827\", weekendColor:\"#6b7280\"\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), pop=document.getElementById(\"pop\"),\n        grid=document.getElementById(\"grid\"), title=document.getElementById(\"title\");\n  const today=new Date(); today.setHours(0,0,0,0);\n  let vy=today.getFullYear(), vm=today.getMonth(), sel=null, rs=null, re=null, open=false;\n  function same(a,b){ return a&&b&&a.getTime()===b.getTime(); }\n  function diffDays(a,b){ return Math.round((a-b)/864e5); }\n  function build(){\n    const startIdx = state.weekStart===\"日\" ? 0 : 1;\n    const wd=[...WD_SUN.slice(startIdx), ...WD_SUN.slice(0,startIdx)];\n    title.textContent = vy+\" 年 \"+(vm+1)+\" 月\";\n    let html=wd.map(w=>'<div class=\"wd\">'+w+'</div>').join(\"\");\n    const first=new Date(vy,vm,1), lead=(first.getDay()-startIdx+7)%7;\n    const days=new Date(vy,vm+1,0).getDate();\n    for(let i=0;i<lead;i++) html+='<div class=\"cell muted\"></div>';\n    for(let d=1;d<=days;d++){\n      const dt=new Date(vy,vm,d); const wdIdx=dt.getDay();\n      const we=(wdIdx===0||wdIdx===6)?\" we\":\"\";\n      const t=same(dt,today)?\" today\":\"\";\n      let cls=\"cell\"+we+t;\n      if(sel&&same(dt,sel)) cls+=\" sel\";\n      else if(state.showRange&&rs&&re){ if(diffDays(dt,rs)>=0&&diffDays(dt,re)<=0) cls+=\" in\"; }\n      html+='<div class=\"'+cls+'\" data-d=\"'+d+'\">'+d+'</div>';\n    }\n    grid.innerHTML=html;\n    [...grid.querySelectorAll(\".cell[data-d]\")].forEach(c=> c.onclick=()=> pick(new Date(vy,vm,+c.dataset.d)) );\n  }\n  function pick(dt){\n    if(state.showRange){\n      if(!rs||(rs&&re)){ rs=dt; re=null; sel=null; }\n      else if(dt<rs){ re=rs; rs=dt; } else { re=dt; }\n    } else { sel=dt; rs=re=null; trigger.textContent=(dt.getMonth()+1)+\" 月 \"+dt.getDate()+\" 日\"; }\n    build();\n  }\n  document.getElementById(\"prev\").onclick=()=>{ vm--; if(vm<0){vm=11;vy--;} build(); };\n  document.getElementById(\"next\").onclick=()=>{ vm++; if(vm>11){vm=0;vy++;} build(); };\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--today\",state.todayColor);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--cs\",state.cellSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--hc\",state.headerColor); R.setProperty(\"--we\",state.weekendColor);\n    build();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v137",
    标题: "级联选择器",
    分类: "组件",
    子类: "级联",
    风格: [
      "信息密度",
      "通用"
    ],
    场景: [
      "地区选择",
      "分类树",
      "表单"
    ],
    元素: [
      "级联",
      "面板"
    ],
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
    效果说明: "针对有上下级关系的数据（省→市→区），逐级展开多列面板，每列点选后在其右侧展开下一级；点到末级自动把完整路径（如 中国 / 浙江 / 杭州）回填触发区。比平铺下拉更贴合层级数据。",
    用法: "点某列项展开下一列；点末级回填路径。调「路径分隔符」换连接符；关「末级回填」可只展开不选。",
    提示词: "帮我做\"级联选择器\"（纯 HTML/CSS/JS）：\n效果：上下级数据逐级展开多列面板，每列点选在其右侧展开下一级，末级自动把完整路径（如 中国 / 浙江 / 杭州）回填触发区。\n用法示例：\n<div class=\"panel\"><div class=\"col\">中国/美国</div><div class=\"col\">浙江/江苏…</div></div>\n// choose(ci,node)：path=path.slice(0,ci); 有 children 就展开下一列，否则回填\n关键参数：\n- theme 主题色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / panelW 面板列宽（px） / pathColor 路径文字色 / border 边框色 / hoverBg 选项悬浮背景 / arrowColor 箭头色 / sep 路径分隔符 / lastFill 末级回填\n集成步骤：\n1. 复制 assets/demos/级联选择器.html 单文件\n2. TREE 换成你的层级数据（name + children 递归）\n3. 调「路径分隔符/面板列宽/末级回填」；apply() 映射到 CSS 变量",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>级联选择器演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:260px; }\n  .trigger {\n    width:100%; padding:11px 14px; background:#fff; border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px);\n    font-size:15px; color:var(--text,#1f2937); cursor:pointer; user-select:none; box-shadow:0 4px 14px rgba(0,0,0,.12);\n    display:flex; align-items:center; gap:8px; justify-content:space-between;\n  }\n  .trigger .val.ph { color:#9ca3af; }\n  .trigger .val.path { color:var(--pc,#2563eb); font-weight:600; }\n  .panel {\n    position:absolute; top:calc(100% + 6px); left:0; display:flex; gap:var(--cgap,4px); background:#fff;\n    border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px); box-shadow:0 12px 30px rgba(0,0,0,.12);\n    padding:6px; opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5;\n  }\n  .field.open .panel { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .col { width:var(--pw,180px); max-height:240px; overflow:auto; }\n  .col + .col { border-left:1px solid var(--border,#d1d5db); }\n  .ci { display:flex; align-items:center; justify-content:space-between; padding:9px 12px; border-radius:7px; font-size:15px; color:var(--text,#1f2937); cursor:pointer; }\n  .ci:hover { background:var(--hover,#eff6ff); }\n  .ci.on { color:var(--theme,#2563eb); font-weight:700; }\n  .ci .a { color:var(--arrow,#9ca3af); }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"val ph\" id=\"val\">请选择地区</span>\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"panel\" id=\"panel\"></div>\n  </div>\n  <p class=\"hint\">逐级选择 · 末级回填完整路径</p>\n<script>\n  const TREE = [\n    { name:\"中国\", children:[\n      { name:\"浙江\", children:[{name:\"杭州\"},{name:\"宁波\"},{name:\"温州\"}] },\n      { name:\"江苏\", children:[{name:\"南京\"},{name:\"苏州\"},{name:\"无锡\"}] },\n      { name:\"广东\", children:[{name:\"广州\"},{name:\"深圳\"},{name:\"东莞\"}] }\n    ]},\n    { name:\"美国\", children:[\n      { name:\"加州\", children:[{name:\"旧金山\"},{name:\"洛杉矶\"}] },\n      { name:\"纽约州\", children:[{name:\"纽约市\"},{name:\"布法罗\"}] }\n    ]}\n  ];\n  const state = {\n    theme:\"#2563eb\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.2, panelW:180,\n    pathColor:\"#2563eb\", border:\"#d1d5db\", hoverBg:\"#eff6ff\", arrowColor:\"#9ca3af\", sep:\" / \", colGap:4, lastFill:true\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), val=document.getElementById(\"val\"),\n        panel=document.getElementById(\"panel\");\n  let path=[], cols=[TREE], open=false;\n  function render(){\n    panel.innerHTML=\"\";\n    cols.forEach((list, ci)=>{\n      const col=document.createElement(\"div\"); col.className=\"col\";\n      list.forEach(node=>{\n        const d=document.createElement(\"div\");\n        const on = path[ci] && path[ci].name===node.name;\n        d.className=\"ci\"+(on?\" on\":\"\");\n        d.innerHTML='<span>'+node.name+'</span>'+(node.children?'<span class=\"a\">›</span>':'');\n        d.onclick=()=> choose(ci, node);\n        col.appendChild(d);\n      });\n      panel.appendChild(col);\n    });\n  }\n  function choose(ci, node){\n    path=path.slice(0,ci); path[ci]=node;\n    if(node.children){ cols=cols.slice(0,ci+1); cols[ci+1]=node.children; render(); }\n    else {\n      if(state.lastFill){ val.textContent=path.map(p=>p.name).join(state.sep); val.classList.remove(\"ph\"); val.classList.add(\"path\"); }\n      open=false; field.classList.remove(\"open\");\n    }\n  }\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); if(open) render(); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--radius\",state.radius+\"px\");\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--pw\",state.panelW+\"px\");\n    R.setProperty(\"--pc\",state.pathColor); R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--arrow\",state.arrowColor);\n    render();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v138",
    标题: "多选下拉",
    分类: "组件",
    子类: "多选",
    风格: [
      "高效",
      "通用"
    ],
    场景: [
      "表单",
      "标签筛选",
      "全站通用"
    ],
    元素: [
      "下拉",
      "标签"
    ],
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
    效果说明: "支持多选的下拉：选中项以标签（chip）形式呈现在触发区，标签带 × 可删除；超过「最大标签数」时折叠为 +N。选中数量与关联结果同步更新，适合给一条数据挂多个标签/分类。",
    用法: "勾选添加、点 × 删除；数量实时同步。调「标签底色/标签圆角」定气质；调「最大标签数」控制触发区长度。",
    提示词: "帮我做\"多选下拉\"（纯 HTML/CSS/JS）：\n效果：支持多选，选中项以标签 chip 呈现在触发区、带 × 删除；超「最大标签数」折叠为 +N，数量与结果同步。\n用法示例：\n<div class=\"trigger\"><span class=\"tag\">设计 <b>×</b></span>...</div>\n// 勾选：sel.push(o); 删除：sel=sel.filter(x=>x!==o); 渲染标签\n关键参数：\n- theme 主题色 / tagBg 标签底色 / text 文本色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / border 边框色 / hoverBg 选项悬浮背景 / tagText 标签文字色 / tagRadius 标签圆角（px） / placeholder 占位文案 / maxTags 最大标签数（0=不限）\n集成步骤：\n1. 复制 assets/demos/多选下拉.html 单文件\n2. OPTIONS 换成你的数据；renderTags() 渲染 chip、maxTags 控制折叠\n3. 调「标签底色/标签圆角/最大标签数」定气质",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>多选下拉演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f6f8; font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  .field { position:relative; width:300px; }\n  .trigger {\n    min-height:46px; display:flex; align-items:center; flex-wrap:wrap; gap:6px; padding:8px 12px; background:#fff;\n    border:1px solid var(--border,#d1d5db); border-radius:var(--radius,10px); cursor:pointer; user-select:none;\n    box-shadow:0 4px 14px rgba(0,0,0,.12); transition:border-color .15s;\n  }\n  .field.open .trigger { border-color:var(--theme,#2563eb); }\n  .trigger .ph { color:#9ca3af; font-size:var(--fs,15px); }\n  .tag {\n    display:inline-flex; align-items:center; gap:6px; padding:4px 8px; background:var(--tagbg,#dbeafe);\n    color:var(--tagtext,#1e40af); border-radius:var(--tr,6px); font-size:13px; font-weight:600;\n  }\n  .tag b { cursor:pointer; font-weight:700; opacity:.7; }\n  .tag b:hover { opacity:1; }\n  .caret { margin-left:auto; color:#6b7280; transition:transform var(--dur,.2s) ease; }\n  .field.open .caret { transform:rotate(180deg); }\n  .menu {\n    position:absolute; top:calc(100% + 6px); left:0; right:0; background:#fff; border:1px solid var(--border,#d1d5db);\n    border-radius:var(--radius,10px); box-shadow:0 10px 30px rgba(0,0,0,.12); max-height:260px; overflow:auto;\n    opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur,.2s) ease, transform var(--dur,.2s) ease; z-index:5; padding:6px;\n  }\n  .field.open .menu { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .opt { display:flex; align-items:center; gap:10px; padding:9px 12px; font-size:var(--fs,15px); color:var(--text,#1f2937); border-radius:7px; cursor:pointer; }\n  .opt:hover { background:var(--hover,#eff6ff); }\n  .box { width:16px; height:16px; border:2px solid var(--border,#d1d5db); border-radius:5px; display:flex; align-items:center; justify-content:center; flex:none; }\n  .opt.on .box { background:var(--theme,#2563eb); border-color:var(--theme,#2563eb); }\n  .opt.on .box::after { content:\"✓\"; color:#fff; font-size:12px; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n</style>\n</head>\n<body>\n  <div class=\"field\" id=\"field\">\n    <div class=\"trigger\" id=\"trigger\">\n      <span class=\"ph\" id=\"ph\">请选择（可多选）</span>\n      <svg class=\"caret\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>\n    </div>\n    <div class=\"menu\" id=\"menu\"></div>\n  </div>\n  <p class=\"hint\">选中以标签呈现 · 可删除 · 数量与结果同步</p>\n<script>\n  const OPTIONS = [\"设计\",\"前端\",\"后端\",\"产品\",\"运营\",\"测试\",\"数据\",\"算法\"];\n  const state = {\n    theme:\"#2563eb\", tagBg:\"#dbeafe\", text:\"#1f2937\", radius:10, fontSize:15, dur:0.2,\n    border:\"#d1d5db\", hoverBg:\"#eff6ff\", tagText:\"#1e40af\", tagRadius:6, placeholder:\"请选择（可多选）\", maxTags:0\n  };\n  const field=document.getElementById(\"field\"), trigger=document.getElementById(\"trigger\"), ph=document.getElementById(\"ph\"), menu=document.getElementById(\"menu\");\n  let sel=[], open=false;\n  function buildMenu(){\n    menu.innerHTML=\"\";\n    OPTIONS.forEach(o=>{\n      const d=document.createElement(\"div\"); d.className=\"opt\"+(sel.includes(o)?\" on\":\"\");\n      d.innerHTML='<span class=\"box\"></span><span>'+o+'</span>';\n      d.onclick=()=>{ sel.includes(o)?sel=sel.filter(x=>x!==o):sel.push(o); renderTags(); buildMenu(); };\n      menu.appendChild(d);\n    });\n  }\n  function renderTags(){\n    trigger.querySelectorAll(\".tag\").forEach(t=>t.remove());\n    const show = state.maxTags>0 ? sel.slice(0,state.maxTags) : sel;\n    const extra = state.maxTags>0 ? sel.length-state.maxTags : 0;\n    show.forEach(o=>{\n      const t=document.createElement(\"span\"); t.className=\"tag\"; t.innerHTML='<span>'+o+'</span><b>×</b>';\n      t.querySelector(\"b\").onclick=(e)=>{ e.stopPropagation(); sel=sel.filter(x=>x!==o); renderTags(); buildMenu(); };\n      trigger.insertBefore(t, trigger.querySelector(\".caret\"));\n    });\n    if(extra>0){ const t=document.createElement(\"span\"); t.className=\"tag\"; t.innerHTML='<span>+'+extra+'</span>'; trigger.insertBefore(t, trigger.querySelector(\".caret\")); }\n    ph.style.display = sel.length ? \"none\" : \"\";\n  }\n  trigger.onclick=()=>{ open=!open; field.classList.toggle(\"open\",open); };\n  document.addEventListener(\"click\",e=>{ if(!field.contains(e.target)){ open=false; field.classList.remove(\"open\"); } });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--tagbg\",state.tagBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--dur\",state.dur+\"s\");\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--hover\",state.hoverBg); R.setProperty(\"--tagtext\",state.tagText);\n    R.setProperty(\"--tr\",state.tagRadius+\"px\");\n    ph.textContent=state.placeholder;\n    buildMenu(); renderTags();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v139",
    标题: "大型菜单",
    分类: "组件",
    子类: "菜单",
    风格: [
      "信息密度",
      "导航"
    ],
    场景: [
      "导航栏",
      "门户",
      "全站通用"
    ],
    元素: [
      "导航",
      "面板"
    ],
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
    效果说明: "导航栏的多分类展开面板：悬停某栏目（如「产品」）弹出含多个分类列的宽面板，每列有图标 + 标题 + 一行说明，点击栏目切换预览并跳转页面。是信息密度高的门户/产品站标配导航。",
    用法: "悬停「产品」展开面板；点栏目触发动作。调「列数」控制面板宽度（2/3/4）；调「图标色/说明文字色」定信息层级。",
    提示词: "帮我做\"大型菜单 / Mega Menu\"（纯 HTML/CSS/JS）：\n效果：导航栏悬停展开多分类宽面板，每列有图标 + 标题 + 一行说明，点栏目触发动作。信息密度高的门户/产品站标配。\n用法示例：\n<nav><div class=\"mega-wrap\"><a>产品 ▾</a><div class=\"panel\">列…</div></div></nav>\n// 悬停 mega-wrap 加 .open；列数 = MENU.slice(0, cols)\n关键参数：\n- theme 主题色 / panelBg 面板底色 / text 文本色 / titleColor 栏目标题色 / radius 圆角（px） / fontSize 字号（px） / dur 展开时长（秒） / iconColor 图标色 / hoverBg 栏目悬浮背景 / border 边框色 / cols 列数 / descColor 说明文字色\n集成步骤：\n1. 复制 assets/demos/大型菜单.html 单文件\n2. MENU 换成你的分类数据（title + items[{ic,nm,ds}]）\n3. 调「列数/图标色/说明文字色」；hover 触发展开、点击外部关闭",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>大型菜单演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  body { min-height:100vh; font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f5f6f8; }\n  .nav { display:flex; gap:6px; padding:14px 22px; background:#fff; border-bottom:1px solid var(--border,#e5e7eb); }\n  .nav a { padding:8px 14px; font-size:15px; color:var(--text,#1f2937); cursor:pointer; border-radius:8px; user-select:none; }\n  .nav a:hover { background:var(--hover,#f3f4f6); }\n  .nav a.mega { font-weight:700; }\n  .mega-wrap { position:relative; }\n  .panel {\n    position:absolute; top:calc(100% + 10px); left:0; display:flex; gap:22px; background:var(--pb,#fff);\n    border:1px solid var(--border,#e5e7eb); border-radius:var(--radius,12px); box-shadow:0 16px 40px rgba(0,0,0,.12);\n    padding:18px 22px; opacity:0; transform:translateY(-8px); pointer-events:none; transition:opacity var(--dur,.22s) ease, transform var(--dur,.22s) ease; z-index:20;\n  }\n  .mega-wrap.open .panel { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .col { min-width:170px; }\n  .col .ct { font-size:13px; font-weight:800; color:var(--tc,#111827); letter-spacing:.03em; margin-bottom:8px; }\n  .item { display:flex; gap:11px; padding:9px 10px; border-radius:9px; cursor:pointer; }\n  .item:hover { background:var(--hover,#f3f4f6); }\n  .ic { width:34px; height:34px; flex:none; display:flex; align-items:center; justify-content:center; border-radius:9px;\n        background:color-mix(in srgb, var(--ic,#2563eb) 14%, #fff); color:var(--ic,#2563eb); font-size:17px; }\n  .item .nm { font-size:15px; font-weight:600; color:var(--text,#1f2937); }\n  .item .ds { font-size:12px; color:var(--dc,#6b7280); margin-top:2px; }\n  .hint { position:fixed; bottom:14px; left:0; right:0; text-align:center; font-size:13px; color:#999; }\n  .toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(10px); opacity:0; background:#111827; color:#fff; padding:10px 18px; border-radius:10px; font-size:14px; transition:.2s; }\n  .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }\n</style>\n</head>\n<body>\n  <nav class=\"nav\">\n    <a>首页</a>\n    <div class=\"mega-wrap\" id=\"mw\">\n      <a class=\"mega\" id=\"mega\">产品 ▾</a>\n      <div class=\"panel\" id=\"panel\"></div>\n    </div>\n    <a>定价</a>\n    <a>文档</a>\n  </nav>\n  <p class=\"hint\">悬停「产品」展开含图标与说明的多分类面板</p>\n  <div class=\"toast\" id=\"toast\"></div>\n<script>\n  const MENU = [\n    { title:\"设计工具\", items:[\n      { ic:\"✎\", nm:\"Figma\", ds:\"协作式界面设计\" },\n      { ic:\"◑\", nm:\"Sketch\", ds:\"矢量界面设计\" }\n    ]},\n    { title:\"开发\", items:[\n      { ic:\"</>\", nm:\"VS Code\", ds:\"轻量代码编辑器\" },\n      { ic:\"⚡\", nm:\"WebStorm\", ds:\"智能 IDE\" }\n    ]},\n    { title:\"协作\", items:[\n      { ic:\"◎\", nm:\"Slack\", ds:\"团队沟通\" },\n      { ic:\"▤\", nm:\"Notion\", ds:\"文档与知识库\" }\n    ]},\n    { title:\"分析\", items:[\n      { ic:\"▦\", nm:\"Amplitude\", ds:\"产品行为分析\" },\n      { ic:\"◔\", nm:\"Mixpanel\", ds:\"漏斗与留存\" }\n    ]}\n  ];\n  const state = {\n    theme:\"#2563eb\", panelBg:\"#ffffff\", text:\"#1f2937\", titleColor:\"#111827\", radius:12, fontSize:15, dur:0.22,\n    iconColor:\"#2563eb\", hoverBg:\"#f3f4f6\", border:\"#e5e7eb\", cols:3, descColor:\"#6b7280\"\n  };\n  const mw=document.getElementById(\"mw\"), mega=document.getElementById(\"mega\"), panel=document.getElementById(\"panel\"), toast=document.getElementById(\"toast\");\n  let t=null;\n  function showToast(m){ toast.textContent=\"打开：\"+m; toast.classList.add(\"show\"); clearTimeout(t); t=setTimeout(()=>toast.classList.remove(\"show\"),1400); }\n  function render(){\n    const n=Math.max(2,Math.min(4,state.cols));\n    panel.innerHTML = MENU.slice(0,n).map(c=>'<div class=\"col\"><div class=\"ct\">'+c.title+'</div>'+\n      c.items.map(i=>'<div class=\"item\" data-nm=\"'+i.nm+'\"><div class=\"ic\">'+i.ic+'</div><div><div class=\"nm\">'+i.nm+'</div><div class=\"ds\">'+i.ds+'</div></div></div>').join(\"\")+'</div>').join(\"\");\n    [...panel.querySelectorAll(\".item\")].forEach(it=> it.onclick=()=> showToast(it.dataset.nm));\n  }\n  mega.onmouseenter=()=>{ mw.classList.add(\"open\"); };\n  mw.onmouseleave=()=>{ mw.classList.remove(\"open\"); };\n  document.addEventListener(\"click\",e=>{ if(!mw.contains(e.target)) mw.classList.remove(\"open\"); });\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--pb\",state.panelBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--tc\",state.titleColor); R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--ic\",state.iconColor); R.setProperty(\"--hover\",state.hoverBg);\n    R.setProperty(\"--border\",state.border); R.setProperty(\"--dc\",state.descColor);\n    render();\n  }\n  window.addEventListener(\"message\",e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
            "id": "v140",
            "标题": "光标探照揭示 Hero",
            "分类": "特效",
            "子类": "光标交互",
            "风格": [
              "沉浸暗色",
              "叙事感",
              "高级"
            ],
            "场景": [
              "品牌首屏",
              "作品集",
              "产品发布",
              "地理/科普叙事"
            ],
            "元素": [
              "光标跟随",
              "蒙版揭示",
              "图层",
              "首屏"
            ],
            "搭配": [
              "滚动揭示",
              "文字逐行"
            ],
            "标签": [
              "光标",
              "探照",
              "蒙版",
              "揭示",
              "hero",
              "canvas",
              "鼠标"
            ],
            "来源": "网站拆解：motionsites.ai Interactive Discovery Hero（2026-08-30 提取，光标探照揭示机制，零依赖实现）",
            "效果演示": "assets/demos/光标探照揭示.html",
            "参数": [
              {
                "键": "radius",
                "名": "探照半径（px）",
                "类型": "slider",
                "最小": 80,
                "最大": 480,
                "步长": 10,
                "默认": 260
              },
              {
                "键": "ease",
                "名": "缓动系数",
                "类型": "slider",
                "最小": 0.02,
                "最大": 0.3,
                "步长": 0.01,
                "默认": 0.1
              },
              {
                "键": "baseImg",
                "名": "底图 URL",
                "类型": "string",
                "默认": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85"
              },
              {
                "键": "revealImg",
                "名": "揭示图 URL",
                "类型": "string",
                "默认": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85"
              },
              {
                "键": "centerColor",
                "名": "锥光中心色",
                "类型": "color",
                "默认": "#ffffff"
              },
              {
                "键": "headingColor",
                "名": "标题色",
                "类型": "color",
                "默认": "#ffffff"
              },
              {
                "键": "accentColor",
                "名": "按钮色",
                "类型": "color",
                "默认": "#e8702a"
              },
              {
                "键": "baseTint",
                "名": "底图品牌叠加色",
                "类型": "color",
                "默认": "#1b1206"
              },
              {
                "键": "revealTint",
                "名": "揭示图叠加色",
                "类型": "color",
                "默认": "#3a2a12"
              },
              {
                "键": "titleText",
                "名": "标题第一行",
                "类型": "string",
                "默认": "Layers hold"
              },
              {
                "键": "subText",
                "名": "标题第二行",
                "类型": "string",
                "默认": "tales of time"
              },
              {
                "键": "btnText",
                "名": "按钮文字",
                "类型": "string",
                "默认": "Start Digging"
              }
            ],
            "效果说明": "鼠标光标处跟随一个柔和圆形光晕，光晕内通过 canvas 径向渐变生成的蒙版揭示藏在主图之下的第二张画面；光晕边缘平滑渐隐，离开后第二张图被重新遮住。适合地理/科普/作品集类叙事型首屏，制造「探索发现」的沉浸感。",
            "用法": "移动鼠标即可看到揭示；调「探照半径」控制光圈大小，「缓动系数」控制跟随快慢（越小越黏），「锥光中心色」控制光圈亮度；换「底图/揭示图 URL」即可套用自有素材；「两层品牌叠加色」给画面统一色调。可直接把 state+apply()+postMessage 思路搬进 React/Vue。",
            "提示词": "【效果】鼠标光标处跟随一个柔和圆形光晕，光晕内通过 canvas 径向渐变生成的蒙版揭示藏在主图之下的第二张画面；光晕边缘平滑渐隐，离开后第二张图被重新遮住。适合地理/科普/作品集类叙事型首屏，制造「探索发现」的沉浸感。\n【用法示例】\n- 把第二张图换成你的产品截图：调「揭示图 URL」即可，光晕会自然揭示它。\n- 想要更明显的探索感：把「探照半径」调到 360+，「缓动系数」降到 0.06。\n- 套品牌色：改「按钮色」「锥光中心色」「两层品牌叠加色」。\n【关键参数】\n• 探照半径（px）（slider）：默认 260\n• 缓动系数（slider）：默认 0.1\n• 底图 URL（string）：默认 https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85\n• 揭示图 URL（string）：默认 https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85\n• 锥光中心色（color）：默认 #ffffff\n• 标题色（color）：默认 #ffffff\n• 按钮色（color）：默认 #e8702a\n• 底图品牌叠加色（color）：默认 #1b1206\n• 揭示图叠加色（color）：默认 #3a2a12\n• 标题第一行（string）：默认 Layers hold\n• 标题第二行（string）：默认 tales of time\n• 按钮文字（string）：默认 Start Digging\n【集成步骤】复制下方「代码」字段（零依赖完整 HTML，含 canvas 蒙版 + RAF 平滑跟随 + postMessage 调参），或把 RevealLayer 思路搬进 React（见 Lithos 成品）。",
            "代码": "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>光标探照揭示 · 单文件 demo</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  html, body { height: 100%; font-family: 'Inter', system-ui, sans-serif; }\n  .stage { position: relative; width: 100%; height: 100vh; overflow: hidden; background: #000; }\n  .layer { position: absolute; inset: 0; background-size: cover; background-position: center; background-repeat: no-repeat; }\n  .base  { z-index: 10; }\n  .tint  { position: absolute; inset: 0; z-index: 20; pointer-events: none; mix-blend-mode: multiply; }\n  .reveal{ z-index: 30; pointer-events: none; }\n  .revealTint { position: absolute; inset: 0; z-index: 35; pointer-events: none; mix-blend-mode: soft-light; }\n  .head  { position: absolute; top: 14%; left: 0; right: 0; z-index: 50; text-align: center; padding: 0 20px; pointer-events: none; }\n  .head h1 { color: #fff; line-height: 0.95; }\n  .head .l1 { display: block; font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 400; font-size: clamp(40px, 8vw, 96px); }\n  .head .l2 { display: block; font-weight: 400; font-size: clamp(40px, 8vw, 96px); margin-top: -4px; }\n  .blurb { position: absolute; left: 5%; right: 5%; bottom: 8%; z-index: 50; max-width: 300px; display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }\n  .blurb p { color: rgba(255,255,255,0.82); line-height: 1.6; font-size: 14px; }\n  .blurb button { border: 0; color: #fff; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 9999px; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease; }\n  .blurb button:hover { transform: scale(1.03); }\n  .blurb button:active { transform: scale(0.95); }\n  .badge { position: fixed; left: 14px; bottom: 12px; z-index: 90; font-size: 11px; color: rgba(255,255,255,0.55); }\n</style>\n</head>\n<body>\n  <div class=\"stage\" id=\"stage\">\n    <div class=\"layer base\" id=\"base\"></div>\n    <div class=\"tint\" id=\"baseTint\"></div>\n    <canvas id=\"cmask\" style=\"display:none\"></canvas>\n    <div class=\"layer reveal\" id=\"reveal\"></div>\n    <div class=\"revealTint\" id=\"revealTint\"></div>\n    <div class=\"head\">\n      <h1>\n        <span class=\"l1\" id=\"t1\">Layers hold</span>\n        <span class=\"l2\" id=\"t2\">tales of time</span>\n      </h1>\n    </div>\n    <div class=\"blurb\">\n      <p id=\"desc\">移动光标，柔和光晕会揭示藏在底图之下的第二张画面 —— 这是地理叙事站最常用的「探索式首屏」。</p>\n      <button id=\"cta\">Start Digging</button>\n    </div>\n    <div class=\"badge\">光标探照揭示 · postMessage 可调参</div>\n  </div>\n\n<script>\n/* ---------- 可调参数（与弹药库 params 一一对应，12 项、5 颜色） ---------- */\nconst state = {\n  radius: 260,        // 探照半径(px) slider\n  ease: 0.1,          // 缓动系数(0.02~0.3) slider\n  baseImg: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85',\n  revealImg: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85',\n  centerColor: '#ffffff',   // 锥光中心色 color\n  headingColor: '#ffffff',  // 标题色 color\n  accentColor: '#e8702a',   // 按钮色 color\n  baseTint: '#1b1206',      // 底图品牌色叠加 color\n  revealTint: '#3a2a12',    // 揭示图叠加 color\n  titleText: 'Layers hold', // 标题第一行 string\n  subText: 'tales of time',  // 标题第二行 string\n  btnText: 'Start Digging'   // 按钮文字 string\n};\n\nconst base = document.getElementById('base');\nconst baseTint = document.getElementById('baseTint');\nconst reveal = document.getElementById('reveal');\nconst revealTint = document.getElementById('revealTint');\nconst canvas = document.getElementById('cmask');\nconst ctx = canvas.getContext('2d');\nconst t1 = document.getElementById('t1');\nconst t2 = document.getElementById('t2');\nconst desc = document.getElementById('desc');\nconst cta = document.getElementById('cta');\n\n/* 鼠标平滑跟随 */\nconst mouse = { x: -999, y: -999 };\nconst smooth = { x: -999, y: -999 };\nconst cur = { x: -999, y: -999 };\nlet raf = null;\n\nfunction hexA(hex, a) {\n  const m = hex.replace('#', '');\n  const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m;\n  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);\n  return `rgba(${r},${g},${b},${a})`;\n}\n\nfunction apply() {\n  base.style.backgroundImage = `url(${state.baseImg})`;\n  reveal.style.backgroundImage = `url(${state.revealImg})`;\n  baseTint.style.background = state.baseTint;\n  revealTint.style.background = state.revealTint;\n  t1.textContent = state.titleText;\n  t2.textContent = state.subText;\n  cta.textContent = state.btnText;\n  t1.style.color = state.headingColor;\n  t2.style.color = state.headingColor;\n  cta.style.background = state.accentColor;\n  cta.style.boxShadow = `0 10px 30px ${hexA(state.accentColor, 0.33)}`;\n  drawMask();\n}\n\nfunction drawMask() {\n  const w = window.innerWidth, h = window.innerHeight;\n  canvas.width = w; canvas.height = h;\n  ctx.clearRect(0, 0, w, h);\n  const r = Math.max(1, state.radius);\n  const g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, r);\n  const cc = hexA(state.centerColor, 1);\n  g.addColorStop(0, cc);\n  g.addColorStop(0.4, cc);\n  g.addColorStop(0.6, hexA(state.centerColor, 0.75));\n  g.addColorStop(0.75, hexA(state.centerColor, 0.4));\n  g.addColorStop(0.88, hexA(state.centerColor, 0.12));\n  g.addColorStop(1, hexA(state.centerColor, 0));\n  ctx.fillStyle = g;\n  ctx.beginPath();\n  ctx.arc(cur.x, cur.y, r, 0, Math.PI * 2);\n  ctx.fill();\n  const url = canvas.toDataURL();\n  reveal.style.maskImage = `url(${url})`;\n  reveal.style.webkitMaskImage = `url(${url})`;\n  reveal.style.maskSize = '100% 100%';\n  reveal.style.webkitMaskSize = '100% 100%';\n}\n\nwindow.addEventListener('mousemove', e => {\n  mouse.x = e.clientX; mouse.y = e.clientY;\n  if (smooth.x === -999) { smooth.x = e.clientX; smooth.y = e.clientY; }\n});\nwindow.addEventListener('resize', drawMask);\n\nfunction loop() {\n  smooth.x += (mouse.x - smooth.x) * state.ease;\n  smooth.y += (mouse.y - smooth.y) * state.ease;\n  cur.x = smooth.x; cur.y = smooth.y;\n  drawMask();\n  raf = requestAnimationFrame(loop);\n}\nraf = requestAnimationFrame(loop);\n\n/* 外部调参契约（弹药库 iframe 用 postMessage 控制） */\nwindow.addEventListener('message', ev => {\n  const d = ev.data;\n  if (d && d.type === 'param' && d.key in state) {\n    state[d.key] = d.value;\n    apply();\n  }\n});\n\napply();\n<\\/script>\n</body>\n</html>\n",
            "复用记录": 0
          },
  {
            "id": "v141",
            "标题": "Interactive Discovery 整站首屏",
            "分类": "方案",
            "子类": "整站首屏",
            "风格": [
              "沉浸暗色",
              "叙事感",
              "品牌首屏",
              "高级"
            ],
            "场景": [
              "品牌首屏",
              "作品集",
              "产品发布",
              "地理/科普叙事"
            ],
            "元素": [
              "光标跟随",
              "蒙版揭示",
              "导航胶囊",
              "首屏",
              "品牌色",
              "入场动画"
            ],
            "搭配": [
              "光标探照揭示 Hero"
            ],
            "标签": [
              "interactive discovery",
              "整站方案",
              "hero",
              "光标",
              "蒙版",
              "导航胶囊",
              "品牌色",
              "Playfair"
            ],
            "来源": "网站拆解：motionsites.ai Interactive Discovery Hero（2026-08-30 提取，整站首屏方案，零依赖实现；与 v140 配套）",
            "效果演示": "assets/demos/interactive_discovery_hero.html",
            "参数": [
              {
                "键": "baseImg",
                "名": "底图 URL",
                "类型": "string",
                "默认": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85"
              },
              {
                "键": "revealImg",
                "名": "揭示图 URL",
                "类型": "string",
                "默认": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85"
              },
              {
                "键": "accent",
                "名": "强调色",
                "类型": "color",
                "默认": "#e8702a"
              },
              {
                "键": "headingColor",
                "名": "标题色",
                "类型": "color",
                "默认": "#ffffff"
              },
              {
                "键": "navBg",
                "名": "导航底色",
                "类型": "color",
                "默认": "#ffffff"
              },
              {
                "键": "baseTint",
                "名": "底图叠加色",
                "类型": "color",
                "默认": "#1b1206"
              },
              {
                "键": "revealTint",
                "名": "揭示层叠加色",
                "类型": "color",
                "默认": "#3a2a12"
              },
              {
                "键": "titleText",
                "名": "标题第一行",
                "类型": "string",
                "默认": "Layers hold"
              },
              {
                "键": "subText",
                "名": "标题第二行",
                "类型": "string",
                "默认": "tales of time"
              },
              {
                "键": "btnText",
                "名": "按钮文字",
                "类型": "string",
                "默认": "Start Digging"
              },
              {
                "键": "leftCopy",
                "名": "左下文案",
                "类型": "string",
                "默认": "Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us."
              },
              {
                "键": "radius",
                "名": "探照半径（px）",
                "类型": "slider",
                "最小": 80,
                "最大": 480,
                "步长": 10,
                "默认": 260
              }
            ],
            "效果说明": "一套「交互式发现（Interactive Discovery）」整站首屏的装配方案：底图(z-10)+光标探照揭示层(z-30)+文字按钮(z-50)+固定导航胶囊(z-100)四层叠加；鼠标光晕揭示藏在主图之下的第二张画面（机制见 v140）；固定导航含 Logo+居中胶囊(Course 高亮)+Sign Up+移动端汉堡；标题用 Playfair Display 斜体；入场三类 keyframes(blur-rise/fade-up/Ken Burns zoom)错峰 delay，并尊重 prefers-reduced-motion。参数即「品牌 token」，换图/换色/换文案即可套成你自己的发现式首屏。",
            "用法": "移动鼠标看揭示；调「探照半径」控光圈，「强调色」改按钮/品牌主色，「标题色/导航底色」改文字与胶囊，「底图叠加色/揭示层叠加色」统一画面色调，「标题第一行/第二行/按钮文字/左下文案」改品牌叙事。直接复制「代码」字段（零依赖完整 HTML），或把结构搬进 React/Vue（见 Lithos 成品）。",
            "提示词": "【效果】交互式发现整站首屏：四层 z 序（底图/光标探照揭示层/文字按钮/固定导航胶囊），鼠标光晕揭示第二张图，Playfair 斜体大标题，入场三类错峰动画。\n【用法示例】\n- 套自有品牌：改「强调色」(按钮/主色)、「导航底色」(胶囊)、「底图叠加色/揭示层叠加色」(画面色调)。\n- 换素材：改「底图 URL / 揭示图 URL」即可；「探照半径」调光圈。\n- 改叙事：改「标题第一行/第二行/按钮文字/左下文案」。\n【关键参数】\n• 底图 URL / 揭示图 URL（图片）\n• 强调色 / 标题色 / 导航底色 / 底图叠加色 / 揭示层叠加色（颜色，共 5 个自由取色）\n• 标题第一行 / 标题第二行 / 按钮文字 / 左下文案（文本）\n• 探照半径（px）\n【集成步骤】复制下方「代码」字段（零依赖完整 HTML，含 canvas 蒙版 + RAF 平滑 + 入场动画 + 响应式 + postMessage 调参）；或把分层结构搬进 React（RevealLayer 思路）。",
            "代码": "<!doctype html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" />\n<title>Interactive Discovery Hero（整站方案 · 可调参）</title>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap\" rel=\"stylesheet\" />\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { font-family: 'Inter', system-ui, sans-serif; background: #000; }\n  .font-playfair { font-family: 'Playfair Display', serif; }\n\n  @keyframes heroReveal { 0% { opacity: 0; transform: translateY(28px); filter: blur(12px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }\n  @keyframes heroFadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }\n  @keyframes heroZoom { 0% { transform: scale(1.12); } 100% { transform: scale(1); } }\n  .hero-anim { opacity: 0; animation-fill-mode: forwards; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }\n  .hero-reveal { animation-name: heroReveal; animation-duration: 1.1s; }\n  .hero-fade { animation-name: heroFadeUp; animation-duration: 1s; }\n  .hero-zoom { animation: heroZoom 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }\n  @media (prefers-reduced-motion: reduce) { .hero-anim, .hero-zoom { animation: none; opacity: 1; } }\n\n  #hero { position: relative; width: 100%; height: 100dvh; overflow: hidden; background: #000; }\n  .layer { position: absolute; inset: 0; background-position: center; background-size: cover; background-repeat: no-repeat; }\n  #base { z-index: 10; }\n  #reveal { z-index: 30; pointer-events: none; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: 100% 100%; mask-size: 100% 100%; }\n  #mask { position: absolute; inset: 0; pointer-events: none; display: none; }\n\n  #heading { position: absolute; top: 14%; left: 0; right: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 20px; pointer-events: none; }\n  #heading h1 { color: #fff; line-height: 0.95; }\n  #heading .l1 { display: block; font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; font-size: 48px; letter-spacing: -0.05em; }\n  #heading .l2 { display: block; font-weight: 400; font-size: 48px; letter-spacing: -0.08em; margin-top: -4px; }\n\n  #leftCopy { position: absolute; bottom: 56px; left: 40px; z-index: 50; max-width: 260px; display: none; }\n  #leftCopy p { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6; }\n\n  #rightBlock { position: absolute; bottom: 40px; left: 20px; right: 20px; z-index: 50; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }\n  #rightBlock p { font-size: 13px; color: rgba(255,255,255,0.8); line-height: 1.6; max-width: 260px; }\n  #cta { border: none; cursor: pointer; color: #fff; font-size: 14px; font-weight: 500; padding: 12px 28px; border-radius: 999px; transition: all .25s; }\n  #cta:hover { transform: scale(1.03); }\n  #cta:active { transform: scale(0.95); }\n\n  #nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; }\n  #nav .logo { display: flex; align-items: center; gap: 8px; }\n  #nav .word { color: #fff; font-size: 24px; font-family: 'Playfair Display', serif; font-style: italic; }\n  #nav .pill { display: none; position: absolute; left: 50%; transform: translateX(-50%); align-items: center; gap: 4px; padding: 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.3); }\n  #nav .pill button { border: none; background: transparent; color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 500; padding: 6px 16px; border-radius: 999px; cursor: pointer; }\n  #nav .pill button.active { color: #fff; }\n  #nav .pill button:hover { background: rgba(255,255,255,0.2); color: #fff; }\n  #nav .signup { display: none; background: #fff; color: #111; font-size: 14px; font-weight: 600; padding: 10px 24px; border-radius: 999px; cursor: pointer; }\n  #nav .burger { display: block; background: transparent; border: none; color: #fff; cursor: pointer; }\n\n  @media (min-width: 768px) {\n    #heading .l1, #heading .l2 { font-size: 80px; }\n    #leftCopy { display: block; bottom: 56px; left: 56px; }\n    #rightBlock { left: auto; right: 56px; bottom: 96px; align-items: flex-end; }\n    #rightBlock p { font-size: 14px; }\n    #nav .pill { display: flex; }\n    #nav .signup { display: block; }\n    #nav .burger { display: none; }\n  }\n  @media (min-width: 1024px) {\n    #heading .l1, #heading .l2 { font-size: 96px; }\n  }\n</style>\n</head>\n<body>\n<section id=\"hero\">\n  <div id=\"base\" class=\"layer\"></div>\n  <div id=\"reveal\" class=\"layer\"></div>\n  <canvas id=\"mask\"></canvas>\n\n  <div id=\"heading\">\n    <h1>\n      <span class=\"l1 hero-anim hero-reveal\" id=\"t1\" style=\"animation-delay:.25s;color:#fff\"></span>\n      <span class=\"l2 hero-anim hero-reveal\" id=\"t2\" style=\"animation-delay:.42s;color:#fff\"></span>\n    </h1>\n  </div>\n\n  <div id=\"leftCopy\" class=\"hero-anim hero-fade\" style=\"animation-delay:.7s\"><p id=\"lc\"></p></div>\n\n  <div id=\"rightBlock\" class=\"hero-anim hero-fade\" style=\"animation-delay:.85s\">\n    <p id=\"rc\">Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.</p>\n    <button id=\"cta\">Start Digging</button>\n  </div>\n\n  <nav id=\"nav\">\n    <div class=\"logo\">\n      <svg width=\"26\" height=\"26\" viewBox=\"0 0 256 256\" fill=\"#ffffff\" aria-hidden=\"true\"><path d=\"M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z\" /></svg>\n      <span class=\"word\">Lithos</span>\n    </div>\n    <div class=\"pill\" id=\"pill\">\n      <button class=\"active\">Course</button>\n      <button>Field Guides</button>\n      <button>Geology</button>\n      <button>Plans</button>\n      <button>Live Tour</button>\n    </div>\n    <button class=\"signup\">Sign Up</button>\n    <button class=\"burger\" aria-label=\"menu\">\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M3 6h18M3 12h18M3 18h18\" /></svg>\n    </button>\n  </nav>\n</section>\n\n<script>\n  const state = {\n    baseImg: \"https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85\",\n    revealImg: \"https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85\",\n    accent: \"#e8702a\",\n    headingColor: \"#ffffff\",\n    navBg: \"#ffffff\",\n    baseTint: \"#1b1206\",\n    revealTint: \"#3a2a12\",\n    titleText: \"Layers hold\",\n    subText: \"tales of time\",\n    btnText: \"Start Digging\",\n    leftCopy: \"Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.\",\n    radius: 260\n  };\n\n  const hero = document.getElementById('hero');\n  const base = document.getElementById('base');\n  const reveal = document.getElementById('reveal');\n  const mask = document.getElementById('mask');\n  const t1 = document.getElementById('t1');\n  const t2 = document.getElementById('t2');\n  const lc = document.getElementById('lc');\n  const cta = document.getElementById('cta');\n  const pill = document.getElementById('pill');\n\n  function hexToRgba(hex, a) {\n    const h = hex.replace('#', '');\n    const r = parseInt(h.substring(0, 2), 16);\n    const g = parseInt(h.substring(2, 4), 16);\n    const b = parseInt(h.substring(4, 6), 16);\n    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';\n  }\n\n  // 鼠标平滑：原始坐标 + 缓动坐标 + RAF\n  const mouse = { x: -999, y: -999 };\n  const smooth = { x: -999, y: -999 };\n  const EASE = 0.1;\n  let raf = null;\n\n  function apply() {\n    base.style.backgroundImage = 'linear-gradient(' + hexToRgba(state.baseTint, 0.4) + ',' + hexToRgba(state.baseTint, 0.4) + '), url(\"' + state.baseImg + '\")';\n    reveal.style.backgroundImage = 'linear-gradient(' + hexToRgba(state.revealTint, 0.35) + ',' + hexToRgba(state.revealTint, 0.35) + '), url(\"' + state.revealImg + '\")';\n    t1.textContent = state.titleText;\n    t2.textContent = state.subText;\n    t1.style.color = state.headingColor;\n    t2.style.color = state.headingColor;\n    lc.textContent = state.leftCopy;\n    cta.textContent = state.btnText;\n    cta.style.background = state.accent;\n    pill.style.background = hexToRgba(state.navBg, 0.2);\n  }\n\n  function drawMask() {\n    const w = window.innerWidth, h = window.innerHeight;\n    if (mask.width !== w || mask.height !== h) { mask.width = w; mask.height = h; }\n    const ctx = mask.getContext('2d');\n    ctx.clearRect(0, 0, w, h);\n    const r = state.radius;\n    const g = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, r);\n    g.addColorStop(0, 'rgba(255,255,255,1)');\n    g.addColorStop(0.4, 'rgba(255,255,255,1)');\n    g.addColorStop(0.6, 'rgba(255,255,255,0.75)');\n    g.addColorStop(0.75, 'rgba(255,255,255,0.4)');\n    g.addColorStop(0.88, 'rgba(255,255,255,0.12)');\n    g.addColorStop(1, 'rgba(255,255,255,0)');\n    ctx.fillStyle = g;\n    ctx.beginPath();\n    ctx.arc(smooth.x, smooth.y, r, 0, Math.PI * 2);\n    ctx.fill();\n    const url = mask.toDataURL();\n    reveal.style.webkitMaskImage = 'url(' + url + ')';\n    reveal.style.maskImage = 'url(' + url + ')';\n  }\n\n  function loop() {\n    smooth.x += (mouse.x - smooth.x) * EASE;\n    smooth.y += (mouse.y - smooth.y) * EASE;\n    drawMask();\n    raf = requestAnimationFrame(loop);\n  }\n\n  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });\n  window.addEventListener('resize', () => { mask.width = window.innerWidth; mask.height = window.innerHeight; });\n\n  apply();\n  loop();\n\n  // 详情页调参契约\n  window.addEventListener('message', ev => {\n    if (ev.data && ev.data.type === 'param' && ev.data.key in state) {\n      state[ev.data.key] = ev.data.value;\n      apply();\n    }\n  });\n<\\/script>\n</body>\n</html>\n",
            "复用记录": 0
          },
  {
    id: "v142",
    标题: "悬浮吸顶导航",
    分类: "组件",
    子类: "导航栏",
    风格: [
      "克制简约",
      "通用"
    ],
    场景: [
      "长文阅读",
      "商品列表",
      "全站通用"
    ],
    元素: [
      "吸顶",
      "卡片"
    ],
    搭配: [
      "滚动收缩导航",
      "锚点导航"
    ],
    标签: [
      "吸顶",
      "浮动",
      "sticky",
      "导航栏"
    ],
    来源: "视频拆解：9 种导航类型（2026-09-02 用户提供，导航栏交互拆解；实现代码自写；巨型菜单导航与 v139 重复已跳过）",
    效果演示: "assets/demos/悬浮吸顶导航.html",
    参数: [
      {
        键: "theme",
        名: "主题色",
        类型: "color",
        默认: "#2563eb"
      },
      {
        键: "bg",
        名: "底色",
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
        键: "floatBg",
        名: "吸顶卡片底色",
        类型: "color",
        默认: "#ffffff"
      },
      {
        键: "radius",
        名: "吸顶圆角（px）",
        类型: "slider",
        最小: 0,
        最大: 28,
        步长: 1,
        默认: 16
      },
      {
        键: "threshold",
        名: "吸顶触发阈值（px）",
        类型: "slider",
        最小: 40,
        最大: 400,
        步长: 10,
        默认: 120
      },
      {
        键: "height",
        名: "导航高度（px）",
        类型: "slider",
        最小: 44,
        最大: 88,
        步长: 2,
        默认: 60
      },
      {
        键: "shadow",
        名: "吸顶投影浓度",
        类型: "slider",
        最小: 0,
        最大: 0.4,
        步长: 0.02,
        默认: 0.16
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
    效果说明: "页面顶部时导航融入内容流；一旦滚动越过阈值，就以圆角卡片形式固定在视口顶部并加投影浮起。核心逻辑是匹配长文/列表类页面「持续下滑又随时要跳转」的需求，让用户不丢导航。",
    用法: "滚动越过「吸顶触发阈值」即浮起为卡片。调「吸顶圆角/吸顶投影浓度」控卡片气质；调「吸顶触发阈值」控多晚浮起；「导航高度」控初始条高。",
    提示词: "帮我做\"悬浮吸顶导航\"（纯 HTML/CSS/JS）：\n效果：导航在页面顶部时融入内容流；滚动越过阈值后变成圆角卡片固定在视口顶部并浮起（加投影）。适配长文/商品列表等需持续下滑又随时跳转的页面。\n用法示例：\n<nav id=\"nav\"><div class=\"brand\">站点</div><div class=\"items\">…</div></nav>\n// onscroll: nav.classList.toggle(\"floating\", scrollY>阈值)\n关键参数：\n- theme 主题色 / bg 底色 / text 文字色 / hover 项悬浮底色 / floatBg 吸顶卡片底色 / radius 吸顶圆角（px） / threshold 吸顶触发阈值（px） / height 导航高度（px） / shadow 吸顶投影浓度 / fontSize 字号（px） / brand 品牌文字 / items 导航项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/悬浮吸顶导航.html 单文件（state+apply+postMessage 骨架）\n2. 导航项换成你的数据；apply() 把主题色/圆角/高度映射到 CSS 变量\n3. 详情页 postMessage({type:\"param\",key,value}) 改 state 实时预览",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>悬浮吸顶导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#ffffff; --text:#1f2937; --hover:#eff6ff; --floatBg:#ffffff; --radius:16px; --h:60px; --shadow:.16; --fs:15px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; color:var(--text); background:#f5f6f8; }\n  #nav {\n    position:sticky; top:0; z-index:50; height:var(--h);\n    display:flex; align-items:center; gap:22px; padding:0 26px;\n    background:var(--bg); color:var(--text);\n    transition:all .35s cubic-bezier(.16,1,.3,1);\n  }\n  #nav.floating {\n    position:fixed; top:14px; left:50%; transform:translateX(-50%);\n    width:min(960px,92%); border-radius:var(--radius);\n    background:var(--floatBg); box-shadow:0 12px 34px rgba(0,0,0,var(--shadow));\n  }\n  .brand { font-weight:800; font-size:calc(var(--fs) + 3px); color:var(--theme); letter-spacing:.5px; }\n  .items { display:flex; gap:6px; flex:1; }\n  .item { padding:8px 14px; border-radius:10px; font-size:var(--fs); cursor:pointer; transition:background .15s,color .15s; }\n  .item:hover { background:var(--hover); color:var(--theme); }\n  .cta { background:var(--theme); color:#fff; padding:9px 18px; border-radius:10px; font-size:var(--fs); cursor:pointer; }\n  .hero { height:60vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#dbeafe,#eff6ff); font-size:26px; color:#1e40af; font-weight:800; text-align:center; }\n  .sec { padding:60px 26px; max-width:960px; margin:0 auto; }\n  .sec h2 { margin-bottom:12px; color:#111827; }\n  .sec p { color:#6b7280; line-height:1.9; }\n  .spacer { height:120vh; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\">\n    <div class=\"brand\" id=\"brand\">Lithos</div>\n    <div class=\"items\" id=\"items\"></div>\n    <div class=\"cta\">开始</div>\n  </nav>\n  <div class=\"hero\">向下滚动，看导航变成圆角卡片吸顶</div>\n  <div class=\"sec\"><h2>第一段</h2><p>悬浮吸顶导航在页面顶部时融入内容流；一旦滚动越过阈值，就以圆角卡片形式固定在视口顶部，并加投影浮起。适配长文章、商品列表类等需要持续下滑、又随时要能跳转的页面。</p></div>\n  <div class=\"sec\"><h2>第二段</h2><p>继续滚动，卡片一直跟随。调「吸顶触发阈值」可控制它多晚浮起，调「圆角」「投影浓度」控制卡片气质。</p></div>\n  <div class=\"spacer\"></div>\n<script>\n  const state = {\n    theme:\"#2563eb\", bg:\"#ffffff\", text:\"#1f2937\", hover:\"#eff6ff\", floatBg:\"#ffffff\",\n    radius:16, threshold:120, height:60, shadow:0.16, fontSize:15,\n    brand:\"Lithos\", items:\"首页,课程,作品,关于\"\n  };\n  const nav=document.getElementById(\"nav\"), itemsEl=document.getElementById(\"items\"), brandEl=document.getElementById(\"brand\");\n  function renderItems(){\n    itemsEl.innerHTML=\"\";\n    state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"item\"; d.textContent=t; itemsEl.appendChild(d); });\n  }\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--floatBg\",state.floatBg);\n    R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--h\",state.height+\"px\");\n    R.setProperty(\"--shadow\",state.shadow); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    brandEl.textContent=state.brand; renderItems();\n  }\n  function onScroll(){ nav.classList.toggle(\"floating\", window.scrollY > state.threshold); }\n  window.addEventListener(\"scroll\", onScroll);\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); onScroll(); });\n  apply(); onScroll();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v143",
    标题: "侧边栏导航",
    分类: "组件",
    子类: "导航栏",
    风格: [
      "信息密度",
      "后台"
    ],
    场景: [
      "后台",
      "编辑器",
      "文档站"
    ],
    元素: [
      "侧栏",
      "折叠"
    ],
    搭配: [
      "悬浮吸顶导航",
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
    效果说明: "左侧竖排布局，支持折叠展开：收起后仅显示图标，为后台、编辑器类页面释放内容空间。核心逻辑是常驻导航又不挤占正文宽度，匹配工具类产品的信息密度需求。",
    用法: "点左上「≡」折叠/展开；当前项高亮主题色。调「展开宽/收起宽」控两种状态宽度；调「图标大小/折叠动画时长」定节奏。",
    提示词: "帮我做\"侧边栏导航\"（纯 HTML/CSS/JS）：\n效果：左侧竖排，点按钮可折叠/展开；收起后仅留图标，为后台/编辑器释放内容空间。当前项高亮主题色。\n用法示例：\n<aside id=\"side\"><div class=\"toggle\">≡</div><div id=\"items\"></div></aside>\n// toggle: side.classList.toggle(\"collapsed\")\n关键参数：\n- theme 主题色 / bg 侧栏底色 / text 文字色 / hover 项悬浮底色 / active 当前项底色 / widthExpand 展开宽（px） / widthCollapse 收起宽（px） / dur 折叠动画时长（秒） / iconSize 图标大小（px） / fontSize 字号（px） / brand 品牌文字 / items 导航项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/侧边栏导航.html 单文件\n2. items csv 换成你的菜单；widthExpand/widthCollapse 控两种宽度\n3. 调「图标大小/折叠动画时长」定节奏",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>侧边栏导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#1f2937; --text:#e5e7eb; --hover:#374151; --active:#2563eb; --we:220px; --wc:64px; --dur:.3s; --ic:20px; --fs:14px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; display:flex; min-height:100vh; background:#f3f4f6; }\n  #side {\n    width:var(--we); background:var(--bg); color:var(--text);\n    display:flex; flex-direction:column; padding:18px 12px; gap:6px;\n    transition:width var(--dur) cubic-bezier(.16,1,.3,1); overflow:hidden; flex:none;\n  }\n  #side.collapsed { width:var(--wc); }\n  .top { display:flex; align-items:center; gap:10px; margin-bottom:14px; }\n  .toggle { cursor:pointer; width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:10px; background:var(--hover); color:#fff; font-size:20px; flex:none; }\n  .brand { font-weight:800; font-size:16px; white-space:nowrap; color:#fff; }\n  #side.collapsed .brand { display:none; }\n  .item { display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:10px; cursor:pointer; font-size:var(--fs); white-space:nowrap; transition:background .15s,color .15s; }\n  .item:hover { background:var(--hover); }\n  .item.active { background:var(--active); color:#fff; }\n  .item svg { width:var(--ic); height:var(--ic); flex:none; }\n  #side.collapsed .label { display:none; }\n  .content { flex:1; padding:40px; }\n  .content h1 { margin-bottom:10px; color:#111827; }\n  .content p { color:#6b7280; line-height:1.9; }\n  .hint { position:fixed; bottom:14px; left:50%; transform:translateX(-50%); font-size:13px; color:#9ca3af; }\n</style>\n</head>\n<body>\n  <aside id=\"side\">\n    <div class=\"top\">\n      <div class=\"toggle\" id=\"toggle\">≡</div>\n      <div class=\"brand\" id=\"brand\">Studio</div>\n    </div>\n    <div id=\"items\"></div>\n  </aside>\n  <main class=\"content\">\n    <h1>侧边栏导航</h1>\n    <p>左侧竖排布局，支持折叠展开：收起后仅显示图标，为后台、编辑器类页面释放内容空间。点左上角「≡」试试折叠。</p>\n  </main>\n  <p class=\"hint\">点左上「≡」折叠 / 展开侧边栏</p>\n<script>\n  const ICON='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v4M12 18v4M2 12h4M18 12h4\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", bg:\"#1f2937\", text:\"#e5e7eb\", hover:\"#374151\", active:\"#2563eb\",\n    widthExpand:220, widthCollapse:64, dur:0.3, iconSize:20, fontSize:14,\n    brand:\"Studio\", items:\"概览,项目,素材,设置\"\n  };\n  const side=document.getElementById(\"side\"), itemsEl=document.getElementById(\"items\"), brandEl=document.getElementById(\"brand\");\n  let activeIdx=0;\n  function render(){\n    itemsEl.innerHTML=\"\";\n    state.items.split(\",\").forEach((t,i)=>{\n      const d=document.createElement(\"div\"); d.className=\"item\"+(i===activeIdx?\" active\":\"\");\n      d.innerHTML=ICON+'<span class=\"label\">'+t+'</span>';\n      d.onclick=()=>{ activeIdx=i; render(); };\n      itemsEl.appendChild(d);\n    });\n  }\n  document.getElementById(\"toggle\").onclick=()=> side.classList.toggle(\"collapsed\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--active\",state.active);\n    R.setProperty(\"--we\",state.widthExpand+\"px\"); R.setProperty(\"--wc\",state.widthCollapse+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--ic\",state.iconSize+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    brandEl.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v144",
    标题: "面包屑导航",
    分类: "组件",
    子类: "导航栏",
    风格: [
      "克制简约",
      "通用"
    ],
    场景: [
      "电商",
      "文档站",
      "深层级网站"
    ],
    元素: [
      "路径",
      "层级"
    ],
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
    效果说明: "以「首页 - 分类 - 子分类」路径展示当前页面层级，让用户随时知道自己在哪、能往哪跳。核心逻辑是匹配电商、文档站等深层级网站的定位需求。",
    用法: "首项是首页（可带图标），末项是当前页（加粗不可点）。调「分隔符」换连接符；改「层级」csv 增减路径深度；关「首页图标」走纯文字。",
    提示词: "帮我做\"面包屑导航\"（纯 HTML/CSS/JS）：\n效果：以「首页 / 分类 / 子分类」路径展示当前层级，首项可带首页图标、末项加粗不可点。适配电商/文档站等深层级网站。\n用法示例：\n<nav id=\"bar\"></nav>\n// 按 items csv 渲染：首项 home 图标，末项 current\n关键参数：\n- theme 当前项/分隔色 / text 文字色 / link 链接色 / hover 悬浮色 / pageBg 条底色 / sep 分隔符 / fontSize 字号（px） / gap 间距（px） / radius 圆角（px） / bold 当前项加粗 / items 层级（逗号分隔） / homeIcon 首页图标\n集成步骤：\n1. 复制 assets/demos/面包屑导航.html 单文件\n2. 改 items csv 增减路径深度；sep 换分隔符\n3. 关 homeIcon/bold 走纯文字版",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>面包屑导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --text:#6b7280; --link:#2563eb; --hover:#1d4ed8; --pageBg:#ffffff; --fs:14px; --gap:8px; --radius:8px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#eef0f3; color:var(--text); }\n  #bar { background:var(--pageBg); padding:16px 26px; border-radius:var(--radius); box-shadow:0 2px 10px rgba(0,0,0,.05); display:flex; align-items:center; gap:var(--gap); font-size:var(--fs); flex-wrap:wrap; }\n  .crumb { display:inline-flex; align-items:center; gap:var(--gap); color:var(--link); cursor:pointer; transition:color .15s; }\n  .crumb:hover { color:var(--hover); }\n  .crumb.home svg { width:15px; height:15px; }\n  .crumb.current { color:var(--text); cursor:default; }\n  .sep { color:#cbd5e1; user-select:none; }\n  .content { padding:40px 26px; max-width:880px; margin:20px auto; background:#fff; border-radius:12px; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <div style=\"padding:20px 26px 0;\"><nav id=\"bar\"></nav></div>\n  <div class=\"content\"><h1>当前页面</h1><p>面包屑以「首页 / 分类 / 子分类」路径展示当前页面层级，让用户随时知道自己在哪、能往哪跳。适配电商、文档站等深层级网站。改「层级」参数可增减路径深度。</p></div>\n<script>\n  const HOME='<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 11l9-8 9 8M5 10v10h14V10\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", text:\"#6b7280\", link:\"#2563eb\", hover:\"#1d4ed8\", pageBg:\"#ffffff\",\n    sep:\" / \", fontSize:14, gap:8, radius:8, bold:true,\n    items:\"首页,课程,前端,下拉组件\", homeIcon:true\n  };\n  const bar=document.getElementById(\"bar\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--text\",state.text); R.setProperty(\"--link\",state.link);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--pageBg\",state.pageBg);\n    R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--gap\",state.gap+\"px\"); R.setProperty(\"--radius\",state.radius+\"px\");\n    const parts=state.items.split(\",\");\n    bar.innerHTML=\"\";\n    parts.forEach((t,i)=>{\n      if(i>0){ const s=document.createElement(\"span\"); s.className=\"sep\"; s.textContent=state.sep; bar.appendChild(s); }\n      const c=document.createElement(\"span\");\n      const isLast=i===parts.length-1;\n      c.className=\"crumb\"+(i===0&&state.homeIcon?\" home\":\"\")+(isLast?\" current\":\"\");\n      if(state.bold && isLast) c.style.fontWeight=\"700\";\n      c.innerHTML=(i===0&&state.homeIcon?HOME:\"\")+(\"<span>\"+t+\"</span>\");\n      bar.appendChild(c);\n    });\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v145",
    标题: "二级下拉导航",
    分类: "组件",
    子类: "导航栏",
    风格: [
      "信息密度",
      "通用"
    ],
    场景: [
      "门户",
      "电商",
      "全站通用"
    ],
    元素: [
      "悬停",
      "子菜单"
    ],
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
    效果说明: "鼠标悬停主导航项即弹出子菜单，适合在主导航下挂大量子分类，兼顾空间利用率与层级收纳。核心逻辑是匹配「主导航项 + 多子分类」的收纳需求。",
    用法: "悬停主导航项展开对应子菜单；无子项的项不弹。调「展开时长/子菜单投影浓度/圆角」定气质；关「箭头开关」走纯文字。",
    提示词: "帮我做\"二级下拉导航\"（纯 HTML/CSS/JS）：\n效果：悬停主导航项弹出对应子菜单，适合主导航下挂大量子分类。\n用法示例：\n<nav><div class=\"top\"><span class=\"label\">产品 ▾</span><div class=\"sub\">…</div></div></nav>\n// CSS :hover 控制 .sub 显隐；子项 = subItems[i]\n关键参数：\n- theme 主题色 / bg 导航底色 / text 文字色 / hover 项悬浮底色 / subBg 子菜单底色 / dur 展开时长（秒） / fontSize 字号（px） / radius 圆角（px） / shadow 子菜单投影浓度 / arrow 箭头开关 / topItems 主导航（逗号分隔） / subItems 子菜单（逗号分隔，对应各项）\n集成步骤：\n1. 复制 assets/demos/二级下拉导航.html 单文件\n2. topItems 主导航、subItems 对应子项（逗号分隔）\n3. 调「展开时长/圆角/投影」定气质",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>二级下拉导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#ffffff; --text:#1f2937; --hover:#eff6ff; --subBg:#ffffff; --dur:.2s; --fs:15px; --radius:10px; --shadow:.14; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f5f6f8; color:var(--text); }\n  #nav { display:flex; align-items:center; gap:4px; padding:14px 26px; background:var(--bg); box-shadow:0 2px 10px rgba(0,0,0,.05); position:relative; z-index:20; }\n  .brand { font-weight:800; color:var(--theme); margin-right:18px; }\n  .top { position:relative; }\n  .top>.label { padding:9px 14px; border-radius:10px; font-size:var(--fs); cursor:pointer; display:inline-flex; align-items:center; gap:6px; transition:background .15s,color .15s; }\n  .top:hover>.label { background:var(--hover); color:var(--theme); }\n  .top .caret { transition:transform var(--dur) ease; }\n  .top:hover .caret { transform:rotate(180deg); }\n  .sub { position:absolute; top:calc(100% + 8px); left:0; min-width:200px; background:var(--subBg); border:1px solid #e5e7eb; border-radius:var(--radius); box-shadow:0 12px 30px rgba(0,0,0,var(--shadow)); padding:6px; opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity var(--dur) ease,transform var(--dur) ease; }\n  .top:hover .sub { opacity:1; transform:translateY(0); pointer-events:auto; }\n  .sub .sitem { padding:9px 12px; border-radius:8px; font-size:var(--fs); cursor:pointer; }\n  .sub .sitem:hover { background:var(--hover); color:var(--theme); }\n  .content { padding:50px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\"><div class=\"brand\">站点</div><div id=\"tops\"></div></nav>\n  <div class=\"content\"><h1>二级下拉导航</h1><p>主导航项悬停弹出子菜单，适合在主导航下挂大量子分类，兼顾空间利用率与层级收纳。把鼠标移到主导航项上看子菜单展开。</p></div>\n<script>\n  const CARET='<svg class=\"caret\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg>';\n  const state = {\n    theme:\"#2563eb\", bg:\"#ffffff\", text:\"#1f2937\", hover:\"#eff6ff\", subBg:\"#ffffff\",\n    dur:0.2, fontSize:15, radius:10, shadow:0.14, arrow:true,\n    topItems:\"产品,解决方案,资源,关于\", subItems:\"设计工具,开发套件,素材市场,模板\"\n  };\n  const topsEl=document.getElementById(\"tops\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--subBg\",state.subBg);\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--shadow\",state.shadow);\n    const tops=state.topItems.split(\",\"), subs=state.subItems.split(\",\");\n    topsEl.innerHTML=\"\";\n    tops.forEach((t,i)=>{\n      const d=document.createElement(\"div\"); d.className=\"top\";\n      const sub=subs[i]||\"\";\n      d.innerHTML='<span class=\"label\">'+t+(state.arrow?' '+CARET:'')+'</span>'+\n        (sub?'<div class=\"sub\">'+sub.split(\",\").map(s=>'<div class=\"sitem\">'+s+'</div>').join('')+'</div>':'');\n      topsEl.appendChild(d);\n    });\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v146",
    标题: "汉堡菜单导航",
    分类: "组件",
    子类: "导航栏",
    风格: [
      "移动端",
      "通用"
    ],
    场景: [
      "移动端",
      "窄屏",
      "全站通用"
    ],
    元素: [
      "汉堡",
      "抽屉"
    ],
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
    效果说明: "移动端经典的三条杠样式，点击后侧边滑出菜单并带遮罩，适配屏幕较窄的移动端场景。核心逻辑是匹配小屏「空间有限、需按需展开」的跳转需求。",
    用法: "点汉堡按钮滑出抽屉、点遮罩关闭。调「滑出方向」换左/右；调「侧栏宽/遮罩浓度/动画时长」定气质；图标色随「汉堡线色」。",
    提示词: "帮我做\"汉堡菜单导航\"（纯 HTML/CSS/JS）：\n效果：移动端三条杠，点击侧边滑出抽屉并带遮罩。适配窄屏。\n用法示例：\n<div class=\"ham\">≡</div><div class=\"overlay\"></div><aside class=\"drawer\">…</aside>\n// ham.click → 抽屉/遮罩加 .open；drawer 用 transform 滑入\n关键参数：\n- theme 主题色 / menuBg 菜单底色 / text 文字色 / hover 项悬浮底色 / barColor 汉堡线色 / overlayOpacity 遮罩浓度 / dur 动画时长（秒） / sideW 侧栏宽（px） / fontSize 字号（px） / from 滑出方向 / brand 品牌文字 / items 菜单项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/汉堡菜单导航.html 单文件\n2. items csv 换菜单；from 切换左/右滑出\n3. 调「侧栏宽/遮罩浓度/动画时长」",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>汉堡菜单导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --menuBg:#111827; --text:#f9fafb; --hover:#374151; --bar:#111827; --ov:.5; --dur:.3s; --sideW:280px; --fs:16px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#f3f4f6; }\n  .bar { height:60px; display:flex; align-items:center; padding:0 20px; }\n  .ham { width:42px; height:42px; display:flex; flex-direction:column; justify-content:center; gap:5px; cursor:pointer; }\n  .ham span { height:3px; background:var(--bar); border-radius:2px; transition:.3s; }\n  .overlay { position:fixed; inset:0; background:rgba(0,0,0,var(--ov)); opacity:0; pointer-events:none; transition:opacity var(--dur) ease; z-index:40; }\n  .overlay.open { opacity:1; pointer-events:auto; }\n  .drawer { position:fixed; top:0; bottom:0; width:var(--sideW); background:var(--menuBg); color:var(--text); padding:80px 24px; z-index:50; transition:transform var(--dur) cubic-bezier(.16,1,.3,1); display:flex; flex-direction:column; gap:6px; }\n  .drawer.right { right:0; transform:translateX(100%); }\n  .drawer.left { left:0; transform:translateX(-100%); }\n  .drawer.open.right, .drawer.open.left { transform:translateX(0); }\n  .ditem { padding:14px 16px; border-radius:12px; font-size:var(--fs); cursor:pointer; transition:background .15s; }\n  .ditem:hover { background:var(--hover); }\n  .brand { position:fixed; top:22px; left:20px; font-weight:800; color:var(--theme); z-index:60; }\n  .content { padding:80px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <div class=\"bar\"><div class=\"ham\" id=\"ham\"><span></span><span></span><span></span></div></div>\n  <div class=\"brand\" id=\"brand\">Menu</div>\n  <div class=\"overlay\" id=\"overlay\"></div>\n  <aside class=\"drawer right\" id=\"drawer\"><div id=\"ditems\"></div></aside>\n  <div class=\"content\"><h1>汉堡菜单导航</h1><p>移动端经典的三条杠样式，点击后侧边滑出菜单，适配屏幕较窄的移动端场景。点左上角汉堡按钮试试。</p></div>\n<script>\n  const state = {\n    theme:\"#2563eb\", menuBg:\"#111827\", text:\"#f9fafb\", hover:\"#374151\", barColor:\"#111827\",\n    overlayOpacity:0.5, dur:0.3, sideW:280, fontSize:16, from:\"右\",\n    brand:\"Menu\", items:\"首页,作品,关于,联系\"\n  };\n  const ham=document.getElementById(\"ham\"), overlay=document.getElementById(\"overlay\"), drawer=document.getElementById(\"drawer\"), ditems=document.getElementById(\"ditems\"), brandEl=document.getElementById(\"brand\");\n  function render(){ ditems.innerHTML=\"\"; state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"ditem\"; d.textContent=t; ditems.appendChild(d); }); }\n  function setOpen(o){ overlay.classList.toggle(\"open\",o); drawer.classList.toggle(\"open\",o); }\n  ham.onclick=()=> setOpen(!drawer.classList.contains(\"open\"));\n  overlay.onclick=()=> setOpen(false);\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--menuBg\",state.menuBg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--bar\",state.barColor);\n    R.setProperty(\"--ov\",state.overlayOpacity); R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--sideW\",state.sideW+\"px\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    drawer.classList.remove(\"left\",\"right\"); drawer.classList.add(state.from===\"左\"?\"left\":\"right\");\n    brandEl.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v147",
    标题: "全屏遮罩导航",
    分类: "组件",
    子类: "导航栏",
    风格: [
      "聚焦",
      "品牌"
    ],
    场景: [
      "作品集",
      "品牌官网",
      "全屏"
    ],
    元素: [
      "全屏",
      "遮罩"
    ],
    搭配: [
      "汉堡菜单导航",
      "悬浮吸顶导航"
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
    效果说明: "点开后全屏覆盖、菜单居中大字排列，把全部注意力收拢到导航本身。核心逻辑是匹配作品集、品牌官网等需要强调「我现在在哪、能去哪」的聚焦需求。",
    用法: "点「菜单」全屏展开、点 × 关闭。调「字号/项间距」定视觉重量；调「背景模糊」做毛玻璃；「排列」切居中/分散。",
    提示词: "帮我做\"全屏遮罩导航\"（纯 HTML/CSS/JS）：\n效果：点开全屏覆盖、菜单居中大字排列，聚焦导航。适配作品集/品牌官网。\n用法示例：\n<button class=\"open-btn\">菜单</button><div class=\"full\">…大字菜单…</div>\n// open.click → full.classList.add(\"open\")；close 移除\n关键参数：\n- theme 主题色 / bg 背景色 / text 文字色 / hover 项悬浮色 / closeColor 关闭按钮色 / dur 动画时长（秒） / fontSize 字号（px） / gap 项间距（px） / blur 背景模糊（px） / itemAlign 排列 / brand 品牌文字 / items 菜单项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/全屏遮罩导航.html 单文件\n2. items csv 换菜单；blur 做毛玻璃\n3. 调「字号/项间距/排列」定视觉重量",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>全屏遮罩导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#0f172a; --text:#f8fafc; --hover:#38bdf8; --close:#f8fafc; --dur:.4s; --fs:28px; --gap:22px; --blur:0px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; background:#eef2f7; }\n  .open-btn { position:fixed; top:20px; right:24px; z-index:30; background:var(--theme); color:#fff; border:none; padding:12px 22px; border-radius:30px; font-size:15px; cursor:pointer; }\n  .full { position:fixed; inset:0; background:var(--bg); color:var(--text); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--gap); z-index:50; opacity:0; pointer-events:none; transition:opacity var(--dur) ease; backdrop-filter:blur(var(--blur)); }\n  .full.open { opacity:1; pointer-events:auto; }\n  .ftitle { font-size:14px; letter-spacing:3px; text-transform:uppercase; opacity:.6; margin-bottom:6px; }\n  .fitems { display:flex; flex-direction:column; align-items:center; gap:var(--gap); }\n  .fitem { font-size:var(--fs); font-weight:700; cursor:pointer; transition:color .2s; letter-spacing:1px; }\n  .fitem:hover { color:var(--hover); }\n  .close { position:fixed; top:22px; right:26px; z-index:60; background:none; border:none; color:var(--close); font-size:34px; cursor:pointer; line-height:1; }\n  .content { padding:80px 26px; max-width:880px; margin:0 auto; }\n  .content h1 { color:#111827; margin-bottom:10px; }\n  .content p { color:#6b7280; line-height:1.9; }\n</style>\n</head>\n<body>\n  <button class=\"open-btn\" id=\"open\">菜单</button>\n  <div class=\"full\" id=\"full\"><button class=\"close\" id=\"close\">×</button><div class=\"ftitle\" id=\"ftitle\"></div><div class=\"fitems\" id=\"fitems\"></div></div>\n  <div class=\"content\"><h1>全屏遮罩导航</h1><p>点开全屏覆盖、菜单居中大字排列，聚焦导航本身。适配作品集、品牌官网等需要强调导航的场景。点右上「菜单」试试。</p></div>\n<script>\n  const state = {\n    theme:\"#2563eb\", bg:\"#0f172a\", text:\"#f8fafc\", hover:\"#38bdf8\", closeColor:\"#f8fafc\",\n    dur:0.4, fontSize:28, gap:22, blur:0, itemAlign:\"居中\",\n    brand:\"Portfolio\", items:\"Work,About,Services,Contact\"\n  };\n  const openBtn=document.getElementById(\"open\"), full=document.getElementById(\"full\"), closeBtn=document.getElementById(\"close\"), fitems=document.getElementById(\"fitems\"), ftitle=document.getElementById(\"ftitle\");\n  function render(){\n    fitems.innerHTML=\"\";\n    fitems.style.justifyContent = state.itemAlign===\"分散\"?\"space-between\":\"center\";\n    state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"fitem\"; d.textContent=t; fitems.appendChild(d); });\n  }\n  openBtn.onclick=()=> full.classList.add(\"open\");\n  closeBtn.onclick=()=> full.classList.remove(\"open\");\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--hover\",state.hover); R.setProperty(\"--close\",state.closeColor);\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--gap\",state.gap+\"px\"); R.setProperty(\"--blur\",state.blur+\"px\");\n    ftitle.textContent=state.brand; render();\n  }\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v148",
    标题: "锚点导航",
    分类: "组件",
    子类: "导航栏",
    风格: [
      "克制简约",
      "阅读"
    ],
    场景: [
      "单页长文",
      "文档",
      "落地页"
    ],
    元素: [
      "锚点",
      "高亮"
    ],
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
    效果说明: "页面滚动时对应导航项自动高亮（配底部指示条），让用户明确当前阅读位置。核心逻辑是匹配单页长文、文档、落地页等需要清晰阅读锚点的需求。与 soa07 粘性章节导航互补：一个用顶部导航条、一个用侧边圆点。",
    用法: "滚动自动高亮当前章；点导航项平滑滚动到对应区块。调「指示条色/指示条高/动画」定动效；「位置」切顶/底固定。",
    提示词: "帮我做\"锚点导航\"（纯 HTML/CSS/JS）：\n效果：滚动时对应导航项自动高亮（配底部指示条），点项平滑滚动到区块。适配单页长文/文档/落地页。\n用法示例：\n<nav id=\"nav\"><div class=\"aitem\">首页</div>…</nav>\n// onscroll: 按 offsetTop 判定当前章 → 高亮；aitem.click → scrollIntoView\n关键参数：\n- theme 主题色 / bg 导航底色 / text 文字色 / active 当前项色 / barColor 指示条色 / threshold 滚动阈值（px） / dur 指示条动画（秒） / fontSize 字号（px） / radius 圆角（px） / barH 指示条高（px） / pos 位置 / items 导航项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/锚点导航.html 单文件\n2. items csv 即章节名，build() 同时生成导航与对应区块\n3. 调「指示条色/高/动画」「位置」顶/底",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>锚点导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#2563eb; --bg:#ffffff; --text:#6b7280; --active:#111827; --bar:#2563eb; --dur:.3s; --fs:15px; --radius:10px; --barH:3px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; color:var(--text); }\n  #nav { position:sticky; top:0; z-index:40; display:flex; gap:4px; padding:14px 26px; background:var(--bg); box-shadow:0 2px 10px rgba(0,0,0,.05); }\n  .aitem { position:relative; padding:10px 16px; border-radius:var(--radius); font-size:var(--fs); cursor:pointer; color:var(--text); transition:color .2s; }\n  .aitem.active { color:var(--active); font-weight:700; }\n  .aitem::after { content:\"\"; position:absolute; left:16px; right:16px; bottom:-14px; height:var(--barH); background:var(--bar); border-radius:2px; transform:scaleX(0); transform-origin:left; transition:transform var(--dur) ease; }\n  .aitem.active::after { transform:scaleX(1); }\n  .sec { height:90vh; display:flex; align-items:center; padding:0 26px; max-width:880px; margin:0 auto; }\n  .sec h2 { color:#111827; font-size:30px; }\n  .sec p { color:#6b7280; margin-top:10px; line-height:1.9; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\"><div id=\"aitems\"></div></nav>\n  <div id=\"sections\"></div>\n<script>\n  const state = {\n    theme:\"#2563eb\", bg:\"#ffffff\", text:\"#6b7280\", active:\"#111827\", barColor:\"#2563eb\",\n    threshold:0, dur:0.3, fontSize:15, radius:10, barH:3, pos:\"顶\",\n    items:\"首页,特性,价格,联系\"\n  };\n  const nav=document.getElementById(\"nav\"), aitems=document.getElementById(\"aitems\"), sectionsEl=document.getElementById(\"sections\");\n  let secs=[];\n  function build(){\n    const parts=state.items.split(\",\");\n    aitems.innerHTML=\"\"; sectionsEl.innerHTML=\"\"; secs=[];\n    parts.forEach((t,i)=>{\n      const a=document.createElement(\"div\"); a.className=\"aitem\"; a.textContent=t; a.dataset.i=i;\n      a.onclick=()=> secs[i].scrollIntoView({behavior:\"smooth\"});\n      aitems.appendChild(a);\n      const s=document.createElement(\"div\"); s.className=\"sec\"; s.innerHTML='<div><h2>'+t+'</h2><p>这是「'+t+'」区块。滚动页面，对应导航项会自动高亮，让你随时知道自己读到哪。</p></div>';\n      sectionsEl.appendChild(s); secs.push(s);\n    });\n  }\n  function spy(){\n    let idx=0;\n    secs.forEach((s,i)=>{ if(s.offsetTop-120 <= window.scrollY) idx=i; });\n    [...aitems.children].forEach((c,i)=> c.classList.toggle(\"active\", i===idx));\n  }\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--bg\",state.bg); R.setProperty(\"--text\",state.text);\n    R.setProperty(\"--active\",state.active); R.setProperty(\"--bar\",state.barColor);\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\"); R.setProperty(\"--radius\",state.radius+\"px\"); R.setProperty(\"--barH\",state.barH+\"px\");\n    nav.style.top = state.pos===\"底\" ? \"auto\" : \"0\";\n    nav.style.bottom = state.pos===\"底\" ? \"0\" : \"auto\";\n    build(); spy();\n  }\n  window.addEventListener(\"scroll\", spy);\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  },
  {
    id: "v149",
    标题: "滚动收缩导航",
    分类: "组件",
    子类: "导航栏",
    风格: [
      "沉浸",
      "品牌"
    ],
    场景: [
      "官网首页",
      "hero 大图",
      "品牌站"
    ],
    元素: [
      "滚动",
      "收缩"
    ],
    搭配: [
      "悬浮吸顶导航",
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
    效果说明: "初始透明贴合大图营造沉浸感，下滑后自动变矮并切换实色背景、加投影。核心逻辑是匹配带 hero 大图的官网首页：首屏要沉浸、下滑要清晰可用。",
    用法: "滚动越过 40px 即收缩为实色矮条。调「初始不透明度」控首屏通透感；「初始高度/收缩后高度」控伸缩幅度；「滚动后底色」切沉浸→实色。",
    提示词: "帮我做\"滚动收缩导航\"（纯 HTML/CSS/JS）：\n效果：初始透明贴合 hero 大图；下滑后变矮并切实色背景加投影。适配带大图的官网首页。\n用法示例：\n<nav id=\"nav\">…</nav>\n// onscroll: scrolled = scrollY>40; nav.classList.toggle(\"shrunk\",scrolled); 背景按状态切 rgba\n关键参数：\n- theme 主题色 / initBg 初始底色 / scrollBg 滚动后底色 / text 文字色 / shadowColor 阴影色 / initOpacity 初始不透明度 / shrinkH 收缩后高度（px） / initH 初始高度（px） / dur 动画时长（秒） / fontSize 字号（px） / brand 品牌文字 / items 导航项（逗号分隔）\n集成步骤：\n1. 复制 assets/demos/滚动收缩导航.html 单文件\n2. initOpacity 控首屏通透感；initH/shrinkH 控伸缩\n3. 调「滚动后底色」切沉浸→实色",
    代码: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>滚动收缩导航演示</title>\n<style>\n  * { margin:0; padding:0; box-sizing:border-box; }\n  :root { --theme:#e8702a; --initBg:#111827; --scrollBg:#111827; --text:#ffffff; --shadowC:#000000; --sh:56px; --ih:80px; --dur:.3s; --fs:16px; }\n  body { font-family:system-ui,\"Microsoft YaHei\",sans-serif; }\n  #nav { position:fixed; top:0; left:0; right:0; z-index:50; height:var(--ih); display:flex; align-items:center; gap:22px; padding:0 30px; color:var(--text); transition:height var(--dur) ease, background var(--dur) ease, box-shadow var(--dur) ease; }\n  #nav.shrunk { height:var(--sh); }\n  .brand { font-weight:800; font-size:calc(var(--fs)+3px); color:var(--theme); }\n  .items { display:flex; gap:6px; flex:1; }\n  .item { padding:8px 14px; border-radius:10px; font-size:var(--fs); cursor:pointer; transition:background .15s; }\n  .item:hover { background:rgba(255,255,255,.12); }\n  .cta { background:var(--theme); color:#fff; padding:9px 18px; border-radius:10px; font-size:var(--fs); cursor:pointer; }\n  .hero { height:100vh; background:linear-gradient(135deg,#1f2937,#111827); display:flex; align-items:center; justify-content:center; color:#fff; font-size:30px; font-weight:800; text-align:center; padding:0 20px; }\n  .sec { height:90vh; padding:0 30px; max-width:880px; margin:0 auto; display:flex; align-items:center; }\n  .sec h2 { color:#111827; }\n  .sec p { color:#6b7280; margin-top:10px; line-height:1.9; }\n</style>\n</head>\n<body>\n  <nav id=\"nav\"><div class=\"brand\" id=\"brand\">Lithos</div><div class=\"items\" id=\"items\"></div><div class=\"cta\">开始</div></nav>\n  <div class=\"hero\">向下滚动，看导航从透明大图收缩为实色矮条</div>\n  <div class=\"sec\"><div><h2>关于我们</h2><p>初始透明贴合大图营造沉浸感，下滑后自动变矮并切换实色背景，适配带 hero 大图的官网首页。</p></div></div>\n  <div class=\"sec\" style=\"height:90vh;\"></div>\n<script>\n  const state = {\n    theme:\"#e8702a\", initBg:\"#111827\", scrollBg:\"#111827\", text:\"#ffffff\", shadowColor:\"#000000\",\n    initOpacity:0, shrinkH:56, initH:80, dur:0.3, fontSize:16,\n    brand:\"Lithos\", items:\"首页,课程,作品,关于\"\n  };\n  const nav=document.getElementById(\"nav\"), itemsEl=document.getElementById(\"items\"), brandEl=document.getElementById(\"brand\");\n  function render(){ itemsEl.innerHTML=\"\"; state.items.split(\",\").forEach(t=>{ const d=document.createElement(\"div\"); d.className=\"item\"; d.textContent=t; itemsEl.appendChild(d); }); }\n  function hexA(hex,a){ const h=hex.replace('#',''); const r=parseInt(h.substr(0,2),16),g=parseInt(h.substr(2,2),16),b=parseInt(h.substr(4,2),16); return `rgba(${r},${g},${b},${a})`; }\n  function onScroll(){\n    const scrolled = window.scrollY > 40;\n    nav.classList.toggle(\"shrunk\", scrolled);\n    nav.style.background = scrolled ? hexA(state.scrollBg, 1) : hexA(state.initBg, state.initOpacity);\n    nav.style.boxShadow = '0 6px 20px ' + hexA(state.shadowColor, scrolled?0.18:0);\n  }\n  function apply(){\n    const R=document.documentElement.style;\n    R.setProperty(\"--theme\",state.theme); R.setProperty(\"--initBg\",state.initBg); R.setProperty(\"--scrollBg\",state.scrollBg);\n    R.setProperty(\"--text\",state.text); R.setProperty(\"--shadowC\",state.shadowColor);\n    R.setProperty(\"--sh\",state.shrinkH+\"px\"); R.setProperty(\"--ih\",state.initH+\"px\");\n    R.setProperty(\"--dur\",state.dur+\"s\"); R.setProperty(\"--fs\",state.fontSize+\"px\");\n    brandEl.textContent=state.brand; render(); onScroll();\n  }\n  window.addEventListener(\"scroll\", onScroll);\n  window.addEventListener(\"message\", e=>{ const d=e.data; if(!d||d.type!==\"param\")return; state[d.key]=d.value; apply(); });\n  apply();\n<\\/script>\n</body>\n</html>\n",
    复用记录: ""
  }
];
