const express = require("express");
const router = express.Router();
const Author = require("../models/author");

const tryWrapper = asyncMiddleware => {
  return async (req, res, next) => {
    try {
      await asyncMiddleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  "/",
  tryWrapper(async (req, res, next) => {
    const newAuthor = new Author({
      name: req.body.name,
      age: req.body.age
    });

    await newAuthor.save();

    res.status(201).json({
      message: "successfully created new author"
    });
  })
);

router.get(
  "/",
  tryWrapper(async (req, res, next) => {
    const authors = await Author.find();
    res.json(authors);
  })
);

router.get(
  "/:id",
  tryWrapper(async (req, res, next) => {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: req.params.id });
    res.json({
      ...author.toJSON(),
      books: books
    });
  })
);

module.exports = router;
