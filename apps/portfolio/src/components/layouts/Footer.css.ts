import { style } from "@vanilla-extract/css";
import { vars } from "design-system/theme.css";

export const styles = {
  footer: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: vars.spacing.absolute[2],
    fontSize: vars.font.size.sm,
    padding: `${vars.spacing.relative[4]} 0`,
    marginTop: vars.spacing.absolute[16],
  }),
  footerText: style({
    color: vars.color.gray[10],
  }),
};
