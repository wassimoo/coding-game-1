/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage/integration",
  coveragePathIgnorePatterns: ["test/*", "src/database/*"],
  roots: ["<rootDir>/test"],
  testMatch: ["<rootDir>/test/integration/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  globalSetup: "<rootDir>/test/integration/db/init.ts",
  globalTeardown: '<rootDir>/test/integration/test-teardown-globals.js',
};
