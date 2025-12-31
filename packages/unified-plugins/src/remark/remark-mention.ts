import { visit } from 'unist-util-visit'

import { createRemarkPlugin } from '../utils/remark-factory'

import type { Literal, PhrasingContent, Root, Text } from 'mdast'

const isLiteral = (node: unknown): node is Literal => {
  return typeof node === 'object' && node !== null && 'value' in node
}

const isText = (node: unknown): node is Text => {
  return isLiteral(node) && node.type === 'text'
}

const mentionRegex = /^([a-zA-Z0-9-_]+)@([a-zA-Z0-9-_]+)$/

interface RemarkMentionOptions {
  links: Record<string, (username: string) => string>
}

export const remarkMention = createRemarkPlugin(
  (
    options: RemarkMentionOptions = {
      links: {
        github: (u) => `https://github.com/${u}`,
        g: (u) => `https://github.com/${u}`,
        twitter: (u) => `https://twitter.com/${u}`,
        t: (u) => `https://twitter.com/${u}`,
      },
    },
  ) => {
    return (tree: Root) => {
      visit(tree, isText, (node, index, parent) => {
        const chunks = node.value.split(' ')

        const tmpChildren: PhrasingContent[] = []
        for (const chunk of chunks) {
          const match = mentionRegex.exec(chunk)
          if (match) {
            const [, provider, username] = match
            if (!options.links[provider]) {
              tmpChildren.push({ type: 'text', value: chunk })
              continue
            }
            const pureChunk = chunk.replace(/.*@/, '@')
            const link = options.links[provider]?.(username)
            tmpChildren.push({
              type: 'link',
              url: link,
              children: [{ type: 'text', value: pureChunk }],
            })
          } else {
            tmpChildren.push({ type: 'text', value: chunk })
          }
        }

        // join the children with a space
        const newChildren: PhrasingContent[] = []
        tmpChildren.forEach((child, index) => {
          if (index !== 0) {
            newChildren.push({
              type: 'text',
              value: ' ',
            })
          }
          if (child.type === 'text' && child.value === '') return
          newChildren.push(child)
        })

        if (parent && index !== undefined) {
          parent.children.splice(index, 1, ...newChildren)
        }
      })
    }
  },
)
