module.exports = {
    override: {
        parserOptions: {
            project: './tsconfig.eslint.json',
            tsconfigRootDir: __dirname,
            sourceType: 'module',
        },
    },
    extends: ['airbnb', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    "rules": {
        "@typescript-eslint/no-explicit-any": "warn",
    },
    env: {
        browser: true,
        node: true,
    }
};