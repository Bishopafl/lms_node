require("dotenv").config();
require("./config/dbConnect"); // Database connection

const http = require("http");
const app  = require("./app/app");
const PORT = process.env.PORT  || 2020;

// server
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port: ${PORT}`));