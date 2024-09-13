import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const article = style({
	containerType: "inline-size",
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing.absolute[4],
});
