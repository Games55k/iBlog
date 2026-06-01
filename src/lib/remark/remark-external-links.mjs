// src/lib/remark-external-links.mjs
import { visit } from 'unist-util-visit'

export default function remarkExternalLinks({ allowHostnames = [] } = {}) {
  const safeRel = ['noopener', 'noreferrer']
  return function (tree) {
    visit(tree, 'link', (node) => {
      const url = node.url || ''
      if (!/^https?:\/\//i.test(url)) return

      let host
      try {
        host = new URL(url).hostname.toLowerCase()
      } catch {
        return
      }

      const isInternal = allowHostnames.some((h) => {
        const t = h.toLowerCase()
        return host === t || host.endsWith('.' + t)
      })
      if (isInternal) return

      node.data ??= {}
      node.data.hProperties ??= {}
      const props = node.data.hProperties

      if (!props.target) props.target = '_blank'
      const existingRel = (props.rel || '').split(/\s+/).filter(Boolean)
      props.rel = Array.from(new Set([...existingRel, ...safeRel])).join(' ')
    })
  }
}
