// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/usersModel");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE USER
// ##############################################################
module.exports.createUser = (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    max_loans: req.body.max_loans
  };

  if (!data.name || !data.email || data.max_loans === undefined) {
    res.status(400).json({
      message: "Missing required data."
    });
    return;
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createUser:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        message: "User created successfully.",
        userId: results.insertId
      });
    }
  };

  model.insertUser(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL USERS
// ##############################################################
module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUsers:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No users found."
        });
        return;
      }

      res.status(200).json(results);
    }
  };

  model.selectAll(callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ USER BY ID
// ##############################################################
module.exports.readUserById = (req, res, next) => {
  const data = {
    id: req.params.id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "User not found."
        });
        return;
      }

      res.status(200).json(results[0]);
    }
  };

  model.selectUserById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE USER BY ID
// ##############################################################
module.exports.updateUserById = (req, res, next) => {
  const data = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    max_loans: req.body.max_loans
  };

  if (!data.name || !data.email || data.max_loans === undefined) {
    res.status(400).json({
      message: "Missing required data."
    });
    return;
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: "User not found."
        });
      } else {
        res.status(204).send();
      }
    }
  };

  model.updateUserById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE USER BY ID
// ##############################################################
module.exports.deleteUserById = (req, res, next) => {
  const data = {
    id: req.params.id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: "User not found."
        });
      } else {
        res.status(204).send();
      }
    }
  };

  model.deleteUserById(data, callback);
};
