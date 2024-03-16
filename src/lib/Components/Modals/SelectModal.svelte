<script lang="ts">
	import { writable } from 'svelte/store';

	import 'iconify-icon';

	import SearchBar from '../SearchBar.svelte';
	import type SearchOption from '../types/SearchOption';
	import { isMobile } from '$lib/FrontendUtils';

	let searchQuery = writable('');


    let allOptions: SearchOption<any>[] = [];
	let foundOptions: SearchOption<any>[];

	searchQuery.subscribe((query) => {
		const lowercaseQuery = query.toLowerCase();
		if (allOptions) {
			foundOptions = allOptions.filter((option) => {
				return option?.image && option.name.toLowerCase().includes(lowercaseQuery);
			});
		}
	});

    export let getOptions: Promise<SearchOption<any>[]>;

    getOptions.then((searchOptions) => {
        allOptions = searchOptions;
        foundOptions = searchOptions;
    })

	// const gameSummaryModal: ModalSettings = {
	// 	type: 'component',
	// 	component: 'gameSummary'
	// };
	// function checkForWin() {
	// 	if ($game?.gameHasWon()) {
	// 		$game.finish();
	// 		modalStore.trigger(gameSummaryModal);
	// 	}
	// }

    export let onSelect: ((option: SearchOption<any>) => void);
</script>

<div class="overflow-y-scroll pt-1/4 bg-surface-800 h-3/4 max-h-3/4 {
	isMobile() ?
	'w-11/12':
	'w-3/4'
}">
	<SearchBar value={searchQuery}/>
	{#await getOptions}
		<span>Loading Roles...</span>
	{:then _}
		<div class="flex flex-wrap columns-3 bg-surface-800 max-h-9/10 justify-center">
			{#each foundOptions as option}
				<!-- svelte-ignore a11y-missing-attribute -->
				<a title={`${option.name}`} rel="tooltip">
					<button
						class="card w-36 p-4 m-6 hover:bg-surface-600"
						on:click={() => {
                            onSelect(option);
                        }}
					>
						<img
							class="w-full h-120"
							src={option.image}
							alt={`Image of ${option.name}`}
						/>
					</button>
				</a>
			{/each}
		</div>
	{/await}
</div>
