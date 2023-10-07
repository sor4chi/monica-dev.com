function initTheme() {
  var theme = (() => {
    const before = localStorage.getItem("theme");
    if (before) {
      return before;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })();
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }
  if (theme === "light") {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }
}

initTheme();

document.addEventListener("astro:after-swap", () => {
  initTheme();
});
