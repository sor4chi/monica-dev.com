import type {
  Literal,
  Paragraph,
  Parent,
  PhrasingContent,
  Root,
  Text,
} from "mdast";
import { visit } from "unist-util-visit";
import {
  createRemarkPlugin,
  createRemarkRehypePlugin,
} from "../utils/remark-factory";

const isParent = (node: unknown): node is Parent => {
  return typeof node === "object" && node !== null && "children" in node;
};

const isParagraph = (node: unknown): node is Paragraph => {
  return isParent(node) && node.type === "paragraph";
};

const isLiteral = (node: unknown): node is Literal => {
  return typeof node === "object" && node !== null && "value" in node;
};

const isText = (node: unknown): node is Text => {
  return isLiteral(node) && node.type === "text";
};

const mentionRegex = /^([a-zA-Z0-9-_]+)@([a-zA-Z0-9-_]+)$/;

interface RemarkMentionOptions {
  links: Record<string, (username: string) => string>;
}

export const remarkMention = createRemarkPlugin(
  (
    options: RemarkMentionOptions = {
      links: {
        github: (u) => `https://github.com/${u}`,
        g: (u) => `https://github.com/${u}`,
        twitter: (u) => `https://twitter.com/${u}`,
        t: (u) => `https://twitter.com/${u}`,
      },
    }
  ) => {
    return (tree: Root) => {
      visit(tree, isParagraph, (node, index, parent) => {
        if (index === undefined) return;
        const { children } = node;
        const newChildren: PhrasingContent[] = [];

        for (const child of children) {
          if (isText(child)) {
            const chunks = child.value.split(" ");

            const tmpChildren: PhrasingContent[] = [];
            for (const chunk of chunks) {
              const match = mentionRegex.exec(chunk);
              if (match) {
                const [, provider, username] = match;
                if (!options.links[provider]) {
                  tmpChildren.push({ type: "text", value: chunk });
                  continue;
                }
                const pureChunk = chunk.replace(/.*@/, "@");
                const link = options.links[provider]?.(username);
                tmpChildren.push({
                  type: "link",
                  url: link,
                  children: [{ type: "text", value: pureChunk }],
                });
              } else {
                tmpChildren.push({ type: "text", value: `${chunk} ` });
              }
            }
            if (tmpChildren.length > 0) {
              const last = tmpChildren[tmpChildren.length - 1];
              if (isText(last) && last.value.endsWith(" ")) {
                last.value = last.value.slice(0, -1);
              }
            }
            newChildren.push(...tmpChildren);
          } else {
            newChildren.push(child);
          }
        }

        parent?.children?.splice(index, 1, { ...node, children: newChildren });
      });
    };
  }
);
