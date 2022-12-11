const url = new URL("https://osu.ppy.sh/oauth/token");

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

let body = {
  client_id: "19271",
  client_secret: "aYIYEVy5XEPPoheQHSsKC2HPD6wjBQVfTz39RN6G",
  code: "def5020044af1898a1cddd3c99720f56bd552b7577248716258113517d74a46ff8ccc19ca625cb6442d52d90d6b4e87ca2f42bf8aed8e0112eb12bef5da24255944e07ef4f9abf262a73d91b9d36ef2080fb4b2bb68027fcf1d99215f099caecfa56357e39db0a63d25fc37c4d35e172a23008380e90cec0e2632f7245faef2ebca84d4dfc93ae4784827914fbef1670d27c8dd725d4b5cf86dd73e3b22923877f569056f3dd56d56260c60e97cb20fddca19c8fb21dd6fc3b9aab934ef8d900c432dfab221ed5546cf126666f8cafa0b5cfc3753cfd353028aee0bf7d08d95d8ccb96c8b773a84f6fe24297a7050c17a8cf5c609a3f7ddf384fe269a0f22cdc28a3edf1b3d399cd2d3ff4e546b981db5abf96d153b9ff509b10410ce433c43f8a612a9dd13be5a65a55669b582e74d4fa55d0bccfe9c5336e6bc141515619c9bea49b02a35d35c1bd79a814c78fe9e642b450113ab534befc58fd9013a50581e3d9b7b2217c4550344e32e3e95d6b67f8a35ca4dee3a2fccfcc03",
  grant_type: "authorization_code",
  redirect_uri: "https://osunorway.vercel.app/",
};

fetch(url, {
  method: "POST",
  headers,
  body: JSON.stringify(body),
}).then((response) => response.json());
