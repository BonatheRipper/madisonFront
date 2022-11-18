import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const StateContext = createContext();

export const FetchContextProvider = ({ children }) => {
  const [siteLogo, setSiteLogo] = useState("");
  const [siteTitle, setSiteTitle] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(`/api/settings`);
        if (data) {
          const { logoImage, faviconImage, title } = data;
          setSiteLogo(logoImage.url);
          setSiteTitle(title);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchSettings();
  }, []);
  return (
    <StateContext.Provider value={{ siteLogo, siteTitle }}>
      {children}
    </StateContext.Provider>
  );
};

export const FetchContext = () => useContext(StateContext);
