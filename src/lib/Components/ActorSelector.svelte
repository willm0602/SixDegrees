<script lang="ts">
	import type Actor from '$lib/Game/Actor';
	import {
		modalStore,
		type ModalSettings,
		Modal
	} from '@skeletonlabs/skeleton';

	import { editingActorIndex, game } from '$lib/dataStore';


	import type Media from '$lib/Game/Media';
	import ActorCard from './ActorCard.svelte';

	export let index: number;
	index;
	export let actor: Actor | undefined;
	export let imgCSS = '';
	const media: Media | undefined = $game?.media[index - 1];

	const showModal = () => {
		editingActorIndex.set(index);
		const modal: ModalSettings = {
			type: 'component',
			component: 'actorSelectModal'
		};
		modalStore.trigger(modal);
	};
</script>

<div class="flex flex-col items-center w-25">
	{#if media}
		<button
			class="flex flex-col justify-center items-center"
			on:click={() => {
				showModal();
			}}
		>
			<!-- svelte-ignore a11y-missing-attribute -->
			<ActorCard {actor} {imgCSS} />
		</button>
	{:else}
		<span>ERROR LOADING ACTOR</span>
	{/if}
</div>
