import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import FormField from "../components/FormField";
import WideButton from "../components/WideButton";
import { ClipLoader } from "react-spinners";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true); 
    setErrorMessage(""); 

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false); 
      setErrorMessage("Your password may be incorrect, or you haven't signed up."); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#212121]">
      <Card>
        
        <div className="flex justify-center items-center w-full">
          <h1 className="text-white text-2xl font-bold my-4 text-center">Login</h1>
        </div>
        
        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin} className="w-full">
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
            className="mt-6"
          />
          <WideButton type="submit">
            {loading ? <ClipLoader size={20} color={"#000"} /> : "Sign In"}
          </WideButton>
        </form>

        <div className="mt-4 w-full flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
          <p className="text-center sm:text-left">
            New User?{" "}
            <span
              className="text-custom-cyan cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
          <p
            className="text-custom-cyan cursor-pointer text-center sm:text-right"
            onClick={() => navigate("/reset-password")}
          >
            Forgot Password?
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
