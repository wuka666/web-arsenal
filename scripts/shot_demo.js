// headless 截图工具：验证 demo 能正常渲染（非空白）
// 用法（项目根目录）：node scripts/shot_demo.js "assets/demos/xxx.html" [...]
// 无头 Chrome 启动 / profile 清理统一走 lib/chrome（2026-10-31）
const fs = require("fs"), path = require("path"), os = require("os");
const { runHeadless, toFileUrl } = require("./lib/chrome");
const root = process.cwd();
const files = process.argv.slice(2);
if (!files.length) { console.error("用法：node scripts/shot_demo.js <demo相对路径...>"); process.exit(1); }
const outDir = path.join(os.tmpdir(), "wa-shots-" + Date.now());
fs.mkdirSync(outDir, { recursive: true });
files.forEach(f => {
  const abs = path.join(root, f);
  if (!fs.existsSync(abs)) { console.log("✗ 不存在 " + f); return; }
  const png = path.join(outDir, path.basename(f, ".html").replace(/[^\w\u4e00-\u9fa5-]/g, "_") + ".png");
  try {
    runHeadless({
      url: toFileUrl(abs),
      screenshot: png,
      profilePrefix: "wa-prof",
      timeoutMs: 90000, // 截图比 dump-dom 慢，给足时间
      extraArgs: ["--window-size=1000,625", "--virtual-time-budget=8000"],
    });
    const sz = fs.existsSync(png) ? fs.statSync(png).size : 0;
    console.log((sz > 3000 ? "✓" : "✗ 疑似空白") + "  " + String(sz).padStart(7) + "B  " + png);
  } catch (e) { console.log("✗ 失败 " + f + " :: " + String(e.message).slice(0, 90)); }
});
// 截图产物要留（outDir），但 profile 只是 Chrome 的临时目录，lib/chrome 已在 finally 里删掉
console.log("输出目录：" + outDir);
