import { writable, type Writable } from 'svelte/store';
import type Game from './Game/Game';

const game: Writable<Game | undefined> = writable(undefined);

const editingActorIndex: Writable<number> = writable(0);
const editingMediaIndex: Writable<number> = writable(0);
const moveLeft: Writable<CallableFunction> = writable(() => {
	console.warn('Error: Move Left has been called but not defined');
});
const moveRight: Writable<CallableFunction> = writable(() => {
	console.warn('Error: Move Left has been called but not defined');
});

const carouselStart = writable(0);
const cardCount = writable(1);
const screenWidthInPixels = writable(0);

export { game, editingActorIndex, editingMediaIndex, moveLeft, moveRight, carouselStart, cardCount, screenWidthInPixels };
