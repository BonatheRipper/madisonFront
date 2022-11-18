import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Ordershared from "../components/Ordershared";
import { useStateContext } from "../../context/Statecontext";
import { toast } from "react-toastify";

const Paypal = () => {
  const { user, orderPay, successPay, paymentDispatch } = useStateContext();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
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
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": gatewayKey, currency: "USD" },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      loadGateWayKey();
    }
  }, [orderPay, user, successPay, orderId, navigate, paymentDispatch]);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: orderPay.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        paymentDispatch({ type: "PAY_REQUEST" });

        const { data } = await axios.put(
          `/api/orders/${orderId}/pay`,
          details,
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
    });
  }
  function onError(err) {
    alert(err);
  }
  function btn() {
    return (
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      ></PayPalButtons>
    );
  }
  return <Ordershared order={orderPay} button={btn()} />;
};

export default Paypal;
