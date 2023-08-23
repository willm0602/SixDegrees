<!-- DEPRECATED: Use ActorCard instead -->

<script lang="ts">
	import type Actor from '$lib/Game/Actor';
	import { game } from '$lib/dataStore';
	import ActorSelector from './ActorSelector.svelte';

	export let actor: Actor;
	export let index: number = 0;
	export let imgCSS = '';


	const url = `https://image.tmdb.org/t/p/w300/${actor?.profile_path}`;
	const altText = actor ? `Image of actor ${actor.name}` : 'Undefined actor';

	function isRequiredActor(actor: Actor) {
		return actor == $game?.actor1 || actor == $game?.actor2;
	}
</script>

{#if isRequiredActor(actor)}
	<div class="actor flex flex-col justify-center items-center {imgCSS}">
		<img class={imgCSS} src={url} alt={altText} />
		<span>{actor ? actor.name : 'Unnamed Actor'}</span>
	</div>
{:else}
	<ActorSelector {index} {actor} {imgCSS} />
{/if}
