/// <reference types="mdast-util-to-hast" />
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import { visit } from "unist-util-visit";

import {
	createRehypeHandlers,
	createRemarkPlugin,
	createRemarkRehypePlugin,
} from "../utils/remark-factory";

import type { Parent, Root } from "mdast";

export interface Youtube extends Parent {
	type: "youtube";
	id: string;
}

declare module "mdast" {
	interface BlockContentMap {
		youtube: Youtube;
	}
	interface RootContentMap {
		youtube: Youtube;
	}
}

const plugin = createRemarkPlugin(() => {
	return (tree: Root) => {
		visit(tree, (node, index, parent) => {
			if (node.type !== "leafDirective") return;
			if (node.name !== "youtube") return;
			if (index === undefined) return;
			if (!node.children.length) return;
			if (node.children[0].type !== "text") return;
			const text = node.children[0].value;

			const youtube: Youtube = {
				type: "youtube",
				id: text,
				children: [],
			};

			parent?.children?.splice(index, 1, youtube);
		});
	};
});

const handlers = createRehypeHandlers({
	youtube: (_, node: Youtube) => {
		const hastElement = h(
			"iframe",
			{
				width: "800",
				height: "450",
				src: `https://www.youtube.com/embed/${node.id}`,
				title: "YouTube video player",
				frameborder: "0",
				allow:
					"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
				allowfullscreen: true,
				style: {
					display: "block",
					width: "100%",
					"aspect-ratio": "16/9",
					height: "auto",
				},
			},
			[],
		);
		return hastElement;
	},
});

export const remarkEmbed = createRemarkRehypePlugin(plugin, handlers);
