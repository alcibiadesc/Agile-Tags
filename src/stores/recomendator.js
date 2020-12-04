import { writable } from "svelte/store";

const STORE_PREFIX = "recomendator_";

const itemsData = localStorage.getItem(`${STORE_PREFIX}items`);

export const recomendatorStore = writable(JSON.parse(itemsData) || []);

recomendatorStore.subscribe((value) => {
	if (itemsData !== value) {
		localStorage.setItem(`${STORE_PREFIX}items`, JSON.stringify(value));
	}
});

// Reset Storeage
export const resetRecomendator = () => {
	recomendatorStore.set([]);
};


