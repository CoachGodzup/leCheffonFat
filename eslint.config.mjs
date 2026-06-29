import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "node_modules/**",
    ".turbo/**",
  ]),
  unicorn.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      // Unicorn overrides
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": [
        "error",
        {
          cases: { kebabCase: true, pascalCase: true },
          ignore: [String.raw`^next\.config\.ts$`, String.raw`^.*\.d\.ts$`],
        },
      ],
      "unicorn/no-array-for-each": "off",
      "unicorn/no-nested-ternary": "off",
    },
  },
]);

export default eslintConfig;
