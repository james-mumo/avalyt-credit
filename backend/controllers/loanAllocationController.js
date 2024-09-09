import mongoose from "mongoose";
import LoanAllocation from "../models/LoanAllocation.js";
import User from "../models/User.js";
import Loan from "../models/Loan.js";

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Allocate a loan to a user
export const allocateLoan = async (req, res) => {
  try {
    const {
      userID,
      loanID,
      loanDuration,
      loanRepaymentStartDate,
      endDate,
      amount,
    } = req.body;

    // Validate userID and loanID
    if (!isValidObjectId(userID) || !isValidObjectId(loanID)) {
      return res.status(400).json({
        error: "Invalid userID or loanID format. Must be a valid ObjectId.",
      });
    }

    // Convert IDs to ObjectId
    const convertedUserID = new mongoose.Types.ObjectId(userID);
    const convertedLoanID = new mongoose.Types.ObjectId(loanID);

    // Check if user and loan exist
    const userExists = await User.findById(convertedUserID);
    const loanExists = await Loan.findById(convertedLoanID);

    if (!userExists || !loanExists) {
      return res
        .status(404)
        .json({ error: "User or Loan not found with provided IDs." });
    }

    const newLoanAllocation = new LoanAllocation({
      userID: convertedUserID,
      loanID: convertedLoanID,
      loanRepaymentStartDate,
      endDate,
      loanDuration,
      amount,
    });

    await newLoanAllocation.save();
    res.status(201).json(newLoanAllocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch all loan allocations
export const getAllLoanAllocations = async (req, res) => {
  try {
    const loanAllocations = await LoanAllocation.find()
      .populate("userID") // Populate user details
      .populate("loanID"); // Populate loan details
    res.status(200).json(loanAllocations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
