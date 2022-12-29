// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = new URL("https://osu.ppy.sh/oauth/token");
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let body = {
    client_id: 19271,
    client_secret: "aYIYEVy5XEPPoheQHSsKC2HPD6wjBQVfTz39RN6G",
    grant_type: "client_credentials",
    scope: "public",
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  const sessionToken = data.access_token;
  res.status(200).json({ sessionToken });
}
