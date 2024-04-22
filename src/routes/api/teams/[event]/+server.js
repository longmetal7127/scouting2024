import { json } from '@sveltejs/kit';
import { getEventData, getTeams } from '../../../../lib/tba';
export const GET = async (request) => {
	const key = request.params.event;
	const data = await getTeams(key);
	return json({
		body: data
	});
};
