var express = require('../');
var request = require('supertest');
var http = require('http');
var expect = require("chai").expect;

describe('app', function() {
  var app = express();
  describe("create http server", function() {
    it('should response /foo.html with 404', function(done) {
      var server = http.createServer(app);
      request(server).get('/foo.html')
                     .expect(404)
                     .end(done);
    });
    var server;
    before(function(done) {
      server = app.listen(4000,done);
    });
    it("should return an http.Server",function() {
      expect(server).to.be.instanceof(http.Server);
    });
    it("#liten", function (done) {
      request("http://localhost:4000")
          .get("/foo")
          .expect(404);
      done();
    })
  });
});
