import React from "react";
import { useStateContext } from "../context/Statecontext";
import ProductCard from "./ProductCard";
import ProductsMenuBtn from "./ProductsMenuBtn";
import Starratings from "../Utils/Starratings";

import { useState } from "react";
const Products = () => {
  const { themeBG, products, handleAddProductToCart, categories } =
    useStateContext();

  const [querySearch, setQuerySearch] = useState("");

  function handlreFrontPageProductsFilter(e) {
    setQuerySearch(e.target.value);
  }
  return (
    <div
      className={`${themeBG} relative px-8 md:px-24 py-32 flex flex-col space-y-8 justify-center items-center w-full `}
    >
      <div className="border-b border-b-[#D2B6A2]  w-full flex justify-center">
        <h3 className="font-heading text-3xl mb-4">Our Products</h3>
      </div>
      <div className="flex justify-center w-full md:items-center flex-wrap md:flex-nowrap">
        <ProductsMenuBtn click={(e) => setQuerySearch("")} text="All" />
        <>
          {categories.map((cat, i) => {
            return (
              <ProductsMenuBtn
                key={i}
                click={(e) => handlreFrontPageProductsFilter(e)}
                text={cat}
              />
            );
          })}
        </>
      </div>
      {products.items && (
        <div className="flex  justify-between flex-col md:flex-row w-full md:flex-wrap">
          {products.items
            .filter((productsFiltered) => {
              //If the query search to filter products is empty then return all products
              if (querySearch === "") {
                return productsFiltered;
              } else if (
                // Else return the filtered Product

                productsFiltered.category
                  .toLowerCase()
                  .includes(querySearch.toLowerCase())
              ) {
                return productsFiltered;
              }
            })
            .map((item, i) => {
              return (
                <ProductCard
                  key={item._id + i}
                  image={item.image.url}
                  pID={item._id}
                  catName={item.category}
                  pName={item.name}
                  price={item.price}
                  pDesc={item.description}
                  click={() => handleAddProductToCart(item)}
                  stars={<Starratings productReviews={item.reviews} />}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Products;
