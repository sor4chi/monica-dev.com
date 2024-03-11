import type { Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const rehypeScrollableTable: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (!parent) return;
      if (!index) return;
      if (node.tagName !== "table") return;
      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: {
          className: ["scrollable-table"],
        },
        children: [node],
      };
    });
  };
};

export default rehypeScrollableTable;
