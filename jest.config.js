// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testMatch: ['<rootDir>/**/**/*.test.(ts|tsx)'],
  testEnvironment: 'jest-environment-jsdom',

  // @TODO
  // testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  // transform: {
  //   '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  // },

  // johns custom options
  restoreMocks: true,
  moduleNameMapper: {
    '^@/types/(.*)$': '<rootDir>/@types/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/icons/(.*)$': '<rootDir>/image/icons/$1',
    '^@/contexts/(.*)': '<rootDir>/contexts/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/lib': '<rootDir>/lib',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/constants': '<rootDir>/constants',
    '^@/constants/(.*)$': '<rootDir>/constants/$1',
    '^@/config': '<rootDir>/config',
    '^@/config/(.*)$': '<rootDir>/config/$1',
    '^@/__test_utils__/(.*)$': '<rootDir>/__test_utils__/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
