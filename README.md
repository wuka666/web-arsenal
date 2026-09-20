# Web 灵感弹药库（Web Arsenal）

> 把「看到的好效果」变成「能跑、能调、能直接喂给 AI」的弹药。
> **182 条素材 + 35 条方案**，每条配可运行的 Demo、可调参数和一段完整提示词。

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
| `assets/demos/` | 217 个可双击运行的演示（原生 HTML/CSS/JS） |
| `assets/库/starflow.js` | 第三方粒子引擎（MIT，供 3D 完整版调用） |
| `data/素材.js` | 素材数据源（182 条，`window.WEB_ARSENAL`） |
| `data/方案.js` | 方案数据源（35 条，`window.WEB_SCHEMES`） |
| `scripts/` | 入库与体检工具（都要在根目录运行）：`check_all.js` 一条命令跑全库基线；`check_adapt.js` 适配端实测（`--materials` 扫素材库；375×812 真机视口量横向溢出与并排多栏）；`rebuild_tags.js` 按四维词表全量重组标签（`--dry` 可干跑）；`test_filters.js` 分级筛选回归测试（无头浏览器注入点击）；`sync_code.js` / `sync_scheme_code.js` 代码↔demo 同步；`verify_entry.js` 条目校验（清单在同目录 `new_entries.js`）；`check_palette.js` 配色对齐；`check_links.js` 零外链；`check_param_types.js` 参数类型/用法冲突；`shot_demo.js` headless 截图 |
| `mcp/server.js` | 可选 MCP 服务器，AI 客户端可直接检索素材 |
| `01-素材条目模板.md` | 新增素材的填写模板 |
| `参考源.md` | 外部参考库调研（Uiverse / Galaxy 等） |
| `LICENSE` | 许可 |

---

## 这个库是什么

- **效果即代码**：每条素材都是 `assets/demos/` 里能直接跑的原生页面，不是截图和文字
- **参数联动**：调完参数后，复制出来的提示词和代码就是你调好的那一版，不会「演示调过、复制出来还是默认值」
- **提示词直达**：每条配一段完整提示词（效果 + 用法 + 关键参数 + 集成步骤），复制给 AI 就能照做
- **画布组装**：把素材和组件拼成一页，导出的提示词带坐标、尺寸与跳转行为，AI 还原度更高
- **四维分级筛选**：适配端（通用 / PC 端 / 移动端）· 元素（动作 / 输入 / 导航 / 反馈 / 数据 / 容器布局 / 媒体 / 文字 / 动效 / 背景氛围）· 风格（13 类）· 场景（7 类）
  - 四维**同级、互为交集**；每个维度**单选**、自带「全部」且默认全选；素材库展示 适配端 / 元素 / 风格 / 场景，方案库只展示 适配端 / 风格 / 场景（整站方案不按元素分）
  - 另有 35 条整站方案（每套独立版式 + 独立色系，非换肤）

---

## 来源与原创声明

- 182 条素材**逐条标注来源**（写在 `data/素材.js` 的 `来源` 字段，可追溯），按宪法「规矩 19」五分类：`① 具体网站`（保留域名与分析日期）、`② 抖音`（统一写作「来自于抖音」）、`③ 自研`、`④ 机制参考自…已换题重推`、`⑤ 方案库拆解`
- 所有代码均为观察交互手法后的**原创复刻 / 自写**，零依赖重写，未复制任何网站源码、字体、图片或商业素材
- 借鉴对象包括：ReactBits（MIT，已逐条标注）、Stripe / Apple / stateofaidesign / Awwwards 等官网的交互手法，以及视频资料中的通用交互模式
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

```bash
node scripts/check_all.js        # 一条命令跑全库基线：语法 / id / 参数 / 死参数 / 来源 / 代码=demo / 配色 / 零外链
node scripts/shot_demo.js "assets/demos/xxx.html"   # headless 截图，确认渲染非空白（改过 demo 时）
```

`check_all.js` 不合格即退出码非 0，可直接挂 CI。改动 demo 后记得跑 `sync_code.js`（素材）/ `sync_scheme_code.js`（方案），保证「代码 = demo 逐字节」。
