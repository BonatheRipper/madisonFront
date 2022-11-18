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

const AdminSubscribers = () => {
  const { user, themeBG, popup, setPopup } = useStateContext();
  const [subscribers, setSubscribers] = useState([]);
  const [editSub, setEditSub] = useState(false);
  const [currentTable, setCurrentTable] = useState(1);
  const [ordersPerTable, setOrdersPerTable] = useState(10);
  const [subscriberToDeleteID, setSubscriberToDeleteID] = useState("");
  const [subscriberToEdit, setSubscriberToEdit] = useState(false);
  const [subscriberToAdd, setSubscriberToAdd] = useState(false);

  const indexOfLastTable = currentTable * ordersPerTable;
  const indexOfFirstTable = indexOfLastTable - ordersPerTable;
  useEffect(() => {
    (async function () {
      let subscribersFromServer = await axios.get("/api/subscription", {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setSubscribers(subscribersFromServer.data);
    })();
  }, []);

  const getSubscriberToDeleteId = async (subId) => {
    setSubscriberToDeleteID(subId);
    setPopup(!popup);
  };
  const handleSubscriberDelete = async () => {
    try {
      const results = await axios.delete(
        `/api/subscription/${subscriberToDeleteID}`,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      if (results) {
        setSubscribers(results.data);
        setPopup(!popup);
        toast("Subscriber removed successfully");
      }
    } catch (e) {
      console.log(e);
      return toast.error(e.response.data.error);
    }
  };
  const handleSubscriberUpdate = async () => {
    if (subscriberToEdit.email) {
      let subscribersFromServer = await axios.patch(
        `/api/subscription/${subscriberToEdit._id}`,
        { subscriberToEdit }
      );
      setSubscribers(subscribersFromServer.data);
      toast("Subscriber updated successfully");
      setSubscriberToEdit(false);
    } else {
      return toast.error("Field cannot be empty");
    }
  };
  const handleSubscriberAdd = async () => {
    if (subscriberToAdd) {
      let subscribersFromServer = await axios.post(`/api/subscription/`, {
        emailPseudo: subscriberToAdd,
        fromAdmin: true,
        headers: { authorization: `Bearer ${user.token}` },
      });
      setSubscribers(subscribersFromServer.data);
      toast("Subscriber added successfully");
      setSubscriberToEdit(false);
      setSubscriberToAdd(false);
    } else {
      return toast.error("Field cannot be empty");
    }
  };
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
      <div className="relative bg-[#F1FFFD] m-0 h-full flex flex-col ">
        <AdminSharedHeader />
        <p className="pt-24 px-8 text-2xl text-gray-800">
          Shop Email Subscribers
        </p>

        <div className="flex  text-c-green  justify-between items-center p-4 mt-16 flex-col md:flex-row">
          <div
            onClick={() => setSubscriberToAdd("")}
            className={`w-full shadow-sm hover:animate-pulse mb-2  rounded-lg border h-auto  font-bold text-xl p-2 md:mx-1 flex flex-col justify-center items-center`}
          >
            <span className="my-1 py-2 ">
              <BsFillPeopleFill />
            </span>
            <button>Add Subscribers</button>
          </div>
        </div>
        {subscriberToEdit !== false && (
          <div className="w-full flex justify-center">
            <div className="w-11/12 flex border my-4 flex-col justify-between items-center px-8 py-2 shadow">
              <div
                onClick={() => setSubscriberToEdit(false)}
                className="w-full  hover:text-red-500 flex justify-end text-2xl text-gray-800  font-bold"
              >
                <MdCancel />
              </div>
              <p className="w-full text-left text-gray-800 py-2 font-bold">
                Edit Subscriber
              </p>
              <input
                type="text"
                value={subscriberToEdit.email || ""}
                onChange={(e) =>
                  setSubscriberToEdit({
                    ...subscriberToEdit,
                    email: e.target.value,
                  })
                }
                className="w-full shadow border border-gray-300 rounded-md py-1"
              />
              <button
                onClick={() => handleSubscriberUpdate()}
                className={`py-1 rounded-lg my-4 px-4 hover:text-white hover:cursor-pointer ${themeBG}`}
              >
                Update Subscriber
              </button>
            </div>
          </div>
        )}
        {subscriberToAdd !== false && (
          <div className="w-full flex justify-center">
            <div className="w-11/12 flex border my-4 flex-col justify-between items-center px-8 py-2 shadow">
              <div
                onClick={() => setSubscriberToAdd(false)}
                className="w-full  hover:text-red-500 flex justify-end text-2xl text-gray-800  font-bold"
              >
                <MdCancel />
              </div>
              <p className="w-full text-left text-gray-800 py-2 font-bold">
                Add Subscriber
              </p>
              <input
                type="text"
                value={subscriberToAdd || ""}
                onChange={(e) => setSubscriberToAdd(e.target.value)}
                className="w-full shadow border border-gray-300 rounded-md py-1"
              />
              <button
                onClick={() => handleSubscriberAdd()}
                className={`py-1 rounded-lg my-4 px-4 hover:text-white hover:cursor-pointer ${themeBG}`}
              >
                Add Subscriber
              </button>
            </div>
          </div>
        )}
        <div
          className={`${themeBG}  relative px-1 md:px-4  ${
            !subscribers.length ? "h-64" : "h-full "
          }     rounded-md shadow-lg  border  p-1  w-full overflow-hidden my-4`}
        >
          {
            <>
              {!subscribers.length ? (
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
                          subscribers,
                          indexOfFirstTable,
                          indexOfLastTable
                        )
                          .reverse()
                          .map((item, i) => {
                            return (
                              <tr
                                key={i}
                                className="flex relative  w-full border px-2 border-c-gold justify-between z-10 md:w-full items-center   text-c-gold "
                              >
                                <td className="h-8 font-bold w-full transition duration-1000 left-0 absolute bg-c-gold hover:opacity-100 opacity-0 hover:visible z-20 text-c-green px-4 border border-c-green flex justify-between items-center text-xl ">
                                  <button
                                    onClick={() => setSubscriberToEdit(item)}
                                    className="underline hover:animate-pulse "
                                  >
                                    <FaRegEdit />
                                  </button>
                                  <button
                                    onClick={() =>
                                      getSubscriberToDeleteId(item._id)
                                    }
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
                            );
                          })}
                      </>
                    </table>
                    <div className="Paginate  flex flex-row px-4 py-4 bg-c-gold  text-c-green   w-full ">
                      {paginateNumbersLength(subscribers, ordersPerTable).map(
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
          text="Are you sure you want to delete this subscriber?"
          click={() => handleSubscriberDelete()}
        />
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminSubscribers;
