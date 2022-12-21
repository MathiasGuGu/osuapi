// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

/* 
let response = await fetch("https://osu.ppy.sh/oauth/token" , {
    method: "POST", 
    headers, 
    body: JSON.stringify(body)
  })
  let data = await response.json()
  console.log(data);
  
  data["access_token"] && localStorage.setItem("accessToken", data["access_token"])
  console.log(data["access_token"])

const token = localStorage.getItem("accessToken")

fetch("https://osu.ppy.sh/api/v2/me/", {headers: {Authorization: `Bearer ${token}`}})
  .then(response => response.json())
  .then(response => {
    console.log(response)
  })
  .catch(err => console.error(err));
*/
let code: any;
let body: any;
let headers: any;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    let bearerToken;
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    body = {
      client_id: 19271,
      client_secret: "aYIYEVy5XEPPoheQHSsKC2HPD6wjBQVfTz39RN6G",
      code: req.body["authCode"],
      grant_type: "authorization_code",
      redirect_uri: "https://osunorway.vercel.app/",
    };
    const getBearer = async () => {
      let response = await fetch("https://osu.ppy.sh/oauth/token", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      let data = await response.json();
      bearerToken = { token: data["access_token"] };
      res.status(200).json(bearerToken);
    };

    try {
      getBearer();
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: err });
    }
  } else if (req.method === "GET") {
    let bearer = req.body["bearerToken"];
    console.log(bearer);
    const sendData = async () => {
      try {
        let response = await fetch("https://osu.ppy.sh/api/v2/me/", {
          headers: { Authorization: `Bearer ${bearer}` },
        });
        let data = await response.json();
        console.log(data);
        res.status(200).json({ data });
      } catch (err) {
        console.error(err);
        res.status(401).json({ error: err });
      }
    };

    try {
      sendData();
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: err });
    }
  }
}
