import React from "react";
import { useState } from "react";
import { useStateContext } from "../context/Statecontext";

import { ScrollRotate } from "react-scroll-rotate";

const ThemeSettings = () => {
  const [toggleLeftSideBar, setToggleLeftSideBar] = useState(false);
  const {
    themeBG,
    setThemeShape,
    setThemeBG,
    ThemeBackground,
    currentThemeLoader,
    setCurrentThemeLoader,
    themeShape,
    ThemeLoaders,
    ThemeShapes,
  } = useStateContext();
  const handleThemeBg = (colour) => {
    localStorage.setItem("themeBG", colour);
    setThemeBG(colour);
  };
  const handleLoader = (name) => {
    localStorage.setItem("currentThemeLoader", name);
    setCurrentThemeLoader(localStorage.getItem("currentThemeLoader") || name);
  };
  const handleThemeShape = (shape) => {
    localStorage.setItem("themeShape", shape);
    setThemeShape(shape);
  };
  return (
    <>
      {toggleLeftSideBar && (
        <div
          style={{ zIndex: 99 }}
          className={`${themeBG} border-2 border-c-gold fixed w-64 h-screen right-0 `}
        >
          <div className="py-6 px-4">
            <h4 className="text-center p-4 border-b  border-c-gold">
              Setup Theme
            </h4>
          </div>

          <div className="py-6 px-4 flex flex-col ">
            <h4 className="text-sm  border-b  border-c-gold">Theme Shape</h4>
            <div className="flex py-4 px-4 items-center justify-evenly">
              <div
                onClick={() => handleThemeShape("null")}
                className="w-10 h-10 border border-c-gold mx-2 flex items-center justify-center"
              >
                {themeShape === ThemeShapes.Square && (
                  <i className="fa fa-check" aria-hidden="true"></i>
                )}
              </div>
              <div
                onClick={() => handleThemeShape(ThemeShapes.Rounded)}
                className="w-10 h-10 border border-c-gold mx-2 rounded-full flex items-center justify-center"
              >
                {themeShape === ThemeShapes.Rounded && (
                  <i className="fa fa-check" aria-hidden="true"></i>
                )}
              </div>
            </div>
          </div>

          <div className="py-6 px-4 flex flex-col ">
            <h4 className="text-sm  border-b  border-c-gold">Theme Colors</h4>
            <div className="flex py-4 px-4 items-center justify-evenly">
              {ThemeBackground.map((bg, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleThemeBg(bg.color)}
                    className={`${bg.color} ${
                      themeShape ? themeShape : ""
                    } w-10 h-10  border border-c-gold mx-2  flex items-center justify-center transition duration-1000`}
                  >
                    {themeBG === bg.color && (
                      <i className="fa fa-check" aria-hidden="true"></i>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="py-6 px-4 flex flex-col ">
            <h4 className="text-sm  border-b  border-c-gold">Theme Loaders</h4>
            <div className="flex py-4 px-4 items-center justify-evenly">
              {ThemeLoaders.map((loader, i) => {
                return (
                  <div
                    key={loader.name + i}
                    onClick={() => handleLoader(loader.name)}
                    className={`${themeBG} ${
                      themeShape ? themeShape : ""
                    } relative w-10 h-10  border border-c-gold mx-2  flex items-center justify-center transition duration-1000`}
                  >
                    {loader.image}
                    {loader.name === currentThemeLoader && (
                      <i
                        className="fa fa-check absolute"
                        aria-hidden="true"
                      ></i>
                    )}{" "}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div
        style={{ zIndex: 100 }}
        onClick={() => setToggleLeftSideBar(!toggleLeftSideBar)}
        className="w-8 h8 hover:text-white  fixed z-50 text-3xl text=green bottom-0 right-1"
      >
        <ScrollRotate className="w-full h-full">
          <i className="fa fa-cog w-full h-full " aria-hidden="true"></i>
        </ScrollRotate>
      </div>
    </>
  );
};

export default ThemeSettings;
