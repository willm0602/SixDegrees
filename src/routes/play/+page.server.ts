import TMDBClient from '$lib/TMDBWrapper';

import { env } from '$env/dynamic/private';
import type Actor from '$lib/Game/Actor';
import type { RequestEvent } from './$types';

export async function load(request: RequestEvent): Promise<{ actors: Actor[]; }> {
	const TMDB = new TMDBClient(env.API_KEY);
	const {url} = request;
	const params = url.searchParams;
	const firstActorIDUnparsed = params.get('first');
	const secondActorIDUnparsed = params.get('second');
	const actor1Info = firstActorIDUnparsed ?
							await TMDB.getActorByID(parseInt(firstActorIDUnparsed)):
					   		await TMDB.getRandomActor();

	const actor2Info = secondActorIDUnparsed ?
			     		await TMDB.getActorByID(parseInt(secondActorIDUnparsed)):
		   				await TMDB.getRandomActor(actor1Info.id);

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