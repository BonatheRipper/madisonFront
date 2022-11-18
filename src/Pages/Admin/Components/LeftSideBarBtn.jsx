import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const LeftSideBarBtn = ({ text, icon, link, lock }) => {
  const [active, setActive] = useState(false);
  // function handleSideBarClick(e, lock) {
  //   console.log(e.target, lock);
  //   if (e.target.id === lock) {
  //     setActive(true);
  //   } else {
  //     setActive(false);
  //   }
  // }
  return (
    <li
      id={text}
      // onClick={(e) => handleSideBarClick(e, lock)}
      // onMouseLeave={() => setActive(false)}
      className={`${
        active ? "border-b" : ""
      }  border-c-gold hover:animate-pulse mb-4 w-full p-2 text-base md:text-lg flex justify-start items-center`}
    >
      <span className="mr-3">{icon}</span>
      <span>
        <NavLink to={link}>{text} </NavLink>
      </span>
    </li>
  );
};
