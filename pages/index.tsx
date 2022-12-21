import axios from "axios";
import { log } from "console";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";

const website_uri = "https://osunorway.vercel.app/";

export default function Home() {
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [rankHistory, setRankHistory] = useState([]);
  const [authCode, setAuthCode] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);

  useEffect(() => {
    const getBearerToken = async () => {
      try {
        let response = await fetch(website_uri + "api/requestData", {
          method: "POST",
          body: JSON.stringify({ authCode: authCode }),
        });

        let data = await response.json();
        console.log(data);

        setAccessToken(data["access_token"]);
        data["access_token"] &&
          localStorage.setItem("accessToken", data["access_token"]);
        console.log(data["access_token"]);
      } catch (err) {
        console.error(err);
      }
    };

    getBearerToken();
    const token = localStorage.getItem("accessToken");
  }, [authCode]);

  /*

Get the auth token through the params
save auth token in cookies or storage
Reset website by pushing a new route (going back to default route)
use token to get api endpoint response
display response data


*/
  const router = useRouter();

  useEffect(() => {
    const setAuth = async () => {
      setAuthCode(String(router.query.code));
      console.log(authCode);
    };
    setAuth();
  }, [router.query, authCode]);

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
      <main className={styles.main}>
        <h1>Welcome {username}</h1>
        <p>Player from {country}</p>
        <div>
          rank highlight:
          <div>
            {rankHistory.map((rank) => {
              return (
                <>
                  <div key={rank}>{rank}</div>
                </>
              );
            })}
          </div>
        </div>
        <a href="https://osu.ppy.sh/oauth/authorize?client_id=19271&redirect_uri=https://osunorway.vercel.app/&response_type=code">
          Get auth code
        </a>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
