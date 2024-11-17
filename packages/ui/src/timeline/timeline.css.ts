import { vars } from "@sor4chi/design-system/theme.css";
import { createVar, globalStyle, style } from "@vanilla-extract/css";

const timelineLeftPadding = createVar();
const titleLineHeight = createVar();

export const timelineContainer = style({
	display: "flex",
	flexDirection: "column",
	paddingLeft: timelineLeftPadding,
	vars: {
		[timelineLeftPadding]: vars.spacing.absolute[16],
		[titleLineHeight]: vars.spacing.absolute[6],
	},
	// "@media": {
	// 	[`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
	// 		vars: {
	// 			[timelineLeftPadding]: vars.spacing.absolute[12],
	// 		},
	// 	},
	// },
});

export const timelineItem = style({
	display: "flex",
	flexDirection: "column",
	position: "relative",
});

export const timelineTitle = style({
	position: "relative",
	marginTop: 0,
	lineHeight: titleLineHeight,
});

export const timelineTime = style({
	position: "absolute",
	top: `calc(${titleLineHeight} / 2)`,
	left: `calc(-1 * ${timelineLeftPadding} / 2)`,
	transform: "translate(-50%, -50%)",
	fontSize: vars.font.size.xs,
	fontWeight: 400,
	color: vars.color.gray[10],
	whiteSpace: "nowrap",
	zIndex: vars.zIndex.forward,
	padding: `${vars.spacing.absolute[3]} 0`,
	lineHeight: 1,
});

const TIMELINE_LABEL_HEIGHT = "16px";

globalStyle(`${timelineItem}:has(+ ${timelineItem})::before`, {
	content: '""',
	position: "absolute",
	top: `calc(${titleLineHeight} / 2)`,
	left: `calc(-1 * ${timelineLeftPadding} / 2)`,
	width: "1px",
	height: `calc(100% - ${TIMELINE_LABEL_HEIGHT} * 2)`,
	transform: `translateY(${TIMELINE_LABEL_HEIGHT})`,
	backgroundColor: vars.color.gray[4],
});

globalStyle(`${timelineItem}:has(+ ${timelineItem})`, {
	paddingBottom: vars.spacing.absolute[8],
});
