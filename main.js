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

function show(params) {
  console.log(params);
}

server.events.on("request", (request, event, tags) => {
  show(request);
  show(event);
  show(tags);
});

server.start(function () {
  console.log("Server started at [" + server.info.uri + "]");
});
