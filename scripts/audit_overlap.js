#!/usr/bin/env node
/**
 * audit_overlap.js —— 全库效果重合度审计（只读复算，不改任何文件）
 *
 * 背景：2026-10-12 的重合度大检查用的是一批放在 %TEMP% 的一次性脚本
 * （arsenal_mech2.js / arsenal_low*.js），会话结束后随临时目录清理而消失，
 * 导致报告里的过程统计（341 候选对 / 172 对 / 21 / 23 / 128）在仓库内无法复算。
 * 本脚本把「同元素 + 同触发 + 机制签名 Jaccard≥阈值」的初筛固化成可重复运行的长期工具。
 *
 * 机制签名（不是纯 CSS 属性）—— 因为大量 canvas demo 根本没有 transition/keyframes：
 *   - 载体：canvas / svg / dom
 *   - Canvas 绘图原语：arc / lineTo / fillRect / createLinearGradient / getImageData /
 *     shadowBlur / globalCompositeOperation / drawImage / fillText …
 *   - 事件：mousemove / pointerdown / touchmove / scroll / wheel / click …（不含 message/resize）
 *   - JS API：requestAnimationFrame / setInterval / IntersectionObserver / getBoundingClientRect …
 *   - CSS 动画属性：transition 值、@keyframes 内属性、JS style 赋值、setProperty 的 --var
 * 两条 demo 签名越接近，越可能同一套机制；差异项（仅 A / 仅 B）直接打印出来供取证。
 *
 * ⚠️ 口径说明：这是**独立重实现**，不是 10-12 那批脚本的原样拷贝。分类细节不同，候选对数量
 *    必然与历史数字有出入——它的价值是「现在能随时复算」，不是「证明当时那个数」。
 *    结论层看的是：高分对是否落在已知清单（12 条标注 / 12 条白名单 / 低族）内。
 *
 * 用法：
 *   node scripts/audit_overlap.js                 # 默认阈值 0.50，打印摘要 + Top 15
 *   node scripts/audit_overlap.js --min 0.8       # 只看高相似对
 *   node scripts/audit_overlap.js --all           # 打印全部候选对
 *   node scripts/audit_overlap.js --json          # 机器可读
 *
 * 只读：不写 data/*.js，不写 demo，不删任何东西。
 */

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { loadLib } = require('./lib/data');

const root = process.cwd();
const argv = process.argv.slice(2);
const argMin = (() => { const i = argv.indexOf('--min'); const v = i >= 0 ? parseFloat(argv[i + 1]) : NaN; return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.5; })();
const showAll = argv.includes('--all');
const asJson = argv.includes('--json');

// 数据加载统一走 lib/data（2026-10-31）；exitCode:2 复刻原行为（文件缺失/未挂载 → exit 2）
function loadData(file, globalName) {
  return loadLib(file, globalName, { root, exitCode: 2 });
}

/** 同族白名单：直接读 check_skeleton.js 的 KNOWN_FAMILIES，保持单一事实来源 */
function loadFamilies() {
  try {
    const src = fs.readFileSync(path.join(root, 'scripts', 'check_skeleton.js'), 'utf8');
    const m = src.match(/const KNOWN_FAMILIES\s*=\s*(\[[\s\S]*?\n\];)/);
    if (!m) return [];
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext('KNOWN_FAMILIES = ' + m[1].replace(/;\s*$/, ''), sandbox);
    return Array.isArray(sandbox.KNOWN_FAMILIES) ? sandbox.KNOWN_FAMILIES : [];
  } catch (_) { return []; }
}
const families = loadFamilies();

const CSS_IGNORE = new Set(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'infinite', 'both', 'forwards', 'backwards', 'normal', 'alternate', 'reverse', 'running', 'paused', 'none', 'all', 'inherit', 'initial', 'unset', 'important']);

/** @keyframes 块内的属性名 */
function keyframeProps(css) {
  const out = new Set();
  const re = /@keyframes\s+[\w-]+\s*\{/g;
  let m;
  while ((m = re.exec(css))) {
    let depth = 1, i = re.lastIndex;
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') depth--;
      i++;
    }
    const body = css.slice(re.lastIndex, i);
    const pr = /([-a-zA-Z]+)\s*:/g;
    let q;
    while ((q = pr.exec(body))) out.add('css:' + q[1].toLowerCase());
  }
  return out;
}

const CTX_OPS = ['arc', 'arcTo', 'lineTo', 'moveTo', 'fillRect', 'strokeRect', 'clearRect', 'beginPath', 'closePath', 'fill', 'stroke', 'save', 'restore', 'translate', 'rotate', 'scale', 'bezierCurveTo', 'quadraticCurveTo', 'ellipse', 'fillText', 'strokeText', 'measureText', 'drawImage', 'getImageData', 'putImageData', 'createLinearGradient', 'createRadialGradient', 'createPattern', 'filter', 'shadowBlur', 'globalCompositeOperation', 'globalAlpha', 'lineDash', 'Path2D'];
const EVENTS = ['mousemove', 'pointermove', 'pointerdown', 'mousedown', 'touchmove', 'touchstart', 'click', 'mouseenter', 'mouseleave', 'wheel', 'scroll', 'keydown'];
const APIS = ['requestAnimationFrame', 'setInterval', 'setTimeout', 'IntersectionObserver', 'ResizeObserver', 'MutationObserver', 'getBoundingClientRect', 'matchMedia', 'localStorage', 'performance.now', 'CSS.registerProperty', 'AudioContext'];

/** 机制签名 */
function extractFeatures(demo) {
  const f = new Set();
  const css = (demo.match(/<style[^>]*>([\s\S]*?)<\/style>/i) || [, ''])[1];

  if (/<canvas/i.test(demo)) f.add('载体:canvas');
  else if (/<svg/i.test(demo)) f.add('载体:svg');
  else f.add('载体:dom');

  for (const op of CTX_OPS) {
    const re = new RegExp('\\.' + op.replace(/\./g, '\\.') + '\\s*\\(');
    if (re.test(demo)) f.add('ctx:' + op);
  }
  const ev = demo.match(/addEventListener\(\s*['"]([\w-]+)['"]/g) || [];
  ev.forEach(s => {
    const name = s.replace(/.*['"]/, '').replace(/['"]$/, '');
    if (EVENTS.includes(name)) f.add('ev:' + name);
  });
  for (const api of APIS) if (demo.includes(api)) f.add('api:' + api);

  let m;
  const reT = /transition(?:-property)?\s*:\s*([^;}]+)/gi;
  while ((m = reT.exec(css))) {
    m[1].split(',').forEach(part => {
      const name = part.trim().split(/\s+/)[0];
      if (name && /^[-a-zA-Z]+$/.test(name) && !CSS_IGNORE.has(name.toLowerCase())) f.add('css:' + name.toLowerCase());
    });
  }
  for (const p of keyframeProps(css)) f.add(p);
  const reK = /@keyframes\s+([\w-]+)/g;
  while ((m = reK.exec(css))) f.add('kf:' + m[1]);
  const reS = /style\.([A-Za-z]+)\s*=/g;
  while ((m = reS.exec(demo))) f.add('js:' + m[1].toLowerCase());
  const reV = /setProperty\(\s*['"](--[\w-]+)['"]/g;
  while ((m = reV.exec(demo))) f.add('var:' + m[1].toLowerCase());
  return f;
}

/** 触发类别：scroll > click > cursor > hover > auto */
function extractTrigger(demo) {
  if (/\bscroll\b|IntersectionObserver/.test(demo)) return 'scroll';
  if (/addEventListener\(\s*['"]click|onclick/i.test(demo)) return 'click';
  if (/mousemove|pointermove|mouseenter|mouseover/i.test(demo)) return 'cursor';
  if (/:hover/.test(demo)) return 'hover';
  return 'auto';
}

// Jaccard 统一走 lib/sim（2026-10-31）：与 check_skeleton 内联的那份在全库 83,293 对上
// 逐对实测数值 0 处不同，确认是同一算法，故合并为一个实现。
const { jaccard } = require('./lib/sim');

function familyOf(a, b) {
  const f = families.find(g => g.members.includes(a) && g.members.includes(b));
  return f ? f.why : null;
}

const materials = loadData('data/素材.js', 'WEB_ARSENAL');

/** 已知重合对：从 `效果说明` 里的 `↳ … M### …` 标注反解出来（单一事实来源，不硬编码） */
const knownPairMap = new Map();
for (const e of materials) {
  const m = String(e.效果说明 || '').match(/↳[^\n]*?(M\d{3})/);
  if (m) knownPairMap.set([e.id, m[1]].sort().join('|'), { a: e.id, b: m[1] });
}
const knownPairs = [...knownPairMap.values()];

const items = [];
let missingDemo = 0;
for (const e of materials) {
  const p = e.效果演示;
  if (!p || !fs.existsSync(path.join(root, p))) { missingDemo++; continue; }
  const demo = fs.readFileSync(path.join(root, p), 'utf8');
  items.push({
    id: e.id, title: e.标题, element: String(e.元素 || '').trim(),
    demoName: path.basename(p, '.html'),
    features: extractFeatures(demo), trigger: extractTrigger(demo),
    codeLen: demo.length,
  });
}

const byElement = new Map();
for (const it of items) {
  if (!byElement.has(it.element)) byElement.set(it.element, []);
  byElement.get(it.element).push(it);
}

const MIN_SIGNAL = 6;             // 签名过小的对不参与比较（jac 无意义）
const weak = [];
const pairs = [];
for (const [, list] of byElement) {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const A = list[i], B = list[j];
      if (A.trigger !== B.trigger) continue;
      const jac = jaccard(A.features, B.features);
      if (jac < argMin) continue;
      const minSize = Math.min(A.features.size, B.features.size);
      if (minSize < MIN_SIGNAL) { weak.push({ a: A.id, b: B.id, jac: +jac.toFixed(3), sizes: [A.features.size, B.features.size] }); continue; }
      const fpSame = jac === 1 && A.codeLen === B.codeLen;
      pairs.push({
        a: A.id, b: B.id, aTitle: A.title, bTitle: B.title,
        element: A.element, trigger: A.trigger, jac: +jac.toFixed(3),
        band: fpSame ? '签名全同+等长' : (jac >= 0.8 ? 'jac≥0.80' : 'jac 0.50–0.79'),
        whitelisted: !!familyOf(A.demoName, B.demoName),
        onlyA: [...A.features].filter(x => !B.features.has(x)).slice(0, 8),
        onlyB: [...B.features].filter(x => !A.features.has(x)).slice(0, 8),
      });
    }
  }
}
pairs.sort((x, y) => y.jac - x.jac || (x.a < y.a ? -1 : 1));

// 跨库引用扫描：方案页不得嵌入素材 demo（规矩 11 零外链 / 跨库）
const demoDir = path.join(root, 'assets', 'demos');
const schemeDemos = fs.existsSync(demoDir) ? fs.readdirSync(demoDir).filter(f => f.startsWith('方案-') && f.endsWith('.html')) : [];
const embedded = schemeDemos.filter(f => /<iframe|assets\/demos\//i.test(fs.readFileSync(path.join(demoDir, f), 'utf8')));

const byElementCount = {};
pairs.forEach(p => { byElementCount[p.element] = (byElementCount[p.element] || 0) + 1; });
const bands = { '签名全同+等长': 0, 'jac≥0.80': 0, 'jac 0.50–0.79': 0 };
pairs.forEach(p => { bands[p.band]++; });
const exempt = pairs.filter(p => p.whitelisted);
const pairKey = new Set(pairs.map(p => [p.a, p.b].sort().join('|')));
const byId = new Map(items.map(it => [it.id, it]));
const knownReport = knownPairs.map(k => {
  const A = byId.get(k.a), B = byId.get(k.b);
  if (!A || !B) return { ...k, jac: null, sameElement: false, sameTrigger: false, inCandidates: false };
  return {
    a: k.a, b: k.b,
    titleA: A.title, titleB: B.title,
    jac: +jaccard(A.features, B.features).toFixed(3),
    sameElement: A.element === B.element, sameTrigger: A.trigger === B.trigger,
    inCandidates: pairKey.has([k.a, k.b].sort().join('|')),
  };
});
const knownHit = knownReport.filter(k => k.inCandidates);

const payload = {
  threshold: argMin, minSignal: MIN_SIGNAL,
  materials: materials.length, parsed: items.length, missingDemo,
  candidatePairs: pairs.length, weakSignalPairs: weak.length,
  byElement: byElementCount, bands,
  whitelistedPairs: exempt.length,
  knownAnnotated: { total: knownPairs.length, hit: knownHit.length, pairs: knownReport },
  crossLibrary: { schemeDemos: schemeDemos.length, embeddedMaterialDemos: embedded.length },
  top: pairs.slice(0, 60).map(p => ({ a: p.a, b: p.b, jac: p.jac, band: p.band, element: p.element, whitelisted: p.whitelisted })),
};

if (asJson) { console.log(JSON.stringify(payload, null, 2)); process.exit(0); }

console.log('\n🔍 全库重合度审计复算（只读 · 自实现口径 v1）');
console.log(`   素材 ${materials.length} 条，可解析 demo ${items.length} 条；阈值 Jaccard ≥ ${argMin}，最小签名 ${MIN_SIGNAL} 项`);
console.log(`   候选对（同元素 + 同触发 + 机制签名重合）：${pairs.length} 对；签名过小未比：${weak.length} 对`);
const elLine = Object.keys(byElementCount).sort((a, b) => byElementCount[b] - byElementCount[a]).map(k => `${k} ${byElementCount[k]}`).join(' / ');
if (elLine) console.log(`   按元素：${elLine}`);
console.log(`   分档：签名全同+等长 ${bands['签名全同+等长']} / jac≥0.80 ${bands['jac≥0.80']} / jac 0.50–0.79 ${bands['jac 0.50–0.79']}`);
console.log(`   同族白名单命中：${exempt.length} 对（弹层族 8 / 下拉族 6，读 check_skeleton.js:38-41）`);
console.log(`   已知重合对（从 ${payload.knownAnnotated.total} 组 ↳ 标注反解）：` +
  knownReport.map(k => `${k.a}↔${k.b} jac=${k.jac === null ? '缺文件' : k.jac.toFixed(3)}${k.inCandidates ? ' ✓候选' : (k.sameElement && k.sameTrigger ? ' 未达阈值' : ' 元素/触发不同')}`).join('；'));
console.log(`   跨库：方案 demo ${payload.crossLibrary.schemeDemos} 个，嵌入素材 demo 的 ${payload.crossLibrary.embeddedMaterialDemos} 个`);

const show = showAll ? pairs : pairs.slice(0, 15);
if (show.length) {
  console.log(`\n   相似度最高${showAll ? '全部' : ' 15'} 对（差异项就是判定依据，别只看 jac）：`);
  show.forEach(p => {
    const tag = p.whitelisted ? '〔白名单〕' : '';
    console.log(`   jac=${p.jac.toFixed(3).padEnd(5)} ${p.element}/${p.trigger}  ${p.a} ${p.aTitle} ‖ ${p.b} ${p.bTitle} ${tag}`);
    console.log(`        仅 A：${p.onlyA.join(',') || '—'} ｜ 仅 B：${p.onlyB.join(',') || '—'}`);
  });
}
if (pairs.length > show.length) console.log(`\n   …… 其余 ${pairs.length - show.length} 对用 --all 查看`);
console.log('\n   提示：这是复算，不是判决。高分对回 demo 源码取证，判法见 Agent宪法 规矩 31④（改骨架 ＞ 合并 ＞ 删除）。\n');
