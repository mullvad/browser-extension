module.exports = {
  '*.{js,ts,vue}': ['eslint', 'jest --bail --findRelatedTests'],
  '*.{ts,vue}': [() => 'tsc --noEmit'],
};
