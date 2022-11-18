import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import { NormalButton } from "../Components/LongButtons";
import ShareHeader from "../Components/ShareHeader";
import { useStateContext } from "../context/Statecontext";
import { getUser } from "../services/LoginUser";
const Login = () => {
  const { themeBG, user, setUser, scrollToTop } = useStateContext();
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await getUser(usernameEmail, password);
      console.log(userData);
      setUser(userData);
      toast("Login success");
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  useEffect(() => {
    scrollToTop();
    if (user) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);
  return (
    <>
      <ShareHeader />
      <div className="py-20 flex flex-col px-12">
        <p className="py-6 text-c-green font-bold">Login</p>
        <div className="flex justify-between items-center h-full w-full border bg-c-gold ">
          <div className="md:flex-1 px-4 py-12 md:p-12 space-y-6 w-full ">
            <h2 className="font-sans text-c-green text-2xl text-center border-b border-c-green">
              Login information
            </h2>
            <form
              onSubmit={handleLoginFormSubmit}
              className="flex w-full flex-col items-center justify-between space-y-4"
            >
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="text-md text-c-green ">
                  Username/Email
                </label>
                <input
                  placeholder="Enter a username"
                  name="email"
                  onChange={(e) => setUsernameEmail(e.target.value)}
                  id="username"
                  type="email"
                  className="px-4 border-c-green py-2  placeholder:text-pry-100 text-pry-100 bg-gold border border-pry-100 focus:outline-none focus:border-pry-100 focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
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

              <div className="w-full flex items-center justify-center">
                <NormalButton
                  text="Login"
                  css={`
                    ${themeBG} hover:text-c-green w-full
                  `}
                />
              </div>
              <div className="w-full  flex  justify-center flex-row md:mx-auto text-gray-700">
                <p className="text-pry-100 font-body text-base">
                  Don't have an account?
                </p>
                <NavLink
                  className="text-pry-100 font-body ml-2 font-bold text-base hover:text-pry-50 transition duration-300 underline"
                  to="/register"
                >
                  Register
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

export default Login;
