import React from 'react';

const News = ({ children }) => {
	return (
		<div className='w-screen flex flex-col gap-8 pt-12 items-center justify-center'>
			<h1 className=' text-xl'>News</h1>
			{children}
		</div>
	);
};

export default News;
