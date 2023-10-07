import { defineConfig } from "astro/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
