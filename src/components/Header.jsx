import React from 'react'
import {GoBell} from 'react-icons/go'

function Header() {
  return (
    <div className='flex justify-between items-center m-1 rounded-xl p-4 bg-[#286243] text-white'>
      <div className='p-2'>
        <h1 className='text-md'>Welcome Back!</h1>
        <p className='text-lg font-semibold'></p>
      </div>
      <div className='flex items-center space-x-5'>
        <div className='flex space-x-5 items-center'>
          <button className='relative text-2xl text-gray-600'>
            <GoBell size={26} color='white'/>
            <span className='absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-4 h-4 rounded-full'>9</span>
          </button>
          <img src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg' className='w-10 h-10 rounded-full border-2 border-indigo-400 cursor-pointer'/>
        </div>
        
      </div>

    </div>
  )
}

export default Header