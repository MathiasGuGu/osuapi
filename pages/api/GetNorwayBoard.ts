const url = new URL('https://osu.ppy.sh/api/v2/rankings/mania/performance');
const sleep = (time: any) => {
	return new Promise((resolve) => setTimeout(resolve, time));
};
import type { NextApiRequest, NextApiResponse } from 'next';
interface leaderboardData {
	userData: unknown;
	pp: number;
	ss: number;
	globalRank: number;
	username: string;
	userId: number;
	bearer?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = JSON.parse(req.body);
	const bearer = data['bearer'];
	const variant = data['variant'];
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${bearer}`,
			'Content-Type': 'application/json',
		},
	};
	let params: any = {
		country: 'NO',
		filter: 'all',
		variant: variant,
	};
	Object.keys(params).forEach((key) =>
		url.searchParams.append(key, params[key])
	);

	if (req.method === 'POST') {
		try {
			const getUserHDScore = async (player: any, index: number) => {
				await sleep(36000 * index);
				let user_data: leaderboardData = {
					userData: player,
					pp: player.pp,
					ss: player.grade_counts.ss,
					globalRank: player.global_rank,
					username: player.user.username,
					userId: player.user.id,
					bearer: data.bearer,
				};
				fetch('http://localhost:3000/api/GetUserHDScore', {
					method: 'POST',
					body: JSON.stringify(user_data),
				});
			};
			const leaderData = await fetch(url, options);
			const JSON_DATA = await leaderData.json();
			JSON_DATA?.ranking.forEach((player: any, index: number) => {
				getUserHDScore(player, index);
			});

			res.status(200).json({ JSON_DATA });
		} catch (err) {
			console.error(err);
			res.status(403).json(err);
		}
	}
}
