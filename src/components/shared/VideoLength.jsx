import React from 'react'
import moment from 'moment'

const VideoLength = ({time}) => {
    const videoLengthInSeconds = moment()?.startOf("day")?.seconds(time)?.format("H:mm:ss");
    // const hours = Math.floor(time / 3600);
    // const minutes = Math.floor((time % 3600) / 60);
    // const secondsLeft = time % 60;
    // const videoLengthInSeconds = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
    // console.log(videoLengthInSeconds)

  return (
    <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
        {videoLengthInSeconds}
    </span>
  )
}

export default VideoLength