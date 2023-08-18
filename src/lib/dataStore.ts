import { writable, type Writable } from 'svelte/store';
import type Game from './Game/Game';

const game: Writable<Game | undefined> = writable(undefined);

const editingActorIndex: Writable<number> = writable(0);
const editingMediaIndex: Writable<number> = writable(0);

export { game, editingActorIndex, editingMediaIndex };
