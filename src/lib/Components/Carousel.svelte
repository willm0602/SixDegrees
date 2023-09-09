<script lang="ts">
	import { onMount } from 'svelte';

	import { moveLeft, moveRight } from '$lib/dataStore';
	let carousel: HTMLElement;

	onMount(() => {
		moveLeft.set(() => {
			carousel.scrollLeft -= 160;
		});

		moveRight.set(() => {
			carousel.scrollLeft += 160;
		});
	});
</script>

<div class="flex mx-auto mt-12 pb-4">
	<button
		class="btn h-10 self-center variant-filled-surface"
		on:click={() => {
			$moveLeft();
		}}
	>
		<iconify-icon icon="octicon:arrow-left-16" class="text-4xl" />
	</button>
	<div class="relative max-w-lg">
		<div class="flex overflow-x-scroll min-h-[16rem]" bind:this={carousel}>
			<slot />
		</div>
	</div>
	<button
		class="btn variant-filled-surface h-10 self-center"
		on:click={() => {
			$moveRight();
		}}><iconify-icon icon="octicon:arrow-right-16" class="text-4xl" /></button
	>
</div>
