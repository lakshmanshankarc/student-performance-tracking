"use client"
import React, { useState } from 'react'
import { userDetailsType } from '@/types/userDetails'
import axios from 'axios'
const intial: userDetailsType = {
  id: '',
  email: '',
  username: '',
  password: '',
  classname: 'First',
  department: 'CS',
  role: 'student',
  tablename:'FirstCSI'
}
function Signup() {
  const [user, setUser] = useState<userDetailsType>(intial);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      user.tablename = user.classname + user.department + "II";
      let res = await axios.post('/api/user/signup', user)
      alert(res.data.message)
    } catch (e) {
      alert("Unable to create User");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className=" w-full flex h-screen py-44 flex-col circle-grad justify-center items-center">
        <h1 className=' font-sans font-extrabold text-3xl'>Sign Up Here</h1>
        <label htmlFor="id" className='font-extrabold font-sans'>UserID</label>
        <input type="text" placeholder="Type here" className="input w-full max-w-xl" name="id" id="id" onChange={(e) => setUser({ ...user, id: e.target.value })} required={true}/>

        <label htmlFor="email" className='font-extrabold font-sans'>Email</label>
        <input type="email" name="email" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} className="input w-full  max-w-xl" placeholder='enter email'required={true} />

        <label htmlFor="username" className='font-extrabold font-sans'>Username</label>
        <input type="text" name="username" id="username" onChange={(e) => setUser({ ...user, username: e.target.value })} className="input w-full  max-w-xl" placeholder='enter name' required={true} />

        <label htmlFor="password" className='font-extrabold font-sans'>Password</label>
        <input type="password" name="password" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="input w-full max-w-xl" placeholder='enter password' required={true} />

        <label htmlFor="class" className='font-extrabold font-sans'>Class</label>
        <select name="classname" id="class" onChange={(e) => setUser({ ...user, classname: e.target.value })} defaultValue="I" className="select w-full  max-w-xl" required={true}>
          <option value="First">I</option>
          <option value="Second">II</option>
          <option value="Third">III</option>
        </select>
        {/* <input type="text" name="classname" id="class" onChange={(e) => setUser({ ...user, classname: e.target.value })} /> */}

        <label htmlFor="department" className='font-extrabold font-sans'>Department</label>
        <select name="department" id="class" onChange={(e) => setUser({ ...user, department: e.target.value })} defaultValue="CS" className="select w-full  max-w-xl">
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          {/* <option value="DA">III</option> */}
        </select>
        {/* <input type="text" name="department" id="department" onChange={(e) => setUser({ ...user, department: e.target.value })} /> */}

        <label htmlFor="role" className='font-extrabold font-sans'>Role</label>
        <select name="role" id="class" onChange={(e) => setUser({ ...user, role: e.target.value })} defaultValue="student" className="select w-full  max-w-xl">
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>

        <button type="submit" className='btn w-full max-w-xl m-5 bg-fuchsia-500 border-0'>Submit</button>
      </form>
    </div>
  )
}

export default Signup
