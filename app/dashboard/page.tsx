"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { userDetailsType } from '@/types/userDetails';
import { redirectIfNoToken } from '@/utils/logging';

const intial: userDetailsType = {
    id: '',
    email: '',
    username: '',
    password: '',
    classname: '',
    department: '',
    role: ''
}

function page() {
    const [user, setUser] = useState<userDetailsType>(intial);
    useEffect(() => {
        redirectIfNoToken()
        getUser(user, setUser)
        return () => {
            console.log(user)
        }
    }, [])


    return (
        <div>
            <h1>Admin ClassTable Creation</h1>
            {user &&
                <>
                    <div>{user.username}</div>
                    <div>{user.id}</div>
                    <div>{user.role}</div>
                    <div>{user.email}</div>
                    <div>{user.classname} Year</div>
                    <div>{user.department}</div>
                </>
            }
        </div>
    )
}

export default page


async function getUser(user: userDetailsType, setUser: any) {
    try {
        let res = await axios.get("/api/user/details");
        setUser(res.data)
    } catch (e) {
        console.log(e);
    }
}