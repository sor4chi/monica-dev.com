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

const TimelineTitleRegex = /^\[([^\]]+)\](.*)$/;

export interface TimelineItem extends Parent {
  type: "timelineItem";
  time: string;
  title: Heading;
  children: Array<BlockContent | DefinitionContent>;
}

export interface Timeline extends Parent {
  type: "timeline";
  children: Array<TimelineItem>;
}

declare module "mdast" {
  interface BlockContentMap {
    timeline: Timeline;
  }
  interface RootContentMap {
    timeline: Timeline;
    timelineItem: TimelineItem;
  }
}

const remarkTimeline: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "timeline") return;
      if (index === undefined) return;

      const timeline: Timeline = {
        type: "timeline",
        children: [],
      };

      let currentTimelineItem: TimelineItem | undefined;
      for (const child of node.children) {
        if (child.type === "heading") {
          if (currentTimelineItem) {
            timeline.children.push(currentTimelineItem);
          }

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

          currentTimelineItem = {
            type: "timelineItem",
            time: match[1].trim(),
            title: child,
            children: [],
          };
        } else {
          currentTimelineItem?.children.push(child);
        }
      }
      if (currentTimelineItem) timeline.children.push(currentTimelineItem);

      parent?.children?.splice(index, 1, timeline);
    });
  };
};

export default remarkTimeline;

const isElement = (
  node: ElementContent | ElementContent[] | undefined,
): node is Element => {
  if (!node) return false;
  if (Array.isArray(node)) return false;
  return node.type === "element";
};

export const remarkTimelineHandler: Handler = (
  state,
  node: Timeline,
  parent,
) => {
  const hastElement = h(
    "div",
    { className: "timeline" },
    node.children.map((item) => {
      const titleEC = state.one(item.title, item);
      if (isElement(titleEC)) {
        titleEC.properties.className = "timeline-title";
        titleEC.properties["data-time"] = item.time;
      }
      return h("div", { className: "timeline-item markdown-contents" }, [
        titleEC,
        ...item.children.map((child) => state.one(child, item)),
      ]);
    }),
  );
  return hastElement;
};
