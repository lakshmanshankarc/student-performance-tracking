"use client"
import React, { useState } from 'react'
import { loginDetailsType } from "@/types/userDetails"
import axios from "axios"

const inital: loginDetailsType = {
    email: '',
    password: ''
}

function Login() {
    const [user, setUser] = useState<loginDetailsType>(inital);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            let res = await axios.post("/api/user/remove", user)
        } catch (e) {
            alert("Unable to Perform Action")
        }
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} className=" w-full flex h-full py-44 flex-col bg-slate-300 justify-center items-center">
                    <h1 className=' font-sans font-extrabold text-3xl'>Remove User</h1>

                    <label htmlFor="email" className='font-extrabold font-sans'>Email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} className="input w-full max-w-xs" placeholder='enter email' />

                    <label htmlFor="password" className='font-extrabold font-sans'>Password</label>
                    <input type="password" name="password" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="input w-full max-w-xs" placeholder='enter password' />

                    <button type="submit" className='btn w-80 m-5'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login