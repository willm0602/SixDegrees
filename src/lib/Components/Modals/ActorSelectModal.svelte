<script lang="ts">
	import type Actor from "$lib/Game/Actor";
    import type Media from "$lib/Game/Media";
    import type Role from "$lib/Game/Role";
	import { writable } from "svelte/store";

    import 'iconify-icon'

    import {game} from "$lib/dataStore";
	import { modalStore } from "@skeletonlabs/skeleton";

    export let media: Media;
    export let idx: number;

    let searchQuery = writable("");

    let allActors: Actor[];
    let foundActors: Actor[];

    searchQuery.subscribe((query) => {
        const lowercaseQuery = query.toLowerCase();
        if(allActors){
            foundActors = allActors.filter((actor) => {
                actor?.profile_path && actor.name.toLowerCase().includes(lowercaseQuery);
            })
        }
    })

    const getCast = async () => {
        if (media) {
            const roles = await fetch(`/api/getActors?media=${JSON.stringify(media)}`, {
                'cache': 'force-cache',
            });
            return roles.json().then((data) => {
                console.log(data);
                allActors = data.filter((actor: Actor) => {
                    return actor && actor.profile_path
                });
                foundActors = allActors;
            });
        }
        return [];
    }

    getCast();

</script>

<div class="w-3/4 h-3/4 max-h-3/4 overflow-y-scroll pt-1/4 bg-surface-800">
    <div class="w-full items-center flex justify-center">
        <div class="input w-1/2 m-8 flex">
            <iconify-icon icon="material-symbols:search" class="text-4xl"/>
            <input type="text" class="flex-1 bg-surface-700" bind:value={$searchQuery}>
        </div>
    </div>
    {#await getCast()}
        <span>Loading Roles...</span>
    {:then _}
        <div class="flex flex-wrap columns-3 bg-surface-800 max-h-9/10 justify-center">
            {#each foundActors as actor}
                <!-- svelte-ignore a11y-missing-attribute -->
                <a title="{`${actor?.name}`}" rel="tooltip">
                    <button class="card w-36 p-4 m-6 hover:bg-surface-600" on:click={() => {
                        game.set($game?.setActor(idx, actor));
                        modalStore.close();
                    }}>
                        <img class="w-full h-120" src={`https://image.tmdb.org/t/p/w300/${actor?.profile_path}`} alt={`Image of ${actor?.name}`}>
                    </button>
                </a>
            {/each}
        </div>
    {/await}
</div>