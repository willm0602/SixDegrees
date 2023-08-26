import {test} from "vitest";

import { API_KEY } from "$env/static/private";
import TMDBClient from "$lib/TMDBWrapper";

const tmdb = new TMDBClient(API_KEY);

test()