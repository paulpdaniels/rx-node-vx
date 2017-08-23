const EventEmitter = require('events').EventEmitter;


function toEventEmitter(source, eventName, selector) {
  const e = new EventEmitter();

  e.publish = function () {
    e.subscription = source.subscribe(
      x => {
        let result = x;
        if (selector) {
          try {
            result = selector(x);
          } catch (e) {
            return e.emit('error', e);
          }
        }

        e.emit(eventName, result);
      },
      err => e.emit('error', err),
      () => e.emit('end')
      );
  };

  return e;
}

module.exports = toEventEmitter;