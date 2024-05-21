import { defineConfig } from "astro/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import {
  rehypeCodeBlockCopy,
  rehypeScrollableTable,
  rehypeHeadLinker,
  rehypeAnnotationBlock,
  rehypeKatex,
  rehypeSlug,
} from "unified-plugins/rehype";
import {
  remarkLinkCard,
  remarkFlexBlock,
  remarkBlockImage,
  remarkTimeline,
  remarkEmbed,
  remarkDetails,
  remarkSection,
  remarkMention,
  remarkBreaks,
  remarkMath,
  remarkDirective,
} from "unified-plugins/remark";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";
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
      remarkBlockImage,
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
      rehypeScrollableTable,
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
