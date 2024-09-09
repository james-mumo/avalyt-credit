// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import loanAllocationRoutes from "./routes/loanAllocationRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4444;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", loanRoutes);
app.use("/api", loanAllocationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
