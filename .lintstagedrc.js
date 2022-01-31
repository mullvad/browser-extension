module.exports = {
  '*.{js,ts,vue}': ['eslint', 'prettier --write', 'jest --bail --findRelatedTests'],
  '*.{ts,vue}': [() => 'tsc --noEmit'],
  '*.{css,scss,vue}': 'stylelint',
};
