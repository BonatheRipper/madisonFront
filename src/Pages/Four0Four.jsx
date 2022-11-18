import React from "react";
import { useEffect } from "react";
import Footer from "../Components/Footer";
import { useStateContext } from "../context/Statecontext";
import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import ShareHeader from "../Components/ShareHeader";

const Four0Four = () => {
  const { scrollToTop, themeBG } = useStateContext();
  useEffect(() => {
    scrollToTop();
    scrollToTop();
    Aos.init({ duration: 500 });
  }, [scrollToTop]);

  return (
    <>
      <ShareHeader />
      <div
        className={`flex  ${themeBG} py-12 md:px-36 justify-center items-center -z-10  w-full`}
      >
        <div
          className="flex flex-col mt-10  md:mt-6 -z-5 space-y-6 border border-c-gold drop-shadow p-12 md:p-24 h-2/5 justify-center w-4/5 md:w-3/4 items-center aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
          data-aos-mirror="true"
          data-aos-once="false"
        >
          <p className="text-lg font-normal text-center md:text-justify">
            The page you were trying to access could not be found
          </p>
          <h2 className="font-fair  text-gold text-6xl">404</h2>
          <p className="text-base font-normal">Something went wrong</p>
          <NavLink
            className=" text-lg flex justify-center items-center space-x-3 w-full text-gold border border-c-gold font-fair py-4 px-8  hover:bg-gold hover:text-pry-100 font-medium transition duration-300"
            to="/"
          >
            Back to home
          </NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Four0Four;
