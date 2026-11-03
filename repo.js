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

  // 按「效果演示」路径反查素材。画布迁移旧数据时要用：老画布只存了 demo 路径，没存素材 id。
  //
  // 为什么放进数据层、而不是让 canvas.js 自己写 listMaterials().find(...)：
  //   ① S3 换成 MySQL 之后，这条就是一句 SELECT ... WHERE demo = ?；
  //      若在界面里写 find，就等于「先把整张表拉到浏览器再自己扫」——数据层白建了。
  //   ② 路径归一化（去掉开头的 assets/）只该有一份实现，散在界面里迟早两处不一致。
  //   ③ 这个查询在 canvas.js 里已经出现两次（migrate 补 eid、allToCart 反查 id），
  //      将来只会更多，属于「数据从哪来」的职责，不是「界面怎么画」的职责。
  function findMaterialByDemo(demoPath) {
    var want = String(demoPath || "").replace(/^assets\//, "");
    if (!want) return null;
    var all = window.WEB_ARSENAL || [];
    for (var i = 0; i < all.length; i++) {
      var it = all[i];
      if (String(it.效果演示 || "").replace(/^assets\//, "") === want) return it;
    }
    return null;
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

  // ===== 三之二、分页：把「命中集合」切成「当前页 + 总数 + 分面」 =====
  //
  // 为什么返回对象而不是数组：界面顶部要「共 N 条」、翻页控件要总页数、
  // 筛选条要每个档位的数量。只返回当前页数组的话，这三样界面都算不出来。
  //
  // 为什么 facets 要按全量命中算：拿当前页那 24 条去数，数字会是错的
  // （比如「文字」真实 33 条，当前页里可能只有 2 条）。
  function paginate(all, cond, q, hitFn, searchFn, page, size, cmp) {
    var matched = all.filter(function (it) {
      return hitFn(it, cond) && searchFn(it, q);
    });
    // 排序必须在「切页」之前做：先切后排等于页内乱序，翻到第二页就露馅（2026-11-03 分页落地时接的）
    if (typeof cmp === "function") matched = matched.slice().sort(cmp);
    var total = matched.length;

    // size 传 0 / 不传 / 传得比总数还大 → 视为「不限」，一次全给
    var sz = (typeof size === "number" && size > 0) ? size : total || 1;
    var pages = Math.max(1, Math.ceil(total / sz));
    var pg = Math.min(Math.max(1, Math.floor(page) || 1), pages);
    var start = (pg - 1) * sz;
    var items = matched.slice(start, start + sz);

    // 分面计数：每一维统计时先假装这一维没选（否则选中值之外全变 0）
    var facets = {};
    FILTER_DIMS.forEach(function (dim) {
      facets[dim] = countByDim(all, cond, dim);
    });

    return { items: items, total: total, page: pg, size: sz, pages: pages, facets: facets };
  }

  // ===== 三之三、素材参数（统一参数接口 · 2026-11-03 C4）=====
  //
  // 背景：画布里的「素材部件」是一个 iframe（sandbox="allow-scripts"），
  //   检查器原来只能显示一条只读的「动效 / demos/xxx.html」，
  //   用户原话「为什么还是存在素材中间不能改字的情况」就是这么来的 ——
  //   因为部件把 PARTS[type].fields 当字段来源，而 __effect 没有 fields。
  //
  // 参数从哪来：素材库里每条记录的 `参数` 是**数组**，元素形如
  //   { 键:"ink", 名:"墨渍颜色", 类型:"color", 默认:"#1a1a1a" }
  //   slider 另有 最小/最大/步长；select 另有 选项。
  //   实测：348 条素材全部带 参数（348/348），类型分布
  //   color 1282 / slider 1230 / number 261 / string 84 / switch 71 / select 52。
  //   每份 demo 里都有同一段 window.addEventListener("message", ...) 监听
  //   {type:"param", key, value}，所以这是**全库统一协议**，不需要逐个适配。
  //
  // 为什么不在这里抄一份 normCode：
  //   canvas 这条路径只把 demo 塞进 iframe、只读结构化的 `参数`，从来不渲染
  //   `代码` 字符串，所以「双重转义」这个坑在画布上根本不存在。
  //   与其新增第三份实现（现有两份：index.html 内联一份、mcp/server.js 一份），
  //   不如让这条路径不需要它 —— 两份都不新增、不触碰，也就不会出现三份互不一致。

  // 中文键 → 英文短名。只映射已知的八个，未知键原样保留（向前兼容）
  var PARAM_KEYS = { 键: "key", 名: "label", 类型: "type", 默认: "default",
    最小: "min", 最大: "max", 步长: "step", 选项: "options" };

  // 归一化一条参数：中文键换成英文、缺省字段补上、类型白名单兜底
  function normParam(raw) {
    if (!raw || typeof raw !== "object") return null;
    var o = {};
    Object.keys(PARAM_KEYS).forEach(function (cn) {
      if (raw[cn] !== undefined) o[PARAM_KEYS[cn]] = raw[cn];
    });
    // 允许数据源将来直接用英文键
    ["key", "label", "type", "default", "min", "max", "step", "options"].forEach(function (k) {
      if (raw[k] !== undefined && o[k] === undefined) o[k] = raw[k];
    });
    if (!o.key) return null;
    if (!o.type) o.type = typeof o.default === "number" ? "number" : "string";
    if (o.type === "range") o.type = "slider";          // 个别数据用 range，统一成 slider
    if (!o.label) o.label = String(o.key);
    if (o.type === "slider" || o.type === "number") {
      o.min = typeof o.min === "number" ? o.min : 0;
      o.max = typeof o.max === "number" ? o.max : 100;
      o.step = typeof o.step === "number" && o.step > 0 ? o.step : 1;
      if (typeof o.default !== "number") o.default = o.min;
    }
    if (o.type === "switch" && typeof o.default !== "boolean") o.default = !!o.default;
    if (o.type === "select" && !Array.isArray(o.options)) o.options = [];
    return o;
  }

  // 某条素材的全部参数（已归一化）。找不到 / 没有参数 → 空数组，界面据此显示「无可调参数」
  function getMaterialParams(id) {
    var m = getMaterial(id);
    if (!m) return [];
    var arr = m.参数;
    if (!Array.isArray(arr)) return [];
    var out = [];
    arr.forEach(function (raw) {
      var p = normParam(raw);
      if (p) out.push(p);
    });
    return out;
  }

  // 参数的默认值表 { key: value } —— 部件新建时直接拿去当 p.params 的初始值
  function materialParamDefaults(id) {
    var out = {};
    getMaterialParams(id).forEach(function (p) { out[p.key] = p.default; });
    return out;
  }

  // ===== 四、对外接口：界面只认这几个函数 =====

  window.Repo = {
    // 取数
    listMaterials: listMaterials,
    listSchemes: listSchemes,
    getMaterial: getMaterial,
    getScheme: getScheme,
    findMaterialByDemo: findMaterialByDemo,

    // 素材参数（统一参数接口 · C4）：归一化后的数组 + 默认值表
    getMaterialParams: getMaterialParams,
    materialParamDefaults: materialParamDefaults,

    // 筛选规则（参数进、布尔出，纯函数）
    matchItem: matchItem,
    countByDim: countByDim,
    uniqDimVals: uniqDimVals,
    searchMaterial: searchMaterial,
    searchScheme: searchScheme,

    // 组合查询：条件 + 关键词 + 分页 → 结果对象（S2-b）
    // 返回形状已按 S3 后端接口定型，届时只换内部实现，界面不改：
    //   { items, total, page, size, pages, facets }
    // items  = 当前页的数据
    // total  = 命中总数（算总页数用；只给当前页的话界面不知道后面还有没有）
    // facets = 分面计数，筛选条上那排数字，必须按「全量命中」算而不是按当前页算
    // cmp    = 可选比较器（排序规则属于界面，这里只负责「排完再切页」）
    queryMaterials: function (cond, q, page, size, cmp) {
      return paginate(listMaterials(), cond, q, matchItem, searchMaterial, page, size, cmp);
    },
    querySchemes: function (cond, q, page, size, cmp) {
      return paginate(listSchemes(), cond, q, matchItem, searchScheme, page, size, cmp);
    },

    // 常量也暴露出去，避免界面再抄一份
    FILTER_DIMS: FILTER_DIMS,
    ALL: ALL
  };
})();
