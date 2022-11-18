import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useStateContext } from "../../context/Statecontext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ShareHeader from "../../Components/ShareHeader";
import Footer from "../../Components/Footer";

const SingleOrderHistory = () => {
  const { user, themeBG, scrollToTop } = useStateContext();
  const navigate = useNavigate();
  const [order, setOrder] = useState(false);
  const { orderId } = useParams();
  useEffect(() => {
    scrollToTop();
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`/api/orders/history/${orderId}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setOrder(data);
      } catch (e) {
        alert(e);
      }
    };

    fetchOrders();
    if (!user) {
      navigate("/");
    }
  }, [user, navigate, setOrder, orderId]);
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
      <ShareHeader />
      <div className="my-10 p-4  bg-[#F1FFFD]  px-8 md:px-24 py-24 flex flex-col justify-between  w-full space-y-4">
        <span className="flex items-center">
          <span className="text-c-green mx-1">
            {" "}
            <FaLongArrowAltLeft />
          </span>
          <NavLink
            className="text-c-green flex items-center text-lg  hover:text-grey transition duration-300"
            to="/order/orderhistory"
          >
            Back
          </NavLink>{" "}
        </span>
        <p className="text-c-green  font-body text-xl font-bold f">
          {order.orderNo}
        </p>
        {order && (
          <div className=" w-full  flex flex-col space-y-8">
            <p className="text-c-green  font-body text-lg font-medium ">
              Order Item
            </p>
            <div className="flex flex-col md:flex-row justify-between w-full space-y-6 md:space-x-24">
              <div className="flex flex-col w-full md:w-3/5 space-y-6">
                {order.orderItems.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 py-2 border-b border-b-pry-100"
                    >
                      <div className="md:w-80 ">
                        <img src={item.image} alt="cart item" />
                      </div>
                      <div className="flex flex-col w-full space-y-4 md:space-y-6">
                        <div className="flex flex-row justify-between">
                          <p className="text-c-green uppercase font-fair font-bold text-xl font-medium ">
                            {item.name}
                          </p>
                        </div>

                        <p className="text-c-green  font-body text-base font-normal ">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-c-green  font-body text-base font-normal ">
                          Price: ${item.price}
                        </p>
                        <p className="text-c-green  font-body text-base font-normal ">
                          Status:{" "}
                          {order.isPaid ? (
                            <span className="font-bold">Paid</span>
                          ) : (
                            <>
                              <span>Unpaid</span>{" "}
                              <NavLink
                                to={`/order/${order._id}`}
                                className="hover:text-blue-300 underline font-bold"
                              >
                                Pay now
                              </NavLink>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className={` ${themeBG} border border-c-gold  w-full md:w-2/5 py-12 px-4 md:px-12 space-y-4 flex flex-col h-4/5 justify-start `}
              >
                <div className="border-b border-b-gold w-full flex justify-center">
                  <h3 className="font-heading text-3xl text-gold mb-4">
                    Billing summary
                  </h3>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    {" "}
                    Billing Name
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    {order.ShippingDetails.Fname}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    Date
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    {formatDate(new Date(order.createdAt))}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    Zip
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    {order.ShippingDetails.Pcode}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    Address
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    {order.ShippingDetails.address}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    {" "}
                    Country
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    {order.ShippingDetails.country}
                  </p>
                </div>
                <div className="border-b border-b-gold w-full flex justify-center">
                  <h3 className="font-heading text-3xl text-gold mb-4">
                    Order summary
                  </h3>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    Sub Total
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    ${order.itemsTotal}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    Shipping
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    ${order.shippingFee}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    Tax
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    ${order.taxFee}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    Total Amount
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    ${order.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleOrderHistory;
