import { style } from "@vanilla-extract/css";
import { ARTICLE_WIDTH } from "./Article.css";
import { ASIDE_WIDTH } from "./Aside.css";

const CONTAINER_GAP = "1rem";

export const styles = {
  container: style({
    display: "flex",
    gap: CONTAINER_GAP,
    width: "100%",
    maxWidth: `calc(${ARTICLE_WIDTH} + ${ASIDE_WIDTH} * 2 + ${CONTAINER_GAP} * 2)`,
    margin: "0 auto",
  }),
};
