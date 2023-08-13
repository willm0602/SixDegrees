<script lang="ts">
	import type Actor from "$lib/Game/Actor";
	import type Media from "$lib/Game/Media";
	import MediaSelector from "./MediaSelector.svelte";
    import { game } from "$lib/dataStore";
    import ActorView from "./Actor.svelte"

    export let index: number = 0;
    let actor: Actor;
    let media: Media;
    if(index % 2 == 0){
        actor = $game?.actors[Math.floor(index / 2)];
    }
    else{
        media = $game?.media[Math.floor(index/2)];
        actor = $game?.actors[Math.floor(index/2)];
    }
</script>

<div class="mx-6">
    {#key game}
    {#if index % 2 == 1}
        <MediaSelector idx={Math.floor(index/2)} actor={actor}/>
    {:else}
        <ActorView actor={actor}/>
    {/if}
    {/key}
</div>
