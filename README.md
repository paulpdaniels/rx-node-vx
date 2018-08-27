# rx-node-vx

[![Greenkeeper badge](https://badges.greenkeeper.io/paulpdaniels/rx-node-vx.svg)](https://greenkeeper.io/)

A port of the rx-node project for v5 and beyond. Note that this is only for v5 and above. If you are still using RxJS 4 then you should be using: https://github.com/Reactive-Extensions/rx-node

## OVERVIEW

This project provides Reactive Extensions for JavaScript (RxJS) bindings for Node.js and io.js to abstract over the EventEmitter, Streams and more.

## GETTING STARTED

There are a number of ways to get started with the RxJS bindings for Node.js.

### Download the Source

To download the source of the Node.js Bindings for the Reactive Extensions for JavaScript, type in the following:

```
git clone https://github.com/paulpdaniels/rx-node-vx.git
cd ./rx-node-vx
```

### Installing with NPM

```
npm install rx-node-vx
```


### API 

<!-- div -->

## `RxNode Methods`

### Event Handlers

- [`toEventEmitter`](#rxnodetoeventemitterobservable-eventname-handler)

### Stream Handlers

- [`fromStream`](#rxnodefromstreamstream-finisheventname)
- [`fromReadableStream`](#rxnodefromreadablestreamstream)
- [`fromReadLineStream`](#rxnodefromreadlinestreamstream)
- [`fromWritableStream`](#rxnodefromwritablestreamstream)
- [`fromTransformStream`](#rxnodefromtransformstreamstream)
- [`writeToStream`](#rxnodewritetostreamobservable-stream-encoding)

### <a id="rxnodetoeventemitterobservable-eventname"></a>`RxNode.toEventEmitter(observable, eventName)`
<a href="#rxnodetoeventemitterobservable-eventname">#</a> [&#x24C8;](https://github.com/paulpdaniels/rx-node-vx/blob/master/src/toEventEmitter.js "View in source")

Converts the given observable sequence to an event emitter with the given event name.
The errors are handled on the 'error' event and completion on the 'end' event.

#### Arguments
1. `observable` *(Obsesrvable)*: The observable sequence to convert to an EventEmitter.
2. `eventName` *(String)*: The event name to subscribe.

#### Returns
*(EventEmitter)*: An EventEmitter which emits the given eventName for each onNext call in addition to 'error' and 'end' events.

#### Example
```js
var Rx = require('rxjs');
var RxNode = require('rx-node-vx');

var source = Rx.Observable.return(42);

var emitter = RxNode.toEventEmitter(source, 'data');

emitter.on('data', function (data) {
    console.log('Data: ' + data);
});

emitter.on('end', function () {
    console.log('End');
});

// Ensure to call publish to fire events from the observable
emitter.publish();

// => Data: 42
// => End
```

### Location

- index.js

* * *

### Stream Handlers ###

### <a id="rxnodefromstreamstream-finisheventname"></a>`RxNode.fromStream(stream, finishEventName, dataEventName)`
<a href="#rxnodefromstreamstream-finisheventname">#</a> [&#x24C8;](https://github.com/paulpdaniels/rx-node-vx/blob/master/src/fromStream.js "View in source")

Converts a flowing stream to an Observable sequence.

#### Arguments
1. `stream` *(Stream)*: A stream to convert to a observable sequence.
2. `[finishEventName]` *(String)*: Event that notifies about closed stream. ("end" by default)
3. `[dataEventName]` *(String)*: Event that notifies about incoming data. ("data" by default)

#### Returns
*(Observable)*: An observable sequence which fires on each 'data' event as well as handling 'error' and finish events like `end` or `finish`.

#### Example
```js
var RxNode = require('rx-node-vx');

var subscription = RxNode.fromStream(process.stdin, 'end')
    .subscribe(function (x) { console.log(x); });

// => r<Buffer 72>
// => x<Buffer 78>
```

### Location

- index.js

* * *

### <a id="rxnodefromreadablestreamstream"></a>`RxNode.fromReadableStream(stream, dataEventName)`
<a href="#rxnodefromreadablestreamstream">#</a> [&#x24C8;](https://github.com/paulpdaniels/rx-node-vx/blob/master/src/fromStream.js "View in source")

Converts a flowing readable stream to an Observable sequence.

#### Arguments
1. `stream` *(Stream)*: A stream to convert to a observable sequence.
2. `[dataEventName]` *(String)*: Event that notifies about incoming data. ("data" by default)

#### Returns
*(Observable)*: An observable sequence which fires on each 'data' event as well as handling 'error' and 'end' events.

#### Example
```js
var RxNode = require('rx-node-vx');

var subscription = RxNode.fromReadableStream(process.stdin)
    .subscribe(function (x) { console.log(x); });

// => r<Buffer 72>
// => x<Buffer 78>
```

* * *

### <a id="rxnodefromreadlinestreamstream"></a>`RxNode.fromReadLineStream(stream)`
<a href="#rxnodefromreadlinestreamstream">#</a> [&#x24C8;](https://github.com/paulpdaniels/rx-node-vx/blob/master/src/fromStream.js "View in source")

Converts a flowing readable stream to an Observable sequence.

#### Arguments
1. `stream` *(Stream)*: A stream to convert to a observable sequence.

#### Returns
*(Observable)*: An observable sequence which fires on each 'line' event as well as handling 'error' and 'close' events.

```js
var readline = require('readline');
var fs = require('fs');
var RxNode = require('rx-node-vx');

var rl = readline.createInterface({
  input: fs.createReadStream('sample.txt')
});

var subscription = RxNode.fromReadLineStream(rl)
    .subscribe(function (x) { console.log(x); });

// Prints contents of 'sample.txt' line by line:
// => rx
// => supports 'readline'
```

### Location

- index.js

* * *

### <a id="rxnodefromwritablestreamstream"></a>`RxNode.fromWritableStream(stream)`
<a href="#rxnodefromwritablestreamstream">#</a> [&#x24C8;](https://github.com/paulpdaniels/rx-node-vx/blob/master/src/fromStream.js "View in source")

Converts a flowing writeable stream to an Observable sequence.

#### Arguments
1. `stream` *(Stream)*: A stream to convert to a observable sequence.

#### Returns
*(Observable)*: An observable sequence which fires on each 'data' event as well as handling 'error' and 'finish' events.

#### Example
```js
var RxNode = require('rx-node');

var subscription = RxNode.fromWritableStream(process.stdout)
    .subscribe(function (x) { console.log(x); });

// => r<Buffer 72>
// => x<Buffer 78>
```

### Location

- index.js

* * *

### <a id="rxnodefromtransformstreamstream"></a>`RxNode.fromTransformStream(stream)`
<a href="#rxnodefromtransformstreamstream">#</a> [&#x24C8;](https://github.com/paulpdaniels/rx-node-vx/blob/master/src/fromStream.js "View in source")

Converts a flowing transform stream to an Observable sequence.

#### Arguments
1. `stream` *(Stream)*: A stream to convert to a observable sequence.

#### Returns
*(Observable)*: An observable sequence which fires on each 'data' event as well as handling 'error' and 'finish' events.

#### Example
```js
var RxNode = require('rx-node-vx');

var subscription = RxNode.fromTransformStream(getTransformStreamSomehow());
```

### Location

- index.js

* * *

### <a id="rxnodewritetostreamobservable-stream-encoding"></a>`RxNode.writeToStream(observable, stream, [encoding])`
<a href="#rxnodewritetostreamobservable-stream-encoding">#</a> [&#x24C8;](https://github.com/rx-node-vx/paulpdaniels/blob/master/src/writeToStream.js "View in source")

Writes an observable sequence to a stream.

#### Arguments
1. `observable` *(Observable)*: Observable sequence to write to a stream.
2. `stream` *(Stream)*: The stream to write to.
3. `[encoding]` *(String)*: The encoding of the item to write.

#### Returns
*(Subscription)*: The subscription handle.

#### Example
```js
var Rx = require('rxjs');
var RxNode = require('rx-node-vx');

var source = Rx.Observable.range(0, 5);

var subscription = RxNode.writeToStream(source, process.stdout, 'utf8');

// => 01234
```

### Location

- index.js

* * *
