export default {
  '*.{js,ts,vue}': ['eslint', 'prettier --write'],
  '*.{ts,vue}': [() => 'tsc --noEmit'],
  '*.{css,scss,vue}': 'stylelint',
};
