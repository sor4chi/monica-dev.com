import { slideIn } from "@/styles/animation.css";
import { focusInteraction } from "@/styles/common.css";
import { BREAKPOINT_MOBILE } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
  container: style({
    width: "100%",
    maxWidth: "64rem",
    margin: `${vars.spacing.absolute[12]} auto`,
    display: "grid",
    gap: vars.spacing.absolute[8],
    gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
  }),
  item: style([
    focusInteraction,
    {
      opacity: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: vars.spacing.absolute[4],
      textDecoration: "none",
      borderRadius: vars.spacing.absolute[2],
      animation: `${slideIn} 0.5s ease-out forwards`,
      transition: "filter 0.3s ease",
    },
  ]),
  thumbnail: style({
    width: "100%",
    height: "auto",
    aspectRatio: "1200 / 630",
    objectFit: "cover",
    borderRadius: vars.spacing.absolute[2],
    flexShrink: 0,
  }),
  content: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.absolute[2],
    padding: `0 ${vars.spacing.absolute[2]}`,
  }),
  header: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  title: style({
    color: vars.color.gray[12],
    fontSize: vars.font.size.lg,
    fontWeight: vars.font.weight.bold,
  }),
  description: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }),
};

globalStyle(`${styles.item}:hover`, {
  "@media": {
    "(hover: hover)": {
      filter: "brightness(0.8)",
    },
  },
});
