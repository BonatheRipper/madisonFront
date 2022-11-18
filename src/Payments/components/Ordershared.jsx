import React from "react";
import LoadingScreen from "../../Screens/LoadingScreen";
import { useStateContext } from "../../context/Statecontext";
import { NavLink } from "react-router-dom";
import { BsPatchCheckFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";

const Ordershared = ({ order, button }) => {
  const { themeBG, ThemeShapes, themeShape } = useStateContext();

  return (
    <>
      {Object.keys(order).length === 0 ? (
        <LoadingScreen />
      ) : (
        <div className="p-10  my-10 bg-[#F1FFFD] w-full relative">
          <h1 className="font-fair my-4 font-bold text-c-green text-xl">
            Order: {order.orderNo}
          </h1>
          <div className="flex md:flex-row flex-col justify-between ">
            <div
              className={` ${themeBG} md:mx-6 my-4 flex flex-col w-full rounded-md justify-start md:w-6/12 p-6`}
            >
              <div className="flex my-4 flex-col ">
                <h4
                  className={`${
                    themeShape === ThemeShapes.Rounded
                      ? "rounded-l-lg"
                      : "rounded-l-sm"
                  } font-bold py-1  px-2  border-l-4 border-c-gold`}
                >
                  Shipping
                </h4>
                <div className=" border border-c-gold ">
                  <div className="flex py-1 px-4">
                    <p className="font-bold mr-2">Name: </p>
                    <span>{order.ShippingDetails.Fname}</span>
                  </div>
                  <div className="flex py-1 px-4">
                    <p className="font-bold mr-2">Address: </p>
                    <span>{order.ShippingDetails.address}</span>
                  </div>
                  <div className="flex py-1 px-4">
                    <p className="font-bold mr-2">Delivered: </p>
                    <span>{order.isDelivered ? "Yes" : "Not delivered"}</span>
                  </div>
                </div>
              </div>
              <div className="flex my-4 flex-col ">
                <h4
                  className={`${
                    themeShape === ThemeShapes.Rounded
                      ? "rounded-l-lg"
                      : "rounded-l-sm"
                  } font-bold py-1  px-2  border-l-4 border-c-gold`}
                >
                  Payment Method
                </h4>
                <div className=" border border-c-gold ">
                  <div className="flex py-1 px-4 items-center">
                    <span>{order.PaymentMethod}</span>
                    <p className="font-bold mr-2 text-c-gold px-2 w-2">
                      <BsPatchCheckFill />
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex my-4 flex-col ">
                <h4
                  className={`${
                    themeShape === ThemeShapes.Rounded
                      ? "rounded-l-lg"
                      : "rounded-l-sm"
                  } font-bold py-1  px-2  border-l-4 border-c-gold`}
                >
                  {order.isPaid ? "Paid Items" : "Items To Pay"}
                </h4>
                <div className=" border border-c-gold flex  flex-col  w-full ">
                  {order.orderItems.map((item, i) => {
                    return (
                      <div
                        className="flex py-2 px-4 justify-between space-x-6 items-center"
                        key={i}
                      >
                        <p className="font-bold ">
                          <img
                            className={`${themeShape} w-12 h-12 border  border-c-gold `}
                            src={item.image}
                            alt="Item"
                          />
                        </p>
                        <NavLink
                          to={`/products/${item._id}`}
                          className="text-xs hover:text-white "
                        >
                          {item.name}
                        </NavLink>
                        <span className="text-xs">{item.quantity}</span>
                        <span className="text-xs ">${item.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className={` ${themeBG}  md:mx-6 h-full  my-4 flex flex-col w-full rounded-md justify-start md:w-6/12 p-6`}
            >
              <div className="flex my-4 flex-col ">
                <h4
                  className={`${
                    themeShape === ThemeShapes.Rounded
                      ? "rounded-l-lg"
                      : "rounded-l-sm"
                  } font-bold py-1  px-2  border-l-4 border-c-gold`}
                >
                  Order Summary
                </h4>
                <div className=" border border-c-gold ">
                  <div className="flex py-1 px-4 justify-between">
                    <p className="font-bold mr-2">Items Total: </p>
                    <span>${order.itemsTotal}</span>
                  </div>

                  <div className="flex py-1 px-4 justify-between">
                    <p className="font-bold mr-2">Shipping: </p>
                    <span>${order.shippingFee}</span>
                  </div>
                  <div className="flex py-1 px-4 justify-between">
                    <p className="font-bold mr-2">Tax: </p>
                    <span>${order.taxFee}</span>
                  </div>
                  <div className="flex py-1 px-4 justify-between">
                    <p className="font-bold mr-2">Order Total: </p>
                    <span>${order.totalPrice}</span>
                  </div>
                  <div className="flex py-1 px-4 justify-between">
                    <p className="font-bold mr-2">Status: </p>
                    <span>{order.isPaid ? "Paid" : "Not Paid"}</span>
                  </div>
                </div>
                <div className="w-full z-10">
                  {!order.isPaid && (
                    <div className="relative flex items-center flex-col ">
                      {button === undefined && (
                        <div className=" text-c-gold py-6 fixed">
                          <ClipLoader />
                        </div>
                      )}
                      <div className="w-full">{button}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ordershared;
