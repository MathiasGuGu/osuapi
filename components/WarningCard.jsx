import React from 'react';

const WarningCard = ({ gamemode, typeOfPP, children }) => {
	return (
		<>
			{typeOfPP === 'Hidden PP' ? (
				<div className='lg:w-[70%] w-[90%] flex flex-col gap-4'>
					<span
						id='badge-dismiss-red'
						className=' w-[80%] inline-flex items-center py-4 px-2 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-200 dark:text-red-800'>
						{children}
					</span>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default WarningCard;
