import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className='min-h-[calc(100vh-120px)] p-4'>
      <div className='bg-white shadow-md rounded-lg p-4'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-800 text-white'>
              <th className='py-2 px-4 border-b'>Sr.</th>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Email</th>
              <th className='py-2 px-4 border-b'>Role</th>
              <th className='py-2 px-4 border-b'>Created Date</th>
              <th className='py-2 px-4 border-b'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allUser.map((el, index) => (
                <tr key={el._id} className='even:bg-gray-100'>
                  <td className='py-2 px-4 border-b'>{index + 1}</td>
                  <td className='py-2 px-4 border-b'>{el?.name}</td>
                  <td className='py-2 px-4 border-b'>{el?.email}</td>
                  <td className='py-2 px-4 border-b'>{el?.role}</td>
                  <td className='py-2 px-4 border-b'>{moment(el?.createdAt).format('LL')}</td>
                  <td className='py-2 px-4 border-b text-center'>
                    <button
                      className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-600 hover:text-white transition-all'
                      onClick={() => {
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {
        openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers
