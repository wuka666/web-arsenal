// 分级筛选回归测试：无头浏览器注入点击，验证「每级都有全部 / 默认全部 / 两库都能筛」
// 用法（项目根目录）：node scripts/test_filters.js
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
const root = process.cwd();
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const src = fs.readFileSync(path.join(root, "index.html"), "utf8");

// 注入探针：切视图 / 点各层筛选 / 验证交集与「全部」默认
const probe = `
<script>
(function(){
  var log = [];
  var cnt = function(){ return document.getElementById('catCount').textContent; };
  var visCards = function(){ return [].slice.call(document.querySelectorAll('.card')).filter(function(c){ return c.style.display !== 'none'; }).length; };
  var pick = function(boxId, kw){ return [].slice.call(document.getElementById(boxId).querySelectorAll('button')).filter(function(b){ return b.textContent.indexOf(kw) === 0; })[0]; };
  try {
    log.push('诊断: 数据=' + (window.WEB_ARSENAL || []).length + '/' + (window.WEB_SCHEMES || []).length + ' 卡片=' + document.querySelectorAll('.card').length);
    // 结构：顶部应只有 适配端 / 元素；左栏只应有 风格 / 场景
    log.push('顶部区域=' + ['adaptChips','elemChips'].map(function(id){ return id + ':' + !!document.getElementById(id); }).join(',')
      + ' | 已移除=' + ['catChips','subChips','adaptSideChips','elemSideChips'].map(function(id){ return id + ':' + !!document.getElementById(id); }).join(','));
    log.push('左栏区域=' + ['styleSideChips','sceneSideChips'].map(function(id){ return id + ':' + !!document.getElementById(id); }).join(','));
    // 默认全选「全部」
    log.push('默认全部on=' + ['adaptChips','elemChips','styleSideChips','sceneSideChips'].map(function(id){ var b = pick(id,'全部'); return b ? /\\bon\\b/.test(b.className) : 'X'; }).join(','));
    log.push('素材默认 ' + cnt() + ' / 可见卡=' + visCards());
    // 方案视图
    document.querySelector('[data-view="schemes"]').click();
    log.push('方案视图 ' + cnt() + ' / 可见卡=' + visCards() + ' / 标题=' + document.getElementById('catTitle').textContent
      + ' / 元素层隐藏=' + (document.getElementById('elemRow').style.display === 'none'));
    document.querySelector('[data-view="arsenal"]').click();
    log.push('回到素材 元素层显示=' + (document.getElementById('elemRow').style.display !== 'none'));
    // 先单选一层，再叠加另一层，验证交集
    var elemVals = [].slice.call(document.getElementById('elemChips').querySelectorAll('button')).filter(function(b){ return !b.classList.contains('dim') && b.textContent.indexOf('全部') !== 0; });
    if (elemVals.length) { log.push('元素可选值数=' + elemVals.length + ' 例=' + elemVals.slice(0,3).map(function(b){ return b.textContent.replace(/\\s*·.*/,''); }).join('/')); elemVals[0].click(); log.push('元素=' + elemVals[0].textContent.replace(/\\s*·.*/,'') + ' → ' + cnt()); }
    else log.push('元素层无可点值');
    // 叠加适配端=通用（暂无标注）→ 交集应为 0
    pick('adaptChips','通用').click();
    log.push('叠加适配端=通用 → ' + cnt() + ' 标题=' + document.getElementById('catTitle').textContent);
    // ★ 同维度互斥（单选）：适配端已选「通用」，再点「PC 端」，两者不能同时 on
    pick('adaptChips','PC 端').click();
    log.push('再点适配端=PC端 → 通用on=' + /\\bon\\b/.test(pick('adaptChips','通用').className)
      + ' PC端on=' + /\\bon\\b/.test(pick('adaptChips','PC 端').className) + ' 标题=' + document.getElementById('catTitle').textContent);
    // 点已选中值 = 取消，回到「全部」
    pick('adaptChips','PC 端').click();
    log.push('再点一次 PC端(取消) → ' + cnt() + ' 全部on=' + /\\bon\\b/.test(pick('adaptChips','全部').className));
    // 复位
    pick('adaptChips','全部').click();
    log.push('点适配端全部 → ' + cnt() + ' 适配端全部on=' + /\\bon\\b/.test(pick('adaptChips','全部').className));
    var elemAll = pick('elemChips','全部'); elemAll.click();
    log.push('点元素全部 → ' + cnt() + ' 元素全部on=' + /\\bon\\b/.test(pick('elemChips','全部').className) + ' 标题=' + document.getElementById('catTitle').textContent);
  } catch (e) { log.push('异常: ' + e.message); }
  document.title = ['TES','TRESULT'].join('') + ' ' + log.join(' || ');
})();
</script>
`;
// 注意：index.html 脚本内部的 demo 代码串里也含 "</body>" 字面量，必须替换**最后**一处
const cut = src.lastIndexOf("</body>");
if (cut < 0) { console.error("✗ 找不到 </body>"); process.exit(1); }
// 测试副本必须放在项目根目录，否则 data/素材.js 这类相对路径解析不到（数据会是 0 条）
const testPath = path.join(root, "_filter_test.html");
fs.writeFileSync(testPath, src.slice(0, cut) + probe + src.slice(cut), "utf8");
const url = "file:///" + testPath.split(path.sep).join("/");
const out = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=9000",
  "--user-data-dir=" + path.join(os.tmpdir(), "flt-" + Date.now()), "--dump-dom", url], { encoding: "utf8", maxBuffer: 1024 * 1024 * 40 });
try { fs.unlinkSync(testPath); } catch (e) { console.log("（临时测试文件删除被拦截，稍后手工清理：" + path.basename(testPath) + "）"); }
const m = out.match(/TESTRESULT ([^<]*)/);
console.log(m ? m[1].split(" || ").join("\n") : "✗ 探针未执行（可能是脚本报错）");
