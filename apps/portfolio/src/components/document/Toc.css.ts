import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

import { BREAKPOINT_TABLET } from "@/styles/constants";

import { TOP_PADDING_LG } from "../layouts/Base.css";

export const styles = {
	toc: style({
		display: "flex",
		flexDirection: "column",
		fontSize: vars.font.size.sm,
		paddingLeft: vars.spacing.relative[4],
		width: vars.spacing.full,
		boxSizing: "border-box",
		marginTop: vars.spacing.relative[2],
		maxHeight: `calc(100vh - ${TOP_PADDING_LG} - 64px)`,
		overflowY: "auto",

		"@media": {
			[`screen and (max-width: ${BREAKPOINT_TABLET})`]: {
				maxHeight: `calc(100vh - ${TOP_PADDING_LG} - 160px)`,
			},
		},
	}),
	tocItem: style({
		listStyle: "none",
	}),
	link: style({
		width: vars.spacing.full,
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "space-between",
		textDecoration: "none",

		color: vars.color.gray[10],
		border: "none",
		padding: vars.spacing.relative[2],
		lineHeight: "1.25rem",
		boxSizing: "border-box",
		cursor: "pointer",
		outline: "none",

		transition: "color 0.2s ease-in-out",

		"@media": {
			"(hover: hover)": {
				":hover": {
					color: vars.color.blue[9],
				},
			},
		},

		":focus-visible": {
			color: vars.color.blue[9],
		},
	}),
};

globalStyle(".toc-active", {
	color: vars.color.gray[12],
});
