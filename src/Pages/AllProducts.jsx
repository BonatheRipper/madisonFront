import React from "react";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useStateContext } from "../context/Statecontext";
import ProductCard from "../Components/ProductCard";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FetchAllProducts } from "../services/FetchAllProducts";
import LoadingScreen from "../Screens/LoadingScreen";
import ShareHeader from "../Components/ShareHeader";
import Footer from "../Components/Footer";
import {
  paginateNumbersLength,
  paginatePager,
  paginatePageToDisplay,
} from "../Utils/Paginate";
const catOrders = {
  arr: [
    "Newest",
    "Oldest",
    "Ascending",
    "Descending",
    "Highest to lowest price",
    "Lowest to highest price",
  ],
  value: "Newest",
};
const AllProducts = () => {
  const {
    themeBG,
    products,
    handleAddProductToCart,
    scrollToTop,
    productsDispatch,
  } = useStateContext();
  const [pageNumber, setPageNumber] = useState(0);
  const [cats, setCats] = useState([]);
  const [selects, setSelects] = useState("");
  const [sortCat, setSortCat] = useState(catOrders);
  const [currentTable, setCurrentTable] = useState(1);
  const [ordersPerTable, setOrdersPerTable] = useState(8);
  const indexOfLastTable = currentTable * ordersPerTable;
  const indexOfFirstTable = indexOfLastTable - ordersPerTable;
  const [totalPages, setTotalPages] = useState(1);
  const pages = new Array(totalPages).fill(totalPages);
  let num = -1;
  const handleClick = (currentPageNum) => {
    setPageNumber(currentPageNum);
  };
  const clearSearchFilter = () => {
    setSelects("");
  };
  const handleSortCat = (action) => {
    let allPost;
    if (action === "Oldest") {
      allPost = products.items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (action === "Newest") {
      allPost = products.items.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (action === "Ascending") {
      allPost = products.items.sort();
    } else if (action === "Descending") {
      allPost = products.items.reverse();
    } else if (action === "Lowest to highest price") {
      allPost = products.items.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (action === "Highest to lowest price") {
      allPost = products.items.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }
    setSortCat({ ...sortCat, value: action });
    return productsDispatch({
      type: "FETCH_SUCCESS",
      payload: allPost,
    });
  };
  scrollToTop();
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  useEffect(() => {
    FetchAllProducts(
      pageNumber,
      selects,
      setCats,
      setTotalPages,
      setSortCat,
      sortCat,
      productsDispatch
    );
  }, [pageNumber, selects]);
  return (
    <>
      <ShareHeader />
      {!products.items ? (
        <LoadingScreen />
      ) : (
        <div
          className={`bg-[#F1FFFD] relative px-8 md:px-24 py-32  flex flex-col space-y-8 justify-center items-center w-full `}
        >
          <div className="flex flex-col justify-start w-full">
            <div className="flex space-x-2 justify-start w-full py-2">
              <NavLink className="text-c-green" to="/">
                Home >
              </NavLink>
              <NavLink className="text-c-green" to="/shop">
                Products
              </NavLink>
            </div>
            <h2 className="text-c-green text-2xl font-fair py-2  font-bold">
              All Products
            </h2>

            <div className="flex  flex-col py-2">
              <label
                className="font-sans   text-c-green text-sm"
                htmlFor="category"
              >
                Filter by:
              </label>
              <div className="flex justify-between w-full space-y-4 md:space-x-4  md:space-y-0 md:w-4/5 flex-col md:flex-row">
                <select
                  id="category"
                  value={selects}
                  onChange={(e) => setSelects(e.target.value)}
                  name="category"
                  className="bg-[#F1FFFD] border border-c-green md:w-2/5 text-c-green px-6 capitalize hover:bg-c-green hover:text-c-gold py-2 bg-pry-50 transition duration-300 ease-in"
                >
                  <option disabled>Category</option>
                  {cats.map((cat, i) => {
                    return (
                      <>
                        <option key={cat + i}>{cat}</option>
                      </>
                    );
                  })}
                </select>
                <select
                  id="sort"
                  name="sort"
                  value={sortCat.value}
                  onChange={(e) => handleSortCat(e.target.value)}
                  className="bg-[#F1FFFD] border border-c-green md:w-2/5 text-c-green px-6 capitalize hover:bg-c-green hover:text-c-gold py-2 bg-pry-50 transition duration-300 ease-in"
                >
                  {sortCat.arr.map((sort, i) => {
                    return (
                      <>
                        <option value={sort} key={sort + i}>
                          {sort}
                        </option>
                      </>
                    );
                  })}
                </select>
                <button
                  onClick={() => clearSearchFilter()}
                  className="text-c-green text-sm border-b border-b-c-green px-4 py-2 md:w-2/5 hover:text-red-500 hover:border-b-red-500 transition duration-300 ease-in"
                >
                  Clear filters
                </button>
              </div>
            </div>
          </div>

          {products.items && (
            <div className="flex  justify-between flex-col md:flex-row w-full md:flex-wrap">
              {paginatePageToDisplay(
                products.items,
                indexOfFirstTable,
                indexOfLastTable
              ).map((item, i) => {
                return (
                  <div key={item._id + i} data-aos="fade-up">
                    <ProductCard
                      image={item.image.url}
                      css={`
                        ${themeBG}
                      `}
                      css2="bg-c-gold"
                      pID={item._id}
                      catName={item.category}
                      pName={item.name}
                      price={item.price}
                      pDesc={item.description}
                      click={() => handleAddProductToCart(item)}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="justify-self-end self-end">
            <nav aria-label="pagination navigation">
              <ul className="flex flex-row">
                {paginateNumbersLength(products.items, ordersPerTable).map(
                  (num, i) => {
                    return (
                      <li key={i}>
                        <button
                          className={` flex mx-2 items-center justify-center ${
                            num === currentTable
                              ? `${themeBG} bg-c-gold  text-c-gold`
                              : " border border-c-green "
                          } rounded-full w-6 h-6`}
                          type="button"
                          value={num}
                          onClick={(e) => paginatePager(setCurrentTable, num)}
                          id={num}
                        >
                          {num}
                          <span className="MuiTouchRipple-root css-w0pj6f"></span>
                        </button>
                      </li>
                    );
                  }
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AllProducts;
