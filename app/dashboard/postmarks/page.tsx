"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { userDetailsType } from '@/types/userDetails';
import { FirstCSI, FirstCSII, SecondCSI, SecondCSII, ThirdCSI, ThirdCSII } from '@/types/collegeTables';
import { ICSFirst, IICSFirst, ICSSecond, IICSSecond, ICSThird, IICSThird } from '@/utils/main';


function page() {
    const [users, setUser] = useState<Array<userDetailsType>>([]);
    let totalMarks: any = null;
    useEffect(() => {
        getStudents(users, setUser);
        totalMarks = getStudentMarks();
    }, []);
    console.log(totalMarks,"is working then fine")



    if (users.length === 1) {
        const thisSem = resolveSemesterType(users[0], "II");
        console.log(thisSem, "thisSem");
        return (
            <div>
                <h1 className=' text-red-600 text-2xl' draggable={true}>This page is used by Your Teachers Only</h1>
                {users && users.map((user) => (
                    <div key={user.id} className='w-max h-max flex bg-slate-200  flex-col shadow-2xl'>
                        <span className=' alert '> Student Name: <span className=' text-rose-600'>{user.username}</span></span>
                        <span className=' alert '> Student ID: <span className=' text-rose-600'>{user.id}</span></span>
                        <span className=' alert '> Student Email: <span className=' text-rose-600'>{user.email}</span></span>
                        <span className=' alert '> Student Branch: <span className=' text-rose-600'>{user.classname}</span></span>
                        <span className=' alert '> Student Semester: <span className=' text-rose-600'>{user.department}</span></span>
                        <span className=' alert '> User Role: <span className=' text-rose-600'>{user.role}</span></span>
                    </div>
                ))}
            </div>
        )
    }

    else {
        console.log(users[0], "users");
        const thisSem = resolveSemesterType(users[0], "II");
        console.log(thisSem, "thisSem");
        if (thisSem === null) {
            return <>Error Occured</>
        }
        return (
            <div>
                <h1 className=' text-teal-500  ' draggable={true}>You can Access this page </h1>
                <div className=' flex '>
                    {
                        Object.entries(thisSem!).map(([key, value]) => {
                            return (
                                <div key={key} className=' w-full bg-black text-white'>
                                    <span className='font-sans flex px-2 py-2 mx-0.5 rounded-md text-center bg-slate-700'>{key}</span>
                                </div>
                            )
                        })
                    }
                    {
                        
                    }
                </div>

                <div className="">
                    <h1></h1>

                </div>
                {users && users.map((user) => (
                    <div key={user.id} className='w-max h-max flex bg-slate-200 hover:bg-zinc-500'></div>
                ))}
            </div>
        )
    }
}

export default page

async function getStudents(user: Array<userDetailsType>, setUser: any) {
    try {
        const response = await axios.get('/api/marks/getstudentforteacher', {
        })
        setUser(response.data)
    } catch (error) {
        console.log(error)
    }
}


async function getStudentMarks() {
    const response = await axios.get('/api/marks/getsubjectsbyclass', {
    })
    console.log(response.data, "is wehee");
}

function resolveSemesterType(user: userDetailsType, semester: string) {

    if (user) {
        if (user.department === 'CS' && semester === "I" && user.classname === 'First') return ICSFirst;
        if (user.department === 'CS' && semester === "II" && user.classname === 'First') return IICSFirst;
        if (user.department === 'CS' && semester === "I" && user.classname === 'Second') return ICSSecond;
        if (user.department === 'CS' && semester === "II" && user.classname === 'Second') return IICSSecond;
        if (user.department === 'CS' && semester === "I" && user.classname === 'Third') return ICSThird;
        if (user.department === 'CS' && semester === "II" && user.classname === 'Third') return IICSThird;
    } else {
        return null;
    }
}
