module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                printWidth: 80,
                'editor.formatOnSave': true,
                proseWrap: 'always',
                tabWidth: 4,
                requireConfig: false,
                useTabs: false,
                trailingComma: 'none',
                bracketSpacing: true,
                jsxBracketSameLine: false,
                semi: true
            }
        ]
    }
};
