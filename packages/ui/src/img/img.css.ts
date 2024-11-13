import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const img = style({
	border: `1px solid ${vars.color.gray[4]}`,
	backgroundColor: `${vars.color.gray[2]} !important`,
	borderRadius: vars.spacing.absolute[2],
	width: "100%",
});
