import { visit } from "unist-util-visit";

import type { Parent } from "mdast";
import type { Transformer } from "unified";

const isParent = (node: unknown): node is Parent => {
  return node !== undefined;
};

const isBlockLink = (node: unknown, _index: unknown, parent: unknown) => {
  if (!isParent(node)) {
    return false;
  }

  if (node.type !== "paragraph") {
    return false;
  }

  if ((parent as Parent).type === "listItem") {
    return;
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

const plugin = function linkCardTrans(): Transformer {
  return async (tree) => {
    const promises: Promise<void>[] = [];

    visit(tree, isBlockLink, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) {
        return;
      }

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
                className: [
                  "link-card",
                  ...(child.data?.hProperties?.className ?? []),
                ],
                ["data-title"]: data.title,
                ["data-image"]: data.image,
                ["data-favicon"]: data.favicon,
              },
            };
          }),
      );
    });

    await Promise.all(promises);
  };
};

export default plugin;
