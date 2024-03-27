import { sumOfRems } from "@/styles/utils";

export const CONTAINER_GAP = "1.5rem";
export const ASIDE_WIDTH = "15rem";
export const ARTICLE_WIDTH = "50rem";
export const LAYOUT_CONTAINER_SIDE_PADDING = "1rem";
export const NAVIGATION_AREA_WIDTH = "20rem";

export const BREAKPOINT_TABLET = sumOfRems(
  LAYOUT_CONTAINER_SIDE_PADDING,
  ASIDE_WIDTH,
  CONTAINER_GAP,
  ARTICLE_WIDTH,
  CONTAINER_GAP,
  ASIDE_WIDTH,
  LAYOUT_CONTAINER_SIDE_PADDING,
);

export const BREAKPOINT_MOBILE = sumOfRems(
  LAYOUT_CONTAINER_SIDE_PADDING,
  ASIDE_WIDTH,
  CONTAINER_GAP,
  ARTICLE_WIDTH,
  LAYOUT_CONTAINER_SIDE_PADDING,
);
