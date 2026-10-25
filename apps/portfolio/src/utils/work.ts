import type { ImageMetadata } from 'astro'

import { SITE_SOURCE_URL } from '@/config'

export const getWorkSourceUrl = (slug: string) => {
  return `${SITE_SOURCE_URL}/src/content/works/${slug}.md`
}

const workImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/works/*/hero.png',
  { eager: true },
)

export const getWorkImage = (slug: string): ImageMetadata => {
  const image = workImages[`/src/assets/works/${slug}/hero.png`]
  if (!image) throw new Error(`Missing hero image for work: ${slug}`)
  return image.default
}
