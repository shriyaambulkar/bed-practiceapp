// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');

const usersRoutes = require('./usersRoutes');
const booksRoutes = require('./booksRoutes');
const loansRoutes = require('./loansRoutes');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.use("/users", usersRoutes);
router.use("/books", booksRoutes);
router.use("/loans", loansRoutes);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
