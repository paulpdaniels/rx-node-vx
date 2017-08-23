const StreamTest = require('streamtest');
const {fromStream} = require('../src/fromStream');

describe('Emitting events from a stream', () => {

  const version = "v2";

  test(version + ' should be emitted via Rx', done => {
    expect.assertions(1);
    const stream = StreamTest[version].fromChunks(['a', 'b', 'c', 'd']);
    fromStream(stream)
      .map(x => String(x))
      .toArray()
      .subscribe(
        data => expect(data).toEqual(['a', 'b', 'c', 'd']),
        done,
        done
      );
  });

  test(version + ' should handle errors via Rx', done => {
    expect.assertions(1);
    const error = new Error('Ahhhh!');
    const stream = StreamTest[version].fromErroredChunks(error, ['a', 'b']);
    fromStream(stream)
      .map(x => String(x))
      .toArray()
      .subscribe(
        _ => expect.fail('Should have failed before emission!'),
        e => {
          expect(e).toEqual(error);
          done();
        },
        () => done('Should have emitted exception')
      )
  })

});
