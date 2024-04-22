/// <reference types="mdast-util-to-hast" />
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import type {
  BlockContent,
  DefinitionContent,
  Heading,
  Parent,
  Root,
} from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Handler } from "mdast-util-to-hast";
import type { ElementContent, Element } from "hast";

export interface Section extends Parent {
  type: "section";
  id?: string;
  children: Array<BlockContent | DefinitionContent>;
}

declare module "mdast" {
  interface BlockContentMap {
    section: Section;
  }
  interface RootContentMap {
    section: Section;
  }
}

const remarkSection: Plugin<[], Root> = () => {
  return (tree: Root) => {
    let sectionId = 0;
    visit(tree, (node, index, parent) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "section") return;
      if (index === undefined) return;

      const section: Section = {
        type: "section",
        id: `${sectionId++}`,
        children: [],
      };

      for (const child of node.children) {
        section.children.push(child);
      }

      parent?.children?.splice(index, 1, section);
    });
  };
};

export default remarkSection;

export const remarkSectionHandler: Handler = (state, node: Section, parent) => {
  const hastElement = h(
    "div",
    {
      className: "markdown-section markdown-contents",
      style: {
        "animation-delay": `${parseInt(node.id || "0") * 0.2}s`,
      },
    },
    state.all(node),
  );
  return hastElement;
};
