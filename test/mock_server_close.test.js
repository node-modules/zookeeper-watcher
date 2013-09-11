/*!
 * zookeeper-watcher - test/mock_server_close.test.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var interceptor = require('interceptor');
var ZooKeeperWatcher = require('../');

var proxy = interceptor.create('127.0.0.1:2181', 100);
proxy.listen(2181);

describe.skip('mock zk server close', function () {
  var zk = new ZooKeeperWatcher({
    hosts: ['127.0.0.1:2181', '127.0.0.1:2181'],
    sessionTimeout: 5000,
    root: '/hbase-94',
    logger: console,
    reconnectTimeout: 1000,
  });

  it('should connected and get /root stats', function (done) {
    zk.once('connected', function () {
      zk.get('/', function (err, value, zstat) {
        should.not.exists(err);
        done();        
      });
    });
  });

  it('should return err when proxy close', function (done) {
    zk.watch('/root', function (err, value, zstat) {
      // !expired && zk.onEnsembleExpired();
      // !expired && zk.zk.connectionManager.setState(-3); // SESSION_EXPIRED
      // expired = true;
      // done(err);
    });
    // proxy.outArr.forEach(function (s) {
    //   s.close();
    // });
    proxy.inArr.forEach(function (s) {
      s.end();
    });
    setInterval(function () {
      proxy.inArr.forEach(function (s) {
        s.end();
      });
    }, 4000);
    zk.get('/', function (err, value, zstat) {
      // should.not.exists(err);
      // done();        
    });
  });
});
