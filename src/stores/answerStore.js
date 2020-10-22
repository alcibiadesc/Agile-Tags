import { writable } from "svelte/store";

const STORE_PREFIX = "answer_";

// Items Store
const itemsData = localStorage.getItem(`${STORE_PREFIX}items`);

export const items = writable(JSON.parse(itemsData) || []);

items.subscribe((value) => {
	if (itemsData !== value) {
		localStorage.setItem(`${STORE_PREFIX}items`, JSON.stringify(value));
	}
});

// Reset Storeage
export const reset = () => {
	items.set([]);
};
