import { json } from '@sveltejs/kit';
import { getEventData, getTeams } from '../../../lib/tba';
export const GET = async (request) => {
	const data = await getTeams(`2024mawne`);
	return json({
		body: data
	});
};
