"use client"
import React, { useState } from 'react'
import { userDetailsType } from '@/types/userDetails'
import axios from 'axios'
const intial: userDetailsType = {
  id: '',
  email: '',
  username: '',
  password: '',
  classname: '',
  department: '',
  role: ''

}
function Signup() {
  const [user, setUser] = useState<userDetailsType>(intial);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let res = await axios.post('/api/user/signup', user)
    console.log(res)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className=" w-full flex flex-col bg-slate-500">
        <h1>Sign Up Here</h1>
        <label htmlFor="id">UserID</label>
        <input type="text" name="id" id="id" onChange={(e) => setUser({ ...user, id: e.target.value })} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />

        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={(e) => setUser({ ...user, username: e.target.value })} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />

        <label htmlFor="class">Class</label>
        <input type="text" name="classname" id="class" onChange={(e) => setUser({ ...user, classname: e.target.value })} />

        <label htmlFor="department">Department</label>
        <input type="text" name="department" id="department" onChange={(e) => setUser({ ...user, department: e.target.value })} />

        <label htmlFor="role">Role</label>
        <input type="text" name="role" id="role" onChange={(e) => setUser({ ...user, role: e.target.value })} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Signup
