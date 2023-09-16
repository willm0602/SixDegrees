<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Actor from '$lib/Components/Actor.svelte';
	import ActorCard from '$lib/Components/ActorCard.svelte';
	import GameView from '$lib/Components/Game.svelte';
	import { isMobile } from '$lib/FrontendUtils.js';
	import Game from '$lib/Game/Game.js';
	import { carouselStart, game } from '$lib/dataStore.js';
	import { onMount } from 'svelte';

	export let data;
	const { actors } = data;
	const initGame = new Game(actors[0], actors[1]);
	initGame.start();

	game.set(initGame);

	const actor1 = actors[0];
	const actor2 = actors[1];

	const imgCSS = 'h-36 w-24';

	$page.url.searchParams.set('first', '' + actor1.tmdbID);
	$page.url.searchParams.set('second', '' + actor2.tmdbID);
	onMount(() => {
		goto(`?${$page.url.searchParams.toString()}`);
	});

	function swapOrder() {
		const updatedGame = $game?.swap();
		game.set(updatedGame);
		carouselStart.set(0);
	}

	const pageClass = 'h-full flex flex-col mb-32 md:mb-auto' +
						(isMobile() ? 'p-10' : '')
</script>

<div class={pageClass}>
	<h1 class="h1 mx-auto mb-8 text-center">{actor1.name} to {actor2.name}</h1>
	<div class="flex align-center justify-center h-fit">
		<ActorCard actor={actor1} {imgCSS} />
		<span class="h2 mx-10 flex items-center">To</span>
		<ActorCard actor={actor2} {imgCSS} />
	</div>
	<div class="bg-surface-800 flex flex-col mt-12 w-11/12 m-auto">
		<div class="flex mt-12 align-center justify-center">
			<button class="btn btn-base variant-filled-surface" on:click={swapOrder}>Swap Order</button>
		</div>
		<GameView />
	</div>
</div>
