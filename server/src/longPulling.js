const express = require("express");
const cors = require("cors");
const events = require("events");

const emitter = new events.EventEmitter();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/get-messages", (req, res) => {
  emitter.once("newMessage", ({ message, id }) => {
    res.status(200).json({ message, id });
  });
});

app.post("/new-message", (req, res) => {
  const message = req.body;

  emitter.emit("newMessage", message);

  res.status(200).json({ message });
});

app.listen(PORT, () => console.log(`Сервер ${PORT} запустился...`));
