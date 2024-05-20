export class MetaParser {
	title = "";
	description = "";
	imageUrl = "";
	faviconUrl = "";

	element(element: Element) {
		if (element.tagName === "meta") {
			switch (element.getAttribute("property")) {
				case "og:title":
					if (this.title) break;
					this.title = element.getAttribute("content") ?? "";
					break;
				case "og:description":
					if (this.description) break;
					this.description = element.getAttribute("content") ?? "";
					break;
				case "og:image":
					if (this.imageUrl) break;
					this.imageUrl = element.getAttribute("content") ?? "";
					break;
			}
			switch (element.getAttribute("name")) {
				case "title":
					if (this.title) break;
					this.title = element.getAttribute("content") ?? "";
					break;
				case "description":
				case "twitter:description":
					if (this.description) break;
					this.description = element.getAttribute("content") ?? "";
					break;
				case "twitter:image":
					if (this.imageUrl) break;
					this.imageUrl = element.getAttribute("content") ?? "";
					break;
			}
		}
		if (element.tagName === "link") {
			switch (element.getAttribute("rel")) {
				case "icon":
				case "shortcut icon":
					if (this.faviconUrl) break;
					this.faviconUrl = element.getAttribute("href") ?? "";
					break;
			}
		}
	}

	text(text: Text) {
		if (this.title) return;
		this.title = text.text;
	}
}
