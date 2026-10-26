import { createExecutionContext, waitOnExecutionContext } from 'cloudflare:test'
import { afterEach, describe, expect, it, vi } from 'vitest'

import app from './index'

const request = async (url: string) => {
  const context = createExecutionContext()
  const response = await app.request(url, undefined, undefined, context)
  await waitOnExecutionContext(context)
  return response
}

afterEach(() => vi.restoreAllMocks())

describe('OGP Fetch Worker', () => {
  it('returns 400 for missing, invalid, and unsupported URLs', async () => {
    for (const query of ['', '?url=invalid', '?url=file:///tmp/test']) {
      expect((await request(`http://localhost/meta${query}`)).status).toBe(400)
    }
  })

  it('parses metadata, preserves URL encoding, and caches CORS headers', async () => {
    const upstream = 'https://example.com/article?value=a%26b'
    const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        `
      <html><head><title>Fallback title</title>
      <meta property="og:title" content="Preferred title">
      <meta name="description" content="Description">
      <meta property="og:image" content="images/cover.png">
      <link rel="icon" href="/favicon.ico"></head></html>
    `,
        { headers: { 'Content-Type': 'text/html' } },
      ),
    )
    const url = `http://localhost/meta?url=${encodeURIComponent(upstream)}`
    const response = await request(url)
    expect(response.status).toBe(200)
    expect(fetch.mock.calls[0][0]).toBe(upstream)
    expect(await response.json()).toEqual({
      title: 'Preferred title',
      description: 'Description',
      imageUrl: 'https://example.com/images/cover.png',
      faviconUrl: 'https://example.com/favicon.ico',
    })
    const cached = await request(url)
    expect(cached.headers.get('Access-Control-Allow-Origin')).toBe('*')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('returns a controlled error when the upstream request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('unreachable'))
    expect(
      (
        await request(
          'http://localhost/meta?url=https://unreachable.example/article',
        )
      ).status,
    ).toBe(502)
  })
})
