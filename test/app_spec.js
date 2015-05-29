var express = require('../');
var request = require('supertest');
var http = require('http');
var expect = require("chai").expect;

describe('app', function () {
  var app = express();
  describe("Create http server", function () {
    it('should response /foo.html with 404', function (done) {
      request(app).get('/foo.html')
        .expect(404)
        .end(done);
    });

    var server;
    before(function (done) {
      server = app.listen(4000, done);
    });

    it("Should return an http.Server", function () {
      expect(server).to.be.instanceof(http.Server);
    });

    it("#listen", function (done) {
      request("http://localhost:4000")
        .get("/foo")
        .expect(404);
      done();
    })
  });
  describe(".use", function () {
    var app;

    var m1 = function () { };
    var m2 = function () { };

    before(function () {
      app = express();
    });

    it("Should be able to add middlewares to stack", function () {
      app.use(m1);
      app.use(m2);
      expect(app.stack.length).to.eql(2);
    });
  });
  describe("Calling middleware stack", function () {
    var app;

    beforeEach(function () {
      app = new express();
    });

    it("Should be able to call a single middleware", function (done) {
      var m1 = function (req, res, next) {
        res.end("hello from m1");
      }
      app.use(m1);

      request(app).get("/foo.html")
        .expect('hello from m1')
        .end(done);
    })

    it("Should be able to call next to go to the next middleware", function (done) {
      var m1 = function (req, res, next) {
        next();
      };
      var m2 = function (req, res, next) {
        res.end("hello from m2");
      };
      app.use(m1);
      app.use(m2);

      request(app).get("/foo.html")
        .expect(200)
        .expect("hello from m2")
        .end(done);
    })

    it("Should 404 at the end of middleware chain", function (done) {
      var m1 = function (req, res, next) {
        next();
      };
      var m2 = function (req, res, next) {
        next();
      };
      app.use(m1);
      app.use(m2);

      request(app).get("/foo.html")
        .expect(404)
        .end(done);
    })

    it("Should 404 if no middleware is added", function (done) {
      request(app).get("/foo.html")
        .expect(404)
        .end(done);
    })
  });
});
