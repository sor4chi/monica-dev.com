import { h } from "hastscript";
import { visit } from "unist-util-visit";

import {
	createRehypeHandlers,
	createRemarkPlugin,
	createRemarkRehypePlugin,
} from "../utils/remark-factory";

import type { Link, Node, Parent, PhrasingContent, LinkData } from "mdast";

const isNode = (node: unknown): node is Node => {
	if (node === null || typeof node !== "object") {
		return false;
	}
	return "type" in node;
};

const isParent = (node: unknown): node is Parent => {
	return isNode(node) && Array.isArray((node as Parent).children);
};

const TWITTER_URL_REGEX =
	/^https?:\/\/(?:(?:www\.)?(?:twitter\.com|x\.com))\/([^/]+)\/status\/(\d+)/;

const extractTweetId = (url: string): string | null => {
	const match = url.match(TWITTER_URL_REGEX);
	return match ? match[2] : null;
};

interface FxTwitterResponse {
	code: number;
	message: string;
	tweet?: {
		url: string;
		id: string;
		text: string;
		created_at: string;
		created_timestamp: number;
		author: {
			id: string;
			name: string;
			screen_name: string;
			avatar_url: string;
		};
		replies: number;
		retweets: number;
		likes: number;
		media?: {
			photos?: Array<{
				url: string;
				width: number;
				height: number;
			}>;
			videos?: Array<{
				url: string;
				thumbnail_url: string;
				width: number;
				height: number;
			}>;
		};
	};
}

export interface TwitterEmbed extends Parent {
	type: "twitterEmbed";
	tweetId: string;
	tweetUrl: string;
	text: string;
	authorName: string;
	authorScreenName: string;
	authorAvatarUrl: string;
	createdAt: string;
	likes: number;
	retweets: number;
	replies: number;
	photos: Array<{ url: string; width: number; height: number }>;
	videos: Array<{
		url: string;
		thumbnailUrl: string;
		width: number;
		height: number;
	}>;
	children: PhrasingContent[];
	data?: LinkData | undefined;
}

declare module "mdast" {
	interface BlockContentMap {
		twitterEmbed: TwitterEmbed;
	}
	interface RootContentMap {
		twitterEmbed: TwitterEmbed;
	}
}

const fetchTweetData = async (
	tweetId: string,
): Promise<FxTwitterResponse | null> => {
	try {
		const response = await fetch(
			`https://api.fxtwitter.com/status/${tweetId}`,
		);
		if (!response.ok) return null;
		return (await response.json()) as FxTwitterResponse;
	} catch {
		return null;
	}
};

const plugin = createRemarkPlugin(() => {
	return async (tree) => {
		const twitterLinks: Array<{
			node: Link;
			index: number;
			parent: Parent;
			tweetId: string;
		}> = [];

		visit(tree, (node, index, parent) => {
			if (index === undefined) return;
			if (!isNode(node) || !isParent(parent)) return;
			if (["footnoteDefinition", "listItem"].includes(parent.type)) return;
			if (node.type !== "paragraph") return;
			if (node.children.length !== 1) return;

			const child = node.children[0];
			if (child.type !== "link") return;

			const tweetId = extractTweetId(child.url);
			if (!tweetId) return;

			twitterLinks.push({ node: child, index, parent, tweetId });
		});

		const tweetDataMap = new Map<string, FxTwitterResponse>();
		await Promise.all(
			twitterLinks.map(async ({ tweetId }) => {
				if (!tweetDataMap.has(tweetId)) {
					const data = await fetchTweetData(tweetId);
					if (data) {
						tweetDataMap.set(tweetId, data);
					}
				}
			}),
		);

		for (const { node, index, parent, tweetId } of twitterLinks) {
			const tweetData = tweetDataMap.get(tweetId);
			if (!tweetData?.tweet) continue;

			const tweet = tweetData.tweet;

			const newNode: TwitterEmbed = {
				type: "twitterEmbed",
				tweetId: tweet.id,
				tweetUrl: tweet.url,
				text: tweet.text,
				authorName: tweet.author.name,
				authorScreenName: tweet.author.screen_name,
				authorAvatarUrl: tweet.author.avatar_url,
				createdAt: tweet.created_at,
				likes: tweet.likes,
				retweets: tweet.retweets,
				replies: tweet.replies,
				photos:
					tweet.media?.photos?.map((p) => ({
						url: p.url,
						width: p.width,
						height: p.height,
					})) ?? [],
				videos:
					tweet.media?.videos?.map((v) => ({
						url: v.url,
						thumbnailUrl: v.thumbnail_url,
						width: v.width,
						height: v.height,
					})) ?? [],
				children: node.children,
			};

			parent.children.splice(index, 1, newNode);
		}
	};
});

const formatNumber = (num: number): string => {
	if (num >= 1000000) {
		return `${(num / 1000000).toFixed(1)}M`;
	}
	if (num >= 1000) {
		return `${(num / 1000).toFixed(1)}K`;
	}
	return num.toString();
};

const formatDate = (dateStr: string): string => {
	const date = new Date(dateStr);
	return date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

type TextNode = { type: "text"; value: string };
type LinkNode = ReturnType<typeof h>;
type ParsedNode = TextNode | LinkNode;

const isSafeUrl = (url: string): boolean => {
	try {
		const parsed = new URL(url);
		return parsed.protocol === "http:" || parsed.protocol === "https:";
	} catch {
		return false;
	}
};

// Only allow alphanumeric and underscore for usernames/hashtags
const isSafeIdentifier = (str: string): boolean => {
	return /^[a-zA-Z0-9_]+$/.test(str);
};

const parseTwitterText = (text: string): ParsedNode[] => {
	const result: ParsedNode[] = [];
	// Match URLs, @mentions, and #hashtags
	const pattern = /(https?:\/\/[^\s]+)|(@[a-zA-Z0-9_]+)|(#[a-zA-Z0-9_\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+)/g;
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = pattern.exec(text)) !== null) {
		// Add text before match
		if (match.index > lastIndex) {
			result.push({ type: "text", value: text.slice(lastIndex, match.index) });
		}

		const [matched, url, mention, hashtag] = match;

		if (url && isSafeUrl(url)) {
			result.push(
				h(
					"a.twitter-embed__link",
					{
						href: url,
						target: "_blank",
						rel: "noopener noreferrer",
					},
					url.length > 30 ? `${url.slice(0, 30)}...` : url,
				),
			);
		} else if (mention) {
			const username = mention.slice(1);
			if (isSafeIdentifier(username)) {
				result.push(
					h(
						"a.twitter-embed__mention",
						{
							href: `https://twitter.com/${encodeURIComponent(username)}`,
							target: "_blank",
							rel: "noopener noreferrer",
						},
						mention,
					),
				);
			} else {
				result.push({ type: "text", value: mention });
			}
		} else if (hashtag) {
			const tag = hashtag.slice(1);
			result.push(
				h(
					"a.twitter-embed__hashtag",
					{
						href: `https://twitter.com/hashtag/${encodeURIComponent(tag)}`,
						target: "_blank",
						rel: "noopener noreferrer",
					},
					hashtag,
				),
			);
		} else {
			// Invalid URL, treat as text
			result.push({ type: "text", value: matched });
		}

		lastIndex = match.index + matched.length;
	}

	// Add remaining text
	if (lastIndex < text.length) {
		result.push({ type: "text", value: text.slice(lastIndex) });
	}

	return result;
};

const handlers = createRehypeHandlers({
	twitterEmbed: (_, node: TwitterEmbed) => {
		const mediaElements = [];

		if (node.photos.length > 0) {
			const photoElements = node.photos.map((photo) =>
				h("img.twitter-embed__photo", {
					src: photo.url,
					alt: "Tweet image",
					loading: "lazy",
				}),
			);
			mediaElements.push(
				h(
					".twitter-embed__media",
					{ "data-count": node.photos.length },
					photoElements,
				),
			);
		}

		if (node.videos.length > 0) {
			const videoElements = node.videos.map((video) =>
				h(
					"video.twitter-embed__video",
					{
						src: video.url,
						poster: video.thumbnailUrl,
						controls: true,
						preload: "metadata",
					},
					[],
				),
			);
			mediaElements.push(h(".twitter-embed__media", videoElements));
		}

		const hastElement = h(".twitter-embed", [
			h(
				"a.twitter-embed__header",
				{
					href: node.tweetUrl,
					target: "_blank",
					rel: "noopener noreferrer",
				},
				[
					h("img.twitter-embed__avatar", {
						src: node.authorAvatarUrl,
						alt: node.authorName,
						loading: "lazy",
					}),
					h(".twitter-embed__author", [
						h("span.twitter-embed__name", node.authorName),
						h("span.twitter-embed__screen-name", `@${node.authorScreenName}`),
					]),
					h(".twitter-embed__logo", [
						h(
							"svg",
							{
								viewBox: "0 0 24 24",
								width: "20",
								height: "20",
								fill: "currentColor",
							},
							[
								h("path", {
									d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
								}),
							],
						),
					]),
				],
			),
				h(".twitter-embed__content", [
					h("p.twitter-embed__text", parseTwitterText(node.text)),
				]),
				...mediaElements,
				h(".twitter-embed__footer", [
					h("span.twitter-embed__date", formatDate(node.createdAt)),
					h(".twitter-embed__stats", [
						h("span.twitter-embed__stat", [
							h(
								"svg",
								{
									viewBox: "0 0 24 24",
									width: "16",
									height: "16",
									fill: "currentColor",
								},
								[
									h("path", {
										d: "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z",
									}),
								],
							),
							formatNumber(node.replies),
						]),
						h("span.twitter-embed__stat", [
							h(
								"svg",
								{
									viewBox: "0 0 24 24",
									width: "16",
									height: "16",
									fill: "currentColor",
								},
								[
									h("path", {
										d: "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
									}),
								],
							),
							formatNumber(node.retweets),
						]),
						h("span.twitter-embed__stat", [
							h(
								"svg",
								{
									viewBox: "0 0 24 24",
									width: "16",
									height: "16",
									fill: "currentColor",
								},
								[
									h("path", {
										d: "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z",
									}),
								],
							),
							formatNumber(node.likes),
						]),
					]),
				]),
			],
		);
		return hastElement;
	},
});

export const remarkTwitter = createRemarkRehypePlugin(plugin, handlers);
