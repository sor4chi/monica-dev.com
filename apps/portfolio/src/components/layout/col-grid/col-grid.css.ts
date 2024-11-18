import { CENTER_MAX_WIDTH, FOOTER_HEIGHT } from "@/style/layout.css";
import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

const TOP_MARGIN = 160;
const BOTTOM_MARGIN = 16;

export const colGrid = style({
	display: "grid",
	placeItems: "center",
	gridTemplateColumns: `1fr min(${CENTER_MAX_WIDTH}px, 100%) 1fr`,
	padding: `${TOP_MARGIN}px ${vars.spacing.absolute[4]} ${BOTTOM_MARGIN}px`,
	minHeight: `calc(100dvh - ${TOP_MARGIN + BOTTOM_MARGIN + FOOTER_HEIGHT}px)`,
});

export const colGridItem = style({
	width: "100%",
});
