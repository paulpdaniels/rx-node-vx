const fromOperators = require('./src/fromStream');
const toEventEmitter = require('./src/toEventEmitter');
const writeToStream = require('./src/writeToStream');

module.exports = Object.create(
  fromOperators,
  {toEventEmitter, writeToStream}
);