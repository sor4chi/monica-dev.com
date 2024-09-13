import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const link = style({
	cursor: "pointer",
	color: vars.color.gray[12],
	fontWeight: vars.font.weight.medium,
	wordBreak: "break-word",
	textUnderlineOffset: "0.3em",
	textDecoration: "underline",
	textDecorationColor: vars.color.gray[7],
	textDecorationThickness: "1px",
	outline: "none",
	transition: "text-decoration-color 0.2s, color 0.2s",

	":hover": {
		textDecorationColor: vars.color.gray[11],
	},

	":focus-visible": {
		outline: "1px solid",
		outlineColor: vars.color.blue[8],
		outlineOffset: "4px",
		outlineWidth: "2px",
		borderRadius: "2px",
	},
});
