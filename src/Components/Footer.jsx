import React from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context/Statecontext";
import SubscriptionForm from "./SubscriptionForm";

const Footer = () => {
  const { themeBG, categories } = useStateContext();

  return (
    <footer
      className={`${themeBG}  ${
        themeBG ? `text-c-gold  ` : ""
      }  py-6   flex flex-col space-y-8 justify-between w-full `}
    >
      <div className="flex px-4 mx-0 w-full justify-between drop-shadow-lg py-4 md:px-12">
        <p className="font-medium text-xl md:text-2xl tracking-widest uppercase">
          MARPLE STORE
        </p>
        <div className="flex   flex-col md:flex-row justify-between items-center md:space-x-12">
          <h5 className="hidden md:block font-body uppercase tracking-widest font-medium text-base ">
            Follow Us
          </h5>
          <div className="flex justify-between  items-center space-x-4 md:space-x-6 ">
            <a
              href="/"
              className="hover:text-white md:text-3xl rounded-full transition duration-300"
            >
              <i className="fa fa-facebook-official " aria-hidden="true"></i>
            </a>
            <a
              href="/"
              className="hover:text-white md:text-3xl  transition duration-300"
            >
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a
              href="/"
              className="hover:text-white md:text-3xl  transition duration-300"
            >
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between px-8 md:px-24">
        <div className="flex flex-col md:flex-row  justify-center space-y-6 md:space-y-0 md:justify-between w-full">
          <div className="flex flex-col justify-between space-y-6 md:space-y-4">
            <h6 className=" md:tracking-widest  text-2xl md:text-xl ">Shop</h6>
            {categories.map((cat, i) => {
              let categorySingle =
                cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
              return (
                <NavLink key={i} to={`/shop/${cat}`}>
                  {categorySingle}
                </NavLink>
              );
            })}
          </div>
          <div className="flex flex-col justify-between space-y-6 md:space-y-4">
            <h6 className=" md:tracking-widest  text-2xl md:text-xl ">
              Quick Links
            </h6>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
          <SubscriptionForm />
        </div>
      </div>
      <p className="md:px-24 text-center md:text-justify pt-8">
        Copyright © Maple Stores 2022
      </p>
    </footer>
  );
};

export default Footer;
