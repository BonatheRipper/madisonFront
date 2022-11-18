import Aos from "aos";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "../context/Statecontext";
import LoadingElementUser from "./LoadingElementUser";
import LongButtons from "./LongButtons";
import AboutImg from "../images/AboutImg.jpeg";

const About = () => {
  const { themeBG, themeShape } = useStateContext();
  const [page, setPage] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Aos.init({ duration: 500 });
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/pages/about");
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
    <div
      className={`bg-c-gold flex flex-col md:flex-row justify-between items-center w-full `}
    >
      {loading ? (
        <div className={`${themeBG} relative w-full py-20 `}>
          <LoadingElementUser />
        </div>
      ) : (
        <>
          <div
            className={`flex flex-col ${themeBG} py-32 px-8 md:px-24 space-y-8 w-full items-center md:w-3/5`}
          >
            <div className="flex justify-between items-center space-x-2">
              <div className="w-40 border border-c-gold bg-c-gold"></div>
              <h4 className="text-c-gold font-fair text-base font-medium">
                {page.title}
              </h4>
              <div className="w-40 border border-c-gold bg-c-gold"></div>
            </div>
            <h2 className="font-fair  text-c-gold md:text-5xl text-3xl text-center">
              {page.headerText}
            </h2>
            <p className="font-fair text-c-gold text-base text-justify leading-loose  md:block">
              {page.BodyText}
            </p>
            <LongButtons
              to="collections"
              text={page.ButtonText}
              css={`text-c-gold  ${themeBG} hover:text-black border border-[#D2B6A2]  border-r-0  border-l-0  border-t-0 `}
            />
          </div>
          <div
            className={` ${themeBG}  ${themeShape} md:rounded-none px-6  py-6 border-2 border-[#D2B6A2] md:border-0 md:py-24 md:px-12 w-4/5 -mt-24 md:mt-0 md:w-2/5 md:-ml-72 z-10`}
          >
            <img
              src={AboutImg}
              alt="About-pic"
              className={`${themeShape} md:border border-[#D2B6A2]`}
            />
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default About;
