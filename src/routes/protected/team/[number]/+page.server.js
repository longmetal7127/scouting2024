import { redirect } from "@sveltejs/kit";

export const ssr = false;
export const prerender = false;

export const load = async (event) => {
	if (!( await event.locals.auth())) {
		throw redirect(302, '/protected');
	}

	return {
		slug: parseInt(event.params.number)
	};
};
