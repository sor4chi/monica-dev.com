/** @type {import("prettier").Config} */
export default {
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
