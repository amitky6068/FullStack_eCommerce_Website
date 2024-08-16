import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from 'react-icons/io';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message || 'Failed to update user role');
            }
        } catch (error) {
            toast.error('An error occurred while updating the user role');
            console.error('Error updating user role:', error);
        }
    };

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-slate-200 bg-opacity-50'>
            <div className='bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='absolute top-2 right-2' onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className='text-lg font-medium mb-4'>Change User Role</h1>
                <p className='mb-2'>Name: {name}</p>
                <p className='mb-4'>Email: {email}</p>

                <div className='flex items-center justify-between mb-4'>
                    <p className='mr-2'>Role:</p>
                    <select
                        className='border px-4 py-1 rounded'
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(ROLE).map((roleOption) => (
                            <option value={roleOption} key={roleOption}>
                                {roleOption}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className='w-full py-2 px-4 rounded-full bg-red-600 text-white hover:bg-red-700'
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
