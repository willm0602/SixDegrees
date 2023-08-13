<script lang="ts">
	import Actor from "$lib/Components/Actor.svelte";
	import GameView from "$lib/Components/Game.svelte";
	import Game from "$lib/Game/Game.js";
	import { game } from "$lib/dataStore.js";

    export let data;
    const {actors} = data;
    const initGame = new Game(actors[0], actors[1]);

    game.set(initGame);

    const actor1 = actors[0];
    const actor2 = actors[1];

</script>

<div class="h-full flex flex-col p-10">
    <div class="flex align-center justify-center h-fit">
        <Actor actor={actor1}/>
        <span class="h2 mx-10 flex items-center">To</span>
        <Actor actor={actor2} />
    </div>
    <GameView/>
</div>