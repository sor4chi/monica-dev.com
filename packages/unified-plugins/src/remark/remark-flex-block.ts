import { visit } from "unist-util-visit";

import { createRemarkPlugin } from "../utils/remark-factory";

import type { Node } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";

const isContainerDirective = (node: Node): node is ContainerDirective => {
  return node.type === "containerDirective";
};

const isFlexBlock = (node: Node) => {
  if (!isContainerDirective(node)) {
    return false;
  }

  if (node.name !== "flex") {
    return false;
  }

  return true;
};

export const remarkFlexBlock = createRemarkPlugin(() => {
  return (tree) => {
    visit(tree, isFlexBlock, (node) => {
      node.data = {
        hName: "div",
        hProperties: {
          className: ["flex-block"],
        },
      };
    });
  };
});
