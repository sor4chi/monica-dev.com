import { visit } from 'unist-util-visit'

import type { Root } from 'mdast'
import type { ContainerDirective } from 'mdast-util-directive'
import type { Plugin } from 'unified'

export const remarkDetails: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'containerDirective', (node) => {
    if (node.name !== 'details') return
    const [summary, ...children] = node.children
    if (summary?.type !== 'paragraph' || !summary.data?.directiveLabel) return

    summary.data = { ...summary.data, hName: 'summary' }
    const content: ContainerDirective = {
      type: 'containerDirective',
      name: 'details-content',
      attributes: {},
      data: {
        hName: 'div',
        hProperties: { className: ['details-contents', 'markdown-contents'] },
      },
      children,
    }
    node.data = { ...node.data, hName: 'details' }
    node.children = [summary, content]
  })
}
