import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
// import { createPool } from "mysql2/promise";
import { createPool } from "mysql2";
import { verify } from "jsonwebtoken";
import { userDetailsType } from "@/types/userDetails";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { token } = req.cookies;

    if (method === "POST") {
        if (!token) res.status(400).json("You must login to see the details");
        else {
            verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
                const pool = createPool(ConnectionObject);
                if (err)
                    return res.status(401).json({ message: "You are not logged in" });
                else {
                    const { user }: { user: userDetailsType } = decoded as any;
                    if (user.role === "teacher" || user.role === "admin") {
                        const body = req.body;
                        let marks: Array<string> = [];
                        Object.keys(body).forEach((key) => {
                            console.log(key);
                            marks.push(`"${body[key]}"`);
                        });
                        const qm = marks.toString();
                        const q = `INSERT INTO ${user.tablename} VALUES(${qm})`;
                        const response = pool.query(q, (err, results) => {
                            if (err) res.status(400).json(err);
                            else res.status(201).json("Marks Inserted Successfully");
                        });
                    } else if (user.role === "student") {
                        console.log(user.id, user.tablename);
                        const q = `SELECT * FROM ${user.tablename} where ${user.tablename}.id = "${user.id}" order by testname`;
                        console.log(q);
                        const da = pool.query(q, (err, results) => {
                            if (err) res.status(400).json(err);
                            else res.status(200).json(results);
                        });
                    }
                }
            });
        }
    }
};
