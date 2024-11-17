import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const inlinecode = style({
	backgroundColor: vars.color.gray[3],
	borderRadius: vars.spacing.relative[1],
	padding: `${vars.spacing.relative[1]} ${vars.spacing.relative[2]}`,
	fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
	color: vars.color.gray[11],
});
