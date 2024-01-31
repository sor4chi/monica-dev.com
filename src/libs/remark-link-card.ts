import { visit } from "unist-util-visit";

import type { Parent } from "mdast";
import type { Transformer } from "unified";
import picocolors from "picocolors";
import type { Child } from "hastscript";

const isParent = (node: unknown): node is Parent => {
  return node !== undefined;
};

const isBlockLink = (node: unknown, _index: unknown, parent: unknown) => {
  if (!isParent(node)) {
    return false;
  }

  if (node.type !== "paragraph") {
    return false;
  }

  if ((parent as Parent).type === "listItem") {
    return;
  }

  if (node.children.length !== 1) {
    return false;
  }

  const child = node.children[0];

  if (child.type !== "link") {
    return false;
  }

  return true;
};

const parseTag = (tag: string) => {
  const matches = tag.match(/([a-z0-9-]+)="([^"]*)"/gi);
  if (!matches) {
    return {};
  }
  return matches.reduce(
    (attrs, match) => {
      const [key, ...rest] = match.split("=");
      const value = rest.join("=");
      attrs[key.trim()] = value.replace(/"/g, "").trim();
      return attrs;
    },
    {} as Record<string, string>,
  );
};

const getTags = (
  html: string,
  tag: string,
): {
  tagName: string;
  attrs: Record<string, string>;
  content?: string;
}[] => {
  const tags: {
    tagName: string;
    attrs: Record<string, string>;
    content?: string;
  }[] = [];
  const regex = new RegExp(`<${tag}([^>]*)>([^<]*)|<${tag}([^>]*)/>`, "g");
  let match;
  while ((match = regex.exec(html))) {
    tags.push({
      tagName: tag,
      attrs: parseTag(match[1]),
      content: match[2],
    });
  }
  return tags;
};

const extractTitle = (html: string) => {
  const [title] = getTags(html, "title");
  if (title) {
    return title.content;
  }
  const [metaTitle] = getTags(html, "meta").filter(
    (tag) => tag.attrs.name === "title" || tag.attrs.property === "og:title",
  );
  if (metaTitle) {
    return metaTitle.attrs.content;
  }
};

const extractFavicon = (html: string, url: string) => {
  // <link rel="icon" href="..."> or <link rel="shortcut icon" href="...">
  const [favicon] = getTags(html, "link").filter(
    (tag) => tag.attrs.rel === "icon" || tag.attrs.rel === "shortcut icon",
  );
  if (favicon) {
    return new URL(favicon.attrs.href, url).href;
  }
};

const extractImage = (html: string, url: string) => {
  // <meta property="og:image" content="...">
  const [metaImage] = getTags(html, "meta").filter(
    (tag) => tag.attrs.property === "og:image",
  );
  if (metaImage) {
    return new URL(metaImage.attrs.content, url).href;
  }
};

const normalizeUrl = (url: string) => {
  return url.replace(/\/$/, "");
};

interface LinkInfo {
  title: string;
  image?: string;
  favicon?: string;
}

const fetchLinkInfo = async (url: string) => {
  const res = await fetch(`https://monica-dev.com/proxy?url=${url}`, {
    headers: {
      "User-Agent": "monica-dev.com",
    },
  });
  if (!res.ok) {
    console.log(
      picocolors.red("[link-card]"),
      `failed to fetch ${url} with status ${res.status}`,
    );
    throw new Error("failed to fetch");
  } else {
    console.log(picocolors.blue("[link-card]"), `fetched ${url}`);
  }
  const html = await res.text();

  const title = extractTitle(html) || url;
  const favicon = extractFavicon(html, url);
  const image = extractImage(html, url);

  return {
    title,
    favicon,
    image,
  };
};

const plugin = function linkCardTrans(): Transformer {
  return async (tree) => {
    const fetchLinkMap = new Map<string, ((data: LinkInfo) => void)[]>();

    visit(tree, isBlockLink, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) {
        return;
      }

      // @ts-expect-error
      const child = node.children[0];

      if (!child.url.startsWith("http")) {
        return;
      }

      const url = normalizeUrl(child.url);

      const setData = (data: LinkInfo) => {
        child.data = {
          ...child.data,
          hProperties: {
            ...child.data?.hProperties,
            ["data-title"]: data.title,
            ["data-image"]: data.image,
            ["data-favicon"]: data.favicon,
          },
        };
      };

      if (fetchLinkMap.has(url)) {
        fetchLinkMap.get(url)?.push(setData);
      } else {
        fetchLinkMap.set(url, [setData]);
      }
    });

    let error = false;
    const fetchers = Array.from(fetchLinkMap.entries()).map(
      async ([url, dataSetters]) => {
        try {
          const data = await fetchLinkInfo(url);
          dataSetters.forEach((setter) => setter(data));
        } catch (e) {
          console.error(e);
          error = true;
        }
      },
    );

    await Promise.all(fetchers);

    if (error) {
      throw new Error("failed to build link card");
    }
  };
};

export default plugin;
