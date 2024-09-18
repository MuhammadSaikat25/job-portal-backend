"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = exports.getReceiverSocketId = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["*"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Other-Custom-Header"],
    },
});
exports.io = io;
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
const userSocketMap = {};
// Function to get the receiver's socket ID
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // Retrieve the userId from the query string (e.g., userId from client-side connection)
    const userId = socket.handshake.query.userId;
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
