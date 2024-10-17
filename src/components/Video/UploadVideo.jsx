import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { toggleLoading } from '../../features/hooks/hookSlice';
import { handleError } from '../utils/ResponseMessage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
    const [loading, setLoading] = useState(useSelector(state => state.hookReducer.loading))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [upload, setUpload] = useState({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null
    })

    const handleChange = (event) => {
        const {name, value, files} = event.target;
        // console.log(event.target.value)

        if(name!='videoFile' && name!='thumbnail') {
            setUpload({...upload, [name]:value})
            return;
        }

        const file = files[0]

        if(!file || (!file.type.startsWith('video/') && name === 'videoFile')) {
            return handleError('Please select a valid video file.')
        }

        if(!file || (!file.type.startsWith('image/') && name === 'thumbnail')) {
            return handleError('Please select a valid image file.')
        }

        setUpload({ ...upload , [name]:file })
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        dispatch(toggleLoading());

        if(!upload.title.trim() || !upload.description.trim()) {
            return handleError("All fields are required")
        }

        const formData = new FormData()
        formData.append('title', upload.title)
        formData.append('description', upload.description)
        formData.append('videoFile', upload.videoFile)
        formData.append('thumbnail', upload.thumbnail)

        try {
            const response = await axios.post('/api/v1/videos',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('API Response:', response);
            setUpload({
                title: '',
                description: '',
                videoFile: null,
                thumbnail: null
            })
            dispatch(toggleLoading());
            navigate('/app')
        } catch (error) {
            dispatch(toggleLoading());
            return handleError("Something went wrong")
        }
    }
  return (
    <>
    <section className="bg-black h-auto mt-0">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border mt-0 md:h-auto sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-2 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Upload Video
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label 
                        htmlFor="title" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Title
                        </label>
                        <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        onChange={handleChange}
                        value={upload.title}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Title" 
                        required={true} 
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="description" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <input 
                        type="text" 
                        name="description" 
                        id="description"
                        onChange={handleChange}
                        value={upload.description}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="description" 
                        required={true} 
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="videoFile" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            VideoFile
                        </label>
                        <input 
                        type="file" 
                        name="videoFile" 
                        id="videoFile" 
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required={true}
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="thumbnail" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Thumbnail
                        </label>
                        <input 
                        type="file" 
                        name="thumbnail" 
                        id="thumbnail"  
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input 
                          id="terms" 
                          aria-describedby="terms" 
                          type="checkbox" 
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 
                          dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label 
                          htmlFor="terms" 
                          className="font-light text-gray-500 dark:text-gray-300"
                          >
                            I accept the 
                            <a className="font-medium text-blue-600 hover:underline dark:text-amber-600" href="#">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-amber-600 text-white hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    {loading ? "uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    </div>
    <ToastContainer />
    </section>
    </>
  )
}

export default UploadVideo