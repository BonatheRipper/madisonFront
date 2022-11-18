import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Ordershared from "../components/Ordershared";
import { useStateContext } from "../../context/Statecontext";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useState } from "react";
import { toast } from "react-toastify";
const Flutterwave = () => {
  const { user, orderPay, successPay, paymentDispatch } = useStateContext();
  const navigate = useNavigate();
  const [FlutterwaveKey, setFlutterwaveKey] = useState();
  const { orderId } = useParams();
  useEffect(() => {
    const getOrder = async () => {
      try {
        paymentDispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        paymentDispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (e) {
        paymentDispatch({ type: "FETCH_FAIL", payload: e });
      }
    };
    if (!user) {
      navigate("/login");
    }
    if (
      !orderPay._id ||
      successPay ||
      (orderPay._id && orderPay._id) !== orderId
    ) {
      getOrder();
      if (successPay) {
        paymentDispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadGateWayKey = async () => {
        const { data: gatewayKey } = await axios.get(
          `/api/keys/${orderPay.PaymentMethod.toLowerCase()}`,
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setFlutterwaveKey(gatewayKey);
      };
      loadGateWayKey();
    }
  }, [orderPay, user, successPay, orderId, navigate, paymentDispatch]);

  function onFlutterWaveApprove(details) {
    const updateOrder = async () => {
      try {
        paymentDispatch({ type: "PAY_REQUEST" });

        const { data } = await axios.put(
          `/api/orders/${orderId}/pay`,
          {
            email_address: user.email,
            update_time: `${Date.now()}`,
            status: details.status,
            id: orderPay._id,
          },
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        paymentDispatch({ type: "PAY_SUCCESS", payload: data });
        toast("Payment success");
        navigate(`/order/${orderId}`);
      } catch (e) {
        paymentDispatch({ type: "PAY_FAIL", payload: e });
        toast.error("Payment failed");
      }
    };
    updateOrder();
  }
  const config = {
    public_key:
      FlutterwaveKey || "FLWPUBK_TEST-f1354d054c3540ec3063e0a6970babaf-X",
    tx_ref: Date.now(),
    amount: orderPay.totalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      name: orderPay.ShippingDetails ? orderPay.ShippingDetails.Fname : "",
      email: user.email,
    },
    customizations: {
      title: "MarpleStore",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      onFlutterWaveApprove(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  function btn() {
    return (
      <FlutterWaveButton
        className="w-full cursor-pointer hover:bg-c-gold p-4 hover:text-c-green bg-transparent border text-c-gold border-c-gold"
        {...fwConfig}
      />
    );
  }
  return <Ordershared order={orderPay} button={btn()} />;
};

export default Flutterwave;
