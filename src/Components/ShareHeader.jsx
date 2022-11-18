import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ThemeSettings from "./ThemeSettings";

const ShareHeader = () => {
  return (
    <>
      <ThemeSettings />
      <Navbar />
      <Sidebar />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ShareHeader;
