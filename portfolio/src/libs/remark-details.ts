/// <reference types="mdast-util-to-hast" />
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import type {
  BlockContent,
  DefinitionContent,
  Paragraph,
  Parent,
  Root,
} from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Handler } from "mdast-util-to-hast";

export interface Details extends Parent {
  type: "details";
  summary: Paragraph;
  children: Array<BlockContent | DefinitionContent>;
}

declare module "mdast" {
  interface BlockContentMap {
    details: Details;
  }
  interface RootContentMap {
    details: Details;
  }
}

const isParagraph = (
  node: BlockContent | DefinitionContent,
): node is Paragraph => node.type === "paragraph";

const remarkDetails: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "details") return;
      if (index === undefined) return;
      if (node.children.length === 0) return;
      if (!node.children[0].data) return;
      if (!("directiveLabel" in node.children[0].data)) return;
      if (!isParagraph(node.children[0])) return;

      const details: Details = {
        type: "details",
        summary: node.children[0],
        children: [],
      };

      node.children.shift();

      for (const child of node.children) {
        details.children.push(child);
      }

      parent?.children?.splice(index, 1, details);
    });
  };
};

export default remarkDetails;

export const remarkDetailsHandler: Handler = (state, node: Details, parent) => {
  const hastElement = h(
    "details",
    h("summary", state.all(node.summary)),
    h(
      "div",
      {
        className: "details-contents markdown-contents",
      },
      state.all(node),
    ),
  );
  return hastElement;
};
