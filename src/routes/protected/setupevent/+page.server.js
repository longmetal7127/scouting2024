import { getEventData } from '../../../lib/tba';
import { redirect } from '@sveltejs/kit';
//export const prerender = false;
export const ssr = false;

export const load = async (event) => {
	if (!(await event.locals.auth())) {
		throw redirect(302, '/protected');
	}

	const data = await getEventData();
	const currYear = new Date().getFullYear();
	return {
		events: data.filter((x) => x.year == currYear).map((event) => currYear+ event.event_code)
	};
};
