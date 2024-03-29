import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import LeaderboardCard from "../components/LeaderboardCard";
import LeaderboardFilter from "../components/LeaderboardFilter";
import WarningCard from "../components/WarningCard";
import Infobox from "../components/Infobox";
const website_uri = "https://osunorway.vercel.app/";
function str_obj(str: any) {
  str = str.split(", ");
  var result: any = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split("=");
    result[cur[0]] = cur[1];
  }
  return result;
}
export default function Home() {
  const [typeofPP, setTypeofPP] = useState("NoMod");
  const [gamemode, setGamemode] = useState("4K");
  const [leaderboard, setLeaderboard] = useState([]);
  const [hiddenLeaderboard, setHiddenLeaderboard] = useState([]);
  const [filterLeaderboard, setFilterLeaderboard] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (typeofPP === "Hidden PP") {
      (async function fetchHiddenLeaderboard() {
        let cookie = str_obj(document.cookie);
        const response = await fetch(
          "http://localhost:3000/api/GetHiddenLeaderboard",
          {
            method: "POST",
            body: JSON.stringify({
              variant: gamemode,
              bearer: cookie["bearer"],
            }),
          }
        );
        const data = await response.json();
        if (gamemode === "4k") {
          const sorted_data = data.collection.sort((a: any, b: any) => {
            return (
              b.hidden_pp["PP"]["HD"]["4K"] - a.hidden_pp["PP"]["HD"]["4K"]
            );
          });
          setHiddenLeaderboard(sorted_data);
        } else {
          const sorted_data = data.collection.sort((a: any, b: any) => {
            return (
              b.hidden_pp["PP"]["HD"]["7K"] - a.hidden_pp["PP"]["HD"]["7K"]
            );
          });
          setHiddenLeaderboard(sorted_data);
        }
      })();
    }
    const fetchLeaderboard = async () => {
      let cookie = str_obj(document.cookie);
      const response = await fetch("http://localhost:3000/api/GetNorwayBoard", {
        method: "POST",
        body: JSON.stringify({
          variant: gamemode,
          bearer: cookie["bearer"],
        }),
      });
      const data = await response.json();

      setLeaderboard(data["JSON_DATA"].ranking);
      setFilterLeaderboard(data["JSON_DATA"].ranking);
    };
    fetchLeaderboard();
  }, [gamemode, typeofPP]);

  useEffect(() => {
    setFilterLeaderboard(
      leaderboard.filter((player) => {
        return player.user.username.toLowerCase().includes(searchInput);
      })
    );
    return () => {
      setFilterLeaderboard(leaderboard);
    };
  }, [searchInput]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="bg-osu_background_dark w-screen h-auto p-0 m-0">
        <div className=" w-screen h-auto flex flex-col gap-6 p-6 items-center ">
          <LeaderboardFilter
            setSearchInput={setSearchInput}
            setGamemode={setGamemode}
            setTypeofPP={setTypeofPP}
          ></LeaderboardFilter>
          <div className=" flex items-center justify-start w-[70%]">
            <WarningCard gamemode={gamemode} typeOfPP={typeofPP}>
              Warning: Hidden PP is not an accurate representation of the
              players actual hidden PP
            </WarningCard>
            {typeofPP === "Hidden PP" ? <Infobox></Infobox> : <div></div>}
          </div>
          <div className="flex gap-4 items-center justify-between px-8 w-[70%] bg-osu_background_card">
            <p>-1</p>
            <h2>[RS] Mart</h2>
            <div className="flex gap-8 p-6 rounded-md">
              <p>4k:</p>
              INFINITE
            </div>
            <div className="flex gap-8  p-6 rounded-md">
              <p>7k:</p>0 :P
            </div>
          </div>
          {typeofPP === "Total PP"
            ? filterLeaderboard.map((player: any, index: number) => {
                return (
                  <LeaderboardCard
                    placement={Math.floor(Math.random() * 2)}
                    key={player.user.id}
                    global_rank={player.global_rank}
                    userId={player.user.id}
                    username={player.user.username}
                    avatar={player.user.avatar_url}
                    gamemode={gamemode}
                    typeofPP={typeofPP}
                    index={index}
                  ></LeaderboardCard>
                );
              })
            : hiddenLeaderboard.map((player, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-4 items-center justify-between px-8 w-[70%] bg-osu_background_card"
                  >
                    <p>{index + 1}</p>
                    <h2>{player.username}</h2>
                    <div className="flex gap-8 p-6 rounded-md">
                      <p>4k:</p>
                      {Math.floor(player.hidden_pp["PP"]["HD"]["4K"])}
                    </div>
                    <div className="flex gap-8  p-6 rounded-md">
                      <p>7k:</p>
                      {Math.floor(player.hidden_pp["PP"]["HD"]["7K"])}
                    </div>
                  </div>
                );
              })}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps({ req, res }: any) {
  const url = new URL("https://osu.ppy.sh/api/v2/rankings/mania/performance");

  let params: any = {
    country: "NO",
    filter: "all",
    variant: "4k",
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const PUBLIC_BEARER = req.cookies.bearer;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${PUBLIC_BEARER}`,
      "Content-Type": "application/json",
    },
  };

  const leaderData = await fetch(url, options);
  const JSON_DATA = await leaderData.json();
  return {
    props: {
      JSON_DATA,
    },
  };
}
