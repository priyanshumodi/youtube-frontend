import React, {useEffect, useState} from 'react'

import LeftNav from "../LeftNav/LeftNav"
import VideoCard from "./VideoCard"
import { useSelector } from 'react-redux'
import { fetchDataFromApi } from '../utils/api'

const Feed = () => {

  const loading = useSelector(state => state.hookReducer.loading)
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    fetchFeedVideos()
  }, [])

  const fetchFeedVideos = async () => {
    const response = await fetchDataFromApi(`videos`,{params: {query: 'a'}})
    console.log(response.videos)
    setSearchResults(response.videos)
  }

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  },[])

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
        <LeftNav />
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                {!loading && searchResults.length > 0 &&
                    searchResults.map((item) => {
                        return (
                            <VideoCard
                                key={item?._id}
                                video={item}
                            />
                        );
                    })}
            </div>
        </div>
    </div>
);
}

export default Feed