module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
};
