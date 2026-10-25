import { fromHtml } from 'hast-util-from-html'
import { toHtml } from 'hast-util-to-html'
import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

export interface LinkCardMetadata {
  title: string
  imageUrl?: string
  faviconUrl?: string
}

type Resolver = (url: URL) => Promise<LinkCardMetadata | undefined>

const httpUrl = (value: string | undefined, base: URL) => {
  if (!value) return undefined
  try {
    const url = new URL(value, base)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined
  } catch {
    return undefined
  }
}

export const renderLinkCards = async (
  html: string,
  site: string,
  resolve: Resolver,
) => {
  if (!html.includes('link-card')) return html
  const tree = fromHtml(html, { fragment: true })
  const cards: (() => Promise<void>)[] = []
  visit(tree, 'element', (node) => {
    if (
      node.tagName !== 'a' ||
      !Array.isArray(node.properties.className) ||
      !node.properties.className.includes('link-card')
    )
      return
    const href = String(node.properties.href ?? '')
    const absolute = httpUrl(href, new URL(site))
    if (!absolute) return
    const url = new URL(absolute)
    cards.push(async () => {
      const fallbackTitle = toHtml({ type: 'root', children: node.children })
      // Parse text separately so metadata always becomes escaped text, never HTML.
      const text = (value: string) => {
        const parsed = fromHtml(value, { fragment: true })
        let result = ''
        visit(parsed, 'text', (child) => {
          result += child.value
        })
        return result
      }
      let metadata: LinkCardMetadata | undefined
      try {
        metadata = await resolve(url)
      } catch {
        /* Keep the original label. */
      }
      const title = metadata?.title
        ? text(metadata.title.replaceAll('<', '&lt;').replaceAll('>', '&gt;'))
        : text(fallbackTitle) || href
      const image = httpUrl(metadata?.imageUrl, url)
      const favicon = httpUrl(metadata?.faviconUrl, url)
      if (url.origin !== new URL(site).origin) {
        node.properties.target = '_blank'
        node.properties.rel = ['noopener', 'noreferrer']
      }
      node.children = [
        ...(image
          ? [
              h('img.link-card__image', {
                src: image,
                alt: '',
                loading: 'lazy',
                decoding: 'async',
                width: 1200,
                height: 630,
              }),
            ]
          : []),
        h('span.link-card__content', [
          h('span.link-card__title', title),
          h('span.link-card__meta', [
            ...(favicon
              ? [
                  h('img.link-card__favicon', {
                    src: favicon,
                    alt: '',
                    loading: 'lazy',
                    decoding: 'async',
                    width: 16,
                    height: 16,
                  }),
                ]
              : []),
            h('span.link-card__domain', url.hostname),
          ]),
        ]),
      ]
    })
  })
  // Bound concurrent requests instead of starting a request for every card.
  for (let i = 0; i < cards.length; i += 4) {
    await Promise.all(cards.slice(i, i + 4).map((render) => render()))
  }
  return toHtml(tree)
}
