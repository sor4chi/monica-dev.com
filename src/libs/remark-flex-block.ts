/// <reference types="mdast-util-directive" />
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

import type { Root } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";

const isFlexBlock = (node: any): node is ContainerDirective => {
  if (node.type !== "containerDirective") {
    return false;
  }

  if (node.name !== "flex") {
    return false;
  }

  return true;
};

const remarkFlexBlock: Plugin<[], Root> = () => {
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
};

export default remarkFlexBlock;
