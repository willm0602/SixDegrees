/* eslint-disable prefer-const */
import {expect, test} from 'vitest';
import {faker} from "@faker-js/faker";

import Game from '$lib/Game/Game';
import type Actor from '$lib/Game/Actor';
import type Media from '$lib/Game/Media';

/**
 * Test data
 */

let testActorsMade = 0;
let testMediaMade = 0;

function getFakeActor(): Actor{
    const testActor: Actor = {
        name: faker.person.fullName(),
        profile_path: 'TMDB PROFILE PATH',
        tmdbID: testActorsMade
    };
    testActorsMade+=1;

    return testActor;
}

function getFakeMedia(): Media{
    const testMedia: Media = {
        title: faker.color.human() + ' ' + faker.commerce.product(),
        tmdbID: testMediaMade,
        mediaType: Math.random() < 0.5 ? 'movie' : 'tv',
        posterPath: 'TMDB PROFILE PATH'
    }
    testMediaMade+=1;
    return testMedia;
}

function getFakeGame(minMediaCount = 0): Game{
    let game = new Game(getFakeActor(), getFakeActor());
    const mediaCount = minMediaCount + Math.random() * (5 - minMediaCount);
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


// tests for setting media
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


// tests for setting actors
test('setActor works for setting an actor in the middle',
    () => {
        for(let _ = 0; _ < 100; _++){
            const game = getFakeGame();
            const originalActors = game.actors;
            const originalMedia = game.media;
            const index = 1 + Math.floor(game.actors.length - 2);
            const fakeActor = getFakeActor();
            game.setActor(index, fakeActor);
            let expectedActors = originalActors;
            expectedActors[index] = fakeActor;
            expectedActors = expectedActors.splice(0, index+1);
            const expectedMedia = originalMedia.splice(0, index+1);
            expect(game.actors, 'After setting an actor, all following actors should be cleared').toEqual(expectedActors);
            expect(game.media, `[${index}] After setting an actor, all following media should be cleared`).toEqual(expectedMedia);
        }
    }
)

test('setActor works for setting an actor at the end',
    () => {
        for(let _ = 0; _ < 100; _++){
            const game = getFakeGame();
            const originalActors = game.actors;
            const originalMedia = game.media;
            const index = game.actors.length - 1;
            const fakeActor = getFakeActor();
            game.setActor(index, fakeActor);
            let expectedActors = originalActors;
            expectedActors[index] = fakeActor;
            expectedActors = expectedActors.splice(0, index+1);
            const expectedMedia = originalMedia.splice(0, index+1);
            expect(game.actors, 'After setting an actor, all following actors should be cleared').toEqual(expectedActors);
            expect(game.media, 'After setting an actor, all following media should be cleared').toEqual(expectedMedia);
        }
    }
)


// tests for checking if a game has been won
test('gameHasWon can only return true if both actors are in the list',
    () => {
        for(let _ = 0; _ < 100; _++){
            const game = getFakeGame();
            // the way getFakeGame works means it never returns 2 actors in a list,
            // so we can assume gameHasWon will always return false unless we manually add
            // the last actor to the list
            expect(game.gameHasWon(), 'If a game does not have both actors, it should return false').toEqual(false);
            game.swap();
            expect(game.gameHasWon(), 'If a game does not have both actors, it should return false').toEqual(false);
        }
    }
)

test('gameHasWon must return true if both actors are in the list',
    () => {
        for(let _ = 0; _ < 100; _++){
            const game = getFakeGame(3);
            const lastIndex = game.actors.length - 1;

            game.actors[0] = game.actor1;
            game.actors[lastIndex] = game.actor2;
            // if both actors are on each end, we should have "gameHasWon" return true

            expect(game.gameHasWon(), `[${_}] game with actor1 and actor2 at the end doesn't detect that the game has been won`).toEqual(true);

            // check if it still works if the actors are swapped
            game.actors[0] = game.actor2;
            game.actors[lastIndex] = game.actor1;

            expect(game.gameHasWon(), `[${_}] game with actor2 and actor1 at the end doesn't detect that the game has been won`).toEqual(true);


            // Should also work if actor1 is in the middle
            game.actors[1] = game.actor1;
            game.actors[0] = getFakeActor();
            game.actors[lastIndex] = game.actor2;
            expect(game.gameHasWon(), `[${_}] game with actor1 in the middle doesn't detect that the game has been won`).toEqual(true);

            // should also work if actor2 is in the middle
            game.actors[0] = game.actor1
            game.actors[1] = game.actor2
            game.actors[lastIndex] = getFakeActor();
            expect(game.gameHasWon(), `[${_}] game with actor2 in the middle doesn't detect that the game has been won`).toEqual(true);

            // or if both actors are in the middle
            game.actors[0] = getFakeActor();
            game.actors[1] = game.actor1;
            game.actors[2] = game.actor2;
            game.actors[lastIndex] = getFakeActor();
            expect(game.gameHasWon(), `[${_}] game with both actors in the middle doesn't detect that the game has been won`).toEqual(true);
        }
    }
)

