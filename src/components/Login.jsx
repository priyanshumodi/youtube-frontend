import React, {useEffect, useState} from 'react'
import axios from "axios"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils/ResponseMessage';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/auth/userSlice';
import { useSelector } from 'react-redux';
import Loader from './shared/Loader';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
    useEffect(() => {
        if(isAuthenticated) {
            navigate('/app')
        }
    },[isAuthenticated])
    const navigate = useNavigate()

    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        return handleError(location.state?.message)
    },[])
 
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        // console.log(name, value)
        const currentInfo = {...loginInfo}
        currentInfo[name] = value
        setLoginInfo(currentInfo)
    }

    const loginHandle = async (e) => {
        e.preventDefault()
        setLoading(true)
        const {email, password} = loginInfo;
        // console.log(email, password)
        if(!email.trim() || !password.trim()) {
            return handleError("email or password are required")
        }
        
        try {
            const response = await axios.post(`/api/v1/users/login`,loginInfo)
            const result = response.data
            // console.log('API Response:', result);
            if(result.success) {
                handleSuccess("successfully Login")
                dispatch(addUser(result.data.user))
                
                setTimeout(() => {
                    navigate('/app')
                }, 1000)

                setLoginInfo({
                    email: '',
                    password: ''
                })
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return handleError("invalid user or password",error)
        }

    }

    return (
        <>
        {loading && <Loader />}
        <section className="bg-gray-50 h-[calc(100%-56px)]">
    <div className="flex flex-col items-center  justify-center px-6 py-8 mx-auto md:h-auto mt-10 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={loginHandle}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500" 
                        placeholder="name@company.com" 
                        required={true} 
                        value={loginInfo.email}
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                         required={true}  
                         value={loginInfo.password}
                         />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input 
                              id="remember" 
                              aria-describedby="remember" 
                              type="checkbox" 
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700
                              dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label 
                              htmlFor="remember" 
                              className="text-gray-500 dark:text-gray-300"
                              >
                              Remember me
                              </label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-amber-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-amber-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        {loading ? "Sign in..." : "Sign in"}
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? 
                        <Link 
                        to="/user/signup" 
                        className="font-medium text-amber-600 hover:underline dark:text-primary-500"
                        >
                            Sign up
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

export default Login