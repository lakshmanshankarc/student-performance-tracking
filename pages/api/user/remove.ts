import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
import { createPool } from "mysql2/promise";
import { compare } from "bcrypt";
const pool = createPool(ConnectionObject);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "POST") {
        const { email, password } = req.body;
        // if user already exists, return usr else create new user
        const [rows, fields]: [any, any] = await pool.query(`SELECT * FROM Userdetails WHERE email = "${email}"`);
        if (rows.length > 0) {
            const user = rows[0];
            const isPasswordValid = await compare(password, user.password);
            if (isPasswordValid) {
                const [rows, fields]: [any, any] = await pool.query(`DELETE FROM Userdetails WHERE email = "${email}`)
                res.status(201).json('User Deleted from the database');
            } else {
                res.status(201).json({ message: "Invalid credentials", rows: rows });
            }
        } else {
            res.status(201).json({ message: "Invalid credentials",rows:rows });
        }
    }
}
