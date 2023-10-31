import requests
import time
import re
from pymongo import MongoClient


# FINISHED connect mongodb to python script to integrate hidden pp system
client = MongoClient(
   
db = client["osuapi"]

# deletes current leaderboard collection to make space for new and updated one
db["leaderboard"].drop()
collection = db["leaderboard"]

# TODO Get bearer token from API

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

# TODO use formula `Total pp = p * 0.95^(n-1) (p: Total PP, n: place on top plays ladder)`


def getUserBestScores(id):
    data = requests.get(f"https://osu.ppy.sh/api/v2/users/{id}/scores/best", params={"include_fails": 0, "mode": "mania", "limit": limit, "offset": 0}, headers={
        "Authorization": f"Bearer {bearer}",    "Content-Type": "application/json", })
    json = data.json()
    return json


def getUserHDScores():
    pass


# TODO Seperate all the different types of pp (all mods)
# TODO Add the necessary user information and add to database

# TODO Find each player in database and update pp instead of inserting new data on each run


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
        weighted_pp = local_store[str(id)][x]["pp"] * (0.95 ^ (x - 1))
        print("weighted PP : " + weighted_pp)
        if re.search("7K", local_store[str(id)][x]["beatmap"]["version"]):

            if "HD" in local_store[str(id)][x]["mods"]:
                # print("matching 7k + HD")

                hiddenPP_store[local_store[str(
                    id)][x]["user"]["username"]]["PP"]["HD"]["7K"] += local_store[str(id)][x]["pp"] * (0.95 ^ (x - 1))
            hiddenPP_store[local_store[str(
                id)][x]["user"]["username"]]["PP"]["Total"]["7K"] += local_store[str(id)][x]["pp"] * (0.95 ^ (x - 1))

        # check if map is 4k

        if re.search("4K", local_store[f"{str(id)}"][x]["beatmap"]["version"]):
            if "HD" in local_store[str(id)][x]["mods"]:
                # print("matching 4k + HD")
                hiddenPP_store[local_store[str(
                    id)][x]["user"]["username"]]["PP"]["HD"]["4K"] += local_store[str(id)][x]["pp"]
            hiddenPP_store[local_store[str(
                id)][x]["user"]["username"]]["PP"]["Total"]["4K"] += local_store[str(id)][x]["pp"]

print(hiddenPP_store)


# TODO Undo comment, insert data into more readable object notation
# for item in hiddenPP_store.keys():
#    collection.insert_one(
#        {"username": item, "hidden_pp": hiddenPP_store[item]})

# for player in local_store:

# print(player[0]["best_id"])


# TODO create function that runs every 60 minutes and checks recent plays
