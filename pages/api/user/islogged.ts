import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { userDetailsType } from "@/types/userDetails";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { token } = req.cookies;
    if (!token) res.status(200).json({ redirect: true })
    else {
        verify(token!, process.env.JWT_SECRET!, (err, usr) => {
            if (err) { res.status(200).json({ error: err }) }
            else {
                res.status(200).json({ redirect: false })
            }
        })
    }
}