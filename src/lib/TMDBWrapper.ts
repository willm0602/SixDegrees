// wrapper for the TMDB API
// https://developer.themoviedb.org/v4/docs

import type Actor from './Game/Actor';
import type Media from './Game/Media';
import type Role from './Game/Role';

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
	get(path: string, params: any = {}) {
		try {
			const url = new URL('https://api.themoviedb.org/3/' + path);
			url.searchParams.append('api_key', this.API_KEY);
			url.searchParams.append('language', 'en-US');
			for (const key in params) {
				url.searchParams.append(key, params[key]);
			}
			console.log(url.href);
			return fetch(url.toString(), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'cache-control': 'public, max-age=3600'
				}
			})
				.then(async (response) => {
					console.log(response);
					return await response.json();
				})
				.catch((err) => {
					console.error('TMDB FETCH ERROR');
					console.log(url.href);
					console.error(err);
				});
		} catch (e) {
			console.error(e);
			throw 'GET ERROR';
		}
	}

	async getRandomActor(excludeID?: number | undefined): Promise<TMDBActorInfo> {
		const page = Math.floor(Math.random() * 10 + 1);
		const actors = await this.get('person/popular', { page });
		const MIN_POPULARITY = 40;
		const popularActors = actors.results.filter((actor: TMDBActorInfo) => {
			if (actor.popularity <= MIN_POPULARITY) return false;
			if (actor.id == excludeID) {
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
		return popularActors[index];
	}

	async getActorRoles(id: number): Promise<Role[]> {
		const movieCredits = await this.getMovieCreditsForActor(id);
		const tvCredits = await this.getTVCreditsForActor(id);
		const credits = [...movieCredits, ...tvCredits].sort((a, b) => {
			if (a.media == undefined) return -1;
			if (b.media == undefined) return 1;
			return a.media.title.localeCompare(b.media.title);
		});
		return credits;
	}

	async getMovieCreditsForActor(id: number): Promise<Role[]> {
		const movieData = await this.get(`person/${id}/movie_credits`);
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

	async getTVCreditsForActor(id: number): Promise<Role[]> {
		const tvData = await this.get(`person/${id}/tv_credits`);
		const actingCredits = tvData.cast;
		const roles: Role[] = actingCredits.map(
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

	async getActorsForMedia(media: Media): Promise<Actor[]> {
		if (!media) {
			return [];
		}
		if (media.mediaType == 'movie') {
			const res = await this.get(`movie/${media.tmdbID}/credits`);
			const castData = res.cast;
			return castData.map((actor: { [x: string]: any }): Actor => {
				return {
					name: actor['name'],
					tmdbID: actor['id'],
					profile_path: actor['profile_path']
				};
			});
		}
		if (media.mediaType == 'tv') {
			const res = await this.get(`tv/${media.tmdbID}/credits`);
			const castData = res.cast;
			return castData.map((actor: { [x: string]: any }): Actor => {
				return {
					name: actor['name'],
					tmdbID: actor['id'],
					profile_path: actor['profile_path']
				};
			});
		}
		return [];
	}
}
