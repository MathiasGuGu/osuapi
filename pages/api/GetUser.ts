import type { NextApiRequest, NextApiResponse } from "next";
const PUBLIC_BEARER =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxOTI3MSIsImp0aSI6IjJlNjQ1YjU1N2ZhMmQ0NzZiMDQ0MmZiMGExMzdmNTRiZGYzNzc3NWQ5YWUwNGFhNWU2NmVmMGY1ZTg3MDJkZDkwM2U1NWZkM2E2MzBjN2U2IiwiaWF0IjoxNjcyMTU4ODc4LjAwNTA0NiwibmJmIjoxNjcyMTU4ODc4LjAwNTA0OSwiZXhwIjoxNjcyMjQ0NzgyLjYyNDc2Niwic3ViIjoiIiwic2NvcGVzIjpbInB1YmxpYyJdfQ.ee4i6OpIr-tT4XHIsq33h-mWG-G0okskFB8dj3zF3hTTOsHrFiji7f-lpqWzCoBOvT0UGpb_GzAivfT87zsdHRFDk87PFSCalm8nIXfl33C6LbFca70FYinXtoqw1zslSYW3NkG0N4hkzb2zdbTY4J3dQs99ArdGLk_zZs5jnffOHWZubPwy-aaT3mxcQWGkHI146uJX8Uw9ZEbspTe8C4Gkr1M94a6nm0vhJFzQA0lQa7iFWYjxtevgJV6brMTgV7d1O9tkl0SqETb9Bq3gb87cCWOICRAeClD-QHs0EI-Qb8mHmKisW6r3AJ1QC0V9YhxiVN1PD_4BP1K8Hj-jw1T17u97JPafKRKVwep6Om4XZ0BQn0HXaIS3ERArVkvf4gkVFxkrsQWW7EppXzZzIKJTbSVGmtvvJUioXIQbjodfLm7BpXQh-yJQi0Q86PFXBMxSDQt-ERMxy-bJdQEuki2gSkT_K_XfLVYO3-tOxhRyEl2IIwYkmYiyLJWWHQ8uUkhCN_xN2__a2nQA-Ye6rGwyy_zkO0DmDWT3lQLrRJxKKldZu8ek2RmzXjNhDQH58WOZol7lCtc7M6FGDrum2AlHWzD5Eqx5LiW5Au5w9THnzpujEMmTQy1kDO0uvRCXpf4xBV_MlnTlhLTUfc60Gv1cBKLGKNYwX6eyNfLh_jc";

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
