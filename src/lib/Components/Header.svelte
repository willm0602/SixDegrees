<script lang="ts">
	import HeaderLink from './HeaderLink.svelte';
	import openHelpModal from './types/HelpModal';
</script>

<div class="w-full h-14 bg-surface-700 flex">
	<HeaderLink route={'/'}><span>Six Degrees</span></HeaderLink
	>
	<HeaderLink route={'/play'}>New Game</HeaderLink>
	<HeaderLink onClick={() => {
		openHelpModal();
	}}>How to Play?</HeaderLink>
	<HeaderLink route='/credits'>Credits</HeaderLink>

</div>
