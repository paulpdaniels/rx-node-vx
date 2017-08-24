const {
  fromStream,
  fromReadableStream,
  fromReadLineStream,
  fromWritableStream,
  fromTransformStream
} = require('../src/fromStream');

const toEventEmitter = require('../src/toEventEmitter');
const writeToStream = require('../src/writeToStream');

module.exports = {
  fromStream: (finishEventName, dataEventName) => source => fromStream(source, finishEventName, dataEventName),
  fromReadableStream: (dataEventName) => source => fromReadableStream(source, dataEventName),
  fromReadLineStream: () => source => fromReadLineStream(source),
  fromWritableStream: () => source => fromWritableStream(source),
  fromTransformStream: (dataEventName) => source => fromTransformStream(source, dataEventName),
  writeToStream: (nodeStream, encoding) => source => writeToStream(source, nodeStream, encoding),
  toEventEmitter: (eventName, selector) => source => toEventEmitter(source, eventName, selector)
};
