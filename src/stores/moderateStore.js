import { writable } from "svelte/store";

const STORE_PREFIX = "moderator_";

const itemsData = localStorage.getItem(`${STORE_PREFIX}items`);

export const moderateStore = writable(JSON.parse(itemsData) || [12]);

moderateStore.subscribe((value) => {
	if (itemsData !== value) {
		localStorage.setItem(`${STORE_PREFIX}items`, JSON.stringify(value));
	}
});

// Reset Storeage
export const resetModerator = () => {
	moderateStore.set([]);
};
