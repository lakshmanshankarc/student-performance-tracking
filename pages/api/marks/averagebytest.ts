import { NextApiRequest,NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
import { createPool } from "mysql2";
import { verify } from "jsonwebtoken";
import { userDetailsType } from "@/types/userDetails";
import { log } from "console";
export default async (req:NextApiRequest,res:NextApiResponse)=>{
 const { token } = req.cookies;
    if (!token) res.status(400).json("You must login to see the details");
    else {
        verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
            const pool = createPool(ConnectionObject);
            if (err)
                return res.status(401).json({ message: "You are not logged in" });
            else {
                const { user }: { user: userDetailsType } = decoded as any; 
                const {limit,subject}=req.query;
                if (user.role === "teacher" || user.role === "admin") {
                    const q = `SELECT * FROM ${user.tablename} ORDER BY CAST(${subject} AS DECIMAL(10,2)) DESC LIMIT ${limit}`;
                    // const avg=`SELECT AVG(CAST(${subject} AS DECIMAL(10,2))) FROM ${user.tablename} where testname="CIA-1"`;
                    pool.query(q, (err, results) => {
                        if (err) res.status(500).json('Internal Server Error')
                        else{
                            res.status(200).json(results)
                        }
                    }); 
                    // res.status(200).json('Hello')
                } else if (user.role === "student") {
                    const q = `SELECT * FROM ${user.tablename} where id = "${user.id}"`;
                    log(q)
                    res.status(200).json('Internal Error')
                }
            }
        });
    }

}
