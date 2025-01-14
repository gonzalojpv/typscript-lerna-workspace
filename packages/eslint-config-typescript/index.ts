import { Linter } from "eslint";

const config: Linter.Config = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    // "import",
    "@typescript-eslint",
    "no-only-tests",
    "no-skip-tests",
  ],
  extends: [
    "eslint:recommended",
    "@prismatic-io/eslint-config-spectral",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:import/recommended",
    // "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".js"],
        moduleDirectory: ["src", "node_modules"],
      },
    },
  },
  globals: {
    fetch: "false",
    __DEV__: "readonly",
  },

  env: {
    jest: true,
  },
  rules: {
    // Import Rules
    "import/extensions": [
      1,
      "never",
      {
        svg: "always",
        json: "always",
        fragments: "always",
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],

    // General Rules
    "no-console": "warn",
    "no-plusplus": "off",
    "no-nested-ternary": "off",
    "arrow-body-style": "off",
    "consistent-return": "off",
    curly: ["error", "all"],
    "implicit-arrow-linebreak": "off",
    "no-use-before-define": "off",
    "no-unused-vars": "off", // Disable and use '@typescript-eslint/no-unused-vars' instead
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        variables: false,
        functions: false,
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
  },
};

export default config;
