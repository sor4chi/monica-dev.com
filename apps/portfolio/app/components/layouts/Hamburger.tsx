import { useCallback, useRef } from "react";

import { styles } from "./Humberger.css";

export default function Hamburger() {
  const isAnimatingRef = useRef(false);

  const handleClick = useCallback(() => {
    if (isAnimatingRef.current) return;

    const button = document.querySelector("#navigation-toggle");
    const main = document.querySelector("main");
    const backward = document.querySelector("#backward");
    if (!button || !main || !backward) return;

    isAnimatingRef.current = true;
    button.classList.toggle("is-active");
    main.classList.toggle("is-active");

    if (backward.classList.contains("is-active")) {
      backward.classList.remove("is-active");
      setTimeout(() => {
        backward.classList.remove("is-visibility-active");
        isAnimatingRef.current = false;
      }, 300);
    } else {
      backward.classList.add("is-visibility-active");
      setTimeout(() => {
        backward.classList.add("is-active");
        isAnimatingRef.current = false;
      }, 300);
    }
  }, []);

  return (
    <button
      id="navigation-toggle"
      className={styles.button}
      aria-label="ナビゲーションを開閉する"
      onClick={handleClick}
    >
      <span className={styles.lines} />
      <span className={styles.lines} />
      <span className={styles.lines} />
    </button>
  );
}
