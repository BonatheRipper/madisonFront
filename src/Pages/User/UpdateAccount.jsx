import React from "react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { NormalButton } from "../../Components/LongButtons";
import { useStateContext } from "../../context/Statecontext";
import { updatedUser } from "../../services/UpdateAccount";
import { useEffect } from "react";
import ShareHeader from "../../Components/ShareHeader";
import Footer from "../../Components/Footer";
const UpdateAccount = () => {
  const { themeBG, user, setUser, scrollToTop } = useStateContext();
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await updatedUser(username, email, password, id);
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
  return (
    <>
      <ShareHeader />
      <div className="py-20 flex flex-col px-12">
        <p className="py-6 text-c-green font-bold">
          Update your account information
        </p>
        <div className="flex justify-between items-center h-full w-full border bg-c-gold ">
          <div className="md:flex-1 px-4 py-12 md:p-12 space-y-6 w-full ">
            <h2 className="font-sans text-c-green text-2xl text-center border-b border-c-green">
              Update your account information
            </h2>
            <form
              onSubmit={handleUpdateAccount}
              className="flex w-full flex-col items-center justify-between space-y-4"
            >
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="text-md text-c-green">
                  Username
                </label>
                <input
                  name="username"
                  value={username}
                  placeholder={user.username || "Enter a username"}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="px-4 border-c-green py-2  placeholder:text-c-green  text-c-green  bg-gold border border-pry-100 focus:outline-none focus:border-pry-100 focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-c-green  font-normal text-sm font-body"></p>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-md text-c-green">
                  Email address
                </label>
                <input
                  placeholder={user.email || "Enter your email address"}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="text"
                  className="px-4 border-c-green py-2  text-c-green  bg-gold border focus:outline-none focus:border-bg-c-green focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-c-green  font-normal text-sm font-body"></p>
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
                  className="px-4  py-2  placeholder:text-c-green  text-c-green  border border-c-green  focus:outline-none focus:border  focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-c-green  font-normal text-sm font-body"></p>
              </div>

              <div className="w-full flex items-center justify-center">
                <NormalButton
                  text="Update Account"
                  css={`
                    ${themeBG} hover:text-c-green
                  `}
                />
              </div>
              <div className="w-full  flex  justify-center flex-row md:mx-auto">
                <NavLink
                  className=" text-c-green font-body ml-2 font-bold text-base hover:text-white transition duration-300"
                  to="/"
                >
                  Back
                </NavLink>
              </div>
            </form>
          </div>

          <div
            className={`${themeBG} flex-1 p-12 hidden  md:flex flex-col h-full`}
          >
            <p className="text-c-gold font-sans text-md text-center font-bold">
              Update your account information
            </p>
            <img
              src="https://maplestore.netlify.app/static/media/settings.74cc521accb26f6b8db2d98b739991d4.svg"
              alt="register"
              className="h-96"
            />
            <p className="text-gold font-body text-md text-center font-bold">
              Its fun and easy{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateAccount;
