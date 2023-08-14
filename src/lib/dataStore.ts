import { writable, type Writable } from 'svelte/store';
import type Game from './Game/Game';

const game: Writable<Game | undefined> = writable(undefined);

export { game };
