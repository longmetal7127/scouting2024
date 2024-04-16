export const getEventData = async () => {
	const apiKey = 'mdeudiGgHAr9kKjE8M0sxhK1tfQwuJ0KDCnMlwf24msgKoCc1A1JtXueTLH1s43L';
	const res = await fetch(
		`https://thebluealliance.com/api/v3/team/frc7127/events?X-TBA-Auth-Key=${apiKey}`
	);
	const team = await res.json();
	return team;
};

export const getTeams = async (event) => {
	const apiKey = 'mdeudiGgHAr9kKjE8M0sxhK1tfQwuJ0KDCnMlwf24msgKoCc1A1JtXueTLH1s43L';
	const res = await fetch(
		`https://thebluealliance.com/api/v3/event/${event}/teams?X-TBA-Auth-Key=${apiKey}`
	);
	const team = await res.json();
	return team;
};

