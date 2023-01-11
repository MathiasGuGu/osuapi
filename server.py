import requests
import time
from pymongo import MongoClient


# TODO connect mongodb to python script to integrate hidden pp system
client = MongoClient(
    "mongodb+srv://magugu:OafDntjJAsXbesG0@osuapi.7meijyj.mongodb.net/?retryWrites=true&w=majority")

db = client["osuapi"]
collection = db["leaderboard"]


bearer = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxOTI3MSIsImp0aSI6IjZmYjM0NDhmNjExYzMwZDAxZTBkYmE4Y2RjZjNmYmRhMTMzMGQ4ZWQ1MTZkZmI2YTFkMjcyNTZmMTUyYzcyNmIyNzBmYmU5MGVhMjlmMDNhIiwiaWF0IjoxNjczNDI1MjY1LjA2OTMwNCwibmJmIjoxNjczNDI1MjY1LjA2OTMwOCwiZXhwIjoxNjczNTExNjY1LjA2Mjk5Mywic3ViIjoiIiwic2NvcGVzIjpbInB1YmxpYyJdfQ.IYGyr7xK21xL7fTfTrH1xvU3YgblZcRReElKRO-2_X4kFiI4BBme10xcM-vuViV0lCyXMG0htXMkvG8iRFGKRTKV47cO1NIOV3c4pvTic2EjaX0JiN-DWvaonw2aEBqJ4IMv7jn8cAoav_67dw2I2bTvklbSPeeMU9CoZlzfDiBUI5KNXE0PnRcOusDIk4PDK5SvzAPL3cCCeyTh07TKbZ3bFhua2EbGzbzUKBdO5KLzweHCyRGILpflwcdhH7wcWhfoSg1X8bnCZpNC6ADcUmGadbtqiDBT6L345kBGLhFUi00QUPneQWQhIWTJ6p5Npdev07NiXri1euLvxemr3LT9q2sAhlavGOUh_v7SItCAmyMeumvxqGiOFw5VyfZpjxMazxh12bhAIakYovn0M-t0YtQIKaJis-leUIghf7c9TknPDr1rO4IitGbe0U8T_BDas5TRJf7dnscUHqqeqhtcgXUP9NPW0hPNOqTA4akwfOKDB2RdhHjsfqhrv_rRcXscB0z1lu5qBpEUbKRmwGNIZQJv6ylZrIj6oln3CuvzHm2xkNe8D2t4D-ccJcSBzNwgSY86sZ_iS6lJZxfQ3eRGya4_Fn_gm8apPJyeZaAEEBPFk92Llfu-B8f6EMTaDxlz3iiN5zG1TKMjTeH3Mf7G64oOas6TvZ4gTK8lmz4"

UserHDScoresURI = "http://localhost:3000/api/GetUserHDScore"
GetUserBestScoresURI = "https://osu.ppy.sh/api/v2/users/${user}/scores/best"
GetNorwayLeaderboard = "http://localhost:3000/api/GetNorwayBoard"
GetOsuLeaderboardDataURI = "https://osu.ppy.sh/api/v2/rankings/mania/performance"

norwegianLeaderboard = requests.get(GetOsuLeaderboardDataURI, params={
                                    "country": "NO", "filter": "all", "variant": "4K"}, headers={"Authorization": f"Bearer {bearer}"})
leaderboardJSON = norwegianLeaderboard.json()
leaderboard = leaderboardJSON["ranking"]
players = []
player_ids = []

local_store = {}
hiddenPP_store = {}
x = 0
for player in leaderboard:
    player_ids.append(player["user"]["id"])
    players.append(player)

limit = 10


def getUserBestScores(id):
    data = requests.get(f"https://osu.ppy.sh/api/v2/users/{id}/scores/best", params={"include_fails": 0, "mode": "mania", "limit": limit, "offset": 0}, headers={
        "Authorization": f"Bearer {bearer}",    "Content-Type": "application/json", })
    json = data.json()
    return json


def getUserHDScores():
    pass


# TODO Seperate all the different types of pp (all mods)
# TODO Add the necessary user information and add to database

for id in player_ids:
    local_store[str(id)] = getUserBestScores(id)
    for x in range(limit):

        if "HD" in local_store[str(id)][x]["mods"]:
            if (local_store[str(id)][x]["user"]["username"]) in hiddenPP_store:
                hiddenPP_store[local_store[str(
                    id)][x]["user"]["username"]] += local_store[str(id)][x]["pp"]
            else:
                hiddenPP_store[local_store[str(
                    id)][x]["user"]["username"]] = local_store[str(id)][x]["pp"]

print(hiddenPP_store)

for item in hiddenPP_store.keys():
    collection.insert_one(
        {"username": item, "hidden_pp": hiddenPP_store[item]})

# for player in local_store:

# print(player[0]["best_id"])
