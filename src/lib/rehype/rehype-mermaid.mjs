import { visit } from 'unist-util-visit'

function toText(node) {
  if (!node) return ''
  if (node.type === 'text') return node.value ?? ''
  if (!Array.isArray(node.children)) return ''
  return node.children.map(toText).join('')
}

function isMermaidCodeBlock(node) {
  if (node?.type !== 'element' || node.tagName !== 'pre') return false

  const code = node.children?.find(
    (child) => child.type === 'element' && child.tagName === 'code',
  )
  const className = code?.properties?.className ?? []
  const classes = Array.isArray(className) ? className : [className]

  return classes.some((classValue) => classValue === 'language-mermaid')
}

export default function rehypeMermaid() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!isMermaidCodeBlock(node)) return

      const source = toText(node).trim()

      node.tagName = 'figure'
      node.properties = {
        className: ['mermaid-diagram'],
        dataMermaidSource: source,
      }
      node.children = [
        {
          type: 'element',
          tagName: 'pre',
          properties: { className: ['mermaid-diagram-source'] },
          children: [
            {
              type: 'text',
              value: source,
            },
          ],
        },
      ]
    })
  }
}
