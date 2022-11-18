import React from "react";

const AdminsettingsInput = ({ text, inputChange, value, css }) => {
  return (
    <div className="relative my-2 flex flex-col border py-2 px-2 ">
      <label htmlFor="description" className=" py-2 text-sm">
        {text}
      </label>
      <input
        onChange={inputChange}
        value={value}
        type="text"
        id={value}
        className={css}
      />
    </div>
  );
};

export default AdminsettingsInput;
