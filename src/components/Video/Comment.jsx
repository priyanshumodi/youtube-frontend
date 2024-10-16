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
import UpdateComment from './UpdateComment';
import { addUpdateComment } from '../../features/hooks/hookSlice';
import { Link } from 'react-router-dom';

const Comment = ({video}) => {
    const dispatch = useDispatch()
  
    const user = useSelector(state => state.userReducer.user)

    const [isActiveComment, setIsActiveComment] = useState(false);
    const [comment, setComment] = useState('')
    const [videoComment, setVideoComment] = useState([])
    const updateComment = useSelector(state => state.hookReducer.updateComment)
    const [like, setLike] = useState(0)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
      fetchDataForVideoComments()
      fetchCommentLike()
    }, [video, updateComment])

    const fetchDataForVideoComments = async () => {
      const options = {
        params: {
          page: 1,
          limit: 10,
        },
      }
      
      const result = await fetchDataFromApi(`comments/${video?._id}`,options);
      // console.log(result)
      setVideoComment(result)
    }

    useEffect(() => {
        if(comment.trim() === '') {
          setIsActiveComment(false)
        } else {
          setIsActiveComment(true)
        }
      }, [comment])
    
    const handleCommentChange = (e) => {
        const newComment = e.target.value
        setComment(newComment)
      }

    const handleSubmit = async () => {
      dispatch(toggleLoading())

      try {
        const result = await axios.post(`https://youtube-backend-rw43.onrender.com/api/v1/comments/${video?._id}`,{comment})
        console.log(result)
        dispatch(toggleLoading())
        dispatch(addUpdateComment(`new${updateComment}`))
        setComment('')
      } catch (error) {
        console.log(error)
      }
    }

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
      setLike(result?.[0]?.totalLikes)
      setLiked(result?.[0]?.isLiked)
    }

    const handleToggleCommentLike = async() => {
      d
    }

  return (
    <div>
        {/* add comment */}
        <div className="bg-card p-4 rounded-lg shadow-md dark:shadow-lg">
              <h2 className="text-lg font-semibold text-white">{videoComment?.length} Comments</h2>
              <div className="flex items-center mt-4">
                <img src={user?.avatar} alt="User Avatar" className="w-11 h-11 rounded-full mr-4 object-cover" />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onChange={handleCommentChange}
                  name='comment'
                  value={comment}
                  className="flex-grow p-2 border border-border text-white rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring bg-black"
                />
                <div className='flex flex-col sm:flex-row'>
                    <button className="ml-2 text-white hover:text-muted px-4 py-2 rounded-3xl hover:bg-white/[0.20]">Cancel</button>
                    <button className={`ml-4 ${isActiveComment ? "text-black bg-customBlue" : "bg-white/[0.15] text-zinc-400"} hover:bg-primary/80 px-4 py-2 rounded-3xl font-medium`} onClick={()=> (isActiveComment && handleSubmit())}>Comment</button>
                </div>
              </div>
              {/* <div className="flex justify-between items-center mt-4">
                <span className="text-muted-foreground dark:text-muted-foreground">Sort by</span>
                <button className="text-muted-foreground hover:text-muted-foreground/80 dark:text-muted-foreground dark:hover:text-muted-foreground/80">Sort Options</button>
              </div> */}
        </div>
          {/* all comments of video */}
          <div className="bg-background p-4 rounded-lg shadow-md mt-3">
            <ol>
              {videoComment?.map((item) => {
                // {fetchCommentLike(item?.comment?._id)} //check kr bhai
              return (
              <li key={item?.comment?._id}>
                {(item?.comment?._id !== updateComment) ?
                (
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
                ) : (
                  <UpdateComment comment={item}/>
                )}
              </li> )
              })}
            </ol>
          </div>
    </div>
  )
}

export default Comment