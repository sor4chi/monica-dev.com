import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

import type { Root } from "mdast";

const isBlockImage = (node: any) => {
  if (node.type !== "paragraph") {
    return false;
  }

  if (node.children.length !== 1) {
    return false;
  }

  const child = node.children[0];

  if (child.type !== "image") {
    return false;
  }

  return true;
};

const remarkBlockImage: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, isBlockImage, (node) => {
      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          className: ["block-image"],
        },
      };
    });
  };
};

export default remarkBlockImage;
