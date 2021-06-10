module.exports = {
  root: true,

  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
};
