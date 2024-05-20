/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-sql",
    "prettier-plugin-organize-imports",
  ],
};

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const prettierPluginSqlConfig = {
  language: "postgresql",
  keywordCase: "upper",
};

const config = {
  ...prettierConfig,
  ...prettierPluginSqlConfig,
};

export default config;
