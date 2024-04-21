<script>
	import Protected from '../../../components/Protected.svelte';
	import { myRxCollection } from '$lib/rxdb.js';
	import { readable } from 'svelte/store';
	let teams = [];
	let scoutType = 'teamScout';
	export let data;
	let events;
	let event;
	$: events = data?.events;
	const collection = readable(myRxCollection);
	window.myRxCollection = myRxCollection;
	myRxCollection.find().$.subscribe((docs) => {
		teams = docs;
	});
	const updateData = async () => {
		/*
		const res = await fetch('/api/sync', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ team: team, scoutType })
		});*/
	};
</script>

<Protected>
	<div class="mt-2">
		<ul class="menu menu-vertical mb-2 rounded-box bg-base-200 lg:menu-horizontal lg:w-full">
			<li>
				<button class="btn btn-primary" on:click={updateData}>Add</button>
			</li>
			<select class="select select-bordered" bind:value={scoutType}>
				<option value="teamScout">Team Scout</option>
				<option value="matchScout">Match Scout</option>
			</select>

			<select class="select select-bordered" bind:value={event}>
				{#each events as event}
					<option value={event}>{event}</option>
				{/each}
			</select>
		</ul>
		{#if scoutType == 'teamScout'}
			<ul>
				{#each teams.filter((x)=> x.event == event) as team}
					<li>
						<a href={`/protected/team/${team.id}`}>
							<div class="card card-side mb-4 bg-base-100 shadow-xl">
								<figure>
									<img src={`/api/avatar/${team.number}`} alt="Movie" class="h-24" />
								</figure>
								<div class="card-body">
									<h2 class="card-title">{team.number}</h2>
									<p>{team.nickname}</p>
									<div class="card-actions justify-end">
										<a href="/protected/match/{team.id}" class="btn btn-primary">Scout Match</a>
									</div>
								</div>
							</div></a
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</Protected>
