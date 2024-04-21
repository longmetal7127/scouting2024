<script>
	export let data;
	import { myRxCollection } from '$lib/rxdb.js';
	import { writable } from 'svelte/store';
	import FieldCanvas from '../../../../components/FieldCanvas.svelte';
	const abilities = ['Amp', 'Speaker', 'Climb', 'Trap'];
	let team = writable({});
	let unsubscribe;
	myRxCollection
		.findOne({
			selector: { id: { $eq: data.slug } }
		})
		.$.subscribe((docs) => {
            console.log('being subscribed', docs._data.startPositions)
			if (unsubscribe) unsubscribe();
			team = writable(Object.assign({}, docs._data));
			let initialWrite = false;
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
	let points = [];
</script>

<div>
	{#if team === undefined}
		<h1>Loading...</h1>
	{:else}
		<div>
			<div class="breadcrumbs text-sm">
				<ul>
					<li><a href="/protected/scout">Team Scout</a></li>
					<li><a href="#">{$team.number} - {$team.nickname}</a></li>
				</ul>
			</div>
			<div class="sidebar">
				<div class="card card-side bg-base-100">
					<figure class="">
						<img src={`/api/avatar/${$team.number}`} alt="Movie" class="h-24" />
					</figure>

					<div class="card-body">
						<h2 class="card-title">Team {$team.number}</h2>
						<p>{$team.nickname}</p>
						<div class="card-actions justify-end">
							<a href="/protected/match/{$team.id}" class="btn btn-primary">Scout Match</a>
						</div>
					</div>
				</div>
			</div>

			<h1>{$team.number}</h1>
			<label for="" class="form-control w-full max-w-xs">
				<div class="label">
					<span
						class="label-text
                    ">Start Positions</span
					>
				</div>
				<FieldCanvas bind:points={$team.startPositions} />
			</label>
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Abilities</span>
				</div>
				<!-- radio -->
				<ul class="ml-4">
					{#each abilities as ability}
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">{ability}</span>
								<input
									type="checkbox"
									bind:group={$team.capabilities}
									value={ability}
									class="checkbox"
								/>
							</label>
						</div>
					{/each}
				</ul>
			</label>
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Autonomous</span>
				</div>
				<textarea class="textarea textarea-bordered" bind:value={$team.autonomousDescription} />
			</label>

			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Extra comments</span>
				</div>
				<textarea class="textarea textarea-bordered" bind:value={$team.comment} />
			</label>
		</div>
	{/if}
</div>
