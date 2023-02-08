import React from 'react';

const Infobox = () => {
	return (
		<div className='w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center border text-xl text-blue-800 hover:cursor-pointer relative'>
			?
			<div className=' border duration-200 hover:flex absolute opacity-0 hover:opacity-100 h-2 w-2 hover:w-72 hover:h-64 shadow-md hover:rounded-sm bg-blue-200 text-osu_background_info flex flex-col text-sm p-2'>
				<h2>How it works:</h2>
				<p>
					The hidden pp system calculates total Hidden PP based on
					your top 50 plays
				</p>
				<p>
					It does not consider PP weight and will therefor not be an
					accurate representation of your actual Hidden PP
				</p>
				<p>The Hidden PP leaderboard is updated once per day</p>
				<p className='text-md'>
					Note: To increase your Hidden PP ranking, you need a play to
					be in your top 50 plays.
				</p>
			</div>
		</div>
	);
};

export default Infobox;
