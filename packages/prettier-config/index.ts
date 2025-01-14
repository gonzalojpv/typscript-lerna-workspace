import { Options } from "prettier";

const config: Options = {
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  printWidth: 100,
  arrowParens: "always",
  proseWrap: "preserve",
  overrides: [
    {
      files: "*.yml",
      options: {
        parser: "yaml",
        semi: false,
      },
    },
    {
      files: ["*.tsx", "*.ts"],
      options: {
        parser: "typescript",
        arrowParens: "avoid",
      },
    },
  ],
};

export default config;
