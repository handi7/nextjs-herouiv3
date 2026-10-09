import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import sonarjs from "eslint-plugin-sonarjs";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  {
    rules: {
      "sort-imports": "off",
      "import/order": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { sonarjs },
    rules: {
      complexity: ["error", 15],
      "sonarjs/cognitive-complexity": ["error", 15],
    },
  },
  {
    // <Icon> is for icon names that come from data (e.g. the database). Static icons are
    // imported directly from lucide-react so they are tree-shaken and type-checked.
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...[
          "JSXOpeningElement[name.name='Icon'] > JSXAttribute[name.name='name'] > Literal",
          "JSXOpeningElement[name.name='Icon'] > JSXAttribute[name.name='name'] > JSXExpressionContainer > Literal",
          "JSXOpeningElement[name.name='Icon'] > JSXAttribute[name.name='name'] > JSXExpressionContainer > TemplateLiteral[expressions.length=0]",
        ].map((selector) => ({
          selector,
          message:
            "Static icon: import it from lucide-react (e.g. `import { PlusIcon } from \"lucide-react\"`). <Icon> is only for icon names from dynamic data.",
        })),
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
