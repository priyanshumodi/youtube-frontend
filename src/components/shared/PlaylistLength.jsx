import React from 'react'
import { MdOutlinePlaylistPlay } from "react-icons/md";

const PlaylistLength = ({count}) => {
    return (
        <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md flex items-center gap-1">
          <MdOutlinePlaylistPlay />
          <span>{count}</span>
            
        </span>
      )
}

export default PlaylistLength