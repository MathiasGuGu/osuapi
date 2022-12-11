
import {data} from "../../osuApiData"
import { get_token } from "./get_token"
const headers = {
    Authorization: `bearer: ${get_token()}`
  }
const get_osu_data = async () => {
    const response = await fetch(data.BASE_URL + "/endpoint", {method: "GET", headers: headers})
}