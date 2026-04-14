import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("/blog", "routes/blog.tsx"),
  route("/blog/:slug", "routes/blog-detail.tsx"),
  route("/work", "routes/work.tsx"),
  route("/work/:slug", "routes/work-detail.tsx"),
  route("/timeline", "routes/timeline.tsx"),
  route("/slide", "routes/slide.tsx"),
] satisfies RouteConfig;
