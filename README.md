# Web 灵感书房

> 把「看到的好效果」变成「能跑、能调、能直接喂给 AI」的技法。
> **334 条素材 + 49 条方案**，每条配可运行的 Demo、可调参数和一段完整提示词。

---

## 快速开始

| 想做什么 | 打开什么 |
|---|---|
| 逛素材库 / 方案库 | 双击 **`index.html`** |
| 把素材拼装成一个页面 | 双击 `index.html` → 点右下角「**画布**」 |
| 让 AI 直接检索本库 | 启动 `mcp/server.js`（见文末） |

全部离线可用：零框架、零 CDN，双击即开。

---

## 文件地图

| 路径 | 是什么 |
|---|---|
| `index.html` | 画廊首页（两个视图：素材库 / 方案库） |
| `assets/canvas.html` | 画布设计器（多屏拼装、坐标提示词导出） |
| `assets/demos/` | 383 个可双击运行的演示（原生 HTML/CSS/JS） |
| `assets/库/starflow.js` | 第三方粒子引擎（MIT，供 3D 完整版调用） |
| `data/素材.js` | 素材数据源（334 条，`window.WEB_ARSENAL`） |
| `data/方案.js` | 方案数据源（49 条，`window.WEB_SCHEMES`） |
| `scripts/` | 入库与体检工具（都要在根目录运行）：`check_all.js` 一条命令跑全库基线；`check_skeleton.js` **跨条目骨架雷同比对**（规矩 21 第 4 项，`check_all.js` 查不出这层）；`check_adapt.js` 适配端实测（`--materials` 扫素材库；375×812 真机视口量横向溢出与并排多栏）；`rebuild_tags.js` 按四维词表全量重组标签（`--dry` 可干跑）；`test_filters.js` 分级筛选回归测试（无头浏览器注入点击）；`sync_code.js` / `sync_scheme_code.js` 代码↔demo 同步；`verify_entry.js` 条目校验（清单在同目录 `new_entries.js`）；`check_palette.js` 配色对齐；`check_links.js` 零外链；`check_param_types.js` 参数类型/用法冲突；`check_vars.js` **悬空 CSS 变量体检**（真实渲染逐键读 `--x` 计算值，专抓「定义了 `state` 却忘了在加载时调 `apply()`」→ 整页变量落空）；`shot_demo.js` headless 截图；`check_touch_targets.js` 触控目标尺寸核查（移动≥44 / PC≥24，无头双视口，内置 WCAG 2.5.8 inline 例外与 `data-touch-exempt` 豁免机制）；`fix_touch_targets.js` 按核查清单**批量补命中区**（幂等、改前自动备份）。**共 16 件**（2026-10-02 核定；`add_entries.js` 因内容写死单批条目、属一次性脚本，已移出仓库） |
| `mcp/server.js` | 可选 MCP 服务器，AI 客户端可直接检索素材 |
| `Agent宪法.md` | **AI 行为规则（最高准则，31 条规矩 + 附录 A 踩坑 + 附录 B UI 基线）**，与仓库根 `AGENTS.md` 冲突时本文件优先 |
| `01-素材条目模板.md` | 新增素材的填写模板 |
| `LICENSE` | 许可 |
| `ROADMAP.md` | 路线与里程碑 |
| `BUGS.md` | 已知缺陷跟踪（当前无未修复项 + 复盘规则 / E1–E4 经验沉淀） |
| `素材源清单.md` | **各素材源的「已扒结论」+ 外部库深度调研**（原 `参考源.md` 已于 2026-09-30 并入） |

---

## 这个库是什么

- **效果即代码**：每条素材都是 `assets/demos/` 里能直接跑的原生页面，不是截图和文字
- **参数联动**：调完参数后，复制出来的提示词和代码就是你调好的那一版，不会「演示调过、复制出来还是默认值」
- **提示词直达**：每条配一段完整提示词（效果 + 用法 + 关键参数 + 集成步骤），复制给 AI 就能照做
- **画布组装**：把素材和组件拼成一页，导出的提示词带坐标、尺寸与跳转行为，AI 还原度更高
- **四维分级筛选**：适配端（通用 / PC 端 / 移动端）· 元素（动作 / 输入 / 导航 / 反馈 / 数据 / 容器布局 / 媒体 / 文字 / 动效 / 背景氛围）· 风格（8 类）· 场景（8 类）
  - 四维**同级、互为交集**；每个维度**单选**、自带「全部」且默认全选；素材库展示 适配端 / 元素 / 风格 / 场景，方案库只展示 适配端 / 风格 / 场景（整站方案不按元素分）
  - 另有 49 条整站方案（每套独立版式 + 独立色系，非换肤）

---

## 来源与原创声明

- 334 条素材**逐条标注来源**（写在 `data/素材.js` 的 `来源` 字段，可追溯），按宪法「规矩 19」五分类：`① 具体网站`（保留域名与分析日期）、`② 抖音`（统一写作「来自于抖音」）、`③ 自研`、`④ 机制参考自…已换题重推`、`⑤ 方案库拆解`
- 所有代码均为观察交互手法后的**零依赖自写**（原生 HTML/CSS/JS，未复制任何网站源码、字体、图片或商业素材）
- 借鉴对象包括：ReactBits（源 `DavidHDev/react-bits`，**MIT + Commons Clause**，已逐条标注；仅借机制用原生 JS 重写，**不搬运其源码、不再分发其组件本体**）、Stripe / Apple / stateofaidesign / Awwwards 等官网的交互手法，以及视频资料中的通用交互模式
- 引用第三方库（如 starflow.js）**保留其原始许可证与版权署名**

---

## 用 MCP 让 AI 直接检索（可选）

```bash
cd mcp && npm install
node server.js        # 在 MCP 客户端里配成 stdio 服务器
```

提供 7 个工具：`search_materials`（多维筛选）、`get_material`（完整条目）、`get_prompt`（只取提示词）、`get_code`（只取可运行 HTML）、`random_material`（找灵感）、`search_schemes`（搜方案）、`get_scheme`（取方案全文）。

---

## 许可

见 `LICENSE`。

---

## 维护与体检（改完必跑）

**入库 / 改 demo 后的完整校验链（顺序固定，缺一项不算完成 → 宪法规矩 31③）**

```bash
node scripts/verify_entry.js                        # 1 条目自检（待校验 id 写在 scripts/new_entries.js）
node scripts/check_all.js                           # 2 全库基线：语法 / id / 参数 / 死参数 / 来源 / 代码=demo / 配色 / 零外链 / 桶容量
node scripts/check_skeleton.js                      # 3 骨架雷同（扫素材库要加 --materials --threshold 0.75+）
node scripts/check_vars.js                          # 4 悬空 CSS 变量（真实渲染逐键读计算值，专抓 demo 漏调 apply() → 整页变透明）
node scripts/check_adapt.js                         # 5 适配端 375px 实测（--materials 扫素材库）
node scripts/check_touch_targets.js                 # 6 触控命中区（移动≥44 / PC≥24）
node scripts/shot_demo.js "assets/demos/xxx.html"   # 7 headless 截图，确认渲染非空白（改过 demo 时）
```

> ⚠️ **无头核查很慢**（每个 demo 起一次 Chrome，全量 >15 分钟会被前台超时转后台）：**别接 `| grep` 管道**；别想 kill 全量任务（子 node 会变孤儿继续跑，本机也枚举不到）。日常用「指定 demo 路径」定向核查，全量一周一次即可。

`check_all.js` 与 `check_skeleton.js` 不合格均退出码非 0，可直接挂 CI。改动 demo 后记得跑 `sync_code.js`（素材）/ `sync_scheme_code.js`（方案），保证「代码 = demo 逐字节」。方案新条目同步完还要**手动把 `</script>` 转义成 `<\/script>`**（素材的同步器会自动处理，方案的不）。

> ⚠️ **两条命令都过 ≠ 入库合格**：它们查的分别是「单条自身」与「方案之间的骨架」。**「新条目的机制是否已被现有条目覆盖」（同源重复）仍需人工确认** —— 先 `grep` 一下 `data/*.js` 的 `来源` / `参考站` 里有没有同一个域名，再**读候选条目的「效果说明」比机制指纹**（关键词命中 60% 是误命中）。详细 10 条入库铁律见 `Agent宪法.md` 规矩 31 + 附录 A5。

---

## 本地私有文档（不进公开仓库）

有几种文档**只在本机保留**，不随仓库公开：`Agent宪法.md`（AI 行为规则 / 踩坑档案）、`ROADMAP.md`（路线与内部规划）、`_local/`（以后放其它内部文件）。

它们的**工作内容照常写进仓库文档**（README / BUGS / 素材源清单都引用它们），只是文件本体不上 GitHub。三层保险，缺一不可：

| 层 | 位置 | 是否随仓库分发 | 管什么 |
|---|---|---|---|
| ① | `.gitignore` | **会**（clone 的人能看到规则） | 日常忽略，规则透明 |
| ② | `.git/info/exclude` | 不会（只在 `.git/` 内） | 第二层，防止有人动了 `.gitignore` |
| ③ | `.git/hooks/pre-push` | 不会（只在 `.git/` 内） | **推送前拦截**：私有文档一旦进了索引就拒绝 push 并给出处理命令 |

> 🔴 **要往里加新的私有文件**：三处都要加（`.gitignore` + `.git/info/exclude` + `pre-push` 的 `PROTECTED` 列表），再更新上面这张表。
> 🔴 **别用 `git add -f`** 绕过 —— 那是唯一能把它们推进仓库的动作；`pre-push` 钩子是最后一道闸。
> ✅ **已做过的清洗（2026-10-02）**：`data/` 两库里指向用户**个人抖音收藏夹**的记录（`modal_id=…` 与 `douyin.com/user/self?…`，共 7 处）已按宪法规矩 19② 清洗为「来自于抖音」；全库复查 0 处残留。
