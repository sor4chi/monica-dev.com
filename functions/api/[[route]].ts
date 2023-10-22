import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";

const app = new Hono().basePath("/api");

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

const extractDescription = (html: string) => {
  // <meta name="description" content="..."> or <meta property="og:description" content="...">
  const [metaDescription] = getTags(html, "meta").filter(
    (tag) =>
      tag.attrs.name === "description" ||
      tag.attrs.property === "og:description",
  );
  if (metaDescription) {
    return metaDescription.attrs.content;
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

app.get("/embed-link", async (c) => {
  const query = new URL(c.req.url).searchParams;
  const url = query.get("url");
  if (!url) {
    return c.json(
      {
        message: "Missing url query parameter",
      },
      { status: 400 },
    );
  }

  // @ts-ignore CloudflareのCache APIとDOMのCache APIが型が違う
  const cache = caches.default;
  const cached = await cache.match(url);
  if (cached) {
    return c.json(await cached.json(), { status: 200 });
  }

  const response = await fetch(url);
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("text/html")) {
    return c.json(
      { message: "Not a HTML page" },
      {
        status: 400,
      },
    );
  }
  const html = await response.text();
  const title = extractTitle(html) || url;
  const description = extractDescription(html);
  const favicon = extractFavicon(html, url);
  const image = extractImage(html, url);

  const data = {
    title,
    description,
    favicon,
    image,
  };

  await cache.put(
    url,
    new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        // 30分キャッシュ (DDoSになる可能性があるので)
        "Cache-Control": `public, max-age=${60 * 30}`,
      },
    }),
  );

  return c.json(data, { status: 200 });
});

app.get("/ogp", async (c) => {
  const query = new URL(c.req.url).searchParams;
  const title = query.get("title");
  if (!title) {
    return c.json(
      {
        message: "Missing title query parameter",
      },
      { status: 400 },
    );
  }

  const res = await fetch(
    `https://res.cloudinary.com/dj8lujsue/image/upload/l_text:Sawarabi%20Gothic_72_bold:${title},co_rgb:fff,w_1000,c_fit/v1638148802/ogp.png`,
  );

  const newRes = new Response(res.body, res);
  for (const [key, value] of res.headers.entries()) {
    newRes.headers.set(key, value);
  }

  return newRes;
});

export const onRequest = handle(app);
