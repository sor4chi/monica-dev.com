import { describe, expect, it, vi } from 'vitest'

import { renderLinkCards } from './link-card-html'

const site = 'https://monica-dev.com'

describe('renderLinkCards', () => {
  it('renders internal metadata without making the link external', async () => {
    const result = await renderLinkCards(
      '<a class="link-card" href="/blog/new?x=1#intro">Original</a>',
      site,
      async () => ({
        title: 'New &amp; <T>',
        imageUrl: '/assets/ogp/blogs/new.png',
      }),
    )
    expect(result).toContain('href="/blog/new?x=1#intro"')
    expect(result).toContain('class="link-card__title">New &#x26; &#x3C;T>')
    expect(result).toContain(
      'src="https://monica-dev.com/assets/ogp/blogs/new.png"',
    )
    expect(result).not.toContain('target="_blank"')
  })

  it('keeps the original label on failure and resolves query strings intact', async () => {
    const resolve = vi.fn<Parameters<typeof renderLinkCards>[2]>(async () => {
      throw new Error('offline')
    })
    const result = await renderLinkCards(
      '<a class="link-card" href="https://example.com/?a=1&amp;b=2"><strong>Read this</strong></a>',
      site,
      resolve,
    )
    expect(resolve.mock.calls[0][0].search).toBe('?a=1&b=2')
    expect(result).toContain('class="link-card__title">Read this')
    expect(result).toContain('target="_blank"')
    expect(result).toContain('rel="noopener noreferrer"')
    expect(result).not.toContain('Loading...')
  })

  it('does not inject remote HTML or unsafe image URLs', async () => {
    const result = await renderLinkCards(
      '<a class="link-card" href="https://example.com">Example</a>',
      site,
      async () => ({
        title: '<script>alert(1)</script>',
        imageUrl: 'javascript:alert(1)',
        faviconUrl: 'data:text/html,bad',
      }),
    )
    expect(result).not.toContain('<script>')
    expect(result).not.toContain('javascript:')
    expect(result).not.toContain('<img')
    expect(result).toContain('alert(1)')
  })

  it('leaves ordinary links and unsupported protocols unchanged', async () => {
    const resolve = vi.fn()
    const html = '<p><a href="/blog/new">Inline</a></p>'
    expect(await renderLinkCards(html, site, resolve)).toBe(html)
    await renderLinkCards(
      '<a class="link-card" href="mailto:test@example.com">Email</a>',
      site,
      resolve,
    )
    expect(resolve).not.toHaveBeenCalled()
  })

  it('limits metadata lookups to four concurrent requests', async () => {
    let active = 0
    let peak = 0
    const html = Array.from(
      { length: 9 },
      (_, i) => `<a class="link-card" href="https://example.com/${i}">Link</a>`,
    ).join('')
    await renderLinkCards(html, site, async () => {
      active++
      peak = Math.max(peak, active)
      await new Promise((resolve) => setTimeout(resolve, 1))
      active--
      return { title: 'Example' }
    })
    expect(peak).toBe(4)
  })
})
