// controllers/loanController.js
import Loan from "../models/Loan.js";

// Function to create a new loan
export const createLoan = async (req, res) => {
  try {
    const {
      rangeStart,
      rangeEnd,
      interestRate10Days,
      interestRate14Days,
      repaymentSchedule,
      finePercentage,
      incrementalFines,
      processingFee,
    } = req.body;

    // Validate required fields
    if (
      rangeStart === undefined ||
      rangeEnd === undefined ||
      interestRate10Days === undefined ||
      interestRate14Days === undefined ||
      repaymentSchedule === undefined ||
      finePercentage === undefined ||
      incrementalFines === undefined ||
      processingFee === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new loan
    const loan = new Loan({
      rangeStart,
      rangeEnd,
      interestRate10Days,
      interestRate14Days,
      repaymentSchedule,
      finePercentage,
      incrementalFines,
      processingFee,
    });

    console.log(loan);

    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get all loans
export const getLoans = async (req, res) => {
  try {
    // Retrieve all loan records
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add other loan-related functions here (e.g., updateLoan)
