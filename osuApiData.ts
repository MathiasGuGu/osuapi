const CLIENT_SECRET = "aYIYEVy5XEPPoheQHSsKC2HPD6wjBQVfTz39RN6G"
const APP_CALLBACK_URL = "https://osunorway.vercel.app/"
const BASE_URL = "https://osu.ppy.sh/api/v2/"
const YENO_CLIENT_ID = "12805545"
const SCOPES = "public"
const RESPONE_TYPE = "code"
const AUTH_URL = `https://osu.ppy.sh/oauth/authorize?client_id=${YENO_CLIENT_ID}&redirect_uri=${APP_CALLBACK_URL}&response_type=${RESPONE_TYPE}&scope=${SCOPES}&`
const TOKEN_URL = `https://osu.ppy.sh/oauth/token?client_id=${YENO_CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${}`
const GRANT_TYPE = "authorization_code"


