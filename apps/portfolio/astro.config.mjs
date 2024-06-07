import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "astro/config";
import {
  rehypeHeadLinker,
  rehypeAnnotationBlock,
  rehypeKatex,
  rehypeSlug,
} from "unified-plugins/rehype";
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
  remarkVideo
} from "unified-plugins/remark";

import { SITE_BASE_URL } from "./src/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  site: SITE_BASE_URL,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        dark: "one-dark-pro",
        light: "one-light",
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        // ref: https://github.com/shikijs/shiki/issues/690
        {
          name: "shiki:remove-escape",
          postprocess: (c) => c.replace(/\[\\!code/g, "[!code"),
        },
      ],
    },
    remarkPlugins: [
      remarkMath,
      remarkBreaks,
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
        ...remarkLinkCard.handlers,
        ...remarkTimeline.handlers,
        ...remarkSection.handlers,
        ...remarkDetails.handlers,
        ...remarkEmbed.handlers,
        ...remarkVideo.handlers,
      },
    },
  },
  integrations: [
    react(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
