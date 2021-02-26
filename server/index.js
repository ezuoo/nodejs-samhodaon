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
app.use('/api/cases', require('./routes/cases'));
app.use('/api/elements', require('./routes/elements'));
app.use('/api/users', require('./routes/users'));
app.use('/api/images', require('./routes/images'))
app.use('/api/slides', require('./routes/slides'))
app.use('/api/notices', require('./routes/notices'))
app.use('/api/orders', require('./routes/orders'))

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
