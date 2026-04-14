import { clsx } from "clsx";
import { useEffect } from "react";

import type { Heading } from "@/lib/content.server";

import { styles } from "./Toc.css";

interface Props {
  headings: Heading[];
}

export default function Toc({ headings }: Props) {
  useEffect(() => {
    const articleHeadings = document.querySelectorAll(
      "#article h2, #article h3, #article h4, #article h5, #article h6",
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target } = entry;
        const toc = document.querySelector(
          `#toc-list a[href="#${target.id}"]`,
        );
        if (!toc) return;
        if (entry.isIntersecting) {
          toc.classList.add("toc-active");
        } else {
          toc.classList.remove("toc-active");
        }
      });
    });
    articleHeadings.forEach((heading) => {
      observer.observe(heading);
    });
    return () => observer.disconnect();
  }, [headings]);

  return (
    <ul className={styles.toc} id="toc-list">
      {headings.map((item) => (
        <li key={item.slug} className={styles.tocItem}>
          <a
            href={`#${item.slug}`}
            className={clsx(styles.link, "toc-anchor")}
            style={{ paddingLeft: `${item.depth - 2}rem` }}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
