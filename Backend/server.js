
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket"); // Import the initializeSocket function
const server = http.createServer(app);
const port = process.env.PORT;

initializeSocket(server); // Initialize the Socket.IO server

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
