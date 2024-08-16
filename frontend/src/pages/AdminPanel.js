import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [user])

    return (
        <div className='min-h-[calc(100vh-120px)] flex  md:flex'>
            <aside className='bg-white min-h-full w-full max-w-xs shadow-md rounded-lg'>
                <div className='h-36 flex flex-col justify-center items-center p-4'>
                    <div className='text-5xl cursor-pointer relative'>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className='w-24 h-24 rounded-full' alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-xl font-semibold mt-2'>{user?.name}</p>
                    <p className='text-md'>{user?.role}</p>
                </div>

                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-4 py-2 text-lg rounded-lg hover:bg-red-100 transition-colors'>All Users</Link>
                    <Link to={"all-products"} className='px-4 py-2 text-lg rounded-lg hover:bg-red-100 transition-colors'>All Products</Link>
                </nav>
            </aside>

            <main className='w-full h-full p-4'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel
