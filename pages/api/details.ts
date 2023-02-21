import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    console.log(req.cookies);
    if (method === "GET") {
        res.status(200).json({ message: "Hello World" });
    }
}