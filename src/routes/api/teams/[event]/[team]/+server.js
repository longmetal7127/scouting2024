import { json } from '@sveltejs/kit';
export const GET = async (request) => {
	const res = await fetch(
		`https://www.thebluealliance.com/api/v3/team/frc${request.params.team}/event/${request.params.event}/matches/simple`,
		{
			headers: {
				'X-TBA-Auth-Key': 'mdeudiGgHAr9kKjE8M0sxhK1tfQwuJ0KDCnMlwf24msgKoCc1A1JtXueTLH1s43L'
			}
		}
	);
	const data = await res.json();
	console.log(data);

	return json(
		data.map((match) => ({
			number: match.comp_level == 'qm' ? match.match_number : match.set_number,
			stage: match.comp_level
		}))
	);
};
