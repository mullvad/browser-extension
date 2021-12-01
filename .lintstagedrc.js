module.exports = {
  '*.{ts|vue|js}': ['eslint --cache', () => 'tsc --noEmit'],
  '*.+(json|ts|vue|js)': ['prettier --write'],
};
