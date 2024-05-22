module.exports = {
  extends: ["../../.eslintrc.base.js", "plugin:astro/recommended"],
  settings: {
    "import/core-modules": [
      "astro:content",
      "astro:assets",
      "astro:transitions",
    ],
  },
};
