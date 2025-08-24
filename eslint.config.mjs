import js from "@eslint/js";
import ts from "@vue/eslint-config-typescript";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    ignores: ["node_modules", ".output", ".nuxt", "dist"], // игнор папки
  },
  js.configs.recommended,
  ...ts(),
  ...pluginVue.configs["flat/recommended"],
  prettier,
  {
    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // Стиль импорта
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Проверка на неиспользуемые импорты/переменные
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: true }],

      // Vue style
      "vue/multi-word-component-names": "off",

      // Import checks
      "import/order": "off", // отключаем в пользу simple-import-sort
    },
  },
];
