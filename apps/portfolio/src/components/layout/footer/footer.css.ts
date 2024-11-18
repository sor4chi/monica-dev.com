import { FOOTER_HEIGHT } from "@/style/layout.css";
import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const footer = style({
	height: FOOTER_HEIGHT,
	width: "100%",
	color: vars.color.gray[10],
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});
