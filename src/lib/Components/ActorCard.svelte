<script lang="ts">
	import type Actor from '$lib/Game/Actor';

	export let actor: Actor | undefined;

	export let imgCSS = '';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
	class="flex flex-col items-center justify-center text-center {imgCSS} relative"
	rel="tooltip"
	title={actor?.name}
>
	{#if actor}
		{#if actor.profile_path}
			<img
				class={imgCSS + ' opacity-20'}
				src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
				alt={`Poster for ${actor.name}`}
			/>
			<span class="absolute">{actor.name}</span>
		{:else}
			<div class={`${imgCSS} bg-surface-600 flex items-center text-lg`}>{actor.name}</div>
		{/if}
	{:else}
		<div class={`${imgCSS} bg-surface-600 flex items-center text-lg`}>Select an actor</div>
	{/if}
</a>
