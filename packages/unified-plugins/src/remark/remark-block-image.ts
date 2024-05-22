import { visit } from "unist-util-visit";

import { createRemarkPlugin } from "../utils/remark-factory";

import type { Node, Paragraph } from "mdast";

const isParagraph = (node: Node): node is Paragraph => {
  return node.type === "paragraph";
};

const isBlockImage = (node: Node) => {
  if (!isParagraph(node)) {
    return false;
  }

  if (node.children.length !== 1) {
    return false;
  }

  const child = node.children[0];

  if (child.type !== "image") {
    return false;
  }

  return true;
};

export const remarkBlockImage = createRemarkPlugin(() => {
  return (tree) => {
    visit(tree, isBlockImage, (node) => {
      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          className: ["block-image"],
        },
      };
    });
  };
});
