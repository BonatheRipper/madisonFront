import React from "react";
import { useStateContext } from "../../context/Statecontext";
import { AiFillEye } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import LoadinElementAdmin from "./Components/LoadinElementAdmin";
import { useEffect } from "react";
import { FetchAllProductsAdmin } from "./Services/FetchAllProducts";
import AdminFooter from "./Components/AdminFooter";
import {
  paginateNumbersLength,
  paginatePager,
  paginatePageToDisplay,
} from "../../Utils/Paginate";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSharedHeader from "./Components/AdminSharedHeader";
import AdminPopUp from "./Components/AdminPopUp";
import ProductsPageBtn from "./Components/ProductsPageBtn";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import RadionInputAdmin from "./Components/RadionInputAdmin";

const AdminUsers = () => {
  const { user, themeBG, popup, setPopup } = useStateContext();
  const [Users, setUsers] = useState([]);
  const [currentTable, setCurrentTable] = useState(1);
  const [ordersPerTable, setOrdersPerTable] = useState(10);
  const [UserToDeleteID, setUserToDeleteID] = useState("");
  const [userToEdit, setUserToEdit] = useState(false);
  const [userToAdd, setuserToAdd] = useState(false);
  const indexOfLastTable = currentTable * ordersPerTable;
  const indexOfFirstTable = indexOfLastTable - ordersPerTable;
  useEffect(() => {
    (async function () {
      let usersFromServer = await axios.get("/api/users/admin/users");
      setUsers(usersFromServer.data);
    })();
  }, []);

  const getUserToDeleteId = (subId) => {
    console.log(subId);
    setUserToDeleteID(subId);
    setPopup(!popup);
  };
  const handleUserDelete = async () => {
    console.log(UserToDeleteID);
    try {
      const results = await axios.delete(
        `/api/users/admin/users/${UserToDeleteID}`,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      if (results) {
        setUsers(results.data);
        setPopup(!popup);
        toast("User removed successfully");
      }
    } catch (e) {
      console.log(e);
      return toast.error(e.response.data.message);
    }
  };
  const handleUserUpdate = async () => {
    if (userToEdit.username && userToEdit.email) {
      try {
        let UsersFromServer = await axios.put(`/api/users/admin/users`, {
          userToEdit,
          headers: { authorization: `Bearer ${user.token}` },
        });
        setUsers(UsersFromServer.data);
        toast("User Updated successfully");
        setUserToEdit(false);
      } catch (e) {
        toast.error(e.response.data.message);
      }
    } else {
      return toast.error("Field cannot be empty");
    }
  };
  const handleUserAdd = async () => {
    if (userToAdd.username && userToAdd.email && userToAdd.password) {
      try {
        let UsersFromServer = await axios.post(`/api/users/admin/users`, {
          userToAdd,
          headers: { authorization: `Bearer ${user.token}` },
        });
        setUsers(UsersFromServer.data);
        toast("User added successfully");
        setuserToAdd(false);
      } catch (e) {
        toast.error(e.response.data.message);
      }
    } else {
      return toast.error("Field cannot be empty");
    }
  };
  function handleEditUser(user) {
    setUserToEdit(user);
  }
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  return (
    <>
      <div className="relative bg-[#F1FFFD] m-0 h-full flex flex-col px-2">
        <AdminSharedHeader />
        <p className="pt-24 px-8 text-2xl text-gray-800">Shop Users</p>

        <div className="flex  text-c-green  justify-between items-center p-4 mt-16 flex-col md:flex-row">
          <div
            onClick={() => setuserToAdd(userToAdd ? false : true)}
            className={`w-full shadow-sm hover:animate-pulse mb-2  rounded-lg border h-auto  font-bold text-xl p-2 md:mx-1 flex flex-col justify-center items-center`}
          >
            <span className="my-1 py-2 ">
              <BsFillPeopleFill />
            </span>
            <button>Add Users</button>
          </div>
        </div>
        {
          <div
            className={`w-full flex justify-center ${
              userToEdit !== false ? "scale-x-100" : "scale-x-0 h-0"
            }`}
          >
            <div className="w-11/12 flex border my-4 flex-col justify-between items-center px-8 py-2 shadow">
              <div
                onClick={() => setUserToEdit(false)}
                className="w-full  hover:text-red-500 flex justify-end text-2xl text-gray-800  font-bold"
              >
                <MdCancel />
              </div>
              <p className="w-full text-left text-gray-800 py-2 font-bold">
                Edit User
              </p>
              <div className="flex flex-col my-2 w-full md:w-6/12">
                <p>Username</p>
                <input
                  type="text"
                  value={userToEdit.username || ""}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, username: e.target.value })
                  }
                  className="w-full shadow border border-gray-300 rounded-md py-1"
                />
              </div>
              <div className="flex flex-col my-2 w-full md:w-6/12">
                <p>Email</p>
                <input
                  type="text"
                  value={userToEdit.email || ""}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, email: e.target.value })
                  }
                  className="w-full shadow border border-gray-300 rounded-md py-1"
                />
              </div>
              <div className="flex flex-col my-2 w-full md:w-6/12">
                <p>Password</p>
                <input
                  type="text"
                  value={userToEdit.password || ""}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, password: e.target.value })
                  }
                  className="w-full shadow border border-gray-300 rounded-md py-1"
                />
              </div>
              <div className="relative my-2 flex flex-col border py-2 px-2 justify-center items-center ">
                <p className="text-black text-xs font-bold mt-2">Make Admin</p>
                <div className="flex flex-row ">
                  <div className="mx-6">
                    <RadionInputAdmin
                      header="True"
                      value={""}
                      checked={userToEdit.isAdmin}
                      click={(e) =>
                        setUserToEdit({
                          ...userToEdit,
                          isAdmin: !userToEdit.isAdmin,
                        })
                      }
                    />
                  </div>{" "}
                  <div className="mx-6">
                    <RadionInputAdmin
                      header="False"
                      value={""}
                      checked={!userToEdit.isAdmin}
                      click={(e) =>
                        setUserToEdit({
                          ...userToEdit,
                          isAdmin: !userToEdit.isAdmin,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleUserUpdate()}
                className={`py-1 rounded-lg my-4 px-4 hover:text-white hover:cursor-pointer ${themeBG}`}
              >
                Update User
              </button>
            </div>
          </div>
        }
        {
          <div
            className={`w-full flex justify-center transform ${
              userToAdd !== false ? "scale-x-100" : "scale-x-0 h-0"
            }`}
          >
            <div className="w-11/12 flex border my-4 flex-col justify-between items-center px-8 py-2 shadow">
              <div
                onClick={() => setuserToAdd(false)}
                className="w-full  hover:text-red-500 flex justify-end text-2xl text-gray-800  font-bold"
              >
                <MdCancel />
              </div>
              <p className="w-full text-left text-gray-800 py-2 font-bold md:w-6/12">
                Add User
              </p>
              <div className="flex flex-col my-2 w-full md:w-6/12">
                <p>Username</p>
                <input
                  type="text"
                  value={userToAdd.username || ""}
                  onChange={(e) =>
                    setuserToAdd({ ...userToAdd, username: e.target.value })
                  }
                  className="w-full shadow border border-gray-300 rounded-md py-1"
                />
              </div>
              <div className="flex flex-col my-2 w-full md:w-6/12">
                <p>Email</p>
                <input
                  type="text"
                  value={userToAdd.email}
                  onChange={(e) =>
                    setuserToAdd({ ...userToAdd, email: e.target.value })
                  }
                  className="w-full shadow border border-gray-300 rounded-md py-1"
                />
              </div>
              <div className="flex flex-col my-2 w-full md:w-6/12">
                <p>Password</p>
                <input
                  type="text"
                  value={userToAdd.password}
                  onChange={(e) =>
                    setuserToAdd({ ...userToAdd, password: e.target.value })
                  }
                  className="w-full shadow border border-gray-300 rounded-md py-1"
                />
              </div>
              <div className="relative my-2 flex flex-col border py-2 px-2 justify-center items-center ">
                <p className="text-black text-xs font-bold mt-2">Make Admin</p>
                <div className="flex w-full flex-row">
                  {" "}
                  <div className="mx-6">
                    <RadionInputAdmin
                      header="True"
                      value={""}
                      checked={userToAdd.isAdmin}
                      click={(e) =>
                        setuserToAdd({
                          ...userToAdd,
                          isAdmin: !userToAdd.isAdmin,
                        })
                      }
                    />
                  </div>
                  <div className="mx-6">
                    <RadionInputAdmin
                      header="False"
                      value={"liveKey"}
                      checked={!userToAdd.isAdmin}
                      click={(e) =>
                        setuserToAdd({
                          ...userToAdd,
                          isAdmin: !userToAdd.isAdmin,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleUserAdd()}
                className={`py-1 rounded-lg my-4 px-4 hover:text-white hover:cursor-pointer ${themeBG}`}
              >
                Add User
              </button>
            </div>
          </div>
        }
        <div
          className={`${themeBG}  relative px-1 md:px-4  ${
            !Users.length ? "h-64" : "h-full "
          }     rounded-md shadow-lg  border  p-1  w-full overflow-hidden my-4`}
        >
          {
            <>
              {!Users.length ? (
                <LoadinElementAdmin />
              ) : (
                <>
                  <div className="btns w-full absolute overflow-hidden flex justify-between  px-2 mt-4 text-gray-300 hover:text-white font-fair font-bold text-xl"></div>
                  <div className={` w-full  mt-20 overflow-hidden md:w-full`}>
                    <table className="w-full flex flex-col flex-1 ">
                      <>
                        <tr className="flex px-1 w-full justify-between  mb-4 text-gray-300 hover:text-white text-sm font-bold">
                          <th className="">Email</th>

                          <th className=" md:inline px-4">Date</th>
                        </tr>
                      </>

                      <>
                        {paginatePageToDisplay(
                          Users,
                          indexOfFirstTable,
                          indexOfLastTable
                        ).map((item, i) => {
                          return (
                            <>
                              <tr
                                key={i}
                                className="flex relative  w-full border px-2 border-c-gold justify-between z-10 md:w-full items-center   text-c-gold "
                              >
                                <td className="h-8 font-bold w-full transition duration-1000 left-0 absolute bg-c-gold hover:opacity-100 opacity-0 hover:visible z-20 text-c-green px-4 border border-c-green flex justify-between items-center text-xl ">
                                  <button
                                    onClick={() => handleEditUser(item)}
                                    className="underline hover:animate-pulse "
                                  >
                                    <FaRegEdit />
                                  </button>
                                  <button
                                    onClick={() => getUserToDeleteId(item._id)}
                                    className="underline hover:animate-pulse hover:text-red-600 transition duration-500 "
                                  >
                                    <RiDeleteBin4Line />
                                  </button>
                                </td>
                                <td className="text-xs md:text-base hover:underline hover:text-gray-400 border-c-gold md:border-none w-24  px-2  md:px-0">
                                  {item.email}
                                </td>

                                <td className="  md:inline text-xs md:text-base border-r py-2 border-c-gold md:border-none w-20 flex justify-center px-2  md:px-0">
                                  {formatDate(new Date(item.createdAt))}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    </table>
                    <div className="Paginate  flex flex-row px-4 py-4 bg-c-gold  text-c-green   w-full ">
                      {paginateNumbersLength(Users, ordersPerTable).map(
                        (number, i) => {
                          return (
                            <span
                              onClick={() =>
                                paginatePager(setCurrentTable, number)
                              }
                              key={i}
                              className={` flex mx-2 items-center justify-center ${
                                number === currentTable
                                  ? `${themeBG} bg-c-gold  text-c-gold`
                                  : " border border-c-green "
                              } rounded-full w-6 h-6`}
                            >
                              <span>{number}</span>
                            </span>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          }
        </div>

        <AdminPopUp
          text="Are you sure you want to delete this User?"
          click={() => handleUserDelete()}
        />
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminUsers;
