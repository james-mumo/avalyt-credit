import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

function Auth() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-500">
      <div className="text-center mb-6">
        <button
          onClick={() => setIsSignup(true)}
          className={`px-4 py-2 ${
            isSignup ? "bg-blue text-white" : "bg-white text-blue"
          } border border-blue rounded`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setIsSignup(false)}
          className={`px-4 py-2 ${
            !isSignup ? "bg-blue text-white" : "bg-white text-blue"
          } border border-blue rounded`}
        >
          Login
        </button>
      </div>
      <div className="w-full max-w-md">{isSignup ? <Signup /> : <Login />}</div>
    </div>
  );
}

export default Auth;
