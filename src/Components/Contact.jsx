import React from "react";
import { useStateContext } from "../context/Statecontext";
import "../App.css";
import LongButtons, { NormalButton } from "./LongButtons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import LoadingElementUser from "./LoadingElementUser";
const Contact = () => {
  const { themeBG } = useStateContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [page, setPage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/pages/contact");
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
  const HandleSupportMessage = async (e) => {
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
      toast.error("Please provide a valid email address");
      return false;
    }

    try {
      const result = await axios.post("/api/support/message", {
        email,
        name,
        text,
      });
      if (result) {
        setEmail("");
        setText("");
        setName("");
        return toast(result.data.message);
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <>
      <div
        className={`${themeBG} px-8 md:px-24 py-24 flex flex-col space-y-8 justify-center items-center w-full `}
      >
        {loading ? (
          <div className={`${themeBG} relative w-full py-20 `}>
            <LoadingElementUser />
          </div>
        ) : (
          <>
            <div className="border-b border-b-c-gold w-full flex justify-center">
              <h3 className="font-fair text-3xl mb-4">{page.title}</h3>
            </div>
            <div className="text-lg   text-justify tracking-widest">
              Do you want to make an enquiry? We will be delighted to hear it.
              Drop us a line below, we'd love to talk to you.
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between md:flex-1 ">
              <div className="flex flex-wrap justify-between h-full gap-6 mt-8 md:mt-0">
                <div className="flex flex-col space-y-4 w-72">
                  <div
                    className={`text-2xl w-8 h-8 text-gold flex justify-center items-center px-4 py-4`}
                  >
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </div>
                  <h5 className=" uppercase tracking-widest font-medium ">
                    our office address
                  </h5>
                  <p className="font-body text-base ">{page.AddressText} </p>
                </div>
                <div className="flex flex-col space-y-4 w-72">
                  <div
                    className={`text-2xl w-8 h-8 text-gold flex justify-center items-center px-4 py-4`}
                  >
                    <i className="fa fa-comments" aria-hidden="true"></i>
                  </div>
                  <h5 className="uppercase tracking-widest font-medium text-gold">
                    Let us talk
                  </h5>
                  <p className="text-base "> {page.phoneText}</p>
                </div>
                <div className="flex flex-col space-y-4 w-72">
                  <div
                    className={`text-2xl w-8 h-8 text-gold flex justify-center items-center px-4 py-4`}
                  >
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </div>
                  <h5 className="uppercase tracking-widest font-medium ">
                    Mail us
                  </h5>
                  <p className="text-base ">{page.emailText}</p>
                </div>
                <div className="flex flex-col space-y-4 w-72">
                  <div
                    className={`text-2xl w-8 h-8 text-gold flex justify-center items-center px-4 py-4`}
                  >
                    <i className="fa fa-globe" aria-hidden="true"></i>
                  </div>
                  <h5 className="uppercase tracking-widest font-medium ">
                    Our website
                  </h5>
                  <p className="text-base ">{page.websiteText}</p>
                </div>
              </div>
              <form className="flex flex-col space-y-12 w-full ">
                <div className="flex flex-col py-6">
                  <label className="relative focus-within:text-c-gold block">
                    <span className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email here"
                      className={` ${themeBG} py-3 px-4 w-full bg-c-green tracking-widest left-12 block pl-14  placeholder-pry-50 bg-pry-100 border-b border-b-c-gold text-gold placeholder:text-c-gold  appearance-none transition duration-300 focus:outline-none focus:border-c-gold focus:ring-c-gold focus:ring-1 `}
                    />
                  </label>
                  <div className="flex flex-col py-6">
                    <label className="relative focus-within:text-c-gold block">
                      <span className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3">
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </span>
                      <input
                        type="text"
                        name="pName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name goes here"
                        className={` ${themeBG} py-3 px-4 w-full bg-c-green tracking-widest left-12 block pl-14  placeholder-pry-50 bg-pry-100 border-b border-b-c-gold text-gold placeholder:text-c-gold  appearance-none transition duration-300 focus:outline-none focus:border-c-gold focus:ring-c-gold focus:ring-1 `}
                      />
                    </label>
                  </div>
                  <div className="flex flex-col py">
                    <label className="relative focus-within:text-c-gold block">
                      <span className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3">
                        <i
                          className="fa fa-commenting-o"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Let's hear from you"
                        className={` ${themeBG} py-3 px-4 w-full bg-c-green tracking-widest left-12 block pl-14  placeholder-pry-50 bg-pry-100 border-b border-b-c-gold text-gold placeholder:text-c-gold  appearance-none transition duration-300 focus:outline-none focus:border-c-gold focus:ring-c-gold focus:ring-1 `}
                      />
                    </label>
                  </div>
                  <div className="flex flex-col py-6 items-center">
                    <NormalButton
                      type="button"
                      text="send  message"
                      click={() => HandleSupportMessage()}
                      css={`text-c-gold ${themeBG} border border-c-gold hover:text-black`}
                    />
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Contact;
