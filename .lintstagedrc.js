module.exports = {
  '*.{js,ts,vue}': ['eslint'],
  '*.{ts,vue}': [() => 'tsc --noEmit'],
};
