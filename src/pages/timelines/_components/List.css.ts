import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
  container: style({
    width: "100%",
    maxWidth: "50rem",
    margin: `${vars.spacing.relative[8]} auto`,
    borderSpacing: `${vars.spacing.absolute[4]} ${vars.spacing.absolute[4]}`,
  }),
};
