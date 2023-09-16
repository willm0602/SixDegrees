import { get } from "svelte/store";
import { screenWidthInPixels } from "./dataStore";

const MOBILE_MAX = 700;
const TABLET_MAX = 1280;

export function isMobile(){
    return get(screenWidthInPixels) < MOBILE_MAX;
}

export default function isTablet(){
    return !isMobile() && get(screenWidthInPixels) < TABLET_MAX;
}