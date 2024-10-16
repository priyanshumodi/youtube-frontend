import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUpdateComment } from '../../features/hooks/hookSlice'
import { toggleLoading } from '../../features/hooks/hookSlice'
import axios from 'axios'

const UpdateComment = ({comment}) => {
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState(comment?.comment?.content)
    const [isActiveComment, setIsActiveComment] = useState(false);

    const handleCommentChange = (e) => {
        const newComment = e.target.value
        setNewComment(newComment)
    }

    const handleCancel = () => {
        dispatch(addUpdateComment(''))
    }

    const handleSubmit = async () => {
        dispatch(toggleLoading())
  
        try {
          const result = await axios.patch(`https://youtube-backend-rw43.onrender.com/api/v1/comments/c/${comment?.comment?._id}`,{newComment})
          console.log(result)
          dispatch(addUpdateComment(''))
          dispatch(toggleLoading())
        } catch (error) {
          dispatch(toggleLoading())
          console.log(error)
        }
      }

      useEffect(() => {
        if(newComment.trim() === '' || newComment === comment?.comment?.content) {
          setIsActiveComment(false)
        } else {
          setIsActiveComment(true)
        }
      }, [newComment])
  return (
              <div className="flex items-center mt-4 mb-4">
                <img src="http://res.cloudinary.com/priyanshu7/image/upload/v1720862753/zl04rns9qldmgod53acf.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4 object-cover" />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onChange={handleCommentChange}
                  name='comment'
                  value={newComment}
                  className="flex-grow p-2 border border-border text-white rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring bg-black"
                />
                <div className='flex flex-col sm:flex-row'>
                    <button onClick={handleCancel} className="ml-2 text-white hover:text-muted px-4 py-2 rounded-3xl hover:bg-white/[0.20]">Cancel</button>
                    <button onClick={()=> (isActiveComment && handleSubmit())} className={`ml-4 ${isActiveComment ? "text-black bg-blue-500" : "bg-white/[0.15] text-zinc-400"} hover:bg-primary/80 px-4 py-2 rounded-3xl font-medium`}>Save</button>
                </div>
              </div>
  )
}

export default UpdateComment