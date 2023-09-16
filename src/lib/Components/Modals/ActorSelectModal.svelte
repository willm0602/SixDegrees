<script lang="ts">
	import type Actor from "$lib/Game/Actor";
	import SelectModal from "./SelectModal.svelte";

	import { editingActorIndex, game, moveRight } from "$lib/dataStore";
	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import type SearchOption from "../types/SearchOption";

	const idx = $editingActorIndex;
	const media = $game?.media[idx - 1];

	type ActorSearchOption = SearchOption<Actor>

	const getCast = async (): Promise<ActorSearchOption[]> => {
		if (media) {
			const roles = await fetch(`/api/getActors?media=${media.tmdbID}&mediaType=${media.mediaType}`, {
				cache: 'force-cache'
			});
			return roles.json().then((data) => {
				if (data) {
					return data.filter((actor: Actor) => {
						return actor && actor.profile_path;
					}).map((actor: Actor): ActorSearchOption => {
						return {
							image: 'https://image.tmdb.org/t/p/w300/' + actor.profile_path,
							name: actor.name,
							option: actor
						}
					})
				}
			});
		}
		const result: ActorSearchOption[] = [];
		return result;
	};

	const gameSummaryModal: ModalSettings = {
		type: 'component',
		component: 'gameSummary'
	};
	function checkForWin() {
		if ($game?.gameHasWon()) {
			$game.finish();
			modalStore.trigger(gameSummaryModal);
		}
	}

	function onClick(searchOption: ActorSearchOption){
		game.set($game?.setActor(idx, searchOption.option));
		modalStore.close();
		$moveRight();
		checkForWin();
	}
</script>

<SelectModal
	getOptions={getCast()}
	onSelect={onClick}
/>

