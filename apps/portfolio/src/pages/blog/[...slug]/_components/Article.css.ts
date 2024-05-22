import { style } from "@vanilla-extract/css";
import { vars } from "design-system/theme.css";

import { ARTICLE_WIDTH, BREAKPOINT_MOBILE } from "@/styles/constants";

export const styles = {
  article: style({
    position: "relative",
    width: "100%",
    maxWidth: ARTICLE_WIDTH,
  }),
  heroImage: style({
    width: vars.spacing.full,
    height: "auto",
    aspectRatio: "1200 / 630",
    objectFit: "cover",
    borderRadius: vars.spacing.absolute[2],
    margin: `${vars.spacing.relative[4]} 0`,
  }),
  header: style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vars.spacing.absolute[8],
    gap: vars.spacing.absolute[4],
  }),
  title: style({
    fontSize: vars.font.size.xl,
  }),
  word: style({
    display: "inline-block",
  }),
  meta: style({
    display: "inline-flex",
    alignItems: "center",
    gap: vars.spacing.relative[2],
    color: vars.color.gray[10],
  }),
  date: style({
    fontSize: vars.font.size.sm,
  }),
  backLink: style({
    display: "none",
    height: "2.5rem",
    marginBottom: vars.spacing.absolute[2],

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "inline-flex",
        alignItems: "center",
      },
    },
  }),
};
