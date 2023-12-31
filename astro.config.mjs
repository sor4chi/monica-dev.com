import { defineConfig } from "astro/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import remarkLinkCard from "./src/libs/remark-link-card";
import rehypeCodeBlockCopy from "./src/libs/rehype-code-block-copy";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFlexBlock from "./src/libs/remark-flex-block";
import rehypeHeadLinker from "./src/libs/rehype-head-linker";
import rehypeAnnotationBlock from "./src/libs/rehype-annotation-block";
import rehypeLinkCard from "./src/libs/rehype-link-card";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";
import { SITE_BASE_URL } from "./src/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [vanillaExtractPlugin()]
  },
  site: SITE_BASE_URL,
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath, remarkBreaks, remarkLinkCard, remarkDirective, remarkFlexBlock],
    rehypePlugins: [rehypeKatex, rehypeSlug, rehypeHeadLinker, rehypeAnnotationBlock, rehypeCodeBlockCopy, rehypeLinkCard]
  },
  integrations: [mdx(), react(), sitemap()]
});
