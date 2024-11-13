import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const blockquote = style({
	padding: `${vars.spacing.absolute[2]} ${vars.spacing.absolute[4]}`,
	borderLeft: `4px solid ${vars.color.gray[6]}`,
	color: vars.color.gray[10],
});
