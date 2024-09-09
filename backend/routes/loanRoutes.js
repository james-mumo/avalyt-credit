// routes/loanRoutes.js
import express from "express";
import { createLoan, getLoans } from "../controllers/loanController.js";

const router = express.Router();

// Route to create a new loan
router.post("/loans", createLoan);

// Route to get all loans
router.get("/loans", getLoans);

export default router;
