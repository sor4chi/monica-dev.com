import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { ARTICLE_WIDTH, CONTENTS_WITH_TOC } from "../../../../styles/constants";

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
  title: style({
    fontSize: vars.font.size.xl,
  }),
  meta: style({
    display: "inline-flex",
    alignItems: "center",
    gap: vars.spacing.relative[2],
    marginBottom: vars.spacing.absolute[4],
    color: vars.color.gray[11],
  }),
  date: style({
    fontSize: vars.font.size.sm,
  }),
  backLink: style({
    display: "none",
    height: "2.5rem",
    marginBottom: vars.spacing.absolute[2],

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        display: "inline-flex",
        alignItems: "center",
      },
    },
  }),
};
