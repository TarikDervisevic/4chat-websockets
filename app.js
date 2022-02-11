import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import { Server } from "socket.io";
import http from "http";
import { Message } from "./models/message.js";
import boardRoutes from "./routes/boards.js";
import BoardsController from "./controllers/boards.js";
import { makeid } from "./utils/utilityFunctions.js";

dotenv.config();

mongoose.connect(process.env.FOURCHAT_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
mongoose.Promise = global.Promise;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize({
    replaceWith: "_"
}))

const server = http.createServer(app);
const corsOrigin = process.env.NODE_ENV === "production" ? "https://four-chat-socket.herokuapp.com/" : "http://localhost:3000";
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log(`ID ${socket.id} CONNECTED`);

  socket.on("send_message", (submittedMsg) => {
    let msgSocketID = makeid(8);
    let messageData = submittedMsg;
    messageData.socketID = msgSocketID;
    BoardsController.postMessage(messageData)
      .then(async () => {
        const message = await Message.findOne({socketID: msgSocketID});
        console.log(message);
        io.sockets.emit("receive_message", message);
      })
  })

  socket.on("disconnect", () => {
    console.log(`ID ${socket.id} DISCONNECTED`);
  })
})

server.listen(4000, () => {
  console.log("socket.io server running");
})

setInterval(() => {
  const hour = (new Date()).getHours();
  const minute = (new Date()).getMinutes();
  if (hour === 0 && minute === 0) {
    BoardsController.clearMessages();
    console.log("Messages cleared")
  }
}, 60000)


app.use("/api/boards", boardRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});