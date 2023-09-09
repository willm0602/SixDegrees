import { env } from "$env/dynamic/private";
import { clearCacheKey } from "$lib/ServerUtils";
import { error, type RequestEvent } from "@sveltejs/kit";

const LOGIN_COOKIE = 'sixdegrees-login-token'

export async function load(request: RequestEvent){
    const {cookies, params} = request;

    const isLoggedIn = cookies.get(LOGIN_COOKIE) == env.ADMIN_KEY;

    return {
        isLoggedIn
    }
}

function assertAdmin(event: RequestEvent) {
    const {cookies} = event;
    const adminKeyFromCookies = cookies.get(LOGIN_COOKIE);
    if(!(adminKeyFromCookies == env.ADMIN_KEY)){
        throw error(404);
    }
}

export const actions = {
    login: async (event: RequestEvent) => {
        const cookies = event.cookies;
        const formData = await event.request.formData();
        const password = formData.get('password') || '';
        if(password == env.ADMIN_KEY){
            cookies.set(LOGIN_COOKIE, password);
            return {
                status: 200,
                wasSet: true
            }
        }
        return {
            status: 200,
            wasSet: false
        }
    },

    clearCacheKey: async (event: RequestEvent) => {
        assertAdmin(event);
        const formData = await event.request.formData();

        const cacheKey = formData.get('cache-key')?.toString() || '';
        try{
            await clearCacheKey(cacheKey);
            return {}
        }
        catch{
            throw error(500, 'Error clearing cache');
        }

    }
}