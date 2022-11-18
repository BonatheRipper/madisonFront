import React from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ShareHeader from "../../Components/ShareHeader";
import Footer from "../../Components/Footer";
import { useStateContext } from "../../context/Statecontext";
const Account = () => {
  const { themeBG, user } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <>
      <ShareHeader />
      <div className="p-10 my-20 bg-[#F1FFFD] w-full items-center justify-center  flex h-full pt-32 pb-20 px-4 lg:px-0">
        <div
          className={` ${themeBG} w-full lg:w-2/5 flex flex-col justify-center items-center lg:space-x-4 p-4 lg:p-4 `}
        >
          {user && (
            <div className="p-4 lg:p-8 border-b border-b-c-gold space-y-8 flex  justify-start flex-col">
              <div className="flex justify-center items-center w-full  divide-x divide-c-gold">
                <h2 className="  text-xl text-center border-b-c-gold border-b w-full">
                  Your information
                </h2>
              </div>
              <div className="flex  justify-start items-center ">
                <span className="mx-2">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
                <span>{user.username}</span>
              </div>
              <div className="flex  justify-start items-center ">
                <span className="mx-2">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <span>{user.email}</span>
              </div>
              <div
                className="flex
             w-full p-1"
              >
                <NavLink
                  to={`/account/${user._id}`}
                  className={` hover:text-c-green hover:bg-c-gold px-4 py-2 border border-c-gold mx-2`}
                >
                  Edit Account
                </NavLink>
                <NavLink
                  to={`/order/orderhistory`}
                  className={` hover:text-c-green hover:bg-c-gold px-4 py-2 border border-c-gold mx-2`}
                >
                  Order History
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
