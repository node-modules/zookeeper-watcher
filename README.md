zookeeper-watcher [![Build Status](https://secure.travis-ci.org/fengmk2/zookeeper-watcher.png)](http://travis-ci.org/fengmk2/zookeeper-watcher)
=======

![logo](https://raw.github.com/fengmk2/zookeeper-watcher/master/logo.png)

Extend [zkjs](https://github.com/dannycoates/zkjs), let zookeeper client support `watch(path)` method.

* jscoverage: [100%](http://fengmk2.github.com/coverage/zookeeper-watcher.html)

## Install

```bash
$ npm install zookeeper-watcher
```

## Usage

```js
var ZookeeperWatcher = require('zookeeper-watcher');

var zk = new ZookeeperWatcher({
  hosts: ['127.0.0.1:2181'],
  root: '/zktest'
});

zk.once('connected', function (err) {
  
  zk.watch('/root', function (err, value, zstat) {
    console.log(arguments);
  });

});
```

## License 

(The MIT License)

Copyright (c) 2013 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.