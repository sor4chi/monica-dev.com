import type { Element, ElementContent, Root } from "hast";
import { h } from "hastscript";
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
			for (const child of node.children) {
				if (child.type === "element") {
					if (
						child.children[0].type === "text" &&
						child.children[0].value.match(ANNOTATION_REGEX)
					) {
						const label = (child.children[0].value.match(ANNOTATION_REGEX) ??
							[])[1];
						const className = node.properties.className || [];
						node.properties.className = [
							"annotation-block",
							"markdown-contents",
						];
						if (typeof className === "object")
							node.properties.className.push(...className);
						if (typeof className === "string")
							node.properties.className.push(className);
						node.properties["data-annotation-type"] = child.children[0].value
							.slice(2, -1)
							.toLowerCase();
						child.children[0] = h(
							"span",
							{
								className: ["annotation-block__label"],
							},
							label,
						);
					}
				}
			}
		}
	});
};
