const path = require("path");
const WebSocket = require("ws");
const { SOCKET_PORT } = require("../consts");
const fs = require("fs");
const ansiHTML = require("ansi-html");
const { AllHtmlEntities } = require("html-entities");

const entities = new AllHtmlEntities();
ansiHTML.setColors({
  reset: [, "transparent"],
  black: "000",
  red: "f00",
  green: "0f0",
  yellow: "ff0",
  blue: "00f",
  magenta: "f0f",
  cyan: "0ff",
  lightgrey: "eee",
  darkgrey: "444",
});

export function serverSocket(opts: any) {
  const socketServer = new WebSocket.Server({ port: SOCKET_PORT });

  const noop = (err: any) => {};
  const updateFile =
    (opts: any) =>
    ({ filename, content }: any, cb = noop) => {
      const filepath = path.join(opts.dirname, filename);
      console.log("filepath", filepath);
      console.log("content", content);
      if (!fs.existsSync(filepath)) return;
      try {
        console.log("write");
        fs.writeFile(filepath, content, cb);
        console.log("written");
      } catch (e) {
        const err = {
          text: e.toString(),
          code: ansiHTML(entities.encode(e.codeFrame)),
        };
        console.log("err (updateFile)", err);
        cb(err);
      }
    };
  const update = updateFile(opts);

  socketServer.on("connection", (socket: any) => {
    socket.on("message", (msg: any) => {
      console.log("msg", msg);
      const data = JSON.parse(msg);
      console.log("data", data);
      if (data.filename) {
        update(data, (err) => {
          if (err) {
            const json = JSON.stringify({
              error: err,
            });
            socket.send(json);
            return;
          }
          socket.send(JSON.stringify({ message: "saved" }));
        });
      }
    });
    socket.send(JSON.stringify({ message: "beep" }));
  });
}

// module.exports = { serverSocket }
