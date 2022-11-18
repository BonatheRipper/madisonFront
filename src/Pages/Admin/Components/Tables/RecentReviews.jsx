import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../../../../context/Statecontext";
import LoadinElementAdmin from "../LoadinElementAdmin";
import {
  paginateNumbersLength,
  PaginateOrder,
  paginatePager,
  paginatePageToDisplay,
} from "../../../../Utils/Paginate";

const RecentReviews = ({ recentReviews }) => {
  const [currentTable, setCurrentTable] = useState(1);
  const [ordersPerTable, setOrdersPerTable] = useState(10);
  const indexOfLastTable = currentTable * ordersPerTable;
  const indexOfFirstTable = indexOfLastTable - ordersPerTable;
  const { themeBG } = useStateContext();
  const [toggleTopProduct, SettoggleTopProduct] = useState(false);

  return (
    <div
      className={`${themeBG} ${
        !recentReviews.length ? "h-64 " : "h-full "
      } my-2  relative w-full md:w-7/12 md:ml-2 rounded-md shadow-lg border-c-gold border orders  p-1 text-c-gold `}
    >
      {
        <>
          {!recentReviews.length ? (
            <LoadinElementAdmin />
          ) : (
            <>
              <div className="btns flex justify-between p-1 my-4 text-wite">
                <p>Recent Reviews</p>

                <PaginateOrder
                  SetToggleSort={SettoggleTopProduct}
                  toggleSort={toggleTopProduct}
                  setItemsPerPage={setOrdersPerTable}
                />
              </div>
              <div className="BestProducts -mt-28 mb-8">
                {paginatePageToDisplay(
                  recentReviews,
                  indexOfFirstTable,
                  indexOfLastTable
                ).map((item) => {
                  return (
                    <div
                      key={item._id}
                      className={`flex flex-row px-4 items-center border-c-gold border orders justify-between `}
                    >
                      <div className="product flex items-center flex-row p-4 py-2">
                        <span className="rounded-md ">
                          <img
                            className="px-0 rounded-md w-12 h-12 mr-2 "
                            src={item.product.image.url}
                            alt={item.product.name}
                          />
                        </span>
                        <div className="flex flex-col p-2">
                          <small>
                            <NavLink to={`/products/${item.product._id}`}>
                              {item.product.name}
                            </NavLink>{" "}
                          </small>
                          <small className="text-gray-400">
                            Reviewed by: {item.author.username}
                          </small>
                        </div>
                      </div>
                      <div className="product flex items-center flex-row px-4">
                        <div className="flex flex-row items-end p-2">
                          {Array.from(Array(item.rating).keys()).map(
                            (item, i) => {
                              return (
                                <small key={i}>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  ></i>
                                </small>
                              );
                            }
                          )}
                          {Array.from(Array(5 - item.rating).keys()).map(
                            (item, i) => {
                              return (
                                <small key={i}>
                                  <i
                                    className="fa fa-star-o"
                                    aria-hidden="true"
                                  ></i>
                                </small>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-14 relative">
                <div className="Paginate  flex flex-row px-4 py-4 bg-c-gold mt-10 md:mt-0 text-c-green absolute bottom-0  w-full left-0">
                  {paginateNumbersLength(recentReviews, ordersPerTable).map(
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

export default RecentReviews;
