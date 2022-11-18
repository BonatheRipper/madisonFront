import React, { createContext, useContext, useState } from "react";
import { useReducer } from "react";
import axios from "axios";
import { CircleLoaderx, HashLoaderx, RingLoaderx } from "../Screens/Loaders";
import {
  PayPal,
  PayStack,
  Stripe,
  Flutterwave,
} from "../Payments/PaymentOptions";
import { toast } from "react-toastify";

const productsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, items: action.payload || [], loading: false };
    case "FETCH_FAIL":
      return { ...state, items: false, loading: false, error: action.payload };
    default:
      return state;
  }
};
function paymentReducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", orderPay: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, erroPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
}
const ThemeLoaders = [
  { name: "CircleLoader", image: <CircleLoaderx size={15} /> },
  { name: "HashLoader", image: <HashLoaderx size={15} /> },
  { name: "RingLoader", image: <RingLoaderx size={15} /> },
];
const cartReducer = (state, action) => {
  var newItem = action.payload;
  var cartItems;

  switch (action.type) {
    case "ADD_TO_CART":
      var newItemExist = state.cart.cartItems.find((item) =>
        item ? item._id === action.payload._id : null
      );
      if (newItemExist) {
        newItemExist.quantity = newItemExist.quantity + 1;
        cartItems = state.cart.cartItems.map((item) =>
          item._id === newItemExist._id ? newItemExist : item
        );
      } else {
        newItem.quantity = 1;
      }
      localStorage.setItem(
        "cartItems",
        newItemExist
          ? JSON.stringify(cartItems)
          : JSON.stringify([...state.cart.cartItems, newItem])
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: newItemExist
            ? cartItems
            : [...state.cart.cartItems, newItem],
        },
      };
    case "REMOVE_FROM_CART":
      const newCartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: newCartItems,
        },
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
        },
      };
    case "MINUS_FROM_CART":
      newItemExist = state.cart.cartItems.find((item) =>
        item ? item._id === action.payload._id : null
      );
      if (newItemExist) {
        newItemExist.quantity =
          newItemExist.quantity > 1 ? newItemExist.quantity - 1 : 1;
        cartItems = state.cart.cartItems.map((item) =>
          item._id === newItemExist._id ? newItemExist : item
        );
      } else {
        newItem.quantity = 1;
      }
      localStorage.setItem(
        "cartItems",
        newItemExist
          ? JSON.stringify(cartItems)
          : JSON.stringify([...state.cart.cartItems, newItem])
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: newItemExist
            ? cartItems
            : [...state.cart.cartItems, newItem],
        },
      };
    case "SHIPPING_ADDRESS":
      return {
        ...state,
        ShippingDetails: action.payload,
      };
    case "PAYMENT_METHOD":
      return {
        ...state,
        PaymentMethod: action.payload,
      };
    default:
      return state;
  }
};
const StateContext = createContext();
const ThemeBackground = [
  { color: "bg-black " },
  { color: "bg-c-green " },
  { color: "bg-c-indigo " },
  // { color: "bg-c-darkGreen " },
];
const ThemeShapes = {
  Rounded: "rounded-full",
  Square: "null",
};
const ThemeBorders = {
  Rounded: "rounded-t-full",
  Square: null,
};
export const ContextProvider = ({ children }) => {
  const [themeShape, setThemeShape] = useState(
    localStorage.getItem("themeShape") || ThemeShapes.Rounded
  );
  const [categories, setCats] = useState([]);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [currentThemeLoader, setCurrentThemeLoader] = useState(
    localStorage.getItem("currentThemeLoader") || ThemeLoaders[2].name
  );
  const [themeBorder, setThemeBorder] = useState(ThemeBorders.Rounded);

  const Payments = [
    { name: "Stripe", option: <Stripe />, isActive: false },
    { name: "Flutterwave", option: <Flutterwave />, isActive: true },
    {
      name: "PayPal",
      option: <PayPal />,
      isActive: true,
    },
    { name: "Paystack", option: <PayStack />, isActive: true },
  ];
  const [themeBG, setThemeBG] = useState(
    localStorage.getItem("themeBG") || ThemeBackground[1].color
  );
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [Adminsidebar, setAdminSidebar] = useState(false);

  const [sidebar, setSidebar] = useState(false);
  const [products, productsDispatch] = useReducer(productsReducer, {
    loading: true,
    error: "",
    items: false,
  });
  const [
    { loading, error, orderPay, successPay, loadingPay },
    paymentDispatch,
  ] = useReducer(paymentReducer, {
    loading: true,
    error: "",
    orderPay: {},
    loadingPay: false,
    successPay: false,
  });
  const [smallLoadingBtn, setSmallLoadingBtn] = useState(false);
  const [popup, setPopup] = useState(false);
  const [orderToDeleteID, setOrderToDeleteID] = useState("");

  const [cart, cartDispatch] = useReducer(cartReducer, {
    cart: { cartItems: JSON.parse(localStorage.getItem("cartItems")) || [] },
    ShippingDetails: JSON.parse(localStorage.getItem("shippingAddress")) || {},
    PaymentMethod: localStorage.getItem("PaymentOption") || false,
  });
  const handleAddProductToCart = async (productToAddToCart) => {
    try {
      const existItem = cart.cart.cartItems.find(
        (x) => x._id === productToAddToCart._id
      );
      const id = productToAddToCart._id;
      const results = await axios.get(`/api/products/${id}`);
      const quantity = existItem ? existItem.quantity : 1;
      if (results.data.countInStock <= quantity) {
        return toast.error("Item out of stock");
      }
    } catch (e) {
      toast.error(e.message);
    }
    cartDispatch({ type: "ADD_TO_CART", payload: productToAddToCart });
    toast("Item added to cart");
  };
  const updateCartHandler = async (item, action) => {
    try {
      const existItem = cart.cart.cartItems.find((x) => x._id === item._id);
      const id = item._id;
      const results = await axios.get(`/api/products/${id}`);
      const quantity = existItem ? existItem.quantity : 1;
      if (action === "DELETE") {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: item });
        toast("Item removed from cart");
        return;
      }
      if (action === "ADD") {
        if (results.data.countInStock <= quantity) {
          return toast.error("Item out of stock");
        }

        cartDispatch({ type: "ADD_TO_CART", payload: item });
      }
    } catch (e) {
      toast.error(e.message);
    }

    if (action === "MINUS") {
      cartDispatch({ type: "MINUS_FROM_CART", payload: item });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cartItems");
    cartDispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("user");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("PaymentOption");

    setUser(null);
  };
  return (
    <StateContext.Provider
      value={{
        themeBG,
        handleLogout,
        loadingScreen,
        Adminsidebar,
        setAdminSidebar,
        orderToDeleteID,
        setOrderToDeleteID,
        Payments,
        setLoadingScreen,
        handleAddProductToCart,
        updateCartHandler,
        ThemeBackground,
        popup,
        setPopup,
        user,
        currentThemeLoader,
        setCurrentThemeLoader,
        setUser,
        ThemeLoaders,
        cart,
        cartDispatch,
        smallLoadingBtn,
        setSmallLoadingBtn,
        categories,
        setCats,
        setThemeBG,
        products,
        productsDispatch,
        ThemeShapes,
        setThemeShape,
        themeBorder,
        scrollToTop,
        themeShape,
        orderPay,
        successPay,
        paymentDispatch,
        sidebar,
        setSidebar,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
