<script>
	export let data;
	import { myRxCollection } from '$lib/rxdb.js';
	import { writable } from 'svelte/store';
	import MultiSelect from 'svelte-multiselect';
	const abilities = ['Amp', 'Speaker', 'Climb', 'Trap'];
	let team = writable({});
	let unsubscribe;
	myRxCollection
		.findOne({
			selector: { number: { $eq: data.slug } }
		})
		.$.subscribe((docs) => {
			if (unsubscribe) unsubscribe();
			team = writable(Object.assign({}, docs._data));
			let initialWrite = false;
			unsubscribe = team.subscribe(async (value) => {
				if (!initialWrite) {
					initialWrite = true;
					return;
				}
				console.log('updating fsr????');
				await docs.update({
					$set: {
						comment: value.comment,
						capabilities: value.capabilities,
                        autonomousDescription: value.autonomousDescription,
						updatedAt: new Date().getTime()
					}
				});
				/*
				await docs.incrementalModify((doc) => {
					doc.comment = value.comment;
                    doc.capabilities = value.capabilities;
                    doc.updatedAt = new Date().getTime();
					return doc;
				});*/
			});
		});
</script>

<div>
	{#if team === undefined}
		<h1>Loading...</h1>
	{:else}
		<div>
			<div class="breadcrumbs text-sm">
				<ul>
					<li><a href="/protected/scout">Team Scout</a></li>
					<li><a href="#">{$team.number}</a></li>
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
							<a href="/protected/match/{$team.number}" class="btn btn-primary">Scout Match</a>
						</div>
					</div>
				</div>
			</div>

			<h1>{$team.number}</h1>
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Abilities</span>
					<!-- radio -->
					<ul>
						{#each abilities as ability}
							<li>
								<label class="cursor-pointer">
									<input type="checkbox" bind:group={$team.capabilities} value={ability} />
									<span class="ml-2">{ability}</span>
								</label>
							</li>
						{/each}
					</ul>
				</div>
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
			</label>
		</div>
	{/if}
</div>
