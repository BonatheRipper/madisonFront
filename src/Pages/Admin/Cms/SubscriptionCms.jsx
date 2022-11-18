import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AdminSharedHeader from "../Components/AdminSharedHeader";
import InputCms from "../Components/InputCms";
import AdminPagesCmsSaveBtn from "../Components/AdminPagesCmsSaveBtn";
import { useStateContext } from "../../../context/Statecontext";

const SubscriptionCms = () => {
  const [title, setTitle] = useState("");
  const [button, setButton] = useState("");
  const [body, setBody] = useState("");
  const { user } = useStateContext();
  useEffect(() => {
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/pages/subscription", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        if (data) {
          console.group(data);
          setTitle(data.title);
          setButton(data.ButtonText);
          setBody(data.BodyText);
        }
      } catch (e) {
        toast.error(e.response.data.message);
      }
    };
    getPage();
  }, []);

  const handFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body || !button) {
      return toast.error("Some fields are missing ");
    } else {
      const subscription = {
        title: title,
        BodyText: body,
        ButtonText: button,
      };
      const postPage = async () => {
        try {
          const { data } = await axios.post("/api/pages/subscription", {
            subscription,
            headers: { authorization: `Bearer ${user.token}` },
          });
          setTitle(data.title);
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
          <p className="text-xl font-bold font-fair "> Subscription</p>
          <form
            onSubmit={(e) => handFormSubmit(e)}
            className="my-4 w-full border"
          >
            <div className="relative my-2 flex flex-col border py-2 px-2 ">
              <InputCms
                header="Title"
                value={title}
                click={(e) => setTitle(e.target.value)}
              />{" "}
            </div>
            <div className="relative my-2 flex flex-col border py-2 px-2 ">
              <label htmlFor="body" className=" py-2 text-sm">
                Body
              </label>
              <textarea
                onChange={(e) => setBody(e.target.value)}
                id="body"
                value={body}
                className="h-60"
              ></textarea>
            </div>
            <InputCms
              header="Button"
              value={button}
              click={(e) => setButton(e.target.value)}
            />{" "}
            <AdminPagesCmsSaveBtn text="Save" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCms;
