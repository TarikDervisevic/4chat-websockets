if (process.env.NODE_ENV !== "production") {
  import dotenv from "dotenv";
}
import express from "express";
import mongoose from "mongoose";
import path from "path"
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import boardRoutes from "./routes/boards.js";
import BoardsController from "./controllers/boards.js";

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