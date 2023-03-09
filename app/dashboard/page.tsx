"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { userDetailsType } from "@/types/userDetails";
import StudentDetails from "./StudentDetails";
import { redirect } from "next/dist/server/api-utils";

const intial: userDetailsType = {
    id: "",
    email: "",
    username: "",
    password: "",
    classname: "",
    department: "",
    role: "",
};

function Navbar() {
    const [user, setUser] = useState<userDetailsType>(intial);
    useEffect(() => {
        redirectIfNoToken()
        getUser(user, setUser);
        randomColor();
        return () => {
            console.log(user);
        };
    }, []);

    return (
        <div className=" w-full h-14 ">
            <div className="navbar  h-14 bg-gray-900 text-white">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl hover:bg-transparent">Performance Tracking</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>{user && (
                            <>
                                <ProfileCard user={user} />
                            </>
                        )}</li>
                        <li className=" mx-2"><a>details</a></li>
                        <li tabIndex={0}>
                            <a>
                                Marks
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </a>
                            <ul className="p-2 bg-black text-white">
                                <li className=" hover:bg-slate-600 rounded-lg"><a>Post/get</a></li>
                                <li className=" hover:bg-slate-600 rounded-lg"><a>Analytics</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Main Student Table for Teachers */}
            <StudentDetails />
        </div>
    );
}
export default Navbar;

export async function getUser(user: userDetailsType, setUser: any) {
    try {
        let res = await axios.get("/api/user/details");
        setUser(res.data);
    } catch (e) {
        console.log(e);
    }
}


function signout() {
    window.localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/users/login";
}

function ProfileCard({ user }: { user: userDetailsType }): JSX.Element {
    return (
        <div className=" px-1 m-1 rounded-lg bg-gray-900 text-white">
            <div className="dropdown dropdown-hover m-0 p-0 h-max bg-gray-900 text-white">
                <div className="avatar placeholder">
                    <div className="text-neutral-content rounded-full w-10 m-0 p-0 " id="avatar">
                        <span>
                            {`${user.username[0] + user.username[1]}`.toUpperCase()}
                        </span>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow  rounded-box w-64 flex flex-col px-2 bg-gray-900 overflow-visible text-white">
                    <li className=" hover:bg-zinc-600  rounded-lg mr-12"><a>Name:<b>{user.username}</b></a></li>
                    <li className=" hover:bg-zinc-600  rounded-lg mr-12"><a>Email:<b>{user.email}</b></a></li>
                    <li className=" hover:bg-zinc-600  rounded-lg mr-12"><a>Role:<b>{user.role}</b></a></li>
                    <li className=" hover:bg-zinc-600  rounded-lg mr-12"><a>Class:<b>{user.classname}</b></a></li>
                    <li className=" hover:bg-zinc-600  rounded-lg mr-12"><a>Dept:<b>{user.department}</b></a></li>
                    <button
                        className="btn btn-ghost normal-case w-full text-xl hover:bg-zinc-600"
                        onClick={() => signout()}
                    >
                        Signout
                    </button>
                </ul>
            </div>
        </div>
    );
}


// write a functoin to generate random rgb color to the avatar and set it to id avatar
function randomColor() {
    const o = Math.round, r = Math.random, s = 255;
    var dom = document.getElementById("avatar")
    if (dom) {
        dom.style.backgroundColor = "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
    } else {
        console.log("dom not found");
    }
}


export async function redirectIfNoToken() {
    let res = await axios.get("http://localhost:3000/api/user/islogged")
    if (res.data.redirect) {
        window.location.href = "/users/login"
    }

}