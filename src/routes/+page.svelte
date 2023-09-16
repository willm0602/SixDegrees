<script lang="ts">
	import openHelpModal from '$lib/Components/types/HelpModal';

	function openModal() {
		openHelpModal();
	}

	const linkCSS = 'text-3xl sm:text-4xl text-secondary-300 hover:text-secondary-800 cursor-pointer';
</script>

<div class="sixdegrees h-full flex flex-col items-center justify-center font-sans">
	<h1 class=" text-6xl sm:text-7xl text-primary-400 text-center">Six Degrees</h1>
	<a href="/play" class="{linkCSS} mt-12"
		>Play</a
	>
	<button
		class="{linkCSS} mt-4"
		on:click={openModal}>How to Play</button
	>
</div>
