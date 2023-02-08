// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    console.log(client);
    const db = client.db("osuapi");
    const collection = await db
      .collection("leaderboard")
      .find({})
      .limit(50)
      .sort({ "4K": -1 })
      .toArray();
    res.status(200).json({ collection });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}
