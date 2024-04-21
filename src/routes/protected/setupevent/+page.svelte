<script>
	import { myRxCollection } from '$lib/rxdb.js';
	export let data;

	let event = '';

	const setup = async () => {
		const res = await fetch(`/api/teams/${event}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();
		for (let team of data.body) {
			await myRxCollection.insert({
				id: team.key + event,
				number: team.team_number,
				nickname: team.nickname,
				comment: '',
				capabilities: [],
				updatedAt: new Date().getTime(),
				startPositions: [],
				event: event
			});
		}
	};
</script>

<div>
	<h1>Setup Event</h1>
	<select class="select select-bordered" bind:value={event}>
		{#each data.events as event}
			<option value={event}>{event}</option>
		{/each}
	</select> <button class="btn btn-primary" on:click={setup}>Add</button>
</div>
