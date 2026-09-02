// Web 灵感弹药库 —— 本地 MCP 服务器（stdio）
// 让任意支持 MCP 的客户端（Cursor / VS Code / Trae / WorkBuddy 等）
// 能直接搜索、读取弹药库里的素材：提示词 + 可运行代码。
// 与 Pixso MCP 配合：Pixso 出设计稿结构 → 弹药库补现成动效/组件代码。

const fs = require('fs');
const path = require('path');
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');

// —— 加载素材数据（复用与校验脚本相同的加载方式）——
const DATA_PATH = path.join(__dirname, '..', 'data', '素材.js');
function loadArsenal() {
  const code = fs.readFileSync(DATA_PATH, 'utf8');
  const sandbox = {};
  // 素材.js 末尾把数组挂到 window.WEB_ARSENAL
  new Function('window', code)(sandbox);
  return sandbox.WEB_ARSENAL || [];
}
const ARSENAL = loadArsenal();

const server = new McpServer({
  name: 'web-arsenal',
  version: '1.0.0',
});

// 工具 1：搜索素材（按关键词 / 风格 / 场景 / 元素 / 子类 多维过滤）
server.tool(
  'search_materials',
  '搜索 Web 灵感弹药库里的素材。可按关键词（标题/标签/说明）或 风格/场景/元素/子类 过滤。返回素材摘要列表（id、标题、分类、标签、一句话说明）。',
  {
    keyword: z.string().optional().describe('模糊关键词，匹配标题/标签/效果说明'),
    风格: z.string().optional().describe('风格筛选，如 克制简约 / 科技感 / 水墨国风'),
    场景: z.string().optional().describe('使用场景，如 数据看板 / 落地页 / 手机端网页'),
    元素: z.string().optional().describe('设计元素，如 动效 / 颜色 / 留白'),
    子类: z.string().optional().describe('子类，如 进度条 / 弹层 / 粒子'),
    limit: z.number().optional().describe('最多返回条数，默认 20'),
  },
  ({ keyword, 风格, 场景, 元素, 子类, limit = 20 }) => {
    let list = ARSENAL;
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter(it =>
        [it.标题, (it.标签 || []).join(' '), it.效果说明 || ''].join(' ').toLowerCase().includes(k)
      );
    }
    if (风格) list = list.filter(it => (it.风格 || []).includes(风格));
    if (场景) list = list.filter(it => (it.场景 || []).includes(场景));
    if (元素) list = list.filter(it => (it.元素 || []).includes(元素));
    if (子类) list = list.filter(it => it.子类 === 子类);
    list = list.slice(0, limit);
    const text = list.length
      ? list.map(it =>
          `【${it.id}】${it.标题}（${it.分类}）\n  标签：${(it.标签 || []).join('、')}\n  说明：${it.效果说明 || ''}`
        ).join('\n\n')
      : '没有匹配的素材。';
    return { content: [{ type: 'text', text }] };
  }
);

// 工具 2：取素材完整信息（提示词 + 代码 + 参数）
server.tool(
  'get_material',
  '按 id 取一条素材的完整内容：效果说明、用法、完整提示词（可复制给 AI 复刻）、可运行代码、可调参数。',
  { id: z.string().describe('素材 id，如 v128 / w006') },
  ({ id }) => {
    const it = ARSENAL.find(x => x.id === id);
    if (!it) return { content: [{ type: 'text', text: `找不到 id=${id} 的素材。` }] };
    const params = (it.参数 || []).map(p => `- ${p.键}（${p.名}，${p.类型}）默认=${JSON.stringify(p.默认)}`).join('\n');
    const text = [
      `# ${it.标题} [${it.id}]`,
      `分类：${it.分类}　标签：${(it.标签 || []).join('、')}`,
      `\n## 效果说明\n${it.效果说明 || ''}`,
      `\n## 用法\n${it.用法 || ''}`,
      `\n## 可调参数（${it.参数 ? it.参数.length : 0} 个）\n${params || '无'}`,
      `\n## 提示词（复制给 AI 即可复刻）\n${it.提示词 || ''}`,
      `\n## 代码（完整可运行 HTML）\n\`\`\`html\n${(it.代码 || '').replace(/<\\\//g, '</')}\n\`\`\``,
    ].join('\n');
    return { content: [{ type: 'text', text }] };
  }
);

// 工具 3：只取提示词（直接喂给 AI 复刻用）
server.tool(
  'get_prompt',
  '只取素材的「提示词」文本，方便直接复制给大模型复刻该效果。',
  { id: z.string().describe('素材 id') },
  ({ id }) => {
    const it = ARSENAL.find(x => x.id === id);
    if (!it) return { content: [{ type: 'text', text: `找不到 id=${id} 的素材。` }] };
    return { content: [{ type: 'text', text: it.提示词 || '该素材暂无提示词。' }] };
  }
);

// 工具 4：只取代码（现成可跑的 HTML）
server.tool(
  'get_code',
  '只取素材的完整可运行 HTML 代码（含 postMessage 调参接口），可直接保存为 .html 打开或嵌入项目。',
  { id: z.string().describe('素材 id') },
  ({ id }) => {
    const it = ARSENAL.find(x => x.id === id);
    if (!it) return { content: [{ type: 'text', text: `找不到 id=${id} 的素材。` }] };
    const code = (it.代码 || '').replace(/<\\\//g, '</');
    return { content: [{ type: 'text', text: code || '该素材暂无代码。' }] };
  }
);

// 工具 5：随机来一条（找灵感用）
server.tool(
  'random_material',
  '随机返回一条素材，用于找灵感。可指定风格/场景缩小范围。',
  { 风格: z.string().optional(), 场景: z.string().optional() },
  ({ 风格, 场景 }) => {
    let list = ARSENAL;
    if (风格) list = list.filter(it => (it.风格 || []).includes(风格));
    if (场景) list = list.filter(it => (it.场景 || []).includes(场景));
    if (!list.length) list = ARSENAL;
    const it = list[Math.floor(Math.random() * list.length)];
    return {
      content: [{
        type: 'text',
        text: `【${it.id}】${it.标题}\n标签：${(it.标签 || []).join('、')}\n说明：${it.效果说明 || ''}\n\n提示词：\n${it.提示词 || ''}`,
      }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // 不往 stdout 打日志（会污染 MCP 协议），仅 stderr
  console.error(`[web-arsenal MCP] 已加载 ${ARSENAL.length} 条素材，stdio 已连接`);
}
main().catch(e => { console.error('启动失败:', e); process.exit(1); });
