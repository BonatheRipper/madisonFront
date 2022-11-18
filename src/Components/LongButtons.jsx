import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context/Statecontext";

const LongButtons = ({ to, css, text }) => {
  const { themeShape } = useStateContext();

  return (
    <NavLink
      to={to}
      className={`${themeShape} w-full bg-c-gold px-3 py-3 text-center hover:bg-white  transition duration-1000 ${css}`}
    >
      {text}
    </NavLink>
  );
};

export const NormalButton = ({ to, css, text, click, change, val, type }) => {
  const { themeShape } = useStateContext();

  return (
    <button
      onClick={click}
      value={val}
      type={type || "submit"}
      onChange={change}
      className={`${themeShape}  bg-c-gold w-full   px-3 py-3 text-center hover:bg-white  transition duration-1000 ${css} `}
    >
      {text}
    </button>
  );
};
export default LongButtons;
