import React from "react";

const AdminAddProductInput = ({ text, id, type, width, value, change }) => {
  return (
    <div className="relative my-2 flex items-center justify-between  border py-2 px-2 w-full">
      <label htmlFor={id} className=" py-2 text-sm mx-2">
        {text}
      </label>
      <input
        type={type}
        id={id}
        className={` h-8 ${width} border `}
        onChange={change}
        name={id}
        value={value}
      />
    </div>
  );
};

export default AdminAddProductInput;
