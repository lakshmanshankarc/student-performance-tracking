import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { userDetailsType } from "@/types/userDetails";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { token } = req.cookies;
    verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
        if (err) return res.status(401).json({ message: "You are not logged in" });
        const { user }: { user: userDetailsType } = decoded as any;
        res.status(200).json(user)
    })
}
