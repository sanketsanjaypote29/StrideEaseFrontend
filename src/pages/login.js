import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoCreate } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "./helper";


const Login = () => {
  const loginWithGoogle = () => {
    window.open(`${BASE_URL}/auth/google/callback`, "_blank");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("googleId", response.data.user.googleId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left container with SVG */}
      <div className="flex justify-start mt-10 ml-40 mr-20 w-xl h-xl">
        <img
          src="./tablet-login/tablet-login-not-css.svg"
          alt="login"
          className="w-full h-full "
        />
      </div>

      <div className="flex justify-center h-full p-4 mt-10 ml-20 rounded-lg shadow-lg w-96 bg-white-50 shadow-blue-950">
        <form className="w-72" onSubmit={loginUser}>
          <div className="mt-10 mb-5">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="email"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-900"
                placeholder=" "
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-900 before:border-blue-gray-200 peer-focus:before:!border-blue-900 after:border-blue-gray-200 peer-focus:after:!border-blue-900">
                Email
              </label>
            </div>
          </div>
          <div className="mt-10 mb-5">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="password"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-900"
                placeholder=" "
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-900 before:border-blue-gray-200 peer-focus:before:!border-blue-900 after:border-blue-gray-200 peer-focus:after:!border-blue-900">
                Password
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-black bg-transparent border rounded-full hover:border-blue-800 mt-11">
              <div className="mr-2">
                {/* Wrapper div for spacing */}
                <IoCreate /> {/* Add the Google icon */}
              </div>
              Login
            </button>
            <button
              className="flex items-center px-4 py-2 ml-8 text-black bg-transparent border rounded-full hover:border-blue-800 mt-11"
              onClick={loginWithGoogle}>
              <div className="mr-2">
                {" "}
                <FcGoogle />
              </div>
              Google Login
            </button>
          </div>

          <p className="mt-5 text-center">
            Create an account?{" "}
            <Link to="/register" className="text-blue-800">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
