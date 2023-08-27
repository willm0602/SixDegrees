import { API_KEY } from "$env/static/private";
import TMDBClient from "$lib/TMDBWrapper";
import { expect, test } from "vitest";

// generate a test wrapper to connect to the TMDB API
const TMDB = new TMDBClient(API_KEY);

// Test that we can query TMDB API
test('We can make a call to the TMDB API with our wrapper using our custom /get function', async () => {
    const res = await TMDB.get('authentication');
    console.log(res);
    expect(res, 'Did not get a response from TMDB');
})