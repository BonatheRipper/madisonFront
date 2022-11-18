import React from "react";

const InputCms = ({ header, value, click }) => {
  return (
    <div className="relative my-2 flex flex-col border py-2 px-2 ">
      <label htmlFor="header" className=" py-2 text-sm">
        {header}
      </label>
      <input
        value={value}
        onChange={click}
        type="text"
        id={value}
        className=" h-8 border"
      />
    </div>
  );
};

export default InputCms;
