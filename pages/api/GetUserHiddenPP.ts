// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

/* TODO
    Go through top 50 users
    Go through top 100 scores of said user 
    Check for all scores on maps
    Add all Hidden PP
    Store Hidden PP in some database or storage
    Use Hidden PP to rank top 50 Hidden players norway
*/

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
