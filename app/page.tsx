
import React from 'react'
import Link from 'next/link'
export default function Home() {
  return (
    <div className=' w-full h-screen flex justify-center items-center flex-col'>
      <p className=' text-2xl text-fuchsia-500'>Welcome to</p>
      <h1 className=' text-7xl font-extrabold '> Student Performance Tracking application</h1>
      <p className=' text-2xl text-purple-700'>Please login to continue</p>
      <div className="">
        <Link href="/users/login" >
          <p className='text-2xl py-2 px-44 hover:bg-slate-200 hover:border-dashed rounded-lg hover:transition-all bg-fuchsia-500 justify-center items-center'>Login</p>
        </Link>
      </div>
    </div>
  )
}
