import MarkdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';

export function markdownToPlainText(markdown: string): string {
  const md = new MarkdownIt();
  const dom = new JSDOM(`<div id="content">${md.render(markdown)}</div>`)
    .window.document.querySelector('#content');

  return (dom && dom.textContent && dom.textContent.trim() || '')
    .replace('\n', ' ');
}
