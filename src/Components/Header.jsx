import React from "react";
import headerImg from "../images/headerImg.png";
import { useStateContext } from "../context/Statecontext";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import LongButtons from "./LongButtons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Header = () => {
  const { themeBG, themeShape } = useStateContext();
  const [page, setPage] = useState({});
  useEffect(() => {
    Aos.init({ duration: 500 });
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/pages/homeheader");
        if (data) {
          setPage(data);
        }
      } catch (e) {
        toast.error(e.response.data);
      }
    };
    getPage();
  }, []);
  return (
    <header className="w-full">
      <div
        className={`
      ${themeBG ? `${themeBG} text-c-gold` : ""}`}
      >
        <div className="font-fair bg-pry-100 md:py-36 md:pt-40 py-24 px-8 md:px-24 h-4/5 items-center flex  flex-col md:flex-row justify-between">
          <div className=" headerTex  flex flex-col justify-between h-5/6 leading-loose space-y-8 md:space-y-12 aos-init aos-animate md:w-8/12">
            <h1
              data-aos="fade-down"
              className="font-fair w-full leading-loose text-center text-3xl py-6  md:text-6xl text-gold uppercase  md:text-left md:block"
            >
              {page.headerText}
            </h1>
            <p className="text-gold md:w-8/12 block text-sm md:text-left text-center leading-loose">
              {page.BodyText}
            </p>
            <LongButtons
              to={"/shop"}
              css="hidden md:block text-c-green"
              text={page.ButtonText}
            />
          </div>
          <div className="Header-img  mt-6 md:mt-0 px-2 md:px-4 w-full md:w-96 h-3/5  flex flex-col items-center">
            <div
              className={`rounded-t-full  md:w-80 w-64 py-8 border border-c-gold flex justify-center items-center  ${themeShape} `}
            >
              <img
                src={headerImg}
                alt="Header-img"
                className="rounded-t-full h-2/5 w-4/5 rounded-b-full hover:w-10/12 duration-500 transition-all"
              />
            </div>

            <LongButtons
              to={"/shop"}
              css="bg-c-gold mt-6 hover:bg-white md:hidden text-c-green"
              text="SHOP"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
