import { Hono } from 'hono'

import { MetaParser } from './meta'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use(logger())
app.use(cors())

const FETCH_INIT: RequestInit = {
  redirect: 'follow',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (compatible; MetaFetcher/1.0; +https://monica-dev.com)',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  },
}

app.get('/meta', async (c) => {
  const url = new URL(c.req.url)

  const paramUrl = url.searchParams.get('url')
  if (paramUrl === null) return c.body('Bad Request', 400)

  let parsedUrl: URL
  try {
    parsedUrl = new URL(paramUrl)
  } catch {
    return c.body('Bad Request', 400)
  }
  if (!['http:', 'https:'].includes(parsedUrl.protocol))
    return c.body('Bad Request', 400)
  const decodedUrl = parsedUrl.href

  const cache = await caches.open('meta')
  const cachedResponse = await cache.match(decodedUrl)
  if (cachedResponse) return cachedResponse

  let siteRes: Response
  try {
    siteRes = await fetch(decodedUrl, {
      ...FETCH_INIT,
      signal: AbortSignal.timeout(5000),
    })
  } catch {
    return c.body('Bad Gateway', 502)
  }
  if (!siteRes.ok) return c.body('Not Found', 404)

  const meta = new MetaParser()
  const res = new HTMLRewriter()
    .on('title', meta)
    .on('meta', meta)
    .on('link', meta)
    .transform(siteRes)

  await res.text()

  for (const key of ['imageUrl', 'faviconUrl'] as const) {
    if (!meta[key]) continue
    try {
      const asset = new URL(meta[key], siteRes.url || decodedUrl)
      meta[key] = ['http:', 'https:'].includes(asset.protocol) ? asset.href : ''
    } catch {
      meta[key] = ''
    }
  }
  c.header('Cache-Control', 'public, max-age=3600')
  const response = c.json(meta)

  c.executionCtx.waitUntil(cache.put(decodedUrl, response.clone()))

  return response
})

export default app
