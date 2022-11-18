import React from "react";
import { TbGridDots } from "react-icons/tb";
import { useStateContext } from "../../../../context/Statecontext";
import LoadinElementAdmin from "../LoadinElementAdmin";

const TrafficSourceData = [
  { name: "Google", value: 4000, color: "#0088FE" },
  { name: "Facebook", value: 3000, color: "#00C49F" },
  { name: "Yandex", value: 12000, color: "#ff63a5" },
  { name: "Instagram", value: 2000, color: "#FFBB28" },
  { name: "YouTue", value: 3900, color: "#816bff" },
  { name: "Others", value: 1000, color: "#6f9a37" },
];
const TrafficSources = ({ TrafficSource }) => {
  const { themeBG } = useStateContext();

  return (
    <div
      className={`${themeBG} self-stretch  text-c-gold w-full md:w-3/12  shadow-lg orders h-auto  border rounded-md  p-1 py-8 `}
    >
      <>
        {!TrafficSourceData.length ? (
          <LoadinElementAdmin />
        ) : (
          <>
            <div className="btns flex justify-between p-2 my-4 text-wite">
              <p>Traffic Sources</p>
              <button
                type="button"
                className="hover:text-white hover:bg-black hover:p-1"
              >
                <TbGridDots />
              </button>
            </div>
            <div className="trafficData">
              {TrafficSource}
              <div className="Traffic sources p-2">
                <div className="flex flex-row justify-between p-4 b  border border-c-gold ">
                  <p>Source</p>
                  <p>Traffic</p>
                </div>
                {TrafficSourceData.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex border border-c-gold flex-row justify-between p-1"
                    >
                      <p>
                        <span
                          className={` px-1 rounded-full mr-2 bg-[${item.color}]`}
                        >
                          {" "}
                        </span>
                        {item.name}
                      </p>
                      <p>{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default TrafficSources;
