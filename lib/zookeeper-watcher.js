/*!
 * zookeeper-watcher - lib/zookeeper-watcher.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var ZK = require('zkjs');

module.exports = function (options) {
  var zk = new ZK(options);
  zk.on('expired', function () {
    // fixed zkjs bug
    this.expired = false;
    this.start();
  });

  zk.watch = function (path, callback) {
    var watchEvent = 'watch:' + path;
    var first = true;
    var listeners = this.listeners(watchEvent);
    if (listeners && listeners.length > 0) {
      first = false;
    }

    this.on(watchEvent, callback);

    if (!first) {
      return;
    }

    var self = this;
    var start = function () {
      self.get(path, function (watch) {
        start();
      }, self.emit.bind(self, watchEvent));
    };
    start();
  };

  zk.unWatch = function (path) {
    zk.removeAllListeners('watch:' + path);
    // delete watcher
    delete zk.watcher.data[path];
  };
  
  return zk;
};
