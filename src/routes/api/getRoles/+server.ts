import { env } from '$env/dynamic/private';
import TMDBClient from '$lib/TMDBWrapper';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(request: RequestEvent): Promise<Response> {
	const params = request.params;
	const id = request.url.searchParams.get('id');

	if (id == null) {
		return json([]);
	}
	const TMDB = new TMDBClient(env.API_KEY);
	const roles = await TMDB.getActorRoles(parseInt(id));
	return json(roles);
}
