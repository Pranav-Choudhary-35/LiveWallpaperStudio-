import { useDispatch, useSelector } from "react-redux";
import { setactiveTab } from "../Redux/features/SearchSlice";

const Tabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  const tabs = ["photos", "videos", "GIF"];

  return (
    <div className="flex gap-5 px-10 py-6 bg-gray-900 border-b border-gray-700 overflow-x-auto">
      {tabs.map(function (elem, idx) {
        return (
          <button
            className={`${
              activeTab === elem
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            } transition cursor-pointer active:scale-95 px-6 py-2 rounded-lg uppercase font-semibold text-sm whitespace-nowrap`}
            onClick={() => {
              dispatch(setactiveTab(elem));
            }}
            key={idx}
          >
            {elem === "photos" && "📷"} {elem === "videos" && "🎬"} {elem === "GIF" && "🎞️"} {elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
