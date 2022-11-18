import RingLoader from "react-spinners/RingLoader";
import HashLoader from "react-spinners/HashLoader";
import CircleLoader from "react-spinners/CircleLoader";
import React from "react";
const color = "#D2B6A2";
export const CircleLoaderx = ({ size }) => {
  return <CircleLoader color={color} loading={true} size={size} />;
};
export const HashLoaderx = ({ size }) => {
  return <HashLoader color={color} loading={true} size={size} />;
};
export const RingLoaderx = ({ size }) => {
  return <RingLoader color={color} loading={true} size={size} />;
};
