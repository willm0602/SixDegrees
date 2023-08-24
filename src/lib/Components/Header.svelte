<script lang="ts">
	import HeaderLink from "./HeaderLink.svelte";

</script>

<div class="w-full h-14 bg-surface-700 px-4 flex">
    <HeaderLink route={"/"} css={"ml-0 !bg-surface-700"}><span class="text-primary-500 font-sans">Six Degrees</span></HeaderLink>
    <HeaderLink route={"/play"} css="border-r-2 border-surface-600">Play</HeaderLink>
    <HeaderLink route={"/play"}>New Game</HeaderLink>
</div>