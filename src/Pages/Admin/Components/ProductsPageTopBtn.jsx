import React from "react";
import ProductsPageBtn from "./ProductsPageBtn";
import { BsFillCartCheckFill } from "react-icons/bs";
import { GrDocumentVerified } from "react-icons/gr";
import { FaPeopleCarry } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
const ProductsPageTopOptions = () => {
  return (
    <div className="  ">
      <div className="flex  text-c-green  justify-between items-center p-4 mt-16 flex-col md:flex-row">
        <ProductsPageBtn
          to="/admin/products/addproduct"
          text="Add Product"
          icon={<BsFillCartCheckFill />}
        />
        <ProductsPageBtn
          to="/"
          text="Mange Orders"
          icon={<GrDocumentVerified />}
        />
        <ProductsPageBtn
          to="/admin/users"
          text="Manage Users"
          icon={<FaPeopleCarry />}
        />
        <ProductsPageBtn
          to="/admin/subscribers"
          text="Manage Subscribers"
          icon={<BsFillPeopleFill />}
        />
      </div>
    </div>
  );
};

export default ProductsPageTopOptions;
