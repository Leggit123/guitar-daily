import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card"; 
import FormField from "../components/FormField"; 
import WideButton from "../components/WideButton"; 
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import { ClipLoader } from "react-spinners"; 

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToPolicy, setAgreeToPolicy] = useState(false); 
  const [message, setMessage] = useState(""); 
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!agreeToPolicy) {
      setMessage("You must agree to the privacy policy to sign up.");
      return;
    }

    setLoading(true); 

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Signup successful! Redirecting to dashboard...");
      setTimeout(() => {
        setLoading(false); 
        navigate("/dashboard");
      }, 2000); 
    } catch (error) {
      setLoading(false); 
      if (error.code === "auth/email-already-in-use") {
        setMessage("Email already in use. Please log in instead.");
      } else {
        console.error("Error signing up:", error);
        setMessage("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#212121]">
      <Card>
        <div className="flex flex-col items-center w-full">
          <h1 className="text-white text-2xl font-bold my-4 text-center">Sign Up</h1>
          {message && (
            <div className="text-custom-cyan mb-4 text-center">{message}</div>
          )}
          <FormField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mt-4"
          />
          <FormField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-4"
          />
          <FormField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="mt-4"
          />
         
          <div className="flex items-center mt-4 space-x-1">
            <input
              type="checkbox"
              checked={agreeToPolicy}
              onChange={(e) => setAgreeToPolicy(e.target.checked)}
              className="mr-1"
            />
            <label className="text-white">
              I agree to the{" "}
              <span
                className="text-custom-cyan underline cursor-pointer"
                onClick={() => setIsPrivacyPolicyOpen(true)}
              >
                Privacy Policy
              </span>
            </label>
          </div>
          <WideButton onClick={handleSignup} className="mt-4">
            {loading ? <ClipLoader size={20} color={"#000"} /> : "Sign Up"}
          </WideButton>
          <p className="mt-4 text-center">
            Already a user?{" "}
            <span
              className="text-custom-cyan cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </Card>
      <PrivacyPolicyModal 
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
    </div>
  );
};

export default SignupPage;
