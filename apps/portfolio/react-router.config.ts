import type { Config } from '@react-router/dev/config'
import { glob } from 'glob'

export default {
  ssr: true,
  // Disable lazy route discovery (Fog of War) - all routes are known at build
  // time via prerender, so the /__manifest endpoint isn't needed and would 404
  // on static hosting (Cloudflare Pages).
  routeDiscovery: { mode: 'initial' },
  async prerender() {
    const blogFiles = await glob('src/content/blogs/*.md')
    const workFiles = await glob('src/content/works/*.md')

    const blogSlugs = blogFiles.map((f) =>
      f.replace('src/content/blogs/', '').replace('.md', ''),
    )
    const workSlugs = workFiles.map((f) =>
      f.replace('src/content/works/', '').replace('.md', ''),
    )

    return [
      '/',
      '/blog',
      ...blogSlugs.map((s) => `/blog/${s}`),
      '/work',
      ...workSlugs.map((s) => `/work/${s}`),
      '/timeline',
      '/slide',
    ]
  },
} satisfies Config
