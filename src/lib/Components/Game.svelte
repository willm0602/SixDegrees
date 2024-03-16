<script lang="ts">
	import type Game from '$lib/Game/Game';
	import { cardCount, carouselStart, game, screenWidthInPixels } from '$lib/dataStore';
	import GamePath from './GamePath.svelte';

	import 'iconify-icon';
	import AllModals from './Modals/AllModals.svelte';
	import Carousel from './Carousel.svelte';
	import { onMount } from 'svelte';
	import isTablet, { isMobile } from '$lib/FrontendUtils';


	let currGame = $game as Game;

	game.subscribe((newGame) => {
		currGame = newGame as Game;
	});

	screenWidthInPixels.subscribe((newWidth) => {
		cardCount.set(
			isMobile() ? 1 :
			isTablet() ? 3 :
			7
		)
	})

	onMount(() => {

		screenWidthInPixels.set(window.screen.availWidth);

		// Adjust the number of cards shown if the window resizes
		window.addEventListener<'resize'>('resize', (e) => {
			// @ts-ignore
			const width: number = e.target.screen.width;
			screenWidthInPixels.set(width);
		})
	})


</script>

<AllModals />

<Carousel>
	{#key $game}
	{#key $carouselStart}
	{#key $cardCount}
	{#if $game}
		{#each { length: $game ? $game.getPathSize() : 0 } as _, idx}
			{#if idx >= $carouselStart && idx < ($carouselStart + $cardCount)}
				<GamePath index={idx} />
			{/if}
		{/each}
	{/if}
	{/key}
	{/key}
	{/key}
</Carousel>
