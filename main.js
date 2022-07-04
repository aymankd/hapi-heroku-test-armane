var Hapi = require("hapi");
var internals = {};

internals.get = function (request, h) {
  return {
    message: "Hello World!",
  };
};

internals.echo = function (request, h) {
  return {
    message: "Hello World!2",
  };
};

var server = new Hapi.Server({
  port: process.env.PORT || 80,
  host: "localhost",
});

server.route([
  {
    method: "GET",
    path: "/",
    config: { handler: internals.get },
  },
  {
    method: "POST",
    path: "/",
    config: { handler: internals.echo, payload: { parse: true } },
  },
]);

server.start(function () {
  console.log("Server started at [" + server.info.uri + "]");
});
