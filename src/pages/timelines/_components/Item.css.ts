import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

const ICON_SIZE = "3rem";
const DOT_SIZE = "0.5rem";

export const styles = {
  iconCol: style({
    width: ICON_SIZE,
    verticalAlign: "top",
  }),
  icon: style({
    width: ICON_SIZE,
    height: ICON_SIZE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
    borderRadius: vars.spacing.full,
  }),
  dot: style({
    display: "block",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: vars.spacing.full,
    backgroundColor: vars.color.gray[8],
  }),
  item: style({
    width: "100%",
  }),
  dateCol: style({
    width: ICON_SIZE,
    verticalAlign: "top",
    textAlign: "right",
  }),
  date: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
    whiteSpace: "nowrap",
    lineHeight: ICON_SIZE,
  }),
  title: style({
    color: vars.color.gray[12],
    fontSize: vars.font.size.lg,
    lineHeight: ICON_SIZE,
  }),
  description: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
  }),
};
