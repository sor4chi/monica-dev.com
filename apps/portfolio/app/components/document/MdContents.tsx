import { clsx } from "clsx";
import { useCallback, useRef } from "react";

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

function initLinkCards(container: HTMLElement) {
  const links = container.querySelectorAll(
    "a.link-card:not([data-initialized])",
  );
  for (const link of links) {
    const url = link.getAttribute("href");
    if (!url) continue;

    link.setAttribute("data-initialized", "true");

    const isInternalLink = url.startsWith("/");
    const fullUrl = isInternalLink ? SITE_BASE_URL + url : url;

    const card = document.createElement("a");
    card.className = "link-card";
    card.setAttribute("data-initialized", "true");
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
  }
}

export default function MdContents({ html }: Props) {
  const initializedHtmlRef = useRef<string | null>(null);

  // ref callback: runs when element mounts or re-attaches
  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || initializedHtmlRef.current === html) return;
      initializedHtmlRef.current = html;
      initLinkCards(node);
    },
    [html],
  );

  // Event delegation for code copy buttons (no useEffect needed)
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const copyButton = target.closest(".code-copy-button");
    if (!copyButton) return;

    const code = copyButton.parentElement?.querySelector("code");
    if (!code) return;

    copyButton.classList.add("copied");
    navigator.clipboard.writeText(code.innerText);
    setTimeout(() => copyButton.classList.remove("copied"), 1000);
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(styles.contents, "markdown-contents")}
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={handleClick}
    />
  );
}
