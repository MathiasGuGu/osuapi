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
			const leaderData = await fetch(url, options);
			const JSON_DATA = await leaderData.json();

			res.status(200).json({ JSON_DATA });
		} catch (err) {
			console.error(err);
			res.status(403).json(err);
		}
	}
}
