<script lang="ts">
	import openHelpModal from '$lib/Components/Modals/HelpModal';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';

	function openModal() {
		openHelpModal();
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
