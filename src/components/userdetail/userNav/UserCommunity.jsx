import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDataFromApi } from '../../utils/api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TimeAgo from '../../shared/TimeAgo'
import { toggleLoading } from '../../../features/hooks/hookSlice';
import UserPost from './UserPost';

const UserCommunity = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.user)
  const updateMessage = useSelector(state => state.hookReducer.updateComment)

  const [isActivePost, setIsActivePost] = useState(false);
  const [postText, setPostText] = useState('')
  const [post, setPost] = useState([])
  const {id} = useParams()

  useEffect(() => {
    fetchUserPost()
  }, [updateMessage])

  const fetchUserPost = async () => {
    const result = await fetchDataFromApi(`tweet/user/${id}`)
    // console.log(result)
    setPost(result)
  }

  useEffect(() => {
    if(postText.trim() === '') {
      setIsActivePost(false)
    } else {
      setIsActivePost(true)
    }
  }, [postText])

  const handlePostChange = (e) => {
    const newText = e.target.value
    setPostText(newText)
  }
  
  const handleSubmit = async () => {
  dispatch(toggleLoading())

  try {
    const result = await axios.post(`https://youtube-backend-rw43.onrender.com/api/v1/tweet`,{content:postText})
    console.log(result)
    dispatch(toggleLoading())
    dispatch(addUpdateComment(`new${updateMessage}`))
    setPostText('')
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <>
        {/* add post */}
        <div className="bg-card m-4 rounded-2xl shadow-md border-2 border-solid border-zinc-700 bg-neutral-800">
          <div className='p-4'>
            <div className="flex items-center mb-2">
                <img src={user?.avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-2 object-cover" />
                <span className="text-foreground font-semibold text-white">priyanshu modi</span>
            </div>
            <textarea 
            type="text" 
            className='w-full bg-neutral-800 text-muted-foreground mb-4 text-white'
            placeholder='Give a shoutout! Type @ to mention a channel'
            onChange={handlePostChange}
            value={postText}
            />
            {/* <div className="flex space-x-4 mb-4">
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded">Image</button>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded">Image poll</button>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded">Text poll</button>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded">Quiz</button>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded">Video</button>
            </div> */}
            <div className="flex justify-between items-center text-white">
                <span className="text-muted-foreground">Visibility: Public</span>
                <div className='flex'>
                    <button className="ml-2 text-white hover:text-muted px-4 py-2 rounded-3xl hover:bg-white/[0.20]">
                        Cancel
                    </button>
                    <button className={`ml-4 ${isActivePost ? "text-black bg-customBlue" : "bg-white/[0.15] text-zinc-400"} hover:bg-primary/80 px-4 py-2 rounded-3xl font-medium`} onClick={()=> (isActivePost && handleSubmit())}>
                        Post
                    </button>
                </div>
            </div>
          </div>
        </div>
        {/* all post */}
        <div>
          {post && post.map((item) => (
            <UserPost 
            key={item?.tweet?._id}
            post={item?.tweet}
            />
          ))}
        </div>
    </>
  )
}

export default UserCommunity

