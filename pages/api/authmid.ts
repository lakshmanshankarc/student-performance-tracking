import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { userDetailsType } from "@/types/userDetails";
export async function resoleBasedOnUser({ userrole, callback, req, res }: { userrole: string, callback: Function, req: NextApiRequest, res: NextApiResponse }) {
    const { method } = req;
    const { token } = req.cookies;
    if (!token) res.status(400).json("You must login to see the details")
    else {
        verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "You are not logged in" });
            else {
                const { user }: { user: userDetailsType } = decoded as any;
                if (user.role === userrole || user.role === "admin") callback(req, res);
                else res.status(401).json({ message: "You are not authorized" });
            }
        })
    }

}