<script lang="ts">
	import type Actor from "$lib/Game/Actor";
	import { modalStore, type ModalComponent, type ModalSettings, Modal } from "@skeletonlabs/skeleton";

    import {game} from "$lib/dataStore";

    import UnknownImg from "$lib/assets/unknown.png";

    import ActorSelectModal from "./Modals/ActorSelectModal.svelte";
	import type Media from "$lib/Game/Media";

    export let index: number;
    export let actor: Actor;
    export let css: string;

    const media: Media = $game?.media[index];

    const modalComponentRegistry: Record<string, ModalComponent> = {
        actorSelectModal: {
            ref: ActorSelectModal,
            props: {
                actor,
                media,
                index
            }
        },
    };

    const showModal = (component: string) => {
        const modal: ModalSettings = {
            type: 'component',
            component: component,
        };
        modalStore.trigger(modal);
    }

</script>

<div class="flex flex-col items-center">
    {#if media}
        <button class="flex flex-col justify-center items-center" on:click={()=>{showModal('actorSelectModal')}}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a rel="tooltip" title="{actor?.name}">
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

<Modal components={modalComponentRegistry} />