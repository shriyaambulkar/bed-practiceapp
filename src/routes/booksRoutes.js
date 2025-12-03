// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const booksController = require("../controllers/booksController");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post("/", booksController.createBook);
router.get("/search", booksController.searchBooks);
router.get("/recommend/:userid", booksController.recommendBooks);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;