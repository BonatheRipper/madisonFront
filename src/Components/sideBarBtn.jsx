import React from "react";
import { NavLink } from "react-router-dom";

const SideBarBtn = ({ to, title, icon, count }) => {
  return (
    <NavLink to={to} className>
      <span>{icon}</span>
      <h3>{title}</h3>
      <span>{count}</span>
    </NavLink>
  );
};

export default SideBarBtn;
