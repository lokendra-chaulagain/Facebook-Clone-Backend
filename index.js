const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');


//Dotenv configuration
dotenv.config();


//MongoDB connection
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("connection with mongoDB successful")
})


//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


//Routes
app.get("/", (req, res) => {
    res.send("welcomessdd page");

})


app.listen(5000, () => {
    console.log('server is ruunning at 5000');
});
