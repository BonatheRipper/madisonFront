import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "../context/Statecontext";

const SubscriptionForm = () => {
  const { themeBG, themeShape } = useStateContext();
  const [emailPending, setemailPending] = useState(false);
  const [email, setEmail] = useState(" ");
  const [page, setPage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/pages/subscription");
        if (data) {
          setPage(data);
          return setLoading(false);
        }
      } catch (e) {
        toast.error(e.response.data);
      }
    };
    getPage();
  }, []);
  function validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }
  const handleSubscription = async (e, emailPseudo) => {
    e.preventDefault();
    setemailPending(true);
    if (emailPseudo) {
      if (validateEmail(emailPseudo)) {
        try {
          const result = await axios.post("/api/subscription", { emailPseudo });
          if (result) {
            toast(result.data.message + "yess");
            setEmail("");

            return setemailPending(false);
          }
        } catch (e) {
          toast.error(e.response.data.error);
          return setemailPending(false);
        }
        // return toast.error("Enter a valid email");
      }
    } else {
      return toast.error("Box cannot be empty");
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubscription(e, email)}
      className="flex flex-col justify-between w-full md:w-3/5 mt-6 md:mt-0 space-y-8 md:space-y-0 "
    >
      <h6 className="tracking-widest   text-xl">{page.title}</h6>
      <p className="text-base text-center md:text-left">{page.BodyText}</p>
      <div className="flex flex-col py">
        <label className="relative focus-within:text-c-gold block">
          <span className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className={` ${themeBG} py-3 px-4 w-full bg-c-green tracking-widest left-12 block pl-14  placeholder-pry-50 bg-pry-100 border-b border-b-c-gold text-gold placeholder:text-c-gold  appearance-none transition duration-300 focus:outline-none focus:border-c-gold focus:ring-c-gold focus:ring-1 `}
          />
        </label>
      </div>
      <div className="flex flex-col py-6 items-center">
        <button
          value={email}
          type="submit"
          className={`${themeShape}  bg-c-gold w-full text-c-green border ${
            emailPending ? "animate-bounce" : ""
          } border-c-gold hover:text-black  px-3 py-3 text-center hover:bg-white  transition duration-1000  `}
        >
          {page.ButtonText}
        </button>
      </div>
    </form>
  );
};

export default SubscriptionForm;
