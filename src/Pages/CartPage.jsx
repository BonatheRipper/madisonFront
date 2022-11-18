import React from "react";
import { ImBin } from "react-icons/im";
import { AiFillInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context/Statecontext";
import LongButtons from "../Components/LongButtons";
import CheckoutOptions from "../Payments/CheckoutOptions";
import { useEffect } from "react";
import Footer from "../Components/Footer";
import ShareHeader from "../Components/ShareHeader";
const CartPage = () => {
  const { themeBG, cart, scrollToTop, updateCartHandler, themeShape } =
    useStateContext();
  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);
  return (
    <>
      <ShareHeader />
      <div className="bg-[#F1FFFD] px-8 md:px-24 py-24 flex flex-col justify-between items-center  w-full space-y-4">
        <div className="flex flex-col justify-start w-full py-4">
          <p className="text-c-green  py-4 font-medium ">
            <NavLink to="/">Home</NavLink> {`> Cart`}
          </p>
          <h2 className="font-fair  text-c-green text-3xl tracking-loose">
            Cart
          </h2>
        </div>
        {cart.cart.cartItems.length ? (
          <div className=" w-full  flex flex-col space-y-8">
            <p className="text-c-green   text-xl font-medium ">
              Items in cart (
              {cart.cart.cartItems.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.quantity;
              }, 0)}
              )
            </p>
            <div className="flex flex-col md:flex-row justify-between w-full space-y-6 md:space-x-24">
              <div className="flex flex-col w-full md:w-3/5 space-y-6">
                {" "}
                {cart.cart.cartItems.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 py-4 border-b border-b-c-green"
                    >
                      <div className="md:w-80 w-80 h-80">
                        <img
                          src={item.image.url}
                          alt="Product"
                          className="w-6/12 "
                        />
                      </div>
                      <div className="flex flex-col w-full space-y-4 md:space-y-6">
                        <div className="flex flex-row justify-between">
                          <p className="text-c-green  font-fair text-xl font-medium ">
                            {item.name}
                          </p>
                          <button
                            onClick={() => updateCartHandler(item, "DELETE")}
                            className="text-c-green font-body text-base hover:text-red-500"
                          >
                            <ImBin />
                          </button>
                        </div>
                        <p className="text-c-green  font-body text-base font-normal ">
                          Material: {item.material}
                        </p>
                        <p className="text-c-green   font-body text-base font-normal ">
                          Category: {item.category}
                        </p>
                        <p className="text-c-green   font-body text-base font-normal ">
                          Price: ${item.price}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateCartHandler(item, "MINUS")}
                            className={`${themeShape} border  hover:${themeBG}  text-3xl  border-c-green w-8 h-8 py-2 px-4 flex justify-center items-center hover:bg-pry-100  text-c-green transition duration-900 hover:text-c-gold`}
                          >
                            -
                          </button>
                          <span
                            className={` ${themeShape} border  border-c-green w-12 flex justify-center transition duration-900 items-center  text-c-green`}
                          >
                            {item.quantity > 0 ? item.quantity : 0}
                          </span>
                          <button
                            onClick={() => updateCartHandler(item, "ADD")}
                            className={`${themeShape} border  text-3xl  border-c-green w-8 h-8  p-2 flex justify-center items-center hover:${themeBG}  text-c-green transition duration-900 hover:text-c-gold`}
                          >
                            +
                          </button>
                        </div>
                        <NavLink
                          to={`/products/${item._id}`}
                          className="text-c-green flex space-x-2 text-base p-2  items-center"
                        >
                          <AiFillInfoCircle />
                          <span> Product information</span>
                        </NavLink>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className={`${themeBG} ${
                  themeShape ? "rounded-xl " : ""
                } border border-gold w-full md:w-2/5 py-12 px-6 md:px-12 space-y-12 flex flex-col h-4/5 justify-start `}
              >
                <div className="border-b border-b-c-gold w-full flex justify-center">
                  <h3 className="font-heading text-3xl text-gold mb-4">
                    Cart Summary
                  </h3>
                </div>
                <div className="flex justify-between">
                  <p className="text-gold font-body text-md text-center font-bold">
                    Subtotal
                  </p>
                  <p className="text-gold font-body text-md text-center font-bold">
                    $
                    {cart.cart.cartItems.reduce(
                      (previousValue, currentValue) => {
                        return (
                          previousValue +
                          currentValue.price * currentValue.quantity
                        );
                      },
                      0
                    )}
                    .00
                  </p>
                </div>

                {<CheckoutOptions />}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${themeBG} flex flex-col justify-between items-center space-y-4 py-12  w-full mb-24 bg-pry-100 p-4 text-gold `}
          >
            <p className="text-center text-c-gold text-sm md:text-lg">
              You currently do not have any item in your cart yet
            </p>
            <LongButtons
              to="/shop"
              text="Explore"
              css={`
                ${themeBG} px-4 border border-c-gold hover:text-c-green
              `}
            />
          </div>
        )}
        <LongButtons
          to="/shop"
          text="Back to products"
          css={`
        bg-[#F1FFFD] border w-full hover:text-black hover:border border-c-gold py-6
        `}
        />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
