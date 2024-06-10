"use client"

import {  useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

   // Function to validate email format
   const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignUp = async () => {
    setError(null); // Reset error state
    try {
      // Validate fields
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      if (!validateEmail(email)) {
        throw new Error("Invalid email address");
      }

      if (password.length < 6 || password.length > 32) {
        throw new Error("Password must be between 6 to 32 characters long");
      }
      const res = await createUserWithEmailAndPassword(email, password);
      // Update profile
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      setEmail("");
      setPassword("");
      setName("");
      router.push("/login");
    } catch (e) {
      setError(e.message);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          required
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-black rounded text-white hover:bg-gray-900"
        >
          Sign Up
        </button>
        <p className="text-white text-center">Already have an account? <Link href={"/login"}>Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
