import React from "react";
import { useStateContext } from "../context/Statecontext";
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const TestimonialCard = ({ testimony, ocuppation, name, image }) => {
  const { themeBG, themeShape } = useStateContext();

  return (
    <>
      <Swiper spaceBetween={50} slidesPerView={3}>
        <div className=" flex  justify-between space-x-6 w-full">
          <div
            className={`${themeBG} ${
              themeShape ? "rounded-lg" : ""
            } flex flex-col justify-between w-full  items-center   md:px-12 px-6 pb-16 pt-8 space-y-4 md:space-y-6`}
          >
            <div className="border-b border-c-gold w-full flex justify-center">
              <h3 className="font-fair text-3xl text-gold mb-4">"</h3>
            </div>
            <p className="font-fair  text-center h-24 md:h-auto">{testimony}</p>
            <div
              className={`${themeShape} w-28 h-28 flex flex-col items-center justify-center  pb-2 bg-c-gold`}
            >
              <div className={`${themeBG} ${themeShape} `}>
                <img
                  alt="Reviews-Img"
                  className={`w-20 h-32 py-4  ${themeShape} `}
                  src={image}
                />
              </div>
            </div>
            <p className="tracking-widest font-fairr  text-lg">{name}</p>
            <p className="tracking-widest font-body text-sm text-center">
              {ocuppation}
            </p>
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default TestimonialCard;
