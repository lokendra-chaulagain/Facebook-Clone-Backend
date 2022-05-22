const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userDetailRoute = require("./routes/userDetail");
const multer = require("multer");

//Dotenv configuration
app.use(express.json());
dotenv.config();

//MongoDB connection
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connection with mongoDB successful");
});

//Middleware

app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/userDetail", userDetailRoute);

app.listen(5000, () => {
  console.log("server is running at 5000");
});
