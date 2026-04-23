import { useDispatch, useSelector } from "react-redux";
import {
  seterror,
  setquery,
  setloading,
  setresult,
} from "../Redux/features/SearchSlice";
import { fetchImages, fetchGif, fetchVideos } from "../Api/MediaApi";
import { useEffect } from "react";
import ResultCard from "./ResultCard";


const ResultGrid = () => {
  const { query, activeTab, loading, error, result } = useSelector(
    (store) => store.search,
  );
  const dispatch = useDispatch();
  let data = [];

  useEffect(
    function () {
      if (!query) return
      const getData = async () => {
        try {
          dispatch(setloading());
          if (activeTab == "photos") {
            let response = await fetchImages(query);

            data = response.results.map((item) => ({
              id: item.id,
              type: "photo",
              title: item.alt_description,
              thumbnail: item.urls.small,
              src: item.urls.full,
              url: item.links.html,
            }));
          }

          if (activeTab == "videos") {
            let response = await fetchVideos(query);
            data = response.videos.map((item) => ({
              id: item.id,
              type: "video",
              title: item.user.name || video,
              thumbnail: item.image,
              src: item.video_files[0].link,
              url: item.url,
            }));
          }

          if (activeTab == "GIF") {
            let response = await fetchGif(query);

            data = response.data.map((item) => ({
              id: item.id,
              title: item.title || "GIF",
              type: "gif",
              thumbnail: item.images.fixed_height_small.url,
              src: item.images.original.url,
              url: item.url,
            }));
          }

          dispatch(setresult(data));
        } catch (err) {
          dispatch(seterror(err.message));
        }
      };

      getData();
    },
    [query, activeTab, setresult, seterror,setloading],
  );

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading ...</h1>;

  return (
   <div className='flex justify-between w-full flex-wrap gap-6 overflow-auto px-10'>
            {result.map((item, idx) => {
                return <div key={idx}>
                    <ResultCard item={item} />
                </div>
            })}
        </div>
  );
};

export default ResultGrid;
