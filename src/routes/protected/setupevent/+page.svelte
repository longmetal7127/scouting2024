<script>
	import { myRxCollection } from '$lib/rxdb.js';
	export let data;

	let event = '';

	const setup = async () => {
		const res = await fetch('/api/teams', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();
		for (let team of data.body) {
			await myRxCollection.insert({ id: team.key, number: team.team_number, nickname:team.nickname, comment: '', capabilities: [], updatedAt: new Date().getTime()});
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
