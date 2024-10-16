import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import PlaylistLength from '../../shared/PlaylistLength';

const PlaylistCard = ({playlist}) => {
    
    return (
        <Link to={`/app/playlist/${playlist?._id}`}>
            <div className="flex flex-col mb-8">
                <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={playlist?.thumbnail || "https://images.unsplash.com/photo-1523365280197-f1783db9fe62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D"}
                    />
                    {playlist?.videos && (
                        <PlaylistLength count={playlist?.videos?.length}/>
                    )}
                </div>
                <div className="flex text-white mt-3 flex-col">
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-base font-bold line-clamp-2 text-white">
                            {playlist?.name}
                        </span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-bold line-clamp-2">
                            {playlist?.description}
                        </span>
                    </div>

                </div>
            </div>
        </Link>
    );
}

export default PlaylistCard