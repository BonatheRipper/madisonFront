import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NormalButton } from "../Components/LongButtons";
import { useStateContext } from "../context/Statecontext";
import { useEffect } from "react";
import ShareHeader from "../Components/ShareHeader";
import Footer from "../Components/Footer";
const ShippingAddress = () => {
  const { themeBG, user, cartDispatch, cart, scrollToTop } = useStateContext();
  const [Fname, setFname] = useState(cart.ShippingDetails.Fname);
  const [address, setAddress] = useState(cart.ShippingDetails.address);
  const [city, setCity] = useState(cart.ShippingDetails.city);
  const [Pcode, setPcode] = useState(cart.ShippingDetails.Pcode);
  const [country, setCountry] = useState(cart.ShippingDetails.country);
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const handleShippingFormSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ Fname, address, city, Pcode, country })
    );
    cartDispatch({
      type: "SHIPPING_ADDRESS",
      payload: { Fname, address, city, Pcode, country },
    });
    navigate("/placeOrder");
  };
  return (
    <>
      <ShareHeader />
      <div className="py-20 flex flex-col px-12">
        <p className="py-6 text-c-green font-bold">Shipping Address</p>
        <div className="flex justify-between items-center h-full w-full border bg-c-gold ">
          <div className="md:flex-1 px-4 py-12 md:p-12 space-y-6 w-full ">
            <h2 className="font-sans text-c-green text-2xl text-center border-b border-c-green">
              Shipping information
            </h2>
            <form
              onSubmit={handleShippingFormSubmit}
              className="flex w-full flex-col items-center justify-between space-y-4"
            >
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="text-md text-c-green">
                  Full Name
                </label>
                <input
                  placeholder="Enter Full Name"
                  name="Fname"
                  id="Fname"
                  value={Fname}
                  onChange={(e) => setFname(e.target.value)}
                  type="text"
                  className="px-4 border-c-green py-2  placeholder: text-c-green  border focus:outline-none focus:border-pry-100 focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-c-green font-normal text-sm font-body"></p>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-md text-c-green">
                  Address
                </label>
                <input
                  placeholder="Enter your address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  type="text"
                  className="px-4 border-c-green py-2  text-c-green bg-gold border focus:outline-none focus:border-bg-c-green focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-c-green font-normal text-sm font-body"></p>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-md text-c-green">
                  City
                </label>
                <input
                  placeholder="Enter your city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  id="city"
                  type="text"
                  className="px-4 border-c-green py-2  text-c-green bg-gold border focus:outline-none focus:border-bg-c-green focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-c-green font-normal text-sm font-body"></p>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-md text-c-green">
                  Postal Code
                </label>
                <input
                  placeholder="Enter your postal code"
                  name="Pcode"
                  onChange={(e) => setPcode(e.target.value)}
                  id="Pcode"
                  value={Pcode}
                  type="text"
                  className="px-4 border-c-green py-2  text-c-green bg-gold border focus:outline-none focus:border-bg-c-green focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-c-green font-normal text-sm font-body"></p>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-md text-c-green">
                  Country
                </label>
                <input
                  placeholder="Enter your Country"
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                  id="country"
                  value={country}
                  type="text"
                  className="px-4 border-c-green py-2  text-c-green bg-gold border focus:outline-none focus:border-bg-c-green focus:ring-pry-100 focus:ring-1 transition duration-300 w-full"
                />
                <p className="text-c-green font-normal text-sm font-body"></p>
              </div>
              <div className="w-full flex items-center justify-center">
                <NormalButton
                  to="/placeOrder"
                  text="Continue"
                  css={`
                    ${themeBG}w-full hover:text-c-green
                  `}
                />
              </div>
            </form>
          </div>

          <div
            className={`${themeBG} flex-1 p-12 hidden  md:flex flex-col h-full`}
          >
            <p className="text-c-gold font-sans text-md text-center font-bold">
              At maple store, we are commited to ensure you have a blissful
              shopping experience.
            </p>
            <img
              src="https://img.freepik.com/free-vector/delivery-service-with-masks-concept_23-2148535315.jpg?w=2000"
              alt="register"
              className="h-96"
            />
            <p className="text-gold font-body text-md text-center font-bold">
              We look forward to providing you a great &amp; funfilled shopping.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingAddress;
