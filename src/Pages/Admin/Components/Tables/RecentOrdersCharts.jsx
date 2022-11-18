import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../../../context/Statecontext";
import LoadinElementAdmin from "../LoadinElementAdmin";
import AdminPopUp from "../AdminPopUp";
import {
  paginateNumbersLength,
  PaginateOrder,
  paginatePager,
  paginatePageToDisplay,
} from "../../../../Utils/Paginate";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin4Line } from "react-icons/ri";
const RecentOrdersCharts = ({ Orders }) => {
  const {
    themeBG,
    popup,
    setPopup,

    setOrderToDeleteID,
  } = useStateContext();
  const [currentTable, setCurrentTable] = useState(1);
  const [ordersPerTable, setOrdersPerTable] = useState(8);
  const indexOfLastTable = currentTable * ordersPerTable;
  const [adminOrders, setAdminOrders] = useState(Orders);
  const indexOfFirstTable = indexOfLastTable - ordersPerTable;
  useEffect(() => {
    setAdminOrders(Orders);
  }, [Orders]);
  const [toggleTopProduct, SettoggleTopProduct] = useState(false);

  const formatToCurrency = (amount) => {
    return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
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

  const getOrderToDeleteId = async (orderId) => {
    setOrderToDeleteID(orderId);
    setPopup(!popup);
  };
  return (
    <div
      className={`${themeBG}  relative self-stretch w-full   ${
        !adminOrders.length ? "h-64 " : "h-auto "
      }  md:w-9/12 md:mr-4  rounded-md shadow-lg  border  overflow overflow-hidden my-4 md:my-0`}
    >
      {
        <>
          {!adminOrders.length ? (
            <LoadinElementAdmin />
          ) : (
            <>
              <div className="btns w-screen  overflow-auto absolute md:w-full  flex justify-between p-1 mt-4 text-gray-300 hover:text-white font-fair font-bold text-xl  px-4">
                <p>Recent orders</p>

                <PaginateOrder
                  SetToggleSort={SettoggleTopProduct}
                  toggleSort={toggleTopProduct}
                  setItemsPerPage={setOrdersPerTable}
                />
              </div>
              <div className={`  mt-20 w-screen overflow-auto md:w-full`}>
                <table className="w-full flex flex-col flex-1 ">
                  <>
                    <tr className="flex w-stretch overflow-clip md:w-full px-2 justify-evenly md:justify-between mb-4   text-gray-300 hover:text-white md:text-sm text-xs font-bold ">
                      <th className="">OrderId</th>
                      <th>Status</th>
                      <th>Customer</th>
                      <th className="hidden md:inline">Date</th>
                      <th>Total</th>
                    </tr>
                  </>
                  <>
                    {paginatePageToDisplay(
                      adminOrders,
                      indexOfFirstTable,
                      indexOfLastTable
                    ).map((item) => {
                      return (
                        <>
                          {" "}
                          <tr
                            key={item._id}
                            className="flex  relative w-full overflow-auto overflow-x-auto border px-2 border-c-gold justify-between   md:w-full items-center self-center   text-c-gold "
                          >
                            <td className="h-8 font-bold w-full transition duration-1000 left-0 absolute bg-c-gold hover:opacity-100 opacity-0 hover:visible z-40 text-c-green px-4 border border-c-green flex justify-between items-center text-xl ">
                              <button className="underline hover:animate-pulse  ">
                                <NavLink
                                  to={`/order/orderhistory/${item._id}`}
                                  className="flex flex-row w-full justify-between"
                                >
                                  <AiFillEye />
                                </NavLink>
                              </button>

                              <button
                                onClick={() => getOrderToDeleteId(item._id)}
                                className="underline hover:animate-pulse hover:text-red-600 transition duration-500 "
                              >
                                <RiDeleteBin4Line />
                              </button>
                            </td>
                            <td className="w-3/12 md:w-24 flex justify-center items-center text-xs md:text-base hover:underline hover:text-gray-400 border-c-gold md:border-none  px-2  md:px-0">
                              {item.orderNo}
                            </td>
                            <td className=" border-c-gold md:border-none w-3/12 md:w-24  flex items-center justify-center  md:py-2 text-c-green text-xs md:text-base md:px-0 ">
                              {!item.isPaid ? (
                                <span className="bg-[#716761]  px-3  rounded-lg py-1">
                                  {/* <small className=""> Unpaid</small> */}
                                  <span className="mx-1 ">
                                    <i
                                      className="fa fa-times"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </span>
                              ) : (
                                <span className="bg-c-gold  px-3  rounded-lg py-1">
                                  {/* <small> paid</small> */}
                                  <span className="mx-1 ">
                                    <i
                                      className="fa fa-check"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </span>
                              )}
                            </td>
                            <td className=" border-c-gold md:border-none w-4/12 md:w-40  flex py-2 justify-start items-center  text-xs md:text-base  md:px-0 ">
                              <small className="w-full ">
                                <span className="p-1 mx-1 border border-c-gold rounded-full ">
                                  {item.ShippingDetails.Fname.substring(0, 2)}
                                </span>
                                {item.ShippingDetails.Fname.substring(0, 15)}
                              </small>
                            </td>
                            <td className="hidden w-3/12 md:w-24  text-xs md:text-base  py-2 border-c-gold md:border-none md:flex justify-center px-2  md:px-0">
                              {formatDate(new Date(item.createdAt))}
                            </td>
                            <td className="w-3/12 md:w-24  border-c-gold md:border-none  flex justify-center text-xs md:text-base px-2  md:px-0">
                              {formatToCurrency(item.totalPrice)}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                </table>
                <div className="Paginate  flex flex-row px-4 py-4 bg-c-gold mt-10 md:mt-0 text-c-green md:absolute bottom-0  w-full ">
                  {paginateNumbersLength(adminOrders, ordersPerTable).map(
                    (number, i) => {
                      return (
                        <span
                          onClick={() => paginatePager(setCurrentTable, number)}
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
      <AdminPopUp />
    </div>
  );
};

export default RecentOrdersCharts;
