import requests
import time
import re
from pymongo import MongoClient


# FINISHED connect mongodb to python script to integrate hidden pp system
client = MongoClient(
    "mongodb+srv://magugu:OafDntjJAsXbesG0@osuapi.7meijyj.mongodb.net/?retryWrites=true&w=majority")

db = client["osuapi"]
collection = db["leaderboard"]

bearer = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxOTI3MSIsImp0aSI6IjFkMDc4ZjMxNjVlOGYzYjUxZGQyYTM3OTFhNmIzMjhhZWIzMzYzNmE0ZmFkNjFiODE1NTlmMTEzMDU3ZmU3Y2ZhZGI5NGZmMWYxZmYwMzE2IiwiaWF0IjoxNjczNjA5Mzk2LjEzMDE3NiwibmJmIjoxNjczNjA5Mzk2LjEzMDE3OSwiZXhwIjoxNjczNjk1Nzk2LjEyNTEwOCwic3ViIjoiIiwic2NvcGVzIjpbInB1YmxpYyJdfQ.Mj2CJSkyuqxhCvaFxLIXvbF83m_8z9d9VhTZSw6_vPk85TO89NIQ965pboN9VXKKCtHXeuu_WlPwfaThLrhn7ANhVqOFw-Ec70pN_7ijHpIMZmqjPIiqFt0TJTFsZTeR6OdBcuNRCOebbPZ8-TjCdLZvEjaywoO_rLsx6H3cc-1EgRrljK3oVshvTz0cYRyDNhEBk6FMUMBT1SM0CjL0RDQvnfKrqPu-TYd1OgPNeG-vVehVvPUPpULYjOyd5m9O56o7n_4iX9YwwWWhxTlmkd1jZE1Q1QibmJOCt4kel_2vwF-QlanOICgGcwhsL-jiWRgUdTMmrLZJnMbr8DeH7xbOktq4tAB_dJWIzpUMnB97GI4Oxwg2ymjH1ys1D6YJYoqI_dEePQZNt-TQAga1XgMd0dXj6ZrnrM-E-wbgl9Bp79n0aKPmqmZ98WDzy1bG_OJ3inKrx8Uxa8Rxfa6XS-iaRMpQNpOpMN2kmnFeoqudS86WTSrZFseq8DkFejXtWo9sfkYVHSdoF3OIt9ZKOZAfxUx5kJXbTsiPIMPwDh6AWfrBLxBI0N761myeLZ7MSsKNrOh9UMREfyJyXREuXK0dELDe_0dDepq0zgQ7SO8LP-7dFNoZTS7cPT5cHpPS_BMVncc6KZJd1sMwGC5xoQWoRzcywpHlpFB4lChyqNk"

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


for id in player_ids:
    # Get top user plays
    local_store[str(id)] = getUserBestScores(id)

    # for each map
    for x in range(limit):
        if local_store[str(id)][x]["user"]["username"] in hiddenPP_store:
            pass
        else:
            print("creating user" + " " +
                  local_store[str(id)][x]["user"]["username"])
            hiddenPP_store[local_store[str(id)][x]["user"]["username"]] = {
                "PP": {"HD": {"4K": 0, "7K": 0}, "Total": {"4K": 0, "7K": 0}}}

       # localstore[str(id)][x] is the current map in the cycle
       # if the map has hidden applied
        if re.search("7K", local_store[str(id)][x]["beatmap"]["version"]):

            if "HD" in local_store[str(id)][x]["mods"]:
                print("matching 7k + HD")

                hiddenPP_store[local_store[str(
                    id)][x]["user"]["username"]]["PP"]["HD"]["7K"] += local_store[str(id)][x]["pp"]
            hiddenPP_store[local_store[str(
                id)][x]["user"]["username"]]["PP"]["Total"]["7K"] += local_store[str(id)][x]["pp"]
            # check if map is 4k

        if re.search("4K", local_store[f"{str(id)}"][x]["beatmap"]["version"]):
            if "HD" in local_store[str(id)][x]["mods"]:
                print("matching 4k + HD")
                hiddenPP_store[local_store[str(
                    id)][x]["user"]["username"]]["PP"]["HD"]["4K"] += local_store[str(id)][x]["pp"]
            hiddenPP_store[local_store[str(
                id)][x]["user"]["username"]]["PP"]["Total"]["4K"] += local_store[str(id)][x]["pp"]

print(hiddenPP_store)


# TODO Undo comment, insert data into more readable object notation
# for item in hiddenPP_store.keys():
#   collection.insert_one(
#      {"username": item, "hidden_pp": hiddenPP_store[item]})

# for player in local_store:

# print(player[0]["best_id"])
