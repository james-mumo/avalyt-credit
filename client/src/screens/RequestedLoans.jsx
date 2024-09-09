import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig"; // Import your Axios instance

function RequestedLoans() {
  // State declarations
  const [pendingLoans, setPendingLoans] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loanPackages, setLoanPackages] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "",
    loanPackageID: "",
    amount: "",
    loanDuration: "7", // Default value in days
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pending loans, customers, and loan packages
    const fetchData = async () => {
      try {
        const [loansResponse, usersResponse, packagesResponse] =
          await Promise.all([
            axiosInstance.get("/loanallocations"),
            axiosInstance.get("/users"),
            axiosInstance.get("/loans"),
          ]);

        setPendingLoans(loansResponse.data);
        setCustomers(usersResponse.data);
        setLoanPackages(packagesResponse.data);
        console.log(loansResponse);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoanPackageChange = (e) => {
    const selectedPackage = loanPackages.find(
      (pkg) => pkg._id === e.target.value
    );
    if (selectedPackage) {
      setFormData({
        ...formData,
        loanPackageID: selectedPackage._id,
        amount: selectedPackage.rangeStart,
      });
    }
  };

  const calculateRepaymentDates = () => {
    const { loanDuration } = formData;

    const loanRepaymentStartDate = new Date();
    loanRepaymentStartDate.setDate(
      loanRepaymentStartDate.getDate() + parseInt(loanDuration, 10)
    ); // Add duration to current date
    const loan_RepaymentDateFormatted = loanRepaymentStartDate
      .toISOString()
      .split("T")[0]; // Format date to "yyyy-MM-dd"

    return { loanRepaymentStartDate: loan_RepaymentDateFormatted };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { loanRepaymentStartDate } = calculateRepaymentDates();

      // Ensure correct values are being logged before submission
      console.log("Submitting form data:", {
        ...formData,
        loanRepaymentStartDate,
      });

      // Send data to backend
      const response = await axiosInstance.post("/loanallocations", {
        userID: formData.customer_id,
        loanID: formData.loanPackageID,
        loanRepaymentStartDate,
        amount: formData.amount,
        loanDuration: formData.loanDuration,
      });
      console.log("Loan allocated:", response.data);

      // Optionally refresh the pending loans list or clear the form
      const updatedResponse = await axiosInstance.get("/loanallocations");
      setPendingLoans(updatedResponse.data);

      // Reset form data
      setFormData({
        customer_id: "",
        loanPackageID: "",
        amount: "",
        loanDuration: "7", // Reset duration to default value
      });
    } catch (error) {
      console.error("Error allocating loan:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const daysToWeeks = (days) => {
    if (days % 7 === 0) {
      return `${days / 7} week${days / 7 > 1 ? "s" : ""}`;
    }
    return `${days} Days`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date"; // Check for invalid dates
    return date.toLocaleDateString("en-US"); // Format as MM/DD/YYYY
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Loans</h1>
      <table className="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Customer Name</th>
            <th className="py-2 px-4 border">Loan Amount</th>
            <th className="py-2 px-4 border">Loan Duration</th>
            <th className="py-2 px-4 border">Loan Repayment Start</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {pendingLoans.map((loan) => (
            <tr key={loan._id}>
              <td className="py-2 px-4 border">
                {loan?.userID?.firstName} {loan?.userID?.lastName}
              </td>
              <td className="py-2 px-4 border">{loan.amount} Ksh</td>
              <td className="py-2 px-4 border">
                {daysToWeeks(loan.loanDuration)}
              </td>
              <td className="py-2 px-4 border">
                {formatDate(loan.loanRepaymentStartDate)}
              </td>

              <td className="py-2 px-4 border">{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mb-4">Allocate New Loan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Customer</label>
          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Select Loan Package</label>
          <select
            name="loanPackageID"
            value={formData.loanPackageID}
            onChange={handleLoanPackageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Loan Package</option>
            {loanPackages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {`${pkg.rangeStart} - ${pkg.rangeEnd} Ksh`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Loan Amount (Ksh)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            min={
              loanPackages.find((pkg) => pkg._id === formData.loanPackageID)
                ?.rangeStart || 0
            }
            max={
              loanPackages.find((pkg) => pkg._id === formData.loanPackageID)
                ?.rangeEnd || 0
            }
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Loan Duration</label>
          <select
            name="loanDuration"
            value={formData.loanDuration}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="7">1 Week</option>
            <option value="14">2 Weeks</option>
            <option value="21">3 Weeks</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Repayment Start Date</label>
          <input
            type="date"
            value={calculateRepaymentDates().loandRepaymentStartDate}
            readOnly
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500"
        >
          Allocate Loan
        </button>
      </form>
    </div>
  );
}

export default RequestedLoans;
