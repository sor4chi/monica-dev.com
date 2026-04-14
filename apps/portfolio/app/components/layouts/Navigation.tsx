import { clsx } from "clsx";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

import Link from "@/components/ui/Link";
import { styles as linkStyles } from "@/components/ui/Link.css";
import { GithubIcon, XIcon } from "@/components/ui/icons";

import { styles } from "./Navigation.css";
import { useNavigation } from "./NavigationContext";

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
  const { isOpen, close } = useNavigation();

  const active = NAV_LINKS.find(
    (l) =>
      l.href === location.pathname ||
      (l.href !== "/" && location.pathname.startsWith(l.href)),
  )?.href;

  const handleLinkClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      close();
      setTimeout(() => {
        navigate(href);
      }, 300);
    },
    [navigate, close],
  );

  return (
    <div
      className={clsx(
        styles.backward,
        isOpen && "is-visibility-active",
        isOpen && "is-active",
      )}
    >
      {NAV_LINKS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={clsx(linkStyles.link, styles.link, {
            [styles.active]: href === active,
          })}
          onClick={(e) => handleLinkClick(e, href)}
        >
          {href === active && <span className={styles.activeDot} />}
          {label}
        </a>
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
