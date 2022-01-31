/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx', 'vue'],
  setupFiles: ['jest-webextension-mock'],
  collectCoverageFrom: ['src/{components,composables,helpers,popup}/**/*.{ts,vue}'],
};
