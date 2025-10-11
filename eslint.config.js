import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [["@babel/preset-react", { runtime: "automatic" }]],
        },
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
      ecmaVersion: 2021,
    },

    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      prettier: pluginPrettier,
      import: require("eslint-plugin-import"),
    },

    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-undef": "error",
      "react/react-in-jsx-scope": "off",
      "import/no-unresolved": "error", // catches missing files or typos in imports
      "import/named": "error", // catches named imports that don’t exist
      "import/default": "error", // catches default imports that are missing
      "import/namespace": "error", // catches namespace import issues
    },

    settings: {
      react: {
        version: "detect",
        jsxRuntime: "automatic",
      },
    },
  },

  // Prettier last
  configPrettier,
]);
