<script lang="ts">
	import type Actor from '$lib/Game/Actor';
	import { writable } from 'svelte/store';

	import 'iconify-icon';

	import { game, editingActorIndex, moveRight } from '$lib/dataStore';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const idx = $editingActorIndex;
	const media = $game?.media[idx - 1];

	let searchQuery = writable('');

	let allActors: Actor[];
	let foundActors: Actor[];

	searchQuery.subscribe((query) => {
		const lowercaseQuery = query.toLowerCase();
		if (allActors) {
			foundActors = allActors.filter((actor) => {
				return actor?.profile_path && actor.name.toLowerCase().includes(lowercaseQuery);
			});
		}
	});

	const getCast = async () => {
		if (media) {
			const roles = await fetch(`/api/getActors?media=${JSON.stringify(media)}`, {
				cache: 'force-cache'
			});
			return roles.json().then((data) => {
				if (data) {
					allActors = data.filter((actor: Actor) => {
						return actor && actor.profile_path;
					});
					foundActors = allActors;
				}
			});
		}
		return [];
	};

	getCast();


	const gameSummaryModal: ModalSettings = {
		type: 'component',
		component: 'gameSummary'
	};
	function checkForWin() {
		if($game?.gameHasWon()){
			$game.finish();
			modalStore.trigger(gameSummaryModal);
		}
	}
</script>

<div class="w-3/4 h-3/4 max-h-3/4 overflow-y-scroll pt-1/4 bg-surface-800">
	<div class="w-full items-center flex justify-center">
		<div class="input w-1/2 m-8 flex">
			<iconify-icon icon="material-symbols:search" class="text-4xl" />
			<input type="text" class="flex-1 bg-surface-700" bind:value={$searchQuery} />
		</div>
	</div>
	{#await getCast()}
		<span>Loading Roles...</span>
	{:then _}
		<div class="flex flex-wrap columns-3 bg-surface-800 max-h-9/10 justify-center">
			{#each foundActors as actor}
				<!-- svelte-ignore a11y-missing-attribute -->
				<a title={`${actor?.name}`} rel="tooltip">
					<button
						class="card w-36 p-4 m-6 hover:bg-surface-600"
						on:click={() => {
							game.set($game?.setActor(idx, actor));
							$moveRight();
							modalStore.close();
							checkForWin();
						}}
					>
						<img
							class="w-full h-120"
							src={`https://image.tmdb.org/t/p/w300/${actor?.profile_path}`}
							alt={`Image of ${actor?.name}`}
						/>
					</button>
				</a>
			{/each}
		</div>
	{/await}
</div>
