import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'

import {fetchDataFromApi} from "../utils/api"
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../features/hooks/hookSlice'
import LeftNav from "../LeftNav/LeftNav"
import SearchResultVideoCard from "./SearchResultVideoCard"

const SearchResult = () => { 

    const dispatch = useDispatch()
  const [result, setResult] = useState();
  const {searchQuery} = useParams();

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  },[searchQuery])

  const fetchSearchResults = async () => {
    dispatch(toggleLoading())
    const options = {
      params: {
        query: searchQuery, // Search keyword
        page: 1,
        limit: 10,
      },
    }

    try {
      const response = await fetchDataFromApi(`videos`,options)
      console.log(response);
      setResult(response?.videos);
      dispatch(toggleLoading())
    } catch (error) {
      dispatch(toggleLoading())
      console.log(error)
    }
  }
  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
        <LeftNav />
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
            <div className="grid grid-cols-1 gap-2 p-5">
                {result?.map((item) => {
                    // if (item?.type !== "video") return false;
                    // let video = item?.video;
                    let video = item
                    return (
                        <SearchResultVideoCard
                            key={video?._id}
                            video={video}
                        />
                    );
                })}
            </div>
        </div>
    </div>
  );
}

export default SearchResult