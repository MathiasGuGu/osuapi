import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import LeaderboardCard from '../components/LeaderboardCard';
import LeaderboardFilter from '../components/LeaderboardFilter';
import WarningCard from '../components/WarningCard';
const website_uri = 'https://osunorway.vercel.app/';
function str_obj(str) {
	str = str.split(', ');
	var result = {};
	for (var i = 0; i < str.length; i++) {
		var cur = str[i].split('=');
		result[cur[0]] = cur[1];
	}
	return result;
}
export default function Home() {
	const [typeofPP, setTypeofPP] = useState('NoMod');
	const [gamemode, setGamemode] = useState('4K');
	const [leaderboard, setLeaderboard] = useState([]);
	const [filterLeaderboard, setFilterLeaderboard] = useState([]);
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		const fetchLeaderboard = async () => {
			let cookie = str_obj(document.cookie);
			const response = await fetch(
				'http://localhost:3000/api/GetNorwayBoard',
				{
					method: 'POST',
					body: JSON.stringify({
						variant: gamemode,
						bearer: cookie['bearer'],
					}),
				}
			);
			const data = await response.json();

			setLeaderboard(data['JSON_DATA'].ranking);
			setFilterLeaderboard(data['JSON_DATA'].ranking);
		};
		fetchLeaderboard();
	}, [gamemode]);

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
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<header>
				<Navbar></Navbar>
			</header>
			<main className='bg-osu_background_dark w-screen h-auto p-0 m-0'>
				<div className=' w-screen h-auto flex flex-col gap-6 p-6 items-center '>
					<LeaderboardFilter
						setSearchInput={setSearchInput}
						setGamemode={setGamemode}
						setTypeofPP={setTypeofPP}></LeaderboardFilter>
					<WarningCard gamemode={gamemode} typeOfPP={typeofPP}>
						Warning: Hidden PP is not an accurate representation of
						the players actual hidden PP
					</WarningCard>

					{filterLeaderboard.map((player: any, index: number) => {
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
								index={index}></LeaderboardCard>
						);
					})}
				</div>
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
}

export async function getServerSideProps({ req, res }: any) {
	const url = new URL('https://osu.ppy.sh/api/v2/rankings/mania/performance');

	let params: any = {
		country: 'NO',
		filter: 'all',
		variant: '4k',
	};
	Object.keys(params).forEach((key) =>
		url.searchParams.append(key, params[key])
	);

	const PUBLIC_BEARER = req.cookies.bearer;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${PUBLIC_BEARER}`,
			'Content-Type': 'application/json',
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
