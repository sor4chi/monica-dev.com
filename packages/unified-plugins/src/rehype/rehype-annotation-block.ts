import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

import type { Root } from 'hast'
import type { Plugin } from 'unified'

const ALERT_MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=\s|$)/

export const rehypeAnnotationBlock: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'element', (node) => {
    if (node.tagName !== 'blockquote') return
    const paragraph = node.children.find(
      (child) => child.type === 'element' && child.tagName === 'p',
    )
    if (paragraph?.type !== 'element') return
    const first = paragraph.children[0]
    if (first?.type !== 'text') return
    const match = ALERT_MARKER.exec(first.value)
    if (!match) return
    const kind = match[1]
    // Replace only the marker; keep subsequent text, breaks, and inline markup.
    first.value = first.value.slice(match[0].length)
    paragraph.children.unshift(h('span.annotation-block__label', kind))
    const classes = node.properties.className
    node.properties.className = [
      ...(classes ?? []),
      'annotation-block',
      'markdown-contents',
    ]
    node.properties['data-annotation-type'] = kind.toLowerCase()
  })
}
