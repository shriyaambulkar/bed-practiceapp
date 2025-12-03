// ##############################################################
// LOANS CONTROLLER
// ##############################################################
const model = require("../models/loansModel");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL LOANS
// ##############################################################
const readAllLoans = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllLoans:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  
  model.selectAllLoans(callback);
};



// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR LOAN SUMMARY
// ##############################################################
const getLoanSummary = (req, res, next) => {
  const data = {
    userid: req.params.userid
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getLoanSummary:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No loan history found for this user."
        });
        return;
      }

     const activeLoans = results.filter(loan => loan.return_date === null);  // Changed variable name
     const pastLoans = results.filter(loan => loan.return_date !== null);

    res.status(200).json({
    active: activeLoans,   // Use activeLoans
    past: pastLoans
});
    }
  };

  model.selectLoansByUserId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR LOAN SUMMARY
// ##############################################################
// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE NEW LOAN
// ##############################################################
const createNewLoan = (req, res, next) => {
  const data = {
    userid: req.params.userid,
    bookid: req.params.bookid
  };

  // Step 1: Check if user can loan
  model.checkUserCanLoan(data, (error, userResults) => {
    if (error) {
      console.error("Error checking user loan eligibility:", error);
      return res.status(500).json(error);
    }

    if (userResults.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const { max_loans, current_loans } = userResults[0];

    if (current_loans >= max_loans) {
      return res.status(400).json({ 
        message: "User has reached maximum active loans.",
      });
    }

    // Step 2: Check if book is available
    model.checkBookAvailability(data, (error, bookResults) => {
      if (error) {
        console.error("Error checking book availability:", error);
        return res.status(500).json(error);
      }

      const { active_loans } = bookResults[0];

      if (active_loans > 0) {
        return res.status(409).json({ 
          message: "Book is currently on loan."
        });
      }

      // Step 3: Create the loan
      model.insertLoan(data, (error, results) => {
        if (error) {
          console.error("Error creating loan:", error);
          return res.status(500).json(error);
        }

        res.status(201).json({
          message: "Loan created successfully.",
          loanId: results.insertId
        });
      });
    });
  });
};

// ##############################################################
// EXPORT CONTROLLER FUNCTIONS
// ##############################################################
module.exports = {
  readAllLoans,
  getLoanSummary,
  createNewLoan
};