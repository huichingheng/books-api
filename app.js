const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const index = require("./routes/index");
const books = require("./routes/books.js");
const authors = require("./routes/authors.js");

if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN
    })
  );
}

const app = express();
app.use(logger("dev"));
app.use(express.json());

app.use("/", index);
app.use("/books", books);
app.use("/authors", authors);

module.exports = app;
