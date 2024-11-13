import { vars } from "@sor4chi/design-system/theme.css";
import { createVar, globalStyle, style } from "@vanilla-extract/css";

const CODEBLOCK_PADDING = vars.spacing.absolute[4];

export const container = style({
	position: "relative",
});

globalStyle(`${container} pre`, {
	border: `1px solid ${vars.color.gray[4]}`,
	backgroundColor: `${vars.color.gray[2]} !important`,
	padding: CODEBLOCK_PADDING,
	borderRadius: vars.spacing.absolute[2],
	overflowX: "auto",
	overflowY: "hidden",
	transition: "box-shadow 0.5s ease-in-out, border-color 0.5s ease-in-out",
});

export const copied = style({});

globalStyle(`${container}.${copied} pre`, {
	boxShadow: `0 0 16px 0px ${vars.color.blue[4]}`,
	borderColor: vars.color.blue[4],
});

globalStyle(`${container} pre > code`, {
	fontSize: vars.font.size.sm,
	fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
	lineHeight: 1.8,
	width: "100%",
});

export const copyButton = style({
	position: "absolute",
	top: vars.spacing.absolute[2],
	right: vars.spacing.absolute[2],
	width: "36px",
	height: "36px",
	border: 0,
	backgroundColor: vars.color.gray[4],
	color: vars.color.gray[9],
	borderRadius: vars.spacing.absolute[2],
	cursor: "pointer",
	opacity: 0,
	transition: "opacity 0.2s, background-color 0.2s",

	":hover": {
		backgroundColor: vars.color.gray[5],
	},
});

globalStyle(`${container}:hover ${copyButton}`, {
	opacity: 1,
});

export const copyButtonIcon = style({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	opacity: 0,
	transition: "opacity 0.2s",
});

export const iconAppear = style({
	opacity: 1,
});

// ref: https://shiki.matsu.io/guide/dual-themes#class-based-dark-mode
globalStyle(".dark .shiki, .dark .shiki span", {
	color: "var(--shiki-dark) !important",
	fontStyle: "var(--shiki-dark-font-style) !important",
	fontWeight: "var(--shiki-dark-font-weight) !important",
	textDecoration: "var(--shiki-dark-text-decoration) !important",
});
globalStyle(".shiki", {
	background: "none !important",
});

globalStyle(`${container} .shiki .line.highlighted`, {
	width: "100%",
	margin: `0 calc(-1 * ${CODEBLOCK_PADDING})`,
	padding: `0 ${CODEBLOCK_PADDING}`,
	display: "inline-block",
	backgroundColor: `${vars.color.gray[4]} !important`,
});

globalStyle(`${container} .shiki .line.highlighted`, {
	display: "inline-block",
	backgroundColor: `${vars.color.gray[4]} !important`,
});

const diffColorVars = createVar();

globalStyle(`${container} .shiki .line.diff.add`, {
	vars: {
		[diffColorVars]: "16, 185, 129",
	},
});

globalStyle(`${container} .shiki .line.diff.remove`, {
	vars: {
		[diffColorVars]: "244, 63, 94",
	},
});

globalStyle(`${container} .shiki .line.diff`, {
	position: "relative",
	width: "100%",
	margin: `0 calc(-1 * ${CODEBLOCK_PADDING})`,
	padding: `0 ${CODEBLOCK_PADDING}`,
	display: "inline-block",
	backgroundColor: `rgba(${diffColorVars}, .08)`,
});

globalStyle(`${container} .shiki .line.diff:before`, {
	position: "absolute",
	top: 0,
	left: 0,
	width: "1rem",
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: `rgba(${diffColorVars}, .8)`,
	fontWeight: vars.font.weight.normal,
	fontSize: vars.font.size.xs,
});

globalStyle(`${container} .shiki .line.diff.add:before`, {
	content: '"+"',
});

globalStyle(`${container} .shiki .line.diff.remove:before`, {
	content: '"-"',
});
