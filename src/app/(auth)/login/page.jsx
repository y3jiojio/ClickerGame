"use client";
import {  useState } from 'react';
import { auth } from '@/app/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {  useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSession } from '@/actions/authActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter()


  const handleLogin = async () => {
    setError(null);
    try {
      if (!email || !password) {
        throw new Error('All fields are required');
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          createSession(JSON.stringify({
            userID:user.uid ,
            userName: user.displayName,
             userEmail: user.email
        })).then(() => router.push("/"))

        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
          onClick={handleLogin}
          className="w-full p-3 bg-black rounded text-white hover:bg-gray-900"
        >
          Login
        </button>
        <p className="text-white text-center">
          Haven&apos;t any account? <Link href={"/signup"}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

