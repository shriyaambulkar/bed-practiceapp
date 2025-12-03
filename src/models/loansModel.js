// ##############################################################
// LOANS MODEL
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SELECT ALL LOANS WITH USER AND BOOK INFO
// ##############################################################
module.exports.selectAllLoans = (callback) => {
  const SQLSTATEMENT = `
    SELECT 
      Loan.id,
      Loan.loan_date,
      Loan.return_date,
      User.name AS user_name,
      Book.title AS book_title
    FROM Loan
    INNER JOIN User ON Loan.user_id = User.id
    INNER JOIN Book ON Loan.book_id = Book.id
    ORDER BY Loan.loan_date DESC;
  `;
  
  pool.query(SQLSTATEMENT, callback);
};

// ##############################################################
// DEFINE SELECT LOANS BY USER ID
// ##############################################################
module.exports.selectLoansByUserId = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT 
      Loan.id,
      Loan.loan_date,
      Loan.return_date,
      Book.title AS book_title,
      Book.author AS book_author
    FROM Loan
    INNER JOIN Book ON Loan.book_id = Book.id
    WHERE Loan.user_id = ?
    ORDER BY Loan.loan_date DESC;
  `;
  const VALUES = [data.userid];
  
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE CHECK USER CAN LOAN (COUNT ACTIVE LOANS)
// ##############################################################
module.exports.checkUserCanLoan = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT 
      User.max_loans,
      COUNT(Loan.id) AS current_loans
    FROM User
    LEFT JOIN Loan ON User.id = Loan.user_id AND Loan.return_date IS NULL
    WHERE User.id = ?
    GROUP BY User.id;
  `;
  const VALUES = [data.userid];
  
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE CHECK BOOK AVAILABILITY
// ##############################################################
module.exports.checkBookAvailability = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT COUNT(*) AS active_loans
    FROM Loan
    WHERE book_id = ? AND return_date IS NULL;
  `;
  const VALUES = [data.bookid];
  
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE INSERT NEW LOAN
// ##############################################################
module.exports.insertLoan = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO Loan (user_id, book_id, loan_date)
    VALUES (?, ?, CURDATE());
  `;
  const VALUES = [data.userid, data.bookid];
  
  pool.query(SQLSTATEMENT, VALUES, callback);
};