// 代码↔demo 同步器：对 scripts/new_entries.js 声明的每条 id，重算「代码」字段并写回 data/素材.js
// 用法（必须在项目根目录运行）：node scripts/sync_code.js            ← 按 new_entries.js 清单
//                               node scripts/sync_code.js M011 M012 … ← 按命令行 id
// 存储格式 = JSON.stringify(JSON.stringify(html).replace(/<\/script>/g,'<\\/script>'))（双层序列化，parse 一次得字面量、再 eval 得 html）
// 用扫描器定位收尾引号，不做裸 indexOf 划区间
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const args = process.argv.slice(2);
let meta;
if (args.length) {
  const w = {};
  new Function('window', fs.readFileSync(path.join(ROOT, 'data/素材.js'), 'utf8'))(w);
  meta = w.WEB_ARSENAL.filter(e => args.includes(e.id)).map(e => ({ id: e.id, 效果演示: e.效果演示 }));
  const found = new Set(meta.map(m => m.id));
  args.filter(a => !found.has(a)).forEach(a => console.log('WARN 素材库无此 id:', a));
} else {
  meta = require('./new_entries.js');
}
const DATA = path.join(ROOT, 'data/素材.js');
let text = fs.readFileSync(DATA, 'utf8');
let updated = 0;
for (const m of meta) {
  const demoHtml = fs.readFileSync(path.join(ROOT, m.效果演示), 'utf8');
  const codeString = JSON.stringify(demoHtml).replace(/<\/script>/g, '<\\/script>');
  const fileLit = JSON.stringify(codeString);
  // ⚠️ id 有四种写法，必须全认，否则会静默漏同步整条（2026-09-28 修）：
  //    id: "M001" / id:"M001" / "id":"M271" / "id": "M271"
  const idM = new RegExp('(?:"id"|id)\\s*:\\s*"' + m.id + '"').exec(text);
  const idAt = idM ? idM.index : -1;
  if (idAt < 0) { console.log('MISS id', m.id); continue; }
  // ⚠️ 代码 字段同样两种写法：代码: "  与  "代码": "（各 182 / 125 条）
  const keyM = /(?:"代码"|代码)\s*:\s*"/.exec(text.slice(idAt));
  const keyAt = keyM ? idAt + keyM.index : -1;
  // 锚点不许滑到下一条：代码必须落在本条目区间内。
  // ⚠️ 不能用 '\n  {\n' 找下一条——参数数组里的对象同缩进，会落在自己条目内而误判越界（2026-09-28 修）。
  //    正解：找「下一个 id 字段」作为本条目终点。
  const nextIdRe = /\n\s*(?:"id"|id)\s*:\s*"/g;
  nextIdRe.lastIndex = idAt + 10;
  const nextIdM = nextIdRe.exec(text);
  const nextId = nextIdM ? nextIdM.index : -1;
  if (keyAt < 0 || (nextId > 0 && keyAt > nextId)) { console.log('MISS/越界 代码字段', m.id); continue; }
  const keyText = keyM[0];            // 含「值的起始引号」，如  代码: "  或  "代码": "
  const keyPrefix = keyText.slice(0, -1); // ⚠️ 写入时必须去掉这个引号：fileLit 自带首尾引号，
                                          //    否则会写出 ""\" 双引号而破坏语法（2026-09-28 踩坑）
  const valStart = keyAt + keyText.length;
  let i = valStart;
  while (i < text.length) {
    if (text[i] === '\\') { i += 2; continue; } // 跳过转义对
    if (text[i] === '"') break;                 // 未转义引号 = 收尾
    i++;
  }
  if (i >= text.length) { console.log('MISS 收尾引号', m.id); continue; }
  text = text.slice(0, keyAt) + keyPrefix + fileLit + text.slice(i + 1);
  updated++;
  console.log('SYNC', m.id);
}
fs.writeFileSync(DATA, text, 'utf8');
console.log('已同步', updated, '条');
