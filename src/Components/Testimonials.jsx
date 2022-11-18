import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "../App.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import test1 from "../images/test1.jpeg";
import test2 from "../images/test2.jpeg";
import test3 from "../images/test3.jpeg";
import test4 from "../images/test4.jpeg";

const TestimonialsArr = [
  {
    testimony:
      " They were extremely reliable and delivered way beyond my expectation",
    name: "Simon Cowell",
    ocuppation: "Big Brother",
    image: test1,
  },
  {
    testimony:
      " They were extremely reliable and delivered way beyond my expectation",
    name: "Jojn Johnson",
    ocuppation: "Internet Marketer",
    image: test2,
  },
  {
    testimony:
      " They were extremely reliable and delivered way beyond my expectation",
    name: "Andrew Gayfield",
    ocuppation: "Banker",
    image: test3,
  },
  {
    testimony:
      " They were extremely reliable and delivered way beyond my expectation",
    name: "Jessica Banks",
    ocuppation: "Realtor",
    image: test4,
  },
];
const Testimonials = () => {
  return (
    <div className=" px-8 md:px-24 py-24 md:py-32 flex flex-col space-y-8 justify-center items-center w-full ">
      <div className="border-b border-c-green border-b-c-green  w-full flex justify-center">
        <h3 className="font-fair text-3xl text-c-green mb-4">
          What Our Clients Say
        </h3>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
        freeMode={true}
        grabCursor={true}
        className="MySwipper w-full"
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          760: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          960: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
      >
        {TestimonialsArr.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <TestimonialCard
                name={item.name}
                image={item.image}
                testimony={item.testimony}
                ocuppation={item.ocuppation}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Testimonials;
