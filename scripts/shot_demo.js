// headless 截图工具：验证 demo 能正常渲染（非空白）
// 用法（项目根目录）：node scripts/shot_demo.js "assets/demos/xxx.html" [...]
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path"), os = require("os");
const root = process.cwd();
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const files = process.argv.slice(2);
if (!files.length) { console.error("用法：node scripts/shot_demo.js <demo相对路径...>"); process.exit(1); }
const outDir = path.join(os.tmpdir(), "wa-shots-" + Date.now());
fs.mkdirSync(outDir, { recursive: true });
const prof = path.join(os.tmpdir(), "wa-prof-" + Date.now());
files.forEach(f => {
  const abs = path.join(root, f);
  if (!fs.existsSync(abs)) { console.log("✗ 不存在 " + f); return; }
  const url = "file:///" + abs.split(path.sep).join("/");
  const png = path.join(outDir, path.basename(f, ".html").replace(/[^\w\u4e00-\u9fa5-]/g, "_") + ".png");
  try {
    execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
      "--allow-file-access-from-files", "--disable-background-networking", "--disable-component-update", "--no-first-run",
      "--window-size=1000,625", "--virtual-time-budget=8000", "--user-data-dir=" + prof, "--screenshot=" + png, url],
      { stdio: "pipe" });
    const sz = fs.existsSync(png) ? fs.statSync(png).size : 0;
    console.log((sz > 3000 ? "✓" : "✗ 疑似空白") + "  " + String(sz).padStart(7) + "B  " + png);
  } catch (e) { console.log("✗ 失败 " + f + " :: " + String(e.message).slice(0, 90)); }
});
console.log("输出目录：" + outDir);
