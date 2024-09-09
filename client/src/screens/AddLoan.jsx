import React, { useState, useEffect } from "react";
import axios from "../axiosConfig"; // Import your Axios instance

function AddLoan() {
  const [loanPackages, setLoanPackages] = useState([]);
  const [newLoan, setNewLoan] = useState({
    rangeStart: "",
    rangeEnd: "",
    interestRate10Days: "",
    interestRate14Days: "",
    repaymentSchedule: "Daily",
    finePercentage: "",
    incrementalFines: "",
    processingFee: "",
  });

  const repaymentOptions = ["Daily", "Weekly", "Bi-Weekly", "Monthly"];

  useEffect(() => {
    // Fetch all loan packages from the backend
    const fetchLoanPackages = async () => {
      try {
        const response = await axios.get("/loans");
        setLoanPackages(response.data);
      } catch (error) {
        console.error("Error fetching loan packages:", error);
      }
    };

    fetchLoanPackages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLoan({ ...newLoan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPackage = {
      rangeStart: newLoan.rangeStart,
      rangeEnd: newLoan.rangeEnd,
      interestRate10Days: newLoan.interestRate10Days,
      interestRate14Days: newLoan.interestRate14Days,
      repaymentSchedule: newLoan.repaymentSchedule,
      finePercentage: newLoan.finePercentage,
      incrementalFines: newLoan.incrementalFines,
      processingFee: newLoan.processingFee,
    };

    try {
      // Send the new loan package to the backend
      const response = await axios.post("/loans", newPackage);
      console.log("Loan package added:", response.data);

      // Optionally update the local state to reflect the new package immediately
      setLoanPackages([...loanPackages, response.data]);

      // Clear the form
      setNewLoan({
        rangeStart: "",
        rangeEnd: "",
        interestRate10Days: "",
        interestRate14Days: "",
        repaymentSchedule: "Daily",
        finePercentage: "",
        incrementalFines: "",
        processingFee: "",
      });
    } catch (error) {
      console.error("Error adding loan package:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Loan Packages</h1>
      <table className="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Loan Range</th>
            <th className="py-2 px-4 border">Interest (10 Days)</th>
            <th className="py-2 px-4 border">Interest (14 Days)</th>
            <th className="py-2 px-4 border">Repayment Schedule</th>
            <th className="py-2 px-4 border">Fine %</th>
            <th className="py-2 px-4 border">Incremental Fines</th>
            <th className="py-2 px-4 border">Processing Fee</th>
          </tr>
        </thead>
        <tbody>
          {loanPackages.map((loan) => (
            <tr key={loan._id}>
              <td className="py-2 px-4 border">{`${loan.rangeStart} - ${loan.rangeEnd} Ksh`}</td>
              <td className="py-2 px-4 border">{`${loan.interestRate10Days}%`}</td>
              <td className="py-2 px-4 border">{`${loan.interestRate14Days}%`}</td>
              <td className="py-2 px-4 border">{loan.repaymentSchedule}</td>
              <td className="py-2 px-4 border">{`${loan.finePercentage}% of borrowed amount`}</td>
              <td className="py-2 px-4 border">{`${loan.incrementalFines}% per missed payment`}</td>
              <td className="py-2 px-4 border">{`${loan.processingFee} Ksh`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Create New Loan Package</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-2 mb-4">
        <div>
          <label className="block mb-1">Loan Range Start (Ksh)</label>
          <input
            type="number"
            name="rangeStart"
            value={newLoan.rangeStart}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Loan Range End (Ksh)</label>
          <input
            type="number"
            name="rangeEnd"
            value={newLoan.rangeEnd}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Interest Rate (10 Days)</label>
          <input
            type="number"
            name="interestRate10Days"
            value={newLoan.interestRate10Days}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Interest Rate (14 Days)</label>
          <input
            type="number"
            name="interestRate14Days"
            value={newLoan.interestRate14Days}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Repayment Schedule</label>
          <select
            name="repaymentSchedule"
            value={newLoan.repaymentSchedule}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            {repaymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Fine %</label>
          <input
            type="number"
            name="finePercentage"
            value={newLoan.finePercentage}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Incremental Fines %</label>
          <input
            type="number"
            name="incrementalFines"
            value={newLoan.incrementalFines}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Processing Fee (Ksh)</label>
          <input
            type="number"
            name="processingFee"
            value={newLoan.processingFee}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Loan Package
        </button>
      </form>
    </div>
  );
}

export default AddLoan;
