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
  const idAt = text.indexOf('id: "' + m.id + '"');
  if (idAt < 0) { console.log('MISS id', m.id); continue; }
  const keyAt = text.indexOf('代码: "', idAt);
  // 锚点不许滑到下一条：代码必须落在本条目区间内
  const nextId = text.indexOf('\n  {\n', idAt + 10);
  if (keyAt < 0 || (nextId > 0 && keyAt > nextId)) { console.log('MISS/越界 代码字段', m.id); continue; }
  const valStart = keyAt + '代码: "'.length;
  let i = valStart;
  while (i < text.length) {
    if (text[i] === '\\') { i += 2; continue; } // 跳过转义对
    if (text[i] === '"') break;                 // 未转义引号 = 收尾
    i++;
  }
  if (i >= text.length) { console.log('MISS 收尾引号', m.id); continue; }
  text = text.slice(0, keyAt) + '代码: ' + fileLit + text.slice(i + 1);
  updated++;
  console.log('SYNC', m.id);
}
fs.writeFileSync(DATA, text, 'utf8');
console.log('已同步', updated, '条');
