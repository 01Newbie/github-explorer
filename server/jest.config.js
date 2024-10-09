export default {
  // Specifies the testing environment to be "node"
  testEnvironment: "node",

  // Transform configuration for handling files before testing
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },

  // List of file extensions that Jest will recognize and test
  moduleFileExtensions: ["js", "json", "node", "jsx"],

  // Specifies where to find test files
  testMatch: ["**/test/**/*.test.js"],
};
