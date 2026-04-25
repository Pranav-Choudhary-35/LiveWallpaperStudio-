import { useDispatch, useSelector } from "react-redux";
import {
  seterror,
  setloading,
  setresult,
  appendResult,
  setPage,
  setHasMore,
} from "../Redux/features/SearchSlice";
import { fetchImages, fetchGif, fetchVideos } from "../Api/MediaApi";
import { useEffect, useRef, useCallback } from "react";
import ResultCard from "./ResultCard";


const ResultGrid = () => {
  const { query, activeTab, loading, error, result, page, hasMore } = useSelector(
    (store) => store.search,
  );
  const dispatch = useDispatch();
  const sentinelRef = useRef(null);

  // Fetch initial results when query or tab changes
  useEffect(
    function () {
      if (!query) return
      const getData = async () => {
        try {
          dispatch(setloading());
          dispatch(setPage(1));
          let data = [];

          if (activeTab == "photos") {
            let response = await fetchImages(query, 1);
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
            let response = await fetchVideos(query, 1);
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
          dispatch(setHasMore(data.length > 0));
        } catch (err) {
          dispatch(seterror(err.message));
        }
      };

      getData();
    },
    [query, activeTab],
  );

  // Fetch more results when sentinel is visible
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !query) return;

    try {
      dispatch(setloading());
      const nextPage = page + 1;
      let moreData = [];

      if (activeTab == "photos") {
        let response = await fetchImages(query, nextPage);
        moreData = response.results.map((item) => ({
          id: item.id,
          type: "photo",
          title: item.alt_description,
          thumbnail: item.urls.small,
          src: item.urls.full,
          url: item.links.html,
        }));
      }

      if (activeTab == "videos") {
        let response = await fetchVideos(query, nextPage);
        moreData = response.videos.map((item) => ({
          id: item.id,
          type: "video",
          title: item.user.name || video,
          thumbnail: item.image,
          src: item.video_files[0].link,
          url: item.url,
        }));
      }

      if (activeTab == "GIF") {
        // GIF API doesn't support pagination in the same way, skip for now
        dispatch(setHasMore(false));
        return;
      }

      if (moreData.length > 0) {
        dispatch(appendResult(moreData));
        dispatch(setPage(nextPage));
      } else {
        dispatch(setHasMore(false));
      }
    } catch (err) {
      dispatch(seterror(err.message));
    }
  }, [query, activeTab, page, loading, hasMore, dispatch]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            loadMore();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loadMore, hasMore, loading]);

  if (error) return (
    <div className='flex items-center justify-center min-h-64 px-10'>
      <div className='text-center'>
        <p className='text-2xl text-red-500 font-semibold mb-2'>❌ Error Loading Content</p>
        <p className='text-gray-400'>{error}</p>
      </div>
    </div>
  );

  if (loading && result.length === 0) return (
    <div className='flex items-center justify-center min-h-64 px-10'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
        <p className='text-xl text-gray-400'>Loading {activeTab}...</p>
      </div>
    </div>
  );

  if (result.length === 0) return (
    <div className='flex items-center justify-center min-h-64 px-10'>
      <p className='text-xl text-gray-400'>No results found for "{query}"</p>
    </div>
  );

  return (
    <div className='w-full'>
      <div className='flex justify-start w-full flex-wrap gap-6 px-10 py-6'>
        {result.map((item, idx) => {
          return <div key={`${activeTab}-${item.id}-${idx}`}>
            <ResultCard item={item} />
          </div>
        })}
      </div>

      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} className='flex items-center justify-center w-full py-8'>
        {loading && result.length > 0 ? (
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2'></div>
            <p className='text-gray-400'>Loading more {activeTab}...</p>
          </div>
        ) : hasMore ? (
          <p className='text-gray-400'>Scroll to load more...</p>
        ) : (
          <p className='text-gray-500'>📌 No more results</p>
        )}
      </div>
    </div>
  );
};

export default ResultGrid;
