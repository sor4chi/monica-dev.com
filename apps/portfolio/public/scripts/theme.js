function initTheme() {
  let theme
  try {
    theme = localStorage.getItem('theme')
  } catch {
    /* Storage can be disabled. */
  }
  const dark =
    theme === 'dark' ||
    (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.classList.toggle('light', !dark)
}

initTheme()
document.addEventListener('astro:after-swap', initTheme)
