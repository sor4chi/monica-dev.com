/// <reference types="mdast-util-to-hast" />
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import { visit } from "unist-util-visit";

import {
	createRehypeHandlers,
	createRemarkPlugin,
	createRemarkRehypePlugin,
} from "../utils/remark-factory";

import type { BlockContent, DefinitionContent, Parent } from "mdast";

export interface Section extends Parent {
	type: "section";
	idx: number;
	children: Array<BlockContent | DefinitionContent>;
}

declare module "mdast" {
	interface BlockContentMap {
		section: Section;
	}
	interface RootContentMap {
		section: Section;
	}
}

const plugin = createRemarkPlugin(() => {
	return (tree) => {
		let sectionIdx = 0;
		visit(tree, (node, index, parent) => {
			if (node.type !== "containerDirective") return;
			if (node.name !== "section") return;
			if (index === undefined) return;

			const section: Section = {
				type: "section",
				idx: sectionIdx++,
				children: node.children,
			};

			parent?.children?.splice(index, 1, section);
		});
	};
});

const handlers = createRehypeHandlers({
	section: (state, node: Section) => {
		const hastElement = h(
			"div",
			{
				className: "markdown-section markdown-contents",
				style: {
					"animation-delay": `${node.idx * 0.2}s`,
				},
			},
			state.all(node),
		);
		return hastElement;
	},
});

export const remarkSection = createRemarkRehypePlugin(plugin, handlers);
