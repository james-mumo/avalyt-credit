import mongoose from "mongoose";

const loanAllocationSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loanID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
    required: true,
  },
  loanRepaymentStartDate: {
    type: Date,
    // required: true,
  },
  endDate: {
    type: Date,
    // required: true,
  },
  status: {
    type: String,
    enum: ["Allocated", "Pending", "Paid"],
    default: "Pending",
  },
  amount: {
    type: Number,
    required: true,
  },
  loanDuration: {
    type: Number,
    required: true,
  },
});

const LoanAllocation = mongoose.model("LoanAllocation", loanAllocationSchema);
export default LoanAllocation;
