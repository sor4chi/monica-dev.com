import { visit } from "unist-util-visit";

import type { Parent, Node } from "mdast";
import type { Transformer } from "unified";
import { createRemarkPlugin } from "../utils/remark-factory";

const isNode = (node: unknown): node is Node => {
  if (node === null || typeof node !== "object") {
    return false;
  }

  return "type" in node;
};

const isParent = (node: unknown): node is Parent => {
  return isNode(node) && Array.isArray((node as Parent).children);
};

const isBlockLink = (node: unknown, _index: unknown, parent: unknown) => {
  if (!isParent(node) || !isParent(parent)) {
    return false;
  }

  if (["footnoteDefinition", "listItem"].includes(parent.type)) {
    return false;
  }

  if (node.type !== "paragraph") {
    return false;
  }

  if (node.children.length !== 1) {
    return false;
  }

  const child = node.children[0];

  if (child.type !== "link") {
    return false;
  }

  return true;
};

export const remarkLinkCard = createRemarkPlugin(() => {
  return async (tree) => {
    const promises: Promise<void>[] = [];

    visit(tree, isBlockLink, (node, _index) => {
      // @ts-expect-error
      const child = node.children[0];

      if (!child.url.startsWith("http")) {
        return;
      }

      promises.push(
        fetch(`https://monica-dev.com/api/embed-link?url=${child.url}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              return;
            }

            child.data = {
              ...child.data,
              hProperties: {
                ...child.data?.hProperties,
                ["data-title"]: data.title,
                ["data-image"]: data.image,
                ["data-favicon"]: data.favicon,
              },
            };
          })
      );
    });

    await Promise.all(promises);
  };
});
