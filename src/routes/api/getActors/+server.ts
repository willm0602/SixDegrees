import { env } from '$env/dynamic/private';
import type Media from '$lib/Game/Media';
import TMDBClient from '$lib/TMDBWrapper';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent): Promise<Response> {
	console.log('afaf');
	const mediaData: string = request.url.searchParams.get('media') || '';
	console.log('Media', mediaData);

	const media: Media = JSON.parse(mediaData);

	const TMDB = new TMDBClient(env.API_KEY);
	const roles = await TMDB.getActorsForMedia(media);
	return json(roles);
}
