import React, { useState, useEffect } from "react";

import { FetchOrdersAdmin } from "./Services/FetchOrdersAdmin";
// import { useStateContext } from "../context/contextProvider";
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
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TotalSalesChart from "./Components/Charts/TotalSalesChart";
import OrdersChart from "./Components/Charts/OrdersChart";
import AverageOrder from "./Components/Charts/AverageOrder";
import SalesChart from "./Components/Charts/SalesChart";
import RecentOrdersCharts from "./Components/Tables/RecentOrdersCharts";
import TrafficSources from "./Components/Tables/TrafficSources";
import TopProducts from "./Components/Tables/TopProducts";
import RecentReviews from "./Components/Tables/RecentReviews";
import AdminFooter from "./Components/AdminFooter";
import { useStateContext } from "../../context/Statecontext";
import { FetchAllProductsAdmin } from "./Services/FetchAllProducts";
import { FetchReviewsAdmin } from "./Services/FetchReviews";
import AdminSharedHeader from "./Components/AdminSharedHeader";
import AdminPopUp from "./Components/AdminPopUp";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const data = [
  {
    Date: 1,
    Sales: 426,
  },
  {
    Date: 2,
    Sales: 950,
  },
  {
    Date: 3,
    Sales: 532,
  },
  {
    Date: 4,
    Sales: 658,
  },
  {
    Date: 5,
    Sales: 14,
  },
  {
    Date: 6,
    Sales: 747,
  },
  {
    Date: 7,
    Sales: 771,
  },
  {
    Date: 8,
    Sales: 461,
  },
  {
    Date: 9,
    Sales: 926,
  },
  {
    Date: 10,
    Sales: 990,
  },
  {
    Date: 11,
    Sales: 896,
  },
  {
    Date: 12,
    Sales: 873,
  },
  {
    Date: 13,
    Sales: 864,
  },
  {
    Date: 14,
    Sales: 346,
  },
  {
    Date: 15,
    Sales: 747,
  },
  {
    Date: 16,
    Sales: 299,
  },
  {
    Date: 17,
    Sales: 353,
  },
  {
    Date: 18,
    Sales: 949,
  },
  {
    Date: 19,
    Sales: 769,
  },
  {
    Date: 20,
    Sales: 744,
  },
  {
    Date: 21,
    Sales: 210,
  },
  {
    Date: 22,
    Sales: 848,
  },
  {
    Date: 23,
    Sales: 266,
  },
  {
    Date: 24,
    Sales: 97,
  },
  {
    Date: 25,
    Sales: 806,
  },
  {
    Date: 26,
    Sales: 691,
  },
  {
    Date: 27,
    Sales: 313,
  },
  {
    Date: 28,
    Sales: 156,
  },
  {
    Date: 29,
    Sales: 144,
  },
  {
    Date: 30,
    Sales: 973,
  },
  {
    Date: 31,
    Sales: 464,
  },
  {
    Date: 32,
    Sales: 873,
  },
];

export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];
const TrafficSourceData = [
  { name: "Google", value: 4000, color: "#0088FE" },
  { name: "Facebook", value: 3000, color: "#00C49F" },
  { name: "Yandex", value: 12000, color: "#ff63a5" },
  { name: "Instagram", value: 2000, color: "#FFBB28" },
  { name: "YouTue", value: 3900, color: "#816bff" },
  { name: "Others", value: 1000, color: "#6f9a37" },
];
function TooltipStyle(h) {
  return {
    color: "black",
    display: "flex",
    flexDirection: "row",
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    height: h,
    borderRadius: "13px 6px 6px 13px",
    border: "1px solid #D2B6A2",
    marginRight: "5px",
    backgroundColor: "#D2B6A2",
  };
}
const MonthlyChart = () => {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="Date"
          style={{ fontSize: "8px", padding: "3px" }}
          stroke="white"
        />
        {/* <YAxis /> */}
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          contentStyle={TooltipStyle("15px")}
        />
        <Area type="monotone" dataKey="Sales" stroke="black" fill="#D2B6A2" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const OrdersNow = () => {
  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart width={300} height={100} data={data}>
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          contentStyle={TooltipStyle("15px")}
        />
        <Legend />

        <Line
          type="monotone"
          dataKey="Sales"
          stroke="#D2B6A2"
          strokeWidth={1}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const OrdersOverTime = () => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          contentStyle={TooltipStyle("50px")}
        />
        <Bar dataKey="Date" fill="black" stroke="black" />
        <Bar dataKey="Sales" fill="#D2B6A2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const TrafficSource = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart width={800} height={200}>
        <Pie
          data={TrafficSourceData}
          // cx={120}
          // cy={200}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {TrafficSourceData.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={TrafficSourceData[index].color}
              />
            );
          })}
        </Pie>

        <Tooltip
          wrapperStyle={{ outline: "none" }}
          width={20}
          contentStyle={TooltipStyle()}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

const AdminHome = () => {
  const { user, popup, setPopup, orderToDeleteID } = useStateContext();
  const [OrdersAdmin, setOrdersAdmin] = useState([]);
  const [ProductsAdmin, setProductsAdmin] = useState([]);
  const [ReviewsAdmin, setReviewsAdmin] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getaServices = async () => {
      const Orders = await FetchOrdersAdmin(user);
      const Products = await FetchAllProductsAdmin(user);
      const Reviews = await FetchReviewsAdmin(user);

      if (Products) {
        setProductsAdmin(Products.products);
      }
      if (Orders) {
        setOrdersAdmin(Orders.items);
      }
      if (Reviews) {
        setReviewsAdmin(Reviews);
      }
    };
    getaServices();
  }, [setOrdersAdmin, user]);
  const handleOrderDelete = async () => {
    try {
      const results = await axios.delete(`/api/orders/${orderToDeleteID}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setPopup(!popup);
      setOrdersAdmin(results.data.updatedOrders);
      return toast(results.data.message);
    } catch (e) {
      setPopup(!popup);

      return toast.error(e.response.data.message);
    }
  };
  return (
    <div className="relative px-1">
      <AdminPopUp click={() => handleOrderDelete()} />

      <AdminSharedHeader />
      <div className=" mt-14 bg-[#F1FFFD] text-c-green">
        <h1 className="text-3xl p-4">Dashboard</h1>
        <div
          id="OrdersStatistics"
          className="p-2 text-white px-0 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3"
        >
          <TotalSalesChart chart={<MonthlyChart />} Orders={OrdersAdmin} />
          <AverageOrder chart={<OrdersOverTime />} Orders={OrdersAdmin} />

          <div className="h-full rounded mb-4 flex flex-col justify-between text-slate-900 border shadow-xl w-full bg-white  ">
            <OrdersChart chart={<OrdersNow />} Orders={OrdersAdmin} />
            <SalesChart chart={<OrdersNow />} Orders={OrdersAdmin} />
          </div>
        </div>

        <div
          id="RecentOrdersAndTraffic "
          className={`flex flex-1 self-stretch	 items-center my-10 justify-between flex-col md:flex-row`}
        >
          <RecentOrdersCharts Orders={OrdersAdmin} />
          <TrafficSources TrafficSource={<TrafficSource />} />
        </div>

        <div
          id="BestPerformingProducts "
          className={` relative flex flex-col md:flex-row items-center justify-between"
         `}
        >
          <TopProducts
            TopProducts={ProductsAdmin.sort((a, b) => b.sold - a.sold)}
          />

          <RecentReviews recentReviews={ReviewsAdmin} />
          <div className="my-2"></div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminHome;
