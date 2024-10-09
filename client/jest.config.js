module.exports = {
  // Use Babel to transform JavaScript and JSX files for testing
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  // Mock CSS and style files to avoid errors during tests
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },

  // Set the test environment to jsdom, which simulates a browser environment for React testing
  testEnvironment: "jsdom",
};
