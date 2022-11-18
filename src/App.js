import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { useStateContext } from "./context/Statecontext";
import "react-toastify/dist/ReactToastify.css";
import AboutPage from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import ProductsPage from "./Pages/ProductsPage";
import CartPage from "./Pages/CartPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Four0Four from "./Pages/Four0Four";

import AllProducts from "./Pages/AllProducts";
import ProductsByCategory from "./Pages/ProductsByCategory";
import Account from "./Pages/User/Account";
import UpdateAccount from "./Pages/User/UpdateAccount";
import ShippingAddress from "./Payments/ShippingAddress";
import PlaceOrder from "./Payments/placeOrder";
import PayForOrder from "./Payments/PayForOrder";
import "./index.css";
import "./App.css";
import SingleOrderHistory from "./Pages/User/SingleOrderHistory";
import CategoriesPage from "./Pages/CategoriesPage";
import OrderHistory from "./Pages/User/OrderHistory";
import AdminHome from "./Pages/Admin/AdminHome";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminAddProduct from "./Pages/Admin/AdminAddProduct";
import AdminEditProduct from "./Pages/Admin/AdminEditProduct";
import AdminSupport from "./Pages/Admin/AdminSupport";
import WelcomeCms from "./Pages/Admin/Cms/WelcomeCms";
import AboutCms from "./Pages/Admin/Cms/AboutCms";
import SubscriptionCms from "./Pages/Admin/Cms/SubscriptionCms";
import ContactCms from "./Pages/Admin/Cms/ContactCms";
import HomeHeaderCms from "./Pages/Admin/Cms/HomeHeaderCms";
import Paypal from "./Pages/Admin/Gateway/Paypal";
import Flutterwave from "./Pages/Admin/Gateway/Flutterwave";
import Paystack from "./Pages/Admin/Gateway/Paystack";
import AdminSettings from "./Pages/Admin/AdminSettings";
import AdminSubscribers from "./Pages/Admin/AdminSubscribers";
import PrivateRoutes from "./Utils/PrivateRoute";
import AdminUsers from "./Pages/Admin/AdminUsers";
const App = () => {
  const { themeBG } = useStateContext();
  return (
    <BrowserRouter>
      <div
        className={`
      ${themeBG ? `text-c-gold  ` : ""} relative`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products/:id" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/order/orderhistory" element={<OrderHistory />} />
          <Route
            path="/order/orderhistory/:orderId"
            element={<SingleOrderHistory />}
          />
          <Route path="/order/:orderId" element={<PayForOrder />} />
          <Route path="/shop" element={<AllProducts />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/shop/:catType" element={<ProductsByCategory />} />

          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoutes />}>
            <Route path="/account" element={<Account />} />
            <Route path="/account/:id" element={<UpdateAccount />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/support" element={<AdminSupport />} />
            <Route
              path="/admin/products/addproduct"
              element={<AdminAddProduct />}
            />
            <Route
              path="/admin/products/update/:productId"
              element={<AdminEditProduct />}
            />
            <Route path="/admin/cms/welcome" element={<WelcomeCms />} />
            <Route path="/admin/cms/about" element={<AboutCms />} />
            <Route
              path="/admin/cms/subscription"
              element={<SubscriptionCms />}
            />
            <Route path="/admin/cms/contact" element={<ContactCms />} />
            <Route path="/admin/cms/header" element={<HomeHeaderCms />} />
            <Route path="/admin/gateway/paypal" element={<Paypal />} />
            <Route path="/admin/gateway/paystack" element={<Paystack />} />
            <Route
              path="/admin/gateway/flutterwave"
              element={<Flutterwave />}
            />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/subscribers" element={<AdminSubscribers />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
          {/* PRIVATE ROUTES ENDS*/}

          <Route path="*" element={<Four0Four />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
// npm link ../node_modules/react
export default App;
