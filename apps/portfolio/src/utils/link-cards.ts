import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { getCollection } from 'astro:content'

import { EMBED_BASE_URL, SITE_BASE_URL, SITE_NAME } from '@/config'

import type { LinkCardMetadata } from './link-card-html'

const CACHE_TTL = 7 * 24 * 60 * 60 * 1000
const requests = new Map<string, Promise<LinkCardMetadata | undefined>>()

const getInternalCards = async () => {
  const [blogs, works] = await Promise.all([
    getCollection('blogs'),
    getCollection('works'),
  ])
  const cards = new Map<string, LinkCardMetadata>([
    [
      '/',
      {
        title: SITE_NAME,
        imageUrl: '/assets/ogp/default.png',
        faviconUrl: '/favicon.ico',
      },
    ],
  ])
  for (const [collection, entries] of [
    ['blogs', blogs],
    ['works', works],
  ] as const) {
    for (const entry of entries) {
      cards.set(`/${collection === 'blogs' ? 'blog' : 'work'}/${entry.id}`, {
        title: entry.data.title,
        imageUrl: `/assets/ogp/${collection}/${entry.id}.png`,
        faviconUrl: '/favicon.ico',
      })
    }
  }
  return cards
}

const parseMetadata = (value: unknown): LinkCardMetadata | undefined => {
  if (
    !value ||
    typeof value !== 'object' ||
    !('title' in value) ||
    typeof value.title !== 'string' ||
    !value.title.trim()
  )
    return
  return {
    title: value.title,
    imageUrl:
      'imageUrl' in value && typeof value.imageUrl === 'string'
        ? value.imageUrl
        : undefined,
    faviconUrl:
      'faviconUrl' in value && typeof value.faviconUrl === 'string'
        ? value.faviconUrl
        : undefined,
  }
}

const fetchExternalCard = async (
  url: URL,
): Promise<LinkCardMetadata | undefined> => {
  const cacheDir = path.join(process.cwd(), '.cache/link-cards')
  const file = path.join(
    cacheDir,
    `${createHash('sha256').update(url.href).digest('hex')}.json`,
  )
  let stale: LinkCardMetadata | undefined
  try {
    const cached = JSON.parse(await readFile(file, 'utf8'))
    stale = parseMetadata(cached.metadata)
    if (
      stale &&
      typeof cached.savedAt === 'number' &&
      Date.now() - cached.savedAt < CACHE_TTL
    )
      return stale
  } catch {
    /* Missing or invalid cache: fetch metadata. */
  }
  try {
    const endpoint = new URL('/meta', EMBED_BASE_URL)
    endpoint.searchParams.set('url', url.href)
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) return stale
    const metadata = parseMetadata(await response.json())
    if (!metadata) return stale
    try {
      await mkdir(cacheDir, { recursive: true })
      await writeFile(file, JSON.stringify({ savedAt: Date.now(), metadata }))
    } catch {
      /* Cache is optional on read-only filesystems. */
    }
    return metadata
  } catch {
    return stale
  }
}

export const resolveLinkCard = async (
  url: URL,
): Promise<LinkCardMetadata | undefined> => {
  if (url.origin === new URL(SITE_BASE_URL).origin) {
    return (await getInternalCards()).get(
      decodeURIComponent(url.pathname).replace(/\/$/, '') || '/',
    )
  }
  // A fragment does not change page metadata; deduplicate across articles too.
  const canonical = new URL(url)
  canonical.hash = ''
  let request = requests.get(canonical.href)
  if (!request) {
    request = fetchExternalCard(canonical)
    requests.set(canonical.href, request)
  }
  return request
}
