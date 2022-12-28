import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
const UserId = () => {
  const router = useRouter();
  const { UserId } = router.query;
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
  useEffect(() => {
    const getUserData = async () => {
      let response = await fetch("http://localhost:3000/api/GetUser", {
        method: "POST",
        body: JSON.stringify({ id: UserId }),
      });
      let userData = await response.json();
      setCoverBg(userData["user_data"].cover_url);
      setUserImage(userData["user_data"].avatar_url);
      setUsername(userData["user_data"].username);
      setLocation(userData["user_data"].location);
      setRankHighest(userData["user_data"].rank_highest.rank);
      setGlobalRank(userData["user_data"].statistics.global_rank);
      setPP(userData["user_data"].statistics.pp);
    };
    UserId ? getUserData() : "";
  }, [UserId]);

  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className="w-screen h-auto ">
        <div className="w-full h-96 bg-osu_background_dark flex items-center justify-center">
          <img
            alt="asd"
            src={userImage}
            className="z-10 w-42 h-42  bg-center rounded-full "
          />
          <img src={coverBg} className="w-full h-96 bg-cover absolute" />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default UserId;
