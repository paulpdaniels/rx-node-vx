const Rx = require('rxjs');

function afterSubscribe(fn) {
  return source => new Rx.Observable(observer => {
    const subscription = source.subscribe(observer);
    try {
      fn();
    } catch (e) {
      observer.error(e);
      subscription.unsubscribe();
    }

    return subscription;
  });
}

function fromStream(stream, finishEventName, dataEventName) {
  stream.pause();

  finishEventName || (finishEventName = 'end');
  dataEventName || (dataEventName = 'data');

  return Rx.Observable.merge(
    Rx.Observable.fromEvent(stream, dataEventName),
    Rx.Observable.fromEvent(stream, 'error', e => { throw e; })
  )
    .takeUntil(Rx.Observable.fromEvent(stream, finishEventName))
    .let(afterSubscribe(() => stream.resume()))
    .share();
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