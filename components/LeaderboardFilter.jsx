import React from 'react';
const _ = require('lodash');
const LeaderboardFilter = ({ setGamemode, setTypeofPP, setSearchInput }) => {
	const debounceSearch = (e) => {
		console.log(e);
		setSearchInput(e);
	};

	return (
		<div className='  bg-osu_background_card h-36 lg:w-[70%] w-[100%] rounded-md gap-6 flex items-center justify-start px-6'>
			<form className='w-full flex flex-col gap-6'>
				<label
					htmlFor='default-search'
					className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
					Search
				</label>
				<div className='relative'>
					<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
						<svg
							aria-hidden='true'
							className='w-5 h-5 text-gray-500 dark:text-gray-400'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
						</svg>
					</div>
					<input
						onChange={(e) => {
							debounceSearch(e.target.value);
						}}
						type='search'
						id='default-search'
						className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Search Players, ranks...'
						required
					/>
					<button
						type='submit'
						className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						Search
					</button>
				</div>
				<div className='container flex gap-10'>
					<select
						id='countries'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						onChange={(e) => {
							setTypeofPP(e.target.value);
						}}>
						<option value='Total PP'>Total PP</option>
						<option value='Hidden PP'>Hidden PP</option>
					</select>
					<select
						id='countries'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						onChange={(e) => {
							setGamemode(e.target.value);
						}}>
						<option value='4k'>4K</option>
						<option value='7k'>7K</option>
					</select>
				</div>
			</form>
		</div>
	);
};

export default LeaderboardFilter;
