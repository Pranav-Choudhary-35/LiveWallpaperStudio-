import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setactiveTab } from "../Redux/features/SearchSlice";

const Tabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  const tabs = ["photos", "videos", "GIF"];

  return (
    <div className="flex  gap-5 p-10">
      {tabs.map(function (elem, idx) {
        return (
          <button   className={`${(activeTab==elem?'bg-blue-700':'bg-gray-500')} transition cursor-pointer active:scale-95 px-5 py-2 rounded uppercase`}
            onClick={() => {
              dispatch(setactiveTab(elem));
            }}
            key={idx}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
