// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const treesController = require("../controllers/treesController");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/', treesController.createTree);
router.get('/', treesController.readAllTrees);
router.get('/:id', treesController.readTreeById);
router.put('/:id', treesController.updateTreeById);
router.delete('/:id', treesController.deleteTreeById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;