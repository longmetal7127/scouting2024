import { json } from '@sveltejs/kit';

export async function GET({ params, locals }) {

	const apiKey = 'mdeudiGgHAr9kKjE8M0sxhK1tfQwuJ0KDCnMlwf24msgKoCc1A1JtXueTLH1s43L';
	const res = await fetch(
		`https://thebluealliance.com/api/v3/team/frc7127/events?X-TBA-Auth-Key=${apiKey}`
	);
	const team = await res.json();
	return json({
		events: team.filter((x) => x.year == 2024).map((event) => event.event_code)
	});
}
