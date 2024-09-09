import express from "express";
import {
  allocateLoan,
  getAllLoanAllocations,
} from "../controllers/loanAllocationController.js";

const router = express.Router();

// Route to allocate a loan
router.post("/loanallocations", allocateLoan);

// Route to get all loan allocations
router.get("/loanallocations", getAllLoanAllocations);

export default router;
