module.exports = {
  '*.{js,ts,css}': ['eslint'],
  '*.{ts,vue}': [() => 'tsc --noEmit'],
};
