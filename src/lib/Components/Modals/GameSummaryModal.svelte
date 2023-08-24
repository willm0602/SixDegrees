<script lang="ts">
    import {game} from "$lib/dataStore";
	import ActorCard from "../ActorCard.svelte";

    const css = "w-30 h-44";
    const totalTime: Date | undefined = $game?.getTotalTime();
</script>

{#if $game}
    <div class="w-3/4 h-3/4 bg-surface-800">
        <h2 class="h2 text-center pt-4 text-primary-300">{$game.actors[0]?.name} to {$game.lastActor()?.name}</h2>
        <div class="mx-10 mt-10 flex mw-9/10 flex-wrap items-center justify-center">
            {#each $game.media as media, idx}
            <div class="li pb-4 flex mx-10">
                {#if $game.actors[idx]}
                    <ActorCard actor={$game.actors[idx]} imgCSS="{css}"/>
                {/if}
                {#if media}
                    <img
                        class="{css}"
                        src={`https://image.tmdb.org/t/p/w300/${media.posterPath}`}
                        alt={`Image of ${media.title}`}
                    />
                {/if}
                {#if $game.actors[idx+1]}
                    <ActorCard actor={$game.actors[idx+1]} imgCSS="{css}"/>
                {/if}
            </div>
            {/each}
        </div>
        <h2 class="h2 text-center">
            {#if totalTime}
                Completed in {totalTime.getMinutes()}:{(totalTime.getSeconds() < 10) ? '0' : ''}{totalTime.getSeconds()}
            {:else}
                Error getting time!
            {/if}
        </h2>
        <div class="flex space-evenly w-full justify-center mt-8">
            <button class="btn variant-filled-surface mx-10" on:click={()=>{window.location.reload();}}>Try this pairing again</button>
            <a class="cursor-pointer btn variant-filled-surface mx-10" href="/play" data-sveltekit-reload>Try a new game</a>
        </div>
    </div>
{/if}