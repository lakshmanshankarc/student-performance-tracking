"use client"
import React, { useState } from 'react'
import { loginDetailsType } from "@/types/userDetails"
import axios from "axios"
import { useCookies } from 'react-cookie'

const inital: loginDetailsType = {
  email: '',
  password: ''
}

function Login() {
  const [user, setUser] = useState<loginDetailsType>(inital);
  const [cookie, SetCookie] = useCookies(["token"])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let res = await axios.post("/api/user/login", user)
      window.localStorage.setItem("user", JSON.stringify(res.data.user))
      SetCookie('token', res.data.token, { path: '/' });
      alert("User logged In Successfull")
      window.location.href = "/dashboard";
    } catch (e) {
      alert("Unable to login user" + e)
    }
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className=" w-full flex h-screen py-44 flex-col  justify-center items-center circle-two">
          <h1 className=' font-sans font-extrabold text-4xl'>Login Page</h1>

          <label htmlFor="email" className='font-extrabold font-sans'>Email</label>
          <input type="email" name="email" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} className="input w-full max-w-xl" placeholder='enter email' />

          <label htmlFor="password" className='font-extrabold font-sans'>Password</label>
          <input type="password" name="password" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="input w-full max-w-xl" placeholder='enter password' />

          <button type="submit" className='btn w-full max-w-xl m-5 bg-indigo-600 border-0'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
