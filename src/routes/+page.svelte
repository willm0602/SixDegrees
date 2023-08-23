<script lang="ts">
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	const modal: ModalSettings = {
		type: 'alert',
		// Data
		title: 'How to play',
		body: 'The goal of the game is to connect two actors in the least amount of steps possible by connecting them with movies or shows they have both appeared in. The idea comes from the popular game, <a class="text-secondary-500 hover:text-secondary-700" href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon">Six Degrees of Kevin Bacon".</a>',
		buttonTextCancel: 'Close',
		backdropClasses: 'text-secondary-300 bg-secondary-300'
	};

	function openModal() {
		modalStore.trigger(modal);
	}
</script>

<div class="sixdegrees h-full flex flex-col items-center justify-center font-sans">
	<h1 class="text-7xl text-primary-400">Six Degrees</h1>
	<Modal />
	<a href="/play" class="text-4xl mt-12 text-secondary-300 hover:text-secondary-800 cursor-pointer"
		>Play</a
	>
	<button
		class="text-4xl mt-4 text-secondary-300 hover:text-secondary-800 cursor-pointer"
		on:click={openModal}>How to Play</button
	>
</div>
