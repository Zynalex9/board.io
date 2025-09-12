import express, { Request, Response } from "express";
import { Server } from "socket.io";

const app = express();
const PORT = 5000;

const httpServer = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("joinedBoard", (data) => {
    console.log("joinedboardevent", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express + Socket.IO 🚀");
});
