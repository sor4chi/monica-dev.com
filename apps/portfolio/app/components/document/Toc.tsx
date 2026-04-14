import { clsx } from "clsx";
import { useCallback, useRef, useState } from "react";

import type { Heading } from "@/lib/content.server";

import { styles } from "./Toc.css";

interface Props {
  headings: Heading[];
}

export default function Toc({ headings }: Props) {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ref callback: set up observer when the list mounts, clean up on unmount
  const listRef = useCallback(
    (node: HTMLUListElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;

      const observer = new IntersectionObserver((entries) => {
        setActiveIds((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              next.add(entry.target.id);
            } else {
              next.delete(entry.target.id);
            }
          }
          return next;
        });
      });

      const articleHeadings = document.querySelectorAll(
        "#article h2, #article h3, #article h4, #article h5, #article h6",
      );
      articleHeadings.forEach((heading) => observer.observe(heading));
      observerRef.current = observer;
    },
    // Re-run when headings change (different article)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headings],
  );

  return (
    <ul className={styles.toc} id="toc-list" ref={listRef}>
      {headings.map((item) => (
        <li key={item.slug} className={styles.tocItem}>
          <a
            href={`#${item.slug}`}
            className={clsx(
              styles.link,
              activeIds.has(item.slug) && "toc-active",
            )}
            style={{ paddingLeft: `${item.depth - 2}rem` }}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
