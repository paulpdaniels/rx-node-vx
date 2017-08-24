const Rx = require('rxjs');

const identity = x => x;
const not = fn => (...args) => !fn(...args);
const notIdentity = not(identity);

function drainStream(paused, trigger) {
  return source => paused ?
    // Buffer this stream while we wait to become unpaused
    source.buffer(trigger.first(notIdentity)).take(1) :
    // Lift this stream so that it has the same order as the buffered stream
    Rx.Observable.of(source.takeUntil(trigger.first(identity)))
}

function writeToStream(source, stream, encoding) {
  // Used to trigger the pausing
  const pauser = new Rx.BehaviorSubject(true);

  // Used for triggering a drain event
  const trigger = Rx.Observable.merge(
    Rx.Observable.fromEvent(stream, 'drain').mapTo(false),
    pauser
  );

  // Make sure the source is now hot
  const hotSource = source.publish();

  const sub = trigger
    .takeUntil(hotSource.last())
    .switchMap(paused => source.let(drainStream(paused, trigger)))
    .mergeAll()
    .subscribe(
      data => !stream.write(String(data), encoding) && pauser.next(true),
      err => stream.emit('error', err),
      () => {
        !stream._isStdio && stream.end();
      }
    );

  pauser.next(false);
  sub.add(hotSource.connect());

  return sub;
}

module.exports = writeToStream;