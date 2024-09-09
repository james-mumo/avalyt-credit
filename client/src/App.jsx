// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./screens/Auth";
import Dashboard from "./screens/Dashboard";
import AddLoan from "./screens/AddLoan";
import RequestedLoans from "./screens/RequestedLoans";
import ActiveLoans from "./screens/ActiveLoans";
import LoanHistory from "./screens/LoanHistory";
import Payments from "./screens/Payments";
import ViewCustomers from "./screens/ViewCustomers";
import Profile from "./screens/Profile";
import Support from "./screens/Support";
import SharedLayout from "./components/SharedLayout";

function App() {
  return (
    <div className="w-100vw">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />

          {/* Shared view layout wrapping all main routes */}
          <Route element={<SharedLayout />}>
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/create-loan" element={<AddLoan />} />
            <Route path="/requested-loans" element={<RequestedLoans />} />
            <Route path="/active-loans" element={<ActiveLoans />} />
            <Route path="/loan-history" element={<LoanHistory />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/customers" element={<ViewCustomers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
