/* repo.js — 数据层（S2）
 *
 * 这个文件只有一个职责：**告诉界面「数据从哪来」「怎么筛」**。
 * 界面（index.html）从此不许再直接读 window.WEB_ARSENAL / window.WEB_SCHEMES，
 * 也不许自己写筛选规则，一律调这里。
 *
 * 为什么值得多这一层：
 *   S3 数据搬到 MySQL 之后，只改这个文件（把 return 改成 fetch），
 *   index.html 三千行一个字都不用动。
 *
 * 当前实现叫 JsFileRepo：数据还是原来那两个 data/*.js，一行没搬。
 */

(function () {
  "use strict";

  // ===== 一、取数：数据在哪儿，只有这个文件知道 =====

  function listMaterials() {
    // 数据真实来源仍是 data/素材.js 挂上去的全局变量
    return (window.WEB_ARSENAL || []).slice();
  }

  function listSchemes() {
    return (window.WEB_SCHEMES || []).slice();
  }

  function getMaterial(id) {
    return (window.WEB_ARSENAL || []).find(function (it) { return it.id === id; }) || null;
  }

  function getScheme(id) {
    return (window.WEB_SCHEMES || []).find(function (s) { return s.id === id; }) || null;
  }

  // ===== 二、筛选语义：规则只认参数，不认界面的全局变量 =====

  // 四个维度同级、互为交集，维度内单选
  var FILTER_DIMS = ["适配端", "元素", "风格", "场景"];
  var ALL = "全部";

  // 标签字段统一按数组读：现为单值字符串，兼容将来改回多值
  function asArr(v) {
    return Array.isArray(v) ? v : (v ? [v] : []);
  }

  // 判断一条记录是否命中筛选条件
  // cond 形如 { 适配端:"PC 端", 元素:"全部", 风格:"全部", 场景:"全部" }
  // ignore 传某一维名字时，假装这一维没选（给分面计数用）
  function matchItem(it, cond, ignore) {
    for (var i = 0; i < FILTER_DIMS.length; i++) {
      var dim = FILTER_DIMS[i];
      if (ignore === dim) continue;
      var want = cond[dim];
      // 用户没限制这一维 → 这条维度直接放过（短路，后面不执行）
      if (want !== ALL && asArr(it[dim]).indexOf(want) === -1) return false;
    }
    return true;
  }

  // 分面计数：算某一维每个选项下有几条记录
  // 关键在「统计这一维时先把这一维排除」——否则选中的那个值之外全变 0，用户没法切换
  function countByDim(list, cond, dim) {
    var map = {};
    list.forEach(function (it) {
      if (!matchItem(it, cond, dim)) return;
      asArr(it[dim]).forEach(function (v) {
        if (!v) return;
        map[v] = (map[v] || 0) + 1;
      });
    });
    return map;
  }

  // 该维度下出现过的所有取值（不受当前筛选影响，保证选项不会消失）
  function uniqDimVals(list, dim) {
    var seen = {};
    var out = [];
    list.forEach(function (it) {
      asArr(it[dim]).forEach(function (v) {
        if (v && !seen[v]) { seen[v] = 1; out.push(v); }
      });
    });
    return out;
  }

  // ===== 三、关键词搜索：字段拼成一个 haystack 再找子串 =====

  function searchMaterial(it, q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return true;
    var hay = [
      it.标题, it.效果说明, it.用法, it.来源, it.提示词, it.元素, it.适配端,
      (it.标签 || []).join(" "), asArr(it.风格).join(" "), asArr(it.场景).join(" ")
    ].filter(Boolean).join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function searchScheme(s, q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return true;
    var hay = [
      s.风格名, s.骨架, s.重色落点, s.布局骨架, s.第一屏内容, s.删减元素, s.适用, s.禁忌, s.我的说明, s.Agent提示词,
      (s.参考站 || []).join(" "), (s.配色 ? Object.keys(s.配色).join(" ") : "")
    ].filter(Boolean).join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  // ===== 四、对外接口：界面只认这几个函数 =====

  window.Repo = {
    // 取数
    listMaterials: listMaterials,
    listSchemes: listSchemes,
    getMaterial: getMaterial,
    getScheme: getScheme,

    // 筛选规则（参数进、布尔出，纯函数）
    matchItem: matchItem,
    countByDim: countByDim,
    uniqDimVals: uniqDimVals,
    searchMaterial: searchMaterial,
    searchScheme: searchScheme,

    // 组合查询：条件 + 关键词 → 结果数组
    // 将来 S3 分页，只需再给它加 page / size 两个参数
    queryMaterials: function (cond, q) {
      return listMaterials().filter(function (it) {
        return matchItem(it, cond) && searchMaterial(it, q);
      });
    },
    querySchemes: function (cond, q) {
      return listSchemes().filter(function (s) {
        return matchItem(s, cond) && searchScheme(s, q);
      });
    },

    // 常量也暴露出去，避免界面再抄一份
    FILTER_DIMS: FILTER_DIMS,
    ALL: ALL
  };
})();
