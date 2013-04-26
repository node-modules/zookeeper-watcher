/*!
 * zookeeper-watcher - test/zookeeper-watcher.test.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var ZooKeeperWatcher = require('../');
var should = require('should');
var pedding = require('pedding');

describe('zookeeper_watcher.test.js', function () {
  
  var zk = new ZooKeeperWatcher({
    hosts: ['api.yongwo.de:2181'],
    root: '/zkjs-test',
    // logger: console,
  });

  var version = 0;

  before(function (done) {
    zk.start(function (err) {
      should.not.exists(err);
      zk.create('/root', 'this is root ' + new Date(), function () {
        zk.get('/root', function (err, value, zstat) {
          version = zstat.version;
          done(err);
        });
      });
    });
  });

  beforeEach(function () {
    zk.unWatch('/root');
    should.not.exists(zk.watcher.data['/root']);
  });

  it('should watch /root and get value', function (done) {
    done = pedding(5, done); // 2 get, 2 change, 1 set
    zk.watch('/root', function (err, value, zstat) {
      zk.watcher.data['/root'].should.length(1);
      should.not.exists(err);
      value.should.be.instanceof(Buffer);
      value.toString().should.include('root');
      zstat.should.have.property('version');
      zstat.should.have.property('ctime');
      done();
    });

    // watch again should be fine.
    zk.watch('/root', function (err, value, zstat) {
      zk.watcher.data['/root'].should.length(1);
      should.not.exists(err);
      value.should.be.instanceof(Buffer);
      value.toString().should.include('root');
      zstat.should.have.property('version');
      zstat.should.have.property('ctime');
      // console.log(value.toString(), zstat);
      done();
    });

    // change it
    setTimeout(function () {
      zk.set('/root', 'root value change at ' + new Date(), version, function (err, zstat) {
        should.not.exists(err);
        version = zstat.version;
        done();
      });
    }, 1500);
  });

  it('should restart after expired', function (done) {
    done = pedding(3, done);

    var expired = false;
    zk.watch('/root', function (err, value, zstat) {
      zk.watcher.data['/root'].should.length(1);
      !expired && zk.onEnsembleExpired();
      expired = true;
      // console.log(zstat)
      done(err);
    });

    // after started, change it
    zk.once('started', function (err) {
      // will auto watch
      zk.watcher.data['/root'].should.length(1);
      should.not.exists(err);
      zk.set('/root', 'root value change at ' + new Date(), version, function (err, zstat) {
        should.not.exists(err);
        version = zstat.version;
        done();
      });
    });

  });

});
