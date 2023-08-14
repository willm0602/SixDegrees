import Game from '../../lib/Game/Game';

import TMDBClient from '$lib/TMDBWrapper';

import { env } from '$env/dynamic/private';
import type Actor from '$lib/Game/Actor';

export async function load({ params }) {
	const TMDB = new TMDBClient(env.API_KEY);
	const actor1Info = await TMDB.getRandomActor();
	const actor2Info = await TMDB.getRandomActor(actor1Info.id);

	const actor1: Actor = {
		name: actor1Info.name,
		profile_path: actor1Info.profile_path,
		tmdbID: actor1Info.id
	};

	const actor2: Actor = {
		name: actor2Info.name,
		profile_path: actor2Info.profile_path,
		tmdbID: actor2Info.id
	};
	return {
		actors: [actor1, actor2]
	};
}
