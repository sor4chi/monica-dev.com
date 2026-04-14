import { clsx } from "clsx";
import { useEffect, useRef } from "react";

import { SITE_BASE_URL } from "@/config";

import { styles } from "./MdContents.css";

interface Props {
  html: string;
}

function getUnescapedText(text: string) {
  if (typeof document === "undefined") return text;
  const div = document.createElement("div");
  div.innerHTML = text;
  return div.textContent || div.innerText || "";
}

function initCodeblock(container: HTMLElement) {
  const codeCopyButtons = container.querySelectorAll(
    ".code-copy-button:not([data-initialized])",
  );
  codeCopyButtons.forEach((button) => {
    button.setAttribute("data-initialized", "true");
    button.addEventListener("click", () => {
      const code = button.parentElement?.querySelector("code");
      if (!code) return;
      button.classList.add("copied");
      navigator.clipboard.writeText(code.innerText);
      setTimeout(() => {
        button.classList.remove("copied");
      }, 1000);
    });
  });
}

function initLinkCard(container: HTMLElement) {
  const links = container.querySelectorAll(
    "a.link-card:not([data-link-card-initialized])",
  );
  links.forEach((link) => {
    const url = link.getAttribute("href");
    if (!url) return;

    link.setAttribute("data-link-card-initialized", "true");

    const isInternalLink = url.startsWith("/");
    const fullUrl = isInternalLink ? SITE_BASE_URL + url : url;

    const card = document.createElement("a");
    card.className = "link-card";
    card.setAttribute("data-link-card-initialized", "true");
    card.href = url;
    if (!isInternalLink) {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    const contentDiv = document.createElement("div");
    contentDiv.className = "link-card__content";

    const titleSpan = document.createElement("span");
    titleSpan.className = "link-card__title";
    titleSpan.textContent = "Loading...";

    const metaDiv = document.createElement("div");
    metaDiv.className = "link-card__meta";

    const domainDiv = document.createElement("div");
    domainDiv.className = "link-card__domain";
    domainDiv.textContent = new URL(fullUrl).hostname;

    metaDiv.appendChild(domainDiv);
    contentDiv.appendChild(titleSpan);
    contentDiv.appendChild(metaDiv);
    card.appendChild(contentDiv);

    link.replaceWith(card);

    fetch(`https://embed.monica-dev.com/meta?url=${fullUrl}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not OK");
        return res.json();
      })
      .then((data) => {
        titleSpan.textContent = getUnescapedText(data.title);
        if (data.imageUrl) {
          const img = document.createElement("img");
          img.className = "link-card__image";
          img.src = data.imageUrl;
          img.alt = data.title;
          card.insertBefore(img, contentDiv);
        }
        if (data.faviconUrl) {
          const favicon = document.createElement("span");
          favicon.className = "link-card__favicon";
          favicon.style.backgroundImage = `url(${data.faviconUrl})`;
          metaDiv.insertBefore(favicon, domainDiv);
        }
      })
      .catch(() => {
        titleSpan.textContent = url;
      });
  });
}

export default function MdContents({ html }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    initCodeblock(ref.current);
    initLinkCard(ref.current);
  }, [html]);

  return (
    <div
      ref={ref}
      className={clsx(styles.contents, "markdown-contents")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
