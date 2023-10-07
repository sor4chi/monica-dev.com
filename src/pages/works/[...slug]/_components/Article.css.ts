import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const ARTICLE_WIDTH = "40rem";

export const styles = {
  article: style({
    width: "100%",
    maxWidth: ARTICLE_WIDTH,
  }),
  heroImage: style({
    width: vars.spacing.full,
    height: "auto",
    aspectRatio: "1200 / 630",
    objectFit: "cover",
    borderRadius: vars.spacing.absolute[2],
    margin: `${vars.spacing.relative[4]} 0`,
  }),
  title: style({
    fontSize: vars.font.size.xl,
  }),
  meta: style({
    display: "inline-flex",
    alignItems: "center",
    gap: vars.spacing.relative[4],
    fontSize: vars.font.size.sm,
    margin: `${vars.spacing.relative[2]} 0`,
    color: vars.color.gray[11],
  }),
  contents: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.absolute[4],
  }),
};

globalStyle(`${styles.contents} > *:first-child`, {
  marginTop: vars.spacing[0],
});

globalStyle(`${styles.article} h2`, {
  fontSize: vars.font.size.lg,
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[8],
});

globalStyle(`${styles.article} h3`, {
  fontSize: vars.font.size.base,
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[6],
});

globalStyle(`${styles.article} h4`, {
  fontSize: vars.font.size.sm,
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[4],
});

globalStyle(`${styles.article} p`, {
  fontSize: vars.font.size.base,
  color: vars.color.gray[12],
  lineHeight: 1.8,
});

globalStyle(`${styles.article} ul`, {
  paddingLeft: vars.spacing.relative[4],
});

globalStyle(`${styles.article} ol`, {
  paddingLeft: vars.spacing.relative[6],
});

globalStyle(`${styles.article} ul li`, {
  listStyle: "none",
  position: "relative",
});

globalStyle(`${styles.article} li`, {
  position: "relative",
  lineHeight: 1.8,
});

globalStyle(`${styles.article} ul li::before`, {
  content: '"-"',
  position: "absolute",
  left: `calc(-1 * ${vars.spacing.relative[4]})`,
  color: vars.color.gray[12],
});

globalStyle(`${styles.article} table`, {
  width: "100%",
  borderCollapse: "collapse",
});

globalStyle(`${styles.article} table th`, {
  padding: vars.spacing.relative[2],
  fontWeight: 700,
  color: vars.color.gray[12],
  borderBottom: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.article} table tr + tr > td`, {
  borderTop: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.article} table td`, {
  padding: vars.spacing.relative[2],
});

globalStyle(`${styles.article} hr`, {
  border: "none",
  height: "1px",
  backgroundColor: vars.color.gray[4],
  margin: `${vars.spacing.relative[4]} 0`,
});

globalStyle(`${styles.article} blockquote`, {
  borderLeft: `4px solid ${vars.color.gray[4]}`,
  paddingLeft: vars.spacing.relative[4],
});

globalStyle(`${styles.article} .contains-task-list`, {
  padding: 0,
});

globalStyle(`${styles.article} .contains-task-list .contains-task-list`, {
  paddingLeft: vars.spacing.relative[6],
});

globalStyle(`${styles.article} .task-list-item::before`, {
  display: "none",
});

globalStyle(`${styles.article} :not(pre) > code`, {
  backgroundColor: vars.color.gray[4],
  padding: vars.spacing.relative[1],
  borderRadius: vars.spacing.relative[1],
});

globalStyle(`${styles.article} pre:has(> code)`, {
  border: `1px solid ${vars.color.gray[4]}`,
  background: "none !important",
  padding: vars.spacing.relative[4],
  borderRadius: vars.spacing.relative[2],
  overflowX: "auto",
});

globalStyle(`${styles.article} pre code`, {
  fontSize: vars.font.size.sm,
  fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
  lineHeight: 1.8,
});

globalStyle(`${styles.article} img`, {
  width: vars.spacing.full,
  height: "auto",
  borderRadius: vars.spacing.absolute[2],
  margin: `${vars.spacing.relative[4]} 0`,
});

globalStyle(`${styles.article} .math-display`, {
  width: "fit-content",
  position: "relative",
  transform: "translateX(-50%)",
  padding: `${vars.spacing.relative[4]} ${vars.spacing.relative[8]}`,
  left: "50%",
  zIndex: 1,

  "@media": {
    // [`screen and (max-width: ${constants.breakpoint.lg})`]: {
    //   overflowX: "auto",
    //   width: "100%",
    // },
  },
});

globalStyle(`${styles.article} .katex-display`, {
  background: vars.color.gray[1],
  boxShadow: `0 0 1rem 2rem ${vars.color.gray[1]}`,
});
