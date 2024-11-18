import { BREAKPOINT_MOBILE } from "@/style/layout.css";
import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "grid",
	gap: `${vars.spacing.absolute[2]} ${vars.spacing.absolute[6]}`,
	margin: "0 auto",
	width: "fit-content",
	placeItems: "center",
});

export const avatar = style({
	width: "64px",
	height: "64px",
	objectFit: "cover",
	borderRadius: "50%",
	gridRow: "1 / 2",
	gridColumn: "1 / 2",
});

export const texts = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing.absolute[1],
	gridRow: "1 / 2",
	gridColumn: "2 / 3",
});

export const socials = style({
	display: "flex",
	alignItems: "center",
	gap: vars.spacing.absolute[4],
	gridRow: "1 / 2",
	gridColumn: "3 / 4",

	"@media": {
		[`screen and (max-width: ${BREAKPOINT_MOBILE}px)`]: {
			gridRow: "2 / 3",
			gridColumn: "1 / 3",
		},
	},
});

export const socialLink = style({
	color: vars.color.gray[11],
	transition: "color 0.2s",

	":hover": {
		color: vars.color.gray[12],
	},
});

export const title = style({
	marginBottom: vars.spacing.absolute[1],
	fontSize: vars.font.size.xl,
	color: vars.color.gray[12],
	lineHeight: 1,
});

export const subtitle = style({
	margin: 0,
	fontSize: vars.font.size.base,
	color: vars.color.gray[10],
	lineHeight: 1,
});
