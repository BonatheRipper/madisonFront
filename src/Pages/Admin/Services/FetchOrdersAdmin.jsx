import React from "react";
import axios from "axios";
export const FetchOrdersAdmin = async (user) => {
  try {
    const results = await axios.get(`/api/orders`, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    if (results) {
      return results.data;
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
  return false;
};
