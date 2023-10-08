import { defineConfig } from "astro/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeHeadLinker from "./src/libs/rehype-head-linker";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath, remarkBreaks],
    rehypePlugins: [rehypeKatex, rehypeSlug, rehypeHeadLinker],
  },
});
