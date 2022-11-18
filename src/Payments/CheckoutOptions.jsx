import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../context/Statecontext";
import { PayPal, PayStack, Flutterwave } from "../Payments/PaymentOptions";
const CheckoutOptions = () => {
  const { cart } = useStateContext();
  const [Payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    if (!cart.PaymentMethod) {
      return toast.error("failed choose a payment method");
    } else {
      navigate("/shipping");
    }
  };
  function displayGateway(name) {
    if (name.toLowerCase() === "paypal") {
      return <PayPal />;
    }
    if (name.toLowerCase() === "paystack") {
      return <PayStack />;
    }
    if (name.toLowerCase() === "flutterwave") {
      return <Flutterwave />;
    }
  }
  useEffect(() => {
    const fetchGatwayItems = async () => {
      try {
        const { data } = await axios.get("/api/gateway");
        if (data) {
          setPayments(data);
        }
      } catch (e) {
        toast.error(e.response.data);
      }
    };
    fetchGatwayItems();
  }, []);
  return (
    <div>
      <p className="text-sm p-2">Payment method</p>
      {Payments.map((gateway, i) => {
        if (gateway.isActive) {
          return (
            <div key={gateway.name + i}>{displayGateway(gateway.name)}</div>
          );
        }
      })}
      <span>
        <button
          onClick={() => handleCheckoutClick()}
          className="  text-lg flex my-4 justify-center items-center space-x-3 w-full text-gold border border-c-gold font-heading py-4 px-8  hover:bg-c-gold hover:text-c-green font-medium transition duration-300"
        >
          Continue
        </button>
      </span>
    </div>
  );
};

export default CheckoutOptions;
