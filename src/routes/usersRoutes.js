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
router.get('/:userId/trees/', usersController.readTreeByUserId);
router.get('/:userId/trees/age/avg', usersController.getAverageAgeOfTreesOwnedByUser);
router.put('/:userId/trees/:treeId/water', usersController.checkTreeOwnership,  usersController.waterTreeByUserId);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;