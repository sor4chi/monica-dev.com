import type { Element, Root } from "hast";
import { h } from "hastscript";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const unescapeHtml = (str: string) => {
	const MAP: Record<string, string> = {
		"&lt;": "<",
		"&#60;": "<",
		"&gt;": ">",
		"&#62;": ">",
		"&quot;": '"',
		"&#34;": '"',
		"&#44;": ",",
		"&#39;": "'",
		"&amp;": "&",
		"&#38;": "&",
		"&nbsp;": " ",
		"&#174;": " ®",
	};

	return str.replace(/&[^;]+;/g, (match) => MAP[match]);
};

export const rehypeLinkCard: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, "element", (node: Element, index, parent) => {
			if (!parent) return;
			if (index === undefined) return;
			if (node.tagName !== "a") return;

			let title = node.properties["data-title"] as string;
			const image = node.properties["data-image"] as string;
			const favicon = node.properties["data-favicon"] as string;
			const url = node.properties.href as string;

			if (!title || !url) {
				return;
			}

			title = unescapeHtml(title);

			const isInternal =
				url.startsWith("/") || url.startsWith("https://monica-dev.com");

			const card = h(
				"a.link-card",
				{
					href: url,
					...(isInternal
						? {}
						: { target: "_blank", rel: "noopener noreferrer" }),
				},
				[
					image &&
						h("img.link-card__image", {
							src: image,
							alt: title,
						}),
					h("span.link-card__content", [
						h("span.link-card__title", title),
						h(
							"span.link-card__meta",
							[
								favicon &&
									h("span.link-card__favicon", {
										style: {
											"background-image": `url(${favicon})`,
										},
									}),
								h("span.link-card__domain", new URL(url).hostname),
							].filter(Boolean),
						),
					]),
				].filter(Boolean),
			);

			parent.children[index] = card;
		});
	};
};
