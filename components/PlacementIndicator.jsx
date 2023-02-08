import React from 'react';
import Image from 'next/image';
import upIndicator from '../public/up-arrow-svgrepo-com(1).svg';
const PlacementIndicator = ({ placement }) => {
	return (
		<div className='flex items-center justify-center gap-2'>
			{placement === 0 ? (
				<>
					<div className='w-4 h-[1px] bg-negative_red'></div>
				</>
			) : (
				<>
					<Image src={upIndicator} height={25} width={15} alt='up' />
					<div> + 1</div>
				</>
			)}
		</div>
	);
};

export default PlacementIndicator;
