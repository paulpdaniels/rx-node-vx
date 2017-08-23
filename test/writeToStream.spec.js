
const Rx = require('rxjs');
const writeToStream = require('../src/writeToStream');
const StreamTest = require('streamtest');

test('should write Rx stream to Node stream', done => {
  expect.assertions(1);
  const input = Rx.Observable.of('a', 'b', 'c');
  const output = StreamTest.v2.toText((err, data) => {
    if (err) {
      return done(err);
    }
    expect(data).toBe('abc');
    done();
  });

  writeToStream(input, output, 'UTF-8');

});

test('should write Rx Errors to Node stream', done => {

  expect.assertions(1);
  const error = new Error('Ahhh!!!');
  const input = Rx.Observable.throw(error);
  const output = StreamTest.v2.toText((err, data) => {
    if (err) {
      expect(err).toEqual(error);
      return done();
    }

    done('Should have emitted exception');

  });

  writeToStream(input, output, 'UTF-8');

});