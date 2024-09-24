import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const line = style({
	border: "none",
	height: "1px",
	backgroundColor: vars.color.gray[4],
	margin: `${vars.spacing.absolute[8]} 0`,
});

globalStyle(`${line} + *`, {
	marginTop: 0,
});
