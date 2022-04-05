const express = require("express");
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const path = require('path')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(fileUpload());
app.use(mongoSanitize());
// prevent XSS attacks
app.use(xss());
// Prevent hpp pollution
app.use(hpp());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
