import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const ARTICLE_WIDTH = "40rem";

export const styles = {
  article: style({
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
    gap: vars.spacing.relative[4],
    fontSize: vars.font.size.sm,
    margin: `${vars.spacing.relative[2]} 0`,
    color: vars.color.gray[11],
  }),
};
