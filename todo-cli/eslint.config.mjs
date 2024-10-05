import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    ignores: ["migrations/", "models/", "node_modules/"],
  },
  {
    rules: {
      "no-console": "off",
      semi: ["error", "always"],
    },
  },
];
