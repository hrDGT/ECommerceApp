import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import path from "node:path";
import globals from "globals";

export default [
  {
    ignores: ["dist", "node_modules"],
  },

  {
    files: ["src/**/*.{ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.es2021,
        React: "readonly",
        JSX: "readonly",
      }
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".tsx"],
          paths: [path.resolve("src")]
        },
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json"
        }
      }
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react,
      "react-hooks": reactHooks,
      import: importPlugin
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always"
        }
      ],
      "import/no-unresolved": "off",
      "import/named": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/set-state-in-effect": "off"
    }
  }
];
