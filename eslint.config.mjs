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
  {
    rules: {
      // Disable unused variables warning
      "@typescript-eslint/no-unused-vars": "off",
      
      // Disable the expression warning
      "@typescript-eslint/no-unused-expressions": "off",
      
      // Additional recommended rules to disable for Next.js projects
      // "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-empty-function": "off",
    },
  },
];

export default eslintConfig;