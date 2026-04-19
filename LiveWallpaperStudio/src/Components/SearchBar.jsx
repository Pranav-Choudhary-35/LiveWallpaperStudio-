import React from "react";
import { useState } from "react";
import { setquery } from "../Redux/features/SearchSlice";
import { useDispatch,useSelector } from "react-redux";


const SearchBar = () => {
  const [text, setText] = useState("");
  
  const dispatch=useDispatch();
 

  function submithandler(e){
    e.preventDefault();
    dispatch(setquery(text));
    console.log("Search query:", text);
  }

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <form
        onSubmit={submithandler}
        className="w-full max-w-2xl flex gap-3 bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <input 
          type="text" 
          name="text" 
          value={text} 
          placeholder="Search anything..." 
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full border-none outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-0 text-gray-800 placeholder-gray-500"
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
