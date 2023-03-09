import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
import { createPool } from "mysql2/promise";
import { compare } from "bcrypt";
const pool = createPool(ConnectionObject);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "POST") {
        const { email, password } = req.body;
        // Check if user exists
        const [rows, fields]: [any, any] = await pool.query("SELECT * FROM Userdetails WHERE email = ?", [email]);
        if (rows.length > 0) {
            const user = rows[0];
            const isPasswordValid = await compare(password, user.password);
            if (isPasswordValid) {
                const query = "DELETE FROM Userdetails WHERE email = ?";
                const q = pool.query(query, [email]);
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
}