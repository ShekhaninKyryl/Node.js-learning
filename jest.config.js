process.env.SEQ_DATABASE = 'mydb_test';
process.env.SEQ_LOGGING = '';
process.env.SEQ_FORCE = 'true';

// const worker_process = child_process.fork("./src/syncDb");
// worker_process.on('exit', function (code) {
//   console.log('child process exited with code ' + code);
// });

module.exports = {
  verbose: false,
};
