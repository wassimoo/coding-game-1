/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage/unit",
  roots: ["<rootDir>/test"],
  testMatch: ["<rootDir>/test/unit/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
