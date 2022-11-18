import React from "react";
import { NormalButton } from "./LongButtons";
import { useStateContext } from "../context/Statecontext";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
const ProductCard = ({
  image,
  css,
  css2,
  pID,
  click,
  catName,
  pName,
  pDesc,
  price,
  stars,
}) => {
  const { themeBG, themeShape } = useStateContext();
  const [desc, setDesc] = useState(false);
  const toCapital = (word) => {
    let firstTest = word[0].toUpperCase();
    let restOfText = word.slice(1);
    return firstTest + restOfText;
  };
  return (
    <div
      className={`${
        themeShape ? "rounded-xl " : ""
      }flex flex-col it justify-between space-y-8  w-full md:w-96  mb-24 border border-c-gold p-4 ${css}`}
    >
      <div className="flex items-center justify-center">
        <div
          className={` h-64 ${
            themeShape ? `${themeShape} w-full` : "w-full"
          } border-8 border-c-gold  p-2  flex justify-center items-center relative ${css2}`}
        >
          <img src={image} alt="Product-Img" className="W-60 h-52 " />
          <div
            className={`absolute ${desc ? "bg-black " : ""}  ${
              themeShape ? themeShape : ""
            } transition duration-1000 opacity-70 w-full  h-full justify-center flex text-c-green `}
          >
            {desc && (
              <div className="  h-full font-sans text-white px-2 py-20 text-ellipsis text-center w-50">
                {pDesc}
              </div>
            )}

            <div
              onClick={() => setDesc(!desc)}
              className={`absolute ${
                desc ? "text-white" : "text-c-gold "
              } bottom-0 text-center hover:rotate-180 transition duration-700 `}
            >
              <IoIosArrowDown className="text-2xl  h-full w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="tracking-widest font-medium hover:cursor-pointer hover:font-extrabold">
          <NavLink to={`/shop/${catName}`}>{toCapital(catName)}</NavLink>
        </p>
        <span className="cursor-pointer transition duration-500">
          <i className="fa fa-heart-o" aria-hidden="true"></i>
        </span>
      </div>
      <div className="flex flex-col justify-between items-start">
        <div className="flex justify-between w-full items-center">
          <p className=" text-lg hover:cursor-pointer  transition duration-5000">
            <NavLink to={`/products/${pID}`}>{toCapital(pName)}</NavLink>
          </p>
          <p className="tracking-widest font-bold">${price}</p>
        </div>
        {stars}
      </div>
      <div className="flex items-center justify-center">
        <NormalButton
          text="Add to Cart"
          click={click}
          css={`border border-c-gold ${themeBG} hover:text-c-green hover:bg-c-gold`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
