<script lang="ts">
    import type Actor from "$lib/Game/Actor";
    import type Role from "$lib/Game/Role";
    import { game } from "$lib/dataStore";
    import UnknownImg from "$lib/assets/unknown.png";
    import MediaSelectModal from "./Modals/MediaSelectModal.svelte";
    import { modalStore, type ModalSettings, type ModalComponent, Modal } from "@skeletonlabs/skeleton"; // Import modalStore
    import { writable } from "svelte/store";

    export let idx: number = 0;
    export let actor: Actor;
    export let css = "";

    const media = writable(($game && $game.media.length > idx) ? $game.media[idx] : undefined);

    const showModal = (component: string) => {
        const modal: ModalSettings = {
            type: 'component',
            component: component,
        };
        modalStore.trigger(modal);
    }

    const modalComponentRegistry: Record<string, ModalComponent> = {
        mediaSelectModal: {
            ref: MediaSelectModal,
            props: {
                actor,
                idx
            }
        },
    };
</script>

<div class="flex flex-col items-center">
    {#if actor}
        <button class="flex flex-col justify-center items-center" on:click={()=>{showModal('mediaSelectModal')}}>
            {#if $media}
            <img class="h-30 w-20 {css}" src={$media ? `https://image.tmdb.org/t/p/w300/${$media.posterPath}` : UnknownImg} alt={`Poster for ${$media?.title}`}/>
            <span>{$media.title}</span>
            {:else}
            <img style="height:7.5em;" class="h-30 w-20 {css}" src={UnknownImg} alt={`Unselected movie`}/>
            {/if}
        </button>
    {:else}
    <span>ERROR LOADING ACTOR</span>
    {/if}
</div>

<Modal components={modalComponentRegistry} />
