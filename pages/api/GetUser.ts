import type { NextApiRequest, NextApiResponse } from "next";
const PUBLIC_BEARER =

const url = new URL("https://osu.ppy.sh/api/v2/users/");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const id = JSON.parse(req.body).id;
      const response = await fetch(url + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PUBLIC_BEARER}`,
          "Content-Type": "application/json",
        },
      });
      const user_data = await response.json();
      res.status(200).json({ user_data });
    } catch (err) {
      res.status(403).json({ err });
    }
  }
}
