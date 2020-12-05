import { writable } from "svelte/store";

const STORE_PREFIX = "master_";


// Items Store
const itemsData = localStorage.getItem(`${STORE_PREFIX}items`);

export const itemsMaster = writable(JSON.parse(itemsData) || []);

itemsMaster.subscribe((value) => {
	if (itemsData !== value) {
		localStorage.setItem(`${STORE_PREFIX}items`, JSON.stringify(value));
	}
});

// Reset Storeage
export const resetMaster = () => {
	itemsMaster.set([]);
};
