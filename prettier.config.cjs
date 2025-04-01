/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  bracketSpacing: false,
  bracketSameLine: false,
  jsxSingleQuote: true,
  singleQuote: true,
  quoteProps: "as-needed",
  semi: false,
  trailingComma: "es5",
  arrowParens: "always",
  printWidth: 100,
};

module.exports = config;