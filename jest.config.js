module.exports = {
  verbose: false,
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["./test/setupTests.js"],
  globalTeardown: "./test/teardown.js",
  globals: {
    SEQ_DATABASE: 'mydb_test',
    SEQ_LOGGING: false,
    SEQ_FORCE: true,
  }
};
