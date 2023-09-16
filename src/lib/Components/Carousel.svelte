<script lang="ts">
	import { onMount } from 'svelte';

	import { carouselStart, cardCount, game, moveLeft, moveRight, screenWidthInPixels } from '$lib/dataStore';
	import isTablet, { isMobile } from '$lib/FrontendUtils';
	let carousel: HTMLElement;


	function canMoveLeft(){
		return $carouselStart > 0
	}

	function canMoveRight(){
		let rightBoundIndex = $carouselStart + $cardCount;
		return rightBoundIndex < ($game?.getPathSize() || 0);
	}

	onMount(() => {
		moveLeft.set(() => {
			if(canMoveLeft())
				carouselStart.set($carouselStart-1);
		});

		moveRight.set(() => {
			if(canMoveRight())
				carouselStart.set($carouselStart+1);
		});
	});
	const carouselClass = 'flex mx-auto mt-12 w-full' + (
		(isMobile() || isTablet()) ? '' : 'p-10'
	);
	console.log(isMobile(), isTablet());
</script>

{#key screenWidthInPixels}
	<div class={carouselClass}>
		<button
			class="btn h-10 self-center {
				canMoveLeft() ? 
				'variant-filled-surface' : 
				'variant-ghost-surface text-gray-700'} w-20"
			on:click={() => {
				$moveLeft();
			}}
			>
			<iconify-icon icon="octicon:arrow-left-16" class="text-4xl" />
		</button>

		<div class="relative flex-grow">
			<div class="flex overflow-x-hidden min-h-[16rem] justify-center" bind:this={carousel}>
				<slot />
			</div>
		</div>

		<button
			class="btn {canMoveRight() ? 'variant-filled-surface' : 'variant-ghost-surface text-gray-700'} h-10 self-center w-20"
			on:click={() => {
				$moveRight();
			}}><iconify-icon icon="octicon:arrow-right-16" class="text-4xl" />
		</button>
	</div>

{/key}