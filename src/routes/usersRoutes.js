// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const usersController = require("../controllers/usersController");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post("/", usersController.createUser);
router.get("/", usersController.readAllUsers);
router.get("/:id", usersController.readUserById);
router.put("/:id", usersController.updateUserById);
router.delete("/:id", usersController.deleteUserById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
