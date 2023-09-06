/* eslint-disable @typescript-eslint/no-explicit-any */
// wrapper for the TMDB API
// https://developer.themoviedb.org/v3/docs

import type Actor from './Game/Actor';
import type Media from './Game/Media';
import type Role from './Game/Role';
import { delay, getFromCache, setCacheVal } from './ServerUtils';

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

const InvalidTVGenres = [
	// Dont count talk-shows
	10767
];

const InvalidActorIDs = [
	// Actors that we don't want to include in queries
	58021,
	1465528
]

type TMDBActorResponse = {
	results: TMDBActorInfo[];
};

type TMDBActorInfo = {
	known_for: any;
	name: string;
	profile_path: string;
	id: number;
	popularity: number;
};

export default class TMDBClient {
	API_KEY: string;

	constructor(API_KEY: string) {
		this.API_KEY = API_KEY;
	}

	// makes a GET call to the TMDB API
	// returns a promise
	async get(path: string, params: any = {}): Promise<any> {
		try {
			const url = new URL('https://api.themoviedb.org/3/' + path);
			url.searchParams.append('api_key', this.API_KEY);
			url.searchParams.append('language', 'en-US');
			for (const key in params) {
				url.searchParams.append(key, params[key]);
			}
			return fetch(url.toString(), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				}
			})
				.then(async (response) => {
					const res = await response.json();
					return await res;
				})
				.catch(async () => {
					await delay(1000);
					return this.get(path, params);
				});
		} catch (e) {
			console.error(e);
			throw 'GET ERROR';
		}
	}

	async getRandomActor(excludeID?: number | undefined): Promise<Actor> {
		const page = Math.floor(Math.random() * 10 + 1);
		const actors: TMDBActorResponse = await this.get('person/popular', { page });
		const MIN_POPULARITY = 35;
		const idsToExclude = InvalidActorIDs;
		if(excludeID)
			idsToExclude.push(excludeID);
		const popularActors = actors.results.filter((actor: TMDBActorInfo) => {
			if (actor.popularity <= MIN_POPULARITY) return false;
			if (idsToExclude.includes(actor.id)) {
				return false;
			}
			for (const knownWork of actor.known_for) {
				if (knownWork.original_language == 'en') {
					return true;
				}
			}
			return false;
		});
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const wrapper = this;
		if (popularActors.length == 0) {
			return await wrapper.getRandomActor();
		}
		const index = Math.floor(Math.random() * popularActors.length);
		const actorInfo = popularActors[index];
		return {
			name: actorInfo.name,
			profile_path: actorInfo.profile_path,
			tmdbID: actorInfo.id
		}
	}

	async getActorRoles(id: number): Promise<Role[]> {
		const movieCredits = await this.getMovieCreditsForActor(id);
		const tvCredits = await this.getTVCreditsForActor(id);
		const foundTitles: string[] = [];
		const allCredits = [...movieCredits, ...tvCredits].filter((role: Role) => {
			if (role.media == undefined) return false;
			if (foundTitles.includes(role.media.title)) {
				return false;
			}
			foundTitles.push(role.media.title);
			return true;
		});

		const credits = allCredits.sort((a, b) => {
			if (a.media == undefined) return -1;
			if (b.media == undefined) return 1;
			return a.media.title.localeCompare(b.media.title);
		});
		return credits;
	}

	async getMovieCreditsForActor(id: number): Promise<Role[]> {
		const movieData = await this.get(`person/${id}/movie_credits`);
		if (movieData) {
			const actingCredits = movieData.cast;
			const roles: Role[] = actingCredits.map(
				(credit: { poster_path: string; character: any; title: any; id: any }) => {
					const media: Media = {
						title: credit.title,
						tmdbID: credit.id,
						mediaType: 'movie',
						posterPath: credit.poster_path
					};
					return {
						actorID: id,
						media,
						characterName: credit.character
					};
				}
			);
			return roles;
		}
		return [];
	}

	async getTVCreditsForActor(id: number): Promise<Role[]> {
		const tvData = await this.get(`person/${id}/tv_credits`);
		const actingCredits = tvData.cast;
		if (actingCredits) {
			const validActingCredits = actingCredits.filter((credit: { genre_ids: number[] }) => {
				for (const invalidGenre of InvalidTVGenres) {
					if (credit.genre_ids.includes(invalidGenre)) return false;
				}
				return true;
			});
			const roles: Role[] = validActingCredits.map(
				(credit: {
					poster_path: string;
					original_name: string;
					character: string;
					title: string;
					id: number;
				}) => {
					const media: Media = {
						title: credit.original_name,
						tmdbID: credit.id,
						mediaType: 'tv',
						posterPath: credit.poster_path
					};
					return {
						actorID: id,
						media,
						characterName: credit.character
					};
				}
			);
			return roles;
		}
		return [];
	}

	async getActorsForMedia(media: Media): Promise<Actor[]> {
		if (!media) {
			return [];
		}
		if (media.mediaType == 'movie') {
			const res = await this.get(`movie/${media.tmdbID}/credits`);
			if (res) {
				const castData = res.cast;
				return castData.map((actor: { [x: string]: any }): Actor => {
					return {
						name: actor['name'],
						tmdbID: actor['id'],
						profile_path: actor['profile_path']
					};
				});
			}
		}
		if (media.mediaType == 'tv') {
			const res = await this.get(`tv/${media.tmdbID}/aggregate_credits`);
			if (res) {
				const castData = await this.get(`tv/${media.tmdbID}/aggregate_credits`);
				return castData.cast.map((actor: { [x: string]: any }): Actor => {
					return {
						name: actor['name'],
						tmdbID: actor['id'],
						profile_path: actor['profile_path']
					};
				});
			}
		}
		return [];
	}

	async getActorByID(id: number): Promise<Actor>{
		const req: TMDBActorInfo = await this.get(`person/${id}`);
		if(req.id){
			return {
				tmdbID: id,
				name: req.name,
				profile_path: req.profile_path,
			}
		}
		const fallbackActor: Actor = await this.getRandomActor();
		return fallbackActor;
	}
}
