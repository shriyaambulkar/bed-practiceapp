// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################
const SQLSTATEMENT = `
DROP TABLE IF EXISTS Loan;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  max_loans INT NOT NULL DEFAULT 3,
  joined_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Book (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT,
  published_year INT
);

CREATE TABLE Loan (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  loan_date DATE DEFAULT (CURRENT_DATE),
  return_date DATE,
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (book_id) REFERENCES Book(id)
);

INSERT INTO User (name, email, max_loans) VALUES
('Alice', 'alice@example.com', 5),
('Bob', 'bob@example.com', 3),
('Carla', 'carla@example.com', 4),
('Devin', 'devin@example.com', 2);

INSERT INTO Book (title, author, category, published_year) VALUES
('The Art of Node', 'Ada Lovelace', 'Technology', 2021),
('Express Essentials', 'Lin Yao', 'Technology', 2024),
('Databases Demystified', 'Sam Patel', 'Education', 2019),
('RESTful Thinking', 'Nia Thompson', 'Technology', 2022),
('Starlight Voyage', 'Kei Tan', 'Sci-Fi', 2018),
('Quantum Love', 'Rae Morgan', 'Romance', 2022),
('Hidden Trails', 'M. Fox', 'Mystery', 2018),
('Kingdoms and Crowns', 'L. Harper', 'Fantasy', 2019),
('History of Code', 'Imani Rhodes', 'History', 2018),
('Ocean Depths', 'Sasha Cruz', 'Adventure', 2024);

INSERT INTO Loan (user_id, book_id, loan_date, return_date) VALUES
(1, 1, '2023-09-15', '2023-09-29'),
(4, 2, '2023-09-20', '2023-10-01'),
(3, 4, '2023-09-25', '2023-10-09'),
(2, 8, '2023-09-28', '2023-10-12'),
(1, 2, '2023-10-02', '2023-10-16'),
(1, 10, '2023-10-03', '2023-10-17'),
(3, 3, '2023-10-08', '2023-10-22'),
(4, 5, '2023-10-12', '2023-10-26'),
(2, 1, '2023-10-05', '2023-10-20'),
(2, 2, '2023-10-17', '2023-10-31'),
(3, 9, '2023-10-18', '2023-11-01'),
(3, 6, '2023-10-30', '2023-11-10'),
(1, 7, '2023-11-02', '2023-11-16'),
(3, 2, '2023-11-01', '2023-11-15'),
(2, 8, '2023-11-10', '2023-11-24'),
(2, 4, '2023-11-04', '2023-11-18'),
(2, 3, '2023-11-07', '2023-11-21'),
(2, 9, '2023-11-25', '2023-12-09'),
(3, 4, '2023-11-19', '2023-12-03'),
(4, 1, '2023-11-05', '2023-11-19'),
(4, 3, '2023-12-07', '2023-12-21'),
(1, 6, '2023-12-12', NULL),
(2, 7, '2023-12-01', '2023-12-15'),
(1, 8, '2023-12-05', NULL),
(1, 4, '2023-12-19', NULL);

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
