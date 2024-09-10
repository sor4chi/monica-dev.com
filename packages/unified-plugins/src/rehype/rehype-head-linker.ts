import { h } from "hastscript";
import { visit } from "unist-util-visit";

import type { Root } from "hast";
import type { Plugin } from "unified";

export const rehypeHeadLinker: Plugin<[], Root> = () => (tree) => {
	visit(tree, "element", (node) => {
		if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
			const id = node.properties.id;
			node.children.unshift(
				h("a.anchor", {
					href: `#${id}`,
					ariaLabel: "Copy permalink to clipboard",
					title: "Copy permalink to clipboard",
				}),
			);
		}
	});
};
