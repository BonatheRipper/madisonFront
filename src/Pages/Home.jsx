import React from "react";
import Header from "../Components/Header";
import WelcomeHome from "../Components/WelcomeHome";
import Categories from "../Components/Categories";
import About from "../Components/About";
import Products from "../Components/Products";
import Testimonials from "../Components/Testimonials";
import Contact from "../Components/Contact";
import LoadingScreen from "../Screens/LoadingScreen";
import { useStateContext } from "../context/Statecontext";
import { useState } from "react";
import { useEffect } from "react";
import { FetchProducts } from "../services/FetchProducts";
import ShareHeader from "../Components/ShareHeader";
import Footer from "../Components/Footer";

const Home = () => {
  const {
    setLoadingScreen,
    loadingScreen,
    setCats,
    scrollToTop,
    productsDispatch,
  } = useStateContext();

  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    scrollToTop();
    FetchProducts(
      productsDispatch,
      setLoadingScreen,
      loadingScreen,
      setCats,
      querySearch
    );
  }, []);
  return (
    <>
      <ShareHeader />
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <>
          {" "}
          <Header />
          <div id="Welcome&Categories" className="bg-[#F1FFFD] ">
            <WelcomeHome />
            <Categories />
            <About />
            <Products />
            <Testimonials />
            <Contact />
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
