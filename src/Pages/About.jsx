import React from "react";
import About from "../Components/About";
import Footer from "../Components/Footer";
import ShareHeader from "../Components/ShareHeader";
import { useStateContext } from "../context/Statecontext";
const AboutPage = () => {
  const { scrollToTop } = useStateContext();
  scrollToTop();

  return (
    <>
      <ShareHeader />
      <div className="pt-12">
        <About />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
