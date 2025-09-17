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

  const userToSocket = new Map<string, string>();
  const socketToUser = new Map<string, string>();

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinedBoard", (boardId) => {
      socket.join(boardId);
      console.log("Joined board:", boardId);
    });
    //Shape
    socket.on("newShape", ({ lastElem, boardId }) => {
      socket.to(boardId).emit("newShape", lastElem);
    });
    socket.on("shapeDragged", ({ shape, boardId }) => {
      socket.to(boardId).emit("shapeDragged", shape);
    });
    socket.on("shapeDeleted", ({ shapeId, boardId }) => {
      socket.to(boardId).emit("shapeDeleted", shapeId);
    });
    socket.on("shapeDragging", ({ shape, boardId }) => {
      socket.to(boardId).emit("shapeDragging", { shape });
    });
    //Document
    socket.on("documented:updated", (data) => {
      socket.to(data.boardId).emit("documented:updated", data.json);
    });
    //Chat
    socket.on("newMessage", (data) => {
      console.log(data);
      io.to(data.boardId).emit("newMessage", data);
    });
    socket.on("onTyping", (data) => {
      console.log(data);
      socket.to(data.boardId).emit("onTyping", data);
    });

    //WEB RTC
    socket.on("webRTC:user-join", (data) => {
      const { user, boardId } = data;
      userToSocket.set(user.id, socket.id);
      socketToUser.set(socket.id, user.id);
      console.log("new user joined:", user.id, "socket:", socket.id);
      socket.to(boardId).emit("webRTC:new-user-join", user);
    });

    socket.on("webRTC:offer", ({ boardId, to, from, offer }) => {
      console.log("Forwarding offer to", to, "from", from);
      const toSocket = userToSocket.get(to);
      socket.to(toSocket as string).emit("webRTC:offer", { from, offer });
    });

    socket.on("webRTC:answer", ({ boardId, to, from, answer }) => {
      console.log(`Forwarding answer from ${from} to ${to}`);
      const toSocket = userToSocket.get(to);
      if (toSocket) {
        io.to(toSocket).emit("webRTC:answer", { from, answer });
      }
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
