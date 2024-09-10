/// <reference types="mdast-util-to-hast" />
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import { visit } from "unist-util-visit";

import {
	createRehypeHandlers,
	createRemarkPlugin,
	createRemarkRehypePlugin,
} from "../utils/remark-factory";

import type { Image } from "mdast";

export interface Video extends Omit<Image, "type"> {
	type: "video";
}

declare module "mdast" {
	interface BlockContentMap {
		video: Video;
	}
	interface RootContentMap {
		video: Video;
	}
}

const isVideoSrc = (src: string) => {
	return /\.(mp4|webm|ogg|mov|avi|flv|wmv|mkv|3gp)$/i.test(src);
};

const plugin = createRemarkPlugin(() => {
	return async (tree) => {
		visit(tree, "image", (node, index, parent) => {
			if (index === undefined || parent === undefined) return;
			if (!isVideoSrc(node.url)) return;

			const video: Video = {
				...node,
				type: "video",
			};

			parent.children[index] = video;
		});
	};
});

const handlers = createRehypeHandlers({
	video: (_, node: Video) => {
		const hastElement = h("video", {
			src: node.url,
			alt: node.alt,
			title: node.title,
			playsinline: true,
			loop: true,
			autoplay: true,
		});
		return hastElement;
	},
});

export const remarkVideo = createRemarkRehypePlugin(plugin, handlers);
