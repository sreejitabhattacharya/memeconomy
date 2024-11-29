import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyPage = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message || "An error occurred.");
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">{message}</h1>
      </div>
    </div>
  );
};

export default VerifyPage;
