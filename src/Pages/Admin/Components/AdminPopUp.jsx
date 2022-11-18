import React from "react";
import { useStateContext } from "../../../context/Statecontext";
const AdminPopUp = ({ click, text }) => {
  const { popup, setPopup } = useStateContext();
  return (
    <div
      className={`fixed left-0 transform bg-black ${
        !popup ? "-left-full" : "left-0"
      } opacity-90 text-c-green h-screen w-full z-50   flex justify-center items-center`}
    >
      <div
        className={`bg-white p-4 justify-center items-center opacity-100 rounded-lg flex flex-col w-10/12  `}
      >
        <p>{text || "Are you sure you want to delete this product?"}</p>
        <div className="flex justify-between items-center my-6">
          <button
            onClick={() => setPopup(!popup)}
            className="px-6 mx-2 py-2 border-2 border-c-green hover:bg-c-green hover:text-c-gold rounded-lg"
          >
            NO
          </button>
          <button
            onClick={click}
            className="px-6 mx-2 py-2 border-2 border-red-500 hover:bg-red-400 hover:text-white text-red-500 rounded-lg"
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPopUp;
