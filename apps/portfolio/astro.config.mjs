import { unified } from '@astrojs/markdown-remark'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerRemoveNotationEscape,
} from '@shikijs/transformers'
import {
  rehypeHeadLinker,
  rehypeAnnotationBlock,
  rehypeKatex,
  rehypeSlug,
} from '@sor4chi/unified-plugins/rehype'
import {
  remarkLinkCard,
  remarkFlexBlock,
  remarkTimeline,
  remarkEmbed,
  remarkDetails,
  remarkSection,
  remarkMention,
  remarkBreaks,
  remarkMath,
  remarkDirective,
  remarkVideo,
  remarkTwitter,
} from '@sor4chi/unified-plugins/remark'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, fontProviders } from 'astro/config'

import { SITE_BASE_URL } from './src/config'
import { FONT_NAME } from './src/styles/fonts'
import fontVariants from './src/assets/fonts/gen/variants.json' with { type: 'json' }

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  site: SITE_BASE_URL,
  fonts: [
    {
      name: FONT_NAME,
      cssVariable: '--font-gen-interface',
      weights: [400, 500, 600],
      provider: fontProviders.local(),
      options: { variants: fontVariants },
    },
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        dark: 'one-dark-pro',
        light: 'one-light',
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerRemoveNotationEscape(),
      ],
    },
    processor: unified({
      remarkPlugins: [
        remarkMath,
        remarkBreaks,
        remarkTwitter,
        remarkLinkCard,
        remarkDirective,
        remarkFlexBlock,
        remarkTimeline,
        remarkSection,
        remarkMention,
        remarkEmbed,
        remarkDetails,
        remarkVideo,
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        rehypeHeadLinker,
        rehypeAnnotationBlock,
      ],
      remarkRehype: {
        handlers: {
          ...remarkTwitter.handlers,
          ...remarkLinkCard.handlers,
          ...remarkTimeline.handlers,
          ...remarkEmbed.handlers,
          ...remarkVideo.handlers,
        },
      },
    }),
  },
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
})
