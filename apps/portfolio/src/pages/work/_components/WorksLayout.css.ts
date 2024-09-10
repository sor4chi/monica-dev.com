import { globalStyle, style } from "@vanilla-extract/css";
import { slideIn } from "@sor4chi/design-system/animation.css";
import { vars } from "@sor4chi/design-system/theme.css";

export const styles = {
  container: style({
    width: "100%",
    maxWidth: "64rem",
    margin: `${vars.spacing.absolute[12]} auto`,
  }),
  title: style({
    color: vars.color.gray[12],
    fontSize: vars.font.size.xl,
    fontWeight: vars.font.weight.bold,
    marginBottom: vars.spacing.absolute[4],
  }),
  description: style({
    color: vars.color.gray[11],
    marginBottom: vars.spacing.absolute[8],
  }),
};
