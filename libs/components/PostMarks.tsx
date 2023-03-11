"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { userDetailsType } from "@/types/userDetails";
function PostMarks() {
    const [subjects, SetSubjects] = useState<Array<string>>([]);
    let [isStudent, SetStudent] = useState<boolean>(true);
    async function getTable() {
        const res = await axios.get("/api/marks/describe");
        // console.log(res.data);
        const sub = res.data.map((item: { Field: string }) => {
            return item.Field;
        });
        SetSubjects(sub);
        let localuser: any = JSON.parse(window.localStorage.getItem("user")!);
        if (localuser.role === "teacher") SetStudent(false);
    }
    useEffect(() => {
        getTable();
    }, []);

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        // const data = new FormData(e.currentTarget);
        // console.log(data);
    // };
    if (isStudent) return <> Study Hard to Get Good Grades</>;
    else {
        return (
            <div className=" w-full px-10 rounded-lg ">
                <h1 className=" text-4xl text-teal-400 font-extrabold py-10 text-center">
                    Post Marks
                </h1>
                <div className="flex bg-black px-1 rounded-lg">
                    {subjects &&
                        subjects.map((sub, index) => (
                            <div
                                key={index}
                                className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1 p-2 bg-zinc-600"
                            >
                                {sub.toUpperCase()}
                            </div>
                        ))}
                    <div className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1 p-2 bg-zinc-600">
                        Post
                    </div>
                </div>
                <form
                    method="post"
                    action="/api/marks/postmarks"
                    className="flex"
                >
                    {subjects &&
                        subjects.map((sub, index) => (
                            <div key={index} 
                            className="flex px-0.5 bg-zinc-100 ">
                                <input
                                    type="text"
                                    name={`${sub}`}
                                    id={`${sub}`}
                                    placeholder={`${sub}`}
                                    className="flex w-full h-10 rounded-lg justify-center items-center font-mono text-black m-0.5 px-1.5 bg-zinc-200"
                                />
                            </div>
                        ))}
                    <div className="flex w-max h-10 rounded-lg justify-center items-center font-mono text-slate-100 m-1.5 px-10 bg-zinc-600">
                        <input type="submit" value="submit" className="text-black"/>
                    </div>
                </form>

                <form action="" method="post"></form>
            </div>
        );
    }
}

export default PostMarks;
