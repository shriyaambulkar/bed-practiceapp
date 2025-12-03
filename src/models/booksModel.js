// ##############################################################
// BOOKS MODEL
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE INSERT OPERATION FOR BOOK
// ##############################################################
module.exports.insertBook = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO Book (title, author, category, published_year) 
    VALUES (?, ?, ?, ?);
  `;
  const VALUES = [data.title, data.author, data.category, data.published_year];
  
  pool.query(SQLSTATEMENT, VALUES, callback);
};
// ##############################################################
// DEFINE SEARCH OPERATION FOR BOOKS
// ##############################################################
module.exports.searchBooks = (data, callback) => {
  let SQLSTATEMENT = `SELECT * FROM Book WHERE 1=1`;
  const VALUES = [];

  if (data.title) {
    SQLSTATEMENT += ` AND title LIKE ?`;
    VALUES.push(`%${data.title}%`);
  }

  if (data.author) {
    SQLSTATEMENT += ` AND author LIKE ?`;
    VALUES.push(`%${data.author}%`);
  }

  if (data.category) {
    SQLSTATEMENT += ` AND category LIKE ?`;
    VALUES.push(`%${data.category}%`);
  }

  if (data.publishyear) {
    SQLSTATEMENT += ` AND published_year = ?`;
    VALUES.push(data.publishyear);
  }

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT BOOKS NOT BORROWED BY USER
// ##############################################################
module.exports.selectBooksNotBorrowedByUser = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT Book.*
    FROM Book
    WHERE Book.id NOT IN (
      SELECT book_id 
      FROM Loan 
      WHERE user_id = ?
    )
    ORDER BY Book.title;
  `;
  const VALUES = [data.userid];
  
  pool.query(SQLSTATEMENT, VALUES, callback);
};