import React,{useState, useEffect} from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { FaEllipsisV } from 'react-icons/fa';
import { fetchDataFromApi } from '../utils/api';
import TimeAgo from '../shared/TimeAgo';
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../../features/hooks/hookSlice'
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { addUpdateComment } from '../../features/hooks/hookSlice';
import { Link } from 'react-router-dom';

const CommentContent = () => {
    const dispatch = useDispatch()
  
    const user = useSelector(state => state.userReducer.user)

    const updateComment = useSelector(state => state.hookReducer.updateComment)
    const [like, setLike] = useState(0)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
      fetchDataForVideoComments()
      fetchCommentLike()
    }, [video, updateComment])


    const handleCommentDelete = async(id) => {
      dispatch(toggleLoading())

      try {
        const result = await axios.delete(`https://youtube-backend-rw43.onrender.com/api/v1/comments/c/${id}`);
        console.log(result)
        dispatch(toggleLoading())
        dispatch(addUpdateComment(`delete${id}`))
      } catch (error) {
        console.log(error)
        dispatch(toggleLoading())
      }
    }

    const handleUpdateComment = (id) => {
      dispatch(addUpdateComment(id))
      console.log(id);
      
    }

    const fetchCommentLike = async(id) => {
      const result = await fetchDataFromApi(`likes/comment/${id}`)
      console.log(result)
      if(result?.[0]?.totalLikes)
      setLike(result?.[0]?.totalLikes)
      else
      setLike(0)
      if(result?.[0]?.isLiked)
      setLiked(result?.[0]?.isLiked)
      else
      setLiked(false)
    }

    const handleToggleCommentLike = async() => {
      d
    }
  return (
    <div className="flex items-start mb-4">
                      <Link to={``}>
                      <img src={item?.comment?.owner?.avatar} className="w-10 h-10 rounded-full mr-4 object-cover" />
                      </Link>
                      <div className="flex-1 text-white">
                        <div className='flex justify-between'>
                          <p className="font-semibold text-foreground">
                              @{item?.comment?.owner?.username} <span className="text-muted text-zinc-500 text-sm">{<TimeAgo timestamp={item?.comment?.createdAt} />}</span>
                          </p>
                      <div className='flex items-center'>
                        {/* user owner feature edit and delete */}
                            {user?._id === item?.comment?.owner?._id && (
                            <>
                            <button onClick={() => handleUpdateComment(item?.comment?._id)} className='hover:bg-white/[0.20] p-2 rounded-full'>
                                <FaRegEdit />
                            </button>
                            <button className='hover:bg-white/[0.20] p-2 rounded-full' onClick={()=>handleCommentDelete(item?.comment?._id)}>
                                <MdDelete />
                            </button>
                            </>
                            )}
                            <div className='hover:bg-white/[0.20] p-2 rounded-full'>
                                <FaEllipsisV />
                            </div>
                      </div>
                      </div>
                      <p className="text-muted-foreground text-gray-200 text-sm">{item?.comment?.content}</p>
                      <div className="flex items-center mt-2">
                    <button 
                    onClick={handleToggleCommentLike}
                    className="text-muted hover:text-muted-foreground p-[7px] rounded-full hover:bg-zinc-600"
                    >
                        <AiOutlineLike className="text-xl text-white" />
                    </button>
                    <button className="text-muted hover:text-muted-foreground ml-4 text-sm font-semibold rounded-full hover:bg-zinc-600 py-2 px-4">
                      Reply
                    </button>
                      </div>
                      </div>
                  </div>
  )
}

export default CommentContent