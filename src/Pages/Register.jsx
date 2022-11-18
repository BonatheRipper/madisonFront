import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NormalButton } from "../Components/LongButtons";
import { useStateContext } from "../context/Statecontext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import ShareHeader from "../Components/ShareHeader";
const Register = () => {
  const { themeBG, user, setUser, scrollToTop } = useStateContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    scrollToTop();
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("password does not match");
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        email,
        password,
        username,
        confirmPassword,
      });
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        toast("Account created successfully");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      <ShareHeader />
      <div className="py-20 flex flex-col px-12">
        <p className="py-6 text-c-green font-bold">Registration</p>
        <div className="flex justify-between items-center h-full w-full border bg-c-gold ">
          <div className="md:flex-1 px-4 py-12 md:p-12 space-y-6 w-full ">
            <h2 className="font-sans text-c-green text-2xl text-center border-b border-c-green">
              Registration information
            </h2>
            <form
              onSubmit={handleRegisterFormSubmit}
              className="flex w-full flex-col items-center justify-between space-y-4"
            >
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="text-md text-c-green">
                  Username
                </label>
                <input
                  placeholder="Enter a username"
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="px-4 border-c-green py-2  placeholder:text-pry-100 text-pry-100 bg-gold border border-pry-100 focus:outline-none focus:border-pry-100 focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-pry-100 font-normal text-sm font-body"></p>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-md text-c-green">
                  Email address
                </label>
                <input
                  placeholder="Enter your email address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="text"
                  className="px-4 border-c-green py-2  text-pry-100 bg-gold border focus:outline-none focus:border-bg-c-green focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-pry-100 font-normal text-sm font-body"></p>
              </div>
              <div className="flex flex-col w-full mb-6">
                <label htmlFor="password" className="text-md text-c-green ">
                  Password
                </label>
                <input
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  className="px-4  py-2  placeholder:text-pry-100 text-pry-100 border border-c-green  focus:outline-none focus:border  focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-pry-100 font-normal text-sm font-body"></p>
              </div>
              <div className="flex flex-col w-full mb-6">
                <label htmlFor="password" className="text-md text-c-green">
                  Confirm Password
                </label>
                <input
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  type="password"
                  className="px-4  py-2  placeholder:text-pry-100 text-pry-100 border border-c-green  focus:outline-none focus:border  focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-pry-100 font-normal text-sm font-body"></p>
              </div>
              <div className="w-full flex items-center justify-center">
                <NormalButton
                  text="Register"
                  css={`
                    ${themeBG} hover:text-c-green
                  `}
                />
              </div>
              <div className="w-full  flex  justify-center flex-row md:mx-auto">
                <p className="text-pry-100 font-body text-base">
                  Already have an account?
                </p>
                <NavLink
                  className="text-pry-100 font-body ml-2 font-bold text-base hover:text-pry-50 transition duration-300"
                  to="/login"
                >
                  Login
                </NavLink>
              </div>
            </form>
          </div>

          <div
            className={`${themeBG} flex-1 p-12 hidden  md:flex flex-col h-full`}
          >
            <p className="text-c-gold font-sans text-md text-center font-bold">
              At maple store, we are commited to ensure you have a blissful
              shopping experience.
            </p>
            <img
              src="https://maplestore.netlify.app/static/media/signup.3df8cceb420d3620f923646fe3cef378.svg"
              alt="register"
              className="h-96"
            />
            <p className="text-gold font-body text-md text-center font-bold">
              We look forward to providing you a great &amp; funfilled shopping.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
