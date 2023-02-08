import React from 'react';

const Podium = ({ one, two, three }) => {
	return (
		<div className='flex items-end justify-center gap-2 w-[100vw] h-[60vh] bg-osu_background_card'>
			<div className='flex flex-col items-center justify-center gap-4'>
				<img
					src={two.avatar_url}
					className='w-24 h-24 rounded-full bg-osu_text_purple'></img>
				<p>{two.username}</p>
				<div className='w-48 h-40 bg-osu_light_gray flex items-center justify-center'>
					2nd
				</div>
			</div>
			<div className='flex flex-col items-center justify-center gap-4'>
				<img
					src={one.avatar_url}
					className='w-24 h-24 rounded-full bg-osu_text_purple'></img>
				<p>{one.username}</p>
				<div className='w-48 h-56 bg-osu_light_gray flex items-center justify-center'>
					1st
				</div>
			</div>
			<div className='flex flex-col items-center justify-center gap-4'>
				<img
					src={three.avatar_url}
					className='w-24 h-24 rounded-full bg-osu_text_purple'></img>
				<p>{three.username}</p>
				<div className='w-48 h-24 bg-osu_light_gray flex items-center justify-center'>
					3rd
				</div>
			</div>
		</div>
	);
};

export default Podium;
