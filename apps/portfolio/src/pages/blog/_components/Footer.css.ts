import { style } from "@vanilla-extract/css";
import { vars } from "design-system/theme.css";

export const styles = {
  footer: style({
    marginTop: vars.spacing.absolute[8],
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  }),
  link: style({
    fontSize: vars.font.size.sm,
  }),
};
