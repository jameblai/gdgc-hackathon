const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket => {
    console.log("user connected:", socket.id);
// Join a conversation room
    socket.on("join", (conversationId) => {
        socket.join(conversationId);
        console.log(`user ${socket.id} joined room ${conversationId}`);

    });

    // Socket message and broadcast to everyone in this room
    socket.on("message")

}))
