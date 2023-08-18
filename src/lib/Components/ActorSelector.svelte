<script lang="ts">
	import type Actor from "$lib/Game/Actor";
	import { modalStore, type ModalComponent, type ModalSettings, Modal } from "@skeletonlabs/skeleton";

    import {editingActorIndex, game} from "$lib/dataStore";

    import UnknownImg from "$lib/assets/unknown.png";

	import type Media from "$lib/Game/Media";

    export let index: number;
    (index);
    export let actor: Actor;
    export let css: string = "";

    const media: Media = $game?.media[index-1];

    const showModal = (component: string) => {
        editingActorIndex.set(index);
        const modal: ModalSettings = {
            type: 'component',
            component: component,
        };
        modalStore.trigger(modal);
    }

</script>

<div class="flex flex-col items-center w-25">
    {#if media}
        <button class="flex flex-col justify-center items-center" on:click={()=>{showModal('actorSelectModal')}}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="flex flex-col items-center" rel="tooltip" title="{actor?.name}">
                {#if actor}
                <img class="h-30 w-20 {css}" src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`} alt={`Poster for ${actor.name}`}/>
                <span>{actor.name}</span>
                {:else}
                <img style="height:7.5em;" class="h-30 w-20 {css}" src={UnknownImg} alt={`Unselected movie`}/>
                {/if}
            </a>
        </button>
    {:else}
    <span>ERROR LOADING ACTOR</span>
    {/if}
</div>
