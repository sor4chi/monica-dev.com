import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

const CARD_SHRINK_THRESHOLD = "640px";
const IMAGE_SHRINK_THRESHOLD = "400px";
const IMAGE_HIDDEN_THRESHOLD = "240px";

export const linkCard = style({
	display: "flex",
	width: "100%",
	height: "7em",
	borderRadius: vars.spacing.relative[2],
	textDecoration: "none",
	border: `1px solid ${vars.color.gray[4]}`,
	overflow: "hidden",
	backgroundColor: vars.color.gray[2],
	transition: "background-color 0.2s",

	"@container": {
		[`(max-width: ${CARD_SHRINK_THRESHOLD})`]: {
			height: "6em",
		},
	},

	"@media": {
		"(hover: hover)": {
			":hover": {
				backgroundColor: vars.color.gray[3],
			},
		},
	},

	":focus-visible": {
		borderRadius: vars.spacing.relative[2],
		outline: `2px solid ${vars.color.blue[8]}`,
		outlineOffset: "2px",
	},
});

export const linkCardImage = style({
	width: "auto",
	height: "100%",
	aspectRatio: "1200 / 630",
	overflow: "hidden",
	objectFit: "cover",
	flexShrink: 0,
	margin: 0,
	border: "none",
	borderRadius: 0,

	"@container": {
		[`(max-width: ${IMAGE_SHRINK_THRESHOLD})`]: {
			aspectRatio: "1 / 1",
		},
		[`(max-width: ${IMAGE_HIDDEN_THRESHOLD})`]: {
			display: "none",
		},
	},
});

export const linkCardImagePlaceholder = style([
	linkCardImage,
	{
		backgroundColor: vars.color.gray[4],
	},
]);

export const linkCardContent = style({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	color: vars.color.gray[12],
	flexGrow: 1,
	gap: vars.spacing.relative[4],
	padding: `${vars.spacing[0]} ${vars.spacing.relative[6]}`,

	"@container": {
		[`(max-width: ${CARD_SHRINK_THRESHOLD})`]: {
			gap: vars.spacing.relative[2],
			padding: `${vars.spacing[0]} ${vars.spacing.relative[4]}`,
		},
	},
});

export const linkCardTitle = style({
	fontSize: vars.font.size.relative.base,
	lineHeight: 1.5,
	overflow: "hidden",
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 2,

	"@container": {
		[`(max-width: ${CARD_SHRINK_THRESHOLD})`]: {
			fontSize: vars.font.size.relative.sm,
		},
	},
});

export const linkCardMeta = style({
	display: "flex",
	alignItems: "center",
	gap: vars.spacing.relative[2],
});

export const linkCardFavicon = style({
	width: "1em",
	height: "1em",
	borderRadius: vars.spacing.relative[1],
	overflow: "hidden",
	backgroundSize: "cover",
	flexShrink: 0,
});

export const linkCardDomain = style({
	fontSize: vars.font.size.relative.sm,
	color: vars.color.gray[10],
	overflow: "hidden",
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 1,
});
