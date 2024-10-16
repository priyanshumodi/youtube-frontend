import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils/ResponseMessage';
import { useSelector } from 'react-redux';
import Loader from './shared/Loader';

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
    useEffect(() => {
        if(isAuthenticated) {
            navigate('/app')
        }
    },[isAuthenticated])

    const [signupInfo, setSignupInfo] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: null,
        coverImage: null
    })

    const handleChange = (event) => {
        const {name, value, files} = event.target;

        // Handle text input fields (fullName, username, email, password)
        if(name!= 'avatar' && name!= 'coverImage') {
            setSignupInfo({ ...signupInfo, [name]:value })
            return;
        }

        // Handle file uploads (avatar and coverImage)
        const file = files[0]

        if(!file || !file.type.startsWith('image/')) {
            return handleError('Please select a valid image file.')
        }

        setSignupInfo({ ...signupInfo , [name]:file })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const {fullName, username, email, password, confirmPassword, avatar, coverImage} = signupInfo;
        console.log(signupInfo)

        if(!fullName.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !avatar) {
            return handleError("All fields are required")
        }

        if(password !== confirmPassword) {
            return handleError("password should be same")
        }

        const formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', avatar)
        formData.append('coverImage', coverImage)

        try {
            const response = await axios.post('https://youtube-backend-rw43.onrender.com/api/v1/users/register',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('API Response:', response);
            setSignupInfo({
                fullName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                avatar: null,
                coverImage: null
            })
            setLoading(false)
            return handleSuccess("successfully Login")
        } catch (error) {
            setLoading(false)
            return handleError("Something went wrong")
        }

    }
    
    return (
    <>
        {loading && <Loader />}
    <section className="bg-gray-50 h-auto">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 md:h-auto sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label 
                        htmlFor="fullName" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your Name
                        </label>
                        <input 
                        type="text" 
                        name="fullName" 
                        id="fullName" 
                        onChange={handleChange}
                        value={signupInfo.fullName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Full Name" 
                        required={true} 
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="username" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Username
                        </label>
                        <input 
                        type="text" 
                        name="username" 
                        id="username"
                        onChange={handleChange}
                        value={signupInfo.username}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="username" 
                        required={true} 
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="email" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        onChange={handleChange}
                        value={signupInfo.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name@company.com" 
                        required={true}
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="password" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="••••••••" 
                        onChange={handleChange}
                        value={signupInfo.password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required={true} 
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="confirmPassword" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Confirm password
                        </label>
                        <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="••••••••" 
                        onChange={handleChange}
                        value={signupInfo.confirmPassword}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required={true}
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="avatar" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Avatar
                        </label>
                        <input 
                        type="file" 
                        name="avatar" 
                        id="avatar" 
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required={true}
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="covarImage" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Cover Image
                        </label>
                        <input 
                        type="file" 
                        name="covarImage" 
                        id="covarImage"  
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
                    {loading ? "creating..." : "Create an account"}
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? 
                        <Link 
                        to="/user/login" 
                        className="font-medium text-amber-600 hover:underline dark:text-primary-500"
                        >
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
    <ToastContainer />
    </section>
    </>
    )
}

export default Signup