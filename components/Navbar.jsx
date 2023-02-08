import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.png';
const Navbar = () => {
	return (
		<div className='w-screen gap-24 h-16 text-osu_text_white flex items-center px-6 bg-osu_purple '>
			<Image src={logo} width={60} height={60} alt='osu logo' />
			<ul className='w-[90%] h-full flex items-center gap-16 px-6'>
				<a
					href='http://localhost:3000'
					className='rounded w-28 h-[80%] flex items-center justify-center hover:cursor-pointer hover:bg-osu_pink duration-300'>
					Home
				</a>
				<a
					href='http://localhost:3000/leaderboard'
					className='rounded w-28 h-[80%] flex items-center justify-center hover:cursor-pointer hover:bg-osu_pink duration-300'>
					Leaderboard
				</a>
				<a className='rounded w-28 h-[80%] flex items-center justify-center hover:cursor-pointer hover:bg-osu_pink duration-300'>
					Info
				</a>
				<a href='https://osu.ppy.sh/oauth/authorize?client_id=19271&redirect_uri=https://osunorway.vercel.app/&response_type=code'>
					Get auth code
				</a>
			</ul>
		</div>
	);
};

export default Navbar;
