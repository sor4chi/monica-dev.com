import fs from "fs";
import path from "path";

import { registerFont, createCanvas, loadImage } from "canvas";
import { load } from "js-yaml";
import pico from "picocolors";
import { md5 } from "js-md5";

const OGP_WIDTH = 1200;
const OGP_HEIGHT = 630;

const FONT_SIZE = 80;
const MAX_TITLE_WIDTH = OGP_WIDTH - FONT_SIZE * 2;

const PATH_PUBLIC_DIR = path.join(process.cwd(), "public");
const PATH_OGP_DIR = path.join(PATH_PUBLIC_DIR, "images/ogp");
const PATH_OGP_CACHE_DIR = path.join(process.cwd(), ".cache");
const PATH_OGP_CACHE_FILE = path.join(PATH_OGP_CACHE_DIR, "ogp.json");
const PATH_OGP_IMAGE_DIR = (slug: string[]) =>
  path.join(PATH_OGP_DIR, ...slug.slice(0, -1));
const PATH_OGP_IMAGE_FILE = (slug: string[]) =>
  path.join(PATH_OGP_DIR, ...slug);
const PATH_OGP_BASE_IMAGE_FILE = path.join(PATH_OGP_DIR, "base.png");

const PATH_TARGET_WORKS_DIR = path.join(process.cwd(), "src/content/works");
const PATH_TARGET_BLOGS_DIR = path.join(process.cwd(), "src/content/blogs");

type State = "new" | "update" | "delete";
const stateLabel = (state: State) => {
  switch (state) {
    case "new":
      return pico.green(`[${state}]`);
    case "update":
      return pico.yellow(`[${state}]`);
    case "delete":
      return pico.red(`[${state}]`);
  }
};

registerFont(
  path.join(process.cwd(), "public/fonts/ZenKakuGothicNew-Regular.ttf"),
  {
    family: "Zen Kaku Gothic New",
  },
);

registerFont(path.join(process.cwd(), "public/fonts/Nunito-Regular.ttf"), {
  family: "Nunito",
});

const createOgp = async (
  state: Exclude<State, "delete">,
  title: string,
  slug: string[],
) => {
  const canvas = createCanvas(OGP_WIDTH, OGP_HEIGHT);
  const ctx = canvas.getContext("2d");
  const baseImage = await loadImage(PATH_OGP_BASE_IMAGE_FILE);
  ctx.drawImage(baseImage, 0, 0, OGP_WIDTH, OGP_HEIGHT);
  ctx.font = `${FONT_SIZE}px "Nunito", "Zen Kaku Gothic New", sans-serif`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";

  const titleWidth = ctx.measureText(title).width;
  if (titleWidth > MAX_TITLE_WIDTH) {
    const titleArray = title.split("");
    const TITLE_HEIGHT = FONT_SIZE * Math.ceil(titleWidth / MAX_TITLE_WIDTH);
    let titleLine = "";
    let titleLines = [];
    titleArray.forEach((char) => {
      if (ctx.measureText(titleLine + char).width > MAX_TITLE_WIDTH) {
        titleLines.push(titleLine);
        titleLine = "";
      }
      titleLine += char;
    });
    titleLines.push(titleLine);
    titleLines.forEach((line, index) => {
      ctx.fillText(
        line,
        OGP_WIDTH / 2,
        OGP_HEIGHT / 2 - TITLE_HEIGHT / 2 + FONT_SIZE * 1.5 * index,
      );
    });
  } else {
    ctx.fillText(title, OGP_WIDTH / 2, OGP_HEIGHT / 2);
  }

  const imgDir = PATH_OGP_IMAGE_DIR(slug);
  const imgPath = PATH_OGP_IMAGE_FILE(slug);
  canvas.toBuffer((err, buf) => {
    if (err) throw err;
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    fs.writeFile(imgPath, buf, () => {
      console.log(
        `${stateLabel(state)} ${imgPath.replace(PATH_PUBLIC_DIR, "")}`,
      );
    });
  });
};

interface OgpItem {
  title: string;
  slug: string[];
  hash: string;
}

interface OgpCache {
  // joined-slug: hash
  [key: string]: string;
}

const createOgpAll = async () => {
  const works = fs.readdirSync(PATH_TARGET_WORKS_DIR);
  const blogs = fs.readdirSync(PATH_TARGET_BLOGS_DIR);
  const ogpItems: OgpItem[] = [
    {
      title: "Monica's Portfolio",
      slug: ["default.png"],
      hash: md5("Monica's Portfolio"),
    },
  ];
  let ogpCaches: OgpCache = {};
  if (fs.existsSync(PATH_OGP_CACHE_DIR) && fs.existsSync(PATH_OGP_CACHE_FILE)) {
    const cache = fs.readFileSync(PATH_OGP_CACHE_FILE, "utf8");
    if (cache) {
      try {
        ogpCaches = JSON.parse(cache);
      } catch (e) {
        ogpCaches = {};
      }
    }
  }

  works.forEach((target) => {
    const fp = path.join(PATH_TARGET_WORKS_DIR, target);
    const text = fs.readFileSync(fp, "utf8");
    const frontMatter = text.split("---")[1];
    const work = load(frontMatter) as any;
    ogpItems.push({
      title: work.title,
      slug: ["works", target.replace(".md", ".png")],
      hash: md5(work.title),
    });
  });

  blogs.forEach((target) => {
    const fp = path.join(PATH_TARGET_BLOGS_DIR, target);
    const text = fs.readFileSync(fp, "utf8");
    const frontMatter = text.split("---")[1];
    const blog = load(frontMatter) as any;
    ogpItems.push({
      title: blog.title,
      slug: ["blogs", target.replace(".md", ".png")],
      hash: md5(blog.title),
    });
  });

  const cacheKeys = new Set(Object.keys(ogpCaches));

  await Promise.all(
    ogpItems.map(async (item) => {
      const joinedSlug = item.slug.join("/");
      const cacheHash = ogpCaches[joinedSlug];
      // キャッシュが存在しない場合は new
      if (!cacheHash) {
        await createOgp("new", item.title, item.slug);
      }
      // hash がキャッシュ一致しない場合は update
      else if (cacheHash !== item.hash) {
        await createOgp("update", item.title, item.slug);
        cacheKeys.delete(joinedSlug);
      } else {
        cacheKeys.delete(joinedSlug);
      }
      ogpCaches[joinedSlug] = item.hash;
    }),
  );

  // キャッシュにあったが、ファイルが存在しない場合は delete
  cacheKeys.forEach((key) => {
    console.log(`${stateLabel("delete")} ${key}`);
  });

  if (!fs.existsSync(PATH_OGP_CACHE_DIR)) {
    fs.mkdirSync(PATH_OGP_CACHE_DIR, { recursive: true });
  }
  fs.writeFileSync(PATH_OGP_CACHE_FILE, JSON.stringify(ogpCaches));
};

createOgpAll();
