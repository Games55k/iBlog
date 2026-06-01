import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

export default function remarkDirectiveRehype() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type !== 'containerDirective' &&
        node.type !== 'leafDirective' &&
        node.type !== 'textDirective'
      ) {
        return
      }

      const data = node.data || (node.data = {})
      node.attributes = node.attributes || {}

      const hast = h(node.name, node.attributes)
      data.hName = hast.tagName
      data.hProperties = hast.properties
    })
  }
}
