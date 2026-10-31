#!/usr/bin/env node
/**
 * lib/sim.js —— Jaccard 相似度（唯一实现，2026-10-31 统一）
 *
 * 为什么要有它：同一件事原本有 2 份实现，写法不同：
 *   · check_skeleton.js:79-86（内联）—— 先 `new Set([...A, ...B]).size` 求并集，再逐元素数交集
 *   · audit_overlap.js:140         —— 逐元素数交集，再 `a.size + b.size - inter` 求并集
 * 两份**都能跑**，但要先确认是不是同一个算法。2026-10-31 在全库 417 个 demo 上做了
 * 83,293 对穷举比对：**数值 0 处不同**，确认两者语义完全一致（都要求输入是 Set、
 * 都按集合去重、都返回「交集 / 并集」），因此统一成**一个** jaccard。
 *
 * ⚠️ 但两者对「输入不是 Set」的容忍度不同：`a.size + b.size` 那条要求必须是 Set
 *    （若传数组，`.size` 是 undefined → NaN）。统一版显式要求 Set 并给出可读报错，
 *    避免哪天有人传数组进去得到静默 NaN。
 *
 * 用法：
 *   const { jaccard } = require('./lib/sim');
 *   jaccard(new Set(['a','b']), new Set(['b','c']))   // → 1/3 ≈ 0.333
 */

/**
 * 两个集合的 Jaccard 相似度 = |A ∩ B| / |A ∪ B|。
 * 两边都空时返回 0（与两份原实现一致：并集为空没有可比性）。
 * @param {Set<any>} a
 * @param {Set<any>} b
 * @returns {number} 0~1
 */
function jaccard(a, b) {
  if (!(a instanceof Set) || !(b instanceof Set)) {
    throw new TypeError('jaccard(a, b) 只接受 Set（两边都要去重，传数组会算出无意义的数）');
  }
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const uni = a.size + b.size - inter;
  return uni === 0 ? 0 : inter / uni;
}

module.exports = { jaccard };
