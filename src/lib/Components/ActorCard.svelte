<script lang="ts">
	import type Actor from '$lib/Game/Actor';

	import UnknownImg from '$lib/assets/unknown.png';

	export let actor: Actor | undefined;

	export let imgCSS = '';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a class="flex flex-col items-center justify-center text-center {imgCSS} relative" rel="tooltip" title={actor?.name}>
	{#if actor}
		{#if actor.profile_path}
			<img
				class={imgCSS + ' opacity-50'}
				src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
				alt={`Poster for ${actor.name}`}
			/>
		{:else}
			<img class={imgCSS} src={UnknownImg} alt={`Unselected movie`} />
		{/if}
		<span class="absolute">{actor.name}</span>
	{:else}
		<img class={imgCSS} src={UnknownImg} alt={`Unselected movie`} />
	{/if}
</a>
