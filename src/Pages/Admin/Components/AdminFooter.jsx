import React from "react";
import { useStateContext } from "../../../context/Statecontext";
const AdminFooter = () => {
  const { themeBG, categories } = useStateContext();

  return (
    <footer
      className={`${themeBG}  ${
        themeBG ? `text-c-gold  ` : ""
      }    flex items-center flex-col md:flex-row justify-between w-full p-8`}
    >
      <p className="font-medium text-xl md:text-2xl tracking-widest uppercase">
        MARPLE STORE
      </p>
      <p className="text-center md:text-justify ">
        Copyright © Maple Stores 2022
      </p>
    </footer>
  );
};

export default AdminFooter;
