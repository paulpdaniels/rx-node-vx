const Rx = require('rxjs');

function fromStream(stream, finishEventName, dataEventName) {
  stream.pause();

  finishEventName || (finishEventName = 'end');
  dataEventName || (dataEventName = 'data');

  return new Rx.Observable(observer => {
    const dataHandler = data => observer.next(data);
    const errorHandler = err => observer.error(err);
    const completeHandler = () => observer.complete();

    stream.addListener(dataEventName, dataHandler);
    stream.addListener('error', errorHandler);
    stream.addListener(finishEventName, completeHandler);

    stream.resume();

    return () => {
      stream.removeListener(dataEventName, dataHandler);
      stream.removeListener('error', errorHandler);
      stream.removeListener(finishEventName, completeHandler);
    }
  }).share();
}

function fromReadableStream(stream, dataEventName) {
  return fromStream(stream, 'end', dataEventName);
}

function fromReadLineStream(stream) {
  return fromStream(stream, 'close', 'line');
}

function fromWritableStream(stream) {
  return fromStream(stream, 'finish');
}

function fromTransformStream(stream, dataEventName) {
  return fromStream(stream, 'finish', dataEventName);
}

module.exports = {
  fromStream,
  fromReadableStream,
  fromReadLineStream,
  fromWritableStream,
  fromTransformStream
};