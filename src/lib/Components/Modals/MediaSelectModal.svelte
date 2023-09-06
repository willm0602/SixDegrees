<script lang="ts">
	import type Role from '$lib/Game/Role';
	import { writable } from 'svelte/store';

	import 'iconify-icon';

	import { game } from '$lib/dataStore';
	import { editingMediaIndex, moveRight } from '$lib/dataStore';
	import { modalStore } from '@skeletonlabs/skeleton';

	const idx = $editingMediaIndex;
	const actor = $game?.actors[idx];

	let searchQuery = writable('');

	let allRoles: Role[];
	let foundRoles: Role[];
	searchQuery.subscribe((query) => {
		const lowercaseQuery = query.toLowerCase();
		if (allRoles) {
			foundRoles = allRoles.filter((role) => {
				return (
					role.media?.posterPath &&
					(role.characterName.toLowerCase().includes(lowercaseQuery) ||
						role.media?.title.toLowerCase().includes(lowercaseQuery))
				);
			});
		}
	});

	const getActorRoles = async () => {
		if (actor) {
			const roles = await fetch(`/api/getRoles?id=${actor.tmdbID}`, {
				cache: 'force-cache',
			});
			return roles.json().then((data) => {
				if (data) {
					allRoles = data.filter((role: Role) => {
						return role.media?.posterPath;
					});
					foundRoles = allRoles;
				}
			});
		}
		return [];
	};
</script>

<div class="w-3/4 h-3/4 max-h-3/4 pt-1/4 bg-surface-800 overflow-auto">
	<div class="w-full items-center flex justify-center">
		<div class="input w-1/2 m-8 flex">
			<iconify-icon icon="material-symbols:search" class="text-4xl" />
			<input type="text" class="flex-1 bg-surface-700" bind:value={$searchQuery} />
			<button on:click={getActorRoles}>
				<iconify-icon icon="material-symbols:refresh" class="text-4xl" />
			</button>
		</div>
	</div>
	{#await getActorRoles()}
		<span>Loading Roles...</span>
	{:then _}
		<div class="flex flex-wrap columns-3 overflow-y-scroll max-y-9/10 bg-surface-800 max-h-9/10 justify-center">
			{#key foundRoles}
				{#each foundRoles as role}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a title={`${role.characterName} in ${role.media?.title}`} rel="tooltip">
						<button
							class="card w-36 p-4 m-6 hover:bg-surface-600"
							on:click={() => {
								game.set($game?.setMedia(idx, role.media));
								$moveRight();
								modalStore.close();
							}}
						>
							<img
								class="w-full h-120"
								src={`https://image.tmdb.org/t/p/w300/${role.media?.posterPath}`}
								alt={`Image of ${role.media?.title}`}
							/>
						</button>
					</a>
				{/each}
			{/key}
		</div>
	{/await}
</div>
