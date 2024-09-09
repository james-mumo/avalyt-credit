// models/Loan.js
import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  rangeStart: { type: Number, required: true }, // Starting amount of the loan range
  rangeEnd: { type: Number, required: true }, // Ending amount of the loan range
  interestRate10Days: { type: Number, required: true }, // Interest rate for 10 days
  interestRate14Days: { type: Number, required: true }, // Interest rate for 14 days
  repaymentSchedule: { type: String, required: true }, // Repayment schedule (e.g., 'Daily', 'Weekly')
  finePercentage: { type: Number, required: true }, // Fine percentage for missed payments
  incrementalFines: { type: Number, required: true }, // Incremental fines percentage
  processingFee: { type: Number, required: true }, // Processing fee
  createdAt: { type: Date, default: Date.now },
});

const Loan = mongoose.model("Loan", LoanSchema);

export default Loan;
