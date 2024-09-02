import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card"; 
import FormField from "../components/FormField";
import WideButton from "../components/WideButton";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(""); 
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setNotification("Password reset email sent! Please check your inbox.");
      setTimeout(() => {
        navigate("/login");
      }, 3000); 
    } catch (error) {
      console.error("Error resetting password:", error);
      setNotification("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#212121]">
      <Card> 
        <div className="flex flex-col items-center w-full"> 
          <h1 className="text-white text-2xl font-bold my-4 text-center">Reset Password</h1> {/* Centered text */}
          <FormField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mt-4"
          />
          <WideButton onClick={handleResetPassword} className="mt-4">Reset Password</WideButton>
          {notification && (
            <div className="text-custom-cyan mt-4 text-center">{notification}</div> 
          )}
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
