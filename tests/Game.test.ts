/* eslint-disable prefer-const */
import {expect, test} from 'vitest';
import {faker} from "@faker-js/faker";

import Game from '$lib/Game/Game';
import type Actor from '$lib/Game/Actor';
import type Media from '$lib/Game/Media';

/**
 * Test data
 */

function getFakeActor(): Actor{
    const testActor: Actor = {
        name: faker.person.fullName(),
        profile_path: 'TMDB PROFILE PATH',
        tmdbID: -1
    };
    return testActor;
}

function getFakeMedia(): Media{
    const testMedia: Media = {
        title: faker.color.human() + ' ' + faker.commerce.product(),
        tmdbID: -1,
        mediaType: Math.random() < 0.5 ? 'movie' : 'tv',
        posterPath: 'TMDB PROFILE PATH'
    }
    return testMedia;
}

function getFakeGame(): Game{
    let game = new Game(getFakeActor(), getFakeActor());
    const mediaCount = Math.random() * 5;
    for(let idx = 0; idx < mediaCount; idx++){
        game.setMedia(idx, getFakeMedia());
        game.setActor(idx+1, getFakeActor());
    }
    return game;
}

let fakeActors: Actor[] = [];
for(let _ = 0; _ < 30; _++){
    fakeActors.push(getFakeActor());
}












/**
 * Tests for Game class functions
 */

let actor1 = fakeActors[Math.floor(Math.random() * fakeActors.length)];
let actor2 = fakeActors[Math.floor(Math.random() * fakeActors.length)];
let game = new Game(actor1, actor2);



// tests for the constructor
test('After a game is constructed, actor1 and actor2 should be two actors passed in',
    () => {
        expect(game.actor1).toEqual(actor1);
        expect(game.actor2).toEqual(actor2);
    }
);

test('After a game is constructed, the list of actors should just be the first actor',
    () => {
        expect(game.actors).toEqual([actor1]);
    }
);

test('After a game is constructed, there should be a single media that is undefined',
    () => {
        expect(game.media).toEqual([undefined]);
    }
);


// tests for swap function
test('After swapping, media should just contain a single undefined media and actors should contain the other actor',
    () => {
        const game = new Game(actor1, actor2);
        game.swap();
        expect(game.actors).toEqual([game.actor2]);
        expect(game.media).toEqual([undefined]);
        game.swap();
        expect(game.actors).toEqual([game.actor1]);
        expect(game.media).toEqual([undefined]);
    }
);


// tests for path size function
test('pathSize should return the total of the amount of media and the amount of actors',
    () => {
        for(let _ = 0; _ < 100; _++){
            const game = getFakeGame();
            const actorSize = game.actors.length;
            const mediaSize = game.media.length;
            expect(actorSize+mediaSize).eq(game.getPathSize())
        }
    }
)

test('setMedia works for setting media below the max length',
    () => {
        for(let _ = 0; _ < 100; _++){
            const game = getFakeGame();
            const originalActors = game.actors;
            const originalMedia = game.media;
            const index = Math.floor(Math.random() * game.media.length);
            const fakeMedia = getFakeMedia();
            game.setMedia(index, fakeMedia);
            let expectedMedia = originalMedia;
            expectedMedia[index] = fakeMedia;
            expectedMedia = expectedMedia.splice(0, index+1);
            const expectedActors = originalActors;
            expectedActors.splice(index+1);
            expectedActors.push(undefined);
            expect(game.actors, 'Actors are removed after the media index and retained before').toEqual(expectedActors);
            expect(game.media, 'Media are removed after the media index and retained before').toEqual(expectedMedia);
        }
    }
)

test('setMedia works for setting media at the index',
    () => {
        for(let _ = 0; _ < 100; _++){
            const game = getFakeGame();
            const originalActors = game.actors;
            const originalMedia = game.media;
            const index = game.media.length - 1;
            const fakeMedia = getFakeMedia();
            game.setMedia(index, fakeMedia);
            let expectedMedia = originalMedia;
            expectedMedia[index] = fakeMedia;
            expectedMedia = expectedMedia.splice(0, index+1);
            const expectedActors = originalActors;
            expectedActors.splice(index+1);
            expectedActors.push(undefined);
            expect(game.actors, 'Actors are removed after the media index and retained before').toEqual(expectedActors);
            expect(game.media, 'Media are removed after the media index and retained before').toEqual(expectedMedia);
        }
    }
)