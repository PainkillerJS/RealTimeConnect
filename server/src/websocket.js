const ws = require("ws");

const wss = new ws.WebSocketServer(
  {
    port: 5000,
  },
  () => {
    console.log("Start webSocket server...");
  }
);

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    message = JSON.parse(message);

    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

const broadcastMessage = (message) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};
