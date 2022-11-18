import React from "react";
import { useStateContext } from "../../../context/Statecontext";
const AdminPagesCmsSaveBtn = ({ text }) => {
  const { themeBG } = useStateContext();

  return (
    <button className={`px-4 mt-4 py-2 border w-full ${themeBG} text-c-gold`}>
      {text}
    </button>
  );
};

export default AdminPagesCmsSaveBtn;
