import { LAYOUT_CONTAINER_SIDE_PADDING } from "@/components/layouts/Base.css";
import { sumOfRems } from "@/styles/utils";

export const CONTAINER_GAP = "1rem";
export const ASIDE_WIDTH = "15rem";
export const ARTICLE_WIDTH = "40rem";
export const CONTENTS_MAX = sumOfRems(
  LAYOUT_CONTAINER_SIDE_PADDING,
  ASIDE_WIDTH,
  CONTAINER_GAP,
  ARTICLE_WIDTH,
  CONTAINER_GAP,
  ASIDE_WIDTH,
  LAYOUT_CONTAINER_SIDE_PADDING
);
export const CONTENTS_WITH_TOC = sumOfRems(
  LAYOUT_CONTAINER_SIDE_PADDING,
  ASIDE_WIDTH,
  CONTAINER_GAP,
  ARTICLE_WIDTH,
  LAYOUT_CONTAINER_SIDE_PADDING
);
