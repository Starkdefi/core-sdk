module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '@starknet-react/chains': '<rootDir>/src/__mocks__/starknet-react-chains.js'
  },
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};
