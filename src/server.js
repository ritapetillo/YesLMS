const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const error_handler = require("node-error-handler");
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./services");

//Cors
server.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, "http://localhost:3000"],
    credentials: true,
  })
);

//JSON
server.use(express.json());

//ROUTES
server.use("/api", apiRoutes);
//ERROR HANDLERS
server.use(error_handler({ log: true, debug: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log("server connected at port " + PORT);
    });
  });
