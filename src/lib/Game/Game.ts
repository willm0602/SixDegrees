import type Actor from './Actor';
import type Media from './Media';

type OptionalActor = Actor | undefined;
type OptionalMedia = Media | undefined;

export default class Game {
	actor1: Actor;
	actor2: Actor;
	actors: OptionalActor[];
	media: OptionalMedia[];
	startTime: Date | undefined;
	endTime: Date | undefined;

	constructor(actor1: Actor, actor2: Actor) {
		this.actor1 = actor1;
		this.actor2 = actor2;

		this.actors = [this.actor1];
		this.media = [undefined];
	}

	swap(): Game {
		if (this.actors[0] == this.actor1) {
			this.actors = [this.actor2];
			this.media = [undefined];
		} else {
			this.actors = [this.actor1];
			this.media = [undefined];
		}
		return this;
	}

	getPathSize(): number {
		return this.actors.length + this.media.length;
	}

	setMedia(index: number, media: Media) {
		this.media = this.media.slice(0, index);
		this.actors = this.actors.slice(0, index + 1);
		this.media.push(media);
		this.actors.push(undefined);
		return this;
	}

	setActor(index: number, actor: Actor) {
		this.media = this.media.slice(0, index);
		this.actors = this.actors.slice(0, index);
		this.actors.push(actor);
		if (this.canAddMedia()) {
			this.media.push(undefined);
		}
		return this;
	}

	gameHasWon(): boolean {
		return this.hasActor(this.actor1) && this.hasActor(this.actor2);
	}

	hasActor(actor: Actor): boolean {
		for (const actorInList of this.actors) if (actor?.tmdbID == actorInList?.tmdbID) return true;
		return false;
	}

	canAddMedia(): boolean{
		return this.media.length < 6 && !this.gameHasWon();
	}

	start() {
		if (this.startTime == undefined) {
			this.startTime = new Date();
		}
	}

	finish() {
		if (this.endTime == undefined) this.endTime = new Date();
	}

	getTotalTime(): Date | undefined {
		if (this.startTime && this.endTime) {
			const timeAsNum = this.endTime.getTime() - this.startTime.getTime();
			return new Date(timeAsNum);
		}
	}

	getLastActor(): OptionalActor {
		return this.actors[this.actors.length - 1];
	}
}
