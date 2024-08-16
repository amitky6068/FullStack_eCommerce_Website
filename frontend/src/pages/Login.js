import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    }

    return (
        <section id='login' className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Enter email'
                            value={data.email}
                            onChange={handleOnChange}
                            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='password'
                                placeholder='Enter password'
                                value={data.password}
                                onChange={handleOnChange}
                                className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 pr-10'
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <FaEyeSlash className='text-gray-500' /> : <FaEye className='text-gray-500' />}
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='block text-sm text-red-600 hover:underline text-right'>
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-all ease-in-out duration-300'
                    >
                        Login
                    </button>
                </form>

                <p className='mt-4 text-center text-sm'>
                    Don't have an account? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link>
                </p>
            </div>
        </section>
    )
}

export default Login
