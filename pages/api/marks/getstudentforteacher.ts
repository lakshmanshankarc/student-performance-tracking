import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
import { createPool } from "mysql2/promise";
import { verify } from "jsonwebtoken";
import { userDetailsType } from "@/types/userDetails";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { token } = req.cookies;
    if (!token) res.status(400).json("You must login to see the details")
    else {
        verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
            const pool = createPool(ConnectionObject);
            if (err) return res.status(401).json({ message: "You are not logged in" });
            else {
                const { user }: { user: userDetailsType } = decoded as any;
                if (user.role === "teacher" || user.role === "admin") {
                    const [rows, fields] = await pool.query(`SELECT * FROM Userdetails WHERE classname = "${user.classname}" and role = "student"`);
                    res.status(200).json(rows);
                }
                else {
                    const [rows, fields] = await pool.query(`SELECT * FROM Userdetails WHERE classname = "${user.classname}" and role = "student" and id = "${user.id}"`);
                    res.status(200).json(rows);
                }
            }
        })
    }
}
