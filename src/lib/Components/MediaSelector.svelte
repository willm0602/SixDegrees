<script lang="ts">
	import type Actor from '$lib/Game/Actor';
	import { editingMediaIndex, game } from '$lib/dataStore';
	import UnknownImg from '$lib/assets/unknown.png';
	import {
		modalStore,
		type ModalSettings,
	} from '@skeletonlabs/skeleton'; // Import modalStore
	import { writable, type Writable } from 'svelte/store';
	import type Media from '$lib/Game/Media';

	export let idx: number = 0;
	export let actor: Actor;
	export let imgCSS = '';

	const media: Writable<Media | undefined> = writable($game && $game.media.length > idx ? $game.media[idx] : undefined);

	const showModal = (component: string) => {
		editingMediaIndex.set(idx);

		const modal: ModalSettings = {
			type: 'component',
			component: component
		};
		modalStore.trigger(modal);
	};

	const mediaTitleWords = $media ? $media.title.split(' ') : [];
	const mediaTitleLongestWord: string = 
		mediaTitleWords.length ?
		mediaTitleWords.reduce((prev, curr) => {
				if(prev.length > curr.length){
					return prev;
				}
				return curr;
			}) :
		''

	const fontSize = (
		! $media ? 'xs'
		: mediaTitleLongestWord.length < 8 ? 'xl'
		: mediaTitleLongestWord.length < 12 ? 'lg'
		: mediaTitleLongestWord.length < 16 ? 'base'
		: 'sm'
	)
</script>

<div class="flex relative flex-col justify-center text-center items-center {imgCSS}">
	{#if actor}
		<button
			class="flex flex-col justify-center items-center"
			on:click={() => {
				showModal('mediaSelectModal');
			}}
		>
			{#if $media}
				<img
					class={imgCSS + ' opacity-40'}
					src={$media ? `https://image.tmdb.org/t/p/w300/${$media.posterPath}` : UnknownImg}
					alt={`Poster for ${$media?.title}`}
				/>
				<span class="w-full absolute {`text-${fontSize}`}">{$media.title}</span>
			{:else}
				<img
					class={imgCSS}
					src={UnknownImg}
					alt={`Unselected movie`}
				/>
			{/if}
		</button>
	{:else}
		<span>ERROR LOADING ACTOR</span>
	{/if}
</div>
