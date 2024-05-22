import { style } from "@vanilla-extract/css";

import { ARTICLE_WIDTH } from "@/styles/constants";

export const styles = {
  container: style({
    maxWidth: ARTICLE_WIDTH,
    width: "100%",
    margin: "3rem auto",
    boxSizing: "border-box",
  }),
};
