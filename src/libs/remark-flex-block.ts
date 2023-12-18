/// <reference types="mdast-util-directive" />
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

import type { Root } from "mdast";

const remarkFlexBlock: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" && node.name === "flex") {
        node.data = {
          hName: "div",
          hProperties: {
            className: ["flex-block"],
          },
        };
      }
    });
  };
};

export default remarkFlexBlock;
