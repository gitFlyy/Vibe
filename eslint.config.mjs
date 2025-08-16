import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Ignore generated files
  {
    ignores: [
      "**/generated/**/*",
      "**/src/generated/**/*",
      "src/generated/**/*",
      "**/node_modules/**/*",
      ".next/**/*",
      "out/**/*",
      "build/**/*"
    ]
  },
  // Override rules for TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Turn off TS-specific and base unused-vars to avoid duplicate reporting
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
    }
  },
];

export default eslintConfig;
