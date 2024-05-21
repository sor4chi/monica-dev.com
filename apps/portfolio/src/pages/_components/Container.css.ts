import { ARTICLE_WIDTH } from "@/styles/constants";
import { style } from "@vanilla-extract/css";

export const styles = {
  container: style({
    maxWidth: ARTICLE_WIDTH,
    width: "100%",
    margin: "3rem auto",
    boxSizing: "border-box",
  }),
};
