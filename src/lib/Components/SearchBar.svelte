<script lang="ts">
	import type { Writable } from "svelte/store";

    export let value: Writable<string> | undefined;
</script>

<div class="w-full items-center flex justify-center">
    <div class="input w-1/2 m-8 flex focus-within:border-inherit">
        <iconify-icon icon="material-symbols:search" class="text-4xl" />
        <input type="text" class="flex-1 bg-surface-700 border-none focus:border-none focus-visible:border-none" bind:value={$value} />
    </div>
</div>