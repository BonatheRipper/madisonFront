import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import AdminSharedHeader from "../Components/AdminSharedHeader";
import InputCms from "../Components/InputCms";
import AdminPagesCmsSaveBtn from "../Components/AdminPagesCmsSaveBtn";
import { useStateContext } from "../../../context/Statecontext";
const ContactCms = () => {
  const { user } = useStateContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [button, setButton] = useState("");
  const [address, setAddressText] = useState("");
  useEffect(() => {
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/pages/contact", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        if (data) {
          setTitle(data.title);
          setButton(data.ButtonText);
          setBody(data.BodyText);
          setEmail(data.emailText);
          setPhone(data.phoneText);
          setWebsite(data.websiteText);
          setAddressText(data.AddressText);
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
      const contact = {
        title: title,
        BodyText: body,
        ButtonText: button,
        websiteText: website,
        phoneText: phone,
        emailText: email,
        AddressText: address,
      };
      const postPage = async () => {
        try {
          const { data } = await axios.post("/api/pages/contact", {
            contact,
            headers: { authorization: `Bearer ${user.token}` },
          });
          setTitle(data.title);
          setButton(data.ButtonText);
          setBody(data.BodyText);
          setEmail(data.emailText);
          setPhone(data.phoneText);
          setWebsite(data.websiteText);
          setAddressText(data.AddressText);

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
          <p className="text-xl font-bold font-fair "> Contacxt Page</p>
          <form
            onSubmit={(e) => handFormSubmit(e)}
            className="my-4 w-full border"
          >
            <InputCms
              header="Title"
              value={title}
              click={(e) => setTitle(e.target.value)}
            />

            <div className="relative my-2 flex flex-col border py-2 px-2 ">
              <label htmlFor="body" className=" py-2 text-sm">
                Body
              </label>
              <textarea
                onChange={(e) => setBody(e.target.value)}
                value={body}
                id="body"
                className="h-60"
              ></textarea>
            </div>
            <InputCms
              header="Phone"
              value={phone}
              click={(e) => setPhone(e.target.value)}
            />
            <InputCms
              header="Email"
              value={email}
              click={(e) => setEmail(e.target.value)}
            />
            <InputCms
              header="Address"
              value={address}
              click={(e) => setAddressText(e.target.value)}
            />
            <InputCms
              header="Website"
              value={website}
              click={(e) => setWebsite(e.target.value)}
            />
            <InputCms
              header="Button"
              value={button}
              click={(e) => setButton(e.target.value)}
            />

            <AdminPagesCmsSaveBtn text="Save" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactCms;
