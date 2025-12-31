import { slideIn } from "@sor4chi/design-system/animation.css";
import { vars } from "@sor4chi/design-system/theme.css";
import { createVar, globalStyle, style } from "@vanilla-extract/css";

import { ARTICLE_WIDTH, BREAKPOINT_MOBILE } from "@/styles/constants";

export const styles = {
  contents: style({}),
};

globalStyle(".markdown-contents", {
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.absolute[4],
});

globalStyle(".markdown-section", {
  opacity: 0,
  animation: `${slideIn} 0.7s ease-in-out forwards`,
});

globalStyle(`${styles.contents} > *:first-child`, {
  marginTop: vars.spacing[0],
});

globalStyle(`${styles.contents} a`, {
  color: vars.color.gray[12],
  fontWeight: vars.font.weight.medium,
  wordBreak: "break-word",
  textUnderlineOffset: "0.3em",
  textDecorationColor: vars.color.gray[7],
  textDecorationThickness: "1px",
  outline: "none",
  position: "relative",
  transition: "text-decoration-color 0.2s",
});

globalStyle(`${styles.contents} a:hover`, {
  textDecorationColor: vars.color.gray[11],
});

globalStyle(`${styles.contents} a:focus-visible`, {
  outline: "1px solid",
  outlineColor: vars.color.blue[8],
  outlineOffset: "4px",
  outlineWidth: "2px",
  borderRadius: "2px",
});

globalStyle(
  `${styles.contents} a[data-footnote-ref], ${styles.contents} a[data-footnote-backref]`,
  {
    fontSize: vars.font.size.sm,
    color: vars.color.blue[9],
    textDecoration: "none",
    padding: vars.spacing.relative[1],
  },
);
globalStyle(`${styles.contents} .icon-link:before`, {
  content: "X",
  marginRight: vars.spacing.relative[1],
});

const HEADING_H1 = `${styles.contents} h1`;
const HEADING_H2 = `${styles.contents} h2`;
const HEADING_H3 = `${styles.contents} h3`;
const HEADING_H4 = `${styles.contents} h4`;
const HEADING_H5 = `${styles.contents} h5`;
const HEADING_H6 = `${styles.contents} h6`;
const ALL_HEADINGS = [
  HEADING_H1,
  HEADING_H2,
  HEADING_H3,
  HEADING_H4,
  HEADING_H5,
  HEADING_H6,
];

globalStyle(HEADING_H2, {
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[8],
});

globalStyle(HEADING_H3, {
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[6],
});

globalStyle(`${HEADING_H4}, ${HEADING_H5}, ${HEADING_H6}`, {
  fontSize: vars.font.size.base,
  fontWeight: vars.font.weight.bold,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[4],
});

globalStyle(ALL_HEADINGS.join(", "), {
  position: "relative",
});

const ALL_HEADINGS_WITH_ANCHOR = ALL_HEADINGS.map(
  (selector) => `${selector} > a`,
);

globalStyle(ALL_HEADINGS_WITH_ANCHOR.join(", "), {
  position: "absolute",
  top: "50%",
  left: "-1.5rem",
  transform: "translateY(-50%)",
  textDecoration: "none",
  transition: "opacity 0.2s ease-in-out",
  opacity: 0,

  "@media": {
    [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
      display: "none",
    },
  },
});

const ALL_HEADINGS_WITH_ANCHOR_BEFORE = ALL_HEADINGS.map(
  (selector) => `${selector}:not(.timeline-title) > a:before`,
);

globalStyle(ALL_HEADINGS_WITH_ANCHOR_BEFORE.join(", "), {
  content: 'url("/assets/link.svg")',
  display: "inline-block",
  padding: vars.spacing.relative[1],
  width: "1rem",
  height: "1rem",
});

const ALL_HEADINGS_HOVER_WITH_ANCHOR = ALL_HEADINGS.map(
  (selector) => `${selector}:hover > a`,
);

globalStyle(ALL_HEADINGS_HOVER_WITH_ANCHOR.join(", "), {
  "@media": {
    "(hover: hover)": {
      opacity: 1,
    },
  },
});

const ALL_HEADINGS_FOCUS_VISIBLE_WITH_ANCHOR = ALL_HEADINGS.map(
  (selector) => `${selector} > a:focus-visible`,
);

globalStyle(ALL_HEADINGS_FOCUS_VISIBLE_WITH_ANCHOR.join(", "), {
  opacity: 1,
});

globalStyle(`${styles.contents} .link-card`, {
  display: "flex",
  width: "100%",
  height: "7rem",
  borderRadius: vars.spacing.absolute[2],
  textDecoration: "none",
  border: `1px solid ${vars.color.gray[4]}`,
  overflow: "hidden",
  backgroundColor: vars.color.gray[1],
  transition: "background-color 0.2s",

  "@media": {
    [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
      height: "6rem",
    },
  },
});

globalStyle(`${styles.contents} .link-card:hover`, {
  "@media": {
    "(hover: hover)": {
      backgroundColor: vars.color.gray[2],
    },
  },
});

globalStyle(`${styles.contents} .link-card:focus-visible`, {
  borderRadius: vars.spacing.absolute[2],
  outline: `2px solid ${vars.color.blue[8]}`,
  outlineOffset: "2px",
});

globalStyle(`${styles.contents} .link-card .link-card__image`, {
  width: "auto",
  height: "100%",
  aspectRatio: "1200 / 630",
  overflow: "hidden",
  objectFit: "cover",
  flexShrink: 0,
  margin: 0,
  border: "none",
  borderRadius: 0,

  "@media": {
    [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
      width: "6rem",
      height: "6rem",
    },
  },
});

globalStyle(`${styles.contents} .link-card .link-card__content`, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexGrow: 1,
  gap: vars.spacing.absolute[4],
  padding: `${vars.spacing[0]} ${vars.spacing.absolute[6]}`,

  "@media": {
    [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
      gap: vars.spacing.absolute[2],
      padding: `${vars.spacing[0]} ${vars.spacing.absolute[4]}`,
    },
  },
});

globalStyle(`${styles.contents} .link-card .link-card__title`, {
  fontSize: vars.font.size.base,
  lineHeight: 1.5,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,

  "@media": {
    [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
      fontSize: vars.font.size.sm,
    },
  },
});

globalStyle(`${styles.contents} .link-card .link-card__meta`, {
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.absolute[2],
});

globalStyle(`${styles.contents} .link-card .link-card__favicon`, {
  width: "1rem",
  height: "1rem",
  borderRadius: vars.spacing.absolute[1],
  overflow: "hidden",
  backgroundSize: "cover",
  flexShrink: 0,
});

globalStyle(`${styles.contents} .link-card .link-card__domain`, {
  fontSize: vars.font.size.sm,
  color: vars.color.gray[11],
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
});

globalStyle(`${styles.contents} p`, {
  lineHeight: 1.8,
});

globalStyle(`${styles.contents} strong`, {
  color: vars.color.gray[12],
  fontWeight: vars.font.weight.bold,
});

globalStyle(`${styles.contents} ul`, {
  paddingLeft: vars.spacing.relative[6],
});

globalStyle(`${styles.contents} ol`, {
  paddingLeft: vars.spacing.relative[6],
});

globalStyle(`${styles.contents} ul li`, {
  listStyle: "none",
  position: "relative",
});

globalStyle(`${styles.contents} li`, {
  position: "relative",
  lineHeight: 1.8,
});

globalStyle(`${styles.contents} li`, {
  position: "relative",
  lineHeight: 1.8,
});

globalStyle(`${styles.contents} ul li::before`, {
  content: '"-"',
  position: "absolute",
  left: `calc(-1 * ${vars.spacing.relative[4]})`,
  color: vars.color.gray[10],
});

globalStyle(`${styles.contents} ol li::marker`, {
  color: vars.color.gray[10],
});

globalStyle(`${styles.contents} table`, {
  width: "100%",
  borderCollapse: "collapse",
  display: "block",
  overflowX: "auto",
});

globalStyle(`${styles.contents} table th`, {
  padding: vars.spacing.relative[2],
  fontWeight: vars.font.weight.bold,
  color: vars.color.gray[12],
  borderBottom: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.contents} table tr + tr > td`, {
  borderTop: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.contents} table td`, {
  padding: vars.spacing.relative[2],
  lineHeight: 1.8,
});

globalStyle(`${styles.contents} hr`, {
  border: "none",
  height: "1px",
  backgroundColor: vars.color.gray[4],
  margin: `${vars.spacing.absolute[8]} 0`,
});

globalStyle(`${styles.contents} hr + *`, {
  marginTop: 0,
});

globalStyle(`${styles.contents} blockquote`, {
  borderLeft: `4px solid ${vars.color.gray[4]}`,
  paddingLeft: vars.spacing.relative[4],
  color: vars.color.gray[10],
});

globalStyle(`${styles.contents} details`, {
  lineHeight: 1,
  border: `1px solid ${vars.color.gray[4]}`,
  borderRadius: vars.spacing.absolute[2],
  overflow: "hidden",
});

globalStyle(`${styles.contents} details > summary`, {
  padding: vars.spacing.absolute[4],
  fontWeight: vars.font.weight.medium,
  color: vars.color.gray[12],
  cursor: "pointer",
});

globalStyle(`${styles.contents} details > summary:hover`, {
  backgroundColor: vars.color.gray[2],
});

globalStyle(`${styles.contents} details > summary:focus-visible`, {
  outline: "none",
  boxShadow: `0 0 0 2px ${vars.color.blue[8]}`,
  borderRadius: vars.spacing.absolute[2],
});

globalStyle(`${styles.contents} details > .details-contents`, {
  padding: vars.spacing.absolute[4],
});

const annotationColorRGBVar = createVar();

globalStyle(`${styles.contents} blockquote.annotation-block`, {
  padding: `${vars.spacing.relative[2]} ${vars.spacing.relative[4]}`,
  borderRadius: vars.spacing.absolute[2],
  color: vars.color.gray[11],
});

globalStyle(`.dark ${styles.contents} blockquote.annotation-block`, {
  backgroundColor: `rgba(${annotationColorRGBVar}, 0.05)`,
  border: `1px solid rgba(${annotationColorRGBVar}, 0.125)`,
});

globalStyle(`.light ${styles.contents} blockquote.annotation-block`, {
  backgroundColor: `rgba(${annotationColorRGBVar}, 0.1)`,
  border: `1px solid rgba(${annotationColorRGBVar}, 0.25)`,
});

globalStyle(`${styles.contents} .annotation-block .annotation`, {
  fontWeight: vars.font.weight.bold,
});

globalStyle(
  `.dark ${styles.contents} .annotation-block .annotation-block__label`,
  {
    color: `rgba(${annotationColorRGBVar}, 0.75)`,
    fontWeight: vars.font.weight.bold,
  },
);

globalStyle(
  `.light ${styles.contents} .annotation-block .annotation-block__label`,
  {
    color: `rgba(${annotationColorRGBVar}, 1)`,
    fontWeight: vars.font.weight.bold,
  },
);

globalStyle(
  `${styles.contents} .annotation-block[data-annotation-type="warning"]`,
  {
    vars: {
      [annotationColorRGBVar]: "246, 173, 85",
    },
  },
);

globalStyle(
  `${styles.contents} .annotation-block[data-annotation-type="note"]`,
  {
    vars: {
      [annotationColorRGBVar]: "99, 179, 237",
    },
  },
);

globalStyle(
  `${styles.contents} .annotation-block[data-annotation-type="important"]`,
  {
    vars: {
      [annotationColorRGBVar]: "252, 129, 129",
    },
  },
);

globalStyle(`${styles.contents} .contains-task-list`, {
  padding: 0,
});

globalStyle(`${styles.contents} .contains-task-list .contains-task-list`, {
  paddingLeft: vars.spacing.relative[6],
});

globalStyle(`${styles.contents} .task-list-item::before`, {
  display: "none",
});

globalStyle(`${styles.contents} :not(pre) > code`, {
  fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
  padding: `${vars.spacing.relative[1]} ${vars.spacing.relative[2]}`,
  borderRadius: vars.spacing.relative[1],
  border: `1px solid ${vars.color.gray[4]}`,
  backgroundColor: vars.color.gray[2],
  color: vars.color.gray[12],
  fontSize: vars.font.size.sm,
  wordBreak: "break-word",
});

const CODEBLOCK_PADDING = vars.spacing.absolute[4];

globalStyle(`${styles.contents} pre`, {
  border: `1px solid ${vars.color.gray[4]}`,
  backgroundColor: `${vars.color.gray[2]} !important`,
  padding: CODEBLOCK_PADDING,
  borderRadius: vars.spacing.absolute[2],
  overflowX: "auto",
  overflowY: "hidden",
});

globalStyle(`${styles.contents} pre > code`, {
  fontSize: vars.font.size.sm,
  fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
  lineHeight: 1.8,
});

globalStyle(`${styles.contents} img`, {
  width: vars.spacing.full,
  height: "auto",
  maxHeight: `calc(${ARTICLE_WIDTH} * 3 / 4)`,
  borderRadius: vars.spacing.absolute[2],
  margin: `${vars.spacing.relative[4]} 0`,
  border: `1px solid ${vars.color.gray[6]}`,
  backgroundColor: vars.color.gray[2],
  objectFit: "contain",
});

globalStyle(`${styles.contents} video`, {
  width: vars.spacing.full,
  height: "auto",
  borderRadius: vars.spacing.absolute[2],
  margin: `${vars.spacing.relative[4]} 0`,
  border: `1px solid ${vars.color.gray[6]}`,
  backgroundColor: vars.color.gray[2],
});

globalStyle(`${styles.contents} .katex-display`, {
  overflowX: "auto",
  overflowY: "hidden",
  width: "100%",
  margin: 0,
  scrollbarGutter: "stable",
  color: vars.color.gray[12],
});

globalStyle(`${styles.contents} .katex-display > .katex`, {
  padding: `${vars.spacing.relative[4]} ${vars.spacing.relative[8]}`,
  width: "fit-content",
  margin: "0 auto",

  "@media": {
    [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
      padding: 0,
    },
  },
});

globalStyle(`${styles.contents} :not(.katex-display) > .katex`, {
  padding: `0 ${vars.spacing.relative[1]}`,
  color: vars.color.gray[12],
});

globalStyle(`${styles.contents} .footnotes`, {
  display: "contents",
});

globalStyle(`${styles.contents} .flex-block`, {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.spacing.absolute[4],
});

globalStyle(`${styles.contents} .flex-block > *`, {
  flexGrow: 1,
  flexBasis: 0,
  minWidth: 0,
});

const timelineLeftPadding = createVar();
const titleLineHeight = createVar();

globalStyle(`${styles.contents} .timeline`, {
  display: "flex",
  flexDirection: "column",
  paddingLeft: timelineLeftPadding,
  vars: {
    [timelineLeftPadding]: vars.spacing.absolute[16],
    [titleLineHeight]: vars.spacing.absolute[6],
  },
  "@media": {
    [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
      vars: {
        [timelineLeftPadding]: vars.spacing.absolute[12],
      },
    },
  },
});

globalStyle(`${styles.contents} .timeline-item`, {
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

globalStyle(`${styles.contents} .timeline-title`, {
  position: "relative",
  marginTop: 0,
  lineHeight: titleLineHeight,
});

globalStyle(`${styles.contents} .timeline-title::before`, {
  // contentは[data-time]から取得する
  content: "attr(data-time)",
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

globalStyle(`${styles.contents} .timeline-item:has(+ .timeline-item)::before`, {
  content: '""',
  position: "absolute",
  top: `calc(${titleLineHeight} / 2)`,
  left: `calc(-1 * ${timelineLeftPadding} / 2)`,
  width: "1px",
  height: `calc(100% - ${TIMELINE_LABEL_HEIGHT} * 2)`,
  transform: `translateY(${TIMELINE_LABEL_HEIGHT})`,
  backgroundColor: vars.color.gray[4],
});

globalStyle(`${styles.contents} .timeline-item:has(+ .timeline-item)`, {
  paddingBottom: vars.spacing.absolute[8],
});

// ref: https://docs.astro.build/en/guides/markdown-content/#shiki-configuration
globalStyle(
  `.dark ${styles.contents} .astro-code, .dark ${styles.contents} .astro-code span`,
  {
    color: "var(--shiki-dark) !important",
    fontStyle: "var(--shiki-dark-font-style) !important",
    fontWeight: "var(--shiki-dark-font-weight) !important",
    textDecoration: "var(--shiki-dark-text-decoration) !important",
  },
);

globalStyle(`${styles.contents} .astro-code .line.highlighted`, {
  width: `calc(100% + ${CODEBLOCK_PADDING} * 2)`,
  margin: `0 calc(-1 * ${CODEBLOCK_PADDING})`,
  padding: `0 ${CODEBLOCK_PADDING}`,
  display: "inline-block",
  backgroundColor: `${vars.color.gray[4]} !important`,
});

globalStyle(`${styles.contents} .astro-code .line.highlighted`, {
  display: "inline-block",
  backgroundColor: `${vars.color.gray[4]} !important`,
});

const diffColorVars = createVar();

globalStyle(`${styles.contents} .astro-code .line.diff.add`, {
  vars: {
    [diffColorVars]: "16, 185, 129",
  },
});

globalStyle(`${styles.contents} .astro-code .line.diff.remove`, {
  vars: {
    [diffColorVars]: "244, 63, 94",
  },
});

globalStyle(`${styles.contents} .astro-code .line.diff`, {
  position: "relative",
  width: `calc(100% + ${CODEBLOCK_PADDING} * 2)`,
  margin: `0 calc(-1 * ${CODEBLOCK_PADDING})`,
  padding: `0 ${CODEBLOCK_PADDING}`,
  display: "inline-block",
  backgroundColor: `rgba(${diffColorVars}, .08)`,
});

globalStyle(`${styles.contents} .astro-code .line.diff:before`, {
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

globalStyle(`${styles.contents} .astro-code .line.diff.add:before`, {
  content: '"+"',
});

globalStyle(`${styles.contents} .astro-code .line.diff.remove:before`, {
  content: '"-"',
});

// Twitter embed styles
globalStyle(`${styles.contents} .twitter-embed`, {
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.absolute[3],
  padding: vars.spacing.absolute[4],
  border: `1px solid ${vars.color.gray[4]}`,
  borderRadius: vars.spacing.absolute[2],
  boxSizing: "border-box",
  backgroundColor: vars.color.gray[1],
  textDecoration: "none",
  color: vars.color.gray[11],
  transition: "background-color 0.2s",
  width: "100%",
  maxWidth: "500px",
  margin: `${vars.spacing.relative[4]} auto`,
});

globalStyle(`${styles.contents} .twitter-embed__header`, {
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.absolute[3],
  textDecoration: "none",
  color: "inherit",
});

globalStyle(`${styles.contents} .twitter-embed__header:hover`, {
  "@media": {
    "(hover: hover)": {
      opacity: 0.8,
    },
  },
});

globalStyle(`${styles.contents} .twitter-embed__avatar`, {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  flexShrink: 0,
  margin: 0,
  border: "none",
});

globalStyle(`${styles.contents} .twitter-embed__author`, {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
});

globalStyle(`${styles.contents} .twitter-embed__name`, {
  fontWeight: vars.font.weight.bold,
  color: vars.color.gray[12],
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

globalStyle(`${styles.contents} .twitter-embed__screen-name`, {
  fontSize: vars.font.size.sm,
  color: vars.color.gray[9],
});

globalStyle(`${styles.contents} .twitter-embed__logo`, {
  color: vars.color.gray[11],
  flexShrink: 0,
});

globalStyle(`${styles.contents} .twitter-embed__content`, {
  lineHeight: 1.6,
});

globalStyle(`${styles.contents} .twitter-embed__text`, {
  margin: 0,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

globalStyle(`${styles.contents} .twitter-embed__media`, {
  display: "grid",
  gap: "2px",
  borderRadius: vars.spacing.absolute[2],
  overflow: "hidden",
});

globalStyle(`${styles.contents} .twitter-embed__media[data-count="1"]`, {
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto",
});

globalStyle(`${styles.contents} .twitter-embed__media[data-count="2"]`, {
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "200px",
});

globalStyle(`${styles.contents} .twitter-embed__media[data-count="3"]`, {
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "150px 150px",
});

globalStyle(
  `${styles.contents} .twitter-embed__media[data-count="3"] .twitter-embed__photo:first-child`,
  {
    gridRow: "1 / 3",
  },
);

globalStyle(`${styles.contents} .twitter-embed__media[data-count="4"]`, {
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "150px 150px",
});

globalStyle(`${styles.contents} .twitter-embed__photo`, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  margin: 0,
  border: "none",
  borderRadius: 0,
});

globalStyle(
  `${styles.contents} .twitter-embed__media[data-count="1"] .twitter-embed__photo`,
  {
    maxHeight: "300px",
    height: "auto",
  },
);

globalStyle(`${styles.contents} .twitter-embed__video`, {
  width: "100%",
  height: "auto",
  maxHeight: "300px",
  borderRadius: vars.spacing.absolute[2],
});

globalStyle(`${styles.contents} .twitter-embed__footer`, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: vars.font.size.sm,
  color: vars.color.gray[9],
});

globalStyle(`${styles.contents} .twitter-embed__date`, {
  color: vars.color.gray[9],
});

globalStyle(`${styles.contents} .twitter-embed__stats`, {
  display: "flex",
  gap: vars.spacing.absolute[4],
});

globalStyle(`${styles.contents} .twitter-embed__stat`, {
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.absolute[1],
  color: vars.color.gray[9],
});

globalStyle(`${styles.contents} .twitter-embed__stat svg`, {
  opacity: 0.7,
});

globalStyle(
  `${styles.contents} .twitter-embed__link, ${styles.contents} .twitter-embed__mention, ${styles.contents} .twitter-embed__hashtag`,
  {
    color: vars.color.blue[9],
    textDecoration: "none",
  },
);

globalStyle(
  `${styles.contents} .twitter-embed__link:hover, ${styles.contents} .twitter-embed__mention:hover, ${styles.contents} .twitter-embed__hashtag:hover`,
  {
    textDecoration: "underline",
  },
);
