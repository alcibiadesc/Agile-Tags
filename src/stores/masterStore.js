import { writable } from 'svelte/store';

const STORE_PREFIX = 'master_';

// Columns Store
const columnsData = localStorage.getItem(`${STORE_PREFIX}columns`);

export const columnsMaster = writable(JSON.parse(columnsData) || []);

columnsMaster.subscribe(value => {
    if (columnsData !== value) {
        localStorage.setItem(`${STORE_PREFIX}columns`, JSON.stringify(value));
    }
});

// Items Store
const itemsData = localStorage.getItem(`${STORE_PREFIX}items`);

export const itemsMaster = writable(JSON.parse(itemsData) || []);

itemsMaster.subscribe(value => {
    if (itemsData !== value) {
        localStorage.setItem(`${STORE_PREFIX}items`, JSON.stringify(value));
    }
});

// Reset Storeage
export const resetMaster = () => {
    columnsMaster.set([]);
    itemsMaster.set([]);
};