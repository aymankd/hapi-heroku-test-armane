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
  port: parseInt(process.env.PORT || 80),
  host: "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Authorization", "Content-Type", "If-None-Match"],
      credentials: false,
    },
  },
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

server.events.on("request", (request, event, tags) => {
  if (tags.error) {
    console.log(
      `${request.method} :: Request ${event} error: ${
        event.error ? event.error : "unknown"
      }`
    );
  }
});

server.start(function () {
  console.log("Server started at [" + server.info.uri + "]");
});
