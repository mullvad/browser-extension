export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@vueuse|vue-demi)/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx', 'vue'],
  setupFiles: ['jest-webextension-mock', './jest.setup.js'],
  collectCoverageFrom: ['src/{components,composables,helpers,popup}/**/*.{ts,vue}'],
  globals: {
    __DEV__: false,
  },
};
