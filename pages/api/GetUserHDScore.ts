// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

const sleep = (time: any) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client: any = await clientPromise;
  const db = client.db("osuapi");

  let end = 0;
  const body = JSON.parse(req.body);
  const user = body.userId;
  const userData: any = {
    id: body.userId,
    specs: body.user_data,
    pp: body.pp,
    ss: body.ss,
    username: body.username,
    global_rank: body.global_rank,
  };
  let maps: any = [];
  let hidden_pp: number = 0;
  let nomod_pp: number = 0;
  const url = new URL(`https://osu.ppy.sh/api/v2/users/${user}/scores/best`);

  const bearer =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxOTI3MSIsImp0aSI6ImE4YjEyNWZjY2ZmNmIyNmE4OTY5NWVhMzQwNjMyMWE1MDA2M2RiOWFhYThkODYyODgwZmJmMTEwZDk3YWZmZDkxNmMzMmIyZTgyZTM4ZWU4IiwiaWF0IjoxNjcyOTU4MjcwLjE3ODM4NywibmJmIjoxNjcyOTU4MjcwLjE3ODM5MSwiZXhwIjoxNjczMDQ0NDk2LjgzMDM3NCwic3ViIjoiIiwic2NvcGVzIjpbInB1YmxpYyJdfQ.OhaSyG7D3aqK8Vts2d9e1RDu1OPWMfo-yM-vY9wNCQwCXp5USHOp1ISXln0rZ2ed6PPt02L3A6KsJwIG5WF5UZ-UbPBltH1Ez4gXc8P_7G3Ewvlp0uGsyMz_S0ErrXPiQIlJn7tuE0hv35mDfLw7J5ZKc-LSP0Hy2GkddLbme_hT1vteWLah8WbxNxFJsOe3tPV0M9Mu7_mhlIXJHdfFC2x-JaeCTkeAPgJNGpFUnKmBj1g978dMjDvonTK4n5_MwjNIYLB-7AXhvXUG9IGQvMh-YX3XIOgp0KMNIzxaQWxf6wpbDvMmIj7QA8OO0Blc0f3ByLKM1g2lZFI-GqyqEx-pX2r5aE8iPQp61pZ_TXWDs9d27z3WIRV8eeOFai9qeFi_OPjoGnEB4T8qvNejXwYI0s3aO7yhFVWQOuwDMVCSS21QWnIXsNBeC4owf-EaVpaADW03BtnYJSD0jbA5qyG94aMyUJzNm5puwAfise9ulxEEhe9i1z5vq3Rja7zgDRuwLPOJMH8JY3sCN-YjoTv_9cms2AW6nIr5QEQT-GDGY4PT51Gx33v1TPyXafDUEUj4OaBHr2MYaXvHZHqWmO2o0BKAT0tNmiXy1MrGTE7kqduHUyk9Y1Oi5BKNYEN3ltKdeU-3JAngicOOsvZfzbzEc1RlKXZlta8zvNPCYq0";
  let params: any = {
    include_fails: "0",
    mode: "mania",
    limit: "5",
    offset: "1",
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${bearer}`,
  };

  if (req.method === "POST") {
    const response = await fetch(url, { method: "GET", headers });
    const data = await response.json();
    data?.forEach((score: any, index: any) => {
      maps.push(score.beatmap.id);

      if (score.mods.length === 0) {
        nomod_pp += score.weight.pp;
      }
    });
  }

  let hd_params: any = {
    mode: "mania",
    mods: "HD",
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, hd_params[key])
  );
  try {
    maps.forEach(async (map: any, index: any) => {
      await sleep(1000);

      const response = await fetch(
        `https://osu.ppy.sh/api/v2/beatmaps/${map}/scores/users/${user}`,
        { method: "GET", headers }
      );
      const data = await response.json();
      hidden_pp += data.score.pp;
      end++;
      if (end === maps.length) {
        userData["hidden_pp"] = hidden_pp;
        await db.collection("users").insertOne({ ...userData });
        res.status(403).json({ hello: "hello" });
      }
    });
  } catch (err) {
    res.status(403).json({ err });
    console.error(err);
  }
  if (end) {
  }
}
