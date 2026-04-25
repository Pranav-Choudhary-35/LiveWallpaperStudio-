import { useState, useEffect } from "react";
import { setquery } from "../Redux/features/SearchSlice";
import { useDispatch, useSelector } from "react-redux";


const SearchBar = () => {
  const defaultQuery = useSelector((state) => state.search.query);
  const [text, setText] = useState(defaultQuery);

  useEffect(() => {
    setText(defaultQuery);
  }, []);
  
  const dispatch=useDispatch();
 

  function submitHandler(e){
    e.preventDefault();
    dispatch(setquery(text));
    console.log("Search query:", text);
  }

  return (
    <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }} className='flex gap-5 py-6 px-10 bg-gray-900 border-b border-gray-700'>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          required
          className='w-full border-2 border-gray-600 px-6 py-3 text-xl rounded outline-none bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 transition'
          type="text"
          placeholder='🔍 Search anything...'
        />
        <button className='active:scale-95 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-xl rounded font-semibold transition'>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
