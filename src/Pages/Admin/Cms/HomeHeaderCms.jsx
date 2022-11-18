import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
// import AdminCmsImageUpload from "../Components/AdminCmsImageUpload";
import AdminPagesCmsSaveBtn from "../Components/AdminPagesCmsSaveBtn";
import AdminSharedHeader from "../Components/AdminSharedHeader";
import InputCms from "../Components/InputCms";
import { useStateContext } from "../../../context/Statecontext";
const HomeHeaderCms = () => {
  const { user } = useStateContext();
  const [header, setHeader] = useState();
  const [button, setButton] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/pages/homeheader", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        if (data) {
          setHeader(data.headerText);
          setButton(data.ButtonText);
          setBody(data.BodyText);
        }
      } catch (e) {
        toast.error(e.response.data);
      }
    };
    getPage();
  }, []);

  const handFormSubmit = async (e) => {
    e.preventDefault();
    if (!header || !body || !button) {
      return toast.error("Some fields are missing ");
    } else {
      const homeHeader = {
        headerText: header,
        BodyText: body,
        ButtonText: button,
      };
      const postPage = async () => {
        try {
          const { data } = await axios.post("/api/pages/homeheader", {
            homeHeader,
            headers: { authorization: `Bearer ${user.token}` },
          });
          setHeader(data.headerText);
          setButton(data.ButtonText);
          setBody(data.BodyText);
          return toast("Page updated successfully");
        } catch (e) {
          toast.error(e.response.data.message);
        }
      };
      postPage();
    }
  };
  return (
    <>
      <div className="relative bg-[#F1FFFD] m-0  flex flex-col w-full  h-screen">
        <AdminSharedHeader />
        <div className="flex p-2 md:p-6 flex-col my-20 w-full text-c-green">
          <p className="text-xl font-bold font-fair "> Home Header</p>
          <form
            onSubmit={(e) => handFormSubmit(e)}
            className="my-4 w-full border"
          >
            <InputCms
              header="Header"
              value={header}
              click={(e) => setHeader(e.target.value)}
            />
            <div className="relative my-2 flex flex-col border py-2 px-2 ">
              <label htmlFor="body" className=" py-2 text-sm">
                Body
              </label>
              <textarea
                id="body"
                className="h-60"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </div>
            <InputCms
              header="Button"
              value={button}
              click={(e) => setButton(e.target.value)}
            />
            {/* <AdminCmsImageUpload text="Add media"  /> */}
            <AdminPagesCmsSaveBtn text="Save" />
          </form>
        </div>
      </div>
    </>
  );
};

export default HomeHeaderCms;
