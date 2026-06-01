// src/lib/remark-demote-h1.mjs
import { visit } from 'unist-util-visit'

/**
 * 将 Markdown/MDX 正文里的所有一级标题（#）降级为二级标题（##）。
 * 目的：保证页面只产生一个 h1，由布局负责渲染。
 */
export default function remarkDemoteH1ToH2() {
  return function (tree) {
    visit(tree, 'heading', (node) => {
      if (node.depth === 1) {
        node.depth = 2
      }
    })
  }
}
