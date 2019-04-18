const {sync} = require('./utilities/syncDb');

try {
  sync().then(() => process.exit(0));
} catch (e) {
  throw e;
}
