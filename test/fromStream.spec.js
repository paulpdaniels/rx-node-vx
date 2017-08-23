const StreamTest = require('streamtest');
const {fromStream} = require('../src/fromStream');

describe('Emitting events from a stream', () => {

  const version = "v2";

  test(version + ' should be processed by Rx', done => {
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
  })

  test(version + ' should ')

});
