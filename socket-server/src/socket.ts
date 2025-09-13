import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinedBoard", (boardId) => {
      socket.join(boardId);
      console.log("Joined workspace:", boardId);
    });
    socket.on("newShape", ({ lastElem, boardId }) => {
      socket.to(boardId).emit("newShape", lastElem);
    });
    socket.on("shapeDragged", ({ shape, boardId }) => {
      socket.to(boardId).emit("shapeDragged", shape);
    });
    socket.on("shapeDeleted", ({ shapeId, boardId }) => {
      socket.to(boardId).emit("shapeDeleted", shapeId);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
