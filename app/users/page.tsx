import React from 'react'
import Link from 'next/link'
function page() {
  return (
    <div>
      <h1>User Page</h1>
     <Link  className='w-max px-10 py-10 bg-teal-500 text-xl font-mono font-extrabold  flex justify-center rounded-lg' href={"/users/signup"}>Sign Up</Link>
     <Link className=' w-max p-10 bg-teal-500 text-xl font-mono font-extrabold flex justify-center rounded-lg'href={"/users/login"}>Login</Link>

    </div>
  )
}

export default page
