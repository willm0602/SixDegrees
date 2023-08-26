<script lang="ts">
	import type Game from '$lib/Game/Game';
	import { game } from '$lib/dataStore';
	import GamePath from './GamePath.svelte';

	import 'iconify-icon';
	import AllModals from './Modals/AllModals.svelte';
	import Carousel from './Carousel.svelte';

	let currGame = $game as Game;

	game.subscribe((newGame) => {
		currGame = newGame as Game;
	});

	function swapOrder() {
		const gameWithSwappedOrder = $game?.swap();
		game.set(gameWithSwappedOrder);
	}

	// The logic for the carousel was borrowed from the sveltekit skeleton docs https://www.skeleton.dev/elements/scroll-containers
	let elemMovies: HTMLDivElement;

	function multiColumnLeft(): void {
		let x = elemMovies.scrollWidth;
		if (elemMovies.scrollLeft !== 0) x = elemMovies.scrollLeft - elemMovies.clientWidth;
		elemMovies.scroll(x, 0);
	}

	function multiColumnRight(): void {
		let x = 0;
		// -1 is used because different browsers use different methods to round scrollWidth pixels.
		if (elemMovies.scrollLeft < elemMovies.scrollWidth - elemMovies.clientWidth - 1)
			x = elemMovies.scrollLeft + elemMovies.clientWidth;
		elemMovies.scroll(x, 0);
	}
</script>

<AllModals />

<Carousel>
	{#key $game}
		{#if $game}
			{#each { length: $game ? $game.pathSize() : 0 } as _, idx}
				<GamePath indexgetPathSize>
			{/each}
		{/if}
	{/key}
</Carousel>