// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const client = await clientPromise;
		const db = client.db('osuapi');
		const collection = await db
			.collection('leaderboard')
			.find({})
			.limit(50)
			.sort({ '4K': -1 })
			.toArray();
		res.status(200).json({ collection });
	} catch (err) {
		res.status(400).json({ err });
	}
}
