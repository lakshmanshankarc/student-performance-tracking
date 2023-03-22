"use client";
import axios from "axios";
import {
    firstCSI,
    firstCSII,
    secondCSI,
    secondCSII,
    thirdCSI,
    thirdCSII,
} from "@/types/collegeTables";
// import { FirstCSI, FirstCSII, SecondCSI, Sec:ondCSII, ThirdCSI, ThirdCSII, resolveTableName } from '@/utils/main'
import React, { useState, useEffect } from "react";
import Link from "next/link";


const initalTestname = ['CIA-I', 'CIA-II', 'MODEL']
function GetMarks() {
    const [Markstable, setMarkstable] = useState<
        | firstCSI[]
        | firstCSII[]
        | secondCSI[]
        | secondCSII[]
        | thirdCSI[]
        | thirdCSII[]
    >([]);
    const [order, setOrder] = useState<string>('testname');
    const [testname, SetTestname] = useState<string>('CIA-I')
    useEffect(() => {
        getStudents();
    }, [order]);

    async function getStudents() {
        try {
            const response = await axios.get("/api/marks/getstudentmarks", {
                params: {
                    orderby: order,
                }
            });
            setMarkstable(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOrder = (e: any) => {
        setOrder(e.target.value);
        getStudents();
    }
    return (
        <div className=" px-10 rounded-lg">
            <>
                <LinkToOthers />
                <h1 className="w-full text-4xl text-fuchsia-500 px-2 py-5 text-center font-extrabold ">Student Marks Page</h1>
                <div className="flex font-sans py-5 w-max items-center" >
                    <h2 className="w-full px-4 text-orange-500 font-extrabold text-2xl">Order By</h2>
                    <select defaultValue={'testname'} onChange={handleOrder} className=" px-10 py-4 font-extrabold font-sans text-orange-400 rounded-md text-2xl">
                        <option value={'testname'}>TestName</option>
                        <option value={'id'}>Id</option>
                    </select>
                </div>

                {Markstable.map((item, index) => {
                    if (index === 0) {
                        return (
                            <div key={index} className="flex bg-black">
                                {Object.keys(item).map((key, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1 p-1.5 bg-zinc-900 hover:bg-gray-800"
                                        >
                                            {key.toUpperCase()}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }
                })}
            </>
            {Markstable.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="flex bg-zinc-200 hover:transition-all hover:bg-fuchsia-400 p-1"
                    >
                        {Object.keys(item).map((key, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex w-full h-10 rounded-lg justify-center items-center font-mono  m-0.5 p-1.5 bg-zinc-50 hover:bg-fuchsia-200"
                                >
                                    {/* @ts-ignore */}
                                    {item[key]}
                                    {/* Sorry Typescript But I don't know how to figure this out */}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default GetMarks;


export const LinkToOthers = () => {
    return (
        <div className="links flex text-lg font-normal  h-14 bg-slate-900 text-white items-center px-10">
            <h1>Student Marks Page</h1>
            <Link className="mx-5 p-2 bg-slate-700 rounded-md" href="/dashboard">
                Dashboard
            </Link>
            <Link
                className="mx-5 p-2 bg-slate-700 rounded-md"
                href="/dashboard/analytics"
            >
                Analytics
            </Link>
        </div>
    )
}