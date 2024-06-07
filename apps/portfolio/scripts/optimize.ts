import { rm } from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";

import { glob } from "glob";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = join(__dirname, "..");
const ext = ["jpg", "jpeg", "png", "webp"];

const resize = async (image: string, size: number) => {
  const input = join(process.cwd(), image);
  const filename = image.split(".")[0];
  const output = join(process.cwd(), `${filename}-${size}.webp`);
  await sharp(input)
    .webp({ quality: 80 })
    .resize({
      width: size,
    })
    .toFile(output);
};

const globImages = async (dir: string) => {
  const images = glob.sync(`${process.cwd()}/${dir}/**/*.{${ext.join(",")}}`);
  return images.map((image) => image.replace(`${process.cwd()}/`, ""));
};

const optimizedImageRegex = /-\d+\.webp$/;
const isOptimizedPath = (path: string) => optimizedImageRegex.test(path);

const main = async () => {
  const images = await globImages("public/assets/works");
  const optimizedImages = images.filter(isOptimizedPath);
  const originalImages = images.filter((image) => !isOptimizedPath(image));
  await Promise.all(optimizedImages.map((image) => rm(image)));
  await Promise.all(originalImages.map((image) => resize(image, 800)));
  await Promise.all(originalImages.map((image) => resize(image, 640)));
};

main();
