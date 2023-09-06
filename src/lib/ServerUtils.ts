// Utilities for stuff that we want to use on the server side

import { env } from '$env/dynamic/private';
import fs from "fs";
import { createClient } from 'redis';

const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60

const redisClient = createClient({
    url: env.CACHE_URL
});

await redisClient.connect();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isLocal = env.ENV == 'local';

async function getFromCache(key: string): Promise<string | null>{
    return await redisClient.get(key);
}

async function setCacheVal(
    key: string,
    val: string,
    durationInMS: number = THIRTY_DAYS_IN_SECONDS
) {
    await redisClient.set(
        key,
        val,
        {
            EX: durationInMS,
            NX: true
        }
    )
}



export { delay, isLocal, setCacheVal, getFromCache };
