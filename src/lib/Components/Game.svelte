<script lang="ts">
	import type Game from "$lib/Game/Game";
    import { game } from "$lib/dataStore";
	import GamePath from "./GamePath.svelte";

    import 'iconify-icon'

    let currGame = $game as Game;

    game.subscribe((newGame) => {
        currGame = newGame as Game;
    })

    function swapOrder(){
        const gameWithSwappedOrder = $game?.swap();
        game.set(gameWithSwappedOrder);
    }

</script>

<div class="flex flex-col w-full mt-20 items-center justify-center">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button
        on:click={swapOrder}
    >
        <iconify-icon class="h2 cursor-pointer" 
        rel="tooltip" 
        title="Start from the other end" 
        icon="system-uicons:swap"
        ></iconify-icon>
    </button>

    <div class="flex">
        {#key $game}
        {#if $game}
        {#each {length: $game ? $game.pathSize() : 0} as _, idx }
            <GamePath index={idx}/>
        {/each}
        {/if}
        {/key}
    </div>
</div>