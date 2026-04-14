import { clsx } from "clsx";
import { useCallback } from "react";

import { SITE_BASE_URL } from "@/config";
import { CheckIcon, CopyIcon, GithubIcon, XIcon } from "@/components/ui/icons";

import { styles } from "./Share.css";

interface Props {
  pathname: string;
  title: string;
  source: string;
  flex?: boolean;
}

export default function Share({ pathname, title, source, flex }: Props) {
  const shareXUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    `${title}\n`,
  )}&url=${encodeURIComponent(SITE_BASE_URL + pathname)}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    const button = document.querySelector(".link-copy-button");
    if (!button) return;
    button.classList.add("copied");
    setTimeout(() => {
      button.classList.remove("copied");
    }, 1000);
  }, []);

  return (
    <div className={clsx(styles.links, flex && styles.flex)}>
      <div className={styles.btnWrapper}>
        <button
          className={clsx(styles.btn, "link-copy-button")}
          onClick={handleCopy}
          aria-label="リンクをコピーする"
        >
          <CopyIcon className={clsx(styles.icon, styles.copyIcon)} />
          <CheckIcon className={clsx(styles.icon, styles.checkIcon)} />
        </button>
        <span className={styles.btnDescription}>Copy URL</span>
      </div>
      <div className={styles.btnWrapper}>
        <a className={styles.btn} href={source} aria-label="ソースを開く">
          <GithubIcon className={styles.icon} />
        </a>
        <span className={styles.btnDescription}>Source</span>
      </div>
      <div className={styles.btnWrapper}>
        <a
          className={styles.btn}
          href={shareXUrl}
          aria-label="X でシェアする"
        >
          <XIcon className={styles.icon} />
        </a>
        <span className={styles.btnDescription}>Share X</span>
      </div>
    </div>
  );
}
