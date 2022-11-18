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
import ProductsPageTopOptions from "./Components/ProductsPageTopBtn";
import AdminPopUp from "./Components/AdminPopUp";

const AdminProducts = () => {
  const { user, themeBG, popup, setPopup } = useStateContext();
  const [products, setProducts] = useState([]);
  const [currentTable, setCurrentTable] = useState(1);
  const [ordersPerTable, setOrdersPerTable] = useState(10);
  const [productToDeleteID, setProductToDeleteID] = useState("");

  const indexOfLastTable = currentTable * ordersPerTable;
  const indexOfFirstTable = indexOfLastTable - ordersPerTable;
  useEffect(() => {
    (async function () {
      let productsItems = await FetchAllProductsAdmin(user);
      if (productsItems) {
      }
      setProducts(productsItems.products);
    })();
  }, []);
  const formatToCurrency = (amount) => {
    return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const getProductToDeleteId = async (productId) => {
    setProductToDeleteID(productId);
    setPopup(!popup);
  };
  const handleProductDelete = async () => {
    try {
      const results = await axios.delete(`/api/products/${productToDeleteID}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      if (results) {
        setProducts(results.data.updatedProductsList);
        setPopup(!popup);
        return toast(results.data.message);
      }
    } catch (e) {
      setPopup(!popup);
      return toast.error(e.response.data.message);
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
        <ProductsPageTopOptions />
        <div
          className={`${themeBG}  relative px-1 md:px-4  ${
            !products.length ? "h-64" : "h-full "
          }     rounded-md shadow-lg  border  p-1  w-full overflow-hidden my-4`}
        >
          {
            <>
              {!products.length ? (
                <LoadinElementAdmin />
              ) : (
                <>
                  <div className="btns w-full absolute overflow-hidden flex justify-between  px-2 mt-4 text-gray-300 hover:text-white font-fair font-bold text-xl">
                    <p>Recent orders</p>
                  </div>
                  <div className={` w-full  mt-20 overflow-hidden md:w-full`}>
                    <table className="w-full flex flex-col flex-1 ">
                      <>
                        <tr className="flex px-1 w-full justify-between  mb-4 text-gray-300 hover:text-white text-sm font-bold">
                          <th className="">ProductId</th>
                          <th>Stock</th>
                          <th>Title</th>
                          <th className="hidden md:inline">Date</th>
                          <th>Price</th>
                        </tr>
                      </>

                      <>
                        {paginatePageToDisplay(
                          products,
                          indexOfFirstTable,
                          indexOfLastTable
                        ).map((item) => {
                          return (
                            <>
                              <tr
                                key={item.orderNo}
                                className="flex relative  w-full border px-2 border-c-gold justify-between z-10 md:w-full items-center   text-c-gold "
                              >
                                <td className="h-8 font-bold w-full transition duration-1000 left-0 absolute bg-c-gold hover:opacity-100 opacity-0 hover:visible z-20 text-c-green px-4 border border-c-green flex justify-between items-center text-xl ">
                                  <button className="underline hover:animate-pulse  ">
                                    <NavLink
                                      to={`/products/${item._id} `}
                                      className="flex flex-row w-full justify-between"
                                    >
                                      <AiFillEye />
                                    </NavLink>
                                  </button>
                                  <NavLink
                                    to={`/admin/products/update/${item._id}`}
                                    className="underline hover:animate-pulse "
                                  >
                                    <FaRegEdit />
                                  </NavLink>
                                  <button
                                    onClick={() =>
                                      getProductToDeleteId(item._id)
                                    }
                                    className="underline hover:animate-pulse hover:text-red-600 transition duration-500 "
                                  >
                                    <RiDeleteBin4Line />
                                  </button>
                                </td>
                                <td className="text-xs md:text-base hover:underline hover:text-gray-400 border-c-gold md:border-none w-24  px-2  md:px-0">
                                  {item._id.substring(0, 10) + "..."}
                                </td>
                                <td className=" border-c-gold md:border-none w-24 flex items-center justify-center py-1 md:py-2 text-xs md:text-base ">
                                  <span className=" px-3  rounded-lg py-1">
                                    <small> {item.countInStock}</small>
                                  </span>
                                </td>
                                <td className=" border-c-gold md:border-none  w-40 flex py-2 justify-start  text-xs md:text-base px-2  md:px-0 ">
                                  <small>{item.name}</small>
                                </td>
                                <td className=" hidden md:inline text-xs md:text-base border-r py-2 border-c-gold md:border-none w-20 flex justify-center px-2  md:px-0">
                                  {formatDate(new Date(item.createdAt))}
                                </td>
                                <td className=" border-c-gold md:border-none w-20 flex justify-center text-xs md:text-base px-2  md:px-0">
                                  {formatToCurrency(item.price)}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    </table>
                    <div className="Paginate  flex flex-row px-4 py-4 bg-c-gold  text-c-green   w-full ">
                      {paginateNumbersLength(products, ordersPerTable).map(
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
        <AdminPopUp click={() => handleProductDelete()} />
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminProducts;
