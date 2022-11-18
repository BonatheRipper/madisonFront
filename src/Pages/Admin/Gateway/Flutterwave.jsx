import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AdminSharedHeader from "../Components/AdminSharedHeader";
import InputCms from "../Components/InputCms";
import AdminPagesCmsSaveBtn from "../Components/AdminPagesCmsSaveBtn";
import RadionInputAdmin from "../Components/RadionInputAdmin";

const Flutterwave = () => {
  const [gatewayName, setGatewayName] = useState("");
  const [testKey, setTestKey] = useState("");
  const [liveKey, setLiveKey] = useState("");
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const getPage = async () => {
      try {
        const { data } = await axios.get("/api/gateway/Flutterwave");
        if (data) {
          setChecked(data.isActive);
          setLiveKey(data.liveKey);
          setTestKey(data.testKey);
          setGatewayName(data.name);
        }
      } catch (e) {
        toast.error(e.response.data);
      }
    };
    getPage();
  }, []);

  const handFormSubmit = async (e) => {
    e.preventDefault();
    if (!testKey || !gatewayName || !testKey || !liveKey) {
      return toast.error("Some fields are missing ");
    } else {
      const Flutterwave = {
        name: gatewayName,
        isActive: checked,
        testKey: testKey,
        liveKey: liveKey,
      };
      const postGateway = async () => {
        try {
          const { data } = await axios.post("/api/gateway/Flutterwave", {
            Flutterwave,
          });
          if (data) {
            setChecked(data.isActive);
            setLiveKey(data.liveKey);
            setTestKey(data.testKey);
            setGatewayName(data.name);
          }
          return toast("Updated successfully");
        } catch (e) {
          toast.error(e.response.data);
        }
      };
      postGateway();
    }
  };
  return (
    <>
      <div className="relative bg-[#F1FFFD] m-0  flex flex-col w-full  h-screen">
        <AdminSharedHeader />
        <div className="flex p-2 md:p-6 flex-col my-20 w-full text-c-green">
          <p className="text-xl font-bold font-fair "> Flutterwave Settings</p>
          <form
            onSubmit={(e) => handFormSubmit(e)}
            className="my-4 w-full border"
          >
            <div className="relative my-2 flex flex-col border py-2 px-2 ">
              <InputCms
                header="Gateway Name"
                value={gatewayName}
                click={(e) => setGatewayName(e.target.value)}
              />
            </div>
            <div className="relative my-2 flex flex-col border py-2 px-2 ">
              <InputCms
                header="Test Key"
                value={testKey}
                click={(e) => setTestKey(e.target.value)}
              />
            </div>
            <div className="relative my-2 flex flex-col border py-2 px-2 ">
              <InputCms
                header="Live Key"
                value={liveKey}
                click={(e) => setLiveKey(e.target.value)}
              />
            </div>
            <div className="relative my-2 flex flex-row border py-2 px-2 ">
              <div className="mx-6">
                <RadionInputAdmin
                  header="Active"
                  value={liveKey}
                  checked={checked}
                  click={(e) => setChecked(!checked)}
                />
              </div>
              <div className="mx-6">
                <RadionInputAdmin
                  header="Inactive"
                  value={liveKey}
                  checked={!checked}
                  click={(e) => setChecked(!checked)}
                />
              </div>
            </div>

            <AdminPagesCmsSaveBtn text="Save" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Flutterwave;
