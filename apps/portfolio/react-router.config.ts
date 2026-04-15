import type { Config } from '@react-router/dev/config'
import { glob } from 'glob'

export default {
  ssr: true,
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
