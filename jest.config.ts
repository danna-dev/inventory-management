export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: 'test/.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/migrations/**',
    '!src/config/**',
    '!src/**/constants/**',
    '!src/**/dto/**',
    '!src/**/entities/**',
    '!src/database/**',
    '!src/**/*.module.ts',
  ],
  coverageDirectory: './coverage',
  testTimeout: 30000,
};
