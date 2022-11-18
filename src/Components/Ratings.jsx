import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useStateContext } from "../context/Statecontext";
import Starratings from "../Utils/Starratings";

export const RatingsProductPage = ({ productId, productReviews }) => {
  const [showRatingInput, setShowRatingInput] = useState(true);
  const [ratingVal, setRatingVal] = useState();
  const { user } = useStateContext();
  function isInt(val) {
    return Math.ceil(parseFloat(Number(val))) === Number(val);
  }
  const handleReviewRequest = async (productId) => {
    try {
      const { data } = await axios.post("/api/review", {
        ratingVal: parseInt(ratingVal),
        userId: user._id,
        productId: productId,
        headers: { authorization: `Bearer ${user.token}` },
      });
      toast(data);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  function handleRatingsVal(val) {
    if (!user) {
      return toast.error("Login required");
    }
    if (val && !isInt(val)) {
      return toast.error("Invalid number");
    }
    if (val > 5) {
      toast.error("Ratings cant be greater than 5");
      return setRatingVal(5);
    }
    if (val < 1) {
      toast.error("Ratings cant be empty");
      return setRatingVal("");
    }
    setRatingVal(val);
  }
  return (
    <div className="flex flex-row  justify-start items-center">
      <Starratings productReviews={productReviews} />
      <div
        onClick={() => setShowRatingInput(!showRatingInput)}
        className="Rate mx-2 "
      >
        <span className="underline cursor-pointer w-full hover:animate-pulse">
          Rate?
        </span>
      </div>
      <div
        className={`Rate mx-2 ${
          showRatingInput ? " invisible" : " visible"
        }  transition duration-1000 `}
      >
        <input
          type="number"
          maxlength="5"
          value={ratingVal}
          onChange={(e) => handleRatingsVal(e.target.value)}
          className="border-2 rounded-lg border-c-green w-12"
        />
        <span
          onClick={() => handleReviewRequest(productId)}
          className="mx-1 hover:underline cursor-pointer hover:animate-none	 animate-pulse"
        >
          save
        </span>
      </div>
    </div>
  );
};
