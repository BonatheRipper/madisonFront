import React, { useState } from "react";
import { LeftSideBarBtn } from "./LeftSideBarBtn";
import { GrProductHunt } from "react-icons/gr";
import {
  MdNotes,
  MdContactSupport,
  MdMarkEmailRead,
  MdContactPhone,
  MdDashboard,
} from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";

import { IoIosPeople } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { BsCardHeading, BsPaypal } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import { SiPicpay } from "react-icons/si";
import { GiCircleClaws } from "react-icons/gi";

import { useStateContext } from "../../../context/Statecontext";

const AdminSidebarLeft = ({}) => {
  const { Adminsidebar, setAdminSidebar, themeBG } = useStateContext();
  const [dropdownPages, setDropdownPages] = useState(false);
  const [dropdownGateway, setDropdownGateway] = useState(false);

  const pagesDropDown = () => {
    return (
      <div
        onMouseLeave={() => setDropdownPages(false)}
        onMouseEnter={() => setDropdownPages(true)}
        className="w-full flex flex-col relative"
      >
        <div>
          <LeftSideBarBtn text="Pages" icon={<MdNotes />} link="/admin/" />
        </div>
        <div
          className={` ml-8 ${
            dropdownPages
              ? " visible z-10 translate-y-1 transition "
              : "invisible opacity-0 absolute top-full  left-0 w-full -translate-y-10 -z-10 transition  duration-100 "
          }`}
        >
          <LeftSideBarBtn
            text="Home"
            icon={<AiFillHome />}
            link="/admin/cms/welcome"
          />
          <LeftSideBarBtn
            text="Header"
            icon={<BsCardHeading />}
            link="/admin/cms/header"
          />
          <LeftSideBarBtn
            text="About"
            icon={<MdContactSupport />}
            link="/admin/cms/about"
          />
          <LeftSideBarBtn
            text="Contact"
            icon={<MdContactPhone />}
            link="/admin/cms/contact"
          />
          <LeftSideBarBtn
            text="Subscription"
            icon={<MdMarkEmailRead />}
            link="/admin/cms/subscription"
          />
        </div>
      </div>
    );
  };
  const gatewayDropDown = () => {
    return (
      <div
        onMouseLeave={() => setDropdownGateway(false)}
        onMouseEnter={() => setDropdownGateway(true)}
        className="w-full flex flex-col relative"
      >
        <div>
          <LeftSideBarBtn
            text="Payment Gateway"
            lock="Payment Gateway"
            icon={<RiSecurePaymentFill />}
            link="/admin/"
          />
        </div>
        <div
          className={` ml-8 ${
            dropdownGateway
              ? " visible z-40 translate-y-1 transition "
              : "invisible opacity-0 absolute top-full  left-0 w-full -translate-y-10 -z-10 transition  duration-100 "
          }`}
        >
          <LeftSideBarBtn
            text="PayPal"
            icon={<BsPaypal />}
            link="/admin/gateway/Paypal"
          />
          <LeftSideBarBtn
            text="Paystack"
            icon={<SiPicpay />}
            link="/admin/gateway/paystack"
          />
          <LeftSideBarBtn
            text="Flutterwave"
            icon={<GiCircleClaws />}
            link="/admin/gateway/flutterwave"
          />
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        style={{ zIndex: 51 }}
        className={`${
          Adminsidebar ? "left-0" : "-left-80"
        } md:block fixed h-screen top-0  p-4 pt-16 w-80 ${themeBG}`}
      >
        <ul
          onClick={() => setAdminSidebar(!Adminsidebar)}
          className="flex flex-col p-4 justify-center items-center w-full"
        >
          <LeftSideBarBtn
            text="Dashboard"
            icon={<MdDashboard />}
            link="/admin"
          />
          <LeftSideBarBtn
            text="Products"
            icon={<GrProductHunt />}
            link="/admin/products"
          />
          {pagesDropDown()}
          <LeftSideBarBtn
            text="Subscribers"
            icon={<HiUsers />}
            link="/admin/subscribers"
          />
          <LeftSideBarBtn
            text="Users"
            icon={<IoIosPeople />}
            link="/admin/users"
          />

          <LeftSideBarBtn
            text="Support"
            icon={<BiSupport />}
            link="/admin/support"
          />
          {gatewayDropDown()}
          <LeftSideBarBtn
            text="Settings"
            icon={<FiSettings />}
            link="/admin/settings"
          />
        </ul>
      </div>
    </>
  );
};

export default AdminSidebarLeft;
