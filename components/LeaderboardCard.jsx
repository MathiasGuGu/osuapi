import React from 'react';

const LeaderboardCard = ({
	global_rank,
	userId,
	username,
	avatar,
	gamemode,
	typeofPP,
	index,
}) => {
	return (
		<a
			className=' lg:hover:scale-110 hover:scale-105 duration-300 hover:cursor-pointer rounded shadow-md text-osu_text_white shadow-osu_background_card w-[100%] lg:w-[70%] h-24 flex gap-12 items-center justify-start bg-osu_background_card '
			key={global_rank}
			href={'/user/' + userId}>
			<img
				src={avatar}
				className=' h-full aspect-square bg-center rounded-l'></img>
			<h2>{username}</h2>
			<p>global rank: {global_rank}</p>
			<p>ranking in norway: {index + 1}</p>
			<span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
				{gamemode}
			</span>
			<span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
				{typeofPP}
			</span>
		</a>
	);
};

export default LeaderboardCard;
