import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const table = style({
	width: "100%",
	borderCollapse: "collapse",
	display: "block",
	overflowX: "auto",
});

export const th = style({
	padding: vars.spacing.relative[2],
	fontWeight: vars.font.weight.bold,
	color: vars.color.gray[12],
	borderBottom: `1px solid ${vars.color.gray[4]}`,
});

export const td = style({
	padding: vars.spacing.relative[2],
	lineHeight: 1.8,
});

export const tr = style({});

globalStyle(`${table} ${tr} + ${tr} > ${td}`, {
	borderTop: `1px solid ${vars.color.gray[4]}`,
});
