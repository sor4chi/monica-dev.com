import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const ul = style({
	paddingLeft: vars.spacing.relative[6],
});

export const ol = style({
	paddingLeft: vars.spacing.relative[6],
});

export const li = style({
	position: "relative",
	lineHeight: 1.8,
});

globalStyle(`${ul} ${li}`, {
	listStyle: "none",
	position: "relative",
});

globalStyle(`${ul} ${li}::before`, {
	content: '"-"',
	position: "absolute",
	left: `calc(-1 * ${vars.spacing.relative[4]})`,
	color: vars.color.gray[10],
});

globalStyle(`${ol} ${li}::marker`, {
	color: vars.color.gray[10],
});
