import { CONTENTS_MAX, CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
  contents: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.absolute[4],
  }),
};

globalStyle(`${styles.contents} > *:first-child`, {
  marginTop: vars.spacing[0],
});

globalStyle(`${styles.contents} a`, {
  color: vars.color.gray[12],
  wordBreak: "break-word",
  textUnderlineOffset: "0.2em",
});

globalStyle(
  `${styles.contents} a[data-footnote-ref], ${styles.contents} a[data-footnote-backref]`,
  {
    fontSize: vars.font.size.sm,
    color: vars.color.blue[11],
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
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[8],
});

globalStyle(HEADING_H3, {
  fontSize: vars.font.size.base,
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[6],
});

globalStyle(`${HEADING_H4}, ${HEADING_H5}, ${HEADING_H6}`, {
  fontSize: vars.font.size.sm,
  fontWeight: 700,
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
    [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
      display: "none",
    },
  },
});

const ALL_HEADINGS_WITH_ANCHOR_BEFORE = ALL_HEADINGS.map(
  (selector) => `${selector} > a:before`,
);

globalStyle(ALL_HEADINGS_WITH_ANCHOR_BEFORE.join(", "), {
  content: 'url("/images/assets/link.svg")',
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

globalStyle(`${styles.contents} h1 > a`, {
  fontSize: vars.font.size.xl,
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[8],
});

globalStyle(`${styles.contents} p`, {
  fontSize: vars.font.size.base,
  color: vars.color.gray[12],
  lineHeight: 1.8,
});

globalStyle(`${styles.contents} ul`, {
  paddingLeft: vars.spacing.relative[4],
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

globalStyle(`${styles.contents} ul li::before`, {
  content: '"-"',
  position: "absolute",
  left: `calc(-1 * ${vars.spacing.relative[4]})`,
  color: vars.color.gray[12],
});

globalStyle(`${styles.contents} table`, {
  width: "100%",
  borderCollapse: "collapse",
});

globalStyle(`${styles.contents} table th`, {
  padding: vars.spacing.relative[2],
  fontWeight: 700,
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
  margin: `${vars.spacing.relative[4]} 0`,
});

globalStyle(`${styles.contents} blockquote`, {
  borderLeft: `4px solid ${vars.color.gray[4]}`,
  paddingLeft: vars.spacing.relative[4],
});

globalStyle(`${styles.contents} blockquote[data-annotation-type="warning"]`, {
  borderLeft: `4px solid #f6ad55`,
});

globalStyle(`${styles.contents} blockquote[data-annotation-type="note"]`, {
  borderLeft: `4px solid #63b3ed`,
});

globalStyle(`${styles.contents} blockquote[data-annotation-type="important"]`, {
  borderLeft: `4px solid #fc8181`,
});

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
  backgroundColor: vars.color.gray[4],
  padding: vars.spacing.relative[1],
  borderRadius: vars.spacing.relative[1],
});

globalStyle(`${styles.contents} pre:has(> code)`, {
  border: `1px solid ${vars.color.gray[4]}`,
  background: "none !important",
  padding: vars.spacing.relative[4],
  borderRadius: vars.spacing.relative[2],
  overflowX: "auto",
});

globalStyle(`${styles.contents} pre code`, {
  fontSize: vars.font.size.sm,
  fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
  lineHeight: 1.8,
});

globalStyle(`${styles.contents} img`, {
  width: vars.spacing.full,
  height: "auto",
  borderRadius: vars.spacing.absolute[2],
  margin: `${vars.spacing.relative[4]} 0`,
  border: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.contents} .math-display`, {
  width: "fit-content",
  position: "relative",
  transform: "translateX(-50%)",
  padding: `${vars.spacing.relative[4]} ${vars.spacing.relative[8]}`,
  left: "50%",
  zIndex: vars.zIndex.forward,
  boxSizing: "border-box",

  "@media": {
    [`screen and (max-width: ${CONTENTS_MAX})`]: {
      overflowX: "auto",
      width: "100%",
    },
  },
});

globalStyle(`${styles.contents} .katex-display`, {
  background: vars.color.gray[1],
  boxShadow: `0 0 1rem 2rem ${vars.color.gray[1]}`,
});
