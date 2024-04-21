export const load = async (event) => {
	
	return {
		slug: (event.params.slug)
	};
};

export const ssr = false;
