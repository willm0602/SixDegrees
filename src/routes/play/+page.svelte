<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Actor from '$lib/Components/Actor.svelte';
	import ActorCard from '$lib/Components/ActorCard.svelte';
	import GameView from '$lib/Components/Game.svelte';
	import Game from '$lib/Game/Game.js';
	import { game } from '$lib/dataStore.js';
	import { onMount } from 'svelte';

	export let data;
	const { actors } = data;
	const initGame = new Game(actors[0], actors[1]);

	game.set(initGame);

	const actor1 = actors[0];
	const actor2 = actors[1];

	const imgCSS = 'h-36 w-24';

	$page.url.searchParams.set('first', ''+actor1.tmdbID);
	$page.url.searchParams.set('second', ''+actor2.tmdbID);
	onMount(() => {
		goto(`?${$page.url.searchParams.toString()}`);
	})

	function swapOrder(){
		const updatedGame = $game?.swap();
		game.set(updatedGame);
	}
</script>

<div class="h-full flex flex-col p-10">
	<div class="flex align-center justify-center h-fit">
		<ActorCard actor={actor1} {imgCSS} />
		<span class="h2 mx-10 flex items-center">To</span>
		<ActorCard actor={actor2} {imgCSS} />
	</div>
	<div class="flex mt-24 align-center justify-center">
		<button class="btn btn-base variant-filled-secondary"
				on:click={swapOrder}
		>Swap Order</button>
	</div>
	<GameView />
</div>
