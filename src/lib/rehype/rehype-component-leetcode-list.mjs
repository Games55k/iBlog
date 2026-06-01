import { h } from 'hastscript'

export function LeetCodeListComponent(properties, children) {
  const headingLabels = ['题号', '题目', '难度', '算法']
  const title = properties?.title || 'LeetCode Problems'

  return h('div', { class: 'leetcode-list', 'data-pagefind-ignore': true }, [
    h(
      'div',
      { class: 'leetcode-list-table', role: 'table', 'aria-label': title },
      [
        h(
          'div',
          { class: 'leetcode-list-head', role: 'row' },
          headingLabels.map((label) =>
            h(
              'span',
              { class: 'leetcode-list-heading', role: 'columnheader' },
              label,
            ),
          ),
        ),
        h('div', { class: 'leetcode-list-body' }, children),
      ],
    ),
  ])
}
