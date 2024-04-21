<script>
	export let data;
	import { myRxCollection } from '$lib/rxdb.js';
	import { writable } from 'svelte/store';
	let team = writable({});
	let unsubscribe;
	let matches = [];
	myRxCollection
		.findOne({
			selector: { id: { $eq: data.slug } }
		})
		.$.subscribe(async (docs) => {
			if (unsubscribe) unsubscribe();
			team = writable(Object.assign({}, docs._data));
			let initialWrite = false;
			const res = await fetch(`/api/teams/${docs.event}/${docs.number}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json();
			matches = data;

			unsubscribe = team.subscribe(async (value) => {
				if (!initialWrite) {
					initialWrite = true;
					return;
				}
				await docs.update({
					$set: {
						comment: value.comment,
						capabilities: value.capabilities,
						autonomousDescription: value.autonomousDescription,
						updatedAt: new Date().getTime(),
						startPositions: value.startPositions
					}
				});
			});
		});
		const nameFromEnum = (value) => {
			switch (value) {
				case 'qf':
					return 'Quarterfinal';
				case 'sf':
					return 'Semifinal';
				case 'f':
					return 'Final';
				default:
					return 'Qualification';
			}
		};
</script>

<div>
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/protected/scout">Team Scout</a></li>
			<li><a href="/protected/team/{$team.id}">{$team.number} - {$team.nickname}</a></li>
			<li><a href="">Scout Match</a></li>
		</ul>
	</div>
	<select class="select select-bordered">
		
	{#each matches as match}
		<option value={match.number}>{nameFromEnum(match.stage)} {match.number} </option>
	{/each}</select>
</div>
