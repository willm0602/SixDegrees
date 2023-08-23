<script lang="ts">
	import type Actor from '$lib/Game/Actor';
	import type Media from '$lib/Game/Media';
	import MediaSelector from './MediaSelector.svelte';
	import { game } from '$lib/dataStore';
	import ActorView from './Actor.svelte';
	import ActorSelector from './ActorSelector.svelte';
	import ActorCard from './ActorCard.svelte';

	export let index: number = 0;
	let actor: Actor | undefined;
	let media: Media | undefined;

	const IMGCSS = 'h-[12rem] w-[9rem]';
	if (index % 2 == 0) {
		actor = $game?.actors[Math.floor(index / 2)];
	} else {
		media = $game?.media[Math.floor(index / 2)];
		actor = $game?.actors[Math.floor(index / 2)];
	}
</script>

<div class="mx-3 game-path-{index}">
	{#key game}
		{#if index % 2 == 1}
			{#if actor}
				<MediaSelector idx={Math.floor(index / 2)} {actor} imgCSS={IMGCSS} />
			{/if}
		{:else if actor}
			<ActorCard {actor} imgCSS={IMGCSS} />
		{:else}
			<ActorSelector actor={actor} index={Math.floor(index / 2)} imgCSS={IMGCSS}/>
		{/if}
	{/key}
</div>
