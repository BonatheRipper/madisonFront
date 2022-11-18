import React from "react";
import { FaImages } from "react-icons/fa";
import { useStateContext } from "../../../context/Statecontext";
const AdminSettingsImageUpload = ({
  css,
  text,
  id,
  change,
  images,
  serverImage,

  click,
}) => {
  const { themeBG } = useStateContext();
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="flex items-center border  w-28 py-2 text-sm"
      >
        <span className="px-1">
          <FaImages />
        </span>
        <span className="px-1">{text}</span>
      </label>
      <input
        onChange={change}
        type="file"
        accept="image/*"
        multiple
        id={id}
        name={id === "imageGallery" ? "imageGallery" : "productImage"}
        className="hidden"
      />

      <div className="flex md:flex-row flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row ">
          {images.length !== 0 && (
            <>
              {images.map((image, i) => {
                return (
                  <img
                    key={i}
                    src={image}
                    alt={text}
                    className={`${css} mx-2`}
                  />
                );
              })}
            </>
          )}
        </div>
        <>
          {serverImage && serverImage.public_id !== "NONE" && (
            <div className="relative flex flex-col justify-center items-center border ">
              <img
                src={serverImage.url}
                alt="ServerImage"
                className={`${css} mx-2`}
              />
              <button
                type="button"
                data-key="settingsImage"
                data-public_id={serverImage.public_id}
                className={`absolute ${css}  ${themeBG} opacity-80 flex justify-center items-center  py-1 w-full border hover:border-c-green hover:bg-c-gold  hover:text-c-green text-white`}
              >
                Active
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default AdminSettingsImageUpload;
