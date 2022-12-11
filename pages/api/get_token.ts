import {data} from "../../osuApiData"



export const get_token = async () => {
    const response = await fetch(data.TOKEN_URL)
    return response.json
  }