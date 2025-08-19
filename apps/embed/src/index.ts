import { Hono } from "hono";

import { MetaParser } from "./meta";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

const FETCH_INIT: RequestInit = {
  redirect: "follow",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; MetaFetcher/1.0; +https://monica-dev.com)",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  },
};

app.get("/meta", async (c) => {
  const url = new URL(c.req.url);

  const paramUrl = url.searchParams.get("url");
  if (paramUrl === null) return c.body("Bad Request", 400);

  const decodedUrl = decodeURIComponent(paramUrl);

  const cache = await caches.open("meta");
  const cachedResponse = await cache.match(decodedUrl);
  if (cachedResponse) return cachedResponse;

  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET");
  c.header("Access-Control-Allow-Headers", "Content-Type");

  const siteRes = await fetch(decodedUrl, FETCH_INIT);
  if (!siteRes.ok) return c.body("Not Found", 404);

  const meta = new MetaParser();
  const res = new HTMLRewriter()
    .on("title", meta)
    .on("meta", meta)
    .on("link", meta)
    .transform(siteRes);

  await res.text();

  if (meta.imageUrl.startsWith("/")) {
    meta.imageUrl = new URL(meta.imageUrl, decodedUrl).toString();
  }
  if (meta.faviconUrl.startsWith("/")) {
    meta.faviconUrl = new URL(meta.faviconUrl, decodedUrl).toString();
  }

  const response = c.json(meta);

  c.executionCtx.waitUntil(cache.put(decodedUrl, response.clone()));

  return response;
});

export default app;
