import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";

import Howtogif from "$lib/assets/howto.gif";

const modal: ModalSettings = {
    type: 'alert',
    // Data
    image: Howtogif,
    title: 'How to play',
    body: 'The goal of the game is to connect two actors in the least amount of steps possible by connecting them with movies or shows they have both appeared in. The idea comes from the popular game, <a class="text-secondary-500 hover:text-secondary-700" href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon">"Six Degrees of Kevin Bacon".</a>',
    buttonTextCancel: 'Close',
    backdropClasses: 'text-secondary-300 bg-secondary-300'
};

export default function openHelpModal(){
    modalStore.trigger(modal);
}