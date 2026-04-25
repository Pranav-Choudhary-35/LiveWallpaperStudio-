import SearchBar from "../Components/SearchBar";
import Tabs from "../Components/Tabs";
import ResultGrid from "../Components/ResultGrid";
import { useSelector } from "react-redux";

const HOME = () => {
  const { query } = useSelector((store) => store.search);

  return (
    <>
   
      <SearchBar />

      {query && query.trim() !== "" ? (
        <div>
          {" "}
          <Tabs />
          <ResultGrid />
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default HOME;
