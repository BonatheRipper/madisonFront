import React from "react";
import { ToastContainer } from "react-toastify";
import { useStateContext } from "../../../context/Statecontext";
import AdminNavBar from "./AdminNavBar";
import AdminSidebarLeft from "./AdminSidebarLeft";

const AdminSharedHeader = () => {
  const { Adminsidebar, setAdminSidebar } = useStateContext();

  return (
    <>
      <AdminNavBar sidebar={Adminsidebar} setSidebar={setAdminSidebar} />
      <AdminSidebarLeft />
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
      />{" "}
    </>
  );
};

export default AdminSharedHeader;
