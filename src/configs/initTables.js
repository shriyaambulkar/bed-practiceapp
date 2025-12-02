// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################
const SQLSTATEMENT = `
DROP TABLE IF EXISTS Tree;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tree (
  id INT PRIMARY KEY AUTO_INCREMENT,
  species TEXT NOT NULL,
  age INT NOT NULL,
  height INT NOT NULL,
  watered_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  planted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT
);

INSERT INTO User (name) VALUES
('Ash'),
('Misty'),
('Brock'),
('Gary');

INSERT INTO Tree (species, age, height, user_id) VALUES
('Oak', 1, 3, 1),
('Maple', 2, 4, 1),
('Pine', 3, 5, 2),
('Birch', 4, 6, 3),
('Willow', 5, 7, 3),
('Cherry', 6, 8, 3),
('Redwood', 7, 9, 3),
('Sequoia', 8, 10, 3),
('Palm', 9, 11, 3),
('Bamboo', 10, 12, 3),
('Mahogany', 11, 13, 3),
('Cedar', 12, 14, 3),
('Walnut', 13, 15, 3),
('Hickory', 14, 16, 3),
('Chestnut', 15, 17, 3);

`;

// ##############################################################
// RUN SQL STATEMENTS
// ##############################################################
pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
