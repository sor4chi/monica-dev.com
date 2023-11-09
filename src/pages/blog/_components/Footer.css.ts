import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
  footer: style({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  }),
  link: style({
    fontSize: vars.font.size.sm,
  }),
};
