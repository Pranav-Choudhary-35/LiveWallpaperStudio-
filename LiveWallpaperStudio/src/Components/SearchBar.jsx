import { useState } from "react";
import { setquery } from "../Redux/features/SearchSlice";
import { useDispatch } from "react-redux";


const SearchBar = () => {
  const [text, setText] = useState("");
  
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
            }} className='flex  bg-cyan-950 gap-5 py-10 px-10'>

                <input
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    required
                    className='w-full border-2 px-6 py-3 text-xl rounded outline-none'
                    type="text"
                    placeholder='Search anything...' />

                <button className='active:scale-95 cursor-pointer border-2 px-6 py-3 text-xl rounded outline-none'>Search</button>
            </form>
        </div>
    )
};

export default SearchBar;
