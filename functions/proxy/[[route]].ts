import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";

const app = new Hono().basePath("/proxy");

app.get("/", (c) => {
  const url = c.req.query("url");
  if (!url) {
    return c.text("url query is required", 400);
  }

  return fetch(url, c.req.raw);
});

export const onRequest = handle(app);
