const Rx = require('rxjs');

function pausableBuffered(pauser) {
  return source => pauser.switchMap(
    paused => paused ? Rx.Observable.never() : source
  );
}

function writeToStream(source, stream, encoding) {
  const pauser = new Rx.BehaviorSubject(false);
  const drainer = Rx.Observable.fromEvent(stream, 'drain').mapTo(false);

  return source
    .let(pausableBuffered(
      Rx.Observable.merge(pauser, drainer)
    ))
    .subscribe(
      data => !stream.write(String(x), encoding) && pauser.next(true),
      err => stream.emit('error', err),
      () => {
        !stream._isStdio && stream.end();
      }
    );

}

module.exports = writeToStream;