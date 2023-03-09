"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { userDetailsType } from '@/types/userDetails';
import { FirstCSI,FirstCSII,SecondCSI,SecondCSII,ThirdCSI,ThirdCSII } from '@/types/collegeTables';

function StudentDetails() {
    const [user, setUser] = useState<Array<userDetailsType>>([]);
    useEffect(() => {
        getStudents(user, setUser);
    }, []);
    console.log(user)
    return (
        <>
            <div className="flex flex-col">
                
            </div>
        </>
    )
}

export default StudentDetails


async function getStudents(user: Array<userDetailsType>, setUser: any) {
    try {
        const response = await axios.get('/api/marks/getStudentForTeacher', {
        })
        setUser(response.data)
        console.log(response.data, "response");
    } catch (error) {
        console.log(error)
    }
}
