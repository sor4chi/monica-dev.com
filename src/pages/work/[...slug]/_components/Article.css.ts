import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { ARTICLE_WIDTH, BREAKPOINT_MOBILE } from "../../../../styles/constants";
import { focusInteraction } from "@/styles/common.css";

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
    border: `1px solid ${vars.color.gray[3]}`,
  }),
  header: style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: vars.spacing.absolute[4],
  }),
  title: style({
    fontSize: vars.font.size.xl,
  }),
  meta: style({
    display: "inline-flex",
    alignItems: "center",
    gap: vars.spacing.relative[4],
    margin: 0,
  }),
  date: style({
    fontSize: vars.font.size.sm,
    color: vars.color.gray[11],
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
