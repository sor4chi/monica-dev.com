/// <reference types="mdast-util-to-hast" />
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const TimelineTitleRegex = /^\[([^\]]+)\](.*)$/;

const remarkTimeline: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "timeline") return;

      const data = node.data || (node.data = {});
      const tagName = "div";

      data.hName = tagName;
      data.hProperties = h(tagName, node.attributes || {}).properties;
      data.hProperties.className = ["timeline"];

      let currentChild;
      const children = [];
      for (const child of node.children) {
        if (child.type === "heading") {
          const titleNode = child.children[0];
          if (titleNode.type !== "text") {
            throw new Error(
              `Invalid timeline title: ${child.position?.start.line}`,
            );
          }
          const match = TimelineTitleRegex.exec(titleNode.value);
          if (!match) {
            throw new Error(
              `Invalid timeline title: ${titleNode.value} at ${child.position?.start.line}`,
            );
          }
          titleNode.value = match[2].trim();
          child.data = {
            ...child.data,
            hProperties: {
              ...child.data?.hProperties,
              className: ["timeline-title"],
              "data-time": match[1].trim(),
            },
          };
          if (currentChild && currentChild.children.length > 0)
            children.push(currentChild);
          currentChild = {
            type: "paragraph",
            children: [],
            data: {
              hName: "div",
              hProperties: {
                className: ["timeline-item", "markdown-contents"],
              },
            },
          } as any;
        }
        currentChild!.children.push(child);
      }
      children.push(currentChild);

      node.children = children;
    });
  };
};

export default remarkTimeline;
