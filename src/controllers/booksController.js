// ##############################################################
// BOOKS CONTROLLER
// ##############################################################
const model = require("../models/booksModel");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE BOOK
// ##############################################################
const createBook = (req, res, next) => {
  const data = {
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    published_year: req.body.published_year
  };

  // Validation: Check required fields
  if (!data.title || !data.author) {
    res.status(400).json({
      message: "Missing required data. Title and author are required."
    });
    return;
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createBook:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        message: "Book created successfully.",
        bookId: results.insertId
      });
    }
  };

  model.insertBook(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR SEARCH BOOKS
// ##############################################################
const searchBooks = (req, res, next) => {
  const data = {
    title: req.query.title,
    author: req.query.author,
    category: req.query.category,
    publishyear: req.query.publishyear
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error searchBooks:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No books found matching the search criteria."
        });
      } else {
        res.status(200).json(results);
      }
    }
  };

  model.searchBooks(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR RECOMMEND BOOKS
// ##############################################################
const recommendBooks = (req, res, next) => {
  const data = {
    userid: req.params.userid
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error recommendBooks:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No book recommendations found. User may have borrowed all books."
        });
      } else {
        res.status(200).json(results);
      }
    }
  };

  model.selectBooksNotBorrowedByUser(data, callback);
};

// ##############################################################
// EXPORT CONTROLLER FUNCTIONS
// ##############################################################
module.exports = {
  createBook,
  searchBooks,
  recommendBooks
};