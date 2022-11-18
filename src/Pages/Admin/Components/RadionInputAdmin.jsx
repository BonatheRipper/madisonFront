import React from "react";

const RadionInputAdmin = ({ header, value, click, checked }) => {
  return (
    <div className="relative my-2 flex flex-col justify-start items-start  py-2 px-2 ">
      <label htmlFor="header" className=" py-2 text-sm">
        {header}
      </label>
      <input
        value={value}
        onChange={click}
        type="radio"
        id={value}
        checked={checked}
        className="border"
      />
    </div>
  );
};

export default RadionInputAdmin;
