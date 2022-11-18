import React from "react";

import "../App.css";
import { useStateContext } from "../context/Statecontext";
const handlePaymentOption = (value, cartDispatch) => {
  localStorage.setItem("PaymentOption", value);
  cartDispatch({ type: "PAYMENT_METHOD", payload: value });
};

function upperCase(text) {
  return text.toString().toUpperCase();
}
export const Stripe = () => {
  const { cart, cartDispatch } = useStateContext();

  return (
    <div className="  text-lg flex justify-start items-center space-x-3 w-full text-gold border border-c-gold font-heading py-4 px-8  hover:bg-c-gold hover:text-c-green font-medium  ">
      <label>
        <input
          type="radio"
          value={upperCase("stripe")}
          checked={upperCase(cart.PaymentMethod) === upperCase("Stripe")}
          id={upperCase("stripe")}
          name="radio"
          onChange={(e) => handlePaymentOption(e.target.value, cartDispatch)}
          className=""
        />
        <span className="mx-4">
          Stripe <span className="text-xs ">(Credit/Debit Card)</span>
        </span>
      </label>
    </div>
  );
  // <p className="text-gold font-body py-4 text-md text-center font-bold">
  //   Please, use
  //   <span className="font-bold hover:text-pry-50 cursor-pointer animate-pulse">
  //     4242 4242 4242 4242
  //   </span>
  //   as your card number with any three digits as CVC and a future date as
  //   expiration date during checkout.
  // </p>;
};

export const PayPal = () => {
  const { cart, cartDispatch } = useStateContext();

  return (
    <div className="  text-lg flex justify-start items-center space-x-3 w-full text-gold border border-c-gold font-heading py-4 px-8  hover:bg-c-gold hover:text-c-green font-medium  ">
      <label>
        <input
          onChange={(e) => handlePaymentOption(e.target.value, cartDispatch)}
          type="radio"
          value={upperCase("paypal")}
          checked={upperCase(cart.PaymentMethod) === upperCase("PayPal")}
          id={upperCase("paypal")}
          name="radio"
        />
        <span className="mx-4">PayPal</span>
      </label>
    </div>
  );
};

export const PayStack = () => {
  const { cart, cartDispatch } = useStateContext();

  return (
    <div className="  text-lg flex justify-start items-center space-x-3 w-full text-gold border border-c-gold font-heading py-4 px-8  hover:bg-c-gold hover:text-c-green font-medium  ">
      <label>
        <input
          onChange={(e) => handlePaymentOption(e.target.value, cartDispatch)}
          type="radio"
          value={upperCase("paystack")}
          checked={upperCase(cart.PaymentMethod) === upperCase("paystack")}
          id={upperCase("paystack")}
          name="radio"
        />
        <span className="mx-4">Paystack</span>
      </label>
    </div>
  );
};
export const Flutterwave = () => {
  const { cart, cartDispatch } = useStateContext();

  return (
    <div className="  text-lg flex justify-start items-center space-x-3 w-full text-gold border border-c-gold font-heading py-4 px-8  hover:bg-c-gold hover:text-c-green font-medium  ">
      <label>
        <input
          onChange={(e) => handlePaymentOption(e.target.value, cartDispatch)}
          type="radio"
          value={upperCase("Flutterwave")}
          checked={upperCase(cart.PaymentMethod) === upperCase("Flutterwave")}
          id={upperCase("Flutterwave")}
          name="radio"
        />
        <span className="mx-4">Flutterwave</span>
      </label>
    </div>
  );
};
