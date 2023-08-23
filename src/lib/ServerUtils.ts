// Utilities for stuff that we want to use on the server side

import { env } from '$env/dynamic/private';
import fs from "fs";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isLocal = env.ENV == 'local';

export { delay, isLocal };
