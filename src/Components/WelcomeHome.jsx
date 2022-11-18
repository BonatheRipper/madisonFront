import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useStateContext } from "../context/Statecontext";
import LongButtons from "./LongButtons";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import headerImg1 from "../images/headerImg1.webp";
import headerImg2 from "../images/headerImg2.webp";

import LoadingElementUser from "./LoadingElementUser";
const WelcomeHome = () => {
  const { themeShape } = useStateContext();
  const [page, setPage] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/pages/home");
        if (data) {
          setPage(data);
          return setLoading(false);
        }
      } catch (e) {
        toast.error(e.response.data);
      }
    };
    getPage();
  }, []);
  return (
    <div className="relative">
      {loading ? (
        <div className="relative w-full py-12">
          {" "}
          <LoadingElementUser />
        </div>
      ) : (
        <div className=" px-8 md:px-24 py-16 md:py-48 flex flex-col md:flex-row justify-around h-3/5 w-full aos-init aos-animate">
          <>
            <div
              data-aos="fade-up"
              className="flex ml-8 justify-center flex-1 items-center flex-col w-full "
            >
              <div
                className={`${themeShape} img-1 border border-black px-2 py-2 w-64 `}
              >
                <img
                  className={`${themeShape} md:w-64 md:h-64 w-full h-60`}
                  alt="Store-Stack"
                  src={headerImg1}
                />
              </div>
              <div
                className={`${themeShape} img-2 -ml-40 md:-mb-48 -mb-36 border w-64 border-black px-2 py-2 `}
              >
                <img
                  className={`${themeShape} md:w-64 md:h-64 w-full h-60`}
                  alt="Store-Stack"
                  src={headerImg2}
                />
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="Welcome flex-1 flex-col flex w-full text md:w-2/5"
            >
              <div className="Welcome-Head py-2  flex justify-between  items-center space-x-2 pt-40 md:mt-0 w-full">
                <div className="w-40 border border-black bg-pry-100 "></div>
                <h4 className="font-fair flex justify-center items-center text-black w-full text-pry-100 text-center md:text-justify font-heading text-base font-medium ">
                  {page.title}
                </h4>
                <div className="w-40 border border-black bg-pry-100"></div>
              </div>
              <h2 className="text-black py-3 text-center md:text-left text-5xl ">
                {page.headerText}
              </h2>
              <p className="text-c-green py-6 text-pry-100 text-base text-justify text-wrap">
                {page.BodyText}
              </p>
              <LongButtons
                to={"/products"}
                text={page.ButtonText}
                css={"hover:bg-c-gold bg-c-green text-c-gold hover:text-black "}
              />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default WelcomeHome;
