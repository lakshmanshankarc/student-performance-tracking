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
      window.localStorage.setItem("user", res.data.user)
      SetCookie('token', res.data.token, { path: '/' });
    } catch (e) {
      alert("Unable to login user")
    }
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className=" w-full flex flex-col bg-slate-500">
          <h1>Login Componnet</h1>

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
