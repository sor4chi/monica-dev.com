import fs from "node:fs";
import path from "node:path";

import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers";
import {
  rehypeAnnotationBlock,
  rehypeHeadLinker,
  rehypeKatex,
  rehypeSlug,
} from "@sor4chi/unified-plugins/rehype";
import {
  remarkBreaks,
  remarkDetails,
  remarkDirective,
  remarkEmbed,
  remarkFlexBlock,
  remarkLinkCard,
  remarkMath,
  remarkMention,
  remarkSection,
  remarkTimeline,
  remarkTwitter,
  remarkVideo,
} from "@sor4chi/unified-plugins/remark";
import matter from "gray-matter";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const CONTENT_DIR = path.resolve(process.cwd(), "src/content");

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

function extractHeadingsFromHtml(html: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<h([1-6])\s+id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      depth: Number.parseInt(match[1]),
      slug: match[2],
      text: match[3].replace(/<[^>]+>/g, "").trim(),
    });
  }
  return headings;
}

let processorPromise: ReturnType<typeof createProcessor> | null = null;

function createProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkBreaks)
    .use(remarkTwitter)
    .use(remarkLinkCard)
    .use(remarkDirective)
    .use(remarkFlexBlock)
    .use(remarkTimeline)
    .use(remarkSection)
    .use(remarkMention)
    .use(remarkEmbed)
    .use(remarkDetails)
    .use(remarkVideo)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: {
        ...remarkTwitter.handlers,
        ...remarkLinkCard.handlers,
        ...remarkTimeline.handlers,
        ...remarkSection.handlers,
        ...remarkDetails.handlers,
        ...remarkEmbed.handlers,
        ...remarkVideo.handlers,
      },
    })
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeHeadLinker)
    .use(rehypeAnnotationBlock)
    .use(rehypeShiki, {
      themes: {
        light: "one-light",
        dark: "one-dark-pro",
      },
      defaultColor: "light",
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerRemoveNotationEscape(),
      ],
    })
    .use(rehypeStringify, { allowDangerousHtml: true });
}

function getProcessor() {
  if (!processorPromise) {
    processorPromise = createProcessor();
  }
  return processorPromise;
}

async function processMarkdown(content: string) {
  const processor = getProcessor();
  const result = await processor.process(content);
  const html = String(result);
  const headings = extractHeadingsFromHtml(html);
  return { html, headings };
}

function readCollection<T>(
  dir: string,
): Array<{ slug: string; data: T; body: string }> {
  const dirPath = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(".md", ""),
      data: data as T,
      body: content,
    };
  });
}

// --- Blog ---

export interface BlogFrontmatter {
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  authors?: string[];
  noindex?: boolean;
}

export function getBlogs() {
  return readCollection<BlogFrontmatter>("blogs").map((entry) => ({
    ...entry,
    data: {
      ...entry.data,
      publishedAt: new Date(entry.data.publishedAt),
      updatedAt: entry.data.updatedAt
        ? new Date(entry.data.updatedAt)
        : undefined,
    },
  }));
}

export async function getBlogBySlug(slug: string) {
  const blogs = getBlogs();
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) throw new Response("Not Found", { status: 404 });
  const { html, headings } = await processMarkdown(blog.body);
  return { ...blog, html, headings };
}

// --- External Blog ---

export interface ExternalBlogFrontmatter {
  title: string;
  publishedAt: Date;
  url: string;
}

export function getExternalBlogs() {
  return readCollection<ExternalBlogFrontmatter>("externalBlogs").map(
    (entry) => ({
      ...entry,
      data: {
        ...entry.data,
        publishedAt: new Date(entry.data.publishedAt),
      },
    }),
  );
}

// --- Work ---

export interface WorkFrontmatter {
  title: string;
  description: string;
  createdAt: Date;
  authors?: string[];
}

export function getWorks() {
  return readCollection<WorkFrontmatter>("works").map((entry) => ({
    ...entry,
    data: {
      ...entry.data,
      createdAt: new Date(entry.data.createdAt),
    },
  }));
}

export async function getWorkBySlug(slug: string) {
  const works = getWorks();
  const work = works.find((w) => w.slug === slug);
  if (!work) throw new Response("Not Found", { status: 404 });
  const { html, headings } = await processMarkdown(work.body);
  return { ...work, html, headings };
}

// --- Slide ---

export interface SlideFrontmatter {
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: Date;
  event: string;
}

export function getSlides() {
  return readCollection<SlideFrontmatter>("slides").map((entry) => ({
    ...entry,
    data: {
      ...entry.data,
      publishedAt: new Date(entry.data.publishedAt),
    },
  }));
}

// --- Timeline ---

export interface TimelineFrontmatter {
  title: string;
  icon?: string;
  link?: string;
  date: Date;
}

export function getTimelines() {
  return readCollection<TimelineFrontmatter>("timelines").map((entry) => ({
    ...entry,
    data: {
      ...entry.data,
      date: new Date(entry.data.date),
    },
  }));
}

export async function getTimelinesWithContent() {
  const timelines = getTimelines();
  return Promise.all(
    timelines.map(async (timeline) => {
      if (!timeline.body.trim()) {
        return { ...timeline, html: null };
      }
      const { html } = await processMarkdown(timeline.body);
      return { ...timeline, html };
    }),
  );
}

// --- Profile ---

export interface ProfileFrontmatter {
  title: string;
  subtitle: string;
  socials: {
    github: string;
    x: string;
  };
}

export async function getProfile() {
  const filePath = path.join(CONTENT_DIR, "profile/introduce.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const { html } = await processMarkdown(content);
  return { data: data as ProfileFrontmatter, html };
}
