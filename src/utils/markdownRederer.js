import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // 选择一款代码高亮样式

// 配置marked
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

// 创建渲染器实例
const renderer = new marked.Renderer();

// 自定义渲染规则（可选）
renderer.heading = function (text, level) {
// 关键：强制转换为字符串，空值兜底
  const safeText = typeof text === 'string' ? text : String(text || '');
  // 生成锚点ID（转为小写、空格替换为短横线）
  const slug = safeText.toLowerCase().replace(/\s+/g, '-');
  return `<h${level} id="${slug}" class="markdown-heading">${safeText}</h${level}>`;
};

// 导出渲染函数
export const renderMarkdown = (content) => {
  if (!content) return "";
  return marked(content, { renderer });
};

// 导出提取标题函数（为后续目录功能做准备）
export const extractHeadings = (content) => {
  const tokens = marked.lexer(content);
  return tokens
    .filter((token) => token.type === "heading" && token.depth <= 3)
    .map((heading) => ({
      level: heading.depth,
      text: heading.text,
      anchor: heading.text.toLowerCase().replace(/[^\w]+/g, "-"),
    }));
};
