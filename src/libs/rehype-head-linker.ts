import { h } from "hastscript";
import type { Element } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const plugin: Plugin = () => (tree) => {
  visit(tree, "element", (node: Element) => {
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

export default plugin;
