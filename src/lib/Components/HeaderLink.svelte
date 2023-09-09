<script lang="ts">
	export let route: string | undefined = undefined;
	export let css: string = '';
	export let dontReload = false;
	export let onClick = () => {};
</script>

{#if route}
<a
	data-sveltekit-reload={dontReload ? 'off' : true}
	class="{css} cursor-pointer h-full flex items-center pt-2 pb-0 hover:bg-surface-900 bg-surface-800 border-r-2 border-r-surface-600 w-40 text-center flex justify-center"
	href={route}
	on:click={onClick}
>
	<slot />
</a>
{:else}
<button
	data-sveltekit-reload={dontReload ? 'off' : true}
	class="{css} cursor-pointer h-full flex items-center pt-2 pb-0 hover:bg-surface-900 bg-surface-800 border-r-2 border-r-surface-600 w-40 text-center flex justify-center"
	on:click={onClick}
>
	<slot />
</button>
{/if}