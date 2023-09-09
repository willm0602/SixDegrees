import { env } from '$env/dynamic/private';
import type Media from '$lib/Game/Media';
import TMDBClient from '$lib/TMDBWrapper';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent): Promise<Response> {
	const mediaID: string = request.url.searchParams.get('media') || '';
	const mediaType: string = request.url.searchParams.get('mediaType') || 'movie';

	const media: Media = {
		// passing in the title can lead to weird behavior and we don't need it for this query
		title: '',
		tmdbID: parseInt(mediaID),
		// @ts-ignore
		mediaType: mediaType,
		posterPath: ''
	}

	const TMDB = new TMDBClient(env.API_KEY);
	const roles = await TMDB.getActorsForMedia(media);
	return json(roles);
}
