import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/Statecontext";
import axios from "axios";
import { useParams } from "react-router-dom";
import PaymentToDisplay from "./services/PaymentToDisplay";
import ShareHeader from "../Components/ShareHeader";
import Footer from "../Components/Footer";
const PayForOrder = () => {
  const { user, scrollToTop } = useStateContext();
  const [paymentType, setPaymentType] = useState(false);
  const { orderId } = useParams();
  useEffect(() => {
    scrollToTop();
    const GetpaymentType = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setPaymentType(data.PaymentMethod);
      } catch (e) {
        alert(e);
      }
    };
    GetpaymentType();
  }, [setPaymentType, orderId, user]);

  return (
    <>
      <ShareHeader />
      {paymentType && <PaymentToDisplay paymentType={paymentType} />}
      <Footer />
    </>
  );
};

export default PayForOrder;
