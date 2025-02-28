const prettierPlugin = require("eslint-plugin-prettier");
const typescriptParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
module.exports = [
    {
        ignores: [".git/", ".github/", "node_modules/", "dist/"],
    },
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: ["./tsconfig.json", "./tsconfig.app.json", "./tsconfig.spec.json"],
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...tsPlugin.configs.all.rules,
            ...prettierPlugin.configs?.rules,
            "no-magic-number": "off",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/member-ordering": 0,
            "@typescript-eslint/naming-convention": 0,
            "@typescript-eslint/ban-types": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-magic-numbers": "off",
            "@typescript-eslint/prefer-readonly-parameter-types": "off",
            "@typescript-eslint/strict-boolean-expressions": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/class-methods-use-this": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-unsafe-type-assertion": "off",
            "@typescript-eslint/no-this-alias": "off",
            "typescript-eslint/consistent-type-imports": "off",
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },
    eslintPluginPrettierRecommended,
];
