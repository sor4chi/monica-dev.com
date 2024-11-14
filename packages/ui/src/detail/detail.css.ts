import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const details = style({
	lineHeight: 1,
	border: `1px solid ${vars.color.gray[4]}`,
	borderRadius: vars.spacing.absolute[2],
	overflow: "hidden",
});

export const summary = style({
	padding: vars.spacing.absolute[4],
	fontWeight: vars.font.weight.medium,
	color: vars.color.gray[12],
	cursor: "pointer",

	":hover": {
		backgroundColor: vars.color.gray[2],
	},

	":focus-visible": {
		outline: "none",
		boxShadow: `0 0 0 2px ${vars.color.blue[8]}`,
		borderRadius: vars.spacing.absolute[2],
	},
});

export const content = style({
	padding: vars.spacing.absolute[4],
});
