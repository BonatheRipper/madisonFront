import React, { useEffect } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { useStateContext } from "../../../../context/Statecontext";
import LoadinElementAdmin from "../LoadinElementAdmin";
const formatToCurrency = (amount) => {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
const AverageOrder = ({ chart, Orders }) => {
  const { themeBG } = useStateContext();
  useEffect(() => {}, [Orders]);

  function AverageOrder() {
    const price = Orders.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.totalPrice;
    }, 0);
    return formatToCurrency(price / Orders.length);
  }
  return (
    <div
      className={`${themeBG} text-c-gold ${
        !Orders.length ? "h-64 " : "h-full "
      } relative  rounded mb-4 flex flex-col justify-betwee border-2 border-c-gold shadow-xl w-full `}
    >
      {
        <>
          {!Orders.length ? (
            <LoadinElementAdmin />
          ) : (
            <>
              <div className=" p-2  w-full h-10">
                <div className="topTitle flex  flex-row justify-between items-center p-4">
                  <h4 className="text-sm font-bold">Average Order</h4>
                  <h6 className="text-xl font-bold hover:text-white hover:bg-black p-2">
                    <TbGridDots />
                  </h6>
                </div>
              </div>

              <div className="mt-2 w-full h-20">
                <div className="totalSalesWeek flex  flex-row justify-between items-center p-4 ">
                  <div className="flex flex-col">
                    <h6 className="py-1 text-2xl font-bold">
                      {AverageOrder()}
                    </h6>
                  </div>

                  <div className="flex flex-col p-2">
                    <div className="flex  flex-row items-center">
                      <span>
                        <small>
                          <IoIosArrowRoundUp />
                        </small>
                      </span>
                      <small className="py-0 ">4.85%</small>
                    </div>
                    <h6 className="py-0 text-sm font-bold">vs. last week</h6>
                  </div>
                </div>
              </div>

              <div className="mt-2  w-full h-60">
                <div className="totalSalesMonth flex h-full  flex-col justify-between   px-2 ">
                  <small className="py-3 font-bold pb-0">
                    Orders over time
                  </small>
                  {chart}
                </div>
              </div>
            </>
          )}
        </>
      }
    </div>
  );
};

export default AverageOrder;
