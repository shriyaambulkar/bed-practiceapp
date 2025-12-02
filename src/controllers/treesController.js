// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/treesModel");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE TREE
// ##############################################################
module.exports.createTree = (req, res, next) => {

  const data = {
    species: req.body.species,
    age: req.body.age,
    height: req.body.height,
    user_id: req.body.user_id
  }; 

  if(!data.species || !data.age || !data.height || !data.user_id) {
    res.status(400).json({
      message: "Missing required data."
    });
    return;
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createTree:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        message: "Tree created successfully.",
        treeId: results.insertId,
      });
    }
  };
  
  model.insertTree(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL TREES
// ##############################################################
module.exports.readAllTrees = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllTrees:", error);
      res.status(500).json(error);
    } else {
      if(results.length === 0) {
        res.status(404).json({
          message: "No trees found."
        });
        return;
      }

      res.status(200).json(results);
    }
  };

  model.selectAll(callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ TREE BY ID
// ##############################################################
module.exports.readTreeById = (req, res, next) => {
  const data = {
    id: req.params.id
  }
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getTreeById:", error);
      res.status(500).json(error);
    } else {
      
      if(results.length === 0) {
        res.status(404).json({
          message: "Tree not found."
        });
        return;
      }

      res.status(200).json(results[0]);
    }
  };

  model.selectTreeById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE TREE BY ID
// ##############################################################
module.exports.updateTreeById = (req, res, next) => {
  const data = {
    id: req.params.id,
    species: req.body.species,
    age: req.body.age,
    height: req.body.height
  }

  if(!data.species || !data.age || !data.height) {
    res.status(400).json({
      message: "Missing required data."
    });
    return;
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTreeById:", error);
      res.status(500).json(error);
    } else {

      if(results.affectedRows === 0) {
        res.status(404).json({
          message: "Tree not found."
        });
      }
      else res.status(204).send();
    }
  };

  model.updateTreeById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE TREE BY ID
// ##############################################################
module.exports.deleteTreeById = (req, res, next) => {
  const data = {
    id: req.params.id
  }
  const callback = (error, results, fields) => 
  {
    if (error) 
    {
      console.error("Error deleteTreeById:", error);
      res.status(500).json(error);
    } 
    else {
      if(results.affectedRows === 0) {
        res.status(404).json({
          message: "Tree not found."
        });
      }
      else res.status(204).send();
    }
  };

  model.deleteTreeById(data, callback);
}

