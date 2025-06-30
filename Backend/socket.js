const { Server } = require("socket.io");
const userModel = require("./models/user.model");
// Adjust the path as necessary

const captainModel = require("./models/captain.model");
let io;
function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL, // Adjust this to your frontend's origin
      methods: ["GET", "POST"],
      credentials: true, // Allow credentials to be sent
      allowedHeaders: ["Content-Type", "Authorization"],

    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined with socket ID: ${socket.id}`);
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      
      if (
        !location ||
         !location.ltd||
         !location.lng 
      ) {
        return socket.emit("error", {
          message:
            "Invalid location data. Latitude and longitude must be numbers.",
        });
      }
      
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd, // Correctly map lat to ltd
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageobject) {
  //console.log("Sending message to socket ID:", messageobject.data);
  if (io) {
    io.to(socketId).emit( messageobject.event, messageobject.data);
  } else {
    console.error("Socket.IO is not initialized.");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
