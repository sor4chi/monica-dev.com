import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "grid",
	gridTemplateColumns: "240px 800px 240px",
	gap: vars.spacing.absolute[8],
	justifyContent: "center",
});
