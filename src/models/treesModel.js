// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR TREE
// ##############################################################
module.exports.insertTree = (data, callback) => {
  const SQLSTATEMENT = `
  INSERT INTO Tree (species, age, height, user_id) 
  VALUES (?, ?, ?, ?);`;
  const VALUES = [data.species, data.age, data.height, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR TREE
// ##############################################################
module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM Tree;`;

  pool.query(SQLSTATEMENT, callback);
};

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR TREE
// ##############################################################
module.exports.selectTreeById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM Tree WHERE id = ?;`;
  const VALUES = [data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};


// ##############################################################
// DEFINE UPDATE OPERATIONS FOR TREE
// ##############################################################
module.exports.updateTreeById = (data, callback) => {
  const SQLSTATEMENT = `
  UPDATE Tree SET species = ?, age = ?, height = ? WHERE id = ?;`;
  const VALUES = [data.species, data.age, data.height, data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

// ##############################################################
// DEFINE DELETE OPERATIONS FOR TREE
// ##############################################################
module.exports.deleteTreeById = (data, callback) => {
  const SQLSTATEMENT = `
  DELETE FROM Tree WHERE id = ?;`;
  const VALUES = [data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
}