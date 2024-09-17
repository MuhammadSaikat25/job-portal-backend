import { Server } from "socket.io";
import http from "http";
import express, { Request, Response } from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Other-Custom-Header"],
  },
});

// A map to store the user's socket IDs by their user ID

// const io = new Server(server, {
//     cors: {
//       origin: ["*"],
//       handlePreflightRequest: (req: Request, res: Response) => {
//         res.writeHead(200, {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
//           "Access-Control-Allow-Headers": "Authorization",
//           "Access-Control-Allow-Credentials": true
//         });
//         res.end();
//       }
//     }
//   });
const userSocketMap: Record<string, string> = {};

// Function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Retrieve the userId from the query string (e.g., userId from client-side connection)
  const userId = socket.handshake.query.userId as string | undefined;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} is mapped to socket ${socket.id}`);
  }

  // Emit the list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for the "disconnect" event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (userId) {
      delete userSocketMap[userId];
      console.log(`User ${userId} has been removed from userSocketMap`);
    }

    // Emit the updated list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
