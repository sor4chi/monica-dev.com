import type { Element, ElementContent } from "hast";
import type { Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const findMatchedChildren = (node: Element, match: RegExp) => {
	const findTextDeep = (
		node: ElementContent,
		match: RegExp,
	): (string | null)[] | string | null => {
		if ("children" in node) {
			return node.children.flatMap((child) => findTextDeep(child, match));
		}
		if ("value" in node) {
			return match.test(node.value) ? node.value : null;
		}
		return null;
	};

	return node.children
		.flatMap((child) => findTextDeep(child, match))
		.filter((value) => value !== null);
};

const ANNOTATION_REGEX = /\[!(WARNING|IMPORTANT|NOTE)\]/;

export const rehypeAnnotationBlock: Plugin<[], Root> = () => (tree) => {
	visit(tree, "element", (node) => {
		if (["blockquote"].includes(node.tagName)) {
			const [matches] = findMatchedChildren(node, ANNOTATION_REGEX);
			if (matches) {
				const className = node.properties.className || [];
				node.properties.className = ["annotation-block"];
				if (typeof className === "object")
					node.properties.className.push(...className);
				if (typeof className === "string")
					node.properties.className.push(className);
				node.properties["data-annotation-type"] = matches
					.slice(2, -1)
					.toLowerCase();
			}
		}
	});
};
