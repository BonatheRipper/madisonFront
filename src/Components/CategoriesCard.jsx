import React from "react";
import { useStateContext } from "../context/Statecontext";
import LongButtons from "./LongButtons";
import "aos/dist/aos.css";
const CategoriesCard = ({ catName, catDesc, to, image }) => {
  const { themeBG, themeShape } = useStateContext();
  const CardClass = () => {
    return `${
      themeShape !== "rounded-full"
        ? `${themeBG}    px-4  md:px-4 py-4`
        : `${themeShape}`
    } flex flex-col items-center justify-center md:w-2/5 w-full space-y-2 mb-6`;
  };
  return (
    <div className={CardClass()}>
      <div className="flex flex-col items-center w-full space-y-2 mb-6">
        <img
          src={image}
          alt="Categories"
          className={`h-64 ${
            themeShape === "rounded-full"
              ? `${themeShape} border-8 border-c-gold rounded-full w-64`
              : "w-full "
          }`}
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <div
          className={`${themeShape === "rounded-full" ? "text-c-green" : ""}`}
        >
          <p
            className={`${
              themeShape === "rounded-full" ? "text-c-green" : ""
            }font-heading uppercase my-1 font-bold  text-xl text-center tracking-widest`}
          >
            {catName}
          </p>
          <p className="font-heading  text-base text-center">{catDesc}</p>
        </div>
        <LongButtons
          to={to}
          text="BROWSE COLLECTIONS"
          css={`
            ${themeBG}
            ${themeShape ? `${themeShape} w-8/12` : ""}
            text-c-gold
            hover:text-black
            border
            border-[#D2B6A2]
            text-sm
          `}
        />
      </div>
    </div>
  );
};

export default CategoriesCard;
