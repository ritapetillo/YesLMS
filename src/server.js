const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const error_handler = require("node-error-handler");
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./services");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//Cors
server.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, "http://localhost:3000"],
    credentials: true,
  })
);

//JSON
server.use(express.json());

//SESSION AND COOKIES
server.use(cookieParser());
// server.set("trust proxy", 1); // trust first proxy
server.use(
  session({
    cookieName: "session1",
    secret: "notagoodsecretnoreallydontusethisone",
    resave: false,
    saveUninitialized: true,
    httpOnly: true, // dont let browser javascript access cookie ever
    secure: true, // only use cookie over https
    ephemeral: true, // delete this cookie while browser close
  })
);

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
