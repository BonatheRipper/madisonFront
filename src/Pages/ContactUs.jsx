import React from "react";
import { useEffect } from "react";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import ShareHeader from "../Components/ShareHeader";
import { useStateContext } from "../context/Statecontext";
const ContactUs = () => {
  const { scrollToTop } = useStateContext();
  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);
  return (
    <>
      <ShareHeader />
      <div className="">
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
