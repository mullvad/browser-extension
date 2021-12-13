module.exports = {
  '*.{js,ts,css,vue}': ['eslint'],
  '*.{ts,vue}': [() => 'tsc --noEmit'],
};
