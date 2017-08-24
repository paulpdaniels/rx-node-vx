const Rx = require('rxjs');
const toEventEmitter = require('../src/toEventEmitter');

test('should emit the event by name', () => {
  const callback = jest.fn();

  const source = Rx.Observable.of(1, 2, 3, 4);

  const emitter = toEventEmitter(source, 'test');

  emitter.on('test', callback);
  emitter.on('end', callback);

  emitter.publish();

  expect(callback.mock.calls).toEqual([[1], [2], [3], [4], []]);
});

test('should emit errors through the emitter', () => {
  const callback = jest.fn();
  const error = new Error('Ahhh!!!');
  const source = Rx.Observable.of(1, 2, 3).concat(Rx.Observable.throw(error));

  const emitter = toEventEmitter(source, 'test');

  emitter.on('test', callback);
  emitter.on('end', callback);
  emitter.on('error', callback);

  emitter.publish();

  expect(callback.mock.calls).toEqual([[1], [2], [3], [error]]);

});