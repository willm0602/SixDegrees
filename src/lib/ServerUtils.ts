// Utilities for stuff that we want to use on the server side

import { env } from '$env/dynamic/private';
import { createClient } from 'redis';

const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60;

const redisClient = createClient({
	url: env.CACHE_URL
});

// await redisClient.connect();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isLocal = env.ENV == 'local';

async function getFromCache(key: string): Promise<string | null> {
	// const cacheVal = await redisClient.get(key);
	// console.log(`[CACHE] Requested ${key}\n Got ${cacheVal || 'None'}\n\n\n`);
	// return cacheVal;
	return null;
}

async function getObjectFromCache(key: string): Promise<any | null> {
	// const dataAsString = await getFromCache(key);
	// try {
	// 	return JSON.parse(dataAsString || '');
	// } catch {
	// 	console.error(`${dataAsString} is not valid JSON`);
	// 	return null;
	// }
	return null;
}

async function setCacheVal(
	key: string,
	val: string,
	durationInMS: number = THIRTY_DAYS_IN_SECONDS
) {
	// console.log(`[CACHE] SETTING ${key}\n TO ${val}\n\n\n`);
	// await redisClient.set(key, val, {
	// 	EX: durationInMS,
	// 	NX: true
	// });
}

async function clearCacheKey(key: string){
	// console.log(`[CACHE] CLEARING CACHE FOR ${key}`);
	// await redisClient.del([key]);
}

export {
	delay,
	isLocal,
	setCacheVal,
	getFromCache,
	getObjectFromCache,
	clearCacheKey
};
