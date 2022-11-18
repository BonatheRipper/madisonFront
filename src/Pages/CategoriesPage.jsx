import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import ShareHeader from "../Components/ShareHeader";
import { useStateContext } from "../context/Statecontext";
const CategoriesPage = () => {
  const { scrollToTop } = useStateContext();
  scrollToTop();
  return (
    <>
      <ShareHeader />
      <div className="">
        <Categories />
      </div>
      <Footer />
    </>
  );
};

export default CategoriesPage;
