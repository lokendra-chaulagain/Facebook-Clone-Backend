const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userDetailRoute = require("./routes/userDetails");
const cookieParser = require("cookie-parser");

app.use(express.json());
dotenv.config();

//MongoDB connection
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("MongoDB Connection Successful");
});

//Middleware
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/userDetail", userDetailRoute);

//Error handling middleware
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";
  return res.status(errorStatus).json({
    successStatus: false,
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

//post listening
app.listen(process.env.PORT, () => {
  console.log("Backend Server is running on port " + process.env.PORT);
});
