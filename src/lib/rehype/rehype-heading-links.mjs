import { visit } from 'unist-util-visit'

/**
 * Rehype 插件：为标题添加锚点链接
 * 在每个标题（h1-h6）中添加一个可点击的锚点链接
 */
export default function rehypeHeadingLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // 只处理标题元素
      if (!/^h[1-6]$/.test(node.tagName)) return

      // 获取标题的 id
      const id = node.properties?.id
      if (!id) return

      // 检查是否已经有锚点链接
      const hasAnchor = node.children?.some(
        (child) =>
          child.type === 'element' &&
          child.tagName === 'a' &&
          child.properties?.className?.includes('heading-anchor'),
      )

      if (hasAnchor) return

      // 创建锚点链接元素
      const anchorLink = {
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#${id}`,
          className: ['heading-anchor'],
          'aria-hidden': 'true',
          tabIndex: -1,
        },
        children: [],
      }

      // 将锚点链接添加到标题开头
      node.children = [anchorLink, ...node.children]
    })
  }
}
