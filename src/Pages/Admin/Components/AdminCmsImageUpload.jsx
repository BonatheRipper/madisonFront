import React from "react";
import { FaImages } from "react-icons/fa";
const AdminCmsImageUpload = ({
  css,
  text,
  id,
  change,
  images,
  serverImage,
  click,
}) => {
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
                data-key="productImage"
                onClick={click}
                data-public_id={serverImage.public_id}
                className=" px-4 py-1 w-full border hover:border-c-green hover:bg-c-gold  border-red-500 hover:text-c-green text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default AdminCmsImageUpload;
