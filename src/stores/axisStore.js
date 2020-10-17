import { writable } from 'svelte/store';


const STORE_PREFIX = 'axis_';

const itemsData = localStorage.getItem(`${STORE_PREFIX}items`);

export const axisStore = writable(JSON.parse(itemsData) || "productOwner");

axisStore.subscribe(value => {
    if (itemsData !== value) {
        localStorage.setItem(`${STORE_PREFIX}items`, JSON.stringify(value));
    }
});




