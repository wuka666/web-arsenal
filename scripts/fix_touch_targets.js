// 触控合规批量修复器：读 check_touch_targets.js 产出的清单（%TEMP%/wa_touch_targets.json），
// 给「命中区不达标」的可交互元素补 min-width/min-height。
//   达标线（附录B B1）：统一撑到 44px —— 既满足移动端 ≥44，也满足 PC 端 ≥24（44>24）。
// 幂等：以「合规补齐」标记块为准，选择器已出现在该块内则跳过（重复跑不会叠加）。
// 用法（项目根目录）：
//   node scripts/fix_touch_targets.js --dry   ← 只出报告，不改文件
//   node scripts/fix_touch_targets.js         ← 实跑（改前把每个 demo 备份到 %TEMP%/demos_bak_touch/）
const fs = require('fs'), path = require('path'), os = require('os');
const root = process.cwd();
const DRY = process.argv.includes('--dry');
const JSONP = path.join(os.tmpdir(), 'wa_touch_targets.json');
const BAK = path.join(os.tmpdir(), 'demos_bak_touch');
const MARK = '/* 合规补齐：宪法附录B B1';
const SIZE = 44;
const TAG_SEL = /^(a|button|input|select|textarea|label|summary)$/i;

if (!fs.existsSync(JSONP)) {
  console.error('✗ 缺清单：先跑 node scripts/check_touch_targets.js --materials（或 --schemes / 全量）');
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(JSONP, 'utf8'));

// 选择器生成：类名优先 → ARIA 角色 → 语义标签；都拿不到则交人工（避免用 div/span 泛选择器误伤）
// 注意：SVG 元素的 className 是 SVGAnimatedString 对象，探针里 String() 得到 "[object SVGAnimatedString]"，
// split(' ')[0] = "[object" —— 必须剔除，否则写出 ".[object{...}" 这种无效选择器直接坏掉整段 CSS。
function makeSel(t) {
  if (t.cls && !/^\[object/.test(t.cls)) return '.' + t.cls;
  if (t.role) return '[role="' + t.role + '"]';
  if (TAG_SEL.test(t.tag)) return t.tag;
  return null;
}

// 已登记豁免 / 无法安全自动修、需人工处理的条目
//   M319 字母索引条：已用 data-touch-exempt 登记 WCAG essential 例外（见 demo 注释），不撑尺寸
const SKIP = new Set(['M319']);
if (!DRY && !fs.existsSync(BAK)) fs.mkdirSync(BAK, { recursive: true });
const done = [], skipped = [], manual = [];
for (const v of data.viol) {
  if (SKIP.has(v.id)) { skipped.push({ id: v.id, why: '已登记豁免/人工' }); continue; }
  const abs = path.join(root, v.src);
  if (!fs.existsSync(abs)) { skipped.push({ id: v.id, why: '缺文件 ' + v.src }); continue; }
  const sels = new Set();
  for (const t of v.bad) {
    const s = makeSel(t);
    if (!s) { manual.push({ id: v.id, el: `${t.tag}${t.cls ? '.' + t.cls : ''} ${t.w}x${t.h}` }); continue; }
    sels.add(s);
  }
  if (!sels.size) continue;
  let html = fs.readFileSync(abs, 'utf8');
  const mi = html.indexOf(MARK);
  const blockText = mi >= 0 ? html.slice(mi) : '';
  const toAdd = [...sels].filter(s => !blockText.includes(s + '{'));
  if (!toAdd.length) { skipped.push({ id: v.id, why: '已合规（幂等跳过）' }); continue; }

  const lines = toAdd.map(s => `${s}{min-width:${SIZE}px;min-height:${SIZE}px}`);
  let out;
  if (mi >= 0) {
    // 已有标记块：在该块的收尾 </style> 前追加选择器行
    const closeRel = html.indexOf('</style>', mi);
    if (closeRel < 0) { skipped.push({ id: v.id, why: '标记块无 </style>' }); continue; }
    out = html.slice(0, closeRel) + lines.join('\n') + '\n' + html.slice(closeRel);
  } else {
    const head = html.indexOf('</head>');
    if (head < 0) { skipped.push({ id: v.id, why: '无 </head>' }); continue; }
    const block = '<style>\n' + MARK +
      ' —— 移动端可点元素命中区须 ≥44（WCAG 判命中区不判视觉尺寸，故用 min 尺寸撑开，视觉不变） */\n' +
      lines.join('\n') + '\n</style>\n';
    out = html.slice(0, head) + block + html.slice(head);
  }
  if (!DRY) {
    try { fs.writeFileSync(path.join(BAK, path.basename(abs)), html, 'utf8'); } catch (e) { }
    fs.writeFileSync(abs, out, 'utf8');
  }
  done.push({ id: v.id, lib: v.lib, added: toAdd });
}

console.log((DRY ? '[DRY] ' : '') + '修复 demo = ' + done.length + ' / 清单 ' + data.viol.length +
  '  跳过 = ' + skipped.length + '  需人工 = ' + manual.length);
done.forEach(d => console.log('  ✓ ' + d.id + ' [' + d.lib + ']  + ' + d.added.join(', ')));
skipped.forEach(s => console.log('  · ' + s.id + '  ' + s.why));
manual.forEach(m => console.log('  ⚠️ 需人工 ' + m.id + '  ' + m.el));
if (!DRY) console.log('\n备份目录：' + BAK);
const mIds = done.filter(d => /^M/.test(d.id)).map(d => d.id);
const sIds = done.filter(d => !/^M/.test(d.id)).map(d => d.id);
if (mIds.length) console.log('\n素材同步：node scripts/sync_code.js ' + mIds.join(' '));
if (sIds.length) console.log('方案同步：node scripts/sync_scheme_code.js ' + sIds.join(' '));
