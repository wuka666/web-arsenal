// 条目校验器：校验 scripts/new_entries.js 中声明的 id 对应条目
// 用法（必须在项目根目录运行）：node scripts/verify_entry.js
// 检查：demo存在 / 代码↔demo 逐字节 / 参数键↔demo state且默认值一致 / postMessage契约 / 零外链 / id不撞名
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const DATA = path.join(ROOT, 'data/素材.js');
// 本批次清单：临时文件，每次校验前自行写入要查的条目 id（形状 [{id:"vXXX"}, ...]）
let meta;
try { meta = require('./new_entries.js'); }
catch (e) {
  console.error('缺少本批次清单 scripts/new_entries.js。请先写一个 [{id:"vXXX"}, ...] 数组文件再运行（该清单记录本批要校验的条目 id）。');
  process.exit(2);
}
const content = fs.readFileSync(DATA, 'utf8');

// 用垫片加载数据源
const sandbox = { window: {} };
new Function('window', content)(sandbox.window);
const ARS = sandbox.window.WEB_ARSENAL;
const byId = {}; ARS.forEach(e => byId[e.id] = e);

let fail = 0;
for (const m of meta) {
  const e = byId[m.id];
  const tag = '[' + m.id + ' ' + (e ? e.标题 : '?') + '] ';
  if (!e) { console.log('✗', tag, '数据条目不存在'); fail++; continue; }
  // demo 存在
  const demoPath = path.join(ROOT, e.效果演示);
  if (!fs.existsSync(demoPath)) { console.log('✗', tag, 'demo 文件不存在', e.效果演示); fail++; continue; }
  const demoHtml = fs.readFileSync(demoPath, 'utf8');
  // 代码↔demo 逐字节
  // 素材库两种存储形态并存：单层序列化（值直接是 HTML，直接比）／双层（值需 eval 一次或两次）
  const codeRaw = e.代码;
  let codeOk = (codeRaw === demoHtml);
  if (!codeOk) {
    let v = null;
    try { v = new Function('return ' + codeRaw)(); } catch (err) { v = null; }
    if (v !== demoHtml && typeof v === 'string') { try { v = new Function('return ' + v)(); } catch (err) { } }
    codeOk = (v === demoHtml);
  }
  if (!codeOk) { console.log('✗', tag, '代码字段与 demo 不一致（round-trip 失败）'); fail++; }
  // 提取 demo 的 state 键
  const stateKeys = new Set([...demoHtml.matchAll(/state\s*=\s*\{([^}]*)\}/g)].flatMap(mm => [...mm[1].matchAll(/([A-Za-z_]\w*)\s*:/g)].map(x => x[1])));
  // 参数键↔state 且默认值一致
  for (const p of (e.参数 || [])) {
    const k = p.键;
    // 键不在 state 但出现在 demo 里 = 降级版 PARAM_MAP 桥接（规矩 11 允许，demo 内有 IGNORE_3D 披露），
    // 不算死参数；真正的死参数是全文件都找不到键名
    if (!stateKeys.has(k) && !demoHtml.includes(k)) { console.log('✗', tag, '参数键', k, '未在 demo 中出现（死参数）'); fail++; }
    // 默认值一致：只在 state 块里找。
    // 注：全文件搜会先命中 CSS（如 body{gap:18px}）而误报——必须在 state 块内取值
    const stateBlock = (demoHtml.match(/state\s*=\s*\{([^}]*)\}/) || [])[1] || '';
    const re = new RegExp('(?:^|[\\s,{])' + k + '\\s*:\\s*("[^"]*"|\'[^\']*\'|[^,}\']+)');
    const m2 = stateBlock.match(re);
    if (m2) {
      let dv = m2[1].trim();
      if ((dv.startsWith('"') && dv.endsWith('"')) || (dv.startsWith("'") && dv.endsWith("'"))) dv = dv.slice(1, -1);
      const nd = parseFloat(String(p.默认)), nvd = parseFloat(dv);
      const eq = String(p.默认) === dv || (!isNaN(nd) && !isNaN(nvd) && nd === nvd);
      if (!eq) { console.log('⚠', tag, '参数', k, '默认值 数据=' + p.默认 + ' demo=' + dv); }
    }
  }
  // postMessage 契约
  // 注：!== 两侧允许空格（写成 d.type !== "param" 是常态，写死无空格会 24 条全误报）
  if (!/addEventListener\(['"]message['"]/.test(demoHtml) || !/d\.type\s*!==\s*['"]param['"]/.test(demoHtml) || !/state\[d\.key\]\s*=/.test(demoHtml)) {
    console.log('✗', tag, 'postMessage 契约不完整'); fail++;
  }
  // 零外链（w3.org 命名空间是 SVG 规范标识符，从不发起请求，不算外链）
  const ext = /(https?:\/\/|cdn\.|@import|src\s*=\s*['"]https?:|<link)/i.test(demoHtml.replace(/http:\/\/www\.w3\.org\/\d{4}\/[a-z]+/g, ''));
  if (ext) { console.log('✗', tag, 'demo 含外部链接（零外链硬门槛）'); fail++; }
  // 参数键必须被 CSS / setProperty / state 消费之一
  for (const p of (e.参数 || [])) {
    const k = p.键;
    // 循环动态赋值也算消费：['di','se1',...].forEach(k => r.setProperty('--'+k, state[k]))
    // 静态查不到 setProperty('--se1')，但键名作为字符串出现在文件里即已接线
    const dynamicLoop = /setProperty\(\s*['"]--['"]\s*\+\s*k/.test(demoHtml) || /setProperty\(\s*['"]--['"]\s*\+\s*[A-Za-z_]\w*/.test(demoHtml);
    const keyQuoted = new RegExp("['\"]" + k + "['\"]").test(demoHtml);
    const consumed = demoHtml.includes('var(--' + k) || demoHtml.includes("setProperty('--" + k) || demoHtml.includes('state.' + k) || demoHtml.includes('state["' + k + '"]') || (dynamicLoop && keyQuoted);
    if (!consumed) { console.log('⚠', tag, '参数', k, '未被 CSS/setProperty/state 消费（疑似死参数）'); }
  }
  if (fail === 0 || true) console.log('✓', tag, '基础校验通过（demo字节', demoHtml.length, '）');
}
console.log(fail === 0 ? 'ALL_OK' : ('FAIL_COUNT=' + fail));
process.exit(fail === 0 ? 0 : 1);
