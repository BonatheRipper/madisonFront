import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../../../context/Statecontext";
import LoadinElementAdmin from "../LoadinElementAdmin";
import {
  paginateNumbersLength,
  PaginateOrder,
  paginatePager,
  paginatePageToDisplay,
} from "../../../../Utils/Paginate";

const TopProducts = ({ TopProducts }) => {
  const { themeBG } = useStateContext();
  useEffect(() => {}, [TopProducts]);
  const [toggleTopProduct, SettoggleTopProduct] = useState(false);
  const [currentTable, setCurrentTable] = useState(1);
  const [ordersPerTable, setOrdersPerTable] = useState(10);
  const indexOfLastTable = currentTable * ordersPerTable;
  const indexOfFirstTable = indexOfLastTable - ordersPerTable;
  return (
    <div
      className={`${themeBG}  my-2 self-stretch relative text-c-gold py-16 w-full md:w-5/12 ${
        !TopProducts.length ? "h-64 " : "h-full "
      } rounded-md shadow-lg border-c-gold border orders  p-1 `}
    >
      {
        <>
          {!TopProducts.length ? (
            <LoadinElementAdmin />
          ) : (
            <>
              <div className="btns flex justify-between p-1 my-4 text-wite">
                <p>Top Products</p>

                <PaginateOrder
                  SetToggleSort={SettoggleTopProduct}
                  toggleSort={toggleTopProduct}
                  setItemsPerPage={setOrdersPerTable}
                />
              </div>
              <div className="BestProducts -mt-28">
                <div className="flex flex-row justify-between items-center px-4">
                  <p className="px-4">Product</p>
                  <p className="px-4">Total</p>
                </div>
                {paginatePageToDisplay(
                  TopProducts,
                  indexOfFirstTable,
                  indexOfLastTable
                ).map((item) => {
                  return (
                    <div
                      key={item._id}
                      className={`flex flex-row px-4 items-center justify-between text-[${"#8094ae"}]`}
                    >
                      <div className="product flex items-center flex-row p-4 py-2">
                        <span className="rounded-md ">
                          <img
                            className="px-2 py-1 w-12  h-12  rounded-md border border-c-gold mr-3 "
                            src={item.image.url}
                            alt={item.name}
                          />
                        </span>
                        <div className="flex flex-col">
                          <small> {item.name}</small>
                          <small> ${item.price} </small>
                        </div>
                      </div>
                      <div className="product flex items-center flex-row px-2">
                        <div className="flex flex-col items-end ">
                          <small>${item.price * item.sold}</small>
                          <small> {item.sold} sold </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-14 absolute w-full bottom-1 left-0">
                <div className="Paginate  flex flex-row px-4 py-4 bg-c-gold mt-10 md:mt-0 text-c-green absolute bottom-0  w-full left-0">
                  {paginateNumbersLength(TopProducts, ordersPerTable).map(
                    (number, i) => {
                      return (
                        <span
                          key={i}
                          onClick={() => paginatePager(setCurrentTable, number)}
                          className={` ${
                            number === currentTable
                              ? `${themeBG}`
                              : " border border-c-green text-c-green"
                          } flex mx-2 items-center justify-center   text-c-gold  rounded-full w-6 h-6`}
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
  );
};

export default TopProducts;
