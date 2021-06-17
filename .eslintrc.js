module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 更改规则后请重启！
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off', // 函数变量前没有空格
    // 'no-extra-semi': 0,
    semi: 0, // 允许多余的分号
    'prefer-const': 'off', // 强行替换let为count
    'no-unused-vars': 'off' //声明但没使用的变量
  }
};
