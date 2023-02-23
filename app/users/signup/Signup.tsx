"use client"
import React, { useState } from 'react'
import { userDetailsType } from '@/types/userDetails'
import axios from 'axios'
const intial: userDetailsType = {
  id: '',
  email: '',
  username: '',
  password: '',
  classname: 'I',
  department: 'CS',
  role: 'student'

}
function Signup() {
  const [user, setUser] = useState<userDetailsType>(intial);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let res = await axios.post('/api/user/signup', user)
      alert("User Created Successfully");
    } catch (e) {
      alert("Unable to create User");
    }
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
        <select name="classname" id="class" onChange={(e) => setUser({ ...user, classname: e.target.value })} defaultValue="I">
          <option value="First">I</option>
          <option value="Second">II</option>
          <option value="Third">III</option>
        </select>
        {/* <input type="text" name="classname" id="class" onChange={(e) => setUser({ ...user, classname: e.target.value })} /> */}

        <label htmlFor="department">Department</label>
        <select name="department" id="class" onChange={(e) => setUser({ ...user, department: e.target.value })} defaultValue="CS">
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          {/* <option value="DA">III</option> */}
        </select>
        {/* <input type="text" name="department" id="department" onChange={(e) => setUser({ ...user, department: e.target.value })} /> */}

        <label htmlFor="role">Role</label>
        <select name="role" id="class" onChange={(e) => setUser({ ...user, role: e.target.value })} defaultValue="student">
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Signup
