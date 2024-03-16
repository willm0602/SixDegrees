<script lang="ts">
	import type Role from '$lib/Game/Role'
    import type SearchOption from '../types/SearchOption';
	import { writable } from 'svelte/store';

	import 'iconify-icon';

	import { game } from '$lib/dataStore';
	import { editingMediaIndex, moveRight } from '$lib/dataStore';
	import { modalStore } from '@skeletonlabs/skeleton';
	import SelectModal from './SelectModal.svelte';

	const idx = $editingMediaIndex;
	const actor = $game?.actors[idx];

    type MediaSelectOption = SearchOption<Role>;

	const getActorRoles = async (): Promise<MediaSelectOption[]> => {
		if (actor) {
			const roles = await fetch(`/api/getRoles?id=${actor.tmdbID}`, {
				cache: 'force-cache'
			});
			return roles.json().then((data) => {
				if (data) {
					const roles = data.filter((role: Role) => {
						return role.media.posterPath;
					}).map((role: Role): MediaSelectOption => {
                        return {
                            name: role.characterName + ' in ' + role.media.title,
                            image: `https://image.tmdb.org/t/p/w300/${role.media.posterPath}`,
                            option: role
                        }
                    });
                    return roles;
				}
                const res: MediaSelectOption[] = [];
                return res;
			});
		}
		const res: MediaSelectOption[] = [];
        return res;
	};

    function onClick(option: SearchOption<Role>): void{
        game.set($game?.setMedia(idx, option.option.media));
        modalStore.close();
        $moveRight();
    }
</script>

<SelectModal
    getOptions={getActorRoles()}
    onSelect={onClick}
/>
