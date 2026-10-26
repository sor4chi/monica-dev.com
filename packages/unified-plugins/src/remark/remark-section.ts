import { visit } from 'unist-util-visit'

import type { Root } from 'mdast'
import type {} from 'mdast-util-directive'
import type { Plugin } from 'unified'

export const remarkSection: Plugin<[], Root> = () => (tree) => {
  let sectionIndex = 0
  visit(tree, 'containerDirective', (node) => {
    if (node.name !== 'section') return
    node.data = {
      ...node.data,
      hName: 'div',
      hProperties: {
        className: ['markdown-section', 'markdown-contents'],
        style: `animation-delay: ${sectionIndex++ / 5}s`,
      },
    }
  })
}
