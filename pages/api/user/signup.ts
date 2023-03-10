import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
import { createPool } from "mysql2/promise";
import { hash } from "bcrypt";

const pool = createPool(ConnectionObject);
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "POST") {
        const { id, email, username, password, classname, department, role, tablename } = req.body;
        const hashedPassword = await hash(password, 10);
        const [rows, fields]: [any, any] = await pool.query("SELECT * FROM Userdetails WHERE email = ?", [email]);
        if (rows.length > 0) {
            res.status(201).json({ message: "User already exists", user: rows[0] });
        } else {
            const [rows, fields]: [any, any] = await pool.query("INSERT INTO Userdetails (id, email, username, password, classname, department, role,tablename) VALUES (?, ?, ?, ?, ?, ?, ?,?)", [id, email, username, hashedPassword, classname, department, role, tablename]);
            res.status(201).json({ message: "User created successfully" });
        }
    }
}