import React from "react";
import Paypal from "../gateways/Paypal";
import Paystack from "../gateways/Paystack";
import Flutterwave from "../gateways/Flutterwave";

function upperCase(text) {
  return text.toString().toUpperCase();
}
const PaymentToDisplay = ({ paymentType }) => {
  if (paymentType) {
    if (upperCase(paymentType) === upperCase("PAYPAL")) {
      return <Paypal />;
    } else if (upperCase(paymentType) === upperCase("PAYSTACK")) {
      return <Paystack />;
    } else if (upperCase(paymentType) === upperCase("Flutterwave")) {
      return <Flutterwave />;
    }
  }
};

export default PaymentToDisplay;
