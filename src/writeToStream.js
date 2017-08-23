const Rx = require('rxjs');

function writeToStream(source, stream, encoding) {
  const pauser = new Rx.BehaviorSubject(true);
  const drainer = Rx.Observable.merge(
    Rx.Observable.fromEvent(stream, 'drain').mapTo(false),
    pauser
  );

  const hotSource = source.publish();

  const sub = drainer
    .takeUntil(hotSource.last())
    .flatMap(paused => paused ?
      hotSource.buffer(drainer.first(x => !x)).take(1) :
      Rx.Observable.of(hotSource.takeUntil(drainer.first(x => x)))
    )
    .mergeAll()
    // .flatMap(x => Array.isArray(x) ? x : Rx.Observable.of(x))
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