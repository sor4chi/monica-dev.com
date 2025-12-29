import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { vi } from "vitest";

import { remarkTwitter } from "./remark-twitter";

const mockTweetData = {
	code: 200,
	message: "OK",
	tweet: {
		id: "1234567890",
		url: "https://twitter.com/testuser/status/1234567890",
		text: "Hello, World!",
		created_at: "2024-01-15T12:00:00.000Z",
		created_timestamp: 1705320000,
		author: {
			id: "123456",
			name: "Test User",
			screen_name: "testuser",
			avatar_url: "https://pbs.twimg.com/profile_images/test.jpg",
		},
		replies: 10,
		retweets: 20,
		likes: 100,
	},
};

vi.stubGlobal(
	"fetch",
	vi.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(mockTweetData),
		}),
	),
);

const mdProcessor = unified()
	.use(remarkParse)
	.use(remarkTwitter)
	.use(remarkRehype, {
		handlers: remarkTwitter.handlers,
	})
	.use(rehypeStringify);

describe("remarkTwitter", () => {
	it("should convert Twitter URL to embed", async () => {
		// Use autolink syntax <URL> for Markdown link
		const input = `<https://twitter.com/testuser/status/1234567890>`;

		const result = await mdProcessor
			.process(input)
			.then((file) => file.toString());

		expect(result).toContain('class="twitter-embed"');
		expect(result).toContain('href="https://twitter.com/testuser/status/1234567890"');
		expect(result).toContain("Hello, World!");
		expect(result).toContain("Test User");
		expect(result).toContain("@testuser");
	});

	it("should convert X.com URL to embed", async () => {
		const input = `<https://x.com/testuser/status/1234567890>`;

		const result = await mdProcessor
			.process(input)
			.then((file) => file.toString());

		expect(result).toContain('class="twitter-embed"');
	});

	it("should not convert Twitter URLs in list items", async () => {
		const input = `- <https://twitter.com/testuser/status/1234567890>`;

		const result = await mdProcessor
			.process(input)
			.then((file) => file.toString());

		expect(result).not.toContain('class="twitter-embed"');
		expect(result).toContain("<li>");
	});

	it("should not convert non-Twitter URLs", async () => {
		const input = `<https://example.com>`;

		const result = await mdProcessor
			.process(input)
			.then((file) => file.toString());

		expect(result).not.toContain('class="twitter-embed"');
	});

	it("should handle inline Twitter URLs (not convert)", async () => {
		const input = `Check out this tweet: <https://twitter.com/testuser/status/1234567890>`;

		const result = await mdProcessor
			.process(input)
			.then((file) => file.toString());

		// Should not be converted because it's not a standalone link
		expect(result).not.toContain('class="twitter-embed"');
	});
});
