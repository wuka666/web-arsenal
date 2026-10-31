#!/usr/bin/env node
/**
 * check_sync.js —— 代码 ↔ demo 逐字节同步复查（规矩 10：素材库 `代码` 必须等于 demo 文件内容）
 *
 * 为什么需要它：`check_all.js` 管的是字段与统计口径，`sync_code.js` 负责“写”，
 * 但没有一个“只读复查”的脚本能证明 348 条素材 + 70 条方案的 `代码` 与磁盘 demo 完全一致。
 * 历史漂移（2026-10-12 修过 19 条）就是这么漏掉的。
 *
 * 覆盖范围：
 *   - 素材库：`效果演示`（348 条）+ `ThreeJS演示`（M066 另有一个 demo）
 *   - 方案库：`演示页`（70 条）
 *
 * 历史包袱（重要）：288 条素材的 `代码` 字段当初是“双重 JSON 转义”存的
 *   （值本身以 `"` 开头、内部是 `\"` 与 `\n`），语义与 demo 一致但字面不等。
 *   本脚本自动识别并反转义后再逐字节比对；`--strict-encoding` 可把双重转义本身记为失败。
 *   反转义后 2026-10-31 实测 348/348 逐字节相等。
 *
 * 用法：
 *   node scripts/check_sync.js            # 只读复查，全部一致 exit 0
 *   node scripts/check_sync.js --strict-encoding   # 双重转义也当失败
 *   node scripts/check_sync.js --json     # 机器可读
 */

const fs = require('fs');
const path = require('path');
const { loadLib } = require('./lib/data');
const { normalize, firstDiff } = require('./lib/code-sync');

const root = process.cwd();
const strictEncoding = process.argv.includes('--strict-encoding');
const asJson = process.argv.includes('--json');

// 数据加载统一走 lib/data（2026-10-31）。
// ⚠️ 本脚本原先是「vm 沙箱」那一份实现，lib/data 直接沿用它的口径（vm.createContext），
//    所以这里的输出与退出码必须与改前逐字一致——改动只是把实现搬进 lib。
//    exitCode:2 复刻原行为：文件缺失 / 未挂载 → console.error + exit 2。
function load(file, globalName) {
  return loadLib(file, globalName, { root, exitCode: 2 });
}

/**
 * 双重 JSON 转义的值 → 原文；返回 { value, doubleEncoded }
 * ⚠️ 2026-10-31：实现已搬到 scripts/lib/code-sync.js（「代码 = demo」的唯一实现），
 *    本脚本是它的**原始出处**，行为一字未改；另两处 eval 版已改为调用同一个模块。
 *    这里保留同名薄封装，是为了让下面的比对逻辑与 { value, doubleEncoded } 的调用形态不变。
 */
function unescapeMaybe(raw) {
  return normalize(raw);
}

const rows = [];
const doubleEncodedIds = new Set();

function checkEntry(kind, id, demoField, demoPath, code, compare) {
  if (!demoPath) { rows.push({ kind, id, demo: '(字段缺失)', ok: false, why: 'demo 字段为空' }); return; }
  const abs = path.join(root, demoPath);
  if (!fs.existsSync(abs)) { rows.push({ kind, id, demo: demoPath, ok: false, why: 'demo 文件不存在' }); return; }
  const disk = fs.readFileSync(abs, 'utf8');
  const { value, doubleEncoded: isDbl } = unescapeMaybe(code);
  if (isDbl) doubleEncodedIds.add(id);
  // 独立演示（M066 的 ThreeJS 版）：`代码` 字段指的是主演示，不存在第二个代码字段，只校验文件存在
  if (!compare) {
    rows.push({ kind, id, demo: demoPath, ok: true, why: '', note: '独立演示（仅校验存在，不与 代码 比对）', diffAt: -1, codeLen: value.length, diskLen: disk.length });
    return;
  }
  const ok = strictEncoding ? (isDbl ? false : value === disk) : value === disk;
  rows.push({
    kind, id, demo: demoPath, ok,
    why: ok ? '' : (isDbl && !strictEncoding ? '内容不一致' : (isDbl ? '双重转义存储' : '内容不一致')),
    diffAt: ok ? -1 : firstDiff(value, disk),
    codeLen: value.length, diskLen: disk.length,
  });
}

const materials = load('data/素材.js', 'WEB_ARSENAL');
const schemes = load('data/方案.js', 'WEB_SCHEMES');

for (const e of materials) {
  checkEntry('素材', e.id, '效果演示', e.效果演示, e.代码, true);
  if (e.ThreeJS演示) checkEntry('素材·ThreeJS', e.id, 'ThreeJS演示', e.ThreeJS演示, e.代码, false);
}
for (const e of schemes) checkEntry('方案', e.id, '演示页', e.演示页, e.代码, true);

const bad = rows.filter(r => !r.ok);
const summary = {
  materials: materials.length,
  schemes: schemes.length,
  checked: rows.length,
  doubleEncoded: doubleEncodedIds.size,
  ok: rows.length - bad.length,
  failed: bad.length,
};

if (asJson) {
  console.log(JSON.stringify({ summary, failures: bad }, null, 2));
} else {
  console.log('\n📐 代码 ↔ demo 逐字节同步复查（规矩 10）');
  console.log(`   素材 ${summary.materials} 条 + 方案 ${summary.schemes} 条 → 实检 ${summary.checked} 个 demo`);
  console.log(`   双重转义存储：${summary.doubleEncoded} 条（已自动反转义后比对）`);
  if (!bad.length) {
    console.log(`\n✅ ${summary.ok}/${summary.checked} 全部逐字节一致${strictEncoding ? '' : ''}，无漂移`);
  } else {
    console.log(`\n❌ ${bad.length} 条不一致：`);
    for (const r of bad) {
      console.log(`   ${r.id}  ${r.kind}  ${r.demo}`);
      console.log(`      原因：${r.why}` + (r.diffAt >= 0 ? `｜首个差异在第 ${r.diffAt} 字节（代码 ${r.codeLen} B / demo ${r.diskLen} B）` : ''));
    }
    console.log('\n   修复：node scripts/sync_code.js <素材id...> 或 node scripts/sync_scheme_code.js <方案id...>');
  }
}

process.exit(bad.length ? 1 : 0);
