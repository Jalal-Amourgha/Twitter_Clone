"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
interface LoginFormProps {
  closeBtn: () => void;
  handleRegister: () => void;
}

const LoginForm = ({ closeBtn, handleRegister }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      console.error("Error during login:", error);
      console.log("An unexpected error occurred. Please try again.");
    } finally {
      closeBtn();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none bg-neutral-800 bg-opacity-70">
      <div className="max-w-[600px] w-[600px] mx-1 bg-black p-5 rounded-md">
        <div className="flex justify-between items-center mb-7">
          <h1 className="text-2xl text-white font-bold">Login</h1>
          <button
            className="text-white text-2xl outline-none border-none cursor-pointer"
            onClick={closeBtn}
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-full text-black font-semibold text-lg bg-white p-2 my-3"
          >
            Sign in
          </button>
        </form>

        <div className="text-neutral-400 text-lg text-center">
          Don't have an account yet?{" "}
          <span
            className="font-semibold text-white cursor-pointer"
            onClick={handleRegister}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
