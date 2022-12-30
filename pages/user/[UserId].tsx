import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
const UserId = (UserId: any) => {
  const [coverBg, setCoverBg] = useState<any>();
  const [userImage, setUserImage] = useState<any>();
  const [username, setUsername] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [rankHighest, setRankHighest] = useState<any>();

  /*
  statistics
  */
  const [globalRank, setGlobalRank] = useState<any>();
  const [pp, setPP] = useState<any>();
  const [fourkpp, setFourkPP] = useState<any>();
  /*
  setCoverBg(UserId["user_data"].cover_url);
  setUserImage(UserId["user_data"].avatar_url);
  setUsername(UserId["user_data"].username);
  setLocation(UserId["user_data"].location);
  setRankHighest(UserId["user_data"].rank_highest.rank);
  setGlobalRank(UserId["user_data"].statistics.global_rank);
  setPP(UserId["user_data"].statistics.pp);
 */
  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className="w-screen h-auto bg-osu_background_dark ">
        <div className="w-full h-96 bg-osu_background_dark flex items-center justify-center">
          <img
            alt="asd"
            src={UserId["user_data"].avatar_url}
            className="z-10 w-42 h-42  bg-center rounded-full "
          />
          <img
            src={UserId["user_data"].cover_url}
            className="w-full h-96 bg-cover absolute"
          />
          <div className=" z-0 bg-osu_background_card w-96 gap-2 -ml-20 rounded-r-lg h-56 flex flex-col items-center justify-center text-osu_text_white">
            <h1 className=" text-3xl">{UserId["user_data"].username}</h1>
            <p>From: {UserId["user_data"].location}</p>
            <p>Peak rank: {UserId["user_data"].rank_highest.rank}</p>
            <p>PP: {UserId["user_data"].statistics.pp}</p>
            <p>
              Current global rank: {UserId["user_data"].statistics.global_rank}
            </p>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default UserId;

export async function getServerSideProps(context: any) {
  const PUBLIC_BEARER = context.req.cookies.bearer;

  const url = new URL("https://osu.ppy.sh/api/v2/users/");
  const response = await fetch(url + context.query.UserId, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${PUBLIC_BEARER}`,
      "Content-Type": "application/json",
    },
  });
  const user_data = await response.json();
  return {
    props: {
      user_data,
    },
  };
}
