import { join } from "path";
import { glob } from "glob";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = join(__dirname, "..");
const imagePath = join(root, "public/images");
const ext = ["jpg", "jpeg", "png", "webp"];

const resize = async (image: string, size: number) => {
  const input = join(imagePath, image);
  const filename = image.split(".")[0];
  const output = join(imagePath, `${filename}-${size}.webp`);
  await sharp(input)
    .resize({
      width: size,
      height: (size / 1200) * 630,
      fit: "cover",
    })
    .toFile(output);
};

const globImages = async () => {
  const images = glob
    .sync(`${imagePath}/**/*.{${ext.join(",")}}`)
    .filter((image) => image.match(/-\d+\.webp$/) === null);
  return images.map((image) => image.replace(`${imagePath}/`, ""));
};

const main = async () => {
  const images = await globImages();
  for (const image of images) {
    await resize(image, 640);
  }
};

main();
