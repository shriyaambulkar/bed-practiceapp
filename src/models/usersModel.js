// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR USER
// ##############################################################
module.exports.insertUser = (data, callback) => {
  const SQLSTATEMENT = `
  INSERT INTO User (name, email, max_loans) 
  VALUES (?, ?, ?);`;
  const VALUES = [data.name, data.email, data.max_loans];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR USER
// ##############################################################
module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM User;`;

  pool.query(SQLSTATEMENT, callback);
};

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR USER
// ##############################################################
module.exports.selectUserById = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM User WHERE id = ?;`;
  const VALUES = [data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE UPDATE OPERATIONS FOR USER
// ##############################################################
module.exports.updateUserById = (data, callback) => {
  const SQLSTATEMENT = `
  UPDATE User SET name = ?, email = ?, max_loans = ? WHERE id = ?;`;
  const VALUES = [data.name, data.email, data.max_loans, data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE DELETE OPERATIONS FOR USER
// ##############################################################
module.exports.deleteUserById = (data, callback) => {
  const SQLSTATEMENT = `
  DELETE FROM User WHERE id = ?;`;
  const VALUES = [data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
