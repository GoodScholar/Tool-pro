module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    parserOptions: {
        parser: '@babel/eslint-parser',
        jsx: 'preserve',
        requireConfigFile: false
    },
    rules: {
        'eol-last': 0,
        'func-call-spacing': 'off',
        'no-callback-literal': 0,
        indent: ['off', 2],
        camelcase: 'off',
        'vue/no-v-model-argument': 'off',
        'space-before-function-paren': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}