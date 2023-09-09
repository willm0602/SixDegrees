import { API_KEY } from '$env/static/private';
import TMDBClient from '$lib/TMDBWrapper';
import { expect, test } from 'vitest';

// generate a test wrapper to connect to the TMDB API
const TMDB = new TMDBClient(API_KEY);

// Test that we can query TMDB API
test('We can make a call to the TMDB API with our wrapper using our custom /get function', async () => {
	const res = await TMDB.get('authentication');
	expect(res.success, 'Did not get a response from TMDB').toBeTruthy();
});

test('getRandomActor should return an object of the Actor type', async () => {
	const randomActor = await TMDB.getRandomActor();
	expect(randomActor, 'RandomActor doesnt have name').toHaveProperty('name');
	expect(randomActor, 'RandomActor doesnt have profile_path').toHaveProperty('profile_path');
	expect(randomActor, 'RandomActor doesnt have tmdbID').toHaveProperty('tmdbID');
});
