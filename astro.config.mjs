import { defineConfig } from "astro/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeHeadLinker from "./src/libs/rehype-head-linker";
import rehypeAnnotationBlock from "./src/libs/rehype-annotation-block";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [vanillaExtractPlugin()]
  },
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath, remarkBreaks],
    rehypePlugins: [rehypeKatex, rehypeSlug, rehypeHeadLinker, rehypeAnnotationBlock]
  },
  integrations: [mdx(), react()]
});