import { Hono } from "hono";
import { cache } from "hono/cache";
import { MetaParser } from "./meta";

const app = new Hono();

app.get(
	"/meta",
	cache({
		cacheName: "meta",
		cacheControl: "public, max-age=3600",
	}),
	async (c) => {
		const url = new URL(c.req.url);

		const paramUrl = url.searchParams.get("url");
		if (paramUrl === null) return c.body("Bad Request", 400);

		const decodedUrl = decodeURIComponent(paramUrl);

		c.header("Access-Control-Allow-Origin", "*");
		c.header("Access-Control-Allow-Methods", "GET");
		c.header("Access-Control-Allow-Headers", "Content-Type");

		const siteRes = await fetch(decodedUrl);
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

		return c.json(meta);
	},
);

export default app;
