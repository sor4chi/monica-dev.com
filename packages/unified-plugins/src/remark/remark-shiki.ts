import {
	transformerNotationDiff,
	transformerNotationHighlight,
	transformerRemoveNotationEscape,
} from "@shikijs/transformers";
import type { Node } from "mdast";
import { bundledLanguages, createHighlighter } from "shiki";
import { visit } from "unist-util-visit";

import { createRemarkPlugin } from "../utils/remark-factory";

export interface ShikiCodeBlock extends Node {
	type: "shikiCodeBlock";
	html: string;
}

declare module "mdast" {
	interface BlockContentMap {
		shikiCodeBlock: ShikiCodeBlock;
	}
	interface RootContentMap {
		shikiCodeBlock: ShikiCodeBlock;
	}
}

const highlighter = await createHighlighter({
	themes: ["one-dark-pro", "one-light"],
	langs: Object.keys(bundledLanguages),
});

export const remarkShiki = createRemarkPlugin(() => {
	return async (tree) => {
		visit(tree, (node, index, parent) => {
			if (parent == null || index == null) return;
			if (node.type !== "code") return;

			const html = highlighter.codeToHtml(node.value, {
				lang: node.lang || "plaintext",
				themes: {
					light: "one-light",
					dark: "one-dark-pro",
				},
				transformers: [
					transformerNotationDiff(),
					transformerNotationHighlight(),
					transformerRemoveNotationEscape(),
				],
			});

			const newNode: ShikiCodeBlock = {
				type: "shikiCodeBlock",
				html,
			};

			parent.children.splice(index, 1, newNode);
		});
	};
});
