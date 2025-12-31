import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

import {
  createRehypeHandlers,
  createRemarkPlugin,
  createRemarkRehypePlugin,
} from '../utils/remark-factory'

import type { Link, LinkData, Node, Parent, PhrasingContent } from 'mdast'

const isNode = (node: unknown): node is Node => {
  if (node === null || typeof node !== 'object') {
    return false
  }

  return 'type' in node
}

const isParent = (node: unknown): node is Parent => {
  return isNode(node) && Array.isArray((node as Parent).children)
}

export interface BlockLink extends Omit<Link, 'type'> {
  type: 'blockLink'
  children: PhrasingContent[]
  data?: LinkData | undefined
}

declare module 'mdast' {
  interface BlockContentMap {
    blockLink: BlockLink
  }
  interface RootContentMap {
    blockLink: BlockLink
  }
}

const plugin = createRemarkPlugin(() => {
  return async (tree) => {
    visit(tree, (node, index, parent) => {
      if (index === undefined) return
      if (!isNode(node) || !isParent(parent)) return
      if (['footnoteDefinition', 'listItem'].includes(parent.type)) return
      if (node.type !== 'paragraph') return
      if (node.children.length !== 1) return

      const child = node.children[0]

      if (child.type !== 'link') return

      const newNode: BlockLink = {
        ...child,
        type: 'blockLink',
      }

      parent.children.splice(index, 1, newNode)
    })
  }
})

const handlers = createRehypeHandlers({
  blockLink: (state, node: BlockLink) => {
    const hastElement = h(
      'a.link-card',
      {
        href: node.url,
      },
      state.all(node),
    )
    return hastElement
  },
})

export const remarkLinkCard = createRemarkRehypePlugin(plugin, handlers)
