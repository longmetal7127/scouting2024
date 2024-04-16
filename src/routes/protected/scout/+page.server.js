import { redirect } from '@sveltejs/kit';
import { getEventData } from '../../../lib/tba';

export const prerender = false;
export const ssr = false;

export const load = async (event) => {
	if (!await event.locals.auth()) {
		throw redirect(302,'/protected');
	}
	const data = await getEventData();
	return {
		events: data.filter((x) => x.year == 2024).map((event) => event.event_code)
	};
};
