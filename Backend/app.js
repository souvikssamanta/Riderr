const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes.jsx");
const payRoutes=require("./routes/payment.routes")
connectToDb();
app.use(
  cors({
origin:process.env.FRONTEND_URL,
credentials:true,
methods:['GET','POST'],
allowedHeaders:['Content-Type','Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.get("/", (req, res) => {
  res.send("Welcome to the Ride Sharing APP");
});
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);
app.use("/pay",payRoutes);
module.exports = app;
