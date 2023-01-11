// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
interface leaderboardData {
	userData: unknown;
	pp: number;
	ss: number;
	globalRank: number;
	username: string;
	userId: number;
	hiddenPP?: number;
}
const sleep = (time: any) => {
	return new Promise((resolve) => setTimeout(resolve, time));
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let data = JSON.parse(req.body);
	let bearer = data.bearer;
	const client: any = await clientPromise;
	const db = client.db('osuapi');

	let end = 0;
	const body: leaderboardData = JSON.parse(req.body);
	const user: number = body.userId;
	const userData: leaderboardData = {
		userId: body.userId,
		userData: body.userData,
		pp: body.pp,
		ss: body.ss,
		username: body.username,
		globalRank: body.globalRank,
	};
	let maps: number[] = [];
	let hidden_pp: number = 0;
	let nomod_pp: number = 0;

	const url = new URL(`https://osu.ppy.sh/api/v2/users/${user}/scores/best`);

	let params: any = {
		include_fails: '0',
		mode: 'mania',
		limit: '10',
		offset: '1',
	};
	Object.keys(params).forEach((key) =>
		url.searchParams.append(key, params[key])
	);

	let headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: `Bearer ${bearer}`,
	};

	if (req.method === 'POST') {
		const response = await fetch(url, { method: 'GET', headers });
		const data = await response.json();
		data.forEach((score: any, index: any) => {
			maps.push(score.beatmap.id);

			if (score.mods.length === 0) {
				nomod_pp += score.weight.pp;
			}
		});
	}

	const getUserMapScores = async (
		map: number,
		index: number,
		end: number
	) => {
		let url = new URL(
			`https://osu.ppy.sh/api/v2/beatmaps/${map}/scores/users/${user}`
		);
		let hd_params: any = {
			mode: 'mania',
			mods: 'HD',
		};
		Object.keys(params).forEach((key) =>
			url.searchParams.append(key, hd_params[key])
		);

		const response = await fetch(url, { method: 'GET', headers });
		const data = await response.json();
		if (data.score.mods.includes('HD')) {
			console.log(data.score.mods);

			hidden_pp += data.score.pp;
			console.log(hidden_pp);
		}
		if (end === maps.length - 1) {
			console.log('data sent to DB');
			userData['hiddenPP'] = hidden_pp;
			//	await db.collection('leaderboard').insertOne({ ...userData });
			//	res.status(403).json({ hello: 'hello' });
		}
	};

	try {
		maps.forEach((map: any, index: any) => {
			getUserMapScores(map, index, end);
			end++;
		});
	} catch (err) {
		res.status(403).json({ err });
		console.error(err);
	}
	if (end) {
	}
}
