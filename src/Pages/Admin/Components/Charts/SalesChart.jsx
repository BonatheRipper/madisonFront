import React from "react";
import { useEffect } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useStateContext } from "../../../../context/Statecontext";
import LoadinElementAdmin from "../LoadinElementAdmin";
const formatToCurrency = (amount) => {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
const SalesChart = ({ chart, Orders }) => {
  const { themeBG } = useStateContext();
  useEffect(() => {}, [Orders]);

  function getAmount(Array) {
    var price = 0;
    for (let item of Array) {
      if (item.isPaid) {
        price = price + item.totalPrice;
      }
    }
    return formatToCurrency(price);
  }
  return (
    <div
      className={`${themeBG} relative h-48 w-full  p-2 mt-1 text-c-gold border border-c-gold`}
    >
      {
        <>
          {!Orders.length ? (
            <LoadinElementAdmin />
          ) : (
            <>
              <p className="p-2 text-xl bold">Sales</p>
              <div className="flex flex-row justify-between items-end">
                <div className="p-2">
                  <p className="text-lg">{getAmount(Orders)}</p>
                </div>
                <div className="p-2">
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
              {chart}
            </>
          )}
        </>
      }
    </div>
  );
};

export default SalesChart;
