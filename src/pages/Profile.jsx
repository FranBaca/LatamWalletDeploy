import React from 'react'
import { useSelector } from 'react-redux';
import UserAuth from './UserAuth';

export default function Profile() {
    const { user } = useSelector((state) => state.user);
  return (
   user ? (
    <div>
         <div className='bg-[#6528BD] w-screen mt-[80px] text-white shadow-sm p-4 flex flex-col justify-center items-center '>
            <img src="images/Group 51.svg" alt="User" className='rounded-full w-[150px]' />
         </div>
         <div className='flex flex-col w-50 m-5'>
         <div   >
            <label className='text-gray-500'>Nombre</label>
            <hr/>
            <span className='text-lg font-semibold'>{user.payload.user.firstName} {user.payload.user.lastName}</span>
         </div>
         <div>
            <label className='text-gray-500'>Email</label>
            <hr/>
            <span className='text-lg font-semibold'>{user.payload.user.email}</span>
         </div>
         <div>
            <label className='text-gray-500'>ID</label>
            <hr/>
            <span className='text-lg font-semibold'>{user.payload.user.id}</span>
         </div>
         <div>
            <label className='text-gray-500'>Country</label>
            <hr/>
            <span className='text-lg font-semibold'>{user.payload.user.country}</span>
         </div>
         </div>
    </div>
   )  : <UserAuth/>
  )
}
