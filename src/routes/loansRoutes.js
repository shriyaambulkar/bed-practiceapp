// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const loansController = require("../controllers/loansController");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get("/", loansController.readAllLoans);
router.get("/summary/:userid", loansController.getLoanSummary);
router.post("/new/:userid/:bookid", loansController.createNewLoan);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;