import {data} from "../../osuApiData"

const login = async () => {
    const response = await fetch(data.AUTH_URL, {method: "GET"})
    const json = await response.json
    console.log(data);
    return data    
  }



