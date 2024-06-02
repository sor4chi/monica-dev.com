import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "astro/config";
import {
  rehypeCodeBlockCopy,
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
} from "unified-plugins/remark";

import { SITE_BASE_URL } from "./src/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  site: SITE_BASE_URL,
  markdown: {
    syntaxHighlight: "prism",
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
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      rehypeHeadLinker,
      rehypeAnnotationBlock,
      rehypeCodeBlockCopy,
    ],
    remarkRehype: {
      handlers: {
        ...remarkLinkCard.handlers,
        ...remarkTimeline.handlers,
        ...remarkSection.handlers,
        ...remarkDetails.handlers,
        ...remarkEmbed.handlers,
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
