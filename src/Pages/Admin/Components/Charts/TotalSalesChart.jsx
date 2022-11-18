import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";

import { useStateContext } from "../../../../context/Statecontext";
import {
  BarChart,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import LoadinElementAdmin from "../LoadinElementAdmin";
const formatToCurrency = (amount) => {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
function getAmount(Array) {
  var price = 0;
  for (let item of Array) {
    if (item.isPaid) {
      price = price + item.totalPrice;
    }
  }
  return formatToCurrency(price);
}

const TotalSalesChart = ({ chart, Orders }) => {
  const { themeBG } = useStateContext();

  useEffect(() => {}, [Orders]);

  function getDaysAgoData(data, time) {
    return data.filter(function (a) {
      var then = new Date(a.createdAt);
      var now = new Date();
      var msBetweenDates = Math.abs(then.getTime() - now.getTime());
      var daysBetweenDates = Math.floor(msBetweenDates / (24 * 60 * 60 * 1000));
      return daysBetweenDates <= time;
    });
  }

  return (
    <div
      className={`${themeBG} relative shadow-lg ${
        !Orders.length ? "h-64 " : "h-full "
      } w-full mb-3  text-c-gold rounded p-0 py-4 border border-c-gold`}
    >
      {
        <>
          {!Orders.length ? (
            <LoadinElementAdmin />
          ) : (
            <>
              <div className="topTitle flex  flex-row justify-between items-center p-4">
                <h4 className="text-xl font-bold">Total Sales</h4>
                <h6 className="text-sm text-c-gold hover:text-slate-300 font-bold">
                  View Report
                </h6>
              </div>
              <div className="totalSalesMonth flex  flex-col justify-start p-4">
                <h1 className="text-2xl py-3 font-bold">{getAmount(Orders)}</h1>
                <h6 className="text-sm py-3 font-bold text-c-gold ">
                  {getAmount(getDaysAgoData(Orders, 30))}
                  <span> in last month</span>
                </h6>
              </div>
              <div className="totalSalesWeek flex  flex-row justify-between items-center p-4 ">
                <div className="flex flex-col">
                  <small className="py-2">This week so far</small>
                  <h6 className="py-1 text-2xl font-bold">
                    {getAmount(getDaysAgoData(Orders, 7))}
                  </h6>
                </div>

                <div className="flex flex-col">
                  <div className="flex text-gray-400 flex-row items-center">
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
              {chart}
            </>
          )}
        </>
      }
    </div>
  );
};

export default TotalSalesChart;
