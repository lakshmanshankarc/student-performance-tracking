"use client"
import React, { useEffect } from 'react'
import axios from "axios"
function page() {
    useEffect(() => {
        async function getUrl() {
            let res = await axios.get('/api/user/adminpage', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(res);
        }
        getUrl()
    }, [])
    return (
        <div>Users Requset</div>
    )
}

export default page