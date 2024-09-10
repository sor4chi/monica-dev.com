import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

import { BREAKPOINT_MOBILE } from "@/styles/constants";

export const styles = {
	header: style({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		gap: vars.spacing.absolute[4],
		marginBottom: vars.spacing.absolute[8],
	}),
	title: style({
		fontSize: vars.font.size.xl,
	}),
	titleWord: style({
		display: "inline-block",
		whiteSpace: "break-spaces",
	}),
	meta: style({
		display: "inline-flex",
		alignItems: "center",
		gap: vars.spacing.relative[4],
		margin: 0,
		color: vars.color.gray[10],
	}),
	authors: style({
		display: "flex",
		gap: vars.spacing.absolute[4],

		"@media": {
			[`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
				gap: vars.spacing[0],
			},
		},
	}),
	author: style({
		textDecoration: "none",
		color: vars.color.gray[11],
		display: "block",
		transition: "filter 0.2s ease-in-out",

		"@media": {
			"(hover: hover)": {
				":hover": {
					filter: "brightness(0.8)",
				},
			},
			[`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
				marginLeft: `calc(-1 * ${vars.spacing.absolute[2]})`,
			},
		},
	}),
	avatar: style({
		objectFit: "cover",
		borderRadius: "50%",
		display: "block",
	}),
	date: style({
		fontSize: vars.font.size.sm,
	}),
};
