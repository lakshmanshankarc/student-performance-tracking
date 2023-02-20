import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
import { createPool } from "mysql2/promise";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
const pool = createPool(ConnectionObject);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "POST") {
        const { email, password } = req.body;
        // if user already exists, return usr else create new user
        const [rows, fields]: [any, any] = await pool.query("SELECT * FROM Userdetails WHERE email = ?", [email]);
        if (rows.length > 0) {
            const user = rows[0];
            const nopassuser = { ...user, password: undefined };
            const isPasswordValid = await compare(password, user.password);
            if (isPasswordValid) {
                const token = sign({ user:nopassuser }, process.env.JWT_SECRET!);
                res.status(201).json({ message: "User logged in successfully", token, user });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
}