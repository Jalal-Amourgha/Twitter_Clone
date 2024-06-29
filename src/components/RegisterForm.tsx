"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface RegisterFormProps {
  closeBtn: () => void;
  handleLogin: () => void;
}

const RegisterForm = ({ closeBtn, handleLogin }: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !username) {
      console.log("All filds are required");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",

        body: JSON.stringify({
          email,
          name,
          username,
          password,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none bg-neutral-800 bg-opacity-70">
      <div className="max-w-[600px] w-[600px] mx-1 bg-black p-5 rounded-md">
        <div className="flex justify-between items-center mb-7">
          <h1 className="text-2xl text-white font-bold">Create an Account</h1>
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
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
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
            Register
          </button>
        </form>

        <div className="text-neutral-400 text-base text-center">
          Already have an account?{" "}
          <span
            className="font-semibold text-white cursor-pointer"
            onClick={handleLogin}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
