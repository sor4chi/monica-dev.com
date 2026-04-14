import { clsx } from "clsx";
import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

import Link from "@/components/ui/Link";
import { GithubIcon, XIcon } from "@/components/ui/icons";

import { styles } from "./Navigation.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Works" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blogs" },
  { href: "/slide", label: "Slides" },
] as const;

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const backwardRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const active = NAV_LINKS.find(
    (l) =>
      l.href === location.pathname ||
      (l.href !== "/" && location.pathname.startsWith(l.href)),
  )?.href;

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const backward = backwardRef.current;
      const toggle = document.querySelector("#navigation-toggle");
      const main = document.querySelector("main");
      if (backward) backward.classList.remove("is-active");
      if (toggle) toggle.classList.remove("is-active");
      if (main) main.classList.remove("is-active");
      setTimeout(() => {
        navigate(href);
      }, 300);
    },
    [navigate],
  );

  useEffect(() => {
    const backward = backwardRef.current;
    if (backward) {
      backward.classList.remove("is-active", "is-visibility-active");
    }
    const toggle = document.querySelector("#navigation-toggle");
    if (toggle) toggle.classList.remove("is-active");
    const main = document.querySelector("main");
    if (main) main.classList.remove("is-active");
    isAnimatingRef.current = false;
  }, [location.pathname]);

  return (
    <div className={styles.backward} id="backward" ref={backwardRef}>
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          exClass={clsx("backward-internal-link", styles.link, {
            [styles.active]: href === active,
          })}
        >
          <span
            onClick={(e) =>
              handleLinkClick(
                e as unknown as React.MouseEvent<HTMLAnchorElement>,
                href,
              )
            }
            style={{ display: "contents" }}
          >
            {href === active && <span className={styles.activeDot} />}
            {label}
          </span>
        </Link>
      ))}
      <hr className={styles.line} />
      <div className={styles.social}>
        <Link href="https://x.com/sor4chi" ariaLabel="Twitter / X を開く">
          <XIcon className={styles.icon} />
        </Link>
        <Link href="https://github.com/sor4chi" ariaLabel="Githubを開く">
          <GithubIcon className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
