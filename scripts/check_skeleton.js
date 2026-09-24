#!/usr/bin/env node
/**
 * check_skeleton.js — 方案库跨条目「骨架指纹」比对（Agent宪法 规矩 21 第 4 项）
 *
 * 为什么要单独一个脚本：
 *   check_all.js / verify_entry.js 只查「单条自身是否合规」（参数、闭集、代码=demo…），
 *   查不出「两条方案的骨架一模一样」。2026-09-21 的 S36/S37 事故就是从这层盲区漏过去的
 *   —— 两条 demo 逐行同构、Jaccard = 1.000，两份校验器却全绿。
 *
 * 指纹算法：取 body 内 `<tag.class>` 序列（去 script/style/注释、去文本、class 排序），
 *   转成 3-gram 集合，两两算 Jaccard 相似度。
 *
 * 用法：
 *   node scripts/check_skeleton.js                # 扫方案库（默认，规矩 21 的口径）
 *   node scripts/check_skeleton.js --threshold .4 # 自定义报警阈值（默认 0.5）
 *   node scripts/check_skeleton.js --materials    # 扫素材库（阈值建议放宽，见下）
 *   node scripts/check_skeleton.js --all          # 两库一起
 *
 * 退出码：0 = 无报警；1 = 有 ≥ 阈值 的条目对（可挂 CI）。
 * ⚠️ 素材库是「单效果片段」，同类效果（5 种文字动效）骨架本就该像，
 *    默认阈值下会大量误报 —— 只在排查具体嫌疑时用 --materials 并放宽阈值。
 */
const fs = require('fs'), path = require('path');

const argv = process.argv.slice(2);
const argOf = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const threshold = parseFloat(argOf('--threshold', '0.5'));
const wantMaterials = argv.includes('--materials') || argv.includes('--all');
const wantSchemes = argv.includes('--all') || !argv.includes('--materials');

const dir = path.join(process.cwd(), 'assets', 'demos');
if (!fs.existsSync(dir)) { console.error('找不到 assets/demos —— 请在项目根目录运行'); process.exit(2); }

const all = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const files = all.filter(f => wantSchemes && f.startsWith('方案-')
                            || wantMaterials && !f.startsWith('方案-'));
if (!files.length) { console.error('没有匹配的 demo 文件'); process.exit(2); }

/** 提取 body 内 tag.class 的 3-gram 集合 */
function fingerprint(html) {
  const s = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                .replace(/<style[\s\S]*?<\/style>/gi, '')
                .replace(/<!--[\s\S]*?-->/g, '');
  const body = (s.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [null, s])[1];
  const toks = [];
  const re = /<([a-zA-Z][\w-]*)((?:\s+[^>]*?)?)\/?>/g;
  let m;
  while ((m = re.exec(body))) {
    const tag = m[1].toLowerCase();
    // 纯装饰/无结构意义的标签剔除，避免噪声
    if (tag === 'br' || tag === 'path' || tag === 'svg' || tag === 'use' || tag === 'defs') continue;
    const cls = (m[2].match(/class\s*=\s*"([^"]*)"/) || [, ''])[1]
      .trim().split(/\s+/).filter(Boolean).sort().join('.');
    toks.push(cls ? tag + '.' + cls : tag);
  }
  const grams = new Set();
  for (let i = 0; i + 2 < toks.length; i++) grams.add(toks.slice(i, i + 3).join('>'));
  return { grams, tokens: toks.length };
}

const fps = files.map(f => ({ f, ...fingerprint(fs.readFileSync(path.join(dir, f), 'utf8')) }));

const hits = [];
for (let i = 0; i < fps.length; i++) for (let j = i + 1; j < fps.length; j++) {
  const A = fps[i], B = fps[j], uni = new Set([...A.grams, ...B.grams]).size;
  if (!uni) continue;
  let inter = 0; for (const g of A.grams) if (B.grams.has(g)) inter++;
  const jac = inter / uni;
  const contain = inter / Math.min(A.grams.size, B.grams.size); // 包含度：短骨架被整段复用
  if (jac >= threshold || contain >= 0.9) hits.push({ a: A.f, b: B.f, jac, contain });
}
hits.sort((x, y) => y.jac - x.jac);

console.log(`骨架指纹比对：${files.length} 个 demo，阈值 jac ≥ ${threshold}（或包含度 ≥ 0.9）`);
if (!hits.length) {
  console.log('✅ 无雷同条目对——各成一体');
  process.exit(0);
}
console.log(`\n❌ 发现 ${hits.length} 对疑似雷同（规矩 21 第 4 项：与库内任一方案雷同即不合格）：`);
for (const h of hits) {
  console.log(`   jac=${h.jac.toFixed(3)}  包含度=${h.contain.toFixed(3)}`);
  console.log(`     ${h.a}`);
  console.log(`     ${h.b}`);
}
console.log('\n处置：回规矩 20 深化「换题重推」（换主题必做 + 换版式/主形态/色值/字体），别只改文案。');
process.exit(1);
