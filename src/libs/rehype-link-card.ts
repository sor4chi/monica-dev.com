import { h } from "hastscript";
import type { Element } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const unescape = (str: string) => {
  const MAP: Record<string, string> = {
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&quot;": '"',
    "&#34;": '"',
    "&#44;": ",",
    "&#39;": "'",
    "&amp;": "&",
    "&#38;": "&",
    "&nbsp;": " ",
    "&#174;": " ®",
  };

  return str.replace(/&[^;]+;/g, (match) => MAP[match]);
};

const plugin: Plugin = () => (tree) => {
  visit(tree, "element", (node: Element, index, parent) => {
    if (node.tagName === "a") {
      let title = node.properties["data-title"] as string;
      const image = node.properties["data-image"] as string;
      const favicon = node.properties["data-favicon"] as string;
      const url = node.properties.href as string;

      if (!title || !url) {
        return;
      }

      title = unescape(title);

      const isInternal =
        url.startsWith("/") || url.startsWith("https://monica-dev.com");

      const card = h(
        "a.link-card",
        {
          href: url,
          ...(isInternal
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" }),
        },
        [
          image &&
            h("img.link-card__image", {
              src: image,
              alt: title,
            }),
          h("span.link-card__content", [
            h("span.link-card__title", title),
            h(
              "span.link-card__meta",
              [
                favicon &&
                  h("span.link-card__favicon", {
                    style: {
                      "background-image": `url(${favicon})`,
                    },
                  }),
                h("span.link-card__domain", new URL(url).hostname),
              ].filter(Boolean),
            ),
          ]),
        ].filter(Boolean),
      );

      // @ts-expect-error
      parent.children[index] = card;
    }
  });
};

export default plugin;
