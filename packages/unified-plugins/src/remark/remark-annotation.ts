import { visit } from "unist-util-visit";

import { createRemarkPlugin } from "../utils/remark-factory";

import type { Parent } from "mdast";

const ANNOTATION_TYPES = [
	"WARNING",
	"IMPORTANT",
	"NOTE",
	"TIP",
	"CAUTION",
] as const;

export interface Annotation extends Parent {
	type: "annotation";
	annotationType: (typeof ANNOTATION_TYPES)[number];
}

declare module "mdast" {
	interface BlockContentMap {
		annotation: Annotation;
	}
	interface RootContentMap {
		annotation: Annotation;
	}
}

export const remarkAnnotation = createRemarkPlugin(() => {
	return async (tree) => {
		visit(tree, (node, index, parent) => {
			if (index === undefined || parent === undefined) return;
			if (node.type !== "blockquote") return;
			if (node.children.length === 0) return;
			const child = node.children[0];
			if (child.type !== "paragraph") return;
			if (child.children.length === 0) return;
			const text = child.children[0];
			if (text.type !== "text") return;
			const annotationType = ANNOTATION_TYPES.find((type) =>
				text.value.startsWith(`[!${type}]`),
			);
			if (!annotationType) return;

			const trimmedValue = text.value.slice(4 + annotationType.length).trim();

			const children = node.children.slice(1);
			if (trimmedValue) {
				children.unshift({
					type: "paragraph",
					children: [{ type: "text", value: trimmedValue }],
				});
			}

			const newNode: Annotation = {
				type: "annotation",
				annotationType: annotationType,
				children,
			};

			parent.children.splice(index, 1, newNode);
		});
	};
});
