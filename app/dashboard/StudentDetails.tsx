"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { userDetailsType } from '@/types/userDetails';

const intial: Array<userDetailsType> = [{
    id: "",
    email: "",
    username: "",
    password: "",
    classname: "",
    department: "",
    role: "",
    tablename: "",
}]
function StudentDetails() {
    const [user, setUser] = useState<Array<userDetailsType>>(intial);
    useEffect(() => {
        getStudents(user, setUser);
    }, []);

    return (
        <div className=' flex justify-center items-center flex-col'>
            <h1 className=' text-5xl font-extrabold text-red-500'>Student Details</h1>
            <div className='w-max h-max flex bg-slate-200'>
                <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>Username</span>
                <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>email</span>
                <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>RollNo</span>
                <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>Class</span>
                <span className='w-96 m-0.5 border-2 bg-slate-800 text-white rounded-md flex justify-center items-center px-1 py-2'>Department</span>
            </div>
            {user && user.map((user) => (
                <div key={user.id} className='w-max h-max flex bg-slate-200 hover:bg-zinc-500'>
                    <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.username}</span>
                    <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.email}</span>
                    <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.id}</span>
                    <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.classname}</span>
                    <span className='w-96 hover:transition-all m-0.5 border-2 bg-slate-50 rounded-md flex justify-center items-center px-1 py-2'>{user.department}</span>
                </div>
            ))}
        </div>
    )
}

export default StudentDetails


async function getStudents(user: Array<userDetailsType>, setUser: any) {
    try {
        const response = await axios.get('/api/marks/getstudentforteacher', {
        })
        setUser(response.data);
    } catch (error) {
        console.log(error)
    }
}
