"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const WelcomePage = () => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const handleCloseLogin = () => {
    setLogin(!login);
  };

  const handleCloseRegister = () => {
    setRegister(!register);
  };

  const handleToggle = () => {
    setLogin(!login);
    setRegister(!register);
  };
  return (
    <>
      <div className="border-b-[1px] border-neutral-800 py-10">
        <h1 className="text-white text-center text-2xl font-semibold">
          Welcome To Twitter
        </h1>
        <div className="flex items-center justify-center mt-8">
          <button
            className="bg-sky-500 text-white border-none outline-none text-xl font-semibold rounded-full px-4 py-2 me-4"
            onClick={handleCloseLogin}
          >
            Login
          </button>
          <button
            className="bg-white text-black border-none outline-none text-xl font-semibold rounded-full px-4 py-2 "
            onClick={handleCloseRegister}
          >
            Register
          </button>
        </div>
      </div>

      {login ? (
        <LoginForm closeBtn={handleCloseLogin} handleRegister={handleToggle} />
      ) : (
        ""
      )}
      {register ? (
        <RegisterForm
          closeBtn={handleCloseRegister}
          handleLogin={handleToggle}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default WelcomePage;
