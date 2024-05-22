module.exports = {
  extends: ["../../.eslintrc.js", "plugin:astro/recommended"],
  settings: {
    "import/core-modules": [
      "astro:content",
      "astro:assets",
      "astro:transitions",
    ],
  },
};
