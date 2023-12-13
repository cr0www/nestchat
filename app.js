const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: { origin: "*" },
  connectionStateRecovery: {},
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const response = req.body;
  res.render("index", { response });
});

app.post("/", (req, res) => {
  const response = req.body;
  console.log(response);
  res.render("index", { response });
});

server.listen(3000);
