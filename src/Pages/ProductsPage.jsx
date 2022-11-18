import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import LongButtons, { NormalButton } from "../Components/LongButtons";
import { useStateContext } from "../context/Statecontext";
import "../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
// import "swiper/css/navigation";
import { Navigation } from "swiper";
import { FetchSingleProduct } from "../services/FetchSingleProduct";
import LoadingScreen from "../Screens/LoadingScreen";
import ShareHeader from "../Components/ShareHeader";
import Footer from "../Components/Footer";
import { RatingsProductPage } from "../Components/Ratings";
const ProductsPage = () => {
  const { themeBG, handleAddProductToCart, scrollToTop, user, themeShape } =
    useStateContext();

  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [currentImg, setCurrentImg] = useState();
  useEffect(() => {
    scrollToTop();
    FetchSingleProduct(id, setSingleProduct, singleProduct, setCurrentImg);
  }, []);
  const handleGalleryClick = (imgLink) => {
    setCurrentImg(imgLink);
  };
  return (
    <>
      <ShareHeader />
      {!singleProduct ? (
        <LoadingScreen />
      ) : (
        <div
          className={`bg-pry-50 text-c-green px-8 md:px-24 py-24 flex flex-col justify-between  w-full space-y-4 bg-[#F1FFFD]`}
        >
          <p className="text-c-green text-xs font-body font-medium ">
            <NavLink to="/">{`Home > `}</NavLink>
            <NavLink
              to={`/category/${singleProduct.category}`}
            >{`${singleProduct.category} > `}</NavLink>
            <NavLink
              to={`/products/${singleProduct._id}`}
            >{`${singleProduct.name} `}</NavLink>
          </p>
          <h2 className="font-fair  text-c-green text-3xl tracking-loose">
            Product Details
          </h2>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 justify-between md:space-x-12">
            <div className="flex flex-col justify-between items-center flex-1 h-4/5">
              <div
                className={`${themeBG} ${
                  themeShape ? themeShape : "rounded-lg"
                }  w-full h-3/6 my-4 flex px-10 py-10 justify-center items-center`}
              >
                <img
                  className={`${themeShape} transition  duration-1000 h-5/6 w-full `}
                  src={currentImg || singleProduct.image.url}
                  alt="Product-Pic"
                />
              </div>
              <div className="flex justify-center items-center my-4 overflow-hidden	relative">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  pagination={{ clickable: true }}
                  grabCursor={true}
                  className="MySwipper w-96 overflow-hidden	"
                  slidesPerView={3}
                  breakpoints={{
                    0: {
                      slidesPerView: 4,
                      spaceBetween: 2,
                    },
                    760: {
                      slidesPerView: 4,
                      spaceBetween: 2,
                    },
                    960: {
                      slidesPerView: 4,
                      spaceBetween: 2,
                    },
                  }}
                >
                  {singleProduct.gallery.map((item, i) => {
                    return (
                      <SwiperSlide
                        key={i}
                        onClick={() => handleGalleryClick(item.url)}
                        className="relative flex items-center justify-center"
                      >
                        <img
                          className={`${
                            themeShape ? themeShape : "rounded-lg"
                          } border-c-darkGreen  w-16 h-16 md:h-20 md:w-20 border p-2 m-2`}
                          src={item.url}
                          alt="Product-gallery-Pic"
                        />

                        {currentImg === item && (
                          <div
                            className={`${
                              themeShape ? themeShape : "rounded-lg"
                            } w-full h-full bg-c-gold opacity-50 absolute text-black flex items-center justify-center transition duration-1000`}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </div>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <LongButtons
                to="/shop"
                text="Back to products"
                css={`bg-[#F1FFFD] border border-c-green hover:${themeBG} hover:text-grey`}
              />
            </div>
            <div className="flex flex-col justify-between flex-1  h-4/5 space-y-7 ">
              <p className="tracking-widest font-body uppercase  text-md">
                {singleProduct.category}
              </p>
              <p className="font-fair  text-c-green text-2xl">
                {singleProduct.name}
              </p>
              <p className=" text-base text-justify tracking-wide">
                {singleProduct.description}
              </p>
              <div className="flex flex-col">
                <p className="tracking-widest font-body my-2    text-base">
                  Material: {singleProduct.material}
                </p>
                <p className="tracking-widest font-body my-2    text-base">
                  Price: ${singleProduct.price}
                </p>
                <p className="tracking-widest font-body my-2    text-base">
                  Color: Red
                </p>
                <p className=" font-body my-2    text-base">
                  {user && (
                    <RatingsProductPage
                      productId={singleProduct._id}
                      productReviews={singleProduct.reviews}
                    />
                  )}
                </p>
              </div>{" "}
              <NormalButton
                click={() => handleAddProductToCart(singleProduct)}
                text="ADD TO CART"
                css={`hover:bg-[#F1FFFD] text-c-gold border border-c-green ${themeBG} hover:text-black`}
              />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductsPage;
