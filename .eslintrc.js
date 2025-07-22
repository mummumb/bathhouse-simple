module.exports = {
  extends: ["next/core-web-vitals", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@/features/*", "@/components/ui/*"],
      },
    ],
    "no-console": "warn",
    "no-unused-vars": "warn",
    "prefer-const": "error",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    "react-hooks/exhaustive-deps": "warn",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
    "arrow-body-style": ["error", "as-needed"],
    "react/jsx-curly-brace-presence": ["error", "never"],
    "import/no-default-export": "error",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["app/**/*.ts", "app/**/*.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["middleware.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["next.config.mjs"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["postcss.config.mjs"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["tailwind.config.js"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["jest.config.js"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["jest.setup.js"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["scripts/**/*.ts"],
      rules: {
        "no-console": "off",
      },
    },
  ],
}
