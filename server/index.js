const express = require("express");
const app = express();
// const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const config = require("./config/key");

// DB set
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

// using
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// route 
app.use('/api/case', require('./routes/cases'));
app.use('/api/class', require('./routes/classes'));


app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
