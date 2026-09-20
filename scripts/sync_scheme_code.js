// 方案侧 代码↔demo 同步器（方案库是单层 parse：代码字段的值直接就是 demo HTML，不要再 eval）
// 存储形态：反引号模板字符串，内含原始换行 → 写回必须转义 \ ` ${
// 用法（项目根目录）：node scripts/sync_scheme_code.js [id1 id2 ...]   不传 id = 全量
const fs = require("fs"), path = require("path");
const root = process.cwd();
const DATA = path.join(root, "data/方案.js");
let text = fs.readFileSync(DATA, "utf8");

// 先摸清现有条目 id 与演示页，避免依赖外部清单
const w = {};
new Function("window", text)(w);
const S = w.WEB_SCHEMES;

const args = process.argv.slice(2);
const targets = args.length ? S.filter(s => args.includes(s.id)) : S.filter(s => s.演示页 && fs.existsSync(path.join(root, s.演示页)));

function escapeTpl(raw) {
  // 顺序不能反：先转义反斜杠，最后补 </script> 的斜杠转义。
  // 保留 `<\/script>` 是本项目约定（素材.js 同样如此）——防止这些字符串哪天被内联进
  // HTML 的 <script> 里时提前闭合标签；在外部 .js 里它与 `</script>` 求值等价。
  return raw
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${")
    .replace(/<\/script>/g, "<\\/script>");
}

let updated = 0, skipped = [];
targets.forEach(s => {
  const demoRel = s.演示页;
  const html = fs.readFileSync(path.join(root, demoRel), "utf8");
  const idAt = text.indexOf('id: "' + s.id + '"');
  if (idAt < 0) { skipped.push(s.id + " 找不到 id 锚点"); return; }
  const codeAt = text.indexOf("代码:", idAt);
  if (codeAt < 0) { skipped.push(s.id + " 无代码字段"); return; }
  // 锚点不许滑到下一条：代码必须落在本条目区间内
  const nextId = text.indexOf("\n  {\n", idAt + 10);
  if (nextId > 0 && codeAt > nextId) { skipped.push(s.id + " 代码锚点越界到下一条，拒绝写入"); return; }
  const valStart = text.indexOf("`", codeAt);
  if (valStart < 0) { skipped.push(s.id + " 代码不是反引号形态"); return; }
  let i = valStart + 1;
  while (i < text.length) {
    if (text[i] === "\\") { i += 2; continue; }
    if (text[i] === "`") break;
    i++;
  }
  if (i >= text.length) { skipped.push(s.id + " 找不到收尾反引号"); return; }
  const oldLit = text.slice(codeAt, i + 1);
  // 先比语义：模板字符串求值后若已等于 demo，就一个字节都不动。
  // 原因：现有 36 条里 `<\/script>` 转义写法与 `</script>` 原始写法混用（6 : 29），
  // 二者求值等价，用单一规则强行重写会制造无意义的大片 diff。
  let oldVal = null;
  try { oldVal = new Function("return " + oldLit.slice("代码:".length).trim())(); } catch (e) { }
  if (oldVal === html) return;
  // 确有漂移时，沿用该条目原本的转义风格
  const keepEsc = /<\\\/script>/.test(oldLit);
  let body = html.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  body = keepEsc ? body.replace(/<\/script>/g, "<\\/script>") : body.replace(/<\\\/script>/g, "</script>");
  const newLit = "代码: `" + body + "`";
  text = text.slice(0, codeAt) + newLit + text.slice(i + 1);
  updated++;
  console.log("SYNC", s.id);
});
fs.writeFileSync(DATA, text, "utf8");
console.log("已同步 " + updated + " 条" + (skipped.length ? "；跳过 " + skipped.length : ""));
skipped.forEach(x => console.log("  - " + x));
