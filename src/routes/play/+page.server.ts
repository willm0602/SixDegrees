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
	const actor1 = firstActorIDUnparsed ?
							await TMDB.getActorByID(parseInt(firstActorIDUnparsed)):
					   		await TMDB.getRandomActor();

	const actor2 = secondActorIDUnparsed ?
			     		await TMDB.getActorByID(parseInt(secondActorIDUnparsed)):
		   				await TMDB.getRandomActor(actor1.tmdbID);

	return {
		actors: [actor1, actor2]
	};
}